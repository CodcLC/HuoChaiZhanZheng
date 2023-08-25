
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/E2controller.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9a40xSQqJKM4RqNHl6mG72', 'E2controller');
// scripts/game/E2controller.ts

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
var Events_1 = require("./Events");
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
})(damageCollider || (damageCollider = {}));
var E2controller = /** @class */ (function (_super) {
    __extends(E2controller, _super);
    function E2controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed_fast = 180; //移动速度
        _this.moveSpeed_slow = 100;
        _this.nowSpeed = 0; //当前速度
        _this.lastSpeed = 100; //上一次移动速度
        _this.AI_interval = 1; //ai间隔
        _this.stopDistance = 250; //停止距离
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
        _this.playerPosition = null;
        return _this;
    }
    E2controller.prototype.onLoad = function () {
        this.lastSpeed = this.moveSpeed_slow;
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E2controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E2controller.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        this.AI_interval += Math.random();
        this.AI_start();
    };
    E2controller.prototype.update = function () {
        if (this.isMove == false)
            return;
        this.farAwayPlayer();
    };
    E2controller.prototype.lateUpdate = function () {
        if (this.isMove == false)
            return;
    };
    E2controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "wall") {
            this.skeleton.node.scaleX = -this.skeleton.node.scaleX;
        }
    };
    E2controller.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E2controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E2controller.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E2controller.prototype.AI_start = function () {
        var _this = this;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.scheduleOnce(function () {
                _this.AI_start();
            }, 1);
            return;
        }
        var distance = Math.abs(this.getDistanceX());
        if (distance > this.stopDistance) {
            this.hit();
        }
        else {
            this.changeDirection();
            this.changeMovState(true);
            this.nowSpeed = this.lastSpeed == this.moveSpeed_slow ? this.moveSpeed_fast : this.moveSpeed_slow;
            var timeScale = this.nowSpeed == this.moveSpeed_fast ? 2 : 1;
            this.enemyAnimation.changeState(animationState_1.enemyState.move, timeScale, true);
            this.lastSpeed = this.nowSpeed;
            this.scheduleOnce(function () {
                if (_this.enemyAnimation.state != animationState_1.enemyState.move)
                    return;
                _this.idle();
            }, 2);
        }
    };
    E2controller.prototype.AI_stop = function () {
        this.idle();
    };
    E2controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E2controller.prototype.idle = function (isComeBackHead) {
        var _this = this;
        if (isComeBackHead === void 0) { isComeBackHead = true; }
        this.changeMovState(false);
        if (isComeBackHead) {
            this.comeBackHead();
        }
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.idle, 1, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.idle)
                return;
            _this.AI_start();
        }, this.AI_interval);
    };
    E2controller.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x > this.node.x ? this.scaleX_skeleton : -this.scaleX_skeleton;
        this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E2controller.prototype.comeBackHead = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x > this.node.x ? -this.scaleX_skeleton : this.scaleX_skeleton;
        this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E2controller.prototype.die = function () {
        this.isDie = true;
        this.node.active = false;
        this.hideHp();
        this.dieCount();
    };
    E2controller.prototype.knockDown2 = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.knock_down2, 1, false, true);
    };
    E2controller.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    E2controller.prototype.farAwayPlayer = function () {
        this.nowSpeed = this.skeleton.node.scaleX > 0 ? -Math.abs(this.nowSpeed) : Math.abs(this.nowSpeed);
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E2controller.prototype.hit = function () {
        if (animationState_1.enemyState[this.enemyAnimation.state].includes("get_hurt"))
            return;
        this.playerPosition = cc.v2(GameManager_1.default.instance.player.position);
        this.comeBackHead();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.attack, 1, false);
    };
    E2controller.prototype.shootArrow = function (trackEntry, event) {
        if (event.data.name == "Fire") {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.E2Shoot);
            var x = this.skeleton.node.scaleX > 0 ? this.node.x - 35 : this.node.x + 35;
            var y = this.node.y + 110;
            var angle = this.skeleton.node.scaleX > 0 ? -25 : -155;
            Events_1.default.instance.createArrow(this.node, cc.v2(x, y), this.playerPosition, angle, this.damage);
        }
    };
    E2controller.prototype.beHit = function (damage, dmgType) {
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
    E2controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E2controller.prototype.changeState_beHit = function (dmgType) {
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
    E2controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E2controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E2controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E2controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E2controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E2controller.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    E2controller.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    E2controller.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    E2controller.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E2controller.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E2controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E2controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], E2controller.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], E2controller.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], E2controller.prototype, "dieEffectName", void 0);
    E2controller = __decorate([
        ccclass
    ], E2controller);
    return E2controller;
}(enemyBase_1.default));
exports.default = E2controller;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRTJjb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdEQUE0QztBQUM1QyxxREFBZ0Q7QUFDaEQsbURBQTBEO0FBQzFELG1EQUE4QztBQUM5Qyx5Q0FBb0M7QUFDcEMsbUNBQThCO0FBQzlCLDZDQUF3QztBQUVsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QyxJQUFLLGNBRUo7QUFGRCxXQUFLLGNBQWM7SUFDZix1REFBTSxDQUFBO0FBQ1YsQ0FBQyxFQUZJLGNBQWMsS0FBZCxjQUFjLFFBRWxCO0FBRUQ7SUFBMEMsZ0NBQVM7SUFBbkQ7UUFBQSxxRUFzUkM7UUFuUkcsd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLFdBQUssR0FBbUIsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVcsRUFBRSxDQUFDO1FBRzNCLG9CQUFjLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUNuQyxvQkFBYyxHQUFRLEdBQUcsQ0FBQztRQUMxQixjQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUMzQixlQUFTLEdBQVEsR0FBRyxDQUFDLENBQUEsU0FBUztRQUM5QixpQkFBVyxHQUFXLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFDOUIsa0JBQVksR0FBUSxHQUFHLENBQUMsQ0FBQSxNQUFNO1FBQzlCLFFBQUUsR0FBVyxDQUFDLENBQUM7UUFDZixhQUFPLEdBQVEsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUN2QixrQkFBWSxHQUFXLEtBQUssQ0FBQyxDQUFBLFVBQVU7UUFDdkMsa0JBQVksR0FBVyxLQUFLLENBQUEsQ0FBQSxTQUFTO1FBQ3JDLDJCQUFxQixHQUFX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dXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi4vYXVkaW9OYW1lTWdyXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZW5lbXlTdGF0ZSB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5pbXBvcnQgZW5lbXlBbmltYXRpb24gZnJvbSBcIi4vZW5lbXlBbmltYXRpb25cIjtcbmltcG9ydCBlbmVteUJhc2UgZnJvbSBcIi4vZW5lbXlCYXNlXCI7XG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL0V2ZW50c1wiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVye1xuICAgIGF0dGFja1xufVxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEUyY29udHJvbGxlciBleHRlbmRzIGVuZW15QmFzZSB7XG5cbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5GbG9hdCwgdG9vbHRpcDogXCLkvKTlrrPmlYjmnpx46L205YGP56e75YC8XCIgfSlcbiAgICBkYW1hZ2VMYWJlbE9mZnNldFg6IG51bWJlciA9IDA7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceei9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRZOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGhwTm9kZTogY2MuTm9kZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlByb2dyZXNzQmFyKVxuICAgIGhwQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlN0cmluZylcbiAgICBkaWVFZmZlY3ROYW1lOiBzdHJpbmcgPSBcIlwiO1xuICAgIFxuXG4gICAgbW92ZVNwZWVkX2Zhc3Q6IG51bWJlciA9IDE4MDsvL+enu+WKqOmAn+W6plxuICAgIG1vdmVTcGVlZF9zbG93Om51bWJlcj0xMDA7XG4gICAgbm93U3BlZWQ6IG51bWJlciA9IDA7Ly/lvZPliY3pgJ/luqZcbiAgICBsYXN0U3BlZWQ6bnVtYmVyPTEwMDsvL+S4iuS4gOasoeenu+WKqOmAn+W6plxuICAgIEFJX2ludGVydmFsOiBudW1iZXIgPSAxOy8vYWnpl7TpmpRcbiAgICBzdG9wRGlzdGFuY2U6bnVtYmVyPTI1MDsvL+WBnOatoui3neemu1xuICAgIGhwOiBudW1iZXIgPSAwO1xuICAgIGhwVGltZXM6bnVtYmVyPTE7Ly/ooYDph4/lgI3mlbBcbiAgICBiZUhpdEZvcmNlX3k6IG51bWJlciA9IDI1MDAwOy8v5omL6YeM5YmR5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94OiBudW1iZXIgPSAyNTAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV95X3NodXJpa2VuOiBudW1iZXIgPSA1MDAwMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94X2F0dGFjazM6IG51bWJlciA9IDM1MDAwMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9hdHRhY2szOiBudW1iZXIgPSAwOy8v6KKr5Ye76aOe5L2c55So5YqbXG4gICAgc2NhbGVYX3NrZWxldG9uOiBudW1iZXIgPSAwO1xuICAgIGlzRGllOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBlbmVteUFuaW1hdGlvbjogZW5lbXlBbmltYXRpb24gPSBudWxsO1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIGJveENvbGxpZGVyOiBjYy5QaHlzaWNzQm94Q29sbGlkZXIgPSBudWxsO1xuICAgIGlzU3dvcmRSYWluQ2Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01vdmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWkhOS6juenu+WKqOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOmRhbWFnZUNvbGxpZGVyPW51bGw7XG4gICAgcGxheWVyUG9zaXRpb246Y2MuVmVjMj1udWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmxhc3RTcGVlZD10aGlzLm1vdmVTcGVlZF9zbG93O1xuICAgICAgICB0aGlzLnNrZWxldG9uID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIHRoaXMuc2NhbGVYX3NrZWxldG9uID0gTWF0aC5hYnModGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGVuZW15QW5pbWF0aW9uKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5lbmVteUNvbnRyb2xsZXIgPSB0aGlzO1xuICAgICAgICB0aGlzLnJpZ2lib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5QaHlzaWNzQm94Q29sbGlkZXIpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc2tlbGV0b24uc2tlbGV0b25EYXRhLl9za2VsZXRvbkNhY2hlLmFuaW1hdGlvbnMpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMuaHAgPSB0aGlzLmhwTWF4KnRoaXMuaHBUaW1lcztcbiAgICAgICAgdGhpcy5BSV9pbnRlcnZhbCs9TWF0aC5yYW5kb20oKTtcbiAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgIH1cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTW92ZSA9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmZhckF3YXlQbGF5ZXIoKTtcbiAgICB9XG4gICAgbGF0ZVVwZGF0ZSgpe1xuICAgICAgICBpZiAodGhpcy5pc01vdmUgPT0gZmFsc2UpIHJldHVybjtcbiAgICB9XG4gICAgb25CZWdpbkNvbnRhY3QoY29udGFjdDogY2MuUGh5c2ljc0NvbnRhY3QsIHNlbGZDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyLCBvdGhlckNvbGxpZGVyOiBjYy5QaHlzaWNzQ29sbGlkZXIpIHtcbiAgICAgICAgbGV0IG90aGVyID0gb3RoZXJDb2xsaWRlci5ub2RlO1xuICAgICAgICAvLyBsZXQgd29ybGRNYW5pZm9sZCA9IGNvbnRhY3QuZ2V0V29ybGRNYW5pZm9sZCgpO1xuICAgICAgICAvLyBsZXQgbm9ybWFsID0gd29ybGRNYW5pZm9sZC5ub3JtYWw7XG4gICAgICAgIGlmIChvdGhlci5ncm91cCA9PSBcIndhbGxcIikge1xuICAgICAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWD0tdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG93RGFtYWdlQ29sbGlkZXIoY29sbGlkZXI6ZGFtYWdlQ29sbGlkZXIpe1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bY29sbGlkZXJdLmFjdGl2ZT10cnVlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyPWNvbGxpZGVyO1xuICAgIH1cbiAgICBnZXREYW1hZ2VDb2xsaWRlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdO1xuICAgIH1cbiAgICBoaWRlRGFtYWdlQ29sbGlkZXIoKXtcbiAgICAgICAgaWYodGhpcy5kbWdDb2xsaWRlcj09bnVsbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl0uYWN0aXZlPWZhbHNlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyPW51bGw7XG4gICAgfVxuICAgIEFJX3N0YXJ0KCkge1xuICAgICAgICBpZihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLmlzRGllKXtcbiAgICAgICAgICAgIC8v546p5a625bey5q27IOWBnOatouenu+WKqFxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgICAgICAgICB9LDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMuZ2V0RGlzdGFuY2VYKCkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPiB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKHRydWUpO1xuICAgICAgICAgICAgdGhpcy5ub3dTcGVlZCA9dGhpcy5sYXN0U3BlZWQ9PXRoaXMubW92ZVNwZWVkX3Nsb3c/dGhpcy5tb3ZlU3BlZWRfZmFzdDp0aGlzLm1vdmVTcGVlZF9zbG93O1xuICAgICAgICAgICAgbGV0IHRpbWVTY2FsZT10aGlzLm5vd1NwZWVkPT10aGlzLm1vdmVTcGVlZF9mYXN0PzI6MTtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5tb3ZlLCB0aW1lU2NhbGUsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5sYXN0U3BlZWQ9dGhpcy5ub3dTcGVlZDtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSE9ZW5lbXlTdGF0ZS5tb3ZlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgICAgICAgICB9LDIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIEFJX3N0b3AoKSB7XG4gICAgICAgIHRoaXMuaWRsZSgpO1xuICAgIH1cbiAgICBjaGFuZ2VNb3ZTdGF0ZShpc01vdmU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pc01vdmUgPSBpc01vdmU7XG4gICAgfVxuICAgIGlkbGUoaXNDb21lQmFja0hlYWQ6Ym9vbGVhbj10cnVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICBpZihpc0NvbWVCYWNrSGVhZCl7XG4gICAgICAgICAgICB0aGlzLmNvbWVCYWNrSGVhZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZygwKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsMCk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5pZGxlLCAxLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSE9ZW5lbXlTdGF0ZS5pZGxlKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLkFJX3N0YXJ0KCk7XG4gICAgICAgIH0sIHRoaXMuQUlfaW50ZXJ2YWwpO1xuICAgIH1cbiAgICBjaGFuZ2VEaXJlY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPSBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+dGhpcy5ub2RlLnggPyB0aGlzLnNjYWxlWF9za2VsZXRvbiA6IC10aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgdGhpcy5ocE5vZGUueCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gLTI4IDogMjg7XG4gICAgfVxuICAgIGNvbWVCYWNrSGVhZCgpe1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLnNjYWxlWF9za2VsZXRvbiA6IHRoaXMuc2NhbGVYX3NrZWxldG9uO1xuICAgICAgICB0aGlzLmhwTm9kZS54ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtMjggOiAyODtcbiAgICB9XG4gICAgZGllKCkge1xuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGVIcCgpO1xuICAgICAgICB0aGlzLmRpZUNvdW50KCk7XG4gICAgfVxuICAgIGtub2NrRG93bjIoKXtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmtub2NrX2Rvd24yLCAxLCBmYWxzZSwgdHJ1ZSlcbiAgICB9XG4gICAgZ2V0VXAoKSB7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5nZXRfdXAsIDEsIGZhbHNlLCB0cnVlKVxuICAgIH1cbiAgICBmYXJBd2F5UGxheWVyKCl7XG4gICAgICAgIHRoaXMubm93U3BlZWQ9dGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWD4wPy1NYXRoLmFicyh0aGlzLm5vd1NwZWVkKTpNYXRoLmFicyh0aGlzLm5vd1NwZWVkKTtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih0aGlzLm5vd1NwZWVkLDApO1xuICAgIH1cbiAgICBoaXQoKSB7XG4gICAgICAgIGlmKGVuZW15U3RhdGVbdGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZV0uaW5jbHVkZXMoXCJnZXRfaHVydFwiKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnBsYXllclBvc2l0aW9uPWNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMuY29tZUJhY2tIZWFkKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCwwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmF0dGFjaywgMSwgZmFsc2UpO1xuICAgIH1cbiAgICBzaG9vdEFycm93KHRyYWNrRW50cnksZXZlbnQpe1xuICAgICAgICBpZihldmVudC5kYXRhLm5hbWU9PVwiRmlyZVwiKXtcbiAgICAgICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUyU2hvb3QpO1xuICAgICAgICAgICAgbGV0IHg9dGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWD4wP3RoaXMubm9kZS54LTM1OnRoaXMubm9kZS54KzM1O1xuICAgICAgICAgICAgbGV0IHk9dGhpcy5ub2RlLnkrMTEwO1xuICAgICAgICAgICAgbGV0IGFuZ2xlPXRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVg+MD8tMjU6LTE1NTtcbiAgICAgICAgICAgIEV2ZW50cy5pbnN0YW5jZS5jcmVhdGVBcnJvdyh0aGlzLm5vZGUsY2MudjIoeCx5KSx0aGlzLnBsYXllclBvc2l0aW9uLGFuZ2xlLHRoaXMuZGFtYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBiZUhpdChkYW1hZ2U6IG51bWJlciwgZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDApO1xuICAgICAgICAvLyBsZXQgaXNDb250aW51ZSA9IHRoaXMuY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlKTsvL+iuvue9ruWJkembqOaUu+WHu+mXtOmalFxuICAgICAgICAvLyBpZiAoaXNDb250aW51ZSA9PSAwKSByZXR1cm47XG4gICAgICAgIHRoaXMuaGlnaExpZ2h0KCk7XG4gICAgICAgIHRoaXMuc2hvd0hwKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGVfYmVIaXQoZG1nVHlwZSk7XG4gICAgICAgIGxldCB4ID0gdGhpcy5ub2RlLnNjYWxlWCA8IDAgPyB0aGlzLm5vZGUueCArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYIDogdGhpcy5ub2RlLnggLSB0aGlzLmRhbWFnZUxhYmVsT2Zmc2V0WDtcbiAgICAgICAgbGV0IHkgPSB0aGlzLm5vZGUueSArIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRZO1xuICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2hvd0RhbWFnZUxhYmVsX2VuZW15KHRoaXMubm9kZSwgZGFtYWdlLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIHRoaXMudXBkYXRlSHAoZGFtYWdlKTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgRXZlbnRzLmluc3RhbmNlLmNyZWF0ZUVuZW15RGllRWZmZWN0KHRoaXMubm9kZSwgdGhpcy5kaWVFZmZlY3ROYW1lLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0UmlnaWJvZHlTcGVlZCh4Om51bWJlcix5Om51bWJlcj0wKXtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih4LHkpO1xuICAgIH1cbiAgICBjaGFuZ2VTdGF0ZV9iZUhpdChkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIGxldCBzdGF0ZSA9IG51bGw7XG4gICAgICAgIGxldCBpc0tub2NrRG93biA9IGRtZ1R5cGUgPT0gYXR0YWNrVHlwZS5hdHRhY2szID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGRtZ1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2sxOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDI7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoNSk7XG4gICAgICAgICAgICAgICAgfSwgMC40KTtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUua25vY2tfZG93bjE7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZS54IDwgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggJiYgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5za2VsZXRvbi5ub2RlLnNjYWxlWCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKC10aGlzLmJlSGl0Rm9yY2VfeF9hdHRhY2szLCB0aGlzLmJlSGl0Rm9yY2VfeV9hdHRhY2szKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5vZGUueCA+IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICYmIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52Mih0aGlzLmJlSGl0Rm9yY2VfeF9hdHRhY2szLCB0aGlzLmJlSGl0Rm9yY2VfeV9hdHRhY2szKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmp1bXBIaXQ6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuc2h1cmlrZW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlSGl0Rm9yY2VfeV9zaHVyaWtlbikpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLnN3b3JkUmFpbjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKHN0YXRlLCAxLCBmYWxzZSwgaXNLbm9ja0Rvd24pO1xuICAgIH1cbiAgICBzZXRMaW5lYXJEYW1waW5nKGRhbXBpbmc6IG51bWJlcikge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhckRhbXBpbmcgPSBkYW1waW5nO1xuICAgIH1cbiAgICBzZXRGcmljdGlvbihmcmljdGlvbjogbnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmZyaWN0aW9uID0gZnJpY3Rpb247XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIuYXBwbHkoKTtcbiAgICB9XG4gICAgYXBwbHlGb3JjZShmb3JjZTogY2MuVmVjMikge1xuICAgICAgICBpZiAodGhpcy5pc1N1cGVyQXJtb3IpIHJldHVybjtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5hcHBseUZvcmNlVG9DZW50ZXIoZm9yY2UsIHRydWUpO1xuICAgIH1cbiAgICBjaGVja0lzU3dvcmRSYWluKGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYgKGRtZ1R5cGUgPT0gYXR0YWNrVHlwZS5zd29yZFJhaW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3dvcmRSYWluQ2QpIHJldHVybiAwO1xuICAgICAgICAgICAgdGhpcy5pc1N3b3JkUmFpbkNkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3dvcmRSYWluQ2QgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIHRoaXMuc3dvcmRSYWluSGl0Q2QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICB1cGRhdGVIcChkYW1hZ2U6IG51bWJlcikge1xuICAgICAgICB0aGlzLmhwIC09IGRhbWFnZTtcbiAgICAgICAgdGhpcy5ocEJhci5wcm9ncmVzcyA9IHRoaXMuaHAgLyB0aGlzLmhwTWF4O1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhwID0gMDtcbiAgICAgICAgICAgIHRoaXMuZGllKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0hwKCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5oaWRlSHApO1xuICAgICAgICB0aGlzLmhwTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSh0aGlzLmhpZGVIcCwyKTtcbiAgICB9XG4gICAgaGlkZUhwKCkge1xuICAgICAgICB0aGlzLmhwTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaGlnaExpZ2h0KCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jbG9zZUhpZ2hMaWdodCk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJiZUhpdFwiLCAxKTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImhpZ2hMaWdodENvbG9yXCIsIFsxLjAsMS4wLDEuMCwwLjVdKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5jbG9zZUhpZ2hMaWdodCwgMC4xNSk7XG4gICAgfVxuICAgIGNsb3NlSGlnaExpZ2h0KCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMCk7XG4gICAgfVxuICAgIGdldERpc3RhbmNlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS54IC0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLng7XG4gICAgfVxufVxuIl19