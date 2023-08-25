import { syyx_const } from "./configs/syyx_sdk_config";
import { e_stat_event_type, e_chapter_result_type } from "./configs/syyx_sdk_enum";
import { ad_native_interstitial } from "./controller/ad/ad_native_interstitial";
import { syyx_adv_manager } from "./controller/ad/syyx_adv_manager";
import { syyx_manager } from "./controller/syyx_manager";
import { syyx_view, native_ad_data, launch_options } from "./model/model";

export class syyx_sdk_api {
    /**
     * 初始化
     */
     static init(init_callback: Function) {
        console.log("sdk--------------------syyx_apk version" + syyx_const.syyx_sdk_version)
        syyx_manager.init(init_callback);
    }

    static login_channel(callback: Function) {
        syyx_manager.login_channel(callback);
    }

    /**如果是外部登录 这里传入一下账号id和用户id，设置了之后就可以调用 打点了
     * 打点 是在sdk的init成功回调以后调用
     * @param account 账号
     * @param user_id 用户id
     */
    static init_param(account: string, user_id: string) {
        syyx_manager.init_param(account, user_id);
    }

    /**
     * 获取运营配置对应key的值
     * @param key business_config 的 id值
     */
    static get_business_data_by_key(key) {
        return syyx_manager.get_business_data_by_key(key)
    }

    /**
     * 上报用户注册
     */
    static send_user_register() {}

    /**
     * 上报用户登录
     */
    static send_user_login() {}

    /**
     * 上报大厅（主界面）事件
     */
    static send_hall_event(event_id, extra2 = 0, str1 = "") {}

    /**
     * 上报关卡事件
     */
    static send_chapter_event(event_id, is_win = undefined, str1 = "") {}

    /**
     * 上报结算界面事件
     */
    static send_settlement_event(event_id, extra = "", str1 = "") {}

    static send_other_event(event_id, event_type, extra = "", extra2 = "", str1 = "", str2 = "", str3 = "") {}

    /**
    * 是否启动ok
    * 如果为true 表明内部sdk初始化ok 并且互推配置文件和运营策略文件都读取好了
    */
    static is_inited() {
        return syyx_manager.is_inited();
    }

    /**
    * 获取一个底部原生banner
    */
    static create_native_banner(call_back?) {
        return syyx_manager.create_native_banner(call_back);
    }

    /**
    * 获取一个带遮罩的原生插屏
    */
    static create_interstitial(call_back?) {
        return syyx_manager.create_interstitial(call_back);
    }

    /**
    * 获取一个结算原生
    */
    static create_inner_interstitial(call_back?) {
        return syyx_manager.create_inner_interstitial(call_back);
    }

    /**
    * 获取一个原生icon
    */
    static create_native_icon(call_back?) {
        return syyx_manager.create_native_icon(call_back);
    }

    /**
    * 创建一个tips提示
    * @param desc 
    */
    static create_toast(desc): any {
        return syyx_manager.create_toast(desc);
    }

    /**
     * 隐藏指定类型的视图
     * @param viewType 视图类型
     */
    static hide(viewType: syyx_view) {
        syyx_manager.hide(viewType);
    }

    /**
     * 显示指定视图   （仅限于互推UI使用）
     * @param viewType  视图类型
     * @param zOrder    层级
     * @param scene     当前所在场景的名字          运营使用
     * @param chapter   当前所在关卡或者玩法id      运营使用
     */
    static show(viewType: syyx_view, zOrder = -1, scene?: string, chapter = 0) {
        syyx_manager.show(viewType, zOrder, scene, chapter);
    }

    /**
     * 根据类型获取视图对象
     * @param viewType 视图类型
     */
    static load_view(viewType: syyx_view, call_bcak?) {
        return syyx_manager.load_view(viewType, call_bcak)
    }

    //广告相关
    //接口不已废弃
    static create_ad(ad_type: igc.e_ad_type, ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function) {
        return false
    }

    /**
     * 销毁广告 主要也就是 banner 使用了 一般目前Oppo和vivo隐藏banner 也就是调用destroy了 
     * @param ad_type 广告类型 根据 igc.e_ad_type 传入
     *  interstitial = 1,   插屏
        video = 2,          视频
        native = 3,         原生
        banner = 4,         banner
     * @param ad_pos_id     adv配置表广告位id
     */
    static destroy_ad(ad_type: igc.e_ad_type, ad_pos_id: string) {
        return syyx_manager.destroy_ad(ad_type, ad_pos_id);
    }

