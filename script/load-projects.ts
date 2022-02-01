import { getProjects } from "./data";
import { Project } from "./types";

const contentWrapper = document.getElementById('content');
const imagePath = location.href + "images/";

/**
 * load all the projects for display.
 */
export const loadProjects = () => {
  if (contentWrapper) {
    getProjects().forEach(project => {
      const view = createProjectComponent(project);
      contentWrapper.appendChild(view);
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