"use strict";
cc._RF.push(module, 'bb705sFh0pOW7QLeqXqVo9W', 'syyx_cc_ui_manager');
// syyx_sdk/controller/syyx_cc_ui_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syyx_cc_ui_manager = void 0;
var model_1 = require("../model/model");
var syyx_sdk_enum_1 = require("../configs/syyx_sdk_enum");
var syyx_manager_1 = require("./syyx_manager");
var syyx_sdk_utils_1 = require("../utils/syyx_sdk_utils");
var syyx_ui_banner_1 = require("../syyx_ui/ad/syyx_ui_banner");
var syyx_ui_interstitial_1 = require("../syyx_ui/ad/syyx_ui_interstitial");
var syyx_ui_inner_interstitial_1 = require("../syyx_ui/ad/syyx_ui_inner_interstitial");
var syyx_ui_native_icon_1 = require("../syyx_ui/ad/syyx_ui_native_icon");
var syyx_ui_toast_1 = require("../syyx_ui/ad/syyx_ui_toast");
var syyx_ui_ctr_1 = require("../syyx_ui/ctr_test/syyx_ui_ctr");
var syyx_cc_ui_manager = /** @class */ (function () {
    function syyx_cc_ui_manager() {
    }
    syyx_cc_ui_manager.load_ui_prefabs = function (view_type, call_back) {
        var self = this;
        var view = this._prefab_view[view_type];
        if (view && view.node) {
            call_back && call_back(this._prefab_view[view_type]);
            return;
        }
        var config = syyx_manager_1.syyx_manager._ui_prefab_config;
        var view_path = this.get_prefab_path(view_type);
        if (view_path) {
            if (!this._load_call_back_list[view_type]) {
                this._load_call_back_list[view_type] = [];
            }
            this._load_call_back_list[view_type].push(call_back);
            if (this._prefab_loading_state[view_type]) {
                console.log("igc----- syyx_cc_ui_manager prefab is loading , please wait", view_path);
                return;
            }
            this._prefab_loading_state[view_type] = true;
            syyx_sdk_utils_1.syyx_sdk_utils.load_resource(view_path, function (prefab) {
                self._prefab_loading_state[view_type] = false;
                var prefab1 = cc.instantiate(prefab);
                var view1 = prefab1.getComponent(self.get_prefab_class(view_type));
                self._prefab_view[view_type] = view1;
                if (config && config[view_type].cocos_auto_scale) {
                    syyx_sdk_utils_1.syyx_sdk_utils.set_default_scale(view1);
                }
                for (var i in self._load_call_back_list[view_type]) {
                    //顺序执行call_bcak回调
                    self._load_call_back_list[view_type][i] && self._load_call_back_list[view_type][i](view1);
                }
                self._load_call_back_list[view_type] = [];
                console.log("igc----- syyx_cc_ui_manmager load prefab", view_path);
            }, self, function () {
                self._prefab_loading_state[view_type] = false;
                console.log("igc----- syyx_cc_ui_manmager load prefab failed!!", view_path);
                self._load_call_back_list[view_type] = [];
            });
        }
    };
    /**
    * 根据viewType获取path
    * @param viewType
    */
    syyx_cc_ui_manager.get_prefab_path = function (view_type) {
        switch (view_type) {
            case model_1.syyx_view.native_banner:
                return syyx_sdk_enum_1.syyx_prefab_path.native_banner;
            case model_1.syyx_view.interstitial:
                if (cc.view.getVisibleSize().height > cc.view.getVisibleSize().width) {
                    return syyx_sdk_enum_1.syyx_prefab_path.interstitial;
                }
                else {
                    return syyx_sdk_enum_1.syyx_prefab_path.interstitial_h;
                }
            case model_1.syyx_view.inner_interstitial:
                return syyx_sdk_enum_1.syyx_prefab_path.inner_interstitial;
            case model_1.syyx_view.inner_interstitial_bn:
                return syyx_sdk_enum_1.syyx_prefab_path.inner_interstitial_bn;
            case model_1.syyx_view.native_icon:
                return syyx_sdk_enum_1.syyx_prefab_path.native_icon;
            case model_1.syyx_view.toast:
                return syyx_sdk_enum_1.syyx_prefab_path.toast;
            case model_1.syyx_view.ctr_test:
                if (cc.view.getVisibleSize().height > cc.view.getVisibleSize().width) {
                    return syyx_sdk_enum_1.syyx_prefab_path.ctr_test;
                }
                else {
                    return syyx_sdk_enum_1.syyx_prefab_path.ctr_test_h;
                }
            default:
                console.log("igc-----get_prefab_path fail", view_type);
                return undefined;
        }
    };
    /**
    * 根据viewType获取path
    * @param viewType
    */
    syyx_cc_ui_manager.get_prefab_class = function (view_type) {
        switch (view_type) {
            case model_1.syyx_view.native_banner:
                return syyx_ui_banner_1.default;
            case model_1.syyx_view.interstitial:
                return syyx_ui_interstitial_1.default;
            case model_1.syyx_view.inner_interstitial:
                return syyx_ui_inner_interstitial_1.default;
            case model_1.syyx_view.inner_interstitial_bn:
                return syyx_ui_inner_interstitial_1.default;
            case model_1.syyx_view.native_icon:
                return syyx_ui_native_icon_1.default;
            case model_1.syyx_view.toast:
                return syyx_ui_toast_1.default;
            case model_1.syyx_view.ctr_test:
                return syyx_ui_ctr_1.default;
            default:
                console.log("igc-----get_prefab_path fail", view_type);
                return undefined;
        }
    };
    syyx_cc_ui_manager._prefab_view = {};
    syyx_cc_ui_manager._prefab_loading_state = {};
    syyx_cc_ui_manager._load_call_back_list = {};
    return syyx_cc_ui_manager;
}());
exports.syyx_cc_ui_manager = syyx_cc_ui_manager;

cc._RF.pop();