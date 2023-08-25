import { native_ad_data, syyx_view } from "../../model/model";
import { e_ad_id, e_ad_native_state, e_ad_native_type } from "../../configs/syyx_sdk_enum";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";
import { syyx_manager } from "../syyx_manager";
import { syyx_const } from "../../configs/syyx_sdk_config";
import { ad_banner } from "./ad_banner";
import { syyx_adv_manager } from "./syyx_adv_manager";
import { syyx_sdk_api } from "../../syyx_sdk_api";
export class ad_native_interstitial {
    /**
    * 上一次显示的id
    */
    static _last_ad_id = undefined
    /**
      * 原生数据
      */
    static _native_data_list = []

    /**
    * 远端运营配置
    */
    static _business_config_data = {};

    /**
     * 广告id
     */
    static _ad_pos_id

    /**
     * 普通插屏配置表id
     */
    static _normal_ad_pos_id

    /**
    * 创建广告时传入的参数
    */
    static _ad_param

    static show_count = 0

    static next_click_wrap_count = -1

    static check_is_click_wrap() {
        this._business_config_data = syyx_manager.get_business_config()
        if (this._business_config_data && this._business_config_data["native_interstitial_click_wrap"]) {
            let rule = syyx_sdk_api.get_business_data_by_key('native_interstitial_click_wrap')
            if (rule) {
                if (this.next_click_wrap_count == -1) {
                    this.next_click_wrap_count = rule[0]
                }
                if (this.show_count == this.next_click_wrap_count) {
                    console.log("igc----- native_interstitial is easy click!")
                    this.next_click_wrap_count += rule[1] + Math.floor(Math.random() * (rule[2] - rule[1] + 1))
                    console.log("igc----- native_interstitial next easy click count：", this.next_click_wrap_count)
                    return true
                }
            } else {
                return false
            }
        }
        return false
    }

    static report_ad_click(ad_pos_id: string, native_data?) {

        if (!this._ad_pos_id) {
            console.log("igc----- ad_native_interstitial  report_ad_click this.ad_pos_id is null!!")
            this._ad_pos_id = e_ad_id.native_interstitial_hall
        }

        if (this._ad_pos_id != ad_pos_id) {
            return
        }

        //上报的是原生插屏点击  隐藏原生插屏Ui 重新请求新的原生插屏数据
        this.hide_native_interstitial_ui()

        this._business_config_data = syyx_manager.get_business_config()
        if (this._business_config_data && this._business_config_data["native_interstitial_report_click_update_switch"]) {
            if (this._business_config_data["native_interstitial_report_click_update_switch"].value[0] == 1) {
                this.load_native_interstitial(this._ad_param.ad_type, this._ad_param.ad_pos_id, this._ad_param.onLoad,
                    this._ad_param.onShow, this._ad_param.onClose, this._ad_param.onError)
            }
        }
    }

    static report_ad_show(ad_pos_id: string, native_data) {

        if (!this._ad_pos_id) {
            console.log("igc----- ad_native_interstitial  report_ad_click this.ad_pos_id is null!!")
            this._ad_pos_id = e_ad_id.native_interstitial_hall
        }

        if (this._ad_pos_id == ad_pos_id) {
            this._last_ad_id = native_data.id
            ad_banner.hide_banner()
        }
    }

    static check_can_load_native_interstitial() {
        this._business_config_data = syyx_manager.get_business_config()
        if (this._business_config_data && this._business_config_data["load_native_interstitial_rule"]) {
            if ((this.show_count + 1) % this._business_config_data["load_native_interstitial_rule"].value[0] == 0) {
                return true
            } else {
                return false
            }
        }
        return true
    }

