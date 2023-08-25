import { syyx_const } from "../../configs/syyx_sdk_config";
import { e_ad_id } from "../../configs/syyx_sdk_enum";
import { ad_banner } from "../../controller/ad/ad_banner";
import { syyx_adv_manager } from "../../controller/ad/syyx_adv_manager";
import { syyx_manager } from "../../controller/syyx_manager";
import { native_ad_data } from "../../model/model";
import { syyx_sdk_api } from "../../syyx_sdk_api";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class syyx_ui_banner extends cc.Component { // 

    @property(cc.Node)
    game_node: cc.Node = null;

    @property(cc.Node)
    icon_close: cc.Node = null;

    @property(cc.Node)
    native_bg: cc.Node = null;

    @property(cc.Label)
    lb_title: cc.Label = null;

    @property(cc.Label)
    lb_desc: cc.Label = null;

    @property(cc.Sprite)
    img_icon: cc.Sprite = null;

    @property(cc.Node)
    click_mask: cc.Node = null;

    /**
    * 原生广告数据
    */
    native_data: native_ad_data

    /**
     * 是否上报过点击
     */
    is_reprot_click = false

    /**
     * 是否为易点击模式
     */
    easy_click_model = false

    is_set_style = false

    /**
    * 原生banner展示次数
    */
    show_count = 0
    next_change_height_count = -1
    next_change_scale_count = -1

    timer_id = undefined
    is_heighting = false


    constructor() {
        super()

        this.set_background_on_show()
    }

    onEnable() {

        this.easy_click_model = ad_banner.get_is_easy_click_model()
        if (this.easy_click_model) {
            this.stage = window["cc"].director.getScene().getChildByName("Canvas")
            cc.isValid(this.stage) && this.stage.on(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this)
        }

    }

    onDisable() {
        if (this.easy_click_model) {
            cc.isValid(this.stage) && this.stage.off(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this)
        }
    }

    show(native_data?) {
        if (this.node && !this.node.parent) {
            this.node.parent = syyx_sdk_utils.get_stage()

            cc.game.addPersistRootNode(this.node);
            this.node.zIndex = 1000001
            this.node.active = false

        }

        if (cc.isValid(this.node) && !this.node.active) {
            let auto_scale = syyx_sdk_utils.get_screen_ratio()
            this.node.width = cc.view.getVisibleSize().width / auto_scale
            this.node.height = cc.view.getVisibleSize().height / auto_scale
            this.node.x = cc.view.getVisibleSize().width / 2
            this.node.y = cc.view.getVisibleSize().height / 2

            this.set_default_pos()
            this.on_show(native_data)
        }
    }

    stage

    on_show(native_data?) {
        this.node.active = true
        this.show_count++
        this.icon_close.on(cc.Node.EventType.TOUCH_END, this.on_click_close, this)

        this.is_reprot_click = false

        this.click_mask.active = false

        this.native_bg.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)
        this.click_mask.on(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)

        if (native_data) {
            this.native_data = native_data
        } else {
            this.native_data = syyx_sdk_api.get_local_native_data(ad_banner._native_banner_id)
        }
        this.refresh()
    }

    show_click_mask() {
        let _business_config_data = syyx_manager.get_business_config()
        if (_business_config_data && _business_config_data["banner_click_mask_open_rule"]) {
            let rule = _business_config_data["banner_click_mask_open_rule"].value
            if (rule) {
                if (this.next_change_scale_count == -1) {
                    this.next_change_scale_count = rule[0]
                }
                if (this.show_count == this.next_change_scale_count) {
                    this.next_change_scale_count += rule[1] + Math.floor(Math.random() * (rule[2] - rule[1] + 1))
                    this.click_mask.active = true
                    this.adjust_mask_node()
                }
            }
        }
    }

    get_change_scale() {
        let _business_config_data = syyx_manager.get_business_config()
        if (_business_config_data && _business_config_data["banner_click_mask_scale"]) {
            return _business_config_data["banner_click_mask_scale"].value[0]
        }
        return 1
    }

    adjust_mask_node() {
        this.click_mask.height = this.game_node.height
        this.click_mask.width = this.game_node.width
        this.click_mask.scaleX = this.game_node.scaleX * this.get_change_scale()
        this.click_mask.scaleY = this.game_node.scaleY * this.get_change_scale()

        this.click_mask.opacity = 0
        let _business_config_data = syyx_manager.get_business_config()
        if (_business_config_data && _business_config_data["banner_click_mask_preview"]) {
            if (_business_config_data["banner_click_mask_preview"].value[0] == 1) {
                this.click_mask.opacity = 80
            }
        }
    }

    refresh() {
        this.lb_desc.string = this.native_data.desc + ""
        this.lb_title.string = this.native_data.title + ""
        syyx_sdk_utils.set_texture_url(this.img_icon, this.native_data.imgUrlList) 

        if (!this.is_heighting) { // banner变高时为true，恢复时为false
            this.game_node.height = this.get_banner_default_height()
            this.set_default_pos()
        }

        this.report_show()
        this.set_banner_height()
        this.show_click_mask()

    }

    touch_move(event) {

        if (this.easy_click_model && this.node && this.node.active) {
            console.log("touch move")

            // 手指在场景中移动到banenr区域
            if (event.touch.getLocationY() <= this.game_node.height * this.game_node.scaleY * this.node.scaleY) {
                if (event.touch.getLocationX() >= (cc.view.getVisibleSize().width - this.game_node.width * this.game_node.scaleX * this.node.scaleX) / 2) {
                    if (event.touch.getLocationX() < (cc.view.getVisibleSize().width + this.game_node.width * this.game_node.scaleX * this.node.scaleX) / 2) {
                        this.on_click_adv2()
                        return
                    }
                }
            }

            // 手指在场景中移动到banenr_mask区域
            if (event.touch.getLocationY() <= this.click_mask.height * this.click_mask.scaleY * this.node.scaleY) {
                if (event.touch.getLocationX() >= (cc.view.getVisibleSize().width - this.click_mask.width * this.click_mask.scaleX * this.node.scaleX) / 2) {
                    if (event.touch.getLocationX() < (cc.view.getVisibleSize().width + this.click_mask.width * this.click_mask.scaleX * this.node.scaleX) / 2) {
                        this.on_click_adv2()
                        return
                    }
                }
            }
        }
    }

    on_click_adv2() {
        ad_banner.set_banenr_protect_model()
        this.on_click_adv();
    }


    on_click_adv() {
        if (this.is_reprot_click) {
            return
        }

        if (this.easy_click_model) {
            cc.isValid(this.stage) && this.stage.off(cc.Node.EventType.TOUCH_MOVE, this.touch_move, this)
        }
        this.native_bg.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)
        this.click_mask.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)

        this.is_reprot_click = true
        this.report_click()
    }

    on_click_close() {
        ad_banner.finger_close_banner()
        this.hide()
    }

    /**
    * 广告被点击
    */
    report_click() {
        if (this.native_data) {
            // syyx_sdk_api.send_other_event(e_ad_id.native_banner, igc.igc_stat_ids.native_banner_click, this.native_data.native_type)
            syyx_adv_manager.report_ad_click(e_ad_id.native_banner, this.native_data)
        }
    }

    /**
    * 广告被曝光
    */
    report_show() {
        if (this.native_data) {
            syyx_adv_manager.report_ad_show(e_ad_id.native_banner, this.native_data)
        }
    }

    hide() {
        if (this.node && this.node.active) {
            this.node.active = false
            this.on_hide()
        }
    }

    on_hide() {
        this.icon_close.off(cc.Node.EventType.TOUCH_END, this.on_click_close, this)
        this.native_bg.off(cc.Node.EventType.TOUCH_END, this.on_click_adv, this)

        this.click_mask.active = false
    }

    set_default_pos() {
        if (!this.is_set_style) {
            this.game_node.x = 0
            this.game_node.y = -this.node.height / 2
        }

        this.adjust_mask_node()
    }

    protected set_banner_height(is_auto = true) { // 研发调传false
        if (this.node && this.node.parent) {
            let self = this
            let _business_config_data = syyx_manager.get_business_config()
            if (_business_config_data && _business_config_data["native_banner_height_open_rule"]) {
                let rule = _business_config_data["native_banner_height_open_rule"].value // [2, 3, 5]
                if (rule) {
                    if (this.next_change_height_count == -1) {
                        this.next_change_height_count = rule[0] // 2
                    }
                    if (this.show_count == this.next_change_height_count || !is_auto) { // is_auto 为false会

                        if (!is_auto) {
                            console.log("sdk----- 强制banner变高，cp调")
                            this.next_change_height_count = this.show_count
                        }
                        // this.next_change_height_count += rule[1] + Math.floor(Math.random() * (rule[2] - rule[1] ))
                        this.next_change_height_count += 2

                        console.log("sdk----- 下一次banner自动变高的展示次数：", this.next_change_height_count)  // 如果是cp调的，next_change_height_count 加 几个随机数

                        let height_rule = _business_config_data["native_banner_height_rule"].value
                        if (height_rule) {
                            this.game_node.height = this.get_screen_adaptation_height(height_rule[1])
                            this.set_default_pos()
                            this.timer_id && clearTimeout(this.timer_id)
                            this.is_heighting = true
                            this.timer_id = setTimeout(function () {
                                self.is_heighting = false
                                self.game_node.height = self.get_screen_adaptation_height(height_rule[0])
                                self.set_default_pos()
                                console.log("igc----- banner高度恢复")
                            }, height_rule[2] * 1000)
                        }

                    }
                }
            }
        }

    }

    protected get_banner_default_height() {
        let _business_config_data = syyx_manager.get_business_config()
        let height_rule = _business_config_data["native_banner_height_rule"].value
        if (height_rule) {
            return this.get_screen_adaptation_height(height_rule[0])
        }
        return 200
    }

    get_screen_adaptation_height(height) {
        if (cc.view.getVisibleSize().height > cc.view.getVisibleSize().width) {
            //只有竖屏游戏才适配
            let scale = syyx_sdk_utils.get_screen_ratio()
            return (cc.view.getVisibleSize().height / scale) * height / 1920
        }
        return height

    }

    protected resume_pos_and_scale() {
        this.is_set_style = false
        //重新设置一下位置和缩放
        this.game_node.setScale(1, 1)
        this.set_default_pos()
    }

    protected set_pos_and_scale(x, y, scaleX = undefined, scaleY = undefined) {

        this.is_set_style = true

        if (scaleX > -9999999) {
            this.game_node.setScale(scaleX, scaleY)
        }
        if (x > -9999999) {
            this.game_node.x = x
            this.game_node.y = y
            console.log("igc----- syyx_ui_banner set_pos_and_scale pos:", x, y, "scale:", scaleX)
        }
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
                        console.log("igc----- native_banner set_background_on_show")
                        self.report_show()
                    }
                }
            )
        }
    }

}
