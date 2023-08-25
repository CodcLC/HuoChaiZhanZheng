import { syyx_const } from "../../configs/syyx_sdk_config";
import { e_ad_id, e_syyx_ctr_event_type } from "../../configs/syyx_sdk_enum";
import { ad_native_interstitial } from "../../controller/ad/ad_native_interstitial";
import { syyx_adv_manager } from "../../controller/ad/syyx_adv_manager";
import { syyx_ctr_manager } from "../../controller/ctr_test/syyx_ctr_manager";
import { syyx_manager } from "../../controller/syyx_manager";
import { native_ad_data } from "../../model/model";
import { syyx_sdk_api } from "../../syyx_sdk_api";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";
import { syyx_api_request } from "../../utils/syyx_api";


const { ccclass, property } = cc._decorator;

@ccclass
export default class syyx_ui_ctr_item extends cc.Component {

    @property(cc.Sprite)
    game_icon: cc.Sprite = null;

    @property(cc.Label)
    game_name: cc.Label = null;

    @property(cc.Node)
    reward_icon: cc.Node = null;

    @property(cc.Label)
    rewardNum: cc.Label = null;

    @property(cc.Node)
    label_bg1: cc.Node = null;

    @property(cc.Node)
    label_bg2: cc.Node = null;

    @property(cc.Node)
    label_bg3: cc.Node = null;

    @property(cc.Node)
    label_bg4: cc.Node = null;

    @property(cc.Node)
    label_bg5: cc.Node = null;

    private index = undefined
    private click_back = undefined
    private app = undefined

    constructor() {
        super()
    }

    on_click() {

        if (syyx_ctr_manager.check_is_ctr_test_compelete()) {
            return
        }

        if (!this.app) {
            return
        }
        let self = this

        let dot_data = { // 打点参数
            location_id: syyx_ctr_manager.new_product_location_id,
            uid: syyx_manager.login_user_id,
            config_id: self.app.gc_id, 
            icon_id: self.app.iconid
        }
        syyx_ui_ctr_item.click_navigation_dot('AdvertisingClick', dot_data)

        // // 点击了icon，跳转游戏
        if (window['qg'] && (window['qg'].getSystemInfoSync().platformVersionCode >= 1050) && window['qg'].navigateToMiniGame) {
            window['qg'].navigateToMiniGame({
                pkgName: this.app.package,
                success: function() { // 跳转成功打点
                    syyx_ui_ctr_item.click_navigation_dot('AdvertisingJump', dot_data)
                },
                fail: function (res) {
                    console.log(JSON.stringify(res))
                }
            })
        }

        let reward_num = syyx_ctr_manager.get_new_products_reward()
        if (reward_num != 0) {
            this.reward_icon.active = true
            this.rewardNum.node.active = true
            this.rewardNum.string = syyx_ctr_manager.get_new_products_reward() + "" // 100
            this.reward_icon.getComponent(cc.Animation).play("zuanshixiaoshi")
        }

        this.click_back && this.click_back()

    }

    static click_navigation_dot(type, params) {
        let reqD = {
            log_type: type,
            data: JSON.stringify(params)
        }
        syyx_api_request.apiPost('da_dot', syyx_const.guobao_da_dot_url, reqD, (res) => {
             console.log('跳转打点回调结果-->', res)
        })
    }

    refresh(index, data, click_back?) {

        this.app = data

        if (!this.app) {
            this.node.active = false
            return
        }

        this.node.off(cc.Node.EventType.TOUCH_END, this.on_click, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.on_click, this)

        this.label_bg1.active = false
        this.label_bg2.active = false
        this.label_bg3.active = false
        this.label_bg4.active = false
        this.label_bg5.active = false
        this.node.active = true
        this.game_icon.node.active = true
        this.reward_icon.active = false
        this.rewardNum.node.active = false

        syyx_sdk_utils.set_texture_url(this.game_icon, this.app.icon)
        this.game_name.string = this.app.name;
        // this.game_name.string = '测试名字';
        this.index = index
        this.click_back = click_back
        this.set_label_bg_skin(index)

        let dot_data = { // 打点参数
            location_id: syyx_ctr_manager.new_product_location_id,
            uid: syyx_manager.login_user_id,
            config_id: this.app.gc_id, 
            icon_id: this.app.iconid
        }

        syyx_ui_ctr_item.click_navigation_dot('AdvertisingExposure', dot_data) // 曝光打点
    }

    set_label_bg_skin(index: number) {
        if (index != null) {
            switch (index) {
                case 0:
                case 3:
                    this.label_bg5.active = true
                    break;
                case 1:
                    this.label_bg4.active = true
                    break;
                case 2:
                    this.label_bg3.active = true
                    break;
                case 4:
                    this.label_bg2.active = true
                    break;
                case 5:
                    this.label_bg1.active = true
                    break;
                case 6:
                    this.label_bg2.active = true
                    break;
                case 7:
                    this.label_bg5.active = true
                    break;
            }
        }
    }

}
