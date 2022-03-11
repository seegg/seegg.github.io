import { animate } from "./animate";
import { loadProjects } from './load-projects';
import { disableHoverOnTouch } from './util';


disableHoverOnTouch(document.getElementById('content')!);

// console.log(document.getElementById('content')?.classList.contains('hasHover'));

animate();
loadProjects();
