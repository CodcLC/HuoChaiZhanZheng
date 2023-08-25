
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/main/audioManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b7eaaFSsWZPCYj2cXENLj3r', 'audioManager');
// scripts/main/audioManager.ts

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
var data_1 = require("../sdk/data");
var audioClipPath = "sounds/";
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var audioManager = /** @class */ (function (_super) {
    __extends(audioManager, _super);
    function audioManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onSprite_audio = null;
        _this.offSprite_audio = null;
        _this.soundSwitch = null;
        _this.isHaveBgm = true;
        return _this;
    }
    audioManager_1 = audioManager;
    audioManager.prototype.onLoad = function () {
        audioManager_1.instance = this;
    };
    audioManager.prototype.start = function () {
        this.init();
    };
    audioManager.prototype.onDisable = function () {
        this.bgOff();
    };
    audioManager.prototype.onEnable = function () {
        if (audioManager_1.isAudioInit == false)
            return;
        var soundOnOrOff = Number(data_1.data.getCache("Base", "sound"));
        cc.log("soundOnOrOff:", soundOnOrOff);
        if (audioManager_1.audioNumber_bgMenu == -1) {
            if (soundOnOrOff == 0) {
                cc.audioEngine.pause(audioManager_1.audioNumber_bgMenu);
            }
        }
        else {
            if (soundOnOrOff == 1) {
                cc.audioEngine.resume(audioManager_1.audioNumber_bgMenu);
            }
        }
    };
    audioManager.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bg, soundOnOrOff, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bg = null;
                        this.soundSwitch.active = true;
                        soundOnOrOff = Number(data_1.data.getCache("Base", "sound"));
                        this.soundSwitch.getComponent(cc.Sprite).spriteFrame = soundOnOrOff == 0 ? this.offSprite_audio : this.onSprite_audio;
                        if (audioManager_1.isAudioInit == true)
                            return [2 /*return*/];
                        audioManager_1.isAudioInit = true;
                        if (this.isHaveBgm == false)
                            return [2 /*return*/];
                        if (!(audioManager_1.audioNumber_bgMenu == -1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadAudioClipBundle("sounds", audioNameMgr_1.audioName.bgm_main)];
                    case 1:
                        bg = _a.sent();
                        id = cc.audioEngine.play(bg, true, 1 * audioManager_1.now_Volume);
                        audioManager_1.audioNumber_bgMenu = id;
                        if (soundOnOrOff == 0) {
                            cc.audioEngine.pause(audioManager_1.audioNumber_bgMenu);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (soundOnOrOff == 1) {
                            cc.audioEngine.resume(audioManager_1.audioNumber_bgMenu);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    audioManager.prototype.bgOff = function () {
        cc.audioEngine.pause(audioManager_1.audioNumber_bgMenu);
    };
    audioManager.playBgGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Number(data_1.data.getCache("Base", "sound")) == 0)) return [3 /*break*/, 1];
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(audioManager_1.audioNumber_bgGame == -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadAudioClipBundle("sounds", audioNameMgr_1.audioName.bgm_game)];
                    case 2:
                        bg = _a.sent();
                        audioManager_1.audioNumber_bgGame = cc.audioEngine.play(bg, true, 1 * audioManager_1.now_Volume);
                        return [3 /*break*/, 4];
                    case 3:
                        cc.audioEngine.resume(audioManager_1.audioNumber_bgGame);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    audioManager.pauseBgGame = function () {
        if (audioManager_1.audioNumber_bgGame == -1)
            return;
        cc.audioEngine.pause(audioManager_1.audioNumber_bgGame);
    };
    audioManager.prototype.soundControl = function () {
        if (audioManager_1.isAudioInit == false)
            return;
        if (Number(data_1.data.getCache("Base", "sound")) == 0) {
            data_1.data.updateCache("Base", "sound", 1);
            this.soundSwitch.getComponent(cc.Sprite).spriteFrame = this.onSprite_audio;
            if (this.isHaveBgm)
                cc.audioEngine.resume(audioManager_1.audioNumber_bgMenu);
        }
        else {
            data_1.data.updateCache("Base", "sound", 0);
            this.soundSwitch.getComponent(cc.Sprite).spriteFrame = this.offSprite_audio;
            if (this.isHaveBgm)
                cc.audioEngine.pause(audioManager_1.audioNumber_bgMenu);
        }
    };
    /*     shockControl(){
            if(Number(AppData.Instance.getCache("Base","shock"))==0){
                AppData.Instance.updateCache("Base","shock",1);
                this.shockSwitch.children[0].getComponent(cc.Sprite).spriteFrame=this.onSprite_shock;
                audioManager.shock();
            }else{
                AppData.Instance.updateCache("Base","shock",0);
                this.shockSwitch.children[0].getComponent(cc.Sprite).spriteFrame=this.offSprite_shock;
            }
        } */
    audioManager.playAudio = function (Name, isLoop, audioSize) {
        if (isLoop === void 0) { isLoop = null; }
        if (audioSize === void 0) { audioSize = null; }
        return __awaiter(this, void 0, void 0, function () {
            var onoff, isloop, size, AudioClip;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onoff = Number(data_1.data.getCache("Base", "sound"));
                        cc.log("playAudio onoff:", onoff, cc.audioEngine.getMaxAudioInstance());
                        if (!(onoff == 1)) return [3 /*break*/, 2];
                        isloop = isLoop == null ? false : isLoop;
                        size = audioSize == null ? 1 : audioSize;
                        if (audioManager_1.audioClips.get(Name)) {
                            // let id = cc.audioEngine.play(audioManager.audioClips.get(Name), isloop,size * audioManager.now_Volume);
                            // cc.audioEngine.setFinishCallback(id,()=>{
                            //     cc.audioEngine.uncache(audioManager.audioClips.get(Name))
                            //     cc.log("playAudio cache uncache....",Name,id)
                            // })
                            // cc.log("playAudio cache:",Name,"id:",id,",size:",size,cc.audioEngine.getMaxAudioInstance())
                            return [2 /*return*/, cc.audioEngine.play(audioManager_1.audioClips.get(Name), isloop, size * audioManager_1.now_Volume)];
                        }
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadAudioClipBundle("sounds", Name)];
                    case 1:
                        AudioClip = _a.sent();
                        if (AudioClip) {
                            audioManager_1.audioClips.set(Name, AudioClip);
                            // let id = cc.audioEngine.play(AudioClip, isloop,size * audioManager.now_Volume);    
                            // cc.audioEngine.setFinishCallback(id,()=>{
                            //     cc.audioEngine.uncache(audioManager.audioClips.get(Name))
                            //     cc.log("playAudio uncache....",Name,id)
                            // })            
                            // cc.log("playAudio remote :",Name,"id:",id,",size:",size,cc.audioEngine.getMaxAudioInstance())
                            return [2 /*return*/, cc.audioEngine.play(AudioClip, isloop, size * audioManager_1.now_Volume)];
                        }
                        else {
                            cc.log("playAudio load fail:", Name);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    audioManager.stopAudio = function (id) {
        cc.audioEngine.pause(id);
    };
    audioManager.shock = function () {
        if (Number(data_1.data.getCache("Base", "shock")) == 1) {
        }
    };
    var audioManager_1;
    audioManager.audioNumber_bgMenu = -1;
    audioManager.audioNumber_bgGame = -1;
    audioManager.now_Volume = 1;
    audioManager.isAudioInit = false;
    audioManager.instance = null;
    audioManager.audioClips = new Map;
    __decorate([
        property(cc.SpriteFrame)
    ], audioManager.prototype, "onSprite_audio", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], audioManager.prototype, "offSprite_audio", void 0);
    __decorate([
        property(cc.Node)
    ], audioManager.prototype, "soundSwitch", void 0);
    audioManager = audioManager_1 = __decorate([
        ccclass
    ], audioManager);
    return audioManager;
}(cc.Component));
exports.default = audioManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbWFpblxcYXVkaW9NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLGdEQUE0QztBQUM1Qyw0Q0FBMkM7QUFDM0Msb0NBQW1DO0FBRW5DLElBQU0sYUFBYSxHQUFRLFNBQVMsQ0FBQztBQUMvQixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQztJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQThJQztRQTVJRyxvQkFBYyxHQUFnQixJQUFJLENBQUM7UUFFbkMscUJBQWUsR0FBZ0IsSUFBSSxDQUFDO1FBRXBDLGlCQUFXLEdBQVMsSUFBSSxDQUFDO1FBRXpCLGVBQVMsR0FBUyxJQUFJLENBQUM7O0lBc0kzQixDQUFDO3FCQTlJb0IsWUFBWTtJQWU3Qiw2QkFBTSxHQUFOO1FBQ0ksY0FBWSxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7SUFFL0IsQ0FBQztJQUNELDRCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNELGdDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDSSxJQUFHLGNBQVksQ0FBQyxXQUFXLElBQUcsS0FBSztZQUFFLE9BQU87UUFDNUMsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVB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cmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGF1ZGlvTmFtZSB9IGZyb20gXCIuLi9hdWRpb05hbWVNZ3JcIjtcbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi9zZGsvZGF0YVwiO1xuXG5jb25zdCBhdWRpb0NsaXBQYXRoOnN0cmluZz1cInNvdW5kcy9cIjtcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGF1ZGlvTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIG9uU3ByaXRlX2F1ZGlvOmNjLlNwcml0ZUZyYW1lPW51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIG9mZlNwcml0ZV9hdWRpbzpjYy5TcHJpdGVGcmFtZT1udWxsO1xuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNvdW5kU3dpdGNoOmNjLk5vZGU9bnVsbDtcblxuICAgIGlzSGF2ZUJnbTpib29sZWFuPXRydWU7XG4gICAgc3RhdGljIGF1ZGlvTnVtYmVyX2JnTWVudTpudW1iZXI9LTE7XG4gICAgc3RhdGljIGF1ZGlvTnVtYmVyX2JnR2FtZTpudW1iZXI9LTE7XG4gICAgc3RhdGljIG5vd19Wb2x1bWU6bnVtYmVyPTE7XG4gICAgc3RhdGljIGlzQXVkaW9Jbml0OmJvb2xlYW49ZmFsc2U7XG4gICAgc3RhdGljIGluc3RhbmNlOmF1ZGlvTWFuYWdlcj1udWxsO1xuICAgIHN0YXRpYyBhdWRpb0NsaXBzOk1hcDxzdHJpbmcsY2MuQXVkaW9DbGlwPj1uZXcgTWFwO1xuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIGF1ZGlvTWFuYWdlci5pbnN0YW5jZT10aGlzO1xuICAgICAgICBcbiAgICB9XG4gICAgc3RhcnQgKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgb25EaXNhYmxlKCl7XG4gICAgICAgIHRoaXMuYmdPZmYoKTtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpIHsgICAgICAgIFxuICAgICAgICBpZihhdWRpb01hbmFnZXIuaXNBdWRpb0luaXQ9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICBsZXQgc291bmRPbk9yT2ZmID0gTnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJCYXNlXCIsXCJzb3VuZFwiKSk7XG4gICAgICAgIGNjLmxvZyhcInNvdW5kT25Pck9mZjpcIixzb3VuZE9uT3JPZmYpXG4gICAgICAgIGlmKGF1ZGlvTWFuYWdlci5hdWRpb051bWJlcl9iZ01lbnU9PS0xKXsgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHNvdW5kT25Pck9mZj09MCl7XG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2UoYXVkaW9NYW5hZ2VyLmF1ZGlvTnVtYmVyX2JnTWVudSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgaWYoc291bmRPbk9yT2ZmPT0xKXtcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWUoYXVkaW9NYW5hZ2VyLmF1ZGlvTnVtYmVyX2JnTWVudSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBpbml0KCl7XG4gICAgICAgIGxldCBiZzpjYy5BdWRpb0NsaXA9bnVsbDtcbiAgICAgICAgdGhpcy5zb3VuZFN3aXRjaC5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgbGV0IHNvdW5kT25Pck9mZj1OdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIixcInNvdW5kXCIpKTtcbiAgICAgICAgdGhpcy5zb3VuZFN3aXRjaC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT1zb3VuZE9uT3JPZmY9PTA/dGhpcy5vZmZTcHJpdGVfYXVkaW86dGhpcy5vblNwcml0ZV9hdWRpbztcbiAgICAgICAgaWYoYXVkaW9NYW5hZ2VyLmlzQXVkaW9Jbml0PT10cnVlKSByZXR1cm47XG4gICAgICAgIGF1ZGlvTWFuYWdlci5pc0F1ZGlvSW5pdD10cnVlO1xuICAgICAgICBpZih0aGlzLmlzSGF2ZUJnbT09ZmFsc2UpIHJldHVybjtcbiAgICAgICAgaWYoYXVkaW9NYW5hZ2VyLmF1ZGlvTnVtYmVyX2JnTWVudT09LTEpe1xuICAgICAgICAgICAgYmc9YXdhaXQgY2FpamlUb29scy5sb2FkQXVkaW9DbGlwQnVuZGxlKFwic291bmRzXCIsYXVkaW9OYW1lLmJnbV9tYWluKTtcbiAgICAgICAgICAgIGxldCBpZD1jYy5hdWRpb0VuZ2luZS5wbGF5KGJnLCB0cnVlLDEgKiBhdWRpb01hbmFnZXIubm93X1ZvbHVtZSk7XG4gICAgICAgICAgICBhdWRpb01hbmFnZXIuYXVkaW9OdW1iZXJfYmdNZW51PWlkO1xuICAgICAgICAgICAgaWYoc291bmRPbk9yT2ZmPT0wKXtcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZShhdWRpb01hbmFnZXIuYXVkaW9OdW1iZXJfYmdNZW51KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZihzb3VuZE9uT3JPZmY9PTEpe1xuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZShhdWRpb01hbmFnZXIuYXVkaW9OdW1iZXJfYmdNZW51KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBiZ09mZigpe1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZShhdWRpb01hbmFnZXIuYXVkaW9OdW1iZXJfYmdNZW51KTtcbiAgICB9XG4gICAgc3RhdGljIGFzeW5jIHBsYXlCZ0dhbWUoKXtcbiAgICAgICAgaWYoTnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJCYXNlXCIsXCJzb3VuZFwiKSk9PTApe1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGlmKGF1ZGlvTWFuYWdlci5hdWRpb051bWJlcl9iZ0dhbWU9PS0xKXtcbiAgICAgICAgICAgICAgICBsZXQgYmc9YXdhaXQgY2FpamlUb29scy5sb2FkQXVkaW9DbGlwQnVuZGxlKFwic291bmRzXCIsYXVkaW9OYW1lLmJnbV9nYW1lKTtcbiAgICAgICAgICAgICAgICBhdWRpb01hbmFnZXIuYXVkaW9OdW1iZXJfYmdHYW1lPWNjLmF1ZGlvRW5naW5lLnBsYXkoYmcsIHRydWUsMSAqIGF1ZGlvTWFuYWdlci5ub3dfVm9sdW1lKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZShhdWRpb01hbmFnZXIuYXVkaW9OdW1iZXJfYmdHYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcGF1c2VCZ0dhbWUoKXtcbiAgICAgICAgaWYoYXVkaW9NYW5hZ2VyLmF1ZGlvTnVtYmVyX2JnR2FtZT09LTEpIHJldHVybjtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2UoYXVkaW9NYW5hZ2VyLmF1ZGlvTnVtYmVyX2JnR2FtZSk7XG4gICAgfVxuICAgIHNvdW5kQ29udHJvbCgpe1xuICAgICAgICBpZihhdWRpb01hbmFnZXIuaXNBdWRpb0luaXQ9PWZhbHNlKSByZXR1cm47XG4gICAgICAgIGlmKE51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLFwic291bmRcIikpPT0wKXtcbiAgICAgICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJCYXNlXCIsXCJzb3VuZFwiLDEpO1xuICAgICAgICAgICAgdGhpcy5zb3VuZFN3aXRjaC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZT10aGlzLm9uU3ByaXRlX2F1ZGlvO1xuICAgICAgICAgICAgaWYodGhpcy5pc0hhdmVCZ20pXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWUoYXVkaW9NYW5hZ2VyLmF1ZGlvTnVtYmVyX2JnTWVudSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcIkJhc2VcIixcInNvdW5kXCIsMCk7XG4gICAgICAgICAgICB0aGlzLnNvdW5kU3dpdGNoLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMub2ZmU3ByaXRlX2F1ZGlvO1xuICAgICAgICAgICAgaWYodGhpcy5pc0hhdmVCZ20pXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZShhdWRpb01hbmFnZXIuYXVkaW9OdW1iZXJfYmdNZW51KTtcbiAgICAgICAgfVxuICAgIH1cbi8qICAgICBzaG9ja0NvbnRyb2woKXtcbiAgICAgICAgaWYoTnVtYmVyKEFwcERhdGEuSW5zdGFuY2UuZ2V0Q2FjaGUoXCJCYXNlXCIsXCJzaG9ja1wiKSk9PTApe1xuICAgICAgICAgICAgQXBwRGF0YS5JbnN0YW5jZS51cGRhdGVDYWNoZShcIkJhc2VcIixcInNob2NrXCIsMSk7XG4gICAgICAgICAgICB0aGlzLnNob2NrU3dpdGNoLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lPXRoaXMub25TcHJpdGVfc2hvY2s7XG4gICAgICAgICAgICBhdWRpb01hbmFnZXIuc2hvY2soKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBBcHBEYXRhLkluc3RhbmNlLnVwZGF0ZUNhY2hlKFwiQmFzZVwiLFwic2hvY2tcIiwwKTtcbiAgICAgICAgICAgIHRoaXMuc2hvY2tTd2l0Y2guY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWU9dGhpcy5vZmZTcHJpdGVfc2hvY2s7XG4gICAgICAgIH1cbiAgICB9ICovXG4gICAgc3RhdGljIGFzeW5jIHBsYXlBdWRpbyhOYW1lLGlzTG9vcDpib29sZWFuPW51bGwsYXVkaW9TaXplOm51bWJlcj1udWxsKXtcbiAgICAgICAgbGV0IG9ub2ZmID0gTnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJCYXNlXCIsXCJzb3VuZFwiKSkgXG4gICAgICAgIGNjLmxvZyhcInBsYXlBdWRpbyBvbm9mZjpcIixvbm9mZixjYy5hdWRpb0VuZ2luZS5nZXRNYXhBdWRpb0luc3RhbmNlKCkpXG4gICAgICAgIGlmKG9ub2ZmID09IDEgKSB7XG4gICAgICAgICAgICBsZXQgaXNsb29wPWlzTG9vcD09bnVsbD9mYWxzZTppc0xvb3A7XG4gICAgICAgICAgICBsZXQgc2l6ZT1hdWRpb1NpemU9PW51bGw/MTphdWRpb1NpemU7XG4gICAgICAgICAgICBpZihhdWRpb01hbmFnZXIuYXVkaW9DbGlwcy5nZXQoTmFtZSkpe1xuICAgICAgICAgICAgICAgIC8vIGxldCBpZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXkoYXVkaW9NYW5hZ2VyLmF1ZGlvQ2xpcHMuZ2V0KE5hbWUpLCBpc2xvb3Asc2l6ZSAqIGF1ZGlvTWFuYWdlci5ub3dfVm9sdW1lKTtcbiAgICAgICAgICAgICAgICAvLyBjYy5hdWRpb0VuZ2luZS5zZXRGaW5pc2hDYWxsYmFjayhpZCwoKT0+e1xuICAgICAgICAgICAgICAgIC8vICAgICBjYy5hdWRpb0VuZ2luZS51bmNhY2hlKGF1ZGlvTWFuYWdlci5hdWRpb0NsaXBzLmdldChOYW1lKSlcbiAgICAgICAgICAgICAgICAvLyAgICAgY2MubG9nKFwicGxheUF1ZGlvIGNhY2hlIHVuY2FjaGUuLi4uXCIsTmFtZSxpZClcbiAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcInBsYXlBdWRpbyBjYWNoZTpcIixOYW1lLFwiaWQ6XCIsaWQsXCIsc2l6ZTpcIixzaXplLGNjLmF1ZGlvRW5naW5lLmdldE1heEF1ZGlvSW5zdGFuY2UoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gY2MuYXVkaW9FbmdpbmUucGxheShhdWRpb01hbmFnZXIuYXVkaW9DbGlwcy5nZXQoTmFtZSksIGlzbG9vcCxzaXplICogYXVkaW9NYW5hZ2VyLm5vd19Wb2x1bWUpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IEF1ZGlvQ2xpcD1hd2FpdCBjYWlqaVRvb2xzLmxvYWRBdWRpb0NsaXBCdW5kbGUoXCJzb3VuZHNcIixOYW1lKTtcbiAgICAgICAgICAgIGlmIChBdWRpb0NsaXApe1xuICAgICAgICAgICAgICAgIGF1ZGlvTWFuYWdlci5hdWRpb0NsaXBzLnNldChOYW1lLEF1ZGlvQ2xpcCk7XG4gICAgICAgICAgICAgICAgLy8gbGV0IGlkID0gY2MuYXVkaW9FbmdpbmUucGxheShBdWRpb0NsaXAsIGlzbG9vcCxzaXplICogYXVkaW9NYW5hZ2VyLm5vd19Wb2x1bWUpOyAgICBcbiAgICAgICAgICAgICAgICAvLyBjYy5hdWRpb0VuZ2luZS5zZXRGaW5pc2hDYWxsYmFjayhpZCwoKT0+e1xuICAgICAgICAgICAgICAgIC8vICAgICBjYy5hdWRpb0VuZ2luZS51bmNhY2hlKGF1ZGlvTWFuYWdlci5hdWRpb0NsaXBzLmdldChOYW1lKSlcbiAgICAgICAgICAgICAgICAvLyAgICAgY2MubG9nKFwicGxheUF1ZGlvIHVuY2FjaGUuLi4uXCIsTmFtZSxpZClcbiAgICAgICAgICAgICAgICAvLyB9KSAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyhcInBsYXlBdWRpbyByZW1vdGUgOlwiLE5hbWUsXCJpZDpcIixpZCxcIixzaXplOlwiLHNpemUsY2MuYXVkaW9FbmdpbmUuZ2V0TWF4QXVkaW9JbnN0YW5jZSgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBjYy5hdWRpb0VuZ2luZS5wbGF5KEF1ZGlvQ2xpcCwgaXNsb29wLHNpemUgKiBhdWRpb01hbmFnZXIubm93X1ZvbHVtZSk7ICAgIFxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwicGxheUF1ZGlvIGxvYWQgZmFpbDpcIixOYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBzdG9wQXVkaW8oaWQ6bnVtYmVyKXtcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGF1c2UoaWQpO1xuICAgIH1cbiAgICBzdGF0aWMgc2hvY2soKXtcbiAgICAgICAgaWYoTnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJCYXNlXCIsXCJzaG9ja1wiKSk9PTEpe1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=