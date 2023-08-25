import { data } from "./sdk/data";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UIPrivacy extends cc.Component {

    private BackBtn: cc.Node = null;//返回
    
    private OKBtn: cc.Node = null;//直接领取    
    
    private ScaleNode: cc.Node = null;

    static native_have_show: boolean = false;  // 原生结banner展示

    onLoad(){
        this._onLoad()
    }

    private _onLoad() {
        // this.BackBtn = cc.find("ScaleNode/BackBtn",this.node);        
        // this.OKBtn = cc.find("ScaleNode/OKBtn",this.node);
        this.ScaleNode = cc.find("ScaleNode",this.node);
        this._start();
      
    }

    private _start() {        
        // this.OKBtn.on(cc.Node.EventType.TOUCH_END, this.OneceGet, this);
        // this.BackBtn.on(cc.Node.EventType.TOUCH_END, this.Back, this);
      
        this.onOpen()
    }
    protected onOpen() {
        this.ScaleNode.scale = 0;
        this.tweeNode(this.ScaleNode);
    }

    public tweeNode(node: cc.Node) {
        cc.tween(node)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
    }
    /**
     * 直接领取
     */
     OneceGet() {
        data.setPrivacyOn(true)
        if (UIPrivacy.okbtn_callback){
            UIPrivacy.okbtn_callback()
        }
        this.close()
    }
    /**
     * 返回
     */
     Back() {
        data.setPrivacyOn(false)   
        // this.close();
        try {
            //@ts-ignore
            qg.exitApplication({
                success: () => {
                    console.log("退出成功！");
                },
                fail: () => {
                    console.log("退出失败！");
                },
                complete: () => {
                    console.log("退出执行完成！");
                }
            });
        } catch (error) {
            cc.log("GameExit erro:", JSON.stringify(error));
        }
    }

    protected close() {
        cc.game.targetOff(this);
        this.node.destroy()
    }

    protected onDestroy() {
        cc.game.targetOff(this);
    }


    static isShow:boolean = false
    static okbtn_callback:Function  = null
            
    public static ShowPanel(callback: Function = null) {
        {
            if (UIPrivacy.isShow){
                return
            }
            UIPrivacy.isShow = true
            UIPrivacy.okbtn_callback = null
            cc.loader.loadRes("prefabs/ui/UIPrivacy", cc.Prefab, (error:Error, resource:cc.Prefab) => {
                UIPrivacy.isShow = false
                if (callback) {
                    UIPrivacy.okbtn_callback = callback
                }
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
