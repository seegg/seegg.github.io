import { createProjectCard, createProjectPlaceholder, setUpSmallScreenScrolling, isScrollDeckNull, updateScrollDeck } from "../card";
import { getProjects } from "../data";
import { Project } from "../types";
import { attachLoadingScreen } from "../util";

const projectsContainer = document.getElementById('projects');
const contentContainer = document.getElementById('content');

//project card dimensions.
const fullCardWidth = 250; //width taken up by an expanded card on the layout.
const partialCardWidth = 160; //width taken up by an overlapping card layout.
const maxWidth = 1690; //max container width
const minWidth = 310; //min container width, acutal size of each project card.
const visibleHeightThreshold = 300; //visible height for the main element

//css utility classes
const cssFadeInLong = 'anim-fadein-long';
const cssIntroOnce = 'intro-only-once';
const cssInvisible = 'invisible';

//references to the event listeners use for clean up.
let removeResizeListener: (() => void) | null = null;
let removeIntroListener: (() => void) | null = null;

/**
 * load all the projects for display.
 */
export const loadProjects = async (isDemo = false) => {

  if (projectsContainer && contentContainer) {
    //clean up
    removeResizeListener?.();
    removeIntroListener?.();

    //remove all children, add a loading icon while data is being fetch.
    projectsContainer.replaceChildren();
    const removeLoadingScreen = attachLoadingScreen(contentContainer);
    const data = await getProjects();
    const projects = data[isDemo ? 'test-projects' : 'projects'];
    removeLoadingScreen();

    if (!projects) return;

    //Calculate initial width of project container.
    setprojectsContainerWidth(projects.length, fullCardWidth, partialCardWidth, maxWidth, minWidth);
    removeResizeListener = changeWidthOnResize(projects);

    //project is consider visible when it's pass the threshold in px.
    const isProjectVisible = window.innerHeight - projectsContainer.getBoundingClientRect().top >= visibleHeightThreshold;

    const projectCards = await loadProjectCards(projects, projectsContainer, isProjectVisible);
    //add a scroll to trigger the opening deck transition if cards are initially out of view.
    if (!isProjectVisible) {
      removeIntroListener = cardIntroScrollListener(projectCards, projectsContainer);
    }
    //wait until all cards are loaded before adding the scrolling deck effect for small screens.
    if (isScrollDeckNull()) {
      setUpSmallScreenScrolling(projectCards);
    } else {
      updateScrollDeck(projectCards);
    }
  }

};

/**
 * Helper function to add a resize handler base on the card properties.
 * returns a removeListener function for clean up.
 * @returns removeListener function for the listener registered.
 */
const changeWidthOnResize =
  (projects: Project[], cardWidthMax = fullCardWidth, cardWidthPartial = partialCardWidth, max = maxWidth, min = minWidth) => {
    const handleResize = () => { setprojectsContainerWidth(projects?.length, cardWidthMax, cardWidthPartial, max, min); console.log('resie') };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize) };
  };

/**
 * Helper function to add a listener to the scroll event for intro animation.
 * @returns function to remove the registered listener
 */
const cardIntroScrollListener = (projects: HTMLElement[], container: HTMLElement) => {
  function introDeckAnimation() {
    if (window.innerHeight - container.getBoundingClientRect().top >= visibleHeightThreshold) {
      projects.forEach(project => {
        toggleIntroDeckAnimation(project, false);
      });
      //remove this listener after animation has been triggered.
      document.removeEventListener('scroll', introDeckAnimation);
    }
  }
  document.addEventListener('scroll', introDeckAnimation);
  return () => { document.removeEventListener('scroll', introDeckAnimation) };
};

/**
 * load the projects data into cards. 
 */
const loadProjectCards =
  async (projects: Project[], container: HTMLElement, isProjectVisible: boolean) => {
    const results = await Promise.allSettled(
      projects.map(project => {
        //create place holder project card and replace it when the acutal project loads.
        const placeHolder = createProjectPlaceholder();
        container.appendChild(placeHolder);

        return new Promise<HTMLElement>(resolve => {
          resolve(createProjectCard(project, container));
        }).then((card) => {
          //toggle the card to 'close' state if it was not on screen when created.
          //replace the placeholder with actual card once card is ready.
          if (!isProjectVisible) {
            toggleIntroDeckAnimation(card, true);
          }
          placeHolder.replaceWith(card);
          return card;
        }).catch(err => console.error(err));
      }));

    return results.map(result => { if (result.status === 'fulfilled') return result.value }) as HTMLElement[];
  };

/**
 * Helper function to toggle the css classes responsible for the initial 
 * card opening animation.
 */
const toggleIntroDeckAnimation = (project: HTMLElement, isStart = true) => {
  project.classList[isStart ? 'add' : 'remove'](cssIntroOnce);
  const nav = project.querySelector('.nav-project');
  nav?.classList[isStart ? 'add' : 'remove'](cssInvisible);
  nav?.classList[!isStart ? 'add' : 'remove'](cssFadeInLong);
};

/**
 * set the width of the content container as a multiple of the width of the project card.
 * as long as it's less than the size of the outer container.
 */
const setprojectsContainerWidth =
  (cardNumber: number, fullCardWidth: number, partialCardWidth: number, maxWidth: number, minWidth = 310) => {

    const parentWidth = contentContainer?.clientWidth;
    if (parentWidth !== undefined && projectsContainer) {
      const maxCards = Math.floor((parentWidth - fullCardWidth) / 160);
      const calculatedWidth = Math.min(maxCards, cardNumber) * partialCardWidth + (fullCardWidth - partialCardWidth);
      const width = Math.min(Math.max(minWidth, calculatedWidth), maxWidth);
      projectsContainer.style.width = width + 10 + 'px';
    }
  };
