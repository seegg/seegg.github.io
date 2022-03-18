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
  let prevTime = 0;

  document.addEventListener('scroll', () => {
    if (window.innerWidth >= 570) return;
    const top = contentContainer.getBoundingClientRect().top;
    const endOfIndex = currentIndex >= projectCards.length - 1
    if (top <= 0) {
      toggleNavBarFixedPosition('fixed');

    } else {
      toggleNavBarFixedPosition('not-fixed');
    }

    if (top <= -20) {
      const currentTime = new Date().getTime();

      if (currentTime - prevTime > 500) {
        projectCards[currentIndex].classList.add(closeCard);
        currentIndex++;
        prevTime = currentTime;
      }

      document.body.style.overflowY = 'hidden';
      window.scrollTo({
        top: heightThreshold,
        behavior: 'smooth'
      });
    }

    if (top >= -10) {
      document.body.style.overflowY = 'auto';
    }

    if (currentIndex > 0) {
      if (top >= 20) {
        const currentTime = new Date().getTime();

        if (currentTime - prevTime > 500) {
          projectCards[currentIndex - 1].classList.remove(closeCard);
          currentIndex--;
          prevTime = currentTime;
        }
        document.body.style.overflowY = 'hidden';
        window.scrollTo({
          top: heightThreshold,
          behavior: 'smooth'
        });
      }
    }

    console.log(currentIndex);

  });

  new ResizeObserver(() => {
    heightThreshold = intro!.getBoundingClientRect().height + 10;
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