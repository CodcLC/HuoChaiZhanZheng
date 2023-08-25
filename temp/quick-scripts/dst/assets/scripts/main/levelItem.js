
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/main/levelItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFpblxcbGV2ZWxJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDRDQUEyQztBQUMzQyxvQ0FBbUM7QUFFbkMsdUNBQWtDO0FBRzVCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBb0ZDO1FBakZHLGFBQU8sR0FBVyxJQUFJLENBQUM7UUFFdkIsY0FBUSxHQUFXLElBQUksQ0FBQztRQUd4QixjQUFRLEdBQVUsSUFBSSxDQUFDO1FBRXZCLFdBQUssR0FBUSxDQUFDLENBQUM7O0lBMEVuQixDQUFDO0lBekVHLGVBQWU7SUFFZix5QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx3QkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLFFBQVEsR0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksR0FBRSxRQUFRLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsUUFBUSxDQUFDO1FB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QU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBSVEsOEJBQVUsR0FBaEI7Ozs7Ozt3QkFDUSxJQUFJLEdBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRXhDLHFCQUFNLHVCQUFVLENBQUMsZUFBZSxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxFQUFBOzt3QkFBNUQsR0FBRyxHQUFDLFNBQXdEO3dCQUVoRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFDLEdBQUcsQ0FBQzs7Ozs7S0FDeEQ7SUFDRCx5QkFBSyxHQUFMLFVBQU0sS0FBYztRQUNoQixXQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBaEZEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OENBQ0c7SUFFdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDSTtJQUd4QjtRQURGLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNPO0lBUk4sU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQW9GN0I7SUFBRCxnQkFBQztDQXBGRCxBQW9GQyxDQXBGc0MsRUFBRSxDQUFDLFNBQVMsR0FvRmxEO2tCQXBGb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCB7IGRhdGEgfSBmcm9tIFwiLi4vc2RrL2RhdGFcIjtcbmltcG9ydCB7IGJ1bmRsZU5hbWUgfSBmcm9tIFwiLi4vdWlCYXNlXCI7XG5pbXBvcnQgbWFpbk1lbnUgZnJvbSBcIi4vbWFpbk1lbnVcIjtcblxuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxldmVsSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHN0YXJTcHI6Y2MuU3ByaXRlPW51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBsZXZlbFNwcjpjYy5TcHJpdGU9bnVsbDtcblx0XG5cdEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsZXZlbGxhYjpjYy5MYWJlbD1udWxsO1xuXHRcbiAgICBsZXZlbDpudW1iZXI9MDtcbiAgICAvLyBvbkxvYWQgKCkge31cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKXtcbiAgICAgICAgdGhpcy5sZXZlbD1OdW1iZXIodGhpcy5ub2RlLm5hbWUpO1xuICAgICAgICBsZXQgaXNVbmxvY2s9ZGF0YS5nZXRDYWNoZShcImxldmVsVW5sb2NrXCIpW3RoaXMubGV2ZWwtMV07XG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5pbnRlcmFjdGFibGU9IGlzVW5sb2NrO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2NrXCIpLmFjdGl2ZT0haXNVbmxvY2s7XG4gICAgICAgIHRoaXMudXBkYXRlTGV2ZWwoKTtcbiAgICAgICAgdGhpcy51cGRhdGVTdGFyKCk7XG4gICAgfVxuICAgIGFzeW5jIHVwZGF0ZUxldmVsKCl7XG4gICAgICAgIC8vIGxldCBzcHI9YXdhaXQgY2FpamlUb29scy5sb2FkU3ByaXRlRnJhbWVCdW5kbGUoYnVuZGxlTmFtZS5tYWluVWksXCJjaG9zZUxldmVsL2xldmVsXCIrdGhpcy5ub2RlLm5hbWUpO1xuICAgICAgICBsZXQgc3ByPWF3YWl0IGNhaWppVG9vbHMubG9hZFNwcml0ZUZyYW1lKFwiY2hvc2VMZXZlbC9sZXZlbFwiK3RoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgdGhpcy5sZXZlbFNwci5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zcHI7XG5cdFx0dGhpcy5sZXZlbGxhYi5zdHJpbmcgPSB0aGlzLnRvQ2hpbmVzTnVtKHRoaXMubGV2ZWwpXG4gICAgfVxuXHRcblx0XG5cdHRvQ2hpbmVzTnVtKG51bSkge1xuICAgICAgbGV0IGNoYW5nZU51bSA9IFsn6Zu2JywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJywgJ+S4gycsICflhasnLCAn5LmdJ11cbiAgICAgIGxldCB1bml0ID0gWycnLCAn5Y2BJywgJ+eZvicsICfljYMnLCAn5LiHJ11cbiAgICAgIG51bSA9IHBhcnNlSW50KG51bSlcbiAgICAgIGxldCBnZXRXYW4gPSAodGVtcCkgPT4ge1xuICAgICAgICBsZXQgc3RyQXJyID0gdGVtcC50b1N0cmluZygpLnNwbGl0KCcnKS5yZXZlcnNlKClcbiAgICAgICAgbGV0IG5ld051bSA9ICcnXG4gICAgICAgIGxldCBuZXdBcnIgPSBbXVxuICAgICAgICBzdHJBcnIuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBuZXdBcnIudW5zaGlmdChpdGVtID09PSAnMCcgPyBjaGFuZ2VOdW1baXRlbV0gOiBjaGFuZ2VOdW1baXRlbV0gKyB1bml0W2luZGV4XSlcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IG51bUFyciA9IFtdXG4gICAgICAgIG5ld0Fyci5mb3JFYWNoKChtLCBuKSA9PiB7XG4gICAgICAgICAgaWYgKG0gIT09ICfpm7YnKSBudW1BcnIucHVzaChuKVxuICAgICAgICB9KVxuICAgICAgICBpZiAobmV3QXJyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBuZXdBcnIuZm9yRWFjaCgobSwgbikgPT4ge1xuICAgICAgICAgICAgaWYgKG5ld0FycltuZXdBcnIubGVuZ3RoIC0gMV0gPT09ICfpm7YnKSB7XG4gICAgICAgICAgICAgIGlmIChuIDw9IG51bUFycltudW1BcnIubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgICAgICBuZXdOdW0gKz0gbVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdOdW0gKz0gbVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3TnVtID0gbmV3QXJyWzBdXG4gICAgICAgIH1cbiBcbiAgICAgICAgcmV0dXJuIG5ld051bVxuICAgICAgfVxuICAgICAgbGV0IG92ZXJXYW4gPSBNYXRoLmZsb29yKG51bSAvIDEwMDAwKVxuICAgICAgbGV0IG5vV2FuID0gbnVtICUgMTAwMDBcbiAgICAgIC8vIGlmIChub1dhbi50b1N0cmluZygpLmxlbmd0aCA8IDQpIHtcbiAgICAgIC8vICAgbm9XYW4gPSAnMCcgKyBub1dhblxuICAgICAgLy8gfVxuICAgICAgcmV0dXJuIG92ZXJXYW4gPyBnZXRXYW4ob3ZlcldhbikgKyAn5LiHJyArIGdldFdhbihub1dhbikgOiBnZXRXYW4obnVtKVxuXHR9XG5cblx0XG5cdFxuICAgIGFzeW5jIHVwZGF0ZVN0YXIoKXtcbiAgICAgICAgbGV0IGRpZmY9ZGF0YS5nZXRDYWNoZShcImxldmVsU3RhclwiKVt0aGlzLmxldmVsXTtcbiAgICAgICAgLy8gbGV0IHNwcj1hd2FpdCBjYWlqaVRvb2xzLmxvYWRTcHJpdGVGcmFtZUJ1bmRsZShidW5kbGVOYW1lLm1haW5VaSxcImNob3NlTGV2ZWwvc3RhclwiK2RpZmYpO1xuICAgICAgICBsZXQgc3ByPWF3YWl0IGNhaWppVG9vbHMubG9hZFNwcml0ZUZyYW1lKFwiY2hvc2VMZXZlbC9zdGFyXCIrZGlmZik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnN0YXJTcHIuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9c3ByO1xuICAgIH1cbiAgICBjaG9zZShldmVudDpjYy5FdmVudCl7XG4gICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJCYXNlXCIsXCJjaG9zZUxldmVsXCIsdGhpcy5ub2RlLm5hbWUpO1xuICAgICAgICBtYWluTWVudS5pbnMubWFza0FjdGlvbl9nbygpO1xuICAgIH1cbn1cbiJdfQ==