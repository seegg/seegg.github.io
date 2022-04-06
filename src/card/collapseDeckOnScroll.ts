import { addNavCallback, project as projectHash } from "../app";
import { setElementHeight, scrollToPosAndPause, SyncAutoQueue } from "../util";
import { UpdateDeckFn, CardFn, CardSetFn } from "../types";
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
const contentScrollContainer = document.querySelector('.projects-scroll') as HTMLElement;
const intro = document.getElementById('intro-container');
const autoQueue = new SyncAutoQueue<UpdateDeckFn>(); //queue responsible for scheduling card actions.
const currentIndex = { value: 0 }; //store as an object property to makesure all requests reflects latest value.
const [maxWidth, cardHeight, cardScrollThreshold] = [570, 450, 200];
const heightRatio = cardHeight / cardScrollThreshold;
let isInProjectsTab = true;
let isDisplayFixed = false; //boolean flag to keep track whether project container is fixed to minimise calculations.
let lastScrollYPos = 0;
let prevSavedIndex = 0;
let isFromTop = true;
let prevTime = 0;
let deck: HTMLElement[] | null = null;

/**
 * Set up the initial scrolling behaviour
 */
export const setUpSmallScreenScrolling = (newDeck: HTMLElement[]) => {
  deck = newDeck;
  isInProjectsTab = document.getElementById('tab-nav-bar')?.querySelector('.selected')?.id === 'nav-projects';
  //when the screen width meets the threshold, add height to scroll container to control the card deck.
  if (window.innerWidth < maxWidth) {
    setElementHeight(contentScrollContainer, window.innerHeight + (deck.length * cardScrollThreshold));
    window.scroll(0, 0);
  }
  //resize observer to set the scroll container height reset the cards.
  const introResizeObserver = new ResizeObserver(entries => {
    if (deck === null) return;
    const { inlineSize } = entries[0].contentBoxSize[0];
    if (inlineSize < maxWidth) {
      projectDisplay.classList.add('attach-to-top');
      window.scrollTo(0, 0);
      setElementHeight(contentScrollContainer, window.innerHeight + (deck?.length * cardScrollThreshold));
      contentScrollContainer.classList.add('anim-fadein-long');
      resetDeck(deck);
    } else {
      contentScrollContainer.style.removeProperty('height');
      contentScrollContainer.classList.remove('anim-fadein-long');
    }
  });

  //remove selected css class from nav icons when intro element is 25% or more visible.
  const introIntersectObserver = new IntersectionObserver(entries => {
    if (deck === null) return;
    if (entries[0].isIntersecting && currentIndex.value < deck.length - 1) {
      switchSelectedNavIcons(null, deck[currentIndex.value]);
    }
  }, { rootMargin: '0px', threshold: 0.25 })

  //add intro to resize and intersection observer.
  if (intro) {
    introResizeObserver.observe(intro);
    introIntersectObserver.observe(intro);
  }

  //add callback for navigating to and from projects tab.
  //callback for navigating from projects tab
  addNavCallback((from) => {
    //only take effect if screen width is >= maxwidth
    if (window.innerWidth >= maxWidth || from !== projectHash) return;
    autoQueue.empty();
    if (window.scrollY > 200) window.scrollTo(0, 200);
    contentScrollContainer.style.removeProperty('height');
  }, 'before');

  //callback for navigating to projects tab
  addNavCallback((from, to) => {
    isInProjectsTab = to === projectHash;
    if (window.innerWidth >= maxWidth || !isInProjectsTab) return;
    if (deck) {
      setElementHeight(contentScrollContainer, window.innerHeight + (deck?.length * cardScrollThreshold));
      if (currentIndex.value > 0) window.scrollTo(0, lastScrollYPos);
    } else {
      setElementHeight(contentScrollContainer, 0);
    }
  }, 'after');

  document.addEventListener('scroll', onScrollListener);

};

//update to a new project card deck.
export const updateScrollDeck = (newDeck: HTMLElement[]) => {
  deck = newDeck;
  currentIndex.value = 0;
  lastScrollYPos = 0;
  prevSavedIndex = 0;
  isFromTop = true;
  prevTime = 0;
  if (isInProjectsTab && window.innerWidth < maxWidth) {
    setElementHeight(contentScrollContainer, window.innerHeight + (deck?.length * cardScrollThreshold));
    window.scrollTo({ top: 200, behavior: contentContainer.getBoundingClientRect().top > 0 ? 'smooth' : 'auto' });
  }
};

