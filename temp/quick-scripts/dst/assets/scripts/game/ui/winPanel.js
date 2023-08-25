
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ui/winPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '78387PqVXVLj7ZnUhrivU7c', 'winPanel');
// scripts/game/ui/winPanel.ts

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
var data_1 = require("../../sdk/data");
var uiBase_1 = require("../../uiBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var winPanel = /** @class */ (function (_super) {
    __extends(winPanel, _super);
    function winPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onNewBackHomeClick = true;
        return _this;
    }
    winPanel_1 = winPanel;
    winPanel.prototype.onLoad = function () {
        this.initUi();
    };
    winPanel.prototype.start = function () {
        // ad.recordEnd();
    };
    winPanel.prototype.onEnable = function () {
        this.showRet();
    };
    winPanel.prototype.share = function () {
        var _this = this;
        // ad.recordShare(isok=>{
        //     if(isok){
        //         this.getCoin(300);
        //         this.giveUp();
        //     }
        // });
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                export_sdk_1.Export.hide_naive_YSAD('YSBN'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
                _this.getCoin(600);
                setTimeout(function () {
                    cc.Tween.stopAll();
                    cc.director.loadScene("main");
                }, 500);
            }
        });
    };
    winPanel.prototype.getCoin = function (getNum) {
        var coin = Number(data_1.data.getCache("Base", "coin")) + getNum;
        data_1.data.updateCache("Base", "coin", coin);
    };
    winPanel.prototype.subgiveUp = function () {
        cc.Tween.stopAll();
        cc.director.loadScene("main");
    };
    winPanel.prototype.showRet = function () {
        this.onNewBackHomeClick = true;
        winPanel_1.native_have_show = false;
        setTimeout(function () {
            export_sdk_1.Export.show_native_YSAD("10304001", "Canvas/ui/winPanel/fail_parent", function () { winPanel_1.native_have_show = true; });
        }, 400);
    };
    winPanel.prototype.giveUp = function () {
        if (this.onNewBackHomeClick && winPanel_1.native_have_show) {
            this.onNewBackHomeClick = false;
            export_sdk_1.Export.click_native_YSAD("YSBN"); // 触发ysbn
        }
        else { // 否则回到游戏
            this.onNewBackHomeClick = true;
            winPanel_1.native_have_show = false;
            export_sdk_1.Export.hide_naive_YSAD('YSBN'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
            this.subgiveUp();
        }
    };
    var winPanel_1;
    winPanel.native_have_show = false; // 原生结banner展示
    winPanel = winPanel_1 = __decorate([
        ccclass
    ], winPanel);
    return winPanel;
}(uiBase_1.default));
exports.default = winPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdWlcXHdpblBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDJEQUFzRDtBQUN0RCxtQ0FBa0M7QUFDbEMsdUNBQXNDO0FBQ3RDLHVDQUFrQztBQUU1QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUFzQyw0QkFBTTtJQUE1QztRQUFBLHFFQW9FQztRQWRHLHdCQUFrQixHQUFZLElBQUksQ0FBQzs7SUFjdkMsQ0FBQztpQkFwRW9CLFFBQVE7SUFHekIseUJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsd0JBQUssR0FBTDtRQUNJLGtCQUFrQjtJQUN0QixDQUFDO0lBRVMsMkJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQztJQUVELHdCQUFLLEdBQUw7UUFBQSxpQkFvQkM7UUFuQkcseUJBQXlCO1FBQ3pCLGdCQUFnQjtRQUNoQiw2QkFBNkI7UUFDN0IseUJBQXlCO1FBQ3pCLFFBQVE7UUFDUixNQUFNO1FBQ04sT0FBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDckIsNEJBQTRCO1lBQzVCLElBQUksSUFBSSxFQUFFO2dCQUNOLG1CQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsK0JBQStCO2dCQUU5RCxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVsQixVQUFVLENBQUM7b0JBQ1AsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDbkIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNYO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsMEJBQU8sR0FBUCxVQUFRLE1BQWE7UUFDakIsSUFBSSxJQUFJLEdBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDO1FBQ3JELFdBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsNEJBQVMsR0FBVDtRQUNJLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUdPLDBCQUFPLEdBQWY7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFBO1FBQzlCLFVBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUE7UUFDakMsVUFBVSxDQUFDO1lBQ1AsbUJBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsZ0NBQWdDLEVBQUUsY0FBUSxVQUFRLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDckgsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUdELHlCQUFNLEdBQU47UUFDSSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxVQUFRLENBQUMsZ0JBQWdCLEVBQUU7WUFDdEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQTtZQUMvQixtQkFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsU0FBUztTQUM3QzthQUFNLEVBQUUsU0FBUztZQUNkLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUE7WUFDOUIsVUFBUSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQTtZQUNqQyxtQkFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLCtCQUErQjtZQUU5RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7U0FFbkI7SUFDTCxDQUFDOztJQXRCTSx5QkFBZ0IsR0FBWSxLQUFLLENBQUMsQ0FBRSxjQUFjO0lBN0N4QyxRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBb0U1QjtJQUFELGVBQUM7Q0FwRUQsQUFvRUMsQ0FwRXFDLGdCQUFNLEdBb0UzQztrQkFwRW9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgRXhwb3J0IH0gZnJvbSBcIi4uLy4uLy4uL3N5eXhfc2RrL2V4cG9ydF9zZGtcIjtcbmltcG9ydCB7IGFkIH0gZnJvbSBcIi4uLy4uL3Nkay9hZFwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi8uLi9zZGsvZGF0YVwiO1xuaW1wb3J0IHVpQmFzZSBmcm9tIFwiLi4vLi4vdWlCYXNlXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgd2luUGFuZWwgZXh0ZW5kcyB1aUJhc2Uge1xuXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLmluaXRVaSgpO1xuICAgIH1cblxuICAgIHN0YXJ0ICgpIHtcbiAgICAgICAgLy8gYWQucmVjb3JkRW5kKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dSZXQoKVxuICAgIH1cblxuICAgIHNoYXJlKCl7XG4gICAgICAgIC8vIGFkLnJlY29yZFNoYXJlKGlzb2s9PntcbiAgICAgICAgLy8gICAgIGlmKGlzb2spe1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuZ2V0Q29pbigzMDApO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuZ2l2ZVVwKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgICAgICBhZC52aWRlb19zaG93KCkudGhlbihpc29rID0+IHtcbiAgICAgICAgICAgIC8vIGF1ZGlvTWFuYWdlci5wbGF5QmdHYW1lKClcbiAgICAgICAgICAgIGlmIChpc29rKSB7XG4gICAgICAgICAgICAgICAgRXhwb3J0LmhpZGVfbmFpdmVfWVNBRCgnWVNCTicpIC8vIOmakOiXj+WOn+eUn+W5v+WRiiDkvKAnWVNCTifvvIzmhI/mgJ3mmK/lkIzml7bkvJrpooTliqDovb1ZU0JOXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2luKDYwMCk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2MuVHdlZW4uc3RvcEFsbCgpO1xuICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJtYWluXCIpO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRDb2luKGdldE51bTpudW1iZXIpe1xuICAgICAgICBsZXQgY29pbj1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcImNvaW5cIikpK2dldE51bTtcbiAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcIkJhc2VcIixcImNvaW5cIixjb2luKTtcbiAgICB9XG4gICAgc3ViZ2l2ZVVwKCl7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGwoKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibWFpblwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbmF0aXZlX2hhdmVfc2hvdzogYm9vbGVhbiA9IGZhbHNlOyAgLy8g5Y6f55Sf57uTYmFubmVy5bGV56S6XG4gICAgcHJpdmF0ZSBzaG93UmV0KCkge1xuICAgICAgICB0aGlzLm9uTmV3QmFja0hvbWVDbGljayA9IHRydWVcbiAgICAgICAgd2luUGFuZWwubmF0aXZlX2hhdmVfc2hvdyA9IGZhbHNlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgRXhwb3J0LnNob3dfbmF0aXZlX1lTQUQoXCIxMDMwNDAwMVwiLCBcIkNhbnZhcy91aS93aW5QYW5lbC9mYWlsX3BhcmVudFwiLCAoKSA9PiB7IHdpblBhbmVsLm5hdGl2ZV9oYXZlX3Nob3cgPSB0cnVlIH0pXG4gICAgICAgIH0sIDQwMCk7XG4gICAgfVxuXG4gICAgb25OZXdCYWNrSG9tZUNsaWNrOiBib29sZWFuID0gdHJ1ZTtcbiAgICBnaXZlVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uTmV3QmFja0hvbWVDbGljayAmJiB3aW5QYW5lbC5uYXRpdmVfaGF2ZV9zaG93KSB7XG4gICAgICAgICAgICB0aGlzLm9uTmV3QmFja0hvbWVDbGljayA9IGZhbHNlXG4gICAgICAgICAgICBFeHBvcnQuY2xpY2tfbmF0aXZlX1lTQUQoXCJZU0JOXCIpIC8vIOinpuWPkXlzYm5cbiAgICAgICAgfSBlbHNlIHsgLy8g5ZCm5YiZ5Zue5Yiw5ri45oiPXG4gICAgICAgICAgICB0aGlzLm9uTmV3QmFja0hvbWVDbGljayA9IHRydWVcbiAgICAgICAgICAgIHdpblBhbmVsLm5hdGl2ZV9oYXZlX3Nob3cgPSBmYWxzZVxuICAgICAgICAgICAgRXhwb3J0LmhpZGVfbmFpdmVfWVNBRCgnWVNCTicpIC8vIOmakOiXj+WOn+eUn+W5v+WRiiDkvKAnWVNCTifvvIzmhI/mgJ3mmK/lkIzml7bkvJrpooTliqDovb1ZU0JOXG5cbiAgICAgICAgICAgIHRoaXMuc3ViZ2l2ZVVwKClcblxuICAgICAgICB9XG4gICAgfVxufVxuIl19