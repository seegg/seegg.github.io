/*! For license information please see bundle.js.LICENSE.txt */
(()=>{var e,t,r={"./node_modules/@babel/runtime/regenerator/index.js":(e,t,r)=>{e.exports=r("./node_modules/regenerator-runtime/runtime.js")},"./script/card-deck.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{stashCard:()=>s,drawCard:()=>c,toggleBackgroundCard:()=>l,setCardStatesInRange:()=>d,stashCardsInRange:()=>p,drawCardsInRange:()=>g,switchSelectedNavIcons:()=>h,closeDeck:()=>m,openDeck:()=>v});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),a=r("./node_modules/@babel/runtime/regenerator/index.js"),o=r.n(a),i=r("./script/util.ts"),s=function(e,t){t.style.removeProperty("height"),e.style.removeProperty("height"),u(t,"collapse"),h(e,t)},c=function(e,t){t.style.removeProperty("height"),e.style.removeProperty("height"),u(e,"expand"),h(e,t)},u=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".nav-project",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"close-deck-partial",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"moveY-40";try{var o,i="collapse"===t?"add":"expand"===t?"remove":void 0;if(void 0===i)throw new Error("state can only be either collapse or expand");e.classList[i](n),null===(o=e.querySelector(r))||void 0===o||o.classList[i](a)}catch(e){e instanceof Error?console.error(e.message):console.error(e)}},l=function(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".project",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"background-card",o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"close-deck-full";try{if(t<1)return;var i;if(t>=1)null===(i=e[t-1].querySelector(n))||void 0===i||i.classList[r](a);t>=2&&e[t-2].classList[r](o)}catch(e){console.error(e)}},d=function(e,t,r){for(var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"disable-transitions",a=t;a<r;a++)e[a].classList.add(n),s(e[a+1],e[a]),l(e,a,"add"),e[a].offsetHeight,e[a].classList.remove(n)},p=function(){var e=(0,n.default)(o().mark((function e(t,r,n,a){var c;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=r;case 1:if(!(c<n)){e.next=9;break}return s(t[c+1],t[c]),e.next=5,(0,i.sleep)(a);case 5:l(t,c,"add");case 6:c++,e.next=1;break;case 9:case"end":return e.stop()}}),e)})));return function(t,r,n,a){return e.apply(this,arguments)}}(),g=function(){var e=(0,n.default)(o().mark((function e(t,r,n,a){var s;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=r;case 1:if(!(s>n)){e.next=9;break}return c(t[s-1],t[s]),l(t,s-1,"remove"),e.next=6,(0,i.sleep)(a);case 6:s--,e.next=1;break;case 9:case"end":return e.stop()}}),e)})));return function(t,r,n,a){return e.apply(this,arguments)}}(),h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;f(t,!1),f(e,!0)},f=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".nav-icon",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"nav-icon-selected";if(null!==e){var a=t?"add":"remove";e.querySelectorAll(r).forEach((function(e){e.classList[a](n)}))}},m=function(){var e=(0,n.default)(o().mark((function e(t){var r,n,a,s,c,u,l=arguments;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=l.length>1&&void 0!==l[1]?l[1]:500,n=l.length>2&&void 0!==l[2]?l[2]:"anim-fadeout-deck",a=l.length>3&&void 0!==l[3]?l[3]:"anim-open-deck",s=l.length>4&&void 0!==l[4]?l[4]:"anim-close-deck",c=l.length>5&&void 0!==l[5]?l[5]:".project-card",t.classList.add(n),null==(u=Array.from(t.querySelectorAll(c)))||u.forEach((function(e){e.classList.remove(a),e.classList.add(s)})),e.next=10,(0,i.sleep)(r);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"anim-fadeout-deck",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"anim-open-deck",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"anim-close-deck",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:".project-card";e.classList.remove(t);var o=Array.from(e.querySelectorAll(a));o.forEach((function(e){e.classList.add(r),e.classList.remove(n)}))}},"./script/collapseDeckOnScroll.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{collapseDeckOnScroll:()=>b});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),a=r("./node_modules/@babel/runtime/regenerator/index.js"),o=r.n(a),i=r("./script/nav.ts"),s=r("./script/util.ts"),c=r("./script/queue.ts"),u=r("./script/card-deck.ts"),l=document.getElementById("projects"),d=document.querySelector(".projects-display"),p="close-deck-partial",g="nav-icon-selected",h="background-card",f="close-deck-full",m="moveY-40",v="nav-projects",b=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:570,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:450,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:300,b=Array.from(l.querySelectorAll(".project-card")),w={value:0},k=r/a,x=new c.SyncAutoQueue,j=document.querySelector(".projects-scroll"),L=!i.navBar||(null===(e=i.navBar.querySelector(".selected"))||void 0===e?void 0:e.id)===v,E=!1,C=window.scrollY,S=0,P=!0;window.innerWidth<t&&((0,s.setElementHeight)(j,window.innerHeight+b.length*a),window.scroll(0,0)),document.addEventListener("scroll",(0,n.default)(o().mark((function e(){var i,c,l,p,g,h,f,m,v,T,_,B,A;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(j){e.next=2;break}return e.abrupt("return");case 2:if(!(L&&window.innerWidth<t)){e.next=38;break}if(i=j.getBoundingClientRect(),c=i.top,l=i.bottom,p=window.innerHeight-l,!(c<0&&p<0)){e.next=36;break}if(E||((0,u.switchSelectedNavIcons)(b[0]),y("fixed"),E=!0),g=Math.abs(c),h=Math.floor(g/a),h=Math.min(b.length-1,h),f=Math.max(g%a-200,0),!(h>w.value)){e.next=20;break}h-w.value>2&&(x.add((0,n.default)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.setCardStatesInRange)(b,w.value,h-2);case 2:case"end":return e.stop()}}),e)})))),w.value=h-2),m=w.value,v=window.scrollY,w.value=h,x.add((0,n.default)(o().mark((function e(){var t;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C=v,S=h,x.size,t=200,e.next=5,(0,u.stashCardsInRange)(b,m,h,t);case 5:case"end":return e.stop()}}),e)})))),P=!0,e.next=34;break;case 20:if(!(h<w.value)){e.next=33;break}if(!P){e.next=27;break}return P=!1,x.empty(),(0,s.scrollToPosAndPause)(document.body,C,300),w.value=S,e.abrupt("return");case 27:P=!1,T=w.value,w.value=h,x.add((0,n.default)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.drawCardsInRange)(b,T,h,100);case 2:case"end":return e.stop()}}),e)})))),e.next=34;break;case 33:f>0&&(b[w.value].style.height=r-f*k+"px");case 34:e.next=38;break;case 36:E&&c>=0&&(y("not-fixed"),E=!1),p>=0?(d.classList.remove("attach-to-top"),E||(y("fixed"),E=!0),w.value<b.length-2&&(_=w.value,w.value=b.length-2,x.add((0,n.default)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.setCardStatesInRange)(b,_,b.length-2);case 2:case"end":return e.stop()}}),e)}))))),B=w.value,w.value=b.length-1,x.add((0,n.default)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.stashCardsInRange)(b,B,b.length-1,100);case 2:P=!1;case 3:case"end":return e.stop()}}),e)}))))):(A=w.value,w.value=0,x.add((0,n.default)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.drawCardsInRange)(b,A,0,50);case 2:P=!0;case 3:case"end":return e.stop()}}),e)})))),p<0&&d.classList.add("attach-to-top"));case 38:case"end":return e.stop()}}),e)})))),(0,i.addNavCallback)((function(e,r){window.innerWidth>=t||e[r].id!==v||(x.empty(),j.style.removeProperty("height"))}),"before"),(0,i.addNavCallback)((function(e,r,n){L=e[n].id===v,window.innerWidth>=t||!L||((0,s.setElementHeight)(j,window.innerHeight+b.length*a),window.scrollTo({top:C,behavior:"auto"}))}),"after");var T=new ResizeObserver((function(e){e[0].contentBoxSize[0].inlineSize>=t?A():(0,s.setElementHeight)(j,window.innerHeight+b.length*a)})),_=new IntersectionObserver((function(e){e[0].isIntersecting&&w.value<b.length-1&&(0,u.switchSelectedNavIcons)(null,b[w.value])}),{rootMargin:"0px",threshold:.25}),B=document.getElementById("intro-container");B&&(T.observe(B),_.observe(B));var A=function(){var e;b.forEach((function(e){var t,r;e.classList.remove(p,f),null===(t=e.querySelector(".project"))||void 0===t||t.classList.remove(h),null===(r=e.querySelector(".nav-project"))||void 0===r||r.classList.remove(m)})),null===(e=b[w.value].querySelectorAll(".nav-icon"))||void 0===e||e.forEach((function(e){e.classList.remove(g)})),w.value=0,j.style.removeProperty("height")}},y=function(e){"fixed"===e?d.classList.add("fixed"):d.classList.remove("fixed")}},"./script/data.ts":(e,t,r)=>{"use strict";var n;r.r(t),r.d(t,{getProjects:()=>o});var a=r("./script/projects.json"),o=function(){return JSON.parse(JSON.stringify(n||(n=r.t(a,2)))).projects}},"./script/intro.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{intro:()=>s});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),a=r("./node_modules/@babel/runtime/regenerator/index.js"),o=r.n(a),i=document.getElementById("content"),s=function(){var e=(0,n.default)(o().mark((function e(){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c(),u(),document.onscroll=function(){c(),u()},window.addEventListener("resize",(function(){c(),u()}),!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;if(i){var t=window.innerHeight-i.getBoundingClientRect().top,r=(t=Math.pow(.05*t,2))<=0?0:t>=e?1:t/e;i.style.opacity=r.toString()}},u=function(){var e,t;i&&(window.innerHeight-i.getBoundingClientRect().top>0?null===(e=document.getElementById("scroll-reminder"))||void 0===e||e.classList.remove("show-scroll"):null===(t=document.getElementById("scroll-reminder"))||void 0===t||t.classList.add("show-scroll"))}},"./script/load-projects.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{loadProjects:()=>l});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),a=r("./node_modules/@babel/runtime/regenerator/index.js"),o=r.n(a),i=r("./script/data.ts"),s=r("./script/project-card.ts"),c=document.getElementById("projects"),u=document.getElementById("content"),l=function(){var e=(0,n.default)(o().mark((function e(){var t,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!c||!u){e.next=14;break}250,160,1690,310,300,t=(0,i.getProjects)(),p(t.length,250,160,1690,310),window.addEventListener("resize",(function(){p(t.length,250,160,1690,310)})),(r=window.innerHeight-c.getBoundingClientRect().top)<300&&document.addEventListener("scroll",(function e(){window.innerHeight-c.getBoundingClientRect().top>=300&&(Array.from(c.children).forEach((function(e){d(e)})),document.removeEventListener("scroll",e))})),t.forEach(function(){var e=(0,n.default)(o().mark((function e(t){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(0,s.createProjectPlaceholder)(),c.appendChild(n),e.next=4,new Promise((function(e){var n;e((n=(0,s.createProjectCard)(t,u),r<300&&d(n),n))})).then((function(e){n.replaceWith(e),e.classList.add("anim-fadein")})).catch((function(e){return console.error(e)}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e.next=15;break;case 14:throw new Error("Some error");case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(e){e.classList.toggle("intro-only-once");var t=e.querySelector(".nav-project");null==t||t.classList.toggle("invisible"),null==t||t.classList.toggle("anim-fadein-long")},p=function(e,t,r,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:310,o=null==u?void 0:u.clientWidth;if(void 0!==o&&c){var i=Math.floor((o-t)/160),s=Math.min(i,e)*r+(t-r),l=Math.min(Math.max(a,s),n);c.style.width=l+10+"px"}}},"./script/nav.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{navBar:()=>u,setUpNavBar:()=>w,toggleNavBarFixedPosition:()=>k,addNavCallback:()=>x,removeNavCallback:()=>j,getCurrentTab:()=>L});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),a=r("./node_modules/@babel/runtime/regenerator/index.js"),o=r.n(a),i=r("./script/card-deck.ts"),s=Array.from(document.getElementsByClassName("tab-nav")),c=Array.from(document.getElementsByClassName("tab")),u=document.getElementById("tab-nav-bar"),l=null==u?void 0:u.parentElement,d=document.getElementById("nav-filler"),p="tab-nav-fixed",g="selected",h="hide",f="anim-fadein",m=[],v=[],b={current:0},y=!1,w=function(){var e=(0,n.default)(o().mark((function e(){var t,r,a=arguments;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=a.length>0&&void 0!==a[0]?a[0]:570,document.addEventListener("scroll",(function(){var e=l.getBoundingClientRect().top;k(e<=0?"fixed":"not-fixed")})),s.forEach(function(){var e=(0,n.default)(o().mark((function e(a,u){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.addEventListener("click",(0,n.default)(o().mark((function e(){var n,l;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.classList.contains(g)){e.next=2;break}return e.abrupt("return");case 2:if(b.current=u,n=s.findIndex((function(e){return e.classList.contains(g)})),m.forEach((function(e){return e(s,n,u)})),a.classList.add(g),s.forEach((function(e,t){t!==u&&e.classList.remove(g)})),!(window.innerWidth>=t)){e.next=18;break}if(l=!1,"nav-projects"!==s[n].id){e.next=13;break}return l=!0,e.next=13,(0,i.closeDeck)(c[0]);case 13:if(0===u&&(0,i.openDeck)(c[0]),!l||0!==b.current){e.next=16;break}return e.abrupt("return");case 16:if(u===b.current){e.next=18;break}return e.abrupt("return");case 18:return e.next=20,r(u,c);case 20:v.forEach((function(e){return e(s,n,u)}));case 21:case"end":return e.stop()}}),e)}))));case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()),r=function(){var e=(0,n.default)(o().mark((function e(t,r){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.forEach(function(){var e=(0,n.default)(o().mark((function e(r,n){return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t===n?(r.classList.remove(h),r.classList.add(f)):(r.classList.add(h),r.classList.remove(f));case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}();case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(e){"fixed"!==e||y?"not-fixed"===e&&y&&(null==u||u.classList.remove(p),null==d||d.classList.remove("nav-filler-expand"),y=!1):(null==u||u.classList.add(p),null==d||d.classList.add("nav-filler-expand"),y=!0)},x=function(e,t){switch(t){case"before":m.push(e);break;case"after":v.push(e)}},j=function(e,t){var r=null;switch(t){case"before":r=m;break;case"after":r=v}if(null!==r){var n=r.findIndex((function(t){return t===e}));-1!==n&&r.splice(n,1)}},L=function(){return b.current}},"./script/project-card.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{createProjectCard:()=>a,createProjectPlaceholder:()=>s});var n=r("./script/util.ts"),a=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:570,a=(0,n.createElementWithClasses)("section","project-card","anim-open-deck");a.tabIndex=-1;var s=(0,n.createElementWithClasses)("nav","nav-project","anim-fadein-long"),c=(0,n.createNavItem)(e.repo||"#","../images/GitHub-Mark-Light-32px.png","nav-icon");s.appendChild(c);var u=(0,n.createNavItem)(e.url||"#","../images/link.png","nav-icon");s.prepend(u),a.appendChild(s);var l=(0,n.createElementWithClasses)("article","project");l.onpointerenter=function(){window.innerWidth>=r&&a.focus(),o(l,s,a,"entering")},a.onpointerleave=function(){null!=t&&t.classList.contains("touch-device")||o(l,s,a,"leaving")},a.onpointercancel=function(){o(l,s,a,"leaving")},a.onblur=function(){o(l,s,a,"leaving")},a.onfocus=function(){null!=t&&t.classList.contains("touch-device")&&o(l,s,a,"entering")};var d=e.image?e.image:null,p=i(d);l.appendChild(p);var g=(0,n.createElementWithClasses)("article","project-description");return g.innerHTML='<h4 class="project-title"><a href="'.concat(e.url,'"><span class="material-icons">link</span></a>').concat(e.name,"</h4><p>").concat(e.description,"</p>"),l.appendChild(g),a.appendChild(l),a},o=function(e,t,r,n){var a=Array.from(t.querySelectorAll("img"));"entering"===n?(e.classList.add("project-select"),t.classList.add("nav-project-moveY"),a.forEach((function(e){return e.classList.add("nav-icon-partial")})),r.classList.add("full-card-size")):(e.classList.remove("project-select"),t.classList.remove("nav-project-moveY"),r.classList.remove("full-card-size"),a.forEach((function(e){return e.classList.remove("nav-icon-partial")})))},i=function(e){var t=c();if(e){var r=(0,n.createElementWithClasses)("div","project-img-container"),a=new Image;a.src=e,a.classList.add("project-img"),r.appendChild(a),a.onload=function(){var e;null===(e=t.parentElement)||void 0===e||e.replaceChild(r,t),a.classList.add("anim-fadein-long")}}return t},s=function(){var e=(0,n.createElementWithClasses)("div","placeholder-container"),t=(0,n.createElementWithClasses)("div","placeholder-nav"),r=(0,n.createElementWithClasses)("div","placeholder-nav-icon","placeholder");t.appendChild(r),e.appendChild(t);var a=(0,n.createElementWithClasses)("div","placeholder-project","placeholder"),o=c();a.appendChild(o);var i=(0,n.createElementWithClasses)("div","placeholder-title","placeholder");a.appendChild(i);var s=(0,n.createElementWithClasses)("div","placeholder-description","placeholder");return a.appendChild(s),e.appendChild(a),e},c=function(){var e=(0,n.createElementWithClasses)("div","placeholder-image","placeholder"),t=(0,n.createElementWithClasses)("div","placeholder-triangle"),r=(0,n.createElementWithClasses)("div","placeholder-triangle-big"),a=(0,n.createElementWithClasses)("div","triangle-container");return a.appendChild(r),a.appendChild(t),e.appendChild(a),e}},"./script/queue.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{SyncAutoQueue:()=>u});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),a=r("./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"),o=r("./node_modules/@babel/runtime/helpers/esm/createClass.js"),i=r("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),s=r("./node_modules/@babel/runtime/regenerator/index.js"),c=r.n(s),u=function(){function e(){(0,a.default)(this,e),(0,i.default)(this,"queue",[]),(0,i.default)(this,"lockAquired",!1)}var t;return(0,o.default)(e,[{key:"add",value:function(e){this.queue.push(e),this.lockAquired||this.poll()}},{key:"poll",value:(t=(0,n.default)(c().mark((function e(){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.lockAquired){e.next=2;break}return e.abrupt("return");case 2:if(this.lockAquired=!0,e.prev=3,"function"!=typeof(t=this.queue.shift())){e.next=8;break}return e.next=8,t();case 8:this.lockAquired=!1,this.next(),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(3),console.error(e.t0);case 15:case"end":return e.stop()}}),e,this,[[3,12]])}))),function(){return t.apply(this,arguments)})},{key:"size",get:function(){return this.queue.length}},{key:"isInactive",get:function(){return 0===this.size&&!this.lockAquired}},{key:"next",value:function(){if(!(this.size>0))return null;this.poll()}},{key:"peek",value:function(){return this.size>0?this.queue[0]:null}},{key:"empty",value:function(){this.queue=[]}}]),e}()},"./script/util.ts":(e,t,r)=>{"use strict";r.r(t),r.d(t,{addCssClassToTouchDevices:()=>i,debounce:()=>s,createElementWithClasses:()=>c,createNavItem:()=>u,sleep:()=>l,between:()=>d,scrollYViewport:()=>p,setElementHeight:()=>g,scrollToPosAndPause:()=>h});var n=r("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),a=r("./node_modules/@babel/runtime/regenerator/index.js"),o=r.n(a),i=function(e){if(null!==e){e.classList.add("hasHover");document.addEventListener("touchstart",(function(){e.classList.add("touch-device"),e.classList.remove("hasHover")}),!0),document.addEventListener("mousemove",(function(){e.classList.add("hasHover"),e.classList.remove("touch-device")}),!0)}};function s(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300;return function(){for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];clearTimeout(t),t=setTimeout((function(){e.apply(void 0,a)}),r)}}function c(e){for(var t,r=document.createElement(e),n=arguments.length,a=new Array(n>1?n-1:0),o=1;o<n;o++)a[o-1]=arguments[o];return(t=r.classList).add.apply(t,a),r}var u=function(e,t){var r,n=document.createElement("a");n.href=e;var a=new Image;a.src=t;for(var o=arguments.length,i=new Array(o>2?o-2:0),s=2;s<o;s++)i[s-2]=arguments[s];return(r=a.classList).add.apply(r,i),n.appendChild(a),n},l=function(){var e=(0,n.default)(o().mark((function e(t){var r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){var r=setTimeout((function(){e(r)}),t)}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(e,t,r){return e>=t&&e<=r},p=function(e,t,r){document.body.style.overflowY="hidden",window.scrollTo({top:e,behavior:t}),setTimeout((function(){document.body.style.overflowY="auto"}),r)},g=function(e,t){e.style.height=t+"px"},h=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;e.style.overflowY="hidden",setTimeout((function(){e.style.overflowY="auto",window.scrollTo({top:t,behavior:"auto"})}),r)}},"./node_modules/regenerator-runtime/runtime.js":e=>{var t=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(e){c=function(e,t,r){return e[t]=r}}function u(e,t,r,n){var a=t&&t.prototype instanceof m?t:m,o=Object.create(a.prototype),i=new P(n||[]);return o._invoke=function(e,t,r){var n=d;return function(a,o){if(n===g)throw new Error("Generator is already running");if(n===h){if("throw"===a)throw o;return _()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var s=E(i,r);if(s){if(s===f)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=g;var c=l(e,t,r);if("normal"===c.type){if(n=r.done?h:p,c.arg===f)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=h,r.method="throw",r.arg=c.arg)}}}(e,r,i),o}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=u;var d="suspendedStart",p="suspendedYield",g="executing",h="completed",f={};function m(){}function v(){}function b(){}var y={};c(y,o,(function(){return this}));var w=Object.getPrototypeOf,k=w&&w(w(T([])));k&&k!==r&&n.call(k,o)&&(y=k);var x=b.prototype=m.prototype=Object.create(y);function j(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function r(a,o,i,s){var c=l(e[a],e,o);if("throw"!==c.type){var u=c.arg,d=u.value;return d&&"object"==typeof d&&n.call(d,"__await")?t.resolve(d.__await).then((function(e){r("next",e,i,s)}),(function(e){r("throw",e,i,s)})):t.resolve(d).then((function(e){u.value=e,i(u)}),(function(e){return r("throw",e,i,s)}))}s(c.arg)}var a;this._invoke=function(e,n){function o(){return new t((function(t,a){r(e,n,t,a)}))}return a=a?a.then(o,o):o()}}function E(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=t,E(e,r),"throw"===r.method))return f;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}var a=l(n,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,f;var o=a.arg;return o?o.done?(r[e.resultName]=o.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,f):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,f)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function S(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function P(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function T(e){if(e){var r=e[o];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function r(){for(;++a<e.length;)if(n.call(e,a))return r.value=e[a],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}return{next:_}}function _(){return{value:t,done:!0}}return v.prototype=b,c(x,"constructor",b),c(b,"constructor",v),v.displayName=c(b,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,b):(e.__proto__=b,c(e,s,"GeneratorFunction")),e.prototype=Object.create(x),e},e.awrap=function(e){return{__await:e}},j(L.prototype),c(L.prototype,i,(function(){return this})),e.AsyncIterator=L,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var i=new L(u(t,r,n,a),o);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},j(x),c(x,s,"Generator"),c(x,o,(function(){return this})),c(x,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=T,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(S),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function a(n,a){return s.type="throw",s.arg=e,r.next=n,a&&(r.method="next",r.arg=t),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),f},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),S(r),f}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;S(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:T(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),f}},e}(e.exports);try{regeneratorRuntime=t}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=t:Function("r","regeneratorRuntime = r")(t)}},"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":(e,t,r)=>{"use strict";function n(e,t,r,n,a,o,i){try{var s=e[o](i),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var i=e.apply(t,r);function s(e){n(i,a,o,s,c,"next",e)}function c(e){n(i,a,o,s,c,"throw",e)}s(void 0)}))}}r.r(t),r.d(t,{default:()=>a})},"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":(e,t,r)=>{"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}r.r(t),r.d(t,{default:()=>n})},"./node_modules/@babel/runtime/helpers/esm/createClass.js":(e,t,r)=>{"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function a(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}r.r(t),r.d(t,{default:()=>a})},"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":(e,t,r)=>{"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t),r.d(t,{default:()=>n})},"./script/projects.json":e=>{"use strict";e.exports=JSON.parse('{"projects":[{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/home.png","description":"Nodejs web application for managing safe house informations. Built using react and express.it uses multi tier user roles for access control."},{"name":"Animate trace border","title":"Trace Border","repo":"https://github.com/seegg/trace-border-animation","url":"https://seegg.github.io/trace-border-animation/demo","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/img1.png","description":"React wrapper component to animate tracing a border around wrapped contents."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/bounce.png","description":"Bounce balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Budget Tracker API","title":"Budget Tracker API","repo":"https://github.com/seegg/budget-tracker","url":"https://github.com/seegg/budget-tracker","description":"REST API for Budget Tracker app"},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Personal Page","title":"Personal Porfolio","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","image":"../images/githubpage.png","description":"This web page, responsive, mobile first."},{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/date-picker.png","description":"A date picker widget created using vanilla JS that can easily be added to any webpage."},{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/home.png","description":"Nodejs web application for managing safe house informations. Built using react and express.it uses multi tier user roles for access control."},{"name":"Animate trace border","title":"Trace Border","repo":"https://github.com/seegg/trace-border-animation","url":"https://seegg.github.io/trace-border-animation/demo","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/img1.png","description":"React wrapper component to animate tracing a border around wrapped contents."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/bounce.png","description":"Bounce balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Budget Tracker API","title":"Budget Tracker API","repo":"https://github.com/seegg/budget-tracker","url":"https://github.com/seegg/budget-tracker","description":"REST API for Budget Tracker app"},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Personal Page","title":"Personal Porfolio","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","description":"This web page, responsive, mobile first."},{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/date-picker.png","description":"A date picker widget created using vanilla JS that can easily be added to any webpage."},{"name":"Safe Houses","title":"Safe Houses","repo":"https://github.com/seegg/safe-houses","url":"https://tuohunga.herokuapp.com/","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/home.png","description":"Nodejs web application for managing safe house informations. Built using react and express.it uses multi tier user roles for access control."},{"name":"Animate trace border","title":"Trace Border","repo":"https://github.com/seegg/trace-border-animation","url":"https://seegg.github.io/trace-border-animation/demo","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/img1.png","description":"React wrapper component to animate tracing a border around wrapped contents."},{"name":"Tournament brackets","title":"Tournament brackets","repo":"https://github.com/seegg/tournament-bracket","url":"https://seegg.github.io/tournament-bracket","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/bracket.png","description":"A single elimination style bracket generator made using react."},{"name":"Bounce","title":"Bounce","repo":"https://github.com/seegg/bounce","url":"https://seegg.github.io/bounce","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/bounce.png","description":"Bounce balls in a canvas with inellastic collision. upload or link images to decorate the balls."},{"name":"Budget Tracker API","title":"Budget Tracker API","repo":"https://github.com/seegg/budget-tracker","url":"https://github.com/seegg/budget-tracker","description":"REST API for Budget Tracker app"},{"name":"Calculator","title":"Calculator","repo":"https://github.com/seegg/calculator","url":"https://seegg.github.io/calculator","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/calculator.png","description":"Simple calculator app for learning JS and CSS."},{"name":"Personal Page","title":"Personal Porfolio","repo":"https://github.com/seegg/seegg.github.io","url":"https://seegg.github.io/","description":"This web page, responsive, mobile first."},{"name":"JS Date Picker","title":"JS Date Picker","repo":"https://github.com/seegg/date-picker","url":"https://seegg.github.io/date-picker","image":"https://raw.githubusercontent.com/seegg/seegg.github.io/main/images/date-picker.png","description":"A date picker widget created using vanilla JS that can easily be added to any webpage."}]}')}},n={};function a(e){var t=n[e];if(void 0!==t)return t.exports;var o=n[e]={exports:{}};return r[e](o,o.exports,a),o.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,a.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var o=Object.create(null);a.r(o);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&n&&r;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>i[e]=()=>r[e]));return i.default=()=>r,a.d(o,i),o},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{"use strict";a.r(o);var e=a("./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"),t=a("./node_modules/@babel/runtime/regenerator/index.js"),r=a.n(t),n=a("./script/intro.ts"),i=a("./script/load-projects.ts"),s=a("./script/util.ts"),c=a("./script/nav.ts"),u=a("./script/collapseDeckOnScroll.ts");(0,s.addCssClassToTouchDevices)(document.getElementById("content")||null),function(){var t=(0,e.default)(r().mark((function e(){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(0,c.setUpNavBar)(570),e.next=3,(0,n.intro)();case 3:return e.next=5,(0,i.loadProjects)();case 5:(0,u.collapseDeckOnScroll)(570);case 6:case"end":return e.stop()}}),e)})));return function(){return t.apply(this,arguments)}}()()})()})();
//# sourceMappingURL=bundle.js.map