"use strict";
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