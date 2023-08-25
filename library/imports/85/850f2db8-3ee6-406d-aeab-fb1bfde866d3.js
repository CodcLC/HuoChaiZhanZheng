"use strict";
cc._RF.push(module, '850f224PuZAba6r+xv96GbT', 'losePanel');
// scripts/game/ui/losePanel.ts

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
var GameManager_1 = require("../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var losePanel = /** @class */ (function (_super) {
    __extends(losePanel, _super);
    function losePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onNewBackHomeClick = true;
        return _this;
    }
    losePanel_1 = losePanel;
    losePanel.prototype.onLoad = function () {
        this.initUi();
    };
    losePanel.prototype.start = function () {
        // ad.recordEnd();        
    };
    losePanel.prototype.onEnable = function () {
        this.showRet();
    };
    losePanel.prototype.share = function () {
        // ad.recordShare(isok=>{
        //     if(isok){
        //         this.node.destroy();
        //         GameManager.instance.playerController.revive();
        //         ad.record();
        //     }
        // });
        var _this = this;
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                export_sdk_1.Export.hide_naive_YSAD('YSBN'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
                _this.node.destroy();
                GameManager_1.default.instance.playerController.revive();
            }
        });
    };
    losePanel.prototype.subgiveUp = function () {
        cc.Tween.stopAll();
        cc.director.loadScene("main");
    };
    losePanel.prototype.showRet = function () {
        this.onNewBackHomeClick = true;
        losePanel_1.native_have_show = false;
        setTimeout(function () {
            export_sdk_1.Export.show_native_YSAD("10304001", "Canvas/ui/losePanel/fail_parent", function () { losePanel_1.native_have_show = true; });
        }, 400);
    };
    losePanel.prototype.giveUp = function () {
        if (this.onNewBackHomeClick && losePanel_1.native_have_show) {
            this.onNewBackHomeClick = false;
            export_sdk_1.Export.click_native_YSAD("YSBN"); // 触发ysbn
        }
        else { // 否则回到游戏
            this.onNewBackHomeClick = true;
            losePanel_1.native_have_show = false;
            export_sdk_1.Export.hide_naive_YSAD('YSBN'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
            this.subgiveUp();
        }
    };
    var losePanel_1;
    losePanel.native_have_show = false; // 原生结banner展示
    losePanel = losePanel_1 = __decorate([
        ccclass
    ], losePanel);
    return losePanel;
}(uiBase_1.default));
exports.default = losePanel;

cc._RF.pop();