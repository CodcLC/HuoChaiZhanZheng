
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/miniBossController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4e037uL5fBG7J2DBKqTqMrj', 'miniBossController');
// scripts/game/miniBossController.ts

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
var thunder_chase_1 = require("./thunder_chase");
var thunder_jolt_1 = require("./thunder_jolt");
var bossHp_1 = require("./ui/bossHp");
var uiManager_1 = require("./ui/uiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["laser"] = 0] = "laser";
    damageCollider[damageCollider["forward"] = 1] = "forward";
    damageCollider[damageCollider["scratch"] = 2] = "scratch";
})(damageCollider || (damageCollider = {}));
var miniBossController = /** @class */ (function (_super) {
    __extends(miniBossController, _super);
    function miniBossController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.thunder_jolt_prefab = null;
        _this.thunder_one_prefab = null;
        _this.thunder_many_prefab1 = null;
        _this.thunder_many_prefab2 = null;
        _this.flag_prefab = null;
        _this.tpFx_start = null;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.dieEffectName = "";
        _this.rushSpeed = 700; //冲击速度
        _this.moveSpeed = 140; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.7; //ai间隔
        _this.stopDistance = 400; //停止距离
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
        _this.attackType = [];
        return _this;
    }
    miniBossController.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    miniBossController.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    miniBossController.prototype.init = function () {
        uiManager_1.default.ins.showBossHp(bossHp_1.bossName.miniBoss);
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.ThunderTotemStruck);
    };
    miniBossController.prototype.appearFinished = function () {
        this.isWuDi = false;
        this.idle();
    };
    miniBossController.prototype.update = function () {
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
    miniBossController.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "wall") {
            contact.disabled = true;
        }
    };
    miniBossController.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    miniBossController.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    miniBossController.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    miniBossController.prototype.AI_start = function () {
        var _this = this;
        if (this.isDie)
            return;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.changeMovState(false);
            this.scheduleOnce(function () {
                _this.AI_start();
            }, 1);
            if ([animationState_1.enemyState.idle].includes(this.enemyAnimation.state))
                return;
            this.enemyAnimation.changeState(animationState_1.enemyState.idle, 1, true, true);
            return;
        }
        var distance = Math.abs(this.getDistanceX());
        if (distance < this.stopDistance) {
            this.attack();
        }
        else {
            this.changeDirection();
            this.enemyAnimation.changeState(animationState_1.enemyState.move, 1, true, true, true);
            this.changeMovState(true);
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
        }
    };
    miniBossController.prototype.AI_stop = function () {
        this.idle();
    };
    miniBossController.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    miniBossController.prototype.idle = function () {
        var _this = this;
        this.changeMovState(false);
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.idle, 1, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.idle)
                return;
            _this.AI_start();
        }, this.AI_interval);
    };
    miniBossController.prototype.attack = function () {
        this.changeDirection();
        this.setRigibodySpeed(0, 0);
        this.changeMovState(false);
        this.setLinearDamping(0);
        this.normalAttackTimes++;
        if (this.getDistanceX() < 150) {
            this.blinkStart();
            return;
        }
        if (this.attackType.length == 0) {
            this.attackType = [
                animationState_1.enemyState.call_of_lighting,
                animationState_1.enemyState.lighting_chase_start,
                animationState_1.enemyState.storm_burst,
                animationState_1.enemyState.thunder_jolt
            ];
        }
        var random = caijiTools_1.caijiTools.random_int(0, this.attackType.length - 1);
        var state = this.attackType[random];
        if (state == this.lastAttackState) {
            if (random == 0) {
                state = this.attackType[random + 1];
            }
            else if (random == this.attackType.length - 1) {
                state = this.attackType[random - 1];
            }
            else {
                state = this.attackType[random - 1];
            }
        }
        this[animationState_1.enemyState[state]]();
        this.attackType.splice(this.attackType.indexOf(state), 1);
        // switch (state) {
        //     case enemyState.call_of_lighting:
        //         this.call_of_lighting();
        //         break;
        //     case enemyState.lighting_chase_start:
        //         this.lighting_chase_start();
        //         break;
        //     case enemyState.storm_burst:
        //         this.storm_burst();
        //         break;
        //     case enemyState.thunder_jolt:
        //         this.thunder_jolt();
        //         break;
        // }
        this.lastAttackState = state;
    };
    //召唤旗帜
    miniBossController.prototype.call_of_lighting = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E27TotemCast);
        this.enemyAnimation.changeState(animationState_1.enemyState.call_of_lighting, 1, false);
        this.scheduleOnce(function () {
            _this.FX_flag();
        }, 1.3);
    };
    //持续召唤雷球（持续多段伤害）
    miniBossController.prototype.lighting_chase_start = function () {
        GameManager_1.default.instance.playerController.thunder_chase_cd = false;
        this.enemyAnimation.changeState(animationState_1.enemyState.lighting_chase_start, 1, false);
    };
    miniBossController.prototype.lighting_chase_middle = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E27Lightning);
        this.enemyAnimation.changeState(animationState_1.enemyState.lighting_chase_middle, 1, true);
        this.schedule(function () {
            _this.FX_thunerBall_pos();
        }, 0.55, 8);
        this.scheduleOnce(function () {
            _this.lighting_chase_end();
        }, 5);
    };
    miniBossController.prototype.lighting_chase_end = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.lighting_chase_end, 1, true);
    };
    //召唤溜溜球
    miniBossController.prototype.thunder_jolt = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E27JoltCast);
        this.enemyAnimation.changeState(animationState_1.enemyState.thunder_jolt, 1, false);
        this.scheduleOnce(function () {
            _this.FX_thunder_jolt();
        }, 1);
    };
    //雷球风暴（扩散单段伤害）
    miniBossController.prototype.storm_burst = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.storm_burst, 1, false);
        this.FX_thunder_stormBurst1();
    };
    //传送动作开始
    miniBossController.prototype.blinkStart = function () {
        this.setRigibodySpeed(0);
        this.changeMovState(false);
        this.enemyAnimation.changeState(animationState_1.enemyState.blink_start, 1, false, true);
        this.scheduleOnce(function () {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.BlinkStart);
        }, 0.2);
    };
    //传送开始动画完成
    miniBossController.prototype.binkStartCompelete = function () {
        this.createTPFX();
        this.teleportEnd();
    };
    //传送至指定地点
    miniBossController.prototype.teleportEnd = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.BlinkEnd);
        var x = 0;
        if (GameManager_1.default.instance.player.x < 350) {
            x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(400, cc.winSize.width / 1.6);
        }
        else if (GameManager_1.default.instance.player.x > 1150) {
            x = GameManager_1.default.instance.player.x - caijiTools_1.caijiTools.random_int(400, cc.winSize.width / 1.5);
        }
        else {
            var random = caijiTools_1.caijiTools.random_int(1, 10);
            x = random % 2 == 0 ?
                GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width / 1.6, -400) :
                GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(400, cc.winSize.width / 1.5);
        }
        this.node.x = x;
        this.createTPFX();
        this.enemyAnimation.changeState(animationState_1.enemyState.blink_end, 1, false, true);
    };
    //TPFX
    miniBossController.prototype.createTPFX = function () {
        var fx = cc.instantiate(this.tpFx_start);
        fx.setParent(this.node.parent);
        fx.setSiblingIndex(this.node.getSiblingIndex() + 1);
        fx.setPosition(this.node.x, this.node.y + this.damageLabelOffsetY);
        fx.active = true;
    };
    //生成旗帜
    miniBossController.prototype.FX_flag = function () {
        var flag = cc.instantiate(this.flag_prefab);
        flag.setParent(this.node.parent);
        flag.setSiblingIndex(this.node.getSiblingIndex());
        flag.setPosition(GameManager_1.default.instance.player.x, -162);
        flag.active = true;
    };
    //溜溜球
    miniBossController.prototype.FX_thunder_jolt = function () {
        var jolt = cc.instantiate(this.thunder_jolt_prefab);
        jolt.setParent(this.node.parent);
        jolt.setSiblingIndex(GameManager_1.default.instance.player.getSiblingIndex() + 1);
        jolt.getComponent(thunder_jolt_1.default).damage = this.damage;
        var x = this.skeleton.node.scaleX > 0 ? this.node.x - 140 : this.node.x + 140;
        var y = this.node.y + 130;
        jolt.setPosition(x, y);
        jolt.active = true;
        var forceX = this.skeleton.node.scaleX > 0 ? -50000 : 50000;
        var forceY = Math.abs(forceX * 3);
        jolt.getComponent(cc.RigidBody).applyForceToCenter(cc.v2(forceX, forceY), true);
    };
    //定点雷球
    miniBossController.prototype.FX_thunerBall_pos = function () {
        var thunder = cc.instantiate(this.thunder_one_prefab);
        thunder.setParent(this.node.parent);
        thunder.setSiblingIndex(GameManager_1.default.instance.player.getSiblingIndex() + 1);
        thunder.setPosition(GameManager_1.default.instance.player.x, this.node.y + 60);
        thunder.getComponent(thunder_chase_1.default).damage = this.damage / 4;
        thunder.active = true;
    };
    //扩散雷球 前摇
    miniBossController.prototype.FX_thunder_stormBurst1 = function () {
        var _this = this;
        var burst = cc.instantiate(this.thunder_many_prefab1);
        burst.setParent(this.node.parent);
        burst.setSiblingIndex(GameManager_1.default.instance.player.getSiblingIndex() + 1);
        var x = this.skeleton.node.scaleX > 0 ? this.node.x - 140 : this.node.x + 140;
        var y = this.node.y + 130;
        burst.setPosition(x, y);
        burst.active = true;
        this.scheduleOnce(function () {
            burst.children[0].getComponent(cc.ParticleSystem3D).stop();
            _this.FX_thunder_stormBurst2(burst.getSiblingIndex() + 1);
            _this.scheduleOnce(function () {
                burst.destroy();
            }, 1);
        }, 0.5);
    };
    //扩散雷球 圈状雷球
    miniBossController.prototype.FX_thunder_stormBurst2 = function (index) {
        var burst = cc.instantiate(this.thunder_many_prefab2);
        burst.setParent(this.node.parent);
        burst.setSiblingIndex(index);
        var x = this.skeleton.node.scaleX > 0 ? this.node.x - 140 : this.node.x + 140;
        var y = this.node.y + 130;
        burst.setPosition(x, y);
        burst.active = true;
    };
    miniBossController.prototype.changeDirection = function () {
        if (GameManager_1.default.instance.player == null)
            return;
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    miniBossController.prototype.laugh = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.laugh, 1, false, true);
    };
    miniBossController.prototype.die = function () {
        this.isDie = true;
        this.setRigibodySpeed(0, 0);
        this.changeMovState(false);
        this.unscheduleAllCallbacks();
        this.enemyAnimation.changeState(animationState_1.enemyState.die, 1, false, true);
        this.dieCount();
    };
    miniBossController.prototype.move = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Move, 1, true, true);
    };
    miniBossController.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    miniBossController.prototype.openWuDi = function () {
        this.isWuDi = true;
    };
    miniBossController.prototype.closeWuDi = function () {
        this.isWuDi = false;
    };
    //脚步
    miniBossController.prototype.footStep = function () {
    };
    miniBossController.prototype.beHit = function (damage, dmgType) {
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
    miniBossController.prototype.hit = function (damage) {
        if (this.dmgCollider != damageCollider.laser) {
            this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(this.node, damage);
        }
    };
    miniBossController.prototype.laserHit = function () {
        if (this.dmgCollider != damageCollider.laser)
            return;
        this.getDamageCollider().getComponent(E39Laser_1.default).laserCollider.getComponent(enemyHitCollider_1.default).hit(this.node, this.damage);
        this.hideDamageCollider();
    };
    miniBossController.prototype.updateHp = function (damage) {
        this.hp -= damage;
        uiManager_1.default.ins.bossHp.addHp(-damage);
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    miniBossController.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    miniBossController.prototype.changeState_beHit = function (dmgType) {
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
    miniBossController.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    miniBossController.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    miniBossController.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    miniBossController.prototype.checkIsSwordRain = function (dmgType) {
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
    miniBossController.prototype.highLightAction = function () {
        if (this.isHighLight) {
            this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, this.highLight_A.a]);
        }
    };
    miniBossController.prototype.highLight = function () {
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
    miniBossController.prototype.closeHighLight = function () {
        this.isHighLight = false;
        this.highLight_A.a = 0.5;
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    miniBossController.prototype.getDistanceX = function () {
        return Math.abs(this.node.x - GameManager_1.default.instance.player.x);
    };
    __decorate([
        property(cc.Prefab)
    ], miniBossController.prototype, "thunder_jolt_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], miniBossController.prototype, "thunder_one_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], miniBossController.prototype, "thunder_many_prefab1", void 0);
    __decorate([
        property(cc.Prefab)
    ], miniBossController.prototype, "thunder_many_prefab2", void 0);
    __decorate([
        property(cc.Prefab)
    ], miniBossController.prototype, "flag_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], miniBossController.prototype, "tpFx_start", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], miniBossController.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], miniBossController.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.String)
    ], miniBossController.prototype, "dieEffectName", void 0);
    miniBossController = __decorate([
        ccclass
    ], miniBossController);
    return miniBossController;
}(enemyBase_1.default));
exports.default = miniBossController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcbWluaUJvc3NDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUE0QztBQUM1Qyw0Q0FBMkM7QUFDM0MscURBQWdEO0FBQ2hELG1EQUFxRTtBQUNyRSx1Q0FBa0M7QUFDbEMsbURBQThDO0FBQzlDLHlDQUFvQztBQUNwQyx1REFBa0Q7QUFDbEQsbUNBQThCO0FBQzlCLDZDQUF3QztBQUN4QyxpREFBNEM7QUFDNUMsK0NBQTBDO0FBQzFDLHNDQUF1QztBQUN2Qyw0Q0FBdUM7QUFFakMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsSUFBSyxjQUlKO0FBSkQsV0FBSyxjQUFjO0lBQ2YscURBQUssQ0FBQTtJQUNMLHlEQUFPLENBQUE7SUFDUCx5REFBTyxDQUFBO0FBQ1gsQ0FBQyxFQUpJLGNBQWMsS0FBZCxjQUFjLFFBSWxCO0FBRUQ7SUFBZ0Qsc0NBQVM7SUFBekQ7UUFBQSxxRUF5ZUM7UUF0ZUcseUJBQW1CLEdBQWMsSUFBSSxDQUFDO1FBRXRDLHdCQUFrQixHQUFjLElBQUksQ0FBQztRQUVyQywwQkFBb0IsR0FBYyxJQUFJLENBQUM7UUFFdkMsMEJBQW9CLEdBQWMsSUFBSSxDQUFDO1FBRXZDLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRTlCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQix3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFL0IsbUJBQWEsR0FBVyxFQUFFLENBQUM7UUFFM0IsZUFBUyxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsZUFBUyxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsY0FBUSxHQUFXLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDM0IsaUJBQVcs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QUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELHlDQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFyZUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttRUFDa0I7SUFFdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrRUFDaUI7SUFFckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvRUFDbUI7SUFFdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztvRUFDbUI7SUFFdkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsyREFDVTtJQUU5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUNTO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO2tFQUNwQjtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQztrRUFDcEI7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2REFDTztJQXBCVixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQXlldEM7SUFBRCx5QkFBQztDQXplRCxBQXllQyxDQXplK0MsbUJBQVMsR0F5ZXhEO2tCQXplb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZW5lbXlOYW1lLCBlbmVteVN0YXRlIH0gZnJvbSBcIi4vYW5pbWF0aW9uU3RhdGVcIjtcbmltcG9ydCBFMzlMYXNlciBmcm9tIFwiLi9FMzlMYXNlclwiO1xuaW1wb3J0IGVuZW15QW5pbWF0aW9uIGZyb20gXCIuL2VuZW15QW5pbWF0aW9uXCI7XG5pbXBvcnQgZW5lbXlCYXNlIGZyb20gXCIuL2VuZW15QmFzZVwiO1xuaW1wb3J0IGVuZW15SGl0Q29sbGlkZXIgZnJvbSBcIi4vZW5lbXlIaXRDb2xsaWRlclwiO1xuaW1wb3J0IEV2ZW50cyBmcm9tIFwiLi9FdmVudHNcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHRodW5kZXJfY2hhc2UgZnJvbSBcIi4vdGh1bmRlcl9jaGFzZVwiO1xuaW1wb3J0IHRodW5kZXJfam9sdCBmcm9tIFwiLi90aHVuZGVyX2pvbHRcIjtcbmltcG9ydCB7IGJvc3NOYW1lIH0gZnJvbSBcIi4vdWkvYm9zc0hwXCI7XG5pbXBvcnQgdWlNYW5hZ2VyIGZyb20gXCIuL3VpL3VpTWFuYWdlclwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuZW51bSBkYW1hZ2VDb2xsaWRlciB7XG4gICAgbGFzZXIsXG4gICAgZm9yd2FyZCxcbiAgICBzY3JhdGNoXG59XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbWluaUJvc3NDb250cm9sbGVyIGV4dGVuZHMgZW5lbXlCYXNlIHtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdGh1bmRlcl9qb2x0X3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRodW5kZXJfb25lX3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRodW5kZXJfbWFueV9wcmVmYWIxOiBjYy5QcmVmYWIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdGh1bmRlcl9tYW55X3ByZWZhYjI6IGNjLlByZWZhYiA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBmbGFnX3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRwRnhfc3RhcnQ6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLkvKTlrrPmlYjmnpx46L205YGP56e75YC8XCIgfSlcbiAgICBkYW1hZ2VMYWJlbE9mZnNldFg6IG51bWJlciA9IDA7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceei9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRZOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eShjYy5TdHJpbmcpXG4gICAgZGllRWZmZWN0TmFtZTogc3RyaW5nID0gXCJcIjtcblxuICAgIHJ1c2hTcGVlZDogbnVtYmVyID0gNzAwOy8v5Yay5Ye76YCf5bqmXG4gICAgbW92ZVNwZWVkOiBudW1iZXIgPSAxNDA7Ly/np7vliqjpgJ/luqZcbiAgICBub3dTcGVlZDogbnVtYmVyID0gMDsvL+W9k+WJjemAn+W6plxuICAgIEFJX2ludGVydmFsOiBudW1iZXIgPSAwLjc7Ly9haemXtOmalFxuICAgIHN0b3BEaXN0YW5jZTogbnVtYmVyID0gNDAwOy8v5YGc5q2i6Led56a7XG4gICAgaHA6IG51bWJlciA9IDA7XG4gICAgaHBUaW1lczogbnVtYmVyID0gMTsvL+ihgOmHj+WAjeaVsFxuICAgIGJlSGl0Rm9yY2VfeTogbnVtYmVyID0gMjUwMDA7Ly/miYvph4zliZHmlLvlh7vkvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3g6IG51bWJlciA9IDI1MDAwLy/mma7pgJrmlLvlh7vkvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3lfc2h1cmlrZW46IG51bWJlciA9IDUwMDAwLy/mma7pgJrmlLvlh7vkvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3hfYXR0YWNrMzogbnVtYmVyID0gMzUwMDAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV95X2F0dGFjazM6IG51bWJlciA9IDA7Ly/ooqvlh7vpo57kvZznlKjliptcbiAgICBzY2FsZVhfc2tlbGV0b246IG51bWJlciA9IDA7XG4gICAgYWxsb3dNb3ZlVGltZTogbnVtYmVyID0gMjsvL+WFgeiuuG1vdmXnirbmgIHmnIDplb/ml7bpl7RcbiAgICBhbGxvd0F0dGFja1RpbWU6IG51bWJlciA9IDI7Ly/lhYHorrjov57nu61hdHRhY2vmrKHmlbBcbiAgICBhdHRhY2tUaW1lczogbnVtYmVyID0gMDsvL2F0dGFja+i/nue7reasoeaVsFxuICAgIHNraWxsMV94OiBudW1iZXIgPSAwOy8v5rOw5bGx5Y6L6aG26JC95Zyw5Z2Q5qCH77yI5Y2H56m65pe2546p5a625L2N572u77yJXG4gICAgaXNTdGFydFJ1c2g6IGJvb2xlYW4gPSBmYWxzZTsvL+W8gOWni+WGsuaSnlxuICAgIGlzRGllOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBlbmVteUFuaW1hdGlvbjogZW5lbXlBbmltYXRpb24gPSBudWxsO1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIGJveENvbGxpZGVyOiBjYy5QaHlzaWNzQm94Q29sbGlkZXIgPSBudWxsO1xuICAgIGlzU3dvcmRSYWluQ2Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01vdmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWkhOS6juenu+WKqOeKtuaAgVxuICAgIGlzV3VEaTogYm9vbGVhbiA9IHRydWU7Ly/ml6DmlYznirbmgIFcbiAgICBkbWdDb2xsaWRlcjogZGFtYWdlQ29sbGlkZXIgPSBudWxsO1xuICAgIGlzSGlnaExpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gICAgaGlnaExpZ2h0X0EgPSB7XG4gICAgICAgIGE6IDAuNVxuICAgIH07XG4gICAgbm9tYWxBdHRhY2tNYXg6IG51bWJlciA9IDU7Ly/mma7pgJrmlLvlh7vov57nu63mnIDlpKfmrKHmlbBcbiAgICBub3JtYWxBdHRhY2tUaW1lczogbnVtYmVyID0gMDsvL+aZrumAmuaUu+WHu+asoeaVsO+8iOi+vuS4gOWumuasoeaVsOWQjuWNh+epuuaUvuWwj+icmOibm++8iVxuICAgIGxhc3RBdHRhY2tTdGF0ZTogZW5lbXlTdGF0ZSA9IG51bGw7XG4gICAgc3BpZGVybGluZ1ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICBhdHRhY2tUeXBlOmVuZW15U3RhdGVbXT1bXTtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbiA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xuICAgICAgICB0aGlzLnNjYWxlWF9za2VsZXRvbiA9IE1hdGguYWJzKHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVgpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChlbmVteUFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uZW5lbXlDb250cm9sbGVyID0gdGhpcztcbiAgICAgICAgdGhpcy5yaWdpYm9keSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlciA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUGh5c2ljc0JveENvbGxpZGVyKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnNrZWxldG9uLnNrZWxldG9uRGF0YS5fc2tlbGV0b25DYWNoZS5hbmltYXRpb25zKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdWlNYW5hZ2VyLmlucy5zaG93Qm9zc0hwKGJvc3NOYW1lLm1pbmlCb3NzKTtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmhwID0gdGhpcy5ocE1heCAqIHRoaXMuaHBUaW1lcztcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuVGh1bmRlclRvdGVtU3RydWNrKTtcbiAgICB9XG4gICAgYXBwZWFyRmluaXNoZWQoKSB7XG4gICAgICAgIHRoaXMuaXNXdURpID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWRsZSgpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuaGlnaExpZ2h0QWN0aW9uKCk7XG4gICAgICAgIGlmICh0aGlzLmlzTW92ZSA9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICBsZXQgZGlzdGFuY2UgPSB0aGlzLmdldERpc3RhbmNlWCgpO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpIDwgdGhpcy5zdG9wRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSA9PSBlbmVteVN0YXRlLmF0dGFjaykgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG9QbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0OiBjYy5QaHlzaWNzQ29udGFjdCwgc2VsZkNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIsIG90aGVyQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlcikge1xuICAgICAgICBsZXQgb3RoZXIgPSBvdGhlckNvbGxpZGVyLm5vZGU7XG4gICAgICAgIC8vIGxldCB3b3JsZE1hbmlmb2xkID0gY29udGFjdC5nZXRXb3JsZE1hbmlmb2xkKCk7XG4gICAgICAgIC8vIGxldCBub3JtYWwgPSB3b3JsZE1hbmlmb2xkLm5vcm1hbDtcbiAgICAgICAgaWYgKG90aGVyLmdyb3VwID09IFwid2FsbFwiKSB7XG4gICAgICAgICAgICBjb250YWN0LmRpc2FibGVkPXRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0RhbWFnZUNvbGxpZGVyKGNvbGxpZGVyOiBkYW1hZ2VDb2xsaWRlcikge1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bY29sbGlkZXJdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXIgPSBjb2xsaWRlcjtcbiAgICB9XG4gICAgZ2V0RGFtYWdlQ29sbGlkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl07XG4gICAgfVxuICAgIGhpZGVEYW1hZ2VDb2xsaWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG1nQ29sbGlkZXIgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXIgPSBudWxsO1xuICAgIH1cbiAgICBBSV9zdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaWUpIHJldHVybjtcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuaXNEaWUpIHtcbiAgICAgICAgICAgIC8v546p5a625bey5q27IOWBnOatouenu+WKqFxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICBpZiAoW2VuZW15U3RhdGUuaWRsZV0uaW5jbHVkZXModGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSkpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5pZGxlLCAxLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLmFicyh0aGlzLmdldERpc3RhbmNlWCgpKTtcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy5zdG9wRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLm1vdmUsIDEsIHRydWUsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZSh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMubm93U3BlZWQgPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IC10aGlzLm1vdmVTcGVlZCA6IHRoaXMubW92ZVNwZWVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIEFJX3N0b3AoKSB7XG4gICAgICAgIHRoaXMuaWRsZSgpO1xuICAgIH1cbiAgICBjaGFuZ2VNb3ZTdGF0ZShpc01vdmU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc01vdmUgPSBpc01vdmU7XG4gICAgfVxuICAgIGlkbGUoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLCAwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmlkbGUsIDEsIHRydWUsIHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSE9ZW5lbXlTdGF0ZS5pZGxlKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgICAgIH0sdGhpcy5BSV9pbnRlcnZhbCk7XG4gICAgfVxuICAgIGF0dGFjaygpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsIDApO1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDApO1xuICAgICAgICB0aGlzLm5vcm1hbEF0dGFja1RpbWVzKys7XG4gICAgICAgIGlmKHRoaXMuZ2V0RGlzdGFuY2VYKCk8MTUwKXtcbiAgICAgICAgICAgIHRoaXMuYmxpbmtTdGFydCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuYXR0YWNrVHlwZS5sZW5ndGg9PTApe1xuICAgICAgICAgICAgdGhpcy5hdHRhY2tUeXBlPVtcbiAgICAgICAgICAgICAgICBlbmVteVN0YXRlLmNhbGxfb2ZfbGlnaHRpbmcsXG4gICAgICAgICAgICAgICAgZW5lbXlTdGF0ZS5saWdodGluZ19jaGFzZV9zdGFydCxcbiAgICAgICAgICAgICAgICBlbmVteVN0YXRlLnN0b3JtX2J1cnN0LFxuICAgICAgICAgICAgICAgIGVuZW15U3RhdGUudGh1bmRlcl9qb2x0XG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGxldCByYW5kb20gPSBjYWlqaVRvb2xzLnJhbmRvbV9pbnQoMCwgdGhpcy5hdHRhY2tUeXBlLmxlbmd0aCAtIDEpO1xuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmF0dGFja1R5cGVbcmFuZG9tXTtcbiAgICAgICAgaWYoc3RhdGU9PXRoaXMubGFzdEF0dGFja1N0YXRlKXtcbiAgICAgICAgICAgIGlmKHJhbmRvbT09MCl7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSB0aGlzLmF0dGFja1R5cGVbcmFuZG9tKzFdO1xuICAgICAgICAgICAgfWVsc2UgaWYocmFuZG9tPT10aGlzLmF0dGFja1R5cGUubGVuZ3RoLTEpe1xuICAgICAgICAgICAgICAgIHN0YXRlID0gdGhpcy5hdHRhY2tUeXBlW3JhbmRvbS0xXTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHN0YXRlID0gdGhpcy5hdHRhY2tUeXBlW3JhbmRvbS0xXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzW2VuZW15U3RhdGVbc3RhdGVdXSgpO1xuICAgICAgICB0aGlzLmF0dGFja1R5cGUuc3BsaWNlKHRoaXMuYXR0YWNrVHlwZS5pbmRleE9mKHN0YXRlKSwgMSk7XG4gICAgICAgIC8vIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgLy8gICAgIGNhc2UgZW5lbXlTdGF0ZS5jYWxsX29mX2xpZ2h0aW5nOlxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY2FsbF9vZl9saWdodGluZygpO1xuICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyAgICAgY2FzZSBlbmVteVN0YXRlLmxpZ2h0aW5nX2NoYXNlX3N0YXJ0OlxuICAgICAgICAvLyAgICAgICAgIHRoaXMubGlnaHRpbmdfY2hhc2Vfc3RhcnQoKTtcbiAgICAgICAgLy8gICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgIGNhc2UgZW5lbXlTdGF0ZS5zdG9ybV9idXJzdDpcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnN0b3JtX2J1cnN0KCk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgICBjYXNlIGVuZW15U3RhdGUudGh1bmRlcl9qb2x0OlxuICAgICAgICAvLyAgICAgICAgIHRoaXMudGh1bmRlcl9qb2x0KCk7XG4gICAgICAgIC8vICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5sYXN0QXR0YWNrU3RhdGUgPSBzdGF0ZTtcbiAgICB9XG4gICAgLy/lj6zllKTml5fluJxcbiAgICBjYWxsX29mX2xpZ2h0aW5nKCkge1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMjdUb3RlbUNhc3QpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuY2FsbF9vZl9saWdodGluZywgMSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLkZYX2ZsYWcoKTtcbiAgICAgICAgfSwgMS4zKTtcbiAgICB9XG4gICAgLy/mjIHnu63lj6zllKTpm7fnkIPvvIjmjIHnu63lpJrmrrXkvKTlrrPvvIlcbiAgICBsaWdodGluZ19jaGFzZV9zdGFydCgpIHtcbiAgICAgICAgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci50aHVuZGVyX2NoYXNlX2NkPWZhbHNlO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUubGlnaHRpbmdfY2hhc2Vfc3RhcnQsIDEsIGZhbHNlKTtcbiAgICB9XG4gICAgbGlnaHRpbmdfY2hhc2VfbWlkZGxlKCkge1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMjdMaWdodG5pbmcpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUubGlnaHRpbmdfY2hhc2VfbWlkZGxlLCAxLCB0cnVlKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLkZYX3RodW5lckJhbGxfcG9zKCk7XG4gICAgICAgIH0sIDAuNTUsIDgpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxpZ2h0aW5nX2NoYXNlX2VuZCgpO1xuICAgICAgICB9LCA1KTtcbiAgICB9XG4gICAgbGlnaHRpbmdfY2hhc2VfZW5kKCkge1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUubGlnaHRpbmdfY2hhc2VfZW5kLCAxLCB0cnVlKTtcbiAgICB9XG4gICAgLy/lj6zllKTmupzmupznkINcbiAgICB0aHVuZGVyX2pvbHQoKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUyN0pvbHRDYXN0KTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLnRodW5kZXJfam9sdCwgMSwgZmFsc2UpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLkZYX3RodW5kZXJfam9sdCgpO1xuICAgICAgICB9LCAxKTtcbiAgICB9XG4gICAgLy/pm7fnkIPpo47mmrTvvIjmianmlaPljZXmrrXkvKTlrrPvvIlcbiAgICBzdG9ybV9idXJzdCgpIHtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLnN0b3JtX2J1cnN0LCAxLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuRlhfdGh1bmRlcl9zdG9ybUJ1cnN0MSgpO1xuICAgIH1cbiAgICAvL+S8oOmAgeWKqOS9nOW8gOWni1xuICAgIGJsaW5rU3RhcnQoKSB7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5ibGlua19zdGFydCwgMSwgZmFsc2UsIHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuQmxpbmtTdGFydCk7XG4gICAgICAgIH0sMC4yKTtcbiAgICB9XG4gICAgLy/kvKDpgIHlvIDlp4vliqjnlLvlrozmiJBcbiAgICBiaW5rU3RhcnRDb21wZWxldGUoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlVFBGWCgpO1xuICAgICAgICB0aGlzLnRlbGVwb3J0RW5kKCk7XG4gICAgfVxuICAgIC8v5Lyg6YCB6Iez5oyH5a6a5Zyw54K5XG4gICAgdGVsZXBvcnRFbmQoKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkJsaW5rRW5kKTtcbiAgICAgICAgbGV0IHggPSAwO1xuICAgICAgICBpZiAoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPCAzNTApIHtcbiAgICAgICAgICAgIHggPSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCArIGNhaWppVG9vbHMucmFuZG9tX2ludCg0MDAsIGNjLndpblNpemUud2lkdGggLyAxLjYpO1xuICAgICAgICB9IGVsc2UgaWYgKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gMTE1MCkge1xuICAgICAgICAgICAgeCA9IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54IC0gY2FpamlUb29scy5yYW5kb21faW50KDQwMCwgY2Mud2luU2l6ZS53aWR0aCAvIDEuNSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tID0gY2FpamlUb29scy5yYW5kb21faW50KDEsIDEwKTtcbiAgICAgICAgICAgIHggPSByYW5kb20gJSAyID09IDAgP1xuICAgICAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICsgY2FpamlUb29scy5yYW5kb21faW50KC1jYy53aW5TaXplLndpZHRoIC8gMS42LCAtNDAwKSA6XG4gICAgICAgICAgICAgICAgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggKyBjYWlqaVRvb2xzLnJhbmRvbV9pbnQoNDAwLCBjYy53aW5TaXplLndpZHRoIC8gMS41KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUueCA9IHg7XG4gICAgICAgIHRoaXMuY3JlYXRlVFBGWCgpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuYmxpbmtfZW5kLCAxLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIC8vVFBGWFxuICAgIGNyZWF0ZVRQRlgoKSB7XG4gICAgICAgIGxldCBmeCA9IGNjLmluc3RhbnRpYXRlKHRoaXMudHBGeF9zdGFydCk7XG4gICAgICAgIGZ4LnNldFBhcmVudCh0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgZnguc2V0U2libGluZ0luZGV4KHRoaXMubm9kZS5nZXRTaWJsaW5nSW5kZXgoKSArIDEpO1xuICAgICAgICBmeC5zZXRQb3NpdGlvbih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkgKyB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WSk7XG4gICAgICAgIGZ4LmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIC8v55Sf5oiQ5peX5bicXG4gICAgRlhfZmxhZygpIHtcbiAgICAgICAgbGV0IGZsYWcgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmZsYWdfcHJlZmFiKTtcbiAgICAgICAgZmxhZy5zZXRQYXJlbnQodGhpcy5ub2RlLnBhcmVudCk7XG4gICAgICAgIGZsYWcuc2V0U2libGluZ0luZGV4KHRoaXMubm9kZS5nZXRTaWJsaW5nSW5kZXgoKSk7XG4gICAgICAgIGZsYWcuc2V0UG9zaXRpb24oR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLngsIC0xNjIpO1xuICAgICAgICBmbGFnLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIC8v5rqc5rqc55CDXG4gICAgRlhfdGh1bmRlcl9qb2x0KCkge1xuICAgICAgICBsZXQgam9sdCA9IGNjLmluc3RhbnRpYXRlKHRoaXMudGh1bmRlcl9qb2x0X3ByZWZhYik7XG4gICAgICAgIGpvbHQuc2V0UGFyZW50KHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICBqb2x0LnNldFNpYmxpbmdJbmRleChHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIuZ2V0U2libGluZ0luZGV4KCkgKyAxKTtcbiAgICAgICAgam9sdC5nZXRDb21wb25lbnQodGh1bmRlcl9qb2x0KS5kYW1hZ2UgPSB0aGlzLmRhbWFnZTtcbiAgICAgICAgbGV0IHggPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IHRoaXMubm9kZS54IC0gMTQwIDogdGhpcy5ub2RlLnggKyAxNDA7XG4gICAgICAgIGxldCB5ID0gdGhpcy5ub2RlLnkgKyAxMzA7XG4gICAgICAgIGpvbHQuc2V0UG9zaXRpb24oeCwgeSk7XG4gICAgICAgIGpvbHQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgbGV0IGZvcmNlWCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gLTUwMDAwIDogNTAwMDA7XG4gICAgICAgIGxldCBmb3JjZVkgPSBNYXRoLmFicyhmb3JjZVggKiAzKTtcbiAgICAgICAgam9sdC5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KS5hcHBseUZvcmNlVG9DZW50ZXIoY2MudjIoZm9yY2VYLCBmb3JjZVkpLCB0cnVlKTtcbiAgICB9XG4gICAgLy/lrprngrnpm7fnkINcbiAgICBGWF90aHVuZXJCYWxsX3BvcygpIHtcbiAgICAgICAgbGV0IHRodW5kZXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRodW5kZXJfb25lX3ByZWZhYik7XG4gICAgICAgIHRodW5kZXIuc2V0UGFyZW50KHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICB0aHVuZGVyLnNldFNpYmxpbmdJbmRleChHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIuZ2V0U2libGluZ0luZGV4KCkgKyAxKTtcbiAgICAgICAgdGh1bmRlci5zZXRQb3NpdGlvbihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCwgdGhpcy5ub2RlLnkgKyA2MCk7XG4gICAgICAgIHRodW5kZXIuZ2V0Q29tcG9uZW50KHRodW5kZXJfY2hhc2UpLmRhbWFnZSA9IHRoaXMuZGFtYWdlIC8gNDtcbiAgICAgICAgdGh1bmRlci5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICAvL+aJqeaVo+mbt+eQgyDliY3mkYdcbiAgICBGWF90aHVuZGVyX3N0b3JtQnVyc3QxKCkge1xuICAgICAgICBsZXQgYnVyc3QgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRodW5kZXJfbWFueV9wcmVmYWIxKTtcbiAgICAgICAgYnVyc3Quc2V0UGFyZW50KHRoaXMubm9kZS5wYXJlbnQpOyAgXG4gICAgICAgIGJ1cnN0LnNldFNpYmxpbmdJbmRleChHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIuZ2V0U2libGluZ0luZGV4KCkgKyAxKTtcbiAgICAgICAgbGV0IHggPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IHRoaXMubm9kZS54IC0gMTQwIDogdGhpcy5ub2RlLnggKyAxNDA7XG4gICAgICAgIGxldCB5ID0gdGhpcy5ub2RlLnkgKyAxMzA7XG4gICAgICAgIGJ1cnN0LnNldFBvc2l0aW9uKHgseSk7XG4gICAgICAgIGJ1cnN0LmFjdGl2ZT10cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgYnVyc3QuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlBhcnRpY2xlU3lzdGVtM0QpLnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuRlhfdGh1bmRlcl9zdG9ybUJ1cnN0MihidXJzdC5nZXRTaWJsaW5nSW5kZXgoKSsxKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgYnVyc3QuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSwxKTtcbiAgICAgICAgfSwwLjUpO1xuICAgIH1cbiAgICAvL+aJqeaVo+mbt+eQgyDlnIjnirbpm7fnkINcbiAgICBGWF90aHVuZGVyX3N0b3JtQnVyc3QyKGluZGV4Om51bWJlcikge1xuICAgICAgICBsZXQgYnVyc3QgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnRodW5kZXJfbWFueV9wcmVmYWIyKTtcbiAgICAgICAgYnVyc3Quc2V0UGFyZW50KHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICBidXJzdC5zZXRTaWJsaW5nSW5kZXgoaW5kZXgpO1xuICAgICAgICBsZXQgeCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gdGhpcy5ub2RlLnggLSAxNDAgOiB0aGlzLm5vZGUueCArIDE0MDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLm5vZGUueSArIDEzMDtcbiAgICAgICAgYnVyc3Quc2V0UG9zaXRpb24oeCx5KTtcbiAgICAgICAgYnVyc3QuYWN0aXZlPXRydWU7XG4gICAgfVxuICAgIGNoYW5nZURpcmVjdGlvbigpIHtcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllciA9PSBudWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAtIHRoaXMubm9kZS54ID4gMCA/IC10aGlzLnNjYWxlWF9za2VsZXRvbiA6IHRoaXMuc2NhbGVYX3NrZWxldG9uO1xuICAgICAgICAvL3RoaXMuaHBOb2RlLnggPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IC0yOCA6IDI4O1xuICAgIH1cbiAgICBsYXVnaCgpIHtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmxhdWdoLCAxLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGRpZSgpIHtcbiAgICAgICAgdGhpcy5pc0RpZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLCAwKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuZGllLCAxLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZGllQ291bnQoKTtcbiAgICB9XG4gICAgbW92ZSgpIHtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLk1vdmUsIDEsIHRydWUsIHRydWUpO1xuICAgIH1cbiAgICBtb3ZlVG9QbGF5ZXIoKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih0aGlzLm5vd1NwZWVkLCAwKTtcbiAgICB9XG4gICAgb3Blbld1RGkoKSB7XG4gICAgICAgIHRoaXMuaXNXdURpID0gdHJ1ZTtcbiAgICB9XG4gICAgY2xvc2VXdURpKCkge1xuICAgICAgICB0aGlzLmlzV3VEaSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8v6ISa5q2lXG4gICAgZm9vdFN0ZXAoKSB7XG4gICAgfVxuICAgIGJlSGl0KGRhbWFnZTogbnVtYmVyLCBkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGllIHx8IHRoaXMuaXNXdURpKSByZXR1cm47XG4gICAgICAgIC8vIGxldCBpc0NvbnRpbnVlID0gdGhpcy5jaGVja0lzU3dvcmRSYWluKGRtZ1R5cGUpOy8v6K6+572u5YmR6Zuo5pS75Ye76Ze06ZqUXG4gICAgICAgIC8vIGlmIChpc0NvbnRpbnVlID09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZV9iZUhpdChkbWdUeXBlKTtcbiAgICAgICAgbGV0IHggPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IHRoaXMubm9kZS54ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFggOiB0aGlzLm5vZGUueCAtIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYO1xuICAgICAgICBsZXQgeSA9IHRoaXMubm9kZS55ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFk7XG4gICAgICAgIHRoaXMuaGlnaExpZ2h0KCk7XG4gICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zaG93RGFtYWdlTGFiZWxfZW5lbXkodGhpcy5ub2RlLCBkYW1hZ2UsIGNjLnYyKHgsIHkpKTtcbiAgICAgICAgdGhpcy51cGRhdGVIcChkYW1hZ2UpO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICBFdmVudHMuaW5zdGFuY2UuY3JlYXRlRW5lbXlEaWVFZmZlY3QodGhpcy5ub2RlLCB0aGlzLmRpZUVmZmVjdE5hbWUsIGNjLnYyKHgsIHkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoaXQoZGFtYWdlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuZG1nQ29sbGlkZXIgIT0gZGFtYWdlQ29sbGlkZXIubGFzZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RGFtYWdlQ29sbGlkZXIoKS5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcikuaGl0KHRoaXMubm9kZSwgZGFtYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsYXNlckhpdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZG1nQ29sbGlkZXIgIT0gZGFtYWdlQ29sbGlkZXIubGFzZXIpIHJldHVybjtcbiAgICAgICAgdGhpcy5nZXREYW1hZ2VDb2xsaWRlcigpLmdldENvbXBvbmVudChFMzlMYXNlcikubGFzZXJDb2xsaWRlci5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcikuaGl0KHRoaXMubm9kZSwgdGhpcy5kYW1hZ2UpO1xuICAgICAgICB0aGlzLmhpZGVEYW1hZ2VDb2xsaWRlcigpO1xuICAgIH1cbiAgICB1cGRhdGVIcChkYW1hZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLmhwIC09IGRhbWFnZTtcbiAgICAgICAgdWlNYW5hZ2VyLmlucy5ib3NzSHAuYWRkSHAoLWRhbWFnZSk7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuaHAgPSAwO1xuICAgICAgICAgICAgdGhpcy5kaWUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRSaWdpYm9keVNwZWVkKHg6IG51bWJlciwgeTogbnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoeCwgeSk7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlX2JlSGl0KGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIGxldCBzdGF0ZSA9IG51bGw7XG4gICAgICAgIGxldCBpc0tub2NrRG93biA9IGRtZ1R5cGUgPT0gYXR0YWNrVHlwZS5hdHRhY2szID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGRtZ1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2sxOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDI7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoNSk7XG4gICAgICAgICAgICAgICAgfSwgMC40KTtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUua25vY2tfZG93bjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLnggPCBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoLXRoaXMuYmVIaXRGb3JjZV94X2F0dGFjazMsIHRoaXMuYmVIaXRGb3JjZV95X2F0dGFjazMpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS54ID4gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggJiYgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKHRoaXMuYmVIaXRGb3JjZV94X2F0dGFjazMsIHRoaXMuYmVIaXRGb3JjZV95X2F0dGFjazMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuanVtcEhpdDpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zaHVyaWtlbjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVIaXRGb3JjZV95X3NodXJpa2VuKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuc3dvcmRSYWluOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoc3RhdGUsIDEsIGZhbHNlLCBpc0tub2NrRG93bik7XG4gICAgfVxuICAgIHNldExpbmVhckRhbXBpbmcoZGFtcGluZzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyRGFtcGluZyA9IGRhbXBpbmc7XG4gICAgfVxuICAgIHNldEZyaWN0aW9uKGZyaWN0aW9uOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIuZnJpY3Rpb24gPSBmcmljdGlvbjtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5hcHBseSgpO1xuICAgIH1cbiAgICBhcHBseUZvcmNlKGZvcmNlOiBjYy5WZWMyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3VwZXJBcm1vcikgcmV0dXJuO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmFwcGx5Rm9yY2VUb0NlbnRlcihmb3JjZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNoZWNrSXNTd29yZFJhaW4oZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZiAoZG1nVHlwZSA9PSBhdHRhY2tUeXBlLnN3b3JkUmFpbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTd29yZFJhaW5DZCkgcmV0dXJuIDA7XG4gICAgICAgICAgICB0aGlzLmlzU3dvcmRSYWluQ2QgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgdGhpcy5zd29yZFJhaW5IaXRDZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGhpZ2hMaWdodEFjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaWdoTGlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJoaWdoTGlnaHRDb2xvclwiLCBbMS4wLCAxLjAsIDEuMCwgdGhpcy5oaWdoTGlnaHRfQS5hXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGlnaExpZ2h0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0hpZ2hMaWdodCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzSGlnaExpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImJlSGl0XCIsIDEpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiaGlnaExpZ2h0Q29sb3JcIiwgWzEuMCwgMS4wLCAxLjAsIDAuNV0pO1xuICAgICAgICBjYy50d2Vlbih0aGlzLmhpZ2hMaWdodF9BKVxuICAgICAgICAgICAgLnRvKDAuMSwgeyBhOiAwIH0pXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUhpZ2hMaWdodCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cbiAgICBjbG9zZUhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy5pc0hpZ2hMaWdodCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZ2hMaWdodF9BLmEgPSAwLjU7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJiZUhpdFwiLCAwKTtcbiAgICB9XG4gICAgZ2V0RGlzdGFuY2VYKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnModGhpcy5ub2RlLnggLSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCk7XG4gICAgfVxufVxuIl19