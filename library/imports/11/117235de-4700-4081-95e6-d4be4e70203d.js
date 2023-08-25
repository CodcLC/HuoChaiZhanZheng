"use strict";
cc._RF.push(module, '11723XeRwBAgZXm1L5OcCA9', 'mainMenu');
// scripts/main/mainMenu.ts

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
var export_sdk_1 = require("../../syyx_sdk/export_sdk");
var syyx_sdk_api_1 = require("../../syyx_sdk/syyx_sdk_api");
var Msg_1 = require("../Msg");
var UIPrivacy_1 = require("../UIPrivacy");
var audioNameMgr_1 = require("../audioNameMgr");
var caijiTools_1 = require("../caijiTools");
var ad_1 = require("../sdk/ad");
var data_1 = require("../sdk/data");
var uiBase_1 = require("../uiBase");
var UiSign_1 = require("./UiSign");
var audioManager_1 = require("./audioManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var mainMenu = /** @class */ (function (_super) {
    __extends(mainMenu, _super);
    function mainMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mask_go = null;
        _this.mask_enter = null;
        _this.coinLabel = null;
        _this.BtnDesktop = null;
        _this.onNewBackHomeClick = true;
        return _this;
    }
    mainMenu_1 = mainMenu;
    mainMenu.prototype.onLoad = function () {
        mainMenu_1.ins = this;
    };
    mainMenu.prototype.start = function () {
        this.init();
    };
    mainMenu.prototype.init = function () {
        var _this = this;
        this.maskAction_enter();
        this.updateCoin(this.coinLabel);
        // this.checkTodayDate()
        this.onNewBackHomeClick = true;
        mainMenu_1.native_have_show = false;
        if (data_1.data.getPrivacyOn()) {
            this.showOnece();
        }
        else {
            UIPrivacy_1.default.ShowPanel(function () {
                _this.showOnece();
            });
        }
        mainMenu_1.isCkeck(this.BtnDesktop);
    };
    mainMenu.prototype.showPrivacy = function () {
        UIPrivacy_1.default.ShowPanel();
    };
    mainMenu.prototype.maskAction_go = function () {
        this.mask_go.x = cc.winSize.width / 2;
        this.mask_go.width = cc.winSize.width + 1064;
        this.mask_go.active = true;
        var offsetX = this.mask_go.scaleX * this.mask_go.width;
        cc.tween(this.mask_go)
            .by(0.6, { x: -offsetX })
            .call(function () {
            cc.director.loadScene("game");
        })
            .start();
    };
    mainMenu.prototype.maskAction_enter = function () {
        this.mask_enter.x = -cc.winSize.width / 2;
        this.mask_enter.width = cc.winSize.width + 1064;
        this.mask_enter.active = true;
        var offsetX = this.mask_enter.scaleX * this.mask_enter.width;
        cc.tween(this.mask_enter)
            .by(0.6, { x: offsetX })
            .start();
    };
    mainMenu.prototype.openUpgradePanel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.showPopup(uiBase_1.uiName.upgradePanel, this.node)];
                    case 1:
                        popup = _a.sent();
                        popup.setSiblingIndex(this.node.childrenCount - 3);
                        return [2 /*return*/];
                }
            });
        });
    };
    mainMenu.prototype.openSignInPanel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // let popup=await caijiTools.showPopup(uiName.signInPanel,this.node);
                // if(popup)
                // {popup.setSiblingIndex(this.node.childrenCount-3);}
                export_sdk_1.Export.hide_naive_YSAD('YSBN'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
                UiSign_1.default.ShowPanel(function () {
                    _this.updateCoin(_this.coinLabel);
                    mainMenu_1.showAd();
                });
                return [2 /*return*/];
            });
        });
    };
    mainMenu.prototype.choseLevel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.showPopup(uiBase_1.uiName.choseLevelPanel, this.node)];
                    case 1:
                        popup = _a.sent();
                        popup.setSiblingIndex(this.node.childrenCount - 3);
                        return [2 /*return*/];
                }
            });
        });
    };
    mainMenu.prototype.substartGame = function () {
        this.maskAction_go();
        var levelUnlock = data_1.data.getCache("levelUnlock");
        for (var i = 0; i < levelUnlock.length; i++) {
            if (levelUnlock[i] == 0) {
                if (i >= 16) {
                    data_1.data.updateCache("Base", "choseLevel", 15);
                }
                else {
                    data_1.data.updateCache("Base", "choseLevel", i);
                }
                break;
            }
        }
    };
    mainMenu.prototype.startGame = function () {
        if (this.onNewBackHomeClick && mainMenu_1.native_have_show) {
            this.onNewBackHomeClick = false;
            export_sdk_1.Export.click_native_YSAD("YSBN"); // 触发ysjs
        }
        else { // 否则回到游戏
            this.onNewBackHomeClick = true;
            mainMenu_1.native_have_show = false;
            export_sdk_1.Export.hide_naive_YSAD('YSBN'); // 隐藏原生广告
            cc.log("-----------开始游戏-------------");
            this.substartGame();
        }
    };
    mainMenu.prototype.updateCoin = function (coinLabel) {
        var coin = Number(data_1.data.getCache("Base", "coin"));
        if (coin >= 1000) {
            coinLabel.string = (coin / 1000).toFixed(1) + "k";
        }
        else {
            coinLabel.string = coin.toString();
        }
    };
    mainMenu.prototype.watchAdGetCoin = function () {
        var _this = this;
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                audioManager_1.default.playAudio(audioNameMgr_1.audioName.getCoin);
                var coin = Number(data_1.data.getCache("Base", "coin")) + 500;
                data_1.data.updateCache("Base", "coin", coin);
                _this.updateCoin(_this.coinLabel);
            }
        });
    };
    mainMenu.prototype.checkTodayDate = function () {
        var timeDate = new Date();
        var maxPower = 12;
        if (timeDate.toLocaleDateString() != data_1.data.getCache("Base", "todayDate")) {
            if (Number(data_1.data.getCache("Base", "power")) < maxPower) {
            }
            data_1.data.updateCache("Base", "todayDate", timeDate.toLocaleDateString());
            data_1.data.updateCache("Base", "isGetDailyReward", 0); //是否已领签到奖励
            data_1.data.updateCache("Base", "isGetLoginReward", 0); //是否已领登录奖励
            var loginDays = Number(data_1.data.getCache("Base", "loginDays"));
            if (loginDays >= 7) {
                loginDays = 0;
            }
            data_1.data.updateCache("Base", "loginDays", loginDays); //登录天数            
            this.checkHadSign();
        }
        else {
            this.checkHadSign();
        }
    };
    mainMenu.prototype.checkHadSign = function () {
        if (Number(data_1.data.getCache("Base", "isGetDailyReward")) == 0) {
            this.openSignInPanel();
        }
    };
    /**判断是否可以签到 */
    mainMenu.prototype._checkCanBonus = function () {
        var isReward = Number(data_1.data.getCache("Base", "isGetDailyReward"));
        cc.log("_checkCanBonus isReward:", isReward);
        if (isReward == 0) {
            return true;
        }
        return false;
    };
    mainMenu.showAd = function () {
        // let ad:cc.Node = cc.find("Canvas/UiHome/fail_parent")
        // if (cc.winSize.height > 2000){
        //     ad.setScale(0.7)
        // }else{
        //     ad.setScale(0.6)
        // }
        setTimeout(function () {
            export_sdk_1.Export.show_native_YSAD("10304001", "Canvas/fail_parent", function () { mainMenu_1.native_have_show = true; });
        }, 400);
    };
    mainMenu.prototype.showOnece = function () {
        var _this = this;
        if (data_1.data.getSignOnceOn() == false && this._checkCanBonus()) {
            UiSign_1.default.ShowPanel(function () {
                _this.updateCoin(_this.coinLabel);
                mainMenu_1.showAd();
            });
            data_1.data.setSignOnceOn(true);
        }
        else {
            mainMenu_1.showAd();
        }
    };
    /**
     * 游戏开始时，调用isCkeck，isCkeck是检查是否添加到桌面了，
     * @param node 这是游戏页面的 添加桌面 按钮，要传入节点
     * can_add 可以添加到桌面，所以 添加桌面 按钮要显示
     * has_add 已经添加到桌面，所以 添加桌面 按钮要隐藏
     */
    mainMenu.isCkeck = function (node) {
        if (node) {
            var can_add = function () {
                node.active = true;
                // node.on(cc.Node.EventType.TOUCH_END, () => {
                //     mainMenu.addDesktop(node); // 是下面的addDesktop方法，照搬即可，注意参数node，node就是 添加桌面 按钮节点
                // })
            };
            var has_add = function () {
                node.active = false;
            };
            syyx_sdk_api_1.syyx_sdk_api.check_is_add_desktop(can_add, has_add);
        }
    };
    mainMenu.prototype.show_game_portal_box = function () {
        syyx_sdk_api_1.syyx_sdk_api.show_game_portal_box("10600003", null, null, null, function () {
            Msg_1.default.Show("请勿频繁点击");
        });
    };
    mainMenu.prototype.showDesktop = function () {
        mainMenu_1.addDesktop(this.BtnDesktop);
    };
    /**
    * 打开添加桌面按钮
    */
    mainMenu.addDesktop = function (node) {
        var on_success = function () {
            syyx_sdk_api_1.syyx_sdk_api.check_is_add_desktop(function () {
                console.log("点击了取消添加桌面图标");
            }, function () {
                node.active = false;
                console.log("添加桌面图标成功");
            });
        };
        var on_failed = function () {
            console.log("不能添加桌面");
            Msg_1.default.Show("请勿频繁点击");
        };
        var on_failed_back = function () {
            console.log("弹出添加桌面失败");
            Msg_1.default.Show("请勿频繁点击");
        };
        var has_create = function () {
            node.active = false;
        };
        var can_add = function () {
            syyx_sdk_api_1.syyx_sdk_api.add_desktop(on_success, on_failed, on_failed_back, has_create);
        };
        var has_add = function () {
            node.active = false;
        };
        syyx_sdk_api_1.syyx_sdk_api.check_is_add_desktop(can_add, has_add);
    };
    var mainMenu_1;
    mainMenu.ins = null;
    mainMenu.native_have_show = false; // 原生结算展示
    __decorate([
        property(cc.Node)
    ], mainMenu.prototype, "mask_go", void 0);
    __decorate([
        property(cc.Node)
    ], mainMenu.prototype, "mask_enter", void 0);
    __decorate([
        property(cc.Label)
    ], mainMenu.prototype, "coinLabel", void 0);
    __decorate([
        property(cc.Node)
    ], mainMenu.prototype, "BtnDesktop", void 0);
    mainMenu = mainMenu_1 = __decorate([
        ccclass
    ], mainMenu);
    return mainMenu;
}(cc.Component));
exports.default = mainMenu;

cc._RF.pop();