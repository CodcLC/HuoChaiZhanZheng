"use strict";
cc._RF.push(module, 'e055666c3FBwKvInY3xe1FC', 'ladyBug');
// scripts/game/ladyBug.ts

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
var Events_1 = require("./Events");
var GameManager_1 = require("./GameManager");
var ladyBugFx_1 = require("./ladyBugFx");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack"] = 0] = "attack";
})(damageCollider || (damageCollider = {}));
var ladyBug = /** @class */ (function (_super) {
    __extends(ladyBug, _super);
    function ladyBug() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.damageLabelOffsetX = 0;
        _this.damageLabelOffsetY = 0;
        _this.hpNode = null;
        _this.hpBar = null;
        _this.dieEffectName = "";
        _this.moveSpeed = 300; //移动速度
        _this.nowSpeed = 0; //当前速度
        _this.AI_interval = 1; //ai间隔
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
        return _this;
    }
    ladyBug.prototype.onLoad = function () {
        this.skeleton = this.node.children[0].getComponent(sp.Skeleton);
        this.scaleX_skeleton = Math.abs(this.skeleton.node.scaleX);
        this.enemyAnimation = this.node.children[0].getComponent(enemyAnimation_1.default);
        this.enemyAnimation.enemyController = this;
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.boxCollider = this.node.getComponent(cc.PhysicsBoxCollider);
    };
    ladyBug.prototype.start = function () {
        this.init();
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
    };
    ladyBug.prototype.init = function () {
        this.initData();
        this.hp = this.hpMax * this.hpTimes;
        var x = GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(-cc.winSize.width / 2, cc.winSize.width / 2);
        var y = cc.winSize.height / 2 + caijiTools_1.caijiTools.random_int(30, 100);
        this.node.setPosition(x, y);
        this.AI_start();
    };
    ladyBug.prototype.update = function () {
        var _this = this;
        if (this.isMove == false)
            return;
        var distance = this.getDistance();
        if (Math.abs(distance) < this.stopDistance) {
            this.rigibody.linearVelocity = cc.v2(0, 0);
            this.changeMovState(false);
            if (Math.abs(this.getDistanceX()) < 50) {
                var moveDistance = this.skeleton.node.scaleX > 0 ? -100 : 100;
                cc.tween(this.node)
                    .by(0.5, { x: moveDistance })
                    .call(function () {
                    _this.hit();
                })
                    .start();
            }
            else {
                this.hit();
            }
        }
        else {
            if (this.enemyAnimation.state == animationState_1.enemyState.Atk)
                return;
            this.moveToPlayer();
        }
    };
    ladyBug.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var other = otherCollider.node;
        // let worldManifold = contact.getWorldManifold();
        // let normal = worldManifold.normal;
        if (other.group == "ground") {
            this.rigibody.enabledContactListener = false;
            this.die_end();
        }
        else if (other.group == "wall") {
            contact.disabled = true;
        }
    };
    ladyBug.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    ladyBug.prototype.getDamageCollider = function () {
        return this.skeleton.node.children[this.dmgCollider];
    };
    ladyBug.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    ladyBug.prototype.AI_start = function () {
        var _this = this;
        if (GameManager_1.default.instance.playerController.isDie) {
            //玩家已死 停止移动
            this.scheduleOnce(function () {
                _this.AI_start();
            }, 1);
            return;
        }
        var distance = Math.abs(this.getDistance());
        if (distance < this.stopDistance + 50) {
            if (Math.abs(this.getDistanceX()) < 50) {
                var moveDistance = this.skeleton.node.scaleX > 0 ? -150 : 150;
                cc.tween(this.node)
                    .by(0.5, { x: moveDistance })
                    .call(function () {
                    _this.hit();
                })
                    .start();
            }
            else {
                var x = this.skeleton.node.scaleX < 0 ?
                    GameManager_1.default.instance.player.x - caijiTools_1.caijiTools.random_int(150, 400) :
                    GameManager_1.default.instance.player.x + caijiTools_1.caijiTools.random_int(100, 300);
                var y = GameManager_1.default.instance.player.y + caijiTools_1.caijiTools.random_int(150, 400);
                var distance_1 = cc.v3(x, y).sub(this.node.position).len();
                cc.tween(this.node)
                    .to(distance_1 / 300, { position: cc.v3(x, y) })
                    .call(function () {
                    _this.hit();
                })
                    .start();
            }
        }
        else {
            this.changeStopDistanceY();
            this.changeMovState(true);
            this.changeDirection();
        }
    };
    ladyBug.prototype.AI_stop = function () {
        this.idle();
    };
    ladyBug.prototype.changeStopDistanceY = function () {
        this.stopDistance_y = caijiTools_1.caijiTools.random_int(200, 250);
    };
    ladyBug.prototype.changeMovState = function (isMove) {
        this.isMove = isMove;
    };
    ladyBug.prototype.idle = function () {
        var _this = this;
        this.changeMovState(false);
        this.changeDirection();
        this.setLinearDamping(0);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.Idle, 1, true, true);
        this.scheduleOnce(function () {
            _this.AI_start();
        }, this.AI_interval);
    };
    ladyBug.prototype.changeDirection = function () {
        this.skeleton.node.scaleX = GameManager_1.default.instance.player.x > this.node.x ? -this.scaleX_skeleton : this.scaleX_skeleton;
        //this.hpNode.x = this.skeleton.node.scaleX > 0 ? -28 : 28;
    };
    ladyBug.prototype.die = function () {
        if (this.isDie)
            return;
        this.unscheduleAllCallbacks();
        cc.Tween.stopAllByTarget(this.node);
        this.closeHighLight();
        this.isDie = true;
        this.hideHp();
        this.enemyAnimation.changeState(animationState_1.enemyState["Die-start"], 1, false);
        this.dieCount();
    };
    ladyBug.prototype.die_middle = function () {
        this.rigibody.gravityScale = 5;
        this.rigibody.linearVelocity = cc.v2(0, -1300);
        //this.enemyAnimation.changeState(enemyState["Die-middle"],1,false);
    };
    ladyBug.prototype.die_end = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.Die_end, 1, false);
    };
    ladyBug.prototype.Destory = function () {
        this.node.destroy();
    };
    ladyBug.prototype.getUp = function () {
        this.enemyAnimation.changeState(animationState_1.enemyState.get_up, 1, false, true);
    };
    ladyBug.prototype.moveToPlayer = function () {
        this.changeDirection();
        var direct = GameManager_1.default.instance.player.position.sub(this.node.position).normalizeSelf();
        direct.y = this.getDistanceY() <= this.stopDistance_y ? 0 : direct.y;
        this.rigibody.linearVelocity = cc.v2(this.moveSpeed * direct.x, this.moveSpeed * direct.y);
    };
    ladyBug.prototype.hit = function () {
        if (animationState_1.enemyState[this.enemyAnimation.state].includes("get_hurt"))
            return;
        this.changeDirection();
        this.changeMovState(false);
        this.setRigibodySpeed(0, 0);
        this.enemyAnimation.changeState(animationState_1.enemyState.Atk, 1, false);
    };
    ladyBug.prototype.fire = function (trackEntry, event) {
        if (event.data.name == "Fire") {
            this.createFX();
        }
    };
    ladyBug.prototype.createFX = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, y, prefab, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        audioManager_1.default.playAudio(audioNameMgr_1.audioName.E24_Shoot);
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
    ladyBug.prototype.beHit = function (damage, dmgType) {
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
    ladyBug.prototype.setRigibodySpeed = function (x, y) {
        if (y === void 0) { y = 0; }
        this.rigibody.linearVelocity = cc.v2(x, y);
    };
    ladyBug.prototype.changeState_beHit = function (dmgType) {
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
    ladyBug.prototype.setLinearDamping = function (damping) {
        this.rigibody.linearDamping = damping;
    };
    ladyBug.prototype.setFriction = function (friction) {
        if (friction === void 0) { friction = 0; }
        this.boxCollider.friction = friction;
        this.boxCollider.apply();
    };
    ladyBug.prototype.applyForce = function (force) {
        if (this.isSuperArmor)
            return;
        this.rigibody.applyForceToCenter(force, true);
    };
    ladyBug.prototype.checkIsSwordRain = function (dmgType) {
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
    ladyBug.prototype.updateHp = function (damage) {
        this.hp -= damage;
        this.hpBar.progress = this.hp / this.hpMax;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    };
    ladyBug.prototype.showHp = function () {
        this.unschedule(this.hideHp);
        this.hpNode.active = true;
        this.scheduleOnce(this.hideHp, 2);
    };
    ladyBug.prototype.hideHp = function () {
        this.hpNode.active = false;
    };
    ladyBug.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [1.0, 1.0, 1.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.15);
    };
    ladyBug.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    ladyBug.prototype.getDistance = function () {
        return this.node.position.sub(GameManager_1.default.instance.player.position).len();
    };
    ladyBug.prototype.getDistanceX = function () {
        return this.node.x - GameManager_1.default.instance.player.x;
    };
    ladyBug.prototype.getDistanceY = function () {
        return Math.abs(this.node.y - GameManager_1.default.instance.player.y);
    };
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果x轴偏移值" })
    ], ladyBug.prototype, "damageLabelOffsetX", void 0);
    __decorate([
        property({ type: cc.Float, tooltip: "伤害效果y轴偏移值" })
    ], ladyBug.prototype, "damageLabelOffsetY", void 0);
    __decorate([
        property(cc.Node)
    ], ladyBug.prototype, "hpNode", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], ladyBug.prototype, "hpBar", void 0);
    __decorate([
        property(cc.String)
    ], ladyBug.prototype, "dieEffectName", void 0);
    ladyBug = __decorate([
        ccclass
    ], ladyBug);
    return ladyBug;
}(enemyBase_1.default));
exports.default = ladyBug;

cc._RF.pop();