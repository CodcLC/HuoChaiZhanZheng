"use strict";
cc._RF.push(module, 'fe1afyCfE1MI7Aism487GSA', 'E20controller');
// scripts/game/E20controller.ts

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
var firePillarCollider_1 = require("./firePillarCollider");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
})(damageCollider || (damageCollider = {}));
var E20controller = /** @class */ (function (_super) {
    __extends(E20controller, _super);
    function E20controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.firePillar = null;
        _this.tpFx_start = null;
        _this.tpFx_end = null;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed = 80; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.8; //ai间隔
        _this.stopDistance = 400; //停止距离
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 35000; //手里剑攻击作用力
        _this.beHitForce_x = 25000; //普通攻击作用力
        _this.beHitForce_y_shuriken = 50000; //普通攻击作用力
        _this.beHitForce_x_attack3 = 400000; //被击飞作用力
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
        _this.isTPCD = false; //被攻击自动tp冷却
        return _this;
    }
    E20controller.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E20controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E20controller.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        this.AI_interval += Math.random();
        this.idle();
    };
    E20controller.prototype.update = function () {
        if (this.isMove == false)
            return;
        var distance = this.getDistanceX();
        if (Math.abs(distance) < this.stopDistance) {
            this.skill_start();
        }
        else {
            if (this.enemyAnimation.state == animationState_1.enemyState.attack)
                return;
            this.moveToPlayer();
        }
    };
    E20controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
        }
    };
    E20controller.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E20controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E20controller.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E20controller.prototype.AI_start = function () {
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
            if (distance > 150) {
                this.skill_start();
            }
            else {
                this.teleportStart();
            }
        }
        else {
            var random = caijiTools_1.caijiTools.random_int(1, 10);
            if (random % 2 == 0) {
                this.skill_start();
                return;
            }
            this.changeDirection();
            this.enemyAnimation.changeState(animationState_1.enemyState.move, 1, true, true, true);
            this.changeMovState(true);
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
        }
    };
    E20controller.prototype.AI_stop = function () {
        this.idle();
    };
    E20controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E20controller.prototype.idle = function () {
        var _this = this;
        this.changeMovState(false);
        this.changeDirection();
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.idle, 1, true, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.idle)
                return;
            _this.AI_start();
        }, this.AI_interval);
    };
    E20controller.prototype.changeDirection = function () {
        if (GameManager_1.default.instance.player == null)
            return;
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E20controller.prototype.die = function () {
        this.isDie = true;
        this.node.active = false;
        this.hideHp();
        this.dieCount();
    };
    E20controller.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E20controller.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    E20controller.prototype.knockDown2 = function () {
        var _this = this;
        this.enemyAnimation.changeState(animationState_1.enemyState.knock_down2, 1, false, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.knock_down2)
                return;
            _this.getUp();
        }, 0.5);
    };
    E20controller.prototype.skill_start = function () {
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.fire_pillar, 1, false, true, true);
    };
    //持续施法中  无法打断
    E20controller.prototype.skill_middle = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E20Cast);
        this.openSuperArmor();
        this.enemyAnimation.changeState(animationState_1.enemyState.fire_pillar2, 1, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.fire_pillar2)
                return;
            _this.skill_end();
        }, 2.5);
        //施法
        this.schedule(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.fire_pillar2)
                return;
            _this.createFirePillar(GameManager_1.default.instance.player.position);
        }, 0.8, 2, 0.001);
    };
    E20controller.prototype.skill_end = function () {
        this.closeSuperArmor();
        this.enemyAnimation.changeState(animationState_1.enemyState.fire_pillar3, 1, false, true);
    };
    //创建火柱
    E20controller.prototype.createFirePillar = function (pos) {
        var fire = cc.instantiate(this.firePillar);
        fire.setParent(this.node.parent);
        fire.setSiblingIndex(this.node.getSiblingIndex());
        fire.setPosition(pos.x, -194);
        fire.getComponent(firePillarCollider_1.default).damage = this.damage;
        fire.active = true;
    };
    //传送隐身
    E20controller.prototype.blink = function (trackEntry, event) {
        if (event.data.name == "Blink") {
            this.closeCollider();
            this.createFX();
        }
        else {
            this.transportEnd();
        }
    };
    //传送动作开始
    E20controller.prototype.teleportStart = function () {
        this.isTPCD = true;
        this.openSuperArmor();
        this.enemyAnimation.changeState(animationState_1.enemyState.teleport, 1, false, true, true);
        this.scheduleOnce(function () {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.BlinkStart);
        }, 0.2);
    };
    //传送至指定地点
    E20controller.prototype.transportEnd = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.BlinkEnd);
        var x = 0;
        if (GameManager_1.default.instance.player.x < 700) {
            x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(300, cc.winSize.width / 1.6);
        }
        else if (GameManager_1.default.instance.player.x > 1700) {
            x = GameManager_1.default.instance.player.x - caijiTools_1.caijiTools.random_int(300, cc.winSize.width / 1.6);
        }
        else {
            var random = caijiTools_1.caijiTools.random_int(1, 10);
            x = random % 2 == 0 ?
                GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width / 1.6, -300) :
                GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(300, cc.winSize.width / 1.6);
        }
        this.node.x = x;
        this.createFX();
        this.scheduleOnce(function () {
            _this.closeSuperArmor();
            _this.openCollider();
        }, 0.2);
    };
    E20controller.prototype.createFX = function () {
        var fx = cc.instantiate(this.tpFx_start);
        fx.setParent(this.node.parent);
        fx.setSiblingIndex(this.node.getSiblingIndex() + 1);
        fx.setPosition(this.node.x, this.node.y + this.damageLabelOffsetY);
        fx.active = true;
    };
    E20controller.prototype.hit = function () {
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
    E20controller.prototype.beHit = function (damage, dmgType) {
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
    E20controller.prototype.openSuperArmor = function () {
        this.isSuperArmor = true;
    };
    E20controller.prototype.closeSuperArmor = function () {
        this.isSuperArmor = false;
    };
    E20controller.prototype.closeCollider = function () {
        this.node.opacity = 0;
        this.boxCollider.enabled = false;
        this.boxCollider.apply();
        this.node.getComponent(cc.BoxCollider).enabled = false;
        this.hideHp();
    };
    E20controller.prototype.openCollider = function () {
        this.node.opacity = 255;
        this.boxCollider.enabled = true;
        this.boxCollider.apply();
        this.node.getComponent(cc.BoxCollider).enabled = true;
    };
    E20controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E20controller.prototype.changeState_beHit = function (dmgType) {
        var _this = this;
        if (this.isSuperArmor)
            return;
        if (this.isTPCD == false) {
            this.teleportStart();
            this.scheduleOnce(function () {
                _this.isTPCD = false;
            }, 5);
            return;
        }
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
    E20controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E20controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E20controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E20controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E20controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E20controller.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    E20controller.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    E20controller.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    E20controller.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E20controller.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    __decorate([
        property(cc.Prefab)
    ], E20controller.prototype, "firePillar", void 0);
    __decorate([
        property(cc.Prefab)
    ], E20controller.prototype, "tpFx_start", void 0);
    __decorate([
        property(cc.Prefab)
    ], E20controller.prototype, "tpFx_end", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E20controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E20controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], E20controller.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], E20controller.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], E20controller.prototype, "dieEffectName", void 0);
    E20controller = __decorate([
        ccclass
    ], E20controller);
    return E20controller;
}(enemyBase_1.default));
exports.default = E20controller;

cc._RF.pop();