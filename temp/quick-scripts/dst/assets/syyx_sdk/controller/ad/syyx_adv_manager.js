
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/ad/syyx_adv_manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf70bP4he5AFZtAv4kF/8FO', 'syyx_adv_manager');
// syyx_sdk/controller/ad/syyx_adv_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syyx_adv_manager = void 0;
var ad_oppo_banner_1 = require("./ad_oppo_banner");
var syyx_sdk_enum_1 = require("../../configs/syyx_sdk_enum");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var syyx_manager_1 = require("../syyx_manager");
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var ad_banner_1 = require("./ad_banner");
var ad_native_interstitial_1 = require("./ad_native_interstitial");
var ad_native_inner_interstitial_1 = require("./ad_native_inner_interstitial");
var ad_native_icon_1 = require("./ad_native_icon");
var ad_block_1 = require("./ad_block");
var syyx_adv_manager = /** @class */ (function () {
    function syyx_adv_manager() {
    }
    /**
     * 加载广告配置
     */
    syyx_adv_manager.load_adv_config = function () {
        var self = this;
        if (!this.__inited) {
            this.__inited = true;
            this.login_timestamp = (new Date()).getTime();
            syyx_sdk_utils_1.syyx_sdk_utils.load_resource(syyx_manager_1.syyx_manager.__adv_config_file_path, function (data) {
                if (syyx_sdk_config_1.syyx_const.syyx_sdk_publish === syyx_sdk_config_1.e_syyx_sdk_publish_type.in) { // 不会相等
                    self._adv_config_data = data;
                }
                else {
                    self._adv_config_data = syyx_sdk_utils_1.syyx_sdk_utils.parse_csv(data, "id");
                }
                self._adv_config_data['10200001'].oppo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('SP'); // 激励视频
                self._adv_config_data['10302001'].oppo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('YSJS'); // 原生结算 
                self._adv_config_data['10304001'].oppo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('YSBN'); // 原生banner
                self._adv_config_data['10304002'].oppo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('YSIC'); // 原生icon
                self._adv_config_data['10400001'].oppo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('BN'); // 普通banner
                self._adv_config_data['10600002'].oppo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('HT'); // oppo横版互推盒子
                self._adv_config_data['10600003'].oppo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('JGG'); // oppo九宫格互推盒子
                self._adv_config_data['10301001'].oppo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('YSCP'); // 原生插屏
                self._adv_config_data['10200001'].vivo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('SP'); // 激励视频
                self._adv_config_data['10302001'].vivo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('YSJS'); // 原生结算
                self._adv_config_data['10304001'].vivo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('YSBN'); // 原生banner
                self._adv_config_data['10304002'].vivo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('YSIC'); // 原生icon
                self._adv_config_data['10400001'].vivo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('BN'); // 普通banner
                self._adv_config_data['10600002'].vivo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('HT') || ''; // ov横版互推盒子
                self._adv_config_data['10600003'].vivo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('JGG'); // oppo九宫格互推盒子
                self._adv_config_data['10100001'].vivo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('CP'); // 普通插屏
                self._adv_config_data['10301001'].vivo_adv_id = syyx_manager_1.syyx_manager.guobao_get_channel_ad_id('YSCP'); // 原生插屏
                self.__adv_config_inited = true;
                console.log("sdk----- adv config has loaded complete", self._adv_config_data);
                //预加载互推广告盒子
                syyx_manager_1.syyx_manager.pre_load_game_portal_box(syyx_sdk_enum_1.e_ad_id.game_portal_box, null, null, null, null);
                syyx_manager_1.syyx_manager.preload_video();
            }, this);
            // 初始化上报记录
            this.init_native_report_record();
        }
    };
    syyx_adv_manager.set_banner_height = function () {
        ad_oppo_banner_1.ad_oppo_banner.set_banner_height();
    };
    /**
     * 初始化原生上报记录
     */
    syyx_adv_manager.init_native_report_record = function () {
        this.native_report_record[syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial] = {
            "start_count": 0,
            "show_count": 0,
            "click_count": 0,
        };
        this.native_report_record[syyx_sdk_enum_1.e_ad_native_type.native_banner] = {
            "start_count": 0,
            "show_count": 0,
            "click_count": 0,
        };
        this.native_report_record[syyx_sdk_enum_1.e_ad_native_type.native_interstitial] = {
            "start_count": 0,
            "show_count": 0,
            "click_count": 0,
        };
        this.native_report_record[syyx_sdk_enum_1.e_ad_native_type.native_icon] = {
            "start_count": 0,
            "show_count": 0,
            "click_count": 0,
        };
    };
    syyx_adv_manager.init_first_banner_cd = function () {
        ad_banner_1.ad_banner.init_first_banner_cd();
    };
    /**
     * 储存原生数据
     * @param native_data 原生数据
     */
    syyx_adv_manager.add_native_data = function (native_data) {
        for (var i in this._native_data_cache) {
            if (this._native_data_cache[i].id == native_data.id) {
                return;
            }
        }
        var length = this.get_oppo_native_cache_max_length();
        //判断缓存数组长度是否超标
        if (this._native_data_cache.length >= length) {
            this._native_data_cache.splice(0, 1);
        }
        this._native_data_cache.push(native_data);
    };
    /**
     * UI层要展示普通banner或者原生banner
     */
    syyx_adv_manager.show_banner = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        if (!this.__adv_config_inited) {
            return;
        }
        ad_banner_1.ad_banner.show_banner(ad_type, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    /**
    * ui层要隐藏banner或者原生banner
    */
    syyx_adv_manager.hide_banner = function () {
        if (!this.__adv_config_inited) {
            return;
        }
        ad_banner_1.ad_banner.hide_banner();
    };
    /**
     * 展示原生icon
     * @param parent 原生icon父节点
     */
    syyx_adv_manager.show_native_icon = function (parent, ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        if (!this.__adv_config_inited) {
            return;
        }
        ad_native_icon_1.ad_native_icon.show_native_icon(parent, ad_type, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    /**
     * 隐藏原生icon
     */
    syyx_adv_manager.hide_native_icon = function () {
        if (!this.__adv_config_inited) {
            return;
        }
        ad_native_icon_1.ad_native_icon.hide_native_icon();
    };
    /**
    *  展示原生插屏
    */
    syyx_adv_manager.show_native_interstitial = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        if (!this.__adv_config_inited) {
            return;
        }
        var __business_config_data = syyx_manager_1.syyx_manager.__business_config_data;
        if (__business_config_data && __business_config_data["vivo_yscp_switch"]) { // 原生插屏开关
            if (__business_config_data["vivo_yscp_switch"].value[0] == 0) {
                onError && onError();
                return;
            }
        }
        ad_native_interstitial_1.ad_native_interstitial.load_native_interstitial(ad_type, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    /**
    *  预加载结算原生
    */
    syyx_adv_manager.preload_native_inner_interstitial = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        if (!this.__adv_config_inited) {
            return;
        }
        ad_native_inner_interstitial_1.ad_native_inner_interstitial.preload_native_inner_interstitial(ad_type, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    syyx_adv_manager.set_on_click_inner_interstitial_btn = function (click_back) {
        if (!this.__adv_config_inited) {
            return;
        }
        ad_native_inner_interstitial_1.ad_native_inner_interstitial.set_on_click_inner_interstitial_btn(click_back);
    };
    /**
     * 获取加载好的原生数据
     * @param ignore_id  是否需要忽略某个广告id
     */
    syyx_adv_manager.get_native_data = function (ignore_id) {
        if (ignore_id === void 0) { ignore_id = undefined; }
        if (!ad_banner_1.ad_banner.can_show_first) {
            console.log("igc ----- oppo's first native ad is in cd");
            return undefined;
        }
        //判断各个原生点击率是否超标wednes
        var banner_limit = this.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_banner);
        var inner_limit = this.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial);
        var interstitial_limit = this.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_interstitial);
        var cur_data_cache = [];
        for (var i in this._native_data_cache) {
            if (this._native_data_cache[i].id != ignore_id) {
                if (this._native_data_cache[i].native_type == syyx_sdk_enum_1.e_ad_native_type.native_banner && !banner_limit) {
                    cur_data_cache.push(this._native_data_cache[i]);
                }
                else if (this._native_data_cache[i].native_type == syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial && !inner_limit) {
                    cur_data_cache.push(this._native_data_cache[i]);
                }
                else if (this._native_data_cache[i].native_type == syyx_sdk_enum_1.e_ad_native_type.native_interstitial && !interstitial_limit) {
                    cur_data_cache.push(this._native_data_cache[i]);
                }
            }
        }
        // console.log("根据过滤的id和点击率 筛选的池子:", cur_data_cache)
        if (this.check_native_data_list_is_reprot(cur_data_cache)) {
            //全部数据都上报曝光过了
            // console.log("igc----- syyx_adv_manager use old load native data")
            return this.get_min_order_native_data(cur_data_cache);
        }
        else {
            //有数据没有上报过曝光  用最新数据
            return this.get_latest_native_data(cur_data_cache);
        }
    };
    /**
     * 点击上报了—-->移除原生数据
     */
    syyx_adv_manager.remove_native_data = function (native_data) {
        for (var i in this._native_data_cache) {
            if (this._native_data_cache[i].id == native_data.id) {
                console.log("igc----- syyx_adv_manager remove native_data:", native_data);
                this._native_data_cache.splice(parseInt(i), 1);
                return;
            }
        }
    };
    /**
     * 获取加载好的原生数据
     * @param ad_pos_id 配置表广告Id
     */
    syyx_adv_manager.get_local_native_data = function (ad_pos_id) {
        return this.get_native_data();
    };
    /**
     * 上报原生点击
     * @param ad_pos_id
     * @param ad_unit_id
     */
    syyx_adv_manager.report_ad_click = function (ad_pos_id, native_data) {
        var ad_id = this.get_channel_ad_id(native_data.adPosId);
        if (!ad_id) {
            console.log("igc----- syyx_manager report_ad_click ad_id no configure in adv.csv");
            return;
        }
        if (!native_data) {
            console.log("igc----- syyx_adv_mamager report_ad_click native_data is null");
            return;
        }
        console.log("igc ----- has been in report ad click");
        if (native_data.state != syyx_sdk_enum_1.e_ad_native_state.show) {
            console.log("igc----- syyx_adv_mamager report_ad_click native_data state is not e_ad_native_state.show");
            return;
        }
        //记录------原生数据上报记录
        var report_data = this.native_report_record[native_data.native_type];
        report_data.click_count = Math.min(++report_data.click_count, report_data.show_count);
        var ad_unit_id = native_data.adUnitId;
        var param = {
            ad_id: ad_id,
            ad_unit_id: ad_unit_id,
            ad_type: igc.e_ad_type.native,
            ad_pos_id: native_data.adPosId,
            ad_event: ad_id,
            ad_scene: ad_id,
            sub_ad_type: igc.e_ad_native_type.native_banner_dialog
        };
        igc.igc_main.instance.report_ad_click(param);
        //移除上报过点击的数据
        this.remove_native_data(native_data);
        ad_banner_1.ad_banner.report_ad_click(ad_pos_id, native_data);
        ad_native_icon_1.ad_native_icon.report_ad_click(ad_pos_id, native_data);
        ad_native_interstitial_1.ad_native_interstitial.report_ad_click(ad_pos_id, native_data);
        ad_native_inner_interstitial_1.ad_native_inner_interstitial.report_ad_click(ad_pos_id, native_data);
    };
    /**
     * 上报原生曝光
     * @param ad_pos_id //配置表广告ID
     * @param ad_unit_id //原生数据上报ID
     */
    syyx_adv_manager.report_ad_show = function (ad_pos_id, native_data) {
        var ad_id = syyx_adv_manager.get_channel_ad_id(native_data.adPosId);
        if (!ad_id || ad_id == "1" || ad_id == "0") {
            console.log("igc----- syyx_manager report_ad_show ad_id no configure in adv.csv");
            return;
        }
        if (!native_data) {
            console.log("igc----- syyx_adv_mamager report_ad_show native_data is null");
            return;
        }
        //原生数据展示order +1
        var max_order = syyx_adv_manager.get_native_data_list_max_order();
        native_data.order = max_order + 1;
        if (native_data.state == syyx_sdk_enum_1.e_ad_native_state.need_show || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            if (native_data.state == syyx_sdk_enum_1.e_ad_native_state.need_show) {
                //记录------原生数据上报记录
                var report_data = this.native_report_record[native_data.native_type];
                report_data.show_count++;
                report_data.start_count++;
            }
            var param = {
                ad_id: ad_id,
                ad_unit_id: native_data.adUnitId,
                ad_type: igc.e_ad_type.native,
                ad_pos_id: native_data.adPosId,
                ad_event: ad_id,
                ad_scene: ad_id,
                sub_ad_type: igc.e_ad_native_type.native_banner_dialog
            };
            igc.igc_main.instance.report_ad_show(param);
            native_data.state = syyx_sdk_enum_1.e_ad_native_state.show; // 加载到数据，曝光后state为2。没曝光还是继续可以用原数据展示
        }
        ad_banner_1.ad_banner.report_ad_show(ad_pos_id, native_data);
        ad_native_icon_1.ad_native_icon.report_ad_show(ad_pos_id, native_data);
        ad_native_interstitial_1.ad_native_interstitial.report_ad_show(ad_pos_id, native_data);
        ad_native_inner_interstitial_1.ad_native_inner_interstitial.report_ad_show(ad_pos_id, native_data);
    };
    syyx_adv_manager.set_normal_banner_switch = function (value) {
        ad_banner_1.ad_banner.set_normal_banner_switch(value);
    };
    /**
     * 获取手q banner 上移距离
     */
    syyx_adv_manager.get_qq_banner_top_offset = function () {
        var business_config = syyx_manager_1.syyx_manager.get_business_config();
        if (business_config && business_config["banner_top_offset"]) {
            if (business_config["banner_top_offset"].value) {
                var offset = business_config["banner_top_offset"].value;
                return offset[0] + Math.floor(Math.random() * (offset[1] - offset[0]));
            }
        }
        return 0;
    };
    syyx_adv_manager.show_block = function (style, ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        if (!this._block_instance[ad_pos_id]) {
            this._block_instance[ad_pos_id] = new ad_block_1.default();
        }
        if (!this.__adv_config_inited) {
            return;
        }
        this._block_instance[ad_pos_id].show_block(style, ad_type, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    syyx_adv_manager.hide_block = function (ad_pos_id) {
        if (!this.__adv_config_inited) {
            return;
        }
        if (this._block_instance[ad_pos_id]) {
            this._block_instance[ad_pos_id].hide_block();
        }
    };
    syyx_adv_manager.hide_all_block = function () {
        if (!this.__adv_config_inited) {
            return;
        }
        for (var i in this._adv_config_data) {
            if (this._adv_config_data[i].adv_type == igc.e_ad_type.block) {
                var ad_pos_id = this._adv_config_data[i].id;
                if (this._block_instance[ad_pos_id]) {
                    this._block_instance[ad_pos_id].hide_block();
                }
            }
        }
    };
    /**
     * 是否开启oppo新规
     */
    syyx_adv_manager.check_is_open_oppo_rule = function () {
        var business_config = syyx_manager_1.syyx_manager.get_business_config();
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg || syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            return true;
        }
        return false;
    };
    /**
     * 增加原生广告展示次数
     */
    syyx_adv_manager.add_native_show_count = function () {
        if (this.check_is_open_oppo_rule()) {
            this.cur_native_show_count++;
        }
    };
    /**
     * 当前游戏时长
     */
    syyx_adv_manager.get_play_game_time = function () {
        var cur_timestamp = (new Date()).getTime();
        return (cur_timestamp - this.login_timestamp) / 1000;
    };
    /**
     * 判断当前是否达到展示次数上限
     */
    syyx_adv_manager.check_is_show_count_limit = function () {
        if (!this.check_is_open_oppo_rule()) {
            return false;
        }
        var oppo_native_show_limit = [60, 2];
        var business_config = syyx_manager_1.syyx_manager.get_business_config();
        if (business_config && business_config["oppo_native_show_limit"] && business_config["oppo_native_show_limit"].value) {
            oppo_native_show_limit = business_config["oppo_native_show_limit"].value;
        }
        var play_game_time = this.get_play_game_time();
        var cur_show_limit = 2;
        if (play_game_time >= 0) {
            cur_show_limit = (Math.floor(play_game_time / oppo_native_show_limit[0]) + 1) * oppo_native_show_limit[1];
        }
        return syyx_adv_manager.cur_native_show_count >= cur_show_limit;
    };
    /**
     * 获取原生数据缓存数组的最大长度
     */
    syyx_adv_manager.get_oppo_native_cache_max_length = function () {
        var length = 20;
        var business_config = syyx_manager_1.syyx_manager.get_business_config();
        if (business_config && business_config["oppo_native_cache_length"] && business_config["oppo_native_cache_length"].value) {
            length = business_config["oppo_native_cache_length"].value[0];
        }
        return length || 20;
    };
    /**
     * 检查全部原生数据是否都为已曝光过的
     */
    syyx_adv_manager.check_native_data_list_is_reprot = function (native_data_list) {
        if (native_data_list.length > 0) {
            for (var i in native_data_list) {
                if (native_data_list[i].state != syyx_sdk_enum_1.e_ad_native_state.show) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * 最近拉取到的原生数据  或者 没有上报过的数据
     */
    syyx_adv_manager.get_latest_native_data = function (native_data_list) {
        for (var i in native_data_list) {
            if (native_data_list[i].state == syyx_sdk_enum_1.e_ad_native_state.need_show) {
                return native_data_list[i];
            }
        }
        if (native_data_list.length > 0) {
            return native_data_list[native_data_list.length - 1];
        }
        return undefined;
    };
    /**
     * 获取数据最大的order
     */
    syyx_adv_manager.get_native_data_list_max_order = function (native_data_list) {
        if (native_data_list === void 0) { native_data_list = undefined; }
        var list = [];
        var order = 0;
        if (native_data_list && native_data_list.length > 0) {
            list = native_data_list;
        }
        else {
            list = this._native_data_cache;
        }
        if (list.length > 0) {
            for (var i in list) {
                if (list[i].order > order) {
                    order = list[i].order;
                }
            }
        }
        return order || 0;
    };
    /**
     * 获取数据中最小order的数据
     * @param native_data_list 原生数据数组
     */
    syyx_adv_manager.get_min_order_native_data = function (native_data_list) {
        var data = undefined;
        var length = native_data_list.length;
        if (length > 0) {
            for (var i in native_data_list) {
                if (!data || native_data_list[i].order <= data.order) {
                    data = native_data_list[i];
                }
            }
        }
        return data;
    };
    /**
    * 检查点击率是否超标
    * @param native_ad_type 原生类型
    */
    syyx_adv_manager.check_is_click_limit = function (native_ad_type) {
        var self = this;
        var is_limit = false;
        var report_data = this.native_report_record[native_ad_type];
        //当前已经处于点击率限制冷却时间中
        if (this.native_click_state[native_ad_type] == syyx_sdk_enum_1.e_ad_native_click_pro_type.cooling) {
            // console.log("igc----- syyx_adv_manager native_type", native_ad_type, "is click limit? true!")
            return true;
        }
        var cur_click_pro = report_data.click_count / report_data.show_count;
        var start_count = 10;
        var limit_pro = 1;
        var cool_time = 60;
        var business_config = syyx_manager_1.syyx_manager.get_business_config();
        if (business_config) {
            if (native_ad_type == syyx_sdk_enum_1.e_ad_native_type.native_banner) {
                start_count = business_config["native_banner_click_pro_limit"].value[0];
                limit_pro = business_config["native_banner_click_pro_limit"].value[1];
                cool_time = business_config["native_banner_click_pro_limit"].value[2];
            }
            else if (native_ad_type == syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial) {
                start_count = business_config["native_inner_click_pro_limit"].value[0]; // 1000
                limit_pro = business_config["native_inner_click_pro_limit"].value[1]; // 0.4
                cool_time = business_config["native_inner_click_pro_limit"].value[2]; // 60
            }
            else if (native_ad_type == syyx_sdk_enum_1.e_ad_native_type.native_interstitial) {
                start_count = business_config["native_interstitial_click_pro_limit"].value[0];
                limit_pro = business_config["native_interstitial_click_pro_limit"].value[1];
                cool_time = business_config["native_interstitial_click_pro_limit"].value[2];
            }
            if (report_data.start_count > 0 && report_data.start_count % start_count == 0) {
                is_limit = cur_click_pro >= limit_pro; // 一开始为false
            }
        }
        if (!this.native_click_state[native_ad_type]) {
            this.native_click_state[native_ad_type] = syyx_sdk_enum_1.e_ad_native_click_pro_type.active;
        }
        if (is_limit && this.native_click_state[native_ad_type] == syyx_sdk_enum_1.e_ad_native_click_pro_type.active) {
            this.native_click_state[native_ad_type] = syyx_sdk_enum_1.e_ad_native_click_pro_type.cooling;
            console.log("igc----- syyx_adv_manager run native click limit cool timer!!!", cool_time);
            setTimeout(function () {
                //解除点击率限制
                self.native_click_state[native_ad_type] = syyx_sdk_enum_1.e_ad_native_click_pro_type.active;
                report_data.start_count = 0;
            }, cool_time * 1000);
        }
        return is_limit; // 一开始为false
    };
    /**
    * 根据渠道获取广告id
    */
    syyx_adv_manager.get_channel_ad_id = function (ad_pos_id) {
        if (!this.__adv_config_inited) {
            return "";
        }
        try {
            if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
                return this._adv_config_data[ad_pos_id].oppo_adv_id;
            }
            else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                return this._adv_config_data[ad_pos_id].vivo_adv_id;
            }
            else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.tt) {
                return this._adv_config_data[ad_pos_id].tt_adv_id;
            }
            else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.qq) {
                return this._adv_config_data[ad_pos_id].qq_adv_id;
            }
            else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.wx) {
                return this._adv_config_data[ad_pos_id].wx_adv_id;
            }
            else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.apk) {
                return this._adv_config_data[ad_pos_id].apk_adv_id;
            }
            else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
                return "web_ad_id";
            }
        }
        catch (error) {
            console.error("adv.csv do not have the ad_id of the ad_pos_id: " + ad_pos_id);
        }
    };
    /**
     * 是否初始化完成
     */
    syyx_adv_manager.is_inited = function () {
        return this.__inited;
    };
    /**
     * 原生池
     */
    syyx_adv_manager._native_data_cache = [];
    /**
     * 配置表初始化完毕
     */
    syyx_adv_manager.__adv_config_inited = false;
    /**
     *  积木广告实例
     */
    syyx_adv_manager._block_instance = {};
    /**
    * 当前原生展示次数
    */
    syyx_adv_manager.cur_native_show_count = 0;
    /**
    * 登陆时间戳
    */
    syyx_adv_manager.login_timestamp = 0;
    /**
     * 是否已经初始化
     */
    syyx_adv_manager.__inited = false;
    /**
     * 原生点击率状态
     */
    syyx_adv_manager.native_click_state = {};
    /**
     * 原生类型的上报情况
     */
    syyx_adv_manager.native_report_record = {};
    return syyx_adv_manager;
}());
exports.syyx_adv_manager = syyx_adv_manager;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXGFkXFxzeXl4X2Fkdl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRDtBQUVsRCw2REFBdUg7QUFDdkgsNkRBQTREO0FBQzVELGdEQUErQztBQUMvQyxpRUFBb0Y7QUFDcEYseUNBQXdDO0FBQ3hDLG1FQUFrRTtBQUNsRSwrRUFBOEU7QUFDOUUsbURBQWtEO0FBRWxELHVDQUFrQztBQUVsQztJQUFBO0lBMm9CQSxDQUFDO0lBOWxCRzs7T0FFRztJQUNJLGdDQUFlLEdBQXRCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7WUFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUM3QywrQkFBYyxDQUFDLGFBQWEsQ0FBQywyQkFBWSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsSUFBSTtnQkFDNUUsSUFBSSw0QkFBVSxDQUFDLGdCQUFnQixLQUFLLHlDQUF1QixDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU87b0JBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7aUJBQ2hDO3FCQUFNO29CQUNILElBQUksQ0FBQyxnQkFBZ0IsR0FBRywrQkFBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hFO2dCQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLE9BQU87Z0JBQ25HLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLFFBQVE7Z0JBQ3RHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLFdBQVc7Z0JBQ3pHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLFNBQVM7Z0JBQ3ZHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLFdBQVc7Z0JBQ3ZHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLGFBQWE7Z0JBQ3pHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLGNBQWM7Z0JBQzNHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLE9BQU87Z0JBRXJHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLE9BQU87Z0JBQ25HLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLE9BQU87Z0JBQ3JHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxX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RDtpQkFBTSxJQUFJLDRCQUFVLENBQUMsZ0JBQWdCLEtBQUssR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUU7Z0JBQy9ELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQTthQUNyRDtpQkFBTSxJQUFJLDRCQUFVLENBQUMsZ0JBQWdCLEtBQUssR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUU7Z0JBQy9ELE9BQU8sV0FBVyxDQUFBO2FBQ3JCO1NBQ0o7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0RBQWtELEdBQUcsU0FBUyxDQUFDLENBQUE7U0FDaEY7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQkFBUyxHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN4QixDQUFDO0lBeG9CRDs7T0FFRztJQUNJLG1DQUFrQixHQUFHLEVBQUUsQ0FBQTtJQU05Qjs7T0FFRztJQUNJLG9DQUFtQixHQUFHLEtBQUssQ0FBQTtJQUVsQzs7T0FFRztJQUNJLGdDQUFlLEdBQUcsRUFBRSxDQUFBO0lBRTNCOztNQUVFO0lBQ0ssc0NBQXFCLEdBQUcsQ0FBQyxDQUFBO0lBRWhDOztNQUVFO0lBQ0ssZ0NBQWUsR0FBRyxDQUFDLENBQUE7SUFFMUI7O09BRUc7SUFDSSx5QkFBUSxHQUFHLEtBQUssQ0FBQTtJQUV2Qjs7T0FFRztJQUNJLG1DQUFrQixHQUFHLEVBQUUsQ0FBQTtJQUU5Qjs7T0FFRztJQUNJLHFDQUFvQixHQUFHLEVBQUUsQ0FBQTtJQStsQnBDLHVCQUFDO0NBM29CRCxBQTJvQkMsSUFBQTtBQTNvQlksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWRfb3Bwb19iYW5uZXIgfSBmcm9tICcuL2FkX29wcG9fYmFubmVyJztcclxuaW1wb3J0IHsgbmF0aXZlX2FkX2RhdGEgfSBmcm9tICcuLy4uLy4uL21vZGVsL21vZGVsJztcclxuaW1wb3J0IHsgZV9hZF9pZCwgZV9hZF9uYXRpdmVfY2xpY2tfcHJvX3R5cGUsIGVfYWRfbmF0aXZlX3N0YXRlLCBlX2FkX25hdGl2ZV90eXBlIH0gZnJvbSBcIi4uLy4uL2NvbmZpZ3Mvc3l5eF9zZGtfZW51bVwiO1xyXG5pbXBvcnQgeyBzeXl4X3Nka191dGlscyB9IGZyb20gXCIuLi8uLi91dGlscy9zeXl4X3Nka191dGlsc1wiO1xyXG5pbXBvcnQgeyBzeXl4X21hbmFnZXIgfSBmcm9tIFwiLi4vc3l5eF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IGVfc3l5eF9zZGtfcHVibGlzaF90eXBlLCBzeXl4X2NvbnN0IH0gZnJvbSBcIi4uLy4uL2NvbmZpZ3Mvc3l5eF9zZGtfY29uZmlnXCI7XHJcbmltcG9ydCB7IGFkX2Jhbm5lciB9IGZyb20gXCIuL2FkX2Jhbm5lclwiO1xyXG5pbXBvcnQgeyBhZF9uYXRpdmVfaW50ZXJzdGl0aWFsIH0gZnJvbSBcIi4vYWRfbmF0aXZlX2ludGVyc3RpdGlhbFwiO1xyXG5pbXBvcnQgeyBhZF9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsIH0gZnJvbSBcIi4vYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbFwiO1xyXG5pbXBvcnQgeyBhZF9uYXRpdmVfaWNvbiB9IGZyb20gXCIuL2FkX25hdGl2ZV9pY29uXCI7XHJcblxyXG5pbXBvcnQgYWRfYmxvY2sgZnJvbSBcIi4vYWRfYmxvY2tcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBzeXl4X2Fkdl9tYW5hZ2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOn+eUn+axoFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX25hdGl2ZV9kYXRhX2NhY2hlID0gW11cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW5v+WRimFkdumFjee9ruihqFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX2Fkdl9jb25maWdfZGF0YVxyXG4gICAgLyoqXHJcbiAgICAgKiDphY3nva7ooajliJ3lp4vljJblrozmr5VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIF9fYWR2X2NvbmZpZ19pbml0ZWQgPSBmYWxzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOenr+acqOW5v+WRiuWunuS+i1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX2Jsb2NrX2luc3RhbmNlID0ge31cclxuXHJcbiAgICAvKipcclxuICAgICog5b2T5YmN5Y6f55Sf5bGV56S65qyh5pWwXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGN1cl9uYXRpdmVfc2hvd19jb3VudCA9IDBcclxuXHJcbiAgICAvKipcclxuICAgICog55m76ZmG5pe26Ze05oizXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGxvZ2luX3RpbWVzdGFtcCA9IDBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuW3sue7j+WIneWni+WMllxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX19pbml0ZWQgPSBmYWxzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55Sf54K55Ye7546H54q25oCBXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBuYXRpdmVfY2xpY2tfc3RhdGUgPSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55Sf57G75Z6L55qE5LiK5oql5oOF5Ya1XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBuYXRpdmVfcmVwb3J0X3JlY29yZCA9IHt9XHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veW5v+WRiumFjee9riBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRfYWR2X2NvbmZpZygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBpZiAoIXRoaXMuX19pbml0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2luaXRlZCA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5sb2dpbl90aW1lc3RhbXAgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgIHN5eXhfc2RrX3V0aWxzLmxvYWRfcmVzb3VyY2Uoc3l5eF9tYW5hZ2VyLl9fYWR2X2NvbmZpZ19maWxlX3BhdGgsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19wdWJsaXNoID09PSBlX3N5eXhfc2RrX3B1Ymxpc2hfdHlwZS5pbikgeyAvLyDkuI3kvJrnm7jnrYlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9hZHZfY29uZmlnX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9hZHZfY29uZmlnX2RhdGEgPSBzeXl4X3Nka191dGlscy5wYXJzZV9jc3YoZGF0YSwgXCJpZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9hZHZfY29uZmlnX2RhdGFbJzEwMjAwMDAxJ10ub3Bwb19hZHZfaWQgPSBzeXl4X21hbmFnZXIuZ3VvYmFvX2dldF9jaGFubmVsX2FkX2lkKCdTUCcpIC8vIOa/gOWKseinhumikVxyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWR2X2NvbmZpZ19kYXRhWycxMDMwMjAwMSddLm9wcG9fYWR2X2lkID0gc3l5eF9tYW5hZ2VyLmd1b2Jhb19nZXRfY2hhbm5lbF9hZF9pZCgnWVNKUycpIC8vIOWOn+eUn+e7k+eulyBcclxuICAgICAgICAgICAgICAgIHNlbGYuX2Fkdl9jb25maWdfZGF0YVsnMTAzMDQwMDEnXS5vcHBvX2Fkdl9pZCA9IHN5eXhfbWFuYWdlci5ndW9iYW9fZ2V0X2NoYW5uZWxfYWRfaWQoJ1lTQk4nKSAvLyDljp/nlJ9iYW5uZXJcclxuICAgICAgICAgICAgICAgIHNlbGYuX2Fkdl9jb25maWdfZGF0YVsnMTAzMDQwMDInXS5vcHBvX2Fkdl9pZCA9IHN5eXhfbWFuYWdlci5ndW9iYW9fZ2V0X2NoYW5uZWxfYWRfaWQoJ1lTSUMnKSAvLyDljp/nlJ9pY29uXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9hZHZfY29uZmlnX2RhdGFbJzEwNDAwMDAxJ10ub3Bwb19hZHZfaWQgPSBzeXl4X21hbmFnZXIuZ3VvYmFvX2dldF9jaGFubmVsX2FkX2lkKCdCTicpIC8vIOaZrumAmmJhbm5lclxyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWR2X2NvbmZpZ19kYXRhWycxMDYwMDAwMiddLm9wcG9fYWR2X2lkID0gc3l5eF9tYW5hZ2VyLmd1b2Jhb19nZXRfY2hhbm5lbF9hZF9pZCgnSFQnKSAvLyBvcHBv5qiq54mI5LqS5o6o55uS5a2QXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9hZHZfY29uZmlnX2RhdGFbJzEwNjAwMDAzJ10ub3Bwb19hZHZfaWQgPSBzeXl4X21hbmFnZXIuZ3VvYmFvX2dldF9jaGFubmVsX2FkX2lkKCdKR0cnKSAvLyBvcHBv5Lmd5a6r5qC85LqS5o6o55uS5a2QXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9hZHZfY29uZmlnX2RhdGFbJzEwMzAxMDAxJ10ub3Bwb19hZHZfaWQgPSBzeXl4X21hbmFnZXIuZ3VvYmFvX2dldF9jaGFubmVsX2FkX2lkKCdZU0NQJykgLy8g5Y6f55Sf5o+S5bGPXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWR2X2NvbmZpZ19kYXRhWycxMDIwMDAwMSddLnZpdm9fYWR2X2lkID0gc3l5eF9tYW5hZ2VyLmd1b2Jhb19nZXRfY2hhbm5lbF9hZF9pZCgnU1AnKSAvLyDmv4DlirHop4bpopFcclxuICAgICAgICAgICAgICAgIHNlbGYuX2Fkdl9jb25maWdfZGF0YVsnMTAzMDIwMDEnXS52aXZvX2Fkdl9pZCA9IHN5eXhfbWFuYWdlci5ndW9iYW9fZ2V0X2NoYW5uZWxfYWRfaWQoJ1lTSlMnKSAvLyDljp/nlJ/nu5PnrpdcclxuICAgICAgICAgICAgICAgIHNlbGYuX2Fkdl9jb25maWdfZGF0YVsnMTAzMDQwMDEnXS52aXZvX2Fkdl9pZCA9IHN5eXhfbWFuYWdlci5ndW9iYW9fZ2V0X2NoYW5uZWxfYWRfaWQoJ1lTQk4nKSAvLyDljp/nlJ9iYW5uZXJcclxuICAgICAgICAgICAgICAgIHNlbGYuX2Fkdl9jb25maWdfZGF0YVsnMTAzMDQwMDInXS52aXZvX2Fkdl9pZCA9IHN5eXhfbWFuYWdlci5ndW9iYW9fZ2V0X2NoYW5uZWxfYWRfaWQoJ1lTSUMnKSAvLyDljp/nlJ9pY29uXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9hZHZfY29uZmlnX2RhdGFbJzEwNDAwMDAxJ10udml2b19hZHZfaWQgPSBzeXl4X21hbmFnZXIuZ3VvYmFvX2dldF9jaGFubmVsX2FkX2lkKCdCTicpIC8vIOaZrumAmmJhbm5lclxyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWR2X2NvbmZpZ19kYXRhWycxMDYwMDAwMiddLnZpdm9fYWR2X2lkID0gc3l5eF9tYW5hZ2VyLmd1b2Jhb19nZXRfY2hhbm5lbF9hZF9pZCgnSFQnKSB8fCAnJyAvLyBvduaoqueJiOS6kuaOqOebkuWtkFxyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWR2X2NvbmZpZ19kYXRhWycxMDYwMDAwMyddLnZpdm9fYWR2X2lkID0gc3l5eF9tYW5hZ2VyLmd1b2Jhb19nZXRfY2hhbm5lbF9hZF9pZCgnSkdHJykgLy8gb3Bwb+S5neWuq+agvOS6kuaOqOebkuWtkFxyXG4gICAgICAgICAgICAgICAgc2VsZi5fYWR2X2NvbmZpZ19kYXRhWycxMDEwMDAwMSddLnZpdm9fYWR2X2lkID0gc3l5eF9tYW5hZ2VyLmd1b2Jhb19nZXRfY2hhbm5lbF9hZF9pZCgnQ1AnKSAvLyDmma7pgJrmj5LlsY9cclxuICAgICAgICAgICAgICAgIHNlbGYuX2Fkdl9jb25maWdfZGF0YVsnMTAzMDEwMDEnXS52aXZvX2Fkdl9pZCA9IHN5eXhfbWFuYWdlci5ndW9iYW9fZ2V0X2NoYW5uZWxfYWRfaWQoJ1lTQ1AnKSAvLyDljp/nlJ/mj5LlsY9cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9fYWR2X2NvbmZpZ19pbml0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZGstLS0tLSBhZHYgY29uZmlnIGhhcyBsb2FkZWQgY29tcGxldGVcIiwgc2VsZi5fYWR2X2NvbmZpZ19kYXRhKVxyXG5cclxuICAgICAgICAgICAgICAgIC8v6aKE5Yqg6L295LqS5o6o5bm/5ZGK55uS5a2QXHJcbiAgICAgICAgICAgICAgICBzeXl4X21hbmFnZXIucHJlX2xvYWRfZ2FtZV9wb3J0YWxfYm94KGVfYWRfaWQuZ2FtZV9wb3J0YWxfYm94LCBudWxsLCBudWxsLCBudWxsLCBudWxsKVxyXG4gICAgICAgICAgICAgICAgc3l5eF9tYW5hZ2VyLnByZWxvYWRfdmlkZW8oKVxyXG4gICAgICAgICAgICB9LCB0aGlzKVxyXG5cclxuICAgICAgICAgICAgLy8g5Yid5aeL5YyW5LiK5oql6K6w5b2VXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdF9uYXRpdmVfcmVwb3J0X3JlY29yZCgpXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0X2Jhbm5lcl9oZWlnaHQoKSB7XHJcbiAgICAgICAgYWRfb3Bwb19iYW5uZXIuc2V0X2Jhbm5lcl9oZWlnaHQoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5Y6f55Sf5LiK5oql6K6w5b2VXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbml0X25hdGl2ZV9yZXBvcnRfcmVjb3JkKCkge1xyXG4gICAgICAgIHRoaXMubmF0aXZlX3JlcG9ydF9yZWNvcmRbZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsXSA9IHtcclxuICAgICAgICAgICAgXCJzdGFydF9jb3VudFwiOiAwLFxyXG4gICAgICAgICAgICBcInNob3dfY291bnRcIjogMCxcclxuICAgICAgICAgICAgXCJjbGlja19jb3VudFwiOiAwLFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5hdGl2ZV9yZXBvcnRfcmVjb3JkW2VfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lcl0gPSB7XHJcbiAgICAgICAgICAgIFwic3RhcnRfY291bnRcIjogMCxcclxuICAgICAgICAgICAgXCJzaG93X2NvdW50XCI6IDAsXHJcbiAgICAgICAgICAgIFwiY2xpY2tfY291bnRcIjogMCxcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5uYXRpdmVfcmVwb3J0X3JlY29yZFtlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9pbnRlcnN0aXRpYWxdID0ge1xyXG4gICAgICAgICAgICBcInN0YXJ0X2NvdW50XCI6IDAsXHJcbiAgICAgICAgICAgIFwic2hvd19jb3VudFwiOiAwLFxyXG4gICAgICAgICAgICBcImNsaWNrX2NvdW50XCI6IDAsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubmF0aXZlX3JlcG9ydF9yZWNvcmRbZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfaWNvbl0gPSB7XHJcbiAgICAgICAgICAgIFwic3RhcnRfY291bnRcIjogMCxcclxuICAgICAgICAgICAgXCJzaG93X2NvdW50XCI6IDAsXHJcbiAgICAgICAgICAgIFwiY2xpY2tfY291bnRcIjogMCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluaXRfZmlyc3RfYmFubmVyX2NkKCkge1xyXG4gICAgICAgIGFkX2Jhbm5lci5pbml0X2ZpcnN0X2Jhbm5lcl9jZCgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgqjlrZjljp/nlJ/mlbDmja5cclxuICAgICAqIEBwYXJhbSBuYXRpdmVfZGF0YSDljp/nlJ/mlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFkZF9uYXRpdmVfZGF0YShuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gdGhpcy5fbmF0aXZlX2RhdGFfY2FjaGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZV9kYXRhX2NhY2hlW2ldLmlkID09IG5hdGl2ZV9kYXRhLmlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuZ3RoID0gdGhpcy5nZXRfb3Bwb19uYXRpdmVfY2FjaGVfbWF4X2xlbmd0aCgpXHJcbiAgICAgICAgLy/liKTmlq3nvJPlrZjmlbDnu4Tplb/luqbmmK/lkKbotoXmoIdcclxuICAgICAgICBpZiAodGhpcy5fbmF0aXZlX2RhdGFfY2FjaGUubGVuZ3RoID49IGxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9uYXRpdmVfZGF0YV9jYWNoZS5zcGxpY2UoMCwgMSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbmF0aXZlX2RhdGFfY2FjaGUucHVzaChuYXRpdmVfZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVJ5bGC6KaB5bGV56S65pmu6YCaYmFubmVy5oiW6ICF5Y6f55SfYmFubmVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaG93X2Jhbm5lcihhZF90eXBlPzogaWdjLmVfYWRfdHlwZSwgYWRfcG9zX2lkPzogc3RyaW5nLCBvbkxvYWQ/OiBGdW5jdGlvbiwgb25TaG93PzogRnVuY3Rpb24sIG9uQ2xvc2U/OiBGdW5jdGlvbiwgb25FcnJvcj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9fYWR2X2NvbmZpZ19pbml0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFkX2Jhbm5lci5zaG93X2Jhbm5lcihhZF90eXBlLCBhZF9wb3NfaWQsIG9uTG9hZCwgb25TaG93LCBvbkNsb3NlLCBvbkVycm9yKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiB1aeWxguimgemakOiXj2Jhbm5lcuaIluiAheWOn+eUn2Jhbm5lclxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBoaWRlX2Jhbm5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX19hZHZfY29uZmlnX2luaXRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgYWRfYmFubmVyLmhpZGVfYmFubmVyKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWxleekuuWOn+eUn2ljb25cclxuICAgICAqIEBwYXJhbSBwYXJlbnQg5Y6f55SfaWNvbueItuiKgueCuVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2hvd19uYXRpdmVfaWNvbihwYXJlbnQsIGFkX3R5cGU/OiBpZ2MuZV9hZF90eXBlLCBhZF9wb3NfaWQ/OiBzdHJpbmcsIG9uTG9hZD86IEZ1bmN0aW9uLCBvblNob3c/OiBGdW5jdGlvbiwgb25DbG9zZT86IEZ1bmN0aW9uLCBvbkVycm9yPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX19hZHZfY29uZmlnX2luaXRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgYWRfbmF0aXZlX2ljb24uc2hvd19uYXRpdmVfaWNvbihwYXJlbnQsIGFkX3R5cGUsIGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csIG9uQ2xvc2UsIG9uRXJyb3IpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/ljp/nlJ9pY29uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlX25hdGl2ZV9pY29uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fX2Fkdl9jb25maWdfaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBhZF9uYXRpdmVfaWNvbi5oaWRlX25hdGl2ZV9pY29uKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogIOWxleekuuWOn+eUn+aPkuWxj1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBzaG93X25hdGl2ZV9pbnRlcnN0aXRpYWwoYWRfdHlwZT86IGlnYy5lX2FkX3R5cGUsIGFkX3Bvc19pZD86IHN0cmluZywgb25Mb2FkPzogRnVuY3Rpb24sIG9uU2hvdz86IEZ1bmN0aW9uLCBvbkNsb3NlPzogRnVuY3Rpb24sIG9uRXJyb3I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5fX2Fkdl9jb25maWdfaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YVxyXG4gICAgICAgIGlmKF9fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgX19idXNpbmVzc19jb25maWdfZGF0YVtcInZpdm9feXNjcF9zd2l0Y2hcIl0pIHsgLy8g5Y6f55Sf5o+S5bGP5byA5YWzXHJcbiAgICAgICAgICAgIGlmIChfX2J1c2luZXNzX2NvbmZpZ19kYXRhW1widml2b195c2NwX3N3aXRjaFwiXS52YWx1ZVswXSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYWRfbmF0aXZlX2ludGVyc3RpdGlhbC5sb2FkX25hdGl2ZV9pbnRlcnN0aXRpYWwoYWRfdHlwZSwgYWRfcG9zX2lkLCBvbkxvYWQsIG9uU2hvdywgb25DbG9zZSwgb25FcnJvcilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogIOmihOWKoOi9vee7k+eul+WOn+eUn1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBwcmVsb2FkX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwoYWRfdHlwZT86IGlnYy5lX2FkX3R5cGUsIGFkX3Bvc19pZD86IHN0cmluZywgb25Mb2FkPzogRnVuY3Rpb24sIG9uU2hvdz86IEZ1bmN0aW9uLCBvbkNsb3NlPzogRnVuY3Rpb24sIG9uRXJyb3I/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5fX2Fkdl9jb25maWdfaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBhZF9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsLnByZWxvYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbChhZF90eXBlLCBhZF9wb3NfaWQsIG9uTG9hZCwgb25TaG93LCBvbkNsb3NlLCBvbkVycm9yKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzZXRfb25fY2xpY2tfaW5uZXJfaW50ZXJzdGl0aWFsX2J0bihjbGlja19iYWNrPykge1xyXG4gICAgICAgIGlmICghdGhpcy5fX2Fkdl9jb25maWdfaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBhZF9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsLnNldF9vbl9jbGlja19pbm5lcl9pbnRlcnN0aXRpYWxfYnRuKGNsaWNrX2JhY2spXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bliqDovb3lpb3nmoTljp/nlJ/mlbDmja5cclxuICAgICAqIEBwYXJhbSBpZ25vcmVfaWQgIOaYr+WQpumcgOimgeW/veeVpeafkOS4quW5v+WRimlkXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRfbmF0aXZlX2RhdGEoaWdub3JlX2lkID0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKCFhZF9iYW5uZXIuY2FuX3Nob3dfZmlyc3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MgLS0tLS0gb3BwbydzIGZpcnN0IG5hdGl2ZSBhZCBpcyBpbiBjZFwiKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreWQhOS4quWOn+eUn+eCueWHu+eOh+aYr+WQpui2heagh3dlZG5lc1xyXG4gICAgICAgIGxldCBiYW5uZXJfbGltaXQgPSB0aGlzLmNoZWNrX2lzX2NsaWNrX2xpbWl0KGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lcilcclxuICAgICAgICBsZXQgaW5uZXJfbGltaXQgPSB0aGlzLmNoZWNrX2lzX2NsaWNrX2xpbWl0KGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbClcclxuICAgICAgICBsZXQgaW50ZXJzdGl0aWFsX2xpbWl0ID0gdGhpcy5jaGVja19pc19jbGlja19saW1pdChlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9pbnRlcnN0aXRpYWwpXHJcblxyXG4gICAgICAgIGxldCBjdXJfZGF0YV9jYWNoZSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLl9uYXRpdmVfZGF0YV9jYWNoZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbmF0aXZlX2RhdGFfY2FjaGVbaV0uaWQgIT0gaWdub3JlX2lkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX25hdGl2ZV9kYXRhX2NhY2hlW2ldLm5hdGl2ZV90eXBlID09IGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lciAmJiAhYmFubmVyX2xpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyX2RhdGFfY2FjaGUucHVzaCh0aGlzLl9uYXRpdmVfZGF0YV9jYWNoZVtpXSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbmF0aXZlX2RhdGFfY2FjaGVbaV0ubmF0aXZlX3R5cGUgPT0gZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsICYmICFpbm5lcl9saW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cl9kYXRhX2NhY2hlLnB1c2godGhpcy5fbmF0aXZlX2RhdGFfY2FjaGVbaV0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25hdGl2ZV9kYXRhX2NhY2hlW2ldLm5hdGl2ZV90eXBlID09IGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2ludGVyc3RpdGlhbCAmJiAhaW50ZXJzdGl0aWFsX2xpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyX2RhdGFfY2FjaGUucHVzaCh0aGlzLl9uYXRpdmVfZGF0YV9jYWNoZVtpXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLmoLnmja7ov4fmu6TnmoRpZOWSjOeCueWHu+eOhyDnrZvpgInnmoTmsaDlrZA6XCIsIGN1cl9kYXRhX2NhY2hlKVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jaGVja19uYXRpdmVfZGF0YV9saXN0X2lzX3JlcHJvdChjdXJfZGF0YV9jYWNoZSkpIHtcclxuICAgICAgICAgICAgLy/lhajpg6jmlbDmja7pg73kuIrmiqXmm53lhYnov4fkuoZcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpZ2MtLS0tLSBzeXl4X2Fkdl9tYW5hZ2VyIHVzZSBvbGQgbG9hZCBuYXRpdmUgZGF0YVwiKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRfbWluX29yZGVyX25hdGl2ZV9kYXRhKGN1cl9kYXRhX2NhY2hlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5pyJ5pWw5o2u5rKh5pyJ5LiK5oql6L+H5pud5YWJICDnlKjmnIDmlrDmlbDmja5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X2xhdGVzdF9uYXRpdmVfZGF0YShjdXJfZGF0YV9jYWNoZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vkuIrmiqXkuobigJQtLT7np7vpmaTljp/nlJ/mlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlbW92ZV9uYXRpdmVfZGF0YShuYXRpdmVfZGF0YTogbmF0aXZlX2FkX2RhdGEpIHtcclxuICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuX25hdGl2ZV9kYXRhX2NhY2hlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uYXRpdmVfZGF0YV9jYWNoZVtpXS5pZCA9PSBuYXRpdmVfZGF0YS5pZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBzeXl4X2Fkdl9tYW5hZ2VyIHJlbW92ZSBuYXRpdmVfZGF0YTpcIiwgbmF0aXZlX2RhdGEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYXRpdmVfZGF0YV9jYWNoZS5zcGxpY2UocGFyc2VJbnQoaSksIDEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWKoOi9veWlveeahOWOn+eUn+aVsOaNrlxyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCDphY3nva7ooajlub/lkYpJZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X2xvY2FsX25hdGl2ZV9kYXRhKGFkX3Bvc19pZD8pOiBuYXRpdmVfYWRfZGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X25hdGl2ZV9kYXRhKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeWOn+eUn+eCueWHu1xyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCBcclxuICAgICAqIEBwYXJhbSBhZF91bml0X2lkIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVwb3J0X2FkX2NsaWNrKGFkX3Bvc19pZDogc3RyaW5nLCBuYXRpdmVfZGF0YT8pIHtcclxuICAgICAgICBsZXQgYWRfaWQgPSB0aGlzLmdldF9jaGFubmVsX2FkX2lkKG5hdGl2ZV9kYXRhLmFkUG9zSWQpXHJcbiAgICAgICAgaWYgKCFhZF9pZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHN5eXhfbWFuYWdlciByZXBvcnRfYWRfY2xpY2sgYWRfaWQgbm8gY29uZmlndXJlIGluIGFkdi5jc3ZcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gc3l5eF9hZHZfbWFtYWdlciByZXBvcnRfYWRfY2xpY2sgbmF0aXZlX2RhdGEgaXMgbnVsbFwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaWdjIC0tLS0tIGhhcyBiZWVuIGluIHJlcG9ydCBhZCBjbGlja1wiKVxyXG4gICAgICAgIGlmIChuYXRpdmVfZGF0YS5zdGF0ZSAhPSBlX2FkX25hdGl2ZV9zdGF0ZS5zaG93KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gc3l5eF9hZHZfbWFtYWdlciByZXBvcnRfYWRfY2xpY2sgbmF0aXZlX2RhdGEgc3RhdGUgaXMgbm90IGVfYWRfbmF0aXZlX3N0YXRlLnNob3dcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iusOW9lS0tLS0tLeWOn+eUn+aVsOaNruS4iuaKpeiusOW9lVxyXG4gICAgICAgIGxldCByZXBvcnRfZGF0YSA9IHRoaXMubmF0aXZlX3JlcG9ydF9yZWNvcmRbbmF0aXZlX2RhdGEubmF0aXZlX3R5cGVdXHJcbiAgICAgICAgcmVwb3J0X2RhdGEuY2xpY2tfY291bnQgPSBNYXRoLm1pbigrK3JlcG9ydF9kYXRhLmNsaWNrX2NvdW50LCByZXBvcnRfZGF0YS5zaG93X2NvdW50KVxyXG5cclxuICAgICAgICBsZXQgYWRfdW5pdF9pZCA9IG5hdGl2ZV9kYXRhLmFkVW5pdElkXHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBhZF9pZDogYWRfaWQsXHJcbiAgICAgICAgICAgIGFkX3VuaXRfaWQ6IGFkX3VuaXRfaWQsXHJcbiAgICAgICAgICAgIGFkX3R5cGU6IGlnYy5lX2FkX3R5cGUubmF0aXZlLFxyXG4gICAgICAgICAgICBhZF9wb3NfaWQ6IG5hdGl2ZV9kYXRhLmFkUG9zSWQsXHJcbiAgICAgICAgICAgIGFkX2V2ZW50OiBhZF9pZCxcclxuICAgICAgICAgICAgYWRfc2NlbmU6IGFkX2lkLFxyXG4gICAgICAgICAgICBzdWJfYWRfdHlwZTogaWdjLmVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lcl9kaWFsb2dcclxuICAgICAgICB9XHJcbiAgICAgICAgaWdjLmlnY19tYWluLmluc3RhbmNlLnJlcG9ydF9hZF9jbGljayhwYXJhbSlcclxuICAgICAgICAvL+enu+mZpOS4iuaKpei/h+eCueWHu+eahOaVsOaNrlxyXG4gICAgICAgIHRoaXMucmVtb3ZlX25hdGl2ZV9kYXRhKG5hdGl2ZV9kYXRhKVxyXG5cclxuICAgICAgICBhZF9iYW5uZXIucmVwb3J0X2FkX2NsaWNrKGFkX3Bvc19pZCwgbmF0aXZlX2RhdGEpXHJcbiAgICAgICAgYWRfbmF0aXZlX2ljb24ucmVwb3J0X2FkX2NsaWNrKGFkX3Bvc19pZCwgbmF0aXZlX2RhdGEpXHJcbiAgICAgICAgYWRfbmF0aXZlX2ludGVyc3RpdGlhbC5yZXBvcnRfYWRfY2xpY2soYWRfcG9zX2lkLCBuYXRpdmVfZGF0YSlcclxuICAgICAgICBhZF9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsLnJlcG9ydF9hZF9jbGljayhhZF9wb3NfaWQsIG5hdGl2ZV9kYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5Y6f55Sf5pud5YWJXHJcbiAgICAgKiBAcGFyYW0gYWRfcG9zX2lkIC8v6YWN572u6KGo5bm/5ZGKSUQgXHJcbiAgICAgKiBAcGFyYW0gYWRfdW5pdF9pZCAvL+WOn+eUn+aVsOaNruS4iuaKpUlEXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXBvcnRfYWRfc2hvdyhhZF9wb3NfaWQ6IHN0cmluZywgbmF0aXZlX2RhdGE/KSB7XHJcbiAgICAgICAgbGV0IGFkX2lkID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfY2hhbm5lbF9hZF9pZChuYXRpdmVfZGF0YS5hZFBvc0lkKVxyXG4gICAgICAgIGlmICghYWRfaWQgfHwgYWRfaWQgPT0gXCIxXCIgfHwgYWRfaWQgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBzeXl4X21hbmFnZXIgcmVwb3J0X2FkX3Nob3cgYWRfaWQgbm8gY29uZmlndXJlIGluIGFkdi5jc3ZcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gc3l5eF9hZHZfbWFtYWdlciByZXBvcnRfYWRfc2hvdyBuYXRpdmVfZGF0YSBpcyBudWxsXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ljp/nlJ/mlbDmja7lsZXnpLpvcmRlciArMVxyXG4gICAgICAgIGxldCBtYXhfb3JkZXIgPSBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9uYXRpdmVfZGF0YV9saXN0X21heF9vcmRlcigpXHJcbiAgICAgICAgbmF0aXZlX2RhdGEub3JkZXIgPSBtYXhfb3JkZXIgKyAxXHJcblxyXG4gICAgICAgIGlmIChuYXRpdmVfZGF0YS5zdGF0ZSA9PSBlX2FkX25hdGl2ZV9zdGF0ZS5uZWVkX3Nob3cgfHwgc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUuaHdfcWcpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVfZGF0YS5zdGF0ZSA9PSBlX2FkX25hdGl2ZV9zdGF0ZS5uZWVkX3Nob3cpIHtcclxuICAgICAgICAgICAgICAgIC8v6K6w5b2VLS0tLS0t5Y6f55Sf5pWw5o2u5LiK5oql6K6w5b2VXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVwb3J0X2RhdGEgPSB0aGlzLm5hdGl2ZV9yZXBvcnRfcmVjb3JkW25hdGl2ZV9kYXRhLm5hdGl2ZV90eXBlXVxyXG4gICAgICAgICAgICAgICAgcmVwb3J0X2RhdGEuc2hvd19jb3VudCsrXHJcbiAgICAgICAgICAgICAgICByZXBvcnRfZGF0YS5zdGFydF9jb3VudCsrXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgICAgIGFkX2lkOiBhZF9pZCxcclxuICAgICAgICAgICAgICAgIGFkX3VuaXRfaWQ6IG5hdGl2ZV9kYXRhLmFkVW5pdElkLFxyXG4gICAgICAgICAgICAgICAgYWRfdHlwZTogaWdjLmVfYWRfdHlwZS5uYXRpdmUsXHJcbiAgICAgICAgICAgICAgICBhZF9wb3NfaWQ6IG5hdGl2ZV9kYXRhLmFkUG9zSWQsXHJcbiAgICAgICAgICAgICAgICBhZF9ldmVudDogYWRfaWQsXHJcbiAgICAgICAgICAgICAgICBhZF9zY2VuZTogYWRfaWQsXHJcbiAgICAgICAgICAgICAgICBzdWJfYWRfdHlwZTogaWdjLmVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lcl9kaWFsb2dcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZ2MuaWdjX21haW4uaW5zdGFuY2UucmVwb3J0X2FkX3Nob3cocGFyYW0pXHJcbiAgICAgICAgICAgIG5hdGl2ZV9kYXRhLnN0YXRlID0gZV9hZF9uYXRpdmVfc3RhdGUuc2hvdyAvLyDliqDovb3liLDmlbDmja7vvIzmm53lhYnlkI5zdGF0ZeS4ujLjgILmsqHmm53lhYnov5jmmK/nu6fnu63lj6/ku6XnlKjljp/mlbDmja7lsZXnpLpcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkX2Jhbm5lci5yZXBvcnRfYWRfc2hvdyhhZF9wb3NfaWQsIG5hdGl2ZV9kYXRhKVxyXG4gICAgICAgIGFkX25hdGl2ZV9pY29uLnJlcG9ydF9hZF9zaG93KGFkX3Bvc19pZCwgbmF0aXZlX2RhdGEpXHJcbiAgICAgICAgYWRfbmF0aXZlX2ludGVyc3RpdGlhbC5yZXBvcnRfYWRfc2hvdyhhZF9wb3NfaWQsIG5hdGl2ZV9kYXRhKVxyXG4gICAgICAgIGFkX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwucmVwb3J0X2FkX3Nob3coYWRfcG9zX2lkLCBuYXRpdmVfZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0X25vcm1hbF9iYW5uZXJfc3dpdGNoKHZhbHVlKSB7XHJcbiAgICAgICAgYWRfYmFubmVyLnNldF9ub3JtYWxfYmFubmVyX3N3aXRjaCh2YWx1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaJi3EgYmFubmVyIOS4iuenu+i3neemu1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X3FxX2Jhbm5lcl90b3Bfb2Zmc2V0KCkge1xyXG4gICAgICAgIGxldCBidXNpbmVzc19jb25maWcgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKGJ1c2luZXNzX2NvbmZpZyAmJiBidXNpbmVzc19jb25maWdbXCJiYW5uZXJfdG9wX29mZnNldFwiXSkge1xyXG4gICAgICAgICAgICBpZiAoYnVzaW5lc3NfY29uZmlnW1wiYmFubmVyX3RvcF9vZmZzZXRcIl0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSBidXNpbmVzc19jb25maWdbXCJiYW5uZXJfdG9wX29mZnNldFwiXS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mZnNldFswXSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChvZmZzZXRbMV0gLSBvZmZzZXRbMF0pKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNob3dfYmxvY2soc3R5bGUsIGFkX3R5cGU/OiBpZ2MuZV9hZF90eXBlLCBhZF9wb3NfaWQ/OiBzdHJpbmcsIG9uTG9hZD86IEZ1bmN0aW9uLCBvblNob3c/OiBGdW5jdGlvbiwgb25DbG9zZT86IEZ1bmN0aW9uLCBvbkVycm9yPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2Jsb2NrX2luc3RhbmNlW2FkX3Bvc19pZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5fYmxvY2tfaW5zdGFuY2VbYWRfcG9zX2lkXSA9IG5ldyBhZF9ibG9jaygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fX2Fkdl9jb25maWdfaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ibG9ja19pbnN0YW5jZVthZF9wb3NfaWRdLnNob3dfYmxvY2soc3R5bGUsIGFkX3R5cGUsIGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csIG9uQ2xvc2UsIG9uRXJyb3IpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhpZGVfYmxvY2soYWRfcG9zX2lkKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9fYWR2X2NvbmZpZ19pbml0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9ibG9ja19pbnN0YW5jZVthZF9wb3NfaWRdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Jsb2NrX2luc3RhbmNlW2FkX3Bvc19pZF0uaGlkZV9ibG9jaygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlX2FsbF9ibG9jaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX19hZHZfY29uZmlnX2luaXRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLl9hZHZfY29uZmlnX2RhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Fkdl9jb25maWdfZGF0YVtpXS5hZHZfdHlwZSA9PSBpZ2MuZV9hZF90eXBlLmJsb2NrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWRfcG9zX2lkID0gdGhpcy5fYWR2X2NvbmZpZ19kYXRhW2ldLmlkXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmxvY2tfaW5zdGFuY2VbYWRfcG9zX2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrX2luc3RhbmNlW2FkX3Bvc19pZF0uaGlkZV9ibG9jaygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKblvIDlkK9vcHBv5paw6KeEXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjaGVja19pc19vcGVuX29wcG9fcnVsZSgpIHtcclxuICAgICAgICBsZXQgYnVzaW5lc3NfY29uZmlnID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS5vcHBvX3FnIHx8IHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLnZpdm9fcWcgfHwgc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUud2ViKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aKe5Yqg5Y6f55Sf5bm/5ZGK5bGV56S65qyh5pWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhZGRfbmF0aXZlX3Nob3dfY291bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tfaXNfb3Blbl9vcHBvX3J1bGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cl9uYXRpdmVfc2hvd19jb3VudCsrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN5ri45oiP5pe26ZW/XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRfcGxheV9nYW1lX3RpbWUoKSB7XHJcbiAgICAgICAgbGV0IGN1cl90aW1lc3RhbXAgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpXHJcbiAgICAgICAgcmV0dXJuIChjdXJfdGltZXN0YW1wIC0gdGhpcy5sb2dpbl90aW1lc3RhbXApIC8gMTAwMFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5b2T5YmN5piv5ZCm6L6+5Yiw5bGV56S65qyh5pWw5LiK6ZmQXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjaGVja19pc19zaG93X2NvdW50X2xpbWl0KCkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tfaXNfb3Blbl9vcHBvX3J1bGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvcHBvX25hdGl2ZV9zaG93X2xpbWl0ID0gWzYwLCAyXVxyXG4gICAgICAgIGxldCBidXNpbmVzc19jb25maWcgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKGJ1c2luZXNzX2NvbmZpZyAmJiBidXNpbmVzc19jb25maWdbXCJvcHBvX25hdGl2ZV9zaG93X2xpbWl0XCJdICYmIGJ1c2luZXNzX2NvbmZpZ1tcIm9wcG9fbmF0aXZlX3Nob3dfbGltaXRcIl0udmFsdWUpIHtcclxuICAgICAgICAgICAgb3Bwb19uYXRpdmVfc2hvd19saW1pdCA9IGJ1c2luZXNzX2NvbmZpZ1tcIm9wcG9fbmF0aXZlX3Nob3dfbGltaXRcIl0udmFsdWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwbGF5X2dhbWVfdGltZSA9IHRoaXMuZ2V0X3BsYXlfZ2FtZV90aW1lKClcclxuICAgICAgICBsZXQgY3VyX3Nob3dfbGltaXQgPSAyXHJcbiAgICAgICAgaWYgKHBsYXlfZ2FtZV90aW1lID49IDApIHtcclxuICAgICAgICAgICAgY3VyX3Nob3dfbGltaXQgPSAoTWF0aC5mbG9vcihwbGF5X2dhbWVfdGltZSAvIG9wcG9fbmF0aXZlX3Nob3dfbGltaXRbMF0pICsgMSkgKiBvcHBvX25hdGl2ZV9zaG93X2xpbWl0WzFdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzeXl4X2Fkdl9tYW5hZ2VyLmN1cl9uYXRpdmVfc2hvd19jb3VudCA+PSBjdXJfc2hvd19saW1pdFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Y6f55Sf5pWw5o2u57yT5a2Y5pWw57uE55qE5pyA5aSn6ZW/5bqmXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRfb3Bwb19uYXRpdmVfY2FjaGVfbWF4X2xlbmd0aCgpIHtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gMjBcclxuICAgICAgICBsZXQgYnVzaW5lc3NfY29uZmlnID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGlmIChidXNpbmVzc19jb25maWcgJiYgYnVzaW5lc3NfY29uZmlnW1wib3Bwb19uYXRpdmVfY2FjaGVfbGVuZ3RoXCJdICYmIGJ1c2luZXNzX2NvbmZpZ1tcIm9wcG9fbmF0aXZlX2NhY2hlX2xlbmd0aFwiXS52YWx1ZSkge1xyXG4gICAgICAgICAgICBsZW5ndGggPSBidXNpbmVzc19jb25maWdbXCJvcHBvX25hdGl2ZV9jYWNoZV9sZW5ndGhcIl0udmFsdWVbMF1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlbmd0aCB8fCAyMFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5p+l5YWo6YOo5Y6f55Sf5pWw5o2u5piv5ZCm6YO95Li65bey5pud5YWJ6L+H55qEXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjaGVja19uYXRpdmVfZGF0YV9saXN0X2lzX3JlcHJvdChuYXRpdmVfZGF0YV9saXN0KSB7XHJcbiAgICAgICAgaWYgKG5hdGl2ZV9kYXRhX2xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIG5hdGl2ZV9kYXRhX2xpc3QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChuYXRpdmVfZGF0YV9saXN0W2ldLnN0YXRlICE9IGVfYWRfbmF0aXZlX3N0YXRlLnNob3cpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyA6L+R5ouJ5Y+W5Yiw55qE5Y6f55Sf5pWw5o2uICDmiJbogIUg5rKh5pyJ5LiK5oql6L+H55qE5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRfbGF0ZXN0X25hdGl2ZV9kYXRhKG5hdGl2ZV9kYXRhX2xpc3QpIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSBpbiBuYXRpdmVfZGF0YV9saXN0KSB7XHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVfZGF0YV9saXN0W2ldLnN0YXRlID09IGVfYWRfbmF0aXZlX3N0YXRlLm5lZWRfc2hvdykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZV9kYXRhX2xpc3RbaV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5hdGl2ZV9kYXRhX2xpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlX2RhdGFfbGlzdFtuYXRpdmVfZGF0YV9saXN0Lmxlbmd0aCAtIDFdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaVsOaNruacgOWkp+eahG9yZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRfbmF0aXZlX2RhdGFfbGlzdF9tYXhfb3JkZXIobmF0aXZlX2RhdGFfbGlzdCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gW11cclxuICAgICAgICBsZXQgb3JkZXIgPSAwXHJcbiAgICAgICAgaWYgKG5hdGl2ZV9kYXRhX2xpc3QgJiYgbmF0aXZlX2RhdGFfbGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxpc3QgPSBuYXRpdmVfZGF0YV9saXN0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGlzdCA9IHRoaXMuX25hdGl2ZV9kYXRhX2NhY2hlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS5vcmRlciA+IG9yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXIgPSBsaXN0W2ldLm9yZGVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9yZGVyIHx8IDBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaVsOaNruS4reacgOWwj29yZGVy55qE5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlX2RhdGFfbGlzdCDljp/nlJ/mlbDmja7mlbDnu4RcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldF9taW5fb3JkZXJfbmF0aXZlX2RhdGEobmF0aXZlX2RhdGFfbGlzdCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdW5kZWZpbmVkXHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IG5hdGl2ZV9kYXRhX2xpc3QubGVuZ3RoXHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBuYXRpdmVfZGF0YV9saXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEgfHwgbmF0aXZlX2RhdGFfbGlzdFtpXS5vcmRlciA8PSBkYXRhLm9yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IG5hdGl2ZV9kYXRhX2xpc3RbaV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmo4Dmn6Xngrnlh7vnjofmmK/lkKbotoXmoIdcclxuICAgICogQHBhcmFtIG5hdGl2ZV9hZF90eXBlIOWOn+eUn+exu+Wei1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBjaGVja19pc19jbGlja19saW1pdChuYXRpdmVfYWRfdHlwZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGxldCBpc19saW1pdCA9IGZhbHNlXHJcbiAgICAgICAgbGV0IHJlcG9ydF9kYXRhID0gdGhpcy5uYXRpdmVfcmVwb3J0X3JlY29yZFtuYXRpdmVfYWRfdHlwZV1cclxuICAgICAgICAvL+W9k+WJjeW3sue7j+WkhOS6jueCueWHu+eOh+mZkOWItuWGt+WNtOaXtumXtOS4rVxyXG4gICAgICAgIGlmICh0aGlzLm5hdGl2ZV9jbGlja19zdGF0ZVtuYXRpdmVfYWRfdHlwZV0gPT0gZV9hZF9uYXRpdmVfY2xpY2tfcHJvX3R5cGUuY29vbGluZykgeyBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpZ2MtLS0tLSBzeXl4X2Fkdl9tYW5hZ2VyIG5hdGl2ZV90eXBlXCIsIG5hdGl2ZV9hZF90eXBlLCBcImlzIGNsaWNrIGxpbWl0PyB0cnVlIVwiKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1cl9jbGlja19wcm8gPSByZXBvcnRfZGF0YS5jbGlja19jb3VudCAvIHJlcG9ydF9kYXRhLnNob3dfY291bnRcclxuICAgICAgICBsZXQgc3RhcnRfY291bnQgPSAxMFxyXG4gICAgICAgIGxldCBsaW1pdF9wcm8gPSAxXHJcbiAgICAgICAgbGV0IGNvb2xfdGltZSA9IDYwXHJcbiAgICAgICAgbGV0IGJ1c2luZXNzX2NvbmZpZyA9IHN5eXhfbWFuYWdlci5nZXRfYnVzaW5lc3NfY29uZmlnKClcclxuICAgICAgICBpZiAoYnVzaW5lc3NfY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVfYWRfdHlwZSA9PSBlX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9iYW5uZXIpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0X2NvdW50ID0gYnVzaW5lc3NfY29uZmlnW1wibmF0aXZlX2Jhbm5lcl9jbGlja19wcm9fbGltaXRcIl0udmFsdWVbMF1cclxuICAgICAgICAgICAgICAgIGxpbWl0X3BybyA9IGJ1c2luZXNzX2NvbmZpZ1tcIm5hdGl2ZV9iYW5uZXJfY2xpY2tfcHJvX2xpbWl0XCJdLnZhbHVlWzFdXHJcbiAgICAgICAgICAgICAgICBjb29sX3RpbWUgPSBidXNpbmVzc19jb25maWdbXCJuYXRpdmVfYmFubmVyX2NsaWNrX3Byb19saW1pdFwiXS52YWx1ZVsyXVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hdGl2ZV9hZF90eXBlID09IGVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRfY291bnQgPSBidXNpbmVzc19jb25maWdbXCJuYXRpdmVfaW5uZXJfY2xpY2tfcHJvX2xpbWl0XCJdLnZhbHVlWzBdIC8vIDEwMDBcclxuICAgICAgICAgICAgICAgIGxpbWl0X3BybyA9IGJ1c2luZXNzX2NvbmZpZ1tcIm5hdGl2ZV9pbm5lcl9jbGlja19wcm9fbGltaXRcIl0udmFsdWVbMV0gLy8gMC40XHJcbiAgICAgICAgICAgICAgICBjb29sX3RpbWUgPSBidXNpbmVzc19jb25maWdbXCJuYXRpdmVfaW5uZXJfY2xpY2tfcHJvX2xpbWl0XCJdLnZhbHVlWzJdIC8vIDYwXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmF0aXZlX2FkX3R5cGUgPT0gZV9hZF9uYXRpdmVfdHlwZS5uYXRpdmVfaW50ZXJzdGl0aWFsKSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydF9jb3VudCA9IGJ1c2luZXNzX2NvbmZpZ1tcIm5hdGl2ZV9pbnRlcnN0aXRpYWxfY2xpY2tfcHJvX2xpbWl0XCJdLnZhbHVlWzBdXHJcbiAgICAgICAgICAgICAgICBsaW1pdF9wcm8gPSBidXNpbmVzc19jb25maWdbXCJuYXRpdmVfaW50ZXJzdGl0aWFsX2NsaWNrX3Byb19saW1pdFwiXS52YWx1ZVsxXVxyXG4gICAgICAgICAgICAgICAgY29vbF90aW1lID0gYnVzaW5lc3NfY29uZmlnW1wibmF0aXZlX2ludGVyc3RpdGlhbF9jbGlja19wcm9fbGltaXRcIl0udmFsdWVbMl1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlcG9ydF9kYXRhLnN0YXJ0X2NvdW50ID4gMCAmJiByZXBvcnRfZGF0YS5zdGFydF9jb3VudCAlIHN0YXJ0X2NvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGlzX2xpbWl0ID0gY3VyX2NsaWNrX3BybyA+PSBsaW1pdF9wcm8gLy8g5LiA5byA5aeL5Li6ZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm5hdGl2ZV9jbGlja19zdGF0ZVtuYXRpdmVfYWRfdHlwZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5uYXRpdmVfY2xpY2tfc3RhdGVbbmF0aXZlX2FkX3R5cGVdID0gZV9hZF9uYXRpdmVfY2xpY2tfcHJvX3R5cGUuYWN0aXZlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc19saW1pdCAmJiB0aGlzLm5hdGl2ZV9jbGlja19zdGF0ZVtuYXRpdmVfYWRfdHlwZV0gPT0gZV9hZF9uYXRpdmVfY2xpY2tfcHJvX3R5cGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmF0aXZlX2NsaWNrX3N0YXRlW25hdGl2ZV9hZF90eXBlXSA9IGVfYWRfbmF0aXZlX2NsaWNrX3Byb190eXBlLmNvb2xpbmdcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBzeXl4X2Fkdl9tYW5hZ2VyIHJ1biBuYXRpdmUgY2xpY2sgbGltaXQgY29vbCB0aW1lciEhIVwiLCBjb29sX3RpbWUpXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy/op6PpmaTngrnlh7vnjofpmZDliLZcclxuICAgICAgICAgICAgICAgIHNlbGYubmF0aXZlX2NsaWNrX3N0YXRlW25hdGl2ZV9hZF90eXBlXSA9IGVfYWRfbmF0aXZlX2NsaWNrX3Byb190eXBlLmFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgcmVwb3J0X2RhdGEuc3RhcnRfY291bnQgPSAwXHJcbiAgICAgICAgICAgIH0sIGNvb2xfdGltZSAqIDEwMDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc19saW1pdCAvLyDkuIDlvIDlp4vkuLpmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmoLnmja7muKDpgZPojrflj5blub/lkYppZFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBnZXRfY2hhbm5lbF9hZF9pZChhZF9wb3NfaWQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX19hZHZfY29uZmlnX2luaXRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLm9wcG9fcWcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZHZfY29uZmlnX2RhdGFbYWRfcG9zX2lkXS5vcHBvX2Fkdl9pZFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLnZpdm9fcWcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZHZfY29uZmlnX2RhdGFbYWRfcG9zX2lkXS52aXZvX2Fkdl9pZFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLnR0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWR2X2NvbmZpZ19kYXRhW2FkX3Bvc19pZF0udHRfYWR2X2lkXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUucXEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZHZfY29uZmlnX2RhdGFbYWRfcG9zX2lkXS5xcV9hZHZfaWRcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS53eCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Fkdl9jb25maWdfZGF0YVthZF9wb3NfaWRdLnd4X2Fkdl9pZFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLmFwaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Fkdl9jb25maWdfZGF0YVthZF9wb3NfaWRdLmFwa19hZHZfaWRcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS53ZWIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIndlYl9hZF9pZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiYWR2LmNzdiBkbyBub3QgaGF2ZSB0aGUgYWRfaWQgb2YgdGhlIGFkX3Bvc19pZDogXCIgKyBhZF9wb3NfaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Yid5aeL5YyW5a6M5oiQXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc19pbml0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19pbml0ZWRcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==