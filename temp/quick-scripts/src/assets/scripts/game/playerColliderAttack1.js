"use strict";
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