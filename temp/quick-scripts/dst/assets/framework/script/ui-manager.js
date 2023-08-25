
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/script/ui-manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '73b92FKbC1CGJnGoHrDlsci', 'ui-manager');
// framework/script/ui-manager.ts

"use strict";
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
exports.uiMgr = void 0;
var ui_base_1 = require("./ui-base");
var TAG = 'ui-manager.ts';
var UIROOT_ZINDEX = 999;
var UIROOT_NAME = 'ui-root';
var DEFAULT_CANVAS = 'ui-default-node';
var UIMap = /** @class */ (function () {
    function UIMap() {
    }
    return UIMap;
}());
var uiManager = /** @class */ (function () {
    /**
    构造函数 */
    function uiManager() {
        /**
        UI 根节点 */
        this._uiRoot = null;
        /**
        UI 配置表 Map */
        this._uiConfigMap = null;
        /**
        UI 配置信息 Map */
        this._uiMap = null;
        /**
        UI 画布节点 Map*/
        this._canvasMap = null;
        this._uiConfigMap = new Map();
        this._uiMap = new Map();
        this._canvasMap = new Map();
    }
    /**
     * 获取UI配置信息
     * @param uiname
     */
    uiManager.prototype._getMUI = function (uiname) {
        return __awaiter(this, void 0, void 0, function () {
            var mui, config, prefab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mui = this._uiMap.get(uiname);
                        if (!!mui) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getConfig(uiname)];
                    case 1:
                        config = _a.sent();
                        if (!config) return [3 /*break*/, 3];
                        return [4 /*yield*/, loadPrefab(config.file_url, config.bundle)];
                    case 2:
                        prefab = _a.sent();
                        mui = new UIMap();
                        mui.prefab = prefab;
                        mui.config = config;
                        mui.ui = null;
                        prefab.addRef();
                        this._uiMap.set(uiname, mui);
                        return [3 /*break*/, 4];
                    case 3:
                        cc.warn(TAG, "not find " + uiname + " in file: ui-config");
                        _a.label = 4;
                    case 4: return [2 /*return*/, mui];
                }
            });
        });
    };
    /**
     * 获得UI根节点
     * @returns cc.Node
     */
    uiManager.prototype.getUIRoot = function () {
        if (!this._uiRoot) {
            this._uiRoot = new cc.Node(UIROOT_NAME);
            cc.director.getScene().addChild(this._uiRoot, UIROOT_ZINDEX);
            cc.game.addPersistRootNode(this._uiRoot);
            this._uiRoot.setAnchorPoint(cc.v2(0, 0));
            this._uiRoot.setPosition(cc.v2(0, 0));
            this._uiRoot.setContentSize(cc.winSize);
        }
        return this._uiRoot;
    };
    /**
     * 构建一个UI画布节点
     * @param cname 画布节点名称
     * @returns cc.Node
     */
    uiManager.prototype._getCanvas = function (cname) {
        if (cname === void 0) { cname = DEFAULT_CANVAS; }
        if (!cname) {
            cname = DEFAULT_CANVAS;
        }
        var canvas = this._canvasMap.get(cname);
        if (!canvas) {
            canvas = new cc.Node(cname);
            this.getUIRoot().addChild(canvas);
            canvas.setAnchorPoint(cc.v2(0, 0));
            var widget = canvas.addComponent(cc.Widget);
            widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
            widget.top = 0;
            widget.bottom = 0;
            widget.left = 0;
            widget.right = 0;
            this._canvasMap.set(cname, canvas);
        }
        return canvas;
    };
    /**
     * 构建一个UI
     * @param uiname UI名称
     * @param mui UI配置信息
     * @param rootNode 自定义根节点
     * @param create 是否创建
     * @returns UIBase
     */
    uiManager.prototype._getUI = function (uiname, mui, rootNode, create) {
        if (create === void 0) { create = false; }
        return __awaiter(this, void 0, void 0, function () {
            var ui, node, canvas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ui = mui.ui;
                        if (!(!ui && create)) return [3 /*break*/, 2];
                        node = cc.instantiate(mui.prefab);
                        canvas = rootNode ? rootNode : this._getCanvas(mui.config.canvas);
                        canvas.addChild(node);
                        node.active = false;
                        node.setPosition(rootNode ? cc.v2(0, 0) : cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
                        ui = node.getComponent(ui_base_1.default) || node.getComponentInChildren(ui_base_1.default);
                        if (!ui) {
                            ui = node.addComponent(ui_base_1.default);
                        }
                        ui._setRootNode(node);
                        ui._setCanvas(canvas);
                        ui._setUIName(uiname);
                        return [4 /*yield*/, ui.onUICreate()];
                    case 1:
                        _a.sent();
                        mui.ui = ui;
                        this._uiMap.set(uiname, mui);
                        _a.label = 2;
                    case 2: return [2 /*return*/, ui];
                }
            });
        });
    };
    /**
     * 打开指定UI
     * @param uiname UI名称
     * @param rootNode 根节点
     * @param preload 预加载
     * @param args 启动参数
     * @returns Promise<UIBase>
     */
    uiManager.prototype.openUI = function (uiname, rootNode, preload) {
        if (rootNode === void 0) { rootNode = null; }
        if (preload === void 0) { preload = false; }
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var ui, mui;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ui = null;
                                    return [4 /*yield*/, this._getMUI(uiname)];
                                case 1:
                                    mui = _a.sent();
                                    if (!mui) return [3 /*break*/, 4];
                                    ui = mui.ui;
                                    mui.preload = preload;
                                    if (!!ui) return [3 /*break*/, 3];
                                    return [4 /*yield*/, this._getUI(uiname, mui, rootNode, true)];
                                case 2:
                                    ui = _a.sent();
                                    mui.relyon_scnene = rootNode ? true : false;
                                    _a.label = 3;
                                case 3:
                                    if (ui && !preload) {
                                        ui._setActive(true);
                                        ui.onUILaunch.apply(ui, args);
                                    }
                                    _a.label = 4;
                                case 4:
                                    resolve(ui);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 关闭指定UI
     * @param uiname UI名称
     * @param release 释放对象
     */
    uiManager.prototype.closeUI = function (uiname, release) {
        if (release === void 0) { release = false; }
        var mui = this._uiMap.get(uiname);
        if (mui) {
            var ui = mui.ui;
            if (ui) {
                ui.onUIClose();
                ui._setActive(false);
            }
            if (release) {
                console.log('release: ' + uiname);
                this.releaseUI(uiname);
            }
        }
    };
    /**
     * 设置UI索引,UI不会被关闭释放
     * @param uiname
     * @param z_index
     */
    uiManager.prototype.setUIzIndex = function (uiname, z_index) {
        if (z_index === void 0) { z_index = 0; }
        var mui = this._uiMap.get(uiname);
        if (mui) {
            var ui = mui.ui;
            if (ui) {
                ui._setSiblingIndex(z_index);
                ui.onIndexChange(z_index);
            }
        }
    };
    /**
     * 释放指定UI
     * @param uiname
     */
    uiManager.prototype.releaseUI = function (uiname) {
        var mui = this._uiMap.get(uiname);
        if (mui) {
            var ui = mui.ui;
            if (ui) {
                ui.onUIRelease();
                ui.node.destroy();
                mui.prefab.decRef();
                mui.prefab = null;
                mui.ui = null;
                mui.config = null;
                this._uiMap.delete(uiname);
            }
        }
    };
    /**
     * 自动释放依赖场景的UI
     */
    uiManager.prototype.autoRelease = function () {
        var delete_keys = [];
        this._uiMap.forEach(function (mui, key) {
            if (mui.relyon_scnene) {
                delete_keys.push(key);
            }
        });
        if (delete_keys.length > 0) {
            for (var i = 0; i < delete_keys.length; i++) {
                console.log('auto release: ' + delete_keys[i]);
                this.releaseUI(delete_keys[i]);
            }
        }
    };
    /**
     * 获取UI配置表单
     * @param uiname
     */
    uiManager.prototype.getConfig = function (uiname) {
        var _this = this;
        return new Promise(function (resolve) {
            var uiconf = _this._uiConfigMap.get(uiname);
            if (uiconf) {
                resolve(uiconf);
            }
            else {
                cc.resources.load('json/ui-config', cc.JsonAsset, function (err, asset) {
                    if (!err && asset) {
                        _this._uiConfigMap.set(uiname, asset.json.ui[uiname]);
                        resolve(_this._uiConfigMap.get(uiname));
                    }
                    else {
                        cc.warn(TAG, "not find ui-config in " + cc.resources.name);
                        resolve(null);
                    }
                });
            }
        });
    };
    return uiManager;
}());
/**
* 加载预制体
* @param url
* @param bundle
* @returns Promise<cc.Prefab>
*/
function loadPrefab(url, bundle) {
    return new Promise(function (resolve) {
        if (bundle) {
            var asset_bundle = cc.assetManager.getBundle(bundle);
            if (asset_bundle) {
                asset_bundle.load(url, cc.Prefab, function (err, prefab) {
                    if (!err && prefab) {
                        resolve(prefab);
                    }
                    else {
                        resolve(null);
                        cc.warn(TAG, "not find " + url + " in " + bundle);
                    }
                });
            }
            else {
                cc.assetManager.loadBundle(bundle, function (err, _bundle) {
                    if (!err && _bundle) {
                        _bundle.load(url, cc.Prefab, function (err, prefab) {
                            if (!err && prefab) {
                                resolve(prefab);
                            }
                            else {
                                resolve(null);
                                cc.warn(TAG, "not find " + url + " in " + bundle);
                            }
                        });
                    }
                    else {
                        cc.warn(TAG, "not find bundle " + bundle);
                    }
                });
            }
        }
        else {
            cc.resources.load(url, cc.Prefab, function (err, prefab) {
                if (!err && prefab) {
                    resolve(prefab);
                }
                else {
                    resolve(null);
                    console.log(TAG, "not find " + url + " in " + cc.resources.name);
                }
            });
        }
    });
}
exports.uiMgr = new uiManager();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxzY3JpcHRcXHVpLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQStCO0FBQy9CLElBQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQztBQUM1QixJQUFNLGFBQWEsR0FBRyxHQUFHLENBQUM7QUFDMUIsSUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQzlCLElBQU0sY0FBYyxHQUFHLGlCQUFpQixDQUFDO0FBWXpDO0lBQUE7SUFnQkEsQ0FBQztJQUFELFlBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBO0FBQ0Q7SUFhSTtXQUNPO0lBQ1A7UUFkQTtpQkFDUztRQUNELFlBQU8sR0FBWSxJQUFJLENBQUM7UUFDaEM7cUJBQ2E7UUFDTCxpQkFBWSxHQUEwQixJQUFJLENBQUM7UUFDbkQ7c0JBQ2M7UUFDTixXQUFNLEdBQXVCLElBQUksQ0FBQztRQUMxQztxQkFDYTtRQUNMLGVBQVUsR0FBeUIsSUFBSSxDQUFDO1FBSTVDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBaUIsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFDO0lBQ2pELENBQUM7SUFDRDs7O09BR0c7SUFDVywyQkFBTyxHQUFyQixVQUFzQixNQUFjOzs7Ozs7d0JBQzVCLEdBQUcsR0FBVSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDckMsQ0FBQyxHQUFHLEVBQUosd0JBQUk7d0JBQ1MscUJBQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQXJDLE1BQU0sR0FBRyxTQUE0Qjs2QkFDckMsTUFBTSxFQUFOLHdCQUFNO3dCQUNPLHFCQUFN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SSxDQUFDLEdBQUcsRUFBRSxxQkFBbUIsTUFBUSxDQUFDLENBQUM7cUJBQzdDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjthQUFNO1lBQ0gsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxHQUFHLEVBQUUsTUFBaUI7Z0JBQ3JELElBQUksQ0FBQyxHQUFHLElBQUksTUFBTSxFQUFFO29CQUNoQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ25CO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxjQUFZLEdBQUcsWUFBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQU0sQ0FBQyxDQUFDO2lCQUMvRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDWSxRQUFBLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVJQmFzZSBmcm9tIFwiLi91aS1iYXNlXCI7XG5jb25zdCBUQUcgPSAndWktbWFuYWdlci50cyc7XG5jb25zdCBVSVJPT1RfWklOREVYID0gOTk5O1xuY29uc3QgVUlST09UX05BTUUgPSAndWktcm9vdCc7XG5jb25zdCBERUZBVUxUX0NBTlZBUyA9ICd1aS1kZWZhdWx0LW5vZGUnO1xuaW50ZXJmYWNlIHVpQ29uZmlnIHtcbiAgICAvKiogXG4gICAg6aKE5Yi25L2T5paH5Lu25L2N572uICovXG4gICAgZmlsZV91cmw6IHN0cmluZztcbiAgICAvKipcbiAgICDmiYDlsZ7otYTmupDljIUqL1xuICAgIGJ1bmRsZTogc3RyaW5nO1xuICAgIC8qKlxuICAgIOaJgOWxnueUu+W4g+iKgueCuSovXG4gICAgY2FudmFzOiBzdHJpbmc7XG59XG5jbGFzcyBVSU1hcCB7XG4gICAgLyoqIFxuICAgIOmihOWItuS9kyAqL1xuICAgIHByZWZhYjogY2MuUHJlZmFiO1xuICAgIC8qKiBcbiAgICBVSeWvueixoSAqL1xuICAgIHVpOiBVSUJhc2U7XG4gICAgLyoqXG4gICAgVUnphY3nva7kv6Hmga8qL1xuICAgIGNvbmZpZzogdWlDb25maWc7XG4gICAgLyoqIFxuICAgIOmihOWKoOi9vSAqL1xuICAgIHByZWxvYWQ/OiBib29sZWFuO1xuICAgIC8qKlxuICAgIOaYr+WQpuS+nei1luWcuuaZryovXG4gICAgcmVseW9uX3NjbmVuZT86IGJvb2xlYW5cbn1cbmNsYXNzIHVpTWFuYWdlciB7XG4gICAgLyoqIFxuICAgIFVJIOagueiKgueCuSAqL1xuICAgIHByaXZhdGUgX3VpUm9vdDogY2MuTm9kZSA9IG51bGw7XG4gICAgLyoqXG4gICAgVUkg6YWN572u6KGoIE1hcCAqL1xuICAgIHByaXZhdGUgX3VpQ29uZmlnTWFwOiBNYXA8c3RyaW5nLCB1aUNvbmZpZz4gPSBudWxsO1xuICAgIC8qKiBcbiAgICBVSSDphY3nva7kv6Hmga8gTWFwICovXG4gICAgcHJpdmF0ZSBfdWlNYXA6IE1hcDxzdHJpbmcsIFVJTWFwPiA9IG51bGw7XG4gICAgLyoqXG4gICAgVUkg55S75biD6IqC54K5IE1hcCovXG4gICAgcHJpdmF0ZSBfY2FudmFzTWFwOiBNYXA8c3RyaW5nLCBjYy5Ob2RlPiA9IG51bGw7XG4gICAgLyoqIFxuICAgIOaehOmAoOWHveaVsCAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl91aUNvbmZpZ01hcCA9IG5ldyBNYXA8c3RyaW5nLCB1aUNvbmZpZz4oKTtcbiAgICAgICAgdGhpcy5fdWlNYXAgPSBuZXcgTWFwPHN0cmluZywgVUlNYXA+KCk7XG4gICAgICAgIHRoaXMuX2NhbnZhc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBjYy5Ob2RlPigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5ZVSemFjee9ruS/oeaBr1xuICAgICAqIEBwYXJhbSB1aW5hbWUgXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0TVVJKHVpbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBtdWk6IFVJTWFwID0gdGhpcy5fdWlNYXAuZ2V0KHVpbmFtZSk7XG4gICAgICAgIGlmICghbXVpKSB7XG4gICAgICAgICAgICBsZXQgY29uZmlnID0gYXdhaXQgdGhpcy5nZXRDb25maWcodWluYW1lKTtcbiAgICAgICAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgbG9hZFByZWZhYihjb25maWcuZmlsZV91cmwsIGNvbmZpZy5idW5kbGUpO1xuICAgICAgICAgICAgICAgIG11aSA9IG5ldyBVSU1hcCgpO1xuICAgICAgICAgICAgICAgIG11aS5wcmVmYWIgPSBwcmVmYWI7XG4gICAgICAgICAgICAgICAgbXVpLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgICAgICAgICBtdWkudWkgPSBudWxsO1xuICAgICAgICAgICAgICAgIHByZWZhYi5hZGRSZWYoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91aU1hcC5zZXQodWluYW1lLCBtdWkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuKFRBRywgYG5vdCBmaW5kICR7dWluYW1lfSBpbiBmaWxlOiB1aS1jb25maWdgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXVpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflvpdVSeagueiKgueCuVxuICAgICAqIEByZXR1cm5zIGNjLk5vZGVcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldFVJUm9vdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl91aVJvb3QpIHtcbiAgICAgICAgICAgIHRoaXMuX3VpUm9vdCA9IG5ldyBjYy5Ob2RlKFVJUk9PVF9OQU1FKTtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuYWRkQ2hpbGQodGhpcy5fdWlSb290LCBVSVJPT1RfWklOREVYKTtcbiAgICAgICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMuX3VpUm9vdCk7XG4gICAgICAgICAgICB0aGlzLl91aVJvb3Quc2V0QW5jaG9yUG9pbnQoY2MudjIoMCwgMCkpO1xuICAgICAgICAgICAgdGhpcy5fdWlSb290LnNldFBvc2l0aW9uKGNjLnYyKDAsIDApKTtcbiAgICAgICAgICAgIHRoaXMuX3VpUm9vdC5zZXRDb250ZW50U2l6ZShjYy53aW5TaXplKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdWlSb290O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmnoTlu7rkuIDkuKpVSeeUu+W4g+iKgueCuVxuICAgICAqIEBwYXJhbSBjbmFtZSDnlLvluIPoioLngrnlkI3np7BcbiAgICAgKiBAcmV0dXJucyBjYy5Ob2RlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZ2V0Q2FudmFzKGNuYW1lOiBzdHJpbmcgPSBERUZBVUxUX0NBTlZBUykge1xuICAgICAgICBpZiAoIWNuYW1lKSB7XG4gICAgICAgICAgICBjbmFtZSA9IERFRkFVTFRfQ0FOVkFTO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjYW52YXM6IGNjLk5vZGUgPSB0aGlzLl9jYW52YXNNYXAuZ2V0KGNuYW1lKTtcbiAgICAgICAgaWYgKCFjYW52YXMpIHtcbiAgICAgICAgICAgIGNhbnZhcyA9IG5ldyBjYy5Ob2RlKGNuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0VUlSb290KCkuYWRkQ2hpbGQoY2FudmFzKTtcbiAgICAgICAgICAgIGNhbnZhcy5zZXRBbmNob3JQb2ludChjYy52MigwLCAwKSk7XG4gICAgICAgICAgICBsZXQgd2lkZ2V0ID0gY2FudmFzLmFkZENvbXBvbmVudChjYy5XaWRnZXQpO1xuICAgICAgICAgICAgd2lkZ2V0LmFsaWduTW9kZSA9IGNjLldpZGdldC5BbGlnbk1vZGUuT05fV0lORE9XX1JFU0laRTtcbiAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcbiAgICAgICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gdHJ1ZTtcbiAgICAgICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IHRydWU7XG4gICAgICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHdpZGdldC50b3AgPSAwO1xuICAgICAgICAgICAgd2lkZ2V0LmJvdHRvbSA9IDA7XG4gICAgICAgICAgICB3aWRnZXQubGVmdCA9IDA7XG4gICAgICAgICAgICB3aWRnZXQucmlnaHQgPSAwO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzTWFwLnNldChjbmFtZSwgY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FudmFzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmnoTlu7rkuIDkuKpVSVxuICAgICAqIEBwYXJhbSB1aW5hbWUgVUnlkI3np7BcbiAgICAgKiBAcGFyYW0gbXVpIFVJ6YWN572u5L+h5oGvXG4gICAgICogQHBhcmFtIHJvb3ROb2RlIOiHquWumuS5ieagueiKgueCuVxuICAgICAqIEBwYXJhbSBjcmVhdGUg5piv5ZCm5Yib5bu6XG4gICAgICogQHJldHVybnMgVUlCYXNlXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBfZ2V0VUkodWluYW1lOiBzdHJpbmcsIG11aTogVUlNYXAsIHJvb3ROb2RlOiBjYy5Ob2RlLCBjcmVhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgdWkgPSBtdWkudWk7XG4gICAgICAgIGlmICghdWkgJiYgY3JlYXRlKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKG11aS5wcmVmYWIpO1xuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IHJvb3ROb2RlID8gcm9vdE5vZGUgOiB0aGlzLl9nZXRDYW52YXMobXVpLmNvbmZpZy5jYW52YXMpO1xuICAgICAgICAgICAgY2FudmFzLmFkZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocm9vdE5vZGUgPyBjYy52MigwLCAwKSA6IGNjLnYyKGNjLndpblNpemUud2lkdGggLyAyLCBjYy53aW5TaXplLmhlaWdodCAvIDIpKTtcbiAgICAgICAgICAgIHVpID0gbm9kZS5nZXRDb21wb25lbnQoVUlCYXNlKSB8fCBub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oVUlCYXNlKTtcbiAgICAgICAgICAgIGlmICghdWkpIHtcbiAgICAgICAgICAgICAgICB1aSA9IG5vZGUuYWRkQ29tcG9uZW50KFVJQmFzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1aS5fc2V0Um9vdE5vZGUobm9kZSk7XG4gICAgICAgICAgICB1aS5fc2V0Q2FudmFzKGNhbnZhcyk7XG4gICAgICAgICAgICB1aS5fc2V0VUlOYW1lKHVpbmFtZSk7XG4gICAgICAgICAgICBhd2FpdCB1aS5vblVJQ3JlYXRlKCk7XG4gICAgICAgICAgICBtdWkudWkgPSB1aTtcbiAgICAgICAgICAgIHRoaXMuX3VpTWFwLnNldCh1aW5hbWUsIG11aSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmiZPlvIDmjIflrppVSVxuICAgICAqIEBwYXJhbSB1aW5hbWUgVUnlkI3np7BcbiAgICAgKiBAcGFyYW0gcm9vdE5vZGUg5qC56IqC54K5XG4gICAgICogQHBhcmFtIHByZWxvYWQg6aKE5Yqg6L29XG4gICAgICogQHBhcmFtIGFyZ3Mg5ZCv5Yqo5Y+C5pWwXG4gICAgICogQHJldHVybnMgUHJvbWlzZTxVSUJhc2U+XG4gICAgICovXG4gICAgYXN5bmMgb3BlblVJKHVpbmFtZTogc3RyaW5nLCByb290Tm9kZTogY2MuTm9kZSA9IG51bGwsIHByZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZSwgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFVJQmFzZT4oYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGxldCB1aTogVUlCYXNlID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBtdWk6IFVJTWFwID0gYXdhaXQgdGhpcy5fZ2V0TVVJKHVpbmFtZSk7XG4gICAgICAgICAgICBpZiAobXVpKSB7XG4gICAgICAgICAgICAgICAgdWkgPSBtdWkudWk7XG4gICAgICAgICAgICAgICAgbXVpLnByZWxvYWQgPSBwcmVsb2FkO1xuICAgICAgICAgICAgICAgIGlmICghdWkpIHtcbiAgICAgICAgICAgICAgICAgICAgdWkgPSBhd2FpdCB0aGlzLl9nZXRVSSh1aW5hbWUsIG11aSwgcm9vdE5vZGUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBtdWkucmVseW9uX3NjbmVuZSA9IHJvb3ROb2RlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodWkgJiYgIXByZWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdWkuX3NldEFjdGl2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdWkub25VSUxhdW5jaCguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKHVpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWFs+mXreaMh+WumlVJXG4gICAgICogQHBhcmFtIHVpbmFtZSBVSeWQjeensFxuICAgICAqIEBwYXJhbSByZWxlYXNlIOmHiuaUvuWvueixoVxuICAgICAqL1xuICAgIGNsb3NlVUkodWluYW1lOiBzdHJpbmcsIHJlbGVhc2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgbXVpOiBVSU1hcCA9IHRoaXMuX3VpTWFwLmdldCh1aW5hbWUpO1xuICAgICAgICBpZiAobXVpKSB7XG4gICAgICAgICAgICBsZXQgdWkgPSBtdWkudWk7XG4gICAgICAgICAgICBpZiAodWkpIHtcbiAgICAgICAgICAgICAgICB1aS5vblVJQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB1aS5fc2V0QWN0aXZlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWxlYXNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbGVhc2U6ICcgKyB1aW5hbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZVVJKHVpbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6+572uVUnntKLlvJUsVUnkuI3kvJrooqvlhbPpl63ph4rmlL5cbiAgICAgKiBAcGFyYW0gdWluYW1lIFxuICAgICAqIEBwYXJhbSB6X2luZGV4XG4gICAgICovXG4gICAgc2V0VUl6SW5kZXgodWluYW1lOiBzdHJpbmcsIHpfaW5kZXg6IG51bWJlciA9IDApIHtcbiAgICAgICAgbGV0IG11aTogVUlNYXAgPSB0aGlzLl91aU1hcC5nZXQodWluYW1lKTtcbiAgICAgICAgaWYgKG11aSkge1xuICAgICAgICAgICAgbGV0IHVpID0gbXVpLnVpO1xuICAgICAgICAgICAgaWYgKHVpKSB7XG4gICAgICAgICAgICAgICAgdWkuX3NldFNpYmxpbmdJbmRleCh6X2luZGV4KTtcbiAgICAgICAgICAgICAgICB1aS5vbkluZGV4Q2hhbmdlKHpfaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmHiuaUvuaMh+WumlVJXG4gICAgICogQHBhcmFtIHVpbmFtZSBcbiAgICAgKi9cbiAgICByZWxlYXNlVUkodWluYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IG11aTogVUlNYXAgPSB0aGlzLl91aU1hcC5nZXQodWluYW1lKTtcbiAgICAgICAgaWYgKG11aSkge1xuICAgICAgICAgICAgbGV0IHVpID0gbXVpLnVpO1xuICAgICAgICAgICAgaWYgKHVpKSB7XG4gICAgICAgICAgICAgICAgdWkub25VSVJlbGVhc2UoKTtcbiAgICAgICAgICAgICAgICB1aS5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBtdWkucHJlZmFiLmRlY1JlZigpO1xuICAgICAgICAgICAgICAgIG11aS5wcmVmYWIgPSBudWxsO1xuICAgICAgICAgICAgICAgIG11aS51aSA9IG51bGw7XG4gICAgICAgICAgICAgICAgbXVpLmNvbmZpZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5fdWlNYXAuZGVsZXRlKHVpbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog6Ieq5Yqo6YeK5pS+5L6d6LWW5Zy65pmv55qEVUlcbiAgICAgKi9cbiAgICBhdXRvUmVsZWFzZSgpIHtcbiAgICAgICAgbGV0IGRlbGV0ZV9rZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICB0aGlzLl91aU1hcC5mb3JFYWNoKChtdWk6IFVJTWFwLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKG11aS5yZWx5b25fc2NuZW5lKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlX2tleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRlbGV0ZV9rZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVsZXRlX2tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYXV0byByZWxlYXNlOiAnICsgZGVsZXRlX2tleXNbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVsZWFzZVVJKGRlbGV0ZV9rZXlzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5ZVSemFjee9ruihqOWNlVxuICAgICAqIEBwYXJhbSB1aW5hbWUgXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRDb25maWcodWluYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHVpQ29uZmlnPigocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHVpY29uZiA9IHRoaXMuX3VpQ29uZmlnTWFwLmdldCh1aW5hbWUpO1xuICAgICAgICAgICAgaWYgKHVpY29uZikge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodWljb25mKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoJ2pzb24vdWktY29uZmlnJywgY2MuSnNvbkFzc2V0LCAoZXJyLCBhc3NldDogY2MuSnNvbkFzc2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXJyICYmIGFzc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91aUNvbmZpZ01hcC5zZXQodWluYW1lLCBhc3NldC5qc29uLnVpW3VpbmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLl91aUNvbmZpZ01hcC5nZXQodWluYW1lKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFRBRywgYG5vdCBmaW5kIHVpLWNvbmZpZyBpbiAke2NjLnJlc291cmNlcy5uYW1lfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiog5Yqg6L296aKE5Yi25L2TXG4qIEBwYXJhbSB1cmwgXG4qIEBwYXJhbSBidW5kbGUgXG4qIEByZXR1cm5zIFByb21pc2U8Y2MuUHJlZmFiPlxuKi9cbmZ1bmN0aW9uIGxvYWRQcmVmYWIodXJsOiBzdHJpbmcsIGJ1bmRsZT86IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxjYy5QcmVmYWI+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgIGlmIChidW5kbGUpIHtcbiAgICAgICAgICAgIGxldCBhc3NldF9idW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZSk7XG4gICAgICAgICAgICBpZiAoYXNzZXRfYnVuZGxlKSB7XG4gICAgICAgICAgICAgICAgYXNzZXRfYnVuZGxlLmxvYWQodXJsLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYjogY2MuUHJlZmFiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXJyICYmIHByZWZhYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwcmVmYWIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oVEFHLCBgbm90IGZpbmQgJHt1cmx9IGluICR7YnVuZGxlfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQnVuZGxlKGJ1bmRsZSwgKGVyciwgX2J1bmRsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBfYnVuZGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYnVuZGxlLmxvYWQodXJsLCBjYy5QcmVmYWIsIChlcnIsIHByZWZhYjogY2MuUHJlZmFiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlcnIgJiYgcHJlZmFiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFRBRywgYG5vdCBmaW5kICR7dXJsfSBpbiAke2J1bmRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oVEFHLCBgbm90IGZpbmQgYnVuZGxlICR7YnVuZGxlfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZCh1cmwsIGNjLlByZWZhYiwgKGVyciwgcHJlZmFiOiBjYy5QcmVmYWIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVyciAmJiBwcmVmYWIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwcmVmYWIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFRBRywgYG5vdCBmaW5kICR7dXJsfSBpbiAke2NjLnJlc291cmNlcy5uYW1lfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgY29uc3QgdWlNZ3IgPSBuZXcgdWlNYW5hZ2VyKCk7XG4iXX0=