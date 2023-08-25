
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/bigSquidController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ef252EcV+JEdJiKrqrwrsmr', 'bigSquidController');
// scripts/game/bigSquidController.ts

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
var ladyBugFx_1 = require("./ladyBugFx");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
})(damageCollider || (damageCollider = {}));
var bigSquidController = /** @class */ (function (_super) {
    __extends(bigSquidController, _super);
    function bigSquidController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.rushSpeed = 2000; //冲击速度
        _this.moveSpeed = 350; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 0.5; //ai间隔
        _this.stopDistance = 250; //停止距离
        _this.stopDistance_y = 200; //停止y轴移动距离（200-250）
        _this.hp = 0;
        _this.hpTimes = 1; //血量倍数
        _this.beHitForce_y = 0; //手里剑攻击作用力
        _this.beHitForce_x = 0; //普通攻击作用力
        _this.beHitForce_y_shuriken = 0; //普通攻击作用力
        _this.beHitForce_x_attack3 = 0; //被击飞作用力
        _this.beHitForce_y_attack3 = 0; //被击飞作用力
        _this.scaleX_skeleton = 0;
        _this.isDie = false;
        _this.skeleton = null;
        _this.enemyAnimation = null;
        _this.rigibody = null;
        _this.boxCollider = null;
        _this.isSwordRainCd = false;
        _this.isSuperArmor = false; //是否霸体
        _this.isMove = false; //是否处于移动状态
        _this.dmgCollider = null;
        _this.rushDirect = null;
        _this.rushDistance = 0;
        _this.rushStartPos = null;
        return _this;
    }
    bigSquidController.prototype.onLoad = function () {
        this.skeleton = this.node.children[1].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[1].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    bigSquidController.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
        /*         this.skeleton.skeletonData._skeletonCache.slots[8].color=cc.color(0,0,0,0);
                this.skeleton.skeletonData._skeletonCache.slots[8].darkColor=cc.color(0,0,0,0); */
    };
    bigSquidController.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        var x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width / 1.3, cc.winSize.width / 1.3);
        var y = cc.winSize.height / 2 + caijiTools_1.caijiTools.random_int(30, 100);
        this.node.setPosition(x, y);
        this.AI_start();
    };
    bigSquidController.prototype.update = function () {
        this.checkRushEnd();
        if (this.isMove == false)
            return;
        var distance = this.getDistance();
        if (Math.abs(distance) < this.stopDistance) {
            this.rigibody.linearVelocity = cc.v2(0, 0);
            this.changeMovState(false);
            this.preAttack();
        }
        else {
            if (this.enemyAnimation.state == animationState_1.enemyState.Atk)
                return;
            this.moveToPlayer();
        }
    };
    bigSquidController.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
            if (this.enemyAnimation.state == animationState_1.enemyState.Die2) {
                this.rigibody.enabledContactListener = false;
                this.die_end();
            }
            else {
                this.rushEnd();
            }
        }
        else if (other.group == "wall") {
            contact.disabled = true;
        }
    };
    bigSquidController.prototype.checkRushEnd = function () {
        if (this.enemyAnimation.state == animationState_1.enemyState.Attack) {
            this.rigibody.linearVelocity = cc.v2(this.rushDirect.x * this.rushSpeed, this.rushDirect.y * this.rushSpeed);
            var moveDistance = this.node.position.sub(this.rushStartPos).len();
            if (moveDistance >= this.rushDistance) {
                this.rushEnd();
            }
        }
    };
    bigSquidController.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].getComponent(enemyHitCollider_1.default).enemyControl = this;
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    bigSquidController.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    bigSquidController.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    bigSquidController.prototype.AI_start = function () {
        var _this = this;
        this.changeDirection();
        this.stopDistance = caijiTools_1.caijiTools.random_int(250, 400);
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.scheduleOnce(function () {
                _this.AI_start();
            }, 1);
            return;
        }
        var distance = Math.abs(this.getDistance());
        if (distance < this.stopDistance + 100) {
            var x = this.skeleton.node.scaleX < 0 ?
                GameManager_1.default.instance.player.x - caijiTools_1.caijiTools.random_int(200, 400) :
                GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(200, 400);
            var y = GameManager_1.default.instance.player.y + caijiTools_1.caijiTools.random_int(150, 300);
            var distance_1 = cc.v3(x, y).sub(this.node.position).len();
            cc.tween(this.node)
                .to(distance_1 / 300, { position: cc.v3(x, y) })
                .call(function () {
                var distance = Math.abs(_this.getDistance());
                if (distance > 200 && distance <= 400) {
                    _this.preAttack();
                }
                else {
                    _this.idle();
                }
            })
                .start();
        }
        else {
            this.changeStopDistanceY();
            this.changeMovState(true);
        }
    };
    bigSquidController.prototype.AI_stop = function () {
        this.idle();
    };
    bigSquidController.prototype.changeStopDistanceY = function () {
        this.stopDistance_y = caijiTools_1.caijiTools.random_int(200, 350);
    };
    bigSquidController.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    bigSquidController.prototype.idle = function () {
        var _this = this;
        this.skeleton.node.angle = 0;
        this.changeMovState(false);
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true, true);
        this.scheduleOnce(function () {
            _this.AI_start();
        }, this.AI_interval);
    };
    bigSquidController.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x > this.node.x ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    bigSquidController.prototype.die = function () {
        if (this.isDie)
            return;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E25Die);
        this.node.children[0].active = false;
        this.unscheduleAllCallbacks();
        cc.Tween.stopAllByTarget(this.node);
        this.closeHighLight();
        this.isDie = true;
        this.hideHp();
        this.enemyAnimation.changeState(animationState_1.enemyState.Die1, 1, false);
        this.dieCount();
    };
    bigSquidController.prototype.die_middle = function () {
        this.rigibody.gravityScale = 5;
        this.rigibody.linearVelocity = cc.v2(0, -1000);
        this.enemyAnimation.changeState(animationState_1.enemyState.Die2, 1, false);
    };
    bigSquidController.prototype.die_end = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Die3, 1, false, true);
    };
    bigSquidController.prototype.Destory = function () {
        this.node.destroy();
    };
    bigSquidController.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    bigSquidController.prototype.moveToPlayer = function () {
        this.changeDirection();
        var targetPosition = cc.v3(GameManager_1.default.instance.player.x, GameManager_1.default.instance.player.y + 55);
        var direct = targetPosition.sub(this.node.position).normalizeSelf();
        this.rigibody.linearVelocity = cc.v2(this.moveSpeed * direct.x, this.moveSpeed * direct.y);
    };
    bigSquidController.prototype.preAttack = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E25Attack);
        var targetPosition = cc.v3(GameManager_1.default.instance.player.x, GameManager_1.default.instance.player.y + 55);
        this.changeDirection();
        this.rushDirect = targetPosition.sub(this.node.position).normalizeSelf();
        ;
        this.enemyAnimation.changeState(animationState_1.enemyState.Pre_Attack, 1, false, true);
    };
    bigSquidController.prototype.rush = function () {
        var _this = this;
        this.rushStartPos = this.node.position;
        this.rushDistance = this.getDistance() + 70;
        var angle = caijiTools_1.caijiTools.getAngleDependY(this.rushDirect.x, this.rushDirect.y);
        if (this.skeleton.node.scaleX > 0) {
            this.skeleton.node.angle = -angle - 90;
        }
        else {
            this.skeleton.node.angle = -angle + 90;
        }
        this.enemyAnimation.changeState(animationState_1.enemyState.Attack, 1, false, true);
        this.node.children[0].active = true;
        this.showDamageCollider(damageCollider.attack);
        this.scheduleOnce(function () {
            _this.node.children[0].getComponent(cc.MotionStreak).color = cc.color(255, 255, 255, 255);
        }, 0.05);
    };
    bigSquidController.prototype.rushEnd = function () {
        this.hideDamageCollider();
        this.node.children[0].active = false;
        this.node.children[0].getComponent(cc.MotionStreak).color = cc.color(255, 255, 255, 0);
        this.idle();
    };
    bigSquidController.prototype.hit = function () {
        this.getDamageCollider().getComponent(enemyHitCollider_1.default).hit(this.node, this.damage);
        this.hideDamageCollider();
    };
    bigSquidController.prototype.fire = function (trackEntry, event) {
        if (event.data.name == "Fire") {
            this.createFX();
        }
    };
    bigSquidController.prototype.createFX = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, y, prefab, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        x = this.skeleton.node.scaleX > 0 ? this.node.x - 40 : this.node.x + 40;
                        y = this.node.y - 40;
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/ladyBugFX")];
                    case 1:
                        prefab = _a.sent();
                        effect = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        effect.setSiblingIndex(this.node.getSiblingIndex() + 1);
                        effect.setPosition(x, y);
                        effect.getComponent(ladyBugFx_1.default).isRightMove = this.skeleton.node.scaleX > 0 ? false : true;
                        effect.getComponent(ladyBugFx_1.default).damage = this.damage;
                        effect.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    bigSquidController.prototype.beHit = function (damage, dmgType) {
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
        if (this.hp <= 0) {
            Events_1.default.instance.createEnemyDieEffect(this.node, this.dieEffectName, cc.v2(x, y));
        }
        this.updateHp(damage);
    };
    bigSquidController.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    bigSquidController.prototype.changeState_beHit = function (dmgType) {
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
    bigSquidController.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    bigSquidController.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    bigSquidController.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    bigSquidController.prototype.checkIsSwordRain = function (dmgType) {
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
    bigSquidController.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    bigSquidController.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    bigSquidController.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    bigSquidController.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    bigSquidController.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    bigSquidController.prototype.getDistance = function () {
        return this.node.position.sub(GameManager_1.default.instance.player.position).len();
    };
    bigSquidController.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    bigSquidController.prototype.getDistanceY = function () {
        return Math.abs(this.node.y - GameManager_1.default.instance.player.y);
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], bigSquidController.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], bigSquidController.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], bigSquidController.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], bigSquidController.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], bigSquidController.prototype, "dieEffectName", void 0);
    bigSquidController = __decorate([
        ccclass
    ], bigSquidController);
    return bigSquidController;
}(enemyBase_1.default));
exports.default = bigSquidController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcYmlnU3F1aWRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUE0QztBQUM1Qyw0Q0FBMkM7QUFDM0MscURBQWdEO0FBQ2hELG1EQUEwRDtBQUMxRCxtREFBOEM7QUFDOUMseUNBQW9DO0FBQ3BDLHVEQUFrRDtBQUNsRCxtQ0FBOEI7QUFDOUIsNkNBQXdDO0FBQ3hDLHlDQUFvQztBQUU5QixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUM1QyxJQUFLLGNBRUo7QUFGRCxXQUFLLGNBQWM7SUFDZix1REFBTSxDQUFBO0FBQ1YsQ0FBQyxFQUZJLGNBQWMsS0FBZCxjQUFjLFFBRWxCO0FBRUQ7SUFBZ0Qsc0NBQVM7SUFBekQ7UUFBQSxxRUE4V0M7UUEzV0csd0JBQWtCLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLHdCQUFrQixHQUFXLENBQUMsQ0FBQztRQUUvQixZQUFNLEdBQVksSUFBSSxDQUFDO1FBRXZCLFdBQUssR0FBbUIsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVcsRUFBRSxDQUFDO1FBRTNCLGVBQVMsR0FBUSxJQUFJLENBQUMsQ0FBQSxNQUFNO1FBQzVCLGVBQVMsR0FBVyxHQUFHLENBQUMsQ0FBQSxNQUFNO1FBQzlCLGNBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQSxNQUFNO1FBQzNCLGlCQUFXLEdBQVcsR0FBRyxDQUFDLENBQUEsTUFBTTtRQUNoQyxrQkFBWSxHQUFRLEdBQUcsQ0FBQyxDQUFBLE1BQU07UUFDOUIsb0JBQWMsR0FBUSxHQUFHLENBQUMsQ0FBQSxtQkFBbUI7UUFDN0MsUUFBRSxHQUFXLENBQUMsQ0FBQztRQUNmLGFBQU8sR0FBUSxDQUFDLENBQUMsQ0FBQSxNQUFN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Q0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCx5Q0FBWSxHQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBMVdEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDO2tFQUNwQjtJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQztrRUFDcEI7SUFFL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztzREFDSztJQUV2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO3FEQUNJO0lBRTdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkRBQ087SUFYVixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQThXdEM7SUFBRCx5QkFBQztDQTlXRCxBQThXQyxDQTlXK0MsbUJBQVMsR0E4V3hEO2tCQTlXb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZW5lbXlTdGF0ZSB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5pbXBvcnQgZW5lbXlBbmltYXRpb24gZnJvbSBcIi4vZW5lbXlBbmltYXRpb25cIjtcbmltcG9ydCBlbmVteUJhc2UgZnJvbSBcIi4vZW5lbXlCYXNlXCI7XG5pbXBvcnQgZW5lbXlIaXRDb2xsaWRlciBmcm9tIFwiLi9lbmVteUhpdENvbGxpZGVyXCI7XG5pbXBvcnQgRXZlbnRzIGZyb20gXCIuL0V2ZW50c1wiO1xuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5pbXBvcnQgbGFkeUJ1Z0Z4IGZyb20gXCIuL2xhZHlCdWdGeFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuZW51bSBkYW1hZ2VDb2xsaWRlcntcbiAgICBhdHRhY2tcbn1cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBiaWdTcXVpZENvbnRyb2xsZXIgZXh0ZW5kcyBlbmVteUJhc2Uge1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi5Lyk5a6z5pWI5p6ceOi9tOWBj+enu+WAvFwiIH0pXG4gICAgZGFtYWdlTGFiZWxPZmZzZXRYOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkZsb2F0LCB0b29sdGlwOiBcIuS8pOWus+aViOaenHnovbTlgY/np7vlgLxcIiB9KVxuICAgIGRhbWFnZUxhYmVsT2Zmc2V0WTogbnVtYmVyID0gMDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBocE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Qcm9ncmVzc0JhcilcbiAgICBocEJhcjogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TdHJpbmcpXG4gICAgZGllRWZmZWN0TmFtZTogc3RyaW5nID0gXCJcIjtcblxuICAgIHJ1c2hTcGVlZDpudW1iZXI9MjAwMDsvL+WGsuWHu+mAn+W6plxuICAgIG1vdmVTcGVlZDogbnVtYmVyID0gMzUwOy8v56e75Yqo6YCf5bqmXG4gICAgbm93U3BlZWQ6IG51bWJlciA9IDA7Ly/lvZPliY3pgJ/luqZcbiAgICBBSV9pbnRlcnZhbDogbnVtYmVyID0gMC41Oy8vYWnpl7TpmpRcbiAgICBzdG9wRGlzdGFuY2U6bnVtYmVyPTI1MDsvL+WBnOatoui3neemu1xuICAgIHN0b3BEaXN0YW5jZV95Om51bWJlcj0yMDA7Ly/lgZzmraJ56L2056e75Yqo6Led56a777yIMjAwLTI1MO+8iVxuICAgIGhwOiBudW1iZXIgPSAwO1xuICAgIGhwVGltZXM6bnVtYmVyPTE7Ly/ooYDph4/lgI3mlbBcbiAgICBiZUhpdEZvcmNlX3k6IG51bWJlciA9IDA7Ly/miYvph4zliZHmlLvlh7vkvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3g6IG51bWJlciA9IDAvL+aZrumAmuaUu+WHu+S9nOeUqOWKm1xuICAgIGJlSGl0Rm9yY2VfeV9zaHVyaWtlbjogbnVtYmVyID0gMC8v5pmu6YCa5pS75Ye75L2c55So5YqbXG4gICAgYmVIaXRGb3JjZV94X2F0dGFjazM6IG51bWJlciA9IDA7Ly/ooqvlh7vpo57kvZznlKjliptcbiAgICBiZUhpdEZvcmNlX3lfYXR0YWNrMzogbnVtYmVyID0gMDsvL+iiq+WHu+mjnuS9nOeUqOWKm1xuICAgIHNjYWxlWF9za2VsZXRvbjogbnVtYmVyID0gMDtcbiAgICBpc0RpZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNrZWxldG9uOiBzcC5Ta2VsZXRvbiA9IG51bGw7XG4gICAgZW5lbXlBbmltYXRpb246IGVuZW15QW5pbWF0aW9uID0gbnVsbDtcbiAgICByaWdpYm9keTogY2MuUmlnaWRCb2R5ID0gbnVsbDtcbiAgICBib3hDb2xsaWRlcjogY2MuUGh5c2ljc0JveENvbGxpZGVyID0gbnVsbDtcbiAgICBpc1N3b3JkUmFpbkNkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNTdXBlckFybW9yOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbpnLjkvZNcbiAgICBpc01vdmU6IGJvb2xlYW4gPSBmYWxzZTsvL+aYr+WQpuWkhOS6juenu+WKqOeKtuaAgVxuICAgIGRtZ0NvbGxpZGVyOmRhbWFnZUNvbGxpZGVyPW51bGw7XG4gICAgcnVzaERpcmVjdDpjYy5WZWMzPW51bGw7XG4gICAgcnVzaERpc3RhbmNlOm51bWJlcj0wO1xuICAgIHJ1c2hTdGFydFBvczpjYy5WZWMzPW51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24gPSB0aGlzLm5vZGUuY2hpbGRyZW5bMV0uZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgdGhpcy5zY2FsZVhfc2tlbGV0b24gPSBNYXRoLmFicyh0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbiA9IHRoaXMubm9kZS5jaGlsZHJlblsxXS5nZXRDb21wb25lbnQoZW5lbXlBbmltYXRpb24pO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmVuZW15Q29udHJvbGxlciA9IHRoaXM7XG4gICAgICAgIHRoaXMucmlnaWJvZHkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XG4gICAgICAgIHRoaXMuYm94Q29sbGlkZXIgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcik7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5za2VsZXRvbi5za2VsZXRvbkRhdGEuX3NrZWxldG9uQ2FjaGUuYW5pbWF0aW9ucyk7XG4vKiAgICAgICAgIHRoaXMuc2tlbGV0b24uc2tlbGV0b25EYXRhLl9za2VsZXRvbkNhY2hlLnNsb3RzWzhdLmNvbG9yPWNjLmNvbG9yKDAsMCwwLDApO1xuICAgICAgICB0aGlzLnNrZWxldG9uLnNrZWxldG9uRGF0YS5fc2tlbGV0b25DYWNoZS5zbG90c1s4XS5kYXJrQ29sb3I9Y2MuY29sb3IoMCwwLDAsMCk7ICovXG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5ocCA9IHRoaXMuaHBNYXgqdGhpcy5ocFRpbWVzO1xuICAgICAgICBsZXQgeD1HYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCtjYWlqaVRvb2xzLnJhbmRvbV9pbnQoLWNjLndpblNpemUud2lkdGgvMS4zLGNjLndpblNpemUud2lkdGgvMS4zKTtcbiAgICAgICAgbGV0IHk9Y2Mud2luU2l6ZS5oZWlnaHQvMitjYWlqaVRvb2xzLnJhbmRvbV9pbnQoMzAsMTAwKTtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHgseSk7XG4gICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLmNoZWNrUnVzaEVuZCgpO1xuICAgICAgICBpZiAodGhpcy5pc01vdmUgPT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gdGhpcy5nZXREaXN0YW5jZSgpO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2UpIDwgdGhpcy5zdG9wRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIoMCwwKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5wcmVBdHRhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHRoaXMuZW5lbXlBbmltYXRpb24uc3RhdGU9PWVuZW15U3RhdGUuQXRrKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm1vdmVUb1BsYXllcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQmVnaW5Db250YWN0KGNvbnRhY3Q6IGNjLlBoeXNpY3NDb250YWN0LCBzZWxmQ29sbGlkZXI6IGNjLlBoeXNpY3NDb2xsaWRlciwgb3RoZXJDb2xsaWRlcjogY2MuUGh5c2ljc0NvbGxpZGVyKSB7XG4gICAgICAgIGxldCBvdGhlciA9IG90aGVyQ29sbGlkZXIubm9kZTtcbiAgICAgICAgLy8gbGV0IHdvcmxkTWFuaWZvbGQgPSBjb250YWN0LmdldFdvcmxkTWFuaWZvbGQoKTtcbiAgICAgICAgLy8gbGV0IG5vcm1hbCA9IHdvcmxkTWFuaWZvbGQubm9ybWFsO1xuICAgICAgICBpZiAob3RoZXIuZ3JvdXAgPT0gXCJncm91bmRcIikge1xuICAgICAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZT09ZW5lbXlTdGF0ZS5EaWUyKXtcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2lib2R5LmVuYWJsZWRDb250YWN0TGlzdGVuZXI9ZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWVfZW5kKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnJ1c2hFbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2UgaWYob3RoZXIuZ3JvdXA9PVwid2FsbFwiKXtcbiAgICAgICAgICAgIGNvbnRhY3QuZGlzYWJsZWQ9dHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja1J1c2hFbmQoKXtcbiAgICAgICAgaWYodGhpcy5lbmVteUFuaW1hdGlvbi5zdGF0ZT09ZW5lbXlTdGF0ZS5BdHRhY2spe1xuICAgICAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eT1jYy52Mih0aGlzLnJ1c2hEaXJlY3QueCp0aGlzLnJ1c2hTcGVlZCx0aGlzLnJ1c2hEaXJlY3QueSp0aGlzLnJ1c2hTcGVlZCk7XG4gICAgICAgICAgICBsZXQgbW92ZURpc3RhbmNlPXRoaXMubm9kZS5wb3NpdGlvbi5zdWIodGhpcy5ydXNoU3RhcnRQb3MpLmxlbigpO1xuICAgICAgICAgICAgaWYobW92ZURpc3RhbmNlPj10aGlzLnJ1c2hEaXN0YW5jZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5ydXNoRW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2hvd0RhbWFnZUNvbGxpZGVyKGNvbGxpZGVyOmRhbWFnZUNvbGxpZGVyKXtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW2NvbGxpZGVyXS5nZXRDb21wb25lbnQoZW5lbXlIaXRDb2xsaWRlcikuZW5lbXlDb250cm9sPXRoaXM7XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlbltjb2xsaWRlcl0uYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXI9Y29sbGlkZXI7XG4gICAgfVxuICAgIGdldERhbWFnZUNvbGxpZGVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl07XG4gICAgfVxuICAgIGhpZGVEYW1hZ2VDb2xsaWRlcigpe1xuICAgICAgICBpZih0aGlzLmRtZ0NvbGxpZGVyPT1udWxsKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5jaGlsZHJlblt0aGlzLmRtZ0NvbGxpZGVyXS5hY3RpdmU9ZmFsc2U7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXI9bnVsbDtcbiAgICB9XG4gICAgQUlfc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuc3RvcERpc3RhbmNlPWNhaWppVG9vbHMucmFuZG9tX2ludCgyNTAsNDAwKTtcbiAgICAgICAgaWYoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyQ29udHJvbGxlci5pc0RpZSl7XG4gICAgICAgICAgICAvL+eOqeWutuW3suatuyDlgZzmraLnp7vliqhcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5BSV9zdGFydCgpO1xuICAgICAgICAgICAgfSwxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLmFicyh0aGlzLmdldERpc3RhbmNlKCkpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCB0aGlzLnN0b3BEaXN0YW5jZSsxMDApIHtcbiAgICAgICAgICAgIGxldCB4PXRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVg8MD9cbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54LWNhaWppVG9vbHMucmFuZG9tX2ludCgyMDAsNDAwKTpcbiAgICAgICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54K2NhaWppVG9vbHMucmFuZG9tX2ludCgyMDAsNDAwKTtcbiAgICAgICAgICAgIGxldCB5PUdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci55K2NhaWppVG9vbHMucmFuZG9tX2ludCgxNTAsMzAwKTtcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZT1jYy52Myh4LHkpLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pLmxlbigpO1xuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKVxuICAgICAgICAgICAgLnRvKGRpc3RhbmNlLzMwMCx7cG9zaXRpb246Y2MudjMoeCx5KX0pXG4gICAgICAgICAgICAuY2FsbCgoKT0+e1xuICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguYWJzKHRoaXMuZ2V0RGlzdGFuY2UoKSk7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlID4gMjAwICYmIGRpc3RhbmNlPD00MDApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZUF0dGFjaygpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0b3BEaXN0YW5jZVkoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQUlfc3RvcCgpIHtcbiAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgfVxuICAgIGNoYW5nZVN0b3BEaXN0YW5jZVkoKXtcbiAgICAgICAgdGhpcy5zdG9wRGlzdGFuY2VfeT1jYWlqaVRvb2xzLnJhbmRvbV9pbnQoMjAwLDM1MCk7XG4gICAgfVxuICAgIGNoYW5nZU1vdlN0YXRlKGlzTW92ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzTW92ZSA9IGlzTW92ZTtcbiAgICB9XG4gICAgaWRsZSgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmFuZ2xlPTA7XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldExpbmVhckRhbXBpbmcoMCk7XG4gICAgICAgIHRoaXMuc2V0UmlnaWJvZHlTcGVlZCgwLDApO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuSWRsZSwgMSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuQUlfc3RhcnQoKTtcbiAgICAgICAgfSwgdGhpcy5BSV9pbnRlcnZhbCk7XG4gICAgfVxuICAgIGNoYW5nZURpcmVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA9IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5zY2FsZVhfc2tlbGV0b24gOiB0aGlzLnNjYWxlWF9za2VsZXRvbjtcbiAgICAgICAgLy90aGlzLmhwTm9kZS54ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyAtMjggOiAyODtcbiAgICB9XG4gICAgZGllKCkge1xuICAgICAgICBpZih0aGlzLmlzRGllKSByZXR1cm47XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLkUyNURpZSk7XG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQodGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5jbG9zZUhpZ2hMaWdodCgpO1xuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5oaWRlSHAoKTtcbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkRpZTEsMSxmYWxzZSk7XG4gICAgICAgIHRoaXMuZGllQ291bnQoKTtcbiAgICB9XG4gICAgZGllX21pZGRsZSgpe1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmdyYXZpdHlTY2FsZT01O1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5PWNjLnYyKDAsLTEwMDApO1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuRGllMiwxLGZhbHNlKTtcbiAgICB9XG4gICAgZGllX2VuZCgpe1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuRGllMywxLGZhbHNlLHRydWUpO1xuICAgIH1cbiAgICBEZXN0b3J5KCl7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxuICAgIGdldFVwKCkge1xuICAgICAgICB0aGlzLmVuZW15QW5pbWF0aW9uLmNoYW5nZVN0YXRlKGVuZW15U3RhdGUuZ2V0X3VwLCAxLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIG1vdmVUb1BsYXllcigpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgbGV0IHRhcmdldFBvc2l0aW9uPWNjLnYzKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54LEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci55KzU1KTtcbiAgICAgICAgbGV0IGRpcmVjdD10YXJnZXRQb3NpdGlvbi5zdWIodGhpcy5ub2RlLnBvc2l0aW9uKS5ub3JtYWxpemVTZWxmKCk7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHk9Y2MudjIodGhpcy5tb3ZlU3BlZWQqZGlyZWN0LngsdGhpcy5tb3ZlU3BlZWQqZGlyZWN0LnkpO1xuICAgIH1cbiAgICBwcmVBdHRhY2soKXtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuRTI1QXR0YWNrKTtcbiAgICAgICAgbGV0IHRhcmdldFBvc2l0aW9uPWNjLnYzKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54LEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci55KzU1KTtcbiAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5ydXNoRGlyZWN0PXRhcmdldFBvc2l0aW9uLnN1Yih0aGlzLm5vZGUucG9zaXRpb24pLm5vcm1hbGl6ZVNlbGYoKTs7XG4gICAgICAgIHRoaXMuZW5lbXlBbmltYXRpb24uY2hhbmdlU3RhdGUoZW5lbXlTdGF0ZS5QcmVfQXR0YWNrLCAxLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJ1c2goKXtcbiAgICAgICAgdGhpcy5ydXNoU3RhcnRQb3M9dGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgICB0aGlzLnJ1c2hEaXN0YW5jZT10aGlzLmdldERpc3RhbmNlKCkrNzA7XG4gICAgICAgIGxldCBhbmdsZT1jYWlqaVRvb2xzLmdldEFuZ2xlRGVwZW5kWSh0aGlzLnJ1c2hEaXJlY3QueCx0aGlzLnJ1c2hEaXJlY3QueSk7XG4gICAgICAgIGlmKHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVg+MCl7XG4gICAgICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuYW5nbGU9LWFuZ2xlLTkwO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc2tlbGV0b24ubm9kZS5hbmdsZT0tYW5nbGUrOTA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShlbmVteVN0YXRlLkF0dGFjaywgMSwgZmFsc2UsIHRydWUpO1xuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5bMF0uYWN0aXZlPXRydWU7XG4gICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmF0dGFjayk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpPT57XG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5jb2xvcj1jYy5jb2xvcigyNTUsMjU1LDI1NSwyNTUpO1xuICAgICAgICB9LDAuMDUpO1xuICAgIH1cbiAgICBydXNoRW5kKCl7XG4gICAgICAgIHRoaXMuaGlkZURhbWFnZUNvbGxpZGVyKCk7XG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5hY3RpdmU9ZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlblswXS5nZXRDb21wb25lbnQoY2MuTW90aW9uU3RyZWFrKS5jb2xvcj1jYy5jb2xvcigyNTUsMjU1LDI1NSwwKTtcbiAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgfVxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5nZXREYW1hZ2VDb2xsaWRlcigpLmdldENvbXBvbmVudChlbmVteUhpdENvbGxpZGVyKS5oaXQodGhpcy5ub2RlLHRoaXMuZGFtYWdlKTtcbiAgICAgICAgdGhpcy5oaWRlRGFtYWdlQ29sbGlkZXIoKTtcbiAgICB9XG4gICAgZmlyZSh0cmFja0VudHJ5LGV2ZW50KXtcbiAgICAgICAgaWYoZXZlbnQuZGF0YS5uYW1lPT1cIkZpcmVcIil7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZYKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlRlgoKXtcbiAgICAgICAgbGV0IHg9dGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWD4wP3RoaXMubm9kZS54LTQwOnRoaXMubm9kZS54KzQwO1xuICAgICAgICBsZXQgeT10aGlzLm5vZGUueS00MDtcbiAgICAgICAgbGV0IHByZWZhYj1hd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWJzL2xhZHlCdWdGWFwiKTtcbiAgICAgICAgbGV0IGVmZmVjdD1jYWlqaVRvb2xzLmNyZWF0ZU5vZGUocHJlZmFiLHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICBlZmZlY3Quc2V0U2libGluZ0luZGV4KHRoaXMubm9kZS5nZXRTaWJsaW5nSW5kZXgoKSsxKTtcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKHgseSk7XG4gICAgICAgIGVmZmVjdC5nZXRDb21wb25lbnQobGFkeUJ1Z0Z4KS5pc1JpZ2h0TW92ZT10aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYPjA/ZmFsc2U6dHJ1ZTtcbiAgICAgICAgZWZmZWN0LmdldENvbXBvbmVudChsYWR5QnVnRngpLmRhbWFnZT10aGlzLmRhbWFnZTtcbiAgICAgICAgZWZmZWN0LmFjdGl2ZT10cnVlO1xuICAgIH1cbiAgICBiZUhpdChkYW1hZ2U6IG51bWJlciwgZG1nVHlwZTogYXR0YWNrVHlwZSkge1xuICAgICAgICBpZih0aGlzLmlzRGllKSByZXR1cm47XG4gICAgICAgIHRoaXMuY2hhbmdlTW92U3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFJpZ2lib2R5U3BlZWQoMCk7XG4gICAgICAgIC8vIGxldCBpc0NvbnRpbnVlID0gdGhpcy5jaGVja0lzU3dvcmRSYWluKGRtZ1R5cGUpOy8v6K6+572u5YmR6Zuo5pS75Ye76Ze06ZqUXG4gICAgICAgIC8vIGlmIChpc0NvbnRpbnVlID09IDApIHJldHVybjtcbiAgICAgICAgdGhpcy5oaWdoTGlnaHQoKTtcbiAgICAgICAgdGhpcy5zaG93SHAoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZV9iZUhpdChkbWdUeXBlKTtcbiAgICAgICAgbGV0IHggPSB0aGlzLm5vZGUuc2NhbGVYIDwgMCA/IHRoaXMubm9kZS54ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFggOiB0aGlzLm5vZGUueCAtIHRoaXMuZGFtYWdlTGFiZWxPZmZzZXRYO1xuICAgICAgICBsZXQgeSA9IHRoaXMubm9kZS55ICsgdGhpcy5kYW1hZ2VMYWJlbE9mZnNldFk7XG4gICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zaG93RGFtYWdlTGFiZWxfZW5lbXkodGhpcy5ub2RlLCBkYW1hZ2UsIGNjLnYyKHgsIHkpKTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgRXZlbnRzLmluc3RhbmNlLmNyZWF0ZUVuZW15RGllRWZmZWN0KHRoaXMubm9kZSwgdGhpcy5kaWVFZmZlY3ROYW1lLCBjYy52Mih4LCB5KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVIcChkYW1hZ2UpO1xuICAgIH1cbiAgICBzZXRSaWdpYm9keVNwZWVkKHg6bnVtYmVyLHk6bnVtYmVyPTApe1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5PWNjLnYyKHgseSk7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlX2JlSGl0KGRtZ1R5cGU6IGF0dGFja1R5cGUpIHtcbiAgICAgICAgaWYodGhpcy5pc1N1cGVyQXJtb3IpIHJldHVybjtcbiAgICAgICAgbGV0IHN0YXRlID0gbnVsbDtcbiAgICAgICAgbGV0IGlzS25vY2tEb3duID0gZG1nVHlwZSA9PSBhdHRhY2tUeXBlLmF0dGFjazMgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHN3aXRjaCAoZG1nVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLmF0dGFjazE6XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MjtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLnggPiB0aGlzLm5vZGUueCA/IC10aGlzLmJlSGl0Rm9yY2VfeCA6IHRoaXMuYmVIaXRGb3JjZV94LCAwKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGF0dGFja1R5cGUuYXR0YWNrMjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IGVuZW15U3RhdGUuZ2V0X2h1cnQxO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCA+IHRoaXMubm9kZS54ID8gLXRoaXMuYmVIaXRGb3JjZV94IDogdGhpcy5iZUhpdEZvcmNlX3gsIDApKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5hdHRhY2szOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZygwKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TGluZWFyRGFtcGluZyg1KTtcbiAgICAgICAgICAgICAgICB9LCAwLjQpO1xuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5rbm9ja19kb3duO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGUueCA8IEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ICYmIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllckNvbnRyb2xsZXIuc2tlbGV0b24ubm9kZS5zY2FsZVggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGb3JjZShjYy52MigtdGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlLnggPiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIueCAmJiBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Rm9yY2UoY2MudjIodGhpcy5iZUhpdEZvcmNlX3hfYXR0YWNrMywgdGhpcy5iZUhpdEZvcmNlX3lfYXR0YWNrMykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5qdW1wSGl0OlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCwgMCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBhdHRhY2tUeXBlLnNodXJpa2VuOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gZW5lbXlTdGF0ZS5nZXRfaHVydDE7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZvcmNlKGNjLnYyKEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54ID4gdGhpcy5ub2RlLnggPyAtdGhpcy5iZUhpdEZvcmNlX3ggOiB0aGlzLmJlSGl0Rm9yY2VfeCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iZUhpdEZvcmNlX3lfc2h1cmlrZW4pKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgYXR0YWNrVHlwZS5zd29yZFJhaW46XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBlbmVteVN0YXRlLmdldF9odXJ0MTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmVteUFuaW1hdGlvbi5jaGFuZ2VTdGF0ZShzdGF0ZSwgMSwgZmFsc2UsIGlzS25vY2tEb3duKTtcbiAgICB9XG4gICAgc2V0TGluZWFyRGFtcGluZyhkYW1waW5nOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJEYW1waW5nID0gZGFtcGluZztcbiAgICB9XG4gICAgc2V0RnJpY3Rpb24oZnJpY3Rpb246IG51bWJlciA9IDApIHtcbiAgICAgICAgdGhpcy5ib3hDb2xsaWRlci5mcmljdGlvbiA9IGZyaWN0aW9uO1xuICAgICAgICB0aGlzLmJveENvbGxpZGVyLmFwcGx5KCk7XG4gICAgfVxuICAgIGFwcGx5Rm9yY2UoZm9yY2U6IGNjLlZlYzIpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTdXBlckFybW9yKSByZXR1cm47XG4gICAgICAgIHRoaXMucmlnaWJvZHkuYXBwbHlGb3JjZVRvQ2VudGVyKGZvcmNlLCB0cnVlKTtcbiAgICB9XG4gICAgY2hlY2tJc1N3b3JkUmFpbihkbWdUeXBlOiBhdHRhY2tUeXBlKSB7XG4gICAgICAgIGlmIChkbWdUeXBlID09IGF0dGFja1R5cGUuc3dvcmRSYWluKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1N3b3JkUmFpbkNkKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHRoaXMuaXNTd29yZFJhaW5DZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1N3b3JkUmFpbkNkID0gZmFsc2U7XG4gICAgICAgICAgICB9LCB0aGlzLnN3b3JkUmFpbkhpdENkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgdXBkYXRlSHAoZGFtYWdlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5ocCAtPSBkYW1hZ2U7XG4gICAgICAgIHRoaXMuaHBCYXIucHJvZ3Jlc3MgPSB0aGlzLmhwIC8gdGhpcy5ocE1heDtcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5ocCA9IDA7XG4gICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dIcCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuaGlkZUhwKTtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UodGhpcy5oaWRlSHAsMik7XG4gICAgfVxuICAgIGhpZGVIcCgpIHtcbiAgICAgICAgdGhpcy5ocE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIGhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY2xvc2VIaWdoTGlnaHQpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMSk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJoaWdoTGlnaHRDb2xvclwiLCBbMS4wLDEuMCwxLjAsMC41XSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuY2xvc2VIaWdoTGlnaHQsIDAuMTUpO1xuICAgIH1cbiAgICBjbG9zZUhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5nZXRNYXRlcmlhbCgwKS5zZXRQcm9wZXJ0eShcImJlSGl0XCIsIDApO1xuICAgIH1cbiAgICBnZXREaXN0YW5jZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnBvc2l0aW9uLnN1YihHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIucG9zaXRpb24pLmxlbigpO1xuICAgIH1cbiAgICBnZXREaXN0YW5jZVgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUueCAtIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci54O1xuICAgIH1cbiAgICBnZXREaXN0YW5jZVkoKXtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHRoaXMubm9kZS55LUdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllci55KTtcbiAgICB9XG59XG4iXX0=