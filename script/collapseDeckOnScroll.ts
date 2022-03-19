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
  let prevTime = 0;
  let scrolling = false;
  let started = false;
  let prevScollY = window.scrollY;
  if (contentContainer.getBoundingClientRect().top <= 0) {
    toggleNavBarFixedPosition('fixed');
    projectCards[0].querySelectorAll('.nav-icon').forEach(icon => icon.classList.add('nav-icon-partial'));
  }

  document.addEventListener('scroll', () => {
    if (window.innerWidth >= 570) return;
    const { top } = contentContainer.getBoundingClientRect();

    const endOfIndex = currentIndex >= projectCards.length - 1
    if (top <= 0) {
      toggleNavBarFixedPosition('fixed');
      projectCards[currentIndex].querySelectorAll('.nav-icon').forEach(icon => icon.classList.add('nav-icon-partial'));

    } else if (endOfIndex || currentIndex <= 0) {
      toggleNavBarFixedPosition('not-fixed');
    }


    const currentTime = new Date().getTime();
    let ellapsedTime = currentTime - prevTime;
    if (!scrolling) {
      if (top <= -50 && !endOfIndex && started) {
        console.log('triggered -50');
        if (ellapsedTime >= ellapseDTimeThreshold) {
          if (currentIndex === 7) console.log('what?.');
          projectCards[currentIndex].classList.add(closeCard);
          projectCards[currentIndex].querySelector('.nav-project')?.classList.add(moveY);
          projectCards[currentIndex].querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('nav-icon-partial'));
          currentIndex++;
          prevTime = currentTime;
        }
        scrolling = true;
      }

      if (top >= -20 && currentIndex > 0 && started) {
        if (ellapsedTime >= ellapseDTimeThreshold) {
          projectCards[currentIndex - 1].classList.remove(closeCard);
          projectCards[currentIndex - 1].querySelector('.nav-project')?.classList.remove(moveY);
          projectCards[currentIndex].querySelectorAll('.nav-icon').forEach(icon => icon.classList.remove('nav-icon-partial'));
          currentIndex--;
          prevTime = currentTime;
        }
        scrolling = true;
      }

      if (scrolling) scrollYViewport(heightThreshold, 'smooth');
      if (!started) {
        started = true;
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

    if (inlineSize >= 570) reset();
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
  }
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