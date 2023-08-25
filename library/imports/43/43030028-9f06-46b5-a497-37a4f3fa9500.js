"use strict";
cc._RF.push(module, '43030AonwZGtaSXN6Tz+pUA', 'E29controller');
// scripts/game/E29controller.ts

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
var enemyHitCollider_1 = require("./enemyHitCollider");
var Events_1 = require("./Events");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
    damageCollider[damageCollider["bomb"] = 1] = "bomb";
})(damageCollider || (damageCollider = {}));
var E29controller = /** @class */ (function (_super) {
    __extends(E29controller, _super);
    function E29controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.atlas = null;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed = 110; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.6; //ai间隔
        _this.stopDistance = 100; //停止距离
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 25000; //手里剑攻击作用力
        _this.beHitForce_x = 20000; //普通攻击作用力
        _this.beHitForce_y_shuriken = 50000; //普通攻击作用力
        _this.beHitForce_x_attack3 = 330000; //被击飞作用力
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
        _this.alpha = {
            number: 0
        };
        return _this;
    }
    E29controller.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E29controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E29controller.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        this.AI_interval += Math.random();
        this.AI_start();
    };
    E29controller.prototype.update = function () {
        if (this.enemyAnimation.state == animationState_1.enemyState["Head-middle"]) {
            this.setColor([1.0, 0.0, 0.0, this.alpha.number]);
        }
        if (this.isMove == false)
            return;
        var distance = this.getDistanceX();
        if (Math.abs(distance) < this.stopDistance) {
            this.hit();
        }
        else {
            if (this.enemyAnimation.state == animationState_1.enemyState.Atk)
                return;
            this.moveToPlayer();
        }
    };
    E29controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
        }
    };
    E29controller.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E29controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E29controller.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null || this.dmgCollider == damageCollider.bomb)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E29controller.prototype.AI_start = function () {
        var _this = this;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动d
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
            this.enemyAnimation.changeState(animationState_1.enemyState.Move, 1.1, true);
            this.changeMovState(true);
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
        }
    };
    E29controller.prototype.AI_stop = function () {
        this.idle();
    };
    E29controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E29controller.prototype.idle = function () {
        var _this = this;
        if (this.isDie)
            return;
        this.changeMovState(false);
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.Idle)
                return;
            _this.AI_start();
        }, this.AI_interval);
    };
    E29controller.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        this.hpNode.x = this.skeleton.node.scaleX > 0 ? 8 : -8;
    };
    E29controller.prototype.die = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        this.isDie = true;
        this.hideHp();
        this.closeHighLight();
        this.setRigibodySpeed(0, 0);
        this.node.getComponent(cc.BoxCollider).enabled = false;
        this.enemyAnimation.changeState(animationState_1.enemyState.Die, 1, false, true);
        this.scheduleOnce(function () {
            _this.rigibody.type = cc.RigidBodyType.Static;
        }, 0);
        this.dieCount();
        this.scheduleOnce(function () {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.E29Explosion);
        }, 0.1);
    };
    //头缩放
    E29controller.prototype.head_middle = function () {
        this.startRedColor();
        this.showDamageCollider(damageCollider.bomb);
        this.enemyAnimation.changeState(animationState_1.enemyState["Head-middle"], 1.2, true, true);
        this.scheduleOnce(this.head_end, 2.3);
        cc.tween(this.alpha)
            .repeat(2, cc.tween()
            .to(0.65, { number: 0.7 }, { easing: "sineOut" })
            .to(0.65, { number: 0 }, { easing: "sineIn" }))
            .start();
    };
    //头爆炸
    E29controller.prototype.head_end = function () {
        var _this = this;
        this.closeHighLight();
        this.enemyAnimation.changeState(animationState_1.enemyState["Head-end"], 1.3, false, true);
        this.scheduleOnce(function () {
            if (!_this.getDamageCollider())
                return;
            _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
        }, 0.45);
    };
    E29controller.prototype.Destroy = function () {
        this.node.destroy();
    };
    E29controller.prototype.getUp = function () {
        var _this = this;
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state == animationState_1.enemyState["Knock-up-end"]) {
                _this.enemyAnimation.changeState(animationState_1.enemyState["Get-up"], 1, false, true);
            }
        }, 0.3);
    };
    E29controller.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E29controller.prototype.hit = function () {
        var _this = this;
        if (animationState_1.enemyState[this.enemyAnimation.state].includes("Hit"))
            return;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.showDamageCollider(damageCollider.attack);
        this.enemyAnimation.changeState(animationState_1.enemyState.Atk, 1, false);
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E29Attack);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state == animationState_1.enemyState.Atk) {
                _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
                _this.scheduleOnce(function () {
                    if (_this.enemyAnimation.state == animationState_1.enemyState.Atk) {
                        _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
                    }
                }, 0.8);
            }
        }, 1.1);
    };
    E29controller.prototype.beHit = function (damage, dmgType) {
        if (this.isDie)
            return;
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
    E29controller.prototype.knockDownLoop = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState["Knock-up-loop"], 1, false, true);
    };
    E29controller.prototype.knockDownEnd = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState["Knock-up-end"], 1, false, true);
    };
    E29controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E29controller.prototype.changeState_beHit = function (dmgType) {
        var _this = this;
        if (this.isSuperArmor)
            return;
        var state = null;
        var isKnockDown = dmgType == animationState_1.attackType.attack3 ? true : false;
        switch (dmgType) {
            case animationState_1.attackType.attack1:
                state = animationState_1.enemyState.Hit;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, 0));
                break;
            case animationState_1.attackType.attack2:
                state = animationState_1.enemyState.Hit;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, 0));
                break;
            case animationState_1.attackType.attack3:
                this.setLinearDamping(0);
                this.scheduleOnce(function () {
                    _this.setLinearDamping(5);
                }, 0.2);
                state = animationState_1.enemyState["Knock-up-start"];
                if (this.node.x < GameManager_1.default.instance.player.x && GameManager_1.default.instance.playerController.skeleton.node.scaleX < 0) {
                    this.applyForce(cc.v2(-this.beHitForce_x_attack3, this.beHitForce_y_attack3));
                }
                else if (this.node.x > GameManager_1.default.instance.player.x && GameManager_1.default.instance.playerController.skeleton.node.scaleX > 0) {
                    this.applyForce(cc.v2(this.beHitForce_x_attack3, this.beHitForce_y_attack3));
                }
                break;
            case animationState_1.attackType.jumpHit:
                state = animationState_1.enemyState.Hit;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, 0));
                break;
            case animationState_1.attackType.shuriken:
                state = animationState_1.enemyState.Hit;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, this.beHitForce_y_shuriken));
                break;
            case animationState_1.attackType.swordRain:
                state = animationState_1.enemyState.Hit;
                break;
            default:
        }
        this.enemyAnimation.changeState(state, 1, false, isKnockDown);
    };
    E29controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E29controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E29controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E29controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E29controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E29controller.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    E29controller.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    //头部变大闪红
    E29controller.prototype.startRedColor = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 0.0, 0.0, 0.0]);
    };
    E29controller.prototype.setColor = function (color) {
        this.skeleton.getMaterial(0).setProperty("highLightColor", color);
    };
    E29controller.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    E29controller.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E29controller.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E29controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E29controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], E29controller.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], E29controller.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], E29controller.prototype, "dieEffectName", void 0);
    E29controller = __decorate([
        ccclass
    ], E29controller);
    return E29controller;
}(enemyBase_1.default));
exports.default = E29controller;

cc._RF.pop();