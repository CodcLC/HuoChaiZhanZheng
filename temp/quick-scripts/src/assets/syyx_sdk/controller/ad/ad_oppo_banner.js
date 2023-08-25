"use strict";
cc._RF.push(module, '10196p68lVF/5YENwMuBOG3', 'ad_oppo_banner');
// syyx_sdk/controller/ad/ad_oppo_banner.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ad_oppo_banner = void 0;
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var syyx_sdk_enum_1 = require("../../configs/syyx_sdk_enum");
var model_1 = require("../../model/model");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var syyx_manager_1 = require("../syyx_manager");
var ad_banner_1 = require("./ad_banner");
var syyx_adv_manager_1 = require("./syyx_adv_manager");
var ad_oppo_banner = /** @class */ (function () {
    function ad_oppo_banner() {
    }
    /**
     * 时间段内的banner展示刷新时间刷新时间
     */
    ad_oppo_banner.get_oppo_banner_show_update_time = function () {
        var play_game_time = syyx_adv_manager_1.syyx_adv_manager.get_play_game_time();
        var update_time_arr = undefined;
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["oppo_banner_cool_time"]) {
            update_time_arr = this._business_config_data["oppo_banner_cool_time"].value; // [[0, 120, 10], [121, 180, 11], [181, 240, 12]]
        }
        if (!update_time_arr || update_time_arr.length <= 0) {
            //默认值
            return 10;
        }
        var cd = 0;
        var last_arr = [];
        for (var i in update_time_arr) {
            last_arr = update_time_arr[i];
            if (update_time_arr[i][0] <= play_game_time && update_time_arr[i][1] >= play_game_time) {
                cd = update_time_arr[i][2];
                break;
            }
        }
        return cd || last_arr[2];
    };
    /**
     * 自动刷新定时器
     */
    ad_oppo_banner.run_timer = function () {
        var self = this;
        if (!this.is_run_timer) {
            this.is_run_timer = true;
            this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
            self.load_native_banner();
            setInterval(function () {
                if (self.banner_showing) {
                    self.banner_show_time++;
                }
                // if (self.banner_show_time > 0 && self.banner_show_time % self.update_cd == 0) { // update_cd 默认为5 // 调用load_native_banner之后，会变10， 11,12
                if (self.banner_show_time > 0 && self.banner_show_time % 30 == 0) { // update_cd 默认为5 // 调用load_native_banner之后，会变10， 11,12
                    console.log("igc----- update_native_banner");
                    self.load_native_banner();
                }
            }, 1000);
        }
        else {
            if (this._cur_native_data && !this.need_load) {
                this.show_native_banner_ui();
            }
            else {
                this.load_native_banner();
            }
        }
    };
    ad_oppo_banner.set_banner_height = function () {
        if (this.is_oppo_vivo()) {
            syyx_manager_1.syyx_manager.load_view(model_1.syyx_view.native_banner, function (view) {
                view && view.set_banner_height && view.set_banner_height(false);
            });
        }
    };
    /**
     * 检查是否需要强制加载刷新banner
     */
    ad_oppo_banner.check_need_strong_load_native_banner = function () {
        var strong_switch = false;
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["banner_strong_update_switch"]) {
            strong_switch = this._business_config_data["banner_strong_update_switch"].value[0] == 1;
        }
        // console.log("igc----- ad_oppo_banner banner_strong_update_switch->", strong_switch)
        return strong_switch;
    };
    /**
     * UI层要展示普通banner或者原生banner
     */
    ad_oppo_banner.show_banner = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        //说明之前有hide banner
        if (!this.need_show) {
            this.check_need_strong_load_native_banner() && (this.need_load = true);
            this.need_show = true;
        }
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
        if (!ad_banner_1.ad_banner.can_show_first) {
            console.log("igc----- banner is in cooling time ");
            return;
        }
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            console.log("igc----- ad_oppo_banner normal_banner_id no configure in adv.csv");
            return;
        }
        this.run_timer();
    };
    /**
    * ui层要隐藏banner或者原生banner
    * 隐藏后销毁定时器  直到下一次show_banner才会重新启动定时器
    */
    ad_oppo_banner.hide_banner = function () {
        this.need_show = false;
        this.banner_showing = false;
        if (!ad_banner_1.ad_banner.can_show_first) {
            console.log("igc----- banner is in cooling time ");
            return;
        }
        this.hide_native_banner_ui();
        this.hide_normal_banner();
    };
    /**
     * 加载原生banner数据
     * 会根据不同情况 转去加载普通banner
     */
    ad_oppo_banner.load_native_banner = function () {
        var self = this;
        this.need_load = false;
        this.banner_timer_id && clearTimeout(this.banner_timer_id);
        // 刷新当前banner累计展示刷新的时间
        this.update_cd = this.get_oppo_banner_show_update_time(); // 跟玩的时间有关，要么10， 11， 12
        this.hide_native_banner_ui(); // 只是隐藏ui ， 下面的
        //当前不需要展示任何banner
        if (!this.need_show) {
            self.hide_banner(); // need_show也为false
            return;
        }
        this.update_cur_native_data(this._last_ad_id);
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_banner)) {
            if (this._cur_native_data) {
                self.show_native_banner_ui();
            }
            else {
                self.set_show_error_model();
            }
            return;
        }
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_show_count_limit()) {
            console.log("igc----- ad_oppo_banner show native is show limit !!!");
            if (this._cur_native_data) {
                self.show_native_banner_ui();
            }
            else {
                self.set_show_error_model();
            }
            return;
        }
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            self.show_normal_banner();
            return;
        }
        //判断原生banner开关
        if (this._business_config_data && this._business_config_data["native_banner_open_switch"]) {
            //开关有值  且 值为0 关闭则设置定时器刷新普通banner
            if (this._business_config_data["native_banner_open_switch"].value[0] == 0) {
                self.show_normal_banner();
                return;
            }
        }
        //web渠道  返回假数据
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            var data = new model_1.native_ad_data();
            data.id = igc.utils_manager.get_random_name();
            data.adPosId = self._native_banner_id;
            data.adId = "1";
            data.adUnitId = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([0, 100000]);
            data.imgUrlList = "https://static-cdn.llewan.com/h5/ddsdk/plugin/share_img.jpg";
            data.title = "banner测试标题" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([0, 100]);
            data.desc = "banner测试描述" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([0, 100]);
            data.state = syyx_sdk_enum_1.e_ad_native_state.need_show;
            data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_banner;
            this.add_native_data(data);
            console.log("igc------syyx_adv_manager-------native_banner on_load web", data);
            //展示原生bannerui
            self.show_native_banner_ui();
            self._ad_param.onLoad && self._ad_param.onLoad();
            syyx_adv_manager_1.syyx_adv_manager.add_native_show_count();
            return;
        }
        //不是oppo vivo 或者 没有设置原生bannerId 则设置定时器刷新普通banner
        if (!self._native_banner_id || !this.is_oppo_vivo()) {
            self.show_normal_banner();
            return;
        }
        // //判断原生banner开关
        // if (this._business_config_data && this._business_config_data["native_banner_open_switch"]) {
        //     //开关有值  且 值为0 关闭则设置定时器刷新普通banner
        //     if (this._business_config_data["native_banner_open_switch"].value[0] == 0) {
        //         self.show_normal_banner()
        //         return
        //     }
        // }
        //上一个加载的原生banner没有展示过
        if (this._cur_native_data && this._cur_native_data.state == syyx_sdk_enum_1.e_ad_native_state.need_show) {
            self.show_native_banner_ui();
            return;
        }
        syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.native, self._native_banner_id, function on_load(param, ad_data_list) {
            console.log("igc------syyx_adv_manager-------native_banner on_load", ad_data_list);
            //返回数据异常
            if (ad_data_list == undefined || !ad_data_list[0]) {
                self.load_native_banner_error();
            }
            else {
                var length = 0;
                if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                    //vivo渠道只取最后一个位置
                    length = ad_data_list.length - 1;
                }
                var data = new model_1.native_ad_data();
                data.id = igc.utils_manager.get_random_name();
                data.adPosId = self._native_banner_id;
                data.adId = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(self._native_banner_id);
                data.adUnitId = ad_data_list[length].adUnitId;
                data.imgUrlList = syyx_sdk_utils_1.syyx_sdk_utils.format_remote_texture_url(ad_data_list[length].imgUrlList[0]);
                data.title = ad_data_list[length].title;
                data.desc = ad_data_list[length].desc;
                data.state = syyx_sdk_enum_1.e_ad_native_state.need_show;
                data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_banner;
                self.add_native_data(data); // 保存缓存
                //展示原生bannerui
                self.show_native_banner_ui();
                self._ad_param.onLoad && self._ad_param.onLoad();
                syyx_adv_manager_1.syyx_adv_manager.add_native_show_count();
            }
        }, function on_show() {
        }, function on_close(param, res) {
        }, function on_error(param, err) {
            console.error("igc-----syyx_adv_manager-------native_banner onError", err); // 第一次没走这里
            self.load_native_banner_error();
        });
    };
    ad_oppo_banner.report_ad_click = function (ad_pos_id, native_data) {
        if (this._native_banner_id != ad_pos_id) {
            return;
        }
        if (this._business_config_data && this._business_config_data["native_banner_report_click_update_switch"]) {
            if (this._business_config_data["native_banner_report_click_update_switch"].value[0] == 1) {
                this.need_show = true;
                this.load_native_banner();
            }
        }
    };
    ad_oppo_banner.report_ad_show = function (ad_pos_id, native_data) {
        if (!this._native_banner_id) {
            // console.log("igc----- ad_native_interstitial  report_ad_click this.ad_pos_id is null!!")
            this._native_banner_id = syyx_sdk_enum_1.e_ad_id.native_banner;
        }
        if (this._native_banner_id == ad_pos_id) {
            this._last_ad_id = native_data.id;
        }
    };
    /**
     * 展示原生bannerUi
     */
    ad_oppo_banner.show_native_banner_ui = function () {
        var self = this;
        this.hide_normal_banner();
        if (this.need_show) {
            syyx_manager_1.syyx_manager.create_native_banner(function (view) {
                if (self._cur_native_data) {
                    self.banner_showing = true;
                    self._ad_param.onShow && self._ad_param.onShow();
                    view.show && view.show(self._cur_native_data);
                }
            });
        }
    };
    /**
     * 隐藏原生bannerUi
     */
    ad_oppo_banner.hide_native_banner_ui = function () {
        if (this.is_oppo_vivo()) {
            syyx_manager_1.syyx_manager.load_view(model_1.syyx_view.native_banner, function (view) {
                view && view.hide && view.hide();
            });
        }
    };
    /**
     * 加载原生失败
     */
    ad_oppo_banner.load_native_banner_error = function () {
        this.update_cur_native_data(this._last_ad_id);
        //原生加载失败 从池子取一个和上次展示不同的数据
        if (this._cur_native_data) {
            //有不同的数据
            this.show_native_banner_ui();
        }
        else {
            this.show_normal_banner();
        }
    };
    /**
    * 加载原普通Banner失败
    */
    ad_oppo_banner.load_normal_banner_error = function () {
        this.banner_showing = false;
        //普通banner报错  把之前累积展示的banner时间重置
        if (this.need_show) {
            this.update_cur_native_data();
            if (this._cur_native_data) {
                this.show_native_banner_ui();
            }
            else {
                this.set_show_error_model();
            }
        }
    };
    ad_oppo_banner.set_normal_banner_switch = function (value) {
        this.normal_banner_switch = value;
        if (!value) {
            this.hide_normal_banner();
        }
    };
    /**
    * 显示普通banner
    */
    ad_oppo_banner.show_normal_banner = function () {
        if (this._business_config_data && this._business_config_data["show_normal_banner_switch"]) {
            if (this._business_config_data["show_normal_banner_switch"].value[0] == 0) {
                return;
            }
        }
        if (!this.normal_banner_switch) {
            console.log("igc----- vivo ad_banner show_normal_banner normal_banner_switch is close!!!");
            this.load_normal_banner_error();
            return;
        }
        var self = this;
        //vivo渠道限制一下  销毁banner10s后才能展示普通banner
        if (!this.can_show_vivo_banner && syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
            // console.error("igc------syyx_adv_manager show_normal_banner onError can_show_vivo_banner is false!!")
            console.log("igc----- vivo ad_banner show_normal_banner create too often!!!");
            console.log("igc----- vivo ad_banner show_normal_banner so that use old native banner data!!!");
            this.load_normal_banner_error();
            return;
        }
        syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.banner, self._normal_banner_id, function onLoad(param, res) {
            self._ad_param.onLoad && self._ad_param.onLoad();
        }, function onShow() {
            self.normal_banner_showing = true;
            console.log("igc----- show_normal_banner success");
            self.hide_native_banner_ui();
            //banner展示成功后判断当前能否展示banner
            self.banner_showing = self.need_show;
            if (self.need_show) {
                self._ad_param.onShow && self._ad_param.onShow();
                syyx_adv_manager_1.syyx_adv_manager.add_native_show_count();
            }
            else {
                self.hide_normal_banner();
            }
        }, function onClose(param, res) {
            self._ad_param.onClose && self._ad_param.onClose();
        }, function onError(param, err) {
            console.error("igc------syyx_adv_manager show_normal_banner onError", err);
            self._ad_param.onError && self._ad_param.onError(param, err);
            // console.log("igc----- fail to show normal banner so that use native banner's data")
            self.load_normal_banner_error();
        });
    };
    ad_oppo_banner.set_show_error_model = function () {
        var self = this;
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            this.banner_timer_id && clearTimeout(this.banner_timer_id);
            this.banner_timer_id = setTimeout(function () {
                self.update_cur_native_data();
                if (self.need_show && !self._cur_native_data) {
                    // console.log("igc----- ad_oppo_banner set_show_error_model auto load_native_banner")
                    self.load_native_banner();
                }
            }, this.update_cd * 1000);
        }
    };
    ad_oppo_banner.hide_normal_banner = function () {
        var self = this;
        if (self._normal_banner_id) {
            //vivo渠道下  普通banner已经在显示  销毁的话记录10s内不能再次创建
            if (self.normal_banner_showing && syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                self.can_show_vivo_banner = false;
                this.normal_banner_timer_id && clearTimeout(this.normal_banner_timer_id);
                this.normal_banner_timer_id = setTimeout(function () {
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
    ad_oppo_banner.finger_close_banner = function () {
        if (this.is_oppo_vivo() && this._business_config_data && this._business_config_data["finger_close_banner_switch"]) {
            if (this._business_config_data["finger_close_banner_switch"].value[0] == 1) {
                var cd = this._business_config_data["finger_close_banner_switch"].value[1] || 60;
                this.hide_banner();
                ad_banner_1.ad_banner.can_show_first = false;
                setTimeout(function () {
                    ad_banner_1.ad_banner.can_show_first = true;
                }, cd * 1000);
            }
        }
    };
    /**
     * 更新当前正在显示原生Banner的数据
     */
    ad_oppo_banner.update_cur_native_data = function (ignore_id) {
        if (ignore_id === void 0) { ignore_id = undefined; }
        this.banner_show_time = 0;
        this._cur_native_data = syyx_adv_manager_1.syyx_adv_manager.get_native_data(ignore_id);
    };
    /**
     * 储存原生数据
     * @param native_data 原生数据
     */
    ad_oppo_banner.add_native_data = function (native_data) {
        syyx_adv_manager_1.syyx_adv_manager.add_native_data(native_data);
        this.update_cur_native_data(this._last_ad_id);
    };
    ad_oppo_banner.is_oppo_vivo = function () {
        return syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web;
    };
    /**
     * 上一次显示的id
     */
    ad_oppo_banner._last_ad_id = undefined;
    /**
    * 远端运营配置
    */
    ad_oppo_banner._business_config_data = {};
    /**
     * 配置表原生banner广告Id
     */
    ad_oppo_banner._native_banner_id = undefined;
    /**
     * 配置表普通banner广告Id
     */
    ad_oppo_banner._normal_banner_id = undefined;
    /**
     * banner累计展示刷新时间
     */
    ad_oppo_banner.update_cd = 5;
    /**
     * 刷新定时器是否开启
     */
    ad_oppo_banner.is_run_timer = false;
    /**
     * 当前是否需要展示banner
     */
    ad_oppo_banner.need_show = true;
    /**
     * banner是否正在显示
     */
    ad_oppo_banner.banner_showing = false;
    /**
     * banner累计展示时间
     */
    ad_oppo_banner.banner_show_time = 0;
    /**
     * 当前正在展示的原生数据
     */
    ad_oppo_banner._cur_native_data = undefined;
    /**
     * 普通Banner是否在显示
     */
    ad_oppo_banner.normal_banner_showing = false;
    /**
    * 能否显示vivo普通Banner
    */
    ad_oppo_banner.can_show_vivo_banner = true;
    /**
     * 普通banner开关
     */
    ad_oppo_banner.normal_banner_switch = true;
    /**
     * 是否需要加载
     */
    ad_oppo_banner.need_load = false;
    return ad_oppo_banner;
}());
exports.ad_oppo_banner = ad_oppo_banner;

cc._RF.pop();