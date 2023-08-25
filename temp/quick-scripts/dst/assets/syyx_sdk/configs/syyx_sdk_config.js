
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/configs/syyx_sdk_config.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6a660kouH9LHJs5I4q8x25q', 'syyx_sdk_config');
// syyx_sdk/configs/syyx_sdk_config.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syyx_const = exports.e_syyx_sdk_publish_type = exports.init_config = void 0;
exports.init_config = {
    web: {
        app_id: 600000,
        app_version: "1.0.0.0",
        pkg_name: "",
        channel_type: 1,
        channel_id: 0,
        engin_type: 2,
        engin_version: "2.0.10",
        log_level: 0,
        pay_key: "",
        login_key: "",
        plat_key: "123",
        stat_key: "",
        pay_url: "",
        pay_query_url: "",
        pay_last_query_url: "",
        login_url: "",
        ws_url: "",
        ws_cert_url: "",
        // stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/gameEvent",
        // batch_stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/batchGameEvent",
        // configUrl: "https://tpf-common-config-api.syyx.com:37110/api/config",
        stat_event_url: "",
        batch_stat_event_url: "",
        configUrl: "",
        configAppSecKey: "",
        retry_connect: false,
        basic_config_version: "",
        is_login_soon: false,
        is_auto_relogin_full: false,
        has_red_envelop: false,
        has_multual_push: false
    },
    oppo_qg: {
        app_id: 600000,
        ad_app_id: 0,
        app_version: "1.0.0.0",
        pkg_name: "",
        channel_type: 2,
        channel_id: 1,
        engin_type: 2,
        engin_version: "2.0.10",
        log_level: 0,
        pay_key: "",
        login_key: "",
        plat_key: "123",
        stat_key: "",
        pay_url: "",
        pay_query_url: "",
        pay_last_query_url: "",
        login_url: "",
        ws_url: "",
        ws_cert_url: "",
        // stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/gameEvent",
        // batch_stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/batchGameEvent",
        // configUrl: "https://tpf-common-config-api.syyx.com:37110/api/config",
        stat_event_url: "",
        batch_stat_event_url: "",
        configUrl: "",
        configAppSecKey: "",
        retry_connect: false,
        basic_config_version: "",
        is_login_soon: false,
        is_auto_relogin_full: false,
        has_red_envelop: false,
        has_multual_push: false
    },
    vivo_qg: {
        app_id: 600000,
        ad_app_id: 0,
        app_version: "1.0.0.0",
        pkg_name: "",
        channel_type: 4,
        channel_id: 2,
        engin_type: 1,
        engin_version: "2.0.10",
        log_level: 0,
        pay_key: "",
        login_key: "",
        plat_key: "123",
        stat_key: "",
        pay_url: "",
        pay_query_url: "",
        pay_last_query_url: "",
        login_url: "",
        ws_url: "",
        ws_cert_url: "",
        // stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/gameEvent",
        // batch_stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/batchGameEvent",
        // configUrl: "https://tpf-common-config-api.syyx.com:37110/api/config",
        stat_event_url: "",
        batch_stat_event_url: "",
        configUrl: "",
        configAppSecKey: "",
        retry_connect: false,
        basic_config_version: "",
        is_login_soon: false,
        is_auto_relogin_full: false,
        has_red_envelop: false,
        has_multual_push: false,
        needAuth: false,
    },
    tt: {
        app_id: 600000,
        ad_app_id: 0,
        app_version: "1.0.0.0",
        pkg_name: "",
        channel_type: 8,
        channel_id: 10,
        engin_type: 2,
        engin_version: "2.0.10",
        log_level: 0,
        pay_key: "",
        login_key: "",
        plat_key: "123",
        stat_key: "",
        pay_url: "",
        pay_query_url: "",
        pay_last_query_url: "",
        login_url: "",
        ws_url: "",
        ws_cert_url: "",
        stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/gameEvent",
        batch_stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/batchGameEvent",
        configUrl: "https://tpf-common-config-api.syyx.com:37110/api/config",
        configAppSecKey: "",
        retry_connect: false,
        basic_config_version: "",
        is_login_soon: false,
        is_auto_relogin_full: false,
        has_red_envelop: false,
        has_multual_push: false,
        needAuth: false,
    },
    qq: {
        app_id: 600000,
        ad_app_id: 0,
        app_version: "1.0.0.0",
        pkg_name: "",
        channel_type: 5,
        channel_id: 8,
        engin_type: 2,
        engin_version: "2.0.10",
        log_level: 0,
        pay_key: "",
        login_key: "",
        plat_key: "123",
        stat_key: "",
        pay_url: "",
        pay_query_url: "",
        pay_last_query_url: "",
        login_url: "",
        ws_url: "",
        ws_cert_url: "",
        stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/gameEvent",
        batch_stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/batchGameEvent",
        configUrl: "https://tpf-common-config-api.syyx.com:37110/api/config",
        configAppSecKey: "",
        retry_connect: false,
        basic_config_version: "",
        is_login_soon: false,
        is_auto_relogin_full: false,
        has_red_envelop: false,
        has_multual_push: false,
        needAuth: false,
    },
    apk: {
        app_id: 600000,
        ad_app_id: 0,
        app_version: "1.0.0.0",
        pkg_name: "",
        channel_type: 7,
        channel_id: 11,
        engin_type: 2,
        engin_version: "2.0.10",
        log_level: 0,
        pay_key: "",
        login_key: "",
        plat_key: "123",
        stat_key: "",
        pay_url: "",
        pay_query_url: "",
        pay_last_query_url: "",
        login_url: "",
        ws_url: "",
        ws_cert_url: "",
        stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/gameEvent",
        batch_stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/batchGameEvent",
        configUrl: "https://tpf-common-config-api.syyx.com:37110/api/config",
        configAppSecKey: "",
        retry_connect: false,
        basic_config_version: "",
        is_login_soon: false,
        is_auto_relogin_full: false,
        has_red_envelop: false,
        has_multual_push: false
    },
    wx: {
        app_id: 600000,
        ad_app_id: 0,
        app_version: "1.0.0.0",
        pkg_name: "",
        channel_type: 5,
        channel_id: 8,
        engin_type: 2,
        engin_version: "2.0.10",
        log_level: 0,
        pay_key: "",
        login_key: "",
        plat_key: "123",
        stat_key: "",
        pay_url: "",
        pay_query_url: "",
        pay_last_query_url: "",
        login_url: "",
        ws_url: "",
        ws_cert_url: "",
        stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/gameEvent",
        batch_stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/batchGameEvent",
        configUrl: "https://tpf-common-config-api.syyx.com:37110/api/config",
        configAppSecKey: "",
        retry_connect: false,
        basic_config_version: "",
        is_login_soon: false,
        is_auto_relogin_full: false,
        has_red_envelop: false,
        has_multual_push: false,
        needAuth: false,
    },
    hw_qg: {
        app_id: 103490213,
        ad_app_id: 0,
        app_version: "1.0.0.0",
        pkg_name: "",
        channel_type: 10,
        channel_id: 14,
        engin_type: 2,
        engin_version: "2.0.10",
        log_level: 0,
        pay_key: "",
        login_key: "",
        plat_key: "123",
        stat_key: "",
        pay_url: "",
        pay_query_url: "",
        pay_last_query_url: "",
        login_url: "",
        ws_url: "",
        ws_cert_url: "",
        stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/gameEvent",
        batch_stat_event_url: "https://tpfdata.syyx.com:35002/bigdata/record/batchGameEvent",
        configUrl: "https://tpf-common-config-api.syyx.com:37110/api/config",
        configAppSecKey: "",
        retry_connect: false,
        basic_config_version: "",
        is_login_soon: false,
        is_auto_relogin_full: false,
        has_red_envelop: false,
        has_multual_push: false,
        needAuth: false,
    },
    _debug: false,
};
var e_syyx_sdk_publish_type;
(function (e_syyx_sdk_publish_type) {
    e_syyx_sdk_publish_type[e_syyx_sdk_publish_type["in"] = 1] = "in";
    e_syyx_sdk_publish_type[e_syyx_sdk_publish_type["out"] = 2] = "out";
})(e_syyx_sdk_publish_type = exports.e_syyx_sdk_publish_type || (exports.e_syyx_sdk_publish_type = {}));
exports.syyx_const = {
    syyx_sdk_version: "1.0.0.0",
    syyx_sdk_publish: e_syyx_sdk_publish_type.out,
    syyx_sdk_channel: igc.e_channel_type.oppo_qg,
    // syyx_sdk_channel: 2, // 默认是2，初始化完成后 syyx_const.syyx_sdk_channel 被替换 可能是2，或者4
    syyx_sdk_tag: "2021_05_07_15_50",
    //远端运营策略配置key
    remote_business_config_key: "business_config",
    //本地缓存运营策略配置版本key
    local_business_config_version: "syyx_business_config_version",
    //本地缓存运营策略数据key
    local_business_config_data: "syyx_business_config_data",
    //ctr配置key
    remote_ctr_config_key: "multual_push_v5",
    //本地缓存ctr配置版本key
    local_ctr_config_version: "syyx_ctr_config_version",
    //本地缓存ctr配置
    local_ctr_config_data: "syyx_ctr_config_data",
    guobao_init_apiUrl: 'https://game.llewan.com:1899/config/getCommon',
    guobao_da_dot_url: 'https://log.llewan.com:1999/Log/common',
    version: '1.0.0',
    llewan_sdk_version: '1.0.0',
    //.接口加密key,切勿修改
    md5_key: '$5dfjr$%dsadsfdsii',
    guobao_init_game: '',
    // game_name_oppo: 'erguangceshis-oppo', // oppo游戏编码 用这款游戏测试用的
    // game_name_vivo: 'erguangceshis-vivo', // vivo游戏编码  用这款游戏测试用的 
    // game_name_oppo: 'juntuanfenzheng-oppo', 
    game_name_oppo: 'daxiachuanshuo-oppo',
    game_name_vivo: 'konmgbuhuayuan-vivo',
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbmZpZ3NcXHN5eXhfc2RrX2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDVyxRQUFBLFdBQVcsR0FDdEI7SUFDSSxHQUFHLEVBQUU7UUFDRCxNQUFNLEVBQUUsTUFBTTtRQUNkLFdBQVcsRUFBRSxTQUFTO1FBQ3RCLFFBQVEsRUFBRSxFQUFFO1FBQ1osWUFBWSxFQUFFLENBQUM7UUFDZixVQUFVLEVBQUUsQ0FBQztRQUNiLFVBQVUsRUFBRSxDQUFDO1FBQ2IsYUFBYSxFQUFFLFFBQVE7UUFDdkIsU0FBUyxFQUFFLENBQUM7UUFDWixPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO1FBQ2IsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsRUFBRTtRQUNaLE9BQU8sRUFBRSxFQUFFO1FBQ1gsYUFBYSxFQUFFLEVBQUU7UUFDakIsa0JBQWtCLEVBQUUsRUFBRTtRQUN0QixTQUFTLEVBQUUsRUFBRTtRQUNiLE1BQU0sRUFBRSxFQUFFO1FBQ1YsV0FBVyxFQUFFLEVBQUU7UUFDZiw2RUFBNkU7UUFDN0Usd0ZBQXdGO1FBQ3hGLHdFQUF3RTtRQUN4RSxjQUFjLEVBQUUsRUFBRTtRQUNsQixvQkFBb0IsRUFBRSxFQUFFO1FBQ3hCLFNBQVMsRUFBRSxFQUFFO1FBRWIsZUFBZSxFQUFFLEVBQUU7UUFDbkIsYUFBYSxFQUFFLEtBQUs7UUFDcEIsb0JBQW9CLEVBQUUsRUFBRTtRQUN4QixhQUFhLEVBQUUsS0FBSztRQUNwQixvQkFBb0IsRUFBRSxLQUFLO1FBQzNCLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLGdCQUFnQixFQUFFLEtBQUs7S0FDMUI7SUFDRCxPQUFPLEVBQUU7UUFDTCxNQUFNLEVBQUUsTUFBTTtRQUNkLFNBQVMsRUFBRSxDQUFDO1FBQ1osV0FBVyxFQUFFLFNBQVM7UUFDdEIsUUFBUSxFQUFFLEVBQUU7UUFDWixZQUFZLEVBQUUsQ0FBQztRQUNmLFVB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QkFHWDtBQUhELFdBQVksdUJBQXVCO0lBQy9CLGlFQUFNLENBQUE7SUFDTixtRUFBTyxDQUFBO0FBQ1gsQ0FBQyxFQUhXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBR2xDO0FBRVUsUUFBQSxVQUFVLEdBQUc7SUFDcEIsZ0JBQWdCLEVBQUUsU0FBUztJQUUzQixnQkFBZ0IsRUFBRSx1QkFBdUIsQ0FBQyxHQUFHO0lBRTdDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTztJQUM1QywrRUFBK0U7SUFFL0UsWUFBWSxFQUFFLGtCQUFrQjtJQUNoQyxhQUFhO0lBQ2IsMEJBQTBCLEVBQUUsaUJBQWlCO0lBQzdDLGlCQUFpQjtJQUNqQiw2QkFBNkIsRUFBRSw4QkFBOEI7SUFDN0QsZUFBZTtJQUNmLDBCQUEwQixFQUFFLDJCQUEyQjtJQUN2RCxVQUFVO0lBQ1YscUJBQXFCLEVBQUUsaUJBQWlCO0lBQ3hDLGdCQUFnQjtJQUNoQix3QkFBd0IsRUFBRSx5QkFBeUI7SUFDbkQsV0FBVztJQUNYLHFCQUFxQixFQUFFLHNCQUFzQjtJQUM3QyxrQkFBa0IsRUFBRSwrQ0FBK0M7SUFDbkUsaUJBQWlCLEVBQUUsd0NBQXdDO0lBQzNELE9BQU8sRUFBRSxPQUFPO0lBQ2hCLGtCQUFrQixFQUFFLE9BQU87SUFDM0IsZUFBZTtJQUNmLE9BQU8sRUFBRSxvQkFBb0I7SUFDN0IsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQiw4REFBOEQ7SUFDOUQsZ0VBQWdFO0lBQ2hFLDJDQUEyQztJQUMzQyxjQUFjLEVBQUUscUJBQXFCO0lBQ3JDLGNBQWMsRUFBRSxxQkFBcUI7Q0FDeEMsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgdmFyIGluaXRfY29uZmlnID1cclxue1xyXG4gICAgd2ViOiB7XHJcbiAgICAgICAgYXBwX2lkOiA2MDAwMDAsXHJcbiAgICAgICAgYXBwX3ZlcnNpb246IFwiMS4wLjAuMFwiLFxyXG4gICAgICAgIHBrZ19uYW1lOiBcIlwiLCAvL3Rlc3RcclxuICAgICAgICBjaGFubmVsX3R5cGU6IDEsXHJcbiAgICAgICAgY2hhbm5lbF9pZDogMCxcclxuICAgICAgICBlbmdpbl90eXBlOiAyLFxyXG4gICAgICAgIGVuZ2luX3ZlcnNpb246IFwiMi4wLjEwXCIsXHJcbiAgICAgICAgbG9nX2xldmVsOiAwLFxyXG4gICAgICAgIHBheV9rZXk6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fa2V5OiBcIlwiLFxyXG4gICAgICAgIHBsYXRfa2V5OiBcIjEyM1wiLFxyXG4gICAgICAgIHN0YXRfa2V5OiBcIlwiLFxyXG4gICAgICAgIHBheV91cmw6IFwiXCIsXHJcbiAgICAgICAgcGF5X3F1ZXJ5X3VybDogXCJcIixcclxuICAgICAgICBwYXlfbGFzdF9xdWVyeV91cmw6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fdXJsOiBcIlwiLFxyXG4gICAgICAgIHdzX3VybDogXCJcIixcclxuICAgICAgICB3c19jZXJ0X3VybDogXCJcIixcclxuICAgICAgICAvLyBzdGF0X2V2ZW50X3VybDogXCJodHRwczovL3RwZmRhdGEuc3l5eC5jb206MzUwMDIvYmlnZGF0YS9yZWNvcmQvZ2FtZUV2ZW50XCIsXHJcbiAgICAgICAgLy8gYmF0Y2hfc3RhdF9ldmVudF91cmw6IFwiaHR0cHM6Ly90cGZkYXRhLnN5eXguY29tOjM1MDAyL2JpZ2RhdGEvcmVjb3JkL2JhdGNoR2FtZUV2ZW50XCIsXHJcbiAgICAgICAgLy8gY29uZmlnVXJsOiBcImh0dHBzOi8vdHBmLWNvbW1vbi1jb25maWctYXBpLnN5eXguY29tOjM3MTEwL2FwaS9jb25maWdcIixcclxuICAgICAgICBzdGF0X2V2ZW50X3VybDogXCJcIixcclxuICAgICAgICBiYXRjaF9zdGF0X2V2ZW50X3VybDogXCJcIixcclxuICAgICAgICBjb25maWdVcmw6IFwiXCIsXHJcblxyXG4gICAgICAgIGNvbmZpZ0FwcFNlY0tleTogXCJcIixcclxuICAgICAgICByZXRyeV9jb25uZWN0OiBmYWxzZSxcclxuICAgICAgICBiYXNpY19jb25maWdfdmVyc2lvbjogXCJcIixcclxuICAgICAgICBpc19sb2dpbl9zb29uOiBmYWxzZSxcclxuICAgICAgICBpc19hdXRvX3JlbG9naW5fZnVsbDogZmFsc2UsXHJcbiAgICAgICAgaGFzX3JlZF9lbnZlbG9wOiBmYWxzZSxcclxuICAgICAgICBoYXNfbXVsdHVhbF9wdXNoOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIG9wcG9fcWc6IHtcclxuICAgICAgICBhcHBfaWQ6IDYwMDAwMCxcclxuICAgICAgICBhZF9hcHBfaWQ6IDAsXHJcbiAgICAgICAgYXBwX3ZlcnNpb246IFwiMS4wLjAuMFwiLFxyXG4gICAgICAgIHBrZ19uYW1lOiBcIlwiLCAvL3Rlc3RcclxuICAgICAgICBjaGFubmVsX3R5cGU6IDIsXHJcbiAgICAgICAgY2hhbm5lbF9pZDogMSxcclxuICAgICAgICBlbmdpbl90eXBlOiAyLFxyXG4gICAgICAgIGVuZ2luX3ZlcnNpb246IFwiMi4wLjEwXCIsXHJcbiAgICAgICAgbG9nX2xldmVsOiAwLFxyXG4gICAgICAgIHBheV9rZXk6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fa2V5OiBcIlwiLFxyXG4gICAgICAgIHBsYXRfa2V5OiBcIjEyM1wiLFxyXG4gICAgICAgIHN0YXRfa2V5OiBcIlwiLFxyXG4gICAgICAgIHBheV91cmw6IFwiXCIsXHJcbiAgICAgICAgcGF5X3F1ZXJ5X3VybDogXCJcIixcclxuICAgICAgICBwYXlfbGFzdF9xdWVyeV91cmw6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fdXJsOiBcIlwiLFxyXG4gICAgICAgIHdzX3VybDogXCJcIixcclxuICAgICAgICB3c19jZXJ0X3VybDogXCJcIixcclxuICAgICAgICAvLyBzdGF0X2V2ZW50X3VybDogXCJodHRwczovL3RwZmRhdGEuc3l5eC5jb206MzUwMDIvYmlnZGF0YS9yZWNvcmQvZ2FtZUV2ZW50XCIsXHJcbiAgICAgICAgLy8gYmF0Y2hfc3RhdF9ldmVudF91cmw6IFwiaHR0cHM6Ly90cGZkYXRhLnN5eXguY29tOjM1MDAyL2JpZ2RhdGEvcmVjb3JkL2JhdGNoR2FtZUV2ZW50XCIsXHJcbiAgICAgICAgLy8gY29uZmlnVXJsOiBcImh0dHBzOi8vdHBmLWNvbW1vbi1jb25maWctYXBpLnN5eXguY29tOjM3MTEwL2FwaS9jb25maWdcIixcclxuICAgICAgICBzdGF0X2V2ZW50X3VybDogXCJcIixcclxuICAgICAgICBiYXRjaF9zdGF0X2V2ZW50X3VybDogXCJcIixcclxuICAgICAgICBjb25maWdVcmw6IFwiXCIsXHJcblxyXG4gICAgICAgIGNvbmZpZ0FwcFNlY0tleTogXCJcIixcclxuICAgICAgICByZXRyeV9jb25uZWN0OiBmYWxzZSxcclxuICAgICAgICBiYXNpY19jb25maWdfdmVyc2lvbjogXCJcIixcclxuICAgICAgICBpc19sb2dpbl9zb29uOiBmYWxzZSxcclxuICAgICAgICBpc19hdXRvX3JlbG9naW5fZnVsbDogZmFsc2UsXHJcbiAgICAgICAgaGFzX3JlZF9lbnZlbG9wOiBmYWxzZSxcclxuICAgICAgICBoYXNfbXVsdHVhbF9wdXNoOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHZpdm9fcWc6IHtcclxuICAgICAgICBhcHBfaWQ6IDYwMDAwMCxcclxuICAgICAgICBhZF9hcHBfaWQ6IDAsXHJcbiAgICAgICAgYXBwX3ZlcnNpb246IFwiMS4wLjAuMFwiLFxyXG4gICAgICAgIHBrZ19uYW1lOiBcIlwiLCAvL3Rlc3RcclxuICAgICAgICBjaGFubmVsX3R5cGU6IDQsXHJcbiAgICAgICAgY2hhbm5lbF9pZDogMixcclxuICAgICAgICBlbmdpbl90eXBlOiAxLFxyXG4gICAgICAgIGVuZ2luX3ZlcnNpb246IFwiMi4wLjEwXCIsXHJcbiAgICAgICAgbG9nX2xldmVsOiAwLFxyXG4gICAgICAgIHBheV9rZXk6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fa2V5OiBcIlwiLFxyXG4gICAgICAgIHBsYXRfa2V5OiBcIjEyM1wiLFxyXG4gICAgICAgIHN0YXRfa2V5OiBcIlwiLFxyXG4gICAgICAgIHBheV91cmw6IFwiXCIsXHJcbiAgICAgICAgcGF5X3F1ZXJ5X3VybDogXCJcIixcclxuICAgICAgICBwYXlfbGFzdF9xdWVyeV91cmw6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fdXJsOiBcIlwiLFxyXG4gICAgICAgIHdzX3VybDogXCJcIixcclxuICAgICAgICB3c19jZXJ0X3VybDogXCJcIixcclxuICAgICAgICAvLyBzdGF0X2V2ZW50X3VybDogXCJodHRwczovL3RwZmRhdGEuc3l5eC5jb206MzUwMDIvYmlnZGF0YS9yZWNvcmQvZ2FtZUV2ZW50XCIsXHJcbiAgICAgICAgLy8gYmF0Y2hfc3RhdF9ldmVudF91cmw6IFwiaHR0cHM6Ly90cGZkYXRhLnN5eXguY29tOjM1MDAyL2JpZ2RhdGEvcmVjb3JkL2JhdGNoR2FtZUV2ZW50XCIsXHJcbiAgICAgICAgLy8gY29uZmlnVXJsOiBcImh0dHBzOi8vdHBmLWNvbW1vbi1jb25maWctYXBpLnN5eXguY29tOjM3MTEwL2FwaS9jb25maWdcIixcclxuXHJcbiAgICAgICAgc3RhdF9ldmVudF91cmw6IFwiXCIsXHJcbiAgICAgICAgYmF0Y2hfc3RhdF9ldmVudF91cmw6IFwiXCIsXHJcbiAgICAgICAgY29uZmlnVXJsOiBcIlwiLFxyXG5cclxuICAgICAgICBjb25maWdBcHBTZWNLZXk6IFwiXCIsXHJcbiAgICAgICAgcmV0cnlfY29ubmVjdDogZmFsc2UsXHJcbiAgICAgICAgYmFzaWNfY29uZmlnX3ZlcnNpb246IFwiXCIsXHJcbiAgICAgICAgaXNfbG9naW5fc29vbjogZmFsc2UsXHJcbiAgICAgICAgaXNfYXV0b19yZWxvZ2luX2Z1bGw6IGZhbHNlLFxyXG4gICAgICAgIGhhc19yZWRfZW52ZWxvcDogZmFsc2UsXHJcbiAgICAgICAgaGFzX211bHR1YWxfcHVzaDogZmFsc2UsXHJcbiAgICAgICAgbmVlZEF1dGg6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHR0OiB7XHJcbiAgICAgICAgYXBwX2lkOiA2MDAwMDAsXHJcbiAgICAgICAgYWRfYXBwX2lkOiAwLFxyXG4gICAgICAgIGFwcF92ZXJzaW9uOiBcIjEuMC4wLjBcIixcclxuICAgICAgICBwa2dfbmFtZTogXCJcIiwgLy90ZXN0XHJcbiAgICAgICAgY2hhbm5lbF90eXBlOiA4LFxyXG4gICAgICAgIGNoYW5uZWxfaWQ6IDEwLFxyXG4gICAgICAgIGVuZ2luX3R5cGU6IDIsXHJcbiAgICAgICAgZW5naW5fdmVyc2lvbjogXCIyLjAuMTBcIixcclxuICAgICAgICBsb2dfbGV2ZWw6IDAsXHJcbiAgICAgICAgcGF5X2tleTogXCJcIixcclxuICAgICAgICBsb2dpbl9rZXk6IFwiXCIsXHJcbiAgICAgICAgcGxhdF9rZXk6IFwiMTIzXCIsXHJcbiAgICAgICAgc3RhdF9rZXk6IFwiXCIsXHJcbiAgICAgICAgcGF5X3VybDogXCJcIixcclxuICAgICAgICBwYXlfcXVlcnlfdXJsOiBcIlwiLFxyXG4gICAgICAgIHBheV9sYXN0X3F1ZXJ5X3VybDogXCJcIixcclxuICAgICAgICBsb2dpbl91cmw6IFwiXCIsXHJcbiAgICAgICAgd3NfdXJsOiBcIlwiLFxyXG4gICAgICAgIHdzX2NlcnRfdXJsOiBcIlwiLFxyXG4gICAgICAgIHN0YXRfZXZlbnRfdXJsOiBcImh0dHBzOi8vdHBmZGF0YS5zeXl4LmNvbTozNTAwMi9iaWdkYXRhL3JlY29yZC9nYW1lRXZlbnRcIixcclxuICAgICAgICBiYXRjaF9zdGF0X2V2ZW50X3VybDogXCJodHRwczovL3RwZmRhdGEuc3l5eC5jb206MzUwMDIvYmlnZGF0YS9yZWNvcmQvYmF0Y2hHYW1lRXZlbnRcIixcclxuICAgICAgICBjb25maWdVcmw6IFwiaHR0cHM6Ly90cGYtY29tbW9uLWNvbmZpZy1hcGkuc3l5eC5jb206MzcxMTAvYXBpL2NvbmZpZ1wiLFxyXG4gICAgICAgIGNvbmZpZ0FwcFNlY0tleTogXCJcIixcclxuICAgICAgICByZXRyeV9jb25uZWN0OiBmYWxzZSxcclxuICAgICAgICBiYXNpY19jb25maWdfdmVyc2lvbjogXCJcIixcclxuICAgICAgICBpc19sb2dpbl9zb29uOiBmYWxzZSxcclxuICAgICAgICBpc19hdXRvX3JlbG9naW5fZnVsbDogZmFsc2UsXHJcbiAgICAgICAgaGFzX3JlZF9lbnZlbG9wOiBmYWxzZSxcclxuICAgICAgICBoYXNfbXVsdHVhbF9wdXNoOiBmYWxzZSxcclxuICAgICAgICBuZWVkQXV0aDogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgcXE6IHtcclxuICAgICAgICBhcHBfaWQ6IDYwMDAwMCxcclxuICAgICAgICBhZF9hcHBfaWQ6IDAsXHJcbiAgICAgICAgYXBwX3ZlcnNpb246IFwiMS4wLjAuMFwiLFxyXG4gICAgICAgIHBrZ19uYW1lOiBcIlwiLCAvL3Rlc3RcclxuICAgICAgICBjaGFubmVsX3R5cGU6IDUsXHJcbiAgICAgICAgY2hhbm5lbF9pZDogOCxcclxuICAgICAgICBlbmdpbl90eXBlOiAyLFxyXG4gICAgICAgIGVuZ2luX3ZlcnNpb246IFwiMi4wLjEwXCIsXHJcbiAgICAgICAgbG9nX2xldmVsOiAwLFxyXG4gICAgICAgIHBheV9rZXk6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fa2V5OiBcIlwiLFxyXG4gICAgICAgIHBsYXRfa2V5OiBcIjEyM1wiLFxyXG4gICAgICAgIHN0YXRfa2V5OiBcIlwiLFxyXG4gICAgICAgIHBheV91cmw6IFwiXCIsXHJcbiAgICAgICAgcGF5X3F1ZXJ5X3VybDogXCJcIixcclxuICAgICAgICBwYXlfbGFzdF9xdWVyeV91cmw6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fdXJsOiBcIlwiLFxyXG4gICAgICAgIHdzX3VybDogXCJcIixcclxuICAgICAgICB3c19jZXJ0X3VybDogXCJcIixcclxuICAgICAgICBzdGF0X2V2ZW50X3VybDogXCJodHRwczovL3RwZmRhdGEuc3l5eC5jb206MzUwMDIvYmlnZGF0YS9yZWNvcmQvZ2FtZUV2ZW50XCIsXHJcbiAgICAgICAgYmF0Y2hfc3RhdF9ldmVudF91cmw6IFwiaHR0cHM6Ly90cGZkYXRhLnN5eXguY29tOjM1MDAyL2JpZ2RhdGEvcmVjb3JkL2JhdGNoR2FtZUV2ZW50XCIsXHJcbiAgICAgICAgY29uZmlnVXJsOiBcImh0dHBzOi8vdHBmLWNvbW1vbi1jb25maWctYXBpLnN5eXguY29tOjM3MTEwL2FwaS9jb25maWdcIixcclxuICAgICAgICBjb25maWdBcHBTZWNLZXk6IFwiXCIsXHJcbiAgICAgICAgcmV0cnlfY29ubmVjdDogZmFsc2UsXHJcbiAgICAgICAgYmFzaWNfY29uZmlnX3ZlcnNpb246IFwiXCIsXHJcbiAgICAgICAgaXNfbG9naW5fc29vbjogZmFsc2UsXHJcbiAgICAgICAgaXNfYXV0b19yZWxvZ2luX2Z1bGw6IGZhbHNlLFxyXG4gICAgICAgIGhhc19yZWRfZW52ZWxvcDogZmFsc2UsXHJcbiAgICAgICAgaGFzX211bHR1YWxfcHVzaDogZmFsc2UsXHJcbiAgICAgICAgbmVlZEF1dGg6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIGFwazoge1xyXG4gICAgICAgIGFwcF9pZDogNjAwMDAwLFxyXG4gICAgICAgIGFkX2FwcF9pZDogMCxcclxuICAgICAgICBhcHBfdmVyc2lvbjogXCIxLjAuMC4wXCIsXHJcbiAgICAgICAgcGtnX25hbWU6IFwiXCIsIC8vdGVzdFxyXG4gICAgICAgIGNoYW5uZWxfdHlwZTogNyxcclxuICAgICAgICBjaGFubmVsX2lkOiAxMSxcclxuICAgICAgICBlbmdpbl90eXBlOiAyLFxyXG4gICAgICAgIGVuZ2luX3ZlcnNpb246IFwiMi4wLjEwXCIsXHJcbiAgICAgICAgbG9nX2xldmVsOiAwLFxyXG4gICAgICAgIHBheV9rZXk6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fa2V5OiBcIlwiLFxyXG4gICAgICAgIHBsYXRfa2V5OiBcIjEyM1wiLFxyXG4gICAgICAgIHN0YXRfa2V5OiBcIlwiLFxyXG4gICAgICAgIHBheV91cmw6IFwiXCIsXHJcbiAgICAgICAgcGF5X3F1ZXJ5X3VybDogXCJcIixcclxuICAgICAgICBwYXlfbGFzdF9xdWVyeV91cmw6IFwiXCIsXHJcbiAgICAgICAgbG9naW5fdXJsOiBcIlwiLFxyXG4gICAgICAgIHdzX3VybDogXCJcIixcclxuICAgICAgICB3c19jZXJ0X3VybDogXCJcIixcclxuICAgICAgICBzdGF0X2V2ZW50X3VybDogXCJodHRwczovL3RwZmRhdGEuc3l5eC5jb206MzUwMDIvYmlnZGF0YS9yZWNvcmQvZ2FtZUV2ZW50XCIsXHJcbiAgICAgICAgYmF0Y2hfc3RhdF9ldmVudF91cmw6IFwiaHR0cHM6Ly90cGZkYXRhLnN5eXguY29tOjM1MDAyL2JpZ2RhdGEvcmVjb3JkL2JhdGNoR2FtZUV2ZW50XCIsXHJcbiAgICAgICAgY29uZmlnVXJsOiBcImh0dHBzOi8vdHBmLWNvbW1vbi1jb25maWctYXBpLnN5eXguY29tOjM3MTEwL2FwaS9jb25maWdcIixcclxuICAgICAgICBjb25maWdBcHBTZWNLZXk6IFwiXCIsXHJcbiAgICAgICAgcmV0cnlfY29ubmVjdDogZmFsc2UsXHJcbiAgICAgICAgYmFzaWNfY29uZmlnX3ZlcnNpb246IFwiXCIsXHJcbiAgICAgICAgaXNfbG9naW5fc29vbjogZmFsc2UsXHJcbiAgICAgICAgaXNfYXV0b19yZWxvZ2luX2Z1bGw6IGZhbHNlLFxyXG4gICAgICAgIGhhc19yZWRfZW52ZWxvcDogZmFsc2UsXHJcbiAgICAgICAgaGFzX211bHR1YWxfcHVzaDogZmFsc2VcclxuICAgIH0sXHJcbiAgICB3eDoge1xyXG4gICAgICAgIGFwcF9pZDogNjAwMDAwLFxyXG4gICAgICAgIGFkX2FwcF9pZDogMCxcclxuICAgICAgICBhcHBfdmVyc2lvbjogXCIxLjAuMC4wXCIsXHJcbiAgICAgICAgcGtnX25hbWU6IFwiXCIsIC8vdGVzdFxyXG4gICAgICAgIGNoYW5uZWxfdHlwZTogNSxcclxuICAgICAgICBjaGFubmVsX2lkOiA4LFxyXG4gICAgICAgIGVuZ2luX3R5cGU6IDIsXHJcbiAgICAgICAgZW5naW5fdmVyc2lvbjogXCIyLjAuMTBcIixcclxuICAgICAgICBsb2dfbGV2ZWw6IDAsXHJcbiAgICAgICAgcGF5X2tleTogXCJcIixcclxuICAgICAgICBsb2dpbl9rZXk6IFwiXCIsXHJcbiAgICAgICAgcGxhdF9rZXk6IFwiMTIzXCIsXHJcbiAgICAgICAgc3RhdF9rZXk6IFwiXCIsXHJcbiAgICAgICAgcGF5X3VybDogXCJcIixcclxuICAgICAgICBwYXlfcXVlcnlfdXJsOiBcIlwiLFxyXG4gICAgICAgIHBheV9sYXN0X3F1ZXJ5X3VybDogXCJcIixcclxuICAgICAgICBsb2dpbl91cmw6IFwiXCIsXHJcbiAgICAgICAgd3NfdXJsOiBcIlwiLFxyXG4gICAgICAgIHdzX2NlcnRfdXJsOiBcIlwiLFxyXG4gICAgICAgIHN0YXRfZXZlbnRfdXJsOiBcImh0dHBzOi8vdHBmZGF0YS5zeXl4LmNvbTozNTAwMi9iaWdkYXRhL3JlY29yZC9nYW1lRXZlbnRcIixcclxuICAgICAgICBiYXRjaF9zdGF0X2V2ZW50X3VybDogXCJodHRwczovL3RwZmRhdGEuc3l5eC5jb206MzUwMDIvYmlnZGF0YS9yZWNvcmQvYmF0Y2hHYW1lRXZlbnRcIixcclxuICAgICAgICBjb25maWdVcmw6IFwiaHR0cHM6Ly90cGYtY29tbW9uLWNvbmZpZy1hcGkuc3l5eC5jb206MzcxMTAvYXBpL2NvbmZpZ1wiLFxyXG4gICAgICAgIGNvbmZpZ0FwcFNlY0tleTogXCJcIixcclxuICAgICAgICByZXRyeV9jb25uZWN0OiBmYWxzZSxcclxuICAgICAgICBiYXNpY19jb25maWdfdmVyc2lvbjogXCJcIixcclxuICAgICAgICBpc19sb2dpbl9zb29uOiBmYWxzZSxcclxuICAgICAgICBpc19hdXRvX3JlbG9naW5fZnVsbDogZmFsc2UsXHJcbiAgICAgICAgaGFzX3JlZF9lbnZlbG9wOiBmYWxzZSxcclxuICAgICAgICBoYXNfbXVsdHVhbF9wdXNoOiBmYWxzZSxcclxuICAgICAgICBuZWVkQXV0aDogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgaHdfcWc6IHtcclxuICAgICAgICBhcHBfaWQ6IDEwMzQ5MDIxMyxcclxuICAgICAgICBhZF9hcHBfaWQ6IDAsXHJcbiAgICAgICAgYXBwX3ZlcnNpb246IFwiMS4wLjAuMFwiLFxyXG4gICAgICAgIHBrZ19uYW1lOiBcIlwiLCAvL3Rlc3RcclxuICAgICAgICBjaGFubmVsX3R5cGU6IDEwLFxyXG4gICAgICAgIGNoYW5uZWxfaWQ6IDE0LFxyXG4gICAgICAgIGVuZ2luX3R5cGU6IDIsXHJcbiAgICAgICAgZW5naW5fdmVyc2lvbjogXCIyLjAuMTBcIixcclxuICAgICAgICBsb2dfbGV2ZWw6IDAsXHJcbiAgICAgICAgcGF5X2tleTogXCJcIixcclxuICAgICAgICBsb2dpbl9rZXk6IFwiXCIsXHJcbiAgICAgICAgcGxhdF9rZXk6IFwiMTIzXCIsXHJcbiAgICAgICAgc3RhdF9rZXk6IFwiXCIsXHJcbiAgICAgICAgcGF5X3VybDogXCJcIixcclxuICAgICAgICBwYXlfcXVlcnlfdXJsOiBcIlwiLFxyXG4gICAgICAgIHBheV9sYXN0X3F1ZXJ5X3VybDogXCJcIixcclxuICAgICAgICBsb2dpbl91cmw6IFwiXCIsXHJcbiAgICAgICAgd3NfdXJsOiBcIlwiLFxyXG4gICAgICAgIHdzX2NlcnRfdXJsOiBcIlwiLFxyXG4gICAgICAgIHN0YXRfZXZlbnRfdXJsOiBcImh0dHBzOi8vdHBmZGF0YS5zeXl4LmNvbTozNTAwMi9iaWdkYXRhL3JlY29yZC9nYW1lRXZlbnRcIixcclxuICAgICAgICBiYXRjaF9zdGF0X2V2ZW50X3VybDogXCJodHRwczovL3RwZmRhdGEuc3l5eC5jb206MzUwMDIvYmlnZGF0YS9yZWNvcmQvYmF0Y2hHYW1lRXZlbnRcIixcclxuICAgICAgICBjb25maWdVcmw6IFwiaHR0cHM6Ly90cGYtY29tbW9uLWNvbmZpZy1hcGkuc3l5eC5jb206MzcxMTAvYXBpL2NvbmZpZ1wiLFxyXG4gICAgICAgIGNvbmZpZ0FwcFNlY0tleTogXCJcIixcclxuICAgICAgICByZXRyeV9jb25uZWN0OiBmYWxzZSxcclxuICAgICAgICBiYXNpY19jb25maWdfdmVyc2lvbjogXCJcIixcclxuICAgICAgICBpc19sb2dpbl9zb29uOiBmYWxzZSxcclxuICAgICAgICBpc19hdXRvX3JlbG9naW5fZnVsbDogZmFsc2UsXHJcbiAgICAgICAgaGFzX3JlZF9lbnZlbG9wOiBmYWxzZSxcclxuICAgICAgICBoYXNfbXVsdHVhbF9wdXNoOiBmYWxzZSxcclxuICAgICAgICBuZWVkQXV0aDogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgX2RlYnVnOiBmYWxzZSxcclxufVxyXG5cclxuZXhwb3J0IGVudW0gZV9zeXl4X3Nka19wdWJsaXNoX3R5cGUge1xyXG4gICAgaW4gPSAxLCAvL+WGhemDqOS9v+eUqFxyXG4gICAgb3V0ID0gMiwvL+WklumDqOS9v+eUqFxyXG59XHJcblxyXG5leHBvcnQgdmFyIHN5eXhfY29uc3QgPSB7XHJcbiAgICBzeXl4X3Nka192ZXJzaW9uOiBcIjEuMC4wLjBcIixcclxuXHJcbiAgICBzeXl4X3Nka19wdWJsaXNoOiBlX3N5eXhfc2RrX3B1Ymxpc2hfdHlwZS5vdXQsIFxyXG5cclxuICAgIHN5eXhfc2RrX2NoYW5uZWw6IGlnYy5lX2NoYW5uZWxfdHlwZS5vcHBvX3FnLCAvLyDpu5jorqTmmK8y77yM5Yid5aeL5YyW5a6M5oiQ5ZCOIHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCDooqvmm7/mjaIg5Y+v6IO95pivMu+8jOaIluiAhTRcclxuICAgIC8vIHN5eXhfc2RrX2NoYW5uZWw6IDIsIC8vIOm7mOiupOaYrzLvvIzliJ3lp4vljJblrozmiJDlkI4gc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsIOiiq+abv+aNoiDlj6/og73mmK8y77yM5oiW6ICFNFxyXG5cclxuICAgIHN5eXhfc2RrX3RhZzogXCIyMDIxXzA1XzA3XzE1XzUwXCIsXHJcbiAgICAvL+i/nOerr+i/kOiQpeetlueVpemFjee9rmtleVxyXG4gICAgcmVtb3RlX2J1c2luZXNzX2NvbmZpZ19rZXk6IFwiYnVzaW5lc3NfY29uZmlnXCIsXHJcbiAgICAvL+acrOWcsOe8k+WtmOi/kOiQpeetlueVpemFjee9rueJiOacrGtleVxyXG4gICAgbG9jYWxfYnVzaW5lc3NfY29uZmlnX3ZlcnNpb246IFwic3l5eF9idXNpbmVzc19jb25maWdfdmVyc2lvblwiLFxyXG4gICAgLy/mnKzlnLDnvJPlrZjov5DokKXnrZbnlaXmlbDmja5rZXlcclxuICAgIGxvY2FsX2J1c2luZXNzX2NvbmZpZ19kYXRhOiBcInN5eXhfYnVzaW5lc3NfY29uZmlnX2RhdGFcIixcclxuICAgIC8vY3Ry6YWN572ua2V5XHJcbiAgICByZW1vdGVfY3RyX2NvbmZpZ19rZXk6IFwibXVsdHVhbF9wdXNoX3Y1XCIsXHJcbiAgICAvL+acrOWcsOe8k+WtmGN0cumFjee9rueJiOacrGtleVxyXG4gICAgbG9jYWxfY3RyX2NvbmZpZ192ZXJzaW9uOiBcInN5eXhfY3RyX2NvbmZpZ192ZXJzaW9uXCIsXHJcbiAgICAvL+acrOWcsOe8k+WtmGN0cumFjee9rlxyXG4gICAgbG9jYWxfY3RyX2NvbmZpZ19kYXRhOiBcInN5eXhfY3RyX2NvbmZpZ19kYXRhXCIsXHJcbiAgICBndW9iYW9faW5pdF9hcGlVcmw6ICdodHRwczovL2dhbWUubGxld2FuLmNvbToxODk5L2NvbmZpZy9nZXRDb21tb24nLFxyXG4gICAgZ3VvYmFvX2RhX2RvdF91cmw6ICdodHRwczovL2xvZy5sbGV3YW4uY29tOjE5OTkvTG9nL2NvbW1vbicsXHJcbiAgICB2ZXJzaW9uOiAnMS4wLjAnLFxyXG4gICAgbGxld2FuX3Nka192ZXJzaW9uOiAnMS4wLjAnLFxyXG4gICAgLy8u5o6l5Y+j5Yqg5a+Ga2V5LOWIh+WLv+S/ruaUuVxyXG4gICAgbWQ1X2tleTogJyQ1ZGZqciQlZHNhZHNmZHNpaScsXHJcbiAgICBndW9iYW9faW5pdF9nYW1lOiAnJywgLy8g5Yik5patb3blubPlj7DvvIzlpoLkvZXkvb/nlKjlr7nlupTmuLjmiI/nvJbnoIFcclxuICAgIC8vIGdhbWVfbmFtZV9vcHBvOiAnZXJndWFuZ2Nlc2hpcy1vcHBvJywgLy8gb3Bwb+a4uOaIj+e8lueggSDnlKjov5nmrL7muLjmiI/mtYvor5XnlKjnmoRcclxuICAgIC8vIGdhbWVfbmFtZV92aXZvOiAnZXJndWFuZ2Nlc2hpcy12aXZvJywgLy8gdml2b+a4uOaIj+e8lueggSAg55So6L+Z5qy+5ri45oiP5rWL6K+V55So55qEIFxyXG4gICAgLy8gZ2FtZV9uYW1lX29wcG86ICdqdW50dWFuZmVuemhlbmctb3BwbycsIFxyXG4gICAgZ2FtZV9uYW1lX29wcG86ICdkYXhpYWNodWFuc2h1by1vcHBvJywgLy8gb3Bwb+a4uOaIj+e8lueggSDmraPlvI/nlKjnmoRcclxuICAgIGdhbWVfbmFtZV92aXZvOiAna29ubWdidWh1YXl1YW4tdml2bycsIC8vIHZpdm/muLjmiI/nvJbnoIEg5q2j5byP55So55qEXHJcbn0iXX0=