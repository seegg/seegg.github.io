import { sleep } from "./util";

const navBar = Array.from(document.getElementsByClassName('tab-nav')) as HTMLElement[];
const tabs = Array.from(document.getElementsByClassName('tab')) as HTMLElement[];

//css classes
const cssSelected = 'selected';
const cssHide = 'hide';
const cssFadeIn = 'anim-fadein';
const cssFadeOut = 'anim-fadeout';
const cssCloseDeck = 'anim-close-deck';
const cssOpenDeck = 'anim-open-deck';
const screenWidthThreshold = 450;


export const setUpNavBar = async () => {

  //navigation bar at the top
  navBar.forEach(async (tab, index) => {
    tab.addEventListener('click', async () => {

      //open and close project cards animation. only if screen width is above threshold.
      if (window.innerWidth >= screenWidthThreshold) {
        if (index !== 0 && navBar[0].classList.contains(cssSelected)) {
          await closeDeck();
        } else if (index === 0) {
          openDeck();
        }
      }

      tab.classList.add(cssSelected);
      await toggleContent(index, tabs);

      navBar.forEach((otherTabs, index2) => {
        if (index2 !== index) {
          otherTabs.classList.remove(cssSelected);
        }
      })
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

const closeDeck = async () => {
  tabs[0].classList.add(cssFadeOut);
  Array.from(tabs[0].children).forEach(child => {
    child.classList.remove(cssOpenDeck);
    child.classList.add(cssCloseDeck);
  });
  await sleep(500);
}

const openDeck = () => {
  tabs[0].classList.remove(cssFadeOut);
  Array.from(tabs[0].children).forEach(child => {
    child.classList.add(cssOpenDeck);
    child.classList.remove(cssCloseDeck);
  });
}