"use strict";
cc._RF.push(module, '07446vuLudCTZ1bGrDVe7v7', 'E39controller');
// scripts/game/E39controller.ts

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
var E39Laser_1 = require("./E39Laser");
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
    damageCollider[damageCollider["laser"] = 0] = "laser";
    damageCollider[damageCollider["forward"] = 1] = "forward";
    damageCollider[damageCollider["scratch"] = 2] = "scratch";
})(damageCollider || (damageCollider = {}));
var E39controller = /** @class */ (function (_super) {
    __extends(E39controller, _super);
    function E39controller() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.dieEffectName = "";
        _this.rushSpeed = 700; //冲击速度
        _this.moveSpeed = 140; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.5; //ai间隔
        _this.stopDistance = 230; //停止距离
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
        _this.isWuDi = true; //无敌状态
        _this.dmgCollider = null;
        _this.isHighLight = false;
        _this.highLight_A = {
            a: 0.5
        };
        _this.nomalAttackMax = 5; //普通攻击连续最大次数
        _this.normalAttackTimes = 0; //普通攻击次数（达一定次数后升空放小蜘蛛）
        _this.lastAttackState = null;
        _this.spiderlingPrefab = null;
        return _this;
    }
    E39controller.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    E39controller.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    E39controller.prototype.init = function () {
        var _this = this;
        uiManager_1.default.ins.showBossHp(bossHp_1.bossName.enemy39);
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        //this.idle();
        this.scheduleOnce(function () {
            _this.FX_landing();
        }, 2.4);
    };
    E39controller.prototype.update = function () {
        this.highLightAction();
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
    E39controller.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "wall") {
        }
    };
    E39controller.prototype.showDamageCollider = function (collider) {
        if (collider != damageCollider.laser) {
            this.skeleton.node.children[collider].getComponent(enemyHitCollider_1.default).enemyControl = this;
        }
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    E39controller.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    E39controller.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    E39controller.prototype.AI_start = function () {
        var _this = this;
        this.stopDistance = caijiTools_1.caijiTools.random_int(150, 400);
        if (this.isDie)
            return;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.changeMovState(false);
            this.scheduleOnce(function () {
                _this.AI_start();
            }, 1);
            if ([animationState_1.enemyState.Idle, animationState_1.enemyState.Idle2, animationState_1.enemyState.Idle3].includes(this.enemyAnimation.state))
                return;
            this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true, true);
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
    E39controller.prototype.AI_stop = function () {
        this.idle();
    };
    E39controller.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    E39controller.prototype.idle = function () {
        this.changeMovState(false);
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        var random = caijiTools_1.caijiTools.random_int(1, 3);
        switch (random) {
            case 1:
                this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true, true);
                break;
            case 2:
                this.enemyAnimation.changeState(animationState_1.enemyState.Idle2, 1, true, true);
                break;
            case 3:
                this.enemyAnimation.changeState(animationState_1.enemyState.Idle3, 1, true, true);
                break;
        }
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Above2);
    };
    E39controller.prototype.attack = function () {
        this.changeDirection();
        this.setRigibodySpeed(0, 0);
        this.changeMovState(false);
        this.setLinearDamping(0);
        if (this.normalAttackTimes == this.nomalAttackMax) {
            this.initAttackTimes();
            this.above1();
        }
        else {
            this.normalAttackTimes++;
            var distnace = this.getDistanceX();
            var attackState = [
                animationState_1.enemyState.Jump_FWD,
                animationState_1.enemyState.Jump_Back,
                animationState_1.enemyState.Scratch
            ];
            if (this.lastAttackState != null) {
                attackState.splice(attackState.indexOf(this.lastAttackState), 1);
            }
            var random = caijiTools_1.caijiTools.random_int(0, attackState.length - 1);
            var state = attackState[random];
            if (distnace > 300) {
                //跃击
                state = animationState_1.enemyState.Jump_FWD;
            }
            switch (state) {
                case animationState_1.enemyState.Jump_FWD:
                    this.Jump_FWD();
                    break;
                case animationState_1.enemyState.Jump_Back:
                    this.Jump_Back();
                    break;
                case animationState_1.enemyState.Scratch:
                    this.Scratch();
                    break;
            }
            this.lastAttackState = state;
        }
    };
    E39controller.prototype.initAttackTimes = function () {
        this.normalAttackTimes = 0;
        this.nomalAttackMax = caijiTools_1.caijiTools.random_int(4, 6);
    };
    //攻击结束
    E39controller.prototype.attackComplete = function () {
        var random = caijiTools_1.caijiTools.random_int(1, 100);
        if (random < 30) {
            this.idle();
        }
        else {
            this.AI_start();
        }
    };
    E39controller.prototype.bornComplete = function () {
        this.closeWuDi();
        this.AI_start();
    };
    //开始生成小蜘蛛
    E39controller.prototype.above1Complete = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Above2);
        this.schedule(this.createSpiderling, 0.5, 6);
        this.scheduleOnce(function () {
            _this.above2();
        }, 4);
    };
    E39controller.prototype.createSpiderling = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, spiderling, x;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.spiderlingPrefab == null)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/enemys/spiderling")];
                    case 1:
                        _a.spiderlingPrefab = _b.sent();
                        _b.label = 2;
                    case 2:
                        spiderling = caijiTools_1.caijiTools.createNode(this.spiderlingPrefab, this.node.parent);
                        x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width * 0.6, cc.winSize.width * 0.6);
                        spiderling.setPosition(x, -182);
                        spiderling.setSiblingIndex(this.node.getSiblingIndex());
                        spiderling.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    //着落完成
    E39controller.prototype.above2Complete = function () {
        this.closeWuDi();
        this.AI_start();
    };
    E39controller.prototype.idleComplete = function () {
        if (GameManager_1.default.instance.playerController.isDie)
            return;
        this.AI_start();
    };
    E39controller.prototype.changeDirection = function () {
        if (GameManager_1.default.instance.player == null)
            return;
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x - this.node.x > 0 ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    E39controller.prototype.die = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39_death);
        this.isDie = true;
        this.setRigibodySpeed(0, 0);
        this.changeMovState(false);
        this.unscheduleAllCallbacks();
        this.enemyAnimation.changeState(animationState_1.enemyState.Die, 1, false, true);
        this.dieCount();
    };
    E39controller.prototype.move = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Move, 1, true, true);
    };
    E39controller.prototype.moveToPlayer = function () {
        this.rigibody.linearVelocity = cc.v2(this.nowSpeed, 0);
    };
    E39controller.prototype.openWuDi = function () {
        this.isWuDi = true;
    };
    E39controller.prototype.closeWuDi = function () {
        this.isWuDi = false;
    };
    //升空
    E39controller.prototype.above1 = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Above1);
        this.openWuDi();
        this.enemyAnimation.changeState(animationState_1.enemyState.Above1, 1, false, true);
    };
    //降落
    E39controller.prototype.above2 = function () {
        var _this = this;
        this.node.x = GameManager_1.default.instance.player.x;
        this.enemyAnimation.changeState(animationState_1.enemyState.Above2, 1, false, true);
        this.scheduleOnce(function () {
            _this.FX_landing();
        }, 2.4);
    };
    //后跳激光攻击
    E39controller.prototype.Jump_Back = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Jump);
        this.enemyAnimation.changeState(animationState_1.enemyState.Jump_Back, 1, false);
        this.scheduleOnce(function () {
            var offsetX = _this.skeleton.node.scaleX > 0 ? 150 : -150;
            cc.tween(_this.node)
                .by(0.3, { x: offsetX })
                .call(function () {
                _this.scheduleOnce(function () {
                    if (_this.enemyAnimation.state != animationState_1.enemyState.Jump_Back)
                        return;
                    audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Laser);
                    _this.showDamageCollider(damageCollider.laser);
                }, 0.5);
            })
                .start();
        }, 0.5);
    };
    //前跃攻击
    E39controller.prototype.Jump_FWD = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Jump);
        this.enemyAnimation.changeState(animationState_1.enemyState.Jump_FWD, 1, false);
        this.showDamageCollider(damageCollider.forward);
        this.scheduleOnce(function () {
            var offsetX = _this.skeleton.node.scaleX > 0 ? -150 : 150;
            cc.tween(_this.node)
                .by(0.3, { x: offsetX })
                .call(function () {
                _this.scheduleOnce(function () {
                    if (_this.enemyAnimation.state != animationState_1.enemyState.Jump_FWD)
                        return;
                    audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Attack);
                    _this.hit(_this.damage);
                }, 0.25);
            })
                .start();
        }, 0.5);
    };
    //腿击
    E39controller.prototype.Scratch = function () {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E39Scratch);
        this.enemyAnimation.changeState(animationState_1.enemyState.Scratch, 1, false);
        this.showDamageCollider(damageCollider.scratch);
        this.scheduleOnce(function () {
            if (_this.enemyAnimation.state != animationState_1.enemyState.Scratch)
                return;
            _this.hit(_this.damage);
        }, 0.6);
    };
    //虚弱
    E39controller.prototype.Staggered = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Staggered, 1, false);
    };
    //虚弱结束
    E39controller.prototype.StaggeredReset = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.StaggeredReset, 1, false);
    };
    E39controller.prototype.FX_landing = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audioManager_1.default.playAudio(audioNameMgr_1.audioName.Spell_Earth_02);
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/landingFX_enemy39")];
                    case 1:
                        prefab = _a.sent();
                        fx = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        fx.setSiblingIndex(this.node.getSiblingIndex() + 1);
                        fx.setPosition(this.node.x, this.node.y);
                        fx.active = true;
                        this.scheduleOnce(function () {
                            fx.destroy();
                        }, 2);
                        Events_1.default.instance.screenShake();
                        return [2 /*return*/];
                }
            });
        });
    };
    //脚步
    E39controller.prototype.footStep = function (e, event) {
        //if(event.time>0)
        //audioManager.playAudio(audioName.E39Step,false,0.6);
    };
    E39controller.prototype.beHit = function (damage, dmgType) {
        if (this.isDie || this.isWuDi)
            return;
        // let isContinue = this.checkIsSwordRain(dmgType);//设置剑雨攻击间隔
        // if (isContinue == 0) return;
        this.changeState_beHit(dmgType);
        var x = this.skeleton.node.scaleX > 0 ? this.node.x + this.damageLabelOffsetX : this.node.x - this.damageLabelOffsetX;
        var y = this.node.y + this.damageLabelOffsetY;
        this.highLight();
        Events_1.default.instance.showDamageLabel_enemy(this.node, damage, cc.v2(x, y));
        this.updateHp(damage);
        if (this.hp <= 0) {
            Events_1.default.instance.createEnemyDieEffect(this.node, this.dieEffectName, cc.v2(x, y));
        }
    };
    E39controller.prototype.hit = function (damage) {
        if (this.dmgCollider != damageCollider.laser) {
            this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(this.node, damage);
        }
    };
    E39controller.prototype.laserHit = function () {
        if (this.dmgCollider != damageCollider.laser)
            return;
        this.getDamageCollider().getComponent(E39Laser_1.default).laserCollider.getComponent(enemyHitCollider_1.default).hit(this.node, this.damage);
        this.hideDamageCollider();
    };
    E39controller.prototype.updateHp = function (damage) {
        this.hp -= damage;
        uiManager_1.default.ins.bossHp.addHp(-damage);
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    E39controller.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    E39controller.prototype.changeState_beHit = function (dmgType) {
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
    E39controller.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    E39controller.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    E39controller.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    E39controller.prototype.checkIsSwordRain = function (dmgType) {
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
    E39controller.prototype.highLightAction = function () {
        if (this.isHighLight) {
            this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, this.highLight_A.a]);
        }
    };
    E39controller.prototype.highLight = function () {
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
    E39controller.prototype.closeHighLight = function () {
        this.isHighLight = false;
        this.highLight_A.a = 0.5;
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    E39controller.prototype.getDistanceX = function () {
        return Math.abs(this.node.x - GameManager_1.default.instance.player.x);
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], E39controller.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], E39controller.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.String)
    ], E39controller.prototype, "dieEffectName", void 0);
    E39controller = __decorate([
        ccclass
    ], E39controller);
    return E39controller;
}(enemyBase_1.default));
exports.default = E39controller;

cc._RF.pop();