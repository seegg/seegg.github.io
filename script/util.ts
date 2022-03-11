/**
 * Enable and disabled hover effects by adding and removing a class from parent container.
 * @param container HTMLElement parent node containing all the elements that is to be checked.
 */
export const disableHoverOnTouch = (container: HTMLElement): void => {
  let lastTouchTime = 0;

  const enableHover = () => {
    // if (new Date().getTime() - lastTouchTime < 500) return;
    container.classList.add('hasHover');
  };

  const disableHover = () => {
    container.classList.remove('hasHover');
  };

  const updateLastTouchTime = () => {
    lastTouchTime = new Date().getTime();
  };

  // document.addEventListener('touchstart', updateLastTouchTime, true);
  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);
}

export function debounce(callback: (...param: unknown[]) => void, wait = 300) {
  let timer: NodeJS.Timeout;
  return function (...args: unknown[]) {
    clearTimeout(timer);
    timer = setTimeout(() => { callback(...args) }, wait);
  }
}

/**
 * wrapper function for creating a HTMLelement and assigning classes to it.
 * @param tagName tag name of HTMLElement
 * @param arg comma seperated class names
 * @returns 
 */
export function createElementWithClasses<T extends keyof HTMLElementTagNameMap>(tagName: T, ...args: string[]) {
  const elem = document.createElement(tagName);
  elem.classList.add(...args);
  return elem;
}
