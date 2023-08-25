"use strict";
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