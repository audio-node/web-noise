!function(e,t,r,o,s){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof a[o]&&a[o],n=i.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,r){if(!n[t]){if(!e[t]){var s="function"==typeof a[o]&&a[o];if(!r&&s)return s(t,!0);if(i)return i(t,!0);if(u&&"string"==typeof t)return u(t);var c=Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}d.resolve=function(r){var o=e[t][1][r];return null!=o?o:r},d.cache={};var f=n[t]=new l.Module(t);e[t][0].call(f.exports,d,f,f.exports,this)}return n[t].exports;function d(e){var t=d.resolve(e);return!1===t?{}:l(t)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=n,l.parent=i,l.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(l,"root",{get:function(){return a[o]}}),a[o]=l;for(var c=0;c<t.length;c++)l(t[c]);if(r){var f=l(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=f:"function"==typeof define&&define.amd&&define(function(){return f})}}({"926At":[function(e,t,r){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(r),o.export(r,"AudioTrackProcessor",()=>s);class s extends AudioWorkletProcessor{data=null;prevGateState=!1;isTriggered=!1;isPlaying=!1;cursor=0;prevCursor=0;static get parameterDescriptors(){return[{name:"gate",automationRate:"a-rate",defaultValue:0,minValue:0,maxValue:1},{name:"restart",automationRate:"k-rate",defaultValue:0,minValue:0,maxValue:1},{name:"loop",automationRate:"k-rate",defaultValue:0,minValue:0},{name:"start",automationRate:"k-rate",defaultValue:0,minValue:0},{name:"end",automationRate:"k-rate",defaultValue:0,minValue:0}]}constructor(){super(),this.port.onmessage=({data:e})=>{"track"===e.name&&(this.data=e.data),this.port.postMessage({name:"track",data:e.data})}}emitProgressEvent(){this.cursor!==this.prevCursor&&(this.port.postMessage({name:"time",cursor:this.cursor,seconds:this.cursor/sampleRate,progress:this.cursor/this.data.length}),this.prevCursor=this.cursor)}useTrigger(e,t){for(let r=0;r<e.length;r++){let o=e[r];o>=.5&&!this.isTriggered&&(this.isTriggered=!0,t()),o<.5&&this.isTriggered&&(this.isTriggered=!1)}}useGate(e,t,r){for(let t=0;t<e.length;t++){let r=e[t];r>=.5&&!this.isPlaying&&(this.isPlaying=!0),r<.5&&this.isPlaying&&(this.isPlaying=!1)}this.isPlaying?t():r()}process(e,t,r){if(!this.data)return!0;let{gate:o,loop:s,start:a,end:i,restart:n}=r,[u,l]=t;return this.useTrigger(n,()=>{this.cursor=a[0]*sampleRate}),this.useGate(o,()=>{let e=i[0]*sampleRate;if(this.cursor>(e||this.data.length)){if(1!==s[0])return!0;this.cursor=a[0]*sampleRate,console.log("track ended, loop on")}let r=t[0][0].length;u.forEach((e,t)=>{e.set(this.data.channelData[t].slice(this.cursor,this.cursor+r))}),l.forEach((e,t)=>{for(let t=0;t<e.length;t++)e[t]=1}),this.cursor+=r,this.emitProgressEvent()},()=>{l.forEach((e,t)=>{for(let t=0;t<e.length;t++)e[t]=0}),this.cursor=a[0]*sampleRate,this.emitProgressEvent()}),!0}}try{registerProcessor("audio-track-processor",s)}catch(e){}},{"@parcel/transformer-js/src/esmodule-helpers.js":"5zHCx"}],"5zHCx":[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}]},["926At"],"926At","parcelRequirec6d8");
//# sourceMappingURL=worklet.8a3af261.js.map