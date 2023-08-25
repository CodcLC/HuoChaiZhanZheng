"use strict";
cc._RF.push(module, '42340IEHFFFwa5Q6nUxcL07', 'levelItem');
// scripts/main/levelItem.ts

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
var mainMenu_1 = require("./mainMenu");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var levelItem = /** @class */ (function (_super) {
    __extends(levelItem, _super);
    function levelItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starSpr = null;
        _this.levelSpr = null;
        _this.levellab = null;
        _this.level = 0;
        return _this;
    }
    // onLoad () {}
    levelItem.prototype.start = function () {
        this.init();
    };
    levelItem.prototype.init = function () {
        this.level = Number(this.node.name);
        var isUnlock = data_1.data.getCache("levelUnlock")[this.level - 1];
        this.node.getComponent(cc.Button).interactable = isUnlock;
        this.node.getChildByName("lock").active = !isUnlock;
        this.updateLevel();
        this.updateStar();
    };
    levelItem.prototype.updateLevel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var spr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadSpriteFrame("choseLevel/level" + this.node.name)];
                    case 1:
                        spr = _a.sent();
                        this.levelSpr.getComponent(cc.Sprite).spriteFrame = spr;
                        this.levellab.string = this.toChinesNum(this.level);
                        return [2 /*return*/];
                }
            });
        });
    };
    levelItem.prototype.toChinesNum = function (num) {
        var changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        var unit = ['', '十', '百', '千', '万'];
        num = parseInt(num);
        var getWan = function (temp) {
            var strArr = temp.toString().split('').reverse();
            var newNum = '';
            var newArr = [];
            strArr.forEach(function (item, index) {
                newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index]);
            });
            var numArr = [];
            newArr.forEach(function (m, n) {
                if (m !== '零')
                    numArr.push(n);
            });
            if (newArr.length > 1) {
                newArr.forEach(function (m, n) {
                    if (newArr[newArr.length - 1] === '零') {
                        if (n <= numArr[numArr.length - 1]) {
                            newNum += m;
                        }
                    }
                    else {
                        newNum += m;
                    }
                });
            }
            else {
                newNum = newArr[0];
            }
            return newNum;
        };
        var overWan = Math.floor(num / 10000);
        var noWan = num % 10000;
        // if (noWan.toString().length < 4) {
        //   noWan = '0' + noWan
        // }
        return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
    };
    levelItem.prototype.updateStar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var diff, spr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        diff = data_1.data.getCache("levelStar")[this.level];
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadSpriteFrame("choseLevel/star" + diff)];
                    case 1:
                        spr = _a.sent();
                        this.starSpr.getComponent(cc.Sprite).spriteFrame = spr;
                        return [2 /*return*/];
                }
            });
        });
    };
    levelItem.prototype.chose = function (event) {
        data_1.data.updateCache("Base", "choseLevel", this.node.name);
        mainMenu_1.default.ins.maskAction_go();
    };
    __decorate([
        property(cc.Sprite)
    ], levelItem.prototype, "starSpr", void 0);
    __decorate([
        property(cc.Sprite)
    ], levelItem.prototype, "levelSpr", void 0);
    __decorate([
        property(cc.Label)
    ], levelItem.prototype, "levellab", void 0);
    levelItem = __decorate([
        ccclass
    ], levelItem);
    return levelItem;
}(cc.Component));
exports.default = levelItem;

cc._RF.pop();