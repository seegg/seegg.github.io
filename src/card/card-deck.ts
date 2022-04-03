import { sleep } from "../util";

const cssCloseCardPartial = 'close-deck-partial';
// const cssCloseCardFull = 'close-deck-full';
const cssNavIconSelected = 'nav-icon-selected';
const cssBackgroundCard = 'background-card';
const cssHide = 'close-deck-full';
const cssMoveY = 'moveY-40';
const cssFadeOut = 'anim-fadeout-deck';
const cssOpenCard = 'anim-open-deck';
const cssCloseCard = 'card-closed';
const cssCardClass = 'project-card';

/**
 * Add css class to current selected project card to make its height smaller
 * and make the next card on the layout cover on top of it.
 * @param next card to be selected
 * @param current card to be collapse and stash away.
 */
export const stashCard = (next: HTMLElement, current: HTMLElement) => {
  current.style.removeProperty('height');
  next.style.removeProperty('height');
  toggleCardHeightStatus(current, 'collapse');
  switchSelectedNavIcons(next, current);
};

/**
 * draw a card from the deck
 * Remove css class from project card that makes its height smaller and return
 * it to full height.
 * @param next card to be drawn
 * @param current current card
 */
export const drawCard = (next: HTMLElement, current: HTMLElement) => {
  current.style.removeProperty('height');
  next.style.removeProperty('height');
  toggleCardHeightStatus(next, 'expand');
  switchSelectedNavIcons(next, current);
};

/**
 * Toggle the height of project card by adding and removing css classes.
 * @param card project card
 * @param state state of card's height
 * @param nav css class for card navigation
 * @param closeCard css class for closing card
 * @param moveY css class for moving nav icons on the y-axis.
 */
