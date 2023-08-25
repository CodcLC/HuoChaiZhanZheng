"use strict";
cc._RF.push(module, '5e014wZt6BDQ7e81nuiqTaG', 'playerControlEvent');
// scripts/game/ui/playerControlEvent.ts

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
var GameManager_1 = require("../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerControlEvent = /** @class */ (function (_super) {
    __extends(playerControlEvent, _super);
    function playerControlEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rollCD = 0;
        _this.skill1CD = 0;
        _this.skill2CD = 0;
        _this.buttons = []; //0-attack 1-roll 2-jump 3-skill1 4-skill2
        _this.inited = false;
        _this.isRollCd = false;
        _this.isSkill1Cd = false;
        _this.isSkill2Cd = false;
        _this.isContinueAttack = false;
        return _this;
    }
    playerControlEvent_1 = playerControlEvent;
    playerControlEvent.prototype.onLoad = function () {
        playerControlEvent_1.instance = this;
    };
    playerControlEvent.prototype.init = function () {
        cc.tween(this.node).to(0.5, { opacity: 255 }).start();
        this.bindingEvent();
    };
    playerControlEvent.prototype.bindingEvent = function () {
        this.buttons[0].on(cc.Node.EventType.TOUCH_START, this.attack, this);
        this.buttons[0].on(cc.Node.EventType.TOUCH_END, this.attackTouchEnd, this);
        this.buttons[0].on(cc.Node.EventType.TOUCH_CANCEL, this.attackTouchEnd, this);
        this.buttons[1].on(cc.Node.EventType.TOUCH_START, this.roll, this);
        this.buttons[2].on(cc.Node.EventType.TOUCH_START, this.jump, this);
        this.buttons[3].on(cc.Node.EventType.TOUCH_START, this.skill1, this);
        this.buttons[4].on(cc.Node.EventType.TOUCH_START, this.skill2, this);
    };
    playerControlEvent.prototype.removeEvent = function () {
        this.isContinueAttack = false;
        this.buttons[0].off(cc.Node.EventType.TOUCH_START, this.attack, this);
        this.buttons[0].off(cc.Node.EventType.TOUCH_END, this.attackTouchEnd, this);
        this.buttons[0].off(cc.Node.EventType.TOUCH_CANCEL, this.attackTouchEnd, this);
        this.buttons[1].off(cc.Node.EventType.TOUCH_START, this.roll, this);
        this.buttons[2].off(cc.Node.EventType.TOUCH_START, this.jump, this);
        this.buttons[3].off(cc.Node.EventType.TOUCH_START, this.skill1, this);
        this.buttons[4].off(cc.Node.EventType.TOUCH_START, this.skill2, this);
    };
    playerControlEvent.prototype.attack = function () {
        this.isContinueAttack = true;
        GameManager_1.default.instance.playerController.attack();
    };
    playerControlEvent.prototype.attackTouchEnd = function () {
        this.isContinueAttack = false;
    };
    playerControlEvent.prototype.roll = function (event) {
        var _this = this;
        if (this.isRollCd)
            return;
        this.isRollCd = true;
        GameManager_1.default.instance.playerController.roll();
        this.cdAnimation(event.target, this.rollCD);
        this.scheduleOnce(function () {
            _this.isRollCd = false;
        }, this.rollCD);
    };
    playerControlEvent.prototype.jump = function () {
        GameManager_1.default.instance.playerController.jump();
    };
    playerControlEvent.prototype.skill1 = function (event) {
        var _this = this;
        if (this.isSkill1Cd)
            return;
        if (GameManager_1.default.instance.playerController.skeleton.animation.includes("skill"))
            return;
        this.isSkill1Cd = true;
        GameManager_1.default.instance.playerController.skill1();
        this.cdAnimation(event.target, this.skill1CD);
        this.scheduleOnce(function () {
            _this.isSkill1Cd = false;
            ;
        }, this.skill1CD);
    };
    playerControlEvent.prototype.skill2 = function (event) {
        var _this = this;
        if (this.isSkill2Cd)
            return;
        if (GameManager_1.default.instance.playerController.skeleton.animation.includes("skill"))
            return;
        this.isSkill2Cd = true;
        GameManager_1.default.instance.playerController.skill2();
        this.cdAnimation(event.target, this.skill2CD);
        this.scheduleOnce(function () {
            _this.isSkill2Cd = false;
            ;
        }, this.skill2CD);
    };
    playerControlEvent.prototype.cdAnimation = function (btn, cdTime) {
        var cdNode = btn.getChildByName("cdNode");
        cdNode.active = true;
        var cdBar = cdNode.getChildByName("cd").getComponent(cc.ProgressBar);
        var timerLabel = cdNode.getChildByName("timer").getComponent(cc.Label);
        var timeObj = { time: cdTime };
        this.timerLabelTween(cdTime, timeObj, timerLabel, cdNode);
        this.progressBarTween(cdBar, cdTime);
    };
    playerControlEvent.prototype.timerLabelTween = function (cdTime, timeObj, timerLabel, cdNode) {
        var _this = this;
        cc.tween(timeObj)
            .to(cdTime, { time: 0 }, {
            progress: function (start, end, current, t) {
                //start:起始值 end:终点值 current:当前值 t:总时占比0~1 
                //返回值为最终赋值
                var now = cc.misc.lerp(start, end, t);
                timerLabel.string = now.toFixed(1);
                return now;
            }
        })
            .call(function () {
            cdNode.active = false;
            _this.isRollCd = false;
        })
            .start();
    };
    playerControlEvent.prototype.progressBarTween = function (cdBar, time) {
        cc.tween(cdBar)
            .to(time, { progress: 1 })
            .call(function () {
            cdBar.progress = 0;
        })
            .start();
    };
    var playerControlEvent_1;
    playerControlEvent.instance = null;
    __decorate([
        property(cc.Integer)
    ], playerControlEvent.prototype, "rollCD", void 0);
    __decorate([
        property(cc.Integer)
    ], playerControlEvent.prototype, "skill1CD", void 0);
    __decorate([
        property(cc.Integer)
    ], playerControlEvent.prototype, "skill2CD", void 0);
    __decorate([
        property(cc.Node)
    ], playerControlEvent.prototype, "buttons", void 0);
    playerControlEvent = playerControlEvent_1 = __decorate([
        ccclass
    ], playerControlEvent);
    return playerControlEvent;
}(cc.Component));
exports.default = playerControlEvent;

cc._RF.pop();