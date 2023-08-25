"use strict";
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