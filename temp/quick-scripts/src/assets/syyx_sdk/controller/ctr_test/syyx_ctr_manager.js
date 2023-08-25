"use strict";
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