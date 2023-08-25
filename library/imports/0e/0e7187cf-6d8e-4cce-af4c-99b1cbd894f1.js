"use strict";
cc._RF.push(module, '0e718fPbY5Mzq9MmbHL2JTx', 'tpfclientsdk');
// syyx_sdk/3rd/tpfsdk/sdk/tpfclientsdk.js

"use strict";

var tpfClientSdkImpl = function tpfClientSdkImpl() {
  function n(t) {
    return t !== undefined && null !== t ? String(t) : t;
  }

  this.appId = 0, this.channelId = 0, this.statAppKey = "", this.configAppSecKey = "", this.account = "", this.stat = null, this._tpfconfig = null, this.version = null, tpfClientSdkImpl.prototype.setEventHandler = function (t, n) {
    this.eventHandler[t] = n;
  }, tpfClientSdkImpl.prototype.init = function (t) {
    return this.stat = new tpfstat({
      appId: n(this.appId),
      appKey: n(this.statAppKey),
      version: n(this.version),
      sversion: n(this.sversion),
      channelId: n(this.channelId),
      eventUrl: n(this.statEventUrl),
      batchEventUrl: n(this.batchStatEventUrl)
    }), this._tpfconfig = new tpfconfig({
      appId: n(this.appId),
      appKey: n(this.configAppSecKey),
      channelId: n(this.channelId),
      configUrl: n(this.configUrl)
    }), 0;
  }, tpfClientSdkImpl.prototype.getClientVersion = function () {
    return this.version;
  }, tpfClientSdkImpl.prototype.uninit = function () {
    this.stat = null, this._tpfconfig = null;
  }, tpfClientSdkImpl.prototype.setEventHandler = function (t, n) {
    this.eventHandler[t] = n;
  }, tpfClientSdkImpl.prototype.getTpfConfig = function () {
    return this._tpfconfig;
  }, tpfClientSdkImpl.prototype.getStat = function () {
    return this.stat;
  };
},
    tpfClientSdkBuilder = function tpfClientSdkBuilder() {
  this.param = {}, tpfClientSdkBuilder.prototype.setParam = function (t, n) {
    return this.param[t] = n, this;
  }, tpfClientSdkBuilder.prototype.build = function () {
    var t = new tpfClientSdkImpl();
    return null == this.param.appId && console.log("appId is null!"), t.appId = this.param.appId, null == this.param.channelId && console.log("channelId is null!"), t.channelId = this.param.channelId, null == this.param.appKey && console.log("appKey is null!"), t.appKey = this.param.appKey, null == this.param.platType && console.error("platType is null"), t.platType = this.param.platType, this.param.version ? t.version = this.param.version : console.log(""), this.param.sversion ? t.sversion = this.param.sversion : console.info("sversion is null"), this.param.statAppKey ? t.statAppKey = this.param.statAppKey : console.log("statAppKey is null"), this.param.statEventUrl ? t.statEventUrl = this.param.statEventUrl : console.log(""), this.param.batchStatEventUrl ? t.batchStatEventUrl = this.param.batchStatEventUrl : console.log("batchStatEventUrl is null"), this.param.subChannelId ? t.subChannelId = this.param.subChannelId : t.subChannelId = "", this.param.configAppSecKey ? t.configAppSecKey = this.param.configAppSecKey : (console.log("configAppSecKey is null"), t.configAppSecKey = "0164619900d242b59e59f474e0294e4e"), this.param.configUrl ? t.configUrl = this.param.configUrl : (console.log(""), t.configUrl = ""), t;
  };
},
    tpfclientsdk = {
  getBuilder: function getBuilder() {
    return new tpfClientSdkBuilder();
  }
};

window.tpfclientsdk = tpfclientsdk;

cc._RF.pop();