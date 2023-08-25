"use strict";
cc._RF.push(module, '5d57fhYn05IhJPkcocEaSWw', '_vivo');
// scripts/sdk/_vivo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ch_vivo = void 0;
var TAG = '_vivo.ts';
var _vivo = /** @class */ (function () {
    function _vivo() {
        this.videoId = "";
        this.bannerId = "";
        this.insertId = "";
        this.nativeId = "";
        this.videoAd = null;
        this.bannerAd = null;
        this.OnVideoCallBackListener = null;
        this.sdkInitEnd = false;
        this.showAdLastTime = 0;
        console.log(TAG, 'init platform channel: vivo_play');
    }
    _vivo.getInstance = function () {
        if (this.Instance == null) {
            this.Instance = new _vivo();
        }
        return this.Instance;
    };
    _vivo.prototype.initAdParams = function (param) {
        if (this.sdkInitEnd) {
            return;
        }
        this.sdkInitEnd = true;
        this.insertId = param.insertId;
        this.bannerId = param.bannerId;
        this.videoId = param.videoId;
        this.nativeId = param.nativeId;
        this.initBannderAd();
    };
    _vivo.prototype.initBannderAd = function () {
        //@ts-ignore
        var bannerAd = qg.createBannerAd({
            posId: this.bannerId,
            style: {}
        });
        this.bannerAd = bannerAd;
        this.bannerAd.onError(function (err) {
            console.warn(TAG, "banner\u5E7F\u544A\u52A0\u8F7D\u5931\u8D25:" + JSON.stringify(err));
        });
    };
    _vivo.prototype.bannerAd_show = function () {
        if (this.bannerAd) {
            this.bannerAd.show();
        }
    };
    _vivo.prototype.bannerAd_hide = function () {
        if (this.bannerAd) {
            this.bannerAd.hide();
            this.bannerAd.destroy();
            this.initBannderAd();
        }
    };
    _vivo.prototype.initVideoAd = function () {
        var _this = this;
        //@ts-ignore
        this.videoAd = qg.createRewardedVideoAd({
            posId: this.videoId
        });
        this.videoAd.onLoad(function () {
            cc.audioEngine.pauseAll();
            _this.videoAd.show();
            _this.showAdLastTime = new Date().getTime();
        });
        this.videoAd.onClose(function (res) {
            cc.audioEngine.resumeAll();
            if (res && res.isEnded) {
                _this.OnVideoCallBackListener(true);
            }
            else {
                _this.OnVideoCallBackListener(false);
            }
        });
        this.videoAd.onError(function (err) {
            console.warn(TAG, "\u89C6\u9891\u5E7F\u544A\u9519\u8BEF:" + JSON.stringify(err));
        });
        this.videoAd.load();
    };
    _vivo.prototype.videoAd_show = function (OnVideoCall) {
        var now = new Date().getTime();
        if (now - this.showAdLastTime < 60000) {
            //@ts-ignore
            qg.showToast({
                message: '每分钟只能看一次视频'
            });
            return;
        }
        this.OnVideoCallBackListener = OnVideoCall;
        this.videoAd != null ? this.videoAd.load() : this.initVideoAd();
    };
    _vivo.prototype.insertAd_show = function () {
        // @ts-ignore
        var interstitialAd = qg.createInterstitialAd({
            posId: this.insertId
        });
        interstitialAd.onError(function (err) {
            console.warn(TAG, "\u63D2\u5C4F\u5E7F\u544A\u9519\u8BEF:" + JSON.stringify(err));
        });
        interstitialAd.show();
    };
    _vivo.prototype.shakeDevice = function () {
        // @ts-ignore
        qg.vibrateShort();
    };
    _vivo.prototype.nativeAdShow = function (cb) {
        // @ts-ignore
        var nativeAd = qg.createNativeAd({
            posId: this.nativeId,
        });
        nativeAd.onLoad(function (res) {
            console.log(TAG, "\u539F\u751F\u5E7F\u544A\u52A0\u8F7D\u5B8C\u6210-onload\u89E6\u53D1:" + JSON.stringify(res));
            var nativeCurrentAd = null;
            if (res && res.adList) {
                nativeCurrentAd = res.adList.pop();
                ///> 上报曝光
                nativeAd.reportAdShow({ adId: nativeCurrentAd["adId"] });
                ///> 上报点击
                var tempClick = function () {
                    console.log(TAG, '_vivo 原生点击');
                    nativeAd.reportAdClick({ adId: nativeCurrentAd["adId"] });
                };
                //展示广告
                if (nativeCurrentAd["icon"] != null && nativeCurrentAd["imgUrlList"][0] != null) {
                    cb(nativeCurrentAd["icon"], nativeCurrentAd["imgUrlList"][0], tempClick);
                }
            }
        });
        nativeAd.onError(function (err) {
            switch (err.errCode) {
                case -3:
                    console.log(TAG, "\u539F\u751F\u5E7F\u544A\u52A0\u8F7D\u5931\u8D25---\u8C03\u7528\u592A\u9891\u7E41:" + JSON.stringify(err));
                    break;
                default:
                    console.log(TAG, "\u539F\u751F\u5E7F\u544A\u52A0\u8F7D\u5F02\u5E38:" + JSON.stringify(err));
                    break;
            }
        });
        nativeAd.load().then(function () {
            console.log(TAG, "VIVO\u539F\u751F\u52A0\u8F7D\u6210\u529F");
        }).catch(function (err) {
            console.warn(TAG, "VIVO\u539F\u751F\u52A0\u8F7D\u5931\u8D25:" + JSON.stringify(err));
        });
    };
    return _vivo;
}());
exports.ch_vivo = _vivo;

cc._RF.pop();