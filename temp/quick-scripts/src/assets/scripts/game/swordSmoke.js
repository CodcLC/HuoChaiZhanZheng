"use strict";
cc._RF.push(module, 'ef6c5quedBNi5aAkI6Szgxv', 'swordSmoke');
// scripts/game/swordSmoke.ts

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
var skillPool_1 = require("./skillPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var swordSmoke = /** @class */ (function (_super) {
    __extends(swordSmoke, _super);
    function swordSmoke() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    swordSmoke.prototype.tween = function () {
        var _this = this;
        var scaleOffset = Math.random() * 0.4;
        this.node.scale = caijiTools_1.caijiTools.random_int(60, 100) / 100;
        cc.tween(this.node)
            .by(0.03, { scale: scaleOffset })
            .by(0.05, { opacity: -255 })
            .call(function () {
            skillPool_1.default.instance.recoverySwordSmoke(_this.node);
        })
            .start();
    };
    swordSmoke.prototype.reuse = function () {
    };
    swordSmoke.prototype.unuse = function () {
        this.node.opacity = 255;
        this.node.active = false;
    };
    swordSmoke = __decorate([
        ccclass
    ], swordSmoke);
    return swordSmoke;
}(cc.Component));
exports.default = swordSmoke;

cc._RF.pop();