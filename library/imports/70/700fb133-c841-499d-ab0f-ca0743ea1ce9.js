"use strict";
cc._RF.push(module, '700fbEzyEFJnasPygdD6hzp', 'buffPopup');
// scripts/game/ui/buffPopup.ts

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
var export_sdk_1 = require("../../../syyx_sdk/export_sdk");
var ad_1 = require("../../sdk/ad");
var uiBase_1 = require("../../uiBase");
var uiManager_1 = require("./uiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var buffPopup = /** @class */ (function (_super) {
    __extends(buffPopup, _super);
    function buffPopup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.UIType = -1;
        _this.onNewBackHomeClick = true;
        return _this;
    }
    buffPopup_1 = buffPopup;
    buffPopup.prototype.onLoad = function () {
        this.initUi();
    };
    buffPopup.prototype.start = function () {
    };
    buffPopup.prototype.onEnable = function () {
        this.showRet();
    };
    buffPopup.prototype.wudi = function () {
        var _this = this;
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                uiManager_1.default.ins.wuDi();
                _this.close();
            }
        });
    };
    buffPopup.prototype.fullHp = function () {
        var _this = this;
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                uiManager_1.default.ins.fullHp();
                _this.close();
            }
        });
    };
    buffPopup.prototype.doubleDamage = function () {
        var _this = this;
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                cc.log("doubleDamage..........");
                uiManager_1.default.ins.doubleDamage();
                _this.subclose();
            }
        });
    };
    buffPopup.prototype.subclose = function () {
        export_sdk_1.Export.hide_naive_YSAD('YSJS'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
        this.node.destroy();
        cc.director.resume();
    };
    buffPopup.prototype.showRet = function () {
        cc.log("buff popup ....");
        this.onNewBackHomeClick = true;
        buffPopup_1.native_have_show = false;
        var uistr = "Canvas/ui/doubleDamagePopup/fail_parent";
        if (this.UIType == 1) {
            uistr = "Canvas/ui/doubleDamagePopup/fail_parent";
        }
        else if (this.UIType == 2) {
            uistr = "Canvas/ui/fullHpPopup/fail_parent";
        }
        else if (this.UIType == 3) {
            uistr = "Canvas/ui/wuDiPopup/fail_parent";
        }
        cc.find(uistr).setScale(0.5);
        setTimeout(function () {
            export_sdk_1.Export.show_native_YSAD("10302001", uistr, function () { buffPopup_1.native_have_show = true; });
        }, 400);
    };
    buffPopup.prototype.close = function () {
        if (this.onNewBackHomeClick && buffPopup_1.native_have_show) {
            this.onNewBackHomeClick = false;
            export_sdk_1.Export.click_native_YSAD("YSJS"); // 触发ysbn
        }
        else { // 否则回到游戏
            this.onNewBackHomeClick = true;
            buffPopup_1.native_have_show = false;
            this.subclose();
        }
    };
    var buffPopup_1;
    buffPopup.native_have_show = false; // 原生结banner展示
    __decorate([
        property(cc.Integer)
    ], buffPopup.prototype, "UIType", void 0);
    buffPopup = buffPopup_1 = __decorate([
        ccclass
    ], buffPopup);
    return buffPopup;
}(uiBase_1.default));
exports.default = buffPopup;

cc._RF.pop();