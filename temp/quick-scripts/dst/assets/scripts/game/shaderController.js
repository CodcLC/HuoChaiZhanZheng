
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/shaderController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc2hhZGVyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBMkM7QUFDM0MsbURBQTBEO0FBQzFELG1EQUE4QztBQUM5Qyx5Q0FBb0M7QUFDcEMsdURBQWtEO0FBQ2xELG1DQUE4QjtBQUM5Qiw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsSUFBSyxjQUdKO0FBSEQsV0FBSyxjQUFjO0lBQ2YsdURBQU0sQ0FBQTtJQUNOLHFEQUFLLENBQUE7QUFDVCxDQUFDLEVBSEksY0FBYyxLQUFkLGNBQWMsUUFHbEI7QUFFRDtJQUE4QyxvQ0FBUztJQUF2RDtRQUFBLHFFQWdWQztRQTdVRyxhQUFPLEdBQVMsSUFBSSxDQUFDO1FBRXJCLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQix3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFL0IsWUFBTSxHQUFZLElBQUksQ0FBQztRQUV2QixXQUFLLEdBQW1CLElBQUksQ0FBQztRQUU3QixtQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUUzQixlQUFTLEdBQVcsRUFBRSxDQUFDLENBQUEsTUFBTTtRQUM3QixjQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUMzQixpQkFBVyxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDaEMsa0JBQVksR0FBUSxHQUFHLENBQUMsQ0FBQSxNQUFNO1FBQzlCLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFDZixhQUFPLEdBQVEsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUN2QixrQkFBWSxHQUFXLEtBQUssQ0FBQyxDQUFBLFVBQVU7UUFDdkMsa0JBQVksR0FBVyxLQUFLLENBQUEsQ0FBQSxTQUFTO1FBQ3JDLDJCQUFxQixHQUFXLEtBQUssQ0FBQSxDQUFBLFNB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LFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQztnRUFDcEI7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7Z0VBQ3BCO0lBRS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ0s7SUFFdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDSTtJQUU3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNPO0lBYlYsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FnVnBDO0lBQUQsdUJBQUM7Q0FoVkQsQUFnVkMsQ0FoVjZDLG1CQUFTLEdBZ1Z0RDtrQkFoVm9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZW5lbXlTdGF0ZSB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5pbXBvcnQgZW5lbXlBbmltYXRpb24gZnJvbSBcIi4vZW5lbXlBbmltYXRpb25cIjtcbmltcG9ydCBlbmVteUJhc2UgZnJvbSBcIi4vZW5lbXlCYXNlXCI7XG5pbXBvcnQgZW5lbXlIaXRDb2xsaWRlciBmcm9tIFwiLi9lbmVteUhpdENvbGxpZGVyXCI7XG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL0V2ZW50c1wiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVye1xuICAgIGF0dGFjayxcbiAgICBza2lsbFxufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNoYWRlckNvbnRyb2xsZXIgZXh0ZW5kcyBlbmVteUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc21va2VGWDpjYy5Ob2RlPW51bGw7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceOi9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRYOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuS8pOWus+aViOaenHnovbTlgY/np7vlgLxcIiB9KVxuICAgIGRhbWFnZUxhYmVsT2Zmc2V0WTogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBocE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBocEJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TdHJpbmcpXG4gICAgZGllRWZmZWN0TmFtZTogc3RyaW5nID0gXCJcIjtcblxuICAgIG1vdmVTcGVlZDogbnVtYmVyID0gODA7Ly/np7vliqjpgJ/luqZcbiAgICBub3dTcGVlZDogbnVtYmVyID0gMDsvL+W9k+WJjemAn+W6plxuICAgIEFJX2ludGVydmFsOiBudW1iZXIgPSAwLjc7Ly9haemXtOmalFxuICAgIHN0b3BEaXN0YW5jZTpudW1iZXI9MTMwOy8v5YGc5q2i6Led56a7XG4gICAgaHA6IG51bWJlciA9IDA7XG4gICAgaHBUaW1lczpudW1iZXI9MTsvL+ihgOmHj+WAjeaVsFxuICAgIGJlSGl0Rm9yY2VfeTogbnVtYmVyID0gMjUwMDA7Ly/miYvph4zliZHmlLvlh7vkvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3g6IG51bWJlciA9IDI1MDAwLy/mma7pgJrmlLvlh7vkvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3lfc2h1cmlrZW46IG51bWJlciA9IDUwMDAwLy/mma7pgJrmlLvlh7vkvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3hfYXR0YWNrMzogbnVtYmVyID0gMzUwMDAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV95X2F0dGFjazM6IG51bWJlciA9IDA7Ly/ooqvlh7vpo57kvZznlKjliptcbiAgICBzY2FsZVhfc2tlbGV0b246IG51bWJlciA9IDA7XG4gICAgYWxsb3dBdHRhY2tUaW1lczpudW1iZXI9MzsvL+WFgeiuuOi/nue7reaZrumAmuaUu+WHu+asoeaVsFxuICAgIG5vd0F0dGFja1RpbWVzOm51bWJlcj0zOy8v5b2T5YmN6L+e57ut5pmu6YCa5pS75Ye75qyh5pWwXG4gICAgaXNEaWU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBza2VsZXRvbjogc3AuU2tlbGV0b24gPSBudWxsO1xuICAgIGVuZW15QW5pbWF0aW9uOiBlbmVteUFuaW1hdGlvbiA9IG51bGw7XG4gICAgcmlnaWJvZHk6IGNjLlJpZ2lkQm9keSA9IG51bGw7XG4gICAgYm94Q29sbGlkZXI6IGNjLlBoeXNpY3NCb3hDb2xsaWRlciA9IG51bGw7XG4gICAgaXNTd29yZFJhaW5DZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTW92ZTogYm9vbGVhbiA9IGZhbHNlOy8v5piv5ZCm5aSE5LqO56e75Yqo54q25oCBXG4gICAgaXNXdURpOmJvb2xlYW49ZmFsc2U7XG4gICAgZG1nQ29sbGlkZXI6ZGFtYWdlQ29sbGlkZXI9bnVsbDtcbiAgICBzbW9rZVBhcnRpY2xlX0JsYWNrOmNjLlBhcnRpY2xlU3lzdGVtM0Q9bnVsbDtcbiAgICBzbW9rZVBhcnRpY2xlX1JlZDpjYy5QYXJ0aWNsZVN5c3RlbTNEPW51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgdGhpcy5zY2FsZVhfc2tlbGV0b24gPSBNYXRoLmFicyh0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbiA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoZW5lbXlBbmltYXRpb24pO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmVuZW15Q29udHJvbGxlciA9IHRoaXM7XG4gICAgICAgIHRoaXMucmlnaWJvZHkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcik7XG4gICAgICAgIHRoaXMuc21va2VQYXJ0aWNsZV9CbGFjaz10aGlzLnNtb2tlRlguZ2V0Q29tcG9uZW50KGNjLlBhcnRpY2xlU3lzdGVtM0QpO1xuICAgICAgICB0aGlzLnNtb2tlUGFydGljbGVfUmVkPXRoaXMuc21va2VGWC5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0zRCk7XG4gICAgfVxuICAgIG9uRW5hYmxlKCl7XG4gICAgICAgIHRoaXMubm9kZS55PS0yMTY7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5za2VsZXRvbi5za2VsZXRvbkRhdGEuX3NrZWxldG9uQ2FjaGUuYW5pbWF0aW9ucyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5ocCA9IHRoaXMuaHBNYXgqdGhpcy5ocFRpbWVzO1xuICAgICAgICB0aGlzLkFJX2ludGVydmFsKz1NYXRoLnJhbmRvbSgpO1xuICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxuICAgICAgICAudG8oMC4yLHt5Oi0xNjUuNH0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTW92ZSA9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICBsZXQgZGlzdGFuY2UgPSB0aGlzLmdldERpc3RhbmNlWCgpO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpIDwgdGhpcy5zdG9wRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZih0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlPT1lbmVteVN0YXRlLmF0dGFjaykgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG9QbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkJlZ2luQ29udGFjdChjb250YWN0OiBjYy5QaHlzaWNzQ29udGFjdCwgc2VsZkNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIsIG90aGVyQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlcikge1xuICAgICAgICBsZXQgb3RoZXIgPSBvdGhlckNvbGxpZGVyLm5vZGU7XG4gICAgICAgIC8vIGxldCB3b3JsZE1hbmlmb2xkID0gY29udGFjdC5nZXRXb3JsZE1hbmlmb2xkKCk7XG4gICAgICAgIC8vIGxldCBub3JtYWwgPSB3b3JsZE1hbmlmb2xkLm5vcm1hbDtcbiAgICAgICAgaWYgKG90aGVyLmdyb3VwID09IFwiZ3JvdW5kXCIpIHtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG93RGFtYWdlQ29sbGlkZXIoY29sbGlkZXI6ZGFtYWdlQ29sbGlkZXIpe1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bY29sbGlkZXJdLmFjdGl2ZT10cnVlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyPWNvbGxpZGVyO1xuICAgIH1cbiAgICBnZXREYW1hZ2VDb2xsaWRlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdO1xuICAgIH1cbiAgICBoaWRlRGFtYWdlQ29sbGlkZXIoKXtcbiAgICAgICAgaWYodGhpcy5kbWdDb2xsaWRlcj09bnVsbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl0uYWN0aXZlPWZhbHNlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyPW51bGw7XG4gICAgfVxuICAgIEFJX3N0YXJ0KCkge1xuICAgICAgICBpZihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLmlzRGllKXtcbiAgICAgICAgICAgIC8v546p5a625bey5q27IOWBnOatouenu+WKqFxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICAgICAgICAgIH0sMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5hYnModGhpcy5nZXREaXN0YW5jZVgoKSk7XG4gICAgICAgIGlmIChkaXN0YW5jZSA8IHRoaXMuc3RvcERpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmhpdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm5vd1NwZWVkID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtdGhpcy5tb3ZlU3BlZWQgOiB0aGlzLm1vdmVTcGVlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBBSV9zdG9wKCkge1xuICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICB9XG4gICAgY2hhbmdlTW92U3RhdGUoaXNNb3ZlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gaXNNb3ZlO1xuICAgIH1cbiAgICBpZGxlKCkge1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDApO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLklkbGUsIDEsIHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZih0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlIT1lbmVteVN0YXRlLklkbGUpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICAgICAgfSwgdGhpcy5BSV9pbnRlcnZhbCk7XG4gICAgfVxuICAgIGNoYW5nZURpcmVjdGlvbigpIHtcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyPT1udWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54PyAtdGhpcy5zY2FsZVhfc2tlbGV0b24gOiB0aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgLy90aGlzLmhwTm9kZS54ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtMjggOiAyODtcbiAgICB9XG4gICAgZGllKCkge1xuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGVIcCgpO1xuICAgIH1cbiAgICBnZXRVcCgpIHtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmdldF91cCwgMSwgZmFsc2UsIHRydWUpXG4gICAgfVxuICAgIG1vdmVUb1BsYXllcigpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih0aGlzLm5vd1NwZWVkLDApO1xuICAgIH1cbiAgICBza2lsbFN0YXJ0KCl7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZVtcIlNraWxsLVN0YXJ0XCJdLDEsZmFsc2UpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnNraWxsTWlkZGxlLDIuNSk7XG4gICAgfVxuICAgIHNraWxsTWlkZGxlKCl7XG4gICAgICAgIGxldCB4PUdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVg+MD9cbiAgICAgICAgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLngrMTMwOlxuICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueC0xMzA7XG4gICAgICAgIHRoaXMubm9kZS54PXg7XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgIHRoaXMub3BlbkNvbGxpZGVyKCk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZVtcIlNraWxsLU1pZGRsZVwiXSwxLGZhbHNlKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5za2lsbEVuZCwxLjcpO1xuICAgICAgICB0aGlzLnNob3dEYW1hZ2VDb2xsaWRlcihkYW1hZ2VDb2xsaWRlci5za2lsbCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBpZih0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlPT1lbmVteVN0YXRlW1wiU2tpbGwtTWlkZGxlXCJdKXtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhbWFnZUNvbGxpZGVyKCkuZ2V0Q29tcG9uZW50KGVuZW15SGl0Q29sbGlkZXIpLmhpdCh0aGlzLm5vZGUsdGhpcy5kYW1hZ2UqMS43KTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmdldERhbWFnZUNvbGxpZGVyKCkuZ2V0Q29tcG9uZW50KGVuZW15SGl0Q29sbGlkZXIpLnBsYXllcil7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zY3JlZW5TaGFrZSg4LDAsMTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwwLjIpO1xuICAgIH1cbiAgICBza2lsbEVuZCgpe1xuICAgICAgICBsZXQgeD0wO1xuICAgICAgICBpZihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueDw3MDApe1xuICAgICAgICAgICAgeD1HYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCtjYWlqaVRvb2xzLnJhbmRvbV9pbnQoMzAwLGNjLndpblNpemUud2lkdGgvMS41KTtcbiAgICAgICAgfWVsc2UgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLng+MTcwMCl7XG4gICAgICAgICAgICB4PUdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54LWNhaWppVG9vbHMucmFuZG9tX2ludCgyMDAsY2Mud2luU2l6ZS53aWR0aC8xLjUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCByYW5kb209Y2FpamlUb29scy5yYW5kb21faW50KDEsMTApO1xuICAgICAgICAgICAgeD1yYW5kb20lMj09MD9cbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54K2NhaWppVG9vbHMucmFuZG9tX2ludCgtY2Mud2luU2l6ZS53aWR0aC8xLjUsLTIwMCk6XG4gICAgICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCtjYWlqaVRvb2xzLnJhbmRvbV9pbnQoMjAwLGNjLndpblNpemUud2lkdGgvMS41KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUueD14O1xuICAgICAgICB0aGlzLm9wZW5Db2xsaWRlcigpO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGVbXCJTa2lsbC1FbmRcIl0sMSxmYWxzZSk7XG4gICAgfVxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLDApO1xuICAgICAgICBpZih0aGlzLm5vd0F0dGFja1RpbWVzPHRoaXMuYWxsb3dBdHRhY2tUaW1lcyl7XG4gICAgICAgICAgICB0aGlzLm5vd0F0dGFja1RpbWVzKys7XG4gICAgICAgICAgICB0aGlzLnNob3dEYW1hZ2VDb2xsaWRlcihkYW1hZ2VDb2xsaWRlci5hdHRhY2spO1xuICAgICAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkF0aywgMSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlPT1lbmVteVN0YXRlLkF0ayl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0RGFtYWdlQ29sbGlkZXIoKS5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcikucGxheWVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zY3JlZW5TaGFrZSg4LDAsMTIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGFtYWdlQ29sbGlkZXIoKS5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcikuaGl0KHRoaXMubm9kZSx0aGlzLmRhbWFnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwwLjUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMubm93QXR0YWNrVGltZXM9MDtcbiAgICAgICAgICAgIHRoaXMuc2tpbGxTdGFydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJlSGl0KGRhbWFnZTogbnVtYmVyLCBkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIC8vIGxldCBpc0NvbnRpbnVlID0gdGhpcy5jaGVja0lzU3dvcmRSYWluKGRtZ1R5cGUpOy8v6K6+572u5YmR6Zuo5pS75Ye76Ze06ZqUXG4gICAgICAgIC8vIGlmIChpc0NvbnRpbnVlID09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHQoKTtcbiAgICAgICAgdGhpcy5zaG93SHAoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZV9iZUhpdChkbWdUeXBlKTtcbiAgICAgICAgbGV0IHggPSB0aGlzLm5vZGUuc2NhbGVYIDwgMCA/IHRoaXMubm9kZS54ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFggOiB0aGlzLm5vZGUueCAtIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYO1xuICAgICAgICBsZXQgeSA9IHRoaXMubm9kZS55ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFkqMS4yO1xuICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2hvd0RhbWFnZUxhYmVsX2VuZW15KHRoaXMubm9kZSwgZGFtYWdlLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIHRoaXMudXBkYXRlSHAoZGFtYWdlKTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgRXZlbnRzLmluc3RhbmNlLmNyZWF0ZUVuZW15RGllRWZmZWN0KHRoaXMubm9kZSwgdGhpcy5kaWVFZmZlY3ROYW1lLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xvc2VDb2xsaWRlcigpe1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmVuYWJsZWQ9ZmFsc2U7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIuYXBwbHkoKTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcikuZW5hYmxlZD1mYWxzZTtcbiAgICAgICAgdGhpcy5oaWRlSHAoKTtcbiAgICAgICAgdGhpcy5zbW9rZVBhcnRpY2xlX0JsYWNrLnN0YXJ0Q29sb3IuY29sb3IuYT0wO1xuICAgICAgICB0aGlzLnNtb2tlUGFydGljbGVfUmVkLnN0YXJ0Q29sb3IuY29sb3IuYT0wO1xuICAgICAgICB0aGlzLnNtb2tlUGFydGljbGVfUmVkLmNsZWFyKCk7XG4gICAgfVxuICAgIG9wZW5Db2xsaWRlcigpe1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmVuYWJsZWQ9dHJ1ZTtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5hcHBseSgpO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5lbmFibGVkPXRydWU7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuc21va2VQYXJ0aWNsZV9CbGFjay5zdGFydENvbG9yLmNvbG9yKVxuICAgICAgICAudG8oMC4yLHthOjE1MH0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgICAgICBjYy50d2Vlbih0aGlzLnNtb2tlUGFydGljbGVfUmVkLnN0YXJ0Q29sb3IuY29sb3IpXG4gICAgICAgIC50bygwLjA1LHthOjE1MH0pXG4gICAgICAgIC5zdGFydCgpO1xuICAgIH1cbiAgICBzZXRSaWdpYm9keVNwZWVkKHg6bnVtYmVyLHk6bnVtYmVyPTApe1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5PWNjLnYyKHgseSk7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlX2JlSGl0KGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYodGhpcy5pc1N1cGVyQXJtb3IpIHJldHVybjtcbiAgICAgICAgbGV0IHN0YXRlID0gbnVsbDtcbiAgICAgICAgbGV0IGlzS25vY2tEb3duID0gZG1nVHlwZSA9PSBhdHRhY2tUeXBlLmF0dGFjazMgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoZG1nVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazE6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MjtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2szOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZygwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZyg1KTtcbiAgICAgICAgICAgICAgICB9LCAwLjQpO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5rbm9ja19kb3duO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA8IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICYmIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MigtdGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnggPiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIodGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5qdW1wSGl0OlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLnNodXJpa2VuOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUhpdEZvcmNlX3lfc2h1cmlrZW4pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zd29yZFJhaW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShzdGF0ZSwgMSwgZmFsc2UsIGlzS25vY2tEb3duKTtcbiAgICB9XG4gICAgc2V0TGluZWFyRGFtcGluZyhkYW1waW5nOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJEYW1waW5nID0gZGFtcGluZztcbiAgICB9XG4gICAgc2V0RnJpY3Rpb24oZnJpY3Rpb246IG51bWJlciA9IDApIHtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5mcmljdGlvbiA9IGZyaWN0aW9uO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmFwcGx5KCk7XG4gICAgfVxuICAgIGFwcGx5Rm9yY2UoZm9yY2U6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIHRoaXMucmlnaWJvZHkuYXBwbHlGb3JjZVRvQ2VudGVyKGZvcmNlLCB0cnVlKTtcbiAgICB9XG4gICAgY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmIChkbWdUeXBlID09IGF0dGFja1R5cGUuc3dvcmRSYWluKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N3b3JkUmFpbkNkKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1N3b3JkUmFpbkNkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzLnN3b3JkUmFpbkhpdENkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgdXBkYXRlSHAoZGFtYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ocCAtPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMuaHBCYXIucHJvZ3Jlc3MgPSB0aGlzLmhwIC8gdGhpcy5ocE1heDtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XG4gICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dIcCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuaGlkZUhwKTtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5oaWRlSHAsMik7XG4gICAgfVxuICAgIGhpZGVIcCgpIHtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY2xvc2VIaWdoTGlnaHQpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMSk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJoaWdoTGlnaHRDb2xvclwiLCBbMS4wLDEuMCwxLjAsMC41XSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuY2xvc2VIaWdoTGlnaHQsIDAuMTUpO1xuICAgIH1cbiAgICBjbG9zZUhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImJlSGl0XCIsIDApO1xuICAgIH1cbiAgICBnZXREaXN0YW5jZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUueCAtIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54O1xuICAgIH1cbn1cbiJdfQ==