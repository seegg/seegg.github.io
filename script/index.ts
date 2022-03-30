import { intro } from "./intro";
import { loadProjects } from './load-projects';
import { addCssClassToTouchDevices } from './util';
import { setUpNavBar } from './nav';
import { loadRamblings } from './load-blog';

//add hasTouch class to content container to check whether it's touch device or not.
addCssClassToTouchDevices(document.getElementById('content') || null);
const widthThreshold = 570;

const setUp = async () => {
  setUpNavBar(widthThreshold);
  intro();
  loadProjects(widthThreshold);
  loadRamblings();
};

setUp();
