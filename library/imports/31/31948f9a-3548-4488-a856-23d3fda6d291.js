"use strict";
cc._RF.push(module, '31948+aNUhEiKhWI9P9ptKR', 'Events');
// scripts/game/Events.ts

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
var caijiTools_1 = require("../caijiTools");
var data_1 = require("../sdk/data");
var arrow_1 = require("./arrow");
var cameraControl_1 = require("./cameraControl");
var damageLabel_1 = require("./damageLabel");
var damageTipPool_1 = require("./damageTipPool");
var enemyBase_1 = require("./enemyBase");
var GameManager_1 = require("./GameManager");
var spawnEnemy_1 = require("./spawnEnemy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DropBloodProbability = 0;
        return _this;
    }
    Events_1 = Events;
    Object.defineProperty(Events, "instance", {
        get: function () {
            if (Events_1._instance == null) {
                Events_1._instance = new Events_1;
            }
            return Events_1._instance;
        },
        enumerable: false,
        configurable: true
    });
    Events.prototype.init = function () {
        Events_1.instance.DropBloodProbability = Number(data_1.data.gameJson("DropBloodProbability"));
    };
    /**
     * 生成怪物降临效果
     */
    Events.prototype.createSpawnEnemyEffect = function (enemyName, parent, position) {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/spawnEnemy")];
                    case 1:
                        prefab = _a.sent();
                        effect = caijiTools_1.caijiTools.createNode(prefab, parent);
                        effect.setPosition(position);
                        effect.getComponent(spawnEnemy_1.default).spawnEnemyName = enemyName;
                        effect.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 生成怪物
     */
    Events.prototype.spawnEnemy = function (enemyName, parent, position) {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, enemy;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/enemys/" + enemyName)];
                    case 1:
                        prefab = _a.sent();
                        if (prefab) {
                            enemy = caijiTools_1.caijiTools.createNode(prefab, parent);
                            enemy.setPosition(position);
                            enemy.setSiblingIndex(GameManager_1.default.instance.player.getSiblingIndex());
                            enemy.active = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 掉落金币
     */
    Events.prototype.dropCoin = function (target, position) {
        return __awaiter(this, void 0, void 0, function () {
            var dropNum, coin, i, newCoin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dropNum = Number(data_1.data.gameJson("enemyData", target.name, enemyBase_1.enemyAttribute.dropCoinNumber));
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/coin_drop")];
                    case 1:
                        coin = _a.sent();
                        for (i = 0; i < dropNum; i++) {
                            newCoin = caijiTools_1.caijiTools.createNode(coin, target.parent);
                            newCoin.setPosition(position);
                            newCoin.setSiblingIndex(target.getSiblingIndex() + 1);
                            newCoin.active = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 掉落血瓶
     */
    Events.prototype.dropBloodBottle = function (target, position) {
        return __awaiter(this, void 0, void 0, function () {
            var random, coin, bloodBottle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        random = caijiTools_1.caijiTools.random_int(0, 100) / 100;
                        if (random > Events_1.instance.DropBloodProbability)
                            return [2 /*return*/];
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/dropBloodBottle")];
                    case 1:
                        coin = _a.sent();
                        bloodBottle = caijiTools_1.caijiTools.createNode(coin, target.parent);
                        bloodBottle.setParent(target.parent);
                        bloodBottle.setPosition(position);
                        bloodBottle.setSiblingIndex(GameManager_1.default.instance.player.getSiblingIndex() + 1);
                        bloodBottle.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 玩家增加血量效果
     * @param player
     * @param addNum
     * @param offsetX
     * @param isRevive
     */
    Events.prototype.showAddHp_player = function (player, addNum, offsetX, isRevive) {
        if (isRevive === void 0) { isRevive = false; }
        return __awaiter(this, void 0, void 0, function () {
            var Label;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isRevive) {
                            this.createAddHpEffect_revive();
                        }
                        else {
                            this.createAddHpEffect_normal();
                        }
                        return [4 /*yield*/, damageTipPool_1.default.instance.getDamageLabel()];
                    case 1:
                        Label = _a.sent();
                        Label.setParent(GameManager_1.default.instance.node);
                        Label.setPosition(player.x + offsetX, player.y + 80);
                        Label.getComponent(damageLabel_1.default).damage = addNum;
                        Label.getComponent(damageLabel_1.default).color = cc.Color.GREEN;
                        Label.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 显示玩家受伤字体
     * @param player
     * @param damge
     * @param offsetX
     */
    Events.prototype.showDamageLabel_player = function (player, damge, offsetX) {
        return __awaiter(this, void 0, void 0, function () {
            var Label;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, damageTipPool_1.default.instance.getDamageLabel()];
                    case 1:
                        Label = _a.sent();
                        Label.setParent(GameManager_1.default.instance.node);
                        Label.setPosition(player.x + offsetX, player.y + 130);
                        Label.getComponent(damageLabel_1.default).damage = Math.floor(damge);
                        Label.getComponent(damageLabel_1.default).color = cc.Color.RED;
                        ;
                        Label.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 显示怪物受伤字体
     * @param enemy
     * @param damge
     * @param position
     */
    Events.prototype.showDamageLabel_enemy = function (enemy, damge, position) {
        return __awaiter(this, void 0, void 0, function () {
            var Label;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showDamageEffect(enemy, position);
                        return [4 /*yield*/, damageTipPool_1.default.instance.getDamageLabel()];
                    case 1:
                        Label = _a.sent();
                        Label.setParent(GameManager_1.default.instance.node);
                        Label.setPosition(position.x, position.y + 60);
                        Label.getComponent(damageLabel_1.default).damage = Math.floor(damge);
                        Label.getComponent(damageLabel_1.default).color = cc.Color.WHITE;
                        ;
                        Label.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 玩家攻击效果
     * @param enemy
     * @param position
     */
    Events.prototype.showDamageEffect = function (enemy, position) {
        return __awaiter(this, void 0, void 0, function () {
            var effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, damageTipPool_1.default.instance.getDamageEffect()];
                    case 1:
                        effect = _a.sent();
                        effect.setParent(GameManager_1.default.instance.node.parent);
                        effect.setPosition(position);
                        effect.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 怪物死亡效果
     * @param enemy 怪物
     * @param effectName 效果预制体名字
     * @param position 坐标
     * @returns
     */
    Events.prototype.createEnemyDieEffect = function (enemy, effectName, position) {
        return __awaiter(this, void 0, void 0, function () {
            var pre, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Events_1.instance.dropCoin(enemy, position);
                        Events_1.instance.dropBloodBottle(enemy, position);
                        if (effectName == "")
                            return [2 /*return*/];
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/" + effectName)];
                    case 1:
                        pre = _a.sent();
                        effect = caijiTools_1.caijiTools.createNode(pre, enemy.parent, false);
                        effect.setPosition(position);
                        effect.setSiblingIndex(enemy.getSiblingIndex());
                        effect.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 显示复活时回血效果
     */
    Events.prototype.createAddHpEffect_revive = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/heal")];
                    case 1:
                        prefab = _a.sent();
                        effect = caijiTools_1.caijiTools.createNode(prefab, GameManager_1.default.instance.player);
                        effect.setPosition(0, -30);
                        effect.active = true;
                        this.scheduleOnce(function () {
                            if (effect.isValid == false)
                                return;
                            effect.destroy();
                        }, 2);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
    * 显示普通回血效果
    */
    Events.prototype.createAddHpEffect_normal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/addHpEffect")];
                    case 1:
                        prefab = _a.sent();
                        effect = caijiTools_1.caijiTools.createNode(prefab, GameManager_1.default.instance.player);
                        effect.setPosition(0, -30);
                        effect.active = true;
                        this.scheduleOnce(function () {
                            if (effect.isValid == false)
                                return;
                            effect.destroy();
                        }, 2);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 怪物打击玩家效果
     * @param parent
     * @param position
     * @param scaleX
     */
    Events.prototype.showEnemyHitEffect = function (parent, position, scaleX) {
        return __awaiter(this, void 0, void 0, function () {
            var random, prefab, effect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        random = caijiTools_1.caijiTools.random_int(1, 2);
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/enemyHitEffect" + random)];
                    case 1:
                        prefab = _a.sent();
                        effect = caijiTools_1.caijiTools.createNode(prefab, GameManager_1.default.instance.player);
                        effect.setParent(parent);
                        effect.setPosition(position);
                        effect.scaleX = scaleX;
                        effect.active = true;
                        this.scheduleOnce(function () {
                            if (effect.isValid == false)
                                return;
                            effect.destroy();
                        }, 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 生成箭（怪物）
     * @param enemy
     * @param spawnPosition
     * @param playerPosition
     * @param angle
     * @param damge
     */
    Events.prototype.createArrow = function (enemy, spawnPosition, playerPosition, angle, damge) {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/arrow")];
                    case 1:
                        prefab = _a.sent();
                        node = caijiTools_1.caijiTools.createNode(prefab, enemy.parent);
                        node.getComponent(arrow_1.default).damage = damge;
                        node.getComponent(arrow_1.default).enemy = enemy;
                        node.getComponent(arrow_1.default).playerPosition = playerPosition;
                        node.setSiblingIndex(enemy.getSiblingIndex());
                        node.setPosition(spawnPosition);
                        node.angle = angle;
                        node.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Events.prototype.screenShake = function (repeat, offsetX, offsetY) {
        if (repeat === void 0) { repeat = 10; }
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 20; }
        cc.Tween.stopAllByTarget(cameraControl_1.default.instance.cameraNode);
        cameraControl_1.default.instance.node.y = 0;
        caijiTools_1.caijiTools.screenShake(cameraControl_1.default.instance.cameraNode, repeat, offsetX, offsetY);
    };
    Events.prototype.showReviveFx = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            var pre, fx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/fx_revive")];
                    case 1:
                        pre = _a.sent();
                        fx = cc.instantiate(pre);
                        fx.setParent(target.parent);
                        fx.setSiblingIndex(target.getSiblingIndex() + 1);
                        fx.setPosition(target.x, target.y - 20);
                        fx.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    var Events_1;
    Events._instance = null;
    Events = Events_1 = __decorate([
        ccclass
    ], Events);
    return Events;
}(cc.Component));
exports.default = Events;

cc._RF.pop();