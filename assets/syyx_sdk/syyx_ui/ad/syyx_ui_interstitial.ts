import { syyx_const } from "../../configs/syyx_sdk_config";
import { e_ad_id } from "../../configs/syyx_sdk_enum";
import { ad_native_interstitial } from "../../controller/ad/ad_native_interstitial";
import { syyx_adv_manager } from "../../controller/ad/syyx_adv_manager";
import { syyx_manager } from "../../controller/syyx_manager";
import { native_ad_data } from "../../model/model";
import { syyx_sdk_api } from "../../syyx_sdk_api";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class syyx_ui_interstitial extends cc.Component {

    @property(cc.Node)
    game_node: cc.Node = null;

    @property(cc.Node)
    icon_close: cc.Node = null;

    @property(cc.Node)
    native_click: cc.Node = null;

    @property(cc.Label)
    lb_title: cc.Label = null;

    @property(cc.Label)
    lb_desc: cc.Label = null;

    @property(cc.Sprite)
    img_icon: cc.Sprite = null;

    @property(cc.Node)
    btn_check: cc.Node = null;

    /**
    * 原生广告数据
    */
    native_data: native_ad_data

    constructor() {
        super()

        this.set_background_on_show()
    }


    on_click_adv2() {
        if (this.easy_click || ad_native_interstitial.check_is_click_wrap()) {
            this.report_click();
        }
    }

    on_click_adv() {
        this.report_click();
    }

    on_click_close() {
        if (ad_native_interstitial.check_is_click_wrap()) {
            this.report_click()
            return
        }

        let _business_config_data = syyx_manager.get_business_config()
        if (_business_config_data && _business_config_data["native_institial_click_close_pro"]) {
            let trap_pro = _business_config_data["native_institial_click_close_pro"].value[0]
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
        if (this.native_data && this.native_data.adPosId) {
            syyx_sdk_api.send_other_event(e_ad_id.native_interstitial_hall, igc.igc_stat_ids.native_interstitial_click, this.native_data.native_type)
            syyx_adv_manager.report_ad_click(e_ad_id.native_interstitial_hall, this.native_data)
        }
    }

    /**
    * 广告被曝光
    */
    report_show() {
        if (this.native_data && this.native_data.adPosId) {
            syyx_adv_manager.report_ad_show(e_ad_id.native_interstitial_hall, this.native_data)
        }
    }

    show(native_data) {
        if (this.node && !this.node.parent) {
            this.native_data = native_data
            let order = syyx_sdk_utils.get_largest_zorder()
            this.node.parent = syyx_sdk_utils.get_stage()
            this.node.zIndex = order
            this.on_show()
        }
    }

    easy_click
    on_show() {
        this.icon_close.on(cc.Node.EventType.TOUCH_END, this.on_click_close, this)
        this.img_icon.node.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)
        this.btn_check.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)
        this.native_click.on(cc.Node.EventType.TOUCH_END, this.on_click_adv2, this)
        this.refresh()
        ad_native_interstitial.show_count++
        this.easy_click = false
        let _business_config_data = syyx_manager.get_business_config()
        if (_business_config_data && _business_config_data["native_institial_white_easy_click"]) {
            let easy_click_pro = _business_config_data["native_institial_white_easy_click"].value[0]
            if (easy_click_pro > 0 && Math.random() <= easy_click_pro) {
                this.easy_click = true
            }
        }
    }

    refresh() {
        syyx_sdk_utils.set_texture_url(this.img_icon, this.native_data.imgUrlList)
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
        this.btn_check.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)
        this.native_click.off(cc.Node.EventType.TOUCH_END, this.on_click_adv2, this)
    }

    set_default_pos(style) {

    }

    set_style_pos(x, y) {
        x > -10000 && (this.game_node.x = x)
        y > -10000 && (this.game_node.y = y)
    }

    set_background_on_show() {
        let self = this
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            //后台到前台
            syyx_sdk_api.on_show(
                function () {
                    if (self && cc.isValid(self.node)) {
                        console.log("igc----- native_interstitial set_background_on_show")
                        self.report_show()
                    }
                }
            )
        }
    }
}
