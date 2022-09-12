!function(t,e,r,i,s){var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n="function"==typeof o[i]&&o[i],f=n.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function h(e,r){if(!f[e]){if(!t[e]){var s="function"==typeof o[i]&&o[i];if(!r&&s)return s(e,!0);if(n)return n(e,!0);if(u&&"string"==typeof e)return u(e);var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}p.resolve=function(r){var i=t[e][1][r];return null!=i?i:r},p.cache={};var l=f[e]=new h.Module(e);t[e][0].call(l.exports,p,l,l.exports,this)}return f[e].exports;function p(t){var e=p.resolve(t);return!1===e?{}:h(e)}}h.isParcelRequire=!0,h.Module=function(t){this.id=t,this.bundle=h,this.exports={}},h.modules=t,h.cache=f,h.parent=n,h.register=function(e,r){t[e]=[function(t,e){e.exports=r},{}]},Object.defineProperty(h,"root",{get:function(){return o[i]}}),o[i]=h;for(var a=0;a<e.length;a++)h(e[a]);if(r){var l=h(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd&&define(function(){return l})}}({jWRiz:[function(t,e,r){!function t(e,r,i){function s(n,f){if(!r[n]){if(!e[n]){var u=void 0;if(!f&&u)return u(n,!0);if(o)return o(n,!0);var h=Error("Cannot find module '"+n+"'");throw h.code="MODULE_NOT_FOUND",h}var a=r[n]={exports:{}};e[n][0].call(a.exports,function(t){return s(e[n][1][t]||t)},a,a.exports,t,e,r,i)}return r[n].exports}for(var o=void 0,n=0;n<i.length;n++)s(i[n]);return s}({1:[function(t,e,r){function i(t){if(this.size=0|t,this.size<=1||(this.size&this.size-1)!=0)throw Error("FFT size must be a power of two and bigger than 1");this._csize=t<<1;for(var e=Array(2*this.size),r=0;r<e.length;r+=2){let t=Math.PI*r/this.size;e[r]=Math.cos(t),e[r+1]=-Math.sin(t)}this.table=e;for(var i=0,s=1;this.size>s;s<<=1)i++;this._width=i%2==0?i-1:i,this._bitrev=Array(1<<this._width);for(var o=0;o<this._bitrev.length;o++){this._bitrev[o]=0;for(var n=0;n<this._width;n+=2){var f=this._width-n-2;this._bitrev[o]|=(o>>>n&3)<<f}}this._out=null,this._data=null,this._inv=0}e.exports=i,i.prototype.fromComplexArray=function(t,e){for(var r=e||Array(t.length>>>1),i=0;i<t.length;i+=2)r[i>>>1]=t[i];return r},i.prototype.createComplexArray=function(){let t=Array(this._csize);for(var e=0;e<t.length;e++)t[e]=0;return t},i.prototype.toComplexArray=function(t,e){for(var r=e||this.createComplexArray(),i=0;i<r.length;i+=2)r[i]=t[i>>>1],r[i+1]=0;return r},i.prototype.completeSpectrum=function(t){for(var e=this._csize,r=e>>>1,i=2;i<r;i+=2)t[e-i]=t[i],t[e-i+1]=-t[i+1]},i.prototype.transform=function(t,e){if(t===e)throw Error("Input and output buffers must be different");this._out=t,this._data=e,this._inv=0,this._transform4(),this._out=null,this._data=null},i.prototype.realTransform=function(t,e){if(t===e)throw Error("Input and output buffers must be different");this._out=t,this._data=e,this._inv=0,this._realTransform4(),this._out=null,this._data=null},i.prototype.inverseTransform=function(t,e){if(t===e)throw Error("Input and output buffers must be different");this._out=t,this._data=e,this._inv=1,this._transform4();for(var r=0;r<t.length;r++)t[r]/=this.size;this._out=null,this._data=null},i.prototype._transform4=function(){var t,e,r=this._out,i=this._csize,s=1<<this._width,o=i/s<<1,n=this._bitrev;if(4===o)for(t=0,e=0;t<i;t+=o,e++){let r=n[e];this._singleTransform2(t,r,s)}else for(t=0,e=0;t<i;t+=o,e++){let r=n[e];this._singleTransform4(t,r,s)}var f=this._inv?-1:1,u=this.table;for(s>>=2;s>=2;s>>=2){var h=(o=i/s<<1)>>>2;for(t=0;t<i;t+=o)for(var a=t+h,l=t,p=0;l<a;l+=2,p+=s){let t=l,e=t+h,i=e+h,s=i+h,o=r[t],n=r[t+1],a=r[e],c=r[e+1],d=r[i],v=r[i+1],m=r[s],b=r[s+1],_=u[p],y=f*u[p+1],B=a*_-c*y,g=a*y+c*_,x=u[2*p],z=f*u[2*p+1],S=d*x-v*z,C=d*z+v*x,I=u[3*p],k=f*u[3*p+1],w=m*I-b*k,T=m*k+b*I,A=o+S,O=n+C,M=o-S,P=n-C,R=B+w,q=g+T,F=f*(B-w),W=f*(g-T),j=A+R,E=O+q,H=A-R,N=O-q,D=M+W,L=P-F,U=M-W,V=P+F;r[t]=j,r[t+1]=E,r[e]=D,r[e+1]=L,r[i]=H,r[i+1]=N,r[s]=U,r[s+1]=V}}},i.prototype._singleTransform2=function(t,e,r){let i=this._out,s=this._data,o=s[e],n=s[e+1],f=s[e+r],u=s[e+r+1];i[t]=o+f,i[t+1]=n+u,i[t+2]=o-f,i[t+3]=n-u},i.prototype._singleTransform4=function(t,e,r){let i=this._out,s=this._data,o=this._inv?-1:1,n=2*r,f=3*r,u=s[e],h=s[e+1],a=s[e+r],l=s[e+r+1],p=s[e+n],c=s[e+n+1],d=s[e+f],v=s[e+f+1],m=u+p,b=h+c,_=u-p,y=h-c,B=a+d,g=l+v,x=o*(a-d),z=o*(l-v);i[t]=m+B,i[t+1]=b+g,i[t+2]=_+z,i[t+3]=y-x,i[t+4]=m-B,i[t+5]=b-g,i[t+6]=_-z,i[t+7]=y+x},i.prototype._realTransform4=function(){var t,e,r=this._out,i=this._csize,s=1<<this._width,o=i/s<<1,n=this._bitrev;if(4===o)for(t=0,e=0;t<i;t+=o,e++){let r=n[e];this._singleRealTransform2(t,r>>>1,s>>>1)}else for(t=0,e=0;t<i;t+=o,e++){let r=n[e];this._singleRealTransform4(t,r>>>1,s>>>1)}var f=this._inv?-1:1,u=this.table;for(s>>=2;s>=2;s>>=2){var h=(o=i/s<<1)>>>1,a=h>>>1,l=a>>>1;for(t=0;t<i;t+=o)for(var p=0,c=0;p<=l;p+=2,c+=s){var d=t+p,v=d+a,m=v+a,b=m+a,_=r[d],y=r[d+1],B=r[v],g=r[v+1],x=r[m],z=r[m+1],S=r[b],C=r[b+1],I=u[c],k=f*u[c+1],w=B*I-g*k,T=B*k+g*I,A=u[2*c],O=f*u[2*c+1],M=x*A-z*O,P=x*O+z*A,R=u[3*c],q=f*u[3*c+1],F=S*R-C*q,W=S*q+C*R,j=_+M,E=y+P,H=_-M,N=y-P,D=w+F,L=T+W,U=f*(w-F),V=f*(T-W),G=j+D,J=E+L,K=H+V,Q=N-U;if(r[d]=G,r[d+1]=J,r[v]=K,r[v+1]=Q,0===p){var X=j-D,Y=E-L;r[m]=X,r[m+1]=Y;continue}if(p!==l){var Z=-f*V,$=-f*U,tt=-f*L,te=H+Z,tr=-N+$,ti=j+-f*D,ts=-E-tt,to=t+a-p,tn=t+h-p;r[to]=te,r[to+1]=tr,r[tn]=ti,r[tn+1]=ts}}}},i.prototype._singleRealTransform2=function(t,e,r){let i=this._out,s=this._data,o=s[e],n=s[e+r];i[t]=o+n,i[t+1]=0,i[t+2]=o-n,i[t+3]=0},i.prototype._singleRealTransform4=function(t,e,r){let i=this._out,s=this._data,o=this._inv?-1:1,n=s[e],f=s[e+r],u=s[e+2*r],h=s[e+3*r],a=n+u,l=n-u,p=f+h,c=o*(f-h);i[t]=a+p,i[t+1]=0,i[t+2]=l,i[t+3]=-c,i[t+4]=a-p,i[t+5]=0,i[t+6]=l,i[t+7]=c}},{}],2:[function(t,e,r){class i extends AudioWorkletProcessor{reallocateChannelsIfNeeded(t,e){for(var r=0;r<this.nbInputs;r++){let e=t[r].length;e!=this.inputBuffers[r].length&&this.allocateInputChannels(r,e)}for(var r=0;r<this.nbOutputs;r++){let t=e[r].length;t!=this.outputBuffers[r].length&&this.allocateOutputChannels(r,t)}}allocateInputChannels(t,e){this.inputBuffers[t]=Array(e);for(var r=0;r<e;r++)this.inputBuffers[t][r]=new Float32Array(this.blockSize+128),this.inputBuffers[t][r].fill(0);this.inputBuffersHead[t]=Array(e),this.inputBuffersToSend[t]=Array(e);for(var r=0;r<e;r++)this.inputBuffersHead[t][r]=this.inputBuffers[t][r].subarray(0,this.blockSize),this.inputBuffersToSend[t][r]=new Float32Array(this.blockSize)}allocateOutputChannels(t,e){this.outputBuffers[t]=Array(e);for(var r=0;r<e;r++)this.outputBuffers[t][r]=new Float32Array(this.blockSize),this.outputBuffers[t][r].fill(0);this.outputBuffersToRetrieve[t]=Array(e);for(var r=0;r<e;r++)this.outputBuffersToRetrieve[t][r]=new Float32Array(this.blockSize),this.outputBuffersToRetrieve[t][r].fill(0)}readInputs(t){if(t[0].length&&0==t[0][0].length){for(var e=0;e<this.nbInputs;e++)for(var r=0;r<this.inputBuffers[e].length;r++)this.inputBuffers[e][r].fill(0,this.blockSize);return}for(var e=0;e<this.nbInputs;e++)for(var r=0;r<this.inputBuffers[e].length;r++){let i=t[e][r];this.inputBuffers[e][r].set(i,this.blockSize)}}writeOutputs(t){for(var e=0;e<this.nbInputs;e++)for(var r=0;r<this.inputBuffers[e].length;r++){let i=this.outputBuffers[e][r].subarray(0,128);t[e][r].set(i)}}shiftInputBuffers(){for(var t=0;t<this.nbInputs;t++)for(var e=0;e<this.inputBuffers[t].length;e++)this.inputBuffers[t][e].copyWithin(0,128)}shiftOutputBuffers(){for(var t=0;t<this.nbOutputs;t++)for(var e=0;e<this.outputBuffers[t].length;e++)this.outputBuffers[t][e].copyWithin(0,128),this.outputBuffers[t][e].subarray(this.blockSize-128).fill(0)}prepareInputBuffersToSend(){for(var t=0;t<this.nbInputs;t++)for(var e=0;e<this.inputBuffers[t].length;e++)this.inputBuffersToSend[t][e].set(this.inputBuffersHead[t][e])}handleOutputBuffersToRetrieve(){for(var t=0;t<this.nbOutputs;t++)for(var e=0;e<this.outputBuffers[t].length;e++)for(var r=0;r<this.blockSize;r++)this.outputBuffers[t][e][r]+=this.outputBuffersToRetrieve[t][e][r]/this.nbOverlaps}process(t,e,r){return this.reallocateChannelsIfNeeded(t,e),this.readInputs(t),this.shiftInputBuffers(),this.prepareInputBuffersToSend(),this.processOLA(this.inputBuffersToSend,this.outputBuffersToRetrieve,r),this.handleOutputBuffersToRetrieve(),this.writeOutputs(e),this.shiftOutputBuffers(),!0}processOLA(t,e,r){console.assert(!1,"Not overriden")}constructor(t){super(t),this.nbInputs=t.numberOfInputs,this.nbOutputs=t.numberOfOutputs,this.blockSize=t.processorOptions.blockSize,this.hopSize=128,this.nbOverlaps=this.blockSize/this.hopSize,this.inputBuffers=Array(this.nbInputs),this.inputBuffersHead=Array(this.nbInputs),this.inputBuffersToSend=Array(this.nbInputs);for(var e=0;e<this.nbInputs;e++)this.allocateInputChannels(e,1);this.outputBuffers=Array(this.nbOutputs),this.outputBuffersToRetrieve=Array(this.nbOutputs);for(var e=0;e<this.nbOutputs;e++)this.allocateOutputChannels(e,1)}}e.exports=i},{}],3:[function(t,e,r){let i=t("./ola-processor.js"),s=t("fft.js");registerProcessor("phase-vocoder-processor",class extends i{static get parameterDescriptors(){return[{name:"pitchFactor",defaultValue:1}]}processOLA(t,e,r){let i=r.pitchFactor[r.pitchFactor.length-1];for(var s=0;s<this.nbInputs;s++)for(var o=0;o<t[s].length;o++){var n=t[s][o],f=e[s][o];this.applyHannWindow(n),this.fft.realTransform(this.freqComplexBuffer,n),this.computeMagnitudes(),this.findPeaks(),this.shiftPeaks(i),this.fft.completeSpectrum(this.freqComplexBufferShifted),this.fft.inverseTransform(this.timeComplexBuffer,this.freqComplexBufferShifted),this.fft.fromComplexArray(this.timeComplexBuffer,f),this.applyHannWindow(f)}this.timeCursor+=this.hopSize}applyHannWindow(t){for(var e=0;e<this.blockSize;e++)t[e]=t[e]*this.hannWindow[e]}computeMagnitudes(){for(var t=0,e=0;t<this.magnitudes.length;){let r=this.freqComplexBuffer[e],i=this.freqComplexBuffer[e+1];this.magnitudes[t]=r**2+i**2,t+=1,e+=2}}findPeaks(){this.nbPeaks=0;var t=2;let e=this.magnitudes.length-2;for(;t<e;){let e=this.magnitudes[t];if(this.magnitudes[t-1]>=e||this.magnitudes[t-2]>=e||this.magnitudes[t+1]>=e||this.magnitudes[t+2]>=e){t++;continue}this.peakIndexes[this.nbPeaks]=t,this.nbPeaks++,t+=2}}shiftPeaks(t){this.freqComplexBufferShifted.fill(0);for(var e=0;e<this.nbPeaks;e++){let o=this.peakIndexes[e],n=Math.round(o*t);if(n>this.magnitudes.length)break;var r=0,i=this.fftSize;e>0&&(r=o-Math.floor((o-this.peakIndexes[e-1])/2)),e<this.nbPeaks-1&&(i=o+Math.ceil((this.peakIndexes[e+1]-o)/2));let f=r-o,u=i-o;for(var s=f;s<u;s++){let t=o+s,e=n+s;if(e>=this.magnitudes.length)break;let r=2*Math.PI*(e-t)/this.fftSize,i=Math.cos(r*this.timeCursor),f=Math.sin(r*this.timeCursor),u=2*t,h=u+1,a=this.freqComplexBuffer[u],l=this.freqComplexBuffer[h],p=a*i-l*f,c=a*f+l*i,d=2*e,v=d+1;this.freqComplexBufferShifted[d]+=p,this.freqComplexBufferShifted[v]+=c}}}constructor(t){t.processorOptions={blockSize:2048},super(t),this.fftSize=this.blockSize,this.timeCursor=0,this.hannWindow=function(t){let e=new Float32Array(t);for(var r=0;r<t;r++)e[r]=.5*(1-Math.cos(2*Math.PI*r/t));return e}(this.blockSize),this.fft=new s(this.fftSize),this.freqComplexBuffer=this.fft.createComplexArray(),this.freqComplexBufferShifted=this.fft.createComplexArray(),this.timeComplexBuffer=this.fft.createComplexArray(),this.magnitudes=new Float32Array(this.fftSize/2+1),this.peakIndexes=new Int32Array(this.magnitudes.length),this.nbPeaks=0}})},{"./ola-processor.js":2,"fft.js":1}]},{},[3])},{}]},["jWRiz"],"jWRiz","parcelRequirec6d8");
//# sourceMappingURL=phase-vocoder.7a851a40.js.map
