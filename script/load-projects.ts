import { getProjects } from "./data";
import { Project } from "./types";
import { createElementWithClasses, createNavItem } from "./util";

const projectsContainer = document.getElementById('projects');
const contentContainer = document.getElementById('content');

console.log(contentContainer?.classList);

// const imagePath = location.href + "images/";
const imagePath = "https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/";

/**
 * load all the projects for display.
 */
export const loadProjects = () => {
  if (projectsContainer) {
    setprojectsContainerWidth(310, 160, 1750);

    window.addEventListener('resize', () => { setprojectsContainerWidth(310, 160, 1750), false })

    getProjects().forEach(project => {
      //construct and attach the placeholder to the DOM
      const placeHolder = createProjectPlaceholder();
      projectsContainer.appendChild(placeHolder);

      //replace the placeholder once the acutal project card has finish
      //loading.
      new Promise<HTMLDivElement>(resolve => {
        resolve(
          ((): HTMLDivElement => {
            const projectCard = createProjectComponent(project);
            return projectCard as HTMLDivElement;
          })()
        )
      }).then((card) => {
        placeHolder.replaceWith(card);
        (card as HTMLDivElement).classList.add('anim-fadein');
      }).catch(err => console.error(err));

    })
  }
};

/**
 * Create the product card to display a project.
 * @param project 
 * @returns 
 */
const createProjectComponent = (project: Project): HTMLElement => {
  //outer article 
  const projectContainer = createElementWithClasses('section', 'project-container');
  projectContainer.tabIndex = -1;

  //link to repo with github logo
  const repoLink = createElementWithClasses('nav', 'nav-project');

  const gitHubLink = createNavItem(project.repo || '', imagePath + "GitHub-Mark-Light-32px.png", 'nav-logo');
  repoLink.appendChild(gitHubLink);

  const link = createNavItem(project.url || '', '../images/link.png', 'nav-logo');
  repoLink.prepend(link);


  projectContainer.appendChild(repoLink);

  //container for the project details
  const secondArticle = createElementWithClasses('article', 'project');

  //animate the log and article body when mousing over it.
  projectContainer.onpointerenter = () => {
    projectContainer.focus();
    animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'entering');
  };
  projectContainer.onpointerleave = () => {
    if (contentContainer?.classList.contains('touch-device')) return;
    console.log('leaving');
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
    console.log('entering');
    animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'entering');
  };

  // image for the project
  let imgWrapper;
  if (project.image) {
    imgWrapper = createElementWithClasses('div', 'project-img-container');
    const projectImg = new Image();
    projectImg.src = imagePath + project.image;
    projectImg.classList.add('project-img');

    //append the image only after it loads.
    projectImg.onload = (evt) => {
      projectContainer.getElementsByClassName('project-img-container')[0].appendChild(projectImg);
      (evt.target as HTMLImageElement).classList.add('anim-fadein');
    }
  } else {
    imgWrapper = createImgPlaceHolder();
  }
  secondArticle.appendChild(imgWrapper);

  //inner article for descriptions
  const innerArticle = createElementWithClasses('article', 'project-description');

  innerArticle.innerHTML = `<a href="${project.url}"><h4 class="project-title">${project.name}</h4></a><p>${project.description}</p>`
  secondArticle.appendChild(innerArticle);

  projectContainer.appendChild(secondArticle);

  return projectContainer;
};

/**
 * wrapper for animating the enter and leave effects for the card.
 */
const animateMouseEnterArticle = (article: HTMLElement, repoLink: HTMLElement, container: HTMLElement, status: 'entering' | 'leaving') => {

  const logoImgs = Array.from(repoLink.querySelectorAll('img')) as HTMLImageElement[];

  if (status === "entering") {
    article.classList.add('project-select');
    repoLink.classList.add('nav-project-moveY', 'nav-project-partial');
    logoImgs.forEach(img => img.classList.add('nav-logo-partial'));
    container.classList.add('full-card-size');
  } else {
    article.classList.remove('project-select');
    repoLink.classList.remove('nav-project-moveY', 'nav-project-partial');
    container.classList.remove('full-card-size');
    logoImgs.forEach(img => img.classList.remove('nav-logo-partial'));
  }
};

/**
 * set the width of the content container as a multiple of the width of the project card.
 * as long as it's less than the size of the outer container.
 */
const setprojectsContainerWidth = (fullCardWidth: number, partialCardWidth: number, maxWidth: number) => {

  const parentWidth = contentContainer?.clientWidth;
  if (parentWidth !== undefined && projectsContainer) {
    const maxCards = Math.floor((parentWidth - fullCardWidth) / 160);
    const width = Math.min(Math.max(fullCardWidth, maxCards * partialCardWidth + (fullCardWidth - partialCardWidth)), maxWidth);
    projectsContainer.style.width = width + 'px';
  }
};

/**
 * create a placeholder for the project until it loads.
 * @returns 
 */
const createProjectPlaceholder = () => {
  const placeholder = createElementWithClasses('div', 'placeholder-container');


  const nav = createElementWithClasses('div', 'placeholder-nav');
  const linkLogo = createElementWithClasses('div', 'placeholder-nav-logo', 'placeholder');

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