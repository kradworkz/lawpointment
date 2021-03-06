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

(function($){var options={xaxis:{categories:null},yaxis:{categories:null}};function processRawData(plot,series,data,datapoints){var xCategories=series.xaxis.options.mode=="categories",yCategories=series.yaxis.options.mode=="categories";if(!(xCategories||yCategories))
return;var format=datapoints.format;if(!format){var s=series;format=[];format.push({x:true,number:true,required:true});format.push({y:true,number:true,required:true});if(s.bars.show||(s.lines.show&&s.lines.fill)){var autoscale=!!((s.bars.show&&s.bars.zero)||(s.lines.show&&s.lines.zero));format.push({y:true,number:true,required:false,defaultValue:0,autoscale:autoscale});if(s.bars.horizontal){delete format[format.length-1].y;format[format.length-1].x=true;}}
datapoints.format=format;}
for(var m=0;m<format.length;++m){if(format[m].x&&xCategories)
format[m].number=false;if(format[m].y&&yCategories)
format[m].number=false;}}
function getNextIndex(categories){var index=-1;for(var v in categories)
if(categories[v]>index)
index=categories[v];return index+1;}
function categoriesTickGenerator(axis){var res=[];for(var label in axis.categories){var v=axis.categories[label];if(v>=axis.min&&v<=axis.max)
res.push([v,label]);}
res.sort(function(a,b){return a[0]-b[0];});return res;}
function setupCategoriesForAxis(series,axis,datapoints){if(series[axis].options.mode!="categories")
return;if(!series[axis].categories){var c={},o=series[axis].options.categories||{};if($.isArray(o)){for(var i=0;i<o.length;++i)
c[o[i]]=i;}
else{for(var v in o)
c[v]=o[v];}
series[axis].categories=c;}
if(!series[axis].options.ticks)
series[axis].options.ticks=categoriesTickGenerator;transformPointsOnAxis(datapoints,axis,series[axis].categories);}
function transformPointsOnAxis(datapoints,axis,categories){var points=datapoints.points,ps=datapoints.pointsize,format=datapoints.format,formatColumn=axis.charAt(0),index=getNextIndex(categories);for(var i=0;i<points.length;i+=ps){if(points[i]==null)
continue;for(var m=0;m<ps;++m){var val=points[i+m];if(val==null||!format[m][formatColumn])
continue;if(!(val in categories)){categories[val]=index;++index;}
points[i+m]=categories[val];}}}
function processDatapoints(plot,series,datapoints){setupCategoriesForAxis(series,"xaxis",datapoints);setupCategoriesForAxis(series,"yaxis",datapoints);}
function init(plot){plot.hooks.processRawData.push(processRawData);plot.hooks.processDatapoints.push(processDatapoints);}
$.plot.plugins.push({init:init,options:options,name:'categories',version:'1.0'});})(jQuery);
(function($){var options={series:{curvedLines:{active:false,apply:false,monotonicFit:false,tension:0.5,nrSplinePoints:20,legacyOverride:undefined}}};function init(plot){plot.hooks.processOptions.push(processOptions);function processOptions(plot,options){if(options.series.curvedLines.active){plot.hooks.processDatapoints.unshift(processDatapoints);}}
function processDatapoints(plot,series,datapoints){var nrPoints=datapoints.points.length/datapoints.pointsize;var EPSILON=0.005;var invalidLegacyOptions=hasInvalidParameters(series.curvedLines);if(!invalidLegacyOptions&&series.curvedLines.apply==true&&series.originSeries===undefined&&nrPoints>(1+EPSILON)){if(series.lines.fill){var pointsTop=calculateCurvePoints(datapoints,series.curvedLines,1);var pointsBottom=calculateCurvePoints(datapoints,series.curvedLines,2);datapoints.pointsize=3;datapoints.points=[];var j=0;var k=0;var i=0;var ps=2;while(i<pointsTop.length||j<pointsBottom.length){if(pointsTop[i]==pointsBottom[j]){datapoints.points[k]=pointsTop[i];datapoints.points[k+1]=pointsTop[i+1];datapoints.points[k+2]=pointsBottom[j+1];j+=ps;i+=ps;}else if(pointsTop[i]<pointsBottom[j]){datapoints.points[k]=pointsTop[i];datapoints.points[k+1]=pointsTop[i+1];datapoints.points[k+2]=k>0?datapoints.points[k-1]:null;i+=ps;}else{datapoints.points[k]=pointsBottom[j];datapoints.points[k+1]=k>1?datapoints.points[k-2]:null;datapoints.points[k+2]=pointsBottom[j+1];j+=ps;}
k+=3;}}else if(series.lines.lineWidth>0){datapoints.points=calculateCurvePoints(datapoints,series.curvedLines,1);datapoints.pointsize=2;}}}
function calculateCurvePoints(datapoints,curvedLinesOptions,yPos){if(typeof curvedLinesOptions.legacyOverride!='undefined'&&curvedLinesOptions.legacyOverride!=false){var defaultOptions={fit:false,curvePointFactor:20,fitPointDist:undefined};var legacyOptions=jQuery.extend(defaultOptions,curvedLinesOptions.legacyOverride);return calculateLegacyCurvePoints(datapoints,legacyOptions,yPos);}
return calculateSplineCurvePoints(datapoints,curvedLinesOptions,yPos);}
function calculateSplineCurvePoints(datapoints,curvedLinesOptions,yPos){var points=datapoints.points;var ps=datapoints.pointsize;var splines=createHermiteSplines(datapoints,curvedLinesOptions,yPos);var result=[];var j=0;for(var i=0;i<points.length-ps;i+=ps){var curX=i;var curY=i+yPos;var xStart=points[curX];var xEnd=points[curX+ps];var xStep=(xEnd-xStart)/Number(curvedLinesOptions.nrSplinePoints);result.push(points[curX]);result.push(points[curY]);for(var x=(xStart+=xStep);x<xEnd;x+=xStep){result.push(x);result.push(splines[j](x));}
j++;}
result.push(points[points.length-ps]);result.push(points[points.length-ps+yPos]);return result;}
function createHermiteSplines(datapoints,curvedLinesOptions,yPos){var points=datapoints.points;var ps=datapoints.pointsize;var segmentLengths=[];var segmentSlopes=[];for(var i=0;i<points.length-ps;i+=ps){var curX=i;var curY=i+yPos;var dx=points[curX+ps]-points[curX];var dy=points[curY+ps]-points[curY];segmentLengths.push(dx);segmentSlopes.push(dy/dx);}
var gradients=[segmentSlopes[0]];if(curvedLinesOptions.monotonicFit){for(var i=1;i<segmentLengths.length;i++){var slope=segmentSlopes[i];var prev_slope=segmentSlopes[i-1];if(slope*prev_slope<=0){gradients.push(0);}else{var length=segmentLengths[i];var prev_length=segmentLengths[i-1];var common=length+prev_length;gradients.push(3*common/((common+length)/prev_slope+(common+prev_length)/slope));}}}else{for(var i=ps;i<points.length-ps;i+=ps){var curX=i;var curY=i+yPos;gradients.push(Number(curvedLinesOptions.tension)*(points[curY+ps]-points[curY-ps])/(points[curX+ps]-points[curX-ps]));}}
gradients.push(segmentSlopes[segmentSlopes.length-1]);var coefs1=[];var coefs2=[];for(i=0;i<segmentLengths.length;i++){var m_k=gradients[i];var m_k_plus=gradients[i+1];var slope=segmentSlopes[i];var invLength=1/segmentLengths[i];var common=m_k+m_k_plus-slope-slope;coefs1.push(common*invLength*invLength);coefs2.push((slope-common-m_k)*invLength);}
var ret=[];for(var i=0;i<segmentLengths.length;i++){var spline=function(x_k,coef1,coef2,coef3,coef4){return function(x){var diff=x-x_k;var diffSq=diff*diff;return coef1*diff*diffSq+coef2*diffSq+coef3*diff+coef4;};};ret.push(spline(points[i*ps],coefs1[i],coefs2[i],gradients[i],points[i*ps+yPos]));}
return ret;};function calculateLegacyCurvePoints(datapoints,curvedLinesOptions,yPos){var points=datapoints.points;var ps=datapoints.pointsize;var num=Number(curvedLinesOptions.curvePointFactor)*(points.length/ps);var xdata=new Array;var ydata=new Array;var curX=-1;var curY=-1;var j=0;if(curvedLinesOptions.fit){var fpDist;if(typeof curvedLinesOptions.fitPointDist=='undefined'){var minX=points[0];var maxX=points[points.length-ps];fpDist=(maxX-minX)/(500*100);}else{fpDist=Number(curvedLinesOptions.fitPointDist);}
for(var i=0;i<points.length;i+=ps){var frontX;var backX;curX=i;curY=i+yPos;frontX=points[curX]-fpDist;backX=points[curX]+fpDist;var factor=2;while(frontX==points[curX]||backX==points[curX]){frontX=points[curX]-(fpDist*factor);backX=points[curX]+(fpDist*factor);factor++;}
xdata[j]=frontX;ydata[j]=points[curY];j++;xdata[j]=points[curX];ydata[j]=points[curY];j++;xdata[j]=backX;ydata[j]=points[curY];j++;}}else{for(var i=0;i<points.length;i+=ps){curX=i;curY=i+yPos;xdata[j]=points[curX];ydata[j]=points[curY];j++;}}
var n=xdata.length;var y2=new Array();var delta=new Array();y2[0]=0;y2[n-1]=0;delta[0]=0;for(var i=1;i<n-1;++i){var d=(xdata[i+1]-xdata[i-1]);if(d==0){return[];}
var s=(xdata[i]-xdata[i-1])/d;var p=s*y2[i-1]+2;y2[i]=(s-1)/p;delta[i]=(ydata[i+1]-ydata[i])/(xdata[i+1]-xdata[i])-(ydata[i]-ydata[i-1])/(xdata[i]-xdata[i-1]);delta[i]=(6*delta[i]/(xdata[i+1]-xdata[i-1])-s*delta[i-1])/p;}
for(var j=n-2;j>=0;--j){y2[j]=y2[j]*y2[j+1]+delta[j];}
var step=(xdata[n-1]-xdata[0])/(num-1);var xnew=new Array;var ynew=new Array;var result=new Array;xnew[0]=xdata[0];ynew[0]=ydata[0];result.push(xnew[0]);result.push(ynew[0]);for(j=1;j<num;++j){xnew[j]=xnew[0]+j*step;var max=n-1;var min=0;while(max-min>1){var k=Math.round((max+min)/2);if(xdata[k]>xnew[j]){max=k;}else{min=k;}}
var h=(xdata[max]-xdata[min]);if(h==0){return[];}
var a=(xdata[max]-xnew[j])/h;var b=(xnew[j]-xdata[min])/h;ynew[j]=a*ydata[min]+b*ydata[max]+((a*a*a-a)*y2[min]+(b*b*b-b)*y2[max])*(h*h)/6;result.push(xnew[j]);result.push(ynew[j]);}
return result;}
function hasInvalidParameters(curvedLinesOptions){if(typeof curvedLinesOptions.fit!='undefined'||typeof curvedLinesOptions.curvePointFactor!='undefined'||typeof curvedLinesOptions.fitPointDist!='undefined'){throw new Error("CurvedLines detected illegal parameters. The CurvedLines API changed with version 1.0.0 please check the options object.");return true;}
return false;}}
$.plot.plugins.push({init:init,options:options,name:'curvedLines',version:'1.1.1'});})(jQuery);
/*
 * jquery.flot.tooltip
 * 
 * description: easy-to-use tooltips for Flot charts
 * version: 0.9.0
 * authors: Krzysztof Urbas @krzysu [myviews.pl],Evan Steinkerchner @Roundaround
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * build on 2016-07-26
 * released under MIT License, 2012
*/ 
!function(a){var b={tooltip:{show:!1,cssClass:"flotTip",content:"%s | X: %x | Y: %y",xDateFormat:null,yDateFormat:null,monthNames:null,dayNames:null,shifts:{x:10,y:20},defaultTheme:!0,snap:!0,lines:!1,clickTips:!1,onHover:function(a,b){},$compat:!1}};b.tooltipOpts=b.tooltip;var c=function(a){this.tipPosition={x:0,y:0},this.init(a)};c.prototype.init=function(b){function c(a){var c={};c.x=a.pageX,c.y=a.pageY,b.setTooltipPosition(c)}function d(c,d,g){f.clickmode?(a(b.getPlaceholder()).bind("plothover",e),b.hideTooltip(),f.clickmode=!1):(e(c,d,g),f.getDomElement().is(":visible")&&(a(b.getPlaceholder()).unbind("plothover",e),f.clickmode=!0))}function e(c,d,e){var g=function(a,b,c,d){return Math.sqrt((c-a)*(c-a)+(d-b)*(d-b))},h=function(a,b,c,d,e,f,h){if(!h||(h=function(a,b,c,d,e,f){if("undefined"!=typeof c)return{x:c,y:b};if("undefined"!=typeof d)return{x:a,y:d};var g,h=-1/((f-d)/(e-c));return{x:g=(e*(a*h-b+d)+c*(a*-h+b-f))/(h*(e-c)+d-f),y:h*g-h*a+b}}(a,b,c,d,e,f),h.x>=Math.min(c,e)&&h.x<=Math.max(c,e)&&h.y>=Math.min(d,f)&&h.y<=Math.max(d,f))){var i=d-f,j=e-c,k=c*f-d*e;return Math.abs(i*a+j*b+k)/Math.sqrt(i*i+j*j)}var l=g(a,b,c,d),m=g(a,b,e,f);return l>m?m:l};if(e)b.showTooltip(e,f.tooltipOptions.snap?e:d);else if(f.plotOptions.series.lines.show&&f.tooltipOptions.lines===!0){var i=f.plotOptions.grid.mouseActiveRadius,j={distance:i+1},k=d;a.each(b.getData(),function(a,c){for(var e=0,i=-1,l=1;l<c.data.length;l++)c.data[l-1][0]<=d.x&&c.data[l][0]>=d.x&&(e=l-1,i=l);if(-1===i)return void b.hideTooltip();var m={x:c.data[e][0],y:c.data[e][1]},n={x:c.data[i][0],y:c.data[i][1]},o=h(c.xaxis.p2c(d.x),c.yaxis.p2c(d.y),c.xaxis.p2c(m.x),c.yaxis.p2c(m.y),c.xaxis.p2c(n.x),c.yaxis.p2c(n.y),!1);if(o<j.distance){var p=g(m.x,m.y,d.x,d.y)<g(d.x,d.y,n.x,n.y)?e:i,q=(c.datapoints.pointsize,[d.x,m.y+(n.y-m.y)*((d.x-m.x)/(n.x-m.x))]),r={datapoint:q,dataIndex:p,series:c,seriesIndex:a};j={distance:o,item:r},f.tooltipOptions.snap&&(k={pageX:c.xaxis.p2c(q[0]),pageY:c.yaxis.p2c(q[1])})}}),j.distance<i+1?b.showTooltip(j.item,k):b.hideTooltip()}else b.hideTooltip()}var f=this,g=a.plot.plugins.length;if(this.plotPlugins=[],g)for(var h=0;g>h;h++)this.plotPlugins.push(a.plot.plugins[h].name);b.hooks.bindEvents.push(function(b,g){if(f.plotOptions=b.getOptions(),"boolean"==typeof f.plotOptions.tooltip&&(f.plotOptions.tooltipOpts.show=f.plotOptions.tooltip,f.plotOptions.tooltip=f.plotOptions.tooltipOpts,delete f.plotOptions.tooltipOpts),f.plotOptions.tooltip.show!==!1&&"undefined"!=typeof f.plotOptions.tooltip.show){f.tooltipOptions=f.plotOptions.tooltip,f.tooltipOptions.$compat?(f.wfunc="width",f.hfunc="height"):(f.wfunc="innerWidth",f.hfunc="innerHeight");f.getDomElement();a(b.getPlaceholder()).bind("plothover",e),f.tooltipOptions.clickTips&&a(b.getPlaceholder()).bind("plotclick",d),f.clickmode=!1,a(g).bind("mousemove",c)}}),b.hooks.shutdown.push(function(b,f){a(b.getPlaceholder()).unbind("plothover",e),a(b.getPlaceholder()).unbind("plotclick",d),b.removeTooltip(),a(f).unbind("mousemove",c)}),b.setTooltipPosition=function(b){var c=f.getDomElement(),d=c.outerWidth()+f.tooltipOptions.shifts.x,e=c.outerHeight()+f.tooltipOptions.shifts.y;b.x-a(window).scrollLeft()>a(window)[f.wfunc]()-d&&(b.x-=d,b.x=Math.max(b.x,0)),b.y-a(window).scrollTop()>a(window)[f.hfunc]()-e&&(b.y-=e),isNaN(b.x)?f.tipPosition.x=f.tipPosition.xPrev:(f.tipPosition.x=b.x,f.tipPosition.xPrev=b.x),isNaN(b.y)?f.tipPosition.y=f.tipPosition.yPrev:(f.tipPosition.y=b.y,f.tipPosition.yPrev=b.y)},b.showTooltip=function(a,c,d){var e=f.getDomElement(),g=f.stringFormat(f.tooltipOptions.content,a);""!==g&&(e.html(g),b.setTooltipPosition({x:f.tipPosition.x,y:f.tipPosition.y}),e.css({left:f.tipPosition.x+f.tooltipOptions.shifts.x,top:f.tipPosition.y+f.tooltipOptions.shifts.y}).show(),"function"==typeof f.tooltipOptions.onHover&&f.tooltipOptions.onHover(a,e))},b.hideTooltip=function(){f.getDomElement().hide().html("")},b.removeTooltip=function(){f.getDomElement().remove()}},c.prototype.getDomElement=function(){var b=a("<div>");return this.tooltipOptions&&this.tooltipOptions.cssClass&&(b=a("."+this.tooltipOptions.cssClass),0===b.length&&(b=a("<div />").addClass(this.tooltipOptions.cssClass),b.appendTo("body").hide().css({position:"absolute"}),this.tooltipOptions.defaultTheme&&b.css({background:"#fff","z-index":"1040",padding:"0.4em 0.6em","border-radius":"0.5em","font-size":"0.8em",border:"1px solid #111",display:"none","white-space":"nowrap"}))),b},c.prototype.stringFormat=function(a,b){var c,d,e,f,g,h=/%p\.{0,1}(\d{0,})/,i=/%s/,j=/%c/,k=/%lx/,l=/%ly/,m=/%x\.{0,1}(\d{0,})/,n=/%y\.{0,1}(\d{0,})/,o="%x",p="%y",q="%ct",r="%n";if("undefined"!=typeof b.series.threshold?(c=b.datapoint[0],d=b.datapoint[1],e=b.datapoint[2]):"undefined"!=typeof b.series.curvedLines?(c=b.datapoint[0],d=b.datapoint[1]):"undefined"!=typeof b.series.lines&&b.series.lines.steps?(c=b.series.datapoints.points[2*b.dataIndex],d=b.series.datapoints.points[2*b.dataIndex+1],e=""):(c=b.series.data[b.dataIndex][0],d=b.series.data[b.dataIndex][1],e=b.series.data[b.dataIndex][2]),null===b.series.label&&b.series.originSeries&&(b.series.label=b.series.originSeries.label),"function"==typeof a&&(a=a(b.series.label,c,d,b)),"boolean"==typeof a&&!a)return"";if(e&&(a=a.replace(q,e)),"undefined"!=typeof b.series.percent?f=b.series.percent:"undefined"!=typeof b.series.percents&&(f=b.series.percents[b.dataIndex]),"number"==typeof f&&(a=this.adjustValPrecision(h,a,f)),b.series.hasOwnProperty("pie")&&"undefined"!=typeof b.series.data[0][1]&&(g=b.series.data[0][1]),"number"==typeof g&&(a=a.replace(r,g)),a="undefined"!=typeof b.series.label?a.replace(i,b.series.label):a.replace(i,""),a="undefined"!=typeof b.series.color?a.replace(j,b.series.color):a.replace(j,""),a=this.hasAxisLabel("xaxis",b)?a.replace(k,b.series.xaxis.options.axisLabel):a.replace(k,""),a=this.hasAxisLabel("yaxis",b)?a.replace(l,b.series.yaxis.options.axisLabel):a.replace(l,""),this.isTimeMode("xaxis",b)&&this.isXDateFormat(b)&&(a=a.replace(m,this.timestampToDate(c,this.tooltipOptions.xDateFormat,b.series.xaxis.options))),this.isTimeMode("yaxis",b)&&this.isYDateFormat(b)&&(a=a.replace(n,this.timestampToDate(d,this.tooltipOptions.yDateFormat,b.series.yaxis.options))),"number"==typeof c&&(a=this.adjustValPrecision(m,a,c)),"number"==typeof d&&(a=this.adjustValPrecision(n,a,d)),"undefined"!=typeof b.series.xaxis.ticks){var s;s=this.hasRotatedXAxisTicks(b)?"rotatedTicks":"ticks";var t=b.dataIndex+b.seriesIndex;for(var u in b.series.xaxis[s])if(b.series.xaxis[s].hasOwnProperty(t)&&!this.isTimeMode("xaxis",b)){var v=this.isCategoriesMode("xaxis",b)?b.series.xaxis[s][t].label:b.series.xaxis[s][t].v;v===c&&(a=a.replace(m,b.series.xaxis[s][t].label.replace(/\$/g,"$$$$")))}}if("undefined"!=typeof b.series.yaxis.ticks)for(var w in b.series.yaxis.ticks)if(b.series.yaxis.ticks.hasOwnProperty(w)){var x=this.isCategoriesMode("yaxis",b)?b.series.yaxis.ticks[w].label:b.series.yaxis.ticks[w].v;x===d&&(a=a.replace(n,b.series.yaxis.ticks[w].label.replace(/\$/g,"$$$$")))}return"undefined"!=typeof b.series.xaxis.tickFormatter&&(a=a.replace(o,b.series.xaxis.tickFormatter(c,b.series.xaxis).replace(/\$/g,"$$"))),"undefined"!=typeof b.series.yaxis.tickFormatter&&(a=a.replace(p,b.series.yaxis.tickFormatter(d,b.series.yaxis).replace(/\$/g,"$$"))),a},c.prototype.isTimeMode=function(a,b){return"undefined"!=typeof b.series[a].options.mode&&"time"===b.series[a].options.mode},c.prototype.isXDateFormat=function(a){return"undefined"!=typeof this.tooltipOptions.xDateFormat&&null!==this.tooltipOptions.xDateFormat},c.prototype.isYDateFormat=function(a){return"undefined"!=typeof this.tooltipOptions.yDateFormat&&null!==this.tooltipOptions.yDateFormat},c.prototype.isCategoriesMode=function(a,b){return"undefined"!=typeof b.series[a].options.mode&&"categories"===b.series[a].options.mode},c.prototype.timestampToDate=function(b,c,d){var e=a.plot.dateGenerator(b,d);return a.plot.formatDate(e,c,this.tooltipOptions.monthNames,this.tooltipOptions.dayNames)},c.prototype.adjustValPrecision=function(a,b,c){var d,e=b.match(a);return null!==e&&""!==RegExp.$1&&(d=RegExp.$1,c=c.toFixed(d),b=b.replace(a,c)),b},c.prototype.hasAxisLabel=function(b,c){return-1!==a.inArray("axisLabels",this.plotPlugins)&&"undefined"!=typeof c.series[b].options.axisLabel&&c.series[b].options.axisLabel.length>0},c.prototype.hasRotatedXAxisTicks=function(b){return-1!==a.inArray("tickRotor",this.plotPlugins)&&"undefined"!=typeof b.series.xaxis.rotatedTicks};var d=function(a){new c(a)};a.plot.plugins.push({init:d,options:b,name:"tooltip",version:"0.8.5"})}(jQuery);
(function(root,factory){if(typeof define==='function'&&define.amd){define('Chartist',[],function(){return(root['Chartist']=factory());});}else if(typeof module==='object'&&module.exports){module.exports=factory();}else{root['Chartist']=factory();}}(this,function(){var Chartist={version:'0.11.0'};(function(window,document,Chartist){'use strict';Chartist.namespaces={svg:'http://www.w3.org/2000/svg',xmlns:'http://www.w3.org/2000/xmlns/',xhtml:'http://www.w3.org/1999/xhtml',xlink:'http://www.w3.org/1999/xlink',ct:'http://gionkunz.github.com/chartist-js/ct'};Chartist.noop=function(n){return n;};Chartist.alphaNumerate=function(n){return String.fromCharCode(97+n%26);};Chartist.extend=function(target){var i,source,sourceProp;target=target||{};for(i=1;i<arguments.length;i++){source=arguments[i];for(var prop in source){sourceProp=source[prop];if(typeof sourceProp==='object'&&sourceProp!==null&&!(sourceProp instanceof Array)){target[prop]=Chartist.extend(target[prop],sourceProp);}else{target[prop]=sourceProp;}}}
return target;};Chartist.replaceAll=function(str,subStr,newSubStr){return str.replace(new RegExp(subStr,'g'),newSubStr);};Chartist.ensureUnit=function(value,unit){if(typeof value==='number'){value=value+unit;}
return value;};Chartist.quantity=function(input){if(typeof input==='string'){var match=(/^(\d+)\s*(.*)$/g).exec(input);return{value:+match[1],unit:match[2]||undefined};}
return{value:input};};Chartist.querySelector=function(query){return query instanceof Node?query:document.querySelector(query);};Chartist.times=function(length){return Array.apply(null,new Array(length));};Chartist.sum=function(previous,current){return previous+(current?current:0);};Chartist.mapMultiply=function(factor){return function(num){return num*factor;};};Chartist.mapAdd=function(addend){return function(num){return num+addend;};};Chartist.serialMap=function(arr,cb){var result=[],length=Math.max.apply(null,arr.map(function(e){return e.length;}));Chartist.times(length).forEach(function(e,index){var args=arr.map(function(e){return e[index];});result[index]=cb.apply(null,args);});return result;};Chartist.roundWithPrecision=function(value,digits){var precision=Math.pow(10,digits||Chartist.precision);return Math.round(value*precision)/precision;};Chartist.precision=8;Chartist.escapingMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#039;'};Chartist.serialize=function(data){if(data===null||data===undefined){return data;}else if(typeof data==='number'){data=''+data;}else if(typeof data==='object'){data=JSON.stringify({data:data});}
return Object.keys(Chartist.escapingMap).reduce(function(result,key){return Chartist.replaceAll(result,key,Chartist.escapingMap[key]);},data);};Chartist.deserialize=function(data){if(typeof data!=='string'){return data;}
data=Object.keys(Chartist.escapingMap).reduce(function(result,key){return Chartist.replaceAll(result,Chartist.escapingMap[key],key);},data);try{data=JSON.parse(data);data=data.data!==undefined?data.data:data;}catch(e){}
return data;};Chartist.createSvg=function(container,width,height,className){var svg;width=width||'100%';height=height||'100%';Array.prototype.slice.call(container.querySelectorAll('svg')).filter(function filterChartistSvgObjects(svg){return svg.getAttributeNS(Chartist.namespaces.xmlns,'ct');}).forEach(function removePreviousElement(svg){container.removeChild(svg);});svg=new Chartist.Svg('svg').attr({width:width,height:height}).addClass(className);svg._node.style.width=width;svg._node.style.height=height;container.appendChild(svg._node);return svg;};Chartist.normalizeData=function(data,reverse,multi){var labelCount;var output={raw:data,normalized:{}};output.normalized.series=Chartist.getDataArray({series:data.series||[]},reverse,multi);if(output.normalized.series.every(function(value){return value instanceof Array;})){labelCount=Math.max.apply(null,output.normalized.series.map(function(series){return series.length;}));}else{labelCount=output.normalized.series.length;}
output.normalized.labels=(data.labels||[]).slice();Array.prototype.push.apply(output.normalized.labels,Chartist.times(Math.max(0,labelCount-output.normalized.labels.length)).map(function(){return '';}));if(reverse){Chartist.reverseData(output.normalized);}
return output;};Chartist.safeHasProperty=function(object,property){return object!==null&&typeof object==='object'&&object.hasOwnProperty(property);};Chartist.isDataHoleValue=function(value){return value===null||value===undefined||(typeof value==='number'&&isNaN(value));};Chartist.reverseData=function(data){data.labels.reverse();data.series.reverse();for(var i=0;i<data.series.length;i++){if(typeof(data.series[i])==='object'&&data.series[i].data!==undefined){data.series[i].data.reverse();}else if(data.series[i]instanceof Array){data.series[i].reverse();}}};Chartist.getDataArray=function(data,reverse,multi){function recursiveConvert(value){if(Chartist.safeHasProperty(value,'value')){return recursiveConvert(value.value);}else if(Chartist.safeHasProperty(value,'data')){return recursiveConvert(value.data);}else if(value instanceof Array){return value.map(recursiveConvert);}else if(Chartist.isDataHoleValue(value)){return undefined;}else{if(multi){var multiValue={};if(typeof multi==='string'){multiValue[multi]=Chartist.getNumberOrUndefined(value);}else{multiValue.y=Chartist.getNumberOrUndefined(value);}
multiValue.x=value.hasOwnProperty('x')?Chartist.getNumberOrUndefined(value.x):multiValue.x;multiValue.y=value.hasOwnProperty('y')?Chartist.getNumberOrUndefined(value.y):multiValue.y;return multiValue;}else{return Chartist.getNumberOrUndefined(value);}}}
return data.series.map(recursiveConvert);};Chartist.normalizePadding=function(padding,fallback){fallback=fallback||0;return typeof padding==='number'?{top:padding,right:padding,bottom:padding,left:padding}:{top:typeof padding.top==='number'?padding.top:fallback,right:typeof padding.right==='number'?padding.right:fallback,bottom:typeof padding.bottom==='number'?padding.bottom:fallback,left:typeof padding.left==='number'?padding.left:fallback};};Chartist.getMetaData=function(series,index){var value=series.data?series.data[index]:series[index];return value?value.meta:undefined;};Chartist.orderOfMagnitude=function(value){return Math.floor(Math.log(Math.abs(value))/Math.LN10);};Chartist.projectLength=function(axisLength,length,bounds){return length/bounds.range*axisLength;};Chartist.getAvailableHeight=function(svg,options){return Math.max((Chartist.quantity(options.height).value||svg.height())-(options.chartPadding.top+options.chartPadding.bottom)-options.axisX.offset,0);};Chartist.getHighLow=function(data,options,dimension){options=Chartist.extend({},options,dimension?options['axis'+dimension.toUpperCase()]:{});var highLow={high:options.high===undefined?-Number.MAX_VALUE:+options.high,low:options.low===undefined?Number.MAX_VALUE:+options.low};var findHigh=options.high===undefined;var findLow=options.low===undefined;function recursiveHighLow(data){if(data===undefined){return undefined;}else if(data instanceof Array){for(var i=0;i<data.length;i++){recursiveHighLow(data[i]);}}else{var value=dimension?+data[dimension]:+data;if(findHigh&&value>highLow.high){highLow.high=value;}
if(findLow&&value<highLow.low){highLow.low=value;}}}
if(findHigh||findLow){recursiveHighLow(data);}
if(options.referenceValue||options.referenceValue===0){highLow.high=Math.max(options.referenceValue,highLow.high);highLow.low=Math.min(options.referenceValue,highLow.low);}
if(highLow.high<=highLow.low){if(highLow.low===0){highLow.high=1;}else if(highLow.low<0){highLow.high=0;}else if(highLow.high>0){highLow.low=0;}else{highLow.high=1;highLow.low=0;}}
return highLow;};Chartist.isNumeric=function(value){return value===null?false:isFinite(value);};Chartist.isFalseyButZero=function(value){return!value&&value!==0;};Chartist.getNumberOrUndefined=function(value){return Chartist.isNumeric(value)?+value:undefined;};Chartist.isMultiValue=function(value){return typeof value==='object'&&('x'in value||'y'in value);};Chartist.getMultiValue=function(value,dimension){if(Chartist.isMultiValue(value)){return Chartist.getNumberOrUndefined(value[dimension||'y']);}else{return Chartist.getNumberOrUndefined(value);}};Chartist.rho=function(num){if(num===1){return num;}
function gcd(p,q){if(p%q===0){return q;}else{return gcd(q,p%q);}}
function f(x){return x*x+1;}
var x1=2,x2=2,divisor;if(num%2===0){return 2;}
do{x1=f(x1)%num;x2=f(f(x2))%num;divisor=gcd(Math.abs(x1-x2),num);}while(divisor===1);return divisor;};Chartist.getBounds=function(axisLength,highLow,scaleMinSpace,onlyInteger){var i,optimizationCounter=0,newMin,newMax,bounds={high:highLow.high,low:highLow.low};bounds.valueRange=bounds.high-bounds.low;bounds.oom=Chartist.orderOfMagnitude(bounds.valueRange);bounds.step=Math.pow(10,bounds.oom);bounds.min=Math.floor(bounds.low/bounds.step)*bounds.step;bounds.max=Math.ceil(bounds.high/bounds.step)*bounds.step;bounds.range=bounds.max-bounds.min;bounds.numberOfSteps=Math.round(bounds.range/bounds.step);var length=Chartist.projectLength(axisLength,bounds.step,bounds);var scaleUp=length<scaleMinSpace;var smallestFactor=onlyInteger?Chartist.rho(bounds.range):0;if(onlyInteger&&Chartist.projectLength(axisLength,1,bounds)>=scaleMinSpace){bounds.step=1;}else if(onlyInteger&&smallestFactor<bounds.step&&Chartist.projectLength(axisLength,smallestFactor,bounds)>=scaleMinSpace){bounds.step=smallestFactor;}else{while(true){if(scaleUp&&Chartist.projectLength(axisLength,bounds.step,bounds)<=scaleMinSpace){bounds.step*=2;}else if(!scaleUp&&Chartist.projectLength(axisLength,bounds.step/2,bounds)>=scaleMinSpace){bounds.step/=2;if(onlyInteger&&bounds.step%1!==0){bounds.step*=2;break;}}else{break;}
if(optimizationCounter++>1000){throw new Error('Exceeded maximum number of iterations while optimizing scale step!');}}}
var EPSILON=2.221E-16;bounds.step=Math.max(bounds.step,EPSILON);function safeIncrement(value,increment){if(value===(value+=increment)){value*=(1+(increment>0?EPSILON:-EPSILON));}
return value;}
newMin=bounds.min;newMax=bounds.max;while(newMin+bounds.step<=bounds.low){newMin=safeIncrement(newMin,bounds.step);}
while(newMax-bounds.step>=bounds.high){newMax=safeIncrement(newMax,-bounds.step);}
bounds.min=newMin;bounds.max=newMax;bounds.range=bounds.max-bounds.min;var values=[];for(i=bounds.min;i<=bounds.max;i=safeIncrement(i,bounds.step)){var value=Chartist.roundWithPrecision(i);if(value!==values[values.length-1]){values.push(value);}}
bounds.values=values;return bounds;};Chartist.polarToCartesian=function(centerX,centerY,radius,angleInDegrees){var angleInRadians=(angleInDegrees-90)*Math.PI/180.0;return{x:centerX+(radius*Math.cos(angleInRadians)),y:centerY+(radius*Math.sin(angleInRadians))};};Chartist.createChartRect=function(svg,options,fallbackPadding){var hasAxis=!!(options.axisX||options.axisY);var yAxisOffset=hasAxis?options.axisY.offset:0;var xAxisOffset=hasAxis?options.axisX.offset:0;var width=svg.width()||Chartist.quantity(options.width).value||0;var height=svg.height()||Chartist.quantity(options.height).value||0;var normalizedPadding=Chartist.normalizePadding(options.chartPadding,fallbackPadding);width=Math.max(width,yAxisOffset+normalizedPadding.left+normalizedPadding.right);height=Math.max(height,xAxisOffset+normalizedPadding.top+normalizedPadding.bottom);var chartRect={padding:normalizedPadding,width:function(){return this.x2-this.x1;},height:function(){return this.y1-this.y2;}};if(hasAxis){if(options.axisX.position==='start'){chartRect.y2=normalizedPadding.top+xAxisOffset;chartRect.y1=Math.max(height-normalizedPadding.bottom,chartRect.y2+1);}else{chartRect.y2=normalizedPadding.top;chartRect.y1=Math.max(height-normalizedPadding.bottom-xAxisOffset,chartRect.y2+1);}
if(options.axisY.position==='start'){chartRect.x1=normalizedPadding.left+yAxisOffset;chartRect.x2=Math.max(width-normalizedPadding.right,chartRect.x1+1);}else{chartRect.x1=normalizedPadding.left;chartRect.x2=Math.max(width-normalizedPadding.right-yAxisOffset,chartRect.x1+1);}}else{chartRect.x1=normalizedPadding.left;chartRect.x2=Math.max(width-normalizedPadding.right,chartRect.x1+1);chartRect.y2=normalizedPadding.top;chartRect.y1=Math.max(height-normalizedPadding.bottom,chartRect.y2+1);}
return chartRect;};Chartist.createGrid=function(position,index,axis,offset,length,group,classes,eventEmitter){var positionalData={};positionalData[axis.units.pos+'1']=position;positionalData[axis.units.pos+'2']=position;positionalData[axis.counterUnits.pos+'1']=offset;positionalData[axis.counterUnits.pos+'2']=offset+length;var gridElement=group.elem('line',positionalData,classes.join(' '));eventEmitter.emit('draw',Chartist.extend({type:'grid',axis:axis,index:index,group:group,element:gridElement},positionalData));};Chartist.createGridBackground=function(gridGroup,chartRect,className,eventEmitter){var gridBackground=gridGroup.elem('rect',{x:chartRect.x1,y:chartRect.y2,width:chartRect.width(),height:chartRect.height(),},className,true);eventEmitter.emit('draw',{type:'gridBackground',group:gridGroup,element:gridBackground});};Chartist.createLabel=function(position,length,index,labels,axis,axisOffset,labelOffset,group,classes,useForeignObject,eventEmitter){var labelElement;var positionalData={};positionalData[axis.units.pos]=position+labelOffset[axis.units.pos];positionalData[axis.counterUnits.pos]=labelOffset[axis.counterUnits.pos];positionalData[axis.units.len]=length;positionalData[axis.counterUnits.len]=Math.max(0,axisOffset-10);if(useForeignObject){var content=document.createElement('span');content.className=classes.join(' ');content.setAttribute('xmlns',Chartist.namespaces.xhtml);content.innerText=labels[index];content.style[axis.units.len]=Math.round(positionalData[axis.units.len])+'px';content.style[axis.counterUnits.len]=Math.round(positionalData[axis.counterUnits.len])+'px';labelElement=group.foreignObject(content,Chartist.extend({style:'overflow: visible;'},positionalData));}else{labelElement=group.elem('text',positionalData,classes.join(' ')).text(labels[index]);}
eventEmitter.emit('draw',Chartist.extend({type:'label',axis:axis,index:index,group:group,element:labelElement,text:labels[index]},positionalData));};Chartist.getSeriesOption=function(series,options,key){if(series.name&&options.series&&options.series[series.name]){var seriesOptions=options.series[series.name];return seriesOptions.hasOwnProperty(key)?seriesOptions[key]:options[key];}else{return options[key];}};Chartist.optionsProvider=function(options,responsiveOptions,eventEmitter){var baseOptions=Chartist.extend({},options),currentOptions,mediaQueryListeners=[],i;function updateCurrentOptions(mediaEvent){var previousOptions=currentOptions;currentOptions=Chartist.extend({},baseOptions);if(responsiveOptions){for(i=0;i<responsiveOptions.length;i++){var mql=window.matchMedia(responsiveOptions[i][0]);if(mql.matches){currentOptions=Chartist.extend(currentOptions,responsiveOptions[i][1]);}}}
if(eventEmitter&&mediaEvent){eventEmitter.emit('optionsChanged',{previousOptions:previousOptions,currentOptions:currentOptions});}}
function removeMediaQueryListeners(){mediaQueryListeners.forEach(function(mql){mql.removeListener(updateCurrentOptions);});}
if(!window.matchMedia){throw 'window.matchMedia not found! Make sure you\'re using a polyfill.';}else if(responsiveOptions){for(i=0;i<responsiveOptions.length;i++){var mql=window.matchMedia(responsiveOptions[i][0]);mql.addListener(updateCurrentOptions);mediaQueryListeners.push(mql);}}
updateCurrentOptions();return{removeMediaQueryListeners:removeMediaQueryListeners,getCurrentOptions:function getCurrentOptions(){return Chartist.extend({},currentOptions);}};};Chartist.splitIntoSegments=function(pathCoordinates,valueData,options){var defaultOptions={increasingX:false,fillHoles:false};options=Chartist.extend({},defaultOptions,options);var segments=[];var hole=true;for(var i=0;i<pathCoordinates.length;i+=2){if(Chartist.getMultiValue(valueData[i/2].value)===undefined){if(!options.fillHoles){hole=true;}}else{if(options.increasingX&&i>=2&&pathCoordinates[i]<=pathCoordinates[i-2]){hole=true;}
if(hole){segments.push({pathCoordinates:[],valueData:[]});hole=false;}
segments[segments.length-1].pathCoordinates.push(pathCoordinates[i],pathCoordinates[i+1]);segments[segments.length-1].valueData.push(valueData[i/2]);}}
return segments;};}(window,document,Chartist));;(function(window,document,Chartist){'use strict';Chartist.Interpolation={};Chartist.Interpolation.none=function(options){var defaultOptions={fillHoles:false};options=Chartist.extend({},defaultOptions,options);return function none(pathCoordinates,valueData){var path=new Chartist.Svg.Path();var hole=true;for(var i=0;i<pathCoordinates.length;i+=2){var currX=pathCoordinates[i];var currY=pathCoordinates[i+1];var currData=valueData[i/2];if(Chartist.getMultiValue(currData.value)!==undefined){if(hole){path.move(currX,currY,false,currData);}else{path.line(currX,currY,false,currData);}
hole=false;}else if(!options.fillHoles){hole=true;}}
return path;};};Chartist.Interpolation.simple=function(options){var defaultOptions={divisor:2,fillHoles:false};options=Chartist.extend({},defaultOptions,options);var d=1/Math.max(1,options.divisor);return function simple(pathCoordinates,valueData){var path=new Chartist.Svg.Path();var prevX,prevY,prevData;for(var i=0;i<pathCoordinates.length;i+=2){var currX=pathCoordinates[i];var currY=pathCoordinates[i+1];var length=(currX-prevX)*d;var currData=valueData[i/2];if(currData.value!==undefined){if(prevData===undefined){path.move(currX,currY,false,currData);}else{path.curve(prevX+length,prevY,currX-length,currY,currX,currY,false,currData);}
prevX=currX;prevY=currY;prevData=currData;}else if(!options.fillHoles){prevX=currX=prevData=undefined;}}
return path;};};Chartist.Interpolation.cardinal=function(options){var defaultOptions={tension:1,fillHoles:false};options=Chartist.extend({},defaultOptions,options);var t=Math.min(1,Math.max(0,options.tension)),c=1-t;return function cardinal(pathCoordinates,valueData){var segments=Chartist.splitIntoSegments(pathCoordinates,valueData,{fillHoles:options.fillHoles});if(!segments.length){return Chartist.Interpolation.none()([]);}else if(segments.length>1){var paths=[];segments.forEach(function(segment){paths.push(cardinal(segment.pathCoordinates,segment.valueData));});return Chartist.Svg.Path.join(paths);}else{pathCoordinates=segments[0].pathCoordinates;valueData=segments[0].valueData;if(pathCoordinates.length<=4){return Chartist.Interpolation.none()(pathCoordinates,valueData);}
var path=new Chartist.Svg.Path().move(pathCoordinates[0],pathCoordinates[1],false,valueData[0]),z;for(var i=0,iLen=pathCoordinates.length;iLen-2*!z>i;i+=2){var p=[{x:+pathCoordinates[i-2],y:+pathCoordinates[i-1]},{x:+pathCoordinates[i],y:+pathCoordinates[i+1]},{x:+pathCoordinates[i+2],y:+pathCoordinates[i+3]},{x:+pathCoordinates[i+4],y:+pathCoordinates[i+5]}];if(z){if(!i){p[0]={x:+pathCoordinates[iLen-2],y:+pathCoordinates[iLen-1]};}else if(iLen-4===i){p[3]={x:+pathCoordinates[0],y:+pathCoordinates[1]};}else if(iLen-2===i){p[2]={x:+pathCoordinates[0],y:+pathCoordinates[1]};p[3]={x:+pathCoordinates[2],y:+pathCoordinates[3]};}}else{if(iLen-4===i){p[3]=p[2];}else if(!i){p[0]={x:+pathCoordinates[i],y:+pathCoordinates[i+1]};}}
path.curve((t*(-p[0].x+6*p[1].x+p[2].x)/6)+(c*p[2].x),(t*(-p[0].y+6*p[1].y+p[2].y)/6)+(c*p[2].y),(t*(p[1].x+6*p[2].x-p[3].x)/6)+(c*p[2].x),(t*(p[1].y+6*p[2].y-p[3].y)/6)+(c*p[2].y),p[2].x,p[2].y,false,valueData[(i+2)/2]);}
return path;}};};Chartist.Interpolation.monotoneCubic=function(options){var defaultOptions={fillHoles:false};options=Chartist.extend({},defaultOptions,options);return function monotoneCubic(pathCoordinates,valueData){var segments=Chartist.splitIntoSegments(pathCoordinates,valueData,{fillHoles:options.fillHoles,increasingX:true});if(!segments.length){return Chartist.Interpolation.none()([]);}else if(segments.length>1){var paths=[];segments.forEach(function(segment){paths.push(monotoneCubic(segment.pathCoordinates,segment.valueData));});return Chartist.Svg.Path.join(paths);}else{pathCoordinates=segments[0].pathCoordinates;valueData=segments[0].valueData;if(pathCoordinates.length<=4){return Chartist.Interpolation.none()(pathCoordinates,valueData);}
var xs=[],ys=[],i,n=pathCoordinates.length/2,ms=[],ds=[],dys=[],dxs=[],path;for(i=0;i<n;i++){xs[i]=pathCoordinates[i*2];ys[i]=pathCoordinates[i*2+1];}
for(i=0;i<n-1;i++){dys[i]=ys[i+1]-ys[i];dxs[i]=xs[i+1]-xs[i];ds[i]=dys[i]/dxs[i];}
ms[0]=ds[0];ms[n-1]=ds[n-2];for(i=1;i<n-1;i++){if(ds[i]===0||ds[i-1]===0||(ds[i-1]>0)!==(ds[i]>0)){ms[i]=0;}else{ms[i]=3*(dxs[i-1]+dxs[i])/((2*dxs[i]+dxs[i-1])/ds[i-1]+
(dxs[i]+2*dxs[i-1])/ds[i]);if(!isFinite(ms[i])){ms[i]=0;}}}
path=new Chartist.Svg.Path().move(xs[0],ys[0],false,valueData[0]);for(i=0;i<n-1;i++){path.curve(xs[i]+dxs[i]/3,ys[i]+ms[i]*dxs[i]/3,xs[i+1]-dxs[i]/3,ys[i+1]-ms[i+1]*dxs[i]/3,xs[i+1],ys[i+1],false,valueData[i+1]);}
return path;}};};Chartist.Interpolation.step=function(options){var defaultOptions={postpone:true,fillHoles:false};options=Chartist.extend({},defaultOptions,options);return function step(pathCoordinates,valueData){var path=new Chartist.Svg.Path();var prevX,prevY,prevData;for(var i=0;i<pathCoordinates.length;i+=2){var currX=pathCoordinates[i];var currY=pathCoordinates[i+1];var currData=valueData[i/2];if(currData.value!==undefined){if(prevData===undefined){path.move(currX,currY,false,currData);}else{if(options.postpone){path.line(currX,prevY,false,prevData);}else{path.line(prevX,currY,false,currData);}
path.line(currX,currY,false,currData);}
prevX=currX;prevY=currY;prevData=currData;}else if(!options.fillHoles){prevX=prevY=prevData=undefined;}}
return path;};};}(window,document,Chartist));;(function(window,document,Chartist){'use strict';Chartist.EventEmitter=function(){var handlers=[];function addEventHandler(event,handler){handlers[event]=handlers[event]||[];handlers[event].push(handler);}
function removeEventHandler(event,handler){if(handlers[event]){if(handler){handlers[event].splice(handlers[event].indexOf(handler),1);if(handlers[event].length===0){delete handlers[event];}}else{delete handlers[event];}}}
function emit(event,data){if(handlers[event]){handlers[event].forEach(function(handler){handler(data);});}
if(handlers['*']){handlers['*'].forEach(function(starHandler){starHandler(event,data);});}}
return{addEventHandler:addEventHandler,removeEventHandler:removeEventHandler,emit:emit};};}(window,document,Chartist));;(function(window,document,Chartist){'use strict';function listToArray(list){var arr=[];if(list.length){for(var i=0;i<list.length;i++){arr.push(list[i]);}}
return arr;}
function extend(properties,superProtoOverride){var superProto=superProtoOverride||this.prototype||Chartist.Class;var proto=Object.create(superProto);Chartist.Class.cloneDefinitions(proto,properties);var constr=function(){var fn=proto.constructor||function(){},instance;instance=this===Chartist?Object.create(proto):this;fn.apply(instance,Array.prototype.slice.call(arguments,0));return instance;};constr.prototype=proto;constr.super=superProto;constr.extend=this.extend;return constr;}
function cloneDefinitions(){var args=listToArray(arguments);var target=args[0];args.splice(1,args.length-1).forEach(function(source){Object.getOwnPropertyNames(source).forEach(function(propName){delete target[propName];Object.defineProperty(target,propName,Object.getOwnPropertyDescriptor(source,propName));});});return target;}
Chartist.Class={extend:extend,cloneDefinitions:cloneDefinitions};}(window,document,Chartist));;(function(window,document,Chartist){'use strict';function update(data,options,override){if(data){this.data=data||{};this.data.labels=this.data.labels||[];this.data.series=this.data.series||[];this.eventEmitter.emit('data',{type:'update',data:this.data});}
if(options){this.options=Chartist.extend({},override?this.options:this.defaultOptions,options);if(!this.initializeTimeoutId){this.optionsProvider.removeMediaQueryListeners();this.optionsProvider=Chartist.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter);}}
if(!this.initializeTimeoutId){this.createChart(this.optionsProvider.getCurrentOptions());}
return this;}
function detach(){if(!this.initializeTimeoutId){window.removeEventListener('resize',this.resizeListener);this.optionsProvider.removeMediaQueryListeners();}else{window.clearTimeout(this.initializeTimeoutId);}
return this;}
function on(event,handler){this.eventEmitter.addEventHandler(event,handler);return this;}
function off(event,handler){this.eventEmitter.removeEventHandler(event,handler);return this;}
function initialize(){window.addEventListener('resize',this.resizeListener);this.optionsProvider=Chartist.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter);this.eventEmitter.addEventHandler('optionsChanged',function(){this.update();}.bind(this));if(this.options.plugins){this.options.plugins.forEach(function(plugin){if(plugin instanceof Array){plugin[0](this,plugin[1]);}else{plugin(this);}}.bind(this));}
this.eventEmitter.emit('data',{type:'initial',data:this.data});this.createChart(this.optionsProvider.getCurrentOptions());this.initializeTimeoutId=undefined;}
function Base(query,data,defaultOptions,options,responsiveOptions){this.container=Chartist.querySelector(query);this.data=data||{};this.data.labels=this.data.labels||[];this.data.series=this.data.series||[];this.defaultOptions=defaultOptions;this.options=options;this.responsiveOptions=responsiveOptions;this.eventEmitter=Chartist.EventEmitter();this.supportsForeignObject=Chartist.Svg.isSupported('Extensibility');this.supportsAnimations=Chartist.Svg.isSupported('AnimationEventsAttribute');this.resizeListener=function resizeListener(){this.update();}.bind(this);if(this.container){if(this.container.__chartist__){this.container.__chartist__.detach();}
this.container.__chartist__=this;}
this.initializeTimeoutId=setTimeout(initialize.bind(this),0);}
Chartist.Base=Chartist.Class.extend({constructor:Base,optionsProvider:undefined,container:undefined,svg:undefined,eventEmitter:undefined,createChart:function(){throw new Error('Base chart type can\'t be instantiated!');},update:update,detach:detach,on:on,off:off,version:Chartist.version,supportsForeignObject:false});}(window,document,Chartist));;(function(window,document,Chartist){'use strict';function Svg(name,attributes,className,parent,insertFirst){if(name instanceof Element){this._node=name;}else{this._node=document.createElementNS(Chartist.namespaces.svg,name);if(name==='svg'){this.attr({'xmlns:ct':Chartist.namespaces.ct});}}
if(attributes){this.attr(attributes);}
if(className){this.addClass(className);}
if(parent){if(insertFirst&&parent._node.firstChild){parent._node.insertBefore(this._node,parent._node.firstChild);}else{parent._node.appendChild(this._node);}}}
function attr(attributes,ns){if(typeof attributes==='string'){if(ns){return this._node.getAttributeNS(ns,attributes);}else{return this._node.getAttribute(attributes);}}
Object.keys(attributes).forEach(function(key){if(attributes[key]===undefined){return;}
if(key.indexOf(':')!==-1){var namespacedAttribute=key.split(':');this._node.setAttributeNS(Chartist.namespaces[namespacedAttribute[0]],key,attributes[key]);}else{this._node.setAttribute(key,attributes[key]);}}.bind(this));return this;}
function elem(name,attributes,className,insertFirst){return new Chartist.Svg(name,attributes,className,this,insertFirst);}
function parent(){return this._node.parentNode instanceof SVGElement?new Chartist.Svg(this._node.parentNode):null;}
function root(){var node=this._node;while(node.nodeName!=='svg'){node=node.parentNode;}
return new Chartist.Svg(node);}
function querySelector(selector){var foundNode=this._node.querySelector(selector);return foundNode?new Chartist.Svg(foundNode):null;}
function querySelectorAll(selector){var foundNodes=this._node.querySelectorAll(selector);return foundNodes.length?new Chartist.Svg.List(foundNodes):null;}
function getNode(){return this._node;}
function foreignObject(content,attributes,className,insertFirst){if(typeof content==='string'){var container=document.createElement('div');container.innerHTML=content;content=container.firstChild;}
content.setAttribute('xmlns',Chartist.namespaces.xmlns);var fnObj=this.elem('foreignObject',attributes,className,insertFirst);fnObj._node.appendChild(content);return fnObj;}
function text(t){this._node.appendChild(document.createTextNode(t));return this;}
function empty(){while(this._node.firstChild){this._node.removeChild(this._node.firstChild);}
return this;}
function remove(){this._node.parentNode.removeChild(this._node);return this.parent();}
function replace(newElement){this._node.parentNode.replaceChild(newElement._node,this._node);return newElement;}
function append(element,insertFirst){if(insertFirst&&this._node.firstChild){this._node.insertBefore(element._node,this._node.firstChild);}else{this._node.appendChild(element._node);}
return this;}
function classes(){return this._node.getAttribute('class')?this._node.getAttribute('class').trim().split(/\s+/):[];}
function addClass(names){this._node.setAttribute('class',this.classes(this._node).concat(names.trim().split(/\s+/)).filter(function(elem,pos,self){return self.indexOf(elem)===pos;}).join(' '));return this;}
function removeClass(names){var removedClasses=names.trim().split(/\s+/);this._node.setAttribute('class',this.classes(this._node).filter(function(name){return removedClasses.indexOf(name)===-1;}).join(' '));return this;}
function removeAllClasses(){this._node.setAttribute('class','');return this;}
function height(){return this._node.getBoundingClientRect().height;}
function width(){return this._node.getBoundingClientRect().width;}
function animate(animations,guided,eventEmitter){if(guided===undefined){guided=true;}
Object.keys(animations).forEach(function createAnimateForAttributes(attribute){function createAnimate(animationDefinition,guided){var attributeProperties={},animate,timeout,easing;if(animationDefinition.easing){easing=animationDefinition.easing instanceof Array?animationDefinition.easing:Chartist.Svg.Easing[animationDefinition.easing];delete animationDefinition.easing;}
animationDefinition.begin=Chartist.ensureUnit(animationDefinition.begin,'ms');animationDefinition.dur=Chartist.ensureUnit(animationDefinition.dur,'ms');if(easing){animationDefinition.calcMode='spline';animationDefinition.keySplines=easing.join(' ');animationDefinition.keyTimes='0;1';}
if(guided){animationDefinition.fill='freeze';attributeProperties[attribute]=animationDefinition.from;this.attr(attributeProperties);timeout=Chartist.quantity(animationDefinition.begin||0).value;animationDefinition.begin='indefinite';}
animate=this.elem('animate',Chartist.extend({attributeName:attribute},animationDefinition));if(guided){setTimeout(function(){try{animate._node.beginElement();}catch(err){attributeProperties[attribute]=animationDefinition.to;this.attr(attributeProperties);animate.remove();}}.bind(this),timeout);}
if(eventEmitter){animate._node.addEventListener('beginEvent',function handleBeginEvent(){eventEmitter.emit('animationBegin',{element:this,animate:animate._node,params:animationDefinition});}.bind(this));}
animate._node.addEventListener('endEvent',function handleEndEvent(){if(eventEmitter){eventEmitter.emit('animationEnd',{element:this,animate:animate._node,params:animationDefinition});}
if(guided){attributeProperties[attribute]=animationDefinition.to;this.attr(attributeProperties);animate.remove();}}.bind(this));}
if(animations[attribute]instanceof Array){animations[attribute].forEach(function(animationDefinition){createAnimate.bind(this)(animationDefinition,false);}.bind(this));}else{createAnimate.bind(this)(animations[attribute],guided);}}.bind(this));return this;}
Chartist.Svg=Chartist.Class.extend({constructor:Svg,attr:attr,elem:elem,parent:parent,root:root,querySelector:querySelector,querySelectorAll:querySelectorAll,getNode:getNode,foreignObject:foreignObject,text:text,empty:empty,remove:remove,replace:replace,append:append,classes:classes,addClass:addClass,removeClass:removeClass,removeAllClasses:removeAllClasses,height:height,width:width,animate:animate});Chartist.Svg.isSupported=function(feature){return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#'+feature,'1.1');};var easingCubicBeziers={easeInSine:[0.47,0,0.745,0.715],easeOutSine:[0.39,0.575,0.565,1],easeInOutSine:[0.445,0.05,0.55,0.95],easeInQuad:[0.55,0.085,0.68,0.53],easeOutQuad:[0.25,0.46,0.45,0.94],easeInOutQuad:[0.455,0.03,0.515,0.955],easeInCubic:[0.55,0.055,0.675,0.19],easeOutCubic:[0.215,0.61,0.355,1],easeInOutCubic:[0.645,0.045,0.355,1],easeInQuart:[0.895,0.03,0.685,0.22],easeOutQuart:[0.165,0.84,0.44,1],easeInOutQuart:[0.77,0,0.175,1],easeInQuint:[0.755,0.05,0.855,0.06],easeOutQuint:[0.23,1,0.32,1],easeInOutQuint:[0.86,0,0.07,1],easeInExpo:[0.95,0.05,0.795,0.035],easeOutExpo:[0.19,1,0.22,1],easeInOutExpo:[1,0,0,1],easeInCirc:[0.6,0.04,0.98,0.335],easeOutCirc:[0.075,0.82,0.165,1],easeInOutCirc:[0.785,0.135,0.15,0.86],easeInBack:[0.6,-0.28,0.735,0.045],easeOutBack:[0.175,0.885,0.32,1.275],easeInOutBack:[0.68,-0.55,0.265,1.55]};Chartist.Svg.Easing=easingCubicBeziers;function SvgList(nodeList){var list=this;this.svgElements=[];for(var i=0;i<nodeList.length;i++){this.svgElements.push(new Chartist.Svg(nodeList[i]));}
Object.keys(Chartist.Svg.prototype).filter(function(prototypeProperty){return['constructor','parent','querySelector','querySelectorAll','replace','append','classes','height','width'].indexOf(prototypeProperty)===-1;}).forEach(function(prototypeProperty){list[prototypeProperty]=function(){var args=Array.prototype.slice.call(arguments,0);list.svgElements.forEach(function(element){Chartist.Svg.prototype[prototypeProperty].apply(element,args);});return list;};});}
Chartist.Svg.List=Chartist.Class.extend({constructor:SvgList});}(window,document,Chartist));;(function(window,document,Chartist){'use strict';var elementDescriptions={m:['x','y'],l:['x','y'],c:['x1','y1','x2','y2','x','y'],a:['rx','ry','xAr','lAf','sf','x','y']};var defaultOptions={accuracy:3};function element(command,params,pathElements,pos,relative,data){var pathElement=Chartist.extend({command:relative?command.toLowerCase():command.toUpperCase()},params,data?{data:data}:{});pathElements.splice(pos,0,pathElement);}
function forEachParam(pathElements,cb){pathElements.forEach(function(pathElement,pathElementIndex){elementDescriptions[pathElement.command.toLowerCase()].forEach(function(paramName,paramIndex){cb(pathElement,paramName,pathElementIndex,paramIndex,pathElements);});});}
function SvgPath(close,options){this.pathElements=[];this.pos=0;this.close=close;this.options=Chartist.extend({},defaultOptions,options);}
function position(pos){if(pos!==undefined){this.pos=Math.max(0,Math.min(this.pathElements.length,pos));return this;}else{return this.pos;}}
function remove(count){this.pathElements.splice(this.pos,count);return this;}
function move(x,y,relative,data){element('M',{x:+x,y:+y},this.pathElements,this.pos++,relative,data);return this;}
function line(x,y,relative,data){element('L',{x:+x,y:+y},this.pathElements,this.pos++,relative,data);return this;}
function curve(x1,y1,x2,y2,x,y,relative,data){element('C',{x1:+x1,y1:+y1,x2:+x2,y2:+y2,x:+x,y:+y},this.pathElements,this.pos++,relative,data);return this;}
function arc(rx,ry,xAr,lAf,sf,x,y,relative,data){element('A',{rx:+rx,ry:+ry,xAr:+xAr,lAf:+lAf,sf:+sf,x:+x,y:+y},this.pathElements,this.pos++,relative,data);return this;}
function parse(path){var chunks=path.replace(/([A-Za-z])([0-9])/g,'$1 $2').replace(/([0-9])([A-Za-z])/g,'$1 $2').split(/[\s,]+/).reduce(function(result,element){if(element.match(/[A-Za-z]/)){result.push([]);}
result[result.length-1].push(element);return result;},[]);if(chunks[chunks.length-1][0].toUpperCase()==='Z'){chunks.pop();}
var elements=chunks.map(function(chunk){var command=chunk.shift(),description=elementDescriptions[command.toLowerCase()];return Chartist.extend({command:command},description.reduce(function(result,paramName,index){result[paramName]=+chunk[index];return result;},{}));});var spliceArgs=[this.pos,0];Array.prototype.push.apply(spliceArgs,elements);Array.prototype.splice.apply(this.pathElements,spliceArgs);this.pos+=elements.length;return this;}
function stringify(){var accuracyMultiplier=Math.pow(10,this.options.accuracy);return this.pathElements.reduce(function(path,pathElement){var params=elementDescriptions[pathElement.command.toLowerCase()].map(function(paramName){return this.options.accuracy?(Math.round(pathElement[paramName]*accuracyMultiplier)/accuracyMultiplier):pathElement[paramName];}.bind(this));return path+pathElement.command+params.join(',');}.bind(this),'')+(this.close?'Z':'');}
function scale(x,y){forEachParam(this.pathElements,function(pathElement,paramName){pathElement[paramName]*=paramName[0]==='x'?x:y;});return this;}
function translate(x,y){forEachParam(this.pathElements,function(pathElement,paramName){pathElement[paramName]+=paramName[0]==='x'?x:y;});return this;}
function transform(transformFnc){forEachParam(this.pathElements,function(pathElement,paramName,pathElementIndex,paramIndex,pathElements){var transformed=transformFnc(pathElement,paramName,pathElementIndex,paramIndex,pathElements);if(transformed||transformed===0){pathElement[paramName]=transformed;}});return this;}
function clone(close){var c=new Chartist.Svg.Path(close||this.close);c.pos=this.pos;c.pathElements=this.pathElements.slice().map(function cloneElements(pathElement){return Chartist.extend({},pathElement);});c.options=Chartist.extend({},this.options);return c;}
function splitByCommand(command){var split=[new Chartist.Svg.Path()];this.pathElements.forEach(function(pathElement){if(pathElement.command===command.toUpperCase()&&split[split.length-1].pathElements.length!==0){split.push(new Chartist.Svg.Path());}
split[split.length-1].pathElements.push(pathElement);});return split;}
function join(paths,close,options){var joinedPath=new Chartist.Svg.Path(close,options);for(var i=0;i<paths.length;i++){var path=paths[i];for(var j=0;j<path.pathElements.length;j++){joinedPath.pathElements.push(path.pathElements[j]);}}
return joinedPath;}
Chartist.Svg.Path=Chartist.Class.extend({constructor:SvgPath,position:position,remove:remove,move:move,line:line,curve:curve,arc:arc,scale:scale,translate:translate,transform:transform,parse:parse,stringify:stringify,clone:clone,splitByCommand:splitByCommand});Chartist.Svg.Path.elementDescriptions=elementDescriptions;Chartist.Svg.Path.join=join;}(window,document,Chartist));;(function(window,document,Chartist){'use strict';var axisUnits={x:{pos:'x',len:'width',dir:'horizontal',rectStart:'x1',rectEnd:'x2',rectOffset:'y2'},y:{pos:'y',len:'height',dir:'vertical',rectStart:'y2',rectEnd:'y1',rectOffset:'x1'}};function Axis(units,chartRect,ticks,options){this.units=units;this.counterUnits=units===axisUnits.x?axisUnits.y:axisUnits.x;this.chartRect=chartRect;this.axisLength=chartRect[units.rectEnd]-chartRect[units.rectStart];this.gridOffset=chartRect[units.rectOffset];this.ticks=ticks;this.options=options;}
function createGridAndLabels(gridGroup,labelGroup,useForeignObject,chartOptions,eventEmitter){var axisOptions=chartOptions['axis'+this.units.pos.toUpperCase()];var projectedValues=this.ticks.map(this.projectValue.bind(this));var labelValues=this.ticks.map(axisOptions.labelInterpolationFnc);projectedValues.forEach(function(projectedValue,index){var labelOffset={x:0,y:0};var labelLength;if(projectedValues[index+1]){labelLength=projectedValues[index+1]-projectedValue;}else{labelLength=Math.max(this.axisLength-projectedValue,30);}
if(Chartist.isFalseyButZero(labelValues[index])&&labelValues[index]!==''){return;}
if(this.units.pos==='x'){projectedValue=this.chartRect.x1+projectedValue;labelOffset.x=chartOptions.axisX.labelOffset.x;if(chartOptions.axisX.position==='start'){labelOffset.y=this.chartRect.padding.top+chartOptions.axisX.labelOffset.y+(useForeignObject?5:20);}else{labelOffset.y=this.chartRect.y1+chartOptions.axisX.labelOffset.y+(useForeignObject?5:20);}}else{projectedValue=this.chartRect.y1-projectedValue;labelOffset.y=chartOptions.axisY.labelOffset.y-(useForeignObject?labelLength:0);if(chartOptions.axisY.position==='start'){labelOffset.x=useForeignObject?this.chartRect.padding.left+chartOptions.axisY.labelOffset.x:this.chartRect.x1-10;}else{labelOffset.x=this.chartRect.x2+chartOptions.axisY.labelOffset.x+10;}}
if(axisOptions.showGrid){Chartist.createGrid(projectedValue,index,this,this.gridOffset,this.chartRect[this.counterUnits.len](),gridGroup,[chartOptions.classNames.grid,chartOptions.classNames[this.units.dir]],eventEmitter);}
if(axisOptions.showLabel){Chartist.createLabel(projectedValue,labelLength,index,labelValues,this,axisOptions.offset,labelOffset,labelGroup,[chartOptions.classNames.label,chartOptions.classNames[this.units.dir],(axisOptions.position==='start'?chartOptions.classNames[axisOptions.position]:chartOptions.classNames['end'])],useForeignObject,eventEmitter);}}.bind(this));}
Chartist.Axis=Chartist.Class.extend({constructor:Axis,createGridAndLabels:createGridAndLabels,projectValue:function(value,index,data){throw new Error('Base axis can\'t be instantiated!');}});Chartist.Axis.units=axisUnits;}(window,document,Chartist));;(function(window,document,Chartist){'use strict';function AutoScaleAxis(axisUnit,data,chartRect,options){var highLow=options.highLow||Chartist.getHighLow(data,options,axisUnit.pos);this.bounds=Chartist.getBounds(chartRect[axisUnit.rectEnd]-chartRect[axisUnit.rectStart],highLow,options.scaleMinSpace||20,options.onlyInteger);this.range={min:this.bounds.min,max:this.bounds.max};Chartist.AutoScaleAxis.super.constructor.call(this,axisUnit,chartRect,this.bounds.values,options);}
function projectValue(value){return this.axisLength*(+Chartist.getMultiValue(value,this.units.pos)-this.bounds.min)/this.bounds.range;}
Chartist.AutoScaleAxis=Chartist.Axis.extend({constructor:AutoScaleAxis,projectValue:projectValue});}(window,document,Chartist));;(function(window,document,Chartist){'use strict';function FixedScaleAxis(axisUnit,data,chartRect,options){var highLow=options.highLow||Chartist.getHighLow(data,options,axisUnit.pos);this.divisor=options.divisor||1;this.ticks=options.ticks||Chartist.times(this.divisor).map(function(value,index){return highLow.low+(highLow.high-highLow.low)/this.divisor*index;}.bind(this));this.ticks.sort(function(a,b){return a-b;});this.range={min:highLow.low,max:highLow.high};Chartist.FixedScaleAxis.super.constructor.call(this,axisUnit,chartRect,this.ticks,options);this.stepLength=this.axisLength/this.divisor;}
function projectValue(value){return this.axisLength*(+Chartist.getMultiValue(value,this.units.pos)-this.range.min)/(this.range.max-this.range.min);}
Chartist.FixedScaleAxis=Chartist.Axis.extend({constructor:FixedScaleAxis,projectValue:projectValue});}(window,document,Chartist));;(function(window,document,Chartist){'use strict';function StepAxis(axisUnit,data,chartRect,options){Chartist.StepAxis.super.constructor.call(this,axisUnit,chartRect,options.ticks,options);var calc=Math.max(1,options.ticks.length-(options.stretch?1:0));this.stepLength=this.axisLength/calc;}
function projectValue(value,index){return this.stepLength*index;}
Chartist.StepAxis=Chartist.Axis.extend({constructor:StepAxis,projectValue:projectValue});}(window,document,Chartist));;(function(window,document,Chartist){'use strict';var defaultOptions={axisX:{offset:30,position:'end',labelOffset:{x:0,y:0},showLabel:true,showGrid:true,labelInterpolationFnc:Chartist.noop,type:undefined},axisY:{offset:40,position:'start',labelOffset:{x:0,y:0},showLabel:true,showGrid:true,labelInterpolationFnc:Chartist.noop,type:undefined,scaleMinSpace:20,onlyInteger:false},width:undefined,height:undefined,showLine:true,showPoint:true,showArea:false,areaBase:0,lineSmooth:true,showGridBackground:false,low:undefined,high:undefined,chartPadding:{top:15,right:15,bottom:5,left:10},fullWidth:false,reverseData:false,classNames:{chart:'ct-chart-line',label:'ct-label',labelGroup:'ct-labels',series:'ct-series',line:'ct-line',point:'ct-point',area:'ct-area',grid:'ct-grid',gridGroup:'ct-grids',gridBackground:'ct-grid-background',vertical:'ct-vertical',horizontal:'ct-horizontal',start:'ct-start',end:'ct-end'}};function createChart(options){var data=Chartist.normalizeData(this.data,options.reverseData,true);this.svg=Chartist.createSvg(this.container,options.width,options.height,options.classNames.chart);var gridGroup=this.svg.elem('g').addClass(options.classNames.gridGroup);var seriesGroup=this.svg.elem('g');var labelGroup=this.svg.elem('g').addClass(options.classNames.labelGroup);var chartRect=Chartist.createChartRect(this.svg,options,defaultOptions.padding);var axisX,axisY;if(options.axisX.type===undefined){axisX=new Chartist.StepAxis(Chartist.Axis.units.x,data.normalized.series,chartRect,Chartist.extend({},options.axisX,{ticks:data.normalized.labels,stretch:options.fullWidth}));}else{axisX=options.axisX.type.call(Chartist,Chartist.Axis.units.x,data.normalized.series,chartRect,options.axisX);}
if(options.axisY.type===undefined){axisY=new Chartist.AutoScaleAxis(Chartist.Axis.units.y,data.normalized.series,chartRect,Chartist.extend({},options.axisY,{high:Chartist.isNumeric(options.high)?options.high:options.axisY.high,low:Chartist.isNumeric(options.low)?options.low:options.axisY.low}));}else{axisY=options.axisY.type.call(Chartist,Chartist.Axis.units.y,data.normalized.series,chartRect,options.axisY);}
axisX.createGridAndLabels(gridGroup,labelGroup,this.supportsForeignObject,options,this.eventEmitter);axisY.createGridAndLabels(gridGroup,labelGroup,this.supportsForeignObject,options,this.eventEmitter);if(options.showGridBackground){Chartist.createGridBackground(gridGroup,chartRect,options.classNames.gridBackground,this.eventEmitter);}
data.raw.series.forEach(function(series,seriesIndex){var seriesElement=seriesGroup.elem('g');seriesElement.attr({'ct:series-name':series.name,'ct:meta':Chartist.serialize(series.meta)});seriesElement.addClass([options.classNames.series,(series.className||options.classNames.series+'-'+Chartist.alphaNumerate(seriesIndex))].join(' '));var pathCoordinates=[],pathData=[];data.normalized.series[seriesIndex].forEach(function(value,valueIndex){var p={x:chartRect.x1+axisX.projectValue(value,valueIndex,data.normalized.series[seriesIndex]),y:chartRect.y1-axisY.projectValue(value,valueIndex,data.normalized.series[seriesIndex])};pathCoordinates.push(p.x,p.y);pathData.push({value:value,valueIndex:valueIndex,meta:Chartist.getMetaData(series,valueIndex)});}.bind(this));var seriesOptions={lineSmooth:Chartist.getSeriesOption(series,options,'lineSmooth'),showPoint:Chartist.getSeriesOption(series,options,'showPoint'),showLine:Chartist.getSeriesOption(series,options,'showLine'),showArea:Chartist.getSeriesOption(series,options,'showArea'),areaBase:Chartist.getSeriesOption(series,options,'areaBase')};var smoothing=typeof seriesOptions.lineSmooth==='function'?seriesOptions.lineSmooth:(seriesOptions.lineSmooth?Chartist.Interpolation.monotoneCubic():Chartist.Interpolation.none());var path=smoothing(pathCoordinates,pathData);if(seriesOptions.showPoint){path.pathElements.forEach(function(pathElement){var point=seriesElement.elem('line',{x1:pathElement.x,y1:pathElement.y,x2:pathElement.x+0.01,y2:pathElement.y},options.classNames.point).attr({'ct:value':[pathElement.data.value.x,pathElement.data.value.y].filter(Chartist.isNumeric).join(','),'ct:meta':Chartist.serialize(pathElement.data.meta)});this.eventEmitter.emit('draw',{type:'point',value:pathElement.data.value,index:pathElement.data.valueIndex,meta:pathElement.data.meta,series:series,seriesIndex:seriesIndex,axisX:axisX,axisY:axisY,group:seriesElement,element:point,x:pathElement.x,y:pathElement.y});}.bind(this));}
if(seriesOptions.showLine){var line=seriesElement.elem('path',{d:path.stringify()},options.classNames.line,true);this.eventEmitter.emit('draw',{type:'line',values:data.normalized.series[seriesIndex],path:path.clone(),chartRect:chartRect,index:seriesIndex,series:series,seriesIndex:seriesIndex,seriesMeta:series.meta,axisX:axisX,axisY:axisY,group:seriesElement,element:line});}
if(seriesOptions.showArea&&axisY.range){var areaBase=Math.max(Math.min(seriesOptions.areaBase,axisY.range.max),axisY.range.min);var areaBaseProjected=chartRect.y1-axisY.projectValue(areaBase);path.splitByCommand('M').filter(function onlySolidSegments(pathSegment){return pathSegment.pathElements.length>1;}).map(function convertToArea(solidPathSegments){var firstElement=solidPathSegments.pathElements[0];var lastElement=solidPathSegments.pathElements[solidPathSegments.pathElements.length-1];return solidPathSegments.clone(true).position(0).remove(1).move(firstElement.x,areaBaseProjected).line(firstElement.x,firstElement.y).position(solidPathSegments.pathElements.length+1).line(lastElement.x,areaBaseProjected);}).forEach(function createArea(areaPath){var area=seriesElement.elem('path',{d:areaPath.stringify()},options.classNames.area,true);this.eventEmitter.emit('draw',{type:'area',values:data.normalized.series[seriesIndex],path:areaPath.clone(),series:series,seriesIndex:seriesIndex,axisX:axisX,axisY:axisY,chartRect:chartRect,index:seriesIndex,group:seriesElement,element:area});}.bind(this));}}.bind(this));this.eventEmitter.emit('created',{bounds:axisY.bounds,chartRect:chartRect,axisX:axisX,axisY:axisY,svg:this.svg,options:options});}
function Line(query,data,options,responsiveOptions){Chartist.Line.super.constructor.call(this,query,data,defaultOptions,Chartist.extend({},defaultOptions,options),responsiveOptions);}
Chartist.Line=Chartist.Base.extend({constructor:Line,createChart:createChart});}(window,document,Chartist));;(function(window,document,Chartist){'use strict';var defaultOptions={axisX:{offset:30,position:'end',labelOffset:{x:0,y:0},showLabel:true,showGrid:true,labelInterpolationFnc:Chartist.noop,scaleMinSpace:30,onlyInteger:false},axisY:{offset:40,position:'start',labelOffset:{x:0,y:0},showLabel:true,showGrid:true,labelInterpolationFnc:Chartist.noop,scaleMinSpace:20,onlyInteger:false},width:undefined,height:undefined,high:undefined,low:undefined,referenceValue:0,chartPadding:{top:15,right:15,bottom:5,left:10},seriesBarDistance:15,stackBars:false,stackMode:'accumulate',horizontalBars:false,distributeSeries:false,reverseData:false,showGridBackground:false,classNames:{chart:'ct-chart-bar',horizontalBars:'ct-horizontal-bars',label:'ct-label',labelGroup:'ct-labels',series:'ct-series',bar:'ct-bar',grid:'ct-grid',gridGroup:'ct-grids',gridBackground:'ct-grid-background',vertical:'ct-vertical',horizontal:'ct-horizontal',start:'ct-start',end:'ct-end'}};function createChart(options){var data;var highLow;if(options.distributeSeries){data=Chartist.normalizeData(this.data,options.reverseData,options.horizontalBars?'x':'y');data.normalized.series=data.normalized.series.map(function(value){return[value];});}else{data=Chartist.normalizeData(this.data,options.reverseData,options.horizontalBars?'x':'y');}
this.svg=Chartist.createSvg(this.container,options.width,options.height,options.classNames.chart+(options.horizontalBars?' '+options.classNames.horizontalBars:''));var gridGroup=this.svg.elem('g').addClass(options.classNames.gridGroup);var seriesGroup=this.svg.elem('g');var labelGroup=this.svg.elem('g').addClass(options.classNames.labelGroup);if(options.stackBars&&data.normalized.series.length!==0){var serialSums=Chartist.serialMap(data.normalized.series,function serialSums(){return Array.prototype.slice.call(arguments).map(function(value){return value;}).reduce(function(prev,curr){return{x:prev.x+(curr&&curr.x)||0,y:prev.y+(curr&&curr.y)||0};},{x:0,y:0});});highLow=Chartist.getHighLow([serialSums],options,options.horizontalBars?'x':'y');}else{highLow=Chartist.getHighLow(data.normalized.series,options,options.horizontalBars?'x':'y');}
highLow.high=+options.high||(options.high===0?0:highLow.high);highLow.low=+options.low||(options.low===0?0:highLow.low);var chartRect=Chartist.createChartRect(this.svg,options,defaultOptions.padding);var valueAxis,labelAxisTicks,labelAxis,axisX,axisY;if(options.distributeSeries&&options.stackBars){labelAxisTicks=data.normalized.labels.slice(0,1);}else{labelAxisTicks=data.normalized.labels;}
if(options.horizontalBars){if(options.axisX.type===undefined){valueAxis=axisX=new Chartist.AutoScaleAxis(Chartist.Axis.units.x,data.normalized.series,chartRect,Chartist.extend({},options.axisX,{highLow:highLow,referenceValue:0}));}else{valueAxis=axisX=options.axisX.type.call(Chartist,Chartist.Axis.units.x,data.normalized.series,chartRect,Chartist.extend({},options.axisX,{highLow:highLow,referenceValue:0}));}
if(options.axisY.type===undefined){labelAxis=axisY=new Chartist.StepAxis(Chartist.Axis.units.y,data.normalized.series,chartRect,{ticks:labelAxisTicks});}else{labelAxis=axisY=options.axisY.type.call(Chartist,Chartist.Axis.units.y,data.normalized.series,chartRect,options.axisY);}}else{if(options.axisX.type===undefined){labelAxis=axisX=new Chartist.StepAxis(Chartist.Axis.units.x,data.normalized.series,chartRect,{ticks:labelAxisTicks});}else{labelAxis=axisX=options.axisX.type.call(Chartist,Chartist.Axis.units.x,data.normalized.series,chartRect,options.axisX);}
if(options.axisY.type===undefined){valueAxis=axisY=new Chartist.AutoScaleAxis(Chartist.Axis.units.y,data.normalized.series,chartRect,Chartist.extend({},options.axisY,{highLow:highLow,referenceValue:0}));}else{valueAxis=axisY=options.axisY.type.call(Chartist,Chartist.Axis.units.y,data.normalized.series,chartRect,Chartist.extend({},options.axisY,{highLow:highLow,referenceValue:0}));}}
var zeroPoint=options.horizontalBars?(chartRect.x1+valueAxis.projectValue(0)):(chartRect.y1-valueAxis.projectValue(0));var stackedBarValues=[];labelAxis.createGridAndLabels(gridGroup,labelGroup,this.supportsForeignObject,options,this.eventEmitter);valueAxis.createGridAndLabels(gridGroup,labelGroup,this.supportsForeignObject,options,this.eventEmitter);if(options.showGridBackground){Chartist.createGridBackground(gridGroup,chartRect,options.classNames.gridBackground,this.eventEmitter);}
data.raw.series.forEach(function(series,seriesIndex){var biPol=seriesIndex-(data.raw.series.length-1)/2;var periodHalfLength;var seriesElement;if(options.distributeSeries&&!options.stackBars){periodHalfLength=labelAxis.axisLength/data.normalized.series.length/2;}else if(options.distributeSeries&&options.stackBars){periodHalfLength=labelAxis.axisLength/2;}else{periodHalfLength=labelAxis.axisLength/data.normalized.series[seriesIndex].length/2;}
seriesElement=seriesGroup.elem('g');seriesElement.attr({'ct:series-name':series.name,'ct:meta':Chartist.serialize(series.meta)});seriesElement.addClass([options.classNames.series,(series.className||options.classNames.series+'-'+Chartist.alphaNumerate(seriesIndex))].join(' '));data.normalized.series[seriesIndex].forEach(function(value,valueIndex){var projected,bar,previousStack,labelAxisValueIndex;if(options.distributeSeries&&!options.stackBars){labelAxisValueIndex=seriesIndex;}else if(options.distributeSeries&&options.stackBars){labelAxisValueIndex=0;}else{labelAxisValueIndex=valueIndex;}
if(options.horizontalBars){projected={x:chartRect.x1+valueAxis.projectValue(value&&value.x?value.x:0,valueIndex,data.normalized.series[seriesIndex]),y:chartRect.y1-labelAxis.projectValue(value&&value.y?value.y:0,labelAxisValueIndex,data.normalized.series[seriesIndex])};}else{projected={x:chartRect.x1+labelAxis.projectValue(value&&value.x?value.x:0,labelAxisValueIndex,data.normalized.series[seriesIndex]),y:chartRect.y1-valueAxis.projectValue(value&&value.y?value.y:0,valueIndex,data.normalized.series[seriesIndex])}}
if(labelAxis instanceof Chartist.StepAxis){if(!labelAxis.options.stretch){projected[labelAxis.units.pos]+=periodHalfLength*(options.horizontalBars?-1:1);}
projected[labelAxis.units.pos]+=(options.stackBars||options.distributeSeries)?0:biPol*options.seriesBarDistance*(options.horizontalBars?-1:1);}
previousStack=stackedBarValues[valueIndex]||zeroPoint;stackedBarValues[valueIndex]=previousStack-(zeroPoint-projected[labelAxis.counterUnits.pos]);if(value===undefined){return;}
var positions={};positions[labelAxis.units.pos+'1']=projected[labelAxis.units.pos];positions[labelAxis.units.pos+'2']=projected[labelAxis.units.pos];if(options.stackBars&&(options.stackMode==='accumulate'||!options.stackMode)){positions[labelAxis.counterUnits.pos+'1']=previousStack;positions[labelAxis.counterUnits.pos+'2']=stackedBarValues[valueIndex];}else{positions[labelAxis.counterUnits.pos+'1']=zeroPoint;positions[labelAxis.counterUnits.pos+'2']=projected[labelAxis.counterUnits.pos];}
positions.x1=Math.min(Math.max(positions.x1,chartRect.x1),chartRect.x2);positions.x2=Math.min(Math.max(positions.x2,chartRect.x1),chartRect.x2);positions.y1=Math.min(Math.max(positions.y1,chartRect.y2),chartRect.y1);positions.y2=Math.min(Math.max(positions.y2,chartRect.y2),chartRect.y1);var metaData=Chartist.getMetaData(series,valueIndex);bar=seriesElement.elem('line',positions,options.classNames.bar).attr({'ct:value':[value.x,value.y].filter(Chartist.isNumeric).join(','),'ct:meta':Chartist.serialize(metaData)});this.eventEmitter.emit('draw',Chartist.extend({type:'bar',value:value,index:valueIndex,meta:metaData,series:series,seriesIndex:seriesIndex,axisX:axisX,axisY:axisY,chartRect:chartRect,group:seriesElement,element:bar},positions));}.bind(this));}.bind(this));this.eventEmitter.emit('created',{bounds:valueAxis.bounds,chartRect:chartRect,axisX:axisX,axisY:axisY,svg:this.svg,options:options});}
function Bar(query,data,options,responsiveOptions){Chartist.Bar.super.constructor.call(this,query,data,defaultOptions,Chartist.extend({},defaultOptions,options),responsiveOptions);}
Chartist.Bar=Chartist.Base.extend({constructor:Bar,createChart:createChart});}(window,document,Chartist));;(function(window,document,Chartist){'use strict';var defaultOptions={width:undefined,height:undefined,chartPadding:5,classNames:{chartPie:'ct-chart-pie',chartDonut:'ct-chart-donut',series:'ct-series',slicePie:'ct-slice-pie',sliceDonut:'ct-slice-donut',sliceDonutSolid:'ct-slice-donut-solid',label:'ct-label'},startAngle:0,total:undefined,donut:false,donutSolid:false,donutWidth:60,showLabel:true,labelOffset:0,labelPosition:'inside',labelInterpolationFnc:Chartist.noop,labelDirection:'neutral',reverseData:false,ignoreEmptyValues:false};function determineAnchorPosition(center,label,direction){var toTheRight=label.x>center.x;if(toTheRight&&direction==='explode'||!toTheRight&&direction==='implode'){return 'start';}else if(toTheRight&&direction==='implode'||!toTheRight&&direction==='explode'){return 'end';}else{return 'middle';}}
function createChart(options){var data=Chartist.normalizeData(this.data);var seriesGroups=[],labelsGroup,chartRect,radius,labelRadius,totalDataSum,startAngle=options.startAngle;this.svg=Chartist.createSvg(this.container,options.width,options.height,options.donut?options.classNames.chartDonut:options.classNames.chartPie);chartRect=Chartist.createChartRect(this.svg,options,defaultOptions.padding);radius=Math.min(chartRect.width()/2,chartRect.height()/2);totalDataSum=options.total||data.normalized.series.reduce(function(previousValue,currentValue){return previousValue+currentValue;},0);var donutWidth=Chartist.quantity(options.donutWidth);if(donutWidth.unit==='%'){donutWidth.value*=radius/100;}
radius-=options.donut&&!options.donutSolid?donutWidth.value/2:0;if(options.labelPosition==='outside'||options.donut&&!options.donutSolid){labelRadius=radius;}else if(options.labelPosition==='center'){labelRadius=0;}else if(options.donutSolid){labelRadius=radius-donutWidth.value/2;}else{labelRadius=radius/2;}
labelRadius+=options.labelOffset;var center={x:chartRect.x1+chartRect.width()/2,y:chartRect.y2+chartRect.height()/2};var hasSingleValInSeries=data.raw.series.filter(function(val){return val.hasOwnProperty('value')?val.value!==0:val!==0;}).length===1;data.raw.series.forEach(function(series,index){seriesGroups[index]=this.svg.elem('g',null,null);}.bind(this));if(options.showLabel){labelsGroup=this.svg.elem('g',null,null);}
data.raw.series.forEach(function(series,index){if(data.normalized.series[index]===0&&options.ignoreEmptyValues)return;seriesGroups[index].attr({'ct:series-name':series.name});seriesGroups[index].addClass([options.classNames.series,(series.className||options.classNames.series+'-'+Chartist.alphaNumerate(index))].join(' '));var endAngle=(totalDataSum>0?startAngle+data.normalized.series[index]/totalDataSum*360:0);var overlappigStartAngle=Math.max(0,startAngle-(index===0||hasSingleValInSeries?0:0.2));if(endAngle-overlappigStartAngle>=359.99){endAngle=overlappigStartAngle+359.99;}
var start=Chartist.polarToCartesian(center.x,center.y,radius,overlappigStartAngle),end=Chartist.polarToCartesian(center.x,center.y,radius,endAngle);var innerStart,innerEnd,donutSolidRadius;var path=new Chartist.Svg.Path(!options.donut||options.donutSolid).move(end.x,end.y).arc(radius,radius,0,endAngle-startAngle>180,0,start.x,start.y);if(!options.donut){path.line(center.x,center.y);}else if(options.donutSolid){donutSolidRadius=radius-donutWidth.value;innerStart=Chartist.polarToCartesian(center.x,center.y,donutSolidRadius,startAngle-(index===0||hasSingleValInSeries?0:0.2));innerEnd=Chartist.polarToCartesian(center.x,center.y,donutSolidRadius,endAngle);path.line(innerStart.x,innerStart.y);path.arc(donutSolidRadius,donutSolidRadius,0,endAngle-startAngle>180,1,innerEnd.x,innerEnd.y);}
var pathClassName=options.classNames.slicePie;if(options.donut){pathClassName=options.classNames.sliceDonut;if(options.donutSolid){pathClassName=options.classNames.sliceDonutSolid;}}
var pathElement=seriesGroups[index].elem('path',{d:path.stringify()},pathClassName);pathElement.attr({'ct:value':data.normalized.series[index],'ct:meta':Chartist.serialize(series.meta)});if(options.donut&&!options.donutSolid){pathElement._node.style.strokeWidth=donutWidth.value+'px';}
this.eventEmitter.emit('draw',{type:'slice',value:data.normalized.series[index],totalDataSum:totalDataSum,index:index,meta:series.meta,series:series,group:seriesGroups[index],element:pathElement,path:path.clone(),center:center,radius:radius,startAngle:startAngle,endAngle:endAngle});if(options.showLabel){var labelPosition;if(data.raw.series.length===1){labelPosition={x:center.x,y:center.y};}else{labelPosition=Chartist.polarToCartesian(center.x,center.y,labelRadius,startAngle+(endAngle-startAngle)/2);}
var rawValue;if(data.normalized.labels&&!Chartist.isFalseyButZero(data.normalized.labels[index])){rawValue=data.normalized.labels[index];}else{rawValue=data.normalized.series[index];}
var interpolatedValue=options.labelInterpolationFnc(rawValue,index);if(interpolatedValue||interpolatedValue===0){var labelElement=labelsGroup.elem('text',{dx:labelPosition.x,dy:labelPosition.y,'text-anchor':determineAnchorPosition(center,labelPosition,options.labelDirection)},options.classNames.label).text(''+interpolatedValue);this.eventEmitter.emit('draw',{type:'label',index:index,group:labelsGroup,element:labelElement,text:''+interpolatedValue,x:labelPosition.x,y:labelPosition.y});}}
startAngle=endAngle;}.bind(this));this.eventEmitter.emit('created',{chartRect:chartRect,svg:this.svg,options:options});}
function Pie(query,data,options,responsiveOptions){Chartist.Pie.super.constructor.call(this,query,data,defaultOptions,Chartist.extend({},defaultOptions,options),responsiveOptions);}
Chartist.Pie=Chartist.Base.extend({constructor:Pie,createChart:createChart,determineAnchorPosition:determineAnchorPosition});}(window,document,Chartist));return Chartist;}));
(function(){var d;window.AmCharts?d=window.AmCharts:(d={},window.AmCharts=d,d.themes={},d.maps={},d.inheriting={},d.charts=[],d.onReadyArray=[],d.useUTC=!1,d.updateRate=60,d.uid=0,d.lang={},d.translations={},d.mapTranslations={},d.windows={},d.initHandlers=[],d.amString="am",d.pmString="pm");d.Class=function(a){var b=function(){arguments[0]!==d.inheriting&&(this.events={},this.construct.apply(this,arguments))};a.inherits?(b.prototype=new a.inherits(d.inheriting),b.base=a.inherits.prototype,delete a.inherits):(b.prototype.createEvents=function(){for(var a=0;a<arguments.length;a++)this.events[arguments[a]]=[]},b.prototype.listenTo=function(a,b,c){this.removeListener(a,b,c);a.events[b].push({handler:c,scope:this})},b.prototype.addListener=function(a,b,c){this.removeListener(this,a,b);a&&this.events[a]&&this.events[a].push({handler:b,scope:c})},b.prototype.removeListener=function(a,b,c){if(a&&a.events&&(a=a.events[b]))for(b=a.length-1;0<=b;b--)a[b].handler===c&&a.splice(b,1)},b.prototype.fire=function(a){for(var b=this.events[a.type],c=0;c<b.length;c++){var d=b[c];d.handler.call(d.scope,a)}});for(var c in a)b.prototype[c]=a[c];return b};d.addChart=function(a){window.requestAnimationFrame?d.animationRequested||(d.animationRequested=!0,window.requestAnimationFrame(d.update)):d.updateInt||(d.updateInt=setInterval(function(){d.update()},Math.round(1E3/d.updateRate)));d.charts.push(a)};d.removeChart=function(a){for(var b=d.charts,c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);0===b.length&&(d.requestAnimation&&(window.cancelAnimationFrame(d.requestAnimation),d.animationRequested=!1),d.updateInt&&(clearInterval(d.updateInt),d.updateInt=NaN))};d.isModern=!0;d.getIEVersion=function(){var a=0,b,c;"Microsoft Internet Explorer"==navigator.appName&&(b=navigator.userAgent,c=/MSIE ([0-9]{1,}[.0-9]{0,})/,null!==c.exec(b)&&(a=parseFloat(RegExp.$1)));return a};d.applyLang=function(a,b){var c=d.translations;b.dayNames=d.extend({},d.dayNames);b.shortDayNames=d.extend({},d.shortDayNames);b.monthNames=d.extend({},d.monthNames);b.shortMonthNames=d.extend({},d.shortMonthNames);b.amString="am";b.pmString="pm";c&&(c=c[a])&&(d.lang=c,b.langObj=c,c.monthNames&&(b.dayNames=d.extend({},c.dayNames),b.shortDayNames=d.extend({},c.shortDayNames),b.monthNames=d.extend({},c.monthNames),b.shortMonthNames=d.extend({},c.shortMonthNames)),c.am&&(b.amString=c.am),c.pm&&(b.pmString=c.pm));d.amString=b.amString;d.pmString=b.pmString};d.IEversion=d.getIEVersion();9>d.IEversion&&0<d.IEversion&&(d.isModern=!1,d.isIE=!0);d.dx=0;d.dy=0;if(document.addEventListener||window.opera)d.isNN=!0,d.isIE=!1,d.dx=.5,d.dy=.5;document.attachEvent&&(d.isNN=!1,d.isIE=!0,d.isModern||(d.dx=0,d.dy=0));window.chrome&&(d.chrome=!0);d.handleMouseUp=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];e&&e.handleReleaseOutside&&e.handleReleaseOutside(a)}};d.handleMouseMove=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];e&&e.handleMouseMove&&e.handleMouseMove(a)}};d.handleWheel=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];if(e&&e.mouseIsOver){(e.mouseWheelScrollEnabled||e.mouseWheelZoomEnabled)&&e.handleWheel&&e.handleWheel(a);break}}};d.resetMouseOver=function(){for(var a=d.charts,b=0;b<a.length;b++){var c=a[b];c&&(c.mouseIsOver=!1)}};d.ready=function(a){d.onReadyArray.push(a)};d.handleLoad=function(){d.isReady=!0;for(var a=d.onReadyArray,b=0;b<a.length;b++){var c=a[b];isNaN(d.processDelay)?c():setTimeout(c,d.processDelay*b)}d.onReadyArray=[]};d.addInitHandler=function(a,b){d.initHandlers.push({method:a,types:b})};d.callInitHandler=function(a){var b=d.initHandlers;if(d.initHandlers)for(var c=0;c<b.length;c++){var e=b[c];e.types?d.isInArray(e.types,a.type)&&e.method(a):e.method(a)}};d.getUniqueId=function(){d.uid++;return"AmChartsEl-"+d.uid};d.isNN&&(document.addEventListener("mousemove",d.handleMouseMove),document.addEventListener("mouseup",d.handleMouseUp,!0),window.addEventListener("load",d.handleLoad,!0));d.isIE&&(document.attachEvent("onmousemove",d.handleMouseMove),document.attachEvent("onmouseup",d.handleMouseUp),window.attachEvent("onload",d.handleLoad));d.addWheelListeners=function(){d.wheelIsListened||(d.isNN&&(window.addEventListener("DOMMouseScroll",d.handleWheel,!0),document.addEventListener("mousewheel",d.handleWheel,!0)),d.isIE&&document.attachEvent("onmousewheel",d.handleWheel));d.wheelIsListened=!0};d.clear=function(){var a=d.charts;if(a)for(var b=a.length-1;0<=b;b--)a[b].clear();d.updateInt&&clearInterval(d.updateInt);d.requestAnimation&&window.cancelAnimationFrame(d.requestAnimation);d.charts=[];d.isNN&&(document.removeEventListener("mousemove",d.handleMouseMove,!0),document.removeEventListener("mouseup",d.handleMouseUp,!0),window.removeEventListener("load",d.handleLoad,!0),window.removeEventListener("DOMMouseScroll",d.handleWheel,!0),document.removeEventListener("mousewheel",d.handleWheel,!0));d.isIE&&(document.detachEvent("onmousemove",d.handleMouseMove),document.detachEvent("onmouseup",d.handleMouseUp),window.detachEvent("onload",d.handleLoad))};d.makeChart=function(a,b,c){var e=b.type,h=b.theme;d.isString(h)&&(h=d.themes[h],b.theme=h);var f;switch(e){case"serial":f=new d.AmSerialChart(h);break;case"xy":f=new d.AmXYChart(h);break;case"pie":f=new d.AmPieChart(h);break;case"radar":f=new d.AmRadarChart(h);break;case"gauge":f=new d.AmAngularGauge(h);break;case"funnel":f=new d.AmFunnelChart(h);break;case"map":f=new d.AmMap(h);break;case"stock":f=new d.AmStockChart(h);break;case"gantt":f=new d.AmGanttChart(h)}d.extend(f,b);d.isReady?isNaN(c)?f.write(a):setTimeout(function(){d.realWrite(f,a)},c):d.ready(function(){isNaN(c)?f.write(a):setTimeout(function(){d.realWrite(f,a)},c)});return f};d.realWrite=function(a,b){a.write(b)};d.updateCount=0;d.validateAt=Math.round(d.updateRate/10);d.update=function(){var a=d.charts;d.updateCount++;var b=!1;d.updateCount==d.validateAt&&(b=!0,d.updateCount=0);if(a)for(var c=a.length-1;0<=c;c--)a[c].update&&a[c].update(),b&&(a[c].autoResize?a[c].validateSize&&a[c].validateSize():a[c].premeasure&&a[c].premeasure());window.requestAnimationFrame&&(d.requestAnimation=window.requestAnimationFrame(d.update))};"complete"==document.readyState&&d.handleLoad()})();(function(){var d=window.AmCharts;d.toBoolean=function(a,b){if(void 0===a)return b;switch(String(a).toLowerCase()){case"true":case"yes":case"1":return!0;case"false":case"no":case"0":case null:return!1;default:return!!a}};d.removeFromArray=function(a,b){var c;if(void 0!==b&&void 0!==a)for(c=a.length-1;0<=c;c--)a[c]==b&&a.splice(c,1)};d.getPath=function(){var a=document.getElementsByTagName("script");if(a)for(var b=0;b<a.length;b++){var c=a[b].src;if(-1!==c.search(/\/(amcharts|ammap)\.js/))return c.replace(/\/(amcharts|ammap)\.js.*/,"/")}};d.normalizeUrl=function(a){return""!==a&&-1===a.search(/\/$/)?a+"/":a};d.isAbsolute=function(a){return 0===a.search(/^http[s]?:|^\//)};d.isInArray=function(a,b){for(var c=0;c<a.length;c++)if(a[c]==b)return!0;return!1};d.getDecimals=function(a){var b=0;isNaN(a)||(a=String(a),-1!=a.indexOf("e-")?b=Number(a.split("-")[1]):-1!=a.indexOf(".")&&(b=a.split(".")[1].length));return b};d.wordwrap=function(a,b,c,e){var h,f,g,k;a+="";if(1>b)return a;h=-1;for(a=(k=a.split(/\r\n|\n|\r/)).length;++h<a;k[h]+=g){g=k[h];for(k[h]="";g.length>b;k[h]+=d.trim(g.slice(0,f))+((g=g.slice(f)).length?c:""))f=2==e||(f=g.slice(0,b+1).match(/\S*(\s)?$/))[1]?b:f.input.length-f[0].length||1==e&&b||f.input.length+(f=g.slice(b).match(/^\S*/))[0].length;g=d.trim(g)}return k.join(c)};d.trim=function(a){return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};d.wrappedText=function(a,b,c,e,h,f,g,k){var l=d.text(a,b,c,e,h,f,g);if(l){var m=l.getBBox();if(m.width>k){var p="\n";d.isModern||(p="<br>");k=Math.floor(k/(m.width/b.length));2<k&&(k-=2);b=d.wordwrap(b,k,p,!0);l.remove();l=d.text(a,b,c,e,h,f,g)}}return l};d.getStyle=function(a,b){var c="";if(document.defaultView&&document.defaultView.getComputedStyle)try{c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)}catch(e){}else a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),c=a.currentStyle[b]);return c};d.removePx=function(a){if(void 0!==a)return Number(a.substring(0,a.length-2))};d.getURL=function(a,b){if(a)if("_self"!=b&&b)if("_top"==b&&window.top)window.top.location.href=a;else if("_parent"==b&&window.parent)window.parent.location.href=a;else if("_blank"==b)window.open(a);else{var c=document.getElementsByName(b)[0];c?c.src=a:(c=d.windows[b])?c.opener&&!c.opener.closed?c.location.href=a:d.windows[b]=window.open(a):d.windows[b]=window.open(a)}else window.location.href=a};d.ifArray=function(a){return a&&"object"==typeof a&&0<a.length?!0:!1};d.callMethod=function(a,b){var c;for(c=0;c<b.length;c++){var e=b[c];if(e){if(e[a])e[a]();var d=e.length;if(0<d){var f;for(f=0;f<d;f++){var g=e[f];if(g&&g[a])g[a]()}}}}};d.toNumber=function(a){return"number"==typeof a?a:Number(String(a).replace(/[^0-9\-.]+/g,""))};d.toColor=function(a){if(""!==a&&void 0!==a)if(-1!=a.indexOf(",")){a=a.split(",");var b;for(b=0;b<a.length;b++){var c=a[b].substring(a[b].length-6,a[b].length);a[b]="#"+c}}else a=a.substring(a.length-6,a.length),a="#"+a;return a};d.toCoordinate=function(a,b,c){var e;void 0!==a&&(a=String(a),c&&c<b&&(b=c),e=Number(a),-1!=a.indexOf("!")&&(e=b-Number(a.substr(1))),-1!=a.indexOf("%")&&(e=b*Number(a.substr(0,a.length-1))/100));return e};d.fitToBounds=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};d.isDefined=function(a){return void 0===a?!1:!0};d.stripNumbers=function(a){return a.replace(/[0-9]+/g,"")};d.roundTo=function(a,b){if(0>b)return a;var c=Math.pow(10,b);return Math.round(a*c)/c};d.toFixed=function(a,b){var c=!1;0>a&&(c=!0,a=Math.abs(a));var e=String(Math.round(a*Math.pow(10,b)));if(0<b){var d=e.length;if(d<b){var f;for(f=0;f<b-d;f++)e="0"+e}d=e.substring(0,e.length-b);""===d&&(d=0);e=d+"."+e.substring(e.length-b,e.length);return c?"-"+e:e}return String(e)};d.formatDuration=function(a,b,c,e,h,f){var g=d.intervals,k=f.decimalSeparator;if(a>=g[b].contains){var l=a-Math.floor(a/g[b].contains)*g[b].contains;"ss"==b?(l=d.formatNumber(l,f),1==l.split(k)[0].length&&(l="0"+l)):l=d.roundTo(l,f.precision);("mm"==b||"hh"==b)&&10>l&&(l="0"+l);c=l+""+e[b]+""+c;a=Math.floor(a/g[b].contains);b=g[b].nextInterval;return d.formatDuration(a,b,c,e,h,f)}"ss"==b&&(a=d.formatNumber(a,f),1==a.split(k)[0].length&&(a="0"+a));("mm"==b||"hh"==b)&&10>a&&(a="0"+a);c=a+""+e[b]+""+c;if(g[h].count>g[b].count)for(a=g[b].count;a<g[h].count;a++)b=g[b].nextInterval,"ss"==b||"mm"==b||"hh"==b?c="00"+e[b]+""+c:"DD"==b&&(c="0"+e[b]+""+c);":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-1));return c};d.formatNumber=function(a,b,c,e,h){a=d.roundTo(a,b.precision);isNaN(c)&&(c=b.precision);var f=b.decimalSeparator;b=b.thousandsSeparator;var g;g=0>a?"-":"";a=Math.abs(a);var k=String(a),l=!1;-1!=k.indexOf("e")&&(l=!0);0<=c&&!l&&(k=d.toFixed(a,c));var m="";if(l)m=k;else{var k=k.split("."),l=String(k[0]),p;for(p=l.length;0<=p;p-=3)m=p!=l.length?0!==p?l.substring(p-3,p)+b+m:l.substring(p-3,p)+m:l.substring(p-3,p);void 0!==k[1]&&(m=m+f+k[1]);void 0!==c&&0<c&&"0"!=m&&(m=d.addZeroes(m,f,c))}m=g+m;""===g&&!0===e&&0!==a&&(m="+"+m);!0===h&&(m+="%");return m};d.addZeroes=function(a,b,c){a=a.split(b);void 0===a[1]&&0<c&&(a[1]="0");return a[1].length<c?(a[1]+="0",d.addZeroes(a[0]+b+a[1],b,c)):void 0!==a[1]?a[0]+b+a[1]:a[0]};d.scientificToNormal=function(a){var b;a=String(a).split("e");var c;if("-"==a[1].substr(0,1)){b="0.";for(c=0;c<Math.abs(Number(a[1]))-1;c++)b+="0";b+=a[0].split(".").join("")}else{var e=0;b=a[0].split(".");b[1]&&(e=b[1].length);b=a[0].split(".").join("");for(c=0;c<Math.abs(Number(a[1]))-e;c++)b+="0"}return b};d.toScientific=function(a,b){if(0===a)return"0";var c=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),e=String(e).split(".").join(b);return String(e)+"e"+c};d.randomColor=function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6)};d.hitTest=function(a,b,c){var e=!1,h=a.x,f=a.x+a.width,g=a.y,k=a.y+a.height,l=d.isInRectangle;e||(e=l(h,g,b));e||(e=l(h,k,b));e||(e=l(f,g,b));e||(e=l(f,k,b));e||!0===c||(e=d.hitTest(b,a,!0));return e};d.isInRectangle=function(a,b,c){return a>=c.x-5&&a<=c.x+c.width+5&&b>=c.y-5&&b<=c.y+c.height+5?!0:!1};d.isPercents=function(a){if(-1!=String(a).indexOf("%"))return!0};d.formatValue=function(a,b,c,e,h,f,g,k){if(b){void 0===h&&(h="");var l;for(l=0;l<c.length;l++){var m=c[l],p=b[m];void 0!==p&&(p=f?d.addPrefix(p,k,g,e):d.formatNumber(p,e),a=a.replace(new RegExp("\\[\\["+h+""+m+"\\]\\]","g"),p))}}return a};d.formatDataContextValue=function(a,b){if(a){var c=a.match(/\[\[.*?\]\]/g),e;for(e=0;e<c.length;e++){var d=c[e],d=d.substr(2,d.length-4);void 0!==b[d]&&(a=a.replace(new RegExp("\\[\\["+d+"\\]\\]","g"),b[d]))}}return a};d.massReplace=function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var e=b[c];void 0===e&&(e="");a=a.replace(c,e)}return a};d.cleanFromEmpty=function(a){return a.replace(/\[\[[^\]]*\]\]/g,"")};d.addPrefix=function(a,b,c,e,h){var f=d.formatNumber(a,e),g="",k,l,m;if(0===a)return"0";0>a&&(g="-");a=Math.abs(a);if(1<a)for(k=b.length-1;-1<k;k--){if(a>=b[k].number&&(l=a/b[k].number,m=Number(e.precision),1>m&&(m=1),c=d.roundTo(l,m),m=d.formatNumber(c,{precision:-1,decimalSeparator:e.decimalSeparator,thousandsSeparator:e.thousandsSeparator}),!h||l==c)){f=g+""+m+""+b[k].prefix;break}}else for(k=0;k<c.length;k++)if(a<=c[k].number){l=a/c[k].number;m=Math.abs(Math.floor(Math.log(l)*Math.LOG10E));l=d.roundTo(l,m);f=g+""+l+""+c[k].prefix;break}return f};d.remove=function(a){a&&a.remove()};d.getEffect=function(a){">"==a&&(a="easeOutSine");"<"==a&&(a="easeInSine");"elastic"==a&&(a="easeOutElastic");return a};d.getObjById=function(a,b){var c,e;for(e=0;e<a.length;e++){var d=a[e];if(d.id==b){c=d;break}}return c};d.applyTheme=function(a,b,c){b||(b=d.theme);try{b=JSON.parse(JSON.stringify(b))}catch(e){}b&&b[c]&&d.extend(a,b[c])};d.isString=function(a){return"string"==typeof a?!0:!1};d.extend=function(a,b,c){var e;a||(a={});for(e in b)c?a.hasOwnProperty(e)||(a[e]=b[e]):a[e]=b[e];return a};d.copyProperties=function(a,b){for(var c in a)a.hasOwnProperty(c)&&"events"!=c&&void 0!==a[c]&&"function"!=typeof a[c]&&"cname"!=c&&(b[c]=a[c])};d.processObject=function(a,b,c,e){if(!1===a instanceof b&&(a=e?d.extend(new b(c),a):d.extend(a,new b(c),!0),a.listeners))for(var h in a.listeners)b=a.listeners[h],a.addListener(b.event,b.method);return a};d.fixNewLines=function(a){var b=RegExp("\\n","g");a&&(a=a.replace(b,"<br />"));return a};d.fixBrakes=function(a){if(d.isModern){var b=RegExp("<br>","g");a&&(a=a.replace(b,"\n"))}else a=d.fixNewLines(a);return a};d.deleteObject=function(a,b){if(a){if(void 0===b||null===b)b=20;if(0!==b)if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)d.deleteObject(a[c],b-1),a[c]=null;else if(a&&!a.tagName)try{for(c in a.theme=null,a)a[c]&&("object"==typeof a[c]&&d.deleteObject(a[c],b-1),"function"!=typeof a[c]&&(a[c]=null))}catch(e){}}};d.bounce=function(a,b,c,e,d){return(b/=d)<1/2.75?7.5625*e*b*b+c:b<2/2.75?e*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?e*(7.5625*(b-=2.25/2.75)*b+.9375)+c:e*(7.5625*(b-=2.625/2.75)*b+.984375)+c};d.easeInOutQuad=function(a,b,c,e,d){b/=d/2;if(1>b)return e/2*b*b+c;b--;return-e/2*(b*(b-2)-1)+c};d.easeInSine=function(a,b,c,e,d){return-e*Math.cos(b/d*(Math.PI/2))+e+c};d.easeOutSine=function(a,b,c,e,d){return e*Math.sin(b/d*(Math.PI/2))+c};d.easeOutElastic=function(a,b,c,e,d){a=1.70158;var f=0,g=e;if(0===b)return c;if(1==(b/=d))return c+e;f||(f=.3*d);g<Math.abs(e)?(g=e,a=f/4):a=f/(2*Math.PI)*Math.asin(e/g);return g*Math.pow(2,-10*b)*Math.sin(2*(b*d-a)*Math.PI/f)+e+c};d.fixStepE=function(a){a=a.toExponential(0).split("e");var b=Number(a[1]);9==Number(a[0])&&b++;return d.generateNumber(1,b)};d.generateNumber=function(a,b){var c="",e;e=0>b?Math.abs(b)-1:Math.abs(b);var d;for(d=0;d<e;d++)c+="0";return 0>b?Number("0."+c+String(a)):Number(String(a)+c)};d.setCN=function(a,b,c,e){if(a.addClassNames&&b&&(b=b.node)&&c){var d=b.getAttribute("class");a=a.classNamePrefix+"-";e&&(a="");d?b.setAttribute("class",d+" "+a+c):b.setAttribute("class",a+c)}};d.removeCN=function(a,b,c){b&&(b=b.node)&&c&&(b=b.classList)&&b.remove(a.classNamePrefix+"-"+c)};d.parseDefs=function(a,b){for(var c in a){var e=typeof a[c];if(0<a[c].length&&"object"==e)for(var h=0;h<a[c].length;h++)e=document.createElementNS(d.SVG_NS,c),b.appendChild(e),d.parseDefs(a[c][h],e);else"object"==e?(e=document.createElementNS(d.SVG_NS,c),b.appendChild(e),d.parseDefs(a[c],e)):b.setAttribute(c,a[c])}}})();(function(){var d=window.AmCharts;d.AxisBase=d.Class({construct:function(a){this.createEvents("clickItem","rollOverItem","rollOutItem","rollOverGuide","rollOutGuide","clickGuide");this.titleDY=this.y=this.x=this.dy=this.dx=0;this.axisThickness=1;this.axisColor="#000000";this.axisAlpha=1;this.gridCount=this.tickLength=5;this.gridAlpha=.15;this.gridThickness=1;this.gridColor="#000000";this.dashLength=0;this.labelFrequency=1;this.showLastLabel=this.showFirstLabel=!0;this.fillColor="#FFFFFF";this.fillAlpha=0;this.labelsEnabled=!0;this.labelRotation=0;this.autoGridCount=!0;this.offset=0;this.guides=[];this.visible=!0;this.counter=0;this.guides=[];this.ignoreAxisWidth=this.inside=!1;this.minHorizontalGap=75;this.minVerticalGap=35;this.titleBold=!0;this.minorGridEnabled=!1;this.minorGridAlpha=.07;this.autoWrap=!1;this.titleAlign="middle";this.labelOffset=0;this.bcn="axis-";this.centerLabels=!1;this.firstDayOfWeek=1;this.centerLabelOnFullPeriod=this.markPeriodChange=this.boldPeriodBeginning=!0;this.titleWidth=0;this.periods=[{period:"fff",count:1},{period:"fff",count:5},{period:"fff",count:10},{period:"fff",count:50},{period:"fff",count:100},{period:"fff",count:500},{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"DD",count:2},{period:"DD",count:3},{period:"DD",count:4},{period:"DD",count:5},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},{period:"YYYY",count:50},{period:"YYYY",count:100}];this.dateFormats=[{period:"fff",format:"NN:SS.QQQ"},{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}];this.nextPeriod={fff:"ss",ss:"mm",mm:"hh",hh:"DD",DD:"MM",MM:"YYYY"};d.applyTheme(this,a,"AxisBase")},zoom:function(a,b){this.start=a;this.end=b;this.dataChanged=!0;this.draw()},fixAxisPosition:function(){var a=this.position;"H"==this.orientation?("left"==a&&(a="bottom"),"right"==a&&(a="top")):("bottom"==a&&(a="left"),"top"==a&&(a="right"));this.position=a},init:function(){this.createBalloon()},draw:function(){var a=this.chart;this.prevBY=this.prevBX=NaN;this.allLabels=[];this.counter=0;this.destroy();this.fixAxisPosition();this.setBalloonBounds();this.labels=[];var b=a.container,c=b.set();a.gridSet.push(c);this.set=c;b=b.set();a.axesLabelsSet.push(b);this.labelsSet=b;this.axisLine=new this.axisRenderer(this);this.autoGridCount?("V"==this.orientation?(a=this.height/this.minVerticalGap,3>a&&(a=3)):a=this.width/this.minHorizontalGap,this.gridCountR=Math.max(a,1)):this.gridCountR=this.gridCount;this.axisWidth=this.axisLine.axisWidth;this.addTitle()},setOrientation:function(a){this.orientation=a?"H":"V"},addTitle:function(){var a=this.title;this.titleLabel=null;if(a){var b=this.chart,c=this.titleColor;void 0===c&&(c=b.color);var e=this.titleFontSize;isNaN(e)&&(e=b.fontSize+1);a=d.text(b.container,a,c,b.fontFamily,e,this.titleAlign,this.titleBold);d.setCN(b,a,this.bcn+"title");this.titleLabel=a}},positionTitle:function(){var a=this.titleLabel;if(a){var b,c,e=this.labelsSet,h={};0<e.length()?h=e.getBBox():(h.x=0,h.y=0,h.width=this.width,h.height=this.height,d.VML&&(h.y+=this.y,h.x+=this.x));e.push(a);var e=h.x,f=h.y;d.VML&&(f-=this.y,e-=this.x);var g=h.width,h=h.height,k=this.width,l=this.height,m=0,p=a.getBBox().height/2,q=this.inside,n=this.titleAlign;switch(this.position){case"top":b="left"==n?-1:"right"==n?k:k/2;c=f-10-p;break;case"bottom":b="left"==n?-1:"right"==n?k:k/2;c=f+h+10+p;break;case"left":b=e-10-p;q&&(b-=5);m=-90;c=("left"==n?l+1:"right"==n?-1:l/2)+this.titleDY;this.titleWidth=p+10;break;case"right":b=e+g+10+p,q&&(b+=7),c=("left"==n?l+2:"right"==n?-2:l/2)+this.titleDY,this.titleWidth=p+10,m=-90}this.marginsChanged?(a.translate(b,c),this.tx=b,this.ty=c):a.translate(this.tx,this.ty);this.marginsChanged=!1;isNaN(this.titleRotation)||(m=this.titleRotation);0!==m&&a.rotate(m)}},pushAxisItem:function(a,b){var c=this,e=a.graphics();0<e.length()&&(b?c.labelsSet.push(e):c.set.push(e));if(e=a.getLabel())c.labelsSet.push(e),e.click(function(b){c.handleMouse(b,a,"clickItem")}).touchend(function(b){c.handleMouse(b,a,"clickItem")}).mouseover(function(b){c.handleMouse(b,a,"rollOverItem")}).mouseout(function(b){c.handleMouse(b,a,"rollOutItem")})},handleMouse:function(a,b,c){this.fire({type:c,value:b.value,serialDataItem:b.serialDataItem,axis:this,target:b.label,chart:this.chart,event:a})},addGuide:function(a){for(var b=this.guides,c=!1,e=b.length,h=0;h<b.length;h++)b[h]==a&&(c=!0,e=h);a=d.processObject(a,d.Guide,this.theme);a.id||(a.id="guideAuto"+e+"_"+(new Date).getTime());c||b.push(a)},removeGuide:function(a){var b=this.guides,c;for(c=0;c<b.length;c++)b[c]==a&&b.splice(c,1)},handleGuideOver:function(a){clearTimeout(this.chart.hoverInt);var b=a.graphics.getBBox(),c=this.x+b.x+b.width/2,b=this.y+b.y+b.height/2,e=a.fillColor;void 0===e&&(e=a.lineColor);this.chart.showBalloon(a.balloonText,e,!0,c,b);this.fire({type:"rollOverGuide",guide:a,chart:this.chart})},handleGuideOut:function(a){this.chart.hideBalloon();this.fire({type:"rollOutGuide",guide:a,chart:this.chart})},handleGuideClick:function(a){this.chart.hideBalloon();this.fire({type:"clickGuide",guide:a,chart:this.chart})},addEventListeners:function(a,b){var c=this;a.mouseover(function(){c.handleGuideOver(b)});a.mouseup(function(){c.handleGuideClick(b)});a.touchstart(function(){c.handleGuideOver(b)});a.mouseout(function(){c.handleGuideOut(b)})},getBBox:function(){var a;this.labelsSet&&(a=this.labelsSet.getBBox());a?d.VML||(a={x:a.x+this.x,y:a.y+this.y,width:a.width,height:a.height}):a={x:0,y:0,width:0,height:0};return a},destroy:function(){d.remove(this.set);d.remove(this.labelsSet);var a=this.axisLine;a&&d.remove(a.axisSet);d.remove(this.grid0)},chooseMinorFrequency:function(a){for(var b=10;0<b;b--)if(a/b==Math.round(a/b))return a/b},parseDatesDraw:function(){var a,b=this.chart,c=this.showFirstLabel,e=this.showLastLabel,h,f="",g=d.extractPeriod(this.minPeriod),k=d.getPeriodDuration(g.period,g.count),l,m,p,q,n,t=this.firstDayOfWeek,r=this.boldPeriodBeginning;a=this.minorGridEnabled;var w,z=this.gridAlpha,x,u=this.choosePeriod(0),A=u.period,u=u.count,y=d.getPeriodDuration(A,u);y<k&&(A=g.period,u=g.count,y=k);g=A;"WW"==g&&(g="DD");this.stepWidth=this.getStepWidth(this.timeDifference);var B=Math.ceil(this.timeDifference/y)+5,D=l=d.resetDateToMin(new Date(this.startTime-y),A,u,t).getTime();if(g==A&&1==u&&this.centerLabelOnFullPeriod||this.autoWrap||this.centerLabels)p=y*this.stepWidth,this.autoWrap&&!this.centerLabels&&(p=-p);this.cellWidth=k*this.stepWidth;q=Math.round(l/y);k=-1;q/2==Math.round(q/2)&&(k=-2,l-=y);q=this.firstTime;var C=0,I=0;a&&1<u&&(w=this.chooseMinorFrequency(u),x=d.getPeriodDuration(A,w),"DD"==A&&(x+=d.getPeriodDuration("hh")),"fff"==A&&(x=1));if(0<this.gridCountR)for(B-5-k>this.autoRotateCount&&!isNaN(this.autoRotateAngle)&&(this.labelRotationR=this.autoRotateAngle),a=k;a<=B;a++){n=q+y*(a+Math.floor((D-q)/y))-C;"DD"==A&&(n+=36E5);n=d.resetDateToMin(new Date(n),A,u,t).getTime();"MM"==A&&(h=(n-l)/y,1.5<=(n-l)/y&&(n=n-(h-1)*y+d.getPeriodDuration("DD",3),n=d.resetDateToMin(new Date(n),A,1).getTime(),C+=y));h=(n-this.startTime)*this.stepWidth;if("radar"==b.type){if(h=this.axisWidth-
h,0>h||h>this.axisWidth)continue}else this.rotate?"date"==this.type&&"middle"==this.gridPosition&&(I=-y*this.stepWidth/2):"date"==this.type&&(h=this.axisWidth-h);f=!1;this.nextPeriod[g]&&(f=this.checkPeriodChange(this.nextPeriod[g],1,n,l,g));l=!1;f&&this.markPeriodChange?(f=this.dateFormatsObject[this.nextPeriod[g]],this.twoLineMode&&(f=this.dateFormatsObject[g]+"\n"+f,f=d.fixBrakes(f)),l=!0):f=this.dateFormatsObject[g];r||(l=!1);this.currentDateFormat=f;f=d.formatDate(new Date(n),f,b);if(a==k&&!c||a==B&&!e)f=" ";this.labelFunction&&(f=this.labelFunction(f,new Date(n),this,A,u,m).toString());this.boldLabels&&(l=!0);m=new this.axisItemRenderer(this,h,f,!1,p,I,!1,l);this.pushAxisItem(m);m=l=n;if(!isNaN(w))for(h=1;h<u;h+=w)this.gridAlpha=this.minorGridAlpha,f=n+x*h,f=d.resetDateToMin(new Date(f),A,w,t).getTime(),f=new this.axisItemRenderer(this,(f-this.startTime)*this.stepWidth,void 0,void 0,void 0,void 0,void 0,void 0,void 0,!0),this.pushAxisItem(f);this.gridAlpha=z}},choosePeriod:function(a){var b=d.getPeriodDuration(this.periods[a].period,this.periods[a].count),c=this.periods;return this.timeDifference<b&&0<a?c[a-1]:Math.ceil(this.timeDifference/b)<=this.gridCountR?c[a]:a+1<c.length?this.choosePeriod(a+1):c[a]},getStepWidth:function(a){var b;this.startOnAxis?(b=this.axisWidth/(a-1),1==a&&(b=this.axisWidth)):b=this.axisWidth/a;return b},timeZoom:function(a,b){this.startTime=a;this.endTime=b},minDuration:function(){var a=d.extractPeriod(this.minPeriod);return d.getPeriodDuration(a.period,a.count)},checkPeriodChange:function(a,b,c,e,h){c=new Date(c);var f=new Date(e),g=this.firstDayOfWeek;e=b;"DD"==a&&(b=1);c=d.resetDateToMin(c,a,b,g).getTime();b=d.resetDateToMin(f,a,b,g).getTime();return"DD"==a&&"hh"!=h&&c-b<d.getPeriodDuration(a,e)-d.getPeriodDuration("hh",1)?!1:c!=b?!0:!1},generateDFObject:function(){this.dateFormatsObject={};var a;for(a=0;a<this.dateFormats.length;a++){var b=this.dateFormats[a];this.dateFormatsObject[b.period]=b.format}},hideBalloon:function(){this.balloon&&this.balloon.hide&&this.balloon.hide();this.prevBY=this.prevBX=NaN},formatBalloonText:function(a){return a},showBalloon:function(a,b,c,e){var d=this.offset;switch(this.position){case"bottom":b=this.height+d;break;case"top":b=-d;break;case"left":a=-d;break;case"right":a=this.width+d}c||(c=this.currentDateFormat);if("V"==this.orientation){if(0>b||b>this.height)return;if(isNaN(b)){this.hideBalloon();return}b=this.adjustBalloonCoordinate(b,e);e=this.coordinateToValue(b)}else{if(0>a||a>this.width)return;if(isNaN(a)){this.hideBalloon();return}a=this.adjustBalloonCoordinate(a,e);e=this.coordinateToValue(a)}var f;if(d=this.chart.chartCursor)f=d.index;if(this.balloon&&void 0!==e&&this.balloon.enabled){if(this.balloonTextFunction){if("date"==this.type||!0===this.parseDates)e=new Date(e);e=this.balloonTextFunction(e)}else this.balloonText?e=this.formatBalloonText(this.balloonText,f,c):isNaN(e)||(e=this.formatValue(e,c));if(a!=this.prevBX||b!=this.prevBY)this.balloon.setPosition(a,b),this.prevBX=a,this.prevBY=b,e&&this.balloon.showBalloon(e)}},adjustBalloonCoordinate:function(a){return a},createBalloon:function(){var a=this.chart,b=a.chartCursor;b&&(b=b.cursorPosition,"mouse"!=b&&(this.stickBalloonToCategory=!0),"start"==b&&(this.stickBalloonToStart=!0),"ValueAxis"==this.cname&&(this.stickBalloonToCategory=!1));this.balloon&&(this.balloon.destroy&&this.balloon.destroy(),d.extend(this.balloon,a.balloon,!0))},setBalloonBounds:function(){var a=this.balloon;if(a){var b=this.chart;a.cornerRadius=0;a.shadowAlpha=0;a.borderThickness=1;a.borderAlpha=1;a.adjustBorderColor=!1;a.showBullet=!1;this.balloon=a;a.chart=b;a.mainSet=b.plotBalloonsSet;a.pointerWidth=this.tickLength;if(this.parseDates||"date"==this.type)a.pointerWidth=0;a.className=this.id;b="V";"V"==this.orientation&&(b="H");this.stickBalloonToCategory||(a.animationDuration=0);var c,e,d,f,g=this.inside,k=this.width,l=this.height;switch(this.position){case"bottom":c=0;e=k;g?(d=0,f=l):(d=l,f=l+1E3);break;case"top":c=0;e=k;g?(d=0,f=l):(d=-1E3,f=0);break;case"left":d=0;f=l;g?(c=0,e=k):(c=-1E3,e=0);break;case"right":d=0,f=l,g?(c=0,e=k):(c=k,e=k+1E3)}a.drop||(a.pointerOrientation=b);a.setBounds(c,d,e,f)}}})})();(function(){var d=window.AmCharts;d.ValueAxis=d.Class({inherits:d.AxisBase,construct:function(a){this.cname="ValueAxis";this.createEvents("axisChanged","logarithmicAxisFailed","axisZoomed","axisIntZoomed");d.ValueAxis.base.construct.call(this,a);this.dataChanged=!0;this.stackType="none";this.position="left";this.unitPosition="right";this.includeAllValues=this.recalculateToPercents=this.includeHidden=this.includeGuidesInMinMax=this.integersOnly=!1;this.durationUnits={DD:"d. ",hh:":",mm:":",ss:""};this.scrollbar=!1;this.baseValue=0;this.radarCategoriesEnabled=!0;this.axisFrequency=1;this.gridType="polygons";this.useScientificNotation=!1;this.axisTitleOffset=10;this.pointPosition="axis";this.minMaxMultiplier=1;this.logGridLimit=2;this.totalTextOffset=this.treatZeroAs=0;this.minPeriod="ss";this.relativeStart=0;this.relativeEnd=1;d.applyTheme(this,a,this.cname)},updateData:function(){0>=this.gridCountR&&(this.gridCountR=1);this.totals=[];this.data=this.chart.chartData;var a=this.chart;"xy"!=a.type&&(this.stackGraphs("smoothedLine"),this.stackGraphs("line"),this.stackGraphs("column"),this.stackGraphs("step"));this.recalculateToPercents&&this.recalculate();if(this.synchronizationMultiplier&&this.synchronizeWith)d.isString(this.synchronizeWith)&&(this.synchronizeWith=a.getValueAxisById(this.synchronizeWith)),this.synchronizeWith&&(this.synchronizeWithAxis(this.synchronizeWith),this.foundGraphs=!0);else if(this.foundGraphs=!1,this.getMinMax(),0===this.start&&this.end==this.data.length-1&&isNaN(this.minZoom)&&isNaN(this.maxZoom)||isNaN(this.fullMin)&&isNaN(this.fullMax))this.fullMin=this.min,this.fullMax=this.max,"date"!=this.type&&this.strictMinMax&&(isNaN(this.minimum)||(this.fullMin=this.minimum),isNaN(this.maximum)||(this.fullMax=this.maximum)),this.logarithmic&&(this.fullMin=this.logMin,0===this.fullMin&&(this.fullMin=this.treatZeroAs)),"date"==this.type&&(this.minimumDate||(this.fullMin=this.minRR),this.maximumDate||(this.fullMax=this.maxRR),this.strictMinMax&&(this.minimumDate&&(this.fullMin=this.minimumDate.getTime()),this.maximumDate&&(this.fullMax=this.maximumDate.getTime())))},draw:function(){d.ValueAxis.base.draw.call(this);var a=this.chart,b=this.set;this.labelRotationR=this.labelRotation;d.setCN(a,this.set,"value-axis value-axis-"+this.id);d.setCN(a,this.labelsSet,"value-axis value-axis-"+this.id);d.setCN(a,this.axisLine.axisSet,"value-axis value-axis-"+this.id);var c=this.type;"duration"==c&&(this.duration="ss");!0===this.dataChanged&&(this.updateData(),this.dataChanged=!1);"date"==c&&(this.logarithmic=!1,this.min=this.minRR,this.max=this.maxRR,this.reversed=!1,this.getDateMinMax());if(this.logarithmic){var e=this.treatZeroAs,h=this.getExtremes(0,this.data.length-1).min;!isNaN(this.minimum)&&this.minimum<h&&(h=this.minimum);this.logMin=h;this.minReal<h&&(this.minReal=h);isNaN(this.minReal)&&(this.minReal=h);0<e&&0===h&&(this.minReal=h=e);if(0>=h||0>=this.minimum){this.fire({type:"logarithmicAxisFailed",chart:a});return}}this.grid0=null;var f,g,k=a.dx,l=a.dy,e=!1,h=this.logarithmic;if(isNaN(this.min)||isNaN(this.max)||!this.foundGraphs||Infinity==this.min||-Infinity==this.max)e=!0;else{"date"==this.type&&this.min==this.max&&(this.max+=this.minDuration(),this.min-=this.minDuration());var m=this.labelFrequency,p=this.showFirstLabel,q=this.showLastLabel,n=1,t=0;this.minCalc=this.min;this.maxCalc=this.max;if(this.strictMinMax&&(isNaN(this.minimum)||(this.min=this.minimum),isNaN(this.maximum)||(this.max=this.maximum),this.min==this.max))return;isNaN(this.minZoom)||(this.minReal=this.min=this.minZoom);isNaN(this.maxZoom)||(this.max=this.maxZoom);if(this.logarithmic){g=this.fullMin;var r=this.fullMax;isNaN(this.minimum)||(g=this.minimum);isNaN(this.maximum)||(r=this.maximum);var r=Math.log(r)*Math.LOG10E-Math.log(g)*Math.LOG10E,w=Math.log(this.max)/Math.LN10-Math.log(g)*Math.LOG10E;this.relativeStart=d.roundTo((Math.log(this.minReal)/Math.LN10-Math.log(g)*Math.LOG10E)/r,5);this.relativeEnd=d.roundTo(w/r,5)}else this.relativeStart=d.roundTo(d.fitToBounds((this.min-this.fullMin)/(this.fullMax-this.fullMin),0,1),5),this.relativeEnd=d.roundTo(d.fitToBounds((this.max-this.fullMin)/(this.fullMax-this.fullMin),0,1),5);var r=Math.round((this.maxCalc-this.minCalc)/this.step)+1,z;!0===h?(z=Math.log(this.max)*Math.LOG10E-Math.log(this.minReal)*Math.LOG10E,this.stepWidth=this.axisWidth/z,z>this.logGridLimit&&(r=Math.ceil(Math.log(this.max)*Math.LOG10E)+1,t=Math.round(Math.log(this.minReal)*Math.LOG10E),r>this.gridCountR&&(n=Math.ceil(r/this.gridCountR)))):this.stepWidth=this.axisWidth/(this.max-this.min);var x=0;1>this.step&&-1<this.step&&(x=d.getDecimals(this.step));this.integersOnly&&(x=0);x>this.maxDecCount&&(x=this.maxDecCount);w=this.precision;isNaN(w)||(x=w);isNaN(this.maxZoom)&&(this.max=d.roundTo(this.max,this.maxDecCount),this.min=d.roundTo(this.min,this.maxDecCount));g={};g.precision=x;g.decimalSeparator=a.nf.decimalSeparator;g.thousandsSeparator=a.nf.thousandsSeparator;this.numberFormatter=g;var u;this.exponential=!1;for(g=t;g<r;g+=n){var A=d.roundTo(this.step*g+this.min,x);-1!=String(A).indexOf("e")&&(this.exponential=!0)}this.duration&&(this.maxInterval=d.getMaxInterval(this.max,this.duration));var x=this.step,y,A=this.minorGridAlpha;this.minorGridEnabled&&(y=this.getMinorGridStep(x,this.stepWidth*x));if(this.autoGridCount||0!==this.gridCount)if("date"==c)this.generateDFObject(),this.timeDifference=this.max-this.min,this.maxTime=this.lastTime=this.max,this.startTime=this.firstTime=this.min,this.parseDatesDraw();else for(r>=this.autoRotateCount&&!isNaN(this.autoRotateAngle)&&(this.labelRotationR=this.autoRotateAngle),c=this.minCalc,h&&(r++,c=this.maxCalc-r*x),this.gridCountReal=r,g=this.startCount=t;g<r;g+=n)if(t=x*g+c,t=d.roundTo(t,this.maxDecCount+1),!this.integersOnly||Math.round(t)==t)if(isNaN(w)||Number(d.toFixed(t,w))==t){if(!0===h)if(z>this.logGridLimit)t=Math.pow(10,g);else if(0>=t&&(t=c+x*g+x/2,0>=t))continue;u=this.formatValue(t,!1,g);Math.round(g/m)!=g/m&&(u=void 0);if(0===g&&!p||g==r-1&&!q)u=" ";f=this.getCoordinate(t);var B;this.rotate&&this.autoWrap&&(B=this.stepWidth*x-10);u=new this.axisItemRenderer(this,f,u,void 0,B,void 0,void 0,this.boldLabels);this.pushAxisItem(u);if(t==this.baseValue&&"radar"!=a.type){var D,C,I=this.width,H=this.height;"H"==this.orientation?0<=f&&f<=I+1&&(D=[f,f,f+k],C=[H,0,l]):0<=f&&f<=H+1&&(D=[0,I,I+k],C=[f,f,f+l]);D&&(f=d.fitToBounds(2*this.gridAlpha,0,1),isNaN(this.zeroGridAlpha)||(f=this.zeroGridAlpha),f=d.line(a.container,D,C,this.gridColor,f,1,this.dashLength),f.translate(this.x,this.y),this.grid0=f,a.axesSet.push(f),f.toBack(),d.setCN(a,f,this.bcn+"zero-grid-"+this.id),d.setCN(a,f,this.bcn+"zero-grid"))}if(!isNaN(y)&&0<A&&g<r-1){f=x/y;h&&(y=x*(g+n)+this.minCalc,y=d.roundTo(y,this.maxDecCount+1),z>this.logGridLimit&&(y=Math.pow(10,g+n)),f=9,y=(y-t)/f);I=this.gridAlpha;this.gridAlpha=this.minorGridAlpha;for(H=1;H<f;H++){var Q=this.getCoordinate(t+y*H),Q=new this.axisItemRenderer(this,Q,"",!1,0,0,!1,!1,0,!0);this.pushAxisItem(Q)}this.gridAlpha=I}}z=this.guides;B=z.length;if(0<B){D=this.fillAlpha;for(g=this.fillAlpha=0;g<B;g++)C=z[g],k=NaN,y=C.above,isNaN(C.toValue)||(k=this.getCoordinate(C.toValue),u=new this.axisItemRenderer(this,k,"",!0,NaN,NaN,C),this.pushAxisItem(u,y)),l=NaN,isNaN(C.value)||(l=this.getCoordinate(C.value),u=new this.axisItemRenderer(this,l,C.label,!0,NaN,(k-l)/2,C),this.pushAxisItem(u,y)),isNaN(k)&&(l-=3,k=l+3),u&&(m=u.label)&&this.addEventListeners(m,C),isNaN(k-l)||0>l&&0>k||(k=new this.guideFillRenderer(this,l,k,C),this.pushAxisItem(k,y),y=k.graphics(),C.graphics=y,this.addEventListeners(y,C));this.fillAlpha=D}u=this.baseValue;this.min>this.baseValue&&this.max>this.baseValue&&(u=this.min);this.min<this.baseValue&&this.max<this.baseValue&&(u=this.max);h&&u<this.minReal&&(u=this.minReal);this.baseCoord=this.getCoordinate(u,!0);u={type:"axisChanged",target:this,chart:a};u.min=h?this.minReal:this.min;u.max=this.max;this.fire(u);this.axisCreated=!0}h=this.axisLine.set;u=this.labelsSet;b.translate(this.x,this.y);u.translate(this.x,this.y);this.positionTitle();"radar"!=a.type&&h.toFront();!this.visible||e?(b.hide(),h.hide(),u.hide()):(b.show(),h.show(),u.show());this.axisY=this.y;this.axisX=this.x},getDateMinMax:function(){this.minimumDate&&(this.minimumDate instanceof Date||(this.minimumDate=d.getDate(this.minimumDate,this.chart.dataDateFormat,"fff")),this.min=this.minimumDate.getTime());this.maximumDate&&(this.maximumDate instanceof Date||(this.maximumDate=d.getDate(this.maximumDate,this.chart.dataDateFormat,"fff")),this.max=this.maximumDate.getTime())},formatValue:function(a,b,c){var e=this.exponential,h=this.logarithmic,f=this.numberFormatter,g=this.chart;if(f)return!0===this.logarithmic&&(e=-1!=String(a).indexOf("e")?!0:!1),this.useScientificNotation&&(e=!0),this.usePrefixes&&(e=!1),e?(c=-1==String(a).indexOf("e")?a.toExponential(15):String(a),e=c.split("e"),c=Number(e[0]),e=Number(e[1]),c=d.roundTo(c,14),b||isNaN(this.precision)||(c=d.roundTo(c,this.precision)),10==c&&(c=1,e+=1),c=c+"e"+e,0===a&&(c="0"),1==a&&(c="1")):(h&&(e=String(a).split("."),e[1]?(f.precision=e[1].length,0>c&&(f.precision=Math.abs(c)),b&&1<a&&(f.precision=0),b||isNaN(this.precision)||(f.precision=this.precision)):f.precision=-1),c=this.usePrefixes?d.addPrefix(a,g.prefixesOfBigNumbers,g.prefixesOfSmallNumbers,f,!b):d.formatNumber(a,f,f.precision)),this.duration&&(b&&(f.precision=0),c=d.formatDuration(a,this.duration,"",this.durationUnits,this.maxInterval,f)),"date"==this.type&&(c=d.formatDate(new Date(a),this.currentDateFormat,g)),this.recalculateToPercents?c+="%":(b=this.unit)&&(c="left"==this.unitPosition?b+c:c+b),this.labelFunction&&(c="date"==this.type?this.labelFunction(c,new Date(a),this).toString():this.labelFunction(a,c,this).toString()),c},getMinorGridStep:function(a,b){var c=[5,4,2];60>b&&c.shift();for(var e=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),d=0;d<c.length;d++){var f=a/c[d],g=Math.floor(Math.log(Math.abs(f))*Math.LOG10E);if(!(1<Math.abs(e-g)))if(1>a){if(g=Math.pow(10,-g)*f,g==Math.round(g))return f}else if(f==Math.round(f))return f}},stackGraphs:function(a){var b=this.stackType;"stacked"==b&&(b="regular");"line"==b&&(b="none");"100% stacked"==b&&(b="100%");this.stackType=b;var c=[],e=[],h=[],f=[],g,k=this.chart.graphs,l,m,p,q,n,t=this.baseValue,r=!1;if("line"==a||"step"==a||"smoothedLine"==a)r=!0;if(r&&("regular"==b||"100%"==b))for(q=0;q<k.length;q++)p=k[q],p.stackGraph=null,p.hidden||(m=p.type,p.chart==this.chart&&p.valueAxis==this&&a==m&&p.stackable&&(l&&(p.stackGraph=l),l=p));p=this.start-10;l=this.end+10;q=this.data.length-1;p=d.fitToBounds(p,0,q);l=d.fitToBounds(l,0,q);for(n=p;n<=l;n++){var w=0;for(q=0;q<k.length;q++)if(p=k[q],p.hidden)p.newStack&&(h[n]=NaN,e[n]=NaN);else if(m=p.type,p.chart==this.chart&&p.valueAxis==this&&a==m&&p.stackable)if(m=this.data[n].axes[this.id].graphs[p.id],g=m.values.value,isNaN(g))p.newStack&&(h[n]=NaN,e[n]=NaN);else{var z=d.getDecimals(g);w<z&&(w=z);isNaN(f[n])?f[n]=Math.abs(g):f[n]+=Math.abs(g);f[n]=d.roundTo(f[n],w);z=p.fillToGraph;r&&z&&(z=this.data[n].axes[this.id].graphs[z.id])&&(m.values.open=z.values.value);"regular"==b&&(r&&(isNaN(c[n])?(c[n]=g,m.values.close=g,m.values.open=this.baseValue):(isNaN(g)?m.values.close=c[n]:m.values.close=g+c[n],m.values.open=c[n],c[n]=m.values.close)),"column"==a&&(p.newStack&&(h[n]=NaN,e[n]=NaN),m.values.close=g,0>g?(m.values.close=g,isNaN(e[n])?m.values.open=t:(m.values.close+=e[n],m.values.open=e[n]),e[n]=m.values.close):(m.values.close=g,isNaN(h[n])?m.values.open=t:(m.values.close+=h[n],m.values.open=h[n]),h[n]=m.values.close)))}}for(n=this.start;n<=this.end;n++)for(q=0;q<k.length;q++)(p=k[q],p.hidden)?p.newStack&&(h[n]=NaN,e[n]=NaN):(m=p.type,p.chart==this.chart&&p.valueAxis==this&&a==m&&p.stackable&&(m=this.data[n].axes[this.id].graphs[p.id],g=m.values.value,isNaN(g)||(c=g/f[n]*100,m.values.percents=c,m.values.total=f[n],p.newStack&&(h[n]=NaN,e[n]=NaN),"100%"==b&&(isNaN(e[n])&&(e[n]=0),isNaN(h[n])&&(h[n]=0),0>c?(m.values.close=d.fitToBounds(c+e[n],-100,100),m.values.open=e[n],e[n]=m.values.close):(m.values.close=d.fitToBounds(c+h[n],-100,100),m.values.open=h[n],h[n]=m.values.close)))))},recalculate:function(){var a=this.chart,b=a.graphs,c;for(c=0;c<b.length;c++){var e=b[c];if(e.valueAxis==this){var h="value";if("candlestick"==e.type||"ohlc"==e.type)h="open";var f,g,k=this.end+2,k=d.fitToBounds(this.end+1,0,this.data.length-1),l=this.start;0<l&&l--;var m;g=this.start;e.compareFromStart&&(g=0);if(!isNaN(a.startTime)&&(m=a.categoryAxis)){var p=m.minDuration(),p=new Date(a.startTime+p/2),q=d.resetDateToMin(new Date(a.startTime),m.minPeriod).getTime();d.resetDateToMin(new Date(p),m.minPeriod).getTime()>q&&g++}if(m=a.recalculateFromDate)m=d.getDate(m,a.dataDateFormat,"fff"),g=a.getClosestIndex(a.chartData,"time",m.getTime(),!0,0,a.chartData.length),k=a.chartData.length-1;for(m=g;m<=k&&(g=this.data[m].axes[this.id].graphs[e.id],f=g.values[h],e.recalculateValue&&(f=g.dataContext[e.valueField+e.recalculateValue]),isNaN(f));m++);this.recBaseValue=f;for(h=l;h<=k;h++){g=this.data[h].axes[this.id].graphs[e.id];g.percents={};var l=g.values,n;for(n in l)g.percents[n]="percents"!=n?l[n]/f*100-100:l[n]}}}},getMinMax:function(){var a=!1,b=this.chart,c=b.graphs,e;for(e=0;e<c.length;e++){var h=c[e].type;("line"==h||"step"==h||"smoothedLine"==h)&&this.expandMinMax&&(a=!0)}a&&(0<this.start&&this.start--,this.end<this.data.length-1&&this.end++);"serial"==b.type&&(!0!==b.categoryAxis.parseDates||a||this.end<this.data.length-1&&this.end++);this.includeAllValues&&(this.start=0,this.end=this.data.length-1);a=this.minMaxMultiplier;b=this.getExtremes(this.start,this.end);this.min=b.min;this.max=b.max;this.minRR=this.min;this.maxRR=this.max;a=(this.max-this.min)*(a-1);this.min-=a;this.max+=a;a=this.guides.length;if(this.includeGuidesInMinMax&&0<a)for(b=0;b<a;b++)c=this.guides[b],c.toValue<this.min&&(this.min=c.toValue),c.value<this.min&&(this.min=c.value),c.toValue>this.max&&(this.max=c.toValue),c.value>this.max&&(this.max=c.value);isNaN(this.minimum)||(this.min=this.minimum);isNaN(this.maximum)||(this.max=this.maximum);"date"==this.type&&this.getDateMinMax();this.min>this.max&&(a=this.max,this.max=this.min,this.min=a);isNaN(this.minZoom)||(this.min=this.minZoom);isNaN(this.maxZoom)||(this.max=this.maxZoom);this.minCalc=this.min;this.maxCalc=this.max;this.minReal=this.min;this.maxReal=this.max;0===this.min&&0===this.max&&(this.max=9);this.min>this.max&&(this.min=this.max-1);a=this.min;b=this.max;c=this.max-this.min;e=0===c?Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10:Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;isNaN(this.maximum)&&(this.max=Math.ceil(this.max/e)*e+e);isNaN(this.minimum)&&(this.min=Math.floor(this.min/e)*e-e);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);"100%"==this.stackType&&(this.min=0>this.min?-100:0,this.max=0>this.max?0:100);c=this.max-this.min;e=Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;this.step=Math.ceil(c/this.gridCountR/e)*e;c=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));c=d.fixStepE(c);e=Math.ceil(this.step/c);5<e&&(e=10);5>=e&&2<e&&(e=5);this.step=Math.ceil(this.step/(c*e))*c*e;isNaN(this.setStep)||(this.step=this.setStep);1>c?(this.maxDecCount=Math.abs(Math.log(Math.abs(c))*Math.LOG10E),this.maxDecCount=Math.round(this.maxDecCount),this.step=d.roundTo(this.step,this.maxDecCount+1)):this.maxDecCount=0;this.min=this.step*Math.floor(this.min/this.step);this.max=this.step*Math.ceil(this.max/this.step);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);1<this.minReal&&1<this.max-this.minReal&&(this.minReal=Math.floor(this.minReal));c=Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E));0===this.min&&(this.minReal=c);0===this.min&&1<this.minReal&&(this.minReal=1);0<this.min&&0<this.minReal-this.step&&(this.minReal=this.min+this.step<this.minReal?this.min+this.step:this.min);this.logarithmic&&(2<Math.log(b)*Math.LOG10E-Math.log(a)*Math.LOG10E?(this.minReal=this.min=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E)),this.maxReal=this.max=Math.pow(10,Math.ceil(Math.log(Math.abs(b))*Math.LOG10E))):(a=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E))/10,Math.pow(10,Math.floor(Math.log(Math.abs(this.min))*Math.LOG10E))/10<a&&(this.minReal=this.min=10*a)))},getExtremes:function(a,b){var c,e,d;for(d=a;d<=b;d++){var f=this.data[d].axes[this.id].graphs,g;for(g in f)if(f.hasOwnProperty(g)){var k=this.chart.graphsById[g];if(k.includeInMinMax&&(!k.hidden||this.includeHidden)){isNaN(c)&&(c=Infinity);isNaN(e)&&(e=-Infinity);this.foundGraphs=!0;k=f[g].values;this.recalculateToPercents&&(k=f[g].percents);var l;if(this.minMaxField)l=k[this.minMaxField],l<c&&(c=l),l>e&&(e=l);else for(var m in k)k.hasOwnProperty(m)&&"percents"!=m&&"total"!=m&&"error"!=m&&(l=k[m],l<c&&(c=l),l>e&&(e=l))}}}return{min:c,max:e}},zoomOut:function(a){this.maxZoom=this.minZoom=NaN;this.zoomToRelativeValues(0,1,a)},zoomToRelativeValues:function(a,b,c){if(this.reversed){var e=a;a=1-b;b=1-e}var d=this.fullMax,e=this.fullMin,f=e+(d-e)*a,g=e+(d-e)*b;0<=this.minimum&&0>f&&(f=0);this.logarithmic&&(isNaN(this.minimum)||(e=this.minimum),isNaN(this.maximum)||(d=this.maximum),d=Math.log(d)*Math.LOG10E-Math.log(e)*Math.LOG10E,f=Math.pow(10,d*a+
Math.log(e)*Math.LOG10E),g=Math.pow(10,d*b+Math.log(e)*Math.LOG10E));return this.zoomToValues(f,g,c)},zoomToValues:function(a,b,c){if(b<a){var e=b;b=a;a=e}var h=this.fullMax,e=this.fullMin;this.relativeStart=d.roundTo((a-e)/(h-e),9);this.relativeEnd=d.roundTo((b-e)/(h-e),9);if(this.logarithmic){isNaN(this.minimum)||(e=this.minimum);isNaN(this.maximum)||(h=this.maximum);var h=Math.log(h)*Math.LOG10E-Math.log(e)*Math.LOG10E,f=Math.log(b)/Math.LN10-Math.log(e)*Math.LOG10E;this.relativeStart=d.roundTo((Math.log(a)/Math.LN10-Math.log(e)*Math.LOG10E)/h,9);this.relativeEnd=d.roundTo(f/h,9)}if(this.minZoom!=a||this.maxZoom!=b)return this.minZoom=a,this.maxZoom=b,e={type:"axisZoomed"},e.chart=this.chart,e.valueAxis=this,e.startValue=a,e.endValue=b,e.relativeStart=this.relativeStart,e.relativeEnd=this.relativeEnd,this.prevStartValue==a&&this.prevEndValue==b||this.fire(e),this.prevStartValue=a,this.prevEndValue=b,c||(a={},d.copyProperties(e,a),a.type="axisIntZoomed",this.fire(a)),0===this.relativeStart&&1==this.relativeEnd&&(this.maxZoom=this.minZoom=NaN),!0},coordinateToValue:function(a){if(isNaN(a))return NaN;var b=this.axisWidth,c=this.stepWidth,e=this.reversed,d=this.rotate,f=this.min,g=this.minReal;return!0===this.logarithmic?Math.pow(10,(d?!0===e?(b-a)/c:a/c:!0===e?a/c:(b-a)/c)+Math.log(g)*Math.LOG10E):!0===e?d?f-(a-b)/c:a/c+f:d?a/c+f:f-(a-b)/c},getCoordinate:function(a,b){if(isNaN(a))return NaN;var c=this.rotate,e=this.reversed,d=this.axisWidth,f=this.stepWidth,g=this.min,k=this.minReal;!0===this.logarithmic?(0===a&&(a=this.treatZeroAs),g=Math.log(a)*Math.LOG10E-Math.log(k)*Math.LOG10E,c=c?!0===e?d-f*g:f*g:!0===e?f*g:d-f*g):c=!0===e?c?d-f*(a-g):f*(a-g):c?f*(a-g):d-f*(a-g);1E7<Math.abs(c)&&(c=c/Math.abs(c)*1E7);b||(c=Math.round(c));return c},synchronizeWithAxis:function(a){this.synchronizeWith=a;this.listenTo(this.synchronizeWith,"axisChanged",this.handleSynchronization)},handleSynchronization:function(){if(this.synchronizeWith){d.isString(this.synchronizeWith)&&(this.synchronizeWith=this.chart.getValueAxisById(this.synchronizeWith));var a=this.synchronizeWith,b=a.min,c=a.max,a=a.step,e=this.synchronizationMultiplier;e&&(this.min=b*e,this.max=c*e,this.step=a*e,b=Math.abs(Math.log(Math.abs(Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E))))*Math.LOG10E),this.maxDecCount=b=Math.round(b),this.draw())}}})})();(function(){var d=window.AmCharts;d.RecAxis=d.Class({construct:function(a){var b=a.chart,c=a.axisThickness,e=a.axisColor,h=a.axisAlpha,f=a.offset,g=a.dx,k=a.dy,l=a.x,m=a.y,p=a.height,q=a.width,n=b.container;"H"==a.orientation?(e=d.line(n,[0,q],[0,0],e,h,c),this.axisWidth=a.width,"bottom"==a.position?(k=c/2+f+p+m-1,c=l):(k=-c/2-f+m+k,c=g+l)):(this.axisWidth=a.height,"right"==a.position?(e=d.line(n,[0,0,-g],[0,p,p-k],e,h,c),k=m+k,c=c/2+f+g+q+l-1):(e=d.line(n,[0,0],[0,p],e,h,c),k=m,c=-c/2-f+l));e.translate(c,k);c=b.container.set();c.push(e);b.axesSet.push(c);d.setCN(b,e,a.bcn+"line");this.axisSet=c;this.set=e}})})();(function(){var d=window.AmCharts;d.RecItem=d.Class({construct:function(a,b,c,e,h,f,g,k,l,m,p,q){b=Math.round(b);var n=a.chart;this.value=c;void 0==c&&(c="");l||(l=0);void 0==e&&(e=!0);var t=n.fontFamily,r=a.fontSize;void 0==r&&(r=n.fontSize);var w=a.color;void 0==w&&(w=n.color);void 0!==p&&(w=p);var z=a.chart.container,x=z.set();this.set=x;var u=a.axisThickness,A=a.axisColor,y=a.axisAlpha,B=a.tickLength,D=a.gridAlpha,C=a.gridThickness,I=a.gridColor,H=a.dashLength,Q=a.fillColor,M=a.fillAlpha,P=a.labelsEnabled;p=a.labelRotationR;var ia=a.counter,J=a.inside,aa=a.labelOffset,ma=a.dx,na=a.dy,Pa=a.orientation,Z=a.position,da=a.previousCoord,X=a.height,xa=a.width,ea=a.offset,fa,Ba;g?(void 0!==g.id&&(q=n.classNamePrefix+"-guide-"+g.id),P=!0,isNaN(g.tickLength)||(B=g.tickLength),void 0!=g.lineColor&&(I=g.lineColor),void 0!=g.color&&(w=g.color),isNaN(g.lineAlpha)||(D=g.lineAlpha),isNaN(g.dashLength)||(H=g.dashLength),isNaN(g.lineThickness)||(C=g.lineThickness),!0===g.inside&&(J=!0,0<ea&&(ea=0)),isNaN(g.labelRotation)||(p=g.labelRotation),isNaN(g.fontSize)||(r=g.fontSize),g.position&&(Z=g.position),void 0!==g.boldLabel&&(k=g.boldLabel),isNaN(g.labelOffset)||(aa=g.labelOffset)):""===c&&(B=0);m&&!isNaN(a.minorTickLength)&&(B=a.minorTickLength);var ga="start";0<h&&(ga="middle");a.centerLabels&&(ga="middle");var V=p*Math.PI/180,Y,Da,G=0,v=0,oa=0,ha=Y=0,Qa=0;"V"==Pa&&(p=0);var ca;P&&""!==c&&(ca=a.autoWrap&&0===p?d.wrappedText(z,c,w,t,r,ga,k,Math.abs(h),0):d.text(z,c,w,t,r,ga,k),ga=ca.getBBox(),ha=ga.width,Qa=ga.height);if("H"==Pa){if(0<=b&&b<=xa+1&&(0<B&&0<y&&b+l<=xa+1&&(fa=d.line(z,[b+l,b+l],[0,B],A,y,C),x.push(fa)),0<D&&(Ba=d.line(z,[b,b+ma,b+ma],[X,X+na,na],I,D,C,H),x.push(Ba))),v=0,G=b,g&&90==p&&J&&(G-=r),!1===e?(ga="start",v="bottom"==Z?J?v+B:v-B:J?v-B:v+B,G+=3,0<h&&(G+=h/2-3,ga="middle"),0<p&&(ga="middle")):ga="middle",1==ia&&0<M&&!g&&!m&&da<xa&&(e=d.fitToBounds(b,0,xa),da=d.fitToBounds(da,0,xa),Y=e-da,0<Y&&(Da=d.rect(z,Y,a.height,Q,M),Da.translate(e-Y+ma,na),x.push(Da))),"bottom"==Z?(v+=X+r/2+ea,J?(0<p?(v=X-ha/2*Math.sin(V)-B-3,a.centerRotatedLabels||(G+=ha/2*Math.cos(V)-4+2)):0>p?(v=X+ha*Math.sin(V)-B-3+2,G+=-ha*Math.cos(V)-Qa*Math.sin(V)-4):v-=B+r+3+3,v-=aa):(0<p?(v=X+ha/2*Math.sin(V)+B+3,a.centerRotatedLabels||(G-=ha/2*Math.cos(V))):0>p?(v=X+B+3-ha/2*Math.sin(V)+2,G+=ha/2*Math.cos(V)):v+=B+u+3+3,v+=aa)):(v+=na+r/2-ea,G+=ma,J?(0<p?(v=ha/2*Math.sin(V)+B+3,a.centerRotatedLabels||(G-=ha/2*Math.cos(V))):v+=B+3,v+=aa):(0<p?(v=-(ha/2)*Math.sin(V)-B-6,a.centerRotatedLabels||(G+=ha/2*Math.cos(V))):v-=B+
r+3+u+3,v-=aa)),"bottom"==Z?Y=(J?X-B-1:X+u-1)+ea:(oa=ma,Y=(J?na:na-B-u+1)-ea),f&&(G+=f),r=G,0<p&&(r+=ha/2*Math.cos(V)),ca&&(f=0,J&&(f=ha/2*Math.cos(V)),r+f>xa+2||0>r))ca.remove(),ca=null}else{0<=b&&b<=X+1&&(0<B&&0<y&&b+l<=X+1&&(fa=d.line(z,[0,B+1],[b+l,b+l],A,y,C),x.push(fa)),0<D&&(Ba=d.line(z,[0,ma,xa+ma],[b,b+na,b+na],I,D,C,H),x.push(Ba)));ga="end";if(!0===J&&"left"==Z||!1===J&&"right"==Z)ga="start";v=b-Qa/2+2;1==ia&&0<M&&!g&&!m&&(e=d.fitToBounds(b,0,X),da=d.fitToBounds(da,0,X),V=e-da,Da=d.polygon(z,[0,a.width,a.width,0],[0,0,V,V],Q,M),Da.translate(ma,e-V+na),x.push(Da));v+=r/2;"right"==Z?(G+=ma+xa+ea,v+=na,J?(f||(v-=r/2+3),G=G-(B+4)-aa):(G+=B+4+u,v-=2,G+=aa)):J?(G+=B+4-ea,f||(v-=r/2+3),g&&(G+=ma,v+=na),G+=aa):(G+=-B-u-4-2-ea,v-=2,G-=aa);fa&&("right"==Z?(oa+=ma+ea+xa-1,Y+=na,oa=J?oa-u:oa+u):(oa-=ea,J||(oa-=B+u)));f&&(v+=f);J=-3;"right"==Z&&(J+=na);ca&&(v>X+1||v<J-r/10)&&(ca.remove(),ca=null)}fa&&(fa.translate(oa,Y),d.setCN(n,fa,a.bcn+"tick"),d.setCN(n,fa,q,!0),g&&d.setCN(n,fa,"guide"));!1===a.visible&&(fa&&fa.remove(),ca&&(ca.remove(),ca=null));ca&&(ca.attr({"text-anchor":ga}),ca.translate(G,v,NaN,!0),0!==p&&ca.rotate(-p,a.chart.backgroundColor),a.allLabels.push(ca),this.label=ca,d.setCN(n,ca,a.bcn+"label"),d.setCN(n,ca,q,!0),g&&d.setCN(n,ca,"guide"));Ba&&(d.setCN(n,Ba,a.bcn+"grid"),d.setCN(n,Ba,q,!0),g&&d.setCN(n,Ba,"guide"));Da&&(d.setCN(n,Da,a.bcn+"fill"),d.setCN(n,Da,q,!0));m?Ba&&d.setCN(n,Ba,a.bcn+"grid-minor"):(a.counter=0===ia?1:0,a.previousCoord=b);0===this.set.node.childNodes.length&&this.set.remove()},graphics:function(){return this.set},getLabel:function(){return this.label}})})();(function(){var d=window.AmCharts;d.RecFill=d.Class({construct:function(a,b,c,e){var h=a.dx,f=a.dy,g=a.orientation,k=0;if(c<b){var l=b;b=c;c=l}var m=e.fillAlpha;isNaN(m)&&(m=0);var l=a.chart.container,p=e.fillColor;"V"==g?(b=d.fitToBounds(b,0,a.height),c=d.fitToBounds(c,0,a.height)):(b=d.fitToBounds(b,0,a.width),c=d.fitToBounds(c,0,a.width));c-=b;isNaN(c)&&(c=4,k=2,m=0);0>c&&"object"==typeof p&&(p=p.join(",").split(",").reverse());"V"==g?(g=d.rect(l,a.width,c,p,m),g.translate(h,b-k+f)):(g=d.rect(l,c,a.height,p,m),g.translate(b-k+h,f));d.setCN(a.chart,g,"guide-fill");e.id&&d.setCN(a.chart,g,"guide-fill-"+e.id);this.set=l.set([g])},graphics:function(){return this.set},getLabel:function(){}})})();(function(){var d=window.AmCharts;d.AmChart=d.Class({construct:function(a){this.svgIcons=this.tapToActivate=!0;this.theme=a;this.classNamePrefix="amcharts";this.addClassNames=!1;this.version="3.21.5";d.addChart(this);this.createEvents("buildStarted","dataUpdated","init","rendered","drawn","failed","resized","animationFinished");this.height=this.width="100%";this.dataChanged=!0;this.chartCreated=!1;this.previousWidth=this.previousHeight=0;this.backgroundColor="#FFFFFF";this.borderAlpha=this.backgroundAlpha=0;this.color=this.borderColor="#000000";this.fontFamily="Verdana";this.fontSize=11;this.usePrefixes=!1;this.autoResize=!0;this.autoDisplay=!1;this.addCodeCredits=this.accessible=!0;this.touchStartTime=this.touchClickDuration=0;this.precision=-1;this.percentPrecision=2;this.decimalSeparator=".";this.thousandsSeparator=",";this.labels=[];this.allLabels=[];this.titles=[];this.marginRight=this.marginLeft=this.autoMarginOffset=0;this.timeOuts=[];this.creditsPosition="top-left";var b=document.createElement("div"),c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.chartDiv=b;b=document.createElement("div");c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.legendDiv=b;this.titleHeight=0;this.hideBalloonTime=150;this.handDrawScatter=2;this.cssScale=this.handDrawThickness=1;this.cssAngle=0;this.prefixesOfBigNumbers=[{number:1E3,prefix:"k"},{number:1E6,prefix:"M"},{number:1E9,prefix:"G"},{number:1E12,prefix:"T"},{number:1E15,prefix:"P"},{number:1E18,prefix:"E"},{number:1E21,prefix:"Z"},{number:1E24,prefix:"Y"}];this.prefixesOfSmallNumbers=[{number:1E-24,prefix:"y"},{number:1E-21,prefix:"z"},{number:1E-18,prefix:"a"},{number:1E-15,prefix:"f"},{number:1E-12,prefix:"p"},{number:1E-9,prefix:"n"},{number:1E-6,prefix:"\u03bc"},{number:.001,prefix:"m"}];this.panEventsEnabled=!0;this.product="amcharts";this.animations=[];this.balloon=new d.AmBalloon(this.theme);this.balloon.chart=this;this.processTimeout=0;this.processCount=1E3;this.animatable=[];this.langObj={};d.applyTheme(this,a,"AmChart")},drawChart:function(){0<this.realWidth&&0<this.realHeight&&(this.drawBackground(),this.redrawLabels(),this.drawTitles(),this.brr(),this.renderFix(),this.chartDiv&&(this.boundingRect=this.chartDiv.getBoundingClientRect()))},makeAccessible:function(a,b,c){this.accessible&&a&&(c&&a.setAttr("role",c),a.setAttr("aria-label",b))},drawBackground:function(){d.remove(this.background);var a=this.container,b=this.backgroundColor,c=this.backgroundAlpha,e=this.set;d.isModern||0!==c||(c=.001);var h=this.updateWidth();this.realWidth=h;var f=this.updateHeight();this.realHeight=f;b=d.polygon(a,[0,h-1,h-1,0],[0,0,f-1,f-1],b,c,1,this.borderColor,this.borderAlpha);d.setCN(this,b,"bg");this.background=b;e.push(b);if(b=this.backgroundImage)a=a.image(b,0,0,h,f),d.setCN(this,b,"bg-image"),this.bgImg=a,e.push(a)},drawTitles:function(a){var b=this.titles;this.titleHeight=0;if(d.ifArray(b)){var c=20,e;for(e=0;e<b.length;e++){var h=b[e],h=d.processObject(h,d.Title,this.theme);if(!1!==h.enabled){var f=h.color;void 0===f&&(f=this.color);var g=h.size;isNaN(g)&&(g=this.fontSize+2);isNaN(h.alpha);var k=this.marginLeft,l=!0;void 0!==h.bold&&(l=h.bold);f=d.wrappedText(this.container,h.text,f,this.fontFamily,g,"middle",l,this.realWidth-35-this.marginRight-k);f.translate(k+(this.realWidth-this.marginRight-k)/2,c);f.node.style.pointerEvents="none";h.sprite=f;void 0!==h.tabIndex&&f.setAttr("tabindex",h.tabIndex);d.setCN(this,f,"title");h.id&&d.setCN(this,f,"title-"+h.id);f.attr({opacity:h.alpha});c+=f.getBBox().height+
5;a?f.remove():this.freeLabelsSet.push(f)}}this.titleHeight=c-10}},write:function(a){var b=this;if(b.listeners)for(var c=0;c<b.listeners.length;c++){var e=b.listeners[c];b.addListener(e.event,e.method)}b.fire({type:"buildStarted",chart:b});b.afterWriteTO&&clearTimeout(b.afterWriteTO);0<b.processTimeout?b.afterWriteTO=setTimeout(function(){b.afterWrite.call(b,a)},b.processTimeout):b.afterWrite(a)},afterWrite:function(a){var b;if(b="object"!=typeof a?document.getElementById(a):a){for(;b.firstChild;)b.removeChild(b.firstChild);this.div=b;b.style.overflow="hidden";b.style.textAlign="left";a=this.chartDiv;var c=this.legendDiv,e=this.legend,h=c.style,f=a.style;this.measure();this.previousHeight=this.divRealHeight;this.previousWidth=this.divRealWidth;var g,k=document.createElement("div");g=k.style;g.position="relative";this.containerDiv=k;k.className=this.classNamePrefix+"-main-div";a.className=this.classNamePrefix+"-chart-div";b.appendChild(k);(b=this.exportConfig)&&d.AmExport&&!this.AmExport&&(this.AmExport=new d.AmExport(this,b));this.amExport&&d.AmExport&&(this.AmExport=d.extend(this.amExport,new d.AmExport(this),!0));this.AmExport&&this.AmExport.init&&this.AmExport.init();if(e){e=this.addLegend(e,e.divId);if(e.enabled)switch(h.left=null,h.top=null,h.right=null,f.left=null,f.right=null,f.top=null,h.position="relative",f.position="relative",g.width="100%",g.height="100%",e.position){case"bottom":k.appendChild(a);k.appendChild(c);break;case"top":k.appendChild(c);k.appendChild(a);break;case"absolute":h.position="absolute";f.position="absolute";void 0!==e.left&&(h.left=e.left+"px");void 0!==e.right&&(h.right=e.right+"px");void 0!==e.top&&(h.top=e.top+"px");void 0!==e.bottom&&(h.bottom=e.bottom+"px");e.marginLeft=0;e.marginRight=0;k.appendChild(a);k.appendChild(c);break;case"right":h.position="relative";f.position="absolute";k.appendChild(a);k.appendChild(c);break;case"left":h.position="absolute";f.position="relative";k.appendChild(a);k.appendChild(c);break;case"outside":k.appendChild(a)}else k.appendChild(a);this.prevLegendPosition=e.position}else k.appendChild(a);this.listenersAdded||(this.addListeners(),this.listenersAdded=!0);(this.mouseWheelScrollEnabled||this.mouseWheelZoomEnabled)&&d.addWheelListeners();this.initChart()}},createLabelsSet:function(){d.remove(this.labelsSet);this.labelsSet=this.container.set();this.freeLabelsSet.push(this.labelsSet)},initChart:function(){this.balloon=d.processObject(this.balloon,d.AmBalloon,this.theme);window.AmCharts_path&&(this.path=window.AmCharts_path);void 0===this.path&&(this.path=d.getPath());void 0===this.path&&(this.path="amcharts/");this.path=d.normalizeUrl(this.path);void 0===this.pathToImages&&(this.pathToImages=this.path+"images/");this.initHC||(d.callInitHandler(this),this.initHC=!0);d.applyLang(this.language,this);var a=this.numberFormatter;a&&(isNaN(a.precision)||(this.precision=a.precision),void 0!==a.thousandsSeparator&&(this.thousandsSeparator=a.thousandsSeparator),void 0!==a.decimalSeparator&&(this.decimalSeparator=a.decimalSeparator));(a=this.percentFormatter)&&!isNaN(a.precision)&&(this.percentPrecision=a.precision);this.nf={precision:this.precision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.pf={precision:this.percentPrecision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.destroy();(a=this.container)?(a.container.innerHTML="",a.width=this.realWidth,a.height=this.realHeight,a.addDefs(this),this.chartDiv.appendChild(a.container)):a=new d.AmDraw(this.chartDiv,this.realWidth,this.realHeight,this);this.container=a;this.extension=".png";this.svgIcons&&d.SVG&&(this.extension=".svg");this.checkDisplay();this.checkTransform(this.div);a.chart=this;d.VML||d.SVG?(a.handDrawn=this.handDrawn,a.handDrawScatter=this.handDrawScatter,a.handDrawThickness=this.handDrawThickness,d.remove(this.set),this.set=a.set(),d.remove(this.gridSet),this.gridSet=a.set(),d.remove(this.cursorLineSet),this.cursorLineSet=a.set(),d.remove(this.graphsBehindSet),this.graphsBehindSet=a.set(),d.remove(this.bulletBehindSet),this.bulletBehindSet=a.set(),d.remove(this.columnSet),this.columnSet=a.set(),d.remove(this.graphsSet),this.graphsSet=a.set(),d.remove(this.trendLinesSet),this.trendLinesSet=a.set(),d.remove(this.axesSet),this.axesSet=a.set(),d.remove(this.cursorSet),this.cursorSet=a.set(),d.remove(this.scrollbarsSet),this.scrollbarsSet=a.set(),d.remove(this.bulletSet),this.bulletSet=a.set(),d.remove(this.freeLabelsSet),this.freeLabelsSet=a.set(),d.remove(this.axesLabelsSet),this.axesLabelsSet=a.set(),d.remove(this.balloonsSet),this.balloonsSet=a.set(),d.remove(this.plotBalloonsSet),this.plotBalloonsSet=a.set(),d.remove(this.zoomButtonSet),this.zoomButtonSet=a.set(),d.remove(this.zbSet),this.zbSet=null,d.remove(this.linkSet),this.linkSet=a.set()):this.fire({type:"failed",chart:this})},premeasure:function(){var a=this.div;if(a){try{this.boundingRect=this.chartDiv.getBoundingClientRect()}catch(e){}var b=a.offsetWidth,c=a.offsetHeight;a.clientHeight&&(b=a.clientWidth,c=a.clientHeight);if(b!=this.mw||c!=this.mh)this.mw=b,this.mh=c,this.measure()}},measure:function(){var a=this.div;if(a){var b=this.chartDiv,c=a.offsetWidth,e=a.offsetHeight,h=this.container;a.clientHeight&&(c=a.clientWidth,e=a.clientHeight);var e=Math.round(e),c=Math.round(c),a=Math.round(d.toCoordinate(this.width,c)),f=Math.round(d.toCoordinate(this.height,e));(c!=this.previousWidth||e!=this.previousHeight)&&0<a&&0<f&&(b.style.width=a+"px",b.style.height=f+"px",b.style.padding=0,h&&h.setSize(a,f),this.balloon=d.processObject(this.balloon,d.AmBalloon,this.theme));this.balloon&&this.balloon.setBounds&&this.balloon.setBounds(2,2,a-2,f);this.updateWidth();this.balloon.chart=this;this.realWidth=a;this.realHeight=f;this.divRealWidth=c;this.divRealHeight=e}},checkDisplay:function(){if(this.autoDisplay&&this.container){var a=d.rect(this.container,10,10),b=a.getBBox();0===b.width&&0===b.height&&(this.divRealHeight=this.divRealWidth=this.realHeight=this.realWidth=0,this.previousWidth=this.previousHeight=NaN);a.remove()}},checkTransform:function(a){if(this.autoTransform&&window.getComputedStyle&&a){if(a.style){var b=window.getComputedStyle(a,null);if(b&&(b=b.getPropertyValue("-webkit-transform")||b.getPropertyValue("-moz-transform")||b.getPropertyValue("-ms-transform")||b.getPropertyValue("-o-transform")||b.getPropertyValue("transform"))&&"none"!==b){var c=b.split("(")[1].split(")")[0].split(","),b=c[0],c=c[1],b=Math.sqrt(b*b+c*c);isNaN(b)||(this.cssScale*=b)}}a.parentNode&&this.checkTransform(a.parentNode)}},destroy:function(){this.chartDiv.innerHTML="";this.clearTimeOuts();this.legend&&this.legend.destroy()},clearTimeOuts:function(){var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},clear:function(a){try{document.removeEventListener("touchstart",this.docfn1,!0),document.removeEventListener("touchend",this.docfn2,!0)}catch(b){}d.callMethod("clear",[this.chartScrollbar,this.scrollbarV,this.scrollbarH,this.chartCursor]);this.chartCursor=this.scrollbarH=this.scrollbarV=this.chartScrollbar=null;this.clearTimeOuts();this.container&&(this.container.remove(this.chartDiv),this.container.remove(this.legendDiv));a||d.removeChart(this);if(a=this.div)for(;a.firstChild;)a.removeChild(a.firstChild);this.legend&&this.legend.destroy();this.AmExport&&this.AmExport.clear&&this.AmExport.clear()},setMouseCursor:function(a){"auto"==a&&d.isNN&&(a="default");this.chartDiv.style.cursor=a;this.legendDiv.style.cursor=a},redrawLabels:function(){this.labels=[];var a=this.allLabels;this.createLabelsSet();var b;for(b=0;b<a.length;b++)this.drawLabel(a[b])},drawLabel:function(a){var b=this;if(b.container&&!1!==a.enabled){a=d.processObject(a,d.Label,b.theme);var c=a.y,e=a.text,h=a.align,f=a.size,g=a.color,k=a.rotation,l=a.alpha,m=a.bold,p=d.toCoordinate(a.x,b.realWidth),c=d.toCoordinate(c,b.realHeight);p||(p=0);c||(c=0);void 0===g&&(g=b.color);isNaN(f)&&(f=b.fontSize);h||(h="start");"left"==h&&(h="start");"right"==h&&(h="end");"center"==h&&(h="middle",k?c=b.realHeight-c+c/2:p=b.realWidth/2-p);void 0===l&&(l=1);void 0===k&&(k=0);c+=f/2;e=d.text(b.container,e,g,b.fontFamily,f,h,m,l);e.translate(p,c);void 0!==a.tabIndex&&e.setAttr("tabindex",a.tabIndex);d.setCN(b,e,"label");a.id&&d.setCN(b,e,"label-"+a.id);0!==k&&e.rotate(k);a.url?(e.setAttr("cursor","pointer"),e.click(function(){d.getURL(a.url,b.urlTarget)})):e.node.style.pointerEvents="none";b.labelsSet.push(e);b.labels.push(e)}},addLabel:function(a,b,c,e,d,f,g,k,l,m){a={x:a,y:b,text:c,align:e,size:d,color:f,alpha:k,rotation:g,bold:l,url:m,enabled:!0};this.container&&this.drawLabel(a);this.allLabels.push(a)},clearLabels:function(){var a=this.labels,b;for(b=a.length-1;0<=b;b--)a[b].remove();this.labels=[];this.allLabels=[]},updateHeight:function(){var a=this.divRealHeight,b=this.legend;if(b){var c=this.legendDiv.offsetHeight,b=b.position;if("top"==b||"bottom"==b){a-=c;if(0>a||isNaN(a))a=0;this.chartDiv.style.height=a+"px"}}return a},updateWidth:function(){var a=this.divRealWidth,b=this.divRealHeight,c=this.legend;if(c){var e=this.legendDiv,d=e.offsetWidth;isNaN(c.width)||(d=c.width);c.ieW&&(d=c.ieW);var f=e.offsetHeight,e=e.style,g=this.chartDiv.style,k=c.position;if(("right"==k||"left"==k)&&void 0===c.divId){a-=d;if(0>a||isNaN(a))a=0;g.width=a+"px";this.balloon&&this.balloon.setBounds&&this.balloon.setBounds(2,2,a-2,this.realHeight);"left"==k?(g.left=d+"px",e.left="0px"):(g.left="0px",e.left=a+"px");b>f&&(e.top=(b-f)/2+"px")}}return a},getTitleHeight:function(){this.drawTitles(!0);return this.titleHeight},addTitle:function(a,b,c,e,d){isNaN(b)&&(b=this.fontSize+2);a={text:a,size:b,color:c,alpha:e,bold:d,enabled:!0};this.titles.push(a);return a},handleWheel:function(a){var b=0;a||(a=window.event);a.wheelDelta?b=a.wheelDelta/120:a.detail&&(b=-a.detail/3);b&&this.handleWheelReal(b,a.shiftKey);a.preventDefault&&a.preventDefault()},handleWheelReal:function(){},handleDocTouchStart:function(){this.handleMouseMove();this.tmx=this.mouseX;this.tmy=this.mouseY;this.touchStartTime=(new Date).getTime()},handleDocTouchEnd:function(){-.5<this.tmx&&this.tmx<this.divRealWidth+1&&0<this.tmy&&this.tmy<this.divRealHeight?(this.handleMouseMove(),4>Math.abs(this.mouseX-this.tmx)&&4>Math.abs(this.mouseY-this.tmy)?(this.tapped=!0,this.panRequired&&this.panEventsEnabled&&this.chartDiv&&(this.chartDiv.style.msTouchAction="none",this.chartDiv.style.touchAction="none")):this.mouseIsOver||this.resetTouchStyle()):(this.tapped=!1,this.resetTouchStyle())},resetTouchStyle:function(){this.panEventsEnabled&&this.chartDiv&&(this.chartDiv.style.msTouchAction="auto",this.chartDiv.style.touchAction="auto")},checkTouchDuration:function(a){var b=this,c=(new Date).getTime();if(a)if(a.touches)b.isTouchEvent=!0;else if(!b.isTouchEvent)return!0;if(c-b.touchStartTime>b.touchClickDuration)return!0;setTimeout(function(){b.resetTouchDuration()},300)},resetTouchDuration:function(){this.isTouchEvent=!1},checkTouchMoved:function(){if(4<Math.abs(this.mouseX-this.tmx)||4<Math.abs(this.mouseY-this.tmy))return!0},addListeners:function(){var a=this,b=a.chartDiv;document.addEventListener?("ontouchstart"in document.documentElement&&(b.addEventListener("touchstart",function(b){a.handleTouchStart.call(a,b)},!0),b.addEventListener("touchmove",function(b){a.handleMouseMove.call(a,b)},!0),b.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)},!0),a.docfn1=function(b){a.handleDocTouchStart.call(a,b)},a.docfn2=function(b){a.handleDocTouchEnd.call(a,b)},document.addEventListener("touchstart",a.docfn1,!0),document.addEventListener("touchend",a.docfn2,!0)),b.addEventListener("mousedown",function(b){a.mouseIsOver=!0;a.handleMouseMove.call(a,b);a.handleMouseDown.call(a,b);a.handleDocTouchStart.call(a,b)},!0),b.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,b)},!0),b.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,b)},!0),b.addEventListener("mouseup",function(b){a.handleDocTouchEnd.call(a,b)},!0)):(b.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)}),b.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)}),b.attachEvent("onmouseout",function(b){a.handleMouseOut.call(a,b)}))},dispDUpd:function(){this.skipEvents||(this.dispatchDataUpdated&&(this.dispatchDataUpdated=!1,this.fire({type:"dataUpdated",chart:this})),this.chartCreated||(this.chartCreated=!0,this.fire({type:"init",chart:this})),this.chartRendered||(this.fire({type:"rendered",chart:this}),this.chartRendered=!0),this.fire({type:"drawn",chart:this}));this.skipEvents=!1},validateSize:function(){var a=this;a.premeasure();a.checkDisplay();a.cssScale=1;a.cssAngle=0;a.checkTransform(a.div);if(a.divRealWidth!=a.previousWidth||a.divRealHeight!=a.previousHeight){var b=a.legend;if(0<a.realWidth&&0<a.realHeight){a.sizeChanged=!0;if(b){a.legendInitTO&&clearTimeout(a.legendInitTO);var c=setTimeout(function(){b.invalidateSize()},10);a.timeOuts.push(c);a.legendInitTO=c}a.marginsUpdated=!1;clearTimeout(a.initTO);c=setTimeout(function(){a.initChart()},10);a.timeOuts.push(c);a.initTO=c}a.renderFix();b&&b.renderFix&&b.renderFix();clearTimeout(a.resizedTO);a.resizedTO=setTimeout(function(){a.fire({type:"resized",chart:a})},10);a.previousHeight=a.divRealHeight;a.previousWidth=a.divRealWidth}},invalidateSize:function(){this.previousHeight=this.previousWidth=NaN;this.invalidateSizeReal()},invalidateSizeReal:function(){var a=this;a.marginsUpdated=!1;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateSize()},5);a.timeOuts.push(b);a.validateTO=b},validateData:function(a){this.chartCreated&&(this.dataChanged=!0,this.marginsUpdated=!1,this.initChart(a))},validateNow:function(a,b){this.initTO&&clearTimeout(this.initTO);a&&(this.dataChanged=!0,this.marginsUpdated=!1);this.skipEvents=b;this.chartRendered=!1;var c=this.legend;c&&c.position!=this.prevLegendPosition&&(this.previousWidth=this.mw=0,c.invalidateSize&&(c.invalidateSize(),this.validateSize()));this.write(this.div)},showItem:function(a){a.hidden=!1;this.initChart()},hideItem:function(a){a.hidden=!0;this.initChart()},hideBalloon:function(){var a=this;clearTimeout(a.hoverInt);clearTimeout(a.balloonTO);a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},a.hideBalloonTime)},cleanChart:function(){},hideBalloonReal:function(){var a=this.balloon;a&&a.hide&&a.hide()},showBalloon:function(a,b,c,e,d){var f=this;clearTimeout(f.balloonTO);clearTimeout(f.hoverInt);f.balloonTO=setTimeout(function(){f.showBalloonReal.call(f,a,b,c,e,d)},1)},showBalloonReal:function(a,b,c,e,d){this.handleMouseMove();var f=this.balloon;f.enabled&&(f.followCursor(!1),f.changeColor(b),!c||f.fixedPosition?(f.setPosition(e,d),isNaN(e)||isNaN(d)?f.followCursor(!0):f.followCursor(!1)):f.followCursor(!0),a&&f.showBalloon(a))},handleMouseOver:function(){this.outTO&&clearTimeout(this.outTO);d.resetMouseOver();this.mouseIsOver=!0},handleMouseOut:function(){var a=this;d.resetMouseOver();a.outTO&&clearTimeout(a.outTO);a.outTO=setTimeout(function(){a.handleMouseOutReal()},10)},handleMouseOutReal:function(){this.mouseIsOver=!1},handleMouseMove:function(a){a||(a=window.event);this.mouse2Y=this.mouse2X=NaN;var b,c,e,d;if(a){if(a.touches){var f=a.touches.item(1);f&&this.panEventsEnabled&&this.boundingRect&&(e=f.clientX-this.boundingRect.left,d=f.clientY-this.boundingRect.top);a=a.touches.item(0);if(!a)return}else this.wasTouched=!1;this.boundingRect&&a.clientX&&(b=a.clientX-this.boundingRect.left,c=a.clientY-this.boundingRect.top);isNaN(e)?this.mouseX=b:(this.mouseX=Math.min(b,e),this.mouse2X=Math.max(b,e));isNaN(d)?this.mouseY=c:(this.mouseY=Math.min(c,d),this.mouse2Y=Math.max(c,d));this.autoTransform&&(this.mouseX/=this.cssScale,this.mouseY/=this.cssScale)}},handleTouchStart:function(a){this.hideBalloonReal();a&&(a.touches&&this.tapToActivate&&!this.tapped||!this.panRequired)||(this.handleMouseMove(a),this.handleMouseDown(a))},handleTouchEnd:function(a){this.wasTouched=!0;this.handleMouseMove(a);d.resetMouseOver();this.handleReleaseOutside(a)},handleReleaseOutside:function(){this.handleDocTouchEnd.call(this)},handleMouseDown:function(a){d.resetMouseOver();this.mouseIsOver=!0;a&&a.preventDefault&&(this.panEventsEnabled?a.preventDefault():a.touches||a.preventDefault())},addLegend:function(a,b){a=d.processObject(a,d.AmLegend,this.theme);a.divId=b;a.ieW=0;var c;c="object"!=typeof b&&b?document.getElementById(b):b;this.legend=a;a.chart=this;c?(a.div=c,a.position="outside",a.autoMargins=!1):a.div=this.legendDiv;return a},removeLegend:function(){this.legend=void 0;this.previousWidth=0;this.legendDiv.innerHTML=""},handleResize:function(){(d.isPercents(this.width)||d.isPercents(this.height))&&this.invalidateSizeReal();this.renderFix()},renderFix:function(){if(!d.VML){var a=this.container;a&&a.renderFix()}},getSVG:function(){if(d.hasSVG)return this.container},animate:function(a,b,c,e,h,f,g){a["an_"+b]&&d.removeFromArray(this.animations,a["an_"+b]);c={obj:a,frame:0,attribute:b,from:c,to:e,time:h,effect:f,suffix:g};a["an_"+b]=c;this.animations.push(c);return c},setLegendData:function(a){var b=this.legend;b&&b.setData(a)},stopAnim:function(a){d.removeFromArray(this.animations,a)},updateAnimations:function(){var a;this.container&&this.container.update();if(this.animations)for(a=this.animations.length-1;0<=a;a--){var b=this.animations[a],c=d.updateRate*b.time,e=b.frame+1,h=b.obj,f=b.attribute;if(e<=c){b.frame++;var g=Number(b.from),k=Number(b.to)-g,c=d[b.effect](0,e,g,k,c);0===k?(this.animations.splice(a,1),h.node.style[f]=Number(b.to)+b.suffix):h.node.style[f]=c+b.suffix}else h.node.style[f]=Number(b.to)+b.suffix,h.animationFinished=!0,this.animations.splice(a,1)}},update:function(){this.updateAnimations();var a=this.animatable;if(0<a.length){for(var b=!0,c=a.length-1;0<=c;c--){var e=a[c];e&&(e.animationFinished?a.splice(c,1):b=!1)}b&&(this.fire({type:"animationFinished",chart:this}),this.animatable=[])}},inIframe:function(){try{return window.self!==window.top}catch(a){return!0}},brr:function(){if(!this.hideCredits){var a="amcharts.com",b=window.location.hostname.split("."),c;2<=b.length&&(c=b[b.length-2]+"."+b[b.length-1]);this.amLink&&(b=this.amLink.parentNode)&&b.removeChild(this.amLink);b=this.creditsPosition;if(c!=a||!0===this.inIframe()){var a="http://www."+a,e=c=0,d=this.realWidth,f=this.realHeight,g=this.type;if("serial"==g||"xy"==g||"gantt"==g)c=this.marginLeftReal,e=this.marginTopReal,d=c+this.plotAreaWidth,f=e+this.plotAreaHeight;var g=a+"/javascript-charts/",k="JavaScript charts",l="JS chart by amCharts";"ammap"==this.product&&(g=a+"/javascript-maps/",k="Interactive JavaScript maps",l="JS map by amCharts");a=document.createElement("a");l=document.createTextNode(l);a.setAttribute("href",g);a.setAttribute("title",k);this.urlTarget&&a.setAttribute("target",this.urlTarget);a.appendChild(l);this.chartDiv.appendChild(a);this.amLink=a;g=a.style;g.position="absolute";g.textDecoration="none";g.color=this.color;g.fontFamily=this.fontFamily;g.fontSize="11px";g.opacity=.7;g.display="block";var k=a.offsetWidth,a=a.offsetHeight,l=5+c,m=e+5;"bottom-left"==b&&(l=5+c,m=f-a-3);"bottom-right"==b&&(l=d-k-5,m=f-a-3);"top-right"==b&&(l=d-k-5,m=e+5);g.left=l+"px";g.top=m+"px"}}}});d.Slice=d.Class({construct:function(){}});d.SerialDataItem=d.Class({construct:function(){}});d.GraphDataItem=d.Class({construct:function(){}});d.Guide=d.Class({construct:function(a){this.cname="Guide";d.applyTheme(this,a,this.cname)}});d.Title=d.Class({construct:function(a){this.cname="Title";d.applyTheme(this,a,this.cname)}});d.Label=d.Class({construct:function(a){this.cname="Label";d.applyTheme(this,a,this.cname)}})})();(function(){var d=window.AmCharts;d.AmGraph=d.Class({construct:function(a){this.cname="AmGraph";this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.type="line";this.stackable=!0;this.columnCount=1;this.columnIndex=0;this.centerCustomBullets=this.showBalloon=!0;this.maxBulletSize=50;this.minBulletSize=4;this.balloonText="[[value]]";this.hidden=this.scrollbar=this.animationPlayed=!1;this.pointPosition="middle";this.depthCount=1;this.includeInMinMax=!0;this.negativeBase=0;this.visibleInLegend=!0;this.showAllValueLabels=!1;this.showBulletsAt=this.showBalloonAt="close";this.lineThickness=1;this.dashLength=0;this.connect=!0;this.lineAlpha=1;this.bullet="none";this.bulletBorderThickness=2;this.bulletBorderAlpha=0;this.bulletAlpha=1;this.bulletSize=8;this.cornerRadiusTop=this.hideBulletsCount=this.bulletOffset=0;this.cursorBulletAlpha=1;this.gradientOrientation="vertical";this.dy=this.dx=0;this.periodValue="";this.clustered=!0;this.periodSpan=1;this.accessibleLabel="[[title]] [[category]] [[value]]";this.accessibleSkipText="Press enter to skip [[title]]";this.y=this.x=0;this.switchable=!0;this.tcc=this.minDistance=1;this.labelRotation=0;this.labelAnchor="auto";this.labelOffset=3;this.bcn="graph-";this.dateFormat="MMM DD, YYYY";this.noRounding=!0;d.applyTheme(this,a,this.cname)},init:function(){this.createBalloon()},draw:function(){var a=this.chart;a.isRolledOverBullet=!1;var b=a.type;if(a.drawGraphs){isNaN(this.precision)||(this.numberFormatter?this.numberFormatter.precision=this.precision:this.numberFormatter={precision:this.precision,decimalSeparator:a.decimalSeparator,thousandsSeparator:a.thousandsSeparator});var c=a.container;this.container=c;this.destroy();var e=c.set();this.set=e;e.translate(this.x,this.y);var h=c.set();this.bulletSet=h;h.translate(this.x,this.y);this.behindColumns?(a.graphsBehindSet.push(e),a.bulletBehindSet.push(h)):(a.graphsSet.push(e),a.bulletSet.push(h));var f=this.bulletAxis;d.isString(f)&&(this.bulletAxis=a.getValueAxisById(f));c=c.set();d.remove(this.columnsSet);this.columnsSet=c;d.setCN(a,e,"graph-"+this.type);d.setCN(a,e,"graph-"+this.id);d.setCN(a,h,"graph-"+this.type);d.setCN(a,h,"graph-"+this.id);this.columnsArray=[];this.ownColumns=[];this.allBullets=[];this.animationArray=[];h=this.labelPosition;h||(f=this.valueAxis.stackType,h="top","column"==this.type&&(a.rotate&&(h="right"),"100%"==f||"regular"==f)&&(h="middle"),this.labelPosition=h);d.ifArray(this.data)&&(a=!1,"xy"==b?this.xAxis.axisCreated&&this.yAxis.axisCreated&&(a=!0):this.valueAxis.axisCreated&&(a=!0),!this.hidden&&a&&this.createGraph());e.push(c)}},createGraph:function(){var a=this,b=a.chart;a.startAlpha=b.startAlpha;a.seqAn=b.sequencedAnimation;a.baseCoord=a.valueAxis.baseCoord;void 0===a.fillAlphas&&(a.fillAlphas=0);a.bulletColorR=a.bulletColor;void 0===a.bulletColorR&&(a.bulletColorR=a.lineColorR,a.bulletColorNegative=a.negativeLineColor);void 0===a.bulletAlpha&&(a.bulletAlpha=a.lineAlpha);if("step"==c||d.VML)a.noRounding=!1;var c=b.type;"gantt"==c&&(c="serial");clearTimeout(a.playedTO);if(!isNaN(a.valueAxis.min)&&!isNaN(a.valueAxis.max)){switch(c){case"serial":a.categoryAxis&&(a.createSerialGraph(),"candlestick"==a.type&&1>a.valueAxis.minMaxMultiplier&&a.positiveClip(a.set));break;case"radar":a.createRadarGraph();break;case"xy":a.createXYGraph()}a.playedTO=setTimeout(function(){a.setAnimationPlayed.call(a)},500*a.chart.startDuration)}},setAnimationPlayed:function(){this.animationPlayed=!0},createXYGraph:function(){var a=[],b=[],c=this.xAxis,e=this.yAxis;this.pmh=e.height;this.pmw=c.width;this.pmy=this.pmx=0;var d;for(d=this.start;d<=this.end;d++){var f=this.data[d].axes[c.id].graphs[this.id],g=f.values,k=g.x,l=g.y,g=c.getCoordinate(k,this.noRounding),m=e.getCoordinate(l,this.noRounding);if(!isNaN(k)&&!isNaN(l)&&(a.push(g),b.push(m),f.x=g,f.y=m,k=this.createBullet(f,g,m,d),l=this.labelText)){var l=this.createLabel(f,l),p=0;k&&(p=k.size);this.positionLabel(f,g,m,l,p)}}this.drawLineGraph(a,b);this.launchAnimation()},createRadarGraph:function(){var a=this.valueAxis.stackType,b=[],c=[],e=[],d=[],f,g,k,l,m;for(m=this.start;m<=this.end;m++){var p=this.data[m].axes[this.valueAxis.id].graphs[this.id],q,n;"none"==a||"3d"==a?q=p.values.value:(q=p.values.close,n=p.values.open);if(isNaN(q))this.connect||(this.drawLineGraph(b,c,e,d),b=[],c=[],e=[],d=[]);else{var t=this.valueAxis.getCoordinate(q,this.noRounding)-this.height,t=t*this.valueAxis.rMultiplier,r=-360/(this.end-this.start+1)*m;"middle"==this.valueAxis.pointPosition&&(r-=180/(this.end-this.start+1));q=t*Math.sin(r/180*Math.PI);t*=Math.cos(r/180*Math.PI);b.push(q);c.push(t);if(!isNaN(n)){var w=this.valueAxis.getCoordinate(n,this.noRounding)-this.height,w=w*this.valueAxis.rMultiplier,z=w*Math.sin(r/180*Math.PI),r=w*Math.cos(r/180*Math.PI);e.push(z);d.push(r);isNaN(k)&&(k=z);isNaN(l)&&(l=r)}r=this.createBullet(p,q,t,m);p.x=q;p.y=t;if(z=this.labelText)z=this.createLabel(p,z),w=0,r&&(w=r.size),this.positionLabel(p,q,t,z,w);isNaN(f)&&(f=q);isNaN(g)&&(g=t)}}b.push(f);c.push(g);isNaN(k)||(e.push(k),d.push(l));this.drawLineGraph(b,c,e,d);this.launchAnimation()},positionLabel:function(a,b,c,e,d){if(e){var f=this.chart,g=this.valueAxis,k="middle",l=!1,m=this.labelPosition,p=e.getBBox(),q=this.chart.rotate,n=a.isNegative,t=this.fontSize;void 0===t&&(t=this.chart.fontSize);c-=p.height/2-t/2-1;void 0!==a.labelIsNegative&&(n=a.labelIsNegative);switch(m){case"right":m=q?n?"left":"right":"right";break;case"top":m=q?"top":n?"bottom":"top";break;case"bottom":m=q?"bottom":n?"top":"bottom";break;case"left":m=q?n?"right":"left":"left"}var t=a.columnGraphics,r=0,w=0;t&&(r=t.x,w=t.y);var z=this.labelOffset;switch(m){case"right":k="start";b+=d/2+z;break;case"top":c=g.reversed?c+(d/2+p.height/2+z):c-(d/2+p.height/2+z);break;case"bottom":c=g.reversed?c-(d/2+p.height/2+z):c+(d/2+p.height/2+z);break;case"left":k="end";b-=d/2+z;break;case"inside":"column"==this.type&&(l=!0,q?n?(k="end",b=r-3-z):(k="start",b=r+3+z):c=n?w+7+z:w-10-z);break;case"middle":"column"==this.type&&(l=!0,q?b-=(b-r)/2+z-3:c-=(c-w)/2+z-3)}"auto"!=this.labelAnchor&&(k=this.labelAnchor);e.attr({"text-anchor":k});this.labelRotation&&e.rotate(this.labelRotation);e.translate(b,c);!this.showAllValueLabels&&t&&l&&(p=e.getBBox(),p.height>a.columnHeight||p.width>a.columnWidth)&&(e.remove(),e=null);if(e&&"radar"!=f.type)if(q){if(0>c||c>this.height)e.remove(),e=null;!this.showAllValueLabels&&e&&(0>b||b>this.width)&&(e.remove(),e=null)}else{if(0>b||b>this.width)e.remove(),e=null;!this.showAllValueLabels&&e&&(0>c||c>this.height)&&(e.remove(),e=null)}e&&this.allBullets.push(e);return e}},getGradRotation:function(){var a=270;"horizontal"==this.gradientOrientation&&(a=0);return this.gradientRotation=a},createSerialGraph:function(){this.dashLengthSwitched=this.fillColorsSwitched=this.lineColorSwitched=void 0;var a=this.chart,b=this.id,c=this.index,e=this.data,h=this.chart.container,f=this.valueAxis,g=this.type,k=this.columnWidthReal,l=this.showBulletsAt;isNaN(this.columnWidth)||(k=this.columnWidth);isNaN(k)&&(k=.8);var m=this.useNegativeColorIfDown,p=this.width,q=this.height,n=this.y,t=this.rotate,r=this.columnCount,w=d.toCoordinate(this.cornerRadiusTop,k/2),z=this.connect,x=[],u=[],A,y,B,D,C=this.chart.graphs.length,I,H=this.dx/this.tcc,Q=this.dy/this.tcc,M=f.stackType,P=this.start,ia=this.end,J=this.scrollbar,aa="graph-column-";J&&(aa="scrollbar-graph-column-");var ma=this.categoryAxis,na=this.baseCoord,Pa=this.negativeBase,Z=this.columnIndex,da=this.lineThickness,X=this.lineAlpha,xa=this.lineColorR,ea=this.dashLength,fa=this.set,Ba,ga=this.getGradRotation(),V=this.chart.columnSpacing,Y=ma.cellWidth,Da=(Y*k-r)/r;V>Da&&(V=Da);var G,v,oa,ha=q,Qa=p,ca=0,tb=0,ub=0,vb=0,gb=0,hb=0,wb=this.fillColorsR,Ra=this.negativeFillColors,Ja=this.negativeLineColor,Ya=this.fillAlphas,Za=this.negativeFillAlphas;"object"==typeof Ya&&(Ya=Ya[0]);"object"==typeof Za&&(Za=Za[0]);var xb=this.noRounding;"step"==g&&(xb=!1);var ib=f.getCoordinate(f.min);f.logarithmic&&(ib=f.getCoordinate(f.minReal));this.minCoord=ib;this.resetBullet&&(this.bullet="none");if(!(J||"line"!=g&&"smoothedLine"!=g&&"step"!=g||(1==e.length&&"step"!=g&&"none"==this.bullet&&(this.bullet="round",this.resetBullet=!0),!Ra&&void 0==Ja||m))){var Ua=Pa;Ua>f.max&&(Ua=f.max);Ua<f.min&&(Ua=f.min);f.logarithmic&&(Ua=f.minReal);var Ka=f.getCoordinate(Ua),Mb=f.getCoordinate(f.max);t?(ha=q,Qa=Math.abs(Mb-Ka),ub=q,vb=Math.abs(ib-Ka),hb=tb=0,f.reversed?(ca=0,gb=Ka):(ca=Ka,gb=0)):(Qa=p,ha=Math.abs(Mb-Ka),vb=p,ub=Math.abs(ib-Ka),gb=ca=0,f.reversed?(hb=n,tb=Ka):hb=Ka)}var La=Math.round;this.pmx=La(ca);this.pmy=La(tb);this.pmh=La(ha);this.pmw=La(Qa);this.nmx=La(gb);this.nmy=La(hb);this.nmh=La(ub);this.nmw=La(vb);d.isModern||(this.nmy=this.nmx=0,this.nmh=this.height);this.clustered||(r=1);k="column"==g?(Y*k-V*(r-1))/r:Y*k;1>k&&(k=1);var Nb=this.fixedColumnWidth;isNaN(Nb)||(k=Nb);var L;if("line"==g||"step"==g||"smoothedLine"==g){if(0<P){for(L=P-1;-1<L;L--)if(G=e[L],v=G.axes[f.id].graphs[b],oa=v.values.value,!isNaN(oa)){P=L;break}if(this.lineColorField)for(L=P;-1<L;L--)if(G=e[L],v=G.axes[f.id].graphs[b],v.lineColor){this.lineColorSwitched=v.lineColor;void 0===this.bulletColor&&(this.bulletColorSwitched=this.lineColorSwitched);break}if(this.fillColorsField)for(L=P;-1<L;L--)if(G=e[L],v=G.axes[f.id].graphs[b],v.fillColors){this.fillColorsSwitched=v.fillColors;break}if(this.dashLengthField)for(L=P;-1<L;L--)if(G=e[L],v=G.axes[f.id].graphs[b],!isNaN(v.dashLength)){this.dashLengthSwitched=v.dashLength;break}}if(ia<e.length-1)for(L=ia+1;L<e.length;L++)if(G=e[L],v=G.axes[f.id].graphs[b],oa=v.values.value,!isNaN(oa)){ia=L;break}}ia<e.length-1&&ia++;var T=[],U=[],Ma=!1;if("line"==g||"step"==g||"smoothedLine"==g)if(this.stackable&&"regular"==M||"100%"==M||this.fillToGraph)Ma=!0;var Ob=this.noStepRisers,jb=-1E3,kb=-1E3,lb=this.minDistance,Sa=!0,$a=!1;for(L=P;L<=ia;L++){G=e[L];v=G.axes[f.id].graphs[b];v.index=L;var ab,Ta=NaN;if(m&&void 0==this.openField)for(var yb=L+1;yb<e.length&&(!e[yb]||!(ab=e[L+1].axes[f.id].graphs[b])||!ab.values||(Ta=ab.values.value,isNaN(Ta)));yb++);var S,R,K,ba,ja=NaN,E=NaN,F=NaN,O=NaN,N=NaN,qa=NaN,ra=NaN,sa=NaN,ta=NaN,ya=NaN,Ea=NaN,ka=NaN,la=NaN,W=NaN,zb=NaN,Ab=NaN,ua=NaN,va=void 0,Na=wb,Va=Ya,Ha=xa,Ca,za,Bb=this.proCandlesticks,mb=this.topRadius,Fa=q-1,pa=p-1,bb=this.pattern;void 0!=v.pattern&&(bb=v.pattern);isNaN(v.alpha)||(Va=v.alpha);isNaN(v.dashLength)||(ea=v.dashLength);var Ia=v.values;f.recalculateToPercents&&(Ia=v.percents);"none"==M&&(Z=isNaN(v.columnIndex)?this.columnIndex:v.columnIndex);if(Ia){W=this.stackable&&"none"!=M&&"3d"!=M?Ia.close:Ia.value;if("candlestick"==g||"ohlc"==g)W=Ia.close,Ab=Ia.low,ra=f.getCoordinate(Ab),zb=Ia.high,ta=f.getCoordinate(zb);ua=Ia.open;F=f.getCoordinate(W,xb);isNaN(ua)||(N=f.getCoordinate(ua,xb),m&&"regular"!=M&&"100%"!=M&&(Ta=ua,ua=N=NaN));m&&(void 0==this.openField?ab&&(ab.isNegative=Ta<W?!0:!1,isNaN(Ta)&&(v.isNegative=!Sa)):v.isNegative=Ta>W?!0:!1);if(!J)switch(this.showBalloonAt){case"close":v.y=F;break;case"open":v.y=N;break;case"high":v.y=ta;break;case"low":v.y=ra}var ja=G.x[ma.id],Wa=this.periodSpan-1;"step"!=g||isNaN(G.cellWidth)||(Y=G.cellWidth);var wa=Math.floor(Y/2)+Math.floor(Wa*Y/2),Ga=wa,nb=0;"left"==this.stepDirection&&(nb=(2*Y+Wa*Y)/2,ja-=nb);"center"==this.stepDirection&&(nb=Y/2,ja-=nb);"start"==this.pointPosition&&(ja-=Y/2+Math.floor(Wa*Y/2),wa=0,Ga=Math.floor(Y)+Math.floor(Wa*Y));"end"==this.pointPosition&&(ja+=Y/2+Math.floor(Wa*Y/2),wa=Math.floor(Y)+Math.floor(Wa*Y),Ga=0);if(Ob){var Cb=this.columnWidth;isNaN(Cb)||(wa*=Cb,Ga*=Cb)}J||(v.x=ja);-1E5>ja&&(ja=-1E5);ja>p+1E5&&(ja=p+1E5);t?(E=F,O=N,N=F=ja,isNaN(ua)&&!this.fillToGraph&&(O=na),qa=ra,sa=ta):(O=E=ja,isNaN(ua)&&!this.fillToGraph&&(N=na));if(!Bb&&W<ua||Bb&&W<Ba)v.isNegative=!0,Ra&&(Na=Ra),Za&&(Va=Za),void 0!=Ja&&(Ha=Ja);$a=!1;isNaN(W)||(m?W>Ta?(Sa&&($a=!0),Sa=!1):(Sa||($a=!0),Sa=!0):v.isNegative=W<Pa?!0:!1,Ba=W);var Pb=!1;J&&a.chartScrollbar.ignoreCustomColors&&(Pb=!0);Pb||(void 0!=v.color&&(Na=v.color),v.fillColors&&(Na=v.fillColors));F=d.fitToBounds(F,-3E4,3E4);switch(g){case"line":if(isNaN(W))z||(this.drawLineGraph(x,u,T,U),x=[],u=[],T=[],U=[]);else{if(Math.abs(E-jb)>=lb||Math.abs(F-kb)>=lb)x.push(E),u.push(F),jb=E,kb=F;ya=E;Ea=F;ka=E;la=F;!Ma||isNaN(N)||isNaN(O)||(T.push(O),U.push(N));if($a||void 0!=v.lineColor&&v.lineColor!=this.lineColorSwitched||void 0!=v.fillColors&&v.fillColors!=this.fillColorsSwitched||!isNaN(v.dashLength))this.drawLineGraph(x,u,T,U),x=[E],u=[F],T=[],U=[],!Ma||isNaN(N)||isNaN(O)||(T.push(O),U.push(N)),m?(Sa?(this.lineColorSwitched=xa,this.fillColorsSwitched=wb):(this.lineColorSwitched=Ja,this.fillColorsSwitched=Ra),void 0===this.bulletColor&&(this.bulletColorSwitched=xa)):(this.lineColorSwitched=v.lineColor,this.fillColorsSwitched=v.fillColors,void 0===this.bulletColor&&(this.bulletColorSwitched=this.lineColorSwitched)),this.dashLengthSwitched=v.dashLength;v.gap&&(this.drawLineGraph(x,u,T,U),x=[],u=[],T=[],U=[])}break;case"smoothedLine":if(isNaN(W))z||(this.drawSmoothedGraph(x,u,T,U),x=[],u=[],T=[],U=[]);else{if(Math.abs(E-jb)>=lb||Math.abs(F-kb)>=lb)x.push(E),u.push(F),jb=E,kb=F;ya=E;Ea=F;ka=E;la=F;!Ma||isNaN(N)||isNaN(O)||(T.push(O),U.push(N));void 0==v.lineColor&&void 0==v.fillColors&&isNaN(v.dashLength)||(this.drawSmoothedGraph(x,u,T,U),x=[E],u=[F],T=[],U=[],!Ma||isNaN(N)||isNaN(O)||(T.push(O),U.push(N)),this.lineColorSwitched=v.lineColor,this.fillColorsSwitched=v.fillColors,this.dashLengthSwitched=v.dashLength);v.gap&&(this.drawSmoothedGraph(x,u,T,U),x=[],u=[],T=[],U=[])}break;case"step":if(!isNaN(W)){t?(isNaN(A)||(x.push(A),u.push(F-wa)),u.push(F-wa),x.push(E),u.push(F+Ga),x.push(E),!Ma||isNaN(N)||isNaN(O)||(isNaN(B)||(T.push(B),U.push(N-wa)),T.push(O),U.push(N-wa),T.push(O),U.push(N+Ga))):(isNaN(y)||(u.push(y),x.push(E-wa)),x.push(E-wa),u.push(F),x.push(E+Ga),u.push(F),!Ma||isNaN(N)||isNaN(O)||(isNaN(D)||(T.push(O-wa),U.push(D)),T.push(O-wa),U.push(N),T.push(O+Ga),U.push(N)));A=E;y=F;B=O;D=N;ya=E;Ea=F;ka=E;la=F;if($a||void 0!=v.lineColor||void 0!=v.fillColors||!isNaN(v.dashLength)){var Db=x[x.length-2],dc=u[u.length-2];x.pop();u.pop();T.pop();U.pop();this.drawLineGraph(x,u,T,U);x=[Db];u=[dc];T=[];U=[];Ma&&(T=[Db,Db+wa+Ga],U=[D,D]);t?(u.push(F+Ga),x.push(E)):(x.push(E+Ga),u.push(F));this.lineColorSwitched=v.lineColor;this.fillColorsSwitched=v.fillColors;this.dashLengthSwitched=v.dashLength;m&&(Sa?(this.lineColorSwitched=xa,this.fillColorsSwitched=wb):(this.lineColorSwitched=Ja,this.fillColorsSwitched=Ra))}if(Ob||v.gap)A=y=NaN,this.drawLineGraph(x,u,T,U),x=[],u=[],T=[],U=[]}else if(!z){if(1>=this.periodSpan||1<this.periodSpan&&E-A>wa+Ga)A=y=NaN;this.drawLineGraph(x,u,T,U);x=[];u=[];T=[];U=[]}break;case"column":Ca=Ha;void 0!=v.lineColor&&(Ca=v.lineColor);if(!isNaN(W)){m||(v.isNegative=W<Pa?!0:!1);v.isNegative&&(Ra&&(Na=Ra),void 0!=Ja&&(Ca=Ja));var Qb=f.min,Rb=f.max,ob=ua;isNaN(ob)&&(ob=Pa);if(!(W<Qb&&ob<Qb||W>Rb&&ob>Rb)){var Aa;if(t){"3d"==M?(R=F-(r/2-this.depthCount+1)*(k+V)+V/2+Q*Z,S=O+H*Z,Aa=Z):(R=Math.floor(F-(r/2-Z)*(k+V)+V/2),S=O,Aa=0);K=k;ya=E;Ea=R+k/2;ka=E;la=R+k/2;R+K>q+Aa*Q&&(K=q-R+Aa*Q);R<Aa*Q&&(K+=R,R=Aa*Q);ba=E-O;var ec=S;S=d.fitToBounds(S,0,p);ba+=ec-S;ba=d.fitToBounds(ba,-S,p-S+H*Z);v.labelIsNegative=0>ba?!0:!1;0===ba&&1/W===1/-0&&(v.labelIsNegative=!0);isNaN(G.percentWidthValue)||(K=this.height*G.percentWidthValue/100,R=ja-K/2,Ea=R+K/2);K=d.roundTo(K,2);ba=d.roundTo(ba,2);R<q&&0<K&&(va=new d.Cuboid(h,ba,K,H-a.d3x,Q-a.d3y,Na,Va,da,Ca,X,ga,w,t,ea,bb,mb,aa),v.columnWidth=Math.abs(ba),v.columnHeight=Math.abs(K))}else{"3d"==M?(S=E-(r/2-this.depthCount+1)*(k+V)+V/2+H*Z,R=N+Q*Z,Aa=Z):(S=E-(r/2-Z)*(k+V)+V/2,R=N,Aa=0);K=k;ya=S+k/2;Ea=F;ka=S+k/2;la=F;S+K>p+Aa*H&&(K=p-S+Aa*H);S<Aa*H&&(K+=S-Aa*H,S=Aa*H);ba=F-N;v.labelIsNegative=0<ba?!0:!1;0===ba&&1/W!==1/Math.abs(W)&&(v.labelIsNegative=!0);var fc=R;R=d.fitToBounds(R,this.dy,q);ba+=fc-R;ba=d.fitToBounds(ba,-R+Q*Aa,q-R);isNaN(G.percentWidthValue)||(K=this.width*G.percentWidthValue/100,S=ja-K/2,ya=S+K/2);K=d.roundTo(K,2);ba=d.roundTo(ba,2);S<p+Z*H&&0<K&&(this.showOnAxis&&(R-=Q/2),va=new d.Cuboid(h,K,ba,H-a.d3x,Q-a.d3y,Na,Va,da,Ca,this.lineAlpha,ga,w,t,ea,bb,mb,aa),v.columnHeight=Math.abs(ba),v.columnWidth=Math.abs(K))}}if(va){za=va.set;d.setCN(a,va.set,"graph-"+this.type);d.setCN(a,va.set,"graph-"+this.id);v.className&&d.setCN(a,va.set,v.className,!0);v.columnGraphics=za;S=d.roundTo(S,2);R=d.roundTo(R,2);za.translate(S,R);(v.url||this.showHandOnHover)&&za.setAttr("cursor","pointer");if(!J){"none"==M&&(I=t?(this.end+1-L)*C-c:C*L+c);"3d"==M&&(t?(I=(this.end+1-L)*C-c-1E3*this.depthCount,ya+=H*Z,ka+=H*Z,v.y+=H*Z):(I=(C-c)*(L+1)+1E3*this.depthCount,Ea+=Q*Z,la+=Q*Z,v.y+=Q*Z));if("regular"==M||"100%"==M)I=t?0<Ia.value?(this.end+1-L)*C+c:(this.end+1-L)*C-c:0<Ia.value?C*L+c:C*L-c;this.columnsArray.push({column:va,depth:I});v.x=t?R+K/2:S+K/2;this.ownColumns.push(va);this.animateColumns(va,L,E,O,F,N);this.addListeners(za,v);void 0!==this.tabIndex&&za.setAttr("tabindex",this.tabIndex)}this.columnsSet.push(za)}}break;case"candlestick":if(!isNaN(ua)&&!isNaN(W)){var Xa,cb;Ca=Ha;void 0!=v.lineColor&&(Ca=v.lineColor);ya=E;la=Ea=F;ka=E;if(t){"open"==l&&(ka=O);"high"==l&&(ka=sa);"low"==l&&(ka=qa);E=d.fitToBounds(E,0,pa);O=d.fitToBounds(O,0,pa);qa=d.fitToBounds(qa,0,pa);sa=d.fitToBounds(sa,0,pa);if(0===E&&0===O&&0===qa&&0===sa)continue;if(E==pa&&O==pa&&qa==pa&&sa==pa)continue;R=F-k/2;S=O;K=k;R+K>q&&(K=q-R);0>R&&(K+=R,R=0);if(R<q&&0<K){var Eb,Fb;W>ua?(Eb=[E,sa],Fb=[O,qa]):(Eb=[O,sa],Fb=[E,qa]);!isNaN(sa)&&!isNaN(qa)&&F<q&&0<F&&(Xa=d.line(h,Eb,[F,F],Ca,X,da),cb=d.line(h,Fb,[F,F],Ca,X,da));ba=E-O;va=new d.Cuboid(h,ba,K,H,Q,Na,Ya,da,Ca,X,ga,w,t,ea,bb,mb,aa)}}else{"open"==l&&(la=N);"high"==l&&(la=ta);"low"==l&&(la=ra);F=d.fitToBounds(F,0,Fa);N=d.fitToBounds(N,0,Fa);ra=d.fitToBounds(ra,0,Fa);ta=d.fitToBounds(ta,0,Fa);if(0===F&&0===N&&0===ra&&0===ta)continue;if(F==Fa&&N==Fa&&ra==Fa&&ta==Fa)continue;S=E-k/2;R=N+da/2;K=k;S+K>p&&(K=p-S);0>S&&(K+=S,S=0);ba=F-N;if(S<p&&0<K){Bb&&W>=ua&&(Va=0);var va=new d.Cuboid(h,K,ba,H,Q,Na,Va,da,Ca,X,ga,w,t,ea,bb,mb,aa),Gb,Hb;W>ua?(Gb=[F,ta],Hb=[N,ra]):(Gb=[N,ta],Hb=[F,ra]);!isNaN(ta)&&!isNaN(ra)&&E<p&&0<E&&(Xa=d.line(h,[E,E],Gb,Ca,X,da),cb=d.line(h,[E,E],Hb,Ca,X,da),d.setCN(a,Xa,this.bcn+"line-high"),v.className&&d.setCN(a,Xa,v.className,!0),d.setCN(a,cb,this.bcn+"line-low"),v.className&&d.setCN(a,cb,v.className,!0))}}va&&(za=va.set,v.columnGraphics=za,fa.push(za),za.translate(S,R-da/2),(v.url||this.showHandOnHover)&&za.setAttr("cursor","pointer"),Xa&&(fa.push(Xa),fa.push(cb)),J||(v.x=t?R+K/2:S+K/2,this.animateColumns(va,L,E,O,F,N),this.addListeners(za,v),void 0!==this.tabIndex&&za.setAttr("tabindex",this.tabIndex)))}break;case"ohlc":if(!(isNaN(ua)||isNaN(zb)||isNaN(Ab)||isNaN(W))){var Sb=h.set();fa.push(Sb);W<ua&&(v.isNegative=!0,void 0!=Ja&&(Ha=Ja));void 0!=v.lineColor&&(Ha=v.lineColor);var pb,qb,rb;if(t){la=F;ka=E;"open"==l&&(ka=O);"high"==l&&(ka=sa);"low"==l&&(ka=qa);qa=d.fitToBounds(qa,0,pa);sa=d.fitToBounds(sa,0,pa);if(0===E&&0===O&&0===qa&&0===sa)continue;if(E==pa&&O==pa&&qa==pa&&sa==pa)continue;var Ib=F-k/2,Ib=d.fitToBounds(Ib,0,q),Tb=d.fitToBounds(F,0,q),Jb=F+k/2,Jb=d.fitToBounds(Jb,0,q);0<=O&&O<=pa&&(qb=d.line(h,[O,O],[Ib,Tb],Ha,X,da,ea));0<F&&F<q&&(pb=d.line(h,[qa,sa],[F,F],Ha,X,da,ea));0<=E&&E<=pa&&(rb=d.line(h,[E,E],[Tb,Jb],Ha,X,da,ea))}else{la=F;"open"==l&&(la=N);"high"==l&&(la=ta);"low"==l&&(la=ra);var ka=E,ra=d.fitToBounds(ra,0,Fa),ta=d.fitToBounds(ta,0,Fa),Kb=E-k/2,Kb=d.fitToBounds(Kb,0,p),Ub=d.fitToBounds(E,0,p),Lb=E+k/2,Lb=d.fitToBounds(Lb,0,p);0<=N&&N<=Fa&&(qb=d.line(h,[Kb,Ub],[N,N],Ha,X,da,ea));0<E&&E<p&&(pb=d.line(h,[E,E],[ra,ta],Ha,X,da,ea));0<=F&&F<=Fa&&(rb=d.line(h,[Ub,Lb],[F,F],Ha,X,da,ea))}fa.push(qb);fa.push(pb);fa.push(rb);d.setCN(a,qb,this.bcn+"stroke-open");d.setCN(a,rb,this.bcn+"stroke-close");d.setCN(a,pb,this.bcn+"stroke");v.className&&d.setCN(a,Sb,v.className,!0);ya=E;Ea=F}}if(!J&&!isNaN(W)){var Vb=this.hideBulletsCount;if(this.end-this.start<=Vb||0===Vb){var Wb=this.createBullet(v,ka,la,L),Xb=this.labelText;if(Xb&&!isNaN(ya)&&!isNaN(ya)){var gc=this.createLabel(v,Xb),Yb=0;Wb&&(Yb=Wb.size);this.positionLabel(v,ya,Ea,gc,Yb)}if("regular"==M||"100%"==M){var Zb=f.totalText;if(Zb){var Oa=this.createLabel(v,Zb,f.totalTextColor);d.setCN(a,Oa,this.bcn+"label-total");this.allBullets.push(Oa);if(Oa){var $b=Oa.getBBox(),ac=$b.width,bc=$b.height,db,eb,sb=f.totalTextOffset,cc=f.totals[L];cc&&cc.remove();var fb=0;"column"!=g&&(fb=this.bulletSize);t?(eb=Ea,db=0>W?E-ac/2-2-fb-sb:E+ac/2+3+fb+sb):(db=ya,eb=0>W?F+bc/2+fb+sb:F-bc/2-3-fb-sb);Oa.translate(db,eb);f.totals[L]=Oa;t?(0>eb||eb>q)&&Oa.remove():(0>db||db>p)&&Oa.remove()}}}}}}}this.lastDataItem=v;if("line"==g||"step"==g||"smoothedLine"==g)"smoothedLine"==g?this.drawSmoothedGraph(x,u,T,U):this.drawLineGraph(x,u,T,U),J||this.launchAnimation();this.bulletsHidden&&this.hideBullets();this.customBulletsHidden&&this.hideCustomBullets()},animateColumns:function(a,b){var c=this,e=c.chart.startDuration;0<e&&!c.animationPlayed&&(c.seqAn?(a.set.hide(),c.animationArray.push(a),e=setTimeout(function(){c.animate.call(c)},e/(c.end-c.start+1)*(b-c.start)*1E3),c.timeOuts.push(e)):c.animate(a),c.chart.animatable.push(a))},createLabel:function(a,b,c){var e=this.chart,h=a.labelColor;h||(h=this.color);h||(h=e.color);c&&(h=c);c=this.fontSize;void 0===c&&(this.fontSize=c=e.fontSize);var f=this.labelFunction;b=e.formatString(b,a);b=d.cleanFromEmpty(b);f&&(b=f(a,b));if(void 0!==b&&""!==b)return a=d.text(this.container,b,h,e.fontFamily,c),a.node.style.pointerEvents="none",d.setCN(e,a,this.bcn+"label"),this.bulletSet.push(a),a},positiveClip:function(a){a.clipRect(this.pmx,this.pmy,this.pmw,this.pmh)},negativeClip:function(a){a.clipRect(this.nmx,this.nmy,this.nmw,this.nmh)},drawLineGraph:function(a,b,c,e){var h=this;if(1<a.length){var f=h.noRounding,g=h.set,k=h.chart,l=h.container,m=l.set(),p=l.set();g.push(p);g.push(m);var q=h.lineAlpha,n=h.lineThickness,g=h.fillAlphas,t=h.lineColorR,r=h.negativeLineAlpha;isNaN(r)&&(r=q);var w=h.lineColorSwitched;w&&(t=w);var w=h.fillColorsR,z=h.fillColorsSwitched;z&&(w=z);var x=h.dashLength;(z=h.dashLengthSwitched)&&(x=z);var z=h.negativeLineColor,u=h.negativeFillColors,A=h.negativeFillAlphas,y=h.baseCoord;0!==h.negativeBase&&(y=h.valueAxis.getCoordinate(h.negativeBase,f),y>h.height&&(y=h.height),0>y&&(y=0));q=d.line(l,a,b,t,q,n,x,!1,!0,f);q.node.setAttribute("stroke-linejoin","round");d.setCN(k,q,h.bcn+"stroke");m.push(q);m.click(function(a){h.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){h.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){h.handleGraphEvent(a,"rollOutGraph")}).touchmove(function(a){h.chart.handleMouseMove(a)}).touchend(function(a){h.chart.handleTouchEnd(a)});void 0===z||h.useNegativeColorIfDown||(n=d.line(l,a,b,z,r,n,x,!1,!0,f),n.node.setAttribute("stroke-linejoin","round"),d.setCN(k,n,h.bcn+"stroke"),d.setCN(k,n,h.bcn+"stroke-negative"),p.push(n));if(0<g||0<A)if(n=a.join(";").split(";"),r=b.join(";").split(";"),q=k.type,"serial"==q||"radar"==q?0<c.length?(c.reverse(),e.reverse(),n=a.concat(c),r=b.concat(e)):"radar"==q?(r.push(0),n.push(0)):h.rotate?(r.push(r[r.length-1]),n.push(y),r.push(r[0]),n.push(y),r.push(r[0]),n.push(n[0])):(n.push(n[n.length-1]),r.push(y),n.push(n[0]),r.push(y),n.push(a[0]),r.push(r[0])):"xy"==q&&(b=h.fillToAxis)&&(d.isString(b)&&(b=k.getValueAxisById(b)),"H"==b.orientation?(y="top"==b.position?0:b.height,n.push(n[n.length-1]),r.push(y),n.push(n[0]),r.push(y),n.push(a[0]),r.push(r[0])):(y="left"==b.position?0:b.width,r.push(r[r.length-1]),n.push(y),r.push(r[0]),n.push(y),r.push(r[0]),n.push(n[0]))),a=h.gradientRotation,0<g&&(b=d.polygon(l,n,r,w,g,1,"#000",0,a,f),b.pattern(h.pattern,NaN,k.path),d.setCN(k,b,h.bcn+"fill"),m.push(b)),u||void 0!==z)isNaN(A)&&(A=g),u||(u=z),f=d.polygon(l,n,r,u,A,1,"#000",0,a,f),d.setCN(k,f,h.bcn+"fill"),d.setCN(k,f,h.bcn+"fill-negative"),f.pattern(h.pattern,NaN,k.path),p.push(f),p.click(function(a){h.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){h.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){h.handleGraphEvent(a,"rollOutGraph")}).touchmove(function(a){h.chart.handleMouseMove(a)}).touchend(function(a){h.chart.handleTouchEnd(a)});h.applyMask(p,m)}},applyMask:function(a,b){var c=a.length();"serial"!=this.chart.type||this.scrollbar||(this.positiveClip(b),0<c&&this.negativeClip(a))},drawSmoothedGraph:function(a,b,c,e){if(1<a.length){var h=this.set,f=this.chart,g=this.container,k=g.set(),l=g.set();h.push(l);h.push(k);var m=this.lineAlpha,p=this.lineThickness,h=this.dashLength,q=this.fillAlphas,n=this.lineColorR,t=this.fillColorsR,r=this.negativeLineColor,w=this.negativeFillColors,z=this.negativeFillAlphas,x=this.baseCoord,u=this.lineColorSwitched;u&&(n=u);(u=this.fillColorsSwitched)&&(t=u);var A=this.negativeLineAlpha;isNaN(A)&&(A=m);u=this.getGradRotation();m=new d.Bezier(g,a,b,n,m,p,t,0,h,void 0,u);d.setCN(f,m,this.bcn+"stroke");k.push(m.path);void 0!==r&&(p=new d.Bezier(g,a,b,r,A,p,t,0,h,void 0,u),d.setCN(f,p,this.bcn+"stroke"),d.setCN(f,p,this.bcn+"stroke-negative"),l.push(p.path));0<q&&(p=a.join(";").split(";"),m=b.join(";").split(";"),n="",0<c.length?(c.push("M"),e.push("M"),c.reverse(),e.reverse(),p=a.concat(c),m=b.concat(e)):(this.rotate?(n+=" L"+x+","+b[b.length-1],n+=" L"+x+","+b[0]):(n+=" L"+a[a.length-1]+","+
x,n+=" L"+a[0]+","+x),n+=" L"+a[0]+","+b[0]),a=new d.Bezier(g,p,m,NaN,0,0,t,q,h,n,u),d.setCN(f,a,this.bcn+"fill"),a.path.pattern(this.pattern,NaN,f.path),k.push(a.path),w||void 0!==r)&&(z||(z=q),w||(w=r),g=new d.Bezier(g,p,m,NaN,0,0,w,z,h,n,u),g.path.pattern(this.pattern,NaN,f.path),d.setCN(f,g,this.bcn+"fill"),d.setCN(f,g,this.bcn+"fill-negative"),l.push(g.path));this.applyMask(l,k)}},launchAnimation:function(){var a=this,b=a.chart.startDuration;if(0<b&&!a.animationPlayed){var c=a.set,e=a.bulletSet;d.VML||(c.attr({opacity:a.startAlpha}),e.attr({opacity:a.startAlpha}));c.hide();e.hide();a.seqAn?(b=setTimeout(function(){a.animateGraphs.call(a)},a.index*b*1E3),a.timeOuts.push(b)):a.animateGraphs()}},animateGraphs:function(){var a=this.chart,b=this.set,c=this.bulletSet,e=this.x,d=this.y;b.show();c.show();var f=a.startDuration,g=a.startEffect;b&&(this.rotate?(b.translate(-1E3,d),c.translate(-1E3,d)):(b.translate(e,-1E3),c.translate(e,-1E3)),b.animate({opacity:1,translate:e+","+d},f,g),c.animate({opacity:1,translate:e+","+d},f,g),a.animatable.push(b))},animate:function(a){var b=this.chart,c=this.animationArray;!a&&0<c.length&&(a=c[0],c.shift());c=d[d.getEffect(b.startEffect)];b=b.startDuration;a&&(this.rotate?a.animateWidth(b,c):a.animateHeight(b,c),a.set.show())},legendKeyColor:function(){var a=this.legendColor,b=this.lineAlpha;void 0===a&&(a=this.lineColorR,0===b&&(b=this.fillColorsR)&&(a="object"==typeof b?b[0]:b));return a},legendKeyAlpha:function(){var a=this.legendAlpha;void 0===a&&(a=this.lineAlpha,this.fillAlphas>a&&(a=this.fillAlphas),0===a&&(a=this.bulletAlpha),0===a&&(a=1));return a},createBullet:function(a,b,c){if(!isNaN(b)&&!isNaN(c)&&("none"!=this.bullet||this.customBullet||a.bullet||a.customBullet)){var e=this.chart,h=this.container,f=this.bulletOffset,g=this.bulletSize;isNaN(a.bulletSize)||(g=a.bulletSize);var k=a.values.value,l=this.maxValue,m=this.minValue,p=this.maxBulletSize,q=this.minBulletSize;isNaN(l)||(isNaN(k)||(g=(k-m)/(l-m)*(p-q)+q),m==l&&(g=p));l=g;this.bulletAxis&&(g=a.values.error,isNaN(g)||(k=g),g=this.bulletAxis.stepWidth*k);g<this.minBulletSize&&(g=this.minBulletSize);this.rotate?b=a.isNegative?b-f:b+f:c=a.isNegative?c+f:c-f;q=this.bulletColorR;a.lineColor&&void 0===this.bulletColor&&(this.bulletColorSwitched=a.lineColor);this.bulletColorSwitched&&(q=this.bulletColorSwitched);a.isNegative&&void 0!==this.bulletColorNegative&&(q=this.bulletColorNegative);void 0!==a.color&&(q=a.color);var n;"xy"==e.type&&this.valueField&&(n=this.pattern,a.pattern&&(n=a.pattern));f=this.bullet;a.bullet&&(f=a.bullet);var k=this.bulletBorderThickness,m=this.bulletBorderColorR,p=this.bulletBorderAlpha,t=this.bulletAlpha;m||(m=q);this.useLineColorForBulletBorder&&(m=this.lineColorR,a.isNegative&&this.negativeLineColor&&(m=this.negativeLineColor),this.lineColorSwitched&&(m=this.lineColorSwitched));var r=a.alpha;isNaN(r)||(t=r);n=d.bullet(h,f,g,q,t,k,m,p,l,0,n,e.path);l=this.customBullet;a.customBullet&&(l=a.customBullet);l&&(n&&n.remove(),"function"==typeof l?(l=new l,l.chart=e,a.bulletConfig&&(l.availableSpace=c,l.graph=this,l.graphDataItem=a,l.bulletY=c,a.bulletConfig.minCoord=this.minCoord-c,l.bulletConfig=a.bulletConfig),l.write(h),n&&l.showBullet&&l.set.push(n),a.customBulletGraphics=l.cset,n=l.set):(n=h.set(),l=h.image(l,0,0,g,g),n.push(l),this.centerCustomBullets&&l.translate(-g/2,-g/2)));if(n){(a.url||this.showHandOnHover)&&n.setAttr("cursor","pointer");if("serial"==e.type||"gantt"==e.type)if(-.5>b||b>this.width||c<-g/2||c>this.height)n.remove(),n=null;n&&(this.bulletSet.push(n),n.translate(b,c),this.addListeners(n,a),this.allBullets.push(n));a.bx=b;a.by=c;d.setCN(e,n,this.bcn+"bullet");a.className&&d.setCN(e,n,a.className,!0)}if(n){n.size=g||0;if(e=this.bulletHitAreaSize)h=d.circle(h,e,"#FFFFFF",.001,0),h.translate(b,c),a.hitBullet=h,this.bulletSet.push(h),this.addListeners(h,a);a.bulletGraphics=n;void 0!==this.tabIndex&&n.setAttr("tabindex",this.tabIndex)}else n={size:0};n.graphDataItem=a;return n}},showBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!1;for(b=0;b<a.length;b++)a[b].show()},hideBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!0;for(b=0;b<a.length;b++)a[b].hide()},showCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!1;for(b=0;b<a.length;b++){var c=a[b].graphDataItem;c&&c.customBulletGraphics&&c.customBulletGraphics.show()}},hideCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!0;for(b=0;b<a.length;b++){var c=a[b].graphDataItem;c&&c.customBulletGraphics&&c.customBulletGraphics.hide()}},addListeners:function(a,b){var c=this;a.mouseover(function(a){c.handleRollOver(b,a)}).mouseout(function(a){c.handleRollOut(b,a)}).touchend(function(a){c.handleRollOver(b,a);c.chart.panEventsEnabled&&c.handleClick(b,a)}).touchstart(function(a){c.handleRollOver(b,a)}).click(function(a){c.handleClick(b,a)}).dblclick(function(a){c.handleDoubleClick(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)});var e=c.chart;if(e.accessible&&c.accessibleLabel){var d=e.formatString(c.accessibleLabel,b);e.makeAccessible(a,d)}},handleRollOver:function(a,b){this.handleGraphEvent(b,"rollOverGraph");if(a){var c=this.chart;a.bulletConfig&&(c.isRolledOverBullet=!0);var e={type:"rollOverGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(e);c.fire(e);clearTimeout(c.hoverInt);(c=c.chartCursor)&&c.valueBalloonsEnabled||this.showGraphBalloon(a,"V",!0)}},handleRollOut:function(a,b){var c=this.chart;if(a){var e={type:"rollOutGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(e);c.fire(e);c.isRolledOverBullet=!1}this.handleGraphEvent(b,"rollOutGraph");(c=c.chartCursor)&&c.valueBalloonsEnabled||this.hideBalloon()},handleClick:function(a,b){if(!this.chart.checkTouchMoved()&&this.chart.checkTouchDuration(b)){if(a){var c={type:"clickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(c);this.chart.fire(c);d.getURL(a.url,this.urlTarget)}this.handleGraphEvent(b,"clickGraph")}},handleGraphEvent:function(a,b){var c={type:b,graph:this,target:this,chart:this.chart,event:a};this.fire(c);this.chart.fire(c)},handleRightClick:function(a,b){if(a){var c={type:"rightClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(c);this.chart.fire(c)}},handleDoubleClick:function(a,b){if(a){var c={type:"doubleClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(c);this.chart.fire(c)}},zoom:function(a,b){this.start=a;this.end=b;this.draw()},changeOpacity:function(a){var b=this.set;b&&b.setAttr("opacity",a);if(b=this.ownColumns){var c;for(c=0;c<b.length;c++){var e=b[c].set;e&&e.setAttr("opacity",a)}}(b=this.bulletSet)&&b.setAttr("opacity",a)},destroy:function(){d.remove(this.set);d.remove(this.bulletSet);var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},createBalloon:function(){var a=this.chart;this.balloon?this.balloon.destroy&&this.balloon.destroy():this.balloon={};var b=this.balloon;d.extend(b,a.balloon,!0);b.chart=a;b.mainSet=a.plotBalloonsSet;b.className=this.id},hideBalloon:function(){var a=this,b=a.chart;b.chartCursor?b.chartCursor.valueBalloonsEnabled||b.hideBalloon():b.hideBalloon();clearTimeout(a.hoverInt);a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},b.hideBalloonTime)},hideBalloonReal:function(){this.balloon&&this.balloon.hide();this.fixBulletSize()},fixBulletSize:function(){if(d.isModern){var a=this.resizedDItem;if(a){var b=a.bulletGraphics;if(b&&!b.doNotScale){b.translate(a.bx,a.by,1);var c=this.bulletAlpha;isNaN(a.alpha)||(c=a.alpha);b.setAttr("fill-opacity",c);b.setAttr("stroke-opacity",this.bulletBorderAlpha)}}this.resizedDItem=null}},showGraphBalloon:function(a,b,c,e,h){if(a){var f=this.chart,g=this.balloon,k=0,l=0,m=f.chartCursor,p=!0;m?m.valueBalloonsEnabled||(g=f.balloon,k=this.x,l=this.y,p=!1):(g=f.balloon,k=this.x,l=this.y,p=!1);clearTimeout(this.hoverInt);if(f.chartCursor&&(this.currentDataItem=a,"serial"==f.type&&f.isRolledOverBullet&&f.chartCursor.valueBalloonsEnabled)){this.hideBalloonReal();return}this.resizeBullet(a,e,h);if(g&&g.enabled&&this.showBalloon&&!this.hidden){var m=f.formatString(this.balloonText,a,!0),q=this.balloonFunction;q&&(m=q(a,a.graph));m&&(m=d.cleanFromEmpty(m));m&&""!==m?(e=f.getBalloonColor(this,a),g.drop||(g.pointerOrientation=b),b=a.x,h=a.y,f.rotate&&(b=a.y,h=a.x),b+=k,h+=l,isNaN(b)||isNaN(h)?this.hideBalloonReal():(a=this.width,q=this.height,p&&g.setBounds(k,l,a+k,q+l),g.changeColor(e),g.setPosition(b,h),g.fixPrevious(),g.fixedPosition&&(c=!1),!c&&"radar"!=f.type&&(b<k-.5||b>a+k||h<l-.5||h>q+l)?(g.showBalloon(m),g.hide(0)):(g.followCursor(c),g.showBalloon(m)))):(this.hideBalloonReal(),g.hide(),this.resizeBullet(a,e,h))}else this.hideBalloonReal()}},resizeBullet:function(a,b,c){this.fixBulletSize();if(a&&d.isModern&&(1!=b||!isNaN(c))){var e=a.bulletGraphics;e&&!e.doNotScale&&(e.translate(a.bx,a.by,b),isNaN(c)||(e.setAttr("fill-opacity",c),e.setAttr("stroke-opacity",c)),this.resizedDItem=a)}}})})();(function(){var d=window.AmCharts;d.ChartCursor=d.Class({construct:function(a){this.cname="ChartCursor";this.createEvents("changed","zoomed","onHideCursor","onShowCursor","draw","selected","moved","panning","zoomStarted");this.enabled=!0;this.cursorAlpha=1;this.selectionAlpha=.2;this.cursorColor="#CC0000";this.categoryBalloonAlpha=1;this.color="#FFFFFF";this.type="cursor";this.zoomed=!1;this.zoomable=!0;this.pan=!1;this.categoryBalloonDateFormat="MMM DD, YYYY";this.categoryBalloonText="[[category]]";this.categoryBalloonEnabled=this.valueBalloonsEnabled=!0;this.rolledOver=!1;this.cursorPosition="middle";this.bulletsEnabled=this.skipZoomDispatch=!1;this.bulletSize=8;this.selectWithoutZooming=this.oneBalloonOnly=!1;this.graphBulletSize=1.7;this.animationDuration=.3;this.zooming=!1;this.adjustment=0;this.avoidBalloonOverlapping=!0;this.leaveCursor=!1;this.leaveAfterTouch=!0;this.valueZoomable=!1;this.balloonPointerOrientation="horizontal";this.hLineEnabled=this.vLineEnabled=!0;this.vZoomEnabled=this.hZoomEnabled=!1;d.applyTheme(this,a,this.cname)},draw:function(){this.destroy();var a=this.chart;a.panRequired=!0;var b=a.container;this.rotate=a.rotate;this.container=b;this.prevLineHeight=this.prevLineWidth=NaN;b=b.set();b.translate(this.x,this.y);this.set=b;a.cursorSet.push(b);this.createElements();d.isString(this.limitToGraph)&&(this.limitToGraph=d.getObjById(a.graphs,this.limitToGraph),this.fullWidth=!1,this.cursorPosition="middle");this.pointer=this.balloonPointerOrientation.substr(0,1).toUpperCase();this.isHidden=!1;this.hideLines();this.valueLineAxis||(this.valueLineAxis=a.valueAxes[0])},createElements:function(){var a=this,b=a.chart,c=b.dx,e=b.dy,h=a.width,f=a.height,g,k,l=a.cursorAlpha,m=a.valueLineAlpha;a.rotate?(g=m,k=l):(k=m,g=l);"xy"==b.type&&(k=l,void 0!==m&&(k=m),g=l);a.vvLine=d.line(a.container,[c,0,0],[e,0,f],a.cursorColor,g,1);d.setCN(b,a.vvLine,"cursor-line");d.setCN(b,a.vvLine,"cursor-line-vertical");a.hhLine=d.line(a.container,[0,h,h+c],[0,0,e],a.cursorColor,k,1);d.setCN(b,a.hhLine,"cursor-line");d.setCN(b,a.hhLine,"cursor-line-horizontal");a.vLine=a.rotate?a.vvLine:a.hhLine;a.set.push(a.vvLine);a.set.push(a.hhLine);a.set.node.style.pointerEvents="none";a.fullLines=a.container.set();b=b.cursorLineSet;b.push(a.fullLines);b.translate(a.x,a.y);b.clipRect(-1,-1,h+2,f+2);void 0!==a.tabIndex&&(b.setAttr("tabindex",a.tabIndex),b.keyup(function(b){a.handleKeys(b)}).focus(function(b){a.showCursor()}).blur(function(b){a.hideCursor()}));a.set.clipRect(0,0,h,f)},handleKeys:function(a){var b=this.prevIndex,c=this.chart;if(c){var e=c.chartData;e&&(isNaN(b)&&(b=e.length-1),37!=a.keyCode&&40!=a.keyCode||b--,39!=a.keyCode&&38!=a.keyCode||b++,b=d.fitToBounds(b,c.startIndex,c.endIndex),(a=this.chart.chartData[b])&&this.setPosition(a.x.categoryAxis),this.prevIndex=b)}},update:function(){var a=this.chart;if(a){var b=a.mouseX-this.x,c=a.mouseY-this.y;this.mouseX=b;this.mouseY=c;this.mouse2X=a.mouse2X-this.x;this.mouse2Y=a.mouse2Y-this.y;var e;if(a.chartData&&0<a.chartData.length){this.mouseIsOver()?(this.hideGraphBalloons=!1,this.rolledOver=e=!0,this.updateDrawing(),this.vvLine&&isNaN(this.fx)&&(a.rotate||!this.limitToGraph)&&this.vvLine.translate(b,0),!this.hhLine||!isNaN(this.fy)||a.rotate&&this.limitToGraph||this.hhLine.translate(0,c),isNaN(this.mouse2X)?this.dispatchMovedEvent(b,c):e=!1):this.forceShow||this.hideCursor();if(this.zooming){if(!isNaN(this.mouse2X)){isNaN(this.mouse2X0)||this.dispatchPanEvent();return}if(this.pan){this.dispatchPanEvent();return}(this.hZoomEnabled||this.vZoomEnabled)&&this.zooming&&this.updateSelection()}e&&this.showCursor()}}},updateDrawing:function(){this.drawing&&this.chart.setMouseCursor("crosshair");if(this.drawingNow&&(d.remove(this.drawingLine),1<Math.abs(this.drawStartX-this.mouseX)||1<Math.abs(this.drawStartY-this.mouseY))){var a=this.chart,b=a.marginTop,a=a.marginLeft;this.drawingLine=d.line(this.container,[this.drawStartX+a,this.mouseX+a],[this.drawStartY+b,this.mouseY+b],this.cursorColor,1,1)}},fixWidth:function(a){if(this.fullWidth&&this.prevLineWidth!=a){var b=this.vvLine,c=0;b&&(b.remove(),c=b.x);b=this.container.set();b.translate(c,0);c=d.rect(this.container,a,this.height,this.cursorColor,this.cursorAlpha,this.cursorAlpha,this.cursorColor);d.setCN(this.chart,c,"cursor-fill");c.translate(-a/2-1,0);b.push(c);this.vvLine=b;this.fullLines.push(b);this.prevLineWidth=a}},fixHeight:function(a){if(this.fullWidth&&this.prevLineHeight!=a){var b=this.hhLine,c=0;b&&(b.remove(),c=b.y);b=this.container.set();b.translate(0,c);c=d.rect(this.container,this.width,a,this.cursorColor,this.cursorAlpha);c.translate(0,-a/2);b.push(c);this.fullLines.push(b);this.hhLine=b;this.prevLineHeight=a}},fixVLine:function(a,b){if(!isNaN(a)){if(isNaN(this.prevLineX)){var c=0,e=this.mouseX;if(this.limitToGraph){var d=this.chart.categoryAxis;d&&(this.chart.rotate||(c="bottom"==d.position?this.height:-this.height),e=a)}this.vvLine.translate(e,c)}else this.prevLineX!=a&&this.vvLine.translate(this.prevLineX,this.prevLineY);this.fx=a;this.prevLineX!=a&&(c=this.animationDuration,this.zooming&&(c=0),this.vvLine.stop(),this.vvLine.animate({translate:a+","+b},c,"easeOutSine"),this.prevLineX=a,this.prevLineY=b)}},fixHLine:function(a,b){if(!isNaN(a)){if(isNaN(this.prevLineY)){var c=0,e=this.mouseY;if(this.limitToGraph){var d=this.chart.categoryAxis;d&&(this.chart.rotate&&(c="right"==d.position?this.width:-this.width),e=a)}this.hhLine.translate(c,e)}else this.prevLineY!=a&&this.hhLine.translate(this.prevLineX,this.prevLineY);this.fy=a;this.prevLineY!=a&&(c=this.animationDuration,this.zooming&&(c=0),this.hhLine.stop(),this.hhLine.animate({translate:b+","+a},c,"easeOutSine"),this.prevLineY=a,this.prevLineX=b)}},hideCursor:function(a){this.forceShow=!1;this.chart.wasTouched&&this.leaveAfterTouch||this.isHidden||this.leaveCursor||(this.hideCursorReal(),a?this.chart.handleCursorHide():this.fire({target:this,chart:this.chart,type:"onHideCursor"}),this.chart.setMouseCursor("auto"))},hideCursorReal:function(){this.hideLines();this.isHidden=!0;this.index=this.prevLineY=this.prevLineX=this.mouseY0=this.mouseX0=this.fy=this.fx=NaN},hideLines:function(){this.vvLine&&this.vvLine.hide();this.hhLine&&this.hhLine.hide();this.fullLines&&this.fullLines.hide();this.isHidden=!0;this.chart.handleCursorHide()},showCursor:function(a){!this.drawing&&this.enabled&&(this.vLineEnabled&&this.vvLine&&this.vvLine.show(),this.hLineEnabled&&this.hhLine&&this.hhLine.show(),this.isHidden=!1,this.updateFullLine(),a||this.fire({target:this,chart:this.chart,type:"onShowCursor"}),this.pan&&this.chart.setMouseCursor("move"))},updateFullLine:function(){this.zooming&&this.fullWidth&&this.selection&&(this.rotate?0<this.selection.height&&this.hhLine.hide():0<this.selection.width&&this.vvLine.hide())},updateSelection:function(){if(!this.pan&&this.enabled){var a=this.mouseX,b=this.mouseY;isNaN(this.fx)||(a=this.fx);isNaN(this.fy)||(b=this.fy);this.clearSelection();var c=this.mouseX0,e=this.mouseY0,h=this.width,f=this.height,a=d.fitToBounds(a,0,h),b=d.fitToBounds(b,0,f),g;a<c&&(g=a,a=c,c=g);b<e&&(g=b,b=e,e=g);this.hZoomEnabled?h=a-c:c=0;this.vZoomEnabled?f=b-e:e=0;isNaN(this.mouse2X)&&0<Math.abs(h)&&0<Math.abs(f)&&(a=this.chart,b=d.rect(this.container,h,f,this.cursorColor,this.selectionAlpha),d.setCN(a,b,"cursor-selection"),b.width=h,b.height=f,b.translate(c,e),this.set.push(b),this.selection=b);this.updateFullLine()}},mouseIsOver:function(){var a=this.mouseX,b=this.mouseY;if(this.justReleased)return this.justReleased=!1,!0;if(this.mouseIsDown)return!0;if(!this.chart.mouseIsOver)return this.handleMouseOut(),!1;if(0<a&&a<this.width&&0<b&&b<this.height)return!0;this.handleMouseOut()},fixPosition:function(){this.prevY=this.prevX=NaN},handleMouseDown:function(){this.update();if(this.mouseIsOver())if(this.mouseIsDown=!0,this.mouseX0=this.mouseX,this.mouseY0=this.mouseY,this.mouse2X0=this.mouse2X,this.mouse2Y0=this.mouse2Y,this.drawing)this.drawStartY=this.mouseY,this.drawStartX=this.mouseX,this.drawingNow=!0;else if(this.dispatchMovedEvent(this.mouseX,this.mouseY),!this.pan&&isNaN(this.mouse2X0)&&(isNaN(this.fx)||(this.mouseX0=this.fx),isNaN(this.fy)||(this.mouseY0=this.fy)),this.hZoomEnabled||this.vZoomEnabled){this.zooming=!0;var a={chart:this.chart,target:this,type:"zoomStarted"};a.x=this.mouseX/this.width;a.y=this.mouseY/this.height;this.index0=a.index=this.index;this.timestamp0=this.timestamp;this.fire(a)}},registerInitialMouse:function(){},handleReleaseOutside:function(){this.mouseIsDown=!1;if(this.drawingNow){this.drawingNow=!1;d.remove(this.drawingLine);var a=this.drawStartX,b=this.drawStartY,c=this.mouseX,e=this.mouseY,h=this.chart;(2<Math.abs(a-c)||2<Math.abs(b-e))&&this.fire({type:"draw",target:this,chart:h,initialX:a,initialY:b,finalX:c,finalY:e})}this.zooming&&(this.zooming=!1,this.selectWithoutZooming?this.dispatchZoomEvent("selected"):(this.hZoomEnabled||this.vZoomEnabled)&&this.dispatchZoomEvent("zoomed"),this.rolledOver&&this.dispatchMovedEvent(this.mouseX,this.mouseY));this.mouse2Y0=this.mouse2X0=this.mouseY0=this.mouseX0=NaN},dispatchZoomEvent:function(a){if(!this.pan){var b=this.selection;if(b&&3<Math.abs(b.width)&&3<Math.abs(b.height)){var c=Math.min(this.index,this.index0),e=Math.max(this.index,this.index0),d=c,f=e,g=this.chart,k=g.chartData,l=g.categoryAxis;l&&l.parseDates&&!l.equalSpacing&&(d=k[c]?k[c].time:Math.min(this.timestamp0,this.timestamp),f=k[e]?g.getEndTime(k[e].time):Math.max(this.timestamp0,this.timestamp));var b={type:a,chart:this.chart,target:this,end:f,start:d,startIndex:c,endIndex:e,selectionHeight:b.height,selectionWidth:b.width,selectionY:b.y,selectionX:b.x},m;this.hZoomEnabled&&4<Math.abs(this.mouseX0-
this.mouseX)&&(b.startX=this.mouseX0/this.width,b.endX=this.mouseX/this.width,m=!0);this.vZoomEnabled&&4<Math.abs(this.mouseY0-this.mouseY)&&(b.startY=1-this.mouseY0/this.height,b.endY=1-this.mouseY/this.height,m=!0);m&&(this.prevY=this.prevX=NaN,this.fire(b),"selected"!=a&&this.clearSelection());this.hideCursor()}}},dispatchMovedEvent:function(a,b,c,e){a=Math.round(a);b=Math.round(b);if(!this.isHidden&&(a!=this.prevX||b!=this.prevY||"changed"==c)){c||(c="moved");var d=this.fx,f=this.fy;isNaN(d)&&(d=a);isNaN(f)&&(f=b);var g=!1;this.zooming&&this.pan&&(g=!0);g={hidden:this.isHidden,type:c,chart:this.chart,target:this,x:a,y:b,finalX:d,finalY:f,zooming:this.zooming,panning:g,mostCloseGraph:this.mostCloseGraph,index:this.index,skip:e,hideBalloons:this.hideGraphBalloons};this.prevIndex=this.index;this.rotate?(g.position=b,g.finalPosition=f):(g.position=a,g.finalPosition=d);this.prevX=a;this.prevY=b;e?this.chart.handleCursorMove(g):(this.fire(g),"changed"==c&&this.chart.fire(g))}},dispatchPanEvent:function(){if(this.mouseIsDown){var a=d.roundTo((this.mouseX-this.mouseX0)/this.width,3),b=d.roundTo((this.mouseY-this.mouseY0)/this.height,3),c=d.roundTo((this.mouse2X-this.mouse2X0)/this.width,3),e=d.roundTo((this.mouse2Y-this.mouse2Y0)/this.height,2),h=!1;0!==Math.abs(a)&&0!==Math.abs(b)&&(h=!0);if(this.prevDeltaX==a||this.prevDeltaY==b)h=!1;isNaN(c)||isNaN(e)||(0!==Math.abs(c)&&0!==Math.abs(e)&&(h=!0),this.prevDelta2X!=c&&this.prevDelta2Y!=e)||(h=!1);h&&(this.hideLines(),this.fire({type:"panning",chart:this.chart,target:this,deltaX:a,deltaY:b,delta2X:c,delta2Y:e,index:this.index}),this.prevDeltaX=a,this.prevDeltaY=b,this.prevDelta2X=c,this.prevDelta2Y=e)}},clearSelection:function(){var a=this.selection;a&&(a.width=0,a.height=0,a.remove())},destroy:function(){this.clear();d.remove(this.selection);this.selection=null;clearTimeout(this.syncTO);d.remove(this.set)},clear:function(){},setTimestamp:function(a){this.timestamp=a},setIndex:function(a,b){a!=this.index&&(this.index=a,b||this.isHidden||this.dispatchMovedEvent(this.mouseX,this.mouseY,"changed"))},handleMouseOut:function(){this.enabled&&this.rolledOver&&(this.leaveCursor||this.setIndex(void 0),this.forceShow=!1,this.hideCursor(),this.rolledOver=!1)},showCursorAt:function(a){var b=this.chart.categoryAxis;b&&this.setPosition(b.categoryToCoordinate(a),a)},setPosition:function(a,b){var c=this.chart,e=c.categoryAxis;if(e){var d,f;void 0===b&&(b=e.coordinateToValue(a));e.showBalloonAt(b,a);this.forceShow=!0;e.stickBalloonToCategory?c.rotate?this.fixHLine(a,0):this.fixVLine(a,0):(this.showCursor(),c.rotate?this.hhLine.translate(0,a):this.vvLine.translate(a,0));c.rotate?d=a:f=a;c.rotate?(this.vvLine&&this.vvLine.hide(),this.hhLine&&this.hhLine.show()):(this.hhLine&&this.hhLine.hide(),this.vvLine&&this.vvLine.show());this.updateFullLine();this.isHidden=!1;this.dispatchMovedEvent(f,d,"moved",!0)}},enableDrawing:function(a){this.enabled=!a;this.hideCursor();this.drawing=a},syncWithCursor:function(a,b){clearTimeout(this.syncTO);a&&(a.isHidden?this.hideCursor(!0):this.syncWithCursorReal(a,b))},isZooming:function(a){this.zooming=a},syncWithCursorReal:function(a,b){var c=a.vvLine,e=a.hhLine;this.index=a.index;this.forceShow=!0;this.zooming&&this.pan||this.showCursor(!0);this.hideGraphBalloons=b;this.justReleased=a.justReleased;this.zooming=a.zooming;this.index0=a.index0;this.mouseX0=a.mouseX0;this.mouseY0=a.mouseY0;this.mouse2X0=a.mouse2X0;this.mouse2Y0=a.mouse2Y0;this.timestamp0=a.timestamp0;this.prevDeltaX=a.prevDeltaX;this.prevDeltaY=a.prevDeltaY;this.prevDelta2X=a.prevDelta2X;this.prevDelta2Y=a.prevDelta2Y;this.fx=a.fx;this.fy=a.fy;a.zooming&&this.updateSelection();var d=a.mouseX,f=a.mouseY;this.rotate?(d=NaN,this.vvLine&&this.vvLine.hide(),this.hhLine&&e&&(isNaN(a.fy)?this.hhLine.translate(0,a.mouseY):this.fixHLine(a.fy,0))):(f=NaN,this.hhLine&&this.hhLine.hide(),this.vvLine&&c&&(isNaN(a.fx)?this.vvLine.translate(a.mouseX,0):this.fixVLine(a.fx,0)));this.dispatchMovedEvent(d,f,"moved",!0)}})})();(function(){var d=window.AmCharts;d.SimpleChartScrollbar=d.Class({construct:function(a){this.createEvents("zoomed","zoomStarted","zoomEnded");this.backgroundColor="#D4D4D4";this.backgroundAlpha=1;this.selectedBackgroundColor="#EFEFEF";this.scrollDuration=this.selectedBackgroundAlpha=1;this.resizeEnabled=!0;this.hideResizeGrips=!1;this.scrollbarHeight=20;this.updateOnReleaseOnly=!1;9>document.documentMode&&(this.updateOnReleaseOnly=!0);this.dragIconHeight=this.dragIconWidth=35;this.dragIcon="dragIconRoundBig";this.dragCursorHover="cursor: move; cursor: grab; cursor: -moz-grab; cursor: -webkit-grab;";this.dragCursorDown="cursor: move; cursor: grab; cursor: -moz-grabbing; cursor: -webkit-grabbing;";this.vResizeCursor="ns-resize";this.hResizeCursor="ew-resize";this.enabled=!0;this.percentStart=this.offset=0;this.percentEnd=1;d.applyTheme(this,a,"SimpleChartScrollbar")},getPercents:function(){var a=this.getDBox(),b=a.x,c=a.y,e=a.width,a=a.height;this.rotate?(b=1-c/this.height,c=1-(c+a)/this.height):(c=b/this.width,b=(b+e)/this.width);this.percentStart=c;this.percentEnd=b},draw:function(){var a=this;a.destroy();if(a.enabled){var b=a.chart.container,c=a.rotate,e=a.chart;e.panRequired=!0;var h=b.set();a.set=h;c?d.setCN(e,h,"scrollbar-vertical"):d.setCN(e,h,"scrollbar-horizontal");e.scrollbarsSet.push(h);var f,g;c?(f=a.scrollbarHeight,g=e.plotAreaHeight):(g=a.scrollbarHeight,f=e.plotAreaWidth);a.width=f;if((a.height=g)&&f){var k=d.rect(b,f,g,a.backgroundColor,a.backgroundAlpha,1,a.backgroundColor,a.backgroundAlpha);d.setCN(e,k,"scrollbar-bg");a.bg=k;h.push(k);k=d.rect(b,f,g,"#000",.005);h.push(k);a.invisibleBg=k;k.click(function(){a.handleBgClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()}).touchend(function(){a.handleBgClick()});k=d.rect(b,f,g,a.selectedBackgroundColor,a.selectedBackgroundAlpha);d.setCN(e,k,"scrollbar-bg-selected");a.selectedBG=k;h.push(k);f=d.rect(b,f,g,"#000",.005);a.dragger=f;h.push(f);f.mousedown(function(b){a.handleDragStart(b)}).mouseup(function(){a.handleDragStop()}).mouseover(function(){a.handleDraggerOver()}).mouseout(function(){a.handleMouseOut()}).touchstart(function(b){a.handleDragStart(b)}).touchend(function(){a.handleDragStop()});g=e.pathToImages;var l,k=a.dragIcon.replace(/\.[a-z]*$/i,"");d.isAbsolute(k)&&(g="");c?(l=g+k+"H"+e.extension,g=a.dragIconWidth,c=a.dragIconHeight):(l=g+k+e.extension,c=a.dragIconWidth,g=a.dragIconHeight);k=b.image(l,0,0,c,g);d.setCN(e,k,"scrollbar-grip-left");l=b.image(l,0,0,c,g);d.setCN(e,l,"scrollbar-grip-right");var m=10,p=20;e.panEventsEnabled&&(m=25,p=a.scrollbarHeight);var q=d.rect(b,m,p,"#000",.005),n=d.rect(b,m,p,"#000",.005);n.translate(-(m-c)/2,-(p-g)/2);q.translate(-(m-c)/2,-(p-g)/2);c=b.set([k,n]);b=b.set([l,q]);a.iconLeft=c;h.push(a.iconLeft);a.iconRight=b;h.push(b);a.updateGripCursor(!1);e.makeAccessible(c,a.accessibleLabel);e.makeAccessible(b,a.accessibleLabel);e.makeAccessible(f,a.accessibleLabel);c.setAttr("role","menuitem");b.setAttr("role","menuitem");f.setAttr("role","menuitem");void 0!==a.tabIndex&&(c.setAttr("tabindex",a.tabIndex),c.keyup(function(b){a.handleKeys(b,1,0)}));void 0!==a.tabIndex&&(f.setAttr("tabindex",a.tabIndex),f.keyup(function(b){a.handleKeys(b,1,1)}));void 0!==a.tabIndex&&(b.setAttr("tabindex",a.tabIndex),b.keyup(function(b){a.handleKeys(b,0,1)}));c.mousedown(function(){a.leftDragStart()}).mouseup(function(){a.leftDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.leftDragStart()}).touchend(function(){a.leftDragStop()});b.mousedown(function(){a.rightDragStart()}).mouseup(function(){a.rightDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.rightDragStart()}).touchend(function(){a.rightDragStop()});d.ifArray(e.chartData)?h.show():h.hide();a.hideDragIcons();a.clipDragger(!1)}h.translate(a.x,a.y);h.node.style.msTouchAction="none";h.node.style.touchAction="none"}},handleKeys:function(a,b,c){this.getPercents();var e=this.percentStart,d=this.percentEnd;if(this.rotate)var f=d,d=e,e=f;if(37==a.keyCode||40==a.keyCode)e-=.02*b,d-=.02*c;if(39==a.keyCode||38==a.keyCode)e+=.02*b,d+=.02*c;this.rotate&&(a=d,d=e,e=a);isNaN(d)||isNaN(e)||this.percentZoom(e,d,!0)},updateScrollbarSize:function(a,b){if(!isNaN(a)&&!isNaN(b)){a=Math.round(a);b=Math.round(b);var c=this.dragger,e,d,f,g,k;this.rotate?(e=0,d=a,f=this.width+1,g=b-a,c.setAttr("height",b-a),c.setAttr("y",d)):(e=a,d=0,f=b-a,g=this.height+1,k=b-a,c.setAttr("x",e),c.setAttr("width",k));this.clipAndUpdate(e,d,f,g)}},update:function(){var a,b=!1,c,e,d=this.x,f=this.y,g=this.dragger,k=this.getDBox();if(k){c=k.x+d;e=k.y+f;var l=k.width,k=k.height,m=this.rotate,p=this.chart,q=this.width,n=this.height,t=p.mouseX,p=p.mouseY;a=this.initialMouse;this.forceClip&&this.clipDragger(!0);if(this.dragging){var r=this.initialCoord;m?(a=r+(p-a),0>a&&(a=0),r=n-k,a>r&&(a=r),g.setAttr("y",a)):(a=r+(t-a),0>a&&(a=0),r=q-l,a>r&&(a=r),g.setAttr("x",a));this.clipDragger(!0)}if(this.resizingRight){if(m)if(a=p-e,!isNaN(this.maxHeight)&&a>this.maxHeight&&(a=this.maxHeight),a+e>n+f&&(a=n-e+f),0>a)this.resizingRight=!1,b=this.resizingLeft=!0;else{if(0===a||isNaN(a))a=.1;g.setAttr("height",a)}else if(a=t-c,!isNaN(this.maxWidth)&&a>this.maxWidth&&(a=this.maxWidth),a+c>q+d&&(a=q-c+d),0>a)this.resizingRight=!1,b=this.resizingLeft=!0;else{if(0===a||isNaN(a))a=.1;g.setAttr("width",a)}this.clipDragger(!0)}if(this.resizingLeft){if(m)if(c=e,e=p,e<f&&(e=f),isNaN(e)&&(e=f),e>n+f&&(e=n+f),a=!0===b?c-e:k+c-e,!isNaN(this.maxHeight)&&a>this.maxHeight&&(a=this.maxHeight,e=c),0>a)this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("y",c+k-f);else{if(0===a||isNaN(a))a=.1;g.setAttr("y",e-f);g.setAttr("height",a)}else if(e=t,e<d&&(e=d),isNaN(e)&&(e=d),e>q+d&&(e=q+d),a=!0===b?c-e:l+c-e,!isNaN(this.maxWidth)&&a>this.maxWidth&&(a=this.maxWidth,e=c),0>a)this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("x",c+l-d);else{if(0===a||isNaN(a))a=.1;g.setAttr("x",e-d);g.setAttr("width",a)}this.clipDragger(!0)}}},stopForceClip:function(){this.animating=this.forceClip=!1},clipDragger:function(a){var b=this.getDBox();if(b){var c=b.x,e=b.y,d=b.width,b=b.height,f=!1;if(this.rotate){if(c=0,d=this.width+1,this.clipY!=e||this.clipH!=b)f=!0}else if(e=0,b=this.height+1,this.clipX!=c||this.clipW!=d)f=!0;f&&(this.clipAndUpdate(c,e,d,b),a&&(this.updateOnReleaseOnly||this.dispatchScrollbarEvent()))}},maskGraphs:function(){},clipAndUpdate:function(a,b,c,d){this.clipX=a;this.clipY=b;this.clipW=c;this.clipH=d;this.selectedBG.setAttr("width",c);this.selectedBG.setAttr("height",d);this.selectedBG.translate(a,b);this.updateDragIconPositions();this.maskGraphs(a,b,c,d)},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart;a.hideBalloon();var b=this.getDBox(),c=b.x,d=b.y,h=b.width,b=b.height;this.getPercents();this.rotate?(c=d,h=this.height/b):h=this.width/h;this.fire({type:"zoomed",position:c,chart:a,target:this,multiplier:h,relativeStart:this.percentStart,relativeEnd:this.percentEnd})}},updateDragIconPositions:function(){var a=this.getDBox(),b=a.x,c=a.y,d=this.iconLeft,h=this.iconRight,f,g,k=this.scrollbarHeight;this.rotate?(f=this.dragIconWidth,g=this.dragIconHeight,d.translate((k-g)/2,c-f/2),h.translate((k-g)/2,c+a.height-f/2)):(f=this.dragIconHeight,g=this.dragIconWidth,d.translate(b-g/2,(k-f)/2),h.translate(b-g/2+a.width,(k-f)/2))},showDragIcons:function(){this.resizeEnabled&&(this.iconLeft.show(),this.iconRight.show())},hideDragIcons:function(){if(!this.resizingLeft&&!this.resizingRight&&!this.dragging){if(this.hideResizeGrips||!this.resizeEnabled)this.iconLeft.hide(),this.iconRight.hide();this.removeCursors()}},removeCursors:function(){this.chart.setMouseCursor("auto")},fireZoomEvent:function(a){this.fire({type:a,chart:this.chart,target:this})},percentZoom:function(a,b,c){a=d.fitToBounds(a,0,b);b=d.fitToBounds(b,a,1);if(this.dragger&&this.enabled){this.dragger.stop();isNaN(a)&&(a=0);isNaN(b)&&(b=1);var e,h;this.rotate?(e=this.height,b=e-e*b,h=e-e*a):(e=this.width,h=e*b,b=e*a);this.updateScrollbarSize(b,h);this.clipDragger(!1);this.getPercents();c&&this.dispatchScrollbarEvent()}},destroy:function(){this.clear();d.remove(this.set);d.remove(this.iconRight);d.remove(this.iconLeft)},clear:function(){},handleDragStart:function(){if(this.enabled){this.fireZoomEvent("zoomStarted");var a=this.chart;this.dragger.stop();this.removeCursors();d.isModern&&(this.dragger.node.style.cssText=this.dragCursorDown);this.dragging=!0;var b=this.getDBox();this.rotate?(this.initialCoord=b.y,this.initialMouse=a.mouseY):(this.initialCoord=b.x,this.initialMouse=a.mouseX)}},handleDragStop:function(){this.updateOnReleaseOnly&&(this.update(),this.skipEvent=!1,this.dispatchScrollbarEvent());this.dragging=!1;this.mouseIsOver&&this.removeCursors();d.isModern&&(this.dragger.node.style.cssText=this.dragCursorHover);this.update();this.fireZoomEvent("zoomEnded")},handleDraggerOver:function(){this.handleMouseOver();d.isModern&&(this.dragger.node.style.cssText=this.dragCursorHover)},leftDragStart:function(){this.fireZoomEvent("zoomStarted");this.dragger.stop();this.resizingLeft=!0;this.updateGripCursor(!0)},updateGripCursor:function(a){d.isModern&&(a=this.rotate?a?this.vResizeCursorDown:this.vResizeCursorHover:a?this.hResizeCursorDown:this.hResizeCursorHover)&&(this.iconRight&&(this.iconRight.node.style.cssText=a),this.iconLeft&&(this.iconLeft.node.style.cssText=a))},leftDragStop:function(){this.resizingLeft&&(this.resizingLeft=!1,this.mouseIsOver||this.removeCursors(),this.updateOnRelease(),this.fireZoomEvent("zoomEnded"));this.updateGripCursor(!1)},rightDragStart:function(){this.fireZoomEvent("zoomStarted");this.dragger.stop();this.resizingRight=!0;this.updateGripCursor(!0)},rightDragStop:function(){this.resizingRight&&(this.resizingRight=!1,this.mouseIsOver||this.removeCursors(),this.updateOnRelease(),this.fireZoomEvent("zoomEnded"));this.updateGripCursor(!1)},iconRollOut:function(){this.removeCursors()},iconRollOver:function(){this.rotate?this.vResizeCursor&&this.chart.setMouseCursor(this.vResizeCursor):this.hResizeCursor&&this.chart.setMouseCursor(this.hResizeCursor);this.handleMouseOver()},getDBox:function(){if(this.dragger)return this.dragger.getBBox()},handleBgClick:function(){var a=this;if(!a.resizingRight&&!a.resizingLeft){a.zooming=!0;var b,c,e=a.scrollDuration,h=a.dragger;b=a.getDBox();var f=b.height,g=b.width;c=a.chart;var k=a.y,l=a.x,m=a.rotate;m?(b="y",c=c.mouseY-f/2-k,c=d.fitToBounds(c,0,a.height-f)):(b="x",c=c.mouseX-g/2-l,c=d.fitToBounds(c,0,a.width-g));a.updateOnReleaseOnly?(a.skipEvent=!1,h.setAttr(b,c),a.dispatchScrollbarEvent(),a.clipDragger()):(a.animating=!0,c=Math.round(c),m?h.animate({y:c},e,">"):h.animate({x:c},e,">"),a.forceClip=!0,clearTimeout(a.forceTO),a.forceTO=setTimeout(function(){a.stopForceClip.call(a)},5E3*e))}},updateOnRelease:function(){this.updateOnReleaseOnly&&(this.update(),this.skipEvent=!1,this.dispatchScrollbarEvent())},handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||this.resizingRight||this.dragging)this.dragging=this.resizingRight=this.resizingLeft=!1,this.updateOnRelease(),this.removeCursors();this.animating=this.mouseIsOver=!1;this.hideDragIcons();this.update()}},handleMouseOver:function(){this.mouseIsOver=!0;this.showDragIcons()},handleMouseOut:function(){this.mouseIsOver=!1;this.hideDragIcons();this.removeCursors()}})})();(function(){var d=window.AmCharts;d.ChartScrollbar=d.Class({inherits:d.SimpleChartScrollbar,construct:function(a){this.cname="ChartScrollbar";d.ChartScrollbar.base.construct.call(this,a);this.graphLineColor="#BBBBBB";this.graphLineAlpha=0;this.graphFillColor="#BBBBBB";this.graphFillAlpha=1;this.selectedGraphLineColor="#888888";this.selectedGraphLineAlpha=0;this.selectedGraphFillColor="#888888";this.selectedGraphFillAlpha=1;this.gridCount=0;this.gridColor="#FFFFFF";this.gridAlpha=.7;this.skipEvent=this.autoGridCount=!1;this.color="#FFFFFF";this.scrollbarCreated=!1;this.oppositeAxis=!0;this.accessibleLabel="Zoom chart using cursor arrows";d.applyTheme(this,a,this.cname)},init:function(){var a=this.categoryAxis,b=this.chart,c=this.gridAxis;a||("CategoryAxis"==this.gridAxis.cname?(this.catScrollbar=!0,a=new d.CategoryAxis,a.id="scrollbar"):(a=new d.ValueAxis,a.data=b.chartData,a.id=c.id,a.type=c.type,a.maximumDate=c.maximumDate,a.minimumDate=c.minimumDate,a.minPeriod=c.minPeriod,a.minMaxField=c.minMaxField),this.categoryAxis=a);a.chart=b;var e=b.categoryAxis;e&&(a.firstDayOfWeek=e.firstDayOfWeek);a.dateFormats=c.dateFormats;a.markPeriodChange=c.markPeriodChange;a.boldPeriodBeginning=c.boldPeriodBeginning;a.labelFunction=c.labelFunction;a.axisItemRenderer=d.RecItem;a.axisRenderer=d.RecAxis;a.guideFillRenderer=d.RecFill;a.inside=!0;a.fontSize=this.fontSize;a.tickLength=0;a.axisAlpha=0;d.isString(this.graph)&&(this.graph=d.getObjById(b.graphs,this.graph));(a=this.graph)&&this.catScrollbar&&(c=this.valueAxis,c||(this.valueAxis=c=new d.ValueAxis,c.visible=!1,c.scrollbar=!0,c.axisItemRenderer=d.RecItem,c.axisRenderer=d.RecAxis,c.guideFillRenderer=d.RecFill,c.labelsEnabled=!1,c.chart=b),b=this.unselectedGraph,b||(b=new d.AmGraph,b.scrollbar=!0,this.unselectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers),b=this.selectedGraph,b||(b=new d.AmGraph,b.scrollbar=!0,this.selectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers));this.scrollbarCreated=!0},draw:function(){var a=this;d.ChartScrollbar.base.draw.call(a);if(a.enabled){a.scrollbarCreated||a.init();var b=a.chart,c=b.chartData,e=a.categoryAxis,h=a.rotate,f=a.x,g=a.y,k=a.width,l=a.height,m=a.gridAxis,p=a.set;e.setOrientation(!h);e.parseDates=m.parseDates;"ValueAxis"==a.categoryAxis.cname&&(e.rotate=!h);e.equalSpacing=m.equalSpacing;e.minPeriod=m.minPeriod;e.startOnAxis=m.startOnAxis;e.width=k-1;e.height=l;e.gridCount=a.gridCount;e.gridColor=a.gridColor;e.gridAlpha=a.gridAlpha;e.color=a.color;e.tickLength=0;e.axisAlpha=0;e.autoGridCount=a.autoGridCount;e.parseDates&&!e.equalSpacing&&e.timeZoom(b.firstTime,b.lastTime);e.minimum=a.gridAxis.fullMin;e.maximum=a.gridAxis.fullMax;e.strictMinMax=!0;e.zoom(0,c.length-1);if((m=a.graph)&&a.catScrollbar){var q=a.valueAxis,n=m.valueAxis;q.id=n.id;q.rotate=h;q.setOrientation(h);q.width=k;q.height=l;q.dataProvider=c;q.reversed=n.reversed;q.logarithmic=n.logarithmic;q.gridAlpha=0;q.axisAlpha=0;p.push(q.set);h?(q.y=g,q.x=0):(q.x=f,q.y=0);var f=Infinity,g=-Infinity,t;for(t=0;t<c.length;t++){var r=c[t].axes[n.id].graphs[m.id].values,w;for(w in r)if(r.hasOwnProperty(w)&&"percents"!=w&&"total"!=w){var z=r[w];z<f&&(f=z);z>g&&(g=z)}}Infinity!=f&&(q.minimum=f);-Infinity!=g&&(q.maximum=g+.1*(g-f));f==g&&(--q.minimum,q.maximum+=1);void 0!==a.minimum&&(q.minimum=a.minimum);void 0!==a.maximum&&(q.maximum=a.maximum);q.zoom(0,c.length-1);w=a.unselectedGraph;w.id=m.id;w.bcn="scrollbar-graph-";w.rotate=h;w.chart=b;w.data=c;w.valueAxis=q;w.chart=m.chart;w.categoryAxis=a.categoryAxis;w.periodSpan=m.periodSpan;w.valueField=m.valueField;w.openField=m.openField;w.closeField=m.closeField;w.highField=m.highField;w.lowField=m.lowField;w.lineAlpha=a.graphLineAlpha;w.lineColorR=a.graphLineColor;w.fillAlphas=a.graphFillAlpha;w.fillColorsR=a.graphFillColor;w.connect=m.connect;w.hidden=m.hidden;w.width=k;w.height=l;w.pointPosition=m.pointPosition;w.stepDirection=m.stepDirection;w.periodSpan=m.periodSpan;n=a.selectedGraph;n.id=m.id;n.bcn=w.bcn+"selected-";n.rotate=h;n.chart=b;n.data=c;n.valueAxis=q;n.chart=m.chart;n.categoryAxis=e;n.periodSpan=m.periodSpan;n.valueField=m.valueField;n.openField=m.openField;n.closeField=m.closeField;n.highField=m.highField;n.lowField=m.lowField;n.lineAlpha=a.selectedGraphLineAlpha;n.lineColorR=a.selectedGraphLineColor;n.fillAlphas=a.selectedGraphFillAlpha;n.fillColorsR=a.selectedGraphFillColor;n.connect=m.connect;n.hidden=m.hidden;n.width=k;n.height=l;n.pointPosition=m.pointPosition;n.stepDirection=m.stepDirection;n.periodSpan=m.periodSpan;b=a.graphType;b||(b=m.type);w.type=b;n.type=b;c=c.length-1;w.zoom(0,c);n.zoom(0,c);n.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});w.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});p.push(w.set);p.push(n.set)}p.push(e.set);p.push(e.labelsSet);a.bg.toBack();a.invisibleBg.toFront();a.dragger.toFront();a.iconLeft.toFront();a.iconRight.toFront()}},timeZoom:function(a,b,c){this.startTime=a;this.endTime=b;this.timeDifference=b-a;this.skipEvent=!d.toBoolean(c);this.zoomScrollbar();this.dispatchScrollbarEvent()},zoom:function(a,b){this.start=a;this.end=b;this.skipEvent=!0;this.zoomScrollbar()},dispatchScrollbarEvent:function(){if(this.categoryAxis&&"ValueAxis"==this.categoryAxis.cname)d.ChartScrollbar.base.dispatchScrollbarEvent.call(this);else if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart.chartData,b,c,e=this.dragger.getBBox();b=e.x;var h=e.y,f=e.width,e=e.height,g=this.chart;this.rotate?(b=h,c=e):c=f;f={type:"zoomed",target:this};f.chart=g;var k=this.categoryAxis,l=this.stepWidth,h=g.minSelectedTime,e=g.maxSelectedTime,m=!1;if(k.parseDates&&!k.equalSpacing){if(a=g.lastTime,g=g.firstTime,k=Math.round(b/l)+g,b=this.dragging?k+this.timeDifference:Math.round((b+c)/l)+g,k>b&&(k=b),0<h&&b-k<h&&(b=Math.round(k+(b-k)/2),m=Math.round(h/2),k=b-m,b+=m,m=!0),0<e&&b-k>e&&(b=Math.round(k+(b-k)/2),m=Math.round(e/2),k=b-m,b+=m,m=!0),b>a&&(b=a),b-h<k&&(k=b-h),k<g&&(k=g),k+h>b&&(b=k+h),k!=this.startTime||b!=this.endTime)this.startTime=k,this.endTime=b,f.start=k,f.end=b,f.startDate=new Date(k),f.endDate=new Date(b),this.fire(f)}else{k.startOnAxis||(b+=l/2);c-=this.stepWidth/2;h=k.xToIndex(b);b=k.xToIndex(b+c);if(h!=this.start||this.end!=b)k.startOnAxis&&(this.resizingRight&&h==b&&b++,this.resizingLeft&&h==b&&(0<h?h--:b=1)),this.start=h,this.end=this.dragging?this.start+this.difference:b,f.start=this.start,f.end=this.end,k.parseDates&&(a[this.start]&&(f.startDate=new Date(a[this.start].time)),a[this.end]&&(f.endDate=new Date(a[this.end].time))),this.fire(f);this.percentStart=h;this.percentEnd=b}m&&this.zoomScrollbar(!0)}},zoomScrollbar:function(a){if((!(this.dragging||this.resizingLeft||this.resizingRight||this.animating)||a)&&this.dragger&&this.enabled){var b,c,d=this.chart;a=d.chartData;var h=this.categoryAxis;h.parseDates&&!h.equalSpacing?(a=h.stepWidth,c=d.firstTime,b=a*(this.startTime-c),c=a*(this.endTime-c)):(a[this.start]&&(b=a[this.start].x[h.id]),a[this.end]&&(c=a[this.end].x[h.id]),a=h.stepWidth,h.startOnAxis||(d=a/2,b-=d,c+=d));this.stepWidth=a;isNaN(b)||isNaN(c)||this.updateScrollbarSize(b,c)}},maskGraphs:function(a,b,c,d){var h=this.selectedGraph;h&&h.set.clipRect(a,b,c,d)},handleDragStart:function(){d.ChartScrollbar.base.handleDragStart.call(this);this.difference=this.end-this.start;this.timeDifference=this.endTime-this.startTime;0>this.timeDifference&&(this.timeDifference=0)},handleBackgroundClick:function(){d.ChartScrollbar.base.handleBackgroundClick.call(this);this.dragging||(this.difference=this.end-this.start,this.timeDifference=this.endTime-this.startTime,0>this.timeDifference&&(this.timeDifference=0))}})})();(function(){var d=window.AmCharts;d.AmBalloon=d.Class({construct:function(a){this.cname="AmBalloon";this.enabled=!0;this.fillColor="#FFFFFF";this.fillAlpha=.8;this.borderThickness=2;this.borderColor="#FFFFFF";this.borderAlpha=1;this.cornerRadius=0;this.maxWidth=220;this.horizontalPadding=8;this.verticalPadding=4;this.pointerWidth=6;this.pointerOrientation="V";this.color="#000000";this.adjustBorderColor=!0;this.show=this.follow=this.showBullet=!1;this.bulletSize=3;this.shadowAlpha=.4;this.shadowColor="#000000";this.fadeOutDuration=this.animationDuration=.3;this.fixedPosition=!0;this.offsetY=6;this.offsetX=1;this.textAlign="center";this.disableMouseEvents=!0;this.deltaSignX=this.deltaSignY=1;d.isModern||(this.offsetY*=1.5);this.sdy=this.sdx=0;d.applyTheme(this,a,this.cname)},draw:function(){var a=this.pointToX,b=this.pointToY;d.isModern||(this.drop=!1);var c=this.chart;d.VML&&(this.fadeOutDuration=0);this.xAnim&&c.stopAnim(this.xAnim);this.yAnim&&c.stopAnim(this.yAnim);this.sdy=this.sdx=0;if(!isNaN(a)){var e=this.follow,h=c.container,f=this.set;d.remove(f);this.removeDiv();f=h.set();f.node.style.pointerEvents="none";this.set=f;this.mainSet?(this.mainSet.push(this.set),this.sdx=this.mainSet.x,this.sdy=this.mainSet.y):c.balloonsSet.push(f);if(this.show){var g=this.l,k=this.t,l=this.r,m=this.b,p=this.balloonColor,q=this.fillColor,n=this.borderColor,t=q;void 0!=p&&(this.adjustBorderColor?t=n=p:q=p);var r=this.horizontalPadding,w=this.verticalPadding,z=this.pointerWidth,x=this.pointerOrientation,u=this.cornerRadius,A=c.fontFamily,y=this.fontSize;void 0==y&&(y=c.fontSize);var p=document.createElement("div"),B=c.classNamePrefix;p.className=B+"-balloon-div";this.className&&(p.className=p.className+" "+B+"-balloon-div-"+this.className);B=p.style;this.disableMouseEvents&&(B.pointerEvents="none");B.position="absolute";var D=this.minWidth,C=document.createElement("div");p.appendChild(C);var I=C.style;isNaN(D)||(I.minWidth=D-2*r+"px");I.textAlign=this.textAlign;I.maxWidth=this.maxWidth+"px";I.fontSize=y+"px";I.color=this.color;I.fontFamily=A;C.innerHTML=this.text;c.chartDiv.appendChild(p);this.textDiv=p;var I=p.offsetWidth,H=p.offsetHeight;p.clientHeight&&(I=p.clientWidth,H=p.clientHeight);A=H+2*w;C=I+2*r;!isNaN(D)&&C<D&&(C=D);window.opera&&(A+=2);var Q=!1,y=this.offsetY;c.handDrawn&&(y+=c.handDrawScatter+2);"H"!=x?(D=a-C/2,b<k+A+10&&"down"!=x?(Q=!0,e&&(b+=y),y=b+z,this.deltaSignY=-1):(e&&(b-=y),y=b-A-z,this.deltaSignY=1)):(2*z>A&&(z=A/2),y=b-A/2,a<g+(l-g)/2?(D=a+z,this.deltaSignX=-1):(D=a-C-z,this.deltaSignX=1));y+A>=m&&(y=m-A);y<k&&(y=k);D<g&&(D=g);D+C>l&&(D=l-C);var k=y+w,m=D+r,M=this.shadowAlpha,P=this.shadowColor,r=this.borderThickness,ia=this.bulletSize,J,w=this.fillAlpha,aa=this.borderAlpha;this.showBullet&&(J=d.circle(h,ia,t,w),f.push(J));this.drop?(g=C/1.6,l=0,"V"==x&&(x="down"),"H"==x&&(x="left"),"down"==x&&(D=a+1,y=b-g-g/3),"up"==x&&(l=180,D=a+1,y=b+g+g/3),"left"==x&&(l=270,D=a+g+g/3+2,y=b),"right"==x&&(l=90,D=a-g-g/3+2,y=b),k=y-H/2+1,m=D-I/2-1,q=d.drop(h,g,l,q,w,r,n,aa)):0<u||0===z?(0<M&&(a=d.rect(h,C,A,q,0,r+1,P,M,u),d.isModern?a.translate(1,1):a.translate(4,4),f.push(a)),q=d.rect(h,C,A,q,w,r,n,aa,u)):(t=[],u=[],"H"!=x?(g=a-D,g>C-z&&(g=C-z),g<z&&(g=z),t=[0,g-z,a-D,g+z,C,C,0,0],u=Q?[0,0,b-y,0,0,A,A,0]:[A,A,b-y,A,A,0,0,A]):(x=b-y,x>A-z&&(x=A-z),x<z&&(x=z),u=[0,x-z,b-y,x+z,A,A,0,0],t=a<g+(l-g)/2?[0,0,D<a?0:a-D,0,0,C,C,0]:[C,C,D+C>a?C:a-D,C,C,0,0,C]),0<M&&(a=d.polygon(h,t,u,q,0,r,P,M),a.translate(1,1),f.push(a)),q=d.polygon(h,t,u,q,w,r,n,aa));this.bg=q;f.push(q);q.toFront();d.setCN(c,q,"balloon-bg");this.className&&d.setCN(c,q,"balloon-bg-"+this.className);h=1*this.deltaSignX;m+=this.sdx;k+=this.sdy;B.left=m+"px";B.top=k+"px";f.translate(D-h,y,1,!0);q=q.getBBox();this.bottom=y+A+1;this.yPos=q.y+y;J&&J.translate(this.pointToX-D+h,b-y);b=this.animationDuration;0<this.animationDuration&&!e&&!isNaN(this.prevX)&&(f.translate(this.prevX,this.prevY,NaN,!0),f.animate({translate:D-h+","+y},b,"easeOutSine"),p&&(B.left=this.prevTX+"px",B.top=this.prevTY+"px",this.xAnim=c.animate({node:p},"left",this.prevTX,m,b,"easeOutSine","px"),this.yAnim=c.animate({node:p},"top",this.prevTY,k,b,"easeOutSine","px")));this.prevX=D-h;this.prevY=y;this.prevTX=m;this.prevTY=k}}},fixPrevious:function(){this.rPrevX=this.prevX;this.rPrevY=this.prevY;this.rPrevTX=this.prevTX;this.rPrevTY=this.prevTY},restorePrevious:function(){this.prevX=this.rPrevX;this.prevY=this.rPrevY;this.prevTX=this.rPrevTX;this.prevTY=this.rPrevTY},followMouse:function(){if(this.follow&&this.show){var a=this.chart.mouseX-this.offsetX*this.deltaSignX-this.sdx,b=this.chart.mouseY-this.sdy;this.pointToX=a;this.pointToY=b;if(a!=this.previousX||b!=this.previousY)if(this.previousX=a,this.previousY=b,0===this.cornerRadius)this.draw();else{var c=this.set;if(c){var d=c.getBBox(),a=a-d.width/2,h=b-d.height-10;a<this.l&&(a=this.l);a>this.r-d.width&&(a=this.r-d.width);h<this.t&&(h=b+10);c.translate(a,h);b=this.textDiv.style;b.left=a+this.horizontalPadding+"px";b.top=h+this.verticalPadding+"px"}}}},changeColor:function(a){this.balloonColor=a},setBounds:function(a,b,c,d){this.l=a;this.t=b;this.r=c;this.b=d;this.destroyTO&&clearTimeout(this.destroyTO)},showBalloon:function(a){if(this.text!=a||this.positionChanged)this.text=a,this.isHiding=!1,this.show=!0,this.destroyTO&&clearTimeout(this.destroyTO),a=this.chart,this.fadeAnim1&&a.stopAnim(this.fadeAnim1),this.fadeAnim2&&a.stopAnim(this.fadeAnim2),this.draw(),this.positionChanged=!1},hide:function(a){var b=this;b.text=void 0;isNaN(a)&&(a=b.fadeOutDuration);var c=b.chart;if(0<a&&!b.isHiding){b.isHiding=!0;b.destroyTO&&clearTimeout(b.destroyTO);b.destroyTO=setTimeout(function(){b.destroy.call(b)},1E3*a);b.follow=!1;b.show=!1;var d=b.set;d&&(d.setAttr("opacity",b.fillAlpha),b.fadeAnim1=d.animate({opacity:0},a,"easeInSine"));b.textDiv&&(b.fadeAnim2=c.animate({node:b.textDiv},"opacity",1,0,a,"easeInSine",""))}else b.show=!1,b.follow=!1,b.destroy()},setPosition:function(a,b){if(a!=this.pointToX||b!=this.pointToY)this.previousX=this.pointToX,this.previousY=this.pointToY,this.pointToX=a,this.pointToY=b,this.positionChanged=!0},followCursor:function(a){var b=this;b.follow=a;clearInterval(b.interval);var c=b.chart.mouseX-b.sdx,d=b.chart.mouseY-b.sdy;!isNaN(c)&&a&&(b.pointToX=c-b.offsetX*b.deltaSignX,b.pointToY=d,b.followMouse(),b.interval=setInterval(function(){b.followMouse.call(b)},40))},removeDiv:function(){if(this.textDiv){var a=this.textDiv.parentNode;a&&a.removeChild(this.textDiv)}},destroy:function(){clearInterval(this.interval);d.remove(this.set);this.removeDiv();this.set=null}})})();(function(){var d=window.AmCharts;d.AmCoordinateChart=d.Class({inherits:d.AmChart,construct:function(a){d.AmCoordinateChart.base.construct.call(this,a);this.theme=a;this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.startAlpha=1;this.startDuration=0;this.startEffect="elastic";this.sequencedAnimation=!0;this.colors="#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");this.balloonDateFormat="MMM DD, YYYY";this.valueAxes=[];this.graphs=[];this.guides=[];this.gridAboveGraphs=!1;d.applyTheme(this,a,"AmCoordinateChart")},initChart:function(){d.AmCoordinateChart.base.initChart.call(this);this.drawGraphs=!0;var a=this.categoryAxis;a&&(this.categoryAxis=d.processObject(a,d.CategoryAxis,this.theme));this.processValueAxes();this.createValueAxes();this.processGraphs();this.processGuides();d.VML&&(this.startAlpha=1);this.setLegendData(this.graphs);this.gridAboveGraphs&&(this.gridSet.toFront(),this.bulletSet.toFront(),this.balloonsSet.toFront())},createValueAxes:function(){if(0===this.valueAxes.length){var a=new d.ValueAxis;this.addValueAxis(a)}},parseData:function(){this.processValueAxes();this.processGraphs()},parseSerialData:function(a){this.chartData=[];if(a)if(0<this.processTimeout){1>this.processCount&&(this.processCount=1);var b=a.length/this.processCount;this.parseCount=Math.ceil(b)-1;for(var c=0;c<b;c++)this.delayParseSerialData(a,c)}else this.parseCount=0,this.parsePartSerialData(a,0,a.length,0);else this.onDataUpdated()},delayParseSerialData:function(a,b){var c=this,d=c.processCount;setTimeout(function(){c.parsePartSerialData.call(c,a,b*d,(b+1)*d,b)},c.processTimeout)},parsePartSerialData:function(a,b,c,e){c>a.length&&(c=a.length);var h=this.graphs,f={},g=this.seriesIdField;g||(g=this.categoryField);var k=!1,l,m=this.categoryAxis,p,q,n;m&&(k=m.parseDates,p=m.forceShowField,n=m.classNameField,q=m.labelColorField,l=m.categoryFunction);var t,r,w={},z;k&&(t=d.extractPeriod(m.minPeriod),r=t.period,t=t.count,z=d.getPeriodDuration(r,t));var x={};this.lookupTable=x;var u,A=this.dataDateFormat,y={};for(u=b;u<c;u++){var B={},D=a[u];b=D[this.categoryField];B.dataContext=D;B.category=l?l(b,D,m):String(b);p&&(B.forceShow=D[p]);n&&(B.className=D[n]);q&&(B.labelColor=D[q]);x[D[g]]=B;if(k&&(m.categoryFunction?b=m.categoryFunction(b,D,m):(!A||b instanceof Date||(b=b.toString()+" |"),b=d.getDate(b,A,m.minPeriod)),b=d.resetDateToMin(b,r,t,m.firstDayOfWeek),B.category=b,B.time=b.getTime(),isNaN(B.time)))continue;var C=this.valueAxes;B.axes={};B.x={};var I;for(I=0;I<C.length;I++){var H=C[I].id;B.axes[H]={};B.axes[H].graphs={};var Q;for(Q=0;Q<h.length;Q++){b=h[Q];var M=b.id,P=1.1;isNaN(b.gapPeriod)||(P=b.gapPeriod);var ia=b.periodValue;if(b.valueAxis.id==H){B.axes[H].graphs[M]={};var J={};J.index=u;var aa=D;b.dataProvider&&(aa=f);J.values=this.processValues(aa,b,ia);if(!b.connect||b.forceGap&&!isNaN(b.gapPeriod))if(y&&y[M]&&0<P&&B.time-w[M]>=z*P&&(y[M].gap=!0),b.forceGap){var P=0,ma;for(ma in J.values)P++;0<P&&(w[M]=B.time,y[M]=J)}else w[M]=B.time,y[M]=J;this.processFields(b,J,aa);J.category=B.category;J.serialDataItem=B;J.graph=b;B.axes[H].graphs[M]=J}}}this.chartData[u]=B}if(this.parseCount==e){for(a=0;a<h.length;a++)b=h[a],b.dataProvider&&this.parseGraphData(b);this.dataChanged=!1;this.dispatchDataUpdated=!0;this.onDataUpdated()}},processValues:function(a,b,c){var e={},h,f=!1;"candlestick"!=b.type&&"ohlc"!=b.type||""===c||(f=!0);for(var g="value error open close low high".split(" "),k=0;k<g.length;k++){var l=g[k];"value"!=l&&"error"!=l&&f&&(c=l.charAt(0).toUpperCase()+l.slice(1));var m=a[b[l+"Field"]+c];null!==m&&(h=Number(m),isNaN(h)||(e[l]=h),"date"==b.valueAxis.type&&void 0!==m&&(h=d.getDate(m,b.chart.dataDateFormat),e[l]=h.getTime()))}return e},parseGraphData:function(a){var b=a.dataProvider,c=a.seriesIdField;c||(c=this.seriesIdField);c||(c=this.categoryField);var d;for(d=0;d<b.length;d++){var h=b[d],f=this.lookupTable[String(h[c])],g=a.valueAxis.id;f&&(g=f.axes[g].graphs[a.id],g.serialDataItem=f,g.values=this.processValues(h,a,a.periodValue),this.processFields(a,g,h))}},addValueAxis:function(a){a.chart=this;this.valueAxes.push(a);this.validateData()},removeValueAxesAndGraphs:function(){var a=this.valueAxes,b;for(b=a.length-1;-1<b;b--)this.removeValueAxis(a[b])},removeValueAxis:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--){var d=b[c];d&&d.valueAxis==a&&this.removeGraph(d)}b=this.valueAxes;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);this.validateData()},addGraph:function(a){this.graphs.push(a);this.chooseGraphColor(a,this.graphs.length-1);this.validateData()},removeGraph:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--)b[c]==a&&(b.splice(c,1),a.destroy());this.validateData()},handleValueAxisZoom:function(){},processValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],c=d.processObject(c,d.ValueAxis,this.theme);a[b]=c;c.chart=this;c.init();this.listenTo(c,"axisIntZoomed",this.handleValueAxisZoom);c.id||(c.id="valueAxisAuto"+b+"_"+(new Date).getTime());void 0===c.usePrefixes&&(c.usePrefixes=this.usePrefixes)}},processGuides:function(){var a=this.guides,b=this.categoryAxis;if(a)for(var c=0;c<a.length;c++){var e=a[c];(void 0!==e.category||void 0!==e.date)&&b&&b.addGuide(e);e.id||(e.id="guideAuto"+c+"_"+(new Date).getTime());var h=e.valueAxis;h?(d.isString(h)&&(h=this.getValueAxisById(h)),h?h.addGuide(e):this.valueAxes[0].addGuide(e)):isNaN(e.value)||this.valueAxes[0].addGuide(e)}},processGraphs:function(){var a=this.graphs,b;this.graphsById={};for(b=0;b<a.length;b++){var c=a[b],c=d.processObject(c,d.AmGraph,this.theme);a[b]=c;this.chooseGraphColor(c,b);c.chart=this;c.init();d.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.id||(c.id="graphAuto"+b+"_"+(new Date).getTime());this.graphsById[c.id]=c}},formatString:function(a,b,c){var e=b.graph,h=e.valueAxis;h.duration&&b.values.value&&(h=d.formatDuration(b.values.value,h.duration,"",h.durationUnits,h.maxInterval,h.numberFormatter),a=a.split("[[value]]").join(h));a=d.massReplace(a,{"[[title]]":e.title,"[[description]]":b.description});a=c?d.fixNewLines(a):d.fixBrakes(a);return a=d.cleanFromEmpty(a)},getBalloonColor:function(a,b,c){var e=a.lineColor,h=a.balloonColor;c&&(h=e);c=a.fillColorsR;"object"==typeof c?e=c[0]:void 0!==c&&(e=c);b.isNegative&&(c=a.negativeLineColor,a=a.negativeFillColors,"object"==typeof a?c=a[0]:void 0!==a&&(c=a),void 0!==c&&(e=c));void 0!==b.color&&(e=b.color);void 0!==b.lineColor&&(e=b.lineColor);b=b.fillColors;void 0!==b&&(e=b,d.ifArray(b)&&(e=b[0]));void 0===h&&(h=e);return h},getGraphById:function(a){return d.getObjById(this.graphs,a)},getValueAxisById:function(a){return d.getObjById(this.valueAxes,a)},processFields:function(a,b,c){if(a.itemColors){var e=a.itemColors,h=b.index;b.color=h<e.length?e[h]:d.randomColor()}e="lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className columnIndex".split(" ");for(h=0;h<e.length;h++){var f=e[h],g=a[f+"Field"];g&&(g=c[g],d.isDefined(g)&&(b[f]=g))}b.dataContext=c},chooseGraphColor:function(a,b){if(a.lineColor)a.lineColorR=a.lineColor;else{var c;c=this.colors.length>b?this.colors[b]:a.lineColorR?a.lineColorR:d.randomColor();a.lineColorR=c}a.fillColorsR=a.fillColors?a.fillColors:a.lineColorR;a.bulletBorderColorR=a.bulletBorderColor?a.bulletBorderColor:a.useLineColorForBulletBorder?a.lineColorR:a.bulletColor;a.bulletColorR=a.bulletColor?a.bulletColor:a.lineColorR;if(c=this.patterns)a.pattern=c[b]},handleLegendEvent:function(a){var b=a.type;if(a=a.dataItem){var c=a.hidden,d=a.showBalloon;switch(b){case"clickMarker":this.textClickEnabled&&(d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a));break;case"clickLabel":d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case"rollOverItem":c||this.highlightGraph(a);break;case"rollOutItem":c||this.unhighlightGraph();break;case"hideItem":this.hideGraph(a);break;case"showItem":this.showGraph(a)}}},highlightGraph:function(a){var b=this.graphs;if(b){var c,d=.2;this.legend&&(d=this.legend.rollOverGraphAlpha);if(1!=d)for(c=0;c<b.length;c++){var h=b[c];h!=a&&h.changeOpacity(d)}}},unhighlightGraph:function(){var a;this.legend&&(a=this.legend.rollOverGraphAlpha);if(1!=a){a=this.graphs;var b;for(b=0;b<a.length;b++)a[b].changeOpacity(1)}},showGraph:function(a){a.switchable&&(a.hidden=!1,this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),this.chartCreated&&this.initChart())},hideGraph:function(a){a.switchable&&(this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),a.hidden=!0,this.chartCreated&&this.initChart())},hideGraphsBalloon:function(a){a.showBalloon=!1;this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=!0;this.updateLegend()},updateLegend:function(){this.legend&&this.legend.invalidateSize()},resetAnimation:function(){var a=this.graphs;if(a){var b;for(b=0;b<a.length;b++)a[b].animationPlayed=!1}},animateAgain:function(){this.resetAnimation();this.validateNow()}})})();(function(){var d=window.AmCharts;d.TrendLine=d.Class({construct:function(a){this.cname="TrendLine";this.createEvents("click","rollOver","rollOut");this.isProtected=!1;this.dashLength=0;this.lineColor="#00CC00";this.lineThickness=this.lineAlpha=1;d.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container,e,h,f,g,k=a.categoryAxis,l=a.initialDate,m=a.initialCategory,p=a.finalDate,q=a.finalCategory,n=a.valueAxis,t=a.valueAxisX,r=a.initialXValue,w=a.finalXValue,z=a.initialValue,x=a.finalValue,u=n.recalculateToPercents,A=b.dataDateFormat;k&&(l&&(l=d.getDate(l,A,"fff"),a.initialDate=l,e=k.dateToCoordinate(l)),m&&(e=k.categoryToCoordinate(m)),p&&(p=d.getDate(p,A,"fff"),a.finalDate=p,h=k.dateToCoordinate(p)),q&&(h=k.categoryToCoordinate(q)));t&&!u&&(isNaN(r)||(e=t.getCoordinate(r)),isNaN(w)||(h=t.getCoordinate(w)));n&&!u&&(isNaN(z)||(f=n.getCoordinate(z)),isNaN(x)||(g=n.getCoordinate(x)));if(!(isNaN(e)||isNaN(h)||isNaN(f)||isNaN(f))){b.rotate?(k=[f,g],g=[e,h]):(k=[e,h],g=[f,g]);l=a.lineColor;f=d.line(c,k,g,l,a.lineAlpha,a.lineThickness,a.dashLength);e=k;h=g;q=k[1]-k[0];n=g[1]-g[0];0===q&&(q=.01);0===n&&(n=.01);m=q/Math.abs(q);p=n/Math.abs(n);n=90*Math.PI/180-Math.asin(q/(q*n/Math.abs(q*n)*Math.sqrt(Math.pow(q,2)+Math.pow(n,2))));q=Math.abs(5*Math.cos(n));n=Math.abs(5*Math.sin(n));e.push(k[1]-m*n,k[0]-m*n);h.push(g[1]+p*q,g[0]+p*q);g=d.polygon(c,e,h,l,.005,0);c=c.set([g,f]);c.translate(b.marginLeftReal,b.marginTopReal);b.trendLinesSet.push(c);d.setCN(b,f,"trend-line");d.setCN(b,f,"trend-line-"+a.id);a.line=f;a.set=c;if(f=a.initialImage)f=d.processObject(f,d.Image,a.theme),f.chart=b,f.draw(),f.translate(e[0]+f.offsetX,h[0]+f.offsetY),c.push(f.set);if(f=a.finalImage)f=d.processObject(f,d.Image,a.theme),f.chart=b,f.draw(),f.translate(e[1]+f.offsetX,h[1]+f.offsetY),c.push(f.set);g.mouseup(function(){a.handleLineClick()}).mouseover(function(){a.handleLineOver()}).mouseout(function(){a.handleLineOut()});g.touchend&&g.touchend(function(){a.handleLineClick()});c.clipRect(0,0,b.plotAreaWidth,b.plotAreaHeight)}},handleLineClick:function(){this.fire({type:"click",trendLine:this,chart:this.chart})},handleLineOver:function(){var a=this.rollOverColor;void 0!==a&&this.line.attr({stroke:a});this.balloonText&&(clearTimeout(this.chart.hoverInt),a=this.line.getBBox(),this.chart.showBalloon(this.balloonText,this.lineColor,!0,this.x+a.x+a.width/2,this.y+a.y+a.height/2));this.fire({type:"rollOver",trendLine:this,chart:this.chart})},handleLineOut:function(){this.line.attr({stroke:this.lineColor});this.balloonText&&this.chart.hideBalloon();this.fire({type:"rollOut",trendLine:this,chart:this.chart})},destroy:function(){d.remove(this.set)}})})();(function(){var d=window.AmCharts;d.Image=d.Class({construct:function(a){this.cname="Image";this.height=this.width=20;this.rotation=this.offsetY=this.offsetX=0;this.balloonColor=this.color="#000000";this.opacity=1;d.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.set&&a.set.remove();var b=a.chart.container;a.set=b.set();var c,d;a.url?(c=b.image(a.url,0,0,a.width,a.height),d=1):a.svgPath&&(c=b.path(a.svgPath),c.setAttr("fill",a.color),c.setAttr("stroke",a.outlineColor),b=c.getBBox(),d=Math.min(a.width/b.width,a.height/b.height));c&&(c.setAttr("opacity",a.opacity),a.set.rotate(a.rotation),c.translate(-a.width/2,-a.height/2,d),a.balloonText&&c.mouseover(function(){a.chart.showBalloon(a.balloonText,a.balloonColor,!0)}).mouseout(function(){a.chart.hideBalloon()}).touchend(function(){a.chart.hideBalloon()}).touchstart(function(){a.chart.showBalloon(a.balloonText,a.balloonColor,!0)}),a.set.push(c))},translate:function(a,b){this.set&&this.set.translate(a,b)}})})();(function(){var d=window.AmCharts;d.circle=function(a,b,c,e,h,f,g,k,l){0>=b&&(b=.001);if(void 0==h||0===h)h=.01;void 0===f&&(f="#000000");void 0===g&&(g=0);e={fill:c,stroke:f,"fill-opacity":e,"stroke-width":h,"stroke-opacity":g};a=isNaN(l)?a.circle(0,0,b).attr(e):a.ellipse(0,0,b,l).attr(e);k&&a.gradient("radialGradient",[c,d.adjustLuminosity(c,-.6)]);return a};d.text=function(a,b,c,e,h,f,g,k){f||(f="middle");"right"==f&&(f="end");"left"==f&&(f="start");isNaN(k)&&(k=1);void 0!==b&&(b=String(b),d.isIE&&!d.isModern&&(b=b.replace("&amp;","&"),b=b.replace("&","&amp;")));c={fill:c,"font-family":e,"font-size":h+"px",opacity:k};!0===g&&(c["font-weight"]="bold");c["text-anchor"]=f;return a.text(b,c)};d.polygon=function(a,b,c,e,h,f,g,k,l,m,p){isNaN(f)&&(f=.01);isNaN(k)&&(k=h);var q=e,n=!1;"object"==typeof q&&1<q.length&&(n=!0,q=q[0]);void 0===g&&(g=q);h={fill:q,stroke:g,"fill-opacity":h,"stroke-width":f,"stroke-opacity":k};void 0!==p&&0<p&&(h["stroke-dasharray"]=p);p=d.dx;f=d.dy;a.handDrawn&&(c=d.makeHD(b,c,a.handDrawScatter),b=c[0],c=c[1]);g=Math.round;m&&(b[t]=d.roundTo(b[t],5),c[t]=d.roundTo(c[t],5),g=Number);k="M"+(g(b[0])+p)+","+(g(c[0])+f);for(var t=1;t<b.length;t++)m&&(b[t]=d.roundTo(b[t],5),c[t]=d.roundTo(c[t],5)),k+=" L"+(g(b[t])+p)+","+(g(c[t])+f);a=a.path(k+" Z").attr(h);n&&a.gradient("linearGradient",e,l);return a};d.rect=function(a,b,c,e,h,f,g,k,l,m,p){if(isNaN(b)||isNaN(c))return a.set();isNaN(f)&&(f=0);void 0===l&&(l=0);void 0===m&&(m=270);isNaN(h)&&(h=0);var q=e,n=!1;"object"==typeof q&&(q=q[0],n=!0);void 0===g&&(g=q);void 0===k&&(k=h);b=Math.round(b);c=Math.round(c);var t=0,r=0;0>b&&(b=Math.abs(b),t=-b);0>c&&(c=Math.abs(c),r=-c);t+=d.dx;r+=d.dy;h={fill:q,stroke:g,"fill-opacity":h,"stroke-opacity":k};void 0!==p&&0<p&&(h["stroke-dasharray"]=p);a=a.rect(t,r,b,c,l,f).attr(h);n&&a.gradient("linearGradient",e,m);return a};d.bullet=function(a,b,c,e,h,f,g,k,l,m,p,q,n){var t;"circle"==b&&(b="round");switch(b){case"round":t=d.circle(a,c/2,e,h,f,g,k);break;case"square":t=d.polygon(a,[-c/2,c/2,c/2,-c/2],[c/2,c/2,-c/2,-c/2],e,h,f,g,k,m-180,void 0,n);break;case"rectangle":t=d.polygon(a,[-c,c,c,-c],[c/2,c/2,-c/2,-c/2],e,h,f,g,k,m-180,void 0,n);break;case"diamond":t=d.polygon(a,[-c/2,0,c/2,0],[0,-c/2,0,c/2],e,h,f,g,k);break;case"triangleUp":t=d.triangle(a,c,0,e,h,f,g,k);break;case"triangleDown":t=d.triangle(a,c,180,e,h,f,g,k);break;case"triangleLeft":t=d.triangle(a,c,270,e,h,f,g,k);break;case"triangleRight":t=d.triangle(a,c,90,e,h,f,g,k);break;case"bubble":t=d.circle(a,c/2,e,h,f,g,k,!0);break;case"line":t=d.line(a,[-c/2,c/2],[0,0],e,h,f,g,k);break;case"yError":t=a.set();t.push(d.line(a,[0,0],[-c/2,c/2],e,h,f));t.push(d.line(a,[-l,l],[-c/2,-c/2],e,h,f));t.push(d.line(a,[-l,l],[c/2,c/2],e,h,f));break;case"xError":t=a.set(),t.push(d.line(a,[-c/2,c/2],[0,0],e,h,f)),t.push(d.line(a,[-c/2,-c/2],[-l,l],e,h,f)),t.push(d.line(a,[c/2,c/2],[-l,l],e,h,f))}t&&t.pattern(p,NaN,q);return t};d.triangle=function(a,b,c,d,h,f,g,k){if(void 0===f||0===f)f=1;void 0===g&&(g="#000");void 0===k&&(k=0);d={fill:d,stroke:g,"fill-opacity":h,"stroke-width":f,"stroke-opacity":k};b/=2;var l;0===c&&(l=" M"+-b+","+b+" L0,"+-b+" L"+b+","+b+" Z");180==c&&(l=" M"+-b+","+-b+" L0,"+b+" L"+b+","+-b+" Z");90==c&&(l=" M"+-b+","+-b+" L"+b+",0 L"+-b+","+b+" Z");270==c&&(l=" M"+-b+",0 L"+b+","+b+" L"+b+","+-b+" Z");return a.path(l).attr(d)};d.line=function(a,b,c,e,h,f,g,k,l,m,p){if(a.handDrawn&&!p)return d.handDrawnLine(a,b,c,e,h,f,g,k,l,m,p);f={fill:"none","stroke-width":f};void 0!==g&&0<g&&(f["stroke-dasharray"]=g);isNaN(h)||(f["stroke-opacity"]=h);e&&(f.stroke=e);e=Math.round;m&&(e=Number,b[0]=d.roundTo(b[0],5),c[0]=d.roundTo(c[0],5));m=d.dx;h=d.dy;g="M"+(e(b[0])+m)+","+(e(c[0])+h);for(k=1;k<b.length;k++)b[k]=d.roundTo(b[k],5),c[k]=d.roundTo(c[k],5),g+=" L"+(e(b[k])+m)+","+(e(c[k])+h);if(d.VML)return a.path(g,void 0,!0).attr(f);l&&(g+=" M0,0 L0,0");return a.path(g).attr(f)};d.makeHD=function(a,b,c){for(var d=[],h=[],f=1;f<a.length;f++)for(var g=Number(a[f-1]),k=Number(b[f-1]),l=Number(a[f]),m=Number(b[f]),p=Math.round(Math.sqrt(Math.pow(l-g,2)+Math.pow(m-k,2))/50)+1,l=(l-g)/p,m=(m-k)/p,q=0;q<=p;q++){var n=k+q*m+Math.random()*c;d.push(g+q*l+Math.random()*c);h.push(n)}return[d,h]};d.handDrawnLine=function(a,b,c,e,h,f,g,k,l,m){var p,q=a.set();for(p=1;p<b.length;p++)for(var n=[b[p-1],b[p]],t=[c[p-1],c[p]],t=d.makeHD(n,t,a.handDrawScatter),n=t[0],t=t[1],r=1;r<n.length;r++)q.push(d.line(a,[n[r-1],n[r]],[t[r-1],t[r]],e,h,f+Math.random()*a.handDrawThickness-a.handDrawThickness/2,g,k,l,m,!0));return q};d.doNothing=function(a){return a};d.drop=function(a,b,c,d,h,f,g,k){var l=1/180*Math.PI,m=c-20,p=Math.sin(m*l)*b,q=Math.cos(m*l)*b,n=Math.sin((m+40)*l)*b,t=Math.cos((m+40)*l)*b,r=.8*b,w=-b/3,z=b/3;0===c&&(w=-w,z=0);180==c&&(z=0);90==c&&(w=0);270==c&&(w=0,z=-z);c={fill:d,stroke:g,"stroke-width":f,"stroke-opacity":k,"fill-opacity":h};b="M"+p+","+q+" A"+b+","+b+",0,1,1,"+n+","+t+(" A"+r+","+r+",0,0,0,"+(Math.sin((m+20)*l)*b+z)+","+(Math.cos((m+20)*l)*b+w));b+=" A"+r+","+r+",0,0,0,"+p+","+q;return a.path(b,void 0,void 0,"1000,1000").attr(c)};d.wedge=function(a,b,c,e,h,f,g,k,l,m,p,q,n,t){var r=Math.round;f=r(f);g=r(g);k=r(k);var w=r(g/f*k),z=d.VML,x=359.5+f/100;359.94<x&&(x=359.94);h>=x&&(h=x);var u=1/180*Math.PI,x=b+Math.sin(e*u)*k,A=c-Math.cos(e*u)*w,y=b+Math.sin(e*u)*f,B=c-Math.cos(e*u)*g,D=b+Math.sin((e+h)*u)*f,C=c-Math.cos((e+h)*u)*g,I=b+Math.sin((e+h)*u)*k,u=c-Math.cos((e+h)*u)*w,H={fill:d.adjustLuminosity(m.fill,-.2),"stroke-opacity":0,"fill-opacity":m["fill-opacity"]},Q=0;180<Math.abs(h)&&(Q=1);e=a.set();var M;z&&(x=r(10*x),y=r(10*y),D=r(10*D),I=r(10*I),A=r(10*A),B=r(10*B),C=r(10*C),u=r(10*u),b=r(10*b),l=r(10*l),c=r(10*c),f*=10,g*=10,k*=10,w*=10,1>Math.abs(h)&&1>=Math.abs(D-y)&&1>=Math.abs(C-B)&&(M=!0));h="";var P;q&&(H["fill-opacity"]=0,H["stroke-opacity"]=m["stroke-opacity"]/2,H.stroke=m.stroke);if(0<l){P=" M"+x+","+(A+l)+" L"+y+","+(B+l);z?(M||(P+=" A"+(b-f)+","+(l+c-g)+","+(b+f)+","+(l+c+g)+","+y+","+(B+l)+","+D+","+(C+l)),P+=" L"+I+","+(u+l),0<k&&(M||(P+=" B"+(b-k)+","+(l+c-w)+","+(b+k)+","+
(l+c+w)+","+I+","+(l+u)+","+x+","+(l+A)))):(P+=" A"+f+","+g+",0,"+Q+",1,"+D+","+(C+l)+" L"+I+","+(u+l),0<k&&(P+=" A"+k+","+w+",0,"+Q+",0,"+x+","+(A+l)));P+=" Z";var ia=l;z&&(ia/=10);for(var J=0;J<ia;J+=10){var aa=a.path(P,void 0,void 0,"1000,1000").attr(H);e.push(aa);aa.translate(0,-J)}P=a.path(" M"+x+","+A+" L"+x+","+(A+l)+" L"+y+","+(B+l)+" L"+y+","+B+" L"+x+","+A+" Z",void 0,void 0,"1000,1000").attr(H);l=a.path(" M"+D+","+C+" L"+D+","+(C+l)+" L"+I+","+(u+l)+" L"+I+","+u+" L"+D+","+C+" Z",void 0,void 0,"1000,1000").attr(H);e.push(P);e.push(l)}z?(M||(h=" A"+r(b-f)+","+r(c-g)+","+r(b+f)+","+r(c+g)+","+r(y)+","+r(B)+","+r(D)+","+r(C)),g=" M"+r(x)+","+r(A)+" L"+r(y)+","+r(B)+h+" L"+r(I)+","+r(u)):g=" M"+x+","+A+" L"+y+","+B+(" A"+f+","+g+",0,"+Q+",1,"+D+","+C)+" L"+I+","+u;0<k&&(z?M||(g+=" B"+(b-k)+","+(c-w)+","+(b+k)+","+(c+w)+","+I+","+u+","+x+","+A):g+=" A"+k+","+w+",0,"+Q+",0,"+x+","+A);a.handDrawn&&(k=d.line(a,[x,y],[A,B],m.stroke,m.thickness*Math.random()*a.handDrawThickness,m["stroke-opacity"]),e.push(k));a=a.path(g+" Z",void 0,void 0,"1000,1000").attr(m);if(p){k=[];for(w=0;w<p.length;w++)k.push(d.adjustLuminosity(m.fill,p[w]));"radial"!=t||d.isModern||(k=[]);0<k.length&&a.gradient(t+"Gradient",k)}d.isModern&&"radial"==t&&a.grad&&(a.grad.setAttribute("gradientUnits","userSpaceOnUse"),a.grad.setAttribute("r",f),a.grad.setAttribute("cx",b),a.grad.setAttribute("cy",c));a.pattern(q,NaN,n);e.wedge=a;e.push(a);return e};d.rgb2hex=function(a){return(a=a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===a.length?"#"+("0"+parseInt(a[1],10).toString(16)).slice(-2)+("0"+parseInt(a[2],10).toString(16)).slice(-2)+("0"+parseInt(a[3],10).toString(16)).slice(-2):""};d.adjustLuminosity=function(a,b){a&&-1!=a.indexOf("rgb")&&(a=d.rgb2hex(a));a=String(a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=String(a[0])+String(a[0])+String(a[1])+String(a[1])+String(a[2])+String(a[2]));b=b||0;var c="#",e,h;for(h=0;3>h;h++)e=parseInt(a.substr(2*h,2),16),e=Math.round(Math.min(Math.max(0,e+e*b),255)).toString(16),c+=("00"+
e).substr(e.length);return c}})();(function(){var d=window.AmCharts;d.Bezier=d.Class({construct:function(a,b,c,e,h,f,g,k,l,m,p){var q=a.chart,n=d.bezierX,t=d.bezierY;isNaN(q.bezierX)||(n=q.bezierX);isNaN(q.bezierY)||(t=q.bezierY);isNaN(n)&&(q.rotate?(n=20,t=4):(t=20,n=4));var r,w;"object"==typeof g&&1<g.length&&(w=!0,r=g,g=g[0]);"object"==typeof k&&(k=k[0]);0===k&&(g="none");f={fill:g,"fill-opacity":k,"stroke-width":f};void 0!==l&&0<l&&(f["stroke-dasharray"]=l);isNaN(h)||(f["stroke-opacity"]=h);e&&(f.stroke=e);e="M"+Math.round(b[0])+","+Math.round(c[0])+" ";h=[];for(l=0;l<b.length;l++)isNaN(b[l])||isNaN(c[l])?(e+=this.drawSegment(h,n,t),l<b.length-1&&(e+="L"+b[l+1]+","+c[l+1]+" "),h=[]):h.push({x:Number(b[l]),y:Number(c[l])});e+=this.drawSegment(h,n,t);m?e+=m:d.VML||(e+="M0,0 L0,0");this.path=a.path(e).attr(f);this.node=this.path.node;w&&this.path.gradient("linearGradient",r,p)},drawSegment:function(a,b,c){var d="";if(2<a.length)for(var h=0;h<a.length-1;h++){var f=[],g=a[h-1],k=a[h],l=a[h+1],m=a[h+2];0===h?(f.push({x:k.x,y:k.y}),f.push({x:k.x,y:k.y}),f.push({x:l.x,y:l.y}),f.push({x:m.x,y:m.y})):h>=a.length-2?(f.push({x:g.x,y:g.y}),f.push({x:k.x,y:k.y}),f.push({x:l.x,y:l.y}),f.push({x:l.x,y:l.y})):(f.push({x:g.x,y:g.y}),f.push({x:k.x,y:k.y}),f.push({x:l.x,y:l.y}),f.push({x:m.x,y:m.y}));g=[];k=Math.round;g.push({x:k(f[1].x),y:k(f[1].y)});g.push({x:k((-f[0].x+b*f[1].x+f[2].x)/b),y:k((-f[0].y+c*f[1].y+f[2].y)/c)});g.push({x:k((f[1].x+b*f[2].x-f[3].x)/b),y:k((f[1].y+c*f[2].y-f[3].y)/c)});g.push({x:k(f[2].x),y:k(f[2].y)});d+="C"+
g[1].x+","+g[1].y+","+g[2].x+","+g[2].y+","+g[3].x+","+g[3].y+" "}else 1<a.length&&(d+="L"+a[1].x+","+a[1].y);return d}})})();(function(){var d=window.AmCharts;d.AmDraw=d.Class({construct:function(a,b,c,e){d.SVG_NS="http://www.w3.org/2000/svg";d.SVG_XLINK="http://www.w3.org/1999/xlink";d.hasSVG=!!document.createElementNS&&!!document.createElementNS(d.SVG_NS,"svg").createSVGRect;1>b&&(b=10);1>c&&(c=10);this.div=a;this.width=b;this.height=c;this.rBin=document.createElement("div");d.hasSVG?(d.SVG=!0,b=this.createSvgElement("svg"),a.appendChild(b),this.container=b,this.addDefs(e),this.R=new d.SVGRenderer(this)):d.isIE&&d.VMLRenderer&&(d.VML=!0,d.vmlStyleSheet||(document.namespaces.add("amvml","urn:schemas-microsoft-com:vml"),31>document.styleSheets.length?(b=document.createStyleSheet(),b.addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true"),d.vmlStyleSheet=b):document.styleSheets[0].addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true")),this.container=a,this.R=new d.VMLRenderer(this,e),this.R.disableSelection(a))},createSvgElement:function(a){return document.createElementNS(d.SVG_NS,a)},circle:function(a,b,c,e){var h=new d.AmDObject("circle",this);h.attr({r:c,cx:a,cy:b});this.addToContainer(h.node,e);return h},ellipse:function(a,b,c,e,h){var f=new d.AmDObject("ellipse",this);f.attr({rx:c,ry:e,cx:a,cy:b});this.addToContainer(f.node,h);return f},setSize:function(a,b){0<a&&0<b&&(this.container.style.width=a+"px",this.container.style.height=b+"px")},rect:function(a,b,c,e,h,f,g){var k=new d.AmDObject("rect",this);d.VML&&(h=Math.round(100*h/Math.min(c,e)),c+=2*f,e+=2*f,k.bw=f,k.node.style.marginLeft=-f,k.node.style.marginTop=-f);1>c&&(c=1);1>e&&(e=1);k.attr({x:a,y:b,width:c,height:e,rx:h,ry:h,"stroke-width":f});this.addToContainer(k.node,g);return k},image:function(a,b,c,e,h,f){var g=new d.AmDObject("image",this);g.attr({x:b,y:c,width:e,height:h});this.R.path(g,a);this.addToContainer(g.node,f);return g},addToContainer:function(a,b){b||(b=this.container);b.appendChild(a)},text:function(a,b,c){return this.R.text(a,b,c)},path:function(a,b,c,e){var h=new d.AmDObject("path",this);e||(e="100,100");h.attr({cs:e});c?h.attr({dd:a}):h.attr({d:a});this.addToContainer(h.node,b);return h},set:function(a){return this.R.set(a)},remove:function(a){if(a){var b=this.rBin;b.appendChild(a);b.innerHTML=""}},renderFix:function(){var a=this.container,b=a.style;b.top="0px";b.left="0px";try{var c=a.getBoundingClientRect(),d=c.left-Math.round(c.left),h=c.top-Math.round(c.top);d&&(b.left=d+"px");h&&(b.top=h+"px")}catch(f){}},update:function(){this.R.update()},addDefs:function(a){if(d.hasSVG){var b=this.createSvgElement("desc"),c=this.container;c.setAttribute("version","1.1");c.style.position="absolute";this.setSize(this.width,this.height);if(a.accessibleTitle){var e=this.createSvgElement("text");c.appendChild(e);e.innerHTML=a.accessibleTitle;e.style.opacity=0}d.rtl&&(c.setAttribute("direction","rtl"),c.style.left="auto",c.style.right="0px");a&&(a.addCodeCredits&&b.appendChild(document.createTextNode("JavaScript chart by amCharts "+a.version)),c.appendChild(b),a.defs&&(b=this.createSvgElement("defs"),c.appendChild(b),d.parseDefs(a.defs,b),this.defs=b))}}})})();(function(){var d=window.AmCharts;d.AmDObject=d.Class({construct:function(a,b){this.D=b;this.R=b.R;this.node=this.R.create(this,a);this.y=this.x=0;this.scale=1},attr:function(a){this.R.attr(this,a);return this},getAttr:function(a){return this.node.getAttribute(a)},setAttr:function(a,b){this.R.setAttr(this,a,b);return this},clipRect:function(a,b,c,d){this.R.clipRect(this,a,b,c,d)},translate:function(a,b,c,d){d||(a=Math.round(a),b=Math.round(b));this.R.move(this,a,b,c);this.x=a;this.y=b;this.scale=c;this.angle&&this.rotate(this.angle)},rotate:function(a,b){this.R.rotate(this,a,b);this.angle=a},animate:function(a,b,c){for(var e in a)if(a.hasOwnProperty(e)){var h=e,f=a[e];c=d.getEffect(c);this.R.animate(this,h,f,b,c)}},push:function(a){if(a){var b=this.node;b.appendChild(a.node);var c=a.clipPath;c&&b.appendChild(c);(a=a.grad)&&b.appendChild(a)}},text:function(a){this.R.setText(this,a)},remove:function(){this.stop();this.R.remove(this)},clear:function(){var a=this.node;if(a.hasChildNodes())for(;1<=a.childNodes.length;)a.removeChild(a.firstChild)},hide:function(){this.setAttr("visibility","hidden")},show:function(){this.setAttr("visibility","visible")},getBBox:function(){return this.R.getBBox(this)},toFront:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;b&&b.appendChild(a)}},toPrevious:function(){var a=this.node;a&&this.prevNextNode&&(a=a.parentNode)&&a.insertBefore(this.prevNextNode,null)},toBack:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;if(b){var c=b.firstChild;c&&b.insertBefore(a,c)}}},mouseover:function(a){this.R.addListener(this,"mouseover",a);return this},mouseout:function(a){this.R.addListener(this,"mouseout",a);return this},click:function(a){this.R.addListener(this,"click",a);return this},dblclick:function(a){this.R.addListener(this,"dblclick",a);return this},mousedown:function(a){this.R.addListener(this,"mousedown",a);return this},mouseup:function(a){this.R.addListener(this,"mouseup",a);return this},touchmove:function(a){this.R.addListener(this,"touchmove",a);return this},touchstart:function(a){this.R.addListener(this,"touchstart",a);return this},touchend:function(a){this.R.addListener(this,"touchend",a);return this},keyup:function(a){this.R.addListener(this,"keyup",a);return this},focus:function(a){this.R.addListener(this,"focus",a);return this},blur:function(a){this.R.addListener(this,"blur",a);return this},contextmenu:function(a){this.node.addEventListener?this.node.addEventListener("contextmenu",a,!0):this.R.addListener(this,"contextmenu",a);return this},stop:function(){d.removeFromArray(this.R.animations,this.an_translate);d.removeFromArray(this.R.animations,this.an_y);d.removeFromArray(this.R.animations,this.an_x)},length:function(){return this.node.childNodes.length},gradient:function(a,b,c){this.R.gradient(this,a,b,c)},pattern:function(a,b,c){a&&this.R.pattern(this,a,b,c)}})})();(function(){var d=window.AmCharts;d.VMLRenderer=d.Class({construct:function(a,b){this.chart=b;this.D=a;this.cNames={circle:"oval",ellipse:"oval",rect:"roundrect",path:"shape"};this.styleMap={x:"left",y:"top",width:"width",height:"height","font-family":"fontFamily","font-size":"fontSize",visibility:"visibility"}},create:function(a,b){var c;if("group"==b)c=document.createElement("div"),a.type="div";else if("text"==b)c=document.createElement("div"),a.type="text";else if("image"==b)c=document.createElement("img"),a.type="image";else{a.type="shape";a.shapeType=this.cNames[b];c=document.createElement("amvml:"+this.cNames[b]);var d=document.createElement("amvml:stroke");c.appendChild(d);a.stroke=d;var h=document.createElement("amvml:fill");c.appendChild(h);a.fill=h;h.className="amvml";d.className="amvml";c.className="amvml"}c.style.position="absolute";c.style.top=0;c.style.left=0;return c},path:function(a,b){a.node.setAttribute("src",b)},setAttr:function(a,b,c){if(void 0!==c){var e;8===document.documentMode&&(e=!0);var h=a.node,f=a.type,g=h.style;"r"==b&&(g.width=2*c,g.height=2*c);"oval"==a.shapeType&&("rx"==b&&(g.width=2*c),"ry"==b&&(g.height=2*c));"roundrect"==a.shapeType&&("width"!=b&&"height"!=b||--c);"cursor"==b&&(g.cursor=c);"cx"==b&&(g.left=c-d.removePx(g.width)/2);"cy"==b&&(g.top=c-d.removePx(g.height)/2);var k=this.styleMap[b];"width"==k&&0>c&&(c=0);void 0!==k&&(g[k]=c);"text"==f&&("text-anchor"==b&&(a.anchor=c,k=h.clientWidth,"end"==c&&(g.marginLeft=-k+"px"),"middle"==c&&(g.marginLeft=-(k/2)+
"px",g.textAlign="center"),"start"==c&&(g.marginLeft="0px")),"fill"==b&&(g.color=c),"font-weight"==b&&(g.fontWeight=c));if(g=a.children)for(k=0;k<g.length;k++)g[k].setAttr(b,c);if("shape"==f){"cs"==b&&(h.style.width="100px",h.style.height="100px",h.setAttribute("coordsize",c));"d"==b&&h.setAttribute("path",this.svgPathToVml(c));"dd"==b&&h.setAttribute("path",c);f=a.stroke;a=a.fill;"stroke"==b&&(e?f.color=c:f.setAttribute("color",c));"stroke-width"==b&&(e?f.weight=c:f.setAttribute("weight",c));"stroke-opacity"==b&&(e?f.opacity=c:f.setAttribute("opacity",c));"stroke-dasharray"==b&&(g="solid",0<c&&3>c&&(g="dot"),3<=c&&6>=c&&(g="dash"),6<c&&(g="longdash"),e?f.dashstyle=g:f.setAttribute("dashstyle",g));if("fill-opacity"==b||"opacity"==b)0===c?e?a.on=!1:a.setAttribute("on",!1):e?a.opacity=c:a.setAttribute("opacity",c);"fill"==b&&(e?a.color=c:a.setAttribute("color",c));"rx"==b&&(e?h.arcSize=c+"%":h.setAttribute("arcsize",c+"%"))}}},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},text:function(a,b,c){var e=new d.AmDObject("text",this.D),h=e.node;h.style.whiteSpace="pre";h.innerHTML=a;this.D.addToContainer(h,c);this.attr(e,b);return e},getBBox:function(a){return this.getBox(a.node)},getBox:function(a){var b=a.offsetLeft,c=a.offsetTop,d=a.offsetWidth,h=a.offsetHeight,f;if(a.hasChildNodes()){var g,k,l;for(l=0;l<a.childNodes.length;l++){f=this.getBox(a.childNodes[l]);var m=f.x;isNaN(m)||(isNaN(g)?g=m:m<g&&(g=m));var p=f.y;isNaN(p)||(isNaN(k)?k=p:p<k&&(k=p));m=f.width+m;isNaN(m)||(d=Math.max(d,m));f=f.height+p;isNaN(f)||(h=Math.max(h,f))}0>g&&(b+=g);0>k&&(c+=k)}return{x:b,y:c,width:d,height:h}},setText:function(a,b){var c=a.node;c&&(c.innerHTML=b);this.setAttr(a,"text-anchor",a.anchor)},addListener:function(a,b,c){a.node["on"+b]=c},move:function(a,b,c){var e=a.node,h=e.style;"text"==a.type&&(c-=d.removePx(h.fontSize)/2-1);"oval"==a.shapeType&&(b-=d.removePx(h.width)/2,c-=d.removePx(h.height)/2);a=a.bw;isNaN(a)||(b-=a,c-=a);isNaN(b)||isNaN(c)||(e.style.left=b+"px",e.style.top=c+"px")},svgPathToVml:function(a){var b=a.split(" ");a="";var c,d=Math.round,h;for(h=0;h<b.length;h++){var f=b[h],g=f.substring(0,1),f=f.substring(1),k=f.split(","),l=d(k[0])+","+d(k[1]);"M"==g&&(a+=" m "+l);"L"==g&&(a+=" l "+l);"Z"==g&&(a+=" x e");if("Q"==g){var m=c.length,p=c[m-1],q=k[0],n=k[1],l=k[2],t=k[3];c=d(c[m-2]/3+2/3*q);p=d(p/3+2/3*n);q=d(2/3*q+l/3);n=d(2/3*n+t/3);a+=" c "+c+","+p+","+q+","+n+","+l+","+t}"C"==g&&(a+=" c "+k[0]+","+k[1]+","+k[2]+","+k[3]+","+k[4]+","+k[5]);"A"==g&&(a+=" wa "+
f);"B"==g&&(a+=" at "+f);c=k}return a},animate:function(a,b,c,d,h){var f=a.node,g=this.chart;a.animationFinished=!1;if("translate"==b){b=c.split(",");c=b[1];var k=f.offsetTop;g.animate(a,"left",f.offsetLeft,b[0],d,h,"px");g.animate(a,"top",k,c,d,h,"px")}},clipRect:function(a,b,c,d,h){a=a.node;0===b&&0===c?(a.style.width=d+"px",a.style.height=h+"px",a.style.overflow="hidden"):a.style.clip="rect("+c+"px "+(b+d)+"px "+(c+h)+"px "+b+"px)"},rotate:function(a,b,c){if(0!==Number(b)){var e=a.node;a=e.style;c||(c=this.getBGColor(e.parentNode));a.backgroundColor=c;a.paddingLeft=1;c=b*Math.PI/180;var h=Math.cos(c),f=Math.sin(c),g=d.removePx(a.left),k=d.removePx(a.top),l=e.offsetWidth,e=e.offsetHeight;b/=Math.abs(b);a.left=g+l/2-l/2*Math.cos(c)-b*e/2*Math.sin(c)+3;a.top=k-b*l/2*Math.sin(c)+b*e/2*Math.sin(c);a.cssText=a.cssText+"; filter:progid:DXImageTransform.Microsoft.Matrix(M11='"+h+"', M12='"+-f+"', M21='"+f+"', M22='"+h+"', sizingmethod='auto expand');"}},getBGColor:function(a){var b="#FFFFFF";if(a.style){var c=a.style.backgroundColor;""!==c?b=c:a.parentNode&&(b=this.getBGColor(a.parentNode))}return b},set:function(a){var b=new d.AmDObject("group",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},gradient:function(a,b,c,d){var h="";"radialGradient"==b&&(b="gradientradial",c.reverse());"linearGradient"==b&&(b="gradient");var f;for(f=0;f<c.length;f++)h+=Math.round(100*f/(c.length-1))+"% "+c[f],f<c.length-1&&(h+=",");a=a.fill;90==d?d=0:270==d?d=180:180==d?d=90:0===d&&(d=270);8===document.documentMode?(a.type=b,a.angle=d):(a.setAttribute("type",b),a.setAttribute("angle",d));h&&(a.colors.value=h)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);this.D.remove(a.node)},disableSelection:function(a){a.onselectstart=function(){return!1};a.style.cursor="default"},pattern:function(a,b,c,e){c=a.node;a=a.fill;var h="none";b.color&&(h=b.color);c.fillColor=h;b=b.url;d.isAbsolute(b)||(b=e+b);8===document.documentMode?(a.type="tile",a.src=b):(a.setAttribute("type","tile"),a.setAttribute("src",b))},update:function(){}})})();(function(){var d=window.AmCharts;d.SVGRenderer=d.Class({construct:function(a){this.D=a;this.animations=[]},create:function(a,b){return document.createElementNS(d.SVG_NS,b)},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},setAttr:function(a,b,c){void 0!==c&&a.node.setAttribute(b,c)},animate:function(a,b,c,e,h){a.animationFinished=!1;var f=a.node;a["an_"+b]&&d.removeFromArray(this.animations,a["an_"+b]);"translate"==b?(f=(f=f.getAttribute("transform"))?String(f).substring(10,f.length-1):"0,0",f=f.split(", ").join(" "),f=f.split(" ").join(","),0===f&&(f="0,0")):f=Number(f.getAttribute(b));c={obj:a,frame:0,attribute:b,from:f,to:c,time:e,effect:h};this.animations.push(c);a["an_"+b]=c},update:function(){var a,b=this.animations;for(a=b.length-1;0<=a;a--){var c=b[a],e=c.time*d.updateRate,h=c.frame+1,f=c.obj,g=c.attribute,k,l,m;if(h<=e){c.frame++;if("translate"==g){k=c.from.split(",");g=Number(k[0]);k=Number(k[1]);isNaN(k)&&(k=0);l=c.to.split(",");m=Number(l[0]);l=Number(l[1]);m=0===m-g?m:Math.round(d[c.effect](0,h,g,m-g,e));c=0===l-k?l:Math.round(d[c.effect](0,h,k,l-k,e));g="transform";if(isNaN(m)||isNaN(c))continue;c="translate("+m+","+c+")"}else l=Number(c.from),k=Number(c.to),m=k-l,c=d[c.effect](0,h,l,m,e),isNaN(c)&&(c=k),0===m&&this.animations.splice(a,1);this.setAttr(f,g,c)}else"translate"==g?(l=c.to.split(","),m=Number(l[0]),l=Number(l[1]),f.translate(m,l)):(k=Number(c.to),this.setAttr(f,g,k)),f.animationFinished=!0,this.animations.splice(a,1)}},getBBox:function(a){if(a=a.node)try{return a.getBBox()}catch(b){}return{width:0,height:0,x:0,y:0}},path:function(a,b){a.node.setAttributeNS(d.SVG_XLINK,"xlink:href",b)},clipRect:function(a,b,c,e,h){var f=a.node,g=a.clipPath;g&&this.D.remove(g);var k=f.parentNode;k&&(f=document.createElementNS(d.SVG_NS,"clipPath"),g=d.getUniqueId(),f.setAttribute("id",g),this.D.rect(b,c,e,h,0,0,f),k.appendChild(f),b="#",d.baseHref&&!d.isIE&&(b=this.removeTarget(window.location.href)+b),this.setAttr(a,"clip-path","url("+b+g+")"),this.clipPathC++,a.clipPath=f)},text:function(a,b,c){var e=new d.AmDObject("text",this.D);a=String(a).split("\n");var h=d.removePx(b["font-size"]),f;for(f=0;f<a.length;f++){var g=this.create(null,"tspan");g.appendChild(document.createTextNode(a[f]));g.setAttribute("y",(h+2)*f+Math.round(h/2));g.setAttribute("x",0);e.node.appendChild(g)}e.node.setAttribute("y",Math.round(h/2));this.attr(e,b);this.D.addToContainer(e.node,c);return e},setText:function(a,b){var c=a.node;c&&(c.removeChild(c.firstChild),c.appendChild(document.createTextNode(b)))},move:function(a,b,c,d){isNaN(b)&&(b=0);isNaN(c)&&(c=0);b="translate("+b+","+c+")";d&&(b=b+" scale("+d+")");this.setAttr(a,"transform",b)},rotate:function(a,b){var c=a.node.getAttribute("transform"),d="rotate("+b+")";c&&(d=c+" "+d);this.setAttr(a,"transform",d)},set:function(a){var b=new d.AmDObject("g",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},addListener:function(a,b,c){a.node["on"+b]=c},gradient:function(a,b,c,e){var h=a.node,f=a.grad;f&&this.D.remove(f);b=document.createElementNS(d.SVG_NS,b);f=d.getUniqueId();b.setAttribute("id",f);if(!isNaN(e)){var g=0,k=0,l=0,m=0;90==e?l=100:270==e?m=100:180==e?g=100:0===e&&(k=100);b.setAttribute("x1",g+"%");b.setAttribute("x2",k+"%");b.setAttribute("y1",l+"%");b.setAttribute("y2",m+"%")}for(e=0;e<c.length;e++)g=document.createElementNS(d.SVG_NS,"stop"),k=100*e/(c.length-1),0===e&&(k=0),g.setAttribute("offset",k+"%"),g.setAttribute("stop-color",c[e]),b.appendChild(g);h.parentNode.appendChild(b);c="#";d.baseHref&&!d.isIE&&(c=this.removeTarget(window.location.href)+c);h.setAttribute("fill","url("+c+f+")");a.grad=b},removeTarget:function(a){return a.split("#")[0]},pattern:function(a,b,c,e){var h=a.node;isNaN(c)&&(c=1);var f=a.patternNode;f&&this.D.remove(f);var f=document.createElementNS(d.SVG_NS,"pattern"),g=d.getUniqueId(),k=b;b.url&&(k=b.url);d.isAbsolute(k)||-1!=k.indexOf("data:image")||(k=e+k);e=Number(b.width);isNaN(e)&&(e=4);var l=Number(b.height);isNaN(l)&&(l=4);e/=c;l/=c;c=b.x;isNaN(c)&&(c=0);var m=-Math.random()*Number(b.randomX);isNaN(m)||(c=m);m=b.y;isNaN(m)&&(m=0);var p=-Math.random()*Number(b.randomY);isNaN(p)||(m=p);f.setAttribute("id",g);f.setAttribute("width",e);f.setAttribute("height",l);f.setAttribute("patternUnits","userSpaceOnUse");f.setAttribute("xlink:href",k);b.color&&(p=document.createElementNS(d.SVG_NS,"rect"),p.setAttributeNS(null,"height",e),p.setAttributeNS(null,"width",l),p.setAttributeNS(null,"fill",b.color),f.appendChild(p));this.D.image(k,0,0,e,l,f).translate(c,m);k="#";d.baseHref&&!d.isIE&&(k=this.removeTarget(window.location.href)+k);h.setAttribute("fill","url("+k+g+")");a.patternNode=f;h.parentNode.appendChild(f)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);a.grad&&this.D.remove(a.grad);a.patternNode&&this.D.remove(a.patternNode);this.D.remove(a.node)}})})();(function(){var d=window.AmCharts;d.AmLegend=d.Class({construct:function(a){this.enabled=!0;this.cname="AmLegend";this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","clickLabel");this.position="bottom";this.borderColor=this.color="#000000";this.borderAlpha=0;this.markerLabelGap=5;this.verticalGap=10;this.align="left";this.horizontalGap=0;this.spacing=10;this.markerDisabledColor="#AAB3B3";this.markerType="square";this.markerSize=16;this.markerBorderThickness=this.markerBorderAlpha=1;this.marginBottom=this.marginTop=0;this.marginLeft=this.marginRight=20;this.autoMargins=!0;this.valueWidth=50;this.switchable=!0;this.switchType="x";this.switchColor="#FFFFFF";this.rollOverColor="#CC0000";this.reversedOrder=!1;this.labelText="[[title]]";this.valueText="[[value]]";this.accessibleLabel="[[title]]";this.useMarkerColorForLabels=!1;this.rollOverGraphAlpha=1;this.textClickEnabled=!1;this.equalWidths=!0;this.backgroundColor="#FFFFFF";this.backgroundAlpha=0;this.useGraphSettings=!1;this.showEntries=!0;this.labelDx=0;d.applyTheme(this,a,this.cname)},setData:function(a){this.legendData=a;this.invalidateSize()},invalidateSize:function(){this.destroy();this.entries=[];this.valueLabels=[];var a=this.legendData;this.enabled&&(d.ifArray(a)||d.ifArray(this.data))&&this.drawLegend()},drawLegend:function(){var a=this.chart,b=this.position,c=this.width,e=a.divRealWidth,h=a.divRealHeight,f=this.div,g=this.legendData;this.data&&(g=this.combineLegend?this.legendData.concat(this.data):this.data);isNaN(this.fontSize)&&(this.fontSize=a.fontSize);this.maxColumnsReal=this.maxColumns;if("right"==b||"left"==b)this.maxColumnsReal=1,this.autoMargins&&(this.marginLeft=this.marginRight=10);else if(this.autoMargins){this.marginRight=a.marginRight;this.marginLeft=a.marginLeft;var k=a.autoMarginOffset;"bottom"==b?(this.marginBottom=k,this.marginTop=0):(this.marginTop=k,this.marginBottom=0)}c=void 0!==c?d.toCoordinate(c,e):"right"!=b&&"left"!=b?a.realWidth:0<this.ieW?this.ieW:a.realWidth;"outside"==b?(c=f.offsetWidth,h=f.offsetHeight,f.clientHeight&&(c=f.clientWidth,h=f.clientHeight)):(isNaN(c)||(f.style.width=c+"px"),f.className="amChartsLegend "+a.classNamePrefix+"-legend-div");this.divWidth=c;(b=this.container)?(b.container.innerHTML="",f.appendChild(b.container),b.width=c,b.height=h,b.setSize(c,h),b.addDefs(a)):b=new d.AmDraw(f,c,h,a);this.container=b;this.lx=0;this.ly=8;h=this.markerSize;h>this.fontSize&&(this.ly=h/2-1);0<h&&(this.lx+=h+this.markerLabelGap);this.titleWidth=0;if(h=this.title)h=d.text(this.container,h,this.color,a.fontFamily,this.fontSize,"start",!0),d.setCN(a,h,"legend-title"),h.translate(this.marginLeft,this.marginTop+this.verticalGap+this.ly+1),a=h.getBBox(),this.titleWidth=a.width+15,this.titleHeight=a.height+6;this.index=this.maxLabelWidth=0;if(this.showEntries){for(a=0;a<g.length;a++)this.createEntry(g[a]);for(a=this.index=0;a<g.length;a++)this.createValue(g[a])}this.arrangeEntries();this.updateValues()},arrangeEntries:function(){var a=this.position,b=this.marginLeft+
this.titleWidth,c=this.marginRight,e=this.marginTop,h=this.marginBottom,f=this.horizontalGap,g=this.div,k=this.divWidth,l=this.maxColumnsReal,m=this.verticalGap,p=this.spacing,q=k-c-b,n=0,t=0,r=this.container;this.set&&this.set.remove();var w=r.set();this.set=w;var z=r.set();w.push(z);var x=this.entries,u,A;for(A=0;A<x.length;A++){u=x[A].getBBox();var y=u.width;y>n&&(n=y);u=u.height;u>t&&(t=u)}var y=t=0,B=f,D=0,C=0;for(A=0;A<x.length;A++){var I=x[A];this.reversedOrder&&(I=x[x.length-A-1]);u=I.getBBox();var H;this.equalWidths?H=y*(n+p+this.markerLabelGap):(H=B,B=B+u.width+f+p);H+u.width>q&&0<A&&0!==y&&(t++,H=y=0,B=H+u.width+f+p,D=D+C+m,C=0);u.height>C&&(C=u.height);I.translate(H,D);y++;!isNaN(l)&&y>=l&&(y=0,t++,D=D+C+m,B=f,C=0);z.push(I)}u=z.getBBox();l=u.height+2*m-1;"left"==a||"right"==a?(p=u.width+2*f,k=p+b+c,g.style.width=k+"px",this.ieW=k):p=k-b-c-1;c=d.polygon(this.container,[0,p,p,0],[0,0,l,l],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);d.setCN(this.chart,c,"legend-bg");w.push(c);w.translate(b,e);c.toBack();b=f;if("top"==a||"bottom"==a||"absolute"==a||"outside"==a)"center"==this.align?b=f+(p-u.width)/2:"right"==this.align&&(b=f+p-u.width);z.translate(b,m+1);this.titleHeight>l&&(l=this.titleHeight);e=l+e+h+1;0>e&&(e=0);"absolute"!=a&&"outside"!=a&&e>this.chart.divRealHeight&&(g.style.top="0px");g.style.height=Math.round(e)+"px";r.setSize(this.divWidth,e)},createEntry:function(a){if(!1!==a.visibleInLegend&&!a.hideFromLegend){var b=this,c=b.chart,e=b.useGraphSettings,h=a.markerType;h&&(e=!1);a.legendEntryWidth=b.markerSize;h||(h=b.markerType);var f=a.color,g=a.alpha;a.legendKeyColor&&(f=a.legendKeyColor());a.legendKeyAlpha&&(g=a.legendKeyAlpha());var k;!0===a.hidden&&(k=f=b.markerDisabledColor);var l=a.pattern,m,p=a.customMarker;p||(p=b.customMarker);var q=b.container,n=b.markerSize,t=0,r=0,w=n/2;if(e){e=a.type;b.switchType=void 0;if("line"==e||"step"==e||"smoothedLine"==e||"ohlc"==e)m=q.set(),a.hidden||(f=a.lineColorR,k=a.bulletBorderColorR),t=d.line(q,[0,2*n],[n/2,n/2],f,a.lineAlpha,a.lineThickness,a.dashLength),d.setCN(c,t,"graph-stroke"),m.push(t),a.bullet&&(a.hidden||(f=a.bulletColorR),t=d.bullet(q,a.bullet,a.bulletSize,f,a.bulletAlpha,a.bulletBorderThickness,k,a.bulletBorderAlpha))&&(d.setCN(c,t,"graph-bullet"),t.translate(n+1,n/2),m.push(t)),w=0,t=n,r=n/3;else{a.getGradRotation&&(m=a.getGradRotation(),0===m&&(m=180));t=a.fillColorsR;!0===a.hidden&&(t=f);if(m=b.createMarker("rectangle",t,a.fillAlphas,a.lineThickness,f,a.lineAlpha,m,l,a.dashLength))w=n,m.translate(w,n/2);t=n}d.setCN(c,m,"graph-"+e);d.setCN(c,m,"graph-"+a.id)}else if(p)m=q.image(p,0,0,n,n);else{var z;isNaN(b.gradientRotation)||(z=180+b.gradientRotation);(m=b.createMarker(h,f,g,void 0,void 0,void 0,z,l))&&m.translate(n/2,n/2)}d.setCN(c,m,"legend-marker");b.addListeners(m,a);q=q.set([m]);b.switchable&&a.switchable&&q.setAttr("cursor","pointer");void 0!==a.id&&d.setCN(c,q,"legend-item-"+a.id);d.setCN(c,q,a.className,!0);k=b.switchType;var x;k&&"none"!=k&&0<n&&("x"==k?(x=b.createX(),x.translate(n/2,n/2)):x=b.createV(),x.dItem=a,!0!==a.hidden?"x"==k?x.hide():x.show():"x"!=k&&x.hide(),b.switchable||x.hide(),b.addListeners(x,a),a.legendSwitch=x,q.push(x),d.setCN(c,x,"legend-switch"));k=b.color;a.showBalloon&&b.textClickEnabled&&void 0!==b.selectedColor&&(k=b.selectedColor);b.useMarkerColorForLabels&&!l&&(k=f);!0===a.hidden&&(k=b.markerDisabledColor);f=d.massReplace(b.labelText,{"[[title]]":a.title});void 0!==b.tabIndex&&(q.setAttr("tabindex",b.tabIndex),q.setAttr("role","menuitem"),q.keyup(function(c){13==c.keyCode&&b.clickMarker(a,c)}));c.accessible&&b.accessibleLabel&&(l=d.massReplace(b.accessibleLabel,{"[[title]]":a.title}),c.makeAccessible(q,l));l=b.fontSize;m&&(n<=l&&(n=n/2+b.ly-l/2+(l+2-n)/2-r,m.translate(w,n),x&&x.translate(x.x,n)),a.legendEntryWidth=m.getBBox().width);var u;f&&(f=d.fixBrakes(f),a.legendTextReal=f,u=b.labelWidth,u=isNaN(u)?d.text(b.container,f,k,c.fontFamily,l,"start"):d.wrappedText(b.container,f,k,c.fontFamily,l,"start",!1,u,0),d.setCN(c,u,"legend-label"),u.translate(b.lx+t,b.ly),q.push(u),b.labelDx=t,c=u.getBBox().width,b.maxLabelWidth<c&&(b.maxLabelWidth=c));b.entries[b.index]=q;a.legendEntry=b.entries[b.index];a.legendMarker=m;a.legendLabel=u;b.index++}},addListeners:function(a,b){var c=this;a&&a.mouseover(function(a){c.rollOverMarker(b,a)}).mouseout(function(a){c.rollOutMarker(b,a)}).click(function(a){c.clickMarker(b,a)})},rollOverMarker:function(a,b){this.switchable&&this.dispatch("rollOverMarker",a,b);this.dispatch("rollOverItem",a,b)},rollOutMarker:function(a,b){this.switchable&&this.dispatch("rollOutMarker",a,b);this.dispatch("rollOutItem",a,b)},clickMarker:function(a,b){this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b));this.dispatch("clickMarker",a,b)},rollOverLabel:function(a,b){a.hidden||this.textClickEnabled&&a.legendLabel&&a.legendLabel.attr({fill:this.rollOverColor});this.dispatch("rollOverItem",a,b)},rollOutLabel:function(a,b){if(!a.hidden&&this.textClickEnabled&&a.legendLabel){var c=this.color;void 0!==this.selectedColor&&a.showBalloon&&(c=this.selectedColor);this.useMarkerColorForLabels&&(c=a.lineColor,void 0===c&&(c=a.color));a.legendLabel.attr({fill:c})}this.dispatch("rollOutItem",a,b)},clickLabel:function(a,b){this.textClickEnabled?a.hidden||this.dispatch("clickLabel",a,b):this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b))},dispatch:function(a,b,c){a={type:a,dataItem:b,target:this,event:c,chart:this.chart};this.chart&&this.chart.handleLegendEvent(a);this.fire(a)},createValue:function(a){var b=this,c=b.fontSize,e=b.chart;if(!1!==a.visibleInLegend&&!a.hideFromLegend){var h=b.maxLabelWidth;b.forceWidth&&(h=b.labelWidth);b.equalWidths||(b.valueAlign="left");"left"==b.valueAlign&&a.legendLabel&&(h=a.legendLabel.getBBox().width);var f=h;if(b.valueText&&0<b.valueWidth){var g=b.color;b.useMarkerColorForValues&&(g=a.color,a.legendKeyColor&&(g=a.legendKeyColor()));!0===a.hidden&&(g=b.markerDisabledColor);var k=b.valueText,h=h+b.lx+b.labelDx+b.markerLabelGap+
b.valueWidth,l="end";"left"==b.valueAlign&&(h-=b.valueWidth,l="start");g=d.text(b.container,k,g,b.chart.fontFamily,c,l);d.setCN(e,g,"legend-value");g.translate(h,b.ly);b.entries[b.index].push(g);f+=b.valueWidth+2*b.markerLabelGap;g.dItem=a;b.valueLabels.push(g)}b.index++;e=b.markerSize;e<c+7&&(e=c+7,d.VML&&(e+=3));c=b.container.rect(a.legendEntryWidth,0,f,e,0,0).attr({stroke:"none",fill:"#fff","fill-opacity":.005});c.dItem=a;b.entries[b.index-1].push(c);c.mouseover(function(c){b.rollOverLabel(a,c)}).mouseout(function(c){b.rollOutLabel(a,c)}).click(function(c){b.clickLabel(a,c)})}},createV:function(){var a=this.markerSize;return d.polygon(this.container,[a/5,a/2,a-a/5,a/2],[a/3,a-a/5,a/5,a/1.7],this.switchColor)},createX:function(){var a=(this.markerSize-4)/2,b={stroke:this.switchColor,"stroke-width":3},c=this.container,e=d.line(c,[-a,a],[-a,a]).attr(b),a=d.line(c,[-a,a],[a,-a]).attr(b);return this.container.set([e,a])},createMarker:function(a,b,c,e,h,f,g,k,l){var m=this.markerSize,p=this.container;h||(h=this.markerBorderColor);h||(h=b);isNaN(e)&&(e=this.markerBorderThickness);isNaN(f)&&(f=this.markerBorderAlpha);return d.bullet(p,a,m,b,c,e,h,f,m,g,k,this.chart.path,l)},validateNow:function(){this.invalidateSize()},updateValues:function(){var a=this.valueLabels,b=this.chart,c,e=this.data;if(a)for(c=0;c<a.length;c++){var h=a[c],f=h.dItem;f.periodDataItem=void 0;f.periodPercentDataItem=void 0;var g=" ";if(e)f.value?h.text(f.value):h.text("");else{var k=null;if(void 0!==f.type){var k=f.currentDataItem,l=this.periodValueText;f.legendPeriodValueText&&(l=f.legendPeriodValueText);f.legendPeriodValueTextR&&(l=f.legendPeriodValueTextR);k?(g=this.valueText,f.legendValueText&&(g=f.legendValueText),f.legendValueTextR&&(g=f.legendValueTextR),g=b.formatString(g,k)):l&&b.formatPeriodString&&(l=d.massReplace(l,{"[[title]]":f.title}),g=b.formatPeriodString(l,f))}else g=b.formatString(this.valueText,f);l=f;k&&(l=k);var m=this.valueFunction;m&&(g=m(l,g,b.periodDataItem));var p;this.useMarkerColorForLabels&&!k&&f.lastDataItem&&(k=f.lastDataItem);k?p=b.getBalloonColor(f,k):f.legendKeyColor&&(p=f.legendKeyColor());f.legendColorFunction&&(p=f.legendColorFunction(l,g,f.periodDataItem,f.periodPercentDataItem));h.text(g);if(!f.pattern&&(this.useMarkerColorForValues&&h.setAttr("fill",p),this.useMarkerColorForLabels)){if(h=f.legendMarker)h.setAttr("fill",p),h.setAttr("stroke",p);(f=f.legendLabel)&&f.setAttr("fill",p)}}}},renderFix:function(){if(!d.VML&&this.enabled){var a=this.container;a&&a.renderFix()}},destroy:function(){this.div.innerHTML="";d.remove(this.set)}})})();(function(){var d=window.AmCharts;d.formatMilliseconds=function(a,b){if(-1!=a.indexOf("fff")){var c=b.getMilliseconds(),d=String(c);10>c&&(d="00"+c);10<=c&&100>c&&(d="0"+c);a=a.replace(/fff/g,d)}return a};d.extractPeriod=function(a){var b=d.stripNumbers(a),c=1;b!=a&&(c=Number(a.slice(0,a.indexOf(b))));return{period:b,count:c}};d.getDate=function(a,b,c){return a instanceof Date?d.newDate(a,c):b&&isNaN(a)?d.stringToDate(a,b):new Date(a)};d.daysInMonth=function(a){return(new Date(a.getYear(),a.getMonth()+
1,0)).getDate()};d.newDate=function(a,b){return b&&-1==b.indexOf("fff")?new Date(a):new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds())};d.resetDateToMin=function(a,b,c,e){void 0===e&&(e=1);var h,f,g,k,l,m,p;d.useUTC?(h=a.getUTCFullYear(),f=a.getUTCMonth(),g=a.getUTCDate(),k=a.getUTCHours(),l=a.getUTCMinutes(),m=a.getUTCSeconds(),p=a.getUTCMilliseconds(),a=a.getUTCDay()):(h=a.getFullYear(),f=a.getMonth(),g=a.getDate(),k=a.getHours(),l=a.getMinutes(),m=a.getSeconds(),p=a.getMilliseconds(),a=a.getDay());switch(b){case"YYYY":h=Math.floor(h/c)*c;f=0;g=1;p=m=l=k=0;break;case"MM":f=Math.floor(f/c)*c;g=1;p=m=l=k=0;break;case"WW":g=a>=e?g-a+e:g-(7+a)+e;p=m=l=k=0;break;case"DD":p=m=l=k=0;break;case"hh":k=Math.floor(k/c)*c;p=m=l=0;break;case"mm":l=Math.floor(l/c)*c;p=m=0;break;case"ss":m=Math.floor(m/c)*c;p=0;break;case"fff":p=Math.floor(p/c)*c}d.useUTC?(a=new Date,a.setUTCFullYear(h,f,g),a.setUTCHours(k,l,m,p)):a=new Date(h,f,g,k,l,m,p);return a};d.getPeriodDuration=function(a,b){void 0===b&&(b=1);var c;switch(a){case"YYYY":c=316224E5;break;case"MM":c=26784E5;break;case"WW":c=6048E5;break;case"DD":c=864E5;break;case"hh":c=36E5;break;case"mm":c=6E4;break;case"ss":c=1E3;break;case"fff":c=1}return c*b};d.intervals={s:{nextInterval:"ss",contains:1E3},ss:{nextInterval:"mm",contains:60,count:0},mm:{nextInterval:"hh",contains:60,count:1},hh:{nextInterval:"DD",contains:24,count:2},DD:{nextInterval:"",contains:Infinity,count:3}};d.getMaxInterval=function(a,b){var c=d.intervals;return a>=c[b].contains?(a=Math.round(a/c[b].contains),b=c[b].nextInterval,d.getMaxInterval(a,b)):"ss"==b?c[b].nextInterval:b};d.dayNames="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");d.shortDayNames="Sun Mon Tue Wed Thu Fri Sat".split(" ");d.monthNames="January February March April May June July August September October November December".split(" ");d.shortMonthNames="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");d.getWeekNumber=function(a){a=new Date(a);a.setHours(0,0,0);a.setDate(a.getDate()+4-(a.getDay()||7));var b=new Date(a.getFullYear(),0,1);return Math.ceil(((a-b)/864E5+1)/7)};d.stringToDate=function(a,b){var c={},e=[{pattern:"YYYY",period:"year"},{pattern:"YY",period:"year"},{pattern:"MM",period:"month"},{pattern:"M",period:"month"},{pattern:"DD",period:"date"},{pattern:"D",period:"date"},{pattern:"JJ",period:"hours"},{pattern:"J",period:"hours"},{pattern:"HH",period:"hours"},{pattern:"H",period:"hours"},{pattern:"KK",period:"hours"},{pattern:"K",period:"hours"},{pattern:"LL",period:"hours"},{pattern:"L",period:"hours"},{pattern:"NN",period:"minutes"},{pattern:"N",period:"minutes"},{pattern:"SS",period:"seconds"},{pattern:"S",period:"seconds"},{pattern:"QQQ",period:"milliseconds"},{pattern:"QQ",period:"milliseconds"},{pattern:"Q",period:"milliseconds"}],h=!0,f=b.indexOf("AA");-1!=f&&(a.substr(f,2),"pm"==a.toLowerCase&&(h=!1));var f=b,g,k,l;for(l=0;l<e.length;l++)k=e[l].period,c[k]=0,"date"==k&&(c[k]=1);for(l=0;l<e.length;l++)if(g=e[l].pattern,k=e[l].period,-1!=b.indexOf(g)){var m=d.getFromDateString(g,a,f);b=b.replace(g,"");if("KK"==g||"K"==g||"LL"==g||"L"==g)h||(m+=12);c[k]=m}d.useUTC?(e=new Date,e.setUTCFullYear(c.year,c.month,c.date),e.setUTCHours(c.hours,c.minutes,c.seconds,c.milliseconds)):e=new Date(c.year,c.month,c.date,c.hours,c.minutes,c.seconds,c.milliseconds);return e};d.getFromDateString=function(a,b,c){if(void 0!==b)return c=c.indexOf(a),b=String(b),b=b.substr(c,a.length),"0"==b.charAt(0)&&(b=b.substr(1,b.length-1)),b=Number(b),isNaN(b)&&(b=0),-1!=a.indexOf("M")&&b--,b};d.formatDate=function(a,b,c){c||(c=d);var e,h,f,g,k,l,m,p,q=d.getWeekNumber(a);d.useUTC?(e=a.getUTCFullYear(),h=a.getUTCMonth(),f=a.getUTCDate(),g=a.getUTCDay(),k=a.getUTCHours(),l=a.getUTCMinutes(),m=a.getUTCSeconds(),p=a.getUTCMilliseconds()):(e=a.getFullYear(),h=a.getMonth(),f=a.getDate(),g=a.getDay(),k=a.getHours(),l=a.getMinutes(),m=a.getSeconds(),p=a.getMilliseconds());var n=String(e).substr(2,2),t="0"+g;b=b.replace(/W/g,q);q=k;24==q&&(q=0);var r=q;10>r&&(r="0"+r);b=b.replace(/JJ/g,r);b=b.replace(/J/g,q);r=k;0===r&&(r=24,-1!=b.indexOf("H")&&(f--,0===f&&(e=new Date(a),e.setDate(e.getDate()-1),h=e.getMonth(),f=e.getDate(),e=e.getFullYear())));a=h+1;9>h&&(a="0"+a);q=f;10>f&&(q="0"+f);var w=r;10>w&&(w="0"+w);b=b.replace(/HH/g,w);b=b.replace(/H/g,r);r=k;11<r&&(r-=12);w=r;10>w&&(w="0"+w);b=b.replace(/KK/g,w);b=b.replace(/K/g,r);r=k;0===r&&(r=12);12<r&&(r-=12);w=r;10>w&&(w="0"+w);b=b.replace(/LL/g,w);b=b.replace(/L/g,r);r=l;10>r&&(r="0"+r);b=b.replace(/NN/g,r);b=b.replace(/N/g,l);l=m;10>l&&(l="0"+l);b=b.replace(/SS/g,l);b=b.replace(/S/g,m);m=p;10>m?m="00"+m:100>m&&(m="0"+m);l=p;10>l&&(l="00"+l);b=b.replace(/A/g,"@A@");b=b.replace(/QQQ/g,m);b=b.replace(/QQ/g,l);b=b.replace(/Q/g,p);b=b.replace(/YYYY/g,"@IIII@");b=b.replace(/YY/g,"@II@");b=b.replace(/MMMM/g,"@XXXX@");b=b.replace(/MMM/g,"@XXX@");b=b.replace(/MM/g,"@XX@");b=b.replace(/M/g,"@X@");b=b.replace(/DD/g,"@RR@");b=b.replace(/D/g,"@R@");b=b.replace(/EEEE/g,"@PPPP@");b=b.replace(/EEE/g,"@PPP@");b=b.replace(/EE/g,"@PP@");b=b.replace(/E/g,"@P@");b=b.replace(/@IIII@/g,e);b=b.replace(/@II@/g,n);b=b.replace(/@XXXX@/g,c.monthNames[h]);b=b.replace(/@XXX@/g,c.shortMonthNames[h]);b=b.replace(/@XX@/g,a);b=b.replace(/@X@/g,h+1);b=b.replace(/@RR@/g,q);b=b.replace(/@R@/g,f);b=b.replace(/@PPPP@/g,c.dayNames[g]);b=b.replace(/@PPP@/g,c.shortDayNames[g]);b=b.replace(/@PP@/g,t);b=b.replace(/@P@/g,g);return b=12>k?b.replace(/@A@/g,c.amString):b.replace(/@A@/g,c.pmString)};d.changeDate=function(a,b,c,e,h){if(d.useUTC)return d.changeUTCDate(a,b,c,e,h);var f=-1;void 0===e&&(e=!0);void 0===h&&(h=!1);!0===e&&(f=1);switch(b){case"YYYY":a.setFullYear(a.getFullYear()+c*f);e||h||a.setDate(a.getDate()+1);break;case"MM":b=a.getMonth();a.setMonth(a.getMonth()+c*f);a.getMonth()>b+c*f&&a.setDate(a.getDate()-1);e||h||a.setDate(a.getDate()+1);break;case"DD":a.setDate(a.getDate()+c*f);break;case"WW":a.setDate(a.getDate()+c*f*7);break;case"hh":a.setHours(a.getHours()+c*f);break;case"mm":a.setMinutes(a.getMinutes()+
c*f);break;case"ss":a.setSeconds(a.getSeconds()+c*f);break;case"fff":a.setMilliseconds(a.getMilliseconds()+c*f)}return a};d.changeUTCDate=function(a,b,c,d,h){var f=-1;void 0===d&&(d=!0);void 0===h&&(h=!1);!0===d&&(f=1);switch(b){case"YYYY":a.setUTCFullYear(a.getUTCFullYear()+c*f);d||h||a.setUTCDate(a.getUTCDate()+1);break;case"MM":b=a.getUTCMonth();a.setUTCMonth(a.getUTCMonth()+c*f);a.getUTCMonth()>b+c*f&&a.setUTCDate(a.getUTCDate()-1);d||h||a.setUTCDate(a.getUTCDate()+1);break;case"DD":a.setUTCDate(a.getUTCDate()+
c*f);break;case"WW":a.setUTCDate(a.getUTCDate()+c*f*7);break;case"hh":a.setUTCHours(a.getUTCHours()+c*f);break;case"mm":a.setUTCMinutes(a.getUTCMinutes()+c*f);break;case"ss":a.setUTCSeconds(a.getUTCSeconds()+c*f);break;case"fff":a.setUTCMilliseconds(a.getUTCMilliseconds()+c*f)}return a}})();
(function(){var e=window.AmCharts;e.AmRectangularChart=e.Class({inherits:e.AmCoordinateChart,construct:function(a){e.AmRectangularChart.base.construct.call(this,a);this.theme=a;this.createEvents("zoomed","changed");this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=20;this.depth3D=this.angle=0;this.plotAreaFillColors="#FFFFFF";this.plotAreaFillAlphas=0;this.plotAreaBorderColor="#000000";this.plotAreaBorderAlpha=0;this.maxZoomFactor=20;this.zoomOutButtonImageSize=19;this.zoomOutButtonImage="lens";this.zoomOutText="Show all";this.zoomOutButtonColor="#e5e5e5";this.zoomOutButtonAlpha=0;this.zoomOutButtonRollOverAlpha=1;this.zoomOutButtonPadding=8;this.trendLines=[];this.autoMargins=!0;this.marginsUpdated=!1;this.autoMarginOffset=10;e.applyTheme(this,a,"AmRectangularChart")},initChart:function(){e.AmRectangularChart.base.initChart.call(this);this.updateDxy();!this.marginsUpdated&&this.autoMargins&&(this.resetMargins(),this.drawGraphs=!1);this.processScrollbars();this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();this.scrollbarOnly||this.updateGraphs()},drawChart:function(){e.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();if(e.ifArray(this.chartData)){var a=this.chartCursor;a&&a.draw()}},resetMargins:function(){var a={},b;if("xy"==this.type){var c=this.xAxes,d=this.yAxes;for(b=0;b<c.length;b++){var g=c[b];g.ignoreAxisWidth||(g.setOrientation(!0),g.fixAxisPosition(),a[g.position]=!0)}for(b=0;b<d.length;b++)c=d[b],c.ignoreAxisWidth||(c.setOrientation(!1),c.fixAxisPosition(),a[c.position]=!0)}else{d=this.valueAxes;for(b=0;b<d.length;b++)c=d[b],c.ignoreAxisWidth||(c.setOrientation(this.rotate),c.fixAxisPosition(),a[c.position]=!0);(b=this.categoryAxis)&&!b.ignoreAxisWidth&&(b.setOrientation(!this.rotate),b.fixAxisPosition(),b.fixAxisPosition(),a[b.position]=!0)}a.left&&(this.marginLeft=0);a.right&&(this.marginRight=0);a.top&&(this.marginTop=0);a.bottom&&(this.marginBottom=0);this.fixMargins=a},measureMargins:function(){var a=this.valueAxes,b,c=this.autoMarginOffset,d=this.fixMargins,g=this.realWidth,h=this.realHeight,f=c,e=c,l=g;b=h;var m;for(m=0;m<a.length;m++)a[m].handleSynchronization(),b=this.getAxisBounds(a[m],f,l,e,b),f=Math.round(b.l),l=Math.round(b.r),e=Math.round(b.t),b=Math.round(b.b);if(a=this.categoryAxis)b=this.getAxisBounds(a,f,l,e,b),f=Math.round(b.l),l=Math.round(b.r),e=Math.round(b.t),b=Math.round(b.b);d.left&&f<c&&(this.marginLeft=Math.round(-f+c),!isNaN(this.minMarginLeft)&&this.marginLeft<this.minMarginLeft&&(this.marginLeft=this.minMarginLeft));d.right&&l>=g-c&&(this.marginRight=Math.round(l-g+c),!isNaN(this.minMarginRight)&&this.marginRight<this.minMarginRight&&(this.marginRight=this.minMarginRight));d.top&&e<c+this.titleHeight&&(this.marginTop=Math.round(this.marginTop-e+c+this.titleHeight),!isNaN(this.minMarginTop)&&this.marginTop<this.minMarginTop&&(this.marginTop=this.minMarginTop));d.bottom&&b>h-c&&(this.marginBottom=Math.round(this.marginBottom+b-h+c),!isNaN(this.minMarginBottom)&&this.marginBottom<this.minMarginBottom&&(this.marginBottom=this.minMarginBottom));this.initChart()},getAxisBounds:function(a,b,c,d,g){if(!a.ignoreAxisWidth){var h=a.labelsSet,f=a.tickLength;a.inside&&(f=0);if(h)switch(h=a.getBBox(),a.position){case"top":a=h.y;d>a&&(d=a);break;case"bottom":a=h.y+h.height;g<a&&(g=a);break;case"right":a=h.x+h.width+f+3;c<a&&(c=a);break;case"left":a=h.x-f,b>a&&(b=a)}}return{l:b,t:d,r:c,b:g}},drawZoomOutButton:function(){var a=this;if(!a.zbSet){var b=a.container.set();a.zoomButtonSet.push(b);var c=a.color,d=a.fontSize,g=a.zoomOutButtonImageSize,h=a.zoomOutButtonImage.replace(/\.[a-z]*$/i,""),f=a.langObj.zoomOutText||a.zoomOutText,k=a.zoomOutButtonColor,l=a.zoomOutButtonAlpha,m=a.zoomOutButtonFontSize,p=a.zoomOutButtonPadding;isNaN(m)||(d=m);(m=a.zoomOutButtonFontColor)&&(c=m);var m=a.zoomOutButton,n;m&&(m.fontSize&&(d=m.fontSize),m.color&&(c=m.color),m.backgroundColor&&(k=m.backgroundColor),isNaN(m.backgroundAlpha)||(a.zoomOutButtonRollOverAlpha=m.backgroundAlpha));var u=m=0,u=a.pathToImages;if(h){if(e.isAbsolute(h)||void 0===u)u="";n=a.container.image(u+h+a.extension,0,0,g,g);e.setCN(a,n,"zoom-out-image");b.push(n);n=n.getBBox();m=n.width+5}void 0!==f&&(c=e.text(a.container,f,c,a.fontFamily,d,"start"),e.setCN(a,c,"zoom-out-label"),d=c.getBBox(),u=n?n.height/2-3:d.height/2,c.translate(m,u),b.push(c));n=b.getBBox();c=1;e.isModern||(c=0);k=e.rect(a.container,n.width+2*p+5,n.height+2*p-2,k,1,1,k,c);k.setAttr("opacity",l);k.translate(-p,-p);e.setCN(a,k,"zoom-out-bg");b.push(k);k.toBack();a.zbBG=k;n=k.getBBox();b.translate(a.marginLeftReal+a.plotAreaWidth-n.width+p,a.marginTopReal+p);b.hide();b.mouseover(function(){a.rollOverZB()}).mouseout(function(){a.rollOutZB()}).click(function(){a.clickZB()}).touchstart(function(){a.rollOverZB()}).touchend(function(){a.rollOutZB();a.clickZB()});for(l=0;l<b.length;l++)b[l].attr({cursor:"pointer"});void 0!==a.zoomOutButtonTabIndex&&(b.setAttr("tabindex",a.zoomOutButtonTabIndex),b.setAttr("role","menuitem"),b.keyup(function(b){13==b.keyCode&&a.clickZB()}));a.zbSet=b}},rollOverZB:function(){this.rolledOverZB=!0;this.zbBG.setAttr("opacity",this.zoomOutButtonRollOverAlpha)},rollOutZB:function(){this.rolledOverZB=!1;this.zbBG.setAttr("opacity",this.zoomOutButtonAlpha)},clickZB:function(){this.rolledOverZB=!1;this.zoomOut()},zoomOut:function(){this.zoomOutValueAxes()},drawPlotArea:function(){var a=this.dx,b=this.dy,c=this.marginLeftReal,d=this.marginTopReal,g=this.plotAreaWidth-1,h=this.plotAreaHeight-1,f=this.plotAreaFillColors,k=this.plotAreaFillAlphas,l=this.plotAreaBorderColor,m=this.plotAreaBorderAlpha;"object"==typeof k&&(k=k[0]);f=e.polygon(this.container,[0,g,g,0,0],[0,0,h,h,0],f,k,1,l,m,this.plotAreaGradientAngle);e.setCN(this,f,"plot-area");f.translate(c+a,d+b);this.set.push(f);0!==a&&0!==b&&(f=this.plotAreaFillColors,"object"==typeof f&&(f=f[0]),f=e.adjustLuminosity(f,-.15),g=e.polygon(this.container,[0,a,g+a,g,0],[0,b,b,0,0],f,k,1,l,m),e.setCN(this,g,"plot-area-bottom"),g.translate(c,d+h),this.set.push(g),a=e.polygon(this.container,[0,0,a,a,0],[0,h,h+b,b,0],f,k,1,l,m),e.setCN(this,a,"plot-area-left"),a.translate(c,d),this.set.push(a));(c=this.bbset)&&this.scrollbarOnly&&c.remove()},updatePlotArea:function(){var a=this.updateWidth(),b=this.updateHeight(),c=this.container;this.realWidth=a;this.realWidth=b;c&&this.container.setSize(a,b);var c=this.marginLeftReal,d=this.marginTopReal,a=a-c-this.marginRightReal-this.dx,b=b-d-this.marginBottomReal;1>a&&(a=1);1>b&&(b=1);this.plotAreaWidth=Math.round(a);this.plotAreaHeight=Math.round(b);this.plotBalloonsSet.translate(c,d)},updateDxy:function(){this.dx=Math.round(this.depth3D*Math.cos(this.angle*Math.PI/180));this.dy=Math.round(-this.depth3D*Math.sin(this.angle*Math.PI/180));this.d3x=Math.round(this.columnSpacing3D*Math.cos(this.angle*Math.PI/180));this.d3y=Math.round(-this.columnSpacing3D*Math.sin(this.angle*Math.PI/180))},updateMargins:function(){var a=this.getTitleHeight();this.titleHeight=a;this.marginTopReal=this.marginTop-this.dy;this.fixMargins&&!this.fixMargins.top&&(this.marginTopReal+=a);this.marginBottomReal=this.marginBottom;this.marginLeftReal=this.marginLeft;this.marginRightReal=this.marginRight},updateValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b];this.setAxisRenderers(c);this.updateObjectSize(c)}},setAxisRenderers:function(a){a.axisRenderer=e.RecAxis;a.guideFillRenderer=e.RecFill;a.axisItemRenderer=e.RecItem;a.marginsChanged=!0},updateGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.index=b;c.rotate=this.rotate;this.updateObjectSize(c)}},updateObjectSize:function(a){a.width=this.plotAreaWidth-1;a.height=this.plotAreaHeight-1;a.x=this.marginLeftReal;a.y=this.marginTopReal;a.dx=this.dx;a.dy=this.dy},updateChartCursor:function(){var a=this.chartCursor;a&&(a=e.processObject(a,e.ChartCursor,this.theme),this.updateObjectSize(a),this.addChartCursor(a),a.chart=this)},processScrollbars:function(){var a=this.chartScrollbar;a&&(a=e.processObject(a,e.ChartScrollbar,this.theme),this.addChartScrollbar(a))},updateScrollbars:function(){},removeChartCursor:function(){e.callMethod("destroy",[this.chartCursor]);this.chartCursor=null},zoomTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b];c.valueAxis.recalculateToPercents?c.set&&c.set.hide():(c.x=this.marginLeftReal,c.y=this.marginTopReal,c.draw())}},handleCursorValueZoom:function(){},addTrendLine:function(a){this.trendLines.push(a)},zoomOutValueAxes:function(){for(var a=this.valueAxes,b=0;b<a.length;b++)a[b].zoomOut()},removeTrendLine:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},adjustMargins:function(a,b){var c=a.position,d=a.scrollbarHeight+a.offset;a.enabled&&("top"==c?b?this.marginLeftReal+=d:this.marginTopReal+=d:b?this.marginRightReal+=d:this.marginBottomReal+=d)},getScrollbarPosition:function(a,b,c){var d="bottom",g="top";a.oppositeAxis||(g=d,d="top");a.position=b?"bottom"==c||"left"==c?d:g:"top"==c||"right"==c?d:g},updateChartScrollbar:function(a,b){if(a){a.rotate=b;var c=this.marginTopReal,d=this.marginLeftReal,g=a.scrollbarHeight,h=this.dx,f=this.dy,e=a.offset;"top"==a.position?b?(a.y=c,a.x=d-g-e):(a.y=c-g+f-e,a.x=d+h):b?(a.y=c+f,a.x=d+this.plotAreaWidth+h+e):(a.y=c+this.plotAreaHeight+e,a.x=this.marginLeftReal)}},showZB:function(a){var b=this.zbSet;a&&(b=this.zoomOutText,""!==b&&b&&this.drawZoomOutButton());if(b=this.zbSet)this.zoomButtonSet.push(b),a?b.show():b.hide(),this.rollOutZB()},handleReleaseOutside:function(a){e.AmRectangularChart.base.handleReleaseOutside.call(this,a);(a=this.chartCursor)&&a.handleReleaseOutside&&a.handleReleaseOutside()},handleMouseDown:function(a){e.AmRectangularChart.base.handleMouseDown.call(this,a);var b=this.chartCursor;b&&b.handleMouseDown&&!this.rolledOverZB&&b.handleMouseDown(a)},update:function(){e.AmRectangularChart.base.update.call(this);this.chartCursor&&this.chartCursor.update&&this.chartCursor.update()},handleScrollbarValueZoom:function(a){this.relativeZoomValueAxes(a.target.valueAxes,a.relativeStart,a.relativeEnd);this.zoomAxesAndGraphs()},zoomValueScrollbar:function(a){if(a&&a.enabled){var b=a.valueAxes[0],c=b.relativeStart,d=b.relativeEnd;b.reversed&&(d=1-c,c=1-b.relativeEnd);a.percentZoom(c,d)}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){var a=this.valueAxes,b;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);a=this.graphs;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);(b=this.chartCursor)&&b.clearSelection();this.zoomTrendLines()}},handleValueAxisZoomReal:function(a,b){var c=a.relativeStart,d=a.relativeEnd;if(c>d)var g=c,c=d,d=g;this.relativeZoomValueAxes(b,c,d);this.updateAfterValueZoom()},updateAfterValueZoom:function(){this.zoomAxesAndGraphs();this.zoomScrollbar()},relativeZoomValueAxes:function(a,b,c){this.hideBalloonReal();b=e.fitToBounds(b,0,1);c=e.fitToBounds(c,0,1);if(b>c){var d=b;b=c;c=d}var d=1/this.maxZoomFactor,g=e.getDecimals(d)+4;c-b<d&&(c=b+(c-b)/2,b=c-d/2,c+=d/2,1<c&&(b-=c-1,c=1),0>b&&(b=0,c=d));b=e.roundTo(b,g);c=e.roundTo(c,g);d=!1;if(a){for(g=0;g<a.length;g++){var h=a[g].zoomToRelativeValues(b,c,!0);h&&(d=h)}this.showZB()}return d},addChartCursor:function(a){e.callMethod("destroy",[this.chartCursor]);a&&(this.listenTo(a,"moved",this.handleCursorMove),this.listenTo(a,"zoomed",this.handleCursorZoom),this.listenTo(a,"zoomStarted",this.handleCursorZoomStarted),this.listenTo(a,"panning",this.handleCursorPanning),this.listenTo(a,"onHideCursor",this.handleCursorHide));this.chartCursor=a},handleCursorChange:function(){},handleCursorMove:function(a){var b,c=this.valueAxes;for(b=0;b<c.length;b++)if(!a.panning){var d=c[b];d&&d.showBalloon&&d.showBalloon(a.x,a.y)}},handleCursorZoom:function(a){if(this.skipZoomed)this.skipZoomed=!1;else{var b=this.startX0,c=this.endX0,d=this.endY0,g=this.startY0,h=a.startX,f=a.endX,e=a.startY,l=a.endY;this.startX0=this.endX0=this.startY0=this.endY0=NaN;this.handleCursorZoomReal(b+h*(c-b),b+f*(c-b),g+e*(d-g),g+l*(d-g),a)}},handleCursorHide:function(){var a,b=this.valueAxes;for(a=0;a<b.length;a++)b[a].hideBalloon();b=this.graphs;for(a=0;a<b.length;a++)b[a].hideBalloonReal()}})})();(function(){var e=window.AmCharts;e.AmSerialChart=e.Class({inherits:e.AmRectangularChart,construct:function(a){this.type="serial";e.AmSerialChart.base.construct.call(this,a);this.cname="AmSerialChart";this.theme=a;this.columnSpacing=5;this.columnSpacing3D=0;this.columnWidth=.8;var b=new e.CategoryAxis(a);b.chart=this;this.categoryAxis=b;this.zoomOutOnDataUpdate=!0;this.mouseWheelZoomEnabled=this.mouseWheelScrollEnabled=this.rotate=this.skipZoom=!1;this.minSelectedTime=0;e.applyTheme(this,a,this.cname)},initChart:function(){e.AmSerialChart.base.initChart.call(this);this.updateCategoryAxis(this.categoryAxis,this.rotate,"categoryAxis");if(this.dataChanged)this.parseData();else this.onDataUpdated();this.drawGraphs=!0},onDataUpdated:function(){var a=this.countColumns(),b=this.chartData,c=this.graphs,d;for(d=0;d<c.length;d++){var g=c[d];g.data=b;g.columnCount=a}0<b.length&&(this.firstTime=this.getStartTime(b[0].time),this.lastTime=this.getEndTime(b[b.length-1].time));this.drawChart();this.autoMargins&&!this.marginsUpdated?(this.marginsUpdated=!0,this.measureMargins()):this.dispDUpd()},syncGrid:function(){if(this.synchronizeGrid){var a=this.valueAxes,b,c;if(0<a.length){var d=0;for(c=0;c<a.length;c++)b=a[c],d<b.gridCountReal&&(d=b.gridCountReal);var g=!1;for(c=0;c<a.length;c++)if(b=a[c],b.gridCountReal<d){var h=(d-b.gridCountReal)/2,f=g=h;0!==h-Math.round(h)&&(g-=.5,f+=.5);0<=b.min&&0>b.min-g*b.step&&(f+=g,g=0);0>=b.max&&0<b.max+f*b.step&&(g+=f,f=0);h=e.getDecimals(b.step);b.minimum=e.roundTo(b.min-
g*b.step,h);b.maximum=e.roundTo(b.max+f*b.step,h);b.setStep=b.step;g=b.strictMinMax=!0}g&&this.updateAfterValueZoom();for(c=0;c<a.length;c++)b=a[c],b.minimum=NaN,b.maximum=NaN,b.setStep=NaN,b.strictMinMax=!1}}},handleWheelReal:function(a,b){if(!this.wheelBusy){var c=this.categoryAxis,d=c.parseDates,g=c.minDuration(),e=1,f=1;this.mouseWheelZoomEnabled?b||(e=-1):b&&(e=-1);var k=this.chartCursor;if(k){var l=k.mouseX,k=k.mouseY;e!=f&&(l=this.rotate?k/this.plotAreaHeight:l/this.plotAreaWidth,e*=l,f*=1-
l);l=.05*(this.end-this.start);d&&(l=.05*(this.endTime-this.startTime)/g);1>l&&(l=1);e*=l;f*=l;if(!d||c.equalSpacing)e=Math.round(e),f=Math.round(f)}k=this.chartData.length;c=this.lastTime;l=this.firstTime;0>a?d?(k=this.endTime-this.startTime,d=this.startTime+e*g,g=this.endTime+f*g,0<f&&0<e&&g>=c&&(g=c,d=c-k),this.zoomToDates(new Date(d),new Date(g))):(0<f&&0<e&&this.end>=k-1&&(e=f=0),d=this.start+e,g=this.end+f,this.zoomToIndexes(d,g)):d?(k=this.endTime-this.startTime,d=this.startTime-e*g,g=this.endTime-
f*g,0<f&&0<e&&d<=l&&(d=l,g=l+k),this.zoomToDates(new Date(d),new Date(g))):(0<f&&0<e&&1>this.start&&(e=f=0),d=this.start-e,g=this.end-f,this.zoomToIndexes(d,g))}},validateData:function(a){this.marginsUpdated=!1;this.zoomOutOnDataUpdate&&!a&&(this.endTime=this.end=this.startTime=this.start=NaN);var b=a=!1,c=!1,d=this.chartScrollbar;d&&(d.dragging&&(a=!0,d.handleDragStop()),d.resizingRight&&(c=!0,d.rightDragStop()),d.resizingLeft&&(b=!0,d.leftDragStop()));e.AmSerialChart.base.validateData.call(this);a&&d.handleDragStart();c&&d.rightDragStart();b&&d.leftDragStart()},drawChart:function(){if(0<this.realWidth&&0<this.realHeight){e.AmSerialChart.base.drawChart.call(this);var a=this.chartData;if(e.ifArray(a)){var b=this.chartScrollbar;!b||!this.marginsUpdated&&this.autoMargins||b.draw();(b=this.valueScrollbar)&&b.draw();var b=a.length-1,c,d;c=this.categoryAxis;if(c.parseDates&&!c.equalSpacing){if(c=this.startTime,d=this.endTime,isNaN(c)||isNaN(d))c=this.firstTime,d=this.lastTime}else{c=this.start;d=this.end;if(isNaN(c)||isNaN(d))d=c=NaN;isNaN(c)&&(isNaN(this.startTime)||(c=this.getClosestIndex(a,"time",this.startTime,!0,0,a.length)));isNaN(d)&&(isNaN(this.endTime)||(d=this.getClosestIndex(a,"time",this.endTime,!1,0,a.length)));if(isNaN(c)||isNaN(d))c=0,d=b}this.endTime=this.startTime=this.end=this.start=void 0;this.zoom(c,d)}}else this.cleanChart()},cleanChart:function(){e.callMethod("destroy",[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor,this.valueScrollbar])},updateCategoryAxis:function(a,b,c){a.chart=this;a.id=c;a.rotate=b;a.setOrientation(!this.rotate);a.init();this.setAxisRenderers(a);this.updateObjectSize(a)},updateValueAxes:function(){e.AmSerialChart.base.updateValueAxes.call(this);var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],d=this.rotate;c.rotate=d;c.setOrientation(d);d=this.categoryAxis;if(!d.startOnAxis||d.parseDates)c.expandMinMax=!0}},getStartTime:function(a){var b=this.categoryAxis;return e.resetDateToMin(new Date(a),b.minPeriod,1,b.firstDayOfWeek).getTime()},getEndTime:function(a){var b=e.extractPeriod(this.categoryAxis.minPeriod);return e.changeDate(new Date(a),b.period,b.count,!0).getTime()-1},updateMargins:function(){e.AmSerialChart.base.updateMargins.call(this);var a=this.chartScrollbar;a&&(this.getScrollbarPosition(a,this.rotate,this.categoryAxis.position),this.adjustMargins(a,this.rotate));if(a=this.valueScrollbar)this.getScrollbarPosition(a,!this.rotate,this.valueAxes[0].position),this.adjustMargins(a,!this.rotate)},updateScrollbars:function(){e.AmSerialChart.base.updateScrollbars.call(this);this.updateChartScrollbar(this.chartScrollbar,this.rotate);this.updateChartScrollbar(this.valueScrollbar,!this.rotate)},zoom:function(a,b){var c=this.categoryAxis;c.parseDates&&!c.equalSpacing?(this.timeZoom(a,b),isNaN(a)&&this.zoomOutValueAxes()):this.indexZoom(a,b);(c=this.chartCursor)&&(c.pan||c.hideCursorReal());this.updateLegendValues()},timeZoom:function(a,b){var c=this.maxSelectedTime;isNaN(c)||(b!=this.endTime&&b-
a>c&&(a=b-c),a!=this.startTime&&b-a>c&&(b=a+c));var d=this.minSelectedTime;if(0<d&&b-a<d){var g=Math.round(a+(b-a)/2),d=Math.round(d/2);a=g-d;b=g+d}d=this.chartData;g=this.categoryAxis;if(e.ifArray(d)&&(a!=this.startTime||b!=this.endTime)){var h=g.minDuration(),f=this.firstTime,k=this.lastTime;a||(a=f,isNaN(c)||(a=k-c));b||(b=k);a>k&&(a=k);b<f&&(b=f);a<f&&(a=f);b>k&&(b=k);b<a&&(b=a+h);b-a<h/5&&(b<k?b=a+h/5:a=b-h/5);this.startTime=a;this.endTime=b;c=d.length-1;h=this.getClosestIndex(d,"time",a,!0,0,c);d=this.getClosestIndex(d,"time",b,!1,h,c);g.timeZoom(a,b);g.zoom(h,d);this.start=e.fitToBounds(h,0,c);this.end=e.fitToBounds(d,0,c);this.zoomAxesAndGraphs();this.zoomScrollbar();this.fixCursor();this.showZB();this.syncGrid();this.updateColumnsDepth();this.dispatchTimeZoomEvent()}},showZB:function(){var a,b=this.categoryAxis;b&&b.parseDates&&!b.equalSpacing&&(this.startTime>this.firstTime&&(a=!0),this.endTime<this.lastTime&&(a=!0));0<this.start&&(a=!0);this.end<this.chartData.length-1&&(a=!0);if(b=this.valueAxes)b=b[0],isNaN(b.relativeStart)||(0!==e.roundTo(b.relativeStart,3)&&(a=!0),1!=e.roundTo(b.relativeEnd,3)&&(a=!0));e.AmSerialChart.base.showZB.call(this,a)},updateAfterValueZoom:function(){e.AmSerialChart.base.updateAfterValueZoom.call(this);this.updateColumnsDepth()},indexZoom:function(a,b){var c=this.maxSelectedSeries,d=!1;isNaN(c)||(b!=this.end&&b-a>c&&(a=b-c,d=!0),a!=this.start&&b-a>c&&(b=a+c,d=!0));if(d&&(d=this.chartScrollbar)&&d.dragger){var g=d.dragger.getBBox();d.maxWidth=g.width;d.maxHeight=g.height}if(a!=this.start||b!=this.end)d=this.chartData.length-1,isNaN(a)&&(a=0,isNaN(c)||(a=d-c)),isNaN(b)&&(b=d),b<a&&(b=a),b>d&&(b=d),a>d&&(a=d-1),0>a&&(a=0),this.start=a,this.end=b,this.categoryAxis.zoom(a,b),this.zoomAxesAndGraphs(),this.zoomScrollbar(),this.fixCursor(),0!==a||b!=this.chartData.length-1?this.showZB(!0):this.showZB(!1),this.syncGrid(),this.updateColumnsDepth(),this.dispatchIndexZoomEvent()},updateGraphs:function(){e.AmSerialChart.base.updateGraphs.call(this);var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.columnWidthReal=this.columnWidth;c.categoryAxis=this.categoryAxis;e.isString(c.fillToGraph)&&(c.fillToGraph=this.graphsById[c.fillToGraph])}},zoomAxesAndGraphs:function(){e.AmSerialChart.base.zoomAxesAndGraphs.call(this);this.updateColumnsDepth()},updateColumnsDepth:function(){if(0!==this.depth3D||0!==this.angle){var a,b=this.graphs,c;this.columnsArray=[];for(a=0;a<b.length;a++){c=b[a];var d=c.columnsArray;if(d){var g;for(g=0;g<d.length;g++)this.columnsArray.push(d[g])}}this.columnsArray.sort(this.compareDepth);b=this.columnsSet;if(0<this.columnsArray.length){d=this.container.set();this.columnSet.push(d);for(a=0;a<this.columnsArray.length;a++)d.push(this.columnsArray[a].column.set);c&&d.translate(c.x,c.y);this.columnsSet=d}e.remove(b)}},compareDepth:function(a,b){return a.depth>b.depth?1:-1},zoomScrollbar:function(){var a=this.chartScrollbar,b=this.categoryAxis;if(a){if(!this.zoomedByScrollbar){var c=a.dragger;c&&c.stop()}this.zoomedByScrollbar=!1;b.parseDates&&!b.equalSpacing?a.timeZoom(this.startTime,this.endTime):a.zoom(this.start,this.end)}this.zoomValueScrollbar(this.valueScrollbar)},updateTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b],c=e.processObject(c,e.TrendLine,this.theme);a[b]=c;c.chart=this;c.id||(c.id="trendLineAuto"+b+"_"+(new Date).getTime());e.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.categoryAxis=this.categoryAxis}},countColumns:function(){var a=0,b=this.valueAxes.length,c=this.graphs.length,d,g,e=!1,f,k;for(k=0;k<b;k++){g=this.valueAxes[k];var l=g.stackType,m=0;if("100%"==l||"regular"==l)for(e=!1,f=0;f<c;f++)d=this.graphs[f],d.tcc=1,d.valueAxis==g&&"column"==d.type&&(!e&&d.stackable&&(a++,e=!0),(!d.stackable&&d.clustered||d.newStack&&0!==m)&&a++,d.columnIndex=a-1,d.clustered||(d.columnIndex=0),m++);if("none"==l||"3d"==l){m=!1;for(f=0;f<c;f++)d=this.graphs[f],d.valueAxis==g&&"column"==d.type&&(d.clustered?(d.tcc=1,d.newStack&&(a=0),d.hidden||(d.columnIndex=a,a++)):d.hidden||(m=!0,d.tcc=1,d.columnIndex=0));m&&0===a&&(a=1)}if("3d"==l){g=1;for(m=0;m<c;m++)d=this.graphs[m],d.newStack&&g++,d.depthCount=g,d.tcc=a;a=g}}return a},parseData:function(){e.AmSerialChart.base.parseData.call(this);this.parseSerialData(this.dataProvider)},getCategoryIndexByValue:function(a){var b=this.chartData,c;for(c=0;c<b.length;c++)if(b[c].category==a)return c},handleScrollbarZoom:function(a){this.zoomedByScrollbar=!0;this.zoom(a.start,a.end)},dispatchTimeZoomEvent:function(){if(this.drawGraphs&&(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime)){var a={type:"zoomed"};a.startDate=new Date(this.startTime);a.endDate=new Date(this.endTime);a.startIndex=this.start;a.endIndex=this.end;this.startIndex=this.start;this.endIndex=this.end;this.startDate=a.startDate;this.endDate=a.endDate;this.prevStartTime=this.startTime;this.prevEndTime=this.endTime;var b=this.categoryAxis,c=e.extractPeriod(b.minPeriod).period,b=b.dateFormatsObject[c];a.startValue=e.formatDate(a.startDate,b,this);a.endValue=e.formatDate(a.endDate,b,this);a.chart=this;a.target=this;this.fire(a)}},dispatchIndexZoomEvent:function(){if(this.drawGraphs&&(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end)){this.startIndex=this.start;this.endIndex=this.end;var a=this.chartData;if(e.ifArray(a)&&!isNaN(this.start)&&!isNaN(this.end)){var b={chart:this,target:this,type:"zoomed"};b.startIndex=this.start;b.endIndex=this.end;b.startValue=a[this.start].category;b.endValue=a[this.end].category;this.categoryAxis.parseDates&&(this.startTime=a[this.start].time,this.endTime=a[this.end].time,b.startDate=new Date(this.startTime),b.endDate=new Date(this.endTime));this.prevStartIndex=this.start;this.prevEndIndex=this.end;this.fire(b)}}},updateLegendValues:function(){this.legend&&this.legend.updateValues()},getClosestIndex:function(a,b,c,d,g,e){0>g&&(g=0);e>a.length-1&&(e=a.length-1);var f=g+Math.round((e-g)/2),k=a[f][b];return c==k?f:1>=e-g?d?g:Math.abs(a[g][b]-c)<Math.abs(a[e][b]-c)?g:e:c==k?f:c<k?this.getClosestIndex(a,b,c,d,g,f):this.getClosestIndex(a,b,c,d,f,e)},zoomToIndexes:function(a,b){var c=this.chartData;if(c){var d=c.length;0<d&&(0>a&&(a=0),b>d-1&&(b=d-1),d=this.categoryAxis,d.parseDates&&!d.equalSpacing?this.zoom(c[a].time,this.getEndTime(c[b].time)):this.zoom(a,b))}},zoomToDates:function(a,b){var c=this.chartData;if(c)if(this.categoryAxis.equalSpacing){var d=this.getClosestIndex(c,"time",a.getTime(),!0,0,c.length);b=e.resetDateToMin(b,this.categoryAxis.minPeriod,1);c=this.getClosestIndex(c,"time",b.getTime(),!1,0,c.length);this.zoom(d,c)}else this.zoom(a.getTime(),b.getTime())},zoomToCategoryValues:function(a,b){this.chartData&&this.zoom(this.getCategoryIndexByValue(a),this.getCategoryIndexByValue(b))},formatPeriodString:function(a,b){if(b){b.periodDataItem={};b.periodPercentDataItem={};var c=["value","open","low","high","close"],d="value open low high close average sum count".split(" "),g=b.valueAxis,h=this.chartData,f=b.numberFormatter;f||(f=this.nf);for(var k=0;k<c.length;k++){for(var l=c[k],m=0,p=0,n=0,u=0,v,x,E,t,r,B,q,w,y,C,F=this.start;F<=this.end;F++){var D=h[F];if(D){var A=D.axes[g.id].graphs[b.id];if(A){if(A.values){var z=A.values[l],D=D.x.categoryAxis;if(this.rotate){if(0>D||D>A.graph.height)z=NaN}else if(0>D||D>A.graph.width)z=NaN;if(!isNaN(z)){isNaN(v)&&(v=z);x=z;if(isNaN(E)||E>z)E=z;if(isNaN(t)||t<z)t=z;r=e.getDecimals(m);D=e.getDecimals(z);m+=z;m=e.roundTo(m,Math.max(r,D));p++;r=m/p}}if(A.percents&&(A=A.percents[l],!isNaN(A))){isNaN(B)&&(B=A);q=A;if(isNaN(w)||w>A)w=A;if(isNaN(y)||y<A)y=A;C=e.getDecimals(n);z=e.getDecimals(A);n+=A;n=e.roundTo(n,Math.max(C,z));u++;C=n/u}}}}m={open:v,close:x,high:t,low:E,average:r,sum:m,count:p};n={open:B,close:q,high:y,low:w,average:C,sum:n,count:u};a=e.formatValue(a,m,d,f,l+"\\.",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=e.formatValue(a,n,d,this.pf,"percents\\."+l+"\\.");b.periodDataItem[l]=m;b.periodPercentDataItem[l]=n}}return a=e.cleanFromEmpty(a)},formatString:function(a,b,c){if(b){var d=b.graph;if(void 0!==a){if(-1!=a.indexOf("[[category]]")){var g=b.serialDataItem.category;if(this.categoryAxis.parseDates){var h=this.balloonDateFormat,f=this.chartCursor;f&&f.categoryBalloonDateFormat&&(h=f.categoryBalloonDateFormat);h=e.formatDate(g,h,this);-1!=h.indexOf("fff")&&(h=e.formatMilliseconds(h,g));g=h}a=a.replace(/\[\[category\]\]/g,String(g.replace("$","$$$")))}g=d.numberFormatter;g||(g=this.nf);h=b.graph.valueAxis;(f=h.duration)&&!isNaN(b.values.value)&&(f=e.formatDuration(b.values.value,f,"",h.durationUnits,h.maxInterval,g),a=a.replace(RegExp("\\[\\[value\\]\\]","g"),f));"date"==h.type&&(h=e.formatDate(new Date(b.values.value),d.dateFormat,this),f=RegExp("\\[\\[value\\]\\]","g"),a=a.replace(f,h),h=e.formatDate(new Date(b.values.open),d.dateFormat,this),f=RegExp("\\[\\[open\\]\\]","g"),a=a.replace(f,h));d="value open low high close total".split(" ");h=this.pf;a=e.formatValue(a,b.percents,d,h,"percents\\.");a=e.formatValue(a,b.values,d,g,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=e.formatValue(a,b.values,["percents"],h);-1!=a.indexOf("[[")&&(a=e.formatDataContextValue(a,b.dataContext));-1!=a.indexOf("[[")&&b.graph.customData&&(a=e.formatDataContextValue(a,b.graph.customData));a=e.AmSerialChart.base.formatString.call(this,a,b,c)}return a}},updateChartCursor:function(){e.AmSerialChart.base.updateChartCursor.call(this);var a=this.chartCursor,b=this.categoryAxis;if(a){var c=a.categoryBalloonAlpha,d=a.categoryBalloonColor,g=a.color;void 0===d&&(d=a.cursorColor);var h=a.valueZoomable,f=a.zoomable,k=a.valueLineEnabled;this.rotate?(a.vLineEnabled=k,a.hZoomEnabled=h,a.vZoomEnabled=f):(a.hLineEnabled=k,a.vZoomEnabled=h,a.hZoomEnabled=f);if(a.valueLineBalloonEnabled)for(k=0;k<this.valueAxes.length;k++)h=this.valueAxes[k],(f=h.balloon)||(f={}),f=e.extend(f,this.balloon,!0),f.fillColor=d,f.balloonColor=d,f.fillAlpha=c,f.borderColor=d,f.color=g,h.balloon=f;else for(f=0;f<this.valueAxes.length;f++)h=this.valueAxes[f],h.balloon&&(h.balloon=null);b&&(b.balloonTextFunction=a.categoryBalloonFunction,a.categoryLineAxis=b,b.balloonText=a.categoryBalloonText,a.categoryBalloonEnabled&&((f=b.balloon)||(f={}),f=e.extend(f,this.balloon,!0),f.fillColor=d,f.balloonColor=d,f.fillAlpha=c,f.borderColor=d,f.color=g,b.balloon=f),b.balloon&&(b.balloon.enabled=a.categoryBalloonEnabled))}},addChartScrollbar:function(a){e.callMethod("destroy",[this.chartScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",this.handleScrollbarZoom));this.rotate?void 0===a.width&&(a.width=a.scrollbarHeight):void 0===a.height&&(a.height=a.scrollbarHeight);a.gridAxis=this.categoryAxis;this.chartScrollbar=a},addValueScrollbar:function(a){e.callMethod("destroy",[this.valueScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",this.handleScrollbarValueZoom),this.listenTo(a,"zoomStarted",this.handleCursorZoomStarted));var b=a.scrollbarHeight;this.rotate?void 0===a.height&&(a.height=b):void 0===a.width&&(a.width=b);a.gridAxis||(a.gridAxis=this.valueAxes[0]);a.valueAxes=this.valueAxes;this.valueScrollbar=a},removeChartScrollbar:function(){e.callMethod("destroy",[this.chartScrollbar]);this.chartScrollbar=null},removeValueScrollbar:function(){e.callMethod("destroy",[this.valueScrollbar]);this.valueScrollbar=null},handleReleaseOutside:function(a){e.AmSerialChart.base.handleReleaseOutside.call(this,a);e.callMethod("handleReleaseOutside",[this.chartScrollbar,this.valueScrollbar])},update:function(){e.AmSerialChart.base.update.call(this);this.chartScrollbar&&this.chartScrollbar.update&&this.chartScrollbar.update();this.valueScrollbar&&this.valueScrollbar.update&&this.valueScrollbar.update()},processScrollbars:function(){e.AmSerialChart.base.processScrollbars.call(this);var a=this.valueScrollbar;a&&(a=e.processObject(a,e.ChartScrollbar,this.theme),a.id="valueScrollbar",this.addValueScrollbar(a))},handleValueAxisZoom:function(a){this.handleValueAxisZoomReal(a,this.valueAxes)},zoomOut:function(){e.AmSerialChart.base.zoomOut.call(this);this.zoom();this.syncGrid()},getNextItem:function(a){var b=a.index,c=this.chartData,d=a.graph;if(b+1<c.length)for(b+=1;b<c.length;b++)if(a=c[b])if(a=a.axes[d.valueAxis.id].graphs[d.id],!isNaN(a.y))return a},handleCursorZoomReal:function(a,b,c,d,e){var h=e.target,f,k;this.rotate?(isNaN(a)||isNaN(b)||this.relativeZoomValueAxes(this.valueAxes,a,b)&&this.updateAfterValueZoom(),h.vZoomEnabled&&(f=e.start,k=e.end)):(isNaN(c)||isNaN(d)||this.relativeZoomValueAxes(this.valueAxes,c,d)&&this.updateAfterValueZoom(),h.hZoomEnabled&&(f=e.start,k=e.end));isNaN(f)||isNaN(k)||(a=this.categoryAxis,a.parseDates&&!a.equalSpacing?this.zoomToDates(new Date(f),new Date(k)):this.zoomToIndexes(f,k))},handleCursorZoomStarted:function(){var a=this.valueAxes;if(a){var a=a[0],b=a.relativeStart,c=a.relativeEnd;a.reversed&&(b=1-a.relativeEnd,c=1-a.relativeStart);this.rotate?(this.startX0=b,this.endX0=c):(this.startY0=b,this.endY0=c)}this.categoryAxis&&(this.start0=this.start,this.end0=this.end,this.startTime0=this.startTime,this.endTime0=this.endTime)},fixCursor:function(){this.chartCursor&&this.chartCursor.fixPosition();this.prevCursorItem=null},handleCursorMove:function(a){e.AmSerialChart.base.handleCursorMove.call(this,a);var b=a.target,c=this.categoryAxis;if(a.panning)this.handleCursorHide(a);else if(this.chartData&&!b.isHidden){var d=this.graphs;if(d){var g;g=c.xToIndex(this.rotate?a.y:a.x);if(g=this.chartData[g]){var h,f,k,l;if(b.oneBalloonOnly&&b.valueBalloonsEnabled){var m=Infinity;for(h=d.length-1;0<=h;h--)if(f=d[h],f.balloon.enabled&&f.showBalloon&&!f.hidden){k=f.valueAxis.id;k=g.axes[k].graphs[f.id];if(b.showNextAvailable&&isNaN(k.y)&&(k=this.getNextItem(k),!k))continue;k=k.y;"top"==f.showBalloonAt&&(k=0);"bottom"==f.showBalloonAt&&(k=this.height);var p=b.mouseX,n=b.mouseY;k=this.rotate?Math.abs(p-k):Math.abs(n-k);k<m&&(m=k,l=f)}b.mostCloseGraph=l}if(this.prevCursorItem!=g||l!=this.prevMostCloseGraph){m=[];for(h=0;h<d.length;h++){f=d[h];k=f.valueAxis.id;k=g.axes[k].graphs[f.id];if(b.showNextAvailable&&isNaN(k.y)&&(k=this.getNextItem(k),!k&&f.balloon)){f.balloon.hide();continue}l&&f!=l?(f.showGraphBalloon(k,b.pointer,!1,b.graphBulletSize,b.graphBulletAlpha),f.balloon.hide(0)):b.valueBalloonsEnabled?(f.balloon.showBullet=b.bulletsEnabled,f.balloon.bulletSize=b.bulletSize/2,a.hideBalloons||(f.showGraphBalloon(k,b.pointer,!1,b.graphBulletSize,b.graphBulletAlpha),f.balloon.set&&m.push({balloon:f.balloon,y:f.balloon.pointToY}))):(f.currentDataItem=k,f.resizeBullet(k,b.graphBulletSize,b.graphBulletAlpha))}b.avoidBalloonOverlapping&&this.arrangeBalloons(m);this.prevCursorItem=g}this.prevMostCloseGraph=l}}c.showBalloon(a.x,a.y,b.categoryBalloonDateFormat,a.skip);this.updateLegendValues()}},handleCursorHide:function(a){e.AmSerialChart.base.handleCursorHide.call(this,a);a=this.categoryAxis;this.prevCursorItem=null;this.updateLegendValues();a&&a.hideBalloon();a=this.graphs;var b;for(b=0;b<a.length;b++)a[b].currentDataItem=null},handleCursorPanning:function(a){var b=a.target,c,d=a.deltaX,g=a.deltaY,h=a.delta2X,f=a.delta2Y;a=!1;if(this.rotate){isNaN(h)&&(h=d,a=!0);var k=this.endX0;c=this.startX0;var l=k-c,k=k-l*h,m=l;a||(m=0);a=e.fitToBounds(c-l*d,0,1-m)}else isNaN(f)&&(f=g,a=!0),k=this.endY0,c=this.startY0,l=k-c,k+=l*g,m=l,a||(m=0),a=e.fitToBounds(c+l*f,0,1-m);c=e.fitToBounds(k,m,1);var p;b.valueZoomable&&(p=this.relativeZoomValueAxes(this.valueAxes,a,c));var n;c=this.categoryAxis;this.rotate&&(d=g,h=f);a=!1;isNaN(h)&&(h=d,a=!0);if(b.zoomable&&(0<Math.abs(d)||0<Math.abs(h)))if(c.parseDates&&!c.equalSpacing){if(f=this.startTime0,g=this.endTime0,c=g-f,h*=c,l=this.firstTime,k=this.lastTime,m=c,a||(m=0),a=Math.round(e.fitToBounds(f-c*d,l,k-m)),h=Math.round(e.fitToBounds(g-h,l+m,k)),this.startTime!=a||this.endTime!=h)n={chart:this,target:b,type:"zoomed",start:a,end:h},this.skipZoomed=!0,b.fire(n),this.zoom(a,h),n=!0}else if(f=this.start0,g=this.end0,c=g-f,d=Math.round(c*d),h=Math.round(c*h),l=this.chartData.length-1,a||(c=0),a=e.fitToBounds(f-d,0,l-c),c=e.fitToBounds(g-h,c,l),this.start!=a||this.end!=c)this.skipZoomed=!0,b.fire({chart:this,target:b,type:"zoomed",start:a,end:c}),this.zoom(a,c),n=!0;!n&&p&&this.updateAfterValueZoom()},arrangeBalloons:function(a){var b=this.plotAreaHeight;a.sort(this.compareY);var c,d,e,h=this.plotAreaWidth,f=a.length;for(c=0;c<f;c++)d=a[c].balloon,d.setBounds(0,0,h,b),d.restorePrevious(),d.draw(),b=d.yPos-3;a.reverse();for(c=0;c<f;c++){d=a[c].balloon;var b=d.bottom,k=d.bottom-d.yPos;0<c&&b-k<e+3&&d.setBounds&&(d.setBounds(0,e+3,h,e+k+3),d.restorePrevious(),d.draw());d.set&&d.set.show();e=d.bottom}},compareY:function(a,b){return a.y<b.y?1:-1}})})();(function(){var e=window.AmCharts;e.Cuboid=e.Class({construct:function(a,b,c,d,e,h,f,k,l,m,p,n,u,v,x,E,t){this.set=a.set();this.container=a;this.h=Math.round(c);this.w=Math.round(b);this.dx=d;this.dy=e;this.colors=h;this.alpha=f;this.bwidth=k;this.bcolor=l;this.balpha=m;this.dashLength=v;this.topRadius=E;this.pattern=x;this.rotate=u;this.bcn=t;u?0>b&&0===p&&(p=180):0>c&&270==p&&(p=90);this.gradientRotation=p;0===d&&0===e&&(this.cornerRadius=n);this.draw()},draw:function(){var a=this.set;a.clear();var b=this.container,c=b.chart,d=this.w,g=this.h,h=this.dx,f=this.dy,k=this.colors,l=this.alpha,m=this.bwidth,p=this.bcolor,n=this.balpha,u=this.gradientRotation,v=this.cornerRadius,x=this.dashLength,E=this.pattern,t=this.topRadius,r=this.bcn,B=k,q=k;"object"==typeof k&&(B=k[0],q=k[k.length-1]);var w,y,C,F,D,A,z,L,M,Q=l;E&&(l=0);var G,H,I,J,K=this.rotate;if(0<Math.abs(h)||0<Math.abs(f))if(isNaN(t))z=q,q=e.adjustLuminosity(B,-.2),q=e.adjustLuminosity(B,-.2),w=e.polygon(b,[0,h,d+h,d,0],[0,f,f,0,0],q,l,1,p,0,u),0<n&&(M=e.line(b,[0,h,d+h],[0,f,f],p,n,m,x)),y=e.polygon(b,[0,0,d,d,0],[0,g,g,0,0],q,l,1,p,0,u),y.translate(h,f),0<n&&(C=e.line(b,[h,h],[f,f+g],p,n,m,x)),F=e.polygon(b,[0,0,h,h,0],[0,g,g+f,f,0],q,l,1,p,0,u),D=e.polygon(b,[d,d,d+h,d+h,d],[0,g,g+f,f,0],q,l,1,p,0,u),0<n&&(A=e.line(b,[d,d+h,d+h,d],[0,f,g+f,g],p,n,m,x)),q=e.adjustLuminosity(z,.2),z=e.polygon(b,[0,h,d+h,d,0],[g,g+f,g+f,g,g],q,l,1,p,0,u),0<n&&(L=e.line(b,[0,h,d+h],[g,g+f,g+f],p,n,m,x));else{var N,O,P;K?(N=g/2,q=h/2,P=g/2,O=d+h/2,H=Math.abs(g/2),G=Math.abs(h/2)):(q=d/2,N=f/2,O=d/2,P=g+f/2+1,G=Math.abs(d/2),H=Math.abs(f/2));I=G*t;J=H*t;.1<G&&.1<G&&(w=e.circle(b,G,B,l,m,p,n,!1,H),w.translate(q,N));.1<I&&.1<I&&(z=e.circle(b,I,e.adjustLuminosity(B,.5),l,m,p,n,!1,J),z.translate(O,P))}l=Q;1>Math.abs(g)&&(g=0);1>Math.abs(d)&&(d=0);!isNaN(t)&&(0<Math.abs(h)||0<Math.abs(f))?(k=[B],k={fill:k,stroke:p,"stroke-width":m,"stroke-opacity":n,"fill-opacity":l},K?(l="M0,0 L"+d+","+(g/2-g/2*t),m=" B",0<d&&(m=" A"),e.VML?(l+=m+Math.round(d-
I)+","+Math.round(g/2-J)+","+Math.round(d+I)+","+Math.round(g/2+J)+","+d+",0,"+d+","+g,l=l+(" L0,"+g)+(m+Math.round(-G)+","+Math.round(g/2-H)+","+Math.round(G)+","+Math.round(g/2+H)+",0,"+g+",0,0")):(l+="A"+I+","+J+",0,0,0,"+d+","+(g-g/2*(1-t))+"L0,"+g,l+="A"+G+","+H+",0,0,1,0,0"),G=90):(m=d/2-d/2*t,l="M0,0 L"+m+","+g,e.VML?(l="M0,0 L"+m+","+g,m=" B",0>g&&(m=" A"),l+=m+Math.round(d/2-I)+","+Math.round(g-J)+","+Math.round(d/2+I)+","+Math.round(g+J)+",0,"+g+","+d+","+g,l+=" L"+d+",0",l+=m+Math.round(d/2+G)+","+Math.round(H)+","+Math.round(d/2-G)+","+Math.round(-H)+","+d+",0,0,0"):(l+="A"+I+","+J+",0,0,0,"+(d-d/2*(1-t))+","+g+"L"+d+",0",l+="A"+G+","+H+",0,0,1,0,0"),G=180),b=b.path(l).attr(k),b.gradient("linearGradient",[B,e.adjustLuminosity(B,-.3),e.adjustLuminosity(B,-.3),B],G),K?b.translate(h/2,0):b.translate(0,f/2)):b=0===g?e.line(b,[0,d],[0,0],p,n,m,x):0===d?e.line(b,[0,0],[0,g],p,n,m,x):0<v?e.rect(b,d,g,k,l,m,p,n,v,u,x):e.polygon(b,[0,0,d,d,0],[0,g,g,0,0],k,l,m,p,n,u,!1,x);d=isNaN(t)?0>g?[w,M,y,C,F,D,A,z,L,b]:[z,L,y,C,F,D,w,M,A,b]:K?0<d?[w,b,z]:[z,b,w]:0>g?[w,b,z]:[z,b,w];e.setCN(c,b,r+"front");e.setCN(c,y,r+"back");e.setCN(c,z,r+"top");e.setCN(c,w,r+"bottom");e.setCN(c,F,r+"left");e.setCN(c,D,r+"right");for(w=0;w<d.length;w++)if(y=d[w])a.push(y),e.setCN(c,y,r+"element");E&&b.pattern(E,NaN,c.path)},width:function(a){isNaN(a)&&(a=0);this.w=Math.round(a);this.draw()},height:function(a){isNaN(a)&&(a=0);this.h=Math.round(a);this.draw()},animateHeight:function(a,b){var c=this;c.animationFinished=!1;c.easing=b;c.totalFrames=a*e.updateRate;c.rh=c.h;c.frame=0;c.height(1);setTimeout(function(){c.updateHeight.call(c)},1E3/e.updateRate)},updateHeight:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b?(b=a.easing(0,a.frame,1,a.rh-1,b),a.height(b),window.requestAnimationFrame?window.requestAnimationFrame(function(){a.updateHeight.call(a)}):setTimeout(function(){a.updateHeight.call(a)},1E3/e.updateRate)):(a.height(a.rh),a.animationFinished=!0)},animateWidth:function(a,b){var c=this;c.animationFinished=!1;c.easing=b;c.totalFrames=a*e.updateRate;c.rw=c.w;c.frame=0;c.width(1);setTimeout(function(){c.updateWidth.call(c)},1E3/e.updateRate)},updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b?(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),window.requestAnimationFrame?window.requestAnimationFrame(function(){a.updateWidth.call(a)}):setTimeout(function(){a.updateWidth.call(a)},1E3/e.updateRate)):(a.width(a.rw),a.animationFinished=!0)}})})();(function(){var e=window.AmCharts;e.CategoryAxis=e.Class({inherits:e.AxisBase,construct:function(a){this.cname="CategoryAxis";e.CategoryAxis.base.construct.call(this,a);this.minPeriod="DD";this.equalSpacing=this.parseDates=!1;this.position="bottom";this.startOnAxis=!1;this.gridPosition="middle";this.safeDistance=30;this.stickBalloonToCategory=!1;e.applyTheme(this,a,this.cname)},draw:function(){e.CategoryAxis.base.draw.call(this);this.generateDFObject();var a=this.chart.chartData;this.data=a;this.labelRotationR=this.labelRotation;this.type=null;if(e.ifArray(a)){var b,c=this.chart;"scrollbar"!=this.id?(e.setCN(c,this.set,"category-axis"),e.setCN(c,this.labelsSet,"category-axis"),e.setCN(c,this.axisLine.axisSet,"category-axis")):this.bcn=this.id+"-";var d=this.start,g=this.labelFrequency,h=0,f=this.end-d+1,k=this.gridCountR,l=this.showFirstLabel,m=this.showLastLabel,p,n="",n=e.extractPeriod(this.minPeriod),u=e.getPeriodDuration(n.period,n.count),v,x,E,t,r,B=this.rotate,q=this.firstDayOfWeek,w=this.boldPeriodBeginning;b=e.resetDateToMin(new Date(a[a.length-1].time+1.05*u),this.minPeriod,1,q).getTime();this.firstTime=c.firstTime;this.endTime>b&&(this.endTime=b);r=this.minorGridEnabled;x=this.gridAlpha;var y=0,C=0;if(this.widthField)for(b=this.start;b<=this.end;b++)if(t=this.data[b]){var F=Number(this.data[b].dataContext[this.widthField]);isNaN(F)||(y+=F,t.widthValue=F)}if(this.parseDates&&!this.equalSpacing)this.lastTime=a[a.length-1].time,this.maxTime=e.resetDateToMin(new Date(this.lastTime+1.05*u),this.minPeriod,1,q).getTime(),this.timeDifference=this.endTime-this.startTime,this.parseDatesDraw();else if(!this.parseDates){if(this.cellWidth=this.getStepWidth(f),f<k&&(k=f),h+=this.start,this.stepWidth=this.getStepWidth(f),0<k)for(q=Math.floor(f/k),t=this.chooseMinorFrequency(q),f=h,f/2==Math.round(f/2)&&f--,0>f&&(f=0),w=0,this.widthField&&(f=this.start,q=1),this.end-f+1>=this.autoRotateCount&&(this.labelRotationR=this.autoRotateAngle),b=f;b<=this.end+2;b++){k=!1;0<=b&&b<this.data.length?(v=this.data[b],n=v.category,k=v.forceShow):n="";if(r&&!isNaN(t))if(b/t==Math.round(b/t)||k)b/q==Math.round(b/q)||k||(this.gridAlpha=this.minorGridAlpha,n=void 0);else continue;else if(b/q!=Math.round(b/q)&&!k)continue;f=this.getCoordinate(b-h);k=0;"start"==this.gridPosition&&(f-=this.cellWidth/2,k=this.cellWidth/2);p=!0;E=k;"start"==this.tickPosition&&(E=0,p=!1,k=0);if(b==d&&!l||b==this.end&&!m)n=void 0;Math.round(w/g)!=w/g&&(n=void 0);w++;a=this.cellWidth;B&&(a=NaN,this.ignoreAxisWidth||!c.autoMargins)&&(a="right"==this.position?c.marginRight-this.titleWidth:c.marginLeft-this.titleWidth,a-=this.tickLength+10);this.labelFunction&&v&&(n=this.labelFunction(n,v,this));n=e.fixBrakes(n);u=!1;this.boldLabels&&(u=!0);b>this.end&&"start"==this.tickPosition&&(n=" ");this.rotate&&this.inside&&(k-=2);isNaN(v.widthValue)||(v.percentWidthValue=v.widthValue/y*100,a=this.rotate?this.height*v.widthValue/y:this.width*v.widthValue/y,f=C,C+=a,E=k=a/2);p=new this.axisItemRenderer(this,f,n,p,a,k,void 0,u,E,!1,v.labelColor,v.className);p.serialDataItem=v;this.pushAxisItem(p);this.gridAlpha=x}}else if(this.parseDates&&this.equalSpacing){h=this.start;this.startTime=this.data[this.start].time;this.endTime=this.data[this.end].time;this.timeDifference=this.endTime-this.startTime;b=this.choosePeriod(0);g=b.period;v=b.count;b=e.getPeriodDuration(g,v);b<u&&(g=n.period,v=n.count,b=u);x=g;"WW"==x&&(x="DD");this.currentDateFormat=this.dateFormatsObject[x];this.stepWidth=this.getStepWidth(f);k=Math.ceil(this.timeDifference/b)+1;n=e.resetDateToMin(new Date(this.startTime-
b),g,v,q).getTime();this.cellWidth=this.getStepWidth(f);f=Math.round(n/b);d=-1;f/2==Math.round(f/2)&&(d=-2,n-=b);f=this.start;f/2==Math.round(f/2)&&f--;0>f&&(f=0);C=this.end+2;C>=this.data.length&&(C=this.data.length);a=!1;a=!l;this.previousPos=-1E3;20<this.labelRotationR&&(this.safeDistance=5);F=f;if(this.data[f].time!=e.resetDateToMin(new Date(this.data[f].time),g,v,q).getTime()){var u=0,D=n;for(b=f;b<C;b++)t=this.data[b].time,this.checkPeriodChange(g,v,t,D)&&(u++,2<=u&&(F=b,b=C),D=t)}r&&1<v&&(t=this.chooseMinorFrequency(v),e.getPeriodDuration(g,t));if(0<this.gridCountR)for(b=f;b<C;b++)if(t=this.data[b].time,this.checkPeriodChange(g,v,t,n)&&b>=F){f=this.getCoordinate(b-this.start);r=!1;this.nextPeriod[x]&&(r=this.checkPeriodChange(this.nextPeriod[x],1,t,n,x))&&e.resetDateToMin(new Date(t),this.nextPeriod[x],1,q).getTime()!=t&&(r=!1);u=!1;r&&this.markPeriodChange?(r=this.dateFormatsObject[this.nextPeriod[x]],u=!0):r=this.dateFormatsObject[x];n=e.formatDate(new Date(t),r,c);if(b==d&&!l||b==k&&!m)n=" ";a?a=!1:(w||(u=!1),f-this.previousPos>this.safeDistance*Math.cos(this.labelRotationR*Math.PI/180)&&(this.labelFunction&&(n=this.labelFunction(n,new Date(t),this,g,v,E)),this.boldLabels&&(u=!0),p=new this.axisItemRenderer(this,f,n,void 0,void 0,void 0,void 0,u),r=p.graphics(),this.pushAxisItem(p),r=r.getBBox().width,e.isModern||(r-=f),this.previousPos=f+r));E=n=t}}for(b=l=0;b<this.data.length;b++)if(t=this.data[b])this.parseDates&&!this.equalSpacing?(m=t.time,d=this.cellWidth,"MM"==this.minPeriod&&(d=864E5*e.daysInMonth(new Date(m))*this.stepWidth,t.cellWidth=d),m=Math.round((m-this.startTime)*this.stepWidth+d/2)):m=this.getCoordinate(b-h),t.x[this.id]=m;if(this.widthField)for(b=this.start;b<=this.end;b++)t=this.data[b],d=t.widthValue,t.percentWidthValue=d/y*100,this.rotate?(m=this.height*d/y/2+l,l=this.height*d/y+l):(m=this.width*d/y/2+l,l=this.width*d/y+l),t.x[this.id]=m;y=this.guides.length;for(b=0;b<y;b++)if(l=this.guides[b],q=q=q=r=d=NaN,m=l.above,l.toCategory&&(q=c.getCategoryIndexByValue(l.toCategory),isNaN(q)||(d=this.getCoordinate(q-h),l.expand&&(d+=this.cellWidth/2),p=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,l),this.pushAxisItem(p,m))),l.category&&(q=c.getCategoryIndexByValue(l.category),isNaN(q)||(r=this.getCoordinate(q-h),l.expand&&(r-=this.cellWidth/2),q=(d-r)/2,p=new this.axisItemRenderer(this,r,l.label,!0,NaN,q,l),this.pushAxisItem(p,m))),w=c.dataDateFormat,l.toDate&&(!w||l.toDate instanceof Date||(l.toDate=l.toDate.toString()+" |"),l.toDate=e.getDate(l.toDate,w),this.equalSpacing?(q=c.getClosestIndex(this.data,"time",l.toDate.getTime(),!1,0,this.data.length-1),isNaN(q)||(d=this.getCoordinate(q-h))):d=(l.toDate.getTime()-this.startTime)*this.stepWidth,p=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,l),this.pushAxisItem(p,m)),l.date&&(!w||l.date instanceof Date||(l.date=l.date.toString()+" |"),l.date=e.getDate(l.date,w),this.equalSpacing?(q=c.getClosestIndex(this.data,"time",l.date.getTime(),!1,0,this.data.length-1),isNaN(q)||(r=this.getCoordinate(q-h))):r=(l.date.getTime()-
this.startTime)*this.stepWidth,q=(d-r)/2,p=!0,l.toDate&&(p=!1),p="H"==this.orientation?new this.axisItemRenderer(this,r,l.label,p,2*q,NaN,l):new this.axisItemRenderer(this,r,l.label,!1,NaN,q,l),this.pushAxisItem(p,m)),p&&(q=p.label)&&this.addEventListeners(q,l),0<d||0<r){q=!1;if(this.rotate){if(d<this.height||r<this.height)q=!0}else if(d<this.width||r<this.width)q=!0;q&&(d=new this.guideFillRenderer(this,r,d,l),r=d.graphics(),this.pushAxisItem(d,m),l.graphics=r,r.index=b,this.addEventListeners(r,l))}if(c=c.chartCursor)B?c.fixHeight(this.cellWidth):(c.fixWidth(this.cellWidth),c.fullWidth&&this.balloon&&(this.balloon.minWidth=this.cellWidth));this.previousHeight=A}this.axisCreated=!0;this.set.translate(this.x,this.y);this.labelsSet.translate(this.x,this.y);this.labelsSet.show();this.positionTitle();(B=this.axisLine.set)&&B.toFront();var A=this.getBBox().height;2<A-this.previousHeight&&this.autoWrap&&!this.parseDates&&(this.axisCreated=this.chart.marginsUpdated=!1)},xToIndex:function(a){var b=this.data,c=this.chart,d=c.rotate,g=this.stepWidth,h;if(this.parseDates&&!this.equalSpacing)a=this.startTime+Math.round(a/g)-this.minDuration()/2,h=c.getClosestIndex(b,"time",a,!1,this.start,this.end+1);else if(this.widthField)for(c=Infinity,g=this.start;g<=this.end;g++){var f=this.data[g];f&&(f=Math.abs(f.x[this.id]-a),f<c&&(c=f,h=g))}else this.startOnAxis||(a-=g/2),h=this.start+Math.round(a/g);h=e.fitToBounds(h,0,b.length-1);var k;b[h]&&(k=b[h].x[this.id]);d?k>this.height+1&&h--:k>this.width+1&&h--;0>k&&h++;return h=e.fitToBounds(h,0,b.length-1)},dateToCoordinate:function(a){return this.parseDates&&!this.equalSpacing?(a.getTime()-this.startTime)*this.stepWidth:this.parseDates&&this.equalSpacing?(a=this.chart.getClosestIndex(this.data,"time",a.getTime(),!1,0,this.data.length-1),this.getCoordinate(a-this.start)):NaN},categoryToCoordinate:function(a){if(this.chart){if(this.parseDates)return this.dateToCoordinate(new Date(a));a=this.chart.getCategoryIndexByValue(a);if(!isNaN(a))return this.getCoordinate(a-
this.start)}else return NaN},coordinateToDate:function(a){return this.equalSpacing?(a=this.xToIndex(a),new Date(this.data[a].time)):new Date(this.startTime+a/this.stepWidth)},coordinateToValue:function(a){a=this.xToIndex(a);if(a=this.data[a])return this.parseDates?a.time:a.category},getCoordinate:function(a){a*=this.stepWidth;this.startOnAxis||(a+=this.stepWidth/2);return Math.round(a)},formatValue:function(a,b){b||(b=this.currentDateFormat);this.parseDates&&(a=e.formatDate(new Date(a),b,this.chart));return a},showBalloonAt:function(a,b){void 0===b&&(b=this.parseDates?this.dateToCoordinate(new Date(a)):this.categoryToCoordinate(a));return this.adjustBalloonCoordinate(b)},formatBalloonText:function(a,b,c){var d="",g="",h=this.chart,f=this.data[b];if(f)if(this.parseDates)d=e.formatDate(f.category,c,h),b=e.changeDate(new Date(f.category),this.minPeriod,1),g=e.formatDate(b,c,h),-1!=d.indexOf("fff")&&(d=e.formatMilliseconds(d,f.category),g=e.formatMilliseconds(g,b));else{var k;this.data[b+1]&&(k=this.data[b+
1]);d=e.fixNewLines(f.category);k&&(g=e.fixNewLines(k.category))}a=a.replace(/\[\[category\]\]/g,String(d));return a=a.replace(/\[\[toCategory\]\]/g,String(g))},adjustBalloonCoordinate:function(a,b){var c=this.xToIndex(a),d=this.chart.chartCursor;if(this.stickBalloonToCategory){var e=this.data[c];e&&(a=e.x[this.id]);this.stickBalloonToStart&&(a-=this.cellWidth/2);var h=0;if(d){var f=d.limitToGraph;if(f){var k=f.valueAxis.id;f.hidden||(h=e.axes[k].graphs[f.id].y)}this.rotate?("left"==this.position?(f&&(h-=d.width),0<h&&(h=0)):0>h&&(h=0),d.fixHLine(a,h)):("top"==this.position?(f&&(h-=d.height),0<h&&(h=0)):0>h&&(h=0),d.fullWidth&&(a+=1),d.fixVLine(a,h))}}d&&!b&&(d.setIndex(c),this.parseDates&&d.setTimestamp(this.coordinateToDate(a).getTime()));return a}})})();
AmCharts.themes.light={themeName:"light",AmChart:{color:"#000000",backgroundColor:"#FFFFFF"},AmCoordinateChart:{colors:["#67b7dc","#fdd400","#84b761","#cc4748","#cd82ad","#2f4074","#448e4d","#b7b83f","#b9783f","#b93e3d","#913167"]},AmStockChart:{colors:["#67b7dc","#fdd400","#84b761","#cc4748","#cd82ad","#2f4074","#448e4d","#b7b83f","#b9783f","#b93e3d","#913167"]},AmSlicedChart:{colors:["#67b7dc","#fdd400","#84b761","#cc4748","#cd82ad","#2f4074","#448e4d","#b7b83f","#b9783f","#b93e3d","#913167"],outlineAlpha:1,outlineThickness:2,labelTickColor:"#000000",labelTickAlpha:0.3},AmRectangularChart:{zoomOutButtonColor:'#000000',zoomOutButtonRollOverAlpha:0.15,zoomOutButtonImage:"lens"},AxisBase:{axisColor:"#000000",axisAlpha:0.3,gridAlpha:0.1,gridColor:"#000000"},ChartScrollbar:{backgroundColor:"#000000",backgroundAlpha:0.12,graphFillAlpha:0.5,graphLineAlpha:0,selectedBackgroundColor:"#FFFFFF",selectedBackgroundAlpha:0.4,gridAlpha:0.15},ChartCursor:{cursorColor:"#000000",color:"#FFFFFF",cursorAlpha:0.5},AmLegend:{color:"#000000"},AmGraph:{lineAlpha:0.9},GaugeArrow:{color:"#000000",alpha:0.8,nailAlpha:0,innerRadius:"40%",nailRadius:15,startWidth:15,borderAlpha:0.8,nailBorderAlpha:0},GaugeAxis:{tickColor:"#000000",tickAlpha:1,tickLength:15,minorTickLength:8,axisThickness:3,axisColor:'#000000',axisAlpha:1,bandAlpha:0.8},TrendLine:{lineColor:"#c03246",lineAlpha:0.8},AreasSettings:{alpha:0.8,color:"#67b7dc",colorSolid:"#003767",unlistedAreasAlpha:0.4,unlistedAreasColor:"#000000",outlineColor:"#FFFFFF",outlineAlpha:0.5,outlineThickness:0.5,rollOverColor:"#3c5bdc",rollOverOutlineColor:"#FFFFFF",selectedOutlineColor:"#FFFFFF",selectedColor:"#f15135",unlistedAreasOutlineColor:"#FFFFFF",unlistedAreasOutlineAlpha:0.5},LinesSettings:{color:"#000000",alpha:0.8},ImagesSettings:{alpha:0.8,labelColor:"#000000",color:"#000000",labelRollOverColor:"#3c5bdc"},ZoomControl:{buttonFillAlpha:0.7,buttonIconColor:"#a7a7a7"},SmallMap:{mapColor:"#000000",rectangleColor:"#f15135",backgroundColor:"#FFFFFF",backgroundAlpha:0.7,borderThickness:1,borderAlpha:0.8},PeriodSelector:{color:"#000000"},PeriodButton:{color:"#000000",background:"transparent",opacity:0.7,border:"1px solid rgba(0, 0, 0, .3)",MozBorderRadius:"5px",borderRadius:"5px",margin:"1px",outline:"none",boxSizing:"border-box"},PeriodButtonSelected:{color:"#000000",backgroundColor:"#b9cdf5",border:"1px solid rgba(0, 0, 0, .3)",MozBorderRadius:"5px",borderRadius:"5px",margin:"1px",outline:"none",opacity:1,boxSizing:"border-box"},PeriodInputField:{color:"#000000",background:"transparent",border:"1px solid rgba(0, 0, 0, .3)",outline:"none"},DataSetSelector:{color:"#000000",selectedBackgroundColor:"#b9cdf5",rollOverBackgroundColor:"#a8b0e4"},DataSetCompareList:{color:"#000000",lineHeight:"100%",boxSizing:"initial",webkitBoxSizing:"initial",border:"1px solid rgba(0, 0, 0, .3)"},DataSetSelect:{border:"1px solid rgba(0, 0, 0, .3)",outline:"none"}};
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

"use strict!";

function handlemenutype(e) {
    $(".pcoded").attr("nav-type", e)
}
$(document).ready(function () {
    $("#pcoded").pcodedmenu({
            themelayout: "vertical",
            verticalMenuplacement: "left",
            verticalMenulayout: "wide",
            MenuTrigger: "click",
            SubMenuTrigger: "click",
            activeMenuClass: "active",
            ThemeBackgroundPattern: "theme1",
            HeaderBackground: "themelight1",
            LHeaderBackground: "theme1",
            NavbarBackground: "theme1",
            ActiveItemBackground: "theme1",
            SubItemBackground: "theme2",
            LogoTheme: "theme6",
            ActiveItemStyle: "style0",
            ItemBorder: !0,
            ItemBorderStyle: "solid",
            freamtype: "theme1",
            SubItemBorder: !1,
            DropDownIconStyle: "style1",
            menutype: "st2",
            layouttype: "light",
            FixedNavbarPosition: !0,
            FixedHeaderPosition: !0,
            collapseVerticalLeftHeader: !0,
            VerticalSubMenuItemIconStyle: "style1",
            VerticalNavigationView: "view1",
            verticalMenueffect: {
                desktop: "shrink",
                tablet: "overlay",
                phone: "overlay"
            },
            defaultVerticalMenu: {
                desktop: "expanded",
                tablet: "offcanvas",
                phone: "offcanvas"
            },
            onToggleVerticalMenu: {
                desktop: "offcanvas",
                tablet: "expanded",
                phone: "expanded"
            }
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

function floatchart() {
    var e = {
            legend: {
                show: !1
            },
            series: {
                label: "",
                curvedLines: {
                    active: !0,
                    nrSplinePoints: 20
                }
            },
            tooltip: {
                show: !0,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: !0,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 0
            },
            yaxis: {
                min: 0,
                max: 30,
                color: "transparent",
                font: {
                    size: 0
                }
            },
            xaxis: {
                color: "transparent",
                font: {
                    size: 0
                }
            }
        },
        a = {
            legend: {
                show: !1
            },
            series: {
                label: "",
                curvedLines: {
                    active: !0,
                    nrSplinePoints: 20
                }
            },
            tooltip: {
                show: !0,
                content: "x : %x | y : %y"
            },
            grid: {
                hoverable: !0,
                borderWidth: 0,
                labelMargin: 0,
                axisMargin: 0,
                minBorderMargin: 8
            },
            yaxis: {
                min: 0,
                max: 30,
                color: "transparent",
                font: {
                    size: 0
                }
            },
            xaxis: {
                color: "transparent",
                font: {
                    size: 0
                }
            }
        };
    $(function () {
        $.plot($("#sec-ecommerce-chart-line"), [{
            data: [
                [0, 18],
                [1, 10],
                [2, 20],
                [3, 10],
                [4, 27],
                [5, 15],
                [6, 20],
                [7, 28],
                [8, 20],
                [9, 10],
                [10, 18],
                [11, 10],
                [12, 20],
                [13, 10],
                [14, 27]
            ],
            color: "#fff",
            lines: {
                show: !0,
                fill: !1,
                lineWidth: 2
            },
            points: {
                show: !0,
                radius: 3,
                fill: !0,
                fillColor: "#fff"
            },
            curvedLines: {
                apply: !1
            }
        }], a), $.plot($("#sec-ecommerce-chart-bar"), [{
            data: [
                [0, 18],
                [1, 10],
                [2, 20],
                [3, 10],
                [4, 27],
                [5, 15],
                [6, 20],
                [7, 24],
                [8, 20],
                [9, 16],
                [10, 18],
                [11, 10],
                [12, 20],
                [13, 10],
                [14, 27]
            ],
            color: "#add3ff",
            bars: {
                show: !0,
                lineWidth: 1,
                fill: !0,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 1
                    }]
                },
                barWidth: .6,
                align: "center",
                horizontal: !1
            },
            points: {
                show: !1
            }
        }], e)
    })
}
$(document).ready(function () {
    floatchart(), $(window).on("resize", function () {
        floatchart()
    }), $("#mobile-collapse").on("click", function () {
        setTimeout(function () {
            floatchart()
        }, 700)
    }), $(".scroll-widget").slimScroll({
        size: "5px",
        height: "290px",
        allowPageScroll: !1
    });
    var e = AmCharts.makeChart("sales-analytics", {
        type: "serial",
        theme: "light",
        marginRight: 15,
        marginLeft: 40,
        autoMarginOffset: 20,
        dataDateFormat: "YYYY-MM-DD",
        valueAxes: [{
            id: "v1",
            axisAlpha: 0,
            position: "left",
            ignoreAxisWidth: !0
        }],
        balloon: {
            borderThickness: 1,
            shadowAlpha: 0
        },
        graphs: [{
            id: "g1",
            balloon: {
                drop: !0,
                adjustBorderColor: !1,
                color: "#ffffff",
                type: "smoothedLine"
            },
            fillAlphas: .3,
            bullet: "round",
            bulletBorderAlpha: 1,
            bulletColor: "#FFFFFF",
            lineColor: "#4099ff",
            bulletSize: 5,
            hideBulletsCount: 50,
            lineThickness: 3,
            type: "smoothedLine",
            title: "red line",
            useLineColorForBulletBorder: !0,
            valueField: "value",
            balloonText: "<span style='font-size:18px;'>[[value]]</span>"
        }],
        chartCursor: {
            valueLineEnabled: !0,
            valueLineBalloonEnabled: !0,
            cursorAlpha: 0,
            zoomable: !1,
            valueZoomable: !0,
            valueLineAlpha: .5
        },
        chartScrollbar: {
            autoGridCount: !0,
            graph: "g1",
            oppositeAxis: !0,
            scrollbarHeight: 40
        },
        categoryField: "date",
        categoryAxis: {
            parseDates: !0,
            dashLength: 1,
            minorGridEnabled: !0
        },
        export: {
            enabled: !0
        },
        dataProvider: [{
            date: "2012-07-27",
            value: 13
        }, {
            date: "2012-07-28",
            value: 11
        }, {
            date: "2012-07-29",
            value: 15
        }, {
            date: "2012-07-30",
            value: 16
        }, {
            date: "2012-07-31",
            value: 18
        }, {
            date: "2012-08-01",
            value: 13
        }, {
            date: "2012-08-02",
            value: 22
        }, {
            date: "2012-08-03",
            value: 23
        }, {
            date: "2012-08-04",
            value: 20
        }, {
            date: "2012-08-05",
            value: 17
        }, {
            date: "2012-08-06",
            value: 16
        }, {
            date: "2012-08-07",
            value: 18
        }, {
            date: "2012-08-08",
            value: 21
        }, {
            date: "2012-08-09",
            value: 26
        }, {
            date: "2012-08-10",
            value: 24
        }, {
            date: "2012-08-11",
            value: 29
        }, {
            date: "2012-08-12",
            value: 32
        }, {
            date: "2012-08-13",
            value: 18
        }, {
            date: "2012-08-14",
            value: 24
        }, {
            date: "2012-08-15",
            value: 22
        }, {
            date: "2012-08-16",
            value: 18
        }, {
            date: "2012-08-17",
            value: 19
        }, {
            date: "2012-08-18",
            value: 14
        }, {
            date: "2012-08-19",
            value: 15
        }, {
            date: "2012-08-20",
            value: 12
        }, {
            date: "2012-08-21",
            value: 8
        }, {
            date: "2012-08-22",
            value: 9
        }, {
            date: "2012-08-23",
            value: 8
        }, {
            date: "2012-08-24",
            value: 7
        }, {
            date: "2012-08-25",
            value: 5
        }, {
            date: "2012-08-26",
            value: 11
        }, {
            date: "2012-08-27",
            value: 13
        }, {
            date: "2012-08-28",
            value: 18
        }, {
            date: "2012-08-29",
            value: 20
        }, {
            date: "2012-08-30",
            value: 29
        }, {
            date: "2012-08-31",
            value: 33
        }, {
            date: "2012-09-01",
            value: 42
        }, {
            date: "2012-09-02",
            value: 35
        }, {
            date: "2012-09-03",
            value: 31
        }, {
            date: "2012-09-04",
            value: 47
        }, {
            date: "2012-09-05",
            value: 52
        }, {
            date: "2012-09-06",
            value: 46
        }, {
            date: "2012-09-07",
            value: 41
        }, {
            date: "2012-09-08",
            value: 43
        }, {
            date: "2012-09-09",
            value: 40
        }, {
            date: "2012-09-10",
            value: 39
        }, {
            date: "2012-09-11",
            value: 34
        }, {
            date: "2012-09-12",
            value: 29
        }, {
            date: "2012-09-13",
            value: 34
        }, {
            date: "2012-09-14",
            value: 37
        }, {
            date: "2012-09-15",
            value: 42
        }, {
            date: "2012-09-16",
            value: 49
        }, {
            date: "2012-09-17",
            value: 46
        }, {
            date: "2012-09-18",
            value: 47
        }, {
            date: "2012-09-19",
            value: 55
        }, {
            date: "2012-09-20",
            value: 59
        }, {
            date: "2012-09-21",
            value: 58
        }, {
            date: "2012-09-22",
            value: 57
        }, {
            date: "2012-09-23",
            value: 61
        }, {
            date: "2012-09-24",
            value: 59
        }, {
            date: "2012-09-25",
            value: 67
        }, {
            date: "2012-09-26",
            value: 65
        }, {
            date: "2012-09-27",
            value: 61
        }, {
            date: "2012-09-28",
            value: 66
        }, {
            date: "2012-09-29",
            value: 69
        }, {
            date: "2012-09-30",
            value: 71
        }, {
            date: "2012-10-01",
            value: 67
        }, {
            date: "2012-10-02",
            value: 63
        }, {
            date: "2012-10-03",
            value: 46
        }, {
            date: "2012-10-04",
            value: 32
        }, {
            date: "2012-10-05",
            value: 21
        }, {
            date: "2012-10-06",
            value: 18
        }, {
            date: "2012-10-07",
            value: 21
        }, {
            date: "2012-10-08",
            value: 28
        }, {
            date: "2012-10-09",
            value: 27
        }, {
            date: "2012-10-10",
            value: 36
        }, {
            date: "2012-10-11",
            value: 33
        }, {
            date: "2012-10-12",
            value: 31
        }, {
            date: "2012-10-13",
            value: 30
        }, {
            date: "2012-10-14",
            value: 34
        }, {
            date: "2012-10-15",
            value: 38
        }, {
            date: "2012-10-16",
            value: 37
        }, {
            date: "2012-10-17",
            value: 44
        }, {
            date: "2012-10-18",
            value: 49
        }, {
            date: "2012-10-19",
            value: 53
        }, {
            date: "2012-10-20",
            value: 57
        }, {
            date: "2012-10-21",
            value: 60
        }, {
            date: "2012-10-22",
            value: 61
        }, {
            date: "2012-10-23",
            value: 69
        }, {
            date: "2012-10-24",
            value: 67
        }, {
            date: "2012-10-25",
            value: 72
        }, {
            date: "2012-10-26",
            value: 77
        }, {
            date: "2012-10-27",
            value: 75
        }, {
            date: "2012-10-28",
            value: 70
        }, {
            date: "2012-10-29",
            value: 72
        }, {
            date: "2012-10-30",
            value: 70
        }, {
            date: "2012-10-31",
            value: 72
        }, {
            date: "2012-11-01",
            value: 73
        }, {
            date: "2012-11-02",
            value: 67
        }, {
            date: "2012-11-03",
            value: 68
        }, {
            date: "2012-11-04",
            value: 65
        }, {
            date: "2012-11-05",
            value: 71
        }, {
            date: "2012-11-06",
            value: 75
        }, {
            date: "2012-11-07",
            value: 74
        }, {
            date: "2012-11-08",
            value: 71
        }, {
            date: "2012-11-09",
            value: 76
        }, {
            date: "2012-11-10",
            value: 77
        }, {
            date: "2012-11-11",
            value: 81
        }, {
            date: "2012-11-12",
            value: 83
        }, {
            date: "2012-11-13",
            value: 80
        }, {
            date: "2012-11-14",
            value: 81
        }, {
            date: "2012-11-15",
            value: 87
        }, {
            date: "2012-11-16",
            value: 82
        }, {
            date: "2012-11-17",
            value: 86
        }, {
            date: "2012-11-18",
            value: 80
        }, {
            date: "2012-11-19",
            value: 87
        }, {
            date: "2012-11-20",
            value: 83
        }, {
            date: "2012-11-21",
            value: 85
        }, {
            date: "2012-11-22",
            value: 84
        }, {
            date: "2012-11-23",
            value: 82
        }, {
            date: "2012-11-24",
            value: 73
        }, {
            date: "2012-11-25",
            value: 71
        }, {
            date: "2012-11-26",
            value: 75
        }, {
            date: "2012-11-27",
            value: 79
        }, {
            date: "2012-11-28",
            value: 70
        }, {
            date: "2012-11-29",
            value: 73
        }, {
            date: "2012-11-30",
            value: 61
        }, {
            date: "2012-12-01",
            value: 62
        }, {
            date: "2012-12-02",
            value: 66
        }, {
            date: "2012-12-03",
            value: 65
        }, {
            date: "2012-12-04",
            value: 73
        }, {
            date: "2012-12-05",
            value: 79
        }, {
            date: "2012-12-06",
            value: 78
        }, {
            date: "2012-12-07",
            value: 78
        }, {
            date: "2012-12-08",
            value: 78
        }, {
            date: "2012-12-09",
            value: 74
        }, {
            date: "2012-12-10",
            value: 73
        }, {
            date: "2012-12-11",
            value: 75
        }, {
            date: "2012-12-12",
            value: 70
        }, {
            date: "2012-12-13",
            value: 77
        }, {
            date: "2012-12-14",
            value: 67
        }, {
            date: "2012-12-15",
            value: 62
        }, {
            date: "2012-12-16",
            value: 64
        }, {
            date: "2012-12-17",
            value: 61
        }, {
            date: "2012-12-18",
            value: 59
        }, {
            date: "2012-12-19",
            value: 53
        }, {
            date: "2012-12-20",
            value: 54
        }, {
            date: "2012-12-21",
            value: 56
        }, {
            date: "2012-12-22",
            value: 59
        }, {
            date: "2012-12-23",
            value: 58
        }, {
            date: "2012-12-24",
            value: 55
        }, {
            date: "2012-12-25",
            value: 52
        }, {
            date: "2012-12-26",
            value: 54
        }, {
            date: "2012-12-27",
            value: 50
        }, {
            date: "2012-12-28",
            value: 50
        }, {
            date: "2012-12-29",
            value: 51
        }, {
            date: "2012-12-30",
            value: 52
        }, {
            date: "2012-12-31",
            value: 58
        }, {
            date: "2013-01-01",
            value: 60
        }, {
            date: "2013-01-02",
            value: 67
        }, {
            date: "2013-01-03",
            value: 64
        }, {
            date: "2013-01-04",
            value: 66
        }, {
            date: "2013-01-05",
            value: 60
        }, {
            date: "2013-01-06",
            value: 63
        }, {
            date: "2013-01-07",
            value: 61
        }, {
            date: "2013-01-08",
            value: 60
        }, {
            date: "2013-01-09",
            value: 65
        }, {
            date: "2013-01-10",
            value: 75
        }, {
            date: "2013-01-11",
            value: 77
        }, {
            date: "2013-01-12",
            value: 78
        }, {
            date: "2013-01-13",
            value: 70
        }, {
            date: "2013-01-14",
            value: 70
        }, {
            date: "2013-01-15",
            value: 73
        }, {
            date: "2013-01-16",
            value: 71
        }, {
            date: "2013-01-17",
            value: 74
        }, {
            date: "2013-01-18",
            value: 78
        }, {
            date: "2013-01-19",
            value: 85
        }, {
            date: "2013-01-20",
            value: 82
        }, {
            date: "2013-01-21",
            value: 83
        }, {
            date: "2013-01-22",
            value: 88
        }, {
            date: "2013-01-23",
            value: 85
        }, {
            date: "2013-01-24",
            value: 85
        }, {
            date: "2013-01-25",
            value: 80
        }, {
            date: "2013-01-26",
            value: 87
        }, {
            date: "2013-01-27",
            value: 84
        }, {
            date: "2013-01-28",
            value: 83
        }, {
            date: "2013-01-29",
            value: 84
        }, {
            date: "2013-01-30",
            value: 81
        }]
    });
    setTimeout(function () {
        e.zoomToIndexes(Math.round(.45 * e.dataProvider.length), Math.round(.6 * e.dataProvider.length))
    }, 800)
});

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