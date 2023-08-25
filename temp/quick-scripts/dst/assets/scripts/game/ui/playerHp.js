
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ui/playerHp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '93dcdNkO0BIy5Y7Sm4Qsff/', 'playerHp');
// scripts/game/ui/playerHp.ts

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
var data_1 = require("../../sdk/data");
var Events_1 = require("../Events");
var GameManager_1 = require("../GameManager");
var uiManager_1 = require("./uiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerHp = /** @class */ (function (_super) {
    __extends(playerHp, _super);
    function playerHp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpLabel = null;
        _this.hpBar = null;
        _this.cursor = null; //血条光标
        _this.bar = null;
        _this.damageScale = 0; //普攻1伤害值 （60,80,150）
        _this.damageShuriken = 0; //手里剑伤害
        _this.damageSowrdRain = 0; //剑雨伤害
        _this.hp_max = 0;
        _this.hp_now = 0;
        _this.damageLv = 0; //属性等级
        _this.healthLv = 0;
        _this.speedLv = 0;
        _this.damageIncremental = 0.2; //属性每级递增量
        _this.healthIncremental = 0.2;
        _this.speedIncremental = 0.1;
        _this.speedTimes = 0;
        _this.isOpenFullHp = false;
        return _this;
    }
    playerHp_1 = playerHp;
    playerHp.prototype.onLoad = function () {
        playerHp_1.instance = this;
    };
    playerHp.prototype.start = function () {
        this.init();
    };
    playerHp.prototype.init = function () {
        this.isOpenFullHp = false;
        this.damageLv = Number(data_1.data.getCache("attributeLv", "damage"));
        this.healthLv = Number(data_1.data.getCache("attributeLv", "health"));
        this.speedLv = Number(data_1.data.getCache("attributeLv", "speed"));
        this.hp_max = Number(data_1.data.getCache("Base", "playerHp")) * (1 + this.healthLv * this.healthIncremental);
        this.damageScale = Number(data_1.data.getCache("Base", "playerDamage")) * (1 + this.damageLv * this.damageIncremental);
        this.damageShuriken = Number(data_1.data.getCache("Base", "shurikenDamage")) * (1 + this.damageLv * this.damageIncremental);
        this.damageSowrdRain = Number(data_1.data.getCache("Base", "swordRainDamage")) * (1 + this.damageLv * this.damageIncremental);
        this.hp_now = this.hp_max;
        this.speedTimes = 1 + this.speedLv / 10;
        this.updateLabel();
    };
    playerHp.prototype.fullHp = function () {
        this.addHp(this.hp_max - this.hp_now);
    };
    playerHp.prototype.addHp = function (addNum, isRevive) {
        if (isRevive === void 0) { isRevive = false; }
        addNum = Math.floor(addNum);
        this.hp_now += addNum;
        this.hp_now = this.hp_now > this.hp_max ? this.hp_max : this.hp_now;
        this.updateLabel();
        var offsetX = GameManager_1.default.instance.playerController.skeleton.node.scaleX > 0 ? -35 : 35;
        Events_1.default.instance.showAddHp_player(GameManager_1.default.instance.player, addNum, offsetX, isRevive);
    };
    playerHp.prototype.updateHp = function (damage) {
        damage = Math.floor(damage);
        this.createBarFadeOut();
        this.hp_now -= damage;
        this.hp_now = this.hp_now < 0 ? 0 : this.hp_now;
        this.updateLabel();
        if (this.hp_now <= 0) {
            this.hp_now = 0;
            GameManager_1.default.instance.playerController.die();
        }
        if (GameManager_1.default.instance.playerController.isDie == false && this.isOpenFullHp == false) { //////////
            if (this.hp_now < this.hp_max / 3) {
                this.isOpenFullHp = true;
                uiManager_1.default.ins.showFullHpPopup();
            }
        }
    };
    playerHp.prototype.updateLabel = function () {
        this.hpBar.progress = this.hp_now / this.hp_max;
        this.cursor.x = this.hpBar.progress * 300;
        this.hpLabel.string = this.hp_now + "/" + this.hp_max;
    };
    playerHp.prototype.createBarFadeOut = function () {
        var newBar = cc.instantiate(this.bar);
        newBar.setParent(this.bar.parent);
        newBar.setPosition(this.bar.position);
        cc.tween(newBar)
            .to(0.3, { opacity: 0, color: cc.Color.WHITE })
            .call(function () {
            newBar.destroy();
        })
            .start();
    };
    var playerHp_1;
    playerHp.instance = null;
    __decorate([
        property(cc.Label)
    ], playerHp.prototype, "hpLabel", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], playerHp.prototype, "hpBar", void 0);
    __decorate([
        property(cc.Node)
    ], playerHp.prototype, "cursor", void 0);
    __decorate([
        property(cc.Node)
    ], playerHp.prototype, "bar", void 0);
    playerHp = playerHp_1 = __decorate([
        ccclass
    ], playerHp);
    return playerHp;
}(cc.Component));
exports.default = playerHp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdWlcXHBsYXllckhwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLHVDQUFzQztBQUN0QyxvQ0FBK0I7QUFDL0IsOENBQXlDO0FBQ3pDLHlDQUFvQztBQUU5QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQTRGQztRQXpGRyxhQUFPLEdBQVUsSUFBSSxDQUFDO1FBRXRCLFdBQUssR0FBZ0IsSUFBSSxDQUFDO1FBRTFCLFlBQU0sR0FBUyxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBRTFCLFNBQUcsR0FBUyxJQUFJLENBQUM7UUFFakIsaUJBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQSxvQkFBb0I7UUFDNUMsb0JBQWMsR0FBUSxDQUFDLENBQUMsQ0FBQSxPQUFPO1FBQy9CLHFCQUFlLEdBQVEsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUMvQixZQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsY0FBUSxHQUFRLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDeEIsY0FBUSxHQUFRLENBQUMsQ0FBQztRQUNsQixhQUFPLEdBQVEsQ0FBQyxDQUFDO1FBQ2pCLHVCQUFpQixHQUFRLEdBQUcsQ0FBQyxDQUFBLFNBQVM7UUFDdEMsdUJBQWlCLEdBQVEsR0FBRyxDQUFDO1FBQzdCLHNCQUFnQixHQUFRLEdBQUcsQ0FBQztRQUM1QixnQkFBVSxHQUFRLENBQUMsQ0FBQztRQW1DcEIsa0JBQVksR0FBVyxLQUFLLENBQUE7O0lBbUNoQyxDQUFDO2lCQTVGb0IsUUFBUTtJQXdCekIseUJBQU0sR0FBTjtRQUNJLFVBQVEsQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRCx3QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx1QkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7UUFFekIsSUFBSSxDQUFDLFFBQVEsR0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxPQUFPLEdBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsVUFBVSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlGLElBQUksQ0FBQyxXQUFXLEdBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN2RyxJQUFJLENBQUMsY0FBYyxHQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsZUFBZSxHQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM5RyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0Qsd0JBQUssR0FBTCxVQUFNLE1BQWEsRUFBQyxRQUFzQjtRQUF0Qix5QkFBQSxFQUFBLGdCQUFzQjtRQUN0QyxNQUFNLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxPQUFPLEdBQUMscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDO1FBQ2hGLGdCQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFHRCwyQkFBUSxHQUFSLFVBQVMsTUFBYztRQUNuQixNQUFNLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDL0M7UUFDRCxJQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLEVBQUMsRUFBQyxVQUFVO1lBQzdGLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsRUFDL0I7Z0JBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7Z0JBQ3hCLG1CQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFBO2FBQ2xDO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsOEJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBQyxHQUFHLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwRCxDQUFDO0lBQ0QsbUNBQWdCLEdBQWhCO1FBQ0ksSUFBSSxNQUFNLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNmLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxDQUFDO2FBQ3hDLElBQUksQ0FBQztZQUNGLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUM7O0lBcEVNLGlCQUFRLEdBQVUsSUFBSSxDQUFDO0lBcEI5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzZDQUNHO0lBRXRCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MkNBQ0M7SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDRTtJQUVwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lDQUNEO0lBVEEsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTRGNUI7SUFBRCxlQUFDO0NBNUZELEFBNEZDLENBNUZxQyxFQUFFLENBQUMsU0FBUyxHQTRGakQ7a0JBNUZvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGRhdGEgfSBmcm9tIFwiLi4vLi4vc2RrL2RhdGFcIjtcbmltcG9ydCBFdmVudHMgZnJvbSBcIi4uL0V2ZW50c1wiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHVpTWFuYWdlciBmcm9tIFwiLi91aU1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwbGF5ZXJIcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgaHBMYWJlbDpjYy5MYWJlbD1udWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBocEJhcjpjYy5Qcm9ncmVzc0Jhcj1udWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGN1cnNvcjpjYy5Ob2RlPW51bGw7Ly/ooYDmnaHlhYnmoIdcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBiYXI6Y2MuTm9kZT1udWxsO1xuXG4gICAgZGFtYWdlU2NhbGU6IG51bWJlciA9IDA7Ly/mma7mlLsx5Lyk5a6z5YC8IO+8iDYwLDgwLDE1MO+8iVxuICAgIGRhbWFnZVNodXJpa2VuOm51bWJlcj0wOy8v5omL6YeM5YmR5Lyk5a6zXG4gICAgZGFtYWdlU293cmRSYWluOm51bWJlcj0wOy8v5YmR6Zuo5Lyk5a6zXG4gICAgaHBfbWF4Om51bWJlcj0wO1xuICAgIGhwX25vdzpudW1iZXI9MDtcbiAgICBkYW1hZ2VMdjpudW1iZXI9MDsvL+WxnuaAp+etiee6p1xuICAgIGhlYWx0aEx2Om51bWJlcj0wO1xuICAgIHNwZWVkTHY6bnVtYmVyPTA7XG4gICAgZGFtYWdlSW5jcmVtZW50YWw6bnVtYmVyPTAuMjsvL+WxnuaAp+avj+e6p+mAkuWinumHj1xuICAgIGhlYWx0aEluY3JlbWVudGFsOm51bWJlcj0wLjI7XG4gICAgc3BlZWRJbmNyZW1lbnRhbDpudW1iZXI9MC4xO1xuICAgIHNwZWVkVGltZXM6bnVtYmVyPTA7XG4gICAgc3RhdGljIGluc3RhbmNlOnBsYXllckhwPW51bGw7XG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgcGxheWVySHAuaW5zdGFuY2U9dGhpcztcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMuaXNPcGVuRnVsbEhwID0gZmFsc2VcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGFtYWdlTHY9TnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJhdHRyaWJ1dGVMdlwiLFwiZGFtYWdlXCIpKTtcbiAgICAgICAgdGhpcy5oZWFsdGhMdj1OdW1iZXIoZGF0YS5nZXRDYWNoZShcImF0dHJpYnV0ZUx2XCIsXCJoZWFsdGhcIikpO1xuICAgICAgICB0aGlzLnNwZWVkTHY9TnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJhdHRyaWJ1dGVMdlwiLFwic3BlZWRcIikpO1xuICAgICAgICB0aGlzLmhwX21heD1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcInBsYXllckhwXCIpKSooMSt0aGlzLmhlYWx0aEx2KnRoaXMuaGVhbHRoSW5jcmVtZW50YWwpO1xuICAgICAgICB0aGlzLmRhbWFnZVNjYWxlPU51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwicGxheWVyRGFtYWdlXCIpKSooMSt0aGlzLmRhbWFnZUx2KnRoaXMuZGFtYWdlSW5jcmVtZW50YWwpO1xuICAgICAgICB0aGlzLmRhbWFnZVNodXJpa2VuPU51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwic2h1cmlrZW5EYW1hZ2VcIikpKigxK3RoaXMuZGFtYWdlTHYqdGhpcy5kYW1hZ2VJbmNyZW1lbnRhbCk7XG4gICAgICAgIHRoaXMuZGFtYWdlU293cmRSYWluPU51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwic3dvcmRSYWluRGFtYWdlXCIpKSooMSt0aGlzLmRhbWFnZUx2KnRoaXMuZGFtYWdlSW5jcmVtZW50YWwpO1xuICAgICAgICB0aGlzLmhwX25vdz10aGlzLmhwX21heDtcbiAgICAgICAgdGhpcy5zcGVlZFRpbWVzPTErdGhpcy5zcGVlZEx2LzEwO1xuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XG4gICAgfVxuICAgIGZ1bGxIcCgpe1xuICAgICAgICB0aGlzLmFkZEhwKHRoaXMuaHBfbWF4LXRoaXMuaHBfbm93KTtcbiAgICB9XG4gICAgYWRkSHAoYWRkTnVtOm51bWJlcixpc1Jldml2ZTpib29sZWFuPWZhbHNlKXtcbiAgICAgICAgYWRkTnVtPU1hdGguZmxvb3IoYWRkTnVtKTtcbiAgICAgICAgdGhpcy5ocF9ub3cgKz0gYWRkTnVtO1xuICAgICAgICB0aGlzLmhwX25vdz10aGlzLmhwX25vdz50aGlzLmhwX21heD90aGlzLmhwX21heDp0aGlzLmhwX25vdztcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xuICAgICAgICBsZXQgb2Zmc2V0WD1HYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYPjA/LTM1OjM1O1xuICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2hvd0FkZEhwX3BsYXllcihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIsYWRkTnVtLG9mZnNldFgsaXNSZXZpdmUpO1xuICAgIH1cblxuICAgIGlzT3BlbkZ1bGxIcDpib29sZWFuID0gZmFsc2VcbiAgICB1cGRhdGVIcChkYW1hZ2U6IG51bWJlcikge1xuICAgICAgICBkYW1hZ2U9TWF0aC5mbG9vcihkYW1hZ2UpO1xuICAgICAgICB0aGlzLmNyZWF0ZUJhckZhZGVPdXQoKTtcbiAgICAgICAgdGhpcy5ocF9ub3cgLT0gZGFtYWdlO1xuICAgICAgICB0aGlzLmhwX25vdz10aGlzLmhwX25vdzwwPzA6dGhpcy5ocF9ub3c7XG4gICAgICAgIHRoaXMudXBkYXRlTGFiZWwoKTtcbiAgICAgICAgaWYgKHRoaXMuaHBfbm93IDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuaHBfbm93ID0gMDtcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuZGllKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5pc0RpZSA9PSBmYWxzZSAmJiB0aGlzLmlzT3BlbkZ1bGxIcCA9PSBmYWxzZSl7Ly8vLy8vLy8vL1xuICAgICAgICAgICAgaWYgKHRoaXMuaHBfbm93IDwgdGhpcy5ocF9tYXgvMylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbkZ1bGxIcCA9IHRydWVcbiAgICAgICAgICAgICAgICB1aU1hbmFnZXIuaW5zLnNob3dGdWxsSHBQb3B1cCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlTGFiZWwoKXtcbiAgICAgICAgdGhpcy5ocEJhci5wcm9ncmVzcyA9IHRoaXMuaHBfbm93IC8gdGhpcy5ocF9tYXg7XG4gICAgICAgIHRoaXMuY3Vyc29yLng9dGhpcy5ocEJhci5wcm9ncmVzcyozMDA7XG4gICAgICAgIHRoaXMuaHBMYWJlbC5zdHJpbmc9dGhpcy5ocF9ub3crXCIvXCIrdGhpcy5ocF9tYXg7XG4gICAgfVxuICAgIGNyZWF0ZUJhckZhZGVPdXQoKXtcbiAgICAgICAgbGV0IG5ld0Jhcj1jYy5pbnN0YW50aWF0ZSh0aGlzLmJhcik7XG4gICAgICAgIG5ld0Jhci5zZXRQYXJlbnQodGhpcy5iYXIucGFyZW50KTtcbiAgICAgICAgbmV3QmFyLnNldFBvc2l0aW9uKHRoaXMuYmFyLnBvc2l0aW9uKTtcbiAgICAgICAgY2MudHdlZW4obmV3QmFyKVxuICAgICAgICAudG8oMC4zLHtvcGFjaXR5OjAsY29sb3I6Y2MuQ29sb3IuV0hJVEV9KVxuICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgbmV3QmFyLmRlc3Ryb3koKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxufVxuIl19