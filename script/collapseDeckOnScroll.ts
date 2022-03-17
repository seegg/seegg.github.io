const contentContainer = document.getElementById('content') as HTMLDivElement;
const projectContainer = document.getElementById('projects');
const intro = document.getElementById('intro-container');
const navBar = document.getElementById('tab-nav-bar');
const navBarFiller = document.getElementById('nav-filler');
const fixedNavBar = 'tab-nav-fixed';
const closeCard = 'close-deck-height';
const closeCardFull = 'close-deck-full-height';
const hide = 'hide';
const moveY = 'moveY-30';
let heightThreshold = 220;

/**
 * 
 * @param maxWidth max screen viewport width size before this stops taking effect.
 */
export const collapseDeckOnScroll = (maxWidth: number) => {
  const projectCards = Array.from(document.getElementsByClassName('project-card')) as HTMLElement[];
  let currentIndex = 0;
  const prevScrollY = window.scrollY;

  for (let i = 1; i < projectCards.length - 1; i++) {
    projectCards[i].classList.add(closeCard);
  }

  document.addEventListener('scroll', (evt) => {
    const top = contentContainer.getBoundingClientRect().top;
    if (top <= 0) {
      toggleNavBarFixedPosition('fixed');

    } else {
      toggleNavBarFixedPosition('not-fixed');
    }

  });

  projectContainer?.addEventListener('click', () => {
    try {
      projectCards[currentIndex].classList.add(closeCard);
      projectCards[currentIndex + 1].classList.remove(closeCard);
      currentIndex++;
    } catch (err) {
      console.log(err);
    }

  })

  new ResizeObserver(() => {
    heightThreshold = intro!.getBoundingClientRect().height - 10;
    console.log(heightThreshold);
  }).observe(intro!);
}

const toggleNavBarFixedPosition = (state: 'fixed' | 'not-fixed') => {
  if (state === 'fixed') {
    navBar?.classList.add(fixedNavBar);
    navBarFiller?.classList.remove('hide');
  } else if (state === 'not-fixed') {
    navBar?.classList.remove(fixedNavBar);
    navBarFiller?.classList.add('hide');
  }

}