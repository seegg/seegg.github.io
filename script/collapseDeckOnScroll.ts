import { between } from "./util";

const contentContainer = document.getElementById('content') as HTMLDivElement;
const projectsContainer = document.getElementById('projects') as HTMLDivElement;
const intro = document.getElementById('intro-container');
const navBar = document.getElementById('tab-nav-bar');
const navBarFiller = document.getElementById('nav-filler');
const fixedNavBar = 'tab-nav-fixed';
const closeCard = 'close-deck-partial';
const navIconSelected = 'nav-icon-selected';
const navSelector = '.nav-project';
const backgroundCard = 'background-card';
const hide = 'close-deck-full';
const moveY = 'moveY-40';
const ellapseDTimeThreshold = 300; fixedNavBar
let heightThreshold = 400;

/**
 * 
 * @param maxWidth max screen viewport width size before this stops taking effect.
 */
export const collapseDeckOnScroll = (maxWidth = 470) => {
  console.log(projectsContainer);
  const projectCards = Array.from(projectsContainer.querySelectorAll('.project-card')) as HTMLElement[];
  const lowerBound = -50; //stash card when top of container scroll pass this point.
  const upperBound = -20; //draw card when top of container scroll over this point.
  const midPoint = -35; //for convenience.
  let currentIndex = 0;
  let prevTime = 0;
  let scrolling = false;
  let started = false;
  let prevScollY = window.scrollY;

  if (intro) heightThreshold = intro.getBoundingClientRect().height - midPoint;
  if (contentContainer.getBoundingClientRect().top <= 0) toggleNavBarFixedPosition('fixed');
  // if (maxWidth <= 570) setSelectedNavIcons(projectCards[0], true);

  document.addEventListener('scroll', () => {
    const { top } = contentContainer.getBoundingClientRect();

    const endOfIndex = currentIndex >= projectCards.length - 1
    //fixed the nav bar to the top of the screen if it leaves the viewport
    if (top <= 0) {
      toggleNavBarFixedPosition('fixed');
    } else {
      if (endOfIndex || currentIndex <= 0 || top >= 100) {
        toggleNavBarFixedPosition('not-fixed');
      }
    }

    if (window.innerWidth >= maxWidth) return;

    //minimum wait time before cards can be stashed/drawed again.
    const currentTime = new Date().getTime();
    let ellapsedTime = currentTime - prevTime;
    if (!scrolling) {
      //stash card
      //make height of current card smaller, couple with css transistion to make a
      //'stashing' card effect.
      if (top <= lowerBound && !endOfIndex && started) {
        if (ellapsedTime >= ellapseDTimeThreshold) {
          stashCard(projectCards[currentIndex + 1], projectCards[currentIndex]);
          currentIndex++;
          prevTime = currentTime;

          //wait until css height transistion is finish before hiding previous background card.
          //making sure the wait time is less than the time scrolling is re-enabable again.
          const waitTime = 300;
          setTimeout(() => {
            toggleBackgroundCard(projectCards, currentIndex, 'add');
          }, waitTime <= ellapseDTimeThreshold ? waitTime : ellapseDTimeThreshold);
        }
        scrolling = true;
      }
      //draw card
      //expand the previous card back to original hard, pushing current card 'downward' on the layout
      //no need to wait to toggle background card because the current card is being 'taken away'.
      if (top >= upperBound && currentIndex > 0 && started) {
        if (ellapsedTime >= ellapseDTimeThreshold) {
          toggleBackgroundCard(projectCards, currentIndex, 'remove');
          drawCard(projectCards[currentIndex - 1], projectCards[currentIndex]);
          currentIndex--;
          prevTime = currentTime;
        }
        scrolling = true;
      }

      if (scrolling) scrollYViewport(heightThreshold, 'smooth');
      if (!started && top <= 0) {
        started = true;
        setSelectedNavIcons(projectCards[currentIndex], true);
        //add 500ms extra to prevTime so multiple cards don't collapse at first scroll.
        prevTime = new Date().getTime();
      }
    }

    //enable drawing/stashing cards again if scroll into range.
    if (between(top, midPoint - 5, midPoint + 5) && currentIndex < projectCards.length - 1) {
      scrolling = false;
    }

    //handle the behaviour of the last card.
    if (currentIndex >= projectCards.length - 1) {
      //wait until viewport has finish resizing before deciding what to do.
      ellapsedTime = new Date().getTime() - prevTime;
      if (ellapsedTime > 600 && window.scrollY - prevScollY < 0) {
        drawCard(projectCards[currentIndex - 1], projectCards[currentIndex]);
        toggleBackgroundCard(projectCards, currentIndex, 'remove');
        currentIndex--;
        prevTime = new Date().getTime() + 100;
        //wait until the card has expanded before scrolling.
        setTimeout(() => {
          scrollYViewport(heightThreshold, 'smooth');
          scrolling = false;
        }, 100);
      }
      //keep track of y scroll position to determine of scrolling up or down.
      prevScollY = window.scrollY;
    }

  });

  //adjust heightThreshold and deck behaviour base on intro element dimensions.
  const introResizeObserver = new ResizeObserver(entries => {
    const { inlineSize, blockSize } = entries[0].contentBoxSize[0];
    heightThreshold = blockSize - midPoint;
    if (contentContainer.getBoundingClientRect().top < 0) {
      toggleNavBarFixedPosition('fixed');
      if (!started) scrollYViewport(heightThreshold, 'smooth');
    } else {
      toggleNavBarFixedPosition('not-fixed');
    }

    if (inlineSize >= maxWidth) reset();
  });

  //remove selected css class from nav icons when intro element is 25% or more visible.
  const introIntersectObserver = new IntersectionObserver(entries => {
    console.log(entries[0]);
    if (entries[0].isIntersecting && currentIndex < projectCards.length - 1) {
      setSelectedNavIcons(projectCards[currentIndex], false);
      started = false;
    }
  }, { rootMargin: '0px', threshold: 0.25 })

  if (intro) {
    introResizeObserver.observe(intro);
    introIntersectObserver.observe(intro);
  }

  //click fall back incase scroll is not available due to screen size.
  projectsContainer.addEventListener('click', () => {
    if (currentIndex <= 0 || window.innerWidth >= maxWidth) return;
    if (new Date().getTime() - prevTime > ellapseDTimeThreshold) {
      drawCard(projectCards[currentIndex - 1], projectCards[currentIndex]);
      toggleBackgroundCard(projectCards, currentIndex, 'remove');

      prevTime = new Date().getTime();
      if (currentIndex >= projectCards.length - 1) {
        //wait until the card has expanded before scrolling.
        prevTime += 300;
        scrolling = true;
        setTimeout(() => {
          scrollYViewport(heightThreshold, 'smooth');
        }, 400);
      }
      currentIndex--;
    }
  });

  //reset the state of the cards.
  const reset = () => {
    //remove any css classes that alter the card
    projectCards.forEach(card => {
      card.classList.remove(closeCard, backgroundCard, hide);
      card.querySelector('.nav-project')?.classList.remove(moveY);
    });
    //remove the selected icons
    projectCards[currentIndex].querySelectorAll('.nav-icon')?.forEach(card => {
      card.classList.remove(navIconSelected);
    })
    //reset values to original;
    currentIndex = 0;
    started = false;
    scrolling = false;
  };
};

