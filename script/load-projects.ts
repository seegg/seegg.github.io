import { getProjects } from "./data";
import { Project } from "./types";

const contentWrapper = document.getElementById('content');
// const imagePath = location.href + "images/";
const imagePath = "https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/"

/**
 * load all the projects for display.
 */
export const loadProjects = () => {
  if (contentWrapper) {
    getProjects().forEach(project => {
      //construct and attach the placeholder to DOM
      const placeHolder = createProjectPlaceholder();
      contentWrapper.appendChild(placeHolder);

      //replace the placeholder once the acutal project card has finish
      //loading.
      new Promise(resolve => {
        resolve(
          (() => {
            const projectCard = createProjectComponent(project);
            return projectCard;
          })()
        )
      }).then((card) => {
        contentWrapper.replaceChild(card as HTMLDivElement, placeHolder);
        (card as HTMLDivElement).classList.add('anim-fadein');
      }).catch(err => console.error(err));

    })


  }
}

/**
 * Create the product card to display a project.
 * @param project 
 * @returns 
 */
const createProjectComponent = (project: Project): HTMLElement => {
  //outer article 
  const projectContainer = document.createElement('article');
  projectContainer.classList.add('project-container');

  //link to repo with github logo
  const repoLink = document.createElement('nav');
  repoLink.classList.add('nav-project');

  const repoAnchor = document.createElement('a');
  repoAnchor.href = project.repo || '';
  const gitHLogo = new Image();
  gitHLogo.src = "http://localhost:8000/images/GitHub-Mark-Light-32px.png"
  gitHLogo.classList.add('github-logo');
  repoAnchor.appendChild(gitHLogo);
  repoLink.appendChild(repoAnchor);
  projectContainer.appendChild(repoLink);

  //container for the project details
  const secondArticle = document.createElement('article');
  secondArticle.classList.add('project');
  secondArticle.onpointerenter = () => {
    secondArticle.classList.add('project-select');
    repoLink.classList.add('nav-project-moveY');
  }
  secondArticle.onpointerleave = () => {
    secondArticle.classList.remove('project-select');
    repoLink.classList.remove('nav-project-moveY');
  }
  secondArticle.onpointercancel = () => {
    secondArticle.classList.remove('project-select');
    repoLink.classList.remove('nav-project-moveY');
  }

  // image for the project
  const imgWrapper = document.createElement('div');
  imgWrapper.classList.add('project-img-container');
  const projectImg = new Image();
  projectImg.src = imagePath + project.image;

  projectImg.classList.add('project-img');
  imgWrapper.appendChild(projectImg);
  secondArticle.appendChild(imgWrapper);

  //inner article for descriptions
  const innerArticle = document.createElement('article');
  innerArticle.classList.add('project-description');
  innerArticle.innerHTML = `<h4 class="project-title">${project.name}</h4><p>${project.description}</p>`
  secondArticle.appendChild(innerArticle);

  //if the project has a site 
  if (project.url) {
    secondArticle.innerHTML = `<a href="${project.url}">${secondArticle.innerHTML}</a>`
  }
  projectContainer.appendChild(secondArticle);

  return projectContainer;
}

/**
 * create a placeholder for the project until it loads.
 * @returns 
 */
const createProjectPlaceholder = () => {
  const placeholder = document.createElement('div');
  placeholder.classList.add('placeholder-container');

  const nav = document.createElement('div');
  nav.classList.add('placeholder-nav');
  const linkLogo = document.createElement('div');
  linkLogo.classList.add('placeholder-nav-logo', 'placeholder')

  nav.appendChild(linkLogo);
  placeholder.appendChild(nav);

  const project = document.createElement('div');
  project.classList.add('placeholder-project', 'placeholder');

  const image = document.createElement('div');
  image.classList.add('placeholder-image', 'placeholder');
  const triangle = document.createElement('div');
  const triangleBig = document.createElement('div');
  const triangleContainer = document.createElement('div');
  triangle.classList.add('placeholder-triangle');
  triangleBig.classList.add('placeholder-triangle-big');
  triangleContainer.classList.add('triangle-container');
  triangleContainer.appendChild(triangleBig);
  triangleContainer.appendChild(triangle);
  image.appendChild(triangleContainer);
  project.appendChild(image);

  const title = document.createElement('div');
  title.classList.add('placeholder-title', 'placeholder');
  project.appendChild(title);

  const description = document.createElement('div');
  description.classList.add('placeholder-description', 'placeholder');
  project.appendChild(description);

  placeholder.appendChild(project);

  return placeholder;
}