import { createElementWithClasses, createNavItem, loadImage } from "../util";
import { Project } from "../types";

type InputState = 'entering' | 'leaving';
type InputType = 'touch' | 'mouse';


const contentContainer = <HTMLElement>document.getElementById('content');

/**
 * Create the product card to display a project.
 * @param project 
 * @returns 
 */
export const createProjectCard =
  (project: Project, focusWidth = 570): HTMLElement => {
    //project container 
    const projectContainer = createElementWithClasses('section', 'project-card', 'anim-open-deck');
    projectContainer.tabIndex = -1;

    const repoLink = createTopNavIcons(project);//link to repo with github log
    const secondArticle = createInfoCard(project);//container for the project image and project details
    projectContainer.append(repoLink, secondArticle);

    //remove selected status from the card when an external link is clicked.
    repoLink.childNodes.forEach(child => {
      child.addEventListener('click', () => {
        animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'leaving');
      });
    })

    /**
     * Wrapper for addListener function
     */
    const addListenerToComponent = (eventType: keyof HTMLElementEventMap, state: InputState, input?: InputType) => {
      const callback = () => { animateMouseEnterArticle(secondArticle, repoLink, projectContainer, state); };
      addListener(projectContainer, eventType, callback, contentContainer, input);
    }

    //animate the log and article body when mousing over it. set focus on the element for touch events.
    secondArticle.onpointerenter = () => {
      if (window.innerWidth >= focusWidth) projectContainer.focus();
      animateMouseEnterArticle(secondArticle, repoLink, projectContainer, 'entering');
    };
    //handling different events and conditions
    addListenerToComponent('pointerleave', 'leaving', 'mouse');
    addListenerToComponent('pointercancel', 'leaving');
    addListenerToComponent('blur', 'leaving', 'touch');
    addListenerToComponent('focus', 'entering', 'touch');

    return projectContainer;
  };

const createTopNavIcons = (project: Project) => {
  const repoLink = createElementWithClasses('nav', 'nav-project', 'anim-fadein-long');
  const gitHubLink = createNavItem(project.repo || '#', "../public/images/GitHub-Mark-Light-32px.png", 'nav-icon');
  repoLink.appendChild(gitHubLink);
  //external link for project, if any.
  const link = createNavItem(project.url || '#', '../public/images/link.png', 'nav-icon');
  repoLink.prepend(link);
  return repoLink;
};

/**
 * The part of the card below the nav icons.
 */
const createInfoCard = (project: Project) => {
  //container for the project image and project details
  const infoCard = createElementWithClasses('article', 'project');
  const projectImg = project.image ? project.image : null;
  const imgWrapper: HTMLDivElement = createProjectImage(projectImg);
  infoCard.appendChild(imgWrapper);

  //inner article for descriptions
  const innerArticle = createElementWithClasses('article', 'project-description');

  innerArticle.innerHTML = `<h4 class="project-title"><a href="${project.url}"><span class="material-icons">link</span></a>${project.name}</h4><p>${project.description}</p>`
  infoCard.appendChild(innerArticle);
  return infoCard;
}

/**
 * Helper function for animation and transitions for the project card.
 */
const animateMouseEnterArticle =
  (article: HTMLElement, repoLink: HTMLElement, container: HTMLElement, state: InputState, widthThreshold = 570) => {
    if (window.innerWidth < widthThreshold) return;
    const logoImgs = Array.from(repoLink.querySelectorAll('img')) as HTMLImageElement[];
    if (state === "entering") {
      article.classList.add('project-select');
      repoLink.classList.add('nav-project-moveY');
      logoImgs.forEach(img => img.classList.add('nav-icon-partial'));
      container.classList.add('full-card-size');
      //move the card to the top after 350ms if it's still selected.
      setTimeout(() => {
        if (container.classList.contains('full-card-size')) {
          container.classList.add('z-20', 'overlay-card-size');
        }
      }, 350);
    } else {
      article.classList.remove('project-select');
      repoLink.classList.remove('nav-project-moveY');
      container.classList.remove('full-card-size', 'z-20', 'overlay-card-size');
      logoImgs.forEach(img => img.classList.remove('nav-icon-partial'));
    }
  };

/**
 * helper method for adding an event listener to one of the card componets.
 * @param elem the element to add the listener to.
 * @param eventType 
 * @param callback event listener
 * @param contentContainer 
 * @param input mouse or touch input only
 */
const addListener = (elem: HTMLElement, eventType: keyof HTMLElementEventMap, callback: () => void, contentContainer?: HTMLElement, input?: InputType,) => {
  elem.addEventListener(eventType, () => {
    if (input === 'touch') {
      if (!contentContainer?.classList.contains('touch-device')) return;
    } else if (input === 'mouse') {
      if (contentContainer?.classList.contains('touch-device')) return;
    }
    callback();
  });
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
    const image = loadImage(imgSrc, () => {
      placeHolder.parentElement?.replaceChild(wrapper, placeHolder);
      image.classList.add('anim-fadein-long');
    });
    image.classList.add('project-img');
    wrapper.appendChild(image);
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
  const imageContainer = createElementWithClasses('div', 'project-img-container');
  const img = loadImage('../public/images/placeholder.png', (img) => { imageContainer.appendChild(img) });
  img.classList.add('project-img');

  return imageContainer;
};