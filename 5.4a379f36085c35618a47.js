(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{QCTL:function(t,e,n){"use strict";n.r(e),n.d(e,"InstrumentationModule",function(){return lt});var i=n("ofXK"),a=n("tyNb"),s=n("fXoL"),r=n("tqRt");const c=Object(r.p)("[INSTRUMENTATION] Start"),o=Object(r.p)("[INSTRUMENTATION] Start Finished"),h=Object(r.p)("[INSTRUMENTATION] Stop"),u=Object(r.p)("[INSTRUMENTATION] Stop Finished"),l=Object(r.p)("[INSTRUMENTATION] Wind update",Object(r.v)()),d=Object(r.p)("[INSTRUMENTATION] Speed update",Object(r.v)()),b=Object(r.p)("[INSTRUMENTATION] Fuel update",Object(r.v)()),g=Object(r.p)("[INSTRUMENTATION] Temperature update",Object(r.v)()),p=Object(r.p)("[INSTRUMENTATION] RPM update",Object(r.v)()),m={started:!1,fuel:0,speed:0,wind:0,temperature:0,rpm:0},_=Object(r.r)(m,Object(r.u)(o,t=>Object.assign(Object.assign({},t),{started:!0})),Object(r.u)(u,t=>Object.assign(Object.assign({},t),{started:!1,fuel:m.fuel,speed:m.speed,wind:m.wind,temperature:m.temperature,rpm:m.rpm})),Object(r.u)(b,(t,e)=>Object.assign(Object.assign({},t),{fuel:e.val})),Object(r.u)(p,(t,e)=>Object.assign(Object.assign({},t),{rpm:e.val})),Object(r.u)(d,(t,e)=>Object.assign(Object.assign({},t),{speed:e.val})),Object(r.u)(g,(t,e)=>Object.assign(Object.assign({},t),{temperature:e.val})),Object(r.u)(l,(t,e)=>Object.assign(Object.assign({},t),{wind:e.val}))),f="instrument";function O(t,e){return Object(r.n)({instruments:_})(t,e)}const C=Object(r.q)(f),v=Object(r.s)(C,t=>t.instruments),x=Object(r.s)(v,t=>t.started),w=Object(r.s)(v,t=>t.fuel),S=Object(r.s)(v,t=>t.wind),y=Object(r.s)(v,t=>t.rpm),M=Object(r.s)(v,t=>t.speed),P=Object(r.s)(v,t=>t.temperature);var j=n("PDjf");const R=["canvas"],T=["rLabel"],I=["reading"];function N(t,e){1&t&&s.fc(0,0,["*ngSwitchCase","true"])}function k(t,e){if(1&t&&(s.Qb(0),s.uc(1),s.Pb()),2&t){const t=s.cc();s.Cb(1),s.vc(t.prepend)}}function G(t,e){1&t&&s.fc(0,1,["*ngSwitchCase","true"])}function z(t,e){if(1&t&&(s.Qb(0),s.uc(1),s.dc(2,"number"),s.Pb()),2&t){const t=s.cc();s.Cb(1),s.vc(s.ec(2,1,t.value))}}function A(t,e){1&t&&s.fc(0,2,["*ngSwitchCase","true"])}function D(t,e){if(1&t&&(s.Qb(0),s.uc(1),s.Pb()),2&t){const t=s.cc();s.Cb(1),s.vc(t.append)}}function W(t,e){1&t&&s.fc(0,3,["*ngSwitchCase","true"])}function $(t,e){if(1&t&&(s.Qb(0),s.uc(1),s.Pb()),2&t){const t=s.cc();s.Cb(1),s.vc(t.label)}}const q=[[["ngx-gauge-prepend"]],[["ngx-gauge-value"]],[["ngx-gauge-append"]],[["ngx-gauge-label"]]],F=["ngx-gauge-prepend","ngx-gauge-value","ngx-gauge-append","ngx-gauge-label"];function L(t,e=0){return isNaN(parseFloat(t))||isNaN(Number(t))?e:Number(t)}function E(t){return`${t}px`}let H=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=s.Ib({type:t,selectors:[["ngx-gauge-append"]],exportAs:["ngxGaugeAppend"]}),t})(),Q=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=s.Ib({type:t,selectors:[["ngx-gauge-prepend"]],exportAs:["ngxGaugePrepend"]}),t})(),U=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=s.Ib({type:t,selectors:[["ngx-gauge-value"]],exportAs:["ngxGaugeValue"]}),t})(),B=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=s.Ib({type:t,selectors:[["ngx-gauge-label"]],exportAs:["ngxGaugeLabel"]}),t})(),V=(()=>{class t{constructor(t,e){this._elementRef=t,this._renderer=e,this._size=200,this._min=0,this._max=100,this._animate=!0,this._initialized=!1,this._animationRequestID=0,this.ariaLabel="",this.ariaLabelledby=null,this.type="arch",this.cap="butt",this.thick=4,this.foregroundColor="rgba(0, 150, 136, 1)",this.backgroundColor="rgba(0, 0, 0, 0.1)",this.thresholds=Object.create(null),this._value=0,this.duration=1200}get size(){return this._size}set size(t){this._size=L(t)}get min(){return this._min}set min(t){this._min=L(t,0)}get animate(){return this._animate}set animate(t){this._animate=function(t){return null!=t&&"false"!=`${t}`}(t)}get max(){return this._max}set max(t){this._max=L(t,100)}get value(){return this._value}set value(t){this._value=L(t)}ngOnChanges(t){const e=t.thick||t.type||t.cap||t.size;if(this._initialized){if(t.value||t.min||t.max){let e,n;t.value&&(e=t.value.currentValue,n=t.value.previousValue),this._update(e,n)}e&&(this._destroy(),this._init())}}_updateSize(){this._renderer.setStyle(this._elementRef.nativeElement,"width",E(this._getWidth())),this._renderer.setStyle(this._elementRef.nativeElement,"height",E(this._getCanvasHeight())),this._canvas.nativeElement.width=this._getWidth(),this._canvas.nativeElement.height=this._getCanvasHeight(),this._renderer.setStyle(this._label.nativeElement,"transform","translateY("+(this.size/3*2-this.size/13/4)+"px)"),this._renderer.setStyle(this._reading.nativeElement,"transform","translateY("+(this.size/2-.22*this.size/2)+"px)")}ngAfterViewInit(){this._canvas&&this._init()}ngOnDestroy(){this._destroy()}_getBounds(t){let e,n;return"semi"==t?(e=Math.PI,n=2*Math.PI):"full"==t?(e=1.5*Math.PI,n=3.5*Math.PI):"arch"===t&&(e=.8*Math.PI,n=2.2*Math.PI),{head:e,tail:n}}_drawShell(t,e,n,i){let a=this._getCenter(),s=this._getRadius();e=Math.max(e,t),e=Math.min(e,n),this._initialized&&(this._clear(),this._context.beginPath(),this._context.strokeStyle=this.backgroundColor,this._context.arc(a.x,a.y,s,e,n,!1),this._context.stroke(),this._context.beginPath(),this._context.strokeStyle=i,this._context.arc(a.x,a.y,s,t,e,!1),this._context.stroke())}_clear(){this._context.clearRect(0,0,this._getWidth(),this._getHeight())}_getWidth(){return this.size}_getHeight(){return this.size}_getCanvasHeight(){return"arch"==this.type||"semi"==this.type?.85*this._getHeight():this._getHeight()}_getRadius(){return this._getCenter().x-this.thick}_getCenter(){return{x:this._getWidth()/2,y:this._getHeight()/2}}_init(){this._context=this._canvas.nativeElement.getContext("2d"),this._initialized=!0,this._updateSize(),this._setupStyles(),this._create()}_destroy(){this._animationRequestID&&(window.cancelAnimationFrame(this._animationRequestID),this._animationRequestID=0),this._clear(),this._context=null,this._initialized=!1}_setupStyles(){this._context.lineCap=this.cap,this._context.lineWidth=this.thick}_getForegroundColorByRange(t){const e=Object.keys(this.thresholds).filter(function(e){return function(t){return null!=t&&!isNaN(parseFloat(t))&&!isNaN(Number(t))}(e)&&Number(e)<=t}).sort((t,e)=>Number(t)-Number(e)).reverse()[0];return void 0!==e&&this.thresholds[e].color||this.foregroundColor}_create(t,e){let n,i=this,a=this._getBounds(this.type),s=this.duration,r=this.min,c=this.max,o=function(t,e,n){return Math.max(e,Math.min(n,t))}(this.value,this.min,this.max),h=a.head,u=(a.tail-a.head)/(c-r),l=u*(o-r),d=a.tail,b=this._getForegroundColorByRange(o);function g(t){let a=(t=t||(new Date).getTime())-n,c=Math.min(a/s,1);i._drawShell(h,h+(e?(e-r)*u:0)+l*c,d,b),i._animationRequestID&&a<s?i._animationRequestID=window.requestAnimationFrame(t=>g(t)):window.cancelAnimationFrame(i._animationRequestID)}i._animationRequestID&&window.cancelAnimationFrame(i._animationRequestID),this._animate?(null!=t&&null!=e&&(l=u*t-u*e),i._animationRequestID=window.requestAnimationFrame(t=>{n=t||(new Date).getTime(),g(n)})):i._drawShell(h,h+l,d,b)}_update(t,e){this._clear(),this._create(t,e)}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(s.l),s.Nb(s.F))},t.\u0275cmp=s.Hb({type:t,selectors:[["ngx-gauge"]],contentQueries:function(t,e,n){if(1&t&&(s.Gb(n,B,1),s.Gb(n,Q,1),s.Gb(n,H,1),s.Gb(n,U,1)),2&t){let t;s.kc(t=s.ac())&&(e._labelChild=t.first),s.kc(t=s.ac())&&(e._prependChild=t.first),s.kc(t=s.ac())&&(e._appendChild=t.first),s.kc(t=s.ac())&&(e._valueDisplayChild=t.first)}},viewQuery:function(t,e){if(1&t&&(s.xc(R,3),s.xc(T,3),s.xc(I,3)),2&t){let t;s.kc(t=s.ac())&&(e._canvas=t.first),s.kc(t=s.ac())&&(e._label=t.first),s.kc(t=s.ac())&&(e._reading=t.first)}},hostAttrs:["role","slider","aria-readonly","true"],hostVars:7,hostBindings:function(t,e){2&t&&(s.Db("aria-valuemin",e.min)("aria-valuemax",e.max)("aria-valuenow",e.value)("aria-label",e.ariaLabel)("aria-labelledby",e.ariaLabelledby),s.Fb("ngx-gauge-meter",!0))},inputs:{ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],type:"type",cap:"cap",thick:"thick",foregroundColor:"foregroundColor",backgroundColor:"backgroundColor",thresholds:"thresholds",duration:"duration",size:"size",min:"min",animate:"animate",max:"max",value:"value",label:"label",append:"append",prepend:"prepend"},features:[s.Ab],ngContentSelectors:F,decls:17,vars:16,consts:[[1,"reading-block"],["reading",""],[1,"reading-affix",3,"ngSwitch"],[4,"ngSwitchCase"],[3,"ngSwitch"],[1,"reading-label",3,"ngSwitch"],["rLabel",""],["canvas",""]],template:function(t,e){1&t&&(s.gc(q),s.Sb(0,"div",0,1),s.Sb(2,"u",2),s.tc(3,N,1,0,"ng-content",3),s.tc(4,k,2,1,"ng-container",3),s.Rb(),s.Qb(5,4),s.tc(6,G,1,0,"ng-content",3),s.tc(7,z,3,3,"ng-container",3),s.Pb(),s.Sb(8,"u",2),s.tc(9,A,1,0,"ng-content",3),s.tc(10,D,2,1,"ng-container",3),s.Rb(),s.Rb(),s.Sb(11,"div",5,6),s.tc(13,W,1,0,"ng-content",3),s.tc(14,$,2,1,"ng-container",3),s.Rb(),s.Ob(15,"canvas",null,7)),2&t&&(s.qc("font-size",.22*e.size+"px"),s.Cb(2),s.hc("ngSwitch",null!=e._prependChild),s.Cb(1),s.hc("ngSwitchCase",!0),s.Cb(1),s.hc("ngSwitchCase",!1),s.Cb(1),s.hc("ngSwitch",null!=e._valueDisplayChild),s.Cb(1),s.hc("ngSwitchCase",!0),s.Cb(1),s.hc("ngSwitchCase",!1),s.Cb(1),s.hc("ngSwitch",null!=e._appendChild),s.Cb(1),s.hc("ngSwitchCase",!0),s.Cb(1),s.hc("ngSwitchCase",!1),s.Cb(1),s.qc("font-size",e.size/13+"px"),s.hc("ngSwitch",null!=e._labelChild),s.Cb(2),s.hc("ngSwitchCase",!0),s.Cb(1),s.hc("ngSwitchCase",!1))},directives:[i.m,i.n],pipes:[i.d],styles:[".ngx-gauge-meter{display:inline-block;text-align:center;position:relative}.reading-block,.reading-label{position:absolute;width:100%;font-weight:400;white-space:nowrap;text-align:center;overflow:hidden;text-overflow:ellipsis}.reading-label{font-family:inherit;display:inline-block}.reading-affix{text-decoration:none;font-size:.6em;opacity:.8;font-weight:200;padding:0 .18em}.reading-affix:first-child{padding-left:0}.reading-affix:last-child{padding-right:0}"],encapsulation:2}),t})(),K=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[i.b]]}),t})(),J=(()=>{class t{constructor(){this.title="",this.min=0,this.max=0,this.label="",this.value=0,this.unit="",this.threshold={},this.type="arch",this.cap="round",this.thick=9,this.backgroundColor="white"}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Hb({type:t,selectors:[["app-gauge"]],inputs:{title:"title",min:"min",max:"max",label:"label",value:"value",unit:"unit",threshold:"threshold",type:"type"},decls:2,vars:10,consts:[[1,"gauge-container"],[3,"min","max","value","label","append","thresholds","type","thick","cap","backgroundColor"]],template:function(t,e){1&t&&(s.Sb(0,"div",0),s.Ob(1,"ngx-gauge",1),s.Rb()),2&t&&(s.Cb(1),s.hc("min",e.min)("max",e.max)("value",e.value)("label",e.label)("append",e.unit)("thresholds",e.threshold)("type",e.type)("thick",e.thick)("cap",e.cap)("backgroundColor",e.backgroundColor))},directives:[V],styles:[""]}),t})();var X=n("Dxy4"),Y=n("9A8T");let Z=(()=>{class t{constructor(t){this.store=t,this.gasThresholds={0:{color:"red"},2.5:{color:"gold"},4:{color:"forestgreen"}},this.RPMThresholds={0:{color:"forestgreen"},5e3:{color:"gold"},5500:{color:"red"}}}ngOnDestroy(){this.stop()}ngOnInit(){this.fuel$=this.store.select(w),this.wind$=this.store.select(S),this.temp$=this.store.select(P),this.speed$=this.store.select(M),this.rpm$=this.store.select(y),this.started$=this.store.select(x)}start(){this.store.dispatch(c())}stop(){this.store.dispatch(h())}}return t.\u0275fac=function(e){return new(e||t)(s.Nb(r.i))},t.\u0275cmp=s.Hb({type:t,selectors:[["app-panel-container"]],decls:28,vars:33,consts:[["id","speedGauge","title","Speed","unit","MPH","label","Speed",3,"min","max","value"],["id","rpmGauge","title","RPM","unit","","label","RPM",3,"min","max","value","threshold"],["id","gasGauge","title","Gas","unit","gallons","label","Gas","type","semi",3,"min","max","value","threshold"],["id","windGauge","title","Wind","unit","MPH","label","Wind",3,"min","max","value"],["id","tempGauge","title","Temp","unit","F","label","Temperature",3,"min","max","value"],[1,"button-container"],[1,"inner-container"],["id","startButton","mat-raised-button","","color","primary",3,"disabled","click"],["id","stopButton","mat-raised-button","","color","warn",3,"disabled","click"]],template:function(t,e){1&t&&(s.Sb(0,"mat-card"),s.Sb(1,"mat-card-header"),s.Sb(2,"mat-card-title"),s.uc(3,"Current Vehicle Readings"),s.Rb(),s.Rb(),s.Sb(4,"mat-card-content"),s.Ob(5,"app-gauge",0),s.dc(6,"ngrxPush"),s.Ob(7,"app-gauge",1),s.dc(8,"ngrxPush"),s.Ob(9,"app-gauge",2),s.dc(10,"ngrxPush"),s.Rb(),s.Rb(),s.Sb(11,"mat-card"),s.Sb(12,"mat-card-header"),s.Sb(13,"mat-card-title"),s.uc(14,"Environmental Factors"),s.Rb(),s.Rb(),s.Sb(15,"mat-card-content"),s.Ob(16,"app-gauge",3),s.dc(17,"ngrxPush"),s.Ob(18,"app-gauge",4),s.dc(19,"ngrxPush"),s.Rb(),s.Rb(),s.Sb(20,"div",5),s.Sb(21,"div",6),s.Sb(22,"button",7),s.Zb("click",function(){return e.start()}),s.dc(23,"ngrxPush"),s.uc(24,"Start"),s.Rb(),s.Sb(25,"button",8),s.Zb("click",function(){return e.stop()}),s.dc(26,"ngrxPush"),s.uc(27,"Stop"),s.Rb(),s.Rb(),s.Rb()),2&t&&(s.Cb(5),s.hc("min",0)("max",120)("value",s.ec(6,19,e.speed$)),s.Cb(2),s.hc("min",0)("max",6e3)("value",s.ec(8,21,e.rpm$))("threshold",e.RPMThresholds),s.Cb(2),s.hc("min",0)("max",10)("value",s.ec(10,23,e.fuel$))("threshold",e.gasThresholds),s.Cb(7),s.hc("min",0)("max",60)("value",s.ec(17,25,e.wind$)),s.Cb(2),s.hc("min",0)("max",120)("value",s.ec(19,27,e.temp$)),s.Cb(4),s.hc("disabled",s.ec(23,29,e.started$)),s.Cb(3),s.hc("disabled",!s.ec(26,31,e.started$)))},directives:[j.a,j.c,j.e,j.b,J,X.a],pipes:[Y.a],styles:[".button-container[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]{background-color:#a9a9a9;width:80%;margin:1rem}.button-container[_ngcontent-%COMP%]   .inner-container[_ngcontent-%COMP%], .button-container[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   .inner-container[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-wrap:wrap;justify-content:space-evenly;align-content:center}.button-container[_ngcontent-%COMP%]   app-gauge[_ngcontent-%COMP%], .button-container[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   app-gauge[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin:1rem}.rest[_ngcontent-%COMP%]{flex:1 1 auto}@media screen and (min-width:800px){.button-container[_ngcontent-%COMP%]   .inner-container[_ngcontent-%COMP%], .button-container[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   .inner-container[_ngcontent-%COMP%], mat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{flex-direction:row}app-gauge[_ngcontent-%COMP%], button[_ngcontent-%COMP%]{margin:0}}"]}),t})();const tt=[{path:"",component:(()=>{class t{constructor(){}ngOnDestroy(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Hb({type:t,selectors:[["app-instrumentation"]],decls:1,vars:0,template:function(t,e){1&t&&s.Ob(0,"app-panel-container")},directives:[Z],styles:["app-panel-container[_ngcontent-%COMP%]{flex-direction:column;justify-content:flex-start;background:#0b2c35;color:#fff;position:relative;flex:1}[_nghost-%COMP%], app-panel-container[_ngcontent-%COMP%]{display:flex;align-items:center;width:100%}[_nghost-%COMP%]{justify-content:stretch;flex-direction:column;min-height:100%}"]}),t})()}];let et=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[a.i.forChild(tt)],a.i]}),t})();var nt=n("pKmL"),it=n("7bNT"),at=n("LRne"),st=n("XqQ8"),rt=n("XNiG"),ct=n("PqYM"),ot=n("1G5W");let ht=(()=>{class t{constructor(t){this.store=t,this.currentSpeed=0,this.currentGas=0,this.currentWind=0,this.currentRPM=0,this.currentTemp=0,this.stop=new rt.a}startCollection(){this.currentGas=4.2,this.currentSpeed=67,this.currentWind=5.5,this.currentRPM=4500,this.currentTemp=76,Object(ct.a)(0,500).pipe(Object(ot.a)(this.stop)).subscribe(()=>{let t=this.randomInRange(-3,3);this.currentSpeed+=this.currentSpeed+t>0&&this.currentSpeed+t<100?t:0,this.currentSpeed=this.currentGas<=0?0:this.currentSpeed,this.store.dispatch(d({val:this.roundToTenth(this.currentSpeed)}))}),Object(ct.a)(0,2e3).pipe(Object(ot.a)(this.stop)).subscribe(()=>{this.currentGas+=this.currentGas+-.1>0?-.1:-1*this.currentGas,this.store.dispatch(b({val:this.roundToTenth(this.currentGas)}))}),Object(ct.a)(0,200).pipe(Object(ot.a)(this.stop)).subscribe(()=>{let t=this.randomInRange(-100,105);this.currentRPM+=this.currentRPM+t>0&&this.currentRPM+t<6e3?t:0,this.currentRPM=this.currentGas<=0?0:this.currentRPM,this.store.dispatch(p({val:Math.trunc(this.currentRPM)}))}),Object(ct.a)(0,1e3).pipe(Object(ot.a)(this.stop)).subscribe(()=>{let t=this.randomInRange(-1,1);this.currentWind+=this.currentWind+t>3&&this.currentWind+t<7?t:0,this.store.dispatch(l({val:this.roundToTenth(this.currentWind)}))}),Object(ct.a)(0,1e4).pipe(Object(ot.a)(this.stop)).subscribe(()=>{let t=this.randomInRange(-1,1);this.currentTemp+=this.currentTemp+t>74&&this.currentTemp+t<80?t:0,this.store.dispatch(g({val:this.roundToTenth(this.currentTemp)}))})}stopCollection(){this.currentGas=0,this.currentSpeed=0,this.currentWind=0,this.currentRPM=0,this.currentTemp=0,this.stop.next()}randomInRange(t,e){return Math.random()*(e-t)+t}getCurrentValues(){return{gas:this.roundToTenth(this.currentGas),wind:this.roundToTenth(this.currentWind),temp:this.roundToTenth(this.currentTemp),mph:this.roundToTenth(this.currentSpeed),rpm:Math.trunc(this.currentRPM)}}ngOnInit(){}ngOnDestroy(){null==this||this.stop.next()}roundToTenth(t){return Math.round(10*t)/10}}return t.\u0275fac=function(e){return new(e||t)(s.Wb(r.i))},t.\u0275prov=s.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),ut=(()=>{class t{constructor(t,e){this.actions$=t,this.instrumentService=e,this.startInstruments$=Object(it.d)(()=>this.actions$.pipe(Object(it.e)(c),Object(st.a)(()=>(this.instrumentService.startCollection(),Object(at.a)(o()))))),this.stopInstruments$=Object(it.d)(()=>this.actions$.pipe(Object(it.e)(h),Object(st.a)(t=>(this.instrumentService.stopCollection(),Object(at.a)(u())))))}}return t.\u0275fac=function(e){return new(e||t)(s.Wb(it.a),s.Wb(ht))},t.\u0275prov=s.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),lt=(()=>{class t{}return t.\u0275mod=s.Lb({type:t}),t.\u0275inj=s.Kb({factory:function(e){return new(e||t)},imports:[[i.b,et,r.k.forFeature(f,O),it.b.forFeature([ut]),nt.a,K]]}),t})()}}]);