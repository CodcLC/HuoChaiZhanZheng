
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/syyx_ui/ctr_test/syyx_ui_ctr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHN5eXhfdWlcXGN0cl90ZXN0XFxzeXl4X3VpX2N0ci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrRUFBOEU7QUFDOUUsbURBQWtEO0FBQ2xELDZEQUE0RDtBQUM1RCx1REFBa0Q7QUFHNUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFpQ2pEO1FBQUEsWUFDSSxpQkFBTyxTQUNWO1FBaENELGVBQVMsR0FBWSxJQUFJLENBQUM7UUFHMUIsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFHOUIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFZLElBQUksQ0FBQztRQUcxQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixlQUFTLEdBQVksSUFBSSxDQUFDO1FBRTFCLGVBQVMsR0FBRyxTQUFTLENBQUE7UUFFckIsZUFBUyxHQUFHLEVBQUUsQ0FBQTs7SUFJZCxDQUFDO0lBRUQsMEJBQUksR0FBSixVQUFLLFNBQVU7UUFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQyxJQUFJLEtBQUssR0FBRywrQkFBYyxDQUFDLGtCQUFrQixFQUFFLENBQUEsQ0FBQyxRQUFRO1lBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLCtCQUFjLENBQUMsU0FBUyxFQUFFLENBQUEsQ0FBQyw2Q0FBNkM7WUFDM0YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO1lBQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNqQjtJQUNMLENBQUM7SUFFRCw2QkFBTyxHQUFQO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFekUsTUFBTTtRQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUVoQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDN0IsSUFBSSxJQUFJLEdBQUcsMkJBQVksQ0FBQyx3QkFBd0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsU0FBUztRQUM1RixVQUFVLENBQUM7WUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7UUFDaEMsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztRQUVoQixJQUFJLFFBQVEsR0FBRyxDQUFDO2dCQUNaLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxnR0FBZ0c7Z0JBQ3RHLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFlBQVksRUFBRSxDQUFDO2dCQUNmLE9BQU8sRUFBRSxrQ0FBa0M7YUFDOUMsRUFBRTtnQkFDQyxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsZ0dBQWdHO2dCQUN0RyxNQUFNLEVBQUUsSUFBSTtnQkFDWixZQUFZLEVBQUUsQ0FBQztnQkFDZixPQUFPLEVBQUUsa0NBQWtDO2FBQzlDLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLGdHQUFnRztnQkFDdEcsTUFBTSxFQUFFLElBQUk7Z0JBQ1osWUFBWSxFQUFFLENBQUM7Z0JBQ2YsT0FBTyxFQUFFLGtDQUFrQzthQUM5QyxFQUFFO2dCQUNDLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxnR0FBZ0c7Z0JBQ3RHLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFlBQVksRUFBRSxDQUFDO2dCQUNmLE9BQU8sRUFBRSxrQ0FBa0M7YUFDOUMsRUFBRTtnQkFDQyxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsZ0dBQWdHO2dCQUN0RyxNQUFNLEVBQUUsSUFBSTtnQkFDWixZQUFZLEVBQUUsQ0FBQztnQkFDZixPQUFPLEVBQUUsa0NBQWtDO2FBQzlDLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLGdHQUFnRztnQkFDdEcsTUFBTSxFQUFFLElBQUk7Z0JBQ1osWUFBWSxFQUFFLENBQUM7Z0JBQ2YsT0FBTyxFQUFFLGtDQUFrQzthQUM5QyxFQUFFO2dCQUNDLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxnR0FBZ0c7Z0JBQ3RHLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFlBQVksRUFBRSxDQUFDO2dCQUNmLE9BQU8sRUFBRSxrQ0FBa0M7YUFDOUMsRUFBRTtnQkFDQyxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsZ0dBQWdHO2dCQUN0RyxNQUFNLEVBQUUsSUFBSTtnQkFDWixZQUFZLEVBQUUsQ0FBQztnQkFDZixPQUFPLEVBQUUsa0NBQWtDO2FBQzlDLEVBQUU7Z0JBQ0MsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLGdHQUFnRztnQkFDdEcsTUFBTSxFQUFFLElBQUk7Z0JBQ1osWUFBWSxFQUFFLENBQUM7Z0JBQ2YsT0FBTyxFQUFFLGtDQUFrQzthQUM5QyxFQUFFO2dCQUNDLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxnR0FBZ0c7Z0JBQ3RHLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFlBQVksRUFBRSxDQUFDO2dCQUNmLE9BQU8sRUFBRSxrQ0FBa0M7YUFDOUMsQ0FBQyxDQUFBO1FBRUYsSUFBSSxhQUFhLEdBQUcsbUNBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQyxZQUFZO1FBQ2pGLDJDQUEyQztRQUUzQyxJQUFJLGFBQWEsRUFBRTtZQUVmLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztnQkFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFJLEtBQUssR0FBQyxDQUFDLFlBQUcsQ0FBQTtZQUM5QixDQUFDLENBQUMsQ0FBQztZQUVILG9FQUFvRTtZQUNwRSx5QkFBeUI7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUM5QjtJQUVMLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsSUFBSTtRQUNSLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFBO1lBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3BCLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNO29CQUNILFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNuQztnQkFDRCxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM5QixXQUFXLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTthQUNsRztTQUNKO0lBQ0wsQ0FBQztJQUVELHFDQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZixJQUFJLG1DQUFnQixDQUFDLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxpQkFBaUI7WUFDbkUsT0FBTTtTQUNUO1FBRUQsSUFBSSxVQUFVLEdBQUcsbUNBQWdCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQSxDQUFDLE1BQU07UUFDbEUsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTztZQUMxQixrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1lBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQyxTQUFTO1lBQzFFLFVBQVUsQ0FBQztnQkFFUCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtnQkFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO2dCQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUN0RCxVQUFVLENBQUM7b0JBQ1AsY0FBYztnQkFDbEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ1osQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ1g7YUFBTSxFQUFDLE9BQU87WUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtZQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0RCxVQUFVLENBQUM7Z0JBQ1AsY0FBYztZQUNsQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDWDtRQUVELElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQ0FBZ0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUEsQ0FBQyxNQUFNO1FBQ25GLG1DQUFnQixDQUFDLHNCQUFzQixFQUFFLENBQUEsQ0FBQyxTQUFTO0lBQ3ZELENBQUM7SUFHRCxvQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2YsQ0FBQztJQUVELHFDQUFlLEdBQWYsVUFBZ0IsS0FBSztJQUVyQixDQUFDO0lBRUQsbUNBQWEsR0FBYixVQUFjLENBQUMsRUFBRSxDQUFDO0lBRWxCLENBQUM7SUFFRCwwQkFBSSxHQUFKO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM5RSxDQUFDO0lBMU5EO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvREFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDUztJQUczQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ1E7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDVTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNRO0lBM0JULFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0E4Ti9CO0lBQUQsa0JBQUM7Q0E5TkQsQUE4TkMsQ0E5TndDLEVBQUUsQ0FBQyxTQUFTLEdBOE5wRDtrQkE5Tm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzeXl4X2N0cl9tYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvbnRyb2xsZXIvY3RyX3Rlc3Qvc3l5eF9jdHJfbWFuYWdlclwiO1xyXG5pbXBvcnQgeyBzeXl4X3Nka19hcGkgfSBmcm9tIFwiLi4vLi4vc3l5eF9zZGtfYXBpXCI7XHJcbmltcG9ydCB7IHN5eXhfc2RrX3V0aWxzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3N5eXhfc2RrX3V0aWxzXCI7XHJcbmltcG9ydCBzeXl4X3VpX2N0cl9pdGVtIGZyb20gXCIuL3N5eXhfdWlfY3RyX2l0ZW1cIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3l5eF91aV9jdHIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgZ2FtZV9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgaWNvbl9wcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBpY29uX2xheW91dDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBmbHlfYW5pX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgdGlwX3RpdGxlMTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0aXBfdGl0bGUyOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGljb25fdGlwczogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB0aGFua3Nfbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBidG5fY2xvc2U6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGNhbGxfYmFjayA9IHVuZGVmaW5lZFxyXG5cclxuICAgIGl0ZW1fbGlzdCA9IFtdXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgfVxyXG5cclxuICAgIHNob3coY2FsbF9iYWNrPykge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgIXRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IG9yZGVyID0gc3l5eF9zZGtfdXRpbHMuZ2V0X2xhcmdlc3Rfem9yZGVyKCkgLy8gMzI3NjdcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IHN5eXhfc2RrX3V0aWxzLmdldF9zdGFnZSgpIC8vIHJldHVybuS6hui/meS4qiB3aW5kb3dbXCJjY1wiXS5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS56SW5kZXggPSBvcmRlclxyXG4gICAgICAgICAgICB0aGlzLmNhbGxfYmFjayA9IGNhbGxfYmFja1xyXG4gICAgICAgICAgICB0aGlzLm9uX3Nob3coKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbl9zaG93KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHRoaXMuYnRuX2Nsb3NlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19jbG9zZSwgdGhpcylcclxuXHJcbiAgICAgICAgLy/lvIDlnLrliqjnlLtcclxuICAgICAgICB0aGlzLmdhbWVfbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiY2h1Y2hhbmdcIilcclxuICAgICAgICB0aGlzLnRpcF90aXRsZTEuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMudGlwX3RpdGxlMi5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaWNvbl90aXBzLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB0aGlzLnRoYW5rc19ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5mbHlfYW5pX25vZGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5idG5fY2xvc2UuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICBsZXQgdGltZSA9IHN5eXhfc2RrX2FwaS5nZXRfYnVzaW5lc3NfZGF0YV9ieV9rZXkoXCJjdHJfdGVzdF9jbG9zZV9idXR0b25fZGVsYXlcIilbMF0gLy8g5bu26L+f5pe26Ze0IDFcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5idG5fY2xvc2UuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH0sIHRpbWUgKiAxMDAwKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGFMaXN0ID0gW3sgLy8g5rWL6K+V5paw5ZOB5bCd6bKc5pWw5o2uXHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGdjX2lkOiAxMDg5NCxcclxuICAgICAgICAgICAgaWNvbjogXCJodHRwczovL3Jlcy5nLmxsZXdhbi5jb20vc3RvcmFnZS9jb21tb24vbWF0ZXJpYWwvMjAyMjAzMTYvYjU2YjYxMTY4YWFiMDBlMDg1MTE5YTk0OGRkNjQ3ZjcucG5nXCIsXHJcbiAgICAgICAgICAgIGljb25pZDogNzE1NyxcclxuICAgICAgICAgICAgbGFiZWxfc3dpdGNoOiAxLFxyXG4gICAgICAgICAgICBwYWNrYWdlOiBcImNvbS5sd2hkLnd5eGpjLm5lYXJtZS5nYW1lY2VudGVyXCJcclxuICAgICAgICB9XVxyXG5cclxuICAgICAgICBsZXQgY3RyX3Rlc3RfZGF0YSA9IHN5eXhfY3RyX21hbmFnZXIuZ2V0X2N0cl9kYXRhKCkubGlzdC5zbGljZSgwLCA2KSAvLyDnlKjph4zpnaLnmoRsaXN0IFxyXG4gICAgICAgIC8vIGxldCBjdHJfdGVzdF9kYXRhID0gZGF0YUxpc3Quc2xpY2UoMCwgNilcclxuXHJcbiAgICAgICAgaWYgKGN0cl90ZXN0X2RhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIGN0cl90ZXN0X2RhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGDnrKwke2luZGV4KzF95qy+YFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxldCBjdXJfbGlzdCA9IHN5eXhfc2RrX3V0aWxzLnNodWZmbGUoY3RyX3Rlc3RfZGF0YSkgLy8g5rSX54mM5Ye95pWw77yM6ZqP5py65L2N572uXHJcbiAgICAgICAgICAgIC8vIHRoaXMucmVmcmVzaChjdXJfbGlzdClcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKGN0cl90ZXN0X2RhdGEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoKGFwcHMpIHtcclxuICAgICAgICB0aGlzLmljb25fbGF5b3V0LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgaWYgKGFwcHMgJiYgYXBwcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5pY29uX2xheW91dFxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFwcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcmVmYWJfaXRlbSA9IHZvaWQgMDtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pdGVtX2xpc3RbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmYWJfaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaWNvbl9wcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbV9saXN0LnB1c2gocHJlZmFiX2l0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmYWJfaXRlbSA9IHRoaXMuaXRlbV9saXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGVudC5hZGRDaGlsZChwcmVmYWJfaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBwcmVmYWJfaXRlbS5nZXRDb21wb25lbnQoc3l5eF91aV9jdHJfaXRlbSkucmVmcmVzaChpLCBhcHBzW2ldLCB0aGlzLmNsaWNrX2dhbWVfaXRlbS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrX2dhbWVfaXRlbSgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBpZiAoc3l5eF9jdHJfbWFuYWdlci5jaGVja19pc19jdHJfdGVzdF9jb21wZWxldGUoKSkgeyAvLyDnrKzkuozmrKHkuLp0cnVl77yM5bCx5LiN6ZyA6KaB5LqGXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJld2FyZF9udW0gPSBzeXl4X2N0cl9tYW5hZ2VyLmdldF9uZXdfcHJvZHVjdHNfcmV3YXJkKCkgLy8gMTAwXHJcbiAgICAgICAgaWYgKHJld2FyZF9udW0gIT0gMCkgeyAvLyDmnInlpZblirHml7ZcclxuICAgICAgICAgICAgLy8gdGhpcy5mbHlfYW5pX25vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmZseV9hbmlfbm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLmZseV9hbmlfbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiZmVpY2h1YW5zaGlcIikgLy8g6aOY6YeR5biB55qE5Yqo55S7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYudGlwX3RpdGxlMi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBzZWxmLmljb25fdGlwcy5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYudGhhbmtzX25vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgc2VsZi50aGFua3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiemlcIilcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGYuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICB9LCAxNTAwKVxyXG4gICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgIH0gZWxzZSB7Ly8g5rKh5aWW5Yqx5pe2XHJcbiAgICAgICAgICAgIHNlbGYuZmx5X2FuaV9ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHNlbGYudGlwX3RpdGxlMi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHNlbGYuaWNvbl90aXBzLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICBzZWxmLnRoYW5rc19ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgc2VsZi50aGFua3Nfbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwiemlcIilcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWxmLmhpZGUoKVxyXG4gICAgICAgICAgICB9LCAxNTAwKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jYWxsX2JhY2sgJiYgdGhpcy5jYWxsX2JhY2soc3l5eF9jdHJfbWFuYWdlci5nZXRfbmV3X3Byb2R1Y3RzX3Jld2FyZCgpKSAvLyAxMDBcclxuICAgICAgICBzeXl4X2N0cl9tYW5hZ2VyLnNldF9jdHJfdGVzdF9jb21wZWxldGUoKSAvLyDlj5jkuLp0cnVlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uX2NsaWNrX2Nsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0X2RlZmF1bHRfcG9zKHN0eWxlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldF9zdHlsZV9wb3MoeCwgeSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMubm9kZSlcclxuICAgICAgICAgICAgdGhpcy5vbl9oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uX2hpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5idG5fY2xvc2Uub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbl9jbGlja19jbG9zZSwgdGhpcylcclxuICAgIH1cclxufVxyXG4iXX0=