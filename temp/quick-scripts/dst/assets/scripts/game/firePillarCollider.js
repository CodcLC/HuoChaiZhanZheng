
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/firePillarCollider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ca9d7SQpQBO0YLL7wMxolKH', 'firePillarCollider');
// scripts/game/firePillarCollider.ts

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
var audioNameMgr_1 = require("../audioNameMgr");
var audioManager_1 = require("../main/audioManager");
var enemyHitCollider_1 = require("./enemyHitCollider");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var firePillarCollider = /** @class */ (function (_super) {
    __extends(firePillarCollider, _super);
    function firePillarCollider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fireSmoke1 = null;
        _this.fireSmoke2 = null;
        _this.damage = 0;
        _this.interval = 0.3; //攻击间隔
        _this.enemyHitCollider = null;
        _this.isStay = false;
        return _this;
    }
    firePillarCollider.prototype.onLoad = function () {
        this.enemyHitCollider = this.node.getComponent(enemyHitCollider_1.default);
    };
    firePillarCollider.prototype.start = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E20FirePillar, false, 0.5);
        this.scheduleOnce(function () {
            _this.fireSmoke2.active = true;
        }, 0.23);
        this.scheduleOnce(function () {
            _this.fireSmoke1.getComponent(cc.Animation).stop();
            _this.fireSmoke2.getComponent(cc.Animation).stop();
            cc.tween(_this.fireSmoke1).to(0.1, { opacity: 0 }).start();
            cc.tween(_this.fireSmoke2).to(0.1, { opacity: 0 }).start();
            _this.node.getComponent(cc.BoxCollider).enabled = false;
        }, 4);
        this.scheduleOnce(function () {
            _this.node.children[1].active = true;
            _this.node.children[0].active = false;
            _this.node.getComponent(cc.BoxCollider).enabled = true;
        }, 0.8);
    };
    firePillarCollider.prototype.hit = function () {
        var _this = this;
        this.enemyHitCollider.hit(this.node, this.damage);
        this.scheduleOnce(function () {
            if (_this.isStay) {
                _this.hit();
            }
        }, this.interval);
    };
    firePillarCollider.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        this.isStay = true;
        this.scheduleOnce(function () {
            _this.hit();
        }, 0);
    };
    /*     onCollisionStay(other:cc.Collider,self:cc.Collider){
            if(this.isStay) return;
            this.isStay=true;
            this.schedule(this.hit,this.interval);
            
        } */
    firePillarCollider.prototype.onCollisionExit = function (other, self) {
        this.isStay = false;
        //this.unschedule(this.hit);
    };
    __decorate([
        property(cc.Node)
    ], firePillarCollider.prototype, "fireSmoke1", void 0);
    __decorate([
        property(cc.Node)
    ], firePillarCollider.prototype, "fireSmoke2", void 0);
    firePillarCollider = __decorate([
        ccclass
    ], firePillarCollider);
    return firePillarCollider;
}(cc.Component));
exports.default = firePillarCollider;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZmlyZVBpbGxhckNvbGxpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGdEQUE0QztBQUM1QyxxREFBZ0Q7QUFDaEQsdURBQWtEO0FBRTVDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWdELHNDQUFZO0lBQTVEO1FBQUEscUVBeURDO1FBdERHLGdCQUFVLEdBQVMsSUFBSSxDQUFDO1FBRXhCLGdCQUFVLEdBQVMsSUFBSSxDQUFDO1FBRXhCLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsY0FBUSxHQUFRLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDMUIsc0JBQWdCLEdBQWtCLElBQUksQ0FBQztRQUN2QyxZQUFNLEdBQVMsS0FBSyxDQUFDOztJQStDekIsQ0FBQztJQTlDRyxtQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELGtDQUFLLEdBQUw7UUFBQSxpQkFpQkM7UUFoQkcsc0JBQVksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxhQUFhLEVBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7UUFDaEMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1IsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsRCxLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEQsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RELEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0RCxLQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQztRQUN6RCxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztZQUNsQyxLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO1lBQ25DLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDO1FBQ3hELENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxnQ0FBRyxHQUFIO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFHLEtBQUksQ0FBQyxNQUFNLEVBQUM7Z0JBQ1gsS0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2Q7UUFDTCxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCw2Q0FBZ0IsR0FBaEIsVUFBaUIsS0FBaUIsRUFBQyxJQUFnQjtRQUFuRCxpQkFLQztRQUpHLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0w7Ozs7O1lBS1E7SUFDSiw0Q0FBZSxHQUFmLFVBQWdCLEtBQWlCLEVBQUMsSUFBZ0I7UUFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7UUFDbEIsNEJBQTRCO0lBQ2hDLENBQUM7SUFyREQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzBEQUNNO0lBTFAsa0JBQWtCO1FBRHRDLE9BQU87T0FDYSxrQkFBa0IsQ0F5RHRDO0lBQUQseUJBQUM7Q0F6REQsQUF5REMsQ0F6RCtDLEVBQUUsQ0FBQyxTQUFTLEdBeUQzRDtrQkF6RG9CLGtCQUFrQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IGVuZW15SGl0Q29sbGlkZXIgZnJvbSBcIi4vZW5lbXlIaXRDb2xsaWRlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpcmVQaWxsYXJDb2xsaWRlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBmaXJlU21va2UxOmNjLk5vZGU9bnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBmaXJlU21va2UyOmNjLk5vZGU9bnVsbDtcblxuICAgIGRhbWFnZTpudW1iZXI9MDtcbiAgICBpbnRlcnZhbDpudW1iZXI9MC4zOy8v5pS75Ye76Ze06ZqUXG4gICAgZW5lbXlIaXRDb2xsaWRlcjplbmVteUhpdENvbGxpZGVyPW51bGw7XG4gICAgaXNTdGF5OmJvb2xlYW49ZmFsc2U7XG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5lbmVteUhpdENvbGxpZGVyPXRoaXMubm9kZS5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcik7XG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMjBGaXJlUGlsbGFyLGZhbHNlLDAuNSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLmZpcmVTbW9rZTIuYWN0aXZlPXRydWU7XG4gICAgICAgIH0sMC4yMyk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLmZpcmVTbW9rZTEuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5maXJlU21va2UyLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnN0b3AoKTtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuZmlyZVNtb2tlMSkudG8oMC4xLHtvcGFjaXR5OjB9KS5zdGFydCgpO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5maXJlU21va2UyKS50bygwLjEse29wYWNpdHk6MH0pLnN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5lbmFibGVkPWZhbHNlO1xuICAgICAgICB9LDQpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzFdLmFjdGl2ZT10cnVlO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQm94Q29sbGlkZXIpLmVuYWJsZWQ9dHJ1ZTtcbiAgICAgICAgfSwwLjgpO1xuICAgIH1cbiAgICBoaXQoKXtcbiAgICAgICAgdGhpcy5lbmVteUhpdENvbGxpZGVyLmhpdCh0aGlzLm5vZGUsdGhpcy5kYW1hZ2UpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5pc1N0YXkpe1xuICAgICAgICAgICAgICAgIHRoaXMuaGl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sdGhpcy5pbnRlcnZhbCk7XG4gICAgfVxuICAgIG9uQ29sbGlzaW9uRW50ZXIob3RoZXI6Y2MuQ29sbGlkZXIsc2VsZjpjYy5Db2xsaWRlcil7XG4gICAgICAgIHRoaXMuaXNTdGF5PXRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLmhpdCgpO1xuICAgICAgICB9LDApO1xuICAgIH1cbi8qICAgICBvbkNvbGxpc2lvblN0YXkob3RoZXI6Y2MuQ29sbGlkZXIsc2VsZjpjYy5Db2xsaWRlcil7XG4gICAgICAgIGlmKHRoaXMuaXNTdGF5KSByZXR1cm47XG4gICAgICAgIHRoaXMuaXNTdGF5PXRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5oaXQsdGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIFxuICAgIH0gKi9cbiAgICBvbkNvbGxpc2lvbkV4aXQob3RoZXI6Y2MuQ29sbGlkZXIsc2VsZjpjYy5Db2xsaWRlcil7XG4gICAgICAgIHRoaXMuaXNTdGF5PWZhbHNlO1xuICAgICAgICAvL3RoaXMudW5zY2hlZHVsZSh0aGlzLmhpdCk7XG4gICAgfVxufVxuIl19