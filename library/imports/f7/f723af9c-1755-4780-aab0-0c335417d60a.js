"use strict";
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