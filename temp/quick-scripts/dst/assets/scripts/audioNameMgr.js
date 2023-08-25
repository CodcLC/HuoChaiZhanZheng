
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/audioNameMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '793dfQxBiNLhZDsejfqqRa4', 'audioNameMgr');
// scripts/audioNameMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioName = void 0;
var audioName;
(function (audioName) {
    audioName["bgm_main"] = "bgm_main";
    audioName["bgm_game"] = "bgm_game";
    audioName["getCoin"] = "getCoin";
    audioName["button"] = "select";
    audioName["airslash1"] = "airslash1";
    audioName["BlinkEnd"] = "BlinkEnd";
    audioName["BlinkStart"] = "BlinkStart";
    audioName["Cast203"] = "Cast203";
    audioName["CreepSpawn"] = "CreepSpawn";
    audioName["cursor"] = "cursor";
    audioName["Dash"] = "Dash";
    audioName["drum_1_deeper"] = "drum_1_deeper";
    audioName["E1_Sword"] = "E1_Sword";
    audioName["E2_Flee"] = "E2_Flee";
    audioName["E2Shoot"] = "E2Shoot";
    audioName["E10_attack"] = "E10_attack";
    audioName["E10_death"] = "E10_death";
    audioName["E10_Jump"] = "E10_Jump";
    audioName["E10Roar"] = "E10Roar";
    audioName["E10Step"] = "E10Step";
    audioName["E15"] = "E15";
    audioName["E18_Attack"] = "E18_Attack";
    audioName["E20Cast"] = "E20Cast";
    audioName["E20FirePillar"] = "E20FirePillar";
    audioName["E24_Shoot"] = "E24_Shoot";
    audioName["E25Attack"] = "E25Attack";
    audioName["E25Die"] = "E25Die";
    audioName["E27castLightning"] = "E27castLightning";
    audioName["E27JoltCast"] = "E27JoltCast";
    audioName["E27Lightning"] = "E27Lightning";
    audioName["E27LightningJolt"] = "E27LightningJolt";
    audioName["E27LightningTotemFall"] = "E27LightningTotemFall";
    audioName["E27StormBurst"] = "E27StormBurst";
    audioName["E27TotemCast"] = "E27TotemCast";
    audioName["E29Attack"] = "E29Attack";
    audioName["E29Explosion"] = "E29Explosion";
    audioName["E38Attack"] = "E38Attack";
    audioName["E38AttackEnd"] = "E38AttackEnd";
    audioName["E38Fade"] = "E38Fade";
    audioName["E39_death"] = "E39_death";
    audioName["E39Above1"] = "E39Above1";
    audioName["E39Above2"] = "E39Above2";
    audioName["E39AboveLand"] = "E39AboveLand";
    audioName["E39Attack"] = "E39Attack";
    audioName["E39Jump"] = "E39Jump";
    audioName["E39Laser"] = "E39Laser";
    audioName["E39Scratch"] = "E39Scratch";
    audioName["E39Step"] = "E39Step";
    audioName["E40Alert"] = "E40Alert";
    audioName["E40Born"] = "E40Born";
    audioName["E40Exposion"] = "E40Exposion";
    audioName["E40Start"] = "E40Start";
    audioName["highlight_3"] = "highlight_3";
    audioName["jump"] = "jump";
    audioName["Jumpland"] = "Jumpland";
    audioName["Kunai"] = "Kunai";
    audioName["rolldash"] = "rolldash";
    audioName["Run"] = "Run";
    audioName["select"] = "select";
    audioName["shurikenfly2"] = "shurikenfly2";
    audioName["SkeletonCharge"] = "SkeletonCharge";
    audioName["Skillcast207Shuriken"] = "Skillcast207Shuriken";
    audioName["slash1"] = "slash1";
    audioName["slash2"] = "slash2";
    audioName["slash3"] = "slash3";
    audioName["Spell_Earth_02"] = "Spell_Earth_02";
    audioName["SpinAttack"] = "SpinAttack";
    audioName["StopMove"] = "StopMove";
    audioName["swoosh1"] = "swoosh1";
    audioName["swoosh2"] = "swoosh2";
    audioName["thrust1"] = "thrust1";
    audioName["ThunderTotemStruck"] = "ThunderTotemStruck";
})(audioName = exports.audioName || (exports.audioName = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcYXVkaW9OYW1lTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQVksU0E2RVg7QUE3RUQsV0FBWSxTQUFTO0lBQ2pCLGtDQUFtQixDQUFBO0lBQ25CLGtDQUFtQixDQUFBO0lBQ25CLGdDQUFpQixDQUFBO0lBQ2pCLDhCQUFlLENBQUE7SUFDZixvQ0FBcUIsQ0FBQTtJQUNyQixrQ0FBbUIsQ0FBQTtJQUNuQixzQ0FBdUIsQ0FBQTtJQUN2QixnQ0FBaUIsQ0FBQTtJQUNqQixzQ0FBdUIsQ0FBQTtJQUN2Qiw4QkFBZSxDQUFBO0lBQ2YsMEJBQVcsQ0FBQTtJQUNYLDRDQUE2QixDQUFBO0lBQzdCLGtDQUFtQixDQUFBO0lBQ25CLGdDQUFpQixDQUFBO0lBQ2pCLGdDQUFpQixDQUFBO0lBQ2pCLHNDQUF1QixDQUFBO0lBQ3ZCLG9DQUFxQixDQUFBO0lBRXJCLGtDQUFtQixDQUFBO0lBQ25CLGdDQUFpQixDQUFBO0lBQ2pCLGdDQUFpQixDQUFBO0lBQ2pCLHdCQUFTLENBQUE7SUFDVCxzQ0FBdUIsQ0FBQTtJQUN2QixnQ0FBaUIsQ0FBQTtJQUNqQiw0Q0FBNkIsQ0FBQTtJQUM3QixvQ0FBcUIsQ0FBQTtJQUNyQixvQ0FBcUIsQ0FBQTtJQUNyQiw4QkFBZSxDQUFBO0lBQ2Ysa0RBQW1DLENBQUE7SUFDbkMsd0NBQXlCLENBQUE7SUFFekIsMENBQTJCLENBQUE7SUFDM0Isa0RBQW1DLENBQUE7SUFDbkMsNERBQTZDLENBQUE7SUFDN0MsNENBQTZCLENBQUE7SUFDN0IsMENBQTJCLENBQUE7SUFDM0Isb0NBQXFCLENBQUE7SUFDckIsMENBQTJCLENBQUE7SUFDM0Isb0NBQXFCLENBQUE7SUFDckIsMENBQTJCLENBQUE7SUFDM0IsZ0NBQWlCLENBQUE7SUFDakIsb0NBQXFCLENBQUE7SUFDckIsb0NBQXFCLENBQUE7SUFDckIsb0NBQXFCLENBQUE7SUFDckIsMENBQTJCLENBQUE7SUFDM0Isb0NBQXFCLENBQUE7SUFDckIsZ0NBQWlCLENBQUE7SUFDakIsa0NBQW1CLENBQUE7SUFDbkIsc0NBQXVCLENBQUE7SUFDdkIsZ0NBQWlCLENBQUE7SUFDakIsa0NBQW1CLENBQUE7SUFDbkIsZ0NBQWlCLENBQUE7SUFFakIsd0NBQXlCLENBQUE7SUFDekIsa0NBQW1CLENBQUE7SUFDbkIsd0NBQXlCLENBQUE7SUFDekIsMEJBQVcsQ0FBQTtJQUNYLGtDQUFtQixDQUFBO0lBQ25CLDRCQUFhLENBQUE7SUFDYixrQ0FBbUIsQ0FBQTtJQUNuQix3QkFBUyxDQUFBO0lBQ1QsOEJBQWUsQ0FBQTtJQUNmLDBDQUEyQixDQUFBO0lBQzNCLDhDQUErQixDQUFBO0lBQy9CLDBEQUEyQyxDQUFBO0lBRTNDLDhCQUFlLENBQUE7SUFDZiw4QkFBZSxDQUFBO0lBQ2YsOEJBQWUsQ0FBQTtJQUNmLDhDQUErQixDQUFBO0lBQy9CLHNDQUF1QixDQUFBO0lBQ3ZCLGtDQUFtQixDQUFBO0lBQ25CLGdDQUFpQixDQUFBO0lBQ2pCLGdDQUFpQixDQUFBO0lBQ2pCLGdDQUFpQixDQUFBO0lBQ2pCLHNEQUF1QyxDQUFBO0FBQzNDLENBQUMsRUE3RVcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUE2RXBCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmV4cG9ydCBlbnVtIGF1ZGlvTmFtZXtcbiAgICBiZ21fbWFpbj1cImJnbV9tYWluXCIsLy8xXG4gICAgYmdtX2dhbWU9XCJiZ21fZ2FtZVwiLC8vMVxuICAgIGdldENvaW49XCJnZXRDb2luXCIsLy8xXG4gICAgYnV0dG9uPVwic2VsZWN0XCIsLy8xXG4gICAgYWlyc2xhc2gxPVwiYWlyc2xhc2gxXCIsICAvLzFcbiAgICBCbGlua0VuZD1cIkJsaW5rRW5kXCIsLy8xXG4gICAgQmxpbmtTdGFydD1cIkJsaW5rU3RhcnRcIiwvLzFcbiAgICBDYXN0MjAzPVwiQ2FzdDIwM1wiLC8vMVxuICAgIENyZWVwU3Bhd249XCJDcmVlcFNwYXduXCIsXG4gICAgY3Vyc29yPVwiY3Vyc29yXCIsXG4gICAgRGFzaD1cIkRhc2hcIixcbiAgICBkcnVtXzFfZGVlcGVyPVwiZHJ1bV8xX2RlZXBlclwiLFxuICAgIEUxX1N3b3JkPVwiRTFfU3dvcmRcIixcbiAgICBFMl9GbGVlPVwiRTJfRmxlZVwiLFxuICAgIEUyU2hvb3Q9XCJFMlNob290XCIsXG4gICAgRTEwX2F0dGFjaz1cIkUxMF9hdHRhY2tcIiwvLzFcbiAgICBFMTBfZGVhdGg9XCJFMTBfZGVhdGhcIixcblxuICAgIEUxMF9KdW1wPVwiRTEwX0p1bXBcIixcbiAgICBFMTBSb2FyPVwiRTEwUm9hclwiLFxuICAgIEUxMFN0ZXA9XCJFMTBTdGVwXCIsXG4gICAgRTE1PVwiRTE1XCIsXG4gICAgRTE4X0F0dGFjaz1cIkUxOF9BdHRhY2tcIiwvLzFcbiAgICBFMjBDYXN0PVwiRTIwQ2FzdFwiLC8vMVxuICAgIEUyMEZpcmVQaWxsYXI9XCJFMjBGaXJlUGlsbGFyXCIsXG4gICAgRTI0X1Nob290PVwiRTI0X1Nob290XCIsLy8xXG4gICAgRTI1QXR0YWNrPVwiRTI1QXR0YWNrXCIsLy8xXG4gICAgRTI1RGllPVwiRTI1RGllXCIsXG4gICAgRTI3Y2FzdExpZ2h0bmluZz1cIkUyN2Nhc3RMaWdodG5pbmdcIiwvLzFcbiAgICBFMjdKb2x0Q2FzdD1cIkUyN0pvbHRDYXN0XCIsXG5cbiAgICBFMjdMaWdodG5pbmc9XCJFMjdMaWdodG5pbmdcIixcbiAgICBFMjdMaWdodG5pbmdKb2x0PVwiRTI3TGlnaHRuaW5nSm9sdFwiLFxuICAgIEUyN0xpZ2h0bmluZ1RvdGVtRmFsbD1cIkUyN0xpZ2h0bmluZ1RvdGVtRmFsbFwiLFxuICAgIEUyN1N0b3JtQnVyc3Q9XCJFMjdTdG9ybUJ1cnN0XCIsXG4gICAgRTI3VG90ZW1DYXN0PVwiRTI3VG90ZW1DYXN0XCIsXG4gICAgRTI5QXR0YWNrPVwiRTI5QXR0YWNrXCIsLy8xXG4gICAgRTI5RXhwbG9zaW9uPVwiRTI5RXhwbG9zaW9uXCIsXG4gICAgRTM4QXR0YWNrPVwiRTM4QXR0YWNrXCIsXG4gICAgRTM4QXR0YWNrRW5kPVwiRTM4QXR0YWNrRW5kXCIsXG4gICAgRTM4RmFkZT1cIkUzOEZhZGVcIixcbiAgICBFMzlfZGVhdGg9XCJFMzlfZGVhdGhcIiwvLzFcbiAgICBFMzlBYm92ZTE9XCJFMzlBYm92ZTFcIixcbiAgICBFMzlBYm92ZTI9XCJFMzlBYm92ZTJcIixcbiAgICBFMzlBYm92ZUxhbmQ9XCJFMzlBYm92ZUxhbmRcIixcbiAgICBFMzlBdHRhY2s9XCJFMzlBdHRhY2tcIixcbiAgICBFMzlKdW1wPVwiRTM5SnVtcFwiLFxuICAgIEUzOUxhc2VyPVwiRTM5TGFzZXJcIixcbiAgICBFMzlTY3JhdGNoPVwiRTM5U2NyYXRjaFwiLFxuICAgIEUzOVN0ZXA9XCJFMzlTdGVwXCIsXG4gICAgRTQwQWxlcnQ9XCJFNDBBbGVydFwiLC8vMVxuICAgIEU0MEJvcm49XCJFNDBCb3JuXCIsXG5cbiAgICBFNDBFeHBvc2lvbj1cIkU0MEV4cG9zaW9uXCIsXG4gICAgRTQwU3RhcnQ9XCJFNDBTdGFydFwiLFxuICAgIGhpZ2hsaWdodF8zPVwiaGlnaGxpZ2h0XzNcIixcbiAgICBqdW1wPVwianVtcFwiLC8vMVxuICAgIEp1bXBsYW5kPVwiSnVtcGxhbmRcIiwvLzFcbiAgICBLdW5haT1cIkt1bmFpXCIsLy8xXG4gICAgcm9sbGRhc2g9XCJyb2xsZGFzaFwiLC8vMVxuICAgIFJ1bj1cIlJ1blwiLC8vMVxuICAgIHNlbGVjdD1cInNlbGVjdFwiLC8vMVxuICAgIHNodXJpa2VuZmx5Mj1cInNodXJpa2VuZmx5MlwiLFxuICAgIFNrZWxldG9uQ2hhcmdlPVwiU2tlbGV0b25DaGFyZ2VcIixcbiAgICBTa2lsbGNhc3QyMDdTaHVyaWtlbj1cIlNraWxsY2FzdDIwN1NodXJpa2VuXCIsLy8xXG5cbiAgICBzbGFzaDE9XCJzbGFzaDFcIiwvLzFcbiAgICBzbGFzaDI9XCJzbGFzaDJcIiwvLzFcbiAgICBzbGFzaDM9XCJzbGFzaDNcIiwvLzFcbiAgICBTcGVsbF9FYXJ0aF8wMj1cIlNwZWxsX0VhcnRoXzAyXCIsLy8xXG4gICAgU3BpbkF0dGFjaz1cIlNwaW5BdHRhY2tcIiwvLzFcbiAgICBTdG9wTW92ZT1cIlN0b3BNb3ZlXCIsLy8xXG4gICAgc3dvb3NoMT1cInN3b29zaDFcIiwvLzFcbiAgICBzd29vc2gyPVwic3dvb3NoMlwiLC8vMVxuICAgIHRocnVzdDE9XCJ0aHJ1c3QxXCIsLy8xXG4gICAgVGh1bmRlclRvdGVtU3RydWNrPVwiVGh1bmRlclRvdGVtU3RydWNrXCIsLy8xXG59Il19