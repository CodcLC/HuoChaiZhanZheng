"use strict";
cc._RF.push(module, '4228fWsEGBIiYISQtcKtF0Q', 'enemyHitCollider');
// scripts/game/enemyHitCollider.ts

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
var animationState_1 = require("./animationState");
var playerController_1 = require("./playerController");
var bossHp_1 = require("./ui/bossHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemyHitCollider = /** @class */ (function (_super) {
    __extends(enemyHitCollider, _super);
    function enemyHitCollider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyControl = null;
        _this.player = null;
        return _this;
    }
    enemyHitCollider.prototype.onDisable = function () {
        this.player = null;
    };
    enemyHitCollider.prototype.hit = function (enemy, dmg, isKnockDown) {
        if (isKnockDown === void 0) { isKnockDown = false; }
        if (this.player) {
            this.player.getComponent(playerController_1.default).beHit(enemy, dmg, isKnockDown);
        }
    };
    enemyHitCollider.prototype.onCollisionEnter = function (other, self) {
        if (other.node.group == "player") {
            this.player = other.node;
            if (this.enemyControl != null) {
                if (this.enemyControl.node.name == bossHp_1.bossName.enemy10) {
                    this.enemyControl.hit_rush();
                }
                else if (this.enemyControl.node.name == animationState_1.enemyName.bigSquid) {
                    this.enemyControl.hit();
                }
                else if (this.enemyControl.node.name == bossHp_1.bossName.enemy39) {
                    this.enemyControl.laserHit();
                }
                else if (this.enemyControl.node.name == animationState_1.enemyName.enemy18) {
                    this.enemyControl.hit();
                }
            }
        }
    };
    enemyHitCollider.prototype.onCollisionExit = function (other, self) {
        this.player = null;
    };
    enemyHitCollider = __decorate([
        ccclass
    ], enemyHitCollider);
    return enemyHitCollider;
}(cc.Component));
exports.default = enemyHitCollider;

cc._RF.pop();