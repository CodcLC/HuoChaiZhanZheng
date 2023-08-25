
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_inner_interstitial.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHN5eXhfdWlcXGFkXFxzeXl4X3VpX2lubmVyX2ludGVyc3RpdGlhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpRUFBMkQ7QUFDM0QsNkRBQXlFO0FBQ3pFLGlHQUFnRztBQUNoRyx5RUFBd0U7QUFDeEUsOERBQTZEO0FBRTdELG1EQUFrRDtBQUNsRCw2REFBNEQ7QUFFdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0QsOENBQVk7SUE2QmhFO1FBQUEsWUFDSSxpQkFBTyxTQUdWO1FBOUJELGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsYUFBTyxHQUFhLElBQUksQ0FBQztRQUd6QixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBTzNCLFVBQVU7UUFDVixnQkFBVSxHQUFhLFNBQVMsQ0FBQTtRQVM1QixLQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTs7SUFDakMsQ0FBQztJQUVELGlEQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7SUFFdkIsQ0FBQztJQUVELG1EQUFjLEdBQWQ7UUFDSSxJQUFJLHFCQUFxQixHQUFHLDJCQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUM5RCxJQUFJLHFCQUFxQixJQUFJLHFCQUFxQixDQUFDLHdDQUF3QyxDQUFDLEVBQUU7WUFDMUYsSUFBSSxRQUFRLEdBQUcscUJBQXFCLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxJQUFJO1lBQzVGLElBQUksUUFBUSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksUUFBUSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7YUFDdEI7U0FDSjtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQ7O01BRUU7SUFDRixpREFBWSxHQUFaO1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3BDLDJCQUFZLENBQUMsZUFBZSxDQUFDLHVCQUFPLENBQUMsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUMsV0FBVztZQUNyRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7WUFDN0QsY0FBYztTQUNqQjthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1RUFBdUUsQ0FBQyxDQUFBO1NBQ3ZGO0lBQ0wsQ0FBQztJQUVEOztNQUVFO0lBQ0YsZ0RBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixtQ0FBZ0IsQ0FBQyxjQUFjLENBQUMsdUJBQU8sQ0FBQyxpQ0FBaUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQyxjQUFjO1NBQzlHO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHNFQUFzRSxDQUFDLENBQUE7U0FDdEY7SUFDTCxDQUFDO0lBRUQseUNBQUksR0FBSixVQUFLLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBcUIsRUFBRSxTQUFvQixFQUFFLFNBQW9CLEVBQUUsV0FBcUI7UUFDOUcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7WUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksU0FBUyxDQUFBO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQTtZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxTQUFTLENBQUE7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1lBQ3pCLDhCQUE4QjtZQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRUQ7O01BRUU7SUFDRiw2REFBd0IsR0FBeEIsVUFBeUIsV0FBVztRQUNoQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUE7WUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2pCO0lBQ0wsQ0FBQztJQUVELDRDQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDM0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsMkRBQTRCLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDekMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDdEMsQ0FBQztJQUVELDRDQUFPLEdBQVA7UUFDSSwrQkFBYyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDaEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO1FBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNoRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVELHlDQUFJLEdBQUo7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN2QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRUQsNENBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQzNFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUU1RSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUN0QyxDQUFDO0lBRUQsb0RBQWUsR0FBZixVQUFnQixLQUFLO0lBRXJCLENBQUM7SUFFRCxrREFBYSxHQUFiLFVBQWMsQ0FBQyxFQUFFLENBQUM7SUFFbEIsQ0FBQztJQUVELDJEQUFzQixHQUF0QjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNmLElBQUksNEJBQVUsQ0FBQyxnQkFBZ0IsS0FBSyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtZQUMxRCxPQUFPO1lBQ1AsMkJBQVksQ0FBQyxPQUFPLENBQ2hCO2dCQUNJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLDJEQUEyRCxDQUFDLENBQUE7b0JBQ3hFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtpQkFDckI7WUFDTCxDQUFDLENBQ0osQ0FBQTtTQUNKO0lBQ0wsQ0FBQztJQWpKRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tFQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bUVBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnRUFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytEQUNNO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0VBQ087SUFmViwwQkFBMEI7UUFEOUMsT0FBTztPQUNhLDBCQUEwQixDQXNKOUM7SUFBRCxpQ0FBQztDQXRKRCxBQXNKQyxDQXRKdUQsRUFBRSxDQUFDLFNBQVMsR0FzSm5FO2tCQXRKb0IsMEJBQTBCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3l5eF9jb25zdCB9IGZyb20gXCIuLi8uLi9jb25maWdzL3N5eXhfc2RrX2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBlX2FkX2lkLCBlX2FkX25hdGl2ZV9zdGF0ZSB9IGZyb20gXCIuLi8uLi9jb25maWdzL3N5eXhfc2RrX2VudW1cIjtcclxuaW1wb3J0IHsgYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCB9IGZyb20gXCIuLi8uLi9jb250cm9sbGVyL2FkL2FkX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxcIjtcclxuaW1wb3J0IHsgc3l5eF9hZHZfbWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb250cm9sbGVyL2FkL3N5eXhfYWR2X21hbmFnZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9tYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXIvc3l5eF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IG5hdGl2ZV9hZF9kYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVsL21vZGVsXCI7XHJcbmltcG9ydCB7IHN5eXhfc2RrX2FwaSB9IGZyb20gXCIuLi8uLi9zeXl4X3Nka19hcGlcIjtcclxuaW1wb3J0IHsgc3l5eF9zZGtfdXRpbHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3l5eF9zZGtfdXRpbHNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzeXl4X3VpX2lubmVyX2ludGVyc3RpdGlhbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpY29uX2Nsb3NlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIG5hdGl2ZV9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYl90aXRsZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxiX2Rlc2M6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgaW1nX2ljb246IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDljp/nlJ/lub/lkYrmlbDmja5cclxuICAgICAqL1xyXG4gICAgbmF0aXZlX2RhdGE6IG5hdGl2ZV9hZF9kYXRhXHJcblxyXG4gICAgLy/ngrnlh7vnu5Pnrpfljp/nlJ/lm57osINcclxuICAgIGNsaWNrX2JhY2s6IEZ1bmN0aW9uID0gdW5kZWZpbmVkXHJcbiAgICAvL+e7k+eul+WOn+eUn+aYvuekuuWbnuiwg1xyXG4gICAgc2hvd19iYWNrXHJcbiAgICAvL+e7k+eul+WOn+eUn+makOiXj+Wbnuiwg1xyXG4gICAgaGlkZV9iYWNrXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG5cclxuICAgICAgICB0aGlzLnNldF9iYWNrZ3JvdW5kX29uX3Nob3coKVxyXG4gICAgfVxyXG5cclxuICAgIG9uX2NsaWNrX2FkdigpIHtcclxuICAgICAgICB0aGlzLnJlcG9ydF9jbGljaygpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uX2NsaWNrX2Nsb3NlKCkge1xyXG4gICAgICAgIGxldCBfYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKF9idXNpbmVzc19jb25maWdfZGF0YSAmJiBfYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfaW5uZXJfaW5zdGl0aWFsX2NsaWNrX2Nsb3NlX3Byb1wiXSkge1xyXG4gICAgICAgICAgICBsZXQgdHJhcF9wcm8gPSBfYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfaW5uZXJfaW5zdGl0aWFsX2NsaWNrX2Nsb3NlX3Byb1wiXS52YWx1ZVswXSAvLyAwXHJcbiAgICAgICAgICAgIGlmICh0cmFwX3BybyA+PSAwICYmIE1hdGgucmFuZG9tKCkgPD0gdHJhcF9wcm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0X2NsaWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5bm/5ZGK6KKr54K55Ye7XHJcbiAgICAqL1xyXG4gICAgcmVwb3J0X2NsaWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tfYmFjayAmJiB0aGlzLmNsaWNrX2JhY2soKVxyXG4gICAgICAgICAgICBzeXl4X21hbmFnZXIucmVwb3J0X2FkX2NsaWNrKGVfYWRfaWQubmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbF9zdWNjZXNzLCB0aGlzLm5hdGl2ZV9kYXRhKSAvLyAxMDMwMjAwMVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGhhcyBjbGlja2VkIG5hdGl2ZSBpbm5lciBpbnRlcnN0aXRpYWxcIilcclxuICAgICAgICAgICAgLy8gdGhpcy5oaWRlKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHN5eXhfdWlfaW5uZXJfaW50ZXJzdGl0aWFsIHJlcG9ydF9jbGljayBuYXRpdmVfZGF0YSBpcyBudWxsIVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5bm/5ZGK6KKr5pud5YWJXHJcbiAgICAqL1xyXG4gICAgcmVwb3J0X3Nob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5yZXBvcnRfYWRfc2hvdyhlX2FkX2lkLm5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxfc3VjY2VzcywgdGhpcy5uYXRpdmVfZGF0YSkgLy8gLy8gMTAzMDIwMDFcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHN5eXhfdWlfaW5uZXJfaW50ZXJzdGl0aWFsIHJlcG9ydF9zaG93IG5hdGl2ZV9kYXRhIGlzIG51bGwhXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3cocGFyZW50LCBuYXRpdmVfZGF0YSwgY2xpY2tfYmFjaz86IEZ1bmN0aW9uLCBzaG93X2JhY2s/OiBGdW5jdGlvbiwgaGlkZV9iYWNrPzogRnVuY3Rpb24sIGlzX25ld190eXBlPzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgIXRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVfZGF0YSA9IG5hdGl2ZV9kYXRhXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd19iYWNrID0gc2hvd19iYWNrIHx8IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB0aGlzLmhpZGVfYmFjayA9IGhpZGVfYmFjayB8fCB1bmRlZmluZWRcclxuICAgICAgICAgICAgdGhpcy5jbGlja19iYWNrID0gY2xpY2tfYmFjayB8fCB1bmRlZmluZWRcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IHBhcmVudFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWbnuiwg+Wbnuiwg+OAguOAguOAguOAguOAguOAguOAguOAglwiKVxyXG4gICAgICAgICAgICB0aGlzLm9uX3Nob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOS4iuaKpeeCueWHu+WQjiAg6YeN5paw5ouJ5Y+W5Y6f55Sf5pWw5o2u5Yi35paw55WM6Z2iXHJcbiAgICAqL1xyXG4gICAgcmVwb3J0X2NsaWNrX3VwZGF0ZV92aWV3KG5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlX2RhdGEgPSBuYXRpdmVfZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbl9zaG93KCkge1xyXG4gICAgICAgIHRoaXMuaWNvbl9jbG9zZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fY2xpY2tfY2xvc2UsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5pbWdfaWNvbi5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19hZHYsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKClcclxuICAgICAgICBhZF9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsLnNob3dfY291bnQrK1xyXG4gICAgICAgIHRoaXMuc2hvd19iYWNrICYmIHRoaXMuc2hvd19iYWNrKClcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIHN5eXhfc2RrX3V0aWxzLnNldF90ZXh0dXJlX3VybCh0aGlzLmltZ19pY29uLCB0aGlzLm5hdGl2ZV9kYXRhLmltZ1VybExpc3QsIHRoaXMuaGlkZS5iaW5kKHRoaXMpKVxyXG4gICAgICAgIHRoaXMubGJfdGl0bGUuc3RyaW5nID0gdGhpcy5uYXRpdmVfZGF0YS50aXRsZSArIFwiXCJcclxuICAgICAgICB0aGlzLmxiX2Rlc2Muc3RyaW5nID0gdGhpcy5uYXRpdmVfZGF0YS5kZXNjICsgXCJcIlxyXG4gICAgICAgIHRoaXMucmVwb3J0X3Nob3coKVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKVxyXG4gICAgICAgICAgICB0aGlzLm9uX2hpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25faGlkZSgpIHtcclxuICAgICAgICB0aGlzLmljb25fY2xvc2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19jbG9zZSwgdGhpcylcclxuICAgICAgICB0aGlzLmltZ19pY29uLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19hZHYsIHRoaXMpXHJcblxyXG4gICAgICAgIHRoaXMuaGlkZV9iYWNrICYmIHRoaXMuaGlkZV9iYWNrKClcclxuICAgIH1cclxuXHJcbiAgICBzZXRfZGVmYXVsdF9wb3Moc3R5bGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0X3N0eWxlX3Bvcyh4LCB5KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldF9iYWNrZ3JvdW5kX29uX3Nob3coKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLmh3X3FnKSB7XHJcbiAgICAgICAgICAgIC8v5ZCO5Y+w5Yiw5YmN5Y+wXHJcbiAgICAgICAgICAgIHN5eXhfc2RrX2FwaS5vbl9zaG93KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmICYmIGNjLmlzVmFsaWQoc2VsZi5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIG5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwgc2V0X2JhY2tncm91bmRfb25fc2hvd1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlcG9ydF9zaG93KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==