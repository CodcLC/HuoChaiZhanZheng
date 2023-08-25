
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/E18controller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4f53ag9w9ZAg6ZLS5et8u2a', 'E18controller');
// scripts/game/E18controller.ts

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
})(damageCollider || (damageCollider = {}));
var E18controller = /** @class */ (function (_super) {
    __extends(E18controller, _super);
    function E18controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attackCollider = null;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed = 100; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 1; //ai间隔
        _this.stopDistance = 200; //停止距离
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
        return _this;
    }
    E18controller.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E18controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E18controller.prototype.init = function () {
        this.initData();
        this.attackCollider.getComponent(enemyHitCollider_1.default).enemyControl = this;
        this.hp = this.hpMax * this.hpTimes;
        this.idle();
    };
    E18controller.prototype.update = function () {
        if (this.isMove == false)
            return;
        var distance = this.getDistanceX();
        if (Math.abs(distance) < this.stopDistance) {
            this.attack();
        }
        else {
            if (this.enemyAnimation.state == animationState_1.enemyState.attack)
                return;
            this.moveToPlayer();
        }
    };
    E18controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
        }
    };
    E18controller.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E18controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E18controller.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E18controller.prototype.AI_start = function () {
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
            this.attack();
        }
        else {
            this.changeDirection();
            this.enemyAnimation.changeState(animationState_1.enemyState.Move, 1, true, true, true);
            this.changeMovState(true);
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
        }
    };
    E18controller.prototype.AI_stop = function () {
        this.idle();
    };
    E18controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E18controller.prototype.idle = function () {
        var _this = this;
        this.changeMovState(false);
        //this.changeDirection();
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.Idle)
                return;
            _this.AI_start();
        }, this.AI_interval);
    };
    E18controller.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E18controller.prototype.die = function () {
        this.isDie = true;
        this.node.active = false;
        this.hideHp();
        this.dieCount();
    };
    E18controller.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    E18controller.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E18controller.prototype.attack = function () {
        var _this = this;
        if (animationState_1.enemyState[this.enemyAnimation.state].includes("get_hurt"))
            return;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.Atk, 1, false, true, true);
        this.scheduleOnce(function () {
            _this.showDamageCollider(damageCollider.attack);
        }, 0.5);
    };
    E18controller.prototype.Shake = function (trackEntry, event) {
        if (event.data.name == "Shake") {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.E18_Attack);
            this.hideDamageCollider();
            Events_1.default.instance.screenShake(8, 0, 16);
        }
    };
    E18controller.prototype.hit = function () {
        if (this.enemyAnimation.state == animationState_1.enemyState.Atk) {
            this.attackCollider.getComponent(enemyHitCollider_1.default).hit(this.node, this.damage);
            this.hideDamageCollider();
        }
    };
    E18controller.prototype.beHit = function (damage, dmgType) {
        this.changeMovState(false);
        this.setRigibodySpeed(0);
        var isContinue = this.checkIsSwordRain(dmgType); //设置剑雨攻击间隔
        // if (isContinue == 0) return;
        // this.highLight();
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
    E18controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E18controller.prototype.changeState_beHit = function (dmgType) {
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
    E18controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E18controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E18controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E18controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E18controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E18controller.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    E18controller.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    E18controller.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    E18controller.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E18controller.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    __decorate([
        property(cc.Node)
    ], E18controller.prototype, "attackCollider", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E18controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E18controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], E18controller.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], E18controller.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], E18controller.prototype, "dieEffectName", void 0);
    E18controller = __decorate([
        ccclass
    ], E18controller);
    return E18controller;
}(enemyBase_1.default));
exports.default = E18controller;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRTE4Y29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNEM7QUFFNUMscURBQWdEO0FBQ2hELG1EQUEwRDtBQUMxRCxtREFBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLHVEQUFrRDtBQUNsRCxtQ0FBOEI7QUFDOUIsNkNBQXdDO0FBRWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLElBQUssY0FFSjtBQUZELFdBQUssY0FBYztJQUNmLHVEQUFNLENBQUE7QUFDVixDQUFDLEVBRkksY0FBYyxLQUFkLGNBQWMsUUFFbEI7QUFFRDtJQUEyQyxpQ0FBUztJQUFwRDtRQUFBLHFFQTZRQztRQTFRRyxvQkFBYyxHQUFTLElBQUksQ0FBQztRQUc1Qix3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFL0Isd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFFdkIsV0FBSyxHQUFtQixJQUFJLENBQUM7UUFFN0IsbUJBQWEsR0FBVyxFQUFFLENBQUM7UUFFM0IsZUFBUyxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsY0FBUSxHQUFXLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDM0IsaUJBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzlCLGtCQUFZLEdBQVEsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUM5QixRQUFFLEdBQVcsQ0FBQyxDQUFDO1FBQ2YsYUFBTyxHQUFRLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDdkIsa0JBQVksR0FBVyxLQUFLLENBQUMsQ0FBQSxVQUFVO1FBQ3ZDLGtCQUFZLEdBQVcsS0FBSyxDQUFBLENBQUEsU0FBUztRQUNyQywyQkFBcUIsR0FBVyxLQUFLLENBQUEsQ0FBQSxTQUFTO1FB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LENBQUM7SUFDRCxzQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBQ0Qsb0NBQVksR0FBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBelFEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7NkRBQ3BCO0lBRS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDOzZEQUNwQjtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNLO0lBRXZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0RBQ0k7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDTztJQWRWLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0E2UWpDO0lBQUQsb0JBQUM7Q0E3UUQsQUE2UUMsQ0E3UTBDLG1CQUFTLEdBNlFuRDtrQkE3UW9CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgeyBjYWlqaVRvb2xzIH0gZnJvbSBcIi4uL2NhaWppVG9vbHNcIjtcbmltcG9ydCBhdWRpb01hbmFnZXIgZnJvbSBcIi4uL21haW4vYXVkaW9NYW5hZ2VyXCI7XG5pbXBvcnQgeyBhdHRhY2tUeXBlLCBlbmVteVN0YXRlIH0gZnJvbSBcIi4vYW5pbWF0aW9uU3RhdGVcIjtcbmltcG9ydCBlbmVteUFuaW1hdGlvbiBmcm9tIFwiLi9lbmVteUFuaW1hdGlvblwiO1xuaW1wb3J0IGVuZW15QmFzZSBmcm9tIFwiLi9lbmVteUJhc2VcIjtcbmltcG9ydCBlbmVteUhpdENvbGxpZGVyIGZyb20gXCIuL2VuZW15SGl0Q29sbGlkZXJcIjtcbmltcG9ydCBFdmVudHMgZnJvbSBcIi4vRXZlbnRzXCI7XG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbmVudW0gZGFtYWdlQ29sbGlkZXJ7XG4gICAgYXR0YWNrXG59XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRTE4Y29udHJvbGxlciBleHRlbmRzIGVuZW15QmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBhdHRhY2tDb2xsaWRlcjpjYy5Ob2RlPW51bGw7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLkvKTlrrPmlYjmnpx46L205YGP56e75YC8XCIgfSlcbiAgICBkYW1hZ2VMYWJlbE9mZnNldFg6IG51bWJlciA9IDA7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceei9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRZOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGhwTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxuICAgIGhwQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlN0cmluZylcbiAgICBkaWVFZmZlY3ROYW1lOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgbW92ZVNwZWVkOiBudW1iZXIgPSAxMDA7Ly/np7vliqjpgJ/luqZcbiAgICBub3dTcGVlZDogbnVtYmVyID0gMDsvL+W9k+WJjemAn+W6plxuICAgIEFJX2ludGVydmFsOiBudW1iZXIgPSAxOy8vYWnpl7TpmpRcbiAgICBzdG9wRGlzdGFuY2U6bnVtYmVyPTIwMDsvL+WBnOatoui3neemu1xuICAgIGhwOiBudW1iZXIgPSAwO1xuICAgIGhwVGltZXM6bnVtYmVyPTE7Ly/ooYDph4/lgI3mlbBcbiAgICBiZUhpdEZvcmNlX3k6IG51bWJlciA9IDI1MDAwOy8v5omL6YeM5YmR5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94OiBudW1iZXIgPSAyNTAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV95X3NodXJpa2VuOiBudW1iZXIgPSA1MDAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94X2F0dGFjazM6IG51bWJlciA9IDM1MDAwMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9hdHRhY2szOiBudW1iZXIgPSAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgc2NhbGVYX3NrZWxldG9uOiBudW1iZXIgPSAwO1xuICAgIGlzRGllOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBlbmVteUFuaW1hdGlvbjogZW5lbXlBbmltYXRpb24gPSBudWxsO1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIGJveENvbGxpZGVyOiBjYy5QaHlzaWNzQm94Q29sbGlkZXIgPSBudWxsO1xuICAgIGlzU3dvcmRSYWluQ2Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01vdmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWkhOS6juenu+WKqOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOmRhbWFnZUNvbGxpZGVyPW51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgdGhpcy5zY2FsZVhfc2tlbGV0b24gPSBNYXRoLmFicyh0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbiA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoZW5lbXlBbmltYXRpb24pO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmVuZW15Q29udHJvbGxlciA9IHRoaXM7XG4gICAgICAgIHRoaXMucmlnaWJvZHkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcik7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5za2VsZXRvbi5za2VsZXRvbkRhdGEuX3NrZWxldG9uQ2FjaGUuYW5pbWF0aW9ucyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5hdHRhY2tDb2xsaWRlci5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcikuZW5lbXlDb250cm9sPXRoaXM7XG4gICAgICAgIHRoaXMuaHAgPSB0aGlzLmhwTWF4KnRoaXMuaHBUaW1lcztcbiAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgfVxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2VYKCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5hdHRhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGU9PWVuZW15U3RhdGUuYXR0YWNrKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm1vdmVUb1BsYXllcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3Q6IGNjLlBoeXNpY3NDb250YWN0LCBzZWxmQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlciwgb3RoZXJDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlciA9IG90aGVyQ29sbGlkZXIubm9kZTtcbiAgICAgICAgLy8gbGV0IHdvcmxkTWFuaWZvbGQgPSBjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKTtcbiAgICAgICAgLy8gbGV0IG5vcm1hbCA9IHdvcmxkTWFuaWZvbGQubm9ybWFsO1xuICAgICAgICBpZiAob3RoZXIuZ3JvdXAgPT0gXCJncm91bmRcIikge1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dEYW1hZ2VDb2xsaWRlcihjb2xsaWRlcjpkYW1hZ2VDb2xsaWRlcil7XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlbltjb2xsaWRlcl0uYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXI9Y29sbGlkZXI7XG4gICAgfVxuICAgIGdldERhbWFnZUNvbGxpZGVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl07XG4gICAgfVxuICAgIGhpZGVEYW1hZ2VDb2xsaWRlcigpe1xuICAgICAgICBpZih0aGlzLmRtZ0NvbGxpZGVyPT1udWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlblt0aGlzLmRtZ0NvbGxpZGVyXS5hY3RpdmU9ZmFsc2U7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXI9bnVsbDtcbiAgICB9XG4gICAgQUlfc3RhcnQoKSB7XG4gICAgICAgIGlmKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuaXNEaWUpe1xuICAgICAgICAgICAgLy/njqnlrrblt7Lmrbsg5YGc5q2i56e75YqoXG4gICAgICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgICAgICAgICAgfSwxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLmFicyh0aGlzLmdldERpc3RhbmNlWCgpKTtcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy5zdG9wRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLk1vdmUsIDEsIHRydWUsdHJ1ZSx0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm5vd1NwZWVkID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtdGhpcy5tb3ZlU3BlZWQgOiB0aGlzLm1vdmVTcGVlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBBSV9zdG9wKCkge1xuICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICB9XG4gICAgY2hhbmdlTW92U3RhdGUoaXNNb3ZlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gaXNNb3ZlO1xuICAgIH1cbiAgICBpZGxlKCkge1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgLy90aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLDApO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuSWRsZSwgMSwgdHJ1ZSx0cnVlLHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZih0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlIT1lbmVteVN0YXRlLklkbGUpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICAgICAgfSwgdGhpcy5BSV9pbnRlcnZhbCk7XG4gICAgfVxuICAgIGNoYW5nZURpcmVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA9IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54IC0gdGhpcy5ub2RlLnggPiAwID8gLXRoaXMuc2NhbGVYX3NrZWxldG9uIDogdGhpcy5zY2FsZVhfc2tlbGV0b247XG4gICAgICAgIC8vdGhpcy5ocE5vZGUueCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gLTI4IDogMjg7XG4gICAgfVxuICAgIGRpZSgpIHtcbiAgICAgICAgdGhpcy5pc0RpZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRlSHAoKTtcbiAgICAgICAgdGhpcy5kaWVDb3VudCgpO1xuICAgIH1cbiAgICBnZXRVcCgpIHtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmdldF91cCwgMSwgZmFsc2UsIHRydWUpXG4gICAgfVxuICAgIG1vdmVUb1BsYXllcigpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih0aGlzLm5vd1NwZWVkLDApO1xuICAgIH1cbiAgICBhdHRhY2soKXtcbiAgICAgICAgaWYoZW5lbXlTdGF0ZVt0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlXS5pbmNsdWRlcyhcImdldF9odXJ0XCIpKSByZXR1cm47XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkF0aywgMSwgZmFsc2UsdHJ1ZSx0cnVlKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmF0dGFjayk7XG4gICAgICAgIH0sMC41KTtcbiAgICB9XG4gICAgU2hha2UodHJhY2tFbnRyeSwgZXZlbnQpe1xuICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PVwiU2hha2VcIil7XG4gICAgICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5FMThfQXR0YWNrKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZURhbWFnZUNvbGxpZGVyKCk7XG4gICAgICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2NyZWVuU2hha2UoOCwwLDE2KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoaXQoKSB7XG4gICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGU9PWVuZW15U3RhdGUuQXRrKXtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrQ29sbGlkZXIuZ2V0Q29tcG9uZW50KGVuZW15SGl0Q29sbGlkZXIpLmhpdCh0aGlzLm5vZGUsdGhpcy5kYW1hZ2UpO1xuICAgICAgICAgICAgdGhpcy5oaWRlRGFtYWdlQ29sbGlkZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBiZUhpdChkYW1hZ2U6IG51bWJlciwgZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDApO1xuICAgICAgICBsZXQgaXNDb250aW51ZSA9IHRoaXMuY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlKTsvL+iuvue9ruWJkembqOaUu+WHu+mXtOmalFxuICAgICAgICAvLyBpZiAoaXNDb250aW51ZSA9PSAwKSByZXR1cm47XG4gICAgICAgIC8vIHRoaXMuaGlnaExpZ2h0KCk7XG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGVfYmVIaXQoZG1nVHlwZSk7XG4gICAgICAgIGxldCB4ID0gdGhpcy5ub2RlLnNjYWxlWCA8IDAgPyB0aGlzLm5vZGUueCArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYIDogdGhpcy5ub2RlLnggLSB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLm5vZGUueSArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRZO1xuICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2hvd0RhbWFnZUxhYmVsX2VuZW15KHRoaXMubm9kZSwgZGFtYWdlLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIHRoaXMudXBkYXRlSHAoZGFtYWdlKTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgRXZlbnRzLmluc3RhbmNlLmNyZWF0ZUVuZW15RGllRWZmZWN0KHRoaXMubm9kZSwgdGhpcy5kaWVFZmZlY3ROYW1lLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0UmlnaWJvZHlTcGVlZCh4Om51bWJlcix5Om51bWJlcj0wKXtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih4LHkpO1xuICAgIH1cbiAgICBjaGFuZ2VTdGF0ZV9iZUhpdChkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIGxldCBzdGF0ZSA9IG51bGw7XG4gICAgICAgIGxldCBpc0tub2NrRG93biA9IGRtZ1R5cGUgPT0gYXR0YWNrVHlwZS5hdHRhY2szID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGRtZ1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2sxOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDI7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoNSk7XG4gICAgICAgICAgICAgICAgfSwgMC40KTtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUua25vY2tfZG93bjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLnggPCBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoLXRoaXMuYmVIaXRGb3JjZV94X2F0dGFjazMsIHRoaXMuYmVIaXRGb3JjZV95X2F0dGFjazMpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS54ID4gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggJiYgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKHRoaXMuYmVIaXRGb3JjZV94X2F0dGFjazMsIHRoaXMuYmVIaXRGb3JjZV95X2F0dGFjazMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuanVtcEhpdDpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zaHVyaWtlbjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVIaXRGb3JjZV95X3NodXJpa2VuKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuc3dvcmRSYWluOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoc3RhdGUsIDEsIGZhbHNlLCBpc0tub2NrRG93bik7XG4gICAgfVxuICAgIHNldExpbmVhckRhbXBpbmcoZGFtcGluZzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyRGFtcGluZyA9IGRhbXBpbmc7XG4gICAgfVxuICAgIHNldEZyaWN0aW9uKGZyaWN0aW9uOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIuZnJpY3Rpb24gPSBmcmljdGlvbjtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5hcHBseSgpO1xuICAgIH1cbiAgICBhcHBseUZvcmNlKGZvcmNlOiBjYy5WZWMyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3VwZXJBcm1vcikgcmV0dXJuO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmFwcGx5Rm9yY2VUb0NlbnRlcihmb3JjZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNoZWNrSXNTd29yZFJhaW4oZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZiAoZG1nVHlwZSA9PSBhdHRhY2tUeXBlLnN3b3JkUmFpbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTd29yZFJhaW5DZCkgcmV0dXJuIDA7XG4gICAgICAgICAgICB0aGlzLmlzU3dvcmRSYWluQ2QgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgdGhpcy5zd29yZFJhaW5IaXRDZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHVwZGF0ZUhwKGRhbWFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaHAgLT0gZGFtYWdlO1xuICAgICAgICB0aGlzLmhwQmFyLnByb2dyZXNzID0gdGhpcy5ocCAvIHRoaXMuaHBNYXg7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuaHAgPSAwO1xuICAgICAgICAgICAgdGhpcy5kaWUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG93SHAoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmhpZGVIcCk7XG4gICAgICAgIHRoaXMuaHBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuaGlkZUhwLDIpO1xuICAgIH1cbiAgICBoaWRlSHAoKSB7XG4gICAgICAgIHRoaXMuaHBOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBoaWdoTGlnaHQoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmNsb3NlSGlnaExpZ2h0KTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImJlSGl0XCIsIDEpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiaGlnaExpZ2h0Q29sb3JcIiwgWzEuMCwxLjAsMS4wLDAuNV0pO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmNsb3NlSGlnaExpZ2h0LCAwLjE1KTtcbiAgICB9XG4gICAgY2xvc2VIaWdoTGlnaHQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJiZUhpdFwiLCAwKTtcbiAgICB9XG4gICAgZ2V0RGlzdGFuY2VYKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnggLSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueDtcbiAgICB9XG59XG4iXX0=