/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var e,t,r={"./node_modules/@babel/runtime/regenerator/index.js":(e,t,r)=>{e.exports=r("./node_modules/regenerator-runtime/runtime.js")},"./script/animate.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{animate:()=>n});var n=function(){var e,t,r=document.getElementById("intro-container"),n=document.getElementById("intro-container"),o=document.getElementById("content"),a=function(e){n&&(n.style.height=e+"px")},i=new Image;i.src="https://seegg.github.io/images/bird-d.png",i.alt="bird";var c=new Image;c.src="https://seegg.github.io/images/sunset.png",c.alt="sunset with birds";var s=[i,c].map((function(e){var t,r=new Promise((function(e){t=e}));return e.onload=function(){t("loaded")},r}));Promise.all(s).then((function(){r.appendChild(c),(t=c).classList.add("background","anim-fadein"),(e=i).classList.add("foreground","anim-fadein"),a(t.getBoundingClientRect().height),u(),d()})).catch((function(e){return console.error(e)})),document.onscroll=function(){l(.3),u(),d()},window.addEventListener("resize",(function(){l(.3),a(t.getBoundingClientRect().height),u(),d()}),!1);var l=function(r){if(e&&t){var n=document.documentElement.scrollTop,o=t.getBoundingClientRect();if(!(n>=o.height)){var a=1-n/o.height*r;e.style.width=(o.width*a).toString()+"px",e.style.height=(o.height*a).toString()+"px"}}},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;if(o){var t=window.innerHeight-o.getBoundingClientRect().top,r=(t=Math.pow(.05*t,2))<=0?0:t>=e?1:t/e;o.style.opacity=r.toString()}},d=function(){var e,t;o&&(window.innerHeight-o.getBoundingClientRect().top>0?null===(e=document.getElementById("scroll-reminder"))||void 0===e||e.classList.remove("show-scroll"):null===(t=document.getElementById("scroll-reminder"))||void 0===t||t.classList.add("show-scroll"))}}},"./script/collapseDeckOnScroll.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{collapseDeckOnScroll:()=>s});var n=document.getElementById("content"),o=(document.getElementById("projects"),document.getElementById("intro-container")),a=document.getElementById("tab-nav-bar"),i=document.getElementById("nav-filler"),c="tab-nav-fixed",s=function(e){var t=Array.from(document.getElementsByClassName("project-card"));window.scrollY;document.addEventListener("scroll",(function(){if(!(window.innerWidth>=570)){var e=n.getBoundingClientRect().top;t.length;l(e<=0?"fixed":"not-fixed")}})),new ResizeObserver((function(){o.getBoundingClientRect().height+10})).observe(o)},l=function(e){"fixed"===e?(null==a||a.classList.add(c),null==i||i.classList.remove("hide")):"not-fixed"===e&&(null==a||a.classList.remove(c),null==i||i.classList.add("hide"))}},"./script/data.ts":(e,t,r)=>{"use strict";var n;r.r(t),r.d(t,{getProjects:()=>a});var o=r("./script/projects.json"),a=function(){return JSON.parse(JSON.stringify(n||(n=r.t(o,2)))).projects}},"./script/load-projects.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{loadProjects:()=>f});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),o=r("./node_modules/@babel/runtime/regenerator/index.js"),a=r.n(o),i=r("./script/data.ts"),c=r("./script/util.ts"),s=document.getElementById("projects"),l=document.getElementById("content"),u="anim-fadein-long",d="intro-only-once",p="invisible",h="https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/",f=function(){var e=(0,n.default)(a().mark((function e(){var t,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s&&(250,160,1690,310,t=(0,i.getProjects)(),v(t.length,250,160,1690,310),window.addEventListener("resize",(function(){v(t.length,250,160,1690,310)})),r=s?window.innerHeight-s.getBoundingClientRect().top:0,300,r<300&&document.addEventListener("scroll",(function e(){(s?window.innerHeight-s.getBoundingClientRect().top:0)>=300&&(Array.from(s.children).forEach((function(e){e.classList.remove(d);var t=e.getElementsByClassName("nav-project")[0];t.classList.remove(p),t.classList.add(u)})),document.removeEventListener("scroll",e))})),t.forEach(function(){var e=(0,n.default)(a().mark((function e(t){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b(),s.appendChild(n),e.next=4,new Promise((function(e){e(m(t,r))})).then((function(e){n.replaceWith(e),e.classList.add("anim-fadein")})).catch((function(e){return console.error(e)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(e,t){var r=(0,c.createElementWithClasses)("section","project-card","anim-open-deck");r.tabIndex=-1;var n=(0,c.createElementWithClasses)("nav","nav-project",u),o=(0,c.createNavItem)(e.repo||"#",h+"GitHub-Mark-Light-32px.png","nav-icon");n.appendChild(o);var a=(0,c.createNavItem)(e.url||"#","../images/link.png","nav-icon");n.prepend(a),r.appendChild(n);var i=(0,c.createElementWithClasses)("article","project");i.onpointerenter=function(){r.focus(),g(i,n,r,"entering")},r.onpointerleave=function(){null!=l&&l.classList.contains("touch-device")||g(i,n,r,"leaving")},r.onpointercancel=function(){g(i,n,r,"leaving")},r.onblur=function(){g(i,n,r,"leaving")},r.onfocus=function(){null!=l&&l.classList.contains("touch-device")&&g(i,n,r,"entering")};var s=e.image?h+e.image:null,f=y(s);i.appendChild(f);var m=(0,c.createElementWithClasses)("article","project-description");return m.innerHTML='<h4 class="project-title"><a href="'.concat(e.url,'"><span class="material-icons">link</span></a>').concat(e.name,"</h4><p>").concat(e.description,"</p>"),i.appendChild(m),r.appendChild(i),t<300&&(r.classList.add(d),n.classList.add(p),n.classList.remove(u)),r},g=function(e,t,r,n){var o=Array.from(t.querySelectorAll("img"));"entering"===n?(e.classList.add("project-select"),t.classList.add("nav-project-moveY"),o.forEach((function(e){return e.classList.add("nav-icon-partial")})),r.classList.add("full-card-size")):(e.classList.remove("project-select"),t.classList.remove("nav-project-moveY"),r.classList.remove("full-card-size"),o.forEach((function(e){return e.classList.remove("nav-icon-partial")})))},v=function(e,t,r,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:310,a=null==l?void 0:l.clientWidth;if(void 0!==a&&s){var i=Math.floor((a-t)/160),c=Math.min(Math.max(o,Math.min(i,e)*r+(t-r)),n);s.style.width=c+10+"px"}},y=function(e){var t=w();if(e){var r=(0,c.createElementWithClasses)("div","project-img-container"),n=new Image;n.src=e,n.classList.add("project-img"),r.appendChild(n),n.onload=function(){var e;null===(e=t.parentElement)||void 0===e||e.replaceChild(r,t),n.classList.add(u)}}return t},b=function(){var e=(0,c.createElementWithClasses)("div","placeholder-container"),t=(0,c.createElementWithClasses)("div","placeholder-nav"),r=(0,c.createElementWithClasses)("div","placeholder-nav-icon","placeholder");t.appendChild(r),e.appendChild(t);var n=(0,c.createElementWithClasses)("div","placeholder-project","placeholder"),o=w();n.appendChild(o);var a=(0,c.createElementWithClasses)("div","placeholder-title","placeholder");n.appendChild(a);var i=(0,c.createElementWithClasses)("div","placeholder-description","placeholder");return n.appendChild(i),e.appendChild(n),e},w=function(){var e=(0,c.createElementWithClasses)("div","placeholder-image","placeholder"),t=(0,c.createElementWithClasses)("div","placeholder-triangle"),r=(0,c.createElementWithClasses)("div","placeholder-triangle-big"),n=(0,c.createElementWithClasses)("div","triangle-container");return n.appendChild(r),n.appendChild(t),e.appendChild(n),e}},"./script/nav.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{setUpNavBar:()=>g});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),o=r("./node_modules/@babel/runtime/regenerator/index.js"),a=r.n(o),i=r("./script/util.ts"),c=Array.from(document.getElementsByClassName("tab-nav")),s=Array.from(document.getElementsByClassName("tab")),l="selected",u="hide",d="anim-fadein",p="anim-fadeout-deck",h="anim-close-deck",f="anim-open-deck",m={current:null},g=function(){var e=(0,n.default)(a().mark((function e(){var t,r,o=arguments;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=o.length>0&&void 0!==o[0]?o[0]:450,c.forEach(function(){var e=(0,n.default)(a().mark((function e(o,i){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o.addEventListener("click",(0,n.default)(a().mark((function e(){var n,u;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!o.classList.contains(l)){e.next=2;break}return e.abrupt("return");case 2:if(m.current=i,n=c[0].classList.contains(l),o.classList.add(l),c.forEach((function(e,t){t!==i&&e.classList.remove(l)})),!(window.innerWidth>=t)){e.next=19;break}if(u=!1,!n){e.next=12;break}return u=!0,e.next=12,v();case 12:if(0===i&&y(),!u||0!==m.current){e.next=15;break}return e.abrupt("return");case 15:if(i===m.current){e.next=17;break}return e.abrupt("return");case 17:e.next=19;break;case 19:return e.next=21,r(i,s);case 21:case"end":return e.stop()}}),e)}))));case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),r=function(){var e=(0,n.default)(a().mark((function e(t,r){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.forEach(function(){var e=(0,n.default)(a().mark((function e(r,n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t===n?(r.classList.remove(u),r.classList.add(d)):(r.classList.add(u),r.classList.remove(d));case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=(0,n.default)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s[0].classList.add(p),Array.from(s[0].children).forEach((function(e){e.classList.remove(f),e.classList.add(h)})),e.next=4,(0,i.sleep)(500);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){s[0].classList.remove(p),Array.from(s[0].children).forEach((function(e){e.classList.add(f),e.classList.remove(h)}))}},"./script/util.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{addCssClassToTouchDevices:()=>i,debounce:()=>c,createElementWithClasses:()=>s,createNavItem:()=>l,sleep:()=>u});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),o=r("./node_modules/@babel/runtime/regenerator/index.js"),a=r.n(o),i=function(e){if(null!==e){e.classList.add("hasHover");document.addEventListener("touchstart",(function(){e.classList.add("touch-device"),e.classList.remove("hasHover")}),!0),document.addEventListener("mousemove",(function(){e.classList.add("hasHover"),e.classList.remove("touch-device")}),!0)}};function c(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return function(){for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];clearTimeout(t),t=setTimeout((function(){e.apply(void 0,o)}),r)}}function s(e){for(var t,r=document.createElement(e),n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return(t=r.classList).add.apply(t,o),r}var l=function(e,t){var r,n=document.createElement("a");n.href=e;var o=new Image;o.src=t;for(var a=arguments.length,i=new Array(a>2?a-2:0),c=2;c<a;c++)i[c-2]=arguments[c];return(r=o.classList).add.apply(r,i),n.appendChild(o),n},u=function(){var e=(0,n.default)(a().mark((function e(t){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){var r=setTimeout((function(){e(r)}),t)}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},"./node_modules/regenerator-runtime/runtime.js":e=>{var t=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,r){return e[t]=r}}function l(e,t,r,n){var o=t&&t.prototype instanceof g?t:g,a=Object.create(o.prototype),i=new B(n||[]);return a._invoke=function(e,t,r){var n=d;return function(o,a){if(n===h)throw new Error("Generator is already running");if(n===f){if("throw"===o)throw a;return S()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=k(i,r);if(c){if(c===m)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=f,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var s=u(e,t,r);if("normal"===s.type){if(n=r.done?f:p,s.arg===m)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=f,r.method="throw",r.arg=s.arg)}}}(e,r,i),a}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=l;var d="suspendedStart",p="suspendedYield",h="executing",f="completed",m={};function g(){}function v(){}function y(){}var b={};s(b,a,(function(){return this}));var w=Object.getPrototypeOf,L=w&&w(w(O([])));L&&L!==r&&n.call(L,a)&&(b=L);var E=y.prototype=g.prototype=Object.create(b);function x(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function j(e,t){function r(o,a,i,c){var s=u(e[o],e,a);if("throw"!==s.type){var l=s.arg,d=l.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){r("next",e,i,c)}),(function(e){r("throw",e,i,c)})):t.resolve(d).then((function(e){l.value=e,i(l)}),(function(e){return r("throw",e,i,c)}))}c(s.arg)}var o;this._invoke=function(e,n){function a(){return new t((function(t,o){r(e,n,t,o)}))}return o=o?o.then(a,a):a()}}function k(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,k(e,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=u(n,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var a=o.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,m):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function _(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function B(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function O(e){if(e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}return{next:S}}function S(){return{value:t,done:!0}}return v.prototype=y,s(E,"constructor",y),s(y,"constructor",v),v.displayName=s(y,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,s(e,c,"GeneratorFunction")),e.prototype=Object.create(E),e},e.awrap=function(e){return{__await:e}},x(j.prototype),s(j.prototype,i,(function(){return this})),e.AsyncIterator=j,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new j(l(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},x(E),s(E,c,"Generator"),s(E,a,(function(){return this})),s(E,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=O,B.prototype={constructor:B,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(_),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(s&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,m):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),_(r),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;_(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:O(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),m}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}},"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":(e,t,r)=>{"use strict";function n(e,t,r,n,o,a,i){try{var c=e[a](i),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(o,a){var i=e.apply(t,r);function c(e){n(i,o,a,c,s,"next",e)}function s(e){n(i,o,a,c,s,"throw",e)}c(void 0)}))}}r.r(t),r.d(t,{default:()=>o})},"./script/projects.json":e=>{"use strict";e.exports=JSON.parse('{"projects":[{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"home.png","description":"Nodejs web application for managing safe house informations. Built using react and express.it uses multi tier user roles for access control."},{"name":"animate trace border","title":"Trace Border","repo":"https://github.com/seegg/trace-border-animation","url":"https://seegg.github.io/trace-border-animation/demo","image":"img1.png","description":"React wrapper component to animate tracing a border around wrapped contents."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"bounce.png","description":"Bounce balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Budget Tracker API","title":"Budget Tracker API","repo":"https://github.com/seegg/budget-tracker","url":"https://github.com/seegg/budget-tracker","description":"REST API for Budget Tracker app"},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Personal Page","title":"Personal page","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","description":"This web page"},{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"date-picker.png","description":"A date picker widget created using vanilla JS that can easily be added to any webpage."}]}')}},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={exports:{}};return r[e](a,a.exports,o),a.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var a=Object.create(null);o.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var c=2&n&&r;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((e=>i[e]=()=>r[e]));return i.default=()=>r,o.d(a,i),a},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(()=>{"use strict";o.r(a);var e=o("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),t=o("./node_modules/@babel/runtime/regenerator/index.js"),r=o.n(t),n=o("./script/animate.ts"),i=o("./script/load-projects.ts"),c=o("./script/util.ts"),s=o("./script/nav.ts"),l=o("./script/collapseDeckOnScroll.ts");(0,c.addCssClassToTouchDevices)(document.getElementById("content")||null),function(){var t=(0,e.default)(r().mark((function e(){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(0,s.setUpNavBar)(570),(0,n.animate)(),e.next=4,(0,i.loadProjects)();case 4:(0,l.collapseDeckOnScroll)(570);case 5:case"end":return e.stop()}}),e)})));return function(){return t.apply(this,arguments)}}()()})()})();
//# sourceMappingURL=bundle.js.map