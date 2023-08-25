
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/syyx_cc_ui_manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bb705sFh0pOW7QLeqXqVo9W', 'syyx_cc_ui_manager');
// syyx_sdk/controller/syyx_cc_ui_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syyx_cc_ui_manager = void 0;
var model_1 = require("../model/model");
var syyx_sdk_enum_1 = require("../configs/syyx_sdk_enum");
var syyx_manager_1 = require("./syyx_manager");
var syyx_sdk_utils_1 = require("../utils/syyx_sdk_utils");
var syyx_ui_banner_1 = require("../syyx_ui/ad/syyx_ui_banner");
var syyx_ui_interstitial_1 = require("../syyx_ui/ad/syyx_ui_interstitial");
var syyx_ui_inner_interstitial_1 = require("../syyx_ui/ad/syyx_ui_inner_interstitial");
var syyx_ui_native_icon_1 = require("../syyx_ui/ad/syyx_ui_native_icon");
var syyx_ui_toast_1 = require("../syyx_ui/ad/syyx_ui_toast");
var syyx_ui_ctr_1 = require("../syyx_ui/ctr_test/syyx_ui_ctr");
var syyx_cc_ui_manager = /** @class */ (function () {
    function syyx_cc_ui_manager() {
    }
    syyx_cc_ui_manager.load_ui_prefabs = function (view_type, call_back) {
        var self = this;
        var view = this._prefab_view[view_type];
        if (view && view.node) {
            call_back && call_back(this._prefab_view[view_type]);
            return;
        }
        var config = syyx_manager_1.syyx_manager._ui_prefab_config;
        var view_path = this.get_prefab_path(view_type);
        if (view_path) {
            if (!this._load_call_back_list[view_type]) {
                this._load_call_back_list[view_type] = [];
            }
            this._load_call_back_list[view_type].push(call_back);
            if (this._prefab_loading_state[view_type]) {
                console.log("igc----- syyx_cc_ui_manager prefab is loading , please wait", view_path);
                return;
            }
            this._prefab_loading_state[view_type] = true;
            syyx_sdk_utils_1.syyx_sdk_utils.load_resource(view_path, function (prefab) {
                self._prefab_loading_state[view_type] = false;
                var prefab1 = cc.instantiate(prefab);
                var view1 = prefab1.getComponent(self.get_prefab_class(view_type));
                self._prefab_view[view_type] = view1;
                if (config && config[view_type].cocos_auto_scale) {
                    syyx_sdk_utils_1.syyx_sdk_utils.set_default_scale(view1);
                }
                for (var i in self._load_call_back_list[view_type]) {
                    //顺序执行call_bcak回调
                    self._load_call_back_list[view_type][i] && self._load_call_back_list[view_type][i](view1);
                }
                self._load_call_back_list[view_type] = [];
                console.log("igc----- syyx_cc_ui_manmager load prefab", view_path);
            }, self, function () {
                self._prefab_loading_state[view_type] = false;
                console.log("igc----- syyx_cc_ui_manmager load prefab failed!!", view_path);
                self._load_call_back_list[view_type] = [];
            });
        }
    };
    /**
    * 根据viewType获取path
    * @param viewType
    */
    syyx_cc_ui_manager.get_prefab_path = function (view_type) {
        switch (view_type) {
            case model_1.syyx_view.native_banner:
                return syyx_sdk_enum_1.syyx_prefab_path.native_banner;
            case model_1.syyx_view.interstitial:
                if (cc.view.getVisibleSize().height > cc.view.getVisibleSize().width) {
                    return syyx_sdk_enum_1.syyx_prefab_path.interstitial;
                }
                else {
                    return syyx_sdk_enum_1.syyx_prefab_path.interstitial_h;
                }
            case model_1.syyx_view.inner_interstitial:
                return syyx_sdk_enum_1.syyx_prefab_path.inner_interstitial;
            case model_1.syyx_view.inner_interstitial_bn:
                return syyx_sdk_enum_1.syyx_prefab_path.inner_interstitial_bn;
            case model_1.syyx_view.native_icon:
                return syyx_sdk_enum_1.syyx_prefab_path.native_icon;
            case model_1.syyx_view.toast:
                return syyx_sdk_enum_1.syyx_prefab_path.toast;
            case model_1.syyx_view.ctr_test:
                if (cc.view.getVisibleSize().height > cc.view.getVisibleSize().width) {
                    return syyx_sdk_enum_1.syyx_prefab_path.ctr_test;
                }
                else {
                    return syyx_sdk_enum_1.syyx_prefab_path.ctr_test_h;
                }
            default:
                console.log("igc-----get_prefab_path fail", view_type);
                return undefined;
        }
    };
    /**
    * 根据viewType获取path
    * @param viewType
    */
    syyx_cc_ui_manager.get_prefab_class = function (view_type) {
        switch (view_type) {
            case model_1.syyx_view.native_banner:
                return syyx_ui_banner_1.default;
            case model_1.syyx_view.interstitial:
                return syyx_ui_interstitial_1.default;
            case model_1.syyx_view.inner_interstitial:
                return syyx_ui_inner_interstitial_1.default;
            case model_1.syyx_view.inner_interstitial_bn:
                return syyx_ui_inner_interstitial_1.default;
            case model_1.syyx_view.native_icon:
                return syyx_ui_native_icon_1.default;
            case model_1.syyx_view.toast:
                return syyx_ui_toast_1.default;
            case model_1.syyx_view.ctr_test:
                return syyx_ui_ctr_1.default;
            default:
                console.log("igc-----get_prefab_path fail", view_type);
                return undefined;
        }
    };
    syyx_cc_ui_manager._prefab_view = {};
    syyx_cc_ui_manager._prefab_loading_state = {};
    syyx_cc_ui_manager._load_call_back_list = {};
    return syyx_cc_ui_manager;
}());
exports.syyx_cc_ui_manager = syyx_cc_ui_manager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXHN5eXhfY2NfdWlfbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsMERBQTREO0FBQzVELCtDQUE4QztBQUM5QywwREFBeUQ7QUFDekQsK0RBQTBEO0FBQzFELDJFQUFzRTtBQUN0RSx1RkFBa0Y7QUFDbEYseUVBQW9FO0FBQ3BFLDZEQUF3RDtBQUN4RCwrREFBMEQ7QUFHMUQ7SUFBQTtJQXVIQSxDQUFDO0lBL0dVLGtDQUFlLEdBQXRCLFVBQXVCLFNBQVMsRUFBRSxTQUFTO1FBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtRQUVmLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdkMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNuQixTQUFTLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtZQUNwRCxPQUFNO1NBQ1Q7UUFFRCxJQUFJLE1BQU0sR0FBRywyQkFBWSxDQUFDLGlCQUFpQixDQUFBO1FBRTNDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDL0MsSUFBSSxTQUFTLEVBQUU7WUFFWCxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFBO2FBQzVDO1lBQ0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUVwRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2REFBNkQs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QUNILE9BQU8sZ0NBQWdCLENBQUMsVUFBVSxDQUFBO2lCQUNyQztZQUNMO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sU0FBUyxDQUFBO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVEOzs7TUFHRTtJQUNLLG1DQUFnQixHQUF2QixVQUF3QixTQUFTO1FBQzdCLFFBQVEsU0FBUyxFQUFFO1lBQ2YsS0FBSyxpQkFBUyxDQUFDLGFBQWE7Z0JBQ3hCLE9BQU8sd0JBQWMsQ0FBQTtZQUN6QixLQUFLLGlCQUFTLENBQUMsWUFBWTtnQkFDdkIsT0FBTyw4QkFBb0IsQ0FBQTtZQUMvQixLQUFLLGlCQUFTLENBQUMsa0JBQWtCO2dCQUM3QixPQUFPLG9DQUEwQixDQUFBO1lBQ2pDLEtBQUssaUJBQVMsQ0FBQyxxQkFBcUI7Z0JBQ2hDLE9BQU8sb0NBQTBCLENBQUE7WUFDekMsS0FBSyxpQkFBUyxDQUFDLFdBQVc7Z0JBQ3RCLE9BQU8sNkJBQW1CLENBQUE7WUFDOUIsS0FBSyxpQkFBUyxDQUFDLEtBQUs7Z0JBQ2hCLE9BQU8sdUJBQWEsQ0FBQTtZQUN4QixLQUFLLGlCQUFTLENBQUMsUUFBUTtnQkFDbkIsT0FBTyxxQkFBVyxDQUFBO1lBQ3RCO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sU0FBUyxDQUFBO1NBQ3ZCO0lBQ0wsQ0FBQztJQW5ITSwrQkFBWSxHQUFHLEVBQUUsQ0FBQTtJQUVqQix3Q0FBcUIsR0FBRyxFQUFFLENBQUE7SUFFMUIsdUNBQW9CLEdBQUcsRUFBRSxDQUFBO0lBaUhwQyx5QkFBQztDQXZIRCxBQXVIQyxJQUFBO0FBdkhZLGdEQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN5eXhfdmlldyB9IGZyb20gXCIuLi9tb2RlbC9tb2RlbFwiO1xyXG5pbXBvcnQgeyBzeXl4X3ByZWZhYl9wYXRoIH0gZnJvbSBcIi4uL2NvbmZpZ3Mvc3l5eF9zZGtfZW51bVwiO1xyXG5pbXBvcnQgeyBzeXl4X21hbmFnZXIgfSBmcm9tIFwiLi9zeXl4X21hbmFnZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9zZGtfdXRpbHMgfSBmcm9tIFwiLi4vdXRpbHMvc3l5eF9zZGtfdXRpbHNcIjtcclxuaW1wb3J0IHN5eXhfdWlfYmFubmVyIGZyb20gXCIuLi9zeXl4X3VpL2FkL3N5eXhfdWlfYmFubmVyXCI7XHJcbmltcG9ydCBzeXl4X3VpX2ludGVyc3RpdGlhbCBmcm9tIFwiLi4vc3l5eF91aS9hZC9zeXl4X3VpX2ludGVyc3RpdGlhbFwiO1xyXG5pbXBvcnQgc3l5eF91aV9pbm5lcl9pbnRlcnN0aXRpYWwgZnJvbSBcIi4uL3N5eXhfdWkvYWQvc3l5eF91aV9pbm5lcl9pbnRlcnN0aXRpYWxcIjtcclxuaW1wb3J0IHN5eXhfdWlfbmF0aXZlX2ljb24gZnJvbSBcIi4uL3N5eXhfdWkvYWQvc3l5eF91aV9uYXRpdmVfaWNvblwiO1xyXG5pbXBvcnQgc3l5eF91aV90b2FzdCBmcm9tIFwiLi4vc3l5eF91aS9hZC9zeXl4X3VpX3RvYXN0XCI7XHJcbmltcG9ydCBzeXl4X3VpX2N0ciBmcm9tIFwiLi4vc3l5eF91aS9jdHJfdGVzdC9zeXl4X3VpX2N0clwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBzeXl4X2NjX3VpX21hbmFnZXIge1xyXG5cclxuICAgIHN0YXRpYyBfcHJlZmFiX3ZpZXcgPSB7fVxyXG5cclxuICAgIHN0YXRpYyBfcHJlZmFiX2xvYWRpbmdfc3RhdGUgPSB7fVxyXG5cclxuICAgIHN0YXRpYyBfbG9hZF9jYWxsX2JhY2tfbGlzdCA9IHt9XHJcblxyXG4gICAgc3RhdGljIGxvYWRfdWlfcHJlZmFicyh2aWV3X3R5cGUsIGNhbGxfYmFjaykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG5cclxuICAgICAgICBsZXQgdmlldyA9IHRoaXMuX3ByZWZhYl92aWV3W3ZpZXdfdHlwZV1cclxuICAgICAgICBpZiAodmlldyAmJiB2aWV3Lm5vZGUpIHtcclxuICAgICAgICAgICAgY2FsbF9iYWNrICYmIGNhbGxfYmFjayh0aGlzLl9wcmVmYWJfdmlld1t2aWV3X3R5cGVdKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjb25maWcgPSBzeXl4X21hbmFnZXIuX3VpX3ByZWZhYl9jb25maWdcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdmlld19wYXRoID0gdGhpcy5nZXRfcHJlZmFiX3BhdGgodmlld190eXBlKVxyXG4gICAgICAgIGlmICh2aWV3X3BhdGgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbG9hZF9jYWxsX2JhY2tfbGlzdFt2aWV3X3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkX2NhbGxfYmFja19saXN0W3ZpZXdfdHlwZV0gPSBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWRfY2FsbF9iYWNrX2xpc3Rbdmlld190eXBlXS5wdXNoKGNhbGxfYmFjaylcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcmVmYWJfbG9hZGluZ19zdGF0ZVt2aWV3X3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHN5eXhfY2NfdWlfbWFuYWdlciBwcmVmYWIgaXMgbG9hZGluZyAsIHBsZWFzZSB3YWl0XCIsIHZpZXdfcGF0aClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9wcmVmYWJfbG9hZGluZ19zdGF0ZVt2aWV3X3R5cGVdID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgc3l5eF9zZGtfdXRpbHMubG9hZF9yZXNvdXJjZSh2aWV3X3BhdGgsIGZ1bmN0aW9uIChwcmVmYWIpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuX3ByZWZhYl9sb2FkaW5nX3N0YXRlW3ZpZXdfdHlwZV0gPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgbGV0IHByZWZhYjEgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpXHJcbiAgICAgICAgICAgICAgICBsZXQgdmlldzEgPSBwcmVmYWIxLmdldENvbXBvbmVudChzZWxmLmdldF9wcmVmYWJfY2xhc3Modmlld190eXBlKSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2VsZi5fcHJlZmFiX3ZpZXdbdmlld190eXBlXSA9IHZpZXcxXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWdbdmlld190eXBlXS5jb2Nvc19hdXRvX3NjYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3l5eF9zZGtfdXRpbHMuc2V0X2RlZmF1bHRfc2NhbGUodmlldzEpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBzZWxmLl9sb2FkX2NhbGxfYmFja19saXN0W3ZpZXdfdHlwZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mhuuW6j+aJp+ihjGNhbGxfYmNha+Wbnuiwg1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRfY2FsbF9iYWNrX2xpc3Rbdmlld190eXBlXVtpXSAmJiBzZWxmLl9sb2FkX2NhbGxfYmFja19saXN0W3ZpZXdfdHlwZV1baV0odmlldzEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9sb2FkX2NhbGxfYmFja19saXN0W3ZpZXdfdHlwZV0gPSBbXVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBzeXl4X2NjX3VpX21hbm1hZ2VyIGxvYWQgcHJlZmFiXCIsIHZpZXdfcGF0aClcclxuICAgICAgICAgICAgfSwgc2VsZiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fcHJlZmFiX2xvYWRpbmdfc3RhdGVbdmlld190eXBlXSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHN5eXhfY2NfdWlfbWFubWFnZXIgbG9hZCBwcmVmYWIgZmFpbGVkISFcIiwgdmlld19wYXRoKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5fbG9hZF9jYWxsX2JhY2tfbGlzdFt2aWV3X3R5cGVdID0gW11cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOagueaNrnZpZXdUeXBl6I635Y+WcGF0aFxyXG4gICAgKiBAcGFyYW0gdmlld1R5cGUgXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldF9wcmVmYWJfcGF0aCh2aWV3X3R5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHZpZXdfdHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIHN5eXhfdmlldy5uYXRpdmVfYmFubmVyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN5eXhfcHJlZmFiX3BhdGgubmF0aXZlX2Jhbm5lclxyXG4gICAgICAgICAgICBjYXNlIHN5eXhfdmlldy5pbnRlcnN0aXRpYWw6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCA+IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzeXl4X3ByZWZhYl9wYXRoLmludGVyc3RpdGlhbFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3l5eF9wcmVmYWJfcGF0aC5pbnRlcnN0aXRpYWxfaFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIHN5eXhfdmlldy5pbm5lcl9pbnRlcnN0aXRpYWw6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3l5eF9wcmVmYWJfcGF0aC5pbm5lcl9pbnRlcnN0aXRpYWxcclxuICAgICAgICAgICAgY2FzZSBzeXl4X3ZpZXcuaW5uZXJfaW50ZXJzdGl0aWFsX2JuOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN5eXhfcHJlZmFiX3BhdGguaW5uZXJfaW50ZXJzdGl0aWFsX2JuXHJcbiAgICAgICAgICAgIGNhc2Ugc3l5eF92aWV3Lm5hdGl2ZV9pY29uOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN5eXhfcHJlZmFiX3BhdGgubmF0aXZlX2ljb25cclxuICAgICAgICAgICAgY2FzZSBzeXl4X3ZpZXcudG9hc3Q6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3l5eF9wcmVmYWJfcGF0aC50b2FzdFxyXG4gICAgICAgICAgICBjYXNlIHN5eXhfdmlldy5jdHJfdGVzdDpcclxuICAgICAgICAgICAgICAgIGlmIChjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0ID4gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN5eXhfcHJlZmFiX3BhdGguY3RyX3Rlc3RcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN5eXhfcHJlZmFiX3BhdGguY3RyX3Rlc3RfaFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLWdldF9wcmVmYWJfcGF0aCBmYWlsXCIsIHZpZXdfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmoLnmja52aWV3VHlwZeiOt+WPlnBhdGhcclxuICAgICogQHBhcmFtIHZpZXdUeXBlIFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBnZXRfcHJlZmFiX2NsYXNzKHZpZXdfdHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAodmlld190eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2Ugc3l5eF92aWV3Lm5hdGl2ZV9iYW5uZXI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3l5eF91aV9iYW5uZXJcclxuICAgICAgICAgICAgY2FzZSBzeXl4X3ZpZXcuaW50ZXJzdGl0aWFsOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN5eXhfdWlfaW50ZXJzdGl0aWFsXHJcbiAgICAgICAgICAgIGNhc2Ugc3l5eF92aWV3LmlubmVyX2ludGVyc3RpdGlhbDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBzeXl4X3VpX2lubmVyX2ludGVyc3RpdGlhbFxyXG4gICAgICAgICAgICAgICAgY2FzZSBzeXl4X3ZpZXcuaW5uZXJfaW50ZXJzdGl0aWFsX2JuOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzeXl4X3VpX2lubmVyX2ludGVyc3RpdGlhbFxyXG4gICAgICAgICAgICBjYXNlIHN5eXhfdmlldy5uYXRpdmVfaWNvbjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBzeXl4X3VpX25hdGl2ZV9pY29uXHJcbiAgICAgICAgICAgIGNhc2Ugc3l5eF92aWV3LnRvYXN0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN5eXhfdWlfdG9hc3RcclxuICAgICAgICAgICAgY2FzZSBzeXl4X3ZpZXcuY3RyX3Rlc3Q6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3l5eF91aV9jdHJcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS1nZXRfcHJlZmFiX3BhdGggZmFpbFwiLCB2aWV3X3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=