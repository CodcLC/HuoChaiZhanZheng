

const { ccclass, property } = cc._decorator;

@ccclass
export default class Constant {

    /**
     * 每个主题多少关
     */
    public static CT_LevelCountPerTheme: number = 10;
    /**
     * 皮肤总数量
     */
    public static CT_SkinCount: number = 6;
    /**
     * 总关卡数量
     */
    public static CT_TotalLevelCount: number = 140;

    /**主页关卡主题 */
    public static levelTheme: number = 0;

    /**统计每一个主题星星数量 */
    public static CT_LevelThemeNum: number = 0;
    /**
     * 每过一关奖励钻石数量
     */
    public static CT_RewardDiamondCount: number = 20;

    /**每关获得的星星数量 */
    public static ST_StarNum: string = "StarNum";

    /**游戏胜利星星数量 */
    public static WinStar: number = 3;

    /**
     * 每日签到的金额
     */
    public static Money: number[] = [200, 2, 350, 5, 500, 10, 20];

    /**今日奖励 */
    public static LastDailyBonusIndex: string = "LastDailyBonusIndex";
    /**今日签到的时间 */
    public static LastDailyBonusTime: string = "LastDailyBonusTime";
    /**游戏数据 */
    public static ST_GameData: string = "GameData";
    /**当前擦除关卡 */
    public static ST_CurLevelId1: string = "CurLevelId1";
    /**当前画画关卡 */
    public static ST_CurLevelId2: string = "CurLevelId2";
    /**当前剧情关卡 */
    public static ST_CurLevelId3: string = "CurLevelId3";
    /**当前挑战关卡 */
    public static ST_CurLevelId4: string = "CurLevelId4";
    /**当前关卡类型 */
    public static ST_CurLevelType: string = "CruLevelType"
    /**最大解锁关卡 */
    public static ST_MaxUnlockLevelCount: string = "MaxUnlockLevelCount";
    /**声音 */
    public static ST_AudioOn: string = "AudioOn";

    //第一次进游戏,点击开始就是进入到关卡选择页面
    public static ST_firstLevel: string = "ST_firstLevel";

    /**金钱 */
    public static ST_CoinCount: string = "CoinCount";
    /**
     * 事件：选择皮肤
     */
    public static E_SELECT_SKIN: string = "select_skin";

    public static ST_Privacy: string = "ST_Privacy";
    public static ST_ShakeOn: string = "ST_ShakeOn"; //震动开关
    public static ST_SignOnceOn: string = "SignOnceOn";
    public static ST_SignOnceOnTime: string = "ST_SignOnceOnTime";

    //task
    public static ST_task: string = "ST_task";//1,2,3,4,5
    public static ST_taskFinish: string = "ST_taskFinish";//1,2,3,4,5
    public static ST_taskTime: string = "ST_task_time";
    public static ST_taskTimeSec: string = "ST_task_timesec";

    public static ST_boxTM:string = "ST_boxTM";

    //
    public static ST_PicItem:string = "ST_PicItem";
    /**
     * 事件：试用皮肤
     */
    public static E_TRY_SKIN: string = "try_skin";
    /**皮肤 */
    public static ST_SkinInfo: string = "SkinInfo";
    /**皮肤id */
    public static ST_CurSkinId: string = "ST_CurSkinId";
    /**擦除关卡 */
    public static ST_LevelItem1: string = "LevelItem1";
    /**画画关卡 */
    public static ST_LevelItem2: string = "LevelItem2";
    /**剧情关卡 */
    public static ST_LevelItem3: string = "LevelItem3";
    /**挑战关卡 */
    public static ST_LevelItem4: string = "LevelItem4";
    /**体力 */
    public static EnergyNum: string = "EnergyNum";
    public static ST_energyTM:string = "ST_energyTM";
    /**更新体力 */
    public static E_UPDATE_ENERGY: string = "E_UPDATE_ENERGY";

    public static E_VIEW_SKIN: string = "E_VIEW_SKIN";
    /**商店导航栏切换通知 */
    public static Navigation_Bar: string = "Navigation_Bar";
    /** 游戏逻辑事件*/
    public static E_GAME_LOGIC: string = "E_GAME_LOGIC";
    /** 游戏更新进度条*/
    public static E_UPDATE_PROGRESS: string = "E_UPDATE_PROGRESS";
    /** 根据画线长度计算进度条 */
    public static E_DRAWLINE_LENGTH: string = "E_DRAWLINE_LENGTH";

    /**事件:开始游戏 */
    public static E_GAME_START: string = "E_GAME_START";
    /**游戏失败 */
    public static E_LEVEL_FAILED: string = "E_LEVEL_FAILED";
    /**游戏完成 */
    public static E_LEVEL_COMPLETE: string = "E_LEVEL_COMPLETE";
    /**
     * 事件：刷新关卡进度条
     */
    public static E_UPDATE_DISTANCE: string = "E_UPDATE_DISTANCE";
    /**
     * 事件:游戏胜利
     */
    public static E_GAME_VECTORY: string = "put_game_vectory";
    /**事件:返回主界面 */
    public static E_BACK_HOME: string = "back_home";
    /**点击屏幕 */
    public static E_TOUCH_SCREEN: string = "touch_screen";
    /**更新金币 */
    public static E_UPDATE_COIN: string = "update_coin";
    /**更新商店金币 */
    public static E_SHOP_UPDATE_COIN: string = "shop_update_coin";
    /**商店皮肤解锁 */
    public static E_SHOP_OFLOCK: string = "E_SHOP_OFLOCK";
}

export enum GameState {
    None = -1,
    Prepare = 0,
    Start = 1,
    Success = 2,
    Failed = 3
}

