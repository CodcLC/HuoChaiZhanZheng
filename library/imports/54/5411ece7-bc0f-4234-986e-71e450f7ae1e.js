"use strict";
cc._RF.push(module, '5411eznvA9CNJhuceRQ964e', 'choseLevelPanel');
// scripts/main/choseLevelPanel.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var uiBase_1 = require("../uiBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var choseLevelPanel = /** @class */ (function (_super) {
    __extends(choseLevelPanel, _super);
    function choseLevelPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelItem = null;
        _this.layouts = [];
        _this.levelNum = 100;
        _this.nowPage = 1;
        _this.maxPage = 0;
        return _this;
    }
    choseLevelPanel.prototype.onLoad = function () {
        this.initUi();
    };
    choseLevelPanel.prototype.start = function () {
        this.init();
    };
    choseLevelPanel.prototype.init = function () {
        this.maxPage = Math.ceil(this.levelNum / 8);
        for (var j = 0; j < this.maxPage; j++) {
            var num = (this.levelNum - j * 8) >= 8 ? 8 : this.levelNum - j * 8;
            for (var i = 1; i <= num; i++) {
                var levelItem = cc.instantiate(this.levelItem);
                levelItem.setParent(this.layouts[j]);
                levelItem.name = (i + j * 8).toString();
                levelItem.active = true;
            }
        }
    };
    choseLevelPanel.prototype.next = function () {
        if (this.nowPage == this.maxPage)
            return;
        this.layouts[this.nowPage - 1].active = false;
        this.nowPage++;
        this.layouts[this.nowPage - 1].active = true;
    };
    choseLevelPanel.prototype.last = function () {
        if (this.nowPage == 1)
            return;
        this.layouts[this.nowPage - 1].active = false;
        this.nowPage--;
        this.layouts[this.nowPage - 1].active = true;
    };
    choseLevelPanel.prototype.close = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.Prefab)
    ], choseLevelPanel.prototype, "levelItem", void 0);
    __decorate([
        property(cc.Node)
    ], choseLevelPanel.prototype, "layouts", void 0);
    choseLevelPanel = __decorate([
        ccclass
    ], choseLevelPanel);
    return choseLevelPanel;
}(uiBase_1.default));
exports.default = choseLevelPanel;

cc._RF.pop();