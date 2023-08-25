"use strict";
cc._RF.push(module, '3be00JMHXxD1b56alKm6SDj', 'upgradePanel');
// scripts/main/upgradePanel.ts

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
var ad_1 = require("../sdk/ad");
var data_1 = require("../sdk/data");
var uiBase_1 = require("../uiBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var upgradePanel = /** @class */ (function (_super) {
    __extends(upgradePanel, _super);
    function upgradePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lvLabels = null;
        _this.upgradeBtns = null;
        return _this;
    }
    upgradePanel.prototype.onLoad = function () {
        this.initUi();
    };
    upgradePanel.prototype.start = function () {
        this.init();
    };
    upgradePanel.prototype.init = function () {
        for (var i = 0; i < this.lvLabels.childrenCount; i++) {
            var lv = data_1.data.getCache("attributeLv", this.lvLabels.children[i].name);
            this.lvLabels.children[i].getComponent(cc.Label).string = lv == 10 ? "Max" : "Lv" + lv;
            this.upgradeBtns.children[i].active = lv == 10 ? false : true;
        }
    };
    upgradePanel.prototype.back = function () {
        this.node.destroy();
    };
    upgradePanel.prototype.watchAdUpgrade = function (event) {
        var _this = this;
        var target = event.target;
        var type = target.getComponent(cc.Button).clickEvents[0].customEventData;
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                _this.upgrade(type);
            }
        });
    };
    upgradePanel.prototype.upgrade = function (type) {
        var lv = data_1.data.getCache("attributeLv", type) + 1;
        lv = lv > 10 ? 10 : lv;
        data_1.data.updateCache("attributeLv", type, lv);
        this.init();
    };
    __decorate([
        property(cc.Node)
    ], upgradePanel.prototype, "lvLabels", void 0);
    __decorate([
        property(cc.Node)
    ], upgradePanel.prototype, "upgradeBtns", void 0);
    upgradePanel = __decorate([
        ccclass
    ], upgradePanel);
    return upgradePanel;
}(uiBase_1.default));
exports.default = upgradePanel;

cc._RF.pop();