"use strict";
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