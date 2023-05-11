var ke = Object.defineProperty;
var Le = (e, t, i) => t in e ? ke(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var he = (e, t, i) => (Le(e, typeof t != "symbol" ? t + "" : t, i), i), pe = (e, t, i) => {
  if (!t.has(e))
    throw TypeError("Cannot " + i);
};
var w = (e, t, i) => (pe(e, t, "read from private field"), i ? i.call(e) : t.get(e)), O = (e, t, i) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, i);
}, ie = (e, t, i, n) => (pe(e, t, "write to private field"), n ? n.call(e, i) : t.set(e, i), i);
const Xe = (e, t) => e === t, oe = Symbol("solid-proxy"), R = {
  equals: Xe
};
let Se = Be;
const x = 1, U = 2, Ce = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var y = null;
let ne = null, a = null, g = null, m = null, K = 0;
function xe(e, t) {
  const i = a, n = y, r = e.length === 0, s = r ? Ce : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t === void 0 ? n : t
  }, l = r ? e : () => e(() => j(() => W(s)));
  y = s, a = null;
  try {
    return M(l, !0);
  } finally {
    a = i, y = n;
  }
}
function E(e, t) {
  t = t ? Object.assign({}, R, t) : R;
  const i = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, n = (r) => (typeof r == "function" && (r = r(i.value)), Pe(i, r));
  return [Ee.bind(i), n];
}
function B(e, t, i) {
  const n = ue(e, t, !1, x);
  Y(n);
}
function _e(e, t, i) {
  Se = ze;
  const n = ue(e, t, !1, x);
  (!i || !i.render) && (n.user = !0), m ? m.push(n) : Y(n);
}
function le(e, t, i) {
  i = i ? Object.assign({}, R, i) : R;
  const n = ue(e, t, !0, 0);
  return n.observers = null, n.observerSlots = null, n.comparator = i.equals || void 0, Y(n), Ee.bind(n);
}
function j(e) {
  if (a === null)
    return e();
  const t = a;
  a = null;
  try {
    return e();
  } finally {
    a = t;
  }
}
function Fe(e) {
  _e(() => j(e));
}
function Ee() {
  if (this.sources && this.state)
    if (this.state === x)
      Y(this);
    else {
      const e = g;
      g = null, M(() => q(this), !1), g = e;
    }
  if (a) {
    const e = this.observers ? this.observers.length : 0;
    a.sources ? (a.sources.push(this), a.sourceSlots.push(e)) : (a.sources = [this], a.sourceSlots = [e]), this.observers ? (this.observers.push(a), this.observerSlots.push(a.sources.length - 1)) : (this.observers = [a], this.observerSlots = [a.sources.length - 1]);
  }
  return this.value;
}
function Pe(e, t, i) {
  let n = e.value;
  return (!e.comparator || !e.comparator(n, t)) && (e.value = t, e.observers && e.observers.length && M(() => {
    for (let r = 0; r < e.observers.length; r += 1) {
      const s = e.observers[r], l = ne && ne.running;
      l && ne.disposed.has(s), (l ? !s.tState : !s.state) && (s.pure ? g.push(s) : m.push(s), s.observers && Oe(s)), l || (s.state = x);
    }
    if (g.length > 1e6)
      throw g = [], new Error();
  }, !1)), t;
}
function Y(e) {
  if (!e.fn)
    return;
  W(e);
  const t = y, i = a, n = K;
  a = y = e, Ye(e, e.value, n), a = i, y = t;
}
function Ye(e, t, i) {
  let n;
  try {
    n = e.fn(t);
  } catch (r) {
    return e.pure && (e.state = x, e.owned && e.owned.forEach(W), e.owned = null), e.updatedAt = i + 1, Qe(r);
  }
  (!e.updatedAt || e.updatedAt <= i) && (e.updatedAt != null && "observers" in e ? Pe(e, n) : e.value = n, e.updatedAt = i);
}
function ue(e, t, i, n = x, r) {
  const s = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: y,
    context: null,
    pure: i
  };
  return y === null || y !== Ce && (y.owned ? y.owned.push(s) : y.owned = [s]), s;
}
function D(e) {
  if (e.state === 0)
    return;
  if (e.state === U)
    return q(e);
  if (e.suspense && j(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < K); )
    e.state && t.push(e);
  for (let i = t.length - 1; i >= 0; i--)
    if (e = t[i], e.state === x)
      Y(e);
    else if (e.state === U) {
      const n = g;
      g = null, M(() => q(e, t[0]), !1), g = n;
    }
}
function M(e, t) {
  if (g)
    return e();
  let i = !1;
  t || (g = []), m ? i = !0 : m = [], K++;
  try {
    const n = e();
    return Me(i), n;
  } catch (n) {
    i || (m = null), g = null, Qe(n);
  }
}
function Me(e) {
  if (g && (Be(g), g = null), e)
    return;
  const t = m;
  m = null, t.length && M(() => Se(t), !1);
}
function Be(e) {
  for (let t = 0; t < e.length; t++)
    D(e[t]);
}
function ze(e) {
  let t, i = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? e[i++] = n : D(n);
  }
  for (t = 0; t < i; t++)
    D(e[t]);
}
function q(e, t) {
  e.state = 0;
  for (let i = 0; i < e.sources.length; i += 1) {
    const n = e.sources[i];
    if (n.sources) {
      const r = n.state;
      r === x ? n !== t && (!n.updatedAt || n.updatedAt < K) && D(n) : r === U && q(n, t);
    }
  }
}
function Oe(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const i = e.observers[t];
    i.state || (i.state = U, i.pure ? g.push(i) : m.push(i), i.observers && Oe(i));
  }
}
function W(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const i = e.sources.pop(), n = e.sourceSlots.pop(), r = i.observers;
      if (r && r.length) {
        const s = r.pop(), l = i.observerSlots.pop();
        n < r.length && (s.sourceSlots[l] = n, r[n] = s, i.observerSlots[n] = l);
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--)
      W(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function Qe(e) {
  throw e;
}
function $(e, t) {
  return j(() => e(t || {}));
}
function H() {
  return !0;
}
const He = {
  get(e, t, i) {
    return t === oe ? i : e.get(t);
  },
  has(e, t) {
    return t === oe ? !0 : e.has(t);
  },
  set: H,
  deleteProperty: H,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: H,
      deleteProperty: H
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function re(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function G(...e) {
  let t = !1;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    t = t || !!r && oe in r, e[n] = typeof r == "function" ? (t = !0, le(r)) : r;
  }
  if (t)
    return new Proxy({
      get(n) {
        for (let r = e.length - 1; r >= 0; r--) {
          const s = re(e[r])[n];
          if (s !== void 0)
            return s;
        }
      },
      has(n) {
        for (let r = e.length - 1; r >= 0; r--)
          if (n in re(e[r]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let r = 0; r < e.length; r++)
          n.push(...Object.keys(re(e[r])));
        return [...new Set(n)];
      }
    }, He);
  const i = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const r = Object.getOwnPropertyDescriptors(e[n]);
      for (const s in r)
        s in i || Object.defineProperty(i, s, {
          enumerable: !0,
          get() {
            for (let l = e.length - 1; l >= 0; l--) {
              const o = (e[l] || {})[s];
              if (o !== void 0)
                return o;
            }
          }
        });
    }
  return i;
}
function Re(e, t, i) {
  let n = i.length, r = t.length, s = n, l = 0, o = 0, u = t[r - 1].nextSibling, f = null;
  for (; l < r || o < s; ) {
    if (t[l] === i[o]) {
      l++, o++;
      continue;
    }
    for (; t[r - 1] === i[s - 1]; )
      r--, s--;
    if (r === l) {
      const c = s < n ? o ? i[o - 1].nextSibling : i[s - o] : u;
      for (; o < s; )
        e.insertBefore(i[o++], c);
    } else if (s === o)
      for (; l < r; )
        (!f || !f.has(t[l])) && t[l].remove(), l++;
    else if (t[l] === i[s - 1] && i[o] === t[r - 1]) {
      const c = t[--r].nextSibling;
      e.insertBefore(i[o++], t[l++].nextSibling), e.insertBefore(i[--s], c), t[r] = i[s];
    } else {
      if (!f) {
        f = /* @__PURE__ */ new Map();
        let v = o;
        for (; v < s; )
          f.set(i[v], v++);
      }
      const c = f.get(t[l]);
      if (c != null)
        if (o < c && c < s) {
          let v = l, h = 1, S;
          for (; ++v < r && v < s && !((S = f.get(t[v])) == null || S !== c + h); )
            h++;
          if (h > c - o) {
            const _ = t[l];
            for (; o < c; )
              e.insertBefore(i[o++], _);
          } else
            e.replaceChild(i[o++], t[l++]);
        } else
          l++;
      else
        t[l++].remove();
    }
  }
}
const ge = "_$DX_DELEGATE";
function Ue(e, t, i, n = {}) {
  let r;
  return xe((s) => {
    r = s, t === document ? e() : C(t, e(), t.firstChild ? null : void 0, i);
  }, n.owner), () => {
    r(), t.textContent = "";
  };
}
function N(e, t, i) {
  let n;
  const r = () => {
    const l = document.createElement("template");
    return l.innerHTML = e, i ? l.content.firstChild.firstChild : l.content.firstChild;
  }, s = t ? () => (n || (n = r())).cloneNode(!0) : () => j(() => document.importNode(n || (n = r()), !0));
  return s.cloneNode = s, s;
}
function De(e, t = window.document) {
  const i = t[ge] || (t[ge] = /* @__PURE__ */ new Set());
  for (let n = 0, r = e.length; n < r; n++) {
    const s = e[n];
    i.has(s) || (i.add(s), t.addEventListener(s, Je));
  }
}
function b(e, t, i) {
  i == null ? e.removeAttribute(t) : e.setAttribute(t, i);
}
function qe(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function $e(e, t, i) {
  if (!t)
    return i ? b(e, "style") : t;
  const n = e.style;
  if (typeof t == "string")
    return n.cssText = t;
  typeof i == "string" && (n.cssText = i = void 0), i || (i = {}), t || (t = {});
  let r, s;
  for (s in i)
    t[s] == null && n.removeProperty(s), delete i[s];
  for (s in t)
    r = t[s], r !== i[s] && (n.setProperty(s, r), i[s] = r);
  return i;
}
function ve(e, t, i) {
  return j(() => e(t, i));
}
function C(e, t, i, n) {
  if (i !== void 0 && !n && (n = []), typeof t != "function")
    return J(e, t, n, i);
  B((r) => J(e, t(), r, i), n);
}
function Je(e) {
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
    const n = i[t];
    if (n && !i.disabled) {
      const r = i[`${t}Data`];
      if (r !== void 0 ? n.call(i, r, e) : n.call(i, e), e.cancelBubble)
        return;
    }
    i = i._$host || i.parentNode || i.host;
  }
}
function J(e, t, i, n, r) {
  for (; typeof i == "function"; )
    i = i();
  if (t === i)
    return i;
  const s = typeof t, l = n !== void 0;
  if (e = l && i[0] && i[0].parentNode || e, s === "string" || s === "number")
    if (s === "number" && (t = t.toString()), l) {
      let o = i[0];
      o && o.nodeType === 3 ? o.data = t : o = document.createTextNode(t), i = Q(e, i, n, o);
    } else
      i !== "" && typeof i == "string" ? i = e.firstChild.data = t : i = e.textContent = t;
  else if (t == null || s === "boolean")
    i = Q(e, i, n);
  else {
    if (s === "function")
      return B(() => {
        let o = t();
        for (; typeof o == "function"; )
          o = o();
        i = J(e, o, i, n);
      }), () => i;
    if (Array.isArray(t)) {
      const o = [], u = i && Array.isArray(i);
      if (fe(o, t, i, r))
        return B(() => i = J(e, o, i, n, !0)), () => i;
      if (o.length === 0) {
        if (i = Q(e, i, n), l)
          return i;
      } else
        u ? i.length === 0 ? ye(e, o, n) : Re(e, i, o) : (i && Q(e), ye(e, o));
      i = o;
    } else if (t instanceof Node) {
      if (Array.isArray(i)) {
        if (l)
          return i = Q(e, i, n, t);
        Q(e, i, null, t);
      } else
        i == null || i === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      i = t;
    } else
      console.warn("Unrecognized value. Skipped inserting", t);
  }
  return i;
}
function fe(e, t, i, n) {
  let r = !1;
  for (let s = 0, l = t.length; s < l; s++) {
    let o = t[s], u = i && i[s];
    if (o instanceof Node)
      e.push(o);
    else if (!(o == null || o === !0 || o === !1))
      if (Array.isArray(o))
        r = fe(e, o, u) || r;
      else if (typeof o == "function")
        if (n) {
          for (; typeof o == "function"; )
            o = o();
          r = fe(e, Array.isArray(o) ? o : [o], Array.isArray(u) ? u : [u]) || r;
        } else
          e.push(o), r = !0;
      else {
        const f = String(o);
        u && u.nodeType === 3 ? (u.data = f, e.push(u)) : e.push(document.createTextNode(f));
      }
  }
  return r;
}
function ye(e, t, i = null) {
  for (let n = 0, r = t.length; n < r; n++)
    e.insertBefore(t[n], i);
}
function Q(e, t, i, n) {
  if (i === void 0)
    return e.textContent = "";
  const r = n || document.createTextNode("");
  if (t.length) {
    let s = !1;
    for (let l = t.length - 1; l >= 0; l--) {
      const o = t[l];
      if (r !== o) {
        const u = o.parentNode === e;
        !s && !l ? u ? e.replaceChild(r, o) : e.insertBefore(r, i) : u && o.remove();
      } else
        s = !0;
    }
  } else
    e.insertBefore(r, i);
  return [r];
}
function Ie(e) {
  return Object.keys(e).reduce((i, n) => {
    const r = e[n];
    return i[n] = Object.assign({}, r), Ne(r.value) && !et(r.value) && !Array.isArray(r.value) && (i[n].value = Object.assign({}, r.value)), Array.isArray(r.value) && (i[n].value = r.value.slice(0)), i;
  }, {});
}
function Ze(e) {
  return e ? Object.keys(e).reduce((i, n) => {
    const r = e[n];
    return i[n] = Ne(r) && "value" in r ? r : {
      value: r
    }, i[n].attribute || (i[n].attribute = Ge(n)), i[n].parse = "parse" in i[n] ? i[n].parse : typeof i[n].value != "string", i;
  }, {}) : {};
}
function Ke(e) {
  return Object.keys(e).reduce((i, n) => (i[n] = e[n].value, i), {});
}
function We(e, t) {
  const i = Ie(t);
  return Object.keys(t).forEach((r) => {
    const s = i[r], l = e.getAttribute(s.attribute), o = e[r];
    l && (s.value = s.parse ? je(l) : l), o != null && (s.value = Array.isArray(o) ? o.slice(0) : o), s.reflect && be(e, s.attribute, s.value), Object.defineProperty(e, r, {
      get() {
        return s.value;
      },
      set(u) {
        const f = s.value;
        s.value = u, s.reflect && be(this, s.attribute, s.value);
        for (let c = 0, v = this.__propertyChangedCallbacks.length; c < v; c++)
          this.__propertyChangedCallbacks[c](r, u, f);
      },
      enumerable: !0,
      configurable: !0
    });
  }), i;
}
function je(e) {
  if (e)
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
}
function be(e, t, i) {
  if (i == null || i === !1)
    return e.removeAttribute(t);
  let n = JSON.stringify(i);
  e.__updating[t] = !0, n === "true" && (n = ""), e.setAttribute(t, n), Promise.resolve().then(() => delete e.__updating[t]);
}
function Ge(e) {
  return e.replace(/\.?([A-Z]+)/g, (t, i) => "-" + i.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function Ne(e) {
  return e != null && (typeof e == "object" || typeof e == "function");
}
function et(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
function tt(e) {
  return typeof e == "function" && e.toString().indexOf("class") === 0;
}
let se;
function it(e, t) {
  const i = Object.keys(t);
  return class extends e {
    static get observedAttributes() {
      return i.map((r) => t[r].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = We(this, t);
      const r = Ke(this.props), s = this.Component, l = se;
      try {
        se = this, this.__initialized = !0, tt(s) ? new s(r, {
          element: this
        }) : s(r, {
          element: this
        });
      } finally {
        se = l;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let r = null;
      for (; r = this.__releaseCallbacks.pop(); )
        r(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(r, s, l) {
      if (this.__initialized && !this.__updating[r] && (r = this.lookupProp(r), r in t)) {
        if (l == null && !this[r])
          return;
        this[r] = t[r].parse ? je(l) : l;
      }
    }
    lookupProp(r) {
      if (t)
        return i.find((s) => r === s || r === t[s].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(r) {
      this.__releaseCallbacks.push(r);
    }
    addPropertyChangedCallback(r) {
      this.__propertyChangedCallbacks.push(r);
    }
  };
}
function nt(e, t = {}, i = {}) {
  const {
    BaseElement: n = HTMLElement,
    extension: r
  } = i;
  return (s) => {
    if (!e)
      throw new Error("tag is required to register a Component");
    let l = customElements.get(e);
    return l ? (l.prototype.Component = s, l) : (l = it(n, Ze(t)), l.prototype.Component = s, l.prototype.registeredTag = e, customElements.define(e, l, r), l);
  };
}
function rt(e) {
  const t = Object.keys(e), i = {};
  for (let n = 0; n < t.length; n++) {
    const [r, s] = E(e[t[n]]);
    Object.defineProperty(i, t[n], {
      get: r,
      set(l) {
        s(() => l);
      }
    });
  }
  return i;
}
function st(e) {
  if (e.assignedSlot && e.assignedSlot._$owner)
    return e.assignedSlot._$owner;
  let t = e.parentNode;
  for (; t && !t._$owner && !(t.assignedSlot && t.assignedSlot._$owner); )
    t = t.parentNode;
  return t && t.assignedSlot ? t.assignedSlot._$owner : e._$owner;
}
function ot(e) {
  return (t, i) => {
    const { element: n } = i;
    return xe((r) => {
      const s = rt(t);
      n.addPropertyChangedCallback((o, u) => s[o] = u), n.addReleaseCallback(() => {
        n.renderRoot.textContent = "", r();
      });
      const l = e(s, i);
      return C(n.renderRoot, l);
    }, st(n));
  };
}
function lt(e, t, i) {
  return arguments.length === 2 && (i = t, t = {}), nt(e, t)(ot(i));
}
var ce = /* @__PURE__ */ ((e) => (e.hover = "hover", e.insert = "insert", e))(ce || {});
const ft = /* @__PURE__ */ N('<svg><defs><clipPath id="verify-clip-path"><path d="m23.84 13.2202h-1.8838v-5.0828c0-1.3862-1.1374-2.5236-2.5236-2.5236h-5.0828v-1.9194c0-1.7417-1.4218-3.1634-3.1634-3.1634s-3.1634 1.4218-3.1634 3.1634v1.8838h-5.0828c-1.3862 0-2.5236 1.1374-2.5236 2.5236v4.834h1.8838c1.8838 0 3.4122 1.5284 3.4122 3.4122s-1.5284 3.4122-3.4122 3.4122h-1.8838v4.834c0 1.3862 1.1374 2.5236 2.5236 2.5236h4.834v-1.9194c0-1.8838 1.5284-3.4122 3.4122-3.4122s3.4122 1.5284 3.4122 3.4122v1.9194h4.7984c1.3862 0 2.5236-1.1374 2.5236-2.5236v-5.0828h1.9194c1.7417 0 3.1634-1.4218 3.1634-3.1634s-1.3862-3.1279-3.1634-3.1279zm0 0"></path></clipPath><filter id="verify-clip-filter"><feFlood flood-color="#FFF"></feFlood><feComposite in2="SourceAlpha" operator="out"></feComposite><feGaussianBlur stdDeviation="2" result="blur"></feGaussianBlur><feComposite operator="atop" in2="SourceGraphic"></feComposite><feDropShadow flood-opacity="0.5"></svg>', !1, !0), ut = (e) => {
  const t = G(e);
  return (() => {
    const i = ft(), n = i.firstChild, r = n.nextSibling, s = r.firstChild, l = s.nextSibling, o = l.nextSibling, u = o.nextSibling, f = u.nextSibling;
    return b(f, "dx", 2), b(f, "dy", 2), B(() => b(n, "transform", `translate(${t.x},${t.y}) scale(${t.scale || 1.5})`)), i;
  })();
}, ct = /* @__PURE__ */ N('<div><div class="verify-slide-control">'), at = (e) => {
  const t = G(e);
  let i = {}, n = {}, r = 0, s = 0, [l, o] = E(0), [u, f] = E(0), [c, v] = E(0), [h, S] = E(!0);
  Fe(() => {
    o(() => n ? n.getBoundingClientRect().width : 0), i.addEventListener("mouseenter", () => {
      i.classList.add("verify-slide-box-hover-active");
    }), i.addEventListener("mouseleave", () => {
      s === 0 && i.classList.remove("verify-slide-box-hover-active");
    });
  });
  const _ = (d) => {
    const p = T(d);
    v(() => p), t.update(p);
  }, V = (d) => {
    S(() => !1), window.removeEventListener("mouseup", V), window.removeEventListener("mousemove", _), r = (/* @__PURE__ */ new Date()).getTime() - s, s = 0;
    const p = T(d);
    t.end(p, r), i.classList.remove("verify-slide-box-slide-active"), i.classList.remove("verify-slide-box-hover-active");
  }, z = (d) => {
    s = (/* @__PURE__ */ new Date()).getTime(), h() && f(() => d.screenX), i.classList.add("verify-slide-box-slide-active"), window.addEventListener("mouseup", V), window.addEventListener("mousemove", _);
  }, T = (d) => {
    let p = d.screenX - u(), k = t.width - l();
    return p = p <= 0 ? 0 : p >= k ? k : p, p;
  }, Ve = () => {
    f(() => 0), v(() => 0), S(() => !0);
  };
  return t.ref({
    resetSlide: Ve
  }), (() => {
    const d = ct(), p = d.firstChild, k = i;
    typeof k == "function" ? ve(k, d) : i = d, C(d, () => t.children, p), p.$$mousedown = z;
    const ae = n;
    return typeof ae == "function" ? ve(ae, p) : n = p, B((A) => {
      const de = `verify-slide-box ${t.trigger === ce.insert ? "verify-slide-box-insert" : "verify-slide-box-hover"}`, ee = t.width + "px", te = t.height + "px", Te = `transform: translate(${c()}px, 0)`;
      return de !== A._v$ && qe(d, A._v$ = de), ee !== A._v$2 && ((A._v$2 = ee) != null ? d.style.setProperty("--verify-slide-box-width", ee) : d.style.removeProperty("--verify-slide-box-width")), te !== A._v$3 && ((A._v$3 = te) != null ? d.style.setProperty("--verify-slide-svg-height", te) : d.style.removeProperty("--verify-slide-svg-height")), A._v$4 = $e(p, Te, A._v$4), A;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), d;
  })();
};
De(["mousedown"]);
const L = (e, t = 0) => {
  if (typeof e == "number")
    return e;
  {
    const i = [void 0, 0, "0", "false"].includes(e) ? "0" : e, n = Number(i.replace(/[^0-9.]/g, ""));
    return isNaN(n) ? t : n;
  }
}, dt = /* @__PURE__ */ N('<svg><foreignObject x="0" y="0"><div class="verify-background-image"></svg>', !1, !0), Ae = ({
  src: e,
  width: t,
  height: i,
  repeat: n = !0,
  clip: r = ""
}) => (() => {
  const s = dt(), l = s.firstChild;
  return b(s, "clip-path", r), B((o) => {
    const u = L(t), f = L(i), c = `background-image: url(${e});${n === !1 ? "background-repeat: no-repeat" : ""}`;
    return u !== o._v$ && b(s, "width", o._v$ = u), f !== o._v$2 && b(s, "height", o._v$2 = f), o._v$3 = $e(l, c, o._v$3), o;
  }, {
    _v$: void 0,
    _v$2: void 0,
    _v$3: void 0
  }), s;
})(), we = "data:image/png;base64,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", ht = /* @__PURE__ */ N('<svg class="verify-slide-svg"><rect x="0" clip-path="url(#verify-clip-path)" fill="#FFF"></rect><g filter="url(#verify-clip-filter)">'), pt = (e) => {
  const t = G(e), i = () => L(t.props.verifyX), n = () => L(t.props.verifyY);
  let r = {};
  const [s, l] = E(-i());
  return _e(() => {
    l(() => -i());
  }), $(at, {
    ref(f) {
      const c = r;
      typeof c == "function" ? c(f) : r = f;
    },
    get width() {
      return t.props.width;
    },
    get height() {
      return t.props.height;
    },
    update: (f) => {
      l(() => f - i());
    },
    end: (f, c) => {
      Math.abs(f - i()) > L(t.props.deviation) && (r.resetSlide(), l(() => -i()));
    },
    get trigger() {
      return t.props.trigger;
    },
    get children() {
      const f = ht(), c = f.firstChild, v = c.nextSibling;
      return C(f, $(ut, {
        get x() {
          return i();
        },
        get y() {
          return n();
        },
        scale: 1.5
      }), c), C(f, $(Ae, {
        src: we,
        get width() {
          return t.props.width;
        },
        get height() {
          return t.props.height;
        }
      }), c), C(v, $(Ae, {
        src: we,
        get width() {
          return t.props.width;
        },
        get height() {
          return t.props.height;
        },
        clip: "url(#verify-clip-path)"
      })), B((h) => {
        const S = t.props.width, _ = t.props.height, V = t.props.width, z = t.props.height, T = `translate(${s()}, 0)`;
        return S !== h._v$ && b(f, "width", h._v$ = S), _ !== h._v$2 && b(f, "height", h._v$2 = _), V !== h._v$3 && b(c, "width", h._v$3 = V), z !== h._v$4 && b(c, "height", h._v$4 = z), T !== h._v$5 && b(v, "transform", h._v$5 = T), h;
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
const gt = `.verify-container{position:relative;line-height:0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.verify-container .verify-background-image{width:100%;height:100%}.verify-container .verify-slide-box{position:relative;width:var(--verify-slide-box-width);background-color:#ccc}.verify-container .verify-slide-box .verify-slide-control{display:inline-block;width:30px;height:30px;background-color:#fff;cursor:pointer;transition:background-color .2s ease-in-out}.verify-container .verify-slide-box .verify-slide-control:hover,.verify-container .verify-slide-box .verify-slide-control:focus,.verify-container .verify-slide-box .verify-slide-control:active{background-color:#00b8ff}.verify-container .verify-slide-box.verify-slide-box-hover{height:30px}.verify-container .verify-slide-box.verify-slide-box-hover .verify-slide-svg{position:absolute;top:0;opacity:0;height:0;transition:top .3s ease-in-out,opacity .3s ease-in-out,height .3s ease-in-out}.verify-container .verify-slide-box.verify-slide-box-hover.verify-slide-box-hover-active .verify-slide-svg{top:calc(var(--verify-slide-svg-height) * -1);height:var(--verify-slide-svg-height);opacity:1}
`, vt = /* @__PURE__ */ N('<div class="verify-container">'), yt = /* @__PURE__ */ N("<style>"), bt = (e) => {
  const t = G(e);
  let i = {};
  return t.ref({}), [le((() => {
    const n = le(() => !!t.component);
    return () => n() ? (() => {
      const r = yt();
      return C(r, gt), r;
    })() : null;
  })()), (() => {
    const n = vt();
    return C(n, $(pt, {
      ref(r) {
        const s = i;
        typeof s == "function" ? s(r) : i = r;
      },
      props: t
    })), n;
  })()];
}, me = {
  root: null,
  width: 300,
  height: 200,
  component: !1,
  componentName: "cyanery-verify",
  verifyX: 200,
  verifyY: 80,
  deviation: 5,
  trigger: ce.insert
};
var X, P, I, Z, F;
class mt {
  constructor(t) {
    // 根节点
    // 是否componetns
    // components名称
    // 宽度
    // 高度
    // 校验X位置
    // 校验Y位置
    // 校验偏差值
    // 触发方式
    // AppRef
    O(this, X, void 0);
    // AppInstance
    O(this, P, null);
    // Verify渲染
    O(this, I, () => this.root() ? (w(this, P) && w(this, P).call(this), ie(this, P, Ue(w(this, F), this.root())), w(this, P)) : new Error("Verify need root Element"));
    // 注册web-component
    O(this, Z, (t) => {
      lt(t, {}, w(this, F));
    });
    O(this, F, () => {
      const t = this;
      return $(bt, {
        ref(i) {
          const n = w(t, X);
          typeof n == "function" ? n(i) : ie(t, X, i);
        },
        component: !0,
        get width() {
          return t.width();
        },
        get height() {
          return t.height();
        },
        get verifyX() {
          return t.verifyX();
        },
        get verifyY() {
          return t.verifyY();
        },
        get deviation() {
          return t.deviation();
        },
        get trigger() {
          return t.trigger();
        }
      });
    });
    he(this, "updateSlide", (t) => {
      this.update_verifyX(() => t.verifyX), this.update_verifyY(t.verifyY);
    });
    let i = null;
    Object.keys(me).forEach((n) => {
      i = t[n] !== void 0 ? t[n] : me[n], [this[n], this[`update_${n}`]] = E(i);
    }), this.component() ? w(this, Z).call(this, this.componentName()) : w(this, I).call(this);
  }
}
X = new WeakMap(), P = new WeakMap(), I = new WeakMap(), Z = new WeakMap(), F = new WeakMap();
export {
  mt as Verify,
  mt as default
};
