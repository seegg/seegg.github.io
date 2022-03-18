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
  const currentIndex = 0;
  const prevScrollY = window.scrollY;
  const prevTime = 0;
  let scrolling = false;
  const counter = 0;
  const started = false;
  const startY = 0;
  if (contentContainer.getBoundingClientRect().top <= 0) {
    toggleNavBarFixedPosition('fixed');
  }

  document.addEventListener('scroll', () => {
    if (window.innerWidth >= 570) return;
    const top = contentContainer.getBoundingClientRect().top;

    const endOfIndex = currentIndex >= projectCards.length - 1
    if (top <= 0) {
      toggleNavBarFixedPosition('fixed');

    } else {
      toggleNavBarFixedPosition('not-fixed');
    }

    if (top <= -50 && !endOfIndex && !scrolling) {
      document.body.style.overflowY = 'hidden';
      window.scrollTo(
        {
          top: heightThreshold,
          behavior: 'smooth'
        }
      )

      scrolling = true;
    }

    if (top >= -20 && currentIndex > 0 && !scrolling) {
      document.body.style.overflowY = 'hidden';
      window.scrollTo(
        {
          top: heightThreshold,
          behavior: 'smooth'
        }
      )
      scrolling = true;
    }


    if (top >= -40 && top <= -30) {
      scrolling = false;
      document.body.style.overflowY = 'auto';
    }
    console.log(top);

  });

  //change height threshold based on the height of the intro element.
  new ResizeObserver(() => {
    heightThreshold = intro!.getBoundingClientRect().height + 35;
    if (contentContainer.getBoundingClientRect().top <= 0) {
      toggleNavBarFixedPosition('fixed');
    }
  }).observe(intro!);
}

const toggleNavBarFixedPosition = (state: 'fixed' | 'not-fixed') => {
  if (state === 'fixed') {
    navBar?.classList.add(fixedNavBar);
    // navBarFiller?.classList.remove('hide');
    navBarFiller?.classList.add('nav-filler-expand');
  } else if (state === 'not-fixed') {
    navBar?.classList.remove(fixedNavBar);
    // navBarFiller?.classList.add('hide');
    navBarFiller?.classList.remove('nav-filler-expand');
  }

}

const e = () => {
  new Promise((res, err) => {
    try {
      throw new Error('fuck you');
      res('bob')
    } catch (e) {
      err('stuff');
    }
  }).then(result => console.log(result))
    .catch(err => console.log(err.message));
}