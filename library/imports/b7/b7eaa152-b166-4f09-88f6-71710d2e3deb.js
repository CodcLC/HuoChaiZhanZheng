"use strict";
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