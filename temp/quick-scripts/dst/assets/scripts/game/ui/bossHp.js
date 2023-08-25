
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ui/bossHp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdWlcXGJvc3NIcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLHVDQUFzQztBQUN0QywwQ0FBOEM7QUFFeEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBQ2hCLCtCQUFtQixDQUFBO0lBQ25CLCtCQUFpQixDQUFBO0lBQ2pCLGlDQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFKVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUluQjtBQUVEO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBa0pDO1FBL0lHLFdBQUssR0FBbUIsSUFBSSxDQUFDO1FBRTdCLGNBQVEsR0FBYyxJQUFJLENBQUM7UUFFM0IsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFFNUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixnQkFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixXQUFLLEdBQVEsQ0FBQyxDQUFDO1FBQ2YsY0FBUSxHQUFRLENBQUMsQ0FBQztRQUNsQixjQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFdBQUssR0FBVyxDQUFDLENBQUMsQ0FBQSxPQUFPO1FBQ3pCLFFBQUUsR0FBVyxDQUFDLENBQUMsQ0FBQSxJQUFJO1FBQ25CLGdCQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUEsU0FBUztRQUNoQyxpQkFBVyxHQUFRLEdBQUcsQ0FBQyxDQUFBLFVBQVU7UUFDakMsaUJBQVcsR0FBUyxJQUFJLENBQUMsQ0FBQSxRQUFRO1FBQ2pDLGVBQVMsR0FBUyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBQzNCLGtCQUFZLEdBQVMsS0FBSyxDQUFDO1FBaUczQixz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QUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxFQUFFLENBQUM7SUFDYixDQUFDO0lBQ0QsTUFBTTtJQUNOLDZCQUFZLEdBQVo7SUFFQSxDQUFDO0lBQ0QsNEJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFFLEdBQUcsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFDSywrQkFBYyxHQUFwQixVQUFxQixJQUFJOzs7Ozs0QkFDVixxQkFBTSx1QkFBVSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBcEUsSUFBSSxHQUFHLFNBQTZEO3dCQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQ3JFLElBQUksRUFBRSxDQUFDOzs7OztLQUNWO0lBbkhEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7eUNBQ0k7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FDTztJQUUzQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzhDQUNTO0lBRTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ1E7SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs4Q0FDUztJQVhWLE1BQU07UUFEMUIsT0FBTztPQUNhLE1BQU0sQ0FrSjFCO0lBQUQsYUFBQztDQWxKRCxBQWtKQyxDQWxKbUMsRUFBRSxDQUFDLFNBQVMsR0FrSi9DO2tCQWxKb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi8uLi9zZGsvZGF0YVwiO1xuaW1wb3J0IHsgZW5lbXlBdHRyaWJ1dGUgfSBmcm9tIFwiLi4vZW5lbXlCYXNlXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5leHBvcnQgZW51bSBib3NzTmFtZSB7XG4gICAgZW5lbXkxMCA9IFwiZW5lbXkxMFwiLFxuICAgIGVuZW15Mzk9XCJlbmVteTM5XCIsXG4gICAgbWluaUJvc3M9XCJtaW5pQm9zc1wiXG59XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYm9zc0hwIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBocEJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgaGVhZEljb246IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIGhwTnVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBub3dIcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG5leHRIcE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgaHBNYXg6bnVtYmVyPTA7XG4gICAgYmFyV2lkdGg6bnVtYmVyPTA7XG4gICAgYm9zc05hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgaHBOdW06IG51bWJlciA9IDU7Ly/ooYDmnaHliankvZnph49cbiAgICBocDogbnVtYmVyID0gMDsvL+ihgOmHj1xuICAgIGV2ZXJ5VmFsdWU6IG51bWJlciA9IDA7Ly/mr4/mnaHooYDmnaHnmoTooYDph49cbiAgICBhY2l0b25TcGVlZDpudW1iZXI9MC44Oy8v6KGA5p2h5YmK5YeP5Yqo55S76YCf5bqmXG4gICAgaHBCYXJTaGFkb3c6Y2MuTm9kZT1udWxsOy8v6KGA5p2h5YmK5YeP5b2x5a2QXG4gICAgaHBCYXJOb2RlOmNjLk5vZGU9bnVsbDsvL+ihgOadoVxuICAgIGlzTG9ja0FjdGlvbjpib29sZWFuPWZhbHNlO1xuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5ocEJhclNoYWRvdz10aGlzLm5vd0hwTm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgdGhpcy5ocEJhck5vZGU9dGhpcy5ub3dIcE5vZGUuY2hpbGRyZW5bMV07XG4gICAgfVxuICAgIHVwZGF0ZSgpe1xuICAgICAgICB0aGlzLmhwQmFyU2hhZG93LndpZHRoPWNjLm1pc2MubGVycCh0aGlzLmhwQmFyU2hhZG93LndpZHRoLHRoaXMuaHBCYXJOb2RlLndpZHRoLDAuMDYpO1xuICAgIH1cbiAgICBpbml0KGZ1bmMpIHtcbiAgICAgICAgdGhpcy5iYXJXaWR0aD10aGlzLmhwQmFyLnRvdGFsTGVuZ3RoO1xuICAgICAgICB0aGlzLmhwTWF4ID0gTnVtYmVyKGRhdGEuZ2FtZUpzb24oXCJlbmVteURhdGFcIiwgdGhpcy5ib3NzTmFtZSwgZW5lbXlBdHRyaWJ1dGUuaHApKTtcbiAgICAgICAgdGhpcy5ocD10aGlzLmhwTWF4O1xuICAgICAgICB0aGlzLmhwTnVtID0gNTtcbiAgICAgICAgdGhpcy5ldmVyeVZhbHVlID0gdGhpcy5ocCAvIHRoaXMuaHBOdW07XG4gICAgICAgIHRoaXMudXBkYXRlSHBOdW0oKTtcbiAgICAgICAgdGhpcy51cGRhdGVIZWFkSWNvbihmdW5jKTtcbiAgICAgICAgdGhpcy51cGRhdGVOb3dIcEJhcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5leHRIcEJhcigpO1xuICAgIH1cbiAgICB1cGRhdGVOb3dIcEJhcigpIHtcbiAgICAgICAgdGhpcy5ocEJhci5wcm9ncmVzcz0xO1xuICAgICAgICB0aGlzLm5vd0hwTm9kZS5jaGlsZHJlblswXS53aWR0aD10aGlzLmJhcldpZHRoO1xuICAgICAgICB0aGlzLm5vd0hwTm9kZS5jaGlsZHJlblsxXS53aWR0aD10aGlzLmJhcldpZHRoO1xuICAgICAgICB0aGlzLm5vd0hwTm9kZS5jaGlsZHJlblswXS5jb2xvcj10aGlzLmhwQmFyQ29sb3JbdGhpcy5ocE51bV1bXCJjb2xvclwiXTtcbiAgICAgICAgdGhpcy5ub3dIcE5vZGUuY2hpbGRyZW5bMV0uY29sb3I9dGhpcy5ocEJhckNvbG9yW3RoaXMuaHBOdW1dW1wiY29sb3JEYXJrXCJdO1xuICAgIH1cbiAgICB1cGRhdGVOZXh0SHBCYXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmhwTnVtID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dEhwTm9kZS5jaGlsZHJlblswXS5vcGFjaXR5PTA7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5uZXh0SHBOb2RlLmNoaWxkcmVuWzBdLmNvbG9yPXRoaXMuaHBCYXJDb2xvclt0aGlzLmhwTnVtLTFdW1wiY29sb3JEYXJrXCJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFkZEhwKGFkZFZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgYWRkVmFsdWU9TWF0aC5mbG9vcihhZGRWYWx1ZSk7XG4gICAgICAgIHRoaXMuaHAgKz0gYWRkVmFsdWU7XG4gICAgICAgIGlmKHRoaXMuaHA8PTApe1xuICAgICAgICAgICAgLy/mrbvkuqFcbiAgICAgICAgICAgIHRoaXMuaHBOdW1MYWJlbC5zdHJpbmcgPVwieDBcIjtcbiAgICAgICAgICAgIHRoaXMuaHBCYXJUb1plcm9BY3Rpb24oZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaHA9dGhpcy5ocD50aGlzLmhwTWF4P3RoaXMuaHBNYXg6dGhpcy5ocDtcbiAgICAgICAgaWYodGhpcy5pc0xvY2tBY3Rpb24pIHJldHVybjtcbiAgICAgICAgbGV0IG5vd0hwTnVtPU1hdGguY2VpbCh0aGlzLmhwL3RoaXMuZXZlcnlWYWx1ZSk7XG4gICAgICAgIGlmKG5vd0hwTnVtPHRoaXMuaHBOdW0pe1xuICAgICAgICAgICAgdGhpcy5ocEJhclRvWmVyb0FjdGlvbigpOyBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmhwQmFyQWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy/ov5vlhaXkuIvkuIDooYDmnaFcbiAgICBlbnRlck5leHRIcCgpIHtcbiAgICAgICAgdGhpcy5pc0xvY2tBY3Rpb249ZmFsc2U7XG4gICAgICAgIHRoaXMuaHBOdW0tLTtcbiAgICAgICAgdGhpcy51cGRhdGVIcE51bSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5vd0hwQmFyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTmV4dEhwQmFyKCk7XG4gICAgICAgIHRoaXMuaHBCYXJBY3Rpb24oKTtcbiAgICB9XG4gICAgaHBCYXJBY3Rpb24oKXtcbiAgICAgICAgY2MuVHdlZW4uc3RvcEFsbEJ5VGFyZ2V0KHRoaXMuaHBCYXIpO1xuICAgICAgICBsZXQgbm93UHJvZ3Jlc3M9dGhpcy5ocEJhci5wcm9ncmVzcztcbiAgICAgICAgbGV0IHRvUHJvZ3Jlc3M9KHRoaXMuaHAldGhpcy5ldmVyeVZhbHVlKS90aGlzLmV2ZXJ5VmFsdWU7XG4gICAgICAgIHRvUHJvZ3Jlc3M9dG9Qcm9ncmVzcz09MD8xOnRvUHJvZ3Jlc3M7XG4gICAgICAgIGxldCB0aW1lPShub3dQcm9ncmVzcy10b1Byb2dyZXNzKS90aGlzLmFjaXRvblNwZWVkO1xuICAgICAgICBjYy50d2Vlbih0aGlzLmhwQmFyKVxuICAgICAgICAudG8odGltZSx7cHJvZ3Jlc3M6dG9Qcm9ncmVzc30se2Vhc2luZzpcInF1YWRPdXRcIn0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgIH1cbiAgICBocEJhclRvWmVyb0FjdGlvbihpc0VudGVyTmV4dEhwOmJvb2xlYW49dHJ1ZSl7XG4gICAgICAgIHRoaXMuaXNMb2NrQWN0aW9uPXRydWU7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLmhwQmFyKTtcbiAgICAgICAgbGV0IG5vd1Byb2dyZXNzPXRoaXMuaHBCYXIucHJvZ3Jlc3M7XG4gICAgICAgIGxldCB0aW1lPW5vd1Byb2dyZXNzL3RoaXMuYWNpdG9uU3BlZWQqMC41O1xuICAgICAgICBjYy50d2Vlbih0aGlzLmhwQmFyKVxuICAgICAgICAudG8odGltZSx7cHJvZ3Jlc3M6MH0se2Vhc2luZzpcInF1YWRPdXRcIn0pXG4gICAgICAgIC5jYWxsKCgpPT57XG4gICAgICAgICAgICBpZihpc0VudGVyTmV4dEhwPT1mYWxzZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5lbnRlck5leHRIcCgpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG4gICAgLy/lop7liqDooYDmnaFcbiAgICBpbmNyZXNlSHBOdW0oKXtcblxuICAgIH1cbiAgICB1cGRhdGVIcE51bSgpIHtcbiAgICAgICAgdGhpcy5ocE51bUxhYmVsLnN0cmluZyA9XCJ4XCIrIHRoaXMuaHBOdW0udG9TdHJpbmcoKTtcbiAgICB9XG4gICAgYXN5bmMgdXBkYXRlSGVhZEljb24oZnVuYykge1xuICAgICAgICBsZXQgaWNvbiA9IGF3YWl0IGNhaWppVG9vbHMubG9hZFNwcml0ZUZyYW1lKFwiYm9zc0hlYWQvXCIgKyB0aGlzLmJvc3NOYW1lKTtcbiAgICAgICAgdGhpcy5oZWFkSWNvbi5zcHJpdGVGcmFtZSA9IGljb247XG4gICAgICAgIHRoaXMuaGVhZEljb24ubm9kZS5zZXRQb3NpdGlvbih0aGlzLmhlYWRJY29uUG9zaXRpb25bdGhpcy5ib3NzTmFtZV0pO1xuICAgICAgICBmdW5jKCk7XG4gICAgfVxuICAgIGhlYWRJY29uUG9zaXRpb24gPSB7XG4gICAgICAgIFwiZW5lbXkxMFwiOiBjYy52MigtMTYsIC00Mi41KSxcbiAgICAgICAgXCJlbmVteTM5XCI6IGNjLnYyKC02LCAtNDIuNSksXG4gICAgICAgIFwibWluaUJvc3NcIjogY2MudjIoLTEzLjQsIC02MClcbiAgICB9XG4gICAgaHBCYXJDb2xvcj17XG4gICAgICAgIDU6e1xuICAgICAgICAgICAgY29sb3I6Y2MuY29sb3IoMTU4LCAyNCwgMTk2KSxcbiAgICAgICAgICAgIGNvbG9yRGFyazpjYy5jb2xvcig5OSwgMCwgMTI3KVxuICAgICAgICB9LFxuICAgICAgICA0OntcbiAgICAgICAgICAgIGNvbG9yOmNjLmNvbG9yKDk1LCAxMDgsIDIzNyksXG4gICAgICAgICAgICBjb2xvckRhcms6Y2MuY29sb3IoMCwgMTIsIDEyOSlcbiAgICAgICAgfSxcbiAgICAgICAgMzp7XG4gICAgICAgICAgICBjb2xvcjpjYy5jb2xvcig1MywgMTY4LCA5NCksXG4gICAgICAgICAgICBjb2xvckRhcms6Y2MuY29sb3IoMTgsIDk0LCA0NSlcbiAgICAgICAgfSxcbiAgICAgICAgMjp7XG4gICAgICAgICAgICBjb2xvcjpjYy5jb2xvcigxNTIsIDE0NiwgNDIpLFxuICAgICAgICAgICAgY29sb3JEYXJrOmNjLmNvbG9yKDExMywgMTA4LCAyNylcbiAgICAgICAgfSxcbiAgICAgICAgMTp7XG4gICAgICAgICAgICBjb2xvcjpjYy5jb2xvcigxNzIsIDAsIDI5KSxcbiAgICAgICAgICAgIGNvbG9yRGFyazpjYy5jb2xvcigxMTMsIDAsIDE5KVxuICAgICAgICB9XG4gICAgfVxufVxuIl19