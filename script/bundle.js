/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var e,t,r={"./node_modules/@babel/runtime/regenerator/index.js":(e,t,r)=>{e.exports=r("./node_modules/regenerator-runtime/runtime.js")},"./script/collapseDeckOnScroll.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{collapseDeckOnScroll:()=>y});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),o=r("./node_modules/@babel/runtime/regenerator/index.js"),a=r.n(o),i=r("./script/nav.ts"),c=r("./script/util.ts"),s=(document.getElementById("content"),document.getElementById("projects")),l=document.querySelector(".projects-display"),u=document.getElementById("intro-container"),d=document.getElementById("tab-nav-bar"),p="close-deck-partial",f="nav-icon-selected",h=".nav-project",v="background-card",m="close-deck-full",g="moveY-40",y=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:570,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:450,o=Array.from(s.querySelectorAll(".project-card")),h=300,y=0,x=!d||"nav-projects"===(null===(e=d.querySelector(".selected"))||void 0===e?void 0:e.id),j=!1,S=r/h,P=document.querySelector(".projects-scroll");window.innerWidth<t&&k(P,window.innerHeight+o.length*h),document.addEventListener("scroll",(0,n.default)(a().mark((function e(){var n,i,s,u,d,p,f,v,m,g;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(P){e.next=2;break}return e.abrupt("return");case 2:if(!(x&&window.innerWidth<t)){e.next=30;break}if(n=P.getBoundingClientRect(),i=n.top,s=n.bottom,u=window.innerHeight-s,!(i<0&&u<0)){e.next=29;break}if(j||(C("fixed"),j=!0),d=Math.abs(i),p=Math.floor(d/h),p=Math.min(o.length-1,p),f=Math.max(d%h-200,0),console.log(f),!(p>y)){e.next=26;break}v=y;case 14:if(!(v<p)){e.next=23;break}return b(o[v+1],o[v]),e.next=18,(0,c.sleep)(300);case 18:L(o,v,"add"),console.log(v);case 20:v++,e.next=14;break;case 23:y=p,e.next=27;break;case 26:if(p<y){for(console.log("trigger draw"),m=y;m>p;m--)w(o[m-1],o[m]),L(o,m-1,"remove");window.scrollBy({top:-f,behavior:"auto"}),y=p}else f>0&&(o[y].style.height=r-f*S+"px");case 27:e.next=30;break;case 29:if(j)if(console.log(i),C("not-fixed"),j=!1,u>=0)l.classList.remove("attach-to-top");else{for(g=y;g>0;g--)w(o[g-1],o[g]);l.classList.add("attach-to-top")}case 30:case"end":return e.stop()}}),e)}))));var _="nav-projects";(0,i.addNavCallback)((function(e,r){window.innerWidth>=t||e[r].id!==_||P.style.removeProperty("height")}),"before"),(0,i.addNavCallback)((function(e,r,n){x=e[n].id===_,window.innerWidth>=t||!x||k(P,window.innerHeight+o.length*h)}),"after");var O=new ResizeObserver((function(e){var r=e[0].contentBoxSize[0].inlineSize;r>=t?(console.log(r,t,"reset"),B()):k(P,window.innerHeight+o.length*h)})),T=new IntersectionObserver((function(e){e[0].isIntersecting&&y<o.length-1&&E(o[y],!1)}),{rootMargin:"0px",threshold:.25});u&&(O.observe(u),T.observe(u));var B=function(){var e;o.forEach((function(e){var t,r;e.classList.remove(p,m),null===(t=e.querySelector(".project"))||void 0===t||t.classList.remove(v),null===(r=e.querySelector(".nav-project"))||void 0===r||r.classList.remove(g)})),null===(e=o[y].querySelectorAll(".nav-icon"))||void 0===e||e.forEach((function(e){e.classList.remove(f)})),y=0,P.style.removeProperty("height")}},b=function(e,t){t.style.removeProperty("height"),e.style.removeProperty("height"),x(t,"collapse"),j(e,t)},w=function(e,t){t.style.removeProperty("height"),e.style.removeProperty("height"),x(e,"expand"),j(e,t)},x=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h;try{var n,o="collapse"===t?"add":"expand"===t?"remove":void 0;if(void 0===o)throw new Error("state can only be either collapse or expand");e.classList[o](p),null===(n=e.querySelector(r))||void 0===n||n.classList[o](g)}catch(e){e instanceof Error?console.error(e.message):console.error(e)}},L=function(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".project";try{if(console.log("is this working?"),t<1)return;var o;if(t>=1)null===(o=e[t-1].querySelector(n))||void 0===o||o.classList[r](v);t>=2&&e[t-2].classList[r](m)}catch(e){console.error(e)}},j=function(e,t){E(t,!1),E(e,!0)},E=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".nav-icon",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:f,o=t?"add":"remove";e.querySelectorAll(r).forEach((function(e){e.classList[o](n)}))},k=function(e,t){e.style.height=t+"px"},C=function(e){"fixed"===e?l.classList.add("fixed"):l.classList.remove("fixed")}},"./script/data.ts":(e,t,r)=>{"use strict";var n;r.r(t),r.d(t,{getProjects:()=>a});var o=r("./script/projects.json"),a=function(){return JSON.parse(JSON.stringify(n||(n=r.t(o,2)))).projects}},"./script/intro.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{intro:()=>c});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),o=r("./node_modules/@babel/runtime/regenerator/index.js"),a=r.n(o),i=document.getElementById("content"),c=function(){var e=(0,n.default)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s(),l(),document.onscroll=function(){s(),l()},window.addEventListener("resize",(function(){s(),l()}),!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;if(i){var t=window.innerHeight-i.getBoundingClientRect().top,r=(t=Math.pow(.05*t,2))<=0?0:t>=e?1:t/e;i.style.opacity=r.toString()}},l=function(){var e,t;i&&(window.innerHeight-i.getBoundingClientRect().top>0?null===(e=document.getElementById("scroll-reminder"))||void 0===e||e.classList.remove("show-scroll"):null===(t=document.getElementById("scroll-reminder"))||void 0===t||t.classList.add("show-scroll"))}},"./script/load-projects.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{loadProjects:()=>u});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),o=r("./node_modules/@babel/runtime/regenerator/index.js"),a=r.n(o),i=r("./script/data.ts"),c=r("./script/project-card.ts"),s=document.getElementById("projects"),l=document.getElementById("content"),u=function(){var e=(0,n.default)(a().mark((function e(){var t,r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s||!l){e.next=14;break}250,160,1690,310,300,t=(0,i.getProjects)(),p(t.length,250,160,1690,310),window.addEventListener("resize",(function(){p(t.length,250,160,1690,310)})),(r=window.innerHeight-s.getBoundingClientRect().top)<300&&document.addEventListener("scroll",(function e(){window.innerHeight-s.getBoundingClientRect().top>=300&&(Array.from(s.children).forEach((function(e){d(e)})),document.removeEventListener("scroll",e))})),t.forEach(function(){var e=(0,n.default)(a().mark((function e(t){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,c.createProjectPlaceholder)(),s.appendChild(n),e.next=4,new Promise((function(e){var n;e((n=(0,c.createProjectCard)(t,l,"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/"),r<300&&d(n),n))})).then((function(e){n.replaceWith(e),e.classList.add("anim-fadein")})).catch((function(e){return console.error(e)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=15;break;case 14:throw new Error("Some error");case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(e){e.classList.toggle("intro-only-once");var t=e.querySelector(".nav-project");null==t||t.classList.toggle("invisible"),null==t||t.classList.toggle("anim-fadein-long")},p=function(e,t,r,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:310,a=null==l?void 0:l.clientWidth;if(void 0!==a&&s){var i=Math.floor((a-t)/160),c=Math.min(i,e)*r+(t-r),u=Math.min(Math.max(o,c),n);s.style.width=u+10+"px"}}},"./script/nav.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{setUpNavBar:()=>j,toggleNavBarFixedPosition:()=>C,addNavCallback:()=>S,removeNavCallback:()=>P});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),o=r("./node_modules/@babel/runtime/regenerator/index.js"),a=r.n(o),i=r("./script/util.ts"),c=Array.from(document.getElementsByClassName("tab-nav")),s=Array.from(document.getElementsByClassName("tab")),l=document.getElementById("tab-nav-bar"),u=null==l?void 0:l.parentElement,d=document.getElementById("nav-filler"),p="tab-nav-fixed",f="selected",h="hide",v="anim-fadein",m="anim-fadeout-deck",g="anim-close-deck",y="anim-open-deck",b=[],w=[],x={current:null},L=!1,j=function(){var e=(0,n.default)(a().mark((function e(){var t,r,o=arguments;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=o.length>0&&void 0!==o[0]?o[0]:570,document.addEventListener("scroll",(function(){var e=u.getBoundingClientRect().top;C(e<=0?"fixed":"not-fixed")})),c.forEach(function(){var e=(0,n.default)(a().mark((function e(o,i){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o.addEventListener("click",(0,n.default)(a().mark((function e(){var n,l;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!o.classList.contains(f)){e.next=2;break}return e.abrupt("return");case 2:if(x.current=i,n=c.findIndex((function(e){return e.classList.contains(f)})),b.forEach((function(e){return e(c,n,i)})),o.classList.add(f),c.forEach((function(e,t){t!==i&&e.classList.remove(f)})),!(window.innerWidth>=t)){e.next=18;break}if(l=!1,"nav-projects"!==c[n].id){e.next=13;break}return l=!0,e.next=13,E();case 13:if(0===i&&k(),!l||0!==x.current){e.next=16;break}return e.abrupt("return");case 16:if(i===x.current){e.next=18;break}return e.abrupt("return");case 18:return e.next=20,r(i,s);case 20:w.forEach((function(e){return e(c,n,i)}));case 21:case"end":return e.stop()}}),e)}))));case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),r=function(){var e=(0,n.default)(a().mark((function e(t,r){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.forEach(function(){var e=(0,n.default)(a().mark((function e(r,n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t===n?(r.classList.remove(h),r.classList.add(v)):(r.classList.add(h),r.classList.remove(v));case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=(0,n.default)(a().mark((function e(){var t,r,n,o=arguments;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:s[0],r=o.length>1&&void 0!==o[1]?o[1]:500,t.classList.add(m),null==(n=Array.from(t.querySelectorAll(".project-card")))||n.forEach((function(e){e.classList.remove(y),e.classList.add(g)})),e.next=7,(0,i.sleep)(r);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s[0];e.classList.remove(m);var t=Array.from(e.querySelectorAll(".project-card"));t.forEach((function(e){e.classList.add(y),e.classList.remove(g)}))},C=function(e){"fixed"!==e||L?"not-fixed"===e&&L&&(null==l||l.classList.remove(p),null==d||d.classList.remove("nav-filler-expand"),L=!1):(null==l||l.classList.add(p),null==d||d.classList.add("nav-filler-expand"),L=!0)},S=function(e,t){switch(t){case"before":b.push(e);break;case"after":w.push(e)}},P=function(e,t){var r=null;switch(t){case"before":r=b;break;case"after":r=w}if(null!==r){var n=r.findIndex((function(t){return t===e}));-1!==n&&r.splice(n,1)}}},"./script/project-card.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{createProjectCard:()=>o,createProjectPlaceholder:()=>c});var n=r("./script/util.ts"),o=function(e,t,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:570,c=(0,n.createElementWithClasses)("section","project-card","anim-open-deck");c.tabIndex=-1;var s=(0,n.createElementWithClasses)("nav","nav-project","anim-fadein-long"),l=(0,n.createNavItem)(e.repo||"#",r+"GitHub-Mark-Light-32px.png","nav-icon");s.appendChild(l);var u=(0,n.createNavItem)(e.url||"#","../images/link.png","nav-icon");s.prepend(u),c.appendChild(s);var d=(0,n.createElementWithClasses)("article","project");d.onpointerenter=function(){window.innerWidth>=o&&c.focus(),a(d,s,c,"entering")},c.onpointerleave=function(){null!=t&&t.classList.contains("touch-device")||a(d,s,c,"leaving")},c.onpointercancel=function(){a(d,s,c,"leaving")},c.onblur=function(){a(d,s,c,"leaving")},c.onfocus=function(){null!=t&&t.classList.contains("touch-device")&&a(d,s,c,"entering")};var p=e.image?r+e.image:null,f=i(p);d.appendChild(f);var h=(0,n.createElementWithClasses)("article","project-description");return h.innerHTML='<h4 class="project-title"><a href="'.concat(e.url,'"><span class="material-icons">link</span></a>').concat(e.name,"</h4><p>").concat(e.description,"</p>"),d.appendChild(h),c.appendChild(d),c},a=function(e,t,r,n){var o=Array.from(t.querySelectorAll("img"));"entering"===n?(e.classList.add("project-select"),t.classList.add("nav-project-moveY"),o.forEach((function(e){return e.classList.add("nav-icon-partial")})),r.classList.add("full-card-size")):(e.classList.remove("project-select"),t.classList.remove("nav-project-moveY"),r.classList.remove("full-card-size"),o.forEach((function(e){return e.classList.remove("nav-icon-partial")})))},i=function(e){var t=s();if(e){var r=(0,n.createElementWithClasses)("div","project-img-container"),o=new Image;o.src=e,o.classList.add("project-img"),r.appendChild(o),o.onload=function(){var e;null===(e=t.parentElement)||void 0===e||e.replaceChild(r,t),o.classList.add("anim-fadein-long")}}return t},c=function(){var e=(0,n.createElementWithClasses)("div","placeholder-container"),t=(0,n.createElementWithClasses)("div","placeholder-nav"),r=(0,n.createElementWithClasses)("div","placeholder-nav-icon","placeholder");t.appendChild(r),e.appendChild(t);var o=(0,n.createElementWithClasses)("div","placeholder-project","placeholder"),a=s();o.appendChild(a);var i=(0,n.createElementWithClasses)("div","placeholder-title","placeholder");o.appendChild(i);var c=(0,n.createElementWithClasses)("div","placeholder-description","placeholder");return o.appendChild(c),e.appendChild(o),e},s=function(){var e=(0,n.createElementWithClasses)("div","placeholder-image","placeholder"),t=(0,n.createElementWithClasses)("div","placeholder-triangle"),r=(0,n.createElementWithClasses)("div","placeholder-triangle-big"),o=(0,n.createElementWithClasses)("div","triangle-container");return o.appendChild(r),o.appendChild(t),e.appendChild(o),e}},"./script/util.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{addCssClassToTouchDevices:()=>i,debounce:()=>c,createElementWithClasses:()=>s,createNavItem:()=>l,sleep:()=>u,between:()=>d,scrollYViewport:()=>p});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),o=r("./node_modules/@babel/runtime/regenerator/index.js"),a=r.n(o),i=function(e){if(null!==e){e.classList.add("hasHover");document.addEventListener("touchstart",(function(){e.classList.add("touch-device"),e.classList.remove("hasHover")}),!0),document.addEventListener("mousemove",(function(){e.classList.add("hasHover"),e.classList.remove("touch-device")}),!0)}};function c(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return function(){for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];clearTimeout(t),t=setTimeout((function(){e.apply(void 0,o)}),r)}}function s(e){for(var t,r=document.createElement(e),n=arguments.length,o=new Array(n>1?n-1:0),a=1;a<n;a++)o[a-1]=arguments[a];return(t=r.classList).add.apply(t,o),r}var l=function(e,t){var r,n=document.createElement("a");n.href=e;var o=new Image;o.src=t;for(var a=arguments.length,i=new Array(a>2?a-2:0),c=2;c<a;c++)i[c-2]=arguments[c];return(r=o.classList).add.apply(r,i),n.appendChild(o),n},u=function(){var e=(0,n.default)(a().mark((function e(t){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){var r=setTimeout((function(){e(r)}),t)}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(e,t,r){return e>=t&&e<=r},p=function(e,t,r){document.body.style.overflowY="hidden",window.scrollTo({top:e,behavior:t}),setTimeout((function(){document.body.style.overflowY="auto"}),r)}},"./node_modules/regenerator-runtime/runtime.js":e=>{var t=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(e){s=function(e,t,r){return e[t]=r}}function l(e,t,r,n){var o=t&&t.prototype instanceof m?t:m,a=Object.create(o.prototype),i=new P(n||[]);return a._invoke=function(e,t,r){var n=d;return function(o,a){if(n===f)throw new Error("Generator is already running");if(n===h){if("throw"===o)throw a;return O()}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=k(i,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var s=u(e,t,r);if("normal"===s.type){if(n=r.done?h:p,s.arg===v)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=h,r.method="throw",r.arg=s.arg)}}}(e,r,i),a}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=l;var d="suspendedStart",p="suspendedYield",f="executing",h="completed",v={};function m(){}function g(){}function y(){}var b={};s(b,a,(function(){return this}));var w=Object.getPrototypeOf,x=w&&w(w(_([])));x&&x!==r&&n.call(x,a)&&(b=x);var L=y.prototype=m.prototype=Object.create(b);function j(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function E(e,t){function r(o,a,i,c){var s=u(e[o],e,a);if("throw"!==s.type){var l=s.arg,d=l.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){r("next",e,i,c)}),(function(e){r("throw",e,i,c)})):t.resolve(d).then((function(e){l.value=e,i(l)}),(function(e){return r("throw",e,i,c)}))}c(s.arg)}var o;this._invoke=function(e,n){function a(){return new t((function(t,o){r(e,n,t,o)}))}return o=o?o.then(a,a):a()}}function k(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,k(e,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=u(n,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var a=o.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function S(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function _(e){if(e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}return{next:O}}function O(){return{value:t,done:!0}}return g.prototype=y,s(L,"constructor",y),s(y,"constructor",g),g.displayName=s(y,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,s(e,c,"GeneratorFunction")),e.prototype=Object.create(L),e},e.awrap=function(e){return{__await:e}},j(E.prototype),s(E.prototype,i,(function(){return this})),e.AsyncIterator=E,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new E(l(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},j(L),s(L,c,"Generator"),s(L,a,(function(){return this})),s(L,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=_,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(S),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var s=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(s&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),S(r),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:_(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),v}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}},"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":(e,t,r)=>{"use strict";function n(e,t,r,n,o,a,i){try{var c=e[a](i),s=c.value}catch(e){return void r(e)}c.done?t(s):Promise.resolve(s).then(n,o)}function o(e){return function(){var t=this,r=arguments;return new Promise((function(o,a){var i=e.apply(t,r);function c(e){n(i,o,a,c,s,"next",e)}function s(e){n(i,o,a,c,s,"throw",e)}c(void 0)}))}}r.r(t),r.d(t,{default:()=>o})},"./script/projects.json":e=>{"use strict";e.exports=JSON.parse('{"projects":[{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"home.png","description":"Nodejs web application for managing safe house informations. Built using react and express.it uses multi tier user roles for access control."},{"name":"animate trace border","title":"Trace Border","repo":"https://github.com/seegg/trace-border-animation","url":"https://seegg.github.io/trace-border-animation/demo","image":"img1.png","description":"React wrapper component to animate tracing a border around wrapped contents."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"bounce.png","description":"Bounce balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Budget Tracker API","title":"Budget Tracker API","repo":"https://github.com/seegg/budget-tracker","url":"https://github.com/seegg/budget-tracker","description":"REST API for Budget Tracker app"},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Personal Page","title":"Personal Porfolio","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","description":"This web page, responsive, mobile first."},{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"date-picker.png","description":"A date picker widget created using vanilla JS that can easily be added to any webpage."}]}')}},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={exports:{}};return r[e](a,a.exports,o),a.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,o.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var a=Object.create(null);o.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var c=2&n&&r;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((e=>i[e]=()=>r[e]));return i.default=()=>r,o.d(a,i),a},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var a={};(()=>{"use strict";o.r(a);var e=o("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),t=o("./node_modules/@babel/runtime/regenerator/index.js"),r=o.n(t),n=o("./script/intro.ts"),i=o("./script/load-projects.ts"),c=o("./script/util.ts"),s=o("./script/nav.ts"),l=o("./script/collapseDeckOnScroll.ts");(0,c.addCssClassToTouchDevices)(document.getElementById("content")||null),function(){var t=(0,e.default)(r().mark((function e(){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(0,s.setUpNavBar)(570),e.next=3,(0,n.intro)();case 3:return e.next=5,(0,i.loadProjects)();case 5:(0,l.collapseDeckOnScroll)(570);case 6:case"end":return e.stop()}}),e)})));return function(){return t.apply(this,arguments)}}()()})()})();
//# sourceMappingURL=bundle.js.map