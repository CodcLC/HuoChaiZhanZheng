
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/shuriken.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '78986FsJpZB9JQMZsy5ONiF', 'shuriken');
// scripts/game/shuriken.ts

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
var shuriken = /** @class */ (function (_super) {
    __extends(shuriken, _super);
    function shuriken() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 0;
        _this.speed = 2300;
        _this.rigibody = null;
        _this.enemysHadHit = [];
        return _this;
    }
    shuriken.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.damage = playerHp_1.default.instance.damageShuriken;
    };
    shuriken.prototype.start = function () {
        var _this = this;
        var speed = GameManager_1.default.instance.playerController.skeleton.node.scaleX > 0 ? this.speed : -this.speed;
        this.rigibody.linearVelocity = cc.v2(speed, 0);
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 3);
    };
    shuriken.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        if (other.group == "enemy") {
            //击中敌人
            if (this.enemysHadHit.includes(other))
                return;
            //@ts-ignore
            other.getComponent(animationState_1.enemyScript[other.name]).beHit(this.damage, animationState_1.attackType.shuriken);
            this.enemysHadHit.push(other);
            //@ts-ignore
            other.getComponent(animationState_1.enemyScript[other.name]).playBeHitSound(audioNameMgr_1.audioName.airslash1);
        }
    };
    shuriken = __decorate([
        ccclass
    ], shuriken);
    return shuriken;
}(cc.Component));
exports.default = shuriken;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc2h1cmlrZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsZ0RBQTRDO0FBRTVDLG1EQUEyRDtBQUMzRCw2Q0FBd0M7QUFDeEMsMENBQXFDO0FBRS9CLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBOEJDO1FBNUJHLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsV0FBSyxHQUFXLElBQUksQ0FBQztRQUNyQixjQUFRLEdBQWlCLElBQUksQ0FBQztRQUM5QixrQkFBWSxHQUFtQixFQUFFLENBQUM7O0lBeUJ0QyxDQUFDO0lBdkJHLHlCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFDLGtCQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztJQUNqRCxDQUFDO0lBQ0Qsd0JBQUssR0FBTDtRQUFBLGlCQU1DO1FBTEcsSUFBSSxLQUFLLEdBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUNELGlDQUFjLEdBQWQsVUFBZSxPQUEwQixFQUFFLFlBQWdDLEVBQUUsYUFBaUM7UUFDMUcsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksT0FBTyxFQUFFO1lBQ3hCLE1BQU07WUFDTixJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFBRSxPQUFPO1lBQzdDLFlBQVk7WUFDWixLQUFLLENBQUMsWUFBWSxDQUFDLDRCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsMkJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixZQUFZO1lBQ1osS0FBSyxDQUFDLFlBQVksQ0FBQyw0QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyx3QkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25GO0lBQ0wsQ0FBQztJQTdCZ0IsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQThCNUI7SUFBRCxlQUFDO0NBOUJELEFBOEJDLENBOUJxQyxFQUFFLENBQUMsU0FBUyxHQThCakQ7a0JBOUJvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGF1ZGlvTmFtZSB9IGZyb20gXCIuLi9hdWRpb05hbWVNZ3JcIjtcbmltcG9ydCBhdWRpb01hbmFnZXIgZnJvbSBcIi4uL21haW4vYXVkaW9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBhdHRhY2tUeXBlLCBlbmVteVNjcmlwdCB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcbmltcG9ydCBwbGF5ZXJIcCBmcm9tIFwiLi91aS9wbGF5ZXJIcFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2h1cmlrZW4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgZGFtYWdlOm51bWJlcj0wO1xuICAgIHNwZWVkOiBudW1iZXIgPSAyMzAwO1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIGVuZW15c0hhZEhpdDogQXJyYXk8Y2MuTm9kZT4gPSBbXTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICAgICAgdGhpcy5kYW1hZ2U9cGxheWVySHAuaW5zdGFuY2UuZGFtYWdlU2h1cmlrZW47XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICBsZXQgc3BlZWQgPSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IHRoaXMuc3BlZWQgOiAtdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHNwZWVkLCAwKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgfSwgMyk7XG4gICAgfVxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3Q6IGNjLlBoeXNpY3NDb250YWN0LCBzZWxmQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlciwgb3RoZXJDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlciA9IG90aGVyQ29sbGlkZXIubm9kZTtcbiAgICAgICAgaWYgKG90aGVyLmdyb3VwID09IFwiZW5lbXlcIikge1xuICAgICAgICAgICAgLy/lh7vkuK3mlYzkurpcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlzSGFkSGl0LmluY2x1ZGVzKG90aGVyKSkgcmV0dXJuO1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBvdGhlci5nZXRDb21wb25lbnQoZW5lbXlTY3JpcHRbb3RoZXIubmFtZV0pLmJlSGl0KHRoaXMuZGFtYWdlLCBhdHRhY2tUeXBlLnNodXJpa2VuKTtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlzSGFkSGl0LnB1c2gob3RoZXIpO1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBvdGhlci5nZXRDb21wb25lbnQoZW5lbXlTY3JpcHRbb3RoZXIubmFtZV0pLnBsYXlCZUhpdFNvdW5kKGF1ZGlvTmFtZS5haXJzbGFzaDEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19