
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/GameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '78b34W9Q5dInarRdIRvyQXm', 'GameManager');
// scripts/game/GameManager.ts

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
var audioManager_1 = require("../main/audioManager");
var ad_1 = require("../sdk/ad");
var data_1 = require("../sdk/data");
var coinDrop_1 = require("./coinDrop");
var damageTipPool_1 = require("./damageTipPool");
var Events_1 = require("./Events");
var uiManager_1 = require("./ui/uiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapName;
(function (MapName) {
    MapName[MapName["Map1_bambooForest1"] = 0] = "Map1_bambooForest1";
    MapName[MapName["Map2_bambooForest2"] = 1] = "Map2_bambooForest2";
    MapName[MapName["Map3_OldVillage1"] = 2] = "Map3_OldVillage1";
    MapName[MapName["Map4_OldVillage2"] = 3] = "Map4_OldVillage2";
    MapName[MapName["Map5_OldState1"] = 4] = "Map5_OldState1";
    MapName[MapName["Map6_OldState2"] = 5] = "Map6_OldState2";
})(MapName || (MapName = {}));
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = null;
        _this.player = null;
        _this.playerController = null;
        _this.playerSpawnM = null;
        _this.enemySpawnM = null;
        _this.needKillEnemyAmount = 0;
        _this.killEnemyAmoun = 0;
        _this.dropCoins = [];
        return _this;
    }
    GameManager_1 = GameManager;
    GameManager.prototype.onLoad = function () {
        GameManager_1.instance = this;
        damageTipPool_1.default.instance.init();
        caijiTools_1.caijiTools.openPhysicsSystem(0, false);
    };
    GameManager.prototype.onDisable = function () {
        audioManager_1.default.pauseBgGame();
    };
    GameManager.prototype.start = function () {
        ad_1.ad.record();
        audioManager_1.default.playBgGame();
        this.init();
    };
    GameManager.prototype.init = function () {
        var level = Number(data_1.data.getCache("Base", "choseLevel"));
        var mapIndex = Number(data_1.data.gameJson("levelData", level.toString(), "map"));
        this.loadMap(MapName[mapIndex]);
        Events_1.default.instance.init();
    };
    //计数（击杀怪物）
    GameManager.prototype.killEnemyCount = function () {
        this.killEnemyAmoun++;
        console.log("怪物技术", this.killEnemyAmoun, this.needKillEnemyAmount);
        if (this.killEnemyAmoun == this.needKillEnemyAmount) {
            uiManager_1.default.ins.win();
        }
    };
    GameManager.prototype.pickUpCoin = function () {
        for (var _i = 0, _a = this.dropCoins; _i < _a.length; _i++) {
            var coin = _a[_i];
            coin.getComponent(coinDrop_1.default).startMoveToPlayer();
        }
        this.dropCoins = [];
    };
    GameManager.prototype.loadMap = function (mapName) {
        return __awaiter(this, void 0, void 0, function () {
            var pre;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/maps/" + mapName)];
                    case 1:
                        pre = _a.sent();
                        this.map = caijiTools_1.caijiTools.createNode(pre, this.node.parent);
                        this.map.setSiblingIndex(this.node.getSiblingIndex());
                        uiManager_1.default.ins.loadingEnd();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameManager.prototype.spawnPlayer = function () {
        this.playerSpawnM.spawnPlayer();
    };
    GameManager.prototype.createSpawnEnemy = function (enemyName, parent, position) {
        Events_1.default.instance.createSpawnEnemyEffect(enemyName, parent, position);
    };
    GameManager.prototype.spawnEnemy = function (enemyName, parent, position) {
        Events_1.default.instance.spawnEnemy(enemyName, parent, position);
    };
    GameManager.prototype.levelCompletEvent = function () {
        //解锁当前关下一难度
        var level = Number(data_1.data.getCache("Base", "choseLevel"));
        var difficulty = Number(data_1.data.getCache("levelStar", (level).toString())) + 1;
        difficulty = difficulty > 3 ? 3 : difficulty;
        data_1.data.updateCache("levelStar", level.toString(), difficulty);
        //解锁下一关
        if (level == 100)
            return;
        data_1.data.updateCache("levelUnlock", level.toString(), 1);
    };
    var GameManager_1;
    GameManager.instance = null;
    GameManager = GameManager_1 = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJbEYsNENBQTJDO0FBQzNDLHFEQUFnRDtBQUNoRCxnQ0FBK0I7QUFDL0Isb0NBQW1DO0FBQ25DLHVDQUFrQztBQUNsQyxpREFBNEM7QUFFNUMsbUNBQThCO0FBRzlCLDRDQUF1QztBQUVqQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUMxQyxJQUFLLE9BT0o7QUFQRCxXQUFLLE9BQU87SUFDUixpRUFBa0IsQ0FBQTtJQUNsQixpRUFBa0IsQ0FBQTtJQUNsQiw2REFBZ0IsQ0FBQTtJQUNoQiw2REFBZ0IsQ0FBQTtJQUNoQix5REFBYyxDQUFBO0lBQ2QseURBQWMsQ0FBQTtBQUNsQixDQUFDLEVBUEksT0FBTyxLQUFQLE9BQU8sUUFPWDtBQUVEO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBc0VDO1FBcEVHLFNBQUcsR0FBUyxJQUFJLENBQUM7UUFDakIsWUFBTSxHQUFTLElBQUksQ0FBQztRQUNwQixzQkFBZ0IsR0FBa0IsSUFBSSxDQUFDO1FBQ3ZDLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBQzlCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLHlCQUFtQixHQUFRLENBQUMsQ0FBQztRQUM3QixvQkFBYyxHQUFRLENBQUMsQ0FBQztRQUN4QixlQUFTLEdBQVcsRUFBRSxDQUFDOztJQTZEM0IsQ0FBQztvQkF0RW9CLFdBQVc7SUFXNUIsNEJBQU0sR0FBTjtRQUNJLGFBQVcsQ0FBQyxRQUFRLEdBQUMs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LENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksVUFBVSxHQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7UUFDdkUsVUFBVSxHQUFDLFVBQVUsR0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsVUFBVSxDQUFDO1FBQ3JDLFdBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxPQUFPO1FBQ1AsSUFBRyxLQUFLLElBQUUsR0FBRztZQUFFLE9BQU87UUFDdEIsV0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O0lBM0RNLG9CQUFRLEdBQWEsSUFBSSxDQUFDO0lBVmhCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FzRS9CO0lBQUQsa0JBQUM7Q0F0RUQsQUFzRUMsQ0F0RXdDLEVBQUUsQ0FBQyxTQUFTLEdBc0VwRDtrQkF0RW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgRXhwb3J0IH0gZnJvbSBcIi4uLy4uL3N5eXhfc2RrL2V4cG9ydF9zZGtcIjtcbmltcG9ydCB7IHN5eXhfc2RrX2FwaSB9IGZyb20gXCIuLi8uLi9zeXl4X3Nkay9zeXl4X3Nka19hcGlcIjtcbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vbWFpbi9hdWRpb01hbmFnZXJcIjtcbmltcG9ydCB7IGFkIH0gZnJvbSBcIi4uL3Nkay9hZFwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi9zZGsvZGF0YVwiO1xuaW1wb3J0IGNvaW5Ecm9wIGZyb20gXCIuL2NvaW5Ecm9wXCI7XG5pbXBvcnQgZGFtYWdlVGlwUG9vbCBmcm9tIFwiLi9kYW1hZ2VUaXBQb29sXCI7XG5pbXBvcnQgZW5lbXlTcGF3biBmcm9tIFwiLi9lbmVteVNwYXduXCI7XG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL0V2ZW50c1wiO1xuaW1wb3J0IHBsYXllckNvbnRyb2xsZXIgZnJvbSBcIi4vcGxheWVyQ29udHJvbGxlclwiO1xuaW1wb3J0IHBsYXllclNwYXduIGZyb20gXCIuL3BsYXllclNwYXduXCI7XG5pbXBvcnQgdWlNYW5hZ2VyIGZyb20gXCIuL3VpL3VpTWFuYWdlclwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcbmVudW0gTWFwTmFtZXtcbiAgICBNYXAxX2JhbWJvb0ZvcmVzdDEsXG4gICAgTWFwMl9iYW1ib29Gb3Jlc3QyLFxuICAgIE1hcDNfT2xkVmlsbGFnZTEsXG4gICAgTWFwNF9PbGRWaWxsYWdlMixcbiAgICBNYXA1X09sZFN0YXRlMSxcbiAgICBNYXA2X09sZFN0YXRlMlxufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIG1hcDpjYy5Ob2RlPW51bGw7XG4gICAgcGxheWVyOmNjLk5vZGU9bnVsbDtcbiAgICBwbGF5ZXJDb250cm9sbGVyOnBsYXllckNvbnRyb2xsZXI9bnVsbDtcbiAgICBwbGF5ZXJTcGF3bk06cGxheWVyU3Bhd249bnVsbDtcbiAgICBlbmVteVNwYXduTTplbmVteVNwYXduPW51bGw7XG4gICAgbmVlZEtpbGxFbmVteUFtb3VudDpudW1iZXI9MDtcbiAgICBraWxsRW5lbXlBbW91bjpudW1iZXI9MDtcbiAgICBkcm9wQ29pbnM6Y2MuTm9kZVtdPVtdO1xuICAgIHN0YXRpYyBpbnN0YW5jZTpHYW1lTWFuYWdlcj1udWxsO1xuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlPXRoaXM7XG4gICAgICAgIGRhbWFnZVRpcFBvb2wuaW5zdGFuY2UuaW5pdCgpO1xuICAgICAgICBjYWlqaVRvb2xzLm9wZW5QaHlzaWNzU3lzdGVtKDAsZmFsc2UpOyAgICAgICBcbiAgICB9XG5cbiAgICBvbkRpc2FibGUoKXtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBhdXNlQmdHYW1lKCk7XG4gICAgfVxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgYWQucmVjb3JkKCk7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QmdHYW1lKCk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIGxldCBsZXZlbD1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImNob3NlTGV2ZWxcIikpO1xuICAgICAgICBsZXQgbWFwSW5kZXg9TnVtYmVyKGRhdGEuZ2FtZUpzb24oXCJsZXZlbERhdGFcIixsZXZlbC50b1N0cmluZygpLFwibWFwXCIpKTtcbiAgICAgICAgdGhpcy5sb2FkTWFwKE1hcE5hbWVbbWFwSW5kZXhdKTtcbiAgICAgICAgRXZlbnRzLmluc3RhbmNlLmluaXQoKTtcbiAgICB9XG4gICAgLy/orqHmlbDvvIjlh7vmnYDmgKrnianvvIlcbiAgICBraWxsRW5lbXlDb3VudCgpe1xuICAgICAgICB0aGlzLmtpbGxFbmVteUFtb3VuKys7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5oCq54mp5oqA5pyvXCIsdGhpcy5raWxsRW5lbXlBbW91bix0aGlzLm5lZWRLaWxsRW5lbXlBbW91bnQpXG4gICAgICAgIGlmKHRoaXMua2lsbEVuZW15QW1vdW49PXRoaXMubmVlZEtpbGxFbmVteUFtb3VudCl7XG4gICAgICAgICAgICB1aU1hbmFnZXIuaW5zLndpbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBpY2tVcENvaW4oKXtcbiAgICAgICAgZm9yKGxldCBjb2luIG9mIHRoaXMuZHJvcENvaW5zKXtcbiAgICAgICAgICAgIGNvaW4uZ2V0Q29tcG9uZW50KGNvaW5Ecm9wKS5zdGFydE1vdmVUb1BsYXllcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZHJvcENvaW5zPVtdO1xuICAgIH1cbiAgICBhc3luYyBsb2FkTWFwKG1hcE5hbWU6c3RyaW5nKXtcbiAgICAgICAgbGV0IHByZT1hd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWJzL21hcHMvXCIrbWFwTmFtZSk7XG4gICAgICAgIHRoaXMubWFwPWNhaWppVG9vbHMuY3JlYXRlTm9kZShwcmUsdGhpcy5ub2RlLnBhcmVudCk7XG4gICAgICAgIHRoaXMubWFwLnNldFNpYmxpbmdJbmRleCh0aGlzLm5vZGUuZ2V0U2libGluZ0luZGV4KCkpO1xuICAgICAgICB1aU1hbmFnZXIuaW5zLmxvYWRpbmdFbmQoKTtcbiAgICB9XG4gICAgc3Bhd25QbGF5ZXIoKXtcbiAgICAgICAgdGhpcy5wbGF5ZXJTcGF3bk0uc3Bhd25QbGF5ZXIoKTtcbiAgICB9XG4gICAgY3JlYXRlU3Bhd25FbmVteShlbmVteU5hbWU6c3RyaW5nLHBhcmVudDpjYy5Ob2RlLHBvc2l0aW9uOmNjLlZlYzIpe1xuICAgICAgICBFdmVudHMuaW5zdGFuY2UuY3JlYXRlU3Bhd25FbmVteUVmZmVjdChlbmVteU5hbWUscGFyZW50LHBvc2l0aW9uKTtcbiAgICB9XG4gICAgc3Bhd25FbmVteShlbmVteU5hbWU6c3RyaW5nLHBhcmVudDpjYy5Ob2RlLHBvc2l0aW9uOmNjLlZlYzIpe1xuICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc3Bhd25FbmVteShlbmVteU5hbWUscGFyZW50LHBvc2l0aW9uKTtcbiAgICB9XG4gICAgbGV2ZWxDb21wbGV0RXZlbnQoKXtcbiAgICAgICAgLy/op6PplIHlvZPliY3lhbPkuIvkuIDpmr7luqZcbiAgICAgICAgbGV0IGxldmVsPU51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwiY2hvc2VMZXZlbFwiKSk7XG4gICAgICAgIGxldCBkaWZmaWN1bHR5PU51bWJlcihkYXRhLmdldENhY2hlKFwibGV2ZWxTdGFyXCIsKGxldmVsKS50b1N0cmluZygpKSkrMTtcbiAgICAgICAgZGlmZmljdWx0eT1kaWZmaWN1bHR5PjM/MzpkaWZmaWN1bHR5O1xuICAgICAgICBkYXRhLnVwZGF0ZUNhY2hlKFwibGV2ZWxTdGFyXCIsbGV2ZWwudG9TdHJpbmcoKSxkaWZmaWN1bHR5KTtcbiAgICAgICAgLy/op6PplIHkuIvkuIDlhbNcbiAgICAgICAgaWYobGV2ZWw9PTEwMCkgcmV0dXJuO1xuICAgICAgICBkYXRhLnVwZGF0ZUNhY2hlKFwibGV2ZWxVbmxvY2tcIixsZXZlbC50b1N0cmluZygpLDEpO1xuICAgIH1cbn1cbiJdfQ==