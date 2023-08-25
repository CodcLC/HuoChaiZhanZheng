"use strict";
cc._RF.push(module, '3c2b2qSASdDAb0yATGO+Rap', 'spiderlingController');
// scripts/game/spiderlingController.ts

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
var enemyAnimation_1 = require("./enemyAnimation");
var enemyBase_1 = require("./enemyBase");
var enemyHitCollider_1 = require("./enemyHitCollider");
var Events_1 = require("./Events");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["fall"] = 0] = "fall";
    damageCollider[damageCollider["bomb"] = 1] = "bomb";
})(damageCollider || (damageCollider = {}));
var spiderlingController = /** @class */ (function (_super) {
    __extends(spiderlingController, _super);
    function spiderlingController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.landingFx = null;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed = 150; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.2; //ai间隔
        _this.stopDistance = 30; //停止距离
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 0; //手里剑攻击作用力
        _this.beHitForce_x = 0; //普通攻击作用力
        _this.beHitForce_y_shuriken = 0; //普通攻击作用力
        _this.beHitForce_x_attack3 = 100000; //被击飞作用力
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
        _this.isWarning = false;
        _this.isWuDi = true;
        _this.warn_a = {
            a: 0
        };
        return _this;
    }
    spiderlingController.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    spiderlingController.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    spiderlingController.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        this.enemyAnimation.changeState(animationState_1.enemyState.Fall, 1, false);
        this.showDamageCollider(damageCollider.fall);
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E40Start);
    };
    spiderlingController.prototype.update = function () {
        this.warningAnimation();
        if (this.isMove == false)
            return;
        var distance = this.getDistanceX();
        if (Math.abs(distance) < this.stopDistance) {
            this.idle();
        }
        else {
            if (this.enemyAnimation.state == animationState_1.enemyState.attack)
                return;
            this.moveToPlayer();
        }
    };
    spiderlingController.prototype.warningAnimation = function () {
        if (this.isWarning) {
            //@ts-ignore
            this.skeleton._skeleton.slots[4].color["a"] = this.warn_a.a;
        }
    };
    spiderlingController.prototype.startWarning = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E40Alert, false, 0.6);
        this.skeleton.setAttachment("Untitled-4", "Untitled-4");
        this.isWarning = true;
        cc.tween(this.warn_a)
            .repeatForever(cc.tween()
            .to(0.1, { a: 1 })
            .to(0.1, { a: 0.1 }))
            .start();
        this.scheduleOnce(this.die, 2.5);
    };
    spiderlingController.prototype.stopWarn = function () {
        this.isWarning = false;
        cc.Tween.stopAllByTarget(this.warn_a);
        this.warn_a.a = 0;
    };
    spiderlingController.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "wall") {
            contact.disabled = true;
        }
    };
    spiderlingController.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    spiderlingController.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    spiderlingController.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    spiderlingController.prototype.AI_start = function () {
        var _this = this;
        this.changeDirection();
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
            this.idle();
        }
        else {
            this.changeDirection();
            this.enemyAnimation.changeState(animationState_1.enemyState.Move, 1, true);
            this.changeMovState(true);
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
        }
    };
    spiderlingController.prototype.AI_stop = function () {
        this.idle();
    };
    spiderlingController.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    spiderlingController.prototype.idle = function () {
        var _this = this;
        if (this.enemyAnimation.state != animationState_1.enemyState.Stop) {
            this.enemyAnimation.changeState(animationState_1.enemyState.Stop, 1, true, true);
        }
        this.changeMovState(false);
        //this.changeDirection();
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.Stop)
                return;
            _this.AI_start();
        }, this.AI_interval);
    };
    spiderlingController.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    spiderlingController.prototype.die = function () {
        var _this = this;
        if (this.isDie)
            return;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E40Exposion, false, 0.6);
        this.isDie = true;
        this.node.opacity = 0;
        this.node.getComponent(cc.BoxCollider).enabled = false;
        this.hideHp();
        this.showDamageCollider(damageCollider.bomb);
        this.unscheduleAllCallbacks();
        cc.Tween.stopAllByTarget(this.node);
        this.scheduleOnce(function () {
            if (!_this.getDamageCollider())
                return;
            _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage, true);
        }, 0);
        var x = this.node.scaleX < 0 ? this.node.x + this.damageLabelOffsetX : this.node.x - this.damageLabelOffsetX;
        var y = this.node.y + this.damageLabelOffsetY;
        Events_1.default.instance.createEnemyDieEffect(this.node, this.dieEffectName, cc.v2(x, y));
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 1);
    };
    spiderlingController.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    spiderlingController.prototype.born = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E40Born);
        this.enemyAnimation.changeState(animationState_1.enemyState.Born, 1, false, true);
    };
    spiderlingController.prototype.bornComplete = function () {
        this.isWuDi = false;
        this.idle();
        this.scheduleOnce(this.startWarning, 2);
    };
    //落地
    spiderlingController.prototype.attack_fall = function () {
        this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(this.node, this.damage);
        var fx = caijiTools_1.caijiTools.createNode(this.landingFx, this.node.parent);
        fx.setSiblingIndex(this.node.getSiblingIndex() + 1);
        fx.setPosition(this.node.position);
        fx.active = true;
    };
    spiderlingController.prototype.Knock_up2 = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Knock_up2, 1, false, true);
    };
    spiderlingController.prototype.Knock_up3 = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Knock_up3, 1, false, true);
    };
    spiderlingController.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Get_up, 1, false, true);
    };
    spiderlingController.prototype.hit = function () {
        var _this = this;
        if (animationState_1.enemyState[this.enemyAnimation.state].includes("get_hurt"))
            return;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.showDamageCollider(damageCollider.fall);
        this.enemyAnimation.changeState(animationState_1.enemyState.attack, 1, false);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state == animationState_1.enemyState.attack) {
                _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
            }
        }, 0.5);
    };
    spiderlingController.prototype.beHit = function (damage, dmgType) {
        if (this.isWuDi)
            return;
        this.changeMovState(false);
        this.setRigibodySpeed(0);
        var isContinue = this.checkIsSwordRain(dmgType); //设置剑雨攻击间隔
        if (isContinue == 0)
            return;
        this.highLight();
        this.showHp();
        this.changeState_beHit(dmgType);
        var x = this.node.scaleX < 0 ? this.node.x + this.damageLabelOffsetX : this.node.x - this.damageLabelOffsetX;
        var y = this.node.y + this.damageLabelOffsetY;
        Events_1.default.instance.showDamageLabel_enemy(this.node, damage, cc.v2(x, y));
        if (this.hp <= 0) {
            //Events.instance.createEnemyDieEffect(this.node, this.dieEffectName, cc.v2(x, y));
        }
        this.updateHp(damage);
    };
    spiderlingController.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    spiderlingController.prototype.changeState_beHit = function (dmgType) {
        var _this = this;
        if (this.isSuperArmor)
            return;
        var state = null;
        var isKnockDown = dmgType == animationState_1.attackType.attack3 ? true : false;
        switch (dmgType) {
            case animationState_1.attackType.attack1:
                state = animationState_1.enemyState.Get_Hit;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, 0));
                break;
            case animationState_1.attackType.attack2:
                state = animationState_1.enemyState.Get_Hit;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, 0));
                break;
            case animationState_1.attackType.attack3:
                this.setLinearDamping(0);
                this.scheduleOnce(function () {
                    _this.setLinearDamping(5);
                }, 0.4);
                state = animationState_1.enemyState.Knock_up1;
                if (this.node.x < GameManager_1.default.instance.player.x && GameManager_1.default.instance.playerController.skeleton.node.scaleX < 0) {
                    this.applyForce(cc.v2(-this.beHitForce_x_attack3, this.beHitForce_y_attack3));
                }
                else if (this.node.x > GameManager_1.default.instance.player.x && GameManager_1.default.instance.playerController.skeleton.node.scaleX > 0) {
                    this.applyForce(cc.v2(this.beHitForce_x_attack3, this.beHitForce_y_attack3));
                }
                break;
            case animationState_1.attackType.jumpHit:
                state = animationState_1.enemyState.Get_Hit;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, 0));
                break;
            case animationState_1.attackType.shuriken:
                state = animationState_1.enemyState.Get_Hit;
                this.applyForce(cc.v2(GameManager_1.default.instance.player.x > this.node.x ? -this.beHitForce_x : this.beHitForce_x, this.beHitForce_y_shuriken));
                break;
            case animationState_1.attackType.swordRain:
                state = animationState_1.enemyState.Get_Hit;
                break;
            default:
        }
        this.enemyAnimation.changeState(state, 1, false, isKnockDown);
    };
    spiderlingController.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    spiderlingController.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    spiderlingController.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    spiderlingController.prototype.checkIsSwordRain = function (dmgType) {
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
    spiderlingController.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    spiderlingController.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    spiderlingController.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    spiderlingController.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    spiderlingController.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    spiderlingController.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    __decorate([
        property(cc.Prefab)
    ], spiderlingController.prototype, "landingFx", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], spiderlingController.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], spiderlingController.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], spiderlingController.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], spiderlingController.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], spiderlingController.prototype, "dieEffectName", void 0);
    spiderlingController = __decorate([
        ccclass
    ], spiderlingController);
    return spiderlingController;
}(enemyBase_1.default));
exports.default = spiderlingController;

cc._RF.pop();