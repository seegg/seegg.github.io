"use strict";
const container = document.getElementById('intro-container');
let bird = document.getElementById('intro-bird');
let birdParent = document.getElementById('intro-sunset');
const birdImg = new Image();
birdImg.src = "https://seegg.github.io/images/bird-d.png";
birdImg.alt = "bird";
const birdParentImg = new Image();
birdParentImg.src = "https://seegg.github.io/images/sunset.png";
birdParentImg.alt = "sunset with birds";
const imgResolves = [birdImg, birdParentImg].map(img => {
    let res;
    const imgPromise = new Promise(resolve => { res = resolve; });
    img.onload = () => {
        res('loaded');
    };
    return imgPromise;
});
Promise.all(imgResolves)
    .then(() => {
    container.replaceChild(birdParentImg, birdParent);
    container.replaceChild(birdImg, bird);
    birdParent = birdParentImg;
    birdParent.classList.add('background');
    bird = birdImg;
    bird.classList.add('foreground');
}).catch(err => console.error(err));
document.onscroll = () => {
    changeBirdSize();
};
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
