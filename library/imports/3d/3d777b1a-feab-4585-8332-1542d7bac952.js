"use strict";
cc._RF.push(module, '3d777sa/qtFhYMyFULXuslS', '_bytedance');
// scripts/sdk/_bytedance.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ch_bytedance = void 0;
var TAG = '_bytedance.ts';
var _bytedance = /** @class */ (function () {
    function _bytedance() {
        this.recordTimeStamp = 0;
        this.videoPath = "";
        this.recordTimeLength = 0;
        this.appIdParam = "";
        this.bannerAdParam = "";
        this.vedioAdParam = "";
        this.insertAdParam = "";
        this.shareRecordDesc = [];
        this.bannerAd = null;
        this.videoAd = null;
        this.bannerBox = null;
        this.OnVideoCallBackListener = null;
        this.sdkInitEnd = false;
        this.insertAdTime = 0;
        this.recordManager = null;
        this.show_start = false;
        this.show_end = false;
        this.userQuery = '';
        console.log(TAG, 'init platform channel: bytedance');
    }
    _bytedance.getInstance = function () {
        if (this.Instance == null) {
            this.Instance = new _bytedance();
        }
        return this.Instance;
    };
    _bytedance.prototype.initRecordListener = function () {
        var that = this;
        //@ts-ignore
        this.recordManager = tt.getGameRecorderManager();
        this.recordManager.onStart(function () {
            that.videoPath = "";
            that.recordTimeStamp = Math.floor(new Date().getTime());
            that.showToast(that.show_start, '录制开始', 'success', 800);
        });
        this.recordManager.onError(function (err) {
            console.warn(TAG, '录屏失败:', err['errMsg']);
        });
        this.recordManager.onStop(function (res) {
            that.recordTimeLength = Math.floor(new Date().getTime()) - that.recordTimeStamp;
            if (that.recordTimeLength >= 3000) {
                that.videoPath = res['videoPath'];
                that.showToast(that.show_end, '录制完成', 'success', 1000);
            }
        });
    };
    _bytedance.prototype.luzhiVideo_start = function (startTip, maxSecond, isMarkOpen) {
        if (startTip === void 0) { startTip = false; }
        if (maxSecond === void 0) { maxSecond = 300; }
        if (isMarkOpen === void 0) { isMarkOpen = false; }
        this.show_start = startTip;
        this.recordManager.start({ duration: maxSecond, isMarkOpen: isMarkOpen });
    };
    _bytedance.prototype.luzhiVideo_stop = function (endTip) {
        if (endTip === void 0) { endTip = true; }
        this.show_end = endTip;
        this.recordManager.stop();
    };
    _bytedance.prototype.luzhiVideo_share = function (onShareCall, query) {
        if (query === void 0) { query = 'k1=v1&k2=v2'; }
        if (onShareCall == null || this.videoPath == null || this.recordTimeLength < 3000) {
            if (onShareCall == null) {
                console.warn(TAG, '分享回调为null!');
            }
            else if (this.videoPath == null) {
                console.warn(TAG, '不存在未分发的视频!');
            }
            else {
                console.warn(TAG, '录制时间小于3秒!');
            }
            return;
        }
        this.userQuery = query;
        this.video_share(onShareCall, this.userQuery);
    };
    _bytedance.prototype.video_share = function (OnShareCall, query) {
        if (query === void 0) { query = 'k1=v1&k2=v2'; }
        var that = this;
        // @ts-ignore
        tt.shareAppMessage({
            channel: "video",
            query: query,
            extra: {
                videoPath: that.videoPath,
                video_title: that.shareRecordDesc[1],
                videoTopics: [that.shareRecordDesc[0]],
                hashtag_list: [that.shareRecordDesc[0]],
                withVideoId: false,
                videoTag: '' // 分享视频的标签，可以结合获取抖音视频排行榜使用
            },
            success: function (res) {
                OnShareCall(true);
                that.videoPath = "";
                that.recordTimeLength = 0;
                that.showToast(true, '分享成功', 'success', 1000);
            },
            fail: function (e) {
                console.warn(TAG, "\u5206\u4EAB\u5931\u8D25:" + JSON.stringify(e));
                OnShareCall(false);
                that.showToast(true, '分享失败', 'fail', 1000);
            }
        });
    };
    _bytedance.prototype.getVideoInfo = function (id) {
        var _this = this;
        //@ts-ignore
        tt.request({
            url: "https://gate.ssdk.com/developer/api/get_video_info",
            method: "POST",
            data: {
                alias_ids: [id],
            },
            success: function (res) {
                if (res.data.data[0].video_info.cover_url) {
                    console.log(res.data.data[0].video_info); // 包含 cover_url，还有其它字段
                }
                else {
                    //服务端存在延迟如果获取失败则5秒后再次获取
                    setTimeout(function () {
                        _this.getVideoInfo(id);
                    }, 5000);
                }
            },
        });
    };
    /**
     * 消息提示框
     * @param show 是否弹出提示框
     * @param message 提示信息
     * @param icon (success,loading,none,fail)成功,加载,不显示图标,失败
     * @param duration 持续时间
     */
    _bytedance.prototype.showToast = function (show, message, icon, duration) {
        if (show === void 0) { show = false; }
        if (icon === void 0) { icon = 'none'; }
        if (duration === void 0) { duration = 1000; }
        if (!show) {
            return;
        }
        //@ts-ignore
        tt.showToast({
            title: message,
            icon: icon,
            duration: duration,
        });
    };
    _bytedance.prototype.buttonShare = function (OnShareCall) {
        // @ts-ignore
        tt.shareAppMessage({
            success: function () {
                OnShareCall(true);
                console.log(TAG, '分享成功!');
            },
            fail: function (e) {
                OnShareCall(false);
                console.warn(TAG, "\u5206\u4EAB\u5931\u8D25:" + JSON.stringify(e));
            }
        });
    };
    _bytedance.prototype.shakeDevice = function () {
        // @ts-ignore
        tt.vibrateShort({
            fail: function (res) {
                console.warn(TAG, "\u9707\u52A8\u5931\u8D25:" + res);
            }
        });
    };
    _bytedance.prototype.shakeDeviceLong = function () {
        // @ts-ignore
        tt.vibrateLong({
            fail: function (res) {
                console.warn(TAG, "\u9707\u52A8\u5931\u8D25:" + res);
            }
        });
    };
    _bytedance.prototype.showTTGameIcon = function () {
        //@ts-ignore
        var systemInfo = tt.getSystemInfoSync();
        if (systemInfo.platform === "ios") {
            return false;
        }
        var appName = ['Douyin', 'Toutiao', 'news_article_lite'];
        return appName.indexOf(systemInfo.appName) === -1 ? false : true;
    };
    _bytedance.prototype.openMoreGame = function () {
        //@ts-ignore
        tt.onMoreGamesModalClose(function () {
            console.warn(TAG, "modal closed!");
        });
        //@ts-ignore
        tt.onNavigateToMiniProgram(function (res) {
            console.log(res.errCode);
            console.log(res.errMsg);
        });
        //@ts-ignore
        var systemInfo = tt.getSystemInfoSync();
        // iOS 不支持，建议先检测再使用
        if (systemInfo.platform !== "ios") {
            //@ts-ignore
            tt.showMoreGamesModal({
                appLaunchOptions: [
                    {
                        appId: this.appIdParam,
                        query: "foo=bar&baz=qux",
                        extraData: {}
                    }
                    // {...}
                ],
                success: function () {
                    console.log(TAG, "success");
                },
                fail: function (res) {
                    console.log(TAG, "" + JSON.stringify(res));
                }
            });
        }
    };
    _bytedance.prototype.initAdParams = function (param) {
        if (this.sdkInitEnd) {
            return;
        }
        this.sdkInitEnd = true;
        this.initRecordListener();
        this.appIdParam = param.appId;
        this.insertAdParam = param.insertId;
        this.bannerAdParam = param.bannerId;
        this.vedioAdParam = param.videoId;
        this.shareRecordDesc = param.shareDesc;
        try {
            this.initBannerAd();
        }
        catch (error) {
            console.warn(TAG, "Init ad params:" + error);
        }
    };
    _bytedance.prototype.initGameBanner = function () {
        //@ts-ignore
        var _a = tt.getSystemInfoSync(), windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
        var bannerBoxWidth = windowWidth;
        //@ts-ignore
        this.bannerBox = tt.createMoreGamesBanner({
            style: {
                width: bannerBoxWidth,
                verticalAlign: 'bottom',
                horizontalAlign: 'center'
            },
            appLaunchOptions: [
                {
                    appId: this.appIdParam,
                    query: "foo=bar&baz=qux",
                    extraData: {}
                }
                // {...}
            ],
        });
        this.bannerBox.show();
        this.bannerBox.onTap(function () {
            console.log(TAG, "\u70B9\u51FB\u8DF3\u8F6C\u6E38\u620F\u76D2\u5B50");
        });
    };
    _bytedance.prototype.gameBanner_show = function () {
        if (this.bannerBox) {
            this.bannerBox.show();
        }
        else {
            this.initGameBanner();
        }
    };
    _bytedance.prototype.gameBanner_hide = function () {
        if (this.bannerBox) {
            this.bannerBox.hide();
        }
    };
    _bytedance.prototype.initBannerAd = function () {
        var _this = this;
        // @ts-ignore
        var _a = tt.getSystemInfoSync(), windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
        var targetBannerAdWidth = 120;
        // 创建一个居于屏幕底部正中的广告
        // @ts-ignore
        this.bannerAd = tt.createBannerAd({
            adUnitId: this.bannerAdParam,
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
                case 120002:
                    console.warn(TAG, '广告发送的次数已达当日上限');
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
    _bytedance.prototype.bannerAd_show = function () {
        if (this.bannerAd) {
            this.bannerAd.show();
        }
    };
    _bytedance.prototype.bannerAd_hide = function () {
        if (this.bannerAd) {
            this.bannerAd.hide();
            this.initBannerAd();
        }
    };
    _bytedance.prototype.showLoading = function () {
        //@ts-ignore
        tt.showLoading({ title: "请求中，请稍后..." });
    };
    _bytedance.prototype.hideLoading = function () {
        //@ts-ignore
        tt.hideLoading({});
    };
    _bytedance.prototype.initVideo = function () {
        var _this = this;
        // @ts-ignore
        this.videoAd = tt.createRewardedVideoAd({
            adUnitId: this.vedioAdParam,
            multiton: false,
            multitonRewardedMsg: '观看下一个可领取更多奖励'
        });
        this.videoAd.onError(function (err) {
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
                case 120002:
                    console.warn(TAG, '广告发送的次数已达当日上限');
                    break;
                default:
                    console.warn(TAG, "\u89C6\u9891\u5E7F\u544A\u9519\u8BEF:https://microapp._bytedance.com/docs/zh-CN/mini-game/develop/open-capacity/ads/rewarded-video-ad/rewarded-video-ad-on-error#%E9%94%99%E8%AF%AF%E7%A0%81%E8%AF%A6%E6%83%85");
                    break;
            }
        });
        this.videoAd.onClose(function (res) {
            if (res['isEnded']) {
                _this.OnVideoCallBackListener(true);
            }
            else {
                _this.OnVideoCallBackListener(false);
            }
        });
        this.videoAd.onLoad(function (res) {
            _this.videoAd.show();
            _this.hideLoading();
        });
        this.videoAd.load();
        this.showLoading();
    };
    _bytedance.prototype.videoAd_show = function (OnVideoCall) {
        this.OnVideoCallBackListener = OnVideoCall;
        if (this.videoAd != null) {
            this.showLoading();
            this.videoAd.load();
        }
        else {
            this.initVideo();
        }
    };
    _bytedance.prototype.insterAd_show = function () {
        var time = new Date().getTime();
        if (time - this.insertAdTime < 35000) {
            console.log(TAG, '广告冷却中...');
            return;
        }
        this.insertAdTime = time;
        //@ts-ignore
        var interstitialAd = tt.createInterstitialAd({
            adUnitId: this.insertAdParam
        });
        interstitialAd.onError(function (err) {
            switch (err['errCode']) {
                case 2001:
                    console.warn(TAG, '小程序启动一定时间内不允许展示插屏广告');
                    break;
                case 2002:
                    console.warn(TAG, '距离小程序插屏广告或者激励视频广告上次播放时间间隔不足，不允许展示插屏广告');
                    break;
                case 2003:
                    console.warn(TAG, '当前正在播放激励视频广告或者插屏广告，不允许再次展示插屏广告');
                    break;
                case 2004:
                    console.warn(TAG, '该项错误不是开发者的异常情况，或因小程序页面切换导致广告渲染失败');
                    break;
                case 2005:
                    console.warn(TAG, '插屏广告实例不允许跨页面调用');
                    break;
                default:
                    // 更多请参考错 误码文档 
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
    _bytedance.prototype.reportAnalytics = function (values, customObject) {
        if (customObject === void 0) { customObject = {}; }
        //@ts-ignore
        tt.reportAnalytics(values, customObject);
    };
    _bytedance.prototype.showFavoriteGuide = function () {
        //   当 type = 'bar' 时，弹出的引导是浮窗引导，浮窗引导的展现力度比气泡引导更强，用户在组件上能进行“添加”操作。
        //   展现策略：
        //   - 10s 后自动消失。
        //   - 每位用户最多触达【2 次】，最短间隔【一周】才能第二次展现。
        //@ts-ignore
        tt.showFavoriteGuide({
            type: "bar",
            content: "一键添加到「我的小程序」",
            position: "bottom",
            success: function (res) {
                console.log("引导组件展示成功", res['errMsg']);
            },
            fail: function (err) {
                console.log("引导组件展示失败", err['errMsg']);
            },
        });
    };
    _bytedance.prototype.openAwemeUserProfile = function (reslove) {
        // @ts-ignore
        tt.openAwemeUserProfile({
            success: function (res) {
                reslove(true);
            },
            fail: function (e) {
                reslove(false);
            }
        });
    };
    _bytedance.prototype.login = function () {
        //@ts-ignore
        tt.login({
            force: true,
            success: function (res) {
                console.log(TAG, '登录成功');
                _bytedance.Instance.getUserInfo();
            },
            fail: function (err) {
                console.warn(TAG, '登录失败');
            }
        });
    };
    _bytedance.prototype.getUserInfo = function () {
        //@ts-ignore
        tt.getUserInfo({
            withCredentials: false,
            success: function (res) {
                console.log(TAG, '用户信息获取成功:', res.userInfo);
            },
            fail: function (e) {
                console.warn(TAG, '用户信息获取失败:', e);
            }
        });
    };
    return _bytedance;
}());
exports.ch_bytedance = _bytedance;

cc._RF.pop();