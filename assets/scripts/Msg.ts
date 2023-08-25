

const { ccclass, property } = cc._decorator;

@ccclass
export default class Msg extends cc.Component{
    private static tipsPanelPrefab: string = "prefabs/ui/TipsPanel";

    public static tweeNode(node: cc.Node) {
        cc.tween(node)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
    }

    static isShow:boolean = false
    static okbtn_callback:Function  = null
            
    public static Show(msg:string) {
    {
            if (Msg.isShow){
                return
            }
            Msg.isShow = true
            Msg.okbtn_callback = null
            cc.loader.loadRes(this.tipsPanelPrefab, cc.Prefab, (error:Error, resource:cc.Prefab) => {
                Msg.isShow = false
                
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

                        let label: cc.Label = cc.find("Label", node).getComponent(cc.Label);
                        label.string = msg;

                        node.scale = 0;
                        Msg.tweeNode(node);

                        label.scheduleOnce(() => {
                            node.destroy();
                        }, 1.5);
                    }
                }
            })
        }
    }
}