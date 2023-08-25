"use strict";
cc._RF.push(module, 'c606dYj5MlEIIf1EFZ8BrCH', 'httputils');
// syyx_sdk/3rd/tpfsdk/communication/httputils.js

"use strict";

var HttpUtils = {
  http_request_wx: function http_request_wx(t, e, s, o, a, l, n) {
    wx.request({
      url: e,
      method: t,
      data: o,
      header: s,
      success: function success(t) {
        console.log(" console.log(res.header);"), console.log(t.s), console.log(t.data), n ? l.call(n, t.statusCode, t.data) : l(t.statusCode, t.data);
      },
      fail: function fail(t) {
        console.log("http_request_wx fail", t), t && t.statusCode && 304 === t.statusCode ? n ? l.call(n, t.statusCode, t.data) : l(t.statusCode, t.data) : n ? l.call(n, -1, null) : l(-1, null);
      }
    });
  },
  http_request_qq_new: function http_request_qq_new(t, e, s, o, a, l, n) {
    qq.request({
      url: e,
      method: t,
      data: o,
      header: s,
      success: function success(t) {
        console.log(" console.log(res.header);"), console.log(t.s), console.log(t.data), n ? l.call(n, t.statusCode, t.data) : l(t.statusCode, t.data);
      },
      fail: function fail(t) {
        console.log("http_request_qq fail", t), t && t.statusCode && 304 === t.statusCode ? n ? l.call(n, t.statusCode, t.data) : l(t.statusCode, t.data) : n ? l.call(n, -1, null) : l(-1, null);
      }
    });
  },
  http_request_qq: function http_request_qq(t, e, s, o, a, l, n) {
    console.log("http_request_qq:", t, e, s, o), BK.Http.request({
      url: e,
      method: t,
      headers: s,
      body: o,
      success: function success(t) {
        console.log("statusCode", JSON.stringify(t), t.statusCode), n ? l.call(n, t.statusCode, t.jsonObject()) : l(t.statusCode, t.jsonObject());
      },
      fail: function fail(t) {
        console.log("http_request_qq fail", t.msg), res && res.statusCode && 304 === res.statusCode ? n ? l.call(n, res.statusCode, res.data) : l(res.statusCode, res.data) : n ? l.call(n, -1, null) : l(-1, null);
      },
      complete: function complete() {
        console.log("http_request_qq complete");
      },
      uploadProgress: function uploadProgress(t, e) {
        console.log("http_request_qq upload progress", t / e);
      },
      downloadProgress: function downloadProgress(t, e) {
        console.log("http_request_qq download progress", t / e);
      }
    }), console.log("http_request_qq finished:", n);
  },
  http_request: function http_request(t, e, s, o, a, l, n) {
    if (l) {
      var u = new XMLHttpRequest();
      if (u.onreadystatechange = function () {
        var t;
        4 == u.readyState && (a ? 200 == this.status && ((t = new ByteBuffer(u.response.length, !1)).writeBytes(u.response, "binary"), t = t.view) : t = u.responseText, n ? l.call(n, u.status, t) : l(u.status, t));
      }, u.open(t, e, !0), null != s) for (var r in s) {
        u.setRequestHeader(r, s[r]);
      }

      if (null != a && a && (u.responseType = "arraybuffer"), o) {
        var d = o;
        u.send(d);
      } else u.send();
    }
  },
  decode: function decode(t) {
    var e,
        s,
        o,
        a,
        l,
        n,
        u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        r = new Array(),
        d = 0;

    for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); d < t.length;) {
      (e = u.indexOf(t.charAt(d++)) << 2 | (a = u.indexOf(t.charAt(d++))) >> 4) > 128 && (e -= 256), (s = (15 & a) << 4 | (l = u.indexOf(t.charAt(d++))) >> 2) > 128 && (s -= 256), (o = (3 & l) << 6 | (n = u.indexOf(t.charAt(d++)))) > 128 && (o -= 256), r.push(e), 64 != l && r.push(s), 64 != n && r.push(o);
    }

    return r;
  }
};
window.HttpUtils = HttpUtils;

cc._RF.pop();