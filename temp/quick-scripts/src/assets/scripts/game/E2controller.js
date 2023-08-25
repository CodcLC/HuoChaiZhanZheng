"use strict";
cc._RF.push(module, 'f9a40xSQqJKM4RqNHl6mG72', 'E2controller');
// scripts/game/E2controller.ts

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
var audioManager_1 = require("../main/audioManager");
var animationState_1 = require("./animationState");
var enemyAnimation_1 = require("./enemyAnimation");
var enemyBase_1 = require("./enemyBase");
var Events_1 = require("./Events");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
})(damageCollider || (damageCollider = {}));
var E2controller = /** @class */ (function (_super) {
    __extends(E2controller, _super);
    function E2controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed_fast = 180; //移动速度
        _this.moveSpeed_slow = 100;
        _this.nowSpeed = 0; //当前速度
        _this.lastSpeed = 100; //上一次移动速度
        _this.AI_interval = 1; //ai间隔
        _this.stopDistance = 250; //停止距离
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 25000; //手里剑攻击作用力
        _this.beHitForce_x = 25000; //普通攻击作用力
        _this.beHitForce_y_shuriken = 50000; //普通攻击作用力
        _this.beHitForce_x_attack3 = 350000; //被击飞作用力
        _this.beHitForce_y_attack3 = 0; //被击飞作用力
        _this.scaleX_skeleton = 0;
        _this.isDie = false;
        _this.skeleton = null;
        _this.enemyAnimation = null;
        _this.rigibody = null;
        _this.boxCollider = null;
        _this.isSwordRainCd = false;
        _this.isMove = false; //是否处于移动状态
        _this.dmgCollider = null;
        _this.playerPosition = null;
        return _this;
    }
    E2controller.prototype.onLoad = function () {
        this.lastSpeed = this.moveSpeed_slow;
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E2controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E2controller.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        this.AI_interval += Math.random();
        this.AI_start();
    };
    E2controller.prototype.update = function () {
        if (this.isMove == false)
            return;
        this.farAwayPlayer();
    };
    E2controller.prototype.lateUpdate = function () {
        if (this.isMove == false)
            return;
    };
    E2controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "wall") {
            this.skeleton.node.scaleX = -this.skeleton.node.scaleX;
        }
    };
    E2controller.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E2controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E2controller.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E2controller.prototype.AI_start = function () {
        var _this = this;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.scheduleOnce(function () {
                _this.AI_start();
            }, 1);
            return;
        }
        var distance = Math.abs(this.getDistanceX());
        if (distance > this.stopDistance) {
            this.hit();
        }
        else {
            this.changeDirection();
            this.changeMovState(true);
            this.nowSpeed = this.lastSpeed == this.moveSpeed_slow ? this.moveSpeed_fast : this.moveSpeed_slow;
            var timeScale = this.nowSpeed == this.moveSpeed_fast ? 2 : 1;
            this.enemyAnimation.changeState(animationState_1.enemyState.move, timeScale, true);
            this.lastSpeed = this.nowSpeed;
            this.scheduleOnce(function () {
                if (_this.enemyAnimation.state != animationState_1.enemyState.move)
                    return;
                _this.idle();
            }, 2);
        }
    };
    E2controller.prototype.AI_stop = function () {
        this.idle();
    };
    E2controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E2controller.prototype.idle = function (isComeBackHead) {
        var _this = this;
        if (isComeBackHead === void 0) { isComeBackHead = true; }
        this.changeMovState(false);
        if (isComeBackHead) {
            this.comeBackHead();
        }
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.idle, 1, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.idle)
                return;
            _this.AI_start();
        }, this.AI_interval);
    };
    E2controller.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x > this.node.x ? this.scaleX_skeleton : -this.scaleX_skeleton;
        this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E2controller.prototype.comeBackHead = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x > this.node.x ? -this.scaleX_skeleton : this.scaleX_skeleton;
        this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E2controller.prototype.die = function () {
        this.isDie = true;
        this.node.active = false;
        this.hideHp();
        this.dieCount();
    };
    E2controller.prototype.knockDown2 = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.knock_down2, 1, false, true);
    };
    E2controller.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    E2controller.prototype.farAwayPlayer = function () {
        this.nowSpeed = this.skeleton.node.scaleX > 0 ? -Math.abs(this.nowSpeed) : Math.abs(this.nowSpeed);
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E2controller.prototype.hit = function () {
        if (animationState_1.enemyState[this.enemyAnimation.state].includes("get_hurt"))
            return;
        this.playerPosition = cc.v2(GameManager_1.default.instance.player.position);
        this.comeBackHead();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.attack, 1, false);
    };
    E2controller.prototype.shootArrow = function (trackEntry, event) {
        if (event.data.name == "Fire") {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.E2Shoot);
            var x = this.skeleton.node.scaleX > 0 ? this.node.x - 35 : this.node.x + 35;
            var y = this.node.y + 110;
            var angle = this.skeleton.node.scaleX > 0 ? -25 : -155;
            Events_1.default.instance.createArrow(this.node, cc.v2(x, y), this.playerPosition, angle, this.damage);
        }
    };
    E2controller.prototype.beHit = function (damage, dmgType) {
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
    E2controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E2controller.prototype.changeState_beHit = function (dmgType) {
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
                state = animationState_1.enemyState.knock_down1;
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
    E2controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E2controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E2controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E2controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E2controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E2controller.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    E2controller.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    E2controller.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    E2controller.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E2controller.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E2controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E2controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], E2controller.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], E2controller.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], E2controller.prototype, "dieEffectName", void 0);
    E2controller = __decorate([
        ccclass
    ], E2controller);
    return E2controller;
}(enemyBase_1.default));
exports.default = E2controller;

cc._RF.pop();