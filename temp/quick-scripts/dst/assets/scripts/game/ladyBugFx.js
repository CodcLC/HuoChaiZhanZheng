
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ladyBugFx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '25086OybqJGWJ4DaXZ8IcjK', 'ladyBugFx');
// scripts/game/ladyBugFx.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var caijiTools_1 = require("../caijiTools");
var GameManager_1 = require("./GameManager");
var playerController_1 = require("./playerController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ladyBugFx = /** @class */ (function (_super) {
    __extends(ladyBugFx, _super);
    function ladyBugFx() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.liquidParticle = null;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.damage = 0;
        _this.isRightMove = false; //是否朝右
        _this.isCollide = false;
        _this.rigibody = null;
        return _this;
    }
    ladyBugFx.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
    };
    ladyBugFx.prototype.start = function () {
        var time = (Math.abs(this.node.y - GameManager_1.default.instance.player.y) + 40) / this.speedY;
        var distanceX = Math.abs(this.node.x - GameManager_1.default.instance.player.x);
        this.speedX = distanceX * 3;
        //this.speedX=(Math.abs(this.node.x-GameManager.instance.player.x))/time;
        this.speedX = this.isRightMove == true ? this.speedX : -this.speedX;
        this.liquidParticle.angle = this.isRightMove == true ? -30 : -150;
        this.rigibody.linearVelocity = cc.v2(this.speedX, 0);
    };
    ladyBugFx.prototype.hit = function (player) {
        this.createSmoke();
        player.getComponent(playerController_1.default).beHit(this.node, this.damage);
    };
    ladyBugFx.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (this.isCollide)
            return;
        var other = otherCollider.node;
        if (other.group == "ground") {
            this.createSmoke();
        }
        else if (other.group == "player") {
            this.hit(other);
        }
    };
    ladyBugFx.prototype.createSmoke = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, smoke;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isCollide = true;
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/ladyBugSmoke")];
                    case 1:
                        prefab = _a.sent();
                        smoke = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        smoke.setPosition(this.node.position);
                        smoke.active = true;
                        this.node.destroy();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.ParticleSystem)
    ], ladyBugFx.prototype, "liquidParticle", void 0);
    ladyBugFx = __decorate([
        ccclass
    ], ladyBugFx);
    return ladyBugFx;
}(cc.Component));
exports.default = ladyBugFx;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcbGFkeUJ1Z0Z4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDRDQUEyQztBQUMzQyw2Q0FBd0M7QUFDeEMsdURBQWtEO0FBRzVDLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBNENDO1FBekNHLG9CQUFjLEdBQW1CLElBQUksQ0FBQztRQUV0QyxZQUFNLEdBQVEsQ0FBQyxDQUFDO1FBQ2hCLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsWUFBTSxHQUFRLENBQUMsQ0FBQztRQUNoQixpQkFBVyxHQUFTLEtBQUssQ0FBQyxDQUFBLE1BQU07UUFDaEMsZUFBUyxHQUFTLEtBQUssQ0FBQztRQUN4QixjQUFRLEdBQWMsSUFBSSxDQUFDOztJQWtDL0IsQ0FBQztJQWpDRywwQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNELHlCQUFLLEdBQUw7UUFDSSxJQUFJLElBQUksR0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUUsSUFBSSxTQUFTLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLE1BQU0sR0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDO1FBQ3hCLHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxXQUFXLElBQUUsSUFBSSxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLFdBQVcsSUFBRSxJQUFJLENBQUEsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQSxDQUFDLEdBQUcsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELHVCQUFHLEdBQUgsVUFBSSxNQUFjO1FBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxZQUFZLENBQUMsMEJBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNELGtDQUFjLEdBQWQsVUFBZSxPQUEwQixFQUFFLFlBQWdDLEVBQUUsYUFBaUM7UUFDMUcsSUFBRyxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU87UUFDMUIsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUFLLElBQUksS0FBSyxDQUFDLEtBQUssSUFBRSxRQUFRLEVBQUM7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFDSywrQkFBVyxHQUFqQjs7Ozs7O3dCQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO3dCQUNULHFCQUFNLHVCQUFVLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUE7O3dCQUExRCxNQUFNLEdBQUMsU0FBbUQ7d0JBQzFELEtBQUssR0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDekQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN0QyxLQUFLLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQzt3QkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7Ozs7S0FDdkI7SUF4Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQztxREFDVTtJQUhyQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBNEM3QjtJQUFELGdCQUFDO0NBNUNELEFBNENDLENBNUNzQyxFQUFFLENBQUMsU0FBUyxHQTRDbEQ7a0JBNUNvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5pbXBvcnQgcGxheWVyQ29udHJvbGxlciBmcm9tIFwiLi9wbGF5ZXJDb250cm9sbGVyXCI7XG5pbXBvcnQgcG9ydGFsIGZyb20gXCIuL3BvcnRhbFwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxhZHlCdWdGeCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuUGFydGljbGVTeXN0ZW0pXG4gICAgbGlxdWlkUGFydGljbGU6Y2MuUGFydGljbGVTeXN0ZW09bnVsbDtcblxuICAgIHNwZWVkWDpudW1iZXI9MDtcbiAgICBzcGVlZFk6bnVtYmVyPTA7XG4gICAgZGFtYWdlOm51bWJlcj0wO1xuICAgIGlzUmlnaHRNb3ZlOmJvb2xlYW49ZmFsc2U7Ly/mmK/lkKbmnJ3lj7NcbiAgICBpc0NvbGxpZGU6Ym9vbGVhbj1mYWxzZTtcbiAgICByaWdpYm9keTpjYy5SaWdpZEJvZHk9bnVsbDtcbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5yaWdpYm9keT10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XG4gICAgfVxuICAgIHN0YXJ0KCl7XG4gICAgICAgIGxldCB0aW1lPShNYXRoLmFicyh0aGlzLm5vZGUueS1HYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueSkrNDApL3RoaXMuc3BlZWRZO1xuICAgICAgICBsZXQgZGlzdGFuY2VYPU1hdGguYWJzKHRoaXMubm9kZS54LUdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54KTtcbiAgICAgICAgdGhpcy5zcGVlZFg9ZGlzdGFuY2VYKjM7XG4gICAgICAgIC8vdGhpcy5zcGVlZFg9KE1hdGguYWJzKHRoaXMubm9kZS54LUdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54KSkvdGltZTtcbiAgICAgICAgdGhpcy5zcGVlZFg9dGhpcy5pc1JpZ2h0TW92ZT09dHJ1ZT90aGlzLnNwZWVkWDotdGhpcy5zcGVlZFg7XG4gICAgICAgIHRoaXMubGlxdWlkUGFydGljbGUuYW5nbGU9dGhpcy5pc1JpZ2h0TW92ZT09dHJ1ZT8tMzA6LTE1MDtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih0aGlzLnNwZWVkWCwwKTtcbiAgICB9XG4gICAgaGl0KHBsYXllcjpjYy5Ob2RlKXtcbiAgICAgICAgdGhpcy5jcmVhdGVTbW9rZSgpO1xuICAgICAgICBwbGF5ZXIuZ2V0Q29tcG9uZW50KHBsYXllckNvbnRyb2xsZXIpLmJlSGl0KHRoaXMubm9kZSx0aGlzLmRhbWFnZSk7XG4gICAgfVxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3Q6IGNjLlBoeXNpY3NDb250YWN0LCBzZWxmQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlciwgb3RoZXJDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGlmKHRoaXMuaXNDb2xsaWRlKSByZXR1cm47XG4gICAgICAgIGxldCBvdGhlciA9IG90aGVyQ29sbGlkZXIubm9kZTtcbiAgICAgICAgaWYgKG90aGVyLmdyb3VwID09IFwiZ3JvdW5kXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU21va2UoKTtcbiAgICAgICAgfWVsc2UgaWYgKG90aGVyLmdyb3VwPT1cInBsYXllclwiKXtcbiAgICAgICAgICAgIHRoaXMuaGl0KG90aGVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjcmVhdGVTbW9rZSgpe1xuICAgICAgICB0aGlzLmlzQ29sbGlkZT10cnVlO1xuICAgICAgICBsZXQgcHJlZmFiPWF3YWl0IGNhaWppVG9vbHMubG9hZFByZWZhYihcInByZWZhYnMvbGFkeUJ1Z1Ntb2tlXCIpO1xuICAgICAgICBsZXQgc21va2U9Y2FpamlUb29scy5jcmVhdGVOb2RlKHByZWZhYix0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgc21va2Uuc2V0UG9zaXRpb24odGhpcy5ub2RlLnBvc2l0aW9uKTtcbiAgICAgICAgc21va2UuYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxufVxuIl19