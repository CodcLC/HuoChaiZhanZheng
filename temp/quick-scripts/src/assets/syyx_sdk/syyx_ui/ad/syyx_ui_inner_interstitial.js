"use strict";
cc._RF.push(module, 'b3228ltiBFCqqBz3Ily2DFg', 'syyx_ui_inner_interstitial');
// syyx_sdk/syyx_ui/ad/syyx_ui_inner_interstitial.ts

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
var ad_native_inner_interstitial_1 = require("../../controller/ad/ad_native_inner_interstitial");
var syyx_adv_manager_1 = require("../../controller/ad/syyx_adv_manager");
var syyx_manager_1 = require("../../controller/syyx_manager");
var syyx_sdk_api_1 = require("../../syyx_sdk_api");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var syyx_ui_inner_interstitial = /** @class */ (function (_super) {
    __extends(syyx_ui_inner_interstitial, _super);
    function syyx_ui_inner_interstitial() {
        var _this = _super.call(this) || this;
        _this.icon_close = null;
        _this.native_node = null;
        _this.lb_title = null;
        _this.lb_desc = null;
        _this.img_icon = null;
        //点击结算原生回调
        _this.click_back = undefined;
        _this.set_background_on_show();
        return _this;
    }
    syyx_ui_inner_interstitial.prototype.on_click_adv = function () {
        this.report_click();
    };
    syyx_ui_inner_interstitial.prototype.on_click_close = function () {
        var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (_business_config_data && _business_config_data["native_inner_institial_click_close_pro"]) {
            var trap_pro = _business_config_data["native_inner_institial_click_close_pro"].value[0]; // 0
            if (trap_pro >= 0 && Math.random() <= trap_pro) {
                this.report_click();
            }
        }
        this.hide();
    };
    /**
    * 广告被点击
    */
    syyx_ui_inner_interstitial.prototype.report_click = function () {
        if (this.native_data) {
            this.click_back && this.click_back();
            syyx_manager_1.syyx_manager.report_ad_click(syyx_sdk_enum_1.e_ad_id.native_inner_interstitial_success, this.native_data); // 10302001
            console.log("igc----- has clicked native inner interstitial");
            // this.hide()
        }
        else {
            console.log("igc----- syyx_ui_inner_interstitial report_click native_data is null!");
        }
    };
    /**
    * 广告被曝光
    */
    syyx_ui_inner_interstitial.prototype.report_show = function () {
        if (this.native_data) {
            syyx_adv_manager_1.syyx_adv_manager.report_ad_show(syyx_sdk_enum_1.e_ad_id.native_inner_interstitial_success, this.native_data); // // 10302001
        }
        else {
            console.log("igc----- syyx_ui_inner_interstitial report_show native_data is null!");
        }
    };
    syyx_ui_inner_interstitial.prototype.show = function (parent, native_data, click_back, show_back, hide_back, is_new_type) {
        if (this.node && !this.node.parent) {
            this.native_data = native_data;
            this.show_back = show_back || undefined;
            this.hide_back = hide_back || undefined;
            this.click_back = click_back || undefined;
            this.node.parent = parent;
            // console.log("回调回调。。。。。。。。")
            this.on_show();
        }
    };
    /**
    * 上报点击后  重新拉取原生数据刷新界面
    */
    syyx_ui_inner_interstitial.prototype.report_click_update_view = function (native_data) {
        if (this.node && this.node.parent) {
            this.native_data = native_data;
            this.refresh();
        }
    };
    syyx_ui_inner_interstitial.prototype.on_show = function () {
        this.icon_close.on(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
        this.img_icon.node.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.refresh();
        ad_native_inner_interstitial_1.ad_native_inner_interstitial.show_count++;
        this.show_back && this.show_back();
    };
    syyx_ui_inner_interstitial.prototype.refresh = function () {
        syyx_sdk_utils_1.syyx_sdk_utils.set_texture_url(this.img_icon, this.native_data.imgUrlList, this.hide.bind(this));
        this.lb_title.string = this.native_data.title + "";
        this.lb_desc.string = this.native_data.desc + "";
        this.report_show();
    };
    syyx_ui_inner_interstitial.prototype.hide = function () {
        if (this.node && this.node.parent) {
            this.node.parent.removeChild(this.node);
            this.on_hide();
        }
    };
    syyx_ui_inner_interstitial.prototype.on_hide = function () {
        this.icon_close.off(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
        this.img_icon.node.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.hide_back && this.hide_back();
    };
    syyx_ui_inner_interstitial.prototype.set_default_pos = function (style) {
    };
    syyx_ui_inner_interstitial.prototype.set_style_pos = function (x, y) {
    };
    syyx_ui_inner_interstitial.prototype.set_background_on_show = function () {
        var self = this;
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            //后台到前台
            syyx_sdk_api_1.syyx_sdk_api.on_show(function () {
                if (self && cc.isValid(self.node)) {
                    console.log("igc----- native_inner_interstitial set_background_on_show");
                    self.report_show();
                }
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], syyx_ui_inner_interstitial.prototype, "icon_close", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_inner_interstitial.prototype, "native_node", void 0);
    __decorate([
        property(cc.Label)
    ], syyx_ui_inner_interstitial.prototype, "lb_title", void 0);
    __decorate([
        property(cc.Label)
    ], syyx_ui_inner_interstitial.prototype, "lb_desc", void 0);
    __decorate([
        property(cc.Sprite)
    ], syyx_ui_inner_interstitial.prototype, "img_icon", void 0);
    syyx_ui_inner_interstitial = __decorate([
        ccclass
    ], syyx_ui_inner_interstitial);
    return syyx_ui_inner_interstitial;
}(cc.Component));
exports.default = syyx_ui_inner_interstitial;

cc._RF.pop();