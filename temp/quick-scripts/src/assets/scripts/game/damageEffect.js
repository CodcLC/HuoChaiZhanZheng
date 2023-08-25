"use strict";
cc._RF.push(module, '996a64NhE9I8K6SbtCym/DI', 'damageEffect');
// scripts/game/damageEffect.ts

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
var damageTipPool_1 = require("./damageTipPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageEffect = /** @class */ (function (_super) {
    __extends(damageEffect, _super);
    function damageEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    damageEffect.prototype.onLoad = function () {
        var _this = this;
        this.node.getComponent(cc.Animation).on("finished", function () {
            damageTipPool_1.default.instance.recoveryDmgEffect(_this.node);
        });
    };
    damageEffect.prototype.onEnable = function () {
        this.node.getComponent(cc.Animation).play();
    };
    damageEffect.prototype.reuse = function () {
        this.node.angle = caijiTools_1.caijiTools.random_int(0, 360);
    };
    damageEffect.prototype.unuse = function () {
        this.node.active = false;
    };
    damageEffect = __decorate([
        ccclass
    ], damageEffect);
    return damageEffect;
}(cc.Component));
exports.default = damageEffect;

cc._RF.pop();