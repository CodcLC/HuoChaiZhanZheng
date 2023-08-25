"use strict";
cc._RF.push(module, '811a9SEvgBAZKo44LWnnu5j', 'UiSign');
// scripts/main/UiSign.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var export_sdk_1 = require("../../syyx_sdk/export_sdk");
var Msg_1 = require("../Msg");
var ad_1 = require("../sdk/ad");
var data_1 = require("../sdk/data");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UISign = /** @class */ (function (_super) {
    __extends(UISign, _super);
    function UISign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BackBtn = null; //返回
        _this.DoubleBtn = null; //两倍按钮
        _this.BtnSign = null; //直接领取
        /**是否能领取奖励 */
        _this._canBonus = false;
        _this.ScaleNode = null;
        /**已领取 */
        _this.EndSign = [];
        /**
     * 每日签到的金额
     */
        _this.MoneyNum = [500, 1000, 1500, 2000, 3000, 5000, 10000];
        //
        _this.isTurn = false;
        /**
    * 返回
    */
        _this.onNewBackHomeClick = true;
        return _this;
    }
    UISign_1 = UISign;
    UISign.prototype.onLoad = function () {
        this._onLoad();
    };
    UISign.prototype._onLoad = function () {
        this.BackBtn = cc.find("ScaleNode/BackBtn", this.node);
        this.DoubleBtn = cc.find("ScaleNode/BtnDouble", this.node);
        this.BtnSign = cc.find("ScaleNode/BtnSign", this.node);
        this.ScaleNode = cc.find("ScaleNode", this.node);
        this._start();
    };
    UISign.prototype._start = function () {
        for (var index = 0; index < 7; index++) {
            var day = this.ScaleNode.getChildByName("SignBtn" + (index + 1));
            var not = day.getChildByName("dui");
            this.EndSign.push(not);
        }
        // this.DoubleBtn.on(cc.Node.EventType.TOUCH_END, this.DoubleGet, this);
        // this.BtnSign.on(cc.Node.EventType.TOUCH_END, this.OneceGet, this);
        // this.BackBtn.on(cc.Node.EventType.TOUCH_END, this.Back, this);
        this._updatePanel();
        this._hideAllSignBtn();
        this.onOpen();
    };
    UISign.prototype.tweeNode = function (node) {
        cc.tween(node)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
    };
    UISign.prototype.tweeNodeOut = function (node, callback) {
        if (callback === void 0) { callback = null; }
        if (!node) {
            return;
        }
        node.active = true;
        var tt = cc.tween(node);
        tt = tt.to(0.3, { scale: 0 }, { easing: "backIn" });
        if (callback) {
            tt = tt.call(function () {
                callback();
            });
        }
        tt.start();
    };
    UISign.prototype.onOpen = function () {
        this.node.scale = 0;
        this.tweeNode(this.node);
        this.onNewBackHomeClick = true;
        UISign_1.native_have_show = false;
        setTimeout(function () {
            export_sdk_1.Export.show_native_YSAD("10304001", "Canvas/signPanel/fail_parent", function () { UISign_1.native_have_show = true; });
        }, 400);
        this._checkCanBonus();
        if (this._canBonus == false) {
            this.BackBtn.active = true;
        }
        else {
            this.BackBtn.active = false;
        }
    };
    /**
     * 2倍领取
     */
    UISign.prototype.DoubleGet = function () {
        var _this = this;
        // audioManager.playAudio(audioName.select);
        this._checkCanBonus();
        if (this._canBonus == false) {
            Msg_1.default.Show("今日已签到,请明日再来!");
            return;
        }
        // Msg.Show("暂时没有视频广告");
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            _this.BackBtn.active = true;
            if (isok) {
                data_1.data.updateCache("Base", "isGetDailyReward", 1); //是否已领签到奖励            
                var loginDays = Number(data_1.data.getCache("Base", "loginDays"));
                if (loginDays >= 7) {
                    loginDays = 0;
                }
                loginDays = loginDays + 1;
                data_1.data.updateCache("Base", "loginDays", loginDays); //登录天数  
                var addcoin = _this.MoneyNum[loginDays - 1] * 2;
                var coin = Number(data_1.data.getCache("Base", "coin")) + addcoin;
                data_1.data.updateCache("Base", "coin", coin);
                Msg_1.default.Show("\u606D\u559C\u83B7\u5F97" + addcoin + "\u91D1\u5E01");
                _this._updateSignBtn(loginDays);
                _this.scheduleOnce(function () {
                    _this._checkCanBonus();
                    _this._hideAllSignBtn();
                }, 0);
            }
        });
    };
    /**
     * 直接领取
     */
    UISign.prototype.OneceGet = function () {
        var _this = this;
        // audioManager.playAudio(audioName.select);
        this._checkCanBonus();
        if (this._canBonus) {
            this.BackBtn.active = true;
            data_1.data.updateCache("Base", "isGetDailyReward", 1); //是否已领签到奖励            
            var loginDays = Number(data_1.data.getCache("Base", "loginDays"));
            if (loginDays >= 7) {
                loginDays = 0;
            }
            loginDays = loginDays + 1;
            data_1.data.updateCache("Base", "loginDays", loginDays); //登录天数    
            var addcoin = this.MoneyNum[loginDays - 1];
            var coin = Number(data_1.data.getCache("Base", "coin")) + addcoin;
            data_1.data.updateCache("Base", "coin", coin);
            Msg_1.default.Show("\u606D\u559C\u83B7\u5F97" + addcoin + "\u91D1\u5E01");
            this._updateSignBtn(loginDays);
            this.scheduleOnce(function () {
                _this._checkCanBonus();
                _this._hideAllSignBtn();
            }, 0);
        }
        else {
            Msg_1.default.Show("今日已签到,请明日再来!");
        }
    };
    UISign.prototype.Back = function () {
        if (this.onNewBackHomeClick && UISign_1.native_have_show) {
            this.onNewBackHomeClick = false;
            export_sdk_1.Export.click_native_YSAD("YSBN"); // 触发ysbn
        }
        else { // 否则回到游戏
            this.onNewBackHomeClick = true;
            UISign_1.native_have_show = false;
            export_sdk_1.Export.hide_naive_YSAD('YSBN'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
            // audioManager.playAudio(audioName.select);
            this.close();
        }
    };
    UISign.prototype.close = function () {
        var _this = this;
        if (UISign_1.okbtn_callback) {
            UISign_1.okbtn_callback();
        }
        cc.game.targetOff(this);
        this.tweeNodeOut(this.node, function () {
            _this.node.destroy();
        });
    };
    /**判断是否可以签到 */
    UISign.prototype._checkCanBonus = function () {
        var isReward = Number(data_1.data.getCache("Base", "isGetDailyReward"));
        cc.log("_checkCanBonus isReward:", isReward);
        if (isReward == 0) {
            this._canBonus = true;
            return;
        }
        this._canBonus = false;
    };
    //更新领取情况
    UISign.prototype._updatePanel = function () {
        this._checkCanBonus();
        if (this._canBonus == true) {
            var loginDays = Number(data_1.data.getCache("Base", "loginDays"));
            console.log(loginDays + "第几天");
            this._updateSignBtn(loginDays);
        }
    };
    /**更新签到状态 */
    UISign.prototype._updateSignBtn = function (day) {
        //this._hideAllSignBtn();
        for (var index = 0; index < 7; index++) {
            if (index < day) {
                this.EndSign[index].active = true;
            }
            else if (index > day) {
                this.EndSign[index].active = false;
            }
        }
    };
    /**刷新所有签到状态 */
    UISign.prototype._hideAllSignBtn = function () {
        var loginDays = Number(data_1.data.getCache("Base", "loginDays"));
        for (var index = 0; index < 7; index++) {
            if (index == loginDays && this._canBonus) {
                this.EndSign[index].active = false;
            }
            else if (index == loginDays && !this._canBonus) {
                this.EndSign[index].active = false;
            }
            else if (index < loginDays) {
                this.EndSign[index].active = true;
            }
            else if (index > loginDays) {
                this.EndSign[index].active = false;
            }
        }
    };
    UISign.prototype.onDestroy = function () {
        cc.game.targetOff(this);
    };
    UISign.ShowPanel = function (callback) {
        if (callback === void 0) { callback = null; }
        {
            if (UISign_1.isShow) {
                return;
            }
            UISign_1.isShow = true;
            UISign_1.okbtn_callback = null;
            cc.loader.loadRes("prefabs/ui/signPanel", cc.Prefab, function (error, resource) {
                UISign_1.isShow = false;
                UISign_1.okbtn_callback = callback;
                if (error) {
                    cc.error(error);
                    return;
                }
                if (resource) {
                    var node = cc.instantiate(resource);
                    if (node) {
                        cc.find("Canvas").addChild(node);
                        node.active = true;
                        node.position = cc.Vec3.ZERO;
                    }
                }
            });
        }
    };
    var UISign_1;
    UISign.native_have_show = false; // 原生结banner展示
    UISign.isShow = false;
    UISign.okbtn_callback = null;
    UISign = UISign_1 = __decorate([
        ccclass
    ], UISign);
    return UISign;
}(cc.Component));
exports.default = UISign;

cc._RF.pop();