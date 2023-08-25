
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/miniBossFlag.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcbWluaUJvc3NGbGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUE0QztBQUM1Qyw0Q0FBMkM7QUFDM0MscURBQWdEO0FBQ2hELG1EQUEwRDtBQUMxRCxtREFBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLHVEQUFrRDtBQUNsRCxtQ0FBOEI7QUFDOUIsbURBQThDO0FBQzlDLDZDQUF3QztBQUVsQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QyxJQUFLLGNBRUo7QUFGRCxXQUFLLGNBQWM7SUFDZix1REFBTSxDQUFBO0FBQ1YsQ0FBQyxFQUZJLGNBQWMsS0FBZCxjQUFjLFFBRWxCO0FBRUQ7SUFBc0MsNEJBQVM7SUFBL0M7UUFBQSxxRUE2VUM7UUExVUcsZ0JBQVUsR0FBVyxJQUFJLENBQUM7UUFFMUIsd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLFdBQUssR0FBbUIsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGVBQVMsR0FBVyxHQUFHLENBQUMsQ0FBQSxNQUFNO1FBQzlCLGNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzNCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDLENBQUEsTUFBTTtRQUM5QixrQkFBWSxHQUFXLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDakMsUUFBRSxHQUFXLENBQUMsQ0FBQztRQUNmLGFBQU8sR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzFCLGtCQUFZLEdBQVcsS0FBSyxDQUFDLENBQUEsVUFBVTtRQUN2QyxrQkFBWSxHQUFXLEtBQUssQ0FBQSxDQUFBLFNBQVM7UUFDckMsMkJBQXFCLEdB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QUN6RCxDQUFDO0lBQ0QsK0JBQVksR0FBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBelVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ007SUFFMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLENBQUM7d0RBQ3BCO0lBRS9CO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO3dEQUNwQjtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzRDQUNLO0lBRXZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7MkNBQ0k7SUFFN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDTztJQWJWLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0E2VTVCO0lBQUQsZUFBQztDQTdVRCxBQTZVQyxDQTdVcUMsbUJBQVMsR0E2VTlDO2tCQTdVb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1ZGlvTmFtZSB9IGZyb20gXCIuLi9hdWRpb05hbWVNZ3JcIjtcbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi4vbWFpbi9hdWRpb01hbmFnZXJcIjtcbmltcG9ydCB7IGF0dGFja1R5cGUsIGVuZW15U3RhdGUgfSBmcm9tIFwiLi9hbmltYXRpb25TdGF0ZVwiO1xuaW1wb3J0IGVuZW15QW5pbWF0aW9uIGZyb20gXCIuL2VuZW15QW5pbWF0aW9uXCI7XG5pbXBvcnQgZW5lbXlCYXNlIGZyb20gXCIuL2VuZW15QmFzZVwiO1xuaW1wb3J0IGVuZW15SGl0Q29sbGlkZXIgZnJvbSBcIi4vZW5lbXlIaXRDb2xsaWRlclwiO1xuaW1wb3J0IEV2ZW50cyBmcm9tIFwiLi9FdmVudHNcIjtcbmltcG9ydCBGWF9mbGFnVGh1bmRlciBmcm9tIFwiLi9GWF9mbGFnVGh1bmRlclwiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5lbnVtIGRhbWFnZUNvbGxpZGVyIHtcbiAgICBhdHRhY2tcbn1cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBtaW5pQm9zcyBleHRlbmRzIGVuZW15QmFzZSB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHRodW5kZXJQcmU6Y2MuUHJlZmFiPW51bGw7XG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceOi9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRYOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuS8pOWus+aViOaenHnovbTlgY/np7vlgLxcIiB9KVxuICAgIGRhbWFnZUxhYmVsT2Zmc2V0WTogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBocE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBocEJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TdHJpbmcpXG4gICAgZGllRWZmZWN0TmFtZTogc3RyaW5nID0gXCJcIjtcblxuICAgIG1vdmVTcGVlZDogbnVtYmVyID0gMTUwOy8v56e75Yqo6YCf5bqmXG4gICAgbm93U3BlZWQ6IG51bWJlciA9IDA7Ly/lvZPliY3pgJ/luqZcbiAgICBBSV9pbnRlcnZhbDogbnVtYmVyID0gMTsvL2Fp6Ze06ZqUXG4gICAgc3RvcERpc3RhbmNlOiBudW1iZXIgPSAxMzA7Ly/lgZzmraLot53nprtcbiAgICBocDogbnVtYmVyID0gMDtcbiAgICBocFRpbWVzOiBudW1iZXIgPSAxOy8v6KGA6YeP5YCN5pWwXG4gICAgYmVIaXRGb3JjZV95OiBudW1iZXIgPSAyNTAwMDsvL+aJi+mHjOWJkeaUu+WHu+S9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeDogbnVtYmVyID0gMjUwMDAvL+aZrumAmuaUu+WHu+S9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9zaHVyaWtlbjogbnVtYmVyID0gNTAwMDAvL+aZrumAmuaUu+WHu+S9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeF9hdHRhY2szOiBudW1iZXIgPSAzNTAwMDA7Ly/ooqvlh7vpo57kvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3lfYXR0YWNrMzogbnVtYmVyID0gMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIHNjYWxlWF9za2VsZXRvbjogbnVtYmVyID0gMDtcbiAgICBpc0RpZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzV3VEdTogYm9vbGVhbiA9IHRydWU7XG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBlbmVteUFuaW1hdGlvbjogZW5lbXlBbmltYXRpb24gPSBudWxsO1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIGJveENvbGxpZGVyOiBjYy5QaHlzaWNzQm94Q29sbGlkZXIgPSBudWxsO1xuICAgIGlzU3dvcmRSYWluQ2Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01vdmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWkhOS6juenu+WKqOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOiBkYW1hZ2VDb2xsaWRlciA9IG51bGw7XG4gICAgaXNXYXJuaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgd2Fybl9hID0ge1xuICAgICAgICBhOiAwXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uID0gdGhpcy5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XG4gICAgICAgIHRoaXMuc2NhbGVYX3NrZWxldG9uID0gTWF0aC5hYnModGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCk7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGVuZW15QW5pbWF0aW9uKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5lbmVteUNvbnRyb2xsZXIgPSB0aGlzO1xuICAgICAgICB0aGlzLnJpZ2lib2R5ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5QaHlzaWNzQm94Q29sbGlkZXIpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc2tlbGV0b24uc2tlbGV0b25EYXRhLl9za2VsZXRvbkNhY2hlLmFuaW1hdGlvbnMpXG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5ocCA9IHRoaXMuaHBNYXggKiB0aGlzLmhwVGltZXM7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUyN0xpZ2h0bmluZ1RvdGVtRmFsbCk7XG4gICAgfVxuICAgIGFwcGVhckZpbmlzaGVkKCkge1xuICAgICAgICB0aGlzLmlzV3VEdSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLndhcm5pbmdBY3Rpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2VYKCk7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZSkgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlID09IGVuZW15U3RhdGUuYXR0YWNrKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm1vdmVUb1BsYXllcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3Q6IGNjLlBoeXNpY3NDb250YWN0LCBzZWxmQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlciwgb3RoZXJDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlciA9IG90aGVyQ29sbGlkZXIubm9kZTtcbiAgICAgICAgLy8gbGV0IHdvcmxkTWFuaWZvbGQgPSBjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKTtcbiAgICAgICAgLy8gbGV0IG5vcm1hbCA9IHdvcmxkTWFuaWZvbGQubm9ybWFsO1xuICAgICAgICBpZiAob3RoZXIuZ3JvdXAgPT0gXCJncm91bmRcIikge1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dEYW1hZ2VDb2xsaWRlcihjb2xsaWRlcjogZGFtYWdlQ29sbGlkZXIpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW2NvbGxpZGVyXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyID0gY29sbGlkZXI7XG4gICAgfVxuICAgIGdldERhbWFnZUNvbGxpZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdO1xuICAgIH1cbiAgICBoaWRlRGFtYWdlQ29sbGlkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRtZ0NvbGxpZGVyID09IG51bGwpIHJldHVybjtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyID0gbnVsbDtcbiAgICB9XG4gICAgQUlfc3RhcnQoKSB7XG4gICAgICAgIGlmIChHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLmlzRGllKSB7XG4gICAgICAgICAgICAvL+eOqeWutuW3suatuyDlgZzmraLnp7vliqhcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMuZ2V0RGlzdGFuY2VYKCkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnN0b3BEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5oaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICBsZXQgbW92ZVN0YXRlID0gW1wibW92ZVwiLCBcIm1vdmUyXCIsIFwicnVuXCJdO1xuICAgICAgICAgICAgbGV0IHJhbmRvbVN0YXRlID0gbW92ZVN0YXRlW2NhaWppVG9vbHMucmFuZG9tX2ludCgwLCBtb3ZlU3RhdGUubGVuZ3RoIC0gMSldO1xuICAgICAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlW3JhbmRvbVN0YXRlXSwgMSwgdHJ1ZSk7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUubW92ZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3dTcGVlZCA9IHRoaXMubW92ZVNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUubW92ZTI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm93U3BlZWQgPSB0aGlzLm1vdmVTcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUucnVuOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vd1NwZWVkID0gdGhpcy5tb3ZlU3BlZWQgKiAxLjg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VNb3ZTdGF0ZShtb3ZlU3RhdGUuaW5jbHVkZXModGhpcy5za2VsZXRvbi5hbmltYXRpb24pKTtcbiAgICAgICAgICAgIHRoaXMubm93U3BlZWQgPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IC10aGlzLm5vd1NwZWVkIDogdGhpcy5ub3dTcGVlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBBSV9zdG9wKCkge1xuICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICB9XG4gICAgY2hhbmdlTW92U3RhdGUoaXNNb3ZlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuaXNNb3ZlID0gaXNNb3ZlO1xuICAgIH1cbiAgICBpZGxlKCkge1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgLy90aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLCAwKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmlkbGUsIDEsIHRydWUpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZSAhPSBlbmVteVN0YXRlLmlkbGUpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMud2FybmluZygpO1xuICAgICAgICB9LCAyKTtcbiAgICB9XG4gICAgd2FybmluZygpIHtcbiAgICAgICAgdGhpcy5pc1dhcm5pbmc9dHJ1ZTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5zZXRBdHRhY2htZW50KFwiaW1hZ2VzL3RvdGVtL2VmZl9saWdodFwiLCBcImltYWdlcy90b3RlbS9lZmZfbGlnaHRcIik7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uc2V0QXR0YWNobWVudChcImltYWdlcy90b3RlbS9lZmZfbGlnaHQyXCIsIFwiaW1hZ2VzL3RvdGVtL2VmZl9saWdodFwiKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy53YXJuX2EpXG4gICAgICAgIC5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgY2MudHdlZW4oKVxuICAgICAgICAgICAgLnRvKDAuMSx7YToxfSx7XCJlYXNpbmdcIjpcInNpbmVPdXRcIn0pXG4gICAgICAgICAgICAudG8oMC4xLHthOjAuMX0se1wiZWFzaW5nXCI6XCJzaW5lSW5cIn0pXG4gICAgICAgIClcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuYm9tYiwyKTtcbiAgICB9XG4gICAgd2FybmluZ0FjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNXYXJuaW5nID09IGZhbHNlKSByZXR1cm47XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNrZWxldG9uLl9za2VsZXRvbi5zbG90c1s0XS5jb2xvcltcImFcIl0gPSB0aGlzLndhcm5fYS5hO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5za2VsZXRvbi5fc2tlbGV0b24uc2xvdHNbNV0uY29sb3JbXCJhXCJdID0gdGhpcy53YXJuX2EuYTtcbiAgICB9XG4gICAgY2hhbmdlRGlyZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggLSB0aGlzLm5vZGUueCA+IDAgPyAtdGhpcy5zY2FsZVhfc2tlbGV0b24gOiB0aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgLy90aGlzLmhwTm9kZS54ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtMjggOiAyODtcbiAgICB9XG4gICAgZGllKCkge1xuICAgICAgICBpZih0aGlzLmlzRGllKSByZXR1cm47XG4gICAgICAgIHRoaXMuaXNEaWUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzV2FybmluZz1mYWxzZTtcbiAgICAgICAgdGhpcy5oaWRlSHAoKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2tlbGV0b24uX3NrZWxldG9uLnNsb3RzWzRdLmNvbG9yW1wiYVwiXSA9IDA7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNrZWxldG9uLl9za2VsZXRvbi5zbG90c1s1XS5jb2xvcltcImFcIl0gPSAwO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuZGllLCAxLCBmYWxzZSwgdHJ1ZSlcbiAgICAgICAgdGhpcy5kaWVDb3VudCgpXG4gICAgfVxuICAgIC8v5Y+s5ZSk6Zeq55S1XG4gICAgYm9tYigpIHtcbiAgICAgICAgaWYodGhpcy5pc0RpZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc1dhcm5pbmc9ZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZUhwKCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNrZWxldG9uLl9za2VsZXRvbi5zbG90c1s0XS5jb2xvcltcImFcIl0gPSAwO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5za2VsZXRvbi5fc2tlbGV0b24uc2xvdHNbNV0uY29sb3JbXCJhXCJdID0gMDtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLmRpZSwgMSwgZmFsc2UsIHRydWUpO1xuICAgICAgICB0aGlzLkZYX3RodW5kZXIoKTtcbiAgICB9XG4gICAgLy/pl6rnlLVcbiAgICBGWF90aHVuZGVyKCl7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLlRodW5kZXJUb3RlbVN0cnVjayk7XG4gICAgICAgIGxldCB0aHVuZGVyPWNjLmluc3RhbnRpYXRlKHRoaXMudGh1bmRlclByZSk7XG4gICAgICAgIHRodW5kZXIuc2V0UGFyZW50KHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICB0aHVuZGVyLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbik7XG4gICAgICAgIHRodW5kZXIuc2V0U2libGluZ0luZGV4KEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci5nZXRTaWJsaW5nSW5kZXgoKSsxKTtcbiAgICAgICAgdGh1bmRlci5nZXRDb21wb25lbnQoRlhfZmxhZ1RodW5kZXIpLmRhbWFnZT10aGlzLmRhbWFnZTtcbiAgICAgICAgdGh1bmRlci5hY3RpdmU9dHJ1ZTtcbiAgICB9XG4gICAgZGllRW5kKCl7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuICAgIGdldFVwKCkge1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuZ2V0X3VwLCAxLCBmYWxzZSwgdHJ1ZSlcbiAgICB9XG4gICAgbW92ZVRvUGxheWVyKCkge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIodGhpcy5ub3dTcGVlZCwgMCk7XG4gICAgfVxuICAgIGhpdCgpIHtcbiAgICAgICAgaWYgKGVuZW15U3RhdGVbdGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZV0uaW5jbHVkZXMoXCJnZXRfaHVydFwiKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZU1vdlN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSaWdpYm9keVNwZWVkKDAsIDApO1xuICAgICAgICB0aGlzLnNob3dEYW1hZ2VDb2xsaWRlcihkYW1hZ2VDb2xsaWRlci5hdHRhY2spO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuYXR0YWNrLCAxLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZW15QW5pbWF0aW9uLnN0YXRlID09IGVuZW15U3RhdGUuYXR0YWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREYW1hZ2VDb2xsaWRlcigpLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLCB0aGlzLmRhbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDAuNSk7XG4gICAgfVxuICAgIGJlSGl0KGRhbWFnZTogbnVtYmVyLCBkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGllIHx8IHRoaXMuaXNXdUR1KSByZXR1cm47XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCk7XG4gICAgICAgIC8vIGxldCBpc0NvbnRpbnVlID0gdGhpcy5jaGVja0lzU3dvcmRSYWluKGRtZ1R5cGUpOy8v6K6+572u5YmR6Zuo5pS75Ye76Ze06ZqUXG4gICAgICAgIC8vIGlmIChpc0NvbnRpbnVlID09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHQoKTtcbiAgICAgICAgdGhpcy5zaG93SHAoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZV9iZUhpdChkbWdUeXBlKTtcbiAgICAgICAgbGV0IHggPSB0aGlzLm5vZGUuc2NhbGVYIDwgMCA/IHRoaXMubm9kZS54ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFggOiB0aGlzLm5vZGUueCAtIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYO1xuICAgICAgICBsZXQgeSA9IHRoaXMubm9kZS55ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFk7XG4gICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zaG93RGFtYWdlTGFiZWxfZW5lbXkodGhpcy5ub2RlLCBkYW1hZ2UsIGNjLnYyKHgsIHkpKTtcbiAgICAgICAgdGhpcy51cGRhdGVIcChkYW1hZ2UpO1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSB7XG4gICAgICAgICAgICBFdmVudHMuaW5zdGFuY2UuY3JlYXRlRW5lbXlEaWVFZmZlY3QodGhpcy5ub2RlLCB0aGlzLmRpZUVmZmVjdE5hbWUsIGNjLnYyKHgsIHkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXRSaWdpYm9keVNwZWVkKHg6IG51bWJlciwgeTogbnVtYmVyID0gMCkge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoeCwgeSk7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlX2JlSGl0KGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIGxldCBzdGF0ZSA9IG51bGw7XG4gICAgICAgIGxldCBpc0tub2NrRG93biA9IGRtZ1R5cGUgPT0gYXR0YWNrVHlwZS5hdHRhY2szID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGRtZ1R5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2sxOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDI7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazI6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoNSk7XG4gICAgICAgICAgICAgICAgfSwgMC40KTtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUua25vY2tfZG93bjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLnggPCBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoLXRoaXMuYmVIaXRGb3JjZV94X2F0dGFjazMsIHRoaXMuYmVIaXRGb3JjZV95X2F0dGFjazMpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS54ID4gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggJiYgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKHRoaXMuYmVIaXRGb3JjZV94X2F0dGFjazMsIHRoaXMuYmVIaXRGb3JjZV95X2F0dGFjazMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuanVtcEhpdDpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zaHVyaWtlbjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVIaXRGb3JjZV95X3NodXJpa2VuKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuc3dvcmRSYWluOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoc3RhdGUsIDEsIGZhbHNlLCBpc0tub2NrRG93bik7XG4gICAgfVxuICAgIHNldExpbmVhckRhbXBpbmcoZGFtcGluZzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyRGFtcGluZyA9IGRhbXBpbmc7XG4gICAgfVxuICAgIHNldEZyaWN0aW9uKGZyaWN0aW9uOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIuZnJpY3Rpb24gPSBmcmljdGlvbjtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5hcHBseSgpO1xuICAgIH1cbiAgICBhcHBseUZvcmNlKGZvcmNlOiBjYy5WZWMyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3VwZXJBcm1vcikgcmV0dXJuO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmFwcGx5Rm9yY2VUb0NlbnRlcihmb3JjZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGNoZWNrSXNTd29yZFJhaW4oZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZiAoZG1nVHlwZSA9PSBhdHRhY2tUeXBlLnN3b3JkUmFpbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTd29yZFJhaW5DZCkgcmV0dXJuIDA7XG4gICAgICAgICAgICB0aGlzLmlzU3dvcmRSYWluQ2QgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSwgdGhpcy5zd29yZFJhaW5IaXRDZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHVwZGF0ZUhwKGRhbWFnZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuaHAgLT0gZGFtYWdlO1xuICAgICAgICB0aGlzLmhwQmFyLnByb2dyZXNzID0gdGhpcy5ocCAvIHRoaXMuaHBNYXg7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuaHAgPSAwO1xuICAgICAgICAgICAgdGhpcy5kaWUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG93SHAoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLmhpZGVIcCk7XG4gICAgICAgIHRoaXMuaHBOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuaGlkZUhwLCAyKTtcbiAgICB9XG4gICAgaGlkZUhwKCkge1xuICAgICAgICB0aGlzLmhwTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG4gICAgaGlnaExpZ2h0KCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5jbG9zZUhpZ2hMaWdodCk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJiZUhpdFwiLCAxKTtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImhpZ2hMaWdodENvbG9yXCIsIFsxLjAsIDEuMCwgMS4wLCAwLjVdKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5jbG9zZUhpZ2hMaWdodCwgMC4xNSk7XG4gICAgfVxuICAgIGNsb3NlSGlnaExpZ2h0KCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMCk7XG4gICAgfVxuICAgIGdldERpc3RhbmNlWCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS54IC0gR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLng7XG4gICAgfVxufVxuIl19