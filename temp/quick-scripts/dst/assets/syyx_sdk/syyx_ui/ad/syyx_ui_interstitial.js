
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_interstitial.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHN5eXhfdWlcXGFkXFxzeXl4X3VpX2ludGVyc3RpdGlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBMkQ7QUFDM0QsNkRBQXNEO0FBQ3RELHFGQUFvRjtBQUNwRix5RUFBd0U7QUFDeEUsOERBQTZEO0FBRTdELG1EQUFrRDtBQUNsRCw2REFBNEQ7QUFHdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Qsd0NBQVk7SUE0QjFEO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBN0JELGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0Isa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsY0FBUSxHQUFhLElBQUksQ0FBQztRQUcxQixhQUFPLEdBQWEsSUFBSSxDQUFDO1FBR3pCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQVV0QixLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTs7SUFDakMsQ0FBQztJQUdELDRDQUFhLEdBQWI7UUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksK0NBQXNCLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUNqRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsMkNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsNkNBQWMsR0FBZDtRQUNJLElBQUksK0NBQXNCLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUM5QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7WUFDbkIsT0FBTTtTQUNUO1FBRUQsSUFBSSxxQkFBcUIsR0FBRywyQkFBWSxDQUFDLG1CQUFtQixFQUFF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QUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzhEQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDTTtJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUNPO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkRBQ1E7SUFyQlQsb0JBQW9CO1FBRHhDLE9BQU87T0FDYSxvQkFBb0IsQ0F3SnhDO0lBQUQsMkJBQUM7Q0F4SkQsQUF3SkMsQ0F4SmlELEVBQUUsQ0FBQyxTQUFTLEdBd0o3RDtrQkF4Sm9CLG9CQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN5eXhfY29uc3QgfSBmcm9tIFwiLi4vLi4vY29uZmlncy9zeXl4X3Nka19jb25maWdcIjtcclxuaW1wb3J0IHsgZV9hZF9pZCB9IGZyb20gXCIuLi8uLi9jb25maWdzL3N5eXhfc2RrX2VudW1cIjtcclxuaW1wb3J0IHsgYWRfbmF0aXZlX2ludGVyc3RpdGlhbCB9IGZyb20gXCIuLi8uLi9jb250cm9sbGVyL2FkL2FkX25hdGl2ZV9pbnRlcnN0aXRpYWxcIjtcclxuaW1wb3J0IHsgc3l5eF9hZHZfbWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb250cm9sbGVyL2FkL3N5eXhfYWR2X21hbmFnZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9tYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXIvc3l5eF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IG5hdGl2ZV9hZF9kYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVsL21vZGVsXCI7XHJcbmltcG9ydCB7IHN5eXhfc2RrX2FwaSB9IGZyb20gXCIuLi8uLi9zeXl4X3Nka19hcGlcIjtcclxuaW1wb3J0IHsgc3l5eF9zZGtfdXRpbHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3l5eF9zZGtfdXRpbHNcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3l5eF91aV9pbnRlcnN0aXRpYWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2FtZV9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGljb25fY2xvc2U6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgbmF0aXZlX2NsaWNrOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYl90aXRsZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxiX2Rlc2M6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgaW1nX2ljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5fY2hlY2s6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiDljp/nlJ/lub/lkYrmlbDmja5cclxuICAgICovXHJcbiAgICBuYXRpdmVfZGF0YTogbmF0aXZlX2FkX2RhdGFcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcblxyXG4gICAgICAgIHRoaXMuc2V0X2JhY2tncm91bmRfb25fc2hvdygpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uX2NsaWNrX2FkdjIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZWFzeV9jbGljayB8fCBhZF9uYXRpdmVfaW50ZXJzdGl0aWFsLmNoZWNrX2lzX2NsaWNrX3dyYXAoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlcG9ydF9jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbl9jbGlja19hZHYoKSB7XHJcbiAgICAgICAgdGhpcy5yZXBvcnRfY2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBvbl9jbGlja19jbG9zZSgpIHtcclxuICAgICAgICBpZiAoYWRfbmF0aXZlX2ludGVyc3RpdGlhbC5jaGVja19pc19jbGlja193cmFwKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXBvcnRfY2xpY2soKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBfYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKF9idXNpbmVzc19jb25maWdfZGF0YSAmJiBfYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfaW5zdGl0aWFsX2NsaWNrX2Nsb3NlX3Byb1wiXSkge1xyXG4gICAgICAgICAgICBsZXQgdHJhcF9wcm8gPSBfYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfaW5zdGl0aWFsX2NsaWNrX2Nsb3NlX3Byb1wiXS52YWx1ZVswXVxyXG4gICAgICAgICAgICBpZiAodHJhcF9wcm8gPj0gMCAmJiBNYXRoLnJhbmRvbSgpIDw9IHRyYXBfcHJvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydF9jbGljaygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOW5v+WRiuiiq+eCueWHu1xyXG4gICAgKi9cclxuICAgIHJlcG9ydF9jbGljaygpIHtcclxuICAgICAgICBpZiAodGhpcy5uYXRpdmVfZGF0YSAmJiB0aGlzLm5hdGl2ZV9kYXRhLmFkUG9zSWQpIHtcclxuICAgICAgICAgICAgc3l5eF9zZGtfYXBpLnNlbmRfb3RoZXJfZXZlbnQoZV9hZF9pZC5uYXRpdmVfaW50ZXJzdGl0aWFsX2hhbGwsIGlnYy5pZ2Nfc3RhdF9pZHMubmF0aXZlX2ludGVyc3RpdGlhbF9jbGljaywgdGhpcy5uYXRpdmVfZGF0YS5uYXRpdmVfdHlwZSlcclxuICAgICAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5yZXBvcnRfYWRfY2xpY2soZV9hZF9pZC5uYXRpdmVfaW50ZXJzdGl0aWFsX2hhbGwsIHRoaXMubmF0aXZlX2RhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlub/lkYrooqvmm53lhYlcclxuICAgICovXHJcbiAgICByZXBvcnRfc2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5uYXRpdmVfZGF0YSAmJiB0aGlzLm5hdGl2ZV9kYXRhLmFkUG9zSWQpIHtcclxuICAgICAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5yZXBvcnRfYWRfc2hvdyhlX2FkX2lkLm5hdGl2ZV9pbnRlcnN0aXRpYWxfaGFsbCwgdGhpcy5uYXRpdmVfZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyhuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgIXRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVfZGF0YSA9IG5hdGl2ZV9kYXRhXHJcbiAgICAgICAgICAgIGxldCBvcmRlciA9IHN5eXhfc2RrX3V0aWxzLmdldF9sYXJnZXN0X3pvcmRlcigpXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQgPSBzeXl4X3Nka191dGlscy5nZXRfc3RhZ2UoKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuekluZGV4ID0gb3JkZXJcclxuICAgICAgICAgICAgdGhpcy5vbl9zaG93KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZWFzeV9jbGlja1xyXG4gICAgb25fc2hvdygpIHtcclxuICAgICAgICB0aGlzLmljb25fY2xvc2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uX2NsaWNrX2Nsb3NlLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuaW1nX2ljb24ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fY2xpY2tfYWR2LCB0aGlzKVxyXG4gICAgICAgIHRoaXMuYnRuX2NoZWNrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19hZHYsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5uYXRpdmVfY2xpY2sub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uX2NsaWNrX2FkdjIsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKClcclxuICAgICAgICBhZF9uYXRpdmVfaW50ZXJzdGl0aWFsLnNob3dfY291bnQrK1xyXG4gICAgICAgIHRoaXMuZWFzeV9jbGljayA9IGZhbHNlXHJcbiAgICAgICAgbGV0IF9idXNpbmVzc19jb25maWdfZGF0YSA9IHN5eXhfbWFuYWdlci5nZXRfYnVzaW5lc3NfY29uZmlnKClcclxuICAgICAgICBpZiAoX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIF9idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pbnN0aXRpYWxfd2hpdGVfZWFzeV9jbGlja1wiXSkge1xyXG4gICAgICAgICAgICBsZXQgZWFzeV9jbGlja19wcm8gPSBfYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfaW5zdGl0aWFsX3doaXRlX2Vhc3lfY2xpY2tcIl0udmFsdWVbMF1cclxuICAgICAgICAgICAgaWYgKGVhc3lfY2xpY2tfcHJvID4gMCAmJiBNYXRoLnJhbmRvbSgpIDw9IGVhc3lfY2xpY2tfcHJvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVhc3lfY2xpY2sgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBzeXl4X3Nka191dGlscy5zZXRfdGV4dHVyZV91cmwodGhpcy5pbWdfaWNvbiwgdGhpcy5uYXRpdmVfZGF0YS5pbWdVcmxMaXN0KVxyXG4gICAgICAgIHRoaXMubGJfdGl0bGUuc3RyaW5nID0gdGhpcy5uYXRpdmVfZGF0YS50aXRsZSArIFwiXCJcclxuICAgICAgICB0aGlzLmxiX2Rlc2Muc3RyaW5nID0gdGhpcy5uYXRpdmVfZGF0YS5kZXNjICsgXCJcIlxyXG4gICAgICAgIHRoaXMucmVwb3J0X3Nob3coKVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKVxyXG4gICAgICAgICAgICB0aGlzLm9uX2hpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25faGlkZSgpIHtcclxuICAgICAgICB0aGlzLmljb25fY2xvc2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19jbG9zZSwgdGhpcylcclxuICAgICAgICB0aGlzLmltZ19pY29uLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19hZHYsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5idG5fY2hlY2sub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19hZHYsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5uYXRpdmVfY2xpY2sub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19hZHYyLCB0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIHNldF9kZWZhdWx0X3BvcyhzdHlsZSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzZXRfc3R5bGVfcG9zKHgsIHkpIHtcclxuICAgICAgICB4ID4gLTEwMDAwICYmICh0aGlzLmdhbWVfbm9kZS54ID0geClcclxuICAgICAgICB5ID4gLTEwMDAwICYmICh0aGlzLmdhbWVfbm9kZS55ID0geSlcclxuICAgIH1cclxuXHJcbiAgICBzZXRfYmFja2dyb3VuZF9vbl9zaG93KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS5od19xZykge1xyXG4gICAgICAgICAgICAvL+WQjuWPsOWIsOWJjeWPsFxyXG4gICAgICAgICAgICBzeXl4X3Nka19hcGkub25fc2hvdyhcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZiAmJiBjYy5pc1ZhbGlkKHNlbGYubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBuYXRpdmVfaW50ZXJzdGl0aWFsIHNldF9iYWNrZ3JvdW5kX29uX3Nob3dcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXBvcnRfc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==