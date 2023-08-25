"use strict";
cc._RF.push(module, '00109Rju3VNg4Bj/UdWdnXd', 'ui-base');
// framework/script/ui-base.ts

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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIBase = /** @class */ (function (_super) {
    __extends(UIBase, _super);
    function UIBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 设置UI根节点
     * @param node
     */
    UIBase.prototype._setRootNode = function (node) {
        this._rootNode = node;
    };
    /**
     * 设置是否激活UI
     * @param active 是否激活
     */
    UIBase.prototype._setActive = function (active) {
        this._rootNode.active = active;
    };
    /**
     * 设置UI名称
     * @param name UI名称
     */
    UIBase.prototype._setUIName = function (name) {
        this._uiName = name;
    };
    /**
     * 获得UI名称
     */
    UIBase.prototype.getUIName = function () {
        return this._uiName;
    };
    /**
     * 设置所属画布节点
     * @param canvas - 画布节点
     */
    UIBase.prototype._setCanvas = function (canvas) {
        this._canvas = canvas;
    };
    /**
     * 获得画布节点
     */
    UIBase.prototype.getCanvas = function () {
        return this._canvas;
    };
    /**
     * 设置节点索引
     * @param zIndex
     */
    UIBase.prototype._setSiblingIndex = function (zIndex) {
        this._zIndex = zIndex;
        this.node.setSiblingIndex(zIndex);
    };
    /**
     * 获取节点索引
     * @returns number
     */
    UIBase.prototype.getSiblingIndex = function () {
        return this._zIndex;
    };
    /**
     * 监听层级变化
     */
    UIBase.prototype.onIndexChange = function (z_index) {
    };
    /**
     * UI已加载回调，你可以在这里自定义一些动画或者做一些适配操作
     */
    UIBase.prototype.onUICreate = function () {
    };
    /**
     * UI释放
     */
    UIBase.prototype.onUIRelease = function () {
    };
    /**
     * UI启动回调
     * @param args - 打开参数
     */
    UIBase.prototype.onUILaunch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    /**
     * UI关闭回调
     */
    UIBase.prototype.onUIClose = function () {
    };
    UIBase = __decorate([
        ccclass
    ], UIBase);
    return UIBase;
}(cc.Component));
exports.default = UIBase;

cc._RF.pop();