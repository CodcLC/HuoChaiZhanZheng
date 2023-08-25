"use strict";
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