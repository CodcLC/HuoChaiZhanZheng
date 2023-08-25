"use strict";
cc._RF.push(module, 'ad476I6etJEKIa5lvs53N9f', 'thunder_burstParent');
// scripts/game/thunder_burstParent.ts

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
var audioManager_1 = require("../main/audioManager");
var skillPool_1 = require("./skillPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var thunder_burstParent = /** @class */ (function (_super) {
    __extends(thunder_burstParent, _super);
    function thunder_burstParent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.thunderBallPrefab = null;
        _this.speed = 500;
        _this.numer = 0;
        _this.wave = 0;
        _this.direction = [
            cc.v2(-0.31, 0.95), cc.v2(-0.81, 0.59), cc.v2(-1.00, 0.00),
            cc.v2(1.00, -0.00), cc.v2(0.81, 0.59), cc.v2(0.31, 0.95),
        ];
        return _this;
    }
    /*     direction:Array<cc.Vec2>=[
            cc.v2(-0.31, 0.95),cc.v2(-0.81, 0.59),cc.v2(-1.00, 0.00),cc.v2(-0.81, -0.59),cc.v2(-0.31, -0.95),
            cc.v2(0.31, -0.95),cc.v2(0.81, -0.59),cc.v2(1.00, -0.00),cc.v2(0.81, 0.59),cc.v2(0.31, 0.95),
        ]; */
    // onLoad () {}
    thunder_burstParent.prototype.start = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E27StormBurst);
        this.createThunderBallRound();
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 10);
    };
    thunder_burstParent.prototype.createThunderBallRound = function () {
        var _this = this;
        this.wave++;
        for (var i = 0; i < 6; i++) {
            this.getThunderBall();
        }
        this.speed *= (0.7 - this.wave / 10);
        if (this.wave < 3) {
            this.scheduleOnce(function () {
                _this.createThunderBallRound();
            }, 0.2);
        }
    };
    thunder_burstParent.prototype.getThunderBall = function () {
        var ball = skillPool_1.default.instance.getThunderBall();
        ball.setParent(this.node);
        ball.setPosition(0, 0);
        ball.setSiblingIndex(1);
        ball.active = true;
        var index = this.numer % 6;
        ball.getComponent(cc.RigidBody).linearVelocity =
            cc.v2(this.direction[index].x * this.speed, this.direction[index].y * this.speed);
        this.numer++;
    };
    __decorate([
        property(cc.Prefab)
    ], thunder_burstParent.prototype, "thunderBallPrefab", void 0);
    thunder_burstParent = __decorate([
        ccclass
    ], thunder_burstParent);
    return thunder_burstParent;
}(cc.Component));
exports.default = thunder_burstParent;

cc._RF.pop();