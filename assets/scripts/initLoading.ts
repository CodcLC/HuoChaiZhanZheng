// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Export } from "../syyx_sdk/export_sdk";
import { syyx_sdk_api } from "../syyx_sdk/syyx_sdk_api";
import { caijiTools } from "./caijiTools";
import { ad } from "./sdk/ad";
import { data } from "./sdk/data";

const {ccclass, property} = cc._decorator;

@ccclass
export default class initLoading extends cc.Component {

    successNum:number=0;
    // bundleName:string[]=["mainUi","prefabs","game","sp_enemy","sp_others","sp_player","sounds"];
    bundleName:string[]=["game","sp_enemy","sp_others","sounds"];

    actionTime:number=1;
    version:string="1.0.1";

    start () {
        data.init(false).then(()=>{
            this.addNewData();
            // this.unlockAllLevel();
        });
        // if (cc.sys.isBrowser){
        //     ad.init(true);
        // }else
        {
            ad.init(false);
        }

        this.loadBundle();

        this.initSDK()
    }


    public initSDK() {
        console.log("init SDK....")
        syyx_sdk_api.init(function (ret, param) {
            if (ret === true) {
                if (param.load_init_complete) {}
                if (param.load_local_complete) {
                    //本地配置加载完成
                    setTimeout(() => {
                        Export.preload_YSAD("10304001") // 预加载原生banner
                    }, 600); 
                }
                if (param.load_remote_complete) {
                    //远端配置拉取完毕
                    console.log("sdk-----business_config data:" + JSON.stringify(param.business_config)); 
                }
            }
        }.bind(this))
    }
    
    
    unlockAllLevel(){
        for(let i=0;i<20;i++){
            data.updateCache("levelUnlock",i.toString(),1)
        }
    }
    loadBundle(){
        let self=this;
        for(let name of this.bundleName){
            caijiTools.loadBundlePackage(name,(successName)=>{
                self.successNum++;
                if(self.successNum==self.bundleName.length){
                    if(cc.director.getTotalTime()<1000){
                        this.scheduleOnce(()=>{
                            this.enterMain();
                        },0.5);
                    }else{
                        this.enterMain();
                    }
                }
            });
        }
    }
    enterMain(){
        for(let child of this.node.children){
            if(child.childrenCount!=0){
                cc.tween(child.children[0])
                .to(this.actionTime,{color:cc.color(0,0,0)})
                .start();
            }
            cc.tween(child)
            .to(this.actionTime,{color:cc.color(0,0,0)})
            .start();
        }
        this.scheduleOnce(()=>{
            cc.director.loadScene("main");
        },this.actionTime);
    }
    addNewData(){
        if(data.getCache("Base","version")==this.version) return;
        data.updateCache("Base","version",this.version);
    }
}
