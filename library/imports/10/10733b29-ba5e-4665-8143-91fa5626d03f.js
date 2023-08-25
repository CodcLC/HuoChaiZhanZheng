"use strict";
cc._RF.push(module, '10733spul5GZYFDkfpWJtA/', 'skillPool');
// scripts/game/skillPool.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var skillPool = /** @class */ (function (_super) {
    __extends(skillPool, _super);
    function skillPool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.swordItem = null;
        _this.swordItem2 = null;
        _this.swordSmoke = null;
        _this.rockPrefab = null;
        _this.thunderBallPrefab = null;
        _this.swordPool = new cc.NodePool("swordItem");
        _this.sword2Pool = new cc.NodePool("swordItem2");
        _this.swordSmokePool = new cc.NodePool("swordSmoke");
        _this.rockPool = new cc.NodePool("rock");
        _this.thunderBallPool = new cc.NodePool("thunderBall_burst");
        return _this;
    }
    skillPool_1 = skillPool;
    skillPool.prototype.onLoad = function () {
        skillPool_1.instance = this;
    };
    skillPool.prototype.onDisable = function () {
        this.rockPool.clear();
        this.swordPool.clear();
        this.sword2Pool.clear();
        this.swordSmokePool.clear();
        this.thunderBallPool.clear();
    };
    skillPool.prototype.start = function () {
        this.init();
    };
    skillPool.prototype.init = function () {
        this.createThunderBall();
        this.createSword();
        this.createSword2();
        this.createSwordSmoke();
        this.createRock();
    };
    skillPool.prototype.createThunderBall = function () {
        for (var i = 0; i < 20; i++) {
            var thunderBall = cc.instantiate(this.thunderBallPrefab);
            thunderBall.name = thunderBall.name + i;
            this.thunderBallPool.put(thunderBall);
        }
    };
    skillPool.prototype.createSword = function () {
        for (var i = 0; i < 10; i++) {
            var sword = cc.instantiate(this.swordItem);
            sword.active = false;
            this.swordPool.put(sword);
        }
    };
    skillPool.prototype.createSword2 = function () {
        for (var i = 0; i < 12; i++) {
            var sword = cc.instantiate(this.swordItem2);
            this.sword2Pool.put(sword);
        }
    };
    skillPool.prototype.createSwordSmoke = function () {
        for (var i = 0; i < 15; i++) {
            var smoke = cc.instantiate(this.swordSmoke);
            this.swordSmokePool.put(smoke);
        }
    };
    skillPool.prototype.createRock = function () {
        for (var i = 0; i < 50; i++) {
            var rock = cc.instantiate(this.rockPrefab);
            this.rockPool.put(rock);
        }
    };
    skillPool.prototype.getThunderBall = function () {
        var thunderBall = this.thunderBallPool.get();
        if (!thunderBall) {
            thunderBall = cc.instantiate(this.thunderBallPrefab);
            thunderBall.name = thunderBall.name + this.thunderBallPool.size();
        }
        return thunderBall;
    };
    skillPool.prototype.recoveryThunderball = function (node) {
        this.thunderBallPool.put(node);
    };
    skillPool.prototype.getRock = function () {
        var rock = this.rockPool.get();
        if (!rock) {
            rock = cc.instantiate(this.rockPrefab);
        }
        return rock;
    };
    skillPool.prototype.recoveryRock = function (node) {
        this.rockPool.put(node);
    };
    skillPool.prototype.getSwordSmoke = function () {
        var smoke = this.swordSmokePool.get();
        if (!smoke) {
            smoke = cc.instantiate(this.swordSmoke);
        }
        return smoke;
    };
    skillPool.prototype.recoverySwordSmoke = function (node) {
        this.swordSmokePool.put(node);
    };
    skillPool.prototype.getSword1 = function () {
        var sword1 = this.swordPool.get();
        if (!sword1) {
            sword1 = cc.instantiate(this.swordItem);
        }
        return sword1;
    };
    skillPool.prototype.recoverySword1 = function (node) {
        this.swordPool.put(node);
    };
    skillPool.prototype.getSword2 = function () {
        var sword2 = this.sword2Pool.get();
        if (!sword2) {
            sword2 = cc.instantiate(this.swordItem2);
        }
        return sword2;
    };
    skillPool.prototype.recoverySword2 = function (node) {
        this.sword2Pool.put(node);
    };
    var skillPool_1;
    skillPool.instance = null;
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "swordItem", void 0);
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "swordItem2", void 0);
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "swordSmoke", void 0);
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "rockPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "thunderBallPrefab", void 0);
    skillPool = skillPool_1 = __decorate([
        ccclass
    ], skillPool);
    return skillPool;
}(cc.Component));
exports.default = skillPool;

cc._RF.pop();