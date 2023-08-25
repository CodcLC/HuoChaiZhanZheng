
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/test.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f474aiUe1xDU6HX6eyIf4h3', 'test');
// scripts/test.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var test = /** @class */ (function (_super) {
    __extends(test, _super);
    function test() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    test.prototype.start = function () {
    };
    test.prototype.update = function () {
    };
    test.prototype.newfunction = function () { };
    ;
    test.prototype.newfunction2 = function () { };
    ;
    test.prototype.testFunction = function () { };
    ;
    test = __decorate([
        ccclass
    ], test);
    return test;
}(cc.Component));
exports.default = test;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUs1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFrQyx3QkFBWTtJQUE5Qzs7SUFnQkEsQ0FBQztJQVpHLG9CQUFLLEdBQUw7SUFDQSxDQUFDO0lBRUQscUJBQU0sR0FBTjtJQUVBLENBQUM7SUFJRCwwQkFBVyxHQUFYLGNBQWMsQ0FBQztJQUFBLENBQUM7SUFDaEIsMkJBQVksR0FBWixjQUFlLENBQUM7SUFBQSxDQUFDO0lBQ2pCLDJCQUFZLEdBQVosY0FBZSxDQUFDO0lBQUEsQ0FBQztJQWZBLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FnQnhCO0lBQUQsV0FBQztDQWhCRCxBQWdCQyxDQWhCaUMsRUFBRSxDQUFDLFNBQVMsR0FnQjdDO2tCQWhCb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBhZCB9IGZyb20gXCIuL3Nkay9hZFwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuL3Nkay9kYXRhXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGVzdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuXG4gICAgc3RhcnQgKCkge1xuICAgIH1cblxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBcbiAgICB9XG5cblxuICAgIFxuICAgIG5ld2Z1bmN0aW9uKCl7fTtcbiAgICBuZXdmdW5jdGlvbjIoKXt9O1xuICAgIHRlc3RGdW5jdGlvbigpe307XG59XG4iXX0=