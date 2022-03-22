import { getProjects } from "./data";
import { Project } from "./types";
import { createElementWithClasses, createNavItem } from "./util";
import { createProjectCard } from "./project-card/card"


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
 * Create the product card to display a project.
 * @param project 
 * @returns 
 */
// export const createProjectComponent = (project: Project, visibleContent: number): HTMLElement => {
//   //project container 
//   const projectContainer = createElementWithClasses('section', 'project-card', 'anim-open-deck');
//   projectContainer.tabIndex = -1;

//   //link to repo with github logo
//   const repoLink = createElementWithClasses('nav', 'nav-project', cssFadeInLong);
//   const gitHubLink = createNavItem(project.repo || '#', imagePath + "GitHub-Mark-Light-32px.png", 'nav-icon');
//   repoLink.appendChild(gitHubLink);
//   //external link for project, if any.
//   const link = createNavItem(project.url || '#', '../images/link.png', 'nav-icon');
//   repoLink.prepend(link);
//   projectContainer.appendChild(repoLink);

//   //container for the project image and project details
//   const secondArticle = createElementWithClasses('article', 'project');

//   //animate the log and article body when mousing over it.
//   secondArticle.onpointerenter = () => {
//     projectContainer.focus();
//     animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'entering');
//   };
//   projectContainer.onpointerleave = () => {
//     if (contentContainer?.classList.contains('touch-device')) return;
//     animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'leaving');
//   };
//   projectContainer.onpointercancel = () => {
//     animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'leaving');
//   };
//   projectContainer.onblur = () => {
//     animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'leaving');
//   }
//   projectContainer.onfocus = () => {
//     if (!contentContainer?.classList.contains('touch-device')) return;
//     animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'entering');
//   };

//   const projectImg = project.image ? imagePath + project.image : null;
//   // image for the project
//   const imgWrapper: HTMLDivElement = createProjectImage(projectImg);
//   secondArticle.appendChild(imgWrapper);

//   //inner article for descriptions
//   const innerArticle = createElementWithClasses('article', 'project-description');

//   innerArticle.innerHTML = `<h4 class="project-title"><a href="${project.url}"><span class="material-icons">link</span></a>${project.name}</h4><p>${project.description}</p>`
//   secondArticle.appendChild(innerArticle);
//   projectContainer.appendChild(secondArticle);

//   if (visibleContent < 300) {
//     projectContainer.classList.add(cssIntroOnce);
//     repoLink.classList.add(cssInvisible);
//     repoLink.classList.remove(cssFadeInLong)
//   }

//   return projectContainer;
// };

/**
 * wrapper for animating the enter and leave effects for the card.
 */
const animateMouseEnterArticle = (article: HTMLElement, repoLink: HTMLElement, container: HTMLElement, status: 'entering' | 'leaving') => {

  const logoImgs = Array.from(repoLink.querySelectorAll('img')) as HTMLImageElement[];

  if (status === "entering") {
    article.classList.add('project-select');
    repoLink.classList.add('nav-project-moveY');
    logoImgs.forEach(img => img.classList.add('nav-icon-partial'));
    container.classList.add('full-card-size');
  } else {
    article.classList.remove('project-select');
    repoLink.classList.remove('nav-project-moveY');
    container.classList.remove('full-card-size');
    logoImgs.forEach(img => img.classList.remove('nav-icon-partial'));
  }
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

/**
 * Create the image component for the project card.
 * @param imgSrc
 * @returns 
 */
export const createProjectImage = (imgSrc: string | null) => {
  //start with a placeholder element. replace the placeholder if an image is available.
  const placeHolder: HTMLDivElement = createImgPlaceHolder();
  if (imgSrc) {
    const wrapper = createElementWithClasses('div', 'project-img-container');
    const projectImg = new Image();
    projectImg.src = imgSrc;
    projectImg.classList.add('project-img');
    wrapper.appendChild(projectImg);

    projectImg.onload = () => {
      //replace placholder when image finish loading.
      placeHolder.parentElement?.replaceChild(wrapper, placeHolder);
      projectImg.classList.add(cssFadeInLong);
    }
  }
  return placeHolder;
};

/**
 * create a placeholder card
 */
export const createProjectPlaceholder = () => {
  const placeholder = createElementWithClasses('div', 'placeholder-container');

  const nav = createElementWithClasses('div', 'placeholder-nav');
  const linkLogo = createElementWithClasses('div', 'placeholder-nav-icon', 'placeholder');

  nav.appendChild(linkLogo);
  placeholder.appendChild(nav);

  const project = createElementWithClasses('div', 'placeholder-project', 'placeholder');

  const image = createImgPlaceHolder();
  project.appendChild(image);

  const title = createElementWithClasses('div', 'placeholder-title', 'placeholder');
  project.appendChild(title);

  const description = createElementWithClasses('div', 'placeholder-description', 'placeholder');
  project.appendChild(description);

  placeholder.appendChild(project);

  return placeholder;
};

const createImgPlaceHolder = () => {
  const imageContainer = createElementWithClasses('div', 'placeholder-image', 'placeholder');
  const triangle = createElementWithClasses('div', 'placeholder-triangle');
  const triangleBig = createElementWithClasses('div', 'placeholder-triangle-big');
  const triangleContainer = createElementWithClasses('div', 'triangle-container');
  triangleContainer.appendChild(triangleBig);
  triangleContainer.appendChild(triangle);
  imageContainer.appendChild(triangleContainer);

  return imageContainer;
};