const toggleNavBarFixedPosition = (state: 'fixed' | 'not-fixed') => {
  if (state === 'fixed') {
    navBar?.classList.add(fixedNavBar);
    navBarFiller?.classList.add('nav-filler-expand');
  } else if (state === 'not-fixed') {
    navBar?.classList.remove(fixedNavBar);
    navBarFiller?.classList.remove('nav-filler-expand');
  }

};

/**
 * disable overflowY and then scroll to destination
 **/
const scrollYViewport = (yCoord: number, behavior: ScrollBehavior) => {
  document.body.style.overflowY = 'hidden';
  window.scrollTo(
    {
      top: yCoord,
      behavior
    }
  );
  setTimeout(() => {
    document.body.style.overflowY = 'auto';
  }, ellapseDTimeThreshold);
};

/**
 * Add css class to current selected project card to make its height smaller
 * and make the next card on the layout cover on top of it.
 * @param next card to be selected
 * @param current card to be collapse and stash away.
 */
const stashCard = (next: HTMLElement, current: HTMLElement) => {
  toggleCardHeightStatus(current, 'collapse');
  switchSelectedNavIcons(next, current);
};

/**
 * Remove css class from project card that makes its height smaller and return
 * it to full height.
 * @param prev 
 * @param current 
 */
const drawCard = (prev: HTMLElement, current: HTMLElement) => {
  toggleCardHeightStatus(prev, 'expand');
  switchSelectedNavIcons(prev, current);
};


/**
 * Toggle the height of project card by adding and removing css classes.
 * @param card project card
 * @param state state of card's height
 * @param nav css selector for card navigation
 */
const toggleCardHeightStatus = (card: HTMLElement, state: 'collapse' | 'expand', nav = navSelector) => {
  try {
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
const toggleBackgroundCard = (cards: HTMLElement[], currentIndex: number, action: 'add' | 'remove', cardSelector = '.project') => {
  try {
    if (currentIndex < 2) return;
    if (currentIndex >= 2) {
      cards[currentIndex - 2].querySelector(cardSelector)?.classList[action](backgroundCard);
    }
    if (currentIndex >= 3) {
      cards[currentIndex - 3].classList[action](hide);
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

const setSelectedNavIcons = (card: HTMLElement, selected: boolean, iconSelector = '.nav-icon', cssSelected = navIconSelected) => {
  const action = selected ? 'add' : 'remove';
  card.querySelectorAll(iconSelector).forEach(icon => {
    icon.classList[action](cssSelected);
  })
};