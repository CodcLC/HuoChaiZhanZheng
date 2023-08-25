"use strict";
cc._RF.push(module, 'ce242gXaJRMQoU3t8b/OxK2', 'Joystick');
// scripts/game/ui/Joystick.ts

"use strict";
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
var GameManager_1 = require("../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var JoyStick = /** @class */ (function (_super) {
    __extends(JoyStick, _super);
    function JoyStick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.midNode = null;
        _this.joyBk = null;
        _this.maxR = 100;
        _this.zoom = 0.3;
        /*
            @property({
                type: cc.Component.EventHandler,
                displayName: '摇杆移动回调',
                tooltip: '触发touchmove后分发数据'
            }) */
        _this.joyCallBack = new cc.Component.EventHandler;
        _this.isKeyTouch_a = false;
        _this.isKeyTouch_d = false;
        return _this;
        // update (dt) {}
    }
    JoyStick_1 = JoyStick;
    JoyStick.prototype.onLoad = function () {
        JoyStick_1.instance = this;
        this.goBackMid();
    };
    JoyStick.prototype.init = function () {
        this.joyCallBack.target = GameManager_1.default.instance.player;
        this.joyCallBack.component = "playerController";
        this.joyCallBack.handler = "move";
        this.binEvent();
    };
    JoyStick.prototype.binEvent = function () {
        this.joyBk.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.joyBk.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.joyBk.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.joyBk.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
    };
    JoyStick.prototype.removeEvent = function () {
        this.joyBk.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.joyBk.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.joyBk.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.joyBk.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this);
    };
    JoyStick.prototype.goBackMid = function () {
        this.midNode.setPosition(0, 0);
    };
    JoyStick.prototype.onTouchStart = function (event) {
        var pos = this.node.convertToNodeSpaceAR(cc.v2(event.getLocation()));
        pos = cc.v2(pos.x * this.zoom, 0);
        this.clampPos(pos);
        this.midNode.setPosition(pos);
        this.joyCallBack.emit([pos]);
    };
    JoyStick.prototype.onTouchMove = function (event) {
        var pos = this.node.convertToNodeSpaceAR(cc.v2(event.getLocation()));
        pos = cc.v2(pos.x * this.zoom, 0);
        this.clampPos(pos);
        this.midNode.setPosition(pos);
        this.joyCallBack.emit([pos]);
    };
    JoyStick.prototype.onTouchEnd = function (e) {
        this.goBackMid();
        this.joyCallBack.emit([cc.v2(0, 0)]);
    };
    JoyStick.prototype.keyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.isKeyTouch_a = true;
                this.midNode.setPosition(-40, 0);
                this.joyCallBack.emit([cc.v2(-1, 0)]);
                break;
            case cc.macro.KEY.d:
                this.isKeyTouch_d = true;
                this.midNode.setPosition(40, 0);
                this.joyCallBack.emit([cc.v2(1, 0)]);
                break;
        }
    };
    JoyStick.prototype.keyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                if (this.isKeyTouch_d) {
                    this.isKeyTouch_a = false;
                    this.isKeyTouch_d = true;
                    this.midNode.setPosition(40, 0);
                    this.joyCallBack.emit([cc.v2(1, 0)]);
                    return;
                }
                this.isKeyTouch_a = false;
                this.goBackMid();
                this.joyCallBack.emit([cc.v2(0, 0)]);
                break;
            case cc.macro.KEY.d:
                if (this.isKeyTouch_a) {
                    this.isKeyTouch_d = false;
                    this.isKeyTouch_a = true;
                    this.midNode.setPosition(-40, 0);
                    this.joyCallBack.emit([cc.v2(-1, 0)]);
                    return;
                }
                this.isKeyTouch_d = false;
                this.goBackMid();
                this.joyCallBack.emit([cc.v2(0, 0)]);
                break;
        }
    };
    /**
     * 根据半径限制位置
     * @param pos
     */
    JoyStick.prototype.clampPos = function (pos) {
        var len = pos.mag();
        if (len > this.maxR) {
            var k = this.maxR / len;
            pos.x *= k;
            pos.y *= k;
        }
    };
    /**
     * 根据位置转化角度
     * @param pos
     */
    JoyStick.prototype.couvertToAngle = function (pos) {
        var r = Math.atan2(pos.y, pos.x);
        var d = cc.misc.radiansToDegrees(r);
        return d;
    };
    var JoyStick_1;
    JoyStick.instance = null;
    __decorate([
        property({
            type: cc.Node,
            displayName: '移动中心节点'
        })
    ], JoyStick.prototype, "midNode", void 0);
    __decorate([
        property({
            type: cc.Node,
            displayName: '摇杆背景节点'
        })
    ], JoyStick.prototype, "joyBk", void 0);
    __decorate([
        property({
            displayName: '摇杆活动半径'
        })
    ], JoyStick.prototype, "maxR", void 0);
    JoyStick = JoyStick_1 = __decorate([
        ccclass
    ], JoyStick);
    return JoyStick;
}(cc.Component));
exports.default = JoyStick;

cc._RF.pop();