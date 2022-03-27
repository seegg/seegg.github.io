import { createElementWithClasses, createNavItem } from "./util";
import { Project } from "./types";

/**
 * Create the product card to display a project.
 * @param project 
 * @returns 
 */
export const createProjectCard =
  (project: Project, contentContainer: HTMLElement, focusWidth = 570): HTMLElement => {
    //project container 
    const projectContainer = createElementWithClasses('section', 'project-card', 'anim-open-deck');
    projectContainer.tabIndex = -1;

    //link to repo with github logo
    const repoLink = createElementWithClasses('nav', 'nav-project', 'anim-fadein-long');
    const gitHubLink = createNavItem(project.repo || '#', "../images/GitHub-Mark-Light-32px.png", 'nav-icon');
    repoLink.appendChild(gitHubLink);
    //external link for project, if any.
    const link = createNavItem(project.url || '#', '../images/link.png', 'nav-icon');
    repoLink.prepend(link);
    projectContainer.appendChild(repoLink);

    //container for the project image and project details
    const secondArticle = createElementWithClasses('article', 'project');

    //animate the log and article body when mousing over it.
    secondArticle.onpointerenter = () => {
      if (window.innerWidth >= focusWidth) projectContainer.focus();
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

    const projectImg = project.image ? project.image : null;
    // image for the project
    const imgWrapper: HTMLDivElement = createProjectImage(projectImg);
    secondArticle.appendChild(imgWrapper);

    //inner article for descriptions
    const innerArticle = createElementWithClasses('article', 'project-description');

    innerArticle.innerHTML = `<h4 class="project-title"><a href="${project.url}"><span class="material-icons">link</span></a>${project.name}</h4><p>${project.description}</p>`
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
      projectImg.classList.add('anim-fadein-long');
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