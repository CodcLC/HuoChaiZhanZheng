"use strict";
cc._RF.push(module, 'd90ddg5K2ZCTaUAEfzGYdUA', 'playerCollider');
// scripts/game/playerCollider.ts

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
var playerController_1 = require("./playerController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerCollider = /** @class */ (function (_super) {
    __extends(playerCollider, _super);
    function playerCollider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerController = null;
        _this.isFlying = false;
        return _this;
        // 每次将要处理碰撞体接触逻辑时被调用
        // onPreSolve (contact, selfCollider, otherCollider) {
        // }
        // 每次处理完碰撞体接触逻辑时被调用
        // onPostSolve (contact, selfCollider, otherCollider) {
        // }
    }
    playerCollider.prototype.onLoad = function () {
        this.playerController = this.node.getComponent(playerController_1.default);
    };
    // 只在两个碰撞体开始接触时被调用一次
    playerCollider.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
            this.isFlying = false;
            this.playerController.dropToGround();
        }
        else if (other.group == "wall") {
            contact.setFriction(0);
        }
    };
    // 只在两个碰撞体结束接触时被调用一次
    playerCollider.prototype.onEndContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
            this.isFlying = true;
        }
    };
    playerCollider = __decorate([
        ccclass
    ], playerCollider);
    return playerCollider;
}(cc.Component));
exports.default = playerCollider;

cc._RF.pop();