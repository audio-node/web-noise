!function(e,t,r,o,l){var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof n[o]&&n[o],a=i.cache||{},s="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function f(t,r){if(!a[t]){if(!e[t]){var l="function"==typeof n[o]&&n[o];if(!r&&l)return l(t,!0);if(i)return i(t,!0);if(s&&"string"==typeof t)return s(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}d.resolve=function(r){var o=e[t][1][r];return null!=o?o:r},d.cache={};var c=a[t]=new f.Module(t);e[t][0].call(c.exports,d,c,c.exports,this)}return a[t].exports;function d(e){var t=d.resolve(e);return!1===t?{}:f(t)}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=a,f.parent=i,f.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(f,"root",{get:function(){return n[o]}}),n[o]=f;for(var u=0;u<t.length;u++)f(t[u]);if(r){var c=f(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd&&define(function(){return c})}}({"8DXOK":[function(e,t,r){let o,l;var n=e("@parcel/transformer-js/src/esmodule-helpers.js"),i=e("../lib/scale"),a=n.interopDefault(i),s=e("./types");let f={min:-1,max:1,majorTicks:10,minorTicks:50,labelsInterval:5,arcColor:"#f0f0f0",arrowColor:"#4caf50",ticksColor:"#333",labelsColor:"#333",labels:[],size:{width:300,height:150}},u={...f},c={},d=null;function p(e){return e*Math.PI/180}let m=e=>{var t,r;return(0,a.default)(e,null!==(t=u.min)&&void 0!==t?t:0,null!==(r=u.max)&&void 0!==r?r:1,0,1)},h=e=>{let t=c[e];return(null==t?void 0:t.label)?t.label:e%1==0?e.toString():e.toFixed(2)},v=e=>{var t;return(null===(t=c[e])||void 0===t?void 0:t.color)||u.labelsColor||f.labelsColor},b=(e,t,r)=>{let o=p(180),n=p(360);l.beginPath(),l.arc(e,t,r,o,n),l.fillStyle=u.arcColor||f.arcColor,l.fill(),l.closePath()},x=(e,t,r,o,n)=>{let i=p(180)+o/n*p(180),a=e+r*Math.cos(i),s=t+r*Math.sin(i);l.beginPath(),l.moveTo(e,t),l.lineTo(a,s),l.lineWidth=2,l.strokeStyle=u.arrowColor||f.arrowColor,l.stroke(),l.closePath()},g=(e,t,r,o,n,i)=>{var a,s;let c=null!==(a=u.min)&&void 0!==a?a:f.min,d=null!==(s=u.max)&&void 0!==s?s:f.max,m=p(180),b=p(360);for(let a=0;a<=o;a++){let s=m+a/o*(b-m),p=e+r*Math.cos(s),x=t+r*Math.sin(s),g=e+(r-n)*Math.cos(s),y=t+(r-n)*Math.sin(s);if(l.beginPath(),l.moveTo(p,x),l.lineTo(g,y),l.lineWidth=2,l.strokeStyle=u.ticksColor||f.ticksColor,l.stroke(),l.closePath(),a%i==0){let i=(d-c)/o*a+c,f=e+(r-n-30)*Math.cos(s),u=(0===a||a===o?t-8:t)+(r-n-30)*Math.sin(s);l.font="18px Arial",l.fillStyle=v(i),l.textAlign="center",l.textBaseline="middle",l.fillText(h(i),f,u)}}},y=(e,t,r)=>{l.beginPath(),l.arc(e,t,30,p(180),p(360)),l.fillStyle=u.arcColor||f.arcColor,l.fill(),l.closePath(),l.font="18px Arial",l.fillStyle=v(r),l.textAlign="center",l.textBaseline="middle",l.fillText(h(r),e,t-10)},C=()=>{let{width:e,height:t}=l.canvas,r=e/2,o=t-10;l.clearRect(0,0,l.canvas.width,l.canvas.height),b(r,t,o),g(r,t,o,u.minorTicks,5,u.labelsInterval),g(r,t,o,u.majorTicks,10,0),null!==d&&(x(r,t,o,m(d),1),y(r,t,d))},j=()=>{if(!l){requestAnimationFrame(j);return}C(),requestAnimationFrame(j)};onmessage=function({data:e}){if(e.name===s.WorkerEventNames.INIT){if(o=e.canvas,u.size){var t,r;o.width=(null===(t=u.size)||void 0===t?void 0:t.width)*2,o.height=(null===(r=u.size)||void 0===r?void 0:r.height)*2}l=o.getContext("2d"),e.port.onmessage=({data:e})=>{e.forEach(e=>{d=e})},requestAnimationFrame(j)}e.name===s.WorkerEventNames.SET_CONFIG&&(c=(u={...u,...e.config}).labels.reduce((e,t)=>void 0===t.value?e:{...e,[t.value]:t},{}))}},{"../lib/scale":"9v9Uw","./types":"dipEp","@parcel/transformer-js/src/esmodule-helpers.js":"5zHCx"}],"9v9Uw":[function(e,t,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r),r.default=(e,t,r,o,l)=>(Math.max(Math.min(e,r),t)-t)/(r-t)*(l-o)+o},{"@parcel/transformer-js/src/esmodule-helpers.js":"5zHCx"}],"5zHCx":[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}],dipEp:[function(e,t,r){var o,l,n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"WorkerEventNames",()=>l),(o=l||(l={})).INIT="INIT",o.SET_CONFIG="SET_CONFIG"},{"@parcel/transformer-js/src/esmodule-helpers.js":"5zHCx"}]},["8DXOK"],"8DXOK","parcelRequirec6d8");
//# sourceMappingURL=renderer.worker.4d8dd66a.js.map
