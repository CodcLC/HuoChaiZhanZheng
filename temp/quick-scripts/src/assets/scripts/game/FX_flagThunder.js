"use strict";
cc._RF.push(module, 'b2c3fAOhHxB9Y94CRUWHYBp', 'FX_flagThunder');
// scripts/game/FX_flagThunder.ts

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
var enemyHitCollider_1 = require("./enemyHitCollider");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FX_flagThunder = /** @class */ (function (_super) {
    __extends(FX_flagThunder, _super);
    function FX_flagThunder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 0;
        return _this;
    }
    // onLoad () {}
    FX_flagThunder.prototype.start = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.node.getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
        }, 0);
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 2);
    };
    FX_flagThunder = __decorate([
        ccclass
    ], FX_flagThunder);
    return FX_flagThunder;
}(cc.Component));
exports.default = FX_flagThunder;

cc._RF.pop();