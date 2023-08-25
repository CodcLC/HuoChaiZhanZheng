"use strict";
cc._RF.push(module, 'f162fRFpUVC35TR9UWfJWgb', 'bossHp');
// scripts/game/ui/bossHp.ts

"use strict";
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
exports.bossName = void 0;
var caijiTools_1 = require("../../caijiTools");
var data_1 = require("../../sdk/data");
var enemyBase_1 = require("../enemyBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var bossName;
(function (bossName) {
    bossName["enemy10"] = "enemy10";
    bossName["enemy39"] = "enemy39";
    bossName["miniBoss"] = "miniBoss";
})(bossName = exports.bossName || (exports.bossName = {}));
var bossHp = /** @class */ (function (_super) {
    __extends(bossHp, _super);
    function bossHp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpBar = null;
        _this.headIcon = null;
        _this.hpNumLabel = null;
        _this.nowHpNode = null;
        _this.nextHpNode = null;
        _this.hpMax = 0;
        _this.barWidth = 0;
        _this.bossName = "";
        _this.hpNum = 5; //血条剩余量
        _this.hp = 0; //血量
        _this.everyValue = 0; //每条血条的血量
        _this.acitonSpeed = 0.8; //血条削减动画速度
        _this.hpBarShadow = null; //血条削减影子
        _this.hpBarNode = null; //血条
        _this.isLockAction = false;
        _this.headIconPosition = {
            "enemy10": cc.v2(-16, -42.5),
            "enemy39": cc.v2(-6, -42.5),
            "miniBoss": cc.v2(-13.4, -60)
        };
        _this.hpBarColor = {
            5: {
                color: cc.color(158, 24, 196),
                colorDark: cc.color(99, 0, 127)
            },
            4: {
                color: cc.color(95, 108, 237),
                colorDark: cc.color(0, 12, 129)
            },
            3: {
                color: cc.color(53, 168, 94),
                colorDark: cc.color(18, 94, 45)
            },
            2: {
                color: cc.color(152, 146, 42),
                colorDark: cc.color(113, 108, 27)
            },
            1: {
                color: cc.color(172, 0, 29),
                colorDark: cc.color(113, 0, 19)
            }
        };
        return _this;
    }
    bossHp.prototype.onLoad = function () {
        this.hpBarShadow = this.nowHpNode.children[0];
        this.hpBarNode = this.nowHpNode.children[1];
    };
    bossHp.prototype.update = function () {
        this.hpBarShadow.width = cc.misc.lerp(this.hpBarShadow.width, this.hpBarNode.width, 0.06);
    };
    bossHp.prototype.init = function (func) {
        this.barWidth = this.hpBar.totalLength;
        this.hpMax = Number(data_1.data.gameJson("enemyData", this.bossName, enemyBase_1.enemyAttribute.hp));
        this.hp = this.hpMax;
        this.hpNum = 5;
        this.everyValue = this.hp / this.hpNum;
        this.updateHpNum();
        this.updateHeadIcon(func);
        this.updateNowHpBar();
        this.updateNextHpBar();
    };
    bossHp.prototype.updateNowHpBar = function () {
        this.hpBar.progress = 1;
        this.nowHpNode.children[0].width = this.barWidth;
        this.nowHpNode.children[1].width = this.barWidth;
        this.nowHpNode.children[0].color = this.hpBarColor[this.hpNum]["color"];
        this.nowHpNode.children[1].color = this.hpBarColor[this.hpNum]["colorDark"];
    };
    bossHp.prototype.updateNextHpBar = function () {
        if (this.hpNum == 1) {
            this.nextHpNode.children[0].opacity = 0;
        }
        else {
            this.nextHpNode.children[0].color = this.hpBarColor[this.hpNum - 1]["colorDark"];
        }
    };
    bossHp.prototype.addHp = function (addValue) {
        addValue = Math.floor(addValue);
        this.hp += addValue;
        if (this.hp <= 0) {
            //死亡
            this.hpNumLabel.string = "x0";
            this.hpBarToZeroAction(false);
            return;
        }
        this.hp = this.hp > this.hpMax ? this.hpMax : this.hp;
        if (this.isLockAction)
            return;
        var nowHpNum = Math.ceil(this.hp / this.everyValue);
        if (nowHpNum < this.hpNum) {
            this.hpBarToZeroAction();
        }
        else {
            this.hpBarAction();
        }
    };
    //进入下一血条
    bossHp.prototype.enterNextHp = function () {
        this.isLockAction = false;
        this.hpNum--;
        this.updateHpNum();
        this.updateNowHpBar();
        this.updateNextHpBar();
        this.hpBarAction();
    };
    bossHp.prototype.hpBarAction = function () {
        cc.Tween.stopAllByTarget(this.hpBar);
        var nowProgress = this.hpBar.progress;
        var toProgress = (this.hp % this.everyValue) / this.everyValue;
        toProgress = toProgress == 0 ? 1 : toProgress;
        var time = (nowProgress - toProgress) / this.acitonSpeed;
        cc.tween(this.hpBar)
            .to(time, { progress: toProgress }, { easing: "quadOut" })
            .start();
    };
    bossHp.prototype.hpBarToZeroAction = function (isEnterNextHp) {
        var _this = this;
        if (isEnterNextHp === void 0) { isEnterNextHp = true; }
        this.isLockAction = true;
        cc.Tween.stopAllByTarget(this.hpBar);
        var nowProgress = this.hpBar.progress;
        var time = nowProgress / this.acitonSpeed * 0.5;
        cc.tween(this.hpBar)
            .to(time, { progress: 0 }, { easing: "quadOut" })
            .call(function () {
            if (isEnterNextHp == false)
                return;
            _this.enterNextHp();
        })
            .start();
    };
    //增加血条
    bossHp.prototype.increseHpNum = function () {
    };
    bossHp.prototype.updateHpNum = function () {
        this.hpNumLabel.string = "x" + this.hpNum.toString();
    };
    bossHp.prototype.updateHeadIcon = function (func) {
        return __awaiter(this, void 0, void 0, function () {
            var icon;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadSpriteFrame("bossHead/" + this.bossName)];
                    case 1:
                        icon = _a.sent();
                        this.headIcon.spriteFrame = icon;
                        this.headIcon.node.setPosition(this.headIconPosition[this.bossName]);
                        func();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.ProgressBar)
    ], bossHp.prototype, "hpBar", void 0);
    __decorate([
        property(cc.Sprite)
    ], bossHp.prototype, "headIcon", void 0);
    __decorate([
        property(cc.Label)
    ], bossHp.prototype, "hpNumLabel", void 0);
    __decorate([
        property(cc.Node)
    ], bossHp.prototype, "nowHpNode", void 0);
    __decorate([
        property(cc.Node)
    ], bossHp.prototype, "nextHpNode", void 0);
    bossHp = __decorate([
        ccclass
    ], bossHp);
    return bossHp;
}(cc.Component));
exports.default = bossHp;

cc._RF.pop();