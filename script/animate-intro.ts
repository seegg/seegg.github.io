//script to animate the intro splash screen
const container: HTMLDivElement = document.getElementById('intro-container') as HTMLDivElement;
let bird: HTMLElement = document.getElementById('intro-bird') as HTMLImageElement;
let birdParent: HTMLElement = document.getElementById('intro-sunset') as HTMLImageElement;

type loadCheck = (value: unknown) => void;

let birdResolve: loadCheck;
const checkBird = new Promise(resolve => { birdResolve = resolve });
let birdParentResolve: loadCheck;
const checkBirdParent = new Promise(resolve => { birdParentResolve = resolve });

const birdImg = new Image();
birdImg.src = "https://seegg.github.io/images/bird-d.png";
birdImg.alt = "bird";
birdImg.onload = () => {
  birdResolve('bird loaded');
}

const birdParentImg = new Image();
birdParentImg.src = "https://seegg.github.io/images/sunset.png";
birdParentImg.alt = "sunset with birds";
birdParentImg.onload = () => {
  birdParentResolve('bird parent loaded');
}

Promise.all([checkBird, checkBirdParent])
  .then(() => {
    container.replaceChild(birdParentImg, birdParent);
    container.replaceChild(birdImg, bird);
    birdParent = birdParentImg;
    birdParent.classList.add('background');
    bird = birdImg;
    bird.classList.add('foreground');

  }).catch(err => console.error(err));


document.addEventListener('scroll', () => {
  changeBirdSize();
});

window.onresize = () => {
  changeBirdSize();
}

const changeBirdSize = () => {
  if (!bird || !birdParent) return;
  const distFromTop = document.documentElement.scrollTop;
  const sunBoundingRect = birdParent.getBoundingClientRect();
  const heightRatio = 1.0 - (distFromTop / sunBoundingRect.height) * 0.2;
  bird.style.width = (sunBoundingRect.width * (heightRatio)).toString() + 'px';
  bird.style.height = (sunBoundingRect.height * (heightRatio)).toString() + 'px';
}

// function debounce(callback: (...param: any) => void, wait = 300) {
//   let timer: number;
//   return function (...args: any) {
//     clearTimeout(timer);
//     timer = setTimeout(() => { callback(...args) }, wait);
//   }
// }