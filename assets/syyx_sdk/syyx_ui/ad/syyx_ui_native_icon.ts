import { e_ad_id } from './../../configs/syyx_sdk_enum';
import { syyx_const } from "../../configs/syyx_sdk_config";
import { syyx_manager } from "../../controller/syyx_manager";
import { native_ad_data } from "../../model/model";
import { syyx_sdk_api } from "../../syyx_sdk_api";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";
import { syyx_adv_manager } from '../../controller/ad/syyx_adv_manager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class syyx_ui_native_icon extends cc.Component {

    @property(cc.Node)
    icon_close: cc.Node = null;

    @property(cc.Node)
    native_node: cc.Node = null;

    @property(cc.Sprite)
    img_icon: cc.Sprite = null;

    /**
     * 原生广告数据
     */
    native_data: native_ad_data

    constructor() {
        super()

        this.set_background_on_show()
    }

    on_click_adv() {
        this.report_click();
    }

    on_click_close() {
        let _business_config_data = syyx_manager.get_business_config()
        if (_business_config_data && _business_config_data["native_icon_trap_pro"]) {
            let trap_pro = _business_config_data["native_icon_trap_pro"].value[0] // 0
            if (trap_pro >= 0 && Math.random() <= trap_pro) { // trap_pro为0，不满足条件
                this.report_click()
            }
        }
        this.hide();
    }

    /**
    * 广告被点击
    */
    report_click() {
        if (this.native_data) {
            syyx_adv_manager.report_ad_click(e_ad_id.native_icon, this.native_data)
        }
    }

    /**
    * 广告被曝光
    */
    report_show() {
        if (this.native_data) {
            syyx_adv_manager.report_ad_show(e_ad_id.native_icon, this.native_data)
        }
    }

    show(parent, native_data) {
        if (this.node && !this.node.parent && parent) {
            this.native_data = native_data
            this.node.parent = parent
            this.on_show();
        }
    }

    /**
    * 上报点击后  重新拉取原生数据刷新界面
    */
    report_click_update_view(native_data) {
        if (this.node && this.node.parent) {
            this.native_data = native_data
            this.refresh()
        }
    }

    on_show() {
        this.icon_close.on(cc.Node.EventType.TOUCH_END, this.on_click_close, this)
        this.img_icon.node.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)
        this.refresh()
    }

    refresh() {
        syyx_sdk_utils.set_texture_url(this.img_icon, this.native_data.imgUrlList, this.hide.bind(this))
        this.report_show()
        this.play_icon_animation()
    }

    icon_ani
    private play_icon_animation() {
        this.stop_icon_animation()
        this.native_node.rotation = 0
        let move1 = cc.rotateTo(0.2, -5)
        let move2 = cc.rotateTo(0.4, 5)
        let move3 = cc.rotateTo(0.2, 0)
        this.icon_ani = this.native_node.runAction(cc.sequence(move1, move2, move3))
    }


    private stop_icon_animation() {
        if (this.icon_ani) {
            this.native_node.stopAction(this.icon_ani)
            this.icon_ani = null
        }
    }

    hide() {
        if (this.node && this.node.parent) {
            this.node.parent.removeChild(this.node)
            this.on_hide();
        }
    }

    on_hide() {
        this.icon_close.off(cc.Node.EventType.TOUCH_END, this.on_click_close, this)
        this.img_icon.node.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)
    }

    set_default_pos(style) {

    }

    set_style_pos(x, y) {

    }

    set_background_on_show() {
        let self = this
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            //后台到前台
            syyx_sdk_api.on_show(
                function () {
                    if (self && cc.isValid(self.node)) {
                        console.log("igc----- native_icon set_background_on_show")
                        self.report_show()
                    }
                }
            )
        }
    }
}
