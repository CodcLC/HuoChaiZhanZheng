
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ui/uiManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '802c0LyqytH+oMyE5/IpfQ3', 'uiManager');
// scripts/game/ui/uiManager.ts

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
var caijiTools_1 = require("../../caijiTools");
var uiBase_1 = require("../../uiBase");
var GameManager_1 = require("../GameManager");
var bossHp_1 = require("./bossHp");
var playerHp_1 = require("./playerHp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var uiManager = /** @class */ (function (_super) {
    __extends(uiManager, _super);
    function uiManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wuDiNode = null;
        _this.doubleDmgNode = null;
        _this.fullHpNode = null;
        _this.bossHpNode = null;
        _this.loadingNodeStart = null;
        _this.loadingNodeEnd = null;
        _this.bossHp = null;
        return _this;
    }
    uiManager_1 = uiManager;
    uiManager.prototype.onLoad = function () {
        uiManager_1.ins = this;
    };
    uiManager.prototype.start = function () {
        this.init();
    };
    uiManager.prototype.init = function () {
        this.loadingNodeStart.width = cc.winSize.width * 2;
        this.loadingNodeEnd.width = cc.winSize.width * 2;
        this.loadingNodeEnd.active = true;
    };
    uiManager.prototype.lose = function () {
        var _this = this;
        this.scheduleOnce(function () {
            caijiTools_1.caijiTools.showPopup(uiBase_1.uiName.losePanel, _this.node);
        }, 1.5);
    };
    uiManager.prototype.pause = function () {
        caijiTools_1.caijiTools.showPopup(uiBase_1.uiName.pausePanel, this.node);
    };
    uiManager.prototype.win = function () {
        var _this = this;
        GameManager_1.default.instance.levelCompletEvent();
        this.scheduleOnce(function () {
            caijiTools_1.caijiTools.showPopup(uiBase_1.uiName.winPanel, _this.node);
        }, 2.5);
    };
    uiManager.prototype.showUi = function () {
        this.wuDiNode.active = true;
        this.doubleDmgNode.active = true;
        this.fullHpNode.active = true;
    };
    uiManager.prototype.showWuDiPopup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.showPopup(uiBase_1.uiName.wuDiPopup, this.node)];
                    case 1:
                        _a.sent();
                        cc.director.pause();
                        return [2 /*return*/];
                }
            });
        });
    };
    uiManager.prototype.showFullHpPopup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.showPopup(uiBase_1.uiName.fullHpPopup, this.node)];
                    case 1:
                        _a.sent();
                        cc.director.pause();
                        return [2 /*return*/];
                }
            });
        });
    };
    uiManager.prototype.showDoubleDamagePopup = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.showPopup(uiBase_1.uiName.doubleDamagePopup, this.node)];
                    case 1:
                        _a.sent();
                        cc.director.pause();
                        return [2 /*return*/];
                }
            });
        });
    };
    uiManager.prototype.wuDi = function () {
        var _this = this;
        if (GameManager_1.default.instance.playerController.isDie)
            return;
        this.wuDiNode.active = false;
        GameManager_1.default.instance.playerController.openWuDi(20);
        this.scheduleOnce(function () {
            _this.wuDiNode.active = true;
        }, 10);
    };
    uiManager.prototype.doubleDamage = function () {
        if (GameManager_1.default.instance.playerController.isDie)
            return;
        playerHp_1.default.instance.damageScale *= 2;
        this.doubleDmgNode.active = false;
    };
    uiManager.prototype.fullHp = function () {
        if (GameManager_1.default.instance.playerController.isDie)
            return;
        playerHp_1.default.instance.fullHp();
    };
    uiManager.prototype.showBossHp = function (bossName) {
        var _this = this;
        this.bossHp = this.bossHpNode.getComponent(bossHp_1.default);
        this.bossHp.bossName = bossName;
        this.bossHp.init(function () {
            _this.bossHpNode.active = true;
        });
    };
    uiManager.prototype.loadingStart = function (callBack) {
        this.loadingNodeStart.x = cc.winSize.width / 2;
        this.loadingNodeStart.width = cc.winSize.width + 1064;
        this.loadingNodeStart.active = true;
        var movex = -this.loadingNodeStart.width * this.loadingNodeStart.scaleX;
        cc.tween(this.loadingNodeStart)
            .by(0.6, { x: movex })
            .call(function () {
            callBack();
        })
            .start();
    };
    uiManager.prototype.loadingEnd = function () {
        var _this = this;
        this.loadingNodeEnd.x = -cc.winSize.width / 2;
        this.loadingNodeEnd.width = cc.winSize.width + 1064;
        this.loadingNodeEnd.active = true;
        this.loadingNodeStart.active = false;
        var movex = -this.loadingNodeEnd.width * Math.abs(this.loadingNodeEnd.scaleX);
        cc.tween(this.loadingNodeEnd)
            .by(0.6, { x: movex })
            .call(function () {
            _this.loadingNodeEnd.active = false;
            GameManager_1.default.instance.spawnPlayer();
        })
            .start();
    };
    var uiManager_1;
    uiManager.ins = null;
    __decorate([
        property(cc.Node)
    ], uiManager.prototype, "wuDiNode", void 0);
    __decorate([
        property(cc.Node)
    ], uiManager.prototype, "doubleDmgNode", void 0);
    __decorate([
        property(cc.Node)
    ], uiManager.prototype, "fullHpNode", void 0);
    __decorate([
        property(cc.Node)
    ], uiManager.prototype, "bossHpNode", void 0);
    __decorate([
        property(cc.Node)
    ], uiManager.prototype, "loadingNodeStart", void 0);
    __decorate([
        property(cc.Node)
    ], uiManager.prototype, "loadingNodeEnd", void 0);
    uiManager = uiManager_1 = __decorate([
        ccclass
    ], uiManager);
    return uiManager;
}(cc.Component));
exports.default = uiManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdWlcXHVpTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiwrQ0FBOEM7QUFFOUMsdUNBQXNDO0FBQ3RDLDhDQUF5QztBQUN6QyxtQ0FBNEM7QUFDNUMsdUNBQWtDO0FBRTVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBK0dDO1FBNUdHLGNBQVEsR0FBUyxJQUFJLENBQUM7UUFFdEIsbUJBQWEsR0FBUyxJQUFJLENBQUM7UUFFM0IsZ0JBQVUsR0FBUyxJQUFJLENBQUM7UUFFeEIsZ0JBQVUsR0FBUyxJQUFJLENBQUM7UUFFeEIsc0JBQWdCLEdBQVMsSUFBSSxDQUFDO1FBRTlCLG9CQUFjLEdBQVMsSUFBSSxDQUFDO1FBRTVCLFlBQU0sR0FBUSxJQUFJLENBQUM7O0lBZ0d2QixDQUFDO2tCQS9Hb0IsU0FBUztJQWtCMUIsMEJBQU0sR0FBTjtRQUNJLFdBQVMsQ0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx5QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx3QkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdB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RCxBQStHQyxDQS9Hc0MsRUFBRSxDQUFDLFNBQVMsR0ErR2xEO2tCQS9Hb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uLy4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCB7IGFkIH0gZnJvbSBcIi4uLy4uL3Nkay9hZFwiO1xuaW1wb3J0IHsgdWlOYW1lIH0gZnJvbSBcIi4uLy4uL3VpQmFzZVwiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IGJvc3NIcCwgeyBib3NzTmFtZSB9IGZyb20gXCIuL2Jvc3NIcFwiO1xuaW1wb3J0IHBsYXllckhwIGZyb20gXCIuL3BsYXllckhwXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdWlNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHd1RGlOb2RlOmNjLk5vZGU9bnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBkb3VibGVEbWdOb2RlOmNjLk5vZGU9bnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBmdWxsSHBOb2RlOmNjLk5vZGU9bnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBib3NzSHBOb2RlOmNjLk5vZGU9bnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsb2FkaW5nTm9kZVN0YXJ0OmNjLk5vZGU9bnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsb2FkaW5nTm9kZUVuZDpjYy5Ob2RlPW51bGw7XG5cbiAgICBib3NzSHA6Ym9zc0hwPW51bGw7XG4gICAgc3RhdGljIGluczp1aU1hbmFnZXI9bnVsbDtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHVpTWFuYWdlci5pbnM9dGhpcztcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMubG9hZGluZ05vZGVTdGFydC53aWR0aD1jYy53aW5TaXplLndpZHRoKjI7XG4gICAgICAgIHRoaXMubG9hZGluZ05vZGVFbmQud2lkdGg9Y2Mud2luU2l6ZS53aWR0aCoyO1xuICAgICAgICB0aGlzLmxvYWRpbmdOb2RlRW5kLmFjdGl2ZT10cnVlO1xuICAgIH1cbiAgICBsb3NlKCl7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBjYWlqaVRvb2xzLnNob3dQb3B1cCh1aU5hbWUubG9zZVBhbmVsLHRoaXMubm9kZSk7XG4gICAgICAgIH0sMS41KTtcbiAgICB9XG4gICAgcGF1c2UoKXtcbiAgICAgICAgY2FpamlUb29scy5zaG93UG9wdXAodWlOYW1lLnBhdXNlUGFuZWwsdGhpcy5ub2RlKTtcbiAgICB9XG4gICAgd2luKCl7XG4gICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLmxldmVsQ29tcGxldEV2ZW50KCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBjYWlqaVRvb2xzLnNob3dQb3B1cCh1aU5hbWUud2luUGFuZWwsdGhpcy5ub2RlKTtcbiAgICAgICAgfSwyLjUpO1xuICAgIH1cbiAgICBzaG93VWkoKXtcbiAgICAgICAgdGhpcy53dURpTm9kZS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgdGhpcy5kb3VibGVEbWdOb2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICB0aGlzLmZ1bGxIcE5vZGUuYWN0aXZlPXRydWU7XG4gICAgfVxuICAgIGFzeW5jIHNob3dXdURpUG9wdXAoKXtcbiAgICAgICAgYXdhaXQgY2FpamlUb29scy5zaG93UG9wdXAodWlOYW1lLnd1RGlQb3B1cCx0aGlzLm5vZGUpO1xuICAgICAgICBjYy5kaXJlY3Rvci5wYXVzZSgpO1xuICAgIH1cbiAgICBhc3luYyBzaG93RnVsbEhwUG9wdXAoKXtcbiAgICAgICAgYXdhaXQgY2FpamlUb29scy5zaG93UG9wdXAodWlOYW1lLmZ1bGxIcFBvcHVwLHRoaXMubm9kZSk7XG4gICAgICAgIGNjLmRpcmVjdG9yLnBhdXNlKCk7XG4gICAgfVxuICAgIGFzeW5jIHNob3dEb3VibGVEYW1hZ2VQb3B1cCgpe1xuICAgICAgICBhd2FpdCBjYWlqaVRvb2xzLnNob3dQb3B1cCh1aU5hbWUuZG91YmxlRGFtYWdlUG9wdXAsdGhpcy5ub2RlKTtcbiAgICAgICAgY2MuZGlyZWN0b3IucGF1c2UoKTtcbiAgICB9XG4gICAgd3VEaSgpe1xuICAgICAgICBpZihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLmlzRGllKSByZXR1cm47XG4gICAgICAgIHRoaXMud3VEaU5vZGUuYWN0aXZlPWZhbHNlO1xuICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLm9wZW5XdURpKDIwKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMud3VEaU5vZGUuYWN0aXZlPXRydWU7XG4gICAgICAgIH0sMTApO1xuICAgIH1cbiAgICBkb3VibGVEYW1hZ2UoKXtcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5pc0RpZSkgcmV0dXJuO1xuICAgICAgICBwbGF5ZXJIcC5pbnN0YW5jZS5kYW1hZ2VTY2FsZSo9MjtcbiAgICAgICAgdGhpcy5kb3VibGVEbWdOb2RlLmFjdGl2ZT1mYWxzZTtcbiAgICB9XG4gICAgZnVsbEhwKCl7XG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuaXNEaWUpIHJldHVybjtcbiAgICAgICAgcGxheWVySHAuaW5zdGFuY2UuZnVsbEhwKCk7XG4gICAgfVxuICAgIHNob3dCb3NzSHAoYm9zc05hbWU6c3RyaW5nKXtcbiAgICAgICAgdGhpcy5ib3NzSHA9dGhpcy5ib3NzSHBOb2RlLmdldENvbXBvbmVudChib3NzSHApO1xuICAgICAgICB0aGlzLmJvc3NIcC5ib3NzTmFtZT1ib3NzTmFtZTtcbiAgICAgICAgdGhpcy5ib3NzSHAuaW5pdCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5ib3NzSHBOb2RlLmFjdGl2ZT10cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbG9hZGluZ1N0YXJ0KGNhbGxCYWNrOkZ1bmN0aW9uKXtcbiAgICAgICAgdGhpcy5sb2FkaW5nTm9kZVN0YXJ0Lng9Y2Mud2luU2l6ZS53aWR0aC8yO1xuICAgICAgICB0aGlzLmxvYWRpbmdOb2RlU3RhcnQud2lkdGg9Y2Mud2luU2l6ZS53aWR0aCsxMDY0O1xuICAgICAgICB0aGlzLmxvYWRpbmdOb2RlU3RhcnQuYWN0aXZlPXRydWU7XG4gICAgICAgIGxldCBtb3ZleD0tdGhpcy5sb2FkaW5nTm9kZVN0YXJ0LndpZHRoKnRoaXMubG9hZGluZ05vZGVTdGFydC5zY2FsZVg7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubG9hZGluZ05vZGVTdGFydClcbiAgICAgICAgLmJ5KDAuNix7eDptb3ZleH0pXG4gICAgICAgIC5jYWxsKCgpPT57XG4gICAgICAgICAgICBjYWxsQmFjaygpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG4gICAgbG9hZGluZ0VuZCgpe1xuICAgICAgICB0aGlzLmxvYWRpbmdOb2RlRW5kLng9LWNjLndpblNpemUud2lkdGgvMjtcbiAgICAgICAgdGhpcy5sb2FkaW5nTm9kZUVuZC53aWR0aD1jYy53aW5TaXplLndpZHRoKzEwNjQ7XG4gICAgICAgIHRoaXMubG9hZGluZ05vZGVFbmQuYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMubG9hZGluZ05vZGVTdGFydC5hY3RpdmU9ZmFsc2U7XG4gICAgICAgIGxldCBtb3ZleD0tdGhpcy5sb2FkaW5nTm9kZUVuZC53aWR0aCpNYXRoLmFicyh0aGlzLmxvYWRpbmdOb2RlRW5kLnNjYWxlWCk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubG9hZGluZ05vZGVFbmQpXG4gICAgICAgIC5ieSgwLjYse3g6bW92ZXh9KVxuICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nTm9kZUVuZC5hY3RpdmU9ZmFsc2U7XG4gICAgICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5zcGF3blBsYXllcigpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG59XG4iXX0=