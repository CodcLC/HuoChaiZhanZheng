import { syyx_manager } from "../syyx_manager";
import { syyx_const } from "../../configs/syyx_sdk_config";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";
import { syyx_adv_manager } from "./syyx_adv_manager";

export default class ad_block {
    /**
    * 远端运营配置
    */
    private _business_config_data = {};

    /**
     * 配置表广告id
     */
    private _ad_pos_id

    /**
     * 创建广告时传入的参数
     */
    private _ad_param

    /**
     * banner自动刷新时间
     */
    private auto_update_cd = [20, 20]

    /**
     * 是否正在倒计时刷新
     */
    private is_run_timer = false

    /**
     * 当前是否需要积木
     */
    private need_show = true

    /**
     * 自动刷新定时器
     */
    private run_timer() {
        let is_qq = syyx_const.syyx_sdk_channel === igc.e_channel_type.qq
            || syyx_const.syyx_sdk_channel === igc.e_channel_type.web
        if (!this.is_run_timer && is_qq) {
            this.is_run_timer = true
            this.timer_func()
        }
    }

    private timer_id
    private timer_func() {
        let self = this
        this._business_config_data = syyx_manager.get_business_config()
        if (this._business_config_data && this._business_config_data["banner_cool_time"]) {
            this.auto_update_cd = this._business_config_data["banner_cool_time"].value
        }
        this.hide_block()
        this.need_show = true
        this.load_block()

        if (this._ad_param && this._ad_param.style && this._ad_param.style.auto_update) {
            let cd = syyx_sdk_utils.get_random_number(this.auto_update_cd)
            console.log("igc------syyx_ui_block next time to refresh right side block's  cd", cd)
            this.timer_id && clearTimeout(this.timer_id)
            this.timer_id = setTimeout(() => {
                self.timer_func()
            }, cd * 1000)
        }
    }

    private show_block(style, ad_type?: igc.e_ad_type, ad_pos_id?: string, onLoad?: Function,
        onShow?: Function, onClose?: Function, onError?: Function) {
        this._ad_pos_id = ad_pos_id
        this._ad_param = {
            style: style,
            ad_type: ad_type,
            ad_pos_id: ad_pos_id,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError,
        }
        let ad_id = syyx_adv_manager.get_channel_ad_id(ad_pos_id)
        if (!ad_id || ad_id == "1" || ad_id == "0") {
            console.log("igc----- ad_block native_interstitial_id no configure in adv.csv")
            return
        }
        this.run_timer()
    }

    private hide_block() {
        this.need_show = false
        this.destroy_timer()
        syyx_manager.hide_ad(igc.e_ad_type.block, this._ad_pos_id)
    }

    private destroy_timer() {
        this.is_run_timer = false
        //销毁定时器
        this.timer_id && clearTimeout(this.timer_id)
        this.timer_id = undefined
    }

    /**
    * 加载原生插屏
    * @param call_back 加载数据成功回调
    */
    private load_block(call_back?) {

        let self = this

        //当前不需要展示任何banner
        if (!this.need_show) {
            this.hide_block()
            return
        }

        let block_bottom_offset = 5
        if (this._business_config_data && this._business_config_data["block_bottom_offset"]) {
            if (this._business_config_data["block_bottom_offset"].value[0] > 0) {
                block_bottom_offset = this._business_config_data["block_bottom_offset"]
            }
        }

        let vertical_center_y = undefined
        if (this._ad_param.style.vertical_center_y >= -888888) {
            vertical_center_y = this._ad_param.style.vertical_center_y
        }

        let vertical_right = undefined
        if (this._ad_param.style.vertical_right >= 0) {
            vertical_right = this._ad_param.style.vertical_right
        }

        let ad_param = {
            ad_type: igc.e_ad_type.block,
            ad_id: syyx_adv_manager.get_channel_ad_id(this._ad_pos_id),
            ad_pos_id: this._ad_pos_id,
            ad_event: this._ad_pos_id,  //只是填充
            ad_scene: this._ad_pos_id,
            style: {
                left: this._ad_param.style.left >= 20 ? this._ad_param.style.left : 20, //left太小会报错
                top: this._ad_param.style.top >= 50 ? this._ad_param.style.top : 50 //top太小会报错
            },
            vertical_center_y: vertical_center_y,
            vertical_right: vertical_right,
            bottom_offset: block_bottom_offset,//横向展示 且 距离底部的距离
            size: this._ad_param.style.size || 5,
            orientation: this._ad_param.style.orientation || "landscape", //vertical

            onShow: function () {
                console.error("igc-----syyx_adv_manager-------load_block onShow")
                if (!self.need_show) {
                    self.hide_block()
                    return
                }
            },

            onError: function (param, err) {
                console.error("igc-----syyx_adv_manager-------load_block onError", err)
                self._ad_param.onError && self._ad_param.onError(param, err)
            }
        }

        igc.igc_main.instance.create_ad(ad_param)
    }
}


