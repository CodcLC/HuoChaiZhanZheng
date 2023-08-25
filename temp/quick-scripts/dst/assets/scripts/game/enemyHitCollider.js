
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/enemyHitCollider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4228fWsEGBIiYISQtcKtF0Q', 'enemyHitCollider');
// scripts/game/enemyHitCollider.ts

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
var animationState_1 = require("./animationState");
var playerController_1 = require("./playerController");
var bossHp_1 = require("./ui/bossHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemyHitCollider = /** @class */ (function (_super) {
    __extends(enemyHitCollider, _super);
    function enemyHitCollider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyControl = null;
        _this.player = null;
        return _this;
    }
    enemyHitCollider.prototype.onDisable = function () {
        this.player = null;
    };
    enemyHitCollider.prototype.hit = function (enemy, dmg, isKnockDown) {
        if (isKnockDown === void 0) { isKnockDown = false; }
        if (this.player) {
            this.player.getComponent(playerController_1.default).beHit(enemy, dmg, isKnockDown);
        }
    };
    enemyHitCollider.prototype.onCollisionEnter = function (other, self) {
        if (other.node.group == "player") {
            this.player = other.node;
            if (this.enemyControl != null) {
                if (this.enemyControl.node.name == bossHp_1.bossName.enemy10) {
                    this.enemyControl.hit_rush();
                }
                else if (this.enemyControl.node.name == animationState_1.enemyName.bigSquid) {
                    this.enemyControl.hit();
                }
                else if (this.enemyControl.node.name == bossHp_1.bossName.enemy39) {
                    this.enemyControl.laserHit();
                }
                else if (this.enemyControl.node.name == animationState_1.enemyName.enemy18) {
                    this.enemyControl.hit();
                }
            }
        }
    };
    enemyHitCollider.prototype.onCollisionExit = function (other, self) {
        this.player = null;
    };
    enemyHitCollider = __decorate([
        ccclass
    ], enemyHitCollider);
    return enemyHitCollider;
}(cc.Component));
exports.default = enemyHitCollider;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZW5lbXlIaXRDb2xsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixtREFBNkM7QUFDN0MsdURBQWtEO0FBQ2xELHNDQUF1QztBQUVqQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE4QyxvQ0FBWTtJQUExRDtRQUFBLHFFQWdDQztRQTlCRyxrQkFBWSxHQUFLLElBQUksQ0FBQztRQUN0QixZQUFNLEdBQVMsSUFBSSxDQUFDOztJQTZCeEIsQ0FBQztJQTNCRyxvQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNELDhCQUFHLEdBQUgsVUFBSSxLQUFhLEVBQUMsR0FBVSxFQUFDLFdBQXlCO1FBQXpCLDRCQUFBLEVBQUEsbUJBQXlCO1FBQ2xELElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNYLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLENBQUM7U0FDM0U7SUFDTCxDQUFDO0lBQ0QsMkNBQWdCLEdBQWhCLFVBQWlCLEtBQWlCLEVBQUMsSUFBZ0I7UUFDL0MsSUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBRSxRQUFRLEVBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBRSxJQUFJLEVBQUM7Z0JBQ3ZCLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFFLGlCQUFRLENBQUMsT0FBTyxFQUFDO29CQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNoQztxQkFBSyxJQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksSUFBRSwwQkFBUyxDQUFDLFFBQVEsRUFBQztvQkFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDM0I7cUJBQUssSUFBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUUsaUJBQVEsQ0FBQyxPQUFPLEVBQUM7b0JBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2hDO3FCQUFLLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFFLDBCQUFTLENBQUMsT0FBTyxFQUFDO29CQUNwRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUMzQjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsMENBQWUsR0FBZixVQUFnQixLQUFpQixFQUFDLElBQWdCO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUEvQmdCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBZ0NwQztJQUFELHVCQUFDO0NBaENELEFBZ0NDLENBaEM2QyxFQUFFLENBQUMsU0FBUyxHQWdDekQ7a0JBaENvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgZW5lbXlOYW1lIH0gZnJvbSBcIi4vYW5pbWF0aW9uU3RhdGVcIjtcbmltcG9ydCBwbGF5ZXJDb250cm9sbGVyIGZyb20gXCIuL3BsYXllckNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGJvc3NOYW1lIH0gZnJvbSBcIi4vdWkvYm9zc0hwXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW5lbXlIaXRDb2xsaWRlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBlbmVteUNvbnRyb2w6YW55PW51bGw7XG4gICAgcGxheWVyOmNjLk5vZGU9bnVsbDtcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyPW51bGw7XG4gICAgfVxuICAgIGhpdChlbmVteTpjYy5Ob2RlLGRtZzpudW1iZXIsaXNLbm9ja0Rvd246Ym9vbGVhbj1mYWxzZSl7XG4gICAgICAgIGlmKHRoaXMucGxheWVyKXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmdldENvbXBvbmVudChwbGF5ZXJDb250cm9sbGVyKS5iZUhpdChlbmVteSxkbWcsaXNLbm9ja0Rvd24pO1xuICAgICAgICB9IFxuICAgIH1cbiAgICBvbkNvbGxpc2lvbkVudGVyKG90aGVyOmNjLkNvbGxpZGVyLHNlbGY6Y2MuQ29sbGlkZXIpe1xuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwPT1cInBsYXllclwiKXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyPW90aGVyLm5vZGU7XG4gICAgICAgICAgICBpZih0aGlzLmVuZW15Q29udHJvbCE9bnVsbCl7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5lbmVteUNvbnRyb2wubm9kZS5uYW1lPT1ib3NzTmFtZS5lbmVteTEwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2wuaGl0X3J1c2goKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmVuZW15Q29udHJvbC5ub2RlLm5hbWU9PWVuZW15TmFtZS5iaWdTcXVpZCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sLmhpdCgpO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuZW5lbXlDb250cm9sLm5vZGUubmFtZT09Ym9zc05hbWUuZW5lbXkzOSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sLmxhc2VySGl0KCk7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5lbmVteUNvbnRyb2wubm9kZS5uYW1lPT1lbmVteU5hbWUuZW5lbXkxOCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sLmhpdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkNvbGxpc2lvbkV4aXQob3RoZXI6Y2MuQ29sbGlkZXIsc2VsZjpjYy5Db2xsaWRlcil7XG4gICAgICAgIHRoaXMucGxheWVyPW51bGw7XG4gICAgfVxufVxuIl19