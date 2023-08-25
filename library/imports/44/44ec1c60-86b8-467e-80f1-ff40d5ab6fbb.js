"use strict";
cc._RF.push(module, '44ec1xghrhGfoDx/0DVq2+7', 'E10controller');
// scripts/game/E10controller.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var bossHp_1 = require("./ui/bossHp");
var uiManager_1 = require("./ui/uiManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
    damageCollider[damageCollider["skill1"] = 1] = "skill1";
    damageCollider[damageCollider["skill2"] = 2] = "skill2";
})(damageCollider || (damageCollider = {}));
var E10controller = /** @class */ (function (_super) {
    __extends(E10controller, _super);
    function E10controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.dieEffectName = "";
        _this.rushSpeed = 700; //冲击速度
        _this.moveSpeed = 120; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.5; //ai间隔
        _this.stopDistance = 300; //停止距离
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 25000; //手里剑攻击作用力
        _this.beHitForce_x = 25000; //普通攻击作用力
        _this.beHitForce_y_shuriken = 50000; //普通攻击作用力
        _this.beHitForce_x_attack3 = 350000; //被击飞作用力
        _this.beHitForce_y_attack3 = 0; //被击飞作用力
        _this.scaleX_skeleton = 0;
        _this.allowMoveTime = 2; //允许move状态最长时间
        _this.allowAttackTime = 2; //允许连续attack次数
        _this.attackTimes = 0; //attack连续次数
        _this.skill1_x = 0; //泰山压顶落地坐标（升空时玩家位置）
        _this.isStartRush = false; //开始冲撞
        _this.isDie = false;
        _this.skeleton = null;
        _this.enemyAnimation = null;
        _this.rigibody = null;
        _this.boxCollider = null;
        _this.isSwordRainCd = false;
        _this.isMove = false; //是否处于移动状态
        _this.isWuDi = false; //无敌状态
        _this.dmgCollider = null;
        _this.isHighLight = false;
        _this.highLight_A = {
            a: 0.5
        };
        return _this;
    }
    E10controller.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E10controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E10controller.prototype.init = function () {
        uiManager_1.default.ins.showBossHp(bossHp_1.bossName.enemy10);
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        this.idle();
    };
    E10controller.prototype.update = function () {
        this.highLightAction();
        this.skill2Move();
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
    E10controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "wall") {
            this.skill2End();
        }
    };
    E10controller.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].getComponent(enemyHitCollider_1.default).enemyControl = this;
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E10controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E10controller.prototype.hideDamageCollider = function (isCompelClose) {
        if (isCompelClose === void 0) { isCompelClose = false; }
        if (this.dmgCollider == null)
            return;
        if (this.dmgCollider == damageCollider.skill1 && isCompelClose == false)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E10controller.prototype.AI_start = function () {
        var _this = this;
        this.allowAttackTime = caijiTools_1.caijiTools.random_int(2, 3);
        this.allowMoveTime = caijiTools_1.caijiTools.random_int(200, 500) / 100;
        if (this.isDie)
            return;
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
            this.enemyAnimation.changeState(animationState_1.enemyState.move, 1, true);
            this.changeMovState(true);
            this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
            this.scheduleOnce(function () {
                if (_this.enemyAnimation.state != animationState_1.enemyState.move)
                    return;
                _this.skill2();
            }, this.allowMoveTime);
        }
    };
    E10controller.prototype.AI_stop = function () {
        this.idle();
    };
    E10controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E10controller.prototype.idle = function (nextState) {
        var _this = this;
        if (nextState === void 0) { nextState = animationState_1.enemyState.idle; }
        this.changeMovState(false);
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.idle, 1, true, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.idle)
                return;
            if (nextState == animationState_1.enemyState.idle) {
                _this.AI_start();
            }
            else {
                _this.skill1();
            }
        }, this.AI_interval);
    };
    E10controller.prototype.changeDirection = function () {
        if (GameManager_1.default.instance.player == null)
            return;
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E10controller.prototype.die = function () {
        this.isDie = true;
        this.endRush();
        this.setRigibodySpeed(0, 0);
        this.changeMovState(false);
        this.unscheduleAllCallbacks();
        this.enemyAnimation.changeState(animationState_1.enemyState.die, 1, false, true);
        this.dieCount();
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10_death);
    };
    E10controller.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    E10controller.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E10controller.prototype.hitComplete = function () {
        var _this = this;
        if (this.attackTimes < this.allowAttackTime) {
            if (this.getDistanceX() <= this.stopDistance) {
                this.hit();
            }
            else {
                this.changeDirection();
                this.enemyAnimation.changeState(animationState_1.enemyState.move, 1, true);
                this.changeMovState(true);
                this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.moveSpeed : this.moveSpeed;
                this.scheduleOnce(function () {
                    if (_this.enemyAnimation.state != animationState_1.enemyState.move)
                        return;
                    _this.skill2();
                }, this.allowMoveTime);
            }
        }
        else {
            this.skill2();
        }
    };
    E10controller.prototype.hit = function () {
        var _this = this;
        this.attackTimes++;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.showDamageCollider(damageCollider.attack);
        this.enemyAnimation.changeState(animationState_1.enemyState.attack, 1, false);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state == animationState_1.enemyState.attack) {
                _this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(_this.node, _this.damage);
            }
        }, 1.1);
        this.scheduleOnce(function () {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10_attack);
        }, 0.6);
    };
    //冲撞攻击-skill
    E10controller.prototype.hit_rush = function () {
        if (this.dmgCollider == damageCollider.skill1) {
            this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(this.node, this.damage, true);
        }
    };
    //泰山压顶开始
    E10controller.prototype.skill1 = function () {
        this.skill1_x = GameManager_1.default.instance.player.x;
        this.skill1_x = this.skeleton.node.scaleX > 0 ? this.skill1_x + 200 : this.skill1_x - 200;
        this.isWuDi = true;
        this.enemyAnimation.changeState(animationState_1.enemyState.skill1, 1, false, true);
        this.showDamageCollider(damageCollider.skill2);
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10_Jump);
    };
    E10controller.prototype.frameEvent_skill1 = function (e, event) {
        var _this = this;
        if (event.data.name == "StopMove") {
            //泰山压顶落地
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.Spell_Earth_02);
            this.isWuDi = false;
            Events_1.default.instance.screenShake();
            this.FX_skill1();
            this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(this.node, Math.floor(this.damage * 1.2), true);
        }
        else if (event.data.name == "Move") {
            //升空移动位置
            this.scheduleOnce(function () {
                _this.node.x = _this.skill1_x;
                _this.skeleton.node.scaleX = _this.node.x < GameManager_1.default.instance.player.x ? -_this.scaleX_skeleton : _this.scaleX_skeleton;
            }, 0.05);
        }
    };
    E10controller.prototype.FX_skill1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/FX_E10")];
                    case 1:
                        prefab = _a.sent();
                        fx = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        fx.setSiblingIndex(GameManager_1.default.instance.player.getSiblingIndex() + 1);
                        fx.setPosition(this.node.x, this.node.y - 20);
                        fx.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    //野蛮冲撞开始
    E10controller.prototype.skill2 = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10Roar);
        this.attackTimes = 0;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.nowSpeed = this.skeleton.node.scaleX > 0 ? -this.rushSpeed : this.rushSpeed;
        this.enemyAnimation.changeState(animationState_1.enemyState.skill2_start, 1, false, true);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.skill2_start)
                return;
            _this.startRush();
        }, 1.1);
    };
    E10controller.prototype.startRush = function () {
        this.isStartRush = true;
        this.showDamageCollider(damageCollider.skill1);
    };
    E10controller.prototype.endRush = function () {
        this.isStartRush = false;
    };
    E10controller.prototype.skill2Middle = function () {
        this.setRigibodySpeed(this.nowSpeed, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.skill2_middle, 1, true, true);
    };
    E10controller.prototype.skill2End = function () {
        var _this = this;
        this.endRush();
        this.setRigibodySpeed(0, 0);
        this.hideDamageCollider(true);
        this.scheduleOnce(function () {
            if (_this.isDie)
                return;
            _this.enemyAnimation.changeState(animationState_1.enemyState.skill2_end, 1, false, true);
        }, 1);
    };
    E10controller.prototype.skill2EndComplete = function () {
        this.idle(animationState_1.enemyState.skill1);
    };
    E10controller.prototype.skill2Move = function () {
        if (this.isStartRush == false)
            return;
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    //脚步
    E10controller.prototype.footStep = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E10Step);
    };
    E10controller.prototype.beHit = function (damage, dmgType) {
        if (this.isDie || this.isWuDi)
            return;
        // let isContinue = this.checkIsSwordRain(dmgType);//设置剑雨攻击间隔
        // if (isContinue == 0) return;
        this.changeState_beHit(dmgType);
        var x = this.node.scaleX < 0 ? this.node.x + this.damageLabelOffsetX : this.node.x - this.damageLabelOffsetX;
        var y = this.node.y + this.damageLabelOffsetY;
        this.highLight();
        Events_1.default.instance.showDamageLabel_enemy(this.node, damage, cc.v2(x, y));
        this.updateHp(damage);
        if (this.hp <= 0) {
            Events_1.default.instance.createEnemyDieEffect(this.node, this.dieEffectName, cc.v2(x, y));
        }
    };
    E10controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        uiManager_1.default.ins.bossHp.addHp(-damage);
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E10controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E10controller.prototype.changeState_beHit = function (dmgType) {
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
    E10controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E10controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E10controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E10controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E10controller.prototype.highLightAction = function () {
        if (this.isHighLight) {
            this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, this.highLight_A.a]);
        }
    };
    E10controller.prototype.highLight = function () {
        var _this = this;
        if (this.isHighLight)
            return;
        this.isHighLight = true;
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        cc.tween(this.highLight_A)
            .to(0.1, { a: 0 })
            .call(function () {
            _this.closeHighLight();
        })
            .start();
    };
    E10controller.prototype.closeHighLight = function () {
        this.isHighLight = false;
        this.highLight_A.a = 0.5;
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E10controller.prototype.getDistanceX = function () {
        return Math.abs(this.node.x - GameManager_1.default.instance.player.x);
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E10controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E10controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.String)
    ], E10controller.prototype, "dieEffectName", void 0);
    E10controller = __decorate([
        ccclass
    ], E10controller);
    return E10controller;
}(enemyBase_1.default));
exports.default = E10controller;

cc._RF.pop();