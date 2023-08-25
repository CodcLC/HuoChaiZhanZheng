
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_banner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHN5eXhfdWlcXGFkXFxzeXl4X3VpX2Jhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBMkQ7QUFDM0QsNkRBQXNEO0FBQ3RELDJEQUEwRDtBQUMxRCx5RUFBd0U7QUFDeEUsOERBQTZEO0FBRTdELG1EQUFrRDtBQUNsRCw2REFBNEQ7QUFHdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBNEMsa0NBQVk7SUFtRHBEO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBcERELGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGFBQU8sR0FBYSxJQUFJLENBQUM7UUFHekIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQU8zQjs7V0FFRztRQUNILHFCQUFlLEdBQUcsS0FBSyxDQUFBO1FBRXZCOztXQUVHO1FBQ0gsc0JBQWdCLEdBQUcsS0FBSyxDQUFBO1FBRXhCLGtCQUFZLEdBQUcsS0FBSyxDQUFBO1FBRXBCOztVQUVFO1FBQ0YsZ0JBQVUsR0FBRyxDQUFDLENBQUE7UUFDZCw4QkFBd0IsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUM3Qiw2QkFBdUIsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUU1QixjQUFRLEdBQUcsU0FBUyxDQUFBO1FBQ3BCLGtCQUFZLEdBQUcsS0FBSyxDQUFBO1FBTWhCLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFBOztJQUNqQyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxxQkFBUyxDQUFDLHVCQUF1QixFQUFFLENBQUE7UUFDM0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN0RSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUMvRjtJQUVMLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBQ0ksSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDaEc7SUFDTCxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLFdBQVk7UUFDYixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRywrQkFBYyxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBRTdDLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7U0FFM0I7UUFFRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUMsSUFBSSxVQUFVLEdBQUcsK0JBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1lBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQTtZQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUE7WUFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtZQUVqRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUM1QjtJQUNMLENBQUM7SUFJRCxnQ0FBTyxHQUFQLFVBQVEsV0FBWTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRTFFLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFBO1FBRTVCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUU5QixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUV4RSxJQUFJLFdBQVcsRUFBRTtZQUNiLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFBO1NBQ2pDO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLDJCQUFZLENBQUMscUJBQXFCLENBQUMscUJBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1NBQ3JGO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFRCx3Q0FBZSxHQUFmO1FBQ0ksSUFBSSxxQkFBcUIsR0FBRywyQkFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDOUQsSUFBSSxxQkFBcUIsSUFBSSxxQkFBcUIsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFO1lBQy9FLElBQUksSUFBSSxHQUFHLHFCQUFxQixDQUFDLDZCQUE2QixDQUFDLENBQUMsS0FBSyxDQUFBO1lBQ3JFLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksSUFBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUNwQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUN6QztnQkFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO29CQUNqRCxJQUFJLENBQUMsdUJBQXVCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUM3RixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7b0JBQzdCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO2lCQUMxQjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQseUNBQWdCLEdBQWhCO1FBQ0ksSUFBSSxxQkFBcUIsR0FBRywyQkFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDOUQsSUFBSSxxQkFBcUIsSUFBSSxxQkFBcUIsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO1lBQzNFLE9BQU8scUJBQXFCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbkU7UUFDRCxPQUFPLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQTtRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQTtRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUV4RSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUE7UUFDM0IsSUFBSSxxQkFBcUIsR0FBRywyQkFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUE7UUFDOUQsSUFBSSxxQkFBcUIsSUFBSSxxQkFBcUIsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFO1lBQzdFLElBQUkscUJBQXFCLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7YUFDL0I7U0FDSjtJQUNMLENBQUM7SUFFRCxnQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtRQUNsRCwrQkFBYyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSwyQkFBMkI7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUE7WUFDeEQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtJQUUxQixDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLEtBQUs7UUFFWixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7WUFFekIsb0JBQW9CO1lBQ3BCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDaEcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3RJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNySSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7d0JBQ3BCLE9BQU07cUJBQ1Q7aUJBQ0o7YUFDSjtZQUVELHlCQUF5QjtZQUN6QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xHLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4SSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDdkksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO3dCQUNwQixPQUFNO3FCQUNUO2lCQUNKO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRCxzQ0FBYSxHQUFiO1FBQ0kscUJBQVMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFBO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBR0QscUNBQVksR0FBWjtRQUNJLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN0QixPQUFNO1NBQ1Q7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUNoRztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3hFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXpFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFBO1FBQzNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRUQsdUNBQWMsR0FBZDtRQUNJLHFCQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUMvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0lBRUQ7O01BRUU7SUFDRixxQ0FBWSxHQUFaO1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLDJIQUEySDtZQUMzSCxtQ0FBZ0IsQ0FBQyxlQUFlLENBQUMsdUJBQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQzVFO0lBQ0wsQ0FBQztJQUVEOztNQUVFO0lBQ0Ysb0NBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixtQ0FBZ0IsQ0FBQyxjQUFjLENBQUMsdUJBQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQzNFO0lBQ0wsQ0FBQztJQUVELDZCQUFJLEdBQUo7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNqQjtJQUNMLENBQUM7SUFFRCxnQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDM0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQ2xDLENBQUM7SUFFRCx3Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1NBQzNDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUVTLDBDQUFpQixHQUEzQixVQUE0QixPQUFjO1FBQWQsd0JBQUEsRUFBQSxjQUFjO1FBQ3RDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMvQixJQUFJLE1BQUksR0FBRyxJQUFJLENBQUE7WUFDZixJQUFJLHFCQUFxQixHQUFHLDJCQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtZQUM5RCxJQUFJLHFCQUFxQixJQUFJLHFCQUFxQixDQUFDLGdDQUFnQyxDQUFDLEVBQUU7Z0JBQ2xGLElBQUksSUFBSSxHQUFHLHFCQUFxQixDQUFDLGdDQUFnQyxDQUFDLENBQUMsS0FBSyxDQUFBLENBQUMsWUFBWTtnQkFDckYsSUFBSSxJQUFJLEVBQUU7b0JBQ04sSUFBSSxJQUFJLENBQUMsd0JBQXdCLElBQUksQ0FBQyxDQUFDLEVBQUU7d0JBQ3JDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxJQUFJO3FCQUMvQztvQkFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLHdCQUF3QixJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsa0JBQWtCO3dCQUVsRixJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQTs0QkFDdEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUE7eUJBQ2xEO3dCQUNELDhGQUE4Rjt3QkFDOUYsSUFBSSxDQUFDLHdCQUF3QixJQUFJLENBQUMsQ0FBQTt3QkFFbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQSxDQUFFLDJDQUEyQzt3QkFFdkgsSUFBSSxhQUFXLEdBQUcscUJBQXFCLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxLQUFLLENBQUE7d0JBQzFFLElBQUksYUFBVyxFQUFFOzRCQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxhQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDekUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBOzRCQUN0QixJQUFJLENBQUMsUUFBUSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7NEJBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBOzRCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztnQ0FDdkIsTUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7Z0NBQ3pCLE1BQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQUksQ0FBQyw0QkFBNEIsQ0FBQyxhQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQ0FDekUsTUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO2dDQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7NEJBQ3RDLENBQUMsRUFBRSxhQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7eUJBQzVCO3FCQUVKO2lCQUNKO2FBQ0o7U0FDSjtJQUVMLENBQUM7SUFFUyxrREFBeUIsR0FBbkM7UUFDSSxJQUFJLHFCQUFxQixHQUFHLDJCQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUM5RCxJQUFJLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUMxRSxJQUFJLFdBQVcsRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQzNEO1FBQ0QsT0FBTyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBRUQscURBQTRCLEdBQTVCLFVBQTZCLE1BQU07UUFDL0IsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssRUFBRTtZQUNsRSxXQUFXO1lBQ1gsSUFBSSxLQUFLLEdBQUcsK0JBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO1lBQzdDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFBO1NBQ25FO1FBQ0QsT0FBTyxNQUFNLENBQUE7SUFFakIsQ0FBQztJQUVTLDZDQUFvQixHQUE5QjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO1FBQ3pCLGFBQWE7UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFFUywwQ0FBaUIsR0FBM0IsVUFBNEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFrQixFQUFFLE1BQWtCO1FBQXRDLHVCQUFBLEVBQUEsa0JBQWtCO1FBQUUsdUJBQUEsRUFBQSxrQkFBa0I7UUFFcEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7UUFFeEIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUE7U0FDeEY7SUFDTCxDQUFDO0lBRUQsc0NBQWEsR0FBYixVQUFjLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDcEMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVELCtDQUFzQixHQUF0QjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNmLElBQUksNEJBQVUsQ0FBQyxnQkFBZ0IsS0FBSyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtZQUMxRCxPQUFPO1lBQ1AsMkJBQVksQ0FBQyxPQUFPLENBQ2hCO2dCQUNJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLCtDQUErQyxDQUFDLENBQUE7b0JBQzVELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtpQkFDckI7WUFDTCxDQUFDLENBQ0osQ0FBQTtTQUNKO0lBQ0wsQ0FBQztJQTdXRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ1M7SUFHM0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztxREFDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7bURBQ007SUFHekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDTztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNTO0lBckJWLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FrWGxDO0lBQUQscUJBQUM7Q0FsWEQsQUFrWEMsQ0FsWDJDLEVBQUUsQ0FBQyxTQUFTLEdBa1h2RDtrQkFsWG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzeXl4X2NvbnN0IH0gZnJvbSBcIi4uLy4uL2NvbmZpZ3Mvc3l5eF9zZGtfY29uZmlnXCI7XHJcbmltcG9ydCB7IGVfYWRfaWQgfSBmcm9tIFwiLi4vLi4vY29uZmlncy9zeXl4X3Nka19lbnVtXCI7XHJcbmltcG9ydCB7IGFkX2Jhbm5lciB9IGZyb20gXCIuLi8uLi9jb250cm9sbGVyL2FkL2FkX2Jhbm5lclwiO1xyXG5pbXBvcnQgeyBzeXl4X2Fkdl9tYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXIvYWQvc3l5eF9hZHZfbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBzeXl4X21hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29udHJvbGxlci9zeXl4X21hbmFnZXJcIjtcclxuaW1wb3J0IHsgbmF0aXZlX2FkX2RhdGEgfSBmcm9tIFwiLi4vLi4vbW9kZWwvbW9kZWxcIjtcclxuaW1wb3J0IHsgc3l5eF9zZGtfYXBpIH0gZnJvbSBcIi4uLy4uL3N5eXhfc2RrX2FwaVwiO1xyXG5pbXBvcnQgeyBzeXl4X3Nka191dGlscyB9IGZyb20gXCIuLi8uLi91dGlscy9zeXl4X3Nka191dGlsc1wiO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzeXl4X3VpX2Jhbm5lciBleHRlbmRzIGNjLkNvbXBvbmVudCB7IC8vIFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2FtZV9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGljb25fY2xvc2U6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbmF0aXZlX2JnOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYl90aXRsZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxiX2Rlc2M6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgaW1nX2ljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjbGlja19tYXNrOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICog5Y6f55Sf5bm/5ZGK5pWw5o2uXHJcbiAgICAqL1xyXG4gICAgbmF0aXZlX2RhdGE6IG5hdGl2ZV9hZF9kYXRhXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuIrmiqXov4fngrnlh7tcclxuICAgICAqL1xyXG4gICAgaXNfcmVwcm90X2NsaWNrID0gZmFsc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuS4uuaYk+eCueWHu+aooeW8j1xyXG4gICAgICovXHJcbiAgICBlYXN5X2NsaWNrX21vZGVsID0gZmFsc2VcclxuXHJcbiAgICBpc19zZXRfc3R5bGUgPSBmYWxzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDljp/nlJ9iYW5uZXLlsZXnpLrmrKHmlbBcclxuICAgICovXHJcbiAgICBzaG93X2NvdW50ID0gMFxyXG4gICAgbmV4dF9jaGFuZ2VfaGVpZ2h0X2NvdW50ID0gLTFcclxuICAgIG5leHRfY2hhbmdlX3NjYWxlX2NvdW50ID0gLTFcclxuXHJcbiAgICB0aW1lcl9pZCA9IHVuZGVmaW5lZFxyXG4gICAgaXNfaGVpZ2h0aW5nID0gZmFsc2VcclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG5cclxuICAgICAgICB0aGlzLnNldF9iYWNrZ3JvdW5kX29uX3Nob3coKVxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG5cclxuICAgICAgICB0aGlzLmVhc3lfY2xpY2tfbW9kZWwgPSBhZF9iYW5uZXIuZ2V0X2lzX2Vhc3lfY2xpY2tfbW9kZWwoKVxyXG4gICAgICAgIGlmICh0aGlzLmVhc3lfY2xpY2tfbW9kZWwpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IHdpbmRvd1tcImNjXCJdLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoXCJDYW52YXNcIilcclxuICAgICAgICAgICAgY2MuaXNWYWxpZCh0aGlzLnN0YWdlKSAmJiB0aGlzLnN0YWdlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMudG91Y2hfbW92ZSwgdGhpcylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5lYXN5X2NsaWNrX21vZGVsKSB7XHJcbiAgICAgICAgICAgIGNjLmlzVmFsaWQodGhpcy5zdGFnZSkgJiYgdGhpcy5zdGFnZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy50b3VjaF9tb3ZlLCB0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93KG5hdGl2ZV9kYXRhPykge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgIXRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IHN5eXhfc2RrX3V0aWxzLmdldF9zdGFnZSgpXHJcblxyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gMTAwMDAwMVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLm5vZGUpICYmICF0aGlzLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCBhdXRvX3NjYWxlID0gc3l5eF9zZGtfdXRpbHMuZ2V0X3NjcmVlbl9yYXRpbygpXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIGF1dG9fc2NhbGVcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyBhdXRvX3NjYWxlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54ID0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoIC8gMlxyXG4gICAgICAgICAgICB0aGlzLm5vZGUueSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyAyXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldF9kZWZhdWx0X3BvcygpXHJcbiAgICAgICAgICAgIHRoaXMub25fc2hvdyhuYXRpdmVfZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhZ2VcclxuXHJcbiAgICBvbl9zaG93KG5hdGl2ZV9kYXRhPykge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5zaG93X2NvdW50KytcclxuICAgICAgICB0aGlzLmljb25fY2xvc2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uX2NsaWNrX2Nsb3NlLCB0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLmlzX3JlcHJvdF9jbGljayA9IGZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMuY2xpY2tfbWFzay5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICB0aGlzLm5hdGl2ZV9iZy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fY2xpY2tfYWR2LCB0aGlzKVxyXG4gICAgICAgIHRoaXMuY2xpY2tfbWFzay5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fY2xpY2tfYWR2LCB0aGlzKVxyXG5cclxuICAgICAgICBpZiAobmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVfZGF0YSA9IG5hdGl2ZV9kYXRhXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVfZGF0YSA9IHN5eXhfc2RrX2FwaS5nZXRfbG9jYWxfbmF0aXZlX2RhdGEoYWRfYmFubmVyLl9uYXRpdmVfYmFubmVyX2lkKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZnJlc2goKVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dfY2xpY2tfbWFzaygpIHtcclxuICAgICAgICBsZXQgX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGlmIChfYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiYmFubmVyX2NsaWNrX21hc2tfb3Blbl9ydWxlXCJdKSB7XHJcbiAgICAgICAgICAgIGxldCBydWxlID0gX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiYmFubmVyX2NsaWNrX21hc2tfb3Blbl9ydWxlXCJdLnZhbHVlXHJcbiAgICAgICAgICAgIGlmIChydWxlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0X2NoYW5nZV9zY2FsZV9jb3VudCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dF9jaGFuZ2Vfc2NhbGVfY291bnQgPSBydWxlWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93X2NvdW50ID09IHRoaXMubmV4dF9jaGFuZ2Vfc2NhbGVfY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRfY2hhbmdlX3NjYWxlX2NvdW50ICs9IHJ1bGVbMV0gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAocnVsZVsyXSAtIHJ1bGVbMV0gKyAxKSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsaWNrX21hc2suYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRqdXN0X21hc2tfbm9kZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0X2NoYW5nZV9zY2FsZSgpIHtcclxuICAgICAgICBsZXQgX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGlmIChfYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiYmFubmVyX2NsaWNrX21hc2tfc2NhbGVcIl0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9idXNpbmVzc19jb25maWdfZGF0YVtcImJhbm5lcl9jbGlja19tYXNrX3NjYWxlXCJdLnZhbHVlWzBdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAxXHJcbiAgICB9XHJcblxyXG4gICAgYWRqdXN0X21hc2tfbm9kZSgpIHtcclxuICAgICAgICB0aGlzLmNsaWNrX21hc2suaGVpZ2h0ID0gdGhpcy5nYW1lX25vZGUuaGVpZ2h0XHJcbiAgICAgICAgdGhpcy5jbGlja19tYXNrLndpZHRoID0gdGhpcy5nYW1lX25vZGUud2lkdGhcclxuICAgICAgICB0aGlzLmNsaWNrX21hc2suc2NhbGVYID0gdGhpcy5nYW1lX25vZGUuc2NhbGVYICogdGhpcy5nZXRfY2hhbmdlX3NjYWxlKClcclxuICAgICAgICB0aGlzLmNsaWNrX21hc2suc2NhbGVZID0gdGhpcy5nYW1lX25vZGUuc2NhbGVZICogdGhpcy5nZXRfY2hhbmdlX3NjYWxlKClcclxuXHJcbiAgICAgICAgdGhpcy5jbGlja19tYXNrLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgbGV0IF9idXNpbmVzc19jb25maWdfZGF0YSA9IHN5eXhfbWFuYWdlci5nZXRfYnVzaW5lc3NfY29uZmlnKClcclxuICAgICAgICBpZiAoX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIF9idXNpbmVzc19jb25maWdfZGF0YVtcImJhbm5lcl9jbGlja19tYXNrX3ByZXZpZXdcIl0pIHtcclxuICAgICAgICAgICAgaWYgKF9idXNpbmVzc19jb25maWdfZGF0YVtcImJhbm5lcl9jbGlja19tYXNrX3ByZXZpZXdcIl0udmFsdWVbMF0gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja19tYXNrLm9wYWNpdHkgPSA4MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZnJlc2goKSB7XHJcbiAgICAgICAgdGhpcy5sYl9kZXNjLnN0cmluZyA9IHRoaXMubmF0aXZlX2RhdGEuZGVzYyArIFwiXCJcclxuICAgICAgICB0aGlzLmxiX3RpdGxlLnN0cmluZyA9IHRoaXMubmF0aXZlX2RhdGEudGl0bGUgKyBcIlwiXHJcbiAgICAgICAgc3l5eF9zZGtfdXRpbHMuc2V0X3RleHR1cmVfdXJsKHRoaXMuaW1nX2ljb24sIHRoaXMubmF0aXZlX2RhdGEuaW1nVXJsTGlzdCkgXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc19oZWlnaHRpbmcpIHsgLy8gYmFubmVy5Y+Y6auY5pe25Li6dHJ1Ze+8jOaBouWkjeaXtuS4umZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZV9ub2RlLmhlaWdodCA9IHRoaXMuZ2V0X2Jhbm5lcl9kZWZhdWx0X2hlaWdodCgpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0X2RlZmF1bHRfcG9zKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVwb3J0X3Nob3coKVxyXG4gICAgICAgIHRoaXMuc2V0X2Jhbm5lcl9oZWlnaHQoKVxyXG4gICAgICAgIHRoaXMuc2hvd19jbGlja19tYXNrKClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hfbW92ZShldmVudCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lYXN5X2NsaWNrX21vZGVsICYmIHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidG91Y2ggbW92ZVwiKVxyXG5cclxuICAgICAgICAgICAgLy8g5omL5oyH5Zyo5Zy65pmv5Lit56e75Yqo5YiwYmFuZW5y5Yy65Z+fXHJcbiAgICAgICAgICAgIGlmIChldmVudC50b3VjaC5nZXRMb2NhdGlvblkoKSA8PSB0aGlzLmdhbWVfbm9kZS5oZWlnaHQgKiB0aGlzLmdhbWVfbm9kZS5zY2FsZVkgKiB0aGlzLm5vZGUuc2NhbGVZKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudG91Y2guZ2V0TG9jYXRpb25YKCkgPj0gKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAtIHRoaXMuZ2FtZV9ub2RlLndpZHRoICogdGhpcy5nYW1lX25vZGUuc2NhbGVYICogdGhpcy5ub2RlLnNjYWxlWCkgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRvdWNoLmdldExvY2F0aW9uWCgpIDwgKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCArIHRoaXMuZ2FtZV9ub2RlLndpZHRoICogdGhpcy5nYW1lX25vZGUuc2NhbGVYICogdGhpcy5ub2RlLnNjYWxlWCkgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25fY2xpY2tfYWR2MigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g5omL5oyH5Zyo5Zy65pmv5Lit56e75Yqo5YiwYmFuZW5yX21hc2vljLrln59cclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRvdWNoLmdldExvY2F0aW9uWSgpIDw9IHRoaXMuY2xpY2tfbWFzay5oZWlnaHQgKiB0aGlzLmNsaWNrX21hc2suc2NhbGVZICogdGhpcy5ub2RlLnNjYWxlWSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRvdWNoLmdldExvY2F0aW9uWCgpID49IChjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLSB0aGlzLmNsaWNrX21hc2sud2lkdGggKiB0aGlzLmNsaWNrX21hc2suc2NhbGVYICogdGhpcy5ub2RlLnNjYWxlWCkgLyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRvdWNoLmdldExvY2F0aW9uWCgpIDwgKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCArIHRoaXMuY2xpY2tfbWFzay53aWR0aCAqIHRoaXMuY2xpY2tfbWFzay5zY2FsZVggKiB0aGlzLm5vZGUuc2NhbGVYKSAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbl9jbGlja19hZHYyKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uX2NsaWNrX2FkdjIoKSB7XHJcbiAgICAgICAgYWRfYmFubmVyLnNldF9iYW5lbnJfcHJvdGVjdF9tb2RlbCgpXHJcbiAgICAgICAgdGhpcy5vbl9jbGlja19hZHYoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25fY2xpY2tfYWR2KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzX3JlcHJvdF9jbGljaykge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmVhc3lfY2xpY2tfbW9kZWwpIHtcclxuICAgICAgICAgICAgY2MuaXNWYWxpZCh0aGlzLnN0YWdlKSAmJiB0aGlzLnN0YWdlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLnRvdWNoX21vdmUsIHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF0aXZlX2JnLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fY2xpY2tfYWR2LCB0aGlzKVxyXG4gICAgICAgIHRoaXMuY2xpY2tfbWFzay5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uX2NsaWNrX2FkdiwgdGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5pc19yZXByb3RfY2xpY2sgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5yZXBvcnRfY2xpY2soKVxyXG4gICAgfVxyXG5cclxuICAgIG9uX2NsaWNrX2Nsb3NlKCkge1xyXG4gICAgICAgIGFkX2Jhbm5lci5maW5nZXJfY2xvc2VfYmFubmVyKClcclxuICAgICAgICB0aGlzLmhpZGUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlub/lkYrooqvngrnlh7tcclxuICAgICovXHJcbiAgICByZXBvcnRfY2xpY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgLy8gc3l5eF9zZGtfYXBpLnNlbmRfb3RoZXJfZXZlbnQoZV9hZF9pZC5uYXRpdmVfYmFubmVyLCBpZ2MuaWdjX3N0YXRfaWRzLm5hdGl2ZV9iYW5uZXJfY2xpY2ssIHRoaXMubmF0aXZlX2RhdGEubmF0aXZlX3R5cGUpXHJcbiAgICAgICAgICAgIHN5eXhfYWR2X21hbmFnZXIucmVwb3J0X2FkX2NsaWNrKGVfYWRfaWQubmF0aXZlX2Jhbm5lciwgdGhpcy5uYXRpdmVfZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOW5v+WRiuiiq+abneWFiVxyXG4gICAgKi9cclxuICAgIHJlcG9ydF9zaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgIHN5eXhfYWR2X21hbmFnZXIucmVwb3J0X2FkX3Nob3coZV9hZF9pZC5uYXRpdmVfYmFubmVyLCB0aGlzLm5hdGl2ZV9kYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5vbl9oaWRlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25faGlkZSgpIHtcclxuICAgICAgICB0aGlzLmljb25fY2xvc2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19jbG9zZSwgdGhpcylcclxuICAgICAgICB0aGlzLm5hdGl2ZV9iZy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uX2NsaWNrX2FkdiwgdGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5jbGlja19tYXNrLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgc2V0X2RlZmF1bHRfcG9zKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc19zZXRfc3R5bGUpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX25vZGUueCA9IDBcclxuICAgICAgICAgICAgdGhpcy5nYW1lX25vZGUueSA9IC10aGlzLm5vZGUuaGVpZ2h0IC8gMlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGp1c3RfbWFza19ub2RlKClcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0X2Jhbm5lcl9oZWlnaHQoaXNfYXV0byA9IHRydWUpIHsgLy8g56CU5Y+R6LCD5LygZmFsc2VcclxuICAgICAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgICAgIGxldCBfYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgICAgIGlmIChfYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2Jhbm5lcl9oZWlnaHRfb3Blbl9ydWxlXCJdKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcnVsZSA9IF9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9iYW5uZXJfaGVpZ2h0X29wZW5fcnVsZVwiXS52YWx1ZSAvLyBbMiwgMywgNV1cclxuICAgICAgICAgICAgICAgIGlmIChydWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dF9jaGFuZ2VfaGVpZ2h0X2NvdW50ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dF9jaGFuZ2VfaGVpZ2h0X2NvdW50ID0gcnVsZVswXSAvLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dfY291bnQgPT0gdGhpcy5uZXh0X2NoYW5nZV9oZWlnaHRfY291bnQgfHwgIWlzX2F1dG8pIHsgLy8gaXNfYXV0byDkuLpmYWxzZeS8mlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc19hdXRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNkay0tLS0tIOW8uuWItmJhbm5lcuWPmOmrmO+8jGNw6LCDXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRfY2hhbmdlX2hlaWdodF9jb3VudCA9IHRoaXMuc2hvd19jb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubmV4dF9jaGFuZ2VfaGVpZ2h0X2NvdW50ICs9IHJ1bGVbMV0gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAocnVsZVsyXSAtIHJ1bGVbMV0gKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0X2NoYW5nZV9oZWlnaHRfY291bnQgKz0gMlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZGstLS0tLSDkuIvkuIDmrKFiYW5uZXLoh6rliqjlj5jpq5jnmoTlsZXnpLrmrKHmlbDvvJpcIiwgdGhpcy5uZXh0X2NoYW5nZV9oZWlnaHRfY291bnQpICAvLyDlpoLmnpzmmK9jcOiwg+eahO+8jG5leHRfY2hhbmdlX2hlaWdodF9jb3VudCDliqAg5Yeg5Liq6ZqP5py65pWwXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVpZ2h0X3J1bGUgPSBfYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfYmFubmVyX2hlaWdodF9ydWxlXCJdLnZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWlnaHRfcnVsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lX25vZGUuaGVpZ2h0ID0gdGhpcy5nZXRfc2NyZWVuX2FkYXB0YXRpb25faGVpZ2h0KGhlaWdodF9ydWxlWzFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRfZGVmYXVsdF9wb3MoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcl9pZCAmJiBjbGVhclRpbWVvdXQodGhpcy50aW1lcl9pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNfaGVpZ2h0aW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lcl9pZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaXNfaGVpZ2h0aW5nID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmdhbWVfbm9kZS5oZWlnaHQgPSBzZWxmLmdldF9zY3JlZW5fYWRhcHRhdGlvbl9oZWlnaHQoaGVpZ2h0X3J1bGVbMF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRfZGVmYXVsdF9wb3MoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gYmFubmVy6auY5bqm5oGi5aSNXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBoZWlnaHRfcnVsZVsyXSAqIDEwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0X2Jhbm5lcl9kZWZhdWx0X2hlaWdodCgpIHtcclxuICAgICAgICBsZXQgX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGxldCBoZWlnaHRfcnVsZSA9IF9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9iYW5uZXJfaGVpZ2h0X3J1bGVcIl0udmFsdWVcclxuICAgICAgICBpZiAoaGVpZ2h0X3J1bGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X3NjcmVlbl9hZGFwdGF0aW9uX2hlaWdodChoZWlnaHRfcnVsZVswXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDIwMFxyXG4gICAgfVxyXG5cclxuICAgIGdldF9zY3JlZW5fYWRhcHRhdGlvbl9oZWlnaHQoaGVpZ2h0KSB7XHJcbiAgICAgICAgaWYgKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgPiBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGgpIHtcclxuICAgICAgICAgICAgLy/lj6rmnInnq5blsY/muLjmiI/miY3pgILphY1cclxuICAgICAgICAgICAgbGV0IHNjYWxlID0gc3l5eF9zZGtfdXRpbHMuZ2V0X3NjcmVlbl9yYXRpbygpXHJcbiAgICAgICAgICAgIHJldHVybiAoY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIHNjYWxlKSAqIGhlaWdodCAvIDE5MjBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzdW1lX3Bvc19hbmRfc2NhbGUoKSB7XHJcbiAgICAgICAgdGhpcy5pc19zZXRfc3R5bGUgPSBmYWxzZVxyXG4gICAgICAgIC8v6YeN5paw6K6+572u5LiA5LiL5L2N572u5ZKM57yp5pS+XHJcbiAgICAgICAgdGhpcy5nYW1lX25vZGUuc2V0U2NhbGUoMSwgMSlcclxuICAgICAgICB0aGlzLnNldF9kZWZhdWx0X3BvcygpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldF9wb3NfYW5kX3NjYWxlKHgsIHksIHNjYWxlWCA9IHVuZGVmaW5lZCwgc2NhbGVZID0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgIHRoaXMuaXNfc2V0X3N0eWxlID0gdHJ1ZVxyXG5cclxuICAgICAgICBpZiAoc2NhbGVYID4gLTk5OTk5OTkpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX25vZGUuc2V0U2NhbGUoc2NhbGVYLCBzY2FsZVkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ID4gLTk5OTk5OTkpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lX25vZGUueCA9IHhcclxuICAgICAgICAgICAgdGhpcy5nYW1lX25vZGUueSA9IHlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBzeXl4X3VpX2Jhbm5lciBzZXRfcG9zX2FuZF9zY2FsZSBwb3M6XCIsIHgsIHksIFwic2NhbGU6XCIsIHNjYWxlWClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X3N0eWxlX3Bvcyh4LCB5KSB7XHJcbiAgICAgICAgeCA+IC0xMDAwMCAmJiAodGhpcy5nYW1lX25vZGUueCA9IHgpXHJcbiAgICAgICAgeSA+IC0xMDAwMCAmJiAodGhpcy5nYW1lX25vZGUueSA9IHkpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0X2JhY2tncm91bmRfb25fc2hvdygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUuaHdfcWcpIHtcclxuICAgICAgICAgICAgLy/lkI7lj7DliLDliY3lj7BcclxuICAgICAgICAgICAgc3l5eF9zZGtfYXBpLm9uX3Nob3coXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYgJiYgY2MuaXNWYWxpZChzZWxmLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gbmF0aXZlX2Jhbm5lciBzZXRfYmFja2dyb3VuZF9vbl9zaG93XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVwb3J0X3Nob3coKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19