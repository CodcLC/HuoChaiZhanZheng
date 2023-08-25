
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/main/mainMenu.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFpblxcbWFpbk1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsd0RBQW1EO0FBQ25ELDREQUEyRDtBQUMzRCw4QkFBeUI7QUFDekIsMENBQXFDO0FBQ3JDLGdEQUE0QztBQUM1Qyw0Q0FBMkM7QUFFM0MsZ0NBQStCO0FBQy9CLG9DQUFtQztBQUNuQyxvQ0FBbUM7QUFDbkMsbUNBQThCO0FBQzlCLCtDQUEwQztBQUNwQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQXFRQztRQWxRRyxhQUFPLEdBQVMsSUFBSSxDQUFDO1FBRXJCLGdCQUFVLEdBQVMsSUFBSSxDQUFDO1FBRXhCLGVBQVMsR0FBVSxJQUFJLENBQUM7UUFFeEIsZ0JBQVUsR0FBVyxJQUFJLENBQUE7UUE0RnpCLHdCQUFrQixHQUFZLElBQUksQ0FBQzs7SUFnS3ZDLENBQUM7aUJBclFvQixRQUFRO0lBWXpCLHlCQUFNLEdBQU47UUFDSSxVQUFRLENBQUMsR0FBRyxHQUFDLElBQUksQ0FBQztJQUN0QixDQUFDO0lBRUQsd0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQ0QsdUJBQUksR0FBSjtRQUFBLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVoQyx3QkFBd0I7UUFFeEIsSUFBSSxD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Q3RCLENBQUMsQ0FBQTtRQUNELElBQUksVUFBVSxHQUFHO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxDQUFBO1FBRUQsSUFBSSxPQUFPLEdBQUc7WUFDViwyQkFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQTtRQUMvRSxDQUFDLENBQUE7UUFDRCxJQUFJLE9BQU8sR0FBRztZQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQTtRQUNELDJCQUFZLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7O0lBeFBNLFlBQUcsR0FBVSxJQUFJLENBQUM7SUF5RmxCLHlCQUFnQixHQUFZLEtBQUssQ0FBQyxDQUFFLFNBQVM7SUFqR3BEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NkNBQ0c7SUFFckI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDTTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOytDQUNLO0lBRXhCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ087SUFUUixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBcVE1QjtJQUFELGVBQUM7Q0FyUUQsQUFxUUMsQ0FyUXFDLEVBQUUsQ0FBQyxTQUFTLEdBcVFqRDtrQkFyUW9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgRXhwb3J0IH0gZnJvbSBcIi4uLy4uL3N5eXhfc2RrL2V4cG9ydF9zZGtcIjtcbmltcG9ydCB7IHN5eXhfc2RrX2FwaSB9IGZyb20gXCIuLi8uLi9zeXl4X3Nkay9zeXl4X3Nka19hcGlcIjtcbmltcG9ydCBNc2cgZnJvbSBcIi4uL01zZ1wiO1xuaW1wb3J0IFVJUHJpdmFjeSBmcm9tIFwiLi4vVUlQcml2YWN5XCI7XG5pbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCB1aU1hbmFnZXIgZnJvbSBcIi4uL2dhbWUvdWkvdWlNYW5hZ2VyXCI7XG5pbXBvcnQgeyBhZCB9IGZyb20gXCIuLi9zZGsvYWRcIjtcbmltcG9ydCB7IGRhdGEgfSBmcm9tIFwiLi4vc2RrL2RhdGFcIjtcbmltcG9ydCB7IHVpTmFtZSB9IGZyb20gXCIuLi91aUJhc2VcIjtcbmltcG9ydCBVSVNpZ24gZnJvbSBcIi4vVWlTaWduXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuL2F1ZGlvTWFuYWdlclwiO1xuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBtYWluTWVudSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtYXNrX2dvOmNjLk5vZGU9bnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtYXNrX2VudGVyOmNjLk5vZGU9bnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgY29pbkxhYmVsOmNjLkxhYmVsPW51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgQnRuRGVza3RvcDpjYy5Ob2RlID0gbnVsbFxuXG4gICAgc3RhdGljIGluczptYWluTWVudT1udWxsO1xuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIG1haW5NZW51Lmlucz10aGlzO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKXtcbiAgICAgICAgdGhpcy5tYXNrQWN0aW9uX2VudGVyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29pbih0aGlzLmNvaW5MYWJlbCk7XG5cbiAgICAgICAgLy8gdGhpcy5jaGVja1RvZGF5RGF0ZSgpXG5cbiAgICAgICAgdGhpcy5vbk5ld0JhY2tIb21lQ2xpY2sgPSB0cnVlXG4gICAgICAgIG1haW5NZW51Lm5hdGl2ZV9oYXZlX3Nob3cgPSBmYWxzZVxuXG4gICAgICAgIGlmIChkYXRhLmdldFByaXZhY3lPbigpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dPbmVjZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBVSVByaXZhY3kuU2hvd1BhbmVsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dPbmVjZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIG1haW5NZW51LmlzQ2tlY2sodGhpcy5CdG5EZXNrdG9wKVxuXG4gICAgfVxuXG4gICAgc2hvd1ByaXZhY3koKXtcbiAgICAgICAgVUlQcml2YWN5LlNob3dQYW5lbCgpXG4gICAgfVxuXG4gICAgbWFza0FjdGlvbl9nbygpe1xuICAgICAgICB0aGlzLm1hc2tfZ28ueD1jYy53aW5TaXplLndpZHRoLzI7XG4gICAgICAgIHRoaXMubWFza19nby53aWR0aD1jYy53aW5TaXplLndpZHRoKzEwNjQ7XG4gICAgICAgIHRoaXMubWFza19nby5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgbGV0IG9mZnNldFg9dGhpcy5tYXNrX2dvLnNjYWxlWCp0aGlzLm1hc2tfZ28ud2lkdGg7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubWFza19nbylcbiAgICAgICAgLmJ5KDAuNix7eDotb2Zmc2V0WH0pXG4gICAgICAgIC5jYWxsKCgpPT57XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xuICAgICAgICB9KVxuICAgICAgICAuc3RhcnQoKVxuICAgIH1cbiAgICBtYXNrQWN0aW9uX2VudGVyKCl7XG4gICAgICAgIHRoaXMubWFza19lbnRlci54PS1jYy53aW5TaXplLndpZHRoLzI7XG4gICAgICAgIHRoaXMubWFza19lbnRlci53aWR0aD1jYy53aW5TaXplLndpZHRoKzEwNjQ7XG4gICAgICAgIHRoaXMubWFza19lbnRlci5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgbGV0IG9mZnNldFg9dGhpcy5tYXNrX2VudGVyLnNjYWxlWCp0aGlzLm1hc2tfZW50ZXIud2lkdGg7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubWFza19lbnRlcilcbiAgICAgICAgLmJ5KDAuNix7eDpvZmZzZXRYfSlcbiAgICAgICAgLnN0YXJ0KClcbiAgICB9XG4gICAgYXN5bmMgb3BlblVwZ3JhZGVQYW5lbCgpe1xuICAgICAgICBsZXQgcG9wdXA9YXdhaXQgY2FpamlUb29scy5zaG93UG9wdXAodWlOYW1lLnVwZ3JhZGVQYW5lbCx0aGlzLm5vZGUpO1xuICAgICAgICBwb3B1cC5zZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlLmNoaWxkcmVuQ291bnQtMyk7XG4gICAgfVxuICAgIGFzeW5jIG9wZW5TaWduSW5QYW5lbCgpe1xuICAgICAgICAvLyBsZXQgcG9wdXA9YXdhaXQgY2FpamlUb29scy5zaG93UG9wdXAodWlOYW1lLnNpZ25JblBhbmVsLHRoaXMubm9kZSk7XG5cdFx0Ly8gaWYocG9wdXApXG4gICAgICAgIC8vIHtwb3B1cC5zZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlLmNoaWxkcmVuQ291bnQtMyk7fVxuXG4gICAgICAgIEV4cG9ydC5oaWRlX25haXZlX1lTQUQoJ1lTQk4nKSAvLyDpmpDol4/ljp/nlJ/lub/lkYog5LygJ1lTQk4n77yM5oSP5oCd5piv5ZCM5pe25Lya6aKE5Yqg6L29WVNCTlxuICAgICAgICBcbiAgICAgICAgVUlTaWduLlNob3dQYW5lbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb2luKHRoaXMuY29pbkxhYmVsKTtcbiAgICAgICAgICAgIG1haW5NZW51LnNob3dBZCgpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGFzeW5jIGNob3NlTGV2ZWwoKXtcbiAgICAgICAgbGV0IHBvcHVwPWF3YWl0IGNhaWppVG9vbHMuc2hvd1BvcHVwKHVpTmFtZS5jaG9zZUxldmVsUGFuZWwsdGhpcy5ub2RlKTtcbiAgICAgICAgcG9wdXAuc2V0U2libGluZ0luZGV4KHRoaXMubm9kZS5jaGlsZHJlbkNvdW50LTMpO1xuICAgIH1cbiAgICBzdWJzdGFydEdhbWUoKXtcbiAgICAgICAgdGhpcy5tYXNrQWN0aW9uX2dvKCk7XG4gICAgICAgIGxldCBsZXZlbFVubG9jaz1kYXRhLmdldENhY2hlPG51bWJlcltdPihcImxldmVsVW5sb2NrXCIpO1xuICAgICAgICBmb3IobGV0IGk9MDtpPGxldmVsVW5sb2NrLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgaWYobGV2ZWxVbmxvY2tbaV09PTApe1xuICAgICAgICAgICAgICAgIGlmKGk+PTE2KXtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcIkJhc2VcIixcImNob3NlTGV2ZWxcIiwxNSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJCYXNlXCIsXCJjaG9zZUxldmVsXCIsaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIG5hdGl2ZV9oYXZlX3Nob3c6IGJvb2xlYW4gPSBmYWxzZTsgIC8vIOWOn+eUn+e7k+eul+WxleekulxuICAgIG9uTmV3QmFja0hvbWVDbGljazogYm9vbGVhbiA9IHRydWU7XG4gICAgc3RhcnRHYW1lKCkgeyAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLm9uTmV3QmFja0hvbWVDbGljayAmJiBtYWluTWVudS5uYXRpdmVfaGF2ZV9zaG93KSB7XG4gICAgICAgICAgICB0aGlzLm9uTmV3QmFja0hvbWVDbGljayA9IGZhbHNlXG4gICAgICAgICAgICBFeHBvcnQuY2xpY2tfbmF0aXZlX1lTQUQoXCJZU0JOXCIpIC8vIOinpuWPkXlzanNcbiAgICAgICAgfSBlbHNlIHsgLy8g5ZCm5YiZ5Zue5Yiw5ri45oiPXG4gICAgICAgICAgICB0aGlzLm9uTmV3QmFja0hvbWVDbGljayA9IHRydWVcbiAgICAgICAgICAgIG1haW5NZW51Lm5hdGl2ZV9oYXZlX3Nob3cgPSBmYWxzZVxuICAgICAgICAgICAgRXhwb3J0LmhpZGVfbmFpdmVfWVNBRCgnWVNCTicpIC8vIOmakOiXj+WOn+eUn+W5v+WRilxuICAgICAgICAgICAgY2MubG9nKFwiLS0tLS0tLS0tLS3lvIDlp4vmuLjmiI8tLS0tLS0tLS0tLS0tXCIpO1xuICAgICAgICAgICAgdGhpcy5zdWJzdGFydEdhbWUoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQ29pbihjb2luTGFiZWw6Y2MuTGFiZWwpe1xuICAgICAgICBsZXQgY29pbj1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImNvaW5cIikpO1xuICAgICAgICBpZihjb2luPj0xMDAwKXtcbiAgICAgICAgICAgIGNvaW5MYWJlbC5zdHJpbmc9KGNvaW4vMTAwMCkudG9GaXhlZCgxKStcImtcIjtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb2luTGFiZWwuc3RyaW5nPWNvaW4udG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3YXRjaEFkR2V0Q29pbigpe1xuICAgICAgICAvLyBhdWRpb01hbmFnZXIucGF1c2VCZ0dhbWUoKVxuICAgICAgICBhZC52aWRlb19zaG93KCkudGhlbihpc29rPT57XG4gICAgICAgICAgICAvLyBhdWRpb01hbmFnZXIucGxheUJnR2FtZSgpXG4gICAgICAgICAgICBpZihpc29rKXtcbiAgICAgICAgICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5nZXRDb2luKTtcbiAgICAgICAgICAgICAgICBsZXQgY29pbj1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImNvaW5cIikpKzUwMDtcbiAgICAgICAgICAgICAgICBkYXRhLnVwZGF0ZUNhY2hlKFwiQmFzZVwiLFwiY29pblwiLGNvaW4pO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29pbih0aGlzLmNvaW5MYWJlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGVja1RvZGF5RGF0ZSgpIHtcbiAgICAgICAgbGV0IHRpbWVEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IG1heFBvd2VyPTEyO1xuICAgICAgICBpZiAodGltZURhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCkgIT0gZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcInRvZGF5RGF0ZVwiKSkge1xuICAgICAgICAgICAgaWYgKE51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwicG93ZXJcIikpIDxtYXhQb3dlcikge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhLnVwZGF0ZUNhY2hlKFwiQmFzZVwiLFwidG9kYXlEYXRlXCIsdGltZURhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCkpO1xuICAgICAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcIkJhc2VcIixcImlzR2V0RGFpbHlSZXdhcmRcIiwwKTsvL+aYr+WQpuW3sumihuetvuWIsOWlluWKsVxuICAgICAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcIkJhc2VcIixcImlzR2V0TG9naW5SZXdhcmRcIiwwKTsvL+aYr+WQpuW3sumihueZu+W9leWlluWKsVxuICAgICAgICAgICAgbGV0IGxvZ2luRGF5cz1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImxvZ2luRGF5c1wiKSk7XG4gICAgICAgICAgICBpZiAobG9naW5EYXlzID49IDcpe1xuICAgICAgICAgICAgICAgIGxvZ2luRGF5cyA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJCYXNlXCIsXCJsb2dpbkRheXNcIixsb2dpbkRheXMpOy8v55m75b2V5aSp5pWwICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNoZWNrSGFkU2lnbigpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tIYWRTaWduKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tIYWRTaWduKCkge1xuICAgICAgICBpZiAoTnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJCYXNlXCIsXCJpc0dldERhaWx5UmV3YXJkXCIpKSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5TaWduSW5QYW5lbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5Yik5pat5piv5ZCm5Y+v5Lul562+5YiwICovXG4gICAgcHJpdmF0ZSBfY2hlY2tDYW5Cb251cygpIHtcbiAgICAgICAgdmFyIGlzUmV3YXJkID0gTnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJCYXNlXCIsXCJpc0dldERhaWx5UmV3YXJkXCIpKVxuICAgICAgICBjYy5sb2coXCJfY2hlY2tDYW5Cb251cyBpc1Jld2FyZDpcIixpc1Jld2FyZClcbiAgICAgICAgaWYgKGlzUmV3YXJkID09IDApIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBzaG93QWQoKSB7XG4gICAgICAgIC8vIGxldCBhZDpjYy5Ob2RlID0gY2MuZmluZChcIkNhbnZhcy9VaUhvbWUvZmFpbF9wYXJlbnRcIilcbiAgICAgICAgLy8gaWYgKGNjLndpblNpemUuaGVpZ2h0ID4gMjAwMCl7XG4gICAgICAgIC8vICAgICBhZC5zZXRTY2FsZSgwLjcpXG4gICAgICAgIC8vIH1lbHNle1xuICAgICAgICAvLyAgICAgYWQuc2V0U2NhbGUoMC42KVxuICAgICAgICAvLyB9XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgRXhwb3J0LnNob3dfbmF0aXZlX1lTQUQoXCIxMDMwNDAwMVwiLCBcIkNhbnZhcy9mYWlsX3BhcmVudFwiLCAoKSA9PiB7IG1haW5NZW51Lm5hdGl2ZV9oYXZlX3Nob3cgPSB0cnVlIH0pICAgIFxuICAgICAgICB9LCA0MDApOyAgICAgICAgXG4gICAgfVxuICAgIHByaXZhdGUgc2hvd09uZWNlKCkgeyAgICAgICAgXG4gICAgICAgIGlmIChkYXRhLmdldFNpZ25PbmNlT24oKSA9PSBmYWxzZSAmJiB0aGlzLl9jaGVja0NhbkJvbnVzKCkpIHtcbiAgICAgICAgICAgIFVJU2lnbi5TaG93UGFuZWwoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvaW4odGhpcy5jb2luTGFiZWwpO1xuICAgICAgICAgICAgICAgIG1haW5NZW51LnNob3dBZCgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGF0YS5zZXRTaWduT25jZU9uKHRydWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYWluTWVudS5zaG93QWQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5ri45oiP5byA5aeL5pe277yM6LCD55SoaXNDa2Vja++8jGlzQ2tlY2vmmK/mo4Dmn6XmmK/lkKbmt7vliqDliLDmoYzpnaLkuobvvIxcbiAgICAgKiBAcGFyYW0gbm9kZSDov5nmmK/muLjmiI/pobXpnaLnmoQg5re75Yqg5qGM6Z2iIOaMiemSru+8jOimgeS8oOWFpeiKgueCuVxuICAgICAqIGNhbl9hZGQg5Y+v5Lul5re75Yqg5Yiw5qGM6Z2i77yM5omA5LulIOa3u+WKoOahjOmdoiDmjInpkq7opoHmmL7npLpcbiAgICAgKiBoYXNfYWRkIOW3sue7j+a3u+WKoOWIsOahjOmdou+8jOaJgOS7pSDmt7vliqDmoYzpnaIg5oyJ6ZKu6KaB6ZqQ6JePXG4gICAgICovXG4gICAgc3RhdGljIGlzQ2tlY2sobm9kZT86IGNjLk5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGxldCBjYW5fYWRkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBtYWluTWVudS5hZGREZXNrdG9wKG5vZGUpOyAvLyDmmK/kuIvpnaLnmoRhZGREZXNrdG9w5pa55rOV77yM54Wn5pCs5Y2z5Y+v77yM5rOo5oSP5Y+C5pWwbm9kZe+8jG5vZGXlsLHmmK8g5re75Yqg5qGM6Z2iIOaMiemSruiKgueCuVxuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaGFzX2FkZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3l5eF9zZGtfYXBpLmNoZWNrX2lzX2FkZF9kZXNrdG9wKGNhbl9hZGQsIGhhc19hZGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93X2dhbWVfcG9ydGFsX2JveCgpIHtcbiAgICAgICAgc3l5eF9zZGtfYXBpLnNob3dfZ2FtZV9wb3J0YWxfYm94KFwiMTA2MDAwMDNcIiwgbnVsbCwgbnVsbCwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgTXNnLlNob3coXCLor7fli7/popHnuYHngrnlh7tcIilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzaG93RGVza3RvcCgpe1xuICAgICAgICBtYWluTWVudS5hZGREZXNrdG9wKHRoaXMuQnRuRGVza3RvcClcbiAgICB9XG4gICAgLyoqXG4gICAgKiDmiZPlvIDmt7vliqDmoYzpnaLmjInpkq5cbiAgICAqL1xuICAgIHN0YXRpYyBhZGREZXNrdG9wKG5vZGUpIHtcbiAgICAgICAgbGV0IG9uX3N1Y2Nlc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICBzeXl4X3Nka19hcGkuY2hlY2tfaXNfYWRkX2Rlc2t0b3AoXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIueCueWHu+S6huWPlua2iOa3u+WKoOahjOmdouWbvuagh1wiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmt7vliqDmoYzpnaLlm77moIfmiJDlip9cIik7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgICAgIGxldCBvbl9mYWlsZWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS4jeiDvea3u+WKoOahjOmdolwiKVxuICAgICAgICAgICAgTXNnLlNob3coXCLor7fli7/popHnuYHngrnlh7tcIilcbiAgICAgICAgfVxuICAgICAgICBsZXQgb25fZmFpbGVkX2JhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW8ueWHuua3u+WKoOahjOmdouWksei0pVwiKVxuICAgICAgICAgICAgTXNnLlNob3coXCLor7fli7/popHnuYHngrnlh7tcIilcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGFzX2NyZWF0ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2FuX2FkZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHN5eXhfc2RrX2FwaS5hZGRfZGVza3RvcChvbl9zdWNjZXNzLCBvbl9mYWlsZWQsIG9uX2ZhaWxlZF9iYWNrLCBoYXNfY3JlYXRlKVxuICAgICAgICB9XG4gICAgICAgIGxldCBoYXNfYWRkID0gKCkgPT4ge1xuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzeXl4X3Nka19hcGkuY2hlY2tfaXNfYWRkX2Rlc2t0b3AoY2FuX2FkZCwgaGFzX2FkZCk7XG4gICAgfVxuXG59XG4iXX0=