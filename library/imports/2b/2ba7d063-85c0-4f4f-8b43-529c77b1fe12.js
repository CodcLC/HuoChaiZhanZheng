"use strict";
cc._RF.push(module, '2ba7dBjhcBPT4tDUpx3sf4S', 'damageLabel');
// scripts/game/damageLabel.ts

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
var damageTipPool_1 = require("./damageTipPool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageLabel = /** @class */ (function (_super) {
    __extends(damageLabel, _super);
    function damageLabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.damage = 0;
        _this.color = cc.Color.GREEN;
        return _this;
    }
    damageLabel.prototype.onLoad = function () {
        this.label = this.node.getComponent(cc.Label);
    };
    damageLabel.prototype.onEnable = function () {
        this.node.color = this.color;
        if (this.color.g == 255 && this.color.r == 0) {
            this.node.getComponent(cc.Label).string = "+" + this.damage.toString();
            this.addHpAciton();
        }
        else {
            this.node.getComponent(cc.Label).string = this.damage.toString();
            this.damageAction();
        }
    };
    damageLabel.prototype.addHpAciton = function () {
        var _this = this;
        this.label.fontSize = 0;
        this.label.lineHeight = 0;
        //this.node.opacity=255;
        cc.tween(this.node)
            .parallel(cc.tween().by(0.01, { opacity: 255 }), cc.tween().by(0.5, { y: 80 }))
            .by(0.2, { opacity: -255, y: 40 })
            .call(function () {
            damageTipPool_1.default.instance.recoveryDmgLabel(_this.node);
        })
            .start();
        cc.tween(this.label)
            .to(0.1, { fontSize: 32, lineHeight: 32 })
            .start();
    };
    damageLabel.prototype.damageAction = function () {
        var _this = this;
        this.node.opacity = 255;
        cc.tween(this.node)
            .parallel(cc.tween().by(0.4, { y: 120 }), cc.tween().to(0.06, { scale: 1.4 }).to(0.1, { scale: 1 }))
            .by(0.2, { opacity: -255, y: 60 })
            .call(function () {
            damageTipPool_1.default.instance.recoveryDmgLabel(_this.node);
        })
            .start();
        /*         cc.tween(this.label)
                .to(0.06,{fontSize:45,lineHeight:45})
                .to(0.07,{fontSize:32,lineHeight:32})
                .start(); */
    };
    damageLabel.prototype.reuse = function () {
        /*         let size=(this.node.color.g==255&&this.color.r==0)?0:32;
                this.label.fontSize=size;
                this.label.lineHeight=size;
                this.node.opacity=255; */
    };
    damageLabel.prototype.unuse = function () {
        cc.Tween.stopAllByTarget(this.node);
        if (this.label == null) {
            this.label = this.node.getComponent(cc.Label);
        }
        this.node.scale = 0;
        /*         this.label.fontSize=0;
                this.label.lineHeight=0; */
        this.node.active = false;
    };
    damageLabel = __decorate([
        ccclass
    ], damageLabel);
    return damageLabel;
}(cc.Component));
exports.default = damageLabel;

cc._RF.pop();