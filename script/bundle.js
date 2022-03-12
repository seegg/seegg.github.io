/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var e,t,n={"./script/animate.ts":(e,t,n)=>{n.r(t),n.d(t,{animate:()=>a});var a=function(){var e,t,n=document.getElementById("intro-container"),a=document.getElementById("intro-container"),r=document.getElementById("content"),i=function(e){a&&(a.style.height=e+"px")},o=new Image;o.src="https://seegg.github.io/images/bird-d.png",o.alt="bird";var s=new Image;s.src="https://seegg.github.io/images/sunset.png",s.alt="sunset with birds";var c=[o,s].map((function(e){var t,n=new Promise((function(e){t=e}));return e.onload=function(){t("loaded")},n}));Promise.all(c).then((function(){n.appendChild(s),(t=s).classList.add("background","anim-fadein"),(e=o).classList.add("foreground","anim-fadein"),i(t.getBoundingClientRect().height),d(),p()})).catch((function(e){return console.error(e)})),document.onscroll=function(){l(.3),d(),p()},window.addEventListener("resize",(function(){l(.3),i(t.getBoundingClientRect().height),d(),p()}),!1);var l=function(n){if(e&&t){var a=document.documentElement.scrollTop,r=t.getBoundingClientRect();if(!(a>=r.height)){var i=1-a/r.height*n;e.style.width=(r.width*i).toString()+"px",e.style.height=(r.height*i).toString()+"px"}}},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;if(r){var t=window.innerHeight-r.getBoundingClientRect().top,n=(t=Math.pow(.05*t,2))<=0?0:t>=e?1:t/e;r.style.opacity=n.toString()}},p=function(){var e,t;r&&(window.innerHeight-r.getBoundingClientRect().top>0?null===(e=document.getElementById("scroll-reminder"))||void 0===e||e.classList.remove("show-scroll"):null===(t=document.getElementById("scroll-reminder"))||void 0===t||t.classList.add("show-scroll"))}}},"./script/data.ts":(e,t,n)=>{var a;n.r(t),n.d(t,{getProjects:()=>i});var r=n("./script/projects.json"),i=function(){return JSON.parse(JSON.stringify(a||(a=n.t(r,2)))).projects}},"./script/load-projects.ts":(e,t,n)=>{n.r(t),n.d(t,{loadProjects:()=>c});var a=n("./script/data.ts"),r=n("./script/util.ts"),i=document.getElementById("projects"),o=document.getElementById("content"),s="https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/",c=function(){if(i){var e=(0,a.getProjects)();p(e.length,250,160,1690,310),window.addEventListener("resize",(function(){p(e.length,250,160,1690,310)})),e.forEach((function(e){var t=u();i.appendChild(t),new Promise((function(t){t(l(e))})).then((function(e){t.replaceWith(e),e.classList.add("anim-fadein")})).catch((function(e){return console.error(e)}))}))}},l=function(e){var t=(0,r.createElementWithClasses)("section","project-container");t.tabIndex=-1;var n=(0,r.createElementWithClasses)("nav","nav-project"),a=(0,r.createNavItem)(e.repo||"#",s+"GitHub-Mark-Light-32px.png","nav-icon");n.appendChild(a);var i=(0,r.createNavItem)(e.url||"#","../images/link.png","nav-icon");n.prepend(i),t.appendChild(n);var c,l=(0,r.createElementWithClasses)("article","project");if(l.onpointerenter=function(){t.focus(),d(l,n,t,"entering")},t.onpointerleave=function(){null!=o&&o.classList.contains("touch-device")||d(l,n,t,"leaving")},t.onpointercancel=function(){d(l,n,t,"leaving")},t.onblur=function(){d(l,n,t,"leaving")},t.onfocus=function(){null!=o&&o.classList.contains("touch-device")&&d(l,n,t,"entering")},e.image){c=(0,r.createElementWithClasses)("div","project-img-container");var p=new Image;p.src=s+e.image,p.classList.add("project-img"),p.onload=function(e){t.getElementsByClassName("project-img-container")[0].appendChild(p),e.target.classList.add("anim-fadein")}}else c=g();l.appendChild(c);var u=(0,r.createElementWithClasses)("article","project-description");return u.innerHTML='<a href="'.concat(e.url,'"><h4 class="project-title">').concat(e.name,"</h4></a><p>").concat(e.description,"</p>"),l.appendChild(u),t.appendChild(l),t},d=function(e,t,n,a){var r=Array.from(t.querySelectorAll("img"));"entering"===a?(e.classList.add("project-select"),t.classList.add("nav-project-moveY"),r.forEach((function(e){return e.classList.add("nav-icon-partial")})),n.classList.add("full-card-size")):(e.classList.remove("project-select"),t.classList.remove("nav-project-moveY"),n.classList.remove("full-card-size"),r.forEach((function(e){return e.classList.remove("nav-icon-partial")})))},p=function(e,t,n,a){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:310,s=null==o?void 0:o.clientWidth;if(void 0!==s&&i){var c=Math.floor((s-t)/160),l=Math.min(Math.max(r,Math.min(c,e)*n+(t-n)),a);i.style.width=l+"px"}},u=function(){var e=(0,r.createElementWithClasses)("div","placeholder-container"),t=(0,r.createElementWithClasses)("div","placeholder-nav"),n=(0,r.createElementWithClasses)("div","placeholder-nav-icon","placeholder");t.appendChild(n),e.appendChild(t);var a=(0,r.createElementWithClasses)("div","placeholder-project","placeholder"),i=g();a.appendChild(i);var o=(0,r.createElementWithClasses)("div","placeholder-title","placeholder");a.appendChild(o);var s=(0,r.createElementWithClasses)("div","placeholder-description","placeholder");return a.appendChild(s),e.appendChild(a),e},g=function(){var e=(0,r.createElementWithClasses)("div","placeholder-image","placeholder"),t=(0,r.createElementWithClasses)("div","placeholder-triangle"),n=(0,r.createElementWithClasses)("div","placeholder-triangle-big"),a=(0,r.createElementWithClasses)("div","triangle-container");return a.appendChild(n),a.appendChild(t),e.appendChild(a),e}},"./script/nav.ts":(e,t,n)=>{n.r(t),n.d(t,{setUpNavBar:()=>c});var a=Array.from(document.getElementsByClassName("tab-nav")),r=Array.from(document.getElementsByClassName("tab")),i="selected",o="hide",s="anim-fadein",c=function(){a.forEach((function(t,n){t.addEventListener("click",(function(){t.classList.add(i),e(n,r),a.forEach((function(e,t){t!==n&&e.classList.remove(i)}))}))}));var e=function(e,t){t.forEach((function(t,n){e===n?(t.classList.remove(o),t.classList.add(s)):(t.classList.add(o),t.classList.remove(s))}))}}},"./script/util.ts":(e,t,n)=>{n.r(t),n.d(t,{disableHoverOnTouch:()=>a,debounce:()=>r,createElementWithClasses:()=>i,createNavItem:()=>o});var a=function(e){if(null!==e){e.classList.add("hasHover");document.addEventListener("touchstart",(function(){e.classList.add("touch-device"),e.classList.remove("hasHover")}),!0),document.addEventListener("mousemove",(function(){e.classList.add("hasHover"),e.classList.remove("touch-device")}),!0)}};function r(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return function(){for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];clearTimeout(t),t=setTimeout((function(){e.apply(void 0,r)}),n)}}function i(e){for(var t,n=document.createElement(e),a=arguments.length,r=new Array(a>1?a-1:0),i=1;i<a;i++)r[i-1]=arguments[i];return(t=n.classList).add.apply(t,r),n}var o=function(e,t){var n,a=document.createElement("a");a.href=e;var r=new Image;r.src=t;for(var i=arguments.length,o=new Array(i>2?i-2:0),s=2;s<i;s++)o[s-2]=arguments[s];return(n=r.classList).add.apply(n,o),a.appendChild(r),a}},"./script/projects.json":e=>{e.exports=JSON.parse('{"projects":[{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"date-picker.png","description":"A date picker widget created using vanilla JS that can easily be added to any webpage."},{"name":"animate trace border","title":"Trace Border","repo":"https://github.com/seegg/trace-border-animation","url":"https://seegg.github.io/trace-border-animation/demo","image":"img1.png","description":"React wrapper component to animate tracing a border around wrapped contents."},{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"home.png","description":"Nodejs web application for managing safe house informations. Built using react and express.it uses multi tier user roles for access control."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"bounce.png","description":"Bounce balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Budget Tracker API","title":"Budget Tracker API","repo":"https://github.com/seegg/budget-tracker","url":"https://github.com/seegg/budget-tracker","description":"REST API for Budget Tracker app"},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Personal Page","title":"Personal page","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","description":"This web page"}]}')}},a={};function r(e){var t=a[e];if(void 0!==t)return t.exports;var i=a[e]={exports:{}};return n[e](i,i.exports,r),i.exports}t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(n,a){if(1&a&&(n=this(n)),8&a)return n;if("object"==typeof n&&n){if(4&a&&n.__esModule)return n;if(16&a&&"function"==typeof n.then)return n}var i=Object.create(null);r.r(i);var o={};e=e||[null,t({}),t([]),t(t)];for(var s=2&a&&n;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>o[e]=()=>n[e]));return o.default=()=>n,r.d(i,o),i},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};(()=>{r.r(i);var e=r("./script/animate.ts"),t=r("./script/load-projects.ts"),n=r("./script/util.ts"),a=r("./script/nav.ts");(0,n.disableHoverOnTouch)(document.getElementById("content")||null),(0,a.setUpNavBar)(),(0,e.animate)(),(0,t.loadProjects)()})()})();
//# sourceMappingURL=bundle.js.map