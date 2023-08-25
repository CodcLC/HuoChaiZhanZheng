"use strict";
cc._RF.push(module, 'fbec0pG4BtN/LdY2nKQkmJi', 'shaderController');
// scripts/game/shaderController.ts

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
var caijiTools_1 = require("../caijiTools");
var animationState_1 = require("./animationState");
var enemyAnimation_1 = require("./enemyAnimation");
var enemyBase_1 = require("./enemyBase");
var enemyHitCollider_1 = require("./enemyHitCollider");
var Events_1 = require("./Events");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
    damageCollider[damageCollider["skill"] = 1] = "skill";
})(damageCollider || (damageCollider = {}));
var shaderController = /** @class */ (function (_super) {
    __extends(shaderController, _super);
    function shaderController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.smokeFX = null;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed = 80; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.7; //ai间隔
        _this.stopDistance = 130; //停止距离
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 25000; //手里剑攻击作用力
        _this.beHitForce_x = 25000; //普通攻击作用力
        _this.beHitForce_y_shuriken = 50000; //普通攻击作用力
        _this.beHitForce_x_attack3 = 350000; //被击飞作用力
        _this.beHitForce_y_attack3 = 0; //被击飞作用力
        _this.scaleX_skeleton = 0;
        _this.allowAttackTimes = 3; //允许连续普通攻击次数
        _this.nowAttackTimes = 3; //当前连续普通攻击次数
        _this.isDie = false;
        _this.skeleton = null;
        _this.enemyAnimation = null;
        _this.rigibody = null;
        _this.boxCollider = null;
        _this.isSwordRainCd = false;
        _this.isMove = false; //是否处于移动状态
        _this.isWuDi = false;
        _this.dmgCollider = null;
        _this.smokeParticle_Black = null;
        _this.smokeParticle_Red = null;
        return _this;
    }
    shaderController.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
        this.smokeParticle_Black = this.smokeFX.getComponent(cc.ParticleSystem3D);
        this.smokeParticle_Red = this.smokeFX.children[0].getComponent(cc.ParticleSystem3D);
    };
    shaderController.prototype.onEnable = function () {
        this.node.y = -216;
    };
    shaderController.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    shaderController.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        this.AI_interval += Math.random();
        this.idle();
        cc.tween(this.node)
            .to(0.2, { y: -165.4 })
            .start();
    };
    shaderController.prototype.update = function () {
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
    shaderController.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
        }
    };
    shaderController.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    shaderController.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    shaderController.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    shaderController.prototype.AI_start = function () {
        var _this = this;
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
            this.changeMovState(true);
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
        }
    };
    shaderController.prototype.AI_stop = function () {
        this.idle();
    };
    shaderController.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    shaderController.prototype.idle = function () {
        var _this = this;
        this.changeMovState(false);
        this.changeDirection();
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.Idle)
                return;
            _this.AI_start();
        }, this.AI_interval);
    };
    shaderController.prototype.changeDirection = function () {
        if (GameManager_1.default.instance.player == null)
            return;
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x > this.node.x ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    shaderController.prototype.die = function () {
        this.isDie = true;
        this.node.active = false;
        this.hideHp();
    };
    shaderController.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    shaderController.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    shaderController.prototype.skillStart = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState["Skill-Start"], 1, false);
        this.scheduleOnce(this.skillMiddle, 2.5);
    };
    shaderController.prototype.skillMiddle = function () {
        var _this = this;
        var x = GameManager_1.default.instance.playerController.skeleton.node.scaleX > 0 ?
            GameManager_1.default.instance.player.x + 130 :
            GameManager_1.default.instance.player.x - 130;
        this.node.x = x;
        this.changeDirection();
        this.openCollider();
        this.enemyAnimation.changeState(animationState_1.enemyState["Skill-Middle"], 1, false);
        this.scheduleOnce(this.skillEnd, 1.7);
        this.showDamageCollider(damageCollider.skill);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state == animationState_1.enemyState["Skill-Middle"]) {
                _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage * 1.7);
                if (_this.getDamageCollider().getComponent(enemyHitCollider_1.default).player) {
                    Events_1.default.instance.screenShake(8, 0, 12);
                }
            }
        }, 0.2);
    };
    shaderController.prototype.skillEnd = function () {
        var x = 0;
        if (GameManager_1.default.instance.player.x < 700) {
            x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(300, cc.winSize.width / 1.5);
        }
        else if (GameManager_1.default.instance.player.x > 1700) {
            x = GameManager_1.default.instance.player.x - caijiTools_1.caijiTools.random_int(200, cc.winSize.width / 1.5);
        }
        else {
            var random = caijiTools_1.caijiTools.random_int(1, 10);
            x = random % 2 == 0 ?
                GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width / 1.5, -200) :
                GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(200, cc.winSize.width / 1.5);
        }
        this.node.x = x;
        this.openCollider();
        this.changeDirection();
        this.enemyAnimation.changeState(animationState_1.enemyState["Skill-End"], 1, false);
    };
    shaderController.prototype.hit = function () {
        var _this = this;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        if (this.nowAttackTimes < this.allowAttackTimes) {
            this.nowAttackTimes++;
            this.showDamageCollider(damageCollider.attack);
            this.enemyAnimation.changeState(animationState_1.enemyState.Atk, 1, false);
            this.scheduleOnce(function () {
                if (_this.enemyAnimation.state == animationState_1.enemyState.Atk) {
                    if (_this.getDamageCollider().getComponent(enemyHitCollider_1.default).player) {
                        Events_1.default.instance.screenShake(8, 0, 12);
                    }
                    _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
                }
            }, 0.5);
        }
        else {
            this.nowAttackTimes = 0;
            this.skillStart();
        }
    };
    shaderController.prototype.beHit = function (damage, dmgType) {
        // let isContinue = this.checkIsSwordRain(dmgType);//设置剑雨攻击间隔
        // if (isContinue == 0) return;
        this.highLight();
        this.showHp();
        this.changeState_beHit(dmgType);
        var x = this.node.scaleX < 0 ? this.node.x + this.damageLabelOffsetX : this.node.x - this.damageLabelOffsetX;
        var y = this.node.y + this.damageLabelOffsetY * 1.2;
        Events_1.default.instance.showDamageLabel_enemy(this.node, damage, cc.v2(x, y));
        this.updateHp(damage);
        if (this.hp <= 0) {
            Events_1.default.instance.createEnemyDieEffect(this.node, this.dieEffectName, cc.v2(x, y));
        }
    };
    shaderController.prototype.closeCollider = function () {
        this.boxCollider.enabled = false;
        this.boxCollider.apply();
        this.node.getComponent(cc.BoxCollider).enabled = false;
        this.hideHp();
        this.smokeParticle_Black.startColor.color.a = 0;
        this.smokeParticle_Red.startColor.color.a = 0;
        this.smokeParticle_Red.clear();
    };
    shaderController.prototype.openCollider = function () {
        this.boxCollider.enabled = true;
        this.boxCollider.apply();
        this.node.getComponent(cc.BoxCollider).enabled = true;
        cc.tween(this.smokeParticle_Black.startColor.color)
            .to(0.2, { a: 150 })
            .start();
        cc.tween(this.smokeParticle_Red.startColor.color)
            .to(0.05, { a: 150 })
            .start();
    };
    shaderController.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    shaderController.prototype.changeState_beHit = function (dmgType) {
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
    shaderController.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    shaderController.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    shaderController.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    shaderController.prototype.checkIsSwordRain = function (dmgType) {
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
    shaderController.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    shaderController.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    shaderController.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    shaderController.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    shaderController.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    shaderController.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    __decorate([
        property(cc.Node)
    ], shaderController.prototype, "smokeFX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], shaderController.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], shaderController.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], shaderController.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], shaderController.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], shaderController.prototype, "dieEffectName", void 0);
    shaderController = __decorate([
        ccclass
    ], shaderController);
    return shaderController;
}(enemyBase_1.default));
exports.default = shaderController;

cc._RF.pop();