const contentContainer = document.getElementById('content') as HTMLDivElement;
const projectContainer = document.getElementById('projects');
const navBar = document.getElementById('tab-nav-bar');
const navBarFiller = document.getElementById('nav-filler');
const fixedNavBar = 'tab-nav-fixed';
const closeCard = 'close-deck-height';

/**
 * 
 * @param maxWidth max screen viewport width size before this stops taking effect.
 */
export const collapseDeckOnScroll = (maxWidth: number) => {
  const projectCards = Array.from(document.getElementsByClassName('project-card')) as HTMLElement[];
  let currentIndex = 0;
  let prevScrollY = window.scrollY;

  let prevTime = 0;
  document.addEventListener('scroll', () => {

    const top = contentContainer.getBoundingClientRect().top;
    const scrollYDiff = window.scrollY - prevScrollY;
    console.log('scrolling');
    if (top <= 0) {
      toggleNavBarFixedPosition('fixed');
      const currentTime = new Date().getTime();
      if (currentTime - prevTime >= 500) {
        if (scrollYDiff > 0) {
          console.log('triggered');
          prevTime = currentTime;
          projectCards[currentIndex].classList.add(closeCard);
          currentIndex++;
        } else {
          projectCards[currentIndex].classList.remove(closeCard);
          currentIndex--;
        }
        window.scrollTo({
          top: 220,
          left: 0,
          behavior: 'smooth'
        });
      }

    } else {
      toggleNavBarFixedPosition('not-fixed');
    }

    prevScrollY = window.scrollY;

  })

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