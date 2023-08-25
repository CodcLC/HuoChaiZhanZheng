
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/ad/ad_native_inner_interstitial.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e99f1odQZ1M3Z/ZTQyYK1KD', 'ad_native_inner_interstitial');
// syyx_sdk/controller/ad/ad_native_inner_interstitial.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ad_native_inner_interstitial = void 0;
var model_1 = require("../../model/model");
var syyx_sdk_enum_1 = require("../../configs/syyx_sdk_enum");
var syyx_manager_1 = require("../syyx_manager");
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var syyx_adv_manager_1 = require("./syyx_adv_manager");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var ad_native_inner_interstitial = /** @class */ (function () {
    function ad_native_inner_interstitial() {
    }
    ad_native_inner_interstitial.report_ad_click = function (ad_pos_id, native_data) {
        var self = this;
        if (!this._ad_pos_id) {
            console.log("igc----- ad_native_inner_interstitial  report_ad_click this.ad_pos_id is null!!");
            this._ad_pos_id = syyx_sdk_enum_1.e_ad_id.native_inner_interstitial_success;
        }
        if (this._ad_pos_id != ad_pos_id) {
            return;
        }
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            console.log("igc ------ hw hide inner interstitial");
            syyx_manager_1.syyx_manager.hide_native_inner_interstitial();
            return;
        }
        console.log("igc ----- has in inner interstitial's report click ");
        //上报的是原生banner点击  隐藏原生bannerUi 重新请求新的原生banner数据
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_inner_report_click_update_switch"]) {
            if (this._business_config_data["native_inner_report_click_update_switch"].value[0] == 1) {
                this.preload_native_inner_interstitial(igc.e_ad_type.native, ad_pos_id, function onLoad(args, native_data) {
                    //由于结算原生的原生插屏需要设置父节点  所以上报点击时不隐藏UI
                    //刷新已经打开的原生插屏界面
                    console.log("igc----- ad_native_inner_interstitial click update success");
                    self.update_native_inner_interstitial_ui(native_data);
                }, function () { }, function () { }, function onError() {
                    //点击加载原生失败的话 能否在新规条件下获取到数据
                    var native_data = self.get_native_data();
                    if (native_data) {
                        self.update_native_inner_interstitial_ui(native_data);
                    }
                    else {
                        //自己没有数据 也没办法用原生Banner的数据的话 只能隐藏
                        //刷新结算原生失败时，隐藏结算原生
                        syyx_manager_1.syyx_manager.hide_native_inner_interstitial();
                    }
                });
            }
            else {
                syyx_manager_1.syyx_manager.hide_native_inner_interstitial();
            }
        }
    };
    ad_native_inner_interstitial.report_ad_show = function (ad_pos_id, native_data) {
        if (!this._ad_pos_id) {
            console.log("igc----- ad_native_inner_interstitial  report_ad_click this.ad_pos_id is null!!");
            this._ad_pos_id = syyx_sdk_enum_1.e_ad_id.native_inner_interstitial_success;
        }
        if (this._ad_pos_id == ad_pos_id) {
            this._last_ad_id = native_data.id;
        }
    };
    /**
    * 加载结算原生插屏
    * onLoad回调一般用于点击刷新  和  cp传入的onLoad
    */
    ad_native_inner_interstitial.preload_native_inner_interstitial = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        var self = this;
        this._ad_pos_id = ad_pos_id;
        this._ad_param = {
            ad_type: ad_type,
            ad_pos_id: ad_pos_id,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError,
        };
        // 检查点击率超标 一开始为false
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial)) { // e_ad_native_type.native_inner_interstitial 为 2
            //自己点击率超标的话  去找原生Banner数据
            var native_banner_data = this.get_native_data();
            if (native_banner_data) {
                onLoad && onLoad({}, native_banner_data);
            }
            else {
                onError && onError();
            }
            return;
        }
        //华为可能需要用到结算原生开关 14
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_inner_interstitial_switch"]) {
            if (this._business_config_data["native_inner_interstitial_switch"].value[0] == 0) { // 0是关，1是开，根据gc_status开关
                console.log("sdk-----remote - config -ysjs- is close!!!");
                return;
            }
        }
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            return;
        }
        //上一个加载的原生banner没有展示过
        var latest_data = syyx_adv_manager_1.syyx_adv_manager.get_latest_native_data(this._native_data_list); // 一开始为underfind
        if (latest_data && latest_data.state == syyx_sdk_enum_1.e_ad_native_state.need_show) {
            onLoad && onLoad({}, latest_data);
            return;
        }
        //检查当前展示是否达到限制
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_show_count_limit()) {
            //达到限制  用之前的数据
            console.log("igc----- ad_native_inner_interstitial preload_native_inner_interstitial is show limit!!");
            var native_data = this.get_native_data();
            if (native_data) {
                onLoad && onLoad({}, native_data);
            }
            else {
                syyx_manager_1.syyx_manager.hide_native_inner_interstitial();
            }
            return;
        }
        //-----------加载结算原生数据---------------------//
        //web渠道  返回假数据
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            var data = new model_1.native_ad_data();
            data.id = igc.utils_manager.get_random_name();
            data.adPosId = ad_pos_id;
            data.adId = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([100, 200]) + "";
            data.adUnitId = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([0, 100000]) + "";
            data.imgUrlList = "https://static-cdn.llewan.com/h5/ddsdk/plugin/share_img.jpg";
            data.title = "结算原生标题" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([100, 200]);
            data.desc = "结算原生描述" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([100, 200]);
            data.state = syyx_sdk_enum_1.e_ad_native_state.need_show;
            data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial;
            this.add_native_data(data);
            onLoad && onLoad({}, data);
            syyx_adv_manager_1.syyx_adv_manager.add_native_show_count();
            this.update_native_inner_interstitial_ui(data);
            console.log("igc-----syyx_adv_manager-------load_native_inner_interstitial on_load", data);
            return;
        }
        syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.native, ad_pos_id, function on_load(param, ad_data_list) {
            console.log("igc-----syyx_adv_manager-------load_native_inner_interstitial on_load", ad_data_list);
            //返回数据异常
            if (ad_data_list == undefined || !ad_data_list[0]) {
                onError && onError();
            }
            else {
                var length = 0;
                if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                    //vivo渠道只取最后一个位置
                    length = ad_data_list.length - 1;
                }
                var data = new model_1.native_ad_data();
                data.id = igc.utils_manager.get_random_name();
                data.adPosId = ad_pos_id;
                data.adId = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
                data.adUnitId = ad_data_list[length].adUnitId;
                data.imgUrlList = syyx_sdk_utils_1.syyx_sdk_utils.format_remote_texture_url(ad_data_list[length].imgUrlList[0]);
                data.title = ad_data_list[length].title;
                data.desc = ad_data_list[length].desc;
                data.state = syyx_sdk_enum_1.e_ad_native_state.need_show;
                data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial;
                self.add_native_data(data);
                onLoad && onLoad({}, data);
                syyx_adv_manager_1.syyx_adv_manager.add_native_show_count();
                syyx_sdk_utils_1.syyx_sdk_utils.preload_native_texture(data.imgUrlList);
                self.update_native_inner_interstitial_ui(data);
            }
        }, function on_show() {
        }, function on_close(param, res) {
        }, function on_error(param, err) {
            console.error("igc-----syyx_adv_manager-------load_native_inner_interstitial onError", err);
            onError && onError();
        });
    };
    /**
     * 刷新结算原生界面
     * 必须要结算原生正在展示才会执行
     */
    ad_native_inner_interstitial.update_native_inner_interstitial_ui = function (native_data) {
        syyx_manager_1.syyx_manager.load_view(model_1.syyx_view.inner_interstitial, function (view) {
            if (native_data) {
                view.report_click_update_view(native_data);
            }
        });
    };
    /**
     * 处于展示上限的情况下
     * 根据一定规则选择缓存的原生数据
     */
    ad_native_inner_interstitial.get_native_data_by_limit_model = function () {
        if (syyx_adv_manager_1.syyx_adv_manager.check_native_data_list_is_reprot(this._native_data_list)) {
            //全部数据都上报曝光过了
            console.log("igc----- ad_native_inner_interstitial use old load native data");
            return syyx_adv_manager_1.syyx_adv_manager.get_min_order_native_data(this._native_data_list);
        }
        else {
            //有数据没有上报过曝光  用最新数据
            return syyx_adv_manager_1.syyx_adv_manager.get_latest_native_data(this._native_data_list);
        }
    };
    /**
    * 获取最新的原生数据
    */
    ad_native_inner_interstitial.get_native_data = function () {
        return syyx_adv_manager_1.syyx_adv_manager.get_native_data();
    };
    /**
     * 储存原生数据
     * @param native_data 原生数据
     */
    ad_native_inner_interstitial.add_native_data = function (native_data) {
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            syyx_adv_manager_1.syyx_adv_manager.add_native_data(native_data);
        }
        else {
            this._native_data_list[0] = native_data;
        }
    };
    ad_native_inner_interstitial.set_on_click_inner_interstitial_btn = function (click_back) {
        if (click_back === void 0) { click_back = undefined; }
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_inner_institial_click_wrap"]) {
            var rule = this._business_config_data["native_inner_institial_click_wrap"].value;
            if (rule) {
                if (this.next_click_wrap_count == -1) {
                    this.next_click_wrap_count = rule[0];
                }
                if (this.show_count >= this.next_click_wrap_count) {
                    console.log("igc----- native_inner_interstitial is easy click!");
                    this.next_click_wrap_count = this.show_count + rule[1] + Math.floor(Math.random() * (rule[2] - rule[1] + 1));
                    if (this.next_click_wrap_count < rule[0]) {
                        this.next_click_wrap_count = rule[0];
                    }
                    console.log("igc----- native_inner_interstitial next easy click count：", this.next_click_wrap_count);
                    syyx_manager_1.syyx_manager.click_native_inner_interstitial(click_back);
                    return;
                }
            }
        }
        console.log("igc----- native_inner_interstitial easy click is close!");
        click_back && click_back();
    };
    /**
     * 上一次显示的id
     */
    ad_native_inner_interstitial._last_ad_id = undefined;
    /**
      * 原生数据
      */
    ad_native_inner_interstitial._native_data_list = [];
    /**
    * 远端运营配置
    */
    ad_native_inner_interstitial._business_config_data = {};
    ad_native_inner_interstitial.next_click_wrap_count = -1;
    ad_native_inner_interstitial.show_count = 0;
    return ad_native_inner_interstitial;
}());
exports.ad_native_inner_interstitial = ad_native_inner_interstitial;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXGFkXFxhZF9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUE4RDtBQUM5RCw2REFBMkY7QUFDM0YsZ0RBQStDO0FBQy9DLGlFQUEyRDtBQUMzRCx1REFBc0Q7QUFDdEQsNkRBQTREO0FBRzVEO0lBQUE7SUErUkEsQ0FBQztJQXRRVSw0Q0FBZSxHQUF0QixVQUF1QixTQUFpQixFQUFFLFdBQVk7UUFDbEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpRkFBaUYsQ0FBQyxDQUFBO1lBQzlGLElBQUksQ0FBQyxVQUFVLEdBQUcsdUJBQU8sQ0FBQyxpQ0FBaUMsQ0FBQTtTQUM5RDtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEVBQUU7WUFDOUIsT0FBTTtTQUNUO1FBRUQsSUFBSSw0QkFBVSxDQUFDLGdCQUFnQixLQUFLLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO1lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtZQUNwRCwyQkFBWSxDQUFDLDhCQUE4QixFQUFFLENBQUE7WUFDN0MsT0FBTTtTQUNUO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFBO1FBQ2xFLCtDQUErQztRQUMvQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsMkJBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQy9ELElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyx5Q0FBeUMsQ0FBQyxFQUFFO1lBQ3JHLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlDQUF5QyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FB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QUFDLENBQUMsQ0FBQTtvQkFDNUcsSUFBSSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUN0QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO3FCQUN2QztvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJEQUEyRCxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO29CQUNwRywyQkFBWSxDQUFDLCtCQUErQixDQUFDLFVBQVUsQ0FBQyxDQUFBO29CQUN4RCxPQUFNO2lCQUNUO2FBQ0o7U0FDSjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMseURBQXlELENBQUMsQ0FBQTtRQUN0RSxVQUFVLElBQUksVUFBVSxFQUFFLENBQUE7SUFDOUIsQ0FBQztJQTdSRDs7T0FFRztJQUNJLHdDQUFXLEdBQUcsU0FBUyxDQUFBO0lBQzlCOztRQUVJO0lBQ0csOENBQWlCLEdBQUcsRUFBRSxDQUFBO0lBRTdCOztNQUVFO0lBQ0ssa0RBQXFCLEdBQUcsRUFBRSxDQUFDO0lBeVAzQixrREFBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMxQix1Q0FBVSxHQUFHLENBQUMsQ0FBQTtJQXdCekIsbUNBQUM7Q0EvUkQsQUErUkMsSUFBQTtBQS9SWSxvRUFBNEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuYXRpdmVfYWRfZGF0YSwgc3l5eF92aWV3IH0gZnJvbSBcIi4uLy4uL21vZGVsL21vZGVsXCI7XHJcbmltcG9ydCB7IGVfYWRfaWQsIGVfYWRfbmF0aXZlX3N0YXRlLCBlX2FkX25hdGl2ZV90eXBlIH0gZnJvbSBcIi4uLy4uL2NvbmZpZ3Mvc3l5eF9zZGtfZW51bVwiO1xyXG5pbXBvcnQgeyBzeXl4X21hbmFnZXIgfSBmcm9tIFwiLi4vc3l5eF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHN5eXhfY29uc3QgfSBmcm9tIFwiLi4vLi4vY29uZmlncy9zeXl4X3Nka19jb25maWdcIjtcclxuaW1wb3J0IHsgc3l5eF9hZHZfbWFuYWdlciB9IGZyb20gXCIuL3N5eXhfYWR2X21hbmFnZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9zZGtfdXRpbHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3l5eF9zZGtfdXRpbHNcIjtcclxuaW1wb3J0IHsgYWRfYmFubmVyIH0gZnJvbSBcIi4vYWRfYmFubmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCB7XHJcbiAgICAvKipcclxuICAgICAqIOS4iuS4gOasoeaYvuekuueahGlkXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfbGFzdF9hZF9pZCA9IHVuZGVmaW5lZFxyXG4gICAgLyoqXHJcbiAgICAgICog5Y6f55Sf5pWw5o2uXHJcbiAgICAgICovXHJcbiAgICBzdGF0aWMgX25hdGl2ZV9kYXRhX2xpc3QgPSBbXVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDov5znq6/ov5DokKXphY3nva5cclxuICAgICovXHJcbiAgICBzdGF0aWMgX2J1c2luZXNzX2NvbmZpZ19kYXRhID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDphY3nva7ooajlub/lkYppZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX2FkX3Bvc19pZFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65bm/5ZGK5pe25Lyg5YWl55qE5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfYWRfcGFyYW1cclxuXHJcbiAgICBzdGF0aWMgcmVwb3J0X2FkX2NsaWNrKGFkX3Bvc19pZDogc3RyaW5nLCBuYXRpdmVfZGF0YT8pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9hZF9wb3NfaWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBhZF9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsICByZXBvcnRfYWRfY2xpY2sgdGhpcy5hZF9wb3NfaWQgaXMgbnVsbCEhXCIpXHJcbiAgICAgICAgICAgIHRoaXMuX2FkX3Bvc19pZCA9IGVfYWRfaWQubmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbF9zdWNjZXNzXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fYWRfcG9zX2lkICE9IGFkX3Bvc19pZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS5od19xZykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYyAtLS0tLS0gaHcgaGlkZSBpbm5lciBpbnRlcnN0aXRpYWxcIilcclxuICAgICAgICAgICAgc3l5eF9tYW5hZ2VyLmhpZGVfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCgpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpZ2MgLS0tLS0gaGFzIGluIGlubmVyIGludGVyc3RpdGlhbCdzIHJlcG9ydCBjbGljayBcIilcclxuICAgICAgICAvL+S4iuaKpeeahOaYr+WOn+eUn2Jhbm5lcueCueWHuyAg6ZqQ6JeP5Y6f55SfYmFubmVyVWkg6YeN5paw6K+35rGC5paw55qE5Y6f55SfYmFubmVy5pWw5o2uXHJcbiAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2lubmVyX3JlcG9ydF9jbGlja191cGRhdGVfc3dpdGNoXCJdKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pbm5lcl9yZXBvcnRfY2xpY2tfdXBkYXRlX3N3aXRjaFwiXS52YWx1ZVswXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZWxvYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbChcclxuICAgICAgICAgICAgICAgICAgICBpZ2MuZV9hZF90eXBlLm5hdGl2ZSxcclxuICAgICAgICAgICAgICAgICAgICBhZF9wb3NfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gb25Mb2FkKGFyZ3MsIG5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v55Sx5LqO57uT566X5Y6f55Sf55qE5Y6f55Sf5o+S5bGP6ZyA6KaB6K6+572u54i26IqC54K5ICDmiYDku6XkuIrmiqXngrnlh7vml7bkuI3pmpDol49VSVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+WIt+aWsOW3sue7j+aJk+W8gOeahOWOn+eUn+aPkuWxj+eVjOmdolxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGFkX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwgY2xpY2sgdXBkYXRlIHN1Y2Nlc3NcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi51cGRhdGVfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbF91aShuYXRpdmVfZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgfSxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ngrnlh7vliqDovb3ljp/nlJ/lpLHotKXnmoTor50g6IO95ZCm5Zyo5paw6KeE5p2h5Lu25LiL6I635Y+W5Yiw5pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYXRpdmVfZGF0YSA9IHNlbGYuZ2V0X25hdGl2ZV9kYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZV9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsX3VpKG5hdGl2ZV9kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/oh6rlt7HmsqHmnInmlbDmja4g5Lmf5rKh5Yqe5rOV55So5Y6f55SfQmFubmVy55qE5pWw5o2u55qE6K+dIOWPquiDvemakOiXj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/liLfmlrDnu5Pnrpfljp/nlJ/lpLHotKXml7bvvIzpmpDol4/nu5Pnrpfljp/nlJ9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN5eXhfbWFuYWdlci5oaWRlX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3l5eF9tYW5hZ2VyLmhpZGVfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlcG9ydF9hZF9zaG93KGFkX3Bvc19pZDogc3RyaW5nLCBuYXRpdmVfZGF0YSkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2FkX3Bvc19pZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGFkX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwgIHJlcG9ydF9hZF9jbGljayB0aGlzLmFkX3Bvc19pZCBpcyBudWxsISFcIilcclxuICAgICAgICAgICAgdGhpcy5fYWRfcG9zX2lkID0gZV9hZF9pZC5uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsX3N1Y2Nlc3NcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9hZF9wb3NfaWQgPT0gYWRfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RfYWRfaWQgPSBuYXRpdmVfZGF0YS5pZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5Yqg6L2957uT566X5Y6f55Sf5o+S5bGPXHJcbiAgICAqIG9uTG9hZOWbnuiwg+S4gOiIrOeUqOS6jueCueWHu+WIt+aWsCAg5ZKMICBjcOS8oOWFpeeahG9uTG9hZFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBwcmVsb2FkX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwoYWRfdHlwZT86IGlnYy5lX2FkX3R5cGUsIGFkX3Bvc19pZD86IHN0cmluZywgb25Mb2FkPzogRnVuY3Rpb24sIG9uU2hvdz86IEZ1bmN0aW9uLCBvbkNsb3NlPzogRnVuY3Rpb24sIG9uRXJyb3I/OiBGdW5jdGlvbikge1xyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB0aGlzLl9hZF9wb3NfaWQgPSBhZF9wb3NfaWRcclxuICAgICAgICB0aGlzLl9hZF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgYWRfdHlwZTogYWRfdHlwZSxcclxuICAgICAgICAgICAgYWRfcG9zX2lkOiBhZF9wb3NfaWQsXHJcbiAgICAgICAgICAgIG9uTG9hZDogb25Mb2FkLFxyXG4gICAgICAgICAgICBvblNob3c6IG9uU2hvdyxcclxuICAgICAgICAgICAgb25DbG9zZTogb25DbG9zZSxcclxuICAgICAgICAgICAgb25FcnJvcjogb25FcnJvcixcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOajgOafpeeCueWHu+eOh+i2heaghyDkuIDlvIDlp4vkuLpmYWxzZVxyXG4gICAgICAgIGlmIChzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX2lzX2NsaWNrX2xpbWl0KGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCkpIHsgLy8gZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsIOS4uiAyXHJcbiAgICAgICAgICAgIC8v6Ieq5bex54K55Ye7546H6LaF5qCH55qE6K+dICDljrvmib7ljp/nlJ9CYW5uZXLmlbDmja5cclxuICAgICAgICAgICAgbGV0IG5hdGl2ZV9iYW5uZXJfZGF0YSA9IHRoaXMuZ2V0X25hdGl2ZV9kYXRhKClcclxuICAgICAgICAgICAgaWYgKG5hdGl2ZV9iYW5uZXJfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgb25Mb2FkICYmIG9uTG9hZCh7fSwgbmF0aXZlX2Jhbm5lcl9kYXRhKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Y2O5Li65Y+v6IO96ZyA6KaB55So5Yiw57uT566X5Y6f55Sf5byA5YWzIDE0XHJcbiAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSAmJiB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxfc3dpdGNoXCJdKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxfc3dpdGNoXCJdLnZhbHVlWzBdID09IDApIHsgLy8gMOaYr+WFs++8jDHmmK/lvIDvvIzmoLnmja5nY19zdGF0dXPlvIDlhbNcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2RrLS0tLS1yZW1vdGUgLSBjb25maWcgLXlzanMtIGlzIGNsb3NlISEhXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFkX2lkID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfY2hhbm5lbF9hZF9pZChhZF9wb3NfaWQpXHJcbiAgICAgICAgaWYgKCFhZF9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LiK5LiA5Liq5Yqg6L2955qE5Y6f55SfYmFubmVy5rKh5pyJ5bGV56S66L+HXHJcbiAgICAgICAgbGV0IGxhdGVzdF9kYXRhID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfbGF0ZXN0X25hdGl2ZV9kYXRhKHRoaXMuX25hdGl2ZV9kYXRhX2xpc3QpIC8vIOS4gOW8gOWni+S4unVuZGVyZmluZFxyXG4gICAgICAgIGlmIChsYXRlc3RfZGF0YSAmJiBsYXRlc3RfZGF0YS5zdGF0ZSA9PSBlX2FkX25hdGl2ZV9zdGF0ZS5uZWVkX3Nob3cpIHtcclxuICAgICAgICAgICAgb25Mb2FkICYmIG9uTG9hZCh7fSwgbGF0ZXN0X2RhdGEpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mo4Dmn6XlvZPliY3lsZXnpLrmmK/lkKbovr7liLDpmZDliLZcclxuICAgICAgICBpZiAoc3l5eF9hZHZfbWFuYWdlci5jaGVja19pc19zaG93X2NvdW50X2xpbWl0KCkpIHtcclxuICAgICAgICAgICAgLy/ovr7liLDpmZDliLYgIOeUqOS5i+WJjeeahOaVsOaNrlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGFkX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwgcHJlbG9hZF9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsIGlzIHNob3cgbGltaXQhIVwiKVxyXG4gICAgICAgICAgICBsZXQgbmF0aXZlX2RhdGEgPSB0aGlzLmdldF9uYXRpdmVfZGF0YSgpXHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgb25Mb2FkICYmIG9uTG9hZCh7fSwgbmF0aXZlX2RhdGEpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzeXl4X21hbmFnZXIuaGlkZV9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLS0tLS0tLS0tLS3liqDovb3nu5Pnrpfljp/nlJ/mlbDmja4tLS0tLS0tLS0tLS0tLS0tLS0tLS0vL1xyXG5cclxuICAgICAgICAvL3dlYua4oOmBkyAg6L+U5Zue5YGH5pWw5o2uXHJcbiAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLndlYikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBuYXRpdmVfYWRfZGF0YSgpXHJcbiAgICAgICAgICAgIGRhdGEuaWQgPSBpZ2MudXRpbHNfbWFuYWdlci5nZXRfcmFuZG9tX25hbWUoKVxyXG4gICAgICAgICAgICBkYXRhLmFkUG9zSWQgPSBhZF9wb3NfaWRcclxuICAgICAgICAgICAgZGF0YS5hZElkID0gc3l5eF9zZGtfdXRpbHMuZ2V0X3JhbmRvbV9udW1iZXIoWzEwMCwgMjAwXSkgKyBcIlwiXHJcbiAgICAgICAgICAgIGRhdGEuYWRVbml0SWQgPSBzeXl4X3Nka191dGlscy5nZXRfcmFuZG9tX251bWJlcihbMCwgMTAwMDAwXSkgKyBcIlwiXHJcbiAgICAgICAgICAgIGRhdGEuaW1nVXJsTGlzdCA9IFwiaHR0cHM6Ly9zdGF0aWMtY2RuLmxsZXdhbi5jb20vaDUvZGRzZGsvcGx1Z2luL3NoYXJlX2ltZy5qcGdcIlxyXG4gICAgICAgICAgICBkYXRhLnRpdGxlID0gXCLnu5Pnrpfljp/nlJ/moIfpophcIiArIHN5eXhfc2RrX3V0aWxzLmdldF9yYW5kb21fbnVtYmVyKFsxMDAsIDIwMF0pXHJcbiAgICAgICAgICAgIGRhdGEuZGVzYyA9IFwi57uT566X5Y6f55Sf5o+P6L+wXCIgKyBzeXl4X3Nka191dGlscy5nZXRfcmFuZG9tX251bWJlcihbMTAwLCAyMDBdKVxyXG4gICAgICAgICAgICBkYXRhLnN0YXRlID0gZV9hZF9uYXRpdmVfc3RhdGUubmVlZF9zaG93XHJcbiAgICAgICAgICAgIGRhdGEubmF0aXZlX3R5cGUgPSBlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxcclxuICAgICAgICAgICAgdGhpcy5hZGRfbmF0aXZlX2RhdGEoZGF0YSlcclxuICAgICAgICAgICAgb25Mb2FkICYmIG9uTG9hZCh7fSwgZGF0YSlcclxuICAgICAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5hZGRfbmF0aXZlX3Nob3dfY291bnQoKVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsX3VpKGRhdGEpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS1zeXl4X2Fkdl9tYW5hZ2VyLS0tLS0tLWxvYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCBvbl9sb2FkXCIsIGRhdGEpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLmNyZWF0ZV9hZChpZ2MuZV9hZF90eXBlLm5hdGl2ZSwgYWRfcG9zX2lkLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBvbl9sb2FkKHBhcmFtLCBhZF9kYXRhX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS1zeXl4X2Fkdl9tYW5hZ2VyLS0tLS0tLWxvYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCBvbl9sb2FkXCIsIGFkX2RhdGFfbGlzdClcclxuICAgICAgICAgICAgICAgIC8v6L+U5Zue5pWw5o2u5byC5bi4XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRfZGF0YV9saXN0ID09IHVuZGVmaW5lZCB8fCAhYWRfZGF0YV9saXN0WzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxlbmd0aCA9IDBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUudml2b19xZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Zpdm/muKDpgZPlj6rlj5bmnIDlkI7kuIDkuKrkvY3nva5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gYWRfZGF0YV9saXN0Lmxlbmd0aCAtIDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXcgbmF0aXZlX2FkX2RhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaWQgPSBpZ2MudXRpbHNfbWFuYWdlci5nZXRfcmFuZG9tX25hbWUoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWRQb3NJZCA9IGFkX3Bvc19pZFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWRJZCA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2NoYW5uZWxfYWRfaWQoYWRfcG9zX2lkKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWRVbml0SWQgPSBhZF9kYXRhX2xpc3RbbGVuZ3RoXS5hZFVuaXRJZFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaW1nVXJsTGlzdCA9IHN5eXhfc2RrX3V0aWxzLmZvcm1hdF9yZW1vdGVfdGV4dHVyZV91cmwoYWRfZGF0YV9saXN0W2xlbmd0aF0uaW1nVXJsTGlzdFswXSlcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnRpdGxlID0gYWRfZGF0YV9saXN0W2xlbmd0aF0udGl0bGVcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmRlc2MgPSBhZF9kYXRhX2xpc3RbbGVuZ3RoXS5kZXNjXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zdGF0ZSA9IGVfYWRfbmF0aXZlX3N0YXRlLm5lZWRfc2hvd1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubmF0aXZlX3R5cGUgPSBlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZF9uYXRpdmVfZGF0YShkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIG9uTG9hZCAmJiBvbkxvYWQoe30sIGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5hZGRfbmF0aXZlX3Nob3dfY291bnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIHN5eXhfc2RrX3V0aWxzLnByZWxvYWRfbmF0aXZlX3RleHR1cmUoZGF0YS5pbWdVcmxMaXN0KVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudXBkYXRlX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxfdWkoZGF0YSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fc2hvdygpIHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fY2xvc2UocGFyYW0sIHJlcykge1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBvbl9lcnJvcihwYXJhbSwgZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiaWdjLS0tLS1zeXl4X2Fkdl9tYW5hZ2VyLS0tLS0tLWxvYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCBvbkVycm9yXCIsIGVycilcclxuICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDnu5Pnrpfljp/nlJ/nlYzpnaJcclxuICAgICAqIOW/hemhu+imgee7k+eul+WOn+eUn+ato+WcqOWxleekuuaJjeS8muaJp+ihjFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxfdWkobmF0aXZlX2RhdGEpIHtcclxuICAgICAgICBzeXl4X21hbmFnZXIubG9hZF92aWV3KHN5eXhfdmlldy5pbm5lcl9pbnRlcnN0aXRpYWwsIGZ1bmN0aW9uICh2aWV3KSB7XHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmlldy5yZXBvcnRfY2xpY2tfdXBkYXRlX3ZpZXcobmF0aXZlX2RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpITkuo7lsZXnpLrkuIrpmZDnmoTmg4XlhrXkuItcclxuICAgICAqIOagueaNruS4gOWumuinhOWImemAieaLqee8k+WtmOeahOWOn+eUn+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X25hdGl2ZV9kYXRhX2J5X2xpbWl0X21vZGVsKCkge1xyXG4gICAgICAgIGlmIChzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX25hdGl2ZV9kYXRhX2xpc3RfaXNfcmVwcm90KHRoaXMuX25hdGl2ZV9kYXRhX2xpc3QpKSB7XHJcbiAgICAgICAgICAgIC8v5YWo6YOo5pWw5o2u6YO95LiK5oql5pud5YWJ6L+H5LqGXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCB1c2Ugb2xkIGxvYWQgbmF0aXZlIGRhdGFcIilcclxuICAgICAgICAgICAgcmV0dXJuIHN5eXhfYWR2X21hbmFnZXIuZ2V0X21pbl9vcmRlcl9uYXRpdmVfZGF0YSh0aGlzLl9uYXRpdmVfZGF0YV9saXN0KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5pyJ5pWw5o2u5rKh5pyJ5LiK5oql6L+H5pud5YWJICDnlKjmnIDmlrDmlbDmja5cclxuICAgICAgICAgICAgcmV0dXJuIHN5eXhfYWR2X21hbmFnZXIuZ2V0X2xhdGVzdF9uYXRpdmVfZGF0YSh0aGlzLl9uYXRpdmVfZGF0YV9saXN0KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W5pyA5paw55qE5Y6f55Sf5pWw5o2uXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldF9uYXRpdmVfZGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9hZHZfbWFuYWdlci5nZXRfbmF0aXZlX2RhdGEoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YKo5a2Y5Y6f55Sf5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlX2RhdGEg5Y6f55Sf5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhZGRfbmF0aXZlX2RhdGEobmF0aXZlX2RhdGEpIHtcclxuICAgICAgICBpZiAoc3l5eF9hZHZfbWFuYWdlci5jaGVja19pc19vcGVuX29wcG9fcnVsZSgpKSB7XHJcbiAgICAgICAgICAgIHN5eXhfYWR2X21hbmFnZXIuYWRkX25hdGl2ZV9kYXRhKG5hdGl2ZV9kYXRhKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZV9kYXRhX2xpc3RbMF0gPSBuYXRpdmVfZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbmV4dF9jbGlja193cmFwX2NvdW50ID0gLTFcclxuICAgIHN0YXRpYyBzaG93X2NvdW50ID0gMFxyXG4gICAgc3RhdGljIHNldF9vbl9jbGlja19pbm5lcl9pbnRlcnN0aXRpYWxfYnRuKGNsaWNrX2JhY2sgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSA9IHN5eXhfbWFuYWdlci5nZXRfYnVzaW5lc3NfY29uZmlnKClcclxuICAgICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfaW5uZXJfaW5zdGl0aWFsX2NsaWNrX3dyYXBcIl0pIHtcclxuICAgICAgICAgICAgbGV0IHJ1bGUgPSB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pbm5lcl9pbnN0aXRpYWxfY2xpY2tfd3JhcFwiXS52YWx1ZVxyXG4gICAgICAgICAgICBpZiAocnVsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dF9jbGlja193cmFwX2NvdW50ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0X2NsaWNrX3dyYXBfY291bnQgPSBydWxlWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93X2NvdW50ID49IHRoaXMubmV4dF9jbGlja193cmFwX2NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBuYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsIGlzIGVhc3kgY2xpY2shXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0X2NsaWNrX3dyYXBfY291bnQgPSB0aGlzLnNob3dfY291bnQgKyBydWxlWzFdICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHJ1bGVbMl0gLSBydWxlWzFdICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dF9jbGlja193cmFwX2NvdW50IDwgcnVsZVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRfY2xpY2tfd3JhcF9jb3VudCA9IHJ1bGVbMF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBuYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsIG5leHQgZWFzeSBjbGljayBjb3VudO+8mlwiLCB0aGlzLm5leHRfY2xpY2tfd3JhcF9jb3VudClcclxuICAgICAgICAgICAgICAgICAgICBzeXl4X21hbmFnZXIuY2xpY2tfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbChjbGlja19iYWNrKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCBlYXN5IGNsaWNrIGlzIGNsb3NlIVwiKVxyXG4gICAgICAgIGNsaWNrX2JhY2sgJiYgY2xpY2tfYmFjaygpXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iXX0=