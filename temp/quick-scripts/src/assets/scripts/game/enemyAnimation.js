"use strict";
cc._RF.push(module, '1931dRGmupPKK6G9f0Yp5yl', 'enemyAnimation');
// scripts/game/enemyAnimation.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var animationState_1 = require("./animationState");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var enemyAnimation = /** @class */ (function (_super) {
    __extends(enemyAnimation, _super);
    function enemyAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyName = "";
        _this.state = animationState_1.enemyState.idle;
        _this.skeleton = null;
        _this.enemyController = null;
        //无法变更状态（只可强行改变）
        _this.lockState = [
            animationState_1.enemyState.knock_down,
            animationState_1.enemyState.knock_down1,
            animationState_1.enemyState.knock_down2,
            animationState_1.enemyState.get_up,
            animationState_1.enemyState.Get_up,
            animationState_1.enemyState["Get-up"],
            animationState_1.enemyState["Knock-up-start"],
            animationState_1.enemyState["Knock-up-loop"],
            animationState_1.enemyState["Knock-up-end"],
            animationState_1.enemyState.Knock_up1,
            animationState_1.enemyState.Knock_up2,
            animationState_1.enemyState.Knock_up3
        ];
        return _this;
    }
    enemyAnimation.prototype.onLoad = function () {
        this.skeleton = this.node.getComponent(sp.Skeleton);
        this.enemyName = this.enemyController.node.name;
    };
    enemyAnimation.prototype.start = function () {
        //this.debugAnimationName();
        this["setAnimationCompleteEvent_" + this.enemyController.node.name]();
    };
    enemyAnimation.prototype.changeState = function (state, timeScale, isLoop, isCompelChange, isMix) {
        if (isLoop === void 0) { isLoop = false; }
        if (isCompelChange === void 0) { isCompelChange = false; }
        if (isMix === void 0) { isMix = false; }
        if (this.lockState.includes(animationState_1.enemyState[this.skeleton.animation]) && isCompelChange == false)
            return;
        this.state = state;
        if (this.state != animationState_1.enemyState.attack && this.state != animationState_1.enemyState.Atk) {
            this.enemyController.hideDamageCollider();
        }
        this.playAnimation(this.getAnimationName(state), timeScale, isLoop, isMix);
    };
    enemyAnimation.prototype.playAnimation = function (animationName, timeScale, isLoop, isMix) {
        if (isLoop === void 0) { isLoop = false; }
        if (isMix === void 0) { isMix = false; }
        if (this.skeleton.findAnimation(animationName) == null) {
            return;
        }
        if (isMix) {
            this.skeleton.setMix(this.skeleton.animation, animationName, 0.1);
        }
        var tarckEntry = this.skeleton.setAnimation(0, animationName, isLoop);
        this.skeleton.timeScale = timeScale;
        this.setTrackEntryEnvet(tarckEntry, animationName);
    };
    enemyAnimation.prototype.getAnimationName = function (state) {
        return animationState_1.enemyState[state];
    };
    enemyAnimation.prototype.debugAnimationName = function () {
        //@ts-ignore
        for (var _i = 0, _a = this.skeleton.skeletonData._skeletonCache.animations; _i < _a.length; _i++) {
            var animation = _a[_i];
            console.log(animation.name);
        }
    };
    //设置帧事件
    enemyAnimation.prototype.setTrackEntryEnvet = function (trackEntry, animationName) {
        if (animationState_1.frameEvent_enemy[this.enemyName][animationName] == undefined)
            return;
        this.skeleton.setTrackEventListener(trackEntry, this.enemyController[animationState_1.frameEvent_enemy[this.enemyName][animationName]].bind(this.enemyController));
    };
    //----------------------以下为绑定动画播放完成监听事件---------------------
    enemyAnimation.prototype.setAnimationCompleteEvent_enemy1 = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.get_hurt1:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.get_hurt2:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.knock_down:
                    _this.enemyController.getUp();
                    break;
                case animationState_1.enemyState.get_up:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.attack:
                    _this.enemyController.idle();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_enemy2 = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.get_hurt1:
                    _this.enemyController.idle(false);
                    break;
                case animationState_1.enemyState.get_hurt2:
                    _this.enemyController.idle(false);
                    break;
                case animationState_1.enemyState.knock_down1:
                    _this.enemyController.knockDown2();
                    break;
                case animationState_1.enemyState.knock_down2:
                    _this.enemyController.getUp();
                    break;
                case animationState_1.enemyState.get_up:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.attack:
                    _this.enemyController.idle();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_ladyBug = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.Atk:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.Behit:
                    //this.enemyController.idle();
                    break;
                case animationState_1.enemyState["Die-start"]:
                    _this.enemyController.die_middle();
                    break;
                case animationState_1.enemyState.Die_end:
                    _this.enemyController.Destory();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_enemy29 = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.Atk:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.Hit:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState["Knock-up-start"]:
                    _this.enemyController.knockDownLoop();
                    break;
                case animationState_1.enemyState["Knock-up-loop"]:
                    _this.enemyController.knockDownEnd();
                    break;
                case animationState_1.enemyState["Knock-up-end"]:
                    _this.enemyController.getUp();
                    break;
                case animationState_1.enemyState["Get-up"]:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.Die:
                    _this.enemyController.head_middle();
                    break;
                case animationState_1.enemyState["Head-end"]:
                    _this.enemyController.Destroy();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_enemy10 = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.attack:
                    _this.enemyController.hitComplete();
                    break;
                case animationState_1.enemyState.skill2_start:
                    _this.enemyController.skill2Middle();
                    break;
                case animationState_1.enemyState.skill2_end:
                    _this.enemyController.skill2EndComplete();
                    break;
                case animationState_1.enemyState.skill1:
                    _this.enemyController.idle();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_bigSquid = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.Pre_Attack:
                    _this.enemyController.rush();
                    break;
                case animationState_1.enemyState.Die1:
                    _this.enemyController.die_middle();
                    break;
                case animationState_1.enemyState.Die3:
                    _this.enemyController.Destory();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_enemy39 = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.Born:
                    _this.enemyController.bornComplete();
                    break;
                case animationState_1.enemyState.Idle:
                    _this.enemyController.idleComplete();
                    break;
                case animationState_1.enemyState.Idle2:
                    _this.enemyController.idleComplete();
                    break;
                case animationState_1.enemyState.Idle3:
                    _this.enemyController.idleComplete();
                    break;
                case animationState_1.enemyState.Jump_Back:
                    _this.enemyController.attackComplete();
                    break;
                case animationState_1.enemyState.Jump_FWD:
                    _this.enemyController.attackComplete();
                    break;
                case animationState_1.enemyState.Scratch:
                    _this.enemyController.attackComplete();
                    break;
                case animationState_1.enemyState.Above1:
                    _this.enemyController.above1Complete();
                    break;
                case animationState_1.enemyState.Above2:
                    _this.enemyController.above2Complete();
                    break;
                case animationState_1.enemyState.Die3:
                    _this.enemyController.Destory();
                    break;
                case animationState_1.enemyState.Staggered:
                    _this.enemyController.StaggeredReset();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_spiderling = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.Fall:
                    _this.enemyController.born();
                    break;
                case animationState_1.enemyState.Born:
                    _this.enemyController.bornComplete();
                    break;
                case animationState_1.enemyState.Knock_up1:
                    _this.enemyController.Knock_up2();
                    break;
                case animationState_1.enemyState.Knock_up2:
                    _this.enemyController.Knock_up3();
                    break;
                case animationState_1.enemyState.Knock_up3:
                    _this.enemyController.getUp();
                    break;
                case animationState_1.enemyState.Get_Hit:
                    if (_this.state != animationState_1.enemyState.Get_Hit)
                        return;
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.Get_up:
                    _this.enemyController.idle();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_shader = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.Atk:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState["Skill-Start"]:
                    _this.enemyController.closeCollider();
                    break;
                case animationState_1.enemyState["Skill-Middle"]:
                    _this.enemyController.closeCollider();
                    break;
                case animationState_1.enemyState["Skill-End"]:
                    _this.enemyController.idle();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_enemy20 = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.get_hurt1:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.get_hurt2:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.knock_down1:
                    _this.enemyController.knockDown2();
                    break;
                case animationState_1.enemyState.get_up:
                    _this.enemyController.idle();
                    _this.scheduleOnce(function () {
                        if (_this.state != animationState_1.enemyState.idle)
                            return;
                        _this.enemyController.skill_start();
                    }, 0.5);
                    break;
                case animationState_1.enemyState.fire_pillar:
                    _this.enemyController.skill_middle();
                    break;
                case animationState_1.enemyState.fire_pillar3:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.teleport:
                    _this.enemyController.idle();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_enemy18 = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.Atk:
                    _this.enemyController.idle();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_miniBoss = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.appear:
                    _this.enemyController.appearFinished();
                    break;
                case animationState_1.enemyState.blink_start:
                    _this.enemyController.binkStartCompelete();
                    break;
                case animationState_1.enemyState.blink_end:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.storm_burst:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.thunder_jolt:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.lighting_chase_start:
                    _this.enemyController.lighting_chase_middle();
                    break;
                case animationState_1.enemyState.lighting_chase_end:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.call_of_lighting:
                    _this.enemyController.idle();
                    break;
                case animationState_1.enemyState.laugh:
                    _this.enemyController.idle();
                    break;
            }
        });
    };
    enemyAnimation.prototype.setAnimationCompleteEvent_miniBossFlag = function () {
        var _this = this;
        this.skeleton.setCompleteListener(function () {
            var name = animationState_1.enemyState[_this.skeleton.animation];
            switch (name) {
                case animationState_1.enemyState.appear:
                    _this.enemyController.appearFinished();
                    break;
                case animationState_1.enemyState.die:
                    _this.enemyController.dieEnd();
                    break;
            }
        });
    };
    enemyAnimation = __decorate([
        ccclass
    ], enemyAnimation);
    return enemyAnimation;
}(cc.Component));
exports.default = enemyAnimation;

cc._RF.pop();