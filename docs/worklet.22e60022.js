!function(e,r,t,o,n){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof s[o]&&s[o],a=i.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(r,t){if(!a[r]){if(!e[r]){var n="function"==typeof s[o]&&s[o];if(!t&&n)return n(r,!0);if(i)return i(r,!0);if(l&&"string"==typeof r)return l(r);var f=Error("Cannot find module '"+r+"'");throw f.code="MODULE_NOT_FOUND",f}d.resolve=function(t){var o=e[r][1][t];return null!=o?o:t},d.cache={};var c=a[r]=new u.Module(r);e[r][0].call(c.exports,d,c,c.exports,this)}return a[r].exports;function d(e){var r=d.resolve(e);return!1===r?{}:u(r)}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=a,u.parent=i,u.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]},Object.defineProperty(u,"root",{get:function(){return s[o]}}),s[o]=u;for(var f=0;f<r.length;f++)u(r[f]);if(t){var c=u(t);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd&&define(function(){return c})}}({"58rhA":[function(e,r,t){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(t),o.export(t,"ValueMeterProcessor",()=>i);var n=e("@swc/helpers/_/_define_property"),s=e("../lib/useBroadcast");class i extends AudioWorkletProcessor{process(e){let r=e[0][0];1024!==this.buffer.length&&(this.buffer=new Float32Array(1024));let t=this.buffer;!r&&this.isActive&&(this.broadcast(new Float32Array),this.isActive=!1),r&&!this.isActive&&(this.isActive=!0);for(let e=0;e<(null==r?void 0:r.length);e+=1)t[this.sampleIndex]=r[e],this.sampleIndex+=1,1024===this.sampleIndex&&(this.broadcast(t),this.sampleIndex=0);return!0}constructor(){super(),(0,n._)(this,"sampleIndex",0),(0,n._)(this,"buffer",new Float32Array),(0,n._)(this,"isActive",!0),(0,n._)(this,"broadcast",(0,s.useBroadcast)(this.port)),this.port.start()}}try{registerProcessor("value-meter-processor",i)}catch(e){}},{"@swc/helpers/_/_define_property":"ktYkZ","../lib/useBroadcast":"eLhYv","@parcel/transformer-js/src/esmodule-helpers.js":"5zHCx"}],ktYkZ:[function(e,r,t){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}o.defineInteropFlag(t),o.export(t,"_define_property",()=>n),o.export(t,"_",()=>n)},{"@parcel/transformer-js/src/esmodule-helpers.js":"5zHCx"}],"5zHCx":[function(e,r,t){t.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},t.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.exportAll=function(e,r){return Object.keys(e).forEach(function(t){"default"===t||"__esModule"===t||Object.prototype.hasOwnProperty.call(r,t)||Object.defineProperty(r,t,{enumerable:!0,get:function(){return e[t]}})}),r},t.export=function(e,r,t){Object.defineProperty(e,r,{enumerable:!0,get:t})}},{}],eLhYv:[function(e,r,t){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(t),o.export(t,"useBroadcast",()=>s),o.export(t,"addBroadcastListener",()=>i),o.export(t,"removeBroadcastListener",()=>a);let n="default",s=e=>{let r={[n]:[]};return e.addEventListener("message",({data:e})=>{if("ADD_LISTENER"===e.name){var t;let o=null!==(t=e.poolName)&&void 0!==t?t:n;r[o]||(r[o]=[]),r[o].push(e.port)}}),(e,t=n)=>{var o;return null===(o=r[t])||void 0===o?void 0:o.forEach(r=>r.postMessage(e))}},i=(e,r,t)=>{e.postMessage({name:"ADD_LISTENER",port:r,poolName:t},[r])},a=(e,r,t)=>{e.postMessage({name:"REMOVE_LISTENER",port:r,poolName:t},[r])}},{"@parcel/transformer-js/src/esmodule-helpers.js":"5zHCx"}]},["58rhA"],"58rhA","parcelRequirec6d8");
//# sourceMappingURL=worklet.22e60022.js.map
