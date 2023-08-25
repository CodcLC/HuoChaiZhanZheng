
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/ad/ad_native_interstitial.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3b56b/goeRIKbMeVg+fS/Yl', 'ad_native_interstitial');
// syyx_sdk/controller/ad/ad_native_interstitial.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ad_native_interstitial = void 0;
var model_1 = require("../../model/model");
var syyx_sdk_enum_1 = require("../../configs/syyx_sdk_enum");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var syyx_manager_1 = require("../syyx_manager");
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var ad_banner_1 = require("./ad_banner");
var syyx_adv_manager_1 = require("./syyx_adv_manager");
var syyx_sdk_api_1 = require("../../syyx_sdk_api");
var ad_native_interstitial = /** @class */ (function () {
    function ad_native_interstitial() {
    }
    ad_native_interstitial.check_is_click_wrap = function () {
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_interstitial_click_wrap"]) {
            var rule = syyx_sdk_api_1.syyx_sdk_api.get_business_data_by_key('native_interstitial_click_wrap');
            if (rule) {
                if (this.next_click_wrap_count == -1) {
                    this.next_click_wrap_count = rule[0];
                }
                if (this.show_count == this.next_click_wrap_count) {
                    console.log("igc----- native_interstitial is easy click!");
                    this.next_click_wrap_count += rule[1] + Math.floor(Math.random() * (rule[2] - rule[1] + 1));
                    console.log("igc----- native_interstitial next easy click count：", this.next_click_wrap_count);
                    return true;
                }
            }
            else {
                return false;
            }
        }
        return false;
    };
    ad_native_interstitial.report_ad_click = function (ad_pos_id, native_data) {
        if (!this._ad_pos_id) {
            console.log("igc----- ad_native_interstitial  report_ad_click this.ad_pos_id is null!!");
            this._ad_pos_id = syyx_sdk_enum_1.e_ad_id.native_interstitial_hall;
        }
        if (this._ad_pos_id != ad_pos_id) {
            return;
        }
        //上报的是原生插屏点击  隐藏原生插屏Ui 重新请求新的原生插屏数据
        this.hide_native_interstitial_ui();
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_interstitial_report_click_update_switch"]) {
            if (this._business_config_data["native_interstitial_report_click_update_switch"].value[0] == 1) {
                this.load_native_interstitial(this._ad_param.ad_type, this._ad_param.ad_pos_id, this._ad_param.onLoad, this._ad_param.onShow, this._ad_param.onClose, this._ad_param.onError);
            }
        }
    };
    ad_native_interstitial.report_ad_show = function (ad_pos_id, native_data) {
        if (!this._ad_pos_id) {
            console.log("igc----- ad_native_interstitial  report_ad_click this.ad_pos_id is null!!");
            this._ad_pos_id = syyx_sdk_enum_1.e_ad_id.native_interstitial_hall;
        }
        if (this._ad_pos_id == ad_pos_id) {
            this._last_ad_id = native_data.id;
            ad_banner_1.ad_banner.hide_banner();
        }
    };
    ad_native_interstitial.check_can_load_native_interstitial = function () {
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["load_native_interstitial_rule"]) {
            if ((this.show_count + 1) % this._business_config_data["load_native_interstitial_rule"].value[0] == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    };
    /**
    * 加载原生插屏
    */
    ad_native_interstitial.load_native_interstitial = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        var self = this;
        if (!ad_banner_1.ad_banner.can_show_first) {
            console.log("igc----- is in oppo first ad cd");
            return;
        }
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_interstitial)) {
            this.hide_native_interstitial_ui();
            return;
        }
        this._ad_pos_id = ad_pos_id;
        this._ad_param = {
            ad_type: ad_type,
            ad_pos_id: ad_pos_id,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError,
        };
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            console.log("igc----- ad_native_interstitial native_interstitial_id no configure in adv.csv");
            return;
        }
        if (!this.check_can_load_native_interstitial()) {
            console.log("igc-----syyx_adv_manager------ limit load_native_interstitial!!!");
            console.error("igc-----syyx_adv_manager-------load_native_interstitial onError");
            onError && onError();
            self.load_native_interstitial_error();
            return;
        }
        //上一个加载的原生banner没有展示过
        var latest_data = syyx_adv_manager_1.syyx_adv_manager.get_latest_native_data(this._native_data_list);
        if (latest_data && latest_data.state == syyx_sdk_enum_1.e_ad_native_state.need_show) {
            //展示原生插屏
            self.show_native_interstitial_ui(latest_data);
            onLoad && onLoad({}, latest_data);
            onShow && onShow();
            return;
        }
        //web渠道  返回假数据
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            var data = new model_1.native_ad_data();
            data.id = igc.utils_manager.get_random_name();
            data.adPosId = ad_pos_id;
            data.adId = "1";
            data.adUnitId = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([0, 100000]);
            data.imgUrlList = "https://static-cdn.llewan.com/h5/ddsdk/plugin/share_img.jpg";
            data.title = "原生插屏标题" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([200, 300]);
            data.desc = "原生插屏描述" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([200, 300]);
            data.state = syyx_sdk_enum_1.e_ad_native_state.need_show;
            data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_interstitial;
            this.add_native_data(data);
            //展示原生插屏
            this.show_native_interstitial_ui(data);
            onLoad && onLoad({}, data);
            onShow && onShow();
            return;
        }
        syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.native, ad_pos_id, function on_load(param, ad_data_list) {
            console.log("igc-----syyx_adv_manager-------load_native_interstitial on_load", ad_data_list);
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
                data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_interstitial;
                self.add_native_data(data);
                //展示原生插屏
                self.show_native_interstitial_ui(data);
                onLoad && onLoad({}, data);
                onShow && onShow();
                // syyx_adv_manager.add_native_show_count()
            }
        }, function on_show() {
        }, function on_close(param, res) {
        }, function on_error(param, err) {
            onError && onError();
            console.error("igc-----syyx_adv_manager-------load_native_interstitial onError", err);
            self.load_native_interstitial_error();
        });
    };
    /**
     * 加载原生插屏失败
     */
    ad_native_interstitial.load_native_interstitial_error = function () {
        var native_data = undefined;
        if (this.check_can_load_native_interstitial()) {
            native_data = syyx_adv_manager_1.syyx_adv_manager.get_native_data(this._last_ad_id);
        }
        else {
            native_data = this.get_native_data(this._last_ad_id, syyx_sdk_enum_1.e_ad_native_type.native_interstitial);
        }
        if (native_data) {
            //自己有数据的话
            this.show_native_interstitial_ui(native_data);
        }
        else {
            this.show_normal_interstitial();
        }
    };
    /**
     * 普通插屏报错
     */
    ad_native_interstitial.load_normal_interstitial_error = function () {
        var native_data = undefined;
        if (this.check_can_load_native_interstitial()) {
            native_data = syyx_adv_manager_1.syyx_adv_manager.get_native_data();
        }
        else {
            native_data = this.get_native_data(undefined, syyx_sdk_enum_1.e_ad_native_type.native_interstitial);
        }
        if (native_data) {
            //自己有数据的话
            this.show_native_interstitial_ui(native_data);
        }
    };
    ad_native_interstitial.show_normal_interstitial = function () {
        var self = this;
        this._normal_ad_pos_id = syyx_adv_manager_1.syyx_adv_manager._adv_config_data[syyx_sdk_enum_1.e_ad_id.native_interstitial_hall].backup_id || undefined;
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel == igc.e_channel_type.vivo_qg && this._normal_ad_pos_id) {
            syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.interstitial, this._normal_ad_pos_id, function () {
                ad_banner_1.ad_banner.hide_banner();
            }, function () { }, function () {
            }, function () {
                //普通插屏加载报错
                self.load_normal_interstitial_error();
            });
        }
    };
    /**
     * 展示带遮罩的原生插屏
     */
    ad_native_interstitial.show_native_interstitial_ui = function (native_data) {
        syyx_sdk_api_1.syyx_sdk_api.create_interstitial(function (view) {
            view.show && view.show(native_data);
        });
    };
    /**
    * 隐藏带遮罩的原生插屏
    */
    ad_native_interstitial.hide_native_interstitial_ui = function () {
        syyx_sdk_api_1.syyx_sdk_api.load_view(model_1.syyx_view.interstitial, function (view) {
            view.hide && view.hide();
        });
    };
    /**
     * 储存原生数据
     * @param native_data 原生数据
     */
    ad_native_interstitial.add_native_data = function (native_data) {
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            syyx_adv_manager_1.syyx_adv_manager.add_native_data(native_data);
        }
        else {
            this._native_data_list[0] = native_data;
        }
    };
    /**
     *  原生插屏只是用原生Banner和结算原生数据
     */
    ad_native_interstitial.get_native_data = function (ignore_id, ignore_type) {
        if (ignore_id === void 0) { ignore_id = undefined; }
        if (ignore_type === void 0) { ignore_type = undefined; }
        if (!ad_banner_1.ad_banner.can_show_first) {
            console.log("igc ----- oppo's first native ad is in cd");
            return undefined;
        }
        //判断各个原生点击率是否超标
        var banner_limit = syyx_adv_manager_1.syyx_adv_manager.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_banner);
        var inner_limit = syyx_adv_manager_1.syyx_adv_manager.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial);
        var interstitial_limit = syyx_adv_manager_1.syyx_adv_manager.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_interstitial);
        // console.log("原生插屏使用原生池 筛选条件--------->忽略id：", ignore_id, "忽略原生类型：", ignore_type)
        // console.log("原生Banner点击率:", banner_limit)
        // console.log("结算原生点击率:", inner_limit)
        // console.log("原生插屏点击率:", interstitial_limit)
        var cur_data_cache = [];
        for (var i in syyx_adv_manager_1.syyx_adv_manager._native_data_cache) {
            if (syyx_adv_manager_1.syyx_adv_manager._native_data_cache[i].id != ignore_id && syyx_adv_manager_1.syyx_adv_manager._native_data_cache[i].native_type != ignore_type) {
                if (syyx_adv_manager_1.syyx_adv_manager._native_data_cache[i].native_type == syyx_sdk_enum_1.e_ad_native_type.native_banner && !banner_limit) {
                    cur_data_cache.push(syyx_adv_manager_1.syyx_adv_manager._native_data_cache[i]);
                }
                else if (syyx_adv_manager_1.syyx_adv_manager._native_data_cache[i].native_type == syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial && !inner_limit) {
                    cur_data_cache.push(syyx_adv_manager_1.syyx_adv_manager._native_data_cache[i]);
                }
                else if (syyx_adv_manager_1.syyx_adv_manager._native_data_cache[i].native_type == syyx_sdk_enum_1.e_ad_native_type.native_interstitial && !interstitial_limit) {
                    cur_data_cache.push(syyx_adv_manager_1.syyx_adv_manager._native_data_cache[i]);
                }
            }
        }
        var banner_list = [];
        var inner_list = [];
        for (var i in cur_data_cache) {
            if (cur_data_cache[i].native_type == syyx_sdk_enum_1.e_ad_native_type.native_banner) {
                banner_list.push(cur_data_cache[i]);
            }
            else if (cur_data_cache[i].native_type == syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial) {
                inner_list.push(cur_data_cache[i]);
            }
        }
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["first_use_natibe_banner"]) {
            if (this._business_config_data["first_use_natibe_banner"].value[0] == 1) {
                if (banner_list.length > 0) {
                    // console.log("原生插屏使用原生banner数据")
                    return this.get_cur_data(banner_list);
                }
                else {
                    if (inner_list.length > 0) {
                        // console.log("原生插屏使用结算原生数据")
                        return this.get_cur_data(inner_list);
                    }
                }
            }
            else {
                if (inner_list.length > 0) {
                    // console.log("原生插屏使用结算原生数据")
                    return this.get_cur_data(inner_list);
                }
                else {
                    if (banner_list.length > 0) {
                        // console.log("原生插屏使用原生banner数据")
                        return this.get_cur_data(banner_list);
                    }
                }
            }
        }
        return undefined;
    };
    ad_native_interstitial.get_cur_data = function (cur_data_cache) {
        if (syyx_adv_manager_1.syyx_adv_manager.check_native_data_list_is_reprot(cur_data_cache)) {
            //全部数据都上报曝光过了
            console.log("igc----- syyx_adv_manager use old load native data");
            return syyx_adv_manager_1.syyx_adv_manager.get_min_order_native_data(cur_data_cache);
        }
        else {
            //有数据没有上报过曝光  用最新数据
            console.log("igc----- syyx_adv_manager use new load native data");
            return syyx_adv_manager_1.syyx_adv_manager.get_latest_native_data(cur_data_cache);
        }
    };
    /**
    * 上一次显示的id
    */
    ad_native_interstitial._last_ad_id = undefined;
    /**
      * 原生数据
      */
    ad_native_interstitial._native_data_list = [];
    /**
    * 远端运营配置
    */
    ad_native_interstitial._business_config_data = {};
    ad_native_interstitial.show_count = 0;
    ad_native_interstitial.next_click_wrap_count = -1;
    return ad_native_interstitial;
}());
exports.ad_native_interstitial = ad_native_interstitial;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXGFkXFxhZF9uYXRpdmVfaW50ZXJzdGl0aWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUE4RDtBQUM5RCw2REFBMkY7QUFDM0YsNkRBQTREO0FBQzVELGdEQUErQztBQUMvQyxpRUFBMkQ7QUFDM0QseUNBQXdDO0FBQ3hDLHVEQUFzRDtBQUN0RCxtREFBa0Q7QUFDbEQ7SUFBQTtJQThYQSxDQUFDO0lBNVZVLDBDQUFtQixHQUExQjtRQUNJLElBQUksQ0FBQyxxQkFBcUIsR0FBRywyQkFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDL0QsSUFBSSxJQUFJLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLGdDQUFnQyxDQUFDLEVBQUU7WUFDNUYsSUFBSSxJQUFJLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1lBQ2xGLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUN2QztnQkFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO29CQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7b0JBQzFELElBQUksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQzNGLE9BQU8sQ0FBQyxHQUFHLENBQUMscURBQXFELEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7b0JBQzlGLE9BQU8sSUFBSSxDQUFBO2lCQUNkO2FBQ0o7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLENBQUE7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUVNLHNDQUFlLEdBQXRCLFVBQXVCLFNBQWlCLEVBQUUsV0FBWTtRQUVsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDJFQUEyRSxDQUFDLENBQUE7WUFDeEYsSUFBSSxDQUFDLFVBQVUsR0FBRyx1QkFBTyxDQUFDLHdCQUF3QixDQUFBO1NBQ3JEO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBRTtZQUM5QixPQUFNO1NBQ1Q7UUFFRCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUE7UUFFbEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLDJCQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUMvRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUMsZ0RBQWdELENBQUMsRUFBRTtZQUM1RyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFDakcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTthQUM3RTtTQUNKO0lBQ0wsQ0FBQztJQUVNLHFDQUFjLEdBQXJCLFVBQXNCLFNBQWlCLEVBQUUsV0FBVztRQUVoRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLDJFQUEyRSxDQUFDLENBQUE7WUFDeEYsSUFBSSxDQUFDLFVBQVUsR0FBRyx1QkFBTyxDQUFDLHdCQUF3QixDQUFBO1NBQ3JEO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsRUFBRTtZQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxFQUFFLENBQUE7WUFDakMscUJBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtTQUMxQjtJQUNMLENBQUM7SUFFTSx5REFBa0MsR0FBekM7UUFDSSxJQUFJLENBQUMscUJBQXFCLEdBQUcsMkJBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQy9ELElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQywrQkFBK0IsQ0FBQyxFQUFFO1lBQzNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25HLE9BQU8sSUFBSSxDQUFBO2FBQ2Q7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLENBQUE7YUFDZjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQ7O01BRUU7SUFDSywrQ0FBd0IsR0FBL0IsVUFBZ0MsT0FBdUIsRUFBRSxTQUFrQixFQUFFLE1BQWlCLEVBQUUsTUFBaUIsRUFBRSxPQUFrQixFQUFFLE9BQWtCO1FBQ3JKLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtRQUVmLElBQUksQ0FBQyxxQkFBUyxDQUFDLGNBQWMsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7WUFDOUMsT0FBTTtTQUNUO1FBRUQsSUFBSSxtQ0FBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxnQ0FBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQzdFLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFBO1lBQ2xDLE9BQU07U0FDVDtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDYixPQUFPLEVBQUUsT0FBTztZQUNoQixTQUFTLEVBQUUsU0FBUztZQUNwQixNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQTtRQUVELElBQUksS0FBSyxHQUFHLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3pELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLGdGQUFnRixDQUFDLENBQUE7WUFDN0YsT0FBTTtTQUNUO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxFQUFFO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0VBQWtFLENBQUMsQ0FBQTtZQUMvRSxPQUFPLENBQUMsS0FBSyxDQUFDLGlFQUFpRSxDQUFDLENBQUE7WUFDaEYsT0FBTyxJQUFJLE9BQU8sRUFBRSxDQUFBO1lBQ3BCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFBO1lBQ3JDLE9BQU07U0FDVDtRQUVELHFCQUFxQjtRQUNyQixJQUFJLFdBQVcsR0FBRyxtQ0FBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUNqRixJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsS0FBSyxJQUFJLGlDQUFpQixDQUFDLFNBQVMsRUFBRTtZQUNqRSxRQUFRO1lBQ1IsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQzdDLE1BQU0sSUFBSSxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1lBQ2pDLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQTtZQUNsQixPQUFNO1NBQ1Q7UUFFRCxjQUFjO1FBQ2QsSUFBSSw0QkFBVSxDQUFDLGdCQUFnQixLQUFLLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFO1lBQ3hELElBQUksSUFBSSxHQUFHLElBQUksc0JBQWMsRUFBRSxDQUFBO1lBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtZQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQTtZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQTtZQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsNkRBQTZELENBQUE7WUFDL0UsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsK0JBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3BFLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLCtCQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLGlDQUFpQixDQUFDLFNBQVMsQ0FBQTtZQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLGdDQUFnQixDQUFDLG1CQUFtQixDQUFBO1lBQ3ZELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDMUIsUUFBUTtZQUNSLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0QyxNQUFNLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMxQixNQUFNLElBQUksTUFBTSxFQUFFLENBQUE7WUFDbEIsT0FBTTtTQUNUO1FBRUQsMkJBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUNsRCxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUUsWUFBWTtZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlFQUFpRSxFQUFFLFlBQVksQ0FBQyxDQUFBO1lBQzVGLFFBQVE7WUFDUixJQUFJLFlBQVksSUFBSSxTQUFTLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9DLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQTthQUN2QjtpQkFBTTtnQkFDSCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7Z0JBQ2QsSUFBSSw0QkFBVSxDQUFDLGdCQUFnQixLQUFLLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO29CQUM1RCxnQkFBZ0I7b0JBQ2hCLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtpQkFDbkM7Z0JBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxzQkFBYyxFQUFFLENBQUE7Z0JBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsQ0FBQTtnQkFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUE7Z0JBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsbUNBQWdCLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQTtnQkFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRywrQkFBYyxDQUFDLHlCQUF5QixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDOUYsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFBO2dCQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUE7Z0JBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsaUNBQWlCLENBQUMsU0FBUyxDQUFBO2dCQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLGdDQUFnQixDQUFDLG1CQUFtQixDQUFBO2dCQUN2RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUMxQixRQUFRO2dCQUNSLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdEMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQzFCLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQTtnQkFDbEIsMkNBQTJDO2FBQzlDO1FBQ0wsQ0FBQyxFQUNELFNBQVMsT0FBTztRQUNoQixDQUFDLEVBQ0QsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUc7UUFDNUIsQ0FBQyxFQUNELFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHO1lBQ3hCLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQTtZQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLGlFQUFpRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ3JGLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFBO1FBQ3pDLENBQUMsQ0FDSixDQUFBO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0kscURBQThCLEdBQXJDO1FBQ0ksSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksSUFBSSxDQUFDLGtDQUFrQyxFQUFFLEVBQUU7WUFDM0MsV0FBVyxHQUFHLG1DQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7U0FDbkU7YUFBTTtZQUNILFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsZ0NBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtTQUM3RjtRQUVELElBQUksV0FBVyxFQUFFO1lBQ2IsU0FBUztZQUNULElBQUksQ0FBQywyQkFBMkIsQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUNoRDthQUFNO1lBQ0gsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUE7U0FDbEM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxxREFBOEIsR0FBckM7UUFDSSxJQUFJLFdBQVcsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxJQUFJLENBQUMsa0NBQWtDLEVBQUUsRUFBRTtZQUMzQyxXQUFXLEdBQUcsbUNBQWdCLENBQUMsZUFBZSxFQUFFLENBQUE7U0FDbkQ7YUFBTTtZQUNILFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxnQ0FBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1NBQ3RGO1FBQ0QsSUFBSSxXQUFXLEVBQUU7WUFDYixTQUFTO1lBQ1QsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQ2hEO0lBQ0wsQ0FBQztJQUVNLCtDQUF3QixHQUEvQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNmLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxtQ0FBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBTyxDQUFDLHdCQUF3QixDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQTtRQUNuSCxJQUFJLDRCQUFVLENBQUMsZ0JBQWdCLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3JGLDJCQUFZLENBQUMsU0FBUyxDQUNsQixHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksRUFDMUIsSUFBSSxDQUFDLGlCQUFpQixFQUN0QjtnQkFDSSxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQzNCLENBQUMsRUFDRCxjQUFjLENBQUMsRUFDZjtZQUNBLENBQUMsRUFDRDtnQkFDSSxVQUFVO2dCQUNWLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFBO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1NBQ1Q7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxrREFBMkIsR0FBbEMsVUFBbUMsV0FBVztRQUMxQywyQkFBWSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsSUFBSTtZQUMzQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O01BRUU7SUFDSyxrREFBMkIsR0FBbEM7UUFDSSwyQkFBWSxDQUFDLFNBQVMsQ0FBQyxpQkFBUyxDQUFDLFlBQVksRUFBRSxVQUFVLElBQUk7WUFDekQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksc0NBQWUsR0FBdEIsVUFBdUIsV0FBVztRQUM5QixJQUFJLG1DQUFnQixDQUFDLHVCQUF1QixFQUFFLEVBQUU7WUFDNUMsbUNBQWdCLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQ2hEO2FBQU07WUFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFBO1NBQzFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0ksc0NBQWUsR0FBdEIsVUFBdUIsU0FBcUIsRUFBRSxXQUF1QjtRQUE5QywwQkFBQSxFQUFBLHFCQUFxQjtRQUFFLDRCQUFBLEVBQUEsdUJBQXVCO1FBQ2pFLElBQUksQ0FBQyxxQkFBUyxDQUFDLGNBQWMsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUE7WUFDeEQsT0FBTyxTQUFTLENBQUE7U0FDbkI7UUFFRCxlQUFlO1FBQ2YsSUFBSSxZQUFZLEdBQUcsbUNBQWdCLENBQUMsb0JBQW9CLENBQUMsZ0NBQWdCLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDeEYsSUFBSSxXQUFXLEdBQUcsbUNBQWdCLENBQUMsb0JBQW9CLENBQUMsZ0NBQWdCLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUNuRyxJQUFJLGtCQUFrQixHQUFHLG1DQUFnQixDQUFDLG9CQUFvQixDQUFDLGdDQUFnQixDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFFcEcsa0ZBQWtGO1FBRWxGLDRDQUE0QztRQUM1Qyx1Q0FBdUM7UUFDdkMsOENBQThDO1FBRTlDLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQTtRQUN2QixLQUFLLElBQUksQ0FBQyxJQUFJLG1DQUFnQixDQUFDLGtCQUFrQixFQUFFO1lBQy9DLElBQUksbUNBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLFNBQVMsSUFBSSxtQ0FBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksV0FBVyxFQUFFO2dCQUM3SCxJQUFJLG1DQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxnQ0FBZ0IsQ0FBQyxhQUFhLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3ZHLGNBQWMsQ0FBQyxJQUFJLENBQUMsbUNBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDOUQ7cUJBQU0sSUFBSSxtQ0FBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksZ0NBQWdCLENBQUMseUJBQXlCLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3pILGNBQWMsQ0FBQyxJQUFJLENBQUMsbUNBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDOUQ7cUJBQU0sSUFBSSxtQ0FBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLElBQUksZ0NBQWdCLENBQUMsbUJBQW1CLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtvQkFDMUgsY0FBYyxDQUFDLElBQUksQ0FBQyxtQ0FBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUM5RDthQUNKO1NBQ0o7UUFFRCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7UUFDcEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBRW5CLEtBQUssSUFBSSxDQUFDLElBQUksY0FBYyxFQUFFO1lBQzFCLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxnQ0FBZ0IsQ0FBQyxhQUFhLEVBQUU7Z0JBQ2pFLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDdEM7aUJBQU0sSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLGdDQUFnQixDQUFDLHlCQUF5QixFQUFFO2dCQUNwRixVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3JDO1NBQ0o7UUFFRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsMkJBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQy9ELElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1lBQ3JGLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckUsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDeEIsa0NBQWtDO29CQUNsQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUE7aUJBQ3hDO3FCQUFNO29CQUNILElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ3ZCLDhCQUE4Qjt3QkFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFBO3FCQUN2QztpQkFDSjthQUNKO2lCQUFNO2dCQUNILElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3ZCLDhCQUE4QjtvQkFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2lCQUN2QztxQkFBTTtvQkFDSCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUN4QixrQ0FBa0M7d0JBQ2xDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQTtxQkFDeEM7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsT0FBTyxTQUFTLENBQUE7SUFDcEIsQ0FBQztJQUVNLG1DQUFZLEdBQW5CLFVBQW9CLGNBQWM7UUFDOUIsSUFBSSxtQ0FBZ0IsQ0FBQyxnQ0FBZ0MsQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNuRSxhQUFhO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsQ0FBQyxDQUFBO1lBQ2pFLE9BQU8sbUNBQWdCLENBQUMseUJBQXlCLENBQUMsY0FBYyxDQUFDLENBQUE7U0FDcEU7YUFBTTtZQUNILG1CQUFtQjtZQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLENBQUE7WUFDakUsT0FBTyxtQ0FBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQTtTQUNqRTtJQUNMLENBQUM7SUE1WEQ7O01BRUU7SUFDSyxrQ0FBVyxHQUFHLFNBQVMsQ0FBQTtJQUM5Qjs7UUFFSTtJQUNHLHdDQUFpQixHQUFHLEVBQUUsQ0FBQTtJQUU3Qjs7TUFFRTtJQUNLLDRDQUFxQixHQUFHLEVBQUUsQ0FBQztJQWlCM0IsaUNBQVUsR0FBRyxDQUFDLENBQUE7SUFFZCw0Q0FBcUIsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQThWckMsNkJBQUM7Q0E5WEQsQUE4WEMsSUFBQTtBQTlYWSx3REFBc0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuYXRpdmVfYWRfZGF0YSwgc3l5eF92aWV3IH0gZnJvbSBcIi4uLy4uL21vZGVsL21vZGVsXCI7XHJcbmltcG9ydCB7IGVfYWRfaWQsIGVfYWRfbmF0aXZlX3N0YXRlLCBlX2FkX25hdGl2ZV90eXBlIH0gZnJvbSBcIi4uLy4uL2NvbmZpZ3Mvc3l5eF9zZGtfZW51bVwiO1xyXG5pbXBvcnQgeyBzeXl4X3Nka191dGlscyB9IGZyb20gXCIuLi8uLi91dGlscy9zeXl4X3Nka191dGlsc1wiO1xyXG5pbXBvcnQgeyBzeXl4X21hbmFnZXIgfSBmcm9tIFwiLi4vc3l5eF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHN5eXhfY29uc3QgfSBmcm9tIFwiLi4vLi4vY29uZmlncy9zeXl4X3Nka19jb25maWdcIjtcclxuaW1wb3J0IHsgYWRfYmFubmVyIH0gZnJvbSBcIi4vYWRfYmFubmVyXCI7XHJcbmltcG9ydCB7IHN5eXhfYWR2X21hbmFnZXIgfSBmcm9tIFwiLi9zeXl4X2Fkdl9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHN5eXhfc2RrX2FwaSB9IGZyb20gXCIuLi8uLi9zeXl4X3Nka19hcGlcIjtcclxuZXhwb3J0IGNsYXNzIGFkX25hdGl2ZV9pbnRlcnN0aXRpYWwge1xyXG4gICAgLyoqXHJcbiAgICAqIOS4iuS4gOasoeaYvuekuueahGlkXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIF9sYXN0X2FkX2lkID0gdW5kZWZpbmVkXHJcbiAgICAvKipcclxuICAgICAgKiDljp/nlJ/mlbDmja5cclxuICAgICAgKi9cclxuICAgIHN0YXRpYyBfbmF0aXZlX2RhdGFfbGlzdCA9IFtdXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOi/nOerr+i/kOiQpemFjee9rlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBfYnVzaW5lc3NfY29uZmlnX2RhdGEgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW5v+WRimlkXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfYWRfcG9zX2lkXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmma7pgJrmj5LlsY/phY3nva7ooahpZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX25vcm1hbF9hZF9wb3NfaWRcclxuXHJcbiAgICAvKipcclxuICAgICog5Yib5bu65bm/5ZGK5pe25Lyg5YWl55qE5Y+C5pWwXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIF9hZF9wYXJhbVxyXG5cclxuICAgIHN0YXRpYyBzaG93X2NvdW50ID0gMFxyXG5cclxuICAgIHN0YXRpYyBuZXh0X2NsaWNrX3dyYXBfY291bnQgPSAtMVxyXG5cclxuICAgIHN0YXRpYyBjaGVja19pc19jbGlja193cmFwKCkge1xyXG4gICAgICAgIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSAmJiB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pbnRlcnN0aXRpYWxfY2xpY2tfd3JhcFwiXSkge1xyXG4gICAgICAgICAgICBsZXQgcnVsZSA9IHN5eXhfc2RrX2FwaS5nZXRfYnVzaW5lc3NfZGF0YV9ieV9rZXkoJ25hdGl2ZV9pbnRlcnN0aXRpYWxfY2xpY2tfd3JhcCcpXHJcbiAgICAgICAgICAgIGlmIChydWxlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0X2NsaWNrX3dyYXBfY291bnQgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRfY2xpY2tfd3JhcF9jb3VudCA9IHJ1bGVbMF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dfY291bnQgPT0gdGhpcy5uZXh0X2NsaWNrX3dyYXBfY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIG5hdGl2ZV9pbnRlcnN0aXRpYWwgaXMgZWFzeSBjbGljayFcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRfY2xpY2tfd3JhcF9jb3VudCArPSBydWxlWzFdICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHJ1bGVbMl0gLSBydWxlWzFdICsgMSkpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBuYXRpdmVfaW50ZXJzdGl0aWFsIG5leHQgZWFzeSBjbGljayBjb3VudO+8mlwiLCB0aGlzLm5leHRfY2xpY2tfd3JhcF9jb3VudClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlcG9ydF9hZF9jbGljayhhZF9wb3NfaWQ6IHN0cmluZywgbmF0aXZlX2RhdGE/KSB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fYWRfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gYWRfbmF0aXZlX2ludGVyc3RpdGlhbCAgcmVwb3J0X2FkX2NsaWNrIHRoaXMuYWRfcG9zX2lkIGlzIG51bGwhIVwiKVxyXG4gICAgICAgICAgICB0aGlzLl9hZF9wb3NfaWQgPSBlX2FkX2lkLm5hdGl2ZV9pbnRlcnN0aXRpYWxfaGFsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FkX3Bvc19pZCAhPSBhZF9wb3NfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S4iuaKpeeahOaYr+WOn+eUn+aPkuWxj+eCueWHuyAg6ZqQ6JeP5Y6f55Sf5o+S5bGPVWkg6YeN5paw6K+35rGC5paw55qE5Y6f55Sf5o+S5bGP5pWw5o2uXHJcbiAgICAgICAgdGhpcy5oaWRlX25hdGl2ZV9pbnRlcnN0aXRpYWxfdWkoKVxyXG5cclxuICAgICAgICB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSA9IHN5eXhfbWFuYWdlci5nZXRfYnVzaW5lc3NfY29uZmlnKClcclxuICAgICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfaW50ZXJzdGl0aWFsX3JlcG9ydF9jbGlja191cGRhdGVfc3dpdGNoXCJdKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pbnRlcnN0aXRpYWxfcmVwb3J0X2NsaWNrX3VwZGF0ZV9zd2l0Y2hcIl0udmFsdWVbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkX25hdGl2ZV9pbnRlcnN0aXRpYWwodGhpcy5fYWRfcGFyYW0uYWRfdHlwZSwgdGhpcy5fYWRfcGFyYW0uYWRfcG9zX2lkLCB0aGlzLl9hZF9wYXJhbS5vbkxvYWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRfcGFyYW0ub25TaG93LCB0aGlzLl9hZF9wYXJhbS5vbkNsb3NlLCB0aGlzLl9hZF9wYXJhbS5vbkVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZXBvcnRfYWRfc2hvdyhhZF9wb3NfaWQ6IHN0cmluZywgbmF0aXZlX2RhdGEpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9hZF9wb3NfaWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBhZF9uYXRpdmVfaW50ZXJzdGl0aWFsICByZXBvcnRfYWRfY2xpY2sgdGhpcy5hZF9wb3NfaWQgaXMgbnVsbCEhXCIpXHJcbiAgICAgICAgICAgIHRoaXMuX2FkX3Bvc19pZCA9IGVfYWRfaWQubmF0aXZlX2ludGVyc3RpdGlhbF9oYWxsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fYWRfcG9zX2lkID09IGFkX3Bvc19pZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0X2FkX2lkID0gbmF0aXZlX2RhdGEuaWRcclxuICAgICAgICAgICAgYWRfYmFubmVyLmhpZGVfYmFubmVyKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNoZWNrX2Nhbl9sb2FkX25hdGl2ZV9pbnRlcnN0aXRpYWwoKSB7XHJcbiAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibG9hZF9uYXRpdmVfaW50ZXJzdGl0aWFsX3J1bGVcIl0pIHtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLnNob3dfY291bnQgKyAxKSAlIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibG9hZF9uYXRpdmVfaW50ZXJzdGl0aWFsX3J1bGVcIl0udmFsdWVbMF0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWKoOi9veWOn+eUn+aPkuWxj1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX25hdGl2ZV9pbnRlcnN0aXRpYWwoYWRfdHlwZT86IGlnYy5lX2FkX3R5cGUsIGFkX3Bvc19pZD86IHN0cmluZywgb25Mb2FkPzogRnVuY3Rpb24sIG9uU2hvdz86IEZ1bmN0aW9uLCBvbkNsb3NlPzogRnVuY3Rpb24sIG9uRXJyb3I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBpZiAoIWFkX2Jhbm5lci5jYW5fc2hvd19maXJzdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGlzIGluIG9wcG8gZmlyc3QgYWQgY2RcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3l5eF9hZHZfbWFuYWdlci5jaGVja19pc19jbGlja19saW1pdChlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9pbnRlcnN0aXRpYWwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZV9uYXRpdmVfaW50ZXJzdGl0aWFsX3VpKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hZF9wb3NfaWQgPSBhZF9wb3NfaWRcclxuICAgICAgICB0aGlzLl9hZF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgYWRfdHlwZTogYWRfdHlwZSxcclxuICAgICAgICAgICAgYWRfcG9zX2lkOiBhZF9wb3NfaWQsXHJcbiAgICAgICAgICAgIG9uTG9hZDogb25Mb2FkLFxyXG4gICAgICAgICAgICBvblNob3c6IG9uU2hvdyxcclxuICAgICAgICAgICAgb25DbG9zZTogb25DbG9zZSxcclxuICAgICAgICAgICAgb25FcnJvcjogb25FcnJvcixcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhZF9pZCA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2NoYW5uZWxfYWRfaWQoYWRfcG9zX2lkKVxyXG4gICAgICAgIGlmICghYWRfaWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBhZF9uYXRpdmVfaW50ZXJzdGl0aWFsIG5hdGl2ZV9pbnRlcnN0aXRpYWxfaWQgbm8gY29uZmlndXJlIGluIGFkdi5jc3ZcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tfY2FuX2xvYWRfbmF0aXZlX2ludGVyc3RpdGlhbCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS1zeXl4X2Fkdl9tYW5hZ2VyLS0tLS0tIGxpbWl0IGxvYWRfbmF0aXZlX2ludGVyc3RpdGlhbCEhIVwiKVxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiaWdjLS0tLS1zeXl4X2Fkdl9tYW5hZ2VyLS0tLS0tLWxvYWRfbmF0aXZlX2ludGVyc3RpdGlhbCBvbkVycm9yXCIpXHJcbiAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpXHJcbiAgICAgICAgICAgIHNlbGYubG9hZF9uYXRpdmVfaW50ZXJzdGl0aWFsX2Vycm9yKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S4iuS4gOS4quWKoOi9veeahOWOn+eUn2Jhbm5lcuayoeacieWxleekuui/h1xyXG4gICAgICAgIGxldCBsYXRlc3RfZGF0YSA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2xhdGVzdF9uYXRpdmVfZGF0YSh0aGlzLl9uYXRpdmVfZGF0YV9saXN0KVxyXG4gICAgICAgIGlmIChsYXRlc3RfZGF0YSAmJiBsYXRlc3RfZGF0YS5zdGF0ZSA9PSBlX2FkX25hdGl2ZV9zdGF0ZS5uZWVkX3Nob3cpIHtcclxuICAgICAgICAgICAgLy/lsZXnpLrljp/nlJ/mj5LlsY9cclxuICAgICAgICAgICAgc2VsZi5zaG93X25hdGl2ZV9pbnRlcnN0aXRpYWxfdWkobGF0ZXN0X2RhdGEpXHJcbiAgICAgICAgICAgIG9uTG9hZCAmJiBvbkxvYWQoe30sIGxhdGVzdF9kYXRhKVxyXG4gICAgICAgICAgICBvblNob3cgJiYgb25TaG93KClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3dlYua4oOmBkyAg6L+U5Zue5YGH5pWw5o2uXHJcbiAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLndlYikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IG5ldyBuYXRpdmVfYWRfZGF0YSgpXHJcbiAgICAgICAgICAgIGRhdGEuaWQgPSBpZ2MudXRpbHNfbWFuYWdlci5nZXRfcmFuZG9tX25hbWUoKVxyXG4gICAgICAgICAgICBkYXRhLmFkUG9zSWQgPSBhZF9wb3NfaWRcclxuICAgICAgICAgICAgZGF0YS5hZElkID0gXCIxXCJcclxuICAgICAgICAgICAgZGF0YS5hZFVuaXRJZCA9IHN5eXhfc2RrX3V0aWxzLmdldF9yYW5kb21fbnVtYmVyKFswLCAxMDAwMDBdKVxyXG4gICAgICAgICAgICBkYXRhLmltZ1VybExpc3QgPSBcImh0dHBzOi8vc3RhdGljLWNkbi5sbGV3YW4uY29tL2g1L2Rkc2RrL3BsdWdpbi9zaGFyZV9pbWcuanBnXCJcclxuICAgICAgICAgICAgZGF0YS50aXRsZSA9IFwi5Y6f55Sf5o+S5bGP5qCH6aKYXCIgKyBzeXl4X3Nka191dGlscy5nZXRfcmFuZG9tX251bWJlcihbMjAwLCAzMDBdKVxyXG4gICAgICAgICAgICBkYXRhLmRlc2MgPSBcIuWOn+eUn+aPkuWxj+aPj+i/sFwiICsgc3l5eF9zZGtfdXRpbHMuZ2V0X3JhbmRvbV9udW1iZXIoWzIwMCwgMzAwXSlcclxuICAgICAgICAgICAgZGF0YS5zdGF0ZSA9IGVfYWRfbmF0aXZlX3N0YXRlLm5lZWRfc2hvd1xyXG4gICAgICAgICAgICBkYXRhLm5hdGl2ZV90eXBlID0gZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfaW50ZXJzdGl0aWFsXHJcbiAgICAgICAgICAgIHRoaXMuYWRkX25hdGl2ZV9kYXRhKGRhdGEpXHJcbiAgICAgICAgICAgIC8v5bGV56S65Y6f55Sf5o+S5bGPXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd19uYXRpdmVfaW50ZXJzdGl0aWFsX3VpKGRhdGEpXHJcbiAgICAgICAgICAgIG9uTG9hZCAmJiBvbkxvYWQoe30sIGRhdGEpXHJcbiAgICAgICAgICAgIG9uU2hvdyAmJiBvblNob3coKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN5eXhfbWFuYWdlci5jcmVhdGVfYWQoaWdjLmVfYWRfdHlwZS5uYXRpdmUsIGFkX3Bvc19pZCxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fbG9hZChwYXJhbSwgYWRfZGF0YV9saXN0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tc3l5eF9hZHZfbWFuYWdlci0tLS0tLS1sb2FkX25hdGl2ZV9pbnRlcnN0aXRpYWwgb25fbG9hZFwiLCBhZF9kYXRhX2xpc3QpXHJcbiAgICAgICAgICAgICAgICAvL+i/lOWbnuaVsOaNruW8guW4uFxyXG4gICAgICAgICAgICAgICAgaWYgKGFkX2RhdGFfbGlzdCA9PSB1bmRlZmluZWQgfHwgIWFkX2RhdGFfbGlzdFswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLnZpdm9fcWcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92aXZv5rig6YGT5Y+q5Y+W5pyA5ZCO5LiA5Liq5L2N572uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IGFkX2RhdGFfbGlzdC5sZW5ndGggLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbmV3IG5hdGl2ZV9hZF9kYXRhKClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmlkID0gaWdjLnV0aWxzX21hbmFnZXIuZ2V0X3JhbmRvbV9uYW1lKClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmFkUG9zSWQgPSBhZF9wb3NfaWRcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmFkSWQgPSBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9jaGFubmVsX2FkX2lkKGFkX3Bvc19pZClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmFkVW5pdElkID0gYWRfZGF0YV9saXN0W2xlbmd0aF0uYWRVbml0SWRcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmltZ1VybExpc3QgPSBzeXl4X3Nka191dGlscy5mb3JtYXRfcmVtb3RlX3RleHR1cmVfdXJsKGFkX2RhdGFfbGlzdFtsZW5ndGhdLmltZ1VybExpc3RbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50aXRsZSA9IGFkX2RhdGFfbGlzdFtsZW5ndGhdLnRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5kZXNjID0gYWRfZGF0YV9saXN0W2xlbmd0aF0uZGVzY1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc3RhdGUgPSBlX2FkX25hdGl2ZV9zdGF0ZS5uZWVkX3Nob3dcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLm5hdGl2ZV90eXBlID0gZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfaW50ZXJzdGl0aWFsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hZGRfbmF0aXZlX2RhdGEoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAvL+WxleekuuWOn+eUn+aPkuWxj1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd19uYXRpdmVfaW50ZXJzdGl0aWFsX3VpKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgb25Mb2FkICYmIG9uTG9hZCh7fSwgZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBvblNob3cgJiYgb25TaG93KClcclxuICAgICAgICAgICAgICAgICAgICAvLyBzeXl4X2Fkdl9tYW5hZ2VyLmFkZF9uYXRpdmVfc2hvd19jb3VudCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uX3Nob3coKSB7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uX2Nsb3NlKHBhcmFtLCByZXMpIHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25fZXJyb3IocGFyYW0sIGVycikge1xyXG4gICAgICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKClcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJpZ2MtLS0tLXN5eXhfYWR2X21hbmFnZXItLS0tLS0tbG9hZF9uYXRpdmVfaW50ZXJzdGl0aWFsIG9uRXJyb3JcIiwgZXJyKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkX25hdGl2ZV9pbnRlcnN0aXRpYWxfZXJyb3IoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295Y6f55Sf5o+S5bGP5aSx6LSlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX25hdGl2ZV9pbnRlcnN0aXRpYWxfZXJyb3IoKSB7XHJcbiAgICAgICAgbGV0IG5hdGl2ZV9kYXRhID0gdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tfY2FuX2xvYWRfbmF0aXZlX2ludGVyc3RpdGlhbCgpKSB7XHJcbiAgICAgICAgICAgIG5hdGl2ZV9kYXRhID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfbmF0aXZlX2RhdGEodGhpcy5fbGFzdF9hZF9pZClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuYXRpdmVfZGF0YSA9IHRoaXMuZ2V0X25hdGl2ZV9kYXRhKHRoaXMuX2xhc3RfYWRfaWQsIGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2ludGVyc3RpdGlhbClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgICAgICAvL+iHquW3seacieaVsOaNrueahOivnVxyXG4gICAgICAgICAgICB0aGlzLnNob3dfbmF0aXZlX2ludGVyc3RpdGlhbF91aShuYXRpdmVfZGF0YSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dfbm9ybWFsX2ludGVyc3RpdGlhbCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pmu6YCa5o+S5bGP5oql6ZSZXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX25vcm1hbF9pbnRlcnN0aXRpYWxfZXJyb3IoKSB7XHJcbiAgICAgICAgbGV0IG5hdGl2ZV9kYXRhID0gdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tfY2FuX2xvYWRfbmF0aXZlX2ludGVyc3RpdGlhbCgpKSB7XHJcbiAgICAgICAgICAgIG5hdGl2ZV9kYXRhID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfbmF0aXZlX2RhdGEoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5hdGl2ZV9kYXRhID0gdGhpcy5nZXRfbmF0aXZlX2RhdGEodW5kZWZpbmVkLCBlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9pbnRlcnN0aXRpYWwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgICAgICAvL+iHquW3seacieaVsOaNrueahOivnVxyXG4gICAgICAgICAgICB0aGlzLnNob3dfbmF0aXZlX2ludGVyc3RpdGlhbF91aShuYXRpdmVfZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNob3dfbm9ybWFsX2ludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB0aGlzLl9ub3JtYWxfYWRfcG9zX2lkID0gc3l5eF9hZHZfbWFuYWdlci5fYWR2X2NvbmZpZ19kYXRhW2VfYWRfaWQubmF0aXZlX2ludGVyc3RpdGlhbF9oYWxsXS5iYWNrdXBfaWQgfHwgdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PSBpZ2MuZV9jaGFubmVsX3R5cGUudml2b19xZyAmJiB0aGlzLl9ub3JtYWxfYWRfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5jcmVhdGVfYWQoXHJcbiAgICAgICAgICAgICAgICBpZ2MuZV9hZF90eXBlLmludGVyc3RpdGlhbCxcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vcm1hbF9hZF9wb3NfaWQsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRfYmFubmVyLmhpZGVfYmFubmVyKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5pmu6YCa5o+S5bGP5Yqg6L295oql6ZSZXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2FkX25vcm1hbF9pbnRlcnN0aXRpYWxfZXJyb3IoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsZXnpLrluKbpga7nvannmoTljp/nlJ/mj5LlsY9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNob3dfbmF0aXZlX2ludGVyc3RpdGlhbF91aShuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgIHN5eXhfc2RrX2FwaS5jcmVhdGVfaW50ZXJzdGl0aWFsKGZ1bmN0aW9uICh2aWV3KSB7XHJcbiAgICAgICAgICAgIHZpZXcuc2hvdyAmJiB2aWV3LnNob3cobmF0aXZlX2RhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDpmpDol4/luKbpga7nvannmoTljp/nlJ/mj5LlsY9cclxuICAgICovXHJcbiAgICBzdGF0aWMgaGlkZV9uYXRpdmVfaW50ZXJzdGl0aWFsX3VpKCkge1xyXG4gICAgICAgIHN5eXhfc2RrX2FwaS5sb2FkX3ZpZXcoc3l5eF92aWV3LmludGVyc3RpdGlhbCwgZnVuY3Rpb24gKHZpZXcpIHtcclxuICAgICAgICAgICAgdmlldy5oaWRlICYmIHZpZXcuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YKo5a2Y5Y6f55Sf5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlX2RhdGEg5Y6f55Sf5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhZGRfbmF0aXZlX2RhdGEobmF0aXZlX2RhdGEpIHtcclxuICAgICAgICBpZiAoc3l5eF9hZHZfbWFuYWdlci5jaGVja19pc19vcGVuX29wcG9fcnVsZSgpKSB7XHJcbiAgICAgICAgICAgIHN5eXhfYWR2X21hbmFnZXIuYWRkX25hdGl2ZV9kYXRhKG5hdGl2ZV9kYXRhKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25hdGl2ZV9kYXRhX2xpc3RbMF0gPSBuYXRpdmVfZGF0YVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDljp/nlJ/mj5LlsY/lj6rmmK/nlKjljp/nlJ9CYW5uZXLlkoznu5Pnrpfljp/nlJ/mlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldF9uYXRpdmVfZGF0YShpZ25vcmVfaWQgPSB1bmRlZmluZWQsIGlnbm9yZV90eXBlID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKCFhZF9iYW5uZXIuY2FuX3Nob3dfZmlyc3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MgLS0tLS0gb3BwbydzIGZpcnN0IG5hdGl2ZSBhZCBpcyBpbiBjZFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreWQhOS4quWOn+eUn+eCueWHu+eOh+aYr+WQpui2heagh1xyXG4gICAgICAgIGxldCBiYW5uZXJfbGltaXQgPSBzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX2lzX2NsaWNrX2xpbWl0KGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lcilcclxuICAgICAgICBsZXQgaW5uZXJfbGltaXQgPSBzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX2lzX2NsaWNrX2xpbWl0KGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbClcclxuICAgICAgICBsZXQgaW50ZXJzdGl0aWFsX2xpbWl0ID0gc3l5eF9hZHZfbWFuYWdlci5jaGVja19pc19jbGlja19saW1pdChlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9pbnRlcnN0aXRpYWwpXHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5Y6f55Sf5o+S5bGP5L2/55So5Y6f55Sf5rGgIOetm+mAieadoeS7ti0tLS0tLS0tLT7lv73nlaVpZO+8mlwiLCBpZ25vcmVfaWQsIFwi5b+955Wl5Y6f55Sf57G75Z6L77yaXCIsIGlnbm9yZV90eXBlKVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWOn+eUn0Jhbm5lcueCueWHu+eOhzpcIiwgYmFubmVyX2xpbWl0KVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi57uT566X5Y6f55Sf54K55Ye7546HOlwiLCBpbm5lcl9saW1pdClcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWOn+eUn+aPkuWxj+eCueWHu+eOhzpcIiwgaW50ZXJzdGl0aWFsX2xpbWl0KVxyXG5cclxuICAgICAgICBsZXQgY3VyX2RhdGFfY2FjaGUgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gc3l5eF9hZHZfbWFuYWdlci5fbmF0aXZlX2RhdGFfY2FjaGUpIHtcclxuICAgICAgICAgICAgaWYgKHN5eXhfYWR2X21hbmFnZXIuX25hdGl2ZV9kYXRhX2NhY2hlW2ldLmlkICE9IGlnbm9yZV9pZCAmJiBzeXl4X2Fkdl9tYW5hZ2VyLl9uYXRpdmVfZGF0YV9jYWNoZVtpXS5uYXRpdmVfdHlwZSAhPSBpZ25vcmVfdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN5eXhfYWR2X21hbmFnZXIuX25hdGl2ZV9kYXRhX2NhY2hlW2ldLm5hdGl2ZV90eXBlID09IGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lciAmJiAhYmFubmVyX2xpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyX2RhdGFfY2FjaGUucHVzaChzeXl4X2Fkdl9tYW5hZ2VyLl9uYXRpdmVfZGF0YV9jYWNoZVtpXSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3l5eF9hZHZfbWFuYWdlci5fbmF0aXZlX2RhdGFfY2FjaGVbaV0ubmF0aXZlX3R5cGUgPT0gZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsICYmICFpbm5lcl9saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cl9kYXRhX2NhY2hlLnB1c2goc3l5eF9hZHZfbWFuYWdlci5fbmF0aXZlX2RhdGFfY2FjaGVbaV0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN5eXhfYWR2X21hbmFnZXIuX25hdGl2ZV9kYXRhX2NhY2hlW2ldLm5hdGl2ZV90eXBlID09IGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2ludGVyc3RpdGlhbCAmJiAhaW50ZXJzdGl0aWFsX2xpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyX2RhdGFfY2FjaGUucHVzaChzeXl4X2Fkdl9tYW5hZ2VyLl9uYXRpdmVfZGF0YV9jYWNoZVtpXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJhbm5lcl9saXN0ID0gW11cclxuICAgICAgICBsZXQgaW5uZXJfbGlzdCA9IFtdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgaW4gY3VyX2RhdGFfY2FjaGUpIHtcclxuICAgICAgICAgICAgaWYgKGN1cl9kYXRhX2NhY2hlW2ldLm5hdGl2ZV90eXBlID09IGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lcikge1xyXG4gICAgICAgICAgICAgICAgYmFubmVyX2xpc3QucHVzaChjdXJfZGF0YV9jYWNoZVtpXSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJfZGF0YV9jYWNoZVtpXS5uYXRpdmVfdHlwZSA9PSBlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwpIHtcclxuICAgICAgICAgICAgICAgIGlubmVyX2xpc3QucHVzaChjdXJfZGF0YV9jYWNoZVtpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiZmlyc3RfdXNlX25hdGliZV9iYW5uZXJcIl0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiZmlyc3RfdXNlX25hdGliZV9iYW5uZXJcIl0udmFsdWVbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhbm5lcl9saXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWOn+eUn+aPkuWxj+S9v+eUqOWOn+eUn2Jhbm5lcuaVsOaNrlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldF9jdXJfZGF0YShiYW5uZXJfbGlzdClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlubmVyX2xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWOn+eUn+aPkuWxj+S9v+eUqOe7k+eul+WOn+eUn+aVsOaNrlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfY3VyX2RhdGEoaW5uZXJfbGlzdClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5uZXJfbGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLljp/nlJ/mj5LlsY/kvb/nlKjnu5Pnrpfljp/nlJ/mlbDmja5cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfY3VyX2RhdGEoaW5uZXJfbGlzdClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhbm5lcl9saXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLljp/nlJ/mj5LlsY/kvb/nlKjljp/nlJ9iYW5uZXLmlbDmja5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2N1cl9kYXRhKGJhbm5lcl9saXN0KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldF9jdXJfZGF0YShjdXJfZGF0YV9jYWNoZSkge1xyXG4gICAgICAgIGlmIChzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX25hdGl2ZV9kYXRhX2xpc3RfaXNfcmVwcm90KGN1cl9kYXRhX2NhY2hlKSkge1xyXG4gICAgICAgICAgICAvL+WFqOmDqOaVsOaNrumDveS4iuaKpeabneWFiei/h+S6hlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHN5eXhfYWR2X21hbmFnZXIgdXNlIG9sZCBsb2FkIG5hdGl2ZSBkYXRhXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9taW5fb3JkZXJfbmF0aXZlX2RhdGEoY3VyX2RhdGFfY2FjaGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/mnInmlbDmja7msqHmnInkuIrmiqXov4fmm53lhYkgIOeUqOacgOaWsOaVsOaNrlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHN5eXhfYWR2X21hbmFnZXIgdXNlIG5ldyBsb2FkIG5hdGl2ZSBkYXRhXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9sYXRlc3RfbmF0aXZlX2RhdGEoY3VyX2RhdGFfY2FjaGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19