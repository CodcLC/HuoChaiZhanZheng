"use strict";
cc._RF.push(module, '87ccekukBxPV5AgIQeF5bYY', 'spawnEnemy');
// scripts/game/spawnEnemy.ts

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
var audioNameMgr_1 = require("../audioNameMgr");
var audioManager_1 = require("../main/audioManager");
var Events_1 = require("./Events");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var spawnEnemy = /** @class */ (function (_super) {
    __extends(spawnEnemy, _super);
    function spawnEnemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animation = null;
        _this.spawnEnemyName = "enemy1";
        _this.enemyHp = 0;
        _this.isSpawn = false;
        return _this;
    }
    spawnEnemy.prototype.onLoad = function () {
        this.animation = this.node.getComponent(cc.Animation);
    };
    spawnEnemy.prototype.start = function () {
        var _this = this;
        if (this.spawnEnemyName == "enemy10") {
            this.animation.node.scale = 2;
        }
        if (["enemy39", "miniBoss", "ladyBug", "bigSquid", "spiderling"].includes(this.spawnEnemyName)) {
            this.animation.node.scale = 0;
        }
        this.animation.on("finished", function () {
            _this.node.destroy();
        });
        this.animation.getClips()[0].events.push({
            frame: 0.14,
            func: "spawnEnemy",
            params: [""]
        });
        this.animation.play();
    };
    spawnEnemy.prototype.spawnEnemy = function () {
        if (this.isSpawn)
            return;
        this.isSpawn = true;
        Events_1.default.instance.spawnEnemy(this.spawnEnemyName, this.node.parent, cc.v2(this.node.position));
        if (this.animation.node.scale > 0) {
            audioManager_1.default.playAudio(audioNameMgr_1.audioName.CreepSpawn);
        }
    };
    spawnEnemy = __decorate([
        ccclass
    ], spawnEnemy);
    return spawnEnemy;
}(cc.Component));
exports.default = spawnEnemy;

cc._RF.pop();