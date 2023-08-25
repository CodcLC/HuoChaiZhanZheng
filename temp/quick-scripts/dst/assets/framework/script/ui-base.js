
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/script/ui-base.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxzY3JpcHRcXHVpLWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDNUUsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBb0MsMEJBQVk7SUFBaEQ7O0lBdUdBLENBQUM7SUF0Rkc7OztPQUdHO0lBQ0gsNkJBQVksR0FBWixVQUFhLElBQWE7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUNEOzs7T0FHRztJQUNILDJCQUFVLEdBQVYsVUFBVyxNQUFlO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsMkJBQVUsR0FBVixVQUFXLElBQVk7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsMEJBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsMkJBQVUsR0FBVixVQUFXLE1BQWU7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsMEJBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsaUNBQWdCLEdBQWhCLFVBQWlCLE1BQWM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNEOzs7T0FHRztJQUNILGdDQUFlLEdBQWY7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUNEOztPQUVHO0lBQ0gsOEJBQWEsR0FBYixVQUFjLE9BQWU7SUFFN0IsQ0FBQztJQUNEOztPQUVHO0lBQ0gsMkJBQVUsR0FBVjtJQUVBLENBQUM7SUFDRDs7T0FFRztJQUNILDRCQUFXLEdBQVg7SUFFQSxDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsMkJBQVUsR0FBVjtRQUFXLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQseUJBQWM7O0lBRXpCLENBQUM7SUFDRDs7T0FFRztJQUNILDBCQUFTLEdBQVQ7SUFFQSxDQUFDO0lBdEdnQixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBdUcxQjtJQUFELGFBQUM7Q0F2R0QsQUF1R0MsQ0F2R21DLEVBQUUsQ0FBQyxTQUFTLEdBdUcvQztrQkF2R29CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUJhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIOaJgOWxnueUu+W4g+iKgueCuVxuICAgICAqL1xuICAgIF9jYW52YXM6IGNjLk5vZGU7XG4gICAgLyoqXG4gICAgICog5qC56IqC54K5XG4gICAgICovXG4gICAgX3Jvb3ROb2RlOiBjYy5Ob2RlO1xuICAgIC8qKlxuICAgICAqIFVJ5ZCN56ewXG4gICAgICovXG4gICAgX3VpTmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIOiKgueCuee0ouW8lVxuICAgICAqL1xuICAgIF96SW5kZXg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiDorr7nva5VSeagueiKgueCuVxuICAgICAqIEBwYXJhbSBub2RlIFxuICAgICAqL1xuICAgIF9zZXRSb290Tm9kZShub2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIHRoaXMuX3Jvb3ROb2RlID0gbm9kZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u5piv5ZCm5r+A5rS7VUlcbiAgICAgKiBAcGFyYW0gYWN0aXZlIOaYr+WQpua/gOa0u1xuICAgICAqL1xuICAgIF9zZXRBY3RpdmUoYWN0aXZlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Jvb3ROb2RlLmFjdGl2ZSA9IGFjdGl2ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572uVUnlkI3np7BcbiAgICAgKiBAcGFyYW0gbmFtZSBVSeWQjeensFxuICAgICAqL1xuICAgIF9zZXRVSU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX3VpTmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+W+l1VJ5ZCN56ewXG4gICAgICovXG4gICAgZ2V0VUlOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl91aU5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9ruaJgOWxnueUu+W4g+iKgueCuVxuICAgICAqIEBwYXJhbSBjYW52YXMgLSDnlLvluIPoioLngrlcbiAgICAgKi9cbiAgICBfc2V0Q2FudmFzKGNhbnZhczogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+W+l+eUu+W4g+iKgueCuVxuICAgICAqL1xuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572u6IqC54K557Si5byVXG4gICAgICogQHBhcmFtIHpJbmRleCBcbiAgICAgKi9cbiAgICBfc2V0U2libGluZ0luZGV4KHpJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3pJbmRleCA9IHpJbmRleDtcbiAgICAgICAgdGhpcy5ub2RlLnNldFNpYmxpbmdJbmRleCh6SW5kZXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5boioLngrnntKLlvJVcbiAgICAgKiBAcmV0dXJucyBudW1iZXJcbiAgICAgKi9cbiAgICBnZXRTaWJsaW5nSW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl96SW5kZXg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOebkeWQrOWxgue6p+WPmOWMllxuICAgICAqL1xuICAgIG9uSW5kZXhDaGFuZ2Uoel9pbmRleDogbnVtYmVyKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogVUnlt7LliqDovb3lm57osIPvvIzkvaDlj6/ku6XlnKjov5nph4zoh6rlrprkuYnkuIDkupvliqjnlLvmiJbogIXlgZrkuIDkupvpgILphY3mk43kvZxcbiAgICAgKi9cbiAgICBvblVJQ3JlYXRlKCkge1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVJ6YeK5pS+XG4gICAgICovXG4gICAgb25VSVJlbGVhc2UoKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogVUnlkK/liqjlm57osINcbiAgICAgKiBAcGFyYW0gYXJncyAtIOaJk+W8gOWPguaVsFxuICAgICAqL1xuICAgIG9uVUlMYXVuY2goLi4uYXJnczogYW55W10pIHtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVSeWFs+mXreWbnuiwg1xuICAgICAqL1xuICAgIG9uVUlDbG9zZSgpIHtcblxuICAgIH1cbn1cbiJdfQ==