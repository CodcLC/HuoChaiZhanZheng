"use strict";
cc._RF.push(module, 'ad17bPytDRIYpGu6OVsKux4', 'data');
// scripts/sdk/data.ts

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
exports.data = void 0;
var Constant_1 = require("./Constant");
var data;
(function (data_1) {
    var channel = cc.sys.platform;
    var path_playerbase = 'json/player_data';
    var path_gamebase = 'json/gamebase_data';
    var storageKey = 'dxcs';
    var ST_GameData = "ST_GameDataxx";
    var player_data = null;
    var gamebase_data = null;
    var _dataPool = {};
    /**
     * 初始化数据
     * @param deleteCache 重置
     */
    function init(deleteCache) {
        if (deleteCache === void 0) { deleteCache = false; }
        return __awaiter(this, void 0, Promise, function () {
            var pormises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (cc.sys.isBrowser) {
                            cc.sys.localStorage.clear();
                        }
                        if (player_data && gamebase_data) {
                            return [2 /*return*/, Promise.resolve(['数据已加载'])];
                        }
                        if (!deleteCache) return [3 /*break*/, 2];
                        return [4 /*yield*/, deleteCacheFunc()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        pormises = [];
                        pormises.push(getLocalStorage(), getStorage());
                        if (cc.sys.localStorage.getItem(ST_GameData)) {
                            _dataPool = JSON.parse(cc.sys.localStorage.getItem(ST_GameData));
                        }
                        else {
                            _dataPool[Constant_1.default.ST_Privacy] = "0";
                            _dataPool[Constant_1.default.ST_SignOnceOn] = "0";
                            _dataPool[Constant_1.default.ST_SignOnceOnTime] = "0";
                            _dataPool[Constant_1.default.ST_ShakeOn] = "1";
                        }
                        return [2 /*return*/, Promise.all(pormises)];
                }
            });
        });
    }
    data_1.init = init;
    function gameJson(key1, key2, key3, key4) {
        if (key4 != undefined) {
            return gamebase_data[key1][key2][key3][key4];
        }
        if (key3 != undefined && key4 == undefined) {
            return gamebase_data[key1][key2][key3];
        }
        if (key2 != undefined && key3 == undefined) {
            return gamebase_data[key1][key2];
        }
        if (key1 != undefined && key2 == undefined) {
            return gamebase_data[key1];
        }
    }
    data_1.gameJson = gameJson;
    function getCache(key1, key2, key3, key4) {
        if (key4 != undefined) {
            return player_data[key1][key2][key3][key4];
        }
        if (key3 != undefined && key4 == undefined) {
            return player_data[key1][key2][key3];
        }
        if (key2 != undefined && key3 == undefined) {
            return player_data[key1][key2];
        }
        if (key1 != undefined && key2 == undefined) {
            return player_data[key1];
        }
    }
    data_1.getCache = getCache;
    function updateCache(arg1, arg2, arg3, arg4, arg5) {
        if (arg5 != undefined) {
            player_data[String(arg1)][String(arg2)][String(arg3)][String(arg4)] = arg5;
        }
        if (arg4 != undefined && arg5 == undefined) {
            player_data[String(arg1)][String(arg2)][String(arg3)] = arg4;
        }
        if (arg3 != undefined && arg4 == undefined) {
            player_data[String(arg1)][String(arg2)] = arg3;
        }
        if (arg2 != undefined && arg3 == undefined) {
            player_data[String(arg1)] = arg2;
        }
        setStorage();
    }
    data_1.updateCache = updateCache;
    function _setItem(key, value) {
        // cc.log("---- key, value------", key, value)
        _dataPool[key] = value;
        _save();
    }
    data_1._setItem = _setItem;
    function _getItem(key, defaultValue) {
        if (_dataPool[key]) {
            return _dataPool[key];
        }
        return defaultValue;
    }
    data_1._getItem = _getItem;
    function _save() {
        cc.sys.localStorage.setItem(ST_GameData, JSON.stringify(_dataPool));
    }
    data_1._save = _save;
    /**取ShakeOn开关 */
    function getShakeOn() {
        return _getItem(Constant_1.default.ST_ShakeOn, "1") == "1";
    }
    data_1.getShakeOn = getShakeOn;
    /**存ShakeOn开关 */
    function setShakeOn(value) {
        _setItem(Constant_1.default.ST_ShakeOn, value ? "1" : "0");
    }
    data_1.setShakeOn = setShakeOn;
    function getPrivacyOn() {
        return _getItem(Constant_1.default.ST_Privacy, "1") == "1";
    }
    data_1.getPrivacyOn = getPrivacyOn;
    function setPrivacyOn(value) {
        _setItem(Constant_1.default.ST_Privacy, value ? "1" : "0");
    }
    data_1.setPrivacyOn = setPrivacyOn;
    function getSignOnceOn() {
        var ret = _getItem(Constant_1.default.ST_SignOnceOnTime, "0");
        if (!ret) {
            ret = "0";
        }
        if (new Date().toDateString() != ret) { //每天弹一次
            return false;
        }
        return _getItem(Constant_1.default.ST_SignOnceOn, "1") == "1";
    }
    data_1.getSignOnceOn = getSignOnceOn;
    function setSignOnceOn(value) {
        _setItem(Constant_1.default.ST_SignOnceOnTime, new Date().toDateString());
        _setItem(Constant_1.default.ST_SignOnceOn, value ? "1" : "0");
    }
    data_1.setSignOnceOn = setSignOnceOn;
    function addCache(arg1, arg2, arg3, arg4, arg5) {
        var checkData;
        var baseData;
        var object = new Object();
        if (arg5 != undefined) {
            checkData = player_data[arg1][arg2][arg3][arg4];
            if (!checkData) {
                object[String(arg4)] = arg5;
                Object.assign(player_data[arg1][arg2][arg3], object);
                baseData = JSON.stringify(player_data);
                console.log('添加字段:' + arg4 + '=' + arg5);
            }
            else {
                console.log('添加失败,已存在键值对:' + arg4 + '=' + arg5);
            }
        }
        if (arg4 != undefined && arg5 == undefined) {
            checkData = player_data[arg1][arg2][arg3];
            if (!checkData) {
                object[String(arg3)] = arg4;
                Object.assign(player_data[arg1][arg2], object);
                baseData = JSON.stringify(player_data);
                console.log('添加字段:' + arg3 + '=' + arg4);
            }
            else {
                console.log('添加失败,已存在键值对:' + arg3 + '=' + arg4);
            }
        }
        if (arg3 != undefined && arg4 == undefined) {
            checkData = player_data[arg1][arg2];
            if (!checkData) {
                object[String(arg2)] = arg3;
                Object.assign(player_data[arg1], object);
                baseData = JSON.stringify(player_data);
                console.log('添加字段:' + arg2 + '=' + arg3);
            }
            else {
                console.log('添加失败,已存在键值对:' + arg2 + '=' + arg3);
            }
        }
        if (arg2 != undefined && arg3 == undefined) {
            checkData = player_data[arg1];
            if (!checkData) {
                object[String(arg1)] = arg2;
                Object.assign(player_data, object);
                baseData = JSON.stringify(player_data);
                console.log('添加字段:' + arg1 + '=' + arg2);
            }
            else {
                console.log('添加失败,已存在键值对:' + arg1 + '=' + arg2);
            }
        }
        switch (channel) {
            // case cc.sys.BYTEDANCE_GAME:
            //     //@ts-ignore
            //     tt.setStorage({
            //         key: storageKey,
            //         data: baseData,
            //         success(res: any) {
            //             console.log('字段添加成功!');
            //         },
            //         fail(res: any) {
            //             console.log('字段添加失败!');
            //         }
            //     });
            //     break;
            default:
                console.log('字段添加成功!');
                cc.sys.localStorage.setItem(storageKey, baseData);
                break;
        }
    }
    data_1.addCache = addCache;
    function getStorage() {
        return new Promise(function (resolve, reject) {
            console.log("开始加载玩家数据", channel == cc.sys.WECHAT_GAME);
            switch (channel) {
                case cc.sys.WECHAT_GAME:
                    // @ts-ignore
                    wx.getStorage({
                        key: storageKey,
                        success: function (res) {
                            console.log("成功加载玩家数据~~~~~~~~~~~~~~", storageKey, channel, res);
                            player_data = JSON.parse(res.data);
                            checkData(player_data, resolve);
                        },
                        fail: function (res) {
                            console.log("未能成功加载玩家数据~~~~~~~~~~~~~~", storageKey, channel, res);
                            loadPlayerData(resolve);
                        }
                    });
                    break;
                // case cc.sys.BYTEDANCE_GAME:
                //     // @ts-ignore
                //     tt.getStorage({
                //         key: storageKey,
                //         success(res: any) {
                //             player_data = JSON.parse(res.data);
                //             checkData(player_data, resolve);
                //         },
                //         fail(res: any) {
                //             loadPlayerData(resolve);
                //         }
                //     });
                //     break;
                // case cc.sys.QQ_PLAY:
                //     // @ts-ignore
                //     qq.getStorage({
                //         key: storageKey,
                //         success(res: any) {
                //             player_data = JSON.parse(res.data);
                //             checkData(player_data, resolve);
                //         },
                //         fail(res: any) {
                //             loadPlayerData(resolve);
                //         }
                //     });
                //     break;
                default:
                    try {
                        //从本地读取数据
                        var baseData = cc.sys.localStorage.getItem(storageKey);
                        //将string转换成json
                        player_data = JSON.parse(baseData);
                        checkData(player_data, resolve);
                    }
                    catch (error_temp) {
                        console.log(error_temp);
                    }
                    break;
            }
        });
    }
    function checkData(data, cb) {
        if (data) {
            cb('<加载缓存玩家数据>');
        }
        else {
            loadPlayerData(cb);
        }
    }
    function loadPlayerData(cb) {
        load(path_playerbase).then(function (base) {
            player_data = base;
            cb('<加载缓存玩家数据>');
        });
    }
    function getLocalStorage() {
        return new Promise(function (resolve, reject) {
            load(path_gamebase).then(function (base) {
                gamebase_data = base;
                resolve('加载游戏数据');
            });
        });
    }
    function setStorage() {
        var baseData = JSON.stringify(player_data);
        console.log("开始保存玩家数据", channel == cc.sys.WECHAT_GAME);
        switch (channel) {
            case cc.sys.WECHAT_GAME:
                // @ts-ignore
                wx.setStorage({
                    key: storageKey, data: baseData
                });
                break;
            // case cc.sys.BYTEDANCE_GAME:
            //     // @ts-ignore
            //     tt.setStorage({
            //         key: storageKey, data: baseData
            //     });
            //     break;
            // case cc.sys.QQ_PLAY:
            //     // @ts-ignore
            //     qq.setStorage({
            //         key: storageKey, data: baseData
            //     });
            //     break;
            default:
                cc.sys.localStorage.setItem(storageKey, baseData);
                break;
        }
    }
    function deleteCacheFunc() {
        return new Promise(function (resolve, reject) {
            switch (channel) {
                case cc.sys.WECHAT_GAME:
                    // @ts-ignore
                    wx.clearStorage({
                        success: function (res) {
                            resolve();
                        },
                        fail: function (res) {
                            reject();
                        }
                    });
                    break;
                // case cc.sys.BYTEDANCE_GAME:
                //     // @ts-ignore
                //     tt.clearStorage({
                //         success(res: any) {
                //             resolve();
                //         },
                //         fail(res: any) {
                //             reject();
                //         }
                //     });
                //     break;
                // case cc.sys.QQ_PLAY:
                //     //@ts-ignore
                //     qq.clearStorage({
                //         success(res: any) {
                //             resolve();
                //         },
                //         fail(res: any) {
                //             reject();
                //         }
                //     });
                //     break;
                default:
                    cc.sys.localStorage.removeItem(storageKey);
                    resolve();
                    break;
            }
        });
    }
    function load(path) {
        return new Promise(function (resolve, reject) {
            cc.resources.load(path, cc.JsonAsset, function (err, object) {
                if (err) {
                    console.log(err);
                    resolve("\u52A0\u8F7D:" + path + "\u5931\u8D25!");
                }
                else {
                    resolve(object.json);
                }
            });
        });
    }
})(data = exports.data || (exports.data = {}));

cc._RF.pop();