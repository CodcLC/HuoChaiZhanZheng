
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/3rd/tpfsdk/sdk/tpfclientsdk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXDNyZFxcdHBmc2RrXFxzZGtcXHRwZmNsaWVudHNkay5qcyJdLCJuYW1lcyI6WyJ0cGZDbGllbnRTZGtJbXBsIiwibiIsInQiLCJ1bmRlZmluZWQiLCJTdHJpbmciLCJhcHBJZCIsImNoYW5uZWxJZCIsInN0YXRBcHBLZXkiLCJjb25maWdBcHBTZWNLZXkiLCJhY2NvdW50Iiwic3RhdCIsIl90cGZjb25maWciLCJ2ZXJzaW9uIiwicHJvdG90eXBlIiwic2V0RXZlbnRIYW5kbGVyIiwiZXZlbnRIYW5kbGVyIiwiaW5pdCIsInRwZnN0YXQiLCJhcHBLZXkiLCJzdmVyc2lvbiIsImV2ZW50VXJsIiwic3RhdEV2ZW50VXJsIiwiYmF0Y2hFdmVudFVybCIsImJhdGNoU3RhdEV2ZW50VXJsIiwidHBmY29uZmlnIiwiY29uZmlnVXJsIiwiZ2V0Q2xpZW50VmVyc2lvbiIsInVuaW5pdCIsImdldFRwZkNvbmZpZyIsImdldFN0YXQiLCJ0cGZDbGllbnRTZGtCdWlsZGVyIiwicGFyYW0iLCJzZXRQYXJhbSIsImJ1aWxkIiwiY29uc29sZSIsImxvZyIsInBsYXRUeXBlIiwiZXJyb3IiLCJpbmZvIiwic3ViQ2hhbm5lbElkIiwidHBmY2xpZW50c2RrIiwiZ2V0QnVpbGRlciIsIndpbmRvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQWEsSUFBSUEsZ0JBQWdCLEdBQUMsU0FBakJBLGdCQUFpQixHQUFVO0FBQUMsV0FBU0MsQ0FBVCxDQUFXQyxDQUFYLEVBQWE7QUFBQyxXQUFPQSxDQUFDLEtBQUdDLFNBQUosSUFBZSxTQUFPRCxDQUF0QixHQUF3QkUsTUFBTSxDQUFDRixDQUFELENBQTlCLEdBQWtDQSxDQUF6QztBQUEyQzs7QUFBQSxPQUFLRyxLQUFMLEdBQVcsQ0FBWCxFQUFhLEtBQUtDLFNBQUwsR0FBZSxDQUE1QixFQUE4QixLQUFLQyxVQUFMLEdBQWdCLEVBQTlDLEVBQWlELEtBQUtDLGVBQUwsR0FBcUIsRUFB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OiIvIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7dmFyIHRwZkNsaWVudFNka0ltcGw9ZnVuY3Rpb24oKXtmdW5jdGlvbiBuKHQpe3JldHVybiB0IT09dW5kZWZpbmVkJiZudWxsIT09dD9TdHJpbmcodCk6dH10aGlzLmFwcElkPTAsdGhpcy5jaGFubmVsSWQ9MCx0aGlzLnN0YXRBcHBLZXk9XCJcIix0aGlzLmNvbmZpZ0FwcFNlY0tleT1cIlwiLHRoaXMuYWNjb3VudD1cIlwiLHRoaXMuc3RhdD1udWxsLHRoaXMuX3RwZmNvbmZpZz1udWxsLHRoaXMudmVyc2lvbj1udWxsLHRwZkNsaWVudFNka0ltcGwucHJvdG90eXBlLnNldEV2ZW50SGFuZGxlcj1mdW5jdGlvbih0LG4pe3RoaXMuZXZlbnRIYW5kbGVyW3RdPW59LHRwZkNsaWVudFNka0ltcGwucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuc3RhdD1uZXcgdHBmc3RhdCh7YXBwSWQ6bih0aGlzLmFwcElkKSxhcHBLZXk6bih0aGlzLnN0YXRBcHBLZXkpLHZlcnNpb246bih0aGlzLnZlcnNpb24pLHN2ZXJzaW9uOm4odGhpcy5zdmVyc2lvbiksY2hhbm5lbElkOm4odGhpcy5jaGFubmVsSWQpLGV2ZW50VXJsOm4odGhpcy5zdGF0RXZlbnRVcmwpLGJhdGNoRXZlbnRVcmw6bih0aGlzLmJhdGNoU3RhdEV2ZW50VXJsKX0pLHRoaXMuX3RwZmNvbmZpZz1uZXcgdHBmY29uZmlnKHthcHBJZDpuKHRoaXMuYXBwSWQpLGFwcEtleTpuKHRoaXMuY29uZmlnQXBwU2VjS2V5KSxjaGFubmVsSWQ6bih0aGlzLmNoYW5uZWxJZCksY29uZmlnVXJsOm4odGhpcy5jb25maWdVcmwpfSksMH0sdHBmQ2xpZW50U2RrSW1wbC5wcm90b3R5cGUuZ2V0Q2xpZW50VmVyc2lvbj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnZlcnNpb259LHRwZkNsaWVudFNka0ltcGwucHJvdG90eXBlLnVuaW5pdD1mdW5jdGlvbigpe3RoaXMuc3RhdD1udWxsLHRoaXMuX3RwZmNvbmZpZz1udWxsfSx0cGZDbGllbnRTZGtJbXBsLnByb3RvdHlwZS5zZXRFdmVudEhhbmRsZXI9ZnVuY3Rpb24odCxuKXt0aGlzLmV2ZW50SGFuZGxlclt0XT1ufSx0cGZDbGllbnRTZGtJbXBsLnByb3RvdHlwZS5nZXRUcGZDb25maWc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fdHBmY29uZmlnfSx0cGZDbGllbnRTZGtJbXBsLnByb3RvdHlwZS5nZXRTdGF0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3RhdH19LHRwZkNsaWVudFNka0J1aWxkZXI9ZnVuY3Rpb24oKXt0aGlzLnBhcmFtPXt9LHRwZkNsaWVudFNka0J1aWxkZXIucHJvdG90eXBlLnNldFBhcmFtPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHRoaXMucGFyYW1bdF09bix0aGlzfSx0cGZDbGllbnRTZGtCdWlsZGVyLnByb3RvdHlwZS5idWlsZD1mdW5jdGlvbigpe3ZhciB0PW5ldyB0cGZDbGllbnRTZGtJbXBsO3JldHVybiBudWxsPT10aGlzLnBhcmFtLmFwcElkJiZjb25zb2xlLmxvZyhcImFwcElkIGlzIG51bGwhXCIpLHQuYXBwSWQ9dGhpcy5wYXJhbS5hcHBJZCxudWxsPT10aGlzLnBhcmFtLmNoYW5uZWxJZCYmY29uc29sZS5sb2coXCJjaGFubmVsSWQgaXMgbnVsbCFcIiksdC5jaGFubmVsSWQ9dGhpcy5wYXJhbS5jaGFubmVsSWQsbnVsbD09dGhpcy5wYXJhbS5hcHBLZXkmJmNvbnNvbGUubG9nKFwiYXBwS2V5IGlzIG51bGwhXCIpLHQuYXBwS2V5PXRoaXMucGFyYW0uYXBwS2V5LG51bGw9PXRoaXMucGFyYW0ucGxhdFR5cGUmJmNvbnNvbGUuZXJyb3IoXCJwbGF0VHlwZSBpcyBudWxsXCIpLHQucGxhdFR5cGU9dGhpcy5wYXJhbS5wbGF0VHlwZSx0aGlzLnBhcmFtLnZlcnNpb24/dC52ZXJzaW9uPXRoaXMucGFyYW0udmVyc2lvbjpjb25zb2xlLmxvZyhcIlwiKSx0aGlzLnBhcmFtLnN2ZXJzaW9uP3Quc3ZlcnNpb249dGhpcy5wYXJhbS5zdmVyc2lvbjpjb25zb2xlLmluZm8oXCJzdmVyc2lvbiBpcyBudWxsXCIpLHRoaXMucGFyYW0uc3RhdEFwcEtleT90LnN0YXRBcHBLZXk9dGhpcy5wYXJhbS5zdGF0QXBwS2V5OmNvbnNvbGUubG9nKFwic3RhdEFwcEtleSBpcyBudWxsXCIpLHRoaXMucGFyYW0uc3RhdEV2ZW50VXJsP3Quc3RhdEV2ZW50VXJsPXRoaXMucGFyYW0uc3RhdEV2ZW50VXJsOmNvbnNvbGUubG9nKFwiXCIpLHRoaXMucGFyYW0uYmF0Y2hTdGF0RXZlbnRVcmw/dC5iYXRjaFN0YXRFdmVudFVybD10aGlzLnBhcmFtLmJhdGNoU3RhdEV2ZW50VXJsOmNvbnNvbGUubG9nKFwiYmF0Y2hTdGF0RXZlbnRVcmwgaXMgbnVsbFwiKSx0aGlzLnBhcmFtLnN1YkNoYW5uZWxJZD90LnN1YkNoYW5uZWxJZD10aGlzLnBhcmFtLnN1YkNoYW5uZWxJZDp0LnN1YkNoYW5uZWxJZD1cIlwiLHRoaXMucGFyYW0uY29uZmlnQXBwU2VjS2V5P3QuY29uZmlnQXBwU2VjS2V5PXRoaXMucGFyYW0uY29uZmlnQXBwU2VjS2V5Oihjb25zb2xlLmxvZyhcImNvbmZpZ0FwcFNlY0tleSBpcyBudWxsXCIpLHQuY29uZmlnQXBwU2VjS2V5PVwiMDE2NDYxOTkwMGQyNDJiNTllNTlmNDc0ZTAyOTRlNGVcIiksdGhpcy5wYXJhbS5jb25maWdVcmw/dC5jb25maWdVcmw9dGhpcy5wYXJhbS5jb25maWdVcmw6KGNvbnNvbGUubG9nKFwiXCIpLHQuY29uZmlnVXJsPVwiXCIpLHR9fSx0cGZjbGllbnRzZGs9e2dldEJ1aWxkZXI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IHRwZkNsaWVudFNka0J1aWxkZXJ9fTt3aW5kb3cudHBmY2xpZW50c2RrPXRwZmNsaWVudHNkazsiXX0=