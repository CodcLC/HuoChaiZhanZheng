
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/thunder_burstParent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ad476I6etJEKIa5lvs53N9f', 'thunder_burstParent');
// scripts/game/thunder_burstParent.ts

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
var audioNameMgr_1 = require("../audioNameMgr");
var audioManager_1 = require("../main/audioManager");
var skillPool_1 = require("./skillPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var thunder_burstParent = /** @class */ (function (_super) {
    __extends(thunder_burstParent, _super);
    function thunder_burstParent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.thunderBallPrefab = null;
        _this.speed = 500;
        _this.numer = 0;
        _this.wave = 0;
        _this.direction = [
            cc.v2(-0.31, 0.95), cc.v2(-0.81, 0.59), cc.v2(-1.00, 0.00),
            cc.v2(1.00, -0.00), cc.v2(0.81, 0.59), cc.v2(0.31, 0.95),
        ];
        return _this;
    }
    /*     direction:Array<cc.Vec2>=[
            cc.v2(-0.31, 0.95),cc.v2(-0.81, 0.59),cc.v2(-1.00, 0.00),cc.v2(-0.81, -0.59),cc.v2(-0.31, -0.95),
            cc.v2(0.31, -0.95),cc.v2(0.81, -0.59),cc.v2(1.00, -0.00),cc.v2(0.81, 0.59),cc.v2(0.31, 0.95),
        ]; */
    // onLoad () {}
    thunder_burstParent.prototype.start = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E27StormBurst);
        this.createThunderBallRound();
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 10);
    };
    thunder_burstParent.prototype.createThunderBallRound = function () {
        var _this = this;
        this.wave++;
        for (var i = 0; i < 6; i++) {
            this.getThunderBall();
        }
        this.speed *= (0.7 - this.wave / 10);
        if (this.wave < 3) {
            this.scheduleOnce(function () {
                _this.createThunderBallRound();
            }, 0.2);
        }
    };
    thunder_burstParent.prototype.getThunderBall = function () {
        var ball = skillPool_1.default.instance.getThunderBall();
        ball.setParent(this.node);
        ball.setPosition(0, 0);
        ball.setSiblingIndex(1);
        ball.active = true;
        var index = this.numer % 6;
        ball.getComponent(cc.RigidBody).linearVelocity =
            cc.v2(this.direction[index].x * this.speed, this.direction[index].y * this.speed);
        this.numer++;
    };
    __decorate([
        property(cc.Prefab)
    ], thunder_burstParent.prototype, "thunderBallPrefab", void 0);
    thunder_burstParent = __decorate([
        ccclass
    ], thunder_burstParent);
    return thunder_burstParent;
}(cc.Component));
exports.default = thunder_burstParent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdGh1bmRlcl9idXJzdFBhcmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixnREFBNEM7QUFFNUMscURBQWdEO0FBQ2hELHlDQUFvQztBQUU5QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQWlEQztRQTlDRyx1QkFBaUIsR0FBVyxJQUFJLENBQUM7UUFHakMsV0FBSyxHQUFRLEdBQUcsQ0FBQztRQUNqQixXQUFLLEdBQVEsQ0FBQyxDQUFDO1FBQ2YsVUFBSSxHQUFRLENBQUMsQ0FBQztRQUNkLGVBQVMsR0FBZ0I7WUFDckIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQ3hELEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1NBQ3pELENBQUM7O0lBcUNOLENBQUM7SUFwQ0Q7OzthQUdTO0lBQ0wsZUFBZTtJQUVmLG1DQUFLLEdBQUw7UUFBQSxpQkFNQztRQUxHLHNCQUFZLENBQUMsU0FBUyxDQUFDLHdCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUNELG9EQUFzQixHQUF0QjtRQUFBLGlCQVdDO1FBVkcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsS0FBSyxJQUFFLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0IsSUFBRyxJQUFJLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQztZQUNYLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDbEMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBQ0QsNENBQWMsR0FBZDtRQUNJLElBQUksSUFBSSxHQUFDLG1CQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7UUFDakIsSUFBSSxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYztZQUM5QyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBN0NEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0VBQ2E7SUFIaEIsbUJBQW1CO1FBRHZDLE9BQU87T0FDYSxtQkFBbUIsQ0FpRHZDO0lBQUQsMEJBQUM7Q0FqREQsQUFpREMsQ0FqRGdELEVBQUUsQ0FBQyxTQUFTLEdBaUQ1RDtrQkFqRG9CLG1CQUFtQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCBhdWRpb01hbmFnZXIgZnJvbSBcIi4uL21haW4vYXVkaW9NYW5hZ2VyXCI7XG5pbXBvcnQgc2tpbGxQb29sIGZyb20gXCIuL3NraWxsUG9vbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRodW5kZXJfYnVyc3RQYXJlbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB0aHVuZGVyQmFsbFByZWZhYjpjYy5QcmVmYWI9bnVsbDtcblxuXG4gICAgc3BlZWQ6bnVtYmVyPTUwMDtcbiAgICBudW1lcjpudW1iZXI9MDtcbiAgICB3YXZlOm51bWJlcj0wO1xuICAgIGRpcmVjdGlvbjpBcnJheTxjYy5WZWMyPj1bXG4gICAgICAgIGNjLnYyKC0wLjMxLCAwLjk1KSxjYy52MigtMC44MSwgMC41OSksY2MudjIoLTEuMDAsIDAuMDApLFxuICAgICAgICBjYy52MigxLjAwLCAtMC4wMCksY2MudjIoMC44MSwgMC41OSksY2MudjIoMC4zMSwgMC45NSksXG4gICAgXTtcbi8qICAgICBkaXJlY3Rpb246QXJyYXk8Y2MuVmVjMj49W1xuICAgICAgICBjYy52MigtMC4zMSwgMC45NSksY2MudjIoLTAuODEsIDAuNTkpLGNjLnYyKC0xLjAwLCAwLjAwKSxjYy52MigtMC44MSwgLTAuNTkpLGNjLnYyKC0wLjMxLCAtMC45NSksXG4gICAgICAgIGNjLnYyKDAuMzEsIC0wLjk1KSxjYy52MigwLjgxLCAtMC41OSksY2MudjIoMS4wMCwgLTAuMDApLGNjLnYyKDAuODEsIDAuNTkpLGNjLnYyKDAuMzEsIDAuOTUpLFxuICAgIF07ICovXG4gICAgLy8gb25Mb2FkICgpIHt9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUyN1N0b3JtQnVyc3QpO1xuICAgICAgICB0aGlzLmNyZWF0ZVRodW5kZXJCYWxsUm91bmQoKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH0sMTApO1xuICAgIH1cbiAgICBjcmVhdGVUaHVuZGVyQmFsbFJvdW5kKCl7XG4gICAgICAgIHRoaXMud2F2ZSsrO1xuICAgICAgICBmb3IobGV0IGk9MDtpPDY7aSsrKXtcbiAgICAgICAgICAgIHRoaXMuZ2V0VGh1bmRlckJhbGwoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNwZWVkKj0oMC43LXRoaXMud2F2ZS8xMCk7XG4gICAgICAgIGlmKHRoaXMud2F2ZTwzKXtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUaHVuZGVyQmFsbFJvdW5kKCk7XG4gICAgICAgICAgICB9LDAuMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0VGh1bmRlckJhbGwoKXtcbiAgICAgICAgbGV0IGJhbGw9c2tpbGxQb29sLmluc3RhbmNlLmdldFRodW5kZXJCYWxsKCk7XG4gICAgICAgIGJhbGwuc2V0UGFyZW50KHRoaXMubm9kZSk7XG4gICAgICAgIGJhbGwuc2V0UG9zaXRpb24oMCwwKTtcbiAgICAgICAgYmFsbC5zZXRTaWJsaW5nSW5kZXgoMSk7XG4gICAgICAgIGJhbGwuYWN0aXZlPXRydWU7XG4gICAgICAgIGxldCBpbmRleD10aGlzLm51bWVyJTY7XG4gICAgICAgIGJhbGwuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkubGluZWFyVmVsb2NpdHk9XG4gICAgICAgIGNjLnYyKHRoaXMuZGlyZWN0aW9uW2luZGV4XS54KnRoaXMuc3BlZWQsdGhpcy5kaXJlY3Rpb25baW5kZXhdLnkqdGhpcy5zcGVlZCk7XG4gICAgICAgIHRoaXMubnVtZXIrKztcbiAgICB9XG59XG4iXX0=