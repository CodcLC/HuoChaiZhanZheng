"use strict";
cc._RF.push(module, '03977qAxU9L96D1Gfk1qnPV', 'swordRainCollider');
// scripts/game/swordRainCollider.ts

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
var data_1 = require("../sdk/data");
var animationState_1 = require("./animationState");
var playerHp_1 = require("./ui/playerHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var swordRainCollider = /** @class */ (function (_super) {
    __extends(swordRainCollider, _super);
    function swordRainCollider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 0;
        _this.interval = 0;
        _this.enemyTemp = [];
        return _this;
    }
    swordRainCollider.prototype.onEnable = function () {
        this.damage = playerHp_1.default.instance.damageSowrdRain;
        this.interval = Number(data_1.data.gameJson("swordRainInterval"));
    };
    swordRainCollider.prototype.start = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.schedule(_this.hit, _this.interval);
        }, 0.2);
    };
    swordRainCollider.prototype.hit = function () {
        for (var _i = 0, _a = this.enemyTemp; _i < _a.length; _i++) {
            var enemy = _a[_i];
            //@ts-ignore
            enemy.getComponent(animationState_1.enemyScript[enemy.name]).beHit(this.damage, animationState_1.attackType.swordRain);
            //@ts-ignore
            //enemy.getComponent(enemyScript[enemy.name]).playBeHitSound(audioName.slash2);
        }
    };
    swordRainCollider.prototype.onCollisionEnter = function (other, self) {
        if (this.enemyTemp.includes(other.node))
            return;
        this.enemyTemp.push(other.node);
    };
    swordRainCollider.prototype.onCollisionExit = function (other, self) {
        var index = this.enemyTemp.indexOf(other.node);
        this.enemyTemp.splice(index, 1);
    };
    swordRainCollider = __decorate([
        ccclass
    ], swordRainCollider);
    return swordRainCollider;
}(cc.Component));
exports.default = swordRainCollider;

cc._RF.pop();