const toggleCardHeightStatus = (
  card: HTMLElement, state: 'collapse' | 'expand',
  nav = 'nav-project',
  closeCard = cssCloseCardPartial,
  moveY = cssMoveY
) => {
  try {
    //decide wether to add or remove css classes.
    const action = state === 'collapse' ? 'add' : state === 'expand' ? 'remove' : undefined;
    if (action === undefined) throw new Error('state can only be either collapse or expand');
    card.classList[action](closeCard);
    card.querySelector('.' + nav)?.classList[action](moveY);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
};

/**
 * Toggles which card gets rendered as the background card.
 * @param cards the project cards
 * @param currentIndex index of current card
 * @param action add or remove css classes
 * @param cardSelector css classname of the inner card, default '.project'
 */
export const toggleBackgroundCard = (
  cards: HTMLElement[],
  currentIndex: number, action: 'add' | 'remove',
  cardSelector = '.project',
  backgroundCard = cssBackgroundCard,
  hide = cssHide
) => {
  try {
    if (currentIndex < 1) return;
    if (currentIndex >= 1) {
      cards[currentIndex - 1].querySelector(cardSelector)?.classList[action](backgroundCard);
    }
    if (currentIndex >= 2) {
      cards[currentIndex - 2].classList[action](hide);
      cards[currentIndex - 3]?.classList[action]('hide');
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * Calculate and stash the cards in range with no animation delay
 * @param start 
 * @param end 
 */
export const setStashCardsInRange = (
  deck: HTMLElement[],
  start: number,
  end: number,
  noCssTransition = 'disable-transitions'
) => {
  for (let i = start; i < end; i++) {
    deck[i].classList.add(noCssTransition);
    stashCard(deck[i + 1], deck[i]);
    toggleBackgroundCard(deck, i, 'add');
    deck[i].offsetHeight;
    deck[i].classList.remove(noCssTransition);
  }
}

/**
 * Stash the selected range of cards, from start to end, not inclusive.  
 * @param deck the project cards
 * @param start index of start range
 * @param end index of end range
 * @param waitPerCard ms to wait for each before processing next card, allowing animation to play.
 */
export const stashCardsInRange = async (deck: HTMLElement[], start: number, end: number, waitPerCard: number) => {
  for (let i = start; i < end; i++) {
    stashCard(deck[i + 1], deck[i]);
    await sleep(waitPerCard);
    toggleBackgroundCard(deck, i, 'add');
  }
};

/**
 * Draw the cards in range with no animation delay
 * @param start 
 * @param end 
 */
export const setDrawCardsInRange = (
  deck: HTMLElement[],
  start: number,
  end: number,
  noCssTransition = 'disable-transitions'
) => {
  for (let i = start; i > end; i--) {
    deck[i].classList.add(noCssTransition);
    drawCard(deck[i - 1], deck[i]);
    toggleBackgroundCard(deck, i - 1, 'remove');
    deck[i].offsetHeight;
    deck[i].classList.remove(noCssTransition);
  }
}

/**
 * stash the selected range of cards, from start to end, not inclusive.  
 * @param deck the project cards
 * @param start index of start range
 * @param end index of end range
 * @param waitPerCard ms to wait for each before processing next card, allowing animation to play.
 */
export const drawCardsInRange = async (deck: HTMLElement[], start: number, end: number, waitPerCard: number) => {
  for (let i = start; i > end; i--) {
    drawCard(deck[i - 1], deck[i]);
    toggleBackgroundCard(deck, i - 1, 'remove');
    await sleep(waitPerCard);
  }
};

/**
 * Switch the current selected nav icon to target card, leave either param as null to
 * add or remove selected nav icon without effecting the other.
 * @param targetCard card of nav icons to be highlighted
 * @param currentCard current card where icons are highlighted
 */
export const switchSelectedNavIcons = (targetCard: HTMLElement | null, currentCard: HTMLElement | null = null) => {
  setSelectedNavIcons(currentCard, false);
  setSelectedNavIcons(targetCard, true);
};

const setSelectedNavIcons = (
  card: HTMLElement | null, selected: boolean,
  iconSelector = '.nav-icon',
  cssSelected = cssNavIconSelected,
  cardSelected = 'current-card'
) => {
  if (card === null) return;
  const action = selected ? 'add' : 'remove';
  card.querySelectorAll(iconSelector).forEach(icon => {
    icon.classList[action](cssSelected);
  });
  card.querySelector('.project')?.classList[action](cardSelected);
};

/**
 * close deck transistion
 */
export const closeDeck = async (
  container: HTMLElement | null,
  duration = 500,
  fadeOut = cssFadeOut,
  closeCard = cssCloseCard,
  cardClass = cssCardClass
) => {
  if (!container) return;
  container.offsetHeight;
  container.classList.add(fadeOut);
  const deck = Array.from(container.querySelectorAll('.' + cardClass)) as HTMLElement[];
  deck?.forEach(card => {
    card.classList.add(closeCard);
    card.classList.remove(cssOpenCard);
  });
  console.log('close deck');
  await sleep(duration);
};

/**
 * open deck transition
 */
export const openDeck = async (
  container: HTMLElement | null,
  fadeOut = cssFadeOut,
  closeCard = cssCloseCard,
  cardClass = cssCardClass
) => {
  if (!container) return;
  container.classList.remove(fadeOut);
  container.offsetHeight;
  await sleep(250);
  const deck = Array.from(container.querySelectorAll('.' + cardClass)) as HTMLElement[];
  deck.forEach(card => {
    card.classList.remove(closeCard);
  });
  console.log('open deck');
};

/**
 * reset the cards back to starting state.
 * @param deck 
 */
export const resetDeck = (
  deck: HTMLElement[],
  closeCard = cssCloseCardPartial,
  hide = cssHide,
  backgroundCard = cssBackgroundCard,
  moveY = cssMoveY,
  navIconSelected = cssNavIconSelected,
  zindex20 = 'z-20',
  overlaySize = 'overlay-card-size',
  projectSelected = 'project-select',
  moveNavYAxis = 'nav-project-moveY'
) => {
  deck.forEach(card => {
    card.classList.remove(closeCard, hide, zindex20, overlaySize, 'hide', 'card-closed');
    card.querySelector('.project')?.classList.remove(backgroundCard, projectSelected);
    card.querySelector('.nav-project')?.classList.remove(moveY, moveNavYAxis);
  });

  deck[0].parentElement?.querySelectorAll('.' + navIconSelected).forEach(icon => {
    icon.classList.remove(navIconSelected);
  })
}