
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/enemyDieEffect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5f3ce52MshLyYdrlbm7o2pi', 'enemyDieEffect');
// scripts/game/enemyDieEffect.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemyDieEffect = /** @class */ (function (_super) {
    __extends(enemyDieEffect, _super);
    function enemyDieEffect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.force_x = 10000;
        _this.force_y = 17000;
        _this.animation = null;
        return _this;
        // update (dt) {}
    }
    enemyDieEffect.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    enemyDieEffect.prototype.start = function () {
        var _this = this;
        this.play();
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 2);
    };
    ;
    enemyDieEffect.prototype.play = function () {
        var x = 0;
        var y = 0;
        this.node.children[0].angle = caijiTools_1.caijiTools.random_int(0, 360);
        this.animation.play();
        for (var _i = 0, _a = this.node.children[1].children; _i < _a.length; _i++) {
            var child = _a[_i];
            x = caijiTools_1.caijiTools.random_int(-50, 50) / 100;
            y = caijiTools_1.caijiTools.random_int(30, 100) / 100;
            var normal = cc.v2(x, y).normalizeSelf();
            var rigibody = child.getComponent(cc.RigidBody);
            rigibody.applyAngularImpulse(caijiTools_1.caijiTools.random_int(-500, 500), false);
            rigibody.applyForceToCenter(cc.v2(normal.x * this.force_x, normal.y * this.force_y), true);
        }
    };
    enemyDieEffect = __decorate([
        ccclass
    ], enemyDieEffect);
    return enemyDieEffect;
}(cc.Component));
exports.default = enemyDieEffect;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZW5lbXlEaWVFZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNENBQTJDO0FBRXJDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBK0JDO1FBN0JHLGFBQU8sR0FBUSxLQUFLLENBQUM7UUFDckIsYUFBTyxHQUFRLEtBQUssQ0FBQztRQUNyQixlQUFTLEdBQWMsSUFBSSxDQUFDOztRQTBCNUIsaUJBQWlCO0lBQ3JCLENBQUM7SUF6QkcsK0JBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCw4QkFBSyxHQUFMO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQUEsQ0FBQztJQUNGLDZCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDUixJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsS0FBaUIsVUFBOEIsRUFBOUIsS0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQTlCLGNBQThCLEVBQTlCLElBQThCLEVBQUM7WUFBNUMsSUFBSSxLQUFLLFNBQUE7WUFDVCxDQUFDLEdBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxDQUFDO1lBQ3BDLENBQUMsR0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLEdBQUMsR0FBRyxDQUFDO1lBQ3BDLElBQUksTUFBTSxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3RDLElBQUksUUFBUSxHQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEY7SUFDTCxDQUFDO0lBNUJnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBK0JsQztJQUFELHFCQUFDO0NBL0JELEFBK0JDLENBL0IyQyxFQUFFLENBQUMsU0FBUyxHQStCdkQ7a0JBL0JvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGVuZW15RGllRWZmZWN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIGZvcmNlX3g6bnVtYmVyPTEwMDAwO1xuICAgIGZvcmNlX3k6bnVtYmVyPTE3MDAwO1xuICAgIGFuaW1hdGlvbjpjYy5BbmltYXRpb249bnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICB9XG4gICAgc3RhcnQoKXtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9LDIpO1xuICAgIH07XG4gICAgcGxheSgpe1xuICAgICAgICBsZXQgeD0wO1xuICAgICAgICBsZXQgeT0wO1xuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uYW5nbGU9Y2FpamlUb29scy5yYW5kb21faW50KDAsMzYwKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgpO1xuICAgICAgICBmb3IobGV0IGNoaWxkIG9mIHRoaXMubm9kZS5jaGlsZHJlblsxXS5jaGlsZHJlbil7XG4gICAgICAgICAgICB4PWNhaWppVG9vbHMucmFuZG9tX2ludCgtNTAsNTApLzEwMDtcbiAgICAgICAgICAgIHk9Y2FpamlUb29scy5yYW5kb21faW50KDMwLDEwMCkvMTAwO1xuICAgICAgICAgICAgbGV0IG5vcm1hbD1jYy52Mih4LHkpLm5vcm1hbGl6ZVNlbGYoKTtcbiAgICAgICAgICAgIGxldCByaWdpYm9keT1jaGlsZC5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICAgICAgICAgIHJpZ2lib2R5LmFwcGx5QW5ndWxhckltcHVsc2UoY2FpamlUb29scy5yYW5kb21faW50KC01MDAsNTAwKSxmYWxzZSk7XG4gICAgICAgICAgICByaWdpYm9keS5hcHBseUZvcmNlVG9DZW50ZXIoY2MudjIobm9ybWFsLngqdGhpcy5mb3JjZV94LG5vcm1hbC55KnRoaXMuZm9yY2VfeSksdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19