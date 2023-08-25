
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/playerController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9b86dezfV1Hpq8QB97rPm4O', 'playerController');
// scripts/game/playerController.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var data_1 = require("../sdk/data");
var animationState_1 = require("./animationState");
var Events_1 = require("./Events");
var GameManager_1 = require("./GameManager");
var playerCollider_1 = require("./playerCollider");
var playerColliderAttack1_1 = require("./playerColliderAttack1");
var playerColliderAttack2_1 = require("./playerColliderAttack2");
var playerPandant_1 = require("./playerPandant");
var swordRain_1 = require("./swordRain");
var Joystick_1 = require("./ui/Joystick");
var playerControlEvent_1 = require("./ui/playerControlEvent");
var playerHp_1 = require("./ui/playerHp");
var uiManager_1 = require("./ui/uiManager");
var damageCollider;
(function (damageCollider) {
    damageCollider[damageCollider["attack1"] = 0] = "attack1";
    damageCollider[damageCollider["attack2"] = 1] = "attack2";
    damageCollider[damageCollider["attack3"] = 2] = "attack3";
    damageCollider[damageCollider["jumpHit"] = 3] = "jumpHit";
})(damageCollider || (damageCollider = {}));
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerController = /** @class */ (function (_super) {
    __extends(playerController, _super);
    function playerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skeleton = null;
        _this.damageScaleZoom = 1; //伤害缩放系数
        _this.damage2ScaleTimes = 1.3; //普攻2伤害倍数
        _this.damage3ScaleTimes = 2.5; //普攻3伤害倍数
        _this.damageShurikenScaleTimes = 5; //手里剑伤害倍数
        _this.damageSwordRainScaleTimes = 1; //剑雨伤害倍数
        _this.playerCollider = null;
        _this.moveSpeedBase = 460;
        _this.speed = 460;
        _this.offesetX_aatack3 = 250; //攻击三位移量
        _this.rigibody = null;
        _this.moveVector = cc.v2(0, 0);
        _this.scaleX = 0;
        _this.state = animationState_1.playerAnimationState.idle;
        _this.comboAttack = 0;
        _this.jumpTimes = 0;
        _this.jumpForce_y = 340000; //跳跃y轴力
        _this.jumpForce_x = 30000; //移动跳跃时x轴力
        _this.roll1Force = 400000; //普通翻滚力
        _this.roll2Force = 260000; //跳跃上升中翻滚力
        _this.rollDirection = 0;
        _this.lastAttackTime = 0;
        _this.attack1Finish = true;
        _this.dmgCollider = null;
        _this.isDie = false;
        _this.isWuDi = true;
        _this.finalEnemy = null;
        _this.jumpSoundId = -1;
        _this.thunder_chase_cd = false;
        _this.ground = null;
        //可x轴移动状态
        _this.moveState = [
            animationState_1.playerAnimationState.move,
            animationState_1.playerAnimationState.idle_to_move,
            animationState_1.playerAnimationState.double_jump,
            animationState_1.playerAnimationState.jump_to_move,
            animationState_1.playerAnimationState.jump_start,
            animationState_1.playerAnimationState.jump_down,
            animationState_1.playerAnimationState.jump_attack1,
            animationState_1.playerAnimationState.jump_attack2,
            animationState_1.playerAnimationState.jump_attack3,
            animationState_1.playerAnimationState.roll_to_move
        ];
        //不可改方向状态
        _this.disallowChangeScalex = [
            animationState_1.playerAnimationState.attack1,
            animationState_1.playerAnimationState.attack2,
            animationState_1.playerAnimationState.pose_shadow,
            animationState_1.playerAnimationState.attack3,
            animationState_1.playerAnimationState.get_up,
            animationState_1.playerAnimationState.skill203_air,
            animationState_1.playerAnimationState.skill203_ground,
            animationState_1.playerAnimationState.skill207_air,
            animationState_1.playerAnimationState.skill207_ground,
            animationState_1.playerAnimationState.revive,
            animationState_1.playerAnimationState.die,
            animationState_1.playerAnimationState.knock_up1,
            animationState_1.playerAnimationState.knock_up2,
            animationState_1.playerAnimationState.knock_up3,
            animationState_1.playerAnimationState.bow_attack_fast
        ];
        //不可翻滚状态
        _this.disallowRoll = [
            animationState_1.playerAnimationState.skill203_air,
            animationState_1.playerAnimationState.skill203_ground,
            animationState_1.playerAnimationState.skill207_air,
            animationState_1.playerAnimationState.skill207_ground,
            animationState_1.playerAnimationState.revive,
            animationState_1.playerAnimationState.die,
            animationState_1.playerAnimationState.knock_up1,
            animationState_1.playerAnimationState.knock_up2,
            animationState_1.playerAnimationState.knock_up3,
            animationState_1.playerAnimationState.ultimate
        ];
        //无敌状态
        _this.wudi = [
            animationState_1.playerAnimationState.roll,
            animationState_1.playerAnimationState.roll_air,
            animationState_1.playerAnimationState.skill203_air,
            animationState_1.playerAnimationState.skill203_ground,
            animationState_1.playerAnimationState.skill207_air,
            animationState_1.playerAnimationState.revive,
            animationState_1.playerAnimationState.die,
            animationState_1.playerAnimationState.skill207_ground,
        ];
        _this.jumpSoundState = [
            animationState_1.playerAnimationState.jump_attack1,
            animationState_1.playerAnimationState.jump_attack2,
            animationState_1.playerAnimationState.jump_attack3
        ];
        return _this;
    }
    playerController.prototype.onLoad = function () {
        this.scaleX = Math.abs(this.skeleton.node.scaleX);
        this.rigibody = this.node.getComponent(cc.RigidBody);
        this.playerCollider = this.node.getComponent(playerCollider_1.default);
        this.speed = Number(data_1.data.getCache("Base", "playerMoveSpeed"));
        this.ground = this.node.parent.getChildByName("ground");
    };
    playerController.prototype.start = function () {
        //@ts-ignore
        //console.log(this.skeleton.skeletonData._skeletonCache.animations);
        this.setAnimationCompleteEvent();
        this.setFrameEventTime(); //改变帧事件响应时间
    };
    //登场动画完
    playerController.prototype.appearEnd = function () {
        this.isWuDi = false;
        uiManager_1.default.ins.showUi();
        Joystick_1.default.instance.init();
        playerControlEvent_1.default.instance.init();
        GameManager_1.default.instance.enemySpawnM.startSpwan();
        this.idle();
        this.createPandant();
        ///////////
        setTimeout(function () {
            uiManager_1.default.ins.showDoubleDamagePopup();
        }, 3000);
    };
    playerController.prototype.createPandant = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pre, pandant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/pendant")];
                    case 1:
                        pre = _a.sent();
                        pandant = cc.instantiate(pre);
                        pandant.setParent(this.node.parent);
                        pandant.setSiblingIndex(this.node.getSiblingIndex() + 1);
                        pandant.getComponent(playerPandant_1.default).player = this.node;
                        pandant.getComponent(playerPandant_1.default).init();
                        return [2 /*return*/];
                }
            });
        });
    };
    playerController.prototype.update = function () {
        //console.log(this.getAnimationName(this.state),this.skeleton.animation);
        this.playerMove();
    };
    playerController.prototype.playerMove = function () {
        if (this.state == animationState_1.playerAnimationState.die)
            return;
        if (this.moveVector.x == 0 && this.state == animationState_1.playerAnimationState.move) {
            this.idle();
            return;
        }
        if (this.moveState.includes(this.state) && this.moveVector.x != 0) {
            this.changeDirection();
            var speed = this.skeleton.node.scaleX > 0 ? this.speed : -this.speed;
            this.rigibody.linearVelocity = cc.v2(speed, this.rigibody.linearVelocity.y);
        }
        if (this.skeleton.animation == animationState_1.playerAnimationState[animationState_1.playerAnimationState.idle]
            && this.moveVector.x != 0
            && this.attack1Finish) {
            this.changeState(animationState_1.playerAnimationState.idle_to_move);
        }
    };
    //摇杆监听事件
    playerController.prototype.move = function (vector) {
        this.moveVector = vector;
        if (this.moveVector.x != 0) {
            if (this.disallowChangeScalex.includes(this.state))
                return;
            this.skeleton.node.scaleX = vector.x > 0 ? this.scaleX : -this.scaleX;
            if (this.skeleton.node.scaleX == this.rollDirection)
                return;
            switch (this.state) {
                case animationState_1.playerAnimationState.roll:
                    if (this.playerCollider.isFlying) {
                        this.changeState(animationState_1.playerAnimationState.jump_down);
                    }
                    else {
                        this.changeState(animationState_1.playerAnimationState.move);
                    }
                    break;
                case animationState_1.playerAnimationState.roll_air:
                    if (this.playerCollider.isFlying) {
                        this.changeState(animationState_1.playerAnimationState.jump_down);
                    }
                    else {
                        this.changeState(animationState_1.playerAnimationState.move);
                    }
                    break;
                case animationState_1.playerAnimationState.roll_to_idle:
                    this.changeState(animationState_1.playerAnimationState.move);
                    break;
                case animationState_1.playerAnimationState.roll_to_move:
                    this.changeState(animationState_1.playerAnimationState.move);
                    break;
            }
        }
    };
    playerController.prototype.changeDirection = function () {
        if (this.moveVector.x != 0) {
            this.skeleton.node.scaleX = this.moveVector.x > 0 ? this.scaleX : -this.scaleX;
        }
    };
    playerController.prototype.showDamageCollider = function (collider) {
        this.skeleton.node.children[collider].active = true;
        this.dmgCollider = collider;
    };
    playerController.prototype.hideDamageCollider = function () {
        if (this.dmgCollider == null)
            return;
        this.skeleton.node.children[this.dmgCollider].active = false;
        this.dmgCollider = null;
    };
    playerController.prototype.beHit = function (enemy, dmg, isKnockDown) {
        if (isKnockDown === void 0) { isKnockDown = false; }
        /*         if (this.state == playerAnimationState.idle) {
                    let force = 40000;
                    force = this.node.x > enemy.x ? force : -force;
                    this.rigibody.applyForceToCenter(cc.v2(force, 0), true);
                } */
        if (this.isDie)
            return;
        var scalex = enemy.x > this.node.x ? -1 : 1;
        var offsetX = caijiTools_1.caijiTools.random_int(-40, 40);
        if (this.wudi.includes(this.state) || this.isWuDi) {
            if (this.isWuDi) {
                Events_1.default.instance.showDamageLabel_player(this.node, 0, offsetX);
                Events_1.default.instance.showEnemyHitEffect(this.node.parent, cc.v2(this.node.x + caijiTools_1.caijiTools.random_int(-15, 15), this.node.y + 60), scalex);
            }
            return;
        }
        this.finalEnemy = enemy;
        this.highLight();
        playerHp_1.default.instance.updateHp(dmg);
        Events_1.default.instance.showDamageLabel_player(this.node, dmg, offsetX);
        Events_1.default.instance.showEnemyHitEffect(this.node.parent, cc.v2(this.node.x + caijiTools_1.caijiTools.random_int(-15, 15), this.node.y + 60), scalex);
        if (isKnockDown && this.isDie == false) {
            playerControlEvent_1.default.instance.removeEvent();
            this.changeState(animationState_1.playerAnimationState.knock_up1);
        }
    };
    playerController.prototype.highLight = function () {
        this.unschedule(this.closeHighLight);
        this.skeleton.getMaterial(0).setProperty("beHit", 1);
        this.skeleton.getMaterial(0).setProperty("highLightColor", [0.8, 0.0, 0.0, 0.5]);
        this.scheduleOnce(this.closeHighLight, 0.2);
    };
    playerController.prototype.closeHighLight = function () {
        this.skeleton.getMaterial(0).setProperty("beHit", 0);
    };
    playerController.prototype.die = function () {
        playerControlEvent_1.default.instance.removeEvent();
        uiManager_1.default.ins.lose();
        this.changeState(animationState_1.playerAnimationState.die);
        this.closeBoxCollider();
        this.skeleton.node.scaleX = this.finalEnemy.x > this.node.x ? this.scaleX : -this.scaleX;
    };
    playerController.prototype.revive = function () {
        this.changeState(animationState_1.playerAnimationState.revive);
        Events_1.default.instance.showReviveFx(this.node);
    };
    playerController.prototype.closeBoxCollider = function () {
        this.isDie = true;
        this.node.getComponent(cc.BoxCollider).enabled = false;
    };
    playerController.prototype.openBoxCollider = function () {
        this.isDie = false;
        this.node.getComponent(cc.BoxCollider).enabled = true;
        playerHp_1.default.instance.addHp(playerHp_1.default.instance.hp_max, true);
        this.changeState(animationState_1.playerAnimationState.idle);
        this.openWuDi(5);
        playerControlEvent_1.default.instance.bindingEvent();
    };
    playerController.prototype.openWuDi = function (wudiTime) {
        var _this = this;
        this.isWuDi = true;
        var shieldNode = this.node.getChildByName("shield");
        shieldNode.active = true;
        for (var _i = 0, _a = shieldNode.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.getComponent(cc.ParticleSystem3D)) {
                child.getComponent(cc.ParticleSystem3D).loop = true;
            }
        }
        this.scheduleOnce(function () {
            _this.closeWuDi();
        }, wudiTime - 2);
    };
    playerController.prototype.closeWuDi = function () {
        var _this = this;
        var shieldNode = this.node.getChildByName("shield");
        for (var _i = 0, _a = shieldNode.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.getComponent(cc.ParticleSystem3D)) {
                child.getComponent(cc.ParticleSystem3D).loop = false;
            }
        }
        this.scheduleOnce(function () {
            _this.isWuDi = false;
            shieldNode.active = false;
        }, 2);
    };
    playerController.prototype.idle = function () {
        this.jumpTimes = 0;
        this.changeState(animationState_1.playerAnimationState.idle);
    };
    playerController.prototype.attack = function () {
        if (this.playerCollider.isFlying == false) {
            this.addCombo();
        }
        switch (this.state) {
            case animationState_1.playerAnimationState.move:
                this.changeState(animationState_1.playerAnimationState.attack1);
                break;
            case animationState_1.playerAnimationState.idle:
                this.changeState(animationState_1.playerAnimationState.attack1);
                break;
            case animationState_1.playerAnimationState.idle_to_move:
                this.changeState(animationState_1.playerAnimationState.attack1);
                break;
            default:
                if (this.playerCollider.isFlying) {
                    //空中时
                    if (this.getAnimationName(this.state).includes("jump_attack")
                        || this.getAnimationName(this.state).includes("skill"))
                        return;
                    this.jumpAttack();
                }
        }
    };
    playerController.prototype.addCombo = function () {
        this.lastAttackTime = this.lastAttackTime == 0 ? cc.director.getTotalTime() / 1000 : this.lastAttackTime;
        if ((cc.director.getTotalTime() / 1000 - this.lastAttackTime) < 0.3 / playerHp_1.default.instance.speedTimes || this.comboAttack == 0) {
            this.comboAttack++;
        }
        this.comboAttack = this.comboAttack > 3 ? 3 : this.comboAttack;
        this.lastAttackTime = cc.director.getTotalTime() / 1000;
        //console.log(cc.director.getTotalTime()/1000-this.lastAttackTime,this.comboAttack);
    };
    playerController.prototype.resetCombo = function () {
        this.comboAttack = 0;
    };
    playerController.prototype.roll = function () {
        if (this.disallowRoll.includes(this.state))
            return;
        this.rollDirection = this.skeleton.node.scaleX;
        if (this.playerCollider.isFlying == false) {
            this.roll_1();
        }
        else {
            if (this.rigibody.linearVelocity.y > 0) {
                this.roll_2();
            }
            else {
                this.roll_1();
            }
        }
    };
    //地面和降落中翻滚
    playerController.prototype.roll_1 = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.rolldash);
        this.rigibody.linearDamping = 3;
        var forceX = this.skeleton.node.scaleX > 0 ? this.roll1Force : -this.roll1Force;
        this.rigibody.linearVelocity = cc.v2(0, this.rigibody.linearVelocity.y);
        this.rigibody.applyForce(cc.v2(forceX, 0), this.rigibody.getWorldCenter(), true);
        if (this.jumpTimes == 2) {
            this.rigibody.applyForce(cc.v2(0, -100000), this.rigibody.getWorldCenter(), true);
        }
        this.changeState(animationState_1.playerAnimationState.roll);
    };
    //起跳中翻滚
    playerController.prototype.roll_2 = function () {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.rolldash);
        this.rigibody.linearDamping = -0.5;
        var forceX = this.skeleton.node.scaleX > 0 ? this.roll2Force : -this.roll2Force;
        this.rigibody.linearVelocity = cc.v2(0, this.rigibody.linearVelocity.y);
        this.rigibody.applyForce(cc.v2(forceX, 10000), this.rigibody.getWorldCenter(), true);
        this.changeState(animationState_1.playerAnimationState.roll_air);
    };
    playerController.prototype.jump = function () {
        if (this.jumpTimes >= 2)
            return;
        var forceX = this.skeleton.node.scaleX > 0 ? this.jumpForce_x : -this.jumpForce_x;
        forceX = this.moveVector.x == 0 ? 0 : forceX;
        this.rigibody.linearDamping = 1;
        switch (this.state) {
            case animationState_1.playerAnimationState.idle:
                this.jump_1(forceX);
                break;
            case animationState_1.playerAnimationState.idle_to_move:
                this.jump_1(forceX);
                break;
            case animationState_1.playerAnimationState.move:
                this.jump_1(forceX);
                break;
            case animationState_1.playerAnimationState.jump_start:
                this.jump_2(forceX);
                break;
            case animationState_1.playerAnimationState.jump_down:
                this.jump_2(forceX);
                break;
            case animationState_1.playerAnimationState.jump_end:
                this.jump_1(forceX);
                break;
            case animationState_1.playerAnimationState.jump_to_move:
                this.jump_1(forceX);
                break;
            default:
                var num = this.jumpTimes + 1;
                if (this.getAnimationName(this.state).includes("roll")) {
                    //翻滚->跳跃
                    this["jump_" + num](forceX);
                    return;
                }
                else if (this.getAnimationName(this.state).includes("jump_attack")) {
                    //空中攻击->跳跃
                    this["jump_" + num](forceX);
                    return;
                }
                else if (this.getAnimationName(this.state).includes("attack")) {
                    //地面攻击->跳跃
                    this.jump_1(forceX);
                    return;
                }
        }
    };
    //第一段跳跃
    playerController.prototype.jump_1 = function (forceX) {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.jump, false, 0.6);
        this.jumpTimes++;
        this.rigibody.applyForce(cc.v2(forceX, this.jumpForce_y), this.rigibody.getWorldCenter(), true);
        this.changeState(animationState_1.playerAnimationState.jump_start);
    };
    //第二段跳跃
    playerController.prototype.jump_2 = function (forceX) {
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.jump, false, 0.6);
        this.jumpTimes++;
        this.rigibody.linearVelocity = cc.v2(this.rigibody.linearVelocity.x, 0);
        this.rigibody.applyForce(cc.v2(forceX, this.jumpForce_y), this.rigibody.getWorldCenter(), true);
        this.changeState(animationState_1.playerAnimationState.double_jump);
    };
    playerController.prototype.jumpAttack = function () {
        return __awaiter(this, void 0, void 0, function () {
            var forceY, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        forceY = this.rigibody.linearVelocity.y <= 0 ? this.jumpForce_y * 0.7 : this.jumpForce_y;
                        this.rigibody.linearVelocity = cc.v2(this.rigibody.linearVelocity.x, 0);
                        this.rigibody.applyForce(cc.v2(0, forceY), this.rigibody.getWorldCenter(), true);
                        this.rigibody.linearDamping = forceY == 0 ? 12 : 0;
                        this.changeState(animationState_1.playerAnimationState.jump_attack1);
                        _a = this;
                        return [4 /*yield*/, audioManager_1.default.playAudio(audioNameMgr_1.audioName.SpinAttack, false)];
                    case 1:
                        _a.jumpSoundId = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    playerController.prototype.dropToGround = function () {
        this.jumpTimes = 0;
        this.rigibody.linearDamping = 0; //1;
        this.resetCombo();
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.Jumpland);
        if (this.state == animationState_1.playerAnimationState.idle || this.state == animationState_1.playerAnimationState.die)
            return;
        if (this.getAnimationName(this.state).includes("roll")) {
            if (this.state == animationState_1.playerAnimationState.roll_air) {
                this.rigibody.linearVelocity = cc.v2(0, 0);
                if (this.moveVector.x == 0) {
                    this.changeState(animationState_1.playerAnimationState.jump_end);
                }
                else {
                    this.changeState(animationState_1.playerAnimationState.jump_to_move);
                }
            }
            return;
        }
        if (this.getAnimationName(this.state).includes("jump_attack")) {
            //攻击落地
            this.changeState(animationState_1.playerAnimationState.jump_attack3);
        }
        else {
            //跳跃落地
            if (this.moveVector.x != 0) {
                //跳->跑
                this.changeState(animationState_1.playerAnimationState.jump_to_move);
            }
            else {
                //跳->站立
                this.rigibody.linearVelocity = cc.v2(0, 0);
                this.changeState(animationState_1.playerAnimationState.jump_end);
            }
        }
    };
    playerController.prototype.skill1 = function () {
        if (this.skeleton.animation.includes("skill") == false) {
            this.resetCombo();
            this.rigibody.linearVelocity = cc.v2(0, 0);
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.Skillcast207Shuriken);
            if (this.playerCollider.isFlying) {
                //空中释放 
                this.closeGravity();
                this.changeState(animationState_1.playerAnimationState.skill207_air);
            }
            else {
                this.changeState(animationState_1.playerAnimationState.skill207_ground);
            }
        }
    };
    playerController.prototype.createShuriken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, shuriken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/shuriken")];
                    case 1:
                        prefab = _a.sent();
                        shuriken = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        shuriken.setPosition(this.node.x, this.node.y + 70);
                        shuriken.setSiblingIndex(shuriken.getSiblingIndex() - 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    playerController.prototype.skill2 = function () {
        if (this.skeleton.animation.includes("skill") == false) {
            this.resetCombo();
            this.rigibody.linearVelocity = cc.v2(0, 0);
            if (this.playerCollider.isFlying) {
                //空中释放
                this.closeGravity();
                this.changeState(animationState_1.playerAnimationState.skill203_air);
            }
            else {
                this.changeState(animationState_1.playerAnimationState.skill203_ground);
            }
        }
    };
    playerController.prototype.createSwordRain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, swordRainNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/swordRain")];
                    case 1:
                        prefab = _a.sent();
                        swordRainNode = caijiTools_1.caijiTools.createNode(prefab, this.node.parent);
                        swordRainNode.setSiblingIndex(this.ground.getSiblingIndex());
                        swordRainNode.setPosition(this.node.x, 230);
                        swordRainNode.getComponent(swordRain_1.default).isRight = this.skeleton.node.scaleX > 0 ? true : false;
                        return [2 /*return*/];
                }
            });
        });
    };
    playerController.prototype.closeGravity = function () {
        this.rigibody.type = cc.RigidBodyType.Kinematic;
    };
    playerController.prototype.openGravity = function () {
        var _this = this;
        this.rigibody.type = cc.RigidBodyType.Dynamic;
        this.scheduleOnce(function () {
            _this.rigibody.applyForce(cc.v2(0, -180000), _this.rigibody.getWorldCenter(), true);
        }, 0);
    };
    playerController.prototype.setFriction = function (friction) {
        this.node.getComponent(cc.PhysicsBoxCollider).friction = friction;
        this.node.getComponent(cc.PhysicsBoxCollider).apply();
    };
    playerController.prototype.changeState = function (state) {
        this.hideDamageCollider();
        if (this.getAnimationName(state).includes("attack") == false) {
            this.resetCombo();
        }
        if (this.jumpSoundId != -1 && this.jumpSoundState.includes(state) == false) {
            audioManager_1.default.stopAudio(this.jumpSoundId);
            this.jumpSoundId = -1;
        }
        this.state = state;
        this['enterStateEvent_' + this.getAnimationName(state)](state);
        if (playerControlEvent_1.default.instance.isContinueAttack && this.state == animationState_1.playerAnimationState.idle) {
            //idle状态下连续攻击
            this.changeDirection();
            this.changeState(animationState_1.playerAnimationState.attack1);
        }
    };
    playerController.prototype.getAnimationName = function (state) {
        return animationState_1.playerAnimationState[state];
    };
    playerController.prototype.playAnimation = function (animationName, timeScale, isLoop) {
        var _this = this;
        if (isLoop === void 0) { isLoop = false; }
        if (animationName == this.skeleton.animation) {
            return;
        }
        if (this.skeleton.animation == "attack1" && animationName == "idle") {
            this.skeleton.setMix(this.skeleton.animation, animationName, 0.3);
            this.scheduleOnce(function () {
                _this.attack1Finish = true;
            }, 0.1);
        }
        else if (this.skeleton.animation == "double_jump" && animationName == "roll_air") {
            //this.skeleton.setMix(this.skeleton.animation, animationName, 0.1);
        }
        var trackEntry = this.skeleton.setAnimation(0, animationName, isLoop);
        this.setTrackEntryEnvet(trackEntry, animationName);
        this.skeleton.timeScale = timeScale;
        // if (animationName == this.getAnimationName(playerAnimationState.attack1)) {
        //     this.skeleton.addAnimation(0, this.getAnimationName(playerAnimationState.attack2), false, 0.2);
        //     this.skeleton.addAnimation(0, this.getAnimationName(playerAnimationState.attack3), false, 0.2);
        // }
    };
    playerController.prototype.setAnimationCompleteEvent = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.playerAnimationState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.playerAnimationState.appear:
                    _this.appearEnd();
                    break;
                case animationState_1.playerAnimationState.idle_to_move:
                    _this.anyToIdleOrJump();
                    break;
                case animationState_1.playerAnimationState.pose_shadow:
                    _this.changeState(animationState_1.playerAnimationState.attack3);
                    break;
                case animationState_1.playerAnimationState.attack3:
                    _this.idle();
                    break;
                case animationState_1.playerAnimationState.jump_start:
                    _this.changeState(animationState_1.playerAnimationState.jump_down);
                    break;
                case animationState_1.playerAnimationState.double_jump:
                    _this.rigibody.linearDamping = -3;
                    break;
                case animationState_1.playerAnimationState.jump_end:
                    _this.changeState(animationState_1.playerAnimationState.idle);
                    break;
                case animationState_1.playerAnimationState.jump_to_move:
                    _this.changeState(animationState_1.playerAnimationState.move);
                    break;
                case animationState_1.playerAnimationState.jump_attack1:
                    _this.changeState(animationState_1.playerAnimationState.jump_attack2);
                    break;
                case animationState_1.playerAnimationState.jump_attack3:
                    _this.anyToIdleOrJump();
                    break;
                case animationState_1.playerAnimationState.roll:
                    _this.rollToIdleOrMove();
                    break;
                case animationState_1.playerAnimationState.roll_to_idle:
                    _this.idle();
                    break;
                case animationState_1.playerAnimationState.roll_to_move:
                    _this.changeState(animationState_1.playerAnimationState.move);
                    break;
                case animationState_1.playerAnimationState.revive:
                    _this.openBoxCollider();
                    break;
                case animationState_1.playerAnimationState.knock_up1:
                    _this.changeState(animationState_1.playerAnimationState.knock_up2);
                    break;
                case animationState_1.playerAnimationState.knock_up2:
                    _this.changeState(animationState_1.playerAnimationState.knock_up3);
                    break;
                case animationState_1.playerAnimationState.knock_up3:
                    _this.scheduleOnce(function () {
                        if (_this.state == animationState_1.playerAnimationState.knock_up3) {
                            _this.changeState(animationState_1.playerAnimationState.get_up);
                        }
                    }, 0.2);
                    break;
                case animationState_1.playerAnimationState.get_up:
                    _this.idle();
                    playerControlEvent_1.default.instance.bindingEvent();
                    break;
                default:
                    if (_this.skeleton.animation.includes("skill")) {
                        if (_this.playerCollider.isFlying) {
                            _this.openGravity();
                            _this.changeState(animationState_1.playerAnimationState.jump_down);
                        }
                        else {
                            _this.changeState(animationState_1.playerAnimationState.idle);
                        }
                    }
                    break;
            }
        });
    };
    playerController.prototype.rollToIdleOrMove = function () {
        if (this.moveVector.x == 0) {
            this.changeState(animationState_1.playerAnimationState.roll_to_idle);
        }
        else {
            this.changeState(animationState_1.playerAnimationState.roll_to_move);
        }
    };
    playerController.prototype.anyToIdleOrJump = function () {
        if (this.moveVector.x == 0) {
            this.changeState(animationState_1.playerAnimationState.idle);
        }
        else {
            this.changeState(animationState_1.playerAnimationState.move);
        }
    };
    //--------------------以下为动画帧事件事件-------------------------------------------
    playerController.prototype.setAnimationFrameEvent = function (animationName) {
        if (animationState_1.frameEvent[animationName] == undefined)
            return;
        this.skeleton.setEventListener(this[animationState_1.frameEvent[animationName]].bind(this));
    };
    playerController.prototype.setTrackEntryEnvet = function (trackEntry, animationName) {
        if (animationState_1.frameEvent[animationName] == undefined)
            return;
        this.skeleton.setTrackEventListener(trackEntry, this[animationState_1.frameEvent[animationName]].bind(this));
    };
    playerController.prototype.setFrameEventTime = function () {
        this.skeleton.findAnimation("skill207_ground").timelines[59].frames[0] = animationState_1.skillFrameEventTime.skill207_ground;
        this.skeleton.findAnimation("skill207_air").timelines[65].frames[0] = animationState_1.skillFrameEventTime.skill207_air;
        this.skeleton.findAnimation("skill203_ground").timelines[56].frames[0] = animationState_1.skillFrameEventTime.skill203_ground;
        this.skeleton.findAnimation("skill203_air").timelines[58].frames[0] = animationState_1.skillFrameEventTime.skill203_air;
        this.skeleton.findAnimation("attack1").timelines[68].frames[2] = animationState_1.skillFrameEventTime.attack1;
        this.skeleton.findAnimation("attack2").timelines[72].frames[2] = animationState_1.skillFrameEventTime.attack2;
    };
    playerController.prototype.AddForceUp = function (trackEntry, event) {
        console.log("AddForceUp");
    };
    playerController.prototype.AnimationEnd = function (trackEntry, event) {
        console.log("AnimationEnd");
    };
    playerController.prototype.Attack1 = function (trackEntry, event) {
        //console.log(event);//"MoveForward" "LockDirection" "StopMove""AttackComplete"
        if (event.data.name == "StopMove") {
            var dmg = playerHp_1.default.instance.damageScale * this.damageScaleZoom;
            this.skeleton.node.children[this.dmgCollider].getComponent(playerColliderAttack1_1.default).hit(dmg, animationState_1.attackType.attack1);
        }
    };
    playerController.prototype.Attack2 = function (trackEntry, event) {
        //console.log(event);
        if (event.data.name == "StopMove") {
            var dmg = playerHp_1.default.instance.damageScale * this.damageScaleZoom * this.damage2ScaleTimes;
            this.skeleton.node.children[this.dmgCollider].getComponent(playerColliderAttack2_1.default).hit(dmg, animationState_1.attackType.attack2);
        }
    };
    playerController.prototype.Attack3 = function (trackEntry, event) {
        //console.log(trackEntry);
    };
    playerController.prototype.FootStep = function (trackEntry, event) {
        //console.log("FootStep");
        if (event.time > 0.2)
            return;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.Run);
    };
    playerController.prototype.GetUp = function (trackEntry, event) {
        //console.log("GetUp");
    };
    playerController.prototype.LockDirection = function (trackEntry, event) {
        //console.log("LockDirection");
    };
    playerController.prototype.MoveForward = function (trackEntry, event) {
        //console.log("MoveForward");
    };
    playerController.prototype.RollComplete = function (trackEntry, event) {
        //console.log("RollComplete");
    };
    playerController.prototype.SkillComplete = function (trackEntry, event) {
        //技能投掷帧事件
        if (this.skeleton.animation.includes("207")) {
            //console.log("shuriken");
            this.createShuriken();
        }
        else {
            //console.log("swordRain");
            this.createSwordRain();
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.Kunai);
        }
    };
    playerController.prototype.StopMove = function (trackEntry, event) {
        //console.log("StopMove");
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.StopMove);
    };
    //--------------------以下为changeState事件-------------------------------------------
    playerController.prototype.enterStateEvent_idle = function (state) {
        this.rigibody.linearVelocity = cc.v2(0, this.rigibody.linearVelocity.y);
        this.playAnimation(animationState_1.playerAnimationState[state], 1, true);
    };
    playerController.prototype.enterStateEvent_idle_to_move = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 3, false);
    };
    playerController.prototype.enterStateEvent_move = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1.2, true);
    };
    playerController.prototype.enterStateEvent_attack1 = function (state) {
        var _this = this;
        this.showDamageCollider(damageCollider.attack1);
        this.attack1Finish = false;
        this.rigibody.linearVelocity = cc.v2(0, this.rigibody.linearVelocity.y);
        this.node.x = this.skeleton.node.scaleX > 0 ? this.node.x + 0 : this.node.x - 0; //位移
        this.playAnimation(animationState_1.playerAnimationState[state], 1 * playerHp_1.default.instance.speedTimes, false);
        this.scheduleOnce(function () {
            //attack1动作结束
            if (animationState_1.playerAnimationState[_this.skeleton.animation] != animationState_1.playerAnimationState.attack1)
                return;
            if (playerControlEvent_1.default.instance.isContinueAttack || _this.comboAttack > 1) {
                _this.changeState(animationState_1.playerAnimationState.attack2);
            }
            else {
                _this.changeState(animationState_1.playerAnimationState.idle);
            }
        }, 0.26 / playerHp_1.default.instance.speedTimes);
    };
    playerController.prototype.enterStateEvent_attack2 = function (state) {
        var _this = this;
        this.showDamageCollider(damageCollider.attack2);
        this.attack1Finish = true;
        this.playAnimation(animationState_1.playerAnimationState[state], 1 * playerHp_1.default.instance.speedTimes, false);
        this.changeDirection();
        var offsetx = this.skeleton.node.scaleX > 0 ? this.offesetX_aatack3 : -this.offesetX_aatack3; //位移
        this.rigibody.linearVelocity = cc.v2(offsetx, 0);
        this.scheduleOnce(function () {
            //attack2动作结束
            if (animationState_1.playerAnimationState[_this.skeleton.animation] != animationState_1.playerAnimationState.attack2)
                return;
            if (playerControlEvent_1.default.instance.isContinueAttack || _this.comboAttack > 2) {
                _this.changeState(animationState_1.playerAnimationState.pose_shadow);
            }
            else {
                _this.changeState(animationState_1.playerAnimationState.idle);
            }
        }, 0.32 / playerHp_1.default.instance.speedTimes);
    };
    playerController.prototype.enterStateEvent_pose_shadow = function (state) {
        var _this = this;
        audioManager_1.default.playAudio(audioNameMgr_1.audioName.thrust1);
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
        this.changeDirection();
        this.rigibody.linearVelocity = cc.v2(0, 0);
        this.scheduleOnce(function () {
            if (animationState_1.playerAnimationState[_this.skeleton.animation] != animationState_1.playerAnimationState.pose_shadow)
                return;
            _this.changeState(animationState_1.playerAnimationState.attack3);
        }, 0.05);
    };
    playerController.prototype.enterStateEvent_attack3 = function (state) {
        var _this = this;
        this.state = state;
        this.playAnimation(animationState_1.playerAnimationState[state], 1.1 * playerHp_1.default.instance.speedTimes, false);
        this.scheduleOnce(function () {
            //attack3动作冲刺开始
            if (animationState_1.playerAnimationState[_this.skeleton.animation] == animationState_1.playerAnimationState.attack3) {
                var offsetx = _this.skeleton.node.scaleX > 0 ?
                    800 * playerHp_1.default.instance.speedTimes :
                    -800 * playerHp_1.default.instance.speedTimes; //位移
                _this.rigibody.linearVelocity = cc.v2(offsetx, 0);
                _this.showDamageCollider(damageCollider.attack3);
            }
            _this.scheduleOnce(function () {
                //attack3动作冲刺结束
                _this.hideDamageCollider();
                if (animationState_1.playerAnimationState[_this.skeleton.animation] == animationState_1.playerAnimationState.attack3) {
                    _this.rigibody.linearVelocity = cc.v2(0, 0);
                }
            }, 0.2 / playerHp_1.default.instance.speedTimes);
        }, 0.24 / playerHp_1.default.instance.speedTimes);
    };
    playerController.prototype.enterStateEvent_jump_start = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_double_jump = function (state) {
        this.rigibody.linearDamping = 1;
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_jump_down = function (state) {
        this.rigibody.linearDamping = 0;
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_jump_end = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_jump_to_move = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_jump_attack1 = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_jump_attack2 = function (state) {
        this.showDamageCollider(damageCollider.jumpHit);
        this.playAnimation(animationState_1.playerAnimationState[state], 1.3 * playerHp_1.default.instance.speedTimes, true);
    };
    playerController.prototype.enterStateEvent_jump_attack3 = function (state) {
        this.rigibody.linearVelocity = cc.v2(0, 0);
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_roll = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1.3, false);
    };
    playerController.prototype.enterStateEvent_roll_air = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_roll_to_idle = function (state) {
        this.rigibody.linearVelocity = cc.v2(0, this.rigibody.linearVelocity.y);
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_roll_to_move = function (state) {
        this.rigibody.linearVelocity = cc.v2(0, this.rigibody.linearVelocity.y);
        this.playAnimation(animationState_1.playerAnimationState[state], 1.1, false);
    };
    playerController.prototype.enterStateEvent_skill203_air = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1 * playerHp_1.default.instance.speedTimes, false);
    };
    playerController.prototype.enterStateEvent_skill203_ground = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1 * playerHp_1.default.instance.speedTimes, false);
    };
    playerController.prototype.enterStateEvent_skill207_air = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1 * playerHp_1.default.instance.speedTimes, false);
    };
    playerController.prototype.enterStateEvent_skill207_ground = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1 * playerHp_1.default.instance.speedTimes, false);
    };
    playerController.prototype.enterStateEvent_die = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_revive = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_knock_up1 = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_knock_up2 = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_knock_up3 = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    playerController.prototype.enterStateEvent_get_up = function (state) {
        this.playAnimation(animationState_1.playerAnimationState[state], 1, false);
    };
    __decorate([
        property(sp.Skeleton)
    ], playerController.prototype, "skeleton", void 0);
    playerController = __decorate([
        ccclass
    ], playerController);
    return playerController;
}(cc.Component));
exports.default = playerController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxccGxheWVyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRixnREFBNEM7QUFDNUMsNENBQTJDO0FBQzNDLHFEQUFnRDtBQUNoRCxvQ0FBbUM7QUFDbkMsbURBQXFHO0FBQ3JHLG1DQUE4QjtBQUM5Qiw2Q0FBd0M7QUFDeEMsbURBQThDO0FBQzlDLGlFQUE0RDtBQUM1RCxpRUFBNEQ7QUFDNUQsaURBQTRDO0FBQzVDLHlDQUFvQztBQUNwQywwQ0FBcUM7QUFDckMsOERBQXlEO0FBQ3pELDBDQUFxQztBQUNyQyw0Q0FBdUM7QUFFdkMsSUFBSyxjQUtKO0FBTEQsV0FBSyxjQUFjO0lBQ2YseURBQU8sQ0FBQTtJQUNQLHlEQUFPLENBQUE7SUFDUCx5REFBTyxDQUFBO0lBQ1AseURBQU8sQ0FBQTtBQUNYLENBQUMsRUFMSSxjQUFjLEtBQWQsY0FBYyxRQUtsQjtBQUNLLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBeTFCQztRQXQxQkcsY0FBUSxHQUFnQixJQUFJLENBQUM7UUFHN0IscUJBQWUsR0FBVyxDQUFDLENBQUMsQ0FBQSxRQUFRO1FBQ3BDLHVCQUFpQixHQUFXLEdBQUcsQ0FBQyxDQUFBLFNBQVM7UUFDekMsdUJBQWlCLEdBQVcsR0FBRyxDQUFDLENBQUEsU0FBUztRQUN6Qyw4QkFBd0IsR0FBVyxDQUFDLENBQUMsQ0FBQSxTQUFTO1FBQzlDLCtCQUF5QixHQUFXLENBQUMsQ0FBQyxDQUFBLFFB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SUFDRCxpREFBc0IsR0FBdEIsVUFBdUIsS0FBMkI7UUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQ0FBb0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQXIxQkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztzREFDTztJQUhaLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBeTFCcEM7SUFBRCx1QkFBQztDQXoxQkQsQUF5MUJDLENBejFCNkMsRUFBRSxDQUFDLFNBQVMsR0F5MUJ6RDtrQkF6MUJvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgYXVkaW9OYW1lIH0gZnJvbSBcIi4uL2F1ZGlvTmFtZU1nclwiO1xuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgYXVkaW9NYW5hZ2VyIGZyb20gXCIuLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi9zZGsvZGF0YVwiO1xuaW1wb3J0IHsgYXR0YWNrVHlwZSwgZnJhbWVFdmVudCwgcGxheWVyQW5pbWF0aW9uU3RhdGUsIHNraWxsRnJhbWVFdmVudFRpbWUgfSBmcm9tIFwiLi9hbmltYXRpb25TdGF0ZVwiO1xuaW1wb3J0IEV2ZW50cyBmcm9tIFwiLi9FdmVudHNcIjtcbmltcG9ydCBHYW1lTWFuYWdlciBmcm9tIFwiLi9HYW1lTWFuYWdlclwiO1xuaW1wb3J0IHBsYXllckNvbGxpZGVyIGZyb20gXCIuL3BsYXllckNvbGxpZGVyXCI7XG5pbXBvcnQgcGxheWVyQ29sbGlkZXJBdHRhY2sxIGZyb20gXCIuL3BsYXllckNvbGxpZGVyQXR0YWNrMVwiO1xuaW1wb3J0IHBsYXllckNvbGxpZGVyQXR0YWNrMiBmcm9tIFwiLi9wbGF5ZXJDb2xsaWRlckF0dGFjazJcIjtcbmltcG9ydCBwbGF5ZXJQYW5kYW50IGZyb20gXCIuL3BsYXllclBhbmRhbnRcIjtcbmltcG9ydCBzd29yZFJhaW4gZnJvbSBcIi4vc3dvcmRSYWluXCI7XG5pbXBvcnQgSm95U3RpY2sgZnJvbSBcIi4vdWkvSm95c3RpY2tcIjtcbmltcG9ydCBwbGF5ZXJDb250cm9sRXZlbnQgZnJvbSBcIi4vdWkvcGxheWVyQ29udHJvbEV2ZW50XCI7XG5pbXBvcnQgcGxheWVySHAgZnJvbSBcIi4vdWkvcGxheWVySHBcIjtcbmltcG9ydCB1aU1hbmFnZXIgZnJvbSBcIi4vdWkvdWlNYW5hZ2VyXCI7XG5cbmVudW0gZGFtYWdlQ29sbGlkZXIge1xuICAgIGF0dGFjazEsXG4gICAgYXR0YWNrMixcbiAgICBhdHRhY2szLFxuICAgIGp1bXBIaXRcbn1cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGxheWVyQ29udHJvbGxlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcblxuXG4gICAgZGFtYWdlU2NhbGVab29tOiBudW1iZXIgPSAxOy8v5Lyk5a6z57yp5pS+57O75pWwXG4gICAgZGFtYWdlMlNjYWxlVGltZXM6IG51bWJlciA9IDEuMzsvL+aZruaUuzLkvKTlrrPlgI3mlbBcbiAgICBkYW1hZ2UzU2NhbGVUaW1lczogbnVtYmVyID0gMi41Oy8v5pmu5pS7M+S8pOWus+WAjeaVsFxuICAgIGRhbWFnZVNodXJpa2VuU2NhbGVUaW1lczogbnVtYmVyID0gNTsvL+aJi+mHjOWJkeS8pOWus+WAjeaVsFxuICAgIGRhbWFnZVN3b3JkUmFpblNjYWxlVGltZXM6IG51bWJlciA9IDE7Ly/liZHpm6jkvKTlrrPlgI3mlbBcbiAgICBwbGF5ZXJDb2xsaWRlcjogcGxheWVyQ29sbGlkZXIgPSBudWxsO1xuICAgIG1vdmVTcGVlZEJhc2U6bnVtYmVyPTQ2MDtcbiAgICBzcGVlZDogbnVtYmVyID0gNDYwO1xuICAgIG9mZmVzZXRYX2FhdGFjazM6IG51bWJlciA9IDI1MDsvL+aUu+WHu+S4ieS9jeenu+mHj1xuICAgIHJpZ2lib2R5OiBjYy5SaWdpZEJvZHkgPSBudWxsO1xuICAgIG1vdmVWZWN0b3I6IGNjLlZlYzIgPSBjYy52MigwLCAwKTtcbiAgICBzY2FsZVg6IG51bWJlciA9IDA7XG4gICAgc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlID0gcGxheWVyQW5pbWF0aW9uU3RhdGUuaWRsZTtcbiAgICBjb21ib0F0dGFjazogbnVtYmVyID0gMDtcbiAgICBqdW1wVGltZXM6IG51bWJlciA9IDA7XG4gICAganVtcEZvcmNlX3k6IG51bWJlciA9IDM0MDAwMDsvL+i3s+i3g3novbTliptcbiAgICBqdW1wRm9yY2VfeDogbnVtYmVyID0gMzAwMDA7Ly/np7vliqjot7Pot4Pml7Z46L205YqbXG4gICAgcm9sbDFGb3JjZTogbnVtYmVyID0gNDAwMDAwOy8v5pmu6YCa57+75rua5YqbXG4gICAgcm9sbDJGb3JjZTogbnVtYmVyID0gMjYwMDAwOy8v6Lez6LeD5LiK5Y2H5Lit57+75rua5YqbXG4gICAgcm9sbERpcmVjdGlvbjogbnVtYmVyID0gMDtcbiAgICBsYXN0QXR0YWNrVGltZTogbnVtYmVyID0gMDtcbiAgICBhdHRhY2sxRmluaXNoOiBib29sZWFuID0gdHJ1ZTtcbiAgICBkbWdDb2xsaWRlcjogZGFtYWdlQ29sbGlkZXIgPSBudWxsO1xuICAgIGlzRGllOiBib29sZWFuID0gZmFsc2U7XG4gICAgaXNXdURpOiBib29sZWFuID0gdHJ1ZTtcbiAgICBmaW5hbEVuZW15OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBqdW1wU291bmRJZDpudW1iZXI9LTE7XG4gICAgdGh1bmRlcl9jaGFzZV9jZDpib29sZWFuPWZhbHNlO1xuICAgIGdyb3VuZDpjYy5Ob2RlPW51bGw7XG5cbiAgICAvL+WPr3jovbTnp7vliqjnirbmgIFcbiAgICBtb3ZlU3RhdGU6IEFycmF5PHBsYXllckFuaW1hdGlvblN0YXRlPiA9IFtcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUubW92ZSxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuaWRsZV90b19tb3ZlLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5kb3VibGVfanVtcCxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuanVtcF90b19tb3ZlLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX3N0YXJ0LFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX2Rvd24sXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfYXR0YWNrMSxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuanVtcF9hdHRhY2syLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX2F0dGFjazMsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLnJvbGxfdG9fbW92ZVxuICAgIF07XG4gICAgLy/kuI3lj6/mlLnmlrnlkJHnirbmgIFcbiAgICBkaXNhbGxvd0NoYW5nZVNjYWxleDogQXJyYXk8cGxheWVyQW5pbWF0aW9uU3RhdGU+ID0gW1xuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5hdHRhY2sxLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5hdHRhY2syLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5wb3NlX3NoYWRvdyxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuYXR0YWNrMyxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuZ2V0X3VwLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5za2lsbDIwM19haXIsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLnNraWxsMjAzX2dyb3VuZCxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuc2tpbGwyMDdfYWlyLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5za2lsbDIwN19ncm91bmQsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLnJldml2ZSxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuZGllLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5rbm9ja191cDEsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLmtub2NrX3VwMixcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUua25vY2tfdXAzLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5ib3dfYXR0YWNrX2Zhc3RcbiAgICBdO1xuICAgIC8v5LiN5Y+v57+75rua54q25oCBXG4gICAgZGlzYWxsb3dSb2xsOiBBcnJheTxwbGF5ZXJBbmltYXRpb25TdGF0ZT4gPSBbXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLnNraWxsMjAzX2FpcixcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuc2tpbGwyMDNfZ3JvdW5kLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5za2lsbDIwN19haXIsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLnNraWxsMjA3X2dyb3VuZCxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUucmV2aXZlLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5kaWUsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLmtub2NrX3VwMSxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUua25vY2tfdXAyLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5rbm9ja191cDMsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLnVsdGltYXRlXG4gICAgXTtcbiAgICAvL+aXoOaVjOeKtuaAgVxuICAgIHd1ZGk6IEFycmF5PHBsYXllckFuaW1hdGlvblN0YXRlPiA9IFtcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbCxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbF9haXIsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLnNraWxsMjAzX2FpcixcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuc2tpbGwyMDNfZ3JvdW5kLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5za2lsbDIwN19haXIsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLnJldml2ZSxcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuZGllLFxuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5za2lsbDIwN19ncm91bmQsXG4gICAgXTtcbiAgICBqdW1wU291bmRTdGF0ZTpBcnJheTxwbGF5ZXJBbmltYXRpb25TdGF0ZT49W1xuICAgICAgICBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX2F0dGFjazEsXG4gICAgICAgIHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfYXR0YWNrMixcbiAgICAgICAgcGxheWVyQW5pbWF0aW9uU3RhdGUuanVtcF9hdHRhY2szXG4gICAgXVxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zY2FsZVggPSBNYXRoLmFicyh0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYKTtcbiAgICAgICAgdGhpcy5yaWdpYm9keSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcbiAgICAgICAgdGhpcy5wbGF5ZXJDb2xsaWRlciA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQocGxheWVyQ29sbGlkZXIpO1xuICAgICAgICB0aGlzLnNwZWVkPU51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwicGxheWVyTW92ZVNwZWVkXCIpKTtcbiAgICAgICAgdGhpcy5ncm91bmQ9dGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcImdyb3VuZFwiKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5za2VsZXRvbi5za2VsZXRvbkRhdGEuX3NrZWxldG9uQ2FjaGUuYW5pbWF0aW9ucyk7XG4gICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uQ29tcGxldGVFdmVudCgpO1xuICAgICAgICB0aGlzLnNldEZyYW1lRXZlbnRUaW1lKCk7Ly/mlLnlj5jluKfkuovku7blk43lupTml7bpl7RcbiAgICB9XG4gICAgLy/nmbvlnLrliqjnlLvlroxcbiAgICBhcHBlYXJFbmQoKSB7XG4gICAgICAgIHRoaXMuaXNXdURpPWZhbHNlO1xuICAgICAgICB1aU1hbmFnZXIuaW5zLnNob3dVaSgpO1xuICAgICAgICBKb3lTdGljay5pbnN0YW5jZS5pbml0KCk7XG4gICAgICAgIHBsYXllckNvbnRyb2xFdmVudC5pbnN0YW5jZS5pbml0KCk7XG4gICAgICAgIEdhbWVNYW5hZ2VyLmluc3RhbmNlLmVuZW15U3Bhd25NLnN0YXJ0U3B3YW4oKTtcbiAgICAgICAgdGhpcy5pZGxlKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUGFuZGFudCgpO1xuICAgICAgICAvLy8vLy8vLy8vL1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHVpTWFuYWdlci5pbnMuc2hvd0RvdWJsZURhbWFnZVBvcHVwKClcbiAgICAgICAgfSwgMzAwMCk7XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZVBhbmRhbnQoKXtcbiAgICAgICAgbGV0IHByZT1hd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWJzL3BlbmRhbnRcIik7XG4gICAgICAgIGxldCBwYW5kYW50PWNjLmluc3RhbnRpYXRlKHByZSk7XG4gICAgICAgIHBhbmRhbnQuc2V0UGFyZW50KHRoaXMubm9kZS5wYXJlbnQpO1xuICAgICAgICBwYW5kYW50LnNldFNpYmxpbmdJbmRleCh0aGlzLm5vZGUuZ2V0U2libGluZ0luZGV4KCkrMSk7XG4gICAgICAgIHBhbmRhbnQuZ2V0Q29tcG9uZW50KHBsYXllclBhbmRhbnQpLnBsYXllcj10aGlzLm5vZGU7XG4gICAgICAgIHBhbmRhbnQuZ2V0Q29tcG9uZW50KHBsYXllclBhbmRhbnQpLmluaXQoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZ2V0QW5pbWF0aW9uTmFtZSh0aGlzLnN0YXRlKSx0aGlzLnNrZWxldG9uLmFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMucGxheWVyTW92ZSgpO1xuICAgIH1cbiAgICBwbGF5ZXJNb3ZlKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5kaWUpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMubW92ZVZlY3Rvci54ID09IDAgJiYgdGhpcy5zdGF0ZSA9PSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5tb3ZlKSB7XG4gICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb3ZlU3RhdGUuaW5jbHVkZXModGhpcy5zdGF0ZSkgJiYgdGhpcy5tb3ZlVmVjdG9yLnggIT0gMCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIGxldCBzcGVlZCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gdGhpcy5zcGVlZCA6IC10aGlzLnNwZWVkO1xuICAgICAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHNwZWVkLCB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5LnkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNrZWxldG9uLmFuaW1hdGlvbiA9PSBwbGF5ZXJBbmltYXRpb25TdGF0ZVtwbGF5ZXJBbmltYXRpb25TdGF0ZS5pZGxlXVxuICAgICAgICAgICAgJiYgdGhpcy5tb3ZlVmVjdG9yLnggIT0gMFxuICAgICAgICAgICAgJiYgdGhpcy5hdHRhY2sxRmluaXNoKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmlkbGVfdG9fbW92ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy/mkYfmnYbnm5HlkKzkuovku7ZcbiAgICBtb3ZlKHZlY3RvcjogY2MuVmVjMikge1xuICAgICAgICB0aGlzLm1vdmVWZWN0b3IgPSB2ZWN0b3I7XG4gICAgICAgIGlmICh0aGlzLm1vdmVWZWN0b3IueCAhPSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXNhbGxvd0NoYW5nZVNjYWxleC5pbmNsdWRlcyh0aGlzLnN0YXRlKSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA9IHZlY3Rvci54ID4gMCA/IHRoaXMuc2NhbGVYIDogLXRoaXMuc2NhbGVYO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPT0gdGhpcy5yb2xsRGlyZWN0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLnJvbGw6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckNvbGxpZGVyLmlzRmx5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfZG93bik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLm1vdmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbF9haXI6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllckNvbGxpZGVyLmlzRmx5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfZG93bik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLm1vdmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbF90b19pZGxlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLm1vdmUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLnJvbGxfdG9fbW92ZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5tb3ZlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdlRGlyZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5tb3ZlVmVjdG9yLnggIT0gMCkge1xuICAgICAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA9IHRoaXMubW92ZVZlY3Rvci54ID4gMCA/IHRoaXMuc2NhbGVYIDogLXRoaXMuc2NhbGVYO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNob3dEYW1hZ2VDb2xsaWRlcihjb2xsaWRlcjogZGFtYWdlQ29sbGlkZXIpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW2NvbGxpZGVyXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRtZ0NvbGxpZGVyID0gY29sbGlkZXI7XG4gICAgfVxuICAgIGhpZGVEYW1hZ2VDb2xsaWRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG1nQ29sbGlkZXIgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuY2hpbGRyZW5bdGhpcy5kbWdDb2xsaWRlcl0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZG1nQ29sbGlkZXIgPSBudWxsO1xuICAgIH1cbiAgICBiZUhpdChlbmVteTogY2MuTm9kZSwgZG1nOiBudW1iZXIsIGlzS25vY2tEb3duOiBib29sZWFuID0gZmFsc2UpIHtcbi8qICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gcGxheWVyQW5pbWF0aW9uU3RhdGUuaWRsZSkge1xuICAgICAgICAgICAgbGV0IGZvcmNlID0gNDAwMDA7XG4gICAgICAgICAgICBmb3JjZSA9IHRoaXMubm9kZS54ID4gZW5lbXkueCA/IGZvcmNlIDogLWZvcmNlO1xuICAgICAgICAgICAgdGhpcy5yaWdpYm9keS5hcHBseUZvcmNlVG9DZW50ZXIoY2MudjIoZm9yY2UsIDApLCB0cnVlKTtcbiAgICAgICAgfSAqL1xuICAgICAgICBpZih0aGlzLmlzRGllKSByZXR1cm47XG4gICAgICAgIGxldCBzY2FsZXggPSBlbmVteS54ID4gdGhpcy5ub2RlLnggPyAtMSA6IDE7XG4gICAgICAgIGxldCBvZmZzZXRYID0gY2FpamlUb29scy5yYW5kb21faW50KC00MCwgNDApO1xuICAgICAgICBpZiAodGhpcy53dWRpLmluY2x1ZGVzKHRoaXMuc3RhdGUpIHx8IHRoaXMuaXNXdURpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1d1RGkpIHtcbiAgICAgICAgICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2hvd0RhbWFnZUxhYmVsX3BsYXllcih0aGlzLm5vZGUsIDAsIG9mZnNldFgpO1xuICAgICAgICAgICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zaG93RW5lbXlIaXRFZmZlY3QodGhpcy5ub2RlLnBhcmVudCwgY2MudjIodGhpcy5ub2RlLnggKyBjYWlqaVRvb2xzLnJhbmRvbV9pbnQoLTE1LCAxNSksIHRoaXMubm9kZS55ICsgNjApLCBzY2FsZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmluYWxFbmVteSA9IGVuZW15O1xuICAgICAgICB0aGlzLmhpZ2hMaWdodCgpO1xuICAgICAgICBwbGF5ZXJIcC5pbnN0YW5jZS51cGRhdGVIcChkbWcpO1xuICAgICAgICBFdmVudHMuaW5zdGFuY2Uuc2hvd0RhbWFnZUxhYmVsX3BsYXllcih0aGlzLm5vZGUsIGRtZywgb2Zmc2V0WCk7XG4gICAgICAgIEV2ZW50cy5pbnN0YW5jZS5zaG93RW5lbXlIaXRFZmZlY3QodGhpcy5ub2RlLnBhcmVudCwgY2MudjIodGhpcy5ub2RlLnggKyBjYWlqaVRvb2xzLnJhbmRvbV9pbnQoLTE1LCAxNSksIHRoaXMubm9kZS55ICsgNjApLCBzY2FsZXgpO1xuICAgICAgICBpZiAoaXNLbm9ja0Rvd24gJiYgdGhpcy5pc0RpZT09ZmFsc2UpIHtcbiAgICAgICAgICAgIHBsYXllckNvbnRyb2xFdmVudC5pbnN0YW5jZS5yZW1vdmVFdmVudCgpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5rbm9ja191cDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhpZ2hMaWdodCgpIHtcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuY2xvc2VIaWdoTGlnaHQpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMSk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZ2V0TWF0ZXJpYWwoMCkuc2V0UHJvcGVydHkoXCJoaWdoTGlnaHRDb2xvclwiLCBbMC44LCAwLjAsIDAuMCwgMC41XSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuY2xvc2VIaWdoTGlnaHQsIDAuMik7XG4gICAgfVxuICAgIGNsb3NlSGlnaExpZ2h0KCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLmdldE1hdGVyaWFsKDApLnNldFByb3BlcnR5KFwiYmVIaXRcIiwgMCk7XG4gICAgfVxuICAgIGRpZSgpIHtcbiAgICAgICAgcGxheWVyQ29udHJvbEV2ZW50Lmluc3RhbmNlLnJlbW92ZUV2ZW50KCk7XG4gICAgICAgIHVpTWFuYWdlci5pbnMubG9zZSgpO1xuICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmRpZSk7XG4gICAgICAgIHRoaXMuY2xvc2VCb3hDb2xsaWRlcigpO1xuICAgICAgICB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID0gdGhpcy5maW5hbEVuZW15LnggPiB0aGlzLm5vZGUueCA/IHRoaXMuc2NhbGVYIDogLXRoaXMuc2NhbGVYO1xuICAgIH1cbiAgICByZXZpdmUoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUucmV2aXZlKTtcbiAgICAgICAgRXZlbnRzLmluc3RhbmNlLnNob3dSZXZpdmVGeCh0aGlzLm5vZGUpO1xuICAgIH1cbiAgICBjbG9zZUJveENvbGxpZGVyKCkge1xuICAgICAgICB0aGlzLmlzRGllID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcikuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBvcGVuQm94Q29sbGlkZXIoKSB7XG4gICAgICAgIHRoaXMuaXNEaWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcikuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHBsYXllckhwLmluc3RhbmNlLmFkZEhwKHBsYXllckhwLmluc3RhbmNlLmhwX21heCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuaWRsZSk7XG4gICAgICAgIHRoaXMub3Blbld1RGkoNSk7XG4gICAgICAgIHBsYXllckNvbnRyb2xFdmVudC5pbnN0YW5jZS5iaW5kaW5nRXZlbnQoKTtcbiAgICB9XG4gICAgb3Blbld1RGkod3VkaVRpbWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLmlzV3VEaSA9IHRydWU7XG4gICAgICAgIGxldCBzaGllbGROb2RlOiBjYy5Ob2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2hpZWxkXCIpO1xuICAgICAgICBzaGllbGROb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIHNoaWVsZE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChjaGlsZC5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0zRCkpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0zRCkubG9vcCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVd1RGkoKTtcbiAgICAgICAgfSwgd3VkaVRpbWUgLSAyKTtcbiAgICB9XG4gICAgY2xvc2VXdURpKCkge1xuICAgICAgICBsZXQgc2hpZWxkTm9kZTogY2MuTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNoaWVsZFwiKTtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2Ygc2hpZWxkTm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGNoaWxkLmdldENvbXBvbmVudChjYy5QYXJ0aWNsZVN5c3RlbTNEKSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmdldENvbXBvbmVudChjYy5QYXJ0aWNsZVN5c3RlbTNEKS5sb29wID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc1d1RGkgPSBmYWxzZTtcbiAgICAgICAgICAgIHNoaWVsZE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sIDIpO1xuICAgIH1cbiAgICBpZGxlKCkge1xuICAgICAgICB0aGlzLmp1bXBUaW1lcyA9IDA7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuaWRsZSk7XG4gICAgfVxuICAgIGF0dGFjaygpIHtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyQ29sbGlkZXIuaXNGbHlpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tYm8oKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUubW92ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmF0dGFjazEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5pZGxlOlxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuYXR0YWNrMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLmlkbGVfdG9fbW92ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmF0dGFjazEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJDb2xsaWRlci5pc0ZseWluZykge1xuICAgICAgICAgICAgICAgICAgICAvL+epuuS4reaXtlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRBbmltYXRpb25OYW1lKHRoaXMuc3RhdGUpLmluY2x1ZGVzKFwianVtcF9hdHRhY2tcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuZ2V0QW5pbWF0aW9uTmFtZSh0aGlzLnN0YXRlKS5pbmNsdWRlcyhcInNraWxsXCIpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcEF0dGFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRDb21ibygpIHtcbiAgICAgICAgdGhpcy5sYXN0QXR0YWNrVGltZSA9IHRoaXMubGFzdEF0dGFja1RpbWUgPT0gMCA/IGNjLmRpcmVjdG9yLmdldFRvdGFsVGltZSgpIC8gMTAwMCA6IHRoaXMubGFzdEF0dGFja1RpbWU7XG4gICAgICAgIGlmICgoY2MuZGlyZWN0b3IuZ2V0VG90YWxUaW1lKCkgLyAxMDAwIC0gdGhpcy5sYXN0QXR0YWNrVGltZSkgPCAwLjMvcGxheWVySHAuaW5zdGFuY2Uuc3BlZWRUaW1lcyB8fCB0aGlzLmNvbWJvQXR0YWNrID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29tYm9BdHRhY2srKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbWJvQXR0YWNrID0gdGhpcy5jb21ib0F0dGFjayA+IDMgPyAzIDogdGhpcy5jb21ib0F0dGFjaztcbiAgICAgICAgdGhpcy5sYXN0QXR0YWNrVGltZSA9IGNjLmRpcmVjdG9yLmdldFRvdGFsVGltZSgpIC8gMTAwMDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjYy5kaXJlY3Rvci5nZXRUb3RhbFRpbWUoKS8xMDAwLXRoaXMubGFzdEF0dGFja1RpbWUsdGhpcy5jb21ib0F0dGFjayk7XG4gICAgfVxuICAgIHJlc2V0Q29tYm8oKSB7XG4gICAgICAgIHRoaXMuY29tYm9BdHRhY2sgPSAwO1xuICAgIH1cbiAgICByb2xsKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhbGxvd1JvbGwuaW5jbHVkZXModGhpcy5zdGF0ZSkpIHJldHVybjtcbiAgICAgICAgdGhpcy5yb2xsRGlyZWN0aW9uID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWDtcbiAgICAgICAgaWYgKHRoaXMucGxheWVyQ29sbGlkZXIuaXNGbHlpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMucm9sbF8xKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eS55ID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9sbF8yKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucm9sbF8xKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy/lnLDpnaLlkozpmY3okL3kuK3nv7vmu5pcbiAgICByb2xsXzEoKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLnJvbGxkYXNoKTtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJEYW1waW5nID0gMztcbiAgICAgICAgbGV0IGZvcmNlWCA9IHRoaXMuc2tlbGV0b24ubm9kZS5zY2FsZVggPiAwID8gdGhpcy5yb2xsMUZvcmNlIDogLXRoaXMucm9sbDFGb3JjZTtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkueSk7XG4gICAgICAgIHRoaXMucmlnaWJvZHkuYXBwbHlGb3JjZShjYy52Mihmb3JjZVgsIDApLCB0aGlzLnJpZ2lib2R5LmdldFdvcmxkQ2VudGVyKCksIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5qdW1wVGltZXMgPT0gMikge1xuICAgICAgICAgICAgdGhpcy5yaWdpYm9keS5hcHBseUZvcmNlKGNjLnYyKDAsIC0xMDAwMDApLCB0aGlzLnJpZ2lib2R5LmdldFdvcmxkQ2VudGVyKCksIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbCk7XG4gICAgfVxuICAgIC8v6LW36Lez5Lit57+75ruaXG4gICAgcm9sbF8yKCkge1xuICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5yb2xsZGFzaCk7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyRGFtcGluZyA9IC0wLjU7XG4gICAgICAgIGxldCBmb3JjZVggPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IHRoaXMucm9sbDJGb3JjZSA6IC10aGlzLnJvbGwyRm9yY2U7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5LnkpO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmFwcGx5Rm9yY2UoY2MudjIoZm9yY2VYLCAxMDAwMCksIHRoaXMucmlnaWJvZHkuZ2V0V29ybGRDZW50ZXIoKSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbF9haXIpO1xuICAgIH1cbiAgICBqdW1wKCkge1xuICAgICAgICBpZiAodGhpcy5qdW1wVGltZXMgPj0gMikgcmV0dXJuO1xuICAgICAgICBsZXQgZm9yY2VYID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyB0aGlzLmp1bXBGb3JjZV94IDogLXRoaXMuanVtcEZvcmNlX3g7XG4gICAgICAgIGZvcmNlWCA9IHRoaXMubW92ZVZlY3Rvci54ID09IDAgPyAwIDogZm9yY2VYO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhckRhbXBpbmcgPSAxO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUuaWRsZTpcbiAgICAgICAgICAgICAgICB0aGlzLmp1bXBfMShmb3JjZVgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5pZGxlX3RvX21vdmU6XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wXzEoZm9yY2VYKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUubW92ZTpcbiAgICAgICAgICAgICAgICB0aGlzLmp1bXBfMShmb3JjZVgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX3N0YXJ0OlxuICAgICAgICAgICAgICAgIHRoaXMuanVtcF8yKGZvcmNlWCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfZG93bjpcbiAgICAgICAgICAgICAgICB0aGlzLmp1bXBfMihmb3JjZVgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX2VuZDpcbiAgICAgICAgICAgICAgICB0aGlzLmp1bXBfMShmb3JjZVgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX3RvX21vdmU6XG4gICAgICAgICAgICAgICAgdGhpcy5qdW1wXzEoZm9yY2VYKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbGV0IG51bSA9IHRoaXMuanVtcFRpbWVzICsgMTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRBbmltYXRpb25OYW1lKHRoaXMuc3RhdGUpLmluY2x1ZGVzKFwicm9sbFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAvL+e/u+a7mi0+6Lez6LeDXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbXCJqdW1wX1wiICsgbnVtXShmb3JjZVgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdldEFuaW1hdGlvbk5hbWUodGhpcy5zdGF0ZSkuaW5jbHVkZXMoXCJqdW1wX2F0dGFja1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAvL+epuuS4reaUu+WHuy0+6Lez6LeDXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbXCJqdW1wX1wiICsgbnVtXShmb3JjZVgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdldEFuaW1hdGlvbk5hbWUodGhpcy5zdGF0ZSkuaW5jbHVkZXMoXCJhdHRhY2tcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lnLDpnaLmlLvlh7stPui3s+i3g1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmp1bXBfMShmb3JjZVgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8v56ys5LiA5q616Lez6LeDXG4gICAganVtcF8xKGZvcmNlWDogbnVtYmVyKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLmp1bXAsZmFsc2UsMC42KTtcbiAgICAgICAgdGhpcy5qdW1wVGltZXMrKztcbiAgICAgICAgdGhpcy5yaWdpYm9keS5hcHBseUZvcmNlKGNjLnYyKGZvcmNlWCwgdGhpcy5qdW1wRm9yY2VfeSksIHRoaXMucmlnaWJvZHkuZ2V0V29ybGRDZW50ZXIoKSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuanVtcF9zdGFydCk7XG4gICAgfVxuICAgIC8v56ys5LqM5q616Lez6LeDXG4gICAganVtcF8yKGZvcmNlWDogbnVtYmVyKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLmp1bXAsZmFsc2UsMC42KTtcbiAgICAgICAgdGhpcy5qdW1wVGltZXMrKztcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkueCwgMCk7XG4gICAgICAgIHRoaXMucmlnaWJvZHkuYXBwbHlGb3JjZShjYy52Mihmb3JjZVgsIHRoaXMuanVtcEZvcmNlX3kpLCB0aGlzLnJpZ2lib2R5LmdldFdvcmxkQ2VudGVyKCksIHRydWUpO1xuICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmRvdWJsZV9qdW1wKTtcbiAgICB9XG4gICAgYXN5bmMganVtcEF0dGFjaygpIHtcbiAgICAgICAgbGV0IGZvcmNlWSA9IHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkueSA8PSAwID8gdGhpcy5qdW1wRm9yY2VfeSAqIDAuNyA6IHRoaXMuanVtcEZvcmNlX3k7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52Mih0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5LngsIDApO1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmFwcGx5Rm9yY2UoY2MudjIoMCwgZm9yY2VZKSwgdGhpcy5yaWdpYm9keS5nZXRXb3JsZENlbnRlcigpLCB0cnVlKTtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJEYW1waW5nID0gZm9yY2VZID09IDAgPyAxMiA6IDA7XG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuanVtcF9hdHRhY2sxKTtcbiAgICAgICAgdGhpcy5qdW1wU291bmRJZD1hd2FpdCBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5TcGluQXR0YWNrLGZhbHNlKTtcbiAgICB9XG4gICAgZHJvcFRvR3JvdW5kKCkge1xuICAgICAgICB0aGlzLmp1bXBUaW1lcyA9IDA7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyRGFtcGluZyA9IDA7Ly8xO1xuICAgICAgICB0aGlzLnJlc2V0Q29tYm8oKTtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuSnVtcGxhbmQpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5pZGxlIHx8IHRoaXMuc3RhdGUgPT0gcGxheWVyQW5pbWF0aW9uU3RhdGUuZGllKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmdldEFuaW1hdGlvbk5hbWUodGhpcy5zdGF0ZSkuaW5jbHVkZXMoXCJyb2xsXCIpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5yb2xsX2Fpcikge1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCAwKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb3ZlVmVjdG9yLnggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfZW5kKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfdG9fbW92ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmdldEFuaW1hdGlvbk5hbWUodGhpcy5zdGF0ZSkuaW5jbHVkZXMoXCJqdW1wX2F0dGFja1wiKSkge1xuICAgICAgICAgICAgLy/mlLvlh7vokL3lnLBcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuanVtcF9hdHRhY2szKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8v6Lez6LeD6JC95ZywXG4gICAgICAgICAgICBpZiAodGhpcy5tb3ZlVmVjdG9yLnggIT0gMCkge1xuICAgICAgICAgICAgICAgIC8v6LezLT7ot5FcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfdG9fbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8v6LezLT7nq5nnq4tcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX2VuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2tpbGwxKCkge1xuICAgICAgICBpZiAodGhpcy5za2VsZXRvbi5hbmltYXRpb24uaW5jbHVkZXMoXCJza2lsbFwiKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldENvbWJvKCk7XG4gICAgICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgMCk7XG4gICAgICAgICAgICBhdWRpb01hbmFnZXIucGxheUF1ZGlvKGF1ZGlvTmFtZS5Ta2lsbGNhc3QyMDdTaHVyaWtlbik7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJDb2xsaWRlci5pc0ZseWluZykge1xuICAgICAgICAgICAgICAgIC8v56m65Lit6YeK5pS+IFxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VHcmF2aXR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5za2lsbDIwN19haXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLnNraWxsMjA3X2dyb3VuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY3JlYXRlU2h1cmlrZW4oKSB7XG4gICAgICAgIGxldCBwcmVmYWIgPSBhd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWJzL3NodXJpa2VuXCIpO1xuICAgICAgICBsZXQgc2h1cmlrZW4gPSBjYWlqaVRvb2xzLmNyZWF0ZU5vZGUocHJlZmFiLCB0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgc2h1cmlrZW4uc2V0UG9zaXRpb24odGhpcy5ub2RlLngsIHRoaXMubm9kZS55ICsgNzApO1xuICAgICAgICBzaHVyaWtlbi5zZXRTaWJsaW5nSW5kZXgoc2h1cmlrZW4uZ2V0U2libGluZ0luZGV4KCkgLSAxKTtcbiAgICB9XG4gICAgc2tpbGwyKCkge1xuICAgICAgICBpZiAodGhpcy5za2VsZXRvbi5hbmltYXRpb24uaW5jbHVkZXMoXCJza2lsbFwiKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldENvbWJvKCk7XG4gICAgICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5ID0gY2MudjIoMCwgMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJDb2xsaWRlci5pc0ZseWluZykge1xuICAgICAgICAgICAgICAgIC8v56m65Lit6YeK5pS+XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUdyYXZpdHkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLnNraWxsMjAzX2Fpcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuc2tpbGwyMDNfZ3JvdW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjcmVhdGVTd29yZFJhaW4oKSB7XG4gICAgICAgIGxldCBwcmVmYWIgPSBhd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWJzL3N3b3JkUmFpblwiKTtcbiAgICAgICAgbGV0IHN3b3JkUmFpbk5vZGUgPSBjYWlqaVRvb2xzLmNyZWF0ZU5vZGUocHJlZmFiLCB0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgc3dvcmRSYWluTm9kZS5zZXRTaWJsaW5nSW5kZXgodGhpcy5ncm91bmQuZ2V0U2libGluZ0luZGV4KCkpO1xuICAgICAgICBzd29yZFJhaW5Ob2RlLnNldFBvc2l0aW9uKHRoaXMubm9kZS54LCAyMzApO1xuICAgICAgICBzd29yZFJhaW5Ob2RlLmdldENvbXBvbmVudChzd29yZFJhaW4pLmlzUmlnaHQgPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gICAgY2xvc2VHcmF2aXR5KCkge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LnR5cGUgPSBjYy5SaWdpZEJvZHlUeXBlLktpbmVtYXRpYztcbiAgICB9XG4gICAgb3BlbkdyYXZpdHkoKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkudHlwZSA9IGNjLlJpZ2lkQm9keVR5cGUuRHluYW1pYztcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yaWdpYm9keS5hcHBseUZvcmNlKGNjLnYyKDAsIC0xODAwMDApLCB0aGlzLnJpZ2lib2R5LmdldFdvcmxkQ2VudGVyKCksIHRydWUpO1xuICAgICAgICB9LCAwKTtcbiAgICB9XG4gICAgc2V0RnJpY3Rpb24oZnJpY3Rpb246IG51bWJlcikge1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NCb3hDb2xsaWRlcikuZnJpY3Rpb24gPSBmcmljdGlvbjtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5QaHlzaWNzQm94Q29sbGlkZXIpLmFwcGx5KCk7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLmhpZGVEYW1hZ2VDb2xsaWRlcigpO1xuICAgICAgICBpZiAodGhpcy5nZXRBbmltYXRpb25OYW1lKHN0YXRlKS5pbmNsdWRlcyhcImF0dGFja1wiKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldENvbWJvKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5qdW1wU291bmRJZCE9LTEmJnRoaXMuanVtcFNvdW5kU3RhdGUuaW5jbHVkZXMoc3RhdGUpPT1mYWxzZSl7XG4gICAgICAgICAgICBhdWRpb01hbmFnZXIuc3RvcEF1ZGlvKHRoaXMuanVtcFNvdW5kSWQpO1xuICAgICAgICAgICAgdGhpcy5qdW1wU291bmRJZD0tMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXNbJ2VudGVyU3RhdGVFdmVudF8nICsgdGhpcy5nZXRBbmltYXRpb25OYW1lKHN0YXRlKV0oc3RhdGUpO1xuICAgICAgICBpZiAocGxheWVyQ29udHJvbEV2ZW50Lmluc3RhbmNlLmlzQ29udGludWVBdHRhY2sgJiYgdGhpcy5zdGF0ZSA9PSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5pZGxlKSB7XG4gICAgICAgICAgICAvL2lkbGXnirbmgIHkuIvov57nu63mlLvlh7tcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmF0dGFjazEpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgZ2V0QW5pbWF0aW9uTmFtZShzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXTtcbiAgICB9XG4gICAgcGxheUFuaW1hdGlvbihhbmltYXRpb25OYW1lOiBzdHJpbmcsIHRpbWVTY2FsZSwgaXNMb29wOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbk5hbWUgPT0gdGhpcy5za2VsZXRvbi5hbmltYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5za2VsZXRvbi5hbmltYXRpb24gPT0gXCJhdHRhY2sxXCIgJiYgYW5pbWF0aW9uTmFtZSA9PSBcImlkbGVcIikge1xuICAgICAgICAgICAgdGhpcy5za2VsZXRvbi5zZXRNaXgodGhpcy5za2VsZXRvbi5hbmltYXRpb24sIGFuaW1hdGlvbk5hbWUsIDAuMyk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRhY2sxRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIDAuMSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5za2VsZXRvbi5hbmltYXRpb24gPT0gXCJkb3VibGVfanVtcFwiICYmIGFuaW1hdGlvbk5hbWUgPT0gXCJyb2xsX2FpclwiKSB7XG4gICAgICAgICAgICAvL3RoaXMuc2tlbGV0b24uc2V0TWl4KHRoaXMuc2tlbGV0b24uYW5pbWF0aW9uLCBhbmltYXRpb25OYW1lLCAwLjEpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0cmFja0VudHJ5ID0gdGhpcy5za2VsZXRvbi5zZXRBbmltYXRpb24oMCwgYW5pbWF0aW9uTmFtZSwgaXNMb29wKTtcbiAgICAgICAgdGhpcy5zZXRUcmFja0VudHJ5RW52ZXQodHJhY2tFbnRyeSwgYW5pbWF0aW9uTmFtZSk7XG4gICAgICAgIHRoaXMuc2tlbGV0b24udGltZVNjYWxlID0gdGltZVNjYWxlO1xuICAgICAgICAvLyBpZiAoYW5pbWF0aW9uTmFtZSA9PSB0aGlzLmdldEFuaW1hdGlvbk5hbWUocGxheWVyQW5pbWF0aW9uU3RhdGUuYXR0YWNrMSkpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuc2tlbGV0b24uYWRkQW5pbWF0aW9uKDAsIHRoaXMuZ2V0QW5pbWF0aW9uTmFtZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5hdHRhY2syKSwgZmFsc2UsIDAuMik7XG4gICAgICAgIC8vICAgICB0aGlzLnNrZWxldG9uLmFkZEFuaW1hdGlvbigwLCB0aGlzLmdldEFuaW1hdGlvbk5hbWUocGxheWVyQW5pbWF0aW9uU3RhdGUuYXR0YWNrMyksIGZhbHNlLCAwLjIpO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIHNldEFuaW1hdGlvbkNvbXBsZXRlRXZlbnQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IHBsYXllckFuaW1hdGlvblN0YXRlW3RoaXMuc2tlbGV0b24uYW5pbWF0aW9uXTtcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUuYXBwZWFyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVhckVuZCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLmlkbGVfdG9fbW92ZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbnlUb0lkbGVPckp1bXAoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5wb3NlX3NoYWRvdzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5hdHRhY2szKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5hdHRhY2szOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX3N0YXJ0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfZG93bik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUuZG91YmxlX2p1bXA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyRGFtcGluZyA9IC0zO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfZW5kOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmlkbGUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLmp1bXBfdG9fbW92ZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5tb3ZlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX2F0dGFjazE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuanVtcF9hdHRhY2syKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX2F0dGFjazM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW55VG9JZGxlT3JKdW1wKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xsVG9JZGxlT3JNb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbF90b19pZGxlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5yb2xsX3RvX21vdmU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUubW92ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUucmV2aXZlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Cb3hDb2xsaWRlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLmtub2NrX3VwMTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5rbm9ja191cDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLmtub2NrX3VwMjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5rbm9ja191cDMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHBsYXllckFuaW1hdGlvblN0YXRlLmtub2NrX3VwMzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhdGU9PXBsYXllckFuaW1hdGlvblN0YXRlLmtub2NrX3VwMyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5nZXRfdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LDAuMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgcGxheWVyQW5pbWF0aW9uU3RhdGUuZ2V0X3VwOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyQ29udHJvbEV2ZW50Lmluc3RhbmNlLmJpbmRpbmdFdmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5za2VsZXRvbi5hbmltYXRpb24uaW5jbHVkZXMoXCJza2lsbFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyQ29sbGlkZXIuaXNGbHlpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5HcmF2aXR5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5qdW1wX2Rvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmlkbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcm9sbFRvSWRsZU9yTW92ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZVZlY3Rvci54ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbF90b19pZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUucm9sbF90b19tb3ZlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhbnlUb0lkbGVPckp1bXAoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVWZWN0b3IueCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmlkbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5tb3ZlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0t5Lul5LiL5Li65Yqo55S75bin5LqL5Lu25LqL5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHNldEFuaW1hdGlvbkZyYW1lRXZlbnQoYW5pbWF0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChmcmFtZUV2ZW50W2FuaW1hdGlvbk5hbWVdID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLnNldEV2ZW50TGlzdGVuZXIodGhpc1tmcmFtZUV2ZW50W2FuaW1hdGlvbk5hbWVdXS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgc2V0VHJhY2tFbnRyeUVudmV0KHRyYWNrRW50cnk6IGFueSwgYW5pbWF0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChmcmFtZUV2ZW50W2FuaW1hdGlvbk5hbWVdID09IHVuZGVmaW5lZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNrZWxldG9uLnNldFRyYWNrRXZlbnRMaXN0ZW5lcih0cmFja0VudHJ5LCB0aGlzW2ZyYW1lRXZlbnRbYW5pbWF0aW9uTmFtZV1dLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBzZXRGcmFtZUV2ZW50VGltZSgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5maW5kQW5pbWF0aW9uKFwic2tpbGwyMDdfZ3JvdW5kXCIpLnRpbWVsaW5lc1s1OV0uZnJhbWVzWzBdID0gc2tpbGxGcmFtZUV2ZW50VGltZS5za2lsbDIwN19ncm91bmQ7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZmluZEFuaW1hdGlvbihcInNraWxsMjA3X2FpclwiKS50aW1lbGluZXNbNjVdLmZyYW1lc1swXSA9IHNraWxsRnJhbWVFdmVudFRpbWUuc2tpbGwyMDdfYWlyO1xuICAgICAgICB0aGlzLnNrZWxldG9uLmZpbmRBbmltYXRpb24oXCJza2lsbDIwM19ncm91bmRcIikudGltZWxpbmVzWzU2XS5mcmFtZXNbMF0gPSBza2lsbEZyYW1lRXZlbnRUaW1lLnNraWxsMjAzX2dyb3VuZDtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5maW5kQW5pbWF0aW9uKFwic2tpbGwyMDNfYWlyXCIpLnRpbWVsaW5lc1s1OF0uZnJhbWVzWzBdID0gc2tpbGxGcmFtZUV2ZW50VGltZS5za2lsbDIwM19haXI7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZmluZEFuaW1hdGlvbihcImF0dGFjazFcIikudGltZWxpbmVzWzY4XS5mcmFtZXNbMl0gPSBza2lsbEZyYW1lRXZlbnRUaW1lLmF0dGFjazE7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uZmluZEFuaW1hdGlvbihcImF0dGFjazJcIikudGltZWxpbmVzWzcyXS5mcmFtZXNbMl0gPSBza2lsbEZyYW1lRXZlbnRUaW1lLmF0dGFjazI7XG4gICAgfVxuICAgIEFkZEZvcmNlVXAodHJhY2tFbnRyeSwgZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBZGRGb3JjZVVwXCIpO1xuICAgIH1cbiAgICBBbmltYXRpb25FbmQodHJhY2tFbnRyeSwgZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBbmltYXRpb25FbmRcIik7XG4gICAgfVxuICAgIEF0dGFjazEodHJhY2tFbnRyeSwgZXZlbnQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhldmVudCk7Ly9cIk1vdmVGb3J3YXJkXCIgXCJMb2NrRGlyZWN0aW9uXCIgXCJTdG9wTW92ZVwiXCJBdHRhY2tDb21wbGV0ZVwiXG4gICAgICAgIGlmIChldmVudC5kYXRhLm5hbWUgPT0gXCJTdG9wTW92ZVwiKSB7XG4gICAgICAgICAgICBsZXQgZG1nOiBudW1iZXIgPSBwbGF5ZXJIcC5pbnN0YW5jZS5kYW1hZ2VTY2FsZSAqIHRoaXMuZGFtYWdlU2NhbGVab29tO1xuICAgICAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdLmdldENvbXBvbmVudChwbGF5ZXJDb2xsaWRlckF0dGFjazEpLmhpdChkbWcsIGF0dGFja1R5cGUuYXR0YWNrMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQXR0YWNrMih0cmFja0VudHJ5LCBldmVudCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50LmRhdGEubmFtZSA9PSBcIlN0b3BNb3ZlXCIpIHtcbiAgICAgICAgICAgIGxldCBkbWc6IG51bWJlciA9IHBsYXllckhwLmluc3RhbmNlLmRhbWFnZVNjYWxlICogdGhpcy5kYW1hZ2VTY2FsZVpvb20gKiB0aGlzLmRhbWFnZTJTY2FsZVRpbWVzO1xuICAgICAgICAgICAgdGhpcy5za2VsZXRvbi5ub2RlLmNoaWxkcmVuW3RoaXMuZG1nQ29sbGlkZXJdLmdldENvbXBvbmVudChwbGF5ZXJDb2xsaWRlckF0dGFjazIpLmhpdChkbWcsIGF0dGFja1R5cGUuYXR0YWNrMik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQXR0YWNrMyh0cmFja0VudHJ5LCBldmVudCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRyYWNrRW50cnkpO1xuICAgIH1cbiAgICBGb290U3RlcCh0cmFja0VudHJ5LCBldmVudCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiRm9vdFN0ZXBcIik7XG4gICAgICAgIGlmKGV2ZW50LnRpbWU+MC4yKSByZXR1cm47XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLlJ1bik7XG4gICAgfVxuICAgIEdldFVwKHRyYWNrRW50cnksIGV2ZW50KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJHZXRVcFwiKTtcbiAgICB9XG4gICAgTG9ja0RpcmVjdGlvbih0cmFja0VudHJ5LCBldmVudCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTG9ja0RpcmVjdGlvblwiKTtcbiAgICB9XG4gICAgTW92ZUZvcndhcmQodHJhY2tFbnRyeSwgZXZlbnQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1vdmVGb3J3YXJkXCIpO1xuICAgIH1cbiAgICBSb2xsQ29tcGxldGUodHJhY2tFbnRyeSwgZXZlbnQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIlJvbGxDb21wbGV0ZVwiKTtcbiAgICB9XG4gICAgU2tpbGxDb21wbGV0ZSh0cmFja0VudHJ5LCBldmVudCkge1xuICAgICAgICAvL+aKgOiDveaKleaOt+W4p+S6i+S7tlxuICAgICAgICBpZiAodGhpcy5za2VsZXRvbi5hbmltYXRpb24uaW5jbHVkZXMoXCIyMDdcIikpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzaHVyaWtlblwiKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2h1cmlrZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzd29yZFJhaW5cIik7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVN3b3JkUmFpbigpO1xuICAgICAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuS3VuYWkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFN0b3BNb3ZlKHRyYWNrRW50cnksIGV2ZW50KSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJTdG9wTW92ZVwiKTtcbiAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuU3RvcE1vdmUpO1xuICAgIH1cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0t5Lul5LiL5Li6Y2hhbmdlU3RhdGXkuovku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgZW50ZXJTdGF0ZUV2ZW50X2lkbGUoc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5LnkpO1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCB0cnVlKTtcbiAgICB9XG4gICAgZW50ZXJTdGF0ZUV2ZW50X2lkbGVfdG9fbW92ZShzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMywgZmFsc2UpO1xuICAgIH1cbiAgICBlbnRlclN0YXRlRXZlbnRfbW92ZShzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMS4yLCB0cnVlKTtcbiAgICB9XG4gICAgZW50ZXJTdGF0ZUV2ZW50X2F0dGFjazEoc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmF0dGFjazEpO1xuICAgICAgICB0aGlzLmF0dGFjazFGaW5pc2ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkueSk7XG4gICAgICAgIHRoaXMubm9kZS54ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyB0aGlzLm5vZGUueCArIDAgOiB0aGlzLm5vZGUueCAtIDA7Ly/kvY3np7tcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMSpwbGF5ZXJIcC5pbnN0YW5jZS5zcGVlZFRpbWVzLCBmYWxzZSk7XG5cbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgLy9hdHRhY2sx5Yqo5L2c57uT5p2fXG4gICAgICAgICAgICBpZiAocGxheWVyQW5pbWF0aW9uU3RhdGVbdGhpcy5za2VsZXRvbi5hbmltYXRpb25dICE9IHBsYXllckFuaW1hdGlvblN0YXRlLmF0dGFjazEpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb250cm9sRXZlbnQuaW5zdGFuY2UuaXNDb250aW51ZUF0dGFjayB8fCB0aGlzLmNvbWJvQXR0YWNrID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuYXR0YWNrMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUuaWRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDAuMjYvcGxheWVySHAuaW5zdGFuY2Uuc3BlZWRUaW1lcyk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9hdHRhY2syKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnNob3dEYW1hZ2VDb2xsaWRlcihkYW1hZ2VDb2xsaWRlci5hdHRhY2syKTtcbiAgICAgICAgdGhpcy5hdHRhY2sxRmluaXNoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMSpwbGF5ZXJIcC5pbnN0YW5jZS5zcGVlZFRpbWVzLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgIGxldCBvZmZzZXR4ID0gdGhpcy5za2VsZXRvbi5ub2RlLnNjYWxlWCA+IDAgPyB0aGlzLm9mZmVzZXRYX2FhdGFjazMgOiAtdGhpcy5vZmZlc2V0WF9hYXRhY2szOy8v5L2N56e7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MihvZmZzZXR4LCAwKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgLy9hdHRhY2sy5Yqo5L2c57uT5p2fXG4gICAgICAgICAgICBpZiAocGxheWVyQW5pbWF0aW9uU3RhdGVbdGhpcy5za2VsZXRvbi5hbmltYXRpb25dICE9IHBsYXllckFuaW1hdGlvblN0YXRlLmF0dGFjazIpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb250cm9sRXZlbnQuaW5zdGFuY2UuaXNDb250aW51ZUF0dGFjayB8fCB0aGlzLmNvbWJvQXR0YWNrID4gMikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUocGxheWVyQW5pbWF0aW9uU3RhdGUucG9zZV9zaGFkb3cpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKHBsYXllckFuaW1hdGlvblN0YXRlLmlkbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwLjMyL3BsYXllckhwLmluc3RhbmNlLnNwZWVkVGltZXMpO1xuICAgIH1cbiAgICBlbnRlclN0YXRlRXZlbnRfcG9zZV9zaGFkb3coc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5wbGF5QXVkaW8oYXVkaW9OYW1lLnRocnVzdDEpO1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlRGlyZWN0aW9uKCk7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCAwKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBsYXllckFuaW1hdGlvblN0YXRlW3RoaXMuc2tlbGV0b24uYW5pbWF0aW9uXSAhPSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5wb3NlX3NoYWRvdykgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShwbGF5ZXJBbmltYXRpb25TdGF0ZS5hdHRhY2szKTtcbiAgICAgICAgfSwgMC4wNSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9hdHRhY2szKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihwbGF5ZXJBbmltYXRpb25TdGF0ZVtzdGF0ZV0sIDEuMSpwbGF5ZXJIcC5pbnN0YW5jZS5zcGVlZFRpbWVzLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgIC8vYXR0YWNrM+WKqOS9nOWGsuWIuuW8gOWni1xuICAgICAgICAgICAgaWYgKHBsYXllckFuaW1hdGlvblN0YXRlW3RoaXMuc2tlbGV0b24uYW5pbWF0aW9uXSA9PSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5hdHRhY2szKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldHggPSB0aGlzLnNrZWxldG9uLm5vZGUuc2NhbGVYID4gMCA/IFxuICAgICAgICAgICAgICAgIDgwMCpwbGF5ZXJIcC5pbnN0YW5jZS5zcGVlZFRpbWVzIDpcbiAgICAgICAgICAgICAgICAgLTgwMCpwbGF5ZXJIcC5pbnN0YW5jZS5zcGVlZFRpbWVzOy8v5L2N56e7XG4gICAgICAgICAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKG9mZnNldHgsIDApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0RhbWFnZUNvbGxpZGVyKGRhbWFnZUNvbGxpZGVyLmF0dGFjazMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vYXR0YWNrM+WKqOS9nOWGsuWIuue7k+adn1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZURhbWFnZUNvbGxpZGVyKCk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckFuaW1hdGlvblN0YXRlW3RoaXMuc2tlbGV0b24uYW5pbWF0aW9uXSA9PSBwbGF5ZXJBbmltYXRpb25TdGF0ZS5hdHRhY2szKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAwLjIvcGxheWVySHAuaW5zdGFuY2Uuc3BlZWRUaW1lcyk7XG4gICAgICAgIH0sIDAuMjQvcGxheWVySHAuaW5zdGFuY2Uuc3BlZWRUaW1lcyk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9qdW1wX3N0YXJ0KHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCBmYWxzZSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9kb3VibGVfanVtcChzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJEYW1waW5nID0gMTtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMSwgZmFsc2UpO1xuICAgIH1cbiAgICBlbnRlclN0YXRlRXZlbnRfanVtcF9kb3duKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnJpZ2lib2R5LmxpbmVhckRhbXBpbmcgPSAwO1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCBmYWxzZSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9qdW1wX2VuZChzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMSwgZmFsc2UpO1xuICAgIH1cbiAgICBlbnRlclN0YXRlRXZlbnRfanVtcF90b19tb3ZlKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCBmYWxzZSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9qdW1wX2F0dGFjazEoc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihwbGF5ZXJBbmltYXRpb25TdGF0ZVtzdGF0ZV0sIDEsIGZhbHNlKTtcbiAgICB9XG4gICAgZW50ZXJTdGF0ZUV2ZW50X2p1bXBfYXR0YWNrMihzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5zaG93RGFtYWdlQ29sbGlkZXIoZGFtYWdlQ29sbGlkZXIuanVtcEhpdCk7XG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihwbGF5ZXJBbmltYXRpb25TdGF0ZVtzdGF0ZV0sIDEuMypwbGF5ZXJIcC5pbnN0YW5jZS5zcGVlZFRpbWVzLCB0cnVlKTtcbiAgICB9XG4gICAgZW50ZXJTdGF0ZUV2ZW50X2p1bXBfYXR0YWNrMyhzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5yaWdpYm9keS5saW5lYXJWZWxvY2l0eSA9IGNjLnYyKDAsIDApO1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCBmYWxzZSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9yb2xsKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLjMsIGZhbHNlKTtcbiAgICB9XG4gICAgZW50ZXJTdGF0ZUV2ZW50X3JvbGxfYWlyKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCBmYWxzZSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9yb2xsX3RvX2lkbGUoc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5LnkpO1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCBmYWxzZSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9yb2xsX3RvX21vdmUoc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMucmlnaWJvZHkubGluZWFyVmVsb2NpdHkgPSBjYy52MigwLCB0aGlzLnJpZ2lib2R5LmxpbmVhclZlbG9jaXR5LnkpO1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLjEsIGZhbHNlKTtcbiAgICB9XG4gICAgZW50ZXJTdGF0ZUV2ZW50X3NraWxsMjAzX2FpcihzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMSpwbGF5ZXJIcC5pbnN0YW5jZS5zcGVlZFRpbWVzLCBmYWxzZSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9za2lsbDIwM19ncm91bmQoc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihwbGF5ZXJBbmltYXRpb25TdGF0ZVtzdGF0ZV0sIDEqcGxheWVySHAuaW5zdGFuY2Uuc3BlZWRUaW1lcywgZmFsc2UpO1xuICAgIH1cbiAgICBlbnRlclN0YXRlRXZlbnRfc2tpbGwyMDdfYWlyKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxKnBsYXllckhwLmluc3RhbmNlLnNwZWVkVGltZXMsIGZhbHNlKTtcbiAgICB9XG4gICAgZW50ZXJTdGF0ZUV2ZW50X3NraWxsMjA3X2dyb3VuZChzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMSpwbGF5ZXJIcC5pbnN0YW5jZS5zcGVlZFRpbWVzLCBmYWxzZSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9kaWUoc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihwbGF5ZXJBbmltYXRpb25TdGF0ZVtzdGF0ZV0sIDEsIGZhbHNlKTtcbiAgICB9XG4gICAgZW50ZXJTdGF0ZUV2ZW50X3Jldml2ZShzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMSwgZmFsc2UpO1xuICAgIH1cbiAgICBlbnRlclN0YXRlRXZlbnRfa25vY2tfdXAxKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCBmYWxzZSk7XG4gICAgfVxuICAgIGVudGVyU3RhdGVFdmVudF9rbm9ja191cDIoc3RhdGU6IHBsYXllckFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihwbGF5ZXJBbmltYXRpb25TdGF0ZVtzdGF0ZV0sIDEsIGZhbHNlKTtcbiAgICB9XG4gICAgZW50ZXJTdGF0ZUV2ZW50X2tub2NrX3VwMyhzdGF0ZTogcGxheWVyQW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHBsYXllckFuaW1hdGlvblN0YXRlW3N0YXRlXSwgMSwgZmFsc2UpO1xuICAgIH1cbiAgICBlbnRlclN0YXRlRXZlbnRfZ2V0X3VwKHN0YXRlOiBwbGF5ZXJBbmltYXRpb25TdGF0ZSkge1xuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24ocGxheWVyQW5pbWF0aW9uU3RhdGVbc3RhdGVdLCAxLCBmYWxzZSk7XG4gICAgfVxufVxuIl19