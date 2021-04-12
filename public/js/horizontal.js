/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function () {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = window.getComputedStyle(e, null);
        return t ? o[t] : o
    }

    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e || -1 !== ['HTML', 'BODY', '#document'].indexOf(e.nodeName)) return window.document.body;
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll)/.test(r + s + p) ? e : n(o(e))
    }

    function r(e) {
        var o = e && e.offsetParent,
            i = o && o.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : window.document.documentElement
    }

    function p(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e)
    }

    function s(e) {
        return null === e.parentNode ? e : s(e.parentNode)
    }

    function d(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return window.document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            i = o ? e : t,
            n = o ? t : e,
            a = document.createRange();
        a.setStart(i, 0), a.setEnd(n, 0);
        var l = a.commonAncestorContainer;
        if (e !== l && t !== l || i.contains(n)) return p(l) ? l : r(l);
        var f = s(e);
        return f.host ? d(f.host, t) : d(e, s(t).host)
    }

    function a(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft',
            i = e.nodeName;
        if ('BODY' === i || 'HTML' === i) {
            var n = window.document.documentElement,
                r = window.document.scrollingElement || n;
            return r[o]
        }
        return e[o]
    }

    function l(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            i = a(t, 'top'),
            n = a(t, 'left'),
            r = o ? -1 : 1;
        return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e
    }

    function f(e, t) {
        var o = 'x' === t ? 'Left' : 'Top',
            i = 'Left' == o ? 'Right' : 'Bottom';
        return +e['border' + o + 'Width'].split('px')[0] + +e['border' + i + 'Width'].split('px')[0]
    }

    function m(e, t, o, i) {
        return X(t['offset' + e], o['client' + e], o['offset' + e], ne() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0)
    }

    function c() {
        var e = window.document.body,
            t = window.document.documentElement,
            o = ne() && window.getComputedStyle(t);
        return {
            height: m('Height', e, t, o),
            width: m('Width', e, t, o)
        }
    }

    function h(e) {
        return de({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function g(e) {
        var o = {};
        if (ne()) try {
            o = e.getBoundingClientRect();
            var i = a(e, 'top'),
                n = a(e, 'left');
            o.top += i, o.left += n, o.bottom += i, o.right += n
        } catch (e) {} else o = e.getBoundingClientRect();
        var r = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top
            },
            p = 'HTML' === e.nodeName ? c() : {},
            s = p.width || e.clientWidth || r.right - r.left,
            d = p.height || e.clientHeight || r.bottom - r.top,
            l = e.offsetWidth - s,
            m = e.offsetHeight - d;
        if (l || m) {
            var g = t(e);
            l -= f(g, 'x'), m -= f(g, 'y'), r.width -= l, r.height -= m
        }
        return h(r)
    }

    function u(e, o) {
        var i = ne(),
            r = 'HTML' === o.nodeName,
            p = g(e),
            s = g(o),
            d = n(e),
            a = t(o),
            f = +a.borderTopWidth.split('px')[0],
            m = +a.borderLeftWidth.split('px')[0],
            c = h({
                top: p.top - s.top - f,
                left: p.left - s.left - m,
                width: p.width,
                height: p.height
            });
        if (c.marginTop = 0, c.marginLeft = 0, !i && r) {
            var u = +a.marginTop.split('px')[0],
                b = +a.marginLeft.split('px')[0];
            c.top -= f - u, c.bottom -= f - u, c.left -= m - b, c.right -= m - b, c.marginTop = u, c.marginLeft = b
        }
        return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (c = l(c, o)), c
    }

    function b(e) {
        var t = window.document.documentElement,
            o = u(e, t),
            i = X(t.clientWidth, window.innerWidth || 0),
            n = X(t.clientHeight, window.innerHeight || 0),
            r = a(t),
            p = a(t, 'left'),
            s = {
                top: r - o.top + o.marginTop,
                left: p - o.left + o.marginLeft,
                width: i,
                height: n
            };
        return h(s)
    }

    function y(e) {
        var i = e.nodeName;
        return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || y(o(e))
    }

    function w(e, t, i, r) {
        var p = {
                top: 0,
                left: 0
            },
            s = d(e, t);
        if ('viewport' === r) p = b(s);
        else {
            var a;
            'scrollParent' === r ? (a = n(o(e)), 'BODY' === a.nodeName && (a = window.document.documentElement)) : 'window' === r ? a = window.document.documentElement : a = r;
            var l = u(a, s);
            if ('HTML' === a.nodeName && !y(s)) {
                var f = c(),
                    m = f.height,
                    h = f.width;
                p.top += l.top - l.marginTop, p.bottom = m + l.top, p.left += l.left - l.marginLeft, p.right = h + l.left
            } else p = l
        }
        return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p
    }

    function E(e) {
        var t = e.width,
            o = e.height;
        return t * o
    }

    function v(e, t, o, i, n) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var p = w(o, i, r, n),
            s = {
                top: {
                    width: p.width,
                    height: t.top - p.top
                },
                right: {
                    width: p.right - t.right,
                    height: p.height
                },
                bottom: {
                    width: p.width,
                    height: p.bottom - t.bottom
                },
                left: {
                    width: t.left - p.left,
                    height: p.height
                }
            },
            d = Object.keys(s).map(function (e) {
                return de({
                    key: e
                }, s[e], {
                    area: E(s[e])
                })
            }).sort(function (e, t) {
                return t.area - e.area
            }),
            a = d.filter(function (e) {
                var t = e.width,
                    i = e.height;
                return t >= o.clientWidth && i >= o.clientHeight
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split('-')[1];
        return l + (f ? '-' + f : '')
    }

    function x(e, t, o) {
        var i = d(t, o);
        return u(o, i)
    }

    function O(e) {
        var t = window.getComputedStyle(e),
            o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
            n = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + o
            };
        return n
    }

    function L(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e]
        })
    }

    function S(e, t, o) {
        o = o.split('-')[0];
        var i = O(e),
            n = {
                width: i.width,
                height: i.height
            },
            r = -1 !== ['right', 'left'].indexOf(o),
            p = r ? 'top' : 'left',
            s = r ? 'left' : 'top',
            d = r ? 'height' : 'width',
            a = r ? 'width' : 'height';
        return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[L(s)], n
    }

    function T(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function C(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function (e) {
            return e[t] === o
        });
        var i = T(e, function (e) {
            return e[t] === o
        });
        return e.indexOf(i)
    }

    function N(t, o, i) {
        var n = void 0 === i ? t : t.slice(0, C(t, 'name', i));
        return n.forEach(function (t) {
            t.function && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var i = t.function || t.fn;
            t.enabled && e(i) && (o.offsets.popper = h(o.offsets.popper), o.offsets.reference = h(o.offsets.reference), o = i(o, t))
        }), o
    }

    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = v(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = 'absolute', e = N(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function W(e, t) {
        return e.some(function (e) {
            var o = e.name,
                i = e.enabled;
            return i && o === t
        })
    }

    function B(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
            var i = t[n],
                r = i ? '' + i + o : e;
            if ('undefined' != typeof window.document.body.style[r]) return r
        }
        return null
    }

    function P() {
        return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function D(e, t, o, i) {
        var r = 'BODY' === e.nodeName,
            p = r ? window : e;
        p.addEventListener(t, o, {
            passive: !0
        }), r || D(n(p.parentNode), t, o, i), i.push(p)
    }

    function H(e, t, o, i) {
        o.updateBound = i, window.addEventListener('resize', o.updateBound, {
            passive: !0
        });
        var r = n(e);
        return D(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
    }

    function A() {
        this.state.eventsEnabled || (this.state = H(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function M(e, t) {
        return window.removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function I() {
        this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state))
    }

    function R(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function U(e, t) {
        Object.keys(t).forEach(function (o) {
            var i = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && R(t[o]) && (i = 'px'), e.style[o] = t[o] + i
        })
    }

    function Y(e, t) {
        Object.keys(t).forEach(function (o) {
            var i = t[o];
            !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }

    function F(e, t, o) {
        var i = T(e, function (e) {
                var o = e.name;
                return o === t
            }),
            n = !!i && e.some(function (e) {
                return e.name === o && e.enabled && e.order < i.order
            });
        if (!n) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return n
    }

    function j(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function K(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = le.indexOf(e),
            i = le.slice(o + 1).concat(le.slice(0, o));
        return t ? i.reverse() : i
    }

    function q(e, t, o, i) {
        var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +n[1],
            p = n[2];
        if (!r) return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = i;
            }
            var d = h(s);
            return d[t] / 100 * r
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? X(document.documentElement.clientHeight, window.innerHeight || 0) : X(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
        }
        return r
    }

    function G(e, t, o, i) {
        var n = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(i),
            p = e.split(/(\+|\-)/).map(function (e) {
                return e.trim()
            }),
            s = p.indexOf(T(p, function (e) {
                return -1 !== e.search(/,|\s/)
            }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function (e, i) {
            var n = (1 === i ? !r : r) ? 'height' : 'width',
                p = !1;
            return e.reduce(function (e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
            }, []).map(function (e) {
                return q(e, n, t, o)
            })
        }), a.forEach(function (e, t) {
            e.forEach(function (o, i) {
                R(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1))
            })
        }), n
    }

    function z(e, t) {
        var o, i = t.offset,
            n = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = n.split('-')[0];
        return o = R(+i) ? [+i, 0] : G(i, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
    }
    for (var V = Math.min, _ = Math.floor, X = Math.max, Q = ['native code', '[object MutationObserverConstructor]'], J = function (e) {
            return Q.some(function (t) {
                return -1 < (e || '').toString().indexOf(t)
            })
        }, Z = 'undefined' != typeof window, $ = ['Edge', 'Trident', 'Firefox'], ee = 0, te = 0; te < $.length; te += 1)
        if (Z && 0 <= navigator.userAgent.indexOf($[te])) {
            ee = 1;
            break
        } var i, oe = Z && J(window.MutationObserver),
        ie = oe ? function (e) {
            var t = !1,
                o = 0,
                i = document.createElement('span'),
                n = new MutationObserver(function () {
                    e(), t = !1
                });
            return n.observe(i, {
                    attributes: !0
                }),
                function () {
                    t || (t = !0, i.setAttribute('x-index', o), ++o)
                }
        } : function (e) {
            var t = !1;
            return function () {
                t || (t = !0, setTimeout(function () {
                    t = !1, e()
                }, ee))
            }
        },
        ne = function () {
            return void 0 == i && (i = -1 !== navigator.appVersion.indexOf('MSIE 10')), i
        },
        re = function (e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        },
        pe = function () {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
            return function (t, o, i) {
                return o && e(t.prototype, o), i && e(t, i), t
            }
        }(),
        se = function (e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        },
        de = Object.assign || function (e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var i in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        },
        ae = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        le = ae.slice(3),
        fe = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        me = function () {
            function t(o, i) {
                var n = this,
                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                re(this, t), this.scheduleUpdate = function () {
                    return requestAnimationFrame(n.update)
                }, this.update = ie(this.update.bind(this)), this.options = de({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = o.jquery ? o[0] : o, this.popper = i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(de({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
                    n.options.modifiers[e] = de({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
                    return de({
                        name: e
                    }, n.options.modifiers[e])
                }).sort(function (e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function (t) {
                    t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
                }), this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), this.state.eventsEnabled = p
            }
            return pe(t, [{
                key: 'update',
                value: function () {
                    return k.call(this)
                }
            }, {
                key: 'destroy',
                value: function () {
                    return P.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function () {
                    return A.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function () {
                    return I.call(this)
                }
            }]), t
        }();
    return me.Utils = ('undefined' == typeof window ? global : window).PopperUtils, me.placements = ae, me.Defaults = {
        placement: 'bottom',
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function (e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        i = t.split('-')[1];
                    if (i) {
                        var n = e.offsets,
                            r = n.reference,
                            p = n.popper,
                            s = -1 !== ['bottom', 'top'].indexOf(o),
                            d = s ? 'left' : 'top',
                            a = s ? 'width' : 'height',
                            l = {
                                start: se({}, d, r[d]),
                                end: se({}, d, r[d] + r[a] - p[a])
                            };
                        e.offsets.popper = de({}, p, l[i])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: z,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function (e, t) {
                    var o = t.boundariesElement || r(e.instance.popper);
                    e.instance.reference === o && (o = r(o));
                    var i = w(e.instance.popper, e.instance.reference, t.padding, o);
                    t.boundaries = i;
                    var n = t.priority,
                        p = e.offsets.popper,
                        s = {
                            primary: function (e) {
                                var o = p[e];
                                return p[e] < i[e] && !t.escapeWithReference && (o = X(p[e], i[e])), se({}, e, o)
                            },
                            secondary: function (e) {
                                var o = 'right' === e ? 'left' : 'top',
                                    n = p[o];
                                return p[e] > i[e] && !t.escapeWithReference && (n = V(p[o], i[e] - ('right' === e ? p.width : p.height))), se({}, o, n)
                            }
                        };
                    return n.forEach(function (e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        p = de({}, p, s[t](e))
                    }), e.offsets.popper = p, e
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function (e) {
                    var t = e.offsets,
                        o = t.popper,
                        i = t.reference,
                        n = e.placement.split('-')[0],
                        r = _,
                        p = -1 !== ['top', 'bottom'].indexOf(n),
                        s = p ? 'right' : 'bottom',
                        d = p ? 'left' : 'top',
                        a = p ? 'width' : 'height';
                    return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function (e, o) {
                    if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var i = o.element;
                    if ('string' == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var n = e.placement.split('-')[0],
                        r = e.offsets,
                        p = r.popper,
                        s = r.reference,
                        d = -1 !== ['left', 'right'].indexOf(n),
                        a = d ? 'height' : 'width',
                        l = d ? 'Top' : 'Left',
                        f = l.toLowerCase(),
                        m = d ? 'left' : 'top',
                        c = d ? 'bottom' : 'right',
                        g = O(i)[a];
                    s[c] - g < p[f] && (e.offsets.popper[f] -= p[f] - (s[c] - g)), s[f] + g > p[c] && (e.offsets.popper[f] += s[f] + g - p[c]);
                    var u = s[f] + s[a] / 2 - g / 2,
                        b = t(e.instance.popper, 'margin' + l).replace('px', ''),
                        y = u - h(e.offsets.popper)[f] - b;
                    return y = X(V(p[a] - g, y), 0), e.arrowElement = i, e.offsets.arrow = {}, e.offsets.arrow[f] = Math.round(y), e.offsets.arrow[m] = '', e
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function (e, t) {
                    if (W(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = w(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
                        i = e.placement.split('-')[0],
                        n = L(i),
                        r = e.placement.split('-')[1] || '',
                        p = [];
                    switch (t.behavior) {
                        case fe.FLIP:
                            p = [i, n];
                            break;
                        case fe.CLOCKWISE:
                            p = K(i);
                            break;
                        case fe.COUNTERCLOCKWISE:
                            p = K(i, !0);
                            break;
                        default:
                            p = t.behavior;
                    }
                    return p.forEach(function (s, d) {
                        if (i !== s || p.length === d + 1) return e;
                        i = e.placement.split('-')[0], n = L(i);
                        var a = e.offsets.popper,
                            l = e.offsets.reference,
                            f = _,
                            m = 'left' === i && f(a.right) > f(l.left) || 'right' === i && f(a.left) < f(l.right) || 'top' === i && f(a.bottom) > f(l.top) || 'bottom' === i && f(a.top) < f(l.bottom),
                            c = f(a.left) < f(o.left),
                            h = f(a.right) > f(o.right),
                            g = f(a.top) < f(o.top),
                            u = f(a.bottom) > f(o.bottom),
                            b = 'left' === i && c || 'right' === i && h || 'top' === i && g || 'bottom' === i && u,
                            y = -1 !== ['top', 'bottom'].indexOf(i),
                            w = !!t.flipVariations && (y && 'start' === r && c || y && 'end' === r && h || !y && 'start' === r && g || !y && 'end' === r && u);
                        (m || b || w) && (e.flipped = !0, (m || b) && (i = p[d + 1]), w && (r = j(r)), e.placement = i + (r ? '-' + r : ''), e.offsets.popper = de({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = N(e.instance.modifiers, e, 'flip'))
                    }), e
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport'
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function (e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        i = e.offsets,
                        n = i.popper,
                        r = i.reference,
                        p = -1 !== ['left', 'right'].indexOf(o),
                        s = -1 === ['top', 'left'].indexOf(o);
                    return n[p ? 'left' : 'top'] = r[o] - (s ? n[p ? 'width' : 'height'] : 0), e.placement = L(t), e.offsets.popper = h(n), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function (e) {
                    if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        o = T(e.instance.modifiers, function (e) {
                            return 'preventOverflow' === e.name
                        }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function (e, t) {
                    var o = t.x,
                        i = t.y,
                        n = e.offsets.popper,
                        p = T(e.instance.modifiers, function (e) {
                            return 'applyStyle' === e.name
                        }).gpuAcceleration;
                    void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var s, d, a = void 0 === p ? t.gpuAcceleration : p,
                        l = r(e.instance.popper),
                        f = g(l),
                        m = {
                            position: n.position
                        },
                        c = {
                            left: _(n.left),
                            top: _(n.top),
                            bottom: _(n.bottom),
                            right: _(n.right)
                        },
                        h = 'bottom' === o ? 'top' : 'bottom',
                        u = 'right' === i ? 'left' : 'right',
                        b = B('transform');
                    if (d = 'bottom' == h ? -f.height + c.bottom : c.top, s = 'right' == u ? -f.width + c.right : c.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[h] = 0, m[u] = 0, m.willChange = 'transform';
                    else {
                        var y = 'bottom' == h ? -1 : 1,
                            w = 'right' == u ? -1 : 1;
                        m[h] = d * y, m[u] = s * w, m.willChange = h + ', ' + u
                    }
                    var E = {
                        "x-placement": e.placement
                    };
                    return e.attributes = de({}, E, e.attributes), e.styles = de({}, m, e.styles), e.arrowStyles = de({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function (e) {
                    return U(e.instance.popper, e.styles), Y(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && U(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function (e, t, o, i, n) {
                    var r = x(n, t, e),
                        p = v(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', p), U(t, {
                        position: 'absolute'
                    }), o
                },
                gpuAcceleration: void 0
            }
        }
    }, me
});
//# sourceMappingURL=popper.min.js.map

/*!
 * Waves v0.7.5
 * http://fian.my.id/Waves
 *
 * Copyright 2014-2016 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */
! function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define([], function () {
        return b.apply(a)
    }) : "object" == typeof exports ? module.exports = b.call(a) : a.Waves = b.call(a)
}("object" == typeof global ? global : this, function () {
    "use strict";

    function a(a) {
        return null !== a && a === a.window
    }

    function b(b) {
        return a(b) ? b : 9 === b.nodeType && b.defaultView
    }

    function c(a) {
        var b = typeof a;
        return "function" === b || "object" === b && !!a
    }

    function d(a) {
        return c(a) && a.nodeType > 0
    }

    function e(a) {
        var b = m.call(a);
        return "[object String]" === b ? l(a) : c(a) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(b) && a.hasOwnProperty("length") ? a : d(a) ? [a] : []
    }

    function f(a) {
        var c, d, e = {
                top: 0,
                left: 0
            },
            f = a && a.ownerDocument;
        return c = f.documentElement, "undefined" != typeof a.getBoundingClientRect && (e = a.getBoundingClientRect()), d = b(f), {
            top: e.top + d.pageYOffset - c.clientTop,
            left: e.left + d.pageXOffset - c.clientLeft
        }
    }

    function g(a) {
        var b = "";
        for (var c in a) a.hasOwnProperty(c) && (b += c + ":" + a[c] + ";");
        return b
    }

    function h(a, b, c) {
        if (c) {
            c.classList.remove("waves-rippling");
            var d = c.getAttribute("data-x"),
                e = c.getAttribute("data-y"),
                f = c.getAttribute("data-scale"),
                h = c.getAttribute("data-translate"),
                i = Date.now() - Number(c.getAttribute("data-hold")),
                j = 350 - i;
            0 > j && (j = 0), "mousemove" === a.type && (j = 150);
            var k = "mousemove" === a.type ? 2500 : o.duration;
            setTimeout(function () {
                var a = {
                    top: e + "px",
                    left: d + "px",
                    opacity: "0",
                    "-webkit-transition-duration": k + "ms",
                    "-moz-transition-duration": k + "ms",
                    "-o-transition-duration": k + "ms",
                    "transition-duration": k + "ms",
                    "-webkit-transform": f + " " + h,
                    "-moz-transform": f + " " + h,
                    "-ms-transform": f + " " + h,
                    "-o-transform": f + " " + h,
                    transform: f + " " + h
                };
                c.setAttribute("style", g(a)), setTimeout(function () {
                    try {
                        b.removeChild(c)
                    } catch (a) {
                        return !1
                    }
                }, k)
            }, j)
        }
    }

    function i(a) {
        if (q.allowEvent(a) === !1) return null;
        for (var b = null, c = a.target || a.srcElement; c.parentElement;) {
            if (!(c instanceof SVGElement) && c.classList.contains("waves-effect")) {
                b = c;
                break
            }
            c = c.parentElement
        }
        return b
    }

    function j(a) {
        var b = i(a);
        if (null !== b) {
            if (b.disabled || b.getAttribute("disabled") || b.classList.contains("disabled")) return;
            if (q.registerEvent(a), "touchstart" === a.type && o.delay) {
                var c = !1,
                    d = setTimeout(function () {
                        d = null, o.show(a, b)
                    }, o.delay),
                    e = function (e) {
                        d && (clearTimeout(d), d = null, o.show(a, b)), c || (c = !0, o.hide(e, b))
                    },
                    f = function (a) {
                        d && (clearTimeout(d), d = null), e(a)
                    };
                b.addEventListener("touchmove", f, !1), b.addEventListener("touchend", e, !1), b.addEventListener("touchcancel", e, !1)
            } else o.show(a, b), n && (b.addEventListener("touchend", o.hide, !1), b.addEventListener("touchcancel", o.hide, !1)), b.addEventListener("mouseup", o.hide, !1), b.addEventListener("mouseleave", o.hide, !1)
        }
    }
    var k = k || {},
        l = document.querySelectorAll.bind(document),
        m = Object.prototype.toString,
        n = "ontouchstart" in window,
        o = {
            duration: 750,
            delay: 200,
            show: function (a, b, c) {
                if (2 === a.button) return !1;
                b = b || this;
                var d = document.createElement("div");
                d.className = "waves-ripple waves-rippling", b.appendChild(d);
                var e = f(b),
                    h = 0,
                    i = 0;
                "touches" in a && a.touches.length ? (h = a.touches[0].pageY - e.top, i = a.touches[0].pageX - e.left) : (h = a.pageY - e.top, i = a.pageX - e.left), i = i >= 0 ? i : 0, h = h >= 0 ? h : 0;
                var j = "scale(" + b.clientWidth / 100 * 3 + ")",
                    k = "translate(0,0)";
                c && (k = "translate(" + c.x + "px, " + c.y + "px)"), d.setAttribute("data-hold", Date.now()), d.setAttribute("data-x", i), d.setAttribute("data-y", h), d.setAttribute("data-scale", j), d.setAttribute("data-translate", k);
                var l = {
                    top: h + "px",
                    left: i + "px"
                };
                d.classList.add("waves-notransition"), d.setAttribute("style", g(l)), d.classList.remove("waves-notransition"), l["-webkit-transform"] = j + " " + k, l["-moz-transform"] = j + " " + k, l["-ms-transform"] = j + " " + k, l["-o-transform"] = j + " " + k, l.transform = j + " " + k, l.opacity = "1";
                var m = "mousemove" === a.type ? 2500 : o.duration;
                l["-webkit-transition-duration"] = m + "ms", l["-moz-transition-duration"] = m + "ms", l["-o-transition-duration"] = m + "ms", l["transition-duration"] = m + "ms", d.setAttribute("style", g(l))
            },
            hide: function (a, b) {
                b = b || this;
                for (var c = b.getElementsByClassName("waves-rippling"), d = 0, e = c.length; e > d; d++) h(a, b, c[d])
            }
        },
        p = {
            input: function (a) {
                var b = a.parentNode;
                if ("i" !== b.tagName.toLowerCase() || !b.classList.contains("waves-effect")) {
                    var c = document.createElement("i");
                    c.className = a.className + " waves-input-wrapper", a.className = "waves-button-input", b.replaceChild(c, a), c.appendChild(a);
                    var d = window.getComputedStyle(a, null),
                        e = d.color,
                        f = d.backgroundColor;
                    c.setAttribute("style", "color:" + e + ";background:" + f), a.setAttribute("style", "background-color:rgba(0,0,0,0);")
                }
            },
            img: function (a) {
                var b = a.parentNode;
                if ("i" !== b.tagName.toLowerCase() || !b.classList.contains("waves-effect")) {
                    var c = document.createElement("i");
                    b.replaceChild(c, a), c.appendChild(a)
                }
            }
        },
        q = {
            touches: 0,
            allowEvent: function (a) {
                var b = !0;
                return /^(mousedown|mousemove)$/.test(a.type) && q.touches && (b = !1), b
            },
            registerEvent: function (a) {
                var b = a.type;
                "touchstart" === b ? q.touches += 1 : /^(touchend|touchcancel)$/.test(b) && setTimeout(function () {
                    q.touches && (q.touches -= 1)
                }, 500)
            }
        };
    return k.init = function (a) {
        var b = document.body;
        a = a || {}, "duration" in a && (o.duration = a.duration), "delay" in a && (o.delay = a.delay), n && (b.addEventListener("touchstart", j, !1), b.addEventListener("touchcancel", q.registerEvent, !1), b.addEventListener("touchend", q.registerEvent, !1)), b.addEventListener("mousedown", j, !1)
    }, k.attach = function (a, b) {
        a = e(a), "[object Array]" === m.call(b) && (b = b.join(" ")), b = b ? " " + b : "";
        for (var c, d, f = 0, g = a.length; g > f; f++) c = a[f], d = c.tagName.toLowerCase(), -1 !== ["input", "img"].indexOf(d) && (p[d](c), c = c.parentElement), -1 === c.className.indexOf("waves-effect") && (c.className += " waves-effect" + b)
    }, k.ripple = function (a, b) {
        a = e(a);
        var c = a.length;
        if (b = b || {}, b.wait = b.wait || 0, b.position = b.position || null, c)
            for (var d, g, h, i = {}, j = 0, k = {
                    type: "mousedown",
                    button: 1
                }, l = function (a, b) {
                    return function () {
                        o.hide(a, b)
                    }
                }; c > j; j++)
                if (d = a[j], g = b.position || {
                        x: d.clientWidth / 2,
                        y: d.clientHeight / 2
                    }, h = f(d), i.x = h.left + g.x, i.y = h.top + g.y, k.pageX = i.x, k.pageY = i.y, o.show(k, d), b.wait >= 0 && null !== b.wait) {
                    var m = {
                        type: "mouseup",
                        button: 1
                    };
                    setTimeout(l(m, d), b.wait)
                }
    }, k.calm = function (a) {
        a = e(a);
        for (var b = {
                type: "mouseup",
                button: 1
            }, c = 0, d = a.length; d > c; c++) o.hide(b, a[c])
    }, k.displayEffect = function (a) {
        k.init(a)
    }, k
});
//# sourceMappingURL=waves.min.js.map

/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*
* Version: 1.3.8
*
*/(function($){$.fn.extend({slimScroll:function(options){var defaults={width:'auto',height:'250px',size:'7px',color:'#000',position:'right',distance:'1px',start:'top',opacity:.4,alwaysVisible:false,disableFadeOut:false,railVisible:false,railColor:'#333',railOpacity:.2,railDraggable:true,railClass:'slimScrollRail',barClass:'slimScrollBar',wrapperClass:'slimScrollDiv',allowPageScroll:false,wheelStep:20,touchScrollStep:200,borderRadius:'7px',railBorderRadius:'7px'};var o=$.extend(defaults,options);this.each(function(){var isOverPanel,isOverBar,isDragg,queueHide,touchDif,barHeight,percentScroll,lastScroll,divS='<div></div>',minBarHeight=30,releaseScroll=false;var me=$(this);if(me.parent().hasClass(o.wrapperClass))
{var offset=me.scrollTop();bar=me.siblings('.'+o.barClass);rail=me.siblings('.'+o.railClass);getBarHeight();if($.isPlainObject(options))
{if('height'in options&&options.height=='auto'){me.parent().css('height','auto');me.css('height','auto');var height=me.parent().parent().height();me.parent().css('height',height);me.css('height',height);}else if('height'in options){var h=options.height;me.parent().css('height',h);me.css('height',h);}
if('scrollTo'in options)
{offset=parseInt(o.scrollTo);}
else if('scrollBy'in options)
{offset+=parseInt(o.scrollBy);}
else if('destroy'in options)
{bar.remove();rail.remove();me.unwrap();return;}
scrollContent(offset,false,true);}
return;}
else if($.isPlainObject(options))
{if('destroy'in options)
{return;}}
o.height=(o.height=='auto')?me.parent().height():o.height;var wrapper=$(divS).addClass(o.wrapperClass).css({position:'relative',overflow:'hidden',width:o.width,height:o.height});me.css({overflow:'hidden',width:o.width,height:o.height});var rail=$(divS).addClass(o.railClass).css({width:o.size,height:'100%',position:'absolute',top:0,display:(o.alwaysVisible&&o.railVisible)?'block':'none','border-radius':o.railBorderRadius,background:o.railColor,opacity:o.railOpacity,zIndex:90});var bar=$(divS).addClass(o.barClass).css({background:o.color,width:o.size,position:'absolute',top:0,opacity:o.opacity,display:o.alwaysVisible?'block':'none','border-radius':o.borderRadius,BorderRadius:o.borderRadius,MozBorderRadius:o.borderRadius,WebkitBorderRadius:o.borderRadius,zIndex:99});var posCss=(o.position=='right')?{right:o.distance}:{left:o.distance};rail.css(posCss);bar.css(posCss);me.wrap(wrapper);me.parent().append(bar);me.parent().append(rail);if(o.railDraggable){bar.bind("mousedown",function(e){var $doc=$(document);isDragg=true;t=parseFloat(bar.css('top'));pageY=e.pageY;$doc.bind("mousemove.slimscroll",function(e){currTop=t+e.pageY-pageY;bar.css('top',currTop);scrollContent(0,bar.position().top,false);});$doc.bind("mouseup.slimscroll",function(e){isDragg=false;hideBar();$doc.unbind('.slimscroll');});return false;}).bind("selectstart.slimscroll",function(e){e.stopPropagation();e.preventDefault();return false;});}
rail.hover(function(){showBar();},function(){hideBar();});bar.hover(function(){isOverBar=true;},function(){isOverBar=false;});me.hover(function(){isOverPanel=true;showBar();hideBar();},function(){isOverPanel=false;hideBar();});me.bind('touchstart',function(e,b){if(e.originalEvent.touches.length)
{touchDif=e.originalEvent.touches[0].pageY;}});me.bind('touchmove',function(e){if(!releaseScroll)
{e.originalEvent.preventDefault();}
if(e.originalEvent.touches.length)
{var diff=(touchDif-e.originalEvent.touches[0].pageY)/o.touchScrollStep;scrollContent(diff,true);touchDif=e.originalEvent.touches[0].pageY;}});getBarHeight();if(o.start==='bottom')
{bar.css({top:me.outerHeight()-bar.outerHeight()});scrollContent(0,true);}
else if(o.start!=='top')
{scrollContent($(o.start).position().top,null,true);if(!o.alwaysVisible){bar.hide();}}
attachWheel(this);function _onWheel(e)
{if(!isOverPanel){return;}
var e=e||window.event;var delta=0;if(e.wheelDelta){delta=-e.wheelDelta/120;}
if(e.detail){delta=e.detail/3;}
var target=e.target||e.srcTarget||e.srcElement;if($(target).closest('.'+o.wrapperClass).is(me.parent())){scrollContent(delta,true);}
if(e.preventDefault&&!releaseScroll){e.preventDefault();}
if(!releaseScroll){e.returnValue=false;}}
function scrollContent(y,isWheel,isJump)
{releaseScroll=false;var delta=y;var maxTop=me.outerHeight()-bar.outerHeight();if(isWheel)
{delta=parseInt(bar.css('top'))+y*parseInt(o.wheelStep)/100*bar.outerHeight();delta=Math.min(Math.max(delta,0),maxTop);delta=(y>0)?Math.ceil(delta):Math.floor(delta);bar.css({top:delta+'px'});}
percentScroll=parseInt(bar.css('top'))/(me.outerHeight()-bar.outerHeight());delta=percentScroll*(me[0].scrollHeight-me.outerHeight());if(isJump)
{delta=y;var offsetTop=delta/me[0].scrollHeight*me.outerHeight();offsetTop=Math.min(Math.max(offsetTop,0),maxTop);bar.css({top:offsetTop+'px'});}
me.scrollTop(delta);me.trigger('slimscrolling',~~delta);showBar();hideBar();}
function attachWheel(target)
{if(window.addEventListener)
{target.addEventListener('DOMMouseScroll',_onWheel,false);target.addEventListener('mousewheel',_onWheel,false);}
else
{document.attachEvent("onmousewheel",_onWheel)}}
function getBarHeight()
{barHeight=Math.max((me.outerHeight()/me[0].scrollHeight)*me.outerHeight(),minBarHeight);bar.css({height:barHeight+'px'});var display=barHeight==me.outerHeight()?'none':'block';bar.css({display:display});}
function showBar()
{getBarHeight();clearTimeout(queueHide);if(percentScroll==~~percentScroll)
{releaseScroll=o.allowPageScroll;if(lastScroll!=percentScroll)
{var msg=(~~percentScroll==0)?'top':'bottom';me.trigger('slimscroll',msg);}}
else
{releaseScroll=false;}
lastScroll=percentScroll;if(barHeight>=me.outerHeight()){releaseScroll=true;return;}
bar.stop(true,true).fadeIn('fast');if(o.railVisible){rail.stop(true,true).fadeIn('fast');}}
function hideBar()
{if(!o.alwaysVisible)
{queueHide=setTimeout(function(){if(!(o.disableFadeOut&&isOverPanel)&&!isOverBar&&!isDragg)
{bar.fadeOut('slow');rail.fadeOut('slow');}},1000);}}});return this;}});$.fn.extend({slimscroll:$.fn.slimScroll});})(jQuery);
/*!
* Modernizr v2.8.3
* www.modernizr.com
*
* Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
* Available under the BSD and MIT licenses: www.modernizr.com/license/
*/window.Modernizr=(function(window,document,undefined){var version='2.8.3',Modernizr={},enableClasses=true,docElement=document.documentElement,mod='modernizr',modElem=document.createElement(mod),mStyle=modElem.style,inputElem=document.createElement('input'),smile=':)',toString={}.toString,prefixes=' -webkit- -moz- -o- -ms- '.split(' '),omPrefixes='Webkit Moz O ms',cssomPrefixes=omPrefixes.split(' '),domPrefixes=omPrefixes.toLowerCase().split(' '),ns={'svg':'http://www.w3.org/2000/svg'},tests={},inputs={},attrs={},classes=[],slice=classes.slice,featureName,injectElementWithStyles=function(rule,callback,nodes,testnames){var style,ret,node,docOverflow,div=document.createElement('div'),body=document.body,fakeBody=body||document.createElement('body');if(parseInt(nodes,10)){while(nodes--){node=document.createElement('div');node.id=testnames?testnames[nodes]:mod+(nodes+1);div.appendChild(node);}}
style=['&#173;','<style id="s',mod,'">',rule,'</style>'].join('');div.id=mod;(body?div:fakeBody).innerHTML+=style;fakeBody.appendChild(div);if(!body){fakeBody.style.background='';fakeBody.style.overflow='hidden';docOverflow=docElement.style.overflow;docElement.style.overflow='hidden';docElement.appendChild(fakeBody);}
ret=callback(div,rule);if(!body){fakeBody.parentNode.removeChild(fakeBody);docElement.style.overflow=docOverflow;}else{div.parentNode.removeChild(div);}
return!!ret;},testMediaQuery=function(mq){var matchMedia=window.matchMedia||window.msMatchMedia;if(matchMedia){return matchMedia(mq)&&matchMedia(mq).matches||false;}
var bool;injectElementWithStyles('@media '+mq+' { #'+mod+' { position: absolute; } }',function(node){bool=(window.getComputedStyle?getComputedStyle(node,null):node.currentStyle)['position']=='absolute';});return bool;},isEventSupported=(function(){var TAGNAMES={'select':'input','change':'input','submit':'form','reset':'form','error':'img','load':'img','abort':'img'};function isEventSupported(eventName,element){element=element||document.createElement(TAGNAMES[eventName]||'div');eventName='on'+eventName;var isSupported=eventName in element;if(!isSupported){if(!element.setAttribute){element=document.createElement('div');}
if(element.setAttribute&&element.removeAttribute){element.setAttribute(eventName,'');isSupported=is(element[eventName],'function');if(!is(element[eventName],'undefined')){element[eventName]=undefined;}
element.removeAttribute(eventName);}}
element=null;return isSupported;}
return isEventSupported;})(),_hasOwnProperty=({}).hasOwnProperty,hasOwnProp;if(!is(_hasOwnProperty,'undefined')&&!is(_hasOwnProperty.call,'undefined')){hasOwnProp=function(object,property){return _hasOwnProperty.call(object,property);};}
else{hasOwnProp=function(object,property){return((property in object)&&is(object.constructor.prototype[property],'undefined'));};}
if(!Function.prototype.bind){Function.prototype.bind=function bind(that){var target=this;if(typeof target!="function"){throw new TypeError();}
var args=slice.call(arguments,1),bound=function(){if(this instanceof bound){var F=function(){};F.prototype=target.prototype;var self=new F();var result=target.apply(self,args.concat(slice.call(arguments)));if(Object(result)===result){return result;}
return self;}else{return target.apply(that,args.concat(slice.call(arguments)));}};return bound;};}
function setCss(str){mStyle.cssText=str;}
function setCssAll(str1,str2){return setCss(prefixes.join(str1+';')+(str2||''));}
function is(obj,type){return typeof obj===type;}
function contains(str,substr){return!!~(''+str).indexOf(substr);}
function testProps(props,prefixed){for(var i in props){var prop=props[i];if(!contains(prop,"-")&&mStyle[prop]!==undefined){return prefixed=='pfx'?prop:true;}}
return false;}
function testDOMProps(props,obj,elem){for(var i in props){var item=obj[props[i]];if(item!==undefined){if(elem===false)return props[i];if(is(item,'function')){return item.bind(elem||obj);}
return item;}}
return false;}
function testPropsAll(prop,prefixed,elem){var ucProp=prop.charAt(0).toUpperCase()+prop.slice(1),props=(prop+' '+cssomPrefixes.join(ucProp+' ')+ucProp).split(' ');if(is(prefixed,"string")||is(prefixed,"undefined")){return testProps(props,prefixed);}else{props=(prop+' '+(domPrefixes).join(ucProp+' ')+ucProp).split(' ');return testDOMProps(props,prefixed,elem);}}
tests['flexbox']=function(){return testPropsAll('flexWrap');};tests['flexboxlegacy']=function(){return testPropsAll('boxDirection');};tests['canvas']=function(){var elem=document.createElement('canvas');return!!(elem.getContext&&elem.getContext('2d'));};tests['canvastext']=function(){return!!(Modernizr['canvas']&&is(document.createElement('canvas').getContext('2d').fillText,'function'));};tests['webgl']=function(){return!!window.WebGLRenderingContext;};tests['touch']=function(){var bool;if(('ontouchstart'in window)||window.DocumentTouch&&document instanceof DocumentTouch){bool=true;}else{injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''),function(node){bool=node.offsetTop===9;});}
return bool;};tests['geolocation']=function(){return 'geolocation'in navigator;};tests['postmessage']=function(){return!!window.postMessage;};tests['websqldatabase']=function(){return!!window.openDatabase;};tests['indexedDB']=function(){return!!testPropsAll("indexedDB",window);};tests['hashchange']=function(){return isEventSupported('hashchange',window)&&(document.documentMode===undefined||document.documentMode>7);};tests['history']=function(){return!!(window.history&&history.pushState);};tests['draganddrop']=function(){var div=document.createElement('div');return('draggable'in div)||('ondragstart'in div&&'ondrop'in div);};tests['websockets']=function(){return 'WebSocket'in window||'MozWebSocket'in window;};tests['rgba']=function(){setCss('background-color:rgba(150,255,150,.5)');return contains(mStyle.backgroundColor,'rgba');};tests['hsla']=function(){setCss('background-color:hsla(120,40%,100%,.5)');return contains(mStyle.backgroundColor,'rgba')||contains(mStyle.backgroundColor,'hsla');};tests['multiplebgs']=function(){setCss('background:url(https://),url(https://),red url(https://)');return(/(url\s*\(.*?){3}/).test(mStyle.background);};tests['backgroundsize']=function(){return testPropsAll('backgroundSize');};tests['borderimage']=function(){return testPropsAll('borderImage');};tests['borderradius']=function(){return testPropsAll('borderRadius');};tests['boxshadow']=function(){return testPropsAll('boxShadow');};tests['textshadow']=function(){return document.createElement('div').style.textShadow==='';};tests['opacity']=function(){setCssAll('opacity:.55');return(/^0.55$/).test(mStyle.opacity);};tests['cssanimations']=function(){return testPropsAll('animationName');};tests['csscolumns']=function(){return testPropsAll('columnCount');};tests['cssgradients']=function(){var str1='background-image:',str2='gradient(linear,left top,right bottom,from(#9f9),to(white));',str3='linear-gradient(left top,#9f9, white);';setCss((str1+'-webkit- '.split(' ').join(str2+str1)+
prefixes.join(str3+str1)).slice(0,-str1.length));return contains(mStyle.backgroundImage,'gradient');};tests['cssreflections']=function(){return testPropsAll('boxReflect');};tests['csstransforms']=function(){return!!testPropsAll('transform');};tests['csstransforms3d']=function(){var ret=!!testPropsAll('perspective');if(ret&&'webkitPerspective'in docElement.style){injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}',function(node,rule){ret=node.offsetLeft===9&&node.offsetHeight===3;});}
return ret;};tests['csstransitions']=function(){return testPropsAll('transition');};tests['fontface']=function(){var bool;injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}',function(node,rule){var style=document.getElementById('smodernizr'),sheet=style.sheet||style.styleSheet,cssText=sheet?(sheet.cssRules&&sheet.cssRules[0]?sheet.cssRules[0].cssText:sheet.cssText||''):'';bool=/src/i.test(cssText)&&cssText.indexOf(rule.split(' ')[0])===0;});return bool;};tests['generatedcontent']=function(){var bool;injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''),function(node){bool=node.offsetHeight>=3;});return bool;};tests['video']=function(){var elem=document.createElement('video'),bool=false;try{if(bool=!!elem.canPlayType){bool=new Boolean(bool);bool.ogg=elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,'');bool.h264=elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,'');bool.webm=elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');}}catch(e){}
return bool;};tests['audio']=function(){var elem=document.createElement('audio'),bool=false;try{if(bool=!!elem.canPlayType){bool=new Boolean(bool);bool.ogg=elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');bool.mp3=elem.canPlayType('audio/mpeg;').replace(/^no$/,'');bool.wav=elem.canPlayType('audio/wav; codecs="1"').replace(/^no$/,'');bool.m4a=(elem.canPlayType('audio/x-m4a;')||elem.canPlayType('audio/aac;')).replace(/^no$/,'');}}catch(e){}
return bool;};tests['localstorage']=function(){try{localStorage.setItem(mod,mod);localStorage.removeItem(mod);return true;}catch(e){return false;}};tests['sessionstorage']=function(){try{sessionStorage.setItem(mod,mod);sessionStorage.removeItem(mod);return true;}catch(e){return false;}};tests['webworkers']=function(){return!!window.Worker;};tests['applicationcache']=function(){return!!window.applicationCache;};tests['svg']=function(){return!!document.createElementNS&&!!document.createElementNS(ns.svg,'svg').createSVGRect;};tests['inlinesvg']=function(){var div=document.createElement('div');div.innerHTML='<svg/>';return(div.firstChild&&div.firstChild.namespaceURI)==ns.svg;};tests['smil']=function(){return!!document.createElementNS&&/SVGAnimate/.test(toString.call(document.createElementNS(ns.svg,'animate')));};tests['svgclippaths']=function(){return!!document.createElementNS&&/SVGClipPath/.test(toString.call(document.createElementNS(ns.svg,'clipPath')));};function webforms(){Modernizr['input']=(function(props){for(var i=0,len=props.length;i<len;i++){attrs[props[i]]=!!(props[i]in inputElem);}
if(attrs.list){attrs.list=!!(document.createElement('datalist')&&window.HTMLDataListElement);}
return attrs;})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));Modernizr['inputtypes']=(function(props){for(var i=0,bool,inputElemType,defaultView,len=props.length;i<len;i++){inputElem.setAttribute('type',inputElemType=props[i]);bool=inputElem.type!=='text';if(bool){inputElem.value=smile;inputElem.style.cssText='position:absolute;visibility:hidden;';if(/^range$/.test(inputElemType)&&inputElem.style.WebkitAppearance!==undefined){docElement.appendChild(inputElem);defaultView=document.defaultView;bool=defaultView.getComputedStyle&&defaultView.getComputedStyle(inputElem,null).WebkitAppearance!=='textfield'&&(inputElem.offsetHeight!==0);docElement.removeChild(inputElem);}else if(/^(search|tel)$/.test(inputElemType)){}else if(/^(url|email)$/.test(inputElemType)){bool=inputElem.checkValidity&&inputElem.checkValidity()===false;}else{bool=inputElem.value!=smile;}}
inputs[props[i]]=!!bool;}
return inputs;})('search tel url email datetime date month week time datetime-local number range color'.split(' '));}
for(var feature in tests){if(hasOwnProp(tests,feature)){featureName=feature.toLowerCase();Modernizr[featureName]=tests[feature]();classes.push((Modernizr[featureName]?'':'no-')+featureName);}}
Modernizr.input||webforms();Modernizr.addTest=function(feature,test){if(typeof feature=='object'){for(var key in feature){if(hasOwnProp(feature,key)){Modernizr.addTest(key,feature[key]);}}}else{feature=feature.toLowerCase();if(Modernizr[feature]!==undefined){return Modernizr;}
test=typeof test=='function'?test():test;if(typeof enableClasses!=="undefined"&&enableClasses){docElement.className+=' '+(test?'':'no-')+feature;}
Modernizr[feature]=test;}
return Modernizr;};setCss('');modElem=inputElem=null;;(function(window,document){var version='3.7.0';var options=window.html5||{};var reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var supportsHtml5Styles;var expando='_html5shiv';var expanID=0;var expandoData={};var supportsUnknownElements;(function(){try{var a=document.createElement('a');a.innerHTML='<xyz></xyz>';supportsHtml5Styles=('hidden'in a);supportsUnknownElements=a.childNodes.length==1||(function(){(document.createElement)('a');var frag=document.createDocumentFragment();return(typeof frag.cloneNode=='undefined'||typeof frag.createDocumentFragment=='undefined'||typeof frag.createElement=='undefined');}());}catch(e){supportsHtml5Styles=true;supportsUnknownElements=true;}}());function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement('p'),parent=ownerDocument.getElementsByTagName('head')[0]||ownerDocument.documentElement;p.innerHTML='x<style>'+cssText+'</style>';return parent.insertBefore(p.lastChild,parent.firstChild);}
function getElements(){var elements=html5.elements;return typeof elements=='string'?elements.split(' '):elements;}
function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];if(!data){data={};expanID++;ownerDocument[expando]=expanID;expandoData[expanID]=data;}
return data;}
function createElement(nodeName,ownerDocument,data){if(!ownerDocument){ownerDocument=document;}
if(supportsUnknownElements){return ownerDocument.createElement(nodeName);}
if(!data){data=getExpandoData(ownerDocument);}
var node;if(data.cache[nodeName]){node=data.cache[nodeName].cloneNode();}else if(saveClones.test(nodeName)){node=(data.cache[nodeName]=data.createElem(nodeName)).cloneNode();}else{node=data.createElem(nodeName);}
return node.canHaveChildren&&!reSkip.test(nodeName)&&!node.tagUrn?data.frag.appendChild(node):node;}
function createDocumentFragment(ownerDocument,data){if(!ownerDocument){ownerDocument=document;}
if(supportsUnknownElements){return ownerDocument.createDocumentFragment();}
data=data||getExpandoData(ownerDocument);var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;for(;i<l;i++){clone.createElement(elems[i]);}
return clone;}
function shivMethods(ownerDocument,data){if(!data.cache){data.cache={};data.createElem=ownerDocument.createElement;data.createFrag=ownerDocument.createDocumentFragment;data.frag=data.createFrag();}
ownerDocument.createElement=function(nodeName){if(!html5.shivMethods){return data.createElem(nodeName);}
return createElement(nodeName,ownerDocument,data);};ownerDocument.createDocumentFragment=Function('h,f','return function(){'+
'var n=f.cloneNode(),c=n.createElement;'+
'h.shivMethods&&('+
getElements().join().replace(/[\w\-]+/g,function(nodeName){data.createElem(nodeName);data.frag.createElement(nodeName);return 'c("'+nodeName+'")';})+
');return n}')(html5,data.frag);}
function shivDocument(ownerDocument){if(!ownerDocument){ownerDocument=document;}
var data=getExpandoData(ownerDocument);if(html5.shivCSS&&!supportsHtml5Styles&&!data.hasCSS){data.hasCSS=!!addStyleSheet(ownerDocument,'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}'+
'mark{background:#FF0;color:#000}'+
'template{display:none}');}
if(!supportsUnknownElements){shivMethods(ownerDocument,data);}
return ownerDocument;}
var html5={'elements':options.elements||'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video','version':version,'shivCSS':(options.shivCSS!==false),'supportsUnknownElements':supportsUnknownElements,'shivMethods':(options.shivMethods!==false),'type':'default','shivDocument':shivDocument,createElement:createElement,createDocumentFragment:createDocumentFragment};window.html5=html5;shivDocument(document);}(this,document));Modernizr._version=version;Modernizr._prefixes=prefixes;Modernizr._domPrefixes=domPrefixes;Modernizr._cssomPrefixes=cssomPrefixes;Modernizr.mq=testMediaQuery;Modernizr.hasEvent=isEventSupported;Modernizr.testProp=function(prop){return testProps([prop]);};Modernizr.testAllProps=testPropsAll;Modernizr.testStyles=injectElementWithStyles;Modernizr.prefixed=function(prop,obj,elem){if(!obj){return testPropsAll(prop,'pfx');}else{return testPropsAll(prop,obj,elem);}};docElement.className=docElement.className.replace(/(^|\s)no-js(\s|$)/,'$1$2')+
(enableClasses?' js '+classes.join(' '):'');return Modernizr;})(this,this.document);
Modernizr.addTest('cssscrollbar',function(){var bool,styles="#modernizr{overflow: scroll; width: 40px }#"+
Modernizr._prefixes.join("scrollbar{width:0px}"+' #modernizr::').split('#').slice(1).join('#')+"scrollbar{width:0px}";Modernizr.testStyles(styles,function(node){bool='scrollWidth'in node&&node.scrollWidth==40;});return bool;});
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={util:{encode:function(e){return e instanceof a?new a(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case "Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=n.util.clone(e[r]));return a;case "Array":return e.map&&e.map(function(e){return n.util.clone(e)})}
return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){r=r||n.languages;var l=r[e];if(2==arguments.length){a=arguments[1];for(var i in a)a.hasOwnProperty(i)&&(l[i]=a[i]);return l}
var o={};for(var s in l)
if(l.hasOwnProperty(s)){if(s==t)
for(var i in a)a.hasOwnProperty(i)&&(o[i]=a[i]);o[s]=l[s]}
return n.languages.DFS(n.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,a,r){r=r||{};for(var l in e)e.hasOwnProperty(l)&&(t.call(e,l,e[l],a||l),"Object"!==n.util.type(e[l])||r[n.util.objId(e[l])]?"Array"!==n.util.type(e[l])||r[n.util.objId(e[l])]||(r[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,l,r)):(r[n.util.objId(e[l])]=!0,n.languages.DFS(e[l],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,l=a.elements||document.querySelectorAll(a.selector),i=0;r=l[i++];)n.highlightElement(r,e===!0,a.callback)},highlightElement:function(t,a,r){for(var l,i,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(l=(o.className.match(e)||[,""])[1].toLowerCase(),i=n.languages[l]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+l,o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+l);var s=t.textContent,u={element:t,language:l,grammar:i,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),a&&_self.Worker){var c=new Worker(n.filename);c.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},c.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,r){var l=n.tokenize(e,t);return a.stringify(n.util.encode(l),r)},tokenize:function(e,t){var a=n.Token,r=[e],l=t.rest;if(l){for(var i in l)t[i]=l[i];delete t.rest}
e:for(var i in t)
if(t.hasOwnProperty(i)&&t[i]){var o=t[i];o="Array"===n.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],c=u.inside,g=!!u.lookbehind,h=!!u.greedy,f=0,d=u.alias;u=u.pattern||u;for(var p=0;p<r.length;p++){var m=r[p];if(r.length>e.length)break e;if(!(m instanceof a)){u.lastIndex=0;var y=u.exec(m),v=1;if(!y&&h&&p!=r.length-1){var b=r[p+1].matchedStr||r[p+1],k=m+b;if(p<r.length-2&&(k+=r[p+2].matchedStr||r[p+2]),u.lastIndex=0,y=u.exec(k),!y)continue;var w=y.index+(g?y[1].length:0);if(w>=m.length)continue;var _=y.index+y[0].length,P=m.length+b.length;if(v=3,P>=_){if(r[p+1].greedy)continue;v=2,k=k.slice(0,P)}
m=k}
if(y){g&&(f=y[1].length);var w=y.index+f,y=y[0].slice(f),_=w+y.length,S=m.slice(0,w),O=m.slice(_),j=[p,v];S&&j.push(S);var A=new a(i,c?n.tokenize(y,c):y,d,y,h);j.push(A),O&&j.push(O),Array.prototype.splice.apply(r,j)}}}}}
return r},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)
for(var r,l=0;r=a[l++];)r(t)}}},a=n.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.matchedStr=a||null,this.greedy=!!r};if(a.stringify=function(e,t,r){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var l={type:e.type,content:a.stringify(e.content,t,r),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:r};if("comment"==l.type&&(l.attributes.spellcheck="true"),e.alias){var i="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(l.classes,i)}
n.hooks.run("wrap",l);var o="";for(var s in l.attributes)o+=(o?" ":"")+s+'="'+(l.attributes[s]||"")+'"';return "<"+l.tag+' class="'+l.classes.join(" ")+'" '+o+">"+l.content+"</"+l.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,l=t.immediateClose;_self.postMessage(n.highlight(r,n.languages[a],a)),l&&_self.close()},!1),_self.Prism):_self.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(n.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",n.highlightAll)),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),Prism.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript;!function(e){e.languages.ruby=e.languages.extend("clike",{comment:/#(?!\{[^\r\n]*?\}).*/,keyword:/\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/});var n={pattern:/#\{[^}]+\}/,inside:{delimiter:{pattern:/^#\{|\}$/,alias:"tag"},rest:e.util.clone(e.languages.ruby)}};e.languages.insertBefore("ruby","keyword",{regex:[{pattern:/%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,inside:{interpolation:n}},{pattern:/%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,inside:{interpolation:n}},{pattern:/%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,inside:{interpolation:n}},{pattern:/%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,inside:{interpolation:n}},{pattern:/%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,inside:{interpolation:n}},{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}],variable:/[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,symbol:/:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/}),e.languages.insertBefore("ruby","number",{builtin:/\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant:/\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/}),e.languages.ruby.string=[{pattern:/%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,inside:{interpolation:n}},{pattern:/%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,inside:{interpolation:n}},{pattern:/("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,inside:{interpolation:n}}]}(Prism);Prism.languages.css.selector={pattern:/[^\{\}\s][^\{\}]*(?=\s*\{)/,inside:{"pseudo-element":/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,"pseudo-class":/:[-\w]+(?:\(.*\))?/,"class":/\.[-:\.\w]+/,id:/#[-:\.\w]+/}},Prism.languages.insertBefore("css","function",{hexcode:/#[\da-f]{3,6}/i,entity:/\\[\da-f]{1,8}/i,number:/[\d%\.]+/});Prism.languages.git={comment:/^#.*/m,deleted:/^[-–].*/m,inserted:/^\+.*/m,string:/("|')(\\?.)*?\1/m,command:{pattern:/^.*\$ git .*$/m,inside:{parameter:/\s(--|-)\w+/m}},coord:/^@@.*@@$/m,commit_sha1:/^commit \w{40}$/m};!function(e){e.languages.jade={comment:{pattern:/(^([\t ]*))\/\/.*((?:\r?\n|\r)\2[\t ]+.+)*/m,lookbehind:!0},"multiline-script":{pattern:/(^([\t ]*)script\b.*\.[\t ]*)((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,lookbehind:!0,inside:{rest:e.languages.javascript}},filter:{pattern:/(^([\t ]*)):.+((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,lookbehind:!0,inside:{"filter-name":{pattern:/^:[\w-]+/,alias:"variable"}}},"multiline-plain-text":{pattern:/(^([\t ]*)[\w\-#.]+\.[\t ]*)((?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,lookbehind:!0},markup:{pattern:/(^[\t ]*)<.+/m,lookbehind:!0,inside:{rest:e.languages.markup}},doctype:{pattern:/((?:^|\n)[\t ]*)doctype(?: .+)?/,lookbehind:!0},"flow-control":{pattern:/(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,lookbehind:!0,inside:{each:{pattern:/^each .+? in\b/,inside:{keyword:/\b(?:each|in)\b/,punctuation:/,/}},branch:{pattern:/^(?:if|unless|else|case|when|default|while)\b/,alias:"keyword"},rest:e.languages.javascript}},keyword:{pattern:/(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,lookbehind:!0},mixin:[{pattern:/(^[\t ]*)mixin .+/m,lookbehind:!0,inside:{keyword:/^mixin/,"function":/\w+(?=\s*\(|\s*$)/,punctuation:/[(),.]/}},{pattern:/(^[\t ]*)\+.+/m,lookbehind:!0,inside:{name:{pattern:/^\+\w+/,alias:"function"},rest:e.languages.javascript}}],script:{pattern:/(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,lookbehind:!0,inside:{rest:e.languages.javascript}},"plain-text":{pattern:/(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,lookbehind:!0},tag:{pattern:/(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,lookbehind:!0,inside:{attributes:[{pattern:/&[^(]+\([^)]+\)/,inside:{rest:e.languages.javascript}},{pattern:/\([^)]+\)/,inside:{"attr-value":{pattern:/(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,lookbehind:!0,inside:{rest:e.languages.javascript}},"attr-name":/[\w-]+(?=\s*!?=|\s*[,)])/,punctuation:/[!=(),]+/}}],punctuation:/:/}},code:[{pattern:/(^[\t ]*(?:-|!?=)).+/m,lookbehind:!0,inside:{rest:e.languages.javascript}}],punctuation:/[.\-!=|]+/};for(var t="(^([\\t ]*)):{{filter_name}}((?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+",n=[{filter:"atpl",language:"twig"},{filter:"coffee",language:"coffeescript"},"ejs","handlebars","hogan","less","livescript","markdown","mustache","plates",{filter:"sass",language:"scss"},"stylus","swig"],a={},i=0,r=n.length;r>i;i++){var s=n[i];s="string"==typeof s?{filter:s,language:s}:s,e.languages[s.language]&&(a["filter-"+s.filter]={pattern:RegExp(t.replace("{{filter_name}}",s.filter),"m"),lookbehind:!0,inside:{"filter-name":{pattern:/^:[\w-]+/,alias:"variable"},rest:e.languages[s.language]}})}
e.languages.insertBefore("jade","filter",a)}(Prism);Prism.languages.json={property:/".*?"(?=\s*:)/gi,string:/"(?!:)(\\?[^"])*?"(?!:)/g,number:/\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,punctuation:/[{}[\]);,]/g,operator:/:/g,"boolean":/\b(true|false)\b/gi,"null":/\bnull\b/gi},Prism.languages.jsonp=Prism.languages.json;Prism.languages.php=Prism.languages.extend("clike",{keyword:/\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,constant:/\b[A-Z0-9_]{2,}\b/,comment:{pattern:/(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,lookbehind:!0}}),Prism.languages.insertBefore("php","class-name",{"shell-comment":{pattern:/(^|[^\\])#.*/,lookbehind:!0,alias:"comment"}}),Prism.languages.insertBefore("php","keyword",{delimiter:/\?>|<\?(?:php)?/i,variable:/\$\w+\b/i,"package":{pattern:/(\\|namespace\s+|use\s+)[\w\\]+/,lookbehind:!0,inside:{punctuation:/\\/}}}),Prism.languages.insertBefore("php","operator",{property:{pattern:/(->)[\w]+/,lookbehind:!0}}),Prism.languages.markup&&(Prism.hooks.add("before-highlight",function(e){"php"===e.language&&(e.tokenStack=[],e.backupCode=e.code,e.code=e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,function(a){return e.tokenStack.push(a),"{{{PHP"+e.tokenStack.length+"}}}"}))}),Prism.hooks.add("before-insert",function(e){"php"===e.language&&(e.code=e.backupCode,delete e.backupCode)}),Prism.hooks.add("after-highlight",function(e){if("php"===e.language){for(var a,n=0;a=e.tokenStack[n];n++)e.highlightedCode=e.highlightedCode.replace("{{{PHP"+(n+1)+"}}}",Prism.highlight(a,e.grammar,"php").replace(/\$/g,"$$$$"));e.element.innerHTML=e.highlightedCode}}),Prism.hooks.add("wrap",function(e){"php"===e.language&&"markup"===e.type&&(e.content=e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g,'<span class="token php">$1</span>'))}),Prism.languages.insertBefore("php","comment",{markup:{pattern:/<[^?]\/?(.*?)>/,inside:Prism.languages.markup},php:/\{\{\{PHP[0-9]+\}\}\}/}));Prism.languages.insertBefore("php","variable",{"this":/\$this\b/,global:/\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,scope:{pattern:/\b[\w\\]+::/,inside:{keyword:/(static|self|parent)/,punctuation:/(::|\\)/}}});!function(e){e.languages.sass=e.languages.extend("css",{comment:{pattern:/^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,lookbehind:!0}}),e.languages.insertBefore("sass","atrule",{"atrule-line":{pattern:/^(?:[ \t]*)[@+=].+/m,inside:{atrule:/(?:@[\w-]+|[+=])/m}}}),delete e.languages.sass.atrule;var a=/((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i,t=[/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,{pattern:/(\s+)-(?=\s)/,lookbehind:!0}];e.languages.insertBefore("sass","property",{"variable-line":{pattern:/^[ \t]*\$.+/m,inside:{punctuation:/:/,variable:a,operator:t}},"property-line":{pattern:/^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,inside:{property:[/[^:\s]+(?=\s*:)/,{pattern:/(:)[^:\s]+/,lookbehind:!0}],punctuation:/:/,variable:a,operator:t,important:e.languages.sass.important}}}),delete e.languages.sass.property,delete e.languages.sass.important,delete e.languages.sass.selector,e.languages.insertBefore("sass","punctuation",{selector:{pattern:/([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,lookbehind:!0}})}(Prism);Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,lookbehind:!0},atrule:{pattern:/@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,inside:{rule:/@[\w-]+/}},url:/(?:[-a-z]+-)*url(?=\()/i,selector:{pattern:/(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,inside:{placeholder:/%[-_\w]+/}}}),Prism.languages.insertBefore("scss","atrule",{keyword:[/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,{pattern:/( +)(?:from|through)(?= )/,lookbehind:!0}]}),Prism.languages.insertBefore("scss","property",{variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}),Prism.languages.insertBefore("scss","function",{placeholder:{pattern:/%[-_\w]+/,alias:"selector"},statement:/\B!(?:default|optional)\b/i,"boolean":/\b(?:true|false)\b/,"null":/\bnull\b/,operator:{pattern:/(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,lookbehind:!0}}),Prism.languages.scss.atrule.inside.rest=Prism.util.clone(Prism.languages.scss);Prism.languages.sql={comment:{pattern:/(^|[^\\])(?:\/\*[\w\W]*?\*\/|(?:--|\/\/|#).*)/,lookbehind:!0},string:{pattern:/(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,lookbehind:!0},variable:/@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,"function":/\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,"boolean":/\b(?:TRUE|FALSE|NULL)\b/i,number:/\b-?(?:0x)?\d*\.?[\da-f]+\b/,operator:/[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,punctuation:/[;[\]()`,.]/};!function(){function e(e,t){return Array.prototype.slice.call((t||document).querySelectorAll(e))}
function t(e,t){return t=" "+t+" ",(" "+e.className+" ").replace(/[\n\t]/g," ").indexOf(t)>-1}
function n(e,n,i){for(var o,a=n.replace(/\s+/g,"").split(","),l=+e.getAttribute("data-line-offset")||0,d=r()?parseInt:parseFloat,c=d(getComputedStyle(e).lineHeight),s=0;o=a[s++];){o=o.split("-");var u=+o[0],m=+o[1]||u,h=document.createElement("div");h.textContent=Array(m-u+2).join(" \n"),h.className=(i||"")+" line-highlight",t(e,"line-numbers")||(h.setAttribute("data-start",u),m>u&&h.setAttribute("data-end",m)),h.style.top=(u-l-1)*c+"px",t(e,"line-numbers")?e.appendChild(h):(e.querySelector("code")||e).appendChild(h)}}
function i(){var t=location.hash.slice(1);e(".temporary.line-highlight").forEach(function(e){e.parentNode.removeChild(e)});var i=(t.match(/\.([\d,-]+)$/)||[,""])[1];if(i&&!document.getElementById(t)){var r=t.slice(0,t.lastIndexOf(".")),o=document.getElementById(r);o&&(o.hasAttribute("data-line")||o.setAttribute("data-line",""),n(o,i,"temporary "),document.querySelector(".temporary.line-highlight").scrollIntoView())}}
if("undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector){var r=function(){var e;return function(){if("undefined"==typeof e){var t=document.createElement("div");t.style.fontSize="13px",t.style.lineHeight="1.5",t.style.padding=0,t.style.border=0,t.innerHTML="&nbsp;<br />&nbsp;",document.body.appendChild(t),e=38===t.offsetHeight,document.body.removeChild(t)}
return e}}(),o=0;Prism.hooks.add("complete",function(t){var r=t.element.parentNode,a=r&&r.getAttribute("data-line");r&&a&&/pre/i.test(r.nodeName)&&(clearTimeout(o),e(".line-highlight",r).forEach(function(e){e.parentNode.removeChild(e)}),n(r,a),o=setTimeout(i,1))}),window.addEventListener&&window.addEventListener("hashchange",i)}}();!function(){"undefined"!=typeof self&&self.Prism&&self.document&&Prism.hooks.add("complete",function(e){if(e.code){var t=e.element.parentNode,s=/\s*\bline-numbers\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(s.test(t.className)||s.test(e.element.className))&&!e.element.querySelector(".line-numbers-rows")){s.test(e.element.className)&&(e.element.className=e.element.className.replace(s,"")),s.test(t.className)||(t.className+=" line-numbers");var n,a=e.code.match(/\n(?!$)/g),l=a?a.length+1:1,m=new Array(l+1);m=m.join("<span></span>"),n=document.createElement("span"),n.className="line-numbers-rows",n.innerHTML=m,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(n)}}})}();!function(){"undefined"!=typeof self&&!self.Prism||"undefined"!=typeof global&&!global.Prism||Prism.hooks.add("before-highlight",function(e){var f=e.grammar;f.tab=/\t/g,f.crlf=/\r\n/g,f.lf=/\n/g,f.cr=/\r/g,f.space=/ /g})}();!function(){if(("undefined"==typeof self||self.Prism)&&("undefined"==typeof global||global.Prism)){var i=/\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~\/.:#=?&amp;]+/,n=/\b\S+@[\w.]+[a-z]{2}/,e=/\[([^\]]+)]\(([^)]+)\)/,t=["comment","url","attr-value","string"];Prism.hooks.add("before-highlight",function(a){a.grammar&&!a.grammar["url-link"]&&(Prism.languages.DFS(a.grammar,function(a,r,l){t.indexOf(l)>-1&&"Array"!==Prism.util.type(r)&&(r.pattern||(r=this[a]={pattern:r}),r.inside=r.inside||{},"comment"==l&&(r.inside["md-link"]=e),"attr-value"==l?Prism.languages.insertBefore("inside","punctuation",{"url-link":i},r):r.inside["url-link"]=i,r.inside["email-link"]=n)}),a.grammar["url-link"]=i,a.grammar["email-link"]=n)}),Prism.hooks.add("wrap",function(i){if(/-link$/.test(i.type)){i.tag="a";var n=i.content;if("email-link"==i.type&&0!=n.indexOf("mailto:"))n="mailto:"+n;else if("md-link"==i.type){var t=i.content.match(e);n=t[2],i.content=t[1]}
i.attributes.href=n}})}}();!function(){"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var a,s=t.getAttribute("data-src"),n=t,r=/\blang(?:uage)?-(?!\*)(\w+)\b/i;n&&!r.test(n.className);)n=n.parentNode;if(n&&(a=(t.className.match(r)||[,""])[1]),!a){var o=(s.match(/\.(\w+)$/)||[,""])[1];a=e[o]||o}
var l=document.createElement("code");l.className="language-"+a,t.textContent="",l.textContent="Loading…",t.appendChild(l);var i=new XMLHttpRequest;i.open("GET",s,!0),i.onreadystatechange=function(){4==i.readyState&&(i.status<400&&i.responseText?(l.textContent=i.responseText,Prism.highlightElement(l)):l.textContent=i.status>=400?"✖ Error "+i.status+" while fetching file: "+i.statusText:"✖ Error: File does not exist or is empty")},i.send(null)})},document.addEventListener("DOMContentLoaded",self.Prism.fileHighlight))}();!function(){if("undefined"!=typeof self&&self.Prism&&self.document){var e={html:"HTML",xml:"XML",svg:"SVG",mathml:"MathML",css:"CSS",clike:"C-like",javascript:"JavaScript",abap:"ABAP",actionscript:"ActionScript",apacheconf:"Apache Configuration",apl:"APL",applescript:"AppleScript",asciidoc:"AsciiDoc",aspnet:"ASP.NET (C#)",autoit:"AutoIt",autohotkey:"AutoHotkey",basic:"BASIC",csharp:"C#",cpp:"C++",coffeescript:"CoffeeScript","css-extras":"CSS Extras",fsharp:"F#",glsl:"GLSL",http:"HTTP",inform7:"Inform 7",json:"JSON",latex:"LaTeX",lolcode:"LOLCODE",matlab:"MATLAB",mel:"MEL",nasm:"NASM",nginx:"nginx",nsis:"NSIS",objectivec:"Objective-C",ocaml:"OCaml",parigp:"PARI/GP",php:"PHP","php-extras":"PHP Extras",powershell:"PowerShell",protobuf:"Protocol Buffers",jsx:"React JSX",rest:"reST (reStructuredText)",sas:"SAS",sass:"Sass (Sass)",scss:"Sass (Scss)",sql:"SQL",typescript:"TypeScript",vhdl:"VHDL",vim:"vim",wiki:"Wiki markup",yaml:"YAML"};Prism.hooks.add("before-highlight",function(s){var a=s.element.parentNode;if(a&&/pre/i.test(a.nodeName)){var t,i,r=a.getAttribute("data-language")||e[s.language]||s.language.substring(0,1).toUpperCase()+s.language.substring(1),l=a.previousSibling;l&&/\s*\bprism-show-language\b\s*/.test(l.className)&&l.firstChild&&/\s*\bprism-show-language-label\b\s*/.test(l.firstChild.className)?i=l.firstChild:(t=document.createElement("div"),i=document.createElement("div"),i.className="prism-show-language-label",t.className="prism-show-language",t.appendChild(i),a.parentNode.insertBefore(t,a)),i.innerHTML=r}})}}();!function(){function t(t){"function"!=typeof t||e(t)||r.push(t)}
function e(t){return "function"==typeof t?r.filter(function(e){return e.valueOf()===t.valueOf()})[0]:"string"==typeof t&&t.length>0?r.filter(function(e){return e.name===t})[0]:null}
function n(t){if("string"==typeof t&&(t=e(t)),"function"==typeof t){var n=r.indexOf(t);n>=0&&r.splice(n,1)}}
function a(){Array.prototype.slice.call(document.querySelectorAll("pre[data-jsonp]")).forEach(function(t){t.textContent="";var e=document.createElement("code");e.textContent=i,t.appendChild(e);var n=t.getAttribute("data-adapter"),a=null;if(n){if("function"!=typeof window[n])return e.textContent="JSONP adapter function '"+n+"' doesn't exist",void 0;a=window[n]}
var u="prismjsonp"+o++,f=document.createElement("a"),l=f.href=t.getAttribute("data-jsonp");f.href+=(f.search?"&":"?")+(t.getAttribute("data-callback")||"callback")+"="+u;var s=setTimeout(function(){e.textContent===i&&(e.textContent="Timeout loading '"+l+"'")},5e3),d=document.createElement("script");d.src=f.href,window[u]=function(n){document.head.removeChild(d),clearTimeout(s),delete window[u];var o="";if(a)o=a(n,t);else
for(var i in r)
if(o=r[i](n,t),null!==o)break;null===o?e.textContent="Cannot parse response (perhaps you need an adapter function?)":(e.textContent=o,Prism.highlightElement(e))},document.head.appendChild(d)})}
if(self.Prism&&self.document&&document.querySelectorAll&&[].filter){var r=[];Prism.plugins.jsonphighlight={registerAdapter:t,removeAdapter:n,highlight:a},t(function(t){if(t&&t.meta&&t.data){if(t.meta.status&&t.meta.status>=400)return "Error: "+(t.data.message||t.meta.status);if("string"==typeof t.data.content)return "function"==typeof atob?atob(t.data.content.replace(/\s/g,"")):"Your browser cannot decode base64"}
return null}),t(function(t,e){if(t&&t.meta&&t.data&&t.data.files){if(t.meta.status&&t.meta.status>=400)return "Error: "+(t.data.message||t.meta.status);var n=e.getAttribute("data-filename");if(null==n)
for(var a in t.data.files)
if(t.data.files.hasOwnProperty(a)){n=a;break}
return void 0!==t.data.files[n]?t.data.files[n].content:"Error: unknown or missing gist file "+n}
return null}),t(function(t){return t&&t.node&&"string"==typeof t.data?t.data:null});var o=0,i="Loading…";a()}}();!function(){"undefined"!=typeof self&&!self.Prism||"undefined"!=typeof global&&!global.Prism||Prism.hooks.add("wrap",function(e){"keyword"===e.type&&e.classes.push("keyword-"+e.content)})}();!function(){"undefined"!=typeof self&&self.Prism&&self.document&&Prism.hooks.add("before-highlight",function(e){if(e.code){var s=e.element.parentNode,n=/\s*\bkeep-initial-line-feed\b\s*/;!s||"pre"!==s.nodeName.toLowerCase()||n.test(s.className)||n.test(e.element.className)||(e.code=e.code.replace(/^(?:\r?\n|\r)/,""))}})}();!function(){if("undefined"!=typeof self&&self.Prism&&self.document&&document.createElement){var e={javascript:"clike",actionscript:"javascript",aspnet:"markup",bison:"c",c:"clike",csharp:"clike",cpp:"c",coffeescript:"javascript",crystal:"ruby","css-extras":"css",d:"clike",dart:"clike",fsharp:"clike",glsl:"clike",go:"clike",groovy:"clike",haml:"ruby",handlebars:"markup",haxe:"clike",jade:"javascript",java:"clike",kotlin:"clike",less:"css",markdown:"markup",nginx:"clike",objectivec:"c",parser:"markup",php:"clike","php-extras":"php",processing:"clike",protobuf:"clike",qore:"clike",jsx:["markup","javascript"],ruby:"clike",sass:"css",scss:"css",scala:"java",smarty:"markup",swift:"clike",textile:"markup",twig:"markup",typescript:"javascript",wiki:"markup"},c={},a=Prism.plugins.autoloader={languages_path:"components/",use_minified:!0},s=function(e,c,a){var s=document.createElement("script");s.src=e,s.async=!0,s.onload=function(){document.body.removeChild(s),c&&c()},s.onerror=function(){document.body.removeChild(s),a&&a()},document.body.appendChild(s)},r=function(e){return a.languages_path+"prism-"+e+(a.use_minified?".min":"")+".js"},n=function(e,a){var s=c[e];s||(s=c[e]={});var r=a.getAttribute("data-dependencies");!r&&a.parentNode&&"pre"===a.parentNode.tagName.toLowerCase()&&(r=a.parentNode.getAttribute("data-dependencies")),r=r?r.split(/\s*,\s*/g):[],i(r,function(){t(e,function(){Prism.highlightElement(a)})})},i=function(e,c,a){"string"==typeof e&&(e=[e]);var s=0,r=e.length,n=function(){r>s?t(e[s],function(){s++,n()},function(){a&&a(e[s])}):s===r&&c&&c(e)};n()},t=function(a,n,t){var u=function(){var e=!1;a.indexOf("!")>=0&&(e=!0,a=a.replace("!",""));var i=c[a];if(i||(i=c[a]={}),n&&(i.success_callbacks||(i.success_callbacks=[]),i.success_callbacks.push(n)),t&&(i.error_callbacks||(i.error_callbacks=[]),i.error_callbacks.push(t)),!e&&Prism.languages[a])l(a);else if(!e&&i.error)o(a);else if(e||!i.loading){i.loading=!0;var u=r(a);s(u,function(){i.loading=!1,l(a)},function(){i.loading=!1,i.error=!0,o(a)})}},p=e[a];p&&p.length?i(p,u):u()},l=function(e){c[e]&&c[e].success_callbacks&&c[e].success_callbacks.length&&c[e].success_callbacks.forEach(function(c){c(e)})},o=function(e){c[e]&&c[e].error_callbacks&&c[e].error_callbacks.length&&c[e].error_callbacks.forEach(function(c){c(e)})};Prism.hooks.add("complete",function(e){e.element&&e.language&&!e.grammar&&n(e.language,e.element)})}}();!function(){"undefined"!=typeof self&&self.Prism&&self.document&&Prism.languages.markup&&(Prism.plugins.UnescapedMarkup=!0,Prism.hooks.add("before-highlightall",function(e){e.selector+=", .lang-markup script[type='text/plain'], .language-markup script[type='text/plain'], script[type='text/plain'].lang-markup, script[type='text/plain'].language-markup"}),Prism.hooks.add("before-sanity-check",function(e){if("markup"==e.language){if(e.element.matches("script[type='text/plain']")){var t=document.createElement("code"),n=document.createElement("pre");return n.className=t.className=e.element.className,e.code=e.code.replace(/&lt;\/script(>|&gt;)/gi,"</script>"),t.textContent=e.code,n.appendChild(t),e.element.parentNode.replaceChild(n,e.element),e.element=t,void 0}
var n=e.element.parentNode;!e.code&&n&&"pre"==n.nodeName.toLowerCase()&&e.element.childNodes.length&&"#comment"==e.element.childNodes[0].nodeName&&(e.element.textContent=e.code=e.element.childNodes[0].textContent)}}))}();!function(){"undefined"!=typeof self&&self.Prism&&self.document&&Prism.hooks.add("complete",function(e){if(e.code){var t=e.element.parentNode,a=/\s*\bcommand-line\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(a.test(t.className)||a.test(e.element.className))&&!e.element.querySelector(".command-line-prompt")){a.test(e.element.className)&&(e.element.className=e.element.className.replace(a,"")),a.test(t.className)||(t.className+=" command-line");var n=new Array(1+e.code.split("\n").length),s=t.getAttribute("data-prompt")||"";if(""!==s)n=n.join('<span data-prompt="'+s+'"></span>');else{var r=t.getAttribute("data-user")||"user",l=t.getAttribute("data-host")||"localhost";n=n.join('<span data-user="'+r+'" data-host="'+l+'"></span>')}
var m=document.createElement("span");m.className="command-line-prompt",m.innerHTML=n;var o=t.getAttribute("data-output")||"";o=o.split(",");for(var i=0;i<o.length;i++){var d=o[i].split("-"),p=parseInt(d[0]),c=p;if(2===d.length&&(c=parseInt(d[1])),!isNaN(p)&&!isNaN(c))
for(var u=p;c>=u&&u<=m.children.length;u++){var N=m.children[u-1];N.removeAttribute("data-user"),N.removeAttribute("data-host"),N.removeAttribute("data-prompt")}}
e.element.innerHTML=m.outerHTML+e.element.innerHTML}}})}();!function(){function e(e){this.defaults=r({},e)}
function n(e){return e.replace(/-(\w)/g,function(e,n){return n.toUpperCase()})}
function t(e){for(var n=0,t=0;t<e.length;++t)e.charCodeAt(t)=="  ".charCodeAt(0)&&(n+=3);return e.length+n}
if("undefined"!=typeof self&&self.Prism&&self.document){var r=Object.assign||function(e,n){for(var t in n)n.hasOwnProperty(t)&&(e[t]=n[t]);return e};e.prototype={setDefaults:function(e){this.defaults=r(this.defaults,e)},normalize:function(e,t){t=r(this.defaults,t);for(var i in t){var o=n(i);"normalize"!==i&&"setDefaults"!==o&&t[i]&&this[o]&&(e=this[o].call(this,e,t[i]))}
return e},leftTrim:function(e){return e.replace(/^\s+/,"")},rightTrim:function(e){return e.replace(/\s+$/,"")},tabsToSpaces:function(e,n){return n=0|n||4,e.replace(/\t/g,new Array(++n).join(" "))},spacesToTabs:function(e,n){return n=0|n||4,e.replace(new RegExp(" {"+n+"}","g")," ")},removeTrailing:function(e){return e.replace(/\s*?$/gm,"")},removeInitialLineFeed:function(e){return e.replace(/^(?:\r?\n|\r)/,"")},removeIndent:function(e){var n=e.match(/^[^\S\n\r]*(?=\S)/gm);return n&&n[0].length?(n.sort(function(e,n){return e.length-n.length}),n[0].length?e.replace(new RegExp("^"+n[0],"gm"),""):e):e},indent:function(e,n){return e.replace(/^[^\S\n\r]*(?=\S)/gm,new Array(++n).join("   ")+"$&")},breakLines:function(e,n){n=n===!0?80:0|n||80;for(var r=e.split("\n"),i=0;i<r.length;++i)
if(!(t(r[i])<=n)){for(var o=r[i].split(/(\s+)/g),a=0,l=0;l<o.length;++l){var s=t(o[l]);a+=s,a>n&&(o[l]="\n"+o[l],a=s)}
r[i]=o.join("")}
return r.join("\n")}},Prism.plugins.NormalizeWhitespace=new e({"remove-trailing":!0,"remove-indent":!0,"left-trim":!0,"right-trim":!0}),Prism.hooks.add("before-highlight",function(e){var n=e.element.parentNode;if(e.code&&n&&"pre"===n.nodeName.toLowerCase()&&(!e.settings||e.settings["whitespace-normalization"]!==!1)){for(var t=n.childNodes,r="",i="",o=!1,a=Prism.plugins.NormalizeWhitespace,l=0;l<t.length;++l){var s=t[l];s==e.element?o=!0:"#text"===s.nodeName&&(o?i+=s.nodeValue:r+=s.nodeValue,n.removeChild(s),--l)}
if(e.element.children.length&&Prism.plugins.KeepMarkup){var u=r+e.element.innerHTML+i;e.element.innerHTML=a.normalize(u,e.settings),e.code=e.element.textContent}else e.code=r+e.code+i,e.code=a.normalize(e.code,e.settings)}})}}();!function(){"undefined"!=typeof self&&self.Prism&&self.document&&document.createRange&&(Prism.plugins.KeepMarkup=!0,Prism.hooks.add("before-highlight",function(e){if(e.element.children.length){var n=0,o=[],t=function(e,d){var r={};d||(r.clone=e.cloneNode(!1),r.posOpen=n,o.push(r));for(var a=0,s=e.childNodes.length;s>a;a++){var p=e.childNodes[a];1===p.nodeType?t(p):3===p.nodeType&&(n+=p.data.length)}
d||(r.posClose=n)};t(e.element,!0),o&&o.length&&(e.keepMarkup=o)}}),Prism.hooks.add("after-highlight",function(e){if(e.keepMarkup&&e.keepMarkup.length){var n=function(e,o){for(var t=0,d=e.childNodes.length;d>t;t++){var r=e.childNodes[t];if(1===r.nodeType){if(!n(r,o))return!1}else 3===r.nodeType&&(!o.nodeStart&&o.pos+r.data.length>o.node.posOpen&&(o.nodeStart=r,o.nodeStartPos=o.node.posOpen-o.pos),o.nodeStart&&o.pos+r.data.length>=o.node.posClose&&(o.nodeEnd=r,o.nodeEndPos=o.node.posClose-o.pos),o.pos+=r.data.length);if(o.nodeStart&&o.nodeEnd){var a=document.createRange();return a.setStart(o.nodeStart,o.nodeStartPos),a.setEnd(o.nodeEnd,o.nodeEndPos),o.node.clone.appendChild(a.extractContents()),a.insertNode(o.node.clone),a.detach(),!1}}
return!0};e.keepMarkup.forEach(function(o){n(e.element,{node:o,pos:0})})}}))}();
(function ($) {
    $.color = {};
    $.color.make = function (r, g, b, a) {
        var o = {};
        o.r = r || 0;
        o.g = g || 0;
        o.b = b || 0;
        o.a = a != null ? a : 1;
        o.add = function (c, d) {
            for (var i = 0; i < c.length; ++i) o[c.charAt(i)] += d;
            return o.normalize()
        };
        o.scale = function (c, f) {
            for (var i = 0; i < c.length; ++i) o[c.charAt(i)] *= f;
            return o.normalize()
        };
        o.toString = function () {
            if (o.a >= 1) {
                return "rgb(" + [o.r, o.g, o.b].join(",") + ")"
            } else {
                return "rgba(" + [o.r, o.g, o.b, o.a].join(",") + ")"
            }
        };
        o.normalize = function () {
            function clamp(min, value, max) {
                return value < min ? min : value > max ? max : value
            }
            o.r = clamp(0, parseInt(o.r), 255);
            o.g = clamp(0, parseInt(o.g), 255);
            o.b = clamp(0, parseInt(o.b), 255);
            o.a = clamp(0, o.a, 1);
            return o
        };
        o.clone = function () {
            return $.color.make(o.r, o.b, o.g, o.a)
        };
        return o.normalize()
    };
    $.color.extract = function (elem, css) {
        var c;
        do {
            c = elem.css(css).toLowerCase();
            if (c != "" && c != "transparent") break;
            elem = elem.parent()
        } while (elem.length && !$.nodeName(elem.get(0), "body"));
        if (c == "rgba(0, 0, 0, 0)") c = "transparent";
        return $.color.parse(c)
    };
    $.color.parse = function (str) {
        var res, m = $.color.make;
        if (res = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str)) return m(parseInt(res[1], 10), parseInt(res[2], 10), parseInt(res[3], 10));
        if (res = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str)) return m(parseInt(res[1], 10), parseInt(res[2], 10), parseInt(res[3], 10), parseFloat(res[4]));
        if (res = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str)) return m(parseFloat(res[1]) * 2.55, parseFloat(res[2]) * 2.55, parseFloat(res[3]) * 2.55);
        if (res = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str)) return m(parseFloat(res[1]) * 2.55, parseFloat(res[2]) * 2.55, parseFloat(res[3]) * 2.55, parseFloat(res[4]));
        if (res = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str)) return m(parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[3], 16));
        if (res = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str)) return m(parseInt(res[1] + res[1], 16), parseInt(res[2] + res[2], 16), parseInt(res[3] + res[3], 16));
        var name = $.trim(str).toLowerCase();
        if (name == "transparent") return m(255, 255, 255, 0);
        else {
            res = lookupColors[name] || [0, 0, 0];
            return m(res[0], res[1], res[2])
        }
    };
    var lookupColors = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
(function ($) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    if (!$.fn.detach) {
        $.fn.detach = function () {
            return this.each(function () {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            });
        };
    }

    function Canvas(cls, container) {
        var element = container.children("." + cls)[0];
        if (element == null) {
            element = document.createElement("canvas");
            element.className = cls;
            $(element).css({
                direction: "ltr",
                position: "absolute",
                left: 0,
                top: 0
            }).appendTo(container);
            if (!element.getContext) {
                if (window.G_vmlCanvasManager) {
                    element = window.G_vmlCanvasManager.initElement(element);
                } else {
                    throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
                }
            }
        }
        this.element = element;
        var context = this.context = element.getContext("2d");
        var devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
        this.pixelRatio = devicePixelRatio / backingStoreRatio;
        this.resize(container.width(), container.height());
        this.textContainer = null;
        this.text = {};
        this._textCache = {};
    }
    Canvas.prototype.resize = function (width, height) {
        if (width <= 0 || height <= 0) {
            throw new Error("Invalid dimensions for plot, width = " + width + ", height = " + height);
        }
        var element = this.element,
            context = this.context,
            pixelRatio = this.pixelRatio;
        if (this.width != width) {
            element.width = width * pixelRatio;
            element.style.width = width + "px";
            this.width = width;
        }
        if (this.height != height) {
            element.height = height * pixelRatio;
            element.style.height = height + "px";
            this.height = height;
        }
        context.restore();
        context.save();
        context.scale(pixelRatio, pixelRatio);
    };
    Canvas.prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    };
    Canvas.prototype.render = function () {
        var cache = this._textCache;
        for (var layerKey in cache) {
            if (hasOwnProperty.call(cache, layerKey)) {
                var layer = this.getTextLayer(layerKey),
                    layerCache = cache[layerKey];
                layer.hide();
                for (var styleKey in layerCache) {
                    if (hasOwnProperty.call(layerCache, styleKey)) {
                        var styleCache = layerCache[styleKey];
                        for (var key in styleCache) {
                            if (hasOwnProperty.call(styleCache, key)) {
                                var positions = styleCache[key].positions;
                                for (var i = 0, position; position = positions[i]; i++) {
                                    if (position.active) {
                                        if (!position.rendered) {
                                            layer.append(position.element);
                                            position.rendered = true;
                                        }
                                    } else {
                                        positions.splice(i--, 1);
                                        if (position.rendered) {
                                            position.element.detach();
                                        }
                                    }
                                }
                                if (positions.length == 0) {
                                    delete styleCache[key];
                                }
                            }
                        }
                    }
                }
                layer.show();
            }
        }
    };
    Canvas.prototype.getTextLayer = function (classes) {
        var layer = this.text[classes];
        if (layer == null) {
            if (this.textContainer == null) {
                this.textContainer = $("<div class='flot-text'></div>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    'font-size': "smaller",
                    color: "#545454"
                }).insertAfter(this.element);
            }
            layer = this.text[classes] = $("<div></div>").addClass(classes).css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }).appendTo(this.textContainer);
        }
        return layer;
    };
    Canvas.prototype.getTextInfo = function (layer, text, font, angle, width) {
        var textStyle, layerCache, styleCache, info;
        text = "" + text;
        if (typeof font === "object") {
            textStyle = font.style + " " + font.variant + " " + font.weight + " " + font.size + "px/" + font.lineHeight + "px " + font.family;
        } else {
            textStyle = font;
        }
        layerCache = this._textCache[layer];
        if (layerCache == null) {
            layerCache = this._textCache[layer] = {};
        }
        styleCache = layerCache[textStyle];
        if (styleCache == null) {
            styleCache = layerCache[textStyle] = {};
        }
        info = styleCache[text];
        if (info == null) {
            var element = $("<div></div>").html(text).css({
                position: "absolute",
                'max-width': width,
                top: -9999
            }).appendTo(this.getTextLayer(layer));
            if (typeof font === "object") {
                element.css({
                    font: textStyle,
                    color: font.color
                });
            } else if (typeof font === "string") {
                element.addClass(font);
            }
            info = styleCache[text] = {
                width: element.outerWidth(true),
                height: element.outerHeight(true),
                element: element,
                positions: []
            };
            element.detach();
        }
        return info;
    };
    Canvas.prototype.addText = function (layer, x, y, text, font, angle, width, halign, valign) {
        var info = this.getTextInfo(layer, text, font, angle, width),
            positions = info.positions;
        if (halign == "center") {
            x -= info.width / 2;
        } else if (halign == "right") {
            x -= info.width;
        }
        if (valign == "middle") {
            y -= info.height / 2;
        } else if (valign == "bottom") {
            y -= info.height;
        }
        for (var i = 0, position; position = positions[i]; i++) {
            if (position.x == x && position.y == y) {
                position.active = true;
                return;
            }
        }
        position = {
            active: true,
            rendered: false,
            element: positions.length ? info.element.clone() : info.element,
            x: x,
            y: y
        };
        positions.push(position);
        position.element.css({
            top: Math.round(y),
            left: Math.round(x),
            'text-align': halign
        });
    };
    Canvas.prototype.removeText = function (layer, x, y, text, font, angle) {
        if (text == null) {
            var layerCache = this._textCache[layer];
            if (layerCache != null) {
                for (var styleKey in layerCache) {
                    if (hasOwnProperty.call(layerCache, styleKey)) {
                        var styleCache = layerCache[styleKey];
                        for (var key in styleCache) {
                            if (hasOwnProperty.call(styleCache, key)) {
                                var positions = styleCache[key].positions;
                                for (var i = 0, position; position = positions[i]; i++) {
                                    position.active = false;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            var positions = this.getTextInfo(layer, text, font, angle).positions;
            for (var i = 0, position; position = positions[i]; i++) {
                if (position.x == x && position.y == y) {
                    position.active = false;
                }
            }
        }
    };

    function Plot(placeholder, data_, options_, plugins) {
        var series = [],
            options = {
                colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                legend: {
                    show: true,
                    noColumns: 1,
                    labelFormatter: null,
                    labelBoxBorderColor: "#ccc",
                    container: null,
                    position: "ne",
                    margin: 5,
                    backgroundColor: null,
                    backgroundOpacity: 0.85,
                    sorted: null
                },
                xaxis: {
                    show: null,
                    position: "bottom",
                    mode: null,
                    font: null,
                    color: null,
                    tickColor: null,
                    transform: null,
                    inverseTransform: null,
                    min: null,
                    max: null,
                    autoscaleMargin: null,
                    ticks: null,
                    tickFormatter: null,
                    labelWidth: null,
                    labelHeight: null,
                    reserveSpace: null,
                    tickLength: null,
                    alignTicksWithAxis: null,
                    tickDecimals: null,
                    tickSize: null,
                    minTickSize: null
                },
                yaxis: {
                    autoscaleMargin: 0.02,
                    position: "left"
                },
                xaxes: [],
                yaxes: [],
                series: {
                    points: {
                        show: false,
                        radius: 3,
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle"
                    },
                    lines: {
                        lineWidth: 2,
                        fill: false,
                        fillColor: null,
                        steps: false
                    },
                    bars: {
                        show: false,
                        lineWidth: 2,
                        barWidth: 1,
                        fill: true,
                        fillColor: null,
                        align: "left",
                        horizontal: false,
                        zero: true
                    },
                    shadowSize: 3,
                    highlightColor: null
                },
                grid: {
                    show: true,
                    aboveData: false,
                    color: "#545454",
                    backgroundColor: null,
                    borderColor: null,
                    tickColor: null,
                    margin: 0,
                    labelMargin: 5,
                    axisMargin: 8,
                    borderWidth: 2,
                    minBorderMargin: null,
                    markings: null,
                    markingsColor: "#f4f4f4",
                    markingsLineWidth: 2,
                    clickable: false,
                    hoverable: false,
                    autoHighlight: true,
                    mouseActiveRadius: 10
                },
                interaction: {
                    redrawOverlayInterval: 1000 / 60
                },
                hooks: {}
            },
            surface = null,
            overlay = null,
            eventHolder = null,
            ctx = null,
            octx = null,
            xaxes = [],
            yaxes = [],
            plotOffset = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            plotWidth = 0,
            plotHeight = 0,
            hooks = {
                processOptions: [],
                processRawData: [],
                processDatapoints: [],
                processOffset: [],
                drawBackground: [],
                drawSeries: [],
                draw: [],
                bindEvents: [],
                drawOverlay: [],
                shutdown: []
            },
            plot = this;
        plot.setData = setData;
        plot.setupGrid = setupGrid;
        plot.draw = draw;
        plot.getPlaceholder = function () {
            return placeholder;
        };
        plot.getCanvas = function () {
            return surface.element;
        };
        plot.getPlotOffset = function () {
            return plotOffset;
        };
        plot.width = function () {
            return plotWidth;
        };
        plot.height = function () {
            return plotHeight;
        };
        plot.offset = function () {
            var o = eventHolder.offset();
            o.left += plotOffset.left;
            o.top += plotOffset.top;
            return o;
        };
        plot.getData = function () {
            return series;
        };
        plot.getAxes = function () {
            var res = {},
                i;
            $.each(xaxes.concat(yaxes), function (_, axis) {
                if (axis)
                    res[axis.direction + (axis.n != 1 ? axis.n : "") + "axis"] = axis;
            });
            return res;
        };
        plot.getXAxes = function () {
            return xaxes;
        };
        plot.getYAxes = function () {
            return yaxes;
        };
        plot.c2p = canvasToAxisCoords;
        plot.p2c = axisToCanvasCoords;
        plot.getOptions = function () {
            return options;
        };
        plot.highlight = highlight;
        plot.unhighlight = unhighlight;
        plot.triggerRedrawOverlay = triggerRedrawOverlay;
        plot.pointOffset = function (point) {
            return {
                left: parseInt(xaxes[axisNumber(point, "x") - 1].p2c(+point.x) + plotOffset.left, 10),
                top: parseInt(yaxes[axisNumber(point, "y") - 1].p2c(+point.y) + plotOffset.top, 10)
            };
        };
        plot.shutdown = shutdown;
        plot.destroy = function () {
            shutdown();
            placeholder.removeData("plot").empty();
            series = [];
            options = null;
            surface = null;
            overlay = null;
            eventHolder = null;
            ctx = null;
            octx = null;
            xaxes = [];
            yaxes = [];
            hooks = null;
            highlights = [];
            plot = null;
        };
        plot.resize = function () {
            var width = placeholder.width(),
                height = placeholder.height();
            surface.resize(width, height);
            overlay.resize(width, height);
        };
        plot.hooks = hooks;
        initPlugins(plot);
        parseOptions(options_);
        setupCanvases();
        setData(data_);
        setupGrid();
        draw();
        bindEvents();

        function executeHooks(hook, args) {
            args = [plot].concat(args);
            for (var i = 0; i < hook.length; ++i)
                hook[i].apply(this, args);
        }

        function initPlugins() {
            var classes = {
                Canvas: Canvas
            };
            for (var i = 0; i < plugins.length; ++i) {
                var p = plugins[i];
                p.init(plot, classes);
                if (p.options)
                    $.extend(true, options, p.options);
            }
        }

        function parseOptions(opts) {
            $.extend(true, options, opts);
            if (opts && opts.colors) {
                options.colors = opts.colors;
            }
            if (options.xaxis.color == null)
                options.xaxis.color = $.color.parse(options.grid.color).scale('a', 0.22).toString();
            if (options.yaxis.color == null)
                options.yaxis.color = $.color.parse(options.grid.color).scale('a', 0.22).toString();
            if (options.xaxis.tickColor == null)
                options.xaxis.tickColor = options.grid.tickColor || options.xaxis.color;
            if (options.yaxis.tickColor == null)
                options.yaxis.tickColor = options.grid.tickColor || options.yaxis.color;
            if (options.grid.borderColor == null)
                options.grid.borderColor = options.grid.color;
            if (options.grid.tickColor == null)
                options.grid.tickColor = $.color.parse(options.grid.color).scale('a', 0.22).toString();
            var i, axisOptions, axisCount, fontSize = placeholder.css("font-size"),
                fontSizeDefault = fontSize ? +fontSize.replace("px", "") : 13,
                fontDefaults = {
                    style: placeholder.css("font-style"),
                    size: Math.round(0.8 * fontSizeDefault),
                    variant: placeholder.css("font-variant"),
                    weight: placeholder.css("font-weight"),
                    family: placeholder.css("font-family")
                };
            axisCount = options.xaxes.length || 1;
            for (i = 0; i < axisCount; ++i) {
                axisOptions = options.xaxes[i];
                if (axisOptions && !axisOptions.tickColor) {
                    axisOptions.tickColor = axisOptions.color;
                }
                axisOptions = $.extend(true, {}, options.xaxis, axisOptions);
                options.xaxes[i] = axisOptions;
                if (axisOptions.font) {
                    axisOptions.font = $.extend({}, fontDefaults, axisOptions.font);
                    if (!axisOptions.font.color) {
                        axisOptions.font.color = axisOptions.color;
                    }
                    if (!axisOptions.font.lineHeight) {
                        axisOptions.font.lineHeight = Math.round(axisOptions.font.size * 1.15);
                    }
                }
            }
            axisCount = options.yaxes.length || 1;
            for (i = 0; i < axisCount; ++i) {
                axisOptions = options.yaxes[i];
                if (axisOptions && !axisOptions.tickColor) {
                    axisOptions.tickColor = axisOptions.color;
                }
                axisOptions = $.extend(true, {}, options.yaxis, axisOptions);
                options.yaxes[i] = axisOptions;
                if (axisOptions.font) {
                    axisOptions.font = $.extend({}, fontDefaults, axisOptions.font);
                    if (!axisOptions.font.color) {
                        axisOptions.font.color = axisOptions.color;
                    }
                    if (!axisOptions.font.lineHeight) {
                        axisOptions.font.lineHeight = Math.round(axisOptions.font.size * 1.15);
                    }
                }
            }
            if (options.xaxis.noTicks && options.xaxis.ticks == null)
                options.xaxis.ticks = options.xaxis.noTicks;
            if (options.yaxis.noTicks && options.yaxis.ticks == null)
                options.yaxis.ticks = options.yaxis.noTicks;
            if (options.x2axis) {
                options.xaxes[1] = $.extend(true, {}, options.xaxis, options.x2axis);
                options.xaxes[1].position = "top";
                if (options.x2axis.min == null) {
                    options.xaxes[1].min = null;
                }
                if (options.x2axis.max == null) {
                    options.xaxes[1].max = null;
                }
            }
            if (options.y2axis) {
                options.yaxes[1] = $.extend(true, {}, options.yaxis, options.y2axis);
                options.yaxes[1].position = "right";
                if (options.y2axis.min == null) {
                    options.yaxes[1].min = null;
                }
                if (options.y2axis.max == null) {
                    options.yaxes[1].max = null;
                }
            }
            if (options.grid.coloredAreas)
                options.grid.markings = options.grid.coloredAreas;
            if (options.grid.coloredAreasColor)
                options.grid.markingsColor = options.grid.coloredAreasColor;
            if (options.lines)
                $.extend(true, options.series.lines, options.lines);
            if (options.points)
                $.extend(true, options.series.points, options.points);
            if (options.bars)
                $.extend(true, options.series.bars, options.bars);
            if (options.shadowSize != null)
                options.series.shadowSize = options.shadowSize;
            if (options.highlightColor != null)
                options.series.highlightColor = options.highlightColor;
            for (i = 0; i < options.xaxes.length; ++i)
                getOrCreateAxis(xaxes, i + 1).options = options.xaxes[i];
            for (i = 0; i < options.yaxes.length; ++i)
                getOrCreateAxis(yaxes, i + 1).options = options.yaxes[i];
            for (var n in hooks)
                if (options.hooks[n] && options.hooks[n].length)
                    hooks[n] = hooks[n].concat(options.hooks[n]);
            executeHooks(hooks.processOptions, [options]);
        }

        function setData(d) {
            series = parseData(d);
            fillInSeriesOptions();
            processData();
        }

        function parseData(d) {
            var res = [];
            for (var i = 0; i < d.length; ++i) {
                var s = $.extend(true, {}, options.series);
                if (d[i].data != null) {
                    s.data = d[i].data;
                    delete d[i].data;
                    $.extend(true, s, d[i]);
                    d[i].data = s.data;
                } else
                    s.data = d[i];
                res.push(s);
            }
            return res;
        }

        function axisNumber(obj, coord) {
            var a = obj[coord + "axis"];
            if (typeof a == "object")
                a = a.n;
            if (typeof a != "number")
                a = 1;
            return a;
        }

        function allAxes() {
            return $.grep(xaxes.concat(yaxes), function (a) {
                return a;
            });
        }

        function canvasToAxisCoords(pos) {
            var res = {},
                i, axis;
            for (i = 0; i < xaxes.length; ++i) {
                axis = xaxes[i];
                if (axis && axis.used)
                    res["x" + axis.n] = axis.c2p(pos.left);
            }
            for (i = 0; i < yaxes.length; ++i) {
                axis = yaxes[i];
                if (axis && axis.used)
                    res["y" + axis.n] = axis.c2p(pos.top);
            }
            if (res.x1 !== undefined)
                res.x = res.x1;
            if (res.y1 !== undefined)
                res.y = res.y1;
            return res;
        }

        function axisToCanvasCoords(pos) {
            var res = {},
                i, axis, key;
            for (i = 0; i < xaxes.length; ++i) {
                axis = xaxes[i];
                if (axis && axis.used) {
                    key = "x" + axis.n;
                    if (pos[key] == null && axis.n == 1)
                        key = "x";
                    if (pos[key] != null) {
                        res.left = axis.p2c(pos[key]);
                        break;
                    }
                }
            }
            for (i = 0; i < yaxes.length; ++i) {
                axis = yaxes[i];
                if (axis && axis.used) {
                    key = "y" + axis.n;
                    if (pos[key] == null && axis.n == 1)
                        key = "y";
                    if (pos[key] != null) {
                        res.top = axis.p2c(pos[key]);
                        break;
                    }
                }
            }
            return res;
        }

        function getOrCreateAxis(axes, number) {
            if (!axes[number - 1])
                axes[number - 1] = {
                    n: number,
                    direction: axes == xaxes ? "x" : "y",
                    options: $.extend(true, {}, axes == xaxes ? options.xaxis : options.yaxis)
                };
            return axes[number - 1];
        }

        function fillInSeriesOptions() {
            var neededColors = series.length,
                maxIndex = -1,
                i;
            for (i = 0; i < series.length; ++i) {
                var sc = series[i].color;
                if (sc != null) {
                    neededColors--;
                    if (typeof sc == "number" && sc > maxIndex) {
                        maxIndex = sc;
                    }
                }
            }
            if (neededColors <= maxIndex) {
                neededColors = maxIndex + 1;
            }
            var c, colors = [],
                colorPool = options.colors,
                colorPoolSize = colorPool.length,
                variation = 0;
            for (i = 0; i < neededColors; i++) {
                c = $.color.parse(colorPool[i % colorPoolSize] || "#666");
                if (i % colorPoolSize == 0 && i) {
                    if (variation >= 0) {
                        if (variation < 0.5) {
                            variation = -variation - 0.2;
                        } else variation = 0;
                    } else variation = -variation;
                }
                colors[i] = c.scale('rgb', 1 + variation);
            }
            var colori = 0,
                s;
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                if (s.color == null) {
                    s.color = colors[colori].toString();
                    ++colori;
                } else if (typeof s.color == "number")
                    s.color = colors[s.color].toString();
                if (s.lines.show == null) {
                    var v, show = true;
                    for (v in s)
                        if (s[v] && s[v].show) {
                            show = false;
                            break;
                        }
                    if (show)
                        s.lines.show = true;
                }
                if (s.lines.zero == null) {
                    s.lines.zero = !!s.lines.fill;
                }
                s.xaxis = getOrCreateAxis(xaxes, axisNumber(s, "x"));
                s.yaxis = getOrCreateAxis(yaxes, axisNumber(s, "y"));
            }
        }

        function processData() {
            var topSentry = Number.POSITIVE_INFINITY,
                bottomSentry = Number.NEGATIVE_INFINITY,
                fakeInfinity = Number.MAX_VALUE,
                i, j, k, m, length, s, points, ps, x, y, axis, val, f, p, data, format;

            function updateAxis(axis, min, max) {
                if (min < axis.datamin && min != -fakeInfinity)
                    axis.datamin = min;
                if (max > axis.datamax && max != fakeInfinity)
                    axis.datamax = max;
            }
            $.each(allAxes(), function (_, axis) {
                axis.datamin = topSentry;
                axis.datamax = bottomSentry;
                axis.used = false;
            });
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                s.datapoints = {
                    points: []
                };
                executeHooks(hooks.processRawData, [s, s.data, s.datapoints]);
            }
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                data = s.data;
                format = s.datapoints.format;
                if (!format) {
                    format = [];
                    format.push({
                        x: true,
                        number: true,
                        required: true
                    });
                    format.push({
                        y: true,
                        number: true,
                        required: true
                    });
                    if (s.bars.show || (s.lines.show && s.lines.fill)) {
                        var autoscale = !!((s.bars.show && s.bars.zero) || (s.lines.show && s.lines.zero));
                        format.push({
                            y: true,
                            number: true,
                            required: false,
                            defaultValue: 0,
                            autoscale: autoscale
                        });
                        if (s.bars.horizontal) {
                            delete format[format.length - 1].y;
                            format[format.length - 1].x = true;
                        }
                    }
                    s.datapoints.format = format;
                }
                if (s.datapoints.pointsize != null)
                    continue;
                s.datapoints.pointsize = format.length;
                ps = s.datapoints.pointsize;
                points = s.datapoints.points;
                var insertSteps = s.lines.show && s.lines.steps;
                s.xaxis.used = s.yaxis.used = true;
                for (j = k = 0; j < data.length; ++j, k += ps) {
                    p = data[j];
                    var nullify = p == null;
                    if (!nullify) {
                        for (m = 0; m < ps; ++m) {
                            val = p[m];
                            f = format[m];
                            if (f) {
                                if (f.number && val != null) {
                                    val = +val;
                                    if (isNaN(val))
                                        val = null;
                                    else if (val == Infinity)
                                        val = fakeInfinity;
                                    else if (val == -Infinity)
                                        val = -fakeInfinity;
                                }
                                if (val == null) {
                                    if (f.required)
                                        nullify = true;
                                    if (f.defaultValue != null)
                                        val = f.defaultValue;
                                }
                            }
                            points[k + m] = val;
                        }
                    }
                    if (nullify) {
                        for (m = 0; m < ps; ++m) {
                            val = points[k + m];
                            if (val != null) {
                                f = format[m];
                                if (f.autoscale !== false) {
                                    if (f.x) {
                                        updateAxis(s.xaxis, val, val);
                                    }
                                    if (f.y) {
                                        updateAxis(s.yaxis, val, val);
                                    }
                                }
                            }
                            points[k + m] = null;
                        }
                    } else {
                        if (insertSteps && k > 0 && points[k - ps] != null && points[k - ps] != points[k] && points[k - ps + 1] != points[k + 1]) {
                            for (m = 0; m < ps; ++m)
                                points[k + ps + m] = points[k + m];
                            points[k + 1] = points[k - ps + 1];
                            k += ps;
                        }
                    }
                }
            }
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                executeHooks(hooks.processDatapoints, [s, s.datapoints]);
            }
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                points = s.datapoints.points;
                ps = s.datapoints.pointsize;
                format = s.datapoints.format;
                var xmin = topSentry,
                    ymin = topSentry,
                    xmax = bottomSentry,
                    ymax = bottomSentry;
                for (j = 0; j < points.length; j += ps) {
                    if (points[j] == null)
                        continue;
                    for (m = 0; m < ps; ++m) {
                        val = points[j + m];
                        f = format[m];
                        if (!f || f.autoscale === false || val == fakeInfinity || val == -fakeInfinity)
                            continue;
                        if (f.x) {
                            if (val < xmin)
                                xmin = val;
                            if (val > xmax)
                                xmax = val;
                        }
                        if (f.y) {
                            if (val < ymin)
                                ymin = val;
                            if (val > ymax)
                                ymax = val;
                        }
                    }
                }
                if (s.bars.show) {
                    var delta;
                    switch (s.bars.align) {
                        case "left":
                            delta = 0;
                            break;
                        case "right":
                            delta = -s.bars.barWidth;
                            break;
                        default:
                            delta = -s.bars.barWidth / 2;
                    }
                    if (s.bars.horizontal) {
                        ymin += delta;
                        ymax += delta + s.bars.barWidth;
                    } else {
                        xmin += delta;
                        xmax += delta + s.bars.barWidth;
                    }
                }
                updateAxis(s.xaxis, xmin, xmax);
                updateAxis(s.yaxis, ymin, ymax);
            }
            $.each(allAxes(), function (_, axis) {
                if (axis.datamin == topSentry)
                    axis.datamin = null;
                if (axis.datamax == bottomSentry)
                    axis.datamax = null;
            });
        }

        function setupCanvases() {
            placeholder.css("padding", 0).children().filter(function () {
                return !$(this).hasClass("flot-overlay") && !$(this).hasClass('flot-base');
            }).remove();
            if (placeholder.css("position") == 'static')
                placeholder.css("position", "relative");
            surface = new Canvas("flot-base", placeholder);
            overlay = new Canvas("flot-overlay", placeholder);
            ctx = surface.context;
            octx = overlay.context;
            eventHolder = $(overlay.element).unbind();
            var existing = placeholder.data("plot");
            if (existing) {
                existing.shutdown();
                overlay.clear();
            }
            placeholder.data("plot", plot);
        }

        function bindEvents() {
            if (options.grid.hoverable) {
                eventHolder.mousemove(onMouseMove);
                eventHolder.bind("mouseleave", onMouseLeave);
            }
            if (options.grid.clickable)
                eventHolder.click(onClick);
            executeHooks(hooks.bindEvents, [eventHolder]);
        }

        function shutdown() {
            if (redrawTimeout)
                clearTimeout(redrawTimeout);
            eventHolder.unbind("mousemove", onMouseMove);
            eventHolder.unbind("mouseleave", onMouseLeave);
            eventHolder.unbind("click", onClick);
            executeHooks(hooks.shutdown, [eventHolder]);
        }

        function setTransformationHelpers(axis) {
            function identity(x) {
                return x;
            }
            var s, m, t = axis.options.transform || identity,
                it = axis.options.inverseTransform;
            if (axis.direction == "x") {
                s = axis.scale = plotWidth / Math.abs(t(axis.max) - t(axis.min));
                m = Math.min(t(axis.max), t(axis.min));
            } else {
                s = axis.scale = plotHeight / Math.abs(t(axis.max) - t(axis.min));
                s = -s;
                m = Math.max(t(axis.max), t(axis.min));
            }
            if (t == identity)
                axis.p2c = function (p) {
                    return (p - m) * s;
                };
            else
                axis.p2c = function (p) {
                    return (t(p) - m) * s;
                };
            if (!it)
                axis.c2p = function (c) {
                    return m + c / s;
                };
            else
                axis.c2p = function (c) {
                    return it(m + c / s);
                };
        }

        function measureTickLabels(axis) {
            var opts = axis.options,
                ticks = axis.ticks || [],
                labelWidth = opts.labelWidth || 0,
                labelHeight = opts.labelHeight || 0,
                maxWidth = labelWidth || (axis.direction == "x" ? Math.floor(surface.width / (ticks.length || 1)) : null),
                legacyStyles = axis.direction + "Axis " + axis.direction + axis.n + "Axis",
                layer = "flot-" + axis.direction + "-axis flot-" + axis.direction + axis.n + "-axis " + legacyStyles,
                font = opts.font || "flot-tick-label tickLabel";
            for (var i = 0; i < ticks.length; ++i) {
                var t = ticks[i];
                if (!t.label)
                    continue;
                var info = surface.getTextInfo(layer, t.label, font, null, maxWidth);
                labelWidth = Math.max(labelWidth, info.width);
                labelHeight = Math.max(labelHeight, info.height);
            }
            axis.labelWidth = opts.labelWidth || labelWidth;
            axis.labelHeight = opts.labelHeight || labelHeight;
        }

        function allocateAxisBoxFirstPhase(axis) {
            var lw = axis.labelWidth,
                lh = axis.labelHeight,
                pos = axis.options.position,
                isXAxis = axis.direction === "x",
                tickLength = axis.options.tickLength,
                axisMargin = options.grid.axisMargin,
                padding = options.grid.labelMargin,
                innermost = true,
                outermost = true,
                first = true,
                found = false;
            $.each(isXAxis ? xaxes : yaxes, function (i, a) {
                if (a && (a.show || a.reserveSpace)) {
                    if (a === axis) {
                        found = true;
                    } else if (a.options.position === pos) {
                        if (found) {
                            outermost = false;
                        } else {
                            innermost = false;
                        }
                    }
                    if (!found) {
                        first = false;
                    }
                }
            });
            if (outermost) {
                axisMargin = 0;
            }
            if (tickLength == null) {
                tickLength = first ? "full" : 5;
            }
            if (!isNaN(+tickLength))
                padding += +tickLength;
            if (isXAxis) {
                lh += padding;
                if (pos == "bottom") {
                    plotOffset.bottom += lh + axisMargin;
                    axis.box = {
                        top: surface.height - plotOffset.bottom,
                        height: lh
                    };
                } else {
                    axis.box = {
                        top: plotOffset.top + axisMargin,
                        height: lh
                    };
                    plotOffset.top += lh + axisMargin;
                }
            } else {
                lw += padding;
                if (pos == "left") {
                    axis.box = {
                        left: plotOffset.left + axisMargin,
                        width: lw
                    };
                    plotOffset.left += lw + axisMargin;
                } else {
                    plotOffset.right += lw + axisMargin;
                    axis.box = {
                        left: surface.width - plotOffset.right,
                        width: lw
                    };
                }
            }
            axis.position = pos;
            axis.tickLength = tickLength;
            axis.box.padding = padding;
            axis.innermost = innermost;
        }

        function allocateAxisBoxSecondPhase(axis) {
            if (axis.direction == "x") {
                axis.box.left = plotOffset.left - axis.labelWidth / 2;
                axis.box.width = surface.width - plotOffset.left - plotOffset.right + axis.labelWidth;
            } else {
                axis.box.top = plotOffset.top - axis.labelHeight / 2;
                axis.box.height = surface.height - plotOffset.bottom - plotOffset.top + axis.labelHeight;
            }
        }

        function adjustLayoutForThingsStickingOut() {
            var minMargin = options.grid.minBorderMargin,
                axis, i;
            if (minMargin == null) {
                minMargin = 0;
                for (i = 0; i < series.length; ++i)
                    minMargin = Math.max(minMargin, 2 * (series[i].points.radius + series[i].points.lineWidth / 2));
            }
            var margins = {
                left: minMargin,
                right: minMargin,
                top: minMargin,
                bottom: minMargin
            };
            $.each(allAxes(), function (_, axis) {
                if (axis.reserveSpace && axis.ticks && axis.ticks.length) {
                    if (axis.direction === "x") {
                        margins.left = Math.max(margins.left, axis.labelWidth / 2);
                        margins.right = Math.max(margins.right, axis.labelWidth / 2);
                    } else {
                        margins.bottom = Math.max(margins.bottom, axis.labelHeight / 2);
                        margins.top = Math.max(margins.top, axis.labelHeight / 2);
                    }
                }
            });
            plotOffset.left = Math.ceil(Math.max(margins.left, plotOffset.left));
            plotOffset.right = Math.ceil(Math.max(margins.right, plotOffset.right));
            plotOffset.top = Math.ceil(Math.max(margins.top, plotOffset.top));
            plotOffset.bottom = Math.ceil(Math.max(margins.bottom, plotOffset.bottom));
        }

        function setupGrid() {
            var i, axes = allAxes(),
                showGrid = options.grid.show;
            for (var a in plotOffset) {
                var margin = options.grid.margin || 0;
                plotOffset[a] = typeof margin == "number" ? margin : margin[a] || 0;
            }
            executeHooks(hooks.processOffset, [plotOffset]);
            for (var a in plotOffset) {
                if (typeof (options.grid.borderWidth) == "object") {
                    plotOffset[a] += showGrid ? options.grid.borderWidth[a] : 0;
                } else {
                    plotOffset[a] += showGrid ? options.grid.borderWidth : 0;
                }
            }
            $.each(axes, function (_, axis) {
                var axisOpts = axis.options;
                axis.show = axisOpts.show == null ? axis.used : axisOpts.show;
                axis.reserveSpace = axisOpts.reserveSpace == null ? axis.show : axisOpts.reserveSpace;
                setRange(axis);
            });
            if (showGrid) {
                var allocatedAxes = $.grep(axes, function (axis) {
                    return axis.show || axis.reserveSpace;
                });
                $.each(allocatedAxes, function (_, axis) {
                    setupTickGeneration(axis);
                    setTicks(axis);
                    snapRangeToTicks(axis, axis.ticks);
                    measureTickLabels(axis);
                });
                for (i = allocatedAxes.length - 1; i >= 0; --i)
                    allocateAxisBoxFirstPhase(allocatedAxes[i]);
                adjustLayoutForThingsStickingOut();
                $.each(allocatedAxes, function (_, axis) {
                    allocateAxisBoxSecondPhase(axis);
                });
            }
            plotWidth = surface.width - plotOffset.left - plotOffset.right;
            plotHeight = surface.height - plotOffset.bottom - plotOffset.top;
            $.each(axes, function (_, axis) {
                setTransformationHelpers(axis);
            });
            if (showGrid) {
                drawAxisLabels();
            }
            insertLegend();
        }

        function setRange(axis) {
            var opts = axis.options,
                min = +(opts.min != null ? opts.min : axis.datamin),
                max = +(opts.max != null ? opts.max : axis.datamax),
                delta = max - min;
            if (delta == 0.0) {
                var widen = max == 0 ? 1 : 0.01;
                if (opts.min == null)
                    min -= widen;
                if (opts.max == null || opts.min != null)
                    max += widen;
            } else {
                var margin = opts.autoscaleMargin;
                if (margin != null) {
                    if (opts.min == null) {
                        min -= delta * margin;
                        if (min < 0 && axis.datamin != null && axis.datamin >= 0)
                            min = 0;
                    }
                    if (opts.max == null) {
                        max += delta * margin;
                        if (max > 0 && axis.datamax != null && axis.datamax <= 0)
                            max = 0;
                    }
                }
            }
            axis.min = min;
            axis.max = max;
        }

        function setupTickGeneration(axis) {
            var opts = axis.options;
            var noTicks;
            if (typeof opts.ticks == "number" && opts.ticks > 0)
                noTicks = opts.ticks;
            else
                noTicks = 0.3 * Math.sqrt(axis.direction == "x" ? surface.width : surface.height);
            var delta = (axis.max - axis.min) / noTicks,
                dec = -Math.floor(Math.log(delta) / Math.LN10),
                maxDec = opts.tickDecimals;
            if (maxDec != null && dec > maxDec) {
                dec = maxDec;
            }
            var magn = Math.pow(10, -dec),
                norm = delta / magn,
                size;
            if (norm < 1.5) {
                size = 1;
            } else if (norm < 3) {
                size = 2;
                if (norm > 2.25 && (maxDec == null || dec + 1 <= maxDec)) {
                    size = 2.5;
                    ++dec;
                }
            } else if (norm < 7.5) {
                size = 5;
            } else {
                size = 10;
            }
            size *= magn;
            if (opts.minTickSize != null && size < opts.minTickSize) {
                size = opts.minTickSize;
            }
            axis.delta = delta;
            axis.tickDecimals = Math.max(0, maxDec != null ? maxDec : dec);
            axis.tickSize = opts.tickSize || size;
            if (opts.mode == "time" && !axis.tickGenerator) {
                throw new Error("Time mode requires the flot.time plugin.");
            }
            if (!axis.tickGenerator) {
                axis.tickGenerator = function (axis) {
                    var ticks = [],
                        start = floorInBase(axis.min, axis.tickSize),
                        i = 0,
                        v = Number.NaN,
                        prev;
                    do {
                        prev = v;
                        v = start + i * axis.tickSize;
                        ticks.push(v);
                        ++i;
                    } while (v < axis.max && v != prev);
                    return ticks;
                };
                axis.tickFormatter = function (value, axis) {
                    var factor = axis.tickDecimals ? Math.pow(10, axis.tickDecimals) : 1;
                    var formatted = "" + Math.round(value * factor) / factor;
                    if (axis.tickDecimals != null) {
                        var decimal = formatted.indexOf(".");
                        var precision = decimal == -1 ? 0 : formatted.length - decimal - 1;
                        if (precision < axis.tickDecimals) {
                            return (precision ? formatted : formatted + ".") + ("" + factor).substr(1, axis.tickDecimals - precision);
                        }
                    }
                    return formatted;
                };
            }
            if ($.isFunction(opts.tickFormatter))
                axis.tickFormatter = function (v, axis) {
                    return "" + opts.tickFormatter(v, axis);
                };
            if (opts.alignTicksWithAxis != null) {
                var otherAxis = (axis.direction == "x" ? xaxes : yaxes)[opts.alignTicksWithAxis - 1];
                if (otherAxis && otherAxis.used && otherAxis != axis) {
                    var niceTicks = axis.tickGenerator(axis);
                    if (niceTicks.length > 0) {
                        if (opts.min == null)
                            axis.min = Math.min(axis.min, niceTicks[0]);
                        if (opts.max == null && niceTicks.length > 1)
                            axis.max = Math.max(axis.max, niceTicks[niceTicks.length - 1]);
                    }
                    axis.tickGenerator = function (axis) {
                        var ticks = [],
                            v, i;
                        for (i = 0; i < otherAxis.ticks.length; ++i) {
                            v = (otherAxis.ticks[i].v - otherAxis.min) / (otherAxis.max - otherAxis.min);
                            v = axis.min + v * (axis.max - axis.min);
                            ticks.push(v);
                        }
                        return ticks;
                    };
                    if (!axis.mode && opts.tickDecimals == null) {
                        var extraDec = Math.max(0, -Math.floor(Math.log(axis.delta) / Math.LN10) + 1),
                            ts = axis.tickGenerator(axis);
                        if (!(ts.length > 1 && /\..*0$/.test((ts[1] - ts[0]).toFixed(extraDec))))
                            axis.tickDecimals = extraDec;
                    }
                }
            }
        }

        function setTicks(axis) {
            var oticks = axis.options.ticks,
                ticks = [];
            if (oticks == null || (typeof oticks == "number" && oticks > 0))
                ticks = axis.tickGenerator(axis);
            else if (oticks) {
                if ($.isFunction(oticks))
                    ticks = oticks(axis);
                else
                    ticks = oticks;
            }
            var i, v;
            axis.ticks = [];
            for (i = 0; i < ticks.length; ++i) {
                var label = null;
                var t = ticks[i];
                if (typeof t == "object") {
                    v = +t[0];
                    if (t.length > 1)
                        label = t[1];
                } else
                    v = +t;
                if (label == null)
                    label = axis.tickFormatter(v, axis);
                if (!isNaN(v))
                    axis.ticks.push({
                        v: v,
                        label: label
                    });
            }
        }

        function snapRangeToTicks(axis, ticks) {
            if (axis.options.autoscaleMargin && ticks.length > 0) {
                if (axis.options.min == null)
                    axis.min = Math.min(axis.min, ticks[0].v);
                if (axis.options.max == null && ticks.length > 1)
                    axis.max = Math.max(axis.max, ticks[ticks.length - 1].v);
            }
        }

        function draw() {
            surface.clear();
            executeHooks(hooks.drawBackground, [ctx]);
            var grid = options.grid;
            if (grid.show && grid.backgroundColor)
                drawBackground();
            if (grid.show && !grid.aboveData) {
                drawGrid();
            }
            for (var i = 0; i < series.length; ++i) {
                executeHooks(hooks.drawSeries, [ctx, series[i]]);
                drawSeries(series[i]);
            }
            executeHooks(hooks.draw, [ctx]);
            if (grid.show && grid.aboveData) {
                drawGrid();
            }
            surface.render();
            triggerRedrawOverlay();
        }

        function extractRange(ranges, coord) {
            var axis, from, to, key, axes = allAxes();
            for (var i = 0; i < axes.length; ++i) {
                axis = axes[i];
                if (axis.direction == coord) {
                    key = coord + axis.n + "axis";
                    if (!ranges[key] && axis.n == 1)
                        key = coord + "axis";
                    if (ranges[key]) {
                        from = ranges[key].from;
                        to = ranges[key].to;
                        break;
                    }
                }
            }
            if (!ranges[key]) {
                axis = coord == "x" ? xaxes[0] : yaxes[0];
                from = ranges[coord + "1"];
                to = ranges[coord + "2"];
            }
            if (from != null && to != null && from > to) {
                var tmp = from;
                from = to;
                to = tmp;
            }
            return {
                from: from,
                to: to,
                axis: axis
            };
        }

        function drawBackground() {
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            //ctx.fillStyle = getColorOrGradient(options.grid.backgroundColor, plotHeight, 0, "rgba(255, 255, 255, 0)");
            ctx.fillRect(0, 0, plotWidth, plotHeight);
            ctx.restore();
        }

        function drawGrid() {
            var i, axes, bw, bc;
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            var markings = options.grid.markings;
            if (markings) {
                if ($.isFunction(markings)) {
                    axes = plot.getAxes();
                    axes.xmin = axes.xaxis.min;
                    axes.xmax = axes.xaxis.max;
                    axes.ymin = axes.yaxis.min;
                    axes.ymax = axes.yaxis.max;
                    markings = markings(axes);
                }
                for (i = 0; i < markings.length; ++i) {
                    var m = markings[i],
                        xrange = extractRange(m, "x"),
                        yrange = extractRange(m, "y");
                    if (xrange.from == null)
                        xrange.from = xrange.axis.min;
                    if (xrange.to == null)
                        xrange.to = xrange.axis.max;
                    if (yrange.from == null)
                        yrange.from = yrange.axis.min;
                    if (yrange.to == null)
                        yrange.to = yrange.axis.max;
                    if (xrange.to < xrange.axis.min || xrange.from > xrange.axis.max || yrange.to < yrange.axis.min || yrange.from > yrange.axis.max)
                        continue;
                    xrange.from = Math.max(xrange.from, xrange.axis.min);
                    xrange.to = Math.min(xrange.to, xrange.axis.max);
                    yrange.from = Math.max(yrange.from, yrange.axis.min);
                    yrange.to = Math.min(yrange.to, yrange.axis.max);
                    var xequal = xrange.from === xrange.to,
                        yequal = yrange.from === yrange.to;
                    if (xequal && yequal) {
                        continue;
                    }
                    xrange.from = Math.floor(xrange.axis.p2c(xrange.from));
                    xrange.to = Math.floor(xrange.axis.p2c(xrange.to));
                    yrange.from = Math.floor(yrange.axis.p2c(yrange.from));
                    yrange.to = Math.floor(yrange.axis.p2c(yrange.to));
                    if (xequal || yequal) {
                        var lineWidth = m.lineWidth || options.grid.markingsLineWidth,
                            subPixel = lineWidth % 2 ? 0.5 : 0;
                        ctx.beginPath();
                        ctx.strokeStyle = m.color || options.grid.markingsColor;
                        ctx.lineWidth = lineWidth;
                        if (xequal) {
                            ctx.moveTo(xrange.to + subPixel, yrange.from);
                            ctx.lineTo(xrange.to + subPixel, yrange.to);
                        } else {
                            ctx.moveTo(xrange.from, yrange.to + subPixel);
                            ctx.lineTo(xrange.to, yrange.to + subPixel);
                        }
                        ctx.stroke();
                    } else {
                        ctx.fillStyle = m.color || options.grid.markingsColor;
                        ctx.fillRect(xrange.from, yrange.to, xrange.to - xrange.from, yrange.from - yrange.to);
                    }
                }
            }
            axes = allAxes();
            bw = options.grid.borderWidth;
            for (var j = 0; j < axes.length; ++j) {
                var axis = axes[j],
                    box = axis.box,
                    t = axis.tickLength,
                    x, y, xoff, yoff;
                if (!axis.show || axis.ticks.length == 0)
                    continue;
                ctx.lineWidth = 1;
                if (axis.direction == "x") {
                    x = 0;
                    if (t == "full")
                        y = (axis.position == "top" ? 0 : plotHeight);
                    else
                        y = box.top - plotOffset.top + (axis.position == "top" ? box.height : 0);
                } else {
                    y = 0;
                    if (t == "full")
                        x = (axis.position == "left" ? 0 : plotWidth);
                    else
                        x = box.left - plotOffset.left + (axis.position == "left" ? box.width : 0);
                }
                if (!axis.innermost) {
                    ctx.strokeStyle = axis.options.color;
                    ctx.beginPath();
                    xoff = yoff = 0;
                    if (axis.direction == "x")
                        xoff = plotWidth + 1;
                    else
                        yoff = plotHeight + 1;
                    if (ctx.lineWidth == 1) {
                        if (axis.direction == "x") {
                            y = Math.floor(y) + 0.5;
                        } else {
                            x = Math.floor(x) + 0.5;
                        }
                    }
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + xoff, y + yoff);
                    ctx.stroke();
                }
                ctx.strokeStyle = axis.options.tickColor;
                ctx.beginPath();
                for (i = 0; i < axis.ticks.length; ++i) {
                    var v = axis.ticks[i].v;
                    xoff = yoff = 0;
                    if (isNaN(v) || v < axis.min || v > axis.max || (t == "full" && ((typeof bw == "object" && bw[axis.position] > 0) || bw > 0) && (v == axis.min || v == axis.max)))
                        continue;
                    if (axis.direction == "x") {
                        x = axis.p2c(v);
                        yoff = t == "full" ? -plotHeight : t;
                        if (axis.position == "top")
                            yoff = -yoff;
                    } else {
                        y = axis.p2c(v);
                        xoff = t == "full" ? -plotWidth : t;
                        if (axis.position == "left")
                            xoff = -xoff;
                    }
                    if (ctx.lineWidth == 1) {
                        if (axis.direction == "x")
                            x = Math.floor(x) + 0.5;
                        else
                            y = Math.floor(y) + 0.5;
                    }
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + xoff, y + yoff);
                }
                ctx.stroke();
            }
            if (bw) {
                bc = options.grid.borderColor;
                if (typeof bw == "object" || typeof bc == "object") {
                    if (typeof bw !== "object") {
                        bw = {
                            top: bw,
                            right: bw,
                            bottom: bw,
                            left: bw
                        };
                    }
                    if (typeof bc !== "object") {
                        bc = {
                            top: bc,
                            right: bc,
                            bottom: bc,
                            left: bc
                        };
                    }
                    if (bw.top > 0) {
                        ctx.strokeStyle = bc.top;
                        ctx.lineWidth = bw.top;
                        ctx.beginPath();
                        ctx.moveTo(0 - bw.left, 0 - bw.top / 2);
                        ctx.lineTo(plotWidth, 0 - bw.top / 2);
                        ctx.stroke();
                    }
                    if (bw.right > 0) {
                        ctx.strokeStyle = bc.right;
                        ctx.lineWidth = bw.right;
                        ctx.beginPath();
                        ctx.moveTo(plotWidth + bw.right / 2, 0 - bw.top);
                        ctx.lineTo(plotWidth + bw.right / 2, plotHeight);
                        ctx.stroke();
                    }
                    if (bw.bottom > 0) {
                        ctx.strokeStyle = bc.bottom;
                        ctx.lineWidth = bw.bottom;
                        ctx.beginPath();
                        ctx.moveTo(plotWidth + bw.right, plotHeight + bw.bottom / 2);
                        ctx.lineTo(0, plotHeight + bw.bottom / 2);
                        ctx.stroke();
                    }
                    if (bw.left > 0) {
                        ctx.strokeStyle = bc.left;
                        ctx.lineWidth = bw.left;
                        ctx.beginPath();
                        ctx.moveTo(0 - bw.left / 2, plotHeight + bw.bottom);
                        ctx.lineTo(0 - bw.left / 2, 0);
                        ctx.stroke();
                    }
                } else {
                    ctx.lineWidth = bw;
                    ctx.strokeStyle = options.grid.borderColor;
                    ctx.strokeRect(-bw / 2, -bw / 2, plotWidth + bw, plotHeight + bw);
                }
            }
            ctx.restore();
        }

        function drawAxisLabels() {
            $.each(allAxes(), function (_, axis) {
                var box = axis.box,
                    legacyStyles = axis.direction + "Axis " + axis.direction + axis.n + "Axis",
                    layer = "flot-" + axis.direction + "-axis flot-" + axis.direction + axis.n + "-axis " + legacyStyles,
                    font = axis.options.font || "flot-tick-label tickLabel",
                    tick, x, y, halign, valign;
                surface.removeText(layer);
                if (!axis.show || axis.ticks.length == 0)
                    return;
                for (var i = 0; i < axis.ticks.length; ++i) {
                    tick = axis.ticks[i];
                    if (!tick.label || tick.v < axis.min || tick.v > axis.max)
                        continue;
                    if (axis.direction == "x") {
                        halign = "center";
                        x = plotOffset.left + axis.p2c(tick.v);
                        if (axis.position == "bottom") {
                            y = box.top + box.padding;
                        } else {
                            y = box.top + box.height - box.padding;
                            valign = "bottom";
                        }
                    } else {
                        valign = "middle";
                        y = plotOffset.top + axis.p2c(tick.v);
                        if (axis.position == "left") {
                            x = box.left + box.width - box.padding;
                            halign = "right";
                        } else {
                            x = box.left + box.padding;
                        }
                    }
                    surface.addText(layer, x, y, tick.label, font, null, null, halign, valign);
                }
            });
        }

        function drawSeries(series) {
            if (series.lines.show)
                drawSeriesLines(series);
            if (series.bars.show)
                drawSeriesBars(series);
            if (series.points.show)
                drawSeriesPoints(series);
        }

        function drawSeriesLines(series) {
            function plotLine(datapoints, xoffset, yoffset, axisx, axisy) {
                var points = datapoints.points,
                    ps = datapoints.pointsize,
                    prevx = null,
                    prevy = null;
                ctx.beginPath();
                for (var i = ps; i < points.length; i += ps) {
                    var x1 = points[i - ps],
                        y1 = points[i - ps + 1],
                        x2 = points[i],
                        y2 = points[i + 1];
                    if (x1 == null || x2 == null)
                        continue;
                    if (y1 <= y2 && y1 < axisy.min) {
                        if (y2 < axisy.min)
                            continue;
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    } else if (y2 <= y1 && y2 < axisy.min) {
                        if (y1 < axisy.min)
                            continue;
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }
                    if (y1 >= y2 && y1 > axisy.max) {
                        if (y2 > axisy.max)
                            continue;
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    } else if (y2 >= y1 && y2 > axisy.max) {
                        if (y1 > axisy.max)
                            continue;
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    } else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    } else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }
                    if (x1 != prevx || y1 != prevy)
                        ctx.moveTo(axisx.p2c(x1) + xoffset, axisy.p2c(y1) + yoffset);
                    prevx = x2;
                    prevy = y2;
                    ctx.lineTo(axisx.p2c(x2) + xoffset, axisy.p2c(y2) + yoffset);
                }
                ctx.stroke();
            }

            function plotLineArea(datapoints, axisx, axisy) {
                var points = datapoints.points,
                    ps = datapoints.pointsize,
                    bottom = Math.min(Math.max(0, axisy.min), axisy.max),
                    i = 0,
                    top, areaOpen = false,
                    ypos = 1,
                    segmentStart = 0,
                    segmentEnd = 0;
                while (true) {
                    if (ps > 0 && i > points.length + ps)
                        break;
                    i += ps;
                    var x1 = points[i - ps],
                        y1 = points[i - ps + ypos],
                        x2 = points[i],
                        y2 = points[i + ypos];
                    if (areaOpen) {
                        if (ps > 0 && x1 != null && x2 == null) {
                            segmentEnd = i;
                            ps = -ps;
                            ypos = 2;
                            continue;
                        }
                        if (ps < 0 && i == segmentStart + ps) {
                            ctx.fill();
                            areaOpen = false;
                            ps = -ps;
                            ypos = 1;
                            i = segmentStart = segmentEnd + ps;
                            continue;
                        }
                    }
                    if (x1 == null || x2 == null)
                        continue;
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    } else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    } else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }
                    if (!areaOpen) {
                        ctx.beginPath();
                        ctx.moveTo(axisx.p2c(x1), axisy.p2c(bottom));
                        areaOpen = true;
                    }
                    if (y1 >= axisy.max && y2 >= axisy.max) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.max));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.max));
                        continue;
                    } else if (y1 <= axisy.min && y2 <= axisy.min) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.min));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.min));
                        continue;
                    }
                    var x1old = x1,
                        x2old = x2;
                    if (y1 <= y2 && y1 < axisy.min && y2 >= axisy.min) {
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    } else if (y2 <= y1 && y2 < axisy.min && y1 >= axisy.min) {
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }
                    if (y1 >= y2 && y1 > axisy.max && y2 <= axisy.max) {
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    } else if (y2 >= y1 && y2 > axisy.max && y1 <= axisy.max) {
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }
                    if (x1 != x1old) {
                        ctx.lineTo(axisx.p2c(x1old), axisy.p2c(y1));
                    }
                    ctx.lineTo(axisx.p2c(x1), axisy.p2c(y1));
                    ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2));
                    if (x2 != x2old) {
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2));
                        ctx.lineTo(axisx.p2c(x2old), axisy.p2c(y2));
                    }
                }
            }
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineJoin = "round";
            var lw = series.lines.lineWidth,
                sw = series.shadowSize;
            if (lw > 0 && sw > 0) {
                ctx.lineWidth = sw;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                var angle = Math.PI / 18;
                plotLine(series.datapoints, Math.sin(angle) * (lw / 2 + sw / 2), Math.cos(angle) * (lw / 2 + sw / 2), series.xaxis, series.yaxis);
                ctx.lineWidth = sw / 2;
                plotLine(series.datapoints, Math.sin(angle) * (lw / 2 + sw / 4), Math.cos(angle) * (lw / 2 + sw / 4), series.xaxis, series.yaxis);
            }
            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            var fillStyle = getFillStyle(series.lines, series.color, 0, plotHeight);
            if (fillStyle) {
                ctx.fillStyle = fillStyle;
                plotLineArea(series.datapoints, series.xaxis, series.yaxis);
            }
            if (lw > 0)
                plotLine(series.datapoints, 0, 0, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function drawSeriesPoints(series) {
            function plotPoints(datapoints, radius, fillStyle, offset, shadow, axisx, axisy, symbol) {
                var points = datapoints.points,
                    ps = datapoints.pointsize;
                for (var i = 0; i < points.length; i += ps) {
                    var x = points[i],
                        y = points[i + 1];
                    if (x == null || x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                        continue;
                    ctx.beginPath();
                    x = axisx.p2c(x);
                    y = axisy.p2c(y) + offset;
                    if (symbol == "circle")
                        ctx.arc(x, y, radius, 0, shadow ? Math.PI : Math.PI * 2, false);
                    else
                        symbol(ctx, x, y, radius, shadow);
                    ctx.closePath();
                    if (fillStyle) {
                        ctx.fillStyle = fillStyle;
                        ctx.fill();
                    }
                    ctx.stroke();
                }
            }
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            var lw = series.points.lineWidth,
                sw = series.shadowSize,
                radius = series.points.radius,
                symbol = series.points.symbol;
            if (lw == 0)
                lw = 0.0001;
            if (lw > 0 && sw > 0) {
                var w = sw / 2;
                ctx.lineWidth = w;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotPoints(series.datapoints, radius, null, w + w / 2, true, series.xaxis, series.yaxis, symbol);
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotPoints(series.datapoints, radius, null, w / 2, true, series.xaxis, series.yaxis, symbol);
            }
            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            plotPoints(series.datapoints, radius, getFillStyle(series.points, series.color), 0, false, series.xaxis, series.yaxis, symbol);
            ctx.restore();
        }

        function drawBar(x, y, b, barLeft, barRight, fillStyleCallback, axisx, axisy, c, horizontal, lineWidth) {
            var left, right, bottom, top, drawLeft, drawRight, drawTop, drawBottom, tmp;
            if (horizontal) {
                drawBottom = drawRight = drawTop = true;
                drawLeft = false;
                left = b;
                right = x;
                top = y + barLeft;
                bottom = y + barRight;
                if (right < left) {
                    tmp = right;
                    right = left;
                    left = tmp;
                    drawLeft = true;
                    drawRight = false;
                }
            } else {
                drawLeft = drawRight = drawTop = true;
                drawBottom = false;
                left = x + barLeft;
                right = x + barRight;
                bottom = b;
                top = y;
                if (top < bottom) {
                    tmp = top;
                    top = bottom;
                    bottom = tmp;
                    drawBottom = true;
                    drawTop = false;
                }
            }
            if (right < axisx.min || left > axisx.max || top < axisy.min || bottom > axisy.max)
                return;
            if (left < axisx.min) {
                left = axisx.min;
                drawLeft = false;
            }
            if (right > axisx.max) {
                right = axisx.max;
                drawRight = false;
            }
            if (bottom < axisy.min) {
                bottom = axisy.min;
                drawBottom = false;
            }
            if (top > axisy.max) {
                top = axisy.max;
                drawTop = false;
            }
            left = axisx.p2c(left);
            bottom = axisy.p2c(bottom);
            right = axisx.p2c(right);
            top = axisy.p2c(top);
            if (fillStyleCallback) {
                c.fillStyle = fillStyleCallback(bottom, top);
                c.fillRect(left, top, right - left, bottom - top)
            }
            if (lineWidth > 0 && (drawLeft || drawRight || drawTop || drawBottom)) {
                c.beginPath();
                c.moveTo(left, bottom);
                if (drawLeft)
                    c.lineTo(left, top);
                else
                    c.moveTo(left, top);
                if (drawTop)
                    c.lineTo(right, top);
                else
                    c.moveTo(right, top);
                if (drawRight)
                    c.lineTo(right, bottom);
                else
                    c.moveTo(right, bottom);
                if (drawBottom)
                    c.lineTo(left, bottom);
                else
                    c.moveTo(left, bottom);
                c.stroke();
            }
        }

        function drawSeriesBars(series) {
            function plotBars(datapoints, barLeft, barRight, fillStyleCallback, axisx, axisy) {
                var points = datapoints.points,
                    ps = datapoints.pointsize;
                for (var i = 0; i < points.length; i += ps) {
                    if (points[i] == null)
                        continue;
                    drawBar(points[i], points[i + 1], points[i + 2], barLeft, barRight, fillStyleCallback, axisx, axisy, ctx, series.bars.horizontal, series.bars.lineWidth);
                }
            }
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineWidth = series.bars.lineWidth;
            ctx.strokeStyle = series.color;
            var barLeft;
            switch (series.bars.align) {
                case "left":
                    barLeft = 0;
                    break;
                case "right":
                    barLeft = -series.bars.barWidth;
                    break;
                default:
                    barLeft = -series.bars.barWidth / 2;
            }
            var fillStyleCallback = series.bars.fill ? function (bottom, top) {
                return getFillStyle(series.bars, series.color, bottom, top);
            } : null;
            plotBars(series.datapoints, barLeft, barLeft + series.bars.barWidth, fillStyleCallback, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function getFillStyle(filloptions, seriesColor, bottom, top) {
            var fill = filloptions.fill;
            if (!fill)
                return null;
            if (filloptions.fillColor)
                //return getColorOrGradient(filloptions.fillColor, bottom, top, seriesColor);
            var c = $.color.parse(seriesColor);
            c.a = typeof fill == "number" ? fill : 0.4;
            c.normalize();
            return c.toString();
        }

        function insertLegend() {
            if (options.legend.container != null) {
                $(options.legend.container).html("");
            } else {
                placeholder.find(".legend").remove();
            }
            if (!options.legend.show) {
                return;
            }
            var fragments = [],
                entries = [],
                rowStarted = false,
                lf = options.legend.labelFormatter,
                s, label;
            for (var i = 0; i < series.length; ++i) {
                s = series[i];
                if (s.label) {
                    label = lf ? lf(s.label, s) : s.label;
                    if (label) {
                        entries.push({
                            label: label,
                            color: s.color
                        });
                    }
                }
            }
            if (options.legend.sorted) {
                if ($.isFunction(options.legend.sorted)) {
                    entries.sort(options.legend.sorted);
                } else if (options.legend.sorted == "reverse") {
                    entries.reverse();
                } else {
                    var ascending = options.legend.sorted != "descending";
                    entries.sort(function (a, b) {
                        return a.label == b.label ? 0 : ((a.label < b.label) != ascending ? 1 : -1);
                    });
                }
            }
            for (var i = 0; i < entries.length; ++i) {
                var entry = entries[i];
                if (i % options.legend.noColumns == 0) {
                    if (rowStarted)
                        fragments.push('</tr>');
                    fragments.push('<tr>');
                    rowStarted = true;
                }
                fragments.push('<td class="legendColorBox"><div style="border:1px solid ' + options.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + entry.color + ';overflow:hidden"></div></div></td>' +
                    '<td class="legendLabel">' + entry.label + '</td>');
            }
            if (rowStarted)
                fragments.push('</tr>');
            if (fragments.length == 0)
                return;
            var table = '<table style="font-size:smaller;color:' + options.grid.color + '">' + fragments.join("") + '</table>';
            if (options.legend.container != null)
                $(options.legend.container).html(table);
            else {
                var pos = "",
                    p = options.legend.position,
                    m = options.legend.margin;
                if (m[0] == null)
                    m = [m, m];
                if (p.charAt(0) == "n")
                    pos += 'top:' + (m[1] + plotOffset.top) + 'px;';
                else if (p.charAt(0) == "s")
                    pos += 'bottom:' + (m[1] + plotOffset.bottom) + 'px;';
                if (p.charAt(1) == "e")
                    pos += 'right:' + (m[0] + plotOffset.right) + 'px;';
                else if (p.charAt(1) == "w")
                    pos += 'left:' + (m[0] + plotOffset.left) + 'px;';
                var legend = $('<div class="legend">' + table.replace('style="', 'style="position:absolute;' + pos + ';') + '</div>').appendTo(placeholder);
                if (options.legend.backgroundOpacity != 0.0) {
                    var c = options.legend.backgroundColor;
                    if (c == null) {
                        c = options.grid.backgroundColor;
                        if (c && typeof c == "string")
                            c = $.color.parse(c);
                        else
                            c = $.color.extract(legend, 'background-color');
                        c.a = 1;
                        c = c.toString();
                    }
                    var div = legend.children();
                    $('<div style="position:absolute;width:' + div.width() + 'px;height:' + div.height() + 'px;' + pos + 'background-color:' + c + ';"> </div>').prependTo(legend).css('opacity', options.legend.backgroundOpacity);
                }
            }
        }
        var highlights = [],
            redrawTimeout = null;

        function findNearbyItem(mouseX, mouseY, seriesFilter) {
            var maxDistance = options.grid.mouseActiveRadius,
                smallestDistance = maxDistance * maxDistance + 1,
                item = null,
                foundPoint = false,
                i, j, ps;
            for (i = series.length - 1; i >= 0; --i) {
                if (!seriesFilter(series[i]))
                    continue;
                var s = series[i],
                    axisx = s.xaxis,
                    axisy = s.yaxis,
                    points = s.datapoints.points,
                    mx = axisx.c2p(mouseX),
                    my = axisy.c2p(mouseY),
                    maxx = maxDistance / axisx.scale,
                    maxy = maxDistance / axisy.scale;
                ps = s.datapoints.pointsize;
                if (axisx.options.inverseTransform)
                    maxx = Number.MAX_VALUE;
                if (axisy.options.inverseTransform)
                    maxy = Number.MAX_VALUE;
                if (s.lines.show || s.points.show) {
                    for (j = 0; j < points.length; j += ps) {
                        var x = points[j],
                            y = points[j + 1];
                        if (x == null)
                            continue;
                        if (x - mx > maxx || x - mx < -maxx || y - my > maxy || y - my < -maxy)
                            continue;
                        var dx = Math.abs(axisx.p2c(x) - mouseX),
                            dy = Math.abs(axisy.p2c(y) - mouseY),
                            dist = dx * dx + dy * dy;
                        if (dist < smallestDistance) {
                            smallestDistance = dist;
                            item = [i, j / ps];
                        }
                    }
                }
                if (s.bars.show && !item) {
                    var barLeft, barRight;
                    switch (s.bars.align) {
                        case "left":
                            barLeft = 0;
                            break;
                        case "right":
                            barLeft = -s.bars.barWidth;
                            break;
                        default:
                            barLeft = -s.bars.barWidth / 2;
                    }
                    barRight = barLeft + s.bars.barWidth;
                    for (j = 0; j < points.length; j += ps) {
                        var x = points[j],
                            y = points[j + 1],
                            b = points[j + 2];
                        if (x == null)
                            continue;
                        if (series[i].bars.horizontal ? (mx <= Math.max(b, x) && mx >= Math.min(b, x) && my >= y + barLeft && my <= y + barRight) : (mx >= x + barLeft && mx <= x + barRight && my >= Math.min(b, y) && my <= Math.max(b, y)))
                            item = [i, j / ps];
                    }
                }
            }
            if (item) {
                i = item[0];
                j = item[1];
                ps = series[i].datapoints.pointsize;
                return {
                    datapoint: series[i].datapoints.points.slice(j * ps, (j + 1) * ps),
                    dataIndex: j,
                    series: series[i],
                    seriesIndex: i
                };
            }
            return null;
        }

        function onMouseMove(e) {
            if (options.grid.hoverable)
                triggerClickHoverEvent("plothover", e, function (s) {
                    return s["hoverable"] != false;
                });
        }

        function onMouseLeave(e) {
            if (options.grid.hoverable)
                triggerClickHoverEvent("plothover", e, function (s) {
                    return false;
                });
        }

        function onClick(e) {
            triggerClickHoverEvent("plotclick", e, function (s) {
                return s["clickable"] != false;
            });
        }

        function triggerClickHoverEvent(eventname, event, seriesFilter) {
            var offset = eventHolder.offset(),
                canvasX = event.pageX - offset.left - plotOffset.left,
                canvasY = event.pageY - offset.top - plotOffset.top,
                pos = canvasToAxisCoords({
                    left: canvasX,
                    top: canvasY
                });
            pos.pageX = event.pageX;
            pos.pageY = event.pageY;
            var item = findNearbyItem(canvasX, canvasY, seriesFilter);
            if (item) {
                item.pageX = parseInt(item.series.xaxis.p2c(item.datapoint[0]) + offset.left + plotOffset.left, 10);
                item.pageY = parseInt(item.series.yaxis.p2c(item.datapoint[1]) + offset.top + plotOffset.top, 10);
            }
            if (options.grid.autoHighlight) {
                for (var i = 0; i < highlights.length; ++i) {
                    var h = highlights[i];
                    if (h.auto == eventname && !(item && h.series == item.series && h.point[0] == item.datapoint[0] && h.point[1] == item.datapoint[1]))
                        unhighlight(h.series, h.point);
                }
                if (item)
                    highlight(item.series, item.datapoint, eventname);
            }
            placeholder.trigger(eventname, [pos, item]);
        }

        function triggerRedrawOverlay() {
            var t = options.interaction.redrawOverlayInterval;
            if (t == -1) {
                drawOverlay();
                return;
            }
            if (!redrawTimeout)
                redrawTimeout = setTimeout(drawOverlay, t);
        }

        function drawOverlay() {
            redrawTimeout = null;
            octx.save();
            overlay.clear();
            octx.translate(plotOffset.left, plotOffset.top);
            var i, hi;
            for (i = 0; i < highlights.length; ++i) {
                hi = highlights[i];
                if (hi.series.bars.show)
                    drawBarHighlight(hi.series, hi.point);
                else
                    drawPointHighlight(hi.series, hi.point);
            }
            octx.restore();
            executeHooks(hooks.drawOverlay, [octx]);
        }

        function highlight(s, point, auto) {
            if (typeof s == "number")
                s = series[s];
            if (typeof point == "number") {
                var ps = s.datapoints.pointsize;
                point = s.datapoints.points.slice(ps * point, ps * (point + 1));
            }
            var i = indexOfHighlight(s, point);
            if (i == -1) {
                highlights.push({
                    series: s,
                    point: point,
                    auto: auto
                });
                triggerRedrawOverlay();
            } else if (!auto)
                highlights[i].auto = false;
        }

        function unhighlight(s, point) {
            if (s == null && point == null) {
                highlights = [];
                triggerRedrawOverlay();
                return;
            }
            if (typeof s == "number")
                s = series[s];
            if (typeof point == "number") {
                var ps = s.datapoints.pointsize;
                point = s.datapoints.points.slice(ps * point, ps * (point + 1));
            }
            var i = indexOfHighlight(s, point);
            if (i != -1) {
                highlights.splice(i, 1);
                triggerRedrawOverlay();
            }
        }

        function indexOfHighlight(s, p) {
            for (var i = 0; i < highlights.length; ++i) {
                var h = highlights[i];
                if (h.series == s && h.point[0] == p[0] && h.point[1] == p[1])
                    return i;
            }
            return -1;
        }

        function drawPointHighlight(series, point) {
            var x = point[0],
                y = point[1],
                axisx = series.xaxis,
                axisy = series.yaxis,
                highlightColor = (typeof series.highlightColor === "string") ? series.highlightColor : $.color.parse(series.color).scale('a', 0.5).toString();
            if (x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                return;
            var pointRadius = series.points.radius + series.points.lineWidth / 2;
            octx.lineWidth = pointRadius;
            octx.strokeStyle = highlightColor;
            var radius = 1.5 * pointRadius;
            x = axisx.p2c(x);
            y = axisy.p2c(y);
            octx.beginPath();
            if (series.points.symbol == "circle")
                octx.arc(x, y, radius, 0, 2 * Math.PI, false);
            else
                series.points.symbol(octx, x, y, radius, false);
            octx.closePath();
            octx.stroke();
        }

        function drawBarHighlight(series, point) {
            var highlightColor = (typeof series.highlightColor === "string") ? series.highlightColor : $.color.parse(series.color).scale('a', 0.5).toString(),
                fillStyle = highlightColor,
                barLeft;
            switch (series.bars.align) {
                case "left":
                    barLeft = 0;
                    break;
                case "right":
                    barLeft = -series.bars.barWidth;
                    break;
                default:
                    barLeft = -series.bars.barWidth / 2;
            }
            octx.lineWidth = series.bars.lineWidth;
            octx.strokeStyle = highlightColor;
            drawBar(point[0], point[1], point[2] || 0, barLeft, barLeft + series.bars.barWidth, function () {
                return fillStyle;
            }, series.xaxis, series.yaxis, octx, series.bars.horizontal, series.bars.lineWidth);
        }

        function getColorOrGradient(spec, bottom, top, defaultColor) {
            if (typeof spec == "string")
                return spec;
            else {
                var gradient = ctx.createLinearGradient(0, top, 0, bottom);
                for (var i = 0, l = spec.colors.length; i < l; ++i) {
                    var c = spec.colors[i];
                    if (typeof c != "string") {
                        var co = $.color.parse(defaultColor);
                        if (c.brightness != null)
                            co = co.scale('rgb', c.brightness);
                        if (c.opacity != null)
                            co.a *= c.opacity;
                        c = co.toString();
                    }
                    gradient.addColorStop(i / (l - 1), c);
                }
                return gradient;
            }
        }
    }
    $.plot = function (placeholder, data, options) {
        var plot = new Plot($(placeholder), data, options, $.plot.plugins);
        return plot;
    };
    $.plot.version = "0.8.3";
    $.plot.plugins = [];
    $.fn.plot = function (data, options) {
        return this.each(function () {
            $.plot(this, data, options);
        });
    };

    function floorInBase(n, base) {
        return base * Math.floor(n / base);
    }
})(jQuery);

/*!
* stroll.js 1.2 - CSS scroll effects
* http://lab.hakim.se/scroll-effects
* MIT licensed
*
* Copyright (C) 2012 Hakim El Hattab, http://hakim.se
*/(function(){"use strict";var LIVE_INTERVAL=500;var IS_TOUCH_DEVICE=!!('ontouchstart'in window);var lists=[];var active=false;function refresh(){if(active){requestAnimFrame(refresh);for(var i=0,len=lists.length;i<len;i++){lists[i].update();}}}
function add(element,options){if(!element.nodeName||/^(ul|ol)$/i.test(element.nodeName)===false){return false;}
else if(contains(element)){remove(element);}
var list=IS_TOUCH_DEVICE?new TouchList(element):new List(element);if(options&&options.live){list.syncInterval=setInterval(function(){list.sync.call(list);},LIVE_INTERVAL);}
list.sync();lists.push(list);if(lists.length===1){active=true;refresh();}}
function remove(element){for(var i=0;i<lists.length;i++){var list=lists[i];if(list.element==element){list.destroy();lists.splice(i,1);i--;}}
if(lists.length===0){active=false;}}
function contains(element){for(var i=0,len=lists.length;i<len;i++){if(lists[i].element==element){return true;}}
return false;}
function batch(target,method,options){var i,len;if(typeof target==='string'){var targets=document.querySelectorAll(target);for(i=0,len=targets.length;i<len;i++){method.call(null,targets[i],options);}}
else if(typeof target==='object'&&typeof target.length==='number'){for(i=0,len=target.length;i<len;i++){method.call(null,target[i],options);}}
else if(target.nodeName){method.call(null,target,options);}
else{throw 'Stroll target was of unexpected type.';}}
function isCapable(){return!!document.body.classList;}
function List(element){this.element=element;}
List.prototype.sync=function(){this.items=Array.prototype.slice.apply(this.element.children);this.listHeight=this.element.offsetHeight;for(var i=0,len=this.items.length;i<len;i++){var item=this.items[i];item._offsetHeight=item.offsetHeight;item._offsetTop=item.offsetTop;item._offsetBottom=item._offsetTop+item._offsetHeight;item._state='';}
this.update(true);}
List.prototype.update=function(force){var scrollTop=this.element.pageYOffset||this.element.scrollTop,scrollBottom=scrollTop+this.listHeight;if(scrollTop!==this.lastTop||force){this.lastTop=scrollTop;for(var i=0,len=this.items.length;i<len;i++){var item=this.items[i];if(item._offsetBottom<scrollTop){if(item._state!=='past'){item._state='past';item.classList.add('past');item.classList.remove('future');}}
else if(item._offsetTop>scrollBottom){if(item._state!=='future'){item._state='future';item.classList.add('future');item.classList.remove('past');}}
else if(item._state){if(item._state==='past')item.classList.remove('past');if(item._state==='future')item.classList.remove('future');item._state='';}}}}
List.prototype.destroy=function(){clearInterval(this.syncInterval);for(var j=0,len=this.items.length;j<len;j++){var item=this.items[j];item.classList.remove('past');item.classList.remove('future');}}
function TouchList(element){this.element=element;this.element.style.overflow='hidden';this.top={value:0,natural:0};this.touch={value:0,offset:0,start:0,previous:0,lastMove:Date.now(),accellerateTimeout:-1,isAccellerating:false,isActive:false};this.velocity=0;}
TouchList.prototype=new List();TouchList.prototype.sync=function(){this.items=Array.prototype.slice.apply(this.element.children);this.listHeight=this.element.offsetHeight;var item;for(var i=0,len=this.items.length;i<len;i++){item=this.items[i];item._offsetHeight=item.offsetHeight;item._offsetTop=item.offsetTop;item._offsetBottom=item._offsetTop+item._offsetHeight;item._state='';item.style.opacity=1;}
this.top.natural=this.element.scrollTop;this.top.value=this.top.natural;this.top.max=item._offsetBottom-this.listHeight;this.update(true);this.bind();}
TouchList.prototype.bind=function(){var scope=this;this.touchStartDelegate=function(event){scope.onTouchStart(event);};this.touchMoveDelegate=function(event){scope.onTouchMove(event);};this.touchEndDelegate=function(event){scope.onTouchEnd(event);};this.element.addEventListener('touchstart',this.touchStartDelegate,false);this.element.addEventListener('touchmove',this.touchMoveDelegate,false);this.element.addEventListener('touchend',this.touchEndDelegate,false);}
TouchList.prototype.onTouchStart=function(event){event.preventDefault();if(event.touches.length===1){this.touch.isActive=true;this.touch.start=event.touches[0].clientY;this.touch.previous=this.touch.start;this.touch.value=this.touch.start;this.touch.offset=0;if(this.velocity){this.touch.isAccellerating=true;var scope=this;this.touch.accellerateTimeout=setTimeout(function(){scope.touch.isAccellerating=false;scope.velocity=0;},500);}
else{this.velocity=0;}}}
TouchList.prototype.onTouchMove=function(event){if(event.touches.length===1){var previous=this.touch.value;this.touch.value=event.touches[0].clientY;this.touch.lastMove=Date.now();var sameDirection=(this.touch.value>this.touch.previous&&this.velocity<0)||(this.touch.value<this.touch.previous&&this.velocity>0);if(this.touch.isAccellerating&&sameDirection){clearInterval(this.touch.accellerateTimeout);this.velocity+=(this.touch.previous-this.touch.value)/10;}
else{this.velocity=0;this.touch.isAccellerating=false;this.touch.offset=Math.round(this.touch.start-this.touch.value);}
this.touch.previous=previous;}}
TouchList.prototype.onTouchEnd=function(event){var distanceMoved=this.touch.start-this.touch.value;if(!this.touch.isAccellerating){this.velocity=(this.touch.start-this.touch.value)/10;}
if(Date.now()-this.touch.lastMove>200||Math.abs(this.touch.previous-this.touch.value)<5){this.velocity=0;}
this.top.value+=this.touch.offset;this.touch.offset=0;this.touch.start=0;this.touch.value=0;this.touch.isActive=false;this.touch.isAccellerating=false;clearInterval(this.touch.accellerateTimeout);if(Math.abs(this.velocity)>4||Math.abs(distanceMoved)>10){event.preventDefault();}};TouchList.prototype.update=function(force){var scrollTop=this.top.value+this.velocity+this.touch.offset;if(this.velocity||this.touch.offset){this.element.scrollTop=scrollTop;scrollTop=Math.max(0,Math.min(this.element.scrollTop,this.top.max));this.top.value=scrollTop-this.touch.offset;}
if(!this.touch.isActive||this.touch.isAccellerating){this.velocity*=0.95;}
if(Math.abs(this.velocity)<0.15){this.velocity=0;}
if(scrollTop!==this.top.natural||force){this.top.natural=scrollTop;this.top.value=scrollTop-this.touch.offset;var scrollBottom=scrollTop+this.listHeight;for(var i=0,len=this.items.length;i<len;i++){var item=this.items[i];if(item._offsetBottom<scrollTop){if(this.velocity<=0&&item._state!=='past'){item.classList.add('past');item._state='past';}}
else if(item._offsetTop>scrollBottom){if(this.velocity>=0&&item._state!=='future'){item.classList.add('future');item._state='future';}}
else if(item._state){if(item._state==='past')item.classList.remove('past');if(item._state==='future')item.classList.remove('future');item._state='';}}}};TouchList.prototype.destroy=function(){List.prototype.destroy.apply(this);this.element.removeEventListener('touchstart',this.touchStartDelegate,false);this.element.removeEventListener('touchmove',this.touchMoveDelegate,false);this.element.removeEventListener('touchend',this.touchEndDelegate,false);}
window.stroll={bind:function(target,options){if(isCapable()){batch(target,add,options);}},unbind:function(target){if(isCapable()){batch(target,remove);}}}
window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})()})();
// 'use strict';$(document).ready(function(){setTimeout(function(){stroll.bind('.scroll-list');$("#dynamic-list-four-button, #dynamic-list-four-close").on("click",function(){$("#dynamic-list-four-slider-wrap").toggleClass("open");});$("#dynamic-list-five-button").on("click",function(){$(this).toggleClass("open").find(".details").slideToggle();});$("#dynamic-list-six-button").on("click",function(){$("#dynamic-list-six-list").toggleClass("open");$(this).toggleClass("open").find(".details").slideToggle();});var a=$(".cards").height();$(".cards").slimScroll({height:a,allowPageScroll:false,color:'#000'});var a=$(".wave").height();$(".wave").slimScroll({height:a,allowPageScroll:false,color:'#000'});var a=$(".flip").height();$(".flip").slimScroll({height:a,allowPageScroll:false,color:'#000'});var a=$(".helix").height();$(".helix").slimScroll({height:a,allowPageScroll:false,color:'#000'});var a=$(".fan").height();$(".fan").slimScroll({height:a,allowPageScroll:false,color:'#000'});var a=$(".twirl").height();$(".twirl").slimScroll({height:a,allowPageScroll:false,color:'#000'});},350);});;(function(window){var
// Modernizr=typeof Modernizr!=="undefined"?Modernizr:false,buttonPressedEvent='touchstart click',animationEndEventNames={'WebkitAnimation':'webkitAnimationEnd','OAnimation':'oAnimationEnd','msAnimation':'MSAnimationEnd','animation':'animationend'},transitionEndEventNames={'WebkitTransition':'webkitTransitionEnd','OTransition':'oTransitionEnd','msTransition':'MSTransitionEnd','transition':'transitionend'},Effeckt=function(){this.init();};Effeckt.version='0.0.1';Effeckt.prototype.init=function(){this.buttonPressedEvent=buttonPressedEvent;this.transitionEndEventName=Modernizr?transitionEndEventNames[Modernizr.prefixed('transition')]:getTransitionEndEventNames();this.animationEndEventName=Modernizr?animationEndEventNames[Modernizr.prefixed('animation')]:getAnimationEndEventNames();this.transitionAnimationEndEvent=this.animationEndEventName+' '+this.transitionEndEventName;};Effeckt.prototype.getViewportHeight=function(){var docElement=document.documentElement,client=docElement['clientHeight'],inner=window['innerHeight'];if(client<inner)
// return inner;else
// return client;};function getTransitionEndEventNames(){return _getEndEventNames(transitionEndEventNames);}
// function getAnimationEndEventNames(){return _getEndEventNames(animationEndEventNames);}
// function _getEndEventNames(obj){var events=[];for(var eventName in obj){events.push(obj[eventName]);}
// return events.join(' ');}
// window.Effeckt=new Effeckt();})(this);var EffecktListItems={init:function(){this.bindUIActions();},bindUIActions:function(){var self=this;$(".effeckt-list-wrap button.add").on(Effeckt.buttonPressedEvent,function(){self.addListItem(this);});$(".effeckt-list-wrap button.remove").on(Effeckt.buttonPressedEvent,function(){self.removeListItem(this);});$("button.remove").hide();},addListItem:function(el){var insertPoint=$(el).parent().find("li:nth-child(3)");$(el).parent().find("button.remove").show();$("<li />",{'text':"new item",'class':"new-item"}).insertAfter(insertPoint);},removeListItem:function(el){var $parent=$(el).parent(),self=this;var elToRemove=$parent.find("li.new-item").last();elToRemove.on(Effeckt.transitionAnimationEndEvent,function(){elToRemove.off(Effeckt.transitionAnimationEndEvent);elToRemove.remove();});elToRemove.toggleClass("remove-item new-item");if(!$parent.find("li.new-item").length){$parent.find("button.remove").hide();}}};EffecktListItems.init();
$.fn.pcodedmenu = function (e) {
    var t = this.attr("id"),
        a = {
            themelayout: "vertical",
            MenuTrigger: "click",
            SubMenuTrigger: "click",
            activeMenuClass: "active",
            ThemeBackgroundPattern: "pattern6",
            HeaderBackground: "theme4",
            LHeaderBackground: "theme4",
            NavbarBackground: "theme4",
            ActiveItemBackground: "theme0",
            SubItemBackground: "theme4",
            LogoTheme: "theme6",
            ActiveItemStyle: "style0",
            freamtype: "theme1",
            ItemBorderStyle: "solid",
            SubItemBorder: !0,
            DropDownIconStyle: "style1",
            FixedNavbarPosition: !1,
            FixedHeaderPosition: !1,
            horizontalMenuplacement: "top",
            horizontalMenulayout: "widebox",
            horizontalBrandItem: !0,
            horizontalLeftNavItem: !0,
            horizontalRightItem: !1,
            horizontalSearchItem: !1,
            horizontalBrandItemAlign: "left",
            horizontalLeftNavItemAlign: "right",
            horizontalRightItemAlign: "right",
            horizontalsearchItemAlign: "right",
            horizontalstickynavigation: !1,
            horizontalNavigationView: "view1",
            horizontalNavIsCentered: !1,
            horizontalNavigationMenuIcon: !0,
            layouttype: "light",
            verticalMenuplacement: "left",
            verticalMenulayout: "wide",
            collapseVerticalLeftHeader: !0,
            VerticalSubMenuItemIconStyle: "style6",
            VerticalNavigationView: "view1",
            verticalMenueffect: {
                desktop: "shrink",
                tablet: "push",
                phone: "overlay"
            },
            defaultVerticalMenu: {
                desktop: "expanded",
                tablet: "collapsed",
                phone: "offcanvas"
            },
            onToggleVerticalMenu: {
                desktop: "collapsed",
                tablet: "expanded",
                phone: "expanded"
            }
        },
        e = $.extend({}, a, e),
        o = {
            PcodedMenuInit: function () {
                o.Handlethemelayout(), o.HandleverticalMenuplacement(), o.HandlehorizontalMenuplacement(), o.HandleMenulayout(), o.HandleDeviceType(), o.Handlecomponetheight(), o.HandleMenuOnClick(), o.HandleMenuTrigger(), o.HandleSubMenuTrigger(), o.HandleActiveItem(), o.HandleOffcanvasMenu(), o.HandleVerticalLeftHeader(), o.HandleThemeBackground(), o.HandleActiveItemStyle(), o.HandleItemBorder(), o.HandleBorderStyle(), o.HandleSubItemBorder(), o.HandleDropDownIconStyle(), o.HandleOptionSelectorPanel(), o.HandleNavbarPosition(), o.HandleVerticalSubMenuItemIconStyle(), o.HandleVerticalNavigationView(), o.HandleHorizontalItemIsCentered(), o.HandleHorizontalItemAlignment(), o.HandleSubMenuOffset(), o.HandleHorizontalStickyNavigation(), o.HandleDocumentClickEvent(), o.HandleVerticalScrollbar(), o.HandleHorizontalMobileMenuToggle(), o.horizontalNavigationMenuIcon(), o.verticalNavigationSearchBar(), o.safariBrowsercompatibility(), o.Handlemenutype(), o.Handlelayoutvartype()
            },
            safariBrowsercompatibility: function () {
                is_chrome = navigator.userAgent.indexOf("Chrome") > -1, is_explorer = navigator.userAgent.indexOf("MSIE") > -1, is_firefox = navigator.userAgent.indexOf("Firefox") > -1, is_safari = navigator.userAgent.indexOf("Safari") > -1, is_opera = navigator.userAgent.indexOf("Presto") > -1, is_mac = -1 != navigator.userAgent.indexOf("Mac OS"), is_windows = !is_mac, is_chrome && is_safari && (is_safari = !1), is_safari || is_windows
            },
            verticalNavigationSearchBar: function () {
                "vertical" === e.themelayout && $(".searchbar-toggle").on("click", function () {
                    $(this).parent(".pcoded-search").toggleClass("open")
                })
            },
            horizontalNavigationMenuIcon: function () {
                if ("horizontal" === e.themelayout) switch (e.horizontalNavigationMenuIcon) {
                    case !1:
                        $("#" + t + ".pcoded .pcoded-navbar .pcoded-item > li > a .pcoded-micon").hide(), $("#" + t + ".pcoded .pcoded-navbar .pcoded-item.pcoded-search-item > li > a .pcoded-micon").show()
                }
            },
            HandleHorizontalMobileMenuToggle: function () {
                "horizontal" === e.themelayout && $("#mobile-collapse,#mobile-collapse1").on("click", function () {
                    $(".pcoded-navbar").toggleClass("show-menu")
                })
            },
            HandleVerticalScrollbar: function () {
                "vertical" === e.themelayout && (satnt = e.defaultVerticalMenu.desktop, "expanded" !== satnt && "compact" !== satnt || (mt = e.MenuTrigger, "click" === mt && $("#mobile-collapse,#mobile-collapse1").click(function (e) {
                    e.preventDefault();
                    var t = $(this);
                    rel = t.attr("rel"), el = $(".pcoded-navbar"), "collapsed" == $("#pcoded").attr("vertical-nav-type") ? ($(".main-menu").slimScroll({
                        destroy: !0
                    }), $(".main-menu").css("overflow", "visible")) : $(".main-menu").slimScroll({
                        setTop: "1px",
                        size: "5px",
                        wheelStep: 10,
                        alwaysVisible: !0,
                        allowPageScroll: !0,
                        height: "100%",
                        width: "100%"
                    })
                }), $(".main-menu").slimScroll({
                    setTop: "1px",
                    size: "5px",
                    wheelStep: 10,
                    alwaysVisible: !0,
                    allowPageScroll: !0,
                    height: "100%",
                    width: "100%"
                })))
            },
            HandleDocumentClickEvent: function () {
                ! function () {
                    $(document).on("click", function (e) {
                        var a = $(e.target),
                            o = $("#" + t).attr("pcoded-device-type"),
                            i = $("#" + t).attr("vertical-nav-type"),
                            d = $("#" + t).attr("theme-layout"),
                            n = $("#" + t + " .pcoded-item li");
                        a.parents(".pcoded-item").length || "phone" != o && "horizontal" != d && "expanded" != i && ($(".pcoded-submenu").slideUp(), setTimeout(function () {
                            n.removeClass("pcoded-trigger")
                        }, 400))
                    })
                }(),
                function () {
                    $(document).on("click", function (e) {
                        var a = $(e.target),
                            o = $("#" + t + " .pcoded-search");
                        a.parents(".pcoded-search").length || o.removeClass("open")
                    })
                }()
            },
            HandleHorizontalStickyNavigation: function () {
                switch (e.horizontalstickynavigation) {
                    case !0:
                        $(window).on("scroll", function () {
                            var e = $(this).scrollTop();
                            e >= 100 ? ($(".pcoded-navbar").addClass("stickybar"), $("stickybar").fadeIn(3e3)) : e <= 100 && ($(".pcoded-navbar").removeClass("stickybar"), $(".stickybar").fadeOut(3e3))
                        });
                        break;
                    case !1:
                        $(".pcoded-navbar").removeClass("stickybar")
                }
            },
            HandleSubMenuOffset: function () {
                switch (e.themelayout) {
                    case "horizontal":
                        "hover" === e.SubMenuTrigger ? $("li.pcoded-hasmenu").on("mouseenter mouseleave", function (e) {
                            if ($(".pcoded-submenu", this).length) {
                                var t = $(".pcoded-submenu:first", this),
                                    a = t.offset(),
                                    o = a.left,
                                    i = t.width();
                                $(window).height();
                                o + i <= $(window).width() ? $(this).removeClass("edge") : $(this).addClass("edge")
                            }
                        }) : $("li.pcoded-hasmenu").on("click", function (e) {
                            if (e.preventDefault(), $(".pcoded-submenu", this).length) {
                                var t = $(".pcoded-submenu:first", this),
                                    a = t.offset(),
                                    o = a.left,
                                    i = t.width();
                                $(window).height();
                                o + i <= $(window).width() || $(this).toggleClass("edge")
                            }
                        })
                }
            },
            HandleHorizontalItemIsCentered: function () {
                if ("horizontal" === e.themelayout) switch (e.horizontalNavIsCentered) {
                    case !0:
                        $("#" + t + " .pcoded-navbar").addClass("isCentered");
                        break;
                    case !1:
                        $("#" + t + " .pcoded-navbar").removeClass("isCentered")
                }
            },
            HandleHorizontalItemAlignment: function () {
                "horizontal" === e.themelayout && !1 === e.horizontalNavIsCentered && (function () {
                    var a = $("#" + t + ".pcoded .pcoded-navbar .pcoded-brand");
                    if (!0 === e.horizontalBrandItem) switch (e.horizontalBrandItemAlign) {
                        case "left":
                            a.removeClass("pcoded-right-align"), a.addClass("pcoded-left-align");
                            break;
                        case "right":
                            a.removeClass("pcoded-left-align"), a.addClass("pcoded-right-align")
                    } else a.hide()
                }(), function () {
                    var a = $("#" + t + ".pcoded .pcoded-navbar .pcoded-item.pcoded-left-item");
                    if (!0 === e.horizontalLeftNavItem) switch (e.horizontalLeftNavItemAlign) {
                        case "left":
                            a.removeClass("pcoded-right-align"), a.addClass("pcoded-left-align");
                            break;
                        case "right":
                            a.removeClass("pcoded-left-align"), a.addClass("pcoded-right-align")
                    } else a.hide()
                }(), function () {
                    var a = $("#" + t + ".pcoded .pcoded-navbar .pcoded-item.pcoded-right-item");
                    if (!0 === e.horizontalRightItem) switch (e.horizontalRightItemAlign) {
                        case "left":
                            a.removeClass("pcoded-right-align"), a.addClass("pcoded-left-align");
                            break;
                        case "right":
                            a.removeClass("pcoded-left-align"), a.addClass("pcoded-right-align")
                    } else a.hide()
                }(), function () {
                    var a = $("#" + t + ".pcoded .pcoded-navbar .pcoded-search-item");
                    if (!0 === e.horizontalSearchItem) switch (e.horizontalsearchItemAlign) {
                        case "left":
                            a.removeClass("pcoded-right-align"), a.addClass("pcoded-left-align");
                            break;
                        case "right":
                            a.removeClass("pcoded-left-align"), a.addClass("pcoded-right-align")
                    } else a.hide()
                }())
            },
            HandleVerticalNavigationView: function () {
                switch (e.themelayout) {
                    case "vertical":
                        var a = e.VerticalNavigationView;
                        $("#" + t + ".pcoded").attr("vnavigation-view", a);
                        break;
                    case "horizontal":
                        var a = e.horizontalNavigationView;
                        $("#" + t + ".pcoded").attr("hnavigation-view", a)
                }
            },
            HandleVerticalSubMenuItemIconStyle: function () {
                switch (e.themelayout) {
                    case "vertical":
                        var a = e.VerticalSubMenuItemIconStyle;
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").attr("subitem-icon", a);
                        break;
                    case "horizontal":
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").attr("subitem-icon", a)
                }
            },
            HandleNavbarPosition: function () {
                var a = e.FixedNavbarPosition,
                    o = e.FixedHeaderPosition;
                e.FixedRightHeaderPosition;
                switch (e.themelayout) {
                    case "vertical":
                    case "horizontal":
                        1 == a ? ($("#" + t + " .pcoded-navbar").attr("pcoded-navbar-position", "fixed"), $("#" + t + " .pcoded-header .pcoded-left-header").attr("pcoded-lheader-position", "fixed")) : ($("#" + t + " .pcoded-navbar").attr("pcoded-navbar-position", "absolute"), $("#" + t + " .pcoded-header .pcoded-left-header").attr("pcoded-lheader-position", "absolute")), 1 == o ? ($("#" + t + " .pcoded-header").attr("pcoded-header-position", "fixed"), $("#" + t + " .pcoded-main-container").css("margin-top", $(".pcoded-header").outerHeight())) : ($("#" + t + " .pcoded-header").attr("pcoded-header-position", "relative"), $("#" + t + " .pcoded-main-container").css("margin-top", "0px"))
                }
            },
            HandleOptionSelectorPanel: function () {
                $(".selector-toggle > a").on("click", function () {
                    $("#styleSelector").toggleClass("open")
                })
            },
            HandleDropDownIconStyle: function () {
                var a = e.DropDownIconStyle;
                switch (e.themelayout) {
                    case "vertical":
                    case "horizontal":
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").attr("dropdown-icon", a)
                }
            },
            HandleSubItemBorder: function () {
                switch (e.SubItemBorder) {
                    case !0:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("subitem-border", "true");
                        break;
                    case !1:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("subitem-border", "false")
                }
            },
            HandleBorderStyle: function () {
                var a = e.ItemBorderStyle;
                switch (e.ItemBorder) {
                    case !0:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("item-border-style", a);
                        break;
                    case !1:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("item-border-style", "")
                }
            },
            HandleItemBorder: function () {
                switch (e.ItemBorder) {
                    case !0:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("item-border", "true");
                        break;
                    case !1:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("item-border", "false")
                }
            },
            HandleActiveItemStyle: function () {
                var a = e.ActiveItemStyle;
                void 0 != a && "" != a ? $("#" + t + " .pcoded-navbar").attr("active-item-style", a) : $("#" + t + " .pcoded-navbar").attr("active-item-style", "style0")
            },
            Handlemenutype: function () {
                var a = e.menutype,
                    o = e.freamtype;
                void 0 != a && "" != a ? $("#" + t).attr("nav-type", a) : $("#" + t).attr("nav-type", "st1"), void 0 != o && "" != o ? $("#" + t).attr("fream-type", o) : $("#" + t).attr("fream-type", "theme1")
            },
            Handlelayoutvartype: function () {
                var a = e.layouttype;
                void 0 != a && "" != a ? $("#" + t).attr("layout-type", a) : $("#" + t).attr("layout-type", "light")
            },
            HandleThemeBackground: function () {
                ! function () {
                    var t = e.ThemeBackgroundPattern;
                    void 0 != t && "" != t ? $("body").attr("themebg-pattern", t) : $("body").attr("themebg-pattern", "theme1")
                }(),
                function () {
                    var a = e.HeaderBackground,
                        o = e.LogoTheme;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-header").attr("header-theme", a) : $("#" + t + " .pcoded-header").attr("header-theme", "theme1"), void 0 != o && "" != o ? $("#" + t + " .navbar-logo").attr("logo-theme", o) : $("#" + t + " .navbar-logo").attr("logo-theme", "theme1")
                }(),
                function () {
                    var a = e.LHeaderBackground;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-navigation-label").attr("menu-title-theme", a) : $("#" + t + " .pcoded-navigation-label").attr("menu-title-theme", "theme4")
                }(),
                function () {
                    var a = e.NavbarBackground;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-navbar").attr("navbar-theme", a) : $("#" + t + " .pcoded-navbar").attr("navbar-theme", "theme1")
                }(),
                function () {
                    var a = e.ActiveItemBackground;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-navbar").attr("active-item-theme", a) : $("#" + t + " .pcoded-navbar").attr("active-item-theme", "theme1")
                }(),
                function () {
                    var a = e.SubItemBackground;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-navbar").attr("sub-item-theme", a) : $("#" + t + " .pcoded-navbar").attr("sub-item-theme", "theme1")
                }()
            },
            HandleVerticalLeftHeader: function () {
                if ("vertical" !== e.themelayout) return !1;
                switch (e.collapseVerticalLeftHeader) {
                    case !0:
                        $("#" + t + " .pcoded-header").addClass("iscollapsed"), $("#" + t + " .pcoded-header").removeClass("nocollapsed"), $("#" + t + ".pcoded").addClass("iscollapsed"), $("#" + t + ".pcoded").removeClass("nocollapsed");
                        break;
                    case !1:
                        $("#" + t + " .pcoded-header").removeClass("iscollapsed"), $("#" + t + " .pcoded-header").addClass("nocollapsed"), $("#" + t + ".pcoded").removeClass("iscollapsed"), $("#" + t + ".pcoded").addClass("nocollapsed")
                }
            },
            HandleOffcanvasMenu: function () {
                if ("vertical" === e.themelayout) {
                    "offcanvas" == $("#" + t).attr("vertical-nav-type") && $("#" + t).attr("vertical-layout", "wide")
                }
            },
            HandleActiveItem: function () {},
            HandleSubMenuTrigger: function () {
                function a(e) {
                    "hover" == e ? (n = e, i.off("click").off("mouseenter mouseleave").hover(function () {
                        $(this).addClass("pcoded-trigger")
                    }, function () {
                        $(this).removeClass("pcoded-trigger")
                    })) : "click" == e && (n = e, i.off("mouseenter mouseleave").off("click").on("click", function (e) {
                        e.stopPropagation(), 0 === $(this).closest(".pcoded-submenu").length ? $(this).hasClass("pcoded-trigger") ? $(this).removeClass("pcoded-trigger") : ($(this).closest(".pcoded-inner-navbar").find("li.pcoded-trigger").removeClass("pcoded-trigger"), $(this).addClass("pcoded-trigger")) : $(this).hasClass("pcoded-trigger") ? $(this).removeClass("pcoded-trigger") : ($(this).closest(".pcoded-submenu").find("li.pcoded-trigger").removeClass("pcoded-trigger"), $(this).addClass("pcoded-trigger"))
                    }))
                }
                switch (e.SubMenuTrigger) {
                    case "hover":
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").addClass("is-hover");
                        var o = $(window),
                            i = $(".pcoded-submenu > li"),
                            d = o.width(),
                            n = "";
                        a(d >= 992 ? "hover" : "click"), o.resize(function () {
                            var e = o.width();
                            d != e && (e >= 992 && "hover" != n ? a("hover") : e < 992 && "click" != n && a("click"), d = e)
                        });
                        break;
                    case "click":
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").removeClass("is-hover"), $(".pcoded-submenu > li").on("click", function (e) {
                            e.stopPropagation(), 0 === $(this).closest(".pcoded-submenu").length ? $(this).hasClass("pcoded-trigger") ? ($(this).removeClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideUp()) : ($(".pcoded-hasmenu li.pcoded-trigger").children(".pcoded-submenu").slideUp(), $(this).closest(".pcoded-inner-navbar").find("li.pcoded-trigger").removeClass("pcoded-trigger"), $(this).addClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideDown()) : $(this).hasClass("pcoded-trigger") ? ($(this).removeClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideUp()) : ($(".pcoded-hasmenu li.pcoded-trigger").children(".pcoded-submenu").slideUp(), $(this).closest(".pcoded-submenu").find("li.pcoded-trigger").removeClass("pcoded-trigger"), $(this).addClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideDown())
                        })
                }
            },
            HandleMenuTrigger: function () {
                function a(e) {
                    "hover" == e ? (n = e, i.off("click").off("mouseenter mouseleave").hover(function () {
                        $(this).addClass("pcoded-trigger")
                    }, function () {
                        $(this).removeClass("pcoded-trigger")
                    })) : "click" == e && (n = e, i.off("mouseenter mouseleave").off("click").on("click", function () {
                        $(this).hasClass("pcoded-trigger") ? $(this).removeClass("pcoded-trigger") : ($(this).closest(".pcoded-inner-navbar").find("li.pcoded-trigger").removeClass("pcoded-trigger"), $(this).addClass("pcoded-trigger"))
                    }))
                }
                switch (e.MenuTrigger) {
                    case "hover":
                        $("#" + t + " .pcoded-navbar").addClass("is-hover");
                        var o = $(window),
                            i = $(".pcoded-item > li"),
                            d = o.width(),
                            n = "";
                        a(d >= 992 ? "hover" : "click"), o.resize(function () {
                            var e = o.width();
                            d != e && (e >= 992 && "hover" != n ? a("hover") : e < 992 && "click" != n && a("click"), d = e)
                        });
                        break;
                    case "click":
                        $("#" + t + " .pcoded-navbar").removeClass("is-hover"), $(".pcoded-item > li ").on("click", function () {
                            $(this).hasClass("pcoded-trigger") ? ($(this).removeClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideUp()) : ($("li.pcoded-trigger").children(".pcoded-submenu").slideUp(), $(this).closest(".pcoded-inner-navbar").find("li.pcoded-trigger").removeClass("pcoded-trigger"), $(this).addClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideDown())
                        })
                }
            },
            HandleMenuOnClick: function () {
                var a = $(window)[0].innerWidth;
                "vertical" === e.themelayout ? $("#mobile-collapse,#mobile-collapse1,.sidebar_toggle a, .pcoded-overlay-box,.menu-toggle a").on("click", function () {
                    $(this).parent().find(".menu-icon").toggleClass("is-clicked");
                    var a = $("#" + t).attr("pcoded-device-type");
                    if ("desktop" == a) {
                        var o = e.onToggleVerticalMenu.desktop,
                            i = e.defaultVerticalMenu.desktop,
                            d = $("#" + t).attr("vertical-nav-type");
                        if (d == i) $("#" + t).attr("vertical-nav-type", o);
                        else {
                            if (d != o) return !1;
                            $("#" + t).attr("vertical-nav-type", i)
                        }
                    } else if ("tablet" == a) {
                        var n = e.onToggleVerticalMenu.tablet,
                            r = e.defaultVerticalMenu.tablet,
                            c = $("#" + t).attr("vertical-nav-type");
                        c == r ? $("#" + t).attr("vertical-nav-type", n) : d == o && $("#" + t).attr("vertical-nav-type", r)
                    } else if ("phone" == a) {
                        var l = e.onToggleVerticalMenu.phone,
                            s = e.defaultVerticalMenu.phone,
                            p = $("#" + t).attr("vertical-nav-type");
                        p == s ? $("#" + t).attr("vertical-nav-type", l) : d == o && $("#" + t).attr("vertical-nav-type", s)
                    }
                    $(".pcoded").addClass("pcoded-toggle-animate"), setTimeout(function () {
                        $(".pcoded").removeClass("pcoded-toggle-animate")
                    }, 500)
                }) : "horizontal" === e.themelayout && (a >= 768 && a <= 992 ? $("#" + t).attr("pcoded-device-type", "tablet") : a < 768 ? $("#" + t).attr("pcoded-device-type", "phone") : $("#" + t).attr("pcoded-device-type", "desktop"))
            },
            Handlecomponetheight: function () {
                function e() {
                    $(window).height(), $(".pcoded-header").innerHeight(), $(".pcoded-navbar").innerHeight(), $(".pcoded-footer").innerHeight()
                }
                e(), $(window).resize(function () {
                    e()
                })
            },
            HandleDeviceType: function () {
                function a() {
                    var a = $(window)[0].innerWidth;
                    if ("vertical" === e.themelayout)
                        if (a >= 768 && a <= 992) {
                            $("#" + t).attr("pcoded-device-type", "tablet");
                            var o = e.defaultVerticalMenu.tablet;
                            void 0 != o && "" != o ? $("#" + t).attr("vertical-nav-type", o) : $("#" + t).attr("vertical-nav-type", "collapsed");
                            var i = e.verticalMenueffect.tablet;
                            void 0 != i && "" != o ? $("#" + t).attr("vertical-effect", i) : $("#" + t).attr("vertical-effect", "shrink")
                        } else if (a < 768) {
                        $("#" + t).attr("pcoded-device-type", "phone");
                        var o = e.defaultVerticalMenu.phone;
                        void 0 != o && "" != o ? $("#" + t).attr("vertical-nav-type", o) : $("#" + t).attr("vertical-nav-type", "offcanvas");
                        var i = e.verticalMenueffect.phone;
                        void 0 != i && "" != o ? $("#" + t).attr("vertical-effect", i) : $("#" + t).attr("vertical-effect", "push")
                    } else {
                        $("#" + t).attr("pcoded-device-type", "desktop");
                        var o = e.defaultVerticalMenu.desktop;
                        void 0 != o && "" != o ? $("#" + t).attr("vertical-nav-type", o) : $("#" + t).attr("vertical-nav-type", "expanded");
                        var i = e.verticalMenueffect.desktop;
                        void 0 != i && "" != o ? $("#" + t).attr("vertical-effect", i) : $("#" + t).attr("vertical-effect", "shrink")
                    } else "horizontal" === e.themelayout && (a >= 768 && a <= 992 ? $("#" + t).attr("pcoded-device-type", "tablet") : a < 768 ? $("#" + t).attr("pcoded-device-type", "phone") : $("#" + t).attr("pcoded-device-type", "desktop"))
                }
                a(), $(window).resize(function () {
                    tw = $(window)[0].innerWidth, dt = $("#" + t).attr("pcoded-device-type"), "desktop" == dt && tw < 992 ? a() : "phone" == dt && tw > 768 ? a() : "tablet" == dt && tw < 768 ? a() : "tablet" == dt && tw > 992 && a()
                })
            },
            HandleMenulayout: function () {
                if ("vertical" === e.themelayout) switch (e.verticalMenulayout) {
                    case "wide":
                        $("#" + t).attr("vertical-layout", "wide");
                        break;
                    case "box":
                        $("#" + t).attr("vertical-layout", "box");
                        break;
                    case "widebox":
                        $("#" + t).attr("vertical-layout", "widebox")
                } else {
                    if ("horizontal" !== e.themelayout) return !1;
                    switch (e.horizontalMenulayout) {
                        case "wide":
                            $("#" + t).attr("horizontal-layout", "wide");
                            break;
                        case "box":
                            $("#" + t).attr("horizontal-layout", "box");
                            break;
                        case "widebox":
                            $("#" + t).attr("horizontal-layout", "widebox")
                    }
                }
            },
            HandlehorizontalMenuplacement: function () {
                if ("horizontal" === e.themelayout) switch (e.horizontalMenuplacement) {
                    case "bottom":
                        $("#" + t).attr("horizontal-placement", "bottom");
                        break;
                    case "top":
                        $("#" + t).attr("horizontal-placement", "top")
                } else $("#" + t).removeAttr("horizontal-placement")
            },
            HandleverticalMenuplacement: function () {
                if ("vertical" === e.themelayout) switch (e.verticalMenuplacement) {
                    case "left":
                        $("#" + t).attr("vertical-placement", "left");
                        break;
                    case "right":
                        $("#" + t).attr("vertical-placement", "right")
                } else $("#" + t).removeAttr("vertical-placement")
            },
            Handlethemelayout: function () {
                switch (e.themelayout) {
                    case "horizontal":
                        $("#" + t).attr("theme-layout", "horizontal");
                        break;
                    case "vertical":
                        $("#" + t).attr("theme-layout", "vertical")
                }
            }
        };
    o.PcodedMenuInit()
}, $(window).scroll(function () {
    $(this).scrollTop() > 70 ? ($('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("position", "fixed"), $('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("top", 0), $('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("height", "100%"), $('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"] .nav-list').css("height", "100%")) : ($('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("position", "absolute"), $('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("top", "auto"))
}), $(window).scroll(function () {
    $(this).scrollTop() > 70 ? ($('.pcoded[theme-layout="horizontal"][pcoded-device-type="desktop"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("position", "fixed"), $('.pcoded[theme-layout="horizontal"][pcoded-device-type="desktop"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("top", 0)) : ($('.pcoded[theme-layout="horizontal"][pcoded-device-type="desktop"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("position", "absolute"), $('.pcoded[theme-layout="horizontal"][pcoded-device-type="desktop"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("top", "auto"))
}), $(window).on("load", function () {
    $('.pcoded[vertical-nav-type="collapsed"] .pcoded-navbar').hover(function () {
        $(".pcoded").attr("vertical-nav-type", "expanded")
    }, function () {
        $(".pcoded").attr("vertical-nav-type", "collapsed")
    })
});

"use strict!"
$(document).ready(function(){var noofdays=1;var Navbarbg="themelight1";var headerbg="theme1";var menucaption="theme1";var bgpattern="theme1";var activeitemtheme="theme1";var frametype="theme1";var layout_type="light";var layout_width="wide";var menu_effect_desktop="shrink";var menu_effect_tablet="overlay";var menu_effect_phone="overlay";var menu_icon_style="st2";$('.pcoded-navbar .pcoded-hasmenu').attr('subitem-icon','style1');$("#pcoded").pcodedmenu({themelayout:'horizontal',horizontalMenuplacement:'top',horizontalBrandItem:true,horizontalLeftNavItem:true,horizontalRightItem:true,horizontalSearchItem:true,horizontalMobileMenu:true,MenuTrigger:'hover',SubMenuTrigger:'hover',activeMenuClass:'active',ThemeBackgroundPattern:bgpattern,HeaderBackground:headerbg,LHeaderBackground:menucaption,NavbarBackground:Navbarbg,ActiveItemBackground:activeitemtheme,SubItemBackground:'theme2',LogoTheme:'theme1',menutype:menu_icon_style,freamtype:frametype,layouttype:layout_type,ActiveItemStyle:'style1',ItemBorder:true,ItemBorderStyle:'none',SubItemBorder:true,DropDownIconStyle:'style1',FixedNavbarPosition:true,FixedHeaderPosition:true,horizontalNavIsCentered:false,horizontalstickynavigation:false,horizontalNavigationMenuIcon:true,});function handlelayouttheme(){$('.theme-color > a.Layout-type').on("click",function(){var layout=$(this).attr("layout-type");$('.pcoded').attr("layout-type",layout);if(layout=='dark'){$('.pcoded-header').attr("header-theme","theme6");$('.pcoded-navbar').attr("navbar-theme","theme1");$('.pcoded-navbar').attr("active-item-theme","theme1");$('.pcoded').attr("fream-type","theme1");$('body').addClass('dark');$('body').attr("themebg-pattern","theme1");$('.pcoded-navigation-label').attr("menu-title-theme","theme1");}
if(layout=='light'){$('.pcoded-header').attr("header-theme","themelight1");$('.pcoded-navbar').attr("navbar-theme","themelight1");$('.pcoded-navigation-label').attr("menu-title-theme","theme2");$('.pcoded-navbar').attr("active-item-theme","theme1");$('.pcoded').attr("fream-type","theme1");$('body').removeClass('dark');$('body').attr("themebg-pattern","theme1");}});};handlelayouttheme();function handleleftheadertheme(){$('.theme-color > a.leftheader-theme').on("click",function(){var lheadertheme=$(this).attr("menu-caption");$('.pcoded-navigation-label').attr("menu-title-theme",lheadertheme);});};handleleftheadertheme();function handleheaderthemefull(){$('.theme-color > a.header-theme-full').on("click",function(){var headertheme=$(this).attr("header-theme");var activeitem=$(this).attr("active-item-color");$('.pcoded-header').attr("header-theme",headertheme);$('.navbar-logo').attr("logo-theme",headertheme);$('.pcoded-navbar').attr("active-item-theme",activeitem);$('.pcoded').attr("fream-type",headertheme);$('body').attr("themebg-pattern",headertheme);if(headertheme=="theme6"){$('.pcoded-navbar').attr("active-item-theme","theme1");}});};handleheaderthemefull();function handleheadertheme(){$('.theme-color > a.header-theme').on("click",function(){var headertheme=$(this).attr("header-theme");var activeitem=$(this).attr("active-item-color");$('.pcoded-header').attr("header-theme",headertheme);$('.pcoded-navbar').attr("active-item-theme",activeitem);$('.pcoded').attr("fream-type",headertheme);$('body').attr("themebg-pattern",headertheme);if(headertheme=="theme6"){$('.pcoded-navbar').attr("active-item-theme","theme1");}});};handleheadertheme();function handlenavbartheme(){$('.theme-color > a.navbar-theme').on("click",function(){var navbartheme=$(this).attr("navbar-theme");$('.pcoded-navbar').attr("navbar-theme",navbartheme);if(navbartheme=='themelight1'){$('.pcoded-navigation-label').attr("menu-title-theme","theme2");}
if(navbartheme=='theme1'){$('.pcoded-navigation-label').attr("menu-title-theme","theme1");}});};handlenavbartheme();function handleactiveitemtheme(){$('.theme-color > a.active-item-theme').on("click",function(){var activeitemtheme=$(this).attr("active-item-theme");$('.pcoded-navbar').attr("active-item-theme",activeitemtheme);});};handleactiveitemtheme();function handlethemebgpattern(){$('.theme-color > a.themebg-pattern').on("click",function(){var themebgpattern=$(this).attr("themebg-pattern");$('body').attr("themebg-pattern",themebgpattern);});};handlethemebgpattern();function handlethemeverticallayout(){$('#theme-layout').change(function(){if($(this).is(":checked")){$('.pcoded').attr('vertical-layout',"box");$('#bg-pattern-visiblity').removeClass('d-none');}else{$('.pcoded').attr('vertical-layout',"wide");$('#bg-pattern-visiblity').addClass('d-none');}});};handlethemeverticallayout();function handleverticalMenueffect(){$('#vertical-menu-effect').val('shrink').on('change',function(get_value){get_value=$(this).val();$('.pcoded').attr('vertical-effect',get_value);});};handleverticalMenueffect();function handleverticalboderstyle(){$('#vertical-border-style').val('solid').on('change',function(get_value){get_value=$(this).val();$('.pcoded-navbar .pcoded-item').attr('item-border-style',get_value);});};handleverticalboderstyle();function handleVerticalDropDownIconStyle(){$('#vertical-dropdown-icon').val('style1').on('change',function(get_value){get_value=$(this).val();$('.pcoded-navbar .pcoded-hasmenu').attr('dropdown-icon',get_value);});};handleVerticalDropDownIconStyle();function handleVerticalSubMenuItemIconStyle(){$('#vertical-subitem-icon').val('style5').on('change',function(get_value){get_value=$(this).val();$('.pcoded-navbar .pcoded-hasmenu').attr('subitem-icon',get_value);});};handleVerticalSubMenuItemIconStyle();function handlesidebarposition(){$('#sidebar-position').change(function(){if($(this).is(":checked")){$('.pcoded-navbar').attr("pcoded-navbar-position",'fixed');$('.pcoded-header .pcoded-left-header').attr("pcoded-lheader-position",'fixed');}else{$('.pcoded-navbar').attr("pcoded-navbar-position",'absolute');$('.pcoded-header .pcoded-left-header').attr("pcoded-lheader-position",'relative');}});};handlesidebarposition();function handleheaderposition(){$('#header-position').change(function(){if($(this).is(":checked")){$('.pcoded-header').attr("pcoded-header-position",'fixed');$('.pcoded-navbar').attr("pcoded-header-position",'fixed');$('.pcoded-main-container').css('margin-top',$(".pcoded-header").outerHeight());}else{$('.pcoded-header').attr("pcoded-header-position",'relative');$('.pcoded-navbar').attr("pcoded-header-position",'relative');$('.pcoded-main-container').css('margin-top','0px');}});};handleheaderposition();function handlecollapseLeftHeader(){$('#collapse-left-header').change(function(){if($(this).is(":checked")){$('.pcoded-header, .pcoded ').removeClass('iscollapsed');$('.pcoded-header, .pcoded').addClass('nocollapsed');}else{$('.pcoded-header, .pcoded').addClass('iscollapsed');$('.pcoded-header, .pcoded').removeClass('nocollapsed');}});};handlecollapseLeftHeader();});function handlemenutype(get_value){$('.pcoded').attr('nav-type',get_value);};handlemenutype("st2");
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&Q(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ne()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&Q(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){o.data(a);N.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),N.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),$(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),$(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+n.langDir+"' /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=oe(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(Q(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),U.call(this),i.advanced.autoScrollOnFocus&&H.call(this),i.scrollButtons.enable&&F.call(this),i.keyboard.enable&&q.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!A()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),$(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=A()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e,t,a,n){if(h[0].idleTimer=d.scrollInertia<233?250:0,o.attr("id")===f[1])var i="x",s=(o[0].offsetLeft-t+n)*l.scrollRatio.x;else var i="y",s=(o[0].offsetTop-e+a)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var o,n,i,r=e(this),l=r.data(a),d=l.opt,u=a+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],h=e("#mCSB_"+l.idx+"_container"),m=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?m.add(e(d.advanced.releaseDraggableSelectors)):m,g=d.advanced.extraDraggableSelectors?e(!A()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!A()||top.document);m.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(h,!1),Q(r),o=e(this);var a=o.offset(),l=O(t)[0]-a.top,u=O(t)[1]-a.left,f=o.height()+a.top,m=o.width()+a.left;f>l&&l>0&&m>u&&u>0&&(n=l,i=u),C(o,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;t(n,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(o){var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;if(n===r&&i===l)return;t(n,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){o&&(C(o,"active",d.autoExpandScrollbar),o=null),c=!1,s&&(document.onselectstart=null),L.call(h,!0)})},D=function(){function o(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if(te(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),W.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],R,n,"y","all",!0),B.overflowed[1]&&s(w[1],R,n,"x",L,!0)}}function i(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),Q(y),p=K();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],W=[]}function r(e){if(te(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],W[W.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&G(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],W=[],R=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,j(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(Q(o),!z(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||a:t.deltaX;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),G(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},R=new Object,A=function(t){var o=!1,a=!1,n=null;if(void 0===t?a="#empty":void 0!==e(t).attr("id")&&(a=e(t).attr("id")),a!==!1&&void 0!==R[a])return R[a];if(t){try{var i=t.contentDocument||t.contentWindow.document;n=i.body.innerHTML}catch(r){}o=null!==n}else{try{var i=top.document;n=i.body.innerHTML}catch(r){}o=null!==n}return a!==!1&&(R[a]=o),o},L=function(e){var t=this.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}},z=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){Q(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var o=e(document.activeElement),a=r.find(".mCustomScrollBox").length,i=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?(i+17)*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[ae(o)[0],ae(o)[1]],a=[r[0].offsetTop,r[0].offsetLeft],s=[a[0]+e[0]>=0&&a[0]+e[0]<l.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<l.width()-o.outerWidth(!1)],c="yx"!==n.axis||s[0]||s[1]?"all":"none";"x"===n.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===n.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},U=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,j(t,e,o)}if(a.preventDefault(),ee(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},q=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||j(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){Q(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var h="y",m=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},j=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*n):s[0]+f.dir[1]*(d[0]*n),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=!!e;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),G(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),$(f,"step"),Q(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],Q(t),oe(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},X=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?ae(m)[1]:ae(m)[0];case"string":case"number":if(oe(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&oe(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?ae(m)[1]:ae(m)[0]}return e(t).length?"x"===o?ae(e(t))[1]:ae(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},N=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){
return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void $(f[0],"autoUpdate")):void o()},V=function(e,t,o){return Math.round(e/t)*t-o},Q=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){Z.call(this)})},G=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,0===m.scrollTop()&&0===m.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=V(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),J(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),!s.tweenRunning&&(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0])||J(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},J=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=K()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=K(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},K=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},$=function(e,t){try{delete e[t]}catch(o){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},oe=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ae=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ne=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).bind("load",function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+ae(n)[0]>=0&&a[0]+ae(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+ae(n)[1]>=0&&a[1]+ae(n)[1]<o.width()-n.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,o,a){var n,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===a[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return n=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+ae(s)[0],c[0].offsetLeft+ae(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[n[0]<i[0]?d[0]:d[1],n[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+n[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+n[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
"use strict!";

function handlemenutype(e) {
    $(".pcoded").attr("nav-type", e)
}
$(document).ready(function () {
    $(".pcoded-navbar .pcoded-hasmenu").attr("subitem-icon", "style1"), $("#pcoded").pcodedmenu({
            themelayout: "horizontal",
            horizontalMenuplacement: "top",
            horizontalBrandItem: !0,
            horizontalLeftNavItem: !0,
            horizontalRightItem: !0,
            horizontalSearchItem: !0,
            horizontalMobileMenu: !0,
            MenuTrigger: "hover",
            SubMenuTrigger: "hover",
            activeMenuClass: "active",
            ThemeBackgroundPattern: "theme5",
            HeaderBackground: "theme5",
            LHeaderBackground: "theme5",
            NavbarBackground: "themelight5",
            ActiveItemBackground: "theme5",
            SubItemBackground: "theme5",
            LogoTheme: "theme5",
            menutype: "st2",
            freamtype: "theme5",
            layouttype: "light",
            ActiveItemStyle: "style5",
            ItemBorder: !0,
            ItemBorderStyle: "none",
            SubItemBorder: !0,
            DropDownIconStyle: "style5",
            FixedNavbarPosition: !1,
            FixedHeaderPosition: !1,
            horizontalNavIsCentered: !1,
            horizontalstickynavigation: !1,
            horizontalNavigationMenuIcon: !0
        }),
        function () {
            $(".theme-color > a.Layout-type").on("click", function () {
                var e = $(this).attr("layout-type");
                $(".pcoded").attr("layout-type", e), "dark" == e && ($(".pcoded-header").attr("header-theme", "theme6"), $(".pcoded-navbar").attr("navbar-theme", "theme1"), $(".pcoded-navbar").attr("active-item-theme", "theme1"), $(".pcoded").attr("fream-type", "theme1"), $("body").addClass("dark"), $("body").attr("themebg-pattern", "theme1"), $(".pcoded-navigation-label").attr("menu-title-theme", "theme1")), "light" == e && ($(".pcoded-header").attr("header-theme", "themelight1"), $(".pcoded-navbar").attr("navbar-theme", "themelight1"), $(".pcoded-navigation-label").attr("menu-title-theme", "theme2"), $(".pcoded-navbar").attr("active-item-theme", "theme1"), $(".pcoded").attr("fream-type", "theme1"), $("body").removeClass("dark"), $("body").attr("themebg-pattern", "theme1"))
            })
        }(),
        function () {
            $(".theme-color > a.leftheader-theme").on("click", function () {
                var e = $(this).attr("menu-caption");
                $(".pcoded-navigation-label").attr("menu-title-theme", e)
            })
        }(),
        function () {
            $(".theme-color > a.header-theme-full").on("click", function () {
                var e = $(this).attr("header-theme"),
                    t = $(this).attr("active-item-color");
                $(".pcoded-header").attr("header-theme", e), $(".navbar-logo").attr("logo-theme", e), $(".pcoded-navbar").attr("active-item-theme", t), $(".pcoded").attr("fream-type", e), $("body").attr("themebg-pattern", e), "theme6" == e && $(".pcoded-navbar").attr("active-item-theme", "theme1")
            })
        }(),
        function () {
            $(".theme-color > a.header-theme").on("click", function () {
                var e = $(this).attr("header-theme"),
                    t = $(this).attr("active-item-color");
                $(".pcoded-header").attr("header-theme", e), $(".pcoded-navbar").attr("active-item-theme", t), $(".pcoded").attr("fream-type", e), $("body").attr("themebg-pattern", e), "theme6" == e && $(".pcoded-navbar").attr("active-item-theme", "theme1")
            })
        }(),
        function () {
            $(".theme-color > a.navbar-theme").on("click", function () {
                var e = $(this).attr("navbar-theme");
                $(".pcoded-navbar").attr("navbar-theme", e), "themelight1" == e && $(".pcoded-navigation-label").attr("menu-title-theme", "theme2"), "theme1" == e && $(".pcoded-navigation-label").attr("menu-title-theme", "theme1")
            })
        }(),
        function () {
            $(".theme-color > a.active-item-theme").on("click", function () {
                var e = $(this).attr("active-item-theme");
                $(".pcoded-navbar").attr("active-item-theme", e)
            })
        }(),
        function () {
            $(".theme-color > a.themebg-pattern").on("click", function () {
                var e = $(this).attr("themebg-pattern");
                $("body").attr("themebg-pattern", e)
            })
        }(),
        function () {
            $("#theme-layout").change(function () {
                $(this).is(":checked") ? ($(".pcoded").attr("vertical-layout", "box"), $("#bg-pattern-visiblity").removeClass("d-none")) : ($(".pcoded").attr("vertical-layout", "wide"), $("#bg-pattern-visiblity").addClass("d-none"))
            })
        }(),
        function () {
            $("#vertical-menu-effect").val("shrink").on("change", function (e) {
                e = $(this).val(), $(".pcoded").attr("vertical-effect", e)
            })
        }(),
        function () {
            $("#vertical-border-style").val("solid").on("change", function (e) {
                e = $(this).val(), $(".pcoded-navbar .pcoded-item").attr("item-border-style", e)
            })
        }(),
        function () {
            $("#vertical-dropdown-icon").val("style1").on("change", function (e) {
                e = $(this).val(), $(".pcoded-navbar .pcoded-hasmenu").attr("dropdown-icon", e)
            })
        }(),
        function () {
            $("#vertical-subitem-icon").val("style5").on("change", function (e) {
                e = $(this).val(), $(".pcoded-navbar .pcoded-hasmenu").attr("subitem-icon", e)
            })
        }(),
        function () {
            $("#sidebar-position").change(function () {
                $(this).is(":checked") ? ($(".pcoded-navbar").attr("pcoded-navbar-position", "fixed"), $(".pcoded-header .pcoded-left-header").attr("pcoded-lheader-position", "fixed")) : ($(".pcoded-navbar").attr("pcoded-navbar-position", "absolute"), $(".pcoded-header .pcoded-left-header").attr("pcoded-lheader-position", "relative"))
            })
        }(),
        function () {
            $("#header-position").change(function () {
                $(this).is(":checked") ? ($(".pcoded-header").attr("pcoded-header-position", "fixed"), $(".pcoded-navbar").attr("pcoded-header-position", "fixed"), $(".pcoded-main-container").css("margin-top", $(".pcoded-header").outerHeight())) : ($(".pcoded-header").attr("pcoded-header-position", "relative"), $(".pcoded-navbar").attr("pcoded-header-position", "relative"), $(".pcoded-main-container").css("margin-top", "0px"))
            })
        }(),
        function () {
            $("#collapse-left-header").change(function () {
                $(this).is(":checked") ? ($(".pcoded-header, .pcoded ").removeClass("iscollapsed"), $(".pcoded-header, .pcoded").addClass("nocollapsed")) : ($(".pcoded-header, .pcoded").addClass("iscollapsed"), $(".pcoded-header, .pcoded").removeClass("nocollapsed"))
            })
        }()
}), handlemenutype("st2");

"use strict";
$(document).ready(function() {
    // card js start
    $(".card-header-right .close-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').animate({
            'opacity': '0',
            '-webkit-transform': 'scale3d(.3, .3, .3)',
            'transform': 'scale3d(.3, .3, .3)'
        });

        setTimeout(function() {
            $this.parents('.card').remove();
        }, 800);
    });
    $(".card-header-right .reload-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').addClass("card-load");
        $this.parents('.card').append('<div class="card-loader"><i class="feather icon-radio rotate-refresh"></div>');
        setTimeout(function() {
            $this.parents('.card').children(".card-loader").remove();
            $this.parents('.card').removeClass("card-load");
        }, 3000);
    });
    $(".card-header-right .card-option .open-card-option").on('click', function() {
        var $this = $(this);
        if ($this.hasClass('icon-x')) {
            $this.parents('.card-option').animate({
                'width': '30px',
            });
            $this.parents('.card-option').children('li').children(".open-card-option").removeClass("icon-x").fadeIn('slow');
            $this.parents('.card-option').children('li').children(".open-card-option").addClass("icon-chevron-left").fadeIn('slow');
            $this.parents('.card-option').children(".first-opt").fadeIn();
        } else {
            $this.parents('.card-option').animate({
                'width': '130px',
            });
            $this.parents('.card-option').children('li').children(".open-card-option").addClass("icon-x").fadeIn('slow');
            $this.parents('.card-option').children('li').children(".open-card-option").removeClass("icon-chevron-left").fadeIn('slow');
            $this.parents('.card-option').children(".first-opt").fadeOut();
        }
    });
    $(".card-header-right .minimize-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        var card = $(port).children('.card-block').slideToggle();
        $(this).toggleClass("icon-minus").fadeIn('slow');
        $(this).toggleClass("icon-plus").fadeIn('slow');
    });
    $(".card-header-right .full-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        port.toggleClass("full-card");
        $(this).toggleClass("icon-minimize");
        $(this).toggleClass("icon-maximize");
    });
    $("#more-details").on('click', function() {
        $(".more-details").slideToggle(500);
    });
    $(".mobile-options").on('click', function() {
        $(".navbar-container .nav-right").slideToggle('slow');
    });
    $(".search-btn").on('click', function() {
        $(".main-search").addClass('open');
        $('.main-search .form-control').animate({
            'width': '200px',
        });
    });
    $(".search-close").on('click', function() {
        $('.main-search .form-control').animate({
            'width': '0',
        });
        setTimeout(function() {
            $(".main-search").removeClass('open');
        }, 300);
    });
    // card js end
    $("#styleSelector .style-cont").slimScroll({
        setTop: "1px",
        height: "calc(100vh - 480px)",
    });
    /*chatbar js start*/
    /*chat box scroll*/
    var a = $(window).height() - 80;
    $(".main-friend-list").slimScroll({
        height: a,
        allowPageScroll: false,
        wheelStep: 5
    });
    var a = $(window).height() - 155;
    $(".main-friend-chat").slimScroll({
        height: a,
        allowPageScroll: false,
        wheelStep: 5
    });

    // search
    $("#search-friends").on("keyup", function() {
        var g = $(this).val().toLowerCase();
        $(".userlist-box .media-body .chat-header").each(function() {
            var s = $(this).text().toLowerCase();
            $(this).closest('.userlist-box')[s.indexOf(g) !== -1 ? 'show' : 'hide']();
        });
    });

    // open chat box
    $('.displayChatbox').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat').toggle('slide', options, 500);
    });

    //open friend chat
    $('.userlist-box').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat_inner').toggle('slide', options, 500);
    });
    //back to main chatbar
    $('.back_chatBox').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.showChat_inner').toggle('slide', options, 500);
        $('.showChat').css('display', 'block');
    });
    $('.back_friendlist').on('click', function() {
        var my_val = $('.pcoded').attr('vertical-placement');
        if (my_val == 'right') {
            var options = {
                direction: 'left'
            };
        } else {
            var options = {
                direction: 'right'
            };
        }
        $('.p-chat-user').toggle('slide', options, 500);
        $('.showChat').css('display', 'block');
    });
    // /*chatbar js end*/
    $('[data-toggle="tooltip"]').tooltip();

    // wave effect js
    Waves.init();
    Waves.attach('.flat-buttons', ['waves-button']);
    Waves.attach('.float-buttons', ['waves-button', 'waves-float']);
    Waves.attach('.float-button-light', ['waves-button', 'waves-float', 'waves-light']);
    Waves.attach('.flat-buttons', ['waves-button', 'waves-float', 'waves-light', 'flat-buttons']);

    // $('#mobile-collapse i').addClass('icon-toggle-right');
    // $('#mobile-collapse').on('click', function() {
    //     $('#mobile-collapse i').toggleClass('icon-toggle-right');
    //     $('#mobile-collapse i').toggleClass('icon-toggle-left');
    // });
    // materia form

    $('.form-control').on('blur', function() {
        if ($(this).val().length > 0) {
            $(this).addClass("fill");
        } else {
            $(this).removeClass("fill");
        }
    });
    $('.form-control').on('focus', function() {
        $(this).addClass("fill");
    });
    $('#mobile-collapse i').addClass('icon-toggle-right');
    $('#mobile-collapse').on('click', function() {
        $('#mobile-collapse i').toggleClass('icon-toggle-right');
        $('#mobile-collapse i').toggleClass('icon-toggle-left');
    });
});
$(document).ready(function() {
    var $window = $(window);
    // $('.loader-bar').animate({
    //     width: $window.width()
    // }, 1000);
    // setTimeout(function() {
    // while ($('.loader-bar').width() == $window.width()) {
    // $(window).on('load',function(){
    $('.loader-bg').fadeOut();
    // });

    // break;

    // }
    // }, 2000);
});

// toggle full screen
function toggleFullScreen() {
    var a = $(window).height() - 10;

    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
    $('.full-screen').toggleClass('icon-maximize');
    $('.full-screen').toggleClass('icon-minimize');
}