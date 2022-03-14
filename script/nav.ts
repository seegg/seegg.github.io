import { sleep } from "./util";

const navBar = Array.from(document.getElementsByClassName('tab-nav')) as HTMLElement[];
const tabs = Array.from(document.getElementsByClassName('tab')) as HTMLElement[];

//css classes
const cssSelected = 'selected';
const cssHide = 'hide';
const cssFadeIn = 'anim-fadein';
const cssFadeOut = 'anim-fadeout-deck';
const cssCloseDeck = 'anim-close-deck';
const cssOpenDeck = 'anim-open-deck';
const screenWidthThreshold = 450;

//save the value as object property to make sure it's up to date and not just a snapshot.
const currentIndex: { current: number | null } = { current: null };


export const setUpNavBar = async () => {

  //navigation bar at the top
  navBar.forEach(async (tab, index) => {
    tab.addEventListener('click', async () => {
      //ignore clicks to the same tab.
      if (tab.classList.contains(cssSelected)) return;

      currentIndex.current = index;
      //save a reference to the current selected tab before it's changed.
      const currentSelectIsProject = navBar[0].classList.contains(cssSelected);

      tab.classList.add(cssSelected);

      navBar.forEach((otherTabs, index2) => {
        if (index2 !== index) {
          otherTabs.classList.remove(cssSelected);
        }
      })

      // open and close project cards animation. only if screen width is above threshold.
      // decide what to do base on if index equals currentIndex to make sure corrent content is
      // rendered.
      if (window.innerWidth >= screenWidthThreshold) {
        let deckClosing = false;
        if (currentSelectIsProject) {
          deckClosing = true;
          await closeDeck();
        }

        if (index === 0) {
          openDeck();
        }

        //changing away from project tab and then back quickly.
        if (deckClosing && currentIndex.current === 0) return;
        //clicking multiple different tabs during  deck closing transition.
        if (index !== currentIndex.current) return;

        // await toggleContent(index, tabs);

      } else {
        // await toggleContent(index, tabs);
      }
      await toggleContent(index, tabs);


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
const closeDeck = async () => {
  tabs[0].classList.add(cssFadeOut);
  Array.from(tabs[0].children).forEach(child => {
    child.classList.remove(cssOpenDeck);
    child.classList.add(cssCloseDeck);
  });
  await sleep(500);


}

/**
 * open deck transition
 */
const openDeck = () => {
  tabs[0].classList.remove(cssFadeOut);
  Array.from(tabs[0].children).forEach(child => {
    child.classList.add(cssOpenDeck);
    child.classList.remove(cssCloseDeck);
  });
}