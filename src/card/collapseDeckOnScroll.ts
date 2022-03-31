import { addNavCallback, navBar } from "../app";
import { setElementHeight, scrollToPosAndPause, SyncAutoQueue } from "../util";
import { UpdateDeckFn, CardFn } from "../types";
import {
  switchSelectedNavIcons,
  setStashCardsInRange,
  setDrawCardsInRange,
  stashCardsInRange,
  drawCardsInRange,
  resetDeck
} from './card-deck';

const contentContainer = document.getElementById('content') as HTMLDivElement;
const projectDisplay = document.querySelector('.projects-display') as HTMLDivElement;
const projectNavID = 'nav-projects';

export const collapseDeckOnScroll = (deck: HTMLElement[], maxWidth = 570, cardHeight = 450, cardScrollThreshold = 200) => {
  const currentIndex = { value: 0 }; //store as an object property to makesure all requests reflects latest value.
  const heightRatio = cardHeight / cardScrollThreshold;
  const autoQueue = new SyncAutoQueue<UpdateDeckFn>(); //queue responsible for scheduling card actions.

  const contentScrollContainer = document.querySelector('.projects-scroll') as HTMLElement;
  let isInProjectsTab = navBar ? navBar.querySelector('.selected')?.id === projectNavID : true;
  let isDisplayFixed = false; //boolean flag to keep track whether project container is fixed to minimise calculations.
  let lastScrollYPos = window.scrollY;
  let prevSavedIndex = 0;
  let isFromTop = true;
  let prevTime = 0;

  //when the screen width meets the threshold, add height to scroll container to control the card deck.
  if (window.innerWidth < maxWidth) {
    setElementHeight(contentScrollContainer, window.innerHeight + (deck.length * cardScrollThreshold));
    window.scroll(0, 0);
  }

  document.addEventListener('scroll', async () => {
    if (!contentScrollContainer) return;
    if (isInProjectsTab && window.innerWidth < maxWidth) {
      const { top: scrollContainerTop, bottom: scrollContainerBottom } = contentScrollContainer.getBoundingClientRect();
      const { top: contentTopDistance } = contentContainer.getBoundingClientRect();

      const containerBtmDistance = window.innerHeight - scrollContainerBottom;//distance of container element bottom to screen bottom.

      //inside the scroll container
      if (contentTopDistance < 0 && containerBtmDistance < 0) {
        if (!isDisplayFixed) {
          switchSelectedNavIcons(deck[0]);
          toggleProjectDisplayFixedPosition(true);
          isDisplayFixed = true;
        }
        //calculate the index value corresponding to the y scroll position. 
        //use it to decide what cards to process.
        const scrollTopDist = Math.abs(scrollContainerTop);
        let scrollPos = Math.floor(scrollTopDist / cardScrollThreshold);
        scrollPos = Math.min(deck.length - 1, scrollPos);

        //scroll down enough to trigger stash card.
        //when there's more than 2 cards to process, set state without playing animations.
        if (scrollPos > currentIndex.value) {
          if (scrollPos - currentIndex.value > 2) {
            const temp = currentIndex.value;
            currentIndex.value = scrollPos - 2;
            autoQueue.add(async () => { await setStashCardsInRange(deck, temp, scrollPos - 2); });
          }
          isFromTop = true;
          addCardsToQueue(autoQueue, currentIndex, scrollPos, 200, stashCardsInRange, null,
            () => { prevTime = new Date().getTime(); });

          //scroll up enough to trigger draw card.
          //when there's more than 2 cards to process, set state without playing animations.
        } else if (scrollPos < currentIndex.value) {
          //clear the rest of the queue and set the state of the deck to the last item polled.
          if (isFromTop && new Date().getTime() - prevTime < 500) {
            isFromTop = false;
            handleScrollDirectionChange();
            return;
          }
          isFromTop = false;
          if (currentIndex.value - scrollPos > 2) {
            autoQueue.add(async () => { await setDrawCardsInRange(deck, currentIndex.value, scrollPos + 2); });
            currentIndex.value = scrollPos + 2;
          }
          addCardsToQueue(autoQueue, currentIndex, scrollPos, 100, drawCardsInRange);

        } else {//use the leftover distance between cards to adjust current card height.
          const heightOverlap = Math.max(scrollTopDist % cardScrollThreshold - 150, 0);
          if (heightOverlap > 0) {
            deck[currentIndex.value].style.height = cardHeight - heightOverlap * heightRatio + 'px';
          }
        }
        //outside the scroll container
      } else { //scroll container bottom is above screen bottom.
        if (containerBtmDistance >= 0) {
          projectDisplay.classList.remove('attach-to-top');
          //handle leftover cards, if any, after reaching end of scroll area.
          if (currentIndex.value < deck.length - 1) {
            if (currentIndex.value < deck.length - 3) {
              const temp = currentIndex.value;
              currentIndex.value = deck.length - 3;
              autoQueue.add(async () => { await setStashCardsInRange(deck, temp, deck.length - 3); });
            }
            //add reemaning cards to queue.
            addCardsToQueue(autoQueue, currentIndex, deck.length - 1, 100, stashCardsInRange, () => { isFromTop = false; });
          }
        } else {//scroll container top is below screen top.
          if (isDisplayFixed || contentTopDistance > 0) {
            toggleProjectDisplayFixedPosition(false);
            projectDisplay.classList.add('attach-to-top');
            isDisplayFixed = false;
          }
          //handle any leftover cards after reaching start of scroll area.
          if (currentIndex.value > 0) {

            if (currentIndex.value > 2) {
              const temp = currentIndex.value;
              currentIndex.value = 2;
              autoQueue.add(async () => { setDrawCardsInRange(deck, temp, 2,); });
            }
            //handle final cards, remove selected card status.
            addCardsToQueue(autoQueue, currentIndex, 0, 50, drawCardsInRange, null,
              () => {
                isFromTop = true;
                if (contentTopDistance >= 0) switchSelectedNavIcons(null, deck[0]);
              });
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
    setElementHeight(contentScrollContainer, window.innerHeight + (deck.length * cardScrollThreshold));
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
    callbackBefore?: (() => void) | null,
    callbackAfter?: (() => void) | null,
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
        if (callbackBefore) callbackBefore();
        updatePrevIndexAndScrollY(scrollPos, tempY);
        await cardFn(deck, temp, scrollPos, wait);
        if (callbackAfter) callbackAfter();
      }
    );
  };

  const updatePrevIndexAndScrollY = (index: number, scrollPos: number) => {
    prevSavedIndex = index;
    lastScrollYPos = scrollPos;
  }

  //resize observer to set the scroll container height reset the cards.
  const introResizeObserver = new ResizeObserver(entries => {
    const { inlineSize } = entries[0].contentBoxSize[0];
    if (inlineSize < maxWidth) {
      projectDisplay.classList.add('attach-to-top');
      window.scrollTo(0, 0);
      setElementHeight(contentScrollContainer, window.innerHeight + (deck.length * cardScrollThreshold));
      contentScrollContainer.classList.add('anim-fadein-long');
      // resetDeck(deck);
    } else {
      contentScrollContainer.style.removeProperty('height');
      contentScrollContainer.classList.remove('anim-fadein-long');
      resetDeck(deck);
    }
  });

  const handleScrollDirectionChange = () => {
    autoQueue.empty();
    scrollToPosAndPause(document.body, lastScrollYPos, 300);
    currentIndex.value = prevSavedIndex;
  }

  //remove selected css class from nav icons when intro element is 25% or more visible.
  const introIntersectObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && currentIndex.value < deck.length - 1) {
      switchSelectedNavIcons(null, deck[currentIndex.value]);
    }
  }, { rootMargin: '0px', threshold: 0.25 })
  //add intro to resize and intersection observer.
  const intro = document.getElementById('intro-container');
  if (intro) {
    introResizeObserver.observe(intro);
    introIntersectObserver.observe(intro);
  }
};

/**
 * toggle whether project card display container is fixed or not
 */
const toggleProjectDisplayFixedPosition = (state: boolean) => {
  if (state) {
    projectDisplay.classList.add('fixed', 'mt-82');
  } else {
    projectDisplay.classList.remove('fixed', 'mt-82');
  }
};