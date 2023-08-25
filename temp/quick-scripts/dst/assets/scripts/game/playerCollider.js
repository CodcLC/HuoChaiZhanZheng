
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/playerCollider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd90ddg5K2ZCTaUAEfzGYdUA', 'playerCollider');
// scripts/game/playerCollider.ts

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
var playerController_1 = require("./playerController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerCollider = /** @class */ (function (_super) {
    __extends(playerCollider, _super);
    function playerCollider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerController = null;
        _this.isFlying = false;
        return _this;
        // 每次将要处理碰撞体接触逻辑时被调用
        // onPreSolve (contact, selfCollider, otherCollider) {
        // }
        // 每次处理完碰撞体接触逻辑时被调用
        // onPostSolve (contact, selfCollider, otherCollider) {
        // }
    }
    playerCollider.prototype.onLoad = function () {
        this.playerController = this.node.getComponent(playerController_1.default);
    };
    // 只在两个碰撞体开始接触时被调用一次
    playerCollider.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
            this.isFlying = false;
            this.playerController.dropToGround();
        }
        else if (other.group == "wall") {
            contact.setFriction(0);
        }
    };
    // 只在两个碰撞体结束接触时被调用一次
    playerCollider.prototype.onEndContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
            this.isFlying = true;
        }
    };
    playerCollider = __decorate([
        ccclass
    ], playerCollider);
    return playerCollider;
}(cc.Component));
exports.default = playerCollider;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxccGxheWVyQ29sbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsdURBQWtEO0FBRTVDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBd0NDO1FBdENHLHNCQUFnQixHQUFrQixJQUFJLENBQUM7UUFFdkMsY0FBUSxHQUFTLEtBQUssQ0FBQzs7UUE2QnZCLG9CQUFvQjtRQUNwQixzREFBc0Q7UUFDdEQsSUFBSTtRQUVKLG1CQUFtQjtRQUNuQix1REFBdUQ7UUFDdkQsSUFBSTtJQUNSLENBQUM7SUFsQ0csK0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxvQkFBb0I7SUFDcEIsdUNBQWMsR0FBZCxVQUFnQixPQUF5QixFQUFDLFlBQStCLEVBQUMsYUFBZ0M7UUFDdEcsSUFBSSxLQUFLLEdBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUM3QixrREFBa0Q7UUFDbEQscUNBQXFDO1FBQ3JDLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBQyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3hDO2FBQUssSUFBRyxLQUFLLENBQUMsS0FBSyxJQUFFLE1BQU0sRUFBQztZQUN6QixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELG9CQUFvQjtJQUNwQixxQ0FBWSxHQUFaLFVBQWMsT0FBeUIsRUFBQyxZQUErQixFQUFDLGFBQWdDO1FBQ3BHLElBQUksS0FBSyxHQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDN0Isa0RBQWtEO1FBQ2xELHFDQUFxQztRQUNyQyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQS9CZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQXdDbEM7SUFBRCxxQkFBQztDQXhDRCxBQXdDQyxDQXhDMkMsRUFBRSxDQUFDLFNBQVMsR0F3Q3ZEO2tCQXhDb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgcGxheWVyQ29udHJvbGxlciBmcm9tIFwiLi9wbGF5ZXJDb250cm9sbGVyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGxheWVyQ29sbGlkZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcGxheWVyQ29udHJvbGxlcjpwbGF5ZXJDb250cm9sbGVyPW51bGw7XG5cbiAgICBpc0ZseWluZzpib29sZWFuPWZhbHNlO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJDb250cm9sbGVyPXRoaXMubm9kZS5nZXRDb21wb25lbnQocGxheWVyQ29udHJvbGxlcik7XG4gICAgfVxuXG4gICAgLy8g5Y+q5Zyo5Lik5Liq56Kw5pKe5L2T5byA5aeL5o6l6Kem5pe26KKr6LCD55So5LiA5qyhXG4gICAgb25CZWdpbkNvbnRhY3QgKGNvbnRhY3Q6Y2MuUGh5c2ljc0NvbnRhY3Qsc2VsZkNvbGxpZGVyOmNjLlBoeXNpY3NDb2xsaWRlcixvdGhlckNvbGxpZGVyOmNjLlBoeXNpY3NDb2xsaWRlcikge1xuICAgICAgICBsZXQgb3RoZXI9b3RoZXJDb2xsaWRlci5ub2RlO1xuICAgICAgICAvLyBsZXQgd29ybGRNYW5pZm9sZCA9IGNvbnRhY3QuZ2V0V29ybGRNYW5pZm9sZCgpO1xuICAgICAgICAvLyBsZXQgbm9ybWFsID0gd29ybGRNYW5pZm9sZC5ub3JtYWw7XG4gICAgICAgIGlmIChvdGhlci5ncm91cCA9PSBcImdyb3VuZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmlzRmx5aW5nPWZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJDb250cm9sbGVyLmRyb3BUb0dyb3VuZCgpO1xuICAgICAgICB9ZWxzZSBpZihvdGhlci5ncm91cD09XCJ3YWxsXCIpe1xuICAgICAgICAgICAgY29udGFjdC5zZXRGcmljdGlvbigwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIOWPquWcqOS4pOS4queisOaSnuS9k+e7k+adn+aOpeinpuaXtuiiq+iwg+eUqOS4gOasoVxuICAgIG9uRW5kQ29udGFjdCAoY29udGFjdDpjYy5QaHlzaWNzQ29udGFjdCxzZWxmQ29sbGlkZXI6Y2MuUGh5c2ljc0NvbGxpZGVyLG90aGVyQ29sbGlkZXI6Y2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlcj1vdGhlckNvbGxpZGVyLm5vZGU7XG4gICAgICAgIC8vIGxldCB3b3JsZE1hbmlmb2xkID0gY29udGFjdC5nZXRXb3JsZE1hbmlmb2xkKCk7XG4gICAgICAgIC8vIGxldCBub3JtYWwgPSB3b3JsZE1hbmlmb2xkLm5vcm1hbDtcbiAgICAgICAgaWYgKG90aGVyLmdyb3VwID09IFwiZ3JvdW5kXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaXNGbHlpbmc9dHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIOavj+asoeWwhuimgeWkhOeQhueisOaSnuS9k+aOpeinpumAu+i+keaXtuiiq+iwg+eUqFxuICAgIC8vIG9uUHJlU29sdmUgKGNvbnRhY3QsIHNlbGZDb2xsaWRlciwgb3RoZXJDb2xsaWRlcikge1xuICAgIC8vIH1cblxuICAgIC8vIOavj+asoeWkhOeQhuWujOeisOaSnuS9k+aOpeinpumAu+i+keaXtuiiq+iwg+eUqFxuICAgIC8vIG9uUG9zdFNvbHZlIChjb250YWN0LCBzZWxmQ29sbGlkZXIsIG90aGVyQ29sbGlkZXIpIHtcbiAgICAvLyB9XG59XG4iXX0=