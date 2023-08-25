
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/playerColliderAttack2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0249eb320lOdppO9lEMwV3p', 'playerColliderAttack2');
// scripts/game/playerColliderAttack2.ts

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
var audioManager_1 = require("../main/audioManager");
var animationState_1 = require("./animationState");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerColliderAttack2 = /** @class */ (function (_super) {
    __extends(playerColliderAttack2, _super);
    function playerColliderAttack2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemys = [];
        _this.enemysHadHit = [];
        return _this;
    }
    playerColliderAttack2.prototype.onDisable = function () {
        this.enemys = [];
        this.enemysHadHit = [];
    };
    playerColliderAttack2.prototype.hit = function (damgeScale, attackType) {
        //console.log(damgeScale,attackType);
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.swoosh2);
        for (var _i = 0, _a = this.enemys; _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (this.enemysHadHit.includes(enemy))
                continue;
            //@ts-ignore
            enemy.getComponent(animationState_1.enemyScript[enemy.name]).beHit(damgeScale, attackType);
            this.enemysHadHit.push(enemy);
            //@ts-ignore
            enemy.getComponent(animationState_1.enemyScript[enemy.name]).playBeHitSound(audioNameMgr_1.audioName.slash2);
        }
    };
    playerColliderAttack2.prototype.onCollisionEnter = function (other, self) {
        this.enemys.push(other.node);
    };
    playerColliderAttack2.prototype.onCollisionExit = function (other, self) {
        var index = this.enemys.indexOf(other.node);
        this.enemys.splice(index, 1);
    };
    playerColliderAttack2 = __decorate([
        ccclass
    ], playerColliderAttack2);
    return playerColliderAttack2;
}(cc.Component));
exports.default = playerColliderAttack2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxccGxheWVyQ29sbGlkZXJBdHRhY2syLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGdEQUE0QztBQUM1QyxxREFBZ0Q7QUFDaEQsbURBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW1ELHlDQUFZO0lBQS9EO1FBQUEscUVBMkJDO1FBekJHLFlBQU0sR0FBbUIsRUFBRSxDQUFDO1FBQzVCLGtCQUFZLEdBQW1CLEVBQUUsQ0FBQzs7SUF3QnRDLENBQUM7SUF2QkcseUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRCxtQ0FBRyxHQUFILFVBQUksVUFBa0IsRUFBRSxVQUFzQjtRQUMxQyxxQ0FBcUM7UUFDckMsc0JBQVksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxLQUFrQixVQUFXLEVBQVgsS0FBQSxJQUFJLENBQUMsTUFBTSxFQUFYLGNBQVcsRUFBWCxJQUFXLEVBQUU7WUFBMUIsSUFBSSxLQUFLLFNBQUE7WUFDVixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFBRSxTQUFTO1lBQ2hELFlBQVk7WUFDWixLQUFLLENBQUMsWUFBWSxDQUFDLDRCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixZQUFZO1lBQ1osS0FBSyxDQUFDLFlBQVksQ0FBQyw0QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyx3QkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hGO0lBQ0wsQ0FBQztJQUNELGdEQUFnQixHQUFoQixVQUFpQixLQUFrQixFQUFFLElBQWlCO1FBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsK0NBQWUsR0FBZixVQUFnQixLQUFrQixFQUFFLElBQWlCO1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQTFCZ0IscUJBQXFCO1FBRHpDLE9BQU87T0FDYSxxQkFBcUIsQ0EyQnpDO0lBQUQsNEJBQUM7Q0EzQkQsQUEyQkMsQ0EzQmtELEVBQUUsQ0FBQyxTQUFTLEdBMkI5RDtrQkEzQm9CLHFCQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZW5lbXlTY3JpcHQgfSBmcm9tIFwiLi9hbmltYXRpb25TdGF0ZVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGxheWVyQ29sbGlkZXJBdHRhY2syIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIGVuZW15czogQXJyYXk8Y2MuTm9kZT4gPSBbXTtcbiAgICBlbmVteXNIYWRIaXQ6IEFycmF5PGNjLk5vZGU+ID0gW107XG4gICAgb25EaXNhYmxlKCkge1xuICAgICAgICB0aGlzLmVuZW15cyA9IFtdO1xuICAgICAgICB0aGlzLmVuZW15c0hhZEhpdCA9IFtdO1xuICAgIH1cbiAgICBoaXQoZGFtZ2VTY2FsZTogbnVtYmVyLCBhdHRhY2tUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGFtZ2VTY2FsZSxhdHRhY2tUeXBlKTtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuc3dvb3NoMik7XG4gICAgICAgIGZvciAobGV0IGVuZW15IG9mIHRoaXMuZW5lbXlzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmVteXNIYWRIaXQuaW5jbHVkZXMoZW5lbXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgZW5lbXkuZ2V0Q29tcG9uZW50KGVuZW15U2NyaXB0W2VuZW15Lm5hbWVdKS5iZUhpdChkYW1nZVNjYWxlLCBhdHRhY2tUeXBlKTtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlzSGFkSGl0LnB1c2goZW5lbXkpO1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBlbmVteS5nZXRDb21wb25lbnQoZW5lbXlTY3JpcHRbZW5lbXkubmFtZV0pLnBsYXlCZUhpdFNvdW5kKGF1ZGlvTmFtZS5zbGFzaDIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXI6IGNjLkNvbGxpZGVyLCBzZWxmOiBjYy5Db2xsaWRlcikge1xuICAgICAgICB0aGlzLmVuZW15cy5wdXNoKG90aGVyLm5vZGUpO1xuICAgIH1cbiAgICBvbkNvbGxpc2lvbkV4aXQob3RoZXI6IGNjLkNvbGxpZGVyLCBzZWxmOiBjYy5Db2xsaWRlcikge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmVuZW15cy5pbmRleE9mKG90aGVyLm5vZGUpO1xuICAgICAgICB0aGlzLmVuZW15cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbn1cbiJdfQ==