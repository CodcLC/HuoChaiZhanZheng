"use strict";
cc._RF.push(module, 'adb3ap23ThHSafkgOKlkl0P', 'enemyBase');
// scripts/game/enemyBase.ts

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
exports.enemyAttribute = void 0;
var audioManager_1 = require("../main/audioManager");
var data_1 = require("../sdk/data");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemyAttribute;
(function (enemyAttribute) {
    enemyAttribute["hp"] = "hp";
    enemyAttribute["damage"] = "damage";
    enemyAttribute["dropCoinNumber"] = "dropCoinNumber";
    enemyAttribute["isSuperArmor"] = "isSuperArmor";
})(enemyAttribute = exports.enemyAttribute || (exports.enemyAttribute = {}));
var enemyBase = /** @class */ (function (_super) {
    __extends(enemyBase, _super);
    function enemyBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpMax = 0;
        _this.swordRainHitCd = 0.1;
        _this.damage = 0;
        _this.isSuperArmor = false; //是否霸体
        _this.isWuDi = false;
        return _this;
    }
    enemyBase.prototype.initData = function () {
        var level = Number(data_1.data.getCache("Base", "choseLevel"));
        var difficult = Number(data_1.data.getCache("levelStar", (level).toString()));
        var hpTimes = Number(data_1.data.gameJson("enemyHpTimes", difficult.toString()));
        var damageTimes = Number(data_1.data.gameJson("enemyDamageTimes", difficult.toString()));
        this.swordRainHitCd = Number(data_1.data.gameJson("swordRainInterval"));
        this.hpMax = Number(data_1.data.gameJson("enemyData", this.node.name, enemyAttribute.hp));
        this.damage = Number(data_1.data.gameJson("enemyData", this.node.name, enemyAttribute.damage));
        this.isSuperArmor = data_1.data.gameJson("enemyData", this.node.name, enemyAttribute.isSuperArmor);
        this.hpMax *= hpTimes;
        this.damage *= damageTimes;
    };
    enemyBase.prototype.dieCount = function () {
        GameManager_1.default.instance.killEnemyCount();
    };
    enemyBase.prototype.playBeHitSound = function (audioName) {
        if (this.isWuDi)
            return;
        audioManager_1.default.playAudio(audioName);
    };
    enemyBase = __decorate([
        ccclass
    ], enemyBase);
    return enemyBase;
}(cc.Component));
exports.default = enemyBase;

cc._RF.pop();