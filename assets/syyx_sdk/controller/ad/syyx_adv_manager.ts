import { ad_oppo_banner } from './ad_oppo_banner';
import { native_ad_data } from './../../model/model';
import { e_ad_id, e_ad_native_click_pro_type, e_ad_native_state, e_ad_native_type } from "../../configs/syyx_sdk_enum";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";
import { syyx_manager } from "../syyx_manager";
import { e_syyx_sdk_publish_type, syyx_const } from "../../configs/syyx_sdk_config";
import { ad_banner } from "./ad_banner";
import { ad_native_interstitial } from "./ad_native_interstitial";
import { ad_native_inner_interstitial } from "./ad_native_inner_interstitial";
import { ad_native_icon } from "./ad_native_icon";

import ad_block from "./ad_block";

export class syyx_adv_manager {

    /**
     * 原生池
     */
    static _native_data_cache = []

    /**
     * 广告adv配置表
     */
    static _adv_config_data
    /**
     * 配置表初始化完毕
     */
    static __adv_config_inited = false

    /**
     *  积木广告实例
     */
    static _block_instance = {}

    /**
    * 当前原生展示次数
    */
    static cur_native_show_count = 0

    /**
    * 登陆时间戳
    */
    static login_timestamp = 0

    /**
     * 是否已经初始化
     */
    static __inited = false

    /**
     * 原生点击率状态
     */
    static native_click_state = {}

    /**
     * 原生类型的上报情况
     */
    static native_report_record = {}
    /**
     * 加载广告配置 
     */
    static load_adv_config() {
        let self = this
        if (!this.__inited) {
            this.__inited = true
            this.login_timestamp = (new Date()).getTime()
            syyx_sdk_utils.load_resource(syyx_manager.__adv_config_file_path, function (data) {
                if (syyx_const.syyx_sdk_publish === e_syyx_sdk_publish_type.in) { // 不会相等
                    self._adv_config_data = data;
                } else {
                    self._adv_config_data = syyx_sdk_utils.parse_csv(data, "id");
                }

                self._adv_config_data['10200001'].oppo_adv_id = syyx_manager.guobao_get_channel_ad_id('SP') // 激励视频
                self._adv_config_data['10302001'].oppo_adv_id = syyx_manager.guobao_get_channel_ad_id('YSJS') // 原生结算 
                self._adv_config_data['10304001'].oppo_adv_id = syyx_manager.guobao_get_channel_ad_id('YSBN') // 原生banner
                self._adv_config_data['10304002'].oppo_adv_id = syyx_manager.guobao_get_channel_ad_id('YSIC') // 原生icon
                self._adv_config_data['10400001'].oppo_adv_id = syyx_manager.guobao_get_channel_ad_id('BN') // 普通banner
                self._adv_config_data['10600002'].oppo_adv_id = syyx_manager.guobao_get_channel_ad_id('HT') // oppo横版互推盒子
                self._adv_config_data['10600003'].oppo_adv_id = syyx_manager.guobao_get_channel_ad_id('JGG') // oppo九宫格互推盒子
                self._adv_config_data['10301001'].oppo_adv_id = syyx_manager.guobao_get_channel_ad_id('YSCP') // 原生插屏

                self._adv_config_data['10200001'].vivo_adv_id = syyx_manager.guobao_get_channel_ad_id('SP') // 激励视频
                self._adv_config_data['10302001'].vivo_adv_id = syyx_manager.guobao_get_channel_ad_id('YSJS') // 原生结算
                self._adv_config_data['10304001'].vivo_adv_id = syyx_manager.guobao_get_channel_ad_id('YSBN') // 原生banner
                self._adv_config_data['10304002'].vivo_adv_id = syyx_manager.guobao_get_channel_ad_id('YSIC') // 原生icon
                self._adv_config_data['10400001'].vivo_adv_id = syyx_manager.guobao_get_channel_ad_id('BN') // 普通banner
                self._adv_config_data['10600002'].vivo_adv_id = syyx_manager.guobao_get_channel_ad_id('HT') || '' // ov横版互推盒子
                self._adv_config_data['10600003'].vivo_adv_id = syyx_manager.guobao_get_channel_ad_id('JGG') // oppo九宫格互推盒子
                self._adv_config_data['10100001'].vivo_adv_id = syyx_manager.guobao_get_channel_ad_id('CP') // 普通插屏
                self._adv_config_data['10301001'].vivo_adv_id = syyx_manager.guobao_get_channel_ad_id('YSCP') // 原生插屏

                self.__adv_config_inited = true;
                console.log("sdk----- adv config has loaded complete", self._adv_config_data)

                //预加载互推广告盒子
                syyx_manager.pre_load_game_portal_box(e_ad_id.game_portal_box, null, null, null, null)
                syyx_manager.preload_video()
            }, this)

            // 初始化上报记录
            this.init_native_report_record()

        }
    }

