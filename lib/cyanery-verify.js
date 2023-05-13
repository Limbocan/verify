var De = Object.defineProperty;
var Me = (e, t, i) => t in e ? De(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var M = (e, t, i) => (Me(e, typeof t != "symbol" ? t + "" : t, i), i), _e = (e, t, i) => {
  if (!t.has(e))
    throw TypeError("Cannot " + i);
};
var m = (e, t, i) => (_e(e, t, "read from private field"), i ? i.call(e) : t.get(e)), L = (e, t, i) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, i);
}, ne = (e, t, i, r) => (_e(e, t, "write to private field"), r ? r.call(e, i) : t.set(e, i), i);
const Ue = (e, t) => e === t, fe = Symbol("solid-proxy"), G = {
  equals: Ue
};
let Ee = Te;
const S = 1, I = 2, Ae = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var g = null;
let se = null, h = null, y = null, $ = null, Z = 0;
function Pe(e, t) {
  const i = h, r = g, n = e.length === 0, s = n ? Ae : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? r : t
  }, o = n ? e : () => e(() => T(() => ee(s)));
  g = s, h = null;
  try {
    return V(o, !0);
  } finally {
    h = i, g = r;
  }
}
function E(e, t) {
  t = t ? Object.assign({}, G, t) : G;
  const i = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (n) => (typeof n == "function" && (n = n(i.value)), ke(i, n));
  return [Oe.bind(i), r];
}
function P(e, t, i) {
  const r = ue(e, t, !1, S);
  R(r);
}
function Le(e, t, i) {
  Ee = We;
  const r = ue(e, t, !1, S);
  (!i || !i.render) && (r.user = !0), $ ? $.push(r) : R(r);
}
function ce(e, t, i) {
  i = i ? Object.assign({}, G, i) : G;
  const r = ue(e, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = i.equals || void 0, R(r), Oe.bind(r);
}
function T(e) {
  if (h === null)
    return e();
  const t = h;
  h = null;
  try {
    return e();
  } finally {
    h = t;
  }
}
function Ge(e) {
  Le(() => T(e));
}
function Ie() {
  return g;
}
function Oe() {
  if (this.sources && this.state)
    if (this.state === S)
      R(this);
    else {
      const e = y;
      y = null, V(() => H(this), !1), y = e;
    }
  if (h) {
    const e = this.observers ? this.observers.length : 0;
    h.sources ? (h.sources.push(this), h.sourceSlots.push(e)) : (h.sources = [this], h.sourceSlots = [e]), this.observers ? (this.observers.push(h), this.observerSlots.push(h.sources.length - 1)) : (this.observers = [h], this.observerSlots = [h.sources.length - 1]);
  }
  return this.value;
}
function ke(e, t, i) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && V(() => {
    for (let n = 0; n < e.observers.length; n += 1) {
      const s = e.observers[n], o = se && se.running;
      o && se.disposed.has(s), (o ? !s.tState : !s.state) && (s.pure ? y.push(s) : $.push(s), s.observers && Ne(s)), o || (s.state = S);
    }
    if (y.length > 1e6)
      throw y = [], new Error();
  }, !1)), t;
}
function R(e) {
  if (!e.fn)
    return;
  ee(e);
  const t = g, i = h, r = Z;
  h = g = e, qe(e, e.value, r), h = i, g = t;
}
function qe(e, t, i) {
  let r;
  try {
    r = e.fn(t);
  } catch (n) {
    return e.pure && (e.state = S, e.owned && e.owned.forEach(ee), e.owned = null), e.updatedAt = i + 1, je(n);
  }
  (!e.updatedAt || e.updatedAt <= i) && (e.updatedAt != null && "observers" in e ? ke(e, r) : e.value = r, e.updatedAt = i);
}
function ue(e, t, i, r = S, n) {
  const s = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: g,
    context: null,
    pure: i
  };
  return g === null || g !== Ae && (g.owned ? g.owned.push(s) : g.owned = [s]), s;
}
function q(e) {
  if (e.state === 0)
    return;
  if (e.state === I)
    return H(e);
  if (e.suspense && T(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Z); )
    e.state && t.push(e);
  for (let i = t.length - 1; i >= 0; i--)
    if (e = t[i], e.state === S)
      R(e);
    else if (e.state === I) {
      const r = y;
      y = null, V(() => H(e, t[0]), !1), y = r;
    }
}
function V(e, t) {
  if (y)
    return e();
  let i = !1;
  t || (y = []), $ ? i = !0 : $ = [], Z++;
  try {
    const r = e();
    return He(i), r;
  } catch (r) {
    i || ($ = null), y = null, je(r);
  }
}
function He(e) {
  if (y && (Te(y), y = null), e)
    return;
  const t = $;
  $ = null, t.length && V(() => Ee(t), !1);
}
function Te(e) {
  for (let t = 0; t < e.length; t++)
    q(e[t]);
}
function We(e) {
  let t, i = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? e[i++] = r : q(r);
  }
  for (t = 0; t < i; t++)
    q(e[t]);
}
function H(e, t) {
  e.state = 0;
  for (let i = 0; i < e.sources.length; i += 1) {
    const r = e.sources[i];
    if (r.sources) {
      const n = r.state;
      n === S ? r !== t && (!r.updatedAt || r.updatedAt < Z) && q(r) : n === I && H(r, t);
    }
  }
}
function Ne(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const i = e.observers[t];
    i.state || (i.state = I, i.pure ? y.push(i) : $.push(i), i.observers && Ne(i));
  }
}
function ee(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const i = e.sources.pop(), r = e.sourceSlots.pop(), n = i.observers;
      if (n && n.length) {
        const s = n.pop(), o = i.observerSlots.pop();
        r < n.length && (s.sourceSlots[o] = r, n[r] = s, i.observerSlots[r] = o);
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--)
      ee(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function je(e) {
  throw e;
}
function k(e, t) {
  return T(() => e(t || {}));
}
function U() {
  return !0;
}
const Je = {
  get(e, t, i) {
    return t === fe ? i : e.get(t);
  },
  has(e, t) {
    return t === fe ? !0 : e.has(t);
  },
  set: U,
  deleteProperty: U,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: U,
      deleteProperty: U
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function oe(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Y(...e) {
  let t = !1;
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    t = t || !!n && fe in n, e[r] = typeof n == "function" ? (t = !0, ce(n)) : n;
  }
  if (t)
    return new Proxy({
      get(r) {
        for (let n = e.length - 1; n >= 0; n--) {
          const s = oe(e[n])[r];
          if (s !== void 0)
            return s;
        }
      },
      has(r) {
        for (let n = e.length - 1; n >= 0; n--)
          if (r in oe(e[n]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let n = 0; n < e.length; n++)
          r.push(...Object.keys(oe(e[n])));
        return [...new Set(r)];
      }
    }, Je);
  const i = {};
  for (let r = e.length - 1; r >= 0; r--)
    if (e[r]) {
      const n = Object.getOwnPropertyDescriptors(e[r]);
      for (const s in n)
        s in i || Object.defineProperty(i, s, {
          enumerable: !0,
          get() {
            for (let o = e.length - 1; o >= 0; o--) {
              const l = (e[o] || {})[s];
              if (l !== void 0)
                return l;
            }
          }
        });
    }
  return i;
}
function Qe(e, t, i) {
  let r = i.length, n = t.length, s = r, o = 0, l = 0, c = t[n - 1].nextSibling, f = null;
  for (; o < n || l < s; ) {
    if (t[o] === i[l]) {
      o++, l++;
      continue;
    }
    for (; t[n - 1] === i[s - 1]; )
      n--, s--;
    if (n === o) {
      const a = s < r ? l ? i[l - 1].nextSibling : i[s - l] : c;
      for (; l < s; )
        e.insertBefore(i[l++], a);
    } else if (s === l)
      for (; o < n; )
        (!f || !f.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === i[s - 1] && i[l] === t[n - 1]) {
      const a = t[--n].nextSibling;
      e.insertBefore(i[l++], t[o++].nextSibling), e.insertBefore(i[--s], a), t[n] = i[s];
    } else {
      if (!f) {
        f = /* @__PURE__ */ new Map();
        let v = l;
        for (; v < s; )
          f.set(i[v], v++);
      }
      const a = f.get(t[o]);
      if (a != null)
        if (l < a && a < s) {
          let v = o, d = 1, _;
          for (; ++v < n && v < s && !((_ = f.get(t[v])) == null || _ !== a + d); )
            d++;
          if (d > a - l) {
            const w = t[o];
            for (; l < a; )
              e.insertBefore(i[l++], w);
          } else
            e.replaceChild(i[l++], t[o++]);
        } else
          o++;
      else
        t[o++].remove();
    }
  }
}
const we = "_$DX_DELEGATE";
function Ze(e, t, i, r = {}) {
  let n;
  return Pe((s) => {
    n = s, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, i);
  }, r.owner), () => {
    n(), t.textContent = "";
  };
}
function N(e, t, i) {
  let r;
  const n = () => {
    const o = document.createElement("template");
    return o.innerHTML = e, i ? o.content.firstChild.firstChild : o.content.firstChild;
  }, s = t ? () => (r || (r = n())).cloneNode(!0) : () => T(() => document.importNode(r || (r = n()), !0));
  return s.cloneNode = s, s;
}
function et(e, t = window.document) {
  const i = t[we] || (t[we] = /* @__PURE__ */ new Set());
  for (let r = 0, n = e.length; r < n; r++) {
    const s = e[r];
    i.has(s) || (i.add(s), t.addEventListener(s, tt));
  }
}
function b(e, t, i) {
  i == null ? e.removeAttribute(t) : e.setAttribute(t, i);
}
function Xe(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function Fe(e, t, i) {
  if (!t)
    return i ? b(e, "style") : t;
  const r = e.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof i == "string" && (r.cssText = i = void 0), i || (i = {}), t || (t = {});
  let n, s;
  for (s in i)
    t[s] == null && r.removeProperty(s), delete i[s];
  for (s in t)
    n = t[s], n !== i[s] && (r.setProperty(s, n), i[s] = n);
  return i;
}
function xe(e, t, i) {
  return T(() => e(t, i));
}
function C(e, t, i, r) {
  if (i !== void 0 && !r && (r = []), typeof t != "function")
    return W(e, t, r, i);
  P((n) => W(e, t(), n, i), r);
}
function tt(e) {
  const t = `$$${e.type}`;
  let i = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== i && Object.defineProperty(e, "target", {
    configurable: !0,
    value: i
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return i || document;
    }
  }); i; ) {
    const r = i[t];
    if (r && !i.disabled) {
      const n = i[`${t}Data`];
      if (n !== void 0 ? r.call(i, n, e) : r.call(i, e), e.cancelBubble)
        return;
    }
    i = i._$host || i.parentNode || i.host;
  }
}
function W(e, t, i, r, n) {
  for (; typeof i == "function"; )
    i = i();
  if (t === i)
    return i;
  const s = typeof t, o = r !== void 0;
  if (e = o && i[0] && i[0].parentNode || e, s === "string" || s === "number")
    if (s === "number" && (t = t.toString()), o) {
      let l = i[0];
      l && l.nodeType === 3 ? l.data = t : l = document.createTextNode(t), i = O(e, i, r, l);
    } else
      i !== "" && typeof i == "string" ? i = e.firstChild.data = t : i = e.textContent = t;
  else if (t == null || s === "boolean")
    i = O(e, i, r);
  else {
    if (s === "function")
      return P(() => {
        let l = t();
        for (; typeof l == "function"; )
          l = l();
        i = W(e, l, i, r);
      }), () => i;
    if (Array.isArray(t)) {
      const l = [], c = i && Array.isArray(i);
      if (ae(l, t, i, n))
        return P(() => i = W(e, l, i, r, !0)), () => i;
      if (l.length === 0) {
        if (i = O(e, i, r), o)
          return i;
      } else
        c ? i.length === 0 ? me(e, l, r) : Qe(e, i, l) : (i && O(e), me(e, l));
      i = l;
    } else if (t instanceof Node) {
      if (Array.isArray(i)) {
        if (o)
          return i = O(e, i, r, t);
        O(e, i, null, t);
      } else
        i == null || i === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      i = t;
    } else
      console.warn("Unrecognized value. Skipped inserting", t);
  }
  return i;
}
function ae(e, t, i, r) {
  let n = !1;
  for (let s = 0, o = t.length; s < o; s++) {
    let l = t[s], c = i && i[s];
    if (l instanceof Node)
      e.push(l);
    else if (!(l == null || l === !0 || l === !1))
      if (Array.isArray(l))
        n = ae(e, l, c) || n;
      else if (typeof l == "function")
        if (r) {
          for (; typeof l == "function"; )
            l = l();
          n = ae(e, Array.isArray(l) ? l : [l], Array.isArray(c) ? c : [c]) || n;
        } else
          e.push(l), n = !0;
      else {
        const f = String(l);
        c && c.nodeType === 3 ? (c.data = f, e.push(c)) : e.push(document.createTextNode(f));
      }
  }
  return n;
}
function me(e, t, i = null) {
  for (let r = 0, n = t.length; r < n; r++)
    e.insertBefore(t[r], i);
}
function O(e, t, i, r) {
  if (i === void 0)
    return e.textContent = "";
  const n = r || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const l = t[o];
      if (n !== l) {
        const c = l.parentNode === e;
        !s && !o ? c ? e.replaceChild(n, l) : e.insertBefore(n, i) : c && l.remove();
      } else
        s = !0;
    }
  } else
    e.insertBefore(n, i);
  return [n];
}
function it(e) {
  return Object.keys(e).reduce((i, r) => {
    const n = e[r];
    return i[r] = Object.assign({}, n), Be(n.value) && !lt(n.value) && !Array.isArray(n.value) && (i[r].value = Object.assign({}, n.value)), Array.isArray(n.value) && (i[r].value = n.value.slice(0)), i;
  }, {});
}
function rt(e) {
  return e ? Object.keys(e).reduce((i, r) => {
    const n = e[r];
    return i[r] = Be(n) && "value" in n ? n : {
      value: n
    }, i[r].attribute || (i[r].attribute = ot(r)), i[r].parse = "parse" in i[r] ? i[r].parse : typeof i[r].value != "string", i;
  }, {}) : {};
}
function nt(e) {
  return Object.keys(e).reduce((i, r) => (i[r] = e[r].value, i), {});
}
function st(e, t) {
  const i = it(t);
  return Object.keys(t).forEach((n) => {
    const s = i[n], o = e.getAttribute(s.attribute), l = e[n];
    o && (s.value = s.parse ? ze(o) : o), l != null && (s.value = Array.isArray(l) ? l.slice(0) : l), s.reflect && $e(e, s.attribute, s.value), Object.defineProperty(e, n, {
      get() {
        return s.value;
      },
      set(c) {
        const f = s.value;
        s.value = c, s.reflect && $e(this, s.attribute, s.value);
        for (let a = 0, v = this.__propertyChangedCallbacks.length; a < v; a++)
          this.__propertyChangedCallbacks[a](n, c, f);
      },
      enumerable: !0,
      configurable: !0
    });
  }), i;
}
function ze(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function $e(e, t, i) {
  if (i == null || i === !1)
    return e.removeAttribute(t);
  let r = JSON.stringify(i);
  e.__updating[t] = !0, r === "true" && (r = ""), e.setAttribute(t, r), Promise.resolve().then(() => delete e.__updating[t]);
}
function ot(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, i) => "-" + i.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function Be(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function lt(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function ft(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let le;
function ct(e, t) {
  const i = Object.keys(t);
  return class extends e {
    static get observedAttributes() {
      return i.map((n) => t[n].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = st(this, t);
      const n = nt(this.props), s = this.Component, o = le;
      try {
        le = this, this.__initialized = !0, ft(s) ? new s(n, {
          element: this
        }) : s(n, {
          element: this
        });
      } finally {
        le = o;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let n = null;
      for (; n = this.__releaseCallbacks.pop(); )
        n(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(n, s, o) {
      if (this.__initialized && !this.__updating[n] && (n = this.lookupProp(n), n in t)) {
        if (o == null && !this[n])
          return;
        this[n] = t[n].parse ? ze(o) : o;
      }
    }
    lookupProp(n) {
      if (t)
        return i.find((s) => n === s || n === t[s].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(n) {
      this.__releaseCallbacks.push(n);
    }
    addPropertyChangedCallback(n) {
      this.__propertyChangedCallbacks.push(n);
    }
  };
}
function at(e, t = {}, i = {}) {
  const {
    BaseElement: r = HTMLElement,
    extension: n
  } = i;
  return (s) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let o = customElements.get(e);
    return o ? (o.prototype.Component = s, o) : (o = ct(r, rt(t)), o.prototype.Component = s, o.prototype.registeredTag = e, customElements.define(e, o, n), o);
  };
}
function ut(e) {
  const t = Object.keys(e), i = {};
  for (let r = 0; r < t.length; r++) {
    const [n, s] = E(e[t[r]]);
    Object.defineProperty(i, t[r], {
      get: n,
      set(o) {
        s(() => o);
      }
    });
  }
  return i;
}
function dt(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let t = e.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function ht(e) {
  return (t, i) => {
    const { element: r } = i;
    return Pe((n) => {
      const s = ut(t);
      r.addPropertyChangedCallback((l, c) => s[l] = c), r.addReleaseCallback(() => {
        r.renderRoot.textContent = "", n();
      });
      const o = e(s, i);
      return C(r.renderRoot, o);
    }, dt(r));
  };
}
function vt(e, t, i) {
  return arguments.length === 2 && (i = t, t = {}), at(e, t)(ht(i));
}
var de = /* @__PURE__ */ ((e) => (e.hover = "hover", e.insert = "insert", e))(de || {});
const pt = /* @__PURE__ */ N('<svg><defs><clipPath id="verify-clip-path"><path d="m23.84 13.2202h-1.8838v-5.0828c0-1.3862-1.1374-2.5236-2.5236-2.5236h-5.0828v-1.9194c0-1.7417-1.4218-3.1634-3.1634-3.1634s-3.1634 1.4218-3.1634 3.1634v1.8838h-5.0828c-1.3862 0-2.5236 1.1374-2.5236 2.5236v4.834h1.8838c1.8838 0 3.4122 1.5284 3.4122 3.4122s-1.5284 3.4122-3.4122 3.4122h-1.8838v4.834c0 1.3862 1.1374 2.5236 2.5236 2.5236h4.834v-1.9194c0-1.8838 1.5284-3.4122 3.4122-3.4122s3.4122 1.5284 3.4122 3.4122v1.9194h4.7984c1.3862 0 2.5236-1.1374 2.5236-2.5236v-5.0828h1.9194c1.7417 0 3.1634-1.4218 3.1634-3.1634s-1.3862-3.1279-3.1634-3.1279zm0 0"></path></clipPath><filter id="verify-clip-filter"><feFlood flood-color="#FFF"></feFlood><feComposite in2="SourceAlpha" operator="out"></feComposite><feGaussianBlur stdDeviation="2" result="blur"></feGaussianBlur><feComposite operator="atop" in2="SourceGraphic"></feComposite><feDropShadow flood-opacity="0.5"></svg>', !1, !0), yt = (e) => {
  const t = Y(e);
  return (() => {
    const i = pt(), r = i.firstChild, n = r.nextSibling, s = n.firstChild, o = s.nextSibling, l = o.nextSibling, c = l.nextSibling, f = c.nextSibling;
    return b(f, "dx", 2), b(f, "dy", 2), P(() => b(r, "transform", `translate(${t.x},${t.y}) scale(${t.scale || 1.5})`)), i;
  })();
}, F = (e, t = 0) => {
  if (typeof e == "number")
    return e;
  {
    const i = [void 0, 0, "0", "false"].includes(e) ? "0" : e, r = Number(i.replace(/[^0-9.]/g, ""));
    return isNaN(r) ? t : r;
  }
}, he = (e, t, i, r = 0) => {
  const n = e / 20, s = t();
  if (s - n < r) {
    i(() => r);
    return;
  }
  window.requestAnimationFrame(() => {
    i(() => s - n), he(e, t, i, r);
  });
}, gt = /* @__PURE__ */ N('<div><div class="verify-slide-control"></div><div class="verify-slide-label"><slot name="label">'), bt = (e) => {
  const t = Y(e);
  let i = {}, r = {}, n = 0, s = 0, [o, l] = E(0), [c, f] = E(0), [a, v] = E(0), [d, _] = E(!0);
  Ge(() => {
    l(() => r ? r.getBoundingClientRect().width : 0), i.addEventListener("mouseenter", w), i.addEventListener("mouseleave", K);
  });
  const w = () => i.classList.add("verify-slide-box-hover-active"), K = () => {
    s === 0 && i.classList.remove("verify-slide-box-hover-active");
  }, j = (u) => {
    const p = ve(u);
    v(() => p), t.update(p);
  }, X = (u) => {
    _(() => !1), window.removeEventListener("mouseup", X), window.removeEventListener("mousemove", j), n = (/* @__PURE__ */ new Date()).getTime() - s, t.end(ve(u), n);
  }, Re = (u = !0) => {
    u && (s = 0, i.classList.remove("verify-slide-box-slide-active"), i.classList.remove("verify-slide-box-hover-active"));
  }, Ve = (u) => {
    s = (/* @__PURE__ */ new Date()).getTime(), d() && f(() => u.screenX), i.classList.add("verify-slide-box-slide-active"), window.addEventListener("mouseup", X), window.addEventListener("mousemove", j);
  }, ve = (u) => {
    let p = u.screenX - c(), D = t.width - o();
    return p = p <= 0 ? 0 : p >= D ? D : p, p;
  }, te = (u = "add", p) => {
    u === "add" ? i.classList.add(p) : u === "remove" && i.classList.remove(p);
  }, Ye = () => {
    setTimeout(() => {
      te("remove", "verify-slide-faile"), te("remove", "verify-slide-success");
    }, 300), f(() => 0), he(t.width, a, v), _(() => !0);
  };
  return t.ref({
    resetSlide: Ye,
    slideEndAfter: Re,
    setSlideBoxClass: te
  }), (() => {
    const u = gt(), p = u.firstChild, D = p.nextSibling, pe = D.firstChild, ye = i;
    typeof ye == "function" ? xe(ye, u) : i = u, C(u, () => t.children, p), p.$$mousedown = Ve;
    const ge = r;
    return typeof ge == "function" ? xe(ge, p) : r = p, pe._$owner = Ie(), C(pe, () => t.slideLabel), P((x) => {
      const be = `verify-slide-box ${t.trigger === de.insert ? "verify-slide-box-insert" : "verify-slide-box-hover"}`, ie = t.width + "px", re = t.height + "px", Ke = `--verify-slide-control-x: ${a()}px`;
      return be !== x._v$ && Xe(u, x._v$ = be), ie !== x._v$2 && ((x._v$2 = ie) != null ? u.style.setProperty("--verify-slide-box-width", ie) : u.style.removeProperty("--verify-slide-box-width")), re !== x._v$3 && ((x._v$3 = re) != null ? u.style.setProperty("--verify-slide-svg-height", re) : u.style.removeProperty("--verify-slide-svg-height")), x._v$4 = Fe(p, Ke, x._v$4), x;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), u;
  })();
};
et(["mousedown"]);
const _t = /* @__PURE__ */ N('<svg><foreignObject x="0" y="0"><div></svg>', !1, !0), Ce = (e) => {
  const t = Y(e);
  return (() => {
    const i = _t(), r = i.firstChild;
    return P((n) => {
      const s = F(t.width), o = F(t.height), l = t.clip, c = `verify-background-image ${t.loading === !0 ? "verify-image-loading" : ""} ${t.clip ? "verify-image-clip" : ""}`, f = `background-image: url(${t.src});${t.repeat === !1 ? "background-repeat: no-repeat" : ""}`;
      return s !== n._v$ && b(i, "width", n._v$ = s), o !== n._v$2 && b(i, "height", n._v$2 = o), l !== n._v$3 && b(i, "clip-path", n._v$3 = l), c !== n._v$4 && Xe(r, n._v$4 = c), n._v$5 = Fe(r, f, n._v$5), n;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0
    }), i;
  })();
}, wt = /* @__PURE__ */ N('<svg class="verify-slide-svg"><rect x="0" clip-path="url(#verify-clip-path)" fill="#FFF"></rect><g filter="url(#verify-clip-filter)">'), xt = (e) => {
  const t = Y(e), i = () => F(t.props.verifyX), r = () => F(t.props.verifyY);
  let n = {};
  const [s, o] = E(-i());
  return Le(() => {
    o(() => -i());
  }), k(bt, {
    ref(f) {
      const a = n;
      typeof a == "function" ? a(f) : n = f;
    },
    get width() {
      return t.props.width;
    },
    get height() {
      return t.props.height;
    },
    update: (f) => {
      o(() => f - i());
    },
    end: (f, a) => {
      const v = Math.abs(f - i()), d = v > F(t.props.deviation);
      d ? n.setSlideBoxClass("add", "verify-slide-faile") : n.setSlideBoxClass("add", "verify-slide-success");
      const _ = (w = !0) => {
        d && w && (n.resetSlide(), he(t.props.width, s, o, -i())), n.slideEndAfter(w);
      };
      t.props.verifyEnd instanceof Function ? t.props.verifyEnd(_, v, a) : _(!0);
    },
    get slideLabel() {
      return t.props.slideLabel;
    },
    get trigger() {
      return t.props.trigger;
    },
    get children() {
      const f = wt(), a = f.firstChild, v = a.nextSibling;
      return C(f, k(yt, {
        get x() {
          return i();
        },
        get y() {
          return r();
        },
        scale: 1.5
      }), a), C(f, k(Ce, {
        get src() {
          return t.props.image;
        },
        get width() {
          return t.props.width;
        },
        get height() {
          return t.props.height;
        },
        get loading() {
          return t.props.loading;
        }
      }), a), C(v, k(Ce, {
        get src() {
          return t.props.image;
        },
        get width() {
          return t.props.width;
        },
        get height() {
          return t.props.height;
        },
        get loading() {
          return t.props.loading;
        },
        clip: "url(#verify-clip-path)"
      })), P((d) => {
        const _ = t.props.width, w = t.props.height, K = t.props.width, j = t.props.height, X = `translate(${s()}, 0)`;
        return _ !== d._v$ && b(f, "width", d._v$ = _), w !== d._v$2 && b(f, "height", d._v$2 = w), K !== d._v$3 && b(a, "width", d._v$3 = K), j !== d._v$4 && b(a, "height", d._v$4 = j), X !== d._v$5 && b(v, "transform", d._v$5 = X), d;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0,
        _v$4: void 0,
        _v$5: void 0
      }), f;
    }
  });
};
const mt = `.verify-container{--slide-control-size: 30px;--verify-slide-control-color: #fff;--verify-slide-control-active-color: #257ce6e1;--verify-success-color: rgba(65, 216, 85, .795);--verify-faile-color: rgba(216, 65, 65, .795);position:relative;line-height:0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.verify-container .verify-background-image{width:100%;height:100%}.verify-container .verify-background-image.verify-image-loading{--verify-loading-size: 40px;position:relative}.verify-container .verify-background-image.verify-image-loading:before{content:"";display:flex;width:100%;height:100%;background-color:#fff9}.verify-container .verify-background-image.verify-image-loading:after{content:"";position:absolute;display:block;top:calc(50% - var(--verify-loading-size) / 2);left:calc(50% - var(--verify-loading-size) / 2);width:var(--verify-loading-size);height:var(--verify-loading-size);background-color:#333;animation:verify-rotateplane 1s infinite ease-in-out;z-index:10}.verify-container .verify-background-image.verify-image-loading.verify-image-clip{opacity:.2}.verify-container .verify-slide-box{position:relative;width:var(--verify-slide-box-width);background-color:#878787}.verify-container .verify-slide-box .verify-slide-control{--verify-slide-control-x: 0;position:relative;display:inline-block;width:var(--slide-control-size);height:var(--slide-control-size);background-color:var(--verify-slide-control-color);cursor:pointer;box-shadow:1px 1px 2px 1px #00000024;transform:translate(var(--verify-slide-control-x));transition:background-color .2s ease-in-out}.verify-container .verify-slide-box .verify-slide-control:hover,.verify-container .verify-slide-box .verify-slide-control:focus,.verify-container .verify-slide-box .verify-slide-control:active{background-color:var(--verify-slide-control-active-color)}.verify-container .verify-slide-box .verify-slide-control:before{content:"";position:absolute;left:calc(var(--verify-slide-control-x) * -1);right:var(--slide-control-size);height:100%;box-shadow:inset 1px 0 var(--verify-slide-control-active-color),inset 0 -1px var(--verify-slide-control-active-color),inset 0 1px var(--verify-slide-control-active-color)}.verify-container .verify-slide-box .verify-slide-label{position:absolute;left:0;bottom:0;width:100%;height:var(--slide-control-size);display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:1;color:#323336e6;font-size:12px;transition:opacity .2s ease-in-out}.verify-container .verify-slide-box.verify-slide-box-slide-active .verify-slide-label{opacity:0}.verify-container .verify-slide-box.verify-slide-success .verify-slide-control{background-color:var(--verify-success-color)}.verify-container .verify-slide-box.verify-slide-success .verify-slide-control:before{box-shadow:inset 1px 0 var(--verify-success-color),inset 0 -1px var(--verify-success-color),inset 0 1px var(--verify-success-color)}.verify-container .verify-slide-box.verify-slide-faile .verify-slide-control{background-color:var(--verify-faile-color)}.verify-container .verify-slide-box.verify-slide-faile .verify-slide-control:before{box-shadow:inset 1px 0 var(--verify-faile-color),inset 0 -1px var(--verify-faile-color),inset 0 1px var(--verify-faile-color)}.verify-container .verify-slide-box.verify-slide-box-hover{height:30px}.verify-container .verify-slide-box.verify-slide-box-hover .verify-slide-svg{position:absolute;top:0;opacity:0;height:0;transition:top .5s ease-in-out,opacity .5s ease-in-out,height .5s ease-in-out}.verify-container .verify-slide-box.verify-slide-box-hover.verify-slide-box-hover-active .verify-slide-svg{top:calc(var(--verify-slide-svg-height) * -1);height:var(--verify-slide-svg-height);opacity:1}@keyframes verify-rotateplane{0%{transform:perspective(120px) rotateX(0) rotateY(0)}50%{transform:perspective(120px) rotateX(-180.1deg) rotateY(0)}to{transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}
`, $t = /* @__PURE__ */ N('<div class="verify-container">'), Ct = /* @__PURE__ */ N("<style>"), St = (e) => {
  const t = Y(e);
  let i = {};
  return t.ref({}), [ce((() => {
    const r = ce(() => !!t.component);
    return () => r() ? (() => {
      const n = Ct();
      return C(n, mt), n;
    })() : null;
  })()), (() => {
    const r = $t();
    return C(r, k(xt, {
      ref(n) {
        const s = i;
        typeof s == "function" ? s(n) : i = n;
      },
      props: t
    })), r;
  })()];
}, Se = {
  root: null,
  width: 300,
  height: 200,
  image: "",
  loading: !1,
  component: !1,
  componentName: "cyanery-verify",
  verifyX: 200,
  verifyY: 80,
  slideLabel: "向右拖动滑块",
  deviation: 5,
  trigger: de.insert
};
var z, A, J, Q, B;
class Pt {
  constructor(t) {
    // 根节点
    // 是否componetns
    // components名称
    // 宽度
    // 高度
    // 背景图片
    // loading
    // 校验X位置
    // 校验Y位置
    // 滑动校验文字
    // 校验偏差值
    // 触发方式
    // 校验结束拦截方法
    // AppRef
    L(this, z, void 0);
    // AppInstance
    L(this, A, null);
    // Verify渲染
    L(this, J, () => this.root() ? (m(this, A) && m(this, A).call(this), ne(this, A, Ze(m(this, B), this.root())), m(this, A)) : new Error("Verify need root Element"));
    // 注册web-component
    L(this, Q, (t) => {
      vt(t, {}, m(this, B));
    });
    L(this, B, () => {
      const t = this;
      return k(St, {
        ref(i) {
          const r = m(t, z);
          typeof r == "function" ? r(i) : ne(t, z, i);
        },
        component: !0,
        get width() {
          return t.width();
        },
        get height() {
          return t.height();
        },
        get image() {
          return t.image();
        },
        get loading() {
          return t.loading();
        },
        get verifyX() {
          return t.verifyX();
        },
        get verifyY() {
          return t.verifyY();
        },
        get slideLabel() {
          return t.slideLabel();
        },
        get deviation() {
          return t.deviation();
        },
        get trigger() {
          return t.trigger();
        },
        get verifyEnd() {
          return t.verifyEnd;
        }
      });
    });
    M(this, "updateSlide", (t) => {
      this.update_verifyX(() => t.verifyX || this.verifyX()), this.update_verifyY(() => t.verifyY || this.verifyY()), this.update_width(() => t.width || this.width()), this.update_height(() => t.height || this.height()), this.update_image(() => t.image || this.image());
    });
    // 设置loading
    M(this, "setLoading", (t) => {
      this.update_loading(() => t);
    });
    // 设置loading
    M(this, "setLabel", (t) => {
      this.update_slideLabel(() => t);
    });
    let i = null;
    Object.keys(Se).forEach((r) => {
      i = t[r] !== void 0 ? t[r] : Se[r], [this[r], this[`update_${r}`]] = E(i);
    }), this.verifyEnd = t.verifyEnd, this.component() ? m(this, Q).call(this, this.componentName()) : m(this, J).call(this);
  }
}
z = new WeakMap(), A = new WeakMap(), J = new WeakMap(), Q = new WeakMap(), B = new WeakMap();
export {
  Pt as Verify,
  Pt as default
};
