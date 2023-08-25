
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/spawnEnemy.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '87ccekukBxPV5AgIQeF5bYY', 'spawnEnemy');
// scripts/game/spawnEnemy.ts

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
var audioNameMgr_1 = require("../audioNameMgr");
var audioManager_1 = require("../main/audioManager");
var Events_1 = require("./Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var spawnEnemy = /** @class */ (function (_super) {
    __extends(spawnEnemy, _super);
    function spawnEnemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.spawnEnemyName = "enemy1";
        _this.enemyHp = 0;
        _this.isSpawn = false;
        return _this;
    }
    spawnEnemy.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    spawnEnemy.prototype.start = function () {
        var _this = this;
        if (this.spawnEnemyName == "enemy10") {
            this.animation.node.scale = 2;
        }
        if (["enemy39", "miniBoss", "ladyBug", "bigSquid", "spiderling"].includes(this.spawnEnemyName)) {
            this.animation.node.scale = 0;
        }
        this.animation.on("finished", function () {
            _this.node.destroy();
        });
        this.animation.getClips()[0].events.push({
            frame: 0.14,
            func: "spawnEnemy",
            params: [""]
        });
        this.animation.play();
    };
    spawnEnemy.prototype.spawnEnemy = function () {
        if (this.isSpawn)
            return;
        this.isSpawn = true;
        Events_1.default.instance.spawnEnemy(this.spawnEnemyName, this.node.parent, cc.v2(this.node.position));
        if (this.animation.node.scale > 0) {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.CreepSpawn);
        }
    };
    spawnEnemy = __decorate([
        ccclass
    ], spawnEnemy);
    return spawnEnemy;
}(cc.Component));
exports.default = spawnEnemy;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc3Bhd25FbmVteS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixnREFBNEM7QUFDNUMscURBQWdEO0FBQ2hELG1DQUE4QjtBQUV4QixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQUFwRDtRQUFBLHFFQW9DQztRQWxDRyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBQzVCLG9CQUFjLEdBQVEsUUFBUSxDQUFDO1FBQy9CLGFBQU8sR0FBUSxDQUFDLENBQUM7UUFDakIsYUFBTyxHQUFTLEtBQUssQ0FBQzs7SUErQjFCLENBQUM7SUE3QkcsMkJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCwwQkFBSyxHQUFMO1FBQUEsaUJBZ0JDO1FBZkcsSUFBRyxJQUFJLENBQUMsY0FBYyxJQUFFLFNBQVMsRUFBQztZQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBRyxDQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFDO1lBQ3RGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUM7WUFDekIsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNyQyxLQUFLLEVBQUMsSUFBSTtZQUNWLElBQUksRUFBQyxZQUFZO1lBQ2pCLE1BQU0sRUFBQyxDQUFDLEVBQUUsQ0FBQztTQUNkLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNELCtCQUFVLEdBQVY7UUFDSSxJQUFHLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztRQUNsQixnQkFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMzRixJQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUM7WUFDM0Isc0JBQVksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFuQ2dCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FvQzlCO0lBQUQsaUJBQUM7Q0FwQ0QsQUFvQ0MsQ0FwQ3VDLEVBQUUsQ0FBQyxTQUFTLEdBb0NuRDtrQkFwQ29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vbWFpbi9hdWRpb01hbmFnZXJcIjtcbmltcG9ydCBFdmVudHMgZnJvbSBcIi4vRXZlbnRzXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc3Bhd25FbmVteSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBhbmltYXRpb246Y2MuQW5pbWF0aW9uPW51bGw7XG4gICAgc3Bhd25FbmVteU5hbWU6c3RyaW5nPVwiZW5lbXkxXCI7XG4gICAgZW5lbXlIcDpudW1iZXI9MDtcbiAgICBpc1NwYXduOmJvb2xlYW49ZmFsc2U7XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbj10aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgfVxuXG4gICAgc3RhcnQgKCkge1xuICAgICAgICBpZih0aGlzLnNwYXduRW5lbXlOYW1lPT1cImVuZW15MTBcIil7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5ub2RlLnNjYWxlPTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYoW1wiZW5lbXkzOVwiLFwibWluaUJvc3NcIixcImxhZHlCdWdcIixcImJpZ1NxdWlkXCIsXCJzcGlkZXJsaW5nXCJdLmluY2x1ZGVzKHRoaXMuc3Bhd25FbmVteU5hbWUpKXtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLm5vZGUuc2NhbGU9MDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuaW1hdGlvbi5vbihcImZpbmlzaGVkXCIsKCk9PntcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5nZXRDbGlwcygpWzBdLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgIGZyYW1lOjAuMTQsXG4gICAgICAgICAgICBmdW5jOlwic3Bhd25FbmVteVwiLFxuICAgICAgICAgICAgcGFyYW1zOltcIlwiXVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSgpO1xuICAgIH1cbiAgICBzcGF3bkVuZW15KCl7XG4gICAgICAgIGlmKHRoaXMuaXNTcGF3bikgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzU3Bhd249dHJ1ZTtcbiAgICAgICAgRXZlbnRzLmluc3RhbmNlLnNwYXduRW5lbXkodGhpcy5zcGF3bkVuZW15TmFtZSx0aGlzLm5vZGUucGFyZW50LGNjLnYyKHRoaXMubm9kZS5wb3NpdGlvbikpO1xuICAgICAgICBpZih0aGlzLmFuaW1hdGlvbi5ub2RlLnNjYWxlPjApe1xuICAgICAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuQ3JlZXBTcGF3bik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=