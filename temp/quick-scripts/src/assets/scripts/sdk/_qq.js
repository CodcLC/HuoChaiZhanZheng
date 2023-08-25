"use strict";
cc._RF.push(module, '0d1ddHwb0pAhrbL0w6o11mM', '_qq');
// scripts/sdk/_qq.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ch_qq = void 0;
var TAG = '_qq.ts';
var _qq = /** @class */ (function () {
    function _qq() {
        this.videoAd = null;
        this.bannerAd = null;
        this.insertAd = null;
        this.appBoxAd = null;
        this.videoAdId = "";
        this.insertAdId = "";
        this.bannerAdId = "";
        this.appBoxAdId = "";
        this.OnVideoCallBackListener = null;
        this.sdkInitEnd = false;
        console.log(TAG, 'init platform channel: _qq_play');
    }
    _qq.getInstance = function () {
        if (this.Instance == null) {
            this.Instance = new _qq();
        }
        return this.Instance;
    };
    _qq.prototype.initAdParams = function (param) {
        if (this.sdkInitEnd) {
            return;
        }
        this.sdkInitEnd = true;
        this.insertAdId = param.insertId;
        this.bannerAdId = param.bannerId;
        this.videoAdId = param.videoId;
        this.appBoxAdId = param.appBoxId;
        this.initBannerAd();
    };
    _qq.prototype.buttonShare = function (OnShareCall, Protexture, desTxt) {
        // @ts-ignore
        _qq.shareAppMessage({
            title: desTxt,
            imageUrl: Protexture,
            query: "key1=val1",
            success: function (res) {
                OnShareCall(true);
            },
            fail: function (e) {
                OnShareCall(false);
            }
        });
    };
    _qq.prototype.initVideoAd = function () {
        var _this = this;
        //@ts-ignore
        this.videoAd = _qq.createRewardedVideoAd({
            adUnitId: this.videoAdId
        });
        this.videoAd.onError(function (res) {
            console.warn(TAG, '激励视频错误:', JSON.stringify(res));
        });
        this.videoAd.onLoad(function (res) {
            _this.videoAd.show();
        });
        this.videoAd.load();
        this.videoAd.onClose(function (res) {
            if (res && res.isEnded) {
                _this.OnVideoCallBackListener(true);
            }
            else {
                _this.OnVideoCallBackListener(false);
            }
        });
    };
    _qq.prototype.initBannerAd = function () {
        var _this = this;
        var info = null;
        //@ts-ignore
        _qq.getSystemInfo({
            success: function (res) {
                info = res;
                console.log(TAG, res.windowWidth);
                console.log(TAG, res.windowHeight);
            }
        });
        var targetBannerAdWidth = 150;
        //@ts-ignore
        this.bannerAd = _qq.createBannerAd({
            adUnitId: this.bannerAdId,
            style: {
                left: 0,
                top: info.windowHeight - targetBannerAdWidth,
                width: targetBannerAdWidth,
                height: 200
            }
        });
        this.bannerAd.onResize(function (size) {
            console.log("onResize", size.width, size.height);
            // 如果一开始设置的 banner 宽度超过了系统限制，可以在此处加以调整
            _this.bannerAd.style.left = (info.windowWidth - size.width) / 2;
            _this.bannerAd.style.top = info.windowHeight - size.height;
            //这行是为了在QQ小游戏中能正确显示位置.如果是微信则不需要这句
            _this.bannerAd.style.left = (info.windowWidth - size.width) / 2;
            _this.bannerAd.style.top = info.windowHeight - size.height;
        });
        this.bannerAd.onError(function (e) {
            console.warn(TAG, 'bannerAd onError!', e);
        });
        this.bannerAd.onLoad(function (res) {
            console.warn(TAG, 'bannerAd onLoad!', res);
        });
    };
    _qq.prototype.insertAd_show = function () {
        var _this = this;
        if (this.insertAd != null) {
            this.insertAd.destroy();
        }
        //@ts-ignore
        this.insertAd = _qq.createInterstitialAd({
            adUnitId: this.insertAdId
        });
        this.insertAd.load().then(function (res) {
            _this.insertAd.show();
        });
        this.insertAd.onError(function (err) {
            console.warn(TAG, "\u63D2\u5C4F\u5E7F\u544A\u9519\u8BEF:" + JSON.stringify(err));
        });
    };
    _qq.prototype.creatAppBoxAd = function () {
        //@ts-ignore
        this.appBoxAd = _qq.createAppBox({
            adUnitId: this.appBoxAdId
        });
    };
    _qq.prototype.appBoxAdShow = function () {
        var _this = this;
        this.creatAppBoxAd();
        this.appBoxAd.load().then(function () {
            _this.appBoxAd.show();
        });
    };
    _qq.prototype.appBoxDestroy = function () {
        this.appBoxAd.destroy();
        this.appBoxAd = null;
    };
    _qq.prototype.videoAd_show = function (OnVideoCall) {
        this.OnVideoCallBackListener = OnVideoCall;
        this.videoAd != null ? this.videoAd.load() : this.initVideoAd();
    };
    _qq.prototype.bannerAd_hide = function () {
        this.bannerAd.hide();
        this.bannerAd.destroy();
        this.initBannerAd();
    };
    _qq.prototype.bannerAd_show = function () {
        this.bannerAd.show().then(function () {
            console.log(TAG, 'banner广告显示成功!');
        }).catch(function (err) {
            console.warn(TAG, "banner\u5E7F\u544A\u7EC4\u4EF6\u51FA\u73B0\u95EE\u9898:" + err);
        });
    };
    _qq.prototype.shakeDevice = function () {
        // @ts-ignore
        _qq.vibrateShort();
    };
    return _qq;
}());
exports.ch_qq = _qq;

cc._RF.pop();