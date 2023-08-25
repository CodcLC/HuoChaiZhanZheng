
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/syyx_manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f45d9w9PTpJYqKH+oHpCxSM', 'syyx_manager');
// syyx_sdk/controller/syyx_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syyx_manager = void 0;
var syyx_sdk_config_1 = require("../configs/syyx_sdk_config");
var syyx_sdk_enum_1 = require("../configs/syyx_sdk_enum");
var model_1 = require("../model/model");
var syyx_sdk_utils_1 = require("../utils/syyx_sdk_utils");
var ad_banner_1 = require("./ad/ad_banner");
var syyx_adv_manager_1 = require("./ad/syyx_adv_manager");
var syyx_ctr_manager_1 = require("./ctr_test/syyx_ctr_manager");
var syyx_cc_ui_manager_1 = require("./syyx_cc_ui_manager");
var syyx_api_1 = require("../utils/syyx_api");
var syyx_manager = /** @class */ (function () {
    function syyx_manager() {
    }
    /**
     * 初始化
     * @param init_config_path syyx_game_init.json 本地地址
     * @param init_callback syyx_game_init.json加载成功回调
     */
    syyx_manager.init = function (init_callback) {
        var self = this;
        var path = this.__game_init_file_path;
        //区分渠道
        var channel_type;
        if (window['qq']) {
            channel_type = igc.e_channel_type.qq;
        }
        else if (window["hbs"]) {
            channel_type = igc.e_channel_type.hw_qg;
        }
        else if (window["tt"]) {
            channel_type = igc.e_channel_type.tt;
        }
        else if (window["qg"] && !window["hbs"]) {
            var qg = window["qg"];
            var provider = qg.getProvider();
            if (provider == "OPPO") {
                channel_type = igc.e_channel_type.oppo_qg; // 2
            }
            else if (provider == "vivo") {
                channel_type = igc.e_channel_type.vivo_qg; // 4
            }
        }
        else if (window["wx"]) {
            channel_type = igc.e_channel_type.wx;
        }
        else if (window["loadingView"]) {
            channel_type = igc.e_channel_type.apk;
        }
        else {
            channel_type = igc.e_channel_type.web;
        }
        console.log("sdk-----channel type 1.web 2.oppo 4.vivo 5.qq 7.apk  8.tt  10:hw_qg ：", channel_type);
        syyx_sdk_config_1.syyx_const.syyx_sdk_channel = channel_type;
        //先加载游戏初始化配置表
        syyx_sdk_utils_1.syyx_sdk_utils.load_resource(path, function (data) {
            console.log("sdk-----syyx_game_init.json", data);
            if (syyx_sdk_config_1.syyx_const.syyx_sdk_publish === syyx_sdk_config_1.e_syyx_sdk_publish_type.out) {
                if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
                    syyx_sdk_config_1.init_config.oppo_qg.app_id = data.syyx_app_id;
                    syyx_sdk_config_1.init_config.oppo_qg.app_version = data.channel[channel_type].app_version;
                    syyx_sdk_config_1.init_config.oppo_qg.pkg_name = data.channel[channel_type].pkg_name;
                    syyx_sdk_config_1.init_config.oppo_qg.stat_key = data.stat_key;
                    syyx_sdk_config_1.init_config.oppo_qg.configAppSecKey = data.config_key;
                    // 获取oppo用户id
                    syyx_sdk_config_1.syyx_const.guobao_init_game = syyx_sdk_config_1.syyx_const.game_name_oppo; // oppo渠道获取游戏编码，初始化使用，获取广告id
                    window["qg"] && window["qg"].login({
                        pkgName: syyx_sdk_config_1.init_config.oppo_qg.pkg_name,
                        success: function (res) {
                            self.login_user_id = res.uid; // oppo.uid
                        },
                        fail: function (res) {
                            self.login_user_id = '4444444';
                        }
                    });
                }
                else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
                    syyx_sdk_config_1.init_config.vivo_qg.app_id = data.syyx_app_id;
                    syyx_sdk_config_1.init_config.vivo_qg.app_version = data.channel[channel_type].app_version;
                    syyx_sdk_config_1.init_config.vivo_qg.pkg_name = data.channel[channel_type].pkg_name;
                    syyx_sdk_config_1.init_config.vivo_qg.stat_key = data.stat_key;
                    syyx_sdk_config_1.init_config.vivo_qg.configAppSecKey = data.config_key;
                    syyx_sdk_config_1.syyx_const.guobao_init_game = syyx_sdk_config_1.syyx_const.game_name_vivo; // oppo渠道获取游戏编码，初始化使用
                }
                else {
                    //网页调试
                    syyx_sdk_config_1.init_config.web.app_id = data.syyx_app_id;
                    syyx_sdk_config_1.init_config.web.app_version = "123";
                    syyx_sdk_config_1.init_config.web.pkg_name = "123";
                    syyx_sdk_config_1.init_config.web.stat_key = data.stat_key;
                    syyx_sdk_config_1.init_config.web.configAppSecKey = data.config_key;
                    syyx_sdk_config_1.syyx_const.guobao_init_game = syyx_sdk_config_1.syyx_const.game_name_oppo; // web默认用oppo的游戏编码
                    // syyx_const.guobao_init_game = syyx_const.game_name_vivo // web默认用vivo的游戏编码
                }
                igc.igc_main.instance.init_wrap(syyx_sdk_config_1.syyx_const.syyx_sdk_channel, syyx_sdk_config_1.init_config);
            }
            self.__syyx_app_id = data.syyx_app_id;
            self.__game_init_data = data;
            self.__business_config_file_path = data.business_config_file_path;
            self.__adv_config_file_path = data.adv_config_file_path;
            self.__ui_prefab_config_path = data.ui_prefab_config_path;
            self.__init_callback = init_callback;
            if (self.__init_callback) {
                // 到这里只是初始化完成，加载了.json
                console.log("igc ----- game_init.json has loaded");
                self.__init_callback(true, { business_config: null, load_init_complete: true, load_local_complete: false, load_remote_complete: false });
            }
            syyx_api_1.syyx_api_request.apiPost('init', syyx_sdk_config_1.syyx_const.guobao_init_apiUrl, { game: syyx_sdk_config_1.syyx_const.guobao_init_game }, function (res) {
                console.log('res------------', res);
                if (res.c == 1) {
                    self._guobao_init_config_data = res.d;
                    var ads = self._guobao_init_config_data;
                    for (var _i = 0, ads_1 = ads; _i < ads_1.length; _i++) {
                        var i = ads_1[_i];
                        if (i.type == "official") {
                            if (!self.adIdMap.has(i.key)) {
                                var temp = [];
                                self.adIdMap.set(i.key, temp);
                            }
                            var obj = {
                                adv_id: i.adv_id,
                                gc_status: i.gc_status
                            };
                            self.adIdMap.get(i.key).push(JSON.stringify(obj));
                        }
                    }
                }
                else {
                    console.log('sdk初始化失败, 用默认的');
                }
                self.load_config(); // 有了guobao_init_config_data，可以替换其中的一些配置
            });
        }, this);
    };
    syyx_manager.get_app_version = function () {
        var channel_type = syyx_sdk_config_1.syyx_const.syyx_sdk_channel + "";
        var version = "";
        if (this.__game_init_data && this.__game_init_data.channel[channel_type]) {
            version = this.__game_init_data.channel[channel_type].app_version;
        }
        else {
            version = "0.0.0.0";
            console.error("igc----- can not find app_version in syyx_game_init.json");
            console.error("igc----- channel_type  ", channel_type);
        }
        return version;
    };
    syyx_manager.get_syyx_app_id = function () {
        return this.__syyx_app_id || "";
    };
    syyx_manager.GetButtonsData = function () {
        var resdata = [];
        if (this._guobao_init_config_data) {
            for (var _i = 0, _a = this._guobao_init_config_data; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.type == "button") {
                    resdata.push(i);
                }
            }
        }
        return resdata;
    };
    syyx_manager.get_is_new_player = function () {
        return this.__is_new_player || 0;
    };
    syyx_manager.get_user_id = function () {
        return this.__user_id || "";
    };
    /**
     * 远端配置和互推配置远端拉取完毕
     */
    syyx_manager.init_remote_config_compelete = function () {
        if (this.__local_business_config_inited == true && !this.init_completed_tag) {
            syyx_adv_manager_1.syyx_adv_manager.load_adv_config();
            syyx_adv_manager_1.syyx_adv_manager.init_first_banner_cd();
            this.__inited = true;
            if (this.__init_callback) {
                this.init_completed_tag = true;
                console.log("igc ----- local data has been back");
                this.__init_callback(true, { business_config: this.__business_config_data, load_init_complete: false, load_local_complete: true, load_remote_complete: false });
            }
        }
        else if (this.__remote_business_config_inited && !this.refresh_completed_tag) {
            syyx_adv_manager_1.syyx_adv_manager.load_adv_config();
            syyx_adv_manager_1.syyx_adv_manager.init_first_banner_cd();
            this.__inited = true;
            if (this.__init_callback) {
                this.refresh_completed_tag = true;
                console.log("igc ----- remote data has been back");
                this.__init_callback(true, { business_config: this.__business_config_data, load_init_complete: false, load_local_complete: false, load_remote_complete: true });
            }
        }
    };
    /**
     * 判断用户启动游戏类型  是否通过分享进入
     */
    syyx_manager.check_user_start_game_type = function () {
        var is_old_player = localStorage.getItem("is_old_player");
        this.__is_new_player = is_old_player != "1";
        if (is_old_player == "1") {
            //老玩家
            console.log("igc----- old bird--------------");
        }
        else {
            //新玩家
            console.log("igc----- new fish--------------");
            localStorage.setItem("is_old_player", "1");
        }
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            return;
        }
        var options = this.get_launch_options_sync();
        if (options && options.query) {
            if (options.query.type == igc.e_share_type.card || options.query.type == igc.e_share_type.record) {
                var event_id = is_old_player == "1" ? igc.e_share_event_id.old_player : igc.e_share_event_id.new_player;
                // this.send_user_event(event_id, igc.e_share_event_type.share, 0, 0, options.query.type + "");
            }
        }
    };
    //
    /**如果是外部登录 这里传入一下账号id和用户id，设置了之后就可以调用 打点了
     * stat_manager 是只要 调用了sdk的init后，不需要等待init的callback就可以使用打点了
     * @param account
     * @param user_id
     */
    syyx_manager.init_param = function (account, user_id) {
        if (account == "" || account == undefined || user_id == "" || user_id == undefined) {
            console.error("igc----- init_param user_id is undefined!");
            return;
        }
        if (this.has_init_param) {
            return;
        }
        else {
            this.has_init_param = true;
        }
        this.__user_id = user_id + "";
        igc.stat_manager.instance.set_uid(account, user_id, "1");
        //////////////////////////////////
        //sdk里面打一下点
        var save = localStorage.getItem("syyx_igc_uid" + igc.igc_main.instance.app_config.game_param.app_id);
        if (save && save != "") {
            //只打login的点
            this.send_user_login();
        }
        else {
            //打register的点
            this.send_user_register();
            //打login的点,延迟
            setTimeout(this.send_user_login, 1000);
            localStorage.setItem("syyx_igc_uid" + igc.igc_main.instance.app_config.game_param.app_id, user_id);
        }
        this.check_user_start_game_type();
        this.set_stat_inited();
    };
    /**
     * 是否启动ok
     */
    syyx_manager.is_inited = function () {
        return this.__inited;
    };
    /**
     * 上报用户注册
     */
    syyx_manager.send_user_register = function () {
        // igc.stat_manager.instance.send_user_register();
    };
    /**
      * 上报自定义事件
      */
    syyx_manager.send_user_event = function (event_id, event_type, place_id, place_type, extra, str1, str2, extra2, str3) {
        if (!this.__stat_inited) {
            this.__stat_data_cache.unshift({
                "event_id": event_id,
                "event_type": event_type,
                "place_id": place_id,
                "place_type": place_type,
                "extra": extra,
                "str1": str1,
                "str2": str2,
                "extra2": extra2,
                "str3": str3,
            });
            return;
        }
    };
    /**
    * 打点未初始化完成
    */
    syyx_manager.set_stat_inited = function () {
        if (!this.__is_stat_delay) {
            var self_1 = this;
            this.__is_stat_delay = true;
            setTimeout(function () {
                self_1.__stat_inited = true;
                self_1.send_stat_event_cache();
            }, 1000);
        }
    };
    /**
     * 补充 打点未初始化完成前的打点
     */
    syyx_manager.send_stat_event_cache = function () {
        if (this.__stat_data_cache && this.__stat_data_cache.length > 0) {
            var self = this;
            var stat_data = this.__stat_data_cache.pop();
            setTimeout(function () {
                // self.send_stat_event_cache()
            }, 100);
        }
    };
    /**
     * 隐藏指定类型的视图
     * @param viewType
     */
    syyx_manager.hide = function (viewType) {
        this.load_view(viewType, function (view) {
            view.hide && view.hide();
        });
    };
    /**
     * 显示指定视图
     * @param viewType 视图类型
     * @param zOrder    层级
     * @param scene     当前所在场景的名字          运营使用
     * @param chapter   当前所在关卡或者玩法id      运营使用
     */
    syyx_manager.show = function (viewType, zOrder, scene, chapter) {
        if (zOrder === void 0) { zOrder = -1; }
        if (chapter === void 0) { chapter = 0; }
        this.load_view(viewType, function (view) {
            view.show(zOrder, scene, chapter);
        });
    };
    /**
     * 上报用户登录
     */
    syyx_manager.send_user_login = function () {
        // igc.stat_manager.instance.send_user_login();
    };
    /**
    * 拉到功能配置的处理函数(远端数据完全覆盖)
    * @param ret  操作结果
    * @param key  要拉取的配置key
    * @param version 这个配置本次的版本，可以本地保存，下次拉取的时候传这个保存的version，后台比较如果version一致，则不会返回数据，由客户端使用本地缓存
    * @param data 返回的数据
    */
    syyx_manager.on_load_game_configs = function (ret, key, version, data) {
        if (ret == true) {
            localStorage.setItem(syyx_sdk_config_1.syyx_const.local_business_config_version, version);
            this.__remote_business_config_inited = true;
        }
        this.init_remote_config_compelete();
    };
    /**
     * 加载配置
     */
    syyx_manager.load_config = function () {
        //加载ui预制体的配置
        var self = this;
        syyx_sdk_utils_1.syyx_sdk_utils.load_resource(syyx_manager.__ui_prefab_config_path, function (data) {
            self._ui_prefab_config = igc.igc_resources_utils.parse_csv(data, "id"); // 这配置用了一次
            console.log("sdk-----ui prefabs have loaded", self._ui_prefab_config);
            self.load_business_config();
            syyx_ctr_manager_1.syyx_ctr_manager.load_ctr_config(); // 已经搞定，用了guobao数据
        }, this, function () {
            console.log("igc-----ui prefabs loading failed");
            self.load_business_config();
            syyx_ctr_manager_1.syyx_ctr_manager.load_ctr_config(); // 已经搞定，用了guobao数据
        });
    };
    /**
     * 加载商业化配置
     */
    syyx_manager.load_business_config = function () {
        var business_data;
        var cur_business_version = this.get_app_version();
        var key = this.get_syyx_app_id() + this.__business_version;
        //版本号不一致 之前的缓存数值置空
        localStorage.setItem(syyx_sdk_config_1.syyx_const.local_business_config_version, null);
        //刷新本地保存的远端配置版本号
        localStorage.setItem(key, cur_business_version);
        this.on_load_local_business_config(); // 这里面有 init_remote_config_compelete
        this.on_load_game_configs(true, '', 3, ''); // 就做了一些保存缓存
    };
    /**
     * 获取一个banner广告
     * @param viewType
     */
    syyx_manager.create_native_banner = function (call_back) {
        if (!syyx_adv_manager_1.syyx_adv_manager.__adv_config_inited) {
            return null;
        }
        return this.create_view(model_1.syyx_view.native_banner, call_back);
    };
    /**
     * 创建一个结算原生
     */
    syyx_manager.create_inner_interstitial = function (call_back) {
        if (!syyx_adv_manager_1.syyx_adv_manager.__adv_config_inited) {
            return null;
        }
        return this.create_view(model_1.syyx_view.inner_interstitial, call_back);
    };
    /**
     * 创建一个结算原生- 原生banner
     */
    syyx_manager.create_inner_interstitial_bn = function (call_back) {
        if (!syyx_adv_manager_1.syyx_adv_manager.__adv_config_inited) {
            return null;
        }
        return this.create_view(model_1.syyx_view.inner_interstitial_bn, call_back);
    };
    /**
    * 创建一个需要遮罩的插屏
    */
    syyx_manager.create_interstitial = function (call_back) {
        if (!syyx_adv_manager_1.syyx_adv_manager.__adv_config_inited) {
            return null;
        }
        return this.create_view(model_1.syyx_view.interstitial, call_back);
    };
    /**
    * 创建一个需要遮罩的插屏
    */
    syyx_manager.create_native_icon = function (call_back) {
        if (!syyx_adv_manager_1.syyx_adv_manager.__adv_config_inited) {
            console.log("igc----- ad initialization is not achieve--->do not call interface too early  :create_native_icon");
            return null;
        }
        return this.create_view(model_1.syyx_view.native_icon, call_back);
    };
    /**
    * 创建一个tips
    */
    syyx_manager.create_toast = function (desc) {
        this.create_view(model_1.syyx_view.toast, function (view) {
            view && view.show && view.show(desc);
        });
    };
    /**
     * 使用样式创建视图
     */
    syyx_manager.create_view = function (viewType, call_back) {
        this.load_view(viewType, call_back);
    };
    /**
     * 根据类型获取视图对象
     */
    syyx_manager.load_view = function (viewType, call_back) {
        if (window["Laya"]) {
        }
        else {
            syyx_cc_ui_manager_1.syyx_cc_ui_manager.load_ui_prefabs(viewType, call_back);
        }
    };
    syyx_manager.get_business_config = function () {
        if (!this.__local_business_config_inited && !this.__remote_business_config_inited) {
            return undefined;
        }
        return this.__business_config_data;
    };
    syyx_manager.login_channel = function (callback) {
        var self = this;
        if (this.has_login_channel) {
            return;
        }
        else {
            this.has_login_channel = true;
        }
        igc.igc_main.instance.only_login_channel(function back(res) {
            if (res && res.channel_user_info && res.channel_user_info.uid) {
                //sdk里面打一下点
                var save = localStorage.getItem("syyx_igc_uid" + igc.igc_main.instance.app_config.game_param.app_id);
                if (save && save != "") {
                    //只打login的点
                    // self.send_user_login();
                }
                else {
                    //打register的点
                    self.send_user_register();
                    //打login的点
                    setTimeout(self.send_user_login, 1000);
                    self.__user_id = res.channel_user_info.uid;
                    localStorage.setItem("syyx_igc_uid" + igc.igc_main.instance.app_config.game_param.app_id, res.channel_user_info.uid);
                }
            }
            self.check_user_start_game_type();
            self.set_stat_inited();
            callback && callback(res);
        });
    };
    /**
     * 获取运营配置对应key的值
     * @param key business_config 的 id值
     */
    syyx_manager.get_business_data_by_key = function (key) {
        var business_config_data = syyx_manager.get_business_config();
        if (business_config_data && business_config_data[key]) {
            return business_config_data[key].value;
        }
        return undefined;
    };
    /**
     * 展示广告，
     * @param ad_type 广告类型 根据 igc.e_ad_type 传入
     *  interstitial = 1,   插屏
        video = 2,          视频
        native = 3,         原生
        banner = 4,         banner
     * @param ad_pos_id     配置表广告ID
     * @param onLoad    广告加载成功
     * 1：视频加载成功通过此接口返回信息，游戏可做一些相应逻辑处理，比如停止音乐
     * 2：原生通过此接口返回信息
     * onLoad: function (param, res) {
     *      //原生广告返回信息：res 是一个list 使用list里的第一个即可 如果list为空 或 长度为零，则代表没有拉取到数据
     *      let native_data = res[0]
     *      native_data = {
                adUnitId: 此原生广告资源的子id，上报曝光和点击使用
                title: 广告标题,
                desc:广告描述,
                //icon
                iconUrlList:// 版本兼容, 小图ICON
                icon: 小图ICON,
                imgUrlList: 大图ICON, 目前一般都用这个
                logoUrl: 目前拼界面没用到,
                clickBtnTxt:目前拼界面没用到,
                //creativeType
                creativeType: 目前拼界面没用到,
                interactionType:目前拼界面没用到
            }
     * }
     * @param onShow  广告显示出来了
     * 1:banner 显示出来 有回调
     * 2:插屏 显示出来 有回调
     * 其他广告类型如果有回调 是属于框架伪造，看场景考虑是否使用
     * onShow: function () {
     * }
     *
     * @param onClose 关闭的回调
     * 1：banner 如果有onClose的返回，则代表用户关闭banner 此功能oppo需要
     * 2: 插屏关闭
     * 3: 原生无此回调
     * 4：视频 判断 res.isEnded 为true则代表视频看完，为false则代表视频没看完
     * onClose: function (param, res){
     * }
     *
     * @param onError : 报错
     * 报错，或无广告则此接口回调，各广告类型都有此回调，比如视频有此回调，则可弹tips 目前无广告
     * err为报错信息 可 JSON.stringify(err) 打印调试
     * onError : function (param, err) {
     *
     * }
     */
    syyx_manager.create_ad = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError, sub_ad_type) {
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            console.log("sdk----- syyx_manager create_ad ad_id no configure in adv.csv");
            return;
        }
        var param = {
            ad_type: ad_type,
            ad_id: ad_id,
            ad_pos_id: ad_pos_id,
            ad_event: ad_id,
            ad_scene: ad_id,
            top_offset: 0,
            sub_ad_type: sub_ad_type || igc.e_ad_native_type.native_banner_normal,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError
        };
        return igc.igc_main.instance.create_ad(param);
    };
    syyx_manager.create_heng_fu_ad = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError, sub_ad_type) {
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            return;
        }
        // vivo横幅开关
        if (this.__business_config_data && this.__business_config_data["vivo_hengfu_switch"]) {
            if (this.__business_config_data["vivo_hengfu_switch"].value[0] == 0) {
                onError && onError();
                return;
            }
        }
        var self = this;
        // 结算页、游戏开始页等适合展示的场景调用
        if (window['qg'].getSystemInfoSync().platformVersionCode >= 1092) {
            var boxBannerAd = null;
            boxBannerAd = window['qg'].createBoxBannerAd({
                posId: ad_id
            });
            boxBannerAd.onLoad(function () {
                console.log("互推盒子横幅广告加载成功");
                onLoad && onLoad();
            });
            boxBannerAd.onError(function (err) {
                console.log("盒子横幅广告加载失败", err);
                // syyx_manager.create_toast(JSON.stringify(err))
                onError && onError(err);
            });
            // 广告数据加载成功后展示
            boxBannerAd.show().then(function () {
                onShow && onShow();
            }).catch(function (error) {
                onError && onError(error);
            });
            self.boxBannerAd_vivo = boxBannerAd;
        }
        else {
            console.log('暂不支持互推盒子相关 API');
        }
    };
    syyx_manager.hide_boxBannerAd_vivo = function () {
        var boxBannerAd_vivo_instance = this.boxBannerAd_vivo;
        if (boxBannerAd_vivo_instance) {
            boxBannerAd_vivo_instance.destroy();
        }
    };
    syyx_manager.hide_game_portal_box_vivo = function () {
        var game_portal_box_vivo_instance = this.game_portal_box_vivo;
        if (game_portal_box_vivo_instance) {
            game_portal_box_vivo_instance.isDestroyed = true;
            game_portal_box_vivo_instance.destroy();
        }
    };
    /**
     * 显示广告  各参数意义和create_ad相同
     * @param ad_type
     * @param ad_pos_id
     * @param onLoad
     * @param onShow
     * @param onClose
     * @param onError
     * @param sub_ad_type
     */
    syyx_manager.show_ad = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError, sub_ad_type) {
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id || ad_id == "1" || ad_id == "0") {
            console.log("igc----- syyx_manager show_ad ad_id no configure in adv.csv");
            return;
        }
        var param = {
            ad_type: ad_type,
            ad_id: ad_id,
            ad_pos_id: ad_pos_id,
            ad_event: ad_id,
            ad_scene: ad_id,
            sub_ad_type: sub_ad_type || igc.e_ad_native_type.native_banner_normal,
            onLoad: onLoad,
            onShow: onShow,
            onClose: onClose,
            onError: onError
        };
        return igc.igc_main.instance.show_ad(param);
    };
    /**
     * 销毁广告 主要也就是 banner 使用了 一般目前Oppo和vivo隐藏banner 也就是调用destroy了
     * @param ad_type 广告类型 根据 igc.e_ad_type 传入
     *  interstitial = 1,   插屏
        video = 2,          视频
        native = 3,         原生
        banner = 4,         banner
     * @param ad_pos_id     配置表广告ID
     */
    syyx_manager.destroy_ad = function (ad_type, ad_pos_id, sub_ad_type) {
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            return;
        }
        var param = {
            ad_type: ad_type,
            ad_id: ad_id,
            ad_pos_id: ad_pos_id,
            sub_ad_type: sub_ad_type || igc.e_ad_native_type.native_banner_normal,
            ad_event: ad_id,
            ad_scene: ad_id,
        };
        return igc.igc_main.instance.destroy_ad(param);
    };
    /*
    static show_ad(param) {
        return igc.igc_main.instance.show_ad(param)
    }
    */
    /**
     * 隐藏广告 主要也就是 banner 目前也不怎么使用了
     * @param ad_type 广告类型 根据 igc.e_ad_type 传入
     *  interstitial = 1,   插屏
        video = 2,          视频
        native = 3,         原生
        banner = 4,         banner
     * @param ad_pos_id     配置表广告位ID
     */
    syyx_manager.hide_ad = function (ad_type, ad_pos_id) {
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id || ad_id == "1" || ad_id == "0") {
            console.log("igc----- syyx_manager hide_ad ad_id no configure in adv.csv");
            return;
        }
        var param = {
            ad_type: ad_type,
            ad_id: ad_id,
            ad_pos_id: ad_pos_id,
            ad_event: ad_id,
            ad_scene: ad_id,
        };
        return igc.igc_main.instance.hide_ad(param);
    };
    /**
     * 结算原生————上报点击
     */
    syyx_manager.report_native_inner_interstitial_click = function (ad_pos_id) {
        if (!ad_banner_1.ad_banner.can_show_first) {
            console.log("igc----- is in oppo first ad cd ");
            return;
        }
        var native_data = this.get_local_native_data(ad_pos_id);
        this.create_inner_interstitial(function (view) {
            if (native_data) {
                view.report_click();
            }
        });
    };
    /**
     * 隐藏结算原生
     *
     */
    syyx_manager.hide_native_inner_interstitial = function () {
        this.load_view(model_1.syyx_view.inner_interstitial, function (view) {
            if (view.node.parent) {
                view.hide && view.hide();
            }
        });
    };
    /**
     * 隐藏原生banner
     *
     */
    syyx_manager.hide_native_banner = function () {
        this.load_view(model_1.syyx_view.inner_interstitial_bn, function (view) {
            if (view.node.parent) {
                view.hide && view.hide();
            }
        });
    };
    /**
     * 是否使用oppo的互推盒子
     * 快应用版本号大于等于1076则可以使用互推盒子
     */
    syyx_manager.support_game_box = function () {
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            var systeminfo = syyx_manager.get_system_info_sync();
            if (systeminfo && systeminfo.platformVersion) {
                return systeminfo.platformVersion >= 1076;
            }
        }
        return false;
    };
    /**
     * 原生广告 上报曝光
     * @param ad_pos_id 配置表广告位ID
     * @param native_data 原生数据
     */
    syyx_manager.report_ad_show = function (ad_pos_id, native_data) {
        return syyx_adv_manager_1.syyx_adv_manager.report_ad_show(ad_pos_id, native_data);
    };
    /**
     * 原生广告  上报点击
     * @param ad_pos_id 配置表广告位ID
     * @param ad_unit_id create_ad的onload返回的原生广告信息里面的adUnitId 这个单位ID
     */
    syyx_manager.report_ad_click = function (ad_pos_id, native_data) {
        return syyx_adv_manager_1.syyx_adv_manager.report_ad_click(ad_pos_id, native_data);
    };
    /**
     * 预加载视频广告（华为）
     * @param ad_pos_id
     * @param onLoad
     * @param onShow
     * @param onClose
     * @param onError
     */
    syyx_manager.preload_video = function () {
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            syyx_manager.create_ad(igc.e_ad_type.video, syyx_sdk_enum_1.e_ad_id.video_add_gold, function () { }, function () { }, function () { }, function () { });
        }
    };
    syyx_manager.show_native_inner_interstitial = function (ad_pos_id, parent, click_back, show_back, hide_back, is_new_type) {
        if (is_new_type === void 0) { is_new_type = true; }
        if (!ad_banner_1.ad_banner.can_show_first) {
            console.log("igc----- is in oppo first ad cd ");
            return;
        }
        var native_data = this.get_local_native_data(ad_pos_id); // ad_pos_id no use
        if (ad_pos_id == '10304001') { // 原生banner
            this.create_inner_interstitial_bn(function (view) {
                if (native_data) {
                    view.show(parent, native_data, click_back, show_back, hide_back, is_new_type);
                }
            });
        }
        else {
            this.create_inner_interstitial(function (view) {
                if (native_data) {
                    view.show(parent, native_data, click_back, show_back, hide_back, is_new_type);
                }
            });
        }
    };
    syyx_manager.click_native_inner_interstitial = function (call_back) {
        this.create_inner_interstitial(function (view) {
            if (view && view.node && view.node.parent) {
                view.report_click();
            }
            else {
                call_back && call_back();
            }
        });
    };
    syyx_manager.click_native_banner = function (call_back) {
        this.create_inner_interstitial_bn(function (view) {
            if (view && view.node && view.node.parent) {
                view.report_click();
            }
            else {
                call_back && call_back();
            }
        });
    };
    /**
    * 获取加载好的原生数据
    * @param ad_pos_id 配置表原生id
    */
    syyx_manager.get_local_native_data = function (ad_pos_id) {
        return syyx_adv_manager_1.syyx_adv_manager.get_local_native_data(ad_pos_id);
    };
    /**
     * 展示视频
     */
    syyx_manager.show_video = function (ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips) {
        if (need_err_tips === void 0) { need_err_tips = false; }
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            onClose && onClose(null, { isEnded: true });
            return;
        }
        else if (this.__business_config_data && this.__business_config_data["video_open_switch"] && this.__business_config_data["video_open_switch"].value[0] == 0) { // 视频开关
            {
                need_err_tips && syyx_manager.create_toast("目前暂无广告，请稍后再试");
                onError && onError();
                return;
            }
        }
        else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.hw_qg) {
            syyx_manager.show_ad(igc.e_ad_type.video, ad_pos_id, onLoad, onShow, function (param, res) {
                if (res.isEnded) { }
                else { }
                onClose && onClose(param, res);
            }, function () {
                need_err_tips && syyx_manager.create_toast("暂无广告，请稍后再试");
                onError && onError();
            });
        }
        else {
            syyx_manager.create_ad(igc.e_ad_type.video, ad_pos_id, onLoad, onShow, function (param, res) {
                if (res.isEnded) {
                }
                else {
                }
                onClose && onClose(param, res);
            }, function (params, err) {
                // code: 2000, msg: your request ad too often
                // need_err_tips && syyx_manager.create_toast( JSON.stringify(err.error))  // 有时新设备第一次打开会报错,官方返回了调取台频繁
                need_err_tips && syyx_manager.create_toast("目前暂时无广告，请稍后再试");
                onError && onError();
            });
        }
    };
    /**
     * 判断平台版本号，看是否支持添加桌面功能
     * platformVersion >= 1044;
     */
    syyx_manager.check_can_add_desktop = function () {
        return igc.igc_main.instance.check_can_add_desktop({});
    };
    /**
     * 检查有没有添加桌面
     * @param can_add  没有添加
     * @param has_add  添加了
     */
    syyx_manager.check_is_add_desktop = function (can_add, has_add) {
        var param = {
            can_add: can_add,
            has_add: has_add
        };
        return igc.igc_main.instance.check_is_add_desktop(param);
    };
    /**
     * 添加桌面操作
     * @param on_success   可以添加桌面 添加桌面的系统界面弹出
     * @param on_failed     不能添加桌面 比如平台版本较低
     * @param on_failed_back  弹出添加桌面的系统界面失败
     * @param has_create    图标已经创建过了
     * ps：当接收到on_success回调后，定时器一秒之后 再调用 check_is_add_desktop 来判断用户是否添加了桌面
     * 如果回调是 can_add 则代表用户取消 如果回调是has_add ，则代表用户添加桌面 可发放奖励
     */
    syyx_manager.add_desktop = function (on_success, on_failed, on_failed_back, has_create) {
        var param = {
            on_success: on_success,
            on_failed: on_failed,
            on_failed_back: on_failed_back,
            has_create: has_create
        };
        return igc.igc_main.instance.add_desktop(param);
    };
    /**
     * 后台转前台监听
     * @param callback
     * callback：function(res){
     * }
     */
    syyx_manager.on_show = function (callback) {
        return igc.igc_main.instance.on_show({
            on_show: callback
        });
    };
    /**
     * 转后台监听
     * @param callback
     * callback：function(res){
     * }
     */
    syyx_manager.on_hide = function (callback) {
        return igc.igc_main.instance.on_hide({
            on_hide: callback
        });
    };
    /**
     * 获取系统信息
     *  {
     *  brand：设备品牌
        model：手机型号
        pixelRatio：设备像素比
        screenWidth：屏幕宽度
        screenHeight：屏幕高度
        windowWidth：可使用窗口宽度
        windowHeight：可使用窗口高度
        statusBarHeight：状态栏/异性缺口高度
        language：环境语言
        version：版本号
        platform：客户端平台
        system：操作系统版本
        platformVersion：平台版本号/客户端基础库版本
        extra:getSystemInfoSync返回的参数
        }
     */
    syyx_manager.get_system_info_sync = function () {
        return igc.igc_main.instance.get_system_info_sync();
    };
    /**
     * 获取游戏启动参数
     * scene：场景值
     * query：查询参数
     * referrerInfo：小游戏启动来源
     * entryDataHash：群入口信息
     * extra 小游戏基本信息，包括宿主 Id，gameId，启动场景等参数
    */
    syyx_manager.get_launch_options_sync = function () {
        return igc.igc_main.instance.get_launch_options_sync();
    };
    /**
     * 关闭小游戏
     */
    syyx_manager.exit_mini_program = function () {
        return igc.igc_main.instance.exit_mini_program();
    };
    /**
     * 小游戏跳转
     * @param param
     * {
     *   app_id:小游戏包名
     *   success:成功回调
     * }
     */
    syyx_manager.navigate_to_mini_program = function (app_id, success) {
        var param = {
            app_id: app_id,
            success: success
        };
        return igc.igc_main.instance.navigate_to_mini_program(param);
    };
    /**
     * 分享卡片
     * @param param
     * {
     *   *  channel：转发内容类型
         *  templateId：分享素材模板id
         *  desc:分享文案
         *  title:标题   （必须）
         *  imageUrl：图片   （必须）
         *  query:查询字符串
         *  extra：附加信息
         *  success:成功回调
         *  fail:失败回调
         *  extra:附加信息
     * }
     */
    syyx_manager.share = function (title, imageUrl, query, desc, success, fail) {
        var param = {
            title: title,
            imageUrl: imageUrl,
            query: query,
            desc: desc,
            success: success,
            fail: fail
        };
        return igc.igc_main.instance.share(param);
    };
    /**
     * 监听右上角分享
     * @param param
     * {
     *  title:标题
        imageUrl：图片
     * }
     */
    syyx_manager.on_share_app_message = function (title, imageUrl) {
        var param = {
            title: title,
            imageUrl: imageUrl
        };
        return igc.igc_main.instance.on_share_app_message(param);
    };
    /**
     * 开始录屏
     * @param param
     * {
     *  time: 录屏最大时间  （非必须）
        is_clip_end: 是否截取最后x秒录屏   （非必须）
        clip_time: 截取最后录屏的时间  例如：截取最后30s   （非必须）
     * }
     */
    syyx_manager.start_record_screen = function (time, is_clip_end, clip_time) {
        var param = {
            time: time,
            is_clip_end: is_clip_end,
            clip_time: clip_time
        };
        return igc.igc_main.instance.start_record_screen(param);
    };
    /**
     * 结束录屏
     */
    syyx_manager.stop_record_screen = function () {
        return igc.igc_main.instance.stop_record_screen();
    };
    /**
     * 暂停录屏
     */
    syyx_manager.pause_record_screen = function () {
        return igc.igc_main.instance.pause_record_screen();
    };
    /**
     * 恢复录屏
     */
    syyx_manager.resume_record_screen = function () {
        return igc.igc_main.instance.resume_record_screen();
    };
    /**
       * 分享录屏
       * @param param
       * {
       *  videoTopics: ["画线大作战","有人@你，就喜欢看你追上我又杀不了我，我的画线秘籍就是..","抖音小游戏",]  话题
       *  title:标题
       *  desc:描述
       *  imageUrl:大图
       *  query:查询字符串
       *  fail:失败回调
       *  success:成功回调
       * }
       */
    syyx_manager.share_record_screen = function (videoTopics, title, desc, imageUrl, query, fail, success) {
        var param = {
            videoTopics: videoTopics,
            title: title,
            desc: desc,
            imageUrl: imageUrl,
            query: query,
            fail: fail,
            success: success,
        };
        return igc.igc_main.instance.share_record_screen(param);
    };
    /**
     * 获取录屏文件
     */
    syyx_manager.get_record_video = function () {
        return igc.igc_main.instance.get_record_video();
    };
    syyx_manager.get_adid_gc_statuc = function (_type) {
        if (this.adIdMap.has(_type)) {
            var array = this.adIdMap.get(_type);
            var res = JSON.parse(array[0]);
            if (Boolean(res)) {
                return res.gc_status;
            }
            else
                return null;
        }
        else
            return null;
    };
    syyx_manager.guobao_get_channel_ad_id = function (_type) {
        if (this.adIdMap.has(_type)) {
            var array = this.adIdMap.get(_type);
            var res = JSON.parse(array[0]);
            if (Boolean(res)) {
                return res.adv_id;
            }
            else
                return null;
        }
        else
            return null;
    };
    /**
     * 加载本地的商业化配置
     */
    syyx_manager.on_load_local_business_config = function () {
        var self = this;
        syyx_sdk_utils_1.syyx_sdk_utils.load_resource(this.__business_config_file_path, function (data) {
            var new_data = igc.igc_resources_utils.parse_csv(data, "id");
            //拉取远端配置失败 则使用本地配置
            new_data["native_icon_switch"] = {
                desc: "原生icon开关",
                id: "native_icon_switch",
                value: [1]
            };
            new_data["native_icon_trap_pro"] = {
                desc: "原生icon易点击概率",
                id: "native_icon_trap_pro",
                value: [1]
            };
            new_data["banner_cool_time"] = {
                desc: "banner自动刷新时间",
                id: "banner_cool_time",
                value: [20, 20]
            };
            new_data["native_icon_cool_time"] = {
                desc: "原生icon自动刷新时间",
                id: "native_icon_cool_time",
                value: [20, 20]
            };
            new_data["adv_banner_cd"] = {
                desc: "原生及banner广告冷却（秒）",
                id: "adv_banner_cd",
                value: [2]
            };
            new_data["banner_top_offset"] = {
                desc: "手Q渠道普通banner上移距离",
                id: "banner_top_offset",
                value: [0, 0]
            };
            new_data["native_banner_open_switch"] = {
                desc: "是否启用原生banner广告开关",
                id: "native_banner_open_switch",
                value: [1]
            };
            new_data["native_banner_click_switch"] = {
                desc: "是否启用原生banner易点击处理",
                id: "native_banner_click_switch",
                value: [0]
            };
            new_data["native_banner_click_pro"] = {
                desc: "原生banner易点击触发概率",
                id: "native_banner_click_pro",
                value: [0]
            };
            new_data["native_banner_click_protect"] = {
                desc: "原生banner易点击保护",
                id: "native_banner_click_protect",
                value: [3]
            };
            new_data["native_institial_white_easy_click"] = {
                desc: "原生插屏点击空白跳转",
                id: "native_institial_white_easy_click",
                value: [0]
            };
            new_data["native_banner_report_click_update_switch"] = {
                desc: "原生Banner点击上报后立即刷新",
                id: "native_banner_report_click_update_switch",
                value: [1]
            };
            new_data["native_icon_report_click_update_switch"] = {
                desc: "原生icon点击上报后立即刷新",
                id: "native_icon_report_click_update_switch",
                value: [1]
            };
            new_data["native_inner_report_click_update_switch"] = {
                desc: "结算原生点击上报后立即刷新",
                id: "native_inner_report_click_update_switch",
                value: [1]
            };
            new_data["native_interstitial_report_click_update_switch"] = {
                desc: "原生插屏点击上报后立即刷新",
                id: "native_interstitial_report_click_update_switch",
                value: [1]
            };
            new_data["show_normal_banner_switch"] = {
                desc: "是否开启展示普通banner开关",
                id: "show_normal_banner_switch",
                value: [1]
            };
            new_data["native_icon_trap_pro"] = {
                desc: "原生icon易点击概率",
                id: "native_icon_trap_pro",
                value: [0]
            };
            new_data["finger_close_banner_switch"] = {
                desc: "关闭Banner后不再展示",
                id: "finger_close_banner_switch",
                // value: [0, 60]
                value: [0, 60]
            };
            new_data["native_inner_institial_click_close_pro"] = {
                desc: "关闭结算原生易跳转概率",
                id: "native_inner_institial_click_close_pro",
                value: [0]
            };
            new_data["native_institial_click_close_pro"] = {
                desc: "关闭原生插屏易跳转概率",
                id: "native_institial_click_close_pro",
                value: [0]
            };
            new_data["open_oppo_new_rule"] = {
                desc: "是否开启oppo新规",
                id: "open_oppo_new_rule",
                value: [1]
            };
            new_data["oppo_banner_cool_time"] = {
                desc: "oppoBanner累计展示刷新时间",
                id: "oppo_banner_cool_time",
                value: [[0, 120, 10], [121, 180, 11], [181, 240, 12]]
            };
            new_data["oppo_native_show_limit"] = {
                desc: "oppo原生展示限制",
                id: "oppo_native_show_limit",
                value: [60, 60]
            };
            new_data["oppo_native_cache_length"] = {
                desc: "oppo原生数据缓存数组长度",
                id: "oppo_native_cache_length",
                value: [5]
            };
            new_data["native_inner_interstitial_switch"] = {
                desc: "结算原生开关",
                id: "native_inner_interstitial_switch",
                value: [1]
            };
            new_data["native_banner_click_pro_limit"] = {
                desc: "原生banner点击率限制",
                id: "native_banner_click_pro_limit",
                value: [1000, 0.4, 60]
            };
            new_data["native_inner_click_pro_limit"] = {
                desc: "结算原生点击率限制",
                id: "native_inner_click_pro_limit",
                value: [1000, 0.4, 60]
            };
            new_data["native_interstitial_click_pro_limit"] = {
                desc: "原生插屏点击率限制",
                id: "native_interstitial_click_pro_limit",
                value: [1000, 0.4, 60]
            };
            new_data["native_interstitial_click_wrap"] = {
                desc: "原生插屏展示策略",
                id: "native_interstitial_click_wrap",
                value: [1000, 2, 5]
            };
            new_data["native_inner_institial_click_wrap"] = {
                desc: "结算原生展示策略",
                id: "native_inner_institial_click_wrap",
                value: [1000, 2, 5]
            };
            new_data["banner_strong_update_switch"] = {
                desc: "banner强制刷新开关",
                id: "banner_strong_update_switch",
                value: [0]
            };
            new_data["native_banner_height_open_rule"] = {
                desc: "原生banner高度启动规则",
                id: "native_banner_height_open_rule",
                value: [2, 3, 5] // 第一个是展示次数为多少时，会提高banner高度
            };
            new_data["native_banner_height_rule"] = {
                desc: "原生banner高度规则",
                id: "native_banner_height_rule",
                value: [200, 320, 1.3]
            };
            new_data["load_native_interstitial_rule"] = {
                desc: "原生插屏加载规则（第X次去加载）",
                id: "load_native_interstitial_rule",
                value: [3]
            };
            new_data["first_use_natibe_banner"] = {
                desc: "原生插屏优先使用原生Banner",
                id: "first_use_natibe_banner",
                value: [1]
            };
            new_data["ctr_test_open"] = {
                desc: "ctr开启开关",
                id: "ctr_test_open",
                value: [1]
            };
            new_data["ctr_test_close_button_delay"] = {
                desc: "ctr测试关闭按钮延迟",
                id: "ctr_test_close_button_delay",
                value: [1]
            };
            new_data["ctr_test_reward_count"] = {
                desc: "ctr测试奖励数量",
                id: "ctr_test_reward_count",
                value: [100]
            };
            new_data["banner_click_mask_open_rule"] = {
                desc: "banner点击区域缩放规则",
                id: "banner_click_mask_open_rule",
                value: [2, 1, 2]
            };
            new_data["banner_click_mask_scale"] = {
                desc: "banner点击区域缩放倍数",
                id: "banner_click_mask_scale",
                value: [1.5]
            };
            new_data["banner_click_mask_scale"] = {
                desc: "banner点击区域缩放倍数",
                id: "banner_click_mask_scale",
                value: [1.5]
            };
            new_data["video_open_switch"] = {
                desc: "视频开关",
                id: "video_open_switch",
                value: [1]
            };
            new_data["vivo_cp_switch"] = {
                desc: "插屏开关",
                id: "vivo_cp_switch",
                value: [1]
            };
            new_data["vivo_yscp_switch"] = {
                desc: "原生插屏开关",
                id: "vivo_yscp_switch",
                value: [1]
            };
            new_data["vivo_hengfu_switch"] = {
                desc: "vivo横幅互推",
                id: "vivo_hengfu_switch",
                value: [1]
            };
            new_data["jgg_switch"] = {
                desc: "ov九宫格互推",
                id: "jgg_switch",
                value: [1]
            };
            //替换模式加载，remote_business_config_data不为空
            var ysbn_status = self.get_adid_gc_statuc('YSBN'); // 原生banner状态
            var bn_status = self.get_adid_gc_statuc('BN'); // 普通banner状态
            var ysjs_status = self.get_adid_gc_statuc('YSJS'); // 原生结算状态
            var sp_status = self.get_adid_gc_statuc('SP'); // 视频状态
            var jsym_status = self.get_adid_gc_statuc('JSYM'); // 新品尝鲜状态 
            var ysic_status = self.get_adid_gc_statuc('YSIC'); // 原生icon开关
            var ht_status = self.get_adid_gc_statuc('HT') || 0; // vivo互推
            var jgg_status = self.get_adid_gc_statuc('JGG') || 0; // 九宫格互推
            var cp_status = self.get_adid_gc_statuc('CP') || 0; // vivo插屏状态
            var yscp_status = self.get_adid_gc_statuc('YSCP') || 0; // vivo插屏状态
            new_data["native_banner_open_switch"].value[0] = ysbn_status; // 原生banner开关
            new_data["show_normal_banner_switch"].value[0] = bn_status; // 普通banner开关 
            new_data["native_inner_interstitial_switch"].value[0] = ysjs_status; // 结算原生开关 
            new_data["video_open_switch"].value[0] = sp_status; // 视频开启开关 
            new_data["ctr_test_open"].value[0] = jsym_status; // 新品尝鲜开启开关 
            new_data["native_icon_switch"].value[0] = ysic_status; //原生icon开关
            new_data["vivo_cp_switch"].value[0] = cp_status; // vivo普通插屏开关 
            new_data["vivo_yscp_switch"].value[0] = yscp_status; // vivo原生插屏开关 
            new_data["vivo_hengfu_switch"].value[0] = ht_status; // vivo互推开关 
            new_data["jgg_switch"].value[0] = jgg_status; // 九宫格互推开关 
            if (self.__remote_business_config_inited) {
                syyx_sdk_utils_1.syyx_sdk_utils.replace_data(new_data, self.__business_config_data);
                console.log("sdk----- bussiness config is--- ", new_data);
                self.__business_config_data = new_data;
            }
            else {
                self.__business_config_data = new_data;
                console.log("sdk-----local bussiness config is ", new_data);
            }
            self.__local_business_config_inited = true;
            self.init_remote_config_compelete();
        }, this);
    };
    /*
    * 预加载九宫格互推盒子
    * @param ad_pos_id adv配置表广告id
    * @param onLoad 加载成功回调
    * @param onShow 展示成功回调
    * @param onClose 关闭回调
    * @param onError 报错回调
    */
    syyx_manager.pre_load_game_portal_box = function (ad_pos_id, onLoad, onShow, onClose, onError) {
        var self = this;
        if (this.support_game_box()) { // 快应用版本大于1076
            syyx_manager.create_ad(igc.e_ad_type.app_box, ad_pos_id, null, null, function () {
                onClose && onClose();
                setTimeout(function () {
                    self.pre_load_game_portal_box(ad_pos_id, null, null, null, null);
                }, 500);
            }, null, igc.e_ad_app_box_type.portal_box);
        }
    };
    /**
     * oppo九宫格互推盒子
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     * @param need_err_tips 默认为false，为true时显示sdk自带的报错飘字
     */
    syyx_manager.show_game_portal_box = function (ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips) {
        if (need_err_tips === void 0) { need_err_tips = false; }
        var self = this;
        // 九宫格互推开关
        if (this.__business_config_data && this.__business_config_data["jgg_switch"]) {
            if (this.__business_config_data["jgg_switch"].value[0] == 0) {
                need_err_tips && syyx_manager.create_toast("加载中，稍后再试");
                onError && onError();
                return;
            }
        }
        syyx_manager.show_ad(igc.e_ad_type.app_box, ad_pos_id, onLoad, onShow, function () {
            onClose && onClose();
            setTimeout(function () {
                self.pre_load_game_portal_box(ad_pos_id, null, null, null, null);
            }, 500);
        }, function () {
            need_err_tips && syyx_manager.create_toast("加载中，稍后再试");
            onError && onError();
        }, igc.e_ad_app_box_type.portal_box);
    };
    syyx_manager.show_game_portal_box_vivo = function (ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips) {
        if (need_err_tips === void 0) { need_err_tips = false; }
        var self = this;
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            return;
        }
        // 九宫格互推开关
        if (this.__business_config_data && this.__business_config_data["jgg_switch"]) {
            if (this.__business_config_data["jgg_switch"].value[0] == 0) {
                need_err_tips && syyx_manager.create_toast("加载中，稍后再试");
                onError && onError();
                return;
            }
        }
        if (window['qg'].getSystemInfoSync().platformVersionCode >= 1092) {
            var boxPortalAd_1 = null;
            boxPortalAd_1 = window['qg'].createBoxPortalAd({
                posId: ad_id
            });
            boxPortalAd_1.onLoad(function () {
                console.log("vivo九宫格广告加载成功");
                onLoad && onLoad();
            });
            boxPortalAd_1.onError(function (err) {
                console.log("vivo九宫格加载失败", err);
                // syyx_manager.create_toast(JSON.stringify(err))
                onError && onError(err);
            });
            boxPortalAd_1.onClose(function () {
                console.log('close');
                if (boxPortalAd_1.isDestroyed) {
                    return;
                }
                // 当九宫格关闭之后，再次展示Icon
                boxPortalAd_1.show();
            });
            // 广告数据加载成功后展示
            boxPortalAd_1.show().then(function () {
                onShow && onShow();
            }).catch(function (error) {
                onError && onError(error);
            });
            self.game_portal_box_vivo = boxPortalAd_1;
        }
        else {
            console.log('暂不支持互推盒子相关 API');
        }
    };
    // vivo 原生模板
    syyx_manager.show_original_module = function (ad_pos_id, onSuccess, onError, onClose, top, left) {
        var self = this;
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            return;
        }
        if (window['qg'].getSystemInfoSync().platformVersionCode < 1091) {
            onError && onError('低于1092版本不支持');
            return;
        }
        if (top && left) {
            var customAd = window['qg'].createCustomAd({
                posId: ad_id,
                style: {
                    left: left,
                    top: top,
                }
            });
        }
        else {
            var customAd = window['qg'].createCustomAd({
                posId: ad_id
            });
        }
        customAd.onError(function (err) {
            onError && onError(err);
            console.log("原生模板广告加载失败", err);
        });
        customAd.onClose(function () {
            onClose && onClose();
            console.log("原生模板广告关闭事件的回调函数");
        });
        customAd.show().then(function () {
            console.log('原生模板广告展示完成');
            onSuccess && onSuccess();
            // 存储实例，用于关闭使用
            self.original_module_data = customAd;
        }).catch(function (err) {
            onError && onError(err);
            console.log('原生模板广告展示失败', JSON.stringify(err));
        });
    };
    // 原生模板  关闭
    syyx_manager.destory_original_module = function () {
        if (this.original_module_data) {
            this.original_module_data.hide();
            this.original_module_data.destroy();
        }
        this.mCustomAD && this.mCustomAD.hide();
        this.mCustomAD && this.mCustomAD.destroy();
        this.mCustomAD = null;
    };
    syyx_manager.GetSystemInfoSync2 = function () {
        if (this.systemVersion2 == null) {
            this.systemVersion2 = window['qg'].getSystemInfoSync().platformVersionCode;
        }
        return this.systemVersion2;
    };
    // oppo 原生模板
    syyx_manager.show_original_module_oppo = function (ad_pos_id, style, onLoad, onSuccess, onError, onClose) {
        var self = this;
        var ad_id = syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
        if (!ad_id) {
            return;
        }
        if (window['qg'].getSystemInfoSync().platformVersionCode < 1092) {
            // syyx_manager.create_toast('版本过低')
            // syyx_manager.create_toast(window['qg'].getSystemInfoSync().platformVersionCode)
            console.log("版本过低 不支持原生模板广告");
            return;
        }
        if (!Boolean(style) || style.length != 3) {
            // syyx_manager.create_toast('style错误')
            console.log("参数检测错误 opencustomad style");
            return;
        }
        if (this.mCustomAD == null) {
            var customAd_1 = window['qg'].createCustomAd({
                adUnitId: ad_id,
                style: {
                    top: style[0],
                    left: style[1],
                    width: style[2],
                }
            });
            var self_2 = this;
            customAd_1.onLoad(function () {
                console.log('原生模板广告加载成功');
                onLoad && onLoad();
                customAd_1.offLoad();
            });
            customAd_1.onShow(function () {
                console.log('原生模板广告显示');
                customAd_1.offShow();
                onSuccess && onSuccess();
            });
            customAd_1.onHide(function () {
                console.log('customAd广告隐藏');
                customAd_1.offHide();
                onClose && onClose();
                customAd_1.destroy();
                self_2.mCustomAD = null;
            });
            customAd_1.show().then(function () {
                console.log('show success');
                self_2.mCustomAD = customAd_1;
            }).catch(function (error) {
                // syyx_manager.create_toast(error.errCode + '错误：' +   error.errMsg)
                console.log('show fail with:' + error.errCode + ',' + error.errMsg);
                self_2.mCustomAD = null;
                onError && onError(error);
            });
            // return;
        }
        // return;
    };
    // 新品尝鲜
    syyx_manager.show_new_products = function (call_back) {
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) {
            return;
        }
        var _business_config_data = syyx_manager.get_business_config();
        //判断新品尝鲜开关
        if (_business_config_data && _business_config_data["ctr_test_open"]) {
            //开关有值  且 值为0 关闭则设置定时器刷新普通banner
            if (_business_config_data["ctr_test_open"].value[0] == 0) {
                return;
            }
        }
        syyx_ctr_manager_1.syyx_ctr_manager.show_new_products(call_back);
    };
    syyx_manager.__syyx_app_id = 0;
    syyx_manager.viewMap = {};
    syyx_manager.func_open = {};
    syyx_manager.boxBannerAd_vivo = null;
    syyx_manager.game_portal_box_vivo = null;
    syyx_manager.adIdMap = new Map();
    //初始化参数
    syyx_manager.__game_init_file_path = "syyx_configs/syyx_game_init.json";
    syyx_manager.__business_config_file_path = "";
    syyx_manager.__adv_config_file_path = "";
    syyx_manager.__business_version = "__business_version";
    syyx_manager.__init_callback = undefined;
    syyx_manager.login_user_id = ''; // oppo登录用户id
    syyx_manager.has_init_param = false;
    syyx_manager.has_login_channel = false;
    syyx_manager.__game_init_data = undefined;
    syyx_manager.__business_config_data = {}; //运营配置,本地商业化配置
    syyx_manager._guobao_init_config_data = []; // guobao初始化配置
    syyx_manager.__local_business_config_inited = false;
    syyx_manager.__remote_business_config_inited = false;
    syyx_manager.remote_business_config_data = null; //远端运营配置暂存 
    syyx_manager.original_module_data = null; // 原生模板广告实例
    syyx_manager.mCustomAD = null; // 原生模板广告实例 oppo
    syyx_manager.__is_new_player = false;
    //回调标记
    syyx_manager.init_completed_tag = false;
    syyx_manager.refresh_completed_tag = false;
    /**
    * 打点初始化完成标记
    */
    syyx_manager.__stat_inited = false;
    /**
     * 打点初始化完成后1s才能打自定义打点
     */
    syyx_manager.__is_stat_delay = false;
    syyx_manager.__stat_data_cache = [];
    ////////////////////
    //渠道封装
    //渠道登录
    syyx_manager.__user_id = "";
    syyx_manager.systemVersion2 = null;
    return syyx_manager;
}());
exports.syyx_manager = syyx_manager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXHN5eXhfbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBOEY7QUFDOUYsMERBQW1EO0FBQ25ELHdDQUEyRDtBQUMzRCwwREFBeUQ7QUFDekQsNENBQTJDO0FBQzNDLDBEQUF5RDtBQUN6RCxnRUFBK0Q7QUFDL0QsMkRBQTBEO0FBQzFELDhDQUFxRDtBQUlyRDtJQUFBO0lBMHdEQSxDQUFDO0lBanRERzs7OztPQUlHO0lBQ0ksaUJBQUksR0FBWCxVQUFZLGFBQXVCO1FBRS9CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNmLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQTtRQUNyQyxNQUFNO1FBQ04sSUFBSSxZQUFZLENBQUE7UUFFaEIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDZCxZQUFZLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUE7U0FDdkM7YUFDSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixZQUFZLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUE7U0FDMUM7YUFDSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNuQixZQUFZLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUE7U0FDdkM7YUFDSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFRLENBQUE7WUFDNUIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hDLElBQUksUUFBUSxJQUFJLE1BQU0sRUFBRTtnQkFDcEIsWUFBWSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFBLENBQUUs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ekIsNkJBQWdCLEdBQUcsU0FBUyxDQUFBO0lBRTVCLG1DQUFzQixHQUFHLEVBQUUsQ0FBQyxDQUFBLGNBQWM7SUFDMUMscUNBQXdCLEdBQUcsRUFBRSxDQUFBLENBQUUsY0FBYztJQUU3QywyQ0FBOEIsR0FBRyxLQUFLLENBQUM7SUFDdkMsNENBQStCLEdBQUcsS0FBSyxDQUFDO0lBQ3hDLHdDQUEyQixHQUFHLElBQUksQ0FBQSxDQUFBLFdBQVc7SUFFN0MsaUNBQW9CLEdBQUcsSUFBSSxDQUFBLENBQUEsV0FBVztJQUN0QyxzQkFBUyxHQUFHLElBQUksQ0FBQSxDQUFDLGdCQUFnQjtJQUVqQyw0QkFBZSxHQUFHLEtBQUssQ0FBQTtJQUU5QixNQUFNO0lBQ0MsK0JBQWtCLEdBQUcsS0FBSyxDQUFBO0lBQzFCLGtDQUFxQixHQUFHLEtBQUssQ0FBQTtJQUtwQzs7TUFFRTtJQUNLLDBCQUFhLEdBQUcsS0FBSyxDQUFBO0lBQzVCOztPQUVHO0lBQ0ksNEJBQWUsR0FBRyxLQUFLLENBQUE7SUFDdkIsOEJBQWlCLEdBQUcsRUFBRSxDQUFBO0lBb2Y3QixvQkFBb0I7SUFDcEIsTUFBTTtJQUVOLE1BQU07SUFDQyxzQkFBUyxHQUFHLEVBQUUsQ0FBQTtJQXVvQ2QsMkJBQWMsR0FBVyxJQUFJLENBQUM7SUFvRnpDLG1CQUFDO0NBMXdERCxBQTB3REMsSUFBQTtBQTF3RFksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzeXl4X2NvbnN0LCBlX3N5eXhfc2RrX3B1Ymxpc2hfdHlwZSwgaW5pdF9jb25maWcgfSBmcm9tIFwiLi4vY29uZmlncy9zeXl4X3Nka19jb25maWdcIjtcclxuaW1wb3J0IHsgZV9hZF9pZCB9IGZyb20gXCIuLi9jb25maWdzL3N5eXhfc2RrX2VudW1cIjtcclxuaW1wb3J0IHsgc3l5eF92aWV3LCBuYXRpdmVfYWRfZGF0YSB9IGZyb20gXCIuLi9tb2RlbC9tb2RlbFwiO1xyXG5pbXBvcnQgeyBzeXl4X3Nka191dGlscyB9IGZyb20gXCIuLi91dGlscy9zeXl4X3Nka191dGlsc1wiO1xyXG5pbXBvcnQgeyBhZF9iYW5uZXIgfSBmcm9tIFwiLi9hZC9hZF9iYW5uZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9hZHZfbWFuYWdlciB9IGZyb20gXCIuL2FkL3N5eXhfYWR2X21hbmFnZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9jdHJfbWFuYWdlciB9IGZyb20gXCIuL2N0cl90ZXN0L3N5eXhfY3RyX21hbmFnZXJcIjtcclxuaW1wb3J0IHsgc3l5eF9jY191aV9tYW5hZ2VyIH0gZnJvbSBcIi4vc3l5eF9jY191aV9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHN5eXhfYXBpX3JlcXVlc3QgfSBmcm9tIFwiLi4vdXRpbHMvc3l5eF9hcGlcIjtcclxuaW1wb3J0IHsgc3l5eF9zZGtfYXBpIH0gZnJvbSBcIi4uL3N5eXhfc2RrX2FwaVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBzeXl4X21hbmFnZXIge1xyXG5cclxuICAgIC8v5piv5ZCm5Yid5aeL5YyWb2tcclxuICAgIHN0YXRpYyBfX2luaXRlZDtcclxuICAgIHN0YXRpYyBfX3N5eXhfYXBwX2lkID0gMDtcclxuICAgIHN0YXRpYyB2aWV3TWFwOiB7IFtrZXk6IG51bWJlcl06IGFueSB9ID0ge307XHJcbiAgICBzdGF0aWMgZnVuY19vcGVuOiB7IFtrZXk6IG51bWJlcl06IGJvb2xlYW4gfSA9IHt9O1xyXG5cclxuICAgIHN0YXRpYyBib3hCYW5uZXJBZF92aXZvOiBhbnkgPSBudWxsOyBcclxuICAgIHN0YXRpYyBnYW1lX3BvcnRhbF9ib3hfdml2bzogYW55ID0gbnVsbDsgXHJcbiAgICBcclxuICAgIHByaXZhdGUgc3RhdGljIGFkSWRNYXA6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAvL+WIneWni+WMluWPguaVsFxyXG4gICAgc3RhdGljIF9fZ2FtZV9pbml0X2ZpbGVfcGF0aCA9IFwic3l5eF9jb25maWdzL3N5eXhfZ2FtZV9pbml0Lmpzb25cIjtcclxuICAgIHN0YXRpYyBfX2J1c2luZXNzX2NvbmZpZ19maWxlX3BhdGggPSBcIlwiO1xyXG4gICAgc3RhdGljIF9fYWR2X2NvbmZpZ19maWxlX3BhdGggPSBcIlwiO1xyXG5cclxuICAgIHN0YXRpYyBfX2J1c2luZXNzX3ZlcnNpb24gPSBcIl9fYnVzaW5lc3NfdmVyc2lvblwiO1xyXG5cclxuICAgIHN0YXRpYyBfX2luaXRfY2FsbGJhY2sgPSB1bmRlZmluZWQ7XHJcbiAgICBzdGF0aWMgbG9naW5fdXNlcl9pZCA9ICcnOyAvLyBvcHBv55m75b2V55So5oi3aWRcclxuXHJcbiAgICBzdGF0aWMgaGFzX2luaXRfcGFyYW0gPSBmYWxzZVxyXG4gICAgc3RhdGljIGhhc19sb2dpbl9jaGFubmVsID0gZmFsc2VcclxuXHJcbiAgICBzdGF0aWMgX19nYW1lX2luaXRfZGF0YSA9IHVuZGVmaW5lZFxyXG5cclxuICAgIHN0YXRpYyBfX2J1c2luZXNzX2NvbmZpZ19kYXRhID0ge307Ly/ov5DokKXphY3nva4s5pys5Zyw5ZWG5Lia5YyW6YWN572uXHJcbiAgICBzdGF0aWMgX2d1b2Jhb19pbml0X2NvbmZpZ19kYXRhID0gW10gIC8vIGd1b2Jhb+WIneWni+WMlumFjee9rlxyXG5cclxuICAgIHN0YXRpYyBfX2xvY2FsX2J1c2luZXNzX2NvbmZpZ19pbml0ZWQgPSBmYWxzZTtcclxuICAgIHN0YXRpYyBfX3JlbW90ZV9idXNpbmVzc19jb25maWdfaW5pdGVkID0gZmFsc2U7XHJcbiAgICBzdGF0aWMgcmVtb3RlX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gbnVsbC8v6L+c56uv6L+Q6JCl6YWN572u5pqC5a2YIFxyXG5cclxuICAgIHN0YXRpYyBvcmlnaW5hbF9tb2R1bGVfZGF0YSA9IG51bGwvLyDljp/nlJ/mqKHmnb/lub/lkYrlrp7kvotcclxuICAgIHN0YXRpYyBtQ3VzdG9tQUQgPSBudWxsIC8vIOWOn+eUn+aooeadv+W5v+WRiuWunuS+iyBvcHBvXHJcblxyXG4gICAgc3RhdGljIF9faXNfbmV3X3BsYXllciA9IGZhbHNlXHJcblxyXG4gICAgLy/lm57osIPmoIforrBcclxuICAgIHN0YXRpYyBpbml0X2NvbXBsZXRlZF90YWcgPSBmYWxzZVxyXG4gICAgc3RhdGljIHJlZnJlc2hfY29tcGxldGVkX3RhZyA9IGZhbHNlXHJcbiAgICAvL3Vp6aKE5Yi25L2T6YWN6KGo5L+h5oGvXHJcbiAgICBzdGF0aWMgX3VpX3ByZWZhYl9jb25maWdcclxuICAgIHN0YXRpYyBfX3VpX3ByZWZhYl9jb25maWdfcGF0aFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmiZPngrnliJ3lp4vljJblrozmiJDmoIforrBcclxuICAgICovXHJcbiAgICBzdGF0aWMgX19zdGF0X2luaXRlZCA9IGZhbHNlXHJcbiAgICAvKipcclxuICAgICAqIOaJk+eCueWIneWni+WMluWujOaIkOWQjjFz5omN6IO95omT6Ieq5a6a5LmJ5omT54K5XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBfX2lzX3N0YXRfZGVsYXkgPSBmYWxzZVxyXG4gICAgc3RhdGljIF9fc3RhdF9kYXRhX2NhY2hlID0gW11cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICogQHBhcmFtIGluaXRfY29uZmlnX3BhdGggc3l5eF9nYW1lX2luaXQuanNvbiDmnKzlnLDlnLDlnYBcclxuICAgICAqIEBwYXJhbSBpbml0X2NhbGxiYWNrIHN5eXhfZ2FtZV9pbml0Lmpzb27liqDovb3miJDlip/lm57osINcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluaXQoaW5pdF9jYWxsYmFjazogRnVuY3Rpb24pIHtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9fZ2FtZV9pbml0X2ZpbGVfcGF0aFxyXG4gICAgICAgIC8v5Yy65YiG5rig6YGTXHJcbiAgICAgICAgbGV0IGNoYW5uZWxfdHlwZVxyXG5cclxuICAgICAgICBpZiAod2luZG93WydxcSddKSB7XHJcbiAgICAgICAgICAgIGNoYW5uZWxfdHlwZSA9IGlnYy5lX2NoYW5uZWxfdHlwZS5xcVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh3aW5kb3dbXCJoYnNcIl0pIHtcclxuICAgICAgICAgICAgY2hhbm5lbF90eXBlID0gaWdjLmVfY2hhbm5lbF90eXBlLmh3X3FnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHdpbmRvd1tcInR0XCJdKSB7XHJcbiAgICAgICAgICAgIGNoYW5uZWxfdHlwZSA9IGlnYy5lX2NoYW5uZWxfdHlwZS50dFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAod2luZG93W1wicWdcIl0gJiYgIXdpbmRvd1tcImhic1wiXSkge1xyXG4gICAgICAgICAgICBsZXQgcWcgPSB3aW5kb3dbXCJxZ1wiXSBhcyBhbnlcclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gcWcuZ2V0UHJvdmlkZXIoKTtcclxuICAgICAgICAgICAgaWYgKHByb3ZpZGVyID09IFwiT1BQT1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFubmVsX3R5cGUgPSBpZ2MuZV9jaGFubmVsX3R5cGUub3Bwb19xZyAgLy8gMlxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3ZpZGVyID09IFwidml2b1wiKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFubmVsX3R5cGUgPSBpZ2MuZV9jaGFubmVsX3R5cGUudml2b19xZyAgLy8gNFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgICAgICBlbHNlIGlmICh3aW5kb3dbXCJ3eFwiXSkge1xyXG4gICAgICAgICAgICBjaGFubmVsX3R5cGUgPSBpZ2MuZV9jaGFubmVsX3R5cGUud3hcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAod2luZG93W1wibG9hZGluZ1ZpZXdcIl0pIHtcclxuICAgICAgICAgICAgY2hhbm5lbF90eXBlID0gaWdjLmVfY2hhbm5lbF90eXBlLmFwa1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoYW5uZWxfdHlwZSA9IGlnYy5lX2NoYW5uZWxfdHlwZS53ZWJcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInNkay0tLS0tY2hhbm5lbCB0eXBlIDEud2ViIDIub3BwbyA0LnZpdm8gNS5xcSA3LmFwayAgOC50dCAgMTA6aHdfcWcg77yaXCIsIGNoYW5uZWxfdHlwZSlcclxuXHJcbiAgICAgICAgc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID0gY2hhbm5lbF90eXBlXHJcblxyXG4gICAgICAgIC8v5YWI5Yqg6L295ri45oiP5Yid5aeL5YyW6YWN572u6KGoXHJcbiAgICAgICAgc3l5eF9zZGtfdXRpbHMubG9hZF9yZXNvdXJjZShwYXRoLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzZGstLS0tLXN5eXhfZ2FtZV9pbml0Lmpzb25cIiwgZGF0YSlcclxuICAgICAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfcHVibGlzaCA9PT0gZV9zeXl4X3Nka19wdWJsaXNoX3R5cGUub3V0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLm9wcG9fcWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X2NvbmZpZy5vcHBvX3FnLmFwcF9pZCA9IGRhdGEuc3l5eF9hcHBfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdF9jb25maWcub3Bwb19xZy5hcHBfdmVyc2lvbiA9IGRhdGEuY2hhbm5lbFtjaGFubmVsX3R5cGVdLmFwcF92ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRfY29uZmlnLm9wcG9fcWcucGtnX25hbWUgPSBkYXRhLmNoYW5uZWxbY2hhbm5lbF90eXBlXS5wa2dfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X2NvbmZpZy5vcHBvX3FnLnN0YXRfa2V5ID0gZGF0YS5zdGF0X2tleTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X2NvbmZpZy5vcHBvX3FnLmNvbmZpZ0FwcFNlY0tleSA9IGRhdGEuY29uZmlnX2tleTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDojrflj5ZvcHBv55So5oi3aWRcclxuICAgICAgICAgICAgICAgICAgICBzeXl4X2NvbnN0Lmd1b2Jhb19pbml0X2dhbWUgPSBzeXl4X2NvbnN0LmdhbWVfbmFtZV9vcHBvIC8vIG9wcG/muKDpgZPojrflj5bmuLjmiI/nvJbnoIHvvIzliJ3lp4vljJbkvb/nlKjvvIzojrflj5blub/lkYppZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dbXCJxZ1wiXSAmJiB3aW5kb3dbXCJxZ1wiXS5sb2dpbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBrZ05hbWU6IGluaXRfY29uZmlnLm9wcG9fcWcucGtnX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9naW5fdXNlcl9pZCA9IHJlcy51aWQgLy8gb3Bwby51aWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2dpbl91c2VyX2lkID0gJzQ0NDQ0NDQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLnZpdm9fcWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X2NvbmZpZy52aXZvX3FnLmFwcF9pZCA9IGRhdGEuc3l5eF9hcHBfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdF9jb25maWcudml2b19xZy5hcHBfdmVyc2lvbiA9IGRhdGEuY2hhbm5lbFtjaGFubmVsX3R5cGVdLmFwcF92ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRfY29uZmlnLnZpdm9fcWcucGtnX25hbWUgPSBkYXRhLmNoYW5uZWxbY2hhbm5lbF90eXBlXS5wa2dfbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X2NvbmZpZy52aXZvX3FnLnN0YXRfa2V5ID0gZGF0YS5zdGF0X2tleTtcclxuICAgICAgICAgICAgICAgICAgICBpbml0X2NvbmZpZy52aXZvX3FnLmNvbmZpZ0FwcFNlY0tleSA9IGRhdGEuY29uZmlnX2tleTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3l5eF9jb25zdC5ndW9iYW9faW5pdF9nYW1lID0gc3l5eF9jb25zdC5nYW1lX25hbWVfdml2byAvLyBvcHBv5rig6YGT6I635Y+W5ri45oiP57yW56CB77yM5Yid5aeL5YyW5L2/55SoXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+e9kemhteiwg+ivlVxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRfY29uZmlnLndlYi5hcHBfaWQgPSBkYXRhLnN5eXhfYXBwX2lkXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdF9jb25maWcud2ViLmFwcF92ZXJzaW9uID0gXCIxMjNcIlxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRfY29uZmlnLndlYi5wa2dfbmFtZSA9IFwiMTIzXCJcclxuICAgICAgICAgICAgICAgICAgICBpbml0X2NvbmZpZy53ZWIuc3RhdF9rZXkgPSBkYXRhLnN0YXRfa2V5XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdF9jb25maWcud2ViLmNvbmZpZ0FwcFNlY0tleSA9IGRhdGEuY29uZmlnX2tleVxyXG4gICAgICAgICAgICAgICAgICAgIHN5eXhfY29uc3QuZ3VvYmFvX2luaXRfZ2FtZSA9IHN5eXhfY29uc3QuZ2FtZV9uYW1lX29wcG8gLy8gd2Vi6buY6K6k55Sob3Bwb+eahOa4uOaIj+e8lueggVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN5eXhfY29uc3QuZ3VvYmFvX2luaXRfZ2FtZSA9IHN5eXhfY29uc3QuZ2FtZV9uYW1lX3Zpdm8gLy8gd2Vi6buY6K6k55Sodml2b+eahOa4uOaIj+e8lueggVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlnYy5pZ2NfbWFpbi5pbnN0YW5jZS5pbml0X3dyYXAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsLCBpbml0X2NvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYuX19zeXl4X2FwcF9pZCA9IGRhdGEuc3l5eF9hcHBfaWRcclxuICAgICAgICAgICAgc2VsZi5fX2dhbWVfaW5pdF9kYXRhID0gZGF0YVxyXG4gICAgICAgICAgICBzZWxmLl9fYnVzaW5lc3NfY29uZmlnX2ZpbGVfcGF0aCA9IGRhdGEuYnVzaW5lc3NfY29uZmlnX2ZpbGVfcGF0aFxyXG4gICAgICAgICAgICBzZWxmLl9fYWR2X2NvbmZpZ19maWxlX3BhdGggPSBkYXRhLmFkdl9jb25maWdfZmlsZV9wYXRoXHJcbiAgICAgICAgICAgIHNlbGYuX191aV9wcmVmYWJfY29uZmlnX3BhdGggPSBkYXRhLnVpX3ByZWZhYl9jb25maWdfcGF0aFxyXG5cclxuICAgICAgICAgICAgc2VsZi5fX2luaXRfY2FsbGJhY2sgPSBpbml0X2NhbGxiYWNrXHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5fX2luaXRfY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIC8vIOWIsOi/memHjOWPquaYr+WIneWni+WMluWujOaIkO+8jOWKoOi9veS6hi5qc29uXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYyAtLS0tLSBnYW1lX2luaXQuanNvbiBoYXMgbG9hZGVkXCIpXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9faW5pdF9jYWxsYmFjayh0cnVlLCB7IGJ1c2luZXNzX2NvbmZpZzogbnVsbCwgbG9hZF9pbml0X2NvbXBsZXRlOiB0cnVlLCBsb2FkX2xvY2FsX2NvbXBsZXRlOiBmYWxzZSwgbG9hZF9yZW1vdGVfY29tcGxldGU6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN5eXhfYXBpX3JlcXVlc3QuYXBpUG9zdCgnaW5pdCcsIHN5eXhfY29uc3QuZ3VvYmFvX2luaXRfYXBpVXJsLCB7Z2FtZTogc3l5eF9jb25zdC5ndW9iYW9faW5pdF9nYW1lfSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlcy0tLS0tLS0tLS0tLScsIHJlcylcclxuICAgICAgICAgICAgICAgIGlmKHJlcy5jID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9ndW9iYW9faW5pdF9jb25maWdfZGF0YSA9IHJlcy5kXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkcyA9IHNlbGYuX2d1b2Jhb19pbml0X2NvbmZpZ19kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBvZiBhZHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkudHlwZSA9PSBcIm9mZmljaWFsXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5hZElkTWFwLmhhcyhpLmtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkSWRNYXAuc2V0KGkua2V5LCB0ZW1wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWR2X2lkOiBpLmFkdl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnY19zdGF0dXM6IGkuZ2Nfc3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFkSWRNYXAuZ2V0KGkua2V5KS5wdXNoKEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2Rr5Yid5aeL5YyW5aSx6LSlLCDnlKjpu5jorqTnmoQnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkX2NvbmZpZygpOyAvLyDmnInkuoZndW9iYW9faW5pdF9jb25maWdfZGF0Ye+8jOWPr+S7peabv+aNouWFtuS4reeahOS4gOS6m+mFjee9rlxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9LCB0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRfYXBwX3ZlcnNpb24oKSB7XHJcbiAgICAgICAgbGV0IGNoYW5uZWxfdHlwZSA9IHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCArIFwiXCJcclxuICAgICAgICBsZXQgdmVyc2lvbiA9IFwiXCJcclxuICAgICAgICBpZiAodGhpcy5fX2dhbWVfaW5pdF9kYXRhICYmIHRoaXMuX19nYW1lX2luaXRfZGF0YS5jaGFubmVsW2NoYW5uZWxfdHlwZV0pIHtcclxuICAgICAgICAgICAgdmVyc2lvbiA9IHRoaXMuX19nYW1lX2luaXRfZGF0YS5jaGFubmVsW2NoYW5uZWxfdHlwZV0uYXBwX3ZlcnNpb25cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2ZXJzaW9uID0gXCIwLjAuMC4wXCJcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImlnYy0tLS0tIGNhbiBub3QgZmluZCBhcHBfdmVyc2lvbiBpbiBzeXl4X2dhbWVfaW5pdC5qc29uXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJpZ2MtLS0tLSBjaGFubmVsX3R5cGUgIFwiLCBjaGFubmVsX3R5cGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2ZXJzaW9uXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldF9zeXl4X2FwcF9pZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX3N5eXhfYXBwX2lkIHx8IFwiXCJcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgR2V0QnV0dG9uc0RhdGEoKSB7IC8vIGNw6I635Y+W5LiA5Lqb5oyJ6ZKu5byA5YWzXHJcbiAgICAgICAgbGV0IHJlc2RhdGEgPSBbXTtcclxuICAgICAgICBpZih0aGlzLl9ndW9iYW9faW5pdF9jb25maWdfZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIG9mIHRoaXMuX2d1b2Jhb19pbml0X2NvbmZpZ19kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaS50eXBlID09IFwiYnV0dG9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNkYXRhLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldF9pc19uZXdfcGxheWVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9faXNfbmV3X3BsYXllciB8fCAwXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldF91c2VyX2lkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fdXNlcl9pZCB8fCBcIlwiXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5znq6/phY3nva7lkozkupLmjqjphY3nva7ov5znq6/mi4nlj5blrozmr5VcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluaXRfcmVtb3RlX2NvbmZpZ19jb21wZWxldGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX19sb2NhbF9idXNpbmVzc19jb25maWdfaW5pdGVkID09IHRydWUgJiYgIXRoaXMuaW5pdF9jb21wbGV0ZWRfdGFnKSB7XHJcbiAgICAgICAgICAgIHN5eXhfYWR2X21hbmFnZXIubG9hZF9hZHZfY29uZmlnKClcclxuICAgICAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5pbml0X2ZpcnN0X2Jhbm5lcl9jZCgpXHJcbiAgICAgICAgICAgIHRoaXMuX19pbml0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9faW5pdF9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0X2NvbXBsZXRlZF90YWcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYyAtLS0tLSBsb2NhbCBkYXRhIGhhcyBiZWVuIGJhY2tcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuX19pbml0X2NhbGxiYWNrKHRydWUsIHsgYnVzaW5lc3NfY29uZmlnOiB0aGlzLl9fYnVzaW5lc3NfY29uZmlnX2RhdGEsIGxvYWRfaW5pdF9jb21wbGV0ZTogZmFsc2UsIGxvYWRfbG9jYWxfY29tcGxldGU6IHRydWUsIGxvYWRfcmVtb3RlX2NvbXBsZXRlOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX19yZW1vdGVfYnVzaW5lc3NfY29uZmlnX2luaXRlZCAmJiAhdGhpcy5yZWZyZXNoX2NvbXBsZXRlZF90YWcpIHtcclxuICAgICAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5sb2FkX2Fkdl9jb25maWcoKVxyXG4gICAgICAgICAgICBzeXl4X2Fkdl9tYW5hZ2VyLmluaXRfZmlyc3RfYmFubmVyX2NkKClcclxuICAgICAgICAgICAgdGhpcy5fX2luaXRlZCA9IHRydWVcclxuICAgICAgICAgICAgaWYgKHRoaXMuX19pbml0X2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hfY29tcGxldGVkX3RhZyA9IHRydWVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjIC0tLS0tIHJlbW90ZSBkYXRhIGhhcyBiZWVuIGJhY2tcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuX19pbml0X2NhbGxiYWNrKHRydWUsIHsgYnVzaW5lc3NfY29uZmlnOiB0aGlzLl9fYnVzaW5lc3NfY29uZmlnX2RhdGEsIGxvYWRfaW5pdF9jb21wbGV0ZTogZmFsc2UsIGxvYWRfbG9jYWxfY29tcGxldGU6IGZhbHNlLCBsb2FkX3JlbW90ZV9jb21wbGV0ZTogdHJ1ZSB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3nlKjmiLflkK/liqjmuLjmiI/nsbvlnosgIOaYr+WQpumAmui/h+WIhuS6q+i/m+WFpVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2hlY2tfdXNlcl9zdGFydF9nYW1lX3R5cGUoKSB7XHJcbiAgICAgICAgbGV0IGlzX29sZF9wbGF5ZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlzX29sZF9wbGF5ZXJcIilcclxuICAgICAgICB0aGlzLl9faXNfbmV3X3BsYXllciA9IGlzX29sZF9wbGF5ZXIgIT0gXCIxXCJcclxuICAgICAgICBpZiAoaXNfb2xkX3BsYXllciA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAvL+iAgeeOqeWutlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIG9sZCBiaXJkLS0tLS0tLS0tLS0tLS1cIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+aWsOeOqeWutlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIG5ldyBmaXNoLS0tLS0tLS0tLS0tLS1cIilcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpc19vbGRfcGxheWVyXCIsIFwiMVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS53ZWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0X2xhdW5jaF9vcHRpb25zX3N5bmMoKTtcclxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnF1ZXJ5LnR5cGUgPT0gaWdjLmVfc2hhcmVfdHlwZS5jYXJkIHx8IG9wdGlvbnMucXVlcnkudHlwZSA9PSBpZ2MuZV9zaGFyZV90eXBlLnJlY29yZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50X2lkID0gaXNfb2xkX3BsYXllciA9PSBcIjFcIiA/IGlnYy5lX3NoYXJlX2V2ZW50X2lkLm9sZF9wbGF5ZXIgOiBpZ2MuZV9zaGFyZV9ldmVudF9pZC5uZXdfcGxheWVyXHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNlbmRfdXNlcl9ldmVudChldmVudF9pZCwgaWdjLmVfc2hhcmVfZXZlbnRfdHlwZS5zaGFyZSwgMCwgMCwgb3B0aW9ucy5xdWVyeS50eXBlICsgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9cclxuICAgIC8qKuWmguaenOaYr+WklumDqOeZu+W9lSDov5nph4zkvKDlhaXkuIDkuIvotKblj7dpZOWSjOeUqOaIt2lk77yM6K6+572u5LqG5LmL5ZCO5bCx5Y+v5Lul6LCD55SoIOaJk+eCueS6hlxyXG4gICAgICogc3RhdF9tYW5hZ2VyIOaYr+WPquimgSDosIPnlKjkuoZzZGvnmoRpbml05ZCO77yM5LiN6ZyA6KaB562J5b6FaW5pdOeahGNhbGxiYWNr5bCx5Y+v5Lul5L2/55So5omT54K55LqGXHJcbiAgICAgKiBAcGFyYW0gYWNjb3VudCBcclxuICAgICAqIEBwYXJhbSB1c2VyX2lkIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdF9wYXJhbShhY2NvdW50LCB1c2VyX2lkKSB7XHJcbiAgICAgICAgaWYgKGFjY291bnQgPT0gXCJcIiB8fCBhY2NvdW50ID09IHVuZGVmaW5lZCB8fCB1c2VyX2lkID09IFwiXCIgfHwgdXNlcl9pZCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImlnYy0tLS0tIGluaXRfcGFyYW0gdXNlcl9pZCBpcyB1bmRlZmluZWQhXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzX2luaXRfcGFyYW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhhc19pbml0X3BhcmFtID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9fdXNlcl9pZCA9IHVzZXJfaWQgKyBcIlwiXHJcbiAgICAgICAgaWdjLnN0YXRfbWFuYWdlci5pbnN0YW5jZS5zZXRfdWlkKGFjY291bnQsIHVzZXJfaWQsIFwiMVwiKTtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy9zZGvph4zpnaLmiZPkuIDkuIvngrlcclxuXHJcbiAgICAgICAgbGV0IHNhdmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN5eXhfaWdjX3VpZFwiICsgaWdjLmlnY19tYWluLmluc3RhbmNlLmFwcF9jb25maWcuZ2FtZV9wYXJhbS5hcHBfaWQpO1xyXG4gICAgICAgIGlmIChzYXZlICYmIHNhdmUgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAvL+WPquaJk2xvZ2lu55qE54K5XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZF91c2VyX2xvZ2luKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/miZNyZWdpc3RlcueahOeCuVxyXG4gICAgICAgICAgICB0aGlzLnNlbmRfdXNlcl9yZWdpc3RlcigpO1xyXG4gICAgICAgICAgICAvL+aJk2xvZ2lu55qE54K5LOW7tui/n1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuc2VuZF91c2VyX2xvZ2luLCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3l5eF9pZ2NfdWlkXCIgKyBpZ2MuaWdjX21haW4uaW5zdGFuY2UuYXBwX2NvbmZpZy5nYW1lX3BhcmFtLmFwcF9pZCwgdXNlcl9pZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hlY2tfdXNlcl9zdGFydF9nYW1lX3R5cGUoKVxyXG4gICAgICAgIHRoaXMuc2V0X3N0YXRfaW5pdGVkKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWQr+WKqG9rXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc19pbml0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19pbml0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnlKjmiLfms6jlhoxcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNlbmRfdXNlcl9yZWdpc3RlcigpIHtcclxuICAgICAgICAvLyBpZ2Muc3RhdF9tYW5hZ2VyLmluc3RhbmNlLnNlbmRfdXNlcl9yZWdpc3RlcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDkuIrmiqXoh6rlrprkuYnkuovku7ZcclxuICAgICAgKi9cclxuICAgIHN0YXRpYyBzZW5kX3VzZXJfZXZlbnQoZXZlbnRfaWQ/LCBldmVudF90eXBlPywgcGxhY2VfaWQ/LCBwbGFjZV90eXBlPywgZXh0cmE/LCBzdHIxPywgc3RyMj8sIGV4dHJhMj8sIHN0cjM/KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9fc3RhdF9pbml0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fX3N0YXRfZGF0YV9jYWNoZS51bnNoaWZ0KHtcclxuICAgICAgICAgICAgICAgIFwiZXZlbnRfaWRcIjogZXZlbnRfaWQsXHJcbiAgICAgICAgICAgICAgICBcImV2ZW50X3R5cGVcIjogZXZlbnRfdHlwZSxcclxuICAgICAgICAgICAgICAgIFwicGxhY2VfaWRcIjogcGxhY2VfaWQsXHJcbiAgICAgICAgICAgICAgICBcInBsYWNlX3R5cGVcIjogcGxhY2VfdHlwZSxcclxuICAgICAgICAgICAgICAgIFwiZXh0cmFcIjogZXh0cmEsXHJcbiAgICAgICAgICAgICAgICBcInN0cjFcIjogc3RyMSxcclxuICAgICAgICAgICAgICAgIFwic3RyMlwiOiBzdHIyLFxyXG4gICAgICAgICAgICAgICAgXCJleHRyYTJcIjogZXh0cmEyLFxyXG4gICAgICAgICAgICAgICAgXCJzdHIzXCI6IHN0cjMsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5omT54K55pyq5Yid5aeL5YyW5a6M5oiQXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHNldF9zdGF0X2luaXRlZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX19pc19zdGF0X2RlbGF5KSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICB0aGlzLl9faXNfc3RhdF9kZWxheSA9IHRydWVcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9fc3RhdF9pbml0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmRfc3RhdF9ldmVudF9jYWNoZSgpXHJcbiAgICAgICAgICAgIH0sIDEwMDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6KGl5YWFIOaJk+eCueacquWIneWni+WMluWujOaIkOWJjeeahOaJk+eCuVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2VuZF9zdGF0X2V2ZW50X2NhY2hlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9fc3RhdF9kYXRhX2NhY2hlICYmIHRoaXMuX19zdGF0X2RhdGFfY2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAgICAgbGV0IHN0YXRfZGF0YSA9IHRoaXMuX19zdGF0X2RhdGFfY2FjaGUucG9wKClcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWxmLnNlbmRfc3RhdF9ldmVudF9jYWNoZSgpXHJcbiAgICAgICAgICAgIH0sIDEwMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5oyH5a6a57G75Z6L55qE6KeG5Zu+XHJcbiAgICAgKiBAcGFyYW0gdmlld1R5cGUgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlKHZpZXdUeXBlOiBzeXl4X3ZpZXcpIHtcclxuICAgICAgICB0aGlzLmxvYWRfdmlldyh2aWV3VHlwZSwgZnVuY3Rpb24gKHZpZXcpIHtcclxuICAgICAgICAgICAgdmlldy5oaWRlICYmIHZpZXcuaGlkZSgpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmjIflrprop4blm75cclxuICAgICAqIEBwYXJhbSB2aWV3VHlwZSDop4blm77nsbvlnotcclxuICAgICAqIEBwYXJhbSB6T3JkZXIgICAg5bGC57qnXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgICAgIOW9k+WJjeaJgOWcqOWcuuaZr+eahOWQjeWtlyAgICAgICAgICDov5DokKXkvb/nlKhcclxuICAgICAqIEBwYXJhbSBjaGFwdGVyICAg5b2T5YmN5omA5Zyo5YWz5Y2h5oiW6ICF546p5rOVaWQgICAgICDov5DokKXkvb/nlKhcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNob3codmlld1R5cGU6IHN5eXhfdmlldywgek9yZGVyID0gLTEsIHNjZW5lPzogc3RyaW5nLCBjaGFwdGVyID0gMCkge1xyXG4gICAgICAgIHRoaXMubG9hZF92aWV3KHZpZXdUeXBlLCBmdW5jdGlvbiAodmlldykge1xyXG4gICAgICAgICAgICB2aWV3LnNob3coek9yZGVyLCBzY2VuZSwgY2hhcHRlcilcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4iuaKpeeUqOaIt+eZu+W9lVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2VuZF91c2VyX2xvZ2luKCkge1xyXG4gICAgICAgIC8vIGlnYy5zdGF0X21hbmFnZXIuaW5zdGFuY2Uuc2VuZF91c2VyX2xvZ2luKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaLieWIsOWKn+iDvemFjee9rueahOWkhOeQhuWHveaVsCjov5znq6/mlbDmja7lrozlhajopobnm5YpXHJcbiAgICAqIEBwYXJhbSByZXQgIOaTjeS9nOe7k+aenFxyXG4gICAgKiBAcGFyYW0ga2V5ICDopoHmi4nlj5bnmoTphY3nva5rZXlcclxuICAgICogQHBhcmFtIHZlcnNpb24g6L+Z5Liq6YWN572u5pys5qyh55qE54mI5pys77yM5Y+v5Lul5pys5Zyw5L+d5a2Y77yM5LiL5qyh5ouJ5Y+W55qE5pe25YCZ5Lyg6L+Z5Liq5L+d5a2Y55qEdmVyc2lvbu+8jOWQjuWPsOavlOi+g+WmguaenHZlcnNpb27kuIDoh7TvvIzliJnkuI3kvJrov5Tlm57mlbDmja7vvIznlLHlrqLmiLfnq6/kvb/nlKjmnKzlnLDnvJPlrZhcclxuICAgICogQHBhcmFtIGRhdGEg6L+U5Zue55qE5pWw5o2uXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIG9uX2xvYWRfZ2FtZV9jb25maWdzKHJldCwga2V5LCB2ZXJzaW9uLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKHJldCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN5eXhfY29uc3QubG9jYWxfYnVzaW5lc3NfY29uZmlnX3ZlcnNpb24sIHZlcnNpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9fcmVtb3RlX2J1c2luZXNzX2NvbmZpZ19pbml0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0X3JlbW90ZV9jb25maWdfY29tcGVsZXRlKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vemFjee9rlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZF9jb25maWcoKSB7XHJcbiAgICAgICAgLy/liqDovb11aemihOWItuS9k+eahOmFjee9rlxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHN5eXhfc2RrX3V0aWxzLmxvYWRfcmVzb3VyY2Uoc3l5eF9tYW5hZ2VyLl9fdWlfcHJlZmFiX2NvbmZpZ19wYXRoLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBzZWxmLl91aV9wcmVmYWJfY29uZmlnID0gaWdjLmlnY19yZXNvdXJjZXNfdXRpbHMucGFyc2VfY3N2KGRhdGEsIFwiaWRcIik7IC8vIOi/memFjee9rueUqOS6huS4gOasoVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNkay0tLS0tdWkgcHJlZmFicyBoYXZlIGxvYWRlZFwiLCBzZWxmLl91aV9wcmVmYWJfY29uZmlnKSAgXHJcblxyXG4gICAgICAgICAgICBzZWxmLmxvYWRfYnVzaW5lc3NfY29uZmlnKClcclxuICAgICAgICAgICAgc3l5eF9jdHJfbWFuYWdlci5sb2FkX2N0cl9jb25maWcoKSAvLyDlt7Lnu4/mkJ7lrprvvIznlKjkuoZndW9iYW/mlbDmja5cclxuXHJcbiAgICAgICAgfSwgdGhpcywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tdWkgcHJlZmFicyBsb2FkaW5nIGZhaWxlZFwiKVxyXG4gICAgICAgICAgICBzZWxmLmxvYWRfYnVzaW5lc3NfY29uZmlnKClcclxuICAgICAgICAgICAgc3l5eF9jdHJfbWFuYWdlci5sb2FkX2N0cl9jb25maWcoKSAvLyDlt7Lnu4/mkJ7lrprvvIznlKjkuoZndW9iYW/mlbDmja5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295ZWG5Lia5YyW6YWN572uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX2J1c2luZXNzX2NvbmZpZygpIHtcclxuICAgICAgICBsZXQgYnVzaW5lc3NfZGF0YVxyXG4gICAgICAgIGxldCBjdXJfYnVzaW5lc3NfdmVyc2lvbiA9IHRoaXMuZ2V0X2FwcF92ZXJzaW9uKClcclxuICAgICAgICBsZXQga2V5ID0gdGhpcy5nZXRfc3l5eF9hcHBfaWQoKSArIHRoaXMuX19idXNpbmVzc192ZXJzaW9uXHJcblxyXG4gICAgICAgIC8v54mI5pys5Y+35LiN5LiA6Ie0IOS5i+WJjeeahOe8k+WtmOaVsOWAvOe9ruepulxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN5eXhfY29uc3QubG9jYWxfYnVzaW5lc3NfY29uZmlnX3ZlcnNpb24sIG51bGwpXHJcbiAgICAgICAgLy/liLfmlrDmnKzlnLDkv53lrZjnmoTov5znq6/phY3nva7niYjmnKzlj7dcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGN1cl9idXNpbmVzc192ZXJzaW9uKVxyXG5cclxuICAgICAgICB0aGlzLm9uX2xvYWRfbG9jYWxfYnVzaW5lc3NfY29uZmlnKCkgIC8vIOi/memHjOmdouaciSBpbml0X3JlbW90ZV9jb25maWdfY29tcGVsZXRlXHJcblxyXG4gICAgICAgIHRoaXMub25fbG9hZF9nYW1lX2NvbmZpZ3ModHJ1ZSwgJycsIDMsICcnKSAvLyDlsLHlgZrkuobkuIDkupvkv53lrZjnvJPlrZhcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS4gOS4qmJhbm5lcuW5v+WRilxyXG4gICAgICogQHBhcmFtIHZpZXdUeXBlIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlX25hdGl2ZV9iYW5uZXIoY2FsbF9iYWNrPykge1xyXG4gICAgICAgIGlmICghc3l5eF9hZHZfbWFuYWdlci5fX2Fkdl9jb25maWdfaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZV92aWV3KHN5eXhfdmlldy5uYXRpdmVfYmFubmVyLCBjYWxsX2JhY2spXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrnu5Pnrpfljp/nlJ9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZV9pbm5lcl9pbnRlcnN0aXRpYWwoY2FsbF9iYWNrPykge1xyXG4gICAgICAgIGlmICghc3l5eF9hZHZfbWFuYWdlci5fX2Fkdl9jb25maWdfaW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZV92aWV3KHN5eXhfdmlldy5pbm5lcl9pbnRlcnN0aXRpYWwsIGNhbGxfYmFjaylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuS4gOS4que7k+eul+WOn+eUny0g5Y6f55SfYmFubmVyXHJcbiAgICAgKi9cclxuICAgICAgICBzdGF0aWMgY3JlYXRlX2lubmVyX2ludGVyc3RpdGlhbF9ibihjYWxsX2JhY2s/KSB7XHJcbiAgICAgICAgaWYgKCFzeXl4X2Fkdl9tYW5hZ2VyLl9fYWR2X2NvbmZpZ19pbml0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlX3ZpZXcoc3l5eF92aWV3LmlubmVyX2ludGVyc3RpdGlhbF9ibiwgY2FsbF9iYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDliJvlu7rkuIDkuKrpnIDopoHpga7nvannmoTmj5LlsY9cclxuICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlX2ludGVyc3RpdGlhbChjYWxsX2JhY2s/KSB7XHJcbiAgICAgICAgaWYgKCFzeXl4X2Fkdl9tYW5hZ2VyLl9fYWR2X2NvbmZpZ19pbml0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlX3ZpZXcoc3l5eF92aWV3LmludGVyc3RpdGlhbCwgY2FsbF9iYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDliJvlu7rkuIDkuKrpnIDopoHpga7nvannmoTmj5LlsY9cclxuICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlX25hdGl2ZV9pY29uKGNhbGxfYmFjaz8pIHtcclxuICAgICAgICBpZiAoIXN5eXhfYWR2X21hbmFnZXIuX19hZHZfY29uZmlnX2luaXRlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIGFkIGluaXRpYWxpemF0aW9uIGlzIG5vdCBhY2hpZXZlLS0tPmRvIG5vdCBjYWxsIGludGVyZmFjZSB0b28gZWFybHkgIDpjcmVhdGVfbmF0aXZlX2ljb25cIilcclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlX3ZpZXcoc3l5eF92aWV3Lm5hdGl2ZV9pY29uLCBjYWxsX2JhY2spXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWIm+W7uuS4gOS4qnRpcHNcclxuICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlX3RvYXN0KGRlc2MpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZV92aWV3KHN5eXhfdmlldy50b2FzdCwgZnVuY3Rpb24gKHZpZXcpIHtcclxuICAgICAgICAgICAgdmlldyAmJiB2aWV3LnNob3cgJiYgdmlldy5zaG93KGRlc2MpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS9v+eUqOagt+W8j+WIm+W7uuinhuWbvlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlX3ZpZXcodmlld1R5cGU6IHN5eXhfdmlldywgY2FsbF9iYWNrPyk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5sb2FkX3ZpZXcodmlld1R5cGUsIGNhbGxfYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7nsbvlnovojrflj5bop4blm77lr7nosaFcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRfdmlldyh2aWV3VHlwZTogc3l5eF92aWV3LCBjYWxsX2JhY2s/KSB7XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIkxheWFcIl0pIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3l5eF9jY191aV9tYW5hZ2VyLmxvYWRfdWlfcHJlZmFicyh2aWV3VHlwZSwgY2FsbF9iYWNrKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0X2J1c2luZXNzX2NvbmZpZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX19sb2NhbF9idXNpbmVzc19jb25maWdfaW5pdGVkICYmICF0aGlzLl9fcmVtb3RlX2J1c2luZXNzX2NvbmZpZ19pbml0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fX2J1c2luZXNzX2NvbmZpZ19kYXRhXHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8v5rig6YGT5bCB6KOFXHJcblxyXG4gICAgLy/muKDpgZPnmbvlvZVcclxuICAgIHN0YXRpYyBfX3VzZXJfaWQgPSBcIlwiXHJcbiAgICBzdGF0aWMgbG9naW5fY2hhbm5lbChjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGlmICh0aGlzLmhhc19sb2dpbl9jaGFubmVsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oYXNfbG9naW5fY2hhbm5lbCA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgaWdjLmlnY19tYWluLmluc3RhbmNlLm9ubHlfbG9naW5fY2hhbm5lbChmdW5jdGlvbiBiYWNrKHJlcykge1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5jaGFubmVsX3VzZXJfaW5mbyAmJiByZXMuY2hhbm5lbF91c2VyX2luZm8udWlkKSB7XHJcbiAgICAgICAgICAgICAgICAvL3Nka+mHjOmdouaJk+S4gOS4i+eCuVxyXG4gICAgICAgICAgICAgICAgbGV0IHNhdmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN5eXhfaWdjX3VpZFwiICsgaWdjLmlnY19tYWluLmluc3RhbmNlLmFwcF9jb25maWcuZ2FtZV9wYXJhbS5hcHBfaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhdmUgJiYgc2F2ZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lj6rmiZNsb2dpbueahOeCuVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGYuc2VuZF91c2VyX2xvZ2luKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5omTcmVnaXN0ZXLnmoTngrlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbmRfdXNlcl9yZWdpc3RlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5omTbG9naW7nmoTngrlcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHNlbGYuc2VuZF91c2VyX2xvZ2luLCAxMDAwKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9fdXNlcl9pZCA9IHJlcy5jaGFubmVsX3VzZXJfaW5mby51aWRcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInN5eXhfaWdjX3VpZFwiICsgaWdjLmlnY19tYWluLmluc3RhbmNlLmFwcF9jb25maWcuZ2FtZV9wYXJhbS5hcHBfaWQsIHJlcy5jaGFubmVsX3VzZXJfaW5mby51aWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5jaGVja191c2VyX3N0YXJ0X2dhbWVfdHlwZSgpXHJcbiAgICAgICAgICAgIHNlbGYuc2V0X3N0YXRfaW5pdGVkKClcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6L+Q6JCl6YWN572u5a+55bqUa2V555qE5YC8XHJcbiAgICAgKiBAcGFyYW0ga2V5IGJ1c2luZXNzX2NvbmZpZyDnmoQgaWTlgLxcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldF9idXNpbmVzc19kYXRhX2J5X2tleShrZXkpIHtcclxuICAgICAgICBsZXQgYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgaWYgKGJ1c2luZXNzX2NvbmZpZ19kYXRhICYmIGJ1c2luZXNzX2NvbmZpZ19kYXRhW2tleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1c2luZXNzX2NvbmZpZ19kYXRhW2tleV0udmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bGV56S65bm/5ZGK77yMXHJcbiAgICAgKiBAcGFyYW0gYWRfdHlwZSDlub/lkYrnsbvlnosg5qC55o2uIGlnYy5lX2FkX3R5cGUg5Lyg5YWlXHJcbiAgICAgKiAgaW50ZXJzdGl0aWFsID0gMSwgICDmj5LlsY9cclxuICAgICAgICB2aWRlbyA9IDIsICAgICAgICAgIOinhumikVxyXG4gICAgICAgIG5hdGl2ZSA9IDMsICAgICAgICAg5Y6f55SfXHJcbiAgICAgICAgYmFubmVyID0gNCwgICAgICAgICBiYW5uZXJcclxuICAgICAqIEBwYXJhbSBhZF9wb3NfaWQgICAgIOmFjee9ruihqOW5v+WRiklEXHJcbiAgICAgKiBAcGFyYW0gb25Mb2FkICAgIOW5v+WRiuWKoOi9veaIkOWKnyBcclxuICAgICAqIDHvvJrop4bpopHliqDovb3miJDlip/pgJrov4fmraTmjqXlj6Pov5Tlm57kv6Hmga/vvIzmuLjmiI/lj6/lgZrkuIDkupvnm7jlupTpgLvovpHlpITnkIbvvIzmr5TlpoLlgZzmraLpn7PkuZBcclxuICAgICAqIDLvvJrljp/nlJ/pgJrov4fmraTmjqXlj6Pov5Tlm57kv6Hmga9cclxuICAgICAqIG9uTG9hZDogZnVuY3Rpb24gKHBhcmFtLCByZXMpIHtcclxuICAgICAqICAgICAgLy/ljp/nlJ/lub/lkYrov5Tlm57kv6Hmga/vvJpyZXMg5piv5LiA5LiqbGlzdCDkvb/nlKhsaXN06YeM55qE56ys5LiA5Liq5Y2z5Y+vIOWmguaenGxpc3TkuLrnqbog5oiWIOmVv+W6puS4uumbtu+8jOWImeS7o+ihqOayoeacieaLieWPluWIsOaVsOaNrlxyXG4gICAgICogICAgICBsZXQgbmF0aXZlX2RhdGEgPSByZXNbMF1cclxuICAgICAqICAgICAgbmF0aXZlX2RhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBhZFVuaXRJZDog5q2k5Y6f55Sf5bm/5ZGK6LWE5rqQ55qE5a2QaWTvvIzkuIrmiqXmm53lhYnlkozngrnlh7vkvb/nlKhcclxuICAgICAgICAgICAgICAgIHRpdGxlOiDlub/lkYrmoIfpopgsXHJcbiAgICAgICAgICAgICAgICBkZXNjOuW5v+WRiuaPj+i/sCxcclxuICAgICAgICAgICAgICAgIC8vaWNvblxyXG4gICAgICAgICAgICAgICAgaWNvblVybExpc3Q6Ly8g54mI5pys5YW85a65LCDlsI/lm75JQ09OXHJcbiAgICAgICAgICAgICAgICBpY29uOiDlsI/lm75JQ09OLFxyXG4gICAgICAgICAgICAgICAgaW1nVXJsTGlzdDog5aSn5Zu+SUNPTiwg55uu5YmN5LiA6Iis6YO955So6L+Z5LiqXHJcbiAgICAgICAgICAgICAgICBsb2dvVXJsOiDnm67liY3mi7znlYzpnaLmsqHnlKjliLAsXHJcbiAgICAgICAgICAgICAgICBjbGlja0J0blR4dDrnm67liY3mi7znlYzpnaLmsqHnlKjliLAsXHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0aXZlVHlwZVxyXG4gICAgICAgICAgICAgICAgY3JlYXRpdmVUeXBlOiDnm67liY3mi7znlYzpnaLmsqHnlKjliLAsXHJcbiAgICAgICAgICAgICAgICBpbnRlcmFjdGlvblR5cGU655uu5YmN5ou855WM6Z2i5rKh55So5YiwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAqIH1cclxuICAgICAqIEBwYXJhbSBvblNob3cgIOW5v+WRiuaYvuekuuWHuuadpeS6hlxyXG4gICAgICogMTpiYW5uZXIg5pi+56S65Ye65p2lIOacieWbnuiwg1xyXG4gICAgICogMjrmj5LlsY8g5pi+56S65Ye65p2lIOacieWbnuiwg1xyXG4gICAgICog5YW25LuW5bm/5ZGK57G75Z6L5aaC5p6c5pyJ5Zue6LCDIOaYr+WxnuS6juahhuaetuS8qumAoO+8jOeci+WcuuaZr+iAg+iZkeaYr+WQpuS9v+eUqFxyXG4gICAgICogb25TaG93OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgKiB9XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvbkNsb3NlIOWFs+mXreeahOWbnuiwg1xyXG4gICAgICogMe+8mmJhbm5lciDlpoLmnpzmnIlvbkNsb3Nl55qE6L+U5Zue77yM5YiZ5Luj6KGo55So5oi35YWz6ZetYmFubmVyIOatpOWKn+iDvW9wcG/pnIDopoFcclxuICAgICAqIDI6IOaPkuWxj+WFs+mXrVxyXG4gICAgICogMzog5Y6f55Sf5peg5q2k5Zue6LCDXHJcbiAgICAgKiA077ya6KeG6aKRIOWIpOaWrSByZXMuaXNFbmRlZCDkuLp0cnVl5YiZ5Luj6KGo6KeG6aKR55yL5a6M77yM5Li6ZmFsc2XliJnku6Pooajop4bpopHmsqHnnIvlroxcclxuICAgICAqIG9uQ2xvc2U6IGZ1bmN0aW9uIChwYXJhbSwgcmVzKXtcclxuICAgICAqIH1cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG9uRXJyb3IgOiDmiqXplJlcclxuICAgICAqIOaKpemUme+8jOaIluaXoOW5v+WRiuWImeatpOaOpeWPo+Wbnuiwg++8jOWQhOW5v+WRiuexu+Wei+mDveacieatpOWbnuiwg++8jOavlOWmguinhumikeacieatpOWbnuiwg++8jOWImeWPr+W8uXRpcHMg55uu5YmN5peg5bm/5ZGKXHJcbiAgICAgKiBlcnLkuLrmiqXplJnkv6Hmga8g5Y+vIEpTT04uc3RyaW5naWZ5KGVycikg5omT5Y2w6LCD6K+VXHJcbiAgICAgKiBvbkVycm9yIDogZnVuY3Rpb24gKHBhcmFtLCBlcnIpIHtcclxuICAgICAqIFxyXG4gICAgICogfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlX2FkKGFkX3R5cGU6IGlnYy5lX2FkX3R5cGUsIGFkX3Bvc19pZDogc3RyaW5nLCBvbkxvYWQ6IEZ1bmN0aW9uLCBvblNob3c6IEZ1bmN0aW9uLCBvbkNsb3NlOiBGdW5jdGlvbiwgb25FcnJvcjogRnVuY3Rpb24sIHN1Yl9hZF90eXBlPzogYW55KSB7XHJcblxyXG4gICAgICAgIGxldCBhZF9pZCA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2NoYW5uZWxfYWRfaWQoYWRfcG9zX2lkKVxyXG5cclxuICAgICAgICBpZiAoIWFkX2lkKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2RrLS0tLS0gc3l5eF9tYW5hZ2VyIGNyZWF0ZV9hZCBhZF9pZCBubyBjb25maWd1cmUgaW4gYWR2LmNzdlwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgYWRfdHlwZTogYWRfdHlwZSxcclxuICAgICAgICAgICAgYWRfaWQ6IGFkX2lkLFxyXG4gICAgICAgICAgICBhZF9wb3NfaWQ6IGFkX3Bvc19pZCxcclxuICAgICAgICAgICAgYWRfZXZlbnQ6IGFkX2lkLCAgLy/lj6rmmK/loavlhYVcclxuICAgICAgICAgICAgYWRfc2NlbmU6IGFkX2lkLFxyXG4gICAgICAgICAgICB0b3Bfb2Zmc2V0OiAwLC8v5omLcWJhbm5lciDkuIrnp7vot53nprtcclxuICAgICAgICAgICAgc3ViX2FkX3R5cGU6IHN1Yl9hZF90eXBlIHx8IGlnYy5lX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9iYW5uZXJfbm9ybWFsLFxyXG4gICAgICAgICAgICBvbkxvYWQ6IG9uTG9hZCxcclxuICAgICAgICAgICAgb25TaG93OiBvblNob3csXHJcbiAgICAgICAgICAgIG9uQ2xvc2U6IG9uQ2xvc2UsXHJcbiAgICAgICAgICAgIG9uRXJyb3I6IG9uRXJyb3JcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UuY3JlYXRlX2FkKHBhcmFtKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjcmVhdGVfaGVuZ19mdV9hZChhZF90eXBlOiBpZ2MuZV9hZF90eXBlLCBhZF9wb3NfaWQ6IHN0cmluZywgb25Mb2FkOiBGdW5jdGlvbiwgb25TaG93OiBGdW5jdGlvbiwgb25DbG9zZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uLCBzdWJfYWRfdHlwZT86IGFueSkge1xyXG5cclxuICAgICAgICBsZXQgYWRfaWQgPSBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9jaGFubmVsX2FkX2lkKGFkX3Bvc19pZClcclxuICAgICAgICBpZiAoIWFkX2lkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB2aXZv5qiq5bmF5byA5YWzXHJcbiAgICAgICAgaWYodGhpcy5fX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX19idXNpbmVzc19jb25maWdfZGF0YVtcInZpdm9faGVuZ2Z1X3N3aXRjaFwiXSkgeyBcclxuICAgICAgICAgICAgaWYgKHRoaXMuX19idXNpbmVzc19jb25maWdfZGF0YVtcInZpdm9faGVuZ2Z1X3N3aXRjaFwiXS52YWx1ZVswXSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIC8vIOe7k+eul+mhteOAgea4uOaIj+W8gOWni+mhteetiemAguWQiOWxleekuueahOWcuuaZr+iwg+eUqFxyXG4gICAgICAgIGlmICh3aW5kb3dbJ3FnJ10uZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybVZlcnNpb25Db2RlID49IDEwOTIpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBib3hCYW5uZXJBZCA9IG51bGxcclxuICAgICAgICAgICAgYm94QmFubmVyQWQgPSB3aW5kb3dbJ3FnJ10uY3JlYXRlQm94QmFubmVyQWQoe1xyXG4gICAgICAgICAgICAgICAgcG9zSWQ6IGFkX2lkXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGJveEJhbm5lckFkLm9uTG9hZChmdW5jdGlvbiAoKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkupLmjqjnm5LlrZDmqKrluYXlub/lkYrliqDovb3miJDlip9cIikgXHJcbiAgICAgICAgICAgICAgICBvbkxvYWQgJiYgb25Mb2FkKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGJveEJhbm5lckFkLm9uRXJyb3IoZnVuY3Rpb24gKGVycikgeyBcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi55uS5a2Q5qiq5bmF5bm/5ZGK5Yqg6L295aSx6LSlXCIsIGVycikgXHJcbiAgICAgICAgICAgICAgICAvLyBzeXl4X21hbmFnZXIuY3JlYXRlX3RvYXN0KEpTT04uc3RyaW5naWZ5KGVycikpXHJcbiAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8g5bm/5ZGK5pWw5o2u5Yqg6L295oiQ5Yqf5ZCO5bGV56S6XHJcbiAgICAgICAgICAgIGJveEJhbm5lckFkLnNob3coKS50aGVuKGZ1bmN0aW9uICgpIHsgXHJcbiAgICAgICAgICAgICAgICBvblNob3cgJiYgb25TaG93KCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgc2VsZi5ib3hCYW5uZXJBZF92aXZvID0gYm94QmFubmVyQWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aaguS4jeaUr+aMgeS6kuaOqOebkuWtkOebuOWFsyBBUEknKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhpZGVfYm94QmFubmVyQWRfdml2bygpIHtcclxuICAgICAgICBsZXQgYm94QmFubmVyQWRfdml2b19pbnN0YW5jZSA9IHRoaXMuYm94QmFubmVyQWRfdml2b1xyXG4gICAgICAgIGlmKGJveEJhbm5lckFkX3Zpdm9faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgYm94QmFubmVyQWRfdml2b19pbnN0YW5jZS5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhpZGVfZ2FtZV9wb3J0YWxfYm94X3Zpdm8oKSB7IFxyXG4gICAgICAgIGxldCBnYW1lX3BvcnRhbF9ib3hfdml2b19pbnN0YW5jZSA9IHRoaXMuZ2FtZV9wb3J0YWxfYm94X3Zpdm9cclxuICAgICAgICBpZihnYW1lX3BvcnRhbF9ib3hfdml2b19pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICBnYW1lX3BvcnRhbF9ib3hfdml2b19pbnN0YW5jZS5pc0Rlc3Ryb3llZCA9IHRydWVcclxuICAgICAgICAgICAgZ2FtZV9wb3J0YWxfYm94X3Zpdm9faW5zdGFuY2UuZGVzdHJveSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65bm/5ZGKICDlkITlj4LmlbDmhI/kuYnlkoxjcmVhdGVfYWTnm7jlkIxcclxuICAgICAqIEBwYXJhbSBhZF90eXBlIFxyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCBcclxuICAgICAqIEBwYXJhbSBvbkxvYWQgXHJcbiAgICAgKiBAcGFyYW0gb25TaG93IFxyXG4gICAgICogQHBhcmFtIG9uQ2xvc2UgXHJcbiAgICAgKiBAcGFyYW0gb25FcnJvciBcclxuICAgICAqIEBwYXJhbSBzdWJfYWRfdHlwZSBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNob3dfYWQoYWRfdHlwZTogaWdjLmVfYWRfdHlwZSwgYWRfcG9zX2lkOiBzdHJpbmcsIG9uTG9hZDogRnVuY3Rpb24sIG9uU2hvdzogRnVuY3Rpb24sIG9uQ2xvc2U6IEZ1bmN0aW9uLCBvbkVycm9yOiBGdW5jdGlvbiwgc3ViX2FkX3R5cGU/OiBhbnkpIHtcclxuICAgICAgICBsZXQgYWRfaWQgPSBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9jaGFubmVsX2FkX2lkKGFkX3Bvc19pZClcclxuICAgICAgICBpZiAoIWFkX2lkIHx8IGFkX2lkID09IFwiMVwiIHx8IGFkX2lkID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gc3l5eF9tYW5hZ2VyIHNob3dfYWQgYWRfaWQgbm8gY29uZmlndXJlIGluIGFkdi5jc3ZcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgYWRfdHlwZTogYWRfdHlwZSxcclxuICAgICAgICAgICAgYWRfaWQ6IGFkX2lkLFxyXG4gICAgICAgICAgICBhZF9wb3NfaWQ6IGFkX3Bvc19pZCxcclxuICAgICAgICAgICAgYWRfZXZlbnQ6IGFkX2lkLCAgLy/lj6rmmK/loavlhYVcclxuICAgICAgICAgICAgYWRfc2NlbmU6IGFkX2lkLFxyXG4gICAgICAgICAgICBzdWJfYWRfdHlwZTogc3ViX2FkX3R5cGUgfHwgaWdjLmVfYWRfbmF0aXZlX3R5cGUubmF0aXZlX2Jhbm5lcl9ub3JtYWwsXHJcbiAgICAgICAgICAgIG9uTG9hZDogb25Mb2FkLFxyXG4gICAgICAgICAgICBvblNob3c6IG9uU2hvdyxcclxuICAgICAgICAgICAgb25DbG9zZTogb25DbG9zZSxcclxuICAgICAgICAgICAgb25FcnJvcjogb25FcnJvclxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGlnYy5pZ2NfbWFpbi5pbnN0YW5jZS5zaG93X2FkKHBhcmFtKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+B5bm/5ZGKIOS4u+imgeS5n+WwseaYryBiYW5uZXIg5L2/55So5LqGIOS4gOiIrOebruWJjU9wcG/lkox2aXZv6ZqQ6JePYmFubmVyIOS5n+WwseaYr+iwg+eUqGRlc3Ryb3nkuoYgXHJcbiAgICAgKiBAcGFyYW0gYWRfdHlwZSDlub/lkYrnsbvlnosg5qC55o2uIGlnYy5lX2FkX3R5cGUg5Lyg5YWlXHJcbiAgICAgKiAgaW50ZXJzdGl0aWFsID0gMSwgICDmj5LlsY9cclxuICAgICAgICB2aWRlbyA9IDIsICAgICAgICAgIOinhumikVxyXG4gICAgICAgIG5hdGl2ZSA9IDMsICAgICAgICAg5Y6f55SfXHJcbiAgICAgICAgYmFubmVyID0gNCwgICAgICAgICBiYW5uZXJcclxuICAgICAqIEBwYXJhbSBhZF9wb3NfaWQgICAgIOmFjee9ruihqOW5v+WRiklEXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkZXN0cm95X2FkKGFkX3R5cGU6IGlnYy5lX2FkX3R5cGUsIGFkX3Bvc19pZDogc3RyaW5nLCBzdWJfYWRfdHlwZT86IGFueSkge1xyXG4gICAgICAgIGxldCBhZF9pZCA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2NoYW5uZWxfYWRfaWQoYWRfcG9zX2lkKVxyXG4gICAgICAgIGlmICghYWRfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgYWRfdHlwZTogYWRfdHlwZSxcclxuICAgICAgICAgICAgYWRfaWQ6IGFkX2lkLFxyXG4gICAgICAgICAgICBhZF9wb3NfaWQ6IGFkX3Bvc19pZCxcclxuICAgICAgICAgICAgc3ViX2FkX3R5cGU6IHN1Yl9hZF90eXBlIHx8IGlnYy5lX2FkX25hdGl2ZV90eXBlLm5hdGl2ZV9iYW5uZXJfbm9ybWFsLFxyXG4gICAgICAgICAgICBhZF9ldmVudDogYWRfaWQsXHJcbiAgICAgICAgICAgIGFkX3NjZW5lOiBhZF9pZCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UuZGVzdHJveV9hZChwYXJhbSlcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgc3RhdGljIHNob3dfYWQocGFyYW0pIHtcclxuICAgICAgICByZXR1cm4gaWdjLmlnY19tYWluLmluc3RhbmNlLnNob3dfYWQocGFyYW0pXHJcbiAgICB9XHJcbiAgICAqL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5bm/5ZGKIOS4u+imgeS5n+WwseaYryBiYW5uZXIg55uu5YmN5Lmf5LiN5oCO5LmI5L2/55So5LqGXHJcbiAgICAgKiBAcGFyYW0gYWRfdHlwZSDlub/lkYrnsbvlnosg5qC55o2uIGlnYy5lX2FkX3R5cGUg5Lyg5YWlXHJcbiAgICAgKiAgaW50ZXJzdGl0aWFsID0gMSwgICDmj5LlsY9cclxuICAgICAgICB2aWRlbyA9IDIsICAgICAgICAgIOinhumikVxyXG4gICAgICAgIG5hdGl2ZSA9IDMsICAgICAgICAg5Y6f55SfXHJcbiAgICAgICAgYmFubmVyID0gNCwgICAgICAgICBiYW5uZXJcclxuICAgICAqIEBwYXJhbSBhZF9wb3NfaWQgICAgIOmFjee9ruihqOW5v+WRiuS9jUlEXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlX2FkKGFkX3R5cGU6IGlnYy5lX2FkX3R5cGUsIGFkX3Bvc19pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGFkX2lkID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfY2hhbm5lbF9hZF9pZChhZF9wb3NfaWQpXHJcbiAgICAgICAgaWYgKCFhZF9pZCB8fCBhZF9pZCA9PSBcIjFcIiB8fCBhZF9pZCA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHN5eXhfbWFuYWdlciBoaWRlX2FkIGFkX2lkIG5vIGNvbmZpZ3VyZSBpbiBhZHYuY3N2XCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGFkX3R5cGU6IGFkX3R5cGUsXHJcbiAgICAgICAgICAgIGFkX2lkOiBhZF9pZCxcclxuICAgICAgICAgICAgYWRfcG9zX2lkOiBhZF9wb3NfaWQsXHJcbiAgICAgICAgICAgIGFkX2V2ZW50OiBhZF9pZCxcclxuICAgICAgICAgICAgYWRfc2NlbmU6IGFkX2lkLFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaWdjLmlnY19tYWluLmluc3RhbmNlLmhpZGVfYWQocGFyYW0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5Pnrpfljp/nlJ/igJTigJTigJTigJTkuIrmiqXngrnlh7tcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlcG9ydF9uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsX2NsaWNrKGFkX3Bvc19pZCkge1xyXG4gICAgICAgIGlmICghYWRfYmFubmVyLmNhbl9zaG93X2ZpcnN0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gaXMgaW4gb3BwbyBmaXJzdCBhZCBjZCBcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmF0aXZlX2RhdGEgPSB0aGlzLmdldF9sb2NhbF9uYXRpdmVfZGF0YShhZF9wb3NfaWQpXHJcbiAgICAgICAgdGhpcy5jcmVhdGVfaW5uZXJfaW50ZXJzdGl0aWFsKGZ1bmN0aW9uICh2aWV3KSB7XHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmlldy5yZXBvcnRfY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP57uT566X5Y6f55SfXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICB0aGlzLmxvYWRfdmlldyhzeXl4X3ZpZXcuaW5uZXJfaW50ZXJzdGl0aWFsLCBmdW5jdGlvbiAodmlldykgeyBcclxuICAgICAgICAgICAgaWYgKHZpZXcubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuaGlkZSAmJiB2aWV3LmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5Y6f55SfYmFubmVyXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVfbmF0aXZlX2Jhbm5lcigpIHtcclxuICAgICAgICB0aGlzLmxvYWRfdmlldyhzeXl4X3ZpZXcuaW5uZXJfaW50ZXJzdGl0aWFsX2JuLCBmdW5jdGlvbiAodmlldykgeyBcclxuICAgICAgICAgICAgaWYgKHZpZXcubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuaGlkZSAmJiB2aWV3LmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5L2/55Sob3Bwb+eahOS6kuaOqOebkuWtkFxyXG4gICAgICog5b+r5bqU55So54mI5pys5Y+35aSn5LqO562J5LqOMTA3NuWImeWPr+S7peS9v+eUqOS6kuaOqOebkuWtkFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc3VwcG9ydF9nYW1lX2JveCgpIHtcclxuICAgICAgICBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUub3Bwb19xZykge1xyXG4gICAgICAgICAgICBsZXQgc3lzdGVtaW5mbyA9IHN5eXhfbWFuYWdlci5nZXRfc3lzdGVtX2luZm9fc3luYygpXHJcbiAgICAgICAgICAgIGlmIChzeXN0ZW1pbmZvICYmIHN5c3RlbWluZm8ucGxhdGZvcm1WZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3lzdGVtaW5mby5wbGF0Zm9ybVZlcnNpb24gPj0gMTA3NlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55Sf5bm/5ZGKIOS4iuaKpeabneWFiVxyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCDphY3nva7ooajlub/lkYrkvY1JRFxyXG4gICAgICogQHBhcmFtIG5hdGl2ZV9kYXRhIOWOn+eUn+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVwb3J0X2FkX3Nob3coYWRfcG9zX2lkOiBzdHJpbmcsIG5hdGl2ZV9kYXRhPykge1xyXG4gICAgICAgIHJldHVybiBzeXl4X2Fkdl9tYW5hZ2VyLnJlcG9ydF9hZF9zaG93KGFkX3Bvc19pZCwgbmF0aXZlX2RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55Sf5bm/5ZGKICDkuIrmiqXngrnlh7tcclxuICAgICAqIEBwYXJhbSBhZF9wb3NfaWQg6YWN572u6KGo5bm/5ZGK5L2NSURcclxuICAgICAqIEBwYXJhbSBhZF91bml0X2lkIGNyZWF0ZV9hZOeahG9ubG9hZOi/lOWbnueahOWOn+eUn+W5v+WRiuS/oeaBr+mHjOmdoueahGFkVW5pdElkIOi/meS4quWNleS9jUlEXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXBvcnRfYWRfY2xpY2soYWRfcG9zX2lkOiBzdHJpbmcsIG5hdGl2ZV9kYXRhPykge1xyXG4gICAgICAgIHJldHVybiBzeXl4X2Fkdl9tYW5hZ2VyLnJlcG9ydF9hZF9jbGljayhhZF9wb3NfaWQsIG5hdGl2ZV9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmihOWKoOi9veinhumikeW5v+WRiu+8iOWNjuS4uu+8iVxyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCBcclxuICAgICAqIEBwYXJhbSBvbkxvYWQgXHJcbiAgICAgKiBAcGFyYW0gb25TaG93IFxyXG4gICAgICogQHBhcmFtIG9uQ2xvc2UgXHJcbiAgICAgKiBAcGFyYW0gb25FcnJvciBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHByZWxvYWRfdmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLmh3X3FnKSB7XHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5jcmVhdGVfYWQoaWdjLmVfYWRfdHlwZS52aWRlbywgZV9hZF9pZC52aWRlb19hZGRfZ29sZCwgKCkgPT4geyB9LCAoKSA9PiB7IH0sICgpID0+IHsgfSwgKCkgPT4geyB9KVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgc2hvd19uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsKGFkX3Bvc19pZCwgcGFyZW50LCBjbGlja19iYWNrPzogRnVuY3Rpb24sIHNob3dfYmFjaz86IEZ1bmN0aW9uLCBoaWRlX2JhY2s/OiBGdW5jdGlvbiwgaXNfbmV3X3R5cGUgPSB0cnVlKSB7XHJcblxyXG4gICAgICAgIGlmICghYWRfYmFubmVyLmNhbl9zaG93X2ZpcnN0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0gaXMgaW4gb3BwbyBmaXJzdCBhZCBjZCBcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmF0aXZlX2RhdGEgPSB0aGlzLmdldF9sb2NhbF9uYXRpdmVfZGF0YShhZF9wb3NfaWQpIC8vIGFkX3Bvc19pZCBubyB1c2VcclxuXHJcbiAgICAgICAgaWYoYWRfcG9zX2lkID09ICcxMDMwNDAwMScpIHsgLy8g5Y6f55SfYmFubmVyXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlX2lubmVyX2ludGVyc3RpdGlhbF9ibihmdW5jdGlvbiAodmlldykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93KHBhcmVudCwgbmF0aXZlX2RhdGEsIGNsaWNrX2JhY2ssIHNob3dfYmFjaywgaGlkZV9iYWNrLCBpc19uZXdfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlX2lubmVyX2ludGVyc3RpdGlhbChmdW5jdGlvbiAodmlldykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zaG93KHBhcmVudCwgbmF0aXZlX2RhdGEsIGNsaWNrX2JhY2ssIHNob3dfYmFjaywgaGlkZV9iYWNrLCBpc19uZXdfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsaWNrX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwoY2FsbF9iYWNrPykgeyAvLyDljp/nlJ/kuIrmiqVcclxuICAgICAgICB0aGlzLmNyZWF0ZV9pbm5lcl9pbnRlcnN0aXRpYWwoZnVuY3Rpb24gKHZpZXcpIHtcclxuICAgICAgICAgICAgaWYgKHZpZXcgJiYgdmlldy5ub2RlICYmIHZpZXcubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcucmVwb3J0X2NsaWNrKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxfYmFjayAmJiBjYWxsX2JhY2soKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsaWNrX25hdGl2ZV9iYW5uZXIoY2FsbF9iYWNrPykgeyAvLyDljp/nlJ9iYW5uZXLkuIrmiqVcclxuICAgICAgICB0aGlzLmNyZWF0ZV9pbm5lcl9pbnRlcnN0aXRpYWxfYm4oZnVuY3Rpb24gKHZpZXcpIHtcclxuICAgICAgICAgICAgaWYgKHZpZXcgJiYgdmlldy5ub2RlICYmIHZpZXcubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcucmVwb3J0X2NsaWNrKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxfYmFjayAmJiBjYWxsX2JhY2soKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+WPluWKoOi9veWlveeahOWOn+eUn+aVsOaNrlxyXG4gICAgKiBAcGFyYW0gYWRfcG9zX2lkIOmFjee9ruihqOWOn+eUn2lkXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldF9sb2NhbF9uYXRpdmVfZGF0YShhZF9wb3NfaWQpOiBuYXRpdmVfYWRfZGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfYWR2X21hbmFnZXIuZ2V0X2xvY2FsX25hdGl2ZV9kYXRhKGFkX3Bvc19pZClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWxleekuuinhumikVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2hvd192aWRlbyhhZF9wb3NfaWQ6IHN0cmluZywgb25Mb2FkOiBGdW5jdGlvbiwgb25TaG93OiBGdW5jdGlvbiwgb25DbG9zZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uLCBuZWVkX2Vycl90aXBzID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUud2ViKSB7XHJcbiAgICAgICAgICAgIG9uQ2xvc2UgJiYgb25DbG9zZShudWxsLCB7IGlzRW5kZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuX19idXNpbmVzc19jb25maWdfZGF0YSAmJiB0aGlzLl9fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJ2aWRlb19vcGVuX3N3aXRjaFwiXSAmJiB0aGlzLl9fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJ2aWRlb19vcGVuX3N3aXRjaFwiXS52YWx1ZVswXSA9PSAwKSB7IC8vIOinhumikeW8gOWFs1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuZWVkX2Vycl90aXBzICYmIHN5eXhfbWFuYWdlci5jcmVhdGVfdG9hc3QoXCLnm67liY3mmoLml6Dlub/lkYrvvIzor7fnqI3lkI7lho3or5VcIilcclxuICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUuaHdfcWcpIHtcclxuICAgICAgICAgICAgc3l5eF9tYW5hZ2VyLnNob3dfYWQoaWdjLmVfYWRfdHlwZS52aWRlbywgYWRfcG9zX2lkLCBvbkxvYWQsIG9uU2hvdyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChwYXJhbSwgcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5pc0VuZGVkKSB7fSBcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHt9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZSAmJiBvbkNsb3NlKHBhcmFtLCByZXMpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5lZWRfZXJyX3RpcHMgJiYgc3l5eF9tYW5hZ2VyLmNyZWF0ZV90b2FzdChcIuaaguaXoOW5v+WRiu+8jOivt+eojeWQjuWGjeivlVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzeXl4X21hbmFnZXIuY3JlYXRlX2FkKGlnYy5lX2FkX3R5cGUudmlkZW8sIGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocGFyYW0sIHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuaXNFbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBvbkNsb3NlICYmIG9uQ2xvc2UocGFyYW0sIHJlcylcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocGFyYW1zLCBlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb2RlOiAyMDAwLCBtc2c6IHlvdXIgcmVxdWVzdCBhZCB0b28gb2Z0ZW5cclxuICAgICAgICAgICAgICAgICAgICAvLyBuZWVkX2Vycl90aXBzICYmIHN5eXhfbWFuYWdlci5jcmVhdGVfdG9hc3QoIEpTT04uc3RyaW5naWZ5KGVyci5lcnJvcikpICAvLyDmnInml7bmlrDorr7lpIfnrKzkuIDmrKHmiZPlvIDkvJrmiqXplJks5a6Y5pa56L+U5Zue5LqG6LCD5Y+W5Y+w6aKR57mBXHJcbiAgICAgICAgICAgICAgICAgICAgbmVlZF9lcnJfdGlwcyAmJiBzeXl4X21hbmFnZXIuY3JlYXRlX3RvYXN0KFwi55uu5YmN5pqC5pe25peg5bm/5ZGK77yM6K+356iN5ZCO5YaN6K+VXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3lubPlj7DniYjmnKzlj7fvvIznnIvmmK/lkKbmlK/mjIHmt7vliqDmoYzpnaLlip/og71cclxuICAgICAqIHBsYXRmb3JtVmVyc2lvbiA+PSAxMDQ0O1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2hlY2tfY2FuX2FkZF9kZXNrdG9wKCkge1xyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UuY2hlY2tfY2FuX2FkZF9kZXNrdG9wKHt9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeacieayoeaciea3u+WKoOahjOmdolxyXG4gICAgICogQHBhcmFtIGNhbl9hZGQgIOayoeaciea3u+WKoFxyXG4gICAgICogQHBhcmFtIGhhc19hZGQgIOa3u+WKoOS6hlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2hlY2tfaXNfYWRkX2Rlc2t0b3AoY2FuX2FkZDogRnVuY3Rpb24sIGhhc19hZGQ6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBjYW5fYWRkOiBjYW5fYWRkLFxyXG4gICAgICAgICAgICBoYXNfYWRkOiBoYXNfYWRkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UuY2hlY2tfaXNfYWRkX2Rlc2t0b3AocGFyYW0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDmoYzpnaLmk43kvZxcclxuICAgICAqIEBwYXJhbSBvbl9zdWNjZXNzICAg5Y+v5Lul5re75Yqg5qGM6Z2iIOa3u+WKoOahjOmdoueahOezu+e7n+eVjOmdouW8ueWHuiBcclxuICAgICAqIEBwYXJhbSBvbl9mYWlsZWQgICAgIOS4jeiDvea3u+WKoOahjOmdoiDmr5TlpoLlubPlj7DniYjmnKzovoPkvY5cclxuICAgICAqIEBwYXJhbSBvbl9mYWlsZWRfYmFjayAg5by55Ye65re75Yqg5qGM6Z2i55qE57O757uf55WM6Z2i5aSx6LSlXHJcbiAgICAgKiBAcGFyYW0gaGFzX2NyZWF0ZSAgICDlm77moIflt7Lnu4/liJvlu7rov4fkuoZcclxuICAgICAqIHBz77ya5b2T5o6l5pS25Yiwb25fc3VjY2Vzc+Wbnuiwg+WQju+8jOWumuaXtuWZqOS4gOenkuS5i+WQjiDlho3osIPnlKggY2hlY2tfaXNfYWRkX2Rlc2t0b3Ag5p2l5Yik5pat55So5oi35piv5ZCm5re75Yqg5LqG5qGM6Z2iIFxyXG4gICAgICog5aaC5p6c5Zue6LCD5pivIGNhbl9hZGQg5YiZ5Luj6KGo55So5oi35Y+W5raIIOWmguaenOWbnuiwg+aYr2hhc19hZGQg77yM5YiZ5Luj6KGo55So5oi35re75Yqg5qGM6Z2iIOWPr+WPkeaUvuWlluWKsVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWRkX2Rlc2t0b3Aob25fc3VjY2VzczogRnVuY3Rpb24sIG9uX2ZhaWxlZDogRnVuY3Rpb24sIG9uX2ZhaWxlZF9iYWNrOiBGdW5jdGlvbiwgaGFzX2NyZWF0ZTogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIG9uX3N1Y2Nlc3M6IG9uX3N1Y2Nlc3MsXHJcbiAgICAgICAgICAgIG9uX2ZhaWxlZDogb25fZmFpbGVkLFxyXG4gICAgICAgICAgICBvbl9mYWlsZWRfYmFjazogb25fZmFpbGVkX2JhY2ssXHJcbiAgICAgICAgICAgIGhhc19jcmVhdGU6IGhhc19jcmVhdGVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UuYWRkX2Rlc2t0b3AocGFyYW0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkI7lj7DovazliY3lj7Dnm5HlkKxcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAgICogY2FsbGJhY2vvvJpmdW5jdGlvbihyZXMpe1xyXG4gICAgICogfSBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9uX3Nob3coY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIGlnYy5pZ2NfbWFpbi5pbnN0YW5jZS5vbl9zaG93KHtcclxuICAgICAgICAgICAgb25fc2hvdzogY2FsbGJhY2tcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s5ZCO5Y+w55uR5ZCsXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKiBjYWxsYmFja++8mmZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgKiB9IFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb25faGlkZShjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2Uub25faGlkZSh7XHJcbiAgICAgICAgICAgIG9uX2hpZGU6IGNhbGxiYWNrXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluezu+e7n+S/oeaBr1xyXG4gICAgICogIHtcclxuICAgICAqICBicmFuZO+8muiuvuWkh+WTgeeJjFxyXG4gICAgICAgIG1vZGVs77ya5omL5py65Z6L5Y+3XHJcbiAgICAgICAgcGl4ZWxSYXRpb++8muiuvuWkh+WDj+e0oOavlFxyXG4gICAgICAgIHNjcmVlbldpZHRo77ya5bGP5bmV5a695bqmXHJcbiAgICAgICAgc2NyZWVuSGVpZ2h077ya5bGP5bmV6auY5bqmXHJcbiAgICAgICAgd2luZG93V2lkdGjvvJrlj6/kvb/nlKjnqpflj6Plrr3luqZcclxuICAgICAgICB3aW5kb3dIZWlnaHTvvJrlj6/kvb/nlKjnqpflj6Ppq5jluqZcclxuICAgICAgICBzdGF0dXNCYXJIZWlnaHTvvJrnirbmgIHmoI8v5byC5oCn57y65Y+j6auY5bqmXHJcbiAgICAgICAgbGFuZ3VhZ2XvvJrnjq/looPor63oqIBcclxuICAgICAgICB2ZXJzaW9u77ya54mI5pys5Y+3XHJcbiAgICAgICAgcGxhdGZvcm3vvJrlrqLmiLfnq6/lubPlj7BcclxuICAgICAgICBzeXN0ZW3vvJrmk43kvZzns7vnu5/niYjmnKxcclxuICAgICAgICBwbGF0Zm9ybVZlcnNpb27vvJrlubPlj7DniYjmnKzlj7cv5a6i5oi356uv5Z+656GA5bqT54mI5pysXHRcclxuICAgICAgICBleHRyYTpnZXRTeXN0ZW1JbmZvU3luY+i/lOWbnueahOWPguaVsFxyXG4gICAgICAgIH1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldF9zeXN0ZW1faW5mb19zeW5jKCkge1xyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UuZ2V0X3N5c3RlbV9pbmZvX3N5bmMoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5ri45oiP5ZCv5Yqo5Y+C5pWwXHJcbiAgICAgKiBzY2VuZe+8muWcuuaZr+WAvFxyXG4gICAgICogcXVlcnnvvJrmn6Xor6Llj4LmlbBcclxuICAgICAqIHJlZmVycmVySW5mb++8muWwj+a4uOaIj+WQr+WKqOadpea6kFxyXG4gICAgICogZW50cnlEYXRhSGFzaO+8mue+pOWFpeWPo+S/oeaBr1xyXG4gICAgICogZXh0cmEg5bCP5ri45oiP5Z+65pys5L+h5oGv77yM5YyF5ous5a6/5Li7IElk77yMZ2FtZUlk77yM5ZCv5Yqo5Zy65pmv562J5Y+C5pWwXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldF9sYXVuY2hfb3B0aW9uc19zeW5jKCkge1xyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UuZ2V0X2xhdW5jaF9vcHRpb25zX3N5bmMoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5bCP5ri45oiPXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBleGl0X21pbmlfcHJvZ3JhbSgpIHtcclxuICAgICAgICByZXR1cm4gaWdjLmlnY19tYWluLmluc3RhbmNlLmV4aXRfbWluaV9wcm9ncmFtKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwj+a4uOaIj+i3s+i9rFxyXG4gICAgICogQHBhcmFtIHBhcmFtXHJcbiAgICAgKiB7XHJcbiAgICAgKiAgIGFwcF9pZDrlsI/muLjmiI/ljIXlkI1cclxuICAgICAqICAgc3VjY2VzczrmiJDlip/lm57osINcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5hdmlnYXRlX3RvX21pbmlfcHJvZ3JhbShhcHBfaWQ6IHN0cmluZywgc3VjY2VzczogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIGFwcF9pZDogYXBwX2lkLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UubmF2aWdhdGVfdG9fbWluaV9wcm9ncmFtKHBhcmFtKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr5Y2h54mHXHJcbiAgICAgKiBAcGFyYW0gcGFyYW0gXHJcbiAgICAgKiB7XHJcbiAgICAgKiAgICogIGNoYW5uZWzvvJrovazlj5HlhoXlrrnnsbvlnotcclxuICAgICAgICAgKiAgdGVtcGxhdGVJZO+8muWIhuS6q+e0oOadkOaooeadv2lkXHJcbiAgICAgICAgICogIGRlc2M65YiG5Lqr5paH5qGIXHJcbiAgICAgICAgICogIHRpdGxlOuagh+mimCAgIO+8iOW/hemhu++8iVxyXG4gICAgICAgICAqICBpbWFnZVVybO+8muWbvueJhyAgIO+8iOW/hemhu++8iVxyXG4gICAgICAgICAqICBxdWVyeTrmn6Xor6LlrZfnrKbkuLJcclxuICAgICAgICAgKiAgZXh0cmHvvJrpmYTliqDkv6Hmga9cclxuICAgICAgICAgKiAgc3VjY2VzczrmiJDlip/lm57osINcclxuICAgICAgICAgKiAgZmFpbDrlpLHotKXlm57osINcclxuICAgICAgICAgKiAgZXh0cmE66ZmE5Yqg5L+h5oGvXHJcbiAgICAgKiB9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaGFyZSh0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBxdWVyeT86IHN0cmluZywgZGVzYz86IHN0cmluZywgc3VjY2Vzcz86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6IGltYWdlVXJsLFxyXG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXHJcbiAgICAgICAgICAgIGRlc2M6IGRlc2MsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3MsXHJcbiAgICAgICAgICAgIGZhaWw6IGZhaWxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlnYy5pZ2NfbWFpbi5pbnN0YW5jZS5zaGFyZShwYXJhbSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOebkeWQrOWPs+S4iuinkuWIhuS6q1xyXG4gICAgICogQHBhcmFtIHBhcmFtIFxyXG4gICAgICoge1xyXG4gICAgICogIHRpdGxlOuagh+mimFxyXG4gICAgICAgIGltYWdlVXJs77ya5Zu+54mHXHJcbiAgICAgKiB9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvbl9zaGFyZV9hcHBfbWVzc2FnZSh0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGltYWdlVXJsOiBpbWFnZVVybFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaWdjLmlnY19tYWluLmluc3RhbmNlLm9uX3NoYXJlX2FwcF9tZXNzYWdlKHBhcmFtKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5aeL5b2V5bGPXHJcbiAgICAgKiBAcGFyYW0gcGFyYW0gXHJcbiAgICAgKiB7XHJcbiAgICAgKiAgdGltZTog5b2V5bGP5pyA5aSn5pe26Ze0ICDvvIjpnZ7lv4XpobvvvIlcclxuICAgICAgICBpc19jbGlwX2VuZDog5piv5ZCm5oiq5Y+W5pyA5ZCOeOenkuW9leWxjyAgIO+8iOmdnuW/hemhu++8iVxyXG4gICAgICAgIGNsaXBfdGltZTog5oiq5Y+W5pyA5ZCO5b2V5bGP55qE5pe26Ze0ICDkvovlpoLvvJrmiKrlj5bmnIDlkI4zMHMgICDvvIjpnZ7lv4XpobvvvIlcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHN0YXJ0X3JlY29yZF9zY3JlZW4odGltZT86IG51bWJlciwgaXNfY2xpcF9lbmQ/OiBib29sZWFuLCBjbGlwX3RpbWU/OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIHRpbWU6IHRpbWUsXHJcbiAgICAgICAgICAgIGlzX2NsaXBfZW5kOiBpc19jbGlwX2VuZCxcclxuICAgICAgICAgICAgY2xpcF90aW1lOiBjbGlwX3RpbWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlnYy5pZ2NfbWFpbi5pbnN0YW5jZS5zdGFydF9yZWNvcmRfc2NyZWVuKHBhcmFtKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2f5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzdG9wX3JlY29yZF9zY3JlZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIGlnYy5pZ2NfbWFpbi5pbnN0YW5jZS5zdG9wX3JlY29yZF9zY3JlZW4oKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pqC5YGc5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBwYXVzZV9yZWNvcmRfc2NyZWVuKCkge1xyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UucGF1c2VfcmVjb3JkX3NjcmVlbigpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmgaLlpI3lvZXlsY9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlc3VtZV9yZWNvcmRfc2NyZWVuKCkge1xyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2UucmVzdW1lX3JlY29yZF9zY3JlZW4oKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAgKiDliIbkuqvlvZXlsY9cclxuICAgICAgICogQHBhcmFtIHBhcmFtIFxyXG4gICAgICAgKiB7XHJcbiAgICAgICAqICB2aWRlb1RvcGljczogW1wi55S757q/5aSn5L2c5oiYXCIsXCLmnInkurpA5L2g77yM5bCx5Zac5qyi55yL5L2g6L+95LiK5oiR5Y+I5p2A5LiN5LqG5oiR77yM5oiR55qE55S757q/56eY57GN5bCx5pivLi5cIixcIuaKlumfs+Wwj+a4uOaIj1wiLF0gIOivnemimFxyXG4gICAgICAgKiAgdGl0bGU65qCH6aKYXHJcbiAgICAgICAqICBkZXNjOuaPj+i/sFxyXG4gICAgICAgKiAgaW1hZ2VVcmw65aSn5Zu+XHJcbiAgICAgICAqICBxdWVyeTrmn6Xor6LlrZfnrKbkuLJcclxuICAgICAgICogIGZhaWw65aSx6LSl5Zue6LCDXHJcbiAgICAgICAqICBzdWNjZXNzOuaIkOWKn+Wbnuiwg1xyXG4gICAgICAgKiB9XHJcbiAgICAgICAqL1xyXG4gICAgc3RhdGljIHNoYXJlX3JlY29yZF9zY3JlZW4odmlkZW9Ub3BpY3M6IEFycmF5PHN0cmluZz4sIHRpdGxlOiBzdHJpbmcsIGRlc2M6IHN0cmluZywgaW1hZ2VVcmw6IHN0cmluZywgcXVlcnk6IHN0cmluZywgZmFpbDogRnVuY3Rpb24sIHN1Y2Nlc3M6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICB2aWRlb1RvcGljczogdmlkZW9Ub3BpY3MsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgICAgZGVzYzogZGVzYyxcclxuICAgICAgICAgICAgaW1hZ2VVcmw6IGltYWdlVXJsLFxyXG4gICAgICAgICAgICBxdWVyeTogcXVlcnksXHJcbiAgICAgICAgICAgIGZhaWw6IGZhaWwsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3MsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpZ2MuaWdjX21haW4uaW5zdGFuY2Uuc2hhcmVfcmVjb3JkX3NjcmVlbihwYXJhbSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9leWxj+aWh+S7tlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X3JlY29yZF92aWRlbygpIHtcclxuICAgICAgICByZXR1cm4gaWdjLmlnY19tYWluLmluc3RhbmNlLmdldF9yZWNvcmRfdmlkZW8oKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRfYWRpZF9nY19zdGF0dWMoX3R5cGU6IHN0cmluZykge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hZElkTWFwLmhhcyhfdHlwZSkpIHtcclxuICAgICAgICAgICAgbGV0IGFycmF5ID0gdGhpcy5hZElkTWFwLmdldChfdHlwZSk7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSBKU09OLnBhcnNlKGFycmF5WzBdKTtcclxuICAgICAgICAgICAgaWYgKEJvb2xlYW4ocmVzKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5nY19zdGF0dXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ3VvYmFvX2dldF9jaGFubmVsX2FkX2lkKF90eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmFkSWRNYXAuaGFzKF90eXBlKSkge1xyXG4gICAgICAgICAgICBsZXQgYXJyYXkgPSB0aGlzLmFkSWRNYXAuZ2V0KF90eXBlKTtcclxuICAgICAgICAgICAgbGV0IHJlcyA9IEpTT04ucGFyc2UoYXJyYXlbMF0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIGlmIChCb29sZWFuKHJlcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMuYWR2X2lkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295pys5Zyw55qE5ZWG5Lia5YyW6YWN572uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvbl9sb2FkX2xvY2FsX2J1c2luZXNzX2NvbmZpZygpIHtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgc3l5eF9zZGtfdXRpbHMubG9hZF9yZXNvdXJjZSh0aGlzLl9fYnVzaW5lc3NfY29uZmlnX2ZpbGVfcGF0aCwgZGF0YSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbmV3X2RhdGEgPSBpZ2MuaWdjX3Jlc291cmNlc191dGlscy5wYXJzZV9jc3YoZGF0YSwgXCJpZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8v5ouJ5Y+W6L+c56uv6YWN572u5aSx6LSlIOWImeS9v+eUqOacrOWcsOmFjee9rlxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcIm5hdGl2ZV9pY29uX3N3aXRjaFwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Y6f55SfaWNvbuW8gOWFs1wiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibmF0aXZlX2ljb25fc3dpdGNoXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzFdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfaWNvbl90cmFwX3Byb1wiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Y6f55SfaWNvbuaYk+eCueWHu+amgueOh1wiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibmF0aXZlX2ljb25fdHJhcF9wcm9cIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcImJhbm5lcl9jb29sX3RpbWVcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcImJhbm5lcuiHquWKqOWIt+aWsOaXtumXtFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYmFubmVyX2Nvb2xfdGltZVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFsyMCwgMjBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfaWNvbl9jb29sX3RpbWVcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuWOn+eUn2ljb27oh6rliqjliLfmlrDml7bpl7RcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm5hdGl2ZV9pY29uX2Nvb2xfdGltZVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFsyMCwgMjBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJhZHZfYmFubmVyX2NkXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLljp/nlJ/lj4piYW5uZXLlub/lkYrlhrfljbTvvIjnp5LvvIlcIiwgLy8g5YmNeOenkuS4jeaYvuekuuW5v+WRilxyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYWR2X2Jhbm5lcl9jZFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFsyXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wiYmFubmVyX3RvcF9vZmZzZXRcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuaJi1HmuKDpgZPmma7pgJpiYW5uZXLkuIrnp7vot53nprtcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcImJhbm5lcl90b3Bfb2Zmc2V0XCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzAsIDBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfYmFubmVyX29wZW5fc3dpdGNoXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLmmK/lkKblkK/nlKjljp/nlJ9iYW5uZXLlub/lkYrlvIDlhbNcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm5hdGl2ZV9iYW5uZXJfb3Blbl9zd2l0Y2hcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcIm5hdGl2ZV9iYW5uZXJfY2xpY2tfc3dpdGNoXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLmmK/lkKblkK/nlKjljp/nlJ9iYW5uZXLmmJPngrnlh7vlpITnkIZcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm5hdGl2ZV9iYW5uZXJfY2xpY2tfc3dpdGNoXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfYmFubmVyX2NsaWNrX3Byb1wiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Y6f55SfYmFubmVy5piT54K55Ye76Kem5Y+R5qaC546HXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJuYXRpdmVfYmFubmVyX2NsaWNrX3Byb1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFswXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wibmF0aXZlX2Jhbm5lcl9jbGlja19wcm90ZWN0XCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLljp/nlJ9iYW5uZXLmmJPngrnlh7vkv53miqRcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm5hdGl2ZV9iYW5uZXJfY2xpY2tfcHJvdGVjdFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFszXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wibmF0aXZlX2luc3RpdGlhbF93aGl0ZV9lYXN5X2NsaWNrXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLljp/nlJ/mj5LlsY/ngrnlh7vnqbrnmb3ot7PovaxcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm5hdGl2ZV9pbnN0aXRpYWxfd2hpdGVfZWFzeV9jbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFswXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wibmF0aXZlX2Jhbm5lcl9yZXBvcnRfY2xpY2tfdXBkYXRlX3N3aXRjaFwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Y6f55SfQmFubmVy54K55Ye75LiK5oql5ZCO56uL5Y2z5Yi35pawXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJuYXRpdmVfYmFubmVyX3JlcG9ydF9jbGlja191cGRhdGVfc3dpdGNoXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzFdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfaWNvbl9yZXBvcnRfY2xpY2tfdXBkYXRlX3N3aXRjaFwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Y6f55SfaWNvbueCueWHu+S4iuaKpeWQjueri+WNs+WIt+aWsFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibmF0aXZlX2ljb25fcmVwb3J0X2NsaWNrX3VwZGF0ZV9zd2l0Y2hcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcIm5hdGl2ZV9pbm5lcl9yZXBvcnRfY2xpY2tfdXBkYXRlX3N3aXRjaFwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi57uT566X5Y6f55Sf54K55Ye75LiK5oql5ZCO56uL5Y2z5Yi35pawXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJuYXRpdmVfaW5uZXJfcmVwb3J0X2NsaWNrX3VwZGF0ZV9zd2l0Y2hcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcIm5hdGl2ZV9pbnRlcnN0aXRpYWxfcmVwb3J0X2NsaWNrX3VwZGF0ZV9zd2l0Y2hcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuWOn+eUn+aPkuWxj+eCueWHu+S4iuaKpeWQjueri+WNs+WIt+aWsFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibmF0aXZlX2ludGVyc3RpdGlhbF9yZXBvcnRfY2xpY2tfdXBkYXRlX3N3aXRjaFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFsxXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wic2hvd19ub3JtYWxfYmFubmVyX3N3aXRjaFwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5piv5ZCm5byA5ZCv5bGV56S65pmu6YCaYmFubmVy5byA5YWzXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJzaG93X25vcm1hbF9iYW5uZXJfc3dpdGNoXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzFdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfaWNvbl90cmFwX3Byb1wiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Y6f55SfaWNvbuaYk+eCueWHu+amgueOh1wiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibmF0aXZlX2ljb25fdHJhcF9wcm9cIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcImZpbmdlcl9jbG9zZV9iYW5uZXJfc3dpdGNoXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLlhbPpl61CYW5uZXLlkI7kuI3lho3lsZXnpLpcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcImZpbmdlcl9jbG9zZV9iYW5uZXJfc3dpdGNoXCIsXHJcbiAgICAgICAgICAgICAgICAvLyB2YWx1ZTogWzAsIDYwXVxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFswLCA2MF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcIm5hdGl2ZV9pbm5lcl9pbnN0aXRpYWxfY2xpY2tfY2xvc2VfcHJvXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLlhbPpl63nu5Pnrpfljp/nlJ/mmJPot7PovazmpoLnjodcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm5hdGl2ZV9pbm5lcl9pbnN0aXRpYWxfY2xpY2tfY2xvc2VfcHJvXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfaW5zdGl0aWFsX2NsaWNrX2Nsb3NlX3Byb1wiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5YWz6Zet5Y6f55Sf5o+S5bGP5piT6Lez6L2s5qaC546HXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJuYXRpdmVfaW5zdGl0aWFsX2NsaWNrX2Nsb3NlX3Byb1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFswXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wib3Blbl9vcHBvX25ld19ydWxlXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLmmK/lkKblvIDlkK9vcHBv5paw6KeEXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJvcGVuX29wcG9fbmV3X3J1bGVcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcIm9wcG9fYmFubmVyX2Nvb2xfdGltZVwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwib3Bwb0Jhbm5lcue0r+iuoeWxleekuuWIt+aWsOaXtumXtFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwib3Bwb19iYW5uZXJfY29vbF90aW1lXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogW1swLCAxMjAsIDEwXSwgWzEyMSwgMTgwLCAxMV0sIFsxODEsIDI0MCwgMTJdXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wib3Bwb19uYXRpdmVfc2hvd19saW1pdFwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwib3Bwb+WOn+eUn+WxleekuumZkOWItlwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwib3Bwb19uYXRpdmVfc2hvd19saW1pdFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFs2MCwgNjBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJvcHBvX25hdGl2ZV9jYWNoZV9sZW5ndGhcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIm9wcG/ljp/nlJ/mlbDmja7nvJPlrZjmlbDnu4Tplb/luqZcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm9wcG9fbmF0aXZlX2NhY2hlX2xlbmd0aFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFs1XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wibmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbF9zd2l0Y2hcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIue7k+eul+WOn+eUn+W8gOWFs1wiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbF9zd2l0Y2hcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcIm5hdGl2ZV9iYW5uZXJfY2xpY2tfcHJvX2xpbWl0XCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLljp/nlJ9iYW5uZXLngrnlh7vnjofpmZDliLZcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm5hdGl2ZV9iYW5uZXJfY2xpY2tfcHJvX2xpbWl0XCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzEwMDAsIDAuNCwgNjBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfaW5uZXJfY2xpY2tfcHJvX2xpbWl0XCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLnu5Pnrpfljp/nlJ/ngrnlh7vnjofpmZDliLZcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm5hdGl2ZV9pbm5lcl9jbGlja19wcm9fbGltaXRcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMTAwMCwgMC40LCA2MF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcIm5hdGl2ZV9pbnRlcnN0aXRpYWxfY2xpY2tfcHJvX2xpbWl0XCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLljp/nlJ/mj5LlsY/ngrnlh7vnjofpmZDliLZcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcIm5hdGl2ZV9pbnRlcnN0aXRpYWxfY2xpY2tfcHJvX2xpbWl0XCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzEwMDAsIDAuNCwgNjBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfaW50ZXJzdGl0aWFsX2NsaWNrX3dyYXBcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuWOn+eUn+aPkuWxj+WxleekuuetlueVpVwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibmF0aXZlX2ludGVyc3RpdGlhbF9jbGlja193cmFwXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzEwMDAsIDIsIDVdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfaW5uZXJfaW5zdGl0aWFsX2NsaWNrX3dyYXBcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIue7k+eul+WOn+eUn+WxleekuuetlueVpVwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibmF0aXZlX2lubmVyX2luc3RpdGlhbF9jbGlja193cmFwXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzEwMDAsIDIsIDVdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJiYW5uZXJfc3Ryb25nX3VwZGF0ZV9zd2l0Y2hcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcImJhbm5lcuW8uuWItuWIt+aWsOW8gOWFs1wiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYmFubmVyX3N0cm9uZ191cGRhdGVfc3dpdGNoXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfYmFubmVyX2hlaWdodF9vcGVuX3J1bGVcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuWOn+eUn2Jhbm5lcumrmOW6puWQr+WKqOinhOWImVwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibmF0aXZlX2Jhbm5lcl9oZWlnaHRfb3Blbl9ydWxlXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzIsIDMsIDVdIC8vIOesrOS4gOS4quaYr+WxleekuuasoeaVsOS4uuWkmuWwkeaXtu+8jOS8muaPkOmrmGJhbm5lcumrmOW6plxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wibmF0aXZlX2Jhbm5lcl9oZWlnaHRfcnVsZVwiXSA9IHsgLy8gc2V0X2Jhbm5lcl9oZWlnaHRcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Y6f55SfYmFubmVy6auY5bqm6KeE5YiZXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJuYXRpdmVfYmFubmVyX2hlaWdodF9ydWxlXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzIwMCwgMzIwLCAxLjNdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJsb2FkX25hdGl2ZV9pbnRlcnN0aXRpYWxfcnVsZVwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwi5Y6f55Sf5o+S5bGP5Yqg6L296KeE5YiZ77yI56ysWOasoeWOu+WKoOi9ve+8iVwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwibG9hZF9uYXRpdmVfaW50ZXJzdGl0aWFsX3J1bGVcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbM11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcImZpcnN0X3VzZV9uYXRpYmVfYmFubmVyXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLljp/nlJ/mj5LlsY/kvJjlhYjkvb/nlKjljp/nlJ9CYW5uZXJcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcImZpcnN0X3VzZV9uYXRpYmVfYmFubmVyXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzFdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJjdHJfdGVzdF9vcGVuXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCJjdHLlvIDlkK/lvIDlhbNcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcImN0cl90ZXN0X29wZW5cIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcImN0cl90ZXN0X2Nsb3NlX2J1dHRvbl9kZWxheVwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwiY3Ry5rWL6K+V5YWz6Zet5oyJ6ZKu5bu26L+fXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJjdHJfdGVzdF9jbG9zZV9idXR0b25fZGVsYXlcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcImN0cl90ZXN0X3Jld2FyZF9jb3VudFwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwiY3Ry5rWL6K+V5aWW5Yqx5pWw6YePXCIsXHJcbiAgICAgICAgICAgICAgICBpZDogXCJjdHJfdGVzdF9yZXdhcmRfY291bnRcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMTAwXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wiYmFubmVyX2NsaWNrX21hc2tfb3Blbl9ydWxlXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCJiYW5uZXLngrnlh7vljLrln5/nvKnmlL7op4TliJlcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcImJhbm5lcl9jbGlja19tYXNrX29wZW5fcnVsZVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFsyLCAxLCAyXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wiYmFubmVyX2NsaWNrX21hc2tfc2NhbGVcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcImJhbm5lcueCueWHu+WMuuWfn+e8qeaUvuWAjeaVsFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYmFubmVyX2NsaWNrX21hc2tfc2NhbGVcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMS41XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wiYmFubmVyX2NsaWNrX21hc2tfc2NhbGVcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcImJhbm5lcueCueWHu+WMuuWfn+e8qeaUvuWAjeaVsFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwiYmFubmVyX2NsaWNrX21hc2tfc2NhbGVcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMS41XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5ld19kYXRhW1widmlkZW9fb3Blbl9zd2l0Y2hcIl0gPSB7XHJcbiAgICAgICAgICAgICAgICBkZXNjOiBcIuinhumikeW8gOWFs1wiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwidmlkZW9fb3Blbl9zd2l0Y2hcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcInZpdm9fY3Bfc3dpdGNoXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLmj5LlsY/lvIDlhbNcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcInZpdm9fY3Bfc3dpdGNoXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzFdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJ2aXZvX3lzY3Bfc3dpdGNoXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCLljp/nlJ/mj5LlsY/lvIDlhbNcIixcclxuICAgICAgICAgICAgICAgIGlkOiBcInZpdm9feXNjcF9zd2l0Y2hcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBbMV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcInZpdm9faGVuZ2Z1X3N3aXRjaFwiXSA9IHtcclxuICAgICAgICAgICAgICAgIGRlc2M6IFwidml2b+aoquW5heS6kuaOqFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwidml2b19oZW5nZnVfc3dpdGNoXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogWzFdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJqZ2dfc3dpdGNoXCJdID0ge1xyXG4gICAgICAgICAgICAgICAgZGVzYzogXCJvduS5neWuq+agvOS6kuaOqFwiLFxyXG4gICAgICAgICAgICAgICAgaWQ6IFwiamdnX3N3aXRjaFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFsxXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+abv+aNouaooeW8j+WKoOi9ve+8jHJlbW90ZV9idXNpbmVzc19jb25maWdfZGF0YeS4jeS4uuepulxyXG4gICAgICAgICAgICBsZXQgeXNibl9zdGF0dXMgPSBzZWxmLmdldF9hZGlkX2djX3N0YXR1YygnWVNCTicpIC8vIOWOn+eUn2Jhbm5lcueKtuaAgVxyXG4gICAgICAgICAgICBsZXQgYm5fc3RhdHVzID0gc2VsZi5nZXRfYWRpZF9nY19zdGF0dWMoJ0JOJykgLy8g5pmu6YCaYmFubmVy54q25oCBXHJcbiAgICAgICAgICAgIGxldCB5c2pzX3N0YXR1cyA9IHNlbGYuZ2V0X2FkaWRfZ2Nfc3RhdHVjKCdZU0pTJykgLy8g5Y6f55Sf57uT566X54q25oCBXHJcbiAgICAgICAgICAgIGxldCBzcF9zdGF0dXMgPSBzZWxmLmdldF9hZGlkX2djX3N0YXR1YygnU1AnKSAvLyDop4bpopHnirbmgIFcclxuICAgICAgICAgICAgbGV0IGpzeW1fc3RhdHVzID0gc2VsZi5nZXRfYWRpZF9nY19zdGF0dWMoJ0pTWU0nKSAvLyDmlrDlk4HlsJ3pspznirbmgIEgXHJcbiAgICAgICAgICAgIGxldCB5c2ljX3N0YXR1cyA9IHNlbGYuZ2V0X2FkaWRfZ2Nfc3RhdHVjKCdZU0lDJykgLy8g5Y6f55SfaWNvbuW8gOWFs1xyXG4gICAgICAgICAgICBsZXQgaHRfc3RhdHVzID0gc2VsZi5nZXRfYWRpZF9nY19zdGF0dWMoJ0hUJykgfHwgMCAvLyB2aXZv5LqS5o6oXHJcbiAgICAgICAgICAgIGxldCBqZ2dfc3RhdHVzID0gc2VsZi5nZXRfYWRpZF9nY19zdGF0dWMoJ0pHRycpIHx8IDAgLy8g5Lmd5a6r5qC85LqS5o6oXHJcblxyXG4gICAgICAgICAgICBsZXQgY3Bfc3RhdHVzID0gc2VsZi5nZXRfYWRpZF9nY19zdGF0dWMoJ0NQJykgfHwgMC8vIHZpdm/mj5LlsY/nirbmgIFcclxuICAgICAgICAgICAgbGV0IHlzY3Bfc3RhdHVzID0gc2VsZi5nZXRfYWRpZF9nY19zdGF0dWMoJ1lTQ1AnKSB8fCAwLy8gdml2b+aPkuWxj+eKtuaAgVxyXG5cclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJuYXRpdmVfYmFubmVyX29wZW5fc3dpdGNoXCJdLnZhbHVlWzBdID0geXNibl9zdGF0dXMgLy8g5Y6f55SfYmFubmVy5byA5YWzXHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wic2hvd19ub3JtYWxfYmFubmVyX3N3aXRjaFwiXS52YWx1ZVswXSA9IGJuX3N0YXR1cyAvLyDmma7pgJpiYW5uZXLlvIDlhbMgXHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wibmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbF9zd2l0Y2hcIl0udmFsdWVbMF0gPSB5c2pzX3N0YXR1cyAvLyDnu5Pnrpfljp/nlJ/lvIDlhbMgXHJcbiAgICAgICAgICAgIG5ld19kYXRhW1widmlkZW9fb3Blbl9zd2l0Y2hcIl0udmFsdWVbMF0gPSBzcF9zdGF0dXMgLy8g6KeG6aKR5byA5ZCv5byA5YWzIFxyXG4gICAgICAgICAgICBuZXdfZGF0YVtcImN0cl90ZXN0X29wZW5cIl0udmFsdWVbMF0gPSBqc3ltX3N0YXR1cyAvLyDmlrDlk4HlsJ3pspzlvIDlkK/lvIDlhbMgXHJcbiAgICAgICAgICAgIG5ld19kYXRhW1wibmF0aXZlX2ljb25fc3dpdGNoXCJdLnZhbHVlWzBdID0geXNpY19zdGF0dXMgLy/ljp/nlJ9pY29u5byA5YWzXHJcbiAgICAgICAgICAgIG5ld19kYXRhW1widml2b19jcF9zd2l0Y2hcIl0udmFsdWVbMF0gPSBjcF9zdGF0dXMgLy8gdml2b+aZrumAmuaPkuWxj+W8gOWFsyBcclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJ2aXZvX3lzY3Bfc3dpdGNoXCJdLnZhbHVlWzBdID0geXNjcF9zdGF0dXMgLy8gdml2b+WOn+eUn+aPkuWxj+W8gOWFsyBcclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJ2aXZvX2hlbmdmdV9zd2l0Y2hcIl0udmFsdWVbMF0gPSBodF9zdGF0dXMgLy8gdml2b+S6kuaOqOW8gOWFsyBcclxuICAgICAgICAgICAgbmV3X2RhdGFbXCJqZ2dfc3dpdGNoXCJdLnZhbHVlWzBdID0gamdnX3N0YXR1cyAvLyDkuZ3lrqvmoLzkupLmjqjlvIDlhbMgXHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5fX3JlbW90ZV9idXNpbmVzc19jb25maWdfaW5pdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBzeXl4X3Nka191dGlscy5yZXBsYWNlX2RhdGEobmV3X2RhdGEsIHNlbGYuX19idXNpbmVzc19jb25maWdfZGF0YSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2RrLS0tLS0gYnVzc2luZXNzIGNvbmZpZyBpcy0tLSBcIiwgbmV3X2RhdGEpXHJcbiAgICAgICAgICAgICAgICBzZWxmLl9fYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBuZXdfZGF0YVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5fX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gbmV3X2RhdGFcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2RrLS0tLS1sb2NhbCBidXNzaW5lc3MgY29uZmlnIGlzIFwiLCBuZXdfZGF0YSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5fX2xvY2FsX2J1c2luZXNzX2NvbmZpZ19pbml0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLmluaXRfcmVtb3RlX2NvbmZpZ19jb21wZWxldGUoKVxyXG4gICAgICAgIH0sIHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICog6aKE5Yqg6L295Lmd5a6r5qC85LqS5o6o55uS5a2QXHJcbiAgICAqIEBwYXJhbSBhZF9wb3NfaWQgYWR26YWN572u6KGo5bm/5ZGKaWRcclxuICAgICogQHBhcmFtIG9uTG9hZCDliqDovb3miJDlip/lm57osINcclxuICAgICogQHBhcmFtIG9uU2hvdyDlsZXnpLrmiJDlip/lm57osINcclxuICAgICogQHBhcmFtIG9uQ2xvc2Ug5YWz6Zet5Zue6LCDXHJcbiAgICAqIEBwYXJhbSBvbkVycm9yIOaKpemUmeWbnuiwg1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBwcmVfbG9hZF9nYW1lX3BvcnRhbF9ib3goYWRfcG9zX2lkOiBzdHJpbmcsIG9uTG9hZDogRnVuY3Rpb24sIG9uU2hvdzogRnVuY3Rpb24sIG9uQ2xvc2U6IEZ1bmN0aW9uLCBvbkVycm9yOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGlmICh0aGlzLnN1cHBvcnRfZ2FtZV9ib3goKSkgeyAvLyDlv6vlupTnlKjniYjmnKzlpKfkuo4xMDc2XHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5jcmVhdGVfYWQoaWdjLmVfYWRfdHlwZS5hcHBfYm94LCBhZF9wb3NfaWQsIG51bGwsIG51bGwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG9uQ2xvc2UgJiYgb25DbG9zZSgpXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnByZV9sb2FkX2dhbWVfcG9ydGFsX2JveChhZF9wb3NfaWQsIG51bGwsIG51bGwsIG51bGwsIG51bGwpXHJcbiAgICAgICAgICAgICAgICB9LCA1MDApXHJcbiAgICAgICAgICAgIH0sIG51bGwsIGlnYy5lX2FkX2FwcF9ib3hfdHlwZS5wb3J0YWxfYm94KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuLyoqXHJcbiAqIG9wcG/kuZ3lrqvmoLzkupLmjqjnm5LlrZBcclxuICogQHBhcmFtIGFkX3Bvc19pZCBhZHbphY3nva7ooajlub/lkYppZFxyXG4gKiBAcGFyYW0gb25Mb2FkIOWKoOi9veaIkOWKn+Wbnuiwg1xyXG4gKiBAcGFyYW0gb25TaG93IOWxleekuuaIkOWKn+Wbnuiwg1xyXG4gKiBAcGFyYW0gb25DbG9zZSDlhbPpl63lm57osINcclxuICogQHBhcmFtIG9uRXJyb3Ig5oql6ZSZ5Zue6LCDXHJcbiAqIEBwYXJhbSBuZWVkX2Vycl90aXBzIOm7mOiupOS4umZhbHNl77yM5Li6dHJ1ZeaXtuaYvuekunNka+iHquW4pueahOaKpemUmemjmOWtl1xyXG4gKi9cclxuICAgIHN0YXRpYyBzaG93X2dhbWVfcG9ydGFsX2JveChhZF9wb3NfaWQ6IHN0cmluZywgb25Mb2FkOiBGdW5jdGlvbiwgb25TaG93OiBGdW5jdGlvbiwgb25DbG9zZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uLCBuZWVkX2Vycl90aXBzID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICAvLyDkuZ3lrqvmoLzkupLmjqjlvIDlhbNcclxuICAgICAgICBpZih0aGlzLl9fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgdGhpcy5fX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiamdnX3N3aXRjaFwiXSkgeyBcclxuICAgICAgICAgICAgaWYgKHRoaXMuX19idXNpbmVzc19jb25maWdfZGF0YVtcImpnZ19zd2l0Y2hcIl0udmFsdWVbMF0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbmVlZF9lcnJfdGlwcyAmJiBzeXl4X21hbmFnZXIuY3JlYXRlX3RvYXN0KFwi5Yqg6L295Lit77yM56iN5ZCO5YaN6K+VXCIpXHJcbiAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLnNob3dfYWQoaWdjLmVfYWRfdHlwZS5hcHBfYm94LCBhZF9wb3NfaWQsIG9uTG9hZCwgb25TaG93LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9uQ2xvc2UgJiYgb25DbG9zZSgpXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wcmVfbG9hZF9nYW1lX3BvcnRhbF9ib3goYWRfcG9zX2lkLCBudWxsLCBudWxsLCBudWxsLCBudWxsKVxyXG4gICAgICAgICAgICB9LCA1MDApXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBuZWVkX2Vycl90aXBzICYmIHN5eXhfbWFuYWdlci5jcmVhdGVfdG9hc3QoXCLliqDovb3kuK3vvIznqI3lkI7lho3or5VcIilcclxuICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKClcclxuICAgICAgICB9LCBpZ2MuZV9hZF9hcHBfYm94X3R5cGUucG9ydGFsX2JveClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2hvd19nYW1lX3BvcnRhbF9ib3hfdml2byhhZF9wb3NfaWQ6IHN0cmluZywgb25Mb2FkOiBGdW5jdGlvbiwgb25TaG93OiBGdW5jdGlvbiwgb25DbG9zZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uLCBuZWVkX2Vycl90aXBzID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgbGV0IGFkX2lkID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfY2hhbm5lbF9hZF9pZChhZF9wb3NfaWQpXHJcbiAgICAgICAgaWYgKCFhZF9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5Lmd5a6r5qC85LqS5o6o5byA5YWzXHJcbiAgICAgICAgaWYodGhpcy5fX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHRoaXMuX19idXNpbmVzc19jb25maWdfZGF0YVtcImpnZ19zd2l0Y2hcIl0pIHsgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJqZ2dfc3dpdGNoXCJdLnZhbHVlWzBdID09IDApIHtcclxuICAgICAgICAgICAgICAgIG5lZWRfZXJyX3RpcHMgJiYgc3l5eF9tYW5hZ2VyLmNyZWF0ZV90b2FzdChcIuWKoOi9veS4re+8jOeojeWQjuWGjeivlVwiKVxyXG4gICAgICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3aW5kb3dbJ3FnJ10uZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybVZlcnNpb25Db2RlID49IDEwOTIpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBib3hQb3J0YWxBZCA9IG51bGxcclxuICAgICAgICAgICAgYm94UG9ydGFsQWQgPSB3aW5kb3dbJ3FnJ10uY3JlYXRlQm94UG9ydGFsQWQoe1xyXG4gICAgICAgICAgICAgICAgcG9zSWQ6IGFkX2lkXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGJveFBvcnRhbEFkLm9uTG9hZChmdW5jdGlvbiAoKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aXZv5Lmd5a6r5qC85bm/5ZGK5Yqg6L295oiQ5YqfXCIpIFxyXG4gICAgICAgICAgICAgICAgb25Mb2FkICYmIG9uTG9hZCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBib3hQb3J0YWxBZC5vbkVycm9yKGZ1bmN0aW9uIChlcnIpIHsgXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpdm/kuZ3lrqvmoLzliqDovb3lpLHotKVcIiwgZXJyKSBcclxuICAgICAgICAgICAgICAgIC8vIHN5eXhfbWFuYWdlci5jcmVhdGVfdG9hc3QoSlNPTi5zdHJpbmdpZnkoZXJyKSlcclxuICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBib3hQb3J0YWxBZC5vbkNsb3NlKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjbG9zZScpXHJcbiAgICAgICAgICAgICAgICBpZiAoYm94UG9ydGFsQWQuaXNEZXN0cm95ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIOW9k+S5neWuq+agvOWFs+mXreS5i+WQju+8jOWGjeasoeWxleekukljb25cclxuICAgICAgICAgICAgICAgIGJveFBvcnRhbEFkLnNob3coKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyDlub/lkYrmlbDmja7liqDovb3miJDlip/lkI7lsZXnpLpcclxuICAgICAgICAgICAgYm94UG9ydGFsQWQuc2hvdygpLnRoZW4oZnVuY3Rpb24gKCkgeyBcclxuICAgICAgICAgICAgICAgIG9uU2hvdyAmJiBvblNob3coKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBzZWxmLmdhbWVfcG9ydGFsX2JveF92aXZvID0gYm94UG9ydGFsQWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aaguS4jeaUr+aMgeS6kuaOqOebkuWtkOebuOWFsyBBUEknKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdml2byDljp/nlJ/mqKHmnb9cclxuICAgIHN0YXRpYyBzaG93X29yaWdpbmFsX21vZHVsZShhZF9wb3NfaWQ6IHN0cmluZywgb25TdWNjZXNzPzogRnVuY3Rpb24sIG9uRXJyb3I/OiBGdW5jdGlvbiwgb25DbG9zZT86IEZ1bmN0aW9uLCB0b3A/Om51bWJlciwgbGVmdD86bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgbGV0IGFkX2lkID0gc3l5eF9hZHZfbWFuYWdlci5nZXRfY2hhbm5lbF9hZF9pZChhZF9wb3NfaWQpXHJcbiAgICAgICAgaWYgKCFhZF9pZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHdpbmRvd1sncWcnXS5nZXRTeXN0ZW1JbmZvU3luYygpLnBsYXRmb3JtVmVyc2lvbkNvZGUgPCAxMDkxKSB7XHJcbiAgICAgICAgICAgIG9uRXJyb3ImJm9uRXJyb3IoJ+S9juS6jjEwOTLniYjmnKzkuI3mlK/mjIEnKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRvcCAmJiBsZWZ0ICl7XHJcbiAgICAgICAgICAgIHZhciBjdXN0b21BZCA9IHdpbmRvd1sncWcnXS5jcmVhdGVDdXN0b21BZCh7XHJcbiAgICAgICAgICAgICAgICBwb3NJZDogYWRfaWQsXHJcbiAgICAgICAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6bGVmdCxcclxuICAgICAgICAgICAgICAgICAgICB0b3A6dG9wLFxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGN1c3RvbUFkID0gd2luZG93WydxZyddLmNyZWF0ZUN1c3RvbUFkKHtcclxuICAgICAgICAgICAgICAgIHBvc0lkOiBhZF9pZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3VzdG9tQWQub25FcnJvcihlcnIgPT4ge1xyXG4gICAgICAgICAgICBvbkVycm9yJiZvbkVycm9yKGVycik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y6f55Sf5qih5p2/5bm/5ZGK5Yqg6L295aSx6LSlXCIsIGVycik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY3VzdG9tQWQub25DbG9zZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIG9uQ2xvc2UmJm9uQ2xvc2UoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLljp/nlJ/mqKHmnb/lub/lkYrlhbPpl63kuovku7bnmoTlm57osIPlh73mlbBcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY3VzdG9tQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Y6f55Sf5qih5p2/5bm/5ZGK5bGV56S65a6M5oiQJyk7XHJcbiAgICAgICAgICAgIG9uU3VjY2VzcyYmb25TdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIC8vIOWtmOWCqOWunuS+i++8jOeUqOS6juWFs+mXreS9v+eUqFxyXG4gICAgICAgICAgICBzZWxmLm9yaWdpbmFsX21vZHVsZV9kYXRhID0gY3VzdG9tQWQ7IFxyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgb25FcnJvciYmb25FcnJvcihlcnIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Y6f55Sf5qih5p2/5bm/5ZGK5bGV56S65aSx6LSlJywgSlNPTi5zdHJpbmdpZnkoZXJyKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgICBcclxuICAgIC8vIOWOn+eUn+aooeadvyAg5YWz6ZetXHJcbiAgICBzdGF0aWMgZGVzdG9yeV9vcmlnaW5hbF9tb2R1bGUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5vcmlnaW5hbF9tb2R1bGVfZGF0YSl7XHJcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxfbW9kdWxlX2RhdGEuaGlkZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsX21vZHVsZV9kYXRhLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tQ3VzdG9tQUQgJiYgdGhpcy5tQ3VzdG9tQUQuaGlkZSgpO1xyXG4gICAgICAgIHRoaXMubUN1c3RvbUFEICYmIHRoaXMubUN1c3RvbUFELmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLm1DdXN0b21BRCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHN5c3RlbVZlcnNpb24yOiBudW1iZXIgPSBudWxsO1xyXG4gICAgc3RhdGljIEdldFN5c3RlbUluZm9TeW5jMigpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLnN5c3RlbVZlcnNpb24yID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zeXN0ZW1WZXJzaW9uMiA9IHdpbmRvd1sncWcnXS5nZXRTeXN0ZW1JbmZvU3luYygpLnBsYXRmb3JtVmVyc2lvbkNvZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbVZlcnNpb24yO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG9wcG8g5Y6f55Sf5qih5p2/XHJcbiAgICBzdGF0aWMgc2hvd19vcmlnaW5hbF9tb2R1bGVfb3BwbyhhZF9wb3NfaWQ6IHN0cmluZywgc3R5bGU6IG51bWJlcltdLCBvbkxvYWQsIG9uU3VjY2VzczogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uLCBvbkNsb3NlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGxldCBhZF9pZCA9IHN5eXhfYWR2X21hbmFnZXIuZ2V0X2NoYW5uZWxfYWRfaWQoYWRfcG9zX2lkKVxyXG4gICAgICAgIGlmICghYWRfaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3aW5kb3dbJ3FnJ10uZ2V0U3lzdGVtSW5mb1N5bmMoKS5wbGF0Zm9ybVZlcnNpb25Db2RlIDwgMTA5Mikge1xyXG4gICAgICAgICAgICAvLyBzeXl4X21hbmFnZXIuY3JlYXRlX3RvYXN0KCfniYjmnKzov4fkvY4nKVxyXG4gICAgICAgICAgICAvLyBzeXl4X21hbmFnZXIuY3JlYXRlX3RvYXN0KHdpbmRvd1sncWcnXS5nZXRTeXN0ZW1JbmZvU3luYygpLnBsYXRmb3JtVmVyc2lvbkNvZGUpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi54mI5pys6L+H5L2OIOS4jeaUr+aMgeWOn+eUn+aooeadv+W5v+WRilwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIUJvb2xlYW4oc3R5bGUpIHx8IHN0eWxlLmxlbmd0aCAhPSAzKSB7XHJcbiAgICAgICAgICAgIC8vIHN5eXhfbWFuYWdlci5jcmVhdGVfdG9hc3QoJ3N0eWxl6ZSZ6K+vJylcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlj4LmlbDmo4DmtYvplJnor68gb3BlbmN1c3RvbWFkIHN0eWxlXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubUN1c3RvbUFEID09IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGN1c3RvbUFkID0gd2luZG93WydxZyddLmNyZWF0ZUN1c3RvbUFkKHtcclxuICAgICAgICAgICAgICAgIGFkVW5pdElkOiBhZF9pZCxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBzdHlsZVswXSxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzdHlsZVsxXSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc3R5bGVbMl0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9dGhpcztcclxuICAgICAgICAgICAgY3VzdG9tQWQub25Mb2FkKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfljp/nlJ/mqKHmnb/lub/lkYrliqDovb3miJDlip8nKVxyXG4gICAgICAgICAgICAgICAgb25Mb2FkICYmIG9uTG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tQWQub2ZmTG9hZCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjdXN0b21BZC5vblNob3coKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+WOn+eUn+aooeadv+W5v+WRiuaYvuekuicpXHJcbiAgICAgICAgICAgICAgICBjdXN0b21BZC5vZmZTaG93KCk7XHJcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3MgJiYgb25TdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGN1c3RvbUFkLm9uSGlkZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3VzdG9tQWTlub/lkYrpmpDol48nKVxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQWQub2ZmSGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgb25DbG9zZSAmJiBvbkNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21BZC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm1DdXN0b21BRCA9IG51bGw7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGN1c3RvbUFkLnNob3coKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaG93IHN1Y2Nlc3MnKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5tQ3VzdG9tQUQgPSBjdXN0b21BZDtcclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBzeXl4X21hbmFnZXIuY3JlYXRlX3RvYXN0KGVycm9yLmVyckNvZGUgKyAn6ZSZ6K+v77yaJyArICAgZXJyb3IuZXJyTXNnKVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Nob3cgZmFpbCB3aXRoOicgKyBlcnJvci5lcnJDb2RlICsgJywnICsgZXJyb3IuZXJyTXNnKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5tQ3VzdG9tQUQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgb25FcnJvciAmJiBvbkVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5paw5ZOB5bCd6bKcXHJcbiAgICBzdGF0aWMgc2hvd19uZXdfcHJvZHVjdHMoY2FsbF9iYWNrPykge1xyXG5cclxuICAgICAgICBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUudml2b19xZykge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBfYnVzaW5lc3NfY29uZmlnX2RhdGEgPSBzeXl4X21hbmFnZXIuZ2V0X2J1c2luZXNzX2NvbmZpZygpXHJcbiAgICAgICAgLy/liKTmlq3mlrDlk4HlsJ3pspzlvIDlhbNcclxuICAgICAgICBpZiAoX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIF9idXNpbmVzc19jb25maWdfZGF0YVtcImN0cl90ZXN0X29wZW5cIl0pIHtcclxuICAgICAgICAgICAgLy/lvIDlhbPmnInlgLwgIOS4lCDlgLzkuLowIOWFs+mXreWImeiuvue9ruWumuaXtuWZqOWIt+aWsOaZrumAmmJhbm5lclxyXG4gICAgICAgICAgICBpZiAoX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiY3RyX3Rlc3Rfb3BlblwiXS52YWx1ZVswXSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzeXl4X2N0cl9tYW5hZ2VyLnNob3dfbmV3X3Byb2R1Y3RzKGNhbGxfYmFjaylcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiJdfQ==