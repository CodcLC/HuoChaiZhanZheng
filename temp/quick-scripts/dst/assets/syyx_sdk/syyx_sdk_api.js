
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/syyx_sdk_api.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '43f24/rXFNOy5rvA7uQxzfv', 'syyx_sdk_api');
// syyx_sdk/syyx_sdk_api.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syyx_sdk_api = void 0;
var syyx_sdk_config_1 = require("./configs/syyx_sdk_config");
var ad_native_interstitial_1 = require("./controller/ad/ad_native_interstitial");
var syyx_adv_manager_1 = require("./controller/ad/syyx_adv_manager");
var syyx_manager_1 = require("./controller/syyx_manager");
var model_1 = require("./model/model");
var syyx_sdk_api = /** @class */ (function () {
    function syyx_sdk_api() {
    }
    /**
     * 初始化
     */
    syyx_sdk_api.init = function (init_callback) {
        console.log("sdk--------------------syyx_apk version" + syyx_sdk_config_1.syyx_const.syyx_sdk_version);
        syyx_manager_1.syyx_manager.init(init_callback);
    };
    syyx_sdk_api.login_channel = function (callback) {
        syyx_manager_1.syyx_manager.login_channel(callback);
    };
    /**如果是外部登录 这里传入一下账号id和用户id，设置了之后就可以调用 打点了
     * 打点 是在sdk的init成功回调以后调用
     * @param account 账号
     * @param user_id 用户id
     */
    syyx_sdk_api.init_param = function (account, user_id) {
        syyx_manager_1.syyx_manager.init_param(account, user_id);
    };
    /**
     * 获取运营配置对应key的值
     * @param key business_config 的 id值
     */
    syyx_sdk_api.get_business_data_by_key = function (key) {
        return syyx_manager_1.syyx_manager.get_business_data_by_key(key);
    };
    /**
     * 上报用户注册
     */
    syyx_sdk_api.send_user_register = function () { };
    /**
     * 上报用户登录
     */
    syyx_sdk_api.send_user_login = function () { };
    /**
     * 上报大厅（主界面）事件
     */
    syyx_sdk_api.send_hall_event = function (event_id, extra2, str1) {
        if (extra2 === void 0) { extra2 = 0; }
        if (str1 === void 0) { str1 = ""; }
    };
    /**
     * 上报关卡事件
     */
    syyx_sdk_api.send_chapter_event = function (event_id, is_win, str1) {
        if (is_win === void 0) { is_win = undefined; }
        if (str1 === void 0) { str1 = ""; }
    };
    /**
     * 上报结算界面事件
     */
    syyx_sdk_api.send_settlement_event = function (event_id, extra, str1) {
        if (extra === void 0) { extra = ""; }
        if (str1 === void 0) { str1 = ""; }
    };
    syyx_sdk_api.send_other_event = function (event_id, event_type, extra, extra2, str1, str2, str3) {
        if (extra === void 0) { extra = ""; }
        if (extra2 === void 0) { extra2 = ""; }
        if (str1 === void 0) { str1 = ""; }
        if (str2 === void 0) { str2 = ""; }
        if (str3 === void 0) { str3 = ""; }
    };
    /**
    * 是否启动ok
    * 如果为true 表明内部sdk初始化ok 并且互推配置文件和运营策略文件都读取好了
    */
    syyx_sdk_api.is_inited = function () {
        return syyx_manager_1.syyx_manager.is_inited();
    };
    /**
    * 获取一个底部原生banner
    */
    syyx_sdk_api.create_native_banner = function (call_back) {
        return syyx_manager_1.syyx_manager.create_native_banner(call_back);
    };
    /**
    * 获取一个带遮罩的原生插屏
    */
    syyx_sdk_api.create_interstitial = function (call_back) {
        return syyx_manager_1.syyx_manager.create_interstitial(call_back);
    };
    /**
    * 获取一个结算原生
    */
    syyx_sdk_api.create_inner_interstitial = function (call_back) {
        return syyx_manager_1.syyx_manager.create_inner_interstitial(call_back);
    };
    /**
    * 获取一个原生icon
    */
    syyx_sdk_api.create_native_icon = function (call_back) {
        return syyx_manager_1.syyx_manager.create_native_icon(call_back);
    };
    /**
    * 创建一个tips提示
    * @param desc
    */
    syyx_sdk_api.create_toast = function (desc) {
        return syyx_manager_1.syyx_manager.create_toast(desc);
    };
    /**
     * 隐藏指定类型的视图
     * @param viewType 视图类型
     */
    syyx_sdk_api.hide = function (viewType) {
        syyx_manager_1.syyx_manager.hide(viewType);
    };
    /**
     * 显示指定视图   （仅限于互推UI使用）
     * @param viewType  视图类型
     * @param zOrder    层级
     * @param scene     当前所在场景的名字          运营使用
     * @param chapter   当前所在关卡或者玩法id      运营使用
     */
    syyx_sdk_api.show = function (viewType, zOrder, scene, chapter) {
        if (zOrder === void 0) { zOrder = -1; }
        if (chapter === void 0) { chapter = 0; }
        syyx_manager_1.syyx_manager.show(viewType, zOrder, scene, chapter);
    };
    /**
     * 根据类型获取视图对象
     * @param viewType 视图类型
     */
    syyx_sdk_api.load_view = function (viewType, call_bcak) {
        return syyx_manager_1.syyx_manager.load_view(viewType, call_bcak);
    };
    //广告相关
    //接口不已废弃
    syyx_sdk_api.create_ad = function (ad_type, ad_pos_id, onLoad, onShow, onClose, onError) {
        return false;
    };
    /**
     * 销毁广告 主要也就是 banner 使用了 一般目前Oppo和vivo隐藏banner 也就是调用destroy了
     * @param ad_type 广告类型 根据 igc.e_ad_type 传入
     *  interstitial = 1,   插屏
        video = 2,          视频
        native = 3,         原生
        banner = 4,         banner
     * @param ad_pos_id     adv配置表广告位id
     */
    syyx_sdk_api.destroy_ad = function (ad_type, ad_pos_id) {
        return syyx_manager_1.syyx_manager.destroy_ad(ad_type, ad_pos_id);
    };
    /**
     * 隐藏广告 主要也就是 banner 目前也不怎么使用了
     * @param ad_type 广告类型 根据 igc.e_ad_type 传入
     *  interstitial = 1,   插屏
        video = 2,          视频
        native = 3,         原生
        banner = 4,         banner
     * @param ad_pos_id     adv配置表广告位id
     */
    syyx_sdk_api.hide_ad = function (ad_type, ad_pos_id) {
        return syyx_manager_1.syyx_manager.hide_ad(ad_type, ad_pos_id);
    };
    /**
     * 原生广告 上报曝光
     * @param ad_pos_id 配置表广告位ID
     * @param native_data 原生数据
     */
    syyx_sdk_api.report_ad_show = function (ad_pos_id, native_data) {
        return syyx_manager_1.syyx_manager.report_ad_show(ad_pos_id, native_data);
    };
    /**
     * 原生广告  上报点击
     * @param ad_pos_id 配置表广告位ID
     * @param ad_unit_id create_ad的onload返回的原生广告信息里面的adUnitId 这个单位ID
     */
    syyx_sdk_api.report_ad_click = function (ad_pos_id, native_data) {
        return syyx_manager_1.syyx_manager.report_ad_click(ad_pos_id, native_data);
    };
    /**
    * 获取加载好的原生数据
    * @param ad_pos_id 配置表原生id
    */
    syyx_sdk_api.get_local_native_data = function (ad_pos_id) {
        return syyx_adv_manager_1.syyx_adv_manager.get_local_native_data(ad_pos_id);
    };
    /**
     * 获取对应渠道的广告id
     * @param ad_pos_id 配置表广告id
     */
    syyx_sdk_api.get_channel_ad_id = function (ad_pos_id) {
        return syyx_adv_manager_1.syyx_adv_manager.get_channel_ad_id(ad_pos_id);
    };
    /**
     * 显示banner
     * oppo vivo---根据后台开关判断是否使用原生banner  每x秒自动刷新(后台配置)  原生banner报错会加载展示普通banner
     * qq tt--- 每x秒自动刷新(后台配置)
     * @param ad_type 广告类型
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     */
    syyx_sdk_api.show_banner = function (ad_pos_id, onLoad, onShow, onClose, onError) {
        syyx_adv_manager_1.syyx_adv_manager.show_banner(igc.e_ad_type.banner, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    syyx_sdk_api.set_banner_height = function () {
        syyx_adv_manager_1.syyx_adv_manager.set_banner_height();
    };
    /**
     * 隐藏banner
     */
    syyx_sdk_api.hide_banner = function () {
        syyx_adv_manager_1.syyx_adv_manager.hide_banner();
    };
    /**
     * 设置能否显示普通banner
     */
    syyx_sdk_api.set_normal_banner_switch = function (value) {
        if (value === void 0) { value = true; }
        syyx_adv_manager_1.syyx_adv_manager.set_normal_banner_switch(value);
    };
    /**
     * 激励视频
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     * @param need_err_tips 默认为false，为true时显示sdk自带的报错飘字
     */
    syyx_sdk_api.show_video = function (ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips) {
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            onClose && onClose(null, { isEnded: true });
            return;
        }
        syyx_manager_1.syyx_manager.show_video(ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips);
    };
    /**
     * 普通插屏
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     */
    syyx_sdk_api.show_interstitial = function (ad_pos_id, onLoad, onShow, onClose, onError) {
        if (syyx_manager_1.syyx_manager.__business_config_data && syyx_manager_1.syyx_manager.__business_config_data["vivo_cp_switch"]) { // 普通插屏开关
            if (syyx_manager_1.syyx_manager.__business_config_data["vivo_cp_switch"].value[0] == 0) {
                onError && onError();
                return;
            }
        }
        syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.interstitial, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    /**
     * 显示带遮罩的原生插屏  会先加载原生数据  加载成功会直接展示UI
     * 黄标
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     */
    syyx_sdk_api.show_native_interstitial = function (ad_pos_id, onLoad, onShow, onClose, onError) {
        syyx_adv_manager_1.syyx_adv_manager.show_native_interstitial(igc.e_ad_type.native, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    /**
     * 隐藏带遮罩的原生插屏UI
     * 黄标
     */
    syyx_sdk_api.hide_native_interstitial = function () {
        ad_native_interstitial_1.ad_native_interstitial.hide_native_interstitial_ui();
    };
    /**
     * 预加载结算原生
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     */
    syyx_sdk_api.preload_native_inner_interstitial = function (ad_pos_id, onLoad, onShow, onClose, onError) {
        syyx_adv_manager_1.syyx_adv_manager.preload_native_inner_interstitial(igc.e_ad_type.native, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    /**
     * 显示结算原生 需要传入父节点
     * 必需预加载好对应的原生数据
     * @param ad_pos_id 配置表广告ID
     * @param parent 父节点
     * @param click_back 结算原生点击回调
     * @param show_back 结算原生显示回调
     * @param hide_back 结算原生隐藏回调
     * @param is_new_type  是否需要结算原生的新形式，仅限ov,默认为true
     */
    syyx_sdk_api.show_native_inner_interstitial = function (ad_pos_id, parent, click_back, show_back, hide_back, is_new_type) {
        if (is_new_type === void 0) { is_new_type = true; }
        syyx_manager_1.syyx_manager.show_native_inner_interstitial(ad_pos_id, parent, click_back, show_back, hide_back, is_new_type);
    };
    /**
     * 点击结算原生
     */
    syyx_sdk_api.click_native_inner_interstitial = function () {
        console.log('上报ysjs-----------');
        syyx_manager_1.syyx_manager.click_native_inner_interstitial();
    };
    syyx_sdk_api.click_native_banner = function () {
        syyx_manager_1.syyx_manager.click_native_banner();
    };
    /**
    * 设置结算原生点击按钮策略
    */
    syyx_sdk_api.set_on_click_inner_interstitial_btn = function (click_back) {
        syyx_adv_manager_1.syyx_adv_manager.set_on_click_inner_interstitial_btn(click_back);
    };
    /**
     * 隐藏结算原生
     *
     */
    syyx_sdk_api.hide_native_inner_interstitial = function () {
        console.log('-- use 隐藏原生广告接口 ----------');
        syyx_manager_1.syyx_manager.hide_native_inner_interstitial();
    };
    /**
     * 隐藏原生banner
     *
     */
    syyx_sdk_api.hide_native_banner = function () {
        syyx_manager_1.syyx_manager.hide_native_banner();
    };
    /**
     * 显示原生icon
     */
    syyx_sdk_api.show_native_icon = function (parent, ad_pos_id, onLoad, onShow, onClose, onError) {
        syyx_adv_manager_1.syyx_adv_manager.show_native_icon(parent, igc.e_ad_type.native, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    /**
     * 隐藏原生icon
     */
    syyx_sdk_api.hide_native_icon = function () {
        syyx_adv_manager_1.syyx_adv_manager.hide_native_icon();
    };
    /**
     * 是否使用oppo的互推盒子
     * 快应用版本号大于
     */
    syyx_sdk_api.support_game_box = function () {
        return syyx_manager_1.syyx_manager.support_game_box();
    };
    /**
     * 显示横幅互推盒子
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     */
    syyx_sdk_api.show_game_banner_box = function (ad_pos_id, onLoad, onShow, onClose, onError) {
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.app_box, ad_pos_id, onLoad, onShow, onClose, onError, igc.e_ad_app_box_type.banner_box);
        }
        else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) { // vivo横幅
            syyx_manager_1.syyx_manager.create_heng_fu_ad(igc.e_ad_type.app_box, ad_pos_id, onLoad, onShow, onClose, onError, igc.e_ad_app_box_type.banner_box);
        }
    };
    /**
     * 隐藏横幅互推盒子
     */
    syyx_sdk_api.hide_game_banner_box = function (ad_pos_id) {
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            syyx_manager_1.syyx_manager.destroy_ad(igc.e_ad_type.app_box, ad_pos_id, igc.e_ad_app_box_type.banner_box);
        }
        else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) { // vivo横幅
            syyx_manager_1.syyx_manager.hide_boxBannerAd_vivo();
        }
    };
    syyx_sdk_api.hide_game_portal_box = function (ad_pos_id) {
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            syyx_manager_1.syyx_manager.destroy_ad(igc.e_ad_type.app_box, ad_pos_id, igc.e_ad_app_box_type.portal_box);
        }
        else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) { // vivo横幅
            syyx_manager_1.syyx_manager.hide_game_portal_box_vivo();
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
    syyx_sdk_api.show_game_portal_box = function (ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips) {
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            syyx_manager_1.syyx_manager.show_game_portal_box(ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips);
        }
        else if (syyx_sdk_config_1.syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) { // vivo九宫格
            syyx_manager_1.syyx_manager.show_game_portal_box_vivo(ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips);
        }
        else {
            // web平台
            syyx_manager_1.syyx_manager.show_game_portal_box(ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips);
        }
    };
    /**
    * vivo 原生模板广告 有插屏 结算 banner
    * @param ad_pos_id adv配置表广告id
    * @param onSuccess 加载成功回调
    * @param onError 展示成功回调
    * @param onClose 关闭回调
    * @param top 原生模板广告组件的左上角纵坐标
    * @param left 原生模板广告组件的左上角横坐标
    */
    syyx_sdk_api.show_original_module_vivo = function (ad_pos_id, onSuccess, onError, onClose, top, left) {
        if (ad_pos_id == '10301001') { // 插屏
            if (syyx_manager_1.syyx_manager.__business_config_data && syyx_manager_1.syyx_manager.__business_config_data["vivo_yscp_switch"]) { // 普通插屏开关
                if (syyx_manager_1.syyx_manager.__business_config_data["vivo_yscp_switch"].value[0] == 0) {
                    onError && onError();
                    return;
                }
            }
        }
        else if (ad_pos_id == '10302001') { // 结算  
            if (syyx_manager_1.syyx_manager.__business_config_data && syyx_manager_1.syyx_manager.__business_config_data["native_inner_interstitial_switch"]) {
                if (syyx_manager_1.syyx_manager.__business_config_data["native_inner_interstitial_switch"].value[0] == 0) {
                    onError && onError();
                    return;
                }
            }
        }
        else if (ad_pos_id == '10304001') { // banner
            if (syyx_manager_1.syyx_manager.__business_config_data && syyx_manager_1.syyx_manager.__business_config_data["native_banner_open_switch"]) { // 普通插屏开关
                if (syyx_manager_1.syyx_manager.__business_config_data["native_banner_open_switch"].value[0] == 0) {
                    onError && onError();
                    return;
                }
            }
        }
        syyx_manager_1.syyx_manager.show_original_module(ad_pos_id, onSuccess, onError, onClose, top, left);
    };
    syyx_sdk_api.show_original_module_oppo = function (ad_pos_id, style, onLoad, onSuccess, onError, onClose) {
        if (ad_pos_id == '10301001') { // 原生插屏
            if (syyx_manager_1.syyx_manager.__business_config_data && syyx_manager_1.syyx_manager.__business_config_data["vivo_yscp_switch"]) { // 插屏开关
                if (syyx_manager_1.syyx_manager.__business_config_data["vivo_yscp_switch"].value[0] == 0) {
                    onError && onError();
                    return;
                }
            }
        }
        else if (ad_pos_id == '10302001') { // 原生结算
            if (syyx_manager_1.syyx_manager.__business_config_data && syyx_manager_1.syyx_manager.__business_config_data["native_inner_interstitial_switch"]) {
                if (syyx_manager_1.syyx_manager.__business_config_data["native_inner_interstitial_switch"].value[0] == 0) {
                    onError && onError();
                    return;
                }
            }
        }
        else if (ad_pos_id == '10304001') { // 原生banner
            if (syyx_manager_1.syyx_manager.__business_config_data && syyx_manager_1.syyx_manager.__business_config_data["native_banner_open_switch"]) { // 原生开关
                if (syyx_manager_1.syyx_manager.__business_config_data["native_banner_open_switch"].value[0] == 0) {
                    onError && onError();
                    return;
                }
            }
        }
        syyx_manager_1.syyx_manager.show_original_module_oppo(ad_pos_id, style, onLoad, onSuccess, onError, onClose);
    };
    /**
    * vivo 原生模板广告 通用的 关闭
    */
    syyx_sdk_api.destory_original_module = function () {
        syyx_manager_1.syyx_manager.destory_original_module();
    };
    /**
    * 盒子广告
    * @param ad_pos_id adv配置表广告id
    * @param onLoad 加载成功回调
    * @param onShow 展示成功回调
    * @param onClose 关闭回调
    * @param onError 报错回调
    */
    syyx_sdk_api.show_app_box = function (ad_pos_id, onLoad, onShow, onClose, onError) {
        syyx_manager_1.syyx_manager.create_ad(igc.e_ad_type.app_box, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    /**
     * 显示积木广告
     */
    syyx_sdk_api.show_block = function (style, ad_pos_id, onLoad, onShow, onClose, onError) {
        syyx_adv_manager_1.syyx_adv_manager.show_block(style, igc.e_ad_type.block, ad_pos_id, onLoad, onShow, onClose, onError);
    };
    /**
     *  隐藏积木广告
     */
    syyx_sdk_api.hide_block = function (ad_pos_id) {
        syyx_adv_manager_1.syyx_adv_manager.hide_block(ad_pos_id);
    };
    /**
     * 隐藏全部积木广告
     */
    syyx_sdk_api.hide_all_block = function () {
        syyx_adv_manager_1.syyx_adv_manager.hide_all_block();
    };
    /**
    * 展示新品尝鲜
    */
    syyx_sdk_api.show_new_products = function (call_back) {
        syyx_manager_1.syyx_manager.show_new_products(call_back);
    };
    /**
     * 判断平台版本号，看是否支持添加桌面功能
     * platformVersion >= 1044;
     */
    syyx_sdk_api.check_can_add_desktop = function () {
        return syyx_manager_1.syyx_manager.check_can_add_desktop();
    };
    /**
     * 检查有没有添加桌面
     * @param can_add  没有添加
     * @param has_add  添加了
     */
    syyx_sdk_api.check_is_add_desktop = function (can_add, has_add) {
        return syyx_manager_1.syyx_manager.check_is_add_desktop(can_add, has_add);
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
    syyx_sdk_api.add_desktop = function (on_success, on_failed, on_failed_back, has_create) {
        return syyx_manager_1.syyx_manager.add_desktop(on_success, on_failed, on_failed_back, has_create);
    };
    /**
     * 后台转前台监听
     * @param callback
     * callback：function(res){
     * }
     */
    syyx_sdk_api.on_show = function (callback) {
        return syyx_manager_1.syyx_manager.on_show(callback);
    };
    /**
     * 转后台监听
     * @param callback
     * callback：function(res){
     * }
     */
    syyx_sdk_api.on_hide = function (callback) {
        return syyx_manager_1.syyx_manager.on_hide(callback);
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
    syyx_sdk_api.get_system_info_sync = function () {
        return syyx_manager_1.syyx_manager.get_system_info_sync();
    };
    /**
     * 获取游戏启动参数
     * scene：场景值
     * query：查询参数
     * referrerInfo：小游戏启动来源
     * entryDataHash：群入口信息
     * extra 小游戏基本信息，包括宿主 Id，gameId，启动场景等参数
    */
    syyx_sdk_api.get_launch_options_sync = function () {
        var options = syyx_manager_1.syyx_manager.get_launch_options_sync();
        var data = new model_1.launch_options();
        data.scene = options.scene || "";
        data.query = options.query || {};
        data.referrerInfo = options.referrerInfo || {};
        data.entryDataHash = options.entryDataHash || {};
        data.extra = options.extra || {};
        return data;
    };
    /**
     * 关闭小游戏
     */
    syyx_sdk_api.exit_mini_program = function () {
        return syyx_manager_1.syyx_manager.exit_mini_program();
    };
    /**
     * 小游戏跳转
     * @param param
     * {
     *   app_id:小游戏包名
     *   success:成功回调
     * }
     */
    syyx_sdk_api.navigate_to_mini_program = function (app_id, succss) {
        return syyx_manager_1.syyx_manager.navigate_to_mini_program(app_id, succss);
    };
    /**
     * 分享卡片
     */
    syyx_sdk_api.share = function (title, imageUrl, query, desc, success, fail) {
        return syyx_manager_1.syyx_manager.share(title, imageUrl, query, desc, success, fail);
    };
    /**
     * 监听右上角分享
     */
    syyx_sdk_api.on_share_app_message = function (title, imageUrl) {
        return syyx_manager_1.syyx_manager.on_share_app_message(title, imageUrl);
    };
    /**
     * 开始录屏
     */
    syyx_sdk_api.start_record_screen = function (time, is_clip_end, clip_time) {
        return syyx_manager_1.syyx_manager.start_record_screen(time, is_clip_end, clip_time);
    };
    /**
     * 结束录屏
     */
    syyx_sdk_api.stop_record_screen = function () {
        return syyx_manager_1.syyx_manager.stop_record_screen();
    };
    /**
     * 暂停录屏
     */
    syyx_sdk_api.pause_record_screen = function () {
        return syyx_manager_1.syyx_manager.pause_record_screen();
    };
    /**
     * 恢复录屏
     */
    syyx_sdk_api.resume_record_screen = function () {
        return syyx_manager_1.syyx_manager.resume_record_screen();
    };
    /**
     * 分享录屏
     */
    syyx_sdk_api.share_record_screen = function (videoTopics, title, desc, imageUrl, query, fail, success) {
        return syyx_manager_1.syyx_manager.share_record_screen(videoTopics, title, desc, imageUrl, query, fail, success);
    };
    /**
     * 获取录屏文件
     */
    syyx_sdk_api.get_record_video = function () {
        return syyx_manager_1.syyx_manager.get_record_video();
    };
    /**
    * 是否为新玩家
    */
    syyx_sdk_api.get_is_new_player = function () {
        return syyx_manager_1.syyx_manager.get_is_new_player();
    };
    /**
    * 获取syyx_app_id
    */
    syyx_sdk_api.get_syyx_app_id = function () {
        return syyx_manager_1.syyx_manager.get_syyx_app_id();
    };
    /** 返回 按钮配置*/
    syyx_sdk_api.GetButtonsData = function () {
        return syyx_manager_1.syyx_manager.GetButtonsData();
    };
    /**
    * 获取当前游戏屏幕舞台与基于1920*1080设计舞台的比例
    */
    syyx_sdk_api.get_screen_ratio = function () {
        if (window["cc"]) {
            if (cc.view.getVisibleSize().width > cc.view.getVisibleSize().height) {
                return cc.view.getVisibleSize().height / 1080;
            }
            else if (cc.view.getVisibleSize().width <= cc.view.getVisibleSize().height) {
                return cc.view.getVisibleSize().width / 1080;
            }
        }
        return 1;
    };
    return syyx_sdk_api;
}());
exports.syyx_sdk_api = syyx_sdk_api;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHN5eXhfc2RrX2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2REFBdUQ7QUFFdkQsaUZBQWdGO0FBQ2hGLHFFQUFvRTtBQUNwRSwwREFBeUQ7QUFDekQsdUNBQTBFO0FBRTFFO0lBQUE7SUF3dUJBLENBQUM7SUF2dUJHOztPQUVHO0lBQ0ssaUJBQUksR0FBWCxVQUFZLGFBQXVCO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEdBQUcsNEJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3BGLDJCQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSwwQkFBYSxHQUFwQixVQUFxQixRQUFrQjtRQUNuQywyQkFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLHVCQUFVLEdBQWpCLFVBQWtCLE9BQWUsRUFBRSxPQUFlO1FBQzlDLDJCQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0kscUNBQXdCLEdBQS9CLFVBQWdDLEdBQUc7UUFDL0IsT0FBTywyQkFBWSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFRDs7T0FFRztJQUNJLCtCQUFrQixHQUF6QixjQUE2QixDQUFDO0lBRTlCOztPQUVHO0lBQ0ksNEJBQWUsR0FBdEIsY0FBMEIsQ0FBQztJQUUzQjs7T0FFRztJQUNJLDRCQUFlLEdBQXRCLFVBQXVCLFFBQVEsRUFBRSxNQUFVLEVBQUUsSUFBUztRQUFyQix1QkFBQSxFQUFBLFVBQVU7UUFBRSxxQkFBQSxFQUFBLFNBQVM7SUFBRyxDQUFDO0lBRTFEOztPQUVHO0lBQ0ksK0JBQWtCLEdBQXpCLFVBQTBCLFFBQVEsRUFBRSxNQUFrQixFQUFFLElBQVM7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OiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN5eXhfY29uc3QgfSBmcm9tIFwiLi9jb25maWdzL3N5eXhfc2RrX2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBlX3N0YXRfZXZlbnRfdHlwZSwgZV9jaGFwdGVyX3Jlc3VsdF90eXBlIH0gZnJvbSBcIi4vY29uZmlncy9zeXl4X3Nka19lbnVtXCI7XHJcbmltcG9ydCB7IGFkX25hdGl2ZV9pbnRlcnN0aXRpYWwgfSBmcm9tIFwiLi9jb250cm9sbGVyL2FkL2FkX25hdGl2ZV9pbnRlcnN0aXRpYWxcIjtcclxuaW1wb3J0IHsgc3l5eF9hZHZfbWFuYWdlciB9IGZyb20gXCIuL2NvbnRyb2xsZXIvYWQvc3l5eF9hZHZfbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBzeXl4X21hbmFnZXIgfSBmcm9tIFwiLi9jb250cm9sbGVyL3N5eXhfbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBzeXl4X3ZpZXcsIG5hdGl2ZV9hZF9kYXRhLCBsYXVuY2hfb3B0aW9ucyB9IGZyb20gXCIuL21vZGVsL21vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3Mgc3l5eF9zZGtfYXBpIHtcclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgICBzdGF0aWMgaW5pdChpbml0X2NhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2RrLS0tLS0tLS0tLS0tLS0tLS0tLS1zeXl4X2FwayB2ZXJzaW9uXCIgKyBzeXl4X2NvbnN0LnN5eXhfc2RrX3ZlcnNpb24pXHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLmluaXQoaW5pdF9jYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvZ2luX2NoYW5uZWwoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLmxvZ2luX2NoYW5uZWwoY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuWmguaenOaYr+WklumDqOeZu+W9lSDov5nph4zkvKDlhaXkuIDkuIvotKblj7dpZOWSjOeUqOaIt2lk77yM6K6+572u5LqG5LmL5ZCO5bCx5Y+v5Lul6LCD55SoIOaJk+eCueS6hlxyXG4gICAgICog5omT54K5IOaYr+WcqHNka+eahGluaXTmiJDlip/lm57osIPku6XlkI7osIPnlKhcclxuICAgICAqIEBwYXJhbSBhY2NvdW50IOi0puWPt1xyXG4gICAgICogQHBhcmFtIHVzZXJfaWQg55So5oi3aWRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluaXRfcGFyYW0oYWNjb3VudDogc3RyaW5nLCB1c2VyX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICBzeXl4X21hbmFnZXIuaW5pdF9wYXJhbShhY2NvdW50LCB1c2VyX2lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlui/kOiQpemFjee9ruWvueW6lGtleeeahOWAvFxyXG4gICAgICogQHBhcmFtIGtleSBidXNpbmVzc19jb25maWcg55qEIGlk5YC8XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRfYnVzaW5lc3NfZGF0YV9ieV9rZXkoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5nZXRfYnVzaW5lc3NfZGF0YV9ieV9rZXkoa2V5KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql55So5oi35rOo5YaMXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZW5kX3VzZXJfcmVnaXN0ZXIoKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql55So5oi355m75b2VXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZW5kX3VzZXJfbG9naW4oKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5aSn5Y6F77yI5Li755WM6Z2i77yJ5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZW5kX2hhbGxfZXZlbnQoZXZlbnRfaWQsIGV4dHJhMiA9IDAsIHN0cjEgPSBcIlwiKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiK5oql5YWz5Y2h5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZW5kX2NoYXB0ZXJfZXZlbnQoZXZlbnRfaWQsIGlzX3dpbiA9IHVuZGVmaW5lZCwgc3RyMSA9IFwiXCIpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIrmiqXnu5PnrpfnlYzpnaLkuovku7ZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNlbmRfc2V0dGxlbWVudF9ldmVudChldmVudF9pZCwgZXh0cmEgPSBcIlwiLCBzdHIxID0gXCJcIikge31cclxuXHJcbiAgICBzdGF0aWMgc2VuZF9vdGhlcl9ldmVudChldmVudF9pZCwgZXZlbnRfdHlwZSwgZXh0cmEgPSBcIlwiLCBleHRyYTIgPSBcIlwiLCBzdHIxID0gXCJcIiwgc3RyMiA9IFwiXCIsIHN0cjMgPSBcIlwiKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmmK/lkKblkK/liqhva1xyXG4gICAgKiDlpoLmnpzkuLp0cnVlIOihqOaYjuWGhemDqHNka+WIneWni+WMlm9rIOW5tuS4lOS6kuaOqOmFjee9ruaWh+S7tuWSjOi/kOiQpeetlueVpeaWh+S7tumDveivu+WPluWlveS6hlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBpc19pbml0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5pc19pbml0ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W5LiA5Liq5bqV6YOo5Y6f55SfYmFubmVyXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZV9uYXRpdmVfYmFubmVyKGNhbGxfYmFjaz8pIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLmNyZWF0ZV9uYXRpdmVfYmFubmVyKGNhbGxfYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+WPluS4gOS4quW4pumBrue9qeeahOWOn+eUn+aPkuWxj1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBjcmVhdGVfaW50ZXJzdGl0aWFsKGNhbGxfYmFjaz8pIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLmNyZWF0ZV9pbnRlcnN0aXRpYWwoY2FsbF9iYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W5LiA5Liq57uT566X5Y6f55SfXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZV9pbm5lcl9pbnRlcnN0aXRpYWwoY2FsbF9iYWNrPykge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIuY3JlYXRlX2lubmVyX2ludGVyc3RpdGlhbChjYWxsX2JhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDojrflj5bkuIDkuKrljp/nlJ9pY29uXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZV9uYXRpdmVfaWNvbihjYWxsX2JhY2s/KSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5jcmVhdGVfbmF0aXZlX2ljb24oY2FsbF9iYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5Yib5bu65LiA5LiqdGlwc+aPkOekulxyXG4gICAgKiBAcGFyYW0gZGVzYyBcclxuICAgICovXHJcbiAgICBzdGF0aWMgY3JlYXRlX3RvYXN0KGRlc2MpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIuY3JlYXRlX3RvYXN0KGRlc2MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5oyH5a6a57G75Z6L55qE6KeG5Zu+XHJcbiAgICAgKiBAcGFyYW0gdmlld1R5cGUg6KeG5Zu+57G75Z6LXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlKHZpZXdUeXBlOiBzeXl4X3ZpZXcpIHtcclxuICAgICAgICBzeXl4X21hbmFnZXIuaGlkZSh2aWV3VHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrmjIflrprop4blm74gICDvvIjku4XpmZDkuo7kupLmjqhVSeS9v+eUqO+8iVxyXG4gICAgICogQHBhcmFtIHZpZXdUeXBlICDop4blm77nsbvlnotcclxuICAgICAqIEBwYXJhbSB6T3JkZXIgICAg5bGC57qnXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgICAgIOW9k+WJjeaJgOWcqOWcuuaZr+eahOWQjeWtlyAgICAgICAgICDov5DokKXkvb/nlKhcclxuICAgICAqIEBwYXJhbSBjaGFwdGVyICAg5b2T5YmN5omA5Zyo5YWz5Y2h5oiW6ICF546p5rOVaWQgICAgICDov5DokKXkvb/nlKhcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNob3codmlld1R5cGU6IHN5eXhfdmlldywgek9yZGVyID0gLTEsIHNjZW5lPzogc3RyaW5nLCBjaGFwdGVyID0gMCkge1xyXG4gICAgICAgIHN5eXhfbWFuYWdlci5zaG93KHZpZXdUeXBlLCB6T3JkZXIsIHNjZW5lLCBjaGFwdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruexu+Wei+iOt+WPluinhuWbvuWvueixoVxyXG4gICAgICogQHBhcmFtIHZpZXdUeXBlIOinhuWbvuexu+Wei1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZF92aWV3KHZpZXdUeXBlOiBzeXl4X3ZpZXcsIGNhbGxfYmNhaz8pIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLmxvYWRfdmlldyh2aWV3VHlwZSwgY2FsbF9iY2FrKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bm/5ZGK55u45YWzXHJcbiAgICAvL+aOpeWPo+S4jeW3suW6n+W8g1xyXG4gICAgc3RhdGljIGNyZWF0ZV9hZChhZF90eXBlOiBpZ2MuZV9hZF90eXBlLCBhZF9wb3NfaWQ6IHN0cmluZywgb25Mb2FkOiBGdW5jdGlvbiwgb25TaG93OiBGdW5jdGlvbiwgb25DbG9zZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4Hlub/lkYog5Li76KaB5Lmf5bCx5pivIGJhbm5lciDkvb/nlKjkuoYg5LiA6Iis55uu5YmNT3Bwb+WSjHZpdm/pmpDol49iYW5uZXIg5Lmf5bCx5piv6LCD55SoZGVzdHJveeS6hiBcclxuICAgICAqIEBwYXJhbSBhZF90eXBlIOW5v+WRiuexu+WeiyDmoLnmja4gaWdjLmVfYWRfdHlwZSDkvKDlhaVcclxuICAgICAqICBpbnRlcnN0aXRpYWwgPSAxLCAgIOaPkuWxj1xyXG4gICAgICAgIHZpZGVvID0gMiwgICAgICAgICAg6KeG6aKRXHJcbiAgICAgICAgbmF0aXZlID0gMywgICAgICAgICDljp/nlJ9cclxuICAgICAgICBiYW5uZXIgPSA0LCAgICAgICAgIGJhbm5lclxyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCAgICAgYWR26YWN572u6KGo5bm/5ZGK5L2NaWRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRlc3Ryb3lfYWQoYWRfdHlwZTogaWdjLmVfYWRfdHlwZSwgYWRfcG9zX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLmRlc3Ryb3lfYWQoYWRfdHlwZSwgYWRfcG9zX2lkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+W5v+WRiiDkuLvopoHkuZ/lsLHmmK8gYmFubmVyIOebruWJjeS5n+S4jeaAjuS5iOS9v+eUqOS6hlxyXG4gICAgICogQHBhcmFtIGFkX3R5cGUg5bm/5ZGK57G75Z6LIOagueaNriBpZ2MuZV9hZF90eXBlIOS8oOWFpVxyXG4gICAgICogIGludGVyc3RpdGlhbCA9IDEsICAg5o+S5bGPXHJcbiAgICAgICAgdmlkZW8gPSAyLCAgICAgICAgICDop4bpopFcclxuICAgICAgICBuYXRpdmUgPSAzLCAgICAgICAgIOWOn+eUn1xyXG4gICAgICAgIGJhbm5lciA9IDQsICAgICAgICAgYmFubmVyXHJcbiAgICAgKiBAcGFyYW0gYWRfcG9zX2lkICAgICBhZHbphY3nva7ooajlub/lkYrkvY1pZFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZV9hZChhZF90eXBlOiBpZ2MuZV9hZF90eXBlLCBhZF9wb3NfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIuaGlkZV9hZChhZF90eXBlLCBhZF9wb3NfaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55Sf5bm/5ZGKIOS4iuaKpeabneWFiVxyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCDphY3nva7ooajlub/lkYrkvY1JRFxyXG4gICAgICogQHBhcmFtIG5hdGl2ZV9kYXRhIOWOn+eUn+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVwb3J0X2FkX3Nob3coYWRfcG9zX2lkOiBzdHJpbmcsIG5hdGl2ZV9kYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5yZXBvcnRfYWRfc2hvdyhhZF9wb3NfaWQsIG5hdGl2ZV9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOn+eUn+W5v+WRiiAg5LiK5oql54K55Ye7XHJcbiAgICAgKiBAcGFyYW0gYWRfcG9zX2lkIOmFjee9ruihqOW5v+WRiuS9jUlEXHJcbiAgICAgKiBAcGFyYW0gYWRfdW5pdF9pZCBjcmVhdGVfYWTnmoRvbmxvYWTov5Tlm57nmoTljp/nlJ/lub/lkYrkv6Hmga/ph4zpnaLnmoRhZFVuaXRJZCDov5nkuKrljZXkvY1JRFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVwb3J0X2FkX2NsaWNrKGFkX3Bvc19pZDogc3RyaW5nLCBuYXRpdmVfZGF0YT8pIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLnJlcG9ydF9hZF9jbGljayhhZF9wb3NfaWQsIG5hdGl2ZV9kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W5Yqg6L295aW955qE5Y6f55Sf5pWw5o2uXHJcbiAgICAqIEBwYXJhbSBhZF9wb3NfaWQg6YWN572u6KGo5Y6f55SfaWRcclxuICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X2xvY2FsX25hdGl2ZV9kYXRhKGFkX3Bvc19pZCk6IG5hdGl2ZV9hZF9kYXRhIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9hZHZfbWFuYWdlci5nZXRfbG9jYWxfbmF0aXZlX2RhdGEoYWRfcG9zX2lkKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5a+55bqU5rig6YGT55qE5bm/5ZGKaWRcclxuICAgICAqIEBwYXJhbSBhZF9wb3NfaWQg6YWN572u6KGo5bm/5ZGKaWRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldF9jaGFubmVsX2FkX2lkKGFkX3Bvc19pZCkge1xyXG4gICAgICAgIHJldHVybiBzeXl4X2Fkdl9tYW5hZ2VyLmdldF9jaGFubmVsX2FkX2lkKGFkX3Bvc19pZClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekumJhbm5lclxyXG4gICAgICogb3BwbyB2aXZvLS0t5qC55o2u5ZCO5Y+w5byA5YWz5Yik5pat5piv5ZCm5L2/55So5Y6f55SfYmFubmVyICDmr49456eS6Ieq5Yqo5Yi35pawKOWQjuWPsOmFjee9rikgIOWOn+eUn2Jhbm5lcuaKpemUmeS8muWKoOi9veWxleekuuaZrumAmmJhbm5lclxyXG4gICAgICogcXEgdHQtLS0g5q+PeOenkuiHquWKqOWIt+aWsCjlkI7lj7DphY3nva4pXHJcbiAgICAgKiBAcGFyYW0gYWRfdHlwZSDlub/lkYrnsbvlnotcclxuICAgICAqIEBwYXJhbSBhZF9wb3NfaWQgYWR26YWN572u6KGo5bm/5ZGKaWRcclxuICAgICAqIEBwYXJhbSBvbkxvYWQg5Yqg6L295oiQ5Yqf5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gb25TaG93IOWxleekuuaIkOWKn+Wbnuiwg1xyXG4gICAgICogQHBhcmFtIG9uQ2xvc2Ug5YWz6Zet5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gb25FcnJvciDmiqXplJnlm57osINcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNob3dfYmFubmVyKGFkX3Bvc19pZDogc3RyaW5nLCBvbkxvYWQ6IEZ1bmN0aW9uLCBvblNob3c6IEZ1bmN0aW9uLCBvbkNsb3NlOiBGdW5jdGlvbiwgb25FcnJvcjogRnVuY3Rpb24pIHtcclxuICAgICAgICBzeXl4X2Fkdl9tYW5hZ2VyLnNob3dfYmFubmVyKGlnYy5lX2FkX3R5cGUuYmFubmVyLCBhZF9wb3NfaWQsIG9uTG9hZCwgb25TaG93LCBvbkNsb3NlLCBvbkVycm9yKVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc3RhdGljIHNldF9iYW5uZXJfaGVpZ2h0KCkge1xyXG4gICAgICAgIHN5eXhfYWR2X21hbmFnZXIuc2V0X2Jhbm5lcl9oZWlnaHQoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JePYmFubmVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlX2Jhbm5lcigpIHtcclxuICAgICAgICBzeXl4X2Fkdl9tYW5hZ2VyLmhpZGVfYmFubmVyKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruiDveWQpuaYvuekuuaZrumAmmJhbm5lciBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldF9ub3JtYWxfYmFubmVyX3N3aXRjaCh2YWx1ZSA9IHRydWUpIHtcclxuICAgICAgICBzeXl4X2Fkdl9tYW5hZ2VyLnNldF9ub3JtYWxfYmFubmVyX3N3aXRjaCh2YWx1ZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa/gOWKseinhumikVxyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCBhZHbphY3nva7ooajlub/lkYppZFxyXG4gICAgICogQHBhcmFtIG9uTG9hZCDliqDovb3miJDlip/lm57osINcclxuICAgICAqIEBwYXJhbSBvblNob3cg5bGV56S65oiQ5Yqf5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gb25DbG9zZSDlhbPpl63lm57osINcclxuICAgICAqIEBwYXJhbSBvbkVycm9yIOaKpemUmeWbnuiwg1xyXG4gICAgICogQHBhcmFtIG5lZWRfZXJyX3RpcHMg6buY6K6k5Li6ZmFsc2XvvIzkuLp0cnVl5pe25pi+56S6c2Rr6Ieq5bim55qE5oql6ZSZ6aOY5a2XXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaG93X3ZpZGVvKGFkX3Bvc19pZDogc3RyaW5nLCBvbkxvYWQ6IEZ1bmN0aW9uLCBvblNob3c6IEZ1bmN0aW9uLCBvbkNsb3NlOiBGdW5jdGlvbiwgb25FcnJvcjogRnVuY3Rpb24sIG5lZWRfZXJyX3RpcHM/OiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLndlYikge1xyXG4gICAgICAgICAgICBvbkNsb3NlICYmIG9uQ2xvc2UobnVsbCwgeyBpc0VuZGVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBzeXl4X21hbmFnZXIuc2hvd192aWRlbyhhZF9wb3NfaWQsIG9uTG9hZCwgb25TaG93LCBvbkNsb3NlLCBvbkVycm9yLCBuZWVkX2Vycl90aXBzKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pmu6YCa5o+S5bGPXHJcbiAgICAgKiBAcGFyYW0gYWRfcG9zX2lkIGFkdumFjee9ruihqOW5v+WRimlkXHJcbiAgICAgKiBAcGFyYW0gb25Mb2FkIOWKoOi9veaIkOWKn+Wbnuiwg1xyXG4gICAgICogQHBhcmFtIG9uU2hvdyDlsZXnpLrmiJDlip/lm57osINcclxuICAgICAqIEBwYXJhbSBvbkNsb3NlIOWFs+mXreWbnuiwg1xyXG4gICAgICogQHBhcmFtIG9uRXJyb3Ig5oql6ZSZ5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaG93X2ludGVyc3RpdGlhbChhZF9wb3NfaWQ6IHN0cmluZywgb25Mb2FkOiBGdW5jdGlvbiwgb25TaG93OiBGdW5jdGlvbiwgb25DbG9zZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIGlmKHN5eXhfbWFuYWdlci5fX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHN5eXhfbWFuYWdlci5fX2J1c2luZXNzX2NvbmZpZ19kYXRhW1widml2b19jcF9zd2l0Y2hcIl0pIHsgLy8g5pmu6YCa5o+S5bGP5byA5YWzXHJcbiAgICAgICAgICAgIGlmIChzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YVtcInZpdm9fY3Bfc3dpdGNoXCJdLnZhbHVlWzBdID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLmNyZWF0ZV9hZChpZ2MuZV9hZF90eXBlLmludGVyc3RpdGlhbCwgYWRfcG9zX2lkLCBvbkxvYWQsIG9uU2hvdywgb25DbG9zZSwgb25FcnJvcilcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrluKbpga7nvannmoTljp/nlJ/mj5LlsY8gIOS8muWFiOWKoOi9veWOn+eUn+aVsOaNriAg5Yqg6L295oiQ5Yqf5Lya55u05o6l5bGV56S6VUlcclxuICAgICAqIOm7hOagh1xyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCBhZHbphY3nva7ooajlub/lkYppZFxyXG4gICAgICogQHBhcmFtIG9uTG9hZCDliqDovb3miJDlip/lm57osINcclxuICAgICAqIEBwYXJhbSBvblNob3cg5bGV56S65oiQ5Yqf5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gb25DbG9zZSDlhbPpl63lm57osINcclxuICAgICAqIEBwYXJhbSBvbkVycm9yIOaKpemUmeWbnuiwg1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2hvd19uYXRpdmVfaW50ZXJzdGl0aWFsKGFkX3Bvc19pZDogc3RyaW5nLCBvbkxvYWQ6IEZ1bmN0aW9uLCBvblNob3c6IEZ1bmN0aW9uLCBvbkNsb3NlOiBGdW5jdGlvbiwgb25FcnJvcjogRnVuY3Rpb24pIHtcclxuICAgICAgICBzeXl4X2Fkdl9tYW5hZ2VyLnNob3dfbmF0aXZlX2ludGVyc3RpdGlhbChpZ2MuZV9hZF90eXBlLm5hdGl2ZSwgYWRfcG9zX2lkLCBvbkxvYWQsIG9uU2hvdywgb25DbG9zZSwgb25FcnJvcilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+W4pumBrue9qeeahOWOn+eUn+aPkuWxj1VJXHJcbiAgICAgKiDpu4TmoIdcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVfbmF0aXZlX2ludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICBhZF9uYXRpdmVfaW50ZXJzdGl0aWFsLmhpZGVfbmF0aXZlX2ludGVyc3RpdGlhbF91aSgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpooTliqDovb3nu5Pnrpfljp/nlJ9cclxuICAgICAqIEBwYXJhbSBhZF9wb3NfaWQgYWR26YWN572u6KGo5bm/5ZGKaWRcclxuICAgICAqIEBwYXJhbSBvbkxvYWQg5Yqg6L295oiQ5Yqf5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gb25TaG93IOWxleekuuaIkOWKn+Wbnuiwg1xyXG4gICAgICogQHBhcmFtIG9uQ2xvc2Ug5YWz6Zet5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gb25FcnJvciDmiqXplJnlm57osINcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHByZWxvYWRfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbChhZF9wb3NfaWQ6IHN0cmluZywgb25Mb2FkOiBGdW5jdGlvbiwgb25TaG93OiBGdW5jdGlvbiwgb25DbG9zZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5wcmVsb2FkX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwoaWdjLmVfYWRfdHlwZS5uYXRpdmUsIGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csIG9uQ2xvc2UsIG9uRXJyb3IpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnu5Pnrpfljp/nlJ8g6ZyA6KaB5Lyg5YWl54i26IqC54K5XHJcbiAgICAgKiDlv4XpnIDpooTliqDovb3lpb3lr7nlupTnmoTljp/nlJ/mlbDmja5cclxuICAgICAqIEBwYXJhbSBhZF9wb3NfaWQg6YWN572u6KGo5bm/5ZGKSURcclxuICAgICAqIEBwYXJhbSBwYXJlbnQg54i26IqC54K5XHJcbiAgICAgKiBAcGFyYW0gY2xpY2tfYmFjayDnu5Pnrpfljp/nlJ/ngrnlh7vlm57osINcclxuICAgICAqIEBwYXJhbSBzaG93X2JhY2sg57uT566X5Y6f55Sf5pi+56S65Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gaGlkZV9iYWNrIOe7k+eul+WOn+eUn+makOiXj+Wbnuiwg1xyXG4gICAgICogQHBhcmFtIGlzX25ld190eXBlICDmmK/lkKbpnIDopoHnu5Pnrpfljp/nlJ/nmoTmlrDlvaLlvI/vvIzku4XpmZBvdizpu5jorqTkuLp0cnVlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaG93X25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwoYWRfcG9zX2lkLCBwYXJlbnQsIGNsaWNrX2JhY2s/OiBGdW5jdGlvbiwgc2hvd19iYWNrPzogRnVuY3Rpb24sIGhpZGVfYmFjaz86IEZ1bmN0aW9uLCBpc19uZXdfdHlwZSA9IHRydWUpIHtcclxuICAgICAgICBzeXl4X21hbmFnZXIuc2hvd19uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsKGFkX3Bvc19pZCwgcGFyZW50LCBjbGlja19iYWNrLCBzaG93X2JhY2ssIGhpZGVfYmFjaywgaXNfbmV3X3R5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vnu5Pnrpfljp/nlJ9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNsaWNrX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+S4iuaKpXlzanMtLS0tLS0tLS0tLScpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN5eXhfbWFuYWdlci5jbGlja19uYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsKCkgXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNsaWNrX25hdGl2ZV9iYW5uZXIoKSB7XHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLmNsaWNrX25hdGl2ZV9iYW5uZXIoKSBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6K6+572u57uT566X5Y6f55Sf54K55Ye75oyJ6ZKu562W55WlXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHNldF9vbl9jbGlja19pbm5lcl9pbnRlcnN0aXRpYWxfYnRuKGNsaWNrX2JhY2s/KSB7XHJcbiAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5zZXRfb25fY2xpY2tfaW5uZXJfaW50ZXJzdGl0aWFsX2J0bihjbGlja19iYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP57uT566X5Y6f55SfXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnLS0gdXNlIOmakOiXj+WOn+eUn+W5v+WRiuaOpeWPoyAtLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLmhpZGVfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCgpIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqQ6JeP5Y6f55SfYmFubmVyXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVfbmF0aXZlX2Jhbm5lcigpIHtcclxuICAgICAgICBzeXl4X21hbmFnZXIuaGlkZV9uYXRpdmVfYmFubmVyKCkgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrljp/nlJ9pY29uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaG93X25hdGl2ZV9pY29uKHBhcmVudCwgYWRfcG9zX2lkPzogc3RyaW5nLCBvbkxvYWQ/OiBGdW5jdGlvbiwgb25TaG93PzogRnVuY3Rpb24sIG9uQ2xvc2U/OiBGdW5jdGlvbiwgb25FcnJvcj86IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgc3l5eF9hZHZfbWFuYWdlci5zaG93X25hdGl2ZV9pY29uKHBhcmVudCwgaWdjLmVfYWRfdHlwZS5uYXRpdmUsIGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csIG9uQ2xvc2UsIG9uRXJyb3IpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/ljp/nlJ9pY29uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlX25hdGl2ZV9pY29uKCkge1xyXG4gICAgICAgIHN5eXhfYWR2X21hbmFnZXIuaGlkZV9uYXRpdmVfaWNvbigpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkvb/nlKhvcHBv55qE5LqS5o6o55uS5a2QXHJcbiAgICAgKiDlv6vlupTnlKjniYjmnKzlj7flpKfkuo5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHN1cHBvcnRfZ2FtZV9ib3goKSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5zdXBwb3J0X2dhbWVfYm94KClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuaoquW5heS6kuaOqOebkuWtkFxyXG4gICAgICogQHBhcmFtIGFkX3Bvc19pZCBhZHbphY3nva7ooajlub/lkYppZFxyXG4gICAgICogQHBhcmFtIG9uTG9hZCDliqDovb3miJDlip/lm57osINcclxuICAgICAqIEBwYXJhbSBvblNob3cg5bGV56S65oiQ5Yqf5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gb25DbG9zZSDlhbPpl63lm57osINcclxuICAgICAqIEBwYXJhbSBvbkVycm9yIOaKpemUmeWbnuiwg1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2hvd19nYW1lX2Jhbm5lcl9ib3goYWRfcG9zX2lkOiBzdHJpbmcsIG9uTG9hZDogRnVuY3Rpb24sIG9uU2hvdzogRnVuY3Rpb24sIG9uQ2xvc2U6IEZ1bmN0aW9uLCBvbkVycm9yOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS5vcHBvX3FnKSB7XHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5jcmVhdGVfYWQoaWdjLmVfYWRfdHlwZS5hcHBfYm94LCBhZF9wb3NfaWQsIG9uTG9hZCwgb25TaG93LCBvbkNsb3NlLCBvbkVycm9yLCBpZ2MuZV9hZF9hcHBfYm94X3R5cGUuYmFubmVyX2JveClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUudml2b19xZykgeyAvLyB2aXZv5qiq5bmFXHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5jcmVhdGVfaGVuZ19mdV9hZChpZ2MuZV9hZF90eXBlLmFwcF9ib3gsIGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csIG9uQ2xvc2UsIG9uRXJyb3IsIGlnYy5lX2FkX2FwcF9ib3hfdHlwZS5iYW5uZXJfYm94KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmakOiXj+aoquW5heS6kuaOqOebkuWtkFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZV9nYW1lX2Jhbm5lcl9ib3goYWRfcG9zX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUub3Bwb19xZykge1xyXG4gICAgICAgICAgICBzeXl4X21hbmFnZXIuZGVzdHJveV9hZChpZ2MuZV9hZF90eXBlLmFwcF9ib3gsIGFkX3Bvc19pZCwgaWdjLmVfYWRfYXBwX2JveF90eXBlLmJhbm5lcl9ib3gpIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS52aXZvX3FnKSB7IC8vIHZpdm/mqKrluYVcclxuICAgICAgICAgICAgc3l5eF9tYW5hZ2VyLmhpZGVfYm94QmFubmVyQWRfdml2bygpIFxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoaWRlX2dhbWVfcG9ydGFsX2JveChhZF9wb3NfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX2NoYW5uZWwgPT09IGlnYy5lX2NoYW5uZWxfdHlwZS5vcHBvX3FnKSB7XHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5kZXN0cm95X2FkKGlnYy5lX2FkX3R5cGUuYXBwX2JveCwgYWRfcG9zX2lkLCBpZ2MuZV9hZF9hcHBfYm94X3R5cGUucG9ydGFsX2JveCkgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHN5eXhfY29uc3Quc3l5eF9zZGtfY2hhbm5lbCA9PT0gaWdjLmVfY2hhbm5lbF90eXBlLnZpdm9fcWcpIHsgLy8gdml2b+aoquW5hVxyXG4gICAgICAgICAgICBzeXl4X21hbmFnZXIuaGlkZV9nYW1lX3BvcnRhbF9ib3hfdml2bygpIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG9wcG/kuZ3lrqvmoLzkupLmjqjnm5LlrZBcclxuICAgICAqIEBwYXJhbSBhZF9wb3NfaWQgYWR26YWN572u6KGo5bm/5ZGKaWRcclxuICAgICAqIEBwYXJhbSBvbkxvYWQg5Yqg6L295oiQ5Yqf5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gb25TaG93IOWxleekuuaIkOWKn+Wbnuiwg1xyXG4gICAgICogQHBhcmFtIG9uQ2xvc2Ug5YWz6Zet5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gb25FcnJvciDmiqXplJnlm57osINcclxuICAgICAqIEBwYXJhbSBuZWVkX2Vycl90aXBzIOm7mOiupOS4umZhbHNl77yM5Li6dHJ1ZeaXtuaYvuekunNka+iHquW4pueahOaKpemUmemjmOWtl1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2hvd19nYW1lX3BvcnRhbF9ib3goYWRfcG9zX2lkOiBzdHJpbmcsIG9uTG9hZDogRnVuY3Rpb24sIG9uU2hvdzogRnVuY3Rpb24sIG9uQ2xvc2U6IEZ1bmN0aW9uLCBvbkVycm9yOiBGdW5jdGlvbiwgbmVlZF9lcnJfdGlwcz86IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUub3Bwb19xZykge1xyXG4gICAgICAgICAgICBzeXl4X21hbmFnZXIuc2hvd19nYW1lX3BvcnRhbF9ib3goYWRfcG9zX2lkLCBvbkxvYWQsIG9uU2hvdywgb25DbG9zZSwgb25FcnJvciwgbmVlZF9lcnJfdGlwcylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUudml2b19xZykgeyAvLyB2aXZv5Lmd5a6r5qC8XHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5zaG93X2dhbWVfcG9ydGFsX2JveF92aXZvKGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csIG9uQ2xvc2UsIG9uRXJyb3IsIG5lZWRfZXJyX3RpcHMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gd2Vi5bmz5Y+wXHJcbiAgICAgICAgICAgIHN5eXhfbWFuYWdlci5zaG93X2dhbWVfcG9ydGFsX2JveChhZF9wb3NfaWQsIG9uTG9hZCwgb25TaG93LCBvbkNsb3NlLCBvbkVycm9yLCBuZWVkX2Vycl90aXBzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogdml2byDljp/nlJ/mqKHmnb/lub/lkYog5pyJ5o+S5bGPIOe7k+eulyBiYW5uZXJcclxuICAgICogQHBhcmFtIGFkX3Bvc19pZCBhZHbphY3nva7ooajlub/lkYppZFxyXG4gICAgKiBAcGFyYW0gb25TdWNjZXNzIOWKoOi9veaIkOWKn+Wbnuiwg1xyXG4gICAgKiBAcGFyYW0gb25FcnJvciDlsZXnpLrmiJDlip/lm57osINcclxuICAgICogQHBhcmFtIG9uQ2xvc2Ug5YWz6Zet5Zue6LCDXHJcbiAgICAqIEBwYXJhbSB0b3Ag5Y6f55Sf5qih5p2/5bm/5ZGK57uE5Lu255qE5bem5LiK6KeS57q15Z2Q5qCHXHJcbiAgICAqIEBwYXJhbSBsZWZ0IOWOn+eUn+aooeadv+W5v+WRiue7hOS7tueahOW3puS4iuinkuaoquWdkOagh1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBzaG93X29yaWdpbmFsX21vZHVsZV92aXZvKGFkX3Bvc19pZDogc3RyaW5nLCBvblN1Y2Nlc3M/OiBGdW5jdGlvbiwgb25FcnJvcj86IEZ1bmN0aW9uLCBvbkNsb3NlPzogRnVuY3Rpb24sIHRvcD86bnVtYmVyLCBsZWZ0PzpudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYoYWRfcG9zX2lkID09ICcxMDMwMTAwMScpIHsgLy8g5o+S5bGPXHJcbiAgICAgICAgICAgIGlmKHN5eXhfbWFuYWdlci5fX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHN5eXhfbWFuYWdlci5fX2J1c2luZXNzX2NvbmZpZ19kYXRhW1widml2b195c2NwX3N3aXRjaFwiXSkgeyAvLyDmma7pgJrmj5LlsY/lvIDlhbNcclxuICAgICAgICAgICAgICAgIGlmIChzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YVtcInZpdm9feXNjcF9zd2l0Y2hcIl0udmFsdWVbMF0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYoYWRfcG9zX2lkID09ICcxMDMwMjAwMScpIHsgLy8g57uT566XICBcclxuICAgICAgICAgICAgaWYoc3l5eF9tYW5hZ2VyLl9fYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgc3l5eF9tYW5hZ2VyLl9fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsX3N3aXRjaFwiXSkgeyBcclxuICAgICAgICAgICAgICAgIGlmIChzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxfc3dpdGNoXCJdLnZhbHVlWzBdID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmKGFkX3Bvc19pZCA9PSAnMTAzMDQwMDEnKSB7IC8vIGJhbm5lclxyXG4gICAgICAgICAgICBpZihzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YSAmJiBzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9iYW5uZXJfb3Blbl9zd2l0Y2hcIl0pIHsgLy8g5pmu6YCa5o+S5bGP5byA5YWzXHJcbiAgICAgICAgICAgICAgICBpZiAoc3l5eF9tYW5hZ2VyLl9fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJuYXRpdmVfYmFubmVyX29wZW5fc3dpdGNoXCJdLnZhbHVlWzBdID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN5eXhfbWFuYWdlci5zaG93X29yaWdpbmFsX21vZHVsZShhZF9wb3NfaWQsIG9uU3VjY2Vzcywgb25FcnJvciwgb25DbG9zZSwgdG9wLCBsZWZ0KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzaG93X29yaWdpbmFsX21vZHVsZV9vcHBvKGFkX3Bvc19pZDogc3RyaW5nLCBzdHlsZTogbnVtYmVyW10sIG9uTG9hZDogRnVuY3Rpb24sIG9uU3VjY2VzczogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uLCBvbkNsb3NlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmKGFkX3Bvc19pZCA9PSAnMTAzMDEwMDEnKSB7IC8vIOWOn+eUn+aPkuWxj1xyXG4gICAgICAgICAgICBpZihzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YSAmJiBzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YVtcInZpdm9feXNjcF9zd2l0Y2hcIl0pIHsgLy8g5o+S5bGP5byA5YWzXHJcbiAgICAgICAgICAgICAgICBpZiAoc3l5eF9tYW5hZ2VyLl9fYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJ2aXZvX3lzY3Bfc3dpdGNoXCJdLnZhbHVlWzBdID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkVycm9yICYmIG9uRXJyb3IoKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmKGFkX3Bvc19pZCA9PSAnMTAzMDIwMDEnKSB7IC8vIOWOn+eUn+e7k+eul1xyXG4gICAgICAgICAgICBpZihzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YSAmJiBzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxfc3dpdGNoXCJdKSB7IFxyXG4gICAgICAgICAgICAgICAgaWYgKHN5eXhfbWFuYWdlci5fX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbF9zd2l0Y2hcIl0udmFsdWVbMF0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYoYWRfcG9zX2lkID09ICcxMDMwNDAwMScpIHsgLy8g5Y6f55SfYmFubmVyXHJcbiAgICAgICAgICAgIGlmKHN5eXhfbWFuYWdlci5fX2J1c2luZXNzX2NvbmZpZ19kYXRhICYmIHN5eXhfbWFuYWdlci5fX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wibmF0aXZlX2Jhbm5lcl9vcGVuX3N3aXRjaFwiXSkgeyAvLyDljp/nlJ/lvIDlhbNcclxuICAgICAgICAgICAgICAgIGlmIChzeXl4X21hbmFnZXIuX19idXNpbmVzc19jb25maWdfZGF0YVtcIm5hdGl2ZV9iYW5uZXJfb3Blbl9zd2l0Y2hcIl0udmFsdWVbMF0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IgJiYgb25FcnJvcigpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLnNob3dfb3JpZ2luYWxfbW9kdWxlX29wcG8oYWRfcG9zX2lkLCBzdHlsZSwgb25Mb2FkLCBvblN1Y2Nlc3MsIG9uRXJyb3IsIG9uQ2xvc2UpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIHZpdm8g5Y6f55Sf5qih5p2/5bm/5ZGKIOmAmueUqOeahCDlhbPpl60gIFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBkZXN0b3J5X29yaWdpbmFsX21vZHVsZSgpIHtcclxuICAgICAgICBzeXl4X21hbmFnZXIuZGVzdG9yeV9vcmlnaW5hbF9tb2R1bGUoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDnm5LlrZDlub/lkYpcclxuICAgICogQHBhcmFtIGFkX3Bvc19pZCBhZHbphY3nva7ooajlub/lkYppZFxyXG4gICAgKiBAcGFyYW0gb25Mb2FkIOWKoOi9veaIkOWKn+Wbnuiwg1xyXG4gICAgKiBAcGFyYW0gb25TaG93IOWxleekuuaIkOWKn+Wbnuiwg1xyXG4gICAgKiBAcGFyYW0gb25DbG9zZSDlhbPpl63lm57osINcclxuICAgICogQHBhcmFtIG9uRXJyb3Ig5oql6ZSZ5Zue6LCDXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIHNob3dfYXBwX2JveChhZF9wb3NfaWQ6IHN0cmluZywgb25Mb2FkOiBGdW5jdGlvbiwgb25TaG93OiBGdW5jdGlvbiwgb25DbG9zZTogRnVuY3Rpb24sIG9uRXJyb3I6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLmNyZWF0ZV9hZChpZ2MuZV9hZF90eXBlLmFwcF9ib3gsIGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csIG9uQ2xvc2UsIG9uRXJyb3IpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnp6/mnKjlub/lkYpcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNob3dfYmxvY2soc3R5bGUsIGFkX3Bvc19pZDogc3RyaW5nLCBvbkxvYWQ6IEZ1bmN0aW9uLCBvblNob3c6IEZ1bmN0aW9uLCBvbkNsb3NlOiBGdW5jdGlvbiwgb25FcnJvcjogRnVuY3Rpb24pIHtcclxuICAgICAgICBzeXl4X2Fkdl9tYW5hZ2VyLnNob3dfYmxvY2soc3R5bGUsIGlnYy5lX2FkX3R5cGUuYmxvY2ssIGFkX3Bvc19pZCwgb25Mb2FkLCBvblNob3csIG9uQ2xvc2UsIG9uRXJyb3IpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAg6ZqQ6JeP56ev5pyo5bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlX2Jsb2NrKGFkX3Bvc19pZCkge1xyXG4gICAgICAgIHN5eXhfYWR2X21hbmFnZXIuaGlkZV9ibG9jayhhZF9wb3NfaWQpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol4/lhajpg6jnp6/mnKjlub/lkYpcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVfYWxsX2Jsb2NrKCkge1xyXG4gICAgICAgIHN5eXhfYWR2X21hbmFnZXIuaGlkZV9hbGxfYmxvY2soKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog5bGV56S65paw5ZOB5bCd6bKcIFxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBzaG93X25ld19wcm9kdWN0cyhjYWxsX2JhY2s/KSB7XHJcbiAgICAgICAgc3l5eF9tYW5hZ2VyLnNob3dfbmV3X3Byb2R1Y3RzKGNhbGxfYmFjaylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreW5s+WPsOeJiOacrOWPt++8jOeci+aYr+WQpuaUr+aMgea3u+WKoOahjOmdouWKn+iDvVxyXG4gICAgICogcGxhdGZvcm1WZXJzaW9uID49IDEwNDQ7XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjaGVja19jYW5fYWRkX2Rlc2t0b3AoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5jaGVja19jYW5fYWRkX2Rlc2t0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeacieayoeaciea3u+WKoOahjOmdolxyXG4gICAgICogQHBhcmFtIGNhbl9hZGQgIOayoeaciea3u+WKoFxyXG4gICAgICogQHBhcmFtIGhhc19hZGQgIOa3u+WKoOS6hlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2hlY2tfaXNfYWRkX2Rlc2t0b3AoY2FuX2FkZDogRnVuY3Rpb24sIGhhc19hZGQ6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5jaGVja19pc19hZGRfZGVza3RvcChjYW5fYWRkLCBoYXNfYWRkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOahjOmdouaTjeS9nFxyXG4gICAgICogQHBhcmFtIG9uX3N1Y2Nlc3MgICDlj6/ku6Xmt7vliqDmoYzpnaIg5re75Yqg5qGM6Z2i55qE57O757uf55WM6Z2i5by55Ye6IFxyXG4gICAgICogQHBhcmFtIG9uX2ZhaWxlZCAgICAg5LiN6IO95re75Yqg5qGM6Z2iIOavlOWmguW5s+WPsOeJiOacrOi+g+S9jlxyXG4gICAgICogQHBhcmFtIG9uX2ZhaWxlZF9iYWNrICDlvLnlh7rmt7vliqDmoYzpnaLnmoTns7vnu5/nlYzpnaLlpLHotKVcclxuICAgICAqIEBwYXJhbSBoYXNfY3JlYXRlICAgIOWbvuagh+W3sue7j+WIm+W7uui/h+S6hlxyXG4gICAgICogcHPvvJrlvZPmjqXmlLbliLBvbl9zdWNjZXNz5Zue6LCD5ZCO77yM5a6a5pe25Zmo5LiA56eS5LmL5ZCOIOWGjeiwg+eUqCBjaGVja19pc19hZGRfZGVza3RvcCDmnaXliKTmlq3nlKjmiLfmmK/lkKbmt7vliqDkuobmoYzpnaIgXHJcbiAgICAgKiDlpoLmnpzlm57osIPmmK8gY2FuX2FkZCDliJnku6PooajnlKjmiLflj5bmtogg5aaC5p6c5Zue6LCD5pivaGFzX2FkZCDvvIzliJnku6PooajnlKjmiLfmt7vliqDmoYzpnaIg5Y+v5Y+R5pS+5aWW5YqxXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhZGRfZGVza3RvcChvbl9zdWNjZXNzOiBGdW5jdGlvbiwgb25fZmFpbGVkOiBGdW5jdGlvbiwgb25fZmFpbGVkX2JhY2s6IEZ1bmN0aW9uLCBoYXNfY3JlYXRlOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIuYWRkX2Rlc2t0b3Aob25fc3VjY2Vzcywgb25fZmFpbGVkLCBvbl9mYWlsZWRfYmFjaywgaGFzX2NyZWF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkI7lj7DovazliY3lj7Dnm5HlkKxcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xyXG4gICAgICogY2FsbGJhY2vvvJpmdW5jdGlvbihyZXMpe1xyXG4gICAgICogfSBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9uX3Nob3coY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5vbl9zaG93KGNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOWQjuWPsOebkeWQrFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICogY2FsbGJhY2vvvJpmdW5jdGlvbihyZXMpe1xyXG4gICAgICogfSBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9uX2hpZGUoY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLm9uX2hpZGUoY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W57O757uf5L+h5oGvXHJcbiAgICAgKiAge1xyXG4gICAgICogIGJyYW5k77ya6K6+5aSH5ZOB54mMXHJcbiAgICAgICAgbW9kZWzvvJrmiYvmnLrlnovlj7dcclxuICAgICAgICBwaXhlbFJhdGlv77ya6K6+5aSH5YOP57Sg5q+UXHJcbiAgICAgICAgc2NyZWVuV2lkdGjvvJrlsY/luZXlrr3luqZcclxuICAgICAgICBzY3JlZW5IZWlnaHTvvJrlsY/luZXpq5jluqZcclxuICAgICAgICB3aW5kb3dXaWR0aO+8muWPr+S9v+eUqOeql+WPo+WuveW6plxyXG4gICAgICAgIHdpbmRvd0hlaWdodO+8muWPr+S9v+eUqOeql+WPo+mrmOW6plxyXG4gICAgICAgIHN0YXR1c0JhckhlaWdodO+8mueKtuaAgeagjy/lvILmgKfnvLrlj6Ppq5jluqZcclxuICAgICAgICBsYW5ndWFnZe+8mueOr+Wig+ivreiogFxyXG4gICAgICAgIHZlcnNpb27vvJrniYjmnKzlj7dcclxuICAgICAgICBwbGF0Zm9ybe+8muWuouaIt+err+W5s+WPsFxyXG4gICAgICAgIHN5c3Rlbe+8muaTjeS9nOezu+e7n+eJiOacrFxyXG4gICAgICAgIHBsYXRmb3JtVmVyc2lvbu+8muW5s+WPsOeJiOacrOWPty/lrqLmiLfnq6/ln7rnoYDlupPniYjmnKxcdFxyXG4gICAgICAgIGV4dHJhOmdldFN5c3RlbUluZm9TeW5j6L+U5Zue55qE5Y+C5pWwXHJcbiAgICAgICAgfVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBnZXRfc3lzdGVtX2luZm9fc3luYygpIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLmdldF9zeXN0ZW1faW5mb19zeW5jKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmuLjmiI/lkK/liqjlj4LmlbBcclxuICAgICAqIHNjZW5l77ya5Zy65pmv5YC8XHJcbiAgICAgKiBxdWVyee+8muafpeivouWPguaVsFxyXG4gICAgICogcmVmZXJyZXJJbmZv77ya5bCP5ri45oiP5ZCv5Yqo5p2l5rqQXHJcbiAgICAgKiBlbnRyeURhdGFIYXNo77ya576k5YWl5Y+j5L+h5oGvXHJcbiAgICAgKiBleHRyYSDlsI/muLjmiI/ln7rmnKzkv6Hmga/vvIzljIXmi6zlrr/kuLsgSWTvvIxnYW1lSWTvvIzlkK/liqjlnLrmma/nrYnlj4LmlbBcclxuICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X2xhdW5jaF9vcHRpb25zX3N5bmMoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBzeXl4X21hbmFnZXIuZ2V0X2xhdW5jaF9vcHRpb25zX3N5bmMoKVxyXG4gICAgICAgIGxldCBkYXRhID0gbmV3IGxhdW5jaF9vcHRpb25zKClcclxuICAgICAgICBkYXRhLnNjZW5lID0gb3B0aW9ucy5zY2VuZSB8fCBcIlwiXHJcbiAgICAgICAgZGF0YS5xdWVyeSA9IG9wdGlvbnMucXVlcnkgfHwge31cclxuICAgICAgICBkYXRhLnJlZmVycmVySW5mbyA9IG9wdGlvbnMucmVmZXJyZXJJbmZvIHx8IHt9XHJcbiAgICAgICAgZGF0YS5lbnRyeURhdGFIYXNoID0gb3B0aW9ucy5lbnRyeURhdGFIYXNoIHx8IHt9XHJcbiAgICAgICAgZGF0YS5leHRyYSA9IG9wdGlvbnMuZXh0cmEgfHwge31cclxuICAgICAgICByZXR1cm4gZGF0YVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5bCP5ri45oiPXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBleGl0X21pbmlfcHJvZ3JhbSgpIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLmV4aXRfbWluaV9wcm9ncmFtKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwj+a4uOaIj+i3s+i9rFxyXG4gICAgICogQHBhcmFtIHBhcmFtXHJcbiAgICAgKiB7XHJcbiAgICAgKiAgIGFwcF9pZDrlsI/muLjmiI/ljIXlkI1cclxuICAgICAqICAgc3VjY2VzczrmiJDlip/lm57osINcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIG5hdmlnYXRlX3RvX21pbmlfcHJvZ3JhbShhcHBfaWQ6IHN0cmluZywgc3VjY3NzOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIubmF2aWdhdGVfdG9fbWluaV9wcm9ncmFtKGFwcF9pZCwgc3VjY3NzKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr5Y2h54mHXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaGFyZSh0aXRsZTogc3RyaW5nLCBpbWFnZVVybDogc3RyaW5nLCBxdWVyeT86IHN0cmluZywgZGVzYz86IHN0cmluZywgc3VjY2Vzcz86IEZ1bmN0aW9uLCBmYWlsPzogRnVuY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLnNoYXJlKHRpdGxlLCBpbWFnZVVybCwgcXVlcnksIGRlc2MsIHN1Y2Nlc3MsIGZhaWwpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzlj7PkuIrop5LliIbkuqtcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9uX3NoYXJlX2FwcF9tZXNzYWdlKHRpdGxlOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLm9uX3NoYXJlX2FwcF9tZXNzYWdlKHRpdGxlLCBpbWFnZVVybClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8gOWni+W9leWxj1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc3RhcnRfcmVjb3JkX3NjcmVlbih0aW1lPzogbnVtYmVyLCBpc19jbGlwX2VuZD86IGJvb2xlYW4sIGNsaXBfdGltZT86IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIuc3RhcnRfcmVjb3JkX3NjcmVlbih0aW1lLCBpc19jbGlwX2VuZCwgY2xpcF90aW1lKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2f5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzdG9wX3JlY29yZF9zY3JlZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5zdG9wX3JlY29yZF9zY3JlZW4oKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pqC5YGc5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBwYXVzZV9yZWNvcmRfc2NyZWVuKCkge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIucGF1c2VfcmVjb3JkX3NjcmVlbigpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmgaLlpI3lvZXlsY9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlc3VtZV9yZWNvcmRfc2NyZWVuKCkge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIucmVzdW1lX3JlY29yZF9zY3JlZW4oKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5Lqr5b2V5bGPXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaGFyZV9yZWNvcmRfc2NyZWVuKHZpZGVvVG9waWNzOiBBcnJheTxzdHJpbmc+LCB0aXRsZTogc3RyaW5nLCBkZXNjOiBzdHJpbmcsIGltYWdlVXJsOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcsIGZhaWw6IEZ1bmN0aW9uLCBzdWNjZXNzOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIuc2hhcmVfcmVjb3JkX3NjcmVlbih2aWRlb1RvcGljcywgdGl0bGUsIGRlc2MsIGltYWdlVXJsLCBxdWVyeSwgZmFpbCwgc3VjY2VzcylcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9leWxj+aWh+S7tlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X3JlY29yZF92aWRlbygpIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLmdldF9yZWNvcmRfdmlkZW8oKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDmmK/lkKbkuLrmlrDnjqnlrrZcclxuICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X2lzX25ld19wbGF5ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN5eXhfbWFuYWdlci5nZXRfaXNfbmV3X3BsYXllcigpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+WPlnN5eXhfYXBwX2lkXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldF9zeXl4X2FwcF9pZCgpIHtcclxuICAgICAgICByZXR1cm4gc3l5eF9tYW5hZ2VyLmdldF9zeXl4X2FwcF9pZCgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOi/lOWbniDmjInpkq7phY3nva4qL1xyXG4gICAgc3RhdGljIEdldEJ1dHRvbnNEYXRhKCkge1xyXG4gICAgICAgIHJldHVybiBzeXl4X21hbmFnZXIuR2V0QnV0dG9uc0RhdGEoKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICog6I635Y+W5b2T5YmN5ri45oiP5bGP5bmV6Iie5Y+w5LiO5Z+65LqOMTkyMCoxMDgw6K6+6K6h6Iie5Y+w55qE5q+U5L6LXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldF9zY3JlZW5fcmF0aW8oKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcImNjXCJdKSB7XHJcbiAgICAgICAgICAgIGlmIChjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggPiBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCAvIDEwODBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggPD0gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIDEwODBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19