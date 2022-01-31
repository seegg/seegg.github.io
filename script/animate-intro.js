"use strict";
const container = document.getElementById('intro-container');
let bird = document.getElementById('intro-bird');
let birdParent = document.getElementById('intro-sunset');
let birdResolve;
const checkBird = new Promise(resolve => { birdResolve = resolve; });
let birdParentResolve;
const checkBirdParent = new Promise(resolve => { birdParentResolve = resolve; });
const birdImg = new Image();
birdImg.src = "https://seegg.github.io/images/bird-d.png";
birdImg.alt = "bird";
birdImg.onload = () => {
    birdResolve('bird loaded');
};
const birdParentImg = new Image();
birdParentImg.src = "https://seegg.github.io/images/sunset.png";
birdParentImg.alt = "sunset with birds";
birdParentImg.onload = () => {
    birdParentResolve('bird parent loaded');
};
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
};
const changeBirdSize = () => {
    if (!bird || !birdParent)
        return;
    const distFromTop = document.documentElement.scrollTop;
    const sunBoundingRect = birdParent.getBoundingClientRect();
    const heightRatio = 1.0 - (distFromTop / sunBoundingRect.height) * 0.2;
    bird.style.width = (sunBoundingRect.width * (heightRatio)).toString() + 'px';
    bird.style.height = (sunBoundingRect.height * (heightRatio)).toString() + 'px';
};
