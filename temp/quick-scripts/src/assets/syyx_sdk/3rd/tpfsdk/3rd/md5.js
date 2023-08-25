"use strict";
cc._RF.push(module, 'f24edcNJ/RFR63miKZCkVWa', 'md5');
// syyx_sdk/3rd/tpfsdk/3rd/md5.js

"use strict";

var MD5 = function MD5(n) {
  function A(n, r, t) {
    return n & r | ~n & t;
  }

  function g(n, r, t) {
    return t & n | ~t & r;
  }

  function v(n, r, t) {
    return n ^ r ^ t;
  }

  function d(n, r, t) {
    return r ^ (n | ~t);
  }

  function U(n, r) {
    return n[r + 3] << 24 | n[r + 2] << 16 | n[r + 1] << 8 | n[r];
  }

  function e(n) {
    for (var r = [], t = 0; t < n.length; t++) {
      if (n.charCodeAt(t) <= 127) r.push(n.charCodeAt(t));else for (var e = encodeURIComponent(n.charAt(t)).substr(1).split("%"), o = 0; o < e.length; o++) {
        r.push(parseInt(e[o], 16));
      }
    }

    return r;
  }

  function r(n) {
    for (var r = new Array(n.length), t = 0; t < n.length; t++) {
      r[t] = n[t];
    }

    return r;
  }

  var m = null,
      t = null;

  function w(n, r) {
    return 4294967295 & n + r;
  }

  return "string" == typeof n ? m = e(n) : n.constructor == Array ? 0 === n.length ? m = n : "string" == typeof n[0] ? m = function o(n) {
    for (var r = [], t = 0; t < n.length; t++) {
      r = r.concat(e(n[t]));
    }

    return r;
  }(n) : "number" == typeof n[0] ? m = n : t = typeof n[0] : "undefined" != typeof ArrayBuffer ? n instanceof ArrayBuffer ? m = r(new Uint8Array(n)) : n instanceof Uint8Array || n instanceof Int8Array ? m = r(n) : n instanceof Uint32Array || n instanceof Int32Array || n instanceof Uint16Array || n instanceof Int16Array || n instanceof Float32Array || n instanceof Float64Array ? m = r(new Uint8Array(n.buffer)) : t = typeof n : t = typeof n, t && alert("MD5 type mismatch, cannot process " + t), function I() {
    function n(n, r, t, e) {
      var o = y;
      y = s, c = w(s = c, function a(n, r) {
        return n << r & 4294967295 | n >>> 32 - r;
      }(w(i, w(n, w(r, t))), e)), i = o;
    }

    var r = m.length;
    m.push(128);
    var t = m.length % 64;

    if (56 < t) {
      for (var e = 0; e < 64 - t; e++) {
        m.push(0);
      }

      t = m.length % 64;
    }

    for (e = 0; e < 56 - t; e++) {
      m.push(0);
    }

    m = m.concat(function l(n) {
      for (var r = [], t = 0; t < 8; t++) {
        r.push(255 & n), n >>>= 8;
      }

      return r;
    }(8 * r));
    var o = 1732584193,
        a = 4023233417,
        f = 2562383102,
        u = 271733878,
        i = 0,
        c = 0,
        s = 0,
        y = 0;

    for (e = 0; e < m.length / 64; e++) {
      i = o;
      var h = 64 * e;
      n(A(c = a, s = f, y = u), 3614090360, U(m, h), 7), n(A(c, s, y), 3905402710, U(m, 4 + h), 12), n(A(c, s, y), 606105819, U(m, 8 + h), 17), n(A(c, s, y), 3250441966, U(m, 12 + h), 22), n(A(c, s, y), 4118548399, U(m, 16 + h), 7), n(A(c, s, y), 1200080426, U(m, 20 + h), 12), n(A(c, s, y), 2821735955, U(m, 24 + h), 17), n(A(c, s, y), 4249261313, U(m, 28 + h), 22), n(A(c, s, y), 1770035416, U(m, 32 + h), 7), n(A(c, s, y), 2336552879, U(m, 36 + h), 12), n(A(c, s, y), 4294925233, U(m, 40 + h), 17), n(A(c, s, y), 2304563134, U(m, 44 + h), 22), n(A(c, s, y), 1804603682, U(m, 48 + h), 7), n(A(c, s, y), 4254626195, U(m, 52 + h), 12), n(A(c, s, y), 2792965006, U(m, 56 + h), 17), n(A(c, s, y), 1236535329, U(m, 60 + h), 22), n(g(c, s, y), 4129170786, U(m, 4 + h), 5), n(g(c, s, y), 3225465664, U(m, 24 + h), 9), n(g(c, s, y), 643717713, U(m, 44 + h), 14), n(g(c, s, y), 3921069994, U(m, h), 20), n(g(c, s, y), 3593408605, U(m, 20 + h), 5), n(g(c, s, y), 38016083, U(m, 40 + h), 9), n(g(c, s, y), 3634488961, U(m, 60 + h), 14), n(g(c, s, y), 3889429448, U(m, 16 + h), 20), n(g(c, s, y), 568446438, U(m, 36 + h), 5), n(g(c, s, y), 3275163606, U(m, 56 + h), 9), n(g(c, s, y), 4107603335, U(m, 12 + h), 14), n(g(c, s, y), 1163531501, U(m, 32 + h), 20), n(g(c, s, y), 2850285829, U(m, 52 + h), 5), n(g(c, s, y), 4243563512, U(m, 8 + h), 9), n(g(c, s, y), 1735328473, U(m, 28 + h), 14), n(g(c, s, y), 2368359562, U(m, 48 + h), 20), n(v(c, s, y), 4294588738, U(m, 20 + h), 4), n(v(c, s, y), 2272392833, U(m, 32 + h), 11), n(v(c, s, y), 1839030562, U(m, 44 + h), 16), n(v(c, s, y), 4259657740, U(m, 56 + h), 23), n(v(c, s, y), 2763975236, U(m, 4 + h), 4), n(v(c, s, y), 1272893353, U(m, 16 + h), 11), n(v(c, s, y), 4139469664, U(m, 28 + h), 16), n(v(c, s, y), 3200236656, U(m, 40 + h), 23), n(v(c, s, y), 681279174, U(m, 52 + h), 4), n(v(c, s, y), 3936430074, U(m, h), 11), n(v(c, s, y), 3572445317, U(m, 12 + h), 16), n(v(c, s, y), 76029189, U(m, 24 + h), 23), n(v(c, s, y), 3654602809, U(m, 36 + h), 4), n(v(c, s, y), 3873151461, U(m, 48 + h), 11), n(v(c, s, y), 530742520, U(m, 60 + h), 16), n(v(c, s, y), 3299628645, U(m, 8 + h), 23), n(d(c, s, y), 4096336452, U(m, h), 6), n(d(c, s, y), 1126891415, U(m, 28 + h), 10), n(d(c, s, y), 2878612391, U(m, 56 + h), 15), n(d(c, s, y), 4237533241, U(m, 20 + h), 21), n(d(c, s, y), 1700485571, U(m, 48 + h), 6), n(d(c, s, y), 2399980690, U(m, 12 + h), 10), n(d(c, s, y), 4293915773, U(m, 40 + h), 15), n(d(c, s, y), 2240044497, U(m, 4 + h), 21), n(d(c, s, y), 1873313359, U(m, 32 + h), 6), n(d(c, s, y), 4264355552, U(m, 60 + h), 10), n(d(c, s, y), 2734768916, U(m, 24 + h), 15), n(d(c, s, y), 1309151649, U(m, 52 + h), 21), n(d(c, s, y), 4149444226, U(m, 16 + h), 6), n(d(c, s, y), 3174756917, U(m, 44 + h), 10), n(d(c, s, y), 718787259, U(m, 8 + h), 15), n(d(c, s, y), 3951481745, U(m, 36 + h), 21), o = w(o, i), a = w(a, c), f = w(f, s), u = w(u, y);
    }

    return function p(n, r, t, e) {
      for (var o, a = "", f = 0, u = 0, i = 3; 0 <= i; i--) {
        f = 255 & (u = arguments[i]), f <<= 8, f |= 255 & (u >>>= 8), f <<= 8, f |= 255 & (u >>>= 8), f <<= 8, a += (o = ((f |= u >>>= 8) >>> 0).toString(16), "00000000".substr(0, 8 - o.length) + o);
      }

      return a;
    }(u, f, a, o).toUpperCase();
  }();
};

window.md5 = MD5;

cc._RF.pop();