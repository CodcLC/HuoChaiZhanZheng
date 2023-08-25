
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/configs/syyx_sdk_enum.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fc2a6XHmnJK65cXBf0IwQF/', 'syyx_sdk_enum');
// syyx_sdk/configs/syyx_sdk_enum.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e_ad_id = exports.syyx_prefab_path = exports.e_settlement_stat_type = exports.e_hall_stat_type = exports.e_chapter_result_type = exports.e_stat_event_id = exports.e_stat_event_type = exports.e_ad_native_click_pro_type = exports.e_ad_native_state = exports.e_ad_native_type = exports.e_syyx_ctr_event_type = void 0;
var e_syyx_ctr_event_type;
(function (e_syyx_ctr_event_type) {
    e_syyx_ctr_event_type[e_syyx_ctr_event_type["show"] = 30002] = "show";
    e_syyx_ctr_event_type[e_syyx_ctr_event_type["click"] = 30001] = "click";
})(e_syyx_ctr_event_type = exports.e_syyx_ctr_event_type || (exports.e_syyx_ctr_event_type = {}));
//原生数据状态
var e_ad_native_type;
(function (e_ad_native_type) {
    e_ad_native_type[e_ad_native_type["native_banner"] = 1] = "native_banner";
    e_ad_native_type[e_ad_native_type["native_inner_interstitial"] = 2] = "native_inner_interstitial";
    e_ad_native_type[e_ad_native_type["native_interstitial"] = 3] = "native_interstitial";
    e_ad_native_type[e_ad_native_type["native_icon"] = 4] = "native_icon";
})(e_ad_native_type = exports.e_ad_native_type || (exports.e_ad_native_type = {}));
//原生数据状态
var e_ad_native_state;
(function (e_ad_native_state) {
    e_ad_native_state[e_ad_native_state["none"] = 0] = "none";
    e_ad_native_state[e_ad_native_state["need_show"] = 1] = "need_show";
    e_ad_native_state[e_ad_native_state["show"] = 2] = "show";
    e_ad_native_state[e_ad_native_state["click"] = 3] = "click";
})(e_ad_native_state = exports.e_ad_native_state || (exports.e_ad_native_state = {}));
//原生点击率状态
var e_ad_native_click_pro_type;
(function (e_ad_native_click_pro_type) {
    e_ad_native_click_pro_type[e_ad_native_click_pro_type["none"] = 1] = "none";
    e_ad_native_click_pro_type[e_ad_native_click_pro_type["cooling"] = 2] = "cooling";
    e_ad_native_click_pro_type[e_ad_native_click_pro_type["active"] = 3] = "active";
})(e_ad_native_click_pro_type = exports.e_ad_native_click_pro_type || (exports.e_ad_native_click_pro_type = {}));
var e_stat_event_type;
(function (e_stat_event_type) {
    e_stat_event_type["hall"] = "10001";
    e_stat_event_type["chapter"] = "10002";
    e_stat_event_type["result"] = "10003"; //结算
})(e_stat_event_type = exports.e_stat_event_type || (exports.e_stat_event_type = {}));
var e_stat_event_id;
(function (e_stat_event_id) {
    e_stat_event_id["none"] = "0";
    e_stat_event_id["win_click_native_adv"] = "10001";
    e_stat_event_id["lose_click_native_adv"] = "10002";
})(e_stat_event_id = exports.e_stat_event_id || (exports.e_stat_event_id = {}));
var e_chapter_result_type;
(function (e_chapter_result_type) {
    e_chapter_result_type["enter_chapter"] = "1000000";
    e_chapter_result_type["win"] = "1000001";
    e_chapter_result_type["lose"] = "1000002";
})(e_chapter_result_type = exports.e_chapter_result_type || (exports.e_chapter_result_type = {}));
var e_hall_stat_type;
(function (e_hall_stat_type) {
    e_hall_stat_type["enter_hall"] = "1";
})(e_hall_stat_type = exports.e_hall_stat_type || (exports.e_hall_stat_type = {}));
var e_settlement_stat_type;
(function (e_settlement_stat_type) {
    e_settlement_stat_type["enter_settlement"] = "1";
})(e_settlement_stat_type = exports.e_settlement_stat_type || (exports.e_settlement_stat_type = {}));
var syyx_prefab_path;
(function (syyx_prefab_path) {
    /**
     * 原生banner广告
     */
    syyx_prefab_path["native_banner"] = "syyx_prefab/ad/ui_banner";
    /**
     * 结算原生
     */
    syyx_prefab_path["inner_interstitial"] = "syyx_prefab/ad/ui_inner_interstitial";
    syyx_prefab_path["inner_interstitial_bn"] = "syyx_prefab/ad/ui_inner_interstitial_bn";
    /**
     * 需要遮罩的插屏广告
     */
    syyx_prefab_path["interstitial"] = "syyx_prefab/ad/ui_interstitial";
    /**
     * 需要遮罩的插屏广告
     */
    syyx_prefab_path["interstitial_h"] = "syyx_prefab/ad/ui_interstitial_h";
    /**
     * 原生icon
     */
    syyx_prefab_path["native_icon"] = "syyx_prefab/ad/ui_native_icon";
    /**
     * 提示
     */
    syyx_prefab_path["toast"] = "syyx_prefab/ad/ui_toast";
    /**
    * 新品尝鲜
    */
    syyx_prefab_path["ctr_test"] = "syyx_prefab/ctr/ui_ctr";
    /**
    * 新品尝鲜
    */
    syyx_prefab_path["ctr_test_h"] = "syyx_prefab/ctr/ui_ctr_h";
})(syyx_prefab_path = exports.syyx_prefab_path || (exports.syyx_prefab_path = {}));
var e_ad_id;
(function (e_ad_id) {
    e_ad_id["interstitial_hall"] = "10100001";
    e_ad_id["video_add_gold"] = "10200001";
    e_ad_id["video_add_diamond"] = "10200002";
    e_ad_id["video_forging"] = "10200004";
    e_ad_id["video_luck_draw"] = "10200005";
    e_ad_id["native_interstitial_hall"] = "10301001";
    e_ad_id["native_inner_interstitial_success"] = "10302001";
    e_ad_id["native_banner"] = "10304001";
    e_ad_id["native_icon"] = "10304002";
    e_ad_id["banner_hall"] = "10400001";
    e_ad_id["appbox_hall"] = "10600001";
    e_ad_id["game_banner_box"] = "10600002";
    e_ad_id["game_portal_box"] = "10600003";
    e_ad_id["bottom_block"] = "10900001";
    e_ad_id["left_block"] = "10900002";
    e_ad_id["right_block"] = "10900003";
})(e_ad_id = exports.e_ad_id || (exports.e_ad_id = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbmZpZ3NcXHN5eXhfc2RrX2VudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBWSxxQkFHWDtBQUhELFdBQVkscUJBQXFCO0lBQzdCLHFFQUFZLENBQUE7SUFDWix1RUFBYSxDQUFBO0FBQ2pCLENBQUMsRUFIVyxxQkFBcUIsR0FBckIsNkJBQXFCLEtBQXJCLDZCQUFxQixRQUdoQztBQUVELFFBQVE7QUFDUixJQUFZLGdCQUtYO0FBTEQsV0FBWSxnQkFBZ0I7SUFDeEIseUVBQWlCLENBQUE7SUFDakIsaUdBQTZCLENBQUE7SUFDN0IscUZBQXVCLENBQUE7SUFDdkIscUVBQWUsQ0FBQTtBQUNuQixDQUFDLEVBTFcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFLM0I7QUFFRCxRQUFRO0FBQ1IsSUFBWSxpQkFLWDtBQUxELFdBQVksaUJBQWlCO0lBQ3pCLHlEQUFRLENBQUE7SUFDUixtRUFBYSxDQUFBO0lBQ2IseURBQVEsQ0FBQTtJQUNSLDJEQUFTLENBQUE7QUFDYixDQUFDLEVBTFcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFLNUI7QUFFRCxTQUFTO0FBQ1QsSUFBWSwwQkFJWDtBQUpELFdBQVksMEJBQTBCO0lBQ2xDLDJFQUFRLENBQUE7SUFDUixpRkFBVyxDQUFBO0lBQ1gsK0VBQVUsQ0FBQTtBQUNkLENBQUMsRUFKVywwQkFBMEIsR0FBMUIsa0NBQTBCLEtBQTFCLGtDQUEwQixRQUlyQztBQUVELElBQVksaUJBSVg7QUFKRCxXQUFZLGlCQUFpQjtJQUN6QixtQ0FBYyxDQUFBO0lBQ2Qsc0NBQWlCLENBQUE7SUFDakIscUNBQWdCLENBQUEsQ0FBRSxJQUFJO0FBQzFCLENBQUMsRUFKVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQUk1QjtBQUVELElBQVksZUFJWDtBQUpELFdBQVksZUFBZTtJQUN2Qiw2QkFBVSxDQUFBO0lBQ1YsaURBQThCLENBQUE7SUFDOUIsa0RBQStCLENBQUE7QUFDbkMsQ0FBQyxFQUpXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBSTFCO0FBRUQsSUFBWSxxQkFJWDtBQUpELFdBQVkscUJBQXFCO0lBQzdCLGtEQUF5QixDQUFBO0lBQ3pCLHdDQUFlLENBQUE7SUFDZix5Q0FBZ0IsQ0FBQTtBQUNwQixDQUFDLEVBSlcscUJBQXFCLEdBQXJCLDZCQUFxQixLQUFyQiw2QkFBcUIsUUFJaEM7QUFFRCxJQUFZLGdCQUVYO0FBRkQsV0FBWSxnQkFBZ0I7SUFDeEIsb0NBQWdCLENBQUE7QUFDcEIsQ0FBQyxFQUZXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBRTNCO0FBRUQsSUFBWSxzQkFFWDtBQUZELFdBQVksc0JBQXNCO0lBQzlCLGdEQUFzQixDQUFBO0FBQzFCLENBQUMsRUFGVyxzQkFBc0IsR0FBdEIsOEJBQXNCLEtBQXRCLDhCQUFzQixRQUVqQztBQUVELElBQVksZ0JBMENYO0FBMUNELFdBQVksZ0JBQWdCO0lBQ3hCOztPQUVHO0lBQ0gsOERBQTBDLENBQUE7SUFFMUM7O09BRUc7SUFDSCwrRUFBMkQsQ0FBQTtJQUUzRCxxRkFBaUUsQ0FBQTtJQUVqRTs7T0FFRztJQUNILG1FQUErQyxDQUFBO0lBQy9DOztPQUVHO0lBQ0gsdUVBQW1ELENBQUE7SUFFbkQ7O09BRUc7SUFDSCxpRUFBNkMsQ0FBQTtJQUM3Qzs7T0FFRztJQUNILHFEQUFpQyxDQUFBO0lBRWpDOztNQUVFO0lBQ0YsdURBQW1DLENBQUE7SUFFbkM7O01BRUU7SUFDRiwyREFBdUMsQ0FBQTtBQUczQyxDQUFDLEVBMUNXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBMEMzQjtBQUVELElBQVksT0FrQlg7QUFsQkQsV0FBWSxPQUFPO0lBQ2YseUNBQThCLENBQUE7SUFDOUIsc0NBQTJCLENBQUE7SUFDM0IseUNBQThCLENBQUE7SUFDOUIscUNBQTBCLENBQUE7SUFDMUIsdUNBQTRCLENBQUE7SUFFNUIsZ0RBQXFDLENBQUE7SUFDckMseURBQThDLENBQUE7SUFDOUMscUNBQTBCLENBQUE7SUFDMUIsbUNBQXdCLENBQUE7SUFDeEIsbUNBQXdCLENBQUE7SUFDeEIsbUNBQXdCLENBQUE7SUFDeEIsdUNBQTRCLENBQUE7SUFDNUIsdUNBQTRCLENBQUE7SUFDNUIsb0NBQXlCLENBQUE7SUFDekIsa0NBQXVCLENBQUE7SUFDdkIsbUNBQXdCLENBQUE7QUFDNUIsQ0FBQyxFQWxCVyxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFrQmxCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gZV9zeXl4X2N0cl9ldmVudF90eXBlIHtcclxuICAgIHNob3cgPSAzMDAwMiwgLy/mm53lhYlcclxuICAgIGNsaWNrID0gMzAwMDEsICAvL+eCueWHu1xyXG59XHJcblxyXG4vL+WOn+eUn+aVsOaNrueKtuaAgVxyXG5leHBvcnQgZW51bSBlX2FkX25hdGl2ZV90eXBlIHtcclxuICAgIG5hdGl2ZV9iYW5uZXIgPSAxLCAgIC8v5Y6f55SfQmFubmVyXHJcbiAgICBuYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsID0gMiwvL+e7k+eul+WOn+eUn1xyXG4gICAgbmF0aXZlX2ludGVyc3RpdGlhbCA9IDMsICAgLy/ljp/nlJ/mj5LlsY8gIFxyXG4gICAgbmF0aXZlX2ljb24gPSA0LCAgIC8v5Y6f55SfaWNvbiAgXHJcbn1cclxuXHJcbi8v5Y6f55Sf5pWw5o2u54q25oCBXHJcbmV4cG9ydCBlbnVtIGVfYWRfbmF0aXZlX3N0YXRlIHtcclxuICAgIG5vbmUgPSAwLCAgIC8v5rKh5pyJ5pWw5o2uXHJcbiAgICBuZWVkX3Nob3cgPSAxLC8v6ZyA6KaB5bGV56S6XHJcbiAgICBzaG93ID0gMiwgICAvL+S4iuaKpei/h+abneWFiSAgXHJcbiAgICBjbGljayA9IDMsICAgLy/kuIrmiqXov4fngrnlh7sgIFxyXG59XHJcblxyXG4vL+WOn+eUn+eCueWHu+eOh+eKtuaAgVxyXG5leHBvcnQgZW51bSBlX2FkX25hdGl2ZV9jbGlja19wcm9fdHlwZSB7XHJcbiAgICBub25lID0gMSwgLy/ml6DnirbmgIFcclxuICAgIGNvb2xpbmcgPSAyLCAvL+WGt+WNtOeKtuaAgVxyXG4gICAgYWN0aXZlID0gMywvL+a/gOa0uyDlj6/ku6Xnu6fnu63lsZXnpLpcclxufVxyXG5cclxuZXhwb3J0IGVudW0gZV9zdGF0X2V2ZW50X3R5cGUge1xyXG4gICAgaGFsbCA9IFwiMTAwMDFcIiwgLy/lpKfljoVcclxuICAgIGNoYXB0ZXIgPSBcIjEwMDAyXCIsIC8v5YWz5Y2hXHJcbiAgICByZXN1bHQgPSBcIjEwMDAzXCIgIC8v57uT566XXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIGVfc3RhdF9ldmVudF9pZCB7XHJcbiAgICBub25lID0gXCIwXCIsXHJcbiAgICB3aW5fY2xpY2tfbmF0aXZlX2FkdiA9IFwiMTAwMDFcIixcclxuICAgIGxvc2VfY2xpY2tfbmF0aXZlX2FkdiA9IFwiMTAwMDJcIlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBlX2NoYXB0ZXJfcmVzdWx0X3R5cGUge1xyXG4gICAgZW50ZXJfY2hhcHRlciA9IFwiMTAwMDAwMFwiLCAvL+i/m+WFpeWFs+WNoVxyXG4gICAgd2luID0gXCIxMDAwMDAxXCIsIC8v6IOc5YipXHJcbiAgICBsb3NlID0gXCIxMDAwMDAyXCIsIC8v5aSx6LSlXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIGVfaGFsbF9zdGF0X3R5cGUge1xyXG4gICAgZW50ZXJfaGFsbCA9IFwiMVwiLC8v6L+b5YWl5aSn5Y6FXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIGVfc2V0dGxlbWVudF9zdGF0X3R5cGUge1xyXG4gICAgZW50ZXJfc2V0dGxlbWVudCA9IFwiMVwiLC8v6L+b5YWl57uT566XXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIHN5eXhfcHJlZmFiX3BhdGgge1xyXG4gICAgLyoqXHJcbiAgICAgKiDljp/nlJ9iYW5uZXLlub/lkYpcclxuICAgICAqL1xyXG4gICAgbmF0aXZlX2Jhbm5lciA9IFwic3l5eF9wcmVmYWIvYWQvdWlfYmFubmVyXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5Pnrpfljp/nlJ9cclxuICAgICAqL1xyXG4gICAgaW5uZXJfaW50ZXJzdGl0aWFsID0gXCJzeXl4X3ByZWZhYi9hZC91aV9pbm5lcl9pbnRlcnN0aXRpYWxcIixcclxuXHJcbiAgICBpbm5lcl9pbnRlcnN0aXRpYWxfYm4gPSBcInN5eXhfcHJlZmFiL2FkL3VpX2lubmVyX2ludGVyc3RpdGlhbF9iblwiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZyA6KaB6YGu572p55qE5o+S5bGP5bm/5ZGKXHJcbiAgICAgKi9cclxuICAgIGludGVyc3RpdGlhbCA9IFwic3l5eF9wcmVmYWIvYWQvdWlfaW50ZXJzdGl0aWFsXCIsXHJcbiAgICAvKipcclxuICAgICAqIOmcgOimgemBrue9qeeahOaPkuWxj+W5v+WRilxyXG4gICAgICovXHJcbiAgICBpbnRlcnN0aXRpYWxfaCA9IFwic3l5eF9wcmVmYWIvYWQvdWlfaW50ZXJzdGl0aWFsX2hcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOn+eUn2ljb25cclxuICAgICAqL1xyXG4gICAgbmF0aXZlX2ljb24gPSBcInN5eXhfcHJlZmFiL2FkL3VpX25hdGl2ZV9pY29uXCIsXHJcbiAgICAvKipcclxuICAgICAqIOaPkOekulxyXG4gICAgICovXHJcbiAgICB0b2FzdCA9IFwic3l5eF9wcmVmYWIvYWQvdWlfdG9hc3RcIixcclxuXHJcbiAgICAvKipcclxuICAgICog5paw5ZOB5bCd6bKcXHJcbiAgICAqL1xyXG4gICAgY3RyX3Rlc3QgPSBcInN5eXhfcHJlZmFiL2N0ci91aV9jdHJcIixcclxuXHJcbiAgICAvKipcclxuICAgICog5paw5ZOB5bCd6bKcXHJcbiAgICAqL1xyXG4gICAgY3RyX3Rlc3RfaCA9IFwic3l5eF9wcmVmYWIvY3RyL3VpX2N0cl9oXCIsXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gZV9hZF9pZCB7XHJcbiAgICBpbnRlcnN0aXRpYWxfaGFsbCA9IFwiMTAxMDAwMDFcIiwgLy8g5pmu6YCa5o+S5bGP5aSn5Y6F5by55Ye6XHRcclxuICAgIHZpZGVvX2FkZF9nb2xkID0gXCIxMDIwMDAwMVwiLC8v5r+A5Yqx6KeG6aKRIOmHkeW4geS4jei2s+W8ueeqlyDnnIvop4bpopHlop7liqDph5HluIFcclxuICAgIHZpZGVvX2FkZF9kaWFtb25kID0gXCIxMDIwMDAwMlwiLC8vICAgIOa/gOWKseinhumikSDpkrvnn7PkuI3otrPlvLnnqpcg55yL6KeG6aKR5aKe5Yqg6ZK755+zXHRcclxuICAgIHZpZGVvX2ZvcmdpbmcgPSBcIjEwMjAwMDA0XCIsLy8gICAg5r+A5Yqx6KeG6aKRIOmUu+mAoOeri+WNs+WujOaIkCBcclxuICAgIHZpZGVvX2x1Y2tfZHJhdyA9IFwiMTAyMDAwMDVcIiwvLyAgICDmv4DlirHop4bpopEg5bm46L+Q6L2s55uY5oq95aWWXHJcbiAgICBcclxuICAgIG5hdGl2ZV9pbnRlcnN0aXRpYWxfaGFsbCA9IFwiMTAzMDEwMDFcIiwvLyAgICDljp/nlJ/mj5LlsY8gIOW4puedgOmBrue9qSDlpKfljoXlvLnlh7og6buE6ImyXHRcclxuICAgIG5hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWxfc3VjY2VzcyA9IFwiMTAzMDIwMDFcIiwvLyAg57uT566X5Y6f55SfIOS4jeW4pumBrue9qSDog5zliKnnlYzpnaIg6JOd6ImyXHRcclxuICAgIG5hdGl2ZV9iYW5uZXIgPSBcIjEwMzA0MDAxXCIsLy/ljp/nlJ9iYW5uZXJcclxuICAgIG5hdGl2ZV9pY29uID0gXCIxMDMwNDAwMlwiLC8v5Y6f55SfaWNvblxyXG4gICAgYmFubmVyX2hhbGwgPSBcIjEwNDAwMDAxXCIsLy/mma7pgJpiYW5uZXIgIOWkp+WOhVx0XHJcbiAgICBhcHBib3hfaGFsbCA9IFwiMTA2MDAwMDFcIiwvLyDmiYtR5bm/5ZGK55uS5a2QXHJcbiAgICBnYW1lX2Jhbm5lcl9ib3ggPSBcIjEwNjAwMDAyXCIsLy8gb3Bwb+aoqueJiOW5v+WRiuebkuWtkFxyXG4gICAgZ2FtZV9wb3J0YWxfYm94ID0gXCIxMDYwMDAwM1wiLC8vIG9wcG/kuZ3lrqvmoLzlub/lkYrnm5LlrZBcclxuICAgIGJvdHRvbV9ibG9jayA9IFwiMTA5MDAwMDFcIiwvL+e7k+eul+W6lemDqOenr+acqFxyXG4gICAgbGVmdF9ibG9jayA9IFwiMTA5MDAwMDJcIiwvL+W3puS+p+enr+acqFxyXG4gICAgcmlnaHRfYmxvY2sgPSBcIjEwOTAwMDAzXCIsLy/lj7Pkvqfnp6/mnKhcclxufSJdfQ==