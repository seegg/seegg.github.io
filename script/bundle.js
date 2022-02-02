/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var e,t,n={"./script/animate.ts":(e,t,n)=>{n.r(t),n.d(t,{animate:()=>i});var a=n("./script/util.ts"),i=function(){var e,t,n=document.getElementById("intro-container"),i=document.getElementById("intro-container"),r=document.getElementById("content");(0,a.disableHoverOnTouch)(r);var o=function(e){i&&(i.style.height=e+"px")},c=new Image;c.src="https://seegg.github.io/images/bird-d.png",c.alt="bird";var s=new Image;s.src="https://seegg.github.io/images/sunset.png",s.alt="sunset with birds";var l=[c,s].map((function(e){var t,n=new Promise((function(e){t=e}));return e.onload=function(){t("loaded")},n}));Promise.all(l).then((function(){n.appendChild(s),n.appendChild(c),(t=s).classList.add("background","anim-fadein"),(e=c).classList.add("foreground","anim-slide-in-right"),o(t.getBoundingClientRect().height),p(),u()})).catch((function(e){return console.error(e)})),document.onscroll=function(){d(.3),p(),u()},window.onresize=function(){d(.3),o(t.getBoundingClientRect().height),p(),u()};var d=function(n){if(e&&t){var a=document.documentElement.scrollTop,i=t.getBoundingClientRect(),r=1-a/i.height*n;e.style.width=(i.width*r).toString()+"px",e.style.height=(i.height*r).toString()+"px"}},p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;if(r){var t=window.innerHeight-r.getBoundingClientRect().top,n=(t=Math.pow(.05*t,2))<=0?0:t>=e?1:t/e;r.style.opacity=n.toString()}},u=function(){var e;r&&(window.innerHeight-r.getBoundingClientRect().top>0&&(null===(e=document.getElementById("scroll-reminder"))||void 0===e||e.classList.remove("show-scroll")))}}},"./script/data.ts":(e,t,n)=>{var a;n.r(t),n.d(t,{getProjects:()=>r});var i=n("./script/projects.json"),r=function(){return JSON.parse(JSON.stringify(a||(a=n.t(i,2)))).projects}},"./script/load-projects.ts":(e,t,n)=>{n.r(t),n.d(t,{loadProjects:()=>o});var a=n("./script/data.ts"),i=document.getElementById("content"),r="https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/",o=function(){i&&(0,a.getProjects)().forEach((function(e){var t=d();i.appendChild(t),new Promise((function(t){t(s(e))})).then((function(e){t.replaceWith(e),e.classList.add("anim-fadein")})).catch((function(e){return console.error(e)}))}))};function c(e){for(var t,n=document.createElement(e),a=arguments.length,i=new Array(a>1?a-1:0),r=1;r<a;r++)i[r-1]=arguments[r];return(t=n.classList).add.apply(t,i),n}var s=function(e){var t=document.createElement("article");t.classList.add("project-container");var n=c("nav","nav-project"),a=document.createElement("a");a.href=e.repo||"";var i=new Image;i.src=r+"GitHub-Mark-Light-32px.png",i.classList.add("github-logo"),a.appendChild(i),n.appendChild(a),t.appendChild(n);var o=c("article","project");o.onpointerenter=function(){l(o,n,i,"entering")},o.onpointerleave=function(){l(o,n,i,"leaving")},o.onpointercancel=function(){l(o,n,i,"leaving")};var s=c("div","project-img-container"),d=new Image;d.src=r+e.image,d.classList.add("project-img"),o.appendChild(s),d.onload=function(e){t.getElementsByClassName("project-img-container")[0].appendChild(d),e.target.classList.add("anim-fadein")};var p=c("article","project-description");return p.innerHTML='<h4 class="project-title">'.concat(e.name,"</h4><p>").concat(e.description,"</p>"),o.appendChild(p),e.url&&(o.innerHTML='<a href="'.concat(e.url,'">').concat(o.innerHTML,"</a>")),t.appendChild(o),t},l=function(e,t,n,a){"entering"===a?(e.classList.add("project-select"),t.classList.add("nav-project-moveY")):(e.classList.remove("project-select"),t.classList.remove("nav-project-moveY"))},d=function(){var e=document.createElement("div");e.classList.add("placeholder-container");var t=document.createElement("div");t.classList.add("placeholder-nav");var n=document.createElement("div");n.classList.add("placeholder-nav-logo","placeholder"),t.appendChild(n),e.appendChild(t);var a=document.createElement("div");a.classList.add("placeholder-project","placeholder");var i=document.createElement("div");i.classList.add("placeholder-image","placeholder");var r=document.createElement("div"),o=document.createElement("div"),c=document.createElement("div");r.classList.add("placeholder-triangle"),o.classList.add("placeholder-triangle-big"),c.classList.add("triangle-container"),c.appendChild(o),c.appendChild(r),i.appendChild(c),a.appendChild(i);var s=document.createElement("div");s.classList.add("placeholder-title","placeholder"),a.appendChild(s);var l=document.createElement("div");return l.classList.add("placeholder-description","placeholder"),a.appendChild(l),e.appendChild(a),e}},"./script/util.ts":(e,t,n)=>{n.r(t),n.d(t,{disableHoverOnTouch:()=>a,debounce:()=>i});var a=function(e){var t=0;document.addEventListener("touchstart",(function(){t=(new Date).getTime()}),!0),document.addEventListener("touchstart",(function(){e.classList.remove("hasHover")}),!0),document.addEventListener("mousemove",(function(){(new Date).getTime()-t<500||e.classList.add("hasHover")}),!0)};function i(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return function(){for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];clearTimeout(t),t=setTimeout((function(){e.apply(void 0,i)}),n)}}},"./script/projects.json":e=>{e.exports=JSON.parse('{"projects":[{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"date-picker.png","description":"A date picker widget created using vanilla Javascript."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"bounce.png","description":"Animate colliding balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"home.png","description":"Nodejs web application for managing safe house informations built using react and express. uses multi tier user roles for access control."},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Portfolio site","title":"Personal Portfolio Site","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","image":"sunset.png","description":"This github page."}]}')}},a={};function i(e){var t=a[e];if(void 0!==t)return t.exports;var r=a[e]={exports:{}};return n[e](r,r.exports,i),r.exports}t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(n,a){if(1&a&&(n=this(n)),8&a)return n;if("object"==typeof n&&n){if(4&a&&n.__esModule)return n;if(16&a&&"function"==typeof n.then)return n}var r=Object.create(null);i.r(r);var o={};e=e||[null,t({}),t([]),t(t)];for(var c=2&a&&n;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((e=>o[e]=()=>n[e]));return o.default=()=>n,i.d(r,o),r},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{i.r(r);var e=i("./script/animate.ts"),t=i("./script/load-projects.ts");(0,e.animate)(),(0,t.loadProjects)()})()})();
//# sourceMappingURL=bundle.js.map