const contentContainer = document.getElementById('content') as HTMLDivElement;
const projectContainer = document.getElementById('projects');
const intro = document.getElementById('intro-container');
const navBar = document.getElementById('tab-nav-bar');
const navBarFiller = document.getElementById('nav-filler');
const fixedNavBar = 'tab-nav-fixed';
const closeCard = 'close-deck-height';
const closeCardFull = 'close-deck-full-height';
const hide = 'hide';
const moveY = 'moveY-40';
const ellapseDTimeThreshold = 300;
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
  let scrolling = false;
  let started = false;
  if (contentContainer.getBoundingClientRect().top <= 0) {
    toggleNavBarFixedPosition('fixed');
  }

  document.addEventListener('scroll', () => {
    console.log('scrolled');
    if (window.innerWidth >= 570) return;
    const { top } = contentContainer.getBoundingClientRect();

    const endOfIndex = currentIndex >= projectCards.length - 1
    if (top <= 0) {
      toggleNavBarFixedPosition('fixed');

    } else if (endOfIndex || currentIndex <= 0) {
      toggleNavBarFixedPosition('not-fixed');
    }

    const currentTime = new Date().getTime();
    const ellapsedTime = currentTime - prevTime;
    if (!scrolling) {
      if (top <= -50 && !endOfIndex && started) {
        if (ellapsedTime >= ellapseDTimeThreshold) {
          projectCards[currentIndex].classList.add(closeCard);
          projectCards[currentIndex].querySelector('.nav-project')?.classList.add(moveY);
          currentIndex++;
          prevTime = currentTime;
        }
        scrolling = true;
      }

      if (top >= -20 && currentIndex > 0 && started) {
        console.log('undecked', ellapsedTime);
        if (ellapsedTime >= ellapseDTimeThreshold) {
          console.log('undecked confirmed');
          projectCards[currentIndex - 1].classList.remove(closeCard);
          currentIndex--;
          prevTime = currentTime;
        }
        scrolling = true;
      }

      if (scrolling) scrollYViewport(heightThreshold, 'smooth');
      if (!started) {
        started = true;
        prevTime = new Date().getTime();
      }
    }

    if (top >= -40 && top <= -30 && currentIndex < projectCards.length - 1) {
      scrolling = false;
      // document.body.style.overflowY = 'auto';
    }

    if (currentIndex >= projectCards.length - 1) {
      // document.body.style.overflowY = 'auto';
      // if (ellapsedTime > 600) {
      //   projectCards[currentIndex - 1].classList.remove(closeCard);
      //   currentIndex--;
      //   prevTime = currentTime;
      //   setTimeout(() => {
      //     scrollYViewport(heightThreshold, 'smooth');
      //   }, 150);
      //   scrolling = true;
      // }
    }

  });

  //change height threshold based on the height of the intro element.
  new ResizeObserver(() => {
    console.log('stuff');
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
} 