"use strict";
cc._RF.push(module, 'c7c1ddA8fdBNo6gfRknrvxY', 'syyx_ui_native_icon');
// syyx_sdk/syyx_ui/ad/syyx_ui_native_icon.ts

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
var syyx_sdk_enum_1 = require("./../../configs/syyx_sdk_enum");
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var syyx_manager_1 = require("../../controller/syyx_manager");
var syyx_sdk_api_1 = require("../../syyx_sdk_api");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var syyx_adv_manager_1 = require("../../controller/ad/syyx_adv_manager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var syyx_ui_native_icon = /** @class */ (function (_super) {
    __extends(syyx_ui_native_icon, _super);
    function syyx_ui_native_icon() {
        var _this = _super.call(this) || this;
        _this.icon_close = null;
        _this.native_node = null;
        _this.img_icon = null;
        _this.set_background_on_show();
        return _this;
    }
    syyx_ui_native_icon.prototype.on_click_adv = function () {
        this.report_click();
    };
    syyx_ui_native_icon.prototype.on_click_close = function () {
        var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (_business_config_data && _business_config_data["native_icon_trap_pro"]) {
            var trap_pro = _business_config_data["native_icon_trap_pro"].value[0]; // 0
            if (trap_pro >= 0 && Math.random() <= trap_pro) { // trap_pro为0，不满足条件
                this.report_click();
            }
        }
        this.hide();
    };
    /**
    * 广告被点击
    */
    syyx_ui_native_icon.prototype.report_click = function () {
        if (this.native_data) {
            syyx_adv_manager_1.syyx_adv_manager.report_ad_click(syyx_sdk_enum_1.e_ad_id.native_icon, this.native_data);
        }
    };
    /**
    * 广告被曝光
    */
    syyx_ui_native_icon.prototype.report_show = function () {
        if (this.native_data) {
            syyx_adv_manager_1.syyx_adv_manager.report_ad_show(syyx_sdk_enum_1.e_ad_id.native_icon, this.native_data);
        }
    };
    syyx_ui_native_icon.prototype.show = function (parent, native_data) {
        if (this.node && !this.node.parent && parent) {
            this.native_data = native_data;
            this.node.parent = parent;
            this.on_show();
        }
    };
    /**
    * 上报点击后  重新拉取原生数据刷新界面
    */
    syyx_ui_native_icon.prototype.report_click_update_view = function (native_data) {
        if (this.node && this.node.parent) {
            this.native_data = native_data;
            this.refresh();
        }
    };
    syyx_ui_native_icon.prototype.on_show = function () {
        this.icon_close.on(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
        this.img_icon.node.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.refresh();
    };
    syyx_ui_native_icon.prototype.refresh = function () {
        syyx_sdk_utils_1.syyx_sdk_utils.set_texture_url(this.img_icon, this.native_data.imgUrlList, this.hide.bind(this));
        this.report_show();
        this.play_icon_animation();
    };
    syyx_ui_native_icon.prototype.play_icon_animation = function () {
        this.stop_icon_animation();
        this.native_node.rotation = 0;
        var move1 = cc.rotateTo(0.2, -5);
        var move2 = cc.rotateTo(0.4, 5);
        var move3 = cc.rotateTo(0.2, 0);
        this.icon_ani = this.native_node.runAction(cc.sequence(move1, move2, move3));
    };
    syyx_ui_native_icon.prototype.stop_icon_animation = function () {
        if (this.icon_ani) {
            this.native_node.stopAction(this.icon_ani);
            this.icon_ani = null;
        }
    };
    syyx_ui_native_icon.prototype.hide = function () {
        if (this.node && this.node.parent) {
            this.node.parent.removeChild(this.node);
            this.on_hide();
        }
    };
    syyx_ui_native_icon.prototype.on_hide = function () {
        this.icon_close.off(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
        this.img_icon.node.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
    };
    syyx_ui_native_icon.prototype.set_default_pos = function (style) {
    };
    syyx_ui_native_icon.prototype.set_style_pos = function (x, y) {
    };
    syyx_ui_native_icon.prototype.set_background_on_show = function () {
        var self = this;
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            //后台到前台
            syyx_sdk_api_1.syyx_sdk_api.on_show(function () {
                if (self && cc.isValid(self.node)) {
                    console.log("igc----- native_icon set_background_on_show");
                    self.report_show();
                }
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], syyx_ui_native_icon.prototype, "icon_close", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_native_icon.prototype, "native_node", void 0);
    __decorate([
        property(cc.Sprite)
    ], syyx_ui_native_icon.prototype, "img_icon", void 0);
    syyx_ui_native_icon = __decorate([
        ccclass
    ], syyx_ui_native_icon);
    return syyx_ui_native_icon;
}(cc.Component));
exports.default = syyx_ui_native_icon;

cc._RF.pop();