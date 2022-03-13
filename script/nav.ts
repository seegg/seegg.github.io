const navBar = Array.from(document.getElementsByClassName('tab-nav')) as HTMLElement[];
const tabs = Array.from(document.getElementsByClassName('tab')) as HTMLElement[];

//css classes
const selected = 'selected';
const hide = 'hide';
const fadeIn = 'anim-fadein';

export const setUpNavBar = async () => {

  //navigation bar at the top
  navBar.forEach(async (tab, index) => {
    tab.addEventListener('click', async () => {
      tab.classList.add(selected);
      await toggleContent(index, tabs);

      navBar.forEach((otherTabs, index2) => {
        if (index2 !== index) {
          otherTabs.classList.remove(selected);
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
        tab.classList.remove(hide);
        tab.classList.add(fadeIn);
      } else {
        tab.classList.add(hide);
        tab.classList.remove(fadeIn);
      }
    })
  };

};