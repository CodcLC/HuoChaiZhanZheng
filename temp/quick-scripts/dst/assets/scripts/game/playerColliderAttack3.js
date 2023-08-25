
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/playerColliderAttack3.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1d764ug2jtPmqVFN/mUvbFW', 'playerColliderAttack3');
// scripts/game/playerColliderAttack3.ts

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
var audioNameMgr_1 = require("../audioNameMgr");
var animationState_1 = require("./animationState");
var GameManager_1 = require("./GameManager");
var playerHp_1 = require("./ui/playerHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerColliderAttack3 = /** @class */ (function (_super) {
    __extends(playerColliderAttack3, _super);
    function playerColliderAttack3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemys = [];
        _this.enemysHadHit = [];
        return _this;
    }
    playerColliderAttack3.prototype.onDisable = function () {
        this.enemys = [];
        this.enemysHadHit = [];
    };
    playerColliderAttack3.prototype.hit = function (enemy, damgeScale, attackType) {
        //@ts-ignore
        enemy.getComponent(animationState_1.enemyScript[enemy.name]).beHit(damgeScale, attackType);
        //@ts-ignore
        enemy.getComponent(animationState_1.enemyScript[enemy.name]).playBeHitSound(audioNameMgr_1.audioName.slash3);
    };
    playerColliderAttack3.prototype.onCollisionEnter = function (other, self) {
        if (this.enemysHadHit.includes(other.node))
            return;
        var dmg = playerHp_1.default.instance.damageScale * GameManager_1.default.instance.playerController.damageScaleZoom *
            GameManager_1.default.instance.playerController.damage3ScaleTimes;
        this.hit(other.node, dmg, animationState_1.attackType.attack3);
        this.enemysHadHit.push(other.node);
    };
    playerColliderAttack3.prototype.onCollisionExit = function (other, self) {
        var index = this.enemys.indexOf(other.node);
        this.enemys.splice(index, 1);
    };
    playerColliderAttack3 = __decorate([
        ccclass
    ], playerColliderAttack3);
    return playerColliderAttack3;
}(cc.Component));
exports.default = playerColliderAttack3;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxccGxheWVyQ29sbGlkZXJBdHRhY2szLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGdEQUE0QztBQUU1QyxtREFBMkQ7QUFDM0QsNkNBQXdDO0FBQ3hDLDBDQUFxQztBQUUvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQXlCQztRQXZCRyxZQUFNLEdBQW1CLEVBQUUsQ0FBQztRQUM1QixrQkFBWSxHQUFtQixFQUFFLENBQUM7O0lBc0J0QyxDQUFDO0lBckJHLHlDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsbUNBQUcsR0FBSCxVQUFJLEtBQWMsRUFBRSxVQUFrQixFQUFFLFVBQXNCO1FBQzFELFlBQVk7UUFDWixLQUFLLENBQUMsWUFBWSxDQUFDLDRCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMxRSxZQUFZO1FBQ1osS0FBSyxDQUFDLFlBQVksQ0FBQyw0QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyx3QkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFDRCxnREFBZ0IsR0FBaEIsVUFBaUIsS0FBa0IsRUFBRSxJQUFpQjtRQUNsRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ25ELElBQUksR0FBRyxHQUFXLGtCQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlO1lBQ25HLHFCQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsMkJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELCtDQUFlLEdBQWYsVUFBZ0IsS0FBa0IsRUFBRSxJQUFpQjtRQUNqRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUF4QmdCLHFCQUFxQjtRQUR6QyxPQUFPO09BQ2EscUJBQXFCLENBeUJ6QztJQUFELDRCQUFDO0NBekJELEFBeUJDLENBekJrRCxFQUFFLENBQUMsU0FBUyxHQXlCOUQ7a0JBekJvQixxQkFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vbWFpbi9hdWRpb01hbmFnZXJcIjtcbmltcG9ydCB7IGF0dGFja1R5cGUsIGVuZW15U2NyaXB0IH0gZnJvbSBcIi4vYW5pbWF0aW9uU3RhdGVcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHBsYXllckhwIGZyb20gXCIuL3VpL3BsYXllckhwXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwbGF5ZXJDb2xsaWRlckF0dGFjazMgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgZW5lbXlzOiBBcnJheTxjYy5Ob2RlPiA9IFtdO1xuICAgIGVuZW15c0hhZEhpdDogQXJyYXk8Y2MuTm9kZT4gPSBbXTtcbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlzID0gW107XG4gICAgICAgIHRoaXMuZW5lbXlzSGFkSGl0ID0gW107XG4gICAgfVxuICAgIGhpdChlbmVteTogY2MuTm9kZSwgZGFtZ2VTY2FsZTogbnVtYmVyLCBhdHRhY2tUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBlbmVteS5nZXRDb21wb25lbnQoZW5lbXlTY3JpcHRbZW5lbXkubmFtZV0pLmJlSGl0KGRhbWdlU2NhbGUsIGF0dGFja1R5cGUpO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgZW5lbXkuZ2V0Q29tcG9uZW50KGVuZW15U2NyaXB0W2VuZW15Lm5hbWVdKS5wbGF5QmVIaXRTb3VuZChhdWRpb05hbWUuc2xhc2gzKTtcbiAgICB9XG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjogY2MuQ29sbGlkZXIsIHNlbGY6IGNjLkNvbGxpZGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmVuZW15c0hhZEhpdC5pbmNsdWRlcyhvdGhlci5ub2RlKSkgcmV0dXJuO1xuICAgICAgICBsZXQgZG1nOiBudW1iZXIgPSBwbGF5ZXJIcC5pbnN0YW5jZS5kYW1hZ2VTY2FsZSAqIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuZGFtYWdlU2NhbGVab29tICpcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuZGFtYWdlM1NjYWxlVGltZXM7XG4gICAgICAgIHRoaXMuaGl0KG90aGVyLm5vZGUsIGRtZywgYXR0YWNrVHlwZS5hdHRhY2szKTtcbiAgICAgICAgdGhpcy5lbmVteXNIYWRIaXQucHVzaChvdGhlci5ub2RlKTtcbiAgICB9XG4gICAgb25Db2xsaXNpb25FeGl0KG90aGVyOiBjYy5Db2xsaWRlciwgc2VsZjogY2MuQ29sbGlkZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5lbmVteXMuaW5kZXhPZihvdGhlci5ub2RlKTtcbiAgICAgICAgdGhpcy5lbmVteXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG4iXX0=