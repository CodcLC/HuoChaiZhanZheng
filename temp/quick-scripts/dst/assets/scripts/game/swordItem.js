
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/swordItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01e05IoNoRJAa0EdrjqKjl7', 'swordItem');
// scripts/game/swordItem.ts

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
var rock_1 = require("./rock");
var skillPool_1 = require("./skillPool");
var swordSmoke_1 = require("./swordSmoke");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var swordItem = /** @class */ (function (_super) {
    __extends(swordItem, _super);
    function swordItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRight = false;
        _this.isDestory = false;
        _this.rightAngle = 138;
        _this.leftAngle = 42;
        _this.offsetX = 74;
        _this.offsetY = -67;
        _this.movex1 = 0;
        _this.movey1 = 0;
        _this.movex2 = 0;
        _this.movey2 = 0;
        _this.damage = 0;
        _this.enemysHadHit = [];
        return _this;
    }
    swordItem.prototype.onLoad = function () {
        this.movex1 = this.offsetX * 0.3;
        this.movey1 = this.offsetY * 0.3;
        this.movex2 = this.offsetX * 5;
        this.movey2 = this.offsetY * 5;
    };
    swordItem.prototype.onEnable = function () {
    };
    swordItem.prototype.init = function () {
        this.movex1 = this.isRight ? Math.abs(this.movex1) : -Math.abs(this.movex1);
        this.movex2 = this.isRight ? Math.abs(this.movex2) : -Math.abs(this.movex2);
    };
    swordItem.prototype.tween = function () {
        var _this = this;
        //cc.v2(74,67);
        this.init();
        var scaleXOffset = caijiTools_1.caijiTools.random_int(50, 60) / 10;
        this.node.angle = this.isRight ? this.rightAngle : this.leftAngle;
        cc.tween(this.node)
            .by(0.04, { scale: 1 })
            .by(0.12, { position: cc.v3(this.movex1, this.movey1) })
            .parallel(cc.tween().by(0.1, { scaleX: scaleXOffset }, { easing: "sineIn" }), cc.tween().by(0.1, { scaleY: -0.5, position: cc.v3(this.movex2, this.movey2) }))
            .start();
        this.scheduleOnce(function () {
            skillPool_1.default.instance.recoverySword1(_this.node);
        }, 0.25);
    };
    /*     onBeginContact (contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider) {
            let other=otherCollider.node;
            let pos=contact.getWorldManifold();
            contact.disabled=true;
            if (other.group == "ground") {
                //落地
                if(this.isDestory) return;
                this.isDestory=true;
                this.createSmoke(pos.points[0],other);
            }else if(other.group=="enemy"){
                //击中敌人
                if(this.enemysHadHit.includes(other)) return;
                //@ts-ignore
                other.getComponent(enemyScript[other.name]).beHit(this.damage, attackType.swordRain);
                this.enemysHadHit.push(other);
            }
        } */
    swordItem.prototype.createSmoke = function (collidePos, ground) {
        var smoke = skillPool_1.default.instance.getSwordSmoke();
        var nodePos = this.node.parent.parent.convertToNodeSpaceAR(collidePos);
        nodePos.x = nodePos.x + caijiTools_1.caijiTools.random_int(-300, 100) / 10;
        nodePos.y = nodePos.y + caijiTools_1.caijiTools.random_int(100, 500) / 10;
        smoke.setParent(this.node.parent.parent);
        smoke.setSiblingIndex(ground.getSiblingIndex() - 1);
        smoke.setPosition(nodePos);
        smoke.getComponent(swordSmoke_1.default).tween();
        smoke.active = true;
        this.createRock(nodePos);
        skillPool_1.default.instance.recoverySword1(this.node);
    };
    swordItem.prototype.createRock = function (pos) {
        var rockNode = skillPool_1.default.instance.getRock();
        rockNode.setParent(this.node.parent.parent);
        rockNode.setPosition(pos);
        rockNode.getComponent(rock_1.default).tween();
        rockNode.setSiblingIndex(rockNode.getSiblingIndex() - 1);
        rockNode.active = true;
    };
    swordItem.prototype.reuse = function () {
        cc.Tween.stopAllByTarget(this.node);
        this.isDestory = false;
    };
    swordItem.prototype.unuse = function () {
        this.node.scale = 0;
        this.enemysHadHit = [];
    };
    swordItem = __decorate([
        ccclass
    ], swordItem);
    return swordItem;
}(cc.Component));
exports.default = swordItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc3dvcmRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2xGLDRDQUEyQztBQUkzQywrQkFBMEI7QUFDMUIseUNBQW9DO0FBQ3BDLDJDQUFzQztBQUdoQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQTBGQztRQXhGRyxhQUFPLEdBQVMsS0FBSyxDQUFDO1FBQ3RCLGVBQVMsR0FBUyxLQUFLLENBQUM7UUFDeEIsZ0JBQVUsR0FBUSxHQUFHLENBQUM7UUFDdEIsZUFBUyxHQUFRLEVBQUUsQ0FBQztRQUNwQixhQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLGFBQU8sR0FBUSxDQUFDLEVBQUUsQ0FBQztRQUNuQixZQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixZQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsa0JBQVksR0FBbUIsRUFBRSxDQUFDOztJQTZFdEMsQ0FBQztJQTVFRywwQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBQyxJ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QUUsQ0FBQztJQUN6QixDQUFDO0lBekZnQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBMEY3QjtJQUFELGdCQUFDO0NBMUZELEFBMEZDLENBMUZzQyxFQUFFLENBQUMsU0FBUyxHQTBGbEQ7a0JBMUZvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGF1ZGlvTmFtZSB9IGZyb20gXCIuLi9hdWRpb05hbWVNZ3JcIjtcbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vbWFpbi9hdWRpb01hbmFnZXJcIjtcbmltcG9ydCB7IGF0dGFja1R5cGUsIGVuZW15U2NyaXB0IH0gZnJvbSBcIi4vYW5pbWF0aW9uU3RhdGVcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHJvY2sgZnJvbSBcIi4vcm9ja1wiO1xuaW1wb3J0IHNraWxsUG9vbCBmcm9tIFwiLi9za2lsbFBvb2xcIjtcbmltcG9ydCBzd29yZFNtb2tlIGZyb20gXCIuL3N3b3JkU21va2VcIjtcbmltcG9ydCBwbGF5ZXJIcCBmcm9tIFwiLi91aS9wbGF5ZXJIcFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN3b3JkSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBpc1JpZ2h0OmJvb2xlYW49ZmFsc2U7XG4gICAgaXNEZXN0b3J5OmJvb2xlYW49ZmFsc2U7XG4gICAgcmlnaHRBbmdsZTpudW1iZXI9MTM4O1xuICAgIGxlZnRBbmdsZTpudW1iZXI9NDI7XG4gICAgb2Zmc2V0WDpudW1iZXI9NzQ7XG4gICAgb2Zmc2V0WTpudW1iZXI9LTY3O1xuICAgIG1vdmV4MTpudW1iZXI9MDtcbiAgICBtb3ZleTE6bnVtYmVyPTA7XG4gICAgbW92ZXgyOm51bWJlcj0wO1xuICAgIG1vdmV5MjpudW1iZXI9MDtcbiAgICBkYW1hZ2U6bnVtYmVyPTA7XG4gICAgZW5lbXlzSGFkSGl0OiBBcnJheTxjYy5Ob2RlPiA9IFtdO1xuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMubW92ZXgxPXRoaXMub2Zmc2V0WCowLjM7XG4gICAgICAgIHRoaXMubW92ZXkxPXRoaXMub2Zmc2V0WSowLjM7XG4gICAgICAgIHRoaXMubW92ZXgyPXRoaXMub2Zmc2V0WCo1O1xuICAgICAgICB0aGlzLm1vdmV5Mj10aGlzLm9mZnNldFkqNTtcbiAgICB9XG4gICAgb25FbmFibGUoKXtcblxuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMubW92ZXgxPXRoaXMuaXNSaWdodD9NYXRoLmFicyh0aGlzLm1vdmV4MSk6LU1hdGguYWJzKHRoaXMubW92ZXgxKTtcbiAgICAgICAgdGhpcy5tb3ZleDI9dGhpcy5pc1JpZ2h0P01hdGguYWJzKHRoaXMubW92ZXgyKTotTWF0aC5hYnModGhpcy5tb3ZleDIpO1xuICAgIH1cbiAgICB0d2VlbiAoKSB7XG4gICAgICAgIC8vY2MudjIoNzQsNjcpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgbGV0IHNjYWxlWE9mZnNldDpudW1iZXI9Y2FpamlUb29scy5yYW5kb21faW50KDUwLDYwKS8xMDtcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlPXRoaXMuaXNSaWdodD90aGlzLnJpZ2h0QW5nbGU6dGhpcy5sZWZ0QW5nbGU7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgLmJ5KDAuMDQse3NjYWxlOjF9KVxuICAgICAgICAuYnkoMC4xMix7cG9zaXRpb246Y2MudjModGhpcy5tb3ZleDEsdGhpcy5tb3ZleTEpfSlcbiAgICAgICAgLnBhcmFsbGVsKFxuICAgICAgICAgICAgY2MudHdlZW4oKS5ieSgwLjEse3NjYWxlWDpzY2FsZVhPZmZzZXR9LHtlYXNpbmc6XCJzaW5lSW5cIn0pLFxuICAgICAgICAgICAgY2MudHdlZW4oKS5ieSgwLjEse3NjYWxlWTotMC41LHBvc2l0aW9uOmNjLnYzKHRoaXMubW92ZXgyLHRoaXMubW92ZXkyKX0pXG4gICAgICAgIClcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBza2lsbFBvb2wuaW5zdGFuY2UucmVjb3ZlcnlTd29yZDEodGhpcy5ub2RlKTtcbiAgICAgICAgfSwwLjI1KTtcbiAgICB9XG4vKiAgICAgb25CZWdpbkNvbnRhY3QgKGNvbnRhY3Q6Y2MuUGh5c2ljc0NvbnRhY3Qsc2VsZkNvbGxpZGVyOmNjLlBoeXNpY3NDb2xsaWRlcixvdGhlckNvbGxpZGVyOmNjLlBoeXNpY3NDb2xsaWRlcikge1xuICAgICAgICBsZXQgb3RoZXI9b3RoZXJDb2xsaWRlci5ub2RlO1xuICAgICAgICBsZXQgcG9zPWNvbnRhY3QuZ2V0V29ybGRNYW5pZm9sZCgpO1xuICAgICAgICBjb250YWN0LmRpc2FibGVkPXRydWU7XG4gICAgICAgIGlmIChvdGhlci5ncm91cCA9PSBcImdyb3VuZFwiKSB7XG4gICAgICAgICAgICAvL+iQveWcsFxuICAgICAgICAgICAgaWYodGhpcy5pc0Rlc3RvcnkpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuaXNEZXN0b3J5PXRydWU7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVNtb2tlKHBvcy5wb2ludHNbMF0sb3RoZXIpO1xuICAgICAgICB9ZWxzZSBpZihvdGhlci5ncm91cD09XCJlbmVteVwiKXtcbiAgICAgICAgICAgIC8v5Ye75Lit5pWM5Lq6XG4gICAgICAgICAgICBpZih0aGlzLmVuZW15c0hhZEhpdC5pbmNsdWRlcyhvdGhlcikpIHJldHVybjtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgb3RoZXIuZ2V0Q29tcG9uZW50KGVuZW15U2NyaXB0W290aGVyLm5hbWVdKS5iZUhpdCh0aGlzLmRhbWFnZSwgYXR0YWNrVHlwZS5zd29yZFJhaW4pO1xuICAgICAgICAgICAgdGhpcy5lbmVteXNIYWRIaXQucHVzaChvdGhlcik7XG4gICAgICAgIH1cbiAgICB9ICovXG4gICAgY3JlYXRlU21va2UoY29sbGlkZVBvczpjYy5WZWMyLGdyb3VuZDpjYy5Ob2RlKXtcbiAgICAgICAgbGV0IHNtb2tlPXNraWxsUG9vbC5pbnN0YW5jZS5nZXRTd29yZFNtb2tlKCk7XG4gICAgICAgIGxldCBub2RlUG9zPXRoaXMubm9kZS5wYXJlbnQucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKGNvbGxpZGVQb3MpO1xuICAgICAgICBub2RlUG9zLng9bm9kZVBvcy54K2NhaWppVG9vbHMucmFuZG9tX2ludCgtMzAwLDEwMCkvMTA7XG4gICAgICAgIG5vZGVQb3MueT1ub2RlUG9zLnkrY2FpamlUb29scy5yYW5kb21faW50KDEwMCw1MDApLzEwO1xuICAgICAgICBzbW9rZS5zZXRQYXJlbnQodGhpcy5ub2RlLnBhcmVudC5wYXJlbnQpO1xuICAgICAgICBzbW9rZS5zZXRTaWJsaW5nSW5kZXgoZ3JvdW5kLmdldFNpYmxpbmdJbmRleCgpLTEpO1xuICAgICAgICBzbW9rZS5zZXRQb3NpdGlvbihub2RlUG9zKTtcbiAgICAgICAgc21va2UuZ2V0Q29tcG9uZW50KHN3b3JkU21va2UpLnR3ZWVuKCk7XG4gICAgICAgIHNtb2tlLmFjdGl2ZT10cnVlO1xuICAgICAgICB0aGlzLmNyZWF0ZVJvY2sobm9kZVBvcyk7XG4gICAgICAgIHNraWxsUG9vbC5pbnN0YW5jZS5yZWNvdmVyeVN3b3JkMSh0aGlzLm5vZGUpO1xuICAgIH1cbiAgICBjcmVhdGVSb2NrKHBvczpjYy5WZWMyKXtcbiAgICAgICAgbGV0IHJvY2tOb2RlPXNraWxsUG9vbC5pbnN0YW5jZS5nZXRSb2NrKCk7XG4gICAgICAgIHJvY2tOb2RlLnNldFBhcmVudCh0aGlzLm5vZGUucGFyZW50LnBhcmVudCk7XG4gICAgICAgIHJvY2tOb2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIHJvY2tOb2RlLmdldENvbXBvbmVudChyb2NrKS50d2VlbigpO1xuICAgICAgICByb2NrTm9kZS5zZXRTaWJsaW5nSW5kZXgocm9ja05vZGUuZ2V0U2libGluZ0luZGV4KCktMSk7XG4gICAgICAgIHJvY2tOb2RlLmFjdGl2ZT10cnVlO1xuICAgIH1cbiAgICByZXVzZSgpe1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5pc0Rlc3Rvcnk9ZmFsc2U7XG4gICAgfVxuICAgIHVudXNlKCl7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZT0wO1xuICAgICAgICB0aGlzLmVuZW15c0hhZEhpdD1bXTtcbiAgICB9XG59XG4iXX0=