
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/thunder_jolt.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8322L+Qw1ApJ7HA3FPUo4M', 'thunder_jolt');
// scripts/game/thunder_jolt.ts

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
var cameraControl_1 = require("./cameraControl");
var enemyHitCollider_1 = require("./enemyHitCollider");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var thunder_jolt = /** @class */ (function (_super) {
    __extends(thunder_jolt, _super);
    function thunder_jolt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTurn = false;
        _this.speed_x = 300;
        _this.speed_y = 0;
        _this.speedMax_y = 300;
        _this.damage = 0;
        _this.rigibody = null;
        return _this;
    }
    thunder_jolt.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
    };
    thunder_jolt.prototype.start = function () {
    };
    thunder_jolt.prototype.update = function () {
        if (this.isTurn) {
            this.rigibody.linearVelocity = cc.v2(this.speed_x, this.rigibody.linearVelocity.y);
        }
        if (this.node.y < -500) {
            this.node.destroy();
        }
    };
    thunder_jolt.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        if (other.node.group == "player") {
            this.scheduleOnce(function () {
                _this.node.getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
            }, 0);
        }
    };
    thunder_jolt.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        if (other.group == "ground") {
            this.playerAudio();
            if (this.isTurn)
                return;
            this.isTurn = true;
            this.changDirection();
        }
        else if (other.group == "player") {
            contact.disabled = true;
        }
    };
    thunder_jolt.prototype.playerAudio = function () {
        var worldPos = this.node.parent.convertToNodeSpaceAR(this.node.position);
        var screenPos = cameraControl_1.default.instance.mainCamera.getWorldToScreenPoint(worldPos);
        if (screenPos.x < 0 && screenPos.x > -cc.winSize.width) {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.E27LightningJolt);
        }
    };
    thunder_jolt.prototype.changDirection = function () {
        this.speed_x = this.node.x > GameManager_1.default.instance.player.x ? -this.speed_x : this.speed_x;
    };
    thunder_jolt = __decorate([
        ccclass
    ], thunder_jolt);
    return thunder_jolt;
}(cc.Component));
exports.default = thunder_jolt;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdGh1bmRlcl9qb2x0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGdEQUE0QztBQUM1QyxxREFBZ0Q7QUFDaEQsaURBQTRDO0FBQzVDLHVEQUFrRDtBQUNsRCw2Q0FBd0M7QUFFbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFxREM7UUFuREcsWUFBTSxHQUFTLEtBQUssQ0FBQztRQUVyQixhQUFPLEdBQVEsR0FBRyxDQUFDO1FBQ25CLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFDakIsZ0JBQVUsR0FBUSxHQUFHLENBQUM7UUFDdEIsWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixjQUFRLEdBQWMsSUFBSSxDQUFDOztJQTZDL0IsQ0FBQztJQTNDRyw2QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELDRCQUFLLEdBQUw7SUFFQSxDQUFDO0lBQ0QsNkJBQU0sR0FBTjtRQUNJLElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuRjtRQUNELElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFHLEVBQUM7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFDRCx1Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBaUIsRUFBQyxJQUFnQjtRQUFuRCxpQkFNQztRQUxHLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUUsUUFBUSxFQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsMEJBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLElBQUksRUFBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1I7SUFDTCxDQUFDO0lBQ0QscUNBQWMsR0FBZCxVQUFlLE9BQTBCLEVBQUUsWUFBZ0MsRUFBRSxhQUFpQztRQUMxRyxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUcsSUFBSSxDQUFDLE1BQU07Z0JBQUUsT0FBTztZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7YUFBSyxJQUFHLEtBQUssQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFDO1lBQzdCLE9BQU8sQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQztJQUNELGtDQUFXLEdBQVg7UUFDSSxJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksU0FBUyxHQUFDLHVCQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRixJQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLFNBQVMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQztZQUM1QyxzQkFBWSxDQUFDLFNBQVMsQ0FBQyx3QkFBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBQ0QscUNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RGLENBQUM7SUFwRGdCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0FxRGhDO0lBQUQsbUJBQUM7Q0FyREQsQUFxREMsQ0FyRHlDLEVBQUUsQ0FBQyxTQUFTLEdBcURyRDtrQkFyRG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vbWFpbi9hdWRpb01hbmFnZXJcIjtcbmltcG9ydCBjYW1lcmFDb250cm9sIGZyb20gXCIuL2NhbWVyYUNvbnRyb2xcIjtcbmltcG9ydCBlbmVteUhpdENvbGxpZGVyIGZyb20gXCIuL2VuZW15SGl0Q29sbGlkZXJcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRodW5kZXJfam9sdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBpc1R1cm46Ym9vbGVhbj1mYWxzZTtcblxuICAgIHNwZWVkX3g6bnVtYmVyPTMwMDtcbiAgICBzcGVlZF95Om51bWJlcj0wO1xuICAgIHNwZWVkTWF4X3k6bnVtYmVyPTMwMDtcbiAgICBkYW1hZ2U6bnVtYmVyPTA7XG4gICAgcmlnaWJvZHk6Y2MuUmlnaWRCb2R5PW51bGw7XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLnJpZ2lib2R5PXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG4gICAgdXBkYXRlKCl7XG4gICAgICAgIGlmKHRoaXMuaXNUdXJuKXtcbiAgICAgICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIodGhpcy5zcGVlZF94LHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkueSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5ub2RlLnk8LTUwMCl7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXI6Y2MuQ29sbGlkZXIsc2VsZjpjYy5Db2xsaWRlcil7XG4gICAgICAgIGlmKG90aGVyLm5vZGUuZ3JvdXA9PVwicGxheWVyXCIpe1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGVuZW15SGl0Q29sbGlkZXIpLmhpdCh0aGlzLm5vZGUsdGhpcy5kYW1hZ2UpO1xuICAgICAgICAgICAgfSwwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0OiBjYy5QaHlzaWNzQ29udGFjdCwgc2VsZkNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIsIG90aGVyQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlcikge1xuICAgICAgICBsZXQgb3RoZXIgPSBvdGhlckNvbGxpZGVyLm5vZGU7XG4gICAgICAgIGlmIChvdGhlci5ncm91cCA9PSBcImdyb3VuZFwiKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllckF1ZGlvKCk7XG4gICAgICAgICAgICBpZih0aGlzLmlzVHVybikgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5pc1R1cm49dHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdEaXJlY3Rpb24oKTtcbiAgICAgICAgfWVsc2UgaWYob3RoZXIuZ3JvdXAgPT0gXCJwbGF5ZXJcIil7XG4gICAgICAgICAgICBjb250YWN0LmRpc2FibGVkPXRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGxheWVyQXVkaW8oKXtcbiAgICAgICAgbGV0IHdvcmxkUG9zPXRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5ub2RlLnBvc2l0aW9uKTtcbiAgICAgICAgbGV0IHNjcmVlblBvcz1jYW1lcmFDb250cm9sLmluc3RhbmNlLm1haW5DYW1lcmEuZ2V0V29ybGRUb1NjcmVlblBvaW50KHdvcmxkUG9zKTtcbiAgICAgICAgaWYoc2NyZWVuUG9zLng8MCYmc2NyZWVuUG9zLng+LWNjLndpblNpemUud2lkdGgpe1xuICAgICAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuRTI3TGlnaHRuaW5nSm9sdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdEaXJlY3Rpb24oKXtcbiAgICAgICAgdGhpcy5zcGVlZF94PXRoaXMubm9kZS54PkdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54Py10aGlzLnNwZWVkX3g6dGhpcy5zcGVlZF94O1xuICAgIH1cbn1cbiJdfQ==