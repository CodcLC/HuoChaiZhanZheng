
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_native_icon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHN5eXhfdWlcXGFkXFxzeXl4X3VpX25hdGl2ZV9pY29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtEQUF3RDtBQUN4RCxpRUFBMkQ7QUFDM0QsOERBQTZEO0FBRTdELG1EQUFrRDtBQUNsRCw2REFBNEQ7QUFDNUQseUVBQXdFO0FBRWxFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWlELHVDQUFZO0lBZ0J6RDtRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQWpCRCxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBVXZCLEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFBOztJQUNqQyxDQUFDO0lBRUQsMENBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsNENBQWMsR0FBZDtRQUNJLElBQUkscUJBQXFCLEdBQUcsMkJBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO1FBQzlELElBQUkscUJBQXFCLElBQUkscUJBQXFCLENBQUMsc0JBQXNCLENBQUMsRUFBRTtZQUN4RSxJQUFJLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLElBQUk7WUFDMUUsSUFBSSxRQUFRLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxtQkFBbUI7Z0JBQ2pFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTthQUN0QjtTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7TUFFRTtJQUNGLDBDQUFZ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OzJEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NERBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5REFDTztJQVRWLG1CQUFtQjtRQUR2QyxPQUFPO09BQ2EsbUJBQW1CLENBeUl2QztJQUFELDBCQUFDO0NBeklELEFBeUlDLENBeklnRCxFQUFFLENBQUMsU0FBUyxHQXlJNUQ7a0JBeklvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlX2FkX2lkIH0gZnJvbSAnLi8uLi8uLi9jb25maWdzL3N5eXhfc2RrX2VudW0nO1xyXG5pbXBvcnQgeyBzeXl4X2NvbnN0IH0gZnJvbSBcIi4uLy4uL2NvbmZpZ3Mvc3l5eF9zZGtfY29uZmlnXCI7XHJcbmltcG9ydCB7IHN5eXhfbWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb250cm9sbGVyL3N5eXhfbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBuYXRpdmVfYWRfZGF0YSB9IGZyb20gXCIuLi8uLi9tb2RlbC9tb2RlbFwiO1xyXG5pbXBvcnQgeyBzeXl4X3Nka19hcGkgfSBmcm9tIFwiLi4vLi4vc3l5eF9zZGtfYXBpXCI7XHJcbmltcG9ydCB7IHN5eXhfc2RrX3V0aWxzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3N5eXhfc2RrX3V0aWxzXCI7XHJcbmltcG9ydCB7IHN5eXhfYWR2X21hbmFnZXIgfSBmcm9tICcuLi8uLi9jb250cm9sbGVyL2FkL3N5eXhfYWR2X21hbmFnZXInO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN5eXhfdWlfbmF0aXZlX2ljb24gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgaWNvbl9jbG9zZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBuYXRpdmVfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIGltZ19pY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55Sf5bm/5ZGK5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIG5hdGl2ZV9kYXRhOiBuYXRpdmVfYWRfZGF0YVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKClcclxuXHJcbiAgICAgICAgdGhpcy5zZXRfYmFja2dyb3VuZF9vbl9zaG93KClcclxuICAgIH1cclxuXHJcbiAgICBvbl9jbGlja19hZHYoKSB7XHJcbiAgICAgICAgdGhpcy5yZXBvcnRfY2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBvbl9jbGlja19jbG9zZSgpIHtcclxuICAgICAgICBsZXQgX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGlmIChfYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2ljb25fdHJhcF9wcm9cIl0pIHtcclxuICAgICAgICAgICAgbGV0IHRyYXBfcHJvID0gX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2ljb25fdHJhcF9wcm9cIl0udmFsdWVbMF0gLy8gMFxyXG4gICAgICAgICAgICBpZiAodHJhcF9wcm8gPj0gMCAmJiBNYXRoLnJhbmRvbSgpIDw9IHRyYXBfcHJvKSB7IC8vIHRyYXBfcHJv5Li6MO+8jOS4jea7oei2s+adoeS7tlxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRfY2xpY2soKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlub/lkYrooqvngrnlh7tcclxuICAgICovXHJcbiAgICByZXBvcnRfY2xpY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5yZXBvcnRfYWRfY2xpY2soZV9hZF9pZC5uYXRpdmVfaWNvbiwgdGhpcy5uYXRpdmVfZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOW5v+WRiuiiq+abneWFiVxyXG4gICAgKi9cclxuICAgIHJlcG9ydF9zaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgIHN5eXhfYWR2X21hbmFnZXIucmVwb3J0X2FkX3Nob3coZV9hZF9pZC5uYXRpdmVfaWNvbiwgdGhpcy5uYXRpdmVfZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyhwYXJlbnQsIG5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSAmJiAhdGhpcy5ub2RlLnBhcmVudCAmJiBwYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVfZGF0YSA9IG5hdGl2ZV9kYXRhXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQgPSBwYXJlbnRcclxuICAgICAgICAgICAgdGhpcy5vbl9zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDkuIrmiqXngrnlh7vlkI4gIOmHjeaWsOaLieWPluWOn+eUn+aVsOaNruWIt+aWsOeVjOmdolxyXG4gICAgKi9cclxuICAgIHJlcG9ydF9jbGlja191cGRhdGVfdmlldyhuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZV9kYXRhID0gbmF0aXZlX2RhdGFcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25fc2hvdygpIHtcclxuICAgICAgICB0aGlzLmljb25fY2xvc2Uub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uX2NsaWNrX2Nsb3NlLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuaW1nX2ljb24ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25fY2xpY2tfYWR2LCB0aGlzKVxyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBzeXl4X3Nka191dGlscy5zZXRfdGV4dHVyZV91cmwodGhpcy5pbWdfaWNvbiwgdGhpcy5uYXRpdmVfZGF0YS5pbWdVcmxMaXN0LCB0aGlzLmhpZGUuYmluZCh0aGlzKSlcclxuICAgICAgICB0aGlzLnJlcG9ydF9zaG93KClcclxuICAgICAgICB0aGlzLnBsYXlfaWNvbl9hbmltYXRpb24oKVxyXG4gICAgfVxyXG5cclxuICAgIGljb25fYW5pXHJcbiAgICBwcml2YXRlIHBsYXlfaWNvbl9hbmltYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wX2ljb25fYW5pbWF0aW9uKClcclxuICAgICAgICB0aGlzLm5hdGl2ZV9ub2RlLnJvdGF0aW9uID0gMFxyXG4gICAgICAgIGxldCBtb3ZlMSA9IGNjLnJvdGF0ZVRvKDAuMiwgLTUpXHJcbiAgICAgICAgbGV0IG1vdmUyID0gY2Mucm90YXRlVG8oMC40LCA1KVxyXG4gICAgICAgIGxldCBtb3ZlMyA9IGNjLnJvdGF0ZVRvKDAuMiwgMClcclxuICAgICAgICB0aGlzLmljb25fYW5pID0gdGhpcy5uYXRpdmVfbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UobW92ZTEsIG1vdmUyLCBtb3ZlMykpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc3RvcF9pY29uX2FuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5pY29uX2FuaSkge1xyXG4gICAgICAgICAgICB0aGlzLm5hdGl2ZV9ub2RlLnN0b3BBY3Rpb24odGhpcy5pY29uX2FuaSlcclxuICAgICAgICAgICAgdGhpcy5pY29uX2FuaSA9IG51bGxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzLm5vZGUpXHJcbiAgICAgICAgICAgIHRoaXMub25faGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbl9oaWRlKCkge1xyXG4gICAgICAgIHRoaXMuaWNvbl9jbG9zZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uX2NsaWNrX2Nsb3NlLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuaW1nX2ljb24ubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uX2NsaWNrX2FkdiwgdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBzZXRfZGVmYXVsdF9wb3Moc3R5bGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2V0X3N0eWxlX3Bvcyh4LCB5KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldF9iYWNrZ3JvdW5kX29uX3Nob3coKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLmh3X3FnKSB7XHJcbiAgICAgICAgICAgIC8v5ZCO5Y+w5Yiw5YmN5Y+wXHJcbiAgICAgICAgICAgIHN5eXhfc2RrX2FwaS5vbl9zaG93KFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmICYmIGNjLmlzVmFsaWQoc2VsZi5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIG5hdGl2ZV9pY29uIHNldF9iYWNrZ3JvdW5kX29uX3Nob3dcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZXBvcnRfc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==