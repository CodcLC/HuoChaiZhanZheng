
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/E10controller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '44ec1xghrhGfoDx/0DVq2+7', 'E10controller');
// scripts/game/E10controller.ts

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
var enemyHitCollider_1 = require("./enemyHitCollider");
var Events_1 = require("./Events");
var GameManager_1 = require("./GameManager");
var bossHp_1 = require("./ui/bossHp");
var uiManager_1 = require("./ui/uiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
    damageCollider[damageCollider["skill1"] = 1] = "skill1";
    damageCollider[damageCollider["skill2"] = 2] = "skill2";
})(damageCollider || (damageCollider = {}));
var E10controller = /** @class */ (function (_super) {
    __extends(E10controller, _super);
    function E10controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.dieEffectName = "";
        _this.rushSpeed = 700; //冲击速度
        _this.moveSpeed = 120; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.5; //ai间隔
        _this.stopDistance = 300; //停止距离
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 25000; //手里剑攻击作用力
        _this.beHitForce_x = 25000; //普通攻击作用力
        _this.beHitForce_y_shuriken = 50000; //普通攻击作用力
        _this.beHitForce_x_attack3 = 350000; //被击飞作用力
        _this.beHitForce_y_attack3 = 0; //被击飞作用力
        _this.scaleX_skeleton = 0;
        _this.allowMoveTime = 2; //允许move状态最长时间
        _this.allowAttackTime = 2; //允许连续attack次数
        _this.attackTimes = 0; //attack连续次数
        _this.skill1_x = 0; //泰山压顶落地坐标（升空时玩家位置）
        _this.isStartRush = false; //开始冲撞
        _this.isDie = false;
        _this.skeleton = null;
        _this.enemyAnimation = null;
        _this.rigibody = null;
        _this.boxCollider = null;
        _this.isSwordRainCd = false;
        _this.isMove = false; //是否处于移动状态
        _this.isWuDi = false; //无敌状态
        _this.dmgCollider = null;
        _this.isHighLight = false;
        _this.highLight_A = {
            a: 0.5
        };
        return _this;
    }
    E10controller.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E10controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E10controller.prototype.init = function () {
        uiManager_1.default.ins.showBossHp(bossHp_1.bossName.enemy10);
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        this.idle();
    };
    E10controller.prototype.update = function () {
        this.highLightAction();
        this.skill2Move();
        if (this.isMove == false)
            return;
        var distance = this.getDistanceX();
        if (Math.abs(distance) < this.stopDistance) {
            this.hit();
        }
        else {
            if (this.enemyAnimation.state == animationState_1.enemyState.attack)
                return;
            this.moveToPlayer();
        }
    };
    E10controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "wall") {
            this.skill2End();
        }
    };
    E10controller.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].getComponent(enemyHitCollider_1.default).enemyControl = this;
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E10controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E10controller.prototype.hideDamageCollider = function (isCompelClose) {
        if (isCompelClose === void 0) { isCompelClose = false; }
        if (this.dmgCollider == null)
            return;
        if (this.dmgCollider == damageCollider.skill1 && isCompelClose == false)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E10controller.prototype.AI_start = function () {
        var _this = this;
        this.allowAttackTime = caijiTools_1.caijiTools.random_int(2, 3);
        this.allowMoveTime = caijiTools_1.caijiTools.random_int(200, 500) / 100;
        if (this.isDie)
            return;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.changeMovState(false);
            this.scheduleOnce(function () {
                _this.AI_start();
            }, 1);
            return;
        }
        var distance = Math.abs(this.getDistanceX());
        if (distance < this.stopDistance) {
            this.hit();
        }
        else {
            this.changeDirection();
            this.enemyAnimation.changeState(animationState_1.enemyState.move, 1, true);
            this.changeMovState(true);
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
            this.scheduleOnce(function () {
                if (_this.enemyAnimation.state != animationState_1.enemyState.move)
                    return;
                _this.skill2();
            }, this.allowMoveTime);
        }
    };
    E10controller.prototype.AI_stop = function () {
        this.idle();
    };
    E10controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E10controller.prototype.idle = function (nextState) {
        var _this = this;
        if (nextState === void 0) { nextState = animationState_1.enemyState.idle; }
        this.changeMovState(false);
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.idle, 1, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.idle)
                return;
            if (nextState == animationState_1.enemyState.idle) {
                _this.AI_start();
            }
            else {
                _this.skill1();
            }
        }, this.AI_interval);
    };
    E10controller.prototype.changeDirection = function () {
        if (GameManager_1.default.instance.player == null)
            return;
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E10controller.prototype.die = function () {
        this.isDie = true;
        this.endRush();
        this.setRigibodySpeed(0, 0);
        this.changeMovState(false);
        this.unscheduleAllCallbacks();
        this.enemyAnimation.changeState(animationState_1.enemyState.die, 1, false, true);
        this.dieCount();
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10_death);
    };
    E10controller.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    E10controller.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E10controller.prototype.hitComplete = function () {
        var _this = this;
        if (this.attackTimes < this.allowAttackTime) {
            if (this.getDistanceX() <= this.stopDistance) {
                this.hit();
            }
            else {
                this.changeDirection();
                this.enemyAnimation.changeState(animationState_1.enemyState.move, 1, true);
                this.changeMovState(true);
                this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
                this.scheduleOnce(function () {
                    if (_this.enemyAnimation.state != animationState_1.enemyState.move)
                        return;
                    _this.skill2();
                }, this.allowMoveTime);
            }
        }
        else {
            this.skill2();
        }
    };
    E10controller.prototype.hit = function () {
        var _this = this;
        this.attackTimes++;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.showDamageCollider(damageCollider.attack);
        this.enemyAnimation.changeState(animationState_1.enemyState.attack, 1, false);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state == animationState_1.enemyState.attack) {
                _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
            }
        }, 1.1);
        this.scheduleOnce(function () {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10_attack);
        }, 0.6);
    };
    //冲撞攻击-skill
    E10controller.prototype.hit_rush = function () {
        if (this.dmgCollider == damageCollider.skill1) {
            this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(this.node, this.damage, true);
        }
    };
    //泰山压顶开始
    E10controller.prototype.skill1 = function () {
        this.skill1_x = GameManager_1.default.instance.player.x;
        this.skill1_x = this.skeleton.node.scaleX > 0 ? this.skill1_x + 200 : this.skill1_x - 200;
        this.isWuDi = true;
        this.enemyAnimation.changeState(animationState_1.enemyState.skill1, 1, false, true);
        this.showDamageCollider(damageCollider.skill2);
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10_Jump);
    };
    E10controller.prototype.frameEvent_skill1 = function (e, event) {
        var _this = this;
        if (event.data.name == "StopMove") {
            //泰山压顶落地
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.Spell_Earth_02);
            this.isWuDi = false;
            Events_1.default.instance.screenShake();
            this.FX_skill1();
            this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(this.node, Math.floor(this.damage * 1.2), true);
        }
        else if (event.data.name == "Move") {
            //升空移动位置
            this.scheduleOnce(function () {
                _this.node.x = _this.skill1_x;
                _this.skeleton.node.scaleX = _this.node.x < GameManager_1.default.instance.player.x ? -_this.scaleX_skeleton : _this.scaleX_skeleton;
            }, 0.05);
        }
    };
    E10controller.prototype.FX_skill1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/FX_E10")];
                    case 1:
                        prefab = _a.sent();
                        fx = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        fx.setSiblingIndex(GameManager_1.default.instance.player.getSiblingIndex() + 1);
                        fx.setPosition(this.node.x, this.node.y - 20);
                        fx.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    //野蛮冲撞开始
    E10controller.prototype.skill2 = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10Roar);
        this.attackTimes = 0;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.rushSpeed : this.rushSpeed;
        this.enemyAnimation.changeState(animationState_1.enemyState.skill2_start, 1, false, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.skill2_start)
                return;
            _this.startRush();
        }, 1.1);
    };
    E10controller.prototype.startRush = function () {
        this.isStartRush = true;
        this.showDamageCollider(damageCollider.skill1);
    };
    E10controller.prototype.endRush = function () {
        this.isStartRush = false;
    };
    E10controller.prototype.skill2Middle = function () {
        this.setRigibodySpeed(this.nowSpeed, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.skill2_middle, 1, true, true);
    };
    E10controller.prototype.skill2End = function () {
        var _this = this;
        this.endRush();
        this.setRigibodySpeed(0, 0);
        this.hideDamageCollider(true);
        this.scheduleOnce(function () {
            if (_this.isDie)
                return;
            _this.enemyAnimation.changeState(animationState_1.enemyState.skill2_end, 1, false, true);
        }, 1);
    };
    E10controller.prototype.skill2EndComplete = function () {
        this.idle(animationState_1.enemyState.skill1);
    };
    E10controller.prototype.skill2Move = function () {
        if (this.isStartRush == false)
            return;
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    //脚步
    E10controller.prototype.footStep = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10Step);
    };
    E10controller.prototype.beHit = function (damage, dmgType) {
        if (this.isDie || this.isWuDi)
            return;
        // let isContinue = this.checkIsSwordRain(dmgType);//设置剑雨攻击间隔
        // if (isContinue == 0) return;
        this.changeState_beHit(dmgType);
        var x = this.node.scaleX < 0 ? this.node.x + this.damageLabelOffsetX : this.node.x - this.damageLabelOffsetX;
        var y = this.node.y + this.damageLabelOffsetY;
        this.highLight();
        Events_1.default.instance.showDamageLabel_enemy(this.node, damage, cc.v2(x, y));
        this.updateHp(damage);
        if (this.hp <= 0) {
            Events_1.default.instance.createEnemyDieEffect(this.node, this.dieEffectName, cc.v2(x, y));
        }
    };
    E10controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        uiManager_1.default.ins.bossHp.addHp(-damage);
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E10controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E10controller.prototype.changeState_beHit = function (dmgType) {
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
    E10controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E10controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E10controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E10controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E10controller.prototype.highLightAction = function () {
        if (this.isHighLight) {
            this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, this.highLight_A.a]);
        }
    };
    E10controller.prototype.highLight = function () {
        var _this = this;
        if (this.isHighLight)
            return;
        this.isHighLight = true;
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        cc.tween(this.highLight_A)
            .to(0.1, { a: 0 })
            .call(function () {
            _this.closeHighLight();
        })
            .start();
    };
    E10controller.prototype.closeHighLight = function () {
        this.isHighLight = false;
        this.highLight_A.a = 0.5;
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E10controller.prototype.getDistanceX = function () {
        return Math.abs(this.node.x - GameManager_1.default.instance.player.x);
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E10controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E10controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.String)
    ], E10controller.prototype, "dieEffectName", void 0);
    E10controller = __decorate([
        ccclass
    ], E10controller);
    return E10controller;
}(enemyBase_1.default));
exports.default = E10controller;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRTEwY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNEM7QUFDNUMsNENBQTJDO0FBQzNDLHFEQUFnRDtBQUNoRCxtREFBMEQ7QUFDMUQsbURBQThDO0FBQzlDLHlDQUFvQztBQUNwQyx1REFBa0Q7QUFDbEQsbUNBQThCO0FBQzlCLDZDQUF3QztBQUN4QyxzQ0FBdUM7QUFDdkMsNENBQXVDO0FBRWpDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLElBQUssY0FJSjtBQUpELFdBQUssY0FBYztJQUNmLHVEQUFNLENBQUE7SUFDTix1REFBTSxDQUFBO0lBQ04sdURBQU0sQ0FBQTtBQUNWLENBQUMsRUFKSSxjQUFjLEtBQWQsY0FBYyxRQUlsQjtBQUVEO0lBQTJDLGlDQUFTO0lBQXBEO1FBQUEscUVBc1lDO1FBbllHLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQix3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFL0IsbUJBQWEsR0FBVyxFQUFFLENBQUM7UUFFM0IsZUFBUyxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsZUFBUyxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsY0FBUSxHQUFXLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDM0IsaUJBQVcsR0FBVyxHQUFHLENBQUMsQ0FBQSxNQUFNO1FBQ2hDLGtCQUFZLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUNqQyxRQUFFLEdBQVcsQ0FBQyxDQUFDO1FBQ2YsYUFBTyxHQUFXLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDMUIsa0JBQVksR0FBVyxLQUFLLENBQUMsQ0FBQSxVQUFVO1FBQ3ZDLGtCQUFZLEdB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RUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQzthQUNELEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDRCxzQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELG9DQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFsWUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7NkRBQ3BCO0lBRS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDOzZEQUNwQjtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNPO0lBUFYsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQXNZakM7SUFBRCxvQkFBQztDQXRZRCxBQXNZQyxDQXRZMEMsbUJBQVMsR0FzWW5EO2tCQXRZb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1ZGlvTmFtZSB9IGZyb20gXCIuLi9hdWRpb05hbWVNZ3JcIjtcbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vbWFpbi9hdWRpb01hbmFnZXJcIjtcbmltcG9ydCB7IGF0dGFja1R5cGUsIGVuZW15U3RhdGUgfSBmcm9tIFwiLi9hbmltYXRpb25TdGF0ZVwiO1xuaW1wb3J0IGVuZW15QW5pbWF0aW9uIGZyb20gXCIuL2VuZW15QW5pbWF0aW9uXCI7XG5pbXBvcnQgZW5lbXlCYXNlIGZyb20gXCIuL2VuZW15QmFzZVwiO1xuaW1wb3J0IGVuZW15SGl0Q29sbGlkZXIgZnJvbSBcIi4vZW5lbXlIaXRDb2xsaWRlclwiO1xuaW1wb3J0IEV2ZW50cyBmcm9tIFwiLi9FdmVudHNcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHsgYm9zc05hbWUgfSBmcm9tIFwiLi91aS9ib3NzSHBcIjtcbmltcG9ydCB1aU1hbmFnZXIgZnJvbSBcIi4vdWkvdWlNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVyIHtcbiAgICBhdHRhY2ssXG4gICAgc2tpbGwxLFxuICAgIHNraWxsMlxufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEUxMGNvbnRyb2xsZXIgZXh0ZW5kcyBlbmVteUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceOi9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRYOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuS8pOWus+aViOaenHnovbTlgY/np7vlgLxcIiB9KVxuICAgIGRhbWFnZUxhYmVsT2Zmc2V0WTogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoY2MuU3RyaW5nKVxuICAgIGRpZUVmZmVjdE5hbWU6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBydXNoU3BlZWQ6IG51bWJlciA9IDcwMDsvL+WGsuWHu+mAn+W6plxuICAgIG1vdmVTcGVlZDogbnVtYmVyID0gMTIwOy8v56e75Yqo6YCf5bqmXG4gICAgbm93U3BlZWQ6IG51bWJlciA9IDA7Ly/lvZPliY3pgJ/luqZcbiAgICBBSV9pbnRlcnZhbDogbnVtYmVyID0gMC41Oy8vYWnpl7TpmpRcbiAgICBzdG9wRGlzdGFuY2U6IG51bWJlciA9IDMwMDsvL+WBnOatoui3neemu1xuICAgIGhwOiBudW1iZXIgPSAwO1xuICAgIGhwVGltZXM6IG51bWJlciA9IDE7Ly/ooYDph4/lgI3mlbBcbiAgICBiZUhpdEZvcmNlX3k6IG51bWJlciA9IDI1MDAwOy8v5omL6YeM5YmR5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94OiBudW1iZXIgPSAyNTAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV95X3NodXJpa2VuOiBudW1iZXIgPSA1MDAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94X2F0dGFjazM6IG51bWJlciA9IDM1MDAwMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9hdHRhY2szOiBudW1iZXIgPSAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgc2NhbGVYX3NrZWxldG9uOiBudW1iZXIgPSAwO1xuICAgIGFsbG93TW92ZVRpbWU6IG51bWJlciA9IDI7Ly/lhYHorrhtb3Zl54q25oCB5pyA6ZW/5pe26Ze0XG4gICAgYWxsb3dBdHRhY2tUaW1lOiBudW1iZXIgPSAyOy8v5YWB6K646L+e57utYXR0YWNr5qyh5pWwXG4gICAgYXR0YWNrVGltZXM6IG51bWJlciA9IDA7Ly9hdHRhY2vov57nu63mrKHmlbBcbiAgICBza2lsbDFfeDogbnVtYmVyID0gMDsvL+azsOWxseWOi+mhtuiQveWcsOWdkOagh++8iOWNh+epuuaXtueOqeWutuS9jee9ru+8iVxuICAgIGlzU3RhcnRSdXNoOiBib29sZWFuID0gZmFsc2U7Ly/lvIDlp4vlhrLmkp5cbiAgICBpc0RpZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNrZWxldG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG4gICAgZW5lbXlBbmltYXRpb246IGVuZW15QW5pbWF0aW9uID0gbnVsbDtcbiAgICByaWdpYm9keTogY2MuUmlnaWRCb2R5ID0gbnVsbDtcbiAgICBib3hDb2xsaWRlcjogY2MuUGh5c2ljc0JveENvbGxpZGVyID0gbnVsbDtcbiAgICBpc1N3b3JkUmFpbkNkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNNb3ZlOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKblpITkuo7np7vliqjnirbmgIFcbiAgICBpc1d1RGk6IGJvb2xlYW4gPSBmYWxzZTsvL+aXoOaVjOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOiBkYW1hZ2VDb2xsaWRlciA9IG51bGw7XG4gICAgaXNIaWdoTGlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBoaWdoTGlnaHRfQSA9IHtcbiAgICAgICAgYTogMC41XG4gICAgfTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbiA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICB0aGlzLnNjYWxlWF9za2VsZXRvbiA9IE1hdGguYWJzKHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVgpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChlbmVteUFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uZW5lbXlDb250cm9sbGVyID0gdGhpcztcbiAgICAgICAgdGhpcy5yaWdpYm9keSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlciA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUGh5c2ljc0JveENvbGxpZGVyKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnNrZWxldG9uLnNrZWxldG9uRGF0YS5fc2tlbGV0b25DYWNoZS5hbmltYXRpb25zKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdWlNYW5hZ2VyLmlucy5zaG93Qm9zc0hwKGJvc3NOYW1lLmVuZW15MTApO1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaHAgPSB0aGlzLmhwTWF4ICogdGhpcy5ocFRpbWVzO1xuICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmhpZ2hMaWdodEFjdGlvbigpO1xuICAgICAgICB0aGlzLnNraWxsMk1vdmUoKTtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2VYKCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlID09IGVuZW15U3RhdGUuYXR0YWNrKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm1vdmVUb1BsYXllcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3Q6IGNjLlBoeXNpY3NDb250YWN0LCBzZWxmQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlciwgb3RoZXJDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlciA9IG90aGVyQ29sbGlkZXIubm9kZTtcbiAgICAgICAgLy8gbGV0IHdvcmxkTWFuaWZvbGQgPSBjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKTtcbiAgICAgICAgLy8gbGV0IG5vcm1hbCA9IHdvcmxkTWFuaWZvbGQubm9ybWFsO1xuICAgICAgICBpZiAob3RoZXIuZ3JvdXAgPT0gXCJ3YWxsXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc2tpbGwyRW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0RhbWFnZUNvbGxpZGVyKGNvbGxpZGVyOiBkYW1hZ2VDb2xsaWRlcikge1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bY29sbGlkZXJdLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5lbmVteUNvbnRyb2wgPSB0aGlzO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bY29sbGlkZXJdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXIgPSBjb2xsaWRlcjtcbiAgICB9XG4gICAgZ2V0RGFtYWdlQ29sbGlkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl07XG4gICAgfVxuICAgIGhpZGVEYW1hZ2VDb2xsaWRlcihpc0NvbXBlbENsb3NlOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuZG1nQ29sbGlkZXIgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5kbWdDb2xsaWRlciA9PSBkYW1hZ2VDb2xsaWRlci5za2lsbDEgJiYgaXNDb21wZWxDbG9zZSA9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXIgPSBudWxsO1xuICAgIH1cbiAgICBBSV9zdGFydCgpIHtcbiAgICAgICAgdGhpcy5hbGxvd0F0dGFja1RpbWUgPSBjYWlqaVRvb2xzLnJhbmRvbV9pbnQoMiwgMyk7XG4gICAgICAgIHRoaXMuYWxsb3dNb3ZlVGltZSA9IGNhaWppVG9vbHMucmFuZG9tX2ludCgyMDAsIDUwMCkgLyAxMDA7XG4gICAgICAgIGlmICh0aGlzLmlzRGllKSByZXR1cm47XG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLmlzRGllKSB7XG4gICAgICAgICAgICAvL+eOqeWutuW3suatuyDlgZzmraLnp7vliqhcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMuZ2V0RGlzdGFuY2VYKCkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUubW92ZSwgMSwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5ub3dTcGVlZCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gLXRoaXMubW92ZVNwZWVkIDogdGhpcy5tb3ZlU3BlZWQ7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGUgIT0gZW5lbXlTdGF0ZS5tb3ZlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5za2lsbDIoKTtcbiAgICAgICAgICAgIH0sIHRoaXMuYWxsb3dNb3ZlVGltZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQUlfc3RvcCgpIHtcbiAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgfVxuICAgIGNoYW5nZU1vdlN0YXRlKGlzTW92ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzTW92ZSA9IGlzTW92ZTtcbiAgICB9XG4gICAgaWRsZShuZXh0U3RhdGU6IGVuZW15U3RhdGUgPSBlbmVteVN0YXRlLmlkbGUpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZygwKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsIDApO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuaWRsZSwgMSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlICE9IGVuZW15U3RhdGUuaWRsZSkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKG5leHRTdGF0ZSA9PSBlbmVteVN0YXRlLmlkbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGwxKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMuQUlfaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBjaGFuZ2VEaXJlY3Rpb24oKSB7XG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggLSB0aGlzLm5vZGUueCA+IDAgPyAtdGhpcy5zY2FsZVhfc2tlbGV0b24gOiB0aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgLy90aGlzLmhwTm9kZS54ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtMjggOiAyODtcbiAgICB9XG4gICAgZGllKCkge1xuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbmRSdXNoKCk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLCAwKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuZGllLCAxLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZGllQ291bnQoKTtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuRTEwX2RlYXRoKTtcbiAgICB9XG4gICAgZ2V0VXAoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5nZXRfdXAsIDEsIGZhbHNlLCB0cnVlKVxuICAgIH1cbiAgICBtb3ZlVG9QbGF5ZXIoKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih0aGlzLm5vd1NwZWVkLCAwKTtcbiAgICB9XG4gICAgaGl0Q29tcGxldGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmF0dGFja1RpbWVzIDwgdGhpcy5hbGxvd0F0dGFja1RpbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldERpc3RhbmNlWCgpIDw9IHRoaXMuc3RvcERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUubW92ZSwgMSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vd1NwZWVkID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtdGhpcy5tb3ZlU3BlZWQgOiB0aGlzLm1vdmVTcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlICE9IGVuZW15U3RhdGUubW92ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNraWxsMigpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMuYWxsb3dNb3ZlVGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNraWxsMigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5hdHRhY2tUaW1lcysrO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsIDApO1xuICAgICAgICB0aGlzLnNob3dEYW1hZ2VDb2xsaWRlcihkYW1hZ2VDb2xsaWRlci5hdHRhY2spO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuYXR0YWNrLCAxLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlID09IGVuZW15U3RhdGUuYXR0YWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYW1hZ2VDb2xsaWRlcigpLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLCB0aGlzLmRhbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEuMSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMTBfYXR0YWNrKTtcbiAgICAgICAgfSwwLjYpO1xuICAgIH1cbiAgICAvL+WGsuaSnuaUu+WHuy1za2lsbFxuICAgIGhpdF9ydXNoKCkge1xuICAgICAgICBpZiAodGhpcy5kbWdDb2xsaWRlciA9PSBkYW1hZ2VDb2xsaWRlci5za2lsbDEpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RGFtYWdlQ29sbGlkZXIoKS5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcikuaGl0KHRoaXMubm9kZSwgdGhpcy5kYW1hZ2UsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8v5rOw5bGx5Y6L6aG25byA5aeLXG4gICAgc2tpbGwxKCkge1xuICAgICAgICB0aGlzLnNraWxsMV94ID0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLng7XG4gICAgICAgIHRoaXMuc2tpbGwxX3ggPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IHRoaXMuc2tpbGwxX3ggKyAyMDAgOiB0aGlzLnNraWxsMV94IC0gMjAwO1xuICAgICAgICB0aGlzLmlzV3VEaSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5za2lsbDEsIDEsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgdGhpcy5zaG93RGFtYWdlQ29sbGlkZXIoZGFtYWdlQ29sbGlkZXIuc2tpbGwyKTtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuRTEwX0p1bXApO1xuICAgIH1cbiAgICBmcmFtZUV2ZW50X3NraWxsMShlLCBldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5uYW1lID09IFwiU3RvcE1vdmVcIikge1xuICAgICAgICAgICAgLy/ms7DlsbHljovpobbokL3lnLBcbiAgICAgICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLlNwZWxsX0VhcnRoXzAyKTtcbiAgICAgICAgICAgIHRoaXMuaXNXdURpID0gZmFsc2U7XG4gICAgICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2NyZWVuU2hha2UoKTtcbiAgICAgICAgICAgIHRoaXMuRlhfc2tpbGwxKCk7XG4gICAgICAgICAgICB0aGlzLmdldERhbWFnZUNvbGxpZGVyKCkuZ2V0Q29tcG9uZW50KGVuZW15SGl0Q29sbGlkZXIpLmhpdCh0aGlzLm5vZGUsIE1hdGguZmxvb3IodGhpcy5kYW1hZ2UgKiAxLjIpLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5kYXRhLm5hbWUgPT0gXCJNb3ZlXCIpIHtcbiAgICAgICAgICAgIC8v5Y2H56m656e75Yqo5L2N572uXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLnNraWxsMV94O1xuICAgICAgICAgICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPSB0aGlzLm5vZGUueCA8IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID8gLXRoaXMuc2NhbGVYX3NrZWxldG9uIDogdGhpcy5zY2FsZVhfc2tlbGV0b247XG4gICAgICAgICAgICB9LCAwLjA1KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBGWF9za2lsbDEoKSB7XG4gICAgICAgIGxldCBwcmVmYWIgPSBhd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWJzL0ZYX0UxMFwiKTtcbiAgICAgICAgbGV0IGZ4ID0gY2FpamlUb29scy5jcmVhdGVOb2RlKHByZWZhYiwgdGhpcy5ub2RlLnBhcmVudCk7XG4gICAgICAgIGZ4LnNldFNpYmxpbmdJbmRleChHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIuZ2V0U2libGluZ0luZGV4KCkgKyAxKTtcbiAgICAgICAgZnguc2V0UG9zaXRpb24odGhpcy5ub2RlLngsIHRoaXMubm9kZS55IC0gMjApO1xuICAgICAgICBmeC5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICAvL+mHjuibruWGsuaSnuW8gOWni1xuICAgIHNraWxsMigpIHtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuRTEwUm9hcik7XG4gICAgICAgIHRoaXMuYXR0YWNrVGltZXMgPSAwO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsIDApO1xuICAgICAgICB0aGlzLm5vd1NwZWVkID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtdGhpcy5ydXNoU3BlZWQgOiB0aGlzLnJ1c2hTcGVlZDtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLnNraWxsMl9zdGFydCwgMSwgZmFsc2UsIHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSAhPSBlbmVteVN0YXRlLnNraWxsMl9zdGFydCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5zdGFydFJ1c2goKTtcbiAgICAgICAgfSwgMS4xKTtcbiAgICB9XG4gICAgc3RhcnRSdXNoKCkge1xuICAgICAgICB0aGlzLmlzU3RhcnRSdXNoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93RGFtYWdlQ29sbGlkZXIoZGFtYWdlQ29sbGlkZXIuc2tpbGwxKTtcbiAgICB9XG4gICAgZW5kUnVzaCgpIHtcbiAgICAgICAgdGhpcy5pc1N0YXJ0UnVzaCA9IGZhbHNlO1xuICAgIH1cbiAgICBza2lsbDJNaWRkbGUoKSB7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCh0aGlzLm5vd1NwZWVkLCAwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLnNraWxsMl9taWRkbGUsIDEsIHRydWUsIHRydWUpO1xuICAgIH1cbiAgICBza2lsbDJFbmQoKSB7XG4gICAgICAgIHRoaXMuZW5kUnVzaCgpO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwgMCk7XG4gICAgICAgIHRoaXMuaGlkZURhbWFnZUNvbGxpZGVyKHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0RpZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLnNraWxsMl9lbmQsIDEsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSwgMSk7XG4gICAgfVxuICAgIHNraWxsMkVuZENvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLmlkbGUoZW5lbXlTdGF0ZS5za2lsbDEpO1xuICAgIH1cbiAgICBza2lsbDJNb3ZlKCkge1xuICAgICAgICBpZiAodGhpcy5pc1N0YXJ0UnVzaCA9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIodGhpcy5ub3dTcGVlZCwgMCk7XG4gICAgfVxuICAgIC8v6ISa5q2lXG4gICAgZm9vdFN0ZXAoKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUxMFN0ZXApO1xuICAgIH1cbiAgICBiZUhpdChkYW1hZ2U6IG51bWJlciwgZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZiAodGhpcy5pc0RpZSB8fCB0aGlzLmlzV3VEaSkgcmV0dXJuO1xuICAgICAgICAvLyBsZXQgaXNDb250aW51ZSA9IHRoaXMuY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlKTsvL+iuvue9ruWJkembqOaUu+WHu+mXtOmalFxuICAgICAgICAvLyBpZiAoaXNDb250aW51ZSA9PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGVfYmVIaXQoZG1nVHlwZSk7XG4gICAgICAgIGxldCB4ID0gdGhpcy5ub2RlLnNjYWxlWCA8IDAgPyB0aGlzLm5vZGUueCArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYIDogdGhpcy5ub2RlLnggLSB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLm5vZGUueSArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRZO1xuICAgICAgICB0aGlzLmhpZ2hMaWdodCgpO1xuICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2hvd0RhbWFnZUxhYmVsX2VuZW15KHRoaXMubm9kZSwgZGFtYWdlLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIHRoaXMudXBkYXRlSHAoZGFtYWdlKTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgRXZlbnRzLmluc3RhbmNlLmNyZWF0ZUVuZW15RGllRWZmZWN0KHRoaXMubm9kZSwgdGhpcy5kaWVFZmZlY3ROYW1lLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlSHAoZGFtYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ocCAtPSBkYW1hZ2U7XG4gICAgICAgIHVpTWFuYWdlci5pbnMuYm9zc0hwLmFkZEhwKC1kYW1hZ2UpO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcbiAgICAgICAgICAgIHRoaXMuZGllKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0UmlnaWJvZHlTcGVlZCh4OiBudW1iZXIsIHk6IG51bWJlciA9IDApIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHgsIHkpO1xuICAgIH1cbiAgICBjaGFuZ2VTdGF0ZV9iZUhpdChkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3VwZXJBcm1vcikgcmV0dXJuO1xuICAgICAgICBsZXQgc3RhdGUgPSBudWxsO1xuICAgICAgICBsZXQgaXNLbm9ja0Rvd24gPSBkbWdUeXBlID09IGF0dGFja1R5cGUuYXR0YWNrMyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgc3dpdGNoIChkbWdUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMTpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQyO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2syOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazM6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDUpO1xuICAgICAgICAgICAgICAgIH0sIDAuNCk7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmtub2NrX2Rvd247XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS54IDwgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggJiYgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5za2VsZXRvbi5ub2RlLnNjYWxlWCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKC10aGlzLmJlSGl0Rm9yY2VfeF9hdHRhY2szLCB0aGlzLmJlSGl0Rm9yY2VfeV9hdHRhY2szKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5vZGUueCA+IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICYmIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52Mih0aGlzLmJlSGl0Rm9yY2VfeF9hdHRhY2szLCB0aGlzLmJlSGl0Rm9yY2VfeV9hdHRhY2szKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmp1bXBIaXQ6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuc2h1cmlrZW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlSGl0Rm9yY2VfeV9zaHVyaWtlbikpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLnN3b3JkUmFpbjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKHN0YXRlLCAxLCBmYWxzZSwgaXNLbm9ja0Rvd24pO1xuICAgIH1cbiAgICBzZXRMaW5lYXJEYW1waW5nKGRhbXBpbmc6IG51bWJlcikge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhckRhbXBpbmcgPSBkYW1waW5nO1xuICAgIH1cbiAgICBzZXRGcmljdGlvbihmcmljdGlvbjogbnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmZyaWN0aW9uID0gZnJpY3Rpb247XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIuYXBwbHkoKTtcbiAgICB9XG4gICAgYXBwbHlGb3JjZShmb3JjZTogY2MuVmVjMikge1xuICAgICAgICBpZiAodGhpcy5pc1N1cGVyQXJtb3IpIHJldHVybjtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5hcHBseUZvcmNlVG9DZW50ZXIoZm9yY2UsIHRydWUpO1xuICAgIH1cbiAgICBjaGVja0lzU3dvcmRSYWluKGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYgKGRtZ1R5cGUgPT0gYXR0YWNrVHlwZS5zd29yZFJhaW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3dvcmRSYWluQ2QpIHJldHVybiAwO1xuICAgICAgICAgICAgdGhpcy5pc1N3b3JkUmFpbkNkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3dvcmRSYWluQ2QgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRoaXMuc3dvcmRSYWluSGl0Q2QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICBoaWdoTGlnaHRBY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzSGlnaExpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiaGlnaExpZ2h0Q29sb3JcIiwgWzEuMCwgMS4wLCAxLjAsIHRoaXMuaGlnaExpZ2h0X0EuYV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhpZ2hMaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaWdoTGlnaHQpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc0hpZ2hMaWdodCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJiZUhpdFwiLCAxKTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImhpZ2hMaWdodENvbG9yXCIsIFsxLjAsIDEuMCwgMS4wLCAwLjVdKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5oaWdoTGlnaHRfQSlcbiAgICAgICAgICAgIC50bygwLjEsIHsgYTogMCB9KVxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VIaWdoTGlnaHQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3RhcnQoKTtcbiAgICB9XG4gICAgY2xvc2VIaWdoTGlnaHQoKSB7XG4gICAgICAgIHRoaXMuaXNIaWdoTGlnaHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHRfQS5hID0gMC41O1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMCk7XG4gICAgfVxuICAgIGdldERpc3RhbmNlWCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubm9kZS54IC0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLngpO1xuICAgIH1cbn1cbiJdfQ==