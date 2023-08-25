import { syyx_const } from "../../configs/syyx_sdk_config";
import { syyx_manager } from "../syyx_manager";
import { syyx_view } from '../../model/model';

export class syyx_ctr_manager {

    /**
     * 远端配置版本号
     */
    static __ctr_version = "__ctr_version";

    /**
     *远端配置拉取成功
     */
    static __remote_ctr_inited = false;

    /**
     *  配置表
     */
    static ctr_data = null

    static new_product_location_id = ''

    /**
     *  超能力测试完毕
    */
    static ctr_test_compelete = false

    /**
    * 加载超能力测试配置
    */
    static load_ctr_config() {

        let guobao_new_product_data = syyx_manager._guobao_init_config_data
        let seldads = []
        let gc_statu = ''
        let self = this

        if(guobao_new_product_data.length > 0) {
            for (let i of guobao_new_product_data) {
                if (i.type == "self") {
                    seldads = i.data;
                    gc_statu = i.gc_status // 0关闭，1开启
                    self.new_product_location_id = i.location_id 
                    break;
                }
            }
        }

        let ctrdata = {
            list: seldads,
            open_switch: gc_statu
            // open_switch: 0 // 0 关闭，1开启
        }

        this.on_load_ctr(true, '', 5, JSON.stringify(ctrdata))
    }

    /**
     *  远端超能力配置返回 
     */
    static on_load_ctr(ret, key, version, data) {
        if (ret === true) {
            //把数据和返回的version 保存本地
            this.ctr_data = JSON.parse(data)
            localStorage.setItem(syyx_const.local_ctr_config_version, version);
            localStorage.setItem(syyx_const.local_ctr_config_data, data);
            this.__remote_ctr_inited = true
        }
        else {
            let save_data = localStorage.getItem(syyx_const.local_ctr_config_data)
            if (save_data) {
                this.__remote_ctr_inited = true
            }
        }
        console.log("sdk--新品----- syyx_ctr_manager", this.ctr_data) // open_switch 有 list
    }

    /**
     * 测试完毕
     */
    static set_ctr_test_compelete() {
        this.ctr_test_compelete = true
    }

    /**
     * 是否测试完毕
     */
    static check_is_ctr_test_compelete() {
        return this.ctr_test_compelete
    }

    /**
     * 展示新品尝鲜
     */
    static show_new_products(call_back?) {

        if (this.ctr_test_compelete) {
            console.log("igc----- syyx_ctr_manager test compelete!")
            return
        }

        if (this.check_is_open()) { // 根据国宝数据，gc_statuc判断
            syyx_manager.load_view(syyx_view.ctr_test, function (view) {
                view && view.show && view.show(call_back)
            })
        }
    }

    static get_new_products_reward() {
        let _business_config_data = syyx_manager.get_business_config()
        if (_business_config_data && _business_config_data["ctr_test_reward_count"]) {
            return _business_config_data["ctr_test_reward_count"].value[0]
        }
        return 100
    }

    /**
     * 是否开启新品尝鲜
     */
    static check_is_open() {
        if (this.ctr_data && this.ctr_data.open_switch == 1) { // 根据国宝数据，gc_statuc判断
            return true
        }
        console.log("igc----- syyx_ctr_manager is close")
        return false
    }

    /**
     * 获取ctr配置数据
     */
    static get_ctr_data() {
        if (this.check_is_open()) {
            return this.ctr_data
        }
        return undefined
    }
}


