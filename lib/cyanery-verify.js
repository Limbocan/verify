var Me = Object.defineProperty;
var De = (t, e, i) => e in t ? Me(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var F = (t, e, i) => (De(t, typeof e != "symbol" ? e + "" : e, i), i), xe = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
};
var x = (t, e, i) => (xe(t, e, "read from private field"), i ? i.call(t) : e.get(t)), L = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, ne = (t, e, i, r) => (xe(t, e, "write to private field"), r ? r.call(t, i) : e.set(t, i), i);
const Ue = (t, e) => t === e, ce = Symbol("solid-proxy"), G = {
  equals: Ue
};
let Ae = Ne;
const E = 1, I = 2, Pe = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var g = null;
let oe = null, v = null, p = null, $ = null, ee = 0;
function Le(t, e) {
  const i = v, r = g, s = t.length === 0, n = s ? Pe : {
    owned: null,
    cleanups: null,
    context: null,
    owner: e === void 0 ? r : e
  }, o = s ? t : () => t(() => N(() => te(n)));
  g = n, v = null;
  try {
    return Y(o, !0);
  } finally {
    v = i, g = r;
  }
}
function A(t, e) {
  e = e ? Object.assign({}, G, e) : G;
  const i = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: e.equals || void 0
  }, r = (s) => (typeof s == "function" && (s = s(i.value)), Te(i, s));
  return [ke.bind(i), r];
}
function C(t, e, i) {
  const r = ue(t, e, !1, E);
  V(r);
}
function Oe(t, e, i) {
  Ae = We;
  const r = ue(t, e, !1, E);
  (!i || !i.render) && (r.user = !0), $ ? $.push(r) : V(r);
}
function ae(t, e, i) {
  i = i ? Object.assign({}, G, i) : G;
  const r = ue(t, e, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = i.equals || void 0, V(r), ke.bind(r);
}
function N(t) {
  if (v === null)
    return t();
  const e = v;
  v = null;
  try {
    return t();
  } finally {
    v = e;
  }
}
function Ge(t) {
  Oe(() => N(t));
}
function Ie() {
  return g;
}
function ke() {
  if (this.sources && this.state)
    if (this.state === E)
      V(this);
    else {
      const t = p;
      p = null, Y(() => H(this), !1), p = t;
    }
  if (v) {
    const t = this.observers ? this.observers.length : 0;
    v.sources ? (v.sources.push(this), v.sourceSlots.push(t)) : (v.sources = [this], v.sourceSlots = [t]), this.observers ? (this.observers.push(v), this.observerSlots.push(v.sources.length - 1)) : (this.observers = [v], this.observerSlots = [v.sources.length - 1]);
  }
  return this.value;
}
function Te(t, e, i) {
  let r = t.value;
  return (!t.comparator || !t.comparator(r, e)) && (t.value = e, t.observers && t.observers.length && Y(() => {
    for (let s = 0; s < t.observers.length; s += 1) {
      const n = t.observers[s], o = oe && oe.running;
      o && oe.disposed.has(n), (o ? !n.tState : !n.state) && (n.pure ? p.push(n) : $.push(n), n.observers && je(n)), o || (n.state = E);
    }
    if (p.length > 1e6)
      throw p = [], new Error();
  }, !1)), e;
}
function V(t) {
  if (!t.fn)
    return;
  te(t);
  const e = g, i = v, r = ee;
  v = g = t, qe(t, t.value, r), v = i, g = e;
}
function qe(t, e, i) {
  let r;
  try {
    r = t.fn(e);
  } catch (s) {
    return t.pure && (t.state = E, t.owned && t.owned.forEach(te), t.owned = null), t.updatedAt = i + 1, Xe(s);
  }
  (!t.updatedAt || t.updatedAt <= i) && (t.updatedAt != null && "observers" in t ? Te(t, r) : t.value = r, t.updatedAt = i);
}
function ue(t, e, i, r = E, s) {
  const n = {
    fn: t,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: g,
    context: null,
    pure: i
  };
  return g === null || g !== Pe && (g.owned ? g.owned.push(n) : g.owned = [n]), n;
}
function q(t) {
  if (t.state === 0)
    return;
  if (t.state === I)
    return H(t);
  if (t.suspense && N(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const e = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < ee); )
    t.state && e.push(t);
  for (let i = e.length - 1; i >= 0; i--)
    if (t = e[i], t.state === E)
      V(t);
    else if (t.state === I) {
      const r = p;
      p = null, Y(() => H(t, e[0]), !1), p = r;
    }
}
function Y(t, e) {
  if (p)
    return t();
  let i = !1;
  e || (p = []), $ ? i = !0 : $ = [], ee++;
  try {
    const r = t();
    return He(i), r;
  } catch (r) {
    i || ($ = null), p = null, Xe(r);
  }
}
function He(t) {
  if (p && (Ne(p), p = null), t)
    return;
  const e = $;
  $ = null, e.length && Y(() => Ae(e), !1);
}
function Ne(t) {
  for (let e = 0; e < t.length; e++)
    q(t[e]);
}
function We(t) {
  let e, i = 0;
  for (e = 0; e < t.length; e++) {
    const r = t[e];
    r.user ? t[i++] = r : q(r);
  }
  for (e = 0; e < i; e++)
    q(t[e]);
}
function H(t, e) {
  t.state = 0;
  for (let i = 0; i < t.sources.length; i += 1) {
    const r = t.sources[i];
    if (r.sources) {
      const s = r.state;
      s === E ? r !== e && (!r.updatedAt || r.updatedAt < ee) && q(r) : s === I && H(r, e);
    }
  }
}
function je(t) {
  for (let e = 0; e < t.observers.length; e += 1) {
    const i = t.observers[e];
    i.state || (i.state = I, i.pure ? p.push(i) : $.push(i), i.observers && je(i));
  }
}
function te(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      const i = t.sources.pop(), r = t.sourceSlots.pop(), s = i.observers;
      if (s && s.length) {
        const n = s.pop(), o = i.observerSlots.pop();
        r < s.length && (n.sourceSlots[o] = r, s[r] = n, i.observerSlots[r] = o);
      }
    }
  if (t.owned) {
    for (e = t.owned.length - 1; e >= 0; e--)
      te(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; e >= 0; e--)
      t.cleanups[e]();
    t.cleanups = null;
  }
  t.state = 0, t.context = null;
}
function Xe(t) {
  throw t;
}
function k(t, e) {
  return N(() => t(e || {}));
}
function U() {
  return !0;
}
const Ze = {
  get(t, e, i) {
    return e === ce ? i : t.get(e);
  },
  has(t, e) {
    return e === ce ? !0 : t.has(e);
  },
  set: U,
  deleteProperty: U,
  getOwnPropertyDescriptor(t, e) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return t.get(e);
      },
      set: U,
      deleteProperty: U
    };
  },
  ownKeys(t) {
    return t.keys();
  }
};
function le(t) {
  return (t = typeof t == "function" ? t() : t) ? t : {};
}
function K(...t) {
  let e = !1;
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    e = e || !!s && ce in s, t[r] = typeof s == "function" ? (e = !0, ae(s)) : s;
  }
  if (e)
    return new Proxy({
      get(r) {
        for (let s = t.length - 1; s >= 0; s--) {
          const n = le(t[s])[r];
          if (n !== void 0)
            return n;
        }
      },
      has(r) {
        for (let s = t.length - 1; s >= 0; s--)
          if (r in le(t[s]))
            return !0;
        return !1;
      },
      keys() {
        const r = [];
        for (let s = 0; s < t.length; s++)
          r.push(...Object.keys(le(t[s])));
        return [...new Set(r)];
      }
    }, Ze);
  const i = {};
  for (let r = t.length - 1; r >= 0; r--)
    if (t[r]) {
      const s = Object.getOwnPropertyDescriptors(t[r]);
      for (const n in s)
        n in i || Object.defineProperty(i, n, {
          enumerable: !0,
          get() {
            for (let o = t.length - 1; o >= 0; o--) {
              const l = (t[o] || {})[n];
              if (l !== void 0)
                return l;
            }
          }
        });
    }
  return i;
}
function Je(t, e, i) {
  let r = i.length, s = e.length, n = r, o = 0, l = 0, c = e[s - 1].nextSibling, f = null;
  for (; o < s || l < n; ) {
    if (e[o] === i[l]) {
      o++, l++;
      continue;
    }
    for (; e[s - 1] === i[n - 1]; )
      s--, n--;
    if (s === o) {
      const a = n < r ? l ? i[l - 1].nextSibling : i[n - l] : c;
      for (; l < n; )
        t.insertBefore(i[l++], a);
    } else if (n === l)
      for (; o < s; )
        (!f || !f.has(e[o])) && e[o].remove(), o++;
    else if (e[o] === i[n - 1] && i[l] === e[s - 1]) {
      const a = e[--s].nextSibling;
      t.insertBefore(i[l++], e[o++].nextSibling), t.insertBefore(i[--n], a), e[s] = i[n];
    } else {
      if (!f) {
        f = /* @__PURE__ */ new Map();
        let h = l;
        for (; h < n; )
          f.set(i[h], h++);
      }
      const a = f.get(e[o]);
      if (a != null)
        if (l < a && a < n) {
          let h = o, u = 1, _;
          for (; ++h < s && h < n && !((_ = f.get(e[h])) == null || _ !== a + u); )
            u++;
          if (u > a - l) {
            const w = e[o];
            for (; l < a; )
              t.insertBefore(i[l++], w);
          } else
            t.replaceChild(i[l++], e[o++]);
        } else
          o++;
      else
        e[o++].remove();
    }
  }
}
const we = "_$DX_DELEGATE";
function Qe(t, e, i, r = {}) {
  let s;
  return Le((n) => {
    s = n, e === document ? t() : S(e, t(), e.firstChild ? null : void 0, i);
  }, r.owner), () => {
    s(), e.textContent = "";
  };
}
function j(t, e, i) {
  let r;
  const s = () => {
    const o = document.createElement("template");
    return o.innerHTML = t, i ? o.content.firstChild.firstChild : o.content.firstChild;
  }, n = e ? () => (r || (r = s())).cloneNode(!0) : () => N(() => document.importNode(r || (r = s()), !0));
  return n.cloneNode = n, n;
}
function et(t, e = window.document) {
  const i = e[we] || (e[we] = /* @__PURE__ */ new Set());
  for (let r = 0, s = t.length; r < s; r++) {
    const n = t[r];
    i.has(n) || (i.add(n), e.addEventListener(n, tt));
  }
}
function b(t, e, i) {
  i == null ? t.removeAttribute(e) : t.setAttribute(e, i);
}
function ve(t, e) {
  e == null ? t.removeAttribute("class") : t.className = e;
}
function Be(t, e, i) {
  if (!e)
    return i ? b(t, "style") : e;
  const r = t.style;
  if (typeof e == "string")
    return r.cssText = e;
  typeof i == "string" && (r.cssText = i = void 0), i || (i = {}), e || (e = {});
  let s, n;
  for (n in i)
    e[n] == null && r.removeProperty(n), delete i[n];
  for (n in e)
    s = e[n], s !== i[n] && (r.setProperty(n, s), i[n] = s);
  return i;
}
function me(t, e, i) {
  return N(() => t(e, i));
}
function S(t, e, i, r) {
  if (i !== void 0 && !r && (r = []), typeof e != "function")
    return W(t, e, r, i);
  C((s) => W(t, e(), s, i), r);
}
function tt(t) {
  const e = `$$${t.type}`;
  let i = t.composedPath && t.composedPath()[0] || t.target;
  for (t.target !== i && Object.defineProperty(t, "target", {
    configurable: !0,
    value: i
  }), Object.defineProperty(t, "currentTarget", {
    configurable: !0,
    get() {
      return i || document;
    }
  }); i; ) {
    const r = i[e];
    if (r && !i.disabled) {
      const s = i[`${e}Data`];
      if (s !== void 0 ? r.call(i, s, t) : r.call(i, t), t.cancelBubble)
        return;
    }
    i = i._$host || i.parentNode || i.host;
  }
}
function W(t, e, i, r, s) {
  for (; typeof i == "function"; )
    i = i();
  if (e === i)
    return i;
  const n = typeof e, o = r !== void 0;
  if (t = o && i[0] && i[0].parentNode || t, n === "string" || n === "number")
    if (n === "number" && (e = e.toString()), o) {
      let l = i[0];
      l && l.nodeType === 3 ? l.data = e : l = document.createTextNode(e), i = O(t, i, r, l);
    } else
      i !== "" && typeof i == "string" ? i = t.firstChild.data = e : i = t.textContent = e;
  else if (e == null || n === "boolean")
    i = O(t, i, r);
  else {
    if (n === "function")
      return C(() => {
        let l = e();
        for (; typeof l == "function"; )
          l = l();
        i = W(t, l, i, r);
      }), () => i;
    if (Array.isArray(e)) {
      const l = [], c = i && Array.isArray(i);
      if (de(l, e, i, s))
        return C(() => i = W(t, l, i, r, !0)), () => i;
      if (l.length === 0) {
        if (i = O(t, i, r), o)
          return i;
      } else
        c ? i.length === 0 ? $e(t, l, r) : Je(t, i, l) : (i && O(t), $e(t, l));
      i = l;
    } else if (e instanceof Node) {
      if (Array.isArray(i)) {
        if (o)
          return i = O(t, i, r, e);
        O(t, i, null, e);
      } else
        i == null || i === "" || !t.firstChild ? t.appendChild(e) : t.replaceChild(e, t.firstChild);
      i = e;
    } else
      console.warn("Unrecognized value. Skipped inserting", e);
  }
  return i;
}
function de(t, e, i, r) {
  let s = !1;
  for (let n = 0, o = e.length; n < o; n++) {
    let l = e[n], c = i && i[n];
    if (l instanceof Node)
      t.push(l);
    else if (!(l == null || l === !0 || l === !1))
      if (Array.isArray(l))
        s = de(t, l, c) || s;
      else if (typeof l == "function")
        if (r) {
          for (; typeof l == "function"; )
            l = l();
          s = de(t, Array.isArray(l) ? l : [l], Array.isArray(c) ? c : [c]) || s;
        } else
          t.push(l), s = !0;
      else {
        const f = String(l);
        c && c.nodeType === 3 ? (c.data = f, t.push(c)) : t.push(document.createTextNode(f));
      }
  }
  return s;
}
function $e(t, e, i = null) {
  for (let r = 0, s = e.length; r < s; r++)
    t.insertBefore(e[r], i);
}
function O(t, e, i, r) {
  if (i === void 0)
    return t.textContent = "";
  const s = r || document.createTextNode("");
  if (e.length) {
    let n = !1;
    for (let o = e.length - 1; o >= 0; o--) {
      const l = e[o];
      if (s !== l) {
        const c = l.parentNode === t;
        !n && !o ? c ? t.replaceChild(s, l) : t.insertBefore(s, i) : c && l.remove();
      } else
        n = !0;
    }
  } else
    t.insertBefore(s, i);
  return [s];
}
function it(t) {
  return Object.keys(t).reduce((i, r) => {
    const s = t[r];
    return i[r] = Object.assign({}, s), ze(s.value) && !lt(s.value) && !Array.isArray(s.value) && (i[r].value = Object.assign({}, s.value)), Array.isArray(s.value) && (i[r].value = s.value.slice(0)), i;
  }, {});
}
function rt(t) {
  return t ? Object.keys(t).reduce((i, r) => {
    const s = t[r];
    return i[r] = ze(s) && "value" in s ? s : {
      value: s
    }, i[r].attribute || (i[r].attribute = ot(r)), i[r].parse = "parse" in i[r] ? i[r].parse : typeof i[r].value != "string", i;
  }, {}) : {};
}
function st(t) {
  return Object.keys(t).reduce((i, r) => (i[r] = t[r].value, i), {});
}
function nt(t, e) {
  const i = it(e);
  return Object.keys(e).forEach((s) => {
    const n = i[s], o = t.getAttribute(n.attribute), l = t[s];
    o && (n.value = n.parse ? Fe(o) : o), l != null && (n.value = Array.isArray(l) ? l.slice(0) : l), n.reflect && Se(t, n.attribute, n.value), Object.defineProperty(t, s, {
      get() {
        return n.value;
      },
      set(c) {
        const f = n.value;
        n.value = c, n.reflect && Se(this, n.attribute, n.value);
        for (let a = 0, h = this.__propertyChangedCallbacks.length; a < h; a++)
          this.__propertyChangedCallbacks[a](s, c, f);
      },
      enumerable: !0,
      configurable: !0
    });
  }), i;
}
function Fe(t) {
  if (t)
    try {
      return JSON.parse(t);
    } catch {
      return t;
    }
}
function Se(t, e, i) {
  if (i == null || i === !1)
    return t.removeAttribute(e);
  let r = JSON.stringify(i);
  t.__updating[e] = !0, r === "true" && (r = ""), t.setAttribute(e, r), Promise.resolve().then(() => delete t.__updating[e]);
}
function ot(t) {
  return t.replace(/\.?([A-Z]+)/g, (e, i) => "-" + i.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function ze(t) {
  return t != null && (typeof t == "object" || typeof t == "function");
}
function lt(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
function ft(t) {
  return typeof t == "function" && t.toString().indexOf("class") === 0;
}
let fe;
function ct(t, e) {
  const i = Object.keys(e);
  return class extends t {
    static get observedAttributes() {
      return i.map((s) => e[s].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = nt(this, e);
      const s = st(this.props), n = this.Component, o = fe;
      try {
        fe = this, this.__initialized = !0, ft(n) ? new n(s, {
          element: this
        }) : n(s, {
          element: this
        });
      } finally {
        fe = o;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let s = null;
      for (; s = this.__releaseCallbacks.pop(); )
        s(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(s, n, o) {
      if (this.__initialized && !this.__updating[s] && (s = this.lookupProp(s), s in e)) {
        if (o == null && !this[s])
          return;
        this[s] = e[s].parse ? Fe(o) : o;
      }
    }
    lookupProp(s) {
      if (e)
        return i.find((n) => s === n || s === e[n].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(s) {
      this.__releaseCallbacks.push(s);
    }
    addPropertyChangedCallback(s) {
      this.__propertyChangedCallbacks.push(s);
    }
  };
}
function at(t, e = {}, i = {}) {
  const {
    BaseElement: r = HTMLElement,
    extension: s
  } = i;
  return (n) => {
    if (!t)
      throw new Error("tag is required to register a Component");
    let o = customElements.get(t);
    return o ? (o.prototype.Component = n, o) : (o = ct(r, rt(e)), o.prototype.Component = n, o.prototype.registeredTag = t, customElements.define(t, o, s), o);
  };
}
function dt(t) {
  const e = Object.keys(t), i = {};
  for (let r = 0; r < e.length; r++) {
    const [s, n] = A(t[e[r]]);
    Object.defineProperty(i, e[r], {
      get: s,
      set(o) {
        n(() => o);
      }
    });
  }
  return i;
}
function ut(t) {
  if (t.assignedSlot && t.assignedSlot._$owner)
    return t.assignedSlot._$owner;
  let e = t.parentNode;
  for (; e && !e._$owner && !(e.assignedSlot && e.assignedSlot._$owner); )
    e = e.parentNode;
  return e && e.assignedSlot ? e.assignedSlot._$owner : t._$owner;
}
function vt(t) {
  return (e, i) => {
    const { element: r } = i;
    return Le((s) => {
      const n = dt(e);
      r.addPropertyChangedCallback((l, c) => n[l] = c), r.addReleaseCallback(() => {
        r.renderRoot.textContent = "", s();
      });
      const o = t(n, i);
      return S(r.renderRoot, o);
    }, ut(r));
  };
}
function ht(t, e, i) {
  return arguments.length === 2 && (i = e, e = {}), at(t, e)(vt(i));
}
var he = /* @__PURE__ */ ((t) => (t.hover = "hover", t.insert = "insert", t))(he || {});
const yt = /* @__PURE__ */ j('<svg><defs><clipPath id="verify-clip-path"><path d="m23.84 13.2202h-1.8838v-5.0828c0-1.3862-1.1374-2.5236-2.5236-2.5236h-5.0828v-1.9194c0-1.7417-1.4218-3.1634-3.1634-3.1634s-3.1634 1.4218-3.1634 3.1634v1.8838h-5.0828c-1.3862 0-2.5236 1.1374-2.5236 2.5236v4.834h1.8838c1.8838 0 3.4122 1.5284 3.4122 3.4122s-1.5284 3.4122-3.4122 3.4122h-1.8838v4.834c0 1.3862 1.1374 2.5236 2.5236 2.5236h4.834v-1.9194c0-1.8838 1.5284-3.4122 3.4122-3.4122s3.4122 1.5284 3.4122 3.4122v1.9194h4.7984c1.3862 0 2.5236-1.1374 2.5236-2.5236v-5.0828h1.9194c1.7417 0 3.1634-1.4218 3.1634-3.1634s-1.3862-3.1279-3.1634-3.1279zm0 0"></path></clipPath><filter id="verify-clip-filter"><feFlood flood-color="#FFF"></feFlood><feComposite in2="SourceAlpha" operator="out"></feComposite><feGaussianBlur stdDeviation="2" result="blur"></feGaussianBlur><feComposite operator="atop" in2="SourceGraphic"></feComposite><feDropShadow flood-opacity="0.5"></svg>', !1, !0), pt = (t) => {
  const e = K(t);
  return (() => {
    const i = yt(), r = i.firstChild, s = r.nextSibling, n = s.firstChild, o = n.nextSibling, l = o.nextSibling, c = l.nextSibling, f = c.nextSibling;
    return b(f, "dx", 2), b(f, "dy", 2), C(() => b(r, "transform", `translate(${e.x},${e.y}) scale(${e.scale || 1.5})`)), i;
  })();
}, z = (t, e = 0) => {
  if (typeof t == "number")
    return t;
  {
    const i = [void 0, 0, "0", "false"].includes(t) ? "0" : t, r = Number(i.replace(/[^0-9.]/g, ""));
    return isNaN(r) ? e : r;
  }
}, Z = (t, e, i, r = 0) => {
  const s = t / 20, n = e();
  if (n - s < r) {
    i(() => r);
    return;
  }
  window.requestAnimationFrame(() => {
    i(() => n - s), Z(t, e, i, r);
  });
}, gt = /* @__PURE__ */ j('<div><div class="verify-slide-control"><svg viewBox="0 0 1024 1024" width="60%" height="60%" class="verify-slide-control-icon verify-slide-control-normal"><path d="M273.344 941.248c25.088 24.96 65.792 24.96 90.88 0l386.432-384.064 0 0c0 0 0 0 0 0 18.816-18.688 23.552-46.144 14.144-69.184-3.136-7.68-7.872-14.912-14.144-21.12L364.224 82.752c-25.152-24.96-65.792-24.96-90.88 0-25.088 24.96-25.088 65.408 0 90.368L614.336 512l-340.992 338.88C248.256 875.904 248.256 916.288 273.344 941.248z"></path></svg><svg viewBox="0 0 1024 1024" width="60%" height="60%" class="verify-slide-control-icon verify-slide-control-success"><path d="M843.693959 293.609061 425.255869 712.056362 186.145026 472.947566 66.579883 592.504522 425.255869 951.165158 963.260126 413.174204Z"></path></svg><svg viewBox="0 0 1024 1024" width="60%" height="60%" class="verify-slide-control-icon verify-slide-control-failed"><path d="M899.499963 262.219143 759.090073 121.815393 513.401418 367.506095 267.714809 121.815393 127.310036 262.22426 373.000737 507.910868 127.314129 753.5985 267.712763 893.996111 513.401418 648.307456 759.095189 893.998157 899.488707 753.5985 653.804145 507.910868Z"></path></svg></div><div class="verify-slide-label"><slot name="label">'), bt = (t) => {
  const e = K(t);
  let i = {}, r = {}, s = 0, n = 0, [o, l] = A(0), [c, f] = A(0), [a, h] = A(0), [u, _] = A(!0);
  Ge(() => {
    l(() => r ? r.getBoundingClientRect().width : 0), i.addEventListener("mouseenter", w), i.addEventListener("mouseleave", M);
  });
  const w = () => i.classList.add("verify-slide-box-hover-active"), M = () => {
    n === 0 && i.classList.remove("verify-slide-box-hover-active");
  }, X = (d) => {
    const y = ye(d);
    h(() => y), e.update(y);
  }, B = (d) => {
    _(() => !1), window.removeEventListener("mouseup", B), window.removeEventListener("mousemove", X), s = (/* @__PURE__ */ new Date()).getTime() - n, e.end(ye(d), s);
  }, Re = (d = !0) => {
    d && (n = 0, i.classList.remove("verify-slide-box-slide-active"), i.classList.remove("verify-slide-box-hover-active"));
  }, Ve = (d) => {
    n = (/* @__PURE__ */ new Date()).getTime(), u() && f(() => d.screenX), i.classList.add("verify-slide-box-slide-active"), window.addEventListener("mouseup", B), window.addEventListener("mousemove", X);
  }, ye = (d) => {
    let y = d.screenX - c(), D = e.width - o();
    return y = y <= 0 ? 0 : y >= D ? D : y, y;
  }, ie = (d = "add", y) => {
    d === "add" ? i.classList.add(y) : d === "remove" && i.classList.remove(y);
  }, Ye = () => {
    setTimeout(() => {
      ie("remove", "verify-slide-failed"), ie("remove", "verify-slide-success");
    }, 300), f(() => 0), Z(e.width, a, h), _(() => !0);
  };
  return e.ref({
    resetSlide: Ye,
    slideEndAfter: Re,
    setSlideBoxClass: ie
  }), (() => {
    const d = gt(), y = d.firstChild, D = y.nextSibling, pe = D.firstChild, ge = i;
    typeof ge == "function" ? me(ge, d) : i = d, S(d, () => e.children, y), y.$$mousedown = Ve;
    const be = r;
    return typeof be == "function" ? me(be, y) : r = y, pe._$owner = Ie(), S(pe, () => e.slideLabel), C((m) => {
      const _e = `verify-slide-box ${e.trigger === he.insert ? "verify-slide-box-insert" : "verify-slide-box-hover"}`, re = e.width + "px", se = e.height + "px", Ke = `--verify-slide-control-x: ${a()}px`;
      return _e !== m._v$ && ve(d, m._v$ = _e), re !== m._v$2 && ((m._v$2 = re) != null ? d.style.setProperty("--verify-slide-box-width", re) : d.style.removeProperty("--verify-slide-box-width")), se !== m._v$3 && ((m._v$3 = se) != null ? d.style.setProperty("--verify-slide-svg-height", se) : d.style.removeProperty("--verify-slide-svg-height")), m._v$4 = Be(y, Ke, m._v$4), m;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    }), d;
  })();
};
et(["mousedown"]);
const _t = /* @__PURE__ */ j('<svg><foreignObject x="0" y="0"><div></svg>', !1, !0), Ce = (t) => {
  const e = K(t);
  return (() => {
    const i = _t(), r = i.firstChild;
    return C((s) => {
      const n = z(e.width), o = z(e.height), l = e.clip, c = `verify-background-image ${e.loading === !0 ? "verify-image-loading" : ""} ${e.clip ? "verify-image-clip" : ""}`, f = `background-image: url(${e.src});${e.repeat === !1 ? "background-repeat: no-repeat" : ""}`;
      return n !== s._v$ && b(i, "width", s._v$ = n), o !== s._v$2 && b(i, "height", s._v$2 = o), l !== s._v$3 && b(i, "clip-path", s._v$3 = l), c !== s._v$4 && ve(r, s._v$4 = c), s._v$5 = Be(r, f, s._v$5), s;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0
    }), i;
  })();
}, xt = /* @__PURE__ */ j('<svg class="verify-slide-svg"><rect x="0" clip-path="url(#verify-clip-path)" fill="#FFF"></rect><g filter="url(#verify-clip-filter)">'), wt = (t) => {
  const e = K(t), i = () => z(e.props.verifyX), r = () => z(e.props.verifyY);
  let s = {};
  const [n, o] = A(-i());
  Oe(() => {
    o(() => -i());
  });
  const l = (f) => {
    o(() => f - i());
  }, c = (f, a) => {
    const h = Math.abs(f - i()), u = h > z(e.props.deviation);
    u ? s.setSlideBoxClass("add", "verify-slide-failed") : s.setSlideBoxClass("add", "verify-slide-success");
    const _ = (w = !0) => {
      u && w && (s.resetSlide(), Z(e.props.width, n, o, -i())), s.slideEndAfter(w);
    };
    e.props.verifyEnd instanceof Function ? e.props.verifyEnd(_, h, a) : _(!0);
  };
  return e.props.ref({
    resetSlide: () => {
      s.resetSlide(), Z(e.props.width, n, o, -i());
    }
  }), k(bt, {
    ref(f) {
      const a = s;
      typeof a == "function" ? a(f) : s = f;
    },
    get width() {
      return e.props.width;
    },
    get height() {
      return e.props.height;
    },
    update: l,
    end: c,
    get loading() {
      return e.props.loading;
    },
    get disabled() {
      return e.props.disabled;
    },
    get slideLabel() {
      return e.props.slideLabel;
    },
    get trigger() {
      return e.props.trigger;
    },
    get children() {
      const f = xt(), a = f.firstChild, h = a.nextSibling;
      return S(f, k(pt, {
        get x() {
          return i();
        },
        get y() {
          return r();
        },
        get scale() {
          return e.props.slideScale;
        }
      }), a), S(f, k(Ce, {
        get src() {
          return e.props.image;
        },
        get width() {
          return e.props.width;
        },
        get height() {
          return e.props.height;
        },
        get loading() {
          return e.props.loading;
        }
      }), a), S(h, k(Ce, {
        get src() {
          return e.props.image;
        },
        get width() {
          return e.props.width;
        },
        get height() {
          return e.props.height;
        },
        get loading() {
          return e.props.loading;
        },
        clip: "url(#verify-clip-path)"
      })), C((u) => {
        const _ = e.props.width, w = e.props.height, M = e.props.width, X = e.props.height, B = `translate(${n()}, 0)`;
        return _ !== u._v$ && b(f, "width", u._v$ = _), w !== u._v$2 && b(f, "height", u._v$2 = w), M !== u._v$3 && b(a, "width", u._v$3 = M), X !== u._v$4 && b(a, "height", u._v$4 = X), B !== u._v$5 && b(h, "transform", u._v$5 = B), u;
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
const mt = `.verify-container{--slide-control-size: 30px;--verify-slide-control-color: #fff;--verify-slide-control-active-color: #257ce6e1;--verify-success-color: rgba(65, 216, 85, .795);--verify-failed-color: rgba(216, 65, 65, .795);position:relative;line-height:0;-webkit-user-select:none;-moz-user-select:none;user-select:none}.verify-container.verify-container-disabled{pointer-events:none;cursor:not-allowed}.verify-container .verify-background-image{width:100%;height:100%}.verify-container .verify-background-image.verify-image-loading{--verify-loading-size: 40px;position:relative}.verify-container .verify-background-image.verify-image-loading:before{content:"";display:flex;width:100%;height:100%;background-color:#fff9}.verify-container .verify-background-image.verify-image-loading:after{content:"";position:absolute;display:block;top:calc(50% - var(--verify-loading-size) / 2);left:calc(50% - var(--verify-loading-size) / 2);width:var(--verify-loading-size);height:var(--verify-loading-size);background-color:#333;animation:verify-rotateplane 1s infinite ease-in-out;z-index:10}.verify-container .verify-background-image.verify-image-loading.verify-image-clip{opacity:.2}.verify-container .verify-slide-box{position:relative;width:var(--verify-slide-box-width);background-color:#878787}.verify-container .verify-slide-box .verify-slide-control{--verify-slide-control-x: 0;position:relative;display:inline-block;width:var(--slide-control-size);height:var(--slide-control-size);background-color:var(--verify-slide-control-color);cursor:pointer;box-shadow:1px 1px 2px 1px #00000024;transform:translate(var(--verify-slide-control-x));transition:background-color .2s ease-in-out}.verify-container .verify-slide-box .verify-slide-control:hover,.verify-container .verify-slide-box .verify-slide-control:focus,.verify-container .verify-slide-box .verify-slide-control:active{background-color:var(--verify-slide-control-active-color)}.verify-container .verify-slide-box .verify-slide-control:hover .verify-slide-control-icon,.verify-container .verify-slide-box .verify-slide-control:focus .verify-slide-control-icon,.verify-container .verify-slide-box .verify-slide-control:active .verify-slide-control-icon{fill:#fff;transition:fill .2s ease-in-out}.verify-container .verify-slide-box .verify-slide-control:before{content:"";position:absolute;left:calc(var(--verify-slide-control-x) * -1);right:var(--slide-control-size);height:100%;box-shadow:inset 1px 0 var(--verify-slide-control-active-color),inset 0 -1px var(--verify-slide-control-active-color),inset 0 1px var(--verify-slide-control-active-color)}.verify-container .verify-slide-box .verify-slide-control .verify-slide-control-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);fill:var(--verify-slide-control-active-color);transition:fill .2s ease-in,opacity .2s ease-in-out}.verify-container .verify-slide-box .verify-slide-control .verify-slide-control-success,.verify-container .verify-slide-box .verify-slide-control .verify-slide-control-failed{opacity:0}.verify-container .verify-slide-box .verify-slide-label{position:absolute;left:0;bottom:0;width:100%;height:var(--slide-control-size);display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:1;color:#323336e6;font-size:12px;transition:opacity .2s ease-in-out}.verify-container .verify-slide-box.verify-slide-box-slide-active .verify-slide-label{opacity:0}.verify-container .verify-slide-box.verify-slide-success .verify-slide-control{background-color:var(--verify-success-color)}.verify-container .verify-slide-box.verify-slide-success .verify-slide-control:before{box-shadow:inset 1px 0 var(--verify-success-color),inset 0 -1px var(--verify-success-color),inset 0 1px var(--verify-success-color)}.verify-container .verify-slide-box.verify-slide-success .verify-slide-control .verify-slide-control-normal,.verify-container .verify-slide-box.verify-slide-success .verify-slide-control .verify-slide-control-failed{opacity:0}.verify-container .verify-slide-box.verify-slide-success .verify-slide-control .verify-slide-control-success{opacity:1;fill:#fff}.verify-container .verify-slide-box.verify-slide-failed .verify-slide-control{background-color:var(--verify-failed-color)}.verify-container .verify-slide-box.verify-slide-failed .verify-slide-control:before{box-shadow:inset 1px 0 var(--verify-failed-color),inset 0 -1px var(--verify-failed-color),inset 0 1px var(--verify-failed-color)}.verify-container .verify-slide-box.verify-slide-failed .verify-slide-control .verify-slide-control-normal,.verify-container .verify-slide-box.verify-slide-failed .verify-slide-control .verify-slide-control-success{opacity:0}.verify-container .verify-slide-box.verify-slide-failed .verify-slide-control .verify-slide-control-failed{opacity:1;fill:#fff}.verify-container .verify-slide-box.verify-slide-box-hover{height:30px}.verify-container .verify-slide-box.verify-slide-box-hover .verify-slide-svg{position:absolute;top:0;opacity:0;height:0;transition:top .5s ease-in-out,opacity .5s ease-in-out,height .5s ease-in-out}.verify-container .verify-slide-box.verify-slide-box-hover.verify-slide-box-hover-active .verify-slide-svg{top:calc(var(--verify-slide-svg-height) * -1);height:var(--verify-slide-svg-height);opacity:1}@keyframes verify-rotateplane{0%{transform:perspective(120px) rotateX(0) rotateY(0)}50%{transform:perspective(120px) rotateX(-180.1deg) rotateY(0)}to{transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}
`, $t = /* @__PURE__ */ j("<div>"), St = /* @__PURE__ */ j("<style>"), Ct = (t) => {
  const e = K(t);
  let i = {};
  return [ae((() => {
    const r = ae(() => !!e.component);
    return () => r() ? (() => {
      const s = St();
      return S(s, mt), s;
    })() : null;
  })()), (() => {
    const r = $t();
    return S(r, k(wt, {
      ref(s) {
        const n = i;
        typeof n == "function" ? n(s) : i = s;
      },
      props: e
    })), C(() => ve(r, `verify-container ${e.loading || e.disabled ? "verify-container-disabled" : ""}`)), r;
  })()];
}, Ee = {
  root: null,
  width: 300,
  height: 200,
  image: "",
  loading: !1,
  disabled: !1,
  component: !1,
  componentName: "cyanery-verify",
  verifyX: 200,
  verifyY: 80,
  slideLabel: "向右拖动滑块",
  slideScale: 1.4,
  deviation: 5,
  trigger: he.insert
};
var T, P, J, Q, R;
class Pt {
  constructor(e) {
    // 根节点
    // 是否componetns
    // components名称
    // 宽度
    // 高度
    // 背景图片
    // loading
    // disabled
    // 校验X位置
    // 校验Y位置
    // 滑动校验文字
    // 裁剪区域缩放比例
    // 校验偏差值
    // 触发方式
    // 校验结束拦截方法
    // AppRef
    L(this, T, void 0);
    // AppInstance
    L(this, P, null);
    // Verify渲染
    L(this, J, () => this.root() ? (x(this, P) && x(this, P).call(this), ne(this, P, Qe(x(this, R), this.root())), x(this, P)) : new Error("Verify need root Element"));
    // 注册web-component
    L(this, Q, (e) => {
      ht(e, {}, x(this, R));
    });
    L(this, R, () => {
      const e = this;
      return k(Ct, {
        ref(i) {
          const r = x(e, T);
          typeof r == "function" ? r(i) : ne(e, T, i);
        },
        component: !0,
        get width() {
          return e.width();
        },
        get height() {
          return e.height();
        },
        get image() {
          return e.image();
        },
        get loading() {
          return e.loading();
        },
        get disabled() {
          return e.disabled();
        },
        get verifyX() {
          return e.verifyX();
        },
        get verifyY() {
          return e.verifyY();
        },
        get slideLabel() {
          return e.slideLabel();
        },
        get slideScale() {
          return e.slideScale();
        },
        get deviation() {
          return e.deviation();
        },
        get trigger() {
          return e.trigger();
        },
        get verifyEnd() {
          return e.verifyEnd;
        }
      });
    });
    // 更新状态
    F(this, "updateSlide", (e) => {
      this.update_verifyX(() => e.verifyX || this.verifyX()), this.update_verifyY(() => e.verifyY || this.verifyY()), this.update_width(() => e.width || this.width()), this.update_height(() => e.height || this.height()), this.update_image(() => e.image || this.image()), this.update_slideScale(() => e.scale || this.slideScale());
    });
    // 设置loading
    F(this, "setLoading", (e) => {
      this.update_loading(() => e);
    });
    // 设置loading
    F(this, "setLabel", (e) => {
      this.update_slideLabel(() => e);
    });
    // 重置状态
    F(this, "resetSlide", () => {
      x(this, T).resetSlide();
    });
    let i = null;
    Object.keys(Ee).forEach((r) => {
      i = e[r] !== void 0 ? e[r] : Ee[r], [this[r], this[`update_${r}`]] = A(i);
    }), this.verifyEnd = e.verifyEnd, this.component() ? x(this, Q).call(this, this.componentName()) : x(this, J).call(this);
  }
}
T = new WeakMap(), P = new WeakMap(), J = new WeakMap(), Q = new WeakMap(), R = new WeakMap();
export {
  Pt as Verify,
  Pt as default
};
