
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/initLoading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2ad15n162lFCLXoodReaQy3', 'initLoading');
// scripts/initLoading.ts

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
var export_sdk_1 = require("../syyx_sdk/export_sdk");
var syyx_sdk_api_1 = require("../syyx_sdk/syyx_sdk_api");
var caijiTools_1 = require("./caijiTools");
var ad_1 = require("./sdk/ad");
var data_1 = require("./sdk/data");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var initLoading = /** @class */ (function (_super) {
    __extends(initLoading, _super);
    function initLoading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.successNum = 0;
        // bundleName:string[]=["mainUi","prefabs","game","sp_enemy","sp_others","sp_player","sounds"];
        _this.bundleName = ["game", "sp_enemy", "sp_others", "sounds"];
        _this.actionTime = 1;
        _this.version = "1.0.1";
        return _this;
    }
    initLoading.prototype.start = function () {
        var _this = this;
        data_1.data.init(false).then(function () {
            _this.addNewData();
            // this.unlockAllLevel();
        });
        // if (cc.sys.isBrowser){
        //     ad.init(true);
        // }else
        {
            ad_1.ad.init(false);
        }
        this.loadBundle();
        this.initSDK();
    };
    initLoading.prototype.initSDK = function () {
        console.log("init SDK....");
        syyx_sdk_api_1.syyx_sdk_api.init(function (ret, param) {
            if (ret === true) {
                if (param.load_init_complete) { }
                if (param.load_local_complete) {
                    //本地配置加载完成
                    setTimeout(function () {
                        export_sdk_1.Export.preload_YSAD("10304001"); // 预加载原生banner
                    }, 600);
                }
                if (param.load_remote_complete) {
                    //远端配置拉取完毕
                    console.log("sdk-----business_config data:" + JSON.stringify(param.business_config));
                }
            }
        }.bind(this));
    };
    initLoading.prototype.unlockAllLevel = function () {
        for (var i = 0; i < 20; i++) {
            data_1.data.updateCache("levelUnlock", i.toString(), 1);
        }
    };
    initLoading.prototype.loadBundle = function () {
        var _this = this;
        var self = this;
        for (var _i = 0, _a = this.bundleName; _i < _a.length; _i++) {
            var name = _a[_i];
            caijiTools_1.caijiTools.loadBundlePackage(name, function (successName) {
                self.successNum++;
                if (self.successNum == self.bundleName.length) {
                    if (cc.director.getTotalTime() < 1000) {
                        _this.scheduleOnce(function () {
                            _this.enterMain();
                        }, 0.5);
                    }
                    else {
                        _this.enterMain();
                    }
                }
            });
        }
    };
    initLoading.prototype.enterMain = function () {
        for (var _i = 0, _a = this.node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.childrenCount != 0) {
                cc.tween(child.children[0])
                    .to(this.actionTime, { color: cc.color(0, 0, 0) })
                    .start();
            }
            cc.tween(child)
                .to(this.actionTime, { color: cc.color(0, 0, 0) })
                .start();
        }
        this.scheduleOnce(function () {
            cc.director.loadScene("main");
        }, this.actionTime);
    };
    initLoading.prototype.addNewData = function () {
        if (data_1.data.getCache("Base", "version") == this.version)
            return;
        data_1.data.updateCache("Base", "version", this.version);
    };
    initLoading = __decorate([
        ccclass
    ], initLoading);
    return initLoading;
}(cc.Component));
exports.default = initLoading;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcaW5pdExvYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYscURBQWdEO0FBQ2hELHlEQUF3RDtBQUN4RCwyQ0FBMEM7QUFDMUMsK0JBQThCO0FBQzlCLG1DQUFrQztBQUU1QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQXdGQztRQXRGRyxnQkFBVSxHQUFRLENBQUMsQ0FBQztRQUNwQiwrRkFBK0Y7UUFDL0YsZ0JBQVUsR0FBVSxDQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELGdCQUFVLEdBQVEsQ0FBQyxDQUFDO1FBQ3BCLGFBQU8sR0FBUSxPQUFPLENBQUM7O0lBaUYzQixDQUFDO0lBL0VHLDJCQUFLLEdBQUw7UUFBQSxpQkFlQztRQWRHLFdBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQix5QkFBeUI7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDSCx5QkFBeUI7UUFDekIscUJBQXFCO1FBQ3JCLFFBQVE7UUFDUjtZQUNJLE9BQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFHTSw2QkFBTyxHQUFkO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUMz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QyxVQUFVLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsZ0NBQVUsR0FBVjtRQUNJLElBQUcsV0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsU0FBUyxDQUFDLElBQUUsSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPO1FBQ3pELFdBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQXZGZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQXdGL0I7SUFBRCxrQkFBQztDQXhGRCxBQXdGQyxDQXhGd0MsRUFBRSxDQUFDLFNBQVMsR0F3RnBEO2tCQXhGb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBFeHBvcnQgfSBmcm9tIFwiLi4vc3l5eF9zZGsvZXhwb3J0X3Nka1wiO1xuaW1wb3J0IHsgc3l5eF9zZGtfYXBpIH0gZnJvbSBcIi4uL3N5eXhfc2RrL3N5eXhfc2RrX2FwaVwiO1xuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuL2NhaWppVG9vbHNcIjtcbmltcG9ydCB7IGFkIH0gZnJvbSBcIi4vc2RrL2FkXCI7XG5pbXBvcnQgeyBkYXRhIH0gZnJvbSBcIi4vc2RrL2RhdGFcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBpbml0TG9hZGluZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBzdWNjZXNzTnVtOm51bWJlcj0wO1xuICAgIC8vIGJ1bmRsZU5hbWU6c3RyaW5nW109W1wibWFpblVpXCIsXCJwcmVmYWJzXCIsXCJnYW1lXCIsXCJzcF9lbmVteVwiLFwic3Bfb3RoZXJzXCIsXCJzcF9wbGF5ZXJcIixcInNvdW5kc1wiXTtcbiAgICBidW5kbGVOYW1lOnN0cmluZ1tdPVtcImdhbWVcIixcInNwX2VuZW15XCIsXCJzcF9vdGhlcnNcIixcInNvdW5kc1wiXTtcblxuICAgIGFjdGlvblRpbWU6bnVtYmVyPTE7XG4gICAgdmVyc2lvbjpzdHJpbmc9XCIxLjAuMVwiO1xuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICBkYXRhLmluaXQoZmFsc2UpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIHRoaXMuYWRkTmV3RGF0YSgpO1xuICAgICAgICAgICAgLy8gdGhpcy51bmxvY2tBbGxMZXZlbCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgKGNjLnN5cy5pc0Jyb3dzZXIpe1xuICAgICAgICAvLyAgICAgYWQuaW5pdCh0cnVlKTtcbiAgICAgICAgLy8gfWVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgYWQuaW5pdChmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRCdW5kbGUoKTtcblxuICAgICAgICB0aGlzLmluaXRTREsoKVxuICAgIH1cblxuXG4gICAgcHVibGljIGluaXRTREsoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW5pdCBTREsuLi4uXCIpXG4gICAgICAgIHN5eXhfc2RrX2FwaS5pbml0KGZ1bmN0aW9uIChyZXQsIHBhcmFtKSB7XG4gICAgICAgICAgICBpZiAocmV0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtLmxvYWRfaW5pdF9jb21wbGV0ZSkge31cbiAgICAgICAgICAgICAgICBpZiAocGFyYW0ubG9hZF9sb2NhbF9jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvL+acrOWcsOmFjee9ruWKoOi9veWujOaIkFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEV4cG9ydC5wcmVsb2FkX1lTQUQoXCIxMDMwNDAwMVwiKSAvLyDpooTliqDovb3ljp/nlJ9iYW5uZXJcbiAgICAgICAgICAgICAgICAgICAgfSwgNjAwKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS5sb2FkX3JlbW90ZV9jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAvL+i/nOerr+mFjee9ruaLieWPluWujOavlVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNkay0tLS0tYnVzaW5lc3NfY29uZmlnIGRhdGE6XCIgKyBKU09OLnN0cmluZ2lmeShwYXJhbS5idXNpbmVzc19jb25maWcpKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuICAgIFxuICAgIFxuICAgIHVubG9ja0FsbExldmVsKCl7XG4gICAgICAgIGZvcihsZXQgaT0wO2k8MjA7aSsrKXtcbiAgICAgICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJsZXZlbFVubG9ja1wiLGkudG9TdHJpbmcoKSwxKVxuICAgICAgICB9XG4gICAgfVxuICAgIGxvYWRCdW5kbGUoKXtcbiAgICAgICAgbGV0IHNlbGY9dGhpcztcbiAgICAgICAgZm9yKGxldCBuYW1lIG9mIHRoaXMuYnVuZGxlTmFtZSl7XG4gICAgICAgICAgICBjYWlqaVRvb2xzLmxvYWRCdW5kbGVQYWNrYWdlKG5hbWUsKHN1Y2Nlc3NOYW1lKT0+e1xuICAgICAgICAgICAgICAgIHNlbGYuc3VjY2Vzc051bSsrO1xuICAgICAgICAgICAgICAgIGlmKHNlbGYuc3VjY2Vzc051bT09c2VsZi5idW5kbGVOYW1lLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGNjLmRpcmVjdG9yLmdldFRvdGFsVGltZSgpPDEwMDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyTWFpbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwwLjUpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJNYWluKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbnRlck1haW4oKXtcbiAgICAgICAgZm9yKGxldCBjaGlsZCBvZiB0aGlzLm5vZGUuY2hpbGRyZW4pe1xuICAgICAgICAgICAgaWYoY2hpbGQuY2hpbGRyZW5Db3VudCE9MCl7XG4gICAgICAgICAgICAgICAgY2MudHdlZW4oY2hpbGQuY2hpbGRyZW5bMF0pXG4gICAgICAgICAgICAgICAgLnRvKHRoaXMuYWN0aW9uVGltZSx7Y29sb3I6Y2MuY29sb3IoMCwwLDApfSlcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLnR3ZWVuKGNoaWxkKVxuICAgICAgICAgICAgLnRvKHRoaXMuYWN0aW9uVGltZSx7Y29sb3I6Y2MuY29sb3IoMCwwLDApfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJtYWluXCIpO1xuICAgICAgICB9LHRoaXMuYWN0aW9uVGltZSk7XG4gICAgfVxuICAgIGFkZE5ld0RhdGEoKXtcbiAgICAgICAgaWYoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcInZlcnNpb25cIik9PXRoaXMudmVyc2lvbikgcmV0dXJuO1xuICAgICAgICBkYXRhLnVwZGF0ZUNhY2hlKFwiQmFzZVwiLFwidmVyc2lvblwiLHRoaXMudmVyc2lvbik7XG4gICAgfVxufVxuIl19