// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Export } from "../../../syyx_sdk/export_sdk";
import { ad } from "../../sdk/ad";
import uiBase from "../../uiBase";
import GameManager from "../GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class losePanel extends uiBase {


    onLoad() {
        this.initUi();
    }

    start() {
        // ad.recordEnd();        
    }

    protected onEnable(): void {
        this.showRet()
    }

    share() {
        // ad.recordShare(isok=>{
        //     if(isok){
        //         this.node.destroy();
        //         GameManager.instance.playerController.revive();
        //         ad.record();
        //     }
        // });

        ad.video_show().then(isok => {
            // audioManager.playBgGame()
            if (isok) {
                Export.hide_naive_YSAD('YSBN') // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
                
                this.node.destroy();
                GameManager.instance.playerController.revive();
            }
        });
    }
    subgiveUp() {
        cc.Tween.stopAll();
        cc.director.loadScene("main");
    }

    static native_have_show: boolean = false;  // 原生结banner展示
    private showRet() {
        this.onNewBackHomeClick = true
        losePanel.native_have_show = false
        setTimeout(() => {
            Export.show_native_YSAD("10304001", "Canvas/ui/losePanel/fail_parent", () => { losePanel.native_have_show = true })
        }, 400);
    }

    onNewBackHomeClick: boolean = true;
    giveUp() {
        if (this.onNewBackHomeClick && losePanel.native_have_show) {
            this.onNewBackHomeClick = false
            Export.click_native_YSAD("YSBN") // 触发ysbn
        } else { // 否则回到游戏
            this.onNewBackHomeClick = true
            losePanel.native_have_show = false
            Export.hide_naive_YSAD('YSBN') // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN

            this.subgiveUp()

        }
    }
}
