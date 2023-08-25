
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ui/buffPopup.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '700fbEzyEFJnasPygdD6hzp', 'buffPopup');
// scripts/game/ui/buffPopup.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var export_sdk_1 = require("../../../syyx_sdk/export_sdk");
var ad_1 = require("../../sdk/ad");
var uiBase_1 = require("../../uiBase");
var uiManager_1 = require("./uiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var buffPopup = /** @class */ (function (_super) {
    __extends(buffPopup, _super);
    function buffPopup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.UIType = -1;
        _this.onNewBackHomeClick = true;
        return _this;
    }
    buffPopup_1 = buffPopup;
    buffPopup.prototype.onLoad = function () {
        this.initUi();
    };
    buffPopup.prototype.start = function () {
    };
    buffPopup.prototype.onEnable = function () {
        this.showRet();
    };
    buffPopup.prototype.wudi = function () {
        var _this = this;
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                uiManager_1.default.ins.wuDi();
                _this.close();
            }
        });
    };
    buffPopup.prototype.fullHp = function () {
        var _this = this;
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                uiManager_1.default.ins.fullHp();
                _this.close();
            }
        });
    };
    buffPopup.prototype.doubleDamage = function () {
        var _this = this;
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                cc.log("doubleDamage..........");
                uiManager_1.default.ins.doubleDamage();
                _this.subclose();
            }
        });
    };
    buffPopup.prototype.subclose = function () {
        export_sdk_1.Export.hide_naive_YSAD('YSJS'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
        this.node.destroy();
        cc.director.resume();
    };
    buffPopup.prototype.showRet = function () {
        cc.log("buff popup ....");
        this.onNewBackHomeClick = true;
        buffPopup_1.native_have_show = false;
        var uistr = "Canvas/ui/doubleDamagePopup/fail_parent";
        if (this.UIType == 1) {
            uistr = "Canvas/ui/doubleDamagePopup/fail_parent";
        }
        else if (this.UIType == 2) {
            uistr = "Canvas/ui/fullHpPopup/fail_parent";
        }
        else if (this.UIType == 3) {
            uistr = "Canvas/ui/wuDiPopup/fail_parent";
        }
        cc.find(uistr).setScale(0.5);
        setTimeout(function () {
            export_sdk_1.Export.show_native_YSAD("10302001", uistr, function () { buffPopup_1.native_have_show = true; });
        }, 400);
    };
    buffPopup.prototype.close = function () {
        if (this.onNewBackHomeClick && buffPopup_1.native_have_show) {
            this.onNewBackHomeClick = false;
            export_sdk_1.Export.click_native_YSAD("YSJS"); // 触发ysbn
        }
        else { // 否则回到游戏
            this.onNewBackHomeClick = true;
            buffPopup_1.native_have_show = false;
            this.subclose();
        }
    };
    var buffPopup_1;
    buffPopup.native_have_show = false; // 原生结banner展示
    __decorate([
        property(cc.Integer)
    ], buffPopup.prototype, "UIType", void 0);
    buffPopup = buffPopup_1 = __decorate([
        ccclass
    ], buffPopup);
    return buffPopup;
}(uiBase_1.default));
exports.default = buffPopup;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdWlcXGJ1ZmZQb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiwyREFBc0Q7QUFDdEQsbUNBQWtDO0FBQ2xDLHVDQUFrQztBQUNsQyx5Q0FBb0M7QUFFOUIsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBdUMsNkJBQU07SUFBN0M7UUFBQSxxRUEwRkM7UUF0RkcsWUFBTSxHQUFVLENBQUMsQ0FBQyxDQUFBO1FBeUVsQix3QkFBa0IsR0FBWSxJQUFJLENBQUM7O0lBYXZDLENBQUM7a0JBMUZvQixTQUFTO0lBTTFCLDBCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELHlCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRVMsNEJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUVELHdCQUFJLEdBQUo7UUFBQSxpQkFTQztRQVJHLDZCQUE2QjtRQUM3QixPQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNyQiw0QkFBNEI7WUFDNUIsSUFBRyxJQUFJLEVBQUM7Z0JBQ0osbUJBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDBCQUFNLEdBQU47UUFBQSxpQkFTQztRQVJHLDZCQUE2QjtRQUM3QixPQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNyQiw0QkFBNEI7WUFDNUIsSUFBRyxJQUFJLEVBQUM7Z0JBQ0osbUJBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELGdDQUFZLEdBQVo7UUFBQSxpQkFVQztRQVRHLDZCQUE2QjtRQUM3QixPQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNyQiw0QkFBNEI7WUFDNUIsSUFBRyxJQUFJLEVBQUM7Z0JBQ0osRUFBRSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO2dCQUNoQyxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsNEJBQVEsR0FBUjtRQUNJLG1CQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsK0JBQStCO1FBRTlELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBR08sMkJBQU8sR0FBZjtRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUN6QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFBO1FBQzlCLFdBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUE7UUFFbEMsSUFBSSxLQUFLLEdBQUcseUNBQXlDLENBQUE7UUFDckQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBQztZQUNmLEtBQUssR0FBRyx5Q0FBeUMsQ0FBQTtTQUNwRDthQUFLLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUM7WUFDcEIsS0FBSyxHQUFHLG1DQUFtQyxDQUFBO1NBQzlDO2FBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBQztZQUNyQixLQUFLLEdBQUcsaUNBQWlDLENBQUE7U0FDNUM7UUFDRCxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUU1QixVQUFVLENBQUM7WUFDUCxtQkFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUcsY0FBUSxXQUFTLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0YsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUdELHlCQUFLLEdBQUw7UUFDSSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxXQUFTLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQTtZQUMvQixtQkFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsU0FBUztTQUM3QzthQUFNLEVBQUUsU0FBUztZQUNkLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUE7WUFDOUIsV0FBUyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQTtZQUVsQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7U0FFbEI7SUFDTCxDQUFDOztJQWpDTSwwQkFBZ0IsR0FBWSxLQUFLLENBQUMsQ0FBRSxjQUFjO0lBcER6RDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzZDQUNIO0lBSkQsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQTBGN0I7SUFBRCxnQkFBQztDQTFGRCxBQTBGQyxDQTFGc0MsZ0JBQU0sR0EwRjVDO2tCQTFGb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBFeHBvcnQgfSBmcm9tIFwiLi4vLi4vLi4vc3l5eF9zZGsvZXhwb3J0X3Nka1wiO1xuaW1wb3J0IHsgYWQgfSBmcm9tIFwiLi4vLi4vc2RrL2FkXCI7XG5pbXBvcnQgdWlCYXNlIGZyb20gXCIuLi8uLi91aUJhc2VcIjtcbmltcG9ydCB1aU1hbmFnZXIgZnJvbSBcIi4vdWlNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYnVmZlBvcHVwIGV4dGVuZHMgdWlCYXNlIHtcblxuXG4gICAgQHByb3BlcnR5KGNjLkludGVnZXIpXG4gICAgVUlUeXBlOm51bWJlciA9IC0xXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLmluaXRVaSgpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dSZXQoKVxuICAgIH1cblxuICAgIHd1ZGkoKXtcbiAgICAgICAgLy8gYXVkaW9NYW5hZ2VyLnBhdXNlQmdHYW1lKClcbiAgICAgICAgYWQudmlkZW9fc2hvdygpLnRoZW4oaXNvaz0+e1xuICAgICAgICAgICAgLy8gYXVkaW9NYW5hZ2VyLnBsYXlCZ0dhbWUoKVxuICAgICAgICAgICAgaWYoaXNvayl7XG4gICAgICAgICAgICAgICAgdWlNYW5hZ2VyLmlucy53dURpKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVsbEhwKCl7XG4gICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wYXVzZUJnR2FtZSgpXG4gICAgICAgIGFkLnZpZGVvX3Nob3coKS50aGVuKGlzb2s9PntcbiAgICAgICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wbGF5QmdHYW1lKClcbiAgICAgICAgICAgIGlmKGlzb2spe1xuICAgICAgICAgICAgICAgIHVpTWFuYWdlci5pbnMuZnVsbEhwKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZG91YmxlRGFtYWdlKCl7XG4gICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wYXVzZUJnR2FtZSgpXG4gICAgICAgIGFkLnZpZGVvX3Nob3coKS50aGVuKGlzb2s9PntcbiAgICAgICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wbGF5QmdHYW1lKClcbiAgICAgICAgICAgIGlmKGlzb2spe1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcImRvdWJsZURhbWFnZS4uLi4uLi4uLi5cIilcbiAgICAgICAgICAgICAgICB1aU1hbmFnZXIuaW5zLmRvdWJsZURhbWFnZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN1YmNsb3NlKCl7XG4gICAgICAgIEV4cG9ydC5oaWRlX25haXZlX1lTQUQoJ1lTSlMnKSAvLyDpmpDol4/ljp/nlJ/lub/lkYog5LygJ1lTQk4n77yM5oSP5oCd5piv5ZCM5pe25Lya6aKE5Yqg6L29WVNCTlxuICAgICAgICBcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgY2MuZGlyZWN0b3IucmVzdW1lKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIG5hdGl2ZV9oYXZlX3Nob3c6IGJvb2xlYW4gPSBmYWxzZTsgIC8vIOWOn+eUn+e7k2Jhbm5lcuWxleekulxuICAgIHByaXZhdGUgc2hvd1JldCgpIHtcbiAgICAgICAgY2MubG9nKFwiYnVmZiBwb3B1cCAuLi4uXCIpXG4gICAgICAgIHRoaXMub25OZXdCYWNrSG9tZUNsaWNrID0gdHJ1ZVxuICAgICAgICBidWZmUG9wdXAubmF0aXZlX2hhdmVfc2hvdyA9IGZhbHNlXG4gICAgICAgIFxuICAgICAgICB2YXIgdWlzdHIgPSBcIkNhbnZhcy91aS9kb3VibGVEYW1hZ2VQb3B1cC9mYWlsX3BhcmVudFwiXG4gICAgICAgIGlmICh0aGlzLlVJVHlwZT09MSl7XG4gICAgICAgICAgICB1aXN0ciA9IFwiQ2FudmFzL3VpL2RvdWJsZURhbWFnZVBvcHVwL2ZhaWxfcGFyZW50XCJcbiAgICAgICAgfWVsc2UgaWYodGhpcy5VSVR5cGU9PTIpe1xuICAgICAgICAgICAgdWlzdHIgPSBcIkNhbnZhcy91aS9mdWxsSHBQb3B1cC9mYWlsX3BhcmVudFwiXG4gICAgICAgIH1lbHNlIGlmICh0aGlzLlVJVHlwZT09Myl7XG4gICAgICAgICAgICB1aXN0ciA9IFwiQ2FudmFzL3VpL3d1RGlQb3B1cC9mYWlsX3BhcmVudFwiXG4gICAgICAgIH1cbiAgICAgICAgY2MuZmluZCh1aXN0cikuc2V0U2NhbGUoMC41KVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgRXhwb3J0LnNob3dfbmF0aXZlX1lTQUQoXCIxMDMwMjAwMVwiLHVpc3RyICwgKCkgPT4geyBidWZmUG9wdXAubmF0aXZlX2hhdmVfc2hvdyA9IHRydWUgfSlcbiAgICAgICAgfSwgNDAwKTtcbiAgICB9XG5cbiAgICBvbk5ld0JhY2tIb21lQ2xpY2s6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5vbk5ld0JhY2tIb21lQ2xpY2sgJiYgYnVmZlBvcHVwLm5hdGl2ZV9oYXZlX3Nob3cpIHtcbiAgICAgICAgICAgIHRoaXMub25OZXdCYWNrSG9tZUNsaWNrID0gZmFsc2VcbiAgICAgICAgICAgIEV4cG9ydC5jbGlja19uYXRpdmVfWVNBRChcIllTSlNcIikgLy8g6Kem5Y+ReXNiblxuICAgICAgICB9IGVsc2UgeyAvLyDlkKbliJnlm57liLDmuLjmiI9cbiAgICAgICAgICAgIHRoaXMub25OZXdCYWNrSG9tZUNsaWNrID0gdHJ1ZVxuICAgICAgICAgICAgYnVmZlBvcHVwLm5hdGl2ZV9oYXZlX3Nob3cgPSBmYWxzZVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN1YmNsb3NlKClcblxuICAgICAgICB9XG4gICAgfVxufVxuIl19