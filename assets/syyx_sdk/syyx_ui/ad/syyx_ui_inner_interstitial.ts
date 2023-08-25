import { syyx_const } from "../../configs/syyx_sdk_config";
import { e_ad_id, e_ad_native_state } from "../../configs/syyx_sdk_enum";
import { ad_native_inner_interstitial } from "../../controller/ad/ad_native_inner_interstitial";
import { syyx_adv_manager } from "../../controller/ad/syyx_adv_manager";
import { syyx_manager } from "../../controller/syyx_manager";
import { native_ad_data } from "../../model/model";
import { syyx_sdk_api } from "../../syyx_sdk_api";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class syyx_ui_inner_interstitial extends cc.Component {

    @property(cc.Node)
    icon_close: cc.Node = null;

    @property(cc.Node)
    native_node: cc.Node = null;

    @property(cc.Label)
    lb_title: cc.Label = null;

    @property(cc.Label)
    lb_desc: cc.Label = null;

    @property(cc.Sprite)
    img_icon: cc.Sprite = null;

    /**
     * 原生广告数据
     */
    native_data: native_ad_data

    //点击结算原生回调
    click_back: Function = undefined
    //结算原生显示回调
    show_back
    //结算原生隐藏回调
    hide_back

    constructor() {
        super()

        this.set_background_on_show()
    }

    on_click_adv() {
        this.report_click()

    }

    on_click_close() {
        let _business_config_data = syyx_manager.get_business_config()
        if (_business_config_data && _business_config_data["native_inner_institial_click_close_pro"]) {
            let trap_pro = _business_config_data["native_inner_institial_click_close_pro"].value[0] // 0
            if (trap_pro >= 0 && Math.random() <= trap_pro) {
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
            this.click_back && this.click_back()
            syyx_manager.report_ad_click(e_ad_id.native_inner_interstitial_success, this.native_data) // 10302001
            console.log("igc----- has clicked native inner interstitial")
            // this.hide()
        } else {
            console.log("igc----- syyx_ui_inner_interstitial report_click native_data is null!")
        }
    }

    /**
    * 广告被曝光
    */
    report_show() {
        if (this.native_data) {
            syyx_adv_manager.report_ad_show(e_ad_id.native_inner_interstitial_success, this.native_data) // // 10302001
        } else {
            console.log("igc----- syyx_ui_inner_interstitial report_show native_data is null!")
        }
    }

    show(parent, native_data, click_back?: Function, show_back?: Function, hide_back?: Function, is_new_type?: boolean) {
        if (this.node && !this.node.parent) {
            this.native_data = native_data
            this.show_back = show_back || undefined
            this.hide_back = hide_back || undefined
            this.click_back = click_back || undefined
            this.node.parent = parent
            // console.log("回调回调。。。。。。。。")
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
        ad_native_inner_interstitial.show_count++
        this.show_back && this.show_back()
    }

    refresh() {
        syyx_sdk_utils.set_texture_url(this.img_icon, this.native_data.imgUrlList, this.hide.bind(this))
        this.lb_title.string = this.native_data.title + ""
        this.lb_desc.string = this.native_data.desc + ""
        this.report_show()
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

        this.hide_back && this.hide_back()
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
                        console.log("igc----- native_inner_interstitial set_background_on_show")
                        self.report_show()
                    }
                }
            )
        }
    }

}
