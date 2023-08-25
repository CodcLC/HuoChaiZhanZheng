
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/rock.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c999aTfBeZFsaHFnMLh4J53', 'rock');
// scripts/game/rock.ts

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
var skillPool_1 = require("./skillPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var rock = /** @class */ (function (_super) {
    __extends(rock, _super);
    function rock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    rock.prototype.tween = function () {
        var _this = this;
        var _loop_1 = function (child) {
            child.scale = 0.3 + caijiTools_1.caijiTools.random_int(-10, 10) / 100;
            var x = caijiTools_1.caijiTools.random_int(-500, 500) / 10;
            var y = caijiTools_1.caijiTools.random_int(-500, 500) / 10;
            child.setPosition(x, y);
            var direction = cc.v2(x, y).normalizeSelf();
            var force = 1200;
            this_1.scheduleOnce(function () {
                child.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(direction.x * force, direction.y * force), true);
            }, 0);
            this_1.scheduleOnce(function () {
                cc.tween(child)
                    .to(0.3, { scale: 0 })
                    .start();
            }, 0.5);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            _loop_1(child);
        }
        this.scheduleOnce(function () {
            skillPool_1.default.instance.recoveryRock(_this.node);
        }, 2);
    };
    rock.prototype.reuse = function () {
    };
    rock.prototype.unuse = function () {
    };
    rock = __decorate([
        ccclass
    ], rock);
    return rock;
}(cc.Component));
exports.default = rock;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxccm9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw0Q0FBMkM7QUFDM0MseUNBQW9DO0FBRTlCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBQTlDOztJQTZCQSxDQUFDO0lBekJHLG9CQUFLLEdBQUw7UUFBQSxpQkFvQkM7Z0NBbkJXLEtBQUs7WUFDVCxLQUFLLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBQyxHQUFHLENBQUM7WUFDbEQsSUFBSSxDQUFDLEdBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUMsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxHQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQTtZQUN4QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLFNBQVMsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN6QyxJQUFJLEtBQUssR0FBQyxJQUFJLENBQUM7WUFDZixPQUFLLFlBQVksQ0FBQztnQkFDZCxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDekcsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsT0FBSyxZQUFZLENBQUM7Z0JBQ2QsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7cUJBQ2QsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQztxQkFDakIsS0FBSyxFQUFFLENBQUM7WUFDYixDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7OztRQWRYLEtBQWlCLFVBQWtCLEVBQWxCLEtBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCO1lBQS9CLElBQUksS0FBSyxTQUFBO29CQUFMLEtBQUs7U0FlWjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFDRCxvQkFBSyxHQUFMO0lBQ0EsQ0FBQztJQUNELG9CQUFLLEdBQUw7SUFDQSxDQUFDO0lBNUJnQixJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBNkJ4QjtJQUFELFdBQUM7Q0E3QkQsQUE2QkMsQ0E3QmlDLEVBQUUsQ0FBQyxTQUFTLEdBNkI3QztrQkE3Qm9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgc2tpbGxQb29sIGZyb20gXCIuL3NraWxsUG9vbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJvY2sgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG5cblxuICAgIHR3ZWVuKCl7XG4gICAgICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5ub2RlLmNoaWxkcmVuKXtcbiAgICAgICAgICAgIGNoaWxkLnNjYWxlPTAuMytjYWlqaVRvb2xzLnJhbmRvbV9pbnQoLTEwLDEwKS8xMDA7XG4gICAgICAgICAgICBsZXQgeD1jYWlqaVRvb2xzLnJhbmRvbV9pbnQoLTUwMCw1MDApLzEwO1xuICAgICAgICAgICAgbGV0IHk9Y2FpamlUb29scy5yYW5kb21faW50KC01MDAsNTAwKS8xMFxuICAgICAgICAgICAgY2hpbGQuc2V0UG9zaXRpb24oeCx5KTtcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb249Y2MudjIoeCx5KS5ub3JtYWxpemVTZWxmKCk7XG4gICAgICAgICAgICBsZXQgZm9yY2U9MTIwMDtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgY2hpbGQuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSkuYXBwbHlGb3JjZVRvQ2VudGVyKGNjLnYyKGRpcmVjdGlvbi54KmZvcmNlLGRpcmVjdGlvbi55KmZvcmNlKSx0cnVlKTtcbiAgICAgICAgICAgIH0sMCk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGNoaWxkKVxuICAgICAgICAgICAgICAgIC50bygwLjMse3NjYWxlOjB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICAgICAgfSwwLjUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBza2lsbFBvb2wuaW5zdGFuY2UucmVjb3ZlcnlSb2NrKHRoaXMubm9kZSk7XG4gICAgICAgIH0sMik7XG4gICAgfVxuICAgIHJldXNlKCl7XG4gICAgfVxuICAgIHVudXNlKCl7XG4gICAgfVxufVxuIl19