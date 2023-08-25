"use strict";
cc._RF.push(module, '41c29stRcNAHIP7/d1825in', 'Msg');
// scripts/Msg.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Msg = /** @class */ (function (_super) {
    __extends(Msg, _super);
    function Msg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Msg_1 = Msg;
    Msg.tweeNode = function (node) {
        cc.tween(node)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
    };
    Msg.Show = function (msg) {
        {
            if (Msg_1.isShow) {
                return;
            }
            Msg_1.isShow = true;
            Msg_1.okbtn_callback = null;
            cc.loader.loadRes(this.tipsPanelPrefab, cc.Prefab, function (error, resource) {
                Msg_1.isShow = false;
                if (error) {
                    cc.error(error);
                    return;
                }
                if (resource) {
                    var node_1 = cc.instantiate(resource);
                    if (node_1) {
                        cc.find("Canvas").addChild(node_1);
                        node_1.active = true;
                        node_1.position = cc.Vec3.ZERO;
                        var label = cc.find("Label", node_1).getComponent(cc.Label);
                        label.string = msg;
                        node_1.scale = 0;
                        Msg_1.tweeNode(node_1);
                        label.scheduleOnce(function () {
                            node_1.destroy();
                        }, 1.5);
                    }
                }
            });
        }
    };
    var Msg_1;
    Msg.tipsPanelPrefab = "prefabs/ui/TipsPanel";
    Msg.isShow = false;
    Msg.okbtn_callback = null;
    Msg = Msg_1 = __decorate([
        ccclass
    ], Msg);
    return Msg;
}(cc.Component));
exports.default = Msg;

cc._RF.pop();