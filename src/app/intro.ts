import { loadImage } from "../util";
import { loadImageCallback } from "../types";

const content = document.getElementById('content');
const introContainer = document.getElementById('intro-container');

export const intro = async () => {

  //set background and scroll remainder after the iamge either loads or fails.
  const introBGImg = '../public/images/sunset.png';
  const introBGCallback: loadImageCallback = (img) => {
    showScrollReminder();
    if (introContainer) {
      introContainer.style.backgroundImage = `url(${img.src})`;
      introContainer.classList.add('anim-fadein-long');
    }
  };
  loadImage(introBGImg, introBGCallback, introBGCallback);

  //preload placeholder image
  const placeHolderImg = '../public/images/placeholder.png';
  loadImage(placeHolderImg);

  changeContentOpacityOnHeightShown();

  document.onscroll = () => {
    changeContentOpacityOnHeightShown();
    showScrollReminder();
    console.log((document.querySelector('.intro') as HTMLElement).style.backgroundImage)
    console.log(introContainer?.style.backgroundImage);
  };

  window.addEventListener('resize', () => {
    changeContentOpacityOnHeightShown();
    showScrollReminder();
  }, false);

};


/**
 * adjust the content's opacity base on how much is visible on screen.
 * @param threshold the height where opacity becomes 1.
 */
const changeContentOpacityOnHeightShown = (threshold = 500) => {
  if (!content) return;
  let heightShown = window.innerHeight - content.getBoundingClientRect().top;
  heightShown = Math.pow(heightShown * 0.05, 2);
  const opacity = heightShown <= 0 ? 0 : heightShown >= threshold ? 1 : heightShown / threshold;
  content.style.opacity = opacity.toString();
};


/**
 * show the scoll reminder if content is not visible
 */
const showScrollReminder = () => {
  if (!content) return;
  if (window.innerHeight - content.getBoundingClientRect().top > 0) {
    document.getElementById('scroll-reminder')?.classList.remove('show-scroll');
  } else {
    document.getElementById('scroll-reminder')?.classList.add('show-scroll');
  }
};