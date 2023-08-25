
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/E29controller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRTI5Y29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNEM7QUFFNUMscURBQWdEO0FBQ2hELG1EQUEwRDtBQUMxRCxtREFBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLHVEQUFrRDtBQUNsRCxtQ0FBOEI7QUFDOUIsNkNBQXdDO0FBRWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLElBQUssY0FHSjtBQUhELFdBQUssY0FBYztJQUNmLHVEQUFNLENBQUE7SUFDTixtREFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUhJLGNBQWMsS0FBZCxjQUFjLFFBR2xCO0FBRUQ7SUFBMkMsaUNBQVM7SUFBcEQ7UUFBQSxxRUFvVUM7UUFsVUcsV0FBSyxHQUFnQixJQUFJLENBQUM7UUFFMUIsd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLFdBQUssR0FBbUIsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGVBQVMsR0FBVyxHQUFHLENBQUMsQ0FBQSxNQUFNO1FBQzlCLGNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzNCLGlCQUFXLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUNoQyxrQkFBWSxHQUFRLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsUUFBRSxHQUFXLENBQUMsQ0FBQztRQUNmLGFBQU8sR0FBUSxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQ3ZCLGtCQUFZLEdBQVcsS0FBSyxDQUFDLENBQUEsVUFBVTtRQUN2QyxrQkFBWSxHQUFXLEtBQUssQ0FBQSxDQUFBLFNBQVM7UUFDckMsMkJBQXFCLEdBQVcsS0FBSyxDQUFBLENBQUEsU0FBUztRQUM5QywwQkFBb0IsR0FBVyxNQUFNLENBQUMsQ0FBQSxRQUFRO1FBQzlDLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFBLFFBQVE7UUFDekMscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsV0FBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixjQUFRLEdBQWdCLElBQUksQ0FBQztRQUM3QixvQkFBYyxHQUFtQixJQUFJLENBQUM7UUFDdEMsY0FBUSxHQUFpQixJQUFJLENBQUM7UUFDOUIsaUJBQVcsR0FBMEIsSUFBSSxDQUFDO1FBQzFDLG1CQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLFlBQU0sR0FBWSxLQUFLLENBQUMsQ0FBQSxVQUFVO1FBQ2xDLGlCQUFXLEdBQWdCLElBQUksQ0FBQztRQUNoQyxXQUFLLEdBQUM7WUFDRixNQUFNLEVBQUMsQ0FBQztTQUNYLENBQUM7O0lBZ1NOLENBQUM7SUE5UkcsOEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsd0JBQWMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCw2QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osWUFBWTtRQUNaLG9FQUFvRTtJQUN4RSxDQUFDO0lBQ0QsNEJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxJQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELDhCQUFNLEdBQU47UUFDSSxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFFLDJCQUFVLENBQUMsYUFBYSxDQUFDLEVBQUM7WUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNsRDtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLO1lBQUUsT0FBTztRQUNqQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDeEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNILElBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUUsMkJBQVUsQ0FBQyxHQUFHO2dCQUFFLE9BQU87WUFDckQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUNELHNDQUFjLEdBQWQsVUFBZSxPQUEwQixFQUFFLFlBQWdDLEVBQUUsYUFBaUM7UUFDMUcsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztRQUMvQixrREFBa0Q7UUFDbEQscUNBQXFDO1FBQ3JDLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQUU7U0FDNUI7SUFDTCxDQUFDO0lBQ0QsMENBQWtCLEdBQWxCLFVBQW1CLFFBQXVCO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO1FBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUMsUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFDRCx5Q0FBaUIsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELDBDQUFrQixHQUFsQjtRQUNJLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBRSxJQUFJLElBQUUsSUFBSSxDQUFDLFdBQVcsSUFBRSxjQUFjLENBQUMsSUFBSTtZQUFFLE9BQU87UUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO1FBQzNELElBQUksQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFDRCxnQ0FBUSxHQUFSO1FBQUEsaUJBaUJDO1FBaEJHLElBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFDO1lBQzNDLFlBQVk7WUFDWixJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNkLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNILElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQywyQkFBVSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNwRjtJQUNMLENBQUM7SUFDRCwrQkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxzQ0FBYyxHQUFkLFVBQWUsTUFBZTtRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBQ0QsNEJBQUksR0FBSjtRQUFBLGlCQVVDO1FBVEcsSUFBRyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQywyQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFFLDJCQUFVLENBQUMsSUFBSTtnQkFBRSxPQUFPO1lBQ3RELEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCx1Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDM0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0QsMkJBQUcsR0FBSDtRQUFBLGlCQWVDO1FBZEcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDL0MsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxzQkFBWSxDQUFDLFNBQVMsQ0FBQyx3QkFBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxLQUFLO0lBQ0wsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLDJCQUFVLENBQUMsYUFBYSxDQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ25CLE1BQU0sQ0FBQyxDQUFDLEVBQ0wsRUFBRSxDQUFDLEtBQUssRUFBRTthQUNULEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLENBQUM7YUFDeEMsRUFBRSxDQUFDLElBQUksRUFBQyxFQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUNyQzthQUNKLEtBQUssRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUNELEtBQUs7SUFDTCxnQ0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFHLENBQUMsS0FBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUFFLE9BQU87WUFDckMsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZGLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNaLENBQUM7SUFDRCwrQkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ0QsNkJBQUssR0FBTDtRQUFBLGlCQU9DO1FBTkcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLElBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLElBQUUsMkJBQVUsQ0FBQyxjQUFjLENBQUMsRUFBQztnQkFDckQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsMkJBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3pFO1FBQ0wsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRVgsQ0FBQztJQUNELG9DQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUNELDJCQUFHLEdBQUg7UUFBQSxpQkFrQkM7UUFqQkcsSUFBRywyQkFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU87UUFDakUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLDJCQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxRCxzQkFBWSxDQUFDLFNBQVMsQ0FBQyx3QkFBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDZCxJQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFFLDJCQUFVLENBQUMsR0FBRyxFQUFDO2dCQUN6QyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxZQUFZLENBQUMsMEJBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLElBQUksRUFBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ25GLEtBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ2QsSUFBRyxLQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBRSwyQkFBVSxDQUFDLEdBQUcsRUFBQzt3QkFDekMsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsWUFBWSxDQUFDLDBCQUFnQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUN0RjtnQkFDTCxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7YUFDVjtRQUNMLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCw2QkFBSyxHQUFMLFVBQU0sTUFBYyxFQUFFLE9BQW1CO1FBQ3JDLElBQUcsSUFBSSxDQUFDLEtBQUs7WUFBRyxPQUFPO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLDZEQUE2RDtRQUM3RCwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQzdHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUM5QyxnQkFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNkLGdCQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BGO0lBQ0wsQ0FBQztJQUNELHFDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQywyQkFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUNELG9DQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQywyQkFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUNELHdDQUFnQixHQUFoQixVQUFpQixDQUFRLEVBQUMsQ0FBVTtRQUFWLGtCQUFBLEVBQUEsS0FBVTtRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QseUNBQWlCLEdBQWpCLFVBQWtCLE9BQW1CO1FBQXJDLGlCQXdDQztRQXZDRyxJQUFHLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxXQUFXLEdBQUcsT0FBTyxJQUFJLDJCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUMvRCxRQUFRLE9BQU8sRUFBRTtZQUNiLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUM7b0JBQ2QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ1IsS0FBSyxHQUFHLDJCQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDckMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLHFCQUFXLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDL0csSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7aUJBQ2pGO3FCQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3RILElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztpQkFDaEY7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxPQUFPO2dCQUNuQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEgsTUFBTTtZQUNWLEtBQUssMkJBQVUsQ0FBQyxRQUFRO2dCQUNwQixLQUFLLEdBQUcsMkJBQVUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQ3RHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDVixLQUFLLDJCQUFVLENBQUMsU0FBUztnQkFDckIsS0FBSyxHQUFHLDJCQUFVLENBQUMsR0FBRyxDQUFDO2dCQUN2QixNQUFNO1lBQ1YsUUFBUTtTQUNYO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNELHdDQUFnQixHQUFoQixVQUFpQixPQUFlO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0lBQ0QsbUNBQVcsR0FBWCxVQUFZLFFBQW9CO1FBQXBCLHlCQUFBLEVBQUEsWUFBb0I7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELGtDQUFVLEdBQVYsVUFBVyxLQUFjO1FBQ3JCLElBQUksSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDRCx3Q0FBZ0IsR0FBaEIsVUFBaUIsT0FBbUI7UUFBcEMsaUJBU0M7UUFSRyxJQUFJLE9BQU8sSUFBSSwyQkFBVSxDQUFDLFNBQVMsRUFBRTtZQUNqQyxJQUFJLElBQUksQ0FBQyxhQUFhO2dCQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2QsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDL0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUMzQjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNELGdDQUFRLEdBQVIsVUFBUyxNQUFjO1FBQ25CLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDZDtJQUNMLENBQUM7SUFDRCw4QkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsOEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBQ0QsUUFBUTtJQUNSLHFDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNELGdDQUFRLEdBQVIsVUFBUyxLQUFtQjtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNELGlDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCxzQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0Qsb0NBQVksR0FBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBL1REO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDOzZEQUNwQjtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQzs2REFDcEI7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO2dEQUNJO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ087SUFaVixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBb1VqQztJQUFELG9CQUFDO0NBcFVELEFBb1VDLENBcFUwQyxtQkFBUyxHQW9VbkQ7a0JBcFVvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZW5lbXlTdGF0ZSB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5pbXBvcnQgZW5lbXlBbmltYXRpb24gZnJvbSBcIi4vZW5lbXlBbmltYXRpb25cIjtcbmltcG9ydCBlbmVteUJhc2UgZnJvbSBcIi4vZW5lbXlCYXNlXCI7XG5pbXBvcnQgZW5lbXlIaXRDb2xsaWRlciBmcm9tIFwiLi9lbmVteUhpdENvbGxpZGVyXCI7XG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL0V2ZW50c1wiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVye1xuICAgIGF0dGFjayxcbiAgICBib21iXG59XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRTI5Y29udHJvbGxlciBleHRlbmRzIGVuZW15QmFzZXtcblxuICAgIGF0bGFzOmNjLlNwcml0ZUF0bGFzPW51bGw7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceOi9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRYOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuS8pOWus+aViOaenHnovbTlgY/np7vlgLxcIiB9KVxuICAgIGRhbWFnZUxhYmVsT2Zmc2V0WTogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBocE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBocEJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TdHJpbmcpXG4gICAgZGllRWZmZWN0TmFtZTogc3RyaW5nID0gXCJcIjtcblxuICAgIG1vdmVTcGVlZDogbnVtYmVyID0gMTEwOy8v56e75Yqo6YCf5bqmXG4gICAgbm93U3BlZWQ6IG51bWJlciA9IDA7Ly/lvZPliY3pgJ/luqZcbiAgICBBSV9pbnRlcnZhbDogbnVtYmVyID0gMC42Oy8vYWnpl7TpmpRcbiAgICBzdG9wRGlzdGFuY2U6bnVtYmVyPTEwMDsvL+WBnOatoui3neemu1xuICAgIGhwOiBudW1iZXIgPSAwO1xuICAgIGhwVGltZXM6bnVtYmVyPTE7Ly/ooYDph4/lgI3mlbBcbiAgICBiZUhpdEZvcmNlX3k6IG51bWJlciA9IDI1MDAwOy8v5omL6YeM5YmR5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94OiBudW1iZXIgPSAyMDAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV95X3NodXJpa2VuOiBudW1iZXIgPSA1MDAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94X2F0dGFjazM6IG51bWJlciA9IDMzMDAwMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9hdHRhY2szOiBudW1iZXIgPSAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgc2NhbGVYX3NrZWxldG9uOiBudW1iZXIgPSAwO1xuICAgIGlzRGllOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBlbmVteUFuaW1hdGlvbjogZW5lbXlBbmltYXRpb24gPSBudWxsO1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIGJveENvbGxpZGVyOiBjYy5QaHlzaWNzQm94Q29sbGlkZXIgPSBudWxsO1xuICAgIGlzU3dvcmRSYWluQ2Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01vdmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWkhOS6juenu+WKqOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOmRhbWFnZUNvbGxpZGVyPW51bGw7XG4gICAgYWxwaGE9e1xuICAgICAgICBudW1iZXI6MFxuICAgIH07XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgdGhpcy5zY2FsZVhfc2tlbGV0b24gPSBNYXRoLmFicyh0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbiA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoZW5lbXlBbmltYXRpb24pO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmVuZW15Q29udHJvbGxlciA9IHRoaXM7XG4gICAgICAgIHRoaXMucmlnaWJvZHkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcik7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5za2VsZXRvbi5za2VsZXRvbkRhdGEuX3NrZWxldG9uQ2FjaGUuYW5pbWF0aW9ucyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5ocCA9IHRoaXMuaHBNYXgqdGhpcy5ocFRpbWVzO1xuICAgICAgICB0aGlzLkFJX2ludGVydmFsKz1NYXRoLnJhbmRvbSgpO1xuICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZT09ZW5lbXlTdGF0ZVtcIkhlYWQtbWlkZGxlXCJdKXtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29sb3IoWzEuMCwwLjAsMC4wLHRoaXMuYWxwaGEubnVtYmVyXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2VYKCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGU9PWVuZW15U3RhdGUuQXRrKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm1vdmVUb1BsYXllcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3Q6IGNjLlBoeXNpY3NDb250YWN0LCBzZWxmQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlciwgb3RoZXJDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlciA9IG90aGVyQ29sbGlkZXIubm9kZTtcbiAgICAgICAgLy8gbGV0IHdvcmxkTWFuaWZvbGQgPSBjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKTtcbiAgICAgICAgLy8gbGV0IG5vcm1hbCA9IHdvcmxkTWFuaWZvbGQubm9ybWFsO1xuICAgICAgICBpZiAob3RoZXIuZ3JvdXAgPT0gXCJncm91bmRcIikge1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dEYW1hZ2VDb2xsaWRlcihjb2xsaWRlcjpkYW1hZ2VDb2xsaWRlcil7XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlbltjb2xsaWRlcl0uYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXI9Y29sbGlkZXI7XG4gICAgfVxuICAgIGdldERhbWFnZUNvbGxpZGVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl07XG4gICAgfVxuICAgIGhpZGVEYW1hZ2VDb2xsaWRlcigpe1xuICAgICAgICBpZih0aGlzLmRtZ0NvbGxpZGVyPT1udWxsfHx0aGlzLmRtZ0NvbGxpZGVyPT1kYW1hZ2VDb2xsaWRlci5ib21iKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlblt0aGlzLmRtZ0NvbGxpZGVyXS5hY3RpdmU9ZmFsc2U7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXI9bnVsbDtcbiAgICB9XG4gICAgQUlfc3RhcnQoKSB7XG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuaXNEaWUpe1xuICAgICAgICAgICAgLy/njqnlrrblt7Lmrbsg5YGc5q2i56e75YqoZFxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgICAgICAgICB9LDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMuZ2V0RGlzdGFuY2VYKCkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuTW92ZSwgMS4xLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm5vd1NwZWVkID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtdGhpcy5tb3ZlU3BlZWQgOiB0aGlzLm1vdmVTcGVlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBBSV9zdG9wKCkge1xuICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICB9XG4gICAgY2hhbmdlTW92U3RhdGUoaXNNb3ZlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gaXNNb3ZlO1xuICAgIH1cbiAgICBpZGxlKCkge1xuICAgICAgICBpZih0aGlzLmlzRGllKSByZXR1cm47XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLDApO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuSWRsZSwgMSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGUhPWVuZW15U3RhdGUuSWRsZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgICAgICB9LCB0aGlzLkFJX2ludGVydmFsKTtcbiAgICB9XG4gICAgY2hhbmdlRGlyZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggLSB0aGlzLm5vZGUueCA+IDAgPyAtdGhpcy5zY2FsZVhfc2tlbGV0b24gOiB0aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgdGhpcy5ocE5vZGUueCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gOCA6IC04O1xuICAgIH1cbiAgICBkaWUoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oaWRlSHAoKTtcbiAgICAgICAgdGhpcy5jbG9zZUhpZ2hMaWdodCgpO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwwKTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcikuZW5hYmxlZD1mYWxzZTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkRpZSwxLGZhbHNlLHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5yaWdpYm9keS50eXBlPWNjLlJpZ2lkQm9keVR5cGUuU3RhdGljO1xuICAgICAgICB9LDApO1xuICAgICAgICB0aGlzLmRpZUNvdW50KCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMjlFeHBsb3Npb24pO1xuICAgICAgICB9LDAuMSk7XG4gICAgfVxuICAgIC8v5aS057yp5pS+XG4gICAgaGVhZF9taWRkbGUoKXtcbiAgICAgICAgdGhpcy5zdGFydFJlZENvbG9yKCk7XG4gICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmJvbWIpO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGVbXCJIZWFkLW1pZGRsZVwiXSwxLjIsdHJ1ZSx0cnVlKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5oZWFkX2VuZCwyLjMpO1xuICAgICAgICBjYy50d2Vlbih0aGlzLmFscGhhKVxuICAgICAgICAucmVwZWF0KDIsXG4gICAgICAgICAgICBjYy50d2VlbigpXG4gICAgICAgICAgICAudG8oMC42NSx7bnVtYmVyOjAuN30se2Vhc2luZzpcInNpbmVPdXRcIn0pXG4gICAgICAgICAgICAudG8oMC42NSx7bnVtYmVyOjB9LHtlYXNpbmc6XCJzaW5lSW5cIn0pXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdGFydCgpO1xuICAgIH1cbiAgICAvL+WktOeIhueCuFxuICAgIGhlYWRfZW5kKCl7XG4gICAgICAgIHRoaXMuY2xvc2VIaWdoTGlnaHQoKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlW1wiSGVhZC1lbmRcIl0sMS4zLGZhbHNlLHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgaWYoIXRoaXMuZ2V0RGFtYWdlQ29sbGlkZXIoKSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5nZXREYW1hZ2VDb2xsaWRlcigpLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLHRoaXMuZGFtYWdlKTtcbiAgICAgICAgfSwwLjQ1KTtcbiAgICB9XG4gICAgRGVzdHJveSgpe1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH1cbiAgICBnZXRVcCgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGU9PWVuZW15U3RhdGVbXCJLbm9jay11cC1lbmRcIl0pe1xuICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZVtcIkdldC11cFwiXSwgMSwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LDAuMyk7XG5cbiAgICB9XG4gICAgbW92ZVRvUGxheWVyKCkge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5PWNjLnYyKHRoaXMubm93U3BlZWQsMCk7XG4gICAgfVxuICAgIGhpdCgpIHtcbiAgICAgICAgaWYoZW5lbXlTdGF0ZVt0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlXS5pbmNsdWRlcyhcIkhpdFwiKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsMCk7XG4gICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmF0dGFjayk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5BdGssIDEsIGZhbHNlKTtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuRTI5QXR0YWNrKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGU9PWVuZW15U3RhdGUuQXRrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhbWFnZUNvbGxpZGVyKCkuZ2V0Q29tcG9uZW50KGVuZW15SGl0Q29sbGlkZXIpLmhpdCh0aGlzLm5vZGUsdGhpcy5kYW1hZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGU9PWVuZW15U3RhdGUuQXRrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGFtYWdlQ29sbGlkZXIoKS5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcikuaGl0KHRoaXMubm9kZSx0aGlzLmRhbWFnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LDAuOCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sMS4xKTtcbiAgICB9XG4gICAgYmVIaXQoZGFtYWdlOiBudW1iZXIsIGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYodGhpcy5pc0RpZSApIHJldHVybjtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwKTtcbiAgICAgICAgLy8gbGV0IGlzQ29udGludWUgPSB0aGlzLmNoZWNrSXNTd29yZFJhaW4oZG1nVHlwZSk7Ly/orr7nva7liZHpm6jmlLvlh7vpl7TpmpRcbiAgICAgICAgLy8gaWYgKGlzQ29udGludWUgPT0gMCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmhpZ2hMaWdodCgpO1xuICAgICAgICB0aGlzLnNob3dIcCgpO1xuICAgICAgICB0aGlzLmNoYW5nZVN0YXRlX2JlSGl0KGRtZ1R5cGUpO1xuICAgICAgICBsZXQgeCA9IHRoaXMubm9kZS5zY2FsZVggPCAwID8gdGhpcy5ub2RlLnggKyB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WCA6IHRoaXMubm9kZS54IC0gdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFg7XG4gICAgICAgIGxldCB5ID0gdGhpcy5ub2RlLnkgKyB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WTtcbiAgICAgICAgRXZlbnRzLmluc3RhbmNlLnNob3dEYW1hZ2VMYWJlbF9lbmVteSh0aGlzLm5vZGUsIGRhbWFnZSwgY2MudjIoeCwgeSkpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhwKGRhbWFnZSk7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIEV2ZW50cy5pbnN0YW5jZS5jcmVhdGVFbmVteURpZUVmZmVjdCh0aGlzLm5vZGUsIHRoaXMuZGllRWZmZWN0TmFtZSwgY2MudjIoeCwgeSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGtub2NrRG93bkxvb3AoKXtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlW1wiS25vY2stdXAtbG9vcFwiXSwxLGZhbHNlLHRydWUpO1xuICAgIH1cbiAgICBrbm9ja0Rvd25FbmQoKXtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlW1wiS25vY2stdXAtZW5kXCJdLDEsZmFsc2UsdHJ1ZSk7XG4gICAgfVxuICAgIHNldFJpZ2lib2R5U3BlZWQoeDpudW1iZXIseTpudW1iZXI9MCl7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIoeCx5KTtcbiAgICB9XG4gICAgY2hhbmdlU3RhdGVfYmVIaXQoZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZih0aGlzLmlzU3VwZXJBcm1vcikgcmV0dXJuO1xuICAgICAgICBsZXQgc3RhdGUgPSBudWxsO1xuICAgICAgICBsZXQgaXNLbm9ja0Rvd24gPSBkbWdUeXBlID09IGF0dGFja1R5cGUuYXR0YWNrMyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgc3dpdGNoIChkbWdUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMTpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuSGl0O1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2syOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5IaXQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazM6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDUpO1xuICAgICAgICAgICAgICAgIH0sIDAuMik7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlW1wiS25vY2stdXAtc3RhcnRcIl07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS54IDwgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggJiYgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5za2VsZXRvbi5ub2RlLnNjYWxlWCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKC10aGlzLmJlSGl0Rm9yY2VfeF9hdHRhY2szLCB0aGlzLmJlSGl0Rm9yY2VfeV9hdHRhY2szKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5vZGUueCA+IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICYmIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52Mih0aGlzLmJlSGl0Rm9yY2VfeF9hdHRhY2szLCB0aGlzLmJlSGl0Rm9yY2VfeV9hdHRhY2szKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmp1bXBIaXQ6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLkhpdDtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuc2h1cmlrZW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLkhpdDtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlSGl0Rm9yY2VfeV9zaHVyaWtlbikpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLnN3b3JkUmFpbjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuSGl0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKHN0YXRlLCAxLCBmYWxzZSwgaXNLbm9ja0Rvd24pO1xuICAgIH1cbiAgICBzZXRMaW5lYXJEYW1waW5nKGRhbXBpbmc6IG51bWJlcikge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhckRhbXBpbmcgPSBkYW1waW5nO1xuICAgIH1cbiAgICBzZXRGcmljdGlvbihmcmljdGlvbjogbnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmZyaWN0aW9uID0gZnJpY3Rpb247XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIuYXBwbHkoKTtcbiAgICB9XG4gICAgYXBwbHlGb3JjZShmb3JjZTogY2MuVmVjMikge1xuICAgICAgICBpZiAodGhpcy5pc1N1cGVyQXJtb3IpIHJldHVybjtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5hcHBseUZvcmNlVG9DZW50ZXIoZm9yY2UsIHRydWUpO1xuICAgIH1cbiAgICBjaGVja0lzU3dvcmRSYWluKGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYgKGRtZ1R5cGUgPT0gYXR0YWNrVHlwZS5zd29yZFJhaW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3dvcmRSYWluQ2QpIHJldHVybiAwO1xuICAgICAgICAgICAgdGhpcy5pc1N3b3JkUmFpbkNkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3dvcmRSYWluQ2QgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRoaXMuc3dvcmRSYWluSGl0Q2QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICB1cGRhdGVIcChkYW1hZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLmhwIC09IGRhbWFnZTtcbiAgICAgICAgdGhpcy5ocEJhci5wcm9ncmVzcyA9IHRoaXMuaHAgLyB0aGlzLmhwTWF4O1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcbiAgICAgICAgICAgIHRoaXMuZGllKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0hwKCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5oaWRlSHApO1xuICAgICAgICB0aGlzLmhwTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmhpZGVIcCwyKTtcbiAgICB9XG4gICAgaGlkZUhwKCkge1xuICAgICAgICB0aGlzLmhwTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgLy/lpLTpg6jlj5jlpKfpl6rnuqJcbiAgICBzdGFydFJlZENvbG9yKCl7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJiZUhpdFwiLCAxKTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImhpZ2hMaWdodENvbG9yXCIsIFsxLjAsMC4wLDAuMCwwLjBdKTtcbiAgICB9XG4gICAgc2V0Q29sb3IoY29sb3I6QXJyYXk8bnVtYmVyPil7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJoaWdoTGlnaHRDb2xvclwiLGNvbG9yKTtcbiAgICB9XG4gICAgaGlnaExpZ2h0KCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jbG9zZUhpZ2hMaWdodCk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJiZUhpdFwiLCAxKTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImhpZ2hMaWdodENvbG9yXCIsIFsxLjAsMS4wLDEuMCwwLjVdKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5jbG9zZUhpZ2hMaWdodCwgMC4xNSk7XG4gICAgfVxuICAgIGNsb3NlSGlnaExpZ2h0KCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMCk7XG4gICAgfVxuICAgIGdldERpc3RhbmNlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS54IC0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLng7XG4gICAgfVxufSJdfQ==