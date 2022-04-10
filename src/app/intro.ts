import { loadImage } from "../util";
import { loadImageCallback } from "../types";

const content = document.getElementById('content');
const introContainer = document.getElementById('intro-container');
const scrollReminder = document.getElementById('scroll-reminder');
const preload = [];

export const intro = async () => {

  //set background and scroll remainder after the iamge either loads or fails.
  const introBGCallback: loadImageCallback = (img) => {
    showScrollReminder();
    if (introContainer) {
      introContainer.style.backgroundImage = `url(${img.src})`;
      introContainer.classList.add('anim-fadein-long');
    }
  };

  //preload images
  loadImage('../public/images/sunset.png', introBGCallback, introBGCallback);
  preload.push(loadImage('../public/images/placeholder.png'), loadImage('../public/images/loading.svg'));

  changeContentOpacityOnHeightShown();

  document.onscroll = () => {
    changeContentOpacityOnHeightShown();
    showScrollReminder();
  };

  window.addEventListener('resize', () => {
    changeContentOpacityOnHeightShown();
    showScrollReminder();
  }, false);

  scrollReminder?.addEventListener('click', () => {
    window.scrollTo({
      top: introContainer?.getBoundingClientRect().height,
      behavior: 'smooth'
    })
  })

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
  if (window.innerHeight - content.getBoundingClientRect().top > 100) {
    scrollReminder?.classList.remove('show-scroll');
  } else {
    scrollReminder?.classList.add('show-scroll');
  }
};