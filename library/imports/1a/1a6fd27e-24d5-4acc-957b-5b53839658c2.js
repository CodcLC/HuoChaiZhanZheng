"use strict";
cc._RF.push(module, '1a6fdJ+JNVKzJV7W1ODlljC', 'swordItem2');
// scripts/game/swordItem2.ts

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
var caijiTools_1 = require("../caijiTools");
var skillPool_1 = require("./skillPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var swordItem2 = /** @class */ (function (_super) {
    __extends(swordItem2, _super);
    function swordItem2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRight = false;
        _this.rightAngle = 48;
        _this.leftAngle = -48;
        _this.offsetX = 74;
        _this.offsetY = -67;
        _this.isDestory = false;
        _this.movex1 = 0;
        _this.movey1 = 0;
        _this.movex2 = 0;
        _this.movey2 = 0;
        return _this;
    }
    swordItem2.prototype.onLoad = function () {
        this.movex1 = this.offsetX * 12;
        this.movey1 = this.offsetY * 12;
        this.movex2 = this.offsetX * 0.1;
        this.movey2 = this.offsetY * 0.1;
    };
    swordItem2.prototype.init = function () {
        this.movex1 = this.isRight ? Math.abs(this.movex1) : -Math.abs(this.movex1);
        this.movex2 = this.isRight ? Math.abs(this.movex2) : -Math.abs(this.movex2);
    };
    swordItem2.prototype.tween = function () {
        var _this = this;
        //cc.v2(67,74);
        this.init();
        this.node.scaleX = caijiTools_1.caijiTools.random_int(3, 6) / 10;
        this.node.scaleY = this.node.scaleX * 20;
        this.node.angle = this.isRight ? this.rightAngle : this.leftAngle;
        cc.tween(this.node)
            .by(0.1, { position: cc.v3(this.movex1, this.movey1) })
            .start();
        this.scheduleOnce(function () {
            _this.changeColor();
        }, 0.05);
    };
    /*     onBeginContact (contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider) {
            let other=otherCollider.node;
            let pos=contact.getWorldManifold();
            if (other.group == "ground") {
                //落地
                if(this.isDestory) return;
                this.isDestory=true;
                this.changeColor();
            }
        } */
    swordItem2.prototype.changeColor = function () {
        var _this = this;
        this.node.color = cc.Color.BLACK;
        cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node)
            .parallel(cc.tween().by(0.08, { opacity: -255 }), cc.tween().by(0.1, { position: cc.v3(this.movex2, this.movey2) }))
            .call(function () {
            skillPool_1.default.instance.recoverySword2(_this.node);
        })
            .start();
    };
    swordItem2.prototype.reuse = function () {
        this.isDestory = false;
    };
    swordItem2.prototype.unuse = function () {
        this.node.color = cc.Color.WHITE;
        this.node.opacity = 255;
    };
    swordItem2 = __decorate([
        ccclass
    ], swordItem2);
    return swordItem2;
}(cc.Component));
exports.default = swordItem2;

cc._RF.pop();