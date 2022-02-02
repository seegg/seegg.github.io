//script to animate the intro screen.
import { disableHoverOnTouch } from "./util";

export const animate = () => {

  const container: HTMLDivElement = document.getElementById('intro-container') as HTMLDivElement;
  const introContainer = document.getElementById('intro-container');
  const content = document.getElementById('content');
  let bird: HTMLElement;
  let birdParent: HTMLElement;

  type imgLoadCheck = (value: unknown) => void;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  disableHoverOnTouch(content!);

  //set the height for the placeholder element.

  const changeIntroSectionHeight = (height: number) => {
    if (introContainer) introContainer.style.height = height + 'px';
  };
  // changeIntroSectionHeight(window.screenX * (imgSize.height / imgSize.width));

  //get the images for the animation.
  const birdImg = new Image();
  birdImg.src = "https://seegg.github.io/images/bird-d.png";
  birdImg.alt = "bird";

  const birdParentImg = new Image();
  birdParentImg.src = "https://seegg.github.io/images/sunset.png";
  birdParentImg.alt = "sunset with birds";

  //assign promises to each image, call resolve in img onload event.
  const imgResolves = [birdImg, birdParentImg].map(img => {
    let res: imgLoadCheck;
    const imgPromise = new Promise(resolve => { res = resolve });
    img.onload = () => {
      res('loaded');
    }
    return imgPromise;
  })

  //check that both image is loaded and then replace the placeholders
  //and add classes to the img elements to trigger the animation.
  Promise.all(imgResolves)
    .then(() => {
      container.appendChild(birdParentImg);
      container.appendChild(birdImg);
      birdParent = birdParentImg;
      birdParent.classList.add('background', 'anim-fadein');
      bird = birdImg;
      bird.classList.add('foreground', 'anim-slide-in-right');
      changeIntroSectionHeight(birdParent.getBoundingClientRect().height);
    }).catch(err => console.error(err));

  //call the resize image function in scroll and resize events.
  document.onscroll = () => {
    changeBirdSize(0.3);
    changeContentOpacityOnHeightShown();
  }

  window.onresize = () => {
    changeBirdSize(0.3);
    changeIntroSectionHeight(birdParent.getBoundingClientRect().height);
    changeContentOpacityOnHeightShown();
  }

  /**
   * chnage the size of the foreground img base on the ratio of scrolltop
   * and the background image's height.
   * @param ratio a multiplier to change how fast/slow the foreground changes.
   * @returns 
   */
  const changeBirdSize = (ratio: number) => {
    if (!bird || !birdParent) return;
    const distFromTop = document.documentElement.scrollTop;
    const sunBoundingRect = birdParent.getBoundingClientRect();
    const heightRatio = 1.0 - (distFromTop / sunBoundingRect.height) * ratio;
    bird.style.width = (sunBoundingRect.width * (heightRatio)).toString() + 'px';
    bird.style.height = (sunBoundingRect.height * (heightRatio)).toString() + 'px';
  }

  /**
   * adjust the content's opacity base on how much is visible on screen.
   * @param threshold the height where opacity becomes 1.
   */
  const changeContentOpacityOnHeightShown = (threshold = 500) => {
    if (!content) return;
    const heightShown = window.innerHeight - content.getBoundingClientRect().top;
    const opacity = heightShown <= 0 ? 0 : heightShown >= threshold ? 1 : heightShown / threshold;
    content.style.opacity = opacity.toString();
  }


}