    /**
     * 隐藏广告 主要也就是 banner 目前也不怎么使用了
     * @param ad_type 广告类型 根据 igc.e_ad_type 传入
     *  interstitial = 1,   插屏
        video = 2,          视频
        native = 3,         原生
        banner = 4,         banner
     * @param ad_pos_id     adv配置表广告位id
     */
    static hide_ad(ad_type: igc.e_ad_type, ad_pos_id: string) {
        return syyx_manager.hide_ad(ad_type, ad_pos_id);
    }

    /**
     * 原生广告 上报曝光
     * @param ad_pos_id 配置表广告位ID
     * @param native_data 原生数据
     */
    static report_ad_show(ad_pos_id: string, native_data) {
        return syyx_manager.report_ad_show(ad_pos_id, native_data);
    }

    /**
     * 原生广告  上报点击
     * @param ad_pos_id 配置表广告位ID
     * @param ad_unit_id create_ad的onload返回的原生广告信息里面的adUnitId 这个单位ID
     */
    static report_ad_click(ad_pos_id: string, native_data?) {
        return syyx_manager.report_ad_click(ad_pos_id, native_data);
    }

    /**
    * 获取加载好的原生数据
    * @param ad_pos_id 配置表原生id
    */
    static get_local_native_data(ad_pos_id): native_ad_data {
        return syyx_adv_manager.get_local_native_data(ad_pos_id)
    }

