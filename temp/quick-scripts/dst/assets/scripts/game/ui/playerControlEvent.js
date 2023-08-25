
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ui/playerControlEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdWlcXHBsYXllckNvbnRyb2xFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw4Q0FBeUM7QUFFbkMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBZ0Qsc0NBQVk7SUFBNUQ7UUFBQSxxRUF3SEM7UUFySEcsWUFBTSxHQUFRLENBQUMsQ0FBQztRQUVoQixjQUFRLEdBQVEsQ0FBQyxDQUFDO1FBRWxCLGNBQVEsR0FBUSxDQUFDLENBQUM7UUFFbEIsYUFBTyxHQUFXLEVBQUUsQ0FBQyxDQUFBLDBDQUEwQztRQUUvRCxZQUFNLEdBQVMsS0FBSyxDQUFDO1FBQ3JCLGNBQVEsR0FBUyxLQUFLLENBQUM7UUFDdkIsZ0JBQVUsR0FBUyxLQUFLLENBQUM7UUFDekIsZ0JBQVUsR0FBUyxLQUFLLENBQUM7UUFDekIsc0JBQWdCLEdBQVMsS0FBSyxDQUFDOztJQXlHbkMsQ0FBQzsyQkF4SG9CLGtCQUFrQjtJQWtCbkMsbUNBQU0sR0FBTjtRQUNJLG9CQUFrQixDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7SUFDckMsQ0FBQztJQUNELGlDQUFJLEdBQUo7UUFDSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDRCx5Q0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNELHdDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hF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LEVBQUMsQ0FBQzthQUNyQixJQUFJLENBQUM7WUFDRixLQUFLLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUM7O0lBdkdNLDJCQUFRLEdBQW9CLElBQUksQ0FBQztJQWJ4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO3NEQUNMO0lBRWhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7d0RBQ0g7SUFFbEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzt3REFDSDtJQUVsQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNHO0lBVEosa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0F3SHRDO0lBQUQseUJBQUM7Q0F4SEQsQUF3SEMsQ0F4SCtDLEVBQUUsQ0FBQyxTQUFTLEdBd0gzRDtrQkF4SG9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGxheWVyQ29udHJvbEV2ZW50IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5JbnRlZ2VyKVxuICAgIHJvbGxDRDpudW1iZXI9MDtcbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcbiAgICBza2lsbDFDRDpudW1iZXI9MDtcbiAgICBAcHJvcGVydHkoY2MuSW50ZWdlcilcbiAgICBza2lsbDJDRDpudW1iZXI9MDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBidXR0b25zOmNjLk5vZGVbXT1bXTsvLzAtYXR0YWNrIDEtcm9sbCAyLWp1bXAgMy1za2lsbDEgNC1za2lsbDJcbiAgICBcbiAgICBpbml0ZWQ6Ym9vbGVhbj1mYWxzZTtcbiAgICBpc1JvbGxDZDpib29sZWFuPWZhbHNlO1xuICAgIGlzU2tpbGwxQ2Q6Ym9vbGVhbj1mYWxzZTtcbiAgICBpc1NraWxsMkNkOmJvb2xlYW49ZmFsc2U7XG4gICAgaXNDb250aW51ZUF0dGFjazpib29sZWFuPWZhbHNlO1xuICAgIHN0YXRpYyBpbnN0YW5jZTpwbGF5ZXJDb250cm9sRXZlbnQ9bnVsbDtcblxuICAgIG9uTG9hZCgpe1xuICAgICAgICBwbGF5ZXJDb250cm9sRXZlbnQuaW5zdGFuY2U9dGhpcztcbiAgICB9XG4gICAgaW5pdCgpe1xuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuNSx7b3BhY2l0eToyNTV9KS5zdGFydCgpO1xuICAgICAgICB0aGlzLmJpbmRpbmdFdmVudCgpO1xuICAgIH1cbiAgICBiaW5kaW5nRXZlbnQoKXtcbiAgICAgICAgdGhpcy5idXR0b25zWzBdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMuYXR0YWNrLHRoaXMpO1xuICAgICAgICB0aGlzLmJ1dHRvbnNbMF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMuYXR0YWNrVG91Y2hFbmQsdGhpcyk7XG4gICAgICAgIHRoaXMuYnV0dG9uc1swXS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5hdHRhY2tUb3VjaEVuZCx0aGlzKTtcbiAgICAgICAgdGhpcy5idXR0b25zWzFdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMucm9sbCx0aGlzKTtcbiAgICAgICAgdGhpcy5idXR0b25zWzJdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMuanVtcCx0aGlzKTtcbiAgICAgICAgdGhpcy5idXR0b25zWzNdLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMuc2tpbGwxLHRoaXMpO1xuICAgICAgICB0aGlzLmJ1dHRvbnNbNF0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5za2lsbDIsdGhpcyk7XG4gICAgfVxuICAgIHJlbW92ZUV2ZW50KCl7XG4gICAgICAgIHRoaXMuaXNDb250aW51ZUF0dGFjaz1mYWxzZTtcbiAgICAgICAgdGhpcy5idXR0b25zWzBdLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLmF0dGFjayx0aGlzKTtcbiAgICAgICAgdGhpcy5idXR0b25zWzBdLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5hdHRhY2tUb3VjaEVuZCx0aGlzKTtcbiAgICAgICAgdGhpcy5idXR0b25zWzBdLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy5hdHRhY2tUb3VjaEVuZCx0aGlzKTtcbiAgICAgICAgdGhpcy5idXR0b25zWzFdLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0aGlzLnJvbGwsdGhpcyk7XG4gICAgICAgIHRoaXMuYnV0dG9uc1syXS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsdGhpcy5qdW1wLHRoaXMpO1xuICAgICAgICB0aGlzLmJ1dHRvbnNbM10ub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMuc2tpbGwxLHRoaXMpO1xuICAgICAgICB0aGlzLmJ1dHRvbnNbNF0ub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULHRoaXMuc2tpbGwyLHRoaXMpO1xuICAgIH1cbiAgICBhdHRhY2soKXtcbiAgICAgICAgdGhpcy5pc0NvbnRpbnVlQXR0YWNrPXRydWU7XG4gICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuYXR0YWNrKCk7XG4gICAgfVxuICAgIGF0dGFja1RvdWNoRW5kKCl7XG4gICAgICAgIHRoaXMuaXNDb250aW51ZUF0dGFjaz1mYWxzZTtcbiAgICB9XG4gICAgcm9sbChldmVudDpjYy5FdmVudCl7XG4gICAgICAgIGlmKHRoaXMuaXNSb2xsQ2QpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc1JvbGxDZD10cnVlO1xuICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnJvbGwoKTtcblxuICAgICAgICB0aGlzLmNkQW5pbWF0aW9uKGV2ZW50LnRhcmdldCx0aGlzLnJvbGxDRCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLmlzUm9sbENkPWZhbHNlO1xuICAgICAgICB9LHRoaXMucm9sbENEKTtcbiAgICB9XG4gICAganVtcCgpe1xuICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLmp1bXAoKTtcbiAgICB9XG4gICAgc2tpbGwxKGV2ZW50OmNjLkV2ZW50KXtcbiAgICAgICAgaWYodGhpcy5pc1NraWxsMUNkKSByZXR1cm47XG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24uYW5pbWF0aW9uLmluY2x1ZGVzKFwic2tpbGxcIikpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc1NraWxsMUNkPXRydWU7XG4gICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tpbGwxKCk7XG5cbiAgICAgICAgdGhpcy5jZEFuaW1hdGlvbihldmVudC50YXJnZXQsdGhpcy5za2lsbDFDRCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLmlzU2tpbGwxQ2Q9ZmFsc2U7O1xuICAgICAgICB9LHRoaXMuc2tpbGwxQ0QpO1xuICAgIH1cbiAgICBza2lsbDIoZXZlbnQ6Y2MuRXZlbnQpe1xuICAgICAgICBpZih0aGlzLmlzU2tpbGwyQ2QpIHJldHVybjtcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5za2VsZXRvbi5hbmltYXRpb24uaW5jbHVkZXMoXCJza2lsbFwiKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzU2tpbGwyQ2Q9dHJ1ZTtcbiAgICAgICAgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5za2lsbDIoKTtcblxuICAgICAgICB0aGlzLmNkQW5pbWF0aW9uKGV2ZW50LnRhcmdldCx0aGlzLnNraWxsMkNEKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMuaXNTa2lsbDJDZD1mYWxzZTs7XG4gICAgICAgIH0sdGhpcy5za2lsbDJDRCk7XG4gICAgfVxuICAgIGNkQW5pbWF0aW9uKGJ0bjpjYy5Ob2RlLGNkVGltZTpudW1iZXIpe1xuICAgICAgICBsZXQgY2ROb2RlOmNjLk5vZGU9YnRuLmdldENoaWxkQnlOYW1lKFwiY2ROb2RlXCIpO1xuICAgICAgICBjZE5vZGUuYWN0aXZlPXRydWU7XG4gICAgICAgIGxldCBjZEJhcjpjYy5Qcm9ncmVzc0Jhcj1jZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjZFwiKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xuICAgICAgICBsZXQgdGltZXJMYWJlbDpjYy5MYWJlbD1jZE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ0aW1lclwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBsZXQgdGltZU9iaj17dGltZTpjZFRpbWV9XG4gICAgICAgIHRoaXMudGltZXJMYWJlbFR3ZWVuKGNkVGltZSx0aW1lT2JqLHRpbWVyTGFiZWwsY2ROb2RlKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhclR3ZWVuKGNkQmFyLGNkVGltZSk7XG4gICAgfVxuICAgIHRpbWVyTGFiZWxUd2VlbihjZFRpbWU6bnVtYmVyLHRpbWVPYmo6b2JqZWN0LHRpbWVyTGFiZWw6Y2MuTGFiZWwsY2ROb2RlOmNjLk5vZGUpe1xuICAgICAgICBjYy50d2Vlbih0aW1lT2JqKVxuICAgICAgICAudG8oY2RUaW1lLHt0aW1lOjB9LHtcbiAgICAgICAgICAgIHByb2dyZXNzOiAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGN1cnJlbnQ6IGFueSwgdDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy9zdGFydDrotbflp4vlgLwgZW5kOue7iOeCueWAvCBjdXJyZW50OuW9k+WJjeWAvCB0OuaAu+aXtuWNoOavlDB+MSBcbiAgICAgICAgICAgICAgICAvL+i/lOWbnuWAvOS4uuacgOe7iOi1i+WAvFxuICAgICAgICAgICAgICAgIGxldCBub3cgPSBjYy5taXNjLmxlcnAoc3RhcnQsIGVuZCwgdCk7XG4gICAgICAgICAgICAgICAgdGltZXJMYWJlbC5zdHJpbmcgPSBub3cudG9GaXhlZCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgY2ROb2RlLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNSb2xsQ2Q9ZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgIH1cbiAgICBwcm9ncmVzc0JhclR3ZWVuKGNkQmFyOmNjLlByb2dyZXNzQmFyLHRpbWU6bnVtYmVyKXtcbiAgICAgICAgY2MudHdlZW4oY2RCYXIpXG4gICAgICAgIC50byh0aW1lLHtwcm9ncmVzczoxfSlcbiAgICAgICAgLmNhbGwoKCk9PntcbiAgICAgICAgICAgIGNkQmFyLnByb2dyZXNzPTA7XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgIH1cbn1cbiJdfQ==