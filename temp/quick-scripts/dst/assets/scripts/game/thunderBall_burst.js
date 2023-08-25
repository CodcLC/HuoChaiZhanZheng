
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/thunderBall_burst.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fcfdf+RAZlMtb/K+BZalTIM', 'thunderBall_burst');
// scripts/game/thunderBall_burst.ts

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
var data_1 = require("../sdk/data");
var enemyBase_1 = require("./enemyBase");
var enemyHitCollider_1 = require("./enemyHitCollider");
var skillPool_1 = require("./skillPool");
var bossHp_1 = require("./ui/bossHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var thunderBall_burst = /** @class */ (function (_super) {
    __extends(thunderBall_burst, _super);
    function thunderBall_burst() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 0;
        _this.player = null;
        return _this;
    }
    thunderBall_burst.prototype.onLoad = function () {
        var level = Number(data_1.data.getCache("Base", "choseLevel"));
        var diff = Number(data_1.data.getCache("levelStar", level.toString()));
        var times = Number(data_1.data.gameJson("enemyDamageTimes", diff.toString()));
        this.damage = Number(data_1.data.gameJson("enemyData", bossHp_1.bossName.miniBoss, enemyBase_1.enemyAttribute.damage)) * times;
    };
    thunderBall_burst.prototype.onEnable = function () {
        var _this = this;
        this.scheduleOnce(function () {
            if (_this.player != null) {
                ;
                _this.node.getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
            }
            _this.scheduleOnce(function () {
                skillPool_1.default.instance.recoveryThunderball(_this.node);
            }, 1);
        }, 3.05);
    };
    thunderBall_burst.prototype.onCollisionEnter = function (other, self) {
        if (other.node.group == "player") {
            this.player = other.node;
        }
    };
    thunderBall_burst.prototype.onCollisionExit = function (other, self) {
        if (other.node.group == "player") {
            this.player = null;
        }
    };
    thunderBall_burst.prototype.reuse = function () {
    };
    thunderBall_burst.prototype.unuse = function () {
        this.node.active = false;
    };
    thunderBall_burst = __decorate([
        ccclass
    ], thunderBall_burst);
    return thunderBall_burst;
}(cc.Component));
exports.default = thunderBall_burst;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdGh1bmRlckJhbGxfYnVyc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJbEYsb0NBQW1DO0FBQ25DLHlDQUE2QztBQUM3Qyx1REFBa0Q7QUFDbEQseUNBQW9DO0FBQ3BDLHNDQUF1QztBQUVqQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUErQyxxQ0FBWTtJQUEzRDtRQUFBLHFFQXFDQztRQW5DRyxZQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLFlBQU0sR0FBUyxJQUFJLENBQUM7O0lBa0N4QixDQUFDO0lBaENHLGtDQUFNLEdBQU47UUFDSSxJQUFJLEtBQUssR0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLElBQUksR0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLEtBQUssR0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ25FLElBQUksQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLGlCQUFRLENBQUMsUUFBUSxFQUFDLDBCQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxLQUFLLENBQUM7SUFDakcsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFHLEtBQUksQ0FBQyxNQUFNLElBQUUsSUFBSSxFQUFDO2dCQUFDLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZFO1lBQ0QsS0FBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUNELDRDQUFnQixHQUFoQixVQUFpQixLQUFpQixFQUFDLElBQWdCO1FBQy9DLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUUsUUFBUSxFQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFDRCwyQ0FBZSxHQUFmLFVBQWdCLEtBQWlCLEVBQUMsSUFBZ0I7UUFDOUMsSUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBRSxRQUFRLEVBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBQ0QsaUNBQUssR0FBTDtJQUNBLENBQUM7SUFDRCxpQ0FBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFwQ2dCLGlCQUFpQjtRQURyQyxPQUFPO09BQ2EsaUJBQWlCLENBcUNyQztJQUFELHdCQUFDO0NBckNELEFBcUNDLENBckM4QyxFQUFFLENBQUMsU0FBUyxHQXFDMUQ7a0JBckNvQixpQkFBaUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vbWFpbi9hdWRpb01hbmFnZXJcIjtcbmltcG9ydCB7IGRhdGEgfSBmcm9tIFwiLi4vc2RrL2RhdGFcIjtcbmltcG9ydCB7IGVuZW15QXR0cmlidXRlIH0gZnJvbSBcIi4vZW5lbXlCYXNlXCI7XG5pbXBvcnQgZW5lbXlIaXRDb2xsaWRlciBmcm9tIFwiLi9lbmVteUhpdENvbGxpZGVyXCI7XG5pbXBvcnQgc2tpbGxQb29sIGZyb20gXCIuL3NraWxsUG9vbFwiO1xuaW1wb3J0IHsgYm9zc05hbWUgfSBmcm9tIFwiLi91aS9ib3NzSHBcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0aHVuZGVyQmFsbF9idXJzdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBkYW1hZ2U6bnVtYmVyPTA7XG4gICAgcGxheWVyOmNjLk5vZGU9bnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIGxldCBsZXZlbD1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImNob3NlTGV2ZWxcIikpO1xuICAgICAgICBsZXQgZGlmZj1OdW1iZXIoZGF0YS5nZXRDYWNoZShcImxldmVsU3RhclwiLGxldmVsLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgbGV0IHRpbWVzPU51bWJlcihkYXRhLmdhbWVKc29uKFwiZW5lbXlEYW1hZ2VUaW1lc1wiLGRpZmYudG9TdHJpbmcoKSkpXG4gICAgICAgIHRoaXMuZGFtYWdlPU51bWJlcihkYXRhLmdhbWVKc29uKFwiZW5lbXlEYXRhXCIsYm9zc05hbWUubWluaUJvc3MsZW5lbXlBdHRyaWJ1dGUuZGFtYWdlKSkqdGltZXM7XG4gICAgfVxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXIhPW51bGwpeztcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGVuZW15SGl0Q29sbGlkZXIpLmhpdCh0aGlzLm5vZGUsdGhpcy5kYW1hZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICBza2lsbFBvb2wuaW5zdGFuY2UucmVjb3ZlcnlUaHVuZGVyYmFsbCh0aGlzLm5vZGUpO1xuICAgICAgICAgICAgfSwxKTtcbiAgICAgICAgfSwzLjA1KTtcbiAgICB9XG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKXtcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cD09XCJwbGF5ZXJcIil7XG4gICAgICAgICAgICB0aGlzLnBsYXllcj1vdGhlci5ub2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ29sbGlzaW9uRXhpdChvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKXtcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cD09XCJwbGF5ZXJcIil7XG4gICAgICAgICAgICB0aGlzLnBsYXllcj1udWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldXNlKCl7XG4gICAgfVxuICAgIHVudXNlKCl7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmU9ZmFsc2U7XG4gICAgfVxufVxuIl19