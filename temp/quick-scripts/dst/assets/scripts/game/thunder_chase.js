
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/thunder_chase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b5fabPzTzxMcruHZb3LiQ8O', 'thunder_chase');
// scripts/game/thunder_chase.ts

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
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var thunder_chase = /** @class */ (function (_super) {
    __extends(thunder_chase, _super);
    function thunder_chase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 0;
        _this.isOpenCollider = false;
        _this.interval = 0.2;
        _this.isCD = false;
        _this.player = null;
        return _this;
    }
    // onLoad () {}
    thunder_chase.prototype.start = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.isOpenCollider = true;
            if (_this.player != null && _this.isCD == false) {
                _this.hit();
            }
        }, 0.5);
        this.scheduleOnce(function () {
            _this.isOpenCollider = false;
        }, 2);
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 2.5);
    };
    thunder_chase.prototype.onCollisionEnter = function (other, self) {
        //if(this.isOpenCollider==false ||this.isCD) return;
        if (other.node.group == "player") {
            this.player = other.node;
            this.hit();
        }
    };
    /*     onCollisionStay(other:cc.Collider,self:cc.Collider){
            if(this.isOpenCollider==false ||this.isCD) return;
            if(other.node.group=="player"){
                this.hit();
            }
        } */
    thunder_chase.prototype.onCollisionExit = function (other, self) {
        //if(this.isOpenCollider==false ||this.isCD) return;
        if (other.node.group == "player") {
            this.player = null;
        }
    };
    thunder_chase.prototype.hit = function () {
        var _this = this;
        if (this.isOpenCollider == false || GameManager_1.default.instance.playerController.thunder_chase_cd) {
            this.scheduleOnce(function () {
                if (_this.player == null)
                    return;
                _this.hit();
            }, this.interval);
            return;
        }
        this.enterCD();
        this.playerEnterCd();
        this.node.getComponent(enemyHitCollider_1.default).hit(this.node, this.damage);
        this.scheduleOnce(function () {
            if (_this.player == null)
                return;
            _this.hit();
        }, this.interval);
    };
    thunder_chase.prototype.enterCD = function () {
        var _this = this;
        this.isCD = true;
        this.scheduleOnce(function () {
            _this.isCD = false;
        }, this.interval);
    };
    thunder_chase.prototype.playerEnterCd = function () {
        GameManager_1.default.instance.playerController.thunder_chase_cd = true;
        this.scheduleOnce(function () {
            GameManager_1.default.instance.playerController.thunder_chase_cd = false;
        }, this.interval);
    };
    thunder_chase = __decorate([
        ccclass
    ], thunder_chase);
    return thunder_chase;
}(cc.Component));
exports.default = thunder_chase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdGh1bmRlcl9jaGFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRix1REFBa0Q7QUFDbEQsNkNBQXdDO0FBRWxDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBdUVDO1FBckVHLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsb0JBQWMsR0FBUyxLQUFLLENBQUM7UUFDN0IsY0FBUSxHQUFRLEdBQUcsQ0FBQztRQUNwQixVQUFJLEdBQVMsS0FBSyxDQUFDO1FBQ25CLFlBQU0sR0FBUyxJQUFJLENBQUM7O0lBaUV4QixDQUFDO0lBaEVHLGVBQWU7SUFFZiw2QkFBSyxHQUFMO1FBQUEsaUJBYUM7UUFaRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUM7WUFDekIsSUFBRyxLQUFJLENBQUMsTUFBTSxJQUFFLElBQUksSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFFLEtBQUssRUFBQztnQkFDckMsS0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2Q7UUFDTCxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLGNBQWMsR0FBQyxLQUFLLENBQUM7UUFDOUIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixLQUFpQixFQUFDLElBQWdCO1FBQy9DLG9EQUFvRDtRQUNwRCxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFFLFFBQVEsRUFBQztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7SUFDTCxDQUFDO0lBQ0w7Ozs7O1lBS1E7SUFDSix1Q0FBZSxHQUFmLFVBQWdCLEtBQWlCLEVBQUMsSUFBZ0I7UUFDOUMsb0RBQW9EO1FBQ3BELElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUUsUUFBUSxFQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUNELDJCQUFHLEdBQUg7UUFBQSxpQkFlQztRQWRHLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBRSxLQUFLLElBQUUscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUM7WUFDbEYsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxJQUFHLEtBQUksQ0FBQyxNQUFNLElBQUUsSUFBSTtvQkFBRSxPQUFPO2dCQUM3QixLQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZixDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsSUFBRyxLQUFJLENBQUMsTUFBTSxJQUFFLElBQUk7Z0JBQUUsT0FBTztZQUM3QixLQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCwrQkFBTyxHQUFQO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxxQ0FBYSxHQUFiO1FBQ0kscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEdBQUMsSUFBSSxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBQyxLQUFLLENBQUM7UUFDakUsQ0FBQyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBdEVnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBdUVqQztJQUFELG9CQUFDO0NBdkVELEFBdUVDLENBdkUwQyxFQUFFLENBQUMsU0FBUyxHQXVFdEQ7a0JBdkVvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBlbmVteUhpdENvbGxpZGVyIGZyb20gXCIuL2VuZW15SGl0Q29sbGlkZXJcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRodW5kZXJfY2hhc2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgZGFtYWdlOm51bWJlcj0wO1xuICAgIGlzT3BlbkNvbGxpZGVyOmJvb2xlYW49ZmFsc2U7XG4gICAgaW50ZXJ2YWw6bnVtYmVyPTAuMjtcbiAgICBpc0NEOmJvb2xlYW49ZmFsc2U7XG4gICAgcGxheWVyOmNjLk5vZGU9bnVsbDtcbiAgICAvLyBvbkxvYWQgKCkge31cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ29sbGlkZXI9dHJ1ZTtcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVyIT1udWxsICYmIHRoaXMuaXNDRD09ZmFsc2Upe1xuICAgICAgICAgICAgICAgIHRoaXMuaGl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sMC41KTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ29sbGlkZXI9ZmFsc2U7XG4gICAgICAgIH0sMik7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9LDIuNSk7XG4gICAgfVxuXG4gICAgb25Db2xsaXNpb25FbnRlcihvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKXtcbiAgICAgICAgLy9pZih0aGlzLmlzT3BlbkNvbGxpZGVyPT1mYWxzZSB8fHRoaXMuaXNDRCkgcmV0dXJuO1xuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwPT1cInBsYXllclwiKXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyPW90aGVyLm5vZGU7XG4gICAgICAgICAgICB0aGlzLmhpdCgpO1xuICAgICAgICB9XG4gICAgfVxuLyogICAgIG9uQ29sbGlzaW9uU3RheShvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKXtcbiAgICAgICAgaWYodGhpcy5pc09wZW5Db2xsaWRlcj09ZmFsc2UgfHx0aGlzLmlzQ0QpIHJldHVybjtcbiAgICAgICAgaWYob3RoZXIubm9kZS5ncm91cD09XCJwbGF5ZXJcIil7XG4gICAgICAgICAgICB0aGlzLmhpdCgpO1xuICAgICAgICB9XG4gICAgfSAqL1xuICAgIG9uQ29sbGlzaW9uRXhpdChvdGhlcjpjYy5Db2xsaWRlcixzZWxmOmNjLkNvbGxpZGVyKXtcbiAgICAgICAgLy9pZih0aGlzLmlzT3BlbkNvbGxpZGVyPT1mYWxzZSB8fHRoaXMuaXNDRCkgcmV0dXJuO1xuICAgICAgICBpZihvdGhlci5ub2RlLmdyb3VwPT1cInBsYXllclwiKXtcbiAgICAgICAgICAgIHRoaXMucGxheWVyPW51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGl0KCl7XG4gICAgICAgIGlmKHRoaXMuaXNPcGVuQ29sbGlkZXI9PWZhbHNlfHxHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnRodW5kZXJfY2hhc2VfY2Qpe1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXllcj09bnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuaGl0KCk7XG4gICAgICAgICAgICB9LHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW50ZXJDRCgpO1xuICAgICAgICB0aGlzLnBsYXllckVudGVyQ2QoKTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLHRoaXMuZGFtYWdlKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVyPT1udWxsKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmhpdCgpO1xuICAgICAgICB9LHRoaXMuaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBlbnRlckNEKCl7XG4gICAgICAgIHRoaXMuaXNDRD10cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5pc0NEPWZhbHNlO1xuICAgICAgICB9LHRoaXMuaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBwbGF5ZXJFbnRlckNkKCl7XG4gICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIudGh1bmRlcl9jaGFzZV9jZD10cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci50aHVuZGVyX2NoYXNlX2NkPWZhbHNlO1xuICAgICAgICB9LHRoaXMuaW50ZXJ2YWwpO1xuICAgIH1cbn1cbiJdfQ==