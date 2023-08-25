"use strict";
cc._RF.push(module, '01e05IoNoRJAa0EdrjqKjl7', 'swordItem');
// scripts/game/swordItem.ts

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
var caijiTools_1 = require("../caijiTools");
var rock_1 = require("./rock");
var skillPool_1 = require("./skillPool");
var swordSmoke_1 = require("./swordSmoke");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var swordItem = /** @class */ (function (_super) {
    __extends(swordItem, _super);
    function swordItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRight = false;
        _this.isDestory = false;
        _this.rightAngle = 138;
        _this.leftAngle = 42;
        _this.offsetX = 74;
        _this.offsetY = -67;
        _this.movex1 = 0;
        _this.movey1 = 0;
        _this.movex2 = 0;
        _this.movey2 = 0;
        _this.damage = 0;
        _this.enemysHadHit = [];
        return _this;
    }
    swordItem.prototype.onLoad = function () {
        this.movex1 = this.offsetX * 0.3;
        this.movey1 = this.offsetY * 0.3;
        this.movex2 = this.offsetX * 5;
        this.movey2 = this.offsetY * 5;
    };
    swordItem.prototype.onEnable = function () {
    };
    swordItem.prototype.init = function () {
        this.movex1 = this.isRight ? Math.abs(this.movex1) : -Math.abs(this.movex1);
        this.movex2 = this.isRight ? Math.abs(this.movex2) : -Math.abs(this.movex2);
    };
    swordItem.prototype.tween = function () {
        var _this = this;
        //cc.v2(74,67);
        this.init();
        var scaleXOffset = caijiTools_1.caijiTools.random_int(50, 60) / 10;
        this.node.angle = this.isRight ? this.rightAngle : this.leftAngle;
        cc.tween(this.node)
            .by(0.04, { scale: 1 })
            .by(0.12, { position: cc.v3(this.movex1, this.movey1) })
            .parallel(cc.tween().by(0.1, { scaleX: scaleXOffset }, { easing: "sineIn" }), cc.tween().by(0.1, { scaleY: -0.5, position: cc.v3(this.movex2, this.movey2) }))
            .start();
        this.scheduleOnce(function () {
            skillPool_1.default.instance.recoverySword1(_this.node);
        }, 0.25);
    };
    /*     onBeginContact (contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider) {
            let other=otherCollider.node;
            let pos=contact.getWorldManifold();
            contact.disabled=true;
            if (other.group == "ground") {
                //落地
                if(this.isDestory) return;
                this.isDestory=true;
                this.createSmoke(pos.points[0],other);
            }else if(other.group=="enemy"){
                //击中敌人
                if(this.enemysHadHit.includes(other)) return;
                //@ts-ignore
                other.getComponent(enemyScript[other.name]).beHit(this.damage, attackType.swordRain);
                this.enemysHadHit.push(other);
            }
        } */
    swordItem.prototype.createSmoke = function (collidePos, ground) {
        var smoke = skillPool_1.default.instance.getSwordSmoke();
        var nodePos = this.node.parent.parent.convertToNodeSpaceAR(collidePos);
        nodePos.x = nodePos.x + caijiTools_1.caijiTools.random_int(-300, 100) / 10;
        nodePos.y = nodePos.y + caijiTools_1.caijiTools.random_int(100, 500) / 10;
        smoke.setParent(this.node.parent.parent);
        smoke.setSiblingIndex(ground.getSiblingIndex() - 1);
        smoke.setPosition(nodePos);
        smoke.getComponent(swordSmoke_1.default).tween();
        smoke.active = true;
        this.createRock(nodePos);
        skillPool_1.default.instance.recoverySword1(this.node);
    };
    swordItem.prototype.createRock = function (pos) {
        var rockNode = skillPool_1.default.instance.getRock();
        rockNode.setParent(this.node.parent.parent);
        rockNode.setPosition(pos);
        rockNode.getComponent(rock_1.default).tween();
        rockNode.setSiblingIndex(rockNode.getSiblingIndex() - 1);
        rockNode.active = true;
    };
    swordItem.prototype.reuse = function () {
        cc.Tween.stopAllByTarget(this.node);
        this.isDestory = false;
    };
    swordItem.prototype.unuse = function () {
        this.node.scale = 0;
        this.enemysHadHit = [];
    };
    swordItem = __decorate([
        ccclass
    ], swordItem);
    return swordItem;
}(cc.Component));
exports.default = swordItem;

cc._RF.pop();