(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{BjfT:function(t,e,a){"use strict";a.r(e),a.d(e,"ChartingModule",function(){return R});var r=a("ofXK"),n=a("LPYB"),s=a("tyNb"),i=a("YY+H"),o=a("zQFV"),c=a("lJxs"),h=a("IzEk"),l=a("fXoL"),d=a("tqRt");let b=(()=>{class t{constructor(t,e){this.router=t,this.store=e}canActivate(t,e){return this.store.select(i.e).pipe(Object(c.a)(t=>!!t||(this.store.dispatch(o.g()),!1)),Object(h.a)(1))}canActivateChild(t,e){return this.canActivate(t,e)}}return t.\u0275fac=function(e){return new(e||t)(l.Yb(s.f),l.Yb(d.i))},t.\u0275prov=l.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var g=a("Q71d"),p=a("VzMc"),u=a("3Huf"),C=a("+sQQ"),f=a("Q2Ze"),m=a("e6WT"),v=a("TN/R"),x=a("ZTz/"),D=a("HeVh"),y=a("pu8Q");const P=["myChart"];function k(t,e){1&t&&(l.Ub(0,"div",3),l.Ub(1,"div",4),l.Pb(2,"mat-spinner"),l.Tb(),l.Tb())}let O=(()=>{class t{constructor(t,e){this.changeDetectorRef=t,this.media=e,this.chartTitle="",this.lineChartData=[{data:[],label:"Infections"}],this.yAxes=!0,this.lineChartOptions={responsive:!0,ticks:{min:0},title:{display:!1,text:""},scales:{xAxes:[{type:"time",gridLines:{display:!0},time:{minUnit:"month"}}],yAxes:[{type:"linear",id:"left-axis",display:this.yAxes,position:"left"},{type:"linear",id:"right-axis",display:this.yAxes,position:"right",stacked:!1,gridLines:{drawOnChartArea:!1},ticks:{min:0}}]},elements:{point:{radius:1,hitRadius:4}}},this.lineChartLegend=!0,this.lineChartPlugins=[],this.lineChartType="line",this.changeEventListener=(function(t){this.yAxes=!t.matches,this.updateChart(!t.matches)}).bind(this)}ngOnDestroy(){this.mobileQuery.removeEventListener("change",this.changeEventListener)}ngOnInit(){var t;this.lineChartData=this.chartdata,this.lineChartOptions.title.text=this.chartTitle,this.mobileQuery=this.media.matchMedia("(max-width: 600px)"),this.mobileQuery.addEventListener("change",this.changeEventListener),this.yAxes=!(null===(t=this.mobileQuery)||void 0===t?void 0:t.matches)}updateChart(t){this.myChart&&(this.myChart.chart.options.scales.yAxes[0].display=t,this.myChart.chart.options.scales.yAxes[1].display=t)}ngAfterViewInit(){this.updateChart(this.yAxes)}}return t.\u0275fac=function(e){return new(e||t)(l.Ob(l.h),l.Ob(D.c))},t.\u0275cmp=l.Ib({type:t,selectors:[["app-chart-presentation"]],viewQuery:function(t,e){if(1&t&&l.Cc(P,1),2&t){let t;l.oc(t=l.cc())&&(e.myChart=t.first)}},inputs:{chartdata:"chartdata",chartLabels:"chartLabels",chartTitle:"chartTitle",lineChartColors:"lineChartColors",loading:"loading"},decls:5,vars:9,consts:[["baseChart","",3,"datasets","labels","options","colors","legend","chartType","plugins"],["myChart","base-chart"],["class","spinner",4,"ngIf"],[1,"spinner"],[1,"center"]],template:function(t,e){1&t&&(l.Ub(0,"span"),l.zc(1),l.Tb(),l.Pb(2,"canvas",0,1),l.yc(4,k,3,0,"div",2)),2&t&&(l.Db(1),l.Ac(e.chartTitle),l.Db(1),l.kc("datasets",e.chartdata)("labels",e.chartLabels)("options",e.lineChartOptions)("colors",e.lineChartColors)("legend",e.lineChartLegend)("chartType",e.lineChartType)("plugins",e.lineChartPlugins),l.Db(2),l.kc("ngIf",e.loading))},directives:[n.a,r.l,y.b],styles:["span[_ngcontent-%COMP%]{font-size:larger;font-weight:600}.center[_ngcontent-%COMP%]{top:50%;left:50%;transform:translateX(-50%) translateY(-50%)}.center[_ngcontent-%COMP%], .spinner[_ngcontent-%COMP%]{position:absolute}.spinner[_ngcontent-%COMP%]{width:100%;height:100%;background-color:hsla(0,0%,100%,.7);z-index:9999;margin:0}"]}),t})();var w=a("UhP/"),T=a("9A8T");function L(t,e){if(1&t&&(l.Ub(0,"mat-option",12),l.zc(1),l.Tb()),2&t){const t=e.$implicit;l.kc("value",t.value),l.Db(1),l.Ac(t.title)}}let $=(()=>{class t{constructor(t){this.store=t,this.states=Object(C.a)(C.b),this.lineChartColors=[{borderColor:"rgba(0,120,120,0.25)",backgroundColor:"rgba(50,120,50,0.0)"},{borderColor:"green",backgroundColor:"rgba(50,50,255,0.75)"}],this.deathChartColors=[{borderColor:"rgba(0,120,120,0.25)",backgroundColor:"rgba(50,120,50,0.0)"},{borderColor:"green",backgroundColor:"rgba(50,50,255,0.75)"}],this.hospitalChartColors=[{borderColor:"rgba(0,120,120,0.25)",backgroundColor:"rgba(255,120,50,0.0)"},{borderColor:"green",backgroundColor:"rgba(255,50,255,0.75)"}],this.infectionChartColors=[{borderColor:"rgba(0,120,120,0.25)",backgroundColor:"rgba(50,255,50,0.0)"},{borderColor:"green",backgroundColor:"rgba(120,120,120,0.75)"}],this.testChartColors=[{borderColor:"rgba(0,120,120,0.25)",backgroundColor:"rgba(50,120,255,0.0)"},{borderColor:"green",backgroundColor:"rgba(50,50,0,0.75)"}]}ngOnInit(){this.$chartData=this.store.select(g.h),this.$deathData=this.store.select(g.e),this.$infectionData=this.store.select(g.g),this.$hospitalData=this.store.select(g.f),this.$testsData=this.store.select(g.i),this.$chartLabels=this.store.select(g.d),this.$startDate=this.store.select(g.o),this.$endDate=this.store.select(g.m),this.$chartTitle=this.store.select(g.c),this.maxDate=new Date(p.j.endDate),this.minDate=new Date(p.j.startDate),this.$loading=this.store.select(g.k)}endDateChanged(t){this.store.dispatch(u.f({ed:t}))}startDateChanged(t){this.store.dispatch(u.g({sd:t}))}nationStateValueChanged(t){this.store.dispatch(u.d({selection:t}))}}return t.\u0275fac=function(e){return new(e||t)(l.Ob(d.i))},t.\u0275cmp=l.Ib({type:t,selectors:[["app-charting"]],decls:43,vars:65,consts:[[1,"data-date-range"],["matInput","","placeholder","Choose a date","readonly","",3,"value","min","max","matDatepicker","dateChange","click"],["startDate",""],["matSuffix","",3,"for"],[3,"startAt"],["startPicker",""],["endDate",""],["endPicker",""],["value","US",3,"selectionChange"],[3,"value",4,"ngFor","ngForOf"],[1,"chart-row"],[3,"chartdata","chartLabels","chartTitle","lineChartColors","loading"],[3,"value"]],template:function(t,e){if(1&t){const t=l.Vb();l.Ub(0,"div",0),l.Ub(1,"mat-form-field"),l.Ub(2,"mat-label"),l.zc(3,"Choose a start date"),l.Tb(),l.Ub(4,"input",1,2),l.bc("dateChange",function(){l.rc(t);const a=l.pc(5);return e.startDateChanged(a.value)})("click",function(){return l.rc(t),l.pc(9).open()}),l.gc(6,"ngrxPush"),l.Tb(),l.Pb(7,"mat-datepicker-toggle",3),l.Pb(8,"mat-datepicker",4,5),l.gc(10,"ngrxPush"),l.Tb(),l.Ub(11,"mat-form-field"),l.Ub(12,"mat-label"),l.zc(13,"Choose a end date"),l.Tb(),l.Ub(14,"input",1,6),l.bc("dateChange",function(){l.rc(t);const a=l.pc(15);return e.endDateChanged(a.value)})("click",function(){return l.rc(t),l.pc(19).open()}),l.gc(16,"ngrxPush"),l.Tb(),l.Pb(17,"mat-datepicker-toggle",3),l.Pb(18,"mat-datepicker",4,7),l.gc(20,"ngrxPush"),l.Tb(),l.Ub(21,"mat-form-field"),l.Ub(22,"mat-label"),l.zc(23,"State or National"),l.Tb(),l.Ub(24,"mat-select",8),l.bc("selectionChange",function(t){return e.nationStateValueChanged(t.value)}),l.yc(25,L,2,2,"mat-option",9),l.Tb(),l.Tb(),l.Tb(),l.Ub(26,"div",10),l.Pb(27,"app-chart-presentation",11),l.gc(28,"ngrxPush"),l.gc(29,"ngrxPush"),l.gc(30,"ngrxPush"),l.Pb(31,"app-chart-presentation",11),l.gc(32,"ngrxPush"),l.gc(33,"ngrxPush"),l.gc(34,"ngrxPush"),l.Pb(35,"app-chart-presentation",11),l.gc(36,"ngrxPush"),l.gc(37,"ngrxPush"),l.gc(38,"ngrxPush"),l.Pb(39,"app-chart-presentation",11),l.gc(40,"ngrxPush"),l.gc(41,"ngrxPush"),l.gc(42,"ngrxPush"),l.Tb()}if(2&t){const t=l.pc(9),a=l.pc(19);l.Db(4),l.kc("value",l.hc(6,33,e.$startDate))("min",e.minDate)("max",e.maxDate)("matDatepicker",t),l.Db(3),l.kc("for",t),l.Db(1),l.kc("startAt",l.hc(10,35,e.$startDate)),l.Db(6),l.kc("value",l.hc(16,37,e.$endDate))("min",e.minDate)("max",e.maxDate)("matDatepicker",a),l.Db(3),l.kc("for",a),l.Db(1),l.kc("startAt",l.hc(20,39,e.$endDate)),l.Db(7),l.kc("ngForOf",e.states),l.Db(2),l.kc("chartdata",l.hc(28,41,e.$infectionData))("chartLabels",l.hc(29,43,e.$chartLabels))("chartTitle","Infections")("lineChartColors",e.infectionChartColors)("loading",l.hc(30,45,e.$loading)),l.Db(4),l.kc("chartdata",l.hc(32,47,e.$deathData))("chartLabels",l.hc(33,49,e.$chartLabels))("chartTitle","Deaths")("lineChartColors",e.deathChartColors)("loading",l.hc(34,51,e.$loading)),l.Db(4),l.kc("chartdata",l.hc(36,53,e.$testsData))("chartLabels",l.hc(37,55,e.$chartLabels))("chartTitle","Tests")("lineChartColors",e.testChartColors)("loading",l.hc(38,57,e.$loading)),l.Db(4),l.kc("chartdata",l.hc(40,59,e.$hospitalData))("chartLabels",l.hc(41,61,e.$chartLabels))("chartTitle","Hospitalized")("lineChartColors",e.hospitalChartColors)("loading",l.hc(42,63,e.$loading))}},directives:[f.c,f.f,m.b,v.b,v.d,f.g,v.a,x.a,r.k,O,w.m],pipes:[T.a],styles:[".data-date-range[_ngcontent-%COMP%]{margin:auto;width:100%;display:flex;flex-wrap:wrap;flex-direction:column;padding-top:1rem;align-items:center}.data-date-range[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{padding-left:0;padding-right:0;width:90%}.chart-row[_ngcontent-%COMP%]{justify-content:space-around;margin-bottom:3rem}.chart-row[_ngcontent-%COMP%], .chart-row[_ngcontent-%COMP%]   app-chart-presentation[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.chart-row[_ngcontent-%COMP%]   app-chart-presentation[_ngcontent-%COMP%]{width:95%;min-height:15rem;margin-top:1rem;position:relative}@media screen and (min-width:900px){.data-date-range[_ngcontent-%COMP%]{flex-direction:row;justify-content:center}.data-date-range[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:30%;padding-left:.5rem}}@media screen and (min-width:1200px){.chart-row[_ngcontent-%COMP%]{flex-direction:row;align-items:stretch;flex-wrap:wrap}.chart-row[_ngcontent-%COMP%]   app-chart-presentation[_ngcontent-%COMP%]{width:45%}}"]}),t})();var M=a("vkgz"),j=a("LRne"),A=a("DH7j"),_=a("yCtX"),U=a("l7GE"),z=a("ZUHj");class I{call(t,e){return e.subscribe(new F(t))}}class F extends U.a{constructor(t){super(t),this.hasFirst=!1,this.observables=[],this.subscriptions=[]}_next(t){this.observables.push(t)}_complete(){const t=this.observables,e=t.length;if(0===e)this.destination.complete();else{for(let a=0;a<e&&!this.hasFirst;a++){const e=t[a],r=Object(z.a)(this,e,void 0,a);this.subscriptions&&this.subscriptions.push(r),this.add(r)}this.observables=null}}notifyNext(t,e,a){if(!this.hasFirst){this.hasFirst=!0;for(let t=0;t<this.subscriptions.length;t++)if(t!==a){let e=this.subscriptions[t];e.unsubscribe(),this.remove(e)}this.subscriptions=null}this.destination.next(e)}}var Q=a("7bNT");const Y=[{path:"",component:$,canActivate:[b],resolve:[(()=>{class t{constructor(t,e,a){this.store=t,this.actions$=e,this.router=a}resolve(t){let e,a=!1;return this.store.select(g.j).pipe(Object(h.a)(1)).subscribe(t=>a=t),a?(this.store.select(g.l).pipe(Object(h.a)(1)).subscribe(t=>e=[...t]),u.c):(this.store.dispatch(u.b()),function(...t){if(1===t.length){if(!Object(A.a)(t[0]))return t[0];t=t[0]}return Object(_.a)(t,void 0).lift(new I)}(Object(j.a)(u.c),Object(j.a)(u.a).pipe(Object(M.a)(()=>this.router.navigate([""])))).pipe(Object(h.a)(1)))}}return t.\u0275fac=function(e){return new(e||t)(l.Yb(d.i),l.Yb(Q.a),l.Yb(s.f))},t.\u0275prov=l.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()]}];let E=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(e){return new(e||t)},imports:[[s.h.forChild(Y)],s.h]}),t})();var N=a("N7LN"),V=a("s7LF"),H=a("pKmL");let R=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(e){return new(e||t)},imports:[[r.c,n.b,E,d.k.forFeature(g.a,g.b),Q.b.forFeature([N.a]),V.f,H.a]]}),t})()}}]);