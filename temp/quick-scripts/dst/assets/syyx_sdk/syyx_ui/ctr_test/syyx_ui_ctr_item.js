
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/syyx_ui/ctr_test/syyx_ui_ctr_item.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHN5eXhfdWlcXGN0cl90ZXN0XFxzeXl4X3VpX2N0cl9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUEyRDtBQUkzRCwrRUFBOEU7QUFDOUUsOERBQTZEO0FBRzdELDZEQUE0RDtBQUM1RCxpREFBd0Q7QUFHbEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQVk7SUFpQ3REO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBaENELGVBQVMsR0FBYyxJQUFJLENBQUM7UUFHNUIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBRzNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUVsQixXQUFLLEdBQUcsU0FBUyxDQUFBO1FBQ2pCLGdCQUFVLEdBQUcsU0FBUyxDQUFBO1FBQ3RCLFNBQUcsR0FBRyxTQUFTLENBQUE7O0lBSXZCLENBQUM7eUJBbkNnQixnQkFBZ0I7SUFxQ2pDLG1DQUFRLEdBQVI7UUFFSSxJQUFJLG1DQUFnQixDQUFDLDJCQUEyQixFQUFFLEVBQUU7WUFDaEQsT0FBTTtTQUNUO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWCxPQUFNO1NBQ1Q7UUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFFZixJQUFJLFFBQVEsR0FBRztZQUNYLFdBQVcsRUFBRSxtQ0FBZ0IsQ0FBQyx1QkFBdUI7WUFDckQsR0FBRyxFQUFFLDJCQUFZLENBQUMsYUFB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QUksQ0FBQzt1REFDUTtJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNRO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt1REFDUTtJQTNCVCxnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQStKcEM7SUFBRCx1QkFBQztDQS9KRCxBQStKQyxDQS9KNkMsRUFBRSxDQUFDLFNBQVMsR0ErSnpEO2tCQS9Kb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3l5eF9jb25zdCB9IGZyb20gXCIuLi8uLi9jb25maWdzL3N5eXhfc2RrX2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBlX2FkX2lkLCBlX3N5eXhfY3RyX2V2ZW50X3R5cGUgfSBmcm9tIFwiLi4vLi4vY29uZmlncy9zeXl4X3Nka19lbnVtXCI7XHJcbmltcG9ydCB7IGFkX25hdGl2ZV9pbnRlcnN0aXRpYWwgfSBmcm9tIFwiLi4vLi4vY29udHJvbGxlci9hZC9hZF9uYXRpdmVfaW50ZXJzdGl0aWFsXCI7XHJcbmltcG9ydCB7IHN5eXhfYWR2X21hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29udHJvbGxlci9hZC9zeXl4X2Fkdl9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHN5eXhfY3RyX21hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29udHJvbGxlci9jdHJfdGVzdC9zeXl4X2N0cl9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHN5eXhfbWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb250cm9sbGVyL3N5eXhfbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBuYXRpdmVfYWRfZGF0YSB9IGZyb20gXCIuLi8uLi9tb2RlbC9tb2RlbFwiO1xyXG5pbXBvcnQgeyBzeXl4X3Nka19hcGkgfSBmcm9tIFwiLi4vLi4vc3l5eF9zZGtfYXBpXCI7XHJcbmltcG9ydCB7IHN5eXhfc2RrX3V0aWxzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3N5eXhfc2RrX3V0aWxzXCI7XHJcbmltcG9ydCB7IHN5eXhfYXBpX3JlcXVlc3QgfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3l5eF9hcGlcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3l5eF91aV9jdHJfaXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIGdhbWVfaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBnYW1lX25hbWU6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHJld2FyZF9pY29uOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICByZXdhcmROdW06IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxhYmVsX2JnMTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsYWJlbF9iZzI6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbGFiZWxfYmczOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGxhYmVsX2JnNDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBsYWJlbF9iZzU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaW5kZXggPSB1bmRlZmluZWRcclxuICAgIHByaXZhdGUgY2xpY2tfYmFjayA9IHVuZGVmaW5lZFxyXG4gICAgcHJpdmF0ZSBhcHAgPSB1bmRlZmluZWRcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcblxyXG4gICAgb25fY2xpY2soKSB7XHJcblxyXG4gICAgICAgIGlmIChzeXl4X2N0cl9tYW5hZ2VyLmNoZWNrX2lzX2N0cl90ZXN0X2NvbXBlbGV0ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcblxyXG4gICAgICAgIGxldCBkb3RfZGF0YSA9IHsgLy8g5omT54K55Y+C5pWwXHJcbiAgICAgICAgICAgIGxvY2F0aW9uX2lkOiBzeXl4X2N0cl9tYW5hZ2VyLm5ld19wcm9kdWN0X2xvY2F0aW9uX2lkLFxyXG4gICAgICAgICAgICB1aWQ6IHN5eXhfbWFuYWdlci5sb2dpbl91c2VyX2lkLFxyXG4gICAgICAgICAgICBjb25maWdfaWQ6IHNlbGYuYXBwLmdjX2lkLCBcclxuICAgICAgICAgICAgaWNvbl9pZDogc2VsZi5hcHAuaWNvbmlkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5eXhfdWlfY3RyX2l0ZW0uY2xpY2tfbmF2aWdhdGlvbl9kb3QoJ0FkdmVydGlzaW5nQ2xpY2snLCBkb3RfZGF0YSlcclxuXHJcbiAgICAgICAgLy8gLy8g54K55Ye75LqGaWNvbu+8jOi3s+i9rOa4uOaIj1xyXG4gICAgICAgIGlmICh3aW5kb3dbJ3FnJ10gJiYgKHdpbmRvd1sncWcnXS5nZXRTeXN0ZW1JbmZvU3luYygpLnBsYXRmb3JtVmVyc2lvbkNvZGUgPj0gMTA1MCkgJiYgd2luZG93WydxZyddLm5hdmlnYXRlVG9NaW5pR2FtZSkge1xyXG4gICAgICAgICAgICB3aW5kb3dbJ3FnJ10ubmF2aWdhdGVUb01pbmlHYW1lKHtcclxuICAgICAgICAgICAgICAgIHBrZ05hbWU6IHRoaXMuYXBwLnBhY2thZ2UsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHsgLy8g6Lez6L2s5oiQ5Yqf5omT54K5XHJcbiAgICAgICAgICAgICAgICAgICAgc3l5eF91aV9jdHJfaXRlbS5jbGlja19uYXZpZ2F0aW9uX2RvdCgnQWR2ZXJ0aXNpbmdKdW1wJywgZG90X2RhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlcykpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmV3YXJkX251bSA9IHN5eXhfY3RyX21hbmFnZXIuZ2V0X25ld19wcm9kdWN0c19yZXdhcmQoKVxyXG4gICAgICAgIGlmIChyZXdhcmRfbnVtICE9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmRfaWNvbi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkTnVtLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnJld2FyZE51bS5zdHJpbmcgPSBzeXl4X2N0cl9tYW5hZ2VyLmdldF9uZXdfcHJvZHVjdHNfcmV3YXJkKCkgKyBcIlwiIC8vIDEwMFxyXG4gICAgICAgICAgICB0aGlzLnJld2FyZF9pY29uLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJ6dWFuc2hpeGlhb3NoaVwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbGlja19iYWNrICYmIHRoaXMuY2xpY2tfYmFjaygpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjbGlja19uYXZpZ2F0aW9uX2RvdCh0eXBlLCBwYXJhbXMpIHtcclxuICAgICAgICBsZXQgcmVxRCA9IHtcclxuICAgICAgICAgICAgbG9nX3R5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBhcmFtcylcclxuICAgICAgICB9XHJcbiAgICAgICAgc3l5eF9hcGlfcmVxdWVzdC5hcGlQb3N0KCdkYV9kb3QnLCBzeXl4X2NvbnN0Lmd1b2Jhb19kYV9kb3RfdXJsLCByZXFELCAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZygn6Lez6L2s5omT54K55Zue6LCD57uT5p6cLS0+JywgcmVzKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaChpbmRleCwgZGF0YSwgY2xpY2tfYmFjaz8pIHtcclxuXHJcbiAgICAgICAgdGhpcy5hcHAgPSBkYXRhXHJcblxyXG4gICAgICAgIGlmICghdGhpcy5hcHApIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fY2xpY2ssIHRoaXMpXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGljaywgdGhpcylcclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbF9iZzEuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmxhYmVsX2JnMi5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMubGFiZWxfYmczLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5sYWJlbF9iZzQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmxhYmVsX2JnNS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5nYW1lX2ljb24ubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5yZXdhcmRfaWNvbi5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMucmV3YXJkTnVtLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgc3l5eF9zZGtfdXRpbHMuc2V0X3RleHR1cmVfdXJsKHRoaXMuZ2FtZV9pY29uLCB0aGlzLmFwcC5pY29uKVxyXG4gICAgICAgIHRoaXMuZ2FtZV9uYW1lLnN0cmluZyA9IHRoaXMuYXBwLm5hbWU7XHJcbiAgICAgICAgLy8gdGhpcy5nYW1lX25hbWUuc3RyaW5nID0gJ+a1i+ivleWQjeWtlyc7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4XHJcbiAgICAgICAgdGhpcy5jbGlja19iYWNrID0gY2xpY2tfYmFja1xyXG4gICAgICAgIHRoaXMuc2V0X2xhYmVsX2JnX3NraW4oaW5kZXgpXHJcblxyXG4gICAgICAgIGxldCBkb3RfZGF0YSA9IHsgLy8g5omT54K55Y+C5pWwXHJcbiAgICAgICAgICAgIGxvY2F0aW9uX2lkOiBzeXl4X2N0cl9tYW5hZ2VyLm5ld19wcm9kdWN0X2xvY2F0aW9uX2lkLFxyXG4gICAgICAgICAgICB1aWQ6IHN5eXhfbWFuYWdlci5sb2dpbl91c2VyX2lkLFxyXG4gICAgICAgICAgICBjb25maWdfaWQ6IHRoaXMuYXBwLmdjX2lkLCBcclxuICAgICAgICAgICAgaWNvbl9pZDogdGhpcy5hcHAuaWNvbmlkXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzeXl4X3VpX2N0cl9pdGVtLmNsaWNrX25hdmlnYXRpb25fZG90KCdBZHZlcnRpc2luZ0V4cG9zdXJlJywgZG90X2RhdGEpIC8vIOabneWFieaJk+eCuVxyXG4gICAgfVxyXG5cclxuICAgIHNldF9sYWJlbF9iZ19za2luKGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9iZzUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfYmc0LmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2JnMy5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9iZzIuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxfYmcxLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsX2JnMi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbF9iZzUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=