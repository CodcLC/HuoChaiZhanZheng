"use strict";
cc._RF.push(module, '43be3ENcplHsJ3dgWKcnSxe', 'syyx_ui_banner');
// syyx_sdk/syyx_ui/ad/syyx_ui_banner.ts

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
var ad_banner_1 = require("../../controller/ad/ad_banner");
var syyx_adv_manager_1 = require("../../controller/ad/syyx_adv_manager");
var syyx_manager_1 = require("../../controller/syyx_manager");
var syyx_sdk_api_1 = require("../../syyx_sdk_api");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var syyx_ui_banner = /** @class */ (function (_super) {
    __extends(syyx_ui_banner, _super);
    function syyx_ui_banner() {
        var _this = _super.call(this) || this;
        _this.game_node = null;
        _this.icon_close = null;
        _this.native_bg = null;
        _this.lb_title = null;
        _this.lb_desc = null;
        _this.img_icon = null;
        _this.click_mask = null;
        /**
         * 是否上报过点击
         */
        _this.is_reprot_click = false;
        /**
         * 是否为易点击模式
         */
        _this.easy_click_model = false;
        _this.is_set_style = false;
        /**
        * 原生banner展示次数
        */
        _this.show_count = 0;
        _this.next_change_height_count = -1;
        _this.next_change_scale_count = -1;
        _this.timer_id = undefined;
        _this.is_heighting = false;
        _this.set_background_on_show();
        return _this;
    }
    syyx_ui_banner.prototype.onEnable = function () {
        this.easy_click_model = ad_banner_1.ad_banner.get_is_easy_click_model();
        if (this.easy_click_model) {
            this.stage = window["cc"].director.getScene().getChildByName("Canvas");
            cc.isValid(this.stage) && this.stage.on(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        }
    };
    syyx_ui_banner.prototype.onDisable = function () {
        if (this.easy_click_model) {
            cc.isValid(this.stage) && this.stage.off(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        }
    };
    syyx_ui_banner.prototype.show = function (native_data) {
        if (this.node && !this.node.parent) {
            this.node.parent = syyx_sdk_utils_1.syyx_sdk_utils.get_stage();
            cc.game.addPersistRootNode(this.node);
            this.node.zIndex = 1000001;
            this.node.active = false;
        }
        if (cc.isValid(this.node) && !this.node.active) {
            var auto_scale = syyx_sdk_utils_1.syyx_sdk_utils.get_screen_ratio();
            this.node.width = cc.view.getVisibleSize().width / auto_scale;
            this.node.height = cc.view.getVisibleSize().height / auto_scale;
            this.node.x = cc.view.getVisibleSize().width / 2;
            this.node.y = cc.view.getVisibleSize().height / 2;
            this.set_default_pos();
            this.on_show(native_data);
        }
    };
    syyx_ui_banner.prototype.on_show = function (native_data) {
        this.node.active = true;
        this.show_count++;
        this.icon_close.on(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
        this.is_reprot_click = false;
        this.click_mask.active = false;
        this.native_bg.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.click_mask.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        if (native_data) {
            this.native_data = native_data;
        }
        else {
            this.native_data = syyx_sdk_api_1.syyx_sdk_api.get_local_native_data(ad_banner_1.ad_banner._native_banner_id);
        }
        this.refresh();
    };
    syyx_ui_banner.prototype.show_click_mask = function () {
        var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (_business_config_data && _business_config_data["banner_click_mask_open_rule"]) {
            var rule = _business_config_data["banner_click_mask_open_rule"].value;
            if (rule) {
                if (this.next_change_scale_count == -1) {
                    this.next_change_scale_count = rule[0];
                }
                if (this.show_count == this.next_change_scale_count) {
                    this.next_change_scale_count += rule[1] + Math.floor(Math.random() * (rule[2] - rule[1] + 1));
                    this.click_mask.active = true;
                    this.adjust_mask_node();
                }
            }
        }
    };
    syyx_ui_banner.prototype.get_change_scale = function () {
        var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (_business_config_data && _business_config_data["banner_click_mask_scale"]) {
            return _business_config_data["banner_click_mask_scale"].value[0];
        }
        return 1;
    };
    syyx_ui_banner.prototype.adjust_mask_node = function () {
        this.click_mask.height = this.game_node.height;
        this.click_mask.width = this.game_node.width;
        this.click_mask.scaleX = this.game_node.scaleX * this.get_change_scale();
        this.click_mask.scaleY = this.game_node.scaleY * this.get_change_scale();
        this.click_mask.opacity = 0;
        var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (_business_config_data && _business_config_data["banner_click_mask_preview"]) {
            if (_business_config_data["banner_click_mask_preview"].value[0] == 1) {
                this.click_mask.opacity = 80;
            }
        }
    };
    syyx_ui_banner.prototype.refresh = function () {
        this.lb_desc.string = this.native_data.desc + "";
        this.lb_title.string = this.native_data.title + "";
        syyx_sdk_utils_1.syyx_sdk_utils.set_texture_url(this.img_icon, this.native_data.imgUrlList);
        if (!this.is_heighting) { // banner变高时为true，恢复时为false
            this.game_node.height = this.get_banner_default_height();
            this.set_default_pos();
        }
        this.report_show();
        this.set_banner_height();
        this.show_click_mask();
    };
    syyx_ui_banner.prototype.touch_move = function (event) {
        if (this.easy_click_model && this.node && this.node.active) {
            console.log("touch move");
            // 手指在场景中移动到banenr区域
            if (event.touch.getLocationY() <= this.game_node.height * this.game_node.scaleY * this.node.scaleY) {
                if (event.touch.getLocationX() >= (cc.view.getVisibleSize().width - this.game_node.width * this.game_node.scaleX * this.node.scaleX) / 2) {
                    if (event.touch.getLocationX() < (cc.view.getVisibleSize().width + this.game_node.width * this.game_node.scaleX * this.node.scaleX) / 2) {
                        this.on_click_adv2();
                        return;
                    }
                }
            }
            // 手指在场景中移动到banenr_mask区域
            if (event.touch.getLocationY() <= this.click_mask.height * this.click_mask.scaleY * this.node.scaleY) {
                if (event.touch.getLocationX() >= (cc.view.getVisibleSize().width - this.click_mask.width * this.click_mask.scaleX * this.node.scaleX) / 2) {
                    if (event.touch.getLocationX() < (cc.view.getVisibleSize().width + this.click_mask.width * this.click_mask.scaleX * this.node.scaleX) / 2) {
                        this.on_click_adv2();
                        return;
                    }
                }
            }
        }
    };
    syyx_ui_banner.prototype.on_click_adv2 = function () {
        ad_banner_1.ad_banner.set_banenr_protect_model();
        this.on_click_adv();
    };
    syyx_ui_banner.prototype.on_click_adv = function () {
        if (this.is_reprot_click) {
            return;
        }
        if (this.easy_click_model) {
            cc.isValid(this.stage) && this.stage.off(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this);
        }
        this.native_bg.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.click_mask.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.is_reprot_click = true;
        this.report_click();
    };
    syyx_ui_banner.prototype.on_click_close = function () {
        ad_banner_1.ad_banner.finger_close_banner();
        this.hide();
    };
    /**
    * 广告被点击
    */
    syyx_ui_banner.prototype.report_click = function () {
        if (this.native_data) {
            // syyx_sdk_api.send_other_event(e_ad_id.native_banner, igc.igc_stat_ids.native_banner_click, this.native_data.native_type)
            syyx_adv_manager_1.syyx_adv_manager.report_ad_click(syyx_sdk_enum_1.e_ad_id.native_banner, this.native_data);
        }
    };
    /**
    * 广告被曝光
    */
    syyx_ui_banner.prototype.report_show = function () {
        if (this.native_data) {
            syyx_adv_manager_1.syyx_adv_manager.report_ad_show(syyx_sdk_enum_1.e_ad_id.native_banner, this.native_data);
        }
    };
    syyx_ui_banner.prototype.hide = function () {
        if (this.node && this.node.active) {
            this.node.active = false;
            this.on_hide();
        }
    };
    syyx_ui_banner.prototype.on_hide = function () {
        this.icon_close.off(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
        this.native_bg.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this);
        this.click_mask.active = false;
    };
    syyx_ui_banner.prototype.set_default_pos = function () {
        if (!this.is_set_style) {
            this.game_node.x = 0;
            this.game_node.y = -this.node.height / 2;
        }
        this.adjust_mask_node();
    };
    syyx_ui_banner.prototype.set_banner_height = function (is_auto) {
        if (is_auto === void 0) { is_auto = true; }
        if (this.node && this.node.parent) {
            var self_1 = this;
            var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
            if (_business_config_data && _business_config_data["native_banner_height_open_rule"]) {
                var rule = _business_config_data["native_banner_height_open_rule"].value; // [2, 3, 5]
                if (rule) {
                    if (this.next_change_height_count == -1) {
                        this.next_change_height_count = rule[0]; // 2
                    }
                    if (this.show_count == this.next_change_height_count || !is_auto) { // is_auto 为false会
                        if (!is_auto) {
                            console.log("sdk----- 强制banner变高，cp调");
                            this.next_change_height_count = this.show_count;
                        }
                        // this.next_change_height_count += rule[1] + Math.floor(Math.random() * (rule[2] - rule[1] ))
                        this.next_change_height_count += 2;
                        console.log("sdk----- 下一次banner自动变高的展示次数：", this.next_change_height_count); // 如果是cp调的，next_change_height_count 加 几个随机数
                        var height_rule_1 = _business_config_data["native_banner_height_rule"].value;
                        if (height_rule_1) {
                            this.game_node.height = this.get_screen_adaptation_height(height_rule_1[1]);
                            this.set_default_pos();
                            this.timer_id && clearTimeout(this.timer_id);
                            this.is_heighting = true;
                            this.timer_id = setTimeout(function () {
                                self_1.is_heighting = false;
                                self_1.game_node.height = self_1.get_screen_adaptation_height(height_rule_1[0]);
                                self_1.set_default_pos();
                                console.log("igc----- banner高度恢复");
                            }, height_rule_1[2] * 1000);
                        }
                    }
                }
            }
        }
    };
    syyx_ui_banner.prototype.get_banner_default_height = function () {
        var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        var height_rule = _business_config_data["native_banner_height_rule"].value;
        if (height_rule) {
            return this.get_screen_adaptation_height(height_rule[0]);
        }
        return 200;
    };
    syyx_ui_banner.prototype.get_screen_adaptation_height = function (height) {
        if (cc.view.getVisibleSize().height > cc.view.getVisibleSize().width) {
            //只有竖屏游戏才适配
            var scale = syyx_sdk_utils_1.syyx_sdk_utils.get_screen_ratio();
            return (cc.view.getVisibleSize().height / scale) * height / 1920;
        }
        return height;
    };
    syyx_ui_banner.prototype.resume_pos_and_scale = function () {
        this.is_set_style = false;
        //重新设置一下位置和缩放
        this.game_node.setScale(1, 1);
        this.set_default_pos();
    };
    syyx_ui_banner.prototype.set_pos_and_scale = function (x, y, scaleX, scaleY) {
        if (scaleX === void 0) { scaleX = undefined; }
        if (scaleY === void 0) { scaleY = undefined; }
        this.is_set_style = true;
        if (scaleX > -9999999) {
            this.game_node.setScale(scaleX, scaleY);
        }
        if (x > -9999999) {
            this.game_node.x = x;
            this.game_node.y = y;
            console.log("igc----- syyx_ui_banner set_pos_and_scale pos:", x, y, "scale:", scaleX);
        }
    };
    syyx_ui_banner.prototype.set_style_pos = function (x, y) {
        x > -10000 && (this.game_node.x = x);
        y > -10000 && (this.game_node.y = y);
    };
    syyx_ui_banner.prototype.set_background_on_show = function () {
        var self = this;
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            //后台到前台
            syyx_sdk_api_1.syyx_sdk_api.on_show(function () {
                if (self && cc.isValid(self.node)) {
                    console.log("igc----- native_banner set_background_on_show");
                    self.report_show();
                }
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], syyx_ui_banner.prototype, "game_node", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_banner.prototype, "icon_close", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_banner.prototype, "native_bg", void 0);
    __decorate([
        property(cc.Label)
    ], syyx_ui_banner.prototype, "lb_title", void 0);
    __decorate([
        property(cc.Label)
    ], syyx_ui_banner.prototype, "lb_desc", void 0);
    __decorate([
        property(cc.Sprite)
    ], syyx_ui_banner.prototype, "img_icon", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_banner.prototype, "click_mask", void 0);
    syyx_ui_banner = __decorate([
        ccclass
    ], syyx_ui_banner);
    return syyx_ui_banner;
}(cc.Component));
exports.default = syyx_ui_banner;

cc._RF.pop();