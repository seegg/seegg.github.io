import { addNavCallback } from "./nav";
import { sleep } from "./util";

const contentContainer = document.getElementById('content') as HTMLDivElement;
const projectsContainer = document.getElementById('projects') as HTMLDivElement;
const projectDisplay = document.querySelector('.projects-display') as HTMLDivElement;
const intro = document.getElementById('intro-container');
const navBar = document.getElementById('tab-nav-bar');
const noCssTransition = '.disable-transition';
const closeCard = 'close-deck-partial';
const navIconSelected = 'nav-icon-selected';
const navSelector = '.nav-project';
const backgroundCard = 'background-card';
const hide = 'close-deck-full';
const moveY = 'moveY-40';

/**
 * 
 * @param maxWidth max screen viewport width size before this stops taking effect.
 */
export const collapseDeckOnScroll = (maxWidth = 570, cardHeight = 450) => {
  window.scrollTo(0, 0);
  const projectCards = Array.from(projectsContainer.querySelectorAll('.project-card')) as HTMLElement[];
  const cardScrollThreshold = 300; //distance to scroll in px to trigger cards.
  const currentIndex = { value: 0 };
  let isInProjectsTab = navBar ? navBar.querySelector('.selected')?.id === 'nav-projects' : true;
  let isDisplayFixed = false;
  const isFromTop = true;
  const heightRatio = cardHeight / cardScrollThreshold;
  const contentScrollContainer = document.querySelector('.projects-scroll') as HTMLElement;
  if (window.innerWidth < maxWidth) {
    setElementHeight(contentScrollContainer, window.innerHeight + (projectCards.length * cardScrollThreshold));
  }

  const queue: number[] = [];

  document.addEventListener('scroll', async () => {
    if (!contentScrollContainer) return;
    if (isInProjectsTab && window.innerWidth < maxWidth) {
      const { top: scrollContainerTop, bottom: scrollContainerBottom } = contentScrollContainer.getBoundingClientRect();
      const botDist = window.innerHeight - scrollContainerBottom;

      if (scrollContainerTop < 0 && botDist < 0) {
        if (!isDisplayFixed) {
          toggleProjectDisplayFixedPosition('fixed');
          isDisplayFixed = true;
        }
        const scrollTopDist = Math.abs(scrollContainerTop);
        let scrollPos = Math.floor(scrollTopDist / cardScrollThreshold);
        scrollPos = Math.min(projectCards.length - 1, scrollPos);

        const heightOverlap = Math.max(scrollTopDist % cardScrollThreshold - 200, 0);

        if (scrollPos > currentIndex.value) {
          // document.body.style.overflowY = 'hidden';
          if (scrollPos - currentIndex.value > 2) {
            for (let i = currentIndex.value; i < scrollPos - 2; i++) {
              projectCards[i].classList.add(noCssTransition);
              stashCard(projectCards[i + 1], projectCards[i]);
              toggleBackgroundCard(projectCards, i, 'add');
              projectCards[i].offsetHeight;
              projectCards[i].classList.remove(noCssTransition);
            }
            currentIndex.value = scrollPos - 2;
          }

          //assign index value a temp variable and then update currentIndex to the scrollPos value
          //to prevent doubling up on calls to stashCard because scroll event is fired so often.
          const temp = currentIndex.value;
          currentIndex.value = scrollPos;
          for (let i = temp; i < scrollPos; i++) {
            queue.push(i);
            stashCard(projectCards[i + 1], projectCards[i]);
            await sleep(300);
            toggleBackgroundCard(projectCards, i, 'add');
            // currentIndex.value = i;
            // if (temp !== currentIndex.value) console.log(temp, currentIndex.value);
          }
          // currentIndex.value = scrollPos;
          // document.body.style.overflowY = 'auto';

        } else if (scrollPos < currentIndex.value) {
          for (let i = currentIndex.value; i > scrollPos; i--) {
            drawCard(projectCards[i - 1], projectCards[i]);
            toggleBackgroundCard(projectCards, i - 1, 'remove');
            await sleep(50);
          }
          window.scrollBy(
            {
              top: -(heightOverlap),
              behavior: 'auto'
            }
          )
          currentIndex.value = scrollPos;
        } else {
          if (heightOverlap > 0) projectCards[currentIndex.value].style.height = cardHeight - heightOverlap * heightRatio + 'px';
        }
      } else {
        if (isDisplayFixed) {
          toggleProjectDisplayFixedPosition('not-fixed');
          isDisplayFixed = false;
        }

        if (botDist >= 0) {
          console.table(queue);
          for (let i = currentIndex.value; i < projectCards.length - 2; i++) {
            projectCards[i].classList.add(noCssTransition);
            stashCard(projectCards[i + 1], projectCards[i]);
            toggleBackgroundCard(projectCards, i, 'add');
            projectCards[i].offsetHeight;
            projectCards[i].classList.remove(noCssTransition);
          }
          currentIndex.value = projectCards.length - 2;

          projectDisplay.classList.remove('attach-to-top');

          for (let i = currentIndex.value; i < projectCards.length - 1; i++) {
            stashCard(projectCards[i + 1], projectCards[i]);
            await sleep(300);
            toggleBackgroundCard(projectCards, i, 'add');
          }
          currentIndex.value = projectCards.length - 1;

        } else {
          for (let i = currentIndex.value; i > 0; i--) {
            drawCard(projectCards[i - 1], projectCards[i]);
            toggleBackgroundCard(projectCards, i - 1, 'remove');
          }
          currentIndex.value = 0;
          if (botDist < 0) projectDisplay.classList.add('attach-to-top');
        }
      }
    }
  })


  //add callback for navigating to and from projects tab.
  //navigating from projects tab
  const projectNavID = 'nav-projects';
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
      setSelectedNavIcons(projectCards[currentIndex.value], false);
    }
  }, { rootMargin: '0px', threshold: 0.25 })

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

