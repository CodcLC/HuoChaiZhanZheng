
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/playerColliderAttack1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c6cfa/Wi6lE/Jia0/lKz1xr', 'playerColliderAttack1');
// scripts/game/playerColliderAttack1.ts

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
var playerColliderAttack1 = /** @class */ (function (_super) {
    __extends(playerColliderAttack1, _super);
    function playerColliderAttack1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemys = [];
        _this.enemysHadHit = [];
        return _this;
    }
    playerColliderAttack1.prototype.onDisable = function () {
        this.enemys = [];
        this.enemysHadHit = [];
    };
    playerColliderAttack1.prototype.hit = function (damgeScale, attackType) {
        //console.log(damgeScale,attackType);
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.swoosh1);
        if (this.enemys.length == 0)
            return;
        for (var _i = 0, _a = this.enemys; _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (this.enemysHadHit.includes(enemy))
                continue;
            //@ts-ignore
            enemy.getComponent(animationState_1.enemyScript[enemy.name]).beHit(damgeScale, attackType);
            this.enemysHadHit.push(enemy);
            //@ts-ignore
            enemy.getComponent(animationState_1.enemyScript[enemy.name]).playBeHitSound(audioNameMgr_1.audioName.slash1);
        }
    };
    playerColliderAttack1.prototype.onCollisionEnter = function (other, self) {
        this.enemys.push(other.node);
    };
    playerColliderAttack1.prototype.onCollisionExit = function (other, self) {
        var index = this.enemys.indexOf(other.node);
        this.enemys.splice(index, 1);
    };
    playerColliderAttack1 = __decorate([
        ccclass
    ], playerColliderAttack1);
    return playerColliderAttack1;
}(cc.Component));
exports.default = playerColliderAttack1;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxccGxheWVyQ29sbGlkZXJBdHRhY2sxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGdEQUE0QztBQUM1QyxxREFBZ0Q7QUFDaEQsbURBQTJEO0FBRXJELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW1ELHlDQUFZO0lBQS9EO1FBQUEscUVBNkJDO1FBM0JHLFlBQU0sR0FBbUIsRUFBRSxDQUFDO1FBQzVCLGtCQUFZLEdBQW1CLEVBQUUsQ0FBQzs7SUEwQnRDLENBQUM7SUF6QkcseUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRCxtQ0FBRyxHQUFILFVBQUksVUFBa0IsRUFBRSxVQUFzQjtRQUMxQyxxQ0FBcUM7UUFDckMsc0JBQVksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ3BDLEtBQWtCLFVBQVcsRUFBWCxLQUFBLElBQUksQ0FBQyxNQUFNLEVBQVgsY0FBVyxFQUFYLElBQVcsRUFBRTtZQUExQixJQUFJLEtBQUssU0FBQTtZQUNWLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUFFLFNBQVM7WUFDaEQsWUFBWTtZQUNaLEtBQUssQ0FBQyxZQUFZLENBQUMsNEJBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLFlBQVk7WUFDWixLQUFLLENBQUMsWUFBWSxDQUFDLDRCQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLHdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEY7SUFFTCxDQUFDO0lBQ0QsZ0RBQWdCLEdBQWhCLFVBQWlCLEtBQWtCLEVBQUUsSUFBaUI7UUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCwrQ0FBZSxHQUFmLFVBQWdCLEtBQWtCLEVBQUUsSUFBaUI7UUFDakQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBNUJnQixxQkFBcUI7UUFEekMsT0FBTztPQUNhLHFCQUFxQixDQTZCekM7SUFBRCw0QkFBQztDQTdCRCxBQTZCQyxDQTdCa0QsRUFBRSxDQUFDLFNBQVMsR0E2QjlEO2tCQTdCb0IscUJBQXFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGF1ZGlvTmFtZSB9IGZyb20gXCIuLi9hdWRpb05hbWVNZ3JcIjtcbmltcG9ydCBhdWRpb01hbmFnZXIgZnJvbSBcIi4uL21haW4vYXVkaW9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBhdHRhY2tUeXBlLCBlbmVteVNjcmlwdCB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwbGF5ZXJDb2xsaWRlckF0dGFjazEgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgZW5lbXlzOiBBcnJheTxjYy5Ob2RlPiA9IFtdO1xuICAgIGVuZW15c0hhZEhpdDogQXJyYXk8Y2MuTm9kZT4gPSBbXTtcbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlzID0gW107XG4gICAgICAgIHRoaXMuZW5lbXlzSGFkSGl0ID0gW107XG4gICAgfVxuICAgIGhpdChkYW1nZVNjYWxlOiBudW1iZXIsIGF0dGFja1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYW1nZVNjYWxlLGF0dGFja1R5cGUpO1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5zd29vc2gxKTtcbiAgICAgICAgaWYgKHRoaXMuZW5lbXlzLmxlbmd0aCA9PSAwKSByZXR1cm47XG4gICAgICAgIGZvciAobGV0IGVuZW15IG9mIHRoaXMuZW5lbXlzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmVteXNIYWRIaXQuaW5jbHVkZXMoZW5lbXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgZW5lbXkuZ2V0Q29tcG9uZW50KGVuZW15U2NyaXB0W2VuZW15Lm5hbWVdKS5iZUhpdChkYW1nZVNjYWxlLCBhdHRhY2tUeXBlKTtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlzSGFkSGl0LnB1c2goZW5lbXkpO1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBlbmVteS5nZXRDb21wb25lbnQoZW5lbXlTY3JpcHRbZW5lbXkubmFtZV0pLnBsYXlCZUhpdFNvdW5kKGF1ZGlvTmFtZS5zbGFzaDEpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjogY2MuQ29sbGlkZXIsIHNlbGY6IGNjLkNvbGxpZGVyKSB7XG4gICAgICAgIHRoaXMuZW5lbXlzLnB1c2gob3RoZXIubm9kZSk7XG4gICAgfVxuICAgIG9uQ29sbGlzaW9uRXhpdChvdGhlcjogY2MuQ29sbGlkZXIsIHNlbGY6IGNjLkNvbGxpZGVyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZW5lbXlzLmluZGV4T2Yob3RoZXIubm9kZSk7XG4gICAgICAgIHRoaXMuZW5lbXlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufVxuIl19