
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/ad/ad_oppo_banner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXGFkXFxhZF9vcHBvX2Jhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBMkQ7QUFDM0QsNkRBQTJGO0FBQzNGLDJDQUE4RDtBQUM5RCw2REFBNEQ7QUFDNUQsZ0RBQStDO0FBQy9DLHlDQUF3QztBQUN4Qyx1REFBc0Q7QUFFdEQ7SUFBQTtJQXdqQkEsQ0FBQztJQTdlRzs7T0FFRztJQUNJLCtDQUFnQyxHQUF2QztRQUNJLElBQUksY0FBYyxHQUFHLG1DQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUE7UUFDMUQsSUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFBO1FBQy9CLElBQUksQ0FBQyxxQkFBcUIsR0FBRywyQkFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDL0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLHVCQUF1QixDQUFDLEVBQUU7WUFDbkYsZUFBZSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEtBQUssQ0FBQSxDQUFHLGlEQUFpRDtTQUNsSTtRQUVELElBQUksQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDakQsS0FBSztZQUNMLE9BQU8sRUFBRSxDQUFBO1NBQ1o7UUFFRCxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDakIsS0FBSyxJQUFJLENBQUMsSUFBSSxlQUFlLEVBQUU7WUFDM0IsUUFBUSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM3QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxjQUFjLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsRUFBRTtnQkFDcEYs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V0FBVyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVNLDJCQUFZLEdBQW5CO1FBQ0ksT0FBTyw0QkFBVSxDQUFDLGdCQUFnQixLQUFLLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxJQUFJLDRCQUFVLENBQUMsZ0JBQWdCLEtBQUssR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLElBQUksNEJBQVUsQ0FBQyxnQkFBZ0IsS0FBSyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQTtJQUM3TCxDQUFDO0lBcmpCRDs7T0FFRztJQUNJLDBCQUFXLEdBQUcsU0FBUyxDQUFBO0lBQzlCOztNQUVFO0lBQ0ssb0NBQXFCLEdBQUcsRUFBRSxDQUFDO0lBRWxDOztPQUVHO0lBQ0ksZ0NBQWlCLEdBQUcsU0FBUyxDQUFBO0lBRXBDOztPQUVHO0lBQ0ksZ0NBQWlCLEdBQUcsU0FBUyxDQUFBO0lBT3BDOztPQUVHO0lBQ0ksd0JBQVMsR0FBRyxDQUFDLENBQUE7SUFFcEI7O09BRUc7SUFDSSwyQkFBWSxHQUFHLEtBQUssQ0FBQTtJQUUzQjs7T0FFRztJQUNJLHdCQUFTLEdBQUcsSUFBSSxDQUFBO0lBRXZCOztPQUVHO0lBQ0ksNkJBQWMsR0FBRyxLQUFLLENBQUE7SUFFN0I7O09BRUc7SUFDSSwrQkFBZ0IsR0FBRyxDQUFDLENBQUE7SUFFM0I7O09BRUc7SUFDSSwrQkFBZ0IsR0FBRyxTQUFTLENBQUE7SUFFbkM7O09BRUc7SUFDSSxvQ0FBcUIsR0FBRyxLQUFLLENBQUE7SUFFcEM7O01BRUU7SUFDSyxtQ0FBb0IsR0FBRyxJQUFJLENBQUE7SUFFbEM7O09BRUc7SUFDSSxtQ0FBb0IsR0FBRyxJQUFJLENBQUE7SUFFbEM7O09BRUc7SUFDSSx3QkFBUyxHQUFHLEtBQUssQ0FBQTtJQStlNUIscUJBQUM7Q0F4akJELEFBd2pCQyxJQUFBO0FBeGpCWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN5eXhfY29uc3QgfSBmcm9tIFwiLi4vLi4vY29uZmlncy9zeXl4X3Nka19jb25maWdcIjtcclxuaW1wb3J0IHsgZV9hZF9uYXRpdmVfdHlwZSwgZV9hZF9uYXRpdmVfc3RhdGUsIGVfYWRfaWQgfSBmcm9tIFwiLi4vLi4vY29uZmlncy9zeXl4X3Nka19lbnVtXCI7XHJcbmltcG9ydCB7IG5hdGl2ZV9hZF9kYXRhLCBzeXl4X3ZpZXcgfSBmcm9tIFwiLi4vLi4vbW9kZWwvbW9kZWxcIjtcclxuaW1wb3J0IHsgc3l5eF9zZGtfdXRpbHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3l5eF9zZGtfdXRpbHNcIjtcclxuaW1wb3J0IHsgc3l5eF9tYW5hZ2VyIH0gZnJvbSBcIi4uL3N5eXhfbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBhZF9iYW5uZXIgfSBmcm9tIFwiLi9hZF9iYW5uZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9hZHZfbWFuYWdlciB9IGZyb20gXCIuL3N5eXhfYWR2X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBhZF9vcHBvX2Jhbm5lciB7XHJcbiAgICAvKipcclxuICAgICAqIOS4iuS4gOasoeaYvuekuueahGlkXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfbGFzdF9hZF9pZCA9IHVuZGVmaW5lZFxyXG4gICAgLyoqXHJcbiAgICAqIOi/nOerr+i/kOiQpemFjee9rlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBfYnVzaW5lc3NfY29uZmlnX2RhdGEgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmFjee9ruihqOWOn+eUn2Jhbm5lcuW5v+WRiklkXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfbmF0aXZlX2Jhbm5lcl9pZCA9IHVuZGVmaW5lZFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YWN572u6KGo5pmu6YCaYmFubmVy5bm/5ZGKSWRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF9ub3JtYWxfYmFubmVyX2lkID0gdW5kZWZpbmVkXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWIm+W7uuW5v+WRiuaXtuS8oOWFpeeahOWPguaVsFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBfYWRfcGFyYW1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJhbm5lcue0r+iuoeWxleekuuWIt+aWsOaXtumXtFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgdXBkYXRlX2NkID0gNVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw5a6a5pe25Zmo5piv5ZCm5byA5ZCvXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc19ydW5fdGltZXIgPSBmYWxzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN5piv5ZCm6ZyA6KaB5bGV56S6YmFubmVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBuZWVkX3Nob3cgPSB0cnVlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBiYW5uZXLmmK/lkKbmraPlnKjmmL7npLpcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJhbm5lcl9zaG93aW5nID0gZmFsc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIGJhbm5lcue0r+iuoeWxleekuuaXtumXtFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYmFubmVyX3Nob3dfdGltZSA9IDBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeato+WcqOWxleekuueahOWOn+eUn+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX2N1cl9uYXRpdmVfZGF0YSA9IHVuZGVmaW5lZFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pmu6YCaQmFubmVy5piv5ZCm5Zyo5pi+56S6XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBub3JtYWxfYmFubmVyX3Nob3dpbmcgPSBmYWxzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDog73lkKbmmL7npLp2aXZv5pmu6YCaQmFubmVyXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGNhbl9zaG93X3Zpdm9fYmFubmVyID0gdHJ1ZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pmu6YCaYmFubmVy5byA5YWzXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBub3JtYWxfYmFubmVyX3N3aXRjaCA9IHRydWVcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpumcgOimgeWKoOi9vVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbmVlZF9sb2FkID0gZmFsc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXtumXtOauteWGheeahGJhbm5lcuWxleekuuWIt+aWsOaXtumXtOWIt+aWsOaXtumXtFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X29wcG9fYmFubmVyX3Nob3dfdXBkYXRlX3RpbWUoKSB7XHJcbiAgICAgICAgbGV0IHBsYXlfZ2FtZV90aW1lID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfcGxheV9nYW1lX3RpbWUoKVxyXG4gICAgICAgIGxldCB1cGRhdGVfdGltZV9hcnIgPSB1bmRlZmluZWRcclxuICAgICAgICB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSA9IHN5eXhfbWFuYWdlci5nZXRfYnVzaW5lc3NfY29uZmlnKClcclxuICAgICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJvcHBvX2Jhbm5lcl9jb29sX3RpbWVcIl0pIHsgXHJcbiAgICAgICAgICAgIHVwZGF0ZV90aW1lX2FyciA9IHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wib3Bwb19iYW5uZXJfY29vbF90aW1lXCJdLnZhbHVlICAgLy8gW1swLCAxMjAsIDEwXSwgWzEyMSwgMTgwLCAxMV0sIFsxODEsIDI0MCwgMTJdXVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF1cGRhdGVfdGltZV9hcnIgfHwgdXBkYXRlX3RpbWVfYXJyLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIC8v6buY6K6k5YC8XHJcbiAgICAgICAgICAgIHJldHVybiAxMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNkID0gMFxyXG4gICAgICAgIGxldCBsYXN0X2FyciA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB1cGRhdGVfdGltZV9hcnIpIHtcclxuICAgICAgICAgICAgbGFzdF9hcnIgPSB1cGRhdGVfdGltZV9hcnJbaV1cclxuICAgICAgICAgICAgaWYgKHVwZGF0ZV90aW1lX2FycltpXVswXSA8PSBwbGF5X2dhbWVfdGltZSAmJiB1cGRhdGVfdGltZV9hcnJbaV1bMV0gPj0gcGxheV9nYW1lX3RpbWUpIHtcclxuICAgICAgICAgICAgICAgIGNkID0gdXBkYXRlX3RpbWVfYXJyW2ldWzJdXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjZCB8fCBsYXN0X2FyclsyXVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Ieq5Yqo5Yi35paw5a6a5pe25ZmoXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBydW5fdGltZXIoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX3J1bl90aW1lcikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pc19ydW5fdGltZXIgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG5cclxuICAgICAgICAgICAgc2VsZi5sb2FkX25hdGl2ZV9iYW5uZXIoKVxyXG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5iYW5uZXJfc2hvd2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYmFubmVyX3Nob3dfdGltZSsrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoc2VsZi5iYW5uZXJfc2hvd190aW1lID4gMCAmJiBzZWxmLmJhbm5lcl9zaG93X3RpbWUgJSBzZWxmLnVwZGF0ZV9jZCA9PSAwKSB7IC8vIHVwZGF0ZV9jZCDpu5jorqTkuLo1IC8vIOiwg+eUqGxvYWRfbmF0aXZlX2Jhbm5lcuS5i+WQju+8jOS8muWPmDEw77yMIDExLDEyXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5iYW5uZXJfc2hvd190aW1lID4gMCAmJiBzZWxmLmJhbm5lcl9zaG93X3RpbWUgJSAzMCA9PSAwKSB7IC8vIHVwZGF0ZV9jZCDpu5jorqTkuLo1IC8vIOiwg+eUqGxvYWRfbmF0aXZlX2Jhbm5lcuS5i+WQju+8jOS8muWPmDEw77yMIDExLDEyXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSB1cGRhdGVfbmF0aXZlX2Jhbm5lclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9hZF9uYXRpdmVfYmFubmVyKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJfbmF0aXZlX2RhdGEgJiYgIXRoaXMubmVlZF9sb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dfbmF0aXZlX2Jhbm5lcl91aSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRfbmF0aXZlX2Jhbm5lcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldF9iYW5uZXJfaGVpZ2h0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzX29wcG9fdml2bygpKSB7XHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5sb2FkX3ZpZXcoc3l5eF92aWV3Lm5hdGl2ZV9iYW5uZXIsIGZ1bmN0aW9uICh2aWV3KSB7XHJcbiAgICAgICAgICAgICAgICB2aWV3ICYmIHZpZXcuc2V0X2Jhbm5lcl9oZWlnaHQgJiYgdmlldy5zZXRfYmFubmVyX2hlaWdodChmYWxzZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4Dmn6XmmK/lkKbpnIDopoHlvLrliLbliqDovb3liLfmlrBiYW5uZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNoZWNrX25lZWRfc3Ryb25nX2xvYWRfbmF0aXZlX2Jhbm5lcigpIHtcclxuICAgICAgICBsZXQgc3Ryb25nX3N3aXRjaCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiYmFubmVyX3N0cm9uZ191cGRhdGVfc3dpdGNoXCJdKSB7XHJcbiAgICAgICAgICAgIHN0cm9uZ19zd2l0Y2ggPSB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcImJhbm5lcl9zdHJvbmdfdXBkYXRlX3N3aXRjaFwiXS52YWx1ZVswXSA9PSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gYWRfb3Bwb19iYW5uZXIgYmFubmVyX3N0cm9uZ191cGRhdGVfc3dpdGNoLT5cIiwgc3Ryb25nX3N3aXRjaClcclxuICAgICAgICByZXR1cm4gc3Ryb25nX3N3aXRjaFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVUnlsYLopoHlsZXnpLrmma7pgJpiYW5uZXLmiJbogIXljp/nlJ9iYW5uZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNob3dfYmFubmVyKGFkX3R5cGU/OiBpZ2MuZV9hZF90eXBlLCBhZF9wb3NfaWQ/OiBzdHJpbmcsIG9uTG9hZD86IEZ1bmN0aW9uLCBvblNob3c/OiBGdW5jdGlvbiwgb25DbG9zZT86IEZ1bmN0aW9uLCBvbkVycm9yPzogRnVuY3Rpb24pIHtcclxuXHJcbiAgICAgICAgLy/or7TmmI7kuYvliY3mnIloaWRlIGJhbm5lclxyXG4gICAgICAgIGlmICghdGhpcy5uZWVkX3Nob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja19uZWVkX3N0cm9uZ19sb2FkX25hdGl2ZV9iYW5uZXIoKSAmJiAodGhpcy5uZWVkX2xvYWQgPSB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLm5lZWRfc2hvdyA9IHRydWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX25vcm1hbF9iYW5uZXJfaWQgPSBhZF9wb3NfaWRcclxuICAgICAgICB0aGlzLl9uYXRpdmVfYmFubmVyX2lkID0gc3l5eF9hZHZfbWFuYWdlci5fYWR2X2NvbmZpZ19kYXRhW2FkX3Bvc19pZF0uYmFja3VwX2lkXHJcblxyXG4gICAgICAgIHRoaXMuX2FkX3BhcmFtID0ge1xyXG4gICAgICAgICAgICBhZF90eXBlOiBhZF90eXBlLFxyXG4gICAgICAgICAgICBhZF9wb3NfaWQ6IGFkX3Bvc19pZCxcclxuICAgICAgICAgICAgb25Mb2FkOiBvbkxvYWQsXHJcbiAgICAgICAgICAgIG9uU2hvdzogb25TaG93LFxyXG4gICAgICAgICAgICBvbkNsb3NlOiBvbkNsb3NlLFxyXG4gICAgICAgICAgICBvbkVycm9yOiBvbkVycm9yLFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWFkX2Jhbm5lci5jYW5fc2hvd19maXJzdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGJhbm5lciBpcyBpbiBjb29saW5nIHRpbWUgXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFkX2lkID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfY2hhbm5lbF9hZF9pZChhZF9wb3NfaWQpXHJcblxyXG4gICAgICAgIGlmICghYWRfaWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBhZF9vcHBvX2Jhbm5lciBub3JtYWxfYmFubmVyX2lkIG5vIGNvbmZpZ3VyZSBpbiBhZHYuY3N2XCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ydW5fdGltZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiB1aeWxguimgemakOiXj2Jhbm5lcuaIluiAheWOn+eUn2Jhbm5lclxyXG4gICAgKiDpmpDol4/lkI7plIDmr4Hlrprml7blmaggIOebtOWIsOS4i+S4gOasoXNob3dfYmFubmVy5omN5Lya6YeN5paw5ZCv5Yqo5a6a5pe25ZmoXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVfYmFubmVyKCkge1xyXG4gICAgICAgIHRoaXMubmVlZF9zaG93ID0gZmFsc2VcclxuICAgICAgICB0aGlzLmJhbm5lcl9zaG93aW5nID0gZmFsc2VcclxuICAgICAgICBpZiAoIWFkX2Jhbm5lci5jYW5fc2hvd19maXJzdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGJhbm5lciBpcyBpbiBjb29saW5nIHRpbWUgXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGVfbmF0aXZlX2Jhbm5lcl91aSgpXHJcbiAgICAgICAgdGhpcy5oaWRlX25vcm1hbF9iYW5uZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295Y6f55SfYmFubmVy5pWw5o2uXHJcbiAgICAgKiDkvJrmoLnmja7kuI3lkIzmg4XlhrUg6L2s5Y675Yqg6L295pmu6YCaYmFubmVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX25hdGl2ZV9iYW5uZXIoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIHRoaXMubmVlZF9sb2FkID0gZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5iYW5uZXJfdGltZXJfaWQgJiYgY2xlYXJUaW1lb3V0KHRoaXMuYmFubmVyX3RpbWVyX2lkKVxyXG5cclxuICAgICAgICAvLyDliLfmlrDlvZPliY1iYW5uZXLntK/orqHlsZXnpLrliLfmlrDnmoTml7bpl7RcclxuICAgICAgICB0aGlzLnVwZGF0ZV9jZCA9IHRoaXMuZ2V0X29wcG9fYmFubmVyX3Nob3dfdXBkYXRlX3RpbWUoKSAvLyDot5/njqnnmoTml7bpl7TmnInlhbPvvIzopoHkuYgxMO+8jCAxMe+8jCAxMlxyXG5cclxuICAgICAgICB0aGlzLmhpZGVfbmF0aXZlX2Jhbm5lcl91aSgpICAvLyDlj6rmmK/pmpDol491aSDvvIwg5LiL6Z2i55qEXHJcblxyXG4gICAgICAgIC8v5b2T5YmN5LiN6ZyA6KaB5bGV56S65Lu75L2VYmFubmVyXHJcbiAgICAgICAgaWYgKCF0aGlzLm5lZWRfc2hvdykge1xyXG4gICAgICAgICAgICBzZWxmLmhpZGVfYmFubmVyKCkgLy8gbmVlZF9zaG935Lmf5Li6ZmFsc2VcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZV9jdXJfbmF0aXZlX2RhdGEodGhpcy5fbGFzdF9hZF9pZClcclxuXHJcbiAgICAgICAgaWYgKHN5eXhfYWR2X21hbmFnZXIuY2hlY2tfaXNfY2xpY2tfbGltaXQoZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfYmFubmVyKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyX25hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dfbmF0aXZlX2Jhbm5lcl91aSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldF9zaG93X2Vycm9yX21vZGVsKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX2lzX3Nob3dfY291bnRfbGltaXQoKSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGFkX29wcG9fYmFubmVyIHNob3cgbmF0aXZlIGlzIHNob3cgbGltaXQgISEhXCIpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJfbmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2hvd19uYXRpdmVfYmFubmVyX3VpKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0X3Nob3dfZXJyb3JfbW9kZWwoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLnZpdm9fcWcgfHwgc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUub3Bwb19xZykge1xyXG4gICAgICAgICAgICBzZWxmLnNob3dfbm9ybWFsX2Jhbm5lcigpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/liKTmlq3ljp/nlJ9iYW5uZXLlvIDlhbNcclxuICAgICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfYmFubmVyX29wZW5fc3dpdGNoXCJdKSB7XHJcbiAgICAgICAgICAgIC8v5byA5YWz5pyJ5YC8ICDkuJQg5YC85Li6MCDlhbPpl63liJnorr7nva7lrprml7blmajliLfmlrDmma7pgJpiYW5uZXJcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2Jhbm5lcl9vcGVuX3N3aXRjaFwiXS52YWx1ZVswXSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dfbm9ybWFsX2Jhbm5lcigpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy93ZWLmuKDpgZMgIOi/lOWbnuWBh+aVsOaNrlxyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS53ZWIpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBuZXcgbmF0aXZlX2FkX2RhdGEoKVxyXG4gICAgICAgICAgICBkYXRhLmlkID0gaWdjLnV0aWxzX21hbmFnZXIuZ2V0X3JhbmRvbV9uYW1lKClcclxuICAgICAgICAgICAgZGF0YS5hZFBvc0lkID0gc2VsZi5fbmF0aXZlX2Jhbm5lcl9pZFxyXG4gICAgICAgICAgICBkYXRhLmFkSWQgPSBcIjFcIlxyXG4gICAgICAgICAgICBkYXRhLmFkVW5pdElkID0gc3l5eF9zZGtfdXRpbHMuZ2V0X3JhbmRvbV9udW1iZXIoWzAsIDEwMDAwMF0pXHJcbiAgICAgICAgICAgIGRhdGEuaW1nVXJsTGlzdCA9IFwiaHR0cHM6Ly9zdGF0aWMtY2RuLmxsZXdhbi5jb20vaDUvZGRzZGsvcGx1Z2luL3NoYXJlX2ltZy5qcGdcIlxyXG4gICAgICAgICAgICBkYXRhLnRpdGxlID0gXCJiYW5uZXLmtYvor5XmoIfpophcIiArIHN5eXhfc2RrX3V0aWxzLmdldF9yYW5kb21fbnVtYmVyKFswLCAxMDBdKVxyXG4gICAgICAgICAgICBkYXRhLmRlc2MgPSBcImJhbm5lcua1i+ivleaPj+i/sFwiICsgc3l5eF9zZGtfdXRpbHMuZ2V0X3JhbmRvbV9udW1iZXIoWzAsIDEwMF0pXHJcbiAgICAgICAgICAgIGRhdGEuc3RhdGUgPSBlX2FkX25hdGl2ZV9zdGF0ZS5uZWVkX3Nob3dcclxuICAgICAgICAgICAgZGF0YS5uYXRpdmVfdHlwZSA9IGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lclxyXG4gICAgICAgICAgICB0aGlzLmFkZF9uYXRpdmVfZGF0YShkYXRhKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tLXN5eXhfYWR2X21hbmFnZXItLS0tLS0tbmF0aXZlX2Jhbm5lciBvbl9sb2FkIHdlYlwiLCBkYXRhKVxyXG4gICAgICAgICAgICAvL+WxleekuuWOn+eUn2Jhbm5lcnVpXHJcbiAgICAgICAgICAgIHNlbGYuc2hvd19uYXRpdmVfYmFubmVyX3VpKClcclxuICAgICAgICAgICAgc2VsZi5fYWRfcGFyYW0ub25Mb2FkICYmIHNlbGYuX2FkX3BhcmFtLm9uTG9hZCgpXHJcbiAgICAgICAgICAgIHN5eXhfYWR2X21hbmFnZXIuYWRkX25hdGl2ZV9zaG93X2NvdW50KClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S4jeaYr29wcG8gdml2byDmiJbogIUg5rKh5pyJ6K6+572u5Y6f55SfYmFubmVySWQg5YiZ6K6+572u5a6a5pe25Zmo5Yi35paw5pmu6YCaYmFubmVyXHJcbiAgICAgICAgaWYgKCFzZWxmLl9uYXRpdmVfYmFubmVyX2lkIHx8ICF0aGlzLmlzX29wcG9fdml2bygpKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2hvd19ub3JtYWxfYmFubmVyKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAvL+WIpOaWreWOn+eUn2Jhbm5lcuW8gOWFs1xyXG4gICAgICAgIC8vIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSAmJiB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9iYW5uZXJfb3Blbl9zd2l0Y2hcIl0pIHtcclxuICAgICAgICAvLyAgICAgLy/lvIDlhbPmnInlgLwgIOS4lCDlgLzkuLowIOWFs+mXreWImeiuvue9ruWumuaXtuWZqOWIt+aWsOaZrumAmmJhbm5lclxyXG4gICAgICAgIC8vICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfYmFubmVyX29wZW5fc3dpdGNoXCJdLnZhbHVlWzBdID09IDApIHtcclxuICAgICAgICAvLyAgICAgICAgIHNlbGYuc2hvd19ub3JtYWxfYmFubmVyKClcclxuICAgICAgICAvLyAgICAgICAgIHJldHVyblxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvL+S4iuS4gOS4quWKoOi9veeahOWOn+eUn2Jhbm5lcuayoeacieWxleekuui/h1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJfbmF0aXZlX2RhdGEgJiYgdGhpcy5fY3VyX25hdGl2ZV9kYXRhLnN0YXRlID09IGVfYWRfbmF0aXZlX3N0YXRlLm5lZWRfc2hvdykge1xyXG4gICAgICAgICAgICBzZWxmLnNob3dfbmF0aXZlX2Jhbm5lcl91aSgpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLmNyZWF0ZV9hZChpZ2MuZV9hZF90eXBlLm5hdGl2ZSwgc2VsZi5fbmF0aXZlX2Jhbm5lcl9pZCxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fbG9hZChwYXJhbSwgYWRfZGF0YV9saXN0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tLXN5eXhfYWR2X21hbmFnZXItLS0tLS0tbmF0aXZlX2Jhbm5lciBvbl9sb2FkXCIsIGFkX2RhdGFfbGlzdClcclxuICAgICAgICAgICAgICAgIC8v6L+U5Zue5pWw5o2u5byC5bi4XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRfZGF0YV9saXN0ID09IHVuZGVmaW5lZCB8fCAhYWRfZGF0YV9saXN0WzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2FkX25hdGl2ZV9iYW5uZXJfZXJyb3IoKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGVuZ3RoID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS52aXZvX3FnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdml2b+a4oOmBk+WPquWPluacgOWQjuS4gOS4quS9jee9rlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBhZF9kYXRhX2xpc3QubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBuYXRpdmVfYWRfZGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5pZCA9IGlnYy51dGlsc19tYW5hZ2VyLmdldF9yYW5kb21fbmFtZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5hZFBvc0lkID0gc2VsZi5fbmF0aXZlX2Jhbm5lcl9pZFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYWRJZCA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2NoYW5uZWxfYWRfaWQoc2VsZi5fbmF0aXZlX2Jhbm5lcl9pZClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmFkVW5pdElkID0gYWRfZGF0YV9saXN0W2xlbmd0aF0uYWRVbml0SWRcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmltZ1VybExpc3QgPSBzeXl4X3Nka191dGlscy5mb3JtYXRfcmVtb3RlX3RleHR1cmVfdXJsKGFkX2RhdGFfbGlzdFtsZW5ndGhdLmltZ1VybExpc3RbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50aXRsZSA9IGFkX2RhdGFfbGlzdFtsZW5ndGhdLnRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5kZXNjID0gYWRfZGF0YV9saXN0W2xlbmd0aF0uZGVzY1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc3RhdGUgPSBlX2FkX25hdGl2ZV9zdGF0ZS5uZWVkX3Nob3dcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLm5hdGl2ZV90eXBlID0gZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfYmFubmVyXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRfbmF0aXZlX2RhdGEoZGF0YSkgLy8g5L+d5a2Y57yT5a2YXHJcbiAgICAgICAgICAgICAgICAgICAgLy/lsZXnpLrljp/nlJ9iYW5uZXJ1aVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd19uYXRpdmVfYmFubmVyX3VpKClcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9hZF9wYXJhbS5vbkxvYWQgJiYgc2VsZi5fYWRfcGFyYW0ub25Mb2FkKClcclxuICAgICAgICAgICAgICAgICAgICBzeXl4X2Fkdl9tYW5hZ2VyLmFkZF9uYXRpdmVfc2hvd19jb3VudCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uX3Nob3coKSB7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uX2Nsb3NlKHBhcmFtLCByZXMpIHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fZXJyb3IocGFyYW0sIGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImlnYy0tLS0tc3l5eF9hZHZfbWFuYWdlci0tLS0tLS1uYXRpdmVfYmFubmVyIG9uRXJyb3JcIiwgZXJyKSAvLyDnrKzkuIDmrKHmsqHotbDov5nph4xcclxuICAgICAgICAgICAgICAgIHNlbGYubG9hZF9uYXRpdmVfYmFubmVyX2Vycm9yKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVwb3J0X2FkX2NsaWNrKGFkX3Bvc19pZDogc3RyaW5nLCBuYXRpdmVfZGF0YT8pIHtcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlX2Jhbm5lcl9pZCAhPSBhZF9wb3NfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfYmFubmVyX3JlcG9ydF9jbGlja191cGRhdGVfc3dpdGNoXCJdKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9iYW5uZXJfcmVwb3J0X2NsaWNrX3VwZGF0ZV9zd2l0Y2hcIl0udmFsdWVbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWVkX3Nob3cgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRfbmF0aXZlX2Jhbm5lcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlcG9ydF9hZF9zaG93KGFkX3Bvc19pZDogc3RyaW5nLCBuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbmF0aXZlX2Jhbm5lcl9pZCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGFkX25hdGl2ZV9pbnRlcnN0aXRpYWwgIHJlcG9ydF9hZF9jbGljayB0aGlzLmFkX3Bvc19pZCBpcyBudWxsISFcIilcclxuICAgICAgICAgICAgdGhpcy5fbmF0aXZlX2Jhbm5lcl9pZCA9IGVfYWRfaWQubmF0aXZlX2Jhbm5lclxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX25hdGl2ZV9iYW5uZXJfaWQgPT0gYWRfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RfYWRfaWQgPSBuYXRpdmVfZGF0YS5pZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWxleekuuWOn+eUn2Jhbm5lclVpXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaG93X25hdGl2ZV9iYW5uZXJfdWkoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgdGhpcy5oaWRlX25vcm1hbF9iYW5uZXIoKVxyXG4gICAgICAgIGlmICh0aGlzLm5lZWRfc2hvdykge1xyXG4gICAgICAgICAgICBzeXl4X21hbmFnZXIuY3JlYXRlX25hdGl2ZV9iYW5uZXIoZnVuY3Rpb24gKHZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9jdXJfbmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmJhbm5lcl9zaG93aW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2FkX3BhcmFtLm9uU2hvdyAmJiBzZWxmLl9hZF9wYXJhbS5vblNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2hvdyAmJiB2aWV3LnNob3coc2VsZi5fY3VyX25hdGl2ZV9kYXRhKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+WOn+eUn2Jhbm5lclVpXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlX25hdGl2ZV9iYW5uZXJfdWkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNfb3Bwb192aXZvKCkpIHtcclxuICAgICAgICAgICAgc3l5eF9tYW5hZ2VyLmxvYWRfdmlldyhzeXl4X3ZpZXcubmF0aXZlX2Jhbm5lciwgZnVuY3Rpb24gKHZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcgJiYgdmlldy5oaWRlICYmIHZpZXcuaGlkZSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295Y6f55Sf5aSx6LSlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX25hdGl2ZV9iYW5uZXJfZXJyb3IoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVfY3VyX25hdGl2ZV9kYXRhKHRoaXMuX2xhc3RfYWRfaWQpXHJcbiAgICAgICAgLy/ljp/nlJ/liqDovb3lpLHotKUg5LuO5rGg5a2Q5Y+W5LiA5Liq5ZKM5LiK5qyh5bGV56S65LiN5ZCM55qE5pWw5o2uXHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cl9uYXRpdmVfZGF0YSkge1xyXG4gICAgICAgICAgICAvL+acieS4jeWQjOeahOaVsOaNrlxyXG4gICAgICAgICAgICB0aGlzLnNob3dfbmF0aXZlX2Jhbm5lcl91aSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93X25vcm1hbF9iYW5uZXIoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWKoOi9veWOn+aZrumAmkJhbm5lcuWksei0pVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX25vcm1hbF9iYW5uZXJfZXJyb3IoKSB7XHJcbiAgICAgICAgdGhpcy5iYW5uZXJfc2hvd2luZyA9IGZhbHNlXHJcbiAgICAgICAgLy/mma7pgJpiYW5uZXLmiqXplJkgIOaKiuS5i+WJjee0r+enr+WxleekuueahGJhbm5lcuaXtumXtOmHjee9rlxyXG4gICAgICAgIGlmICh0aGlzLm5lZWRfc2hvdykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZV9jdXJfbmF0aXZlX2RhdGEoKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VyX25hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dfbmF0aXZlX2Jhbm5lcl91aSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldF9zaG93X2Vycm9yX21vZGVsKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0X25vcm1hbF9iYW5uZXJfc3dpdGNoKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxfYmFubmVyX3N3aXRjaCA9IHZhbHVlXHJcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVfbm9ybWFsX2Jhbm5lcigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIOaYvuekuuaZrumAmmJhbm5lclxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBzaG93X25vcm1hbF9iYW5uZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wic2hvd19ub3JtYWxfYmFubmVyX3N3aXRjaFwiXSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJzaG93X25vcm1hbF9iYW5uZXJfc3dpdGNoXCJdLnZhbHVlWzBdID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMubm9ybWFsX2Jhbm5lcl9zd2l0Y2gpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSB2aXZvIGFkX2Jhbm5lciBzaG93X25vcm1hbF9iYW5uZXIgbm9ybWFsX2Jhbm5lcl9zd2l0Y2ggaXMgY2xvc2UhISFcIilcclxuICAgICAgICAgICAgdGhpcy5sb2FkX25vcm1hbF9iYW5uZXJfZXJyb3IoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAvL3Zpdm/muKDpgZPpmZDliLbkuIDkuIsgIOmUgOavgWJhbm5lcjEwc+WQjuaJjeiDveWxleekuuaZrumAmmJhbm5lclxyXG4gICAgICAgIGlmICghdGhpcy5jYW5fc2hvd192aXZvX2Jhbm5lciAmJiBzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS52aXZvX3FnKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJpZ2MtLS0tLS1zeXl4X2Fkdl9tYW5hZ2VyIHNob3dfbm9ybWFsX2Jhbm5lciBvbkVycm9yIGNhbl9zaG93X3Zpdm9fYmFubmVyIGlzIGZhbHNlISFcIilcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSB2aXZvIGFkX2Jhbm5lciBzaG93X25vcm1hbF9iYW5uZXIgY3JlYXRlIHRvbyBvZnRlbiEhIVwiKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHZpdm8gYWRfYmFubmVyIHNob3dfbm9ybWFsX2Jhbm5lciBzbyB0aGF0IHVzZSBvbGQgbmF0aXZlIGJhbm5lciBkYXRhISEhXCIpXHJcbiAgICAgICAgICAgIHRoaXMubG9hZF9ub3JtYWxfYmFubmVyX2Vycm9yKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzeXl4X21hbmFnZXIuY3JlYXRlX2FkKGlnYy5lX2FkX3R5cGUuYmFubmVyLCBzZWxmLl9ub3JtYWxfYmFubmVyX2lkLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkxvYWQocGFyYW0sIHJlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWRfcGFyYW0ub25Mb2FkICYmIHNlbGYuX2FkX3BhcmFtLm9uTG9hZCgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uU2hvdygpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubm9ybWFsX2Jhbm5lcl9zaG93aW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBzaG93X25vcm1hbF9iYW5uZXIgc3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlX25hdGl2ZV9iYW5uZXJfdWkoKVxyXG4gICAgICAgICAgICAgICAgLy9iYW5uZXLlsZXnpLrmiJDlip/lkI7liKTmlq3lvZPliY3og73lkKblsZXnpLpiYW5uZXJcclxuICAgICAgICAgICAgICAgIHNlbGYuYmFubmVyX3Nob3dpbmcgPSBzZWxmLm5lZWRfc2hvd1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubmVlZF9zaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fYWRfcGFyYW0ub25TaG93ICYmIHNlbGYuX2FkX3BhcmFtLm9uU2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5hZGRfbmF0aXZlX3Nob3dfY291bnQoKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhpZGVfbm9ybWFsX2Jhbm5lcigpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uQ2xvc2UocGFyYW0sIHJlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWRfcGFyYW0ub25DbG9zZSAmJiBzZWxmLl9hZF9wYXJhbS5vbkNsb3NlKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcihwYXJhbSwgZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiaWdjLS0tLS0tc3l5eF9hZHZfbWFuYWdlciBzaG93X25vcm1hbF9iYW5uZXIgb25FcnJvclwiLCBlcnIpXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9hZF9wYXJhbS5vbkVycm9yICYmIHNlbGYuX2FkX3BhcmFtLm9uRXJyb3IocGFyYW0sIGVycik7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGZhaWwgdG8gc2hvdyBub3JtYWwgYmFubmVyIHNvIHRoYXQgdXNlIG5hdGl2ZSBiYW5uZXIncyBkYXRhXCIpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRfbm9ybWFsX2Jhbm5lcl9lcnJvcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPov5vlhaXliLBiYW5uZXLlsZXnpLrmiqXplJnml7bvvIzmraTml7bmsqHmnInku7vkvZXljp/nlJ9iYW5uZXLmlbDmja5cclxuICAgICAqIOmXtOmalOS4gOauteaXtumXtOWOu+WIpOaWreW9k+WJjeaYr+WQpumcgOimgeWxleekuuW5tuS4lOW9k+WJjeayoeacieWOn+eUn2Jhbm5lcueahOaVsOaNruWPr+S7peWxleekuu+8jOWwseWOu+WKoOi9veWxleekulxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYmFubmVyX3RpbWVyX2lkXHJcbiAgICBzdGF0aWMgc2V0X3Nob3dfZXJyb3JfbW9kZWwoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgaWYgKHN5eXhfYWR2X21hbmFnZXIuY2hlY2tfaXNfb3Blbl9vcHBvX3J1bGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmJhbm5lcl90aW1lcl9pZCAmJiBjbGVhclRpbWVvdXQodGhpcy5iYW5uZXJfdGltZXJfaWQpXHJcbiAgICAgICAgICAgIHRoaXMuYmFubmVyX3RpbWVyX2lkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZV9jdXJfbmF0aXZlX2RhdGEoKVxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubmVlZF9zaG93ICYmICFzZWxmLl9jdXJfbmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGFkX29wcG9fYmFubmVyIHNldF9zaG93X2Vycm9yX21vZGVsIGF1dG8gbG9hZF9uYXRpdmVfYmFubmVyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2FkX25hdGl2ZV9iYW5uZXIoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLnVwZGF0ZV9jZCAqIDEwMDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5pmu6YCaYmFubmVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBub3JtYWxfYmFubmVyX3RpbWVyX2lkXHJcbiAgICBzdGF0aWMgaGlkZV9ub3JtYWxfYmFubmVyKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoc2VsZi5fbm9ybWFsX2Jhbm5lcl9pZCkge1xyXG5cclxuICAgICAgICAgICAgLy92aXZv5rig6YGT5LiLICDmma7pgJpiYW5uZXLlt7Lnu4/lnKjmmL7npLogIOmUgOavgeeahOivneiusOW9lTEwc+WGheS4jeiDveWGjeasoeWIm+W7ulxyXG4gICAgICAgICAgICBpZiAoc2VsZi5ub3JtYWxfYmFubmVyX3Nob3dpbmcgJiYgc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUudml2b19xZykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jYW5fc2hvd192aXZvX2Jhbm5lciA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vcm1hbF9iYW5uZXJfdGltZXJfaWQgJiYgY2xlYXJUaW1lb3V0KHRoaXMubm9ybWFsX2Jhbm5lcl90aW1lcl9pZClcclxuICAgICAgICAgICAgICAgIHRoaXMubm9ybWFsX2Jhbm5lcl90aW1lcl9pZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2FuX3Nob3dfdml2b19iYW5uZXIgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LCAxMTAwMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLm5vcm1hbF9iYW5uZXJfc2hvd2luZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5kZXN0cm95X2FkKGlnYy5lX2FkX3R5cGUuYmFubmVyLCBzZWxmLl9ub3JtYWxfYmFubmVyX2lkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeOqeWutuaJi+WKqOeCueWHu+S6huWFs+mXrWJhbm5lclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmluZ2VyX2Nsb3NlX2Jhbm5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5pc19vcHBvX3Zpdm8oKSAmJiB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSAmJiB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcImZpbmdlcl9jbG9zZV9iYW5uZXJfc3dpdGNoXCJdKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcImZpbmdlcl9jbG9zZV9iYW5uZXJfc3dpdGNoXCJdLnZhbHVlWzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjZCA9IHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiZmluZ2VyX2Nsb3NlX2Jhbm5lcl9zd2l0Y2hcIl0udmFsdWVbMV0gfHwgNjBcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZV9iYW5uZXIoKVxyXG4gICAgICAgICAgICAgICAgYWRfYmFubmVyLmNhbl9zaG93X2ZpcnN0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkX2Jhbm5lci5jYW5fc2hvd19maXJzdCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0sIGNkICogMTAwMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDlvZPliY3mraPlnKjmmL7npLrljp/nlJ9CYW5uZXLnmoTmlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHVwZGF0ZV9jdXJfbmF0aXZlX2RhdGEoaWdub3JlX2lkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5iYW5uZXJfc2hvd190aW1lID0gMFxyXG4gICAgICAgIHRoaXMuX2N1cl9uYXRpdmVfZGF0YSA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X25hdGl2ZV9kYXRhKGlnbm9yZV9pZClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWCqOWtmOWOn+eUn+aVsOaNrlxyXG4gICAgICogQHBhcmFtIG5hdGl2ZV9kYXRhIOWOn+eUn+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWRkX25hdGl2ZV9kYXRhKG5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5hZGRfbmF0aXZlX2RhdGEobmF0aXZlX2RhdGEpXHJcbiAgICAgICAgdGhpcy51cGRhdGVfY3VyX25hdGl2ZV9kYXRhKHRoaXMuX2xhc3RfYWRfaWQpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzX29wcG9fdml2bygpIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUub3Bwb19xZyB8fCBzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS52aXZvX3FnIHx8IHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLndlYlxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbiJdfQ==