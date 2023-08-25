
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_toast.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1331aW+1BxN97IWTXDMeSk3', 'syyx_ui_toast');
// syyx_sdk/syyx_ui/ad/syyx_ui_toast.ts

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
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var syyx_ui_toast = /** @class */ (function (_super) {
    __extends(syyx_ui_toast, _super);
    function syyx_ui_toast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.tips_box = null;
        return _this;
    }
    syyx_ui_toast.prototype.show = function (desc) {
        if (this.node && !this.node.parent) {
            var order = syyx_sdk_utils_1.syyx_sdk_utils.get_largest_zorder();
            this.node.parent = syyx_sdk_utils_1.syyx_sdk_utils.get_stage();
            this.node.zIndex = order;
            this.on_show(desc);
        }
    };
    syyx_ui_toast.prototype.on_hide = function () {
    };
    syyx_ui_toast.prototype.on_show = function (desc) {
        this.show_tips(desc);
    };
    syyx_ui_toast.prototype.show_tips = function (desc) {
        var self = this;
        this.label.string = desc;
        this.tips_tween = null;
        this.tips_tween = cc.moveBy(1.5, cc.v2(0, 150)).easing(cc.easeSineIn());
        var call_back = cc.callFunc(function () {
            if (cc.isValid(self)) {
                self.hide();
            }
        });
        this.tips_box.runAction(cc.sequence(this.tips_tween, call_back));
    };
    /**
     * 应用默认的位置
     */
    syyx_ui_toast.prototype.set_default_pos = function () {
    };
    syyx_ui_toast.prototype.set_style_pos = function (x, y) {
    };
    /**
    * 移除，并回收
    */
    syyx_ui_toast.prototype.hide = function () {
        if (this.node && this.node.parent) {
            this.tips_box.y = 0;
            this.node.parent.removeChild(this.node);
            this.on_hide();
        }
    };
    __decorate([
        property(cc.Label)
    ], syyx_ui_toast.prototype, "label", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_toast.prototype, "tips_box", void 0);
    syyx_ui_toast = __decorate([
        ccclass
    ], syyx_ui_toast);
    return syyx_ui_toast;
}(cc.Component));
exports.default = syyx_ui_toast;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHN5eXhfdWlcXGFkXFxzeXl4X3VpX3RvYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZEQUE0RDtBQUd0RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQXNEQztRQW5ERyxXQUFLLEdBQWEsSUFBSSxDQUFDO1FBRXZCLGNBQVEsR0FBWSxJQUFJLENBQUM7O0lBaUQ3QixDQUFDO0lBaERHLDRCQUFJLEdBQUosVUFBSyxJQUFJO1FBQ0wsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEMsSUFBSSxLQUFLLEdBQUcsK0JBQWMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO1lBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLCtCQUFjLENBQUMsU0FBUyxFQUFFLENBQUE7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDckI7SUFDTCxDQUFDO0lBQ0QsK0JBQU8sR0FBUDtJQUVBLENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsSUFBSTtRQUNSLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVELGlDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFDdkUsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUN4QixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTthQUNkO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0lBQ0Q7O09BRUc7SUFDTyx1Q0FBZSxHQUF6QjtJQUVBLENBQUM7SUFFUyxxQ0FBYSxHQUF2QixVQUF3QixDQUFDLEVBQUUsQ0FBQztJQUU1QixDQUFDO0lBQ0Q7O01BRUU7SUFDRiw0QkFBSSxHQUFKO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNqQjtJQUNMLENBQUM7SUFsREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDSTtJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNPO0lBTFIsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXNEakM7SUFBRCxvQkFBQztDQXRERCxBQXNEQyxDQXREMEMsRUFBRSxDQUFDLFNBQVMsR0FzRHREO2tCQXREb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN5eXhfc2RrX3V0aWxzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3N5eXhfc2RrX3V0aWxzXCI7XHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN5eXhfdWlfdG9hc3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHRpcHNfYm94OiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHNob3coZGVzYykge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgIXRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IG9yZGVyID0gc3l5eF9zZGtfdXRpbHMuZ2V0X2xhcmdlc3Rfem9yZGVyKClcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IHN5eXhfc2RrX3V0aWxzLmdldF9zdGFnZSgpXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSBvcmRlclxyXG4gICAgICAgICAgICB0aGlzLm9uX3Nob3coZGVzYylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbl9oaWRlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbl9zaG93KGRlc2MpIHtcclxuICAgICAgICB0aGlzLnNob3dfdGlwcyhkZXNjKVxyXG4gICAgfVxyXG4gICAgdGlwc190d2VlblxyXG4gICAgc2hvd190aXBzKGRlc2MpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IGRlc2NcclxuICAgICAgICB0aGlzLnRpcHNfdHdlZW4gPSBudWxsXHJcbiAgICAgICAgdGhpcy50aXBzX3R3ZWVuID0gY2MubW92ZUJ5KDEuNSwgY2MudjIoMCwgMTUwKSkuZWFzaW5nKGNjLmVhc2VTaW5lSW4oKSlcclxuICAgICAgICBsZXQgY2FsbF9iYWNrID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChzZWxmKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5oaWRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy50aXBzX2JveC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UodGhpcy50aXBzX3R3ZWVuLCBjYWxsX2JhY2spKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlupTnlKjpu5jorqTnmoTkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldF9kZWZhdWx0X3BvcygpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNldF9zdHlsZV9wb3MoeCwgeSkge1xyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDnp7vpmaTvvIzlubblm57mlLZcclxuICAgICovXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpcHNfYm94LnkgPSAwXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKVxyXG4gICAgICAgICAgICB0aGlzLm9uX2hpZGUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=