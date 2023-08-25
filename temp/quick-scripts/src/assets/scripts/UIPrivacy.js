"use strict";
cc._RF.push(module, 'ff1f5Wp8KpH3rpTWjh7NokH', 'UIPrivacy');
// scripts/UIPrivacy.ts

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
var data_1 = require("./sdk/data");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIPrivacy = /** @class */ (function (_super) {
    __extends(UIPrivacy, _super);
    function UIPrivacy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BackBtn = null; //返回
        _this.OKBtn = null; //直接领取    
        _this.ScaleNode = null;
        return _this;
    }
    UIPrivacy_1 = UIPrivacy;
    UIPrivacy.prototype.onLoad = function () {
        this._onLoad();
    };
    UIPrivacy.prototype._onLoad = function () {
        // this.BackBtn = cc.find("ScaleNode/BackBtn",this.node);        
        // this.OKBtn = cc.find("ScaleNode/OKBtn",this.node);
        this.ScaleNode = cc.find("ScaleNode", this.node);
        this._start();
    };
    UIPrivacy.prototype._start = function () {
        // this.OKBtn.on(cc.Node.EventType.TOUCH_END, this.OneceGet, this);
        // this.BackBtn.on(cc.Node.EventType.TOUCH_END, this.Back, this);
        this.onOpen();
    };
    UIPrivacy.prototype.onOpen = function () {
        this.ScaleNode.scale = 0;
        this.tweeNode(this.ScaleNode);
    };
    UIPrivacy.prototype.tweeNode = function (node) {
        cc.tween(node)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
    };
    /**
     * 直接领取
     */
    UIPrivacy.prototype.OneceGet = function () {
        data_1.data.setPrivacyOn(true);
        if (UIPrivacy_1.okbtn_callback) {
            UIPrivacy_1.okbtn_callback();
        }
        this.close();
    };
    /**
     * 返回
     */
    UIPrivacy.prototype.Back = function () {
        data_1.data.setPrivacyOn(false);
        // this.close();
        try {
            //@ts-ignore
            qg.exitApplication({
                success: function () {
                    console.log("退出成功！");
                },
                fail: function () {
                    console.log("退出失败！");
                },
                complete: function () {
                    console.log("退出执行完成！");
                }
            });
        }
        catch (error) {
            cc.log("GameExit erro:", JSON.stringify(error));
        }
    };
    UIPrivacy.prototype.close = function () {
        cc.game.targetOff(this);
        this.node.destroy();
    };
    UIPrivacy.prototype.onDestroy = function () {
        cc.game.targetOff(this);
    };
    UIPrivacy.ShowPanel = function (callback) {
        if (callback === void 0) { callback = null; }
        {
            if (UIPrivacy_1.isShow) {
                return;
            }
            UIPrivacy_1.isShow = true;
            UIPrivacy_1.okbtn_callback = null;
            cc.loader.loadRes("prefabs/ui/UIPrivacy", cc.Prefab, function (error, resource) {
                UIPrivacy_1.isShow = false;
                if (callback) {
                    UIPrivacy_1.okbtn_callback = callback;
                }
                if (error) {
                    cc.error(error);
                    return;
                }
                if (resource) {
                    var node = cc.instantiate(resource);
                    if (node) {
                        cc.find("Canvas").addChild(node);
                        node.active = true;
                        node.position = cc.Vec3.ZERO;
                    }
                }
            });
        }
    };
    var UIPrivacy_1;
    UIPrivacy.native_have_show = false; // 原生结banner展示
    UIPrivacy.isShow = false;
    UIPrivacy.okbtn_callback = null;
    UIPrivacy = UIPrivacy_1 = __decorate([
        ccclass
    ], UIPrivacy);
    return UIPrivacy;
}(cc.Component));
exports.default = UIPrivacy;

cc._RF.pop();