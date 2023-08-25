
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/E1controller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '678c6psmBlMFaSYGCoDQdQ4', 'E1controller');
// scripts/game/E1controller.ts

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
    damageCollider[damageCollider["attack"] = 0] = "attack";
})(damageCollider || (damageCollider = {}));
var E1controller = /** @class */ (function (_super) {
    __extends(E1controller, _super);
    function E1controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
        _this.skeleton = null;
        _this.enemyAnimation = null;
        _this.rigibody = null;
        _this.boxCollider = null;
        _this.isSwordRainCd = false;
        _this.isMove = false; //是否处于移动状态
        _this.dmgCollider = null;
        return _this;
    }
    E1controller.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E1controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E1controller.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        this.AI_interval += Math.random();
        this.idle();
    };
    E1controller.prototype.update = function () {
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
    E1controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
        }
    };
    E1controller.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E1controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E1controller.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E1controller.prototype.AI_start = function () {
        var _this = this;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.changeMovState(false);
            this.scheduleOnce(function () {
                _this.AI_start();
            }, this.AI_interval);
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
    E1controller.prototype.AI_stop = function () {
        this.idle();
    };
    E1controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E1controller.prototype.idle = function () {
        var _this = this;
        this.changeMovState(false);
        //this.changeDirection();
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.idle, 1, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.idle)
                return;
            _this.AI_start();
        }, this.AI_interval);
    };
    E1controller.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E1controller.prototype.die = function () {
        this.isDie = true;
        this.node.active = false;
        this.hideHp();
        this.dieCount();
    };
    E1controller.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    E1controller.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E1controller.prototype.hit = function () {
        var _this = this;
        if (animationState_1.enemyState[this.enemyAnimation.state].includes("get_hurt"))
            return;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.showDamageCollider(damageCollider.attack);
        this.enemyAnimation.changeState(animationState_1.enemyState.attack, 1, false);
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E1_Sword);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state == animationState_1.enemyState.attack) {
                _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
            }
        }, 0.5);
    };
    E1controller.prototype.beHit = function (damage, dmgType) {
        this.changeMovState(false);
        this.setRigibodySpeed(0);
        //let isContinue = this.checkIsSwordRain(dmgType);//设置剑雨攻击间隔
        //if (isContinue == 0) return;
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
    E1controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E1controller.prototype.changeState_beHit = function (dmgType) {
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
    E1controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E1controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E1controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E1controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E1controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E1controller.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    E1controller.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    E1controller.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    E1controller.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E1controller.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E1controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E1controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], E1controller.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], E1controller.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], E1controller.prototype, "dieEffectName", void 0);
    E1controller = __decorate([
        ccclass
    ], E1controller);
    return E1controller;
}(enemyBase_1.default));
exports.default = E1controller;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRTFjb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUE0QztBQUM1Qyw0Q0FBMkM7QUFDM0MscURBQWdEO0FBQ2hELG1EQUEwRDtBQUMxRCxtREFBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLHVEQUFrRDtBQUNsRCxtQ0FBOEI7QUFDOUIsNkNBQXdDO0FBRWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBQzVDLElBQUssY0FFSjtBQUZELFdBQUssY0FBYztJQUNmLHVEQUFNLENBQUE7QUFDVixDQUFDLEVBRkksY0FBYyxLQUFkLGNBQWMsUUFFbEI7QUFFRDtJQUEwQyxnQ0FBUztJQUFuRDtRQUFBLHFFQThRQztRQTNRRyx3QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFFL0Isd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFFdkIsV0FBSyxHQUFtQixJQUFJLENBQUM7UUFFN0IsbUJBQWEsR0FBVyxFQUFFLENBQUM7UUFFM0IsZUFBUyxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsY0FBUSxHQUFXLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDM0IsaUJBQVcsR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzlCLGtCQUFZLEdBQVEsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUM5QixRQUFFLEdBQVcsQ0FBQyxDQUFDO1FBQ2YsYUFBTyxHQUFRLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDdkIsa0JBQVksR0FBVyxLQUFLLENBQUMsQ0FBQSxVQUFVO1FBQ3ZDLGtCQUFZLEdBQVcsS0FBSyxDQUFBLENBQUEsU0FBUztRQUNyQywyQkFBcUIsR0FBVyxLQUFLLENBQUEsQ0FBQSxTQUFTO1FBQzlDLDBCQUFvQixHQUFX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QixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZW5lbXlTdGF0ZSB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5pbXBvcnQgZW5lbXlBbmltYXRpb24gZnJvbSBcIi4vZW5lbXlBbmltYXRpb25cIjtcbmltcG9ydCBlbmVteUJhc2UgZnJvbSBcIi4vZW5lbXlCYXNlXCI7XG5pbXBvcnQgZW5lbXlIaXRDb2xsaWRlciBmcm9tIFwiLi9lbmVteUhpdENvbGxpZGVyXCI7XG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL0V2ZW50c1wiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVye1xuICAgIGF0dGFja1xufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEUxY29udHJvbGxlciBleHRlbmRzIGVuZW15QmFzZSB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLkvKTlrrPmlYjmnpx46L205YGP56e75YC8XCIgfSlcbiAgICBkYW1hZ2VMYWJlbE9mZnNldFg6IG51bWJlciA9IDA7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceei9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRZOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGhwTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxuICAgIGhwQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlN0cmluZylcbiAgICBkaWVFZmZlY3ROYW1lOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgbW92ZVNwZWVkOiBudW1iZXIgPSAxNTA7Ly/np7vliqjpgJ/luqZcbiAgICBub3dTcGVlZDogbnVtYmVyID0gMDsvL+W9k+WJjemAn+W6plxuICAgIEFJX2ludGVydmFsOiBudW1iZXIgPSAxOy8vYWnpl7TpmpRcbiAgICBzdG9wRGlzdGFuY2U6bnVtYmVyPTEzMDsvL+WBnOatoui3neemu1xuICAgIGhwOiBudW1iZXIgPSAwO1xuICAgIGhwVGltZXM6bnVtYmVyPTE7Ly/ooYDph4/lgI3mlbBcbiAgICBiZUhpdEZvcmNlX3k6IG51bWJlciA9IDI1MDAwOy8v5omL6YeM5YmR5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94OiBudW1iZXIgPSAyNTAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV95X3NodXJpa2VuOiBudW1iZXIgPSA1MDAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94X2F0dGFjazM6IG51bWJlciA9IDM1MDAwMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9hdHRhY2szOiBudW1iZXIgPSAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgc2NhbGVYX3NrZWxldG9uOiBudW1iZXIgPSAwO1xuICAgIGlzRGllOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBlbmVteUFuaW1hdGlvbjogZW5lbXlBbmltYXRpb24gPSBudWxsO1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIGJveENvbGxpZGVyOiBjYy5QaHlzaWNzQm94Q29sbGlkZXIgPSBudWxsO1xuICAgIGlzU3dvcmRSYWluQ2Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01vdmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWkhOS6juenu+WKqOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOmRhbWFnZUNvbGxpZGVyPW51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgdGhpcy5zY2FsZVhfc2tlbGV0b24gPSBNYXRoLmFicyh0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbiA9IHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoZW5lbXlBbmltYXRpb24pO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmVuZW15Q29udHJvbGxlciA9IHRoaXM7XG4gICAgICAgIHRoaXMucmlnaWJvZHkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcik7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5za2VsZXRvbi5za2VsZXRvbkRhdGEuX3NrZWxldG9uQ2FjaGUuYW5pbWF0aW9ucyk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5ocCA9IHRoaXMuaHBNYXgqdGhpcy5ocFRpbWVzO1xuICAgICAgICB0aGlzLkFJX2ludGVydmFsKz1NYXRoLnJhbmRvbSgpO1xuICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5pc01vdmUgPT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gdGhpcy5nZXREaXN0YW5jZVgoKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlKSA8IHRoaXMuc3RvcERpc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmhpdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZT09ZW5lbXlTdGF0ZS5hdHRhY2spIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMubW92ZVRvUGxheWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdDogY2MuUGh5c2ljc0NvbnRhY3QsIHNlbGZDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyLCBvdGhlckNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIpIHtcbiAgICAgICAgbGV0IG90aGVyID0gb3RoZXJDb2xsaWRlci5ub2RlO1xuICAgICAgICAvLyBsZXQgd29ybGRNYW5pZm9sZCA9IGNvbnRhY3QuZ2V0V29ybGRNYW5pZm9sZCgpO1xuICAgICAgICAvLyBsZXQgbm9ybWFsID0gd29ybGRNYW5pZm9sZC5ub3JtYWw7XG4gICAgICAgIGlmIChvdGhlci5ncm91cCA9PSBcImdyb3VuZFwiKSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0RhbWFnZUNvbGxpZGVyKGNvbGxpZGVyOmRhbWFnZUNvbGxpZGVyKXtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW2NvbGxpZGVyXS5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgdGhpcy5kbWdDb2xsaWRlcj1jb2xsaWRlcjtcbiAgICB9XG4gICAgZ2V0RGFtYWdlQ29sbGlkZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlblt0aGlzLmRtZ0NvbGxpZGVyXTtcbiAgICB9XG4gICAgaGlkZURhbWFnZUNvbGxpZGVyKCl7XG4gICAgICAgIGlmKHRoaXMuZG1nQ29sbGlkZXI9PW51bGwpIHJldHVybjtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdLmFjdGl2ZT1mYWxzZTtcbiAgICAgICAgdGhpcy5kbWdDb2xsaWRlcj1udWxsO1xuICAgIH1cbiAgICBBSV9zdGFydCgpIHtcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5pc0RpZSl7XG4gICAgICAgICAgICAvL+eOqeWutuW3suatuyDlgZzmraLnp7vliqhcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgICAgICAgICB9LHRoaXMuQUlfaW50ZXJ2YWwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMuZ2V0RGlzdGFuY2VYKCkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICBsZXQgbW92ZVN0YXRlID0gW1wibW92ZVwiLCBcIm1vdmUyXCIsIFwicnVuXCJdO1xuICAgICAgICAgICAgbGV0IHJhbmRvbVN0YXRlID0gbW92ZVN0YXRlW2NhaWppVG9vbHMucmFuZG9tX2ludCgwLCBtb3ZlU3RhdGUubGVuZ3RoIC0gMSldO1xuICAgICAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlW3JhbmRvbVN0YXRlXSwgMSwgdHJ1ZSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUubW92ZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3dTcGVlZD10aGlzLm1vdmVTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLm1vdmUyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vd1NwZWVkPXRoaXMubW92ZVNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5ydW46XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm93U3BlZWQ9dGhpcy5tb3ZlU3BlZWQqMS44O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUobW92ZVN0YXRlLmluY2x1ZGVzKHRoaXMuc2tlbGV0b24uYW5pbWF0aW9uKSk7XG4gICAgICAgICAgICB0aGlzLm5vd1NwZWVkID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtdGhpcy5ub3dTcGVlZCA6IHRoaXMubm93U3BlZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQUlfc3RvcCgpIHtcbiAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgfVxuICAgIGNoYW5nZU1vdlN0YXRlKGlzTW92ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzTW92ZSA9IGlzTW92ZTtcbiAgICB9XG4gICAgaWRsZSgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgIC8vdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zZXRMaW5lYXJEYW1waW5nKDApO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmlkbGUsIDEsIHRydWUsdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGUhPWVuZW15U3RhdGUuaWRsZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgICAgICB9LCB0aGlzLkFJX2ludGVydmFsKTtcbiAgICB9XG4gICAgY2hhbmdlRGlyZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggLSB0aGlzLm5vZGUueCA+IDAgPyAtdGhpcy5zY2FsZVhfc2tlbGV0b24gOiB0aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgdGhpcy5ocE5vZGUueCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gLTI4IDogMjg7XG4gICAgfVxuICAgIGRpZSgpIHtcbiAgICAgICAgdGhpcy5pc0RpZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRlSHAoKTtcbiAgICAgICAgdGhpcy5kaWVDb3VudCgpO1xuICAgIH1cbiAgICBnZXRVcCgpIHtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmdldF91cCwgMSwgZmFsc2UsIHRydWUpXG4gICAgfVxuICAgIG1vdmVUb1BsYXllcigpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih0aGlzLm5vd1NwZWVkLDApO1xuICAgIH1cbiAgICBoaXQoKSB7XG4gICAgICAgIGlmKGVuZW15U3RhdGVbdGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZV0uaW5jbHVkZXMoXCJnZXRfaHVydFwiKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsMCk7XG4gICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmF0dGFjayk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5hdHRhY2ssIDEsIGZhbHNlKTtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuRTFfU3dvcmQpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZT09ZW5lbXlTdGF0ZS5hdHRhY2spe1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGFtYWdlQ29sbGlkZXIoKS5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcikuaGl0KHRoaXMubm9kZSx0aGlzLmRhbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sMC41KTtcbiAgICB9XG4gICAgYmVIaXQoZGFtYWdlOiBudW1iZXIsIGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwKTtcbiAgICAgICAgLy9sZXQgaXNDb250aW51ZSA9IHRoaXMuY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlKTsvL+iuvue9ruWJkembqOaUu+WHu+mXtOmalFxuICAgICAgICAvL2lmIChpc0NvbnRpbnVlID09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHQoKTtcbiAgICAgICAgdGhpcy5zaG93SHAoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZV9iZUhpdChkbWdUeXBlKTtcbiAgICAgICAgbGV0IHggPSB0aGlzLm5vZGUuc2NhbGVYIDwgMCA/IHRoaXMubm9kZS54ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFggOiB0aGlzLm5vZGUueCAtIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYO1xuICAgICAgICBsZXQgeSA9IHRoaXMubm9kZS55ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFk7XG4gICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zaG93RGFtYWdlTGFiZWxfZW5lbXkodGhpcy5ub2RlLCBkYW1hZ2UsIGNjLnYyKHgsIHkpKTtcbiAgICAgICAgdGhpcy51cGRhdGVIcChkYW1hZ2UpO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICBFdmVudHMuaW5zdGFuY2UuY3JlYXRlRW5lbXlEaWVFZmZlY3QodGhpcy5ub2RlLCB0aGlzLmRpZUVmZmVjdE5hbWUsIGNjLnYyKHgsIHkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRSaWdpYm9keVNwZWVkKHg6bnVtYmVyLHk6bnVtYmVyPTApe1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5PWNjLnYyKHgseSk7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlX2JlSGl0KGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYodGhpcy5pc1N1cGVyQXJtb3IpIHJldHVybjtcbiAgICAgICAgbGV0IHN0YXRlID0gbnVsbDtcbiAgICAgICAgbGV0IGlzS25vY2tEb3duID0gZG1nVHlwZSA9PSBhdHRhY2tUeXBlLmF0dGFjazMgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoZG1nVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazE6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MjtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2szOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZygwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZyg1KTtcbiAgICAgICAgICAgICAgICB9LCAwLjQpO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5rbm9ja19kb3duO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA8IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICYmIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MigtdGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnggPiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIodGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5qdW1wSGl0OlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLnNodXJpa2VuOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUhpdEZvcmNlX3lfc2h1cmlrZW4pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zd29yZFJhaW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShzdGF0ZSwgMSwgZmFsc2UsIGlzS25vY2tEb3duKTtcbiAgICB9XG4gICAgc2V0TGluZWFyRGFtcGluZyhkYW1waW5nOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJEYW1waW5nID0gZGFtcGluZztcbiAgICB9XG4gICAgc2V0RnJpY3Rpb24oZnJpY3Rpb246IG51bWJlciA9IDApIHtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5mcmljdGlvbiA9IGZyaWN0aW9uO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmFwcGx5KCk7XG4gICAgfVxuICAgIGFwcGx5Rm9yY2UoZm9yY2U6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIHRoaXMucmlnaWJvZHkuYXBwbHlGb3JjZVRvQ2VudGVyKGZvcmNlLCB0cnVlKTtcbiAgICB9XG4gICAgY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmIChkbWdUeXBlID09IGF0dGFja1R5cGUuc3dvcmRSYWluKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N3b3JkUmFpbkNkKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1N3b3JkUmFpbkNkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzLnN3b3JkUmFpbkhpdENkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgdXBkYXRlSHAoZGFtYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ocCAtPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMuaHBCYXIucHJvZ3Jlc3MgPSB0aGlzLmhwIC8gdGhpcy5ocE1heDtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XG4gICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dIcCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuaGlkZUhwKTtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5oaWRlSHAsMik7XG4gICAgfVxuICAgIGhpZGVIcCgpIHtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY2xvc2VIaWdoTGlnaHQpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMSk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJoaWdoTGlnaHRDb2xvclwiLCBbMS4wLDEuMCwxLjAsMC41XSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuY2xvc2VIaWdoTGlnaHQsIDAuMTUpO1xuICAgIH1cbiAgICBjbG9zZUhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImJlSGl0XCIsIDApO1xuICAgIH1cbiAgICBnZXREaXN0YW5jZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUueCAtIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54O1xuICAgIH1cbn1cbiJdfQ==