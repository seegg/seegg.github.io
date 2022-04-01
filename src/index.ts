import { intro, loadProjects, loadRamblings, setUpNavBar } from "./app";
import { getProjects } from "./data";
import { Project } from "./types";
import { addCssClassToTouchDevices } from './util';

//add hasTouch class to content container to check whether it's touch device or not.
addCssClassToTouchDevices(document.getElementById('content') || null);
const widthThreshold = 570;
// let projects: AllProjects;

const setUp = async () => {

  intro();
  setUpNavBar(widthThreshold);

  new Promise<Project[]>(res => {
    res((async () => {
      //fetch projects data
      const projectsData = await getProjects('https://seegg.github.io/src/data/projects.json');
      // projects = projectsData;
      return projectsData[document.body.id === 'demo' ? 'test-projects' : 'projects'];
    })())
  }).then(result => {
    loadProjects(result, widthThreshold);
    return null;
  });

  loadRamblings();
};

setUp();