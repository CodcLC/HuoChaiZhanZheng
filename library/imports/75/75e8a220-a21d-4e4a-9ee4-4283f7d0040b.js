"use strict";
cc._RF.push(module, '75e8aIgoh1OSp7kQoP30AQL', 'export_sdk');
// syyx_sdk/export_sdk.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Export = void 0;
var syyx_sdk_api_1 = require("../syyx_sdk/syyx_sdk_api");
var Export = /** @class */ (function () {
    function Export() {
    }
    /**
     * 预加载原生广告每显示一次就要加载一次，
     * 包括原生banner、原生结算（YSBN/YSJS）"10304001"/"10302001"
     */
    Export.preload_YSAD = function (adid) {
        console.log('preload_YSAD----------------');
        var native_banner_open_switch = syyx_sdk_api_1.syyx_sdk_api.get_business_data_by_key("native_banner_open_switch");
        if (native_banner_open_switch) {
            //进行操作 data[0] == 1 时开启 ，data[0] == 0时关闭
            if (native_banner_open_switch[0] == 1) { // 开启
                syyx_sdk_api_1.syyx_sdk_api.preload_native_inner_interstitial(adid, function onLoad(param, res) {
                    console.log("igc-----show show_native on_load-----------------111:" + JSON.stringify(res));
                }, function onShow() {
                    console.log("igc-----show show_native onShow");
                }, function onClose(param, res) {
                }, function onError(param, err) {
                    console.log("预加载原生广告失败:" + JSON.stringify(err));
                });
            }
            else {
                console.log('preload_YSAD----------------no open');
            }
        }
    };
    Export.show_video = function (success_func, fail_func) {
        var video_open_switch = syyx_sdk_api_1.syyx_sdk_api.get_business_data_by_key("video_open_switch");
        if (video_open_switch && video_open_switch[0] == 1) {
            //进行操作 1 时开启 ，data[0] == 0时关闭
            syyx_sdk_api_1.syyx_sdk_api.show_video("10200001", function onLoad(param, res) {
                console.log("igc-----show show_video on_load");
            }, function onShow() {
                console.log("igc-----show show_video onShow");
            }, function onClose(param, res) {
                console.log("igc-----show show_video onClose:" + JSON.stringify(res));
                if (res.isEnded) {
                    console.log("igc---视频已看完发放奖励--需要发奖励");
                    success_func && success_func();
                }
                else {
                    console.log("igc---视频未看完");
                    syyx_sdk_api_1.syyx_sdk_api.create_toast('视频未看完');
                    fail_func && fail_func();
                }
            }, function onError(param, err) {
                console.log("igc-----show show_video onError:" + JSON.stringify(err));
            }, true);
        }
        else {
            console.log("igc---video --------no open");
        }
    };
    Export.show_native_YSAD = function (adid, parentNode, callback) {
        var native_switch_ysjs = syyx_sdk_api_1.syyx_sdk_api.get_business_data_by_key("native_inner_interstitial_switch");
        if (native_switch_ysjs && native_switch_ysjs[0] == 1) {
            var native_data = syyx_sdk_api_1.syyx_sdk_api.get_local_native_data(adid);
            if (native_data) {
                console.log("igc-----加载到原生数据  可以展示------");
                //结算原生点击回调
                var click_back = function () {
                    //打点---点击结算原生
                };
                //结算原生显示回调
                var show_back = function () {
                    console.log("igc----- 结算原生已显示------");
                    callback && callback();
                };
                //结算原生隐藏回调
                var hide_back = function () {
                    console.log("igc----- 结算原生隐藏");
                };
                syyx_sdk_api_1.syyx_sdk_api.show_native_inner_interstitial(adid, //adv广告id
                cc.find(parentNode), //结算原生父节点
                click_back, show_back, hide_back);
            }
            else {
                console.log("igc-----未加载到原生数据 不展示结算原生-------");
            }
        }
    };
    /**
    * 点击了原生广告
    */
    Export.click_native_YSAD = function (type) {
        if (type == "YSBN") {
            syyx_sdk_api_1.syyx_sdk_api.click_native_banner();
        }
        else {
            syyx_sdk_api_1.syyx_sdk_api.click_native_inner_interstitial();
        }
    };
    /**
     * 结算页面隐藏或者销毁前，要调用一下
     * 结算界面销毁原生广告
     */
    Export.hide_naive_YSAD = function (preload) {
        syyx_sdk_api_1.syyx_sdk_api.hide_native_inner_interstitial();
        syyx_sdk_api_1.syyx_sdk_api.hide_native_banner();
        if (preload == 'YSBN') {
            this.preload_YSAD("10304001");
        }
        else {
            this.preload_YSAD("10302001");
        }
    };
    return Export;
}());
exports.Export = Export;

cc._RF.pop();