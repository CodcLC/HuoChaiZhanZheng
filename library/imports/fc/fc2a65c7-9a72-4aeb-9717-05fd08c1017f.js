"use strict";
cc._RF.push(module, 'fc2a6XHmnJK65cXBf0IwQF/', 'syyx_sdk_enum');
// syyx_sdk/configs/syyx_sdk_enum.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e_ad_id = exports.syyx_prefab_path = exports.e_settlement_stat_type = exports.e_hall_stat_type = exports.e_chapter_result_type = exports.e_stat_event_id = exports.e_stat_event_type = exports.e_ad_native_click_pro_type = exports.e_ad_native_state = exports.e_ad_native_type = exports.e_syyx_ctr_event_type = void 0;
var e_syyx_ctr_event_type;
(function (e_syyx_ctr_event_type) {
    e_syyx_ctr_event_type[e_syyx_ctr_event_type["show"] = 30002] = "show";
    e_syyx_ctr_event_type[e_syyx_ctr_event_type["click"] = 30001] = "click";
})(e_syyx_ctr_event_type = exports.e_syyx_ctr_event_type || (exports.e_syyx_ctr_event_type = {}));
//原生数据状态
var e_ad_native_type;
(function (e_ad_native_type) {
    e_ad_native_type[e_ad_native_type["native_banner"] = 1] = "native_banner";
    e_ad_native_type[e_ad_native_type["native_inner_interstitial"] = 2] = "native_inner_interstitial";
    e_ad_native_type[e_ad_native_type["native_interstitial"] = 3] = "native_interstitial";
    e_ad_native_type[e_ad_native_type["native_icon"] = 4] = "native_icon";
})(e_ad_native_type = exports.e_ad_native_type || (exports.e_ad_native_type = {}));
//原生数据状态
var e_ad_native_state;
(function (e_ad_native_state) {
    e_ad_native_state[e_ad_native_state["none"] = 0] = "none";
    e_ad_native_state[e_ad_native_state["need_show"] = 1] = "need_show";
    e_ad_native_state[e_ad_native_state["show"] = 2] = "show";
    e_ad_native_state[e_ad_native_state["click"] = 3] = "click";
})(e_ad_native_state = exports.e_ad_native_state || (exports.e_ad_native_state = {}));
//原生点击率状态
var e_ad_native_click_pro_type;
(function (e_ad_native_click_pro_type) {
    e_ad_native_click_pro_type[e_ad_native_click_pro_type["none"] = 1] = "none";
    e_ad_native_click_pro_type[e_ad_native_click_pro_type["cooling"] = 2] = "cooling";
    e_ad_native_click_pro_type[e_ad_native_click_pro_type["active"] = 3] = "active";
})(e_ad_native_click_pro_type = exports.e_ad_native_click_pro_type || (exports.e_ad_native_click_pro_type = {}));
var e_stat_event_type;
(function (e_stat_event_type) {
    e_stat_event_type["hall"] = "10001";
    e_stat_event_type["chapter"] = "10002";
    e_stat_event_type["result"] = "10003"; //结算
})(e_stat_event_type = exports.e_stat_event_type || (exports.e_stat_event_type = {}));
var e_stat_event_id;
(function (e_stat_event_id) {
    e_stat_event_id["none"] = "0";
    e_stat_event_id["win_click_native_adv"] = "10001";
    e_stat_event_id["lose_click_native_adv"] = "10002";
})(e_stat_event_id = exports.e_stat_event_id || (exports.e_stat_event_id = {}));
var e_chapter_result_type;
(function (e_chapter_result_type) {
    e_chapter_result_type["enter_chapter"] = "1000000";
    e_chapter_result_type["win"] = "1000001";
    e_chapter_result_type["lose"] = "1000002";
})(e_chapter_result_type = exports.e_chapter_result_type || (exports.e_chapter_result_type = {}));
var e_hall_stat_type;
(function (e_hall_stat_type) {
    e_hall_stat_type["enter_hall"] = "1";
})(e_hall_stat_type = exports.e_hall_stat_type || (exports.e_hall_stat_type = {}));
var e_settlement_stat_type;
(function (e_settlement_stat_type) {
    e_settlement_stat_type["enter_settlement"] = "1";
})(e_settlement_stat_type = exports.e_settlement_stat_type || (exports.e_settlement_stat_type = {}));
var syyx_prefab_path;
(function (syyx_prefab_path) {
    /**
     * 原生banner广告
     */
    syyx_prefab_path["native_banner"] = "syyx_prefab/ad/ui_banner";
    /**
     * 结算原生
     */
    syyx_prefab_path["inner_interstitial"] = "syyx_prefab/ad/ui_inner_interstitial";
    syyx_prefab_path["inner_interstitial_bn"] = "syyx_prefab/ad/ui_inner_interstitial_bn";
    /**
     * 需要遮罩的插屏广告
     */
    syyx_prefab_path["interstitial"] = "syyx_prefab/ad/ui_interstitial";
    /**
     * 需要遮罩的插屏广告
     */
    syyx_prefab_path["interstitial_h"] = "syyx_prefab/ad/ui_interstitial_h";
    /**
     * 原生icon
     */
    syyx_prefab_path["native_icon"] = "syyx_prefab/ad/ui_native_icon";
    /**
     * 提示
     */
    syyx_prefab_path["toast"] = "syyx_prefab/ad/ui_toast";
    /**
    * 新品尝鲜
    */
    syyx_prefab_path["ctr_test"] = "syyx_prefab/ctr/ui_ctr";
    /**
    * 新品尝鲜
    */
    syyx_prefab_path["ctr_test_h"] = "syyx_prefab/ctr/ui_ctr_h";
})(syyx_prefab_path = exports.syyx_prefab_path || (exports.syyx_prefab_path = {}));
var e_ad_id;
(function (e_ad_id) {
    e_ad_id["interstitial_hall"] = "10100001";
    e_ad_id["video_add_gold"] = "10200001";
    e_ad_id["video_add_diamond"] = "10200002";
    e_ad_id["video_forging"] = "10200004";
    e_ad_id["video_luck_draw"] = "10200005";
    e_ad_id["native_interstitial_hall"] = "10301001";
    e_ad_id["native_inner_interstitial_success"] = "10302001";
    e_ad_id["native_banner"] = "10304001";
    e_ad_id["native_icon"] = "10304002";
    e_ad_id["banner_hall"] = "10400001";
    e_ad_id["appbox_hall"] = "10600001";
    e_ad_id["game_banner_box"] = "10600002";
    e_ad_id["game_portal_box"] = "10600003";
    e_ad_id["bottom_block"] = "10900001";
    e_ad_id["left_block"] = "10900002";
    e_ad_id["right_block"] = "10900003";
})(e_ad_id = exports.e_ad_id || (exports.e_ad_id = {}));

cc._RF.pop();