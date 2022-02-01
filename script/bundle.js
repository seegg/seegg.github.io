/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var e,t,a={"./script/animate.ts":(e,t,a)=>{a.r(t),a.d(t,{animate:()=>r});var r=function(){var e=document.getElementById("intro-container"),t=document.getElementById("intro-container"),a=document.getElementById("intro-bird"),r=document.getElementById("intro-sunset"),n=function(e){t&&(t.style.height=e+"px")},o=new Image;o.src="https://seegg.github.io/images/bird-d.png",o.alt="bird";var i=new Image;i.src="https://seegg.github.io/images/sunset.png",i.alt="sunset with birds";var c=[o,i].map((function(e){var t,a=new Promise((function(e){t=e}));return e.onload=function(){t("loaded")},a}));Promise.all(c).then((function(){console.log("here"),e.replaceChild(i,r),e.replaceChild(o,a),(r=i).classList.add("background"),(a=o).classList.add("foreground"),n(r.getBoundingClientRect().height)})).catch((function(e){return console.error(e)})),document.onscroll=function(){s()},window.onresize=function(){s(),n(r.getBoundingClientRect().height)};var s=function(){if(a&&r){var e=document.documentElement.scrollTop,t=r.getBoundingClientRect(),n=1-e/t.height*.3;a.style.width=(t.width*n).toString()+"px",a.style.height=(t.height*n).toString()+"px"}}}},"./script/data.ts":(e,t,a)=>{var r;a.r(t),a.d(t,{getProjects:()=>o});var n=a("./script/projects.json"),o=function(){return JSON.parse(JSON.stringify(r||(r=a.t(n,2)))).projects}},"./script/load-projects.ts":(e,t,a)=>{a.r(t),a.d(t,{loadProjects:()=>i});var r=a("./script/data.ts"),n=document.getElementById("content"),o=location.href+"images/",i=function(){n&&(0,r.getProjects)().forEach((function(e){var t=c(e),a=s();n.appendChild(t),n.appendChild(a)}))},c=function(e){var t=document.createElement("article");t.classList.add("project-container");var a=document.createElement("nav");a.classList.add("nav-project");var r=document.createElement("a");r.href=e.repo||"";var n=new Image;n.src="http://localhost:8000/images/GitHub-Mark-Light-32px.png",n.classList.add("github-logo"),r.appendChild(n),a.appendChild(r),t.appendChild(a);var i=document.createElement("article");i.classList.add("project"),i.onpointerenter=function(){i.classList.add("project-select"),a.classList.add("nav-project-moveY")},i.onpointerleave=function(){i.classList.remove("project-select"),a.classList.remove("nav-project-moveY")},i.onpointercancel=function(){i.classList.remove("project-select"),a.classList.remove("nav-project-moveY")};var c=document.createElement("div");c.classList.add("project-img-container");var s=new Image;s.src=o+e.image,s.classList.add("project-img"),c.appendChild(s),i.appendChild(c);var l=document.createElement("article");return l.classList.add("project-description"),l.innerHTML='<h4 class="project-title">'.concat(e.name,"</h4><p>").concat(e.description,"</p>"),i.appendChild(l),e.url&&(i.innerHTML='<a href="'.concat(e.url,'">').concat(i.innerHTML,"</a>")),t.appendChild(i),t},s=function(){var e=document.createElement("div");e.classList.add("placeholder-container");var t=document.createElement("div");t.classList.add("placeholder-nav");var a=document.createElement("div");a.classList.add("placeholder-nav-logo","placeholder"),t.appendChild(a),e.appendChild(t);var r=document.createElement("div");r.classList.add("placeholder-project","placeholder");var n=document.createElement("div");n.classList.add("placeholder-image","placeholder"),r.appendChild(n);var o=document.createElement("div");o.classList.add("placeholder-title","placeholder"),r.appendChild(o);var i=document.createElement("div");return i.classList.add("placeholder-description","placeholder"),r.appendChild(i),e.appendChild(r),e}},"./script/projects.json":e=>{e.exports=JSON.parse('{"projects":[{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"date-picker.png","description":"A date picker widget created using vanilla Javascript."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"bounce.png","description":"Animate colliding balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"home.png","description":"Nodejs web application for managing safe house informations built using react and express. uses multi tier user roles for access control."},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Portfolio site","title":"Personal Portfolio Site","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","image":"sunset.png","description":"This github page."}]}')}},r={};function n(e){var t=r[e];if(void 0!==t)return t.exports;var o=r[e]={exports:{}};return a[e](o,o.exports,n),o.exports}t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,n.t=function(a,r){if(1&r&&(a=this(a)),8&r)return a;if("object"==typeof a&&a){if(4&r&&a.__esModule)return a;if(16&r&&"function"==typeof a.then)return a}var o=Object.create(null);n.r(o);var i={};e=e||[null,t({}),t([]),t(t)];for(var c=2&r&&a;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((e=>i[e]=()=>a[e]));return i.default=()=>a,n.d(o,i),o},n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{n.r(o);var e=n("./script/animate.ts"),t=n("./script/load-projects.ts");(0,e.animate)(),(0,t.loadProjects)()})()})();
//# sourceMappingURL=bundle.js.map