// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Export } from "../../../syyx_sdk/export_sdk";
import { ad } from "../../sdk/ad";
import uiBase from "../../uiBase";
import uiManager from "./uiManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class buffPopup extends uiBase {


    @property(cc.Integer)
    UIType:number = -1

    onLoad () {
        this.initUi();
    }

    start () {
        
    }

    protected onEnable(): void {
        this.showRet()
    }

    wudi(){
        // audioManager.pauseBgGame()
        ad.video_show().then(isok=>{
            // audioManager.playBgGame()
            if(isok){
                uiManager.ins.wuDi();
                this.close();
            }
        });
    }
    fullHp(){
        // audioManager.pauseBgGame()
        ad.video_show().then(isok=>{
            // audioManager.playBgGame()
            if(isok){
                uiManager.ins.fullHp();
                this.close();
            }
        });
    }
    doubleDamage(){
        // audioManager.pauseBgGame()
        ad.video_show().then(isok=>{
            // audioManager.playBgGame()
            if(isok){
                cc.log("doubleDamage..........")
                uiManager.ins.doubleDamage();
                this.subclose();
            }
        });
    }
    subclose(){
        Export.hide_naive_YSAD('YSJS') // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
        
        this.node.destroy();
        cc.director.resume();
    }

    static native_have_show: boolean = false;  // 原生结banner展示
    private showRet() {
        cc.log("buff popup ....")
        this.onNewBackHomeClick = true
        buffPopup.native_have_show = false
        
        var uistr = "Canvas/ui/doubleDamagePopup/fail_parent"
        if (this.UIType==1){
            uistr = "Canvas/ui/doubleDamagePopup/fail_parent"
        }else if(this.UIType==2){
            uistr = "Canvas/ui/fullHpPopup/fail_parent"
        }else if (this.UIType==3){
            uistr = "Canvas/ui/wuDiPopup/fail_parent"
        }
        cc.find(uistr).setScale(0.5)

        setTimeout(() => {
            Export.show_native_YSAD("10302001",uistr , () => { buffPopup.native_have_show = true })
        }, 400);
    }

    onNewBackHomeClick: boolean = true;
    close() {
        if (this.onNewBackHomeClick && buffPopup.native_have_show) {
            this.onNewBackHomeClick = false
            Export.click_native_YSAD("YSJS") // 触发ysbn
        } else { // 否则回到游戏
            this.onNewBackHomeClick = true
            buffPopup.native_have_show = false
            
            this.subclose()

        }
    }
}
