"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var igc;
(function (igc) {
    var e_facade_type;
    (function (e_facade_type) {
        e_facade_type[e_facade_type["user"] = 1] = "user";
        e_facade_type[e_facade_type["pay"] = 2] = "pay";
        e_facade_type[e_facade_type["push"] = 3] = "push";
        e_facade_type[e_facade_type["share"] = 4] = "share";
        e_facade_type[e_facade_type["analytics"] = 5] = "analytics";
        e_facade_type[e_facade_type["droidplugin"] = 6] = "droidplugin";
        e_facade_type[e_facade_type["pluginpay"] = 7] = "pluginpay";
        e_facade_type[e_facade_type["ad"] = 8] = "ad";
        e_facade_type[e_facade_type["plugindownload"] = 9] = "plugindownload";
        e_facade_type[e_facade_type["system"] = 100] = "system";
    })(e_facade_type = igc.e_facade_type || (igc.e_facade_type = {}));
    var e_method_type;
    (function (e_method_type) {
        e_method_type[e_method_type["login"] = 1] = "login";
        e_method_type[e_method_type["pay"] = 2] = "pay";
        e_method_type[e_method_type["create_ad"] = 3] = "create_ad";
        e_method_type[e_method_type["destroy_ad"] = 4] = "destroy_ad";
        e_method_type[e_method_type["show_ad"] = 5] = "show_ad";
        e_method_type[e_method_type["hide_ad"] = 6] = "hide_ad";
        e_method_type[e_method_type["get_user_info"] = 7] = "get_user_info";
        e_method_type[e_method_type["share"] = 8] = "share";
        e_method_type[e_method_type["show_loading"] = 9] = "show_loading";
        e_method_type[e_method_type["show_toast"] = 10] = "show_toast";
        e_method_type[e_method_type["show_modal"] = 11] = "show_modal";
        e_method_type[e_method_type["on_show"] = 12] = "on_show";
        e_method_type[e_method_type["navigate_to_mini_program"] = 13] = "navigate_to_mini_program";
        e_method_type[e_method_type["get_system_info_sync"] = 14] = "get_system_info_sync";
        e_method_type[e_method_type["create_inner_audio_context"] = 15] = "create_inner_audio_context";
        e_method_type[e_method_type["post_message"] = 16] = "post_message";
        e_method_type[e_method_type["set_user_cloud_storage"] = 17] = "set_user_cloud_storage";
        e_method_type[e_method_type["get_setting"] = 18] = "get_setting";
        e_method_type[e_method_type["create_user_info_button"] = 19] = "create_user_info_button";
        e_method_type[e_method_type["open_setting"] = 20] = "open_setting";
        e_method_type[e_method_type["authorize"] = 21] = "authorize";
        e_method_type[e_method_type["get_device"] = 22] = "get_device";
        e_method_type[e_method_type["has_ad"] = 23] = "has_ad";
        e_method_type[e_method_type["report_ad_show"] = 24] = "report_ad_show";
        e_method_type[e_method_type["report_ad_click"] = 25] = "report_ad_click";
        e_method_type[e_method_type["load_ad_just"] = 26] = "load_ad_just";
        e_method_type[e_method_type["show_ad_just"] = 27] = "show_ad_just";
        e_method_type[e_method_type["device_shake"] = 28] = "device_shake";
        e_method_type[e_method_type["check_can_add_desktop"] = 29] = "check_can_add_desktop";
        e_method_type[e_method_type["check_is_add_desktop"] = 30] = "check_is_add_desktop";
        e_method_type[e_method_type["add_desktop"] = 31] = "add_desktop";
        e_method_type[e_method_type["get_launch_options_sync"] = 32] = "get_launch_options_sync";
        e_method_type[e_method_type["show_more_game_modal"] = 33] = "show_more_game_modal";
        e_method_type[e_method_type["check_show_more_game"] = 34] = "check_show_more_game";
        e_method_type[e_method_type["more_game_btn_tap"] = 35] = "more_game_btn_tap";
        e_method_type[e_method_type["more_game_btn_show"] = 36] = "more_game_btn_show";
        e_method_type[e_method_type["more_game_btn_hide"] = 37] = "more_game_btn_hide";
        e_method_type[e_method_type["get_invite_query"] = 38] = "get_invite_query";
        e_method_type[e_method_type["set_show_share_menu"] = 39] = "set_show_share_menu";
        e_method_type[e_method_type["on_hide"] = 40] = "on_hide";
        e_method_type[e_method_type["report_ad_close"] = 41] = "report_ad_close";
        e_method_type[e_method_type["set_ad_position"] = 42] = "set_ad_position";
        e_method_type[e_method_type["on_share_app_message"] = 1000] = "on_share_app_message";
        e_method_type[e_method_type["start_record_screen"] = 1001] = "start_record_screen";
        e_method_type[e_method_type["stop_record_screen"] = 1002] = "stop_record_screen";
        e_method_type[e_method_type["pause_record_screen"] = 1003] = "pause_record_screen";
        e_method_type[e_method_type["resume_record_screen"] = 1004] = "resume_record_screen";
        e_method_type[e_method_type["share_record_screen"] = 1005] = "share_record_screen";
        e_method_type[e_method_type["get_record_video"] = 1006] = "get_record_video";
        e_method_type[e_method_type["exit_mini_program"] = 1100] = "exit_mini_program";
    })(e_method_type = igc.e_method_type || (igc.e_method_type = {}));
    var e_ad_type;
    (function (e_ad_type) {
        e_ad_type[e_ad_type["interstitial"] = 1] = "interstitial";
        e_ad_type[e_ad_type["video"] = 2] = "video";
        e_ad_type[e_ad_type["native"] = 3] = "native";
        e_ad_type[e_ad_type["banner"] = 4] = "banner";
        e_ad_type[e_ad_type["splash"] = 5] = "splash";
        e_ad_type[e_ad_type["app_box"] = 6] = "app_box";
        e_ad_type[e_ad_type["feed"] = 7] = "feed";
        e_ad_type[e_ad_type["full_screen_video"] = 8] = "full_screen_video";
        e_ad_type[e_ad_type["block"] = 9] = "block";
        e_ad_type[e_ad_type["open_screen"] = 10] = "open_screen";
    })(e_ad_type = igc.e_ad_type || (igc.e_ad_type = {}));
    var e_ad_native_type;
    (function (e_ad_native_type) {
        e_ad_native_type[e_ad_native_type["native_inter"] = 1] = "native_inter";
        e_ad_native_type[e_ad_native_type["native_list"] = 2] = "native_list";
        e_ad_native_type[e_ad_native_type["native_banner_dialog"] = 3] = "native_banner_dialog";
        e_ad_native_type[e_ad_native_type["native_banner_normal"] = 4] = "native_banner_normal";
    })(e_ad_native_type = igc.e_ad_native_type || (igc.e_ad_native_type = {}));
    var e_ad_app_box_type;
    (function (e_ad_app_box_type) {
        e_ad_app_box_type[e_ad_app_box_type["banner_box"] = 6] = "banner_box";
        e_ad_app_box_type[e_ad_app_box_type["portal_box"] = 7] = "portal_box";
    })(e_ad_app_box_type = igc.e_ad_app_box_type || (igc.e_ad_app_box_type = {}));
    var e_apk_ad_type;
    (function (e_apk_ad_type) {
        e_apk_ad_type[e_apk_ad_type["splash"] = 1] = "splash";
        e_apk_ad_type[e_apk_ad_type["banner"] = 2] = "banner";
        e_apk_ad_type[e_apk_ad_type["interstitial"] = 3] = "interstitial";
        e_apk_ad_type[e_apk_ad_type["native"] = 4] = "native";
        e_apk_ad_type[e_apk_ad_type["video"] = 5] = "video";
        e_apk_ad_type[e_apk_ad_type["feed"] = 6] = "feed";
        e_apk_ad_type[e_apk_ad_type["FullScreenVideo"] = 7] = "FullScreenVideo";
    })(e_apk_ad_type = igc.e_apk_ad_type || (igc.e_apk_ad_type = {}));
    var e_ad_op;
    (function (e_ad_op) {
        e_ad_op[e_ad_op["none"] = 0] = "none";
        e_ad_op[e_ad_op["create"] = 1] = "create";
        e_ad_op[e_ad_op["load"] = 2] = "load";
        e_ad_op[e_ad_op["show"] = 3] = "show";
        e_ad_op[e_ad_op["hide"] = 4] = "hide";
        e_ad_op[e_ad_op["click"] = 5] = "click";
        e_ad_op[e_ad_op["close"] = 6] = "close";
        e_ad_op[e_ad_op["destroy"] = 7] = "destroy";
    })(e_ad_op = igc.e_ad_op || (igc.e_ad_op = {}));
    var e_ad_status;
    (function (e_ad_status) {
        e_ad_status[e_ad_status["none"] = 0] = "none";
        e_ad_status[e_ad_status["init"] = 1] = "init";
        e_ad_status[e_ad_status["load_success"] = 2] = "load_success";
        e_ad_status[e_ad_status["show"] = 3] = "show";
        e_ad_status[e_ad_status["close"] = 4] = "close";
    })(e_ad_status = igc.e_ad_status || (igc.e_ad_status = {}));
    var e_ad_event;
    (function (e_ad_event) {
        e_ad_event[e_ad_event["none"] = 0] = "none";
        e_ad_event[e_ad_event["visible"] = 1] = "visible";
        e_ad_event[e_ad_event["click"] = 2] = "click";
        e_ad_event[e_ad_event["req"] = 3] = "req";
        e_ad_event[e_ad_event["show"] = 4] = "show";
        e_ad_event[e_ad_event["hide"] = 5] = "hide";
        e_ad_event[e_ad_event["onload"] = 6] = "onload";
        e_ad_event[e_ad_event["onshow"] = 7] = "onshow";
        e_ad_event[e_ad_event["onhide"] = 8] = "onhide";
        e_ad_event[e_ad_event["onclick"] = 9] = "onclick";
        e_ad_event[e_ad_event["onclose"] = 10] = "onclose";
        e_ad_event[e_ad_event["onerror"] = 11] = "onerror";
    })(e_ad_event = igc.e_ad_event || (igc.e_ad_event = {}));
    var e_ad_video_close;
    (function (e_ad_video_close) {
        e_ad_video_close[e_ad_video_close["uncomplete"] = 0] = "uncomplete";
        e_ad_video_close[e_ad_video_close["complete"] = 1] = "complete";
    })(e_ad_video_close = igc.e_ad_video_close || (igc.e_ad_video_close = {}));
    var e_ad_result;
    (function (e_ad_result) {
        e_ad_result[e_ad_result["start_req"] = 0] = "start_req";
        e_ad_result[e_ad_result["create_ok"] = 1] = "create_ok";
        e_ad_result[e_ad_result["create_err"] = 2] = "create_err";
        e_ad_result[e_ad_result["load_ok"] = 3] = "load_ok";
        e_ad_result[e_ad_result["load_err"] = 4] = "load_err";
        e_ad_result[e_ad_result["show_ok"] = 5] = "show_ok";
        e_ad_result[e_ad_result["show_err"] = 6] = "show_err";
        e_ad_result[e_ad_result["reward_complete"] = 7] = "reward_complete";
        e_ad_result[e_ad_result["reward_uncomplete"] = 8] = "reward_uncomplete";
        e_ad_result[e_ad_result["native_show"] = 9] = "native_show";
        e_ad_result[e_ad_result["native_click"] = 10] = "native_click";
        e_ad_result[e_ad_result["interstitial_close"] = 11] = "interstitial_close";
        e_ad_result[e_ad_result["start_show_interstitial"] = 12] = "start_show_interstitial";
    })(e_ad_result = igc.e_ad_result || (igc.e_ad_result = {}));
    var e_apk_error_code;
    (function (e_apk_error_code) {
        e_apk_error_code[e_apk_error_code["login_success"] = 4] = "login_success";
        e_apk_error_code[e_apk_error_code["login_fail"] = 5] = "login_fail";
        e_apk_error_code[e_apk_error_code["login_timeout"] = 6] = "login_timeout";
        e_apk_error_code[e_apk_error_code["login_cancel"] = 7] = "login_cancel";
        e_apk_error_code[e_apk_error_code["logoff_success"] = 8] = "logoff_success";
        e_apk_error_code[e_apk_error_code["logoff_fail"] = 9] = "logoff_fail";
        e_apk_error_code[e_apk_error_code["pay_success"] = 10] = "pay_success";
        e_apk_error_code[e_apk_error_code["pay_fail"] = 11] = "pay_fail";
        e_apk_error_code[e_apk_error_code["pay_param_error"] = -4] = "pay_param_error";
        e_apk_error_code[e_apk_error_code["exit_success"] = 33] = "exit_success";
        e_apk_error_code[e_apk_error_code["exit_cancel"] = 34] = "exit_cancel";
        e_apk_error_code[e_apk_error_code["pay_request_repeat"] = 35] = "pay_request_repeat";
        e_apk_error_code[e_apk_error_code["pre_order_success"] = 47] = "pre_order_success";
        e_apk_error_code[e_apk_error_code["pre_order_fail"] = 48] = "pre_order_fail";
        e_apk_error_code[e_apk_error_code["query_order_success"] = 49] = "query_order_success";
        e_apk_error_code[e_apk_error_code["query_order_fail"] = 50] = "query_order_fail";
        e_apk_error_code[e_apk_error_code["send_item_success"] = 51] = "send_item_success";
        e_apk_error_code[e_apk_error_code["send_item_fail"] = 52] = "send_item_fail";
        e_apk_error_code[e_apk_error_code["ad_load_success"] = 10030] = "ad_load_success";
        e_apk_error_code[e_apk_error_code["ad_show_success"] = 10031] = "ad_show_success";
        e_apk_error_code[e_apk_error_code["ad_clicked"] = 10032] = "ad_clicked";
        e_apk_error_code[e_apk_error_code["ad_video_complete"] = 10033] = "ad_video_complete";
        e_apk_error_code[e_apk_error_code["ad_video_complete_reward"] = 10034] = "ad_video_complete_reward";
        e_apk_error_code[e_apk_error_code["ad_closed"] = 10035] = "ad_closed";
        e_apk_error_code[e_apk_error_code["ad_show_fail"] = 10036] = "ad_show_fail";
        e_apk_error_code[e_apk_error_code["ad_load_fail"] = 10037] = "ad_load_fail";
    })(e_apk_error_code = igc.e_apk_error_code || (igc.e_apk_error_code = {}));
    var e_channel_type;
    (function (e_channel_type) {
        e_channel_type[e_channel_type["test"] = 0] = "test";
        e_channel_type[e_channel_type["web"] = 1] = "web";
        e_channel_type[e_channel_type["oppo_qg"] = 2] = "oppo_qg";
        e_channel_type[e_channel_type["wx"] = 3] = "wx";
        e_channel_type[e_channel_type["vivo_qg"] = 4] = "vivo_qg";
        e_channel_type[e_channel_type["qq"] = 5] = "qq";
        e_channel_type[e_channel_type["ddz"] = 6] = "ddz";
        e_channel_type[e_channel_type["apk"] = 7] = "apk";
        e_channel_type[e_channel_type["tt"] = 8] = "tt";
        e_channel_type[e_channel_type["ipa"] = 9] = "ipa";
        e_channel_type[e_channel_type["hw_qg"] = 10] = "hw_qg";
    })(e_channel_type = igc.e_channel_type || (igc.e_channel_type = {}));
    var e_channel_sex;
    (function (e_channel_sex) {
        e_channel_sex[e_channel_sex["none"] = 0] = "none";
        e_channel_sex[e_channel_sex["man"] = 1] = "man";
        e_channel_sex[e_channel_sex["female"] = 2] = "female";
    })(e_channel_sex = igc.e_channel_sex || (igc.e_channel_sex = {}));
    var e_channel_id;
    (function (e_channel_id) {
        e_channel_id[e_channel_id["test"] = 0] = "test";
        e_channel_id[e_channel_id["oppo"] = 1] = "oppo";
        e_channel_id[e_channel_id["vivo"] = 2] = "vivo";
        e_channel_id[e_channel_id["oppo_activity"] = 3] = "oppo_activity";
        e_channel_id[e_channel_id["wx"] = 4] = "wx";
        e_channel_id[e_channel_id["doudizhu"] = 5] = "doudizhu";
        e_channel_id[e_channel_id["ali"] = 6] = "ali";
        e_channel_id[e_channel_id["oppo_spring_festival"] = 7] = "oppo_spring_festival";
        e_channel_id[e_channel_id["qq"] = 8] = "qq";
        e_channel_id[e_channel_id["qq_ios"] = 9] = "qq_ios";
        e_channel_id[e_channel_id["tt"] = 10] = "tt";
        e_channel_id[e_channel_id["oppo_apk"] = 11] = "oppo_apk";
        e_channel_id[e_channel_id["vivo_apk"] = 12] = "vivo_apk";
        e_channel_id[e_channel_id["huawei_apk"] = 13] = "huawei_apk";
        e_channel_id[e_channel_id["hw_qg"] = 1000] = "hw_qg";
        e_channel_id[e_channel_id["meizu_apk"] = 19] = "meizu_apk";
        e_channel_id[e_channel_id["lenovo_apk"] = 20] = "lenovo_apk";
        e_channel_id[e_channel_id["kupai_apk"] = 21] = "kupai_apk";
        e_channel_id[e_channel_id["jinli_apk"] = 22] = "jinli_apk";
        e_channel_id[e_channel_id["apk"] = 607000] = "apk";
        e_channel_id[e_channel_id["ipa"] = 609000] = "ipa";
    })(e_channel_id = igc.e_channel_id || (igc.e_channel_id = {}));
    var e_sub_channel_id;
    (function (e_sub_channel_id) {
        e_sub_channel_id[e_sub_channel_id["oppo"] = 1001] = "oppo";
        e_sub_channel_id[e_sub_channel_id["oppo_qg"] = 1002] = "oppo_qg";
    })(e_sub_channel_id = igc.e_sub_channel_id || (igc.e_sub_channel_id = {}));
    var e_device;
    (function (e_device) {
        e_device[e_device["unknown"] = 0] = "unknown";
        e_device[e_device["ios"] = 1] = "ios";
        e_device[e_device["android"] = 2] = "android";
        e_device[e_device["desktop"] = 3] = "desktop";
    })(e_device = igc.e_device || (igc.e_device = {}));
    var e_red_envelope_status;
    (function (e_red_envelope_status) {
        e_red_envelope_status[e_red_envelope_status["not_enough"] = 1] = "not_enough";
        e_red_envelope_status[e_red_envelope_status["get_money"] = 2] = "get_money";
        e_red_envelope_status[e_red_envelope_status["get_reward"] = 3] = "get_reward";
        e_red_envelope_status[e_red_envelope_status["sign_not_enough"] = 4] = "sign_not_enough";
        e_red_envelope_status[e_red_envelope_status["sumbit_complete"] = 5] = "sumbit_complete";
        e_red_envelope_status[e_red_envelope_status["reward_complete"] = 6] = "reward_complete";
    })(e_red_envelope_status = igc.e_red_envelope_status || (igc.e_red_envelope_status = {}));
    var e_red_envelope_report;
    (function (e_red_envelope_report) {
        e_red_envelope_report[e_red_envelope_report["open_red_envelope"] = 20000] = "open_red_envelope";
    })(e_red_envelope_report = igc.e_red_envelope_report || (igc.e_red_envelope_report = {}));
    var e_share_type;
    (function (e_share_type) {
        e_share_type[e_share_type["normal"] = 0] = "normal";
        e_share_type[e_share_type["invite"] = 1] = "invite";
        e_share_type[e_share_type["card"] = 2] = "card";
        e_share_type[e_share_type["record"] = 3] = "record";
    })(e_share_type = igc.e_share_type || (igc.e_share_type = {}));
    var e_multual_push_report;
    (function (e_multual_push_report) {
        e_multual_push_report[e_multual_push_report["click_multual_push_icon"] = 30001] = "click_multual_push_icon";
        e_multual_push_report[e_multual_push_report["show_more_game_modal"] = 30002] = "show_more_game_modal";
        e_multual_push_report[e_multual_push_report["more_game_btn_tap"] = 30003] = "more_game_btn_tap";
        e_multual_push_report[e_multual_push_report["on_navigate_to_miniProgram"] = 30004] = "on_navigate_to_miniProgram";
        e_multual_push_report[e_multual_push_report["on_more_games_modal_close"] = 30005] = "on_more_games_modal_close";
        e_multual_push_report[e_multual_push_report["on_show_more_game_modal_success"] = 30006] = "on_show_more_game_modal_success";
        e_multual_push_report[e_multual_push_report["on_show_more_game_modal_fail"] = 30007] = "on_show_more_game_modal_fail";
    })(e_multual_push_report = igc.e_multual_push_report || (igc.e_multual_push_report = {}));
    var e_inner_video_result;
    (function (e_inner_video_result) {
        e_inner_video_result[e_inner_video_result["share_record_success"] = 500001] = "share_record_success";
        e_inner_video_result[e_inner_video_result["share_record_less_time"] = 500002] = "share_record_less_time";
        e_inner_video_result[e_inner_video_result["share_record_fail"] = 500003] = "share_record_fail";
    })(e_inner_video_result = igc.e_inner_video_result || (igc.e_inner_video_result = {}));
    var e_share_event_type;
    (function (e_share_event_type) {
        e_share_event_type[e_share_event_type["share"] = 11000] = "share";
    })(e_share_event_type = igc.e_share_event_type || (igc.e_share_event_type = {}));
    var e_share_event_id;
    (function (e_share_event_id) {
        e_share_event_id[e_share_event_id["click"] = 1] = "click";
        e_share_event_id[e_share_event_id["new_player"] = 2] = "new_player";
        e_share_event_id[e_share_event_id["old_player"] = 3] = "old_player";
        e_share_event_id[e_share_event_id["click_record"] = 4] = "click_record";
        e_share_event_id[e_share_event_id["share_record_success"] = 5] = "share_record_success";
        e_share_event_id[e_share_event_id["share_record_less_time"] = 6] = "share_record_less_time";
        e_share_event_id[e_share_event_id["share_record_fail"] = 7] = "share_record_fail";
    })(e_share_event_id = igc.e_share_event_id || (igc.e_share_event_id = {}));
    var e_general_report;
    (function (e_general_report) {
        e_general_report[e_general_report["result_sign"] = 40001] = "result_sign";
        e_general_report[e_general_report["result_turntable"] = 40002] = "result_turntable";
        e_general_report[e_general_report["result_key"] = 40003] = "result_key";
        e_general_report[e_general_report["result_box"] = 40004] = "result_box";
    })(e_general_report = igc.e_general_report || (igc.e_general_report = {}));
    var e_apk_event_key;
    (function (e_apk_event_key) {
        e_apk_event_key["EVENT_TYPE_LOGIN"] = "EVENT_TYPE_LOGIN";
        e_apk_event_key["EVENT_TYPE_LOGOUT"] = "EVENT_TYPE_LOGOUT";
        e_apk_event_key["EVENT_TYPE_PAY"] = "EVENT_TYPE_PAY";
        e_apk_event_key["EVENT_TYPE_EXIT"] = "EVENT_TYPE_EXIT";
        e_apk_event_key["EVENT_TYPE_AD"] = "EVENT_TYPE_AD";
        e_apk_event_key["EVENT_TYPE_COMMON"] = "EVENT_TYPE_COMMON";
    })(e_apk_event_key = igc.e_apk_event_key || (igc.e_apk_event_key = {}));
    var e_comm_event_key;
    (function (e_comm_event_key) {
        e_comm_event_key["CommonEventKey_SwitchLogin"] = "CommonEventKey_SwitchLogin";
        e_comm_event_key["CommonEventKey_Prepay"] = "CommonEventKey_Prepay";
        e_comm_event_key["CommonEventKey_QueryOrder"] = "CommonEventKey_QueryOrder";
        e_comm_event_key["CommonEventKey_QueryOrderList"] = "CommonEventKey_QueryOrderList";
        e_comm_event_key["CommonEventKey_ConfirmOrder"] = "CommonEventKey_ConfirmOrder";
        e_comm_event_key["CommonEventKey_GetUserInfo"] = "CommonEventKey_GetUserInfo";
    })(e_comm_event_key = igc.e_comm_event_key || (igc.e_comm_event_key = {}));
})(igc || (igc = {}));
var igc;
(function (igc) {
    var e_engine_type;
    (function (e_engine_type) {
        e_engine_type[e_engine_type["cocos"] = 1] = "cocos";
        e_engine_type[e_engine_type["laya"] = 2] = "laya";
        e_engine_type[e_engine_type["egret"] = 3] = "egret";
    })(e_engine_type = igc.e_engine_type || (igc.e_engine_type = {}));
    var igc_login_level;
    (function (igc_login_level) {
        igc_login_level[igc_login_level["login_channle"] = 0] = "login_channle";
        igc_login_level[igc_login_level["login_tpf"] = 1] = "login_tpf";
        igc_login_level[igc_login_level["login_plat"] = 2] = "login_plat";
        igc_login_level[igc_login_level["login_plat_re"] = 3] = "login_plat_re";
        igc_login_level[igc_login_level["login_without_http"] = 4] = "login_without_http";
    })(igc_login_level = igc.igc_login_level || (igc.igc_login_level = {}));
    var e_log_level;
    (function (e_log_level) {
        e_log_level[e_log_level["none"] = 0] = "none";
        e_log_level[e_log_level["error"] = 1] = "error";
        e_log_level[e_log_level["warn"] = 2] = "warn";
        e_log_level[e_log_level["log"] = 3] = "log";
    })(e_log_level = igc.e_log_level || (igc.e_log_level = {}));
    igc.igc_config = {
        release: {
            game_param: {},
            channel_config: {
                1: {
                    channel_type: igc.e_channel_type.web,
                    app_id: 600000,
                    pkg_name: 345,
                    facade: {
                        1: "channel_user_web",
                        2: "channel_pay_web",
                        8: "channel_ad_web",
                        4: "channel_share_web",
                        100: "channel_system_web"
                    }
                },
                2: {
                    channel_type: igc.e_channel_type.oppo_qg,
                    facade: {
                        1: "channel_user_oppo_qg",
                        8: "channel_ad_oppo_qg",
                        100: "channel_system_oppo_qg"
                    }
                },
                4: {
                    channel_type: igc.e_channel_type.vivo_qg,
                    facade: {
                        1: "channel_user_vivo_qg",
                        8: "channel_ad_vivo_qg",
                        100: "channel_system_vivo_qg"
                    }
                },
                5: {
                    channel_type: igc.e_channel_type.qq,
                    facade: {
                        1: "channel_user_qq",
                        4: "channel_share_qq",
                        8: "channel_ad_qq",
                        100: "channel_system_qq"
                    }
                },
                8: {
                    channel_type: igc.e_channel_type.tt,
                    facade: {
                        1: "channel_user_tt",
                        4: "channel_share_tt",
                        8: "channel_ad_tt",
                        100: "channel_system_tt"
                    }
                },
                10: {
                    channel_type: igc.e_channel_type.hw_qg,
                    facade: {
                        1: "channel_user_hw_qg",
                        8: "channel_ad_hw_qg",
                        100: "channel_system_hw_qg"
                    }
                }
            }
        },
        debug: {
            game_param: {},
            channel_config: {}
        }
    };
})(igc || (igc = {}));
var igc;
(function (igc) {
    var igc_main = (function () {
        function igc_main() {
            this.storage_keys = [
                "igc_nick_name",
                "igc_avatar"
            ];
            this._init = false;
            this._channel_type = 0;
            this.retry_connect_count = 0;
            this.retry_channel_login = 0;
            this.is_new_player = false;
            this.tpf_user_id = "";
            this.channel_user_id = "";
            this.tpf_token = "";
            this._tpf_sdk = undefined;
            this._release = false;
            this._force_offline = false;
            this._apk_user_info = undefined;
        }
        Object.defineProperty(igc_main, "instance", {
            get: function () {
                if (!igc_main._instances) {
                    igc_main._instances = new this();
                }
                return igc_main._instances;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(igc_main.prototype, "tpf_sdk", {
            get: function () {
                return igc_main.instance._tpf_sdk;
            },
            set: function (tpf_sdk_set) {
                igc_main.instance._tpf_sdk = tpf_sdk_set;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(igc_main.prototype, "app_config", {
            get: function () {
                return igc_main.instance._release ? igc.igc_config.release : igc.igc_config.debug;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(igc_main.prototype, "multual_push_manager", {
            get: function () {
                return igc.multual_push_manager.instance;
            },
            enumerable: true,
            configurable: true
        });
        igc_main.prototype.init_multual_push_manager = function () {
            if (igc_main.instance.app_config.game_param.has_multual_push) {
                igc_main.instance.multual_push_manager.init();
            }
            else {
                console.log("do not need multual_push_manager");
            }
        };
        igc_main.prototype.Update = function () {
        };
        igc_main.prototype.init_wrap = function (channel_type, init_config) {
            console.log("igc igc_main init_wrap");
            this._channel_type = channel_type;
            var config = {};
            for (var key in init_config) {
                config[igc.e_channel_type[key]] = init_config[key];
            }
            var game_config = config[channel_type];
            console.log("igc igc_main init_warp game_config:" + JSON.stringify(game_config));
            igc.igc_main.instance.init_param(game_config);
            igc.igc_main.instance.init(true);
            igc_main.instance._init = true;
        };
        igc_main.prototype.init = function (release) {
            igc_main.instance._release = release;
            igc_main.instance.init_tpf(igc_main.instance.app_config.game_param);
            igc_main.instance.init_log();
            igc_main.instance.init_multual_push_manager();
        };
        igc_main.prototype.init_param = function (game_param) {
            console.log("igc_main init_param run -> ", JSON.stringify(game_param));
            igc.igc_config.release.game_param = game_param;
            igc.igc_config.debug.game_param = game_param;
        };
        igc_main.prototype.init_log = function () {
        };
        igc_main.prototype.login_wrap_without_http = function (args) {
            igc_main.instance.tpf_sdk.loginWithoutHttp(args);
        };
        igc_main.prototype.login_wrap = function () {
            var channel_type = igc_main.instance.app_config.game_param.channel_type;
            igc_main.instance.app_config.game_param.is_login_soon = false;
        };
        igc_main.prototype.init_ad_param = function (param) {
        };
        igc_main.prototype.navigate_to_mini_program = function (param) {
            return igc.channel_sdk.instance.navigate_to_mini_program(param);
        };
        igc_main.prototype.get_plat_type = function (channel_type) {
            if (channel_type == igc.e_channel_type.test) {
                return "test";
            }
            else if (channel_type == igc.e_channel_type.web) {
                return "web";
            }
            else if (channel_type == igc.e_channel_type.oppo_qg) {
                return "OPPO_QG";
            }
            else if (channel_type == igc.e_channel_type.wx) {
                return "WECHAT";
            }
            else if (channel_type == igc.e_channel_type.vivo_qg) {
                return "VIVO_QG";
            }
            else if (channel_type == igc.e_channel_type.ddz) {
                return "DDZ";
            }
            else if (channel_type == igc.e_channel_type.qq) {
                return "QQ_NEW";
            }
            else if (channel_type == igc.e_channel_type.apk) {
                return "APK";
            }
            else if (channel_type == igc.e_channel_type.tt) {
                return "TT";
            }
            else if (channel_type == igc.e_channel_type.ipa) {
                return "ipa";
            }
            return "test";
        };
        igc_main.prototype.init_tpf = function (game_param) {
            igc_main.instance.tpf_sdk = window["tpfclientsdk"].getBuilder()
                .setParam("appId", game_param["app_id"])
                .setParam("channelId", game_param["channel_id"])
                .setParam("appKey", game_param["login_key"])
                .setParam("platType", igc_main.instance.get_plat_type(game_param["channel_type"]))
                .setParam("version", game_param["app_version"])
                .setParam("statAppKey", game_param["stat_key"])
                .setParam("statEventUrl", game_param["stat_event_url"])
                .setParam("wsCertUrl", game_param["ws_cert_url"])
                .setParam("batchStatEventUrl", game_param["batch_stat_event_url"])
                .setParam("configUrl", game_param["configUrl"])
                .setParam("configAppSecKey", game_param["configAppSecKey"])
                .build();
            igc_main.instance.tpf_sdk.init();
            igc_main.instance.init_config();
            igc_main.instance.init_channel(igc_main.instance.app_config);
            igc.stat_manager.instance.init();
            igc.stat_manager.instance.send_app_start();
        };
        igc_main.prototype.init_channel = function (param) {
            var channel_type = param.game_param.channel_type;
            var channel_param = param.channel_config[channel_type];
            igc.channel_sdk.instance.init(param.game_param, channel_param);
        };
        igc_main.prototype.init_config = function () {
        };
        igc_main.prototype.only_login_channel = function (callback) {
            var self = this;
            igc.channel_sdk.instance.login({}, function (res) {
                if (res.errorcode !== igc.e_channel_code.login_success) {
                    console.error("igc_main:only_errorin_channel", "login channel failed", res);
                    if (self.retry_channel_login < 5) {
                        self.retry_channel_login++;
                        setTimeout(function () {
                            self.only_login_channel(callback);
                        }, 1000);
                    }
                    else {
                    }
                    console.log("igc_main:login", "login channel failed", res);
                }
                else {
                    self.retry_channel_login = 0;
                    if (!res.channel_user_info.uid) {
                        var save = localStorage.getItem("igc_random_uid");
                        if (save && save != "") {
                            self.tpf_user_id = save;
                            self.channel_user_id = save;
                            self.tpf_token = "";
                        }
                        else {
                            var temp_random_uid = igc.utils_manager.get_random_name();
                            self.tpf_user_id = temp_random_uid;
                            self.channel_user_id = temp_random_uid;
                            self.tpf_token = "";
                            localStorage.setItem("igc_random_uid", temp_random_uid);
                        }
                        res.channel_user_info.uid = self.tpf_user_id;
                    }
                    else {
                        self.tpf_user_id = res.channel_user_info.uid;
                        self.channel_user_id = res.channel_user_info.uid;
                        self.tpf_token = "";
                    }
                    igc.stat_manager.instance.set_uid(self.tpf_user_id, self.tpf_user_id, 1);
                    igc.stat_manager.instance._account = self.tpf_user_id;
                    callback && callback(res);
                }
            });
        };
        igc_main.prototype.create_ad = function (param) {
            return igc.channel_sdk.instance.create_ad(param);
        };
        igc_main.prototype.destroy_ad = function (param) {
            return igc.channel_sdk.instance.destroy_ad(param);
        };
        igc_main.prototype.show_ad = function (param) {
            return igc.channel_sdk.instance.show_ad(param);
        };
        igc_main.prototype.hide_ad = function (param) {
            return igc.channel_sdk.instance.hide_ad(param);
        };
        igc_main.prototype.has_ad = function (param) {
            return igc.channel_sdk.instance.has_ad(param);
        };
        igc_main.prototype.set_ad_position = function (param) {
            return igc.channel_sdk.instance.set_ad_position(param);
        };
        igc_main.prototype.report_ad_show = function (param) {
            return igc.channel_sdk.instance.report_ad_show(param);
        };
        igc_main.prototype.report_ad_click = function (param) {
            return igc.channel_sdk.instance.report_ad_click(param);
        };
        igc_main.prototype.report_ad_close = function (param) {
            return igc.channel_sdk.instance.report_ad_close(param);
        };
        igc_main.prototype.device_shake = function (param) {
            return igc.channel_sdk.instance.device_shake(param);
        };
        igc_main.prototype.check_can_add_desktop = function (param) {
            return igc.channel_sdk.instance.check_can_add_desktop(param);
        };
        igc_main.prototype.check_is_add_desktop = function (param) {
            return igc.channel_sdk.instance.check_is_add_desktop(param);
        };
        igc_main.prototype.add_desktop = function (param) {
            return igc.channel_sdk.instance.add_desktop(param);
        };
        igc_main.prototype.on_show = function (param) {
            return igc.channel_sdk.instance.on_show(param);
        };
        igc_main.prototype.on_hide = function (param) {
            return igc.channel_sdk.instance.on_hide(param);
        };
        igc_main.prototype.get_system_info_sync = function () {
            return igc.channel_sdk.instance.get_system_info_sync();
        };
        igc_main.prototype.share = function (param) {
            return igc.channel_sdk.instance.share(param);
        };
        igc_main.prototype.on_share_app_message = function (param) {
            return igc.channel_sdk.instance.on_share_app_message(param);
        };
        igc_main.prototype.start_record_screen = function (param) {
            return igc.channel_sdk.instance.start_record_screen(param);
        };
        igc_main.prototype.stop_record_screen = function () {
            return igc.channel_sdk.instance.stop_record_screen();
        };
        igc_main.prototype.pause_record_screen = function () {
            return igc.channel_sdk.instance.pause_record_screen();
        };
        igc_main.prototype.resume_record_screen = function () {
            return igc.channel_sdk.instance.resume_record_screen();
        };
        igc_main.prototype.share_record_screen = function (param) {
            return igc.channel_sdk.instance.share_record_screen(param);
        };
        igc_main.prototype.get_record_video = function () {
            return igc.channel_sdk.instance.get_record_video();
        };
        igc_main.prototype.get_launch_options_sync = function () {
            return igc.channel_sdk.instance.get_launch_options_sync();
        };
        igc_main.prototype.exit_mini_program = function () {
            return igc.channel_sdk.instance.exit_mini_program();
        };
        igc_main._instances = undefined;
        return igc_main;
    }());
    igc.igc_main = igc_main;
})(igc || (igc = {}));
if (window) {
    window["igc"] = igc;
}
var igc;
(function (igc) {
    var e_channel_code;
    (function (e_channel_code) {
        e_channel_code[e_channel_code["support_error"] = -5] = "support_error";
        e_channel_code[e_channel_code["param_error"] = -4] = "param_error";
        e_channel_code[e_channel_code["param_not_complete"] = -3] = "param_not_complete";
        e_channel_code[e_channel_code["network_error"] = -2] = "network_error";
        e_channel_code[e_channel_code["fail"] = -1] = "fail";
        e_channel_code[e_channel_code["success"] = 0] = "success";
        e_channel_code[e_channel_code["init_success"] = 1] = "init_success";
        e_channel_code[e_channel_code["init_fail"] = 2] = "init_fail";
        e_channel_code[e_channel_code["uninit"] = 3] = "uninit";
        e_channel_code[e_channel_code["login_success"] = 4] = "login_success";
        e_channel_code[e_channel_code["login_fail"] = 5] = "login_fail";
        e_channel_code[e_channel_code["login_timeout"] = 6] = "login_timeout";
        e_channel_code[e_channel_code["unlogin"] = 7] = "unlogin";
        e_channel_code[e_channel_code["logout_success"] = 8] = "logout_success";
        e_channel_code[e_channel_code["logout_fail"] = 9] = "logout_fail";
        e_channel_code[e_channel_code["pay_success"] = 10] = "pay_success";
        e_channel_code[e_channel_code["pay_fail"] = 11] = "pay_fail";
        e_channel_code[e_channel_code["share_success"] = 12] = "share_success";
        e_channel_code[e_channel_code["share_failed"] = 13] = "share_failed";
    })(e_channel_code = igc.e_channel_code || (igc.e_channel_code = {}));
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_config = (function () {
        function channel_config() {
        }
        channel_config.init = function (game_param, channel_param) {
            channel_config.config["game_param"] = game_param;
            channel_config.config["channel_param"] = channel_param;
        };
        channel_config.config = {};
        return channel_config;
    }());
    igc.channel_config = channel_config;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_facade_manager = (function () {
        function channel_facade_manager() {
            this.channel_config = {};
        }
        Object.defineProperty(channel_facade_manager, "instance", {
            get: function () {
                if (!channel_facade_manager._instances) {
                    channel_facade_manager._instances = new this();
                }
                return channel_facade_manager._instances;
            },
            enumerable: true,
            configurable: true
        });
        channel_facade_manager.prototype.init = function (channel_config) {
            this.channel_config = channel_config;
        };
        channel_facade_manager.prototype.check_support_facade = function (facade_type) {
            if (!igc.channel_config.config["channel_param"]["facade"] || !igc.channel_config.config["channel_param"]["facade"][facade_type]) {
                return false;
            }
            return true;
        };
        channel_facade_manager.prototype.get_facade_name = function (facade_type) {
            if (!igc.channel_config.config["channel_param"]["facade"][facade_type]) {
                return undefined;
            }
            return igc.channel_config.config["channel_param"]["facade"][facade_type];
        };
        channel_facade_manager.prototype.init_facade = function (facade_type) {
            if (!this.check_support_facade(facade_type)) {
                return undefined;
            }
            var facade_name = this.get_facade_name(facade_type);
            if (facade_name != undefined && igc[facade_name]) {
                return new igc[facade_name]();
            }
            return undefined;
        };
        channel_facade_manager.prototype.diy_eval = function (fn) {
            var Fn = Function;
            return new Fn("return " + fn);
        };
        channel_facade_manager._instances = undefined;
        return channel_facade_manager;
    }());
    igc.channel_facade_manager = channel_facade_manager;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_sdk = (function () {
        function channel_sdk() {
            this._channel_user_info = {};
            this._is_login = false;
        }
        Object.defineProperty(channel_sdk, "instance", {
            get: function () {
                if (!channel_sdk._instances) {
                    channel_sdk._instances = new this();
                }
                return channel_sdk._instances;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(channel_sdk.prototype, "channel_user_info", {
            get: function () {
                return channel_sdk.instance._channel_user_info;
            },
            set: function (user_info) {
                channel_sdk.instance._channel_user_info = user_info;
                channel_sdk.instance._is_login = true;
            },
            enumerable: true,
            configurable: true
        });
        channel_sdk.prototype.init = function (game_param, channel_param) {
            igc.channel_config.init(game_param, channel_param);
            igc.channel_facade_manager.instance.init(channel_param);
            igc.channel_module_user.instance.init();
            igc.channel_module_pay.instance.init();
            igc.channel_module_ad_xx.instance.init();
            igc.channel_module_share.instance.init();
            igc.channel_module_system.instance.init();
        };
        channel_sdk.prototype.login = function (login_param, callback) {
            if (channel_sdk.instance._is_login) {
                if (callback) {
                    callback({ errorcode: igc.e_channel_code.login_success, errormsg: "", sdk_errorcode: 0, sdk_errormsg: "", channel_user_info: channel_sdk.instance.channel_user_info });
                }
                return;
            }
            igc.channel_module_user.instance.login(login_param, callback);
        };
        channel_sdk.prototype.pay = function (pay_param, callback) {
            if (!channel_sdk.instance._is_login) {
                if (callback) {
                    callback({ errorcode: igc.e_channel_code.unlogin, errormsg: "fail", sdk_errorcode: -1, sdk_errormsg: {} });
                }
                return;
            }
            igc.channel_module_pay.instance.pay(pay_param, callback);
        };
        channel_sdk.prototype.create_ad = function (param) {
            return igc.channel_module_ad_xx.instance.create_ad(param);
        };
        channel_sdk.prototype.destroy_ad = function (param) {
            return igc.channel_module_ad_xx.instance.destroy_ad(param);
        };
        channel_sdk.prototype.show_ad = function (param) {
            return igc.channel_module_ad_xx.instance.show_ad(param);
        };
        channel_sdk.prototype.hide_ad = function (param) {
            return igc.channel_module_ad_xx.instance.hide_ad(param);
        };
        channel_sdk.prototype.has_ad = function (param) {
            return igc.channel_module_ad_xx.instance.has_ad(param);
        };
        channel_sdk.prototype.set_ad_position = function (param) {
            return igc.channel_module_ad_xx.instance.set_ad_position(param);
        };
        channel_sdk.prototype.report_ad_show = function (param) {
            return igc.channel_module_ad_xx.instance.report_ad_show(param);
        };
        channel_sdk.prototype.report_ad_click = function (param) {
            return igc.channel_module_ad_xx.instance.report_ad_click(param);
        };
        channel_sdk.prototype.report_ad_close = function (param) {
            return igc.channel_module_ad_xx.instance.report_ad_close(param);
        };
        channel_sdk.prototype.load_ad_just = function (param) {
            return igc.channel_module_ad_xx.instance.load_ad_just(param);
        };
        channel_sdk.prototype.show_ad_just = function (param) {
            return igc.channel_module_ad_xx.instance.show_ad_just(param);
        };
        channel_sdk.prototype.show_loading = function (param) {
            return igc.channel_module_user.instance.show_loading(param);
        };
        channel_sdk.prototype.show_toast = function (param) {
            return igc.channel_module_user.instance.show_toast(param);
        };
        channel_sdk.prototype.show_modal = function (param) {
            return igc.channel_module_user.instance.show_modal(param);
        };
        channel_sdk.prototype.on_show = function (param) {
            return igc.channel_module_system.instance.on_show(param);
        };
        channel_sdk.prototype.on_hide = function (param) {
            return igc.channel_module_system.instance.on_hide(param);
        };
        channel_sdk.prototype.navigate_to_mini_program = function (param) {
            return igc.channel_module_system.instance.navigate_to_mini_program(param);
        };
        channel_sdk.prototype.get_launch_options_sync = function () {
            return igc.channel_module_system.instance.get_launch_options_sync();
        };
        channel_sdk.prototype.exit_mini_program = function () {
            return igc.channel_module_system.instance.exit_mini_program();
        };
        channel_sdk.prototype.show_more_game_modal = function () {
            return igc.channel_module_user.instance.show_more_game_modal();
        };
        channel_sdk.prototype.check_show_more_game = function (param) {
            return igc.channel_module_user.instance.check_show_more_game(param);
        };
        channel_sdk.prototype.more_game_btn_tap = function () {
            return igc.channel_module_user.instance.more_game_btn_tap();
        };
        channel_sdk.prototype.more_game_btn_show = function () {
            return igc.channel_module_user.instance.more_game_btn_show();
        };
        channel_sdk.prototype.more_game_btn_hide = function () {
            return igc.channel_module_user.instance.more_game_btn_hide();
        };
        channel_sdk.prototype.get_invite_query = function () {
            return igc.channel_module_user.instance.get_invite_query();
        };
        channel_sdk.prototype.set_show_share_menu = function (param) {
            return igc.channel_module_user.instance.set_show_share_menu(param);
        };
        channel_sdk.prototype.get_system_info_sync = function () {
            return igc.channel_module_system.instance.get_system_info_sync();
        };
        channel_sdk.prototype.create_inner_audio_context = function (param) {
            return igc.channel_module_user.instance.create_inner_audio_context(param);
        };
        channel_sdk.prototype.post_message = function (param) {
            return igc.channel_module_user.instance.post_message(param);
        };
        channel_sdk.prototype.set_user_cloud_storage = function (param) {
            return igc.channel_module_user.instance.set_user_cloud_storage(param);
        };
        channel_sdk.prototype.get_setting = function (param) {
            return igc.channel_module_user.instance.get_setting(param);
        };
        channel_sdk.prototype.create_user_info_button = function (param) {
            return igc.channel_module_user.instance.create_user_info_button(param);
        };
        channel_sdk.prototype.open_setting = function (param) {
            return igc.channel_module_user.instance.open_setting(param);
        };
        channel_sdk.prototype.authorize = function (param) {
            return igc.channel_module_user.instance.authorize(param);
        };
        channel_sdk.prototype.get_device = function (param) {
            return igc.channel_module_user.instance.get_device(param);
        };
        channel_sdk.prototype.device_shake = function (param) {
            return igc.channel_module_user.instance.device_shake(param);
        };
        channel_sdk.prototype.check_can_add_desktop = function (param) {
            return igc.channel_module_user.instance.check_can_add_desktop(param);
        };
        channel_sdk.prototype.check_is_add_desktop = function (param) {
            return igc.channel_module_user.instance.check_is_add_desktop(param);
        };
        channel_sdk.prototype.add_desktop = function (param) {
            return igc.channel_module_user.instance.add_desktop(param);
        };
        channel_sdk.prototype.share = function (param) {
            return igc.channel_module_share.instance.share(param);
        };
        channel_sdk.prototype.on_share_app_message = function (param) {
            return igc.channel_module_share.instance.on_share_app_message(param);
        };
        channel_sdk.prototype.start_record_screen = function (param) {
            return igc.channel_module_share.instance.start_record_screen(param);
        };
        channel_sdk.prototype.stop_record_screen = function () {
            return igc.channel_module_share.instance.stop_record_screen();
        };
        channel_sdk.prototype.pause_record_screen = function () {
            return igc.channel_module_share.instance.pause_record_screen();
        };
        channel_sdk.prototype.resume_record_screen = function () {
            return igc.channel_module_share.instance.resume_record_screen();
        };
        channel_sdk.prototype.share_record_screen = function (param) {
            return igc.channel_module_share.instance.share_record_screen(param);
        };
        channel_sdk.prototype.get_record_video = function () {
            return igc.channel_module_share.instance.get_record_video();
        };
        channel_sdk._instances = undefined;
        return channel_sdk;
    }());
    igc.channel_sdk = channel_sdk;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_facade_aa_base = (function () {
        function channel_facade_aa_base() {
            this.support_method = {};
        }
        channel_facade_aa_base.prototype.init = function () {
        };
        channel_facade_aa_base.prototype.check_support_method = function (method_type) {
            if (this.support_method[method_type]) {
                return true;
            }
            return false;
        };
        channel_facade_aa_base.prototype.check_param = function (param) {
            return false;
        };
        return channel_facade_aa_base;
    }());
    igc.channel_facade_aa_base = channel_facade_aa_base;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_facade_ad_base = (function (_super) {
        __extends(channel_facade_ad_base, _super);
        function channel_facade_ad_base() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ad_queue = {};
            return _this;
        }
        channel_facade_ad_base.prototype.create_ad = function (param) {
        };
        channel_facade_ad_base.prototype.destroy_ad = function (param) {
        };
        channel_facade_ad_base.prototype.show_ad = function (param) {
        };
        channel_facade_ad_base.prototype.hide_ad = function (param) {
        };
        channel_facade_ad_base.prototype.set_ad_position = function (param) {
        };
        channel_facade_ad_base.prototype.report_ad_show = function (param) {
        };
        channel_facade_ad_base.prototype.report_ad_click = function (param) {
        };
        channel_facade_ad_base.prototype.load_ad_just = function (param) {
        };
        channel_facade_ad_base.prototype.show_ad_just = function (param) {
        };
        channel_facade_ad_base.prototype.has_ad = function (param) {
            var self = this;
            var ad_obj = self.ad_queue[param.ad_id];
            if (ad_obj !== undefined && ad_obj.ad_instance !== undefined) {
                return true;
            }
            return false;
        };
        return channel_facade_ad_base;
    }(igc.channel_facade_aa_base));
    igc.channel_facade_ad_base = channel_facade_ad_base;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var _PAY_SIGN_CFG = ['appID', 'userID', 'orderID', 'thirdUserID', 'roleID', 'channelID', 'pkgID', 'isp', 'payType',
        'productID', 'productName', 'productDesc', 'productPrice', 'productCount', 'productTotalPrice', 'currency',
        'payCallback', 'imsi', 'imei', 'iccid', 'ip', 'net', 'extension', 'timestamp'];
    var channel_facade_pay_base = (function (_super) {
        __extends(channel_facade_pay_base, _super);
        function channel_facade_pay_base() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_facade_pay_base.prototype.check_param = function (param) {
            if (!param.product_id || !param.product_price || !param.product_count || !param.product_total_price) {
                return false;
            }
            return true;
        };
        channel_facade_pay_base.prototype.signPart = function (params, sign_cfg) {
            var sign = "";
            var param = "";
            var sdic = Object.keys(params).sort();
            for (var i = 0; i < sdic.length; ++i) {
                var k = sdic[i];
                if (sign_cfg.indexOf(k) > -1) {
                    if (sign != "") {
                        sign += "&";
                    }
                    sign += k + "=" + params[k];
                }
                if (param != "") {
                    param += "&";
                }
                param += k + "=" + params[k];
            }
            return param + "&sign=" + window["md5"](sign).toUpperCase();
        };
        ;
        channel_facade_pay_base.prototype.submit_order = function (pay_param, channel_extension, callback) {
            if (!this.check_param(pay_param)) {
                callback({ retcode: igc.e_channel_code.param_error, param: {} });
                return false;
            }
            var head = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            var channel_id = pay_param.pay_debug ? pay_param.channel_id_debug : igc.channel_config.config["game_param"]["channel_id"];
            var product_price = pay_param.pay_debug ? pay_param.product_price_debug : pay_param.product_price;
            var product_total_price = pay_param.pay_debug ? pay_param.product_total_price_debug : pay_param.product_total_price;
            var self = this;
            var buf = {
                "appID": igc.channel_config.config["game_param"]["app_id"],
                "userID": pay_param.tpf_user_id,
                "thirdUserID": igc.channel_sdk.instance.channel_user_info.uid,
                "roleID": "",
                "channelID": channel_id,
                "pkgID": "",
                "isp": 1,
                "payType": 1,
                "productID": pay_param.product_id,
                "productName": pay_param.product_name,
                "productDesc": pay_param.product_desc,
                "productPrice": product_price,
                "productCount": pay_param.product_count,
                "productTotalPrice": product_total_price,
                "currency": "CNY",
                "payCallback": "",
                "imsi": "",
                "imei": "",
                "iccid": "",
                "ip": "",
                "net": "",
                "extension": channel_extension,
                "timestamp": Date.now() + "",
                "cliVersion": igc.channel_config.config["game_param"]["app_version"],
            };
            var data = this.signPart(buf, _PAY_SIGN_CFG);
            var isRspBinary = false;
            window["HttpUtils"].http_request("POST", igc.channel_config.config["game_param"]["pay_url"], head, data, isRspBinary, function (code, respone) {
                if (code == 200) {
                    respone = JSON.parse(respone);
                    if (respone.errorCode == 0 && respone.extension !== "") {
                        var data = {
                            retcode: igc.e_channel_code.success,
                            param: {
                                order_id: respone.orderID,
                                callback_url: JSON.parse(respone.extension)["callbackUrl"],
                                orderNo: JSON.parse(respone.extension)["orderNo"],
                                timestamp: JSON.parse(respone.extension)["timestamp"],
                                paySign: JSON.parse(respone.extension)["paySign"],
                            }
                        };
                        callback(data);
                    }
                    else {
                        callback({ retcode: igc.e_channel_code.fail, param: {} });
                    }
                }
                else {
                    callback({ retcode: igc.e_channel_code.fail, param: {} });
                }
            });
        };
        channel_facade_pay_base.prototype.retry_query_order = function (pay_param, order_param, channel_extension, callback) {
            var self = this;
            if (0 < pay_param.retry_times) {
                --pay_param.retry_times;
                setTimeout(function () {
                    self.query_order(pay_param, order_param, channel_extension, callback);
                }, pay_param["retry_inteval"]);
                return true;
            }
            else {
                return false;
            }
        };
        channel_facade_pay_base.prototype.query_order = function (pay_param, order_param, channel_extension, callback) {
            var head = {
                "Content-Type": "application/x-www-form-urlencoded"
            };
            var self = this;
            var channel_id = pay_param.pay_debug ? pay_param.channel_id_debug : igc.channel_config.config["game_param"]["channel_id"];
            var product_price = pay_param.pay_debug ? pay_param.product_price_debug : pay_param.product_price;
            var product_total_price = pay_param.pay_debug ? pay_param.product_total_price_debug : pay_param.product_total_price;
            var buf = {
                "appID": igc.channel_config.config["game_param"]["app_id"],
                "userID": pay_param.tpf_user_id,
                "orderID": order_param.order_id,
                "channelID": channel_id,
                "extension": channel_extension,
                "timestamp": Date.now() + "",
            };
            var data = this.signPart(buf, _PAY_SIGN_CFG);
            var isRspBinary = false;
            window["HttpUtils"].http_request("POST", igc.channel_config.config["game_param"]["pay_query_url"], head, data, isRspBinary, function (code, respone) {
                if (code == 200) {
                    respone = JSON.parse(respone);
                    if (respone.errorCode == 0) {
                        if (respone.payResult == 0) {
                            if (callback) {
                                var data = {
                                    retcode: igc.e_channel_code.pay_success,
                                    param: {
                                        orderID: order_param.order_id,
                                        productID: respone.productID,
                                        productCount: respone.productCount,
                                        payMoney: respone.payMoney
                                    }
                                };
                                callback(data);
                            }
                        }
                        else {
                            if (!self.retry_query_order(pay_param, order_param, channel_extension, callback)) {
                                var data_err = {
                                    retcode: igc.e_channel_code.pay_fail,
                                    param: {
                                        orderID: order_param.order_id,
                                    }
                                };
                                callback(data);
                            }
                        }
                    }
                    else {
                        if (!self.retry_query_order(pay_param, order_param, channel_extension, callback)) {
                            var data_err = {
                                retcode: igc.e_channel_code.pay_fail,
                                param: {
                                    orderID: order_param.order_id,
                                }
                            };
                            callback(data);
                        }
                    }
                }
                else {
                    if (!self.retry_query_order(pay_param, order_param, channel_extension, callback)) {
                        var data_err = {
                            retcode: igc.e_channel_code.pay_fail,
                            param: {
                                orderID: order_param.order_id,
                            }
                        };
                        callback(data);
                    }
                }
            });
        };
        channel_facade_pay_base.prototype.pay = function (pay_param, callback) {
        };
        channel_facade_pay_base.prototype.on_pay_result = function (retcode, param, callback) {
        };
        return channel_facade_pay_base;
    }(igc.channel_facade_aa_base));
    igc.channel_facade_pay_base = channel_facade_pay_base;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_facade_share_base = (function (_super) {
        __extends(channel_facade_share_base, _super);
        function channel_facade_share_base() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_facade_share_base.prototype.share = function (param) {
        };
        channel_facade_share_base.prototype.on_share_app_message = function (param) {
        };
        channel_facade_share_base.prototype.start_record_screen = function (param) {
        };
        channel_facade_share_base.prototype.stop_record_screen = function (param) {
        };
        channel_facade_share_base.prototype.pause_record_screen = function (param) {
        };
        channel_facade_share_base.prototype.resume_record_screen = function (param) {
        };
        channel_facade_share_base.prototype.share_record_screen = function (param) {
        };
        channel_facade_share_base.prototype.get_record_video = function (param) {
        };
        return channel_facade_share_base;
    }(igc.channel_facade_aa_base));
    igc.channel_facade_share_base = channel_facade_share_base;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_facade_system_base = (function (_super) {
        __extends(channel_facade_system_base, _super);
        function channel_facade_system_base() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_facade_system_base.prototype.get_system_info_sync = function () {
        };
        channel_facade_system_base.prototype.get_launch_options_sync = function () {
        };
        channel_facade_system_base.prototype.on_show = function (param) {
        };
        channel_facade_system_base.prototype.on_hide = function (param) {
        };
        channel_facade_system_base.prototype.exit_mini_program = function () {
        };
        channel_facade_system_base.prototype.navigate_to_mini_program = function (param) {
        };
        return channel_facade_system_base;
    }(igc.channel_facade_aa_base));
    igc.channel_facade_system_base = channel_facade_system_base;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_facade_user_base = (function (_super) {
        __extends(channel_facade_user_base, _super);
        function channel_facade_user_base() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_facade_user_base.prototype.login = function (login_param, callback) {
        };
        channel_facade_user_base.prototype.share = function (param) {
        };
        channel_facade_user_base.prototype.on_login_result = function (retcode, param, callback) {
        };
        channel_facade_user_base.prototype.create_channel_user_info = function (param) {
            return "";
        };
        channel_facade_user_base.prototype.config_channel_user_info = function (param, create_func) {
            var user_info = create_func(param);
            igc.channel_sdk.instance.channel_user_info = user_info;
            return user_info;
        };
        channel_facade_user_base.prototype.get_random_name = function () {
            var name = "role_";
            var pos = 0;
            var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            for (var i = 0; i < 8; i++) {
                pos = Math.round(Math.random() * (arr.length - 1));
                name += arr[pos];
            }
            return name;
        };
        return channel_facade_user_base;
    }(igc.channel_facade_aa_base));
    igc.channel_facade_user_base = channel_facade_user_base;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_module_ad_xx = (function () {
        function channel_module_ad_xx() {
            this.facade_obj = undefined;
        }
        Object.defineProperty(channel_module_ad_xx, "instance", {
            get: function () {
                if (!channel_module_ad_xx._instances) {
                    channel_module_ad_xx._instances = new this();
                }
                return channel_module_ad_xx._instances;
            },
            enumerable: true,
            configurable: true
        });
        channel_module_ad_xx.prototype.init = function () {
            this.facade_obj = igc.channel_facade_manager.instance.init_facade(igc.e_facade_type.ad);
            if (this.facade_obj) {
                this.facade_obj.init();
            }
        };
        channel_module_ad_xx.prototype.check_support_method = function (method_type) {
            if (this.facade_obj === undefined) {
                return false;
            }
            var sdk_support = this.facade_obj.check_support_method(method_type);
            return sdk_support;
        };
        channel_module_ad_xx.prototype.create_ad = function (param) {
            if (!this.check_support_method(igc.e_method_type.create_ad)) {
                return false;
            }
            return this.facade_obj.create_ad(param);
        };
        channel_module_ad_xx.prototype.destroy_ad = function (param) {
            if (!this.check_support_method(igc.e_method_type.destroy_ad)) {
                return false;
            }
            return this.facade_obj.destroy_ad(param);
        };
        channel_module_ad_xx.prototype.show_ad = function (param) {
            if (!this.check_support_method(igc.e_method_type.show_ad)) {
                return false;
            }
            return this.facade_obj.show_ad(param);
        };
        channel_module_ad_xx.prototype.hide_ad = function (param) {
            if (!this.check_support_method(igc.e_method_type.hide_ad)) {
                return false;
            }
            return this.facade_obj.hide_ad(param);
        };
        channel_module_ad_xx.prototype.has_ad = function (param) {
            if (!this.check_support_method(igc.e_method_type.has_ad)) {
                return false;
            }
            return this.facade_obj.has_ad(param);
        };
        channel_module_ad_xx.prototype.set_ad_position = function (param) {
            if (!this.check_support_method(igc.e_method_type.set_ad_position)) {
                return false;
            }
            return this.facade_obj.set_ad_position(param);
        };
        channel_module_ad_xx.prototype.report_ad_show = function (param) {
            if (!this.check_support_method(igc.e_method_type.report_ad_show)) {
                return false;
            }
            return this.facade_obj.report_ad_show(param);
        };
        channel_module_ad_xx.prototype.report_ad_click = function (param) {
            if (!this.check_support_method(igc.e_method_type.report_ad_click)) {
                return false;
            }
            return this.facade_obj.report_ad_click(param);
        };
        channel_module_ad_xx.prototype.report_ad_close = function (param) {
            if (!this.check_support_method(igc.e_method_type.report_ad_close)) {
                return false;
            }
            return this.facade_obj.report_ad_close(param);
        };
        channel_module_ad_xx.prototype.load_ad_just = function (param) {
            if (!this.check_support_method(igc.e_method_type.load_ad_just)) {
                return false;
            }
            return this.facade_obj.load_ad_just(param);
        };
        channel_module_ad_xx.prototype.show_ad_just = function (param) {
            if (!this.check_support_method(igc.e_method_type.show_ad_just)) {
                return false;
            }
            return this.facade_obj.show_ad_just(param);
        };
        channel_module_ad_xx._instances = undefined;
        return channel_module_ad_xx;
    }());
    igc.channel_module_ad_xx = channel_module_ad_xx;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_module_pay = (function () {
        function channel_module_pay() {
            this.facade_obj = undefined;
        }
        Object.defineProperty(channel_module_pay, "instance", {
            get: function () {
                if (!channel_module_pay._instances) {
                    channel_module_pay._instances = new this();
                }
                return channel_module_pay._instances;
            },
            enumerable: true,
            configurable: true
        });
        channel_module_pay.prototype.init = function () {
            this.facade_obj = igc.channel_facade_manager.instance.init_facade(igc.e_facade_type.pay);
            if (this.facade_obj) {
                this.facade_obj.init();
            }
        };
        channel_module_pay.prototype.check_support_method = function (method_type) {
            if (this.facade_obj == undefined) {
                return false;
            }
            var sdk_support = this.facade_obj.check_support_method(method_type);
            return sdk_support;
        };
        channel_module_pay.prototype.pay = function (pay_param, callback) {
            if (!this.check_support_method(igc.e_method_type.login)) {
                if (callback) {
                    callback({ errorcode: igc.e_channel_code.support_error, errormsg: "", sdk_errorcode: -1, sdk_errormsg: "" });
                }
                return;
            }
            this.facade_obj.pay(pay_param, callback);
        };
        channel_module_pay._instances = undefined;
        return channel_module_pay;
    }());
    igc.channel_module_pay = channel_module_pay;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_module_share = (function () {
        function channel_module_share() {
            this.facade_obj = undefined;
        }
        Object.defineProperty(channel_module_share, "instance", {
            get: function () {
                if (!channel_module_share._instances) {
                    channel_module_share._instances = new this();
                }
                return channel_module_share._instances;
            },
            enumerable: true,
            configurable: true
        });
        channel_module_share.prototype.init = function () {
            this.facade_obj = igc.channel_facade_manager.instance.init_facade(igc.e_facade_type.share);
            if (this.facade_obj) {
                this.facade_obj.init();
            }
        };
        channel_module_share.prototype.check_support_method = function (method_type) {
            if (this.facade_obj === undefined) {
                return false;
            }
            var sdk_support = this.facade_obj.check_support_method(method_type);
            return sdk_support;
        };
        channel_module_share.prototype.share = function (param) {
            if (!this.check_support_method(igc.e_method_type.share)) {
                return false;
            }
            igc.stat_manager.instance.send_user_event(igc.e_share_event_id.click, igc.e_share_event_type.share, 0, 0, "");
            return this.facade_obj.share(param);
        };
        channel_module_share.prototype.on_share_app_message = function (param) {
            if (!this.check_support_method(igc.e_method_type.on_share_app_message)) {
                return false;
            }
            return this.facade_obj.on_share_app_message(param);
        };
        channel_module_share.prototype.start_record_screen = function (param) {
            if (!this.check_support_method(igc.e_method_type.start_record_screen)) {
                return false;
            }
            return this.facade_obj.start_record_screen(param);
        };
        channel_module_share.prototype.stop_record_screen = function () {
            if (!this.check_support_method(igc.e_method_type.stop_record_screen)) {
                return false;
            }
            return this.facade_obj.stop_record_screen();
        };
        channel_module_share.prototype.pause_record_screen = function () {
            if (!this.check_support_method(igc.e_method_type.pause_record_screen)) {
                return false;
            }
            return this.facade_obj.pause_record_screen();
        };
        channel_module_share.prototype.resume_record_screen = function () {
            if (!this.check_support_method(igc.e_method_type.resume_record_screen)) {
                return false;
            }
            return this.facade_obj.resume_record_screen();
        };
        channel_module_share.prototype.share_record_screen = function (param) {
            if (!this.check_support_method(igc.e_method_type.share_record_screen)) {
                return false;
            }
            return this.facade_obj.share_record_screen(param);
        };
        channel_module_share.prototype.get_record_video = function () {
            if (!this.check_support_method(igc.e_method_type.get_record_video)) {
                return false;
            }
            return this.facade_obj.get_record_video();
        };
        channel_module_share._instances = undefined;
        return channel_module_share;
    }());
    igc.channel_module_share = channel_module_share;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_module_system = (function () {
        function channel_module_system() {
            this.facade_obj = undefined;
        }
        Object.defineProperty(channel_module_system, "instance", {
            get: function () {
                if (!channel_module_system._instances) {
                    channel_module_system._instances = new this();
                }
                return channel_module_system._instances;
            },
            enumerable: true,
            configurable: true
        });
        channel_module_system.prototype.init = function () {
            this.facade_obj = igc.channel_facade_manager.instance.init_facade(igc.e_facade_type.system);
            if (this.facade_obj) {
                this.facade_obj.init();
            }
        };
        channel_module_system.prototype.check_support_method = function (method_type) {
            if (this.facade_obj === undefined) {
                return false;
            }
            var sdk_support = this.facade_obj.check_support_method(method_type);
            return sdk_support;
        };
        channel_module_system.prototype.get_system_info_sync = function () {
            if (!this.check_support_method(igc.e_method_type.get_system_info_sync)) {
                return false;
            }
            return this.facade_obj.get_system_info_sync();
        };
        channel_module_system.prototype.get_launch_options_sync = function () {
            if (!this.check_support_method(igc.e_method_type.get_launch_options_sync)) {
                return false;
            }
            return this.facade_obj.get_launch_options_sync();
        };
        channel_module_system.prototype.on_show = function (param) {
            if (!this.check_support_method(igc.e_method_type.on_show)) {
                return false;
            }
            return this.facade_obj.on_show(param);
        };
        channel_module_system.prototype.on_hide = function (param) {
            if (!this.check_support_method(igc.e_method_type.on_hide)) {
                return false;
            }
            return this.facade_obj.on_hide(param);
        };
        channel_module_system.prototype.exit_mini_program = function () {
            if (!this.check_support_method(igc.e_method_type.exit_mini_program)) {
                return false;
            }
            return this.facade_obj.exit_mini_program();
        };
        channel_module_system.prototype.navigate_to_mini_program = function (param) {
            if (!this.check_support_method(igc.e_method_type.navigate_to_mini_program)) {
                return false;
            }
            return this.facade_obj.navigate_to_mini_program(param);
        };
        channel_module_system._instances = undefined;
        return channel_module_system;
    }());
    igc.channel_module_system = channel_module_system;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_module_user = (function () {
        function channel_module_user() {
            this.facade_obj = undefined;
        }
        Object.defineProperty(channel_module_user, "instance", {
            get: function () {
                if (!channel_module_user._instances) {
                    channel_module_user._instances = new this();
                }
                return channel_module_user._instances;
            },
            enumerable: true,
            configurable: true
        });
        channel_module_user.prototype.init = function () {
            this.facade_obj = igc.channel_facade_manager.instance.init_facade(igc.e_facade_type.user);
            if (this.facade_obj) {
                this.facade_obj.init();
            }
        };
        channel_module_user.prototype.share = function (param) {
            if (!this.check_support_method(igc.e_method_type.share)) {
                return false;
            }
            return this.facade_obj.share(param);
        };
        channel_module_user.prototype.show_loading = function (param) {
            if (!this.check_support_method(igc.e_method_type.show_loading)) {
                return false;
            }
            return this.facade_obj.show_loading(param);
        };
        channel_module_user.prototype.show_toast = function (param) {
            if (!this.check_support_method(igc.e_method_type.show_toast)) {
                return false;
            }
            return this.facade_obj.show_toast(param);
        };
        channel_module_user.prototype.show_modal = function (param) {
            if (!this.check_support_method(igc.e_method_type.show_modal)) {
                return false;
            }
            return this.facade_obj.show_modal(param);
        };
        channel_module_user.prototype.on_show = function (param) {
            if (!this.check_support_method(igc.e_method_type.on_show)) {
                return false;
            }
            return this.facade_obj.on_show(param);
        };
        channel_module_user.prototype.on_hide = function (param) {
            if (!this.check_support_method(igc.e_method_type.on_hide)) {
                return false;
            }
            return this.facade_obj.on_hide(param);
        };
        channel_module_user.prototype.navigate_to_mini_program = function (param) {
            if (!this.check_support_method(igc.e_method_type.navigate_to_mini_program)) {
                return false;
            }
            return this.facade_obj.navigate_to_mini_program(param);
        };
        channel_module_user.prototype.get_launch_options_sync = function () {
            if (!this.check_support_method(igc.e_method_type.get_launch_options_sync)) {
                return false;
            }
            return this.facade_obj.get_launch_options_sync();
        };
        channel_module_user.prototype.show_more_game_modal = function () {
            if (!this.check_support_method(igc.e_method_type.show_more_game_modal)) {
                return false;
            }
            return this.facade_obj.show_more_game_modal();
        };
        channel_module_user.prototype.check_show_more_game = function (param) {
            if (!this.check_support_method(igc.e_method_type.check_show_more_game)) {
                return false;
            }
            return this.facade_obj.check_show_more_game(param);
        };
        channel_module_user.prototype.more_game_btn_tap = function () {
            if (!this.check_support_method(igc.e_method_type.more_game_btn_tap)) {
                return false;
            }
            return this.facade_obj.more_game_btn_tap();
        };
        channel_module_user.prototype.more_game_btn_show = function () {
            if (!this.check_support_method(igc.e_method_type.more_game_btn_show)) {
                return false;
            }
            return this.facade_obj.more_game_btn_show();
        };
        channel_module_user.prototype.more_game_btn_hide = function () {
            if (!this.check_support_method(igc.e_method_type.more_game_btn_hide)) {
                return false;
            }
            return this.facade_obj.more_game_btn_hide();
        };
        channel_module_user.prototype.get_invite_query = function () {
            if (!this.check_support_method(igc.e_method_type.get_invite_query)) {
                return false;
            }
            return this.facade_obj.get_invite_query();
        };
        channel_module_user.prototype.set_show_share_menu = function (param) {
            if (!this.check_support_method(igc.e_method_type.set_show_share_menu)) {
                return false;
            }
            return this.facade_obj.set_show_share_menu(param);
        };
        channel_module_user.prototype.get_system_info_sync = function (param) {
            if (!this.check_support_method(igc.e_method_type.get_system_info_sync)) {
                return false;
            }
            return this.facade_obj.get_system_info_sync(param);
        };
        channel_module_user.prototype.create_inner_audio_context = function (param) {
            if (!this.check_support_method(igc.e_method_type.create_inner_audio_context)) {
                return false;
            }
            return this.facade_obj.create_inner_audio_context(param);
        };
        channel_module_user.prototype.post_message = function (param) {
            if (!this.check_support_method(igc.e_method_type.post_message)) {
                return false;
            }
            return this.facade_obj.post_message(param);
        };
        channel_module_user.prototype.set_user_cloud_storage = function (param) {
            if (!this.check_support_method(igc.e_method_type.set_user_cloud_storage)) {
                return false;
            }
            return this.facade_obj.set_user_cloud_storage(param);
        };
        channel_module_user.prototype.get_setting = function (param) {
            if (!this.check_support_method(igc.e_method_type.get_setting)) {
                return false;
            }
            return this.facade_obj.get_setting(param);
        };
        channel_module_user.prototype.create_user_info_button = function (param) {
            if (!this.check_support_method(igc.e_method_type.create_user_info_button)) {
                return false;
            }
            return this.facade_obj.create_user_info_button(param);
        };
        channel_module_user.prototype.open_setting = function (param) {
            if (!this.check_support_method(igc.e_method_type.open_setting)) {
                return false;
            }
            return this.facade_obj.open_setting(param);
        };
        channel_module_user.prototype.authorize = function (param) {
            if (!this.check_support_method(igc.e_method_type.authorize)) {
                return false;
            }
            return this.facade_obj.authorize(param);
        };
        channel_module_user.prototype.get_device = function (param) {
            if (!this.check_support_method(igc.e_method_type.get_device)) {
                return false;
            }
            return this.facade_obj.get_device(param);
        };
        channel_module_user.prototype.check_support_method = function (method_type) {
            if (this.facade_obj == undefined) {
                return false;
            }
            var sdk_support = this.facade_obj.check_support_method(method_type);
            return sdk_support;
        };
        channel_module_user.prototype.login = function (login_param, callback) {
            if (!this.check_support_method(igc.e_method_type.login)) {
                if (callback) {
                    callback({ errorcode: igc.e_channel_code.support_error, errormsg: "", sdk_errorcode: -1, sdk_errormsg: "" });
                }
                return;
            }
            this.facade_obj.login(login_param, callback);
        };
        channel_module_user.prototype.device_shake = function (param) {
            if (!this.check_support_method(igc.e_method_type.device_shake)) {
                return false;
            }
            return this.facade_obj.device_shake(param);
        };
        channel_module_user.prototype.check_can_add_desktop = function (param) {
            if (!this.check_support_method(igc.e_method_type.check_can_add_desktop)) {
                return false;
            }
            return this.facade_obj.check_can_add_desktop(param);
        };
        channel_module_user.prototype.check_is_add_desktop = function (param) {
            if (!this.check_support_method(igc.e_method_type.check_is_add_desktop)) {
                return false;
            }
            return this.facade_obj.check_is_add_desktop(param);
        };
        channel_module_user.prototype.add_desktop = function (param) {
            if (!this.check_support_method(igc.e_method_type.add_desktop)) {
                return false;
            }
            return this.facade_obj.add_desktop(param);
        };
        channel_module_user._instances = undefined;
        return channel_module_user;
    }());
    igc.channel_module_user = channel_module_user;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_base = (function () {
        function ad_base() {
            this.ad_instance = null;
            this.ad_param = null;
            this.ad_status = igc.e_ad_status.none;
            this.ad_op = igc.e_ad_op.none;
        }
        ad_base.prototype.get_ad_type_name = function (ad_type) {
            switch (ad_type) {
                case igc.e_ad_type.interstitial:
                    return "interstitial";
                case igc.e_ad_type.video:
                    return "video";
                case igc.e_ad_type.native:
                    return "native";
                case igc.e_ad_type.banner:
                    return "banner";
                case igc.e_ad_type.splash:
                    return "splash";
                case igc.e_ad_type.app_box:
                    return "app_box";
                case igc.e_ad_type.feed:
                    return "feed";
                case igc.e_ad_type.full_screen_video:
                    return "full_screen_video";
            }
            return "";
        };
        ad_base.prototype.get_ad_event_name = function (ad_event) {
            switch (ad_event) {
                case igc.e_ad_event.visible:
                    return "visible";
                case igc.e_ad_event.click:
                    return "click";
                case igc.e_ad_event.req:
                    return "req";
                case igc.e_ad_event.show:
                    return "show";
                case igc.e_ad_event.click:
                    return "click";
                case igc.e_ad_event.hide:
                    return "hide";
                case igc.e_ad_event.onload:
                    return "onload";
                case igc.e_ad_event.onshow:
                    return "onshow";
                case igc.e_ad_event.onhide:
                    return "onhide";
                case igc.e_ad_event.onclose:
                    return "onclose";
                case igc.e_ad_event.onerror:
                    return "onerror";
            }
            return ad_event + "";
        };
        ad_base.prototype.release = function () {
            this.ad_instance = null;
            this.ad_param = null;
            this.ad_status = igc.e_ad_status.none;
            this.ad_op = igc.e_ad_op.none;
        };
        ad_base.prototype.create = function (param) {
        };
        ad_base.prototype.hide_ad = function (param) {
        };
        ad_base.prototype.show_ad = function (param) {
        };
        ad_base.prototype.set_ad_position = function (param) {
        };
        ad_base.prototype.destroy_ad = function (param) {
        };
        ad_base.prototype.report_ad_close = function (param) {
        };
        ad_base.prototype.report_ad_show = function (param) {
        };
        ad_base.prototype.report_ad_click = function (param) {
        };
        ad_base.prototype.check_param = function (param) {
            if (!this.ad_instance) {
                console.log("igc ad_type_name:" + this.get_ad_type_name(param.ad_type) + ",ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " ad_instance null");
            }
            if (!this.ad_param) {
                console.log("igc ad_type_name:" + this.get_ad_type_name(param.ad_type) + ",ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " ad_param null");
                return;
            }
            if (param.ad_id !== this.ad_param.ad_id) {
                console.log("igc ad_type_name:" + this.get_ad_type_name(param.ad_type) + ",ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " ad_param error");
            }
        };
        ad_base.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc ad_type_name:" + this.get_ad_type_name(param.ad_type) + ",ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " on_load");
            this.check_param(param);
            this.ad_status = igc.e_ad_status.load_success;
            var self = this;
            if (param.ad_type !== igc.e_ad_type.banner) {
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onload, "", "", param.ad_scene, "0", this.ad_op);
            }
            if (param && param.onLoad) {
                param.onLoad(param, res);
            }
        };
        ad_base.prototype.on_close = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc ad_type_name:" + this.get_ad_type_name(param.ad_type) + ",ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " on_close");
            this.check_param(param);
            this.ad_status = igc.e_ad_status.close;
        };
        ad_base.prototype.on_error = function (param, err) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc ad_type_name:" + this.get_ad_type_name(param.ad_type) + ",ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " on_error");
            this.check_param(param);
            if (param.onError) {
                param.onError(param, { error: err });
            }
        };
        ad_base.prototype.on_show = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc ad_type_name:" + this.get_ad_type_name(param.ad_type) + ",ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " on_show");
            this.check_param(param);
            this.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onshow, "", "", param.ad_scene, "0", this.ad_op);
            this.ad_status = igc.e_ad_status.show;
            if (param.onShow) {
                param.onShow(param);
            }
        };
        ad_base.prototype.on_hide = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc ad_type_name:" + this.get_ad_type_name(param.ad_type) + ",ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " on_hide");
            this.check_param(param);
            this.ad_status = igc.e_ad_status.load_success;
            this.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onhide, "", "", param.ad_scene, "0", this.ad_op);
            if (param.onHide) {
                param.onHide(param);
            }
        };
        ad_base.prototype.send_dot = function (ad_pos_id, ad_type, ad_event, extra, extra2, ad_scene, ad_package_id, ad_op) {
            console.log("igc send_dot-> ad_pos_id:" + ad_pos_id + ",ad_type_name:" + this.get_ad_type_name(ad_type) + ",ad_type:" + ad_type + ",ad_event:" + this.get_ad_event_name(ad_event) + ",extra:" + extra + ",extra2:" + extra2 + ",ad_scene:" + ad_scene + ",ad_package_id:" + ad_package_id + ",ad_op:" + ad_op);
        };
        return ad_base;
    }());
    igc.ad_base = ad_base;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_ad_hw_qg = (function (_super) {
        __extends(channel_ad_hw_qg, _super);
        function channel_ad_hw_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.can_ad = false;
            _this.can_video = false;
            _this.can_native = false;
            _this.ad_native_map = {};
            _this.platformVersionCode = 0;
            return _this;
        }
        channel_ad_hw_qg.prototype.init = function () {
            _super.prototype.init.call(this);
            var code = 0;
            window["hbs"] && window["hbs"].getSystemInfo({
                success: function (res) {
                    console.log("getSystemInfo success ");
                    code = res.version;
                    console.log("igc app qg code--->", code);
                },
                fail: function () {
                    console.log("getSystemInfo fail");
                },
                complete: function () {
                    console.log("getSystemInfo complete");
                }
            });
            this.can_ad = true;
            this.can_video = true;
            this.can_native = true;
            this.support_method[igc.e_method_type.create_ad] = this.can_ad;
            this.support_method[igc.e_method_type.show_ad] = this.can_ad;
            this.support_method[igc.e_method_type.hide_ad] = this.can_ad;
            this.support_method[igc.e_method_type.has_ad] = this.can_ad;
            this.support_method[igc.e_method_type.destroy_ad] = this.can_ad;
            this.support_method[igc.e_method_type.report_ad_show] = this.can_ad;
            this.support_method[igc.e_method_type.report_ad_click] = this.can_ad;
            this.support_method[igc.e_method_type.load_ad_just] = false;
            this.support_method[igc.e_method_type.show_ad_just] = false;
        };
        channel_ad_hw_qg.prototype.has_ad = function (param) {
            if (!this.can_ad) {
                return false;
            }
            if (param && param.ad_type === igc.e_ad_type.video) {
                return this.can_video;
            }
            else if (param && (param.ad_type === igc.e_ad_type.native)) {
                return this.can_native;
            }
            return true;
        };
        channel_ad_hw_qg.prototype.create_ad = function (param) {
            if (!this.can_ad) {
                return false;
            }
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (!this.has_ad(param)) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.video) {
                console.log("igc channel_ad_hw_qg:create_ad", "create_ad_video");
                return this.create_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                return this.create_ad_native(param);
            }
            else {
                return false;
            }
        };
        channel_ad_hw_qg.prototype.create_ad_video = function (param) {
            if (!this.can_video) {
                return false;
            }
            console.log("igc ----- create hw_ad_video");
            if (this.ad_video) {
                this.ad_video.create(param);
            }
            else {
                this.ad_video = new igc.ad_video_hw_qg();
                this.ad_video.create(param);
            }
            return true;
        };
        channel_ad_hw_qg.prototype.create_ad_native = function (param) {
            if (!this.can_native) {
                return false;
            }
            console.log("igc ----- create hw_ad_native");
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].update_show(param);
            }
            else {
                this.ad_native_map[param.ad_id] = new igc.ad_native_hw_qg();
                this.ad_native_map[param.ad_id].create(param);
            }
        };
        channel_ad_hw_qg.prototype.show_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.banner) {
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                this.show_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                this.show_ad_native(param);
            }
            else {
                return false;
            }
            return true;
        };
        channel_ad_hw_qg.prototype.show_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_hw_qg.prototype.show_ad_native = function (param) {
            var self = this;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_hw_qg.prototype.hide_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.video) {
                return this.hide_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                return this.hide_ad_native(param);
            }
            else {
                return false;
            }
        };
        channel_ad_hw_qg.prototype.hide_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_hw_qg.prototype.hide_ad_native = function (param) {
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_hw_qg.prototype.destroy_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.video) {
                return this.destroy_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                return this.destroy_ad_native(param);
            }
            else {
                return false;
            }
        };
        channel_ad_hw_qg.prototype.destroy_ad_video = function (param) {
            if (this.ad_video) {
                this.ad_video.destroy_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_hw_qg.prototype.destroy_ad_native = function (param) {
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].destroy_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_hw_qg.prototype.report_ad_show = function (param) {
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].report_ad_show(param);
                return true;
            }
            return false;
        };
        channel_ad_hw_qg.prototype.report_ad_click = function (param) {
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].report_ad_click(param);
                return true;
            }
            return false;
        };
        channel_ad_hw_qg.prototype.report_ad_close = function (param) {
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].report_ad_close(param);
                return true;
            }
            return false;
        };
        return channel_ad_hw_qg;
    }(igc.channel_facade_ad_base));
    igc.channel_ad_hw_qg = channel_ad_hw_qg;
    window["channel_ad_hw_qg"] = channel_ad_hw_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_system_hw_qg = (function (_super) {
        __extends(channel_system_hw_qg, _super);
        function channel_system_hw_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_system_hw_qg.prototype.init = function () {
            _super.prototype.init.call(this);
            this.register_listener();
            this.support_method[igc.e_method_type.get_system_info_sync] = false;
            this.support_method[igc.e_method_type.exit_mini_program] = true;
            this.support_method[igc.e_method_type.on_show] = true;
            this.support_method[igc.e_method_type.on_hide] = true;
        };
        channel_system_hw_qg.prototype.register_listener = function () {
        };
        channel_system_hw_qg.prototype.get_system_info_sync = function () {
        };
        channel_system_hw_qg.prototype.exit_mini_program = function () {
            return window["hbs"].exitApplication({
                success: function () {
                    console.log("exitApplication success");
                },
                fail: function () {
                    console.log("exitApplication fail");
                },
                complete: function () {
                    console.log("exitApplication complete");
                }
            });
        };
        channel_system_hw_qg.prototype.on_show = function (param) {
            return window["hbs"].onShow(function (res) {
                param.on_show && param.on_show(res);
            });
        };
        channel_system_hw_qg.prototype.on_hide = function (param) {
            return window["hbs"].onHide(function (res) {
                param.on_hide && param.on_hide(res);
            });
        };
        return channel_system_hw_qg;
    }(igc.channel_facade_share_base));
    igc.channel_system_hw_qg = channel_system_hw_qg;
    window["channel_system_hw_qg"] = channel_system_hw_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_user_hw_qg = (function (_super) {
        __extends(channel_user_hw_qg, _super);
        function channel_user_hw_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.token = null;
            _this.deviceId = null;
            _this.callback = null;
            _this.needAuth = true;
            _this.is_old = false;
            _this.playId = null;
            return _this;
        }
        channel_user_hw_qg.prototype.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            this.support_method[igc.e_method_type.login] = true;
            this.support_method[igc.e_method_type.get_user_info] = true;
            this.support_method[igc.e_method_type.device_shake] = true;
            this.support_method[igc.e_method_type.check_can_add_desktop] = false;
            this.support_method[igc.e_method_type.check_is_add_desktop] = true;
            this.support_method[igc.e_method_type.add_desktop] = true;
            window["hbs"] && window["hbs"].getSystemInfo({
                success: function (res) {
                    console.log("getSystemInfo success res = " + res);
                    igc.stat_manager.instance._osInfo = res.model || "";
                    igc.stat_manager.instance._opInfo = res.platform;
                    console.log("mijia -- huawei手机型号", igc.stat_manager.instance._osInfo);
                },
                fail: function () {
                    console.log("getSystemInfo fail");
                },
                complete: function () {
                    console.log("getSystemInfo complete");
                }
            });
        };
        channel_user_hw_qg.prototype.login = function (login_param, callback) {
            console.log("mijia -- huawei run login()");
            var self = this;
            if (igc.igc_main.instance.app_config.game_param.needAuth == false) {
                this.needAuth = false;
            }
            console.log("该游戏是否需要授权", this.needAuth);
            this.callback = callback;
            window["hbs"].gameLogin({
                forceLogin: 0,
                appid: igc.channel_config.config["game_param"]["channel_app_id"],
                success: function (res) {
                    self.playId = res.playerId;
                    console.log("igc ----- only playId is " + self.playId);
                    console.log("game login: success");
                },
                fail: function (data, code) {
                    console.log("on gameLogin fail: " + data + "," + code);
                },
                complete: function () {
                    console.log("on gameLogin: complete");
                }
            });
            this.token = localStorage.getItem("hwToken");
            if (this.token != null && this.token != "") {
                this.is_old = true;
                localStorage.setItem("is_old", "is_old");
            }
            if (localStorage.getItem("is_old") == "is_old") {
                this.is_old = true;
            }
            console.log("appId is " + igc.channel_config.config["game_param"]["channel_app_id"]);
            self.initHW();
        };
        channel_user_hw_qg.prototype.initHW = function () {
            console.log("mijia -- channel_user_hw local_save_token = ", this.token);
            if (this.token != null && this.token != "") {
                this.initHWInfo(this.token);
            }
            else {
                this.initHWByAuth();
            }
        };
        channel_user_hw_qg.prototype.initHWByAuth = function () {
            var self = this;
            console.log("hw_qg sdk channel_user_hw_qg initHWByAuth Run ", this.needAuth);
            if (this.needAuth || this.is_old) {
                window["hbs"] && window["hbs"].authorize({
                    scope: 'userInfo',
                    params: {
                        appid: igc.channel_config.config["game_param"]["channel_app_id"] + "",
                        type: "token",
                        scope: "scope.baseProfile"
                    },
                    success: function (res) {
                        var data = JSON.parse(res[1]);
                        console.log("mijia channel_user_hw_qg hbs.authorize success", data.accessToken);
                        self.token = data.accessToken;
                        localStorage.setItem("hwToken", data.accessToken);
                        self.initHWInfo(data.accessToken);
                    },
                    fail: function () {
                        console.log("mijia channel_user_hw_qg hbs.authorize fali");
                        self.token = "";
                        localStorage.setItem("hwToken", "");
                        var hwInfo = { userId: self.deviceId, avatar: "", userName: self.deviceId, hasAuth: false };
                        self.on_login_result(igc.e_channel_code.login_success, hwInfo, self.callback);
                    }
                });
            }
            else {
            }
        };
        channel_user_hw_qg.prototype.initHWInfo = function (token) {
            console.log("vivoqgsdk channel_user_hw_qg initHWInfo Run ");
            var self = this;
            var callback = this.callback || function () { };
            window["hbs"] && window["hbs"].getUserInfo({
                appid: igc.channel_config.config["game_param"]["channel_app_id"],
                token: token,
                success: function (data) {
                    console.log("mijia channel_user_hw_qg getProfile success", data.openid, data.nickname);
                    data.hasAuth = true;
                    self.on_login_result(igc.e_channel_code.login_success, data, callback);
                },
                fail: function (data) {
                    console.log("mijia channel_user_hw_qg getProfile fail");
                    self.token = "";
                    localStorage.setItem("hwToken", "");
                    self.initHW();
                }
            });
        };
        channel_user_hw_qg.prototype.on_login_result = function (retcode, param, callback) {
            var self = this;
            if (retcode == igc.e_channel_code.login_success) {
                var user_info = this.config_channel_user_info(param, function (param) {
                    var user_info = {};
                    if (param.hasAuth) {
                        user_info = {
                            uid: param.openid,
                            token: self.token,
                            nickName: param.nickname,
                            avatar: param.avatar,
                            sex: "",
                            birthday: "",
                            phoneNum: "",
                            location: "",
                            hasAuth: true,
                            extra: ""
                        };
                    }
                    else {
                        user_info = {
                            uid: self.deviceId,
                            token: self.deviceId,
                            nickName: param.userName,
                            avatar: "",
                            sex: "",
                            birthday: "",
                            phoneNum: "",
                            location: "",
                            hasAuth: false,
                            extra: ""
                        };
                    }
                    return user_info;
                });
                callback({ errorcode: igc.e_channel_code.login_success, errormsg: "success", sdk_errorcode: 0, sdk_errormsg: "", channel_user_info: user_info });
            }
            else {
                callback({ errorcode: igc.e_channel_code.login_fail, errormsg: "fail", sdk_errorcode: -1, sdk_errormsg: JSON.stringify(param), channel_user_info: {} });
            }
        };
        channel_user_hw_qg.prototype.get_tourise_info = function () {
            var name = localStorage.getItem("hw_username");
            if (!name) {
                name = this.get_random_name();
                localStorage.setItem("hw_username", name);
            }
            var result = {
                "userId": name,
                "userName": name,
                "avatar": ""
            };
            return result;
        };
        channel_user_hw_qg.prototype.device_shake = function (param) {
            window["hbs"] && window["hbs"].vibrateShort({
                success: function () {
                    console.log("vibrateShort success");
                },
                fail: function () {
                    console.log("vibrateShort fail");
                },
                complete: function () {
                    console.log("vibrateShort complete");
                    param.on_complete && param.on_complete();
                }
            });
        };
        channel_user_hw_qg.prototype.check_is_add_desktop = function (param) {
            window["hbs"].hasInstalled({
                success: function (res) {
                    if (res == false) {
                        param.can_add && param.can_add();
                    }
                    else {
                        param.has_add && param.has_add();
                    }
                },
                fail: function (err) { "hasInstalled fail: " + err; },
                complete: function () { console.log("hasInstalled complete"); }
            });
        };
        channel_user_hw_qg.prototype.add_desktop = function (param) {
            console.log("igc add_desktop begin-------------------");
            window["hbs"].hasInstalled({
                success: function (res) {
                    console.log("igc add_desktop hasShortcutInstalled success-------------------");
                    if (res == false) {
                        console.log("igc add_desktop hasShortcutInstalled success res false-------------------");
                        param.can_create && param.can_create();
                        window["hbs"].install({
                            success: function () {
                                console.log("igc add_desktop installShortcut success-------------------");
                                param.on_success && param.on_success();
                            },
                            fail: function (erromsg, errocode) {
                                console.log("igc add_desktop installShortcut fail:" + JSON.stringify(erromsg) + ", errocode: " + errocode);
                                param.on_failed_back && param.on_failed_back();
                            },
                            complete: function () {
                                console.log("igc add_desktop installShortcut complete-------------------");
                            }
                        });
                    }
                    else {
                        console.log("igc add_desktop installShortcut has-------------------");
                        console.log("mijia 图标已创建");
                        param.has_create && param.has_create();
                    }
                },
                fail: function (err) {
                    console.log("igc add_desktop hasShortcutInstalled fail:" + JSON.stringify(err));
                },
                complete: function () {
                    console.log("igc add_desktop hasShortcutInstalled complete-------------------");
                }
            });
        };
        return channel_user_hw_qg;
    }(igc.channel_facade_user_base));
    igc.channel_user_hw_qg = channel_user_hw_qg;
    window["channel_user_hw_qg"] = channel_user_hw_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_native_hw_qg = (function (_super) {
        __extends(ad_native_hw_qg, _super);
        function ad_native_hw_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ad_native_hw_qg.prototype.release = function () {
        };
        ad_native_hw_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            if (!this.ad_instance) {
                self.ad_op = igc.e_ad_op.create;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
                this.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", this.ad_op);
                this.ad_instance = window["hbs"].createNativeAd({
                    adUnitId: param.ad_id,
                    success: function (code) {
                        console.log("loadNativeAd loadNativeAd : success");
                    },
                    fail: function (data, code) {
                        console.log("loadNativeAd loadNativeAd fail: " + data + "," + code);
                    },
                    complete: function () {
                        console.log("loadNativeAd loadNativeAd : complete");
                        self.ad_instance.onLoad(function (data) {
                            self.on_load(param, data);
                        });
                        self.ad_instance.onError(function (e) {
                            self.on_error(param, e);
                        });
                        self.ad_op = igc.e_ad_op.load;
                        self.ad_instance.load();
                    }
                });
            }
        };
        ad_native_hw_qg.prototype.update_show = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            if (!this.ad_instance) {
                console.log("igc native ad_type ad_native_hw_qg update_show this.ad_instance is null");
                return;
            }
            console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " update_show");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            self.ad_op = igc.e_ad_op.load;
            var adLoad = this.ad_instance.load();
            adLoad && adLoad.then(function () {
                console.log("igc native update_show load_ad succ result");
            }).catch(function (err) {
                console.log("igc native update_show load_ad err result");
                self.on_error(param, err);
            });
        };
        ad_native_hw_qg.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            self.check_param(param);
            this.ad_instance && this.ad_instance.offLoad && this.ad_instance.offLoad();
            if (res && res.adList) {
                console.log("igc native on_load length:", res.adList.length, JSON.stringify(res.adList));
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onload, res.adList.length, "", self.ad_param.ad_scene, "0", self.ad_op);
                var ad_data_list = [];
                for (var i = 0; i < res.adList.length; i++) {
                    var adData = {
                        adUnitId: res.adList[i].adId,
                        title: res.adList[i].title,
                        desc: res.adList[i].clickBtnTxt,
                        iconUrlList: res.adList[i].iconUrlList,
                        icon: res.adList[i].icon,
                        imgUrlList: res.adList[i].imgUrlList,
                        logoUrl: res.adList[i].logoUrl,
                        videoUrlList: res.adList[i].videoUrlList,
                        clickBtnTxt: res.adList[i].clickBtnTxt,
                        creativeType: res.adList[i].creativeType,
                        interactionType: res.adList[i].interactionType
                    };
                    ad_data_list.push(adData);
                }
                if (self.ad_param && self.ad_param.onLoad) {
                    console.log("igc native self.ad_param.onLoad(ad_data_list,self.ad_param)");
                    self.ad_param.onLoad(self.ad_param, ad_data_list);
                }
                else {
                    console.log("igc native dont self.ad_param && self.ad_param.onLoad");
                }
            }
            else {
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onload, "0", "", self.ad_param.ad_scene, "0", self.ad_op);
                self.ad_param.onLoad(self.ad_param, []);
                this.ad_status = igc.e_ad_status.none;
                this.release();
                console.log("igc native on_load fail");
                return;
            }
        };
        ad_native_hw_qg.prototype.on_error = function (param, err) {
            console.log("igc native on_error res.code = ", err.code);
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            var errMsg = "";
            console.log("igc ---- native error " + JSON.stringify(err));
            if (err.errMsg) {
                errMsg = err.errMsg;
            }
            else {
                if (err.data) {
                    errMsg = JSON.stringify(err.data);
                }
            }
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.code, errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            this.release();
        };
        ad_native_hw_qg.prototype.report_ad_close = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + ",ad_unit_id:" + param.ad_unit_id + " report_ad_close");
            console.log("igc native report_ad_close ");
            _super.prototype.check_param.call(this, param);
            var self = this;
            self.ad_op = igc.e_ad_op.close;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onclose, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_status = igc.e_ad_status.close;
            this.release();
        };
        ad_native_hw_qg.prototype.report_ad_show = function (param) {
            console.log("igc native report_ad_show ");
            _super.prototype.check_param.call(this, param);
            var self = this;
            if (!self.ad_instance) {
                console.log("igc native report_ad_click !self.ad_instance");
            }
            if (!param) {
                console.log("igc native report_ad_click igc !param");
            }
            if (param && !param.ad_unit_id) {
                console.log("igc native report_ad_click igc !param.ad_unit_id");
            }
            if (self.ad_instance && param && param.ad_unit_id !== undefined) {
                self.ad_instance.reportAdShow({
                    adId: param.ad_unit_id
                });
                if (param.ad_pos_id && param.ad_type && param.ad_scene && param.sub_ad_type) {
                    self.ad_op = igc.e_ad_op.show;
                    self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onshow, "", "", param.ad_scene, "0", self.ad_op);
                    if (param.ad_id) {
                        console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + ",ad_unit_id:" + param.ad_unit_id + " report_ad_show");
                    }
                }
                return true;
            }
            return false;
        };
        ad_native_hw_qg.prototype.report_ad_click = function (param) {
            console.log("igc native report_ad_click ");
            _super.prototype.check_param.call(this, param);
            var self = this;
            if (!self.ad_instance) {
                console.log("igc native report_ad_click !self.ad_instance");
            }
            if (!param) {
                console.log("igc native report_ad_click igc !param");
            }
            if (param && !param.ad_unit_id) {
                console.log("igc native report_ad_click igc !param.ad_unit_id");
            }
            if (self.ad_instance && param && param.ad_unit_id !== undefined) {
                console.log("igc native do reportAdClick: ad_unit_id:" + param.ad_unit_id);
                self.ad_instance.reportAdClick({
                    adId: param.ad_unit_id
                });
                if (param.ad_pos_id && param.ad_type && param.ad_scene && param.sub_ad_type) {
                    self.ad_op = igc.e_ad_op.click;
                    self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onclick, "", "", param.ad_scene, "0", self.ad_op);
                    if (param.ad_id) {
                        console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + ",ad_unit_id:" + param.ad_unit_id + " report_ad_click");
                    }
                }
                return true;
            }
            console.log("igc native do reportAdClick: error");
            return false;
        };
        return ad_native_hw_qg;
    }(igc.ad_base));
    igc.ad_native_hw_qg = ad_native_hw_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_video_hw_qg = (function (_super) {
        __extends(ad_video_hw_qg, _super);
        function ad_video_hw_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.has_load_tag = false;
            _this.video_tag = false;
            return _this;
        }
        ad_video_hw_qg.prototype.release = function () {
            this.ad_param && console.log("igc video ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
        };
        ad_video_hw_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc video ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            this.has_load_tag = false;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            var extra = param.extra || "";
            igc.stat_manager.instance.send_user_event(param.ad_pos_id + "", igc.igc_stat_ids.video_click, "", "", extra, "", "", "", "");
            this.ad_instance = window["hbs"].createRewardedVideoAd({
                adUnitId: param.ad_id,
                success: function (code) {
                    console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd: success");
                },
                fail: function (data, code) {
                    console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd fail: " + data + "," + code);
                },
                complete: function () {
                    console.log("ad demo : loadAndShowVideoAd createRewardedVideoAd complete");
                    self.ad_instance.offError(function (err) {
                    });
                    self.ad_instance.offClose(function (res) {
                        self.on_close(param, res);
                    });
                    self.ad_instance.offLoad(function () {
                        self.on_load(param, {});
                    });
                    self.ad_instance.onError(function (err) {
                        if (!param.need_show_delay) {
                            console.log("igc ---- video need show error");
                            self.on_error(param, err);
                        }
                    });
                    self.ad_instance.onClose(function (res) {
                        self.on_close(param, res);
                    });
                    self.ad_instance.onLoad(function () {
                        self.on_load(param, {});
                    });
                    self.ad_op = igc.e_ad_op.load;
                    self.ad_instance.load();
                }
            });
            if (!this.ad_instance) {
                this.ad_instance = null;
                this.release();
                console.log("igc create native fail");
                return;
            }
        };
        ad_video_hw_qg.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            self.check_param(param);
            this.has_load_tag = true;
        };
        ad_video_hw_qg.prototype.on_error = function (param, err) {
            console.log("igc video on_err res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            if (err && err.errCode && (err.errCode == -3 || err.errCode == -4)) {
            }
            else {
            }
        };
        ad_video_hw_qg.prototype.on_close = function (param, res) {
            console.log("igc video on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_close.call(this, param, res);
            if (res && res.isEnded) {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: res.isEnded });
                }
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.complete, "", self.ad_param.ad_scene, "0", self.ad_op);
            }
            else {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: false });
                }
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.uncomplete, "", self.ad_param.ad_scene, "0", self.ad_op);
            }
            this.create({
                ad_type: param.ad_type,
                ad_id: param.ad_id,
                ad_pos_id: param.ad_pos_id,
                ad_event: param.ad_id,
                ad_scene: param.ad_id,
                sub_ad_type: param.sub_ad_type || igc.e_ad_native_type.native_banner_normal,
                onLoad: param.onLoad,
                onShow: param.onShow,
                onClose: param.onClose,
                onError: param.onError,
                extra: param.extra
            });
        };
        ad_video_hw_qg.prototype.show_ad = function (param) {
            var _this = this;
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                console.log("mijia -- jj1");
                return;
            }
            console.log("mijia -- jj2");
            if (!this.video_tag) {
                this.video_tag = true;
                this.show_ad_id && clearTimeout(this.show_ad_id);
                this.show_ad_id = setTimeout(function () {
                    _this.video_tag = false;
                }, 2000);
            }
            else {
                console.log("igc ----- do not click video so fast ");
                this.on_error(param, { errMsg: "igc---- video ad load fail to show" });
                return;
            }
            if (!this.has_load_tag) {
                this.on_error(param, { errMsg: "igc---- video ad load fail to show" });
                this.create({
                    ad_type: param.ad_type,
                    ad_id: param.ad_id,
                    ad_pos_id: param.ad_pos_id,
                    ad_event: param.ad_id,
                    ad_scene: param.ad_id,
                    sub_ad_type: param.sub_ad_type || igc.e_ad_native_type.native_banner_normal,
                    onLoad: param.onLoad,
                    onShow: param.onShow,
                    onClose: param.onClose,
                    onError: param.onError,
                    extra: param.extra,
                    need_show_delay: true
                });
            }
            else {
                console.log("igc ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
                var self = this;
                if (param.ad_id === self.ad_param.ad_id) {
                    try {
                        this.ad_param = param;
                        self.ad_op = igc.e_ad_op.show;
                        var extra = param.extra || "";
                        igc.stat_manager.instance.send_user_event(param.ad_pos_id + "", igc.igc_stat_ids.video_click, "", "", extra, "", "", "", "");
                        self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.show, "", "", param.ad_scene, "0", self.ad_op);
                        this.ad_instance.offError();
                        this.ad_instance.offClose();
                        this.ad_instance.onError(function (err) {
                            console.log("" + err);
                            console.log("igc video show err cache err:" + ("" + err));
                            self.on_error(param, err);
                        });
                        this.ad_instance.onClose(function (res) {
                            self.on_close(param, res);
                        });
                        this.ad_instance.show && this.ad_instance.show();
                    }
                    catch (err) {
                        self.on_error(param, err);
                        console.log("" + err);
                        console.log("igc video update_show load err cache err:" + ("" + err));
                    }
                    console.log("igc banner show_ad ad_status: ", this.ad_status);
                }
                else {
                    self.on_error(param, {});
                }
            }
        };
        return ad_video_hw_qg;
    }(igc.ad_base));
    igc.ad_video_hw_qg = ad_video_hw_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_ad_oppo_qg = (function (_super) {
        __extends(channel_ad_oppo_qg, _super);
        function channel_ad_oppo_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.can_ad = false;
            _this.can_interstitial = false;
            _this.can_multualpush_box = false;
            _this.ad_native_map = {};
            _this.platformVersionCode = 0;
            return _this;
        }
        channel_ad_oppo_qg.prototype.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            var code = window["qg"] && window["qg"].getSystemInfoSync().platformVersion;
            if (code >= 1060) {
            }
            this.platformVersionCode = code;
            console.log("igc platformVersion:" + code);
            this.can_ad = code >= 1051;
            this.can_interstitial = code >= 1061;
            this.can_multualpush_box = code >= 1076;
            self.support_method[igc.e_method_type.create_ad] = this.can_ad;
            self.support_method[igc.e_method_type.destroy_ad] = this.can_ad;
            self.support_method[igc.e_method_type.show_ad] = this.can_ad;
            self.support_method[igc.e_method_type.hide_ad] = this.can_ad;
            self.support_method[igc.e_method_type.has_ad] = this.can_ad;
            self.support_method[igc.e_method_type.report_ad_show] = this.can_ad;
            self.support_method[igc.e_method_type.report_ad_click] = this.can_ad;
            this.support_method[igc.e_method_type.report_ad_close] = this.can_ad;
            self.support_method[igc.e_method_type.load_ad_just] = false;
            self.support_method[igc.e_method_type.show_ad_just] = false;
        };
        channel_ad_oppo_qg.prototype.has_ad = function (param) {
            return this.can_ad;
        };
        channel_ad_oppo_qg.prototype.create_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (!this.has_ad(param)) {
                return false;
            }
            param.platformVersionCode = this.platformVersionCode;
            if (param.ad_type == igc.e_ad_type.banner) {
                console.log("channel_ad_oppo_qg:create_ad", "create_ad_banner");
                return this.create_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                console.log("channel_ad_oppo_qg:create_ad", "create_ad_video");
                return this.create_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                console.log("channel_ad_oppo_qg:create_ad", "create_ad_interstitial");
                return this.create_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                console.log("channel_ad_oppo_qg:create_ad", "create_ad_native");
                return this.create_ad_native(param);
            }
            else if (param.ad_type == igc.e_ad_type.app_box) {
                console.log("channel_ad_oppo_qg:create_ad", "create_ad_app_box");
                return this.create_ad_app_box(param);
            }
            else {
                return false;
            }
        };
        channel_ad_oppo_qg.prototype.create_ad_banner = function (param) {
            this.ad_banner = new igc.ad_banner_oppo_qg();
            this.ad_banner.create(param);
            return true;
        };
        channel_ad_oppo_qg.prototype.create_ad_video = function (param) {
            if (this.ad_video) {
                this.ad_video.release();
                this.ad_video = null;
            }
            this.ad_video = new igc.ad_video_oppo_qg();
            this.ad_video.create(param);
            return true;
        };
        channel_ad_oppo_qg.prototype.create_ad_interstitial = function (param) {
            if (this.ad_interstitial) {
                this.ad_interstitial.release();
                this.ad_interstitial = null;
            }
            this.ad_interstitial = new igc.ad_interstitial_oppo_qg();
            this.ad_interstitial.create(param);
            return true;
        };
        channel_ad_oppo_qg.prototype.create_ad_native = function (param) {
            var self = this;
            if (param && param.sub_ad_type && param.sub_ad_type === igc.e_ad_native_type.native_inter) {
            }
            this.ad_native_map[param.ad_id] = new igc.ad_native_oppo_qg();
            this.ad_native_map[param.ad_id].create(param);
        };
        channel_ad_oppo_qg.prototype.create_ad_app_box = function (param) {
            if (!this.can_multualpush_box) {
                console.log("igc 快应用版本不支持互推盒子");
                return false;
            }
            if (param.sub_ad_type == igc.e_ad_app_box_type.banner_box) {
                this.ad_bannerbox = new igc.ad_bannerbox_oppo_qg();
                this.ad_bannerbox.create(param);
            }
            else if (param.sub_ad_type == igc.e_ad_app_box_type.portal_box) {
                this.ad_portalbox = new igc.ad_portalbox_oppo_qg();
                this.ad_portalbox.create(param);
            }
            return true;
        };
        channel_ad_oppo_qg.prototype.show_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            param.platformVersionCode = this.platformVersionCode;
            if (param.ad_type == igc.e_ad_type.banner) {
                this.show_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                this.show_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                this.show_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                this.show_ad_native(param);
            }
            else if (param.ad_type == igc.e_ad_type.app_box) {
                return this.show_ad_app_box(param);
            }
            else {
                return false;
            }
            return true;
        };
        channel_ad_oppo_qg.prototype.show_ad_banner = function (param) {
            if (this.ad_banner) {
                this.ad_banner.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.show_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.show_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.show_ad_native = function (param) {
            var self = this;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.show_ad_app_box = function (param) {
            if (param.sub_ad_type == igc.e_ad_app_box_type.portal_box) {
                if (!this.ad_portalbox) {
                    this.ad_portalbox = new igc.ad_portalbox_oppo_qg();
                }
                this.ad_portalbox.show_ad(param);
            }
            return true;
        };
        channel_ad_oppo_qg.prototype.hide_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            param.platformVersionCode = this.platformVersionCode;
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.hide_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.hide_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.hide_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                return this.hide_ad_native(param);
            }
            else if (param.ad_type == igc.e_ad_type.app_box) {
                return this.hide_ad_app_box(param);
            }
            else {
                return false;
            }
        };
        channel_ad_oppo_qg.prototype.hide_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.hide_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.hide_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.hide_ad_native = function (param) {
            var self = this;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.hide_ad_app_box = function (param) {
            return true;
        };
        channel_ad_oppo_qg.prototype.destroy_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            param.platformVersionCode = this.platformVersionCode;
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.destroy_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.destroy_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.destroy_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.destroy_ad_native(param);
            }
            else if (param.ad_type == igc.e_ad_type.app_box) {
                return this.destroy_ad_app_box(param);
            }
            else {
                return false;
            }
        };
        channel_ad_oppo_qg.prototype.destroy_ad_banner = function (param) {
            if (this.ad_banner) {
                this.ad_banner.destroy_ad(param);
                this.ad_banner = null;
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.destroy_ad_video = function (param) {
            if (this.ad_video) {
                this.ad_video.destroy_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.destroy_ad_interstitial = function (param) {
            if (this.ad_interstitial) {
                this.ad_interstitial.destroy_ad(param);
                this.ad_banner = null;
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.destroy_ad_native = function (param) {
            var self = this;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].destroy_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.destroy_ad_app_box = function (param) {
            if (param.sub_ad_type == igc.e_ad_app_box_type.banner_box) {
                if (this.ad_bannerbox) {
                    this.ad_bannerbox.destroy_ad(param);
                }
            }
            else if (param.sub_ad_type == igc.e_ad_app_box_type.portal_box) {
                if (this.ad_portalbox) {
                    this.ad_portalbox.destroy_ad(param);
                }
            }
        };
        channel_ad_oppo_qg.prototype.report_ad_show = function (param) {
            var self = this;
            param.platformVersionCode = this.platformVersionCode;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].report_ad_show(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.report_ad_click = function (param) {
            var self = this;
            param.platformVersionCode = this.platformVersionCode;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].report_ad_click(param);
                return true;
            }
            return false;
        };
        channel_ad_oppo_qg.prototype.report_ad_close = function (param) {
            var self = this;
            param.platformVersionCode = this.platformVersionCode;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].report_ad_close(param);
                return true;
            }
            return false;
        };
        return channel_ad_oppo_qg;
    }(igc.channel_facade_ad_base));
    igc.channel_ad_oppo_qg = channel_ad_oppo_qg;
    window["channel_ad_oppo_qg"] = channel_ad_oppo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_system_oppo_qg = (function (_super) {
        __extends(channel_system_oppo_qg, _super);
        function channel_system_oppo_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_system_oppo_qg.prototype.init = function () {
            _super.prototype.init.call(this);
            this.register_listener();
            this.support_method[igc.e_method_type.get_system_info_sync] = true;
            this.support_method[igc.e_method_type.get_launch_options_sync] = true;
            this.support_method[igc.e_method_type.exit_mini_program] = true;
            this.support_method[igc.e_method_type.navigate_to_mini_program] = true;
            this.support_method[igc.e_method_type.on_show] = true;
            this.support_method[igc.e_method_type.on_hide] = true;
        };
        channel_system_oppo_qg.prototype.register_listener = function () {
        };
        channel_system_oppo_qg.prototype.get_system_info_sync = function () {
            var system_info = window["qg"].getSystemInfoSync();
            var info = {
                brand: system_info.brand,
                model: system_info.model,
                pixelRatio: system_info.pixelRatio,
                screenWidth: system_info.screenWidth,
                screenHeight: system_info.screenHeight,
                windowWidth: system_info.windowWidth,
                windowHeight: system_info.windowHeight,
                statusBarHeight: system_info.statusBarHeight,
                language: system_info.language,
                version: system_info.COREVersion,
                platform: system_info.platform,
                system: system_info.system,
                platformVersion: system_info.platformVersion,
                extra: system_info
            };
            return info;
        };
        channel_system_oppo_qg.prototype.get_launch_options_sync = function () {
            var launch_options = window["qg"].getLaunchOptionsSync();
            var info = {
                query: launch_options.query,
                referrerInfo: launch_options.referrerInfo,
            };
            return info;
        };
        channel_system_oppo_qg.prototype.exit_mini_program = function () {
            return window["qg"].exitApplication();
        };
        channel_system_oppo_qg.prototype.on_show = function (param) {
            return window["qg"].onShow(function (res) {
                param.on_show && param.on_show(res);
            });
        };
        channel_system_oppo_qg.prototype.on_hide = function (param) {
            return window["qg"].onHide(function (res) {
                param.on_hide && param.on_hide(res);
            });
        };
        channel_system_oppo_qg.prototype.navigate_to_mini_program = function (param) {
            return window["qg"].navigateToMiniGame({
                pkgName: param.app_id,
                extraData: {
                    userId: param.userId || "",
                    pushView: param.eventId || "1",
                    syyxAppId: param.syyxAppId || "1",
                },
                success: param.on_succeed
            });
        };
        return channel_system_oppo_qg;
    }(igc.channel_facade_share_base));
    igc.channel_system_oppo_qg = channel_system_oppo_qg;
    window["channel_system_oppo_qg"] = channel_system_oppo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_user_oppo_qg = (function (_super) {
        __extends(channel_user_oppo_qg, _super);
        function channel_user_oppo_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.platformVersion = 0;
            return _this;
        }
        channel_user_oppo_qg.prototype.init = function () {
            _super.prototype.init.call(this);
            this.support_method[igc.e_method_type.login] = true;
            this.support_method[igc.e_method_type.on_show] = true;
            this.support_method[igc.e_method_type.on_hide] = true;
            this.support_method[igc.e_method_type.navigate_to_mini_program] = true;
            this.support_method[igc.e_method_type.device_shake] = true;
            this.support_method[igc.e_method_type.check_can_add_desktop] = true;
            this.support_method[igc.e_method_type.check_is_add_desktop] = true;
            this.support_method[igc.e_method_type.add_desktop] = true;
            console.log("igc 开始请求oppo手机型号");
            var self = this;
            window["qg"] && window["qg"].getSystemInfo({
                success: function (res) {
                    console.log("手机型号和平台号", res.model, res.platformVersion);
                    igc.stat_manager.instance._osInfo = res.model || "";
                    self.platformVersion = res.platformVersion;
                    igc.stat_manager.instance._opInfo = res.platformVersion + "";
                },
                fail: function (err) { },
            });
        };
        channel_user_oppo_qg.prototype.login = function (login_param, callback) {
            var self = this;
            var pkg_name = "";
            if (igc.channel_config.config["game_param"] && igc.channel_config.config["game_param"]["pkg_name"]) {
                pkg_name = igc.channel_config.config["game_param"]["pkg_name"];
            }
            else {
                callback({ errorcode: igc.e_channel_code.param_error, errormsg: "fail", sdk_errorcode: -1, sdk_errormsg: "error", channel_user_info: {} });
                return;
            }
            window["qg"] && window["qg"].login({
                pkgName: pkg_name,
                success: function (response) {
                    self.on_login_result(igc.e_channel_code.login_success, response, callback);
                },
                fail: function (response) {
                    self.on_login_result(igc.e_channel_code.login_fail, response, callback);
                }
            });
        };
        channel_user_oppo_qg.prototype.on_login_result = function (retcode, param, callback) {
            if (retcode == igc.e_channel_code.login_success) {
                var user_info = this.config_channel_user_info(param, function (param) {
                    var sex = igc.e_channel_sex.none;
                    if (param.sex == "M") {
                        sex = igc.e_channel_sex.man;
                    }
                    else {
                        sex = igc.e_channel_sex.female;
                    }
                    var user_info = {
                        uid: param.uid,
                        token: param.token,
                        nickName: param.nickName,
                        avatar: param.avatar,
                        sex: sex,
                        birthday: param.birthday,
                        phoneNum: param.phoneNum,
                        location: param.location,
                        extra: ""
                    };
                    return user_info;
                });
                callback({ errorcode: igc.e_channel_code.login_success, errormsg: "success", sdk_errorcode: 0, sdk_errormsg: "", channel_user_info: user_info });
            }
            else {
                callback({ errorcode: igc.e_channel_code.login_fail, errormsg: "fail", sdk_errorcode: -1, sdk_errormsg: JSON.stringify(param), channel_user_info: {} });
            }
        };
        channel_user_oppo_qg.prototype.navigate_to_mini_program = function (param) {
            return window["qg"].navigateToMiniGame({
                pkgName: param.app_id,
                success: param.on_succeed
            });
        };
        channel_user_oppo_qg.prototype.device_shake = function (param) {
            window["qg"].vibrateShort({
                success: function (res) {
                    param.on_success && param.on_success();
                },
                fail: function (res) {
                    param.on_failed && param.on_failed();
                },
                complete: function (res) {
                    param.on_complete && param.on_complete();
                }
            });
        };
        channel_user_oppo_qg.prototype.check_can_add_desktop = function () {
            return this.platformVersion >= 1044;
        };
        channel_user_oppo_qg.prototype.check_is_add_desktop = function (param) {
            if (window["qg"] && window["qg"].hasShortcutInstalled) {
                window["qg"].hasShortcutInstalled({
                    success: function (res) {
                        if (res == false) {
                            param.can_add && param.can_add();
                        }
                        else {
                            param.has_add && param.has_add();
                        }
                    },
                    fail: function (err) { },
                    complete: function () { }
                });
            }
        };
        channel_user_oppo_qg.prototype.on_show = function (param) {
            return window["qg"].onShow(function (res) {
                param.on_show && param.on_show(res);
            });
        };
        channel_user_oppo_qg.prototype.on_hide = function (param) {
            return window["qg"].onHide(function (res) {
                param.on_hide && param.on_hide(res);
            });
        };
        channel_user_oppo_qg.prototype.add_desktop = function (param) {
            if (!this.check_can_add_desktop()) {
                param.on_failed && param.on_failed();
                return false;
            }
            if (window["qg"] && window["qg"].hasShortcutInstalled) {
                window["qg"].hasShortcutInstalled({
                    success: function (res) {
                        if (res == false) {
                            param.can_create && param.can_create();
                            window["qg"].installShortcut({
                                success: function () {
                                    param.on_success && param.on_success();
                                },
                                fail: function (err) {
                                    param.on_failed_back && param.on_failed_back();
                                },
                                complete: function () {
                                }
                            });
                        }
                        else {
                            console.log("igc 图标已创建");
                            param.has_create && param.has_create();
                        }
                    },
                    fail: function (err) { },
                    complete: function () { }
                });
            }
        };
        return channel_user_oppo_qg;
    }(igc.channel_facade_user_base));
    igc.channel_user_oppo_qg = channel_user_oppo_qg;
    window["channel_user_oppo_qg"] = channel_user_oppo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_bannerbox_oppo_qg = (function (_super) {
        __extends(ad_bannerbox_oppo_qg, _super);
        function ad_bannerbox_oppo_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ad_bannerbox_oppo_qg.prototype.release = function () {
            this.ad_param && console.log("igc gamebannerbox ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offLoad();
                this.ad_instance.offError();
                if (this.ad_instance) {
                    this.ad_instance.destroy();
                    this.ad_instance = null;
                }
            }
            this.ad_param = null;
            _super.prototype.release.call(this);
        };
        ad_bannerbox_oppo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc gamebannerbox ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            igc.stat_manager.instance.send_user_event(igc.e_ad_app_box_type.banner_box + "", igc.igc_stat_ids.multual_push_click, "", "", "", "", "", "", "");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            this.ad_instance = window["qg"].createGameBannerAd({
                adUnitId: param.ad_id,
            });
            this.ad_instance.onLoad(self.on_load_callback.bind(self));
            this.ad_instance.onError(self.on_error_callback.bind(self));
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.show().then(function () {
                console.log("igc gamebannerbox show success");
                igc.stat_manager.instance.send_user_event(igc.e_ad_app_box_type.banner_box + "", igc.igc_stat_ids.multual_push_show, "", "", "", "", "", "", "");
                self.on_show(param);
            }).catch(function (err) {
                console.log("igc gamebannerbox show fail");
                self.on_error(param, err);
            });
        };
        ad_bannerbox_oppo_qg.prototype.on_load_callback = function () {
            this.on_load(this.ad_param, {});
        };
        ad_bannerbox_oppo_qg.prototype.on_error_callback = function (err) {
            console.log("igc gamebannerbox error back", err);
        };
        ad_bannerbox_oppo_qg.prototype.on_error = function (param, err) {
            console.log("igc gamebannerbox on_err res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_error.call(this, param, err);
            this.release();
        };
        ad_bannerbox_oppo_qg.prototype.on_close = function (param, res) {
            console.log("igc gamebannerbox on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_close.call(this, param, res);
            this.release();
        };
        ad_bannerbox_oppo_qg.prototype.destroy_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " destroy_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.on_close(self.ad_param, {});
                self.ad_op = igc.e_ad_op.destroy;
                this.release();
            }
        };
        return ad_bannerbox_oppo_qg;
    }(igc.ad_base));
    igc.ad_bannerbox_oppo_qg = ad_bannerbox_oppo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_banner_oppo_qg = (function (_super) {
        __extends(ad_banner_oppo_qg, _super);
        function ad_banner_oppo_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.show_num = 0;
            _this.ad_hide_op = false;
            return _this;
        }
        ad_banner_oppo_qg.prototype.release = function () {
            this.ad_param && console.log("igc banner ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offShow();
                this.ad_instance.offLoad();
                this.ad_instance.offHide();
                this.ad_instance.offError();
                if (this.ad_instance) {
                    this.ad_instance.destroy();
                    this.ad_instance = null;
                }
            }
            _super.prototype.release.call(this);
        };
        ad_banner_oppo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_instance = window["qg"].createBannerAd({
                adUnitId: param.ad_id,
                style: {}
            });
            this.ad_instance.onLoad(function () {
                self.ad_instance && self.ad_instance.offLoad && self.ad_instance.offLoad();
                self.on_load(param, {});
            });
            this.ad_instance.onHide(function () {
                self.ad_instance && self.ad_instance.offHide && self.ad_instance.offHide();
                if (self.ad_hide_op == false) {
                    self.on_close(param, {});
                }
                else {
                    self.on_hide(param);
                }
                self.ad_hide_op = false;
            });
            this.ad_instance.offError();
            this.ad_instance.onError(function (err) {
                self.on_error(param, err);
            });
            if (param.platformVersionCode < 1061) {
                this.ad_instance.onShow(function () {
                    console.log("igc banner show succ --- onShow ");
                    self.on_show(param);
                    self.ad_instance && self.ad_instance.offShow && self.ad_instance.offShow();
                });
            }
            this.show_ad(param);
        };
        ad_banner_oppo_qg.prototype.show_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc banner show_ad ad_status: ", this.ad_status);
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.show, "", "", param.ad_scene, "0", self.ad_op);
                var adshow = this.ad_instance.show();
                if (adshow) {
                    console.log("igc banner show adshow:", JSON.stringify(adshow));
                }
                else {
                    console.log("igc banner show adshow null");
                }
                self.ad_hide_op = false;
                adshow && adshow.then(function () {
                    console.log("igc banner show succ --- return ");
                    self.ad_hide_op = false;
                    self.on_show(param);
                }).catch(function (err) {
                    console.log("igc banner show_ad err --- return ");
                });
            }
        };
        ad_banner_oppo_qg.prototype.hide_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " hide_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc banner hide_ad ad_status: ", this.ad_status);
                if (this.ad_status < igc.e_ad_status.show) {
                    return;
                }
                self.ad_op = igc.e_ad_op.hide;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.hide, "", "", param.ad_scene, "0", self.ad_op);
                this.ad_hide_op = true;
                this.ad_instance.hide();
            }
        };
        ad_banner_oppo_qg.prototype.destroy_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " destroy_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.destroy;
                this.release();
            }
        };
        ad_banner_oppo_qg.prototype.on_error = function (param, err) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner on_error res = ", JSON.stringify(err));
            _super.prototype.on_error.call(this, param, err);
            var self = this;
            if (this.ad_instance) {
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, param.ad_scene, "0", self.ad_op);
                this.release();
            }
        };
        ad_banner_oppo_qg.prototype.on_close = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_close.call(this, param, res);
            var self = this;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onclose, "", "", param.ad_scene, "0", self.ad_op);
            if (param && param.onClose) {
                param.onClose(param, {});
            }
            this.ad_status = igc.e_ad_status.close;
            this.release();
        };
        return ad_banner_oppo_qg;
    }(igc.ad_base));
    igc.ad_banner_oppo_qg = ad_banner_oppo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_interstitial_oppo_qg = (function (_super) {
        __extends(ad_interstitial_oppo_qg, _super);
        function ad_interstitial_oppo_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ad_interstitial_oppo_qg.prototype.release = function () {
            this.ad_param && console.log("igc interstitial ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offError();
                this.ad_instance.offClose();
                this.ad_instance.offLoad();
                this.ad_instance.offShow();
                this.ad_instance.destroy();
                this.ad_instance = null;
            }
            _super.prototype.release.call(this);
        };
        ad_interstitial_oppo_qg.prototype.create_low = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc interstitial ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create_low");
            var self = this;
            this.ad_instance = window["qg"].createInsertAd({
                posId: param.ad_id
            });
            this.ad_instance.onError(function (err) {
                self.ad_instance && self.ad_instance.offShow && self.ad_instance.offShow();
                self.on_error(param, err);
            });
            this.ad_instance.onLoad(function () {
                self.ad_instance && self.ad_instance.offLoad && self.ad_instance.offLoad();
                self.on_load(param, {});
            });
            this.ad_instance.onShow(function () {
                self.ad_instance && self.ad_instance.offShow && self.ad_instance.offShow();
                console.log("igc interstitial show_ad succ --- onShow");
                self.on_show(param);
            });
            this.ad_instance.onClose(function () {
                self.ad_instance && self.ad_instance.offClose && self.ad_instance.offClose();
                self.on_close(param, {});
            });
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.load();
        };
        ad_interstitial_oppo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc interstitial ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            if (param.platformVersionCode < 1061) {
                this.create_low(param);
                return;
            }
            this.ad_instance = window["qg"].createInterstitialAd({
                adUnitId: param.ad_id,
            });
            this.ad_instance.onLoad(function () {
                self.ad_instance && self.ad_instance.offLoad && self.ad_instance.offLoad();
                self.on_load(param, {});
            });
            this.ad_instance.onError(function (err) {
                self.on_error(param, err);
            });
            this.ad_instance.onClose && this.ad_instance.onClose(function () {
                self.ad_instance && self.ad_instance.offClose && self.ad_instance.offClose();
                self.on_close(param, {});
            });
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.load();
        };
        ad_interstitial_oppo_qg.prototype.show_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc interstitial ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
            console.log("igc interstitial show_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.show, "", "", param.ad_scene, "0", self.ad_op);
                var adShow = this.ad_instance.show();
                if (adShow) {
                    console.log("igc interstitial show adshow:", JSON.stringify(adShow));
                }
                else {
                    console.log("igc interstitial show adshow null");
                }
                adShow && adShow.then(function () {
                    console.log("igc interstitial show_ad succ --- return");
                    self.on_show(param);
                }).catch(function (err) {
                    console.log("igc interstitial show_ad err --- return ");
                });
            }
        };
        ad_interstitial_oppo_qg.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            if (!this.ad_instance) {
                return;
            }
            var self = this;
            this.ad_instance.offLoad();
            _super.prototype.on_load.call(this, param, res);
            console.log("igc interstitial on_load");
            if (this.ad_param && this.ad_param.auto_show !== false) {
                self.show_ad(self.ad_param);
            }
        };
        ad_interstitial_oppo_qg.prototype.on_close = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc interstitial on_close res = ", JSON.stringify(res));
            _super.prototype.on_close.call(this, param, res);
            if (!this.ad_instance) {
                return;
            }
            var self = this;
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, "", "", self.ad_param.ad_scene, "0", self.ad_op);
            if (self.ad_param && self.ad_param.onClose) {
                self.ad_param.onClose(self.ad_param, {});
            }
            this.ad_status = igc.e_ad_status.close;
            this.release();
        };
        ad_interstitial_oppo_qg.prototype.on_error = function (param, err) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc interstitial on_error res = ", JSON.stringify(err));
            var self = this;
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            _super.prototype.on_error.call(this, param, err);
            this.release();
        };
        ad_interstitial_oppo_qg.prototype.on_show = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc interstitial on_show succ");
            this.ad_instance && this.ad_instance.offShow && this.ad_instance.offShow();
            _super.prototype.on_show.call(this, param);
        };
        return ad_interstitial_oppo_qg;
    }(igc.ad_base));
    igc.ad_interstitial_oppo_qg = ad_interstitial_oppo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_native_oppo_qg = (function (_super) {
        __extends(ad_native_oppo_qg, _super);
        function ad_native_oppo_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ad_native_oppo_qg.prototype.release = function () {
            this.ad_param && console.log("igc native ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offError();
                this.ad_instance.offLoad();
            }
        };
        ad_native_oppo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_instance = window["qg"].createNativeAd({
                adUnitId: param.ad_id
            });
            if (!this.ad_instance) {
                this.release();
                console.log("igc create native fail");
                return;
            }
            this.ad_instance.onError(function (err) {
                self.on_error(param, err);
            });
            this.ad_instance.onLoad(function (res) {
                self.on_load(param, res);
            });
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.load();
        };
        ad_native_oppo_qg.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            self.check_param(param);
            this.ad_instance && this.ad_instance.offLoad && this.ad_instance.offLoad();
            if (res && res.adList) {
                console.log("igc native on_load length:", res.adList.length, JSON.stringify(res.adList));
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onload, res.adList.length, "", self.ad_param.ad_scene, "0", self.ad_op);
                var ad_data_list = [];
                for (var i = 0; i < res.adList.length; i++) {
                    var adData = {
                        adUnitId: res.adList[i].adId,
                        title: res.adList[i].title,
                        desc: res.adList[i].desc,
                        iconUrlList: res.adList[i].iconUrlList || res.adList[i].icon,
                        icon: res.adList[i].icon,
                        imgUrlList: res.adList[i].imgUrlList,
                        logoUrl: res.adList[i].logoUrl,
                        clickBtnTxt: res.adList[i].clickBtnTxt,
                        creativeType: res.adList[i].creativeType,
                        interactionType: res.adList[i].interactionType
                    };
                    
                    if (!res.adList[i].iconUrlList) {
                        adData.iconUrlList = [];
                        adData.iconUrlList.push(res.adList[i].icon);
                    }
                    else {
                        adData.iconUrlList = res.adList[i].iconUrlList;
                    }
                    ad_data_list.push(adData);
                }
                if (self.ad_param && self.ad_param.onLoad) {
                    console.log("igc native self.ad_param.onLoad(ad_data_list,self.ad_param)");
                    self.ad_param.onLoad(self.ad_param, ad_data_list);
                }
                else {
                    console.log("igc native dont self.ad_param && self.ad_param.onLoad");
                }
            }
            else {
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onload, "0", "", self.ad_param.ad_scene, "0", self.ad_op);
                self.ad_param.onLoad(self.ad_param, []);
                this.ad_status = igc.e_ad_status.none;
                this.release();
                console.log("igc native on_load fail");
                return;
            }
        };
        ad_native_oppo_qg.prototype.on_error = function (param, err) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc native on_error:", JSON.stringify(err));
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errorCode, err.errorMsg, self.ad_param.ad_scene, "0", self.ad_op);
            this.release();
        };
        ad_native_oppo_qg.prototype.report_ad_close = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + ",ad_unit_id:" + param.ad_unit_id + " report_ad_close");
            console.log("igc native report_ad_close ");
            _super.prototype.check_param.call(this, param);
            var self = this;
            self.ad_op = igc.e_ad_op.close;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onclose, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_status = igc.e_ad_status.close;
            this.release();
        };
        ad_native_oppo_qg.prototype.report_ad_show = function (param) {
            console.log("igc native report_ad_show ");
            _super.prototype.check_param.call(this, param);
            var self = this;
            if (self.ad_instance && param && param.ad_unit_id !== undefined) {
                self.ad_instance.reportAdShow({
                    adId: param.ad_unit_id + ""
                });
                if (param.ad_pos_id && param.ad_type && param.ad_scene && param.sub_ad_type) {
                    self.ad_op = igc.e_ad_op.show;
                    self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onshow, "", "", param.ad_scene, "0", self.ad_op);
                    if (param.ad_id) {
                        console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + ",ad_unit_id:" + param.ad_unit_id + " report_ad_show");
                    }
                }
                return true;
            }
            return false;
        };
        ad_native_oppo_qg.prototype.report_ad_click = function (param) {
            console.log("igc native report_ad_click ");
            _super.prototype.check_param.call(this, param);
            var self = this;
            if (self.ad_instance && param && param.ad_unit_id !== undefined) {
                self.ad_instance.reportAdClick({
                    adId: param.ad_unit_id + ""
                });
                if (param.ad_pos_id && param.ad_type && param.ad_scene && param.sub_ad_type) {
                    self.ad_op = igc.e_ad_op.click;
                    self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onclick, "", "", param.ad_scene, "0", self.ad_op);
                    if (param.ad_id) {
                        console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + ",ad_unit_id:" + param.ad_unit_id + " report_ad_click");
                    }
                }
                return true;
            }
            return false;
        };
        return ad_native_oppo_qg;
    }(igc.ad_base));
    igc.ad_native_oppo_qg = ad_native_oppo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_portalbox_oppo_qg = (function (_super) {
        __extends(ad_portalbox_oppo_qg, _super);
        function ad_portalbox_oppo_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.load_success = false;
            return _this;
        }
        ad_portalbox_oppo_qg.prototype.release = function () {
            this.ad_param && console.log("igc portalbox ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offLoad();
                this.ad_instance.offClose();
                this.ad_instance.offError();
                if (this.ad_instance) {
                    this.ad_instance.destroy();
                    this.ad_instance = null;
                }
            }
            this.load_success = false;
            _super.prototype.release.call(this);
        };
        ad_portalbox_oppo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc portalbox ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            this.ad_instance = window["qg"].createGamePortalAd({
                adUnitId: param.ad_id,
            });
            this.ad_instance.onLoad(self.on_load_callback.bind(self));
            this.ad_instance.onClose(self.on_close_callback.bind(self));
            this.ad_instance.onError(self.on_error_callback.bind(self));
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.load().then(function () {
                console.log("igc gameportalbox load success");
                self.on_load(param, {});
            }).catch(function (err) {
                console.log("igc gameportalbox load fail");
                self.on_error(param, err);
            });
        };
        ad_portalbox_oppo_qg.prototype.on_load_callback = function () {
        };
        ad_portalbox_oppo_qg.prototype.on_error_callback = function (err) {
            console.log("igc gameportalbox error back", err);
        };
        ad_portalbox_oppo_qg.prototype.on_close_callback = function () {
            console.log("igc gameportalbox close back");
            this.ad_param.onClose(this.ad_param, {});
            this.on_close(this.ad_param, {});
        };
        ad_portalbox_oppo_qg.prototype.on_load = function (param, res) {
            if (!this.ad_instance || !this.ad_param) {
                return;
            }
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            this.load_success = true;
            _super.prototype.on_load.call(this, param, res);
            if (param.auto_show) {
                param.auto_show = false;
                this.show_ad(param);
            }
        };
        ad_portalbox_oppo_qg.prototype.show_ad = function (param) {
            var self = this;
            this.ad_param = param;
            igc.stat_manager.instance.send_user_event(igc.e_ad_app_box_type.portal_box + "", igc.igc_stat_ids.multual_push_click, "", "", "", "", "", "", "");
            if (this.ad_instance && this.load_success) {
                this.ad_op = igc.e_ad_op.show;
                this.ad_instance.show().then(function () {
                    console.log("igc portalbox show success");
                    igc.stat_manager.instance.send_user_event(igc.e_ad_app_box_type.portal_box + "", igc.igc_stat_ids.multual_push_show, "", "", "", "", "", "", "");
                    self.on_show(param);
                }).catch(function (err) {
                    console.log("igc portalbox show fail");
                    self.on_error(param, err);
                });
            }
            else {
                this.release();
                param.auto_show = true;
                this.create(param);
            }
        };
        ad_portalbox_oppo_qg.prototype.on_error = function (param, err) {
            console.log("igc portalbox on_err res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_error.call(this, param, err);
            this.release();
        };
        ad_portalbox_oppo_qg.prototype.on_close = function (param, res) {
            console.log("igc portalbox on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_close.call(this, param, res);
            this.release();
        };
        ad_portalbox_oppo_qg.prototype.destroy_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " destroy_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.destroy;
                this.release();
            }
        };
        return ad_portalbox_oppo_qg;
    }(igc.ad_base));
    igc.ad_portalbox_oppo_qg = ad_portalbox_oppo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_video_oppo_qg = (function (_super) {
        __extends(ad_video_oppo_qg, _super);
        function ad_video_oppo_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ad_video_oppo_qg.prototype.release = function () {
            this.ad_param && console.log("igc video ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offLoad();
                this.ad_instance.offClose();
                this.ad_instance.offError();
                this.ad_instance.destroy();
            }
            _super.prototype.release.call(this);
        };
        ad_video_oppo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc video ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            var extra = param.extra || "";
            // igc.stat_manager.instance.send_user_event(param.ad_pos_id + "", igc.igc_stat_ids.video_click, "", "", extra, "", "", "", "");
            this.ad_instance = window["qg"].createRewardedVideoAd({
                adUnitId: param.ad_id,
            });
            this.ad_instance.onLoad(function () {
                self.ad_instance && self.ad_instance.offLoad && self.ad_instance.offLoad();
                self.on_load(param, {});
            });
            this.ad_instance.onError(function (err) {
                self.on_error(param, err);
            });
            this.ad_instance.onClose(function (res) {
                self.ad_instance && self.ad_instance.offClose && self.ad_instance.offClose();
                self.on_close(param, res);
            });
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.load();
        };
        ad_video_oppo_qg.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            if (!this.ad_instance || !this.ad_param) {
                return;
            }
            var self = this;
            this.ad_instance.offLoad && this.ad_instance.offLoad();
            _super.prototype.on_load.call(this, param, res);
            try {
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.show, "", "", param.ad_scene, "0", self.ad_op);
                var adShow = this.ad_instance.show();
                if (param.platformVersionCode < 1061) {
                    console.log("video fake onshow succ ---------");
                    self.on_show(param);
                }
                if (adShow) {
                    console.log("igc video show adshow:", JSON.stringify(adShow));
                }
                else {
                    console.log("igc video show adshow null");
                }
                adShow && adShow.then(function () {
                    console.log("igc video show succ result");
                    self.on_show(param);
                });
            }
            catch (err) {
                console.log("" + err);
            }
        };
        ad_video_oppo_qg.prototype.on_error = function (param, err) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc video on_err res = ", JSON.stringify(err));
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            this.release();
        };
        ad_video_oppo_qg.prototype.on_close = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc video on_close res = ", JSON.stringify(res));
            var self = this;
            _super.prototype.on_close.call(this, param, res);
            if (res && res.isEnded) {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: res.isEnded });
                }
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.complete, "", self.ad_param.ad_scene, "0", self.ad_op);
                igc.stat_manager.instance.send_user_event(self.ad_param.ad_pos_id + "", igc.igc_stat_ids.video_compelete, "", "", "", "", "", "", "");
            }
            else {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: false });
                }
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.uncomplete, "", self.ad_param.ad_scene, "0", self.ad_op);
                igc.stat_manager.instance.send_user_event(self.ad_param.ad_pos_id + "", igc.igc_stat_ids.video_uncompelete, "", "", "", "", "", "", "");
            }
            this.release();
        };
        return ad_video_oppo_qg;
    }(igc.ad_base));
    igc.ad_video_oppo_qg = ad_video_oppo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_ad_qq = (function (_super) {
        __extends(channel_ad_qq, _super);
        function channel_ad_qq() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ad_block_map = {};
            _this.ad_sysInfo = null;
            _this.banner_top_offset = 0;
            _this.can_video = true;
            _this.can_banner = true;
            _this.can_appbox = true;
            _this.can_inter = true;
            _this.can_block = true;
            return _this;
        }
        channel_ad_qq.prototype.init = function () {
            _super.prototype.init.call(this);
            this.ad_sysInfo = window["qq"].getSystemInfoSync();
            var compare_appbox = igc.utils_manager.compare_version(this.ad_sysInfo.SDKVersion, "1.7.1");
            if (compare_appbox == -1) {
                this.can_appbox = false;
            }
            var compare_inter = igc.utils_manager.compare_version(this.ad_sysInfo.SDKVersion, "1.12.0");
            if (compare_inter == -1) {
                this.can_inter = false;
            }
            var compare_block = igc.utils_manager.compare_version(this.ad_sysInfo.SDKVersion, "1.15.0");
            if (compare_block == -1) {
                this.can_block = false;
            }
            this.support_method[igc.e_method_type.create_ad] = true;
            this.support_method[igc.e_method_type.destroy_ad] = true;
            this.support_method[igc.e_method_type.show_ad] = true;
            this.support_method[igc.e_method_type.hide_ad] = true;
            this.support_method[igc.e_method_type.has_ad] = true;
            this.support_method[igc.e_method_type.set_ad_position] = true;
        };
        channel_ad_qq.prototype.has_ad = function (param) {
            if (param && param.ad_type === igc.e_ad_type.app_box) {
                return this.can_appbox;
            }
            else if (param && param.ad_type === igc.e_ad_type.interstitial) {
                return this.can_inter;
            }
            return true;
        };
        channel_ad_qq.prototype.create_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (!this.has_ad(param)) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.create_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.create_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.app_box) {
                return this.create_ad_app_box(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.create_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.block) {
                return this.create_ad_block(param);
            }
            else {
                return false;
            }
        };
        channel_ad_qq.prototype.create_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.destroy_ad(param);
                this.ad_banner = null;
            }
            param.windowWidth = this.ad_sysInfo.screenWidth;
            param.windowHeight = this.ad_sysInfo.screenHeight;
            var width = param.width || 300;
            if (width > param.windowWidth) {
                width = param.windowWidth;
            }
            else if (width < 300) {
                width = 300;
            }
            var left = (param.windowWidth - width) / 2;
            var top = param.windowHeight - 80;
            console.log("igc create_banner left:" + left + ",top:" + top + ",width:" + width);
            param.width = width;
            if (this.banner_top_offset > 0) {
                param.top_offset = this.banner_top_offset;
                param.is_set_position = true;
                param.style = {
                    left: left,
                    top: this.banner_top_offset,
                    width: width,
                };
            }
            else {
                param.style = {
                    left: left,
                    top: top,
                    width: width,
                };
                param.is_set_position = false;
            }
            this.ad_banner = new igc.ad_banner_qq();
            this.ad_banner.create(param);
        };
        channel_ad_qq.prototype.create_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.create(param);
            }
            else {
                this.ad_video = new igc.ad_video_qq();
                this.ad_video.create(param);
            }
        };
        channel_ad_qq.prototype.create_ad_app_box = function (param) {
            if (!this.can_appbox || !window["qq"].createAppBox) {
                return false;
            }
            var self = this;
            if (this.ad_appbox) {
                this.ad_appbox.create(param);
            }
            else {
                this.ad_appbox = new igc.ad_appbox_qq();
                this.ad_appbox.create(param);
            }
            return true;
        };
        channel_ad_qq.prototype.create_ad_interstitial = function (param) {
            if (!this.can_inter || !window["qq"].createInterstitialAd) {
                return false;
            }
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.create(param);
            }
            else {
                this.ad_interstitial = new igc.ad_interstitial_qq();
                this.ad_interstitial.create(param);
            }
        };
        channel_ad_qq.prototype.create_ad_block = function (param) {
            if (!this.can_block || !window["qq"].createBlockAd) {
                return false;
            }
            param.windowWidth = this.ad_sysInfo.screenWidth;
            param.windowHeight = this.ad_sysInfo.screenHeight;
            if (this.banner_top_offset > 0) {
                param.is_set_position = true;
                param.top_offset = this.banner_top_offset;
            }
            else {
                param.is_set_position = false;
            }
            if (!this.ad_block_map[param.ad_id]) {
                this.ad_block_map[param.ad_id] = new igc.ad_block_qq();
                this.ad_block_map[param.ad_id].create(param);
            }
            else {
                this.ad_block_map[param.ad_id].create(param);
            }
        };
        channel_ad_qq.prototype.set_ad_position = function (param) {
            this.banner_top_offset = param.top_offset;
            if (this.ad_banner) {
                this.ad_banner.set_ad_position(param);
            }
            else {
                console.log("channel_ad_qq  move_ad  ad_banner_instance is null");
            }
            for (var i in this.ad_block_map) {
                if (this.ad_block_map[i]) {
                    this.ad_block_map[i].set_ad_position(param);
                }
            }
        };
        channel_ad_qq.prototype.show_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.show_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.show_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.app_box) {
                return this.show_ad_app_box(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.show_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.block) {
                return this.show_ad_block(param);
            }
            else {
                return false;
            }
        };
        channel_ad_qq.prototype.show_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_qq.prototype.show_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_qq.prototype.show_ad_app_box = function (param) {
            var self = this;
            if (this.ad_appbox) {
                this.ad_appbox.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_qq.prototype.show_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_qq.prototype.show_ad_block = function (param) {
            var self = this;
            if (this.ad_block_map[param.ad_id]) {
                this.ad_block_map[param.ad_id].show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_qq.prototype.hide_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.hide_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.hide_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.app_box) {
                return this.hide_ad_appbox(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.hide_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.block) {
                return this.hide_ad_block(param);
            }
            else {
                return false;
            }
        };
        channel_ad_qq.prototype.hide_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.hide_ad(param);
            }
        };
        channel_ad_qq.prototype.hide_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.hide_ad(param);
            }
        };
        channel_ad_qq.prototype.hide_ad_appbox = function (param) {
            var self = this;
            if (this.ad_appbox) {
                this.ad_appbox.hide_ad(param);
            }
        };
        channel_ad_qq.prototype.hide_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.hide_ad(param);
            }
        };
        channel_ad_qq.prototype.hide_ad_block = function (param) {
            var self = this;
            if (this.ad_block_map[param.ad_id]) {
                this.ad_block_map[param.ad_id].hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_qq.prototype.destroy_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.destroy_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.destroy_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.app_box) {
                return this.destroy_ad_app_box(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.destroy_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.block) {
                return this.destroy_ad_block(param);
            }
            else {
                return false;
            }
        };
        channel_ad_qq.prototype.destroy_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.destroy_ad(param);
                this.ad_banner = null;
            }
        };
        channel_ad_qq.prototype.destroy_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.destroy_ad(param);
            }
        };
        channel_ad_qq.prototype.destroy_ad_app_box = function (param) {
            var self = this;
            if (this.ad_appbox) {
                this.ad_appbox.destroy_ad(param);
                this.ad_appbox = null;
            }
        };
        channel_ad_qq.prototype.destroy_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.destroy_ad(param);
            }
        };
        channel_ad_qq.prototype.destroy_ad_block = function (param) {
            var self = this;
            if (this.ad_block_map[param.ad_id]) {
                this.ad_block_map[param.ad_id].destroy_ad(param);
                return true;
            }
            return false;
        };
        return channel_ad_qq;
    }(igc.channel_facade_ad_base));
    igc.channel_ad_qq = channel_ad_qq;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_share_qq = (function (_super) {
        __extends(channel_share_qq, _super);
        function channel_share_qq() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_share_qq.prototype.init = function () {
            _super.prototype.init.call(this);
            this.register_listener();
            this.support_method[igc.e_method_type.share] = true;
            this.support_method[igc.e_method_type.on_share_app_message] = true;
            this.support_method[igc.e_method_type.start_record_screen] = false;
            this.support_method[igc.e_method_type.stop_record_screen] = false;
            this.support_method[igc.e_method_type.pause_record_screen] = false;
            this.support_method[igc.e_method_type.resume_record_screen] = false;
            this.support_method[igc.e_method_type.share_record_screen] = false;
            this.support_method[igc.e_method_type.get_record_video] = false;
        };
        channel_share_qq.prototype.register_listener = function () {
        };
        channel_share_qq.prototype.on_share_app_message = function (param) {
            var query = "type=" + igc.e_share_type.card + "&k2=v2";
            if (param && param.userId && param.userId != "") {
                query = "type=" + igc.e_share_type.card + "&userId=" + param.userId;
            }
            window["qq"].showShareMenu({
                showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
            });
            window["qq"].onShareAppMessage(function () {
                return {
                    title: param.title,
                    imageUrl: param.imageUrl,
                    query: query
                };
            });
        };
        channel_share_qq.prototype.share = function (param) {
            var query = "type=" + igc.e_share_type.card + "&k2=v2";
            if (param && param.userId && param.userId != "") {
                query = "type=" + igc.e_share_type.card + "&userId=" + param.userId;
            }
            window["qq"].shareAppMessage({
                title: param.title || "",
                imageUrl: param.imageUrl || "",
                query: query,
                shareAppType: param.shareAppType || "",
                success: function (res) {
                    param.success && param.success(res);
                },
                fail: function (res) {
                    param.success && param.success(res);
                }
            });
        };
        return channel_share_qq;
    }(igc.channel_facade_share_base));
    igc.channel_share_qq = channel_share_qq;
    window["channel_share_qq"] = channel_share_qq;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_system_qq = (function (_super) {
        __extends(channel_system_qq, _super);
        function channel_system_qq() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_system_qq.prototype.init = function () {
            _super.prototype.init.call(this);
            this.register_listener();
            this.support_method[igc.e_method_type.get_system_info_sync] = true;
            this.support_method[igc.e_method_type.get_launch_options_sync] = true;
            this.support_method[igc.e_method_type.exit_mini_program] = true;
            this.support_method[igc.e_method_type.on_show] = true;
            this.support_method[igc.e_method_type.on_hide] = true;
        };
        channel_system_qq.prototype.register_listener = function () {
        };
        channel_system_qq.prototype.get_system_info_sync = function () {
            var system_info = window["qq"].getSystemInfoSync();
            var info = {
                brand: system_info.brand,
                model: system_info.model,
                pixelRatio: system_info.pixelRatio,
                screenWidth: system_info.screenWidth,
                screenHeight: system_info.screenHeight,
                windowWidth: system_info.windowWidth,
                windowHeight: system_info.windowHeight,
                statusBarHeight: system_info.statusBarHeight,
                language: system_info.language,
                version: system_info.version,
                platform: system_info.platform,
                system: system_info.system,
                platformVersion: system_info.SDKVersion,
                extra: system_info
            };
            return info;
        };
        channel_system_qq.prototype.get_launch_options_sync = function () {
            var launch_options = window["qq"].getLaunchOptionsSync();
            var info = {
                scene: launch_options.scene,
                query: launch_options.query,
                shareTicket: launch_options.shareTicket,
                referrerInfo: launch_options.referrerInfo,
                entryDataHash: launch_options.entryDataHash,
            };
            return info;
        };
        channel_system_qq.prototype.exit_mini_program = function () {
            return window["qq"].exitMiniProgram();
        };
        channel_system_qq.prototype.on_show = function (param) {
            return window["qq"].onShow(function (res) {
                param.on_show && param.on_show(res);
            });
        };
        channel_system_qq.prototype.on_hide = function (param) {
            return window["qq"].onHide(function (res) {
                param.on_hide && param.on_hide(res);
            });
        };
        return channel_system_qq;
    }(igc.channel_facade_share_base));
    igc.channel_system_qq = channel_system_qq;
    window["channel_system_qq"] = channel_system_qq;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_user_qq = (function (_super) {
        __extends(channel_user_qq, _super);
        function channel_user_qq() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.button = undefined;
            return _this;
        }
        channel_user_qq.prototype.init = function () {
            _super.prototype.init.call(this);
            this.support_method[igc.e_method_type.login] = true;
            this.support_method[igc.e_method_type.share] = true;
            this.support_method[igc.e_method_type.show_loading] = true;
            this.support_method[igc.e_method_type.show_toast] = true;
            this.support_method[igc.e_method_type.show_modal] = true;
            this.support_method[igc.e_method_type.on_show] = true;
            this.support_method[igc.e_method_type.on_hide] = true;
            this.support_method[igc.e_method_type.navigate_to_mini_program] = true;
            this.support_method[igc.e_method_type.get_system_info_sync] = true;
            this.support_method[igc.e_method_type.create_inner_audio_context] = true;
            this.support_method[igc.e_method_type.post_message] = true;
            this.support_method[igc.e_method_type.set_user_cloud_storage] = true;
            this.support_method[igc.e_method_type.get_setting] = true;
            this.support_method[igc.e_method_type.create_user_info_button] = true;
            this.support_method[igc.e_method_type.open_setting] = true;
            this.support_method[igc.e_method_type.authorize] = true;
            this.support_method[igc.e_method_type.get_device] = true;
            this.support_method[igc.e_method_type.get_invite_query] = true;
            this.support_method[igc.e_method_type.set_show_share_menu] = true;
            this.support_method[igc.e_method_type.get_launch_options_sync] = true;
            var res = window["qq"].getSystemInfoSync();
            if (res) {
                igc.stat_manager.instance._osInfo = res.model || "";
                igc.stat_manager.instance._opInfo = res.SDKVersion;
            }
            console.log("xiejinhui qq手机型号", igc.stat_manager.instance._osInfo);
        };
        channel_user_qq.prototype.login = function (login_param, callback) {
            var self = this;
            window["qq"] && window["qq"].login({
                success: function (response) {
                    self.getSetting(function (ret) {
                        if (ret === true) {
                            self.getUserInfo(function (ret, data) {
                                if (ret === true) {
                                    var info = {
                                        code: response.code,
                                        user_data: data
                                    };
                                    self.on_login_result(igc.e_channel_code.login_success, info, callback);
                                }
                                else {
                                    var info = {
                                        code: response.code,
                                    };
                                    self.on_login_result(igc.e_channel_code.login_success, info, callback);
                                }
                            });
                        }
                        else {
                            var info = {
                                code: response.code,
                            };
                            self.on_login_result(igc.e_channel_code.login_success, info, callback);
                        }
                    });
                },
                fail: function (response) {
                    window["qq"].hideLoading();
                    window["qq"].showToast({
                        title: 'QQ登录失败!',
                        icon: '',
                        image: "",
                        duration: 2000
                    });
                    self.on_login_result(igc.e_channel_code.login_fail, response, callback);
                }
            });
        };
        channel_user_qq.prototype.getSetting = function (callback) {
            var self = this;
            window["qq"] && window["qq"].getSetting({
                success: function (res) {
                    var authSetting = res.authSetting;
                    if (authSetting['scope.userInfo'] === true) {
                        if (callback) {
                            callback(true);
                        }
                        return;
                    }
                    else {
                        if (callback) {
                            callback(false);
                        }
                        return;
                    }
                }
            });
        };
        channel_user_qq.prototype.getUserInfo = function (callback) {
            var self = this;
            window["qq"] && window["qq"].getUserInfo({
                success: function (data) {
                    if (callback) {
                        callback(true, data);
                    }
                },
                fail: function (data) {
                    if (callback) {
                        callback(false, {});
                    }
                }
            });
        };
        channel_user_qq.prototype.get_user_info = function (param) {
            var self = this;
            self.getSetting(function (ret) {
                if (ret === true) {
                    self.getUserInfo(function (ret, data) {
                        if (ret === true) {
                            var info = {
                                user_data: data
                            };
                            var user_info = self.config_channel_user_info_ex(info);
                            if (param.on_user_info) {
                                param.on_user_info(user_info);
                            }
                            if (param.success) {
                                param.success(user_info);
                            }
                        }
                        else {
                            if (param.on_user_info) {
                                param.on_user_info(undefined);
                            }
                        }
                    });
                }
                else {
                    self.create_button(param);
                    if (param.fail) {
                        param.fail();
                    }
                }
            });
            return true;
        };
        channel_user_qq.prototype.create_button = function (param) {
            var self = this;
            self.button = window["qq"].createUserInfoButton({
                type: param.type,
                image: param.image,
                style: {
                    left: param.left,
                    top: param.top,
                    width: param.width,
                    height: param.height,
                    lineHeight: param.lineHeight,
                    backgroundColor: param.backgroundColor,
                    color: param.color,
                    textAlign: param.textAlign,
                    fontSize: param.fontSize,
                    borderRadius: param.borderRadius,
                }
            });
            self.button.onTap(function (res) {
                self.getSetting(function (ret) {
                    if (ret == true) {
                        self.getUserInfo(function (ret, data) {
                            if (ret === true) {
                                var info = {
                                    user_data: data
                                };
                                var user_info = self.config_channel_user_info_ex(info);
                                if (param.on_user_info) {
                                    param.on_user_info(user_info);
                                }
                            }
                            else {
                                if (param.on_user_info) {
                                    param.on_user_info(undefined);
                                }
                            }
                        });
                    }
                    if (self.button) {
                        self.button.destroy();
                        self.button = undefined;
                    }
                });
            });
        };
        channel_user_qq.prototype.config_channel_user_info_ex = function (param) {
            var tempName = localStorage.getItem("igc_random_qq_name");
            if (!tempName) {
                tempName = this.get_random_name();
                localStorage.setItem("igc_random_qq_name", tempName);
            }
            var user_info = this.config_channel_user_info(param, function (param) {
                if (!param.user_data) {
                    var user_info_1 = {
                        uid: tempName,
                        token: param.code,
                        hasAuth: false,
                        nickName: tempName,
                        avatar: "",
                        sex: "",
                        birthday: "",
                        phoneNum: "",
                        location: "",
                        extra: ""
                    };
                    return user_info_1;
                }
                else {
                    var userInfo = param.user_data.userInfo;
                    var user_info_2 = {
                        uid: tempName,
                        token: param.code,
                        hasAuth: true,
                        nickName: tempName,
                        avatar: userInfo.avatarUrl,
                        sex: userInfo.gender,
                        birthday: "",
                        phoneNum: "",
                        location: "",
                        extra: ""
                    };
                    return user_info_2;
                }
            });
            return user_info;
        };
        channel_user_qq.prototype.on_login_result = function (retcode, param, callback) {
            if (retcode == igc.e_channel_code.login_success) {
                var user_info = this.config_channel_user_info_ex(param);
                callback({ errorcode: igc.e_channel_code.login_success, errormsg: "success", sdk_errorcode: 0, sdk_errormsg: "", channel_user_info: user_info });
            }
            else {
                callback({ errorcode: igc.e_channel_code.login_fail, errormsg: "fail", sdk_errorcode: -1, sdk_errormsg: JSON.stringify(param), channel_user_info: {} });
            }
        };
        channel_user_qq.prototype.share = function (param) {
            if (window["qq"] !== undefined && window["qq"].shareAppMessage) {
                return window["qq"].shareAppMessage({
                    withShareTicket: param.with_share_ticket,
                    title: param.title,
                    imageUrl: param.image_url,
                    query: "type=" + param.query_type + "&userId=" + param.user_id,
                    success: function (res) {
                        param.on_succeed && param.on_succeed(res);
                    },
                    fail: function (res) {
                        param.on_failed && param.on_failed(res);
                    }
                });
            }
        };
        channel_user_qq.prototype.show_loading = function (param) {
            if (param.is_show) {
                return window["qq"].showLoading({
                    title: param.title,
                    mask: param.mask
                });
            }
            else {
                return window["qq"].hideLoading();
            }
        };
        channel_user_qq.prototype.show_toast = function (param) {
            return window["qq"].showToast({
                title: param.title,
                icon: param.icon,
                image: param.image,
                duration: param.duration
            });
        };
        channel_user_qq.prototype.show_modal = function (param) {
            return window["qq"].showModal({
                title: param.title,
                content: param.content,
                showCancel: param.show_cancel,
                cancelText: param.cancel_text,
                cancelColor: param.cancel_color,
                confirmText: param.confirm_text,
                confirmColor: param.confirm_color,
                success: param.on_succeed,
                fail: param.on_failed,
                complete: param.on_complete,
            });
        };
        channel_user_qq.prototype.on_show = function (param) {
            return window["qq"].onShow(function (res) {
                param.on_show && param.on_show(res);
            });
        };
        channel_user_qq.prototype.on_hide = function (param) {
            return window["qq"].onHide(function (res) {
                param.on_hide && param.on_hide(res);
            });
        };
        channel_user_qq.prototype.navigate_to_mini_program = function (param) {
            return window["qq"].navigateToMiniProgram({
                appId: param.app_id,
                path: param.path,
                extraData: param.extra_data,
                success: param.on_succeed
            });
        };
        channel_user_qq.prototype.get_system_info_sync = function (param) {
            return window["qq"].getSystemInfoSync();
        };
        channel_user_qq.prototype.create_inner_audio_context = function (param) {
            return window["qq"].createInnerAudioContext();
        };
        channel_user_qq.prototype.post_message = function (param) {
            return window["qq"].postMessage({
                messageType: param.message_type,
                data: param.data
            });
        };
        channel_user_qq.prototype.set_user_cloud_storage = function (param) {
            return window["qq"].setUserCloudStorage({
                KVDataList: param.kv_data_list,
                success: param.on_succeed,
                fail: param.on_failed,
            });
        };
        channel_user_qq.prototype.get_setting = function (param) {
            return window["qq"].getSetting({
                success: param.on_succeed
            });
        };
        channel_user_qq.prototype.create_user_info_button = function (param) {
            return window["qq"].createUserInfoButton({
                type: param.type,
                image: param.image,
                style: param.style
            });
        };
        channel_user_qq.prototype.open_setting = function (param) {
            return window["qq"].openSetting();
        };
        channel_user_qq.prototype.authorize = function (param) {
            return window["qq"].authorize({
                scope: param.score,
                success: param.on_succeed,
                fail: param.on_failed
            });
        };
        channel_user_qq.prototype.get_device = function (param) {
            window["qq"].getSystemInfo({
                success: function (res) {
                    if (res.platform == "devtools") {
                        return igc.e_device.desktop;
                    }
                    else if (res.platform == "ios") {
                        return igc.e_device.ios;
                    }
                    else if (res.platform == "android") {
                        return igc.e_device.android;
                    }
                    else {
                        return igc.e_device.unknown;
                    }
                }
            });
            return igc.e_device.unknown;
        };
        channel_user_qq.prototype.get_invite_query = function () {
            var res = window["qq"].getLaunchOptionsSync();
            console.log("qq游戏启动参数----------------->", res);
            return res.query;
        };
        channel_user_qq.prototype.set_show_share_menu = function (param) {
            window["qq"].showShareMenu({
                showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
            });
            window["qq"].onShareAppMessage(function () {
                return {
                    title: param.txt,
                    imageUrl: param.url
                };
            });
        };
        channel_user_qq.prototype.get_launch_options_sync = function () {
            return window["qq"].getLaunchOptionsSync();
        };
        return channel_user_qq;
    }(igc.channel_facade_user_base));
    igc.channel_user_qq = channel_user_qq;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_appbox_qq = (function (_super) {
        __extends(ad_appbox_qq, _super);
        function ad_appbox_qq() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.is_first = true;
            return _this;
        }
        ad_appbox_qq.prototype.release = function () {
            this.ad_param && console.log("igc appbox ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            this.ad_param = null;
        };
        ad_appbox_qq.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc appbox ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_instance = window["qq"].createAppBox({
                adUnitId: param.ad_id,
            });
            if (this.is_first === true) {
                this.ad_instance.onClose(self.on_close_callback.bind(self));
                this.is_first = false;
            }
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.load().then(function () {
                self.on_load(param, {});
            }).catch(function (err) {
                self.on_error(param, err);
            });
        };
        ad_appbox_qq.prototype.on_close_callback = function (res) {
            var self = this;
            if (!self.ad_instance) {
                console.log("igc on_load_callback self.ad_instance null");
            }
            if (!self.ad_instance.offClose) {
                console.log("igc on_load_callback self.ad_instance.offClose null");
            }
            self.on_close(self.ad_param, {});
        };
        ad_appbox_qq.prototype.on_load = function (param, res) {
            if (!this.ad_instance || !this.ad_param) {
                return;
            }
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_load.call(this, param, res);
            self.ad_op = igc.e_ad_op.show;
            self.ad_instance.show().then(function () {
                self.on_show(param);
            }).catch(function (err) {
                self.on_error(param, err);
            });
        };
        ad_appbox_qq.prototype.on_error = function (param, err) {
            console.log("igc appbox on_err res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            this.release();
        };
        ad_appbox_qq.prototype.on_close = function (param, res) {
            console.log("igc appbox on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_close.call(this, param, res);
            self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, "", "", self.ad_param.ad_scene, "0", self.ad_op);
            this.release();
        };
        ad_appbox_qq.prototype.destroy_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " destroy_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.destroy;
                this.ad_instance.destroy();
                this.release();
                this.ad_instance = null;
                this.is_first = false;
            }
        };
        return ad_appbox_qq;
    }(igc.ad_base));
    igc.ad_appbox_qq = ad_appbox_qq;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_banner_qq = (function (_super) {
        __extends(ad_banner_qq, _super);
        function ad_banner_qq() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.show_num = 0;
            _this.is_resize_back = false;
            _this.top_offset = 0;
            return _this;
        }
        ad_banner_qq.prototype.release = function () {
            this.ad_param && console.log("igc banner ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offLoad && this.ad_instance.offLoad();
                this.ad_instance.offError && this.ad_instance.offError();
                this.ad_instance.offResize && this.ad_instance.offResize();
                this.ad_instance.destroy();
                this.ad_instance = null;
                this.ad_param = null;
            }
            _super.prototype.release.call(this);
        };
        ad_banner_qq.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            this.is_resize_back = false;
            var style = param.style || {};
            this.ad_instance = window["qq"].createBannerAd({
                adUnitId: param.ad_id,
                style: style,
            });
            this.ad_instance.onError(self.on_error_callback.bind(self));
            this.ad_instance.onLoad(self.on_load_callback.bind(self));
            this.ad_instance.onResize(self.on_resize_callback.bind(self));
        };
        ad_banner_qq.prototype.on_error_callback = function (err) {
            this.on_error(this.ad_param, err);
        };
        ad_banner_qq.prototype.on_load_callback = function () {
            var self = this;
            if (!self) {
                console.log("igc banner on_load_callback self null");
            }
            if (!self.ad_instance) {
                console.log("igc banner on_load_callback self.ad_instance null");
            }
            if (!self.ad_instance.offLoad) {
                console.log("igc banner on_load_callback self.ad_instance.offLoad null");
            }
            self.ad_instance && self.ad_instance.offLoad && self.ad_instance.offLoad(self.on_load_callback);
            self.on_load(this.ad_param, {});
        };
        ad_banner_qq.prototype.on_resize_callback = function (size) {
            console.log("igc on_resize_callback:", size.width, size.height);
            this.is_resize_back = true;
            var self = this;
            this.banner_size = size;
            self.ad_param.width = size.width;
            if (self.ad_param.is_set_position) {
                if (self.top_offset > 0) {
                    self.ad_instance.style.top = self.top_offset;
                }
                else {
                    self.ad_instance.style.top = self.ad_param.top_offset;
                }
            }
            else {
                self.ad_instance.style.top = self.ad_param.windowHeight - size.height - self.ad_param.top_offset;
            }
            self.ad_instance.style.left = (self.ad_param.windowWidth - self.ad_param.width) / 2;
            console.log("igc on_resize_callback left:" + self.ad_instance.style.left + ",top:" + self.ad_instance.style.top + ",width:" + self.ad_instance.style.width);
        };
        ad_banner_qq.prototype.set_ad_position = function (param) {
            this.ad_param && (this.ad_param.is_set_position = param.top_offset > 0);
            var top_offset = param.top_offset > 0 ? param.top_offset : 0;
            this.top_offset = top_offset;
            if (!this.is_resize_back) {
                console.error("igc ----- ad_banner_qq is no run on_resize_callback");
                return;
            }
            if (this.ad_instance && this.ad_instance.style) {
                if (top_offset > 0) {
                    this.ad_instance.style.top = top_offset;
                }
            }
            if (this.ad_instance && this.ad_instance.style && this.banner_size) {
                if (top_offset <= 0 && this.banner_size && this.ad_param) {
                    this.ad_instance.style.top = this.ad_param.windowHeight - this.banner_size.height - 20;
                }
            }
        };
        ad_banner_qq.prototype.show_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc banner show_ad ad_status: ", this.ad_status);
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.show, "", "", param.ad_scene, "0", self.ad_op);
                var adshow = this.ad_instance.show();
                adshow && adshow.then(function () {
                    console.log("igc banner show succ result");
                    self.on_show(param);
                }).catch(function (err) {
                    console.log("igc banner show error result:", JSON.stringify(err));
                });
            }
        };
        ad_banner_qq.prototype.hide_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " hide_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc banner hide_ad ad_status: ", this.ad_status);
                if (this.ad_status < igc.e_ad_status.show) {
                    return;
                }
                self.ad_op = igc.e_ad_op.hide;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.hide, "", "", param.ad_scene, "0", self.ad_op);
                this.ad_instance.hide();
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onhide, "", "", param.ad_scene, "0", self.ad_op);
            }
        };
        ad_banner_qq.prototype.destroy_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " destroy_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.destroy;
                this.release();
            }
        };
        ad_banner_qq.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_load.call(this, param, res);
            this.show_ad(param);
        };
        ad_banner_qq.prototype.on_error = function (param, err) {
            console.log("igc banner on_error res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, param.ad_scene, "0", self.ad_op);
            this.release();
        };
        return ad_banner_qq;
    }(igc.ad_base));
    igc.ad_banner_qq = ad_banner_qq;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_block_qq = (function (_super) {
        __extends(ad_block_qq, _super);
        function ad_block_qq() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.show_num = 0;
            _this.is_showing = false;
            _this.is_resize_back = false;
            _this.top_offset = 0;
            return _this;
        }
        ad_block_qq.prototype.release = function () {
            this.ad_param && console.log("igc block ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
        };
        ad_block_qq.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc block ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            this.is_resize_back = false;
            var style = param.style || {};
            var size = param.size || 5;
            if (size < 1 || size > 5) {
                size = 5;
            }
            var orientation = param.orientation || "landscape";
            console.log("igc block style:" + JSON.stringify(style) + " ,size:" + size + " ,orientation" + orientation);
            this.ad_instance = window["qq"].createBlockAd({
                adUnitId: param.ad_id,
                style: style,
                size: size,
                orientation: orientation,
            });
            this.ad_instance.offLoad && this.ad_instance.offLoad();
            this.ad_instance.offError && this.ad_instance.offError();
            this.ad_instance.offResize && this.ad_instance.offResize();
            this.ad_instance.onError(self.on_error_callback.bind(self));
            this.ad_instance.onLoad(self.on_load_callback.bind(self));
            this.ad_instance.onResize(self.on_resize_callback.bind(self));
        };
        ad_block_qq.prototype.set_ad_position = function (param) {
            if (this.ad_param.orientation == "landscape" && this.is_showing) {
                console.log("igc ad_block_qq set_ad_position");
                this.ad_param && (this.ad_param.is_set_position = param.top_offset > 0);
                var top_offset = param.top_offset > 0 ? param.top_offset : 0;
                this.top_offset = top_offset;
                if (!this.is_resize_back) {
                    console.error("igc ----- ad_block_qq is no run on_resize_callback");
                    return;
                }
                if (this.ad_instance && this.ad_instance.style) {
                    if (top_offset > 0) {
                        this.ad_instance.style.top = top_offset;
                    }
                }
                if (this.ad_instance && this.ad_instance.style && this.block_size) {
                    if (top_offset > 0) {
                    }
                    else if (this.block_size && this.ad_param) {
                        this.ad_instance.style.top = this.ad_param.windowHeight - this.block_size.height - 20;
                    }
                }
            }
        };
        ad_block_qq.prototype.on_error_callback = function (err) {
            this.on_error(this.ad_param, err);
        };
        ad_block_qq.prototype.on_load_callback = function () {
            var self = this;
            if (!self) {
                console.log("igc block on_load_callback self null");
            }
            if (!self.ad_instance) {
                console.log("igc block on_load_callback self.ad_instance null");
            }
            if (!self.ad_instance.offLoad) {
                console.log("igc block on_load_callback self.ad_instance.offLoad null");
            }
            self.ad_instance && self.ad_instance.offLoad && self.ad_instance.offLoad(self.on_load_callback);
            self.on_load(this.ad_param, {});
        };
        ad_block_qq.prototype.on_resize_callback = function (size) {
            console.log("igc block on_resize_callback:", size.width, size.height);
            var self = this;
            self.is_resize_back = true;
            self.ad_param.width = size.width;
            self.block_size = size;
            if (self.ad_param.orientation == "landscape") {
                self.ad_instance.style.left = Math.floor((self.ad_param.windowWidth - size.width) / 2) - 2;
                if (self.ad_param.is_set_position) {
                    if (self.top_offset > 0) {
                        self.ad_instance.style.top = self.top_offset;
                    }
                    else {
                        self.ad_instance.style.top = self.ad_param.top_offset;
                    }
                }
                else {
                    self.ad_instance.style.top = self.ad_param.windowHeight - size.height - self.ad_param.bottom_offset - 20;
                }
            }
            else if (self.ad_param.orientation == "vertical") {
                if (self.ad_param.vertical_center_y && self.ad_param.vertical_center_y > -8888888) {
                    self.ad_instance.style.top = (self.ad_param.windowHeight - size.height) / 2 + self.ad_param.vertical_center_y;
                }
                if (self.ad_param.vertical_right && self.ad_param.vertical_right > 0) {
                    self.ad_instance.style.left = self.ad_param.windowWidth - size.width - self.ad_param.vertical_right;
                }
            }
            console.log("igc on_resize_callback left:" + self.ad_instance.style.left + ",top:" + self.ad_instance.style.top + ",width:" + self.ad_instance.style.width);
        };
        ad_block_qq.prototype.show_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc block ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc block show_ad ad_status: ", this.ad_status);
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.show, "", "", param.ad_scene, "0", self.ad_op);
                var adshow = this.ad_instance.show();
                adshow && adshow.then(function () {
                    console.log("igc block show succ result");
                    self.on_show(param);
                    self.is_showing = true;
                }).catch(function (err) {
                    console.log("igc block show error result:", JSON.stringify(err));
                });
            }
        };
        ad_block_qq.prototype.hide_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc block ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " hide_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc block hide_ad ad_status: ", this.ad_status);
                if (this.ad_status < igc.e_ad_status.show) {
                    return;
                }
                self.ad_op = igc.e_ad_op.hide;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.hide, "", "", param.ad_scene, "0", self.ad_op);
                this.ad_instance.hide();
                self.is_showing = false;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onhide, "", "", param.ad_scene, "0", self.ad_op);
            }
        };
        ad_block_qq.prototype.destroy_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc block ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " destroy_ad");
            var self = this;
            self.is_showing = false;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.destroy;
                this.release();
            }
        };
        ad_block_qq.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_load.call(this, param, res);
            this.show_ad(param);
        };
        ad_block_qq.prototype.on_error = function (param, err) {
            console.log("igc block on_error res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, param.ad_scene, "0", self.ad_op);
            this.release();
        };
        return ad_block_qq;
    }(igc.ad_base));
    igc.ad_block_qq = ad_block_qq;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_interstitial_qq = (function (_super) {
        __extends(ad_interstitial_qq, _super);
        function ad_interstitial_qq() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.is_first = true;
            return _this;
        }
        ad_interstitial_qq.prototype.release = function () {
            this.ad_param && console.log("igc interstitial ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offClose(this.on_close_callback.bind(this));
                this.ad_instance = null;
                this.ad_param = null;
            }
            _super.prototype.release.call(this);
        };
        ad_interstitial_qq.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc interstitial ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_instance = window["qq"].createInterstitialAd({
                adUnitId: param.ad_id,
            });
            if (this.is_first === true) {
                this.ad_instance.onError(this.on_error_callback.bind(this));
                this.is_first = false;
            }
            this.ad_instance.onClose(this.on_close_callback.bind(this));
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.load().then(function () {
                console.log("igc 加载qq插屏成功，调用展示show", param.ad_id);
                self.on_load(param, {});
                if (self.ad_param && self.ad_param.auto_show !== false) {
                    self.show_ad(self.ad_param);
                }
            })
                .catch(function (err) {
                console.log("igc 加载头条插屏失败，调用展示show", param.ad_id);
                console.log(err);
            });
        };
        ad_interstitial_qq.prototype.on_error_callback = function (err) {
            var self = this;
            self.on_error(self.ad_param, err);
        };
        ad_interstitial_qq.prototype.on_close_callback = function () {
            var self = this;
            self.on_close(self.ad_param, {});
        };
        ad_interstitial_qq.prototype.show_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc interstitial ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
            console.log("igc interstitial show_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.show, "", "", self.ad_param.ad_scene, "0", self.ad_op);
                this.ad_instance.show().then(function () {
                    console.log('igc show succ 1');
                    self.on_show(param);
                }).catch(function (err) {
                    console.log("igc show cache err");
                });
            }
        };
        ad_interstitial_qq.prototype.on_close = function (param, res) {
            console.log("igc interstitial on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_close.call(this, param, res);
            if (!this.ad_instance) {
                return;
            }
            var self = this;
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, "", "", self.ad_param.ad_scene, "0", self.ad_op);
            if (self.ad_param && self.ad_param.onClose) {
                self.ad_param.onClose(self.ad_param, {});
            }
            this.ad_status = igc.e_ad_status.close;
            this.release();
        };
        ad_interstitial_qq.prototype.on_error = function (param, err) {
            console.log("igc interstitial on_error res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            _super.prototype.on_error.call(this, param, err);
            this.release();
        };
        ad_interstitial_qq.prototype.on_show = function (param) {
            console.log("igc interstitial on_show succ");
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_show.call(this, param);
        };
        return ad_interstitial_qq;
    }(igc.ad_base));
    igc.ad_interstitial_qq = ad_interstitial_qq;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_video_qq = (function (_super) {
        __extends(ad_video_qq, _super);
        function ad_video_qq() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.is_first = true;
            return _this;
        }
        ad_video_qq.prototype.release = function () {
            this.ad_param && console.log("igc video ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            this.ad_param = null;
        };
        ad_video_qq.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc video ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            var extra = param.extra || "";
            igc.stat_manager.instance.send_user_event(param.ad_pos_id + "", igc.igc_stat_ids.video_click, "", "", extra, "", "", "", "");
            this.ad_instance = window["qq"].createRewardedVideoAd({
                adUnitId: param.ad_id,
            });
            if (this.is_first === true) {
                this.ad_instance.onError(self.on_error_callback.bind(self));
                this.ad_instance.onClose(self.on_close_callback.bind(self));
                this.is_first = false;
            }
            console.log("11111111111111111111111111111111111");
            self.ad_op = igc.e_ad_op.load;
            self.ad_instance
                .show()
                .then(function () {
                console.log("广告显示成功");
                self.on_load(param, {});
                self.ad_op = igc.e_ad_op.show;
                self.on_show(param);
            })
                .catch(function (err) {
                console.log("广告组件出现问题", err);
                self.ad_op = igc.e_ad_op.load;
                self.ad_instance.load().then(function () {
                    console.log("手动加载成功");
                    self.on_load(param, {});
                    self.ad_op = igc.e_ad_op.show;
                    self.ad_instance.show().then(function () {
                        console.log("广告显示成功 2");
                        self.ad_op = igc.e_ad_op.show;
                        self.on_show(param);
                    }).catch(function (err) {
                        console.log("广告显示error 2-----------");
                    });
                });
            });
        };
        ad_video_qq.prototype.on_error_callback = function (err) {
            var self = this;
            self.on_error(self.ad_param, err);
        };
        ad_video_qq.prototype.on_close_callback = function (res) {
            var self = this;
            if (!self.ad_instance) {
                console.log("igc on_load_callback self.ad_instance null");
            }
            if (!self.ad_instance.offClose) {
                console.log("igc on_load_callback self.ad_instance.offClose null");
            }
            self.ad_instance && self.ad_instance.offClose && self.ad_instance.offClose(self.on_close_callback.bind(self));
            self.on_close(self.ad_param, res);
        };
        ad_video_qq.prototype.on_load = function (param, res) {
            if (!this.ad_instance || !this.ad_param) {
                return;
            }
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_load.call(this, param, res);
        };
        ad_video_qq.prototype.on_error = function (param, err) {
            console.log("igc video on_err res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            this.release();
        };
        ad_video_qq.prototype.on_close = function (param, res) {
            console.log("igc video on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_close.call(this, param, res);
            if (res && res.isEnded) {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: res.isEnded });
                }
                self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.complete, "", self.ad_param.ad_scene, "0", self.ad_op);
                igc.stat_manager.instance.send_user_event(self.ad_param.ad_pos_id + "", igc.igc_stat_ids.video_compelete, "", "", "", "", "", "", "");
            }
            else {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: false });
                }
                self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.uncomplete, "", self.ad_param.ad_scene, "0", self.ad_op);
                igc.stat_manager.instance.send_user_event(self.ad_param.ad_pos_id + "", igc.igc_stat_ids.video_uncompelete, "", "", "", "", "", "", "");
            }
            this.release();
        };
        return ad_video_qq;
    }(igc.ad_base));
    igc.ad_video_qq = ad_video_qq;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_ad_tt = (function (_super) {
        __extends(channel_ad_tt, _super);
        function channel_ad_tt() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.ad_sysInfo = null;
            _this.can_inter = true;
            _this.can_ad = true;
            return _this;
        }
        channel_ad_tt.prototype.init = function () {
            _super.prototype.init.call(this);
            this.ad_sysInfo = window["tt"].getSystemInfoSync();
            var isToutiaio = window["tt"].getSystemInfoSync().appName === "Toutiao";
            if (!isToutiaio) {
                this.can_inter = false;
            }
            var compare_ad = igc.utils_manager.compare_version(this.ad_sysInfo.SDKVersion, "1.3.0");
            if (compare_ad == -1) {
                this.can_ad = false;
            }
            this.support_method[igc.e_method_type.create_ad] = true;
            this.support_method[igc.e_method_type.destroy_ad] = true;
            this.support_method[igc.e_method_type.show_ad] = true;
            this.support_method[igc.e_method_type.hide_ad] = true;
            this.support_method[igc.e_method_type.has_ad] = true;
        };
        channel_ad_tt.prototype.has_ad = function (param) {
            if (!this.can_ad) {
                return false;
            }
            if (param && param.ad_type === igc.e_ad_type.interstitial) {
                return this.can_inter;
            }
            return true;
        };
        channel_ad_tt.prototype.create_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (!this.has_ad(param)) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.create_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.create_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.create_ad_interstitial(param);
            }
            else {
                return false;
            }
        };
        channel_ad_tt.prototype.create_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.destroy_ad(param);
                this.ad_banner = null;
            }
            var width = param.width || 200;
            if (width > 208) {
                width = 208;
            }
            else if (width < 128) {
                width = 128;
            }
            var left = (this.ad_sysInfo.windowWidth - width) / 2;
            var top = this.ad_sysInfo.windowHeight - (width / 16 * 9);
            param.style = {
                left: left,
                top: top,
                width: width,
            };
            param.width = width;
            param.windowHeight = this.ad_sysInfo.windowHeight;
            param.windowWidth = this.ad_sysInfo.windowWidth;
            this.ad_banner = new igc.ad_banner_tt();
            this.ad_banner.create(param);
        };
        channel_ad_tt.prototype.create_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.create(param);
            }
            else {
                this.ad_video = new igc.ad_video_tt();
                this.ad_video.create(param);
            }
        };
        channel_ad_tt.prototype.create_ad_interstitial = function (param) {
            var isToutiaio = window["tt"].getSystemInfoSync().appName === "Toutiao";
            if (!isToutiaio) {
                console.log("不是头条不支持插屏", window["tt"].getSystemInfoSync().appName);
                return;
            }
            this.ad_interstitial = new igc.ad_interstitial_tt();
            this.ad_interstitial.create(param);
        };
        channel_ad_tt.prototype.show_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.show_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.show_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.show_ad_interstitial(param);
            }
            else {
                return false;
            }
        };
        channel_ad_tt.prototype.show_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_tt.prototype.show_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_tt.prototype.show_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_tt.prototype.hide_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.hide_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.hide_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.hide_ad_interstitial(param);
            }
            else {
                return false;
            }
        };
        channel_ad_tt.prototype.hide_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.hide_ad(param);
            }
        };
        channel_ad_tt.prototype.hide_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.hide_ad(param);
            }
        };
        channel_ad_tt.prototype.hide_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.hide_ad(param);
            }
        };
        channel_ad_tt.prototype.destroy_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.destroy_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.destroy_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.destroy_ad_interstitial(param);
            }
            else {
                return false;
            }
        };
        channel_ad_tt.prototype.destroy_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.destroy_ad(param);
                this.ad_banner = null;
            }
        };
        channel_ad_tt.prototype.destroy_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.destroy_ad(param);
            }
        };
        channel_ad_tt.prototype.destroy_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.destroy_ad(param);
            }
        };
        return channel_ad_tt;
    }(igc.channel_facade_ad_base));
    igc.channel_ad_tt = channel_ad_tt;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_share_tt = (function (_super) {
        __extends(channel_share_tt, _super);
        function channel_share_tt() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._isStart = false;
            _this._isPause = false;
            _this._inner_time = 0;
            _this.timer_func = null;
            _this._max_time = 300;
            return _this;
        }
        channel_share_tt.prototype.init = function () {
            _super.prototype.init.call(this);
            this.register_listener();
            this.support_method[igc.e_method_type.share] = true;
            this.support_method[igc.e_method_type.on_share_app_message] = true;
            this.support_method[igc.e_method_type.start_record_screen] = true;
            this.support_method[igc.e_method_type.stop_record_screen] = true;
            this.support_method[igc.e_method_type.pause_record_screen] = true;
            this.support_method[igc.e_method_type.resume_record_screen] = true;
            this.support_method[igc.e_method_type.share_record_screen] = true;
            this.support_method[igc.e_method_type.get_record_video] = true;
        };
        channel_share_tt.prototype.register_listener = function () {
        };
        channel_share_tt.prototype.on_share_app_message = function (param) {
            var query = "type=" + igc.e_share_type.card + "&k2=v2";
            if (param && param.userId && param.userId != "") {
                query = "type=" + igc.e_share_type.card + "&userId=" + param.userId;
            }
            window["tt"].showShareMenu({
                withShareTicket: true
            });
            window["tt"].onShareAppMessage(function () {
                return {
                    title: param.title,
                    imageUrl: param.imageUrl,
                    query: query,
                };
            });
        };
        channel_share_tt.prototype.share = function (param) {
            var query = "type=" + igc.e_share_type.card + "&k2=v2";
            if (param && param.userId && param.userId != "") {
                query = "type=" + igc.e_share_type.card + "&userId=" + param.userId;
            }
            window["tt"].shareAppMessage({
                channel: param.channel || "",
                templateId: param.templateId || "",
                desc: param.desc || "",
                title: param.title || "",
                imageUrl: param.imageUrl || "",
                query: query,
                extra: param.extra || {},
                success: function (res) {
                    param.success && param.success(res);
                },
                fail: function (res) {
                    param.success && param.success(res);
                }
            });
        };
        channel_share_tt.prototype.start_record_screen = function (param) {
            if (!window["tt"]) {
                console.log("record 当前渠道不支持录屏");
                return;
            }
            if (this._isStart) {
                console.log("record 已经在录屏，请勿重复录制");
                return;
            }
            if (!window["tt"].getGameRecorderManager) {
                console.log("record 当前环境没有录屏接口");
                return;
            }
            var self = this;
            var time = self._max_time;
            if (param && param.time) {
                time = param.time;
                self._max_time = param.time;
            }
            if (!self._recorder) {
                self._recorder = window["tt"].getGameRecorderManager();
                self._recorder.onStart(function (res) {
                    console.log("record 开始录屏");
                    self._isStart = true;
                    self._inner_time = 0;
                });
                self._recorder.onPause(function (res) {
                    console.log("record 暂停录屏");
                    self._isPause = true;
                });
                self._recorder.onResume(function (res) {
                    console.log("record 恢复录屏");
                    self._isPause = false;
                });
                self._recorder.onStop(function (res) {
                    if (param.is_clip_end) {
                        self.clipVideo({
                            videoPath: res.videoPath,
                            time: Math.min(param.clip_time, self._inner_time),
                            call_back: function (clip_res) {
                                self._videoPath = clip_res.videoPath;
                                console.log("record 录屏结束 录屏时长", Math.min(param.clip_time, self._inner_time));
                                self._isStart = false;
                                self._isPause = false;
                            }
                        });
                    }
                    else {
                        self._videoPath = res.videoPath;
                        console.log("record 录屏结束", self._videoPath);
                        self._isStart = false;
                        self._isPause = false;
                    }
                });
                self._recorder.onError(function (err) {
                    console.log("record 录屏发生错误", err);
                });
            }
            self._recorder.start({
                duration: time,
            });
            this.start_timer();
        };
        channel_share_tt.prototype.start_timer = function () {
            var self = this;
            this.timer_func = function () {
                if (self._isStart && !self._isPause) {
                    self._inner_time++;
                    if (self._inner_time >= self._max_time) {
                        self.stop_record_screen();
                    }
                }
            };
            window["Laya"].timer.loop(1000, this, this.timer_func);
        };
        channel_share_tt.prototype.stop_record_screen = function () {
            var self = this;
            if (!self._isStart || !window["tt"]) {
                console.log("record 录屏没开始不能结束");
                return;
            }
            window["Laya"].timer.clear(this, this.timer_func);
            if (self._recorder) {
                self._recorder.stop();
            }
        };
        channel_share_tt.prototype.pause_record_screen = function () {
            var self = this;
            if (!self._isStart || !window["tt"]) {
                console.log("record 录屏没开始不能暂停");
                return;
            }
            if (self._recorder) {
                self._recorder.pause();
            }
        };
        channel_share_tt.prototype.resume_record_screen = function () {
            var self = this;
            if (!self._isStart || !self._isPause || !window["tt"]) {
                console.log("record 录屏没有开始 或者 没有暂停", self._isStart, self._isPause);
                return;
            }
            if (self._recorder) {
                self._recorder.resume();
            }
        };
        channel_share_tt.prototype.share_record_screen = function (param) {
            var self = this;
            if (!window["tt"]) {
                console.log("record 当前渠道不支持头条分享");
                return;
            }
            if (!this._videoPath) {
                console.log("record 视频录制失败,请重新录制！");
                return;
            }
            if (self._inner_time <= 3) {
                igc.stat_manager.instance.send_user_event(igc.e_share_event_id.share_record_less_time, igc.e_share_event_type.share, 0, 0, "");
                param.fail && param.fail();
                return;
            }
            igc.stat_manager.instance.send_user_event(igc.e_share_event_id.click_record, igc.e_share_event_type.share, 0, 0, "");
            var query = "type=" + igc.e_share_type.record + "&k2=v2";
            if (param && param.userId && param.userId != "") {
                query = "type=" + igc.e_share_type.record + "&userId=" + param.userId;
            }
            window["tt"].shareAppMessage({
                channel: 'video',
                title: param.title,
                desc: param.desc,
                imageUrl: '',
                templateId: '',
                query: query,
                extra: {
                    videoPath: self._videoPath,
                    videoTopics: param.videoTopics,
                    hashtag_list: param.videoTopics,
                    video_title: param.video_title || ""
                },
                success: function () {
                    console.log('record 分享视频成功');
                    param.success && param.success();
                    igc.stat_manager.instance.send_user_event(igc.e_share_event_id.share_record_success, igc.e_share_event_type.share, 0, 0, "");
                },
                fail: function (e) {
                    console.log('record 分享视频失败');
                    igc.stat_manager.instance.send_user_event(igc.e_share_event_id.share_record_fail, igc.e_share_event_type.share, 0, 0, "");
                    param.fail && param.fail();
                }
            });
        };
        channel_share_tt.prototype.get_record_video = function () {
            if (this._videoPath && this._inner_time <= 3) {
                return this._videoPath;
            }
            return undefined;
        };
        channel_share_tt.prototype.clipVideo = function (param) {
            var self = this;
            if (!self._isStart || !window["tt"]) {
                console.log("record 录屏没开始不能截取拼接录屏");
                return;
            }
            if (self._recorder) {
                self._recorder.clipVideo({
                    path: param.videoPath,
                    timeRange: [param.time, 0],
                    success: function (res) {
                        param.call_back && param.call_back(res);
                    }
                });
            }
        };
        return channel_share_tt;
    }(igc.channel_facade_share_base));
    igc.channel_share_tt = channel_share_tt;
    window["channel_share_tt"] = channel_share_tt;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_system_tt = (function (_super) {
        __extends(channel_system_tt, _super);
        function channel_system_tt() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_system_tt.prototype.init = function () {
            _super.prototype.init.call(this);
            this.register_listener();
            this.support_method[igc.e_method_type.get_system_info_sync] = true;
            this.support_method[igc.e_method_type.get_launch_options_sync] = true;
            this.support_method[igc.e_method_type.exit_mini_program] = true;
            this.support_method[igc.e_method_type.on_show] = true;
            this.support_method[igc.e_method_type.on_hide] = true;
        };
        channel_system_tt.prototype.register_listener = function () {
        };
        channel_system_tt.prototype.get_system_info_sync = function () {
            var system_info = window["tt"].getSystemInfoSync();
            var info = {
                brand: system_info.brand,
                model: system_info.model,
                pixelRatio: system_info.pixelRatio,
                screenWidth: system_info.screenWidth,
                screenHeight: system_info.screenHeight,
                windowWidth: system_info.windowWidth,
                windowHeight: system_info.windowHeight,
                statusBarHeight: system_info.statusBarHeight,
                language: system_info.language,
                version: system_info.version,
                platform: system_info.platform,
                system: system_info.system,
                platformVersion: system_info.SDKVersion,
                extra: system_info
            };
            return info;
        };
        channel_system_tt.prototype.get_launch_options_sync = function () {
            var launch_options = window["tt"].getLaunchOptionsSync();
            var info = {
                query: launch_options.query,
                extra: launch_options.extra,
            };
            return info;
        };
        channel_system_tt.prototype.exit_mini_program = function () {
            return window["tt"].exitMiniProgram();
        };
        channel_system_tt.prototype.on_show = function (param) {
            return window["tt"].onShow(function (res) {
                param.on_show && param.on_show(res);
            });
        };
        channel_system_tt.prototype.on_hide = function (param) {
            return window["tt"].onHide(function (res) {
                param.on_hide && param.on_hide(res);
            });
        };
        return channel_system_tt;
    }(igc.channel_facade_share_base));
    igc.channel_system_tt = channel_system_tt;
    window["channel_system_tt"] = channel_system_tt;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_user_tt = (function (_super) {
        __extends(channel_user_tt, _super);
        function channel_user_tt() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isLogin = false;
            _this.code = "";
            _this.anonymousCode = "";
            _this.needAuth = true;
            _this.app_launch_options = [];
            _this.more_game_btn = null;
            _this.show_more_game_modal_init = false;
            return _this;
        }
        channel_user_tt.prototype.init = function () {
            _super.prototype.init.call(this);
            this.support_method[igc.e_method_type.login] = true;
            this.support_method[igc.e_method_type.share] = true;
            this.support_method[igc.e_method_type.show_loading] = true;
            this.support_method[igc.e_method_type.show_toast] = true;
            this.support_method[igc.e_method_type.show_modal] = true;
            this.support_method[igc.e_method_type.on_show] = true;
            this.support_method[igc.e_method_type.on_hide] = true;
            this.support_method[igc.e_method_type.navigate_to_mini_program] = true;
            this.support_method[igc.e_method_type.get_system_info_sync] = true;
            this.support_method[igc.e_method_type.create_inner_audio_context] = true;
            this.support_method[igc.e_method_type.post_message] = true;
            this.support_method[igc.e_method_type.set_user_cloud_storage] = true;
            this.support_method[igc.e_method_type.get_setting] = true;
            this.support_method[igc.e_method_type.create_user_info_button] = true;
            this.support_method[igc.e_method_type.open_setting] = true;
            this.support_method[igc.e_method_type.authorize] = true;
            this.support_method[igc.e_method_type.get_device] = true;
            this.support_method[igc.e_method_type.device_shake] = true;
            this.support_method[igc.e_method_type.check_can_add_desktop] = false;
            this.support_method[igc.e_method_type.check_is_add_desktop] = false;
            this.support_method[igc.e_method_type.add_desktop] = false;
            this.support_method[igc.e_method_type.get_launch_options_sync] = true;
            this.support_method[igc.e_method_type.get_invite_query] = true;
            window["tt"].getSystemInfo({
                success: function (res) {
                    console.log("igc xiejinhui tt\u624B\u673A\u578B\u53F7\u4E3A " + res.model);
                    igc.stat_manager.instance._osInfo = res.model || "";
                    igc.stat_manager.instance._opInfo = res.SDKVersion;
                },
                fail: function (res) {
                    console.log("\u83B7\u53D6\u7CFB\u7EDF\u4FE1\u606F\u5931\u8D25");
                }
            });
            this.support_method[igc.e_method_type.show_more_game_modal] = true;
            this.support_method[igc.e_method_type.check_show_more_game] = true;
            this.support_method[igc.e_method_type.more_game_btn_tap] = true;
            this.support_method[igc.e_method_type.more_game_btn_show] = true;
            this.support_method[igc.e_method_type.more_game_btn_hide] = true;
        };
        channel_user_tt.prototype.login = function (login_param, callback) {
            console.log("start tt login");
            var self = this;
            window["tt"] && window["tt"].login({
                force: false,
                success: function (res) {
                    console.log("xiejinhui tt 是否处于登陆状态：", res.isLogin);
                    console.log("xiejinhui tt 临时登陆凭证", res.code);
                    console.log("xiejinhui tt 用于标识设备的code：", res.anonymousCode);
                    self.isLogin = res.isLogin;
                    self.code = res.code;
                    self.anonymousCode = res.anonymousCode;
                    if (igc.igc_main.instance.app_config.game_param.needAuth === false) {
                        self.needAuth = false;
                    }
                    if (self.isLogin && self.needAuth) {
                        self.get_tt_user_info(callback);
                    }
                    else {
                        self.on_login_result(igc.e_channel_code.login_success, {}, callback);
                    }
                },
                fail: function (res) {
                    console.log("tt login\u8C03\u7528\u5931\u8D25");
                    self.on_login_result(igc.e_channel_code.login_fail, res, callback);
                }
            });
        };
        channel_user_tt.prototype.get_tt_user_info = function (callback) {
            var self = this;
            window["tt"] && window["tt"].getUserInfo({
                withCredentials: false,
                success: function (res) {
                    console.log("getUserInfo\u8C03\u7528\u6210\u529F", res.userInfo);
                    self.on_login_result(igc.e_channel_code.login_success, res.userInfo, callback);
                },
                fail: function (res) {
                    console.log("getUserInfo\u8C03\u7528\u5931\u8D25");
                    self.on_login_result(igc.e_channel_code.login_success, {}, callback);
                },
            });
        };
        channel_user_tt.prototype.on_login_result = function (retcode, param, callback) {
            var self = this;
            if (retcode == igc.e_channel_code.login_success) {
                var user_info = this.config_channel_user_info(param, function (param) {
                    var user_info = {};
                    var uid = self.isLogin ? self.code : "";
                    var token = self.isLogin ? "" : self.anonymousCode;
                    console.log("xiejinhui channel_user_tt login_result", uid, token);
                    if (self.isLogin && param && param.avatarUrl) {
                        user_info = {
                            uid: uid,
                            token: token,
                            nickName: param.nickName,
                            avatar: param.avatarUrl,
                            sex: param.gender,
                            birthday: "",
                            phoneNum: "",
                            location: param.city,
                            isLogin: self.isLogin,
                            extra: ""
                        };
                    }
                    else {
                        var tourise_info = self.get_tourise_info();
                        user_info = {
                            uid: uid,
                            token: token,
                            nickName: tourise_info.userName,
                            avatar: "",
                            sex: "",
                            birthday: "",
                            phoneNum: "",
                            location: "",
                            extra: ""
                        };
                    }
                    return user_info;
                });
                callback({ errorcode: igc.e_channel_code.login_success, errormsg: "success", sdk_errorcode: 0, sdk_errormsg: "", channel_user_info: user_info });
            }
            else {
                callback({ errorcode: igc.e_channel_code.login_fail, errormsg: "fail", sdk_errorcode: -1, sdk_errormsg: JSON.stringify(param), channel_user_info: {} });
            }
        };
        channel_user_tt.prototype.share = function (param) {
            if (window["tt"] !== undefined && window["tt"].shareAppMessage) {
                return window["tt"].shareAppMessage({
                    templateId: param.templateId,
                    success: function (res) {
                        param.on_succeed && param.on_succeed(res);
                    },
                    fail: function (res) {
                        param.on_failed && param.on_failed(res);
                    }
                });
            }
        };
        channel_user_tt.prototype.show_loading = function (param) {
            if (param.is_show) {
                return window["tt"].showLoading({
                    title: param.title,
                    mask: param.mask
                });
            }
            else {
                return window["tt"].hideLoading();
            }
        };
        channel_user_tt.prototype.show_toast = function (param) {
            return window["tt"].showToast({
                title: param.title,
                icon: param.icon,
                duration: param.duration
            });
        };
        channel_user_tt.prototype.show_modal = function (param) {
            return window["tt"].showModal({
                title: param.title,
                content: param.content,
                showCancel: param.show_cancel,
                cancelText: param.cancel_text,
                confirmText: param.confirm_text,
                success: function (res) {
                    if (res.confirm) {
                        param.on_succeed && param.on_succeed();
                    }
                    else if (res.cancel) {
                        console.log('cancel, cold');
                    }
                    else {
                    }
                },
                fail: function (res) {
                    console.log("showModal\u8C03\u7528\u5931\u8D25");
                    param.on_failed && param.on_failed(res);
                }
            });
        };
        channel_user_tt.prototype.on_show = function (param) {
            return window["tt"].onShow(function (res) {
                param.on_show && param.on_show(res);
            });
        };
        channel_user_tt.prototype.on_hide = function (param) {
            return window["tt"].onHide(function (res) {
                param.on_hide && param.on_hide(res);
            });
        };
        channel_user_tt.prototype.navigate_to_mini_program = function (param) {
            return window["tt"].navigateToMiniProgram({
                appId: param.app_id,
                extraData: {
                    src_app_id: param.cur_app_id,
                    src_pkg_name: param.cur_pkg_name,
                    src_tpf_pid: param.tpf_pid,
                    src_tpf_uid: param.tpf_uid
                },
                success: param.on_succeed,
                fail: param.fail,
            });
        };
        channel_user_tt.prototype.get_launch_options_sync = function () {
            return window["tt"].getLaunchOptionsSync();
        };
        channel_user_tt.prototype.check_appLaunchOptions = function (param) {
            for (var i = 0; i < param.app_list.length; ++i) {
                var temp = {
                    appId: param.app_list[i],
                    query: "foo=bar&baz=qux",
                    extraData: {
                        src_app_id: igc.igc_main.instance.app_config.game_param.app_id,
                        src_pkg_name: igc.igc_main.instance.app_config.game_param.pkg_name,
                        src_tpf_pid: "0",
                        src_tpf_uid: igc.stat_manager.instance._account + ""
                    }
                };
                this.app_launch_options.push(temp);
            }
            param.btn_info.appLaunchOptions = this.app_launch_options;
        };
        channel_user_tt.prototype.check_show_more_game = function (param) {
            var systemInfo = window["tt"].getSystemInfoSync();
            if (systemInfo.platform !== "ios") {
                this.check_appLaunchOptions(param);
                var compare = igc.utils_manager.compare_version(systemInfo.SDKVersion, "1.33.0");
                if (compare == -1) {
                    return 0;
                }
                return 1;
            }
            return 0;
        };
        channel_user_tt.prototype.create_more_games_button = function (param) {
            if (param && param.btn_info) {
                this.more_game_btn = window["tt"].createMoreGamesButton({
                    type: param.btn_info.type,
                    image: param.btn_info.image,
                    style: param.btn_info.style,
                    appLaunchOptions: param.btn_info.appLaunchOptions,
                    onNavigateToMiniGame: function (res) {
                        console.log("跳转其他小游戏", res);
                    }
                });
                return this.more_game_btn;
            }
            return null;
        };
        channel_user_tt.prototype.more_game_btn_tap = function () {
            if (!this.more_game_btn) {
                return;
            }
            this.more_game_btn.onTap(function () {
                console.log("more_game_btn_tap");
                igc.stat_manager.instance.send_user_event(1, igc.e_multual_push_report.more_game_btn_tap, 1, 1, "");
            });
        };
        channel_user_tt.prototype.more_game_btn_show = function () {
            if (!this.more_game_btn) {
                return;
            }
            this.more_game_btn.show();
        };
        channel_user_tt.prototype.more_game_btn_hide = function () {
            if (!this.more_game_btn) {
                return;
            }
            this.more_game_btn.hide();
        };
        channel_user_tt.prototype.show_more_game_modal = function () {
            var self = this;
            if (this.show_more_game_modal_init == false) {
                window["tt"].onMoreGamesModalClose(function (res) {
                    console.log("modal closed", res);
                    igc.stat_manager.instance.send_user_event(1, igc.e_multual_push_report.on_more_games_modal_close, 1, 1, "");
                });
                window["tt"].onNavigateToMiniProgram(function (res) {
                    console.log(res.errCode);
                    console.log(res.errMsg);
                    igc.stat_manager.instance.send_user_event(1, igc.e_multual_push_report.on_navigate_to_miniProgram, 1, 1, res.errCode + "", res.errMsg);
                });
                this.show_more_game_modal_init = true;
            }
            var systemInfo = window["tt"].getSystemInfoSync();
            console.log("tt systeminfo version:", systemInfo.version);
            console.log("tt systeminfo SDKVersion:", systemInfo.SDKVersion);
            if (systemInfo.platform !== "ios") {
                var compare = igc.utils_manager.compare_version(systemInfo.SDKVersion, "1.33.0");
                if (compare == -1) {
                    return false;
                }
                igc.stat_manager.instance.send_user_event(1, igc.e_multual_push_report.show_more_game_modal, 1, 1, "");
                window["tt"].showMoreGamesModal({
                    appLaunchOptions: self.app_launch_options,
                    success: function (res) {
                        console.log("success", res.errMsg);
                        igc.stat_manager.instance.send_user_event(1, igc.e_multual_push_report.on_show_more_game_modal_success, 1, 1, res.errMsg);
                    },
                    fail: function (res) {
                        console.log("fail", res.errMsg);
                        igc.stat_manager.instance.send_user_event(1, igc.e_multual_push_report.on_show_more_game_modal_fail, 1, 1, res.errMsg);
                    }
                });
                return true;
            }
            return false;
        };
        channel_user_tt.prototype.get_system_info_sync = function (param) {
            return window["tt"].getSystemInfoSync();
        };
        channel_user_tt.prototype.create_inner_audio_context = function (param) {
            return window["tt"].createInnerAudioContext();
        };
        channel_user_tt.prototype.post_message = function (param) {
            return window["tt"].postMessage({
                messageType: param.message_type,
                data: param.data
            });
        };
        channel_user_tt.prototype.set_user_cloud_storage = function (param) {
            return window["tt"].setUserCloudStorage({
                KVDataList: param.kv_data_list,
                success: param.on_succeed,
                fail: param.on_failed,
            });
        };
        channel_user_tt.prototype.get_setting = function (param) {
            return window["tt"].getSetting({
                success: param.on_succeed
            });
        };
        channel_user_tt.prototype.create_user_info_button = function (param) {
            return window["tt"].createUserInfoButton({
                type: param.type,
                image: param.image,
                style: param.style
            });
        };
        channel_user_tt.prototype.open_setting = function (param) {
            return window["tt"].openSetting();
        };
        channel_user_tt.prototype.authorize = function (param) {
            return window["tt"].authorize({
                scope: param.score,
                success: param.on_succeed,
                fail: param.on_failed
            });
        };
        channel_user_tt.prototype.get_device = function (param) {
            window["tt"].getSystemInfo({
                success: function (res) {
                    if (res.platform == "devtools") {
                        return igc.e_device.desktop;
                    }
                    else if (res.platform == "ios") {
                        return igc.e_device.ios;
                    }
                    else if (res.platform == "android") {
                        return igc.e_device.android;
                    }
                    else {
                        return igc.e_device.unknown;
                    }
                }
            });
            return igc.e_device.unknown;
        };
        channel_user_tt.prototype.get_tourise_info = function () {
            var name = localStorage.getItem("tt_username");
            if (!name) {
                name = this.get_random_name();
                localStorage.setItem("tt_username", name);
            }
            var result = {
                "userId": name,
                "userName": name,
                "avatar": ""
            };
            return result;
        };
        channel_user_tt.prototype.device_shake = function (param) {
            window["tt"].vibrateShort({
                success: function (res) {
                    param.on_success && param.on_success();
                },
                fail: function (res) {
                    param.on_failed && param.on_failed();
                },
                complete: function (res) {
                    param.on_complete && param.on_complete();
                }
            });
        };
        channel_user_tt.prototype.get_invite_query = function () {
            var res = window["wx"].getLaunchOptionsSync();
            console.error("tt游戏启动参数----------------->", res);
            return res.query;
        };
        return channel_user_tt;
    }(igc.channel_facade_user_base));
    igc.channel_user_tt = channel_user_tt;
    window["channel_user_tt"] = channel_user_tt;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_banner_tt = (function (_super) {
        __extends(ad_banner_tt, _super);
        function ad_banner_tt() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.show_num = 0;
            _this.is_show_banner = true;
            return _this;
        }
        ad_banner_tt.prototype.release = function () {
            this.ad_param && console.log("igc banner ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offLoad && this.ad_instance.offLoad(this.on_load_callback.bind(this));
                this.ad_instance.offError && this.ad_instance.offError(this.on_error_callback.bind(this));
                this.ad_instance.offResize && this.ad_instance.offResize(this.on_resize_callback.bind(this));
                this.ad_instance.destroy();
                this.ad_instance = null;
                this.ad_param = null;
            }
            _super.prototype.release.call(this);
        };
        ad_banner_tt.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            var style = param.style || {};
            this.ad_instance = window["tt"].createBannerAd({
                adUnitId: param.ad_id,
                adIntervals: 30,
                style: style,
            });
            this.ad_instance.onError(self.on_error_callback.bind(self));
            this.ad_instance.onLoad(self.on_load_callback.bind(self));
            this.ad_instance.onResize(self.on_resize_callback.bind(self));
        };
        ad_banner_tt.prototype.on_error_callback = function (err) {
            this.on_error(this.ad_param, err);
        };
        ad_banner_tt.prototype.on_load_callback = function () {
            var self = this;
            if (!self) {
                console.log("igc banner on_load_callback self null");
            }
            if (!self.ad_instance) {
                console.log("igc banner on_load_callback self.ad_instance null");
            }
            if (!self.ad_instance.offLoad) {
                console.log("igc banner on_load_callback self.ad_instance.offLoad null");
            }
            self.ad_instance && self.ad_instance.offLoad && self.ad_instance.offLoad(self.on_load_callback);
            self.on_load(this.ad_param, {});
        };
        ad_banner_tt.prototype.on_resize_callback = function (size) {
            console.log("igc on_resize_callback:", size.width, size.height);
            var self = this;
            if (self.ad_param.width != size.width && size.width > 0) {
                self.ad_param.width = size.width;
                self.ad_instance.style.top = self.ad_param.windowHeight - size.height;
                self.ad_instance.style.left = (self.ad_param.windowWidth - self.ad_param.width) / 2;
            }
        };
        ad_banner_tt.prototype.show_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc banner show_ad ad_status: ", this.ad_status);
                self.is_show_banner = true;
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.show, "", "", param.ad_scene, "0", self.ad_op);
                var adshow = this.ad_instance.show();
                adshow && adshow.then(function () {
                    console.log("igc banner show succ result");
                    if (self.is_show_banner === true) {
                        self.on_show(param);
                    }
                    else {
                        self.hide_ad(param);
                    }
                }).catch(function (err) {
                    console.log("igc banner show error result:", JSON.stringify(err));
                });
            }
        };
        ad_banner_tt.prototype.hide_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " hide_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc banner hide_ad ad_status: ", this.ad_status);
                if (this.ad_status < igc.e_ad_status.show) {
                    return;
                }
                self.ad_op = igc.e_ad_op.hide;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.hide, "", "", param.ad_scene, "0", self.ad_op);
                self.is_show_banner = false;
                this.ad_instance.hide();
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onhide, "", "", param.ad_scene, "0", self.ad_op);
            }
        };
        ad_banner_tt.prototype.destroy_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " destroy_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.destroy;
                this.release();
            }
        };
        ad_banner_tt.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_load.call(this, param, res);
            if (this.is_show_banner) {
                this.show_ad(param);
            }
            else {
                this.hide_ad(param);
            }
        };
        ad_banner_tt.prototype.on_error = function (param, err) {
            console.log("igc banner on_error res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, param.ad_scene, "0", self.ad_op);
            this.release();
        };
        return ad_banner_tt;
    }(igc.ad_base));
    igc.ad_banner_tt = ad_banner_tt;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_interstitial_tt = (function (_super) {
        __extends(ad_interstitial_tt, _super);
        function ad_interstitial_tt() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ad_interstitial_tt.prototype.release = function () {
            this.ad_param && console.log("igc interstitial ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offError(this.on_error_callback.bind(this));
                this.ad_instance.offClose(this.on_close_callback.bind(this));
                this.ad_instance.offLoad(this.on_load_callback.bind(this));
                this.ad_instance.destroy();
                this.ad_instance = null;
                this.ad_param = null;
            }
            _super.prototype.release.call(this);
        };
        ad_interstitial_tt.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc interstitial ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_instance = window["tt"].createInterstitialAd({
                adUnitId: param.ad_id,
            });
            this.ad_instance.onLoad(this.on_load_callback.bind(this));
            this.ad_instance.onError(this.on_error_callback.bind(this));
            this.ad_instance.onClose(this.on_close_callback.bind(this));
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.load().then(function () {
                console.log("igc 加载头条插屏成功，调用展示show", param.ad_id);
                if (self.ad_param && self.ad_param.auto_show !== false) {
                    self.show_ad(self.ad_param);
                }
            })
                .catch(function (err) {
                console.log("igc 加载头条插屏失败，调用展示show", param.ad_id);
                console.log(err);
            });
        };
        ad_interstitial_tt.prototype.on_load_callback = function () {
            var self = this;
            self.on_load(self.ad_param, {});
        };
        ad_interstitial_tt.prototype.on_error_callback = function (err) {
            var self = this;
            self.on_error(self.ad_param, err);
        };
        ad_interstitial_tt.prototype.on_close_callback = function () {
            var self = this;
            self.on_close(self.ad_param, {});
        };
        ad_interstitial_tt.prototype.show_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc interstitial ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
            console.log("igc interstitial show_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.show, "", "", self.ad_param.ad_scene, "0", self.ad_op);
                this.ad_instance.show();
                this.on_show(param);
            }
        };
        ad_interstitial_tt.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            this.ad_instance.offLoad();
            _super.prototype.on_load.call(this, param, res);
            console.log("igc interstitial on_load");
        };
        ad_interstitial_tt.prototype.on_close = function (param, res) {
            console.log("igc interstitial on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_close.call(this, param, res);
            if (!this.ad_instance) {
                return;
            }
            var self = this;
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, "", "", self.ad_param.ad_scene, "0", self.ad_op);
            if (self.ad_param && self.ad_param.onClose) {
                self.ad_param.onClose(self.ad_param, {});
            }
            this.ad_status = igc.e_ad_status.close;
            this.release();
        };
        ad_interstitial_tt.prototype.on_error = function (param, err) {
            console.log("igc interstitial on_error res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            _super.prototype.on_error.call(this, param, err);
            this.release();
        };
        ad_interstitial_tt.prototype.on_show = function (param) {
            console.log("igc interstitial on_show succ");
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_show.call(this, param);
        };
        return ad_interstitial_tt;
    }(igc.ad_base));
    igc.ad_interstitial_tt = ad_interstitial_tt;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_video_tt = (function (_super) {
        __extends(ad_video_tt, _super);
        function ad_video_tt() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.is_first = true;
            return _this;
        }
        ad_video_tt.prototype.release = function () {
            this.ad_param && console.log("igc video ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
        };
        ad_video_tt.prototype.create = function (param) {
            var _this = this;
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc video ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            var extra = param.extra || "";
            igc.stat_manager.instance.send_user_event(param.ad_pos_id + "", igc.igc_stat_ids.video_click, "", "", extra, "", "", "", "");
            this.ad_instance = window["tt"].createRewardedVideoAd({
                adUnitId: param.ad_id,
            });
            if (this.is_first === true) {
                this.ad_instance.onError(self.on_error_callback.bind(self));
                this.ad_instance.onClose(self.on_close_callback.bind(self));
                this.is_first = false;
            }
            console.log("11111111111111111111111111111111111");
            self.ad_op = igc.e_ad_op.load;
            console.log("test 11111111111111111111111111111111");
            self.ad_op = igc.e_ad_op.load;
            self.ad_instance.load().then(function () {
                console.log("test 3333333333333333333333333333333");
                self.on_load(param, {});
                self.ad_op = igc.e_ad_op.show;
                console.log("test 44444444444444444444444444444444");
                _this.ad_instance.show().then(function () {
                    console.log('igc show succ 1');
                    self.on_show(param);
                }).catch(function (err) {
                    console.log('igc show err:', err);
                    self.ad_op = igc.e_ad_op.load;
                    self.ad_instance.load()
                        .then(function () {
                        console.log('igc 手动加载成功');
                        self.on_load(param, {});
                        self.ad_op = igc.e_ad_op.show;
                        self.on_show(param);
                        return self.ad_instance.show();
                    });
                });
            }).catch(function (err) {
                console.log('igc load err:', err);
                self.ad_op = igc.e_ad_op.load;
                self.ad_instance.load()
                    .then(function () {
                    console.log('igc 手动加载成功 2');
                    self.on_load(param, {});
                    self.ad_op = igc.e_ad_op.show;
                    self.on_show(param);
                    return self.ad_instance.show();
                });
            });
            console.log("test 222222222222222222222222222222222");
        };
        ad_video_tt.prototype.on_load_callback = function () {
            var self = this;
            if (!self) {
                console.log("igc video on_load_callback self null");
            }
            if (!self.ad_instance) {
                console.log("igc video on_load_callback self.ad_instance null");
            }
            if (!self.ad_instance.offLoad) {
                console.log("igc video on_load_callback self.ad_instance.offLoad null");
            }
            self.ad_instance && self.ad_instance.offLoad && self.ad_instance.offLoad(self.on_load_callback.bind(self));
            self.on_load(self.ad_param, {});
        };
        ad_video_tt.prototype.on_error_callback = function (err) {
            var self = this;
            self.on_error(self.ad_param, err);
        };
        ad_video_tt.prototype.on_close_callback = function (res) {
            var self = this;
            if (!self.ad_instance) {
                console.log("igc on_load_callback self.ad_instance null");
            }
            if (!self.ad_instance.offClose) {
                console.log("igc on_load_callback self.ad_instance.offClose null");
            }
            self.on_close(self.ad_param, res);
        };
        ad_video_tt.prototype.on_load = function (param, res) {
            if (!this.ad_instance || !this.ad_param) {
                return;
            }
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_load.call(this, param, res);
        };
        ad_video_tt.prototype.on_error = function (param, err) {
            console.log("igc video on_err res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            this.release();
        };
        ad_video_tt.prototype.on_close = function (param, res) {
            console.log("igc video on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_close.call(this, param, res);
            if (res && res.isEnded) {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: res.isEnded });
                }
                self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.complete, "", self.ad_param.ad_scene, "0", self.ad_op);
                igc.stat_manager.instance.send_user_event(self.ad_param.ad_pos_id + "", igc.igc_stat_ids.video_compelete, "", "", "", "", "", "", "");
            }
            else {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: false });
                }
                self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.uncomplete, "", self.ad_param.ad_scene, "0", self.ad_op);
                igc.stat_manager.instance.send_user_event(self.ad_param.ad_pos_id + "", igc.igc_stat_ids.video_uncompelete, "", "", "", "", "", "", "");
            }
            this.release();
        };
        return ad_video_tt;
    }(igc.ad_base));
    igc.ad_video_tt = ad_video_tt;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_ad_vivo_qg = (function (_super) {
        __extends(channel_ad_vivo_qg, _super);
        function channel_ad_vivo_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.can_ad = false;
            _this.can_video = false;
            _this.can_native = false;
            _this.ad_native_map = {};
            _this.ad_banner_release_time = 0;
            _this.ad_banner_create_time = 0;
            _this.platformVersionCode = 0;
            return _this;
        }
        channel_ad_vivo_qg.prototype.init = function () {
            _super.prototype.init.call(this);
            var code = window["qg"] && window["qg"].getSystemInfoSync().platformVersionCode;
            console.log("igc app qg code--->", code);
            this.platformVersionCode = code;
            this.can_ad = code >= 1031;
            this.can_video = code >= 1041;
            this.can_native = code >= 1053;
            this.support_method[igc.e_method_type.create_ad] = this.can_ad;
            this.support_method[igc.e_method_type.show_ad] = this.can_ad;
            this.support_method[igc.e_method_type.hide_ad] = this.can_ad;
            this.support_method[igc.e_method_type.has_ad] = this.can_ad;
            this.support_method[igc.e_method_type.destroy_ad] = this.can_ad;
            this.support_method[igc.e_method_type.report_ad_show] = this.can_ad;
            this.support_method[igc.e_method_type.report_ad_click] = this.can_ad;
            this.support_method[igc.e_method_type.report_ad_close] = this.can_ad;
            this.support_method[igc.e_method_type.load_ad_just] = false;
            this.support_method[igc.e_method_type.show_ad_just] = false;
        };
        channel_ad_vivo_qg.prototype.has_ad = function (param) {
            if (!this.can_ad) {
                return false;
            }
            if (param && param.ad_type === igc.e_ad_type.video) {
                return this.can_video;
            }
            else if (param && (param.ad_type === igc.e_ad_type.native)) {
                return this.can_native;
            }
            return true;
        };
        channel_ad_vivo_qg.prototype.create_ad = function (param) {
            if (!this.can_ad) {
                return false;
            }
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            if (!this.has_ad(param)) {
                return false;
            }
            param.platformVersionCode = this.platformVersionCode;
            if (param.ad_type == igc.e_ad_type.banner) {
                console.log("igc channel_ad_vivo_qg:create_ad", "create_ad_banner");
                return this.create_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                console.log("igc channel_ad_vivo_qg:create_ad", "create_ad_video");
                return this.create_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                console.log("igc channel_ad_vivo_qg:create_ad", "create_ad_interstitial");
                return this.create_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                return this.create_ad_native(param);
            }
            else {
                return false;
            }
        };
        channel_ad_vivo_qg.prototype.create_ad_banner = function (param) {
            var now_timestamp = Date.now();
            if (this.ad_banner) {
                console.log("igc create_ad_banner release req begin");
                if (now_timestamp - this.ad_banner_release_time <= 10000) {
                    console.log("igc create_ad_banner release time error");
                    return false;
                }
                console.log("igc create_ad_banner release now_timestamp：", now_timestamp);
                this.ad_banner_release_time = now_timestamp;
                console.log("igc create_ad_banner release ad_banner_release_time", this.ad_banner_release_time);
                this.ad_banner.release();
                this.ad_banner = null;
                console.log("igc create_ad_banner release req end");
            }
            if (now_timestamp - this.ad_banner_create_time <= 10000) {
                console.log("igc create_ad_banner create time error");
                return false;
            }
            this.ad_banner_release_time = now_timestamp;
            this.ad_banner_create_time = now_timestamp;
            this.ad_banner = new igc.ad_banner_vivo_qg();
            this.ad_banner.create(param);
            return true;
        };
        channel_ad_vivo_qg.prototype.create_ad_video = function (param) {
            if (!this.can_video) {
                return false;
            }
            if (this.ad_video) {
                this.ad_video.update_show(param);
            }
            else {
                this.ad_video = new igc.ad_video_vivo_qg();
                this.ad_video.create(param);
            }
            return true;
        };
        channel_ad_vivo_qg.prototype.create_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.release();
                this.ad_interstitial = null;
            }
            this.ad_interstitial = new igc.ad_interstitial_vivo_qg();
            this.ad_interstitial.create(param);
            return true;
        };
        channel_ad_vivo_qg.prototype.create_ad_native = function (param) {
            if (!this.can_native) {
                return false;
            }
            var self = this;
            if (!this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id] = new igc.ad_native_vivo_qg();
                this.ad_native_map[param.ad_id].create(param);
            }
            else {
                this.ad_native_map[param.ad_id].update_show(param);
            }
        };
        channel_ad_vivo_qg.prototype.show_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            param.platformVersionCode = this.platformVersionCode;
            if (param.ad_type == igc.e_ad_type.banner) {
                this.show_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                this.show_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                this.show_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                this.show_ad_native(param);
            }
            else {
                return false;
            }
            return true;
        };
        channel_ad_vivo_qg.prototype.show_ad_banner = function (param) {
            if (this.ad_banner) {
                this.ad_banner.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.show_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.show_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.show_ad_native = function (param) {
            var self = this;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].show_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.hide_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            param.platformVersionCode = this.platformVersionCode;
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.hide_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.hide_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.hide_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                return this.hide_ad_native(param);
            }
            else {
                return false;
            }
        };
        channel_ad_vivo_qg.prototype.hide_ad_banner = function (param) {
            var self = this;
            if (this.ad_banner) {
                this.ad_banner.hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.hide_ad_video = function (param) {
            var self = this;
            if (this.ad_video) {
                this.ad_video.hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.hide_ad_interstitial = function (param) {
            var self = this;
            if (this.ad_interstitial) {
                this.ad_interstitial.hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.hide_ad_native = function (param) {
            var self = this;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].hide_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.destroy_ad = function (param) {
            if (!param.ad_id || !param.ad_type) {
                return false;
            }
            param.platformVersionCode = this.platformVersionCode;
            if (param.ad_type == igc.e_ad_type.banner) {
                return this.destroy_ad_banner(param);
            }
            else if (param.ad_type == igc.e_ad_type.video) {
                return this.destroy_ad_video(param);
            }
            else if (param.ad_type == igc.e_ad_type.interstitial) {
                return this.destroy_ad_interstitial(param);
            }
            else if (param.ad_type == igc.e_ad_type.native) {
                return this.destroy_ad_native(param);
            }
            else {
                return false;
            }
        };
        channel_ad_vivo_qg.prototype.destroy_ad_banner = function (param) {
            if (this.ad_banner) {
                this.ad_banner.destroy_ad(param);
                this.ad_banner = null;
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.destroy_ad_video = function (param) {
            if (this.ad_video) {
                this.ad_video.destroy_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.destroy_ad_interstitial = function (param) {
            if (this.ad_interstitial) {
                this.ad_interstitial.destroy_ad(param);
                this.ad_interstitial = null;
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.destroy_ad_native = function (param) {
            var self = this;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].destroy_ad(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.report_ad_show = function (param) {
            var self = this;
            param.platformVersionCode = this.platformVersionCode;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].report_ad_show(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.report_ad_click = function (param) {
            var self = this;
            param.platformVersionCode = this.platformVersionCode;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].report_ad_click(param);
                return true;
            }
            return false;
        };
        channel_ad_vivo_qg.prototype.report_ad_close = function (param) {
            var self = this;
            param.platformVersionCode = this.platformVersionCode;
            if (this.ad_native_map[param.ad_id]) {
                this.ad_native_map[param.ad_id].report_ad_close(param);
                return true;
            }
            return false;
        };
        return channel_ad_vivo_qg;
    }(igc.channel_facade_ad_base));
    igc.channel_ad_vivo_qg = channel_ad_vivo_qg;
    window["channel_ad_vivo_qg"] = channel_ad_vivo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_system_vivo_qg = (function (_super) {
        __extends(channel_system_vivo_qg, _super);
        function channel_system_vivo_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_system_vivo_qg.prototype.init = function () {
            _super.prototype.init.call(this);
            this.register_listener();
            this.support_method[igc.e_method_type.get_system_info_sync] = true;
            this.support_method[igc.e_method_type.exit_mini_program] = true;
            this.support_method[igc.e_method_type.on_show] = true;
            this.support_method[igc.e_method_type.on_hide] = true;
        };
        channel_system_vivo_qg.prototype.register_listener = function () {
        };
        channel_system_vivo_qg.prototype.get_system_info_sync = function () {
            return window["qg"].getSystemInfoSync();
        };
        channel_system_vivo_qg.prototype.exit_mini_program = function () {
            return window["qg"].exitApplication();
        };
        channel_system_vivo_qg.prototype.on_show = function (param) {
            return window["qg"].onShow(function (res) {
                param.on_show && param.on_show(res);
            });
        };
        channel_system_vivo_qg.prototype.on_hide = function (param) {
            return window["qg"].onHide(function (res) {
                param.on_hide && param.on_hide(res);
            });
        };
        return channel_system_vivo_qg;
    }(igc.channel_facade_share_base));
    igc.channel_system_vivo_qg = channel_system_vivo_qg;
    window["channel_system_vivo_qg"] = channel_system_vivo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_user_vivo_qg = (function (_super) {
        __extends(channel_user_vivo_qg, _super);
        function channel_user_vivo_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.token = null;
            _this.deviceId = null;
            _this.callback = null;
            _this.needAuth = true;
            _this.is_old = false;
            _this.platformVersionCode = 0;
            return _this;
        }
        channel_user_vivo_qg.prototype.init = function () {
            _super.prototype.init.call(this);
            this.support_method[igc.e_method_type.login] = true;
            this.support_method[igc.e_method_type.device_shake] = true;
            this.support_method[igc.e_method_type.check_can_add_desktop] = true;
            this.support_method[igc.e_method_type.check_is_add_desktop] = true;
            this.support_method[igc.e_method_type.add_desktop] = true;
            this.platformVersionCode = window["qg"] && window["qg"].getSystemInfoSync().platformVersionCode;
            igc.stat_manager.instance._opInfo = this.platformVersionCode + "";
            igc.stat_manager.instance._osInfo = window["qg"] && window["qg"].getSystemInfoSync().model || "";
            console.log("igc vivo手机型号", igc.stat_manager.instance._osInfo);
        };
        channel_user_vivo_qg.prototype.login = function (login_param, callback) {
            console.log("igc vivo run login()");
            var self = this;
            if (igc.igc_main.instance.app_config.game_param.needAuth == false) {
                this.needAuth = false;
            }
            console.log("该游戏是否需要授权", this.needAuth);
            this.callback = callback;
            this.token = localStorage.getItem("vivoToken");
            if (this.token != null && this.token != "") {
                this.is_old = true;
                localStorage.setItem("is_old", "is_old");
            }
            if (localStorage.getItem("is_old") == "is_old") {
                this.is_old = true;
            }
            window["qg"] && window["qg"].getUserId({
                success: function (data) {
                    console.log("igc 设备id", data.userId);
                    self.deviceId = data.userId;
                    if (self.deviceId == null) {
                        var info = self.get_tourise_info();
                        self.deviceId = info.userId;
                    }
                    self.initVivo();
                },
                fail: function (data, code) {
                    console.log("igc 设备id获取失败");
                    var info = self.get_tourise_info();
                    self.deviceId = info.userId;
                    self.initVivo();
                }
            });
        };
        channel_user_vivo_qg.prototype.initVivo = function () {
            console.log("igc channel_user_vivo_qg local_save_token = ", this.token);
            if (this.token != null && this.token != "") {
                this.initVivoInfo(this.token);
            }
            else {
                this.initVivoByAuth();
            }
        };
        channel_user_vivo_qg.prototype.initVivoByAuth = function () {
            var self = this;
            console.log("vivoqgsdk channel_user_vivo_qg initVivoByAuth Run ", this.needAuth);
            if (this.needAuth || this.is_old) {
                window["qg"] && window["qg"].authorize({
                    type: "token",
                    success: function (data) {
                        console.log("igc channel_user_vivo_qg qg.authorize success", data.accessToken);
                        self.token = data.accessToken;
                        localStorage.setItem("vivoToken", data.accessToken);
                        self.initVivoInfo(data.accessToken);
                    },
                    fail: function (data, code) {
                        console.log("igc channel_user_vivo_qg qg.authorize fali");
                        self.token = "";
                        localStorage.setItem("vivoToken", "");
                        var vivoInfo = { userId: self.deviceId, avatar: "", userName: self.deviceId, hasAuth: false };
                        self.on_login_result(igc.e_channel_code.login_success, vivoInfo, self.callback);
                    }
                });
            }
            else {
                console.log("igc initVivoByAuth dont need auth");
                self.token = "";
                localStorage.setItem("vivoToken", "");
                var vivoInfo = { userId: self.deviceId, avatar: "", userName: self.deviceId, hasAuth: false };
                self.on_login_result(igc.e_channel_code.login_success, vivoInfo, self.callback);
            }
        };
        channel_user_vivo_qg.prototype.initVivoInfo = function (token) {
            console.log("vivoqgsdk channel_user_vivo_qg initVivoInfo Run ");
            var self = this;
            var callback = this.callback || function () { };
            window["qg"] && window["qg"].getProfile({
                token: token,
                success: function (data) {
                    console.log("igc channel_user_vivo_qg getProfile success", data.openid, data.nickname);
                    data.hasAuth = true;
                    self.on_login_result(igc.e_channel_code.login_success, data, callback);
                },
                fail: function (data, code) {
                    console.log("igc channel_user_vivo_qg getProfile fail, code:", code);
                    self.token = "";
                    localStorage.setItem("vivoToken", "");
                    self.initVivo();
                }
            });
        };
        channel_user_vivo_qg.prototype.on_login_result = function (retcode, param, callback) {
            var self = this;
            if (retcode == igc.e_channel_code.login_success) {
                var user_info = this.config_channel_user_info(param, function (param) {
                    var user_info = {};
                    if (param.hasAuth) {
                        user_info = {
                            uid: param.openid,
                            token: self.token,
                            nickName: param.nickname,
                            avatar: param.avatar,
                            sex: "",
                            birthday: "",
                            phoneNum: "",
                            location: "",
                            hasAuth: true,
                            extra: ""
                        };
                    }
                    else {
                        user_info = {
                            uid: self.deviceId,
                            token: self.deviceId,
                            nickName: param.userName,
                            avatar: "",
                            sex: "",
                            birthday: "",
                            phoneNum: "",
                            location: "",
                            hasAuth: false,
                            extra: ""
                        };
                    }
                    return user_info;
                });
                callback({ errorcode: igc.e_channel_code.login_success, errormsg: "success", sdk_errorcode: 0, sdk_errormsg: "", channel_user_info: user_info });
            }
            else {
                callback({ errorcode: igc.e_channel_code.login_fail, errormsg: "fail", sdk_errorcode: -1, sdk_errormsg: JSON.stringify(param), channel_user_info: {} });
            }
        };
        channel_user_vivo_qg.prototype.get_tourise_info = function () {
            var name = localStorage.getItem("tt_username");
            if (!name) {
                name = this.get_random_name();
                localStorage.setItem("tt_username", name);
            }
            var result = {
                "userId": name,
                "userName": name,
                "avatar": ""
            };
            return result;
        };
        channel_user_vivo_qg.prototype.device_shake = function (param) {
            window["qg"] && window["qg"].vibrateShort();
        };
        channel_user_vivo_qg.prototype.check_can_add_desktop = function () {
            return this.platformVersionCode >= 1041;
        };
        channel_user_vivo_qg.prototype.check_is_add_desktop = function (param) {
            if (window["qg"] && window["qg"].hasShortcutInstalled) {
                window["qg"].hasShortcutInstalled({
                    success: function (res) {
                        if (res == false) {
                            param.can_add && param.can_add();
                        }
                        else {
                            param.has_add && param.has_add();
                        }
                    },
                    fail: function (err) { },
                    complete: function () { }
                });
            }
        };
        channel_user_vivo_qg.prototype.add_desktop = function (param) {
            console.log("igc add_desktop begin-------------------");
            if (!this.check_can_add_desktop()) {
                console.log("igc add_desktop !this.check_can_add_desktop()-------------------");
                param.on_failed && param.on_failed();
                return false;
            }
            if (window["qg"] && window["qg"].hasShortcutInstalled) {
                console.log("igc add_desktop hasShortcutInstalled have-------------------");
                window["qg"].hasShortcutInstalled({
                    success: function (res) {
                        console.log("igc add_desktop hasShortcutInstalled success-------------------");
                        if (res == false) {
                            console.log("igc add_desktop hasShortcutInstalled success res false-------------------");
                            param.can_create && param.can_create();
                            window["qg"].installShortcut({
                                success: function () {
                                    console.log("igc add_desktop installShortcut success-------------------");
                                    param.on_success && param.on_success();
                                },
                                fail: function (err) {
                                    console.log("igc add_desktop installShortcut fail:" + JSON.stringify(err));
                                    param.on_failed_back && param.on_failed_back();
                                },
                                complete: function () {
                                    console.log("igc add_desktop installShortcut complete-------------------");
                                }
                            });
                        }
                        else {
                            console.log("igc add_desktop installShortcut has-------------------");
                            console.log("igc 图标已创建");
                            param.has_create && param.has_create();
                        }
                    },
                    fail: function (err) {
                        console.log("igc add_desktop hasShortcutInstalled fail:" + JSON.stringify(err));
                    },
                    complete: function () {
                        console.log("igc add_desktop hasShortcutInstalled complete-------------------");
                    }
                });
            }
            else {
                console.log("igc add_desktop hasShortcutInstalled dont have-------------------");
            }
        };
        return channel_user_vivo_qg;
    }(igc.channel_facade_user_base));
    igc.channel_user_vivo_qg = channel_user_vivo_qg;
    window["channel_user_vivo_qg"] = channel_user_vivo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_banner_vivo_qg = (function (_super) {
        __extends(ad_banner_vivo_qg, _super);
        function ad_banner_vivo_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.show_num = 0;
            return _this;
        }
        ad_banner_vivo_qg.prototype.release = function () {
            this.ad_param && console.log("igc banner ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offLoad();
                this.ad_instance.offClose();
                var addestroy = this.ad_instance.destroy();
                addestroy && addestroy.then(function () {
                    console.log("igc banner广告销毁成功");
                }).catch(function (err) {
                    console.log("igc banner广告销毁失败", err);
                });
                this.ad_instance = null;
                this.ad_param = null;
            }
            _super.prototype.release.call(this);
        };
        ad_banner_vivo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_instance = window["qg"].createBannerAd({
                posId: param.ad_id,
                style: {}
            });
            this.ad_instance.onLoad(function () {
                self.on_load(param, {});
            });
            this.ad_instance.onClose(function () {
                self.on_close(param, {});
            });
            this.show_ad(param);
        };
        ad_banner_vivo_qg.prototype.show_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc banner show_ad ad_status: ", this.ad_status);
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.show, "", "", param.ad_scene, "0", self.ad_op);
                var adshow = this.ad_instance.show();
                adshow && adshow.then(function () {
                    console.log("igc banner show succ result");
                    self.on_show(param);
                }).catch(function (err) {
                    console.log("igc banner show error result:", JSON.stringify(err));
                    self.on_error(param, err);
                });
            }
        };
        ad_banner_vivo_qg.prototype.hide_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " hide_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                console.log("igc banner hide_ad ad_status: ", this.ad_status);
                if (this.ad_status < igc.e_ad_status.show) {
                    return;
                }
                self.ad_op = igc.e_ad_op.hide;
                var adhide = this.ad_instance.hide();
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.hide, "", "", param.ad_scene, "0", self.ad_op);
                adhide && adhide.then(function () {
                    console.log("igc banner hide succ result");
                    self.on_hide(param);
                }).catch(function (err) {
                    console.log("igc banner hide fail result:", JSON.stringify(err));
                    var errMsg = "";
                    if (err.errMsg) {
                        errMsg = err.errMsg;
                    }
                    else {
                        if (err.data) {
                            errMsg = JSON.stringify(err.data);
                        }
                    }
                    self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.code, errMsg, self.ad_param.ad_scene, "0", self.ad_op);
                });
            }
        };
        ad_banner_vivo_qg.prototype.destroy_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc banner ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " destroy_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.destroy;
                this.release();
            }
        };
        ad_banner_vivo_qg.prototype.on_close = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_close.call(this, param, res);
            var self = this;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onclose, "", "", param.ad_scene, "0", self.ad_op);
            if (param && param.onClose) {
                param.onClose(param, {});
            }
            this.ad_status = igc.e_ad_status.close;
            this.release();
        };
        ad_banner_vivo_qg.prototype.on_error = function (param, err) {
            console.log("igc banner on_error res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            var errMsg = "";
            if (err.errMsg) {
                errMsg = err.errMsg;
            }
            else {
                if (err.data) {
                    errMsg = JSON.stringify(err.data);
                }
            }
            if (self.show_num > 1 && err.code == 30009) {
                console.log("igc banner show is much times!");
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onerror, err.code, errMsg, param.ad_scene, "0", self.ad_op);
            }
            else {
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onerror, err.code, errMsg, param.ad_scene, "0", self.ad_op);
                this.release();
            }
        };
        ad_banner_vivo_qg.prototype.on_show = function (param) {
            console.log("igc banner on_show succ");
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_show.call(this, param);
            if (this.ad_instance) {
                this.show_num += 1;
            }
        };
        return ad_banner_vivo_qg;
    }(igc.ad_base));
    igc.ad_banner_vivo_qg = ad_banner_vivo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_interstitial_vivo_qg = (function (_super) {
        __extends(ad_interstitial_vivo_qg, _super);
        function ad_interstitial_vivo_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ad_interstitial_vivo_qg.prototype.release = function () {
            this.ad_param && console.log("igc interstitial ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            if (this.ad_instance) {
                this.ad_instance.offError();
                this.ad_instance.offClose();
                this.ad_instance.offLoad();
            }
            _super.prototype.release.call(this);
        };
        ad_interstitial_vivo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc interstitial ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_instance = window["qg"].createInterstitialAd({
                posId: param.ad_id,
            });
            this.ad_instance.onLoad(function () {
                self.on_load(param, {});
            });
            this.ad_instance.onError(function (err) {
                self.on_error(param, err);
            });
            this.ad_instance.onClose(function () {
                self.on_close(param, {});
            });
            self.ad_op = igc.e_ad_op.load;
            this.ad_instance.load();
        };
        ad_interstitial_vivo_qg.prototype.show_ad = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc interstitial ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " show_ad");
            console.log("igc interstitial show_ad");
            var self = this;
            if (this.ad_instance && self.ad_param && param && param.ad_id === self.ad_param.ad_id) {
                self.ad_op = igc.e_ad_op.show;
                self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.show, "", "", self.ad_param.ad_scene, "0", self.ad_op);
                var adShow = this.ad_instance.show();
                adShow && adShow.then(function () {
                    console.log("igc interstitial show_ad succ result");
                    self.on_show(param);
                }).catch(function (err) {
                    console.log("igc interstitial show_ad err result");
                });
            }
        };
        ad_interstitial_vivo_qg.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            this.ad_instance && this.ad_instance.offLoad && this.ad_instance.offLoad();
            _super.prototype.on_load.call(this, param, res);
            console.log("igc interstitial on_load");
            this.ad_status = igc.e_ad_status.load_success;
            if (this.ad_param && this.ad_param.auto_show !== false) {
                self.show_ad(self.ad_param);
            }
        };
        ad_interstitial_vivo_qg.prototype.on_close = function (param, res) {
            console.log("igc interstitial on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_close.call(this, param, res);
            if (!this.ad_instance) {
                return;
            }
            var self = this;
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, "", "", self.ad_param.ad_scene, "0", self.ad_op);
            if (self.ad_param && self.ad_param.onClose) {
                self.ad_param.onClose(self.ad_param, {});
            }
            this.ad_status = igc.e_ad_status.close;
            this.release();
        };
        ad_interstitial_vivo_qg.prototype.on_error = function (param, err) {
            console.log("igc interstitial on_error res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            _super.prototype.on_error.call(this, param, err);
            if (err && err.errCode == 30000) {
                return;
            }
            this.release();
        };
        ad_interstitial_vivo_qg.prototype.on_show = function (param) {
            console.log("igc interstitial on_show succ");
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            _super.prototype.on_show.call(this, param);
        };
        return ad_interstitial_vivo_qg;
    }(igc.ad_base));
    igc.ad_interstitial_vivo_qg = ad_interstitial_vivo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_native_vivo_qg = (function (_super) {
        __extends(ad_native_vivo_qg, _super);
        function ad_native_vivo_qg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.load_success = false;
            return _this;
        }
        ad_native_vivo_qg.prototype.release = function () {
            if (!this.load_success) {
                this.ad_param && console.log("igc native ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
                if (this.ad_instance) {
                    this.ad_instance.offLoad();
                    this.ad_instance = null;
                }
                _super.prototype.release.call(this);
            }
        };
        ad_native_vivo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            if (!this.ad_instance) {
                self.ad_op = igc.e_ad_op.create;
                self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
                this.ad_instance = window["qg"].createNativeAd({
                    posId: param.ad_id
                });
                this.ad_instance.onLoad(function (res) {
                    self.on_load(param, res);
                });
                self.ad_op = igc.e_ad_op.load;
                var adLoad = this.ad_instance.load();
                adLoad && adLoad.then(function (res) {
                    console.log("igc native load_ad succ result111");
                    self.load_success = true;
                }).catch(function (err) {
                    console.log("igc native load_ad err result111");
                    self.on_error(param, err);
                });
            }
        };
        ad_native_vivo_qg.prototype.update_show = function (param) {
            var self = this;
            this.ad_param = param;
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            if (!this.ad_instance) {
                console.log("igc native ad_type ad_native_vivo_qg update_show this.ad_instance is null");
                this.ad_op = igc.e_ad_op.create;
                this.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
                this.ad_instance = window["qg"].createNativeAd({
                    posId: param.ad_id
                });
                this.ad_instance.onLoad(function (res) {
                    self.on_load(param, res);
                });
            }
            console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            self.ad_op = igc.e_ad_op.load;
            var adLoad = this.ad_instance.load();
            adLoad && adLoad.then(function (res) {
                self.load_success = true;
                console.log("igc native load_ad succ result222");
            }).catch(function (err) {
                console.log("igc native load_ad err result222");
                self.on_error(param, err);
            });
        };
        ad_native_vivo_qg.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            self.check_param(param);
            if (res && res.adList) {
                console.log("igc native on_load length:", res.adList.length, JSON.stringify(res.adList));
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onload, res.adList.length, "", self.ad_param.ad_scene, "0", self.ad_op);
                var ad_data_list = [];
                for (var i = 0; i < res.adList.length; i++) {
                    var adData = {
                        adUnitId: res.adList[i].adId,
                        title: res.adList[i].title,
                        desc: res.adList[i].desc,
                        iconUrlList: res.adList[i].iconUrlList || res.adList[i].icon,
                        icon: res.adList[i].icon,
                        imgUrlList: res.adList[i].imgUrlList,
                        logoUrl: res.adList[i].logoUrl,
                        clickBtnTxt: res.adList[i].clickBtnTxt,
                        creativeType: res.adList[i].creativeType,
                        interactionType: res.adList[i].interactionType
                    };
                    adData.iconUrlList = [];
                    adData.iconUrlList.push(res.adList[i].icon);
                    ad_data_list.push(adData);
                }
                if (self.ad_param && self.ad_param.onLoad) {
                    console.log("igc native self.ad_param.onLoad(ad_data_list,self.ad_param)");
                    self.ad_param.onLoad(self.ad_param, ad_data_list);
                }
                else {
                    console.log("igc native dont self.ad_param && self.ad_param.onLoad");
                }
            }
            else {
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onload, "0", "", self.ad_param.ad_scene, "0", self.ad_op);
                self.ad_param.onLoad(self.ad_param, []);
                this.ad_status = igc.e_ad_status.none;
                this.release();
                console.log("igc native on_load fail");
                return;
            }
        };
        ad_native_vivo_qg.prototype.on_error = function (param, err) {
            console.log("igc native on_error res.code = ", err.code);
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            var errMsg = "";
            if (err.errMsg) {
                errMsg = err.errMsg;
            }
            else {
                if (err.data) {
                    errMsg = JSON.stringify(err.data);
                }
            }
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.code, errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            this.release();
        };
        ad_native_vivo_qg.prototype.report_ad_close = function (param) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + ",ad_unit_id:" + param.ad_unit_id + " report_ad_close");
            console.log("igc native report_ad_close ");
            _super.prototype.check_param.call(this, param);
            var self = this;
            self.ad_op = igc.e_ad_op.close;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onclose, "", "", param.ad_scene, "0", self.ad_op);
            this.ad_status = igc.e_ad_status.close;
            this.release();
        };
        ad_native_vivo_qg.prototype.report_ad_show = function (param) {
            console.log("igc native report_ad_show ");
            _super.prototype.check_param.call(this, param);
            var self = this;
            if (!self.ad_instance) {
                console.log("igc native report_ad_click !self.ad_instance");
            }
            if (!param) {
                console.log("igc native report_ad_click igc !param");
            }
            if (param && !param.ad_unit_id) {
                console.log("igc native report_ad_click igc !param.ad_unit_id");
            }
            if (self.ad_instance && param && param.ad_unit_id !== undefined) {
                self.ad_instance.reportAdShow({
                    adId: param.ad_unit_id
                });
                if (param.ad_pos_id && param.ad_type && param.ad_scene && param.sub_ad_type) {
                    self.ad_op = igc.e_ad_op.show;
                    self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onshow, "", "", param.ad_scene, "0", self.ad_op);
                    if (param.ad_id) {
                        console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + ",ad_unit_id:" + param.ad_unit_id + " report_ad_show");
                    }
                }
                return true;
            }
            return false;
        };
        ad_native_vivo_qg.prototype.report_ad_click = function (param) {
            console.log("igc native report_ad_click ");
            _super.prototype.check_param.call(this, param);
            var self = this;
            if (!self.ad_instance) {
                console.log("igc native report_ad_click !self.ad_instance");
            }
            if (!param) {
                console.log("igc native report_ad_click igc !param");
            }
            if (param && !param.ad_unit_id) {
                console.log("igc native report_ad_click igc !param.ad_unit_id");
            }
            if (self.ad_instance && param && param.ad_unit_id !== undefined) {
                console.log("igc native do reportAdClick: ad_unit_id:" + param.ad_unit_id);
                self.ad_instance.reportAdClick({
                    adId: param.ad_unit_id
                });
                if (param.ad_pos_id && param.ad_type && param.ad_scene && param.sub_ad_type) {
                    self.ad_op = igc.e_ad_op.click;
                    self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.onclick, "", "", param.ad_scene, "0", self.ad_op);
                    if (param.ad_id) {
                        console.log("igc native ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + ",ad_unit_id:" + param.ad_unit_id + " report_ad_click");
                    }
                }
                return true;
            }
            console.log("igc native do reportAdClick: error");
            return false;
        };
        return ad_native_vivo_qg;
    }(igc.ad_base));
    igc.ad_native_vivo_qg = ad_native_vivo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var ad_video_vivo_qg = (function (_super) {
        __extends(ad_video_vivo_qg, _super);
        function ad_video_vivo_qg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ad_video_vivo_qg.prototype.release = function () {
            this.ad_param && console.log("igc video ad_type:" + this.ad_param.ad_type + ",ad_id:" + this.ad_param.ad_id + " release");
            _super.prototype.release.call(this);
        };
        ad_video_vivo_qg.prototype.create = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            this.release();
            console.log("igc video ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " create");
            var self = this;
            this.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            var extra = param.extra || "";
            igc.stat_manager.instance.send_user_event(param.ad_pos_id + "", igc.igc_stat_ids.video_click, "", "", extra, "", "", "", "");
            this.ad_instance = window["qg"].createRewardedVideoAd({
                posId: param.ad_id,
            });
            this.ad_instance.onError(function (err) {
                self.on_error(param, err);
            });
            this.ad_instance.onClose(function (res) {
                self.on_close(param, res);
            });
            this.ad_instance.onLoad(function () {
                self.on_load(param, {});
            });
            self.ad_op = igc.e_ad_op.load;
        };
        ad_video_vivo_qg.prototype.update_show = function (param) {
            if (!param || !param.ad_type || !param.ad_id) {
                return;
            }
            this.release();
            console.log("igc video ad_type:" + param.ad_type + ",ad_id:" + param.ad_id + " update_show");
            var self = this;
            self.ad_param = param;
            self.ad_op = igc.e_ad_op.create;
            self.send_dot(param.ad_pos_id, param.ad_type, igc.e_ad_event.req, "", "", param.ad_scene, "0", self.ad_op);
            try {
                this.ad_instance = window["qg"].createRewardedVideoAd({
                    posId: param.ad_id,
                });
                this.ad_instance.offError();
                this.ad_instance.offClose();
                this.ad_instance.offLoad();
                this.ad_instance.onError(function (err) {
                    self.on_error(param, err);
                });
                this.ad_instance.onClose(function (res) {
                    self.on_close(param, res);
                });
                this.ad_instance.onLoad(function () {
                    self.on_load(param, {});
                });
                self.ad_op = igc.e_ad_op.load;
                this.ad_instance.load().then(function () {
                    console.log("igc video update_show load succ result");
                });
            }
            catch (err) {
                console.log("" + err);
                console.log("igc video update_show load err cache err:" + ("" + err));
            }
        };
        ad_video_vivo_qg.prototype.on_load = function (param, res) {
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_load.call(this, param, res);
            self.ad_op = igc.e_ad_op.show;
            self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.show, "", "", self.ad_param.ad_scene, "0", self.ad_op);
            try {
                this.ad_instance.show().then(function () {
                    console.log("igc video show succ result");
                    self.on_show(param);
                });
            }
            catch (err) {
                console.log("" + err);
            }
        };
        ad_video_vivo_qg.prototype.on_error = function (param, err) {
            console.log("igc video on_err res = ", JSON.stringify(err));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_error.call(this, param, err);
            self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onerror, err.errCode, err.errMsg, self.ad_param.ad_scene, "0", self.ad_op);
            if (err && err.errCode && (err.errCode == -3 || err.errCode == -4)) {
            }
            else {
            }
            if (this.ad_op == igc.e_ad_op.show) { }
            else {
                this.release();
            }
        };
        ad_video_vivo_qg.prototype.on_close = function (param, res) {
            console.log("igc video on_close res = ", JSON.stringify(res));
            if (!param || !param.ad_type || !param.ad_id || !this.ad_param || !this.ad_instance) {
                return;
            }
            var self = this;
            _super.prototype.on_close.call(this, param, res);
            if (res && res.isEnded) {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: res.isEnded });
                }
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.complete, "", self.ad_param.ad_scene, "0", self.ad_op);
                igc.stat_manager.instance.send_user_event(self.ad_param.ad_pos_id + "", igc.igc_stat_ids.video_compelete, "", "", "", "", "", "", "");
            }
            else {
                if (self.ad_param.onClose) {
                    self.ad_param.onClose(this.ad_param, { isEnded: false });
                }
                self.ad_param && self.send_dot(self.ad_param.ad_pos_id, self.ad_param.ad_type, igc.e_ad_event.onclose, igc.e_ad_video_close.uncomplete, "", self.ad_param.ad_scene, "0", self.ad_op);
                igc.stat_manager.instance.send_user_event(self.ad_param.ad_pos_id + "", igc.igc_stat_ids.video_uncompelete, "", "", "", "", "", "", "");
            }
            this.release();
        };
        return ad_video_vivo_qg;
    }(igc.ad_base));
    igc.ad_video_vivo_qg = ad_video_vivo_qg;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_ad_web = (function (_super) {
        __extends(channel_ad_web, _super);
        function channel_ad_web() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_ad_web.prototype.init = function () {
            _super.prototype.init.call(this);
            this.support_method[igc.e_method_type.create_ad] = false;
            this.support_method[igc.e_method_type.destroy_ad] = false;
            this.support_method[igc.e_method_type.show_ad] = false;
            this.support_method[igc.e_method_type.hide_ad] = false;
        };
        return channel_ad_web;
    }(igc.channel_facade_ad_base));
    igc.channel_ad_web = channel_ad_web;
    window["channel_ad_web"] = channel_ad_web;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_pay_web = (function (_super) {
        __extends(channel_pay_web, _super);
        function channel_pay_web() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_pay_web.prototype.init = function () {
            _super.prototype.init.call(this);
            this.support_method[igc.e_method_type.pay] = true;
        };
        channel_pay_web.prototype.get_extension = function () {
            var self = this;
            return JSON.stringify({
                token: igc.channel_sdk.instance.channel_user_info.token,
                app_engine_version: igc.channel_config.config["game_param"]["engin_version"]
            });
        };
        channel_pay_web.prototype.pay = function (pay_param, callback) {
            var self = this;
            this.submit_order(pay_param, this.get_extension(), function (res) {
                if (res.retcode !== igc.e_channel_code.success) {
                    self.on_pay_result(res.retcode, { code: -1, msg: "fail" }, callback);
                }
                else {
                    self.on_pay_result(igc.e_channel_code.pay_success, res, callback);
                }
            });
        };
        channel_pay_web.prototype.on_pay_result = function (retcode, param, callback) {
            if (retcode === igc.e_channel_code.pay_success) {
                callback({ errorcode: retcode, errormsg: "success", sdk_errorcode: param.code, sdk_errormsg: param.msg });
            }
            else {
                callback({ errorcode: retcode, errormsg: "fail", sdk_errorcode: param.code, sdk_errormsg: param.msg });
            }
        };
        return channel_pay_web;
    }(igc.channel_facade_pay_base));
    igc.channel_pay_web = channel_pay_web;
    window["channel_pay_web"] = channel_pay_web;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_system_web = (function (_super) {
        __extends(channel_system_web, _super);
        function channel_system_web() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        channel_system_web.prototype.init = function () {
            _super.prototype.init.call(this);
            this.register_listener();
            this.support_method[igc.e_method_type.get_system_info_sync] = false;
            this.support_method[igc.e_method_type.get_launch_options_sync] = false;
            this.support_method[igc.e_method_type.exit_mini_program] = false;
            this.support_method[igc.e_method_type.navigate_to_mini_program] = false;
            this.support_method[igc.e_method_type.on_show] = false;
            this.support_method[igc.e_method_type.on_hide] = false;
        };
        channel_system_web.prototype.register_listener = function () {
        };
        return channel_system_web;
    }(igc.channel_facade_share_base));
    igc.channel_system_web = channel_system_web;
    window["channel_system_web"] = channel_system_web;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var channel_user_web = (function (_super) {
        __extends(channel_user_web, _super);
        function channel_user_web() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.is_add_desktop = false;
            return _this;
        }
        channel_user_web.prototype.init = function () {
            _super.prototype.init.call(this);
            this.support_method[igc.e_method_type.login] = true;
            this.support_method[igc.e_method_type.check_can_add_desktop] = true;
            this.support_method[igc.e_method_type.check_is_add_desktop] = true;
            this.support_method[igc.e_method_type.add_desktop] = true;
        };
        channel_user_web.prototype.login = function (login_param, callback) {
            var tempName = localStorage.getItem("igc_random_name");
            if (!tempName) {
                tempName = this.get_random_name();
                localStorage.setItem("igc_random_name", tempName);
            }
            var user_info = {
                uid: tempName,
                token: "test_token",
                nickName: tempName,
                avatar: "",
                sex: igc.e_channel_sex.none,
                birthday: "",
                phoneNum: "110",
                location: "",
                extra: ""
            };
            callback({ errorcode: igc.e_channel_code.login_success, errormsg: "success", sdk_errorcode: 0, sdk_errormsg: "", channel_user_info: user_info });
        };
        channel_user_web.prototype.check_can_add_desktop = function () {
            return true;
        };
        channel_user_web.prototype.check_is_add_desktop = function (param) {
            if (this.is_add_desktop) {
                param.has_add && param.has_add();
            }
            else {
                param.can_add && param.can_add();
            }
        };
        channel_user_web.prototype.add_desktop = function (param) {
            if (!this.check_can_add_desktop()) {
                param.on_failed && param.on_failed();
                return false;
            }
            this.is_add_desktop = true;
            param.on_success && param.on_success();
        };
        return channel_user_web;
    }(igc.channel_facade_user_base));
    igc.channel_user_web = channel_user_web;
    window["channel_user_web"] = channel_user_web;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var igc_resources_utils = (function () {
        function igc_resources_utils() {
        }
        igc_resources_utils.parse_csv = function (strData, key) {
            if (strData == "") {
                return {};
            }
            var strDelimiter = ",";
            var objPattern = new RegExp(("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
            var arrData = [[]];
            var arrMatches = null;
            while (arrMatches = objPattern.exec(strData)) {
                var strMatchedDelimiter = arrMatches[1];
                if (strMatchedDelimiter.length &&
                    strMatchedDelimiter !== strDelimiter) {
                    arrData.push([]);
                }
                var strMatchedValue = void 0;
                if (arrMatches[2]) {
                    strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
                }
                else {
                    strMatchedValue = arrMatches[3];
                }
                arrData[arrData.length - 1].push(strMatchedValue);
            }
            var config = {};
            if (3 < arrData.length) {
                var names = arrData[1];
                var key_index = -1;
                for (var i = 0; i < names.length; ++i) {
                    if (names[i] == key) {
                        key_index = i;
                        break;
                    }
                }
                var types = arrData[2];
                for (var i = 3; i < arrData.length; ++i) {
                    if (arrData[i].length === 1 && arrData[i][0] === "") {
                        continue;
                    }
                    var key_value = null;
                    if (-1 != key_index) {
                        key_value = arrData[i][key_index];
                    }
                    else {
                        key_value = i - 3;
                    }
                    config[key_value] = {};
                    for (var j = 0; j < names.length; ++j) {
                        if ("string" == types[j]) {
                            config[key_value][names[j]] = arrData[i][j] || "";
                        }
                        else if ("int" == types[j]) {
                            config[key_value][names[j]] = parseInt(arrData[i][j] || 0);
                        }
                        else if ("float" == types[j]) {
                            config[key_value][names[j]] = parseFloat(arrData[i][j] || 0);
                        }
                        else if ("boolean" == types[j]) {
                            config[key_value][names[j]] = arrData[i][j] == "TRUE";
                        }
                        else if ("json" == types[j]) {
                            if (arrData[i][j] != "") {
                                try {
                                    config[key_value][names[j]] = JSON.parse(arrData[i][j]);
                                }
                                catch (_a) {
                                    console.error("parse csv failed", strData, key_value, names[j], arrData[i][j]);
                                }
                            }
                        }
                    }
                }
            }
            return config;
        };
        return igc_resources_utils;
    }());
    igc.igc_resources_utils = igc_resources_utils;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var igc_stat_ids;
    (function (igc_stat_ids) {
        igc_stat_ids[igc_stat_ids["video_click"] = 10006] = "video_click";
        igc_stat_ids[igc_stat_ids["video_compelete"] = 10010] = "video_compelete";
        igc_stat_ids[igc_stat_ids["video_uncompelete"] = 10011] = "video_uncompelete";
        igc_stat_ids[igc_stat_ids["native_inner_interstitial_click"] = 10012] = "native_inner_interstitial_click";
        igc_stat_ids[igc_stat_ids["native_interstitial_click"] = 10013] = "native_interstitial_click";
        igc_stat_ids[igc_stat_ids["native_banner_click"] = 10014] = "native_banner_click";
        igc_stat_ids[igc_stat_ids["multual_push_show"] = 305] = "multual_push_show";
        igc_stat_ids[igc_stat_ids["multual_push_click"] = 304] = "multual_push_click";
    })(igc_stat_ids = igc.igc_stat_ids || (igc.igc_stat_ids = {}));
})(igc || (igc = {}));
var igc;
(function (igc) {
    var stat_manager = (function () {
        function stat_manager() {
            this._user_id = "";
            this._server_id = "1";
            this._osInfo = "";
            this._account = "";
            this._opInfo = "";
            this._device_id = "";
            this.src_app_id = "0";
            this._ad_id = "0";
            this._sub_channel_type = "";
            this._scene_id = "";
        }
        Object.defineProperty(stat_manager, "instance", {
            get: function () {
                if (!stat_manager._instances) {
                    stat_manager._instances = new this();
                }
                return stat_manager._instances;
            },
            enumerable: true,
            configurable: true
        });
        stat_manager.prototype.init = function () {
            if (window["qg"]) {
                var system_info = window["qg"].getSystemInfoSync();
                stat_manager.instance._osInfo = system_info.platformVersion + "";
                stat_manager.instance._opInfo = system_info.model || "";
            }
            this._device_id = localStorage.getItem("igc_device_id");
            if (!this._device_id) {
                this._device_id = stat_manager.instance.get_random_name();
                localStorage.setItem("igc_device_id", this._device_id);
            }
            if (igc.igc_main.instance.app_config.game_param.channel_type != igc.e_channel_type.web) {
                var options = igc.igc_main.instance.get_launch_options_sync();
                if (options && options.referrerInfo) {
                    if (options.referrerInfo.src_app_id !== undefined) {
                        this.src_app_id = options.query.src_app_id;
                    }
                    if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.qq) {
                        if (options && options.scene) {
                            this._scene_id = options.scene + "";
                        }
                        if (options && options.query && options.query.via) {
                            this._sub_channel_type = options.query.via;
                            console.log("stat_manager 手q的渠道场景为", this._sub_channel_type);
                        }
                    }
                }
            }
        };
        stat_manager.prototype.get_random_name = function () {
            var name = "role_";
            var pos = 0;
            var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            for (var i = 0; i < 8; i++) {
                pos = Math.round(Math.random() * (arr.length - 1));
                name += arr[pos];
            }
            name += "_";
            name += Date.now();
            return name;
        };
        stat_manager.prototype.set_uid = function (account, user_id, server_id) {
            stat_manager.instance._account = account + "";
            stat_manager.instance._user_id = user_id + "";
            stat_manager.instance._server_id = server_id + "";
        };
        stat_manager.prototype.get_common_info = function () {
            var serverId = stat_manager.instance._server_id + "";
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.qq) {
                serverId = this._scene_id;
            }
            return {
                account: stat_manager.instance._account + "",
                deviceId: stat_manager.instance._device_id,
                userId: stat_manager.instance._user_id + "",
                serverId: serverId,
                acType: 0,
                net: stat_manager.instance._sub_channel_type + "",
            };
        };
        stat_manager.prototype.send_app_start = function () {
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.web) {
                return;
            }
            if (!igc.igc_main.instance.app_config.game_param.stat_key || igc.igc_main.instance.app_config.game_param.stat_key == "") {
                console.error("igc----- stat_key is null");
                return;
            }
            var send_json = stat_manager.instance.get_common_info();
            if (this._osInfo != "") {
                send_json["opInfo"] = this._osInfo + "";
            }
            if (this._opInfo != "") {
                send_json["osInfo"] = this._opInfo + "";
            }
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.apk) {
                send_json["extra"] = this._ad_id;
            }
            else {
                send_json["extra"] = this.src_app_id;
            }
            igc.igc_main.instance.tpf_sdk.getStat().sendAppStart(send_json, 0);
            console.log("stat_manager send_app_start ");
        };
        stat_manager.prototype.get_server_time = function () {
            return 0;
        };
        stat_manager.prototype.send_user_register = function () {
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.web) {
                return;
            }
            if (!igc.igc_main.instance.app_config.game_param.stat_key || igc.igc_main.instance.app_config.game_param.stat_key == "") {
                console.error("igc----- stat_key is null");
                return;
            }
            var send_json = stat_manager.instance.get_common_info();
            if (this._osInfo != "") {
                send_json["osInfo"] = this._osInfo + "";
            }
            if (this._opInfo != "") {
                send_json["opInfo"] = this._opInfo + "";
            }
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.apk) {
                send_json["extra"] = this._ad_id;
            }
            else {
                send_json["extra"] = this.src_app_id;
            }
            igc.igc_main.instance.tpf_sdk.getStat().sendUserRegister(send_json, this.get_server_time());
            console.log("stat_manager send_user_register ");
        };
        stat_manager.prototype.send_user_login = function () {
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.web) {
                return;
            }
            if (!igc.igc_main.instance.app_config.game_param.stat_key || igc.igc_main.instance.app_config.game_param.stat_key == "") {
                console.error("igc----- stat_key is null");
                return;
            }
            var send_json = stat_manager.instance.get_common_info();
            send_json["type"] = 0;
            if (this._osInfo != "") {
                send_json["osInfo"] = this._osInfo + "";
            }
            if (this._opInfo != "") {
                send_json["opInfo"] = this._opInfo + "";
            }
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.apk) {
                send_json["extra"] = this._ad_id;
            }
            else {
                send_json["extra"] = this.src_app_id;
            }
            igc.igc_main.instance.tpf_sdk.getStat().sendUserLogin(send_json, this.get_server_time());
            console.log("stat_manager send_user_login ");
        };
        stat_manager.prototype.send_heart_beat = function () {
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.web) {
                return;
            }
            if (!igc.igc_main.instance.app_config.game_param.stat_key || igc.igc_main.instance.app_config.game_param.stat_key == "") {
                console.error("igc----- stat_key is null");
                return;
            }
        };
        stat_manager.prototype.send_user_event = function (event_id, event_type, place_id, place_type, extra, str1, str2, extra2, str3) {
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.web) {
                return;
            }
            if (!igc.igc_main.instance.app_config.game_param.stat_key || igc.igc_main.instance.app_config.game_param.stat_key == "") {
                console.error("igc----- stat_key is null");
                return;
            }
            var send_json = stat_manager.instance.get_common_info();
            send_json["eventId"] = event_id + "";
            send_json["eventType"] = event_type + "";
            send_json["placeId"] = place_id + "";
            send_json["placeType"] = place_type + "";
            if (extra !== undefined) {
                send_json["extra"] = extra + "";
            }
            if (extra2 !== undefined) {
                send_json["extra2"] = extra2;
            }
            if (str1 != undefined) {
                send_json["str1"] = str1 + "";
            }
            if (str2 != undefined) {
                send_json["str2"] = str2 + "";
            }
            if (str3 != undefined) {
                send_json["str3"] = str3 + "";
            }
            if (igc.igc_main.instance.app_config.game_param.channel_type === igc.e_channel_type.apk) {
                send_json["str4"] = this._ad_id;
            }
            else {
                if (this._account != undefined) {
                    send_json["str4"] = this._account + "";
                }
            }
            if (this._osInfo != "") {
                send_json["osInfo"] = this._osInfo + "";
            }
            if (this._opInfo != "") {
                send_json["opInfo"] = this._opInfo + "";
            }
            // igc.igc_main.instance.tpf_sdk.getStat().sendUserCustom(send_json, this.get_server_time());
        };
        stat_manager.prototype.send_place = function () {
        };
        stat_manager._instances = undefined;
        return stat_manager;
    }());
    igc.stat_manager = stat_manager;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var multual_push_type;
    (function (multual_push_type) {
        multual_push_type[multual_push_type["guess_like"] = 0] = "guess_like";
        multual_push_type[multual_push_type["update_icon"] = 1] = "update_icon";
    })(multual_push_type = igc.multual_push_type || (igc.multual_push_type = {}));
    var e_push_type;
    (function (e_push_type) {
        e_push_type[e_push_type["gif"] = 1] = "gif";
        e_push_type[e_push_type["side"] = 2] = "side";
        e_push_type[e_push_type["guess"] = 3] = "guess";
        e_push_type[e_push_type["popular"] = 4] = "popular";
    })(e_push_type = igc.e_push_type || (igc.e_push_type = {}));
    var e_push_ui_place;
    (function (e_push_ui_place) {
        e_push_ui_place[e_push_ui_place["main_city"] = 1] = "main_city";
        e_push_ui_place[e_push_ui_place["revive"] = 2] = "revive";
        e_push_ui_place[e_push_ui_place["success"] = 3] = "success";
        e_push_ui_place[e_push_ui_place["fail"] = 4] = "fail";
    })(e_push_ui_place = igc.e_push_ui_place || (igc.e_push_ui_place = {}));
    var multual_push_manager = (function () {
        function multual_push_manager() {
            this.tpf_pid = "";
            this.tpf_uid = "";
            this._config_remote_init = false;
            this._multual_push_data = {};
            this.registerlistener();
        }
        multual_push_manager.prototype.registerlistener = function () {
        };
        Object.defineProperty(multual_push_manager, "instance", {
            get: function () {
                if (multual_push_manager._instance === undefined) {
                    multual_push_manager._instance = new multual_push_manager();
                }
                return multual_push_manager._instance;
            },
            enumerable: true,
            configurable: true
        });
        multual_push_manager.prototype.set_uid = function (tpf_pid, tpf_uid) {
            this.tpf_pid = tpf_pid;
            this.tpf_uid = tpf_uid;
        };
        multual_push_manager.prototype.check_need_update_game_number = function () {
        };
        multual_push_manager.prototype.save_data = function () {
        };
        multual_push_manager.prototype.init = function () {
        };
        multual_push_manager.prototype.navigate_to_mini_program = function (param) {
            if (param && param.targetAppId) {
                console.log("multual_push_manager send_user_event", "event_type------>", igc.e_multual_push_report.click_multual_push_icon, "app_id------->", param.targetAppId, "chapterId", param.chapterId);
                var curAppId = igc.igc_main.instance.app_config.game_param.app_id;
                igc.stat_manager.instance.send_user_event(param.eventId, igc.e_multual_push_report.click_multual_push_icon, param.placeId, param.placeType, "", curAppId, param.targetAppId, 0, param.chapterId);
                if (param) {
                    param.cur_app_id = igc.igc_main.instance.app_config.game_param.app_id;
                    param.cur_pkg_name = igc.igc_main.instance.app_config.game_param.pkg_name;
                    param.tpf_pid = this.tpf_pid;
                    param.tpf_uid = this.tpf_uid;
                }
                igc.igc_main.instance.navigate_to_mini_program(param);
            }
        };
        multual_push_manager._instance = undefined;
        return multual_push_manager;
    }());
    igc.multual_push_manager = multual_push_manager;
})(igc || (igc = {}));
var igc;
(function (igc) {
    var utils_manager = (function () {
        function utils_manager() {
        }
        utils_manager.get_random_name = function () {
            var name = "role_";
            var pos = 0;
            var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            for (var i = 0; i < 8; i++) {
                pos = Math.round(Math.random() * (arr.length - 1));
                name += arr[pos];
            }
            name += "_";
            name += Date.now();
            return name;
        };
        utils_manager.compare_version = function (v1, v2) {
            if (v1 == v2) {
                return 0;
            }
            var v1_array = v1.split(/[._]/);
            var v2_array = v2.split(/[._]/);
            var index = 0;
            var minLen = Math.min(v1_array.length, v2_array.length);
            var diff = 0;
            while (index < minLen
                && (diff = parseInt(v1_array[index])
                    - parseInt(v2_array[index])) == 0) {
                index++;
            }
            if (diff == 0) {
                for (var i = index; i < v1_array.length; i++) {
                    if (parseInt(v1_array[i]) > 0) {
                        return 1;
                    }
                }
                for (var i = index; i < v2_array.length; i++) {
                    if (parseInt(v2_array[i]) > 0) {
                        return -1;
                    }
                }
                return 0;
            }
            else {
                return diff > 0 ? 1 : -1;
            }
        };
        return utils_manager;
    }());
    igc.utils_manager = utils_manager;
})(igc || (igc = {}));
