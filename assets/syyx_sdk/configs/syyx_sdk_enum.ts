export enum e_syyx_ctr_event_type {
    show = 30002, //曝光
    click = 30001,  //点击
}

//原生数据状态
export enum e_ad_native_type {
    native_banner = 1,   //原生Banner
    native_inner_interstitial = 2,//结算原生
    native_interstitial = 3,   //原生插屏  
    native_icon = 4,   //原生icon  
}

//原生数据状态
export enum e_ad_native_state {
    none = 0,   //没有数据
    need_show = 1,//需要展示
    show = 2,   //上报过曝光  
    click = 3,   //上报过点击  
}

//原生点击率状态
export enum e_ad_native_click_pro_type {
    none = 1, //无状态
    cooling = 2, //冷却状态
    active = 3,//激活 可以继续展示
}

export enum e_stat_event_type {
    hall = "10001", //大厅
    chapter = "10002", //关卡
    result = "10003"  //结算
}

export enum e_stat_event_id {
    none = "0",
    win_click_native_adv = "10001",
    lose_click_native_adv = "10002"
}

export enum e_chapter_result_type {
    enter_chapter = "1000000", //进入关卡
    win = "1000001", //胜利
    lose = "1000002", //失败
}

export enum e_hall_stat_type {
    enter_hall = "1",//进入大厅
}

export enum e_settlement_stat_type {
    enter_settlement = "1",//进入结算
}

export enum syyx_prefab_path {
    /**
     * 原生banner广告
     */
    native_banner = "syyx_prefab/ad/ui_banner",

    /**
     * 结算原生
     */
    inner_interstitial = "syyx_prefab/ad/ui_inner_interstitial",

    inner_interstitial_bn = "syyx_prefab/ad/ui_inner_interstitial_bn",

    /**
     * 需要遮罩的插屏广告
     */
    interstitial = "syyx_prefab/ad/ui_interstitial",
    /**
     * 需要遮罩的插屏广告
     */
    interstitial_h = "syyx_prefab/ad/ui_interstitial_h",

    /**
     * 原生icon
     */
    native_icon = "syyx_prefab/ad/ui_native_icon",
    /**
     * 提示
     */
    toast = "syyx_prefab/ad/ui_toast",

    /**
    * 新品尝鲜
    */
    ctr_test = "syyx_prefab/ctr/ui_ctr",

    /**
    * 新品尝鲜
    */
    ctr_test_h = "syyx_prefab/ctr/ui_ctr_h",


}

export enum e_ad_id {
    interstitial_hall = "10100001", // 普通插屏大厅弹出	
    video_add_gold = "10200001",//激励视频 金币不足弹窗 看视频增加金币
    video_add_diamond = "10200002",//    激励视频 钻石不足弹窗 看视频增加钻石	
    video_forging = "10200004",//    激励视频 锻造立即完成 
    video_luck_draw = "10200005",//    激励视频 幸运转盘抽奖
    
    native_interstitial_hall = "10301001",//    原生插屏  带着遮罩 大厅弹出 黄色	
    native_inner_interstitial_success = "10302001",//  结算原生 不带遮罩 胜利界面 蓝色	
    native_banner = "10304001",//原生banner
    native_icon = "10304002",//原生icon
    banner_hall = "10400001",//普通banner  大厅	
    appbox_hall = "10600001",// 手Q广告盒子
    game_banner_box = "10600002",// oppo横版广告盒子
    game_portal_box = "10600003",// oppo九宫格广告盒子
    bottom_block = "10900001",//结算底部积木
    left_block = "10900002",//左侧积木
    right_block = "10900003",//右侧积木
}