import { native_ad_data } from "../../model/model";
import { e_ad_native_state, e_ad_native_type } from "../../configs/syyx_sdk_enum";
import { syyx_manager } from "../syyx_manager";
import { syyx_const } from "../../configs/syyx_sdk_config";
import { syyx_adv_manager } from "./syyx_adv_manager";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";
import { ad_banner } from "./ad_banner";

export class ad_native_icon {
    /**
      * 原生数据
      */
    static _native_data_list = []

    /**
    * 远端运营配置
    */
    static _business_config_data = {};

    /**
     * 配置表广告id
     */
    static _ad_pos_id

    /**
     * 创建广告时传入的参数
     */
    static _ad_param

    /**
     * banner自动刷新时间
     */
    static auto_update_cd = [20, 20]

    /**
     * 刷新定时器是否开启
     */
    static is_run_timer = false

    /**
     * 原生icon 父节点
     */
    static icon_parent

    /**
     * 当前是否需要展示banner
     */
    static need_show = true

    /**
     * 自动刷新定时器
     */
    static run_timer() {
        if (!this.is_run_timer && this.is_oppo_vivo()) { // 一开始is_run_timerfalse
            this.is_run_timer = true
            this.timer_func()
        }
    }

    static timer_id
    static timer_func() {
        let self = this
        this._business_config_data = syyx_manager.get_business_config()
        if (this._business_config_data && this._business_config_data["native_icon_cool_time"]) {
            this.auto_update_cd = this._business_config_data["native_icon_cool_time"].value
        }
        this.load_native_icon()
        let cd = syyx_sdk_utils.get_random_number(this.auto_update_cd) // 20秒

        this.timer_id && clearTimeout(this.timer_id)
        this.timer_id = setTimeout(() => {
            self.timer_func()
        }, cd * 1000)
    }

    static report_ad_click(ad_pos_id: string, native_data?) {
        if (this._ad_pos_id != ad_pos_id) {
            return
        }
        console.log("igc ----- has in native icon 's report click ")

        //上报的是原生banner点击  隐藏原生bannerUi 重新请求新的原生banner数据
        this._business_config_data = syyx_manager.get_business_config()
        if (this._business_config_data && this._business_config_data["native_icon_report_click_update_switch"]) {
            if (this._business_config_data["native_icon_report_click_update_switch"].value[0] == 1) { // 原生icon点击上报后立即刷新
                this.destroy_timer()
                this.icon_parent && this.show_native_icon(this.icon_parent, this._ad_param.ad_type, this._ad_param.ad_pos_id, this._ad_param.onLoad,
                    this._ad_param.onShow, this._ad_param.onClose, this._ad_param.onError)
            }
        }
    }

    static report_ad_show(ad_pos_id: string, native_data) {
        if (this._ad_pos_id == ad_pos_id) {
        }
    }

    static show_native_icon(parent, ad_type?: igc.e_ad_type, ad_pos_id?: string, onLoad?: Function, onShow?: Function, onClose?: Function, onError?: Function) {
        this._ad_pos_id = ad_pos_id
        this._ad_param = {
            ad_type: ad_type,
            ad_pos_id: ad_pos_id,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError,
        }

        this.need_show = true
        this.icon_parent = parent

        let ad_id = syyx_adv_manager.get_channel_ad_id(ad_pos_id)
        if (!ad_id) {
            return
        }
        //原生icon远端配置开关是否开启
        this._business_config_data = syyx_manager.get_business_config()
        if (this._business_config_data && this._business_config_data["native_icon_switch"]) {
            if (this._business_config_data["native_icon_switch"].value[0] == 1) {
                this.run_timer()
            } else {
                console.log("sdk----- config - native icon is close")
            }
        }
    }

    static hide_native_icon() {
        this.need_show = false
        this.icon_parent = undefined
        this.hide_native_icon_ui()
        this.destroy_timer()
    }

    static destroy_timer() {
        this.is_run_timer = false
        //销毁定时器
        this.timer_id && clearTimeout(this.timer_id)
        this.timer_id = undefined
    }

    /**
    * 加载原生插屏
    * @param call_back 加载数据成功回调
    */
    static load_native_icon(call_back?) {

        let self = this

        if (!ad_banner.can_show_first) {
            console.log("igc----- is in oppo first ad cd")
            return
        }

        //当前不需要展示任何banner
        if (!this.need_show) {
            this.hide_native_icon_ui()
            return
        }

        let native_data = this.get_native_data()

        //上一个加载的原生banner没有展示过
        if (native_data && native_data.state == e_ad_native_state.need_show) {
            this.show_native_icon_ui()
            return
        }

        //web渠道  返回假数据
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            let data = new native_ad_data()
            data.id = igc.utils_manager.get_random_name()
            data.adPosId = this._ad_pos_id
            data.adId = syyx_sdk_utils.get_random_number([100, 200])
            data.adUnitId = syyx_sdk_utils.get_random_number([0, 100000])
            data.imgUrlList = "https://static-cdn.llewan.com/h5/ddsdk/plugin/share_img.jpg"
            data.title = "原生icon标题" + syyx_sdk_utils.get_random_number([100, 200])
            data.desc = "原生icon描述" + syyx_sdk_utils.get_random_number([100, 200])
            data.state = e_ad_native_state.need_show
            data.native_type = e_ad_native_type.native_icon
            this.add_native_data(data)
            this._ad_param.onLoad && this._ad_param.onLoad({}, data)
            this.show_native_icon_ui()
            call_back && call_back()
            return
        }

