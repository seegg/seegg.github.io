/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var e,t,n={"./script/animate.ts":(e,t,n)=>{n.r(t),n.d(t,{animate:()=>a});var i=n("./script/util.ts"),a=function(){var e,t,n=document.getElementById("intro-container"),a=document.getElementById("intro-container"),r=document.getElementById("content");(0,i.disableHoverOnTouch)(r);var o=function(e){a&&(a.style.height=e+"px")},c=new Image;c.src="https://seegg.github.io/images/bird-d.png",c.alt="bird";var s=new Image;s.src="https://seegg.github.io/images/sunset.png",s.alt="sunset with birds";var d=[c,s].map((function(e){var t,n=new Promise((function(e){t=e}));return e.onload=function(){t("loaded")},n}));Promise.all(d).then((function(){n.appendChild(s),n.appendChild(c),(t=s).classList.add("background","anim-fadein"),(e=c).classList.add("foreground","anim-fadein"),o(t.getBoundingClientRect().height),p(),u()})).catch((function(e){return console.error(e)})),document.onscroll=function(){l(.3),p(),u()},window.addEventListener("resize",(function(){l(.3),o(t.getBoundingClientRect().height),p(),u()}),!1);var l=function(n){if(e&&t){var i=document.documentElement.scrollTop,a=t.getBoundingClientRect();if(!(i>=a.height)){var r=1-i/a.height*n;e.style.width=(a.width*r).toString()+"px",e.style.height=(a.height*r).toString()+"px"}}},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;if(r){var t=window.innerHeight-r.getBoundingClientRect().top,n=(t=Math.pow(.05*t,2))<=0?0:t>=e?1:t/e;r.style.opacity=n.toString()}},u=function(){var e,t;r&&(window.innerHeight-r.getBoundingClientRect().top>0?null===(e=document.getElementById("scroll-reminder"))||void 0===e||e.classList.remove("show-scroll"):null===(t=document.getElementById("scroll-reminder"))||void 0===t||t.classList.add("show-scroll"))}}},"./script/data.ts":(e,t,n)=>{var i;n.r(t),n.d(t,{getProjects:()=>r});var a=n("./script/projects.json"),r=function(){return JSON.parse(JSON.stringify(i||(i=n.t(a,2)))).projects}},"./script/load-projects.ts":(e,t,n)=>{n.r(t),n.d(t,{loadProjects:()=>o});var i=n("./script/data.ts"),a=document.getElementById("content"),r="https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/",o=function(){a&&(l(330,20,a),window.addEventListener("resize",(function(){l(320,20,a)})),(0,i.getProjects)().forEach((function(e){var t=p();a.appendChild(t),new Promise((function(t){t(s(e))})).then((function(e){t.replaceWith(e),e.classList.add("anim-fadein")})).catch((function(e){return console.error(e)}))})))};function c(e){for(var t,n=document.createElement(e),i=arguments.length,a=new Array(i>1?i-1:0),r=1;r<i;r++)a[r-1]=arguments[r];return(t=n.classList).add.apply(t,a),n}var s=function(e){var t=document.createElement("article");t.classList.add("project-container");var n=c("nav","nav-project"),i=document.createElement("a");i.href=e.repo||"";var a=new Image;a.src=r+"GitHub-Mark-Light-32px.png",a.classList.add("github-logo"),i.appendChild(a),n.appendChild(i),t.appendChild(n);var o,s=c("article","project");if(s.onpointerenter=function(){d(s,n,a,"entering")},s.onpointerleave=function(){d(s,n,a,"leaving")},s.onpointercancel=function(){d(s,n,a,"leaving")},e.image){o=c("div","project-img-container");var l=new Image;l.src=r+e.image,l.classList.add("project-img"),l.onload=function(e){t.getElementsByClassName("project-img-container")[0].appendChild(l),e.target.classList.add("anim-fadein")}}else o=u();s.appendChild(o);var p=c("article","project-description");return p.innerHTML='<h4 class="project-title">'.concat(e.name,"</h4><p>").concat(e.description,"</p>"),s.appendChild(p),e.url&&(s.innerHTML='<a href="'.concat(e.url,'">').concat(s.innerHTML,"</a>")),t.appendChild(s),t},d=function(e,t,n,i){"entering"===i?(e.classList.add("project-select"),t.classList.add("nav-project-moveY")):(e.classList.remove("project-select"),t.classList.remove("nav-project-moveY"))},l=function(e,t,n){var i,a=null===(i=n.parentElement)||void 0===i?void 0:i.clientWidth;if(void 0!==a){var r=a-a%e;r+=t,n.style.width=r+"px"}},p=function(){var e=document.createElement("div");e.classList.add("placeholder-container");var t=document.createElement("div");t.classList.add("placeholder-nav");var n=document.createElement("div");n.classList.add("placeholder-nav-logo","placeholder"),t.appendChild(n),e.appendChild(t);var i=document.createElement("div");i.classList.add("placeholder-project","placeholder");var a=u();i.appendChild(a);var r=document.createElement("div");r.classList.add("placeholder-title","placeholder"),i.appendChild(r);var o=document.createElement("div");return o.classList.add("placeholder-description","placeholder"),i.appendChild(o),e.appendChild(i),e},u=function(){var e=document.createElement("div");e.classList.add("placeholder-image","placeholder");var t=document.createElement("div"),n=document.createElement("div"),i=document.createElement("div");return t.classList.add("placeholder-triangle"),n.classList.add("placeholder-triangle-big"),i.classList.add("triangle-container"),i.appendChild(n),i.appendChild(t),e.appendChild(i),e}},"./script/util.ts":(e,t,n)=>{n.r(t),n.d(t,{disableHoverOnTouch:()=>i,debounce:()=>a});var i=function(e){var t=0;document.addEventListener("touchstart",(function(){t=(new Date).getTime()}),!0),document.addEventListener("touchstart",(function(){e.classList.remove("hasHover")}),!0),document.addEventListener("mousemove",(function(){(new Date).getTime()-t<500||e.classList.add("hasHover")}),!0)};function a(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return function(){for(var i=arguments.length,a=new Array(i),r=0;r<i;r++)a[r]=arguments[r];clearTimeout(t),t=setTimeout((function(){e.apply(void 0,a)}),n)}}},"./script/projects.json":e=>{e.exports=JSON.parse('{"projects":[{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"date-picker.png","description":"A date picker widget created using vanilla JS that can easily be added to any webpage."},{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"home.png","description":"Nodejs web application for managing safe house informations. Built using react and express.it uses multi tier user roles for access control."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"bounce.png","description":"Animate colliding balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Budget Tracker API","title":"Budget Tracker API","repo":"https://github.com/seegg/budget-tracker","url":"https://github.com/seegg/budget-tracker","description":"REST API for Budget Tracker app"},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Portfolio site","title":"Personal Portfolio Site","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","image":"sunset.png","description":"This github page."}]}')}},i={};function a(e){var t=i[e];if(void 0!==t)return t.exports;var r=i[e]={exports:{}};return n[e](r,r.exports,a),r.exports}t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(n,i){if(1&i&&(n=this(n)),8&i)return n;if("object"==typeof n&&n){if(4&i&&n.__esModule)return n;if(16&i&&"function"==typeof n.then)return n}var r=Object.create(null);a.r(r);var o={};e=e||[null,t({}),t([]),t(t)];for(var c=2&i&&n;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((e=>o[e]=()=>n[e]));return o.default=()=>n,a.d(r,o),r},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{a.r(r);var e=a("./script/animate.ts"),t=a("./script/load-projects.ts");(0,e.animate)(),(0,t.loadProjects)()})()})();
//# sourceMappingURL=bundle.js.map