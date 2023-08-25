import { syyx_ctr_manager } from "../../controller/ctr_test/syyx_ctr_manager";
import { syyx_sdk_api } from "../../syyx_sdk_api";
import { syyx_sdk_utils } from "../../utils/syyx_sdk_utils";
import syyx_ui_ctr_item from "./syyx_ui_ctr_item";


const { ccclass, property } = cc._decorator;

@ccclass
export default class syyx_ui_ctr extends cc.Component {

    @property(cc.Node)
    game_node: cc.Node = null;

    @property(cc.Prefab)
    icon_prefab: cc.Prefab = null;

    @property(cc.Node)
    icon_layout: cc.Node = null;

    @property(cc.Node)
    fly_ani_node: cc.Node = null;

    @property(cc.Node)
    tip_title1: cc.Node = null;

    @property(cc.Node)
    tip_title2: cc.Node = null;

    @property(cc.Node)
    icon_tips: cc.Node = null;

    @property(cc.Node)
    thanks_node: cc.Node = null;

    @property(cc.Node)
    btn_close: cc.Node = null;

    call_back = undefined

    item_list = []

    constructor() {
        super()
    }

    show(call_back?) {
        if (this.node && !this.node.parent) {
            let order = syyx_sdk_utils.get_largest_zorder() // 32767
            this.node.parent = syyx_sdk_utils.get_stage() // return了这个 window["cc"].director.getScene()
            this.node.zIndex = order
            this.call_back = call_back
            this.on_show()
        }
    }

    on_show() {
        let self = this
        this.btn_close.on(cc.Node.EventType.TOUCH_END, this.on_click_close, this)

        //开场动画
        this.game_node.getComponent(cc.Animation).play("chuchang")
        this.tip_title1.active = true
        this.tip_title2.active = false
        this.icon_tips.active = true
        this.thanks_node.active = false
        this.fly_ani_node.active = false

        this.btn_close.active = false
        let time = syyx_sdk_api.get_business_data_by_key("ctr_test_close_button_delay")[0] // 延迟时间 1
        setTimeout(() => {
            self.btn_close.active = true
        }, time * 1000);

        let dataList = [{ // 测试新品尝鲜数据
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
        }]

        let ctr_test_data = syyx_ctr_manager.get_ctr_data().list.slice(0, 6) // 用里面的list 
        // let ctr_test_data = dataList.slice(0, 6)

        if (ctr_test_data) {

            ctr_test_data.forEach((item, index) => {
                item.name = `第${index+1}款`
            });

            // let cur_list = syyx_sdk_utils.shuffle(ctr_test_data) // 洗牌函数，随机位置
            // this.refresh(cur_list)
            this.refresh(ctr_test_data)
        }

    }

    refresh(apps) {
        this.icon_layout.removeAllChildren();
        if (apps && apps.length > 0) {
            var content = this.icon_layout
            for (var i = 0; i < apps.length; i++) {
                var prefab_item = void 0;
                if (!this.item_list[i]) {
                    prefab_item = cc.instantiate(this.icon_prefab);
                    this.item_list.push(prefab_item);
                } else {
                    prefab_item = this.item_list[i];
                }
                content.addChild(prefab_item);
                prefab_item.getComponent(syyx_ui_ctr_item).refresh(i, apps[i], this.click_game_item.bind(this))
            }
        }
    }

    click_game_item() {
        let self = this
        if (syyx_ctr_manager.check_is_ctr_test_compelete()) { // 第二次为true，就不需要了
            return
        }

        let reward_num = syyx_ctr_manager.get_new_products_reward() // 100
        if (reward_num != 0) { // 有奖励时
            // this.fly_ani_node.active = true
            this.fly_ani_node.active = false
            this.fly_ani_node.getComponent(cc.Animation).play("feichuanshi") // 飘金币的动画
            setTimeout(function () {

                self.tip_title2.active = true
                self.icon_tips.active = false

                self.thanks_node.active = true
                self.thanks_node.getComponent(cc.Animation).play("zi")
                setTimeout(function () {
                    // self.hide()
                }, 1500)
            }, 1000)
        } else {// 没奖励时
            self.fly_ani_node.active = false
            self.tip_title2.active = true
            self.icon_tips.active = false

            self.thanks_node.active = true
            self.thanks_node.getComponent(cc.Animation).play("zi")
            setTimeout(function () {
                // self.hide()
            }, 1500)
        }

        this.call_back && this.call_back(syyx_ctr_manager.get_new_products_reward()) // 100
        syyx_ctr_manager.set_ctr_test_compelete() // 变为true
    }


    on_click_close() {
        this.hide()
    }

    set_default_pos(style) {

    }

    set_style_pos(x, y) {

    }

    hide() {
        if (this.node && this.node.parent) {
            this.node.parent.removeChild(this.node)
            this.on_hide();
        }
    }

    on_hide() {
        this.btn_close.off(cc.Node.EventType.TOUCH_END, this.on_click_close, this)
    }
}
