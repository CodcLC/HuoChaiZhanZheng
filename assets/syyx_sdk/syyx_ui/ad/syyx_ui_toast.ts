import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class syyx_ui_toast extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Node)
    tips_box: cc.Node = null;
    show(desc) {
        if (this.node && !this.node.parent) {
            let order = syyx_sdk_utils.get_largest_zorder()
            this.node.parent = syyx_sdk_utils.get_stage()
            this.node.zIndex = order
            this.on_show(desc)
        }
    }
    on_hide() {

    }

    on_show(desc) {
        this.show_tips(desc)
    }
    tips_tween
    show_tips(desc) {
        let self = this
        this.label.string = desc
        this.tips_tween = null
        this.tips_tween = cc.moveBy(1.5, cc.v2(0, 150)).easing(cc.easeSineIn())
        let call_back = cc.callFunc(function () {
            if (cc.isValid(self)) {
                self.hide()
            }
        })
        this.tips_box.runAction(cc.sequence(this.tips_tween, call_back))
    }
    /**
     * 应用默认的位置
     */
    protected set_default_pos() {

    }

    protected set_style_pos(x, y) {

    }
    /**
    * 移除，并回收
    */
    hide() {
        if (this.node && this.node.parent) {
            this.tips_box.y = 0
            this.node.parent.removeChild(this.node)
            this.on_hide()
        }
    }
}
