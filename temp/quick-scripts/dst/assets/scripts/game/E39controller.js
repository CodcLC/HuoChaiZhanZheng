
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/E39controller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '07446vuLudCTZ1bGrDVe7v7', 'E39controller');
// scripts/game/E39controller.ts

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
var E39Laser_1 = require("./E39Laser");
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
    damageCollider[damageCollider["laser"] = 0] = "laser";
    damageCollider[damageCollider["forward"] = 1] = "forward";
    damageCollider[damageCollider["scratch"] = 2] = "scratch";
})(damageCollider || (damageCollider = {}));
var E39controller = /** @class */ (function (_super) {
    __extends(E39controller, _super);
    function E39controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.dieEffectName = "";
        _this.rushSpeed = 700; //冲击速度
        _this.moveSpeed = 140; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.5; //ai间隔
        _this.stopDistance = 230; //停止距离
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
        _this.isWuDi = true; //无敌状态
        _this.dmgCollider = null;
        _this.isHighLight = false;
        _this.highLight_A = {
            a: 0.5
        };
        _this.nomalAttackMax = 5; //普通攻击连续最大次数
        _this.normalAttackTimes = 0; //普通攻击次数（达一定次数后升空放小蜘蛛）
        _this.lastAttackState = null;
        _this.spiderlingPrefab = null;
        return _this;
    }
    E39controller.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E39controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E39controller.prototype.init = function () {
        var _this = this;
        uiManager_1.default.ins.showBossHp(bossHp_1.bossName.enemy39);
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        //this.idle();
        this.scheduleOnce(function () {
            _this.FX_landing();
        }, 2.4);
    };
    E39controller.prototype.update = function () {
        this.highLightAction();
        if (this.isMove == false)
            return;
        var distance = this.getDistanceX();
        if (Math.abs(distance) < this.stopDistance) {
            this.attack();
        }
        else {
            if (this.enemyAnimation.state == animationState_1.enemyState.attack)
                return;
            this.moveToPlayer();
        }
    };
    E39controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "wall") {
        }
    };
    E39controller.prototype.showDamageCollider = function (collider) {
        if (collider != damageCollider.laser) {
            this.skeleton.node.children[collider].getComponent(enemyHitCollider_1.default).enemyControl = this;
        }
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E39controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E39controller.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E39controller.prototype.AI_start = function () {
        var _this = this;
        this.stopDistance = caijiTools_1.caijiTools.random_int(150, 400);
        if (this.isDie)
            return;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.changeMovState(false);
            this.scheduleOnce(function () {
                _this.AI_start();
            }, 1);
            if ([animationState_1.enemyState.Idle, animationState_1.enemyState.Idle2, animationState_1.enemyState.Idle3].includes(this.enemyAnimation.state))
                return;
            this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true, true);
            return;
        }
        var distance = Math.abs(this.getDistanceX());
        if (distance < this.stopDistance) {
            this.attack();
        }
        else {
            this.changeDirection();
            this.enemyAnimation.changeState(animationState_1.enemyState.Move, 1, true, true, true);
            this.changeMovState(true);
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
        }
    };
    E39controller.prototype.AI_stop = function () {
        this.idle();
    };
    E39controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E39controller.prototype.idle = function () {
        this.changeMovState(false);
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        var random = caijiTools_1.caijiTools.random_int(1, 3);
        switch (random) {
            case 1:
                this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true, true);
                break;
            case 2:
                this.enemyAnimation.changeState(animationState_1.enemyState.Idle2, 1, true, true);
                break;
            case 3:
                this.enemyAnimation.changeState(animationState_1.enemyState.Idle3, 1, true, true);
                break;
        }
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Above2);
    };
    E39controller.prototype.attack = function () {
        this.changeDirection();
        this.setRigibodySpeed(0, 0);
        this.changeMovState(false);
        this.setLinearDamping(0);
        if (this.normalAttackTimes == this.nomalAttackMax) {
            this.initAttackTimes();
            this.above1();
        }
        else {
            this.normalAttackTimes++;
            var distnace = this.getDistanceX();
            var attackState = [
                animationState_1.enemyState.Jump_FWD,
                animationState_1.enemyState.Jump_Back,
                animationState_1.enemyState.Scratch
            ];
            if (this.lastAttackState != null) {
                attackState.splice(attackState.indexOf(this.lastAttackState), 1);
            }
            var random = caijiTools_1.caijiTools.random_int(0, attackState.length - 1);
            var state = attackState[random];
            if (distnace > 300) {
                //跃击
                state = animationState_1.enemyState.Jump_FWD;
            }
            switch (state) {
                case animationState_1.enemyState.Jump_FWD:
                    this.Jump_FWD();
                    break;
                case animationState_1.enemyState.Jump_Back:
                    this.Jump_Back();
                    break;
                case animationState_1.enemyState.Scratch:
                    this.Scratch();
                    break;
            }
            this.lastAttackState = state;
        }
    };
    E39controller.prototype.initAttackTimes = function () {
        this.normalAttackTimes = 0;
        this.nomalAttackMax = caijiTools_1.caijiTools.random_int(4, 6);
    };
    //攻击结束
    E39controller.prototype.attackComplete = function () {
        var random = caijiTools_1.caijiTools.random_int(1, 100);
        if (random < 30) {
            this.idle();
        }
        else {
            this.AI_start();
        }
    };
    E39controller.prototype.bornComplete = function () {
        this.closeWuDi();
        this.AI_start();
    };
    //开始生成小蜘蛛
    E39controller.prototype.above1Complete = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Above2);
        this.schedule(this.createSpiderling, 0.5, 6);
        this.scheduleOnce(function () {
            _this.above2();
        }, 4);
    };
    E39controller.prototype.createSpiderling = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, spiderling, x;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.spiderlingPrefab == null)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/enemys/spiderling")];
                    case 1:
                        _a.spiderlingPrefab = _b.sent();
                        _b.label = 2;
                    case 2:
                        spiderling = caijiTools_1.caijiTools.createNode(this.spiderlingPrefab, this.node.parent);
                        x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width * 0.6, cc.winSize.width * 0.6);
                        spiderling.setPosition(x, -182);
                        spiderling.setSiblingIndex(this.node.getSiblingIndex());
                        spiderling.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    //着落完成
    E39controller.prototype.above2Complete = function () {
        this.closeWuDi();
        this.AI_start();
    };
    E39controller.prototype.idleComplete = function () {
        if (GameManager_1.default.instance.playerController.isDie)
            return;
        this.AI_start();
    };
    E39controller.prototype.changeDirection = function () {
        if (GameManager_1.default.instance.player == null)
            return;
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E39controller.prototype.die = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39_death);
        this.isDie = true;
        this.setRigibodySpeed(0, 0);
        this.changeMovState(false);
        this.unscheduleAllCallbacks();
        this.enemyAnimation.changeState(animationState_1.enemyState.Die, 1, false, true);
        this.dieCount();
    };
    E39controller.prototype.move = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Move, 1, true, true);
    };
    E39controller.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E39controller.prototype.openWuDi = function () {
        this.isWuDi = true;
    };
    E39controller.prototype.closeWuDi = function () {
        this.isWuDi = false;
    };
    //升空
    E39controller.prototype.above1 = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Above1);
        this.openWuDi();
        this.enemyAnimation.changeState(animationState_1.enemyState.Above1, 1, false, true);
    };
    //降落
    E39controller.prototype.above2 = function () {
        var _this = this;
        this.node.x = GameManager_1.default.instance.player.x;
        this.enemyAnimation.changeState(animationState_1.enemyState.Above2, 1, false, true);
        this.scheduleOnce(function () {
            _this.FX_landing();
        }, 2.4);
    };
    //后跳激光攻击
    E39controller.prototype.Jump_Back = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Jump);
        this.enemyAnimation.changeState(animationState_1.enemyState.Jump_Back, 1, false);
        this.scheduleOnce(function () {
            var offsetX = _this.skeleton.node.scaleX > 0 ? 150 : -150;
            cc.tween(_this.node)
                .by(0.3, { x: offsetX })
                .call(function () {
                _this.scheduleOnce(function () {
                    if (_this.enemyAnimation.state != animationState_1.enemyState.Jump_Back)
                        return;
                    audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Laser);
                    _this.showDamageCollider(damageCollider.laser);
                }, 0.5);
            })
                .start();
        }, 0.5);
    };
    //前跃攻击
    E39controller.prototype.Jump_FWD = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Jump);
        this.enemyAnimation.changeState(animationState_1.enemyState.Jump_FWD, 1, false);
        this.showDamageCollider(damageCollider.forward);
        this.scheduleOnce(function () {
            var offsetX = _this.skeleton.node.scaleX > 0 ? -150 : 150;
            cc.tween(_this.node)
                .by(0.3, { x: offsetX })
                .call(function () {
                _this.scheduleOnce(function () {
                    if (_this.enemyAnimation.state != animationState_1.enemyState.Jump_FWD)
                        return;
                    audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Attack);
                    _this.hit(_this.damage);
                }, 0.25);
            })
                .start();
        }, 0.5);
    };
    //腿击
    E39controller.prototype.Scratch = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Scratch);
        this.enemyAnimation.changeState(animationState_1.enemyState.Scratch, 1, false);
        this.showDamageCollider(damageCollider.scratch);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.Scratch)
                return;
            _this.hit(_this.damage);
        }, 0.6);
    };
    //虚弱
    E39controller.prototype.Staggered = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Staggered, 1, false);
    };
    //虚弱结束
    E39controller.prototype.StaggeredReset = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.StaggeredReset, 1, false);
    };
    E39controller.prototype.FX_landing = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audioManager_1.default.playAudio(audioNameMgr_1.audioName.Spell_Earth_02);
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/landingFX_enemy39")];
                    case 1:
                        prefab = _a.sent();
                        fx = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        fx.setSiblingIndex(this.node.getSiblingIndex() + 1);
                        fx.setPosition(this.node.x, this.node.y);
                        fx.active = true;
                        this.scheduleOnce(function () {
                            fx.destroy();
                        }, 2);
                        Events_1.default.instance.screenShake();
                        return [2 /*return*/];
                }
            });
        });
    };
    //脚步
    E39controller.prototype.footStep = function (e, event) {
        //if(event.time>0)
        //audioManager.playAudio(audioName.E39Step,false,0.6);
    };
    E39controller.prototype.beHit = function (damage, dmgType) {
        if (this.isDie || this.isWuDi)
            return;
        // let isContinue = this.checkIsSwordRain(dmgType);//设置剑雨攻击间隔
        // if (isContinue == 0) return;
        this.changeState_beHit(dmgType);
        var x = this.skeleton.node.scaleX > 0 ? this.node.x + this.damageLabelOffsetX : this.node.x - this.damageLabelOffsetX;
        var y = this.node.y + this.damageLabelOffsetY;
        this.highLight();
        Events_1.default.instance.showDamageLabel_enemy(this.node, damage, cc.v2(x, y));
        this.updateHp(damage);
        if (this.hp <= 0) {
            Events_1.default.instance.createEnemyDieEffect(this.node, this.dieEffectName, cc.v2(x, y));
        }
    };
    E39controller.prototype.hit = function (damage) {
        if (this.dmgCollider != damageCollider.laser) {
            this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(this.node, damage);
        }
    };
    E39controller.prototype.laserHit = function () {
        if (this.dmgCollider != damageCollider.laser)
            return;
        this.getDamageCollider().getComponent(E39Laser_1.default).laserCollider.getComponent(enemyHitCollider_1.default).hit(this.node, this.damage);
        this.hideDamageCollider();
    };
    E39controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        uiManager_1.default.ins.bossHp.addHp(-damage);
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E39controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E39controller.prototype.changeState_beHit = function (dmgType) {
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
    E39controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E39controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E39controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E39controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E39controller.prototype.highLightAction = function () {
        if (this.isHighLight) {
            this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, this.highLight_A.a]);
        }
    };
    E39controller.prototype.highLight = function () {
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
    E39controller.prototype.closeHighLight = function () {
        this.isHighLight = false;
        this.highLight_A.a = 0.5;
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E39controller.prototype.getDistanceX = function () {
        return Math.abs(this.node.x - GameManager_1.default.instance.player.x);
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E39controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E39controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.String)
    ], E39controller.prototype, "dieEffectName", void 0);
    E39controller = __decorate([
        ccclass
    ], E39controller);
    return E39controller;
}(enemyBase_1.default));
exports.default = E39controller;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRTM5Y29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNEM7QUFDNUMsNENBQTJDO0FBQzNDLHFEQUFnRDtBQUNoRCxtREFBcUU7QUFDckUsdUNBQWtDO0FBQ2xDLG1EQUE4QztBQUM5Qyx5Q0FBb0M7QUFDcEMsdURBQWtEO0FBQ2xELG1DQUE4QjtBQUM5Qiw2Q0FBd0M7QUFDeEMsc0NBQXVDO0FBQ3ZDLDRDQUF1QztBQUVqQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QyxJQUFLLGNBSUo7QUFKRCxXQUFLLGNBQWM7SUFDZixxREFBSyxDQUFBO0lBQ0wseURBQU8sQ0FBQTtJQUNQLHlEQUFPLENBQUE7QUFDWCxDQUFDLEVBSkksY0FBYyxLQUFkLGNBQWMsUUFJbEI7QUFFRDtJQUEyQyxpQ0FBUztJQUFwRDtRQUFBLHFFQWdkQztRQTdjRyx3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFL0Isd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLG1CQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGVBQVMsR0FBVyxHQUFHLENBQUMsQ0FBQSxNQUFNO1FBQzlCLGVBQVMsR0FBVyxHQUFHLENBQUMsQ0FBQSxNQUFNO1FBQzlCLGNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzNCLGlCQUFXLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUNoQyxrQkFBWSxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDakMsUUFBRSxHQUFXLENBQUMsQ0FBQztRQUNmLGFBQU8sR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzFCLGtCQUFZLEdBQVcsS0FBSyxDQUFDLENBQUEsVUFBVTtR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S0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNELHNDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0Qsb0NBQVksR0FBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQTVjRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQzs2REFDcEI7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7NkRBQ3BCO0lBRS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ087SUFQVixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBZ2RqQztJQUFELG9CQUFDO0NBaGRELEFBZ2RDLENBaGQwQyxtQkFBUyxHQWdkbkQ7a0JBaGRvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZW5lbXlOYW1lLCBlbmVteVN0YXRlIH0gZnJvbSBcIi4vYW5pbWF0aW9uU3RhdGVcIjtcbmltcG9ydCBFMzlMYXNlciBmcm9tIFwiLi9FMzlMYXNlclwiO1xuaW1wb3J0IGVuZW15QW5pbWF0aW9uIGZyb20gXCIuL2VuZW15QW5pbWF0aW9uXCI7XG5pbXBvcnQgZW5lbXlCYXNlIGZyb20gXCIuL2VuZW15QmFzZVwiO1xuaW1wb3J0IGVuZW15SGl0Q29sbGlkZXIgZnJvbSBcIi4vZW5lbXlIaXRDb2xsaWRlclwiO1xuaW1wb3J0IEV2ZW50cyBmcm9tIFwiLi9FdmVudHNcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHsgYm9zc05hbWUgfSBmcm9tIFwiLi91aS9ib3NzSHBcIjtcbmltcG9ydCB1aU1hbmFnZXIgZnJvbSBcIi4vdWkvdWlNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVyIHtcbiAgICBsYXNlcixcbiAgICBmb3J3YXJkLFxuICAgIHNjcmF0Y2hcbn1cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFMzljb250cm9sbGVyIGV4dGVuZHMgZW5lbXlCYXNlIHtcblxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuS8pOWus+aViOaenHjovbTlgY/np7vlgLxcIiB9KVxuICAgIGRhbWFnZUxhYmVsT2Zmc2V0WDogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLkvKTlrrPmlYjmnpx56L205YGP56e75YC8XCIgfSlcbiAgICBkYW1hZ2VMYWJlbE9mZnNldFk6IG51bWJlciA9IDA7XG4gICAgQHByb3BlcnR5KGNjLlN0cmluZylcbiAgICBkaWVFZmZlY3ROYW1lOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgcnVzaFNwZWVkOiBudW1iZXIgPSA3MDA7Ly/lhrLlh7vpgJ/luqZcbiAgICBtb3ZlU3BlZWQ6IG51bWJlciA9IDE0MDsvL+enu+WKqOmAn+W6plxuICAgIG5vd1NwZWVkOiBudW1iZXIgPSAwOy8v5b2T5YmN6YCf5bqmXG4gICAgQUlfaW50ZXJ2YWw6IG51bWJlciA9IDAuNTsvL2Fp6Ze06ZqUXG4gICAgc3RvcERpc3RhbmNlOiBudW1iZXIgPSAyMzA7Ly/lgZzmraLot53nprtcbiAgICBocDogbnVtYmVyID0gMDtcbiAgICBocFRpbWVzOiBudW1iZXIgPSAxOy8v6KGA6YeP5YCN5pWwXG4gICAgYmVIaXRGb3JjZV95OiBudW1iZXIgPSAyNTAwMDsvL+aJi+mHjOWJkeaUu+WHu+S9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeDogbnVtYmVyID0gMjUwMDAvL+aZrumAmuaUu+WHu+S9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9zaHVyaWtlbjogbnVtYmVyID0gNTAwMDAvL+aZrumAmuaUu+WHu+S9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeF9hdHRhY2szOiBudW1iZXIgPSAzNTAwMDA7Ly/ooqvlh7vpo57kvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3lfYXR0YWNrMzogbnVtYmVyID0gMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIHNjYWxlWF9za2VsZXRvbjogbnVtYmVyID0gMDtcbiAgICBhbGxvd01vdmVUaW1lOiBudW1iZXIgPSAyOy8v5YWB6K64bW92ZeeKtuaAgeacgOmVv+aXtumXtFxuICAgIGFsbG93QXR0YWNrVGltZTogbnVtYmVyID0gMjsvL+WFgeiuuOi/nue7rWF0dGFja+asoeaVsFxuICAgIGF0dGFja1RpbWVzOiBudW1iZXIgPSAwOy8vYXR0YWNr6L+e57ut5qyh5pWwXG4gICAgc2tpbGwxX3g6IG51bWJlciA9IDA7Ly/ms7DlsbHljovpobbokL3lnLDlnZDmoIfvvIjljYfnqbrml7bnjqnlrrbkvY3nva7vvIlcbiAgICBpc1N0YXJ0UnVzaDogYm9vbGVhbiA9IGZhbHNlOy8v5byA5aeL5Yay5pKeXG4gICAgaXNEaWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBza2VsZXRvbjogc3AuU2tlbGV0b24gPSBudWxsO1xuICAgIGVuZW15QW5pbWF0aW9uOiBlbmVteUFuaW1hdGlvbiA9IG51bGw7XG4gICAgcmlnaWJvZHk6IGNjLlJpZ2lkQm9keSA9IG51bGw7XG4gICAgYm94Q29sbGlkZXI6IGNjLlBoeXNpY3NCb3hDb2xsaWRlciA9IG51bGw7XG4gICAgaXNTd29yZFJhaW5DZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTW92ZTogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5aSE5LqO56e75Yqo54q25oCBXG4gICAgaXNXdURpOiBib29sZWFuID0gdHJ1ZTsvL+aXoOaVjOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOiBkYW1hZ2VDb2xsaWRlciA9IG51bGw7XG4gICAgaXNIaWdoTGlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBoaWdoTGlnaHRfQSA9IHtcbiAgICAgICAgYTogMC41XG4gICAgfTtcbiAgICBub21hbEF0dGFja01heDogbnVtYmVyID0gNTsvL+aZrumAmuaUu+WHu+i/nue7reacgOWkp+asoeaVsFxuICAgIG5vcm1hbEF0dGFja1RpbWVzOiBudW1iZXIgPSAwOy8v5pmu6YCa5pS75Ye75qyh5pWw77yI6L6+5LiA5a6a5qyh5pWw5ZCO5Y2H56m65pS+5bCP6JyY6Jub77yJXG4gICAgbGFzdEF0dGFja1N0YXRlOiBlbmVteVN0YXRlID0gbnVsbDtcbiAgICBzcGlkZXJsaW5nUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIHRoaXMuc2NhbGVYX3NrZWxldG9uID0gTWF0aC5hYnModGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGVuZW15QW5pbWF0aW9uKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5lbmVteUNvbnRyb2xsZXIgPSB0aGlzO1xuICAgICAgICB0aGlzLnJpZ2lib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5QaHlzaWNzQm94Q29sbGlkZXIpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc2tlbGV0b24uc2tlbGV0b25EYXRhLl9za2VsZXRvbkNhY2hlLmFuaW1hdGlvbnMpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB1aU1hbmFnZXIuaW5zLnNob3dCb3NzSHAoYm9zc05hbWUuZW5lbXkzOSk7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5ocCA9IHRoaXMuaHBNYXggKiB0aGlzLmhwVGltZXM7XG4gICAgICAgIC8vdGhpcy5pZGxlKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuRlhfbGFuZGluZygpO1xuICAgICAgICB9LCAyLjQpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuaGlnaExpZ2h0QWN0aW9uKCk7XG4gICAgICAgIGlmICh0aGlzLmlzTW92ZSA9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICBsZXQgZGlzdGFuY2UgPSB0aGlzLmdldERpc3RhbmNlWCgpO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpIDwgdGhpcy5zdG9wRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSA9PSBlbmVteVN0YXRlLmF0dGFjaykgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG9QbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0OiBjYy5QaHlzaWNzQ29udGFjdCwgc2VsZkNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIsIG90aGVyQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlcikge1xuICAgICAgICBsZXQgb3RoZXIgPSBvdGhlckNvbGxpZGVyLm5vZGU7XG4gICAgICAgIC8vIGxldCB3b3JsZE1hbmlmb2xkID0gY29udGFjdC5nZXRXb3JsZE1hbmlmb2xkKCk7XG4gICAgICAgIC8vIGxldCBub3JtYWwgPSB3b3JsZE1hbmlmb2xkLm5vcm1hbDtcbiAgICAgICAgaWYgKG90aGVyLmdyb3VwID09IFwid2FsbFwiKSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0RhbWFnZUNvbGxpZGVyKGNvbGxpZGVyOiBkYW1hZ2VDb2xsaWRlcikge1xuICAgICAgICBpZiAoY29sbGlkZXIgIT0gZGFtYWdlQ29sbGlkZXIubGFzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlbltjb2xsaWRlcl0uZ2V0Q29tcG9uZW50KGVuZW15SGl0Q29sbGlkZXIpLmVuZW15Q29udHJvbCA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW2NvbGxpZGVyXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyID0gY29sbGlkZXI7XG4gICAgfVxuICAgIGdldERhbWFnZUNvbGxpZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdO1xuICAgIH1cbiAgICBoaWRlRGFtYWdlQ29sbGlkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRtZ0NvbGxpZGVyID09IG51bGwpIHJldHVybjtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyID0gbnVsbDtcbiAgICB9XG4gICAgQUlfc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcERpc3RhbmNlID0gY2FpamlUb29scy5yYW5kb21faW50KDE1MCwgNDAwKTtcbiAgICAgICAgaWYgKHRoaXMuaXNEaWUpIHJldHVybjtcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuaXNEaWUpIHtcbiAgICAgICAgICAgIC8v546p5a625bey5q27IOWBnOatouenu+WKqFxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICBpZiAoW2VuZW15U3RhdGUuSWRsZSwgZW5lbXlTdGF0ZS5JZGxlMiwgZW5lbXlTdGF0ZS5JZGxlM10uaW5jbHVkZXModGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSkpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5JZGxlLCAxLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLmFicyh0aGlzLmdldERpc3RhbmNlWCgpKTtcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy5zdG9wRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLk1vdmUsIDEsIHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZSh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMubm93U3BlZWQgPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IC10aGlzLm1vdmVTcGVlZCA6IHRoaXMubW92ZVNwZWVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIEFJX3N0b3AoKSB7XG4gICAgICAgIHRoaXMuaWRsZSgpO1xuICAgIH1cbiAgICBjaGFuZ2VNb3ZTdGF0ZShpc01vdmU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc01vdmUgPSBpc01vdmU7XG4gICAgfVxuICAgIGlkbGUoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLCAwKTtcbiAgICAgICAgbGV0IHJhbmRvbSA9IGNhaWppVG9vbHMucmFuZG9tX2ludCgxLCAzKTtcbiAgICAgICAgc3dpdGNoIChyYW5kb20pIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuSWRsZSwgMSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLklkbGUyLCAxLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuSWRsZTMsIDEsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUzOUFib3ZlMik7XG4gICAgfVxuICAgIGF0dGFjaygpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsIDApO1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDApO1xuICAgICAgICBpZiAodGhpcy5ub3JtYWxBdHRhY2tUaW1lcyA9PSB0aGlzLm5vbWFsQXR0YWNrTWF4KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRBdHRhY2tUaW1lcygpO1xuICAgICAgICAgICAgdGhpcy5hYm92ZTEoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9ybWFsQXR0YWNrVGltZXMrKztcbiAgICAgICAgICAgIGxldCBkaXN0bmFjZSA9IHRoaXMuZ2V0RGlzdGFuY2VYKCk7XG4gICAgICAgICAgICBsZXQgYXR0YWNrU3RhdGU6IEFycmF5PGVuZW15U3RhdGU+ID0gW1xuICAgICAgICAgICAgICAgIGVuZW15U3RhdGUuSnVtcF9GV0QsXG4gICAgICAgICAgICAgICAgZW5lbXlTdGF0ZS5KdW1wX0JhY2ssXG4gICAgICAgICAgICAgICAgZW5lbXlTdGF0ZS5TY3JhdGNoXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKHRoaXMubGFzdEF0dGFja1N0YXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2tTdGF0ZS5zcGxpY2UoYXR0YWNrU3RhdGUuaW5kZXhPZih0aGlzLmxhc3RBdHRhY2tTdGF0ZSksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJhbmRvbSA9IGNhaWppVG9vbHMucmFuZG9tX2ludCgwLCBhdHRhY2tTdGF0ZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IGF0dGFja1N0YXRlW3JhbmRvbV07XG4gICAgICAgICAgICBpZiAoZGlzdG5hY2UgPiAzMDApIHtcbiAgICAgICAgICAgICAgICAvL+i3g+WHu1xuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5KdW1wX0ZXRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuSnVtcF9GV0Q6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSnVtcF9GV0QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLkp1bXBfQmFjazpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5KdW1wX0JhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLlNjcmF0Y2g6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2NyYXRjaCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGFzdEF0dGFja1N0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdEF0dGFja1RpbWVzKCkge1xuICAgICAgICB0aGlzLm5vcm1hbEF0dGFja1RpbWVzID0gMDtcbiAgICAgICAgdGhpcy5ub21hbEF0dGFja01heCA9IGNhaWppVG9vbHMucmFuZG9tX2ludCg0LCA2KTtcbiAgICB9XG4gICAgLy/mlLvlh7vnu5PmnZ9cbiAgICBhdHRhY2tDb21wbGV0ZSgpIHtcbiAgICAgICAgbGV0IHJhbmRvbSA9IGNhaWppVG9vbHMucmFuZG9tX2ludCgxLCAxMDApO1xuICAgICAgICBpZiAocmFuZG9tIDwgMzApIHtcbiAgICAgICAgICAgIHRoaXMuaWRsZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJvcm5Db21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5jbG9zZVd1RGkoKTtcbiAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgIH1cbiAgICAvL+W8gOWni+eUn+aIkOWwj+icmOibm1xuICAgIGFib3ZlMUNvbXBsZXRlKCkge1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMzlBYm92ZTIpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKHRoaXMuY3JlYXRlU3BpZGVybGluZywgMC41LCA2KTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hYm92ZTIoKTtcbiAgICAgICAgfSwgNCk7XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZVNwaWRlcmxpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLnNwaWRlcmxpbmdQcmVmYWIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zcGlkZXJsaW5nUHJlZmFiID0gYXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy9lbmVteXMvc3BpZGVybGluZ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3BpZGVybGluZyA9IGNhaWppVG9vbHMuY3JlYXRlTm9kZSh0aGlzLnNwaWRlcmxpbmdQcmVmYWIsIHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICBsZXQgeCA9IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICsgY2FpamlUb29scy5yYW5kb21faW50KC1jYy53aW5TaXplLndpZHRoICogMC42LCBjYy53aW5TaXplLndpZHRoICogMC42KVxuICAgICAgICBzcGlkZXJsaW5nLnNldFBvc2l0aW9uKHgsIC0xODIpO1xuICAgICAgICBzcGlkZXJsaW5nLnNldFNpYmxpbmdJbmRleCh0aGlzLm5vZGUuZ2V0U2libGluZ0luZGV4KCkpO1xuICAgICAgICBzcGlkZXJsaW5nLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIC8v552A6JC95a6M5oiQXG4gICAgYWJvdmUyQ29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMuY2xvc2VXdURpKCk7XG4gICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICB9XG4gICAgaWRsZUNvbXBsZXRlKCkge1xuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5pc0RpZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgfVxuICAgIGNoYW5nZURpcmVjdGlvbigpIHtcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllciA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAtIHRoaXMubm9kZS54ID4gMCA/IC10aGlzLnNjYWxlWF9za2VsZXRvbiA6IHRoaXMuc2NhbGVYX3NrZWxldG9uO1xuICAgICAgICAvL3RoaXMuaHBOb2RlLnggPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IC0yOCA6IDI4O1xuICAgIH1cbiAgICBkaWUoKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUzOV9kZWF0aCk7XG4gICAgICAgIHRoaXMuaXNEaWUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwgMCk7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkRpZSwgMSwgZmFsc2UsIHRydWUpO1xuICAgICAgICB0aGlzLmRpZUNvdW50KCk7XG4gICAgfVxuICAgIG1vdmUoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5Nb3ZlLCAxLCB0cnVlLCB0cnVlKTtcbiAgICB9XG4gICAgbW92ZVRvUGxheWVyKCkge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIodGhpcy5ub3dTcGVlZCwgMCk7XG4gICAgfVxuICAgIG9wZW5XdURpKCkge1xuICAgICAgICB0aGlzLmlzV3VEaSA9IHRydWU7XG4gICAgfVxuICAgIGNsb3NlV3VEaSgpIHtcbiAgICAgICAgdGhpcy5pc1d1RGkgPSBmYWxzZTtcbiAgICB9XG4gICAgLy/ljYfnqbpcbiAgICBhYm92ZTEoKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUzOUFib3ZlMSk7XG4gICAgICAgIHRoaXMub3Blbld1RGkoKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkFib3ZlMSwgMSwgZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgICAvL+mZjeiQvVxuICAgIGFib3ZlMigpIHtcbiAgICAgICAgdGhpcy5ub2RlLnggPSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueDtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkFib3ZlMiwgMSwgZmFsc2UsIHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLkZYX2xhbmRpbmcoKTtcbiAgICAgICAgfSwgMi40KTtcbiAgICB9XG4gICAgLy/lkI7ot7Pmv4DlhYnmlLvlh7tcbiAgICBKdW1wX0JhY2soKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUzOUp1bXApO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuSnVtcF9CYWNrLCAxLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBvZmZzZXRYID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAxNTAgOiAtMTUwO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxuICAgICAgICAgICAgICAgIC5ieSgwLjMsIHsgeDogb2Zmc2V0WCB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGUgIT0gZW5lbXlTdGF0ZS5KdW1wX0JhY2spIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUzOUxhc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmxhc2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMC41KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgICAgICB9LCAwLjUpO1xuICAgIH1cbiAgICAvL+WJjei3g+aUu+WHu1xuICAgIEp1bXBfRldEKCkge1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMzlKdW1wKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkp1bXBfRldELCAxLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmZvcndhcmQpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0WCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gLTE1MCA6IDE1MDtcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSlcbiAgICAgICAgICAgICAgICAuYnkoMC4zLCB7IHg6IG9mZnNldFggfSlcbiAgICAgICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlICE9IGVuZW15U3RhdGUuSnVtcF9GV0QpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUzOUF0dGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpdCh0aGlzLmRhbWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDAuMjUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH0sIDAuNSk7XG4gICAgfVxuICAgIC8v6IW/5Ye7XG4gICAgU2NyYXRjaCgpIHtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuRTM5U2NyYXRjaCk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5TY3JhdGNoLCAxLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLnNjcmF0Y2gpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSAhPSBlbmVteVN0YXRlLlNjcmF0Y2gpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuaGl0KHRoaXMuZGFtYWdlKTtcbiAgICAgICAgfSwgMC42KTtcbiAgICB9XG4gICAgLy/omZrlvLFcbiAgICBTdGFnZ2VyZWQoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5TdGFnZ2VyZWQsIDEsIGZhbHNlKTtcbiAgICB9XG4gICAgLy/omZrlvLHnu5PmnZ9cbiAgICBTdGFnZ2VyZWRSZXNldCgpIHtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLlN0YWdnZXJlZFJlc2V0LCAxLCBmYWxzZSk7XG4gICAgfVxuICAgIGFzeW5jIEZYX2xhbmRpbmcoKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLlNwZWxsX0VhcnRoXzAyKTtcbiAgICAgICAgbGV0IHByZWZhYiA9IGF3YWl0IGNhaWppVG9vbHMubG9hZFByZWZhYihcInByZWZhYnMvbGFuZGluZ0ZYX2VuZW15MzlcIik7XG4gICAgICAgIGxldCBmeCA9IGNhaWppVG9vbHMuY3JlYXRlTm9kZShwcmVmYWIsIHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICBmeC5zZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlLmdldFNpYmxpbmdJbmRleCgpICsgMSk7XG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSk7XG4gICAgICAgIGZ4LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIGZ4LmRlc3Ryb3koKTtcbiAgICAgICAgfSwgMik7XG4gICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zY3JlZW5TaGFrZSgpO1xuICAgIH1cbiAgICAvL+iEmuatpVxuICAgIGZvb3RTdGVwKGUsIGV2ZW50KSB7XG4gICAgICAgIC8vaWYoZXZlbnQudGltZT4wKVxuICAgICAgICAvL2F1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUzOVN0ZXAsZmFsc2UsMC42KTtcbiAgICB9XG4gICAgYmVIaXQoZGFtYWdlOiBudW1iZXIsIGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaWUgfHwgdGhpcy5pc1d1RGkpIHJldHVybjtcbiAgICAgICAgLy8gbGV0IGlzQ29udGludWUgPSB0aGlzLmNoZWNrSXNTd29yZFJhaW4oZG1nVHlwZSk7Ly/orr7nva7liZHpm6jmlLvlh7vpl7TpmpRcbiAgICAgICAgLy8gaWYgKGlzQ29udGludWUgPT0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNoYW5nZVN0YXRlX2JlSGl0KGRtZ1R5cGUpO1xuICAgICAgICBsZXQgeCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gdGhpcy5ub2RlLnggKyB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WCA6IHRoaXMubm9kZS54IC0gdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFg7XG4gICAgICAgIGxldCB5ID0gdGhpcy5ub2RlLnkgKyB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WTtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHQoKTtcbiAgICAgICAgRXZlbnRzLmluc3RhbmNlLnNob3dEYW1hZ2VMYWJlbF9lbmVteSh0aGlzLm5vZGUsIGRhbWFnZSwgY2MudjIoeCwgeSkpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhwKGRhbWFnZSk7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIEV2ZW50cy5pbnN0YW5jZS5jcmVhdGVFbmVteURpZUVmZmVjdCh0aGlzLm5vZGUsIHRoaXMuZGllRWZmZWN0TmFtZSwgY2MudjIoeCwgeSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhpdChkYW1hZ2U6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5kbWdDb2xsaWRlciAhPSBkYW1hZ2VDb2xsaWRlci5sYXNlcikge1xuICAgICAgICAgICAgdGhpcy5nZXREYW1hZ2VDb2xsaWRlcigpLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLCBkYW1hZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxhc2VySGl0KCkge1xuICAgICAgICBpZiAodGhpcy5kbWdDb2xsaWRlciAhPSBkYW1hZ2VDb2xsaWRlci5sYXNlcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmdldERhbWFnZUNvbGxpZGVyKCkuZ2V0Q29tcG9uZW50KEUzOUxhc2VyKS5sYXNlckNvbGxpZGVyLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLCB0aGlzLmRhbWFnZSk7XG4gICAgICAgIHRoaXMuaGlkZURhbWFnZUNvbGxpZGVyKCk7XG4gICAgfVxuICAgIHVwZGF0ZUhwKGRhbWFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaHAgLT0gZGFtYWdlO1xuICAgICAgICB1aU1hbmFnZXIuaW5zLmJvc3NIcC5hZGRIcCgtZGFtYWdlKTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XG4gICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFJpZ2lib2R5U3BlZWQoeDogbnVtYmVyLCB5OiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih4LCB5KTtcbiAgICB9XG4gICAgY2hhbmdlU3RhdGVfYmVIaXQoZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZiAodGhpcy5pc1N1cGVyQXJtb3IpIHJldHVybjtcbiAgICAgICAgbGV0IHN0YXRlID0gbnVsbDtcbiAgICAgICAgbGV0IGlzS25vY2tEb3duID0gZG1nVHlwZSA9PSBhdHRhY2tUeXBlLmF0dGFjazMgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoZG1nVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazE6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MjtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2szOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZygwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZyg1KTtcbiAgICAgICAgICAgICAgICB9LCAwLjQpO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5rbm9ja19kb3duO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA8IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICYmIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MigtdGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnggPiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIodGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5qdW1wSGl0OlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLnNodXJpa2VuOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUhpdEZvcmNlX3lfc2h1cmlrZW4pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zd29yZFJhaW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShzdGF0ZSwgMSwgZmFsc2UsIGlzS25vY2tEb3duKTtcbiAgICB9XG4gICAgc2V0TGluZWFyRGFtcGluZyhkYW1waW5nOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJEYW1waW5nID0gZGFtcGluZztcbiAgICB9XG4gICAgc2V0RnJpY3Rpb24oZnJpY3Rpb246IG51bWJlciA9IDApIHtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5mcmljdGlvbiA9IGZyaWN0aW9uO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmFwcGx5KCk7XG4gICAgfVxuICAgIGFwcGx5Rm9yY2UoZm9yY2U6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIHRoaXMucmlnaWJvZHkuYXBwbHlGb3JjZVRvQ2VudGVyKGZvcmNlLCB0cnVlKTtcbiAgICB9XG4gICAgY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmIChkbWdUeXBlID09IGF0dGFja1R5cGUuc3dvcmRSYWluKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N3b3JkUmFpbkNkKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1N3b3JkUmFpbkNkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzLnN3b3JkUmFpbkhpdENkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgaGlnaExpZ2h0QWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5pc0hpZ2hMaWdodCkge1xuICAgICAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImhpZ2hMaWdodENvbG9yXCIsIFsxLjAsIDEuMCwgMS4wLCB0aGlzLmhpZ2hMaWdodF9BLmFdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoaWdoTGlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzSGlnaExpZ2h0KSByZXR1cm47XG4gICAgICAgIHRoaXMuaXNIaWdoTGlnaHQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMSk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJoaWdoTGlnaHRDb2xvclwiLCBbMS4wLCAxLjAsIDEuMCwgMC41XSk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuaGlnaExpZ2h0X0EpXG4gICAgICAgICAgICAudG8oMC4xLCB7IGE6IDAgfSlcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlSGlnaExpZ2h0KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxuICAgIGNsb3NlSGlnaExpZ2h0KCkge1xuICAgICAgICB0aGlzLmlzSGlnaExpZ2h0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlnaExpZ2h0X0EuYSA9IDAuNTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImJlSGl0XCIsIDApO1xuICAgIH1cbiAgICBnZXREaXN0YW5jZVgoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyh0aGlzLm5vZGUueCAtIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54KTtcbiAgICB9XG59XG4iXX0=