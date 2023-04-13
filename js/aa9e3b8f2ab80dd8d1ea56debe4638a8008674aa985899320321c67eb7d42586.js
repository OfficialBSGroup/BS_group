! function(t) {
    "use strict";

    function n(t) {
        return t * Math.PI / 180
    }

    function e(t) {
        return 180 * t / Math.PI
    }
    class i {
        constructor(t, n) {
            this.x = t, this.y = n
        }
    }
    class r {
        constructor(t, n, e, i, r, s, o) {
            this.s = t, this.t11 = n, this.t12 = e, this.t13 = i, this.t21 = r, this.t22 = s, this.t23 = o
        }
        static translate(t, n) {
            return new r(1, 1, 0, t, 0, 1, n)
        }
        static scale(t) {
            return new r(t, t, 0, 0, 0, t, 0)
        }
        static scaleAround(t, n) {
            return r.translate(-t.x, -t.y).then(r.scale(n)).then(r.translate(t.x, t.y))
        }
        static rotate(t) {
            let n = Math.cos(t),
                e = Math.sin(t);
            return 1 === Math.abs(n) ? e = 0 : 1 === Math.abs(e) && (n = 0), new r(1, n, -e, 0, e, n, 0)
        }
        static rotateAround(t, n) {
            return r.translate(-t.x, -t.y).then(r.rotate(n)).then(r.translate(t.x, t.y))
        }
        rotation() {
            return Math.atan2(+this.t21, +this.t11)
        }
        scale() {
            return this.s
        }
        multiply(t) {
            const n = this.s * t.s,
                e = this.t11 * t.t11 + this.t12 * t.t21,
                i = this.t11 * t.t12 + this.t12 * t.t22,
                s = this.t11 * t.t13 + this.t12 * t.t23 + this.t13,
                o = this.t21 * t.t11 + this.t22 * t.t21,
                a = this.t21 * t.t12 + this.t22 * t.t22,
                h = this.t21 * t.t13 + this.t22 * t.t23 + this.t23;
            return new r(n, e, i, s, o, a, h)
        }
        then(t) {
            return t.multiply(this)
        }
        transformPoint(t) {
            return {
                x: this.t11 * t.x + this.t12 * t.y + this.t13,
                y: this.t21 * t.x + this.t22 * t.y + this.t23
            }
        }
    }
    class s {
        constructor(t, n, e, i, r = 0) {
            this.top = t, this.left = n, this.height = e, this.width = i, this.rotation = r
        }
        static fromCenterBox({
            center: t,
            width: n,
            height: e,
            rotation: i
        }) {
            return new s(t.y - e / 2, t.x - n / 2, e, n, i)
        }
        growAroundToContainPoints(t, n, e = 1e-10) {
            const i = this.scaleAroundToContain(t, n, e);
            return this.transform(r.scaleAround(t, i))
        }
        scaleAroundToContain(t, e, i) {
            const s = r.translate(-t.x, -t.y).then(r.rotate(n(-this.rotation))),
                [o, , , a] = this.corners(),
                [h, l] = [s.transformPoint(o), s.transformPoint(a)],
                c = h.x,
                u = h.y,
                d = l.x,
                m = l.y;
            let f = 0,
                w = 0,
                g = 0,
                x = 0;
            for (const t of e) {
                const n = s.transformPoint(t);
                f = Math.min(f, n.x), g = Math.min(g, n.y), w = Math.max(w, n.x), x = Math.max(x, n.y)
            }
            let y = 0;
            return f < -i && (y = Math.max(y, f / c)), g < -i && (y = Math.max(y, g / u)), w > i && (y = Math.max(y, w / d)), x > i && (y = Math.max(y, x / m)), y
        }
        center() {
            return new i(this.left + this.width / 2, this.top + this.height / 2)
        }
        corners() {
            const t = this.left,
                e = this.top,
                s = this.left + this.width,
                o = this.top + this.height;
            if (0 === this.rotation) return [new i(t, e), new i(s, e), new i(t, o), new i(s, o)]; {
                const a = r.rotateAround(this.center(), n(this.rotation));
                return [a.transformPoint(new i(t, e)), a.transformPoint(new i(s, e)), a.transformPoint(new i(t, o)), a.transformPoint(new i(s, o))]
            }
        }
        fromCssBasis() {
            const t = this.center();
            return r.translate(-t.x + this.left, -t.y + this.top).then(r.rotate(n(this.rotation))).then(r.translate(t.x, t.y))
        }
        transform(t) {
            const n = t.transformPoint(this.center()),
                i = t.scale(),
                r = this.width * i,
                o = this.height * i,
                a = this.rotation + e(t.rotation());
            return s.fromCenterBox({
                center: n,
                width: r,
                height: o,
                rotation: a
            })
        }
    }

    function o(t) {
        const {
            containerWidth: n,
            containerHeight: e
        } = t.dataset;
        if (!n || !e) return;
        const i = new s(0, 0, parseFloat(e), parseFloat(n)),
            {
                imageboxWidth: o,
                imageboxHeight: a,
                imageboxTop: h,
                imageboxLeft: l,
                imageboxRotation: c
            } = t.dataset;
        if (!(o && a && h && l && c)) return;
        const u = new s(parseFloat(h), parseFloat(l), parseFloat(a), parseFloat(o), parseFloat(c)),
            {
                width: d,
                height: m
            } = t.parentElement.getBoundingClientRect(),
            f = {
                x: d / 2,
                y: m / 2
            },
            w = u.top / i.height,
            g = u.left / i.width,
            x = u.height / i.height,
            y = u.width / i.width,
            p = new s(w * m, g * d, x * m, y * d, u.rotation).corners(),
            M = r.translate(f.x - i.width / 2, f.y - i.height / 2),
            C = u.transform(i.fromCssBasis()).transform(M).growAroundToContainPoints(f, p);
        t.style.top = `${C.top}px`, t.style.left = `${C.left}px`, t.style.width = `${C.width}px`, t.style.height = `${C.height}px`
    }(function(t, n) {
        let e = (null == n ? void 0 : n.runOnLoad) ? void 0 : document.documentElement.clientWidth,
            i = (null == n ? void 0 : n.runOnLoad) ? void 0 : window.innerHeight;
        const r = () => {
                const r = {
                        runOnLoad: !1,
                        runOnWidthChange: !0,
                        runOnHeightChange: !1,
                        ...n
                    },
                    s = document.documentElement.clientWidth,
                    o = window.innerHeight,
                    a = i !== o;
                (e !== s && r.runOnWidthChange || a && r.runOnHeightChange) && t(), e = s, i = o
            },
            s = function(t, n) {
                let e;
                return (...i) => {
                    clearTimeout(e), e = setTimeout((() => {
                        t(...i)
                    }), n)
                }
            }(r, 100);
        window.addEventListener("resize", s), (null == n ? void 0 : n.runOnLoad) && ("loading" === document.readyState ? window.addEventListener("DOMContentLoaded", r) : r())
    })((function() {
        Array.from(document.querySelectorAll(".scale_rotated_fill")).forEach(o)
    }), {
        runOnLoad: !0,
        runOnHeightChange: !0
    }), t.degreesToRadians = n, t.radiansToDegrees = e, t.scaleRotatedFill = o, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}({});