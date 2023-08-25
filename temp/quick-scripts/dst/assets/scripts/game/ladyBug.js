
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/ladyBug.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e055666c3FBwKvInY3xe1FC', 'ladyBug');
// scripts/game/ladyBug.ts

"use strict";
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
var audioNameMgr_1 = require("../audioNameMgr");
var caijiTools_1 = require("../caijiTools");
var audioManager_1 = require("../main/audioManager");
var animationState_1 = require("./animationState");
var enemyAnimation_1 = require("./enemyAnimation");
var enemyBase_1 = require("./enemyBase");
var Events_1 = require("./Events");
var GameManager_1 = require("./GameManager");
var ladyBugFx_1 = require("./ladyBugFx");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
})(damageCollider || (damageCollider = {}));
var ladyBug = /** @class */ (function (_super) {
    __extends(ladyBug, _super);
    function ladyBug() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed = 300; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 1; //ai间隔
        _this.stopDistance = 250; //停止距离
        _this.stopDistance_y = 200; //停止y轴移动距离（200-250）
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 0; //手里剑攻击作用力
        _this.beHitForce_x = 0; //普通攻击作用力
        _this.beHitForce_y_shuriken = 0; //普通攻击作用力
        _this.beHitForce_x_attack3 = 0; //被击飞作用力
        _this.beHitForce_y_attack3 = 0; //被击飞作用力
        _this.scaleX_skeleton = 0;
        _this.isDie = false;
        _this.skeleton = null;
        _this.enemyAnimation = null;
        _this.rigibody = null;
        _this.boxCollider = null;
        _this.isSwordRainCd = false;
        _this.isSuperArmor = false; //是否霸体
        _this.isMove = false; //是否处于移动状态
        _this.dmgCollider = null;
        return _this;
    }
    ladyBug.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    ladyBug.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    ladyBug.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        var x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width / 2, cc.winSize.width / 2);
        var y = cc.winSize.height / 2 + caijiTools_1.caijiTools.random_int(30, 100);
        this.node.setPosition(x, y);
        this.AI_start();
    };
    ladyBug.prototype.update = function () {
        var _this = this;
        if (this.isMove == false)
            return;
        var distance = this.getDistance();
        if (Math.abs(distance) < this.stopDistance) {
            this.rigibody.linearVelocity = cc.v2(0, 0);
            this.changeMovState(false);
            if (Math.abs(this.getDistanceX()) < 50) {
                var moveDistance = this.skeleton.node.scaleX > 0 ? -100 : 100;
                cc.tween(this.node)
                    .by(0.5, { x: moveDistance })
                    .call(function () {
                    _this.hit();
                })
                    .start();
            }
            else {
                this.hit();
            }
        }
        else {
            if (this.enemyAnimation.state == animationState_1.enemyState.Atk)
                return;
            this.moveToPlayer();
        }
    };
    ladyBug.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
            this.rigibody.enabledContactListener = false;
            this.die_end();
        }
        else if (other.group == "wall") {
            contact.disabled = true;
        }
    };
    ladyBug.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    ladyBug.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    ladyBug.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    ladyBug.prototype.AI_start = function () {
        var _this = this;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.scheduleOnce(function () {
                _this.AI_start();
            }, 1);
            return;
        }
        var distance = Math.abs(this.getDistance());
        if (distance < this.stopDistance + 50) {
            if (Math.abs(this.getDistanceX()) < 50) {
                var moveDistance = this.skeleton.node.scaleX > 0 ? -150 : 150;
                cc.tween(this.node)
                    .by(0.5, { x: moveDistance })
                    .call(function () {
                    _this.hit();
                })
                    .start();
            }
            else {
                var x = this.skeleton.node.scaleX < 0 ?
                    GameManager_1.default.instance.player.x - caijiTools_1.caijiTools.random_int(150, 400) :
                    GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(100, 300);
                var y = GameManager_1.default.instance.player.y + caijiTools_1.caijiTools.random_int(150, 400);
                var distance_1 = cc.v3(x, y).sub(this.node.position).len();
                cc.tween(this.node)
                    .to(distance_1 / 300, { position: cc.v3(x, y) })
                    .call(function () {
                    _this.hit();
                })
                    .start();
            }
        }
        else {
            this.changeStopDistanceY();
            this.changeMovState(true);
            this.changeDirection();
        }
    };
    ladyBug.prototype.AI_stop = function () {
        this.idle();
    };
    ladyBug.prototype.changeStopDistanceY = function () {
        this.stopDistance_y = caijiTools_1.caijiTools.random_int(200, 250);
    };
    ladyBug.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    ladyBug.prototype.idle = function () {
        var _this = this;
        this.changeMovState(false);
        this.changeDirection();
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true, true);
        this.scheduleOnce(function () {
            _this.AI_start();
        }, this.AI_interval);
    };
    ladyBug.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x > this.node.x ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    ladyBug.prototype.die = function () {
        if (this.isDie)
            return;
        this.unscheduleAllCallbacks();
        cc.Tween.stopAllByTarget(this.node);
        this.closeHighLight();
        this.isDie = true;
        this.hideHp();
        this.enemyAnimation.changeState(animationState_1.enemyState["Die-start"], 1, false);
        this.dieCount();
    };
    ladyBug.prototype.die_middle = function () {
        this.rigibody.gravityScale = 5;
        this.rigibody.linearVelocity = cc.v2(0, -1300);
        //this.enemyAnimation.changeState(enemyState["Die-middle"],1,false);
    };
    ladyBug.prototype.die_end = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Die_end, 1, false);
    };
    ladyBug.prototype.Destory = function () {
        this.node.destroy();
    };
    ladyBug.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    ladyBug.prototype.moveToPlayer = function () {
        this.changeDirection();
        var direct = GameManager_1.default.instance.player.position.sub(this.node.position).normalizeSelf();
        direct.y = this.getDistanceY() <= this.stopDistance_y ? 0 : direct.y;
        this.rigibody.linearVelocity = cc.v2(this.moveSpeed * direct.x, this.moveSpeed * direct.y);
    };
    ladyBug.prototype.hit = function () {
        if (animationState_1.enemyState[this.enemyAnimation.state].includes("get_hurt"))
            return;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.Atk, 1, false);
    };
    ladyBug.prototype.fire = function (trackEntry, event) {
        if (event.data.name == "Fire") {
            this.createFX();
        }
    };
    ladyBug.prototype.createFX = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, y, prefab, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E24_Shoot);
                        x = this.skeleton.node.scaleX > 0 ? this.node.x - 40 : this.node.x + 40;
                        y = this.node.y - 40;
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/ladyBugFX")];
                    case 1:
                        prefab = _a.sent();
                        effect = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        effect.setSiblingIndex(this.node.getSiblingIndex() + 1);
                        effect.setPosition(x, y);
                        effect.getComponent(ladyBugFx_1.default).isRightMove = this.skeleton.node.scaleX > 0 ? false : true;
                        effect.getComponent(ladyBugFx_1.default).damage = this.damage;
                        effect.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ladyBug.prototype.beHit = function (damage, dmgType) {
        this.changeMovState(false);
        this.setRigibodySpeed(0);
        // let isContinue = this.checkIsSwordRain(dmgType);//设置剑雨攻击间隔
        // if (isContinue == 0) return;
        this.highLight();
        this.showHp();
        this.changeState_beHit(dmgType);
        var x = this.node.scaleX < 0 ? this.node.x + this.damageLabelOffsetX : this.node.x - this.damageLabelOffsetX;
        var y = this.node.y + this.damageLabelOffsetY;
        Events_1.default.instance.showDamageLabel_enemy(this.node, damage, cc.v2(x, y));
        this.updateHp(damage);
        if (this.hp <= 0) {
            Events_1.default.instance.createEnemyDieEffect(this.node, this.dieEffectName, cc.v2(x, y));
        }
    };
    ladyBug.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    ladyBug.prototype.changeState_beHit = function (dmgType) {
        var _this = this;
        if (this.isSuperArmor)
            return;
        var state = null;
        var isKnockDown = dmgType == animationState_1.attackType.attack3 ? true : false;
        switch (dmgType) {
            case animationState_1.attackType.attack1:
                state = animationState_1.enemyState.get_hurt2;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, 0));
                break;
            case animationState_1.attackType.attack2:
                state = animationState_1.enemyState.get_hurt1;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, 0));
                break;
            case animationState_1.attackType.attack3:
                this.setLinearDamping(0);
                this.scheduleOnce(function () {
                    _this.setLinearDamping(5);
                }, 0.4);
                state = animationState_1.enemyState.knock_down;
                if (this.node.x < GameManager_1.default.instance.player.x && GameManager_1.default.instance.playerController.skeleton.node.scaleX < 0) {
                    this.applyForce(cc.v2(-this.beHitForce_x_attack3, this.beHitForce_y_attack3));
                }
                else if (this.node.x > GameManager_1.default.instance.player.x && GameManager_1.default.instance.playerController.skeleton.node.scaleX > 0) {
                    this.applyForce(cc.v2(this.beHitForce_x_attack3, this.beHitForce_y_attack3));
                }
                break;
            case animationState_1.attackType.jumpHit:
                state = animationState_1.enemyState.get_hurt1;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, 0));
                break;
            case animationState_1.attackType.shuriken:
                state = animationState_1.enemyState.get_hurt1;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, this.beHitForce_y_shuriken));
                break;
            case animationState_1.attackType.swordRain:
                state = animationState_1.enemyState.get_hurt1;
                break;
            default:
        }
        this.enemyAnimation.changeState(state, 1, false, isKnockDown);
    };
    ladyBug.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    ladyBug.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    ladyBug.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    ladyBug.prototype.checkIsSwordRain = function (dmgType) {
        var _this = this;
        if (dmgType == animationState_1.attackType.swordRain) {
            if (this.isSwordRainCd)
                return 0;
            this.isSwordRainCd = true;
            this.scheduleOnce(function () {
                _this.isSwordRainCd = false;
            }, this.swordRainHitCd);
        }
        return 1;
    };
    ladyBug.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    ladyBug.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    ladyBug.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    ladyBug.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    ladyBug.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    ladyBug.prototype.getDistance = function () {
        return this.node.position.sub(GameManager_1.default.instance.player.position).len();
    };
    ladyBug.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    ladyBug.prototype.getDistanceY = function () {
        return Math.abs(this.node.y - GameManager_1.default.instance.player.y);
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], ladyBug.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], ladyBug.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], ladyBug.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], ladyBug.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], ladyBug.prototype, "dieEffectName", void 0);
    ladyBug = __decorate([
        ccclass
    ], ladyBug);
    return ladyBug;
}(enemyBase_1.default));
exports.default = ladyBug;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcbGFkeUJ1Zy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNEM7QUFDNUMsNENBQTJDO0FBQzNDLHFEQUFnRDtBQUNoRCxtREFBMEQ7QUFDMUQsbURBQThDO0FBQzlDLHlDQUFvQztBQUNwQyxtQ0FBOEI7QUFDOUIsNkNBQXdDO0FBQ3hDLHlDQUFvQztBQUU5QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QyxJQUFLLGNBRUo7QUFGRCxXQUFLLGNBQWM7SUFDZix1REFBTSxDQUFBO0FBQ1YsQ0FBQyxFQUZJLGNBQWMsS0FBZCxjQUFjLFFBRWxCO0FBRUQ7SUFBcUMsMkJBQVM7SUFBOUM7UUFBQSxxRUEyVUM7UUF4VUcsd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLFdBQUssR0FBbUIsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGVBQVMsR0FBVyxHQUFHLENBQUMsQ0FBQSxNQUFNO1FBQzlCLGNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzNCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUM5QixrQkFBWSxHQUFRLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsb0JBQWMsR0FBUSxHQUFHLENBQUMsQ0FBQSxtQkFBbUI7UUFDN0MsUUFBRSxHQUFXLENBQUMsQ0FBQztRQUNmLGFBQU8sR0FBUSxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQ3ZCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDLENBQUEsVUFBVTtRQUNuQyxrQkFBWSxHQUFXLENBQUMs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Q0FBQztJQUMvRCxDQUFDO0lBdlVEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO3VEQUNwQjtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQzt1REFDcEI7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzBDQUNJO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ087SUFYVixPQUFPO1FBRDNCLE9BQU87T0FDYSxPQUFPLENBMlUzQjtJQUFELGNBQUM7Q0EzVUQsQUEyVUMsQ0EzVW9DLG1CQUFTLEdBMlU3QztrQkEzVW9CLE9BQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCBhdWRpb01hbmFnZXIgZnJvbSBcIi4uL21haW4vYXVkaW9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBhdHRhY2tUeXBlLCBlbmVteVN0YXRlIH0gZnJvbSBcIi4vYW5pbWF0aW9uU3RhdGVcIjtcbmltcG9ydCBlbmVteUFuaW1hdGlvbiBmcm9tIFwiLi9lbmVteUFuaW1hdGlvblwiO1xuaW1wb3J0IGVuZW15QmFzZSBmcm9tIFwiLi9lbmVteUJhc2VcIjtcbmltcG9ydCBFdmVudHMgZnJvbSBcIi4vRXZlbnRzXCI7XG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcbmltcG9ydCBsYWR5QnVnRnggZnJvbSBcIi4vbGFkeUJ1Z0Z4XCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVye1xuICAgIGF0dGFja1xufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxhZHlCdWcgZXh0ZW5kcyBlbmVteUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceOi9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRYOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuS8pOWus+aViOaenHnovbTlgY/np7vlgLxcIiB9KVxuICAgIGRhbWFnZUxhYmVsT2Zmc2V0WTogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBocE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBocEJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TdHJpbmcpXG4gICAgZGllRWZmZWN0TmFtZTogc3RyaW5nID0gXCJcIjtcblxuICAgIG1vdmVTcGVlZDogbnVtYmVyID0gMzAwOy8v56e75Yqo6YCf5bqmXG4gICAgbm93U3BlZWQ6IG51bWJlciA9IDA7Ly/lvZPliY3pgJ/luqZcbiAgICBBSV9pbnRlcnZhbDogbnVtYmVyID0gMTsvL2Fp6Ze06ZqUXG4gICAgc3RvcERpc3RhbmNlOm51bWJlcj0yNTA7Ly/lgZzmraLot53nprtcbiAgICBzdG9wRGlzdGFuY2VfeTpudW1iZXI9MjAwOy8v5YGc5q2ieei9tOenu+WKqOi3neemu++8iDIwMC0yNTDvvIlcbiAgICBocDogbnVtYmVyID0gMDtcbiAgICBocFRpbWVzOm51bWJlcj0xOy8v6KGA6YeP5YCN5pWwXG4gICAgYmVIaXRGb3JjZV95OiBudW1iZXIgPSAwOy8v5omL6YeM5YmR5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94OiBudW1iZXIgPSAwLy/mma7pgJrmlLvlh7vkvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3lfc2h1cmlrZW46IG51bWJlciA9IDAvL+aZrumAmuaUu+WHu+S9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeF9hdHRhY2szOiBudW1iZXIgPSAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV95X2F0dGFjazM6IG51bWJlciA9IDA7Ly/ooqvlh7vpo57kvZznlKjliptcbiAgICBzY2FsZVhfc2tlbGV0b246IG51bWJlciA9IDA7XG4gICAgaXNEaWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBza2VsZXRvbjogc3AuU2tlbGV0b24gPSBudWxsO1xuICAgIGVuZW15QW5pbWF0aW9uOiBlbmVteUFuaW1hdGlvbiA9IG51bGw7XG4gICAgcmlnaWJvZHk6IGNjLlJpZ2lkQm9keSA9IG51bGw7XG4gICAgYm94Q29sbGlkZXI6IGNjLlBoeXNpY3NCb3hDb2xsaWRlciA9IG51bGw7XG4gICAgaXNTd29yZFJhaW5DZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzU3VwZXJBcm1vcjogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm6Zy45L2TXG4gICAgaXNNb3ZlOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKblpITkuo7np7vliqjnirbmgIFcbiAgICBkbWdDb2xsaWRlcjpkYW1hZ2VDb2xsaWRlcj1udWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIHRoaXMuc2NhbGVYX3NrZWxldG9uID0gTWF0aC5hYnModGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGVuZW15QW5pbWF0aW9uKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5lbmVteUNvbnRyb2xsZXIgPSB0aGlzO1xuICAgICAgICB0aGlzLnJpZ2lib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5QaHlzaWNzQm94Q29sbGlkZXIpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc2tlbGV0b24uc2tlbGV0b25EYXRhLl9za2VsZXRvbkNhY2hlLmFuaW1hdGlvbnMpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaHAgPSB0aGlzLmhwTWF4KnRoaXMuaHBUaW1lcztcbiAgICAgICAgbGV0IHg9R2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLngrY2FpamlUb29scy5yYW5kb21faW50KC1jYy53aW5TaXplLndpZHRoLzIsY2Mud2luU2l6ZS53aWR0aC8yKTtcbiAgICAgICAgbGV0IHk9Y2Mud2luU2l6ZS5oZWlnaHQvMitjYWlqaVRvb2xzLnJhbmRvbV9pbnQoMzAsMTAwKTtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHgseSk7XG4gICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5pc01vdmUgPT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gdGhpcy5nZXREaXN0YW5jZSgpO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpIDwgdGhpcy5zdG9wRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIoMCwwKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgaWYoTWF0aC5hYnModGhpcy5nZXREaXN0YW5jZVgoKSk8NTApe1xuICAgICAgICAgICAgICAgIGxldCBtb3ZlRGlzdGFuY2U9dGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWD4wPy0xMDA6MTAwO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgICAgICAuYnkoMC41LHt4Om1vdmVEaXN0YW5jZX0pXG4gICAgICAgICAgICAgICAgLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGU9PWVuZW15U3RhdGUuQXRrKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm1vdmVUb1BsYXllcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3Q6IGNjLlBoeXNpY3NDb250YWN0LCBzZWxmQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlciwgb3RoZXJDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlciA9IG90aGVyQ29sbGlkZXIubm9kZTtcbiAgICAgICAgLy8gbGV0IHdvcmxkTWFuaWZvbGQgPSBjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKTtcbiAgICAgICAgLy8gbGV0IG5vcm1hbCA9IHdvcmxkTWFuaWZvbGQubm9ybWFsO1xuICAgICAgICBpZiAob3RoZXIuZ3JvdXAgPT0gXCJncm91bmRcIikge1xuICAgICAgICAgICAgdGhpcy5yaWdpYm9keS5lbmFibGVkQ29udGFjdExpc3RlbmVyPWZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kaWVfZW5kKCk7XG4gICAgICAgIH1lbHNlIGlmKG90aGVyLmdyb3VwPT1cIndhbGxcIil7XG4gICAgICAgICAgICBjb250YWN0LmRpc2FibGVkPXRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0RhbWFnZUNvbGxpZGVyKGNvbGxpZGVyOmRhbWFnZUNvbGxpZGVyKXtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW2NvbGxpZGVyXS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgdGhpcy5kbWdDb2xsaWRlcj1jb2xsaWRlcjtcbiAgICB9XG4gICAgZ2V0RGFtYWdlQ29sbGlkZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlblt0aGlzLmRtZ0NvbGxpZGVyXTtcbiAgICB9XG4gICAgaGlkZURhbWFnZUNvbGxpZGVyKCl7XG4gICAgICAgIGlmKHRoaXMuZG1nQ29sbGlkZXI9PW51bGwpIHJldHVybjtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgdGhpcy5kbWdDb2xsaWRlcj1udWxsO1xuICAgIH1cbiAgICBBSV9zdGFydCgpIHtcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5pc0RpZSl7XG4gICAgICAgICAgICAvL+eOqeWutuW3suatuyDlgZzmraLnp7vliqhcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgICAgICAgICAgfSwxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLmFicyh0aGlzLmdldERpc3RhbmNlKCkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnN0b3BEaXN0YW5jZSs1MCkge1xuICAgICAgICAgICAgaWYoTWF0aC5hYnModGhpcy5nZXREaXN0YW5jZVgoKSk8NTApe1xuICAgICAgICAgICAgICAgIGxldCBtb3ZlRGlzdGFuY2U9dGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWD4wPy0xNTA6MTUwO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgICAgICAuYnkoMC41LHt4Om1vdmVEaXN0YW5jZX0pXG4gICAgICAgICAgICAgICAgLmNhbGwoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IHg9dGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWDwwP1xuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54LWNhaWppVG9vbHMucmFuZG9tX2ludCgxNTAsNDAwKTpcbiAgICAgICAgICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCtjYWlqaVRvb2xzLnJhbmRvbV9pbnQoMTAwLDMwMCk7XG4gICAgICAgICAgICAgICAgbGV0IHk9R2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnkrY2FpamlUb29scy5yYW5kb21faW50KDE1MCw0MDApO1xuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZT1jYy52Myh4LHkpLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pLmxlbigpO1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgICAgICAudG8oZGlzdGFuY2UvMzAwLHtwb3NpdGlvbjpjYy52Myh4LHkpfSlcbiAgICAgICAgICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpdCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0b3BEaXN0YW5jZVkoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIEFJX3N0b3AoKSB7XG4gICAgICAgIHRoaXMuaWRsZSgpO1xuICAgIH1cbiAgICBjaGFuZ2VTdG9wRGlzdGFuY2VZKCl7XG4gICAgICAgIHRoaXMuc3RvcERpc3RhbmNlX3k9Y2FpamlUb29scy5yYW5kb21faW50KDIwMCwyNTApO1xuICAgIH1cbiAgICBjaGFuZ2VNb3ZTdGF0ZShpc01vdmU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc01vdmUgPSBpc01vdmU7XG4gICAgfVxuICAgIGlkbGUoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLDApO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuSWRsZSwgMSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICAgICAgfSwgdGhpcy5BSV9pbnRlcnZhbCk7XG4gICAgfVxuICAgIGNoYW5nZURpcmVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA9IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5zY2FsZVhfc2tlbGV0b24gOiB0aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgLy90aGlzLmhwTm9kZS54ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtMjggOiAyODtcbiAgICB9XG4gICAgZGllKCkge1xuICAgICAgICBpZih0aGlzLmlzRGllKSByZXR1cm47XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5jbG9zZUhpZ2hMaWdodCgpO1xuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oaWRlSHAoKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlW1wiRGllLXN0YXJ0XCJdLDEsZmFsc2UpO1xuICAgICAgICB0aGlzLmRpZUNvdW50KCk7XG4gICAgfVxuICAgIGRpZV9taWRkbGUoKXtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5ncmF2aXR5U2NhbGU9NTtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52MigwLC0xMzAwKTtcbiAgICAgICAgLy90aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGVbXCJEaWUtbWlkZGxlXCJdLDEsZmFsc2UpO1xuICAgIH1cbiAgICBkaWVfZW5kKCl7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5EaWVfZW5kLDEsZmFsc2UpO1xuICAgIH1cbiAgICBEZXN0b3J5KCl7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuICAgIGdldFVwKCkge1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuZ2V0X3VwLCAxLCBmYWxzZSwgdHJ1ZSlcbiAgICB9XG4gICAgbW92ZVRvUGxheWVyKCkge1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICBsZXQgZGlyZWN0PUdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci5wb3NpdGlvbi5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5ub3JtYWxpemVTZWxmKCk7XG4gICAgICAgIGRpcmVjdC55PXRoaXMuZ2V0RGlzdGFuY2VZKCk8PXRoaXMuc3RvcERpc3RhbmNlX3k/MDpkaXJlY3QueTtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih0aGlzLm1vdmVTcGVlZCpkaXJlY3QueCx0aGlzLm1vdmVTcGVlZCpkaXJlY3QueSk7XG4gICAgfVxuICAgIGhpdCgpIHtcbiAgICAgICAgaWYoZW5lbXlTdGF0ZVt0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlXS5pbmNsdWRlcyhcImdldF9odXJ0XCIpKSByZXR1cm47XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkF0aywgMSwgZmFsc2UpO1xuICAgIH1cbiAgICBmaXJlKHRyYWNrRW50cnksZXZlbnQpe1xuICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PVwiRmlyZVwiKXtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRlgoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjcmVhdGVGWCgpe1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMjRfU2hvb3QpO1xuICAgICAgICBsZXQgeD10aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYPjA/dGhpcy5ub2RlLngtNDA6dGhpcy5ub2RlLngrNDA7XG4gICAgICAgIGxldCB5PXRoaXMubm9kZS55LTQwO1xuICAgICAgICBsZXQgcHJlZmFiPWF3YWl0IGNhaWppVG9vbHMubG9hZFByZWZhYihcInByZWZhYnMvbGFkeUJ1Z0ZYXCIpO1xuICAgICAgICBsZXQgZWZmZWN0PWNhaWppVG9vbHMuY3JlYXRlTm9kZShwcmVmYWIsdGhpcy5ub2RlLnBhcmVudCk7XG4gICAgICAgIGVmZmVjdC5zZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlLmdldFNpYmxpbmdJbmRleCgpKzEpO1xuICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24oeCx5KTtcbiAgICAgICAgZWZmZWN0LmdldENvbXBvbmVudChsYWR5QnVnRngpLmlzUmlnaHRNb3ZlPXRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVg+MD9mYWxzZTp0cnVlO1xuICAgICAgICBlZmZlY3QuZ2V0Q29tcG9uZW50KGxhZHlCdWdGeCkuZGFtYWdlPXRoaXMuZGFtYWdlO1xuICAgICAgICBlZmZlY3QuYWN0aXZlPXRydWU7XG4gICAgfVxuICAgIGJlSGl0KGRhbWFnZTogbnVtYmVyLCBkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCk7XG4gICAgICAgIC8vIGxldCBpc0NvbnRpbnVlID0gdGhpcy5jaGVja0lzU3dvcmRSYWluKGRtZ1R5cGUpOy8v6K6+572u5YmR6Zuo5pS75Ye76Ze06ZqUXG4gICAgICAgIC8vIGlmIChpc0NvbnRpbnVlID09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHQoKTtcbiAgICAgICAgdGhpcy5zaG93SHAoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZV9iZUhpdChkbWdUeXBlKTtcbiAgICAgICAgbGV0IHggPSB0aGlzLm5vZGUuc2NhbGVYIDwgMCA/IHRoaXMubm9kZS54ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFggOiB0aGlzLm5vZGUueCAtIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYO1xuICAgICAgICBsZXQgeSA9IHRoaXMubm9kZS55ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFk7XG4gICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zaG93RGFtYWdlTGFiZWxfZW5lbXkodGhpcy5ub2RlLCBkYW1hZ2UsIGNjLnYyKHgsIHkpKTtcbiAgICAgICAgdGhpcy51cGRhdGVIcChkYW1hZ2UpO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICBFdmVudHMuaW5zdGFuY2UuY3JlYXRlRW5lbXlEaWVFZmZlY3QodGhpcy5ub2RlLCB0aGlzLmRpZUVmZmVjdE5hbWUsIGNjLnYyKHgsIHkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRSaWdpYm9keVNwZWVkKHg6bnVtYmVyLHk6bnVtYmVyPTApe1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5PWNjLnYyKHgseSk7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlX2JlSGl0KGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYodGhpcy5pc1N1cGVyQXJtb3IpIHJldHVybjtcbiAgICAgICAgbGV0IHN0YXRlID0gbnVsbDtcbiAgICAgICAgbGV0IGlzS25vY2tEb3duID0gZG1nVHlwZSA9PSBhdHRhY2tUeXBlLmF0dGFjazMgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoZG1nVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazE6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MjtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2szOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZygwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZyg1KTtcbiAgICAgICAgICAgICAgICB9LCAwLjQpO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5rbm9ja19kb3duO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA8IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICYmIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MigtdGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnggPiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIodGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5qdW1wSGl0OlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLnNodXJpa2VuOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUhpdEZvcmNlX3lfc2h1cmlrZW4pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zd29yZFJhaW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShzdGF0ZSwgMSwgZmFsc2UsIGlzS25vY2tEb3duKTtcbiAgICB9XG4gICAgc2V0TGluZWFyRGFtcGluZyhkYW1waW5nOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJEYW1waW5nID0gZGFtcGluZztcbiAgICB9XG4gICAgc2V0RnJpY3Rpb24oZnJpY3Rpb246IG51bWJlciA9IDApIHtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5mcmljdGlvbiA9IGZyaWN0aW9uO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmFwcGx5KCk7XG4gICAgfVxuICAgIGFwcGx5Rm9yY2UoZm9yY2U6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIHRoaXMucmlnaWJvZHkuYXBwbHlGb3JjZVRvQ2VudGVyKGZvcmNlLCB0cnVlKTtcbiAgICB9XG4gICAgY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmIChkbWdUeXBlID09IGF0dGFja1R5cGUuc3dvcmRSYWluKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N3b3JkUmFpbkNkKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1N3b3JkUmFpbkNkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzLnN3b3JkUmFpbkhpdENkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgdXBkYXRlSHAoZGFtYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ocCAtPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMuaHBCYXIucHJvZ3Jlc3MgPSB0aGlzLmhwIC8gdGhpcy5ocE1heDtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XG4gICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dIcCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuaGlkZUhwKTtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5oaWRlSHAsMik7XG4gICAgfVxuICAgIGhpZGVIcCgpIHtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY2xvc2VIaWdoTGlnaHQpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMSk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJoaWdoTGlnaHRDb2xvclwiLCBbMS4wLDEuMCwxLjAsMC41XSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuY2xvc2VIaWdoTGlnaHQsIDAuMTUpO1xuICAgIH1cbiAgICBjbG9zZUhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImJlSGl0XCIsIDApO1xuICAgIH1cbiAgICBnZXREaXN0YW5jZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnBvc2l0aW9uLnN1YihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIucG9zaXRpb24pLmxlbigpO1xuICAgIH1cbiAgICBnZXREaXN0YW5jZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUueCAtIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54O1xuICAgIH1cbiAgICBnZXREaXN0YW5jZVkoKXtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubm9kZS55LUdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci55KTtcbiAgICB9XG59XG4iXX0=