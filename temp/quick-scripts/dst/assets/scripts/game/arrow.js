
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/arrow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ed69cR0Xx9JtLNKx4qGNDOH', 'arrow');
// scripts/game/arrow.ts

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
var caijiTools_1 = require("../caijiTools");
var playerController_1 = require("./playerController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var arrow = /** @class */ (function (_super) {
    __extends(arrow, _super);
    function arrow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.force = 1800;
        _this.speedX = 0;
        _this.speedY = { num: 0 };
        _this.damage = 0;
        _this.a = 0;
        _this.enemy = null;
        _this.isHit = false;
        _this.isTweenEnd = false;
        _this.rigibody = null;
        _this.time = 0;
        _this.playerPosition = null;
        return _this;
    }
    arrow.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
    };
    arrow.prototype.start = function () {
        var _this = this;
        var direct = caijiTools_1.caijiTools.getDirection(this.node.angle + 90).normalizeSelf();
        this.speedX = direct.x * this.force;
        this.speedY.num = direct.y * this.force;
        this.time = Math.abs(this.playerPosition.x - this.node.x) / Math.abs(this.speedX);
        this.time = this.time < 0.15 ? this.time - 0.06 : this.time - 0.09;
        this.a = this.speedY.num * 2 / this.time; //v1=v0-at
        cc.tween(this.speedY)
            .to(this.time, { num: -this.speedY.num })
            .call(function () {
            _this.isTweenEnd = true;
        })
            .start();
    };
    arrow.prototype.update = function (dt) {
        if (this.isHit)
            return;
        if (this.isTweenEnd) {
            this.speedY.num -= this.a * dt * 0.9;
        }
        this.rigibody.linearVelocity = cc.v2(this.speedX, this.speedY.num);
        var linearVelocity = this.rigibody.linearVelocity;
        var angle = caijiTools_1.caijiTools.getAngleDependY(linearVelocity.x, linearVelocity.y);
        this.node.angle = -angle - 90;
    };
    arrow.prototype.onCollisionEnter = function (other, self) {
        if (other.node.group == "player") {
            if (this.isHit)
                return;
            this.isHit = true;
            other.node.getComponent(playerController_1.default).beHit(this.enemy, this.damage);
        }
    };
    arrow.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var _this = this;
        var other = otherCollider.node;
        if (other.group == "ground") {
            this.isHit = true;
            this.Destroy();
            this.rigibody.linearVelocity = cc.v2(this.rigibody.linearVelocity.x * 0.3, this.rigibody.linearVelocity.y * 0.3);
            this.scheduleOnce(function () {
                _this.rigibody.linearVelocity = cc.v2(0, 0);
                _this.rigibody.type = cc.RigidBodyType.Static;
            }, 0);
        }
    };
    arrow.prototype.Destroy = function () {
        var _this = this;
        this.scheduleOnce(function () {
            cc.tween(_this.node)
                .to(0.3, { opacity: 0 })
                .call(function () {
                _this.node.destroy();
            })
                .start();
        }, 1);
    };
    arrow = __decorate([
        ccclass
    ], arrow);
    return arrow;
}(cc.Component));
exports.default = arrow;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcYXJyb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNENBQTJDO0FBQzNDLHVEQUFrRDtBQUU1QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtQyx5QkFBWTtJQUEvQztRQUFBLHFFQXVFQztRQXJFRyxXQUFLLEdBQVEsSUFBSSxDQUFDO1FBQ2xCLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsWUFBTSxHQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxDQUFDO1FBQ2YsWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixPQUFDLEdBQVEsQ0FBQyxDQUFDO1FBQ1gsV0FBSyxHQUFTLElBQUksQ0FBQztRQUNuQixXQUFLLEdBQVMsS0FBSyxDQUFDO1FBQ3BCLGdCQUFVLEdBQVMsS0FBSyxDQUFDO1FBQ3pCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFDM0IsVUFBSSxHQUFRLENBQUMsQ0FBQztRQUNkLG9CQUFjLEdBQVMsSUFBSSxDQUFDOztJQTJEaEMsQ0FBQztJQXpERyxzQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNELHFCQUFLLEdBQUw7UUFBQSxpQkFjQztRQWJHLElBQUksTUFBTSxHQUFDLHVCQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxNQUFN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UUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLEtBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUMvQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDUjtJQUNMLENBQUM7SUFDRCx1QkFBTyxHQUFQO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNsQixFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDO2lCQUNuQixJQUFJLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUM7aUJBQ0QsS0FBSyxFQUFFLENBQUM7UUFDYixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBdEVnQixLQUFLO1FBRHpCLE9BQU87T0FDYSxLQUFLLENBdUV6QjtJQUFELFlBQUM7Q0F2RUQsQUF1RUMsQ0F2RWtDLEVBQUUsQ0FBQyxTQUFTLEdBdUU5QztrQkF2RW9CLEtBQUsiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgcGxheWVyQ29udHJvbGxlciBmcm9tIFwiLi9wbGF5ZXJDb250cm9sbGVyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYXJyb3cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgZm9yY2U6bnVtYmVyPTE4MDA7XG4gICAgc3BlZWRYOm51bWJlcj0wO1xuICAgIHNwZWVkWT17bnVtOjB9O1xuICAgIGRhbWFnZTpudW1iZXI9MDtcbiAgICBhOm51bWJlcj0wO1xuICAgIGVuZW15OmNjLk5vZGU9bnVsbDtcbiAgICBpc0hpdDpib29sZWFuPWZhbHNlO1xuICAgIGlzVHdlZW5FbmQ6Ym9vbGVhbj1mYWxzZTtcbiAgICByaWdpYm9keTpjYy5SaWdpZEJvZHk9bnVsbDtcbiAgICB0aW1lOm51bWJlcj0wO1xuICAgIHBsYXllclBvc2l0aW9uOmNjLlZlYzI9bnVsbDtcblxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLnJpZ2lib2R5PXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICB9XG4gICAgc3RhcnQoKXtcbiAgICAgICAgbGV0IGRpcmVjdD1jYWlqaVRvb2xzLmdldERpcmVjdGlvbih0aGlzLm5vZGUuYW5nbGUrOTApLm5vcm1hbGl6ZVNlbGYoKTtcbiAgICAgICAgdGhpcy5zcGVlZFg9ZGlyZWN0LngqdGhpcy5mb3JjZTtcbiAgICAgICAgdGhpcy5zcGVlZFkubnVtPWRpcmVjdC55KnRoaXMuZm9yY2U7XG4gICAgICAgIHRoaXMudGltZT1NYXRoLmFicyh0aGlzLnBsYXllclBvc2l0aW9uLngtdGhpcy5ub2RlLngpL01hdGguYWJzKHRoaXMuc3BlZWRYKTtcbiAgICAgICAgdGhpcy50aW1lPXRoaXMudGltZTwwLjE1P3RoaXMudGltZS0wLjA2OnRoaXMudGltZS0wLjA5O1xuICAgICAgICB0aGlzLmE9dGhpcy5zcGVlZFkubnVtKjIvdGhpcy50aW1lOy8vdjE9djAtYXRcbiAgICAgICAgY2MudHdlZW4odGhpcy5zcGVlZFkpXG4gICAgICAgIC50byh0aGlzLnRpbWUse251bTotdGhpcy5zcGVlZFkubnVtfSlcbiAgICAgICAgLmNhbGwoKCk9PntcbiAgICAgICAgICAgIHRoaXMuaXNUd2VlbkVuZD10cnVlO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcblxuICAgIH1cbiAgICB1cGRhdGUoZHQpe1xuICAgICAgICBpZih0aGlzLmlzSGl0KSByZXR1cm47XG4gICAgICAgIGlmKHRoaXMuaXNUd2VlbkVuZCl7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWS5udW0tPXRoaXMuYSpkdCowLjk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih0aGlzLnNwZWVkWCx0aGlzLnNwZWVkWS5udW0pO1xuICAgICAgICBsZXQgbGluZWFyVmVsb2NpdHk9dGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eTtcbiAgICAgICAgbGV0IGFuZ2xlPWNhaWppVG9vbHMuZ2V0QW5nbGVEZXBlbmRZKGxpbmVhclZlbG9jaXR5LngsbGluZWFyVmVsb2NpdHkueSk7XG4gICAgICAgIHRoaXMubm9kZS5hbmdsZT0tYW5nbGUtOTA7XG4gICAgfVxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXI6Y2MuQ29sbGlkZXIsc2VsZjpjYy5Db2xsaWRlcil7XG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXA9PVwicGxheWVyXCIpe1xuICAgICAgICAgICAgaWYodGhpcy5pc0hpdCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5pc0hpdD10cnVlO1xuICAgICAgICAgICAgb3RoZXIubm9kZS5nZXRDb21wb25lbnQocGxheWVyQ29udHJvbGxlcikuYmVIaXQodGhpcy5lbmVteSx0aGlzLmRhbWFnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdDogY2MuUGh5c2ljc0NvbnRhY3QsIHNlbGZDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyLCBvdGhlckNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIpIHtcbiAgICAgICAgbGV0IG90aGVyID0gb3RoZXJDb2xsaWRlci5ub2RlO1xuICAgICAgICBpZiAob3RoZXIuZ3JvdXAgPT0gXCJncm91bmRcIikge1xuICAgICAgICAgICAgdGhpcy5pc0hpdD10cnVlO1xuICAgICAgICAgICAgdGhpcy5EZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5PWNjLnYyKHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkueCowLjMsdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eS55KjAuMyk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIoMCwwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2lib2R5LnR5cGU9Y2MuUmlnaWRCb2R5VHlwZS5TdGF0aWM7XG4gICAgICAgICAgICB9LDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIERlc3Ryb3koKXtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgIC50bygwLjMse29wYWNpdHk6MH0pXG4gICAgICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH0sMSk7XG4gICAgfVxufVxuIl19