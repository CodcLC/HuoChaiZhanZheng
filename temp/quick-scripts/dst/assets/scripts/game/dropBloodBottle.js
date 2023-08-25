
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/dropBloodBottle.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0675bN9UYNGM7cJdm6ys4IM', 'dropBloodBottle');
// scripts/game/dropBloodBottle.ts

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
var playerHp_1 = require("./ui/playerHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dropBloodBottle = /** @class */ (function (_super) {
    __extends(dropBloodBottle, _super);
    function dropBloodBottle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hp = 100;
        _this.forceX = 30000;
        _this.forceY = 20000;
        _this.rigibody = null;
        _this.isMoveToPlayer = false;
        _this.speed = 500;
        _this.targetPosition = null;
        return _this;
    }
    dropBloodBottle.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
    };
    dropBloodBottle.prototype.start = function () {
        this.forceX = this.node.x > GameManager_1.default.instance.player.x ? this.forceX : -this.forceX;
        this.rigibody.applyForceToCenter(cc.v2(this.forceX, this.forceY), false);
    };
    dropBloodBottle.prototype.update = function () {
        if (this.isMoveToPlayer) {
            this.moveToPlayer();
        }
    };
    dropBloodBottle.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        if (other.group == "ground") {
            this.rigibody.linearVelocity = cc.v2(0, 0);
        }
        else if (other.group == "player" && other.name == "player") {
            if (GameManager_1.default.instance.playerController.isDie)
                return;
            contact.disabled = true;
            this.isMoveToPlayer = true;
        }
    };
    dropBloodBottle.prototype.moveToPlayer = function () {
        this.targetPosition = cc.v3(GameManager_1.default.instance.player.x, GameManager_1.default.instance.player.y + 70);
        var direct = this.targetPosition.sub(this.node.position).normalizeSelf();
        this.rigibody.linearVelocity = cc.v2(direct.x * this.speed, direct.y * this.speed);
        var len = this.targetPosition.sub(this.node.position).len();
        if (len < 10) {
            this.addHp();
            this.node.active = false;
            this.node.destroy();
        }
    };
    dropBloodBottle.prototype.addHp = function () {
        this.rigibody.enabledContactListener = false;
        playerHp_1.default.instance.addHp(this.hp);
        this.node.destroy();
    };
    dropBloodBottle = __decorate([
        ccclass
    ], dropBloodBottle);
    return dropBloodBottle;
}(cc.Component));
exports.default = dropBloodBottle;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZHJvcEJsb29kQm90dGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDZDQUF3QztBQUN4QywwQ0FBcUM7QUFFL0IsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBNkMsbUNBQVk7SUFBekQ7UUFBQSxxRUFnREM7UUE5Q0csUUFBRSxHQUFRLEdBQUcsQ0FBQztRQUNkLFlBQU0sR0FBUSxLQUFLLENBQUM7UUFDcEIsWUFBTSxHQUFRLEtBQUssQ0FBQztRQUNwQixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBQzNCLG9CQUFjLEdBQVMsS0FBSyxDQUFDO1FBQzdCLFdBQUssR0FBUSxHQUFHLENBQUM7UUFDakIsb0JBQWMsR0FBUyxJQUFJLENBQUM7O0lBd0NoQyxDQUFDO0lBdENHLGdDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0QsK0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9FLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBQ0QsZ0NBQU0sR0FBTjtRQUNJLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBQztZQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0Qsd0NBQWMsR0FBZCxVQUFlLE9BQTBCLEVBQUUsWUFBZ0MsRUFBRSxhQUFpQztRQUMxRyxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBSyxJQUFHLEtBQUssQ0FBQyxLQUFLLElBQUUsUUFBUSxJQUFFLEtBQUssQ0FBQyxJQUFJLElBQUUsUUFBUSxFQUFDO1lBQ2pELElBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSztnQkFBRSxPQUFPO1lBQ3ZELE9BQU8sQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUMsSUFBSSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUNELHNDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsY0FBYyxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3pGLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxRCxJQUFHLEdBQUcsR0FBQyxFQUFFLEVBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFDRCwrQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsR0FBQyxLQUFLLENBQUM7UUFDM0Msa0JBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUEvQ2dCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0FnRG5DO0lBQUQsc0JBQUM7Q0FoREQsQUFnREMsQ0FoRDRDLEVBQUUsQ0FBQyxTQUFTLEdBZ0R4RDtrQkFoRG9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5pbXBvcnQgcGxheWVySHAgZnJvbSBcIi4vdWkvcGxheWVySHBcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBkcm9wQmxvb2RCb3R0bGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgaHA6bnVtYmVyPTEwMDtcbiAgICBmb3JjZVg6bnVtYmVyPTMwMDAwO1xuICAgIGZvcmNlWTpudW1iZXI9MjAwMDA7XG4gICAgcmlnaWJvZHk6Y2MuUmlnaWRCb2R5PW51bGw7XG4gICAgaXNNb3ZlVG9QbGF5ZXI6Ym9vbGVhbj1mYWxzZTtcbiAgICBzcGVlZDpudW1iZXI9NTAwO1xuICAgIHRhcmdldFBvc2l0aW9uOmNjLlZlYzM9bnVsbDtcblxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLnJpZ2lib2R5PXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICB9XG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLmZvcmNlWD10aGlzLm5vZGUueD5HYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueD90aGlzLmZvcmNlWDotdGhpcy5mb3JjZVg7XG4gICAgICAgIHRoaXMucmlnaWJvZHkuYXBwbHlGb3JjZVRvQ2VudGVyKGNjLnYyKHRoaXMuZm9yY2VYLHRoaXMuZm9yY2VZKSxmYWxzZSk7XG4gICAgfVxuICAgIHVwZGF0ZSgpe1xuICAgICAgICBpZih0aGlzLmlzTW92ZVRvUGxheWVyKXtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvUGxheWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdDogY2MuUGh5c2ljc0NvbnRhY3QsIHNlbGZDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyLCBvdGhlckNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIpIHtcbiAgICAgICAgbGV0IG90aGVyID0gb3RoZXJDb2xsaWRlci5ub2RlO1xuICAgICAgICBpZiAob3RoZXIuZ3JvdXAgPT0gXCJncm91bmRcIikge1xuICAgICAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52MigwLDApO1xuICAgICAgICB9ZWxzZSBpZihvdGhlci5ncm91cD09XCJwbGF5ZXJcIiYmb3RoZXIubmFtZT09XCJwbGF5ZXJcIil7XG4gICAgICAgICAgICBpZihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLmlzRGllKSByZXR1cm47XG4gICAgICAgICAgICBjb250YWN0LmRpc2FibGVkPXRydWU7XG4gICAgICAgICAgICB0aGlzLmlzTW92ZVRvUGxheWVyPXRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW92ZVRvUGxheWVyKCl7XG4gICAgICAgIHRoaXMudGFyZ2V0UG9zaXRpb249Y2MudjMoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLngsR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnkrNzApXG4gICAgICAgIGxldCBkaXJlY3Q9dGhpcy50YXJnZXRQb3NpdGlvbi5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5ub3JtYWxpemVTZWxmKCk7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIoZGlyZWN0LngqdGhpcy5zcGVlZCxkaXJlY3QueSp0aGlzLnNwZWVkKTtcbiAgICAgICAgbGV0IGxlbj10aGlzLnRhcmdldFBvc2l0aW9uLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pLmxlbigpO1xuICAgICAgICBpZihsZW48MTApe1xuICAgICAgICAgICAgdGhpcy5hZGRIcCgpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkSHAoKXtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5lbmFibGVkQ29udGFjdExpc3RlbmVyPWZhbHNlO1xuICAgICAgICBwbGF5ZXJIcC5pbnN0YW5jZS5hZGRIcCh0aGlzLmhwKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9XG59XG4iXX0=