
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/swordRain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e9412Qt87xH/J1fRyb224Iq', 'swordRain');
// scripts/game/swordRain.ts

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
var swordItem_1 = require("./swordItem");
var swordItem2_1 = require("./swordItem2");
var swordSmoke_1 = require("./swordSmoke");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var swordRain = /** @class */ (function (_super) {
    __extends(swordRain, _super);
    function swordRain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRight = false; //朝右
        _this.offsetForward_x1 = 400; //技能方向正偏移
        _this.offsetReverse_x1 = 1500; //技能方向反偏移
        _this.offsetForward_x2 = 500; //技能方向正偏移
        _this.offsetReverse_x2 = 1600; //技能方向反偏移
        _this.duration = 1.8;
        _this.smokeX_min = 0;
        _this.smokeX_max = 0;
        return _this;
    }
    swordRain.prototype.start = function () {
        var _this = this;
        if (this.isRight) {
            this.smokeX_min = 250;
            this.smokeX_max = 580;
        }
        else {
            this.smokeX_max = -250;
            this.smokeX_min = -580;
        }
        if (this.isRight) {
            this.node.children[0].active = true;
        }
        else {
            this.node.children[1].active = true;
        }
        this.schedule(this.createSword, 0.06);
        this.scheduleOnce(function () {
            _this.schedule(_this.createSword2, 0.04);
            _this.schedule(_this.createSmoke, 0.06);
        }, 0.3);
        this.scheduleOnce(function () {
            _this.destory();
        }, this.duration);
    };
    swordRain.prototype.destory = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        cc.tween(this.node)
            .to(0.2, { opacity: 0 })
            .call(function () {
            _this.node.children[0].active = false;
            _this.node.children[1].active = false;
            _this.scheduleOnce(function () {
                _this.node.destroy();
            }, 1);
        })
            .start();
    };
    swordRain.prototype.createSword = function () {
        for (var i = 0; i < 2; i++) {
            var sword = skillPool_1.default.instance.getSword1();
            sword.setParent(this.node);
            sword.setPosition(this.getRandomX_sword1() / 10, caijiTools_1.caijiTools.random_int(-500, 1100) / 10);
            sword.active = true;
            sword.getComponent(swordItem_1.default).isRight = this.isRight;
            sword.getComponent(swordItem_1.default).tween();
        }
    };
    swordRain.prototype.createSword2 = function () {
        for (var i = 0; i < 3; i++) {
            var sword2 = skillPool_1.default.instance.getSword2();
            sword2.setParent(this.node);
            sword2.setSiblingIndex(cc.macro.MIN_ZINDEX);
            sword2.setPosition(this.getRandomX_sword2() / 10, caijiTools_1.caijiTools.random_int(-700, 1300) / 10);
            sword2.active = true;
            sword2.getComponent(swordItem2_1.default).isRight = this.isRight;
            sword2.getComponent(swordItem2_1.default).tween();
        }
    };
    swordRain.prototype.getRandomX_sword1 = function () {
        if (this.isRight) {
            return caijiTools_1.caijiTools.random_int(-this.offsetReverse_x1, this.offsetForward_x1);
        }
        else {
            return caijiTools_1.caijiTools.random_int(-this.offsetForward_x1, this.offsetReverse_x1);
        }
    };
    swordRain.prototype.getRandomX_sword2 = function () {
        if (this.isRight) {
            return caijiTools_1.caijiTools.random_int(-this.offsetReverse_x2, this.offsetForward_x2);
        }
        else {
            return caijiTools_1.caijiTools.random_int(-this.offsetForward_x2, this.offsetReverse_x2);
        }
    };
    swordRain.prototype.createSmoke = function () {
        var smoke = skillPool_1.default.instance.getSwordSmoke();
        var nodePos = cc.v2(0, 0);
        nodePos.x = caijiTools_1.caijiTools.random_int(this.smokeX_min, this.smokeX_max);
        nodePos.y = caijiTools_1.caijiTools.random_int(-370, -420);
        smoke.setParent(this.node);
        smoke.setPosition(nodePos);
        smoke.getComponent(swordSmoke_1.default).tween();
        smoke.active = true;
        this.createRock(nodePos);
    };
    swordRain.prototype.createRock = function (pos) {
        var rockNode = skillPool_1.default.instance.getRock();
        rockNode.setParent(this.node);
        rockNode.setPosition(pos);
        rockNode.getComponent(rock_1.default).tween();
        rockNode.active = true;
    };
    swordRain = __decorate([
        ccclass
    ], swordRain);
    return swordRain;
}(cc.Component));
exports.default = swordRain;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc3dvcmRSYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDRDQUEyQztBQUMzQywrQkFBMEI7QUFDMUIseUNBQW9DO0FBQ3BDLHlDQUFvQztBQUNwQywyQ0FBc0M7QUFDdEMsMkNBQXNDO0FBRWhDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBbUdDO1FBakdHLGFBQU8sR0FBUyxLQUFLLENBQUMsQ0FBQSxJQUFJO1FBQzFCLHNCQUFnQixHQUFRLEdBQUcsQ0FBQyxDQUFBLFNBQVM7UUFDckMsc0JBQWdCLEdBQVEsSUFBSSxDQUFDLENBQUEsU0FBUztRQUN0QyxzQkFBZ0IsR0FBUSxHQUFHLENBQUMsQ0FBQSxTQUFTO1FBQ3JDLHNCQUFnQixHQUFRLElBQUksQ0FBQyxDQUFBLFNBQVM7UUFDdEMsY0FBUSxHQUFRLEdBQUcsQ0FBQztRQUVwQixnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUNwQixnQkFBVSxHQUFRLENBQUMsQ0FBQzs7SUF5RnhCLENBQUM7SUF4RkcseUJBQUssR0FBTDtRQUFBLGlCQXFCQztRQXBCRyxJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDWixJQUFJLENBQUMsVUFBVSxHQUFDLEdBQUcsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxHQUFDLEdBQUcsQ0FBQztTQUN2QjthQUFJO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFDLENBQUMsR0FBRyxDQUFDO1NBQ3hCO1FBQ0QsSUFB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QUMsR0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxPQUFPLENBQUMsQ0FBQyxHQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixLQUFLLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QyxLQUFLLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCw4QkFBVSxHQUFWLFVBQVcsR0FBVztRQUNsQixJQUFJLFFBQVEsR0FBQyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxZQUFZLENBQUMsY0FBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsUUFBUSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQWxHZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQW1HN0I7SUFBRCxnQkFBQztDQW5HRCxBQW1HQyxDQW5Hc0MsRUFBRSxDQUFDLFNBQVMsR0FtR2xEO2tCQW5Hb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCByb2NrIGZyb20gXCIuL3JvY2tcIjtcbmltcG9ydCBza2lsbFBvb2wgZnJvbSBcIi4vc2tpbGxQb29sXCI7XG5pbXBvcnQgc3dvcmRJdGVtIGZyb20gXCIuL3N3b3JkSXRlbVwiO1xuaW1wb3J0IHN3b3JkSXRlbTIgZnJvbSBcIi4vc3dvcmRJdGVtMlwiO1xuaW1wb3J0IHN3b3JkU21va2UgZnJvbSBcIi4vc3dvcmRTbW9rZVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN3b3JkUmFpbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBpc1JpZ2h0OmJvb2xlYW49ZmFsc2U7Ly/mnJ3lj7NcbiAgICBvZmZzZXRGb3J3YXJkX3gxOm51bWJlcj00MDA7Ly/mioDog73mlrnlkJHmraPlgY/np7tcbiAgICBvZmZzZXRSZXZlcnNlX3gxOm51bWJlcj0xNTAwOy8v5oqA6IO95pa55ZCR5Y+N5YGP56e7XG4gICAgb2Zmc2V0Rm9yd2FyZF94MjpudW1iZXI9NTAwOy8v5oqA6IO95pa55ZCR5q2j5YGP56e7XG4gICAgb2Zmc2V0UmV2ZXJzZV94MjpudW1iZXI9MTYwMDsvL+aKgOiDveaWueWQkeWPjeWBj+enu1xuICAgIGR1cmF0aW9uOm51bWJlcj0xLjg7XG5cbiAgICBzbW9rZVhfbWluOm51bWJlcj0wO1xuICAgIHNtb2tlWF9tYXg6bnVtYmVyPTA7XG4gICAgc3RhcnQgKCkge1xuICAgICAgICBpZih0aGlzLmlzUmlnaHQpe1xuICAgICAgICAgICAgdGhpcy5zbW9rZVhfbWluPTI1MDtcbiAgICAgICAgICAgIHRoaXMuc21va2VYX21heD01ODA7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5zbW9rZVhfbWF4PS0yNTA7XG4gICAgICAgICAgICB0aGlzLnNtb2tlWF9taW49LTU4MDtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmlzUmlnaHQpe1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZT10cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsxXS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuY3JlYXRlU3dvcmQsMC4wNik7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuY3JlYXRlU3dvcmQyLDAuMDQpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLmNyZWF0ZVNtb2tlLDAuMDYpO1xuICAgICAgICB9LDAuMyk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLmRlc3RvcnkoKTtcbiAgICAgICAgfSx0aGlzLmR1cmF0aW9uKTtcbiAgICB9XG4gICAgZGVzdG9yeSgpe1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxuICAgICAgICAudG8oMC4yLHtvcGFjaXR5OjB9KVxuICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblsxXS5hY3RpdmU9ZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9LDEpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG4gICAgY3JlYXRlU3dvcmQoKXtcbiAgICAgICAgZm9yKGxldCBpPTA7aTwyO2krKyl7XG4gICAgICAgICAgICBsZXQgc3dvcmQ9c2tpbGxQb29sLmluc3RhbmNlLmdldFN3b3JkMSgpO1xuICAgICAgICAgICAgc3dvcmQuc2V0UGFyZW50KHRoaXMubm9kZSk7XG4gICAgICAgICAgICBzd29yZC5zZXRQb3NpdGlvbih0aGlzLmdldFJhbmRvbVhfc3dvcmQxKCkvMTAsY2FpamlUb29scy5yYW5kb21faW50KC01MDAsMTEwMCkvMTApO1xuICAgICAgICAgICAgc3dvcmQuYWN0aXZlPXRydWU7XG4gICAgICAgICAgICBzd29yZC5nZXRDb21wb25lbnQoc3dvcmRJdGVtKS5pc1JpZ2h0PXRoaXMuaXNSaWdodDtcbiAgICAgICAgICAgIHN3b3JkLmdldENvbXBvbmVudChzd29yZEl0ZW0pLnR3ZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlU3dvcmQyKCl7XG4gICAgICAgIGZvcihsZXQgaT0wO2k8MztpKyspe1xuICAgICAgICAgICAgbGV0IHN3b3JkMj1za2lsbFBvb2wuaW5zdGFuY2UuZ2V0U3dvcmQyKCk7XG4gICAgICAgICAgICBzd29yZDIuc2V0UGFyZW50KHRoaXMubm9kZSk7XG4gICAgICAgICAgICBzd29yZDIuc2V0U2libGluZ0luZGV4KGNjLm1hY3JvLk1JTl9aSU5ERVgpO1xuICAgICAgICAgICAgc3dvcmQyLnNldFBvc2l0aW9uKHRoaXMuZ2V0UmFuZG9tWF9zd29yZDIoKS8xMCxjYWlqaVRvb2xzLnJhbmRvbV9pbnQoLTcwMCwxMzAwKS8xMCk7XG4gICAgICAgICAgICBzd29yZDIuYWN0aXZlPXRydWU7XG4gICAgICAgICAgICBzd29yZDIuZ2V0Q29tcG9uZW50KHN3b3JkSXRlbTIpLmlzUmlnaHQ9dGhpcy5pc1JpZ2h0O1xuICAgICAgICAgICAgc3dvcmQyLmdldENvbXBvbmVudChzd29yZEl0ZW0yKS50d2VlbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFJhbmRvbVhfc3dvcmQxKCl7XG4gICAgICAgIGlmKHRoaXMuaXNSaWdodCl7XG4gICAgICAgICAgICByZXR1cm4gY2FpamlUb29scy5yYW5kb21faW50KC10aGlzLm9mZnNldFJldmVyc2VfeDEsdGhpcy5vZmZzZXRGb3J3YXJkX3gxKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gY2FpamlUb29scy5yYW5kb21faW50KC10aGlzLm9mZnNldEZvcndhcmRfeDEsdGhpcy5vZmZzZXRSZXZlcnNlX3gxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRSYW5kb21YX3N3b3JkMigpe1xuICAgICAgICBpZih0aGlzLmlzUmlnaHQpe1xuICAgICAgICAgICAgcmV0dXJuIGNhaWppVG9vbHMucmFuZG9tX2ludCgtdGhpcy5vZmZzZXRSZXZlcnNlX3gyLHRoaXMub2Zmc2V0Rm9yd2FyZF94Mik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIGNhaWppVG9vbHMucmFuZG9tX2ludCgtdGhpcy5vZmZzZXRGb3J3YXJkX3gyLHRoaXMub2Zmc2V0UmV2ZXJzZV94Mik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlU21va2UoKXtcbiAgICAgICAgbGV0IHNtb2tlPXNraWxsUG9vbC5pbnN0YW5jZS5nZXRTd29yZFNtb2tlKCk7XG4gICAgICAgIGxldCBub2RlUG9zPWNjLnYyKDAsMCk7XG4gICAgICAgIG5vZGVQb3MueD1jYWlqaVRvb2xzLnJhbmRvbV9pbnQodGhpcy5zbW9rZVhfbWluLHRoaXMuc21va2VYX21heCk7XG4gICAgICAgIG5vZGVQb3MueT1jYWlqaVRvb2xzLnJhbmRvbV9pbnQoLTM3MCwtNDIwKTtcbiAgICAgICAgc21va2Uuc2V0UGFyZW50KHRoaXMubm9kZSk7XG4gICAgICAgIHNtb2tlLnNldFBvc2l0aW9uKG5vZGVQb3MpO1xuICAgICAgICBzbW9rZS5nZXRDb21wb25lbnQoc3dvcmRTbW9rZSkudHdlZW4oKTtcbiAgICAgICAgc21va2UuYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMuY3JlYXRlUm9jayhub2RlUG9zKTtcbiAgICB9XG4gICAgY3JlYXRlUm9jayhwb3M6Y2MuVmVjMil7XG4gICAgICAgIGxldCByb2NrTm9kZT1za2lsbFBvb2wuaW5zdGFuY2UuZ2V0Um9jaygpO1xuICAgICAgICByb2NrTm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcbiAgICAgICAgcm9ja05vZGUuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgcm9ja05vZGUuZ2V0Q29tcG9uZW50KHJvY2spLnR3ZWVuKCk7XG4gICAgICAgIHJvY2tOb2RlLmFjdGl2ZT10cnVlO1xuICAgIH1cbn1cbiJdfQ==