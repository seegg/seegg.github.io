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
    // setprojectsContainerWidth(330, 20, projectsContainer);

    // window.addEventListener('resize', () => { setprojectsContainerWidth(320, 20, projectsContainer), false })

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
  // projectContainer.classList.add('project-container');

  //link to repo with github logo
  const repoLink = createElementWithClasses('nav', 'nav-project');

  const gitHubLink = createNavItem(project.repo || '', imagePath + "GitHub-Mark-Light-32px.png", 'nav-logo');
  repoLink.appendChild(gitHubLink);

  if (project.url) {
    const link = createNavItem(project.url, '../images/link.png', 'nav-logo');
    repoLink.prepend(link);
  }

  projectContainer.appendChild(repoLink);

  //container for the project details
  const secondArticle = createElementWithClasses('article', 'project');

  //animate the log and article body when mousing over it.
  projectContainer.onpointerenter = () => {
    animateMouseEnterArticle(secondArticle, repoLink, 'entering');
  };
  projectContainer.onpointerleave = () => {
    animateMouseEnterArticle(secondArticle, repoLink, 'leaving');
  };
  projectContainer.onpointercancel = () => {
    animateMouseEnterArticle(secondArticle, repoLink, 'leaving');
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
}

/**
 * wrapper for animating the enter and leave effects for the card.
 */
const animateMouseEnterArticle = (article: HTMLElement, repoLink: HTMLElement, status: 'entering' | 'leaving') => {
  if (status === "entering") {
    article.classList.add('project-select');
    repoLink.classList.add('nav-project-moveY');
  } else {
    article.classList.remove('project-select');
    repoLink.classList.remove('nav-project-moveY');
  }
}

/**
 * set the width of the content container as a multiple of the width of the project card.
 * as long as it's less than the size of the outer container.
 * @param width The width for each indvidual project card.
 * @param constant
 */
const setprojectsContainerWidth = (cardWidth: number, padding: number, wrapper: HTMLElement) => {
  const parentWidth = wrapper.parentElement?.clientWidth;
  if (parentWidth !== undefined) {
    let width = parentWidth - (parentWidth % cardWidth);
    width += padding;
    wrapper.style.width = width + 'px';
  }
}

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
}

const createImgPlaceHolder = () => {
  const imageContainer = createElementWithClasses('div', 'placeholder-image', 'placeholder');
  const triangle = createElementWithClasses('div', 'placeholder-triangle');
  const triangleBig = createElementWithClasses('div', 'placeholder-triangle-big');
  const triangleContainer = createElementWithClasses('div', 'triangle-container');
  triangleContainer.appendChild(triangleBig);
  triangleContainer.appendChild(triangle);
  imageContainer.appendChild(triangleContainer);

  return imageContainer;
}