
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/FX_flagThunder.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b2c3fAOhHxB9Y94CRUWHYBp', 'FX_flagThunder');
// scripts/game/FX_flagThunder.ts

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
var enemyHitCollider_1 = require("./enemyHitCollider");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FX_flagThunder = /** @class */ (function (_super) {
    __extends(FX_flagThunder, _super);
    function FX_flagThunder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 0;
        return _this;
    }
    // onLoad () {}
    FX_flagThunder.prototype.start = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.node.getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
        }, 0);
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 2);
    };
    FX_flagThunder = __decorate([
        ccclass
    ], FX_flagThunder);
    return FX_flagThunder;
}(cc.Component));
exports.default = FX_flagThunder;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRlhfZmxhZ1RodW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsdURBQWtEO0FBRTVDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBY0M7UUFYRyxZQUFNLEdBQVEsQ0FBQyxDQUFDOztJQVdwQixDQUFDO0lBVkcsZUFBZTtJQUVmLDhCQUFLLEdBQUw7UUFBQSxpQkFPQztRQU5HLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsSUFBSSxFQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBYmdCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FjbEM7SUFBRCxxQkFBQztDQWRELEFBY0MsQ0FkMkMsRUFBRSxDQUFDLFNBQVMsR0FjdkQ7a0JBZG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IGVuZW15SGl0Q29sbGlkZXIgZnJvbSBcIi4vZW5lbXlIaXRDb2xsaWRlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZYX2ZsYWdUaHVuZGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuXG4gICAgZGFtYWdlOm51bWJlcj0wO1xuICAgIC8vIG9uTG9hZCAoKSB7fVxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLHRoaXMuZGFtYWdlKTtcbiAgICAgICAgfSwwKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH0sMik7XG4gICAgfVxufVxuIl19