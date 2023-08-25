"use strict";
cc._RF.push(module, 'c999aTfBeZFsaHFnMLh4J53', 'rock');
// scripts/game/rock.ts

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
var rock = /** @class */ (function (_super) {
    __extends(rock, _super);
    function rock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    rock.prototype.tween = function () {
        var _this = this;
        var _loop_1 = function (child) {
            child.scale = 0.3 + caijiTools_1.caijiTools.random_int(-10, 10) / 100;
            var x = caijiTools_1.caijiTools.random_int(-500, 500) / 10;
            var y = caijiTools_1.caijiTools.random_int(-500, 500) / 10;
            child.setPosition(x, y);
            var direction = cc.v2(x, y).normalizeSelf();
            var force = 1200;
            this_1.scheduleOnce(function () {
                child.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(direction.x * force, direction.y * force), true);
            }, 0);
            this_1.scheduleOnce(function () {
                cc.tween(child)
                    .to(0.3, { scale: 0 })
                    .start();
            }, 0.5);
        };
        var this_1 = this;
        for (var _i = 0, _a = this.node.children; _i < _a.length; _i++) {
            var child = _a[_i];
            _loop_1(child);
        }
        this.scheduleOnce(function () {
            skillPool_1.default.instance.recoveryRock(_this.node);
        }, 2);
    };
    rock.prototype.reuse = function () {
    };
    rock.prototype.unuse = function () {
    };
    rock = __decorate([
        ccclass
    ], rock);
    return rock;
}(cc.Component));
exports.default = rock;

cc._RF.pop();