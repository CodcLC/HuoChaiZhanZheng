"use strict";
cc._RF.push(module, '2cee1aH1slEk45kBHCPHTzC', 'E39Laser');
// scripts/game/E39Laser.ts

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
var E39controller_1 = require("./E39controller");
var enemyHitCollider_1 = require("./enemyHitCollider");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var E39Laser = /** @class */ (function (_super) {
    __extends(E39Laser, _super);
    function E39Laser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.laserCollider = null;
        _this.E39 = null;
        return _this;
        // update (dt) {}
    }
    // onLoad () {}
    E39Laser.prototype.start = function () {
        this.laserCollider.getComponent(enemyHitCollider_1.default).enemyControl = this.E39;
    };
    __decorate([
        property(cc.Node)
    ], E39Laser.prototype, "laserCollider", void 0);
    __decorate([
        property(E39controller_1.default)
    ], E39Laser.prototype, "E39", void 0);
    E39Laser = __decorate([
        ccclass
    ], E39Laser);
    return E39Laser;
}(cc.Component));
exports.default = E39Laser;

cc._RF.pop();