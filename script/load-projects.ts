import { getProjects } from "./data";
import { Project } from "./types";
import { createElementWithClasses, createNavItem } from "./util";

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
export const loadProjects = () => {
  if (projectsContainer) {
    //project card dimensions.
    const fullCardWidth = 250; //expanded card size
    const partialCardWidth = 160; //overlapping card size
    const maxWidth = 1690; //max container width
    const minWidth = 310; //min container width, acutal size of each project card.

    //Calculate initial size of project container.
    const projects = getProjects();
    setprojectsContainerWidth(projects.length, fullCardWidth, partialCardWidth, maxWidth, minWidth);

    //Recalculate the container everytime window resizes.
    window.addEventListener('resize',
      () => { setprojectsContainerWidth(projects.length, fullCardWidth, partialCardWidth, maxWidth, minWidth) });

    //add intro only listener, if projects are not visible. don't play deck open animation
    //until a certain threshold is meet.
    const visibleProjectHeight = projectsContainer ?
      window.innerHeight - projectsContainer.getBoundingClientRect().top : 0;

    const visibleHeightThreshold = 300;
    if (visibleProjectHeight < visibleHeightThreshold) {
      document.addEventListener('scroll', function introDeckAnimation() {
        const currentVisibleProjectHeight = projectsContainer ?
          window.innerHeight - projectsContainer.getBoundingClientRect().top : 0;

        if (currentVisibleProjectHeight >= visibleHeightThreshold) {
          //once visible height on the projects is bigger than threshold
          //remove intro only css classes and remove this listener.
          (Array.from(projectsContainer.childNodes) as HTMLElement[]).forEach(project => {
            project.classList.remove(cssIntroOnce);
            const navBar = project.getElementsByClassName('nav-project')[0];
            navBar.classList.remove(cssInvisible);
            navBar.classList.add(cssFadeInLong);
          });
          //remove listener
          document.removeEventListener('scroll', introDeckAnimation);
        }
      });
    }

    console.log(visibleProjectHeight);
    //load projects from projects.json
    projects.forEach(project => {
      //construct and attach the placeholder to the DOM
      const placeHolder = createProjectPlaceholder();
      projectsContainer.appendChild(placeHolder);

      // replace the placeholder once the acutal project card has finish loading.

      new Promise<HTMLDivElement>(resolve => {
        resolve(
          ((): HTMLDivElement => {
            const projectCard = createProjectComponent(project, visibleProjectHeight);
            return projectCard as HTMLDivElement;
          })()
        )
      }).then((card) => {
        placeHolder.replaceWith(card);
        (card as HTMLDivElement).classList.add('anim-fadein');
      }).catch(err => console.error(err));


    });

  }
};

/**
 * Create the product card to display a project.
 * @param project 
 * @returns 
 */
const createProjectComponent = (project: Project, visibleContent: number): HTMLElement => {
  //project container 
  const projectContainer = createElementWithClasses('section', 'project-container', 'anim-open-deck');
  projectContainer.tabIndex = -1;

  //link to repo with github logo
  const repoLink = createElementWithClasses('nav', 'nav-project', cssFadeInLong);
  const gitHubLink = createNavItem(project.repo || '#', imagePath + "GitHub-Mark-Light-32px.png", 'nav-icon');
  repoLink.appendChild(gitHubLink);
  //external link for project, if any.
  const link = createNavItem(project.url || '#', '../images/link.png', 'nav-icon');
  repoLink.prepend(link);
  projectContainer.appendChild(repoLink);

  //container for the project image and project details
  const secondArticle = createElementWithClasses('article', 'project');

  //animate the log and article body when mousing over it.
  secondArticle.onpointerenter = () => {
    projectContainer.focus();
    animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'entering');
  };
  projectContainer.onpointerleave = () => {
    if (contentContainer?.classList.contains('touch-device')) return;
    animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'leaving');
  };
  projectContainer.onpointercancel = () => {
    animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'leaving');
  };
  projectContainer.onblur = () => {
    animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'leaving');
  }
  projectContainer.onfocus = () => {
    if (!contentContainer?.classList.contains('touch-device')) return;
    animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'entering');
  };

  const projectImg = project.image ? imagePath + project.image : null;
  // image for the project
  const imgWrapper: HTMLDivElement = createProjectImage(projectImg);
  secondArticle.appendChild(imgWrapper);

  //inner article for descriptions
  const innerArticle = createElementWithClasses('article', 'project-description');

  innerArticle.innerHTML = `<a href="${project.url}"><h4 class="project-title">${project.name}</h4></a><p>${project.description}</p>`
  secondArticle.appendChild(innerArticle);
  projectContainer.appendChild(secondArticle);

  if (visibleContent < 300) {
    projectContainer.classList.add(cssIntroOnce);
    repoLink.classList.add(cssInvisible);
    repoLink.classList.remove(cssFadeInLong)
  }

  return projectContainer;
};

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
const setprojectsContainerWidth = (cardNumber: number, fullCardWidth: number, partialCardWidth: number, maxWidth: number, minWidth = 310) => {

  const parentWidth = contentContainer?.clientWidth;
  if (parentWidth !== undefined && projectsContainer) {
    const maxCards = Math.floor((parentWidth - fullCardWidth) / 160);
    const width = Math.min(Math.max(minWidth, Math.min(maxCards, cardNumber) * partialCardWidth + (fullCardWidth - partialCardWidth)), maxWidth);
    projectsContainer.style.width = width + 'px';
  }
};

/**
 * Create the image component for the project card.
 * @param imgSrc
 * @returns 
 */
const createProjectImage = (imgSrc: string | null) => {
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
 * create a placeholder for the project until it loads.
 * @returns 
 */
const createProjectPlaceholder = () => {
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