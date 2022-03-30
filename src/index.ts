import { intro, loadProjects, loadRamblings, setUpNavBar } from "./app";
import { addCssClassToTouchDevices } from './util';

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
