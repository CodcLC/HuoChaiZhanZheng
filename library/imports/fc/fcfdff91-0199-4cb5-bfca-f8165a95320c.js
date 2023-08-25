"use strict";
cc._RF.push(module, 'fcfdf+RAZlMtb/K+BZalTIM', 'thunderBall_burst');
// scripts/game/thunderBall_burst.ts

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
var enemyBase_1 = require("./enemyBase");
var enemyHitCollider_1 = require("./enemyHitCollider");
var skillPool_1 = require("./skillPool");
var bossHp_1 = require("./ui/bossHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var thunderBall_burst = /** @class */ (function (_super) {
    __extends(thunderBall_burst, _super);
    function thunderBall_burst() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 0;
        _this.player = null;
        return _this;
    }
    thunderBall_burst.prototype.onLoad = function () {
        var level = Number(data_1.data.getCache("Base", "choseLevel"));
        var diff = Number(data_1.data.getCache("levelStar", level.toString()));
        var times = Number(data_1.data.gameJson("enemyDamageTimes", diff.toString()));
        this.damage = Number(data_1.data.gameJson("enemyData", bossHp_1.bossName.miniBoss, enemyBase_1.enemyAttribute.damage)) * times;
    };
    thunderBall_burst.prototype.onEnable = function () {
        var _this = this;
        this.scheduleOnce(function () {
            if (_this.player != null) {
                ;
                _this.node.getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
            }
            _this.scheduleOnce(function () {
                skillPool_1.default.instance.recoveryThunderball(_this.node);
            }, 1);
        }, 3.05);
    };
    thunderBall_burst.prototype.onCollisionEnter = function (other, self) {
        if (other.node.group == "player") {
            this.player = other.node;
        }
    };
    thunderBall_burst.prototype.onCollisionExit = function (other, self) {
        if (other.node.group == "player") {
            this.player = null;
        }
    };
    thunderBall_burst.prototype.reuse = function () {
    };
    thunderBall_burst.prototype.unuse = function () {
        this.node.active = false;
    };
    thunderBall_burst = __decorate([
        ccclass
    ], thunderBall_burst);
    return thunderBall_burst;
}(cc.Component));
exports.default = thunderBall_burst;

cc._RF.pop();