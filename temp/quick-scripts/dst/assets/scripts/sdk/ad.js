
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/sdk/ad.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2RrXFxhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBNEM7QUFDNUMsaUNBQWtDO0FBQ2xDLDZCQUE4QjtBQUM5QixpQ0FBa0M7QUFDbEMscUNBQXNDO0FBQ3RDOztHQUVHO0FBQ0gsSUFBaUIsRUFBRSxDQWtjbEI7QUFsY0QsV0FBaUIsRUFBRTtJQUNmLElBQU0sU0FBUyxHQUFXO1FBQ3RCLEtBQUssRUFBRTtZQUNILEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsUUFBUSxFQUFFLEVBQUU7WUFDWixTQUFTLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQzNCLFFBQVEsRUFBRSxFQUFFO1NBQ2Y7UUFDRCxtQkFBbUIsRUFBRTtZQUNqQixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7U0FDcEM7UUFDRCxNQUFNLEVBQUU7WUFDSixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osUUFBUSxFQUFFLEVBQUU7WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNYLFFBQVEsRUFBRSxFQUFFO1lBQ1osU0FBUyxFQUFFLEVBQUU7WUFDYixRQUFRLEVBQUUsRUFBRTtTQUNmO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxFQUFFO1lBQ1osT0FBTyxFQUFFLEVBQUU7WUFDWCxRQUFRLEVBQUUsRUFBRTtZQUNaLFNBQVMsRUFBRSxFQUFFO1lBQ2IsUUFBUSxFQUFFLEVBQUU7U0FDZjtRQUNELFNBQVMsRUFBRTtZQUNQLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEVBQUU7WUFDWixRQUFRLEVBQUUsRUFBRTtZQUNaLE9BQU8sRUFBRSxFQUFFO1lBQ1gsUUFBUSxFQUFFLEVBQUU7WUFDWixTQUFTLEVBQUUsRUFBRTtZQUNiLFFBQVEsRUFBRSxFQUFFO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osUUFBUSxFQUFFLEVBQUU7WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNYLFFBQVEsRUFBRSxFQUFFO1lBQ1osU0FBUyxFQUFFLEVBQUU7WUFDYixRQUFRLEVBQUUsRUFBRTtTQUNmO0tBQ0osQ0FBQztJQUVGO1dBQ087SUFDUCxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUNoQztZQUNRO0lBQ1IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25COzs7T0FHRztJQUNILFNBQWdCLElBQUksQ0FBQyxNQUF1QjtRQUF2Qix1QkFBQSxFQUFBLGNBQXVCO1FBQ3hDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDakIsUUFBUSxPQUFPLEVBQUU7WUFDYiwyQkFBMkI7WUFDM0Isa0NBQWtDO1lBQ2xDLGlFQUFpRTtZQUNqRSxRQUFRO1lBQ1IsbUNBQW1DO1lBQ25DLGtFQUFrRTtZQUNsRSxRQUFRO1lBQ1IsYUFBYTtZQUNiLDhCQUE4QjtZQUM5QixrQ0FBa0M7WUFDbEMsb0VBQW9FO1lBQ3BFLFFBQVE7WUFDUixtQ0FBbUM7WUFDbkMsa0ZBQWtGO1lBQ2xGLFFBQVE7WUFDUixhQUFhO1lBQ2IseUJBQXlCO1lBQ3pCLGtDQUFrQztZQUNsQywrREFBK0Q7WUFDL0QsUUFBUTtZQUNSLG1DQUFtQztZQUNuQyxtRUFBbUU7WUFDbkUsUUFBUTtZQUNSLGFBQWE7WUFDYix5QkFBeUI7WUFDekIsa0NBQWtDO1lBQ2xDLCtEQUErRDtZQUMvRCxRQUFRO1lBQ1IsbUNBQW1DO1lBQ25DLG1FQUFtRTtZQUNuRSxRQUFRO1lBQ1IsYUFBYTtZQUNiLHVCQUF1QjtZQUN2QixrQ0FBa0M7WUFDbEMsNkRBQTZEO1lBQzdELFFBQVE7WUFDUixtQ0FBbUM7WUFDbkMsK0RBQStEO1lBQy9ELFFBQVE7WUFDUixhQUFhO1lBQ2I7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQTlDZSxPQUFJLE9BOENuQixDQUFBO0lBQUEsQ0FBQztJQUNGOzs7T0FHRztJQUNILFNBQWdCLFVBQVU7UUFDdEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNkLE9BQU87YUFDVjtZQUNELFFBQVEsT0FBTyxFQUFFO2dCQUNiLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXO29CQUNuQixtQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUMsTUFBTTtnQkFDVixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYztvQkFDdEIseUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pELE1BQU07Z0JBQ1YsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVM7b0JBQ2pCLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVM7b0JBQ2pCLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1YsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU87b0JBQ2YsV0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDMUMsTUFBTTtnQkFDVjtvQkFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2QsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBM0JlLGFBQVUsYUEyQnpCLENBQUE7SUFDRDs7O09BR0c7SUFDSCxTQUFnQixXQUFXO1FBQ3ZCLElBQUksT0FBTyxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBQ0QsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVztnQkFDbkIsbUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEMsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjO2dCQUN0Qix5QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMzQyxNQUFNO1lBQ1YsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVM7Z0JBQ2pCLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDdEMsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTO2dCQUNqQixlQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3RDLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTztnQkFDZixXQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3BDLE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBdkJlLGNBQVcsY0F1QjFCLENBQUE7SUFDRDs7O09BR0c7SUFDSCxTQUFnQixXQUFXO1FBQ3ZCLElBQUksT0FBTyxFQUFFO1lBQ1QsT0FBTztTQUNWO1FBQ0QsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVztnQkFDbkIsbUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEMsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjO2dCQUN0Qix5QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMzQyxNQUFNO1lBQ1YsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVM7Z0JBQ2pCLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDdEMsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTO2dCQUNqQixlQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3RDLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTztnQkFDZixXQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3BDLE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBdkJlLGNBQVcsY0F1QjFCLENBQUE7SUFDRDs7O09BR0c7SUFDSCxTQUFnQixNQUFNO1FBQ2xCLFFBQVEsT0FBTyxFQUFFO1lBQ2IsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVc7Z0JBQ25CLG1CQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hDLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYztnQkFDdEIseUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDM0MsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTO2dCQUNqQixlQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3RDLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTztnQkFDZixXQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3BDLE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBakJlLFNBQU0sU0FpQnJCLENBQUE7SUFDRDs7OztPQUlHO0lBQ0gsU0FBZ0IsV0FBVyxDQUFDLEVBQVU7UUFDbEMsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUztnQkFDakIsZUFBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdkMsTUFBTTtZQUNWO2dCQUNJLE1BQU07U0FDYjtJQUNMLENBQUM7SUFSZSxjQUFXLGNBUTFCLENBQUE7SUFDRDs7T0FFRztJQUNILFNBQWdCLGtCQUFrQjtRQUM5QixRQUFRLE9BQU8sRUFBRTtZQUNiLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjO2dCQUN0Qix5QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUM3QyxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQVJlLHFCQUFrQixxQkFRakMsQ0FBQTtJQUNEOztPQUVHO0lBQ0gsU0FBZ0Isa0JBQWtCO1FBQzlCLFFBQVEsT0FBTyxFQUFFO1lBQ2IsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWM7Z0JBQ3RCLHlCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQzdDLE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBUmUscUJBQWtCLHFCQVFqQyxDQUFBO0lBQ0Q7Ozs7OztPQU1HO0lBQ0gsU0FBZ0IsTUFBTSxDQUFDLEdBQW9CLEVBQUUsU0FBdUIsRUFBRSxVQUEyQjtRQUExRSxvQkFBQSxFQUFBLFdBQW9CO1FBQUUsMEJBQUEsRUFBQSxlQUF1QjtRQUFFLDJCQUFBLEVBQUEsa0JBQTJCO1FBQzdGLElBQUcsT0FBTztZQUFFLE9BQU87UUFDbkIsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYztnQkFDdEIseUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN4RSxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQVRlLFNBQU0sU0FTckIsQ0FBQTtJQUNEOzs7T0FHRztJQUNILFNBQWdCLFNBQVMsQ0FBQyxHQUFtQjtRQUFuQixvQkFBQSxFQUFBLFVBQW1CO1FBQ3pDLElBQUcsT0FBTztZQUFFLE9BQU87UUFDbkIsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYztnQkFDdEIseUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hELE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBVGUsWUFBUyxZQVN4QixDQUFBO0lBQ0Q7Ozs7T0FJRztJQUNILFNBQWdCLFdBQVcsQ0FBQyxFQUFZLEVBQUUsS0FBa0I7UUFBbEIsc0JBQUEsRUFBQSxVQUFrQjtRQUN4RCxJQUFHLE9BQU8sRUFBQztZQUNQLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNULE9BQU87U0FDVjtRQUNELFFBQVEsT0FBTyxFQUFFO1lBQ2IsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWM7Z0JBQ3RCLHlCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2RCxNQUFNO1lBQ1Y7Z0JBQ0ksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNULE1BQU07U0FDYjtJQUNMLENBQUM7SUFiZSxjQUFXLGNBYTFCLENBQUE7SUFDRDs7T0FFRztJQUNILFNBQWdCLFdBQVc7UUFDdkIsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVztnQkFDbkIsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjO2dCQUN0Qix5QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN6QyxNQUFNO1lBQ1YsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVM7Z0JBQ2pCLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDcEMsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTO2dCQUNqQixlQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3BDLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTztnQkFDZixXQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2xDLE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBbkJlLGNBQVcsY0FtQjFCLENBQUE7SUFDRDs7O09BR0c7SUFDSCxTQUFnQixlQUFlO1FBQzNCLFFBQVEsT0FBTyxFQUFFO1lBQ2IsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVc7Z0JBQ25CLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYztnQkFDdEIseUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDN0MsTUFBTTtZQUNWO2dCQUNJLE1BQU07U0FDYjtJQUNMLENBQUM7SUFWZSxrQkFBZSxrQkFVOUIsQ0FBQTtJQUNEOzs7Ozs7T0FNRztJQUNILFNBQWdCLEtBQUssQ0FBQyxFQUFZLEVBQUUsVUFBZ0MsRUFBRSxNQUE0QjtRQUE5RCwyQkFBQSxFQUFBLGlCQUFnQztRQUFFLHVCQUFBLEVBQUEsYUFBNEI7UUFDOUYsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVztnQkFDbkIsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjO2dCQUN0Qix5QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDM0MsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPO2dCQUNmLFdBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDeEQsTUFBTTtZQUNWO2dCQUNJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDVCxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBZGUsUUFBSyxRQWNwQixDQUFBO0lBQ0Q7OztPQUdHO0lBQ0gsU0FBZ0IsY0FBYztRQUMxQixRQUFRLE9BQU8sRUFBRTtZQUNiLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjO2dCQUN0QixPQUFPLHlCQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkQ7Z0JBQ0ksT0FBTyxJQUFJLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBUGUsaUJBQWMsaUJBTzdCLENBQUE7SUFDRDs7T0FFRztJQUNILFNBQWdCLFlBQVk7UUFDeEIsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYztnQkFDdEIseUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDMUMsTUFBTTtZQUNWO2dCQUNJLE1BQU07U0FDYjtJQUNMLENBQUM7SUFSZSxlQUFZLGVBUTNCLENBQUE7SUFDRDs7OztPQUlHO0lBQ0gsU0FBZ0IsZUFBZSxDQUFDLE1BQXFCLEVBQUUsTUFBbUI7UUFBbkIsdUJBQUEsRUFBQSxXQUFtQjtRQUN0RSxRQUFRLE9BQU8sRUFBRTtZQUNiLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjO2dCQUN0Qix5QkFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzNELE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFDTCxDQUFDO0lBUmUsa0JBQWUsa0JBUTlCLENBQUE7SUFDRDs7T0FFRztJQUNILFNBQWdCLG9CQUFvQjtRQUNoQyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTztZQUN0QixRQUFRLE9BQU8sRUFBRTtnQkFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYztvQkFDdEIseUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekQsTUFBTTtnQkFDVjtvQkFDSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2QsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBWGUsdUJBQW9CLHVCQVduQyxDQUFBO0lBQ0Q7O09BRUc7SUFDSCxTQUFnQixtQkFBbUI7UUFDL0IsUUFBUSxPQUFPLEVBQUU7WUFDYixLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYztnQkFDdEIseUJBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUMvQyxNQUFLO1lBQ1Q7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQVJlLHNCQUFtQixzQkFRbEMsQ0FBQTtJQUNEOzs7O09BSUc7SUFDSCxTQUFnQixjQUFjLENBQUMsY0FBc0IsRUFBRSxhQUF1QjtRQUMxRSxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBTTtZQUNuRCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QyxPQUFPO2FBQ1Y7WUFDRCxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBUmUsaUJBQWMsaUJBUTdCLENBQUE7QUFDTCxDQUFDLEVBbGNnQixFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFrY2xCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlnLCBuYXRpdmUgfSBmcm9tIFwiLi90eXBlXCI7XG5pbXBvcnQgeyBjaF9ieXRlZGFuY2UgfSBmcm9tIFwiLi9fYnl0ZWRhbmNlXCI7XG5pbXBvcnQgeyBjaF9vcHBvIH0gZnJvbSBcIi4vX29wcG9cIjtcbmltcG9ydCB7IGNoX3FxIH0gZnJvbSBcIi4vX3FxXCI7XG5pbXBvcnQgeyBjaF92aXZvIH0gZnJvbSBcIi4vX3Zpdm9cIjtcbmltcG9ydCB7IGNoX3dlY2hhdCB9IGZyb20gXCIuL193ZWNoYXRcIjtcbi8qKlxuICogQ29jb3Mg5rig6YGTU0RLXG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgYWQge1xuICAgIGNvbnN0IGNvbmZpZ19hZDogY29uZmlnID0ge1xuICAgICAgICBkZWJ1Zzoge1xuICAgICAgICAgICAgYXBwSWQ6ICd0dDcxMjIwNzlmZWUwODdhMmYnLFxuICAgICAgICAgICAgaW5zZXJ0SWQ6ICc0NmdnMXdtbTV3bjlhMGhubDYnLFxuICAgICAgICAgICAgYmFubmVySWQ6ICc0azAxZGJnNGFmNTE1am1rbWEnLFxuICAgICAgICAgICAgdmlkZW9JZDogJ2M3ZDgzNzZpMThpbGhnNmRhOScsXG4gICAgICAgICAgICBuYXRpdmVJZDogJycsXG4gICAgICAgICAgICBzaGFyZURlc2M6IFsn5ri45oiP5ZCN56ewJywgJ+WIhuS6q+aWh+ahiCddLFxuICAgICAgICAgICAgYXBwQm94SWQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGJ5dGVkYW5jZV9taW5pX2dhbWU6IHtcbiAgICAgICAgICAgIGFwcElkOiAndHRkMjE2YTRhYjRkMmUwYTExMDInLFxuICAgICAgICAgICAgaW5zZXJ0SWQ6ICduMTU1bWExZ3VqMXdvNV9xcXBhJyxcbiAgICAgICAgICAgIGJhbm5lcklkOiAnNHNlcG84ZGhqcWQxNmJ5OG03JyxcbiAgICAgICAgICAgIHZpZGVvSWQ6ICcxNTkwMWlkMWUwazk2bTRkNGUnLFxuICAgICAgICAgICAgc2hhcmVEZXNjOiBbJ+acq+aXpeWwj+iLsembhCcsICfkuIDotbfmnaXmi6/mlZHkuJbnlYzlkKfvvIEnXSxcbiAgICAgICAgfSxcbiAgICAgICAgd2VjaGF0OiB7XG4gICAgICAgICAgICBhcHBJZDogJycsXG4gICAgICAgICAgICBpbnNlcnRJZDogJycsXG4gICAgICAgICAgICBiYW5uZXJJZDogJycsXG4gICAgICAgICAgICB2aWRlb0lkOiAnJyxcbiAgICAgICAgICAgIG5hdGl2ZUlkOiAnJyxcbiAgICAgICAgICAgIHNoYXJlRGVzYzogW10sXG4gICAgICAgICAgICBhcHBCb3hJZDogJydcbiAgICAgICAgfSxcbiAgICAgICAgb3Bwb19wbGF5OiB7XG4gICAgICAgICAgICBhcHBJZDogJycsXG4gICAgICAgICAgICBpbnNlcnRJZDogJycsXG4gICAgICAgICAgICBiYW5uZXJJZDogJycsXG4gICAgICAgICAgICB2aWRlb0lkOiAnJyxcbiAgICAgICAgICAgIG5hdGl2ZUlkOiAnJyxcbiAgICAgICAgICAgIHNoYXJlRGVzYzogW10sXG4gICAgICAgICAgICBhcHBCb3hJZDogJydcbiAgICAgICAgfSxcbiAgICAgICAgdml2b19wbGF5OiB7XG4gICAgICAgICAgICBhcHBJZDogJycsXG4gICAgICAgICAgICBpbnNlcnRJZDogJycsXG4gICAgICAgICAgICBiYW5uZXJJZDogJycsXG4gICAgICAgICAgICB2aWRlb0lkOiAnJyxcbiAgICAgICAgICAgIG5hdGl2ZUlkOiAnJyxcbiAgICAgICAgICAgIHNoYXJlRGVzYzogW10sXG4gICAgICAgICAgICBhcHBCb3hJZDogJydcbiAgICAgICAgfSxcbiAgICAgICAgcXFfcGxheToge1xuICAgICAgICAgICAgYXBwSWQ6ICcnLFxuICAgICAgICAgICAgaW5zZXJ0SWQ6ICcnLFxuICAgICAgICAgICAgYmFubmVySWQ6ICcnLFxuICAgICAgICAgICAgdmlkZW9JZDogJycsXG4gICAgICAgICAgICBuYXRpdmVJZDogJycsXG4gICAgICAgICAgICBzaGFyZURlc2M6IFtdLFxuICAgICAgICAgICAgYXBwQm94SWQ6ICcnXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAg5b2T5YmN5bmz5Y+w44CCKi9cbiAgICBjb25zdCBjaGFubmVsID0gY2Muc3lzLnBsYXRmb3JtO1xuICAgIC8qKlxuICAgIOi3s+i/h+W5v+WRiuaSreaUviovXG4gICAgdmFyIFBBU1NfQUQgPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIOWIneWni+WMllNES1xuICAgICAqIEBwYXJhbSBwYXNzQWQg6Lez6L+H5pKt5pS+5bm/5ZGK55qE6L+H56iLXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGluaXQocGFzc0FkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgUEFTU19BRCA9IHBhc3NBZDtcbiAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICAvLyBjYXNlIGNjLnN5cy5XRUNIQVRfR0FNRTpcbiAgICAgICAgICAgIC8vICAgICBpZiAoQ0NfQlVJTEQgJiYgQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2hfd2VjaGF0LmdldEluc3RhbmNlKCkuaW5pdEFkUGFyYW1zKGNvbmZpZ19hZC5kZWJ1Zyk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gICAgIGlmIChDQ19CVUlMRCAmJiAhQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2hfd2VjaGF0LmdldEluc3RhbmNlKCkuaW5pdEFkUGFyYW1zKGNvbmZpZ19hZC53ZWNoYXQpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGNhc2UgY2Muc3lzLkJZVEVEQU5DRV9HQU1FOlxuICAgICAgICAgICAgLy8gICAgIGlmIChDQ19CVUlMRCAmJiBDQ19ERUJVRykge1xuICAgICAgICAgICAgLy8gICAgICAgICBjaF9ieXRlZGFuY2UuZ2V0SW5zdGFuY2UoKS5pbml0QWRQYXJhbXMoY29uZmlnX2FkLmRlYnVnKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyAgICAgaWYgKENDX0JVSUxEICYmICFDQ19ERUJVRykge1xuICAgICAgICAgICAgLy8gICAgICAgICBjaF9ieXRlZGFuY2UuZ2V0SW5zdGFuY2UoKS5pbml0QWRQYXJhbXMoY29uZmlnX2FkLmJ5dGVkYW5jZV9taW5pX2dhbWUpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGNhc2UgY2Muc3lzLk9QUE9fR0FNRTpcbiAgICAgICAgICAgIC8vICAgICBpZiAoQ0NfQlVJTEQgJiYgQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2hfb3Bwby5nZXRJbnN0YW5jZSgpLmluaXRBZFBhcmFtcyhjb25maWdfYWQuZGVidWcpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vICAgICBpZiAoQ0NfQlVJTEQgJiYgIUNDX0RFQlVHKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNoX29wcG8uZ2V0SW5zdGFuY2UoKS5pbml0QWRQYXJhbXMoY29uZmlnX2FkLm9wcG9fcGxheSk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gY2FzZSBjYy5zeXMuVklWT19HQU1FOlxuICAgICAgICAgICAgLy8gICAgIGlmIChDQ19CVUlMRCAmJiBDQ19ERUJVRykge1xuICAgICAgICAgICAgLy8gICAgICAgICBjaF92aXZvLmdldEluc3RhbmNlKCkuaW5pdEFkUGFyYW1zKGNvbmZpZ19hZC5kZWJ1Zyk7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gICAgIGlmIChDQ19CVUlMRCAmJiAhQ0NfREVCVUcpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY2hfdml2by5nZXRJbnN0YW5jZSgpLmluaXRBZFBhcmFtcyhjb25maWdfYWQudml2b19wbGF5KTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBjYXNlIGNjLnN5cy5RUV9QTEFZOlxuICAgICAgICAgICAgLy8gICAgIGlmIChDQ19CVUlMRCAmJiBDQ19ERUJVRykge1xuICAgICAgICAgICAgLy8gICAgICAgICBjaF9xcS5nZXRJbnN0YW5jZSgpLmluaXRBZFBhcmFtcyhjb25maWdfYWQuZGVidWcpO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vICAgICBpZiAoQ0NfQlVJTEQgJiYgIUNDX0RFQlVHKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNoX3FxLmdldEluc3RhbmNlKCkuaW5pdEFkUGFyYW1zKGNvbmZpZ19hZC5xcV9wbGF5KTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiDmv4DlirHop4bpopHosIPnlKhcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlPGJvb2xlYW4+XG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHZpZGVvX3Nob3coKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKFBBU1NfQUQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgY2Muc3lzLldFQ0hBVF9HQU1FOlxuICAgICAgICAgICAgICAgICAgICBjaF93ZWNoYXQuZ2V0SW5zdGFuY2UoKS52aWRlb0FkX3Nob3cocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY2Muc3lzLkJZVEVEQU5DRV9HQU1FOlxuICAgICAgICAgICAgICAgICAgICBjaF9ieXRlZGFuY2UuZ2V0SW5zdGFuY2UoKS52aWRlb0FkX3Nob3cocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY2Muc3lzLk9QUE9fR0FNRTpcbiAgICAgICAgICAgICAgICAgICAgY2hfb3Bwby5nZXRJbnN0YW5jZSgpLnZpZGVvQWRfc2hvdyhyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBjYy5zeXMuVklWT19HQU1FOlxuICAgICAgICAgICAgICAgICAgICBjaF92aXZvLmdldEluc3RhbmNlKCkudmlkZW9BZF9zaG93KHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNjLnN5cy5RUV9QTEFZOlxuICAgICAgICAgICAgICAgICAgICBjaF9xcS5nZXRJbnN0YW5jZSgpLnZpZGVvQWRfc2hvdyhyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmqKrluYXlsZXnpLpcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJhbm5lcl9zaG93KCkge1xuICAgICAgICBpZiAoUEFTU19BRCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuV0VDSEFUX0dBTUU6XG4gICAgICAgICAgICAgICAgY2hfd2VjaGF0LmdldEluc3RhbmNlKCkuYmFubmVyQWRfc2hvdygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuQllURURBTkNFX0dBTUU6XG4gICAgICAgICAgICAgICAgY2hfYnl0ZWRhbmNlLmdldEluc3RhbmNlKCkuYmFubmVyQWRfc2hvdygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuT1BQT19HQU1FOlxuICAgICAgICAgICAgICAgIGNoX29wcG8uZ2V0SW5zdGFuY2UoKS5iYW5uZXJBZF9zaG93KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5WSVZPX0dBTUU6XG4gICAgICAgICAgICAgICAgY2hfdml2by5nZXRJbnN0YW5jZSgpLmJhbm5lckFkX3Nob3coKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2Muc3lzLlFRX1BMQVk6XG4gICAgICAgICAgICAgICAgY2hfcXEuZ2V0SW5zdGFuY2UoKS5iYW5uZXJBZF9zaG93KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaoquW5hemakOiXj1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gYmFubmVyX2hpZGUoKSB7XG4gICAgICAgIGlmIChQQVNTX0FEKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5XRUNIQVRfR0FNRTpcbiAgICAgICAgICAgICAgICBjaF93ZWNoYXQuZ2V0SW5zdGFuY2UoKS5iYW5uZXJBZF9oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5CWVRFREFOQ0VfR0FNRTpcbiAgICAgICAgICAgICAgICBjaF9ieXRlZGFuY2UuZ2V0SW5zdGFuY2UoKS5iYW5uZXJBZF9oaWRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5PUFBPX0dBTUU6XG4gICAgICAgICAgICAgICAgY2hfb3Bwby5nZXRJbnN0YW5jZSgpLmJhbm5lckFkX2hpZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2Muc3lzLlZJVk9fR0FNRTpcbiAgICAgICAgICAgICAgICBjaF92aXZvLmdldEluc3RhbmNlKCkuYmFubmVyQWRfaGlkZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuUVFfUExBWTpcbiAgICAgICAgICAgICAgICBjaF9xcS5nZXRJbnN0YW5jZSgpLmJhbm5lckFkX2hpZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5o+S5bGP5bGV56S6XG4gICAgICogQHJldHVybnMgdm9pZFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBpbnNlcnQoKSB7XG4gICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuV0VDSEFUX0dBTUU6XG4gICAgICAgICAgICAgICAgY2hfd2VjaGF0LmdldEluc3RhbmNlKCkuaW5zdGVyQWRfc2hvdygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuQllURURBTkNFX0dBTUU6XG4gICAgICAgICAgICAgICAgY2hfYnl0ZWRhbmNlLmdldEluc3RhbmNlKCkuaW5zdGVyQWRfc2hvdygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuVklWT19HQU1FOlxuICAgICAgICAgICAgICAgIGNoX3Zpdm8uZ2V0SW5zdGFuY2UoKS5pbnNlcnRBZF9zaG93KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5RUV9QTEFZOlxuICAgICAgICAgICAgICAgIGNoX3FxLmdldEluc3RhbmNlKCkuaW5zZXJ0QWRfc2hvdygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsZXnpLrljp/nlJ/lub/lkYoo55uu5YmN5LuF5pSv5oyBVklWTylcbiAgICAgKiBAZGVzY3JpcHRpb24g5L2/55So6L+Z5LiqQVBJ5pe26ZyA6KaB6Ieq5a6a5LmJ5qC35byPXG4gICAgICogQHBhcmFtIGNiIOWOn+eUn+i1hOa6kOWbnuiwg1xuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBuYXRpdmVfc2hvdyhjYjogbmF0aXZlKSB7XG4gICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuVklWT19HQU1FOlxuICAgICAgICAgICAgICAgIGNoX3Zpdm8uZ2V0SW5zdGFuY2UoKS5uYXRpdmVBZFNob3coY2IpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsZXnpLpiYW5uZXLmuLjmiI/nm5LlrZAo5a2Q6IqC6Lez5YqoKVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBiYW5uZXJHYW1lQm94X3Nob3coKSB7XG4gICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuQllURURBTkNFX0dBTUU6XG4gICAgICAgICAgICAgICAgY2hfYnl0ZWRhbmNlLmdldEluc3RhbmNlKCkuZ2FtZUJhbm5lcl9zaG93KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmakOiXj2Jhbm5lcua4uOaIj+ebkuWtkCjlrZDoioLot7PliqgpXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGJhbm5lckdhbWVCb3hfaGlkZSgpIHtcbiAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5CWVRFREFOQ0VfR0FNRTpcbiAgICAgICAgICAgICAgICBjaF9ieXRlZGFuY2UuZ2V0SW5zdGFuY2UoKS5nYW1lQmFubmVyX2hpZGUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5byA5aeL5b2V5Yi26KeG6aKRKOWtkOiKgui3s+WKqClcbiAgICAgKiBAcGFyYW0gdGlwIOaYvuekuuW9leWxj+W8gOWni+aPkOekulxuICAgICAqIEBwYXJhbSBtYXhTZWNvbmQg5pyA5aSn5b2V5Yi25pe26ZW/XG4gICAgICogQHBhcmFtIGlzTWFya09wZW4g5rC05Y2wXG4gICAgICogQHByb3BlcnR5IOWcqOa4uOaIj+W8gOWni+aXtuiwg+eUqOW9leWItuW+l+aWueazlSznlKjkuo7lvZXliLbmuLjmiI/ov4fnqIvlubbliIblj5FcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmVjb3JkKHRpcDogYm9vbGVhbiA9IGZhbHNlLCBtYXhTZWNvbmQ6IG51bWJlciA9IDMwMCwgaXNNYXJrT3BlbjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmKFBBU1NfQUQpIHJldHVybjtcbiAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5CWVRFREFOQ0VfR0FNRTpcbiAgICAgICAgICAgICAgICBjaF9ieXRlZGFuY2UuZ2V0SW5zdGFuY2UoKS5sdXpoaVZpZGVvX3N0YXJ0KHRpcCwgbWF4U2Vjb25kLCBpc01hcmtPcGVuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog57uT5p2f6KeG6aKR5b2V5Yi2KOWtkOiKgui3s+WKqClcbiAgICAgKiBAcGFyYW0gdGlwIOaYvuekuuW9leWxj+e7k+adn+aPkOekulxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiByZWNvcmRFbmQodGlwOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBpZihQQVNTX0FEKSByZXR1cm47XG4gICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuQllURURBTkNFX0dBTUU6XG4gICAgICAgICAgICAgICAgY2hfYnl0ZWRhbmNlLmdldEluc3RhbmNlKCkubHV6aGlWaWRlb19zdG9wKHRpcCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIhuS6q+W3suW9leWItueahOinhumikSjlrZDoioLot7PliqgpXG4gICAgICogQHBhcmFtIE9uU2hhcmVDYWxsIOWIhuS6q+Wbnuiwg1xuICAgICAqIEBwYXJhbSBxdWVyeSDmn6Xor6LlrZfnrKbkuLLlv4XpobvmmK8gYGtleTE9dmFsMSZrZXkyPXZhbDJgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlY29yZFNoYXJlKGNiOiBGdW5jdGlvbiwgcXVlcnk6IHN0cmluZyA9IFwiXCIpIHtcbiAgICAgICAgaWYoUEFTU19BRCl7XG4gICAgICAgICAgICBjYih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICAgICAgICAgIGNhc2UgY2Muc3lzLkJZVEVEQU5DRV9HQU1FOlxuICAgICAgICAgICAgICAgIGNoX2J5dGVkYW5jZS5nZXRJbnN0YW5jZSgpLmx1emhpVmlkZW9fc2hhcmUoY2IsIHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog6ZyH5Yqo6K6+5aSHKOefrSlcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc2hha2VEZXZpY2UoKSB7XG4gICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuV0VDSEFUX0dBTUU6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5CWVRFREFOQ0VfR0FNRTpcbiAgICAgICAgICAgICAgICBjaF9ieXRlZGFuY2UuZ2V0SW5zdGFuY2UoKS5zaGFrZURldmljZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuT1BQT19HQU1FOlxuICAgICAgICAgICAgICAgIGNoX29wcG8uZ2V0SW5zdGFuY2UoKS5zaGFrZURldmljZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuVklWT19HQU1FOlxuICAgICAgICAgICAgICAgIGNoX3Zpdm8uZ2V0SW5zdGFuY2UoKS5zaGFrZURldmljZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuUVFfUExBWTpcbiAgICAgICAgICAgICAgICBjaF9xcS5nZXRJbnN0YW5jZSgpLnNoYWtlRGV2aWNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqICNjaCFcbiAgICAgKiDpnIfliqjorr7lpIco6ZW/KVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBzaGFrZURldmljZUxvbmcoKSB7XG4gICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuV0VDSEFUX0dBTUU6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5CWVRFREFOQ0VfR0FNRTpcbiAgICAgICAgICAgICAgICBjaF9ieXRlZGFuY2UuZ2V0SW5zdGFuY2UoKS5zaGFrZURldmljZUxvbmcoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogI2NoIVxuICAgICAqIOa4uOaIj+mdnuW9leWxj+WIhuS6q1xuICAgICAqIEBwYXJhbSBjYiDliIbkuqvlm57osINcbiAgICAgKiBAcGFyYW0gUHJvdGV4dHVyZSBRUeWwj+a4uOaIj+WIhuS6q+WbvuaJk+WMheS9jee9riznsbvkvLw6IGBcInJlcy9yYXctYXNzZXRzL2EwL2EwMTAwMDMyLTkzM2MtNDA1Ny1hNWM0LWQ4ZDJiZDlmOGQwZC5wbmdcImBcbiAgICAgKiBAcGFyYW0gZGVzVHh0IFFR5bCP5ri45oiP5YiG5Lqr5paH5qGIXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNoYXJlKGNiOiBGdW5jdGlvbiwgUHJvdGV4dHVyZTogc3RyaW5nIHwgbnVsbCA9IG51bGwsIGRlc1R4dDogc3RyaW5nIHwgbnVsbCA9IG51bGwpIHtcbiAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5XRUNIQVRfR0FNRTpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2Muc3lzLkJZVEVEQU5DRV9HQU1FOlxuICAgICAgICAgICAgICAgIGNoX2J5dGVkYW5jZS5nZXRJbnN0YW5jZSgpLmJ1dHRvblNoYXJlKGNiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2Muc3lzLlFRX1BMQVk6XG4gICAgICAgICAgICAgICAgY2hfcXEuZ2V0SW5zdGFuY2UoKS5idXR0b25TaGFyZShjYiwgUHJvdGV4dHVyZSwgZGVzVHh0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY2IodHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5piv5ZCm5bGV56S65YW25LuW5ri45oiP55qE5YaF5o6oSUNPTlxuICAgICAqIEBwcm9wZXJ0eSDpu5jorqRJT1Pnq6/kuI3mmL7npLrmm7TlpJrmuLjmiI8s5pi+56S656uv5Y+j5Y+q5pyJ5oqW6Z+zLOWktOadoeWSjOWktOadoeaegemAn+eJiFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBzaG93VFRHYW1lSWNvbigpOiBib29sZWFuIHtcbiAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5CWVRFREFOQ0VfR0FNRTpcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hfYnl0ZWRhbmNlLmdldEluc3RhbmNlKCkuc2hvd1RUR2FtZUljb24oKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5ri45oiP5LqS6Lez5YiX6KGoKOS4u+imgeaYr+WktOadoSlcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gb3Blbk1vcmVHYW1lKCkge1xuICAgICAgICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICAgICAgICAgIGNhc2UgY2Muc3lzLkJZVEVEQU5DRV9HQU1FOlxuICAgICAgICAgICAgICAgIGNoX2J5dGVkYW5jZS5nZXRJbnN0YW5jZSgpLm9wZW5Nb3JlR2FtZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDlpLTmnaHoh6rlrprkuYnop6blj5Hkuovku7ZcbiAgICAgKiBAcGFyYW0gdmFsdWVzIOS4iuaKpeS6i+S7tlxuICAgICAqIEBwYXJhbSBvYmplY3Qg5LiK5oql5Y+C5pWwXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlcG9ydEFuYWx5dGljcyh2YWx1ZXM6IHN0cmluZyB8IG51bGwsIG9iamVjdDogT2JqZWN0ID0ge30pIHtcbiAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5CWVRFREFOQ0VfR0FNRTpcbiAgICAgICAgICAgICAgICBjaF9ieXRlZGFuY2UuZ2V0SW5zdGFuY2UoKS5yZXBvcnRBbmFseXRpY3ModmFsdWVzLCBvYmplY3QpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDot7PovazlhbPms6jmipbpn7Plj7fkuLvpobUo5a2Q6IqC6Lez5YqoKVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBvcGVuQXdlbWVVc2VyUHJvZmlsZSgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzbG92ZSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGNjLnN5cy5CWVRFREFOQ0VfR0FNRTpcbiAgICAgICAgICAgICAgICAgICAgY2hfYnl0ZWRhbmNlLmdldEluc3RhbmNlKCkub3BlbkF3ZW1lVXNlclByb2ZpbGUocmVzbG92ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlc2xvdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5rWu56qX5byV5a+8LOiwg+i1t+WFs+azqOWwj+eoi+W6j+eahOW8leWvvOe7hOS7tijlrZDoioLot7PliqgpXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9wZW5TdWJzY3JpYmVCYW5uZXIoKSB7XG4gICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgY2FzZSBjYy5zeXMuQllURURBTkNFX0dBTUU6XG4gICAgICAgICAgICAgICAgY2hfYnl0ZWRhbmNlLmdldEluc3RhbmNlKCkuc2hvd0Zhdm9yaXRlR3VpZGUoKTtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDliIbljIXliqDovb1cbiAgICAgKiBAcGFyYW0gbmFtZVN1YnBhY2thZ2Ug5a2Q5YyF5ZCN56ewXG4gICAgICogQHBhcmFtIHN1YnBhY2tPbkNhbGwgIOWtkOWMheWKoOi9vee7k+aenOWbnuiwg1xuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkU3VicGFja2FnZShuYW1lU3VicGFja2FnZTogc3RyaW5nLCBzdWJwYWNrT25DYWxsOiBGdW5jdGlvbikge1xuICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZShuYW1lU3VicGFja2FnZSwgKGVyciwgYnVuZGxlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvYWQgYnVuZGxlIGVycm9yOicsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3VicGFja09uQ2FsbChidW5kbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19