import { intro } from "./intro";
import { loadProjects } from './load-projects';
import { addCssClassToTouchDevices } from './util';
import { setUpNavBar } from './nav';
import { getProjects, getTestProjects } from "./data";
import { loadRamblings } from './load-blog';

//add hasTouch class to content container to check whether it's touch device or not.
addCssClassToTouchDevices(document.getElementById('content') || null);
const widthThreshold = 570;

const setUp = async () => {
  const projects = document.body.id === 'demo' ? getTestProjects() : getProjects();

  setUpNavBar(widthThreshold);
  intro();
  loadProjects(projects, widthThreshold);
  loadRamblings();
};

setUp();
