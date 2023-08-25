"use strict";
cc._RF.push(module, '0675bN9UYNGM7cJdm6ys4IM', 'dropBloodBottle');
// scripts/game/dropBloodBottle.ts

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
var GameManager_1 = require("./GameManager");
var playerHp_1 = require("./ui/playerHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dropBloodBottle = /** @class */ (function (_super) {
    __extends(dropBloodBottle, _super);
    function dropBloodBottle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hp = 100;
        _this.forceX = 30000;
        _this.forceY = 20000;
        _this.rigibody = null;
        _this.isMoveToPlayer = false;
        _this.speed = 500;
        _this.targetPosition = null;
        return _this;
    }
    dropBloodBottle.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
    };
    dropBloodBottle.prototype.start = function () {
        this.forceX = this.node.x > GameManager_1.default.instance.player.x ? this.forceX : -this.forceX;
        this.rigibody.applyForceToCenter(cc.v2(this.forceX, this.forceY), false);
    };
    dropBloodBottle.prototype.update = function () {
        if (this.isMoveToPlayer) {
            this.moveToPlayer();
        }
    };
    dropBloodBottle.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        if (other.group == "ground") {
            this.rigibody.linearVelocity = cc.v2(0, 0);
        }
        else if (other.group == "player" && other.name == "player") {
            if (GameManager_1.default.instance.playerController.isDie)
                return;
            contact.disabled = true;
            this.isMoveToPlayer = true;
        }
    };
    dropBloodBottle.prototype.moveToPlayer = function () {
        this.targetPosition = cc.v3(GameManager_1.default.instance.player.x, GameManager_1.default.instance.player.y + 70);
        var direct = this.targetPosition.sub(this.node.position).normalizeSelf();
        this.rigibody.linearVelocity = cc.v2(direct.x * this.speed, direct.y * this.speed);
        var len = this.targetPosition.sub(this.node.position).len();
        if (len < 10) {
            this.addHp();
            this.node.active = false;
            this.node.destroy();
        }
    };
    dropBloodBottle.prototype.addHp = function () {
        this.rigibody.enabledContactListener = false;
        playerHp_1.default.instance.addHp(this.hp);
        this.node.destroy();
    };
    dropBloodBottle = __decorate([
        ccclass
    ], dropBloodBottle);
    return dropBloodBottle;
}(cc.Component));
exports.default = dropBloodBottle;

cc._RF.pop();