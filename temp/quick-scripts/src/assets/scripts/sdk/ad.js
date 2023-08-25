"use strict";
cc._RF.push(module, 'b526cnt/yNC3IcjXoisdWGD', 'ad');
// scripts/sdk/ad.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ad = void 0;
var _bytedance_1 = require("./_bytedance");
var _oppo_1 = require("./_oppo");
var _qq_1 = require("./_qq");
var _vivo_1 = require("./_vivo");
var _wechat_1 = require("./_wechat");
/**
 * Cocos 渠道SDK
 */
var ad;
(function (ad) {
    var config_ad = {
        debug: {
            appId: 'tt7122079fee087a2f',
            insertId: '46gg1wmm5wn9a0hnl6',
            bannerId: '4k01dbg4af515jmkma',
            videoId: 'c7d8376i18ilhg6da9',
            nativeId: '',
            shareDesc: ['游戏名称', '分享文案'],
            appBoxId: ''
        },
        bytedance_mini_game: {
            appId: 'ttd216a4ab4d2e0a1102',
            insertId: 'n155ma1guj1wo5_qqpa',
            bannerId: '4sepo8dhjqd16by8m7',
            videoId: '15901id1e0k96m4d4e',
            shareDesc: ['末日小英雄', '一起来拯救世界吧！'],
        },
        wechat: {
            appId: '',
            insertId: '',
            bannerId: '',
            videoId: '',
            nativeId: '',
            shareDesc: [],
            appBoxId: ''
        },
        oppo_play: {
            appId: '',
            insertId: '',
            bannerId: '',
            videoId: '',
            nativeId: '',
            shareDesc: [],
            appBoxId: ''
        },
        vivo_play: {
            appId: '',
            insertId: '',
            bannerId: '',
            videoId: '',
            nativeId: '',
            shareDesc: [],
            appBoxId: ''
        },
        qq_play: {
            appId: '',
            insertId: '',
            bannerId: '',
            videoId: '',
            nativeId: '',
            shareDesc: [],
            appBoxId: ''
        }
    };
    /**
    当前平台。*/
    var channel = cc.sys.platform;
    /**
    跳过广告播放*/
    var PASS_AD = true;
    /**
     * 初始化SDK
     * @param passAd 跳过播放广告的过程
     */
    function init(passAd) {
        if (passAd === void 0) { passAd = false; }
        PASS_AD = passAd;
        switch (channel) {
            // case cc.sys.WECHAT_GAME:
            //     if (CC_BUILD && CC_DEBUG) {
            //         ch_wechat.getInstance().initAdParams(config_ad.debug);
            //     }
            //     if (CC_BUILD && !CC_DEBUG) {
            //         ch_wechat.getInstance().initAdParams(config_ad.wechat);
            //     }
            //     break;
            // case cc.sys.BYTEDANCE_GAME:
            //     if (CC_BUILD && CC_DEBUG) {
            //         ch_bytedance.getInstance().initAdParams(config_ad.debug);
            //     }
            //     if (CC_BUILD && !CC_DEBUG) {
            //         ch_bytedance.getInstance().initAdParams(config_ad.bytedance_mini_game);
            //     }
            //     break;
            // case cc.sys.OPPO_GAME:
            //     if (CC_BUILD && CC_DEBUG) {
            //         ch_oppo.getInstance().initAdParams(config_ad.debug);
            //     }
            //     if (CC_BUILD && !CC_DEBUG) {
            //         ch_oppo.getInstance().initAdParams(config_ad.oppo_play);
            //     }
            //     break;
            // case cc.sys.VIVO_GAME:
            //     if (CC_BUILD && CC_DEBUG) {
            //         ch_vivo.getInstance().initAdParams(config_ad.debug);
            //     }
            //     if (CC_BUILD && !CC_DEBUG) {
            //         ch_vivo.getInstance().initAdParams(config_ad.vivo_play);
            //     }
            //     break;
            // case cc.sys.QQ_PLAY:
            //     if (CC_BUILD && CC_DEBUG) {
            //         ch_qq.getInstance().initAdParams(config_ad.debug);
            //     }
            //     if (CC_BUILD && !CC_DEBUG) {
            //         ch_qq.getInstance().initAdParams(config_ad.qq_play);
            //     }
            //     break;
            default:
                break;
        }
    }
    ad.init = init;
    ;
    /**
     * 激励视频调用
     * @returns Promise<boolean>
     */
    function video_show() {
        return new Promise(function (resolve) {
            if (PASS_AD) {
                resolve(true);
                return;
            }
            switch (channel) {
                case cc.sys.WECHAT_GAME:
                    _wechat_1.ch_wechat.getInstance().videoAd_show(resolve);
                    break;
                case cc.sys.BYTEDANCE_GAME:
                    _bytedance_1.ch_bytedance.getInstance().videoAd_show(resolve);
                    break;
                case cc.sys.OPPO_GAME:
                    _oppo_1.ch_oppo.getInstance().videoAd_show(resolve);
                    break;
                case cc.sys.VIVO_GAME:
                    _vivo_1.ch_vivo.getInstance().videoAd_show(resolve);
                    break;
                case cc.sys.QQ_PLAY:
                    _qq_1.ch_qq.getInstance().videoAd_show(resolve);
                    break;
                default:
                    resolve(true);
                    break;
            }
        });
    }
    ad.video_show = video_show;
    /**
     * 横幅展示
     * @returns void
     */
    function banner_show() {
        if (PASS_AD) {
            return;
        }
        switch (channel) {
            case cc.sys.WECHAT_GAME:
                _wechat_1.ch_wechat.getInstance().bannerAd_show();
                break;
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().bannerAd_show();
                break;
            case cc.sys.OPPO_GAME:
                _oppo_1.ch_oppo.getInstance().bannerAd_show();
                break;
            case cc.sys.VIVO_GAME:
                _vivo_1.ch_vivo.getInstance().bannerAd_show();
                break;
            case cc.sys.QQ_PLAY:
                _qq_1.ch_qq.getInstance().bannerAd_show();
                break;
            default:
                break;
        }
    }
    ad.banner_show = banner_show;
    /**
     * 横幅隐藏
     * @returns void
     */
    function banner_hide() {
        if (PASS_AD) {
            return;
        }
        switch (channel) {
            case cc.sys.WECHAT_GAME:
                _wechat_1.ch_wechat.getInstance().bannerAd_hide();
                break;
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().bannerAd_hide();
                break;
            case cc.sys.OPPO_GAME:
                _oppo_1.ch_oppo.getInstance().bannerAd_hide();
                break;
            case cc.sys.VIVO_GAME:
                _vivo_1.ch_vivo.getInstance().bannerAd_hide();
                break;
            case cc.sys.QQ_PLAY:
                _qq_1.ch_qq.getInstance().bannerAd_hide();
                break;
            default:
                break;
        }
    }
    ad.banner_hide = banner_hide;
    /**
     * 插屏展示
     * @returns void
     */
    function insert() {
        switch (channel) {
            case cc.sys.WECHAT_GAME:
                _wechat_1.ch_wechat.getInstance().insterAd_show();
                break;
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().insterAd_show();
                break;
            case cc.sys.VIVO_GAME:
                _vivo_1.ch_vivo.getInstance().insertAd_show();
                break;
            case cc.sys.QQ_PLAY:
                _qq_1.ch_qq.getInstance().insertAd_show();
                break;
            default:
                break;
        }
    }
    ad.insert = insert;
    /**
     * 展示原生广告(目前仅支持VIVO)
     * @description 使用这个API时需要自定义样式
     * @param cb 原生资源回调
     */
    function native_show(cb) {
        switch (channel) {
            case cc.sys.VIVO_GAME:
                _vivo_1.ch_vivo.getInstance().nativeAdShow(cb);
                break;
            default:
                break;
        }
    }
    ad.native_show = native_show;
    /**
     * 展示banner游戏盒子(子节跳动)
     */
    function bannerGameBox_show() {
        switch (channel) {
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().gameBanner_show();
                break;
            default:
                break;
        }
    }
    ad.bannerGameBox_show = bannerGameBox_show;
    /**
     * 隐藏banner游戏盒子(子节跳动)
     */
    function bannerGameBox_hide() {
        switch (channel) {
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().gameBanner_hide();
                break;
            default:
                break;
        }
    }
    ad.bannerGameBox_hide = bannerGameBox_hide;
    /**
     * 开始录制视频(子节跳动)
     * @param tip 显示录屏开始提示
     * @param maxSecond 最大录制时长
     * @param isMarkOpen 水印
     * @property 在游戏开始时调用录制得方法,用于录制游戏过程并分发
     */
    function record(tip, maxSecond, isMarkOpen) {
        if (tip === void 0) { tip = false; }
        if (maxSecond === void 0) { maxSecond = 300; }
        if (isMarkOpen === void 0) { isMarkOpen = false; }
        if (PASS_AD)
            return;
        switch (channel) {
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().luzhiVideo_start(tip, maxSecond, isMarkOpen);
                break;
            default:
                break;
        }
    }
    ad.record = record;
    /**
     * 结束视频录制(子节跳动)
     * @param tip 显示录屏结束提示
     */
    function recordEnd(tip) {
        if (tip === void 0) { tip = true; }
        if (PASS_AD)
            return;
        switch (channel) {
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().luzhiVideo_stop(tip);
                break;
            default:
                break;
        }
    }
    ad.recordEnd = recordEnd;
    /**
     * 分享已录制的视频(子节跳动)
     * @param OnShareCall 分享回调
     * @param query 查询字符串必须是 `key1=val1&key2=val2`
     */
    function recordShare(cb, query) {
        if (query === void 0) { query = ""; }
        if (PASS_AD) {
            cb(true);
            return;
        }
        switch (channel) {
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().luzhiVideo_share(cb, query);
                break;
            default:
                cb(true);
                break;
        }
    }
    ad.recordShare = recordShare;
    /**
     * 震动设备(短)
     */
    function shakeDevice() {
        switch (channel) {
            case cc.sys.WECHAT_GAME:
                break;
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().shakeDevice();
                break;
            case cc.sys.OPPO_GAME:
                _oppo_1.ch_oppo.getInstance().shakeDevice();
                break;
            case cc.sys.VIVO_GAME:
                _vivo_1.ch_vivo.getInstance().shakeDevice();
                break;
            case cc.sys.QQ_PLAY:
                _qq_1.ch_qq.getInstance().shakeDevice();
                break;
            default:
                break;
        }
    }
    ad.shakeDevice = shakeDevice;
    /**
     * #ch!
     * 震动设备(长)
     */
    function shakeDeviceLong() {
        switch (channel) {
            case cc.sys.WECHAT_GAME:
                break;
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().shakeDeviceLong();
                break;
            default:
                break;
        }
    }
    ad.shakeDeviceLong = shakeDeviceLong;
    /**
     * #ch!
     * 游戏非录屏分享
     * @param cb 分享回调
     * @param Protexture QQ小游戏分享图打包位置,类似: `"res/raw-assets/a0/a0100032-933c-4057-a5c4-d8d2bd9f8d0d.png"`
     * @param desTxt QQ小游戏分享文案
     */
    function share(cb, Protexture, desTxt) {
        if (Protexture === void 0) { Protexture = null; }
        if (desTxt === void 0) { desTxt = null; }
        switch (channel) {
            case cc.sys.WECHAT_GAME:
                break;
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().buttonShare(cb);
                break;
            case cc.sys.QQ_PLAY:
                _qq_1.ch_qq.getInstance().buttonShare(cb, Protexture, desTxt);
                break;
            default:
                cb(true);
                break;
        }
    }
    ad.share = share;
    /**
     * 是否展示其他游戏的内推ICON
     * @property 默认IOS端不显示更多游戏,显示端口只有抖音,头条和头条极速版
     */
    function showTTGameIcon() {
        switch (channel) {
            case cc.sys.BYTEDANCE_GAME:
                return _bytedance_1.ch_bytedance.getInstance().showTTGameIcon();
            default:
                return true;
        }
    }
    ad.showTTGameIcon = showTTGameIcon;
    /**
     * 游戏互跳列表(主要是头条)
     */
    function openMoreGame() {
        switch (channel) {
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().openMoreGame();
                break;
            default:
                break;
        }
    }
    ad.openMoreGame = openMoreGame;
    /**
     * 头条自定义触发事件
     * @param values 上报事件
     * @param object 上报参数
     */
    function reportAnalytics(values, object) {
        if (object === void 0) { object = {}; }
        switch (channel) {
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().reportAnalytics(values, object);
                break;
            default:
                break;
        }
    }
    ad.reportAnalytics = reportAnalytics;
    /**
     * 跳转关注抖音号主页(子节跳动)
     */
    function openAwemeUserProfile() {
        return new Promise(function (reslove) {
            switch (channel) {
                case cc.sys.BYTEDANCE_GAME:
                    _bytedance_1.ch_bytedance.getInstance().openAwemeUserProfile(reslove);
                    break;
                default:
                    reslove(true);
                    break;
            }
        });
    }
    ad.openAwemeUserProfile = openAwemeUserProfile;
    /**
     * 浮窗引导,调起关注小程序的引导组件(子节跳动)
     */
    function openSubscribeBanner() {
        switch (channel) {
            case cc.sys.BYTEDANCE_GAME:
                _bytedance_1.ch_bytedance.getInstance().showFavoriteGuide();
                break;
            default:
                break;
        }
    }
    ad.openSubscribeBanner = openSubscribeBanner;
    /**
     * 分包加载
     * @param nameSubpackage 子包名称
     * @param subpackOnCall  子包加载结果回调
     */
    function loadSubpackage(nameSubpackage, subpackOnCall) {
        cc.assetManager.loadBundle(nameSubpackage, function (err, bundle) {
            if (err) {
                console.log('load bundle error:', err);
                return;
            }
            subpackOnCall(bundle);
        });
    }
    ad.loadSubpackage = loadSubpackage;
})(ad = exports.ad || (exports.ad = {}));

cc._RF.pop();