(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"/y+/":function(t,e,n){"use strict";n.r(e),n.d(e,"MemeModule",function(){return lt});var i=n("ofXK"),o=n("tqRt"),r=n("hhGJ"),a=n("7bNT"),c=n("XqQ8"),l=n("lJxs"),s=n("JIr8"),m=n("UqQ7"),d=n("LRne"),g=n("fXoL"),p=n("IheW"),h=n("AytR");let f=(()=>{class t{constructor(t){this.http=t}getTrending(t=0){let e=new p.c;return e=e.append("api_key",h.a.GIPHY_API_KEY),e=e.append("offset",String(t)),e=e.append("limit","25"),this.http.get(h.a.GIPHY_API_URL_TRENDING,{params:e})}getSearchTerm(t=0,e){let n=new p.c;return n=n.append("api_key",h.a.GIPHY_API_KEY),n=n.append("offset",String(t)),n=n.append("limit","25"),n=n.append("q",e),this.http.get(h.a.GIPHY_API_URL_SEARCH,{params:n})}}return t.\u0275fac=function(e){return new(e||t)(g["\u0275\u0275inject"](p.a))},t.\u0275prov=g["\u0275\u0275defineInjectable"]({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),u=(()=>{class t{constructor(t,e,n){this.actions$=t,this.memeService=e,this.store=n,this.startGettingTrending$=Object(a.d)(()=>this.actions$.pipe(Object(a.e)(m.l),Object(a.c)(()=>this.store.select(r.i)),Object(c.a)(([t,e])=>this.memeService.getTrending(e).pipe(Object(l.a)((t,e)=>m.k({data:t.data,pagination:t.pagination})),Object(s.a)(t=>Object(d.a)(m.j({msg:t.message}))))))),this.clearThenSearch$=Object(a.d)(()=>this.actions$.pipe(Object(a.e)(m.b),Object(l.a)(t=>0===t.search.trim().length?m.l():m.i({search:t.search})))),this.setSearchTerm$=Object(a.d)(()=>this.actions$.pipe(Object(a.e)(m.i),Object(l.a)(t=>m.g()))),this.startGettingSearch$=Object(a.d)(()=>this.actions$.pipe(Object(a.e)(m.g),Object(a.c)(()=>this.store.select(r.f)),Object(c.a)(([t,e])=>this.memeService.getSearchTerm(e.total,e.term).pipe(Object(l.a)(t=>m.f({data:t.data,pagination:t.pagination})),Object(s.a)(t=>Object(d.a)(m.e({msg:t.message}))))))),this.decideToSearchAtStart$=Object(a.d)(()=>this.actions$.pipe(Object(a.e)(m.c),Object(a.c)(()=>this.store.select(r.f)),Object(l.a)(([t,e])=>t.isScroll?e.term.length>0?m.g():m.l():e.total>0?m.d():e.term.length>0?m.g():m.l())))}}return t.\u0275fac=function(e){return new(e||t)(g["\u0275\u0275inject"](a.a),g["\u0275\u0275inject"](f),g["\u0275\u0275inject"](o.i))},t.\u0275prov=g["\u0275\u0275defineInjectable"]({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var _=n("pKmL"),y=n("xgIS"),b=n("5+tZ"),O=n("vkgz"),w=n("pLZG"),C=n("gcYM");function S(t,e,n,i){const o=window&&!!window.document&&window.document.documentElement;let r=o&&e?window:n;if(t&&(r=t&&o&&"string"==typeof t?function(t,e,n){return(n?window.document:e).querySelector(t)}(t,n.nativeElement,i):t,!r))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return r}function v(t){return t&&!t.firstChange}const M={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},P={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"};class x{constructor(t=!0){this.vertical=t,this.propsMap=t?M:P}clientHeightKey(){return this.propsMap.clientHeight}offsetHeightKey(){return this.propsMap.offsetHeight}scrollHeightKey(){return this.propsMap.scrollHeight}pageYOffsetKey(){return this.propsMap.pageYOffset}offsetTopKey(){return this.propsMap.offsetTop}scrollTopKey(){return this.propsMap.scrollTop}topKey(){return this.propsMap.top}}function T(t){return["Window","global"].some(e=>Object.prototype.toString.call(t).includes(e))}function j(t,e){return t?e.document.documentElement:null}function I(t,e){const n=function({container:t,isWindow:e,axis:n}){const{offsetHeightKey:i,clientHeightKey:o}=k(n);return E(t,e,i,o)}(e);return e.isWindow?function(t,e,n){const{axis:i,container:o,isWindow:r}=n,{offsetHeightKey:a,clientHeightKey:c}=k(i),l=t+D(j(r,o),i,r),s=E(e.nativeElement,r,a,c);return{height:t,scrolled:l,totalToScroll:function(t,e,n){const i=e.topKey();if(t.getBoundingClientRect)return t.getBoundingClientRect()[i]+D(t,e,n)}(e.nativeElement,i,r)+s,isWindow:r}}(n,t,e):function(t,e,n){const{axis:i,container:o}=n;return{height:t,scrolled:o[i.scrollTopKey()],totalToScroll:o[i.scrollHeightKey()],isWindow:!1}}(n,0,e)}function k(t){return{offsetHeightKey:t.offsetHeightKey(),clientHeightKey:t.clientHeightKey()}}function E(t,e,n,i){if(isNaN(t[n])){const n=j(e,t);return n?n[i]:0}return t[n]}function D(t,e,n){const i=e.pageYOffsetKey(),o=e.scrollTopKey(),r=e.offsetTopKey();return isNaN(window.pageYOffset)?j(n,t)[o]:t.ownerDocument?t.ownerDocument.defaultView[i]:t[r]}function H(t,e,n){let i,o;if(t.totalToScroll<=0)return!1;const r=t.isWindow?t.scrolled:t.height+t.scrolled;return n?(i=(t.totalToScroll-r)/t.totalToScroll,o=e.down/10):(i=t.scrolled/(t.scrolled+(t.totalToScroll-r)),o=e.up/10),i<=o}class K{constructor({totalToScroll:t}){this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},this.totalToScroll=t}updateScrollPosition(t){return this.lastScrollPosition=t}updateTotalToScroll(t){this.lastTotalToScroll!==t&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=t)}updateScroll(t,e){this.updateScrollPosition(t),this.updateTotalToScroll(e)}updateTriggeredFlag(t,e){e?this.triggered.down=t:this.triggered.up=t}isTriggeredScroll(t,e){return e?this.triggered.down===t:this.triggered.up===t}}const W="[NGX_ISE] DOWN",F="[NGX_ISE] UP";function z(t){const{scrollDown:e,stats:{scrolled:n}}=t;return{type:e?W:F,payload:{currentScrollPosition:n}}}let N=(()=>{class t{constructor(t,e){this.element=t,this.zone=e,this.scrolled=new g.EventEmitter,this.scrolledUp=new g.EventEmitter,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}ngAfterViewInit(){this.infiniteScrollDisabled||this.setup()}ngOnChanges({infiniteScrollContainer:t,infiniteScrollDisabled:e,infiniteScrollDistance:n}){const i=v(t),o=v(e),r=v(n),a=!o&&!this.infiniteScrollDisabled||o&&!e.currentValue||r;(i||o||r)&&(this.destroyScroller(),a&&this.setup())}setup(){"undefined"!=typeof window&&this.zone.runOutsideAngular(()=>{this.disposeScroller=function(t){const{scrollContainer:e,scrollWindow:n,element:i,fromRoot:o}=t,r=function({windowElement:t,axis:e}){return function(t,e){const n=t.isWindow||e&&!e.nativeElement?e:e.nativeElement;return Object.assign(Object.assign({},t),{container:n})}({axis:e,isWindow:T(t)},t)}({axis:new x(!t.horizontal),windowElement:S(e,n,i,o)}),a=new K({totalToScroll:I(i,r)}),c={up:t.upDistance,down:t.downDistance};return function(t){let e=Object(y.a)(t.container,"scroll");return t.throttle&&(e=e.pipe(Object(C.a)(t.throttle))),e}({container:r.container,throttle:t.throttle}).pipe(Object(b.a)(()=>Object(d.a)(I(i,r))),Object(l.a)(t=>function(t,e,n){const{scrollDown:i,fire:o}=function(t,e,n){const i=function(t,e){return t<e.scrolled}(t,e);return{fire:H(e,n,i),scrollDown:i}}(t,e,n);return{scrollDown:i,fire:o,stats:e}}(a.lastScrollPosition,t,c)),Object(O.a)(({stats:t})=>a.updateScroll(t.scrolled,t.totalToScroll)),Object(w.a)(({fire:e,scrollDown:n,stats:{totalToScroll:i}})=>function(t,e,n){return!(!t||!e)||!(n||!e)}(t.alwaysCallback,e,a.isTriggeredScroll(i,n))),Object(O.a)(({scrollDown:t,stats:{totalToScroll:e}})=>{a.updateTriggeredFlag(e,t)}),Object(l.a)(z))}({fromRoot:this.fromRoot,alwaysCallback:this.alwaysCallback,disable:this.infiniteScrollDisabled,downDistance:this.infiniteScrollDistance,element:this.element,horizontal:this.horizontal,scrollContainer:this.infiniteScrollContainer,scrollWindow:this.scrollWindow,throttle:this.infiniteScrollThrottle,upDistance:this.infiniteScrollUpDistance}).subscribe(t=>this.zone.run(()=>this.handleOnScroll(t)))})}handleOnScroll({type:t,payload:e}){switch(t){case W:return this.scrolled.emit(e);case F:return this.scrolledUp.emit(e);default:return}}ngOnDestroy(){this.destroyScroller()}destroyScroller(){this.disposeScroller&&this.disposeScroller.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(g["\u0275\u0275directiveInject"](g.ElementRef),g["\u0275\u0275directiveInject"](g.NgZone))},t.\u0275dir=g["\u0275\u0275defineDirective"]({type:t,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[g["\u0275\u0275NgOnChangesFeature"]]}),t})(),$=(()=>{class t{}return t.\u0275mod=g["\u0275\u0275defineNgModule"]({type:t}),t.\u0275inj=g["\u0275\u0275defineInjector"]({factory:function(e){return new(e||t)},providers:[],imports:[[]]}),t})();var R=n("tyNb"),U=n("u47x"),Y=n("kmnG"),A=n("qFsG"),G=n("s7LF");let B=(()=>{class t{constructor(){this.doSearch=new g.EventEmitter}ngOnInit(){}search(){this.doSearch.emit(this.searchTerm)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=g["\u0275\u0275defineComponent"]({type:t,selectors:[["app-meme-search-bar-component"]],inputs:{searchTerm:"searchTerm"},outputs:{doSearch:"doSearch"},decls:6,vars:2,consts:[["cdkTrapFocus","",1,"search-bar",3,"cdkTrapFocusAutoCapture"],["appearance","fill"],["id","search","cdkFocusInitial","","matInput","","type","text","placeholder","Meme Search",3,"ngModel","ngModelChange","keydown.enter"],["searchInput",""]],template:function(t,e){1&t&&(g["\u0275\u0275elementStart"](0,"div",0),g["\u0275\u0275elementStart"](1,"mat-form-field",1),g["\u0275\u0275elementStart"](2,"mat-label"),g["\u0275\u0275text"](3,"Enter search term"),g["\u0275\u0275elementEnd"](),g["\u0275\u0275elementStart"](4,"input",2,3),g["\u0275\u0275listener"]("ngModelChange",function(t){return e.searchTerm=t})("keydown.enter",function(){return e.search()}),g["\u0275\u0275elementEnd"](),g["\u0275\u0275elementEnd"](),g["\u0275\u0275elementEnd"]()),2&t&&(g["\u0275\u0275property"]("cdkTrapFocusAutoCapture",!0),g["\u0275\u0275advance"](4),g["\u0275\u0275property"]("ngModel",e.searchTerm))},directives:[U.f,Y.d,Y.g,A.b,G.c,G.l,G.o],styles:[".search-bar[_ngcontent-%COMP%]{margin:64px auto auto;width:100%;display:flex;flex-wrap:wrap;padding-top:.5rem;align-items:center;flex-direction:row;justify-content:center}.search-bar[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{cursor:pointer;float:right;position:relative;color:#4f4f4f;font-size:32px}.search-bar[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:90%;padding-left:.5rem}@media screen and (min-width:900px){.search-bar[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:50%;max-width:700px}}"]}),t})();var L=n("9A8T");let X=(()=>{class t{constructor(t){this.store=t}ngOnInit(){this.searchTerm=this.store.select(r.h)}doSearch(t){this.store.dispatch(m.b({search:t}))}}return t.\u0275fac=function(e){return new(e||t)(g["\u0275\u0275directiveInject"](o.i))},t.\u0275cmp=g["\u0275\u0275defineComponent"]({type:t,selectors:[["app-meme-search-bar-container"]],decls:2,vars:3,consts:[[3,"searchTerm","doSearch"]],template:function(t,e){1&t&&(g["\u0275\u0275elementStart"](0,"app-meme-search-bar-component",0),g["\u0275\u0275listener"]("doSearch",function(t){return e.doSearch(t)}),g["\u0275\u0275pipe"](1,"ngrxPush"),g["\u0275\u0275elementEnd"]()),2&t&&g["\u0275\u0275property"]("searchTerm",g["\u0275\u0275pipeBind1"](1,1,e.searchTerm))},directives:[B],pipes:[L.a],encapsulation:2}),t})();var V=n("f2/o"),q=n("UXJo"),J=n("dNgK");let Z=(()=>{class t{constructor(){this.defaultImage="assets/preloader.gif"}ngOnInit(){this.finalImage=this.defaultImage,this.targetSource&&(this.downloadingImage=new Image,this.downloadingImage.onload=()=>{this.finalImage=this.targetSource},this.downloadingImage.src=this.targetSource)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=g["\u0275\u0275defineDirective"]({type:t,selectors:[["","img-preloader",""]],hostVars:1,hostBindings:function(t,e){2&t&&g["\u0275\u0275attribute"]("src",e.finalImage,g["\u0275\u0275sanitizeUrlOrResourceUrl"])},inputs:{targetSource:["img-preloader","targetSource"],defaultImage:"defaultImage"}}),t})();var Q=n("NFeN"),tt=n("Xa2L");function et(t,e){if(1&t){const t=g["\u0275\u0275getCurrentView"]();g["\u0275\u0275elementStart"](0,"li",5),g["\u0275\u0275element"](1,"img",6,7),g["\u0275\u0275elementStart"](3,"div",8),g["\u0275\u0275elementStart"](4,"span",9),g["\u0275\u0275listener"]("click",function(){g["\u0275\u0275restoreView"](t);const n=e.$implicit;return g["\u0275\u0275nextContext"]().toggleFavorite(n)}),g["\u0275\u0275elementStart"](5,"mat-icon",10),g["\u0275\u0275text"](6),g["\u0275\u0275elementEnd"](),g["\u0275\u0275elementEnd"](),g["\u0275\u0275elementStart"](7,"span",9),g["\u0275\u0275listener"]("click",function(){g["\u0275\u0275restoreView"](t);const n=e.$implicit;return g["\u0275\u0275nextContext"]().copyToClipBoard(null==n?null:n.url)}),g["\u0275\u0275elementStart"](8,"mat-icon",10),g["\u0275\u0275text"](9," share "),g["\u0275\u0275elementEnd"](),g["\u0275\u0275elementEnd"](),g["\u0275\u0275elementEnd"](),g["\u0275\u0275elementEnd"]()}if(2&t){const t=e.$implicit,n=e.index,i=g["\u0275\u0275nextContext"]();g["\u0275\u0275advance"](1),g["\u0275\u0275propertyInterpolate1"]("id","image",n,""),g["\u0275\u0275property"]("img-preloader",null==t.images||null==t.images.fixed_width_downsampled?null:t.images.fixed_width_downsampled.url),g["\u0275\u0275advance"](4),g["\u0275\u0275classProp"]("selected",i.isInFavorites(t.id)),g["\u0275\u0275propertyInterpolate1"]("id","favorite",n,""),g["\u0275\u0275advance"](1),g["\u0275\u0275textInterpolate1"](" ",i.isInFavorites(t.id)?"favorite":"favorite_border"," "),g["\u0275\u0275advance"](2),g["\u0275\u0275propertyInterpolate1"]("id","share",n,"")}}function nt(t,e){1&t&&(g["\u0275\u0275elementStart"](0,"div",11),g["\u0275\u0275element"](1,"mat-spinner"),g["\u0275\u0275elementEnd"]())}function it(t,e){1&t&&(g["\u0275\u0275elementStart"](0,"h1",12),g["\u0275\u0275text"](1,"No Data Available"),g["\u0275\u0275elementEnd"]())}let ot=(()=>{class t{constructor(t,e){this._clipboard=t,this._snackBar=e,this.memes=[],this.favorites=[],this.favoriteClicked=new g.EventEmitter,this.fetchMore=new g.EventEmitter,this.loading=!0}ngOnInit(){}toggleFavorite(t){this.favoriteClicked.emit({meme:t,is_favorite:this.isInFavorites(t.id)})}scrolled(){this.fetchMore.emit()}isInFavorites(t){return this.favorites.includes(t)}copyToClipBoard(t){this._clipboard.copy(t),this._snackBar.open("Meme Copied!","Dismiss",{duration:2e3})}}return t.\u0275fac=function(e){return new(e||t)(g["\u0275\u0275directiveInject"](q.a),g["\u0275\u0275directiveInject"](J.a))},t.\u0275cmp=g["\u0275\u0275defineComponent"]({type:t,selectors:[["app-meme-display"]],inputs:{memes:"memes",favorites:"favorites",loading:"loading"},outputs:{favoriteClicked:"favoriteClicked",fetchMore:"fetchMore"},decls:5,vars:6,consts:[["infiniteScroll","",1,"frame",3,"infiniteScrollDistance","infiniteScrollThrottle","scrollWindow","scrolled"],[1,"mdc-image-list","mdc-image-list--masonry","mdc-image-list--with-text-protection","my-image-list"],["class","mdc-image-list__item",4,"ngFor","ngForOf"],["class","loading-spinner",4,"ngIf"],["class","no-data-available",4,"ngIf"],[1,"mdc-image-list__item"],[1,"mdc-image-list__image","cover",3,"id","img-preloader"],["memeImage",""],[1,"mdc-image-list__supporting"],[1,"mdc-image-list__label",3,"click"],[3,"id"],[1,"loading-spinner"],[1,"no-data-available"]],template:function(t,e){1&t&&(g["\u0275\u0275elementStart"](0,"div",0),g["\u0275\u0275listener"]("scrolled",function(){return e.scrolled()}),g["\u0275\u0275elementStart"](1,"ul",1),g["\u0275\u0275template"](2,et,10,7,"li",2),g["\u0275\u0275elementEnd"](),g["\u0275\u0275template"](3,nt,2,0,"div",3),g["\u0275\u0275template"](4,it,2,0,"h1",4),g["\u0275\u0275elementEnd"]()),2&t&&(g["\u0275\u0275property"]("infiniteScrollDistance",2)("infiniteScrollThrottle",200)("scrollWindow",!1),g["\u0275\u0275advance"](2),g["\u0275\u0275property"]("ngForOf",e.memes),g["\u0275\u0275advance"](1),g["\u0275\u0275property"]("ngIf",e.loading),g["\u0275\u0275advance"](1),g["\u0275\u0275property"]("ngIf",!e.loading&&0==e.memes.length))},directives:[N,i.m,i.n,Z,Q.a,tt.b],styles:['.mdc-image-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;margin:0 auto;padding:0}.mdc-image-list__image-aspect-container[_ngcontent-%COMP%], .mdc-image-list__item[_ngcontent-%COMP%]{position:relative;box-sizing:border-box}.mdc-image-list__item[_ngcontent-%COMP%]{list-style-type:none}.mdc-image-list__image[_ngcontent-%COMP%]{width:100%}.mdc-image-list__image-aspect-container[_ngcontent-%COMP%]   .mdc-image-list__image[_ngcontent-%COMP%]{position:absolute;top:0;right:0;bottom:0;left:0;height:100%;background-repeat:no-repeat;background-position:50%;background-size:cover}.mdc-image-list__image-aspect-container[_ngcontent-%COMP%]{padding-bottom:calc(100% / 1)}.mdc-image-list__image[_ngcontent-%COMP%]{border-radius:0}.mdc-image-list--with-text-protection[_ngcontent-%COMP%]   .mdc-image-list__supporting[_ngcontent-%COMP%]{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-image-list__supporting[_ngcontent-%COMP%]{color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background,rgba(0,0,0,.87));display:flex;align-items:center;justify-content:space-between;box-sizing:border-box;padding:8px 0;line-height:24px}.mdc-image-list__label[_ngcontent-%COMP%]{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto,sans-serif;font-family:var(--mdc-typography-subtitle1-font-family,var(--mdc-typography-font-family,Roboto,sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size,1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height,1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight,400);letter-spacing:.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing,.009375em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle1-text-decoration,inherit);text-decoration:var(--mdc-typography-subtitle1-text-decoration,inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform,inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-image-list--with-text-protection[_ngcontent-%COMP%]   .mdc-image-list__supporting[_ngcontent-%COMP%]{position:absolute;bottom:0;width:100%;height:48px;padding:0 16px;background:rgba(0,0,0,.6);color:#fff}.mdc-image-list--masonry[_ngcontent-%COMP%]{display:block}.mdc-image-list--masonry[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]{break-inside:avoid-column}.mdc-image-list--masonry[_ngcontent-%COMP%]   .mdc-image-list__image[_ngcontent-%COMP%]{display:block;height:auto}.frame[_ngcontent-%COMP%]{height:86%;width:100%;z-index:100;top:0;margin-top:10px;background-color:#fff;overflow-y:scroll;overflow-x:hidden;position:relative}.frame[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]{width:100%;height:3rem}.frame[_ngcontent-%COMP%]   .loading-spinner[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%]{margin:0 auto}.frame[_ngcontent-%COMP%]   .no-data-available[_ngcontent-%COMP%]{text-align:center;opacity:.5}.my-image-list[_ngcontent-%COMP%]{justify-content:center;column-count:6;column-gap:2px}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]{margin-bottom:2px}@media (max-width:1400px){.my-image-list[_ngcontent-%COMP%]{column-count:5;column-gap:2px}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]{margin-bottom:2px}}@media (max-width:1020px){.my-image-list[_ngcontent-%COMP%]{column-count:4;column-gap:2px}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]{margin-bottom:2px}}@media (max-width:960px){.my-image-list[_ngcontent-%COMP%]{column-count:3;column-gap:2px}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]{margin-bottom:2px}}@media (max-width:768px){.my-image-list[_ngcontent-%COMP%]{column-count:2;column-gap:2px}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]{margin-bottom:2px}}@media (max-width:480px){.my-image-list[_ngcontent-%COMP%]{column-count:1;column-gap:2px}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]{margin-bottom:2px}}.my-image-list__item[_ngcontent-%COMP%]{background-color:#ccc}.my-image-list[_ngcontent-%COMP%]   img[src="assets/preloader.gif"][_ngcontent-%COMP%]{display:none}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]{overflow:hidden;box-shadow:2px 2px 2px rgba(204,198,198,.5)}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;max-width:100%}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__item[_ngcontent-%COMP%]   img.cover[_ngcontent-%COMP%]{object-fit:fill}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__supporting[_ngcontent-%COMP%]{justify-content:start;-webkit-user-select:none;user-select:none}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__supporting[_ngcontent-%COMP%]   .mdc-image-list__label[_ngcontent-%COMP%]{padding-right:1rem}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__supporting[_ngcontent-%COMP%]   .mdc-image-list__label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{vertical-align:middle}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__supporting[_ngcontent-%COMP%]   .mdc-image-list__label[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]:hover{cursor:pointer}.my-image-list[_ngcontent-%COMP%]   .mdc-image-list__supporting[_ngcontent-%COMP%]   .mdc-image-list__label[_ngcontent-%COMP%]   mat-icon.selected[_ngcontent-%COMP%]{color:#8b0000}']}),t})(),rt=(()=>{class t{constructor(t){this.store=t}ngOnInit(){this.$memeData=this.store.select(r.d),this.$favorites=this.store.select(r.e),this.$loading=this.store.select(r.g)}favoriteClicked(t){this.store.dispatch(t.is_favorite?V.b({id:t.meme.id}):V.a({data:t.meme}))}fetchMore(){this.store.dispatch(m.c({isScroll:!0}))}}return t.\u0275fac=function(e){return new(e||t)(g["\u0275\u0275directiveInject"](o.i))},t.\u0275cmp=g["\u0275\u0275defineComponent"]({type:t,selectors:[["app-meme-display-container"]],decls:4,vars:9,consts:[[3,"memes","favorites","loading","favoriteClicked","fetchMore"]],template:function(t,e){1&t&&(g["\u0275\u0275elementStart"](0,"app-meme-display",0),g["\u0275\u0275listener"]("favoriteClicked",function(t){return e.favoriteClicked(t)})("fetchMore",function(){return e.fetchMore()}),g["\u0275\u0275pipe"](1,"ngrxPush"),g["\u0275\u0275pipe"](2,"ngrxPush"),g["\u0275\u0275pipe"](3,"ngrxPush"),g["\u0275\u0275elementEnd"]()),2&t&&g["\u0275\u0275property"]("memes",g["\u0275\u0275pipeBind1"](1,3,e.$memeData))("favorites",g["\u0275\u0275pipeBind1"](2,5,e.$favorites))("loading",g["\u0275\u0275pipeBind1"](3,7,e.$loading))},directives:[ot],pipes:[L.a],encapsulation:2}),t})();const at=[{path:"",component:(()=>{class t{constructor(t){this.store=t}ngOnInit(){this.store.dispatch(m.c({isScroll:!1}))}}return t.\u0275fac=function(e){return new(e||t)(g["\u0275\u0275directiveInject"](o.i))},t.\u0275cmp=g["\u0275\u0275defineComponent"]({type:t,selectors:[["app-meme"]],decls:2,vars:0,template:function(t,e){1&t&&(g["\u0275\u0275element"](0,"app-meme-search-bar-container"),g["\u0275\u0275element"](1,"app-meme-display-container"))},directives:[X,rt],styles:["@media screen and (min-width:900px){.meme-container[_ngcontent-%COMP%]{margin-top:64px}}"]}),t})()}];let ct=(()=>{class t{}return t.\u0275mod=g["\u0275\u0275defineNgModule"]({type:t}),t.\u0275inj=g["\u0275\u0275defineInjector"]({factory:function(e){return new(e||t)},imports:[[R.j.forChild(at)],R.j]}),t})(),lt=(()=>{class t{}return t.\u0275mod=g["\u0275\u0275defineNgModule"]({type:t}),t.\u0275inj=g["\u0275\u0275defineInjector"]({factory:function(e){return new(e||t)},imports:[[i.c,ct,o.k.forFeature(r.a,r.b),a.b.forFeature([u]),_.a,$]]}),t})()}}]);