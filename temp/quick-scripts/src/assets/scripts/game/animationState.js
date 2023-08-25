"use strict";
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