        syyx_manager.create_ad(igc.e_ad_type.native, this._ad_pos_id,
            function on_load(param, ad_data_list) {
                console.log("igc-----syyx_adv_manager-------load_native_icon on_load", ad_data_list)
                //返回数据异常
                if (ad_data_list == undefined || !ad_data_list[0]) {

                } else {
                    let length = 0
                    if (syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                        //vivo渠道只取最后一个位置
                        length = ad_data_list.length - 1
                    }

                    let imgUrlList
                    if (syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
                        imgUrlList = syyx_sdk_utils.format_remote_texture_url(ad_data_list[length].iconUrlList[0])
                    } else {
                        imgUrlList = syyx_sdk_utils.format_remote_texture_url(ad_data_list[length].imgUrlList[0])
                    }

                    let data = new native_ad_data()
                    data.id = igc.utils_manager.get_random_name()
                    data.adPosId = self._ad_pos_id
                    data.adId = syyx_adv_manager.get_channel_ad_id(self._ad_pos_id)
                    data.adUnitId = ad_data_list[length].adUnitId
                    data.imgUrlList = imgUrlList
                    data.title = ad_data_list[length].title
                    data.desc = ad_data_list[length].desc
                    data.state = e_ad_native_state.need_show
                    data.native_type = e_ad_native_type.native_icon
                    self.add_native_data(data) // 存好数据
                    self._ad_param.onLoad && self._ad_param.onLoad({}, data)
                    self.show_native_icon_ui() // 展示数据
                }
            },
            function on_show() {
            },
            function on_close(param, res) {
            },
            function on_error(param, err) {
                console.error("igc-----syyx_adv_manager-------load_native_icon onError", err)

                //原生icon报错就用之前的老数据
                let native_data = self.get_native_data()
                if (native_data) {
                    self.show_native_icon_ui()
                }

                self._ad_param.onError && self._ad_param.onError()
            }
        )
    }

    /**
    * 展示原生IconUi
    */
    static show_native_icon_ui() {
        let self = this
        self.hide_native_icon_ui()
        if (!this.need_show) {
            console.log("igc----- the current interface doesn't need to show native icon so that do not refresh native data")
            return
        }

        if (!this.icon_parent) {
            console.log("igc----- the native icon's parent node is not exist")
            return
        }

        if (this.is_oppo_vivo()) {
            let native_data = this.get_native_data()
            //展示原生IconUI
            if (this.need_show && native_data) {
                syyx_manager.create_native_icon(function (view) {
                    view.show && view.show(self.icon_parent, native_data)
                })
            }
        }
    }

    /**
     * 隐藏原生IconUi
     */
    static hide_native_icon_ui() {
        if (this.is_oppo_vivo()) {
            //隐藏原生iconUI
            syyx_manager.create_native_icon(function (view) {
                view.hide && view.hide()
            })
        }
    }

    static is_oppo_vivo() {
        let is_oppo = syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg
            || syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg
            || syyx_const.syyx_sdk_channel === igc.e_channel_type.web

        return is_oppo
    }

    /**
     * 获取最新的原生Banner数据
     */
    static get_native_data() {
        //是否启动OPPO新规
        if (syyx_adv_manager.check_is_open_oppo_rule()) { // ov为ture
            if (syyx_adv_manager.check_native_data_list_is_reprot(this._native_data_list)) {
                //全部数据都上报曝光过了
                console.log("igc----- ad_native_icon use old load native data")
                return syyx_adv_manager.get_min_order_native_data(this._native_data_list)
            } else {
                //有数据没有上报过曝光  用最新数据
                return syyx_adv_manager.get_latest_native_data(this._native_data_list)
            }
        } else {
            return this._native_data_list[0]
        }
    }

    /**
     * 储存原生数据
     * @param native_data 原生数据
     */
    static add_native_data(native_data) {
        if (syyx_adv_manager.check_is_open_oppo_rule()) {
            for (let i in this._native_data_list) {
                if (this._native_data_list[i].adUnitId == native_data.adUnitId) {
                    return
                }
            }
            let length = syyx_adv_manager.get_oppo_native_cache_max_length() // 20
            //判断缓存数组长度是否超标
            if (this._native_data_list.length >= length) {
                this._native_data_list.splice(0, 1)
            }
            this._native_data_list.push(native_data)
        } else {
            this._native_data_list[0] = native_data
        }
    }
}