const onScrollListener = () => {
  if (!isInProjectsTab || (isInProjectsTab && window.innerWidth >= maxWidth) || !contentScrollContainer || deck === null) return;
  const { top: scrollContainerTop, bottom: scrollContainerBottom } = contentScrollContainer.getBoundingClientRect();
  const { top: contentTopDistance } = contentContainer.getBoundingClientRect();
  const containerBtmDistance = window.innerHeight - scrollContainerBottom;//distance of container element bottom to screen bottom.

  //inside the scroll container
  if (contentTopDistance < 0 && containerBtmDistance < 0) {
    if (!isDisplayFixed) {
      switchSelectedNavIcons(deck[0]);
      setProjectDisplayFixedPosition(true);
      isDisplayFixed = true;
    }
    //calculate the index value corresponding to the y scroll position. 
    //use it to decide what cards to process.
    const scrollTopDist = Math.abs(scrollContainerTop);
    const scrollPos = Math.min(deck.length - 1, Math.floor(scrollTopDist / cardScrollThreshold));

    //scroll down enough to trigger stash card.
    //when there's more than 2 cards to process, set state without playing animations.
    if (scrollPos > currentIndex.value) {
      if (scrollPos - currentIndex.value > 2) {
        currentIndex.value = addSetCardsToQueue(deck, currentIndex, scrollPos - 2, setStashCardsInRange);
      }
      isFromTop = true;
      addCardsToQueue(autoQueue, deck, currentIndex, scrollPos, 200, stashCardsInRange, null,
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
        currentIndex.value = addSetCardsToQueue(deck, currentIndex, scrollPos + 2, setDrawCardsInRange);
      }
      addCardsToQueue(autoQueue, deck, currentIndex, scrollPos, 100, drawCardsInRange);

    } else {//use the leftover distance between cards as transition animation.
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
          currentIndex.value = addSetCardsToQueue(deck, currentIndex, deck.length - 3, setStashCardsInRange);
        }
        //add reemaning cards to queue.
        addCardsToQueue(autoQueue, deck, currentIndex, deck.length - 1, 100, stashCardsInRange, () => { isFromTop = false; });
      }
    } else {//scroll container top is below screen top.
      if (isDisplayFixed || contentTopDistance > 0) {
        setProjectDisplayFixedPosition(false);
        projectDisplay.classList.add('attach-to-top');
        isDisplayFixed = false;
      }
      //handle any leftover cards after reaching start of scroll area.
      if (currentIndex.value > 0) {

        if (currentIndex.value > 2) {
          currentIndex.value = addSetCardsToQueue(deck, currentIndex, 2, setDrawCardsInRange);
        }
        //handle final cards, remove selected card status.
        addCardsToQueue(autoQueue, deck, currentIndex, 0, 50, drawCardsInRange, null,
          () => {
            isFromTop = true;
            if (contentTopDistance >= 0) switchSelectedNavIcons(null, deck ? deck[0] : null);
          });
      }
    }
  }

};

/**
 * Helper function for adding items to the queue
 */
const addCardsToQueue = (
  queue: SyncAutoQueue<UpdateDeckFn>,
  deck: HTMLElement[],
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

/**
 * Helper function to add set Cards to the queue and then return the updated index position.
 */
const addSetCardsToQueue =
  (deck: HTMLElement[], currentIndex: { value: number }, end: number, setCards: CardSetFn, queue = autoQueue) => {
    const start = currentIndex.value;
    queue.add(async () => { await setCards(deck, start, end) });
    return end;
  }

const updatePrevIndexAndScrollY = (index: number, scrollPos: number) => {
  prevSavedIndex = index;
  lastScrollYPos = scrollPos;
};

const handleScrollDirectionChange = () => {
  autoQueue.empty();
  scrollToPosAndPause(document.body, lastScrollYPos, 300);
  currentIndex.value = prevSavedIndex;
};

/**
 * toggle whether project card display container is fixed or not
 */
const setProjectDisplayFixedPosition = (state: boolean) => {
  if (state) {
    projectDisplay.classList.add('fixed', 'mt-82');
  } else {
    projectDisplay.classList.remove('fixed', 'mt-82');
  }
  return state;
};

export const isScrollDeckNull = () => {
  return deck === null;
}