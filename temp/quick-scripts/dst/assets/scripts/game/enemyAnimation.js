
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/enemyAnimation.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZW5lbXlBbmltYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsbURBQWdFO0FBRTFELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBd1hDO1FBdFhHLGVBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsV0FBSyxHQUFlLDJCQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3BDLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLHFCQUFlLEdBQVEsSUFBSSxDQUFDO1FBRTVCLGdCQUFnQjtRQUNoQixlQUFTLEdBQXNCO1lBQzNCLDJCQUFVLENBQUMsVUFBVTtZQUNyQiwyQkFBVSxDQUFDLFdBQVc7WUFDdEIsMkJBQVUsQ0FBQyxXQUFXO1lBQ3RCLDJCQUFVLENBQUMsTUFBTTtZQUNqQiwyQkFBVSxDQUFDLE1BQU07WUFDakIsMkJBQVUsQ0FBQyxRQUFRLENBQUM7WUFDcEIsMkJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM1QiwyQkFBVSxDQUFDLGVBQWUsQ0FBQztZQUMzQiwyQkFBVSxDQUFDLGNBQWMsQ0FBQztZQUMxQiwyQkFBVSxDQUFDLFNBQVM7WUFDcEIsMkJBQVUsQ0FBQyxTQUFTO1lBQ3BCLDJCQUFVLENBQUMsU0FBUztTQUN2QixDQUFDOztJQW1XTixDQUFDO0lBbFdHLCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsU0FBUyxHQUFH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LEVBQUUsQ0FBQztvQkFDNUIsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsK0RBQXNDLEdBQXRDO1FBQUEsaUJBWUM7UUFYRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDO1lBQzlCLElBQUksSUFBSSxHQUFHLDJCQUFVLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQyxRQUFRLElBQUksRUFBRTtnQkFDVixLQUFLLDJCQUFVLENBQUMsTUFBTTtvQkFDbEIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdEMsTUFBTTtnQkFDVixLQUFLLDJCQUFVLENBQUMsR0FBRztvQkFDZixLQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM5QixNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2WGdCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0F3WGxDO0lBQUQscUJBQUM7Q0F4WEQsQUF3WEMsQ0F4WDJDLEVBQUUsQ0FBQyxTQUFTLEdBd1h2RDtrQkF4WG9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgZW5lbXlTdGF0ZSwgZnJhbWVFdmVudF9lbmVteSB9IGZyb20gXCIuL2FuaW1hdGlvblN0YXRlXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBlbmVteUFuaW1hdGlvbiBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBlbmVteU5hbWU6IHN0cmluZyA9IFwiXCI7XG4gICAgc3RhdGU6IGVuZW15U3RhdGUgPSBlbmVteVN0YXRlLmlkbGU7XG4gICAgc2tlbGV0b246IHNwLlNrZWxldG9uID0gbnVsbDtcbiAgICBlbmVteUNvbnRyb2xsZXI6IGFueSA9IG51bGw7XG5cbiAgICAvL+aXoOazleWPmOabtOeKtuaAge+8iOWPquWPr+W8uuihjOaUueWPmO+8iVxuICAgIGxvY2tTdGF0ZTogQXJyYXk8ZW5lbXlTdGF0ZT4gPSBbXG4gICAgICAgIGVuZW15U3RhdGUua25vY2tfZG93bixcbiAgICAgICAgZW5lbXlTdGF0ZS5rbm9ja19kb3duMSxcbiAgICAgICAgZW5lbXlTdGF0ZS5rbm9ja19kb3duMixcbiAgICAgICAgZW5lbXlTdGF0ZS5nZXRfdXAsXG4gICAgICAgIGVuZW15U3RhdGUuR2V0X3VwLFxuICAgICAgICBlbmVteVN0YXRlW1wiR2V0LXVwXCJdLFxuICAgICAgICBlbmVteVN0YXRlW1wiS25vY2stdXAtc3RhcnRcIl0sXG4gICAgICAgIGVuZW15U3RhdGVbXCJLbm9jay11cC1sb29wXCJdLFxuICAgICAgICBlbmVteVN0YXRlW1wiS25vY2stdXAtZW5kXCJdLFxuICAgICAgICBlbmVteVN0YXRlLktub2NrX3VwMSxcbiAgICAgICAgZW5lbXlTdGF0ZS5Lbm9ja191cDIsXG4gICAgICAgIGVuZW15U3RhdGUuS25vY2tfdXAzXG4gICAgXTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKTtcbiAgICAgICAgdGhpcy5lbmVteU5hbWUgPSB0aGlzLmVuZW15Q29udHJvbGxlci5ub2RlLm5hbWU7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vdGhpcy5kZWJ1Z0FuaW1hdGlvbk5hbWUoKTtcbiAgICAgICAgdGhpc1tcInNldEFuaW1hdGlvbkNvbXBsZXRlRXZlbnRfXCIgKyB0aGlzLmVuZW15Q29udHJvbGxlci5ub2RlLm5hbWVdKCk7XG4gICAgfVxuICAgIGNoYW5nZVN0YXRlKHN0YXRlOiBlbmVteVN0YXRlLCB0aW1lU2NhbGUsIGlzTG9vcDogYm9vbGVhbiA9IGZhbHNlLCBpc0NvbXBlbENoYW5nZTogYm9vbGVhbiA9IGZhbHNlLCBpc01peDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2tTdGF0ZS5pbmNsdWRlcyhlbmVteVN0YXRlW3RoaXMuc2tlbGV0b24uYW5pbWF0aW9uXSkgJiYgaXNDb21wZWxDaGFuZ2UgPT0gZmFsc2UpIHJldHVybjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSAhPSBlbmVteVN0YXRlLmF0dGFjayAmJiB0aGlzLnN0YXRlICE9IGVuZW15U3RhdGUuQXRrKSB7XG4gICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5oaWRlRGFtYWdlQ29sbGlkZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24odGhpcy5nZXRBbmltYXRpb25OYW1lKHN0YXRlKSwgdGltZVNjYWxlLCBpc0xvb3AsIGlzTWl4KTtcbiAgICB9XG4gICAgcGxheUFuaW1hdGlvbihhbmltYXRpb25OYW1lOiBzdHJpbmcsIHRpbWVTY2FsZSwgaXNMb29wOiBib29sZWFuID0gZmFsc2UsIGlzTWl4OiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuc2tlbGV0b24uZmluZEFuaW1hdGlvbihhbmltYXRpb25OYW1lKSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTWl4KSB7XG4gICAgICAgICAgICB0aGlzLnNrZWxldG9uLnNldE1peCh0aGlzLnNrZWxldG9uLmFuaW1hdGlvbiwgYW5pbWF0aW9uTmFtZSwgMC4xKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdGFyY2tFbnRyeSA9IHRoaXMuc2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsIGFuaW1hdGlvbk5hbWUsIGlzTG9vcClcbiAgICAgICAgdGhpcy5za2VsZXRvbi50aW1lU2NhbGUgPSB0aW1lU2NhbGU7XG4gICAgICAgIHRoaXMuc2V0VHJhY2tFbnRyeUVudmV0KHRhcmNrRW50cnksIGFuaW1hdGlvbk5hbWUpO1xuICAgIH1cbiAgICBnZXRBbmltYXRpb25OYW1lKHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBlbmVteVN0YXRlW3N0YXRlXTtcbiAgICB9XG4gICAgZGVidWdBbmltYXRpb25OYW1lKCkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgZm9yIChsZXQgYW5pbWF0aW9uIG9mIHRoaXMuc2tlbGV0b24uc2tlbGV0b25EYXRhLl9za2VsZXRvbkNhY2hlLmFuaW1hdGlvbnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFuaW1hdGlvbi5uYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL+iuvue9ruW4p+S6i+S7tlxuICAgIHNldFRyYWNrRW50cnlFbnZldCh0cmFja0VudHJ5OiBhbnksIGFuaW1hdGlvbk5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAoZnJhbWVFdmVudF9lbmVteVt0aGlzLmVuZW15TmFtZV1bYW5pbWF0aW9uTmFtZV0gPT0gdW5kZWZpbmVkKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2tlbGV0b24uc2V0VHJhY2tFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgdHJhY2tFbnRyeSxcbiAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyW2ZyYW1lRXZlbnRfZW5lbXlbdGhpcy5lbmVteU5hbWVdW2FuaW1hdGlvbk5hbWVdXS5iaW5kKHRoaXMuZW5lbXlDb250cm9sbGVyKSlcbiAgICB9XG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5Lul5LiL5Li657uR5a6a5Yqo55S75pKt5pS+5a6M5oiQ55uR5ZCs5LqL5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgc2V0QW5pbWF0aW9uQ29tcGxldGVFdmVudF9lbmVteTEoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGVuZW15U3RhdGVbdGhpcy5za2VsZXRvbi5hbmltYXRpb25dO1xuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLmdldF9odXJ0MTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuZ2V0X2h1cnQyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5rbm9ja19kb3duOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5nZXRVcCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuZ2V0X3VwOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5hdHRhY2s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRBbmltYXRpb25Db21wbGV0ZUV2ZW50X2VuZW15MigpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZW5lbXlTdGF0ZVt0aGlzLnNrZWxldG9uLmFuaW1hdGlvbl07XG4gICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuZ2V0X2h1cnQxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLmdldF9odXJ0MjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5rbm9ja19kb3duMTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIua25vY2tEb3duMigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUua25vY2tfZG93bjI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmdldFVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5nZXRfdXA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLmF0dGFjazpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldEFuaW1hdGlvbkNvbXBsZXRlRXZlbnRfbGFkeUJ1ZygpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZW5lbXlTdGF0ZVt0aGlzLnNrZWxldG9uLmFuaW1hdGlvbl07XG4gICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuQXRrOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5CZWhpdDpcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZVtcIkRpZS1zdGFydFwiXTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuZGllX21pZGRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuRGllX2VuZDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuRGVzdG9yeSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldEFuaW1hdGlvbkNvbXBsZXRlRXZlbnRfZW5lbXkyOSgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZW5lbXlTdGF0ZVt0aGlzLnNrZWxldG9uLmFuaW1hdGlvbl07XG4gICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuQXRrOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5IaXQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlW1wiS25vY2stdXAtc3RhcnRcIl06XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmtub2NrRG93bkxvb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlW1wiS25vY2stdXAtbG9vcFwiXTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIua25vY2tEb3duRW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZVtcIktub2NrLXVwLWVuZFwiXTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuZ2V0VXAoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlW1wiR2V0LXVwXCJdOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5EaWU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmhlYWRfbWlkZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZVtcIkhlYWQtZW5kXCJdOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5EZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0QW5pbWF0aW9uQ29tcGxldGVFdmVudF9lbmVteTEwKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbmVteVN0YXRlW3RoaXMuc2tlbGV0b24uYW5pbWF0aW9uXTtcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5hdHRhY2s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmhpdENvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5za2lsbDJfc3RhcnQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLnNraWxsMk1pZGRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuc2tpbGwyX2VuZDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuc2tpbGwyRW5kQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLnNraWxsMTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldEFuaW1hdGlvbkNvbXBsZXRlRXZlbnRfYmlnU3F1aWQoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGVuZW15U3RhdGVbdGhpcy5za2VsZXRvbi5hbmltYXRpb25dO1xuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLlByZV9BdHRhY2s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLnJ1c2goKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLkRpZTE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmRpZV9taWRkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLkRpZTM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLkRlc3RvcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRBbmltYXRpb25Db21wbGV0ZUV2ZW50X2VuZW15MzkoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGVuZW15U3RhdGVbdGhpcy5za2VsZXRvbi5hbmltYXRpb25dO1xuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLkJvcm46XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmJvcm5Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuSWRsZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZUNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5JZGxlMjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZUNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5JZGxlMzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZUNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5KdW1wX0JhY2s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmF0dGFja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5KdW1wX0ZXRDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuYXR0YWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLlNjcmF0Y2g6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmF0dGFja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5BYm92ZTE6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmFib3ZlMUNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5BYm92ZTI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmFib3ZlMkNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5EaWUzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5EZXN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5TdGFnZ2VyZWQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLlN0YWdnZXJlZFJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0QW5pbWF0aW9uQ29tcGxldGVFdmVudF9zcGlkZXJsaW5nKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbmVteVN0YXRlW3RoaXMuc2tlbGV0b24uYW5pbWF0aW9uXTtcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5GYWxsOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5ib3JuKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5Cb3JuOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5ib3JuQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLktub2NrX3VwMTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuS25vY2tfdXAyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5Lbm9ja191cDI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLktub2NrX3VwMygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuS25vY2tfdXAzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5nZXRVcCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuR2V0X0hpdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT0gZW5lbXlTdGF0ZS5HZXRfSGl0KSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLkdldF91cDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldEFuaW1hdGlvbkNvbXBsZXRlRXZlbnRfc2hhZGVyKCkge1xuICAgICAgICB0aGlzLnNrZWxldG9uLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbmVteVN0YXRlW3RoaXMuc2tlbGV0b24uYW5pbWF0aW9uXTtcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5BdGs6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlW1wiU2tpbGwtU3RhcnRcIl06XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmNsb3NlQ29sbGlkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlW1wiU2tpbGwtTWlkZGxlXCJdOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5jbG9zZUNvbGxpZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZVtcIlNraWxsLUVuZFwiXTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldEFuaW1hdGlvbkNvbXBsZXRlRXZlbnRfZW5lbXkyMCgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZW5lbXlTdGF0ZVt0aGlzLnNrZWxldG9uLmFuaW1hdGlvbl07XG4gICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuZ2V0X2h1cnQxOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5nZXRfaHVydDI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLmtub2NrX2Rvd24xOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5rbm9ja0Rvd24yKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5nZXRfdXA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgIT0gZW5lbXlTdGF0ZS5pZGxlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5za2lsbF9zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwLjUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuZmlyZV9waWxsYXI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLnNraWxsX21pZGRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuZmlyZV9waWxsYXIzOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS50ZWxlcG9ydDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldEFuaW1hdGlvbkNvbXBsZXRlRXZlbnRfZW5lbXkxOCgpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZW5lbXlTdGF0ZVt0aGlzLnNrZWxldG9uLmFuaW1hdGlvbl07XG4gICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuQXRrOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0QW5pbWF0aW9uQ29tcGxldGVFdmVudF9taW5pQm9zcygpIHtcbiAgICAgICAgdGhpcy5za2VsZXRvbi5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZW5lbXlTdGF0ZVt0aGlzLnNrZWxldG9uLmFuaW1hdGlvbl07XG4gICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuYXBwZWFyOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5hcHBlYXJGaW5pc2hlZCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuYmxpbmtfc3RhcnQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmJpbmtTdGFydENvbXBlbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUuYmxpbmtfZW5kOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5zdG9ybV9idXJzdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuaWRsZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGVuZW15U3RhdGUudGh1bmRlcl9qb2x0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5saWdodGluZ19jaGFzZV9zdGFydDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIubGlnaHRpbmdfY2hhc2VfbWlkZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZW5lbXlTdGF0ZS5saWdodGluZ19jaGFzZV9lbmQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLmNhbGxfb2ZfbGlnaHRpbmc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5lbXlDb250cm9sbGVyLmlkbGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLmxhdWdoOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZW15Q29udHJvbGxlci5pZGxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0QW5pbWF0aW9uQ29tcGxldGVFdmVudF9taW5pQm9zc0ZsYWcoKSB7XG4gICAgICAgIHRoaXMuc2tlbGV0b24uc2V0Q29tcGxldGVMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGVuZW15U3RhdGVbdGhpcy5za2VsZXRvbi5hbmltYXRpb25dO1xuICAgICAgICAgICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLmFwcGVhcjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuYXBwZWFyRmluaXNoZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBlbmVteVN0YXRlLmRpZTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmVteUNvbnRyb2xsZXIuZGllRW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=