"use strict";var le=Object.defineProperty;var re=(e,t,s)=>t in e?le(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var L=(e,t,s)=>(re(e,typeof t!="symbol"?t+"":t,s),s),U=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)};var w=(e,t,s)=>(U(e,t,"read from private field"),s?s.call(e):t.get(e)),T=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},M=(e,t,s,n)=>(U(e,t,"write to private field"),n?n.call(e,s):t.set(e,s),s);Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const oe=(e,t)=>e===t,F={equals:oe};let W=X;const y=1,S=2,q={owned:null,cleanups:null,context:null,owner:null};var p=null;let $=null,f=null,c=null,g=null,m=0;function G(e,t){const s=f,n=p,i=e.length===0,l=i?q:{owned:null,cleanups:null,context:null,owner:t===void 0?n:t},o=i?e:()=>e(()=>C(()=>P(l)));p=l,f=null;try{return v(o,!0)}finally{f=s,p=n}}function ue(e,t){t=t?Object.assign({},F,t):F;const s={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},n=i=>(typeof i=="function"&&(i=i(s.value)),Q(s,i));return[ae.bind(s),n]}function K(e,t,s){const n=Z(e,t,!1,y);N(n)}function fe(e,t,s){W=de;const n=Z(e,t,!1,y);(!s||!s.render)&&(n.user=!0),g?g.push(n):N(n)}function C(e){if(f===null)return e();const t=f;f=null;try{return e()}finally{f=t}}function ce(e){fe(()=>C(e))}function ae(){if(this.sources&&this.state)if(this.state===y)N(this);else{const e=c;c=null,v(()=>E(this),!1),c=e}if(f){const e=this.observers?this.observers.length:0;f.sources?(f.sources.push(this),f.sourceSlots.push(e)):(f.sources=[this],f.sourceSlots=[e]),this.observers?(this.observers.push(f),this.observerSlots.push(f.sources.length-1)):(this.observers=[f],this.observerSlots=[f.sources.length-1])}return this.value}function Q(e,t,s){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&v(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],o=$&&$.running;o&&$.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?c.push(l):g.push(l),l.observers&&Y(l)),o||(l.state=y)}if(c.length>1e6)throw c=[],new Error},!1)),t}function N(e){if(!e.fn)return;P(e);const t=p,s=f,n=m;f=p=e,he(e,e.value,n),f=s,p=t}function he(e,t,s){let n;try{n=e.fn(t)}catch(i){return e.pure&&(e.state=y,e.owned&&e.owned.forEach(P),e.owned=null),e.updatedAt=s+1,D(i)}(!e.updatedAt||e.updatedAt<=s)&&(e.updatedAt!=null&&"observers"in e?Q(e,n):e.value=n,e.updatedAt=s)}function Z(e,t,s,n=y,i){const l={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:p,context:null,pure:s};return p===null||p!==q&&(p.owned?p.owned.push(l):p.owned=[l]),l}function A(e){if(e.state===0)return;if(e.state===S)return E(e);if(e.suspense&&C(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<m);)e.state&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===y)N(e);else if(e.state===S){const n=c;c=null,v(()=>E(e,t[0]),!1),c=n}}function v(e,t){if(c)return e();let s=!1;t||(c=[]),g?s=!0:g=[],m++;try{const n=e();return pe(s),n}catch(n){s||(g=null),c=null,D(n)}}function pe(e){if(c&&(X(c),c=null),e)return;const t=g;g=null,t.length&&v(()=>W(t),!1)}function X(e){for(let t=0;t<e.length;t++)A(e[t])}function de(e){let t,s=0;for(t=0;t<e.length;t++){const n=e[t];n.user?e[s++]=n:A(n)}for(t=0;t<s;t++)A(e[t])}function E(e,t){e.state=0;for(let s=0;s<e.sources.length;s+=1){const n=e.sources[s];if(n.sources){const i=n.state;i===y?n!==t&&(!n.updatedAt||n.updatedAt<m)&&A(n):i===S&&E(n,t)}}}function Y(e){for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];s.state||(s.state=S,s.pure?c.push(s):g.push(s),s.observers&&Y(s))}}function P(e){let t;if(e.sources)for(;e.sources.length;){const s=e.sources.pop(),n=e.sourceSlots.pop(),i=s.observers;if(i&&i.length){const l=i.pop(),o=s.observerSlots.pop();n<i.length&&(l.sourceSlots[o]=n,i[n]=l,s.observerSlots[n]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)P(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function D(e){throw e}function z(e,t){return C(()=>e(t||{}))}function ge(e,t,s){let n=s.length,i=t.length,l=n,o=0,r=0,u=t[i-1].nextSibling,h=null;for(;o<i||r<l;){if(t[o]===s[r]){o++,r++;continue}for(;t[i-1]===s[l-1];)i--,l--;if(i===o){const a=l<n?r?s[r-1].nextSibling:s[l-r]:u;for(;r<l;)e.insertBefore(s[r++],a)}else if(l===r)for(;o<i;)(!h||!h.has(t[o]))&&t[o].remove(),o++;else if(t[o]===s[l-1]&&s[r]===t[i-1]){const a=t[--i].nextSibling;e.insertBefore(s[r++],t[o++].nextSibling),e.insertBefore(s[--l],a),t[i]=s[l]}else{if(!h){h=new Map;let d=r;for(;d<l;)h.set(s[d],d++)}const a=h.get(t[o]);if(a!=null)if(r<a&&a<l){let d=o,j=1,k;for(;++d<i&&d<l&&!((k=h.get(t[d]))==null||k!==a+j);)j++;if(j>a-r){const ie=t[o];for(;r<a;)e.insertBefore(s[r++],ie)}else e.replaceChild(s[r++],t[o++])}else o++;else t[o++].remove()}}}function ye(e,t,s,n={}){let i;return G(l=>{i=l,t===document?e():V(t,e(),t.firstChild?null:void 0,s)},n.owner),()=>{i(),t.textContent=""}}function ee(e,t,s){let n;const i=()=>{const o=document.createElement("template");return o.innerHTML=e,s?o.content.firstChild.firstChild:o.content.firstChild},l=t?()=>(n||(n=i())).cloneNode(!0):()=>C(()=>document.importNode(n||(n=i()),!0));return l.cloneNode=l,l}function be(e,t,s){return C(()=>e(t,s))}function V(e,t,s,n){if(s!==void 0&&!n&&(n=[]),typeof t!="function")return x(e,t,n,s);K(i=>x(e,t(),i,s),n)}function x(e,t,s,n,i){for(;typeof s=="function";)s=s();if(t===s)return s;const l=typeof t,o=n!==void 0;if(e=o&&s[0]&&s[0].parentNode||e,l==="string"||l==="number")if(l==="number"&&(t=t.toString()),o){let r=s[0];r&&r.nodeType===3?r.data=t:r=document.createTextNode(t),s=_(e,s,n,r)}else s!==""&&typeof s=="string"?s=e.firstChild.data=t:s=e.textContent=t;else if(t==null||l==="boolean")s=_(e,s,n);else{if(l==="function")return K(()=>{let r=t();for(;typeof r=="function";)r=r();s=x(e,r,s,n)}),()=>s;if(Array.isArray(t)){const r=[],u=s&&Array.isArray(s);if(B(r,t,s,i))return K(()=>s=x(e,r,s,n,!0)),()=>s;if(r.length===0){if(s=_(e,s,n),o)return s}else u?s.length===0?H(e,r,n):ge(e,s,r):(s&&_(e),H(e,r));s=r}else if(t instanceof Node){if(Array.isArray(s)){if(o)return s=_(e,s,n,t);_(e,s,null,t)}else s==null||s===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);s=t}else console.warn("Unrecognized value. Skipped inserting",t)}return s}function B(e,t,s,n){let i=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],u=s&&s[l];if(r instanceof Node)e.push(r);else if(!(r==null||r===!0||r===!1))if(Array.isArray(r))i=B(e,r,u)||i;else if(typeof r=="function")if(n){for(;typeof r=="function";)r=r();i=B(e,Array.isArray(r)?r:[r],Array.isArray(u)?u:[u])||i}else e.push(r),i=!0;else{const h=String(r);u&&u.nodeType===3?(u.data=h,e.push(u)):e.push(document.createTextNode(h))}}return i}function H(e,t,s=null){for(let n=0,i=t.length;n<i;n++)e.insertBefore(t[n],s)}function _(e,t,s,n){if(s===void 0)return e.textContent="";const i=n||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(i!==r){const u=r.parentNode===e;!l&&!o?u?e.replaceChild(i,r):e.insertBefore(i,s):u&&r.remove()}else l=!0}}else e.insertBefore(i,s);return[i]}function _e(e){return Object.keys(e).reduce((s,n)=>{const i=e[n];return s[n]=Object.assign({},i),se(i.value)&&!Ae(i.value)&&!Array.isArray(i.value)&&(s[n].value=Object.assign({},i.value)),Array.isArray(i.value)&&(s[n].value=i.value.slice(0)),s},{})}function Ce(e){return e?Object.keys(e).reduce((s,n)=>{const i=e[n];return s[n]=se(i)&&"value"in i?i:{value:i},s[n].attribute||(s[n].attribute=Se(n)),s[n].parse="parse"in s[n]?s[n].parse:typeof s[n].value!="string",s},{}):{}}function we(e){return Object.keys(e).reduce((s,n)=>(s[n]=e[n].value,s),{})}function ve(e,t){const s=_e(t);return Object.keys(t).forEach(i=>{const l=s[i],o=e.getAttribute(l.attribute),r=e[i];o&&(l.value=l.parse?te(o):o),r!=null&&(l.value=Array.isArray(r)?r.slice(0):r),l.reflect&&I(e,l.attribute,l.value),Object.defineProperty(e,i,{get(){return l.value},set(u){const h=l.value;l.value=u,l.reflect&&I(this,l.attribute,l.value);for(let a=0,d=this.__propertyChangedCallbacks.length;a<d;a++)this.__propertyChangedCallbacks[a](i,u,h)},enumerable:!0,configurable:!0})}),s}function te(e){if(e)try{return JSON.parse(e)}catch{return e}}function I(e,t,s){if(s==null||s===!1)return e.removeAttribute(t);let n=JSON.stringify(s);e.__updating[t]=!0,n==="true"&&(n=""),e.setAttribute(t,n),Promise.resolve().then(()=>delete e.__updating[t])}function Se(e){return e.replace(/\.?([A-Z]+)/g,(t,s)=>"-"+s.toLowerCase()).replace("_","-").replace(/^-/,"")}function se(e){return e!=null&&(typeof e=="object"||typeof e=="function")}function Ae(e){return Object.prototype.toString.call(e)==="[object Function]"}function Ee(e){return typeof e=="function"&&e.toString().indexOf("class")===0}let R;function xe(e,t){const s=Object.keys(t);return class extends e{static get observedAttributes(){return s.map(i=>t[i].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=ve(this,t);const i=we(this.props),l=this.Component,o=R;try{R=this,this.__initialized=!0,Ee(l)?new l(i,{element:this}):l(i,{element:this})}finally{R=o}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let i=null;for(;i=this.__releaseCallbacks.pop();)i(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(i,l,o){if(this.__initialized&&!this.__updating[i]&&(i=this.lookupProp(i),i in t)){if(o==null&&!this[i])return;this[i]=t[i].parse?te(o):o}}lookupProp(i){if(t)return s.find(l=>i===l||i===t[l].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(i){this.__releaseCallbacks.push(i)}addPropertyChangedCallback(i){this.__propertyChangedCallbacks.push(i)}}}function Oe(e,t={},s={}){const{BaseElement:n=HTMLElement,extension:i}=s;return l=>{if(!e)throw new Error("tag is required to register a Component");let o=customElements.get(e);return o?(o.prototype.Component=l,o):(o=xe(n,Ce(t)),o.prototype.Component=l,o.prototype.registeredTag=e,customElements.define(e,o,i),o)}}function me(e){const t=Object.keys(e),s={};for(let n=0;n<t.length;n++){const[i,l]=ue(e[t[n]]);Object.defineProperty(s,t[n],{get:i,set(o){l(()=>o)}})}return s}function Ne(e){if(e.assignedSlot&&e.assignedSlot._$owner)return e.assignedSlot._$owner;let t=e.parentNode;for(;t&&!t._$owner&&!(t.assignedSlot&&t.assignedSlot._$owner);)t=t.parentNode;return t&&t.assignedSlot?t.assignedSlot._$owner:e._$owner}function Pe(e){return(t,s)=>{const{element:n}=s;return G(i=>{const l=me(t);n.addPropertyChangedCallback((r,u)=>l[r]=u),n.addReleaseCallback(()=>{n.renderRoot.textContent="",i()});const o=e(l,s);return V(n.renderRoot,o)},Ne(n))}}function je(e,t,s){return arguments.length===2&&(s=t,t={}),Oe(e,t)(Pe(s))}const Te=`.verify-container{line-height:0}
`,$e=ee('<div class="verify-container"><canvas>'),Re=ee("<style>"),J=({component:e})=>{let t={};return ce(()=>{const s=t.getContext("2d"),n=t.width,i=t.height;s.fillStyle="cyan",s.fillRect(0,0,n,i)}),[e?(()=>{const s=Re();return V(s,Te),s})():null,(()=>{const s=$e(),n=s.firstChild,i=t;return typeof i=="function"?be(i,n):t=n,s})()]};var b,O;class ne{constructor({component:t=!1,componentName:s="cyanery-verify",root:n=null,width:i=400,height:l=200}){T(this,b,null);L(this,"renderVerify",()=>this.root?(w(this,b)&&w(this,b).call(this),M(this,b,ye(()=>z(J,{component:!1}),this.root)),w(this,b)):new Error("Verify need root Element"));T(this,O,t=>{je(t,{},()=>z(J,{component:!0}))});this.root=n,this.width=i,this.height=l,t&&w(this,O).call(this,s)}}b=new WeakMap,O=new WeakMap;exports.Verify=ne;exports.default=ne;