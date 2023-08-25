"use strict";
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