"use strict";
cc._RF.push(module, 'e9412Qt87xH/J1fRyb224Iq', 'swordRain');
// scripts/game/swordRain.ts

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
var rock_1 = require("./rock");
var skillPool_1 = require("./skillPool");
var swordItem_1 = require("./swordItem");
var swordItem2_1 = require("./swordItem2");
var swordSmoke_1 = require("./swordSmoke");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var swordRain = /** @class */ (function (_super) {
    __extends(swordRain, _super);
    function swordRain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRight = false; //朝右
        _this.offsetForward_x1 = 400; //技能方向正偏移
        _this.offsetReverse_x1 = 1500; //技能方向反偏移
        _this.offsetForward_x2 = 500; //技能方向正偏移
        _this.offsetReverse_x2 = 1600; //技能方向反偏移
        _this.duration = 1.8;
        _this.smokeX_min = 0;
        _this.smokeX_max = 0;
        return _this;
    }
    swordRain.prototype.start = function () {
        var _this = this;
        if (this.isRight) {
            this.smokeX_min = 250;
            this.smokeX_max = 580;
        }
        else {
            this.smokeX_max = -250;
            this.smokeX_min = -580;
        }
        if (this.isRight) {
            this.node.children[0].active = true;
        }
        else {
            this.node.children[1].active = true;
        }
        this.schedule(this.createSword, 0.06);
        this.scheduleOnce(function () {
            _this.schedule(_this.createSword2, 0.04);
            _this.schedule(_this.createSmoke, 0.06);
        }, 0.3);
        this.scheduleOnce(function () {
            _this.destory();
        }, this.duration);
    };
    swordRain.prototype.destory = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        cc.tween(this.node)
            .to(0.2, { opacity: 0 })
            .call(function () {
            _this.node.children[0].active = false;
            _this.node.children[1].active = false;
            _this.scheduleOnce(function () {
                _this.node.destroy();
            }, 1);
        })
            .start();
    };
    swordRain.prototype.createSword = function () {
        for (var i = 0; i < 2; i++) {
            var sword = skillPool_1.default.instance.getSword1();
            sword.setParent(this.node);
            sword.setPosition(this.getRandomX_sword1() / 10, caijiTools_1.caijiTools.random_int(-500, 1100) / 10);
            sword.active = true;
            sword.getComponent(swordItem_1.default).isRight = this.isRight;
            sword.getComponent(swordItem_1.default).tween();
        }
    };
    swordRain.prototype.createSword2 = function () {
        for (var i = 0; i < 3; i++) {
            var sword2 = skillPool_1.default.instance.getSword2();
            sword2.setParent(this.node);
            sword2.setSiblingIndex(cc.macro.MIN_ZINDEX);
            sword2.setPosition(this.getRandomX_sword2() / 10, caijiTools_1.caijiTools.random_int(-700, 1300) / 10);
            sword2.active = true;
            sword2.getComponent(swordItem2_1.default).isRight = this.isRight;
            sword2.getComponent(swordItem2_1.default).tween();
        }
    };
    swordRain.prototype.getRandomX_sword1 = function () {
        if (this.isRight) {
            return caijiTools_1.caijiTools.random_int(-this.offsetReverse_x1, this.offsetForward_x1);
        }
        else {
            return caijiTools_1.caijiTools.random_int(-this.offsetForward_x1, this.offsetReverse_x1);
        }
    };
    swordRain.prototype.getRandomX_sword2 = function () {
        if (this.isRight) {
            return caijiTools_1.caijiTools.random_int(-this.offsetReverse_x2, this.offsetForward_x2);
        }
        else {
            return caijiTools_1.caijiTools.random_int(-this.offsetForward_x2, this.offsetReverse_x2);
        }
    };
    swordRain.prototype.createSmoke = function () {
        var smoke = skillPool_1.default.instance.getSwordSmoke();
        var nodePos = cc.v2(0, 0);
        nodePos.x = caijiTools_1.caijiTools.random_int(this.smokeX_min, this.smokeX_max);
        nodePos.y = caijiTools_1.caijiTools.random_int(-370, -420);
        smoke.setParent(this.node);
        smoke.setPosition(nodePos);
        smoke.getComponent(swordSmoke_1.default).tween();
        smoke.active = true;
        this.createRock(nodePos);
    };
    swordRain.prototype.createRock = function (pos) {
        var rockNode = skillPool_1.default.instance.getRock();
        rockNode.setParent(this.node);
        rockNode.setPosition(pos);
        rockNode.getComponent(rock_1.default).tween();
        rockNode.active = true;
    };
    swordRain = __decorate([
        ccclass
    ], swordRain);
    return swordRain;
}(cc.Component));
exports.default = swordRain;

cc._RF.pop();