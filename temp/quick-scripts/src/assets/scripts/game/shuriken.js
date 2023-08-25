"use strict";
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