"use strict";
cc._RF.push(module, '25086OybqJGWJ4DaXZ8IcjK', 'ladyBugFx');
// scripts/game/ladyBugFx.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var caijiTools_1 = require("../caijiTools");
var GameManager_1 = require("./GameManager");
var playerController_1 = require("./playerController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ladyBugFx = /** @class */ (function (_super) {
    __extends(ladyBugFx, _super);
    function ladyBugFx() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.liquidParticle = null;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.damage = 0;
        _this.isRightMove = false; //是否朝右
        _this.isCollide = false;
        _this.rigibody = null;
        return _this;
    }
    ladyBugFx.prototype.onLoad = function () {
        this.rigibody = this.node.getComponent(cc.RigidBody);
    };
    ladyBugFx.prototype.start = function () {
        var time = (Math.abs(this.node.y - GameManager_1.default.instance.player.y) + 40) / this.speedY;
        var distanceX = Math.abs(this.node.x - GameManager_1.default.instance.player.x);
        this.speedX = distanceX * 3;
        //this.speedX=(Math.abs(this.node.x-GameManager.instance.player.x))/time;
        this.speedX = this.isRightMove == true ? this.speedX : -this.speedX;
        this.liquidParticle.angle = this.isRightMove == true ? -30 : -150;
        this.rigibody.linearVelocity = cc.v2(this.speedX, 0);
    };
    ladyBugFx.prototype.hit = function (player) {
        this.createSmoke();
        player.getComponent(playerController_1.default).beHit(this.node, this.damage);
    };
    ladyBugFx.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        if (this.isCollide)
            return;
        var other = otherCollider.node;
        if (other.group == "ground") {
            this.createSmoke();
        }
        else if (other.group == "player") {
            this.hit(other);
        }
    };
    ladyBugFx.prototype.createSmoke = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, smoke;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isCollide = true;
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/ladyBugSmoke")];
                    case 1:
                        prefab = _a.sent();
                        smoke = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        smoke.setPosition(this.node.position);
                        smoke.active = true;
                        this.node.destroy();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.ParticleSystem)
    ], ladyBugFx.prototype, "liquidParticle", void 0);
    ladyBugFx = __decorate([
        ccclass
    ], ladyBugFx);
    return ladyBugFx;
}(cc.Component));
exports.default = ladyBugFx;

cc._RF.pop();