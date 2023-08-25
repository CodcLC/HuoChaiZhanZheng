
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/damageLabel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2ba7dBjhcBPT4tDUpx3sf4S', 'damageLabel');
// scripts/game/damageLabel.ts

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
var damageTipPool_1 = require("./damageTipPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageLabel = /** @class */ (function (_super) {
    __extends(damageLabel, _super);
    function damageLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.damage = 0;
        _this.color = cc.Color.GREEN;
        return _this;
    }
    damageLabel.prototype.onLoad = function () {
        this.label = this.node.getComponent(cc.Label);
    };
    damageLabel.prototype.onEnable = function () {
        this.node.color = this.color;
        if (this.color.g == 255 && this.color.r == 0) {
            this.node.getComponent(cc.Label).string = "+" + this.damage.toString();
            this.addHpAciton();
        }
        else {
            this.node.getComponent(cc.Label).string = this.damage.toString();
            this.damageAction();
        }
    };
    damageLabel.prototype.addHpAciton = function () {
        var _this = this;
        this.label.fontSize = 0;
        this.label.lineHeight = 0;
        //this.node.opacity=255;
        cc.tween(this.node)
            .parallel(cc.tween().by(0.01, { opacity: 255 }), cc.tween().by(0.5, { y: 80 }))
            .by(0.2, { opacity: -255, y: 40 })
            .call(function () {
            damageTipPool_1.default.instance.recoveryDmgLabel(_this.node);
        })
            .start();
        cc.tween(this.label)
            .to(0.1, { fontSize: 32, lineHeight: 32 })
            .start();
    };
    damageLabel.prototype.damageAction = function () {
        var _this = this;
        this.node.opacity = 255;
        cc.tween(this.node)
            .parallel(cc.tween().by(0.4, { y: 120 }), cc.tween().to(0.06, { scale: 1.4 }).to(0.1, { scale: 1 }))
            .by(0.2, { opacity: -255, y: 60 })
            .call(function () {
            damageTipPool_1.default.instance.recoveryDmgLabel(_this.node);
        })
            .start();
        /*         cc.tween(this.label)
                .to(0.06,{fontSize:45,lineHeight:45})
                .to(0.07,{fontSize:32,lineHeight:32})
                .start(); */
    };
    damageLabel.prototype.reuse = function () {
        /*         let size=(this.node.color.g==255&&this.color.r==0)?0:32;
                this.label.fontSize=size;
                this.label.lineHeight=size;
                this.node.opacity=255; */
    };
    damageLabel.prototype.unuse = function () {
        cc.Tween.stopAllByTarget(this.node);
        if (this.label == null) {
            this.label = this.node.getComponent(cc.Label);
        }
        this.node.scale = 0;
        /*         this.label.fontSize=0;
                this.label.lineHeight=0; */
        this.node.active = false;
    };
    damageLabel = __decorate([
        ccclass
    ], damageLabel);
    return damageLabel;
}(cc.Component));
exports.default = damageLabel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZGFtYWdlTGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsaURBQTRDO0FBRXRDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBd0VDO1FBdEVHLFdBQUssR0FBVSxJQUFJLENBQUM7UUFDcEIsWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixXQUFLLEdBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7O0lBb0VsQyxDQUFDO0lBbEVHLDRCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsOEJBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBRSxHQUFHLElBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO2FBQUk7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBRUwsQ0FBQztJQUNELGlDQUFXLEdBQVg7UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLENBQUMsQ0FBQztRQUN4Qix3QkFBd0I7UUFDeEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2xCLFFBQVEsQ0FDTCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUNqQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUM1QjthQUNBLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDO2FBQzNCLElBQUksQ0FBQztZQUNGLHVCQUFhLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztRQUNULEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNuQixFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLENBQUM7YUFDbkMsS0FBSyxFQUFFLENBQUM7SUFDYixDQUFDO0lBQ0Qsa0NBQVksR0FBWjtRQUFBLGlCQWdCQztRQWZHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztRQUN0QixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEIsUUFBUSxDQUNMLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQzFCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUNwRDthQUNBLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDO2FBQzNCLElBQUksQ0FBQztZQUNGLHVCQUFhLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztRQUNqQjs7OzRCQUdvQjtJQUNoQixDQUFDO0lBRUQsMkJBQUssR0FBTDtRQUNKOzs7eUNBR2lDO0lBQzdCLENBQUM7SUFDRCwyQkFBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUcsSUFBSSxDQUFDLEtBQUssSUFBRSxJQUFJLEVBQUM7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0M7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7UUFDMUI7MkNBQ21DO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBdkVnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBd0UvQjtJQUFELGtCQUFDO0NBeEVELEFBd0VDLENBeEV3QyxFQUFFLENBQUMsU0FBUyxHQXdFcEQ7a0JBeEVvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBkYW1hZ2VUaXBQb29sIGZyb20gXCIuL2RhbWFnZVRpcFBvb2xcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBkYW1hZ2VMYWJlbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBsYWJlbDpjYy5MYWJlbD1udWxsO1xuICAgIGRhbWFnZTpudW1iZXI9MDtcbiAgICBjb2xvcjpjYy5Db2xvcj1jYy5Db2xvci5HUkVFTjtcblxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLmxhYmVsPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgIH1cbiAgICBvbkVuYWJsZSgpe1xuICAgICAgICB0aGlzLm5vZGUuY29sb3I9dGhpcy5jb2xvcjtcbiAgICAgICAgaWYodGhpcy5jb2xvci5nPT0yNTUmJnRoaXMuY29sb3Iucj09MCl7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9XCIrXCIrdGhpcy5kYW1hZ2UudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkSHBBY2l0b24oKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dGhpcy5kYW1hZ2UudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlQWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICBhZGRIcEFjaXRvbigpe1xuICAgICAgICB0aGlzLmxhYmVsLmZvbnRTaXplPTA7XG4gICAgICAgIHRoaXMubGFiZWwubGluZUhlaWdodD0wO1xuICAgICAgICAvL3RoaXMubm9kZS5vcGFjaXR5PTI1NTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxuICAgICAgICAucGFyYWxsZWwoXG4gICAgICAgICAgICBjYy50d2VlbigpLmJ5KDAuMDEse29wYWNpdHk6MjU1fSksXG4gICAgICAgICAgICBjYy50d2VlbigpLmJ5KDAuNSx7eTo4MH0pXG4gICAgICAgIClcbiAgICAgICAgLmJ5KDAuMix7b3BhY2l0eTotMjU1LHk6NDB9KVxuICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5yZWNvdmVyeURtZ0xhYmVsKHRoaXMubm9kZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgICAgICBjYy50d2Vlbih0aGlzLmxhYmVsKVxuICAgICAgICAudG8oMC4xLHtmb250U2l6ZTozMixsaW5lSGVpZ2h0OjMyfSlcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuICAgIGRhbWFnZUFjdGlvbigpe1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0yNTU7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgLnBhcmFsbGVsKFxuICAgICAgICAgICAgY2MudHdlZW4oKS5ieSgwLjQse3k6MTIwfSksXG4gICAgICAgICAgICBjYy50d2VlbigpLnRvKDAuMDYse3NjYWxlOjEuNH0pLnRvKDAuMSx7c2NhbGU6MX0pXG4gICAgICAgIClcbiAgICAgICAgLmJ5KDAuMix7b3BhY2l0eTotMjU1LHk6NjB9KVxuICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5yZWNvdmVyeURtZ0xhYmVsKHRoaXMubm9kZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGFydCgpO1xuLyogICAgICAgICBjYy50d2Vlbih0aGlzLmxhYmVsKVxuICAgICAgICAudG8oMC4wNix7Zm9udFNpemU6NDUsbGluZUhlaWdodDo0NX0pXG4gICAgICAgIC50bygwLjA3LHtmb250U2l6ZTozMixsaW5lSGVpZ2h0OjMyfSlcbiAgICAgICAgLnN0YXJ0KCk7ICovXG4gICAgfVxuXG4gICAgcmV1c2UoKXtcbi8qICAgICAgICAgbGV0IHNpemU9KHRoaXMubm9kZS5jb2xvci5nPT0yNTUmJnRoaXMuY29sb3Iucj09MCk/MDozMjtcbiAgICAgICAgdGhpcy5sYWJlbC5mb250U2l6ZT1zaXplO1xuICAgICAgICB0aGlzLmxhYmVsLmxpbmVIZWlnaHQ9c2l6ZTtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1OyAqL1xuICAgIH1cbiAgICB1bnVzZSgpe1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5ub2RlKTtcbiAgICAgICAgaWYodGhpcy5sYWJlbD09bnVsbCl7XG4gICAgICAgICAgICB0aGlzLmxhYmVsPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZT0wO1xuLyogICAgICAgICB0aGlzLmxhYmVsLmZvbnRTaXplPTA7XG4gICAgICAgIHRoaXMubGFiZWwubGluZUhlaWdodD0wOyAqL1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlPWZhbHNlO1xuICAgIH1cbn1cbiJdfQ==