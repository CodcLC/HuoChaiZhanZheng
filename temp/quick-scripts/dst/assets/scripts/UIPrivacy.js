
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UIPrivacy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVUlQcml2YWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFrQztBQUc1QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQWdIQztRQTlHVyxhQUFPLEdBQVksSUFBSSxDQUFDLENBQUEsSUFBSTtRQUU1QixXQUFLLEdBQVksSUFBSSxDQUFDLENBQUEsVUFBVTtRQUVoQyxlQUFTLEdBQVksSUFBSSxDQUFDOztJQTBHdEMsQ0FBQztrQkFoSG9CLFNBQVM7SUFVMUIsMEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRU8sMkJBQU8sR0FBZjtRQUNJLGlFQUFpRTtRQUNqRSxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRWxCLENBQUM7SUFFTywwQkFBTSxHQUFkO1FBQ0ksbUVBQW1FO1FBQ25FLGlFQUFpRTtRQUVqRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUNTLDBCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSw0QkFBUSxHQUFmLFVBQWdCLElBQWE7UUFDekIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDVCxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxF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QztDQWhIRCxBQWdIQyxDQWhIc0MsRUFBRSxDQUFDLFNBQVMsR0FnSGxEO2tCQWhIb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRhdGEgfSBmcm9tIFwiLi9zZGsvZGF0YVwiO1xuXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVByaXZhY3kgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBCYWNrQnRuOiBjYy5Ob2RlID0gbnVsbDsvL+i/lOWbnlxuICAgIFxuICAgIHByaXZhdGUgT0tCdG46IGNjLk5vZGUgPSBudWxsOy8v55u05o6l6aKG5Y+WICAgIFxuICAgIFxuICAgIHByaXZhdGUgU2NhbGVOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHN0YXRpYyBuYXRpdmVfaGF2ZV9zaG93OiBib29sZWFuID0gZmFsc2U7ICAvLyDljp/nlJ/nu5NiYW5uZXLlsZXnpLpcblxuICAgIG9uTG9hZCgpe1xuICAgICAgICB0aGlzLl9vbkxvYWQoKVxuICAgIH1cblxuICAgIHByaXZhdGUgX29uTG9hZCgpIHtcbiAgICAgICAgLy8gdGhpcy5CYWNrQnRuID0gY2MuZmluZChcIlNjYWxlTm9kZS9CYWNrQnRuXCIsdGhpcy5ub2RlKTsgICAgICAgIFxuICAgICAgICAvLyB0aGlzLk9LQnRuID0gY2MuZmluZChcIlNjYWxlTm9kZS9PS0J0blwiLHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMuU2NhbGVOb2RlID0gY2MuZmluZChcIlNjYWxlTm9kZVwiLHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMuX3N0YXJ0KCk7XG4gICAgICBcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zdGFydCgpIHsgICAgICAgIFxuICAgICAgICAvLyB0aGlzLk9LQnRuLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5PbmVjZUdldCwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMuQmFja0J0bi5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMuQmFjaywgdGhpcyk7XG4gICAgICBcbiAgICAgICAgdGhpcy5vbk9wZW4oKVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xuICAgICAgICB0aGlzLlNjYWxlTm9kZS5zY2FsZSA9IDA7XG4gICAgICAgIHRoaXMudHdlZU5vZGUodGhpcy5TY2FsZU5vZGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0d2VlTm9kZShub2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIGNjLnR3ZWVuKG5vZGUpXG4gICAgICAgICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImJhY2tPdXRcIiB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOebtOaOpemihuWPllxuICAgICAqL1xuICAgICBPbmVjZUdldCgpIHtcbiAgICAgICAgZGF0YS5zZXRQcml2YWN5T24odHJ1ZSlcbiAgICAgICAgaWYgKFVJUHJpdmFjeS5va2J0bl9jYWxsYmFjayl7XG4gICAgICAgICAgICBVSVByaXZhY3kub2tidG5fY2FsbGJhY2soKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2UoKVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDov5Tlm55cbiAgICAgKi9cbiAgICAgQmFjaygpIHtcbiAgICAgICAgZGF0YS5zZXRQcml2YWN5T24oZmFsc2UpICAgXG4gICAgICAgIC8vIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgcWcuZXhpdEFwcGxpY2F0aW9uKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YCA5Ye65oiQ5Yqf77yBXCIpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumAgOWHuuWksei0pe+8gVwiKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6YCA5Ye65omn6KGM5a6M5oiQ77yBXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY2MubG9nKFwiR2FtZUV4aXQgZXJybzpcIiwgSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbG9zZSgpIHtcbiAgICAgICAgY2MuZ2FtZS50YXJnZXRPZmYodGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KClcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCkge1xuICAgICAgICBjYy5nYW1lLnRhcmdldE9mZih0aGlzKTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBpc1Nob3c6Ym9vbGVhbiA9IGZhbHNlXG4gICAgc3RhdGljIG9rYnRuX2NhbGxiYWNrOkZ1bmN0aW9uICA9IG51bGxcbiAgICAgICAgICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgU2hvd1BhbmVsKGNhbGxiYWNrOiBGdW5jdGlvbiA9IG51bGwpIHtcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKFVJUHJpdmFjeS5pc1Nob3cpe1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVUlQcml2YWN5LmlzU2hvdyA9IHRydWVcbiAgICAgICAgICAgIFVJUHJpdmFjeS5va2J0bl9jYWxsYmFjayA9IG51bGxcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKFwicHJlZmFicy91aS9VSVByaXZhY3lcIiwgY2MuUHJlZmFiLCAoZXJyb3I6RXJyb3IsIHJlc291cmNlOmNjLlByZWZhYikgPT4ge1xuICAgICAgICAgICAgICAgIFVJUHJpdmFjeS5pc1Nob3cgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBVSVByaXZhY3kub2tidG5fY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZShyZXNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5maW5kKFwiQ2FudmFzXCIpLmFkZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNjLlZlYzMuWkVSTztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=