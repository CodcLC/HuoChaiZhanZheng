
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/cameraControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c02ciEqSJJmLZwwwoTkkhj', 'cameraControl');
// scripts/game/cameraControl.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var cameraControl = /** @class */ (function (_super) {
    __extends(cameraControl, _super);
    function cameraControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cameraNode = null;
        _this.mainCamera = null;
        _this.offsetX = 0; //相机移动条件:与玩家X轴相差临界值
        _this.y_min = -200;
        _this.y_max = 90;
        _this.maxOffsetX = [
            1300, 50, 1000, 0, 320, 250, 250, 800, 450, 0,
            1000, 1100, 650, 1000, 1000, 1000, 0, 1100, 1800, 1100
        ];
        return _this;
    }
    cameraControl_1 = cameraControl;
    cameraControl.prototype.onLoad = function () {
        cameraControl_1.instance = this;
        this.cameraNode = this.node;
        this.offsetX = 0; //cc.winSize.width/2*0.4;
        this.mainCamera = this.node.getComponent(cc.Camera);
    };
    cameraControl.prototype.start = function () {
    };
    cameraControl.prototype.update = function (dt) {
        if (GameManager_1.default.instance.playerController == null)
            return;
        var worldPos_player = GameManager_1.default.instance.player.parent.convertToWorldSpaceAR(GameManager_1.default.instance.player.position);
        var nodePos_player = this.node.parent.convertToNodeSpaceAR(worldPos_player);
        this.changeCameraX(nodePos_player);
    };
    cameraControl.prototype.changeCameraY = function (screenPos, nodePos_player) {
        var newY = 0;
        if ((screenPos.y - 320) > 70) {
            newY = nodePos_player.y - 70;
            newY = newY > this.y_max ? this.y_max : newY;
            this.node.y = cc.misc.lerp(this.node.y, newY, 0.05);
        }
        else if (screenPos.y < 250) {
            newY = nodePos_player.y + 70;
            newY = newY < this.y_min ? this.y_min : newY;
            this.node.y = cc.misc.lerp(this.node.y, newY, 0.1);
        }
    };
    cameraControl.prototype.changeCameraX = function (nodePos_player) {
        if (Math.abs(nodePos_player.x - this.node.x) >= this.offsetX) {
            if ((this.node.x <= 0 && this.node.x > nodePos_player.x) ||
                (this.node.x >= this.maxOffsetX[0] && this.node.x < nodePos_player.x)) {
                return;
            }
            var newX = nodePos_player.x > this.node.x ? nodePos_player.x - this.offsetX : nodePos_player.x + this.offsetX;
            this.node.x = cc.misc.lerp(this.node.x, newX, 0.1);
        }
    };
    cameraControl.prototype.getPlayerPosInBuildCamera = function (player) {
        var screenPos = new cc.Vec2();
        var toWorldPos = player.parent.convertToWorldSpaceAR(player.getPosition());
        this.mainCamera.getWorldToScreenPoint(toWorldPos, screenPos);
        return screenPos;
    };
    cameraControl.prototype.changeCameraView = function (time, position, zoomRatio) {
        cc.tween(this.node)
            .to(time, { position: position }, { easing: "sineOut" })
            .start();
        cc.tween(this.mainCamera)
            .to(time, { zoomRatio: zoomRatio }, { easing: "sineOut" })
            .start();
    };
    var cameraControl_1;
    cameraControl.instance = null;
    cameraControl = cameraControl_1 = __decorate([
        ccclass
    ], cameraControl);
    return cameraControl;
}(cc.Component));
exports.default = cameraControl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcY2FtZXJhQ29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdsRiw2Q0FBd0M7QUFFbEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUFtRUM7UUFqRUcsZ0JBQVUsR0FBUyxJQUFJLENBQUM7UUFDeEIsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFDMUIsYUFBTyxHQUFRLENBQUMsQ0FBQyxDQUFBLG1CQUFtQjtRQUVwQyxXQUFLLEdBQVEsQ0FBQyxHQUFHLENBQUM7UUFDbEIsV0FBSyxHQUFRLEVBQUUsQ0FBQztRQXdEaEIsZ0JBQVUsR0FBVTtZQUNoQixJQUFJLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxDQUFDO1lBQ3BDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUk7U0FDaEQsQ0FBQzs7SUFDTixDQUFDO3NCQW5Fb0IsYUFBYTtJQVM5Qiw4QkFBTSxHQUFOO1FBQ0ksZUFBYSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUEseUJBQXlCO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCw2QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELDhCQUFNLEdBQU4sVUFBUSxFQUFFO1FBQ04sSUFBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsSUFBRSxJQUFJO1lBQUUsT0FBTztRQUN2RCxJQUFJLGVBQWUsR0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuSCxJQUFJLGNBQWMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxxQ0FBYSxHQUFiLFVBQWMsU0FBaUIsRUFBQyxjQUFjO1FBQzFDLElBQUksSUFBSSxHQUFDLENBQUMsQ0FBQztRQUNYLElBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxHQUFDLEVBQUUsRUFBQztZQUNwQixJQUFJLEdBQUMsY0FBYyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7WUFDekIsSUFBSSxHQUFDLElBQUksR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25EO2FBQUssSUFBRyxTQUFTLENBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQztZQUNyQixJQUFJLEdBQUMsY0FBYyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7WUFDekIsSUFBSSxHQUFDLElBQUksR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQztJQUNELHFDQUFhLEdBQWIsVUFBYyxjQUFjO1FBQ3hCLElBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNwRCxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUM7Z0JBQzVELE9BQU87YUFDVjtZQUNELElBQUksSUFBSSxHQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLGNBQWMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUEsY0FBYyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFDRCxpREFBeUIsR0FBekIsVUFBMEIsTUFBYztRQUNwQyxJQUFJLFNBQVMsR0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCx3Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBVyxFQUFDLFFBQWdCLEVBQUMsU0FBZ0I7UUFDMUQsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2xCLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLENBQUM7YUFDL0MsS0FBSyxFQUFFLENBQUM7UUFDVCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDeEIsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsQ0FBQzthQUNqRCxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUM7O0lBckRNLHNCQUFRLEdBQWUsSUFBSSxDQUFDO0lBUmxCLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FtRWpDO0lBQUQsb0JBQUM7Q0FuRUQsQUFtRUMsQ0FuRTBDLEVBQUUsQ0FBQyxTQUFTLEdBbUV0RDtrQkFuRW9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjYW1lcmFDb250cm9sIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIGNhbWVyYU5vZGU6Y2MuTm9kZT1udWxsO1xuICAgIG1haW5DYW1lcmE6Y2MuQ2FtZXJhPW51bGw7XG4gICAgb2Zmc2V0WDpudW1iZXI9MDsvL+ebuOacuuenu+WKqOadoeS7tjrkuI7njqnlrrZY6L2055u45beu5Li055WM5YC8XG5cbiAgICB5X21pbjpudW1iZXI9LTIwMDtcbiAgICB5X21heDpudW1iZXI9OTA7XG4gICAgc3RhdGljIGluc3RhbmNlOmNhbWVyYUNvbnRyb2w9bnVsbDtcbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBjYW1lcmFDb250cm9sLmluc3RhbmNlPXRoaXM7XG4gICAgICAgIHRoaXMuY2FtZXJhTm9kZT10aGlzLm5vZGU7XG4gICAgICAgIHRoaXMub2Zmc2V0WD0wOy8vY2Mud2luU2l6ZS53aWR0aC8yKjAuNDtcbiAgICAgICAgdGhpcy5tYWluQ2FtZXJhPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQ2FtZXJhKTtcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7ICAgICBcblxuICAgIH1cblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlcj09bnVsbCkgcmV0dXJuO1xuICAgICAgICBsZXQgd29ybGRQb3NfcGxheWVyPUdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci5wb3NpdGlvbik7XG4gICAgICAgIGxldCBub2RlUG9zX3BsYXllcj10aGlzLm5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zX3BsYXllcik7XG4gICAgICAgIHRoaXMuY2hhbmdlQ2FtZXJhWChub2RlUG9zX3BsYXllcik7XG4gICAgfVxuICAgIGNoYW5nZUNhbWVyYVkoc2NyZWVuUG9zOmNjLlZlYzIsbm9kZVBvc19wbGF5ZXIpe1xuICAgICAgICBsZXQgbmV3WT0wO1xuICAgICAgICBpZigoc2NyZWVuUG9zLnktMzIwKT43MCl7XG4gICAgICAgICAgICBuZXdZPW5vZGVQb3NfcGxheWVyLnktNzA7XG4gICAgICAgICAgICBuZXdZPW5ld1k+dGhpcy55X21heD90aGlzLnlfbWF4Om5ld1k7XG4gICAgICAgICAgICB0aGlzLm5vZGUueT1jYy5taXNjLmxlcnAodGhpcy5ub2RlLnksbmV3WSwwLjA1KTtcbiAgICAgICAgfWVsc2UgaWYoc2NyZWVuUG9zLnk8MjUwKXtcbiAgICAgICAgICAgIG5ld1k9bm9kZVBvc19wbGF5ZXIueSs3MDtcbiAgICAgICAgICAgIG5ld1k9bmV3WTx0aGlzLnlfbWluP3RoaXMueV9taW46bmV3WTtcbiAgICAgICAgICAgIHRoaXMubm9kZS55PWNjLm1pc2MubGVycCh0aGlzLm5vZGUueSxuZXdZLDAuMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdlQ2FtZXJhWChub2RlUG9zX3BsYXllcil7XG4gICAgICAgIGlmKE1hdGguYWJzKG5vZGVQb3NfcGxheWVyLngtdGhpcy5ub2RlLngpPj10aGlzLm9mZnNldFgpe1xuICAgICAgICAgICAgaWYoKHRoaXMubm9kZS54PD0wJiZ0aGlzLm5vZGUueD5ub2RlUG9zX3BsYXllci54KXx8XG4gICAgICAgICAgICAodGhpcy5ub2RlLng+PXRoaXMubWF4T2Zmc2V0WFswXSYmdGhpcy5ub2RlLng8bm9kZVBvc19wbGF5ZXIueCkpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdYPW5vZGVQb3NfcGxheWVyLng+dGhpcy5ub2RlLng/bm9kZVBvc19wbGF5ZXIueC10aGlzLm9mZnNldFg6bm9kZVBvc19wbGF5ZXIueCt0aGlzLm9mZnNldFg7XG4gICAgICAgICAgICB0aGlzLm5vZGUueD1jYy5taXNjLmxlcnAodGhpcy5ub2RlLngsbmV3WCwwLjEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFBsYXllclBvc0luQnVpbGRDYW1lcmEocGxheWVyOmNjLk5vZGUpOmNjLlZlYzJ7XG4gICAgICAgIGxldCBzY3JlZW5Qb3M9bmV3IGNjLlZlYzIoKTtcbiAgICAgICAgbGV0IHRvV29ybGRQb3MgPSBwbGF5ZXIucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihwbGF5ZXIuZ2V0UG9zaXRpb24oKSk7IFxuICAgICAgICB0aGlzLm1haW5DYW1lcmEuZ2V0V29ybGRUb1NjcmVlblBvaW50KHRvV29ybGRQb3Msc2NyZWVuUG9zKTsgXG4gICAgICAgIHJldHVybiBzY3JlZW5Qb3M7XG4gICAgfVxuICAgIGNoYW5nZUNhbWVyYVZpZXcodGltZTpudW1iZXIscG9zaXRpb246Y2MuVmVjMyx6b29tUmF0aW86bnVtYmVyKXtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxuICAgICAgICAudG8odGltZSx7cG9zaXRpb246cG9zaXRpb259LHtlYXNpbmc6XCJzaW5lT3V0XCJ9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5tYWluQ2FtZXJhKVxuICAgICAgICAudG8odGltZSx7em9vbVJhdGlvOnpvb21SYXRpb30se2Vhc2luZzpcInNpbmVPdXRcIn0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIG1heE9mZnNldFg6bnVtYmVyW109W1xuICAgICAgICAxMzAwLDUwLDEwMDAsMCwzMjAsMjUwLDI1MCw4MDAsNDUwLDAsXG4gICAgICAgIDEwMDAsMTEwMCw2NTAsMTAwMCwxMDAwLDEwMDAsMCwxMTAwLDE4MDAsMTEwMFxuICAgIF07XG59XG4iXX0=