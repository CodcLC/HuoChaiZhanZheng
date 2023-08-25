"use strict";
cc._RF.push(module, '5f3ce52MshLyYdrlbm7o2pi', 'enemyDieEffect');
// scripts/game/enemyDieEffect.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemyDieEffect = /** @class */ (function (_super) {
    __extends(enemyDieEffect, _super);
    function enemyDieEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.force_x = 10000;
        _this.force_y = 17000;
        _this.animation = null;
        return _this;
        // update (dt) {}
    }
    enemyDieEffect.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    enemyDieEffect.prototype.start = function () {
        var _this = this;
        this.play();
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 2);
    };
    ;
    enemyDieEffect.prototype.play = function () {
        var x = 0;
        var y = 0;
        this.node.children[0].angle = caijiTools_1.caijiTools.random_int(0, 360);
        this.animation.play();
        for (var _i = 0, _a = this.node.children[1].children; _i < _a.length; _i++) {
            var child = _a[_i];
            x = caijiTools_1.caijiTools.random_int(-50, 50) / 100;
            y = caijiTools_1.caijiTools.random_int(30, 100) / 100;
            var normal = cc.v2(x, y).normalizeSelf();
            var rigibody = child.getComponent(cc.RigidBody);
            rigibody.applyAngularImpulse(caijiTools_1.caijiTools.random_int(-500, 500), false);
            rigibody.applyForceToCenter(cc.v2(normal.x * this.force_x, normal.y * this.force_y), true);
        }
    };
    enemyDieEffect = __decorate([
        ccclass
    ], enemyDieEffect);
    return enemyDieEffect;
}(cc.Component));
exports.default = enemyDieEffect;

cc._RF.pop();