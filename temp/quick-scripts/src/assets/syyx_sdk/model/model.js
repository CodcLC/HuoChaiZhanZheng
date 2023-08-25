"use strict";
cc._RF.push(module, '22f98UduLZP4ogQj7etrn5S', 'model');
// syyx_sdk/model/model.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launch_options = exports.push_param = exports.native_ad_data = exports.syyx_view = void 0;
var syyx_view;
(function (syyx_view) {
    /**
     * 原生banner广告
     */
    syyx_view[syyx_view["native_banner"] = 0] = "native_banner";
    /**
     * 结算原生广告
     */
    syyx_view[syyx_view["inner_interstitial"] = 1] = "inner_interstitial";
    syyx_view[syyx_view["inner_interstitial_bn"] = 2] = "inner_interstitial_bn";
    /**
     * 需要遮罩的插屏广告
     */
    syyx_view[syyx_view["interstitial"] = 3] = "interstitial";
    /**
     * 原生icon广告
     */
    syyx_view[syyx_view["native_icon"] = 4] = "native_icon";
    /**
     * tips提示框
     */
    syyx_view[syyx_view["toast"] = 5] = "toast";
    /**
     * 新品尝鲜
     */
    syyx_view[syyx_view["ctr_test"] = 6] = "ctr_test";
})(syyx_view = exports.syyx_view || (exports.syyx_view = {}));
var native_ad_data = /** @class */ (function () {
    function native_ad_data() {
        /**
         * 层级
         * 主要用于达到展示上限时，筛选数据用
         */
        this.order = 0;
    }
    return native_ad_data;
}());
exports.native_ad_data = native_ad_data;
var push_param = /** @class */ (function () {
    function push_param() {
    }
    return push_param;
}());
exports.push_param = push_param;
/**
 * 不同平台能获取到参数不同
 */
var launch_options = /** @class */ (function () {
    function launch_options() {
    }
    return launch_options;
}());
exports.launch_options = launch_options;

cc._RF.pop();