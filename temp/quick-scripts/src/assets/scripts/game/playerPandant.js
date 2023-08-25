"use strict";
cc._RF.push(module, '67fc6T27PNOl4l9vGJy/Vcn', 'playerPandant');
// scripts/game/playerPandant.ts

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
var playerPandant = /** @class */ (function (_super) {
    __extends(playerPandant, _super);
    function playerPandant() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.player = null;
        _this.playerControl = null;
        _this.distanceX = 80;
        _this.distanceY = 80;
        _this.isInit = false;
        return _this;
    }
    playerPandant.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    playerPandant.prototype.start = function () {
    };
    playerPandant.prototype.init = function () {
        this.playerControl = this.player.getComponent(playerController_1.default);
        this.node.setPosition(this.player.x - this.distanceX, this.player.y + this.distanceY);
        this.node.active = true;
        this.isInit = true;
    };
    playerPandant.prototype.update = function (dt) {
        if (this.isInit) {
            this.follow();
        }
    };
    playerPandant.prototype.follow = function () {
        var newPos = cc.v3(0, this.player.y + this.distanceY);
        if (this.playerControl.skeleton.node.scaleX > 0) {
            newPos.x = this.player.x - this.distanceX;
        }
        else {
            newPos.x = this.player.x + this.distanceX;
        }
        this.node.position = this.node.position.lerp(newPos, 0.1);
    };
    playerPandant = __decorate([
        ccclass
    ], playerPandant);
    return playerPandant;
}(cc.Component));
exports.default = playerPandant;

cc._RF.pop();