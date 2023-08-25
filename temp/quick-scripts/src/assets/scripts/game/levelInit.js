"use strict";
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