"use strict";
cc._RF.push(module, '88b612jW7FE8YNjGjTEQ72h', 'tpfconfig');
// syyx_sdk/3rd/tpfsdk/sdk/tpfconfig.js

"use strict";

var tpfconfig = function tpfconfig(t) {
  function u(t, n) {
    return t = Math.ceil(t), n = Math.floor(n), Math.floor(Math.random() * (n - t)) + t;
  }

  function g(t, n, e, p, o) {
    return md5("appId=" + t + "&json=" + o + "&random=" + e + "&timestamp=" + p + "&appKey=" + n).toUpperCase();
  }

  this.appId = t.appId, this.appKey = t.appKey, this.channelId = t.channelId, this.configUrl = t.configUrl, tpfstat.prototype.CONFIG_API_VERSION = "2.2", tpfstat.prototype.CONFIG_CLIENT_SOURCE = "client", tpfconfig.prototype.httpGetconfig = function (o, t, n, i) {
    var e,
        p,
        a,
        r,
        l = u(0, 4294967295),
        s = {
      appId: this.appId,
      channelId: this.channelId,
      version: t,
      configKey: o,
      userId: ""
    },
        f = JSON.stringify(s),
        c = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: (e = this.appId, p = this.appKey, "appId=" + e + "&random=" + (a = l + "") + "&timestamp=" + (r = n) + "&sign=" + g(e, p, a, r, f))
    },
        h = this.configUrl;
    HttpUtils.http_request("POST", h, c, f, !1, function (t, n) {
      var e, p;
      console.log("test111111111111"), 200 == t ? (p = (e = JSON.parse(n)).version, i(!0, o, p, e.configValue)) : 304 == t ? i(!1, o, p, null) : i(!1, null, null, null);
    });
  }, tpfconfig.prototype.httpGetconfigWx = function (p, t, n, o) {
    var e = u(0, 4294967295),
        i = {
      appId: this.appId,
      channelId: this.channelId,
      version: t,
      configKey: p,
      userId: ""
    },
        a = JSON.stringify(i),
        r = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: g(this.appId, this.appKey, e + "", n, a)
    },
        l = this.configUrl;
    HttpUtils.http_request_wx("POST", l, r, a, !1, function (t, n) {
      var e;
      console.log("test111111111111", t, n), 200 == t ? (e = n.version, o(!0, p, e, n.configValue)) : 304 == t ? o(!1, p, !0, null) : o(!1, null, null, null);
    });
  }, tpfconfig.prototype.parse_csv = function (t, n) {
    if ("" == t) return {};

    for (var e = new RegExp('(\\,|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\,\\r\\n]*))', "gi"), p = [[]], o = null; o = e.exec(t);) {
      var i,
          a = o[1];
      a.length && "," !== a && p.push([]), i = o[2] ? o[2].replace(new RegExp('""', "g"), '"') : o[3], p[p.length - 1].push(i);
    }

    var r = {};

    if (3 < p.length) {
      for (var l = p[1], s = -1, f = 0; f < l.length; ++f) {
        if (l[f] == n) {
          s = f;
          break;
        }
      }

      for (var c = p[2], f = 3; f < p.length; ++f) {
        if (1 !== p[f].length || "" !== p[f][0]) {
          var h = null;
          r[h = -1 != s ? p[f][s] : f - 3] = {};

          for (var u = 0; u < l.length; ++u) {
            "string" == c[u] ? r[h][l[u]] = p[f][u] || "" : "int" == c[u] ? r[h][l[u]] = parseInt(p[f][u] || 0) : "float" == c[u] ? r[h][l[u]] = parseFloat(p[f][u] || 0) : "boolean" == c[u] ? r[h][l[u]] = "TRUE" == p[f][u] : "json" == c[u] && "" != p[f][u] && (r[h][l[u]] = JSON.parse(p[f][u]));
          }
        }
      }
    }

    return r;
  };
};

window.tpfconfig = tpfconfig;

cc._RF.pop();