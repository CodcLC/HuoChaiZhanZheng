
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/Events.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLDRDQUEyQztBQUMzQyxvQ0FBbUM7QUFDbkMsaUNBQTRCO0FBQzVCLGlEQUE0QztBQUM1Qyw2Q0FBd0M7QUFDeEMsaURBQTRDO0FBQzVDLHlDQUE2QztBQUM3Qyw2Q0FBd0M7QUFDeEMsMkNBQXNDO0FBRWhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBdU5DO1FBck5HLDBCQUFvQixHQUFRLENBQUMsQ0FBQzs7SUFxTmxDLENBQUM7ZUF2Tm9CLE1BQU07SUFJdkIsc0JBQWtCLGtCQUFRO2FBQTFCO1lBQ0ksSUFBSSxRQUFNLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtnQkFDMUIsUUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLFFBQU0sQ0FBQzthQUNqQztZQUNELE9BQU8sUUFBTSxDQUFDLFNBQVMsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUNELHFCQUFJLEdBQUo7UUFDSSxRQUFNLENBQUMsUUFBUSxDQUFDLG9CQUFvQixHQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBQ0Q7O09BRUc7SUFDRyx1Q0FBc0IsR0FBNUIsVUFBNkIsU0FBZ0IsRUFBQyxNQUFjLEVBQUMsUUFBZ0I7Ozs7OzRCQUM5RCxxQkFBTSx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFBOzt3QkFBeEQsTUFBTSxHQUFDLFNBQWlEO3dCQUN4RCxNQUFNLEdBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNoRCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUM3QixNQUFNLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQyxjQUFjLEdBQUMsU0FBUyxDQUFDO3dCQUN6RCxNQUFNLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQzs7Ozs7S0FDdEI7SUFDRDs7T0FFRztJQUNJLDJCQUFVLEdBQWhCLFVBQWlCLFNBQWdCLEVBQUMsTUFBYyxFQUFDLFFBQWdCOzs7Ozs0QkFDbkQscUJBQU0sdUJBQVUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEdBQUMsU0FBUyxDQUFDLEVBQUE7O3dCQUEvRCxNQUFNLEdBQUMsU0FBd0Q7d0JBQ25FLElBQUcsTUFBTSxFQUFDOzRCQUNGLEtBQUssR0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLENBQUM7NEJBQy9DLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQzVCLEtBQUssQ0FBQyxlQUFlLENBQUMscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7NEJBQ3JFLEtBQUssQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO3lCQUNyQjs7Ozs7S0FDSjtJQUNEOztPQUVHO0lBQ0cseUJBQVEsR0FBZCxVQUFlLE1BQWMsRUFBQyxRQUFnQjs7Ozs7O3dCQUN0QyxPQUFPLEdBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsMEJBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO3dCQUNoRixxQkFBTSx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFBOzt3QkFBckQsSUFBSSxHQUFDLFNBQWdEO3dCQUN6RCxLQUFRLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUUsRUFBQzs0QkFDbEIsT0FBTyxHQUFDLHVCQUFVLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ3RELE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQzlCLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNwRCxPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQzt5QkFDdkI7Ozs7O0tBQ0o7SUFDRDs7T0FFRztJQUNHLGdDQUFlLEdBQXJCLFVBQXNCLE1BQWMsRUFBQyxRQUFnQjs7Ozs7O3dCQUM3QyxNQUFNLEdBQUMsdUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQzt3QkFDNUMsSUFBRyxNQUFNLEdBQUMsUUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0I7NEJBQUUsc0JBQU87d0JBQzlDLHFCQUFNLHVCQUFVLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLEVBQUE7O3dCQUEzRCxJQUFJLEdBQUMsU0FBc0Q7d0JBQzNELFdBQVcsR0FBQyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMxRCxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDckMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDbEMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdFLFdBQVcsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDOzs7OztLQUMzQjtJQUNEOzs7Ozs7T0FNRztJQUNHLGlDQUFnQixHQUF0QixVQUF1QixNQUFlLEVBQUUsTUFBYyxFQUFFLE9BQWUsRUFBRSxRQUF5QjtRQUF6Qix5QkFBQSxFQUFBLGdCQUF5Qjs7Ozs7O3dCQUM5RixJQUFJLFFBQVEsRUFBRTs0QkFDVixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQzt5QkFDbkM7NkJBQU07NEJBQ0gsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7eUJBQ25DO3dCQUNXLHFCQUFNLHVCQUFhLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFBOzt3QkFBckQsS0FBSyxHQUFHLFNBQTZDO3dCQUN6RCxLQUFLLENBQUMsU0FBUyxDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMzQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ3JELEtBQUssQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7d0JBQ2hELEtBQUssQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzt3QkFDdkQsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Ozs7O0tBQ3ZCO0lBQ0Q7Ozs7O09BS0c7SUFDRyx1Q0FBc0IsR0FBNUIsVUFBNkIsTUFBZSxFQUFFLEtBQWEsRUFBRSxPQUFlOzs7Ozs0QkFDNUQscUJBQU0sdUJBQWEsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEVBQUE7O3dCQUFyRCxLQUFLLEdBQUcsU0FBNkM7d0JBQ3pELEtBQUssQ0FBQyxTQUFTLENBQUMscUJBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzNDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNELEtBQUssQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzt3QkFBQSxDQUFDO3dCQUN0RCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7Ozs7S0FDdkI7SUFDRDs7Ozs7T0FLRztJQUNHLHNDQUFxQixHQUEzQixVQUE0QixLQUFjLEVBQUUsS0FBYSxFQUFFLFFBQWlCOzs7Ozs7d0JBQ3hFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQzNCLHFCQUFNLHVCQUFhLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFBOzt3QkFBckQsS0FBSyxHQUFHLFNBQTZDO3dCQUN6RCxLQUFLLENBQUMsU0FBUyxDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMzQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDL0MsS0FBSyxDQUFDLFlBQVksQ0FBQyxxQkFBVyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzNELEtBQUssQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzt3QkFBQSxDQUFDO3dCQUN4RCxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7Ozs7S0FDdkI7SUFDRDs7OztPQUlHO0lBQ0csaUNBQWdCLEdBQXRCLFVBQXVCLEtBQWMsRUFBRSxRQUFpQjs7Ozs7NEJBQ3ZDLHFCQUFNLHVCQUFhLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxFQUFBOzt3QkFBdkQsTUFBTSxHQUFHLFNBQThDO3dCQUMzRCxNQUFNLENBQUMsU0FBUyxDQUFDLHFCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbkQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDN0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Ozs7O0tBQ3hCO0lBQ0Q7Ozs7OztPQU1HO0lBQ0cscUNBQW9CLEdBQTFCLFVBQTJCLEtBQWMsRUFBRSxVQUFrQixFQUFFLFFBQVE7Ozs7Ozt3QkFDbkUsUUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN6QyxRQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ2hELElBQUksVUFBVSxJQUFJLEVBQUU7NEJBQUUsc0JBQU87d0JBQ25CLHFCQUFNLHVCQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsRUFBQTs7d0JBQTFELEdBQUcsR0FBRyxTQUFvRDt3QkFDMUQsTUFBTSxHQUFHLHVCQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUM3RCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUM3QixNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO3dCQUNoRCxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7Ozs7S0FDeEI7SUFDRDs7T0FFRztJQUNHLHlDQUF3QixHQUE5Qjs7Ozs7NEJBQ2lCLHFCQUFNLHVCQUFVLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUFBOzt3QkFBcEQsTUFBTSxHQUFHLFNBQTJDO3dCQUNwRCxNQUFNLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUN4RSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUMzQixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQzs0QkFDZCxJQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUUsS0FBSztnQ0FBRSxPQUFPOzRCQUNqQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ3JCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7S0FDVDtJQUNEOztNQUVFO0lBQ0kseUNBQXdCLEdBQTlCOzs7Ozs0QkFDaUIscUJBQU0sdUJBQVUsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBQTs7d0JBQTNELE1BQU0sR0FBRyxTQUFrRDt3QkFDM0QsTUFBTSxHQUFHLHVCQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxxQkFBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDeEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDM0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUM7NEJBQ2QsSUFBRyxNQUFNLENBQUMsT0FBTyxJQUFFLEtBQUs7Z0NBQUUsT0FBTzs0QkFDakMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNyQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0tBQ1Q7SUFDRDs7Ozs7T0FLRztJQUNHLG1DQUFrQixHQUF4QixVQUF5QixNQUFlLEVBQUUsUUFBaUIsRUFBRSxNQUFjOzs7Ozs7d0JBQ25FLE1BQU0sR0FBRyx1QkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQzVCLHFCQUFNLHVCQUFVLENBQUMsVUFBVSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxFQUFBOzt3QkFBdkUsTUFBTSxHQUFHLFNBQThEO3dCQUN2RSxNQUFNLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLHFCQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUN4RSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUN6QixNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUM3QixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt3QkFDdkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUM7NEJBQ2QsSUFBRyxNQUFNLENBQUMsT0FBTyxJQUFFLEtBQUs7Z0NBQUUsT0FBTzs0QkFDakMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNyQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0tBQ1Q7SUFDRDs7Ozs7OztPQU9HO0lBQ0csNEJBQVcsR0FBakIsVUFBa0IsS0FBYyxFQUFFLGFBQXNCLEVBQUUsY0FBdUIsRUFBRSxLQUFhLEVBQUUsS0FBYTs7Ozs7NEJBQzlGLHFCQUFNLHVCQUFVLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFBOzt3QkFBckQsTUFBTSxHQUFHLFNBQTRDO3dCQUNyRCxJQUFJLEdBQUcsdUJBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO3dCQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBSyxDQUFDLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQzt3QkFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzs7OztLQUN0QjtJQUNELDRCQUFXLEdBQVgsVUFBYSxNQUFtQixFQUFFLE9BQW1CLEVBQUUsT0FBb0I7UUFBOUQsdUJBQUEsRUFBQSxXQUFtQjtRQUFFLHdCQUFBLEVBQUEsV0FBbUI7UUFBRSx3QkFBQSxFQUFBLFlBQW9CO1FBQ3ZFLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLHVCQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVELHVCQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1FBQ2hDLHVCQUFVLENBQUMsV0FBVyxDQUFDLHVCQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFDSyw2QkFBWSxHQUFsQixVQUFtQixNQUFjOzs7Ozs0QkFDckIscUJBQU0sdUJBQVUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBQTs7d0JBQXBELEdBQUcsR0FBQyxTQUFnRDt3QkFDcEQsRUFBRSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzNCLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUM1QixFQUFFLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3JDLEVBQUUsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDOzs7OztLQUNsQjs7SUFuTmMsZ0JBQVMsR0FBVyxJQUFJLENBQUM7SUFIdkIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQXVOMUI7SUFBRCxhQUFDO0NBdk5ELEFBdU5DLENBdk5tQyxFQUFFLENBQUMsU0FBUyxHQXVOL0M7a0JBdk5vQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi9zZGsvZGF0YVwiO1xuaW1wb3J0IGFycm93IGZyb20gXCIuL2Fycm93XCI7XG5pbXBvcnQgY2FtZXJhQ29udHJvbCBmcm9tIFwiLi9jYW1lcmFDb250cm9sXCI7XG5pbXBvcnQgZGFtYWdlTGFiZWwgZnJvbSBcIi4vZGFtYWdlTGFiZWxcIjtcbmltcG9ydCBkYW1hZ2VUaXBQb29sIGZyb20gXCIuL2RhbWFnZVRpcFBvb2xcIjtcbmltcG9ydCB7IGVuZW15QXR0cmlidXRlIH0gZnJvbSBcIi4vZW5lbXlCYXNlXCI7XG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcbmltcG9ydCBzcGF3bkVuZW15IGZyb20gXCIuL3NwYXduRW5lbXlcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50cyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBEcm9wQmxvb2RQcm9iYWJpbGl0eTpudW1iZXI9MDtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEV2ZW50cyA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7XG4gICAgICAgIGlmIChFdmVudHMuX2luc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIEV2ZW50cy5faW5zdGFuY2UgPSBuZXcgRXZlbnRzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBFdmVudHMuX2luc3RhbmNlO1xuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIEV2ZW50cy5pbnN0YW5jZS5Ecm9wQmxvb2RQcm9iYWJpbGl0eT1OdW1iZXIoZGF0YS5nYW1lSnNvbihcIkRyb3BCbG9vZFByb2JhYmlsaXR5XCIpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog55Sf5oiQ5oCq54mp6ZmN5Li05pWI5p6cXG4gICAgICovXG4gICAgYXN5bmMgY3JlYXRlU3Bhd25FbmVteUVmZmVjdChlbmVteU5hbWU6c3RyaW5nLHBhcmVudDpjYy5Ob2RlLHBvc2l0aW9uOmNjLlZlYzIpe1xuICAgICAgICBsZXQgcHJlZmFiPWF3YWl0IGNhaWppVG9vbHMubG9hZFByZWZhYihcInByZWZhYnMvc3Bhd25FbmVteVwiKTtcbiAgICAgICAgbGV0IGVmZmVjdD1jYWlqaVRvb2xzLmNyZWF0ZU5vZGUocHJlZmFiLHBhcmVudCk7XG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIGVmZmVjdC5nZXRDb21wb25lbnQoc3Bhd25FbmVteSkuc3Bhd25FbmVteU5hbWU9ZW5lbXlOYW1lO1xuICAgICAgICBlZmZlY3QuYWN0aXZlPXRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeUn+aIkOaAqueJqVxuICAgICAqL1xuICAgICBhc3luYyBzcGF3bkVuZW15KGVuZW15TmFtZTpzdHJpbmcscGFyZW50OmNjLk5vZGUscG9zaXRpb246Y2MuVmVjMil7XG4gICAgICAgIGxldCBwcmVmYWI9YXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy9lbmVteXMvXCIrZW5lbXlOYW1lKTtcbiAgICAgICAgaWYocHJlZmFiKXtcbiAgICAgICAgICAgIGxldCBlbmVteT1jYWlqaVRvb2xzLmNyZWF0ZU5vZGUocHJlZmFiLHBhcmVudCk7XG4gICAgICAgICAgICBlbmVteS5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgICAgICBlbmVteS5zZXRTaWJsaW5nSW5kZXgoR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyLmdldFNpYmxpbmdJbmRleCgpKTtcbiAgICAgICAgICAgIGVuZW15LmFjdGl2ZT10cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaOieiQvemHkeW4gVxuICAgICAqL1xuICAgIGFzeW5jIGRyb3BDb2luKHRhcmdldDpjYy5Ob2RlLHBvc2l0aW9uOmNjLlZlYzIpIHtcbiAgICAgICAgbGV0IGRyb3BOdW09TnVtYmVyKGRhdGEuZ2FtZUpzb24oXCJlbmVteURhdGFcIix0YXJnZXQubmFtZSxlbmVteUF0dHJpYnV0ZS5kcm9wQ29pbk51bWJlcikpO1xuICAgICAgICBsZXQgY29pbj1hd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWJzL2NvaW5fZHJvcFwiKTtcbiAgICAgICAgZm9yKGxldCBpPTA7aTxkcm9wTnVtO2krKyl7XG4gICAgICAgICAgICBsZXQgbmV3Q29pbj1jYWlqaVRvb2xzLmNyZWF0ZU5vZGUoY29pbix0YXJnZXQucGFyZW50KTtcbiAgICAgICAgICAgIG5ld0NvaW4uc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICAgICAgbmV3Q29pbi5zZXRTaWJsaW5nSW5kZXgodGFyZ2V0LmdldFNpYmxpbmdJbmRleCgpKzEpO1xuICAgICAgICAgICAgbmV3Q29pbi5hY3RpdmU9dHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmjonokL3ooYDnk7ZcbiAgICAgKi9cbiAgICBhc3luYyBkcm9wQmxvb2RCb3R0bGUodGFyZ2V0OmNjLk5vZGUscG9zaXRpb246Y2MuVmVjMil7XG4gICAgICAgIGxldCByYW5kb209Y2FpamlUb29scy5yYW5kb21faW50KDAsMTAwKS8xMDA7XG4gICAgICAgIGlmKHJhbmRvbT5FdmVudHMuaW5zdGFuY2UuRHJvcEJsb29kUHJvYmFiaWxpdHkpIHJldHVybjtcbiAgICAgICAgbGV0IGNvaW49YXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy9kcm9wQmxvb2RCb3R0bGVcIik7XG4gICAgICAgIGxldCBibG9vZEJvdHRsZT1jYWlqaVRvb2xzLmNyZWF0ZU5vZGUoY29pbix0YXJnZXQucGFyZW50KTtcbiAgICAgICAgYmxvb2RCb3R0bGUuc2V0UGFyZW50KHRhcmdldC5wYXJlbnQpO1xuICAgICAgICBibG9vZEJvdHRsZS5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIGJsb29kQm90dGxlLnNldFNpYmxpbmdJbmRleChHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIuZ2V0U2libGluZ0luZGV4KCkrMSk7XG4gICAgICAgIGJsb29kQm90dGxlLmFjdGl2ZT10cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnjqnlrrblop7liqDooYDph4/mlYjmnpxcbiAgICAgKiBAcGFyYW0gcGxheWVyIFxuICAgICAqIEBwYXJhbSBhZGROdW0gXG4gICAgICogQHBhcmFtIG9mZnNldFggXG4gICAgICogQHBhcmFtIGlzUmV2aXZlIFxuICAgICAqL1xuICAgIGFzeW5jIHNob3dBZGRIcF9wbGF5ZXIocGxheWVyOiBjYy5Ob2RlLCBhZGROdW06IG51bWJlciwgb2Zmc2V0WDogbnVtYmVyLCBpc1Jldml2ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChpc1Jldml2ZSkge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVBZGRIcEVmZmVjdF9yZXZpdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWRkSHBFZmZlY3Rfbm9ybWFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IExhYmVsID0gYXdhaXQgZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5nZXREYW1hZ2VMYWJlbCgpO1xuICAgICAgICBMYWJlbC5zZXRQYXJlbnQoR2FtZU1hbmFnZXIuaW5zdGFuY2Uubm9kZSk7XG4gICAgICAgIExhYmVsLnNldFBvc2l0aW9uKHBsYXllci54ICsgb2Zmc2V0WCwgcGxheWVyLnkgKyA4MCk7XG4gICAgICAgIExhYmVsLmdldENvbXBvbmVudChkYW1hZ2VMYWJlbCkuZGFtYWdlID0gYWRkTnVtO1xuICAgICAgICBMYWJlbC5nZXRDb21wb25lbnQoZGFtYWdlTGFiZWwpLmNvbG9yID0gY2MuQ29sb3IuR1JFRU47XG4gICAgICAgIExhYmVsLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaYvuekuueOqeWutuWPl+S8pOWtl+S9k1xuICAgICAqIEBwYXJhbSBwbGF5ZXIgXG4gICAgICogQHBhcmFtIGRhbWdlIFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIFxuICAgICAqL1xuICAgIGFzeW5jIHNob3dEYW1hZ2VMYWJlbF9wbGF5ZXIocGxheWVyOiBjYy5Ob2RlLCBkYW1nZTogbnVtYmVyLCBvZmZzZXRYOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IExhYmVsID0gYXdhaXQgZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5nZXREYW1hZ2VMYWJlbCgpO1xuICAgICAgICBMYWJlbC5zZXRQYXJlbnQoR2FtZU1hbmFnZXIuaW5zdGFuY2Uubm9kZSk7XG4gICAgICAgIExhYmVsLnNldFBvc2l0aW9uKHBsYXllci54ICsgb2Zmc2V0WCwgcGxheWVyLnkgKyAxMzApO1xuICAgICAgICBMYWJlbC5nZXRDb21wb25lbnQoZGFtYWdlTGFiZWwpLmRhbWFnZSA9IE1hdGguZmxvb3IoZGFtZ2UpO1xuICAgICAgICBMYWJlbC5nZXRDb21wb25lbnQoZGFtYWdlTGFiZWwpLmNvbG9yID0gY2MuQ29sb3IuUkVEOztcbiAgICAgICAgTGFiZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5pi+56S65oCq54mp5Y+X5Lyk5a2X5L2TXG4gICAgICogQHBhcmFtIGVuZW15IFxuICAgICAqIEBwYXJhbSBkYW1nZSBcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gXG4gICAgICovXG4gICAgYXN5bmMgc2hvd0RhbWFnZUxhYmVsX2VuZW15KGVuZW15OiBjYy5Ob2RlLCBkYW1nZTogbnVtYmVyLCBwb3NpdGlvbjogY2MuVmVjMikge1xuICAgICAgICB0aGlzLnNob3dEYW1hZ2VFZmZlY3QoZW5lbXksIHBvc2l0aW9uKTtcbiAgICAgICAgbGV0IExhYmVsID0gYXdhaXQgZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5nZXREYW1hZ2VMYWJlbCgpO1xuICAgICAgICBMYWJlbC5zZXRQYXJlbnQoR2FtZU1hbmFnZXIuaW5zdGFuY2Uubm9kZSk7XG4gICAgICAgIExhYmVsLnNldFBvc2l0aW9uKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkgKyA2MCk7XG4gICAgICAgIExhYmVsLmdldENvbXBvbmVudChkYW1hZ2VMYWJlbCkuZGFtYWdlID0gTWF0aC5mbG9vcihkYW1nZSk7XG4gICAgICAgIExhYmVsLmdldENvbXBvbmVudChkYW1hZ2VMYWJlbCkuY29sb3IgPSBjYy5Db2xvci5XSElURTs7XG4gICAgICAgIExhYmVsLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeOqeWutuaUu+WHu+aViOaenFxuICAgICAqIEBwYXJhbSBlbmVteSBcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gXG4gICAgICovXG4gICAgYXN5bmMgc2hvd0RhbWFnZUVmZmVjdChlbmVteTogY2MuTm9kZSwgcG9zaXRpb246IGNjLlZlYzIpIHtcbiAgICAgICAgbGV0IGVmZmVjdCA9IGF3YWl0IGRhbWFnZVRpcFBvb2wuaW5zdGFuY2UuZ2V0RGFtYWdlRWZmZWN0KCk7XG4gICAgICAgIGVmZmVjdC5zZXRQYXJlbnQoR2FtZU1hbmFnZXIuaW5zdGFuY2Uubm9kZS5wYXJlbnQpO1xuICAgICAgICBlZmZlY3Quc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICBlZmZlY3QuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5oCq54mp5q275Lqh5pWI5p6cXG4gICAgICogQHBhcmFtIGVuZW15IOaAqueJqVxuICAgICAqIEBwYXJhbSBlZmZlY3ROYW1lIOaViOaenOmihOWItuS9k+WQjeWtl1xuICAgICAqIEBwYXJhbSBwb3NpdGlvbiDlnZDmoIdcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBhc3luYyBjcmVhdGVFbmVteURpZUVmZmVjdChlbmVteTogY2MuTm9kZSwgZWZmZWN0TmFtZTogc3RyaW5nLCBwb3NpdGlvbikge1xuICAgICAgICBFdmVudHMuaW5zdGFuY2UuZHJvcENvaW4oZW5lbXkscG9zaXRpb24pO1xuICAgICAgICBFdmVudHMuaW5zdGFuY2UuZHJvcEJsb29kQm90dGxlKGVuZW15LHBvc2l0aW9uKTtcbiAgICAgICAgaWYgKGVmZmVjdE5hbWUgPT0gXCJcIikgcmV0dXJuO1xuICAgICAgICBsZXQgcHJlID0gYXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy9cIiArIGVmZmVjdE5hbWUpO1xuICAgICAgICBsZXQgZWZmZWN0ID0gY2FpamlUb29scy5jcmVhdGVOb2RlKHByZSwgZW5lbXkucGFyZW50LCBmYWxzZSk7XG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIGVmZmVjdC5zZXRTaWJsaW5nSW5kZXgoZW5lbXkuZ2V0U2libGluZ0luZGV4KCkpO1xuICAgICAgICBlZmZlY3QuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5pi+56S65aSN5rS75pe25Zue6KGA5pWI5p6cXG4gICAgICovXG4gICAgYXN5bmMgY3JlYXRlQWRkSHBFZmZlY3RfcmV2aXZlKCkge1xuICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy9oZWFsXCIpO1xuICAgICAgICBsZXQgZWZmZWN0ID0gY2FpamlUb29scy5jcmVhdGVOb2RlKHByZWZhYiwgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyKTtcbiAgICAgICAgZWZmZWN0LnNldFBvc2l0aW9uKDAsIC0zMCk7XG4gICAgICAgIGVmZmVjdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZihlZmZlY3QuaXNWYWxpZD09ZmFsc2UpIHJldHVybjtcbiAgICAgICAgICAgIGVmZmVjdC5kZXN0cm95KCk7XG4gICAgICAgIH0sIDIpO1xuICAgIH1cbiAgICAvKipcbiAgICAqIOaYvuekuuaZrumAmuWbnuihgOaViOaenFxuICAgICovXG4gICAgYXN5bmMgY3JlYXRlQWRkSHBFZmZlY3Rfbm9ybWFsKCkge1xuICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy9hZGRIcEVmZmVjdFwiKTtcbiAgICAgICAgbGV0IGVmZmVjdCA9IGNhaWppVG9vbHMuY3JlYXRlTm9kZShwcmVmYWIsIEdhbWVNYW5hZ2VyLmluc3RhbmNlLnBsYXllcik7XG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbigwLCAtMzApO1xuICAgICAgICBlZmZlY3QuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYoZWZmZWN0LmlzVmFsaWQ9PWZhbHNlKSByZXR1cm47XG4gICAgICAgICAgICBlZmZlY3QuZGVzdHJveSgpO1xuICAgICAgICB9LCAyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5oCq54mp5omT5Ye7546p5a625pWI5p6cXG4gICAgICogQHBhcmFtIHBhcmVudCBcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gXG4gICAgICogQHBhcmFtIHNjYWxlWCBcbiAgICAgKi9cbiAgICBhc3luYyBzaG93RW5lbXlIaXRFZmZlY3QocGFyZW50OiBjYy5Ob2RlLCBwb3NpdGlvbjogY2MuVmVjMiwgc2NhbGVYOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHJhbmRvbSA9IGNhaWppVG9vbHMucmFuZG9tX2ludCgxLCAyKTtcbiAgICAgICAgbGV0IHByZWZhYiA9IGF3YWl0IGNhaWppVG9vbHMubG9hZFByZWZhYihcInByZWZhYnMvZW5lbXlIaXRFZmZlY3RcIiArIHJhbmRvbSk7XG4gICAgICAgIGxldCBlZmZlY3QgPSBjYWlqaVRvb2xzLmNyZWF0ZU5vZGUocHJlZmFiLCBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXIpO1xuICAgICAgICBlZmZlY3Quc2V0UGFyZW50KHBhcmVudCk7XG4gICAgICAgIGVmZmVjdC5zZXRQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIGVmZmVjdC5zY2FsZVggPSBzY2FsZVg7XG4gICAgICAgIGVmZmVjdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZihlZmZlY3QuaXNWYWxpZD09ZmFsc2UpIHJldHVybjtcbiAgICAgICAgICAgIGVmZmVjdC5kZXN0cm95KCk7XG4gICAgICAgIH0sIDEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDnlJ/miJDnrq3vvIjmgKrnianvvIlcbiAgICAgKiBAcGFyYW0gZW5lbXkgXG4gICAgICogQHBhcmFtIHNwYXduUG9zaXRpb24gXG4gICAgICogQHBhcmFtIHBsYXllclBvc2l0aW9uIFxuICAgICAqIEBwYXJhbSBhbmdsZSBcbiAgICAgKiBAcGFyYW0gZGFtZ2UgXG4gICAgICovXG4gICAgYXN5bmMgY3JlYXRlQXJyb3coZW5lbXk6IGNjLk5vZGUsIHNwYXduUG9zaXRpb246IGNjLlZlYzIsIHBsYXllclBvc2l0aW9uOiBjYy5WZWMyLCBhbmdsZTogbnVtYmVyLCBkYW1nZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwcmVmYWIgPSBhd2FpdCBjYWlqaVRvb2xzLmxvYWRQcmVmYWIoXCJwcmVmYWJzL2Fycm93XCIpO1xuICAgICAgICBsZXQgbm9kZSA9IGNhaWppVG9vbHMuY3JlYXRlTm9kZShwcmVmYWIsIGVuZW15LnBhcmVudCk7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGFycm93KS5kYW1hZ2UgPSBkYW1nZTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoYXJyb3cpLmVuZW15ID0gZW5lbXk7XG4gICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGFycm93KS5wbGF5ZXJQb3NpdGlvbiA9IHBsYXllclBvc2l0aW9uO1xuICAgICAgICBub2RlLnNldFNpYmxpbmdJbmRleChlbmVteS5nZXRTaWJsaW5nSW5kZXgoKSk7XG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oc3Bhd25Qb3NpdGlvbik7XG4gICAgICAgIG5vZGUuYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICBzY3JlZW5TaGFrZSggcmVwZWF0OiBudW1iZXIgPSAxMCwgb2Zmc2V0WDogbnVtYmVyID0gMCwgb2Zmc2V0WTogbnVtYmVyID0gMjApe1xuICAgICAgICBjYy5Ud2Vlbi5zdG9wQWxsQnlUYXJnZXQoY2FtZXJhQ29udHJvbC5pbnN0YW5jZS5jYW1lcmFOb2RlKTtcbiAgICAgICAgY2FtZXJhQ29udHJvbC5pbnN0YW5jZS5ub2RlLnk9MDtcbiAgICAgICAgY2FpamlUb29scy5zY3JlZW5TaGFrZShjYW1lcmFDb250cm9sLmluc3RhbmNlLmNhbWVyYU5vZGUscmVwZWF0LG9mZnNldFgsb2Zmc2V0WSk7XG4gICAgfVxuICAgIGFzeW5jIHNob3dSZXZpdmVGeCh0YXJnZXQ6Y2MuTm9kZSl7XG4gICAgICAgIGxldCBwcmU9YXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy9meF9yZXZpdmVcIik7XG4gICAgICAgIGxldCBmeD1jYy5pbnN0YW50aWF0ZShwcmUpO1xuICAgICAgICBmeC5zZXRQYXJlbnQodGFyZ2V0LnBhcmVudCk7XG4gICAgICAgIGZ4LnNldFNpYmxpbmdJbmRleCh0YXJnZXQuZ2V0U2libGluZ0luZGV4KCkrMSk7XG4gICAgICAgIGZ4LnNldFBvc2l0aW9uKHRhcmdldC54LHRhcmdldC55LTIwKTtcbiAgICAgICAgZnguYWN0aXZlPXRydWU7XG4gICAgfVxufVxuIl19