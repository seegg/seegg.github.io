import { loadImageCallback } from "../types";
/**
 * Enable and disabled hover effects by adding and removing a class from parent container.
 * @param container HTMLElement parent node containing all the elements that is to be checked.
 */
export const addCssClassToTouchDevices = (container: HTMLElement | null): void => {
  if (container === null) return;
  let lastTouchTime = 0;
  container.classList.add('hasHover');
  const enableHover = () => {
    if (new Date().getTime() - lastTouchTime < 500) return;
    container.classList.add('hasHover');
    container.classList.remove('touch-device');
  };

  const disableHover = () => {
    container.classList.add('touch-device');
    container.classList.remove('hasHover');
  };

  const updateLastTouchTime = () => {
    lastTouchTime = new Date().getTime();
  };

  document.addEventListener('touchstart', updateLastTouchTime, true);
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

/**
 * create a nav item for project cards.
 * @param href link
 * @param src image scr
 * @param classes image css classes
 */
export const createNavItem = (href: string, src: string, ...classes: string[]) => {
  const anchor = document.createElement('a');
  anchor.href = href;
  const logoImg = new Image();
  logoImg.src = src;
  logoImg.classList.add(...classes);
  anchor.appendChild(logoImg);
  return anchor;
};

export const sleep = async (duration: number) => {
  const timeOutID = await new Promise(resolve => {
    const id = setTimeout(() => {
      resolve(id);
    }, duration);
  });
  return timeOutID as number;
}

/**
 * check if number is within a certain range.
 * @param num number to be checked
 * @param lower lower bound number
 * @param upper upper bound number
 * @returns 
 */
export const between = (num: number, lower: number, upper: number) => {
  return num >= lower && num <= upper;
}

/**
 * disable overflowY and then scroll to destination
 * re-enable after certain specified duration
 **/
export const scrollYViewport = (yCoord: number, behavior: ScrollBehavior, disableScrollDuration: number) => {
  document.body.style.overflowY = 'hidden';
  window.scrollTo(
    {
      top: yCoord,
      behavior
    }
  );
  setTimeout(() => {
    document.body.style.overflowY = 'auto';
  }, disableScrollDuration);
};

/**
 * helper wrapper for setting element's height.
 */
export const setElementHeight = (elem: HTMLElement, height: number) => {
  elem.style.height = height + 'px';
};

/**
 * helper function to scroll to a y coordinate on body and then wait for
 * a specified duration before allowing scrolling again.
 * @param yCoord y coordinate to scroll to.
 * @param pauseDuration duration to disable overflow-y for.
 */
export const scrollToPosAndPause = (element: HTMLElement, yCoord: number, pauseDuration = 200) => {
  element.style.overflowY = 'hidden';
  window.scrollTo({
    top: yCoord,
    behavior: 'auto'
  });
  setTimeout(() => {
    element.style.overflowY = 'auto';
  }, pauseDuration);
}

/**
 * helper function for preloading images
 */
export const loadImage = (src: string, onLoadCallback?: loadImageCallback, onErrorCallback?: loadImageCallback) => {
  const image = new Image();
  image.src = src;
  if (onLoadCallback) {
    image.onload = (evt) => { onLoadCallback(image, evt) };
  }
  if (onErrorCallback) {
    image.onerror = (evt) => { onErrorCallback(image, evt) };
  }

  return image;
}