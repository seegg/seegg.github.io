import { addNavCallback, navBar } from "./nav";
import { sleep, setElementHeight } from "./util";
import { SyncAutoQueue } from "./queue";
import { UpdateDeckFn } from "./types";
import {
  switchSelectedNavIcons,
  setCardStatesInRange,
  stashCardsInRange,
  drawCardsInRange,
  drawCard,
  toggleBackgroundCard
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

/**
 * 
 * @param maxWidth max screen viewport width size before this stops taking effect.
 */
export const collapseDeckOnScroll = (maxWidth = 570, cardHeight = 450) => {
  const projectCards = Array.from(projectsContainer.querySelectorAll('.project-card')) as HTMLElement[];
  const cardScrollThreshold = 300; //distance to scroll in px to trigger cards.
  const currentIndex = { value: 0 };
  let isInProjectsTab = navBar ? navBar.querySelector('.selected')?.id === projectNavID : true;
  let isDisplayFixed = false;
  const heightRatio = cardHeight / cardScrollThreshold;
  const autoQueue = new SyncAutoQueue<UpdateDeckFn>();
  const contentScrollContainer = document.querySelector('.projects-scroll') as HTMLElement;
  //when the screen width meets the threshold, add height to scroll container to control the card deck.
  if (window.innerWidth < maxWidth) {
    setElementHeight(contentScrollContainer, window.innerHeight + (projectCards.length * cardScrollThreshold));
    window.scroll(0, 0);
  }

  document.addEventListener('scroll', async () => {
    if (!contentScrollContainer) return;
    if (isInProjectsTab && window.innerWidth < maxWidth) {
      const { top: scrollContainerTop, bottom: scrollContainerBottom } = contentScrollContainer.getBoundingClientRect();
      const botDist = window.innerHeight - scrollContainerBottom;

      if (scrollContainerTop < 0 && botDist < 0) {
        if (!isDisplayFixed) {
          switchSelectedNavIcons(projectCards[0]);
          toggleProjectDisplayFixedPosition('fixed');
          isDisplayFixed = true;
        }
        const scrollTopDist = Math.abs(scrollContainerTop);
        let scrollPos = Math.floor(scrollTopDist / cardScrollThreshold);
        scrollPos = Math.min(projectCards.length - 1, scrollPos);

        //use the determine how much the card can move before triggering a stash call.
        const heightOverlap = Math.max(scrollTopDist % cardScrollThreshold - 200, 0);

        //scroll down enough to trigger stash card.
        if (scrollPos > currentIndex.value) {
          //when the number of cards to handle gets pass a a number, precalculate the states of all the cards
          //except the last 2 so not too much time is spent playing the stash card animation.
          if (scrollPos - currentIndex.value > 2) {
            setCardStatesInRange(projectCards, currentIndex.value, scrollPos - 2);
            currentIndex.value = scrollPos - 2;
          }

          //because scroll events is fired so often, assign currentIndex to temp variable
          //and then update immediately instead of waiting for loop to finish avoid 
          //doubling up on calls.
          const temp = currentIndex.value;
          currentIndex.value = scrollPos;

          //Add a range of cards to the queue to be process squentially so the function on the next scroll
          //event doesn't run before this finish executing.
          autoQueue.add(
            async (duration = 200) => {
              await stashCardsInRange(projectCards, temp, scrollPos, duration);
            }
          );

          //scroll up enough to trigger draw card.
        } else if (scrollPos < currentIndex.value) {
          // autoQueue.empty();
          drawCardsInRange(projectCards, currentIndex.value, scrollPos, 100);
          currentIndex.value = scrollPos;

        } else {
          //adjust size of current card to make UI feel more responsive.
          if (heightOverlap > 0) {
            projectCards[currentIndex.value].style.height = cardHeight - heightOverlap * heightRatio + 'px';
          }
        }
      } else {
        if (isDisplayFixed) {
          if (scrollContainerTop >= 0) {
            toggleProjectDisplayFixedPosition('not-fixed');
            isDisplayFixed = false;
          }
        }

        if (botDist >= 0) {
          //handle any leftover cards after reaching end of scroll area.
          setCardStatesInRange(projectCards, currentIndex.value, projectCards.length - 2);
          currentIndex.value = projectCards.length - 2;
          projectDisplay.classList.remove('attach-to-top');
          //add reemaning cards to queue.
          autoQueue.add(async () => {
            await stashCardsInRange(projectCards, currentIndex.value, projectCards.length - 1, 100);
          });
          currentIndex.value = projectCards.length - 1;

        } else {
          //handle any leftover cards after reaching start of scroll area.
          autoQueue.add(async () => {
            for (let i = currentIndex.value; i > 0; i--) {
              drawCard(projectCards[i - 1], projectCards[i]);
              toggleBackgroundCard(projectCards, i - 1, 'remove');
              await sleep(50);
            }
          });
          currentIndex.value = 0;
          if (botDist < 0) projectDisplay.classList.add('attach-to-top');
        }
      }
    }
  })


  //add callback for navigating to and from projects tab.
  //navigating from projects tab
  addNavCallback((tabs, from) => {
    //only take effect if screen width is >= maxwidth
    if (window.innerWidth >= maxWidth || tabs[from].id !== projectNavID) return;
    contentScrollContainer.style.removeProperty('height');
  }, 'before');

  //navigating to projects tab
  addNavCallback((tabs, from, to) => {
    isInProjectsTab = tabs[to].id === projectNavID;
    if (window.innerWidth >= maxWidth || !isInProjectsTab) return;
    setElementHeight(contentScrollContainer, window.innerHeight + (projectCards.length * cardScrollThreshold));
  }, 'after')

  //resize observer adjust heightThreshold and deck behaviour base on intro element dimensions.
  const introResizeObserver = new ResizeObserver(entries => {
    const { inlineSize } = entries[0].contentBoxSize[0];

    if (inlineSize >= maxWidth) {
      reset();
    } else {
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