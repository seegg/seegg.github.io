import { animate } from "./animate";
import { loadProjects } from './load-projects';
import { addCssClassToTouchDevices } from './util';
import { setUpNavBar } from './nav';
import { collapseDeckOnScroll } from './collapseDeckOnScroll';

//add hasTouch class to content container to check whether it's touch device or not.
addCssClassToTouchDevices(document.getElementById('content') || null);

setUpNavBar(570);
animate();
loadProjects();
collapseDeckOnScroll(450);
