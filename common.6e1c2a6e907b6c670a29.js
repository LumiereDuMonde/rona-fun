(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"P+IX":function(t,e,r){"use strict";r.d(e,"a",function(){return l});var o=r("YY+H"),n=r("zQFV"),c=r("lJxs"),i=r("IzEk"),s=r("fXoL"),a=r("tyNb"),u=r("tqRt");let l=(()=>{class t{constructor(t,e){this.router=t,this.store=e}canActivate(t,e){return this.store.select(o.e).pipe(Object(c.a)(t=>!!t||(console.log(`Not logged in ${e.url}`),this.store.dispatch(n.g({url:e.url})),!1)),Object(i.a)(1))}canActivateChild(t,e){return this.canActivate(t,e)}}return t.\u0275fac=function(e){return new(e||t)(s.Yb(a.f),s.Yb(u.i))},t.\u0275prov=s.Kb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);