/**
 * Add css class to current selected project card to make its height smaller
 * and make the next card on the layout cover on top of it.
 * @param next card to be selected
 * @param current card to be collapse and stash away.
 */
const stashCard = (next: HTMLElement, current: HTMLElement) => {
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
const drawCard = (next: HTMLElement, current: HTMLElement) => {
  current.style.removeProperty('height');
  next.style.removeProperty('height');
  toggleCardHeightStatus(next, 'expand');
  switchSelectedNavIcons(next, current);
};

/**
 * Toggle the height of project card by adding and removing css classes.
 * @param card project card
 * @param state state of card's height
 * @param nav css selector for card navigation
 */
const toggleCardHeightStatus = (card: HTMLElement, state: 'collapse' | 'expand', nav = navSelector) => {
  try {
    //decide wether to add or remove css classes.
    const action = state === 'collapse' ? 'add' : state === 'expand' ? 'remove' : undefined;
    if (action === undefined) throw new Error('state can only be either collapse or expand');
    card.classList[action](closeCard);
    card.querySelector(nav)?.classList[action](moveY);
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
const toggleBackgroundCard =
  (cards: HTMLElement[], currentIndex: number, action: 'add' | 'remove', cardSelector = '.project') => {
    try {
      if (currentIndex < 1) return;
      if (currentIndex >= 1) {
        cards[currentIndex - 1].querySelector(cardSelector)?.classList[action](backgroundCard);
      }
      if (currentIndex >= 2) {
        cards[currentIndex - 2].classList[action](hide);
      }
    } catch (err) {
      console.error(err);
    }
  };

/**
 * 
 * @param targetCard card of nav icons to be highlighted
 * @param currentCard current card where icons are highlighted
 */
const switchSelectedNavIcons = (targetCard: HTMLElement, currentCard: HTMLElement) => {
  setSelectedNavIcons(currentCard, false);
  setSelectedNavIcons(targetCard, true);
};

const setSelectedNavIcons =
  (card: HTMLElement, selected: boolean, iconSelector = '.nav-icon', cssSelected = navIconSelected) => {
    const action = selected ? 'add' : 'remove';
    card.querySelectorAll(iconSelector).forEach(icon => {
      icon.classList[action](cssSelected);
    })
  };

/**
 * helper wrapper for setting element's height.
 */
const setElementHeight = (elem: HTMLElement, height: number) => {
  elem.style.height = height + 'px';
}

const toggleProjectDisplayFixedPosition = (state: 'fixed' | 'not-fixed') => {
  if (state === 'fixed') {
    projectDisplay.classList.add('fixed');
  } else {
    projectDisplay.classList.remove('fixed');
  }
}