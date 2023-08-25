
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/sdk/_bytedance.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2RrXFxfYnl0ZWRhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQztBQUM1QjtJQW9CSTtRQWxCUSxvQkFBZSxHQUFXLENBQUMsQ0FBQztRQUM1QixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUM3QixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLGlCQUFZLEdBQVcsRUFBRSxDQUFDO1FBQzFCLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBQzNCLG9CQUFlLEdBQWEsRUFBRSxDQUFDO1FBQy9CLGFBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIsWUFBTyxHQUFRLElBQUksQ0FBQztRQUNwQixjQUFTLEdBQVEsSUFBSSxDQUFDO1FBQ3RCLDRCQUF1QixHQUFhLElBQUksQ0FBQztRQUN6QyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGtCQUFhLEdBQVEsSUFBSSxDQUFDO1FBQzFCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBRTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGtDQUFrQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNhLHNCQUFXLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDcEM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNELHVDQUFrQixHQUFsQjtRQUNJLElBQUksSUFBSSxHQUFlLElBQUksQ0FBQztRQUM1QixZQUFZO1FBQ1osSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFRO1lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBUTtZQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNoRixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxRDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELHFDQUFnQixHQUFoQixVQUFpQixRQUF5QixFQUFFLFNBQXVCLEVBQUUsVUFBMkI7UUFBL0UseUJBQUEsRUFBQSxnQkFBeUI7UUFBRSwwQkFBQSxFQUFBLGVBQXVCO1FBQUUsMkJBQUEsRUFBQSxrQkFBMkI7UUFDNUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFDRCxvQ0FBZSxHQUFmLFVBQWdCLE1BQXNCO1FBQXRCLHVCQUFBLEVBQUEsYUFBc0I7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0QscUNBQWdCLEdBQWhCLFVBQWlCLFdBQXFCLEVBQUUsS0FBNkI7UUFBN0Isc0JBQUEsRUFBQSxxQkFBNkI7UUFDakUsSUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLEVBQUU7WUFDL0UsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO2dCQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUNuQztpQkFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUNuQztpQkFDSTtnQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUNsQztZQUNELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsZ0NBQVcsR0FBWCxVQUFZLFdBQXFCLEVBQUUsS0FBNkI7UUFBN0Isc0JBQUEsRUFBQSxxQkFBNkI7UUFDNUQsSUFBSSxJQUFJLEdBQWUsSUFBSSxDQUFDO1FBQzVCLGFBQWE7UUFDYixFQUFFLENBQUMsZUFBZSxDQUFDO1lBQ2YsT0FBTyxFQUFFLE9BQU87WUFDaEIsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUU7Z0JBQ0gsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixRQUFRLEVBQUUsRUFBRSxDQUFTLDBCQUEwQjthQUNsRDtZQUNELE9BQU8sRUFBUCxVQUFRLEdBQVE7Z0JBQ1osV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsSUFBSSxFQUFKLFVBQUssQ0FBTTtnQkFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSw4QkFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBRyxDQUFDLENBQUM7Z0JBQy9DLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQyxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELGlDQUFZLEdBQVosVUFBYSxFQUFVO1FBQXZCLGlCQW1CQztRQWxCRyxZQUFZO1FBQ1osRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNQLEdBQUcsRUFBRSxvREFBb0Q7WUFDekQsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsT0FBTyxFQUFFLFVBQUMsR0FBUTtnQkFDZCxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7b0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7aUJBQ25FO3FCQUFNO29CQUNILHVCQUF1QjtvQkFDdkIsVUFBVSxDQUFDO3dCQUNQLEtBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzFCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDWjtZQUNMLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0gsOEJBQVMsR0FBVCxVQUFVLElBQXFCLEVBQUUsT0FBZSxFQUFFLElBQXFCLEVBQUUsUUFBdUI7UUFBdEYscUJBQUEsRUFBQSxZQUFxQjtRQUFtQixxQkFBQSxFQUFBLGFBQXFCO1FBQUUseUJBQUEsRUFBQSxlQUF1QjtRQUM1RixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsT0FBTztTQUNWO1FBQ0QsWUFBWTtRQUNaLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDVCxLQUFLLEVBQUUsT0FBTztZQUNkLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLFFBQVE7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELGdDQUFXLEdBQVgsVUFBWSxXQUFxQjtRQUM3QixhQUFhO1FBQ2IsRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUNmLE9BQU87Z0JBQ0gsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBQ0QsSUFBSSxFQUFKLFVBQUssQ0FBUztnQkFDVixXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLDhCQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFHLENBQUMsQ0FBQztZQUNuRCxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELGdDQUFXLEdBQVg7UUFDSSxhQUFhO1FBQ2IsRUFBRSxDQUFDLFlBQVksQ0FBQztZQUNaLElBQUksRUFBSixVQUFLLEdBQVc7Z0JBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsOEJBQVEsR0FBSyxDQUFDLENBQUM7WUFDckMsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxvQ0FBZSxHQUFmO1FBQ0ksYUFBYTtRQUNiLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDWCxJQUFJLEVBQUosVUFBSyxHQUFXO2dCQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLDhCQUFRLEdBQUssQ0FBQyxDQUFDO1lBQ3JDLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsbUNBQWMsR0FBZDtRQUNJLFlBQVk7UUFDWixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQy9CLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxPQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixDQUFDLENBQUM7UUFDbkUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDckUsQ0FBQztJQUNELGlDQUFZLEdBQVo7UUFDSSxZQUFZO1FBQ1osRUFBRSxDQUFDLHFCQUFxQixDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsWUFBWTtRQUNaLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLEdBQUc7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDSCxZQUFZO1FBQ1osSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUMsbUJBQW1CO1FBQ25CLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7WUFDL0IsWUFBWTtZQUNaLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDbEIsZ0JBQWdCLEVBQUU7b0JBQ2Q7d0JBQ0ksS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVO3dCQUN0QixLQUFLLEVBQUUsaUJBQWlCO3dCQUN4QixTQUFTLEVBQUUsRUFBRTtxQkFDaEI7b0JBQ0QsUUFBUTtpQkFDWDtnQkFDRCxPQUFPO29CQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO2dCQUNELElBQUksRUFBSixVQUFLLEdBQVE7b0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUM7Z0JBQy9DLENBQUM7YUFDSixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDRCxpQ0FBWSxHQUFaLFVBQWEsS0FBWTtRQUNyQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN2QyxJQUFJO1lBQ0EsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxvQkFBa0IsS0FBTyxDQUFDLENBQUM7U0FDaEQ7SUFDTCxDQUFDO0lBQ0QsbUNBQWMsR0FBZDtRQUNJLFlBQVk7UUFDTixJQUFBLEtBQWdDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFwRCxXQUFXLGlCQUFBLEVBQUUsWUFBWSxrQkFBMkIsQ0FBQztRQUM3RCxJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUM7UUFDakMsWUFBWTtRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1lBQ3RDLEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsY0FBYztnQkFDckIsYUFBYSxFQUFFLFFBQVE7Z0JBQ3ZCLGVBQWUsRUFBRSxRQUFRO2FBQzVCO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2Q7b0JBQ0ksS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVO29CQUN0QixLQUFLLEVBQUUsaUJBQWlCO29CQUN4QixTQUFTLEVBQUUsRUFBRTtpQkFDaEI7Z0JBQ0QsUUFBUTthQUNYO1NBQ0osQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxrREFBVSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Qsb0NBQWUsR0FBZjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO2FBQU07WUFDSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBQ0Qsb0NBQWUsR0FBZjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUNELGlDQUFZLEdBQVo7UUFBQSxpQkFrRUM7UUFqRUcsYUFBYTtRQUNQLElBQUEsS0FBZ0MsRUFBRSxDQUFDLGlCQUFpQixFQUFFLEVBQXBELFdBQVcsaUJBQUEsRUFBRSxZQUFZLGtCQUEyQixDQUFDO1FBQzdELElBQUksbUJBQW1CLEdBQUcsR0FBRyxDQUFDO1FBQzlCLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUM1QixLQUFLLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsR0FBRyxFQUFFLFlBQVksR0FBRyxDQUFDLG1CQUFtQixHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDckQ7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQVE7WUFDM0IsUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3BCLEtBQUssSUFBSTtvQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDOUIsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1QixNQUFNO2dCQUNWLEtBQUssSUFBSTtvQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDMUIsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztvQkFDcEMsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztvQkFDcEMsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzdCLE1BQU07Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM3QixNQUFNO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDbkMsTUFBTTtnQkFDVjtvQkFDSSxNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILG1CQUFtQjtRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkUsYUFBYTtRQUNiLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFDLElBQVM7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDckMsT0FBTzthQUNWO1lBQ0Qsc0NBQXNDO1lBQ3RDLElBQUksbUJBQW1CLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDbkMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDakMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0Q7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILDRCQUE0QjtRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxrQ0FBYSxHQUFiO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFDRCxrQ0FBYSxHQUFiO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0QsZ0NBQVcsR0FBWDtRQUNJLFlBQVk7UUFDWixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELGdDQUFXLEdBQVg7UUFDSSxZQUFZO1FBQ1osRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsOEJBQVMsR0FBVDtRQUFBLGlCQXNEQztRQXJERyxhQUFhO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMscUJBQXFCLENBQUM7WUFDcEMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQzNCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsbUJBQW1CLEVBQUUsY0FBYztTQUN0QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQVE7WUFDMUIsUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3BCLEtBQUssSUFBSTtvQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDOUIsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM1QixNQUFNO2dCQUNWLEtBQUssSUFBSTtvQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDMUIsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztvQkFDcEMsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztvQkFDcEMsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzdCLE1BQU07Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM3QixNQUFNO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDbkMsTUFBTTtnQkFDVjtvQkFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxnTkFBa0wsQ0FBQyxDQUFDO29CQUN0TSxNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBUTtZQUMxQixJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDaEIsS0FBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNILEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2QztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFRO1lBQ3pCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELGlDQUFZLEdBQVosVUFBYSxXQUFxQjtRQUM5QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsV0FBVyxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdkI7YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtJQUNMLENBQUM7SUFDRCxrQ0FBYSxHQUFiO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssRUFBRTtZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixZQUFZO1FBQ1osSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYTtTQUMvQixDQUFDLENBQUM7UUFDSCxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBUTtZQUM1QixRQUFRLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDcEIsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUM7b0JBQ3pDLE1BQU07Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLHVDQUF1QyxDQUFDLENBQUM7b0JBQzNELE1BQU07Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7b0JBQ3BELE1BQU07Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGtDQUFrQyxDQUFDLENBQUM7b0JBQ3RELE1BQU07Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQ3BDLE1BQU07Z0JBQ1Y7b0JBQ0ksZUFBZTtvQkFDZixNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFDbkIsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztZQUN2QixjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0Qsb0NBQWUsR0FBZixVQUFnQixNQUFxQixFQUFFLFlBQXlCO1FBQXpCLDZCQUFBLEVBQUEsaUJBQXlCO1FBQzVELFlBQVk7UUFDWixFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0Qsc0NBQWlCLEdBQWpCO1FBQ0ksa0VBQWtFO1FBQ2xFLFVBQVU7UUFDVixpQkFBaUI7UUFDakIscUNBQXFDO1FBQ3JDLFlBQVk7UUFDWixFQUFFLENBQUMsaUJBQWlCLENBQUM7WUFDakIsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPLEVBQUUsY0FBYztZQUN2QixRQUFRLEVBQUUsUUFBUTtZQUNsQixPQUFPLEVBQVAsVUFBUSxHQUFRO2dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFDRCxJQUFJLEVBQUosVUFBSyxHQUFRO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNDLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QseUNBQW9CLEdBQXBCLFVBQXFCLE9BQWlCO1FBQ2xDLGFBQWE7UUFDYixFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDcEIsT0FBTyxFQUFQLFVBQVEsR0FBVztnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUNELElBQUksRUFBSixVQUFLLENBQVM7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsMEJBQUssR0FBTDtRQUNJLFlBQVk7UUFDWixFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ0wsS0FBSyxFQUFFLElBQUk7WUFDWCxPQUFPLEVBQVAsVUFBUSxHQUFRO2dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QixVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3RDLENBQUM7WUFDRCxJQUFJLEVBQUosVUFBSyxHQUFRO2dCQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsZ0NBQVcsR0FBWDtRQUNJLFlBQVk7UUFDWixFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ1gsZUFBZSxFQUFFLEtBQUs7WUFDdEIsT0FBTyxFQUFQLFVBQVEsR0FBUTtnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFDRCxJQUFJLEVBQUosVUFBSyxDQUFNO2dCQUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxDQUFDO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0EvZkEsQUErZkMsSUFBQTtBQUNZLFFBQUEsWUFBWSxHQUFHLFVBQVUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBhcmFtIH0gZnJvbSBcIi4vdHlwZVwiO1xuY29uc3QgVEFHID0gJ19ieXRlZGFuY2UudHMnO1xuY2xhc3MgX2J5dGVkYW5jZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgSW5zdGFuY2U6IF9ieXRlZGFuY2U7XG4gICAgcHJpdmF0ZSByZWNvcmRUaW1lU3RhbXA6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSB2aWRlb1BhdGg6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSByZWNvcmRUaW1lTGVuZ3RoOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgYXBwSWRQYXJhbTogc3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIGJhbm5lckFkUGFyYW06IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSB2ZWRpb0FkUGFyYW06IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBpbnNlcnRBZFBhcmFtOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgc2hhcmVSZWNvcmREZXNjOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByaXZhdGUgYmFubmVyQWQ6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSB2aWRlb0FkOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgYmFubmVyQm94OiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgT25WaWRlb0NhbGxCYWNrTGlzdGVuZXI6IEZ1bmN0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIHNka0luaXRFbmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGluc2VydEFkVGltZTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHJlY29yZE1hbmFnZXI6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBzaG93X3N0YXJ0OiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBzaG93X2VuZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgdXNlclF1ZXJ5OiBzdHJpbmcgPSAnJztcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhUQUcsICdpbml0IHBsYXRmb3JtIGNoYW5uZWw6IGJ5dGVkYW5jZScpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IF9ieXRlZGFuY2Uge1xuICAgICAgICBpZiAodGhpcy5JbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLkluc3RhbmNlID0gbmV3IF9ieXRlZGFuY2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5JbnN0YW5jZTtcbiAgICB9XG4gICAgaW5pdFJlY29yZExpc3RlbmVyKCkge1xuICAgICAgICBsZXQgdGhhdDogX2J5dGVkYW5jZSA9IHRoaXM7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnJlY29yZE1hbmFnZXIgPSB0dC5nZXRHYW1lUmVjb3JkZXJNYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMucmVjb3JkTWFuYWdlci5vblN0YXJ0KCgpID0+IHtcbiAgICAgICAgICAgIHRoYXQudmlkZW9QYXRoID0gXCJcIjtcbiAgICAgICAgICAgIHRoYXQucmVjb3JkVGltZVN0YW1wID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgICAgICAgICB0aGF0LnNob3dUb2FzdCh0aGF0LnNob3dfc3RhcnQsICflvZXliLblvIDlp4snLCAnc3VjY2VzcycsIDgwMCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlY29yZE1hbmFnZXIub25FcnJvcigoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICflvZXlsY/lpLHotKU6JywgZXJyWydlcnJNc2cnXSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlY29yZE1hbmFnZXIub25TdG9wKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhhdC5yZWNvcmRUaW1lTGVuZ3RoID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLSB0aGF0LnJlY29yZFRpbWVTdGFtcDtcbiAgICAgICAgICAgIGlmICh0aGF0LnJlY29yZFRpbWVMZW5ndGggPj0gMzAwMCkge1xuICAgICAgICAgICAgICAgIHRoYXQudmlkZW9QYXRoID0gcmVzWyd2aWRlb1BhdGgnXTtcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dUb2FzdCh0aGF0LnNob3dfZW5kLCAn5b2V5Yi25a6M5oiQJywgJ3N1Y2Nlc3MnLCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGx1emhpVmlkZW9fc3RhcnQoc3RhcnRUaXA6IGJvb2xlYW4gPSBmYWxzZSwgbWF4U2Vjb25kOiBudW1iZXIgPSAzMDAsIGlzTWFya09wZW46IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICB0aGlzLnNob3dfc3RhcnQgPSBzdGFydFRpcDtcbiAgICAgICAgdGhpcy5yZWNvcmRNYW5hZ2VyLnN0YXJ0KHsgZHVyYXRpb246IG1heFNlY29uZCwgaXNNYXJrT3BlbjogaXNNYXJrT3BlbiB9KTtcbiAgICB9XG4gICAgbHV6aGlWaWRlb19zdG9wKGVuZFRpcDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5zaG93X2VuZCA9IGVuZFRpcDtcbiAgICAgICAgdGhpcy5yZWNvcmRNYW5hZ2VyLnN0b3AoKTtcbiAgICB9XG4gICAgbHV6aGlWaWRlb19zaGFyZShvblNoYXJlQ2FsbDogRnVuY3Rpb24sIHF1ZXJ5OiBzdHJpbmcgPSAnazE9djEmazI9djInKSB7XG4gICAgICAgIGlmIChvblNoYXJlQ2FsbCA9PSBudWxsIHx8IHRoaXMudmlkZW9QYXRoID09IG51bGwgfHwgdGhpcy5yZWNvcmRUaW1lTGVuZ3RoIDwgMzAwMCkge1xuICAgICAgICAgICAgaWYgKG9uU2hhcmVDYWxsID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5YiG5Lqr5Zue6LCD5Li6bnVsbCEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudmlkZW9QYXRoID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5LiN5a2Y5Zyo5pyq5YiG5Y+R55qE6KeG6aKRIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+W9leWItuaXtumXtOWwj+S6jjPnp5IhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51c2VyUXVlcnkgPSBxdWVyeTtcbiAgICAgICAgdGhpcy52aWRlb19zaGFyZShvblNoYXJlQ2FsbCwgdGhpcy51c2VyUXVlcnkpO1xuICAgIH1cbiAgICB2aWRlb19zaGFyZShPblNoYXJlQ2FsbDogRnVuY3Rpb24sIHF1ZXJ5OiBzdHJpbmcgPSAnazE9djEmazI9djInKSB7XG4gICAgICAgIGxldCB0aGF0OiBfYnl0ZWRhbmNlID0gdGhpcztcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgY2hhbm5lbDogXCJ2aWRlb1wiLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgZXh0cmE6IHtcbiAgICAgICAgICAgICAgICB2aWRlb1BhdGg6IHRoYXQudmlkZW9QYXRoLFxuICAgICAgICAgICAgICAgIHZpZGVvX3RpdGxlOiB0aGF0LnNoYXJlUmVjb3JkRGVzY1sxXSwgICAgIC8vIOeUn+aIkOi+k+WFpeeahOm7mOiupOaWh+ahiFxuICAgICAgICAgICAgICAgIHZpZGVvVG9waWNzOiBbdGhhdC5zaGFyZVJlY29yZERlc2NbMF1dLCAgIC8vIOinhumikeivnemimCjku4Xmipbpn7PmlK/mjIEpXG4gICAgICAgICAgICAgICAgaGFzaHRhZ19saXN0OiBbdGhhdC5zaGFyZVJlY29yZERlc2NbMF1dLCAgLy8g6KeG6aKR6K+d6aKYKOS7heaKlumfs+aUr+aMgSlcbiAgICAgICAgICAgICAgICB3aXRoVmlkZW9JZDogZmFsc2UsICAvLyDmmK/lkKbmlK/mjIHot7PovazliLDmkq3mlL7pobXvvIwg5Lul5Y+K5pSv5oyB6I635Y+W6KeG6aKR5L+h5oGv562J5o6l5Y+jIO+8iOS4uiB0cnVlIOaXtuS8muWcqCBzdWNjZXNzIOWbnuiwg+S4reW4puS4iiB2aWRlb0lk77yJXG4gICAgICAgICAgICAgICAgdmlkZW9UYWc6ICcnICAgICAgICAgLy8g5YiG5Lqr6KeG6aKR55qE5qCH562+77yM5Y+v5Lul57uT5ZCI6I635Y+W5oqW6Z+z6KeG6aKR5o6S6KGM5qac5L2/55SoXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICAgICAgICAgIE9uU2hhcmVDYWxsKHRydWUpO1xuICAgICAgICAgICAgICAgIHRoYXQudmlkZW9QYXRoID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGF0LnJlY29yZFRpbWVMZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIHRoYXQuc2hvd1RvYXN0KHRydWUsICfliIbkuqvmiJDlip8nLCAnc3VjY2VzcycsIDEwMDApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWwoZTogYW55KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgYOWIhuS6q+Wksei0pToke0pTT04uc3RyaW5naWZ5KGUpfWApO1xuICAgICAgICAgICAgICAgIE9uU2hhcmVDYWxsKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dUb2FzdCh0cnVlLCAn5YiG5Lqr5aSx6LSlJywgJ2ZhaWwnLCAxMDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFZpZGVvSW5mbyhpZDogc3RyaW5nKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0dC5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogXCJodHRwczovL2dhdGUuc3Nkay5jb20vZGV2ZWxvcGVyL2FwaS9nZXRfdmlkZW9faW5mb1wiLFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBhbGlhc19pZHM6IFtpZF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmRhdGFbMF0udmlkZW9faW5mby5jb3Zlcl91cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEuZGF0YVswXS52aWRlb19pbmZvKTsgLy8g5YyF5ZCrIGNvdmVyX3VybO+8jOi/mOacieWFtuWug+Wtl+autVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5pyN5Yqh56uv5a2Y5Zyo5bu26L+f5aaC5p6c6I635Y+W5aSx6LSl5YiZNeenkuWQjuWGjeasoeiOt+WPllxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VmlkZW9JbmZvKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOa2iOaBr+aPkOekuuahhlxuICAgICAqIEBwYXJhbSBzaG93IOaYr+WQpuW8ueWHuuaPkOekuuahhlxuICAgICAqIEBwYXJhbSBtZXNzYWdlIOaPkOekuuS/oeaBr1xuICAgICAqIEBwYXJhbSBpY29uIChzdWNjZXNzLGxvYWRpbmcsbm9uZSxmYWlsKeaIkOWKnyzliqDovb0s5LiN5pi+56S65Zu+5qCHLOWksei0pVxuICAgICAqIEBwYXJhbSBkdXJhdGlvbiDmjIHnu63ml7bpl7RcbiAgICAgKi9cbiAgICBzaG93VG9hc3Qoc2hvdzogYm9vbGVhbiA9IGZhbHNlLCBtZXNzYWdlOiBzdHJpbmcsIGljb246IHN0cmluZyA9ICdub25lJywgZHVyYXRpb246IG51bWJlciA9IDEwMDApIHtcbiAgICAgICAgaWYgKCFzaG93KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHR0LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogbWVzc2FnZSxcbiAgICAgICAgICAgIGljb246IGljb24sXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBidXR0b25TaGFyZShPblNoYXJlQ2FsbDogRnVuY3Rpb24pIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0dC5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICBPblNoYXJlQ2FsbCh0cnVlKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsICfliIbkuqvmiJDlip8hJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbChlOiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBPblNoYXJlQ2FsbChmYWxzZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgYOWIhuS6q+Wksei0pToke0pTT04uc3RyaW5naWZ5KGUpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2hha2VEZXZpY2UoKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdHQudmlicmF0ZVNob3J0KHtcbiAgICAgICAgICAgIGZhaWwocmVzOiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBg6ZyH5Yqo5aSx6LSlOiR7cmVzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2hha2VEZXZpY2VMb25nKCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHR0LnZpYnJhdGVMb25nKHtcbiAgICAgICAgICAgIGZhaWwocmVzOiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBg6ZyH5Yqo5aSx6LSlOiR7cmVzfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2hvd1RUR2FtZUljb24oKTogYm9vbGVhbiB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBzeXN0ZW1JbmZvID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgaWYgKHN5c3RlbUluZm8ucGxhdGZvcm0gPT09IFwiaW9zXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYXBwTmFtZTogc3RyaW5nW10gPSBbJ0RvdXlpbicsICdUb3V0aWFvJywgJ25ld3NfYXJ0aWNsZV9saXRlJ107XG4gICAgICAgIHJldHVybiBhcHBOYW1lLmluZGV4T2Yoc3lzdGVtSW5mby5hcHBOYW1lKSA9PT0gLTEgPyBmYWxzZSA6IHRydWU7XG4gICAgfVxuICAgIG9wZW5Nb3JlR2FtZSgpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHR0Lm9uTW9yZUdhbWVzTW9kYWxDbG9zZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBcIm1vZGFsIGNsb3NlZCFcIik7XG4gICAgICAgIH0pO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdHQub25OYXZpZ2F0ZVRvTWluaVByb2dyYW0oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyckNvZGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZyk7XG4gICAgICAgIH0pO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgY29uc3Qgc3lzdGVtSW5mbyA9IHR0LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAgIC8vIGlPUyDkuI3mlK/mjIHvvIzlu7rorq7lhYjmo4DmtYvlho3kvb/nlKhcbiAgICAgICAgaWYgKHN5c3RlbUluZm8ucGxhdGZvcm0gIT09IFwiaW9zXCIpIHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgdHQuc2hvd01vcmVHYW1lc01vZGFsKHtcbiAgICAgICAgICAgICAgICBhcHBMYXVuY2hPcHRpb25zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcElkOiB0aGlzLmFwcElkUGFyYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeTogXCJmb289YmFyJmJhej1xdXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhRGF0YToge31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB7Li4ufVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCBgc3VjY2Vzc2ApO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbChyZXM6IGFueSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsIGAke0pTT04uc3RyaW5naWZ5KHJlcyl9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdEFkUGFyYW1zKHBhcmFtOiBwYXJhbSkge1xuICAgICAgICBpZiAodGhpcy5zZGtJbml0RW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZGtJbml0RW5kID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbml0UmVjb3JkTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5hcHBJZFBhcmFtID0gcGFyYW0uYXBwSWQ7XG4gICAgICAgIHRoaXMuaW5zZXJ0QWRQYXJhbSA9IHBhcmFtLmluc2VydElkO1xuICAgICAgICB0aGlzLmJhbm5lckFkUGFyYW0gPSBwYXJhbS5iYW5uZXJJZDtcbiAgICAgICAgdGhpcy52ZWRpb0FkUGFyYW0gPSBwYXJhbS52aWRlb0lkO1xuICAgICAgICB0aGlzLnNoYXJlUmVjb3JkRGVzYyA9IHBhcmFtLnNoYXJlRGVzYztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEJhbm5lckFkKCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBgSW5pdCBhZCBwYXJhbXM6JHtlcnJvcn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0R2FtZUJhbm5lcigpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHsgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCB9ID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgdmFyIGJhbm5lckJveFdpZHRoID0gd2luZG93V2lkdGg7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmJhbm5lckJveCA9IHR0LmNyZWF0ZU1vcmVHYW1lc0Jhbm5lcih7XG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBiYW5uZXJCb3hXaWR0aCxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICBob3Jpem9udGFsQWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXBwTGF1bmNoT3B0aW9uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwSWQ6IHRoaXMuYXBwSWRQYXJhbSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IFwiZm9vPWJhciZiYXo9cXV4XCIsXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhRGF0YToge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gey4uLn1cbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYmFubmVyQm94LnNob3coKTtcbiAgICAgICAgdGhpcy5iYW5uZXJCb3gub25UYXAoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCBg54K55Ye76Lez6L2s5ri45oiP55uS5a2QYCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnYW1lQmFubmVyX3Nob3coKSB7XG4gICAgICAgIGlmICh0aGlzLmJhbm5lckJveCkge1xuICAgICAgICAgICAgdGhpcy5iYW5uZXJCb3guc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbml0R2FtZUJhbm5lcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdhbWVCYW5uZXJfaGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFubmVyQm94KSB7XG4gICAgICAgICAgICB0aGlzLmJhbm5lckJveC5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdEJhbm5lckFkKCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHsgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCB9ID0gdHQuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgdmFyIHRhcmdldEJhbm5lckFkV2lkdGggPSAxMjA7XG4gICAgICAgIC8vIOWIm+W7uuS4gOS4quWxheS6juWxj+W5leW6lemDqOato+S4reeahOW5v+WRilxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuYmFubmVyQWQgPSB0dC5jcmVhdGVCYW5uZXJBZCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5iYW5uZXJBZFBhcmFtLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdGFyZ2V0QmFubmVyQWRXaWR0aCxcbiAgICAgICAgICAgICAgICB0b3A6IHdpbmRvd0hlaWdodCAtICh0YXJnZXRCYW5uZXJBZFdpZHRoIC8gMTYgKiA5KSwgLy8g5qC55o2u57O757uf57qm5a6a5bC65a+46K6h566X5Ye65bm/5ZGK6auY5bqmXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJhbm5lckFkLm9uRXJyb3IoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGVyclsnZXJyQ29kZSddKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDAwOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5ZCO56uv6ZSZ6K+v6LCD55So5aSx6LSlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwMTpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+WPguaVsOmUmeivrycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICflub/lkYrljZXlhYPml6DmlYgnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDAzOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5YaF6YOo6ZSZ6K+vJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwNDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+aXoOWQiOmAgueahOW5v+WRiiwg5bCd6K+V6YeN5paw5Yqg6L29Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwNTpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+W5v+WRiuato+WcqOiiq+WuoeaguO+8jOaXoOazleWxleeOsOW5v+WRiicpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICflub/lkYrog73lipvooqvnpoHnlKgnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDA4OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5bm/5ZGK5Y2V5YWD5bey5YWz6ZetJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTIwMDAyOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5bm/5ZGK5Y+R6YCB55qE5qyh5pWw5bey6L6+5b2T5pel5LiK6ZmQJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8g5Lmf5Y+v5Lul5omL5Yqo5L+u5pS55bGe5oCn5Lul6LCD5pW05bm/5ZGK5bC65a+4XG4gICAgICAgIHRoaXMuYmFubmVyQWQuc3R5bGUubGVmdCA9ICh3aW5kb3dXaWR0aCAtIHRhcmdldEJhbm5lckFkV2lkdGgpIC8gMjtcbiAgICAgICAgLy8g5bC65a+46LCD5pW05pe25Lya6Kem5Y+R5Zue6LCDXG4gICAgICAgIC8vIOazqOaEj++8muWmguaenOWcqOWbnuiwg+mHjOWGjeasoeiwg+aVtOWwuuWvuO+8jOimgeehruS/neS4jeimgeinpuWPkeatu+W+queOr++8ge+8ge+8gVxuICAgICAgICB0aGlzLmJhbm5lckFkLm9uUmVzaXplKChzaXplOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFRBRywgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgaWYgKHNpemUud2lkdGggPT0gMCB8fCBzaXplLmhlaWdodCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5aaC5p6c5LiA5byA5aeL6K6+572u55qEIGJhbm5lciDlrr3luqbotoXov4fkuobns7vnu5/pmZDliLbvvIzlj6/ku6XlnKjmraTlpITliqDku6XosIPmlbRcbiAgICAgICAgICAgIGlmICh0YXJnZXRCYW5uZXJBZFdpZHRoICE9IHNpemUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRCYW5uZXJBZFdpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbm5lckFkLnN0eWxlLnRvcCA9IHdpbmRvd0hlaWdodCAtIChzaXplLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5zdHlsZS5sZWZ0ID0gKHdpbmRvd1dpZHRoIC0gc2l6ZS53aWR0aCkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy/lub/lkYrnu4Tku7bmiJDlip/mi4nlj5blub/lkYrntKDmnZDml7bkvJrop6blj5Fsb2Fk5LqL5Lu255qE55uR5ZCs5ZmoXG4gICAgICAgIHRoaXMuYmFubmVyQWQub25Mb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFRBRywgXCJiYW5uZXLlub/lkYrmi4nlj5blrozmiJAhXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYmFubmVyQWRfc2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFubmVyQWQpIHtcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJhbm5lckFkX2hpZGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmJhbm5lckFkKSB7XG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEJhbm5lckFkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0xvYWRpbmcoKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0dC5zaG93TG9hZGluZyh7IHRpdGxlOiBcIuivt+axguS4re+8jOivt+eojeWQji4uLlwiIH0pO1xuICAgIH1cbiAgICBoaWRlTG9hZGluZygpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHR0LmhpZGVMb2FkaW5nKHt9KTtcbiAgICB9XG4gICAgaW5pdFZpZGVvKCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMudmlkZW9BZCA9IHR0LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogdGhpcy52ZWRpb0FkUGFyYW0sXG4gICAgICAgICAgICBtdWx0aXRvbjogZmFsc2UsXG4gICAgICAgICAgICBtdWx0aXRvblJld2FyZGVkTXNnOiAn6KeC55yL5LiL5LiA5Liq5Y+v6aKG5Y+W5pu05aSa5aWW5YqxJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWRlb0FkLm9uRXJyb3IoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGVyclsnZXJyQ29kZSddKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDAwOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5ZCO56uv6ZSZ6K+v6LCD55So5aSx6LSlJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwMTpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+WPguaVsOmUmeivrycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICflub/lkYrljZXlhYPml6DmlYgnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDAzOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5YaF6YOo6ZSZ6K+vJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwNDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+aXoOWQiOmAgueahOW5v+WRiiwg5bCd6K+V6YeN5paw5Yqg6L29Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwNTpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+W5v+WRiuato+WcqOiiq+WuoeaguO+8jOaXoOazleWxleeOsOW5v+WRiicpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICflub/lkYrog73lipvooqvnpoHnlKgnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDA4OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5bm/5ZGK5Y2V5YWD5bey5YWz6ZetJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTIwMDAyOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5bm/5ZGK5Y+R6YCB55qE5qyh5pWw5bey6L6+5b2T5pel5LiK6ZmQJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGDop4bpopHlub/lkYrplJnor686aHR0cHM6Ly9taWNyb2FwcC5fYnl0ZWRhbmNlLmNvbS9kb2NzL3poLUNOL21pbmktZ2FtZS9kZXZlbG9wL29wZW4tY2FwYWNpdHkvYWRzL3Jld2FyZGVkLXZpZGVvLWFkL3Jld2FyZGVkLXZpZGVvLWFkLW9uLWVycm9yIyVFOSU5NCU5OSVFOCVBRiVBRiVFNyVBMCU4MSVFOCVBRiVBNiVFNiU4MyU4NWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlkZW9BZC5vbkNsb3NlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc1snaXNFbmRlZCddKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5PblZpZGVvQ2FsbEJhY2tMaXN0ZW5lcih0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5PblZpZGVvQ2FsbEJhY2tMaXN0ZW5lcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZGVvQWQub25Mb2FkKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWRlb0FkLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlkZW9BZC5sb2FkKCk7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcbiAgICB9XG4gICAgdmlkZW9BZF9zaG93KE9uVmlkZW9DYWxsOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLk9uVmlkZW9DYWxsQmFja0xpc3RlbmVyID0gT25WaWRlb0NhbGw7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvQWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0FkLmxvYWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5zdGVyQWRfc2hvdygpIHtcbiAgICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKHRpbWUgLSB0aGlzLmluc2VydEFkVGltZSA8IDM1MDAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsICflub/lkYrlhrfljbTkuK0uLi4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluc2VydEFkVGltZSA9IHRpbWU7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBsZXQgaW50ZXJzdGl0aWFsQWQgPSB0dC5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5pbnNlcnRBZFBhcmFtXG4gICAgICAgIH0pO1xuICAgICAgICBpbnRlcnN0aXRpYWxBZC5vbkVycm9yKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlcnJbJ2VyckNvZGUnXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMjAwMTpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+Wwj+eoi+W6j+WQr+WKqOS4gOWumuaXtumXtOWGheS4jeWFgeiuuOWxleekuuaPkuWxj+W5v+WRiicpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDIwMDI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICfot53nprvlsI/nqIvluo/mj5LlsY/lub/lkYrmiJbogIXmv4DlirHop4bpopHlub/lkYrkuIrmrKHmkq3mlL7ml7bpl7Tpl7TpmpTkuI3otrPvvIzkuI3lhYHorrjlsZXnpLrmj5LlsY/lub/lkYonKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyMDAzOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5b2T5YmN5q2j5Zyo5pKt5pS+5r+A5Yqx6KeG6aKR5bm/5ZGK5oiW6ICF5o+S5bGP5bm/5ZGK77yM5LiN5YWB6K645YaN5qyh5bGV56S65o+S5bGP5bm/5ZGKJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjAwNDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+ivpemhuemUmeivr+S4jeaYr+W8gOWPkeiAheeahOW8guW4uOaDheWGte+8jOaIluWboOWwj+eoi+W6j+mhtemdouWIh+aNouWvvOiHtOW5v+WRiua4suafk+Wksei0pScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDIwMDU6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICfmj5LlsY/lub/lkYrlrp7kvovkuI3lhYHorrjot6jpobXpnaLosIPnlKgnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy8g5pu05aSa6K+35Y+C6ICD6ZSZIOivr+eggeaWh+ahoyBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpbnRlcnN0aXRpYWxBZC5vbkNsb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGludGVyc3RpdGlhbEFkLmRlc3Ryb3koKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGludGVyc3RpdGlhbEFkLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGludGVyc3RpdGlhbEFkLnNob3coKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlcG9ydEFuYWx5dGljcyh2YWx1ZXM6IHN0cmluZyB8IG51bGwsIGN1c3RvbU9iamVjdDogT2JqZWN0ID0ge30pIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHR0LnJlcG9ydEFuYWx5dGljcyh2YWx1ZXMsIGN1c3RvbU9iamVjdCk7XG4gICAgfVxuICAgIHNob3dGYXZvcml0ZUd1aWRlKCkge1xuICAgICAgICAvLyAgIOW9kyB0eXBlID0gJ2Jhcicg5pe277yM5by55Ye655qE5byV5a+85piv5rWu56qX5byV5a+877yM5rWu56qX5byV5a+855qE5bGV546w5Yqb5bqm5q+U5rCU5rOh5byV5a+85pu05by677yM55So5oi35Zyo57uE5Lu25LiK6IO96L+b6KGM4oCc5re75Yqg4oCd5pON5L2c44CCXG4gICAgICAgIC8vICAg5bGV546w562W55Wl77yaXG4gICAgICAgIC8vICAgLSAxMHMg5ZCO6Ieq5Yqo5raI5aSx44CCXG4gICAgICAgIC8vICAgLSDmr4/kvY3nlKjmiLfmnIDlpJrop6bovr7jgJAyIOasoeOAke+8jOacgOefremXtOmalOOAkOS4gOWRqOOAkeaJjeiDveesrOS6jOasoeWxleeOsOOAglxuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdHQuc2hvd0Zhdm9yaXRlR3VpZGUoe1xuICAgICAgICAgICAgdHlwZTogXCJiYXJcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwi5LiA6ZSu5re75Yqg5Yiw44CM5oiR55qE5bCP56iL5bqP44CNXCIsXG4gICAgICAgICAgICBwb3NpdGlvbjogXCJib3R0b21cIixcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW8leWvvOe7hOS7tuWxleekuuaIkOWKn1wiLCByZXNbJ2Vyck1zZyddKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsKGVycjogYW55KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvJXlr7znu4Tku7blsZXnpLrlpLHotKVcIiwgZXJyWydlcnJNc2cnXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb3BlbkF3ZW1lVXNlclByb2ZpbGUocmVzbG92ZTogRnVuY3Rpb24pIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0dC5vcGVuQXdlbWVVc2VyUHJvZmlsZSh7XG4gICAgICAgICAgICBzdWNjZXNzKHJlczogT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmVzbG92ZSh0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsKGU6IE9iamVjdCkge1xuICAgICAgICAgICAgICAgIHJlc2xvdmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9naW4oKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0dC5sb2dpbih7XG4gICAgICAgICAgICBmb3JjZTogdHJ1ZSxcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsICfnmbvlvZXmiJDlip8nKTtcbiAgICAgICAgICAgICAgICBfYnl0ZWRhbmNlLkluc3RhbmNlLmdldFVzZXJJbmZvKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbChlcnI6IGFueSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICfnmbvlvZXlpLHotKUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFVzZXJJbmZvKCkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdHQuZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsICfnlKjmiLfkv6Hmga/ojrflj5bmiJDlip86JywgcmVzLnVzZXJJbmZvKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsKGU6IGFueSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICfnlKjmiLfkv6Hmga/ojrflj5blpLHotKU6JywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBjaF9ieXRlZGFuY2UgPSBfYnl0ZWRhbmNlOyJdfQ==