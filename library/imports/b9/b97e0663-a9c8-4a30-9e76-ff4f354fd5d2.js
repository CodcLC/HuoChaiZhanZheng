"use strict";
cc._RF.push(module, 'b97e0ZjqchKMJ52/081T9XS', 'ad_banner');
// syyx_sdk/controller/ad/ad_banner.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ad_banner = void 0;
var syyx_sdk_enum_1 = require("./../../configs/syyx_sdk_enum");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var syyx_manager_1 = require("../syyx_manager");
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var syyx_adv_manager_1 = require("./syyx_adv_manager");
var ad_oppo_banner_1 = require("./ad_oppo_banner");
var ad_banner = /** @class */ (function () {
    function ad_banner() {
    }
    /**
     * 初始化oppo首次广告cd
     */
    ad_banner.init_first_banner_cd = function () {
        var self = this;
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel == igc.e_channel_type.oppo_qg) {
            var first_banner_cd = 0;
            this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
            if (this._business_config_data && this._business_config_data["adv_banner_cd"]) {
                first_banner_cd = this._business_config_data["adv_banner_cd"].value[0];
                this.can_show_first = first_banner_cd <= 0;
                console.log("igc----- the banner's cd in oppo is", first_banner_cd);
            }
            this.first_banner_timer_id && clearTimeout(this.first_banner_timer_id);
            this.first_banner_timer_id = setTimeout(function () {
                self.can_show_first = true;
                if (self.need_show && self._ad_param) {
                    self.show_banner(self._ad_param.ad_type, self._ad_param.ad_pos_id, self._ad_param.onLoad, self._ad_param.onShow, self._ad_param.onClose, self._ad_param.onError);
                }
            }, first_banner_cd * 1000);
        }
    };
    /**
     * 自动刷新定时器
     */
    ad_banner.run_timer = function () {
        if (!this.is_run_timer) {
            this.is_run_timer = true;
            this.timer_func();
        }
    };
    ad_banner.timer_func = function () {
        var self = this;
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["banner_cool_time"]) {
            this.auto_update_cd = this._business_config_data["banner_cool_time"].value;
        }
        this.load_native_banner();
        var cd = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number(this.auto_update_cd);
        console.log("sdk------ next time to refresh banner is", cd);
        this.timer_id && clearTimeout(this.timer_id);
        this.timer_id = setTimeout(function () {
            self.timer_func();
        }, cd * 1000);
    };
    /**
     * UI层要展示普通banner或者原生banner
     */
    ad_banner.show_banner = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        this.need_show = true;
        this._normal_banner_id = ad_pos_id;
        this._native_banner_id = syyx_adv_manager_1.syyx_adv_manager._adv_config_data[ad_pos_id].backup_id;
        this._ad_param = {
            ad_type: ad_type,
            ad_pos_id: ad_pos_id,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError,
        };
        if (!this.can_show_first) {
            console.log("igc----- banner is in cooling time ");
            return;
        }
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            ad_oppo_banner_1.ad_oppo_banner.show_banner(ad_type, ad_pos_id, onLoad, onShow, onClose, onError);
            return;
        }
        // 上面条件充足，后面不执行
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            return;
        }
        this.run_timer();
    };
    /**
     *  检查当前是否需要展示banner
     */
    ad_banner.check_need_show_banner = function () {
        return this.need_show;
    };
    /**
     *  展示banner
     */
    ad_banner.auto_show_banner = function () {
        if (this._ad_param && this._ad_param.ad_type && this._ad_param.ad_pos_id) {
            this.show_banner(this._ad_param.ad_type, this._ad_param.ad_pos_id, this._ad_param.onLoad, this._ad_param.onShow, this._ad_param.onClose, this._ad_param.onError);
        }
        else {
            this.show_banner(igc.e_ad_type.banner, syyx_sdk_enum_1.e_ad_id.banner_hall, undefined, undefined, undefined, undefined);
        }
    };
    /**
    * ui层要隐藏banner或者原生banner
    * 隐藏后销毁定时器  直到下一次show_banner才会重新启动定时器
    */
    ad_banner.hide_banner = function () {
        this.need_show = false;
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            ad_oppo_banner_1.ad_oppo_banner.hide_banner();
            return;
        }
        if (!this.can_show_first) {
            console.log("igc----- banner is in cooling time ");
            return;
        }
        this.is_run_timer = false;
        this.hide_normal_banner();
        this.timer_id && clearTimeout(this.timer_id);
        this.timer_id = undefined;
    };
    /**
     * 加载原生banner数据
     * 会根据不同情况 转去加载普通banner
     */
    ad_banner.load_native_banner = function () {
        var self = this;
        //当前不需要展示任何banner
        if (!this.need_show) {
            self.hide_banner();
            return;
        }
        //不是oppo vivo 或者 没有设置原生bannerId 则设置定时器刷新普通banner
        if (!self._native_banner_id) {
            self.show_normal_banner();
            return;
        }
    };
    ad_banner.report_ad_click = function (ad_pos_id, native_data) {
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            ad_oppo_banner_1.ad_oppo_banner.report_ad_click(ad_pos_id, native_data);
            return;
        }
    };
    ad_banner.report_ad_show = function (ad_pos_id, native_data) {
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            ad_oppo_banner_1.ad_oppo_banner.report_ad_show(ad_pos_id, native_data);
            return;
        }
    };
    ad_banner.get_easy_click_protect_count = function () {
        var protect_count = 0;
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_banner_click_protect"]) {
            protect_count = this._business_config_data["native_banner_click_protect"].value[0];
        }
        return protect_count;
    };
    ad_banner.set_banenr_protect_model = function () {
        this.cur_protect_count = 0;
    };
    ad_banner.get_is_easy_click_model = function () {
        var protect_count = this.get_easy_click_protect_count();
        if (protect_count > 0) {
            if (this.cur_protect_count >= 0) {
                this.cur_protect_count++;
                if (this.cur_protect_count <= protect_count) {
                    return false;
                }
            }
        }
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_banner_click_switch"]) {
            if (this._business_config_data["native_banner_click_switch"].value[0] == 1) {
                var pro = this._business_config_data["native_banner_click_pro"].value[0];
                return Math.random() <= pro;
            }
        }
        return false;
    };
    ad_banner.set_normal_banner_switch = function (value) {
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            ad_oppo_banner_1.ad_oppo_banner.set_normal_banner_switch(value);
        }
    };
    /**
    * 显示普通banner
    */
    ad_banner.show_normal_banner = function () {
        if (this._business_config_data && this._business_config_data["show_normal_banner_switch"]) {
            if (this._business_config_data["show_normal_banner_switch"].value[0] == 0) {
                console.log("igc ----- normal banner switch is close");
                return;
            }
        }
        //vivo渠道限制一下  销毁banner10s后才能展示普通banner
        if (!this.can_show_vivo_banner && syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
            console.log("igc----- vivo ad_banner show_normal_banner create too often!!!");
            return;
        }
        var self = this;
        syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.banner, self._normal_banner_id, function onLoad(param, res) {
            self._ad_param.onLoad && self._ad_param.onLoad();
        }, function onShow() {
            self.normal_banner_showing = true;
            //banner展示成功后判断当前能否展示banner
            if (self.need_show) {
                self._ad_param.onShow && self._ad_param.onShow();
            }
            else {
                self.hide_normal_banner();
            }
        }, function onClose(param, res) {
            self._ad_param.onClose && self._ad_param.onClose();
        }, function onError(param, err) {
            console.log("igc------syyx_adv_manager show_normal_banner onError", err);
            self._ad_param.onError && self._ad_param.onError(param, err);
        });
    };
    ad_banner.hide_normal_banner = function () {
        var self = this;
        if (self._normal_banner_id) {
            //vivo渠道下  普通banner已经在显示  销毁的话记录10s内不能再次创建
            if (self.normal_banner_showing && syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                self.can_show_vivo_banner = false;
                this.banner_timer_id && clearTimeout(this.banner_timer_id);
                this.banner_timer_id = setTimeout(function () {
                    self.can_show_vivo_banner = true;
                }, 11000);
            }
            self.normal_banner_showing = false;
            syyx_manager_1.syyx_manager.destroy_ad(igc.e_ad_type.banner, self._normal_banner_id);
        }
    };
    /**
     * 玩家手动点击了关闭banner
     */
    ad_banner.finger_close_banner = function () {
        var self = this;
        if (this.is_oppo_vivo_hw() && this._business_config_data && this._business_config_data["finger_close_banner_switch"]) {
            if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
                ad_oppo_banner_1.ad_oppo_banner.finger_close_banner();
                return;
            }
            if (this._business_config_data["finger_close_banner_switch"].value[0] == 1) {
                var cd = this._business_config_data["finger_close_banner_switch"].value[1] || 60;
                this.hide_banner();
                this.can_show_first = false;
                setTimeout(function () {
                    self.can_show_first = true;
                }, cd * 1000);
            }
        }
    };
    ad_banner.is_oppo_vivo_hw = function () {
        return syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web;
    };
    /**
    * 远端运营配置
    */
    ad_banner._business_config_data = {};
    /**
     * 配置表原生banner广告Id
     */
    ad_banner._native_banner_id = undefined;
    /**
     * 配置表普通banner广告Id
     */
    ad_banner._normal_banner_id = undefined;
    /**
     * banner自动刷新时间
     */
    ad_banner.auto_update_cd = [20, 20];
    /**
     * 刷新定时器是否开启
     */
    ad_banner.is_run_timer = false;
    /**
     * 当前是否需要展示banner
     */
    ad_banner.need_show = true;
    /**
     * 能否显示第一个banner
     */
    ad_banner.can_show_first = true;
    /**
     * oppo首次展示广告cd回调定时器id
     */
    ad_banner.first_banner_timer_id = undefined;
    /**
     * 普通Banner是否在显示
     */
    ad_banner.normal_banner_showing = false;
    /**
    * 能否显示vivo普通Banner
    */
    ad_banner.can_show_vivo_banner = true;
    ad_banner.cur_protect_count = -1;
    return ad_banner;
}());
exports.ad_banner = ad_banner;

cc._RF.pop();