
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/levelInit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'aa2170aQm5NArAIpoFbEq0N', 'levelInit');
// scripts/game/levelInit.ts

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
var cameraControl_1 = require("./cameraControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var levelInit = /** @class */ (function (_super) {
    __extends(levelInit, _super);
    function levelInit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgLayers = [];
        _this.cameraNode = null;
        return _this;
    }
    levelInit.prototype.onLoad = function () {
        this.cameraNode = cameraControl_1.default.instance.cameraNode;
    };
    levelInit.prototype.start = function () {
    };
    levelInit.prototype.update = function (dt) {
        this.bgLayers[0].x = this.cameraNode.position.x * 0.8;
        this.bgLayers[1].x = this.cameraNode.position.x * 0.75;
        this.bgLayers[2].x = this.cameraNode.position.x * 0.62;
        if (this.bgLayers.length == 4) {
            this.bgLayers[3].x = this.cameraNode.position.x * 0.56;
        }
    };
    __decorate([
        property(cc.Node)
    ], levelInit.prototype, "bgLayers", void 0);
    levelInit = __decorate([
        ccclass
    ], levelInit);
    return levelInit;
}(cc.Component));
exports.default = levelInit;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcbGV2ZWxJbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGlEQUE0QztBQUV0QyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUF1Qyw2QkFBWTtJQUFuRDtRQUFBLHFFQXNCQztRQW5CRyxjQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXRCLGdCQUFVLEdBQVMsSUFBSSxDQUFDOztJQWlCNUIsQ0FBQztJQWZHLDBCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFDLHVCQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUN0RCxDQUFDO0lBQ0QseUJBQUssR0FBTDtJQUVBLENBQUM7SUFFRCwwQkFBTSxHQUFOLFVBQVEsRUFBRTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQztRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDO1FBQ25ELElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUUsQ0FBQyxFQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUM7U0FDdEQ7SUFDTCxDQUFDO0lBbEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7K0NBQ0k7SUFITCxTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBc0I3QjtJQUFELGdCQUFDO0NBdEJELEFBc0JDLENBdEJzQyxFQUFFLENBQUMsU0FBUyxHQXNCbEQ7a0JBdEJvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBjYW1lcmFDb250cm9sIGZyb20gXCIuL2NhbWVyYUNvbnRyb2xcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsZXZlbEluaXQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYmdMYXllcnM6Y2MuTm9kZVtdPVtdO1xuXG4gICAgY2FtZXJhTm9kZTpjYy5Ob2RlPW51bGw7XG5cbiAgICBvbkxvYWQoKXtcbiAgICAgICAgdGhpcy5jYW1lcmFOb2RlPWNhbWVyYUNvbnRyb2wuaW5zdGFuY2UuY2FtZXJhTm9kZTtcbiAgICB9XG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICB0aGlzLmJnTGF5ZXJzWzBdLng9dGhpcy5jYW1lcmFOb2RlLnBvc2l0aW9uLngqMC44O1xuICAgICAgICB0aGlzLmJnTGF5ZXJzWzFdLng9dGhpcy5jYW1lcmFOb2RlLnBvc2l0aW9uLngqMC43NTtcbiAgICAgICAgdGhpcy5iZ0xheWVyc1syXS54PXRoaXMuY2FtZXJhTm9kZS5wb3NpdGlvbi54KjAuNjI7XG4gICAgICAgIGlmKHRoaXMuYmdMYXllcnMubGVuZ3RoPT00KXtcbiAgICAgICAgICAgIHRoaXMuYmdMYXllcnNbM10ueD10aGlzLmNhbWVyYU5vZGUucG9zaXRpb24ueCowLjU2O1xuICAgICAgICB9XG4gICAgfVxufVxuIl19