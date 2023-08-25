
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/sdk/Constant.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f852bjTRuNJxLtQma6Gkp/Z', 'Constant');
// scripts/sdk/Constant.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleState = exports.PicItem = exports.maxLineLength = exports.Levelitem = exports.SkinInfo = exports.ColliderTag = exports.EventName = exports.PanelName = exports.PageName = exports.Turn = exports.PlayerDirect = exports.KeyAndLock = exports.GameState = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Constant = /** @class */ (function () {
    function Constant() {
    }
    /**
     * 每个主题多少关
     */
    Constant.CT_LevelCountPerTheme = 10;
    /**
     * 皮肤总数量
     */
    Constant.CT_SkinCount = 6;
    /**
     * 总关卡数量
     */
    Constant.CT_TotalLevelCount = 140;
    /**主页关卡主题 */
    Constant.levelTheme = 0;
    /**统计每一个主题星星数量 */
    Constant.CT_LevelThemeNum = 0;
    /**
     * 每过一关奖励钻石数量
     */
    Constant.CT_RewardDiamondCount = 20;
    /**每关获得的星星数量 */
    Constant.ST_StarNum = "StarNum";
    /**游戏胜利星星数量 */
    Constant.WinStar = 3;
    /**
     * 每日签到的金额
     */
    Constant.Money = [200, 2, 350, 5, 500, 10, 20];
    /**今日奖励 */
    Constant.LastDailyBonusIndex = "LastDailyBonusIndex";
    /**今日签到的时间 */
    Constant.LastDailyBonusTime = "LastDailyBonusTime";
    /**游戏数据 */
    Constant.ST_GameData = "GameData";
    /**当前擦除关卡 */
    Constant.ST_CurLevelId1 = "CurLevelId1";
    /**当前画画关卡 */
    Constant.ST_CurLevelId2 = "CurLevelId2";
    /**当前剧情关卡 */
    Constant.ST_CurLevelId3 = "CurLevelId3";
    /**当前挑战关卡 */
    Constant.ST_CurLevelId4 = "CurLevelId4";
    /**当前关卡类型 */
    Constant.ST_CurLevelType = "CruLevelType";
    /**最大解锁关卡 */
    Constant.ST_MaxUnlockLevelCount = "MaxUnlockLevelCount";
    /**声音 */
    Constant.ST_AudioOn = "AudioOn";
    //第一次进游戏,点击开始就是进入到关卡选择页面
    Constant.ST_firstLevel = "ST_firstLevel";
    /**金钱 */
    Constant.ST_CoinCount = "CoinCount";
    /**
     * 事件：选择皮肤
     */
    Constant.E_SELECT_SKIN = "select_skin";
    Constant.ST_Privacy = "ST_Privacy";
    Constant.ST_ShakeOn = "ST_ShakeOn"; //震动开关
    Constant.ST_SignOnceOn = "SignOnceOn";
    Constant.ST_SignOnceOnTime = "ST_SignOnceOnTime";
    //task
    Constant.ST_task = "ST_task"; //1,2,3,4,5
    Constant.ST_taskFinish = "ST_taskFinish"; //1,2,3,4,5
    Constant.ST_taskTime = "ST_task_time";
    Constant.ST_taskTimeSec = "ST_task_timesec";
    Constant.ST_boxTM = "ST_boxTM";
    //
    Constant.ST_PicItem = "ST_PicItem";
    /**
     * 事件：试用皮肤
     */
    Constant.E_TRY_SKIN = "try_skin";
    /**皮肤 */
    Constant.ST_SkinInfo = "SkinInfo";
    /**皮肤id */
    Constant.ST_CurSkinId = "ST_CurSkinId";
    /**擦除关卡 */
    Constant.ST_LevelItem1 = "LevelItem1";
    /**画画关卡 */
    Constant.ST_LevelItem2 = "LevelItem2";
    /**剧情关卡 */
    Constant.ST_LevelItem3 = "LevelItem3";
    /**挑战关卡 */
    Constant.ST_LevelItem4 = "LevelItem4";
    /**体力 */
    Constant.EnergyNum = "EnergyNum";
    Constant.ST_energyTM = "ST_energyTM";
    /**更新体力 */
    Constant.E_UPDATE_ENERGY = "E_UPDATE_ENERGY";
    Constant.E_VIEW_SKIN = "E_VIEW_SKIN";
    /**商店导航栏切换通知 */
    Constant.Navigation_Bar = "Navigation_Bar";
    /** 游戏逻辑事件*/
    Constant.E_GAME_LOGIC = "E_GAME_LOGIC";
    /** 游戏更新进度条*/
    Constant.E_UPDATE_PROGRESS = "E_UPDATE_PROGRESS";
    /** 根据画线长度计算进度条 */
    Constant.E_DRAWLINE_LENGTH = "E_DRAWLINE_LENGTH";
    /**事件:开始游戏 */
    Constant.E_GAME_START = "E_GAME_START";
    /**游戏失败 */
    Constant.E_LEVEL_FAILED = "E_LEVEL_FAILED";
    /**游戏完成 */
    Constant.E_LEVEL_COMPLETE = "E_LEVEL_COMPLETE";
    /**
     * 事件：刷新关卡进度条
     */
    Constant.E_UPDATE_DISTANCE = "E_UPDATE_DISTANCE";
    /**
     * 事件:游戏胜利
     */
    Constant.E_GAME_VECTORY = "put_game_vectory";
    /**事件:返回主界面 */
    Constant.E_BACK_HOME = "back_home";
    /**点击屏幕 */
    Constant.E_TOUCH_SCREEN = "touch_screen";
    /**更新金币 */
    Constant.E_UPDATE_COIN = "update_coin";
    /**更新商店金币 */
    Constant.E_SHOP_UPDATE_COIN = "shop_update_coin";
    /**商店皮肤解锁 */
    Constant.E_SHOP_OFLOCK = "E_SHOP_OFLOCK";
    Constant = __decorate([
        ccclass
    ], Constant);
    return Constant;
}());
exports.default = Constant;
var GameState;
(function (GameState) {
    GameState[GameState["None"] = -1] = "None";
    GameState[GameState["Prepare"] = 0] = "Prepare";
    GameState[GameState["Start"] = 1] = "Start";
    GameState[GameState["Success"] = 2] = "Success";
    GameState[GameState["Failed"] = 3] = "Failed";
})(GameState = exports.GameState || (exports.GameState = {}));
var KeyAndLock;
(function (KeyAndLock) {
    KeyAndLock[KeyAndLock["None"] = -1] = "None";
    /**蓝色 */
    KeyAndLock[KeyAndLock["Blue"] = 0] = "Blue";
    /**粉色 */
    KeyAndLock[KeyAndLock["Pink"] = 1] = "Pink";
    /**紫色 */
    KeyAndLock[KeyAndLock["Purple"] = 2] = "Purple";
    /**红色 */
    KeyAndLock[KeyAndLock["Red"] = 3] = "Red";
})(KeyAndLock = exports.KeyAndLock || (exports.KeyAndLock = {}));
var PlayerDirect;
(function (PlayerDirect) {
    PlayerDirect[PlayerDirect["Unkown"] = 0] = "Unkown";
    PlayerDirect[PlayerDirect["Down"] = 1] = "Down";
    PlayerDirect[PlayerDirect["Top"] = 2] = "Top";
    PlayerDirect[PlayerDirect["Left"] = 3] = "Left";
    PlayerDirect[PlayerDirect["Right"] = 4] = "Right";
})(PlayerDirect = exports.PlayerDirect || (exports.PlayerDirect = {}));
var Turn;
(function (Turn) {
    Turn[Turn["Default"] = 0] = "Default";
    Turn[Turn["Turn"] = 1] = "Turn";
    Turn[Turn["NoTurn"] = 2] = "NoTurn";
})(Turn = exports.Turn || (exports.Turn = {}));
var PageName = /** @class */ (function () {
    function PageName() {
    }
    /**首页 */
    PageName.UiHome = "UiHome";
    /**加载 */
    PageName.UiLoad = "UiLoad";
    /**游戏 */
    PageName.UiGame = "UiGame";
    /**游戏 */
    PageName.UiGame2 = "UiGame2";
    /**游戏 */
    PageName.UiGame4 = "UiGame4";
    /**选关 */
    PageName.UiLevel = "UiLevel";
    /**商店 */
    PageName.UiShop = "UiShop";
    /**签到 */
    PageName.UiSign = "UiSign";
    /**关卡加载 */
    PageName.UiGameLoad = "UiGameLoad";
    return PageName;
}());
exports.PageName = PageName;
var PanelName = /** @class */ (function () {
    function PanelName() {
    }
    /**暂停 */
    PanelName.PausePanel = "PausePanel";
    /**金币不足 */
    PanelName.CoinTipsPanel = "CoinTipsPanel";
    /**失败 */
    PanelName.FailedPanel = "FailedPanel";
    /**胜利 */
    PanelName.SucceedPanel = "SucceedPanel";
    /**试用皮肤 */
    PanelName.TrialPanel = "TrialPanel";
    /**体力 */
    PanelName.EnergyPanel = "EnergyPanel";
    return PanelName;
}());
exports.PanelName = PanelName;
var EventName = /** @class */ (function () {
    function EventName() {
    }
    /**通知 */
    EventName.EventMsg = "EventMsg";
    /**游戏胜利 */
    EventName.Win = "Win";
    /**游戏失败 */
    EventName.Faid = "Faid";
    /**静态钢体 1:player 101:ston 102:炸弹 */
    EventName.Static = "Static";
    /**动态钢体 1:player 101:ston 102:炸弹*/
    EventName.Dynamic = "Dynamic";
    /**新手引导隐藏 */
    EventName.GuideHide = "GuideHide";
    /**新手引导显示 */
    EventName.GuideDisp = "GuideDisp";
    /**子弹碰撞其他 */
    EventName.BulletOther = "BulletOther";
    /**游戏成功时后续操作 */
    EventName.WinOperate = 'WinOperate';
    /**-----------画线------------- */
    /**画完 */
    EventName.DrawingEnd = "DrawingEnd";
    /**橡皮擦清除 */
    EventName.BtnClear = "BtnClear";
    /**鸭子提示 */
    EventName.BtnDuck = "BtnDuck";
    /**提示抖动 */
    EventName.BtnTispShake = "BtnTispShake";
    return EventName;
}());
exports.EventName = EventName;
var ColliderTag = /** @class */ (function () {
    function ColliderTag() {
    }
    /**绘画的线条 */
    ColliderTag.line = 5;
    /**绘画的碰撞点 */
    ColliderTag.target = 100;
    return ColliderTag;
}());
exports.ColliderTag = ColliderTag;
var SkinInfo = /** @class */ (function () {
    function SkinInfo(str) {
        // cc.log("构建 SkinInfo :", str);
        var info = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            }
            else {
                cc.log("Id 字段不存在!");
            }
            if (info.State) {
                this.State = parseInt(info.State);
            }
            else {
                cc.log("State 字段不存在!");
            }
            if (info.Price) {
                this.Price = parseInt(info.Price);
            }
            else {
                cc.log("Price 字段不存在!");
            }
        }
        else {
            cc.log("构建 SkinInfo 的字符串不合法!");
        }
    }
    SkinInfo.prototype.ToString = function () {
        return "{\"Id\":\"" + this.Id + "\",\"State:\"" + this.State + "\",\"Price\":\"" + this.Price + "\"}";
    };
    return SkinInfo;
}());
exports.SkinInfo = SkinInfo;
var Levelitem = /** @class */ (function () {
    function Levelitem(str) {
        var info = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            }
            else {
                cc.log("Id 字段不存在!");
            }
            if (info.State) {
                this.State = parseInt(info.State);
            }
            else {
                cc.log("State 字段不存在!");
            }
            if (info.Trail) {
                this.Trail = parseInt(info.Trail);
            }
            else {
                cc.log("Trail 字段不存在!");
            }
            if (info.TrailState) {
                this.TrailState = parseInt(info.TrailState);
            }
            else {
                cc.log("TrailState 字段不存在!");
            }
            if (info.prog) {
                this.prog = parseInt(info.prog);
            }
            else {
                cc.log("TrailState 字段不存在!");
            }
        }
        else {
            cc.log("构建 Levelitem 的字符串不合法!");
        }
    }
    Levelitem.prototype.ToString = function () {
        return "{\"Id\":\"" + this.Id + "\",\"Trail\":\"" + this.Trail + "\",\"State:\"" + this.State + "\",\"TrailState\":\"" + this.TrailState + "\"}";
    };
    return Levelitem;
}());
exports.Levelitem = Levelitem;
/**画线关卡线段最大长度 */
var maxLineLength = /** @class */ (function () {
    function maxLineLength() {
    }
    return maxLineLength;
}());
exports.maxLineLength = maxLineLength;
var PicItem = /** @class */ (function () {
    function PicItem(str) {
        var info = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            }
            else {
                cc.log("Id 字段不存在!");
            }
            if (info.State) {
                this.State = parseInt(info.State);
            }
            else {
                cc.log("State 字段不存在!");
            }
        }
        else {
            cc.log("构建 Levelitem 的字符串不合法!");
        }
    }
    PicItem.prototype.ToString = function () {
        return "{\"Id\":\"" + this.Id + "\",\"State:\"" + this.State + "\"}";
    };
    return PicItem;
}());
exports.PicItem = PicItem;
var RoleState;
(function (RoleState) {
    RoleState[RoleState["idle"] = 0] = "idle";
    RoleState[RoleState["move"] = 1] = "move";
    RoleState[RoleState["dead"] = 2] = "dead";
    RoleState[RoleState["finish"] = 3] = "finish";
})(RoleState = exports.RoleState || (exports.RoleState = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2RrXFxDb25zdGFudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFBO0lBMElBLENBQUM7SUF4SUc7O09BRUc7SUFDVyw4QkFBcUIsR0FBVyxFQUFFLENBQUM7SUFDakQ7O09BRUc7SUFDVyxxQkFBWSxHQUFXLENBQUMsQ0FBQztJQUN2Qzs7T0FFRztJQUNXLDJCQUFrQixHQUFXLEdBQUcsQ0FBQztJQUUvQyxZQUFZO0lBQ0UsbUJBQVUsR0FBVyxDQUFDLENBQUM7SUFFckMsaUJBQWlCO0lBQ0gseUJBQWdCLEdBQVcsQ0FBQyxDQUFDO0lBQzNDOztPQUVHO0lBQ1csOEJBQXFCLEdBQVcsRUFBRSxDQUFDO0lBRWpELGVBQWU7SUFDRCxtQkFBVSxHQUFXLFNBQVMsQ0FBQztJQUU3QyxjQUFjO0lBQ0EsZ0JBQU8sR0FBVyxDQUFDLENBQUM7SUFFbEM7O09BRUc7SUFDVyxjQUFLLEdBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUU5RCxVQUFVO0lBQ0ksNEJBQW1CLEdBQVcscUJBQXFCLENBQUM7SUFDbEUsYUFBYTtJQUNDLDJCQUFrQixHQUFXLG9CQUFvQixDQUFDO0lBQ2hFLFVBQVU7SUFDSSxvQkFBVyxHQUFXLFVBQVUsQ0FBQztJQUMvQyxZQUFZO0lBQ0UsdUJBQWMsR0FBVyxhQUFhLENBQUM7SUFDckQsWUFBWTtJQUNFLHVCQUFjLEdBQVcsYUFBYSxDQUFDO0lBQ3JELFlBQVk7SUFDRSx1QkFBYyxHQUFXLGFBQWEsQ0FBQztJQUNyRCxZQUFZO0lBQ0UsdUJBQWMsR0FBVyxhQUFhLENBQUM7SUFDckQsWUFBWTtJQUNFLHdCQUFlLEdB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XG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnN0YW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOavj+S4quS4u+mimOWkmuWwkeWFs1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENUX0xldmVsQ291bnRQZXJUaGVtZTogbnVtYmVyID0gMTA7XHJcbiAgICAvKipcclxuICAgICAqIOearuiCpOaAu+aVsOmHj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENUX1NraW5Db3VudDogbnVtYmVyID0gNjtcclxuICAgIC8qKlxyXG4gICAgICog5oC75YWz5Y2h5pWw6YePXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ1RfVG90YWxMZXZlbENvdW50OiBudW1iZXIgPSAxNDA7XHJcblxyXG4gICAgLyoq5Li76aG15YWz5Y2h5Li76aKYICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGxldmVsVGhlbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoq57uf6K6h5q+P5LiA5Liq5Li76aKY5pif5pif5pWw6YePICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENUX0xldmVsVGhlbWVOdW06IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOavj+i/h+S4gOWFs+WlluWKsemSu+efs+aVsOmHj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIENUX1Jld2FyZERpYW1vbmRDb3VudDogbnVtYmVyID0gMjA7XHJcblxyXG4gICAgLyoq5q+P5YWz6I635b6X55qE5pif5pif5pWw6YePICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX1N0YXJOdW06IHN0cmluZyA9IFwiU3Rhck51bVwiO1xyXG5cclxuICAgIC8qKua4uOaIj+iDnOWIqeaYn+aYn+aVsOmHjyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXaW5TdGFyOiBudW1iZXIgPSAzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P5pel562+5Yiw55qE6YeR6aKdXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTW9uZXk6IG51bWJlcltdID0gWzIwMCwgMiwgMzUwLCA1LCA1MDAsIDEwLCAyMF07XHJcblxyXG4gICAgLyoq5LuK5pel5aWW5YqxICovXHJcbiAgICBwdWJsaWMgc3RhdGljIExhc3REYWlseUJvbnVzSW5kZXg6IHN0cmluZyA9IFwiTGFzdERhaWx5Qm9udXNJbmRleFwiO1xyXG4gICAgLyoq5LuK5pel562+5Yiw55qE5pe26Ze0ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIExhc3REYWlseUJvbnVzVGltZTogc3RyaW5nID0gXCJMYXN0RGFpbHlCb251c1RpbWVcIjtcclxuICAgIC8qKua4uOaIj+aVsOaNriAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9HYW1lRGF0YTogc3RyaW5nID0gXCJHYW1lRGF0YVwiO1xyXG4gICAgLyoq5b2T5YmN5pOm6Zmk5YWz5Y2hICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0N1ckxldmVsSWQxOiBzdHJpbmcgPSBcIkN1ckxldmVsSWQxXCI7XHJcbiAgICAvKirlvZPliY3nlLvnlLvlhbPljaEgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfQ3VyTGV2ZWxJZDI6IHN0cmluZyA9IFwiQ3VyTGV2ZWxJZDJcIjtcclxuICAgIC8qKuW9k+WJjeWJp+aDheWFs+WNoSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9DdXJMZXZlbElkMzogc3RyaW5nID0gXCJDdXJMZXZlbElkM1wiO1xyXG4gICAgLyoq5b2T5YmN5oyR5oiY5YWz5Y2hICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0N1ckxldmVsSWQ0OiBzdHJpbmcgPSBcIkN1ckxldmVsSWQ0XCI7XHJcbiAgICAvKirlvZPliY3lhbPljaHnsbvlnosgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfQ3VyTGV2ZWxUeXBlOiBzdHJpbmcgPSBcIkNydUxldmVsVHlwZVwiXHJcbiAgICAvKirmnIDlpKfop6PplIHlhbPljaEgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfTWF4VW5sb2NrTGV2ZWxDb3VudDogc3RyaW5nID0gXCJNYXhVbmxvY2tMZXZlbENvdW50XCI7XHJcbiAgICAvKirlo7Dpn7MgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfQXVkaW9Pbjogc3RyaW5nID0gXCJBdWRpb09uXCI7XHJcblxyXG4gICAgLy/nrKzkuIDmrKHov5vmuLjmiI8s54K55Ye75byA5aeL5bCx5piv6L+b5YWl5Yiw5YWz5Y2h6YCJ5oup6aG16Z2iXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX2ZpcnN0TGV2ZWw6IHN0cmluZyA9IFwiU1RfZmlyc3RMZXZlbFwiO1xyXG5cclxuICAgIC8qKumHkemSsSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9Db2luQ291bnQ6IHN0cmluZyA9IFwiQ29pbkNvdW50XCI7XHJcbiAgICAvKipcclxuICAgICAqIOS6i+S7tu+8mumAieaLqeearuiCpFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEVfU0VMRUNUX1NLSU46IHN0cmluZyA9IFwic2VsZWN0X3NraW5cIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX1ByaXZhY3k6IHN0cmluZyA9IFwiU1RfUHJpdmFjeVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9TaGFrZU9uOiBzdHJpbmcgPSBcIlNUX1NoYWtlT25cIjsgLy/pnIfliqjlvIDlhbNcclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfU2lnbk9uY2VPbjogc3RyaW5nID0gXCJTaWduT25jZU9uXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX1NpZ25PbmNlT25UaW1lOiBzdHJpbmcgPSBcIlNUX1NpZ25PbmNlT25UaW1lXCI7XHJcblxyXG4gICAgLy90YXNrXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX3Rhc2s6IHN0cmluZyA9IFwiU1RfdGFza1wiOy8vMSwyLDMsNCw1XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX3Rhc2tGaW5pc2g6IHN0cmluZyA9IFwiU1RfdGFza0ZpbmlzaFwiOy8vMSwyLDMsNCw1XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX3Rhc2tUaW1lOiBzdHJpbmcgPSBcIlNUX3Rhc2tfdGltZVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF90YXNrVGltZVNlYzogc3RyaW5nID0gXCJTVF90YXNrX3RpbWVzZWNcIjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX2JveFRNOnN0cmluZyA9IFwiU1RfYm94VE1cIjtcclxuXHJcbiAgICAvL1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9QaWNJdGVtOnN0cmluZyA9IFwiU1RfUGljSXRlbVwiO1xyXG4gICAgLyoqXHJcbiAgICAgKiDkuovku7bvvJror5XnlKjnmq7ogqRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBFX1RSWV9TS0lOOiBzdHJpbmcgPSBcInRyeV9za2luXCI7XHJcbiAgICAvKirnmq7ogqQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU1RfU2tpbkluZm86IHN0cmluZyA9IFwiU2tpbkluZm9cIjtcclxuICAgIC8qKuearuiCpGlkICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX0N1clNraW5JZDogc3RyaW5nID0gXCJTVF9DdXJTa2luSWRcIjtcclxuICAgIC8qKuaTpumZpOWFs+WNoSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9MZXZlbEl0ZW0xOiBzdHJpbmcgPSBcIkxldmVsSXRlbTFcIjtcclxuICAgIC8qKueUu+eUu+WFs+WNoSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9MZXZlbEl0ZW0yOiBzdHJpbmcgPSBcIkxldmVsSXRlbTJcIjtcclxuICAgIC8qKuWJp+aDheWFs+WNoSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9MZXZlbEl0ZW0zOiBzdHJpbmcgPSBcIkxldmVsSXRlbTNcIjtcclxuICAgIC8qKuaMkeaImOWFs+WNoSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTVF9MZXZlbEl0ZW00OiBzdHJpbmcgPSBcIkxldmVsSXRlbTRcIjtcclxuICAgIC8qKuS9k+WKmyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBFbmVyZ3lOdW06IHN0cmluZyA9IFwiRW5lcmd5TnVtXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUX2VuZXJneVRNOnN0cmluZyA9IFwiU1RfZW5lcmd5VE1cIjtcclxuICAgIC8qKuabtOaWsOS9k+WKmyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBFX1VQREFURV9FTkVSR1k6IHN0cmluZyA9IFwiRV9VUERBVEVfRU5FUkdZXCI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBFX1ZJRVdfU0tJTjogc3RyaW5nID0gXCJFX1ZJRVdfU0tJTlwiO1xyXG4gICAgLyoq5ZWG5bqX5a+86Iiq5qCP5YiH5o2i6YCa55+lICovXHJcbiAgICBwdWJsaWMgc3RhdGljIE5hdmlnYXRpb25fQmFyOiBzdHJpbmcgPSBcIk5hdmlnYXRpb25fQmFyXCI7XHJcbiAgICAvKiog5ri45oiP6YC76L6R5LqL5Lu2Ki9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9HQU1FX0xPR0lDOiBzdHJpbmcgPSBcIkVfR0FNRV9MT0dJQ1wiO1xyXG4gICAgLyoqIOa4uOaIj+abtOaWsOi/m+W6puadoSovXHJcbiAgICBwdWJsaWMgc3RhdGljIEVfVVBEQVRFX1BST0dSRVNTOiBzdHJpbmcgPSBcIkVfVVBEQVRFX1BST0dSRVNTXCI7XHJcbiAgICAvKiog5qC55o2u55S757q/6ZW/5bqm6K6h566X6L+b5bqm5p2hICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEVfRFJBV0xJTkVfTEVOR1RIOiBzdHJpbmcgPSBcIkVfRFJBV0xJTkVfTEVOR1RIXCI7XHJcblxyXG4gICAgLyoq5LqL5Lu2OuW8gOWni+a4uOaIjyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBFX0dBTUVfU1RBUlQ6IHN0cmluZyA9IFwiRV9HQU1FX1NUQVJUXCI7XHJcbiAgICAvKirmuLjmiI/lpLHotKUgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9MRVZFTF9GQUlMRUQ6IHN0cmluZyA9IFwiRV9MRVZFTF9GQUlMRURcIjtcclxuICAgIC8qKua4uOaIj+WujOaIkCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBFX0xFVkVMX0NPTVBMRVRFOiBzdHJpbmcgPSBcIkVfTEVWRUxfQ09NUExFVEVcIjtcclxuICAgIC8qKlxyXG4gICAgICog5LqL5Lu277ya5Yi35paw5YWz5Y2h6L+b5bqm5p2hXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9VUERBVEVfRElTVEFOQ0U6IHN0cmluZyA9IFwiRV9VUERBVEVfRElTVEFOQ0VcIjtcclxuICAgIC8qKlxyXG4gICAgICog5LqL5Lu2Oua4uOaIj+iDnOWIqVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEVfR0FNRV9WRUNUT1JZOiBzdHJpbmcgPSBcInB1dF9nYW1lX3ZlY3RvcnlcIjtcclxuICAgIC8qKuS6i+S7tjrov5Tlm57kuLvnlYzpnaIgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9CQUNLX0hPTUU6IHN0cmluZyA9IFwiYmFja19ob21lXCI7XHJcbiAgICAvKirngrnlh7vlsY/luZUgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9UT1VDSF9TQ1JFRU46IHN0cmluZyA9IFwidG91Y2hfc2NyZWVuXCI7XHJcbiAgICAvKirmm7TmlrDph5HluIEgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9VUERBVEVfQ09JTjogc3RyaW5nID0gXCJ1cGRhdGVfY29pblwiO1xyXG4gICAgLyoq5pu05paw5ZWG5bqX6YeR5biBICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEVfU0hPUF9VUERBVEVfQ09JTjogc3RyaW5nID0gXCJzaG9wX3VwZGF0ZV9jb2luXCI7XHJcbiAgICAvKirllYblupfnmq7ogqTop6PplIEgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRV9TSE9QX09GTE9DSzogc3RyaW5nID0gXCJFX1NIT1BfT0ZMT0NLXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEdhbWVTdGF0ZSB7XHJcbiAgICBOb25lID0gLTEsXHJcbiAgICBQcmVwYXJlID0gMCxcclxuICAgIFN0YXJ0ID0gMSxcclxuICAgIFN1Y2Nlc3MgPSAyLFxyXG4gICAgRmFpbGVkID0gM1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBLZXlBbmRMb2NrIHtcclxuICAgIE5vbmUgPSAtMSxcclxuICAgIC8qKuiTneiJsiAqL1xyXG4gICAgQmx1ZSA9IDAsXHJcbiAgICAvKirnsonoibIgKi9cclxuICAgIFBpbmsgPSAxLFxyXG4gICAgLyoq57Sr6ImyICovXHJcbiAgICBQdXJwbGUgPSAyLFxyXG4gICAgLyoq57qi6ImyICovXHJcbiAgICBSZWQgPSAzXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZW51bSBQbGF5ZXJEaXJlY3Qge1xyXG4gICAgVW5rb3duLFxyXG4gICAgRG93bixcclxuICAgIFRvcCxcclxuICAgIExlZnQsXHJcbiAgICBSaWdodFxyXG59XHJcblxyXG5leHBvcnQgZW51bSBUdXJuIHtcclxuICAgIERlZmF1bHQsLy89IFwi6buY6K6kXCIsXHJcbiAgICBUdXJuLC8vPSBcIuaOieWktFwiLFxyXG4gICAgTm9UdXJuLC8vID0gXCLkuI3mjonlpLRcIixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VOYW1lIHtcclxuICAgIC8qKummlumhtSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVaUhvbWU6IHN0cmluZyA9IFwiVWlIb21lXCI7XHJcbiAgICAvKirliqDovb0gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVWlMb2FkOiBzdHJpbmcgPSBcIlVpTG9hZFwiO1xyXG4gICAgLyoq5ri45oiPICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVpR2FtZTogc3RyaW5nID0gXCJVaUdhbWVcIjtcclxuICAgIC8qKua4uOaIjyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVaUdhbWUyOiBzdHJpbmcgPSBcIlVpR2FtZTJcIjtcclxuICAgIC8qKua4uOaIjyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVaUdhbWU0OiBzdHJpbmcgPSBcIlVpR2FtZTRcIjtcclxuICAgIC8qKumAieWFsyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVaUxldmVsOiBzdHJpbmcgPSBcIlVpTGV2ZWxcIjtcclxuICAgIC8qKuWVhuW6lyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVaVNob3A6IHN0cmluZyA9IFwiVWlTaG9wXCI7XHJcbiAgICAvKirnrb7liLAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVWlTaWduOiBzdHJpbmcgPSBcIlVpU2lnblwiO1xyXG4gICAgLyoq5YWz5Y2h5Yqg6L29ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVpR2FtZUxvYWQ6IHN0cmluZyA9IFwiVWlHYW1lTG9hZFwiO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBhbmVsTmFtZSB7XHJcbiAgICAvKirmmoLlgZwgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgUGF1c2VQYW5lbDogc3RyaW5nID0gXCJQYXVzZVBhbmVsXCI7XHJcbiAgICAvKirph5HluIHkuI3otrMgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQ29pblRpcHNQYW5lbDogc3RyaW5nID0gXCJDb2luVGlwc1BhbmVsXCI7XHJcbiAgICAvKirlpLHotKUgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRmFpbGVkUGFuZWw6IHN0cmluZyA9IFwiRmFpbGVkUGFuZWxcIjtcclxuICAgIC8qKuiDnOWIqSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTdWNjZWVkUGFuZWw6IHN0cmluZyA9IFwiU3VjY2VlZFBhbmVsXCI7XHJcbiAgICAvKiror5XnlKjnmq7ogqQgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgVHJpYWxQYW5lbDogc3RyaW5nID0gXCJUcmlhbFBhbmVsXCI7XHJcbiAgICAvKirkvZPlipsgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRW5lcmd5UGFuZWw6IHN0cmluZyA9IFwiRW5lcmd5UGFuZWxcIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50TmFtZSB7XHJcbiAgICAvKirpgJrnn6UgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRXZlbnRNc2c6IHN0cmluZyA9IFwiRXZlbnRNc2dcIjtcclxuICAgIC8qKua4uOaIj+iDnOWIqSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBXaW46IHN0cmluZyA9IFwiV2luXCI7XHJcbiAgICAvKirmuLjmiI/lpLHotKUgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRmFpZDogc3RyaW5nID0gXCJGYWlkXCI7XHJcbiAgICAvKirpnZnmgIHpkqLkvZMgMTpwbGF5ZXIgMTAxOnN0b24gMTAyOueCuOW8uSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTdGF0aWM6IHN0cmluZyA9IFwiU3RhdGljXCI7XHJcbiAgICAvKirliqjmgIHpkqLkvZMgMTpwbGF5ZXIgMTAxOnN0b24gMTAyOueCuOW8uSovXHJcbiAgICBwdWJsaWMgc3RhdGljIER5bmFtaWM6IHN0cmluZyA9IFwiRHluYW1pY1wiO1xyXG4gICAgLyoq5paw5omL5byV5a+86ZqQ6JePICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEd1aWRlSGlkZTogc3RyaW5nID0gXCJHdWlkZUhpZGVcIjtcclxuICAgIC8qKuaWsOaJi+W8leWvvOaYvuekuiAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHdWlkZURpc3A6IHN0cmluZyA9IFwiR3VpZGVEaXNwXCI7XHJcbiAgICAvKirlrZDlvLnnorDmkp7lhbbku5YgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQnVsbGV0T3RoZXI6IHN0cmluZyA9IFwiQnVsbGV0T3RoZXJcIjtcclxuXHJcbiAgICAvKirmuLjmiI/miJDlip/ml7blkI7nu63mk43kvZwgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgV2luT3BlcmF0ZTogc3RyaW5nID0gJ1dpbk9wZXJhdGUnO1xyXG5cclxuICAgIC8qKi0tLS0tLS0tLS0t55S757q/LS0tLS0tLS0tLS0tLSAqL1xyXG4gICAgLyoq55S75a6MICovXHJcbiAgICBwdWJsaWMgc3RhdGljIERyYXdpbmdFbmQ6IHN0cmluZyA9IFwiRHJhd2luZ0VuZFwiO1xyXG4gICAgLyoq5qmh55qu5pOm5riF6ZmkICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEJ0bkNsZWFyOiBzdHJpbmcgPSBcIkJ0bkNsZWFyXCI7XHJcbiAgICAvKirpuK3lrZDmj5DnpLogKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgQnRuRHVjazogc3RyaW5nID0gXCJCdG5EdWNrXCI7XHJcblxyXG4gICAgLyoq5o+Q56S65oqW5YqoICovXHJcbiAgICBwdWJsaWMgc3RhdGljIEJ0blRpc3BTaGFrZTogc3RyaW5nID0gXCJCdG5UaXNwU2hha2VcIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbGxpZGVyVGFnIHtcclxuICAgIC8qKue7mOeUu+eahOe6v+adoSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsaW5lOiBudW1iZXIgPSA1O1xyXG4gICAgLyoq57uY55S755qE56Kw5pKe54K5ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRhcmdldDpudW1iZXIgPSAxMDA7XHJcbn1cclxuZXhwb3J0IGNsYXNzIFNraW5JbmZvIHtcclxuICAgIHB1YmxpYyBJZDogbnVtYmVyO1xyXG4gICAgLyoqMOS7o+ihqOmcgOimgei0reS5sCAx5Luj6KGo5Y+v5Lul5L2/55SoIDLku6PooajmraPlnKjkvb/nlKggKi9cclxuICAgIHB1YmxpYyBTdGF0ZTogbnVtYmVyO1xyXG4gICAgcHVibGljIFByaWNlOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBjYy5sb2coXCLmnoTlu7ogU2tpbkluZm8gOlwiLCBzdHIpO1xyXG4gICAgICAgIGxldCBpbmZvOiBhbnkgPSBKU09OLnBhcnNlKHN0cik7XHJcbiAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgaWYgKGluZm8uSWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSWQgPSBwYXJzZUludChpbmZvLklkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIklkIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbmZvLlN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0YXRlID0gcGFyc2VJbnQoaW5mby5TdGF0ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJTdGF0ZSDlrZfmrrXkuI3lrZjlnKghXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5mby5QcmljZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QcmljZSA9IHBhcnNlSW50KGluZm8uUHJpY2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiUHJpY2Ug5a2X5q615LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuaehOW7uiBTa2luSW5mbyDnmoTlrZfnrKbkuLLkuI3lkIjms5UhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBge1wiSWRcIjpcIiR7dGhpcy5JZH1cIixcIlN0YXRlOlwiJHt0aGlzLlN0YXRlfVwiLFwiUHJpY2VcIjpcIiR7dGhpcy5QcmljZX1cIn1gO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTGV2ZWxpdGVtIHtcclxuICAgIHB1YmxpYyBJZDogbnVtYmVyO1xyXG4gICAgcHVibGljIFN0YXRlOiBudW1iZXI7Ly8w5Luj6KGo5pyq6Kej6ZSBICAx5Luj6KGo5pyq5a6M5oiQICAgMuS7o+ihqOWujOaIkCAgM+S7o+ihqOWksei0pVxyXG4gICAgcHVibGljIFRyYWlsOiBudW1iZXI7Ly/npLznm5JcclxuICAgIHB1YmxpYyBUcmFpbFN0YXRlOiBudW1iZXI7Ly/npLznm5Llr7nlupTnmoTlhbPljaHnirbmgIEgMOS7o+ihqOS7juacqui/m+WFpe+8jDHku6Pooajlt7Lov5vlhaVcclxuICAgIHB1YmxpYyBwcm9nOiBudW1iZXI7Ly/liafmg4XlhbPljaHnibnmnIks5YWz5Y2h6L+b5bqmXHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaW5mbzogYW55ID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZvLklkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklkID0gcGFyc2VJbnQoaW5mby5JZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJJZCDlrZfmrrXkuI3lrZjlnKghXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5mby5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGF0ZSA9IHBhcnNlSW50KGluZm8uU3RhdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiU3RhdGUg5a2X5q615LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGluZm8uVHJhaWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHJhaWwgPSBwYXJzZUludChpbmZvLlRyYWlsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZyhcIlRyYWlsIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbmZvLlRyYWlsU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVHJhaWxTdGF0ZSA9IHBhcnNlSW50KGluZm8uVHJhaWxTdGF0ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJUcmFpbFN0YXRlIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpbmZvLnByb2cpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZyA9IHBhcnNlSW50KGluZm8ucHJvZyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJUcmFpbFN0YXRlIOWtl+auteS4jeWtmOWcqCFcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5sb2coXCLmnoTlu7ogTGV2ZWxpdGVtIOeahOWtl+espuS4suS4jeWQiOazlSFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIFRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiBge1wiSWRcIjpcIiR7dGhpcy5JZH1cIixcIlRyYWlsXCI6XCIke3RoaXMuVHJhaWx9XCIsXCJTdGF0ZTpcIiR7dGhpcy5TdGF0ZX1cIixcIlRyYWlsU3RhdGVcIjpcIiR7dGhpcy5UcmFpbFN0YXRlfVwifWA7XHJcbiAgICB9XHJcbn1cclxuLyoq55S757q/5YWz5Y2h57q/5q615pyA5aSn6ZW/5bqmICovXHJcbmV4cG9ydCBjbGFzcyBtYXhMaW5lTGVuZ3RoIHtcclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUGljSXRlbSB7XHJcbiAgICBwdWJsaWMgSWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBTdGF0ZTogbnVtYmVyOy8vMOS7o+ihqOacquino+mUgSAgMeS7o+ihqOacquWujOaIkCAgIDLku6PooajlrozmiJAgXHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaW5mbzogYW55ID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgIGlmIChpbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmZvLklkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklkID0gcGFyc2VJbnQoaW5mby5JZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coXCJJZCDlrZfmrrXkuI3lrZjlnKghXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaW5mby5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGF0ZSA9IHBhcnNlSW50KGluZm8uU3RhdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2MubG9nKFwiU3RhdGUg5a2X5q615LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNjLmxvZyhcIuaehOW7uiBMZXZlbGl0ZW0g55qE5a2X56ym5Liy5LiN5ZCI5rOVIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIGB7XCJJZFwiOlwiJHt0aGlzLklkfVwiLFwiU3RhdGU6XCIke3RoaXMuU3RhdGV9XCJ9YDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBlbnVtIFJvbGVTdGF0ZSB7XHJcbiAgICBpZGxlID0gMCxcclxuICAgIG1vdmUsXHJcbiAgICBkZWFkLFxyXG4gICAgZmluaXNoXHJcblxyXG59Il19