    static set_banner_height() {
        ad_oppo_banner.set_banner_height()
    }

    /**
     * 初始化原生上报记录
     */
    static init_native_report_record() {
        this.native_report_record[e_ad_native_type.native_inner_interstitial] = {
            "start_count": 0,
            "show_count": 0,
            "click_count": 0,
        }
        this.native_report_record[e_ad_native_type.native_banner] = {
            "start_count": 0,
            "show_count": 0,
            "click_count": 0,
        }
        this.native_report_record[e_ad_native_type.native_interstitial] = {
            "start_count": 0,
            "show_count": 0,
            "click_count": 0,
        }
        this.native_report_record[e_ad_native_type.native_icon] = {
            "start_count": 0,
            "show_count": 0,
            "click_count": 0,
        }
    }

    static init_first_banner_cd() {
        ad_banner.init_first_banner_cd()
    }

    /**
     * 储存原生数据
     * @param native_data 原生数据
     */
    static add_native_data(native_data) {
        for (let i in this._native_data_cache) {
            if (this._native_data_cache[i].id == native_data.id) {
                return
            }
        }
        let length = this.get_oppo_native_cache_max_length()
        //判断缓存数组长度是否超标
        if (this._native_data_cache.length >= length) {
            this._native_data_cache.splice(0, 1)
        }
        this._native_data_cache.push(native_data)
    }

