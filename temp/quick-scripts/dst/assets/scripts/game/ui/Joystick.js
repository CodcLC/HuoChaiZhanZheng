
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ui/Joystick.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdWlcXEpveXN0aWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF5QztBQUduQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQW9KQztRQTlJRyxhQUFPLEdBQVksSUFBSSxDQUFDO1FBTXhCLFdBQUssR0FBWSxJQUFJLENBQUM7UUFLdEIsVUFBSSxHQUFXLEdBQUcsQ0FBQztRQUNuQixVQUFJLEdBQVcsR0FBRyxDQUFDO1FBQ3ZCOzs7OztpQkFLUztRQUNMLGlCQUFXLEdBQThCLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFFdkUsa0JBQVksR0FBUyxLQUFLLENBQUM7UUFDM0Isa0JBQVksR0FBUyxLQUFLLENBQUM7O1FBdUgzQixpQkFBaUI7SUFDckIsQ0FBQztpQkFwSm9CLFFBQVE7SUE4QnpCLHlCQUFNLEdBQU47UUFDSSxVQUFRLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFckIsQ0FBQztJQUNELHVCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUMsa0JBQWtCLENBQUE7UUFDN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QsMkJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pFLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFDRCw4QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUks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OztJQXBITSxpQkFBUSxHQUFVLElBQUksQ0FBQztJQXZCOUI7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7WUFDYixXQUFXLEVBQUUsUUFBUTtTQUN4QixDQUFDOzZDQUNzQjtJQU14QjtRQUpDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSTtZQUNiLFdBQVcsRUFBRSxRQUFRO1NBQ3hCLENBQUM7MkNBQ29CO0lBS3RCO1FBSEMsUUFBUSxDQUFDO1lBQ04sV0FBVyxFQUFFLFFBQVE7U0FDeEIsQ0FBQzswQ0FDaUI7SUFqQkYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQW9KNUI7SUFBRCxlQUFDO0NBcEpELEFBb0pDLENBcEpxQyxFQUFFLENBQUMsU0FBUyxHQW9KakQ7a0JBcEpvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHBsYXllckNvbnRyb2xsZXIgZnJvbSBcIi4uL3BsYXllckNvbnRyb2xsZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb3lTdGljayBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICBkaXNwbGF5TmFtZTogJ+enu+WKqOS4reW/g+iKgueCuSdcbiAgICB9KVxuICAgIG1pZE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgZGlzcGxheU5hbWU6ICfmkYfmnYbog4zmma/oioLngrknXG4gICAgfSlcbiAgICBqb3lCazogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBkaXNwbGF5TmFtZTogJ+aRh+adhua0u+WKqOWNiuW+hCdcbiAgICB9KVxuICAgIG1heFI6IG51bWJlciA9IDEwMDtcbiAgICB6b29tOiBudW1iZXIgPSAwLjM7XG4vKiBcbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLFxuICAgICAgICBkaXNwbGF5TmFtZTogJ+aRh+adhuenu+WKqOWbnuiwgycsXG4gICAgICAgIHRvb2x0aXA6ICfop6blj5F0b3VjaG1vdmXlkI7liIblj5HmlbDmja4nXG4gICAgfSkgKi9cbiAgICBqb3lDYWxsQmFjazogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyO1xuXG4gICAgaXNLZXlUb3VjaF9hOmJvb2xlYW49ZmFsc2U7XG4gICAgaXNLZXlUb3VjaF9kOmJvb2xlYW49ZmFsc2U7XG4gICAgc3RhdGljIGluc3RhbmNlOkpveVN0aWNrPW51bGw7XG4gICAgb25Mb2FkKCkge1xuICAgICAgICBKb3lTdGljay5pbnN0YW5jZT10aGlzO1xuICAgICAgICB0aGlzLmdvQmFja01pZCgpO1xuXG4gICAgfVxuICAgIGluaXQoKXtcbiAgICAgICAgdGhpcy5qb3lDYWxsQmFjay50YXJnZXQgPSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXI7XG4gICAgICAgIHRoaXMuam95Q2FsbEJhY2suY29tcG9uZW50PVwicGxheWVyQ29udHJvbGxlclwiXG4gICAgICAgIHRoaXMuam95Q2FsbEJhY2suaGFuZGxlciA9IFwibW92ZVwiO1xuICAgICAgICB0aGlzLmJpbkV2ZW50KCk7XG4gICAgfVxuICAgIGJpbkV2ZW50KCkge1xuICAgICAgICB0aGlzLmpveUJrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgIHRoaXMuam95Qmsub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy5vblRvdWNoTW92ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuam95Qmsub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgICAgICB0aGlzLmpveUJrLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLmtleURvd24sIHRoaXMpO1xuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLmtleVVwLCB0aGlzKTtcbiAgICB9XG4gICAgcmVtb3ZlRXZlbnQoKSB7XG4gICAgICAgIHRoaXMuam95Qmsub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7XG4gICAgICAgIHRoaXMuam95Qmsub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpO1xuICAgICAgICB0aGlzLmpveUJrLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuam95Qmsub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5rZXlEb3duLCB0aGlzKTtcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMua2V5VXAsIHRoaXMpO1xuICAgIH1cblxuICAgIGdvQmFja01pZCgpIHtcbiAgICAgICAgdGhpcy5taWROb2RlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgIH1cblxuICAgIG9uVG91Y2hTdGFydChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCkge1xuICAgICAgICBsZXQgcG9zOiBjYy5WZWMyID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNjLnYyKGV2ZW50LmdldExvY2F0aW9uKCkpKTtcbiAgICAgICAgcG9zID0gY2MudjIocG9zLnggKiB0aGlzLnpvb20sIDApO1xuICAgICAgICB0aGlzLmNsYW1wUG9zKHBvcyk7XG4gICAgICAgIHRoaXMubWlkTm9kZS5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICB0aGlzLmpveUNhbGxCYWNrLmVtaXQoW3Bvc10pO1xuICAgIH1cblxuICAgIG9uVG91Y2hNb3ZlKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIGxldCBwb3M6IGNjLlZlYzIgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY2MudjIoZXZlbnQuZ2V0TG9jYXRpb24oKSkpO1xuICAgICAgICBwb3MgPSBjYy52Mihwb3MueCAqIHRoaXMuem9vbSwgMCk7XG4gICAgICAgIHRoaXMuY2xhbXBQb3MocG9zKTtcbiAgICAgICAgdGhpcy5taWROb2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIHRoaXMuam95Q2FsbEJhY2suZW1pdChbcG9zXSk7XG4gICAgfVxuXG4gICAgb25Ub3VjaEVuZChlOiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIHRoaXMuZ29CYWNrTWlkKCk7XG4gICAgICAgIHRoaXMuam95Q2FsbEJhY2suZW1pdChbY2MudjIoMCwgMCldKTtcbiAgICB9XG4gICAga2V5RG93bihldmVudDogY2MuRXZlbnQuRXZlbnRLZXlib2FyZCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XG4gICAgICAgICAgICAgICAgdGhpcy5pc0tleVRvdWNoX2E9dHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1pZE5vZGUuc2V0UG9zaXRpb24oLTQwLDApO1xuICAgICAgICAgICAgICAgIHRoaXMuam95Q2FsbEJhY2suZW1pdChbY2MudjIoLTEsMCldKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XG4gICAgICAgICAgICAgICAgdGhpcy5pc0tleVRvdWNoX2Q9dHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1pZE5vZGUuc2V0UG9zaXRpb24oNDAsMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5qb3lDYWxsQmFjay5lbWl0KFtjYy52MigxLDApXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAga2V5VXAoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50S2V5Ym9hcmQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNLZXlUb3VjaF9kKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0tleVRvdWNoX2E9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNLZXlUb3VjaF9kPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlkTm9kZS5zZXRQb3NpdGlvbig0MCwwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qb3lDYWxsQmFjay5lbWl0KFtjYy52MigxLDApXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIHRoaXMuaXNLZXlUb3VjaF9hPWZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ29CYWNrTWlkKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5qb3lDYWxsQmFjay5lbWl0KFtjYy52MigwLDApXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5kOlxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNLZXlUb3VjaF9hKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0tleVRvdWNoX2Q9ZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNLZXlUb3VjaF9hPXRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlkTm9kZS5zZXRQb3NpdGlvbigtNDAsMCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuam95Q2FsbEJhY2suZW1pdChbY2MudjIoLTEsMCldKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgdGhpcy5pc0tleVRvdWNoX2Q9ZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5nb0JhY2tNaWQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmpveUNhbGxCYWNrLmVtaXQoW2NjLnYyKDAsMCldKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmoLnmja7ljYrlvoTpmZDliLbkvY3nva5cbiAgICAgKiBAcGFyYW0gcG9zIFxuICAgICAqL1xuICAgIGNsYW1wUG9zKHBvczogY2MuVmVjMikge1xuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBwb3MubWFnKCk7XG4gICAgICAgIGlmIChsZW4gPiB0aGlzLm1heFIpIHtcbiAgICAgICAgICAgIGxldCBrOiBudW1iZXIgPSB0aGlzLm1heFIgLyBsZW47XG4gICAgICAgICAgICBwb3MueCAqPSBrO1xuICAgICAgICAgICAgcG9zLnkgKj0gaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOagueaNruS9jee9rui9rOWMluinkuW6plxuICAgICAqIEBwYXJhbSBwb3MgXG4gICAgICovXG4gICAgY291dmVydFRvQW5nbGUocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGxldCByOiBudW1iZXIgPSBNYXRoLmF0YW4yKHBvcy55LCBwb3MueCk7XG4gICAgICAgIGxldCBkOiBudW1iZXIgPSBjYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocik7XG4gICAgICAgIHJldHVybiBkO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=