
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/main/upgradePanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3be00JMHXxD1b56alKm6SDj', 'upgradePanel');
// scripts/main/upgradePanel.ts

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
var ad_1 = require("../sdk/ad");
var data_1 = require("../sdk/data");
var uiBase_1 = require("../uiBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var upgradePanel = /** @class */ (function (_super) {
    __extends(upgradePanel, _super);
    function upgradePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lvLabels = null;
        _this.upgradeBtns = null;
        return _this;
    }
    upgradePanel.prototype.onLoad = function () {
        this.initUi();
    };
    upgradePanel.prototype.start = function () {
        this.init();
    };
    upgradePanel.prototype.init = function () {
        for (var i = 0; i < this.lvLabels.childrenCount; i++) {
            var lv = data_1.data.getCache("attributeLv", this.lvLabels.children[i].name);
            this.lvLabels.children[i].getComponent(cc.Label).string = lv == 10 ? "Max" : "Lv" + lv;
            this.upgradeBtns.children[i].active = lv == 10 ? false : true;
        }
    };
    upgradePanel.prototype.back = function () {
        this.node.destroy();
    };
    upgradePanel.prototype.watchAdUpgrade = function (event) {
        var _this = this;
        var target = event.target;
        var type = target.getComponent(cc.Button).clickEvents[0].customEventData;
        // audioManager.pauseBgGame()
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                _this.upgrade(type);
            }
        });
    };
    upgradePanel.prototype.upgrade = function (type) {
        var lv = data_1.data.getCache("attributeLv", type) + 1;
        lv = lv > 10 ? 10 : lv;
        data_1.data.updateCache("attributeLv", type, lv);
        this.init();
    };
    __decorate([
        property(cc.Node)
    ], upgradePanel.prototype, "lvLabels", void 0);
    __decorate([
        property(cc.Node)
    ], upgradePanel.prototype, "upgradeBtns", void 0);
    upgradePanel = __decorate([
        ccclass
    ], upgradePanel);
    return upgradePanel;
}(uiBase_1.default));
exports.default = upgradePanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFpblxcdXBncmFkZVBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGdDQUErQjtBQUMvQixvQ0FBbUM7QUFDbkMsb0NBQStCO0FBR3pCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFNO0lBQWhEO1FBQUEscUVBMENDO1FBdkNHLGNBQVEsR0FBUyxJQUFJLENBQUM7UUFFdEIsaUJBQVcsR0FBUyxJQUFJLENBQUM7O0lBcUM3QixDQUFDO0lBbkNHLDZCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELDRCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNELDJCQUFJLEdBQUo7UUFDSSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDMUMsSUFBSSxFQUFFLEdBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBUyxhQUFhLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxJQUFFLEVBQUUsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQSxPQUFLLEVBQUksQ0FBQztZQUMvRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxJQUFFLEVBQUUsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUM7U0FDekQ7SUFDTCxDQUFDO0lBQ0QsMkJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELHFDQUFjLEdBQWQsVUFBZSxLQUEwQjtRQUF6QyxpQkFXQztRQVZHLElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQztRQUV6RSw2QkFBNkI7UUFDN0IsT0FBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDckIsNEJBQTRCO1lBQzVCLElBQUcsSUFBSSxFQUFDO2dCQUNKLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEI7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCw4QkFBTyxHQUFQLFVBQVEsSUFBVztRQUNmLElBQUksRUFBRSxHQUFDLFdBQUksQ0FBQyxRQUFRLENBQVMsYUFBYSxFQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUNuRCxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUM7UUFDZixXQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUF0Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztrREFDSTtJQUV0QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUNPO0lBTFIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQTBDaEM7SUFBRCxtQkFBQztDQTFDRCxBQTBDQyxDQTFDeUMsZ0JBQU0sR0EwQy9DO2tCQTFDb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBhZCB9IGZyb20gXCIuLi9zZGsvYWRcIjtcbmltcG9ydCB7IGRhdGEgfSBmcm9tIFwiLi4vc2RrL2RhdGFcIjtcbmltcG9ydCB1aUJhc2UgZnJvbSBcIi4uL3VpQmFzZVwiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi9hdWRpb01hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHVwZ3JhZGVQYW5lbCBleHRlbmRzIHVpQmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsdkxhYmVsczpjYy5Ob2RlPW51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdXBncmFkZUJ0bnM6Y2MuTm9kZT1udWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmluaXRVaSgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpe1xuICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMubHZMYWJlbHMuY2hpbGRyZW5Db3VudDtpKyspe1xuICAgICAgICAgICAgbGV0IGx2PWRhdGEuZ2V0Q2FjaGU8bnVtYmVyPihcImF0dHJpYnV0ZUx2XCIsdGhpcy5sdkxhYmVscy5jaGlsZHJlbltpXS5uYW1lKTtcbiAgICAgICAgICAgIHRoaXMubHZMYWJlbHMuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9bHY9PTEwP1wiTWF4XCI6YEx2JHtsdn1gO1xuICAgICAgICAgICAgdGhpcy51cGdyYWRlQnRucy5jaGlsZHJlbltpXS5hY3RpdmU9bHY9PTEwP2ZhbHNlOnRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYmFjaygpIHtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgd2F0Y2hBZFVwZ3JhZGUoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpIHtcbiAgICAgICAgbGV0IHRhcmdldDogY2MuTm9kZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgbGV0IHR5cGUgPSB0YXJnZXQuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuY2xpY2tFdmVudHNbMF0uY3VzdG9tRXZlbnREYXRhO1xuXG4gICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wYXVzZUJnR2FtZSgpXG4gICAgICAgIGFkLnZpZGVvX3Nob3coKS50aGVuKGlzb2s9PntcbiAgICAgICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wbGF5QmdHYW1lKClcbiAgICAgICAgICAgIGlmKGlzb2spe1xuICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZSh0eXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZ3JhZGUodHlwZTpzdHJpbmcpe1xuICAgICAgICBsZXQgbHY9ZGF0YS5nZXRDYWNoZTxudW1iZXI+KFwiYXR0cmlidXRlTHZcIix0eXBlKSsxO1xuICAgICAgICBsdj1sdj4xMD8xMDpsdjtcbiAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcImF0dHJpYnV0ZUx2XCIsdHlwZSxsdik7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbn1cbiJdfQ==