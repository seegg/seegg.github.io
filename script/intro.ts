const content = document.getElementById('content');

export const intro = async () => {


  changeContentOpacityOnHeightShown();
  showScrollReminder();

  //call the resize image function in scroll and resize events.
  document.onscroll = () => {
    changeContentOpacityOnHeightShown();
    showScrollReminder();
  }

  window.addEventListener('resize', () => {
    changeContentOpacityOnHeightShown();
    showScrollReminder();
  }, false)

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