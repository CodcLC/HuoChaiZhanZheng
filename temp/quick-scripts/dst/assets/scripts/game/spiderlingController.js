
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/spiderlingController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcc3BpZGVybGluZ0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTRDO0FBQzVDLDRDQUEyQztBQUMzQyxxREFBZ0Q7QUFDaEQsbURBQTBEO0FBQzFELG1EQUE4QztBQUM5Qyx5Q0FBb0M7QUFDcEMsdURBQWtEO0FBQ2xELG1DQUE4QjtBQUM5Qiw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsSUFBSyxjQUdKO0FBSEQsV0FBSyxjQUFjO0lBQ2YsbURBQUksQ0FBQTtJQUNKLG1EQUFJLENBQUE7QUFDUixDQUFDLEVBSEksY0FBYyxLQUFkLGNBQWMsUUFHbEI7QUFFRDtJQUFrRCx3Q0FBUztJQUEzRDtRQUFBLHFFQTRVQztRQXpVRyxlQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQix3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFL0IsWUFBTSxHQUFZLElBQUksQ0FBQztRQUV2QixXQUFLLEdBQW1CLElBQUksQ0FBQztRQUU3QixtQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUUzQixlQUFTLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUM5QixjQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUMzQixpQkFBVyxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDaEMsa0JBQVksR0FBUSxFQUFFLENBQUMsQ0FBQSxNQUFNO1FBQzdCLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFDZixhQUFPLEdBQVEsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUN2QixrQkFBWSxHQUFXLENBQUMsQ0FBQyxDQUFBLFVBQVU7UUFDbkMsa0JBQVksR0FBVyxDQUFDLENBQUEsQ0FBQSxTQUFTO1FBQ2pDLDJCQUFxQixHQUFXLENBQUMsQ0FBQSxDQUFBLFNBQVM7UUFDMUMsMEJBQW9CLEdBQVcsTUFBTSxDQUFDLENBQUEsUUFBUTtRQUM5QywwQkFBb0IsR0FBVyxDQUFDLENBQUMsQ0FBQSxRQUFRO1FBQ3pDLHFCQUFlLEdBQVcsQ0FBQyxDQUFDO1FBQzVCLFdBQUssR0FBWSxLQUFLLENBQUM7UUFDdkIsY0FBUSxHQUFnQixJQUFJLENBQUM7UUFDN0Isb0JBQWMsR0FBbUIsSUFBSSxDQUFDO1FBQ3RDLGNBQVEsR0FBaUIsSUFBSSxDQUFDO1FBQzlCLGlCQUFXLEdBQTBCLElBQUksQ0FBQztRQUMxQyxtQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixZQUFNLEdBQVksS0FBSyxDQUFDLENBQUEsVUFBVTtRQUNsQyxpQkFBVyxHQUFnQixJQUFJLENBQUM7UUFDaEMsZUFBUyxHQUFTLEtBQUssQ0FBQztRQUN4QixZQUFNLEdBQVMsSUFBSSxDQUFDO1FBQ3BCLFlBQU0sR0FBQztZQUNILENBQUMsRUFBQyxDQUFDO1NBQ04sQ0FBQTs7SUFxU0wsQ0FBQztJQW5TRyxxQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyx3QkFBYyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNELG9DQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixZQUFZO1FBQ1osb0VBQW9FO0lBQ3hFLENBQUM7SUFDRCxtQ0FBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLDJCQUFVLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLHNCQUFZLENBQUMsU0FBUyxDQUFDLHdCQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELHFDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSztZQUFFLE9BQU87UUFDakMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO2FBQU07WUFDSCxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFFLDJCQUFVLENBQUMsTUFBTTtnQkFBRSxPQUFPO1lBQ3hELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFDRCwrQ0FBZ0IsR0FBaEI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDZCxZQUFZO1lBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUM3RDtJQUNMLENBQUM7SUFDRCwyQ0FBWSxHQUFaO1FBQ0ksc0JBQVksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUNwQixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDcEIsYUFBYSxDQUNWLEVBQUUsQ0FBQyxLQUFLLEVBQUU7YUFDVCxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDO2FBQ2IsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxDQUNuQjthQUNBLEtBQUssRUFBRSxDQUFDO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRCx1Q0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBQyxLQUFLLENBQUM7UUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0QsNkNBQWMsR0FBZCxVQUFlLE9BQTBCLEVBQUUsWUFBZ0MsRUFBRSxhQUFpQztRQUMxRyxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9CLGtEQUFrRDtRQUNsRCxxQ0FBcUM7UUFDckMsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUN2QixPQUFPLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFDRCxpREFBa0IsR0FBbEIsVUFBbUIsUUFBdUI7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUNELGdEQUFpQixHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0QsaURBQWtCLEdBQWxCO1FBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUk7WUFBRSxPQUFPO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztRQUMzRCxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQ0QsdUNBQVEsR0FBUjtRQUFBLGlCQW1CQztRQWxCRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUM7WUFDM0MsV0FBVztZQUNYLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsT0FBTztTQUNWO1FBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDcEY7SUFDTCxDQUFDO0lBQ0Qsc0NBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBQ0QsNkNBQWMsR0FBZCxVQUFlLE1BQWU7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUNELG1DQUFJLEdBQUo7UUFBQSxpQkFZQztRQVhHLElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUUsMkJBQVUsQ0FBQyxJQUFJLEVBQUM7WUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFFLDJCQUFVLENBQUMsSUFBSTtnQkFBRSxPQUFPO1lBQ3RELEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCw4Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDM0gsMkRBQTJEO0lBQy9ELENBQUM7SUFDRCxrQ0FBRyxHQUFIO1FBQUEsaUJBb0JDO1FBbkJHLElBQUcsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQ3RCLHNCQUFZLENBQUMsU0FBUyxDQUFDLHdCQUFTLENBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7UUFDckQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLElBQUcsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQUUsT0FBTztZQUNyQyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxZQUFZLENBQUMsMEJBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLElBQUksRUFBQyxLQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVGLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDN0csSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQzlDLGdCQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hCLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFDRCwyQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCxtQ0FBSSxHQUFKO1FBQ0ksc0JBQVksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQywyQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3BFLENBQUM7SUFDRCwyQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDRCxJQUFJO0lBQ0osMENBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRixJQUFJLEVBQUUsR0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQ0Qsd0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLDJCQUFVLENBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNELHdDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQywyQkFBVSxDQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDRCxvQ0FBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBQ0Qsa0NBQUcsR0FBSDtRQUFBLGlCQVlDO1FBWEcsSUFBRywyQkFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUFFLE9BQU87UUFDdEUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLDJCQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsSUFBRyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBRSwyQkFBVSxDQUFDLE1BQU0sRUFBQztnQkFDNUMsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RGO1FBQ0wsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELG9DQUFLLEdBQUwsVUFBTSxNQUFjLEVBQUUsT0FBbUI7UUFDckMsSUFBRyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsVUFBVTtRQUMxRCxJQUFJLFVBQVUsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUM1QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDN0csSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQzlDLGdCQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNkLG1GQUFtRjtTQUN0RjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELCtDQUFnQixHQUFoQixVQUFpQixDQUFRLEVBQUMsQ0FBVTtRQUFWLGtCQUFBLEVBQUEsS0FBVTtRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsZ0RBQWlCLEdBQWpCLFVBQWtCLE9BQW1CO1FBQXJDLGlCQXdDQztRQXZDRyxJQUFHLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxXQUFXLEdBQUcsT0FBTyxJQUFJLDJCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMvRCxRQUFRLE9BQU8sRUFBRTtZQUNiLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ2QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ1IsS0FBSyxHQUFHLDJCQUFVLENBQUMsU0FBUyxDQUFDO2dCQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUkscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMvRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztpQkFDakY7cUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLHFCQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO2lCQUNoRjtnQkFDRCxNQUFNO1lBQ1YsS0FBSywyQkFBVSxDQUFDLE9BQU87Z0JBQ25CLEtBQUssR0FBRywyQkFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoSCxNQUFNO1lBQ1YsS0FBSywyQkFBVSxDQUFDLFFBQVE7Z0JBQ3BCLEtBQUssR0FBRywyQkFBVSxDQUFDLE9BQU8sQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDdEcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxTQUFTO2dCQUNyQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxPQUFPLENBQUM7Z0JBQzNCLE1BQU07WUFDVixRQUFRO1NBQ1g7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0QsK0NBQWdCLEdBQWhCLFVBQWlCLE9BQWU7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO0lBQzFDLENBQUM7SUFDRCwwQ0FBVyxHQUFYLFVBQVksUUFBb0I7UUFBcEIseUJBQUEsRUFBQSxZQUFvQjtRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QseUNBQVUsR0FBVixVQUFXLEtBQWM7UUFDckIsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNELCtDQUFnQixHQUFoQixVQUFpQixPQUFtQjtRQUFwQyxpQkFTQztRQVJHLElBQUksT0FBTyxJQUFJLDJCQUFVLENBQUMsU0FBUyxFQUFFO1lBQ2pDLElBQUksSUFBSSxDQUFDLGFBQWE7Z0JBQUUsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMvQixDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsdUNBQVEsR0FBUixVQUFTLE1BQWM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNkO0lBQ0wsQ0FBQztJQUNELHFDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxxQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFDRCx3Q0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0QsNkNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELDJDQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQXhVRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNLO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO29FQUNwQjtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQztvRUFDcEI7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3VEQUNJO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0RBQ087SUFiVixvQkFBb0I7UUFEeEMsT0FBTztPQUNhLG9CQUFvQixDQTRVeEM7SUFBRCwyQkFBQztDQTVVRCxBQTRVQyxDQTVVaUQsbUJBQVMsR0E0VTFEO2tCQTVVb0Isb0JBQW9CIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZW5lbXlTdGF0ZSB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5pbXBvcnQgZW5lbXlBbmltYXRpb24gZnJvbSBcIi4vZW5lbXlBbmltYXRpb25cIjtcbmltcG9ydCBlbmVteUJhc2UgZnJvbSBcIi4vZW5lbXlCYXNlXCI7XG5pbXBvcnQgZW5lbXlIaXRDb2xsaWRlciBmcm9tIFwiLi9lbmVteUhpdENvbGxpZGVyXCI7XG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL0V2ZW50c1wiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVye1xuICAgIGZhbGwsXG4gICAgYm9tYlxufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNwaWRlcmxpbmdDb250cm9sbGVyIGV4dGVuZHMgZW5lbXlCYXNlIHtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgbGFuZGluZ0Z4OmNjLlByZWZhYj1udWxsO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuS8pOWus+aViOaenHjovbTlgY/np7vlgLxcIiB9KVxuICAgIGRhbWFnZUxhYmVsT2Zmc2V0WDogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLkvKTlrrPmlYjmnpx56L205YGP56e75YC8XCIgfSlcbiAgICBkYW1hZ2VMYWJlbE9mZnNldFk6IG51bWJlciA9IDA7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaHBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgaHBCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3RyaW5nKVxuICAgIGRpZUVmZmVjdE5hbWU6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBtb3ZlU3BlZWQ6IG51bWJlciA9IDE1MDsvL+enu+WKqOmAn+W6plxuICAgIG5vd1NwZWVkOiBudW1iZXIgPSAwOy8v5b2T5YmN6YCf5bqmXG4gICAgQUlfaW50ZXJ2YWw6IG51bWJlciA9IDAuMjsvL2Fp6Ze06ZqUXG4gICAgc3RvcERpc3RhbmNlOm51bWJlcj0zMDsvL+WBnOatoui3neemu1xuICAgIGhwOiBudW1iZXIgPSAwO1xuICAgIGhwVGltZXM6bnVtYmVyPTE7Ly/ooYDph4/lgI3mlbBcbiAgICBiZUhpdEZvcmNlX3k6IG51bWJlciA9IDA7Ly/miYvph4zliZHmlLvlh7vkvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3g6IG51bWJlciA9IDAvL+aZrumAmuaUu+WHu+S9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9zaHVyaWtlbjogbnVtYmVyID0gMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94X2F0dGFjazM6IG51bWJlciA9IDEwMDAwMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9hdHRhY2szOiBudW1iZXIgPSAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgc2NhbGVYX3NrZWxldG9uOiBudW1iZXIgPSAwO1xuICAgIGlzRGllOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBlbmVteUFuaW1hdGlvbjogZW5lbXlBbmltYXRpb24gPSBudWxsO1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIGJveENvbGxpZGVyOiBjYy5QaHlzaWNzQm94Q29sbGlkZXIgPSBudWxsO1xuICAgIGlzU3dvcmRSYWluQ2Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01vdmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWkhOS6juenu+WKqOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOmRhbWFnZUNvbGxpZGVyPW51bGw7XG4gICAgaXNXYXJuaW5nOmJvb2xlYW49ZmFsc2U7XG4gICAgaXNXdURpOmJvb2xlYW49dHJ1ZTtcbiAgICB3YXJuX2E9e1xuICAgICAgICBhOjBcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgdGhpcy5zY2FsZVhfc2tlbGV0b24gPSBNYXRoLmFicyh0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbiA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoZW5lbXlBbmltYXRpb24pO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmVuZW15Q29udHJvbGxlciA9IHRoaXM7XG4gICAgICAgIHRoaXMucmlnaWJvZHkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcik7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5za2VsZXRvbi5za2VsZXRvbkRhdGEuX3NrZWxldG9uQ2FjaGUuYW5pbWF0aW9ucyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5ocCA9IHRoaXMuaHBNYXgqdGhpcy5ocFRpbWVzO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuRmFsbCwxLGZhbHNlKTtcbiAgICAgICAgdGhpcy5zaG93RGFtYWdlQ29sbGlkZXIoZGFtYWdlQ29sbGlkZXIuZmFsbCk7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkU0MFN0YXJ0KTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhcm5pbmdBbmltYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2VYKCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZih0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlPT1lbmVteVN0YXRlLmF0dGFjaykgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG9QbGF5ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3YXJuaW5nQW5pbWF0aW9uKCl7XG4gICAgICAgIGlmKHRoaXMuaXNXYXJuaW5nKXtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5za2VsZXRvbi5fc2tlbGV0b24uc2xvdHNbNF0uY29sb3JbXCJhXCJdPXRoaXMud2Fybl9hLmE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhcnRXYXJuaW5nKCl7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkU0MEFsZXJ0LGZhbHNlLDAuNik7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uc2V0QXR0YWNobWVudChcIlVudGl0bGVkLTRcIixcIlVudGl0bGVkLTRcIik7XG4gICAgICAgIHRoaXMuaXNXYXJuaW5nPXRydWU7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMud2Fybl9hKVxuICAgICAgICAucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgIGNjLnR3ZWVuKClcbiAgICAgICAgICAgIC50bygwLjEse2E6MX0pXG4gICAgICAgICAgICAudG8oMC4xLHthOjAuMX0pXG4gICAgICAgIClcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuZGllLDIuNSk7XG4gICAgfVxuICAgIHN0b3BXYXJuKCl7XG4gICAgICAgIHRoaXMuaXNXYXJuaW5nPWZhbHNlO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy53YXJuX2EpO1xuICAgICAgICB0aGlzLndhcm5fYS5hPTA7XG4gICAgfVxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3Q6IGNjLlBoeXNpY3NDb250YWN0LCBzZWxmQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlciwgb3RoZXJDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlciA9IG90aGVyQ29sbGlkZXIubm9kZTtcbiAgICAgICAgLy8gbGV0IHdvcmxkTWFuaWZvbGQgPSBjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKTtcbiAgICAgICAgLy8gbGV0IG5vcm1hbCA9IHdvcmxkTWFuaWZvbGQubm9ybWFsO1xuICAgICAgICBpZiAob3RoZXIuZ3JvdXAgPT0gXCJ3YWxsXCIpIHtcbiAgICAgICAgICAgIGNvbnRhY3QuZGlzYWJsZWQ9dHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG93RGFtYWdlQ29sbGlkZXIoY29sbGlkZXI6ZGFtYWdlQ29sbGlkZXIpe1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bY29sbGlkZXJdLmFjdGl2ZT10cnVlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyPWNvbGxpZGVyO1xuICAgIH1cbiAgICBnZXREYW1hZ2VDb2xsaWRlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdO1xuICAgIH1cbiAgICBoaWRlRGFtYWdlQ29sbGlkZXIoKXtcbiAgICAgICAgaWYodGhpcy5kbWdDb2xsaWRlcj09bnVsbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl0uYWN0aXZlPWZhbHNlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyPW51bGw7XG4gICAgfVxuICAgIEFJX3N0YXJ0KCkge1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICBpZihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLmlzRGllKXtcbiAgICAgICAgICAgIC8v546p5a625bey5q27IOWBnOatouenu+WKqFxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICAgICAgICAgIH0sMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5hYnModGhpcy5nZXREaXN0YW5jZVgoKSk7XG4gICAgICAgIGlmIChkaXN0YW5jZSA8IHRoaXMuc3RvcERpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuTW92ZSwgMSwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5ub3dTcGVlZCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gLXRoaXMubW92ZVNwZWVkIDogdGhpcy5tb3ZlU3BlZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQUlfc3RvcCgpIHtcbiAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgfVxuICAgIGNoYW5nZU1vdlN0YXRlKGlzTW92ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzTW92ZSA9IGlzTW92ZTtcbiAgICB9XG4gICAgaWRsZSgpIHtcbiAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSE9ZW5lbXlTdGF0ZS5TdG9wKXtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5TdG9wLCAxLCB0cnVlLHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICAvL3RoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZygwKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsMCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGUhPWVuZW15U3RhdGUuU3RvcCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgICAgICB9LCB0aGlzLkFJX2ludGVydmFsKTtcbiAgICB9XG4gICAgY2hhbmdlRGlyZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggLSB0aGlzLm5vZGUueCA+IDAgPyAtdGhpcy5zY2FsZVhfc2tlbGV0b24gOiB0aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgLy90aGlzLmhwTm9kZS54ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtMjggOiAyODtcbiAgICB9XG4gICAgZGllKCkge1xuICAgICAgICBpZih0aGlzLmlzRGllKSByZXR1cm47XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkU0MEV4cG9zaW9uLGZhbHNlLDAuNik7XG4gICAgICAgIHRoaXMuaXNEaWUgPSB0cnVlO1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eT0wO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5lbmFibGVkPWZhbHNlO1xuICAgICAgICB0aGlzLmhpZGVIcCgpO1xuICAgICAgICB0aGlzLnNob3dEYW1hZ2VDb2xsaWRlcihkYW1hZ2VDb2xsaWRlci5ib21iKTtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgIGNjLlR3ZWVuLnN0b3BBbGxCeVRhcmdldCh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgaWYoIXRoaXMuZ2V0RGFtYWdlQ29sbGlkZXIoKSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5nZXREYW1hZ2VDb2xsaWRlcigpLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLHRoaXMuZGFtYWdlLHRydWUpO1xuICAgICAgICB9LDApO1xuICAgICAgICBsZXQgeCA9IHRoaXMubm9kZS5zY2FsZVggPCAwID8gdGhpcy5ub2RlLnggKyB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WCA6IHRoaXMubm9kZS54IC0gdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFg7XG4gICAgICAgIGxldCB5ID0gdGhpcy5ub2RlLnkgKyB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WTtcbiAgICAgICAgRXZlbnRzLmluc3RhbmNlLmNyZWF0ZUVuZW15RGllRWZmZWN0KHRoaXMubm9kZSwgdGhpcy5kaWVFZmZlY3ROYW1lLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9LDEpO1xuICAgIH1cbiAgICBtb3ZlVG9QbGF5ZXIoKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIodGhpcy5ub3dTcGVlZCwwKTtcbiAgICB9XG4gICAgYm9ybigpe1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FNDBCb3JuKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkJvcm4sIDEsIGZhbHNlLCB0cnVlKVxuICAgIH1cbiAgICBib3JuQ29tcGxldGUoKXtcbiAgICAgICAgdGhpcy5pc1d1RGk9ZmFsc2U7XG4gICAgICAgIHRoaXMuaWRsZSgpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLnN0YXJ0V2FybmluZywyKTtcbiAgICB9XG4gICAgLy/okL3lnLBcbiAgICBhdHRhY2tfZmFsbCgpe1xuICAgICAgICB0aGlzLmdldERhbWFnZUNvbGxpZGVyKCkuZ2V0Q29tcG9uZW50KGVuZW15SGl0Q29sbGlkZXIpLmhpdCh0aGlzLm5vZGUsdGhpcy5kYW1hZ2UpO1xuICAgICAgICBsZXQgZng9Y2FpamlUb29scy5jcmVhdGVOb2RlKHRoaXMubGFuZGluZ0Z4LHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICBmeC5zZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlLmdldFNpYmxpbmdJbmRleCgpKzEpO1xuICAgICAgICBmeC5zZXRQb3NpdGlvbih0aGlzLm5vZGUucG9zaXRpb24pO1xuICAgICAgICBmeC5hY3RpdmU9dHJ1ZTtcbiAgICB9XG4gICAgS25vY2tfdXAyKCl7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5Lbm9ja191cDIsMSxmYWxzZSx0cnVlKTtcbiAgICB9XG4gICAgS25vY2tfdXAzKCl7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5Lbm9ja191cDMsMSxmYWxzZSx0cnVlKTtcbiAgICB9XG4gICAgZ2V0VXAoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5HZXRfdXAsIDEsIGZhbHNlLCB0cnVlKVxuICAgIH1cbiAgICBoaXQoKSB7XG4gICAgICAgIGlmKGVuZW15U3RhdGVbdGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZV0uaW5jbHVkZXMoXCJnZXRfaHVydFwiKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsMCk7XG4gICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmZhbGwpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuYXR0YWNrLCAxLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBpZih0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlPT1lbmVteVN0YXRlLmF0dGFjayl7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYW1hZ2VDb2xsaWRlcigpLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLHRoaXMuZGFtYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwwLjUpO1xuICAgIH1cbiAgICBiZUhpdChkYW1hZ2U6IG51bWJlciwgZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZih0aGlzLmlzV3VEaSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDApO1xuICAgICAgICBsZXQgaXNDb250aW51ZSA9IHRoaXMuY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlKTsvL+iuvue9ruWJkembqOaUu+WHu+mXtOmalFxuICAgICAgICBpZiAoaXNDb250aW51ZSA9PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuaGlnaExpZ2h0KCk7XG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGVfYmVIaXQoZG1nVHlwZSk7XG4gICAgICAgIGxldCB4ID0gdGhpcy5ub2RlLnNjYWxlWCA8IDAgPyB0aGlzLm5vZGUueCArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYIDogdGhpcy5ub2RlLnggLSB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLm5vZGUueSArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRZO1xuICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2hvd0RhbWFnZUxhYmVsX2VuZW15KHRoaXMubm9kZSwgZGFtYWdlLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIC8vRXZlbnRzLmluc3RhbmNlLmNyZWF0ZUVuZW15RGllRWZmZWN0KHRoaXMubm9kZSwgdGhpcy5kaWVFZmZlY3ROYW1lLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVIcChkYW1hZ2UpO1xuICAgIH1cbiAgICBzZXRSaWdpYm9keVNwZWVkKHg6bnVtYmVyLHk6bnVtYmVyPTApe1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5PWNjLnYyKHgseSk7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlX2JlSGl0KGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYodGhpcy5pc1N1cGVyQXJtb3IpIHJldHVybjtcbiAgICAgICAgbGV0IHN0YXRlID0gbnVsbDtcbiAgICAgICAgbGV0IGlzS25vY2tEb3duID0gZG1nVHlwZSA9PSBhdHRhY2tUeXBlLmF0dGFjazMgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoZG1nVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazE6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLkdldF9IaXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLkdldF9IaXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazM6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDUpO1xuICAgICAgICAgICAgICAgIH0sIDAuNCk7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLktub2NrX3VwMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLnggPCBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoLXRoaXMuYmVIaXRGb3JjZV94X2F0dGFjazMsIHRoaXMuYmVIaXRGb3JjZV95X2F0dGFjazMpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS54ID4gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggJiYgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKHRoaXMuYmVIaXRGb3JjZV94X2F0dGFjazMsIHRoaXMuYmVIaXRGb3JjZV95X2F0dGFjazMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuanVtcEhpdDpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuR2V0X0hpdDtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuc2h1cmlrZW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLkdldF9IaXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUhpdEZvcmNlX3lfc2h1cmlrZW4pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zd29yZFJhaW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLkdldF9IaXQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoc3RhdGUsIDEsIGZhbHNlLCBpc0tub2NrRG93bik7XG4gICAgfVxuICAgIHNldExpbmVhckRhbXBpbmcoZGFtcGluZzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyRGFtcGluZyA9IGRhbXBpbmc7XG4gICAgfVxuICAgIHNldEZyaWN0aW9uKGZyaWN0aW9uOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIuZnJpY3Rpb24gPSBmcmljdGlvbjtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5hcHBseSgpO1xuICAgIH1cbiAgICBhcHBseUZvcmNlKGZvcmNlOiBjYy5WZWMyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3VwZXJBcm1vcikgcmV0dXJuO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmFwcGx5Rm9yY2VUb0NlbnRlcihmb3JjZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNoZWNrSXNTd29yZFJhaW4oZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZiAoZG1nVHlwZSA9PSBhdHRhY2tUeXBlLnN3b3JkUmFpbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTd29yZFJhaW5DZCkgcmV0dXJuIDA7XG4gICAgICAgICAgICB0aGlzLmlzU3dvcmRSYWluQ2QgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgdGhpcy5zd29yZFJhaW5IaXRDZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHVwZGF0ZUhwKGRhbWFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaHAgLT0gZGFtYWdlO1xuICAgICAgICB0aGlzLmhwQmFyLnByb2dyZXNzID0gdGhpcy5ocCAvIHRoaXMuaHBNYXg7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuaHAgPSAwO1xuICAgICAgICAgICAgdGhpcy5kaWUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG93SHAoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmhpZGVIcCk7XG4gICAgICAgIHRoaXMuaHBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuaGlkZUhwLDIpO1xuICAgIH1cbiAgICBoaWRlSHAoKSB7XG4gICAgICAgIHRoaXMuaHBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBoaWdoTGlnaHQoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmNsb3NlSGlnaExpZ2h0KTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImJlSGl0XCIsIDEpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiaGlnaExpZ2h0Q29sb3JcIiwgWzEuMCwxLjAsMS4wLDAuNV0pO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmNsb3NlSGlnaExpZ2h0LCAwLjE1KTtcbiAgICB9XG4gICAgY2xvc2VIaWdoTGlnaHQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJiZUhpdFwiLCAwKTtcbiAgICB9XG4gICAgZ2V0RGlzdGFuY2VYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnggLSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueDtcbiAgICB9XG59XG4iXX0=