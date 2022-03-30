import { createProjectCard, createProjectPlaceholder, collapseDeckOnScroll } from "../card";
import { getProjects } from "../data";


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

/**
 * load all the projects for display.
 */
export const loadProjects = async (widthThreshold = 570) => {

  //fetch projects data
  const projectsData = await getProjects('https://seegg.github.io/src/data/projects.json');
  const projects = projectsData[document.body.id === 'demo' ? 'test-projects' : 'projects'];

  if (projectsContainer && contentContainer) {
    //Calculate initial size of project container.
    setprojectsContainerWidth(projects.length, fullCardWidth, partialCardWidth, maxWidth, minWidth);

    //Recalculate the container everytime window resizes.
    window.addEventListener('resize',
      () => {
        setprojectsContainerWidth(projects.length, fullCardWidth, partialCardWidth, maxWidth, minWidth);
      });

    //add self removing listener, if projects are not visible. don't play deck open animation
    const visibleProjectHeight = window.innerHeight - projectsContainer.getBoundingClientRect().top;

    if (visibleProjectHeight < visibleHeightThreshold) {
      document.addEventListener('scroll', function introDeckAnimation() {

        const currentVisibleProjectHeight = window.innerHeight - projectsContainer.getBoundingClientRect().top;
        if (currentVisibleProjectHeight >= visibleHeightThreshold) {
          (Array.from(projectsContainer.children) as HTMLElement[]).forEach(project => {
            toggleIntroDeckAnimation(project);
          });
          //remove this listener after animation has been triggered.
          document.removeEventListener('scroll', introDeckAnimation);
        }
      });
    }

    //wait until all cards are loaded before adding the scrolling deck effect for small screens.
    await Promise.allSettled(projects.map(project => {
      //create place holder project card and replace it when the acutal project loads.
      const placeHolder = createProjectPlaceholder();
      projectsContainer.appendChild(placeHolder);

      return new Promise<HTMLDivElement>(resolve => {
        resolve(
          ((): HTMLDivElement => {
            const projectCard = createProjectCard(project, contentContainer);
            if (visibleProjectHeight < visibleHeightThreshold) {
              toggleIntroDeckAnimation(projectCard);
            }
            return projectCard as HTMLDivElement;
          })()
        )
      }).then((card) => {
        placeHolder.replaceWith(card);
        (card as HTMLDivElement).classList.add('anim-fadein');
      }).catch(err => console.error(err));
    }));

    collapseDeckOnScroll(widthThreshold);

  } else {
    throw new Error('Some error');
  }

};

/**
 * Helper function to toggle the css classes responsible for the initial 
 * card opening animation.
 */
const toggleIntroDeckAnimation = (project: HTMLElement) => {
  project.classList.toggle(cssIntroOnce);
  const nav = project.querySelector('.nav-project');
  nav?.classList.toggle(cssInvisible);
  nav?.classList.toggle(cssFadeInLong);
}

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
