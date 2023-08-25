"use strict";
cc._RF.push(module, '78688IvLOJD5bJjjgJ7Gmkb', 'dontDestroy');
// scripts/dontDestroy.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var caijiTools_1 = require("./caijiTools");
var data_1 = require("./sdk/data");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dontDestroy = /** @class */ (function (_super) {
    __extends(dontDestroy, _super);
    function dontDestroy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingPanel = null;
        _this.times = 120; //增加体力间隔
        _this.Timer = 0; //当前倒计时
        _this.nowPower = 0; //当前体力
        _this.maxPower = 5; //自增体力上限
        _this.isTimer = false; //是否正在倒计时
        _this.min = 0;
        _this.sec = 0;
        _this.rainBowData = {
            istart: false,
            timerMax: 300,
            timer: 300
        };
        return _this;
    }
    dontDestroy_1 = dontDestroy;
    Object.defineProperty(dontDestroy, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new dontDestroy_1;
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    dontDestroy.prototype.onLoad = function () {
        this.Timer = this.times;
    };
    dontDestroy.prototype.start = function () {
        cc.game.addPersistRootNode(this.node);
        this.schedule(function () {
            var date = new Date();
            var time = date.getTime() / 1000;
            data_1.data.updateCache("Base", "exitTime", time); //保存退出游戏时的时间
        }, 1);
    };
    dontDestroy.prototype.getLoadingPanel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefab/loading")];
                    case 1:
                        prefab = _a.sent();
                        dontDestroy_1.instance.loadingPanel = cc.instantiate(prefab);
                        dontDestroy_1.instance.loadingPanel.setParent(cc.find("dontDestroy"));
                        dontDestroy_1.instance.loadingPanel.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                        dontDestroy_1.instance.loadingPanel.children[0].setContentSize(cc.winSize);
                        return [2 /*return*/];
                }
            });
        });
    };
    dontDestroy.prototype.checkPowerIsFull = function () {
        this.nowPower = Number(data_1.data.getCache("Base", "power"));
        if (dontDestroy_1.instance.isTimer == false) {
            if (this.nowPower < this.maxPower) {
                dontDestroy_1.instance.isTimer = true;
                this.startTimer();
            }
            return;
        }
        if (this.nowPower >= this.maxPower) {
            this.unschedule(this.scheduleFun);
            dontDestroy_1.instance.isTimer = false;
        }
    };
    dontDestroy.prototype.startTimer = function () {
        dontDestroy_1.instance.min = 0;
        dontDestroy_1.instance.min = 0;
        this.Timer = this.times;
        this.unschedule(this.scheduleFun);
        this.schedule(this.scheduleFun, 1, this.times);
    };
    dontDestroy.prototype.scheduleFun = function () {
        this.Timer = this.Timer - 1;
        dontDestroy_1.instance.min = Math.floor(this.Timer / 60);
        dontDestroy_1.instance.sec = this.Timer % 60;
        if (this.Timer == 0) {
            this.nowPower++;
            data_1.data.updateCache("Base", "power", this.nowPower);
            this.Timer = this.times;
            if (this.nowPower < this.maxPower) {
                this.startTimer();
            }
            else {
                this.Timer = this.times;
                dontDestroy_1.instance.isTimer = false;
            }
        }
    };
    dontDestroy.prototype.rainBowSchedule = function () {
        if (dontDestroy_1.instance.rainBowData.istart == true)
            return;
        dontDestroy_1.instance.rainBowData.istart = true;
        dontDestroy_1.instance.rainBowData.timer = dontDestroy_1.instance.rainBowData.timerMax;
        this.schedule(function () {
            dontDestroy_1.instance.rainBowData.timer--;
        }, 1, dontDestroy_1.instance.rainBowData.timerMax - 1);
    };
    var dontDestroy_1;
    dontDestroy = dontDestroy_1 = __decorate([
        ccclass
    ], dontDestroy);
    return dontDestroy;
}(cc.Component));
exports.default = dontDestroy;

cc._RF.pop();