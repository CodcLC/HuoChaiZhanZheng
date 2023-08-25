
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/coinDrop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcY29pbkRyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNENBQTJDO0FBQzNDLG9DQUFtQztBQUNuQyw2Q0FBd0M7QUFFbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUE0RUM7UUExRUcsZUFBUyxHQUFRLENBQUMsQ0FBQztRQUNuQixvQkFBYyxHQUFTLElBQUksQ0FBQztRQUM1QixrQkFBWSxHQUFTLEtBQUssQ0FBQztRQUMzQixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBQzNCLG9CQUFjLEdBQTBCLElBQUksQ0FBQztRQUM3QyxXQUFLLEdBQVEsSUFBSSxDQUFDO1FBQ2xCLGlCQUFXLEdBQVMsS0FBSyxDQUFDOztJQW9FOUIsQ0FBQztJQWxFRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0Qsd0JBQUssR0FBTDtRQUFBLGlCQU1DO1FBTEcscUJBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENB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QUcsRUFBRSxDQUFDO1FBQzFELElBQUcsR0FBRyxHQUFDLEVBQUUsRUFBQztZQUNOLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUNELDhCQUFXLEdBQVg7UUFDSSxJQUFHLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCwrQkFBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUEzRWdCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E0RTVCO0lBQUQsZUFBQztDQTVFRCxBQTRFQyxDQTVFcUMsRUFBRSxDQUFDLFNBQVMsR0E0RWpEO2tCQTVFb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCB7IGRhdGEgfSBmcm9tIFwiLi4vc2RrL2RhdGFcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvaW5Ecm9wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIGNvaW5OdW1lcjpudW1iZXI9MTtcbiAgICB0YXJnZXRQb3NpdGlvbjpjYy5WZWMzPW51bGw7XG4gICAgaXNQaWNrVXBUaW1lOmJvb2xlYW49ZmFsc2U7XG4gICAgcmlnaWJvZHk6Y2MuUmlnaWRCb2R5PW51bGw7XG4gICAgY2lyY2xlQ29sbGlkZXI6Y2MuUGh5c2ljc0NpcmNsZUNvbGxpZGVyPW51bGw7XG4gICAgc3BlZWQ6bnVtYmVyPTEyMDA7XG4gICAgaXNEcm9wRmxvb3I6Ym9vbGVhbj1mYWxzZTtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHk9dGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xuICAgICAgICB0aGlzLmNpcmNsZUNvbGxpZGVyPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUGh5c2ljc0NpcmNsZUNvbGxpZGVyKTtcbiAgICB9XG4gICAgc3RhcnQgKCkge1xuICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5kcm9wQ29pbnMucHVzaCh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLmFkZEZvcmNlKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TW92ZVRvUGxheWVyKCk7XG4gICAgICAgIH0sMS41KTtcbiAgICB9XG5cbiAgICBhZGRGb3JjZSgpe1xuICAgICAgICBsZXQgZm9yY2VfeD1jYWlqaVRvb2xzLnJhbmRvbV9pbnQoLTYwLDYwKSoxNTA7XG4gICAgICAgIGxldCBmb3JjZV95PWNhaWppVG9vbHMucmFuZG9tX2ludCgzMCw2MCkqMTUwO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmFwcGx5Rm9yY2VUb0NlbnRlcihjYy52Mihmb3JjZV94LGZvcmNlX3kpLHRydWUpO1xuICAgIH1cbiAgICBzdGFydE1vdmVUb1BsYXllcigpe1xuICAgICAgICB0aGlzLmlzUGlja1VwVGltZT10cnVlO1xuICAgICAgICB0aGlzLmNsb3NlRGFtcGluZygpO1xuICAgIH1cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGlmKHRoaXMuaXNQaWNrVXBUaW1lKXtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvUGxheWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGF0ZVVwZGF0ZSgpe1xuICAgICAgICBpZih0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5LmxlbigpPDEwKXtcbiAgICAgICAgICAgIGlmKHRoaXMuY2lyY2xlQ29sbGlkZXIucmVzdGl0dXRpb249PTApIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIoMCwwKTtcbiAgICAgICAgICAgIHRoaXMuY2lyY2xlQ29sbGlkZXIucmVzdGl0dXRpb249MDtcbiAgICAgICAgICAgIHRoaXMuY2lyY2xlQ29sbGlkZXIuYXBwbHkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0OiBjYy5QaHlzaWNzQ29udGFjdCwgc2VsZkNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIsIG90aGVyQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlcikge1xuICAgICAgICBsZXQgb3RoZXIgPSBvdGhlckNvbGxpZGVyLm5vZGU7XG4gICAgICAgIGlmIChvdGhlci5ncm91cCA9PSBcImdyb3VuZFwiKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5EYW1waW5nKCk7XG4gICAgICAgIH1lbHNlIGlmKG90aGVyLmdyb3VwPT1cInBsYXllclwiKXtcbiAgICAgICAgICAgIGNvbnRhY3QuZGlzYWJsZWQ9dHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRDb2luKCl7XG4gICAgICAgIGxldCBjb2luPU51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwiY29pblwiKSkrdGhpcy5jb2luTnVtZXI7XG4gICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJCYXNlXCIsXCJjb2luXCIsY29pbik7XG4gICAgfVxuICAgIG1vdmVUb1BsYXllcigpe1xuICAgICAgICB0aGlzLnRhcmdldFBvc2l0aW9uPWNjLnYzKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54LEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci55KzcwKVxuICAgICAgICBsZXQgZGlyZWN0PXRoaXMudGFyZ2V0UG9zaXRpb24uc3ViKHRoaXMubm9kZS5wb3NpdGlvbikubm9ybWFsaXplU2VsZigpO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5PWNjLnYyKGRpcmVjdC54KnRoaXMuc3BlZWQsZGlyZWN0LnkqdGhpcy5zcGVlZCk7XG4gICAgICAgIGxldCBsZW49dGhpcy50YXJnZXRQb3NpdGlvbi5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5sZW4oKTtcbiAgICAgICAgaWYobGVuPDE1KXtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29pbigpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3BlbkRhbXBpbmcoKXtcbiAgICAgICAgaWYodGhpcy5pc0Ryb3BGbG9vcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzRHJvcEZsb29yPXRydWU7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyRGFtcGluZz0yO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmFuZ3VsYXJEYW1waW5nPTI7XG4gICAgfVxuICAgIGNsb3NlRGFtcGluZygpe1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhckRhbXBpbmc9MDtcbiAgICB9XG59XG4iXX0=