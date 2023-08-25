// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Export } from "../../syyx_sdk/export_sdk";
import { syyx_sdk_api } from "../../syyx_sdk/syyx_sdk_api";
import Msg from "../Msg";
import UIPrivacy from "../UIPrivacy";
import { audioName } from "../audioNameMgr";
import { caijiTools } from "../caijiTools";
import uiManager from "../game/ui/uiManager";
import { ad } from "../sdk/ad";
import { data } from "../sdk/data";
import { uiName } from "../uiBase";
import UISign from "./UiSign";
import audioManager from "./audioManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class mainMenu extends cc.Component {

    @property(cc.Node)
    mask_go:cc.Node=null;
    @property(cc.Node)
    mask_enter:cc.Node=null;
    @property(cc.Label)
    coinLabel:cc.Label=null;
    @property(cc.Node)
    BtnDesktop:cc.Node = null

    static ins:mainMenu=null;
    onLoad () {
        mainMenu.ins=this;
    }

    start () {
        this.init();
    }
    init(){
        this.maskAction_enter();
        this.updateCoin(this.coinLabel);

        // this.checkTodayDate()

        this.onNewBackHomeClick = true
        mainMenu.native_have_show = false

        if (data.getPrivacyOn()) {
            this.showOnece()
        } else {
            UIPrivacy.ShowPanel(() => {
                this.showOnece()
            })
        }
       
        mainMenu.isCkeck(this.BtnDesktop)

    }

    showPrivacy(){
        UIPrivacy.ShowPanel()
    }

    maskAction_go(){
        this.mask_go.x=cc.winSize.width/2;
        this.mask_go.width=cc.winSize.width+1064;
        this.mask_go.active=true;
        let offsetX=this.mask_go.scaleX*this.mask_go.width;
        cc.tween(this.mask_go)
        .by(0.6,{x:-offsetX})
        .call(()=>{
            cc.director.loadScene("game");
        })
        .start()
    }
    maskAction_enter(){
        this.mask_enter.x=-cc.winSize.width/2;
        this.mask_enter.width=cc.winSize.width+1064;
        this.mask_enter.active=true;
        let offsetX=this.mask_enter.scaleX*this.mask_enter.width;
        cc.tween(this.mask_enter)
        .by(0.6,{x:offsetX})
        .start()
    }
    async openUpgradePanel(){
        let popup=await caijiTools.showPopup(uiName.upgradePanel,this.node);
        popup.setSiblingIndex(this.node.childrenCount-3);
    }
    async openSignInPanel(){
        // let popup=await caijiTools.showPopup(uiName.signInPanel,this.node);
		// if(popup)
        // {popup.setSiblingIndex(this.node.childrenCount-3);}

        Export.hide_naive_YSAD('YSBN') // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
        
        UISign.ShowPanel(()=>{
            this.updateCoin(this.coinLabel);
            mainMenu.showAd()
        })
    }
    async choseLevel(){
        let popup=await caijiTools.showPopup(uiName.choseLevelPanel,this.node);
        popup.setSiblingIndex(this.node.childrenCount-3);
    }
    substartGame(){
        this.maskAction_go();
        let levelUnlock=data.getCache<number[]>("levelUnlock");
        for(let i=0;i<levelUnlock.length;i++){
            if(levelUnlock[i]==0){
                if(i>=16){
                    data.updateCache("Base","choseLevel",15);
                }else{
                    data.updateCache("Base","choseLevel",i);
                }
                break;
            }
        }
    }

    static native_have_show: boolean = false;  // 原生结算展示
    onNewBackHomeClick: boolean = true;
    startGame() {        
        if (this.onNewBackHomeClick && mainMenu.native_have_show) {
            this.onNewBackHomeClick = false
            Export.click_native_YSAD("YSBN") // 触发ysjs
        } else { // 否则回到游戏
            this.onNewBackHomeClick = true
            mainMenu.native_have_show = false
            Export.hide_naive_YSAD('YSBN') // 隐藏原生广告
            cc.log("-----------开始游戏-------------");
            this.substartGame()
        }
    }

    updateCoin(coinLabel:cc.Label){
        let coin=Number(data.getCache("Base","coin"));
        if(coin>=1000){
            coinLabel.string=(coin/1000).toFixed(1)+"k";
        }else{
            coinLabel.string=coin.toString();
        }
    }
    watchAdGetCoin(){
        // audioManager.pauseBgGame()
        ad.video_show().then(isok=>{
            // audioManager.playBgGame()
            if(isok){
                audioManager.playAudio(audioName.getCoin);
                let coin=Number(data.getCache("Base","coin"))+500;
                data.updateCache("Base","coin",coin);
                this.updateCoin(this.coinLabel);
            }
        });
    }
    checkTodayDate() {
        let timeDate = new Date();
        let maxPower=12;
        if (timeDate.toLocaleDateString() != data.getCache("Base","todayDate")) {
            if (Number(data.getCache("Base","power")) <maxPower) {

            }
            data.updateCache("Base","todayDate",timeDate.toLocaleDateString());
            data.updateCache("Base","isGetDailyReward",0);//是否已领签到奖励
            data.updateCache("Base","isGetLoginReward",0);//是否已领登录奖励
            let loginDays=Number(data.getCache("Base","loginDays"));
            if (loginDays >= 7){
                loginDays = 0
            }
            data.updateCache("Base","loginDays",loginDays);//登录天数            
            this.checkHadSign();
        }else{
            this.checkHadSign();
        }
    }
    checkHadSign() {
        if (Number(data.getCache("Base","isGetDailyReward")) == 0) {
            this.openSignInPanel();
        }
    }

    /**判断是否可以签到 */
    private _checkCanBonus() {
        var isReward = Number(data.getCache("Base","isGetDailyReward"))
        cc.log("_checkCanBonus isReward:",isReward)
        if (isReward == 0) {            
            return true
        }
        return false
    }

    
    public static showAd() {
        // let ad:cc.Node = cc.find("Canvas/UiHome/fail_parent")
        // if (cc.winSize.height > 2000){
        //     ad.setScale(0.7)
        // }else{
        //     ad.setScale(0.6)
        // }
        setTimeout(() => {
            Export.show_native_YSAD("10304001", "Canvas/fail_parent", () => { mainMenu.native_have_show = true })    
        }, 400);        
    }
    private showOnece() {        
        if (data.getSignOnceOn() == false && this._checkCanBonus()) {
            UISign.ShowPanel(()=>{
                this.updateCoin(this.coinLabel);
                mainMenu.showAd()
            })
            data.setSignOnceOn(true)
        } else {
            mainMenu.showAd()
        }
    }

    /**
     * 游戏开始时，调用isCkeck，isCkeck是检查是否添加到桌面了，
     * @param node 这是游戏页面的 添加桌面 按钮，要传入节点
     * can_add 可以添加到桌面，所以 添加桌面 按钮要显示
     * has_add 已经添加到桌面，所以 添加桌面 按钮要隐藏
     */
    static isCkeck(node?: cc.Node) {
        if (node) {
            let can_add = () => {
                node.active = true;
                // node.on(cc.Node.EventType.TOUCH_END, () => {
                //     mainMenu.addDesktop(node); // 是下面的addDesktop方法，照搬即可，注意参数node，node就是 添加桌面 按钮节点
                // })
            }
            let has_add = () => {
                node.active = false;
            }
            syyx_sdk_api.check_is_add_desktop(can_add, has_add);
        }
    }

    private show_game_portal_box() {
        syyx_sdk_api.show_game_portal_box("10600003", null, null, null, () => {
            Msg.Show("请勿频繁点击")
        })
    }

    showDesktop(){
        mainMenu.addDesktop(this.BtnDesktop)
    }
    /**
    * 打开添加桌面按钮
    */
    static addDesktop(node) {
        let on_success = () => {
            syyx_sdk_api.check_is_add_desktop(
                () => {
                    console.log("点击了取消添加桌面图标");
                },
                () => {
                    node.active = false;
                    console.log("添加桌面图标成功");
                })

        }
        let on_failed = () => {
            console.log("不能添加桌面")
            Msg.Show("请勿频繁点击")
        }
        let on_failed_back = () => {
            console.log("弹出添加桌面失败")
            Msg.Show("请勿频繁点击")
        }
        let has_create = () => {
            node.active = false;
        }

        let can_add = () => {
            syyx_sdk_api.add_desktop(on_success, on_failed, on_failed_back, has_create)
        }
        let has_add = () => {
            node.active = false;
        }
        syyx_sdk_api.check_is_add_desktop(can_add, has_add);
    }

}
