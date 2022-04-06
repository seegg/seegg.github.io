import { setUpNavBar, intro, loadProjects, loadRamblings } from "./app";
import { addCssClassToTouchDevices } from './util';

//add hasTouch class to content container to check whether it's touch device or not.
addCssClassToTouchDevices(document.getElementById('content') || null);
const widthThreshold = 570;
// let projects: AllProjects;

const setUp = async () => {

  intro();
  setUpNavBar(widthThreshold);

  loadProjects(document.body.id === 'demo');

  loadRamblings();

  // document.addEventListener('click', () => { loadProjects() });
};

setUp();