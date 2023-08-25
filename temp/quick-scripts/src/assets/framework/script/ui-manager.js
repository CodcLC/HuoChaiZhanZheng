"use strict";
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