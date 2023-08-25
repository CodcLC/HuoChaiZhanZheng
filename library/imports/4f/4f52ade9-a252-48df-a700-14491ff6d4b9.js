"use strict";
cc._RF.push(module, '4f52a3polJI36cAFEkf9tS5', '_wechat');
// scripts/sdk/_wechat.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ch_wechat = void 0;
var TAG = '_wechat.ts';
var _wechat = /** @class */ (function () {
    function _wechat() {
        this.videoAd = null;
        this.bannerAd = null;
        this.videoId = "";
        this.bannerId = "";
        this.insertId = "";
        this.sdkInitEnd = false;
        this.onVideoAdCallBack = null;
        this.insertAdTime = 0;
        console.log(TAG, 'init platform channel: _wechat');
    }
    _wechat.getInstance = function () {
        if (this.Instance == null) {
            this.Instance = new _wechat();
        }
        return this.Instance;
    };
    _wechat.prototype.initAdParams = function (param) {
        if (this.sdkInitEnd) {
            return;
        }
        this.sdkInitEnd = true;
        this.insertId = param.insertId;
        this.bannerId = param.bannerId;
        this.videoId = param.videoId;
    };
    _wechat.prototype.initBannerAd = function () {
        var _this = this;
        // @ts-ignore
        var _a = wx.getSystemInfoSync(), windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
        var targetBannerAdWidth = 120;
        // 创建一个居于屏幕底部正中的广告
        // @ts-ignore
        this.bannerAd = wx.createBannerAd({
            adUnitId: this.bannerId,
            adIntervals: 120,
            style: {
                width: targetBannerAdWidth,
                top: windowHeight - (targetBannerAdWidth / 16 * 9),
            }
        });
        this.bannerAd.onError(function (err) {
            switch (err['errCode']) {
                case 1000:
                    console.warn(TAG, '后端错误调用失败');
                    break;
                case 1001:
                    console.warn(TAG, '参数错误');
                    break;
                case 1002:
                    console.warn(TAG, '广告单元无效');
                    break;
                case 1003:
                    console.warn(TAG, '内部错误');
                    break;
                case 1004:
                    console.warn(TAG, '无合适的广告, 尝试重新加载');
                    break;
                case 1005:
                    console.warn(TAG, '广告正在被审核，无法展现广告');
                    break;
                case 1007:
                    console.warn(TAG, '广告能力被禁用');
                    break;
                case 1008:
                    console.warn(TAG, '广告单元已关闭');
                    break;
                default:
                    break;
            }
        });
        // 也可以手动修改属性以调整广告尺寸
        this.bannerAd.style.left = (windowWidth - targetBannerAdWidth) / 2;
        // 尺寸调整时会触发回调
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        this.bannerAd.onResize(function (size) {
            console.log(TAG, size.width, size.height);
            if (size.width == 0 || size.height == 0) {
                return;
            }
            // 如果一开始设置的 banner 宽度超过了系统限制，可以在此处加以调整
            if (targetBannerAdWidth != size.width) {
                targetBannerAdWidth = size.width;
                _this.bannerAd.style.top = windowHeight - (size.height);
                _this.bannerAd.style.left = (windowWidth - size.width) / 2;
            }
        });
        //广告组件成功拉取广告素材时会触发load事件的监听器
        this.bannerAd.onLoad(function () {
            console.log(TAG, "banner广告拉取完成!");
        });
    };
    _wechat.prototype.bannerAd_show = function () {
        if (this.bannerAd) {
            this.bannerAd.show();
        }
    };
    _wechat.prototype.bannerAd_hide = function () {
        if (this.bannerAd) {
            this.bannerAd.hide();
            this.initBannerAd();
        }
    };
    _wechat.prototype.initVideoAd = function () {
        var _this = this;
        //@ts-ignore
        if (wx.createRewardedVideoAd) {
            return;
        }
        //@ts-ignore
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: this.videoId,
            multiton: false
        });
        this.videoAd.onClose(function (res) {
            if (res && res.isEnded) {
                _this.onVideoAdCallBack(true);
            }
            else {
                _this.onVideoAdCallBack(false);
            }
        });
        this.videoAd.onError(function (err) {
            switch (err.errCode) {
                case 1000:
                    console.warn(TAG, "\u540E\u7AEF\u63A5\u53E3\u8C03\u7528\u5931\u8D25");
                    break;
                case 1001:
                    console.warn(TAG, "\u53C2\u6570\u9519\u8BEF");
                    break;
                case 1002:
                    console.warn(TAG, "\u5E7F\u544A\u5355\u5143\u65E0\u6548");
                    break;
                case 1003:
                    console.warn(TAG, "\u5185\u90E8\u9519\u8BEF");
                    break;
                case 1004:
                    console.warn(TAG, "\u65E0\u5408\u9002\u7684\u5E7F\u544A");
                    break;
                case 1005:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u5BA1\u6838\u4E2D");
                    break;
                case 1006:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u88AB\u9A73\u56DE");
                    break;
                case 1007:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u88AB\u5C01\u7981");
                    break;
                case 1008:
                    console.warn(TAG, "\u5E7F\u544A\u5355\u5143\u5DF2\u5173\u95ED");
                    break;
            }
        });
        this.videoAd.onLoad(function (res) {
            _this.videoAd.show();
        });
        this.videoAd.load();
    };
    _wechat.prototype.videoAd_show = function (onVideoCall) {
        this.onVideoAdCallBack = onVideoCall;
        this.videoAd != null ? this.videoAd.load() : this.initVideoAd();
    };
    _wechat.prototype.insterAd_show = function () {
        var time = new Date().getTime();
        if (time - this.insertAdTime < 30000) {
            console.log(TAG, '广告冷却中...');
            return;
        }
        this.insertAdTime = time;
        //@ts-ignore
        var interstitialAd = tt.createInterstitialAd({
            adUnitId: this.insertId
        });
        interstitialAd.onError(function (err) {
            switch (err.errCode) {
                case 1000:
                    console.warn(TAG, "\u540E\u7AEF\u63A5\u53E3\u8C03\u7528\u5931\u8D25");
                    break;
                case 1001:
                    console.warn(TAG, "\u53C2\u6570\u9519\u8BEF");
                    break;
                case 1002:
                    console.warn(TAG, "\u5E7F\u544A\u5355\u5143\u65E0\u6548");
                    break;
                case 1003:
                    console.warn(TAG, "\u5185\u90E8\u9519\u8BEF");
                    break;
                case 1004:
                    console.warn(TAG, "\u65E0\u5408\u9002\u7684\u5E7F\u544A");
                    break;
                case 1005:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u5BA1\u6838\u4E2D");
                    break;
                case 1006:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u88AB\u9A73\u56DE");
                    break;
                case 1007:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u88AB\u5C01\u7981");
                    break;
                case 1008:
                    console.warn(TAG, "\u5E7F\u544A\u5355\u5143\u5DF2\u5173\u95ED");
                    break;
            }
        });
        interstitialAd.onClose(function () {
            interstitialAd.destroy();
        });
        interstitialAd.load().then(function () {
            interstitialAd.show();
        });
    };
    _wechat.Instance = null;
    return _wechat;
}());
exports.ch_wechat = _wechat;

cc._RF.pop();