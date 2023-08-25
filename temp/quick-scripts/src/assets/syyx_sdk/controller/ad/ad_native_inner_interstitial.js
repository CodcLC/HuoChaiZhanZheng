"use strict";
cc._RF.push(module, 'e99f1odQZ1M3Z/ZTQyYK1KD', 'ad_native_inner_interstitial');
// syyx_sdk/controller/ad/ad_native_inner_interstitial.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ad_native_inner_interstitial = void 0;
var model_1 = require("../../model/model");
var syyx_sdk_enum_1 = require("../../configs/syyx_sdk_enum");
var syyx_manager_1 = require("../syyx_manager");
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var syyx_adv_manager_1 = require("./syyx_adv_manager");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var ad_native_inner_interstitial = /** @class */ (function () {
    function ad_native_inner_interstitial() {
    }
    ad_native_inner_interstitial.report_ad_click = function (ad_pos_id, native_data) {
        var self = this;
        if (!this._ad_pos_id) {
            console.log("igc----- ad_native_inner_interstitial  report_ad_click this.ad_pos_id is null!!");
            this._ad_pos_id = syyx_sdk_enum_1.e_ad_id.native_inner_interstitial_success;
        }
        if (this._ad_pos_id != ad_pos_id) {
            return;
        }
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            console.log("igc ------ hw hide inner interstitial");
            syyx_manager_1.syyx_manager.hide_native_inner_interstitial();
            return;
        }
        console.log("igc ----- has in inner interstitial's report click ");
        //上报的是原生banner点击  隐藏原生bannerUi 重新请求新的原生banner数据
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_inner_report_click_update_switch"]) {
            if (this._business_config_data["native_inner_report_click_update_switch"].value[0] == 1) {
                this.preload_native_inner_interstitial(igc.e_ad_type.native, ad_pos_id, function onLoad(args, native_data) {
                    //由于结算原生的原生插屏需要设置父节点  所以上报点击时不隐藏UI
                    //刷新已经打开的原生插屏界面
                    console.log("igc----- ad_native_inner_interstitial click update success");
                    self.update_native_inner_interstitial_ui(native_data);
                }, function () { }, function () { }, function onError() {
                    //点击加载原生失败的话 能否在新规条件下获取到数据
                    var native_data = self.get_native_data();
                    if (native_data) {
                        self.update_native_inner_interstitial_ui(native_data);
                    }
                    else {
                        //自己没有数据 也没办法用原生Banner的数据的话 只能隐藏
                        //刷新结算原生失败时，隐藏结算原生
                        syyx_manager_1.syyx_manager.hide_native_inner_interstitial();
                    }
                });
            }
            else {
                syyx_manager_1.syyx_manager.hide_native_inner_interstitial();
            }
        }
    };
    ad_native_inner_interstitial.report_ad_show = function (ad_pos_id, native_data) {
        if (!this._ad_pos_id) {
            console.log("igc----- ad_native_inner_interstitial  report_ad_click this.ad_pos_id is null!!");
            this._ad_pos_id = syyx_sdk_enum_1.e_ad_id.native_inner_interstitial_success;
        }
        if (this._ad_pos_id == ad_pos_id) {
            this._last_ad_id = native_data.id;
        }
    };
    /**
    * 加载结算原生插屏
    * onLoad回调一般用于点击刷新  和  cp传入的onLoad
    */
    ad_native_inner_interstitial.preload_native_inner_interstitial = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        var self = this;
        this._ad_pos_id = ad_pos_id;
        this._ad_param = {
            ad_type: ad_type,
            ad_pos_id: ad_pos_id,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError,
        };
        // 检查点击率超标 一开始为false
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_click_limit(syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial)) { // e_ad_native_type.native_inner_interstitial 为 2
            //自己点击率超标的话  去找原生Banner数据
            var native_banner_data = this.get_native_data();
            if (native_banner_data) {
                onLoad && onLoad({}, native_banner_data);
            }
            else {
                onError && onError();
            }
            return;
        }
        //华为可能需要用到结算原生开关 14
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_inner_interstitial_switch"]) {
            if (this._business_config_data["native_inner_interstitial_switch"].value[0] == 0) { // 0是关，1是开，根据gc_status开关
                console.log("sdk-----remote - config -ysjs- is close!!!");
                return;
            }
        }
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            return;
        }
        //上一个加载的原生banner没有展示过
        var latest_data = syyx_adv_manager_1.syyx_adv_manager.get_latest_native_data(this._native_data_list); // 一开始为underfind
        if (latest_data && latest_data.state == syyx_sdk_enum_1.e_ad_native_state.need_show) {
            onLoad && onLoad({}, latest_data);
            return;
        }
        //检查当前展示是否达到限制
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_show_count_limit()) {
            //达到限制  用之前的数据
            console.log("igc----- ad_native_inner_interstitial preload_native_inner_interstitial is show limit!!");
            var native_data = this.get_native_data();
            if (native_data) {
                onLoad && onLoad({}, native_data);
            }
            else {
                syyx_manager_1.syyx_manager.hide_native_inner_interstitial();
            }
            return;
        }
        //-----------加载结算原生数据---------------------//
        //web渠道  返回假数据
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            var data = new model_1.native_ad_data();
            data.id = igc.utils_manager.get_random_name();
            data.adPosId = ad_pos_id;
            data.adId = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([100, 200]) + "";
            data.adUnitId = syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([0, 100000]) + "";
            data.imgUrlList = "https://static-cdn.llewan.com/h5/ddsdk/plugin/share_img.jpg";
            data.title = "结算原生标题" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([100, 200]);
            data.desc = "结算原生描述" + syyx_sdk_utils_1.syyx_sdk_utils.get_random_number([100, 200]);
            data.state = syyx_sdk_enum_1.e_ad_native_state.need_show;
            data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial;
            this.add_native_data(data);
            onLoad && onLoad({}, data);
            syyx_adv_manager_1.syyx_adv_manager.add_native_show_count();
            this.update_native_inner_interstitial_ui(data);
            console.log("igc-----syyx_adv_manager-------load_native_inner_interstitial on_load", data);
            return;
        }
        syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.native, ad_pos_id, function on_load(param, ad_data_list) {
            console.log("igc-----syyx_adv_manager-------load_native_inner_interstitial on_load", ad_data_list);
            //返回数据异常
            if (ad_data_list == undefined || !ad_data_list[0]) {
                onError && onError();
            }
            else {
                var length = 0;
                if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                    //vivo渠道只取最后一个位置
                    length = ad_data_list.length - 1;
                }
                var data = new model_1.native_ad_data();
                data.id = igc.utils_manager.get_random_name();
                data.adPosId = ad_pos_id;
                data.adId = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
                data.adUnitId = ad_data_list[length].adUnitId;
                data.imgUrlList = syyx_sdk_utils_1.syyx_sdk_utils.format_remote_texture_url(ad_data_list[length].imgUrlList[0]);
                data.title = ad_data_list[length].title;
                data.desc = ad_data_list[length].desc;
                data.state = syyx_sdk_enum_1.e_ad_native_state.need_show;
                data.native_type = syyx_sdk_enum_1.e_ad_native_type.native_inner_interstitial;
                self.add_native_data(data);
                onLoad && onLoad({}, data);
                syyx_adv_manager_1.syyx_adv_manager.add_native_show_count();
                syyx_sdk_utils_1.syyx_sdk_utils.preload_native_texture(data.imgUrlList);
                self.update_native_inner_interstitial_ui(data);
            }
        }, function on_show() {
        }, function on_close(param, res) {
        }, function on_error(param, err) {
            console.error("igc-----syyx_adv_manager-------load_native_inner_interstitial onError", err);
            onError && onError();
        });
    };
    /**
     * 刷新结算原生界面
     * 必须要结算原生正在展示才会执行
     */
    ad_native_inner_interstitial.update_native_inner_interstitial_ui = function (native_data) {
        syyx_manager_1.syyx_manager.load_view(model_1.syyx_view.inner_interstitial, function (view) {
            if (native_data) {
                view.report_click_update_view(native_data);
            }
        });
    };
    /**
     * 处于展示上限的情况下
     * 根据一定规则选择缓存的原生数据
     */
    ad_native_inner_interstitial.get_native_data_by_limit_model = function () {
        if (syyx_adv_manager_1.syyx_adv_manager.check_native_data_list_is_reprot(this._native_data_list)) {
            //全部数据都上报曝光过了
            console.log("igc----- ad_native_inner_interstitial use old load native data");
            return syyx_adv_manager_1.syyx_adv_manager.get_min_order_native_data(this._native_data_list);
        }
        else {
            //有数据没有上报过曝光  用最新数据
            return syyx_adv_manager_1.syyx_adv_manager.get_latest_native_data(this._native_data_list);
        }
    };
    /**
    * 获取最新的原生数据
    */
    ad_native_inner_interstitial.get_native_data = function () {
        return syyx_adv_manager_1.syyx_adv_manager.get_native_data();
    };
    /**
     * 储存原生数据
     * @param native_data 原生数据
     */
    ad_native_inner_interstitial.add_native_data = function (native_data) {
        if (syyx_adv_manager_1.syyx_adv_manager.check_is_open_oppo_rule()) {
            syyx_adv_manager_1.syyx_adv_manager.add_native_data(native_data);
        }
        else {
            this._native_data_list[0] = native_data;
        }
    };
    ad_native_inner_interstitial.set_on_click_inner_interstitial_btn = function (click_back) {
        if (click_back === void 0) { click_back = undefined; }
        this._business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (this._business_config_data && this._business_config_data["native_inner_institial_click_wrap"]) {
            var rule = this._business_config_data["native_inner_institial_click_wrap"].value;
            if (rule) {
                if (this.next_click_wrap_count == -1) {
                    this.next_click_wrap_count = rule[0];
                }
                if (this.show_count >= this.next_click_wrap_count) {
                    console.log("igc----- native_inner_interstitial is easy click!");
                    this.next_click_wrap_count = this.show_count + rule[1] + Math.floor(Math.random() * (rule[2] - rule[1] + 1));
                    if (this.next_click_wrap_count < rule[0]) {
                        this.next_click_wrap_count = rule[0];
                    }
                    console.log("igc----- native_inner_interstitial next easy click count：", this.next_click_wrap_count);
                    syyx_manager_1.syyx_manager.click_native_inner_interstitial(click_back);
                    return;
                }
            }
        }
        console.log("igc----- native_inner_interstitial easy click is close!");
        click_back && click_back();
    };
    /**
     * 上一次显示的id
     */
    ad_native_inner_interstitial._last_ad_id = undefined;
    /**
      * 原生数据
      */
    ad_native_inner_interstitial._native_data_list = [];
    /**
    * 远端运营配置
    */
    ad_native_inner_interstitial._business_config_data = {};
    ad_native_inner_interstitial.next_click_wrap_count = -1;
    ad_native_inner_interstitial.show_count = 0;
    return ad_native_inner_interstitial;
}());
exports.ad_native_inner_interstitial = ad_native_inner_interstitial;

cc._RF.pop();