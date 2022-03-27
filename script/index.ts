import { intro } from "./intro";
import { loadProjects } from './load-projects';
import { addCssClassToTouchDevices } from './util';
import { setUpNavBar } from './nav';
import { collapseDeckOnScroll } from './collapseDeckOnScroll';
import { getProjects, getTestProjects } from "./data";

//add hasTouch class to content container to check whether it's touch device or not.
addCssClassToTouchDevices(document.getElementById('content') || null);

const setUp = async () => {
  const projects = document.body.id === 'demo' ? getTestProjects() : getProjects();

  //ordering matters.
  setUpNavBar(570);
  await intro();
  await loadProjects(projects);
  collapseDeckOnScroll(570);

};

setUp();
