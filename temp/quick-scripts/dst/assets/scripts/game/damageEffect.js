
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/damageEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '996a64NhE9I8K6SbtCym/DI', 'damageEffect');
// scripts/game/damageEffect.ts

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
var damageTipPool_1 = require("./damageTipPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageEffect = /** @class */ (function (_super) {
    __extends(damageEffect, _super);
    function damageEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    damageEffect.prototype.onLoad = function () {
        var _this = this;
        this.node.getComponent(cc.Animation).on("finished", function () {
            damageTipPool_1.default.instance.recoveryDmgEffect(_this.node);
        });
    };
    damageEffect.prototype.onEnable = function () {
        this.node.getComponent(cc.Animation).play();
    };
    damageEffect.prototype.reuse = function () {
        this.node.angle = caijiTools_1.caijiTools.random_int(0, 360);
    };
    damageEffect.prototype.unuse = function () {
        this.node.active = false;
    };
    damageEffect = __decorate([
        ccclass
    ], damageEffect);
    return damageEffect;
}(cc.Component));
exports.default = damageEffect;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZGFtYWdlRWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDRDQUEyQztBQUMzQyxpREFBNEM7QUFFdEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7O0lBa0JBLENBQUM7SUFmRyw2QkFBTSxHQUFOO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBQztZQUMvQyx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsK0JBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsNEJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBakJnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBa0JoQztJQUFELG1CQUFDO0NBbEJELEFBa0JDLENBbEJ5QyxFQUFFLENBQUMsU0FBUyxHQWtCckQ7a0JBbEJvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IGRhbWFnZVRpcFBvb2wgZnJvbSBcIi4vZGFtYWdlVGlwUG9vbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRhbWFnZUVmZmVjdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikub24oXCJmaW5pc2hlZFwiLCgpPT57XG4gICAgICAgICAgICBkYW1hZ2VUaXBQb29sLmluc3RhbmNlLnJlY292ZXJ5RG1nRWZmZWN0KHRoaXMubm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XG4gICAgfVxuXG4gICAgcmV1c2UoKXtcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlPWNhaWppVG9vbHMucmFuZG9tX2ludCgwLDM2MCk7XG4gICAgfVxuICAgIHVudXNlKCl7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmU9ZmFsc2U7XG4gICAgfVxufVxuIl19