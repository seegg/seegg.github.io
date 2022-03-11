import { animate } from "./animate";
import { loadProjects } from './load-projects';
import { disableHoverOnTouch } from './util';


disableHoverOnTouch(document.getElementById('content')!);

animate();
loadProjects();
