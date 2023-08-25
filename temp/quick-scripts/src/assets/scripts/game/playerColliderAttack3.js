"use strict";
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