export enum KeyAndLock {
    None = -1,
    /**蓝色 */
    Blue = 0,
    /**粉色 */
    Pink = 1,
    /**紫色 */
    Purple = 2,
    /**红色 */
    Red = 3
}


export enum PlayerDirect {
    Unkown,
    Down,
    Top,
    Left,
    Right
}

export enum Turn {
    Default,//= "默认",
    Turn,//= "掉头",
    NoTurn,// = "不掉头",
}

export class PageName {
    /**首页 */
    public static UiHome: string = "UiHome";
    /**加载 */
    public static UiLoad: string = "UiLoad";
    /**游戏 */
    public static UiGame: string = "UiGame";
    /**游戏 */
    public static UiGame2: string = "UiGame2";
    /**游戏 */
    public static UiGame4: string = "UiGame4";
    /**选关 */
    public static UiLevel: string = "UiLevel";
    /**商店 */
    public static UiShop: string = "UiShop";
    /**签到 */
    public static UiSign: string = "UiSign";
    /**关卡加载 */
    public static UiGameLoad: string = "UiGameLoad";
}


export class PanelName {
    /**暂停 */
    public static PausePanel: string = "PausePanel";
    /**金币不足 */
    public static CoinTipsPanel: string = "CoinTipsPanel";
    /**失败 */
    public static FailedPanel: string = "FailedPanel";
    /**胜利 */
    public static SucceedPanel: string = "SucceedPanel";
    /**试用皮肤 */
    public static TrialPanel: string = "TrialPanel";
    /**体力 */
    public static EnergyPanel: string = "EnergyPanel";
}

export class EventName {
    /**通知 */
    public static EventMsg: string = "EventMsg";
    /**游戏胜利 */
    public static Win: string = "Win";
    /**游戏失败 */
    public static Faid: string = "Faid";
    /**静态钢体 1:player 101:ston 102:炸弹 */
    public static Static: string = "Static";
    /**动态钢体 1:player 101:ston 102:炸弹*/
    public static Dynamic: string = "Dynamic";
    /**新手引导隐藏 */
    public static GuideHide: string = "GuideHide";
    /**新手引导显示 */
    public static GuideDisp: string = "GuideDisp";
    /**子弹碰撞其他 */
    public static BulletOther: string = "BulletOther";

    /**游戏成功时后续操作 */
    public static WinOperate: string = 'WinOperate';

    /**-----------画线------------- */
    /**画完 */
    public static DrawingEnd: string = "DrawingEnd";
    /**橡皮擦清除 */
    public static BtnClear: string = "BtnClear";
    /**鸭子提示 */
    public static BtnDuck: string = "BtnDuck";

    /**提示抖动 */
    public static BtnTispShake: string = "BtnTispShake";
}

export class ColliderTag {
    /**绘画的线条 */
    public static line: number = 5;
    /**绘画的碰撞点 */
    public static target:number = 100;
}
export class SkinInfo {
    public Id: number;
    /**0代表需要购买 1代表可以使用 2代表正在使用 */
    public State: number;
    public Price: number;

    constructor(str: string) {
        // cc.log("构建 SkinInfo :", str);
        let info: any = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            } else {
                cc.log("Id 字段不存在!");
            }

            if (info.State) {
                this.State = parseInt(info.State);
            } else {
                cc.log("State 字段不存在!");
            }

            if (info.Price) {
                this.Price = parseInt(info.Price);
            } else {
                cc.log("Price 字段不存在!");
            }
        } else {
            cc.log("构建 SkinInfo 的字符串不合法!");
        }

    }

    public ToString() {
        return `{"Id":"${this.Id}","State:"${this.State}","Price":"${this.Price}"}`;
    }
}

export class Levelitem {
    public Id: number;
    public State: number;//0代表未解锁  1代表未完成   2代表完成  3代表失败
    public Trail: number;//礼盒
    public TrailState: number;//礼盒对应的关卡状态 0代表从未进入，1代表已进入
    public prog: number;//剧情关卡特有,关卡进度

    constructor(str: string) {
        let info: any = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            } else {
                cc.log("Id 字段不存在!");
            }

            if (info.State) {
                this.State = parseInt(info.State);
            } else {
                cc.log("State 字段不存在!");
            }

            if (info.Trail) {
                this.Trail = parseInt(info.Trail);
            } else {
                cc.log("Trail 字段不存在!");
            }

            if (info.TrailState) {
                this.TrailState = parseInt(info.TrailState);
            } else {
                cc.log("TrailState 字段不存在!");
            }

            if (info.prog) {
                this.prog = parseInt(info.prog);
            } else {
                cc.log("TrailState 字段不存在!");
            }
        } else {
            cc.log("构建 Levelitem 的字符串不合法!");
        }
    }
    public ToString() {
        return `{"Id":"${this.Id}","Trail":"${this.Trail}","State:"${this.State}","TrailState":"${this.TrailState}"}`;
    }
}
/**画线关卡线段最大长度 */
export class maxLineLength {

}


export class PicItem {
    public Id: number;
    public State: number;//0代表未解锁  1代表未完成   2代表完成 

    constructor(str: string) {
        let info: any = JSON.parse(str);
        if (info) {
            if (info.Id) {
                this.Id = parseInt(info.Id);
            } else {
                cc.log("Id 字段不存在!");
            }

            if (info.State) {
                this.State = parseInt(info.State);
            } else {
                cc.log("State 字段不存在!");
            }
        } else {
            cc.log("构建 Levelitem 的字符串不合法!");
        }
    }
    public ToString() {
        return `{"Id":"${this.Id}","State:"${this.State}"}`;
    }
}


export enum RoleState {
    idle = 0,
    move,
    dead,
    finish

}