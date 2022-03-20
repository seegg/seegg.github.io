const contentContainer = document.getElementById('content') as HTMLDivElement;
const intro = document.getElementById('intro-container');
const navBar = document.getElementById('tab-nav-bar');
const navBarFiller = document.getElementById('nav-filler');
const fixedNavBar = 'tab-nav-fixed';
const closeCard = 'close-deck-height';
const closeCardFull = 'close-deck-full-height';
const navIconSelected = 'nav-icon-selected';
const navSelector = '.nav-project';
const backgroundCard = 'project-darken';
const hide = 'hide';
const moveY = 'moveY-40';
const ellapseDTimeThreshold = 300;
let heightThreshold = 220;

/**
 * 
 * @param maxWidth max screen viewport width size before this stops taking effect.
 */
export const collapseDeckOnScroll = (maxWidth = 570) => {
  const projectCards = Array.from(document.getElementsByClassName('project-card')) as HTMLElement[];
  let currentIndex = 0;
  let prevTime = 0;
  let scrolling = false;
  let started = false;
  let prevScollY = window.scrollY;
  if (contentContainer.getBoundingClientRect().top <= 0) {
    toggleNavBarFixedPosition('fixed');
  }

  if (maxWidth <= 570) projectCards[0].querySelectorAll('.nav-icon').forEach(icon => icon.classList.add(navIconSelected));

  document.addEventListener('scroll', () => {
    if (window.innerWidth >= maxWidth) return;
    const { top } = contentContainer.getBoundingClientRect();

    const endOfIndex = currentIndex >= projectCards.length - 1
    if (top <= 0) {
      toggleNavBarFixedPosition('fixed');

    } else if (endOfIndex || currentIndex <= 0) {
      toggleNavBarFixedPosition('not-fixed');
    }


    const currentTime = new Date().getTime();
    let ellapsedTime = currentTime - prevTime;
    if (!scrolling) {
      if (top <= -50 && !endOfIndex && started) {
        if (ellapsedTime >= ellapseDTimeThreshold) {
          stashCard(projectCards[currentIndex + 1], projectCards[currentIndex]);
          currentIndex++;
          prevTime = currentTime;

          if (currentIndex >= 2) {
            console.log('darkeend');
            projectCards[currentIndex - 2].querySelector('.project')?.classList.add(backgroundCard);
          }

        }
        scrolling = true;
      }

      if (top >= -20 && currentIndex > 0 && started) {
        if (ellapsedTime >= ellapseDTimeThreshold) {
          if (currentIndex >= 2) {
            console.log('lightened');
            projectCards[currentIndex - 2].querySelector('.project')?.classList.remove(backgroundCard);
          }
          drawCard(projectCards[currentIndex - 1], projectCards[currentIndex]);
          currentIndex--;
          prevTime = currentTime;
        }
        scrolling = true;
      }

      if (scrolling) scrollYViewport(heightThreshold, 'smooth');
      if (!started) {
        started = true;
        //add 500ms extra to prevTime so multiple cards don't collapse at first scroll.
        prevTime = new Date().getTime() + 500;
      }
    }

    if (top >= -40 && top <= -30 && currentIndex < projectCards.length - 1) {
      scrolling = false;
    }

    if (currentIndex >= projectCards.length - 1) {
      ellapsedTime = new Date().getTime() - prevTime;
      if (ellapsedTime > 600 && window.scrollY - prevScollY < 0) {
        projectCards[currentIndex - 1].classList.remove(closeCard);
        projectCards[currentIndex - 1].querySelector('.nav-project')?.classList.remove(moveY);
        currentIndex--;
        prevTime = new Date().getTime() + 100;
        setTimeout(() => {
          scrollYViewport(heightThreshold, 'smooth');
          scrolling = false;
        }, 100);
      }
      prevScollY = window.scrollY;
    }

  });

  //adjust heightThreshold and deck behaviour base on intro element dimensions.
  const introResizeObserver = new ResizeObserver(entries => {
    const { inlineSize, blockSize } = entries[0].contentBoxSize[0];
    heightThreshold = blockSize + 35;
    if (contentContainer.getBoundingClientRect().top < 0) {
      toggleNavBarFixedPosition('fixed');
      if (!started) scrollYViewport(heightThreshold, 'smooth');
    } else {
      toggleNavBarFixedPosition('not-fixed');
    }

    if (inlineSize >= maxWidth) reset();
  });
  if (intro) introResizeObserver.observe(intro);

  const reset = () => {
    projectCards.forEach(card => {
      card.classList.remove(closeCard, closeCardFull);
      card.querySelector('.nav-project')?.classList.remove(moveY);
    });
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
 * disable overflowY and then scroll to coordinate
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
}

/**
 * Remove css class from project card that makes its height smaller and return
 * it to full height.
 * @param prev 
 * @param current 
 */
const drawCard = (prev: HTMLElement, current: HTMLElement) => {
  toggleCardHeightStatus(prev, 'expand');
  switchSelectedNavIcons(prev, current);
}


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
  } catch (err) {
    console.error(err);
  }
}

/**
 * 
 * @param targetCard card of nav icons to be highlighted
 * @param currentCard current card where icons are highlighted
 */
const switchSelectedNavIcons = (targetCard: HTMLElement, currentCard: HTMLElement, iconSelector = '.nav-icon') => {
  currentCard.querySelectorAll(iconSelector).forEach(icon => {
    icon.classList.remove(navIconSelected);
  });
  targetCard.querySelectorAll(iconSelector).forEach(icon => {
    icon.classList.add(navIconSelected);
  });
}