
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/E20controller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRTIwY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNEM7QUFDNUMsNENBQTJDO0FBQzNDLHFEQUFnRDtBQUNoRCxtREFBMEQ7QUFDMUQsbURBQThDO0FBQzlDLHlDQUFvQztBQUNwQyx1REFBa0Q7QUFDbEQsbUNBQThCO0FBQzlCLDJEQUFzRDtBQUN0RCw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFDNUMsSUFBSyxjQUVKO0FBRkQsV0FBSyxjQUFjO0lBQ2YsdURBQU0sQ0FBQTtBQUNWLENBQUMsRUFGSSxjQUFjLEtBQWQsY0FBYyxRQUVsQjtBQUVEO0lBQTJDLGlDQUFTO0lBQXBEO1FBQUEscUVBaVlDO1FBOVhHLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRTFCLGdCQUFVLEdBQVcsSUFBSSxDQUFDO1FBRTFCLGNBQVEsR0FBVyxJQUFJLENBQUM7UUFFeEIsd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLFdBQUssR0FBbUIsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGVBQVMsR0FBVyxFQUFFLENBQUMsQ0FBQSxNQUFNO1FBQzdCLGNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzNCLGlCQUFXLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUNoQyxrQkFBWSxHQUFRLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsUUFBRSxHQUFXLENBQUMsQ0FBQztRQUNmLGFBQU8sR0FBUSxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQ3ZCLGtCQUFZLEdBQVcsS0FBSyxDQUFDLENBQUEsVUFBVTtRQUN2QyxrQkFBWSxHQUFXLEtBQUssQ0FBQSxDQUFBLFNBQVM7UUFDckMsMkJBQXFCLEdBQVcsS0FBSyxDQUFBLENBQUEsU0FBUztRQUM5QywwQkFBb0IsR0FBVyxNQUFNLENBQUMsQ0FBQSxRQUFRO1FBQzlDLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFBLFFBQVE7UUFDekMscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsV0FBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixjQUFRLEdBQWdCLElBQUksQ0FBQztRQUM3QixvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFDdEMsY0FBUSxHQUFpQixJQUFJLENBQUM7UUFDOUIsaUJBQVcsR0FBMEIsSUFBSSxDQUFDO1FBQzFDLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLFlBQU0sR0FBWSxLQUFLLENBQUMsQ0FBQSxVQUFVO1FBQ2xDLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUNoQyxZQUFNLEdBQVMsS0FBSyxDQUFDLENBQUEsV0FBVzs7SUEwVnBDLENBQUM7SUF4VkcsOEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCw2QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osWUFBWTtRQUNaLG9FQUFvRTtJQUN4RSxDQUFDO0lBQ0QsNEJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNELDhCQUFNLEdBQU47UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSztZQUFFLE9BQU87UUFDakMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0gsSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBRSwyQkFBVSxDQUFDLE1BQU07Z0JBQUUsT0FBTztZQUN4RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0Qsc0NBQWMsR0FBZCxVQUFlLE9BQTBCLEVBQUUsWUFBZ0MsRUFBRSxhQUFpQztRQUMxRyxJQUFJLEtBQUssR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9CLGtEQUFrRDtRQUNsRCxxQ0FBcUM7UUFDckMsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBRTtTQUM1QjtJQUNMLENBQUM7SUFDRCwwQ0FBa0IsR0FBbEIsVUFBbUIsUUFBdUI7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUNELHlDQUFpQixHQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0QsMENBQWtCLEdBQWxCO1FBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUk7WUFBRSxPQUFPO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztRQUMzRCxJQUFJLENBQUMsV0FBVyxHQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQ0QsZ0NBQVEsR0FBUjtRQUFBLGlCQTJCQztRQTFCRyxJQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBQztZQUMzQyxXQUFXO1lBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDOUIsSUFBRyxRQUFRLEdBQUMsR0FBRyxFQUFDO2dCQUNaLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0QjtpQkFBSTtnQkFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDeEI7U0FDSjthQUFNO1lBQ0gsSUFBSSxNQUFNLEdBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUcsTUFBTSxHQUFDLENBQUMsSUFBRSxDQUFDLEVBQUM7Z0JBQ1gsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNwRjtJQUNMLENBQUM7SUFDRCwrQkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxzQ0FBYyxHQUFkLFVBQWUsTUFBZTtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBQ0QsNEJBQUksR0FBSjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLElBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUUsMkJBQVUsQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFDdEQsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELHVDQUFlLEdBQWY7UUFDSSxJQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBRSxJQUFJO1lBQUUsT0FBTztRQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMzSCwyREFBMkQ7SUFDL0QsQ0FBQztJQUNELDJCQUFHLEdBQUg7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxvQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCw2QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0Qsa0NBQVUsR0FBVjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsSUFBRyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBRSwyQkFBVSxDQUFDLFdBQVc7Z0JBQUUsT0FBTztZQUM3RCxLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUNELGFBQWE7SUFDYixvQ0FBWSxHQUFaO1FBQUEsaUJBYUM7UUFaRyxzQkFBWSxDQUFDLFNBQVMsQ0FBQyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQywyQkFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFFLDJCQUFVLENBQUMsWUFBWTtnQkFBRSxPQUFPO1lBQzlELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDUCxJQUFJO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNWLElBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUUsMkJBQVUsQ0FBQyxZQUFZO2dCQUFFLE9BQU87WUFDOUQsS0FBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0QsaUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQywyQkFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFDRCxNQUFNO0lBQ04sd0NBQWdCLEdBQWhCLFVBQWlCLEdBQUc7UUFDaEIsSUFBSSxJQUFJLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsNEJBQWtCLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTTtJQUNOLDZCQUFLLEdBQUwsVUFBTSxVQUFVLEVBQUMsS0FBSztRQUNsQixJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFFLE9BQU8sRUFBQztZQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25CO2FBQUk7WUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUNSLHFDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLHNCQUFZLENBQUMsU0FBUyxDQUFDLHdCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELFNBQVM7SUFDVCxvQ0FBWSxHQUFaO1FBQUEsaUJBbUJDO1FBbEJHLHNCQUFZLENBQUMsU0FBUyxDQUFDLHdCQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQ1IsSUFBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQztZQUNqQyxDQUFDLEdBQUMscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkY7YUFBSyxJQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsSUFBSSxFQUFDO1lBQ3hDLENBQUMsR0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuRjthQUFJO1lBQ0QsSUFBSSxNQUFNLEdBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsR0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQSxDQUFDO2dCQUNkLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxHQUFHLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNoRixxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqRjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0QsZ0NBQVEsR0FBUjtRQUNJLElBQUksRUFBRSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNoRSxFQUFFLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQ0QsMkJBQUcsR0FBSDtRQUFBLGlCQVlDO1FBWEcsSUFBRywyQkFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztZQUFFLE9BQU87UUFDdEUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLDJCQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsSUFBRyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBRSwyQkFBVSxDQUFDLE1BQU0sRUFBQztnQkFDNUMsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RGO1FBQ0wsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELDZCQUFLLEdBQUwsVUFBTSxNQUFjLEVBQUUsT0FBbUI7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsNkRBQTZEO1FBQzdELCtCQUErQjtRQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDN0csSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQzlDLGdCQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2QsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEY7SUFDTCxDQUFDO0lBQ0Qsc0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFDRCx1Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUNELHFDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7UUFDckQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxvQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFDO0lBQ3hELENBQUM7SUFDRCx3Q0FBZ0IsR0FBaEIsVUFBaUIsQ0FBUSxFQUFDLENBQVU7UUFBVixrQkFBQSxFQUFBLEtBQVU7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNELHlDQUFpQixHQUFqQixVQUFrQixPQUFtQjtRQUFyQyxpQkErQ0M7UUE5Q0csSUFBRyxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDN0IsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFFLEtBQUssRUFBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztZQUN0QixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxXQUFXLEdBQUcsT0FBTyxJQUFJLDJCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMvRCxRQUFRLE9BQU8sRUFBRTtZQUNiLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ2QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ1IsS0FBSyxHQUFHLDJCQUFVLENBQUMsV0FBVyxDQUFDO2dCQUMvQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUkscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUMvRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztpQkFDakY7cUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLHFCQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdEgsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO2lCQUNoRjtnQkFDRCxNQUFNO1lBQ1YsS0FBSywyQkFBVSxDQUFDLE9BQU87Z0JBQ25CLEtBQUssR0FBRywyQkFBVSxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoSCxNQUFNO1lBQ1YsS0FBSywyQkFBVSxDQUFDLFFBQVE7Z0JBQ3BCLEtBQUssR0FBRywyQkFBVSxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDdEcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxTQUFTO2dCQUNyQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLE1BQU07WUFDVixRQUFRO1NBQ1g7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0Qsd0NBQWdCLEdBQWhCLFVBQWlCLE9BQWU7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO0lBQzFDLENBQUM7SUFDRCxtQ0FBVyxHQUFYLFVBQVksUUFBb0I7UUFBcEIseUJBQUEsRUFBQSxZQUFvQjtRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsa0NBQVUsR0FBVixVQUFXLEtBQWM7UUFDckIsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNELHdDQUFnQixHQUFoQixVQUFpQixPQUFtQjtRQUFwQyxpQkFTQztRQVJHLElBQUksT0FBTyxJQUFJLDJCQUFVLENBQUMsU0FBUyxFQUFFO1lBQ2pDLElBQUksSUFBSSxDQUFDLGFBQWE7Z0JBQUUsT0FBTyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDZCxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMvQixDQUFDLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0QsZ0NBQVEsR0FBUixVQUFTLE1BQWM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNkO0lBQ0wsQ0FBQztJQUNELDhCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFDRCxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0Qsc0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELG9DQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQTdYRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNNO0lBRTFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ007SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDSTtJQUV4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQzs2REFDcEI7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7NkRBQ3BCO0lBRS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ0s7SUFFdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztnREFDSTtJQUU3QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNPO0lBakJWLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0FpWWpDO0lBQUQsb0JBQUM7Q0FqWUQsQUFpWUMsQ0FqWTBDLG1CQUFTLEdBaVluRDtrQkFqWW9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCBhdWRpb01hbmFnZXIgZnJvbSBcIi4uL21haW4vYXVkaW9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBhdHRhY2tUeXBlLCBlbmVteVN0YXRlIH0gZnJvbSBcIi4vYW5pbWF0aW9uU3RhdGVcIjtcbmltcG9ydCBlbmVteUFuaW1hdGlvbiBmcm9tIFwiLi9lbmVteUFuaW1hdGlvblwiO1xuaW1wb3J0IGVuZW15QmFzZSBmcm9tIFwiLi9lbmVteUJhc2VcIjtcbmltcG9ydCBlbmVteUhpdENvbGxpZGVyIGZyb20gXCIuL2VuZW15SGl0Q29sbGlkZXJcIjtcbmltcG9ydCBFdmVudHMgZnJvbSBcIi4vRXZlbnRzXCI7XG5pbXBvcnQgZmlyZVBpbGxhckNvbGxpZGVyIGZyb20gXCIuL2ZpcmVQaWxsYXJDb2xsaWRlclwiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVye1xuICAgIGF0dGFja1xufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEUyMGNvbnRyb2xsZXIgZXh0ZW5kcyBlbmVteUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBmaXJlUGlsbGFyOmNjLlByZWZhYj1udWxsO1xuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgdHBGeF9zdGFydDpjYy5QcmVmYWI9bnVsbDtcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRwRnhfZW5kOmNjLlByZWZhYj1udWxsO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuS8pOWus+aViOaenHjovbTlgY/np7vlgLxcIiB9KVxuICAgIGRhbWFnZUxhYmVsT2Zmc2V0WDogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLkvKTlrrPmlYjmnpx56L205YGP56e75YC8XCIgfSlcbiAgICBkYW1hZ2VMYWJlbE9mZnNldFk6IG51bWJlciA9IDA7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaHBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXG4gICAgaHBCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3RyaW5nKVxuICAgIGRpZUVmZmVjdE5hbWU6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBtb3ZlU3BlZWQ6IG51bWJlciA9IDgwOy8v56e75Yqo6YCf5bqmXG4gICAgbm93U3BlZWQ6IG51bWJlciA9IDA7Ly/lvZPliY3pgJ/luqZcbiAgICBBSV9pbnRlcnZhbDogbnVtYmVyID0gMC44Oy8vYWnpl7TpmpRcbiAgICBzdG9wRGlzdGFuY2U6bnVtYmVyPTQwMDsvL+WBnOatoui3neemu1xuICAgIGhwOiBudW1iZXIgPSAwO1xuICAgIGhwVGltZXM6bnVtYmVyPTE7Ly/ooYDph4/lgI3mlbBcbiAgICBiZUhpdEZvcmNlX3k6IG51bWJlciA9IDM1MDAwOy8v5omL6YeM5YmR5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94OiBudW1iZXIgPSAyNTAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV95X3NodXJpa2VuOiBudW1iZXIgPSA1MDAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94X2F0dGFjazM6IG51bWJlciA9IDQwMDAwMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9hdHRhY2szOiBudW1iZXIgPSAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgc2NhbGVYX3NrZWxldG9uOiBudW1iZXIgPSAwO1xuICAgIGlzRGllOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBlbmVteUFuaW1hdGlvbjogZW5lbXlBbmltYXRpb24gPSBudWxsO1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIGJveENvbGxpZGVyOiBjYy5QaHlzaWNzQm94Q29sbGlkZXIgPSBudWxsO1xuICAgIGlzU3dvcmRSYWluQ2Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01vdmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWkhOS6juenu+WKqOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOmRhbWFnZUNvbGxpZGVyPW51bGw7XG4gICAgaXNUUENEOmJvb2xlYW49ZmFsc2U7Ly/ooqvmlLvlh7voh6rliqh0cOWGt+WNtFxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIHRoaXMuc2NhbGVYX3NrZWxldG9uID0gTWF0aC5hYnModGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGVuZW15QW5pbWF0aW9uKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5lbmVteUNvbnRyb2xsZXIgPSB0aGlzO1xuICAgICAgICB0aGlzLnJpZ2lib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5QaHlzaWNzQm94Q29sbGlkZXIpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc2tlbGV0b24uc2tlbGV0b25EYXRhLl9za2VsZXRvbkNhY2hlLmFuaW1hdGlvbnMpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaHAgPSB0aGlzLmhwTWF4KnRoaXMuaHBUaW1lcztcbiAgICAgICAgdGhpcy5BSV9pbnRlcnZhbCs9TWF0aC5yYW5kb20oKTtcbiAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2VYKCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5za2lsbF9zdGFydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZT09ZW5lbXlTdGF0ZS5hdHRhY2spIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvUGxheWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdDogY2MuUGh5c2ljc0NvbnRhY3QsIHNlbGZDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyLCBvdGhlckNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIpIHtcbiAgICAgICAgbGV0IG90aGVyID0gb3RoZXJDb2xsaWRlci5ub2RlO1xuICAgICAgICAvLyBsZXQgd29ybGRNYW5pZm9sZCA9IGNvbnRhY3QuZ2V0V29ybGRNYW5pZm9sZCgpO1xuICAgICAgICAvLyBsZXQgbm9ybWFsID0gd29ybGRNYW5pZm9sZC5ub3JtYWw7XG4gICAgICAgIGlmIChvdGhlci5ncm91cCA9PSBcImdyb3VuZFwiKSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0RhbWFnZUNvbGxpZGVyKGNvbGxpZGVyOmRhbWFnZUNvbGxpZGVyKXtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW2NvbGxpZGVyXS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgdGhpcy5kbWdDb2xsaWRlcj1jb2xsaWRlcjtcbiAgICB9XG4gICAgZ2V0RGFtYWdlQ29sbGlkZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlblt0aGlzLmRtZ0NvbGxpZGVyXTtcbiAgICB9XG4gICAgaGlkZURhbWFnZUNvbGxpZGVyKCl7XG4gICAgICAgIGlmKHRoaXMuZG1nQ29sbGlkZXI9PW51bGwpIHJldHVybjtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgdGhpcy5kbWdDb2xsaWRlcj1udWxsO1xuICAgIH1cbiAgICBBSV9zdGFydCgpIHtcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5pc0RpZSl7XG4gICAgICAgICAgICAvL+eOqeWutuW3suatuyDlgZzmraLnp7vliqhcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgICAgICAgICB9LDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMuZ2V0RGlzdGFuY2VYKCkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgaWYoZGlzdGFuY2U+MTUwKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNraWxsX3N0YXJ0KCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnRlbGVwb3J0U3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCByYW5kb209Y2FpamlUb29scy5yYW5kb21faW50KDEsMTApO1xuICAgICAgICAgICAgaWYocmFuZG9tJTI9PTApe1xuICAgICAgICAgICAgICAgIHRoaXMuc2tpbGxfc3RhcnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLm1vdmUsIDEsIHRydWUsdHJ1ZSx0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm5vd1NwZWVkID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtdGhpcy5tb3ZlU3BlZWQgOiB0aGlzLm1vdmVTcGVlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBBSV9zdG9wKCkge1xuICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICB9XG4gICAgY2hhbmdlTW92U3RhdGUoaXNNb3ZlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gaXNNb3ZlO1xuICAgIH1cbiAgICBpZGxlKCkge1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDApO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmlkbGUsIDEsIHRydWUsdHJ1ZSx0cnVlKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSE9ZW5lbXlTdGF0ZS5pZGxlKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgICAgIH0sIHRoaXMuQUlfaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBjaGFuZ2VEaXJlY3Rpb24oKSB7XG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllcj09bnVsbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggLSB0aGlzLm5vZGUueCA+IDAgPyAtdGhpcy5zY2FsZVhfc2tlbGV0b24gOiB0aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgLy90aGlzLmhwTm9kZS54ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtMjggOiAyODtcbiAgICB9XG4gICAgZGllKCkge1xuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGVIcCgpO1xuICAgICAgICB0aGlzLmRpZUNvdW50KCk7XG4gICAgfVxuICAgIG1vdmVUb1BsYXllcigpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih0aGlzLm5vd1NwZWVkLDApO1xuICAgIH1cbiAgICBnZXRVcCgpIHtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmdldF91cCwgMSwgZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgICBrbm9ja0Rvd24yKCl7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5rbm9ja19kb3duMiwgMSwgZmFsc2UsIHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSE9ZW5lbXlTdGF0ZS5rbm9ja19kb3duMikgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5nZXRVcCgpO1xuICAgICAgICB9LDAuNSk7XG4gICAgfVxuICAgIHNraWxsX3N0YXJ0KCl7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmZpcmVfcGlsbGFyLCAxLCBmYWxzZSwgdHJ1ZSx0cnVlKTtcbiAgICB9XG4gICAgLy/mjIHnu63mlr3ms5XkuK0gIOaXoOazleaJk+aWrVxuICAgIHNraWxsX21pZGRsZSgpe1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMjBDYXN0KTtcbiAgICAgICAgdGhpcy5vcGVuU3VwZXJBcm1vcigpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuZmlyZV9waWxsYXIyLCAxLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGUhPWVuZW15U3RhdGUuZmlyZV9waWxsYXIyKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnNraWxsX2VuZCgpO1xuICAgICAgICB9LDIuNSk7XG4gICAgICAgIC8v5pa95rOVXG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCk9PntcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGUhPWVuZW15U3RhdGUuZmlyZV9waWxsYXIyKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZpcmVQaWxsYXIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnBvc2l0aW9uKTtcbiAgICAgICAgfSwwLjgsMiwwLjAwMSk7XG4gICAgfVxuICAgIHNraWxsX2VuZCgpe1xuICAgICAgICB0aGlzLmNsb3NlU3VwZXJBcm1vcigpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuZmlyZV9waWxsYXIzLCAxLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIC8v5Yib5bu654Gr5p+xXG4gICAgY3JlYXRlRmlyZVBpbGxhcihwb3Mpe1xuICAgICAgICBsZXQgZmlyZT1jYy5pbnN0YW50aWF0ZSh0aGlzLmZpcmVQaWxsYXIpO1xuICAgICAgICBmaXJlLnNldFBhcmVudCh0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgZmlyZS5zZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlLmdldFNpYmxpbmdJbmRleCgpKTtcbiAgICAgICAgZmlyZS5zZXRQb3NpdGlvbihwb3MueCwtMTk0KTtcbiAgICAgICAgZmlyZS5nZXRDb21wb25lbnQoZmlyZVBpbGxhckNvbGxpZGVyKS5kYW1hZ2U9dGhpcy5kYW1hZ2U7XG4gICAgICAgIGZpcmUuYWN0aXZlPXRydWU7XG4gICAgfVxuICAgIC8v5Lyg6YCB6ZqQ6LqrXG4gICAgYmxpbmsodHJhY2tFbnRyeSxldmVudCl7XG4gICAgICAgIGlmKGV2ZW50LmRhdGEubmFtZT09XCJCbGlua1wiKXtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VDb2xsaWRlcigpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVGWCgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0RW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy/kvKDpgIHliqjkvZzlvIDlp4tcbiAgICB0ZWxlcG9ydFN0YXJ0KCl7XG4gICAgICAgIHRoaXMuaXNUUENEPXRydWU7XG4gICAgICAgIHRoaXMub3BlblN1cGVyQXJtb3IoKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLnRlbGVwb3J0LCAxLCBmYWxzZSwgdHJ1ZSx0cnVlKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkJsaW5rU3RhcnQpO1xuICAgICAgICB9LDAuMik7XG4gICAgfVxuICAgIC8v5Lyg6YCB6Iez5oyH5a6a5Zyw54K5XG4gICAgdHJhbnNwb3J0RW5kKCl7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkJsaW5rRW5kKTtcbiAgICAgICAgbGV0IHg9MDtcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLng8NzAwKXtcbiAgICAgICAgICAgIHg9R2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLngrY2FpamlUb29scy5yYW5kb21faW50KDMwMCxjYy53aW5TaXplLndpZHRoLzEuNik7XG4gICAgICAgIH1lbHNlIGlmKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54PjE3MDApe1xuICAgICAgICAgICAgeD1HYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueC1jYWlqaVRvb2xzLnJhbmRvbV9pbnQoMzAwLGNjLndpblNpemUud2lkdGgvMS42KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgcmFuZG9tPWNhaWppVG9vbHMucmFuZG9tX2ludCgxLDEwKTtcbiAgICAgICAgICAgIHg9cmFuZG9tJTI9PTA/XG4gICAgICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCtjYWlqaVRvb2xzLnJhbmRvbV9pbnQoLWNjLndpblNpemUud2lkdGgvMS42LC0zMDApOlxuICAgICAgICAgICAgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLngrY2FpamlUb29scy5yYW5kb21faW50KDMwMCxjYy53aW5TaXplLndpZHRoLzEuNik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLng9eDtcbiAgICAgICAgdGhpcy5jcmVhdGVGWCgpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5jbG9zZVN1cGVyQXJtb3IoKTtcbiAgICAgICAgICAgIHRoaXMub3BlbkNvbGxpZGVyKCk7XG4gICAgICAgIH0sMC4yKTtcbiAgICB9XG4gICAgY3JlYXRlRlgoKXtcbiAgICAgICAgbGV0IGZ4PWNjLmluc3RhbnRpYXRlKHRoaXMudHBGeF9zdGFydCk7XG4gICAgICAgIGZ4LnNldFBhcmVudCh0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgZnguc2V0U2libGluZ0luZGV4KHRoaXMubm9kZS5nZXRTaWJsaW5nSW5kZXgoKSsxKTtcbiAgICAgICAgZnguc2V0UG9zaXRpb24odGhpcy5ub2RlLngsdGhpcy5ub2RlLnkrdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFkpO1xuICAgICAgICBmeC5hY3RpdmU9dHJ1ZTtcbiAgICB9XG4gICAgaGl0KCkge1xuICAgICAgICBpZihlbmVteVN0YXRlW3RoaXMuZW5lbXlBbmltYXRpb24uc3RhdGVdLmluY2x1ZGVzKFwiZ2V0X2h1cnRcIikpIHJldHVybjtcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLDApO1xuICAgICAgICB0aGlzLnNob3dEYW1hZ2VDb2xsaWRlcihkYW1hZ2VDb2xsaWRlci5hdHRhY2spO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuYXR0YWNrLCAxLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBpZih0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlPT1lbmVteVN0YXRlLmF0dGFjayl7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYW1hZ2VDb2xsaWRlcigpLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLHRoaXMuZGFtYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwwLjUpO1xuICAgIH1cbiAgICBiZUhpdChkYW1hZ2U6IG51bWJlciwgZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDApO1xuICAgICAgICAvLyBsZXQgaXNDb250aW51ZSA9IHRoaXMuY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlKTsvL+iuvue9ruWJkembqOaUu+WHu+mXtOmalFxuICAgICAgICAvLyBpZiAoaXNDb250aW51ZSA9PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuaGlnaExpZ2h0KCk7XG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGVfYmVIaXQoZG1nVHlwZSk7XG4gICAgICAgIGxldCB4ID0gdGhpcy5ub2RlLnNjYWxlWCA8IDAgPyB0aGlzLm5vZGUueCArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYIDogdGhpcy5ub2RlLnggLSB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLm5vZGUueSArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRZO1xuICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2hvd0RhbWFnZUxhYmVsX2VuZW15KHRoaXMubm9kZSwgZGFtYWdlLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIHRoaXMudXBkYXRlSHAoZGFtYWdlKTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgRXZlbnRzLmluc3RhbmNlLmNyZWF0ZUVuZW15RGllRWZmZWN0KHRoaXMubm9kZSwgdGhpcy5kaWVFZmZlY3ROYW1lLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3BlblN1cGVyQXJtb3IoKXtcbiAgICAgICAgdGhpcy5pc1N1cGVyQXJtb3I9dHJ1ZTtcbiAgICB9XG4gICAgY2xvc2VTdXBlckFybW9yKCl7XG4gICAgICAgIHRoaXMuaXNTdXBlckFybW9yPWZhbHNlO1xuICAgIH1cbiAgICBjbG9zZUNvbGxpZGVyKCl7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5PTA7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIuZW5hYmxlZD1mYWxzZTtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5hcHBseSgpO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5lbmFibGVkPWZhbHNlO1xuICAgICAgICB0aGlzLmhpZGVIcCgpO1xuICAgIH1cbiAgICBvcGVuQ29sbGlkZXIoKXtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHk9MjU1O1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmVuYWJsZWQ9dHJ1ZTtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5hcHBseSgpO1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5lbmFibGVkPXRydWU7XG4gICAgfVxuICAgIHNldFJpZ2lib2R5U3BlZWQoeDpudW1iZXIseTpudW1iZXI9MCl7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIoeCx5KTtcbiAgICB9XG4gICAgY2hhbmdlU3RhdGVfYmVIaXQoZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZih0aGlzLmlzU3VwZXJBcm1vcikgcmV0dXJuO1xuICAgICAgICBpZih0aGlzLmlzVFBDRD09ZmFsc2Upe1xuICAgICAgICAgICAgdGhpcy50ZWxlcG9ydFN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuaXNUUENEPWZhbHNlO1xuICAgICAgICAgICAgfSw1KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3RhdGUgPSBudWxsO1xuICAgICAgICBsZXQgaXNLbm9ja0Rvd24gPSBkbWdUeXBlID09IGF0dGFja1R5cGUuYXR0YWNrMyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgc3dpdGNoIChkbWdUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMTpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQyO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2syOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazM6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDUpO1xuICAgICAgICAgICAgICAgIH0sIDAuNCk7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmtub2NrX2Rvd24xO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA8IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICYmIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MigtdGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnggPiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIodGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5qdW1wSGl0OlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLnNodXJpa2VuOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUhpdEZvcmNlX3lfc2h1cmlrZW4pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zd29yZFJhaW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShzdGF0ZSwgMSwgZmFsc2UsIGlzS25vY2tEb3duKTtcbiAgICB9XG4gICAgc2V0TGluZWFyRGFtcGluZyhkYW1waW5nOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJEYW1waW5nID0gZGFtcGluZztcbiAgICB9XG4gICAgc2V0RnJpY3Rpb24oZnJpY3Rpb246IG51bWJlciA9IDApIHtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5mcmljdGlvbiA9IGZyaWN0aW9uO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmFwcGx5KCk7XG4gICAgfVxuICAgIGFwcGx5Rm9yY2UoZm9yY2U6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIHRoaXMucmlnaWJvZHkuYXBwbHlGb3JjZVRvQ2VudGVyKGZvcmNlLCB0cnVlKTtcbiAgICB9XG4gICAgY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmIChkbWdUeXBlID09IGF0dGFja1R5cGUuc3dvcmRSYWluKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N3b3JkUmFpbkNkKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1N3b3JkUmFpbkNkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzLnN3b3JkUmFpbkhpdENkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgdXBkYXRlSHAoZGFtYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ocCAtPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMuaHBCYXIucHJvZ3Jlc3MgPSB0aGlzLmhwIC8gdGhpcy5ocE1heDtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XG4gICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dIcCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuaGlkZUhwKTtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5oaWRlSHAsMik7XG4gICAgfVxuICAgIGhpZGVIcCgpIHtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY2xvc2VIaWdoTGlnaHQpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMSk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJoaWdoTGlnaHRDb2xvclwiLCBbMS4wLDEuMCwxLjAsMC41XSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuY2xvc2VIaWdoTGlnaHQsIDAuMTUpO1xuICAgIH1cbiAgICBjbG9zZUhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImJlSGl0XCIsIDApO1xuICAgIH1cbiAgICBnZXREaXN0YW5jZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUueCAtIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54O1xuICAgIH1cbn1cbiJdfQ==