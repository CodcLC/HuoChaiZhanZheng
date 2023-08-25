
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/ad/ad_banner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXGFkXFxhZF9iYW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsK0RBQXdEO0FBQ3pELDZEQUE0RDtBQUM1RCxnREFBK0M7QUFDL0MsaUVBQTJEO0FBQzNELHVEQUFzRDtBQUN0RCxtREFBa0Q7QUFFbEQ7SUFBQTtJQXVWQSxDQUFDO0lBNVJHOztPQUVHO0lBQ0ksOEJBQW9CLEdBQTNCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBRWYsSUFBSSw0QkFBVSxDQUFDLGdCQUFnQixJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO1lBQzNELElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQTtZQUN2QixJQUFJLENBQUMscUJBQXFCLEdBQUcsMkJBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1lBQy9ELElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDM0UsZUFBZSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3RFLElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxJQUFJLENBQUMsQ0FBQTtnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxlQUFlLENBQUMsQ0FBQTthQUN0RTtZQUNELElBQUksQ0FBQyxxQkFBcUIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7WUFDdEUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFVBQVUsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUE7Z0JBQzFCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLElB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QUFBO0lBRTNCOztPQUVHO0lBQ0ksbUJBQVMsR0FBRyxJQUFJLENBQUE7SUFFdkI7O09BRUc7SUFDSSx3QkFBYyxHQUFHLElBQUksQ0FBQTtJQUU1Qjs7T0FFRztJQUNJLCtCQUFxQixHQUFHLFNBQVMsQ0FBQTtJQUV4Qzs7T0FFRztJQUNJLCtCQUFxQixHQUFHLEtBQUssQ0FBQTtJQUVwQzs7TUFFRTtJQUNLLDhCQUFvQixHQUFHLElBQUksQ0FBQTtJQUUzQiwyQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQTtJQThSakMsZ0JBQUM7Q0F2VkQsQUF1VkMsSUFBQTtBQXZWWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIu+7v2ltcG9ydCB7IGVfYWRfaWQgfSBmcm9tICcuLy4uLy4uL2NvbmZpZ3Mvc3l5eF9zZGtfZW51bSc7XHJcbmltcG9ydCB7IHN5eXhfc2RrX3V0aWxzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3N5eXhfc2RrX3V0aWxzXCI7XHJcbmltcG9ydCB7IHN5eXhfbWFuYWdlciB9IGZyb20gXCIuLi9zeXl4X21hbmFnZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9jb25zdCB9IGZyb20gXCIuLi8uLi9jb25maWdzL3N5eXhfc2RrX2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBzeXl4X2Fkdl9tYW5hZ2VyIH0gZnJvbSBcIi4vc3l5eF9hZHZfbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBhZF9vcHBvX2Jhbm5lciB9IGZyb20gXCIuL2FkX29wcG9fYmFubmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgYWRfYmFubmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICog6L+c56uv6L+Q6JCl6YWN572uXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIF9idXNpbmVzc19jb25maWdfZGF0YSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YWN572u6KGo5Y6f55SfYmFubmVy5bm/5ZGKSWRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF9uYXRpdmVfYmFubmVyX2lkID0gdW5kZWZpbmVkXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDphY3nva7ooajmma7pgJpiYW5uZXLlub/lkYpJZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX25vcm1hbF9iYW5uZXJfaWQgPSB1bmRlZmluZWRcclxuXHJcbiAgICAvKipcclxuICAgICog5Yib5bu65bm/5ZGK5pe25Lyg5YWl55qE5Y+C5pWwXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIF9hZF9wYXJhbVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYmFubmVy6Ieq5Yqo5Yi35paw5pe26Ze0XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhdXRvX3VwZGF0ZV9jZCA9IFsyMCwgMjBdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDlrprml7blmajmmK/lkKblvIDlkK9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzX3J1bl90aW1lciA9IGZhbHNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3mmK/lkKbpnIDopoHlsZXnpLpiYW5uZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5lZWRfc2hvdyA9IHRydWVcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiDveWQpuaYvuekuuesrOS4gOS4qmJhbm5lclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2FuX3Nob3dfZmlyc3QgPSB0cnVlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvcHBv6aaW5qyh5bGV56S65bm/5ZGKY2Tlm57osIPlrprml7blmahpZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZmlyc3RfYmFubmVyX3RpbWVyX2lkID0gdW5kZWZpbmVkXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmma7pgJpCYW5uZXLmmK/lkKblnKjmmL7npLpcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5vcm1hbF9iYW5uZXJfc2hvd2luZyA9IGZhbHNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiDveWQpuaYvuekunZpdm/mma7pgJpCYW5uZXJcclxuICAgICovXHJcbiAgICBzdGF0aWMgY2FuX3Nob3dfdml2b19iYW5uZXIgPSB0cnVlXHJcblxyXG4gICAgc3RhdGljIGN1cl9wcm90ZWN0X2NvdW50ID0gLTFcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlm9wcG/pppbmrKHlub/lkYpjZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdF9maXJzdF9iYW5uZXJfY2QoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT0gaWdjLmVfY2hhbm5lbF90eXBlLm9wcG9fcWcpIHtcclxuICAgICAgICAgICAgbGV0IGZpcnN0X2Jhbm5lcl9jZCA9IDBcclxuICAgICAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSAmJiB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcImFkdl9iYW5uZXJfY2RcIl0pIHtcclxuICAgICAgICAgICAgICAgIGZpcnN0X2Jhbm5lcl9jZCA9IHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiYWR2X2Jhbm5lcl9jZFwiXS52YWx1ZVswXVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5fc2hvd19maXJzdCA9IGZpcnN0X2Jhbm5lcl9jZCA8PSAwXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHRoZSBiYW5uZXIncyBjZCBpbiBvcHBvIGlzXCIsIGZpcnN0X2Jhbm5lcl9jZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0X2Jhbm5lcl90aW1lcl9pZCAmJiBjbGVhclRpbWVvdXQodGhpcy5maXJzdF9iYW5uZXJfdGltZXJfaWQpXHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RfYmFubmVyX3RpbWVyX2lkID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNhbl9zaG93X2ZpcnN0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYubmVlZF9zaG93ICYmIHNlbGYuX2FkX3BhcmFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93X2Jhbm5lcihzZWxmLl9hZF9wYXJhbS5hZF90eXBlLCBzZWxmLl9hZF9wYXJhbS5hZF9wb3NfaWQsIHNlbGYuX2FkX3BhcmFtLm9uTG9hZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fYWRfcGFyYW0ub25TaG93LCBzZWxmLl9hZF9wYXJhbS5vbkNsb3NlLCBzZWxmLl9hZF9wYXJhbS5vbkVycm9yKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmaXJzdF9iYW5uZXJfY2QgKiAxMDAwKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rliqjliLfmlrDlrprml7blmahcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJ1bl90aW1lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNfcnVuX3RpbWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfcnVuX3RpbWVyID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnRpbWVyX2Z1bmMoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgdGltZXJfaWRcclxuICAgIHN0YXRpYyB0aW1lcl9mdW5jKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSAmJiB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcImJhbm5lcl9jb29sX3RpbWVcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvX3VwZGF0ZV9jZCA9IHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiYmFubmVyX2Nvb2xfdGltZVwiXS52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRfbmF0aXZlX2Jhbm5lcigpXHJcbiAgICAgICAgbGV0IGNkID0gc3l5eF9zZGtfdXRpbHMuZ2V0X3JhbmRvbV9udW1iZXIodGhpcy5hdXRvX3VwZGF0ZV9jZClcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNkay0tLS0tLSBuZXh0IHRpbWUgdG8gcmVmcmVzaCBiYW5uZXIgaXNcIiwgY2QpXHJcblxyXG4gICAgICAgIHRoaXMudGltZXJfaWQgJiYgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJfaWQpXHJcbiAgICAgICAgdGhpcy50aW1lcl9pZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnRpbWVyX2Z1bmMoKVxyXG4gICAgICAgIH0sIGNkICogMTAwMClcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogVUnlsYLopoHlsZXnpLrmma7pgJpiYW5uZXLmiJbogIXljp/nlJ9iYW5uZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNob3dfYmFubmVyKGFkX3R5cGU/OiBpZ2MuZV9hZF90eXBlLCBhZF9wb3NfaWQ/OiBzdHJpbmcsIG9uTG9hZD86IEZ1bmN0aW9uLCBvblNob3c/OiBGdW5jdGlvbiwgb25DbG9zZT86IEZ1bmN0aW9uLCBvbkVycm9yPzogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm5lZWRfc2hvdyA9IHRydWVcclxuICAgICAgICB0aGlzLl9ub3JtYWxfYmFubmVyX2lkID0gYWRfcG9zX2lkXHJcbiAgICAgICAgdGhpcy5fbmF0aXZlX2Jhbm5lcl9pZCA9IHN5eXhfYWR2X21hbmFnZXIuX2Fkdl9jb25maWdfZGF0YVthZF9wb3NfaWRdLmJhY2t1cF9pZFxyXG5cclxuICAgICAgICB0aGlzLl9hZF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgYWRfdHlwZTogYWRfdHlwZSxcclxuICAgICAgICAgICAgYWRfcG9zX2lkOiBhZF9wb3NfaWQsXHJcbiAgICAgICAgICAgIG9uTG9hZDogb25Mb2FkLFxyXG4gICAgICAgICAgICBvblNob3c6IG9uU2hvdyxcclxuICAgICAgICAgICAgb25DbG9zZTogb25DbG9zZSxcclxuICAgICAgICAgICAgb25FcnJvcjogb25FcnJvcixcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhbl9zaG93X2ZpcnN0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gYmFubmVyIGlzIGluIGNvb2xpbmcgdGltZSBcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3l5eF9hZHZfbWFuYWdlci5jaGVja19pc19vcGVuX29wcG9fcnVsZSgpKSB7XHJcbiAgICAgICAgICAgIGFkX29wcG9fYmFubmVyLnNob3dfYmFubmVyKGFkX3R5cGUsIGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csIG9uQ2xvc2UsIG9uRXJyb3IpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDkuIrpnaLmnaHku7blhYXotrPvvIzlkI7pnaLkuI3miafooYxcclxuICAgICAgICBsZXQgYWRfaWQgPSBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9jaGFubmVsX2FkX2lkKGFkX3Bvc19pZClcclxuICAgICAgICBpZiAoIWFkX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ydW5fdGltZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOajgOafpeW9k+WJjeaYr+WQpumcgOimgeWxleekumJhbm5lclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2hlY2tfbmVlZF9zaG93X2Jhbm5lcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uZWVkX3Nob3dcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDlsZXnpLpiYW5uZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGF1dG9fc2hvd19iYW5uZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FkX3BhcmFtICYmIHRoaXMuX2FkX3BhcmFtLmFkX3R5cGUgJiYgdGhpcy5fYWRfcGFyYW0uYWRfcG9zX2lkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd19iYW5uZXIodGhpcy5fYWRfcGFyYW0uYWRfdHlwZSwgdGhpcy5fYWRfcGFyYW0uYWRfcG9zX2lkLCB0aGlzLl9hZF9wYXJhbS5vbkxvYWQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZF9wYXJhbS5vblNob3csIHRoaXMuX2FkX3BhcmFtLm9uQ2xvc2UsIHRoaXMuX2FkX3BhcmFtLm9uRXJyb3IpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93X2Jhbm5lcihpZ2MuZV9hZF90eXBlLmJhbm5lciwgZV9hZF9pZC5iYW5uZXJfaGFsbCwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIHVp5bGC6KaB6ZqQ6JePYmFubmVy5oiW6ICF5Y6f55SfYmFubmVyXHJcbiAgICAqIOmakOiXj+WQjumUgOavgeWumuaXtuWZqCAg55u05Yiw5LiL5LiA5qyhc2hvd19iYW5uZXLmiY3kvJrph43mlrDlkK/liqjlrprml7blmahcclxuICAgICovXHJcbiAgICBzdGF0aWMgaGlkZV9iYW5uZXIoKSB7XHJcbiAgICAgICAgdGhpcy5uZWVkX3Nob3cgPSBmYWxzZVxyXG4gICAgICAgIGlmIChzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX2lzX29wZW5fb3Bwb19ydWxlKCkpIHtcclxuICAgICAgICAgICAgYWRfb3Bwb19iYW5uZXIuaGlkZV9iYW5uZXIoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jYW5fc2hvd19maXJzdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGJhbm5lciBpcyBpbiBjb29saW5nIHRpbWUgXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzX3J1bl90aW1lciA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5oaWRlX25vcm1hbF9iYW5uZXIoKVxyXG4gICAgICAgIHRoaXMudGltZXJfaWQgJiYgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJfaWQpXHJcbiAgICAgICAgdGhpcy50aW1lcl9pZCA9IHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295Y6f55SfYmFubmVy5pWw5o2uXHJcbiAgICAgKiDkvJrmoLnmja7kuI3lkIzmg4XlhrUg6L2s5Y675Yqg6L295pmu6YCaYmFubmVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX25hdGl2ZV9iYW5uZXIoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIC8v5b2T5YmN5LiN6ZyA6KaB5bGV56S65Lu75L2VYmFubmVyXHJcbiAgICAgICAgaWYgKCF0aGlzLm5lZWRfc2hvdykge1xyXG4gICAgICAgICAgICBzZWxmLmhpZGVfYmFubmVyKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S4jeaYr29wcG8gdml2byDmiJbogIUg5rKh5pyJ6K6+572u5Y6f55SfYmFubmVySWQg5YiZ6K6+572u5a6a5pe25Zmo5Yi35paw5pmu6YCaYmFubmVyXHJcbiAgICAgICAgaWYgKCFzZWxmLl9uYXRpdmVfYmFubmVyX2lkKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc2hvd19ub3JtYWxfYmFubmVyKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZXBvcnRfYWRfY2xpY2soYWRfcG9zX2lkOiBzdHJpbmcsIG5hdGl2ZV9kYXRhPykge1xyXG4gICAgICAgIGlmIChzeXl4X2Fkdl9tYW5hZ2VyLmNoZWNrX2lzX29wZW5fb3Bwb19ydWxlKCkpIHtcclxuICAgICAgICAgICAgYWRfb3Bwb19iYW5uZXIucmVwb3J0X2FkX2NsaWNrKGFkX3Bvc19pZCwgbmF0aXZlX2RhdGEpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVwb3J0X2FkX3Nob3coYWRfcG9zX2lkOiBzdHJpbmcsIG5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgaWYgKHN5eXhfYWR2X21hbmFnZXIuY2hlY2tfaXNfb3Blbl9vcHBvX3J1bGUoKSkge1xyXG4gICAgICAgICAgICBhZF9vcHBvX2Jhbm5lci5yZXBvcnRfYWRfc2hvdyhhZF9wb3NfaWQsIG5hdGl2ZV9kYXRhKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldF9lYXN5X2NsaWNrX3Byb3RlY3RfY291bnQoKSB7XHJcbiAgICAgICAgbGV0IHByb3RlY3RfY291bnQgPSAwXHJcbiAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2Jhbm5lcl9jbGlja19wcm90ZWN0XCJdKSB7XHJcbiAgICAgICAgICAgIHByb3RlY3RfY291bnQgPSB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9iYW5uZXJfY2xpY2tfcHJvdGVjdFwiXS52YWx1ZVswXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvdGVjdF9jb3VudFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZXRfYmFuZW5yX3Byb3RlY3RfbW9kZWwoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJfcHJvdGVjdF9jb3VudCA9IDBcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0X2lzX2Vhc3lfY2xpY2tfbW9kZWwoKSB7XHJcbiAgICAgICAgbGV0IHByb3RlY3RfY291bnQgPSB0aGlzLmdldF9lYXN5X2NsaWNrX3Byb3RlY3RfY291bnQoKVxyXG4gICAgICAgIGlmIChwcm90ZWN0X2NvdW50ID4gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jdXJfcHJvdGVjdF9jb3VudCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cl9wcm90ZWN0X2NvdW50KytcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cl9wcm90ZWN0X2NvdW50IDw9IHByb3RlY3RfY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2Jhbm5lcl9jbGlja19zd2l0Y2hcIl0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2Jhbm5lcl9jbGlja19zd2l0Y2hcIl0udmFsdWVbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBybyA9IHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2Jhbm5lcl9jbGlja19wcm9cIl0udmFsdWVbMF1cclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpIDw9IHByb1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZXRfbm9ybWFsX2Jhbm5lcl9zd2l0Y2godmFsdWUpIHtcclxuICAgICAgICBpZiAoc3l5eF9hZHZfbWFuYWdlci5jaGVja19pc19vcGVuX29wcG9fcnVsZSgpKSB7XHJcbiAgICAgICAgICAgIGFkX29wcG9fYmFubmVyLnNldF9ub3JtYWxfYmFubmVyX3N3aXRjaCh2YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaYvuekuuaZrumAmmJhbm5lclxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBzaG93X25vcm1hbF9iYW5uZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wic2hvd19ub3JtYWxfYmFubmVyX3N3aXRjaFwiXSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJzaG93X25vcm1hbF9iYW5uZXJfc3dpdGNoXCJdLnZhbHVlWzBdID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjIC0tLS0tIG5vcm1hbCBiYW5uZXIgc3dpdGNoIGlzIGNsb3NlXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3Zpdm/muKDpgZPpmZDliLbkuIDkuIsgIOmUgOavgWJhbm5lcjEwc+WQjuaJjeiDveWxleekuuaZrumAmmJhbm5lclxyXG4gICAgICAgIGlmICghdGhpcy5jYW5fc2hvd192aXZvX2Jhbm5lciAmJiBzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS52aXZvX3FnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gdml2byBhZF9iYW5uZXIgc2hvd19ub3JtYWxfYmFubmVyIGNyZWF0ZSB0b28gb2Z0ZW4hISFcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBzeXl4X21hbmFnZXIuY3JlYXRlX2FkKGlnYy5lX2FkX3R5cGUuYmFubmVyLCBzZWxmLl9ub3JtYWxfYmFubmVyX2lkLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkxvYWQocGFyYW0sIHJlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWRfcGFyYW0ub25Mb2FkICYmIHNlbGYuX2FkX3BhcmFtLm9uTG9hZCgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uU2hvdygpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubm9ybWFsX2Jhbm5lcl9zaG93aW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy9iYW5uZXLlsZXnpLrmiJDlip/lkI7liKTmlq3lvZPliY3og73lkKblsZXnpLpiYW5uZXJcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm5lZWRfc2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2FkX3BhcmFtLm9uU2hvdyAmJiBzZWxmLl9hZF9wYXJhbS5vblNob3coKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhpZGVfbm9ybWFsX2Jhbm5lcigpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uQ2xvc2UocGFyYW0sIHJlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWRfcGFyYW0ub25DbG9zZSAmJiBzZWxmLl9hZF9wYXJhbS5vbkNsb3NlKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcihwYXJhbSwgZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tLXN5eXhfYWR2X21hbmFnZXIgc2hvd19ub3JtYWxfYmFubmVyIG9uRXJyb3JcIiwgZXJyKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWRfcGFyYW0ub25FcnJvciAmJiBzZWxmLl9hZF9wYXJhbS5vbkVycm9yKHBhcmFtLCBlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5pmu6YCaYmFubmVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBiYW5uZXJfdGltZXJfaWRcclxuICAgIHN0YXRpYyBoaWRlX25vcm1hbF9iYW5uZXIoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChzZWxmLl9ub3JtYWxfYmFubmVyX2lkKSB7XHJcbiAgICAgICAgICAgIC8vdml2b+a4oOmBk+S4iyAg5pmu6YCaYmFubmVy5bey57uP5Zyo5pi+56S6ICDplIDmr4HnmoTor53orrDlvZUxMHPlhoXkuI3og73lho3mrKHliJvlu7pcclxuICAgICAgICAgICAgaWYgKHNlbGYubm9ybWFsX2Jhbm5lcl9zaG93aW5nICYmIHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLnZpdm9fcWcpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2FuX3Nob3dfdml2b19iYW5uZXIgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJfdGltZXJfaWQgJiYgY2xlYXJUaW1lb3V0KHRoaXMuYmFubmVyX3RpbWVyX2lkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJfdGltZXJfaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbl9zaG93X3Zpdm9fYmFubmVyID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSwgMTEwMDApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5ub3JtYWxfYmFubmVyX3Nob3dpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICBzeXl4X21hbmFnZXIuZGVzdHJveV9hZChpZ2MuZV9hZF90eXBlLmJhbm5lciwgc2VsZi5fbm9ybWFsX2Jhbm5lcl9pZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnjqnlrrbmiYvliqjngrnlh7vkuoblhbPpl61iYW5uZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZpbmdlcl9jbG9zZV9iYW5uZXIoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgaWYgKHRoaXMuaXNfb3Bwb192aXZvX2h3KCkgJiYgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJmaW5nZXJfY2xvc2VfYmFubmVyX3N3aXRjaFwiXSkge1xyXG4gICAgICAgICAgICBpZiAoc3l5eF9hZHZfbWFuYWdlci5jaGVja19pc19vcGVuX29wcG9fcnVsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBhZF9vcHBvX2Jhbm5lci5maW5nZXJfY2xvc2VfYmFubmVyKClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcImZpbmdlcl9jbG9zZV9iYW5uZXJfc3dpdGNoXCJdLnZhbHVlWzBdID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjZCA9IHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiZmluZ2VyX2Nsb3NlX2Jhbm5lcl9zd2l0Y2hcIl0udmFsdWVbMV0gfHwgNjBcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZV9iYW5uZXIoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5fc2hvd19maXJzdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbl9zaG93X2ZpcnN0ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSwgY2QgKiAxMDAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc19vcHBvX3Zpdm9faHcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLm9wcG9fcWcgfHwgc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUudml2b19xZyB8fCBzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS53ZWJcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==