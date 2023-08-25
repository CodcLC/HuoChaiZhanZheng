
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/playerPandant.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '67fc6T27PNOl4l9vGJy/Vcn', 'playerPandant');
// scripts/game/playerPandant.ts

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
var playerController_1 = require("./playerController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerPandant = /** @class */ (function (_super) {
    __extends(playerPandant, _super);
    function playerPandant() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.player = null;
        _this.playerControl = null;
        _this.distanceX = 80;
        _this.distanceY = 80;
        _this.isInit = false;
        return _this;
    }
    playerPandant.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    playerPandant.prototype.start = function () {
    };
    playerPandant.prototype.init = function () {
        this.playerControl = this.player.getComponent(playerController_1.default);
        this.node.setPosition(this.player.x - this.distanceX, this.player.y + this.distanceY);
        this.node.active = true;
        this.isInit = true;
    };
    playerPandant.prototype.update = function (dt) {
        if (this.isInit) {
            this.follow();
        }
    };
    playerPandant.prototype.follow = function () {
        var newPos = cc.v3(0, this.player.y + this.distanceY);
        if (this.playerControl.skeleton.node.scaleX > 0) {
            newPos.x = this.player.x - this.distanceX;
        }
        else {
            newPos.x = this.player.x + this.distanceX;
        }
        this.node.position = this.node.position.lerp(newPos, 0.1);
    };
    playerPandant = __decorate([
        ccclass
    ], playerPandant);
    return playerPandant;
}(cc.Component));
exports.default = playerPandant;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxccGxheWVyUGFuZGFudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRix1REFBa0Q7QUFFNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUFxQ0M7UUFuQ0csZUFBUyxHQUFjLElBQUksQ0FBQztRQUM1QixZQUFNLEdBQVMsSUFBSSxDQUFDO1FBQ3BCLG1CQUFhLEdBQWtCLElBQUksQ0FBQztRQUVwQyxlQUFTLEdBQVEsRUFBRSxDQUFDO1FBQ3BCLGVBQVMsR0FBUSxFQUFFLENBQUM7UUFDcEIsWUFBTSxHQUFTLEtBQUssQ0FBQzs7SUE2QnpCLENBQUM7SUEzQkcsOEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCw2QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUNELDRCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCw4QkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFDRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxNQUFNLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELElBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUM7WUFDekMsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pDO2FBQUk7WUFDRCxNQUFNLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDekM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFwQ2dCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FxQ2pDO0lBQUQsb0JBQUM7Q0FyQ0QsQUFxQ0MsQ0FyQzBDLEVBQUUsQ0FBQyxTQUFTLEdBcUN0RDtrQkFyQ29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHBsYXllckNvbnRyb2xsZXIgZnJvbSBcIi4vcGxheWVyQ29udHJvbGxlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBsYXllclBhbmRhbnQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgYW5pbWF0aW9uOmNjLkFuaW1hdGlvbj1udWxsO1xuICAgIHBsYXllcjpjYy5Ob2RlPW51bGw7XG4gICAgcGxheWVyQ29udHJvbDpwbGF5ZXJDb250cm9sbGVyPW51bGw7XG5cbiAgICBkaXN0YW5jZVg6bnVtYmVyPTgwO1xuICAgIGRpc3RhbmNlWTpudW1iZXI9ODA7XG4gICAgaXNJbml0OmJvb2xlYW49ZmFsc2U7XG5cbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5hbmltYXRpb249dGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMucGxheWVyQ29udHJvbD10aGlzLnBsYXllci5nZXRDb21wb25lbnQocGxheWVyQ29udHJvbGxlcik7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLnBsYXllci54LXRoaXMuZGlzdGFuY2VYLHRoaXMucGxheWVyLnkrdGhpcy5kaXN0YW5jZVkpO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMuaXNJbml0PXRydWU7XG4gICAgfVxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgaWYodGhpcy5pc0luaXQpe1xuICAgICAgICAgICAgdGhpcy5mb2xsb3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb2xsb3coKXtcbiAgICAgICAgbGV0IG5ld1Bvcz1jYy52MygwLHRoaXMucGxheWVyLnkrdGhpcy5kaXN0YW5jZVkpO1xuICAgICAgICBpZih0aGlzLnBsYXllckNvbnRyb2wuc2tlbGV0b24ubm9kZS5zY2FsZVg+MCl7XG4gICAgICAgICAgICBuZXdQb3MueD10aGlzLnBsYXllci54LXRoaXMuZGlzdGFuY2VYO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG5ld1Bvcy54PXRoaXMucGxheWVyLngrdGhpcy5kaXN0YW5jZVg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnBvc2l0aW9uPXRoaXMubm9kZS5wb3NpdGlvbi5sZXJwKG5ld1BvcywwLjEpO1xuICAgIH1cbn1cbiJdfQ==