
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ui/losePanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '850f224PuZAba6r+xv96GbT', 'losePanel');
// scripts/game/ui/losePanel.ts

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
var GameManager_1 = require("../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var losePanel = /** @class */ (function (_super) {
    __extends(losePanel, _super);
    function losePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onNewBackHomeClick = true;
        return _this;
    }
    losePanel_1 = losePanel;
    losePanel.prototype.onLoad = function () {
        this.initUi();
    };
    losePanel.prototype.start = function () {
        // ad.recordEnd();        
    };
    losePanel.prototype.onEnable = function () {
        this.showRet();
    };
    losePanel.prototype.share = function () {
        // ad.recordShare(isok=>{
        //     if(isok){
        //         this.node.destroy();
        //         GameManager.instance.playerController.revive();
        //         ad.record();
        //     }
        // });
        var _this = this;
        ad_1.ad.video_show().then(function (isok) {
            // audioManager.playBgGame()
            if (isok) {
                export_sdk_1.Export.hide_naive_YSAD('YSBN'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
                _this.node.destroy();
                GameManager_1.default.instance.playerController.revive();
            }
        });
    };
    losePanel.prototype.subgiveUp = function () {
        cc.Tween.stopAll();
        cc.director.loadScene("main");
    };
    losePanel.prototype.showRet = function () {
        this.onNewBackHomeClick = true;
        losePanel_1.native_have_show = false;
        setTimeout(function () {
            export_sdk_1.Export.show_native_YSAD("10304001", "Canvas/ui/losePanel/fail_parent", function () { losePanel_1.native_have_show = true; });
        }, 400);
    };
    losePanel.prototype.giveUp = function () {
        if (this.onNewBackHomeClick && losePanel_1.native_have_show) {
            this.onNewBackHomeClick = false;
            export_sdk_1.Export.click_native_YSAD("YSBN"); // 触发ysbn
        }
        else { // 否则回到游戏
            this.onNewBackHomeClick = true;
            losePanel_1.native_have_show = false;
            export_sdk_1.Export.hide_naive_YSAD('YSBN'); // 隐藏原生广告 传'YSBN'，意思是同时会预加载YSBN
            this.subgiveUp();
        }
    };
    var losePanel_1;
    losePanel.native_have_show = false; // 原生结banner展示
    losePanel = losePanel_1 = __decorate([
        ccclass
    ], losePanel);
    return losePanel;
}(uiBase_1.default));
exports.default = losePanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcdWlcXGxvc2VQYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiwyREFBc0Q7QUFDdEQsbUNBQWtDO0FBQ2xDLHVDQUFrQztBQUNsQyw4Q0FBeUM7QUFFbkMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBdUMsNkJBQU07SUFBN0M7UUFBQSxxRUE4REM7UUFkRyx3QkFBa0IsR0FBWSxJQUFJLENBQUM7O0lBY3ZDLENBQUM7a0JBOURvQixTQUFTO0lBRzFCLDBCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELHlCQUFLLEdBQUw7UUFDSSwwQkFBMEI7SUFDOUIsQ0FBQztJQUVTLDRCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFRCx5QkFBSyxHQUFMO1FBQ0kseUJBQXlCO1FBQ3pCLGdCQUFnQjtRQUNoQiwrQkFBK0I7UUFDL0IsMERBQTBEO1FBQzFELHVCQUF1QjtRQUN2QixRQUFRO1FBQ1IsTUFBTTtRQVBWLGlCQWtCQztRQVRHLE9BQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO1lBQ3JCLDRCQUE0QjtZQUM1QixJQUFJLElBQUksRUFBRTtnQkFDTixtQkFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLCtCQUErQjtnQkFFOUQsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEIscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDbEQ7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCw2QkFBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBR08sMkJBQU8sR0FBZjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUE7UUFDOUIsV0FBUyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQTtRQUNsQyxVQUFVLENBQUM7WUFDUCxtQkFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxpQ0FBaUMsRUFBRSxjQUFRLFdBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2SCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBR0QsMEJBQU0sR0FBTjtRQUNJLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLFdBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFBO1lBQy9CLG1CQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQyxTQUFTO1NBQzdDO2FBQU0sRUFBRSxTQUFTO1lBQ2QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQTtZQUM5QixXQUFTLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFBO1lBQ2xDLG1CQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUMsK0JBQStCO1lBRTlELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtTQUVuQjtJQUNMLENBQUM7O0lBdEJNLDBCQUFnQixHQUFZLEtBQUssQ0FBQyxDQUFFLGNBQWM7SUF2Q3hDLFNBQVM7UUFEN0IsT0FBTztPQUNhLFNBQVMsQ0E4RDdCO0lBQUQsZ0JBQUM7Q0E5REQsQUE4REMsQ0E5RHNDLGdCQUFNLEdBOEQ1QztrQkE5RG9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgRXhwb3J0IH0gZnJvbSBcIi4uLy4uLy4uL3N5eXhfc2RrL2V4cG9ydF9zZGtcIjtcbmltcG9ydCB7IGFkIH0gZnJvbSBcIi4uLy4uL3Nkay9hZFwiO1xuaW1wb3J0IHVpQmFzZSBmcm9tIFwiLi4vLi4vdWlCYXNlXCI7XG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsb3NlUGFuZWwgZXh0ZW5kcyB1aUJhc2Uge1xuXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFVpKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vIGFkLnJlY29yZEVuZCgpOyAgICAgICAgXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dSZXQoKVxuICAgIH1cblxuICAgIHNoYXJlKCkge1xuICAgICAgICAvLyBhZC5yZWNvcmRTaGFyZShpc29rPT57XG4gICAgICAgIC8vICAgICBpZihpc29rKXtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAvLyAgICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIucmV2aXZlKCk7XG4gICAgICAgIC8vICAgICAgICAgYWQucmVjb3JkKCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIGFkLnZpZGVvX3Nob3coKS50aGVuKGlzb2sgPT4ge1xuICAgICAgICAgICAgLy8gYXVkaW9NYW5hZ2VyLnBsYXlCZ0dhbWUoKVxuICAgICAgICAgICAgaWYgKGlzb2spIHtcbiAgICAgICAgICAgICAgICBFeHBvcnQuaGlkZV9uYWl2ZV9ZU0FEKCdZU0JOJykgLy8g6ZqQ6JeP5Y6f55Sf5bm/5ZGKIOS8oCdZU0JOJ++8jOaEj+aAneaYr+WQjOaXtuS8mumihOWKoOi9vVlTQk5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIucmV2aXZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdWJnaXZlVXAoKSB7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGwoKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwibWFpblwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbmF0aXZlX2hhdmVfc2hvdzogYm9vbGVhbiA9IGZhbHNlOyAgLy8g5Y6f55Sf57uTYmFubmVy5bGV56S6XG4gICAgcHJpdmF0ZSBzaG93UmV0KCkge1xuICAgICAgICB0aGlzLm9uTmV3QmFja0hvbWVDbGljayA9IHRydWVcbiAgICAgICAgbG9zZVBhbmVsLm5hdGl2ZV9oYXZlX3Nob3cgPSBmYWxzZVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIEV4cG9ydC5zaG93X25hdGl2ZV9ZU0FEKFwiMTAzMDQwMDFcIiwgXCJDYW52YXMvdWkvbG9zZVBhbmVsL2ZhaWxfcGFyZW50XCIsICgpID0+IHsgbG9zZVBhbmVsLm5hdGl2ZV9oYXZlX3Nob3cgPSB0cnVlIH0pXG4gICAgICAgIH0sIDQwMCk7XG4gICAgfVxuXG4gICAgb25OZXdCYWNrSG9tZUNsaWNrOiBib29sZWFuID0gdHJ1ZTtcbiAgICBnaXZlVXAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uTmV3QmFja0hvbWVDbGljayAmJiBsb3NlUGFuZWwubmF0aXZlX2hhdmVfc2hvdykge1xuICAgICAgICAgICAgdGhpcy5vbk5ld0JhY2tIb21lQ2xpY2sgPSBmYWxzZVxuICAgICAgICAgICAgRXhwb3J0LmNsaWNrX25hdGl2ZV9ZU0FEKFwiWVNCTlwiKSAvLyDop6blj5F5c2JuXG4gICAgICAgIH0gZWxzZSB7IC8vIOWQpuWImeWbnuWIsOa4uOaIj1xuICAgICAgICAgICAgdGhpcy5vbk5ld0JhY2tIb21lQ2xpY2sgPSB0cnVlXG4gICAgICAgICAgICBsb3NlUGFuZWwubmF0aXZlX2hhdmVfc2hvdyA9IGZhbHNlXG4gICAgICAgICAgICBFeHBvcnQuaGlkZV9uYWl2ZV9ZU0FEKCdZU0JOJykgLy8g6ZqQ6JeP5Y6f55Sf5bm/5ZGKIOS8oCdZU0JOJ++8jOaEj+aAneaYr+WQjOaXtuS8mumihOWKoOi9vVlTQk5cblxuICAgICAgICAgICAgdGhpcy5zdWJnaXZlVXAoKVxuXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=