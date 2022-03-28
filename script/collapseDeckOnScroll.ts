import { addNavCallback, navBar } from "./nav";
import { setElementHeight, scrollToPosAndPause } from "./util";
import { SyncAutoQueue } from "./queue";
import { UpdateDeckFn } from "./types";
import {
  switchSelectedNavIcons,
  setCardStatesInRange,
  stashCardsInRange,
  drawCardsInRange,
} from './card-deck';

// const contentContainer = document.getElementById('content') as HTMLDivElement;
const projectsContainer = document.getElementById('projects') as HTMLDivElement;
const projectDisplay = document.querySelector('.projects-display') as HTMLDivElement;
//css classes
const closeCard = 'close-deck-partial';
const navIconSelected = 'nav-icon-selected';
const backgroundCard = 'background-card';
const hide = 'close-deck-full';
const moveY = 'moveY-40';
const projectNavID = 'nav-projects';

export const collapseDeckOnScroll = (maxWidth = 570, cardHeight = 450, cardScrollThreshold = 300) => {
  const projectCards = Array.from(projectsContainer.querySelectorAll('.project-card')) as HTMLElement[];
  const currentIndex = { value: 0 }; //store as an object property to makesure all requests reflects latest value.
  const heightRatio = cardHeight / cardScrollThreshold;
  const autoQueue = new SyncAutoQueue<UpdateDeckFn>(); //queue responsible for scheduling card actions.

  const contentScrollContainer = document.querySelector('.projects-scroll') as HTMLElement;
  let isInProjectsTab = navBar ? navBar.querySelector('.selected')?.id === projectNavID : true;
  let isDisplayFixed = false; //boolean flag to keep track whether project container is fixed to minimise calculations.
  let lastScrollYPos = window.scrollY;
  let prevSavedIndex = 0;
  let isFromTop = true;

  //when the screen width meets the threshold, add height to scroll container to control the card deck.
  if (window.innerWidth < maxWidth) {
    setElementHeight(contentScrollContainer, window.innerHeight + (projectCards.length * cardScrollThreshold));
    window.scroll(0, 0);
  }

  document.addEventListener('scroll', async () => {
    if (!contentScrollContainer) return;
    if (isInProjectsTab && window.innerWidth < maxWidth) {
      const { top: scrollContainerTop, bottom: scrollContainerBottom } = contentScrollContainer.getBoundingClientRect();
      //distance of container element bottom to screen bottom.
      const botDist = window.innerHeight - scrollContainerBottom;

      //inside the scroll container
      if (scrollContainerTop < 0 && botDist < 0) {
        if (!isDisplayFixed) {
          switchSelectedNavIcons(projectCards[0]);
          toggleProjectDisplayFixedPosition('fixed');
          isDisplayFixed = true;
        }
        //calculate the index value corresponding to the y scroll position. 
        //use it to decide what cards to process.
        const scrollTopDist = Math.abs(scrollContainerTop);
        let scrollPos = Math.floor(scrollTopDist / cardScrollThreshold);
        scrollPos = Math.min(projectCards.length - 1, scrollPos);

        //use the leftover distance from the after the last whole number index to set the height
        //of the current card.
        const heightOverlap = Math.max(scrollTopDist % cardScrollThreshold - 200, 0);

        //scroll down enough to trigger stash card.
        if (scrollPos > currentIndex.value) {
          //when the number of cards to handle gets pass a a number, precalculate the states of all the cards
          //except the last 2 so not too much time is spent playing the stash card animation.
          if (scrollPos - currentIndex.value > 2) {
            autoQueue.add(async () => {
              await setCardStatesInRange(projectCards, currentIndex.value, scrollPos - 2);
            });
            currentIndex.value = scrollPos - 2;
          }

          //update currentIndex before queue item finishes executing so the next scroll event
          //uses updated value instead of old value if waiting for queue.
          const temp = currentIndex.value;
          const tempY = window.scrollY;
          currentIndex.value = scrollPos;
          //Add range of cards to the queue to be process squentially to avoid doubling up on calls.
          //save the scrollY pos and card index to handle abrupt change in direction.
          autoQueue.add(
            async () => {
              lastScrollYPos = tempY;
              prevSavedIndex = scrollPos;
              const waitDuration = autoQueue.size >= 2 ? 200 : 200;
              await stashCardsInRange(projectCards, temp, scrollPos, waitDuration);
            }
          );
          isFromTop = true;
          //scroll up enough to trigger draw card.
        } else if (scrollPos < currentIndex.value) {
          //clear the rest of the queue and set the state of the deck to the last
          //executed item in the queue.
          if (isFromTop) {
            console.log('is from top');
            isFromTop = false;
            autoQueue.empty();
            scrollToPosAndPause(document.body, lastScrollYPos, 300);
            currentIndex.value = prevSavedIndex;
            return;
          }
          isFromTop = false;
          const tempIndex = currentIndex.value;
          const tempY = window.scrollY;
          currentIndex.value = scrollPos;
          autoQueue.add(async () => {
            lastScrollYPos = tempY;
            prevSavedIndex = scrollPos;
            await drawCardsInRange(projectCards, tempIndex, scrollPos, 100);
          })
        } else {
          //adjust size of current card to make UI feel more responsive.
          if (heightOverlap > 0) {
            projectCards[currentIndex.value].style.height = cardHeight - heightOverlap * heightRatio + 'px';
          }
        }
      } else {
        if (isDisplayFixed && scrollContainerTop >= 0) {
          toggleProjectDisplayFixedPosition('not-fixed');
          isDisplayFixed = false;
        }

        if (botDist >= 0) {
          projectDisplay.classList.remove('attach-to-top');
          if (!isDisplayFixed) {
            toggleProjectDisplayFixedPosition('fixed');
            isDisplayFixed = true;
          }
          //handle any leftover cards after reaching end of scroll area.
          if (currentIndex.value < projectCards.length - 2) {
            const tempIndex = currentIndex.value;
            currentIndex.value = projectCards.length - 2;
            autoQueue.add(async () => {
              await setCardStatesInRange(projectCards, tempIndex, projectCards.length - 2);
            })
          }
          //add reemaning cards to queue.
          const tempIndex = currentIndex.value;
          currentIndex.value = projectCards.length - 1;
          autoQueue.add(async () => {
            await stashCardsInRange(projectCards, tempIndex, projectCards.length - 1, 100);
            isFromTop = false;
          });
        } else {
          //handle any leftover cards after reaching start of scroll area.
          const tempIndex = currentIndex.value;
          currentIndex.value = 0;
          autoQueue.add(async () => {
            await drawCardsInRange(projectCards, tempIndex, 0, 50);
            isFromTop = true;
          });
          if (botDist < 0) projectDisplay.classList.add('attach-to-top');
        }
      }
    }
  });

  //add callback for navigating to and from projects tab.
  //navigating from projects tab
  addNavCallback((tabs, from) => {
    //only take effect if screen width is >= maxwidth
    if (window.innerWidth >= maxWidth || tabs[from].id !== projectNavID) return;
    autoQueue.empty();
    contentScrollContainer.style.removeProperty('height');
  }, 'before');

  //navigating to projects tab
  addNavCallback((tabs, from, to) => {
    isInProjectsTab = tabs[to].id === projectNavID;
    if (window.innerWidth >= maxWidth || !isInProjectsTab) return;
    setElementHeight(contentScrollContainer, window.innerHeight + (projectCards.length * cardScrollThreshold));
    window.scrollTo({ top: lastScrollYPos, behavior: 'auto' });
  }, 'after')

  //resize observer adjust heightThreshold and deck behaviour base on intro element dimensions.
  const introResizeObserver = new ResizeObserver(entries => {
    const { inlineSize } = entries[0].contentBoxSize[0];

    if (inlineSize >= maxWidth) {
      reset();
    } else {
      reset();
      window.scrollTo(0, 0);
      setElementHeight(contentScrollContainer, window.innerHeight + (projectCards.length * cardScrollThreshold));
    }
  });

  //remove selected css class from nav icons when intro element is 25% or more visible.
  const introIntersectObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && currentIndex.value < projectCards.length - 1) {
      switchSelectedNavIcons(null, projectCards[currentIndex.value]);
    }
  }, { rootMargin: '0px', threshold: 0.25 })
  //add intro to resize and intersection observer.
  const intro = document.getElementById('intro-container');
  if (intro) {
    introResizeObserver.observe(intro);
    introIntersectObserver.observe(intro);
  }

  //reset the state of the cards.
  const reset = () => {
    autoQueue.empty();
    //remove any css classes that alter the card
    projectCards.forEach(card => {
      card.classList.remove(closeCard, hide);
      card.querySelector('.project')?.classList.remove(backgroundCard);
      card.querySelector('.nav-project')?.classList.remove(moveY);
    });
    //remove the selected icons
    projectCards[currentIndex.value].querySelectorAll('.nav-icon')?.forEach(card => {
      card.classList.remove(navIconSelected);
    })
    //reset values to original;
    currentIndex.value = 0;
    contentScrollContainer.style.removeProperty('height');
  };
};

//toggle whether project card container css display is fixed or not
const toggleProjectDisplayFixedPosition = (state: 'fixed' | 'not-fixed') => {
  if (state === 'fixed') {
    projectDisplay.classList.add('fixed');
  } else {
    projectDisplay.classList.remove('fixed');
  }
};