"use strict";
cc._RF.push(module, 'f1a83cX+ipL2ZseGzqWEkm5', 'coinDrop');
// scripts/game/coinDrop.ts

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
var data_1 = require("../sdk/data");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var coinDrop = /** @class */ (function (_super) {
    __extends(coinDrop, _super);
    function coinDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.coinNumer = 1;
        _this.targetPosition = null;
        _this.isPickUpTime = false;
        _this.rigibody = null;
        _this.circleCollider = null;
        _this.speed = 1200;
        _this.isDropFloor = false;
        return _this;
    }
    coinDrop.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.circleCollider = this.node.getComponent(cc.PhysicsCircleCollider);
    };
    coinDrop.prototype.start = function () {
        var _this = this;
        GameManager_1.default.instance.dropCoins.push(this.node);
        this.addForce();
        this.scheduleOnce(function () {
            _this.startMoveToPlayer();
        }, 1.5);
    };
    coinDrop.prototype.addForce = function () {
        var force_x = caijiTools_1.caijiTools.random_int(-60, 60) * 150;
        var force_y = caijiTools_1.caijiTools.random_int(30, 60) * 150;
        this.rigibody.applyForceToCenter(cc.v2(force_x, force_y), true);
    };
    coinDrop.prototype.startMoveToPlayer = function () {
        this.isPickUpTime = true;
        this.closeDamping();
    };
    coinDrop.prototype.update = function (dt) {
        if (this.isPickUpTime) {
            this.moveToPlayer();
        }
    };
    coinDrop.prototype.lateUpdate = function () {
        if (this.rigibody.linearVelocity.len() < 10) {
            if (this.circleCollider.restitution == 0)
                return;
            this.rigibody.linearVelocity = cc.v2(0, 0);
            this.circleCollider.restitution = 0;
            this.circleCollider.apply();
        }
    };
    coinDrop.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        if (other.group == "ground") {
            this.openDamping();
        }
        else if (other.group == "player") {
            contact.disabled = true;
        }
    };
    coinDrop.prototype.addCoin = function () {
        var coin = Number(data_1.data.getCache("Base", "coin")) + this.coinNumer;
        data_1.data.updateCache("Base", "coin", coin);
    };
    coinDrop.prototype.moveToPlayer = function () {
        this.targetPosition = cc.v3(GameManager_1.default.instance.player.x, GameManager_1.default.instance.player.y + 70);
        var direct = this.targetPosition.sub(this.node.position).normalizeSelf();
        this.rigibody.linearVelocity = cc.v2(direct.x * this.speed, direct.y * this.speed);
        var len = this.targetPosition.sub(this.node.position).len();
        if (len < 15) {
            this.addCoin();
            this.node.active = false;
            this.node.destroy();
        }
    };
    coinDrop.prototype.openDamping = function () {
        if (this.isDropFloor)
            return;
        this.isDropFloor = true;
        this.rigibody.linearDamping = 2;
        this.rigibody.angularDamping = 2;
    };
    coinDrop.prototype.closeDamping = function () {
        this.rigibody.linearDamping = 0;
    };
    coinDrop = __decorate([
        ccclass
    ], coinDrop);
    return coinDrop;
}(cc.Component));
exports.default = coinDrop;

cc._RF.pop();