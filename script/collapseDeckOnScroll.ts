const contentContainer = document.getElementById('content') as HTMLDivElement;
const projectContainer = document.getElementById('projects');
const navBar = document.getElementById('tab-nav-bar');
const navBarFiller = document.getElementById('nav-filler');
const fixedNavBar = 'tab-nav-fixed';

/**
 * 
 * @param maxWidth max screen viewport width size before this stops taking effect.
 */
export const collapseDeckOnScroll = (maxWidth: number) => {
  const projectCards = Array.from(document.getElementsByClassName('project-card')) as HTMLElement[];

  document.addEventListener('scroll', () => {

    if (contentContainer.getBoundingClientRect().top <= 0) {
      toggleNavBarFixedPosition('fixed')
      console.log(navBar);

    } else {
      toggleNavBarFixedPosition('not-fixed');
    }
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