    /**
     * UI层要展示普通banner或者原生banner
     */
    static show_banner(ad_type?: igc.e_ad_type, ad_pos_id?: string, onLoad?: Function, onShow?: Function, onClose?: Function, onError?: Function) {
        if (!this.__adv_config_inited) {
            return
        }
        ad_banner.show_banner(ad_type, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    /**
    * ui层要隐藏banner或者原生banner
    */
    static hide_banner() {
        if (!this.__adv_config_inited) {
            return
        }
        ad_banner.hide_banner()
    }

    /**
     * 展示原生icon
     * @param parent 原生icon父节点
     */
    static show_native_icon(parent, ad_type?: igc.e_ad_type, ad_pos_id?: string, onLoad?: Function, onShow?: Function, onClose?: Function, onError?: Function) {
        if (!this.__adv_config_inited) {
            return
        }
        ad_native_icon.show_native_icon(parent, ad_type, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    /**
     * 隐藏原生icon
     */
    static hide_native_icon() {
        if (!this.__adv_config_inited) {
            return
        }
        ad_native_icon.hide_native_icon()
    }

    /**
    *  展示原生插屏
    */
    static show_native_interstitial(ad_type?: igc.e_ad_type, ad_pos_id?: string, onLoad?: Function, onShow?: Function, onClose?: Function, onError?: Function) {
        if (!this.__adv_config_inited) {
            return
        }

        let __business_config_data = syyx_manager.__business_config_data
        if(__business_config_data && __business_config_data["vivo_yscp_switch"]) { // 原生插屏开关
            if (__business_config_data["vivo_yscp_switch"].value[0] == 0) {
                onError && onError()
                return
            }
        }
        ad_native_interstitial.load_native_interstitial(ad_type, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    /**
    *  预加载结算原生
    */
    static preload_native_inner_interstitial(ad_type?: igc.e_ad_type, ad_pos_id?: string, onLoad?: Function, onShow?: Function, onClose?: Function, onError?: Function) {
        if (!this.__adv_config_inited) {
            return
        }
        ad_native_inner_interstitial.preload_native_inner_interstitial(ad_type, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    static set_on_click_inner_interstitial_btn(click_back?) {
        if (!this.__adv_config_inited) {
            return
        }
        ad_native_inner_interstitial.set_on_click_inner_interstitial_btn(click_back)
    }

    /**
     * 获取加载好的原生数据
     * @param ignore_id  是否需要忽略某个广告id
     */
    static get_native_data(ignore_id = undefined) {
        if (!ad_banner.can_show_first) {
            console.log("igc ----- oppo's first native ad is in cd")
            return undefined
        }

        //判断各个原生点击率是否超标wednes
        let banner_limit = this.check_is_click_limit(e_ad_native_type.native_banner)
        let inner_limit = this.check_is_click_limit(e_ad_native_type.native_inner_interstitial)
        let interstitial_limit = this.check_is_click_limit(e_ad_native_type.native_interstitial)

        let cur_data_cache = []
        for (let i in this._native_data_cache) {
            if (this._native_data_cache[i].id != ignore_id) {

                if (this._native_data_cache[i].native_type == e_ad_native_type.native_banner && !banner_limit) {
                    cur_data_cache.push(this._native_data_cache[i])
                } else if (this._native_data_cache[i].native_type == e_ad_native_type.native_inner_interstitial && !inner_limit) {
                    cur_data_cache.push(this._native_data_cache[i])
                } else if (this._native_data_cache[i].native_type == e_ad_native_type.native_interstitial && !interstitial_limit) {
                    cur_data_cache.push(this._native_data_cache[i])
                }
            }
        }

        // console.log("根据过滤的id和点击率 筛选的池子:", cur_data_cache)

        if (this.check_native_data_list_is_reprot(cur_data_cache)) {
            //全部数据都上报曝光过了
            // console.log("igc----- syyx_adv_manager use old load native data")
            return this.get_min_order_native_data(cur_data_cache)
        } else {
            //有数据没有上报过曝光  用最新数据
            return this.get_latest_native_data(cur_data_cache)
        }
    }

    /**
     * 点击上报了—-->移除原生数据
     */
    static remove_native_data(native_data: native_ad_data) {
        for (let i in this._native_data_cache) {
            if (this._native_data_cache[i].id == native_data.id) {
                console.log("igc----- syyx_adv_manager remove native_data:", native_data)
                this._native_data_cache.splice(parseInt(i), 1)
                return
            }
        }
    }

    /**
     * 获取加载好的原生数据
     * @param ad_pos_id 配置表广告Id
     */
    static get_local_native_data(ad_pos_id?): native_ad_data {
        return this.get_native_data()
    }

    /**
     * 上报原生点击
     * @param ad_pos_id 
     * @param ad_unit_id 
     */
    static report_ad_click(ad_pos_id: string, native_data?) {
        let ad_id = this.get_channel_ad_id(native_data.adPosId)
        if (!ad_id) {
            console.log("igc----- syyx_manager report_ad_click ad_id no configure in adv.csv")
            return
        }

        if (!native_data) {
            console.log("igc----- syyx_adv_mamager report_ad_click native_data is null")
            return
        }

        console.log("igc ----- has been in report ad click")
        if (native_data.state != e_ad_native_state.show) {
            console.log("igc----- syyx_adv_mamager report_ad_click native_data state is not e_ad_native_state.show")
            return
        }

        //记录------原生数据上报记录
        let report_data = this.native_report_record[native_data.native_type]
        report_data.click_count = Math.min(++report_data.click_count, report_data.show_count)

        let ad_unit_id = native_data.adUnitId
        let param = {
            ad_id: ad_id,
            ad_unit_id: ad_unit_id,
            ad_type: igc.e_ad_type.native,
            ad_pos_id: native_data.adPosId,
            ad_event: ad_id,
            ad_scene: ad_id,
            sub_ad_type: igc.e_ad_native_type.native_banner_dialog
        }
        igc.igc_main.instance.report_ad_click(param)
        //移除上报过点击的数据
        this.remove_native_data(native_data)

        ad_banner.report_ad_click(ad_pos_id, native_data)
        ad_native_icon.report_ad_click(ad_pos_id, native_data)
        ad_native_interstitial.report_ad_click(ad_pos_id, native_data)
        ad_native_inner_interstitial.report_ad_click(ad_pos_id, native_data)
    }

    /**
     * 上报原生曝光
     * @param ad_pos_id //配置表广告ID 
     * @param ad_unit_id //原生数据上报ID
     */
    static report_ad_show(ad_pos_id: string, native_data?) {
        let ad_id = syyx_adv_manager.get_channel_ad_id(native_data.adPosId)
        if (!ad_id || ad_id == "1" || ad_id == "0") {
            console.log("igc----- syyx_manager report_ad_show ad_id no configure in adv.csv")
            return
        }

        if (!native_data) {
            console.log("igc----- syyx_adv_mamager report_ad_show native_data is null")
            return
        }

        //原生数据展示order +1
        let max_order = syyx_adv_manager.get_native_data_list_max_order()
        native_data.order = max_order + 1

        if (native_data.state == e_ad_native_state.need_show || syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {

            if (native_data.state == e_ad_native_state.need_show) {
                //记录------原生数据上报记录
                let report_data = this.native_report_record[native_data.native_type]
                report_data.show_count++
                report_data.start_count++
            }

            let param = {
                ad_id: ad_id,
                ad_unit_id: native_data.adUnitId,
                ad_type: igc.e_ad_type.native,
                ad_pos_id: native_data.adPosId,
                ad_event: ad_id,
                ad_scene: ad_id,
                sub_ad_type: igc.e_ad_native_type.native_banner_dialog
            }
            igc.igc_main.instance.report_ad_show(param)
            native_data.state = e_ad_native_state.show // 加载到数据，曝光后state为2。没曝光还是继续可以用原数据展示
        }

        ad_banner.report_ad_show(ad_pos_id, native_data)
        ad_native_icon.report_ad_show(ad_pos_id, native_data)
        ad_native_interstitial.report_ad_show(ad_pos_id, native_data)
        ad_native_inner_interstitial.report_ad_show(ad_pos_id, native_data)
    }

    static set_normal_banner_switch(value) {
        ad_banner.set_normal_banner_switch(value)
    }

    /**
     * 获取手q banner 上移距离
     */
    static get_qq_banner_top_offset() {
        let business_config = syyx_manager.get_business_config()
        if (business_config && business_config["banner_top_offset"]) {
            if (business_config["banner_top_offset"].value) {
                let offset = business_config["banner_top_offset"].value
                return offset[0] + Math.floor(Math.random() * (offset[1] - offset[0]))
            }
        }
        return 0
    }

    static show_block(style, ad_type?: igc.e_ad_type, ad_pos_id?: string, onLoad?: Function, onShow?: Function, onClose?: Function, onError?: Function) {
        if (!this._block_instance[ad_pos_id]) {
            this._block_instance[ad_pos_id] = new ad_block()
        }
        if (!this.__adv_config_inited) {
            return
        }
        this._block_instance[ad_pos_id].show_block(style, ad_type, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    static hide_block(ad_pos_id) {
        if (!this.__adv_config_inited) {
            return
        }
        if (this._block_instance[ad_pos_id]) {
            this._block_instance[ad_pos_id].hide_block()
        }
    }

    static hide_all_block() {
        if (!this.__adv_config_inited) {
            return
        }
        for (let i in this._adv_config_data) {
            if (this._adv_config_data[i].adv_type == igc.e_ad_type.block) {
                let ad_pos_id = this._adv_config_data[i].id
                if (this._block_instance[ad_pos_id]) {
                    this._block_instance[ad_pos_id].hide_block()
                }
            }
        }
    }

    /**
     * 是否开启oppo新规
     */
    static check_is_open_oppo_rule() {
        let business_config = syyx_manager.get_business_config()
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg || syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg || syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            return true
        }
        return false
    }

    /**
     * 增加原生广告展示次数
     */
    static add_native_show_count() {
        if (this.check_is_open_oppo_rule()) {
            this.cur_native_show_count++
        }
    }

    /**
     * 当前游戏时长
     */
    static get_play_game_time() {
        let cur_timestamp = (new Date()).getTime()
        return (cur_timestamp - this.login_timestamp) / 1000
    }

    /**
     * 判断当前是否达到展示次数上限
     */
    static check_is_show_count_limit() {

        if (!this.check_is_open_oppo_rule()) {
            return false
        }

        let oppo_native_show_limit = [60, 2]
        let business_config = syyx_manager.get_business_config()
        if (business_config && business_config["oppo_native_show_limit"] && business_config["oppo_native_show_limit"].value) {
            oppo_native_show_limit = business_config["oppo_native_show_limit"].value
        }

        let play_game_time = this.get_play_game_time()
        let cur_show_limit = 2
        if (play_game_time >= 0) {
            cur_show_limit = (Math.floor(play_game_time / oppo_native_show_limit[0]) + 1) * oppo_native_show_limit[1]
        }
        return syyx_adv_manager.cur_native_show_count >= cur_show_limit
    }

    /**
     * 获取原生数据缓存数组的最大长度
     */
    static get_oppo_native_cache_max_length() {
        let length = 20
        let business_config = syyx_manager.get_business_config()
        if (business_config && business_config["oppo_native_cache_length"] && business_config["oppo_native_cache_length"].value) {
            length = business_config["oppo_native_cache_length"].value[0]
        }
        return length || 20
    }

    /**
     * 检查全部原生数据是否都为已曝光过的
     */
    static check_native_data_list_is_reprot(native_data_list) {
        if (native_data_list.length > 0) {
            for (let i in native_data_list) {
                if (native_data_list[i].state != e_ad_native_state.show) {
                    return false
                }
            }
        }
        return true
    }

    /**
     * 最近拉取到的原生数据  或者 没有上报过的数据
     */
    static get_latest_native_data(native_data_list) {

        for (let i in native_data_list) {
            if (native_data_list[i].state == e_ad_native_state.need_show) {
                return native_data_list[i]
            }
        }

        if (native_data_list.length > 0) {
            return native_data_list[native_data_list.length - 1]
        }
        return undefined
    }

    /**
     * 获取数据最大的order
     */
    static get_native_data_list_max_order(native_data_list = undefined) {
        let list = []
        let order = 0
        if (native_data_list && native_data_list.length > 0) {
            list = native_data_list
        } else {
            list = this._native_data_cache
        }
        if (list.length > 0) {
            for (let i in list) {
                if (list[i].order > order) {
                    order = list[i].order
                }
            }
        }
        return order || 0
    }

    /**
     * 获取数据中最小order的数据
     * @param native_data_list 原生数据数组
     */
    static get_min_order_native_data(native_data_list) {
        let data = undefined
        let length = native_data_list.length
        if (length > 0) {
            for (let i in native_data_list) {
                if (!data || native_data_list[i].order <= data.order) {
                    data = native_data_list[i]
                }
            }
        }
        return data
    }

    /**
    * 检查点击率是否超标
    * @param native_ad_type 原生类型
    */
    static check_is_click_limit(native_ad_type) {
        let self = this
        let is_limit = false
        let report_data = this.native_report_record[native_ad_type]
        //当前已经处于点击率限制冷却时间中
        if (this.native_click_state[native_ad_type] == e_ad_native_click_pro_type.cooling) { 
            // console.log("igc----- syyx_adv_manager native_type", native_ad_type, "is click limit? true!")
            return true
        }

        let cur_click_pro = report_data.click_count / report_data.show_count
        let start_count = 10
        let limit_pro = 1
        let cool_time = 60
        let business_config = syyx_manager.get_business_config()
        if (business_config) {
            if (native_ad_type == e_ad_native_type.native_banner) {
                start_count = business_config["native_banner_click_pro_limit"].value[0]
                limit_pro = business_config["native_banner_click_pro_limit"].value[1]
                cool_time = business_config["native_banner_click_pro_limit"].value[2]
            } else if (native_ad_type == e_ad_native_type.native_inner_interstitial) {
                start_count = business_config["native_inner_click_pro_limit"].value[0] // 1000
                limit_pro = business_config["native_inner_click_pro_limit"].value[1] // 0.4
                cool_time = business_config["native_inner_click_pro_limit"].value[2] // 60
            } else if (native_ad_type == e_ad_native_type.native_interstitial) {
                start_count = business_config["native_interstitial_click_pro_limit"].value[0]
                limit_pro = business_config["native_interstitial_click_pro_limit"].value[1]
                cool_time = business_config["native_interstitial_click_pro_limit"].value[2]
            }

            if (report_data.start_count > 0 && report_data.start_count % start_count == 0) {
                is_limit = cur_click_pro >= limit_pro // 一开始为false
            }
        }

        if (!this.native_click_state[native_ad_type]) {
            this.native_click_state[native_ad_type] = e_ad_native_click_pro_type.active
        }
        if (is_limit && this.native_click_state[native_ad_type] == e_ad_native_click_pro_type.active) {
            this.native_click_state[native_ad_type] = e_ad_native_click_pro_type.cooling
            console.log("igc----- syyx_adv_manager run native click limit cool timer!!!", cool_time)
            setTimeout(function () {
                //解除点击率限制
                self.native_click_state[native_ad_type] = e_ad_native_click_pro_type.active
                report_data.start_count = 0
            }, cool_time * 1000)
        }
        return is_limit // 一开始为false
    }

    /**
    * 根据渠道获取广告id
    */
    static get_channel_ad_id(ad_pos_id) {
        if (!this.__adv_config_inited) {
            return ""
        }

        try {
            if (syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
                return this._adv_config_data[ad_pos_id].oppo_adv_id
            } else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                return this._adv_config_data[ad_pos_id].vivo_adv_id
            } else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.tt) {
                return this._adv_config_data[ad_pos_id].tt_adv_id
            } else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.qq) {
                return this._adv_config_data[ad_pos_id].qq_adv_id
            } else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.wx) {
                return this._adv_config_data[ad_pos_id].wx_adv_id
            } else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.apk) {
                return this._adv_config_data[ad_pos_id].apk_adv_id
            } else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
                return "web_ad_id"
            }
        } catch (error) {
            console.error("adv.csv do not have the ad_id of the ad_pos_id: " + ad_pos_id)
        }
    }

    /**
     * 是否初始化完成
     */
    static is_inited() {
        return this.__inited
    }
}