    /**
    * 加载原生插屏
    */
    static load_native_interstitial(ad_type?: igc.e_ad_type, ad_pos_id?: string, onLoad?: Function, onShow?: Function, onClose?: Function, onError?: Function) {
        let self = this

        if (!ad_banner.can_show_first) {
            console.log("igc----- is in oppo first ad cd")
            return
        }

        if (syyx_adv_manager.check_is_click_limit(e_ad_native_type.native_interstitial)) {
            this.hide_native_interstitial_ui()
            return
        }

        this._ad_pos_id = ad_pos_id
        this._ad_param = {
            ad_type: ad_type,
            ad_pos_id: ad_pos_id,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError,
        }

        let ad_id = syyx_adv_manager.get_channel_ad_id(ad_pos_id)
        if (!ad_id) {
            console.log("igc----- ad_native_interstitial native_interstitial_id no configure in adv.csv")
            return
        }

        if (!this.check_can_load_native_interstitial()) {
            console.log("igc-----syyx_adv_manager------ limit load_native_interstitial!!!")
            console.error("igc-----syyx_adv_manager-------load_native_interstitial onError")
            onError && onError()
            self.load_native_interstitial_error()
            return
        }

        //上一个加载的原生banner没有展示过
        let latest_data = syyx_adv_manager.get_latest_native_data(this._native_data_list)
        if (latest_data && latest_data.state == e_ad_native_state.need_show) {
            //展示原生插屏
            self.show_native_interstitial_ui(latest_data)
            onLoad && onLoad({}, latest_data)
            onShow && onShow()
            return
        }

        //web渠道  返回假数据
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            let data = new native_ad_data()
            data.id = igc.utils_manager.get_random_name()
            data.adPosId = ad_pos_id
            data.adId = "1"
            data.adUnitId = syyx_sdk_utils.get_random_number([0, 100000])
            data.imgUrlList = "https://static-cdn.llewan.com/h5/ddsdk/plugin/share_img.jpg"
            data.title = "原生插屏标题" + syyx_sdk_utils.get_random_number([200, 300])
            data.desc = "原生插屏描述" + syyx_sdk_utils.get_random_number([200, 300])
            data.state = e_ad_native_state.need_show
            data.native_type = e_ad_native_type.native_interstitial
            this.add_native_data(data)
            //展示原生插屏
            this.show_native_interstitial_ui(data)
            onLoad && onLoad({}, data)
            onShow && onShow()
            return
        }