    /**
     * 获取对应渠道的广告id
     * @param ad_pos_id 配置表广告id
     */
    static get_channel_ad_id(ad_pos_id) {
        return syyx_adv_manager.get_channel_ad_id(ad_pos_id)
    }

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
    static show_banner(ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function) {
        syyx_adv_manager.show_banner(igc.e_ad_type.banner, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    
    static set_banner_height() {
        syyx_adv_manager.set_banner_height()
    }

    /**
     * 隐藏banner
     */
    static hide_banner() {
        syyx_adv_manager.hide_banner()
    }

    /**
     * 设置能否显示普通banner 
     */
    static set_normal_banner_switch(value = true) {
        syyx_adv_manager.set_normal_banner_switch(value)
    }

    /**
     * 激励视频
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     * @param need_err_tips 默认为false，为true时显示sdk自带的报错飘字
     */
    static show_video(ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function, need_err_tips?: boolean) {
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
            onClose && onClose(null, { isEnded: true })
            return
        }
        syyx_manager.show_video(ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips)
    }

    /**
     * 普通插屏
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     */
    static show_interstitial(ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function) {

        if(syyx_manager.__business_config_data && syyx_manager.__business_config_data["vivo_cp_switch"]) { // 普通插屏开关
            if (syyx_manager.__business_config_data["vivo_cp_switch"].value[0] == 0) {
                onError && onError()
                return
            }
        }

        syyx_manager.create_ad(igc.e_ad_type.interstitial, ad_pos_id, onLoad, onShow, onClose, onError)
    }


    /**
     * 显示带遮罩的原生插屏  会先加载原生数据  加载成功会直接展示UI
     * 黄标
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     */
    static show_native_interstitial(ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function) {
        syyx_adv_manager.show_native_interstitial(igc.e_ad_type.native, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    /**
     * 隐藏带遮罩的原生插屏UI
     * 黄标
     */
    static hide_native_interstitial() {
        ad_native_interstitial.hide_native_interstitial_ui()
    }

    /**
     * 预加载结算原生
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     */
    static preload_native_inner_interstitial(ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function) {
        syyx_adv_manager.preload_native_inner_interstitial(igc.e_ad_type.native, ad_pos_id, onLoad, onShow, onClose, onError)
    }

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
    static show_native_inner_interstitial(ad_pos_id, parent, click_back?: Function, show_back?: Function, hide_back?: Function, is_new_type = true) {
        syyx_manager.show_native_inner_interstitial(ad_pos_id, parent, click_back, show_back, hide_back, is_new_type)
    }

    /**
     * 点击结算原生
     */
    static click_native_inner_interstitial() {
        console.log('上报ysjs-----------');
        
        syyx_manager.click_native_inner_interstitial() 
    }

    static click_native_banner() {
        syyx_manager.click_native_banner() 
    }

    /**
    * 设置结算原生点击按钮策略
    */
    static set_on_click_inner_interstitial_btn(click_back?) {
        syyx_adv_manager.set_on_click_inner_interstitial_btn(click_back)
    }

    /**
     * 隐藏结算原生
     * 
     */
    static hide_native_inner_interstitial() {
        console.log('-- use 隐藏原生广告接口 ----------');
        syyx_manager.hide_native_inner_interstitial() 
    }

    /**
     * 隐藏原生banner
     * 
     */
    static hide_native_banner() {
        syyx_manager.hide_native_banner() 
    }

    /**
     * 显示原生icon
     */
    static show_native_icon(parent, ad_pos_id?: string, onLoad?: Function, onShow?: Function, onClose?: Function, onError?: Function) {
        syyx_adv_manager.show_native_icon(parent, igc.e_ad_type.native, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    /**
     * 隐藏原生icon
     */
    static hide_native_icon() {
        syyx_adv_manager.hide_native_icon()
    }

    /**
     * 是否使用oppo的互推盒子
     * 快应用版本号大于
     */
    static support_game_box() {
        return syyx_manager.support_game_box()
    }

    /**
     * 显示横幅互推盒子
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     */
    static show_game_banner_box(ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function) {
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            syyx_manager.create_ad(igc.e_ad_type.app_box, ad_pos_id, onLoad, onShow, onClose, onError, igc.e_ad_app_box_type.banner_box)
        }
        else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) { // vivo横幅
            syyx_manager.create_heng_fu_ad(igc.e_ad_type.app_box, ad_pos_id, onLoad, onShow, onClose, onError, igc.e_ad_app_box_type.banner_box)
        }
    }

    /**
     * 隐藏横幅互推盒子
     */
    static hide_game_banner_box(ad_pos_id: string) {
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            syyx_manager.destroy_ad(igc.e_ad_type.app_box, ad_pos_id, igc.e_ad_app_box_type.banner_box) 
        }
        else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) { // vivo横幅
            syyx_manager.hide_boxBannerAd_vivo() 
        }
       
    }

    static hide_game_portal_box(ad_pos_id: string) {
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            syyx_manager.destroy_ad(igc.e_ad_type.app_box, ad_pos_id, igc.e_ad_app_box_type.portal_box) 
        }
        else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) { // vivo横幅
            syyx_manager.hide_game_portal_box_vivo() 
        }
    }

    /**
     * oppo九宫格互推盒子
     * @param ad_pos_id adv配置表广告id
     * @param onLoad 加载成功回调
     * @param onShow 展示成功回调
     * @param onClose 关闭回调
     * @param onError 报错回调
     * @param need_err_tips 默认为false，为true时显示sdk自带的报错飘字
     */
    static show_game_portal_box(ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function, need_err_tips?: boolean) {
        if (syyx_const.syyx_sdk_channel === igc.e_channel_type.oppo_qg) {
            syyx_manager.show_game_portal_box(ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips)
        }
        else if (syyx_const.syyx_sdk_channel === igc.e_channel_type.vivo_qg) { // vivo九宫格
            syyx_manager.show_game_portal_box_vivo(ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips)
        } else {
            // web平台
            syyx_manager.show_game_portal_box(ad_pos_id, onLoad, onShow, onClose, onError, need_err_tips)
        }
    }

    /**
    * vivo 原生模板广告 有插屏 结算 banner
    * @param ad_pos_id adv配置表广告id
    * @param onSuccess 加载成功回调
    * @param onError 展示成功回调
    * @param onClose 关闭回调
    * @param top 原生模板广告组件的左上角纵坐标
    * @param left 原生模板广告组件的左上角横坐标
    */
    static show_original_module_vivo(ad_pos_id: string, onSuccess?: Function, onError?: Function, onClose?: Function, top?:number, left?:number) {

        if(ad_pos_id == '10301001') { // 插屏
            if(syyx_manager.__business_config_data && syyx_manager.__business_config_data["vivo_yscp_switch"]) { // 普通插屏开关
                if (syyx_manager.__business_config_data["vivo_yscp_switch"].value[0] == 0) {
                    onError && onError()
                    return
                }
            }
        } else if(ad_pos_id == '10302001') { // 结算  
            if(syyx_manager.__business_config_data && syyx_manager.__business_config_data["native_inner_interstitial_switch"]) { 
                if (syyx_manager.__business_config_data["native_inner_interstitial_switch"].value[0] == 0) {
                    onError && onError()
                    return
                }
            }
        } else if(ad_pos_id == '10304001') { // banner
            if(syyx_manager.__business_config_data && syyx_manager.__business_config_data["native_banner_open_switch"]) { // 普通插屏开关
                if (syyx_manager.__business_config_data["native_banner_open_switch"].value[0] == 0) {
                    onError && onError()
                    return
                }
            }
        }
        syyx_manager.show_original_module(ad_pos_id, onSuccess, onError, onClose, top, left)
    }

    static show_original_module_oppo(ad_pos_id: string, style: number[], onLoad: Function, onSuccess: Function, onError: Function, onClose: Function) {
        if(ad_pos_id == '10301001') { // 原生插屏
            if(syyx_manager.__business_config_data && syyx_manager.__business_config_data["vivo_yscp_switch"]) { // 插屏开关
                if (syyx_manager.__business_config_data["vivo_yscp_switch"].value[0] == 0) {
                    onError && onError()
                    return
                }
            }
        } else if(ad_pos_id == '10302001') { // 原生结算
            if(syyx_manager.__business_config_data && syyx_manager.__business_config_data["native_inner_interstitial_switch"]) { 
                if (syyx_manager.__business_config_data["native_inner_interstitial_switch"].value[0] == 0) {
                    onError && onError()
                    return
                }
            }
        } else if(ad_pos_id == '10304001') { // 原生banner
            if(syyx_manager.__business_config_data && syyx_manager.__business_config_data["native_banner_open_switch"]) { // 原生开关
                if (syyx_manager.__business_config_data["native_banner_open_switch"].value[0] == 0) {
                    onError && onError()
                    return
                }
            }
        }
        syyx_manager.show_original_module_oppo(ad_pos_id, style, onLoad, onSuccess, onError, onClose)
    }

    /**
    * vivo 原生模板广告 通用的 关闭  
    */
    static destory_original_module() {
        syyx_manager.destory_original_module()
    }

    /**
    * 盒子广告
    * @param ad_pos_id adv配置表广告id
    * @param onLoad 加载成功回调
    * @param onShow 展示成功回调
    * @param onClose 关闭回调
    * @param onError 报错回调
    */
    static show_app_box(ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function) {
        syyx_manager.create_ad(igc.e_ad_type.app_box, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    /**
     * 显示积木广告
     */
    static show_block(style, ad_pos_id: string, onLoad: Function, onShow: Function, onClose: Function, onError: Function) {
        syyx_adv_manager.show_block(style, igc.e_ad_type.block, ad_pos_id, onLoad, onShow, onClose, onError)
    }

    /**
     *  隐藏积木广告
     */
    static hide_block(ad_pos_id) {
        syyx_adv_manager.hide_block(ad_pos_id)
    }

    /**
     * 隐藏全部积木广告
     */
    static hide_all_block() {
        syyx_adv_manager.hide_all_block()

    }

    /**
    * 展示新品尝鲜 
    */
    static show_new_products(call_back?) {
        syyx_manager.show_new_products(call_back)
    }

    /**
     * 判断平台版本号，看是否支持添加桌面功能
     * platformVersion >= 1044;
     */
    static check_can_add_desktop() {
        return syyx_manager.check_can_add_desktop();
    }

    /**
     * 检查有没有添加桌面
     * @param can_add  没有添加
     * @param has_add  添加了
     */
    static check_is_add_desktop(can_add: Function, has_add: Function) {
        return syyx_manager.check_is_add_desktop(can_add, has_add);
    }

    /**
     * 添加桌面操作
     * @param on_success   可以添加桌面 添加桌面的系统界面弹出 
     * @param on_failed     不能添加桌面 比如平台版本较低
     * @param on_failed_back  弹出添加桌面的系统界面失败
     * @param has_create    图标已经创建过了
     * ps：当接收到on_success回调后，定时器一秒之后 再调用 check_is_add_desktop 来判断用户是否添加了桌面 
     * 如果回调是 can_add 则代表用户取消 如果回调是has_add ，则代表用户添加桌面 可发放奖励
     */
    static add_desktop(on_success: Function, on_failed: Function, on_failed_back: Function, has_create: Function) {
        return syyx_manager.add_desktop(on_success, on_failed, on_failed_back, has_create);
    }

    /**
     * 后台转前台监听
     * @param callback
     * callback：function(res){
     * } 
     */
    static on_show(callback: Function) {
        return syyx_manager.on_show(callback);
    }

    /**
     * 转后台监听
     * @param callback 
     * callback：function(res){
     * } 
     */
    static on_hide(callback) {
        return syyx_manager.on_hide(callback);
    }

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
    static get_system_info_sync() {
        return syyx_manager.get_system_info_sync()
    }


    /**
     * 获取游戏启动参数
     * scene：场景值
     * query：查询参数
     * referrerInfo：小游戏启动来源
     * entryDataHash：群入口信息
     * extra 小游戏基本信息，包括宿主 Id，gameId，启动场景等参数
    */
    static get_launch_options_sync() {
        let options = syyx_manager.get_launch_options_sync()
        let data = new launch_options()
        data.scene = options.scene || ""
        data.query = options.query || {}
        data.referrerInfo = options.referrerInfo || {}
        data.entryDataHash = options.entryDataHash || {}
        data.extra = options.extra || {}
        return data
    }

    /**
     * 关闭小游戏
     */
    static exit_mini_program() {
        return syyx_manager.exit_mini_program()
    }

    /**
     * 小游戏跳转
     * @param param
     * {
     *   app_id:小游戏包名
     *   success:成功回调
     * }
     */
    static navigate_to_mini_program(app_id: string, succss: Function) {
        return syyx_manager.navigate_to_mini_program(app_id, succss)
    }

    /**
     * 分享卡片
     */
    static share(title: string, imageUrl: string, query?: string, desc?: string, success?: Function, fail?: Function) {
        return syyx_manager.share(title, imageUrl, query, desc, success, fail)
    }

    /**
     * 监听右上角分享
     */
    static on_share_app_message(title: string, imageUrl: string) {
        return syyx_manager.on_share_app_message(title, imageUrl)
    }

    /**
     * 开始录屏
     */
    static start_record_screen(time?: number, is_clip_end?: boolean, clip_time?: number) {
        return syyx_manager.start_record_screen(time, is_clip_end, clip_time)
    }

    /**
     * 结束录屏
     */
    static stop_record_screen() {
        return syyx_manager.stop_record_screen()
    }

    /**
     * 暂停录屏
     */
    static pause_record_screen() {
        return syyx_manager.pause_record_screen()
    }

    /**
     * 恢复录屏
     */
    static resume_record_screen() {
        return syyx_manager.resume_record_screen()
    }

    /**
     * 分享录屏
     */
    static share_record_screen(videoTopics: Array<string>, title: string, desc: string, imageUrl: string, query: string, fail: Function, success: Function) {
        return syyx_manager.share_record_screen(videoTopics, title, desc, imageUrl, query, fail, success)
    }

    /**
     * 获取录屏文件
     */
    static get_record_video() {
        return syyx_manager.get_record_video()
    }

    /**
    * 是否为新玩家
    */
    static get_is_new_player() {
        return syyx_manager.get_is_new_player()
    }

    /**
    * 获取syyx_app_id
    */
    static get_syyx_app_id() {
        return syyx_manager.get_syyx_app_id()
    }

    /** 返回 按钮配置*/
    static GetButtonsData() {
        return syyx_manager.GetButtonsData()
    }
    
    /**
    * 获取当前游戏屏幕舞台与基于1920*1080设计舞台的比例
    */
    static get_screen_ratio() {
        if (window["cc"]) {
            if (cc.view.getVisibleSize().width > cc.view.getVisibleSize().height) {
                return cc.view.getVisibleSize().height / 1080
            }
            else if (cc.view.getVisibleSize().width <= cc.view.getVisibleSize().height) {
                return cc.view.getVisibleSize().width / 1080
            }
        }
        return 1;
    }

}
