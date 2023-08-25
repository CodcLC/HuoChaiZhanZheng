"use strict";
cc._RF.push(module, '90251wPCgFEt7ps7d8aUEx6', 'uiBase');
// scripts/uiBase.ts

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
exports.bundleName = exports.uiName = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var uiName;
(function (uiName) {
    uiName["choseLevelPanel"] = "choseLevelPanel";
    uiName["losePanel"] = "losePanel";
    uiName["winPanel"] = "winPanel";
    uiName["wuDiPopup"] = "wuDiPopup";
    uiName["fullHpPopup"] = "fullHpPopup";
    uiName["doubleDamagePopup"] = "doubleDamagePopup";
    uiName["pausePanel"] = "pausePanel";
    uiName["upgradePanel"] = "upgradePanel";
    uiName["signInPanel"] = "signPanel";
})(uiName = exports.uiName || (exports.uiName = {}));
var bundleName;
(function (bundleName) {
    bundleName["game"] = "game";
    bundleName["mainUi"] = "mainUi";
    bundleName["sp_enemy"] = "sp_enemy";
    bundleName["sp_others"] = "sp_others";
    bundleName["sp_player"] = "sp_player";
})(bundleName = exports.bundleName || (exports.bundleName = {}));
var uiBase = /** @class */ (function (_super) {
    __extends(uiBase, _super);
    function uiBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    uiBase.prototype.initUi = function () {
        this.node.setContentSize(cc.winSize);
        this.node.children[0].setContentSize(cc.winSize);
    };
    uiBase.prototype.creatBloackInput = function () {
    };
    uiBase = __decorate([
        ccclass
    ], uiBase);
    return uiBase;
}(cc.Component));
exports.default = uiBase;

cc._RF.pop();