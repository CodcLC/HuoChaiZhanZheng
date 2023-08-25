
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/swordSmoke.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ef6c5quedBNi5aAkI6Szgxv', 'swordSmoke');
// scripts/game/swordSmoke.ts

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
var swordSmoke = /** @class */ (function (_super) {
    __extends(swordSmoke, _super);
    function swordSmoke() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    swordSmoke.prototype.tween = function () {
        var _this = this;
        var scaleOffset = Math.random() * 0.4;
        this.node.scale = caijiTools_1.caijiTools.random_int(60, 100) / 100;
        cc.tween(this.node)
            .by(0.03, { scale: scaleOffset })
            .by(0.05, { opacity: -255 })
            .call(function () {
            skillPool_1.default.instance.recoverySwordSmoke(_this.node);
        })
            .start();
    };
    swordSmoke.prototype.reuse = function () {
    };
    swordSmoke.prototype.unuse = function () {
        this.node.opacity = 255;
        this.node.active = false;
    };
    swordSmoke = __decorate([
        ccclass
    ], swordSmoke);
    return swordSmoke;
}(cc.Component));
exports.default = swordSmoke;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc3dvcmRTbW9rZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw0Q0FBMkM7QUFDM0MseUNBQW9DO0FBRTlCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEOztJQW9CQSxDQUFDO0lBakJHLDBCQUFLLEdBQUw7UUFBQSxpQkFVQztRQVRHLElBQUksV0FBVyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxHQUFHLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUNsRCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEIsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsQ0FBQzthQUM1QixFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsR0FBRyxFQUFDLENBQUM7YUFDdkIsSUFBSSxDQUFDO1lBQ0YsbUJBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQzthQUNELEtBQUssRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUNELDBCQUFLLEdBQUw7SUFDQSxDQUFDO0lBQ0QsMEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQW5CZ0IsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQW9COUI7SUFBRCxpQkFBQztDQXBCRCxBQW9CQyxDQXBCdUMsRUFBRSxDQUFDLFNBQVMsR0FvQm5EO2tCQXBCb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCBza2lsbFBvb2wgZnJvbSBcIi4vc2tpbGxQb29sXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3dvcmRTbW9rZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuICAgIHR3ZWVuKCl7XG4gICAgICAgIGxldCBzY2FsZU9mZnNldD1NYXRoLnJhbmRvbSgpKjAuNDtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlPWNhaWppVG9vbHMucmFuZG9tX2ludCg2MCwxMDApLzEwMDtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxuICAgICAgICAuYnkoMC4wMyx7c2NhbGU6c2NhbGVPZmZzZXR9KVxuICAgICAgICAuYnkoMC4wNSx7b3BhY2l0eTotMjU1fSlcbiAgICAgICAgLmNhbGwoKCk9PntcbiAgICAgICAgICAgIHNraWxsUG9vbC5pbnN0YW5jZS5yZWNvdmVyeVN3b3JkU21va2UodGhpcy5ub2RlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuICAgIHJldXNlKCl7XG4gICAgfVxuICAgIHVudXNlKCl7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTI1NTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZT1mYWxzZTtcbiAgICB9XG59XG4iXX0=