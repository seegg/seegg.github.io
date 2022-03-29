import { addNavCallback, navBar } from "./nav";
import { setElementHeight, scrollToPosAndPause } from "./util";
import { SyncAutoQueue } from "./queue";
import { UpdateDeckFn, CardFn } from "./types";
import {
  switchSelectedNavIcons,
  setCardStatesInRange,
  stashCardsInRange,
  drawCardsInRange,
} from './card-deck';

const contentContainer = document.getElementById('content') as HTMLDivElement;
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
      const { top } = contentContainer.getBoundingClientRect();
      //distance of container element bottom to screen bottom.
      const botDist = window.innerHeight - scrollContainerBottom;
      console.log('scrolling');
      //inside the scroll container
      if (top < 0 && botDist < 0) {
        console.log('insdie container');
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

          isFromTop = true;
          addCardsToQueue(autoQueue, currentIndex, scrollPos, 200, stashCardsInRange);

          //scroll up enough to trigger draw card.
        } else if (scrollPos < currentIndex.value) {
          //clear the rest of the queue and set the state of the deck to the last
          //executed item in the queue.
          if (isFromTop) {
            isFromTop = false;
            handleScrollDirectionChange();
            return;
          }
          isFromTop = false;
          addCardsToQueue(autoQueue, currentIndex, scrollPos, 100, drawCardsInRange);

        } else {
          //use the leftover distance between cards to adjust current card height.
          const heightOverlap = Math.max(scrollTopDist % cardScrollThreshold - 200, 0);
          if (heightOverlap > 0) {
            projectCards[currentIndex.value].style.height = cardHeight - heightOverlap * heightRatio + 'px';
          }
        }
      } else {
        //scroll container bottom is above screen bottom.
        if (botDist >= 0) {
          projectDisplay.classList.remove('attach-to-top');
          //handle leftover cards, if any, after reaching end of scroll area.
          if (currentIndex.value < projectCards.length - 1) {
            //pre process up to the last 2 cards, so the last 2 can be use to animate the transition.
            if (currentIndex.value < projectCards.length - 3) {
              autoQueue.add(async () => {
                await setCardStatesInRange(projectCards, currentIndex.value, projectCards.length - 3);
              })
              currentIndex.value = projectCards.length - 3;
            }
            //add reemaning cards to queue.
            addCardsToQueue(autoQueue, currentIndex, projectCards.length - 1, 100, stashCardsInRange, () => { isFromTop = false; });
          }
          //scroll container top is below screen top.
        } else {
          if (isDisplayFixed) {
            toggleProjectDisplayFixedPosition('not-fixed');
            projectDisplay.classList.add('attach-to-top');
            isDisplayFixed = false;
          }
          //handle any leftover cards after reaching start of scroll area.
          if (currentIndex.value > 0) {
            addCardsToQueue(autoQueue, currentIndex, 0, 50, drawCardsInRange, () => { isFromTop = true; });
          }
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

  /**
   * Helper function for adding items to the queue
   */
  const addCardsToQueue = (
    queue: SyncAutoQueue<UpdateDeckFn>,
    currentIndex: { value: number },
    scrollPos: number,
    wait: number,
    cardFn: CardFn,
    callback?: () => void
  ) => {
    //update currentIndex before queue item finishes executing so the next scroll event
    //uses updated value instead of old value as if the queue items has aleady finish executing.
    const temp = currentIndex.value;
    const tempY = window.scrollY;
    currentIndex.value = scrollPos;
    //Add range of cards to the queue to be process squentially to avoid doubling up on calls.
    //save the scrollY pos and card index to handle abrupt change in direction.
    queue.add(
      async () => {
        if (callback) callback();
        updatePrevIndexAndScrollY(scrollPos, tempY);
        await cardFn(projectCards, temp, scrollPos, wait);
      }
    );
  };

  const updatePrevIndexAndScrollY = (index: number, scrollPos: number) => {
    prevSavedIndex = index;
    lastScrollYPos = scrollPos;
  }

  //resize observer adjust heightThreshold and deck behaviour base on intro element dimensions.
  const introResizeObserver = new ResizeObserver(entries => {
    const { inlineSize } = entries[0].contentBoxSize[0];
    reset();
    if (inlineSize < maxWidth) {
      setElementHeight(contentScrollContainer, window.innerHeight + (projectCards.length * cardScrollThreshold));
      window.scrollTo(0, 0);
      projectDisplay.classList.add('attach-to-top');
    }
  });

  const handleScrollDirectionChange = () => {
    autoQueue.empty();
    scrollToPosAndPause(document.body, lastScrollYPos, 300);
    currentIndex.value = prevSavedIndex;
  }

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
    projectDisplay.classList.add('fixed', 'mt-82');
  } else {
    projectDisplay.classList.remove('fixed', 'mt-82');
  }
};