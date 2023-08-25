
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/controller/ctr_test/syyx_ctr_manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0635aJi+aNFGYzSUNL32/hy', 'syyx_ctr_manager');
// syyx_sdk/controller/ctr_test/syyx_ctr_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syyx_ctr_manager = void 0;
var syyx_sdk_config_1 = require("../../configs/syyx_sdk_config");
var syyx_manager_1 = require("../syyx_manager");
var model_1 = require("../../model/model");
var syyx_ctr_manager = /** @class */ (function () {
    function syyx_ctr_manager() {
    }
    /**
    * 加载超能力测试配置
    */
    syyx_ctr_manager.load_ctr_config = function () {
        var guobao_new_product_data = syyx_manager_1.syyx_manager._guobao_init_config_data;
        var seldads = [];
        var gc_statu = '';
        var self = this;
        if (guobao_new_product_data.length > 0) {
            for (var _i = 0, guobao_new_product_data_1 = guobao_new_product_data; _i < guobao_new_product_data_1.length; _i++) {
                var i = guobao_new_product_data_1[_i];
                if (i.type == "self") {
                    seldads = i.data;
                    gc_statu = i.gc_status; // 0关闭，1开启
                    self.new_product_location_id = i.location_id;
                    break;
                }
            }
        }
        var ctrdata = {
            list: seldads,
            open_switch: gc_statu
            // open_switch: 0 // 0 关闭，1开启
        };
        this.on_load_ctr(true, '', 5, JSON.stringify(ctrdata));
    };
    /**
     *  远端超能力配置返回
     */
    syyx_ctr_manager.on_load_ctr = function (ret, key, version, data) {
        if (ret === true) {
            //把数据和返回的version 保存本地
            this.ctr_data = JSON.parse(data);
            localStorage.setItem(syyx_sdk_config_1.syyx_const.local_ctr_config_version, version);
            localStorage.setItem(syyx_sdk_config_1.syyx_const.local_ctr_config_data, data);
            this.__remote_ctr_inited = true;
        }
        else {
            var save_data = localStorage.getItem(syyx_sdk_config_1.syyx_const.local_ctr_config_data);
            if (save_data) {
                this.__remote_ctr_inited = true;
            }
        }
        console.log("sdk--新品----- syyx_ctr_manager", this.ctr_data); // open_switch 有 list
    };
    /**
     * 测试完毕
     */
    syyx_ctr_manager.set_ctr_test_compelete = function () {
        this.ctr_test_compelete = true;
    };
    /**
     * 是否测试完毕
     */
    syyx_ctr_manager.check_is_ctr_test_compelete = function () {
        return this.ctr_test_compelete;
    };
    /**
     * 展示新品尝鲜
     */
    syyx_ctr_manager.show_new_products = function (call_back) {
        if (this.ctr_test_compelete) {
            console.log("igc----- syyx_ctr_manager test compelete!");
            return;
        }
        if (this.check_is_open()) { // 根据国宝数据，gc_statuc判断
            syyx_manager_1.syyx_manager.load_view(model_1.syyx_view.ctr_test, function (view) {
                view && view.show && view.show(call_back);
            });
        }
    };
    syyx_ctr_manager.get_new_products_reward = function () {
        var _business_config_data = syyx_manager_1.syyx_manager.get_business_config();
        if (_business_config_data && _business_config_data["ctr_test_reward_count"]) {
            return _business_config_data["ctr_test_reward_count"].value[0];
        }
        return 100;
    };
    /**
     * 是否开启新品尝鲜
     */
    syyx_ctr_manager.check_is_open = function () {
        if (this.ctr_data && this.ctr_data.open_switch == 1) { // 根据国宝数据，gc_statuc判断
            return true;
        }
        console.log("igc----- syyx_ctr_manager is close");
        return false;
    };
    /**
     * 获取ctr配置数据
     */
    syyx_ctr_manager.get_ctr_data = function () {
        if (this.check_is_open()) {
            return this.ctr_data;
        }
        return undefined;
    };
    /**
     * 远端配置版本号
     */
    syyx_ctr_manager.__ctr_version = "__ctr_version";
    /**
     *远端配置拉取成功
     */
    syyx_ctr_manager.__remote_ctr_inited = false;
    /**
     *  配置表
     */
    syyx_ctr_manager.ctr_data = null;
    syyx_ctr_manager.new_product_location_id = '';
    /**
     *  超能力测试完毕
    */
    syyx_ctr_manager.ctr_test_compelete = false;
    return syyx_ctr_manager;
}());
exports.syyx_ctr_manager = syyx_ctr_manager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGNvbnRyb2xsZXJcXGN0cl90ZXN0XFxzeXl4X2N0cl9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUEyRDtBQUMzRCxnREFBK0M7QUFDL0MsMkNBQThDO0FBRTlDO0lBQUE7SUFxSUEsQ0FBQztJQTdHRzs7TUFFRTtJQUNLLGdDQUFlLEdBQXRCO1FBRUksSUFBSSx1QkFBdUIsR0FBRywyQkFBWSxDQUFDLHdCQUF3QixDQUFBO1FBQ25FLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNoQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBRWYsSUFBRyx1QkFBdUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25DLEtBQWMsVUFBdUIsRUFBdkIsbURBQXVCLEVBQXZCLHFDQUF1QixFQUF2QixJQUF1QixFQUFFO2dCQUFsQyxJQUFJLENBQUMsZ0NBQUE7Z0JBQ04sSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtvQkFDbEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLFFBQVEsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFBLENBQUMsVUFBVTtvQkFDakMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUE7b0JBQzVDLE1BQU07aUJBQ1Q7YUFDSjtTQUNKO1FBRUQsSUFBSSxPQUFPLEdBQUc7WUFDVixJQUFJLEVBQUUsT0FBTztZQUNiLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLDZCQUE2QjtTQUNoQyxDQUFBO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFDMUQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNEJBQVcsR0FBbEIs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LEFBcUlDLElBQUE7QUFySVksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3l5eF9jb25zdCB9IGZyb20gXCIuLi8uLi9jb25maWdzL3N5eXhfc2RrX2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBzeXl4X21hbmFnZXIgfSBmcm9tIFwiLi4vc3l5eF9tYW5hZ2VyXCI7XHJcbmltcG9ydCB7IHN5eXhfdmlldyB9IGZyb20gJy4uLy4uL21vZGVsL21vZGVsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBzeXl4X2N0cl9tYW5hZ2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/nOerr+mFjee9rueJiOacrOWPt1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgX19jdHJfdmVyc2lvbiA9IFwiX19jdHJfdmVyc2lvblwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICrov5znq6/phY3nva7mi4nlj5bmiJDlip9cclxuICAgICAqL1xyXG4gICAgc3RhdGljIF9fcmVtb3RlX2N0cl9pbml0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqICDphY3nva7ooahcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGN0cl9kYXRhID0gbnVsbFxyXG5cclxuICAgIHN0YXRpYyBuZXdfcHJvZHVjdF9sb2NhdGlvbl9pZCA9ICcnXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAg6LaF6IO95Yqb5rWL6K+V5a6M5q+VXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGN0cl90ZXN0X2NvbXBlbGV0ZSA9IGZhbHNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWKoOi9vei2heiDveWKm+a1i+ivlemFjee9rlxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBsb2FkX2N0cl9jb25maWcoKSB7XHJcblxyXG4gICAgICAgIGxldCBndW9iYW9fbmV3X3Byb2R1Y3RfZGF0YSA9IHN5eXhfbWFuYWdlci5fZ3VvYmFvX2luaXRfY29uZmlnX2RhdGFcclxuICAgICAgICBsZXQgc2VsZGFkcyA9IFtdXHJcbiAgICAgICAgbGV0IGdjX3N0YXR1ID0gJydcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuXHJcbiAgICAgICAgaWYoZ3VvYmFvX25ld19wcm9kdWN0X2RhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpIG9mIGd1b2Jhb19uZXdfcHJvZHVjdF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaS50eXBlID09IFwic2VsZlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZGFkcyA9IGkuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBnY19zdGF0dSA9IGkuZ2Nfc3RhdHVzIC8vIDDlhbPpl63vvIwx5byA5ZCvXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uZXdfcHJvZHVjdF9sb2NhdGlvbl9pZCA9IGkubG9jYXRpb25faWQgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdHJkYXRhID0ge1xyXG4gICAgICAgICAgICBsaXN0OiBzZWxkYWRzLFxyXG4gICAgICAgICAgICBvcGVuX3N3aXRjaDogZ2Nfc3RhdHVcclxuICAgICAgICAgICAgLy8gb3Blbl9zd2l0Y2g6IDAgLy8gMCDlhbPpl63vvIwx5byA5ZCvXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uX2xvYWRfY3RyKHRydWUsICcnLCA1LCBKU09OLnN0cmluZ2lmeShjdHJkYXRhKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDov5znq6/otoXog73lipvphY3nva7ov5Tlm54gXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvbl9sb2FkX2N0cihyZXQsIGtleSwgdmVyc2lvbiwgZGF0YSkge1xyXG4gICAgICAgIGlmIChyZXQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgLy/miormlbDmja7lkozov5Tlm57nmoR2ZXJzaW9uIOS/neWtmOacrOWcsFxyXG4gICAgICAgICAgICB0aGlzLmN0cl9kYXRhID0gSlNPTi5wYXJzZShkYXRhKVxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzeXl4X2NvbnN0LmxvY2FsX2N0cl9jb25maWdfdmVyc2lvbiwgdmVyc2lvbik7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN5eXhfY29uc3QubG9jYWxfY3RyX2NvbmZpZ19kYXRhLCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5fX3JlbW90ZV9jdHJfaW5pdGVkID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHNhdmVfZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN5eXhfY29uc3QubG9jYWxfY3RyX2NvbmZpZ19kYXRhKVxyXG4gICAgICAgICAgICBpZiAoc2F2ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fcmVtb3RlX2N0cl9pbml0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZGstLeaWsOWTgS0tLS0tIHN5eXhfY3RyX21hbmFnZXJcIiwgdGhpcy5jdHJfZGF0YSkgLy8gb3Blbl9zd2l0Y2gg5pyJIGxpc3RcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa1i+ivleWujOavlVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0X2N0cl90ZXN0X2NvbXBlbGV0ZSgpIHtcclxuICAgICAgICB0aGlzLmN0cl90ZXN0X2NvbXBlbGV0ZSA9IHRydWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpua1i+ivleWujOavlVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2hlY2tfaXNfY3RyX3Rlc3RfY29tcGVsZXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN0cl90ZXN0X2NvbXBlbGV0ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bGV56S65paw5ZOB5bCd6bKcXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzaG93X25ld19wcm9kdWN0cyhjYWxsX2JhY2s/KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN0cl90ZXN0X2NvbXBlbGV0ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIHN5eXhfY3RyX21hbmFnZXIgdGVzdCBjb21wZWxldGUhXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tfaXNfb3BlbigpKSB7IC8vIOagueaNruWbveWuneaVsOaNru+8jGdjX3N0YXR1Y+WIpOaWrVxyXG4gICAgICAgICAgICBzeXl4X21hbmFnZXIubG9hZF92aWV3KHN5eXhfdmlldy5jdHJfdGVzdCwgZnVuY3Rpb24gKHZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcgJiYgdmlldy5zaG93ICYmIHZpZXcuc2hvdyhjYWxsX2JhY2spXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRfbmV3X3Byb2R1Y3RzX3Jld2FyZCgpIHtcclxuICAgICAgICBsZXQgX2J1c2luZXNzX2NvbmZpZ19kYXRhID0gc3l5eF9tYW5hZ2VyLmdldF9idXNpbmVzc19jb25maWcoKVxyXG4gICAgICAgIGlmIChfYnVzaW5lc3NfY29uZmlnX2RhdGEgJiYgX2J1c2luZXNzX2NvbmZpZ19kYXRhW1wiY3RyX3Rlc3RfcmV3YXJkX2NvdW50XCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfYnVzaW5lc3NfY29uZmlnX2RhdGFbXCJjdHJfdGVzdF9yZXdhcmRfY291bnRcIl0udmFsdWVbMF1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDEwMFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5byA5ZCv5paw5ZOB5bCd6bKcXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjaGVja19pc19vcGVuKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN0cl9kYXRhICYmIHRoaXMuY3RyX2RhdGEub3Blbl9zd2l0Y2ggPT0gMSkgeyAvLyDmoLnmja7lm73lrp3mlbDmja7vvIxnY19zdGF0dWPliKTmlq1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLSBzeXl4X2N0cl9tYW5hZ2VyIGlzIGNsb3NlXCIpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZjdHLphY3nva7mlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldF9jdHJfZGF0YSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja19pc19vcGVuKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3RyX2RhdGFcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIl19