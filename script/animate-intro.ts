//script to animate the intro splash screen

const bird = document.getElementById('intro-bird');
const birdParent = document.getElementById('intro-sunset');

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

function debounce(callback: (...param: any) => void, wait = 300) {
  let timer: number;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => { callback(...args) }, wait);
  }
}