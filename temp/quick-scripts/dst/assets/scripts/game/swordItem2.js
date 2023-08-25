
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/swordItem2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1a6fdJ+JNVKzJV7W1ODlljC', 'swordItem2');
// scripts/game/swordItem2.ts

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
var swordItem2 = /** @class */ (function (_super) {
    __extends(swordItem2, _super);
    function swordItem2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRight = false;
        _this.rightAngle = 48;
        _this.leftAngle = -48;
        _this.offsetX = 74;
        _this.offsetY = -67;
        _this.isDestory = false;
        _this.movex1 = 0;
        _this.movey1 = 0;
        _this.movex2 = 0;
        _this.movey2 = 0;
        return _this;
    }
    swordItem2.prototype.onLoad = function () {
        this.movex1 = this.offsetX * 12;
        this.movey1 = this.offsetY * 12;
        this.movex2 = this.offsetX * 0.1;
        this.movey2 = this.offsetY * 0.1;
    };
    swordItem2.prototype.init = function () {
        this.movex1 = this.isRight ? Math.abs(this.movex1) : -Math.abs(this.movex1);
        this.movex2 = this.isRight ? Math.abs(this.movex2) : -Math.abs(this.movex2);
    };
    swordItem2.prototype.tween = function () {
        var _this = this;
        //cc.v2(67,74);
        this.init();
        this.node.scaleX = caijiTools_1.caijiTools.random_int(3, 6) / 10;
        this.node.scaleY = this.node.scaleX * 20;
        this.node.angle = this.isRight ? this.rightAngle : this.leftAngle;
        cc.tween(this.node)
            .by(0.1, { position: cc.v3(this.movex1, this.movey1) })
            .start();
        this.scheduleOnce(function () {
            _this.changeColor();
        }, 0.05);
    };
    /*     onBeginContact (contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider) {
            let other=otherCollider.node;
            let pos=contact.getWorldManifold();
            if (other.group == "ground") {
                //落地
                if(this.isDestory) return;
                this.isDestory=true;
                this.changeColor();
            }
        } */
    swordItem2.prototype.changeColor = function () {
        var _this = this;
        this.node.color = cc.Color.BLACK;
        cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node)
            .parallel(cc.tween().by(0.08, { opacity: -255 }), cc.tween().by(0.1, { position: cc.v3(this.movex2, this.movey2) }))
            .call(function () {
            skillPool_1.default.instance.recoverySword2(_this.node);
        })
            .start();
    };
    swordItem2.prototype.reuse = function () {
        this.isDestory = false;
    };
    swordItem2.prototype.unuse = function () {
        this.node.color = cc.Color.WHITE;
        this.node.opacity = 255;
    };
    swordItem2 = __decorate([
        ccclass
    ], swordItem2);
    return swordItem2;
}(cc.Component));
exports.default = swordItem2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc3dvcmRJdGVtMi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw0Q0FBMkM7QUFDM0MseUNBQW9DO0FBRTlCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBa0VDO1FBaEVHLGFBQU8sR0FBUyxLQUFLLENBQUM7UUFDdEIsZ0JBQVUsR0FBUSxFQUFFLENBQUM7UUFDckIsZUFBUyxHQUFRLENBQUMsRUFBRSxDQUFDO1FBQ3JCLGFBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsYUFBTyxHQUFRLENBQUMsRUFBRSxDQUFDO1FBQ25CLGVBQVMsR0FBUyxLQUFLLENBQUM7UUFDeEIsWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixZQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsWUFBTSxHQUFRLENBQUMsQ0FBQzs7SUF1RHBCLENBQUM7SUF0REcsMkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLENBQUM7SUFDakMsQ0FBQztJQUNELHlCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsTUFB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R0FrRW5EO2tCQWxFb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCBza2lsbFBvb2wgZnJvbSBcIi4vc2tpbGxQb29sXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3dvcmRJdGVtMiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBpc1JpZ2h0OmJvb2xlYW49ZmFsc2U7XG4gICAgcmlnaHRBbmdsZTpudW1iZXI9NDg7XG4gICAgbGVmdEFuZ2xlOm51bWJlcj0tNDg7XG4gICAgb2Zmc2V0WDpudW1iZXI9NzQ7XG4gICAgb2Zmc2V0WTpudW1iZXI9LTY3O1xuICAgIGlzRGVzdG9yeTpib29sZWFuPWZhbHNlO1xuICAgIG1vdmV4MTpudW1iZXI9MDtcbiAgICBtb3ZleTE6bnVtYmVyPTA7XG4gICAgbW92ZXgyOm51bWJlcj0wO1xuICAgIG1vdmV5MjpudW1iZXI9MDtcbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLm1vdmV4MT10aGlzLm9mZnNldFgqMTI7XG4gICAgICAgIHRoaXMubW92ZXkxPXRoaXMub2Zmc2V0WSoxMjtcbiAgICAgICAgdGhpcy5tb3ZleDI9dGhpcy5vZmZzZXRYKjAuMTtcbiAgICAgICAgdGhpcy5tb3ZleTI9dGhpcy5vZmZzZXRZKjAuMTtcbiAgICB9XG4gICAgaW5pdCgpe1xuICAgICAgICB0aGlzLm1vdmV4MT10aGlzLmlzUmlnaHQ/TWF0aC5hYnModGhpcy5tb3ZleDEpOi1NYXRoLmFicyh0aGlzLm1vdmV4MSk7XG4gICAgICAgIHRoaXMubW92ZXgyPXRoaXMuaXNSaWdodD9NYXRoLmFicyh0aGlzLm1vdmV4Mik6LU1hdGguYWJzKHRoaXMubW92ZXgyKTtcbiAgICB9XG4gICAgdHdlZW4oKSB7XG4gICAgICAgIC8vY2MudjIoNjcsNzQpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWD1jYWlqaVRvb2xzLnJhbmRvbV9pbnQoMyw2KS8xMDtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWT10aGlzLm5vZGUuc2NhbGVYKjIwO1xuICAgICAgICB0aGlzLm5vZGUuYW5nbGU9dGhpcy5pc1JpZ2h0P3RoaXMucmlnaHRBbmdsZTp0aGlzLmxlZnRBbmdsZTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxuICAgICAgICAuYnkoMC4xLHtwb3NpdGlvbjpjYy52Myh0aGlzLm1vdmV4MSx0aGlzLm1vdmV5MSl9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQ29sb3IoKTtcbiAgICAgICAgfSwwLjA1KTtcbiAgICB9XG5cbi8qICAgICBvbkJlZ2luQ29udGFjdCAoY29udGFjdDpjYy5QaHlzaWNzQ29udGFjdCxzZWxmQ29sbGlkZXI6Y2MuUGh5c2ljc0NvbGxpZGVyLG90aGVyQ29sbGlkZXI6Y2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlcj1vdGhlckNvbGxpZGVyLm5vZGU7XG4gICAgICAgIGxldCBwb3M9Y29udGFjdC5nZXRXb3JsZE1hbmlmb2xkKCk7XG4gICAgICAgIGlmIChvdGhlci5ncm91cCA9PSBcImdyb3VuZFwiKSB7XG4gICAgICAgICAgICAvL+iQveWcsFxuICAgICAgICAgICAgaWYodGhpcy5pc0Rlc3RvcnkpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuaXNEZXN0b3J5PXRydWU7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUNvbG9yKCk7XG4gICAgICAgIH1cbiAgICB9ICovXG4gICAgY2hhbmdlQ29sb3IoKXtcbiAgICAgICAgdGhpcy5ub2RlLmNvbG9yPWNjLkNvbG9yLkJMQUNLO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5ub2RlKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxuICAgICAgICAucGFyYWxsZWwoXG4gICAgICAgICAgICBjYy50d2VlbigpLmJ5KDAuMDgse29wYWNpdHk6LTI1NX0pLFxuICAgICAgICAgICAgY2MudHdlZW4oKS5ieSgwLjEse3Bvc2l0aW9uOmNjLnYzKHRoaXMubW92ZXgyLHRoaXMubW92ZXkyKX0pXG4gICAgICAgIClcbiAgICAgICAgLmNhbGwoKCk9PntcbiAgICAgICAgICAgIHNraWxsUG9vbC5pbnN0YW5jZS5yZWNvdmVyeVN3b3JkMih0aGlzLm5vZGUpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG4gICAgcmV1c2UoKXtcbiAgICAgICAgdGhpcy5pc0Rlc3Rvcnk9ZmFsc2U7XG4gICAgfVxuICAgIHVudXNlKCl7XG4gICAgICAgIHRoaXMubm9kZS5jb2xvcj1jYy5Db2xvci5XSElURTtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xuICAgIH1cbn1cbiJdfQ==