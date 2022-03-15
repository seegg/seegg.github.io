const contentContainer = document.getElementById('content') as HTMLDivElement;

/**
 * 
 * @param maxWidth max screen viewport width size before this stops taking effect.
 */
export const collapseDeckOnScroll = (maxWidth: number) => {
  document.addEventListener('scroll', (evt) => {
    console.log('scroll');
  })

}