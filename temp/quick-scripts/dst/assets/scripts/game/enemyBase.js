
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/enemyBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'adb3ap23ThHSafkgOKlkl0P', 'enemyBase');
// scripts/game/enemyBase.ts

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
exports.enemyAttribute = void 0;
var audioManager_1 = require("../main/audioManager");
var data_1 = require("../sdk/data");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemyAttribute;
(function (enemyAttribute) {
    enemyAttribute["hp"] = "hp";
    enemyAttribute["damage"] = "damage";
    enemyAttribute["dropCoinNumber"] = "dropCoinNumber";
    enemyAttribute["isSuperArmor"] = "isSuperArmor";
})(enemyAttribute = exports.enemyAttribute || (exports.enemyAttribute = {}));
var enemyBase = /** @class */ (function (_super) {
    __extends(enemyBase, _super);
    function enemyBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpMax = 0;
        _this.swordRainHitCd = 0.1;
        _this.damage = 0;
        _this.isSuperArmor = false; //是否霸体
        _this.isWuDi = false;
        return _this;
    }
    enemyBase.prototype.initData = function () {
        var level = Number(data_1.data.getCache("Base", "choseLevel"));
        var difficult = Number(data_1.data.getCache("levelStar", (level).toString()));
        var hpTimes = Number(data_1.data.gameJson("enemyHpTimes", difficult.toString()));
        var damageTimes = Number(data_1.data.gameJson("enemyDamageTimes", difficult.toString()));
        this.swordRainHitCd = Number(data_1.data.gameJson("swordRainInterval"));
        this.hpMax = Number(data_1.data.gameJson("enemyData", this.node.name, enemyAttribute.hp));
        this.damage = Number(data_1.data.gameJson("enemyData", this.node.name, enemyAttribute.damage));
        this.isSuperArmor = data_1.data.gameJson("enemyData", this.node.name, enemyAttribute.isSuperArmor);
        this.hpMax *= hpTimes;
        this.damage *= damageTimes;
    };
    enemyBase.prototype.dieCount = function () {
        GameManager_1.default.instance.killEnemyCount();
    };
    enemyBase.prototype.playBeHitSound = function (audioName) {
        if (this.isWuDi)
            return;
        audioManager_1.default.playAudio(audioName);
    };
    enemyBase = __decorate([
        ccclass
    ], enemyBase);
    return enemyBase;
}(cc.Component));
exports.default = enemyBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZW5lbXlCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdsRixxREFBZ0Q7QUFDaEQsb0NBQW1DO0FBQ25DLDZDQUF3QztBQUVsQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUMxQyxJQUFZLGNBS1g7QUFMRCxXQUFZLGNBQWM7SUFDdEIsMkJBQU8sQ0FBQTtJQUNQLG1DQUFlLENBQUE7SUFDZixtREFBK0IsQ0FBQTtJQUMvQiwrQ0FBMkIsQ0FBQTtBQUMvQixDQUFDLEVBTFcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFLekI7QUFFRDtJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTJCQztRQXpCRyxXQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLG9CQUFjLEdBQVcsR0FBRyxDQUFDO1FBQzdCLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsa0JBQVksR0FBWSxLQUFLLENBQUMsQ0FBQSxNQUFNO1FBQ3BDLFlBQU0sR0FBUyxLQUFLLENBQUM7O0lBcUJ6QixDQUFDO0lBbkJHLDRCQUFRLEdBQVI7UUFDSSxJQUFJLEtBQUssR0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLFNBQVMsR0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEUsSUFBSSxPQUFPLEdBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxXQUFXLEdBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsY0FBYyxHQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsWUFBWSxHQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsS0FBSyxJQUFFLE9BQU8sQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxJQUFFLFdBQVcsQ0FBQztJQUM3QixDQUFDO0lBQ0QsNEJBQVEsR0FBUjtRQUNJLHFCQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFDRCxrQ0FBYyxHQUFkLFVBQWUsU0FBZ0I7UUFDM0IsSUFBRyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDdkIsc0JBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQTFCZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTJCN0I7SUFBRCxnQkFBQztDQTNCRCxBQTJCQyxDQTNCc0MsRUFBRSxDQUFDLFNBQVMsR0EyQmxEO2tCQTNCb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi9zZGsvZGF0YVwiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuZXhwb3J0IGVudW0gZW5lbXlBdHRyaWJ1dGV7XG4gICAgaHA9XCJocFwiLFxuICAgIGRhbWFnZT1cImRhbWFnZVwiLFxuICAgIGRyb3BDb2luTnVtYmVyPVwiZHJvcENvaW5OdW1iZXJcIixcbiAgICBpc1N1cGVyQXJtb3I9XCJpc1N1cGVyQXJtb3JcIlxufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGVuZW15QmFzZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBocE1heDogbnVtYmVyID0gMDtcbiAgICBzd29yZFJhaW5IaXRDZDogbnVtYmVyID0gMC4xO1xuICAgIGRhbWFnZTpudW1iZXI9MDtcbiAgICBpc1N1cGVyQXJtb3I6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpumcuOS9k1xuICAgIGlzV3VEaTpib29sZWFuPWZhbHNlO1xuXG4gICAgaW5pdERhdGEoKXtcbiAgICAgICAgbGV0IGxldmVsPU51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwiY2hvc2VMZXZlbFwiKSk7XG4gICAgICAgIGxldCBkaWZmaWN1bHQ9TnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJsZXZlbFN0YXJcIiwobGV2ZWwpLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgbGV0IGhwVGltZXM9TnVtYmVyKGRhdGEuZ2FtZUpzb24oXCJlbmVteUhwVGltZXNcIixkaWZmaWN1bHQudG9TdHJpbmcoKSkpO1xuICAgICAgICBsZXQgZGFtYWdlVGltZXM9TnVtYmVyKGRhdGEuZ2FtZUpzb24oXCJlbmVteURhbWFnZVRpbWVzXCIsZGlmZmljdWx0LnRvU3RyaW5nKCkpKTtcbiAgICAgICAgdGhpcy5zd29yZFJhaW5IaXRDZD1OdW1iZXIoZGF0YS5nYW1lSnNvbihcInN3b3JkUmFpbkludGVydmFsXCIpKTtcbiAgICAgICAgdGhpcy5ocE1heD1OdW1iZXIoZGF0YS5nYW1lSnNvbihcImVuZW15RGF0YVwiLHRoaXMubm9kZS5uYW1lLGVuZW15QXR0cmlidXRlLmhwKSk7XG4gICAgICAgIHRoaXMuZGFtYWdlPU51bWJlcihkYXRhLmdhbWVKc29uKFwiZW5lbXlEYXRhXCIsdGhpcy5ub2RlLm5hbWUsZW5lbXlBdHRyaWJ1dGUuZGFtYWdlKSk7XG4gICAgICAgIHRoaXMuaXNTdXBlckFybW9yPWRhdGEuZ2FtZUpzb24oXCJlbmVteURhdGFcIix0aGlzLm5vZGUubmFtZSxlbmVteUF0dHJpYnV0ZS5pc1N1cGVyQXJtb3IpO1xuICAgICAgICB0aGlzLmhwTWF4Kj1ocFRpbWVzO1xuICAgICAgICB0aGlzLmRhbWFnZSo9ZGFtYWdlVGltZXM7XG4gICAgfVxuICAgIGRpZUNvdW50KCl7XG4gICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLmtpbGxFbmVteUNvdW50KCk7XG4gICAgfVxuICAgIHBsYXlCZUhpdFNvdW5kKGF1ZGlvTmFtZTpzdHJpbmcpe1xuICAgICAgICBpZih0aGlzLmlzV3VEaSkgcmV0dXJuO1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZSk7XG4gICAgfVxufVxuIl19