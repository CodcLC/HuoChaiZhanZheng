"use strict";
cc._RF.push(module, 'f2742523sVO662SYa0J5ix1', 'syyx_ui_interstitial');
// syyx_sdk/syyx_ui/ad/syyx_ui_interstitial.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var syyx_sdk_enum_1 = require("../../configs/syyx_sdk_enum");
var ad_native_interstitial_1 = require("../../controller/ad/ad_native_interstitial");
var syyx_adv_manager_1 = require("../../controller/ad/syyx_adv_manager");
var syyx_manager_1 = require("../../controller/syyx_manager");
var syyx_sdk_api_1 = require("../../syyx_sdk_api");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var syyx_ui_interstitial = /** @class */ (function (_super) {
    __extends(syyx_ui_interstitial, _super);
    function syyx_ui_interstitial() {
        var _this = _super.call(this) || this;
        _this.game_node = null;
        _this.icon_close = null;
        _this.native_click = null;
        _this.lb_title = null;
        _this.lb_desc = null;
        _this.img_icon = null;
        _this.btn_check = null;
        _this.set_background_on_show();
        return _this;
    }
    syyx_ui_interstitial.prototype.on_click_adv2 = function () {
        if (this.easy_click || ad_native_interstitial_1.ad_native_interstitial.check_is_click_wrap()) {
            this.report_click();
        }
    };
    syyx_ui_interstitial.prototype.on_click_adv = function () {
        this.report_click();
    };
    syyx_ui_interstitial.prototype.on_click_close = function () {
        if (ad_native_interstitial_1.ad_native_interstitial.check_is_click_wrap()) {
            this.report_click();
            return;
        }
        var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (_business_config_data && _business_config_data["native_institial_click_close_pro"]) {
            var trap_pro = _business_config_data["native_institial_click_close_pro"].value[0];
            if (trap_pro >= 0 && Math.random() <= trap_pro) {
                this.report_click();
            }
        }
        this.hide();
    };
    /**
    * 广告被点击
    */
    syyx_ui_interstitial.prototype.report_click = function () {
        if (this.native_data && this.native_data.adPosId) {
            syyx_sdk_api_1.syyx_sdk_api.send_other_event(syyx_sdk_enum_1.e_ad_id.native_interstitial_hall, igc.igc_stat_ids.native_interstitial_click, this.native_data.native_type);
            syyx_adv_manager_1.syyx_adv_manager.report_ad_click(syyx_sdk_enum_1.e_ad_id.native_interstitial_hall, this.native_data);
        }
    };
    /**
    * 广告被曝光
    */
    syyx_ui_interstitial.prototype.report_show = function () {
        if (this.native_data && this.native_data.adPosId) {
            syyx_adv_manager_1.syyx_adv_manager.report_ad_show(syyx_sdk_enum_1.e_ad_id.native_interstitial_hall, this.native_data);
        }
    };
    syyx_ui_interstitial.prototype.show = function (native_data) {
        if (this.node && !this.node.parent) {
            this.native_data = native_data;
            var order = syyx_sdk_utils_1.syyx_sdk_utils.get_largest_zorder();
            this.node.parent = syyx_sdk_utils_1.syyx_sdk_utils.get_stage();
            this.node.zIndex = order;
            this.on_show();
        }
    };
    syyx_ui_interstitial.prototype.on_show = function () {
        this.icon_close.on(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
        this.img_icon.node.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.btn_check.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.native_click.on(cc.Node.EventType.TOUCH_END, this.on_click_adv2, this);
        this.refresh();
        ad_native_interstitial_1.ad_native_interstitial.show_count++;
        this.easy_click = false;
        var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (_business_config_data && _business_config_data["native_institial_white_easy_click"]) {
            var easy_click_pro = _business_config_data["native_institial_white_easy_click"].value[0];
            if (easy_click_pro > 0 && Math.random() <= easy_click_pro) {
                this.easy_click = true;
            }
        }
    };
    syyx_ui_interstitial.prototype.refresh = function () {
        syyx_sdk_utils_1.syyx_sdk_utils.set_texture_url(this.img_icon, this.native_data.imgUrlList);
        this.lb_title.string = this.native_data.title + "";
        this.lb_desc.string = this.native_data.desc + "";
        this.report_show();
    };
    syyx_ui_interstitial.prototype.hide = function () {
        if (this.node && this.node.parent) {
            this.node.parent.removeChild(this.node);
            this.on_hide();
        }
    };
    syyx_ui_interstitial.prototype.on_hide = function () {
        this.icon_close.off(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
        this.img_icon.node.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.btn_check.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.native_click.off(cc.Node.EventType.TOUCH_END, this.on_click_adv2, this);
    };
    syyx_ui_interstitial.prototype.set_default_pos = function (style) {
    };
    syyx_ui_interstitial.prototype.set_style_pos = function (x, y) {
        x > -10000 && (this.game_node.x = x);
        y > -10000 && (this.game_node.y = y);
    };
    syyx_ui_interstitial.prototype.set_background_on_show = function () {
        var self = this;
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            //后台到前台
            syyx_sdk_api_1.syyx_sdk_api.on_show(function () {
                if (self && cc.isValid(self.node)) {
                    console.log("igc----- native_interstitial set_background_on_show");
                    self.report_show();
                }
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], syyx_ui_interstitial.prototype, "game_node", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_interstitial.prototype, "icon_close", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_interstitial.prototype, "native_click", void 0);
    __decorate([
        property(cc.Label)
    ], syyx_ui_interstitial.prototype, "lb_title", void 0);
    __decorate([
        property(cc.Label)
    ], syyx_ui_interstitial.prototype, "lb_desc", void 0);
    __decorate([
        property(cc.Sprite)
    ], syyx_ui_interstitial.prototype, "img_icon", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_interstitial.prototype, "btn_check", void 0);
    syyx_ui_interstitial = __decorate([
        ccclass
    ], syyx_ui_interstitial);
    return syyx_ui_interstitial;
}(cc.Component));
exports.default = syyx_ui_interstitial;

cc._RF.pop();