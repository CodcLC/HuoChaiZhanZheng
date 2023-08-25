"use strict";
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