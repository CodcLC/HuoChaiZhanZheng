declare namespace igc {
    enum e_facade_type {
        user = 1,
        pay = 2,
        push = 3,
        share = 4,
        analytics = 5,
        droidplugin = 6,
        pluginpay = 7,
        ad = 8,
        plugindownload = 9,
        system = 100,
    }
    enum e_method_type {
        login = 1,
        pay = 2,
        create_ad = 3,
        destroy_ad = 4,
        show_ad = 5,
        hide_ad = 6,
        get_user_info = 7,
        share = 8,
        show_loading = 9,
        show_toast = 10,
        show_modal = 11,
        on_show = 12,
        navigate_to_mini_program = 13,
        get_system_info_sync = 14,
        create_inner_audio_context = 15,
        post_message = 16,
        set_user_cloud_storage = 17,
        get_setting = 18,
        create_user_info_button = 19,
        open_setting = 20,
        authorize = 21,
        get_device = 22,
        has_ad = 23,
        report_ad_show = 24,
        report_ad_click = 25,
        load_ad_just = 26,
        show_ad_just = 27,
        device_shake = 28,
        check_can_add_desktop = 29,
        check_is_add_desktop = 30,
        add_desktop = 31,
        get_launch_options_sync = 32,
        show_more_game_modal = 33,
        check_show_more_game = 34,
        more_game_btn_tap = 35,
        more_game_btn_show = 36,
        more_game_btn_hide = 37,
        get_invite_query = 38,
        set_show_share_menu = 39,
        on_hide = 40,
        report_ad_close = 41,
        set_ad_position = 42,
        on_share_app_message = 1000,
        start_record_screen = 1001,
        stop_record_screen = 1002,
        pause_record_screen = 1003,
        resume_record_screen = 1004,
        share_record_screen = 1005,
        get_record_video = 1006,
        exit_mini_program = 1100,
    }
    enum e_ad_type {
        interstitial = 1,
        video = 2,
        native = 3,
        banner = 4,
        splash = 5,
        app_box = 6,
        feed = 7,
        full_screen_video = 8,
        block = 9,
        open_screen = 10,
    }
    enum e_ad_native_type {
        native_inter = 1,
        native_list = 2,
        native_banner_dialog = 3,
        native_banner_normal = 4,
    }
    enum e_ad_app_box_type {
        banner_box = 6,
        portal_box = 7,
    }
    enum e_apk_ad_type {
        splash = 1,
        banner = 2,
        interstitial = 3,
        native = 4,
        video = 5,
        feed = 6,
        FullScreenVideo = 7,
    }
    enum e_ad_op {
        none = 0,
        create = 1,
        load = 2,
        show = 3,
        hide = 4,
        click = 5,
        close = 6,
        destroy = 7,
    }
    enum e_ad_status {
        none = 0,
        init = 1,
        load_success = 2,
        show = 3,
        close = 4,
    }
    enum e_ad_event {
        none = 0,
        visible = 1,
        click = 2,
        req = 3,
        show = 4,
        hide = 5,
        onload = 6,
        onshow = 7,
        onhide = 8,
        onclick = 9,
        onclose = 10,
        onerror = 11,
    }
    enum e_ad_video_close {
        uncomplete = 0,
        complete = 1,
    }
    enum e_ad_result {
        start_req = 0,
        create_ok = 1,
        create_err = 2,
        load_ok = 3,
        load_err = 4,
        show_ok = 5,
        show_err = 6,
        reward_complete = 7,
        reward_uncomplete = 8,
        native_show = 9,
        native_click = 10,
        interstitial_close = 11,
        start_show_interstitial = 12,
    }
    enum e_apk_error_code {
        login_success = 4,
        login_fail = 5,
        login_timeout = 6,
        login_cancel = 7,
        logoff_success = 8,
        logoff_fail = 9,
        pay_success = 10,
        pay_fail = 11,
        pay_param_error = -4,
        exit_success = 33,
        exit_cancel = 34,
        pay_request_repeat = 35,
        pre_order_success = 47,
        pre_order_fail = 48,
        query_order_success = 49,
        query_order_fail = 50,
        send_item_success = 51,
        send_item_fail = 52,
        ad_load_success = 10030,
        ad_show_success = 10031,
        ad_clicked = 10032,
        ad_video_complete = 10033,
        ad_video_complete_reward = 10034,
        ad_closed = 10035,
        ad_show_fail = 10036,
        ad_load_fail = 10037,
    }
    enum e_channel_type {
        test = 0,
        web = 1,
        oppo_qg = 2,
        wx = 3,
        vivo_qg = 4,
        qq = 5,
        ddz = 6,
        apk = 7,
        tt = 8,
        ipa = 9,
        hw_qg = 10,
    }
    enum e_channel_sex {
        none = 0,
        man = 1,
        female = 2,
    }
    enum e_channel_id {
        test = 0,
        oppo = 1,
        vivo = 2,
        oppo_activity = 3,
        wx = 4,
        doudizhu = 5,
        ali = 6,
        oppo_spring_festival = 7,
        qq = 8,
        qq_ios = 9,
        tt = 10,
        oppo_apk = 11,
        vivo_apk = 12,
        huawei_apk = 13,
        hw_qg = 1000,
        meizu_apk = 19,
        lenovo_apk = 20,
        kupai_apk = 21,
        jinli_apk = 22,
        apk = 607000,
        ipa = 609000,
    }
    enum e_sub_channel_id {
        oppo = 1001,
        oppo_qg = 1002,
    }
    enum e_device {
        unknown = 0,
        ios = 1,
        android = 2,
        desktop = 3,
    }
    enum e_red_envelope_status {
        not_enough = 1,
        get_money = 2,
        get_reward = 3,
        sign_not_enough = 4,
        sumbit_complete = 5,
        reward_complete = 6,
    }
    enum e_red_envelope_report {
        open_red_envelope = 20000,
    }
    enum e_share_type {
        normal = 0,
        invite = 1,
        card = 2,
        record = 3,
    }
    enum e_multual_push_report {
        click_multual_push_icon = 30001,
        show_more_game_modal = 30002,
        more_game_btn_tap = 30003,
        on_navigate_to_miniProgram = 30004,
        on_more_games_modal_close = 30005,
        on_show_more_game_modal_success = 30006,
        on_show_more_game_modal_fail = 30007,
    }
    enum e_inner_video_result {
        share_record_success = 500001,
        share_record_less_time = 500002,
        share_record_fail = 500003,
    }
    enum e_share_event_type {
        share = 11000,
    }
    enum e_share_event_id {
        click = 1,
        new_player = 2,
        old_player = 3,
        click_record = 4,
        share_record_success = 5,
        share_record_less_time = 6,
        share_record_fail = 7,
    }
    enum e_general_report {
        result_sign = 40001,
        result_turntable = 40002,
        result_key = 40003,
        result_box = 40004,
    }
    enum e_apk_event_key {
        EVENT_TYPE_LOGIN = "EVENT_TYPE_LOGIN",
        EVENT_TYPE_LOGOUT = "EVENT_TYPE_LOGOUT",
        EVENT_TYPE_PAY = "EVENT_TYPE_PAY",
        EVENT_TYPE_EXIT = "EVENT_TYPE_EXIT",
        EVENT_TYPE_AD = "EVENT_TYPE_AD",
        EVENT_TYPE_COMMON = "EVENT_TYPE_COMMON",
    }
    enum e_comm_event_key {
        CommonEventKey_SwitchLogin = "CommonEventKey_SwitchLogin",
        CommonEventKey_Prepay = "CommonEventKey_Prepay",
        CommonEventKey_QueryOrder = "CommonEventKey_QueryOrder",
        CommonEventKey_QueryOrderList = "CommonEventKey_QueryOrderList",
        CommonEventKey_ConfirmOrder = "CommonEventKey_ConfirmOrder",
        CommonEventKey_GetUserInfo = "CommonEventKey_GetUserInfo",
    }
}
declare namespace igc {
    enum e_engine_type {
        cocos = 1,
        laya = 2,
        egret = 3,
    }
    enum igc_login_level {
        login_channle = 0,
        login_tpf = 1,
        login_plat = 2,
        login_plat_re = 3,
        login_without_http = 4,
    }
    enum e_log_level {
        none = 0,
        error = 1,
        warn = 2,
        log = 3,
    }
    var igc_config: {
        release: {
            game_param: {};
            channel_config: {
                1: {
                    channel_type: e_channel_type;
                    app_id: number;
                    pkg_name: number;
                    facade: {
                        1: string;
                        2: string;
                        8: string;
                        4: string;
                        100: string;
                    };
                };
                2: {
                    channel_type: e_channel_type;
                    facade: {
                        1: string;
                        8: string;
                        100: string;
                    };
                };
                4: {
                    channel_type: e_channel_type;
                    facade: {
                        1: string;
                        8: string;
                        100: string;
                    };
                };
                5: {
                    channel_type: e_channel_type;
                    facade: {
                        1: string;
                        4: string;
                        8: string;
                        100: string;
                    };
                };
                8: {
                    channel_type: e_channel_type;
                    facade: {
                        1: string;
                        4: string;
                        8: string;
                        100: string;
                    };
                };
                10: {
                    channel_type: e_channel_type;
                    facade: {
                        1: string;
                        8: string;
                        100: string;
                    };
                };
            };
        };
        debug: {
            game_param: {};
            channel_config: {};
        };
    };
}
declare namespace igc {
    class igc_main {
        private storage_keys;
        _init: boolean;
        _channel_type: number;
        private retry_connect_count;
        private retry_channel_login;
        is_new_player: boolean;
        tpf_user_id: string;
        channel_user_id: string;
        tpf_token: string;
        private static _instances;
        static readonly instance: igc_main;
        private _tpf_sdk;
        private _release;
        private _force_offline;
        private _apk_user_info;
        tpf_sdk: any;
        readonly app_config: any;
        readonly multual_push_manager: multual_push_manager;
        private init_multual_push_manager();
        Update(): void;
        init_wrap(channel_type: e_channel_type, init_config: any): void;
        init(release: any): void;
        init_param(game_param: any): void;
        init_log(): void;
        login_wrap_without_http(args: any): void;
        login_wrap(): void;
        private init_ad_param(param);
        navigate_to_mini_program(param: any): any;
        get_plat_type(channel_type: any): "test" | "web" | "OPPO_QG" | "WECHAT" | "VIVO_QG" | "DDZ" | "QQ_NEW" | "APK" | "TT" | "ipa";
        init_tpf(game_param: any): void;
        init_channel(param: any): void;
        init_config(): void;
        only_login_channel(callback: any): void;
        create_ad(param: any): any;
        destroy_ad(param: any): any;
        show_ad(param: any): any;
        hide_ad(param: any): any;
        has_ad(param: any): any;
        set_ad_position(param: any): any;
        report_ad_show(param: any): any;
        report_ad_click(param: any): any;
        report_ad_close(param: any): any;
        device_shake(param: any): any;
        check_can_add_desktop(param: any): any;
        check_is_add_desktop(param: any): any;
        add_desktop(param: any): any;
        on_show(param: any): any;
        on_hide(param: any): any;
        get_system_info_sync(): any;
        share(param: any): any;
        on_share_app_message(param: any): any;
        start_record_screen(param: any): any;
        stop_record_screen(): any;
        pause_record_screen(): any;
        resume_record_screen(): any;
        share_record_screen(param: any): any;
        get_record_video(): any;
        get_launch_options_sync(): any;
        exit_mini_program(): any;
    }
}
declare namespace igc {
    enum e_channel_code {
        support_error = -5,
        param_error = -4,
        param_not_complete = -3,
        network_error = -2,
        fail = -1,
        success = 0,
        init_success = 1,
        init_fail = 2,
        uninit = 3,
        login_success = 4,
        login_fail = 5,
        login_timeout = 6,
        unlogin = 7,
        logout_success = 8,
        logout_fail = 9,
        pay_success = 10,
        pay_fail = 11,
        share_success = 12,
        share_failed = 13,
    }
}
declare namespace igc {
    class channel_config {
        static config: {};
        static init(game_param: any, channel_param: any): void;
    }
}
declare namespace igc {
    class channel_facade_manager {
        private channel_config;
        private static _instances;
        static readonly instance: channel_facade_manager;
        init(channel_config: any): void;
        private check_support_facade(facade_type);
        private get_facade_name(facade_type);
        init_facade(facade_type: any): any;
        diy_eval(fn: any): Function;
    }
}
declare namespace igc {
    class channel_sdk {
        private static _instances;
        static readonly instance: channel_sdk;
        private _channel_user_info;
        private _is_login;
        channel_user_info: any;
        init(game_param: any, channel_param: any): void;
        login(login_param: any, callback: any): void;
        pay(pay_param: any, callback: any): void;
        create_ad(param: any): any;
        destroy_ad(param: any): any;
        show_ad(param: any): any;
        hide_ad(param: any): any;
        has_ad(param: any): any;
        set_ad_position(param: any): any;
        report_ad_show(param: any): any;
        report_ad_click(param: any): any;
        report_ad_close(param: any): any;
        load_ad_just(param: any): any;
        show_ad_just(param: any): any;
        show_loading(param: any): any;
        show_toast(param: any): any;
        show_modal(param: any): any;
        on_show(param: any): any;
        on_hide(param: any): any;
        navigate_to_mini_program(param: any): any;
        get_launch_options_sync(): any;
        exit_mini_program(): any;
        show_more_game_modal(): any;
        check_show_more_game(param: any): any;
        more_game_btn_tap(): any;
        more_game_btn_show(): any;
        more_game_btn_hide(): any;
        get_invite_query(): any;
        set_show_share_menu(param: any): any;
        get_system_info_sync(): any;
        create_inner_audio_context(param: any): any;
        post_message(param: any): any;
        set_user_cloud_storage(param: any): any;
        get_setting(param: any): any;
        create_user_info_button(param: any): any;
        open_setting(param: any): any;
        authorize(param: any): any;
        get_device(param: any): any;
        device_shake(param: any): any;
        check_can_add_desktop(param: any): any;
        check_is_add_desktop(param: any): any;
        add_desktop(param: any): any;
        share(param: any): any;
        on_share_app_message(param: any): any;
        start_record_screen(param: any): any;
        stop_record_screen(): any;
        pause_record_screen(): any;
        resume_record_screen(): any;
        share_record_screen(param: any): any;
        get_record_video(): any;
    }
}
declare namespace igc {
    class channel_facade_aa_base {
        protected support_method: {};
        init(): void;
        check_support_method(method_type: any): boolean;
        check_param(param: any): boolean;
    }
}
declare namespace igc {
    class channel_facade_ad_base extends channel_facade_aa_base {
        protected ad_queue: {};
        create_ad(param: any): void;
        destroy_ad(param: any): void;
        show_ad(param: any): void;
        hide_ad(param: any): void;
        set_ad_position(param: any): void;
        report_ad_show(param: any): void;
        report_ad_click(param: any): void;
        load_ad_just(param: any): void;
        show_ad_just(param: any): void;
        has_ad(param: any): boolean;
    }
}
declare namespace igc {
    class channel_facade_pay_base extends channel_facade_aa_base {
        check_param(param: any): boolean;
        signPart(params: any, sign_cfg: any): string;
        submit_order(pay_param: any, channel_extension: any, callback: any): boolean;
        protected retry_query_order(pay_param: any, order_param: any, channel_extension: any, callback: any): boolean;
        protected query_order(pay_param: any, order_param: any, channel_extension: any, callback: any): void;
        pay(pay_param: any, callback: any): void;
        protected on_pay_result(retcode: any, param: any, callback: any): void;
    }
}
declare namespace igc {
    class channel_facade_share_base extends channel_facade_aa_base {
        share(param: any): void;
        on_share_app_message(param: any): void;
        start_record_screen(param: any): void;
        stop_record_screen(param: any): void;
        pause_record_screen(param: any): void;
        resume_record_screen(param: any): void;
        share_record_screen(param: any): void;
        get_record_video(param: any): void;
    }
}
declare namespace igc {
    class channel_facade_system_base extends channel_facade_aa_base {
        get_system_info_sync(): void;
        get_launch_options_sync(): void;
        on_show(param: any): void;
        on_hide(param: any): void;
        exit_mini_program(): void;
        navigate_to_mini_program(param: any): void;
    }
}
declare namespace igc {
    class channel_facade_user_base extends channel_facade_aa_base {
        login(login_param: any, callback: any): void;
        share(param: any): void;
        protected on_login_result(retcode: any, param: any, callback: any): void;
        protected create_channel_user_info(param: any): string;
        protected config_channel_user_info(param: any, create_func: any): any;
        protected get_random_name(): string;
    }
}
declare namespace igc {
    class channel_module_ad_xx {
        private facade_obj;
        private static _instances;
        static readonly instance: channel_module_ad_xx;
        init(): void;
        check_support_method(method_type: any): any;
        create_ad(param: any): any;
        destroy_ad(param: any): any;
        show_ad(param: any): any;
        hide_ad(param: any): any;
        has_ad(param: any): any;
        set_ad_position(param: any): any;
        report_ad_show(param: any): any;
        report_ad_click(param: any): any;
        report_ad_close(param: any): any;
        load_ad_just(param: any): any;
        show_ad_just(param: any): any;
    }
}
declare namespace igc {
    class channel_module_pay {
        private facade_obj;
        private static _instances;
        static readonly instance: channel_module_pay;
        init(): void;
        check_support_method(method_type: any): any;
        pay(pay_param: any, callback: any): void;
    }
}
declare namespace igc {
    class channel_module_share {
        private facade_obj;
        private static _instances;
        static readonly instance: channel_module_share;
        init(): void;
        check_support_method(method_type: any): any;
        share(param: any): any;
        on_share_app_message(param: any): any;
        start_record_screen(param: any): any;
        stop_record_screen(): any;
        pause_record_screen(): any;
        resume_record_screen(): any;
        share_record_screen(param: any): any;
        get_record_video(): any;
    }
}
declare namespace igc {
    class channel_module_system {
        private facade_obj;
        private static _instances;
        static readonly instance: channel_module_system;
        init(): void;
        check_support_method(method_type: any): any;
        get_system_info_sync(): any;
        get_launch_options_sync(): any;
        on_show(param: any): any;
        on_hide(param: any): any;
        exit_mini_program(): any;
        navigate_to_mini_program(param: any): any;
    }
}
declare namespace igc {
    class channel_module_user {
        private facade_obj;
        private static _instances;
        static readonly instance: channel_module_user;
        init(): void;
        share(param: any): any;
        show_loading(param: any): any;
        show_toast(param: any): any;
        show_modal(param: any): any;
        on_show(param: any): any;
        on_hide(param: any): any;
        navigate_to_mini_program(param: any): any;
        get_launch_options_sync(): any;
        show_more_game_modal(): any;
        check_show_more_game(param: any): any;
        more_game_btn_tap(): any;
        more_game_btn_show(): any;
        more_game_btn_hide(): any;
        get_invite_query(): any;
        set_show_share_menu(param: any): any;
        get_system_info_sync(param: any): any;
        create_inner_audio_context(param: any): any;
        post_message(param: any): any;
        set_user_cloud_storage(param: any): any;
        get_setting(param: any): any;
        create_user_info_button(param: any): any;
        open_setting(param: any): any;
        authorize(param: any): any;
        get_device(param: any): any;
        check_support_method(method_type: any): any;
        login(login_param: any, callback: any): void;
        device_shake(param: any): any;
        check_can_add_desktop(param: any): any;
        check_is_add_desktop(param: any): any;
        add_desktop(param: any): any;
    }
}
declare namespace igc {
    class ad_base {
        protected ad_instance: any;
        protected ad_param: any;
        protected ad_status: e_ad_status;
        protected ad_op: e_ad_op;
        get_ad_type_name(ad_type: any): "" | "video" | "interstitial" | "native" | "banner" | "splash" | "app_box" | "feed" | "full_screen_video";
        get_ad_event_name(ad_event: any): string;
        release(): void;
        create(param: any): void;
        hide_ad(param: any): void;
        show_ad(param: any): void;
        set_ad_position(param: any): void;
        destroy_ad(param: any): void;
        report_ad_close(param: any): void;
        report_ad_show(param: any): void;
        report_ad_click(param: any): void;
        check_param(param: any): void;
        on_load(param: any, res: any): void;
        on_close(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_show(param: any): void;
        on_hide(param: any): void;
        send_dot(ad_pos_id: any, ad_type: any, ad_event: any, extra: any, extra2: any, ad_scene: any, ad_package_id: any, ad_op: any): void;
    }
}
declare namespace igc {
    class channel_ad_hw_qg extends channel_facade_ad_base {
        private can_ad;
        private can_video;
        private can_native;
        private ad_video;
        private ad_native;
        private ad_native_map;
        private platformVersionCode;
        init(): void;
        has_ad(param: any): boolean;
        create_ad(param: any): boolean;
        private create_ad_video(param);
        private create_ad_native(param);
        show_ad(param: any): boolean;
        show_ad_video(param: any): boolean;
        show_ad_native(param: any): boolean;
        hide_ad(param: any): boolean;
        hide_ad_video(param: any): boolean;
        hide_ad_native(param: any): boolean;
        destroy_ad(param: any): boolean;
        destroy_ad_video(param: any): boolean;
        destroy_ad_native(param: any): boolean;
        report_ad_show(param: any): boolean;
        report_ad_click(param: any): boolean;
        report_ad_close(param: any): boolean;
    }
}
declare namespace igc {
    class channel_system_hw_qg extends channel_facade_share_base {
        init(): void;
        register_listener(): void;
        get_system_info_sync(): void;
        exit_mini_program(): any;
        on_show(param: any): any;
        on_hide(param: any): any;
    }
}
declare namespace igc {
    class channel_user_hw_qg extends channel_facade_user_base {
        private token;
        private deviceId;
        private callback;
        private needAuth;
        private is_old;
        private playId;
        init(): void;
        login(login_param: any, callback: any): void;
        initHW(): void;
        initHWByAuth(): void;
        initHWInfo(token: any): void;
        on_login_result(retcode: any, param: any, callback: any): void;
        get_tourise_info(): {
            "userId": string;
            "userName": string;
            "avatar": string;
        };
        device_shake(param: any): void;
        check_is_add_desktop(param: any): void;
        add_desktop(param: any): void;
    }
}
declare namespace igc {
    class ad_native_hw_qg extends ad_base {
        release(): void;
        create(param: any): void;
        update_show(param: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
        report_ad_close(param: any): void;
        report_ad_show(param: any): boolean;
        report_ad_click(param: any): boolean;
    }
}
declare namespace igc {
    class ad_video_hw_qg extends ad_base {
        private has_load_tag;
        private video_tag;
        release(): void;
        create(param: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_close(param: any, res: any): void;
        show_ad_id: any;
        show_ad(param: any): void;
    }
}
declare namespace igc {
    class channel_ad_oppo_qg extends channel_facade_ad_base {
        private can_ad;
        private can_interstitial;
        private can_multualpush_box;
        private ad_banner;
        private ad_video;
        private ad_interstitial;
        private ad_bannerbox;
        private ad_portalbox;
        private ad_native_map;
        private platformVersionCode;
        init(): void;
        has_ad(param: any): boolean;
        create_ad(param: any): boolean | void;
        private create_ad_banner(param);
        private create_ad_video(param);
        private create_ad_interstitial(param);
        private create_ad_native(param);
        private create_ad_app_box(param);
        show_ad(param: any): boolean;
        show_ad_banner(param: any): boolean;
        show_ad_video(param: any): boolean;
        show_ad_interstitial(param: any): boolean;
        show_ad_native(param: any): boolean;
        show_ad_app_box(param: any): boolean;
        hide_ad(param: any): boolean;
        hide_ad_banner(param: any): boolean;
        hide_ad_video(param: any): boolean;
        hide_ad_interstitial(param: any): boolean;
        hide_ad_native(param: any): boolean;
        hide_ad_app_box(param: any): boolean;
        destroy_ad(param: any): boolean | void;
        private destroy_ad_banner(param);
        private destroy_ad_video(param);
        private destroy_ad_interstitial(param);
        private destroy_ad_native(param);
        destroy_ad_app_box(param: any): void;
        report_ad_show(param: any): boolean;
        report_ad_click(param: any): boolean;
        report_ad_close(param: any): boolean;
    }
}
declare namespace igc {
    class channel_system_oppo_qg extends channel_facade_share_base {
        init(): void;
        register_listener(): void;
        get_system_info_sync(): {
            brand: any;
            model: any;
            pixelRatio: any;
            screenWidth: any;
            screenHeight: any;
            windowWidth: any;
            windowHeight: any;
            statusBarHeight: any;
            language: any;
            version: any;
            platform: any;
            system: any;
            platformVersion: any;
            extra: any;
        };
        get_launch_options_sync(): {
            query: any;
            referrerInfo: any;
        };
        exit_mini_program(): any;
        on_show(param: any): any;
        on_hide(param: any): any;
        navigate_to_mini_program(param: any): any;
    }
}
declare namespace igc {
    class channel_user_oppo_qg extends channel_facade_user_base {
        private platformVersion;
        init(): void;
        login(login_param: any, callback: any): void;
        on_login_result(retcode: any, param: any, callback: any): void;
        navigate_to_mini_program(param: any): any;
        device_shake(param: any): void;
        check_can_add_desktop(): boolean;
        check_is_add_desktop(param: any): void;
        on_show(param: any): any;
        on_hide(param: any): any;
        add_desktop(param: any): boolean;
    }
}
declare namespace igc {
    class ad_bannerbox_oppo_qg extends ad_base {
        release(): void;
        create(param: any): void;
        on_load_callback(): void;
        on_error_callback(err: any): void;
        on_error(param: any, err: any): void;
        on_close(param: any, res: any): void;
        destroy_ad(param: any): void;
    }
}
declare namespace igc {
    class ad_banner_oppo_qg extends ad_base {
        private show_num;
        release(): void;
        create(param: any): void;
        show_ad(param: any): void;
        ad_hide_op: boolean;
        hide_ad(param: any): void;
        destroy_ad(param: any): void;
        on_error(param: any, err: any): void;
        on_close(param: any, res: any): void;
    }
}
declare namespace igc {
    class ad_interstitial_oppo_qg extends ad_base {
        release(): void;
        create_low(param: any): void;
        create(param: any): void;
        show_ad(param: any): void;
        on_load(param: any, res: any): void;
        on_close(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_show(param: any): void;
    }
}
declare namespace igc {
    class ad_native_oppo_qg extends ad_base {
        release(): void;
        create(param: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
        report_ad_close(param: any): void;
        report_ad_show(param: any): boolean;
        report_ad_click(param: any): boolean;
    }
}
declare namespace igc {
    class ad_portalbox_oppo_qg extends ad_base {
        load_success: boolean;
        release(): void;
        create(param: any): void;
        on_load_callback(): void;
        on_error_callback(err: any): void;
        on_close_callback(): void;
        on_load(param: any, res: any): void;
        show_ad(param: any): void;
        on_error(param: any, err: any): void;
        on_close(param: any, res: any): void;
        destroy_ad(param: any): void;
    }
}
declare namespace igc {
    class ad_video_oppo_qg extends ad_base {
        release(): void;
        create(param: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_close(param: any, res: any): void;
    }
}
declare namespace igc {
    class channel_ad_qq extends channel_facade_ad_base {
        private ad_banner;
        private ad_video;
        private ad_appbox;
        private ad_interstitial;
        private ad_block_map;
        private ad_sysInfo;
        private banner_top_offset;
        private can_video;
        private can_banner;
        private can_appbox;
        private can_inter;
        private can_block;
        init(): void;
        has_ad(param: any): boolean;
        create_ad(param: any): boolean | void;
        private create_ad_banner(param);
        private create_ad_video(param);
        private create_ad_app_box(param);
        private create_ad_interstitial(param);
        private create_ad_block(param);
        set_ad_position(param: any): void;
        show_ad(param: any): boolean;
        show_ad_banner(param: any): boolean;
        show_ad_video(param: any): boolean;
        show_ad_app_box(param: any): boolean;
        show_ad_interstitial(param: any): boolean;
        show_ad_block(param: any): boolean;
        hide_ad(param: any): boolean | void;
        hide_ad_banner(param: any): void;
        hide_ad_video(param: any): void;
        hide_ad_appbox(param: any): void;
        hide_ad_interstitial(param: any): void;
        hide_ad_block(param: any): boolean;
        destroy_ad(param: any): boolean | void;
        private destroy_ad_banner(param);
        private destroy_ad_video(param);
        private destroy_ad_app_box(param);
        private destroy_ad_interstitial(param);
        private destroy_ad_block(param);
    }
}
declare namespace igc {
    class channel_share_qq extends channel_facade_share_base {
        init(): void;
        register_listener(): void;
        on_share_app_message(param: any): void;
        share(param: any): void;
    }
}
declare namespace igc {
    class channel_system_qq extends channel_facade_share_base {
        init(): void;
        register_listener(): void;
        get_system_info_sync(): {
            brand: any;
            model: any;
            pixelRatio: any;
            screenWidth: any;
            screenHeight: any;
            windowWidth: any;
            windowHeight: any;
            statusBarHeight: any;
            language: any;
            version: any;
            platform: any;
            system: any;
            platformVersion: any;
            extra: any;
        };
        get_launch_options_sync(): {
            scene: any;
            query: any;
            shareTicket: any;
            referrerInfo: any;
            entryDataHash: any;
        };
        exit_mini_program(): any;
        on_show(param: any): any;
        on_hide(param: any): any;
    }
}
declare namespace igc {
    class channel_user_qq extends channel_facade_user_base {
        private button;
        init(): void;
        login(login_param: any, callback: any): void;
        private getSetting(callback);
        private getUserInfo(callback);
        get_user_info(param: any): boolean;
        private create_button(param);
        config_channel_user_info_ex(param: any): any;
        on_login_result(retcode: any, param: any, callback: any): void;
        share(param: any): any;
        show_loading(param: any): any;
        show_toast(param: any): any;
        show_modal(param: any): any;
        on_show(param: any): any;
        on_hide(param: any): any;
        navigate_to_mini_program(param: any): any;
        get_system_info_sync(param: any): any;
        create_inner_audio_context(param: any): any;
        post_message(param: any): any;
        set_user_cloud_storage(param: any): any;
        get_setting(param: any): any;
        create_user_info_button(param: any): any;
        open_setting(param: any): any;
        authorize(param: any): any;
        get_device(param: any): e_device;
        get_invite_query(): any;
        set_show_share_menu(param: any): void;
        get_launch_options_sync(): any;
    }
}
declare namespace igc {
    class ad_appbox_qq extends ad_base {
        release(): void;
        is_first: boolean;
        create(param: any): void;
        on_close_callback(res: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_close(param: any, res: any): void;
        destroy_ad(param: any): void;
    }
}
declare namespace igc {
    class ad_banner_qq extends ad_base {
        private show_num;
        private is_resize_back;
        private top_offset;
        private banner_size;
        release(): void;
        create(param: any): void;
        on_error_callback(err: any): void;
        on_load_callback(): void;
        on_resize_callback(size: any): void;
        set_ad_position(param: any): void;
        show_ad(param: any): void;
        hide_ad(param: any): void;
        destroy_ad(param: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
    }
}
declare namespace igc {
    class ad_block_qq extends ad_base {
        private show_num;
        private block_size;
        private is_showing;
        private is_resize_back;
        private top_offset;
        release(): void;
        create(param: any): void;
        set_ad_position(param: any): void;
        on_error_callback(err: any): void;
        on_load_callback(): void;
        on_resize_callback(size: any): void;
        show_ad(param: any): void;
        hide_ad(param: any): void;
        destroy_ad(param: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
    }
}
declare namespace igc {
    class ad_interstitial_qq extends ad_base {
        release(): void;
        is_first: boolean;
        create(param: any): void;
        on_error_callback(err: any): void;
        on_close_callback(): void;
        show_ad(param: any): void;
        on_close(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_show(param: any): void;
    }
}
declare namespace igc {
    class ad_video_qq extends ad_base {
        release(): void;
        is_first: boolean;
        create(param: any): void;
        on_error_callback(err: any): void;
        on_close_callback(res: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_close(param: any, res: any): void;
    }
}
declare namespace igc {
    class channel_ad_tt extends channel_facade_ad_base {
        private ad_banner;
        private ad_video;
        private ad_interstitial;
        private ad_sysInfo;
        private can_inter;
        private can_ad;
        init(): void;
        has_ad(param: any): boolean;
        create_ad(param: any): false | void;
        private create_ad_banner(param);
        private create_ad_video(param);
        private create_ad_interstitial(param);
        show_ad(param: any): boolean;
        show_ad_banner(param: any): boolean;
        show_ad_video(param: any): boolean;
        show_ad_interstitial(param: any): boolean;
        hide_ad(param: any): false | void;
        hide_ad_banner(param: any): void;
        hide_ad_video(param: any): void;
        hide_ad_interstitial(param: any): void;
        destroy_ad(param: any): false | void;
        private destroy_ad_banner(param);
        private destroy_ad_video(param);
        private destroy_ad_interstitial(param);
    }
}
declare namespace igc {
    class channel_share_tt extends channel_facade_share_base {
        init(): void;
        register_listener(): void;
        on_share_app_message(param: any): void;
        share(param: any): void;
        private _recorder;
        private _videoPath;
        private _isStart;
        private _isPause;
        private _inner_time;
        private timer_func;
        private _max_time;
        start_record_screen(param: any): void;
        start_timer(): void;
        stop_record_screen(): void;
        pause_record_screen(): void;
        resume_record_screen(): void;
        share_record_screen(param: any): void;
        get_record_video(): any;
        clipVideo(param: any): void;
    }
}
declare namespace igc {
    class channel_system_tt extends channel_facade_share_base {
        init(): void;
        register_listener(): void;
        get_system_info_sync(): {
            brand: any;
            model: any;
            pixelRatio: any;
            screenWidth: any;
            screenHeight: any;
            windowWidth: any;
            windowHeight: any;
            statusBarHeight: any;
            language: any;
            version: any;
            platform: any;
            system: any;
            platformVersion: any;
            extra: any;
        };
        get_launch_options_sync(): {
            query: any;
            extra: any;
        };
        exit_mini_program(): any;
        on_show(param: any): any;
        on_hide(param: any): any;
    }
}
declare namespace igc {
    class channel_user_tt extends channel_facade_user_base {
        private isLogin;
        private code;
        private anonymousCode;
        private needAuth;
        init(): void;
        login(login_param: any, callback: any): void;
        private get_tt_user_info(callback);
        on_login_result(retcode: any, param: any, callback: any): void;
        share(param: any): any;
        show_loading(param: any): any;
        show_toast(param: any): any;
        show_modal(param: any): any;
        on_show(param: any): any;
        on_hide(param: any): any;
        navigate_to_mini_program(param: any): any;
        get_launch_options_sync(): any;
        private app_launch_options;
        check_appLaunchOptions(param: any): void;
        check_show_more_game(param: any): 0 | 1;
        private more_game_btn;
        private create_more_games_button(param);
        more_game_btn_tap(): void;
        more_game_btn_show(): void;
        more_game_btn_hide(): void;
        private show_more_game_modal_init;
        show_more_game_modal(): boolean;
        get_system_info_sync(param: any): any;
        create_inner_audio_context(param: any): any;
        post_message(param: any): any;
        set_user_cloud_storage(param: any): any;
        get_setting(param: any): any;
        create_user_info_button(param: any): any;
        open_setting(param: any): any;
        authorize(param: any): any;
        get_device(param: any): e_device;
        get_tourise_info(): {
            "userId": string;
            "userName": string;
            "avatar": string;
        };
        device_shake(param: any): void;
        get_invite_query(): any;
    }
}
declare namespace igc {
    class ad_banner_tt extends ad_base {
        private show_num;
        private is_show_banner;
        release(): void;
        create(param: any): void;
        on_error_callback(err: any): void;
        on_load_callback(): void;
        on_resize_callback(size: any): void;
        show_ad(param: any): void;
        hide_ad(param: any): void;
        destroy_ad(param: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
    }
}
declare namespace igc {
    class ad_interstitial_tt extends ad_base {
        release(): void;
        create(param: any): void;
        on_load_callback(): void;
        on_error_callback(err: any): void;
        on_close_callback(): void;
        show_ad(param: any): void;
        on_load(param: any, res: any): void;
        on_close(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_show(param: any): void;
    }
}
declare namespace igc {
    class ad_video_tt extends ad_base {
        release(): void;
        is_first: boolean;
        create(param: any): void;
        on_load_callback(): void;
        on_error_callback(err: any): void;
        on_close_callback(res: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_close(param: any, res: any): void;
    }
}
declare namespace igc {
    class channel_ad_vivo_qg extends channel_facade_ad_base {
        private can_ad;
        private can_video;
        private can_native;
        private ad_banner;
        private ad_video;
        private ad_interstitial;
        private ad_native_map;
        private ad_banner_release_time;
        private ad_banner_create_time;
        private platformVersionCode;
        init(): void;
        has_ad(param: any): boolean;
        create_ad(param: any): boolean;
        private create_ad_banner(param);
        private create_ad_video(param);
        private create_ad_interstitial(param);
        private create_ad_native(param);
        show_ad(param: any): boolean;
        show_ad_banner(param: any): boolean;
        show_ad_video(param: any): boolean;
        show_ad_interstitial(param: any): boolean;
        show_ad_native(param: any): boolean;
        hide_ad(param: any): boolean;
        hide_ad_banner(param: any): boolean;
        hide_ad_video(param: any): boolean;
        hide_ad_interstitial(param: any): boolean;
        hide_ad_native(param: any): boolean;
        destroy_ad(param: any): boolean;
        destroy_ad_banner(param: any): boolean;
        destroy_ad_video(param: any): boolean;
        destroy_ad_interstitial(param: any): boolean;
        destroy_ad_native(param: any): boolean;
        report_ad_show(param: any): boolean;
        report_ad_click(param: any): boolean;
        report_ad_close(param: any): boolean;
    }
}
declare namespace igc {
    class channel_system_vivo_qg extends channel_facade_share_base {
        init(): void;
        register_listener(): void;
        get_system_info_sync(): any;
        exit_mini_program(): any;
        on_show(param: any): any;
        on_hide(param: any): any;
    }
}
declare namespace igc {
    class channel_user_vivo_qg extends channel_facade_user_base {
        private token;
        private deviceId;
        private callback;
        private needAuth;
        private is_old;
        private platformVersionCode;
        init(): void;
        login(login_param: any, callback: any): void;
        initVivo(): void;
        initVivoByAuth(): void;
        initVivoInfo(token: any): void;
        on_login_result(retcode: any, param: any, callback: any): void;
        get_tourise_info(): {
            "userId": string;
            "userName": string;
            "avatar": string;
        };
        device_shake(param: any): void;
        check_can_add_desktop(): boolean;
        check_is_add_desktop(param: any): void;
        add_desktop(param: any): boolean;
    }
}
declare namespace igc {
    class ad_banner_vivo_qg extends ad_base {
        private show_num;
        release(): void;
        create(param: any): void;
        show_ad(param: any): void;
        hide_ad(param: any): void;
        destroy_ad(param: any): void;
        on_close(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_show(param: any): void;
    }
}
declare namespace igc {
    class ad_interstitial_vivo_qg extends ad_base {
        release(): void;
        create(param: any): void;
        show_ad(param: any): void;
        on_load(param: any, res: any): void;
        on_close(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_show(param: any): void;
    }
}
declare namespace igc {
    class ad_native_vivo_qg extends ad_base {
        load_success: boolean;
        release(): void;
        create(param: any): void;
        update_show(param: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
        report_ad_close(param: any): void;
        report_ad_show(param: any): boolean;
        report_ad_click(param: any): boolean;
    }
}
declare namespace igc {
    class ad_video_vivo_qg extends ad_base {
        release(): void;
        create(param: any): void;
        update_show(param: any): void;
        on_load(param: any, res: any): void;
        on_error(param: any, err: any): void;
        on_close(param: any, res: any): void;
    }
}
declare namespace igc {
    class channel_ad_web extends channel_facade_ad_base {
        init(): void;
    }
}
declare namespace igc {
    class channel_pay_web extends channel_facade_pay_base {
        init(): void;
        protected get_extension(): string;
        pay(pay_param: any, callback: any): void;
        on_pay_result(retcode: any, param: any, callback: any): void;
    }
}
declare namespace igc {
    class channel_system_web extends channel_facade_share_base {
        init(): void;
        register_listener(): void;
    }
}
declare namespace igc {
    class channel_user_web extends channel_facade_user_base {
        init(): void;
        login(login_param: any, callback: any): void;
        check_can_add_desktop(): boolean;
        is_add_desktop: boolean;
        check_is_add_desktop(param: any): void;
        add_desktop(param: any): boolean;
    }
}
declare namespace igc {
    class igc_resources_utils {
        static parse_csv(strData: any, key: any): {};
    }
}
declare namespace igc {
    enum igc_stat_ids {
        video_click = 10006,
        video_compelete = 10010,
        video_uncompelete = 10011,
        multual_push_show = 305,
        multual_push_click = 304,
    }
}
declare namespace igc {
    class stat_manager {
        private static _instances;
        static readonly instance: stat_manager;
        private _user_id;
        private _server_id;
        _osInfo: string;
        _account: string;
        _opInfo: string;
        _device_id: string;
        private src_app_id;
        private _ad_id;
        private _sub_channel_type;
        private _scene_id;
        init(): void;
        get_random_name(): string;
        set_uid(account: any, user_id: any, server_id: any): void;
        protected get_common_info(): {
            account: string;
            deviceId: string;
            userId: string;
            serverId: string;
            acType: number;
            net: string;
        };
        send_app_start(): void;
        get_server_time(): number;
        send_user_register(): void;
        send_user_login(): void;
        send_heart_beat(): void;
        send_user_event(event_id: any, event_type: any, place_id: any, place_type: any, extra: any, str1?: any, str2?: any, extra2?: any, str3?: any): void;
        send_place(): void;
    }
}
declare namespace igc {
    enum multual_push_type {
        guess_like = 0,
        update_icon = 1,
    }
    enum e_push_type {
        gif = 1,
        side = 2,
        guess = 3,
        popular = 4,
    }
    enum e_push_ui_place {
        main_city = 1,
        revive = 2,
        success = 3,
        fail = 4,
    }
    class multual_push_manager {
        private tpf_pid;
        private tpf_uid;
        _config_remote_init: boolean;
        constructor();
        registerlistener(): void;
        private static _instance;
        static readonly instance: multual_push_manager;
        _multual_push_data: {};
        set_uid(tpf_pid: any, tpf_uid: any): void;
        check_need_update_game_number(): void;
        save_data(): void;
        init(): void;
        navigate_to_mini_program(param: any): void;
    }
}
declare namespace igc {
    class utils_manager {
        static get_random_name(): string;
        static compare_version(v1: any, v2: any): 0 | 1 | -1;
    }
}
