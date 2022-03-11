const navBar = Array.from(document.getElementsByClassName('tab')) as HTMLElement[];
const projectsTab = navBar[0];
const aboutTab = navBar[1];
const contactsTab = navBar[2];
const selected = 'selected';
const hide = 'hide';

export const setUpNavBar = () => {

  const projects = document.querySelector('#projects') as HTMLDivElement;

  navBar.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tab.classList.add(selected);

      navBar.forEach((otherTabs, index2) => {
        if (index2 !== index) {
          otherTabs.classList.remove(selected);
        }
      })
    })
  });
};