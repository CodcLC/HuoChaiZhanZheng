"use strict";
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