        syyx_manager.create_ad(igc.e_ad_type.native, ad_pos_id,
            function on_load(param, ad_data_list) {
                console.log("igc-----syyx_adv_manager-------load_native_interstitial on_load", ad_data_list)
                //返回数据异常
                if (ad_data_list == undefined || !ad_data_list[0]) {
                    onError && onError()
                } else {
                    let length = 0
                    if (syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                        //vivo渠道只取最后一个位置
                        length = ad_data_list.length - 1
                    }
                    let data = new native_ad_data()
                    data.id = igc.utils_manager.get_random_name()
                    data.adPosId = ad_pos_id
                    data.adId = syyx_adv_manager.get_channel_ad_id(ad_pos_id)
                    data.adUnitId = ad_data_list[length].adUnitId
                    data.imgUrlList = syyx_sdk_utils.format_remote_texture_url(ad_data_list[length].imgUrlList[0])
                    data.title = ad_data_list[length].title
                    data.desc = ad_data_list[length].desc
                    data.state = e_ad_native_state.need_show
                    data.native_type = e_ad_native_type.native_interstitial
                    self.add_native_data(data)
                    //展示原生插屏
                    self.show_native_interstitial_ui(data)
                    onLoad && onLoad({}, data)
                    onShow && onShow()
                    // syyx_adv_manager.add_native_show_count()
                }
            },
            function on_show() {
            },
            function on_close(param, res) {
            },
            function on_error(param, err) {
                onError && onError()
                console.error("igc-----syyx_adv_manager-------load_native_interstitial onError", err)
                self.load_native_interstitial_error()
            }
        )
    }

    /**
     * 加载原生插屏失败
     */
    static load_native_interstitial_error() {
        let native_data = undefined
        if (this.check_can_load_native_interstitial()) {
            native_data = syyx_adv_manager.get_native_data(this._last_ad_id)
        } else {
            native_data = this.get_native_data(this._last_ad_id, e_ad_native_type.native_interstitial)
        }

        if (native_data) {
            //自己有数据的话
            this.show_native_interstitial_ui(native_data)
        } else {
            this.show_normal_interstitial()
        }
    }

    /**
     * 普通插屏报错
     */
    static load_normal_interstitial_error() {
        let native_data = undefined
        if (this.check_can_load_native_interstitial()) {
            native_data = syyx_adv_manager.get_native_data()
        } else {
            native_data = this.get_native_data(undefined, e_ad_native_type.native_interstitial)
        }
        if (native_data) {
            //自己有数据的话
            this.show_native_interstitial_ui(native_data)
        }
    }

    static show_normal_interstitial() {
        let self = this
        this._normal_ad_pos_id = syyx_adv_manager._adv_config_data[e_ad_id.native_interstitial_hall].backup_id || undefined
        if (syyx_const.syyx_sdk_channel == igc.e_channel_type.vivo_qg && this._normal_ad_pos_id) {
            syyx_manager.create_ad(
                igc.e_ad_type.interstitial,
                this._normal_ad_pos_id,
                function () {
                    ad_banner.hide_banner()
                },
                function () { },
                function () {
                },
                function () {
                    //普通插屏加载报错
                    self.load_normal_interstitial_error()
                })
        }
    }

    /**
     * 展示带遮罩的原生插屏
     */
    static show_native_interstitial_ui(native_data) {
        syyx_sdk_api.create_interstitial(function (view) {
            view.show && view.show(native_data);
        });
    }

    /**
    * 隐藏带遮罩的原生插屏
    */
    static hide_native_interstitial_ui() {
        syyx_sdk_api.load_view(syyx_view.interstitial, function (view) {
            view.hide && view.hide();
        });
    }

    /**
     * 储存原生数据
     * @param native_data 原生数据
     */
    static add_native_data(native_data) {
        if (syyx_adv_manager.check_is_open_oppo_rule()) {
            syyx_adv_manager.add_native_data(native_data)
        } else {
            this._native_data_list[0] = native_data
        }
    }

    /**
     *  原生插屏只是用原生Banner和结算原生数据
     */
    static get_native_data(ignore_id = undefined, ignore_type = undefined) {
        if (!ad_banner.can_show_first) {
            console.log("igc ----- oppo's first native ad is in cd")
            return undefined
        }

        //判断各个原生点击率是否超标
        let banner_limit = syyx_adv_manager.check_is_click_limit(e_ad_native_type.native_banner)
        let inner_limit = syyx_adv_manager.check_is_click_limit(e_ad_native_type.native_inner_interstitial)
        let interstitial_limit = syyx_adv_manager.check_is_click_limit(e_ad_native_type.native_interstitial)

        // console.log("原生插屏使用原生池 筛选条件--------->忽略id：", ignore_id, "忽略原生类型：", ignore_type)

        // console.log("原生Banner点击率:", banner_limit)
        // console.log("结算原生点击率:", inner_limit)
        // console.log("原生插屏点击率:", interstitial_limit)

        let cur_data_cache = []
        for (let i in syyx_adv_manager._native_data_cache) {
            if (syyx_adv_manager._native_data_cache[i].id != ignore_id && syyx_adv_manager._native_data_cache[i].native_type != ignore_type) {
                if (syyx_adv_manager._native_data_cache[i].native_type == e_ad_native_type.native_banner && !banner_limit) {
                    cur_data_cache.push(syyx_adv_manager._native_data_cache[i])
                } else if (syyx_adv_manager._native_data_cache[i].native_type == e_ad_native_type.native_inner_interstitial && !inner_limit) {
                    cur_data_cache.push(syyx_adv_manager._native_data_cache[i])
                } else if (syyx_adv_manager._native_data_cache[i].native_type == e_ad_native_type.native_interstitial && !interstitial_limit) {
                    cur_data_cache.push(syyx_adv_manager._native_data_cache[i])
                }
            }
        }

        let banner_list = []
        let inner_list = []

        for (let i in cur_data_cache) {
            if (cur_data_cache[i].native_type == e_ad_native_type.native_banner) {
                banner_list.push(cur_data_cache[i])
            } else if (cur_data_cache[i].native_type == e_ad_native_type.native_inner_interstitial) {
                inner_list.push(cur_data_cache[i])
            }
        }

        this._business_config_data = syyx_manager.get_business_config()
        if (this._business_config_data && this._business_config_data["first_use_natibe_banner"]) {
            if (this._business_config_data["first_use_natibe_banner"].value[0] == 1) {
                if (banner_list.length > 0) {
                    // console.log("原生插屏使用原生banner数据")
                    return this.get_cur_data(banner_list)
                } else {
                    if (inner_list.length > 0) {
                        // console.log("原生插屏使用结算原生数据")
                        return this.get_cur_data(inner_list)
                    }
                }
            } else {
                if (inner_list.length > 0) {
                    // console.log("原生插屏使用结算原生数据")
                    return this.get_cur_data(inner_list)
                } else {
                    if (banner_list.length > 0) {
                        // console.log("原生插屏使用原生banner数据")
                        return this.get_cur_data(banner_list)
                    }
                }
            }
        }
        return undefined
    }

    static get_cur_data(cur_data_cache) {
        if (syyx_adv_manager.check_native_data_list_is_reprot(cur_data_cache)) {
            //全部数据都上报曝光过了
            console.log("igc----- syyx_adv_manager use old load native data")
            return syyx_adv_manager.get_min_order_native_data(cur_data_cache)
        } else {
            //有数据没有上报过曝光  用最新数据
            console.log("igc----- syyx_adv_manager use new load native data")
            return syyx_adv_manager.get_latest_native_data(cur_data_cache)
        }
    }
}


