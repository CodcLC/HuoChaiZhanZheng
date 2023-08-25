
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/model/model.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXG1vZGVsXFxtb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLFNBZ0NYO0FBaENELFdBQVksU0FBUztJQUNqQjs7T0FFRztJQUNILDJEQUFhLENBQUE7SUFFYjs7T0FFRztJQUNILHFFQUFrQixDQUFBO0lBRWxCLDJFQUFxQixDQUFBO0lBRXJCOztPQUVHO0lBQ0gseURBQVksQ0FBQTtJQUVaOztPQUVHO0lBQ0gsdURBQVcsQ0FBQTtJQUVYOztPQUVHO0lBQ0gsMkNBQUssQ0FBQTtJQUVMOztPQUVHO0lBQ0gsaURBQVEsQ0FBQTtBQUNaLENBQUMsRUFoQ1csU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFnQ3BCO0FBQ0Q7SUFBQTtRQTJDSTs7O1dBR0c7UUFDSCxVQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FoREEsQUFnREMsSUFBQTtBQWhEWSx3Q0FBYztBQWtEM0I7SUFBQTtJQWtCQSxDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQWxCQSxBQWtCQyxJQUFBO0FBbEJZLGdDQUFVO0FBb0J2Qjs7R0FFRztBQUNIO0lBQUE7SUFxQkEsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FyQkEsQUFxQkMsSUFBQTtBQXJCWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIHN5eXhfdmlldyB7XHJcbiAgICAvKipcclxuICAgICAqIOWOn+eUn2Jhbm5lcuW5v+WRilxyXG4gICAgICovXHJcbiAgICBuYXRpdmVfYmFubmVyLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT566X5Y6f55Sf5bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIGlubmVyX2ludGVyc3RpdGlhbCxcclxuXHJcbiAgICBpbm5lcl9pbnRlcnN0aXRpYWxfYm4sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpnIDopoHpga7nvannmoTmj5LlsY/lub/lkYpcclxuICAgICAqL1xyXG4gICAgaW50ZXJzdGl0aWFsLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55SfaWNvbuW5v+WRilxyXG4gICAgICovXHJcbiAgICBuYXRpdmVfaWNvbixcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRpcHPmj5DnpLrmoYZcclxuICAgICAqL1xyXG4gICAgdG9hc3QsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlrDlk4HlsJ3pspxcclxuICAgICAqL1xyXG4gICAgY3RyX3Rlc3QsXHJcbn1cclxuZXhwb3J0IGNsYXNzIG5hdGl2ZV9hZF9kYXRhIHtcclxuICAgIC8qKlxyXG4gICAgICog6ZqP5py655Sf5oiQaWRcclxuICAgICovXHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiDphY3nva7ooajlub/lkYppZFxyXG4gICAgICovXHJcbiAgICBhZFBvc0lkOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICog5rig6YGT5bm/5ZGKaWRcclxuICAgICovXHJcbiAgICBhZElkOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIOW5v+WRiuWbvueJh1xyXG4gICAgICovXHJcbiAgICBpbWdVcmxMaXN0OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlub/lkYrmoIfpophcclxuICAgICAqL1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW5v+WRiuaPj+i/sFxyXG4gICAgICovXHJcbiAgICBkZXNjOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlub/lkYppZFxyXG4gICAgICovXHJcbiAgICBhZFVuaXRJZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bm/5ZGK54q25oCBXHJcbiAgICAgKi9cclxuICAgIHN0YXRlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y6f55Sf5bm/5ZGK57G75Z6LICDljp/nlJ9CYW5uZXLjgIHnu5Pnrpfljp/nlJ/nrYlcclxuICAgICAqL1xyXG4gICAgbmF0aXZlX3R5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsYLnuqdcclxuICAgICAqIOS4u+imgeeUqOS6jui+vuWIsOWxleekuuS4iumZkOaXtu+8jOetm+mAieaVsOaNrueUqFxyXG4gICAgICovXHJcbiAgICBvcmRlciA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBwdXNoX3BhcmFtIHtcclxuICAgIC8qKlxyXG4gICAgICog5Zy65pmvXHJcbiAgICAgKi9cclxuICAgIHNjZW5lX25hbWU7XHJcbiAgICAvKipcclxuICAgICAqIOeroOiKglxyXG4gICAgICovXHJcbiAgICBjaGFwdGVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3op4blm77nsbvlnotcclxuICAgICAqL1xyXG4gICAgcHVzaF92aWV3OiBhbnlcclxuXHJcbiAgICAvKipcclxuICAgICAqIOesrOWHoOS4quS9jee9rlxyXG4gICAgICovXHJcbiAgICBwb3NpdGlvbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOS4jeWQjOW5s+WPsOiDveiOt+WPluWIsOWPguaVsOS4jeWQjFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIGxhdW5jaF9vcHRpb25zIHtcclxuICAgIC8qKlxyXG4gICAgKiDlnLrmma/lgLxcclxuICAgICovXHJcbiAgICBzY2VuZTtcclxuICAgIC8qKlxyXG4gICAgICog5p+l6K+i5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHF1ZXJ5O1xyXG4gICAgLyoqXHJcbiAgICAgKiDlsI/muLjmiI/lkK/liqjmnaXmupBcclxuICAgICAqL1xyXG4gICAgcmVmZXJyZXJJbmZvO1xyXG4gICAgLyoqXHJcbiAgICAgKiDnvqTlhaXlj6Pkv6Hmga9cclxuICAgICAqL1xyXG4gICAgZW50cnlEYXRhSGFzaDtcclxuICAgIC8qKlxyXG4gICAgICog5bCP5ri45oiP5Z+65pys5L+h5oGv77yM5YyF5ous5a6/5Li7IElk77yMZ2FtZUlk77yM5ZCv5Yqo5Zy65pmv562J5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIGV4dHJhO1xyXG59XHJcbiJdfQ==