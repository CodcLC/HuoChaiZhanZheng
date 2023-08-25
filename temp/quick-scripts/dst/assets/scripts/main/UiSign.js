
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/main/UiSign.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFpblxcVWlTaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHdEQUFtRDtBQUNuRCw4QkFBeUI7QUFHekIsZ0NBQStCO0FBQy9CLG9DQUFtQztBQUc3QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFvQywwQkFBWTtJQUFoRDtRQUFBLHFFQTBRQztRQXhRVyxhQUFPLEdBQVksSUFBSSxDQUFDLENBQUEsSUFBSTtRQUM1QixlQUFTLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUNoQyxhQUFPLEdBQVksSUFBSSxDQUFDLENBQUEsTUFBTTtRQUN0QyxhQUFhO1FBQ0wsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixlQUFTLEdBQVksSUFBSSxDQUFDO1FBQ2xDLFNBQVM7UUFDRCxhQUFPLEdBQWMsRUFBRSxDQUFDO1FBRTVCOztPQUVEO1FBQ0ksY0FBUSxHQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFrRHZFLEVBQUU7UUFDRixZQUFNLEdBQVksS0FBSyxDQUFBO1FBNEZ2Qjs7TUFFRjtRQUNFLHdCQUFrQixHQUFZLElBQUksQ0FBQzs7SUEwR3ZDLENBQUM7ZUExUW9CLE1BQU07SUFnQnZCLHVCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUVPLHdCQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIs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IHsgRXhwb3J0IH0gZnJvbSBcIi4uLy4uL3N5eXhfc2RrL2V4cG9ydF9zZGtcIjtcbmltcG9ydCBNc2cgZnJvbSBcIi4uL01zZ1wiO1xuaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IENvbnN0YW50IGZyb20gXCIuLi9zZGsvQ29uc3RhbnRcIjtcbmltcG9ydCB7IGFkIH0gZnJvbSBcIi4uL3Nkay9hZFwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi9zZGsvZGF0YVwiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi9hdWRpb01hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJU2lnbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBwcml2YXRlIEJhY2tCdG46IGNjLk5vZGUgPSBudWxsOy8v6L+U5ZueXG4gICAgcHJpdmF0ZSBEb3VibGVCdG46IGNjLk5vZGUgPSBudWxsOy8v5Lik5YCN5oyJ6ZKuXG4gICAgcHJpdmF0ZSBCdG5TaWduOiBjYy5Ob2RlID0gbnVsbDsvL+ebtOaOpemihuWPllxuICAgIC8qKuaYr+WQpuiDvemihuWPluWlluWKsSAqL1xuICAgIHByaXZhdGUgX2NhbkJvbnVzOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBTY2FsZU5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIC8qKuW3sumihuWPliAqL1xuICAgIHByaXZhdGUgRW5kU2lnbjogY2MuTm9kZVtdID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICog5q+P5pel562+5Yiw55qE6YeR6aKdXG4gICAgICovXG4gICAgcHVibGljIE1vbmV5TnVtOiBudW1iZXJbXSA9IFs1MDAsIDEwMDAsIDE1MDAsIDIwMDAsIDMwMDAsIDUwMDAsIDEwMDAwXTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5fb25Mb2FkKClcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuQmFja0J0biA9IGNjLmZpbmQoXCJTY2FsZU5vZGUvQmFja0J0blwiLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLkRvdWJsZUJ0biA9IGNjLmZpbmQoXCJTY2FsZU5vZGUvQnRuRG91YmxlXCIsIHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMuQnRuU2lnbiA9IGNjLmZpbmQoXCJTY2FsZU5vZGUvQnRuU2lnblwiLCB0aGlzLm5vZGUpOyAgICAgXG4gICAgICAgIHRoaXMuU2NhbGVOb2RlID0gY2MuZmluZChcIlNjYWxlTm9kZVwiLCB0aGlzLm5vZGUpOyAgICAgXG4gICAgICAgIHRoaXMuX3N0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RhcnQoKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCA3OyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgZGF5OiBjYy5Ob2RlID0gdGhpcy5TY2FsZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJTaWduQnRuXCIgKyAoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBsZXQgbm90OiBjYy5Ob2RlID0gZGF5LmdldENoaWxkQnlOYW1lKFwiZHVpXCIpO1xuICAgICAgICAgICAgdGhpcy5FbmRTaWduLnB1c2gobm90KTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLkRvdWJsZUJ0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuRG91YmxlR2V0LCB0aGlzKTtcbiAgICAgICAgLy8gdGhpcy5CdG5TaWduLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5PbmVjZUdldCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMuQmFja0J0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuQmFjaywgdGhpcyk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBhbmVsKCk7XG4gICAgICAgIHRoaXMuX2hpZGVBbGxTaWduQnRuKCk7XG5cbiAgICAgICAgdGhpcy5vbk9wZW4oKVxuICAgIH1cblxuICAgIHB1YmxpYyB0d2VlTm9kZShub2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImJhY2tPdXRcIiB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHR3ZWVOb2RlT3V0KG5vZGU6IGNjLk5vZGUsIGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGxldCB0dCA9IGNjLnR3ZWVuKG5vZGUpXG4gICAgICAgIHR0ID0gdHQudG8oMC4zLCB7IHNjYWxlOiAwIH0sIHsgZWFzaW5nOiBcImJhY2tJblwiIH0pXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgdHQgPSB0dC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHR0LnN0YXJ0KCk7XG4gICAgfVxuXG4gICAgLy9cbiAgICBpc1R1cm46IGJvb2xlYW4gPSBmYWxzZVxuXG4gICAgc3RhdGljIG5hdGl2ZV9oYXZlX3Nob3c6IGJvb2xlYW4gPSBmYWxzZTsgIC8vIOWOn+eUn+e7k2Jhbm5lcuWxleekulxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMudHdlZU5vZGUodGhpcy5ub2RlKTtcblxuICAgICAgICB0aGlzLm9uTmV3QmFja0hvbWVDbGljayA9IHRydWVcbiAgICAgICAgVUlTaWduLm5hdGl2ZV9oYXZlX3Nob3cgPSBmYWxzZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIEV4cG9ydC5zaG93X25hdGl2ZV9ZU0FEKFwiMTAzMDQwMDFcIiwgXCJDYW52YXMvc2lnblBhbmVsL2ZhaWxfcGFyZW50XCIsICgpID0+IHsgVUlTaWduLm5hdGl2ZV9oYXZlX3Nob3cgPSB0cnVlIH0pXG4gICAgICAgIH0sIDQwMCk7XG4gICAgICAgIHRoaXMuX2NoZWNrQ2FuQm9udXMoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NhbkJvbnVzID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLkJhY2tCdG4uYWN0aXZlID0gdHJ1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5CYWNrQnRuLmFjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAy5YCN6aKG5Y+WXG4gICAgICovXG4gICAgIERvdWJsZUdldCgpIHtcbiAgICAgICAgLy8gYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuc2VsZWN0KTtcbiAgICAgICAgdGhpcy5fY2hlY2tDYW5Cb251cygpO1xuICAgICAgICBpZiAodGhpcy5fY2FuQm9udXMgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIE1zZy5TaG93KFwi5LuK5pel5bey562+5YiwLOivt+aYjuaXpeWGjeadpSFcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gTXNnLlNob3coXCLmmoLml7bmsqHmnInop4bpopHlub/lkYpcIik7XG4gICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wYXVzZUJnR2FtZSgpXG4gICAgICAgIGFkLnZpZGVvX3Nob3coKS50aGVuKGlzb2s9PntcbiAgICAgICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wbGF5QmdHYW1lKClcbiAgICAgICAgICAgIHRoaXMuQmFja0J0bi5hY3RpdmUgPSB0cnVlXG5cbiAgICAgICAgICAgIGlmKGlzb2spe1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkYXRhLnVwZGF0ZUNhY2hlKFwiQmFzZVwiLFwiaXNHZXREYWlseVJld2FyZFwiLDEpOy8v5piv5ZCm5bey6aKG562+5Yiw5aWW5YqxICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGxvZ2luRGF5cz1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImxvZ2luRGF5c1wiKSk7XG4gICAgICAgICAgICAgICAgaWYgKGxvZ2luRGF5cyA+PSA3KXtcbiAgICAgICAgICAgICAgICAgICAgbG9naW5EYXlzID0gMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsb2dpbkRheXMgPSBsb2dpbkRheXMrMVxuICAgICAgICAgICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJCYXNlXCIsXCJsb2dpbkRheXNcIixsb2dpbkRheXMpOy8v55m75b2V5aSp5pWwICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgYWRkY29pbiA9IHRoaXMuTW9uZXlOdW1bbG9naW5EYXlzIC0gMV0gKjJcbiAgICAgICAgICAgICAgICBsZXQgY29pbj1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImNvaW5cIikpKyBhZGRjb2luO1xuICAgICAgICAgICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJCYXNlXCIsXCJjb2luXCIsY29pbik7XG4gICAgICAgICAgICAgICAgTXNnLlNob3coYOaBreWWnOiOt+W+lyR7YWRkY29pbn3ph5HluIFgKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVTaWduQnRuKGxvZ2luRGF5cyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0NhbkJvbnVzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVBbGxTaWduQnRuKCk7XG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnm7TmjqXpooblj5ZcbiAgICAgKi9cbiAgICAgT25lY2VHZXQoKSB7XG4gICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLnNlbGVjdCk7XG4gICAgICAgIHRoaXMuX2NoZWNrQ2FuQm9udXMoKTtcbiAgICAgICAgaWYgKHRoaXMuX2NhbkJvbnVzKSB7XG4gICAgICAgICAgICB0aGlzLkJhY2tCdG4uYWN0aXZlID0gdHJ1ZVxuXG4gICAgICAgICAgICBkYXRhLnVwZGF0ZUNhY2hlKFwiQmFzZVwiLFwiaXNHZXREYWlseVJld2FyZFwiLDEpOy8v5piv5ZCm5bey6aKG562+5Yiw5aWW5YqxICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgbG9naW5EYXlzPU51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwibG9naW5EYXlzXCIpKTtcbiAgICAgICAgICAgIGlmIChsb2dpbkRheXMgPj0gNyl7XG4gICAgICAgICAgICAgICAgbG9naW5EYXlzID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9naW5EYXlzID0gbG9naW5EYXlzKzFcbiAgICAgICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJCYXNlXCIsXCJsb2dpbkRheXNcIixsb2dpbkRheXMpOy8v55m75b2V5aSp5pWwICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgYWRkY29pbiA9IHRoaXMuTW9uZXlOdW1bbG9naW5EYXlzLTFdXG4gICAgICAgICAgICBsZXQgY29pbj1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImNvaW5cIikpKyBhZGRjb2luO1xuICAgICAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcIkJhc2VcIixcImNvaW5cIixjb2luKTtcbiAgICAgICAgICAgIE1zZy5TaG93KGDmga3llpzojrflvpcke2FkZGNvaW596YeR5biBYCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNpZ25CdG4obG9naW5EYXlzKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0NhbkJvbnVzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZUFsbFNpZ25CdG4oKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTXNnLlNob3coXCLku4rml6Xlt7Lnrb7liLAs6K+35piO5pel5YaN5p2lIVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuKiDov5Tlm55cbiovXG4gICAgb25OZXdCYWNrSG9tZUNsaWNrOiBib29sZWFuID0gdHJ1ZTtcbiAgICBCYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5vbk5ld0JhY2tIb21lQ2xpY2sgJiYgVUlTaWduLm5hdGl2ZV9oYXZlX3Nob3cpIHtcbiAgICAgICAgICAgIHRoaXMub25OZXdCYWNrSG9tZUNsaWNrID0gZmFsc2VcbiAgICAgICAgICAgIEV4cG9ydC5jbGlja19uYXRpdmVfWVNBRChcIllTQk5cIikgLy8g6Kem5Y+ReXNiblxuICAgICAgICB9IGVsc2UgeyAvLyDlkKbliJnlm57liLDmuLjmiI9cbiAgICAgICAgICAgIHRoaXMub25OZXdCYWNrSG9tZUNsaWNrID0gdHJ1ZVxuICAgICAgICAgICAgVUlTaWduLm5hdGl2ZV9oYXZlX3Nob3cgPSBmYWxzZVxuICAgICAgICAgICAgRXhwb3J0LmhpZGVfbmFpdmVfWVNBRCgnWVNCTicpIC8vIOmakOiXj+WOn+eUn+W5v+WRiiDkvKAnWVNCTifvvIzmhI/mgJ3mmK/lkIzml7bkvJrpooTliqDovb1ZU0JOXG4gICAgICAgICAgICAvLyBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5zZWxlY3QpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsb3NlKCkge1xuICAgICAgICBpZiAoVUlTaWduLm9rYnRuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICBVSVNpZ24ub2tidG5fY2FsbGJhY2soKVxuICAgICAgICB9XG4gICAgICAgIGNjLmdhbWUudGFyZ2V0T2ZmKHRoaXMpO1xuICAgICAgICB0aGlzLnR3ZWVOb2RlT3V0KHRoaXMubm9kZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKuWIpOaWreaYr+WQpuWPr+S7peetvuWIsCAqL1xuICAgIHByaXZhdGUgX2NoZWNrQ2FuQm9udXMoKSB7XG4gICAgICAgIHZhciBpc1Jld2FyZCA9IE51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwiaXNHZXREYWlseVJld2FyZFwiKSlcbiAgICAgICAgY2MubG9nKFwiX2NoZWNrQ2FuQm9udXMgaXNSZXdhcmQ6XCIsaXNSZXdhcmQpXG4gICAgICAgIGlmIChpc1Jld2FyZCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW5Cb251cyA9IHRydWVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NhbkJvbnVzID0gZmFsc2VcbiAgICB9XG4gICAgLy/mm7TmlrDpooblj5bmg4XlhrVcbiAgICBwcml2YXRlIF91cGRhdGVQYW5lbCgpIHtcbiAgICAgICAgdGhpcy5fY2hlY2tDYW5Cb251cygpO1xuICAgICAgICBpZiAodGhpcy5fY2FuQm9udXMgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IGxvZ2luRGF5cz1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImxvZ2luRGF5c1wiKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsb2dpbkRheXMgKyBcIuesrOWHoOWkqVwiKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNpZ25CdG4obG9naW5EYXlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKirmm7TmlrDnrb7liLDnirbmgIEgKi9cbiAgICBwcml2YXRlIF91cGRhdGVTaWduQnRuKGRheTogbnVtYmVyKSB7XG4gICAgICAgIC8vdGhpcy5faGlkZUFsbFNpZ25CdG4oKTtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDc7IGluZGV4KyspIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGRheSkge1xuICAgICAgICAgICAgICAgIHRoaXMuRW5kU2lnbltpbmRleF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPiBkYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkVuZFNpZ25baW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq5Yi35paw5omA5pyJ562+5Yiw54q25oCBICovXG4gICAgcHJpdmF0ZSBfaGlkZUFsbFNpZ25CdG4oKSB7XG4gICAgICAgIGxldCBsb2dpbkRheXM9TnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJCYXNlXCIsXCJsb2dpbkRheXNcIikpO1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgNzsgaW5kZXgrKykge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IGxvZ2luRGF5cyAmJiB0aGlzLl9jYW5Cb251cykge1xuICAgICAgICAgICAgICAgIHRoaXMuRW5kU2lnbltpbmRleF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID09IGxvZ2luRGF5cyAmJiAhdGhpcy5fY2FuQm9udXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkVuZFNpZ25baW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IGxvZ2luRGF5cykge1xuICAgICAgICAgICAgICAgIHRoaXMuRW5kU2lnbltpbmRleF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPiBsb2dpbkRheXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkVuZFNpZ25baW5kZXhdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XG4gICAgfVxuXG5cbiAgICBcbiAgICBzdGF0aWMgaXNTaG93OmJvb2xlYW4gPSBmYWxzZVxuICAgIHN0YXRpYyBva2J0bl9jYWxsYmFjazpGdW5jdGlvbiAgPSBudWxsXG4gICAgICAgICAgICBcbiAgICBwdWJsaWMgc3RhdGljIFNob3dQYW5lbChjYWxsYmFjazogRnVuY3Rpb24gPSBudWxsKSB7XG4gICAge1xuICAgICAgICAgICAgaWYgKFVJU2lnbi5pc1Nob3cpe1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVUlTaWduLmlzU2hvdyA9IHRydWVcbiAgICAgICAgICAgIFVJU2lnbi5va2J0bl9jYWxsYmFjayA9IG51bGxcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy91aS9zaWduUGFuZWxcIiwgY2MuUHJlZmFiLCAoZXJyb3I6RXJyb3IsIHJlc291cmNlOmNjLlByZWZhYikgPT4ge1xuICAgICAgICAgICAgICAgIFVJU2lnbi5pc1Nob3cgPSBmYWxzZVxuICAgICAgICAgICAgICAgIFVJU2lnbi5va2J0bl9jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5hZGRDaGlsZChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy5WZWMzLlpFUk87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufVxuIl19