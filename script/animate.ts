//script to animate the intro screen.

export const animate = () => {

  //The intro screen.

  const container: HTMLDivElement = document.getElementById('intro-container') as HTMLDivElement;
  const introContainer = document.getElementById('intro-container');
  let bird: HTMLElement = document.getElementById('intro-bird') as HTMLImageElement;
  let birdParent: HTMLElement = document.getElementById('intro-sunset') as HTMLImageElement;

  type imgLoadCheck = (value: unknown) => void;


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
      console.log('here');
      container.replaceChild(birdParentImg, birdParent);
      container.replaceChild(birdImg, bird);
      birdParent = birdParentImg;
      birdParent.classList.add('background', 'anim-fadein');
      bird = birdImg;
      bird.classList.add('foreground', 'anim-slide-in-right');
      changeIntroSectionHeight(birdParent.getBoundingClientRect().height);
      // document.getElementById('content')?.classList.add('content-visible');
    }).catch(err => console.error(err));

  //call the resize image function in scroll and resize events.
  document.onscroll = () => {
    changeBirdSize();
  }

  window.onresize = () => {
    changeBirdSize();
    changeIntroSectionHeight(birdParent.getBoundingClientRect().height);
  }

  //chnage the size of the foreground img base on the ratio of scrolltop
  //and the background image's height.
  const changeBirdSize = () => {
    if (!bird || !birdParent) return;
    const distFromTop = document.documentElement.scrollTop;
    const sunBoundingRect = birdParent.getBoundingClientRect();
    const heightRatio = 1.0 - (distFromTop / sunBoundingRect.height) * 0.3;
    bird.style.width = (sunBoundingRect.width * (heightRatio)).toString() + 'px';
    bird.style.height = (sunBoundingRect.height * (heightRatio)).toString() + 'px';
  }

}