
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/ad/ad_native_icon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f723a+cF1VHgKqwDDNUF9YK', 'ad_native_icon');
// syyx_sdk/controller/ad/ad_native_icon.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ad_native_icon = void 0;
var model_1 = require("../../model/model");
var syyx_sdk_enum_1 = require("../../configs/syyx_sdk_enum");
var syyx_manager_1 = require("../syyx_manager");
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var syyx_adv_manager_1 = require("./syyx_adv_manager");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var ad_banner_1 = require("./ad_banner");
var ad_native_icon = /** @class */ (function () {
    function ad_native_icon() {
    }
    /**
     * 自动刷新定时器
     */
    ad_native_icon.run_timer = function () {
        if (!this.is_run_timer && this.is_oppo_vivo()) { // 一开始is_run_timerfalse
            this.is_run_timer = true;
            this.timer_func();
        }
    };
    ad_native_icon.timer_func = function () {
        var self = this;
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_icon_cool_time"]) {
            this.auto_update_cd = this._business_config_data["native_icon_cool_time"].value;
        }
        this.load_native_icon();
        var cd = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number(this.auto_update_cd); // 20秒
        this.timer_id && clearTimeout(this.timer_id);
        this.timer_id = setTimeout(function () {
            self.timer_func();
        }, cd * 1000);
    };
    ad_native_icon.report_ad_click = function (ad_pos_id, native_data) {
        if (this._ad_pos_id != ad_pos_id) {
            return;
        }
        console.log("igc ----- has in native icon 's report click ");
        //上报的是原生banner点击  隐藏原生bannerUi 重新请求新的原生banner数据
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_icon_report_click_update_switch"]) {
            if (this._business_config_data["native_icon_report_click_update_switch"].value[0] == 1) { // 原生icon点击上报后立即刷新
                this.destroy_timer();
                this.icon_parent && this.show_native_icon(this.icon_parent, this._ad_param.ad_type, this._ad_param.ad_pos_id, this._ad_param.onLoad, this._ad_param.onShow, this._ad_param.onClose, this._ad_param.onError);
            }
        }
    };
    ad_native_icon.report_ad_show = function (ad_pos_id, native_data) {
        if (this._ad_pos_id == ad_pos_id) {
        }
    };
    ad_native_icon.show_native_icon = function (parent, ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        this._ad_pos_id = ad_pos_id;
        this._ad_param = {
            ad_type: ad_type,
            ad_pos_id: ad_pos_id,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError,
        };
        this.need_show = true;
        this.icon_parent = parent;
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            return;
        }
        //原生icon远端配置开关是否开启
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_icon_switch"]) {
            if (this._business_config_data["native_icon_switch"].value[0] == 1) {
                this.run_timer();
            }
            else {
                console.log("sdk----- config - native icon is close");
            }
        }
    };
    ad_native_icon.hide_native_icon = function () {
        this.need_show = false;
        this.icon_parent = undefined;
        this.hide_native_icon_ui();
        this.destroy_timer();
    };
    ad_native_icon.destroy_timer = function () {
        this.is_run_timer = false;
        //销毁定时器
        this.timer_id && clearTimeout(this.timer_id);
        this.timer_id = undefined;
    };
    /**
    * 加载原生插屏
    * @param call_back 加载数据成功回调
    */
    ad_native_icon.load_native_icon = function (call_back) {
        var self = this;
        if (!ad_banner_1.ad_banner.can_show_first) {
            console.log("igc----- is in oppo first ad cd");
            return;
        }
        //当前不需要展示任何banner
        if (!this.need_show) {
            this.hide_native_icon_ui();
            return;
        }
        var native_data = this.get_native_data();
        //上一个加载的原生banner没有展示过
        if (native_data && native_data.state == syyx_sdk_enum_1.e_ad_native_state.need_show) {
            this.show_native_icon_ui();
            return;
        }
        //web渠道  返回假数据
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            var data = new model_1.native_ad_data();
            data.id = igc.utils_manager.get_random_name();
            data.adPosId = this._ad_pos_id;
            data.adId = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([100, 200]);
            data.adUnitId = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([0, 100000]);
            data.imgUrlList = "https://static-cdn.llewan.com/h5/ddsdk/plugin/share_img.jpg";
            data.title = "原生icon标题" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([100, 200]);
            data.desc = "原生icon描述" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([100, 200]);
            data.state = syyx_sdk_enum_1.e_ad_native_state.need_show;
            data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_icon;
            this.add_native_data(data);
            this._ad_param.onLoad && this._ad_param.onLoad({}, data);
            this.show_native_icon_ui();
            call_back && call_back();
            return;
        }
        syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.native, this._ad_pos_id, function on_load(param, ad_data_list) {
            console.log("igc-----syyx_adv_manager-------load_native_icon on_load", ad_data_list);
            //返回数据异常
            if (ad_data_list == undefined || !ad_data_list[0]) {
            }
            else {
                var length = 0;
                if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                    //vivo渠道只取最后一个位置
                    length = ad_data_list.length - 1;
                }
                var imgUrlList = void 0;
                if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
                    imgUrlList = syyx_sdk_utils_1.syyx_sdk_utils.format_remote_texture_url(ad_data_list[length].iconUrlList[0]);
                }
                else {
                    imgUrlList = syyx_sdk_utils_1.syyx_sdk_utils.format_remote_texture_url(ad_data_list[length].imgUrlList[0]);
                }
                var data = new model_1.native_ad_data();
                data.id = igc.utils_manager.get_random_name();
                data.adPosId = self._ad_pos_id;
                data.adId = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(self._ad_pos_id);
                data.adUnitId = ad_data_list[length].adUnitId;
                data.imgUrlList = imgUrlList;
                data.title = ad_data_list[length].title;
                data.desc = ad_data_list[length].desc;
                data.state = syyx_sdk_enum_1.e_ad_native_state.need_show;
                data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_icon;
                self.add_native_data(data); // 存好数据
                self._ad_param.onLoad && self._ad_param.onLoad({}, data);
                self.show_native_icon_ui(); // 展示数据
            }
        }, function on_show() {
        }, function on_close(param, res) {
        }, function on_error(param, err) {
            console.error("igc-----syyx_adv_manager-------load_native_icon onError", err);
            //原生icon报错就用之前的老数据
            var native_data = self.get_native_data();
            if (native_data) {
                self.show_native_icon_ui();
            }
            self._ad_param.onError && self._ad_param.onError();
        });
    };
    /**
    * 展示原生IconUi
    */
    ad_native_icon.show_native_icon_ui = function () {
        var self = this;
        self.hide_native_icon_ui();
        if (!this.need_show) {
            console.log("igc----- the current interface doesn't need to show native icon so that do not refresh native data");
            return;
        }
        if (!this.icon_parent) {
            console.log("igc----- the native icon's parent node is not exist");
            return;
        }
        if (this.is_oppo_vivo()) {
            var native_data_1 = this.get_native_data();
            //展示原生IconUI
            if (this.need_show && native_data_1) {
                syyx_manager_1.syyx_manager.create_native_icon(function (view) {
                    view.show && view.show(self.icon_parent, native_data_1);
                });
            }
        }
    };
    /**
     * 隐藏原生IconUi
     */
    ad_native_icon.hide_native_icon_ui = function () {
        if (this.is_oppo_vivo()) {
            //隐藏原生iconUI
            syyx_manager_1.syyx_manager.create_native_icon(function (view) {
                view.hide && view.hide();
            });
        }
    };
    ad_native_icon.is_oppo_vivo = function () {
        var is_oppo = syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg
            || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg
            || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web;
        return is_oppo;
    };
    /**
     * 获取最新的原生Banner数据
     */
    ad_native_icon.get_native_data = function () {
        //是否启动OPPO新规
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) { // ov为ture
            if (syyx_adv_manager_1.syyx_adv_manager.check_native_data_list_is_reprot(this._native_data_list)) {
                //全部数据都上报曝光过了
                console.log("igc----- ad_native_icon use old load native data");
                return syyx_adv_manager_1.syyx_adv_manager.get_min_order_native_data(this._native_data_list);
            }
            else {
                //有数据没有上报过曝光  用最新数据
                return syyx_adv_manager_1.syyx_adv_manager.get_latest_native_data(this._native_data_list);
            }
        }
        else {
            return this._native_data_list[0];
        }
    };
    /**
     * 储存原生数据
     * @param native_data 原生数据
     */
    ad_native_icon.add_native_data = function (native_data) {
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            for (var i in this._native_data_list) {
                if (this._native_data_list[i].adUnitId == native_data.adUnitId) {
                    return;
                }
            }
            var length = syyx_adv_manager_1.syyx_adv_manager.get_oppo_native_cache_max_length(); // 20
            //判断缓存数组长度是否超标
            if (this._native_data_list.length >= length) {
                this._native_data_list.splice(0, 1);
            }
            this._native_data_list.push(native_data);
        }
        else {
            this._native_data_list[0] = native_data;
        }
    };
    /**
      * 原生数据
      */
    ad_native_icon._native_data_list = [];
    /**
    * 远端运营配置
    */
    ad_native_icon._business_config_data = {};
    /**
     * banner自动刷新时间
     */
    ad_native_icon.auto_update_cd = [20, 20];
    /**
     * 刷新定时器是否开启
     */
    ad_native_icon.is_run_timer = false;
    /**
     * 当前是否需要展示banner
     */
    ad_native_icon.need_show = true;
    return ad_native_icon;
}());
exports.ad_native_icon = ad_native_icon;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXGFkXFxhZF9uYXRpdmVfaWNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBbUQ7QUFDbkQsNkRBQWtGO0FBQ2xGLGdEQUErQztBQUMvQyxpRUFBMkQ7QUFDM0QsdURBQXNEO0FBQ3RELDZEQUE0RDtBQUM1RCx5Q0FBd0M7QUFFeEM7SUFBQTtJQThUQSxDQUFDO0lBclJHOztPQUVHO0lBQ0ksd0JBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSx1QkFBdUI7WUFDcEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7WUFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1NBQ3BCO0lBQ0wsQ0FBQztJQUdNLHlCQUFVLEdBQWpCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2YsSUFBSSxDQUFDLHFCQUFxQixHQUFHLDJCQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUMvRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsdUJBQXVCLENBQUMsRUFBRTtZQUNuRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEtBQUssQ0FBQTtTQUNsRjtRQUNELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1FBQ3ZCLElBQUksRUFBRSxHQUFHLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUMsTUFBTTtRQUVyRSxJQUFJLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUs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SUFFN0I7O01BRUU7SUFDSyxvQ0FBcUIsR0FBRyxFQUFFLENBQUM7SUFZbEM7O09BRUc7SUFDSSw2QkFBYyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRWhDOztPQUVHO0lBQ0ksMkJBQVksR0FBRyxLQUFLLENBQUE7SUFPM0I7O09BRUc7SUFDSSx3QkFBUyxHQUFHLElBQUksQ0FBQTtJQXVSM0IscUJBQUM7Q0E5VEQsQUE4VEMsSUFBQTtBQTlUWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG5hdGl2ZV9hZF9kYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVsL21vZGVsXCI7XHJcbmltcG9ydCB7IGVfYWRfbmF0aXZlX3N0YXRlLCBlX2FkX25hdGl2ZV90eXBlIH0gZnJvbSBcIi4uLy4uL2NvbmZpZ3Mvc3l5eF9zZGtfZW51bVwiO1xyXG5pbXBvcnQgeyBzeXl4X21hbmFnZXIgfSBmcm9tIFwiLi4vc3l5eF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHN5eXhfY29uc3QgfSBmcm9tIFwiLi4vLi4vY29uZmlncy9zeXl4X3Nka19jb25maWdcIjtcclxuaW1wb3J0IHsgc3l5eF9hZHZfbWFuYWdlciB9IGZyb20gXCIuL3N5eXhfYWR2X21hbmFnZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9zZGtfdXRpbHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3l5eF9zZGtfdXRpbHNcIjtcclxuaW1wb3J0IHsgYWRfYmFubmVyIH0gZnJvbSBcIi4vYWRfYmFubmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgYWRfbmF0aXZlX2ljb24ge1xyXG4gICAgLyoqXHJcbiAgICAgICog5Y6f55Sf5pWw5o2uXHJcbiAgICAgICovXHJcbiAgICBzdGF0aWMgX25hdGl2ZV9kYXRhX2xpc3QgPSBbXVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDov5znq6/ov5DokKXphY3nva5cclxuICAgICovXHJcbiAgICBzdGF0aWMgX2J1c2luZXNzX2NvbmZpZ19kYXRhID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDphY3nva7ooajlub/lkYppZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX2FkX3Bvc19pZFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65bm/5ZGK5pe25Lyg5YWl55qE5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfYWRfcGFyYW1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJhbm5lcuiHquWKqOWIt+aWsOaXtumXtFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXV0b191cGRhdGVfY2QgPSBbMjAsIDIwXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5a6a5pe25Zmo5piv5ZCm5byA5ZCvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc19ydW5fdGltZXIgPSBmYWxzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55SfaWNvbiDniLboioLngrlcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGljb25fcGFyZW50XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3mmK/lkKbpnIDopoHlsZXnpLpiYW5uZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5lZWRfc2hvdyA9IHRydWVcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiHquWKqOWIt+aWsOWumuaXtuWZqFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcnVuX3RpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc19ydW5fdGltZXIgJiYgdGhpcy5pc19vcHBvX3Zpdm8oKSkgeyAvLyDkuIDlvIDlp4tpc19ydW5fdGltZXJmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmlzX3J1bl90aW1lciA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy50aW1lcl9mdW5jKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHRpbWVyX2lkXHJcbiAgICBzdGF0aWMgdGltZXJfZnVuYygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSA9IHN5eXhfbWFuYWdlci5nZXRfYnVzaW5lc3NfY29uZmlnKClcclxuICAgICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfaWNvbl9jb29sX3RpbWVcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvX3VwZGF0ZV9jZCA9IHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2ljb25fY29vbF90aW1lXCJdLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZF9uYXRpdmVfaWNvbigpXHJcbiAgICAgICAgbGV0IGNkID0gc3l5eF9zZGtfdXRpbHMuZ2V0X3JhbmRvbV9udW1iZXIodGhpcy5hdXRvX3VwZGF0ZV9jZCkgLy8gMjDnp5JcclxuXHJcbiAgICAgICAgdGhpcy50aW1lcl9pZCAmJiBjbGVhclRpbWVvdXQodGhpcy50aW1lcl9pZClcclxuICAgICAgICB0aGlzLnRpbWVyX2lkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYudGltZXJfZnVuYygpXHJcbiAgICAgICAgfSwgY2QgKiAxMDAwKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZXBvcnRfYWRfY2xpY2soYWRfcG9zX2lkOiBzdHJpbmcsIG5hdGl2ZV9kYXRhPykge1xyXG4gICAgICAgIGlmICh0aGlzLl9hZF9wb3NfaWQgIT0gYWRfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcImlnYyAtLS0tLSBoYXMgaW4gbmF0aXZlIGljb24gJ3MgcmVwb3J0IGNsaWNrIFwiKVxyXG5cclxuICAgICAgICAvL+S4iuaKpeeahOaYr+WOn+eUn2Jhbm5lcueCueWHuyAg6ZqQ6JeP5Y6f55SfYmFubmVyVWkg6YeN5paw6K+35rGC5paw55qE5Y6f55SfYmFubmVy5pWw5o2uXHJcbiAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2ljb25fcmVwb3J0X2NsaWNrX3VwZGF0ZV9zd2l0Y2hcIl0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2ljb25fcmVwb3J0X2NsaWNrX3VwZGF0ZV9zd2l0Y2hcIl0udmFsdWVbMF0gPT0gMSkgeyAvLyDljp/nlJ9pY29u54K55Ye75LiK5oql5ZCO56uL5Y2z5Yi35pawXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3lfdGltZXIoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uX3BhcmVudCAmJiB0aGlzLnNob3dfbmF0aXZlX2ljb24odGhpcy5pY29uX3BhcmVudCwgdGhpcy5fYWRfcGFyYW0uYWRfdHlwZSwgdGhpcy5fYWRfcGFyYW0uYWRfcG9zX2lkLCB0aGlzLl9hZF9wYXJhbS5vbkxvYWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRfcGFyYW0ub25TaG93LCB0aGlzLl9hZF9wYXJhbS5vbkNsb3NlLCB0aGlzLl9hZF9wYXJhbS5vbkVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZXBvcnRfYWRfc2hvdyhhZF9wb3NfaWQ6IHN0cmluZywgbmF0aXZlX2RhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy5fYWRfcG9zX2lkID09IGFkX3Bvc19pZCkge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2hvd19uYXRpdmVfaWNvbihwYXJlbnQsIGFkX3R5cGU/OiBpZ2MuZV9hZF90eXBlLCBhZF9wb3NfaWQ/OiBzdHJpbmcsIG9uTG9hZD86IEZ1bmN0aW9uLCBvblNob3c/OiBGdW5jdGlvbiwgb25DbG9zZT86IEZ1bmN0aW9uLCBvbkVycm9yPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLl9hZF9wb3NfaWQgPSBhZF9wb3NfaWRcclxuICAgICAgICB0aGlzLl9hZF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgYWRfdHlwZTogYWRfdHlwZSxcclxuICAgICAgICAgICAgYWRfcG9zX2lkOiBhZF9wb3NfaWQsXHJcbiAgICAgICAgICAgIG9uTG9hZDogb25Mb2FkLFxyXG4gICAgICAgICAgICBvblNob3c6IG9uU2hvdyxcclxuICAgICAgICAgICAgb25DbG9zZTogb25DbG9zZSxcclxuICAgICAgICAgICAgb25FcnJvcjogb25FcnJvcixcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubmVlZF9zaG93ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuaWNvbl9wYXJlbnQgPSBwYXJlbnRcclxuXHJcbiAgICAgICAgbGV0IGFkX2lkID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfY2hhbm5lbF9hZF9pZChhZF9wb3NfaWQpXHJcbiAgICAgICAgaWYgKCFhZF9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ljp/nlJ9pY29u6L+c56uv6YWN572u5byA5YWz5piv5ZCm5byA5ZCvXHJcbiAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2ljb25fc3dpdGNoXCJdKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pY29uX3N3aXRjaFwiXS52YWx1ZVswXSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bl90aW1lcigpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNkay0tLS0tIGNvbmZpZyAtIG5hdGl2ZSBpY29uIGlzIGNsb3NlXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhpZGVfbmF0aXZlX2ljb24oKSB7XHJcbiAgICAgICAgdGhpcy5uZWVkX3Nob3cgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaWNvbl9wYXJlbnQgPSB1bmRlZmluZWRcclxuICAgICAgICB0aGlzLmhpZGVfbmF0aXZlX2ljb25fdWkoKVxyXG4gICAgICAgIHRoaXMuZGVzdHJveV90aW1lcigpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGRlc3Ryb3lfdGltZXIoKSB7XHJcbiAgICAgICAgdGhpcy5pc19ydW5fdGltZXIgPSBmYWxzZVxyXG4gICAgICAgIC8v6ZSA5q+B5a6a5pe25ZmoXHJcbiAgICAgICAgdGhpcy50aW1lcl9pZCAmJiBjbGVhclRpbWVvdXQodGhpcy50aW1lcl9pZClcclxuICAgICAgICB0aGlzLnRpbWVyX2lkID0gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWKoOi9veWOn+eUn+aPkuWxj1xyXG4gICAgKiBAcGFyYW0gY2FsbF9iYWNrIOWKoOi9veaVsOaNruaIkOWKn+Wbnuiwg1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX25hdGl2ZV9pY29uKGNhbGxfYmFjaz8pIHtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIGlmICghYWRfYmFubmVyLmNhbl9zaG93X2ZpcnN0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gaXMgaW4gb3BwbyBmaXJzdCBhZCBjZFwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5b2T5YmN5LiN6ZyA6KaB5bGV56S65Lu75L2VYmFubmVyXHJcbiAgICAgICAgaWYgKCF0aGlzLm5lZWRfc2hvdykge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVfbmF0aXZlX2ljb25fdWkoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuYXRpdmVfZGF0YSA9IHRoaXMuZ2V0X25hdGl2ZV9kYXRhKClcclxuXHJcbiAgICAgICAgLy/kuIrkuIDkuKrliqDovb3nmoTljp/nlJ9iYW5uZXLmsqHmnInlsZXnpLrov4dcclxuICAgICAgICBpZiAobmF0aXZlX2RhdGEgJiYgbmF0aXZlX2RhdGEuc3RhdGUgPT0gZV9hZF9uYXRpdmVfc3RhdGUubmVlZF9zaG93KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd19uYXRpdmVfaWNvbl91aSgpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy93ZWLmuKDpgZMgIOi/lOWbnuWBh+aVsOaNrlxyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS53ZWIpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXcgbmF0aXZlX2FkX2RhdGEoKVxyXG4gICAgICAgICAgICBkYXRhLmlkID0gaWdjLnV0aWxzX21hbmFnZXIuZ2V0X3JhbmRvbV9uYW1lKClcclxuICAgICAgICAgICAgZGF0YS5hZFBvc0lkID0gdGhpcy5fYWRfcG9zX2lkXHJcbiAgICAgICAgICAgIGRhdGEuYWRJZCA9IHN5eXhfc2RrX3V0aWxzLmdldF9yYW5kb21fbnVtYmVyKFsxMDAsIDIwMF0pXHJcbiAgICAgICAgICAgIGRhdGEuYWRVbml0SWQgPSBzeXl4X3Nka191dGlscy5nZXRfcmFuZG9tX251bWJlcihbMCwgMTAwMDAwXSlcclxuICAgICAgICAgICAgZGF0YS5pbWdVcmxMaXN0ID0gXCJodHRwczovL3N0YXRpYy1jZG4ubGxld2FuLmNvbS9oNS9kZHNkay9wbHVnaW4vc2hhcmVfaW1nLmpwZ1wiXHJcbiAgICAgICAgICAgIGRhdGEudGl0bGUgPSBcIuWOn+eUn2ljb27moIfpophcIiArIHN5eXhfc2RrX3V0aWxzLmdldF9yYW5kb21fbnVtYmVyKFsxMDAsIDIwMF0pXHJcbiAgICAgICAgICAgIGRhdGEuZGVzYyA9IFwi5Y6f55SfaWNvbuaPj+i/sFwiICsgc3l5eF9zZGtfdXRpbHMuZ2V0X3JhbmRvbV9udW1iZXIoWzEwMCwgMjAwXSlcclxuICAgICAgICAgICAgZGF0YS5zdGF0ZSA9IGVfYWRfbmF0aXZlX3N0YXRlLm5lZWRfc2hvd1xyXG4gICAgICAgICAgICBkYXRhLm5hdGl2ZV90eXBlID0gZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfaWNvblxyXG4gICAgICAgICAgICB0aGlzLmFkZF9uYXRpdmVfZGF0YShkYXRhKVxyXG4gICAgICAgICAgICB0aGlzLl9hZF9wYXJhbS5vbkxvYWQgJiYgdGhpcy5fYWRfcGFyYW0ub25Mb2FkKHt9LCBkYXRhKVxyXG4gICAgICAgICAgICB0aGlzLnNob3dfbmF0aXZlX2ljb25fdWkoKVxyXG4gICAgICAgICAgICBjYWxsX2JhY2sgJiYgY2FsbF9iYWNrKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzeXl4X21hbmFnZXIuY3JlYXRlX2FkKGlnYy5lX2FkX3R5cGUubmF0aXZlLCB0aGlzLl9hZF9wb3NfaWQsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uX2xvYWQocGFyYW0sIGFkX2RhdGFfbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLXN5eXhfYWR2X21hbmFnZXItLS0tLS0tbG9hZF9uYXRpdmVfaWNvbiBvbl9sb2FkXCIsIGFkX2RhdGFfbGlzdClcclxuICAgICAgICAgICAgICAgIC8v6L+U5Zue5pWw5o2u5byC5bi4XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRfZGF0YV9saXN0ID09IHVuZGVmaW5lZCB8fCAhYWRfZGF0YV9saXN0WzBdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS52aXZvX3FnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdml2b+a4oOmBk+WPquWPluacgOWQjuS4gOS4quS9jee9rlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBhZF9kYXRhX2xpc3QubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltZ1VybExpc3RcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUub3Bwb19xZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWdVcmxMaXN0ID0gc3l5eF9zZGtfdXRpbHMuZm9ybWF0X3JlbW90ZV90ZXh0dXJlX3VybChhZF9kYXRhX2xpc3RbbGVuZ3RoXS5pY29uVXJsTGlzdFswXSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWdVcmxMaXN0ID0gc3l5eF9zZGtfdXRpbHMuZm9ybWF0X3JlbW90ZV90ZXh0dXJlX3VybChhZF9kYXRhX2xpc3RbbGVuZ3RoXS5pbWdVcmxMaXN0WzBdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXcgbmF0aXZlX2FkX2RhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaWQgPSBpZ2MudXRpbHNfbWFuYWdlci5nZXRfcmFuZG9tX25hbWUoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWRQb3NJZCA9IHNlbGYuX2FkX3Bvc19pZFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWRJZCA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2NoYW5uZWxfYWRfaWQoc2VsZi5fYWRfcG9zX2lkKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWRVbml0SWQgPSBhZF9kYXRhX2xpc3RbbGVuZ3RoXS5hZFVuaXRJZFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaW1nVXJsTGlzdCA9IGltZ1VybExpc3RcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnRpdGxlID0gYWRfZGF0YV9saXN0W2xlbmd0aF0udGl0bGVcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmRlc2MgPSBhZF9kYXRhX2xpc3RbbGVuZ3RoXS5kZXNjXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zdGF0ZSA9IGVfYWRfbmF0aXZlX3N0YXRlLm5lZWRfc2hvd1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubmF0aXZlX3R5cGUgPSBlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9pY29uXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRfbmF0aXZlX2RhdGEoZGF0YSkgLy8g5a2Y5aW95pWw5o2uXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fYWRfcGFyYW0ub25Mb2FkICYmIHNlbGYuX2FkX3BhcmFtLm9uTG9hZCh7fSwgZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dfbmF0aXZlX2ljb25fdWkoKSAvLyDlsZXnpLrmlbDmja5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fc2hvdygpIHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fY2xvc2UocGFyYW0sIHJlcykge1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBvbl9lcnJvcihwYXJhbSwgZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiaWdjLS0tLS1zeXl4X2Fkdl9tYW5hZ2VyLS0tLS0tLWxvYWRfbmF0aXZlX2ljb24gb25FcnJvclwiLCBlcnIpXHJcblxyXG4gICAgICAgICAgICAgICAgLy/ljp/nlJ9pY29u5oql6ZSZ5bCx55So5LmL5YmN55qE6ICB5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBsZXQgbmF0aXZlX2RhdGEgPSBzZWxmLmdldF9uYXRpdmVfZGF0YSgpXHJcbiAgICAgICAgICAgICAgICBpZiAobmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dfbmF0aXZlX2ljb25fdWkoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuX2FkX3BhcmFtLm9uRXJyb3IgJiYgc2VsZi5fYWRfcGFyYW0ub25FcnJvcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWxleekuuWOn+eUn0ljb25VaVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBzaG93X25hdGl2ZV9pY29uX3VpKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHNlbGYuaGlkZV9uYXRpdmVfaWNvbl91aSgpXHJcbiAgICAgICAgaWYgKCF0aGlzLm5lZWRfc2hvdykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHRoZSBjdXJyZW50IGludGVyZmFjZSBkb2Vzbid0IG5lZWQgdG8gc2hvdyBuYXRpdmUgaWNvbiBzbyB0aGF0IGRvIG5vdCByZWZyZXNoIG5hdGl2ZSBkYXRhXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmljb25fcGFyZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gdGhlIG5hdGl2ZSBpY29uJ3MgcGFyZW50IG5vZGUgaXMgbm90IGV4aXN0XCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNfb3Bwb192aXZvKCkpIHtcclxuICAgICAgICAgICAgbGV0IG5hdGl2ZV9kYXRhID0gdGhpcy5nZXRfbmF0aXZlX2RhdGEoKVxyXG4gICAgICAgICAgICAvL+WxleekuuWOn+eUn0ljb25VSVxyXG4gICAgICAgICAgICBpZiAodGhpcy5uZWVkX3Nob3cgJiYgbmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgIHN5eXhfbWFuYWdlci5jcmVhdGVfbmF0aXZlX2ljb24oZnVuY3Rpb24gKHZpZXcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnNob3cgJiYgdmlldy5zaG93KHNlbGYuaWNvbl9wYXJlbnQsIG5hdGl2ZV9kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+WOn+eUn0ljb25VaVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZV9uYXRpdmVfaWNvbl91aSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc19vcHBvX3Zpdm8oKSkge1xyXG4gICAgICAgICAgICAvL+makOiXj+WOn+eUn2ljb25VSVxyXG4gICAgICAgICAgICBzeXl4X21hbmFnZXIuY3JlYXRlX25hdGl2ZV9pY29uKGZ1bmN0aW9uICh2aWV3KSB7XHJcbiAgICAgICAgICAgICAgICB2aWV3LmhpZGUgJiYgdmlldy5oaWRlKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzX29wcG9fdml2bygpIHtcclxuICAgICAgICBsZXQgaXNfb3BwbyA9IHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLm9wcG9fcWdcclxuICAgICAgICAgICAgfHwgc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUudml2b19xZ1xyXG4gICAgICAgICAgICB8fCBzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS53ZWJcclxuXHJcbiAgICAgICAgcmV0dXJuIGlzX29wcG9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluacgOaWsOeahOWOn+eUn0Jhbm5lcuaVsOaNrlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X25hdGl2ZV9kYXRhKCkge1xyXG4gICAgICAgIC8v5piv5ZCm5ZCv5YqoT1BQT+aWsOinhFxyXG4gICAgICAgIGlmIChzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX2lzX29wZW5fb3Bwb19ydWxlKCkpIHsgLy8gb3bkuLp0dXJlXHJcbiAgICAgICAgICAgIGlmIChzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX25hdGl2ZV9kYXRhX2xpc3RfaXNfcmVwcm90KHRoaXMuX25hdGl2ZV9kYXRhX2xpc3QpKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WFqOmDqOaVsOaNrumDveS4iuaKpeabneWFiei/h+S6hlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBhZF9uYXRpdmVfaWNvbiB1c2Ugb2xkIGxvYWQgbmF0aXZlIGRhdGFcIilcclxuICAgICAgICAgICAgICAgIHJldHVybiBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9taW5fb3JkZXJfbmF0aXZlX2RhdGEodGhpcy5fbmF0aXZlX2RhdGFfbGlzdClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v5pyJ5pWw5o2u5rKh5pyJ5LiK5oql6L+H5pud5YWJICDnlKjmnIDmlrDmlbDmja5cclxuICAgICAgICAgICAgICAgIHJldHVybiBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9sYXRlc3RfbmF0aXZlX2RhdGEodGhpcy5fbmF0aXZlX2RhdGFfbGlzdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYXRpdmVfZGF0YV9saXN0WzBdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YKo5a2Y5Y6f55Sf5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlX2RhdGEg5Y6f55Sf5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhZGRfbmF0aXZlX2RhdGEobmF0aXZlX2RhdGEpIHtcclxuICAgICAgICBpZiAoc3l5eF9hZHZfbWFuYWdlci5jaGVja19pc19vcGVuX29wcG9fcnVsZSgpKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5fbmF0aXZlX2RhdGFfbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZV9kYXRhX2xpc3RbaV0uYWRVbml0SWQgPT0gbmF0aXZlX2RhdGEuYWRVbml0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfb3Bwb19uYXRpdmVfY2FjaGVfbWF4X2xlbmd0aCgpIC8vIDIwXHJcbiAgICAgICAgICAgIC8v5Yik5pat57yT5a2Y5pWw57uE6ZW/5bqm5piv5ZCm6LaF5qCHXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVfZGF0YV9saXN0Lmxlbmd0aCA+PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25hdGl2ZV9kYXRhX2xpc3Quc3BsaWNlKDAsIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlX2RhdGFfbGlzdC5wdXNoKG5hdGl2ZV9kYXRhKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZV9kYXRhX2xpc3RbMF0gPSBuYXRpdmVfZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==