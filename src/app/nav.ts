import { NavigationCallback } from "../types";
import { openDeck, closeDeck } from '../card'
import { SyncAutoQueue } from "../util";

type RouteCallback = (target: HTMLElement | null) => void;

const navTabs = Array.from(document.getElementsByClassName('tab-nav')) as HTMLElement[];

export const navBar = document.getElementById('tab-nav-bar');
const navBarParentElement = navBar?.parentElement as HTMLElement;
const navBarFiller = document.getElementById('nav-filler');
const fixedNavBar = 'tab-nav-fixed';

const navigationQueue = new SyncAutoQueue<() => void>(); //queue use to schedule navigating between tabs.
const navigationRoutes = new Map<string, () => void>();

//css classes
const cssSelected = 'selected';
const cssHide = 'hide';
const cssFadeIn = 'anim-fadein';
const beforeNavCallbacks: NavigationCallback[] = [];
const afternavCallbacks: NavigationCallback[] = [];

//hash values for routes
export const [project, blog, contact, fallback] = ['#projects', '#blog', '#contacts', '#fallback'];

let currentHash = project;
let prevHash = project;
let isNavBarFixed = false;


export const setUpNavBar = async (widthThreshold = 570) => {
  //fixed the nav bar to the top when scrolling below the screen.
  document.addEventListener('scroll', () => {
    const { top } = navBarParentElement.getBoundingClientRect();
    if (top < 0) {
      toggleNavBarFixedPosition('fixed');
    } else {
      toggleNavBarFixedPosition('not-fixed');
    }
  });

  //handle route change when hash changes
  window.addEventListener('hashchange', () => {
    const hash = location.hash;
    navigateToHashRoute(hash);
  });


  //play the open/close deck transition when navigating to and from portfolio.
  const portfolioTransition: RouteCallback = async (target: HTMLElement | null) => {
    await openDeck(target);
    //self removing callback for away transition
    addNavCallback(function playLeaveTransition() {
      if (window.innerWidth >= widthThreshold) {
        addItemToNavigationQueue(async () => { await closeDeck(target); });
      }
      removeNavCallback(playLeaveTransition, 'before');
    }, 'before');
  }

  //registering routes.
  addRoute(project, document.getElementById('projects-wrapper'), navTabs[0], null, portfolioTransition);

  addRoute(blog, document.getElementById('about'), navTabs[1],);

  addRoute(contact, document.getElementById('contacts'), navTabs[2],);

  addRoute(fallback, document.getElementById('not-found'), null);

  //check hash value at start, navigate to default route if hash is empty or if it doesn't match any register routes.
  if (location.hash !== '' && navigationRoutes.has(location.hash)) {
    navigateToHashRoute(location.hash);
  } else {
    // navigateToHashRoute(currentHash);
    location.hash = currentHash;
  }

};

const navigateToHashRoute = (hash: string, storedHashRoutes = navigationRoutes) => {
  const route = storedHashRoutes.get(hash) || storedHashRoutes.get(fallback);
  if (typeof route === 'function') {
    route();
  }
};

/**
 * 
 * @param hash hash string for the route
 * @param content content for the route
 * @param navTab navigation menu icon
 * @param before callbacks before naviagtion
 * @param after callbacks after navitagion
 */
const addRoute =
  (hash: string, content: HTMLElement | null, navTab?: HTMLElement | null,
    before?: RouteCallback | null, after?: RouteCallback | null) => {
    if (navTab) (<HTMLAnchorElement>navTab.querySelector('a')).href = hash;
    navigationRoutes.set(hash, () => {
      //set the tab associated with the path to be the selected tab.
      setSelectedTab(navTab || null);
      prevHash = currentHash;
      //trigger callbacks that are to be ran at the start of navigation.
      beforeNavCallbacks.forEach(callback => { callback(prevHash, hash, content) });
      addItemToNavigationQueue(
        //navigate to selected content.
        () => { toggleTab(content) },
        //before and after callback functions.
        async () => {
          if (before) await before(content);
        },
        async () => {
          //trigger callbacks for end of navigation.
          afternavCallbacks.forEach(callback => { callback(currentHash, hash, content) });
          currentHash = hash;
          if (after) await after(content);
        });
    });
  };

/**
 * Helper function for adding items to the navigation queue. 
 * @param before optional callback for before navigation.
 * @param after optional callback for after navigation.
 */
const addItemToNavigationQueue = (item: () => void, before?: (() => void) | null, after?: (() => void) | null) => {
  navigationQueue.empty();
  navigationQueue.add(async () => {
    if (before) { await before(); }
    await item();
    if (after) await after();
  })
};

/**
   * Change the target tab to be the selected tab.
   */
const setSelectedTab = (tab: HTMLElement | null, selected = cssSelected, navItemsContainer = navBar) => {
  if (tab?.classList.contains(cssSelected)) return;
  navItemsContainer?.querySelector('.' + cssSelected)?.classList.remove(selected);
  tab?.classList.add(selected);
};

/**
 * Toggle which tab gets displayed.
 */
const toggleTab = (content: HTMLElement | null, hide = cssHide, transition = cssFadeIn) => {
  try {
    if (!content) return;
    const container = content.parentElement as HTMLElement;
    (Array.from(container.children) as HTMLElement[]).forEach(child => {
      child.classList.add(hide);
      child.classList.remove(transition);
    });
    content.classList.remove(hide);
    content.classList.add(transition);
  } catch (err) {
    console.error(err);
  }
};

/**
 * toggle the fixed state of the navigation bar
 * @param state 'fixed' or 'not-fixed'
 */
export const toggleNavBarFixedPosition = (state: 'fixed' | 'not-fixed') => {
  if (state === 'fixed' && !isNavBarFixed) {
    navBar?.classList.add(fixedNavBar);
    navBarFiller?.classList.add('nav-filler-expand');
    isNavBarFixed = true;
  } else if (state === 'not-fixed' && isNavBarFixed) {
    navBar?.classList.remove(fixedNavBar);
    navBarFiller?.classList.remove('nav-filler-expand');
    isNavBarFixed = false;
  }
};

/**
 * add a callback to be called during navigation between tabs.
 * 'before' callbacks are not guranteed to complete.
 * @param callback 
 * @param position specify whether the callback is to be called before or after navigation.
 */
export const addNavCallback = (callback: NavigationCallback, position: 'before' | 'after') => {
  switch (position) {
    case 'before':
      beforeNavCallbacks.push(callback);
      break;
    case 'after':
      afternavCallbacks.push(callback);
      break;
  }
};

/**
 * remove a tab navigation callback
 * @param callback callback to be removed
 * @param pos 'before' or 'after'
 */
export const removeNavCallback = (callback: NavigationCallback, position: 'before' | 'after') => {
  let target: NavigationCallback[] | null = null;
  switch (position) {
    case 'before':
      target = beforeNavCallbacks;
      break;
    case 'after':
      target = afternavCallbacks;
      break;
  }
  if (target !== null) {
    const indexToBeDeleted = target.findIndex(cb => cb === callback);
    if (indexToBeDeleted !== -1) target.splice(indexToBeDeleted, 1);
  }
};

export const removeAllNavCallbacks = () => {
  beforeNavCallbacks.length = 0;
  afternavCallbacks.length = 0;
};

export const getNavBar = () => {
  return navBar;
}
