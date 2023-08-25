"use strict";
cc._RF.push(module, 'e3b681/uxlMAKcudJJn8jsX', 'miniBossFlag');
// scripts/game/miniBossFlag.ts

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
var FX_flagThunder_1 = require("./FX_flagThunder");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
})(damageCollider || (damageCollider = {}));
var miniBoss = /** @class */ (function (_super) {
    __extends(miniBoss, _super);
    function miniBoss() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.thunderPre = null;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed = 150; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 1; //ai间隔
        _this.stopDistance = 130; //停止距离
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 25000; //手里剑攻击作用力
        _this.beHitForce_x = 25000; //普通攻击作用力
        _this.beHitForce_y_shuriken = 50000; //普通攻击作用力
        _this.beHitForce_x_attack3 = 350000; //被击飞作用力
        _this.beHitForce_y_attack3 = 0; //被击飞作用力
        _this.scaleX_skeleton = 0;
        _this.isDie = false;
        _this.isWuDu = true;
        _this.skeleton = null;
        _this.enemyAnimation = null;
        _this.rigibody = null;
        _this.boxCollider = null;
        _this.isSwordRainCd = false;
        _this.isMove = false; //是否处于移动状态
        _this.dmgCollider = null;
        _this.isWarning = false;
        _this.warn_a = {
            a: 0
        };
        return _this;
    }
    miniBoss.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    miniBoss.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations)
    };
    miniBoss.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E27LightningTotemFall);
    };
    miniBoss.prototype.appearFinished = function () {
        this.isWuDu = false;
        this.idle();
    };
    miniBoss.prototype.update = function () {
        this.warningAction();
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
    miniBoss.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
        }
    };
    miniBoss.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    miniBoss.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    miniBoss.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    miniBoss.prototype.AI_start = function () {
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
            var moveState = ["move", "move2", "run"];
            var randomState = moveState[caijiTools_1.caijiTools.random_int(0, moveState.length - 1)];
            this.enemyAnimation.changeState(animationState_1.enemyState[randomState], 1, true);
            switch (this.enemyAnimation.state) {
                case animationState_1.enemyState.move:
                    this.nowSpeed = this.moveSpeed;
                    break;
                case animationState_1.enemyState.move2:
                    this.nowSpeed = this.moveSpeed;
                    break;
                case animationState_1.enemyState.run:
                    this.nowSpeed = this.moveSpeed * 1.8;
                    break;
            }
            this.changeMovState(moveState.includes(this.skeleton.animation));
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.nowSpeed : this.nowSpeed;
        }
    };
    miniBoss.prototype.AI_stop = function () {
        this.idle();
    };
    miniBoss.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    miniBoss.prototype.idle = function () {
        var _this = this;
        this.changeMovState(false);
        //this.changeDirection();
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.idle, 1, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.idle)
                return;
            _this.warning();
        }, 2);
    };
    miniBoss.prototype.warning = function () {
        this.isWarning = true;
        this.skeleton.setAttachment("images/totem/eff_light", "images/totem/eff_light");
        this.skeleton.setAttachment("images/totem/eff_light2", "images/totem/eff_light");
        cc.tween(this.warn_a)
            .repeatForever(cc.tween()
            .to(0.1, { a: 1 }, { "easing": "sineOut" })
            .to(0.1, { a: 0.1 }, { "easing": "sineIn" }))
            .start();
        this.scheduleOnce(this.bomb, 2);
    };
    miniBoss.prototype.warningAction = function () {
        if (this.isWarning == false)
            return;
        //@ts-ignore
        this.skeleton._skeleton.slots[4].color["a"] = this.warn_a.a;
        //@ts-ignore
        this.skeleton._skeleton.slots[5].color["a"] = this.warn_a.a;
    };
    miniBoss.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    miniBoss.prototype.die = function () {
        if (this.isDie)
            return;
        this.isDie = true;
        this.isWarning = false;
        this.hideHp();
        //@ts-ignore
        this.skeleton._skeleton.slots[4].color["a"] = 0;
        //@ts-ignore
        this.skeleton._skeleton.slots[5].color["a"] = 0;
        this.enemyAnimation.changeState(animationState_1.enemyState.die, 1, false, true);
        this.dieCount();
    };
    //召唤闪电
    miniBoss.prototype.bomb = function () {
        if (this.isDie)
            return;
        this.isDie = true;
        this.isWarning = false;
        this.hideHp();
        //@ts-ignore
        this.skeleton._skeleton.slots[4].color["a"] = 0;
        //@ts-ignore
        this.skeleton._skeleton.slots[5].color["a"] = 0;
        this.enemyAnimation.changeState(animationState_1.enemyState.die, 1, false, true);
        this.FX_thunder();
    };
    //闪电
    miniBoss.prototype.FX_thunder = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.ThunderTotemStruck);
        var thunder = cc.instantiate(this.thunderPre);
        thunder.setParent(this.node.parent);
        thunder.setPosition(this.node.position);
        thunder.setSiblingIndex(GameManager_1.default.instance.player.getSiblingIndex() + 1);
        thunder.getComponent(FX_flagThunder_1.default).damage = this.damage;
        thunder.active = true;
    };
    miniBoss.prototype.dieEnd = function () {
        this.node.destroy();
    };
    miniBoss.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    miniBoss.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    miniBoss.prototype.hit = function () {
        var _this = this;
        if (animationState_1.enemyState[this.enemyAnimation.state].includes("get_hurt"))
            return;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.showDamageCollider(damageCollider.attack);
        this.enemyAnimation.changeState(animationState_1.enemyState.attack, 1, false);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state == animationState_1.enemyState.attack) {
                _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
            }
        }, 0.5);
    };
    miniBoss.prototype.beHit = function (damage, dmgType) {
        if (this.isDie || this.isWuDu)
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
    miniBoss.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    miniBoss.prototype.changeState_beHit = function (dmgType) {
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
    miniBoss.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    miniBoss.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    miniBoss.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    miniBoss.prototype.checkIsSwordRain = function (dmgType) {
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
    miniBoss.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    miniBoss.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    miniBoss.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    miniBoss.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    miniBoss.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    miniBoss.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    __decorate([
        property(cc.Prefab)
    ], miniBoss.prototype, "thunderPre", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], miniBoss.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], miniBoss.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], miniBoss.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], miniBoss.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], miniBoss.prototype, "dieEffectName", void 0);
    miniBoss = __decorate([
        ccclass
    ], miniBoss);
    return miniBoss;
}(enemyBase_1.default));
exports.default = miniBoss;

cc._RF.pop();