
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/uiBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '90251wPCgFEt7ps7d8aUEx6', 'uiBase');
// scripts/uiBase.ts

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
exports.bundleName = exports.uiName = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var uiName;
(function (uiName) {
    uiName["choseLevelPanel"] = "choseLevelPanel";
    uiName["losePanel"] = "losePanel";
    uiName["winPanel"] = "winPanel";
    uiName["wuDiPopup"] = "wuDiPopup";
    uiName["fullHpPopup"] = "fullHpPopup";
    uiName["doubleDamagePopup"] = "doubleDamagePopup";
    uiName["pausePanel"] = "pausePanel";
    uiName["upgradePanel"] = "upgradePanel";
    uiName["signInPanel"] = "signPanel";
})(uiName = exports.uiName || (exports.uiName = {}));
var bundleName;
(function (bundleName) {
    bundleName["game"] = "game";
    bundleName["mainUi"] = "mainUi";
    bundleName["sp_enemy"] = "sp_enemy";
    bundleName["sp_others"] = "sp_others";
    bundleName["sp_player"] = "sp_player";
})(bundleName = exports.bundleName || (exports.bundleName = {}));
var uiBase = /** @class */ (function (_super) {
    __extends(uiBase, _super);
    function uiBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    uiBase.prototype.initUi = function () {
        this.node.setContentSize(cc.winSize);
        this.node.children[0].setContentSize(cc.winSize);
    };
    uiBase.prototype.creatBloackInput = function () {
    };
    uiBase = __decorate([
        ccclass
    ], uiBase);
    return uiBase;
}(cc.Component));
exports.default = uiBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcdWlCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxJQUFZLE1BVVg7QUFWRCxXQUFZLE1BQU07SUFDZCw2Q0FBaUMsQ0FBQTtJQUNqQyxpQ0FBcUIsQ0FBQTtJQUNyQiwrQkFBbUIsQ0FBQTtJQUNuQixpQ0FBcUIsQ0FBQTtJQUNyQixxQ0FBeUIsQ0FBQTtJQUN6QixpREFBcUMsQ0FBQTtJQUNyQyxtQ0FBdUIsQ0FBQTtJQUN2Qix1Q0FBMkIsQ0FBQTtJQUMzQixtQ0FBdUIsQ0FBQTtBQUMzQixDQUFDLEVBVlcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBVWpCO0FBQ0QsSUFBWSxVQU1YO0FBTkQsV0FBWSxVQUFVO0lBQ2xCLDJCQUFXLENBQUE7SUFDWCwrQkFBZSxDQUFBO0lBQ2YsbUNBQW1CLENBQUE7SUFDbkIscUNBQXFCLENBQUE7SUFDckIscUNBQXFCLENBQUE7QUFDekIsQ0FBQyxFQU5XLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBTXJCO0FBRUQ7SUFBb0MsMEJBQVk7SUFBaEQ7O0lBVUEsQ0FBQztJQVBHLHVCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsaUNBQWdCLEdBQWhCO0lBRUEsQ0FBQztJQVRnQixNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBVTFCO0lBQUQsYUFBQztDQVZELEFBVUMsQ0FWbUMsRUFBRSxDQUFDLFNBQVMsR0FVL0M7a0JBVm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbmV4cG9ydCBlbnVtIHVpTmFtZXtcbiAgICBjaG9zZUxldmVsUGFuZWw9XCJjaG9zZUxldmVsUGFuZWxcIixcbiAgICBsb3NlUGFuZWw9XCJsb3NlUGFuZWxcIixcbiAgICB3aW5QYW5lbD1cIndpblBhbmVsXCIsXG4gICAgd3VEaVBvcHVwPVwid3VEaVBvcHVwXCIsXG4gICAgZnVsbEhwUG9wdXA9XCJmdWxsSHBQb3B1cFwiLFxuICAgIGRvdWJsZURhbWFnZVBvcHVwPVwiZG91YmxlRGFtYWdlUG9wdXBcIixcbiAgICBwYXVzZVBhbmVsPVwicGF1c2VQYW5lbFwiLFxuICAgIHVwZ3JhZGVQYW5lbD1cInVwZ3JhZGVQYW5lbFwiLFxuICAgIHNpZ25JblBhbmVsPVwic2lnblBhbmVsXCJcbn1cbmV4cG9ydCBlbnVtIGJ1bmRsZU5hbWV7XG4gICAgZ2FtZT1cImdhbWVcIixcbiAgICBtYWluVWk9XCJtYWluVWlcIixcbiAgICBzcF9lbmVteT1cInNwX2VuZW15XCIsXG4gICAgc3Bfb3RoZXJzPVwic3Bfb3RoZXJzXCIsXG4gICAgc3BfcGxheWVyPVwic3BfcGxheWVyXCJcbn1cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB1aUJhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG5cbiAgICBpbml0VWkoKXtcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKGNjLndpblNpemUpO1xuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uc2V0Q29udGVudFNpemUoY2Mud2luU2l6ZSk7XG4gICAgfVxuICAgIGNyZWF0QmxvYWNrSW5wdXQoKXtcbiAgICAgICAgXG4gICAgfVxufVxuIl19