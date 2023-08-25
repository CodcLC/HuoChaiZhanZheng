
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/dontDestroy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZG9udERlc3Ryb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9CQUFvQjtBQUNwQixrRkFBa0Y7QUFDbEYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiw0RkFBNEY7QUFDNUYsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5Qiw0RkFBNEY7QUFDNUYsbUdBQW1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbkcsMkNBQTBDO0FBQzFDLG1DQUFrQztBQUc1QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQXlGQztRQS9FRyxrQkFBWSxHQUFTLElBQUksQ0FBQztRQUMxQixXQUFLLEdBQVcsR0FBRyxDQUFDLENBQUEsUUFBUTtRQUM1QixXQUFLLEdBQVcsQ0FBQyxDQUFDLENBQUEsT0FBTztRQUN6QixjQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUM1QixjQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUUsUUFBUTtRQUMvQixhQUFPLEdBQVksS0FBSyxDQUFDLENBQUEsU0FBUztRQUNsQyxTQUFHLEdBQVcsQ0FBQyxDQUFDO1FBQ2hCLFNBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsaUJBQVcsR0FBQztZQUNSLE1BQU0sRUFBQyxLQUFLO1lBQ1osUUFBUSxFQUFDLEdBQUc7WUFDWixLQUFLLEVBQUMsR0FBRztTQUNaLENBQUE7O0lBbUVMLENBQUM7b0JBekZvQixXQUFXO0lBSTVCLHNCQUFrQix1QkFBUTthQUExQjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFXLENBQUM7YUFDcEM7WUFDRCxPQUFPLElBQUks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QUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBeUYvQjtJQUFELGtCQUFDO0NBekZELEFBeUZDLENBekZ3QyxFQUFFLENBQUMsU0FBUyxHQXlGcEQ7a0JBekZvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuL3Nkay9kYXRhXCI7XG5cblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRvbnREZXN0cm95IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBkb250RGVzdHJveTtcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IGRvbnREZXN0cm95O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICB9XG4gICAgbG9hZGluZ1BhbmVsOmNjLk5vZGU9bnVsbDtcbiAgICB0aW1lczogbnVtYmVyID0gMTIwOy8v5aKe5Yqg5L2T5Yqb6Ze06ZqUXG4gICAgVGltZXI6IG51bWJlciA9IDA7Ly/lvZPliY3lgJLorqHml7ZcbiAgICBub3dQb3dlcjogbnVtYmVyID0gMDsgLy/lvZPliY3kvZPliptcbiAgICBtYXhQb3dlcjogbnVtYmVyID0gNTsgIC8v6Ieq5aKe5L2T5Yqb5LiK6ZmQXG4gICAgaXNUaW1lcjogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5q2j5Zyo5YCS6K6h5pe2XG4gICAgbWluOiBudW1iZXIgPSAwO1xuICAgIHNlYzogbnVtYmVyID0gMDtcbiAgICByYWluQm93RGF0YT17XG4gICAgICAgIGlzdGFydDpmYWxzZSxcbiAgICAgICAgdGltZXJNYXg6MzAwLFxuICAgICAgICB0aW1lcjozMDBcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuVGltZXIgPSB0aGlzLnRpbWVzO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIGxldCB0aW1lID0gZGF0ZS5nZXRUaW1lKCkgLyAxMDAwO1xuICAgICAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcIkJhc2VcIiwgXCJleGl0VGltZVwiLCB0aW1lKTsgIC8v5L+d5a2Y6YCA5Ye65ri45oiP5pe255qE5pe26Ze0XG4gICAgICAgIH0sIDEpO1xuICAgIH1cbiAgICBhc3luYyBnZXRMb2FkaW5nUGFuZWwoKXtcbiAgICAgICAgbGV0IHByZWZhYj1hd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWIvbG9hZGluZ1wiKTtcbiAgICAgICAgZG9udERlc3Ryb3kuaW5zdGFuY2UubG9hZGluZ1BhbmVsPWNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgIGRvbnREZXN0cm95Lmluc3RhbmNlLmxvYWRpbmdQYW5lbC5zZXRQYXJlbnQoY2MuZmluZChcImRvbnREZXN0cm95XCIpKTtcbiAgICAgICAgZG9udERlc3Ryb3kuaW5zdGFuY2UubG9hZGluZ1BhbmVsLnNldFBvc2l0aW9uKGNjLndpblNpemUud2lkdGgvMixjYy53aW5TaXplLmhlaWdodC8yKTtcbiAgICAgICAgZG9udERlc3Ryb3kuaW5zdGFuY2UubG9hZGluZ1BhbmVsLmNoaWxkcmVuWzBdLnNldENvbnRlbnRTaXplKGNjLndpblNpemUpO1xuICAgIH1cbiAgICBjaGVja1Bvd2VySXNGdWxsKCl7XG4gICAgICAgIHRoaXMubm93UG93ZXIgPSBOdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIiwgXCJwb3dlclwiKSk7XG4gICAgICAgIGlmKGRvbnREZXN0cm95Lmluc3RhbmNlLmlzVGltZXI9PWZhbHNlKXtcbiAgICAgICAgICAgIGlmICh0aGlzLm5vd1Bvd2VyIDwgdGhpcy5tYXhQb3dlcikge1xuICAgICAgICAgICAgICAgIGRvbnREZXN0cm95Lmluc3RhbmNlLmlzVGltZXI9dHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ub3dQb3dlciA+PSB0aGlzLm1heFBvd2VyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zY2hlZHVsZUZ1bik7XG4gICAgICAgICAgICBkb250RGVzdHJveS5pbnN0YW5jZS5pc1RpbWVyPWZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXJ0VGltZXIoKSB7XG4gICAgICAgIGRvbnREZXN0cm95Lmluc3RhbmNlLm1pbiA9IDA7XG4gICAgICAgIGRvbnREZXN0cm95Lmluc3RhbmNlLm1pbiA9IDA7XG4gICAgICAgIHRoaXMuVGltZXIgPSB0aGlzLnRpbWVzO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5zY2hlZHVsZUZ1bik7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zY2hlZHVsZUZ1biwgMSwgdGhpcy50aW1lcyk7XG4gICAgfVxuICAgIHNjaGVkdWxlRnVuKCkge1xuICAgICAgICB0aGlzLlRpbWVyID0gdGhpcy5UaW1lciAtIDE7XG4gICAgICAgIGRvbnREZXN0cm95Lmluc3RhbmNlLm1pbiA9IE1hdGguZmxvb3IodGhpcy5UaW1lciAvIDYwKTtcbiAgICAgICAgZG9udERlc3Ryb3kuaW5zdGFuY2Uuc2VjID0gdGhpcy5UaW1lciAlIDYwO1xuICAgICAgICBpZiAodGhpcy5UaW1lciA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm5vd1Bvd2VyKys7XG4gICAgICAgICAgICBkYXRhLnVwZGF0ZUNhY2hlKFwiQmFzZVwiLCBcInBvd2VyXCIsIHRoaXMubm93UG93ZXIpO1xuICAgICAgICAgICAgdGhpcy5UaW1lciA9IHRoaXMudGltZXM7XG4gICAgICAgICAgICBpZiAodGhpcy5ub3dQb3dlciA8IHRoaXMubWF4UG93ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuVGltZXIgPSB0aGlzLnRpbWVzO1xuICAgICAgICAgICAgICAgIGRvbnREZXN0cm95Lmluc3RhbmNlLmlzVGltZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByYWluQm93U2NoZWR1bGUoKXtcbiAgICAgICAgaWYoZG9udERlc3Ryb3kuaW5zdGFuY2UucmFpbkJvd0RhdGEuaXN0YXJ0PT10cnVlKSByZXR1cm47XG4gICAgICAgIGRvbnREZXN0cm95Lmluc3RhbmNlLnJhaW5Cb3dEYXRhLmlzdGFydD10cnVlO1xuICAgICAgICBkb250RGVzdHJveS5pbnN0YW5jZS5yYWluQm93RGF0YS50aW1lcj1kb250RGVzdHJveS5pbnN0YW5jZS5yYWluQm93RGF0YS50aW1lck1heDtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKT0+e1xuICAgICAgICAgICAgZG9udERlc3Ryb3kuaW5zdGFuY2UucmFpbkJvd0RhdGEudGltZXItLTtcbiAgICAgICAgfSwxLGRvbnREZXN0cm95Lmluc3RhbmNlLnJhaW5Cb3dEYXRhLnRpbWVyTWF4LTEpO1xuICAgIH1cbn1cbiJdfQ==