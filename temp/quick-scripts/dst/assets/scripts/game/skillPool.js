
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/skillPool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10733spul5GZYFDkfpWJtA/', 'skillPool');
// scripts/game/skillPool.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var skillPool = /** @class */ (function (_super) {
    __extends(skillPool, _super);
    function skillPool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.swordItem = null;
        _this.swordItem2 = null;
        _this.swordSmoke = null;
        _this.rockPrefab = null;
        _this.thunderBallPrefab = null;
        _this.swordPool = new cc.NodePool("swordItem");
        _this.sword2Pool = new cc.NodePool("swordItem2");
        _this.swordSmokePool = new cc.NodePool("swordSmoke");
        _this.rockPool = new cc.NodePool("rock");
        _this.thunderBallPool = new cc.NodePool("thunderBall_burst");
        return _this;
    }
    skillPool_1 = skillPool;
    skillPool.prototype.onLoad = function () {
        skillPool_1.instance = this;
    };
    skillPool.prototype.onDisable = function () {
        this.rockPool.clear();
        this.swordPool.clear();
        this.sword2Pool.clear();
        this.swordSmokePool.clear();
        this.thunderBallPool.clear();
    };
    skillPool.prototype.start = function () {
        this.init();
    };
    skillPool.prototype.init = function () {
        this.createThunderBall();
        this.createSword();
        this.createSword2();
        this.createSwordSmoke();
        this.createRock();
    };
    skillPool.prototype.createThunderBall = function () {
        for (var i = 0; i < 20; i++) {
            var thunderBall = cc.instantiate(this.thunderBallPrefab);
            thunderBall.name = thunderBall.name + i;
            this.thunderBallPool.put(thunderBall);
        }
    };
    skillPool.prototype.createSword = function () {
        for (var i = 0; i < 10; i++) {
            var sword = cc.instantiate(this.swordItem);
            sword.active = false;
            this.swordPool.put(sword);
        }
    };
    skillPool.prototype.createSword2 = function () {
        for (var i = 0; i < 12; i++) {
            var sword = cc.instantiate(this.swordItem2);
            this.sword2Pool.put(sword);
        }
    };
    skillPool.prototype.createSwordSmoke = function () {
        for (var i = 0; i < 15; i++) {
            var smoke = cc.instantiate(this.swordSmoke);
            this.swordSmokePool.put(smoke);
        }
    };
    skillPool.prototype.createRock = function () {
        for (var i = 0; i < 50; i++) {
            var rock = cc.instantiate(this.rockPrefab);
            this.rockPool.put(rock);
        }
    };
    skillPool.prototype.getThunderBall = function () {
        var thunderBall = this.thunderBallPool.get();
        if (!thunderBall) {
            thunderBall = cc.instantiate(this.thunderBallPrefab);
            thunderBall.name = thunderBall.name + this.thunderBallPool.size();
        }
        return thunderBall;
    };
    skillPool.prototype.recoveryThunderball = function (node) {
        this.thunderBallPool.put(node);
    };
    skillPool.prototype.getRock = function () {
        var rock = this.rockPool.get();
        if (!rock) {
            rock = cc.instantiate(this.rockPrefab);
        }
        return rock;
    };
    skillPool.prototype.recoveryRock = function (node) {
        this.rockPool.put(node);
    };
    skillPool.prototype.getSwordSmoke = function () {
        var smoke = this.swordSmokePool.get();
        if (!smoke) {
            smoke = cc.instantiate(this.swordSmoke);
        }
        return smoke;
    };
    skillPool.prototype.recoverySwordSmoke = function (node) {
        this.swordSmokePool.put(node);
    };
    skillPool.prototype.getSword1 = function () {
        var sword1 = this.swordPool.get();
        if (!sword1) {
            sword1 = cc.instantiate(this.swordItem);
        }
        return sword1;
    };
    skillPool.prototype.recoverySword1 = function (node) {
        this.swordPool.put(node);
    };
    skillPool.prototype.getSword2 = function () {
        var sword2 = this.sword2Pool.get();
        if (!sword2) {
            sword2 = cc.instantiate(this.swordItem2);
        }
        return sword2;
    };
    skillPool.prototype.recoverySword2 = function (node) {
        this.sword2Pool.put(node);
    };
    var skillPool_1;
    skillPool.instance = null;
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "swordItem", void 0);
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "swordItem2", void 0);
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "swordSmoke", void 0);
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "rockPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], skillPool.prototype, "thunderBallPrefab", void 0);
    skillPool = skillPool_1 = __decorate([
        ccclass
    ], skillPool);
    return skillPool;
}(cc.Component));
exports.default = skillPool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc2tpbGxQb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBMkhDO1FBeEhHLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFFNUIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFFN0IsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFFN0IsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFFN0IsdUJBQWlCLEdBQWMsSUFBSSxDQUFDO1FBRXBDLGVBQVMsR0FBZ0IsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RELGdCQUFVLEdBQWdCLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCxvQkFBYyxHQUFnQixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUQsY0FBUSxHQUFnQixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQscUJBQWUsR0FBZ0IsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0lBMEd4RSxDQUFDO2tCQTNIb0IsU0FBUztJQW9CMUIsMEJBQU0sR0FBTjtRQUNJLFdBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFDRCw2QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFD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QUM7SUFDbEIsQ0FBQztJQUNELGtDQUFjLEdBQWQsVUFBZSxJQUFhO1FBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCw2QkFBUyxHQUFUO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNELGtDQUFjLEdBQWQsVUFBZSxJQUFhO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7O0lBdkdNLGtCQUFRLEdBQWMsSUFBSSxDQUFDO0lBaEJsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNRO0lBRTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ1M7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDUztJQUU3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNTO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ2dCO0lBWG5CLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0EySDdCO0lBQUQsZ0JBQUM7Q0EzSEQsQUEySEMsQ0EzSHNDLEVBQUUsQ0FBQyxTQUFTLEdBMkhsRDtrQkEzSG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNraWxsUG9vbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHN3b3JkSXRlbTogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHN3b3JkSXRlbTI6IGNjLlByZWZhYiA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBzd29yZFNtb2tlOiBjYy5QcmVmYWIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgcm9ja1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRodW5kZXJCYWxsUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgc3dvcmRQb29sOiBjYy5Ob2RlUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbChcInN3b3JkSXRlbVwiKTtcbiAgICBzd29yZDJQb29sOiBjYy5Ob2RlUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbChcInN3b3JkSXRlbTJcIik7XG4gICAgc3dvcmRTbW9rZVBvb2w6IGNjLk5vZGVQb29sID0gbmV3IGNjLk5vZGVQb29sKFwic3dvcmRTbW9rZVwiKTtcbiAgICByb2NrUG9vbDogY2MuTm9kZVBvb2wgPSBuZXcgY2MuTm9kZVBvb2woXCJyb2NrXCIpO1xuICAgIHRodW5kZXJCYWxsUG9vbDogY2MuTm9kZVBvb2wgPSBuZXcgY2MuTm9kZVBvb2woXCJ0aHVuZGVyQmFsbF9idXJzdFwiKTtcblxuICAgIHN0YXRpYyBpbnN0YW5jZTogc2tpbGxQb29sID0gbnVsbDtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHNraWxsUG9vbC5pbnN0YW5jZSA9IHRoaXM7XG4gICAgfVxuICAgIG9uRGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5yb2NrUG9vbC5jbGVhcigpO1xuICAgICAgICB0aGlzLnN3b3JkUG9vbC5jbGVhcigpO1xuICAgICAgICB0aGlzLnN3b3JkMlBvb2wuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zd29yZFNtb2tlUG9vbC5jbGVhcigpO1xuICAgICAgICB0aGlzLnRodW5kZXJCYWxsUG9vbC5jbGVhcigpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlVGh1bmRlckJhbGwoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVTd29yZCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVN3b3JkMigpO1xuICAgICAgICB0aGlzLmNyZWF0ZVN3b3JkU21va2UoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVSb2NrKCk7XG4gICAgfVxuICAgIGNyZWF0ZVRodW5kZXJCYWxsKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCB0aHVuZGVyQmFsbCA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGh1bmRlckJhbGxQcmVmYWIpO1xuICAgICAgICAgICAgdGh1bmRlckJhbGwubmFtZSA9IHRodW5kZXJCYWxsLm5hbWUgKyBpO1xuICAgICAgICAgICAgdGhpcy50aHVuZGVyQmFsbFBvb2wucHV0KHRodW5kZXJCYWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVTd29yZCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3dvcmQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnN3b3JkSXRlbSk7XG4gICAgICAgICAgICBzd29yZC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc3dvcmRQb29sLnB1dChzd29yZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlU3dvcmQyKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzd29yZCA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3dvcmRJdGVtMik7XG4gICAgICAgICAgICB0aGlzLnN3b3JkMlBvb2wucHV0KHN3b3JkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjcmVhdGVTd29yZFNtb2tlKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzbW9rZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3dvcmRTbW9rZSk7XG4gICAgICAgICAgICB0aGlzLnN3b3JkU21va2VQb29sLnB1dChzbW9rZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXRlUm9jaygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcm9jayA9IGNjLmluc3RhbnRpYXRlKHRoaXMucm9ja1ByZWZhYik7XG4gICAgICAgICAgICB0aGlzLnJvY2tQb29sLnB1dChyb2NrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRUaHVuZGVyQmFsbCgpIHtcbiAgICAgICAgbGV0IHRodW5kZXJCYWxsID0gdGhpcy50aHVuZGVyQmFsbFBvb2wuZ2V0KCk7XG4gICAgICAgIGlmICghdGh1bmRlckJhbGwpIHtcbiAgICAgICAgICAgIHRodW5kZXJCYWxsID0gY2MuaW5zdGFudGlhdGUodGhpcy50aHVuZGVyQmFsbFByZWZhYik7XG4gICAgICAgICAgICB0aHVuZGVyQmFsbC5uYW1lID0gdGh1bmRlckJhbGwubmFtZSArIHRoaXMudGh1bmRlckJhbGxQb29sLnNpemUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGh1bmRlckJhbGw7XG4gICAgfVxuICAgIHJlY292ZXJ5VGh1bmRlcmJhbGwobm9kZTogY2MuTm9kZSkge1xuICAgICAgICB0aGlzLnRodW5kZXJCYWxsUG9vbC5wdXQobm9kZSk7XG4gICAgfVxuICAgIGdldFJvY2soKSB7XG4gICAgICAgIGxldCByb2NrID0gdGhpcy5yb2NrUG9vbC5nZXQoKTtcbiAgICAgICAgaWYgKCFyb2NrKSB7XG4gICAgICAgICAgICByb2NrID0gY2MuaW5zdGFudGlhdGUodGhpcy5yb2NrUHJlZmFiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm9jaztcbiAgICB9XG4gICAgcmVjb3ZlcnlSb2NrKG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgdGhpcy5yb2NrUG9vbC5wdXQobm9kZSk7XG4gICAgfVxuICAgIGdldFN3b3JkU21va2UoKSB7XG4gICAgICAgIGxldCBzbW9rZSA9IHRoaXMuc3dvcmRTbW9rZVBvb2wuZ2V0KCk7XG4gICAgICAgIGlmICghc21va2UpIHtcbiAgICAgICAgICAgIHNtb2tlID0gY2MuaW5zdGFudGlhdGUodGhpcy5zd29yZFNtb2tlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc21va2U7XG4gICAgfVxuICAgIHJlY292ZXJ5U3dvcmRTbW9rZShub2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIHRoaXMuc3dvcmRTbW9rZVBvb2wucHV0KG5vZGUpO1xuICAgIH1cbiAgICBnZXRTd29yZDEoKSB7XG4gICAgICAgIGxldCBzd29yZDEgPSB0aGlzLnN3b3JkUG9vbC5nZXQoKTtcbiAgICAgICAgaWYgKCFzd29yZDEpIHtcbiAgICAgICAgICAgIHN3b3JkMSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3dvcmRJdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3dvcmQxO1xuICAgIH1cbiAgICByZWNvdmVyeVN3b3JkMShub2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIHRoaXMuc3dvcmRQb29sLnB1dChub2RlKTtcbiAgICB9XG4gICAgZ2V0U3dvcmQyKCkge1xuICAgICAgICBsZXQgc3dvcmQyID0gdGhpcy5zd29yZDJQb29sLmdldCgpO1xuICAgICAgICBpZiAoIXN3b3JkMikge1xuICAgICAgICAgICAgc3dvcmQyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zd29yZEl0ZW0yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3dvcmQyO1xuICAgIH1cbiAgICByZWNvdmVyeVN3b3JkMihub2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIHRoaXMuc3dvcmQyUG9vbC5wdXQobm9kZSk7XG4gICAgfVxufVxuIl19