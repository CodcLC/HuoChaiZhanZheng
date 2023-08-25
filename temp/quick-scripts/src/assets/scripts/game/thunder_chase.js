"use strict";
cc._RF.push(module, 'b5fabPzTzxMcruHZb3LiQ8O', 'thunder_chase');
// scripts/game/thunder_chase.ts

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
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var thunder_chase = /** @class */ (function (_super) {
    __extends(thunder_chase, _super);
    function thunder_chase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damage = 0;
        _this.isOpenCollider = false;
        _this.interval = 0.2;
        _this.isCD = false;
        _this.player = null;
        return _this;
    }
    // onLoad () {}
    thunder_chase.prototype.start = function () {
        var _this = this;
        this.scheduleOnce(function () {
            _this.isOpenCollider = true;
            if (_this.player != null && _this.isCD == false) {
                _this.hit();
            }
        }, 0.5);
        this.scheduleOnce(function () {
            _this.isOpenCollider = false;
        }, 2);
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 2.5);
    };
    thunder_chase.prototype.onCollisionEnter = function (other, self) {
        //if(this.isOpenCollider==false ||this.isCD) return;
        if (other.node.group == "player") {
            this.player = other.node;
            this.hit();
        }
    };
    /*     onCollisionStay(other:cc.Collider,self:cc.Collider){
            if(this.isOpenCollider==false ||this.isCD) return;
            if(other.node.group=="player"){
                this.hit();
            }
        } */
    thunder_chase.prototype.onCollisionExit = function (other, self) {
        //if(this.isOpenCollider==false ||this.isCD) return;
        if (other.node.group == "player") {
            this.player = null;
        }
    };
    thunder_chase.prototype.hit = function () {
        var _this = this;
        if (this.isOpenCollider == false || GameManager_1.default.instance.playerController.thunder_chase_cd) {
            this.scheduleOnce(function () {
                if (_this.player == null)
                    return;
                _this.hit();
            }, this.interval);
            return;
        }
        this.enterCD();
        this.playerEnterCd();
        this.node.getComponent(enemyHitCollider_1.default).hit(this.node, this.damage);
        this.scheduleOnce(function () {
            if (_this.player == null)
                return;
            _this.hit();
        }, this.interval);
    };
    thunder_chase.prototype.enterCD = function () {
        var _this = this;
        this.isCD = true;
        this.scheduleOnce(function () {
            _this.isCD = false;
        }, this.interval);
    };
    thunder_chase.prototype.playerEnterCd = function () {
        GameManager_1.default.instance.playerController.thunder_chase_cd = true;
        this.scheduleOnce(function () {
            GameManager_1.default.instance.playerController.thunder_chase_cd = false;
        }, this.interval);
    };
    thunder_chase = __decorate([
        ccclass
    ], thunder_chase);
    return thunder_chase;
}(cc.Component));
exports.default = thunder_chase;

cc._RF.pop();