"use strict";
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