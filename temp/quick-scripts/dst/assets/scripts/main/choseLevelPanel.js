
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/main/choseLevelPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5411eznvA9CNJhuceRQ964e', 'choseLevelPanel');
// scripts/main/choseLevelPanel.ts

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
var uiBase_1 = require("../uiBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var choseLevelPanel = /** @class */ (function (_super) {
    __extends(choseLevelPanel, _super);
    function choseLevelPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.levelItem = null;
        _this.layouts = [];
        _this.levelNum = 100;
        _this.nowPage = 1;
        _this.maxPage = 0;
        return _this;
    }
    choseLevelPanel.prototype.onLoad = function () {
        this.initUi();
    };
    choseLevelPanel.prototype.start = function () {
        this.init();
    };
    choseLevelPanel.prototype.init = function () {
        this.maxPage = Math.ceil(this.levelNum / 8);
        for (var j = 0; j < this.maxPage; j++) {
            var num = (this.levelNum - j * 8) >= 8 ? 8 : this.levelNum - j * 8;
            for (var i = 1; i <= num; i++) {
                var levelItem = cc.instantiate(this.levelItem);
                levelItem.setParent(this.layouts[j]);
                levelItem.name = (i + j * 8).toString();
                levelItem.active = true;
            }
        }
    };
    choseLevelPanel.prototype.next = function () {
        if (this.nowPage == this.maxPage)
            return;
        this.layouts[this.nowPage - 1].active = false;
        this.nowPage++;
        this.layouts[this.nowPage - 1].active = true;
    };
    choseLevelPanel.prototype.last = function () {
        if (this.nowPage == 1)
            return;
        this.layouts[this.nowPage - 1].active = false;
        this.nowPage--;
        this.layouts[this.nowPage - 1].active = true;
    };
    choseLevelPanel.prototype.close = function () {
        this.node.destroy();
    };
    __decorate([
        property(cc.Prefab)
    ], choseLevelPanel.prototype, "levelItem", void 0);
    __decorate([
        property(cc.Node)
    ], choseLevelPanel.prototype, "layouts", void 0);
    choseLevelPanel = __decorate([
        ccclass
    ], choseLevelPanel);
    return choseLevelPanel;
}(uiBase_1.default));
exports.default = choseLevelPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFpblxcY2hvc2VMZXZlbFBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLG9DQUErQjtBQUV6QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE2QyxtQ0FBTTtJQUFuRDtRQUFBLHFFQTRDQztRQXpDRyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLGFBQU8sR0FBVyxFQUFFLENBQUM7UUFFckIsY0FBUSxHQUFRLEdBQUcsQ0FBQztRQUNwQixhQUFPLEdBQVEsQ0FBQyxDQUFDO1FBQ2pCLGFBQU8sR0FBUSxDQUFDLENBQUM7O0lBbUNyQixDQUFDO0lBbENHLGdDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELCtCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNELDhCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUMzQixJQUFJLEdBQUcsR0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7WUFDbkQsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDbkIsSUFBSSxTQUFTLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxTQUFTLENBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDbEMsU0FBUyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7SUFDRCw4QkFBSSxHQUFKO1FBQ0ksSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFFLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTTtRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztJQUM3QyxDQUFDO0lBQ0QsOEJBQUksR0FBSjtRQUNJLElBQUcsSUFBSSxDQUFDLE9BQU8sSUFBRSxDQUFDO1lBQUUsT0FBTztRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztJQUM3QyxDQUFDO0lBQ0QsK0JBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQXhDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNLO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ0c7SUFMSixlQUFlO1FBRG5DLE9BQU87T0FDYSxlQUFlLENBNENuQztJQUFELHNCQUFDO0NBNUNELEFBNENDLENBNUM0QyxnQkFBTSxHQTRDbEQ7a0JBNUNvQixlQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB1aUJhc2UgZnJvbSBcIi4uL3VpQmFzZVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNob3NlTGV2ZWxQYW5lbCBleHRlbmRzIHVpQmFzZXtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgbGV2ZWxJdGVtOmNjLlByZWZhYj1udWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGxheW91dHM6Y2MuTm9kZVtdPVtdO1xuXG4gICAgbGV2ZWxOdW06bnVtYmVyPTEwMDtcbiAgICBub3dQYWdlOm51bWJlcj0xO1xuICAgIG1heFBhZ2U6bnVtYmVyPTA7XG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5pbml0VWkoKTtcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIHRoaXMubWF4UGFnZT1NYXRoLmNlaWwodGhpcy5sZXZlbE51bS84KTtcbiAgICAgICAgZm9yKGxldCBqPTA7ajx0aGlzLm1heFBhZ2U7aisrKXtcbiAgICAgICAgICAgIGxldCBudW09KHRoaXMubGV2ZWxOdW0taio4KT49OD84OnRoaXMubGV2ZWxOdW0taio4O1xuICAgICAgICAgICAgZm9yKGxldCBpPTE7aTw9bnVtO2krKyl7XG4gICAgICAgICAgICAgICAgbGV0IGxldmVsSXRlbT1jYy5pbnN0YW50aWF0ZSh0aGlzLmxldmVsSXRlbSk7XG4gICAgICAgICAgICAgICAgbGV2ZWxJdGVtLnNldFBhcmVudCh0aGlzLmxheW91dHNbal0pO1xuICAgICAgICAgICAgICAgIGxldmVsSXRlbS5uYW1lPShpK2oqOCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsZXZlbEl0ZW0uYWN0aXZlPXRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbmV4dCgpe1xuICAgICAgICBpZih0aGlzLm5vd1BhZ2U9PXRoaXMubWF4UGFnZSkgcmV0dXJuXG4gICAgICAgIHRoaXMubGF5b3V0c1t0aGlzLm5vd1BhZ2UtMV0uYWN0aXZlPWZhbHNlO1xuICAgICAgICB0aGlzLm5vd1BhZ2UrKztcbiAgICAgICAgdGhpcy5sYXlvdXRzW3RoaXMubm93UGFnZS0xXS5hY3RpdmU9dHJ1ZTtcbiAgICB9XG4gICAgbGFzdCgpe1xuICAgICAgICBpZih0aGlzLm5vd1BhZ2U9PTEpIHJldHVybjtcbiAgICAgICAgdGhpcy5sYXlvdXRzW3RoaXMubm93UGFnZS0xXS5hY3RpdmU9ZmFsc2U7XG4gICAgICAgIHRoaXMubm93UGFnZS0tO1xuICAgICAgICB0aGlzLmxheW91dHNbdGhpcy5ub3dQYWdlLTFdLmFjdGl2ZT10cnVlO1xuICAgIH1cbiAgICBjbG9zZSgpe1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==