"use strict";
cc._RF.push(module, '93dcdNkO0BIy5Y7Sm4Qsff/', 'playerHp');
// scripts/game/ui/playerHp.ts

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
var data_1 = require("../../sdk/data");
var Events_1 = require("../Events");
var GameManager_1 = require("../GameManager");
var uiManager_1 = require("./uiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerHp = /** @class */ (function (_super) {
    __extends(playerHp, _super);
    function playerHp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpLabel = null;
        _this.hpBar = null;
        _this.cursor = null; //血条光标
        _this.bar = null;
        _this.damageScale = 0; //普攻1伤害值 （60,80,150）
        _this.damageShuriken = 0; //手里剑伤害
        _this.damageSowrdRain = 0; //剑雨伤害
        _this.hp_max = 0;
        _this.hp_now = 0;
        _this.damageLv = 0; //属性等级
        _this.healthLv = 0;
        _this.speedLv = 0;
        _this.damageIncremental = 0.2; //属性每级递增量
        _this.healthIncremental = 0.2;
        _this.speedIncremental = 0.1;
        _this.speedTimes = 0;
        _this.isOpenFullHp = false;
        return _this;
    }
    playerHp_1 = playerHp;
    playerHp.prototype.onLoad = function () {
        playerHp_1.instance = this;
    };
    playerHp.prototype.start = function () {
        this.init();
    };
    playerHp.prototype.init = function () {
        this.isOpenFullHp = false;
        this.damageLv = Number(data_1.data.getCache("attributeLv", "damage"));
        this.healthLv = Number(data_1.data.getCache("attributeLv", "health"));
        this.speedLv = Number(data_1.data.getCache("attributeLv", "speed"));
        this.hp_max = Number(data_1.data.getCache("Base", "playerHp")) * (1 + this.healthLv * this.healthIncremental);
        this.damageScale = Number(data_1.data.getCache("Base", "playerDamage")) * (1 + this.damageLv * this.damageIncremental);
        this.damageShuriken = Number(data_1.data.getCache("Base", "shurikenDamage")) * (1 + this.damageLv * this.damageIncremental);
        this.damageSowrdRain = Number(data_1.data.getCache("Base", "swordRainDamage")) * (1 + this.damageLv * this.damageIncremental);
        this.hp_now = this.hp_max;
        this.speedTimes = 1 + this.speedLv / 10;
        this.updateLabel();
    };
    playerHp.prototype.fullHp = function () {
        this.addHp(this.hp_max - this.hp_now);
    };
    playerHp.prototype.addHp = function (addNum, isRevive) {
        if (isRevive === void 0) { isRevive = false; }
        addNum = Math.floor(addNum);
        this.hp_now += addNum;
        this.hp_now = this.hp_now > this.hp_max ? this.hp_max : this.hp_now;
        this.updateLabel();
        var offsetX = GameManager_1.default.instance.playerController.skeleton.node.scaleX > 0 ? -35 : 35;
        Events_1.default.instance.showAddHp_player(GameManager_1.default.instance.player, addNum, offsetX, isRevive);
    };
    playerHp.prototype.updateHp = function (damage) {
        damage = Math.floor(damage);
        this.createBarFadeOut();
        this.hp_now -= damage;
        this.hp_now = this.hp_now < 0 ? 0 : this.hp_now;
        this.updateLabel();
        if (this.hp_now <= 0) {
            this.hp_now = 0;
            GameManager_1.default.instance.playerController.die();
        }
        if (GameManager_1.default.instance.playerController.isDie == false && this.isOpenFullHp == false) { //////////
            if (this.hp_now < this.hp_max / 3) {
                this.isOpenFullHp = true;
                uiManager_1.default.ins.showFullHpPopup();
            }
        }
    };
    playerHp.prototype.updateLabel = function () {
        this.hpBar.progress = this.hp_now / this.hp_max;
        this.cursor.x = this.hpBar.progress * 300;
        this.hpLabel.string = this.hp_now + "/" + this.hp_max;
    };
    playerHp.prototype.createBarFadeOut = function () {
        var newBar = cc.instantiate(this.bar);
        newBar.setParent(this.bar.parent);
        newBar.setPosition(this.bar.position);
        cc.tween(newBar)
            .to(0.3, { opacity: 0, color: cc.Color.WHITE })
            .call(function () {
            newBar.destroy();
        })
            .start();
    };
    var playerHp_1;
    playerHp.instance = null;
    __decorate([
        property(cc.Label)
    ], playerHp.prototype, "hpLabel", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], playerHp.prototype, "hpBar", void 0);
    __decorate([
        property(cc.Node)
    ], playerHp.prototype, "cursor", void 0);
    __decorate([
        property(cc.Node)
    ], playerHp.prototype, "bar", void 0);
    playerHp = playerHp_1 = __decorate([
        ccclass
    ], playerHp);
    return playerHp;
}(cc.Component));
exports.default = playerHp;

cc._RF.pop();