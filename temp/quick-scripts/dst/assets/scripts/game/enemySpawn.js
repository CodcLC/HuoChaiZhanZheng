
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/enemySpawn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50b2bcGe+lFubTTFthSithz', 'enemySpawn');
// scripts/game/enemySpawn.ts

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
var data_1 = require("../sdk/data");
var GameManager_1 = require("./GameManager");
var spawnEnemy_1 = require("./spawnEnemy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemySpwanData;
(function (enemySpwanData) {
    enemySpwanData["wave"] = "wave";
    enemySpwanData["amount"] = "amount";
    enemySpwanData["enemyNames"] = "enemyNames";
})(enemySpwanData || (enemySpwanData = {}));
var enemySpawn = /** @class */ (function (_super) {
    __extends(enemySpawn, _super);
    function enemySpawn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nowLevel = 0;
        _this.difficulty = 0;
        _this.levelData = null;
        _this.waveInterval = 0;
        _this.wave = 0;
        _this.amount = 0;
        _this.enemyNames = [];
        _this.spawnEnemyIntervalMin = 0.8;
        _this.spawnEnemyIntervalMax = 1.5;
        _this.hadSpwanWave = 0;
        _this.hadSpwanAmount = 0;
        return _this;
    }
    enemySpawn.prototype.onLoad = function () {
        this.init();
    };
    enemySpawn.prototype.start = function () {
    };
    enemySpawn.prototype.init = function () {
        GameManager_1.default.instance.enemySpawnM = this;
        this.nowLevel = Number(data_1.data.getCache("Base", "choseLevel"));
        this.difficulty = Number(data_1.data.getCache("levelStar", this.nowLevel.toString()));
        this.waveInterval = Number(data_1.data.gameJson("waveInterval"));
        this.levelData = data_1.data.gameJson("levelData", this.nowLevel.toString());
        this.wave = this.levelData["enemySpawn"][enemySpwanData.wave];
        this.amount = this.levelData["enemySpawn"][enemySpwanData.amount];
        this.enemyNames = this.levelData["enemySpawn"][enemySpwanData.enemyNames];
        GameManager_1.default.instance.needKillEnemyAmount = this.wave * this.amount[this.difficulty];
    };
    enemySpawn.prototype.startSpwan = function () {
        var _this = this;
        this.hadSpwanWave++;
        this.hadSpwanAmount = 0;
        this.scheduleSpawn();
        if (this.hadSpwanWave < this.wave) {
            this.scheduleOnce(function () {
                _this.startSpwan();
            }, this.waveInterval + this.amount[this.difficulty] * 1.5);
        }
    };
    enemySpawn.prototype.scheduleSpawn = function () {
        var _this = this;
        this.hadSpwanAmount++;
        console.log(this.hadSpwanAmount, this.hadSpwanWave, this.wave);
        var name = this.enemyNames[caijiTools_1.caijiTools.random_int(0, this.enemyNames.length - 1)];
        this.scheduleOnce(function () {
            _this.spawnEnemy(name);
            if (_this.hadSpwanAmount < _this.amount[_this.difficulty]) {
                _this.scheduleSpawn();
            }
        }, caijiTools_1.caijiTools.random_int(50, 120) / 100);
    };
    enemySpawn.prototype.spawnEnemy = function (enemyName) {
        return __awaiter(this, void 0, void 0, function () {
            var pre, spwanEffect, x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/spawnEnemy")];
                    case 1:
                        pre = _a.sent();
                        spwanEffect = caijiTools_1.caijiTools.createNode(pre, this.node, false);
                        spwanEffect.setSiblingIndex(GameManager_1.default.instance.player.getSiblingIndex());
                        spwanEffect.getComponent(spawnEnemy_1.default).spawnEnemyName = enemyName;
                        x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width / 2, cc.winSize.width / 2);
                        if (x < -300) {
                            x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(0, cc.winSize.width / 2);
                        }
                        else if (x > 1600) {
                            x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width / 2, 0);
                        }
                        spwanEffect.setPosition(x, -177);
                        spwanEffect.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    enemySpawn = __decorate([
        ccclass
    ], enemySpawn);
    return enemySpawn;
}(cc.Component));
exports.default = enemySpawn;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZW5lbXlTcGF3bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw0Q0FBMkM7QUFDM0Msb0NBQW1DO0FBQ25DLDZDQUF3QztBQUN4QywyQ0FBc0M7QUFFaEMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsSUFBSyxjQUlKO0FBSkQsV0FBSyxjQUFjO0lBQ2YsK0JBQVcsQ0FBQTtJQUNYLG1DQUFlLENBQUE7SUFDZiwyQ0FBdUIsQ0FBQTtBQUMzQixDQUFDLEVBSkksY0FBYyxLQUFkLGNBQWMsUUFJbEI7QUFFRDtJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQW1FQztRQWpFRyxjQUFRLEdBQVEsQ0FBQyxDQUFDO1FBQ2xCLGdCQUFVLEdBQVEsQ0FBQyxDQUFDO1FBQ3BCLGVBQVMsR0FBSyxJQUFJLENBQUM7UUFDbkIsa0JBQVksR0FBUSxDQUFDLENBQUM7UUFDdEIsVUFBSSxHQUFRLENBQUMsQ0FBQztRQUNkLFlBQU0sR0FBUSxDQUFDLENBQUM7UUFDaEIsZ0JBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIsMkJBQXFCLEdBQVEsR0FBRyxDQUFDO1FBQ2pDLDJCQUFxQixHQUFRLEdBQUcsQ0FBQztRQUVqQyxrQkFBWSxHQUFRLENBQUMsQ0FBQztRQUN0QixvQkFBYyxHQUFRLENBQUMsQ0FBQzs7SUFzRDVCLENBQUM7SUFyREcsMkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsMEJBQUssR0FBTDtJQUNBLENBQUM7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QW1FQyxDQW5FdUMsRUFBRSxDQUFDLFNBQVMsR0FtRW5EO2tCQW5Fb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCB7IGRhdGEgfSBmcm9tIFwiLi4vc2RrL2RhdGFcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHNwYXduRW5lbXkgZnJvbSBcIi4vc3Bhd25FbmVteVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuZW51bSBlbmVteVNwd2FuRGF0YXtcbiAgICB3YXZlPVwid2F2ZVwiLFxuICAgIGFtb3VudD1cImFtb3VudFwiLFxuICAgIGVuZW15TmFtZXM9XCJlbmVteU5hbWVzXCJcbn1cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlbmVteVNwYXduIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIG5vd0xldmVsOm51bWJlcj0wO1xuICAgIGRpZmZpY3VsdHk6bnVtYmVyPTA7XG4gICAgbGV2ZWxEYXRhOmFueT1udWxsO1xuICAgIHdhdmVJbnRlcnZhbDpudW1iZXI9MDtcbiAgICB3YXZlOm51bWJlcj0wO1xuICAgIGFtb3VudDpudW1iZXI9MDtcbiAgICBlbmVteU5hbWVzOnN0cmluZ1tdPVtdO1xuICAgIHNwYXduRW5lbXlJbnRlcnZhbE1pbjpudW1iZXI9MC44O1xuICAgIHNwYXduRW5lbXlJbnRlcnZhbE1heDpudW1iZXI9MS41O1xuXG4gICAgaGFkU3B3YW5XYXZlOm51bWJlcj0wO1xuICAgIGhhZFNwd2FuQW1vdW50Om51bWJlcj0wO1xuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICB9XG4gICAgaW5pdCgpe1xuICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5lbmVteVNwYXduTT10aGlzO1xuICAgICAgICB0aGlzLm5vd0xldmVsPU51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwiY2hvc2VMZXZlbFwiKSk7XG4gICAgICAgIHRoaXMuZGlmZmljdWx0eT1OdW1iZXIoZGF0YS5nZXRDYWNoZShcImxldmVsU3RhclwiLHRoaXMubm93TGV2ZWwudG9TdHJpbmcoKSkpO1xuICAgICAgICB0aGlzLndhdmVJbnRlcnZhbD1OdW1iZXIoZGF0YS5nYW1lSnNvbihcIndhdmVJbnRlcnZhbFwiKSk7XG4gICAgICAgIHRoaXMubGV2ZWxEYXRhPWRhdGEuZ2FtZUpzb24oXCJsZXZlbERhdGFcIix0aGlzLm5vd0xldmVsLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLndhdmU9dGhpcy5sZXZlbERhdGFbXCJlbmVteVNwYXduXCJdW2VuZW15U3B3YW5EYXRhLndhdmVdO1xuICAgICAgICB0aGlzLmFtb3VudD10aGlzLmxldmVsRGF0YVtcImVuZW15U3Bhd25cIl1bZW5lbXlTcHdhbkRhdGEuYW1vdW50XTtcbiAgICAgICAgdGhpcy5lbmVteU5hbWVzPXRoaXMubGV2ZWxEYXRhW1wiZW5lbXlTcGF3blwiXVtlbmVteVNwd2FuRGF0YS5lbmVteU5hbWVzXTtcbiAgICAgICAgR2FtZU1hbmFnZXIuaW5zdGFuY2UubmVlZEtpbGxFbmVteUFtb3VudD10aGlzLndhdmUqdGhpcy5hbW91bnRbdGhpcy5kaWZmaWN1bHR5XTtcbiAgICB9XG4gICAgc3RhcnRTcHdhbigpe1xuICAgICAgICB0aGlzLmhhZFNwd2FuV2F2ZSsrO1xuICAgICAgICB0aGlzLmhhZFNwd2FuQW1vdW50PTA7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVTcGF3bigpO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5oYWRTcHdhbldhdmU8dGhpcy53YXZlKXtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFNwd2FuKCk7XG4gICAgICAgICAgICB9LHRoaXMud2F2ZUludGVydmFsK3RoaXMuYW1vdW50W3RoaXMuZGlmZmljdWx0eV0qMS41KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzY2hlZHVsZVNwYXduKCl7XG4gICAgICAgIHRoaXMuaGFkU3B3YW5BbW91bnQrKztcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5oYWRTcHdhbkFtb3VudCx0aGlzLmhhZFNwd2FuV2F2ZSx0aGlzLndhdmUpXG4gICAgICAgIGxldCBuYW1lPXRoaXMuZW5lbXlOYW1lc1tjYWlqaVRvb2xzLnJhbmRvbV9pbnQoMCx0aGlzLmVuZW15TmFtZXMubGVuZ3RoLTEpXTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMuc3Bhd25FbmVteShuYW1lKTtcbiAgICAgICAgICAgIGlmKHRoaXMuaGFkU3B3YW5BbW91bnQ8dGhpcy5hbW91bnRbdGhpcy5kaWZmaWN1bHR5XSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVNwYXduKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sY2FpamlUb29scy5yYW5kb21faW50KDUwLDEyMCkvMTAwKTtcbiAgICB9XG4gICAgYXN5bmMgc3Bhd25FbmVteShlbmVteU5hbWU6c3RyaW5nKXtcbiAgICAgICAgbGV0IHByZT1hd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWJzL3NwYXduRW5lbXlcIik7XG4gICAgICAgIGxldCBzcHdhbkVmZmVjdD1jYWlqaVRvb2xzLmNyZWF0ZU5vZGUocHJlLHRoaXMubm9kZSxmYWxzZSk7XG4gICAgICAgIHNwd2FuRWZmZWN0LnNldFNpYmxpbmdJbmRleChHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIuZ2V0U2libGluZ0luZGV4KCkpO1xuICAgICAgICBzcHdhbkVmZmVjdC5nZXRDb21wb25lbnQoc3Bhd25FbmVteSkuc3Bhd25FbmVteU5hbWU9ZW5lbXlOYW1lO1xuICAgICAgICBsZXQgeD1HYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCtjYWlqaVRvb2xzLnJhbmRvbV9pbnQoLWNjLndpblNpemUud2lkdGgvMixjYy53aW5TaXplLndpZHRoLzIpO1xuICAgICAgICBpZih4PC0zMDApe1xuICAgICAgICAgICAgeD1HYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCtjYWlqaVRvb2xzLnJhbmRvbV9pbnQoMCxjYy53aW5TaXplLndpZHRoLzIpO1xuICAgICAgICB9ZWxzZSBpZih4PjE2MDApe1xuICAgICAgICAgICAgeD1HYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCtjYWlqaVRvb2xzLnJhbmRvbV9pbnQoLWNjLndpblNpemUud2lkdGgvMiwwKTtcbiAgICAgICAgfVxuICAgICAgICBzcHdhbkVmZmVjdC5zZXRQb3NpdGlvbih4LC0xNzcpO1xuICAgICAgICBzcHdhbkVmZmVjdC5hY3RpdmU9dHJ1ZTtcbiAgICB9XG59XG4iXX0=