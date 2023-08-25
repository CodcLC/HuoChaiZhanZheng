
import { Export } from "../../syyx_sdk/export_sdk";
import Msg from "../Msg";
import { audioName } from "../audioNameMgr";
import Constant from "../sdk/Constant";
import { ad } from "../sdk/ad";
import { data } from "../sdk/data";
import audioManager from "./audioManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UISign extends cc.Component {

    private BackBtn: cc.Node = null;//返回
    private DoubleBtn: cc.Node = null;//两倍按钮
    private BtnSign: cc.Node = null;//直接领取
    /**是否能领取奖励 */
    private _canBonus: boolean = false;
    private ScaleNode: cc.Node = null;
    /**已领取 */
    private EndSign: cc.Node[] = [];

        /**
     * 每日签到的金额
     */
    public MoneyNum: number[] = [500, 1000, 1500, 2000, 3000, 5000, 10000];

    onLoad() {
        this._onLoad()
    }

    private _onLoad() {
        this.BackBtn = cc.find("ScaleNode/BackBtn", this.node);
        this.DoubleBtn = cc.find("ScaleNode/BtnDouble", this.node);
        this.BtnSign = cc.find("ScaleNode/BtnSign", this.node);     
        this.ScaleNode = cc.find("ScaleNode", this.node);     
        this._start();
    }

    private _start() {
        for (let index = 0; index < 7; index++) {
            let day: cc.Node = this.ScaleNode.getChildByName("SignBtn" + (index + 1));
            let not: cc.Node = day.getChildByName("dui");
            this.EndSign.push(not);
        }
        // this.DoubleBtn.on(cc.Node.EventType.TOUCH_END, this.DoubleGet, this);
        // this.BtnSign.on(cc.Node.EventType.TOUCH_END, this.OneceGet, this);
        // this.BackBtn.on(cc.Node.EventType.TOUCH_END, this.Back, this);
        this._updatePanel();
        this._hideAllSignBtn();

        this.onOpen()
    }

    public tweeNode(node: cc.Node) {
        cc.tween(node)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
    }

    public tweeNodeOut(node: cc.Node, callback: Function = null) {
        if (!node) {
            return
        }
        node.active = true;
        let tt = cc.tween(node)
        tt = tt.to(0.3, { scale: 0 }, { easing: "backIn" })
        if (callback) {
            tt = tt.call(() => {
                callback()
            })
        }
        tt.start();
    }

    //
    isTurn: boolean = false

    static native_have_show: boolean = false;  // 原生结banner展示
    protected onOpen() {
        this.node.scale = 0;
        this.tweeNode(this.node);

        this.onNewBackHomeClick = true
        UISign.native_have_show = false
        setTimeout(() => {
            Export.show_native_YSAD("10304001", "Canvas/signPanel/fail_parent", () => { UISign.native_have_show = true })
        }, 400);
        this._checkCanBonus();
        if (this._canBonus == false) {
            this.BackBtn.active = true
        } else {
            this.BackBtn.active = false
        }
    }

    /**
     * 2倍领取
     */
     DoubleGet() {
        // audioManager.playAudio(audioName.select);
        this._checkCanBonus();
        if (this._canBonus == false) {
            Msg.Show("今日已签到,请明日再来!");
            return;
        }
        // Msg.Show("暂时没有视频广告");
        // audioManager.pauseBgGame()
        ad.video_show().then(isok=>{
            // audioManager.playBgGame()
            this.BackBtn.active = true

            if(isok){
              
                data.updateCache("Base","isGetDailyReward",1);//是否已领签到奖励            
                let loginDays=Number(data.getCache("Base","loginDays"));
                if (loginDays >= 7){
                    loginDays = 0
                }
                loginDays = loginDays+1
                data.updateCache("Base","loginDays",loginDays);//登录天数  
                
                let addcoin = this.MoneyNum[loginDays - 1] *2
                let coin=Number(data.getCache("Base","coin"))+ addcoin;
                data.updateCache("Base","coin",coin);
                Msg.Show(`恭喜获得${addcoin}金币`);
                
                this._updateSignBtn(loginDays);
                this.scheduleOnce(() => {
                    this._checkCanBonus();
                    this._hideAllSignBtn();
                }, 0);
            }
        });
    }
    /**
     * 直接领取
     */
     OneceGet() {
        // audioManager.playAudio(audioName.select);
        this._checkCanBonus();
        if (this._canBonus) {
            this.BackBtn.active = true

            data.updateCache("Base","isGetDailyReward",1);//是否已领签到奖励            
            let loginDays=Number(data.getCache("Base","loginDays"));
            if (loginDays >= 7){
                loginDays = 0
            }
            loginDays = loginDays+1
            data.updateCache("Base","loginDays",loginDays);//登录天数    
            
            let addcoin = this.MoneyNum[loginDays-1]
            let coin=Number(data.getCache("Base","coin"))+ addcoin;
            data.updateCache("Base","coin",coin);
            Msg.Show(`恭喜获得${addcoin}金币`);
            
            this._updateSignBtn(loginDays);
            this.scheduleOnce(() => {
                this._checkCanBonus();
                this._hideAllSignBtn();
            }, 0);
        }
        else {
            Msg.Show("今日已签到,请明日再来!");
        }
    }

    /**
* 返回
*/
    onNewBackHomeClick: boolean = true;
    Back() {
        if (this.onNewBackHomeClick && UISign.native_have_show) {
            this.onNewBackHomeClick = false
            Export.click_native_YSAD("YSBN") // 触发ysbn
        } else { // 否则回到游戏
            this.onNewBackHomeClick = true
            UISign.native_have_show = false
            Export.hide_naive_YSAD('YSBN') // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
            // audioManager.playAudio(audioName.select);
            this.close();
        }
    }

    protected close() {
        if (UISign.okbtn_callback) {
            UISign.okbtn_callback()
        }
        cc.game.targetOff(this);
        this.tweeNodeOut(this.node, () => {
            this.node.destroy()
        })
    }

    /**判断是否可以签到 */
    private _checkCanBonus() {
        var isReward = Number(data.getCache("Base","isGetDailyReward"))
        cc.log("_checkCanBonus isReward:",isReward)
        if (isReward == 0) {
            this._canBonus = true
            return
        }
        this._canBonus = false
    }
    //更新领取情况
    private _updatePanel() {
        this._checkCanBonus();
        if (this._canBonus == true) {
            let loginDays=Number(data.getCache("Base","loginDays"));
            console.log(loginDays + "第几天");
            this._updateSignBtn(loginDays);
        }
    }
    /**更新签到状态 */
    private _updateSignBtn(day: number) {
        //this._hideAllSignBtn();
        for (let index = 0; index < 7; index++) {
            if (index < day) {
                this.EndSign[index].active = true;
            } else if (index > day) {
                this.EndSign[index].active = false;
            }
        }
    }

    /**刷新所有签到状态 */
    private _hideAllSignBtn() {
        let loginDays=Number(data.getCache("Base","loginDays"));
        for (let index = 0; index < 7; index++) {
            if (index == loginDays && this._canBonus) {
                this.EndSign[index].active = false;
            } else if (index == loginDays && !this._canBonus) {
                this.EndSign[index].active = false;
            } else if (index < loginDays) {
                this.EndSign[index].active = true;
            } else if (index > loginDays) {
                this.EndSign[index].active = false;
            }
        }
    }

    protected onDestroy() {
        cc.game.targetOff(this);
    }


    
    static isShow:boolean = false
    static okbtn_callback:Function  = null
            
    public static ShowPanel(callback: Function = null) {
    {
            if (UISign.isShow){
                return
            }
            UISign.isShow = true
            UISign.okbtn_callback = null
            cc.loader.loadRes("prefabs/ui/signPanel", cc.Prefab, (error:Error, resource:cc.Prefab) => {
                UISign.isShow = false
                UISign.okbtn_callback = callback
                
                if (error) {
                    cc.error(error)
                    return
                }
                if (resource) {
                    let node: cc.Node = cc.instantiate(resource);
                    if (node) {
                        cc.find("Canvas").addChild(node);
                        node.active = true;
                        node.position = cc.Vec3.ZERO;
                    }
                }
            })
        }
    }
}
