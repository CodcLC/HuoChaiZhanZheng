"use strict";
cc._RF.push(module, 'ed69cR0Xx9JtLNKx4qGNDOH', 'arrow');
// scripts/game/arrow.ts

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
var playerController_1 = require("./playerController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var arrow = /** @class */ (function (_super) {
    __extends(arrow, _super);
    function arrow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.force = 1800;
        _this.speedX = 0;
        _this.speedY = { num: 0 };
        _this.damage = 0;
        _this.a = 0;
        _this.enemy = null;
        _this.isHit = false;
        _this.isTweenEnd = false;
        _this.rigibody = null;
        _this.time = 0;
        _this.playerPosition = null;
        return _this;
    }
    arrow.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
    };
    arrow.prototype.start = function () {
        var _this = this;
        var direct = caijiTools_1.caijiTools.getDirection(this.node.angle + 90).normalizeSelf();
        this.speedX = direct.x * this.force;
        this.speedY.num = direct.y * this.force;
        this.time = Math.abs(this.playerPosition.x - this.node.x) / Math.abs(this.speedX);
        this.time = this.time < 0.15 ? this.time - 0.06 : this.time - 0.09;
        this.a = this.speedY.num * 2 / this.time; //v1=v0-at
        cc.tween(this.speedY)
            .to(this.time, { num: -this.speedY.num })
            .call(function () {
            _this.isTweenEnd = true;
        })
            .start();
    };
    arrow.prototype.update = function (dt) {
        if (this.isHit)
            return;
        if (this.isTweenEnd) {
            this.speedY.num -= this.a * dt * 0.9;
        }
        this.rigibody.linearVelocity = cc.v2(this.speedX, this.speedY.num);
        var linearVelocity = this.rigibody.linearVelocity;
        var angle = caijiTools_1.caijiTools.getAngleDependY(linearVelocity.x, linearVelocity.y);
        this.node.angle = -angle - 90;
    };
    arrow.prototype.onCollisionEnter = function (other, self) {
        if (other.node.group == "player") {
            if (this.isHit)
                return;
            this.isHit = true;
            other.node.getComponent(playerController_1.default).beHit(this.enemy, this.damage);
        }
    };
    arrow.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var _this = this;
        var other = otherCollider.node;
        if (other.group == "ground") {
            this.isHit = true;
            this.Destroy();
            this.rigibody.linearVelocity = cc.v2(this.rigibody.linearVelocity.x * 0.3, this.rigibody.linearVelocity.y * 0.3);
            this.scheduleOnce(function () {
                _this.rigibody.linearVelocity = cc.v2(0, 0);
                _this.rigibody.type = cc.RigidBodyType.Static;
            }, 0);
        }
    };
    arrow.prototype.Destroy = function () {
        var _this = this;
        this.scheduleOnce(function () {
            cc.tween(_this.node)
                .to(0.3, { opacity: 0 })
                .call(function () {
                _this.node.destroy();
            })
                .start();
        }, 1);
    };
    arrow = __decorate([
        ccclass
    ], arrow);
    return arrow;
}(cc.Component));
exports.default = arrow;

cc._RF.pop();