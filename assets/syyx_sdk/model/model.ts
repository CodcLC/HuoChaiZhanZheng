export enum syyx_view {
    /**
     * 原生banner广告
     */
    native_banner,

    /**
     * 结算原生广告
     */
    inner_interstitial,

    inner_interstitial_bn,

    /**
     * 需要遮罩的插屏广告
     */
    interstitial,

    /**
     * 原生icon广告
     */
    native_icon,

    /**
     * tips提示框
     */
    toast,

    /**
     * 新品尝鲜
     */
    ctr_test,
}
export class native_ad_data {
    /**
     * 随机生成id
    */
    id: string;
    /**
     * 配置表广告id
     */
    adPosId: string;
    /**
    * 渠道广告id
    */
    adId: string;
    /**
     * 广告图片
     */
    imgUrlList: string;

    /**
     * 广告标题
     */
    title: string;

    /**
     * 广告描述
     */
    desc: string;

    /**
     * 广告id
     */
    adUnitId: string;

    /**
     * 广告状态
     */
    state;

    /**
     * 原生广告类型  原生Banner、结算原生等
     */
    native_type;

    /**
     * 层级
     * 主要用于达到展示上限时，筛选数据用
     */
    order = 0;
}

export class push_param {
    /**
     * 场景
     */
    scene_name;
    /**
     * 章节
     */
    chapter;
    /**
     * 当前视图类型
     */
    push_view: any

    /**
     * 第几个位置
     */
    position;
}

/**
 * 不同平台能获取到参数不同
 */
export class launch_options {
    /**
    * 场景值
    */
    scene;
    /**
     * 查询参数
     */
    query;
    /**
     * 小游戏启动来源
     */
    referrerInfo;
    /**
     * 群入口信息
     */
    entryDataHash;
    /**
     * 小游戏基本信息，包括宿主 Id，gameId，启动场景等参数
     */
    extra;
}
