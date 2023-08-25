"use strict";
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