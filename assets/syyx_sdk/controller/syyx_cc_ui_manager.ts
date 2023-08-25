import { syyx_view } from "../model/model";
import { syyx_prefab_path } from "../configs/syyx_sdk_enum";
import { syyx_manager } from "./syyx_manager";
import { syyx_sdk_utils } from "../utils/syyx_sdk_utils";
import syyx_ui_banner from "../syyx_ui/ad/syyx_ui_banner";
import syyx_ui_interstitial from "../syyx_ui/ad/syyx_ui_interstitial";
import syyx_ui_inner_interstitial from "../syyx_ui/ad/syyx_ui_inner_interstitial";
import syyx_ui_native_icon from "../syyx_ui/ad/syyx_ui_native_icon";
import syyx_ui_toast from "../syyx_ui/ad/syyx_ui_toast";
import syyx_ui_ctr from "../syyx_ui/ctr_test/syyx_ui_ctr";


export class syyx_cc_ui_manager {

    static _prefab_view = {}

    static _prefab_loading_state = {}

    static _load_call_back_list = {}

    static load_ui_prefabs(view_type, call_back) {
        let self = this

        let view = this._prefab_view[view_type]
        if (view && view.node) {
            call_back && call_back(this._prefab_view[view_type])
            return
        }

        let config = syyx_manager._ui_prefab_config
        
        let view_path = this.get_prefab_path(view_type)
        if (view_path) {

            if (!this._load_call_back_list[view_type]) {
                this._load_call_back_list[view_type] = []
            }
            this._load_call_back_list[view_type].push(call_back)

            if (this._prefab_loading_state[view_type]) {
                console.log("igc----- syyx_cc_ui_manager prefab is loading , please wait", view_path)
                return
            }

            this._prefab_loading_state[view_type] = true

            syyx_sdk_utils.load_resource(view_path, function (prefab) {
                self._prefab_loading_state[view_type] = false
                let prefab1 = cc.instantiate(prefab)
                let view1 = prefab1.getComponent(self.get_prefab_class(view_type))
                
                self._prefab_view[view_type] = view1

                if (config && config[view_type].cocos_auto_scale) {
                    syyx_sdk_utils.set_default_scale(view1)
                }

                for (let i in self._load_call_back_list[view_type]) {
                    //顺序执行call_bcak回调
                    self._load_call_back_list[view_type][i] && self._load_call_back_list[view_type][i](view1)
                }
                self._load_call_back_list[view_type] = []
                console.log("igc----- syyx_cc_ui_manmager load prefab", view_path)
            }, self, function () {
                self._prefab_loading_state[view_type] = false
                console.log("igc----- syyx_cc_ui_manmager load prefab failed!!", view_path)
                self._load_call_back_list[view_type] = []
            })
        }
    }

    /**
    * 根据viewType获取path
    * @param viewType 
    */
    static get_prefab_path(view_type) {
        switch (view_type) {
            case syyx_view.native_banner:
                return syyx_prefab_path.native_banner
            case syyx_view.interstitial:
                if (cc.view.getVisibleSize().height > cc.view.getVisibleSize().width) {
                    return syyx_prefab_path.interstitial
                } else {
                    return syyx_prefab_path.interstitial_h
                }
            case syyx_view.inner_interstitial:
                return syyx_prefab_path.inner_interstitial
            case syyx_view.inner_interstitial_bn:
                return syyx_prefab_path.inner_interstitial_bn
            case syyx_view.native_icon:
                return syyx_prefab_path.native_icon
            case syyx_view.toast:
                return syyx_prefab_path.toast
            case syyx_view.ctr_test:
                if (cc.view.getVisibleSize().height > cc.view.getVisibleSize().width) {
                    return syyx_prefab_path.ctr_test
                } else {
                    return syyx_prefab_path.ctr_test_h
                }
            default:
                console.log("igc-----get_prefab_path fail", view_type);
                return undefined
        }
    }

    /**
    * 根据viewType获取path
    * @param viewType 
    */
    static get_prefab_class(view_type) {
        switch (view_type) {
            case syyx_view.native_banner:
                return syyx_ui_banner
            case syyx_view.interstitial:
                return syyx_ui_interstitial
            case syyx_view.inner_interstitial:
                return syyx_ui_inner_interstitial
                case syyx_view.inner_interstitial_bn:
                    return syyx_ui_inner_interstitial
            case syyx_view.native_icon:
                return syyx_ui_native_icon
            case syyx_view.toast:
                return syyx_ui_toast
            case syyx_view.ctr_test:
                return syyx_ui_ctr
            default:
                console.log("igc-----get_prefab_path fail", view_type);
                return undefined
        }
    }

}


