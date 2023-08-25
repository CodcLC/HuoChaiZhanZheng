
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/FX_revive.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2e8a0lyOdNJY79/UntXWudK', 'FX_revive');
// scripts/game/FX_revive.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FX_revive = /** @class */ (function (_super) {
    __extends(FX_revive, _super);
    function FX_revive() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animation = null;
        return _this;
    }
    FX_revive.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    FX_revive.prototype.start = function () {
    };
    FX_revive.prototype.animationFinished = function () {
        var _this = this;
        this.createLightFx();
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 2);
    };
    FX_revive.prototype.createLightFx = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pre, fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/fx_reviveLight")];
                    case 1:
                        pre = _a.sent();
                        fx = cc.instantiate(pre);
                        fx.setParent(this.node.parent);
                        fx.setPosition(this.node.x, this.node.y + 110);
                        fx.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    FX_revive = __decorate([
        ccclass
    ], FX_revive);
    return FX_revive;
}(cc.Component));
exports.default = FX_revive;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRlhfcmV2aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDRDQUEyQztBQUVyQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQXdCQztRQXRCRyxlQUFTLEdBQWMsSUFBSSxDQUFDOztJQXNCaEMsQ0FBQztJQXBCRywwQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELHlCQUFLLEdBQUw7SUFDQSxDQUFDO0lBRUQscUNBQWlCLEdBQWpCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUNLLGlDQUFhLEdBQW5COzs7Ozs0QkFDWSxxQkFBTSx1QkFBVSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFBOzt3QkFBekQsR0FBRyxHQUFDLFNBQXFEO3dCQUN6RCxFQUFFLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDM0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMvQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QyxFQUFFLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQzs7Ozs7S0FDbEI7SUF2QmdCLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0F3QjdCO0lBQUQsZ0JBQUM7Q0F4QkQsQUF3QkMsQ0F4QnNDLEVBQUUsQ0FBQyxTQUFTLEdBd0JsRDtrQkF4Qm9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRlhfcmV2aXZlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIGFuaW1hdGlvbjpjYy5BbmltYXRpb249bnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uPXRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRmluaXNoZWQoKXtcbiAgICAgICAgdGhpcy5jcmVhdGVMaWdodEZ4KCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9LDIpO1xuICAgIH1cbiAgICBhc3luYyBjcmVhdGVMaWdodEZ4KCl7XG4gICAgICAgIGxldCBwcmU9YXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy9meF9yZXZpdmVMaWdodFwiKTtcbiAgICAgICAgbGV0IGZ4PWNjLmluc3RhbnRpYXRlKHByZSk7XG4gICAgICAgIGZ4LnNldFBhcmVudCh0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgZnguc2V0UG9zaXRpb24odGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrMTEwKTtcbiAgICAgICAgZnguYWN0aXZlPXRydWU7XG4gICAgfVxufVxuIl19