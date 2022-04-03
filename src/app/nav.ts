import { NavigationCallback } from "../types";
import { openDeck, closeDeck } from '../card'
import { SyncAutoQueue } from "../util";


const navTabs = Array.from(document.getElementsByClassName('tab-nav')) as HTMLElement[];
//0: project cards, 1: about, 2: contacts
const contentTabs = Array.from(document.getElementsByClassName('tab')) as HTMLElement[];

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
export const [project, blog, contact, fallback] = ['#project', '#blog', '#contact', '#fallback'];

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

  //registering routes.

  //add a self removing callback that plays the leaving transition when navigating away from projects.
  addRoute(project, 'projects-wrapper', contentTabs, navTabs[0],
    null,
    async () => {
      await openDeck(document.getElementById('projects-wrapper'));
      addNavCallback(function playLeaveTransition() {
        if (window.innerWidth >= widthThreshold) {
          addItemToNavigationQueue(async () => { await closeDeck(document.getElementById('projects-wrapper')); });
        }
        removeNavCallback(playLeaveTransition, 'before');
      }, 'before');
    }
  );

  addRoute(blog, 'about', contentTabs, navTabs[1],);

  addRoute(contact, 'contacts', contentTabs, navTabs[2],);

  addRoute(fallback, 'not-found', contentTabs, null);

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
 * Wrapper function for adding hash route entries
 */
const addRoute =
  (hash: string, contentTabID: string, contentTabs: HTMLElement[], navTab?: HTMLElement | null, before?: (() => void) | null, after?: (() => void) | null) => {
    navigationRoutes.set(hash, () => {
      //set the tab associated with the path to be the selected tab.
      setSelectedTab(navTab || null);
      prevHash = currentHash;
      //trigger callbacks that are to be ran at the start of navigation.
      beforeNavCallbacks.forEach(callback => { callback(prevHash, hash) });
      addItemToNavigationQueue(
        //navigate to selected content.
        () => { toggleTab(contentTabID, contentTabs) },
        //before and after callback functions.
        async () => {
          if (before) await before();
        },
        async () => {
          //trigger callbacks for end of navigation.
          afternavCallbacks.forEach(callback => { callback(currentHash, hash) });
          currentHash = hash;
          if (after) await after();
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
const toggleTab = (tabID: string, tabs: HTMLElement[]) => {
  tabs.forEach(tab => {
    if (tab.id === tabID) {
      tab.classList.remove(cssHide);
      tab.classList.add(cssFadeIn);
    } else {
      tab.classList.add(cssHide);
      tab.classList.remove(cssFadeIn);
    }
  })
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
