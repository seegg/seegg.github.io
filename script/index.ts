import { animate } from "./animate";
import { loadProjects } from './load-projects';
import { disableHoverOnTouch } from './util';

//add class to content container to check whether it's touch device or not.
disableHoverOnTouch(document.getElementById('content') || null);

animate();
loadProjects();
