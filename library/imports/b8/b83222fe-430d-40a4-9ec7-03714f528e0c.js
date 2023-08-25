"use strict";
cc._RF.push(module, 'b8322L+Qw1ApJ7HA3FPUo4M', 'thunder_jolt');
// scripts/game/thunder_jolt.ts

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
var cameraControl_1 = require("./cameraControl");
var enemyHitCollider_1 = require("./enemyHitCollider");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var thunder_jolt = /** @class */ (function (_super) {
    __extends(thunder_jolt, _super);
    function thunder_jolt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTurn = false;
        _this.speed_x = 300;
        _this.speed_y = 0;
        _this.speedMax_y = 300;
        _this.damage = 0;
        _this.rigibody = null;
        return _this;
    }
    thunder_jolt.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
    };
    thunder_jolt.prototype.start = function () {
    };
    thunder_jolt.prototype.update = function () {
        if (this.isTurn) {
            this.rigibody.linearVelocity = cc.v2(this.speed_x, this.rigibody.linearVelocity.y);
        }
        if (this.node.y < -500) {
            this.node.destroy();
        }
    };
    thunder_jolt.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        if (other.node.group == "player") {
            this.scheduleOnce(function () {
                _this.node.getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
            }, 0);
        }
    };
    thunder_jolt.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        if (other.group == "ground") {
            this.playerAudio();
            if (this.isTurn)
                return;
            this.isTurn = true;
            this.changDirection();
        }
        else if (other.group == "player") {
            contact.disabled = true;
        }
    };
    thunder_jolt.prototype.playerAudio = function () {
        var worldPos = this.node.parent.convertToNodeSpaceAR(this.node.position);
        var screenPos = cameraControl_1.default.instance.mainCamera.getWorldToScreenPoint(worldPos);
        if (screenPos.x < 0 && screenPos.x > -cc.winSize.width) {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.E27LightningJolt);
        }
    };
    thunder_jolt.prototype.changDirection = function () {
        this.speed_x = this.node.x > GameManager_1.default.instance.player.x ? -this.speed_x : this.speed_x;
    };
    thunder_jolt = __decorate([
        ccclass
    ], thunder_jolt);
    return thunder_jolt;
}(cc.Component));
exports.default = thunder_jolt;

cc._RF.pop();