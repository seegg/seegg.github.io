import { sleep } from "./util";
import { NavigationHook } from "./types";

const navTabs = Array.from(document.getElementsByClassName('tab-nav')) as HTMLElement[];
const contentTabs = Array.from(document.getElementsByClassName('tab')) as HTMLElement[];

const navBar = document.getElementById('tab-nav-bar');
const navBarFiller = document.getElementById('nav-filler');
const fixedNavBar = 'tab-nav-fixed';

//css classes
const cssSelected = 'selected';
const cssHide = 'hide';
const cssFadeIn = 'anim-fadein';
const cssFadeOut = 'anim-fadeout-deck';
const cssCloseDeck = 'anim-close-deck';
const cssOpenDeck = 'anim-open-deck';
const screenWidthThreshold = 570;
const beforeNavCallbacks: NavigationHook[] = [];
const afternavCallbacks: NavigationHook[] = [];

//save the value as object property to make sure it's up to date and not just a snapshot.
const latestInputIndex: { current: number | null } = { current: null };

let isNavBarFixed = false;

export const setUpNavBar = async (widthThreshold = screenWidthThreshold) => {

  //navigation bar at the top
  navTabs.forEach(async (tab, index) => {
    tab.addEventListener('click', async () => {
      //clicking on currently selected tab
      if (tab.classList.contains(cssSelected)) return;
      latestInputIndex.current = index;
      //save a reference to the current selected tab before it's changed.
      const currentSelectedTab = navTabs.findIndex(tab => tab.classList.contains(cssSelected));

      //callbacks to be called at the start of navigation.
      beforeNavCallbacks.forEach(cb => cb(navTabs, currentSelectedTab, index));

      tab.classList.add(cssSelected);

      navTabs.forEach((otherTabs, index2) => {
        if (index2 !== index) {
          otherTabs.classList.remove(cssSelected);
        }
      })

      // open and close project cards animation. only if screen width is above threshold.
      // decide what to do base on if index equals latestInputIndex to make sure corrent content is
      // rendered.
      if (window.innerWidth >= widthThreshold) {
        let deckClosing = false;
        if (navTabs[currentSelectedTab].id === 'nav-projects') {
          deckClosing = true;
          await closeDeck();
        }

        if (index === 0) {
          openDeck();
        }

        //changing away from project tab and then back quickly.
        if (deckClosing && latestInputIndex.current === 0) return;
        //clicking multiple different tabs during  deck closing transition.
        if (index !== latestInputIndex.current) return;

      }
      //if everything matches up, render the selected tab.
      await toggleContent(index, contentTabs);
      afternavCallbacks.forEach(cb => cb(navTabs, currentSelectedTab, index));

    })
  });

  /**
   * Toggle seletect tab to visible and hide all others.
   * @param index index of the tab
   * @param tabs tabs corrensponding to content being shown.
   */
  const toggleContent = async (index: number, tabs: HTMLElement[]) => {
    await tabs.forEach(async (tab, idx) => {
      if (index === idx) {
        tab.classList.remove(cssHide);
        tab.classList.add(cssFadeIn);
      } else {
        tab.classList.add(cssHide);
        tab.classList.remove(cssFadeIn);
      }
    })
  };

};

/**
 * close deck transistion
 */
const closeDeck = async (duration = 500) => {
  contentTabs[0].classList.add(cssFadeOut);
  Array.from(contentTabs[0].children).forEach(child => {
    child.classList.remove(cssOpenDeck);
    child.classList.add(cssCloseDeck);
  });
  await sleep(duration);
}

/**
 * open deck transition
 */
const openDeck = () => {
  contentTabs[0].classList.remove(cssFadeOut);
  Array.from(contentTabs[0].children).forEach(child => {
    child.classList.add(cssOpenDeck);
    child.classList.remove(cssCloseDeck);
  });
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
 * @param callback 
 * @param pos navigation lifecycle state the callback is to be called.
 */
export const addNavCallback = (callback: NavigationHook, pos: 'before' | 'after') => {
  switch (pos) {
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
export const removeNavCallback = (callback: NavigationHook, pos: 'before' | 'after') => {
  let target: NavigationHook[] | null = null;
  switch (pos) {
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