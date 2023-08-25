// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Export } from "../../../syyx_sdk/export_sdk";
import { ad } from "../../sdk/ad";
import { data } from "../../sdk/data";
import uiBase from "../../uiBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class winPanel extends uiBase {


    onLoad () {
        this.initUi();
    }

    start () {
        // ad.recordEnd();
    }

    protected onEnable(): void {
        this.showRet()
    }

    share(){
        // ad.recordShare(isok=>{
        //     if(isok){
        //         this.getCoin(300);
        //         this.giveUp();
        //     }
        // });
        ad.video_show().then(isok => {
            // audioManager.playBgGame()
            if (isok) {
                Export.hide_naive_YSAD('YSBN') // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
                
                this.getCoin(600);

                setTimeout(() => {
                    cc.Tween.stopAll();
                    cc.director.loadScene("main");
                }, 500);
            }
        });
    }
    getCoin(getNum:number){
        let coin=Number(data.getCache("Base","coin"))+getNum;
        data.updateCache("Base","coin",coin);
    }
    subgiveUp(){
        cc.Tween.stopAll();
        cc.director.loadScene("main");
    }

    static native_have_show: boolean = false;  // 原生结banner展示
    private showRet() {
        this.onNewBackHomeClick = true
        winPanel.native_have_show = false
        setTimeout(() => {
            Export.show_native_YSAD("10304001", "Canvas/ui/winPanel/fail_parent", () => { winPanel.native_have_show = true })
        }, 400);
    }

    onNewBackHomeClick: boolean = true;
    giveUp() {
        if (this.onNewBackHomeClick && winPanel.native_have_show) {
            this.onNewBackHomeClick = false
            Export.click_native_YSAD("YSBN") // 触发ysbn
        } else { // 否则回到游戏
            this.onNewBackHomeClick = true
            winPanel.native_have_show = false
            Export.hide_naive_YSAD('YSBN') // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN

            this.subgiveUp()

        }
    }
}
