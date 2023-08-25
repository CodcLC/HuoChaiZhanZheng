"use strict";
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