
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/animationState.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b2b6dv65NlEX59AqpnS1KOt', 'animationState');
// scripts/game/animationState.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enemyState = exports.enemyScript = exports.attackType = exports.skillFrameEventTime = exports.frameEvent_enemy = exports.frameEvent = exports.enemyName = exports.playerAnimationState = void 0;
var playerAnimationState;
(function (playerAnimationState) {
    playerAnimationState[playerAnimationState["appear"] = 0] = "appear";
    playerAnimationState[playerAnimationState["attack1"] = 1] = "attack1";
    playerAnimationState[playerAnimationState["attack2"] = 2] = "attack2";
    playerAnimationState[playerAnimationState["attack3"] = 3] = "attack3";
    playerAnimationState[playerAnimationState["bow_attack"] = 4] = "bow_attack";
    playerAnimationState[playerAnimationState["bow_attack_fast"] = 5] = "bow_attack_fast";
    playerAnimationState[playerAnimationState["bow_attack_to_idle"] = 6] = "bow_attack_to_idle";
    playerAnimationState[playerAnimationState["dash_air"] = 7] = "dash_air";
    playerAnimationState[playerAnimationState["die"] = 8] = "die";
    playerAnimationState[playerAnimationState["double_jump"] = 9] = "double_jump";
    playerAnimationState[playerAnimationState["get_hurt"] = 10] = "get_hurt";
    playerAnimationState[playerAnimationState["get_up"] = 11] = "get_up";
    playerAnimationState[playerAnimationState["idle"] = 12] = "idle";
    playerAnimationState[playerAnimationState["idle_to_move"] = 13] = "idle_to_move";
    playerAnimationState[playerAnimationState["jump_attack1"] = 14] = "jump_attack1";
    playerAnimationState[playerAnimationState["jump_attack2"] = 15] = "jump_attack2";
    playerAnimationState[playerAnimationState["jump_attack3"] = 16] = "jump_attack3";
    playerAnimationState[playerAnimationState["jump_attack4"] = 17] = "jump_attack4";
    playerAnimationState[playerAnimationState["jump_demo"] = 18] = "jump_demo";
    playerAnimationState[playerAnimationState["jump_down"] = 19] = "jump_down";
    playerAnimationState[playerAnimationState["jump_end"] = 20] = "jump_end";
    playerAnimationState[playerAnimationState["jump_start"] = 21] = "jump_start";
    playerAnimationState[playerAnimationState["jump_to_move"] = 22] = "jump_to_move";
    playerAnimationState[playerAnimationState["knock_up1"] = 23] = "knock_up1";
    playerAnimationState[playerAnimationState["knock_up2"] = 24] = "knock_up2";
    playerAnimationState[playerAnimationState["knock_up3"] = 25] = "knock_up3";
    playerAnimationState[playerAnimationState["move"] = 26] = "move";
    playerAnimationState[playerAnimationState["move1"] = 27] = "move1";
    playerAnimationState[playerAnimationState["move2"] = 28] = "move2";
    playerAnimationState[playerAnimationState["pose_shadow"] = 29] = "pose_shadow";
    playerAnimationState[playerAnimationState["revive"] = 30] = "revive";
    playerAnimationState[playerAnimationState["roll"] = 31] = "roll";
    playerAnimationState[playerAnimationState["roll_air"] = 32] = "roll_air";
    playerAnimationState[playerAnimationState["roll_to_idle"] = 33] = "roll_to_idle";
    playerAnimationState[playerAnimationState["roll_to_move"] = 34] = "roll_to_move";
    playerAnimationState[playerAnimationState["skill203_air"] = 35] = "skill203_air";
    playerAnimationState[playerAnimationState["skill203_ground"] = 36] = "skill203_ground";
    playerAnimationState[playerAnimationState["skill203_old"] = 37] = "skill203_old";
    playerAnimationState[playerAnimationState["skill207_air"] = 38] = "skill207_air";
    playerAnimationState[playerAnimationState["skill207_ground"] = 39] = "skill207_ground";
    playerAnimationState[playerAnimationState["ultimate"] = 40] = "ultimate"; //大招
})(playerAnimationState = exports.playerAnimationState || (exports.playerAnimationState = {}));
var enemyName;
(function (enemyName) {
    enemyName["enemy1"] = "enemy1";
    enemyName["enemy2"] = "enemy2";
    enemyName["enemy29"] = "enemy29";
    enemyName["enemy10"] = "enemy10";
    enemyName["ladyBug"] = "ladyBug";
    enemyName["bigSquid"] = "bigSquid";
    enemyName["enemy39"] = "enemy39";
    enemyName["spiderling"] = "spiderling";
    enemyName["shader"] = "shader";
    enemyName["enemy20"] = "enemy20";
    enemyName["enemy18"] = "enemy18";
    enemyName["miniBoss"] = "miniBoss";
    enemyName["miniBossFlag"] = "miniBossFlag"; //雷电法王招雷旗
})(enemyName = exports.enemyName || (exports.enemyName = {}));
//玩家帧事件 nail为未绑定状态
var frameEvent;
(function (frameEvent) {
    frameEvent["nail1"] = "AddForceUp";
    frameEvent["nail2"] = "AnimationEnd";
    frameEvent["attack1"] = "Attack1";
    frameEvent["attack2"] = "Attack2";
    frameEvent["attack3"] = "Attack3";
    frameEvent["move"] = "FootStep";
    frameEvent["get_up"] = "GetUp";
    frameEvent["nail6"] = "LockDirection";
    frameEvent["nail7"] = "MoveForward";
    frameEvent["nail8"] = "RollComplete";
    frameEvent["skill203_air"] = "SkillComplete";
    frameEvent["skill203_ground"] = "SkillComplete";
    frameEvent["skill207_air"] = "SkillComplete";
    frameEvent["skill207_ground"] = "SkillComplete";
    frameEvent["nail10"] = "StopMove";
})(frameEvent = exports.frameEvent || (exports.frameEvent = {}));
//怪物帧事件（怪物名-动画名-帧事件方法名）
exports.frameEvent_enemy = {
    "enemy1": {},
    "enemy2": {
        "attack": "shootArrow"
    },
    "enemy29": {},
    "ladyBug": {
        "Atk": "fire"
    },
    "enemy10": {
        "skill2_start": "footStep",
        "skill2_middle": "footStep",
        "skill1": "frameEvent_skill1"
    },
    "bigSquid": {},
    "enemy39": {
        "Move": "footStep"
    },
    "spiderling": {
        "Fall": "attack_fall"
    },
    "shader": {},
    "enemy20": {
        "teleport": "blink"
    },
    "enemy18": {
        "Atk": "Shake"
    },
    "miniBoss": {},
    "miniBossFlag": {}
};
//玩家触发技能的帧时间
exports.skillFrameEventTime = {
    skill203_air: 0.5,
    skill203_ground: 0.48,
    skill207_air: 0.43,
    skill207_ground: 0.43,
    attack1: 0.123,
    attack2: 0.23
};
//玩家伤害类型
var attackType;
(function (attackType) {
    attackType[attackType["attack1"] = 0] = "attack1";
    attackType[attackType["attack2"] = 1] = "attack2";
    attackType[attackType["attack3"] = 2] = "attack3";
    attackType[attackType["jumpHit"] = 3] = "jumpHit";
    attackType[attackType["shuriken"] = 4] = "shuriken";
    attackType[attackType["swordRain"] = 5] = "swordRain";
})(attackType = exports.attackType || (exports.attackType = {}));
//怪物名对应的控制脚本名（玩家攻击判定时获取怪物脚本组件）
exports.enemyScript = {
    "enemy1": "E1controller",
    "enemy2": "E2controller",
    "ladyBug": "ladyBug",
    "enemy29": "E29controller",
    "enemy10": "E10controller",
    "bigSquid": "bigSquidController",
    "enemy39": "E39controller",
    "spiderling": "spiderlingController",
    "shader": "shaderController",
    "enemy20": "E20controller",
    "enemy18": "E18controller",
    "miniBoss": "miniBossController",
    "miniBossFlag": "miniBossFlag"
};
//enemy状态
var enemyState;
(function (enemyState) {
    enemyState[enemyState["attack"] = 0] = "attack";
    enemyState[enemyState["get_hurt1"] = 1] = "get_hurt1";
    enemyState[enemyState["get_hurt2"] = 2] = "get_hurt2";
    enemyState[enemyState["get_up"] = 3] = "get_up";
    enemyState[enemyState["idle"] = 4] = "idle";
    enemyState[enemyState["knock_down"] = 5] = "knock_down";
    enemyState[enemyState["move"] = 6] = "move";
    enemyState[enemyState["move2"] = 7] = "move2";
    enemyState[enemyState["run"] = 8] = "run";
    //attack,  //E2----------弓箭手
    //get_hurt1,
    //get_hurt2,
    //get_up,
    //idle,
    enemyState[enemyState["knock_down1"] = 9] = "knock_down1";
    enemyState[enemyState["knock_down2"] = 10] = "knock_down2";
    //move
    enemyState[enemyState["Atk"] = 11] = "Atk";
    enemyState[enemyState["Behit"] = 12] = "Behit";
    enemyState[enemyState["Idle"] = 13] = "Idle";
    enemyState[enemyState["Die-middle"] = 14] = "Die-middle";
    enemyState[enemyState["Die-start"] = 15] = "Die-start";
    enemyState[enemyState["Die_end"] = 16] = "Die_end";
    //Atk,   //E29----------匕首怪
    enemyState[enemyState["Die"] = 17] = "Die";
    enemyState[enemyState["Get-up"] = 18] = "Get-up";
    enemyState[enemyState["Head-end"] = 19] = "Head-end";
    enemyState[enemyState["Head-middle"] = 20] = "Head-middle";
    enemyState[enemyState["Hit"] = 21] = "Hit";
    //Idle,
    enemyState[enemyState["Knock-up-end"] = 22] = "Knock-up-end";
    enemyState[enemyState["Knock-up-loop"] = 23] = "Knock-up-loop";
    enemyState[enemyState["Knock-up-start"] = 24] = "Knock-up-start";
    enemyState[enemyState["Move"] = 25] = "Move";
    //attack,  掌击 //E10-------------胖子boss
    enemyState[enemyState["die"] = 26] = "die";
    enemyState[enemyState["get_hurt"] = 27] = "get_hurt";
    //idle,
    //move,
    enemyState[enemyState["skill1"] = 28] = "skill1";
    enemyState[enemyState["skill2_end"] = 29] = "skill2_end";
    enemyState[enemyState["skill2_middle"] = 30] = "skill2_middle";
    enemyState[enemyState["skill2_start"] = 31] = "skill2_start";
    enemyState[enemyState["Attack"] = 32] = "Attack";
    enemyState[enemyState["Attack_End"] = 33] = "Attack_End";
    enemyState[enemyState["Die1"] = 34] = "Die1";
    enemyState[enemyState["Die2"] = 35] = "Die2";
    enemyState[enemyState["Die3"] = 36] = "Die3";
    //Idle,
    //Move,
    enemyState[enemyState["Pre_Attack"] = 37] = "Pre_Attack";
    //get_hurt1
    enemyState[enemyState["Above1"] = 38] = "Above1";
    enemyState[enemyState["Above2"] = 39] = "Above2";
    enemyState[enemyState["Born"] = 40] = "Born";
    //Die,
    enemyState[enemyState["Get_Hit"] = 41] = "Get_Hit";
    //Idle,  
    enemyState[enemyState["Idle2"] = 42] = "Idle2";
    enemyState[enemyState["Idle3"] = 43] = "Idle3";
    enemyState[enemyState["Jump_Back"] = 44] = "Jump_Back";
    enemyState[enemyState["Jump_FWD"] = 45] = "Jump_FWD";
    //Move,
    enemyState[enemyState["Scratch"] = 46] = "Scratch";
    enemyState[enemyState["Staggered"] = 47] = "Staggered";
    enemyState[enemyState["StaggeredReset"] = 48] = "StaggeredReset";
    //Attack,  //spiderling-----------小蜘蛛
    //Born,
    //Die,
    enemyState[enemyState["Fall"] = 49] = "Fall";
    //Get_Hit,
    enemyState[enemyState["Get_up"] = 50] = "Get_up";
    //Idle,
    enemyState[enemyState["Knock_up1"] = 51] = "Knock_up1";
    enemyState[enemyState["Knock_up2"] = 52] = "Knock_up2";
    enemyState[enemyState["Knock_up3"] = 53] = "Knock_up3";
    //Move,
    enemyState[enemyState["Stop"] = 54] = "Stop";
    enemyState[enemyState["Warning"] = 55] = "Warning";
    //Atk,  //shader----------------卡赞
    //Behit,
    //Die,
    //Idle,
    enemyState[enemyState["Skill-End"] = 56] = "Skill-End";
    enemyState[enemyState["Skill-Middle"] = 57] = "Skill-Middle";
    enemyState[enemyState["Skill-Start"] = 58] = "Skill-Start";
    enemyState[enemyState["fire_pillar"] = 59] = "fire_pillar";
    enemyState[enemyState["fire_pillar2"] = 60] = "fire_pillar2";
    enemyState[enemyState["fire_pillar3"] = 61] = "fire_pillar3";
    //get_hurt1,
    //get_hurt2,
    //get_up,
    //idle,
    //knock_down1,
    //knock_down2,
    //move,
    enemyState[enemyState["teleport"] = 62] = "teleport";
    //Atk,   //enemy18--------------棒槌怪
    //Behit,
    //Idle,
    //Move,
    enemyState[enemyState["appear"] = 63] = "appear";
    enemyState[enemyState["blink_end"] = 64] = "blink_end";
    enemyState[enemyState["blink_start"] = 65] = "blink_start";
    enemyState[enemyState["call_of_lighting"] = 66] = "call_of_lighting";
    //die,
    //get_hurt,
    //idle,
    enemyState[enemyState["laugh"] = 67] = "laugh";
    enemyState[enemyState["lighting_chase_end"] = 68] = "lighting_chase_end";
    enemyState[enemyState["lighting_chase_middle"] = 69] = "lighting_chase_middle";
    enemyState[enemyState["lighting_chase_start"] = 70] = "lighting_chase_start";
    //move,
    enemyState[enemyState["staggered_end"] = 71] = "staggered_end";
    enemyState[enemyState["staggered_middle"] = 72] = "staggered_middle";
    enemyState[enemyState["staggered_start"] = 73] = "staggered_start";
    enemyState[enemyState["storm_burst"] = 74] = "storm_burst";
    enemyState[enemyState["thunder_jolt"] = 75] = "thunder_jolt";
    enemyState[enemyState["appear2"] = 76] = "appear2";
    enemyState[enemyState["warning"] = 77] = "warning";
    //die,
    //idle
})(enemyState = exports.enemyState || (exports.enemyState = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcYW5pbWF0aW9uU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBWSxvQkEwQ1g7QUExQ0QsV0FBWSxvQkFBb0I7SUFDNUIsbUVBQU0sQ0FBQTtJQUNOLHFFQUFPLENBQUE7SUFDUCxxRUFBTyxDQUFBO0lBQ1AscUVBQU8sQ0FBQTtJQUNQLDJFQUFVLENBQUE7SUFDVixxRkFBZSxDQUFBO0lBQ2YsMkZBQWtCLENBQUE7SUFDbEIsdUVBQVEsQ0FBQTtJQUNSLDZEQUFHLENBQUE7SUFDSCw2RUFBVyxDQUFBO0lBQ1gsd0VBQVEsQ0FBQTtJQUNSLG9FQUFNLENBQUE7SUFDTixnRUFBSSxDQUFBO0lBQ0osZ0ZBQVksQ0FBQTtJQUNaLGdGQUFZLENBQUE7SUFDWixnRkFBWSxDQUFBO0lBQ1osZ0ZBQVksQ0FBQTtJQUNaLGdGQUFZLENBQUE7SUFDWiwwRUFBUyxDQUFBO0lBQ1QsMEVBQVMsQ0FBQTtJQUNULHdFQUFRLENBQUE7SUFDUiw0RUFBVSxDQUFBO0lBQ1YsZ0ZBQVksQ0FBQTtJQUNaLDBFQUFTLENBQUE7SUFDVCwwRUFBUyxDQUFBO0lBQ1QsMEVBQVMsQ0FBQTtJQUNULGdFQUFJLENBQUE7SUFDSixrRUFBSyxDQUFBO0lBQ0wsa0VBQUssQ0FBQTtJQUNMLDhFQUFXLENBQUE7SUFDWCxvRUFBTSxDQUFBO0lBQ04sZ0VBQUksQ0FBQTtJQUNKLHdFQUFRLENBQUE7SUFDUixnRkFBWSxDQUFBO0lBQ1osZ0ZBQVksQ0FBQTtJQUNaLGdGQUFZLENBQUE7SUFDWixzRkFBZSxDQUFBO0lBQ2YsZ0ZBQVksQ0FBQTtJQUNaLGdGQUFZLENBQUE7SUFDWixzRkFBZSxDQUFBO0lBQ2Ysd0VBQVEsQ0FBQSxDQUFBLElBQUk7QUFDaEIsQ0FBQyxFQTFDVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQTBDL0I7QUFDRCxJQUFZLFNBY1g7QUFkRCxXQUFZLFNBQVM7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QUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQXVJckIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWluaUJvc3MgZnJvbSBcIi4vbWluaUJvc3NGbGFnXCJcblxuZXhwb3J0IGVudW0gcGxheWVyQW5pbWF0aW9uU3RhdGV7XG4gICAgYXBwZWFyLC8v5LuO5aSp6ICM6ZmNXG4gICAgYXR0YWNrMSxcbiAgICBhdHRhY2syLFxuICAgIGF0dGFjazMsXG4gICAgYm93X2F0dGFjaywvL+aFouW8k1xuICAgIGJvd19hdHRhY2tfZmFzdCwvL+W/q+W8k1xuICAgIGJvd19hdHRhY2tfdG9faWRsZSxcbiAgICBkYXNoX2FpciwvL+epuuS4reWGsuWHu1xuICAgIGRpZSxcbiAgICBkb3VibGVfanVtcCwvL+S6jOi/nui3s1xuICAgIGdldF9odXJ0LFxuICAgIGdldF91cCwvL+i1t+i6q1xuICAgIGlkbGUsXG4gICAgaWRsZV90b19tb3ZlLFxuICAgIGp1bXBfYXR0YWNrMSwvL+epuuS4reaZruaUu+i1t+aJi1xuICAgIGp1bXBfYXR0YWNrMiwvL+epuuS4reaXi+i9rOaUu+WHu1xuICAgIGp1bXBfYXR0YWNrMywvL+epuuS4reaXi+i9rOaUu+WHu+iQveWcsFxuICAgIGp1bXBfYXR0YWNrNCxcbiAgICBqdW1wX2RlbW8sXG4gICAganVtcF9kb3duLC8v6ZmN6JC9XG4gICAganVtcF9lbmQsLy9pZGxl6JC95ZywXG4gICAganVtcF9zdGFydCwvL+i1t+i3s1xuICAgIGp1bXBfdG9fbW92ZSwvL21vdmXokL3lnLBcbiAgICBrbm9ja191cDEsLy/ooqvlh7vlgJLlnLBcbiAgICBrbm9ja191cDIsXG4gICAga25vY2tfdXAzLFxuICAgIG1vdmUsIC8v5aWU6LeR5Yqo5L2cMVxuICAgIG1vdmUxLC8v5aWU6LeR5Yqo5L2cMlxuICAgIG1vdmUyLC8v5aWU6LeR5Yqo5L2cM1xuICAgIHBvc2Vfc2hhZG93LC8v56ys5LiJ5qyh5YWx5Ye75Yay5Ye7cG9zZVxuICAgIHJldml2ZSxcbiAgICByb2xsLC8v5Zyw5LiK57+75ruaXG4gICAgcm9sbF9haXIsLy/nqbrkuK3nv7vmu5ogIOi3s+i3g+WQjueri+WNs+e/u+a7muaXtlxuICAgIHJvbGxfdG9faWRsZSxcbiAgICByb2xsX3RvX21vdmUsXG4gICAgc2tpbGwyMDNfYWlyLCAvL+epuuS4reWJkembqOaKgFxuICAgIHNraWxsMjAzX2dyb3VuZCwvL+WcsOS4iuWJkembqOaKgFxuICAgIHNraWxsMjAzX29sZCxcbiAgICBza2lsbDIwN19haXIsLy/nqbrkuK3miZTpo57plZZcbiAgICBza2lsbDIwN19ncm91bmQsLy/lnLDkuIrmiZTpo57plZZcbiAgICB1bHRpbWF0ZS8v5aSn5oubXG59XG5leHBvcnQgZW51bSBlbmVteU5hbWV7XG4gICAgZW5lbXkxPVwiZW5lbXkxXCIsICAvL+aZrumAmuaAqlxuICAgIGVuZW15Mj1cImVuZW15MlwiLCAgLy/lvJPnrq3miYtcbiAgICBlbmVteTI5PVwiZW5lbXkyOVwiLCAvL+WMlemmluaAqlxuICAgIGVuZW15MTA9XCJlbmVteTEwXCIsIC8v6IOW5a2QYm9zc1xuICAgIGxhZHlCdWc9XCJsYWR5QnVnXCIsIC8v55Oi6JmrXG4gICAgYmlnU3F1aWQ9XCJiaWdTcXVpZFwiLCAvL+iaiuWtkFxuICAgIGVuZW15Mzk9XCJlbmVteTM5XCIsICAvL+icmOibm+Wls+eOi2Jvc3NcbiAgICBzcGlkZXJsaW5nPVwic3BpZGVybGluZ1wiLCAvL+Wwj+icmOibm1xuICAgIHNoYWRlcj1cInNoYWRlclwiLCAgLy/ljaHotZ5cbiAgICBlbmVteTIwPVwiZW5lbXkyMFwiLCAvL+Wls+W3q1xuICAgIGVuZW15MTg9XCJlbmVteTE4XCIsIC8v5qOS5qeM5oCqXG4gICAgbWluaUJvc3M9XCJtaW5pQm9zc1wiLC8v6Zu355S15rOV546LYm9zc1xuICAgIG1pbmlCb3NzRmxhZz1cIm1pbmlCb3NzRmxhZ1wiLy/pm7fnlLXms5Xnjovmi5vpm7fml5dcbn1cbi8v546p5a625bin5LqL5Lu2IG5haWzkuLrmnKrnu5HlrprnirbmgIFcbmV4cG9ydCBlbnVtIGZyYW1lRXZlbnR7XG4gICAgbmFpbDE9XCJBZGRGb3JjZVVwXCIsXG4gICAgbmFpbDI9XCJBbmltYXRpb25FbmRcIixcbiAgICBhdHRhY2sxPVwiQXR0YWNrMVwiLFxuICAgIGF0dGFjazI9XCJBdHRhY2syXCIsXG4gICAgYXR0YWNrMz1cIkF0dGFjazNcIixcbiAgICBtb3ZlPVwiRm9vdFN0ZXBcIixcbiAgICBnZXRfdXA9XCJHZXRVcFwiLFxuICAgIG5haWw2PVwiTG9ja0RpcmVjdGlvblwiLFxuICAgIG5haWw3PVwiTW92ZUZvcndhcmRcIixcbiAgICBuYWlsOD1cIlJvbGxDb21wbGV0ZVwiLFxuICAgIHNraWxsMjAzX2Fpcj1cIlNraWxsQ29tcGxldGVcIixcbiAgICBza2lsbDIwM19ncm91bmQ9XCJTa2lsbENvbXBsZXRlXCIsXG4gICAgc2tpbGwyMDdfYWlyPVwiU2tpbGxDb21wbGV0ZVwiLFxuICAgIHNraWxsMjA3X2dyb3VuZD1cIlNraWxsQ29tcGxldGVcIixcbiAgICBuYWlsMTA9XCJTdG9wTW92ZVwiXG59XG4vL+aAqueJqeW4p+S6i+S7tu+8iOaAqueJqeWQjS3liqjnlLvlkI0t5bin5LqL5Lu25pa55rOV5ZCN77yJXG5leHBvcnQgY29uc3QgZnJhbWVFdmVudF9lbmVteT17XG4gICAgXCJlbmVteTFcIjp7fSxcbiAgICBcImVuZW15MlwiOntcbiAgICAgICAgXCJhdHRhY2tcIjpcInNob290QXJyb3dcIlxuICAgIH0sXG4gICAgXCJlbmVteTI5XCI6e30sXG4gICAgXCJsYWR5QnVnXCI6e1xuICAgICAgICBcIkF0a1wiOlwiZmlyZVwiXG4gICAgfSxcbiAgICBcImVuZW15MTBcIjp7XG4gICAgICAgIFwic2tpbGwyX3N0YXJ0XCI6XCJmb290U3RlcFwiLFxuICAgICAgICBcInNraWxsMl9taWRkbGVcIjpcImZvb3RTdGVwXCIsXG4gICAgICAgIFwic2tpbGwxXCI6XCJmcmFtZUV2ZW50X3NraWxsMVwiXG4gICAgfSxcbiAgICBcImJpZ1NxdWlkXCI6e30sXG4gICAgXCJlbmVteTM5XCI6e1xuICAgICAgICBcIk1vdmVcIjpcImZvb3RTdGVwXCJcbiAgICB9LFxuICAgIFwic3BpZGVybGluZ1wiOntcbiAgICAgICAgXCJGYWxsXCI6XCJhdHRhY2tfZmFsbFwiXG4gICAgfSxcbiAgICBcInNoYWRlclwiOnt9LFxuICAgIFwiZW5lbXkyMFwiOntcbiAgICAgICAgXCJ0ZWxlcG9ydFwiOlwiYmxpbmtcIlxuICAgIH0sXG4gICAgXCJlbmVteTE4XCI6e1xuICAgICAgICBcIkF0a1wiOlwiU2hha2VcIlxuICAgIH0sXG4gICAgXCJtaW5pQm9zc1wiOntcbiAgICB9LFxuICAgIFwibWluaUJvc3NGbGFnXCI6e31cbn1cbi8v546p5a626Kem5Y+R5oqA6IO955qE5bin5pe26Ze0XG5leHBvcnQgY29uc3Qgc2tpbGxGcmFtZUV2ZW50VGltZT17XG4gICAgc2tpbGwyMDNfYWlyOjAuNSxcbiAgICBza2lsbDIwM19ncm91bmQ6MC40OCxcbiAgICBza2lsbDIwN19haXI6MC40MyxcbiAgICBza2lsbDIwN19ncm91bmQ6MC40MyxcbiAgICBhdHRhY2sxOjAuMTIzLFxuICAgIGF0dGFjazI6MC4yM1xufVxuLy/njqnlrrbkvKTlrrPnsbvlnotcbmV4cG9ydCBlbnVtIGF0dGFja1R5cGV7XG4gICAgYXR0YWNrMSxcbiAgICBhdHRhY2syLFxuICAgIGF0dGFjazMsXG4gICAganVtcEhpdCxcbiAgICBzaHVyaWtlbixcbiAgICBzd29yZFJhaW5cbn1cbi8v5oCq54mp5ZCN5a+55bqU55qE5o6n5Yi26ISa5pys5ZCN77yI546p5a625pS75Ye75Yik5a6a5pe26I635Y+W5oCq54mp6ISa5pys57uE5Lu277yJXG5leHBvcnQgY29uc3QgZW5lbXlTY3JpcHQ9e1xuICAgIFwiZW5lbXkxXCI6XCJFMWNvbnRyb2xsZXJcIixcbiAgICBcImVuZW15MlwiOlwiRTJjb250cm9sbGVyXCIsXG4gICAgXCJsYWR5QnVnXCI6XCJsYWR5QnVnXCIsXG4gICAgXCJlbmVteTI5XCI6XCJFMjljb250cm9sbGVyXCIsXG4gICAgXCJlbmVteTEwXCI6XCJFMTBjb250cm9sbGVyXCIsXG4gICAgXCJiaWdTcXVpZFwiOlwiYmlnU3F1aWRDb250cm9sbGVyXCIsXG4gICAgXCJlbmVteTM5XCI6XCJFMzljb250cm9sbGVyXCIsXG4gICAgXCJzcGlkZXJsaW5nXCI6XCJzcGlkZXJsaW5nQ29udHJvbGxlclwiLFxuICAgIFwic2hhZGVyXCI6XCJzaGFkZXJDb250cm9sbGVyXCIsXG4gICAgXCJlbmVteTIwXCI6XCJFMjBjb250cm9sbGVyXCIsXG4gICAgXCJlbmVteTE4XCI6XCJFMThjb250cm9sbGVyXCIsXG4gICAgXCJtaW5pQm9zc1wiOlwibWluaUJvc3NDb250cm9sbGVyXCIsXG4gICAgXCJtaW5pQm9zc0ZsYWdcIjpcIm1pbmlCb3NzRmxhZ1wiXG59XG4vL2VuZW1554q25oCBXG5leHBvcnQgZW51bSBlbmVteVN0YXRle1xuICAgIGF0dGFjaywgICAvL0UxLS0tLS0tLS0tLeaZrumAmuaAqlxuICAgIGdldF9odXJ0MSwvL+iiq+WHu+WJjeWAvlxuICAgIGdldF9odXJ0MiwvL+iiq+WHu+WQjuS7sFxuICAgIGdldF91cCwvL+i1t+i6q1xuICAgIGlkbGUsXG4gICAga25vY2tfZG93biwvL+WHu+mjnlxuICAgIG1vdmUsLy/mi7/liIDotbBcbiAgICBtb3ZlMiwvL+S4vuWIgOi1sFxuICAgIHJ1biwvL+S4vuWIgOi3kVxuXG4gICAgLy9hdHRhY2ssICAvL0UyLS0tLS0tLS0tLeW8k+eureaJi1xuICAgIC8vZ2V0X2h1cnQxLFxuICAgIC8vZ2V0X2h1cnQyLFxuICAgIC8vZ2V0X3VwLFxuICAgIC8vaWRsZSxcbiAgICBrbm9ja19kb3duMSwvL+WAkuWcsOWKqOS9nFxuICAgIGtub2NrX2Rvd24yLC8v6Lq65bC4XG4gICAgLy9tb3ZlXG5cbiAgICBBdGssICAgLy9sYWR5QnVnLS0tLS0tLS0tLeeTouiZq1xuICAgIEJlaGl0LFxuICAgIElkbGUsXG4gICAgXCJEaWUtbWlkZGxlXCIsXG4gICAgXCJEaWUtc3RhcnRcIixcbiAgICBcIkRpZV9lbmRcIixcblxuICAgIC8vQXRrLCAgIC8vRTI5LS0tLS0tLS0tLeWMlemmluaAqlxuICAgIERpZSwgICAvL+atu+S6oeaOieWktFxuICAgIFwiR2V0LXVwXCIsXG4gICAgXCJIZWFkLWVuZFwiLCAvL+WktOeIhueCuFxuICAgIFwiSGVhZC1taWRkbGVcIiwvL+WktOe8qeaUvlxuICAgIEhpdCwgICAgICAgLy/ooqvlh7tcbiAgICAvL0lkbGUsXG4gICAgXCJLbm9jay11cC1lbmRcIiwgLy/lgJLlnLBcbiAgICBcIktub2NrLXVwLWxvb3BcIiwvL+WHu+mjnuepuuS4remdmeatouWKqOS9nFxuICAgIFwiS25vY2stdXAtc3RhcnRcIiwvL+WHu+mjnuW8gOWni1xuICAgIE1vdmUsXG5cbiAgICAvL2F0dGFjaywgIOaOjOWHuyAvL0UxMC0tLS0tLS0tLS0tLS3og5blrZBib3NzXG4gICAgZGllLFxuICAgIGdldF9odXJ0LFxuICAgIC8vaWRsZSxcbiAgICAvL21vdmUsXG4gICAgc2tpbGwxLCAgLy/ms7DlsbHljovpobZcbiAgICBza2lsbDJfZW5kLC8v5Yay5Ye757uT5p2fXG4gICAgc2tpbGwyX21pZGRsZSwvL+WGsuWHu+S/neaMgVxuICAgIHNraWxsMl9zdGFydCwgIC8v5Yay5Ye75byA5aeLXG5cbiAgICBBdHRhY2ssICAvL2JpZ1NxdWlkLS0tLS3omorlrZBcbiAgICBBdHRhY2tfRW5kLFxuICAgIERpZTEsXG4gICAgRGllMixcbiAgICBEaWUzLFxuICAgIC8vSWRsZSxcbiAgICAvL01vdmUsXG4gICAgUHJlX0F0dGFjaywgLy/lh4blpIfmlLvlh7vliqjkvZxcbiAgICAvL2dldF9odXJ0MVxuXG4gICAgQWJvdmUxLCAgLy/otbfot7MgICBlbmVteTM5LS0tLS0tLS0tLeicmOibm+Wls+eOi1xuICAgIEFib3ZlMiwgIC8v6ZmN6JC9XG4gICAgQm9ybiwgIFxuICAgIC8vRGllLFxuICAgIEdldF9IaXQsXG4gICAgLy9JZGxlLCAgXG4gICAgSWRsZTIsXG4gICAgSWRsZTMsXG4gICAgSnVtcF9CYWNrLCAgLy/lkI7ot7PnnLznnZvlj5HlsITmv4DlhYlcbiAgICBKdW1wX0ZXRCwgICAvL+WJjei3s+eIquWHu1xuICAgIC8vTW92ZSxcbiAgICBTY3JhdGNoLCAgLy/ohb/lh7tcbiAgICBTdGFnZ2VyZWQsICAvL+iZmuW8sVxuICAgIFN0YWdnZXJlZFJlc2V0LFxuXG4gICAgLy9BdHRhY2ssICAvL3NwaWRlcmxpbmctLS0tLS0tLS0tLeWwj+icmOibm1xuICAgIC8vQm9ybixcbiAgICAvL0RpZSxcbiAgICBGYWxsLFxuICAgIC8vR2V0X0hpdCxcbiAgICBHZXRfdXAsXG4gICAgLy9JZGxlLFxuICAgIEtub2NrX3VwMSxcbiAgICBLbm9ja191cDIsXG4gICAgS25vY2tfdXAzLFxuICAgIC8vTW92ZSxcbiAgICBTdG9wLFxuICAgIFdhcm5pbmcsXG5cbiAgICAvL0F0aywgIC8vc2hhZGVyLS0tLS0tLS0tLS0tLS0tLeWNoei1nlxuICAgIC8vQmVoaXQsXG4gICAgLy9EaWUsXG4gICAgLy9JZGxlLFxuICAgIFwiU2tpbGwtRW5kXCIsICAvL+aNouS9jee9ruWHuueOsFxuICAgIFwiU2tpbGwtTWlkZGxlXCIsIC8v5Ye6546wLeaWqeWHuy3pmpDouqtcbiAgICBcIlNraWxsLVN0YXJ0XCIsICAvL+S4vuWIgOmakOi6q1xuXG4gICAgZmlyZV9waWxsYXIsICAgIC8v6a2U5rOV5byA5aeLICAgIC8vZW5lbXkyMC0tLS0tLS0tLS0tLS3lpbPlt6tcbiAgICBmaXJlX3BpbGxhcjIsICAgLy/prZTms5XmjIHnu61cbiAgICBmaXJlX3BpbGxhcjMsICAgLy/prZTms5Xnu5PmnZ9cbiAgICAvL2dldF9odXJ0MSxcbiAgICAvL2dldF9odXJ0MixcbiAgICAvL2dldF91cCxcbiAgICAvL2lkbGUsXG4gICAgLy9rbm9ja19kb3duMSxcbiAgICAvL2tub2NrX2Rvd24yLFxuICAgIC8vbW92ZSxcbiAgICB0ZWxlcG9ydCwgIC8v5Lyg6YCBXG5cbiAgICAvL0F0aywgICAvL2VuZW15MTgtLS0tLS0tLS0tLS0tLeajkuanjOaAqlxuICAgIC8vQmVoaXQsXG4gICAgLy9JZGxlLFxuICAgIC8vTW92ZSxcblxuICAgIGFwcGVhciwgIC8vbWluaUJvc3MtLS0tLS0tLS0tLS3pm7fnlLXms5XnjotcbiAgICBibGlua19lbmQsICAvL+eerOenu+e7k+adn1xuICAgIGJsaW5rX3N0YXJ0LCAgLy/nnqznp7vlvIDlp4tcbiAgICBjYWxsX29mX2xpZ2h0aW5nLCAgLy/lj6zllKTml5fluJxcbiAgICAvL2RpZSxcbiAgICAvL2dldF9odXJ0LFxuICAgIC8vaWRsZSxcbiAgICBsYXVnaCxcbiAgICBsaWdodGluZ19jaGFzZV9lbmQsXG4gICAgbGlnaHRpbmdfY2hhc2VfbWlkZGxlLCAvL+aMgee7reWPrOWUpOmdmeaAgembt+eQg++8iOaMgee7reWkmuauteS8pOWus++8iVxuICAgIGxpZ2h0aW5nX2NoYXNlX3N0YXJ0LFxuICAgIC8vbW92ZSxcbiAgICBzdGFnZ2VyZWRfZW5kLFxuICAgIHN0YWdnZXJlZF9taWRkbGUsXG4gICAgc3RhZ2dlcmVkX3N0YXJ0LFxuICAgIHN0b3JtX2J1cnN0LCAgLy/lj6zllKTmianmlaPpm7fnkIPvvIjniIbngrjljZXmrrXkvKTlrrPvvIlcbiAgICB0aHVuZGVyX2pvbHQsICAgLy/lj6zllKTmu5rpm7dcblxuICAgIGFwcGVhcjIsICAvL+aXl+W4nFxuICAgIHdhcm5pbmcsXG4gICAgLy9kaWUsXG4gICAgLy9pZGxlXG59XG4iXX0=