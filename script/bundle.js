/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var e,t,n={"./script/animate.ts":(e,t,n)=>{n.r(t),n.d(t,{animate:()=>r});var r=function(){var e,t,n=document.getElementById("intro-container"),r=document.getElementById("intro-container"),a=document.getElementById("content"),i=function(e){r&&(r.style.height=e+"px")},o=new Image;o.src="https://seegg.github.io/images/bird-d.png",o.alt="bird";var s=new Image;s.src="https://seegg.github.io/images/sunset.png",s.alt="sunset with birds";var c=[o,s].map((function(e){var t,n=new Promise((function(e){t=e}));return e.onload=function(){t("loaded")},n}));Promise.all(c).then((function(){n.appendChild(s),(t=s).classList.add("background","anim-fadein"),(e=o).classList.add("foreground","anim-fadein"),i(t.getBoundingClientRect().height),d(),u()})).catch((function(e){return console.error(e)})),document.onscroll=function(){l(.3),d(),u()},window.addEventListener("resize",(function(){l(.3),i(t.getBoundingClientRect().height),d(),u()}),!1);var l=function(n){if(e&&t){var r=document.documentElement.scrollTop,a=t.getBoundingClientRect();if(!(r>=a.height)){var i=1-r/a.height*n;e.style.width=(a.width*i).toString()+"px",e.style.height=(a.height*i).toString()+"px"}}},d=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;if(a){var t=window.innerHeight-a.getBoundingClientRect().top,n=(t=Math.pow(.05*t,2))<=0?0:t>=e?1:t/e;a.style.opacity=n.toString()}},u=function(){var e,t;a&&(window.innerHeight-a.getBoundingClientRect().top>0?null===(e=document.getElementById("scroll-reminder"))||void 0===e||e.classList.remove("show-scroll"):null===(t=document.getElementById("scroll-reminder"))||void 0===t||t.classList.add("show-scroll"))}}},"./script/data.ts":(e,t,n)=>{var r;n.r(t),n.d(t,{getProjects:()=>i});var a=n("./script/projects.json"),i=function(){return JSON.parse(JSON.stringify(r||(r=n.t(a,2)))).projects}},"./script/load-projects.ts":(e,t,n)=>{n.r(t),n.d(t,{loadProjects:()=>u});var r=n("./script/data.ts"),a=n("./script/util.ts"),i=document.getElementById("projects"),o=document.getElementById("content"),s="anim-fadein-long",c="intro-only-once",l="invisible",d="https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/",u=function(){if(i){var e=(0,r.getProjects)();h(e.length,250,160,1690,310),window.addEventListener("resize",(function(){h(e.length,250,160,1690,310)}));var t=i?window.innerHeight-i.getBoundingClientRect().top:0;t<300&&document.addEventListener("scroll",(function e(){(i?window.innerHeight-i.getBoundingClientRect().top:0)>=300&&(Array.from(i.childNodes).forEach((function(e){e.classList.remove(c);var t=e.getElementsByClassName("nav-project")[0];t.classList.remove(l),t.classList.add(s)})),document.removeEventListener("scroll",e))})),console.log(t),e.forEach((function(e){var n=v();i.appendChild(n),new Promise((function(n){n(p(e,t))})).then((function(e){n.replaceWith(e),e.classList.add("anim-fadein")})).catch((function(e){return console.error(e)}))}))}},p=function(e,t){var n=(0,a.createElementWithClasses)("section","project-container","anim-open-deck");n.tabIndex=-1;var r=(0,a.createElementWithClasses)("nav","nav-project",s),i=(0,a.createNavItem)(e.repo||"#",d+"GitHub-Mark-Light-32px.png","nav-icon");r.appendChild(i);var u=(0,a.createNavItem)(e.url||"#","../images/link.png","nav-icon");r.prepend(u),n.appendChild(r);var p=(0,a.createElementWithClasses)("article","project");p.onpointerenter=function(){n.focus(),g(p,r,n,"entering")},n.onpointerleave=function(){null!=o&&o.classList.contains("touch-device")||g(p,r,n,"leaving")},n.onpointercancel=function(){g(p,r,n,"leaving")},n.onblur=function(){g(p,r,n,"leaving")},n.onfocus=function(){null!=o&&o.classList.contains("touch-device")&&g(p,r,n,"entering")};var h=e.image?d+e.image:null,v=m(h);p.appendChild(v);var f=(0,a.createElementWithClasses)("article","project-description");return f.innerHTML='<a href="'.concat(e.url,'"><h4 class="project-title">').concat(e.name,"</h4></a><p>").concat(e.description,"</p>"),p.appendChild(f),n.appendChild(p),t<300&&(n.classList.add(c),r.classList.add(l),r.classList.remove(s)),n},g=function(e,t,n,r){var a=Array.from(t.querySelectorAll("img"));"entering"===r?(e.classList.add("project-select"),t.classList.add("nav-project-moveY"),a.forEach((function(e){return e.classList.add("nav-icon-partial")})),n.classList.add("full-card-size")):(e.classList.remove("project-select"),t.classList.remove("nav-project-moveY"),n.classList.remove("full-card-size"),a.forEach((function(e){return e.classList.remove("nav-icon-partial")})))},h=function(e,t,n,r){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:310,s=null==o?void 0:o.clientWidth;if(void 0!==s&&i){var c=Math.floor((s-t)/160),l=Math.min(Math.max(a,Math.min(c,e)*n+(t-n)),r);i.style.width=l+"px"}},m=function(e){var t=f();if(e){var n=(0,a.createElementWithClasses)("div","project-img-container"),r=new Image;r.src=e,r.classList.add("project-img"),n.appendChild(r),r.onload=function(){var e;null===(e=t.parentElement)||void 0===e||e.replaceChild(n,t),r.classList.add(s)}}return t},v=function(){var e=(0,a.createElementWithClasses)("div","placeholder-container"),t=(0,a.createElementWithClasses)("div","placeholder-nav"),n=(0,a.createElementWithClasses)("div","placeholder-nav-icon","placeholder");t.appendChild(n),e.appendChild(t);var r=(0,a.createElementWithClasses)("div","placeholder-project","placeholder"),i=f();r.appendChild(i);var o=(0,a.createElementWithClasses)("div","placeholder-title","placeholder");r.appendChild(o);var s=(0,a.createElementWithClasses)("div","placeholder-description","placeholder");return r.appendChild(s),e.appendChild(r),e},f=function(){var e=(0,a.createElementWithClasses)("div","placeholder-image","placeholder"),t=(0,a.createElementWithClasses)("div","placeholder-triangle"),n=(0,a.createElementWithClasses)("div","placeholder-triangle-big"),r=(0,a.createElementWithClasses)("div","triangle-container");return r.appendChild(n),r.appendChild(t),e.appendChild(r),e}},"./script/nav.ts":(e,t,n)=>{function r(e,t,n,r,a,i,o){try{var s=e[i](o),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,i){var o=e.apply(t,n);function s(e){r(o,a,i,s,c,"next",e)}function c(e){r(o,a,i,s,c,"throw",e)}s(void 0)}))}}n.r(t),n.d(t,{setUpNavBar:()=>d});var i=Array.from(document.getElementsByClassName("tab-nav")),o=Array.from(document.getElementsByClassName("tab")),s="selected",c="hide",l="anim-fadein",d=function(){var e=a(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.forEach(function(){var e=a(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.addEventListener("click",a(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.classList.add(s),e.next=3,t(r,o);case 3:i.forEach((function(e,t){t!==r&&e.classList.remove(s)}));case 4:case"end":return e.stop()}}),e)}))));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),t=function(){var e=a(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.forEach(function(){var e=a(regeneratorRuntime.mark((function e(n,r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t===r?(n.classList.remove(c),n.classList.add(l)):(n.classList.add(c),n.classList.remove(l));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},"./script/util.ts":(e,t,n)=>{n.r(t),n.d(t,{disableHoverOnTouch:()=>r,debounce:()=>a,createElementWithClasses:()=>i,createNavItem:()=>o});var r=function(e){if(null!==e){e.classList.add("hasHover");document.addEventListener("touchstart",(function(){e.classList.add("touch-device"),e.classList.remove("hasHover")}),!0),document.addEventListener("mousemove",(function(){e.classList.add("hasHover"),e.classList.remove("touch-device")}),!0)}};function a(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return function(){for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];clearTimeout(t),t=setTimeout((function(){e.apply(void 0,a)}),n)}}function i(e){for(var t,n=document.createElement(e),r=arguments.length,a=new Array(r>1?r-1:0),i=1;i<r;i++)a[i-1]=arguments[i];return(t=n.classList).add.apply(t,a),n}var o=function(e,t){var n,r=document.createElement("a");r.href=e;var a=new Image;a.src=t;for(var i=arguments.length,o=new Array(i>2?i-2:0),s=2;s<i;s++)o[s-2]=arguments[s];return(n=a.classList).add.apply(n,o),r.appendChild(a),r}},"./script/projects.json":e=>{e.exports=JSON.parse('{"projects":[{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"home.png","description":"Nodejs web application for managing safe house informations. Built using react and express.it uses multi tier user roles for access control."},{"name":"animate trace border","title":"Trace Border","repo":"https://github.com/seegg/trace-border-animation","url":"https://seegg.github.io/trace-border-animation/demo","image":"img1.png","description":"React wrapper component to animate tracing a border around wrapped contents."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"bounce.png","description":"Bounce balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Budget Tracker API","title":"Budget Tracker API","repo":"https://github.com/seegg/budget-tracker","url":"https://github.com/seegg/budget-tracker","description":"REST API for Budget Tracker app"},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Personal Page","title":"Personal page","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","description":"This web page"},{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"date-picker.png","description":"A date picker widget created using vanilla JS that can easily be added to any webpage."}]}')}},r={};function a(e){var t=r[e];if(void 0!==t)return t.exports;var i=r[e]={exports:{}};return n[e](i,i.exports,a),i.exports}t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(n,r){if(1&r&&(n=this(n)),8&r)return n;if("object"==typeof n&&n){if(4&r&&n.__esModule)return n;if(16&r&&"function"==typeof n.then)return n}var i=Object.create(null);a.r(i);var o={};e=e||[null,t({}),t([]),t(t)];for(var s=2&r&&n;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>o[e]=()=>n[e]));return o.default=()=>n,a.d(i,o),i},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};(()=>{a.r(i);var e=a("./script/animate.ts"),t=a("./script/load-projects.ts"),n=a("./script/util.ts"),r=a("./script/nav.ts");(0,n.disableHoverOnTouch)(document.getElementById("content")||null),(0,r.setUpNavBar)(),(0,e.animate)(),(0,t.loadProjects)()})()})();
//# sourceMappingURL=bundle.js.map