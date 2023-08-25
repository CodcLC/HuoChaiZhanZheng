"use strict";
cc._RF.push(module, 'ca9d7SQpQBO0YLL7wMxolKH', 'firePillarCollider');
// scripts/game/firePillarCollider.ts

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
var enemyHitCollider_1 = require("./enemyHitCollider");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var firePillarCollider = /** @class */ (function (_super) {
    __extends(firePillarCollider, _super);
    function firePillarCollider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fireSmoke1 = null;
        _this.fireSmoke2 = null;
        _this.damage = 0;
        _this.interval = 0.3; //攻击间隔
        _this.enemyHitCollider = null;
        _this.isStay = false;
        return _this;
    }
    firePillarCollider.prototype.onLoad = function () {
        this.enemyHitCollider = this.node.getComponent(enemyHitCollider_1.default);
    };
    firePillarCollider.prototype.start = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E20FirePillar, false, 0.5);
        this.scheduleOnce(function () {
            _this.fireSmoke2.active = true;
        }, 0.23);
        this.scheduleOnce(function () {
            _this.fireSmoke1.getComponent(cc.Animation).stop();
            _this.fireSmoke2.getComponent(cc.Animation).stop();
            cc.tween(_this.fireSmoke1).to(0.1, { opacity: 0 }).start();
            cc.tween(_this.fireSmoke2).to(0.1, { opacity: 0 }).start();
            _this.node.getComponent(cc.BoxCollider).enabled = false;
        }, 4);
        this.scheduleOnce(function () {
            _this.node.children[1].active = true;
            _this.node.children[0].active = false;
            _this.node.getComponent(cc.BoxCollider).enabled = true;
        }, 0.8);
    };
    firePillarCollider.prototype.hit = function () {
        var _this = this;
        this.enemyHitCollider.hit(this.node, this.damage);
        this.scheduleOnce(function () {
            if (_this.isStay) {
                _this.hit();
            }
        }, this.interval);
    };
    firePillarCollider.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        this.isStay = true;
        this.scheduleOnce(function () {
            _this.hit();
        }, 0);
    };
    /*     onCollisionStay(other:cc.Collider,self:cc.Collider){
            if(this.isStay) return;
            this.isStay=true;
            this.schedule(this.hit,this.interval);
            
        } */
    firePillarCollider.prototype.onCollisionExit = function (other, self) {
        this.isStay = false;
        //this.unschedule(this.hit);
    };
    __decorate([
        property(cc.Node)
    ], firePillarCollider.prototype, "fireSmoke1", void 0);
    __decorate([
        property(cc.Node)
    ], firePillarCollider.prototype, "fireSmoke2", void 0);
    firePillarCollider = __decorate([
        ccclass
    ], firePillarCollider);
    return firePillarCollider;
}(cc.Component));
exports.default = firePillarCollider;

cc._RF.pop();