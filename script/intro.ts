import * as ramblings from './ramblings.json';
import { createElementWithClasses } from './util';
const content = document.getElementById('content');
const about = document.getElementById('about');
const introContainer = document.getElementById('intro-container');


export const intro = async () => {

  //add the scroll reminder after bg image has loaded.
  const introBGImg = '../public/images/sunset.png';
  const image = new Image();
  image.src = introBGImg;
  image.onload = () => {
    showScrollReminder();
    introContainer?.classList.add('anim-fadein-long');
  }
  // showScrollReminder();
  const rambling: string[] = JSON.parse(JSON.stringify(ramblings)).ramblings[0].text.split('\n');

  const ramblingArticle = createRambling(rambling);
  about?.appendChild(ramblingArticle);

  changeContentOpacityOnHeightShown();

  //call the resize image function in scroll and resize events.
  document.onscroll = () => {
    changeContentOpacityOnHeightShown();
    showScrollReminder();
  };

  window.addEventListener('resize', () => {
    changeContentOpacityOnHeightShown();
    showScrollReminder();
  }, false);

}


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
}


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
}

const createRambling = (paragrahs: string[]) => {
  const container = createElementWithClasses('article', 'ramblings');
  paragrahs.forEach(paragraph => {
    const para = document.createElement('p');
    para.textContent = paragraph;
    container.appendChild(para);
  });

  return container;

}