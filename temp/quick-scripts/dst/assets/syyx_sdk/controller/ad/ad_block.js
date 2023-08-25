
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/ad/ad_block.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5c619pCq/9P2LwGNx2Vh9gI', 'ad_block');
// syyx_sdk/controller/ad/ad_block.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var syyx_manager_1 = require("../syyx_manager");
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var syyx_adv_manager_1 = require("./syyx_adv_manager");
var ad_block = /** @class */ (function () {
    function ad_block() {
        /**
        * 远端运营配置
        */
        this._business_config_data = {};
        /**
         * banner自动刷新时间
         */
        this.auto_update_cd = [20, 20];
        /**
         * 是否正在倒计时刷新
         */
        this.is_run_timer = false;
        /**
         * 当前是否需要积木
         */
        this.need_show = true;
    }
    /**
     * 自动刷新定时器
     */
    ad_block.prototype.run_timer = function () {
        var is_qq = syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.qq
            || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web;
        if (!this.is_run_timer && is_qq) {
            this.is_run_timer = true;
            this.timer_func();
        }
    };
    ad_block.prototype.timer_func = function () {
        var self = this;
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["banner_cool_time"]) {
            this.auto_update_cd = this._business_config_data["banner_cool_time"].value;
        }
        this.hide_block();
        this.need_show = true;
        this.load_block();
        if (this._ad_param && this._ad_param.style && this._ad_param.style.auto_update) {
            var cd = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number(this.auto_update_cd);
            console.log("igc------syyx_ui_block next time to refresh right side block's  cd", cd);
            this.timer_id && clearTimeout(this.timer_id);
            this.timer_id = setTimeout(function () {
                self.timer_func();
            }, cd * 1000);
        }
    };
    ad_block.prototype.show_block = function (style, ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        this._ad_pos_id = ad_pos_id;
        this._ad_param = {
            style: style,
            ad_type: ad_type,
            ad_pos_id: ad_pos_id,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError,
        };
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id || ad_id == "1" || ad_id == "0") {
            console.log("igc----- ad_block native_interstitial_id no configure in adv.csv");
            return;
        }
        this.run_timer();
    };
    ad_block.prototype.hide_block = function () {
        this.need_show = false;
        this.destroy_timer();
        syyx_manager_1.syyx_manager.hide_ad(igc.e_ad_type.block, this._ad_pos_id);
    };
    ad_block.prototype.destroy_timer = function () {
        this.is_run_timer = false;
        //销毁定时器
        this.timer_id && clearTimeout(this.timer_id);
        this.timer_id = undefined;
    };
    /**
    * 加载原生插屏
    * @param call_back 加载数据成功回调
    */
    ad_block.prototype.load_block = function (call_back) {
        var self = this;
        //当前不需要展示任何banner
        if (!this.need_show) {
            this.hide_block();
            return;
        }
        var block_bottom_offset = 5;
        if (this._business_config_data && this._business_config_data["block_bottom_offset"]) {
            if (this._business_config_data["block_bottom_offset"].value[0] > 0) {
                block_bottom_offset = this._business_config_data["block_bottom_offset"];
            }
        }
        var vertical_center_y = undefined;
        if (this._ad_param.style.vertical_center_y >= -888888) {
            vertical_center_y = this._ad_param.style.vertical_center_y;
        }
        var vertical_right = undefined;
        if (this._ad_param.style.vertical_right >= 0) {
            vertical_right = this._ad_param.style.vertical_right;
        }
        var ad_param = {
            ad_type: igc.e_ad_type.block,
            ad_id: syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(this._ad_pos_id),
            ad_pos_id: this._ad_pos_id,
            ad_event: this._ad_pos_id,
            ad_scene: this._ad_pos_id,
            style: {
                left: this._ad_param.style.left >= 20 ? this._ad_param.style.left : 20,
                top: this._ad_param.style.top >= 50 ? this._ad_param.style.top : 50 //top太小会报错
            },
            vertical_center_y: vertical_center_y,
            vertical_right: vertical_right,
            bottom_offset: block_bottom_offset,
            size: this._ad_param.style.size || 5,
            orientation: this._ad_param.style.orientation || "landscape",
            onShow: function () {
                console.error("igc-----syyx_adv_manager-------load_block onShow");
                if (!self.need_show) {
                    self.hide_block();
                    return;
                }
            },
            onError: function (param, err) {
                console.error("igc-----syyx_adv_manager-------load_block onError", err);
                self._ad_param.onError && self._ad_param.onError(param, err);
            }
        };
        igc.igc_main.instance.create_ad(ad_param);
    };
    return ad_block;
}());
exports.default = ad_block;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXGFkXFxhZF9ibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUErQztBQUMvQyxpRUFBMkQ7QUFDM0QsNkRBQTREO0FBQzVELHVEQUFzRDtBQUV0RDtJQUFBO1FBQ0k7O1VBRUU7UUFDTSwwQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFZbkM7O1dBRUc7UUFDSyxtQkFBYyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRWpDOztXQUVHO1FBQ0ssaUJBQVksR0FBRyxLQUFLLENBQUE7UUFFNUI7O1dBRUc7UUFDSyxjQUFTLEdBQUcsSUFBSSxDQUFBO0lBbUk1QixDQUFDO0lBaklHOztPQUVHO0lBQ0ssNEJBQVMsR0FBakI7UUFDSSxJQUFJLEtBQUssR0FBRyw0QkFBVSxDQUFDLGdCQUFnQixLQUFLLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRTtlQUMxRCw0QkFBVSxDQUFDLGdCQUFnQixLQUFLLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFBO1FBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUssRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtZQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7U0FDcEI7SUFDTCxDQUFDO0lBR08sNkJBQVUsR0FBbEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZixJQUFJLENBQUMscUJBQXFCLEdBQUcsMkJBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQy9ELElBQUksSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzlFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFBO1NBQzdFO1FB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QUFtQjtZQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUM7WUFDcEMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxXQUFXO1lBRTVELE1BQU0sRUFBRTtnQkFDSixPQUFPLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7Z0JBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7b0JBQ2pCLE9BQU07aUJBQ1Q7WUFDTCxDQUFDO1lBRUQsT0FBTyxFQUFFLFVBQVUsS0FBSyxFQUFFLEdBQUc7Z0JBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsbURBQW1ELEVBQUUsR0FBRyxDQUFDLENBQUE7Z0JBQ3ZFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNoRSxDQUFDO1NBQ0osQ0FBQTtRQUVELEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBQ0wsZUFBQztBQUFELENBaEtBLEFBZ0tDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzeXl4X21hbmFnZXIgfSBmcm9tIFwiLi4vc3l5eF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHN5eXhfY29uc3QgfSBmcm9tIFwiLi4vLi4vY29uZmlncy9zeXl4X3Nka19jb25maWdcIjtcclxuaW1wb3J0IHsgc3l5eF9zZGtfdXRpbHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3l5eF9zZGtfdXRpbHNcIjtcclxuaW1wb3J0IHsgc3l5eF9hZHZfbWFuYWdlciB9IGZyb20gXCIuL3N5eXhfYWR2X21hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGFkX2Jsb2NrIHtcclxuICAgIC8qKlxyXG4gICAgKiDov5znq6/ov5DokKXphY3nva5cclxuICAgICovXHJcbiAgICBwcml2YXRlIF9idXNpbmVzc19jb25maWdfZGF0YSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YWN572u6KGo5bm/5ZGKaWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYWRfcG9zX2lkXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rlub/lkYrml7bkvKDlhaXnmoTlj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfYWRfcGFyYW1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGJhbm5lcuiHquWKqOWIt+aWsOaXtumXtFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF1dG9fdXBkYXRlX2NkID0gWzIwLCAyMF1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuato+WcqOWAkuiuoeaXtuWIt+aWsFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzX3J1bl90aW1lciA9IGZhbHNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3mmK/lkKbpnIDopoHnp6/mnKhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBuZWVkX3Nob3cgPSB0cnVlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rliqjliLfmlrDlrprml7blmahcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBydW5fdGltZXIoKSB7XHJcbiAgICAgICAgbGV0IGlzX3FxID0gc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUucXFcclxuICAgICAgICAgICAgfHwgc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUud2ViXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzX3J1bl90aW1lciAmJiBpc19xcSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzX3J1bl90aW1lciA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy50aW1lcl9mdW5jKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lcl9pZFxyXG4gICAgcHJpdmF0ZSB0aW1lcl9mdW5jKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YSAmJiB0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcImJhbm5lcl9jb29sX3RpbWVcIl0pIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRvX3VwZGF0ZV9jZCA9IHRoaXMuX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiYmFubmVyX2Nvb2xfdGltZVwiXS52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGVfYmxvY2soKVxyXG4gICAgICAgIHRoaXMubmVlZF9zaG93ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMubG9hZF9ibG9jaygpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9hZF9wYXJhbSAmJiB0aGlzLl9hZF9wYXJhbS5zdHlsZSAmJiB0aGlzLl9hZF9wYXJhbS5zdHlsZS5hdXRvX3VwZGF0ZSkge1xyXG4gICAgICAgICAgICBsZXQgY2QgPSBzeXl4X3Nka191dGlscy5nZXRfcmFuZG9tX251bWJlcih0aGlzLmF1dG9fdXBkYXRlX2NkKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tLXN5eXhfdWlfYmxvY2sgbmV4dCB0aW1lIHRvIHJlZnJlc2ggcmlnaHQgc2lkZSBibG9jaydzICBjZFwiLCBjZClcclxuICAgICAgICAgICAgdGhpcy50aW1lcl9pZCAmJiBjbGVhclRpbWVvdXQodGhpcy50aW1lcl9pZClcclxuICAgICAgICAgICAgdGhpcy50aW1lcl9pZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2VsZi50aW1lcl9mdW5jKClcclxuICAgICAgICAgICAgfSwgY2QgKiAxMDAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dfYmxvY2soc3R5bGUsIGFkX3R5cGU/OiBpZ2MuZV9hZF90eXBlLCBhZF9wb3NfaWQ/OiBzdHJpbmcsIG9uTG9hZD86IEZ1bmN0aW9uLFxyXG4gICAgICAgIG9uU2hvdz86IEZ1bmN0aW9uLCBvbkNsb3NlPzogRnVuY3Rpb24sIG9uRXJyb3I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2FkX3Bvc19pZCA9IGFkX3Bvc19pZFxyXG4gICAgICAgIHRoaXMuX2FkX3BhcmFtID0ge1xyXG4gICAgICAgICAgICBzdHlsZTogc3R5bGUsXHJcbiAgICAgICAgICAgIGFkX3R5cGU6IGFkX3R5cGUsXHJcbiAgICAgICAgICAgIGFkX3Bvc19pZDogYWRfcG9zX2lkLFxyXG4gICAgICAgICAgICBvbkxvYWQ6IG9uTG9hZCxcclxuICAgICAgICAgICAgb25TaG93OiBvblNob3csXHJcbiAgICAgICAgICAgIG9uQ2xvc2U6IG9uQ2xvc2UsXHJcbiAgICAgICAgICAgIG9uRXJyb3I6IG9uRXJyb3IsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhZF9pZCA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2NoYW5uZWxfYWRfaWQoYWRfcG9zX2lkKVxyXG4gICAgICAgIGlmICghYWRfaWQgfHwgYWRfaWQgPT0gXCIxXCIgfHwgYWRfaWQgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBhZF9ibG9jayBuYXRpdmVfaW50ZXJzdGl0aWFsX2lkIG5vIGNvbmZpZ3VyZSBpbiBhZHYuY3N2XCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJ1bl90aW1lcigpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlX2Jsb2NrKCkge1xyXG4gICAgICAgIHRoaXMubmVlZF9zaG93ID0gZmFsc2VcclxuICAgICAgICB0aGlzLmRlc3Ryb3lfdGltZXIoKVxyXG4gICAgICAgIHN5eXhfbWFuYWdlci5oaWRlX2FkKGlnYy5lX2FkX3R5cGUuYmxvY2ssIHRoaXMuX2FkX3Bvc19pZClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lfdGltZXIoKSB7XHJcbiAgICAgICAgdGhpcy5pc19ydW5fdGltZXIgPSBmYWxzZVxyXG4gICAgICAgIC8v6ZSA5q+B5a6a5pe25ZmoXHJcbiAgICAgICAgdGhpcy50aW1lcl9pZCAmJiBjbGVhclRpbWVvdXQodGhpcy50aW1lcl9pZClcclxuICAgICAgICB0aGlzLnRpbWVyX2lkID0gdW5kZWZpbmVkXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWKoOi9veWOn+eUn+aPkuWxj1xyXG4gICAgKiBAcGFyYW0gY2FsbF9iYWNrIOWKoOi9veaVsOaNruaIkOWKn+Wbnuiwg1xyXG4gICAgKi9cclxuICAgIHByaXZhdGUgbG9hZF9ibG9jayhjYWxsX2JhY2s/KSB7XHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICAvL+W9k+WJjeS4jemcgOimgeWxleekuuS7u+S9lWJhbm5lclxyXG4gICAgICAgIGlmICghdGhpcy5uZWVkX3Nob3cpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlX2Jsb2NrKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmxvY2tfYm90dG9tX29mZnNldCA9IDVcclxuICAgICAgICBpZiAodGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJibG9ja19ib3R0b21fb2Zmc2V0XCJdKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc19jb25maWdfZGF0YVtcImJsb2NrX2JvdHRvbV9vZmZzZXRcIl0udmFsdWVbMF0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBibG9ja19ib3R0b21fb2Zmc2V0ID0gdGhpcy5fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJibG9ja19ib3R0b21fb2Zmc2V0XCJdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2ZXJ0aWNhbF9jZW50ZXJfeSA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGlmICh0aGlzLl9hZF9wYXJhbS5zdHlsZS52ZXJ0aWNhbF9jZW50ZXJfeSA+PSAtODg4ODg4KSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsX2NlbnRlcl95ID0gdGhpcy5fYWRfcGFyYW0uc3R5bGUudmVydGljYWxfY2VudGVyX3lcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2ZXJ0aWNhbF9yaWdodCA9IHVuZGVmaW5lZFxyXG4gICAgICAgIGlmICh0aGlzLl9hZF9wYXJhbS5zdHlsZS52ZXJ0aWNhbF9yaWdodCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHZlcnRpY2FsX3JpZ2h0ID0gdGhpcy5fYWRfcGFyYW0uc3R5bGUudmVydGljYWxfcmlnaHRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhZF9wYXJhbSA9IHtcclxuICAgICAgICAgICAgYWRfdHlwZTogaWdjLmVfYWRfdHlwZS5ibG9jayxcclxuICAgICAgICAgICAgYWRfaWQ6IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2NoYW5uZWxfYWRfaWQodGhpcy5fYWRfcG9zX2lkKSxcclxuICAgICAgICAgICAgYWRfcG9zX2lkOiB0aGlzLl9hZF9wb3NfaWQsXHJcbiAgICAgICAgICAgIGFkX2V2ZW50OiB0aGlzLl9hZF9wb3NfaWQsICAvL+WPquaYr+Whq+WFhVxyXG4gICAgICAgICAgICBhZF9zY2VuZTogdGhpcy5fYWRfcG9zX2lkLFxyXG4gICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgbGVmdDogdGhpcy5fYWRfcGFyYW0uc3R5bGUubGVmdCA+PSAyMCA/IHRoaXMuX2FkX3BhcmFtLnN0eWxlLmxlZnQgOiAyMCwgLy9sZWZ05aSq5bCP5Lya5oql6ZSZXHJcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMuX2FkX3BhcmFtLnN0eWxlLnRvcCA+PSA1MCA/IHRoaXMuX2FkX3BhcmFtLnN0eWxlLnRvcCA6IDUwIC8vdG9w5aSq5bCP5Lya5oql6ZSZXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZlcnRpY2FsX2NlbnRlcl95OiB2ZXJ0aWNhbF9jZW50ZXJfeSxcclxuICAgICAgICAgICAgdmVydGljYWxfcmlnaHQ6IHZlcnRpY2FsX3JpZ2h0LFxyXG4gICAgICAgICAgICBib3R0b21fb2Zmc2V0OiBibG9ja19ib3R0b21fb2Zmc2V0LC8v5qiq5ZCR5bGV56S6IOS4lCDot53nprvlupXpg6jnmoTot53nprtcclxuICAgICAgICAgICAgc2l6ZTogdGhpcy5fYWRfcGFyYW0uc3R5bGUuc2l6ZSB8fCA1LFxyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogdGhpcy5fYWRfcGFyYW0uc3R5bGUub3JpZW50YXRpb24gfHwgXCJsYW5kc2NhcGVcIiwgLy92ZXJ0aWNhbFxyXG5cclxuICAgICAgICAgICAgb25TaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiaWdjLS0tLS1zeXl4X2Fkdl9tYW5hZ2VyLS0tLS0tLWxvYWRfYmxvY2sgb25TaG93XCIpXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYubmVlZF9zaG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5oaWRlX2Jsb2NrKClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIG9uRXJyb3I6IGZ1bmN0aW9uIChwYXJhbSwgZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiaWdjLS0tLS1zeXl4X2Fkdl9tYW5hZ2VyLS0tLS0tLWxvYWRfYmxvY2sgb25FcnJvclwiLCBlcnIpXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9hZF9wYXJhbS5vbkVycm9yICYmIHNlbGYuX2FkX3BhcmFtLm9uRXJyb3IocGFyYW0sIGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWdjLmlnY19tYWluLmluc3RhbmNlLmNyZWF0ZV9hZChhZF9wYXJhbSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==