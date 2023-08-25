"use strict";
cc._RF.push(module, 'b6e9bGJ80VHwLwRxvA5hYEQ', 'syyx_ui_ctr');
// syyx_sdk/syyx_ui/ctr_test/syyx_ui_ctr.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var syyx_ctr_manager_1 = require("../../controller/ctr_test/syyx_ctr_manager");
var syyx_sdk_api_1 = require("../../syyx_sdk_api");
var syyx_sdk_utils_1 = require("../../utils/syyx_sdk_utils");
var syyx_ui_ctr_item_1 = require("./syyx_ui_ctr_item");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var syyx_ui_ctr = /** @class */ (function (_super) {
    __extends(syyx_ui_ctr, _super);
    function syyx_ui_ctr() {
        var _this = _super.call(this) || this;
        _this.game_node = null;
        _this.icon_prefab = null;
        _this.icon_layout = null;
        _this.fly_ani_node = null;
        _this.tip_title1 = null;
        _this.tip_title2 = null;
        _this.icon_tips = null;
        _this.thanks_node = null;
        _this.btn_close = null;
        _this.call_back = undefined;
        _this.item_list = [];
        return _this;
    }
    syyx_ui_ctr.prototype.show = function (call_back) {
        if (this.node && !this.node.parent) {
            var order = syyx_sdk_utils_1.syyx_sdk_utils.get_largest_zorder(); // 32767
            this.node.parent = syyx_sdk_utils_1.syyx_sdk_utils.get_stage(); // return了这个 window["cc"].director.getScene()
            this.node.zIndex = order;
            this.call_back = call_back;
            this.on_show();
        }
    };
    syyx_ui_ctr.prototype.on_show = function () {
        var self = this;
        this.btn_close.on(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
        //开场动画
        this.game_node.getComponent(cc.Animation).play("chuchang");
        this.tip_title1.active = true;
        this.tip_title2.active = false;
        this.icon_tips.active = true;
        this.thanks_node.active = false;
        this.fly_ani_node.active = false;
        this.btn_close.active = false;
        var time = syyx_sdk_api_1.syyx_sdk_api.get_business_data_by_key("ctr_test_close_button_delay")[0]; // 延迟时间 1
        setTimeout(function () {
            self.btn_close.active = true;
        }, time * 1000);
        var dataList = [{
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }, {
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }, {
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }, {
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }, {
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }, {
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }, {
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }, {
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }, {
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }, {
                gc_id: 10894,
                icon: "https://res.g.llewan.com/storage/common/material/20220316/b56b61168aab00e085119a948dd647f7.png",
                iconid: 7157,
                label_switch: 1,
                package: "com.lwhd.wyxjc.nearme.gamecenter"
            }];
        var ctr_test_data = syyx_ctr_manager_1.syyx_ctr_manager.get_ctr_data().list.slice(0, 6); // 用里面的list 
        // let ctr_test_data = dataList.slice(0, 6)
        if (ctr_test_data) {
            ctr_test_data.forEach(function (item, index) {
                item.name = "\u7B2C" + (index + 1) + "\u6B3E";
            });
            // let cur_list = syyx_sdk_utils.shuffle(ctr_test_data) // 洗牌函数，随机位置
            // this.refresh(cur_list)
            this.refresh(ctr_test_data);
        }
    };
    syyx_ui_ctr.prototype.refresh = function (apps) {
        this.icon_layout.removeAllChildren();
        if (apps && apps.length > 0) {
            var content = this.icon_layout;
            for (var i = 0; i < apps.length; i++) {
                var prefab_item = void 0;
                if (!this.item_list[i]) {
                    prefab_item = cc.instantiate(this.icon_prefab);
                    this.item_list.push(prefab_item);
                }
                else {
                    prefab_item = this.item_list[i];
                }
                content.addChild(prefab_item);
                prefab_item.getComponent(syyx_ui_ctr_item_1.default).refresh(i, apps[i], this.click_game_item.bind(this));
            }
        }
    };
    syyx_ui_ctr.prototype.click_game_item = function () {
        var self = this;
        if (syyx_ctr_manager_1.syyx_ctr_manager.check_is_ctr_test_compelete()) { // 第二次为true，就不需要了
            return;
        }
        var reward_num = syyx_ctr_manager_1.syyx_ctr_manager.get_new_products_reward(); // 100
        if (reward_num != 0) { // 有奖励时
            // this.fly_ani_node.active = true
            this.fly_ani_node.active = false;
            this.fly_ani_node.getComponent(cc.Animation).play("feichuanshi"); // 飘金币的动画
            setTimeout(function () {
                self.tip_title2.active = true;
                self.icon_tips.active = false;
                self.thanks_node.active = true;
                self.thanks_node.getComponent(cc.Animation).play("zi");
                setTimeout(function () {
                    // self.hide()
                }, 1500);
            }, 1000);
        }
        else { // 没奖励时
            self.fly_ani_node.active = false;
            self.tip_title2.active = true;
            self.icon_tips.active = false;
            self.thanks_node.active = true;
            self.thanks_node.getComponent(cc.Animation).play("zi");
            setTimeout(function () {
                // self.hide()
            }, 1500);
        }
        this.call_back && this.call_back(syyx_ctr_manager_1.syyx_ctr_manager.get_new_products_reward()); // 100
        syyx_ctr_manager_1.syyx_ctr_manager.set_ctr_test_compelete(); // 变为true
    };
    syyx_ui_ctr.prototype.on_click_close = function () {
        this.hide();
    };
    syyx_ui_ctr.prototype.set_default_pos = function (style) {
    };
    syyx_ui_ctr.prototype.set_style_pos = function (x, y) {
    };
    syyx_ui_ctr.prototype.hide = function () {
        if (this.node && this.node.parent) {
            this.node.parent.removeChild(this.node);
            this.on_hide();
        }
    };
    syyx_ui_ctr.prototype.on_hide = function () {
        this.btn_close.off(cc.Node.EventType.TOUCH_END, this.on_click_close, this);
    };
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr.prototype, "game_node", void 0);
    __decorate([
        property(cc.Prefab)
    ], syyx_ui_ctr.prototype, "icon_prefab", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr.prototype, "icon_layout", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr.prototype, "fly_ani_node", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr.prototype, "tip_title1", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr.prototype, "tip_title2", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr.prototype, "icon_tips", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr.prototype, "thanks_node", void 0);
    __decorate([
        property(cc.Node)
    ], syyx_ui_ctr.prototype, "btn_close", void 0);
    syyx_ui_ctr = __decorate([
        ccclass
    ], syyx_ui_ctr);
    return syyx_ui_ctr;
}(cc.Component));
exports.default = syyx_ui_ctr;

cc._RF.pop();