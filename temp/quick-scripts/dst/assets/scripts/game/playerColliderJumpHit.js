
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/playerColliderJumpHit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'be6f58OW0RIcYpgBaaEZRyR', 'playerColliderJumpHit');
// scripts/game/playerColliderJumpHit.ts

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
var playerColliderJumpHit = /** @class */ (function (_super) {
    __extends(playerColliderJumpHit, _super);
    function playerColliderJumpHit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hitInterval = 0.15; //攻击间隔
        _this.timer = 0;
        _this.damageScale = 0;
        _this.enemys = [];
        _this.enemysHadHit = [];
        return _this;
    }
    playerColliderJumpHit.prototype.onDisable = function () {
        this.timer = 0;
        this.enemys = [];
        this.enemysHadHit = [];
    };
    playerColliderJumpHit.prototype.onEnable = function () {
        this.damageScale = playerHp_1.default.instance.damageScale * GameManager_1.default.instance.playerController.damageScaleZoom;
    };
    playerColliderJumpHit.prototype.start = function () {
        this.hitInterval = this.hitInterval - (playerHp_1.default.instance.speedTimes - 1) / 15;
    };
    playerColliderJumpHit.prototype.update = function (dt) {
        this.timer += dt;
        if (this.timer >= this.hitInterval) {
            this.hit(this.damageScale, animationState_1.attackType.jumpHit);
            this.timer = 0;
        }
    };
    playerColliderJumpHit.prototype.hit = function (damgeScale, attackType) {
        //console.log(damgeScale,attackType);
        for (var _i = 0, _a = this.enemys; _i < _a.length; _i++) {
            var enemy = _a[_i];
            //@ts-ignore
            enemy.getComponent(animationState_1.enemyScript[enemy.name]).beHit(damgeScale, attackType);
            //@ts-ignore
            enemy.getComponent(animationState_1.enemyScript[enemy.name]).playBeHitSound(audioNameMgr_1.audioName.airslash1);
        }
    };
    playerColliderJumpHit.prototype.onCollisionEnter = function (other, self) {
        this.enemys.push(other.node);
    };
    playerColliderJumpHit.prototype.onCollisionExit = function (other, self) {
        var index = this.enemys.indexOf(other.node);
        this.enemys.splice(index, 1);
    };
    __decorate([
        property({ type: cc.Float, displayName: "攻击间隔" })
    ], playerColliderJumpHit.prototype, "hitInterval", void 0);
    playerColliderJumpHit = __decorate([
        ccclass
    ], playerColliderJumpHit);
    return playerColliderJumpHit;
}(cc.Component));
exports.default = playerColliderJumpHit;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxccGxheWVyQ29sbGlkZXJKdW1wSGl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGdEQUE0QztBQUU1QyxtREFBMkQ7QUFDM0QsNkNBQXdDO0FBQ3hDLDBDQUFxQztBQUUvQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFtRCx5Q0FBWTtJQUEvRDtRQUFBLHFFQTBDQztRQXZDRyxpQkFBVyxHQUFRLElBQUksQ0FBQyxDQUFBLE1BQU07UUFDOUIsV0FBSyxHQUFRLENBQUMsQ0FBQztRQUNmLGlCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBQ3JCLFlBQU0sR0FBZ0IsRUFBRSxDQUFDO1FBQ3pCLGtCQUFZLEdBQWdCLEVBQUUsQ0FBQzs7SUFtQ25DLENBQUM7SUFsQ0cseUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsWUFBWSxHQUFDLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0Qsd0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUMsa0JBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztJQUN6RyxDQUFDO0lBQ0QscUNBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLGtCQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7SUFDMUUsQ0FBQztJQUNELHNDQUFNLEdBQU4sVUFBTyxFQUFFO1FBQ0wsSUFBSSxDQUFDLEtBQUssSUFBRSxFQUFFLENBQUM7UUFDZixJQUFHLElBQUksQ0FBQyxLQUFLLElBQUUsSUFBSSxDQUFDLFdBQVcsRUFBQztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsMkJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFDRCxtQ0FBRyxHQUFILFVBQUksVUFBaUIsRUFBQyxVQUFxQjtRQUN2QyxxQ0FBcUM7UUFDckMsS0FBaUIsVUFBVyxFQUFYLEtBQUEsSUFBSSxDQUFDLE1BQU0sRUFBWCxjQUFXLEVBQVgsSUFBVyxFQUFDO1lBQXpCLElBQUksS0FBSyxTQUFBO1lBQ1QsWUFBWTtZQUNaLEtBQUssQ0FBQyxZQUFZLENBQUMsNEJBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pFLFlBQVk7WUFDWixLQUFLLENBQUMsWUFBWSxDQUFDLDRCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLHdCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkY7SUFDTCxDQUFDO0lBQ0QsZ0RBQWdCLEdBQWhCLFVBQWlCLEtBQWlCLEVBQUMsSUFBZ0I7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCwrQ0FBZSxHQUFmLFVBQWdCLEtBQWlCLEVBQUMsSUFBZ0I7UUFDOUMsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBdENEO1FBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxDQUFDOzhEQUNyQjtJQUhQLHFCQUFxQjtRQUR6QyxPQUFPO09BQ2EscUJBQXFCLENBMEN6QztJQUFELDRCQUFDO0NBMUNELEFBMENDLENBMUNrRCxFQUFFLENBQUMsU0FBUyxHQTBDOUQ7a0JBMUNvQixxQkFBcUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vbWFpbi9hdWRpb01hbmFnZXJcIjtcbmltcG9ydCB7IGF0dGFja1R5cGUsIGVuZW15U2NyaXB0IH0gZnJvbSBcIi4vYW5pbWF0aW9uU3RhdGVcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHBsYXllckhwIGZyb20gXCIuL3VpL3BsYXllckhwXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGxheWVyQ29sbGlkZXJKdW1wSGl0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eSh7dHlwZTpjYy5GbG9hdCxkaXNwbGF5TmFtZTpcIuaUu+WHu+mXtOmalFwifSlcbiAgICBoaXRJbnRlcnZhbDpudW1iZXI9MC4xNTsvL+aUu+WHu+mXtOmalFxuICAgIHRpbWVyOm51bWJlcj0wO1xuICAgIGRhbWFnZVNjYWxlOm51bWJlcj0wO1xuICAgIGVuZW15czpBcnJheTxjYy5Ob2RlPj1bXTtcbiAgICBlbmVteXNIYWRIaXQ6QXJyYXk8Y2MuTm9kZT49W107XG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgdGhpcy50aW1lcj0wO1xuICAgICAgICB0aGlzLmVuZW15cz1bXTtcbiAgICAgICAgdGhpcy5lbmVteXNIYWRIaXQ9W107XG4gICAgfVxuICAgIG9uRW5hYmxlKCl7XG4gICAgICAgIHRoaXMuZGFtYWdlU2NhbGU9cGxheWVySHAuaW5zdGFuY2UuZGFtYWdlU2NhbGUqR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5kYW1hZ2VTY2FsZVpvb207XG4gICAgfVxuICAgIHN0YXJ0KCl7XG4gICAgICAgIHRoaXMuaGl0SW50ZXJ2YWw9dGhpcy5oaXRJbnRlcnZhbC0ocGxheWVySHAuaW5zdGFuY2Uuc3BlZWRUaW1lcy0xKS8xNTtcbiAgICB9XG4gICAgdXBkYXRlKGR0KXtcbiAgICAgICAgdGhpcy50aW1lcis9ZHQ7XG4gICAgICAgIGlmKHRoaXMudGltZXI+PXRoaXMuaGl0SW50ZXJ2YWwpe1xuICAgICAgICAgICAgdGhpcy5oaXQodGhpcy5kYW1hZ2VTY2FsZSxhdHRhY2tUeXBlLmp1bXBIaXQpO1xuICAgICAgICAgICAgdGhpcy50aW1lcj0wO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhpdChkYW1nZVNjYWxlOm51bWJlcixhdHRhY2tUeXBlOmF0dGFja1R5cGUpe1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhbWdlU2NhbGUsYXR0YWNrVHlwZSk7XG4gICAgICAgIGZvcihsZXQgZW5lbXkgb2YgdGhpcy5lbmVteXMpe1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBlbmVteS5nZXRDb21wb25lbnQoZW5lbXlTY3JpcHRbZW5lbXkubmFtZV0pLmJlSGl0KGRhbWdlU2NhbGUsYXR0YWNrVHlwZSk7XG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgIGVuZW15LmdldENvbXBvbmVudChlbmVteVNjcmlwdFtlbmVteS5uYW1lXSkucGxheUJlSGl0U291bmQoYXVkaW9OYW1lLmFpcnNsYXNoMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKXtcbiAgICAgICAgdGhpcy5lbmVteXMucHVzaChvdGhlci5ub2RlKTtcbiAgICB9XG4gICAgb25Db2xsaXNpb25FeGl0KG90aGVyOmNjLkNvbGxpZGVyLHNlbGY6Y2MuQ29sbGlkZXIpe1xuICAgICAgICBsZXQgaW5kZXg9dGhpcy5lbmVteXMuaW5kZXhPZihvdGhlci5ub2RlKTtcbiAgICAgICAgdGhpcy5lbmVteXMuc3BsaWNlKGluZGV4LDEpO1xuICAgIH1cbn1cbiJdfQ==