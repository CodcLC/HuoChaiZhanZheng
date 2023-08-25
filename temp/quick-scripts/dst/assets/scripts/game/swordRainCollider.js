
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/swordRainCollider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03977qAxU9L96D1Gfk1qnPV', 'swordRainCollider');
// scripts/game/swordRainCollider.ts

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
var data_1 = require("../sdk/data");
var animationState_1 = require("./animationState");
var playerHp_1 = require("./ui/playerHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var swordRainCollider = /** @class */ (function (_super) {
    __extends(swordRainCollider, _super);
    function swordRainCollider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 0;
        _this.interval = 0;
        _this.enemyTemp = [];
        return _this;
    }
    swordRainCollider.prototype.onEnable = function () {
        this.damage = playerHp_1.default.instance.damageSowrdRain;
        this.interval = Number(data_1.data.gameJson("swordRainInterval"));
    };
    swordRainCollider.prototype.start = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.schedule(_this.hit, _this.interval);
        }, 0.2);
    };
    swordRainCollider.prototype.hit = function () {
        for (var _i = 0, _a = this.enemyTemp; _i < _a.length; _i++) {
            var enemy = _a[_i];
            //@ts-ignore
            enemy.getComponent(animationState_1.enemyScript[enemy.name]).beHit(this.damage, animationState_1.attackType.swordRain);
            //@ts-ignore
            //enemy.getComponent(enemyScript[enemy.name]).playBeHitSound(audioName.slash2);
        }
    };
    swordRainCollider.prototype.onCollisionEnter = function (other, self) {
        if (this.enemyTemp.includes(other.node))
            return;
        this.enemyTemp.push(other.node);
    };
    swordRainCollider.prototype.onCollisionExit = function (other, self) {
        var index = this.enemyTemp.indexOf(other.node);
        this.enemyTemp.splice(index, 1);
    };
    swordRainCollider = __decorate([
        ccclass
    ], swordRainCollider);
    return swordRainCollider;
}(cc.Component));
exports.default = swordRainCollider;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc3dvcmRSYWluQ29sbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHbEYsb0NBQW1DO0FBQ25DLG1EQUEyRDtBQUMzRCwwQ0FBcUM7QUFFL0IsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBK0MscUNBQVk7SUFBM0Q7UUFBQSxxRUFnQ0M7UUE5QkcsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixjQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGVBQVMsR0FBYyxFQUFFLENBQUM7O0lBNEI5QixDQUFDO0lBMUJHLG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLGtCQUFRLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0QsaUNBQUssR0FBTDtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEdBQUcsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELCtCQUFHLEdBQUg7UUFDSSxLQUFrQixVQUFjLEVBQWQsS0FBQSxJQUFJLENBQUMsU0FBUyxFQUFkLGNBQWMsRUFBZCxJQUFjLEVBQUU7WUFBN0IsSUFBSSxLQUFLLFNBQUE7WUFDVixZQUFZO1lBQ1osS0FBSyxDQUFDLFlBQVksQ0FBQyw0QkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLDJCQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckYsWUFBWTtZQUNaLCtFQUErRTtTQUNsRjtJQUNMLENBQUM7SUFDRCw0Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBa0IsRUFBRSxJQUFpQjtRQUNsRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsMkNBQWUsR0FBZixVQUFnQixLQUFrQixFQUFFLElBQWlCO1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQS9CZ0IsaUJBQWlCO1FBRHJDLE9BQU87T0FDYSxpQkFBaUIsQ0FnQ3JDO0lBQUQsd0JBQUM7Q0FoQ0QsQUFnQ0MsQ0FoQzhDLEVBQUUsQ0FBQyxTQUFTLEdBZ0MxRDtrQkFoQ29CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgeyBkYXRhIH0gZnJvbSBcIi4uL3Nkay9kYXRhXCI7XG5pbXBvcnQgeyBhdHRhY2tUeXBlLCBlbmVteVNjcmlwdCB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5pbXBvcnQgcGxheWVySHAgZnJvbSBcIi4vdWkvcGxheWVySHBcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN3b3JkUmFpbkNvbGxpZGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIGRhbWFnZTogbnVtYmVyID0gMDtcbiAgICBpbnRlcnZhbDogbnVtYmVyID0gMDtcbiAgICBlbmVteVRlbXA6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gcGxheWVySHAuaW5zdGFuY2UuZGFtYWdlU293cmRSYWluO1xuICAgICAgICB0aGlzLmludGVydmFsID0gTnVtYmVyKGRhdGEuZ2FtZUpzb24oXCJzd29yZFJhaW5JbnRlcnZhbFwiKSk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuaGl0LCB0aGlzLmludGVydmFsKTtcbiAgICAgICAgfSwgMC4yKTtcbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIGZvciAobGV0IGVuZW15IG9mIHRoaXMuZW5lbXlUZW1wKSB7XG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgIGVuZW15LmdldENvbXBvbmVudChlbmVteVNjcmlwdFtlbmVteS5uYW1lXSkuYmVIaXQodGhpcy5kYW1hZ2UsIGF0dGFja1R5cGUuc3dvcmRSYWluKTtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgLy9lbmVteS5nZXRDb21wb25lbnQoZW5lbXlTY3JpcHRbZW5lbXkubmFtZV0pLnBsYXlCZUhpdFNvdW5kKGF1ZGlvTmFtZS5zbGFzaDIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXI6IGNjLkNvbGxpZGVyLCBzZWxmOiBjYy5Db2xsaWRlcikge1xuICAgICAgICBpZiAodGhpcy5lbmVteVRlbXAuaW5jbHVkZXMob3RoZXIubm9kZSkpIHJldHVybjtcbiAgICAgICAgdGhpcy5lbmVteVRlbXAucHVzaChvdGhlci5ub2RlKTtcbiAgICB9XG4gICAgb25Db2xsaXNpb25FeGl0KG90aGVyOiBjYy5Db2xsaWRlciwgc2VsZjogY2MuQ29sbGlkZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5lbmVteVRlbXAuaW5kZXhPZihvdGhlci5ub2RlKTtcbiAgICAgICAgdGhpcy5lbmVteVRlbXAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG4iXX0=