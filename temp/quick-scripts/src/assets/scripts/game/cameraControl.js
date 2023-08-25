"use strict";
cc._RF.push(module, '0c02ciEqSJJmLZwwwoTkkhj', 'cameraControl');
// scripts/game/cameraControl.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var cameraControl = /** @class */ (function (_super) {
    __extends(cameraControl, _super);
    function cameraControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cameraNode = null;
        _this.mainCamera = null;
        _this.offsetX = 0; //相机移动条件:与玩家X轴相差临界值
        _this.y_min = -200;
        _this.y_max = 90;
        _this.maxOffsetX = [
            1300, 50, 1000, 0, 320, 250, 250, 800, 450, 0,
            1000, 1100, 650, 1000, 1000, 1000, 0, 1100, 1800, 1100
        ];
        return _this;
    }
    cameraControl_1 = cameraControl;
    cameraControl.prototype.onLoad = function () {
        cameraControl_1.instance = this;
        this.cameraNode = this.node;
        this.offsetX = 0; //cc.winSize.width/2*0.4;
        this.mainCamera = this.node.getComponent(cc.Camera);
    };
    cameraControl.prototype.start = function () {
    };
    cameraControl.prototype.update = function (dt) {
        if (GameManager_1.default.instance.playerController == null)
            return;
        var worldPos_player = GameManager_1.default.instance.player.parent.convertToWorldSpaceAR(GameManager_1.default.instance.player.position);
        var nodePos_player = this.node.parent.convertToNodeSpaceAR(worldPos_player);
        this.changeCameraX(nodePos_player);
    };
    cameraControl.prototype.changeCameraY = function (screenPos, nodePos_player) {
        var newY = 0;
        if ((screenPos.y - 320) > 70) {
            newY = nodePos_player.y - 70;
            newY = newY > this.y_max ? this.y_max : newY;
            this.node.y = cc.misc.lerp(this.node.y, newY, 0.05);
        }
        else if (screenPos.y < 250) {
            newY = nodePos_player.y + 70;
            newY = newY < this.y_min ? this.y_min : newY;
            this.node.y = cc.misc.lerp(this.node.y, newY, 0.1);
        }
    };
    cameraControl.prototype.changeCameraX = function (nodePos_player) {
        if (Math.abs(nodePos_player.x - this.node.x) >= this.offsetX) {
            if ((this.node.x <= 0 && this.node.x > nodePos_player.x) ||
                (this.node.x >= this.maxOffsetX[0] && this.node.x < nodePos_player.x)) {
                return;
            }
            var newX = nodePos_player.x > this.node.x ? nodePos_player.x - this.offsetX : nodePos_player.x + this.offsetX;
            this.node.x = cc.misc.lerp(this.node.x, newX, 0.1);
        }
    };
    cameraControl.prototype.getPlayerPosInBuildCamera = function (player) {
        var screenPos = new cc.Vec2();
        var toWorldPos = player.parent.convertToWorldSpaceAR(player.getPosition());
        this.mainCamera.getWorldToScreenPoint(toWorldPos, screenPos);
        return screenPos;
    };
    cameraControl.prototype.changeCameraView = function (time, position, zoomRatio) {
        cc.tween(this.node)
            .to(time, { position: position }, { easing: "sineOut" })
            .start();
        cc.tween(this.mainCamera)
            .to(time, { zoomRatio: zoomRatio }, { easing: "sineOut" })
            .start();
    };
    var cameraControl_1;
    cameraControl.instance = null;
    cameraControl = cameraControl_1 = __decorate([
        ccclass
    ], cameraControl);
    return cameraControl;
}(cc.Component));
exports.default = cameraControl;

cc._RF.pop();