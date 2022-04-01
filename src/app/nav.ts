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

//save the value as object property to make sure it's up to date and not just a snapshot.
const latestInputIndex: { current: number } = { current: 0 };

let currentHash = '#projects';
let prevHash = '#projects';
let isNavBarFixed = false;


export const setUpNavBar = async (widthThreshold = 570) => {

  document.addEventListener('scroll', () => {
    const { top } = navBarParentElement.getBoundingClientRect();
    if (top < 0) {
      toggleNavBarFixedPosition('fixed');
    } else {
      toggleNavBarFixedPosition('not-fixed');
    }
  });


  //registering routes.
  addRoute('#projects', 'projects-wrapper', navTabs[0],
    () => { if (window.innerWidth >= widthThreshold) openDeck(document.getElementById('projects-wrapper')); });

  addRoute('#blog', 'about', navTabs[1],
    async () => {
      if (currentHash === '#projects' && window.innerWidth >= widthThreshold) {
        await closeDeck(document.getElementById('projects-wrapper'));
      }
    }
  );

  addRoute('#contacts', 'contacts', navTabs[2],
    async () => {
      if (currentHash === '#projects' && window.innerWidth >= widthThreshold) {
        await closeDeck(document.getElementById('projects-wrapper'));
      }
    }
  );

  if (location.hash !== currentHash) {
    const route = navigationRoutes.get(location.hash);
    if (typeof route === 'function') route();
  }

  window.addEventListener('hashchange', () => {
    const hash = location.hash;
    if (hash === prevHash) return;
    const navFunction = navigationRoutes.get(hash);
    if (typeof navFunction === 'function') {
      navFunction();
    }
  });
};


/**
 * Wrapper function for adding hash route entries
 */
const addRoute = (hash: string, contentTabID: string, navTab: HTMLElement, before?: (() => void) | null, after?: (() => void) | null) => {
  navigationRoutes.set(hash, () => {
    //trigger callbacks that are to be ran at the start of navigation.
    beforeNavCallbacks.forEach(callback => { callback(prevHash, hash) });
    //set the seleted tab to the tab associated with the path.
    setSelectedTab(navTab);
    prevHash = location.hash;
    addItemToNavigationQueue(contentTabID,
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
}

/**
 * Helper function for adding items to the navigation queue. 
 * @param before optional callback for before navigation.
 * @param after optional callback for after navigation.
 */
const addItemToNavigationQueue = (tabID: string, before?: (() => void) | null, after?: (() => void) | null) => {
  navigationQueue.empty();
  navigationQueue.add(async () => {
    if (before) await before();
    toggleTab(tabID, contentTabs);
    if (after) await after();
  })
}

/**
   * Change the target tab to be the selected tab.
   */
const setSelectedTab = (tab: HTMLElement, selected = cssSelected, navItemsContainer = navBar) => {
  if (tab.classList.contains(cssSelected)) return;
  navItemsContainer?.querySelector('.' + cssSelected)?.classList.remove(selected);
  tab.classList.add(selected);
}

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
}

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
}

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
}

export const getCurrentTab = () => {
  return latestInputIndex.current;
}

export const removeAllNavCallbacks = () => {
  beforeNavCallbacks.length = 0;
  afternavCallbacks.length = 0;
};
