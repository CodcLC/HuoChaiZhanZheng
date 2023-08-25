"use strict";
cc._RF.push(module, 'f2419yo42VJQZHYc6P9a6sW', 'syyx_ui_ctr_item');
// syyx_sdk/syyx_ui/ctr_test/syyx_ui_ctr_item.ts

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
var syyx_ctr_manager_1 = require("../../controller/ctr_test/syyx_ctr_manager");
var syyx_manager_1 = require("../../controller/syyx_manager");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var syyx_api_1 = require("../../utils/syyx_api");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var syyx_ui_ctr_item = /** @class */ (function (_super) {
    __extends(syyx_ui_ctr_item, _super);
    function syyx_ui_ctr_item() {
        var _this = _super.call(this) || this;
        _this.game_icon = null;
        _this.game_name = null;
        _this.reward_icon = null;
        _this.rewardNum = null;
        _this.label_bg1 = null;
        _this.label_bg2 = null;
        _this.label_bg3 = null;
        _this.label_bg4 = null;
        _this.label_bg5 = null;
        _this.index = undefined;
        _this.click_back = undefined;
        _this.app = undefined;
        return _this;
    }
    syyx_ui_ctr_item_1 = syyx_ui_ctr_item;
    syyx_ui_ctr_item.prototype.on_click = function () {
        if (syyx_ctr_manager_1.syyx_ctr_manager.check_is_ctr_test_compelete()) {
            return;
        }
        if (!this.app) {
            return;
        }
        var self = this;
        var dot_data = {
            location_id: syyx_ctr_manager_1.syyx_ctr_manager.new_product_location_id,
            uid: syyx_manager_1.syyx_manager.login_user_id,
            config_id: self.app.gc_id,
            icon_id: self.app.iconid
        };
        syyx_ui_ctr_item_1.click_navigation_dot('AdvertisingClick', dot_data);
        // // 点击了icon，跳转游戏
        if (window['qg'] && (window['qg'].getSystemInfoSync().platformVersionCode >= 1050) && window['qg'].navigateToMiniGame) {
            window['qg'].navigateToMiniGame({
                pkgName: this.app.package,
                success: function () {
                    syyx_ui_ctr_item_1.click_navigation_dot('AdvertisingJump', dot_data);
                },
                fail: function (res) {
                    console.log(JSON.stringify(res));
                }
            });
        }
        var reward_num = syyx_ctr_manager_1.syyx_ctr_manager.get_new_products_reward();
        if (reward_num != 0) {
            this.reward_icon.active = true;
            this.rewardNum.node.active = true;
            this.rewardNum.string = syyx_ctr_manager_1.syyx_ctr_manager.get_new_products_reward() + ""; // 100
            this.reward_icon.getComponent(cc.Animation).play("zuanshixiaoshi");
        }
        this.click_back && this.click_back();
    };
    syyx_ui_ctr_item.click_navigation_dot = function (type, params) {
        var reqD = {
            log_type: type,
            data: JSON.stringify(params)
        };
        syyx_api_1.syyx_api_request.apiPost('da_dot', syyx_sdk_config_1.syyx_const.guobao_da_dot_url, reqD, function (res) {
            console.log('跳转打点回调结果-->', res);
        });
    };
    syyx_ui_ctr_item.prototype.refresh = function (index, data, click_back) {
        this.app = data;
        if (!this.app) {
            this.node.active = false;
            return;
        }
        this.node.off(cc.Node.EventType.TOUCH_END, this.on_click, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_click, this);
        this.label_bg1.active = false;
        this.label_bg2.active = false;
        this.label_bg3.active = false;
        this.label_bg4.active = false;
        this.label_bg5.active = false;
        this.node.active = true;
        this.game_icon.node.active = true;
        this.reward_icon.active = false;
        this.rewardNum.node.active = false;
        syyx_sdk_utils_1.syyx_sdk_utils.set_texture_url(this.game_icon, this.app.icon);
        this.game_name.string = this.app.name;
        // this.game_name.string = '测试名字';
        this.index = index;
        this.click_back = click_back;
        this.set_label_bg_skin(index);
        var dot_data = {
            location_id: syyx_ctr_manager_1.syyx_ctr_manager.new_product_location_id,
            uid: syyx_manager_1.syyx_manager.login_user_id,
            config_id: this.app.gc_id,
            icon_id: this.app.iconid
        };
        syyx_ui_ctr_item_1.click_navigation_dot('AdvertisingExposure', dot_data); // 曝光打点
    };
    syyx_ui_ctr_item.prototype.set_label_bg_skin = function (index) {
        if (index != null) {
            switch (index) {
                case 0:
                case 3:
                    this.label_bg5.active = true;
                    break;
                case 1:
                    this.label_bg4.active = true;
                    break;
                case 2:
                    this.label_bg3.active = true;
                    break;
                case 4:
                    this.label_bg2.active = true;
                    break;
                case 5:
                    this.label_bg1.active = true;
                    break;
                case 6:
                    this.label_bg2.active = true;
                    break;
                case 7:
                    this.label_bg5.active = true;
                    break;
            }
        }
    };
    var syyx_ui_ctr_item_1;
    __decorate([
        property(cc.Sprite)
    ], syyx_ui_ctr_item.prototype, "game_icon", void 0);
    __decorate([
        property(cc.Label)
    ], syyx_ui_ctr_item.prototype, "game_name", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr_item.prototype, "reward_icon", void 0);
    __decorate([
        property(cc.Label)
    ], syyx_ui_ctr_item.prototype, "rewardNum", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr_item.prototype, "label_bg1", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr_item.prototype, "label_bg2", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr_item.prototype, "label_bg3", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr_item.prototype, "label_bg4", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr_item.prototype, "label_bg5", void 0);
    syyx_ui_ctr_item = syyx_ui_ctr_item_1 = __decorate([
        ccclass
    ], syyx_ui_ctr_item);
    return syyx_ui_ctr_item;
}(cc.Component));
exports.default = syyx_ui_ctr_item;

cc._RF.pop();