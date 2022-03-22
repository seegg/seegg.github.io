import { getProjects } from "./data";
import { createProjectCard, createProjectPlaceholder } from "./project-card/card"


const projectsContainer = document.getElementById('projects');
const contentContainer = document.getElementById('content');

//css utility classes
const cssFadeInLong = 'anim-fadein-long';
const cssIntroOnce = 'intro-only-once';
const cssInvisible = 'invisible';

// const imagePath = location.href + "images/";
const imagePath = "https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/";

/**
 * load all the projects for display.
 */
export const loadProjects = async () => {
  if (projectsContainer && contentContainer) {
    //project card dimensions.
    const fullCardWidth = 250; //expanded card size
    const partialCardWidth = 160; //overlapping card size
    const maxWidth = 1690; //max container width
    const minWidth = 310; //min container width, acutal size of each project card.
    const visibleHeightThreshold = 300; //visible height for the main element

    //Calculate initial size of project container.
    const projects = getProjects();
    setprojectsContainerWidth(projects.length, fullCardWidth, partialCardWidth, maxWidth, minWidth);

    //Recalculate the container everytime window resizes.
    window.addEventListener('resize',
      () => {
        setprojectsContainerWidth(projects.length, fullCardWidth, partialCardWidth, maxWidth, minWidth);
      });

    //add intro listener, if projects are not visible. don't play deck open animation
    const visibleProjectHeight = window.innerHeight - projectsContainer.getBoundingClientRect().top;

    if (visibleProjectHeight < visibleHeightThreshold) {
      document.addEventListener('scroll', function introDeckAnimation() {

        const currentVisibleProjectHeight = window.innerHeight - projectsContainer.getBoundingClientRect().top;
        if (currentVisibleProjectHeight >= visibleHeightThreshold) {
          (Array.from(projectsContainer.children) as HTMLElement[]).forEach(project => {
            toggleIntroDeckAnimation(project);
          });
          //remove this listener
          document.removeEventListener('scroll', introDeckAnimation);
        }
      });
    }

    //load projects from projects.json
    projects.forEach(async project => {
      //construct and attach the placeholder to the DOM
      const placeHolder = createProjectPlaceholder();
      projectsContainer.appendChild(placeHolder);

      // replace the placeholder once the acutal project card has finish loading.

      await new Promise<HTMLDivElement>(resolve => {
        resolve(
          ((): HTMLDivElement => {
            //const projectCard = createProjectComponent(project, visibleProjectHeight);
            const projectCard = createProjectCard(project, contentContainer, imagePath);
            if (visibleProjectHeight < visibleHeightThreshold) {
              toggleIntroDeckAnimation(projectCard);
            }
            return projectCard as HTMLDivElement;
          })()
        )
      }).then((card) => {
        placeHolder.replaceWith(card);
        (card as HTMLDivElement).classList.add('anim-fadein');
      }).catch(err => console.error(err))
    });
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
