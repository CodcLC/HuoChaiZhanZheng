
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/sdk/data.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2RrXFxkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUFrQztBQUVsQyxJQUFpQixJQUFJLENBOGRwQjtBQTlkRCxXQUFpQixNQUFJO0lBQ2pCLElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ2hDLElBQU0sZUFBZSxHQUFHLGtCQUFrQixDQUFDO0lBQzNDLElBQU0sYUFBYSxHQUFHLG9CQUFvQixDQUFDO0lBQzNDLElBQU0sVUFBVSxHQUFXLE1BQU0sQ0FBQTtJQUNqQyxJQUFNLFdBQVcsR0FBVSxlQUFlLENBQUE7SUFFMUMsSUFBSSxXQUFXLEdBQVcsSUFBSSxDQUFDO0lBQy9CLElBQUksYUFBYSxHQUFXLElBQUksQ0FBQztJQUVqQyxJQUFJLFNBQVMsR0FBUSxFQUFFLENBQUM7SUFDeEI7OztPQUdHO0lBQ0gsU0FBc0IsSUFBSSxDQUFDLFdBQTRCO1FBQTVCLDRCQUFBLEVBQUEsbUJBQTRCO3VDQUFHLE9BQU87Ozs7O3dCQUU3RCxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFDOzRCQUNqQixFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQzt5QkFDL0I7d0JBRUQsSUFBSSxXQUFXLElBQUksYUFBYSxFQUFFOzRCQUM5QixzQkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQzt5QkFDckM7NkJBQ0csV0FBVyxFQUFYLHdCQUFXO3dCQUNYLHFCQUFNLGVBQWUsRUFBRSxFQUFBOzt3QkFBdkIsU0FBdUIsQ0FBQzs7O3dCQUV4QixRQUFRLEdBQXNCLEVBQUUsQ0FBQzt3QkFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO3dCQUUv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QkFDcEIsd0JBQXdCO2dCQUN4Qiw4QkFBOEI7Z0JBQzlCLHlCQUF5QjtnQkFDekIsYUFBYTtnQkFDYiwyQkFBMkI7Z0JBQzNCLHdCQUF3QjtnQkFDeEIsWUFBWTtnQkFDWixVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsdUJBQXVCO2dCQUN2QixtQkFBbUI7Z0JBQ25CLHdCQUF3QjtnQkFDeEIsOEJBQThCO2dCQUM5Qix5QkFBeUI7Z0JBQ3pCLGFBQWE7Z0JBQ2IsMkJBQTJCO2dCQUMzQix3QkFBd0I7Z0JBQ3hCLFlBQVk7Z0JBQ1osVUFBVTtnQkFDVixhQUFhO2dCQUNiO29CQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDM0MsT0FBTyxFQUFFLENBQUM7b0JBQ1YsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsU0FBUyxJQUFJLENBQUMsSUFBWTtRQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBaUIsRUFBRSxNQUFnQjtZQUNuRCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFDLEdBQUcsRUFBRSxNQUFXO2dCQUNuRCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixPQUFPLENBQUMsa0JBQU0sSUFBSSxrQkFBSyxDQUFDLENBQUM7aUJBQzVCO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3hCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDLEVBOWRnQixJQUFJLEdBQUosWUFBSSxLQUFKLFlBQUksUUE4ZHBCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnN0YW50IGZyb20gXCIuL0NvbnN0YW50XCI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgZGF0YSB7XG4gICAgY29uc3QgY2hhbm5lbCA9IGNjLnN5cy5wbGF0Zm9ybTtcbiAgICBjb25zdCBwYXRoX3BsYXllcmJhc2UgPSAnanNvbi9wbGF5ZXJfZGF0YSc7XG4gICAgY29uc3QgcGF0aF9nYW1lYmFzZSA9ICdqc29uL2dhbWViYXNlX2RhdGEnO1xuICAgIGNvbnN0IHN0b3JhZ2VLZXk6IHN0cmluZyA9ICdkeGNzJ1xuICAgIGNvbnN0IFNUX0dhbWVEYXRhOnN0cmluZyA9IFwiU1RfR2FtZURhdGF4eFwiXG5cbiAgICB2YXIgcGxheWVyX2RhdGE6IE9iamVjdCA9IG51bGw7XG4gICAgdmFyIGdhbWViYXNlX2RhdGE6IE9iamVjdCA9IG51bGw7XG5cbiAgICB2YXIgX2RhdGFQb29sOiBhbnkgPSB7fTtcbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbmlbDmja5cbiAgICAgKiBAcGFyYW0gZGVsZXRlQ2FjaGUg6YeN572uXG4gICAgICovXG4gICAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXQoZGVsZXRlQ2FjaGU6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8YW55W10+IHtcblxuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3Nlcil7XG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGxheWVyX2RhdGEgJiYgZ2FtZWJhc2VfZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbJ+aVsOaNruW3suWKoOi9vSddKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVsZXRlQ2FjaGUpIHtcbiAgICAgICAgICAgIGF3YWl0IGRlbGV0ZUNhY2hlRnVuYygpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwb3JtaXNlczogUHJvbWlzZTxzdHJpbmc+W10gPSBbXTtcbiAgICAgICAgcG9ybWlzZXMucHVzaChnZXRMb2NhbFN0b3JhZ2UoKSwgZ2V0U3RvcmFnZSgpKTtcblxuICAgICAgICBpZiAoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUX0dhbWVEYXRhKSkge1xuICAgICAgICAgICAgX2RhdGFQb29sID0gSlNPTi5wYXJzZShjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oU1RfR2FtZURhdGEpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9kYXRhUG9vbFtDb25zdGFudC5TVF9Qcml2YWN5XSA9IFwiMFwiO1xuICAgICAgICAgICAgX2RhdGFQb29sW0NvbnN0YW50LlNUX1NpZ25PbmNlT25dID0gXCIwXCI7XG4gICAgICAgICAgICBfZGF0YVBvb2xbQ29uc3RhbnQuU1RfU2lnbk9uY2VPblRpbWVdID0gXCIwXCI7XG4gICAgICAgICAgICBfZGF0YVBvb2xbQ29uc3RhbnQuU1RfU2hha2VPbl0gPSBcIjFcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwb3JtaXNlcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOivu+WPlmAgZ2FtZWJhc2VfZGF0YSBgIOS4remUruWAvOS4umAga2V5MSBg55qE5YC844CCXG4gICAgICogQHBhcmFtIGtleSDplK7lgLzvvIxga2V5YFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnYW1lSnNvbjxUPihrZXk6IHN0cmluZyk6IFQ7XG4gICAgLyoqXG4gICAgICog6K+75Y+WYCBnYW1lYmFzZV9kYXRhIGAg5a2Q5a+56LGhYCBrZXkxIGDkuK3plK7lgLzkuLpgIGtleTIgYOeahOWAvOOAglxuICAgICAqIEBwYXJhbSBrZXkxIOmUruWAvDHvvIxga2V5MWBcbiAgICAgKiBAcGFyYW0ga2V5MiDplK7lgLwy77yMYGtleTJgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdhbWVKc29uPFQ+KGtleTE6IHN0cmluZywga2V5Mjogc3RyaW5nKTogVDtcbiAgICAvKipcbiAgICAgKiDor7vlj5ZgIGdhbWViYXNlX2RhdGEgYCDlrZDlr7nosaFgIGtleTEgYOeahOWtkOWvueixoWAga2V5MiBg5Lit6ZSu5YC85Li6YCBrZXkzIGDnmoTlgLzjgIJcbiAgICAgKiBAcGFyYW0ga2V5MSDplK7lgLwx77yMYGtleTFgXG4gICAgICogQHBhcmFtIGtleTIg6ZSu5YC8Mu+8jGBrZXkyYFxuICAgICAqIEBwYXJhbSBrZXkzIOmUruWAvDPvvIxga2V5M2BcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2FtZUpzb248VD4oa2V5MTogc3RyaW5nLCBrZXkyOiBzdHJpbmcsIGtleTM6IHN0cmluZyk6IFQ7XG4gICAgLyoqXG4gICAgICog6K+75Y+WYCBnYW1lYmFzZV9kYXRhIGAg5a2Q5a+56LGhYCBrZXkxIGDnmoTlrZDlr7nosaFgIGtleTIgYOeahOWtkOWvueixoWAga2V5MyBg5Lit6ZSu5YC85Li6YCBrZXk0IGDnmoTlgLzjgIJcbiAgICAgKiBAcGFyYW0ga2V5MSDplK7lgLwx77yMYGtleTFgXG4gICAgICogQHBhcmFtIGtleTIg6ZSu5YC8Mu+8jGBrZXkyYFxuICAgICAqIEBwYXJhbSBrZXkzIOmUruWAvDPvvIxga2V5M2BcbiAgICAgKiBAcGFyYW0ga2V5NCDplK7lgLw077yMYGtleTRgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdhbWVKc29uPFQ+KGtleTE6IHN0cmluZywga2V5Mjogc3RyaW5nLCBrZXkzOiBzdHJpbmcsIGtleTQ6IHN0cmluZyk6IFQ7XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdhbWVKc29uPFQ+KGtleTE6IHN0cmluZywga2V5Mj86IHN0cmluZywga2V5Mz86IHN0cmluZywga2V5ND86IHN0cmluZyk6IFQge1xuICAgICAgICBpZiAoa2V5NCE9dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2FtZWJhc2VfZGF0YVtrZXkxXVtrZXkyXVtrZXkzXVtrZXk0XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5MyE9dW5kZWZpbmVkICYmIGtleTQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2FtZWJhc2VfZGF0YVtrZXkxXVtrZXkyXVtrZXkzXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5MiE9dW5kZWZpbmVkICYmIGtleTMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2FtZWJhc2VfZGF0YVtrZXkxXVtrZXkyXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5MSE9dW5kZWZpbmVkICYmIGtleTIgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2FtZWJhc2VfZGF0YVtrZXkxXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDor7vlj5ZgIHBsYXllcl9kYXRhIGDkuK3plK7lgLzkuLpgIGtleSBg55qE5YC844CCXG4gICAgICogQHBhcmFtIGtleSDplK7lgLzvvIxga2V5YFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRDYWNoZTxUPihrZXk6IHN0cmluZyk6IFQ7XG4gICAgLyoqXG4gICAgICog6K+75Y+WYCBwbGF5ZXJfZGF0YSBg55qE5a2Q5a+56LGhYCBrZXkxIGDkuK3plK7lgLzkuLpgIGtleTIgYOeahOWAvOOAglxuICAgICAqIEBwYXJhbSBrZXkxIOmUruWAvDHvvIxga2V5MWBcbiAgICAgKiBAcGFyYW0ga2V5MiDplK7lgLwy77yMYGtleTJgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldENhY2hlPFQ+KGtleTE6IHN0cmluZywga2V5Mjogc3RyaW5nKTogVDtcbiAgICAvKipcbiAgICAgKiDor7vlj5ZgIHBsYXllcl9kYXRhIGDnmoTlrZDlr7nosaFgIGtleTEgYOeahOWtkOWvueixoWAga2V5MiBg5Lit6ZSu5YC85Li6YCBrZXkzIGDnmoTlgLzjgIJcbiAgICAgKiBAcGFyYW0ga2V5MSDplK7lgLwx77yMYGtleTFgXG4gICAgICogQHBhcmFtIGtleTIg6ZSu5YC8Mu+8jGBrZXkyYFxuICAgICAqIEBwYXJhbSBrZXkzIOmUruWAvDPvvIxga2V5M2BcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0Q2FjaGU8VD4oa2V5MTogc3RyaW5nLCBrZXkyOiBzdHJpbmcsIGtleTM6IHN0cmluZyk6IFQ7XG4gICAgLyoqXG4gICAgICog6K+75Y+WYCBwbGF5ZXJfZGF0YSBg55qE5a2Q5a+56LGhYCBrZXkxIGDnmoTlrZDlr7nosaFgIGtleTIgYOeahOWtkOWvueixoWAga2V5MyBg5Lit6ZSu5YC85Li6YCBrZXk0IGDnmoTlgLzjgIJcbiAgICAgKiBAcGFyYW0ga2V5MSDplK7lgLwx77yMYGtleTFgXG4gICAgICogQHBhcmFtIGtleTIg6ZSu5YC8Mu+8jGBrZXkyYFxuICAgICAqIEBwYXJhbSBrZXkzIOmUruWAvDPvvIxga2V5M2BcbiAgICAgKiBAcGFyYW0ga2V5NCDplK7lgLw077yMYGtleTRgXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldENhY2hlPFQ+KGtleTE6IHN0cmluZywga2V5Mjogc3RyaW5nLCBrZXkzOiBzdHJpbmcsIGtleTQ6IHN0cmluZyk6IFQ7XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldENhY2hlPFQ+KGtleTE6IHN0cmluZywga2V5Mj86IHN0cmluZywga2V5Mz86IHN0cmluZywga2V5ND86IHN0cmluZyk6IFQge1xuICAgICAgICBpZiAoa2V5NCE9dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcGxheWVyX2RhdGFba2V5MV1ba2V5Ml1ba2V5M11ba2V5NF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleTMhPXVuZGVmaW5lZCAmJiBrZXk0ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHBsYXllcl9kYXRhW2tleTFdW2tleTJdW2tleTNdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkyIT11bmRlZmluZWQgJiYga2V5MyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJfZGF0YVtrZXkxXVtrZXkyXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5MSE9dW5kZWZpbmVkICYmIGtleTIgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcGxheWVyX2RhdGFba2V5MV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5bCGYCBwbGF5ZXJfZGF0YSBg5Lit55qE6ZSu5YC85Li6YCBrZXkgYOeahOWAvOS/ruaUueS4umAgdmFsdWUgYOOAglxuICAgICAqIEBwYXJhbSBrZXkxIOmUruWAvO+8jGBrZXlgXG4gICAgICogQHBhcmFtIHZhbHVlIOabtOaWsOaVsOaNrlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDYWNoZTxUPihrZXk6IHN0cmluZywgdmFsdWU6IFQpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIOWwhmAgcGxheWVyX2RhdGEgYOeahOWtkOWvueixoWAga2V5MSBg5Lit55qE6ZSu5YC85Li6YCBrZXkyIGDnmoTlgLzkv67mlLnkuLpgIHZhbHVlIGDjgIJcbiAgICAgKiBAcGFyYW0ga2V5MSDplK7lgLwx77yMYGtleTFgXG4gICAgICogQHBhcmFtIGtleTIg6ZSu5YC8Mu+8jGBrZXkyYFxuICAgICAqIEBwYXJhbSB2YWx1ZSDmm7TmlrDmlbDmja5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gdXBkYXRlQ2FjaGU8VD4oa2V5MTogc3RyaW5nLCBrZXkyOiBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiDlsIZgIHBsYXllcl9kYXRhIGDnmoTlrZDlr7nosaFgIGtleTEgYOeahOWtkOWvueixoWAga2V5MiBg5Lit55qE6ZSu5YC85Li6YCBrZXkzIGDnmoTlgLzkv67mlLnkuLpgIHZhbHVlIGDjgIJcbiAgICAgKiBAcGFyYW0ga2V5MSDplK7lgLwx77yMYGtleTFgXG4gICAgICogQHBhcmFtIGtleTIg6ZSu5YC8Mu+8jGBrZXkyYFxuICAgICAqIEBwYXJhbSBrZXkzIOmUruWAvDPvvIxga2V5M2BcbiAgICAgKiBAcGFyYW0gdmFsdWUg5pu05paw5pWw5o2uXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNhY2hlPFQ+KGtleTE6IHN0cmluZywga2V5Mjogc3RyaW5nLCBrZXkzOiBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiDlsIZgIHBsYXllcl9kYXRhIGDnmoTlrZDlr7nosaFgIGtleTEgYOeahOWtkOWvueixoWAga2V5MiBg55qE5a2Q5a+56LGhYCBrZXkzIGDkuK3nmoTplK7lgLzkuLpgIGtleTQgYOeahOWAvOS/ruaUueS4umAgdmFsdWUgYOOAglxuICAgICAqIEBwYXJhbSBrZXkxIOmUruWAvDHvvIxga2V5MWBcbiAgICAgKiBAcGFyYW0ga2V5MiDplK7lgLwy77yMYGtleTJgXG4gICAgICogQHBhcmFtIGtleTMg6ZSu5YC8M++8jGBrZXkzYFxuICAgICAqIEBwYXJhbSBrZXk0IOmUruWAvDTvvIxga2V5NGBcbiAgICAgKiBAcGFyYW0gdmFsdWUg5pu05paw5pWw5o2uXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNhY2hlPFQ+KGtleTE6IHN0cmluZywga2V5Mjogc3RyaW5nLCBrZXkzOiBzdHJpbmcsIGtleTQ6IHN0cmluZywgdmFsdWU6IFQpOiB2b2lkO1xuICAgIGV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDYWNoZTxUPihhcmcxOiBULCBhcmcyOiBULCBhcmczPzogVCwgYXJnND86IFQsIGFyZzU/OiBUKSB7XG4gICAgICAgIGlmIChhcmc1IT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwbGF5ZXJfZGF0YVtTdHJpbmcoYXJnMSldW1N0cmluZyhhcmcyKV1bU3RyaW5nKGFyZzMpXVtTdHJpbmcoYXJnNCldID0gYXJnNTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJnNCAhPSB1bmRlZmluZWQmJiBhcmc1ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGxheWVyX2RhdGFbU3RyaW5nKGFyZzEpXVtTdHJpbmcoYXJnMildW1N0cmluZyhhcmczKV0gPSBhcmc0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmczIT0gdW5kZWZpbmVkICYmIGFyZzQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwbGF5ZXJfZGF0YVtTdHJpbmcoYXJnMSldW1N0cmluZyhhcmcyKV0gPSBhcmczO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcmcyICE9IHVuZGVmaW5lZCYmIGFyZzMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwbGF5ZXJfZGF0YVtTdHJpbmcoYXJnMSldID0gYXJnMjtcbiAgICAgICAgfVxuICAgICAgICBzZXRTdG9yYWdlKCk7XG4gICAgfVxuXG4gICAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIF9zZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIC8vIGNjLmxvZyhcIi0tLS0ga2V5LCB2YWx1ZS0tLS0tLVwiLCBrZXksIHZhbHVlKVxuICAgICAgICBfZGF0YVBvb2xba2V5XSA9IHZhbHVlO1xuICAgICAgICBfc2F2ZSgpO1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBfZ2V0SXRlbShrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKF9kYXRhUG9vbFtrZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gX2RhdGFQb29sW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gX3NhdmUoKSB7XG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVF9HYW1lRGF0YSwgSlNPTi5zdHJpbmdpZnkoX2RhdGFQb29sKSk7XG4gICAgfVxuXG4gICAgLyoq5Y+WU2hha2VPbuW8gOWFsyAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRTaGFrZU9uKCkge1xuICAgICAgICByZXR1cm4gX2dldEl0ZW0oQ29uc3RhbnQuU1RfU2hha2VPbiwgXCIxXCIpID09IFwiMVwiO1xuICAgIH1cbiAgICAvKirlrZhTaGFrZU9u5byA5YWzICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldFNoYWtlT24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgX3NldEl0ZW0oQ29uc3RhbnQuU1RfU2hha2VPbiwgdmFsdWUgPyBcIjFcIiA6IFwiMFwiKTtcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0UHJpdmFjeU9uKCkge1xuICAgICAgICByZXR1cm4gX2dldEl0ZW0oQ29uc3RhbnQuU1RfUHJpdmFjeSwgXCIxXCIpID09IFwiMVwiO1xuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0UHJpdmFjeU9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIF9zZXRJdGVtKENvbnN0YW50LlNUX1ByaXZhY3ksIHZhbHVlID8gXCIxXCIgOiBcIjBcIik7XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFNpZ25PbmNlT24oKSB7XG5cbiAgICAgICAgbGV0IHJldCA9IF9nZXRJdGVtKENvbnN0YW50LlNUX1NpZ25PbmNlT25UaW1lLCBcIjBcIik7XG4gICAgICAgIGlmICghcmV0KSB7XG4gICAgICAgICAgICByZXQgPSBcIjBcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSAhPSByZXQpey8v5q+P5aSp5by55LiA5qyhXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2dldEl0ZW0oQ29uc3RhbnQuU1RfU2lnbk9uY2VPbiwgXCIxXCIpID09IFwiMVwiO1xuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gc2V0U2lnbk9uY2VPbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBfc2V0SXRlbShDb25zdGFudC5TVF9TaWduT25jZU9uVGltZSxuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpKVxuICAgICAgICBfc2V0SXRlbShDb25zdGFudC5TVF9TaWduT25jZU9uLCB2YWx1ZSA/IFwiMVwiIDogXCIwXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWcqGAgcGxheWVyX2RhdGEgYOS4reaPkuWFpemUruWAvOWvuWAga2V5MT12YWx1ZSBgXG4gICAgICogQHBhcmFtIGtleSDplK7lgLzvvIxga2V5YFxuICAgICAqIEBwYXJhbSB2YWx1ZSDmj5LlhaXmlbDmja5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gYWRkQ2FjaGU8VD4oa2V5OiBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiDlnKhgIHBsYXllcl9kYXRhIGDnmoTlrZDlr7nosaFgIGtleTEgYOS4reaPkuWFpemUruWAvOWvuWAga2V5Mj12YWx1ZSBgXG4gICAgICogQHBhcmFtIGtleTEg6ZSu5YC877yMYGtleTFgXG4gICAgICogQHBhcmFtIGtleTIg6ZSu5YC877yMYGtleTJgXG4gICAgICogQHBhcmFtIHZhbHVlIOaPkuWFpeaVsOaNrlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBhZGRDYWNoZTxUPihrZXkxOiBzdHJpbmcsIGtleTI6IHN0cmluZywgdmFsdWU6IFQpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqICDlnKhgIHBsYXllcl9kYXRhIGDnmoTlrZDlr7nosaFgIGtleTEgYOeahOWtkOWvueixoWAga2V5MiBg5Lit5o+S5YWl6ZSu5YC85a+5YCBrZXkzPXZhbHVlIGBcbiAgICAgKiBAcGFyYW0ga2V5MSDplK7lgLzvvIxga2V5MWBcbiAgICAgKiBAcGFyYW0ga2V5MiDplK7lgLzvvIxga2V5MmBcbiAgICAgKiBAcGFyYW0ga2V5MyDplK7lgLzvvIxga2V5M2BcbiAgICAgKiBAcGFyYW0gdmFsdWUg5o+S5YWl5pWw5o2uXG4gICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFkZENhY2hlPFQ+KGtleTE6IHN0cmluZywga2V5Mjogc3RyaW5nLCBrZXkzOiBzdHJpbmcsIHZhbHVlOiBUKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiDlnKhgIHBsYXllcl9kYXRhIGDnmoTlrZDlr7nosaFgIGtleTEgYOeahOWtkOWvueixoWAga2V5MiBg55qE5a2Q5a+56LGhYCBrZXkzIGDkuK3mj5LlhaXplK7lgLzlr7lgIGtleTQ9dmFsdWUgYFxuICAgICAqIEBwYXJhbSBrZXkxIOmUruWAvO+8jGBrZXkxYFxuICAgICAqIEBwYXJhbSBrZXkyIOmUruWAvO+8jGBrZXkyYFxuICAgICAqIEBwYXJhbSBrZXkzIOmUruWAvO+8jGBrZXkzYFxuICAgICAqIEBwYXJhbSBrZXk0IOmUruWAvO+8jGBrZXk0YFxuICAgICAqIEBwYXJhbSB2YWx1ZSDmj5LlhaXmlbDmja5cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gYWRkQ2FjaGU8VD4oa2V5MTogc3RyaW5nLCBrZXkyOiBzdHJpbmcsIGtleTM6IHN0cmluZywga2V5NDogc3RyaW5nLCB2YWx1ZTogVCk6IHZvaWQ7XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGFkZENhY2hlPFQ+KGFyZzE6IHN0cmluZywgYXJnMjogVCwgYXJnMz86IFQsIGFyZzQ/OiBULCBhcmc1PzogVCkge1xuICAgICAgICBsZXQgY2hlY2tEYXRhOiBUO1xuICAgICAgICBsZXQgYmFzZURhdGE6IHN0cmluZztcbiAgICAgICAgbGV0IG9iamVjdDogT2JqZWN0ID0gbmV3IE9iamVjdCgpO1xuXG4gICAgICAgIGlmIChhcmc1IT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoZWNrRGF0YSA9IHBsYXllcl9kYXRhW2FyZzFdW2FyZzJdW2FyZzNdW2FyZzRdO1xuICAgICAgICAgICAgaWYgKCFjaGVja0RhdGEpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbU3RyaW5nKGFyZzQpXSA9IGFyZzU7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwbGF5ZXJfZGF0YVthcmcxXVthcmcyXVthcmczXSwgb2JqZWN0KTtcbiAgICAgICAgICAgICAgICBiYXNlRGF0YSA9IEpTT04uc3RyaW5naWZ5KHBsYXllcl9kYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5re75Yqg5a2X5q61OicgKyBhcmc0ICsgJz0nICsgYXJnNSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmt7vliqDlpLHotKUs5bey5a2Y5Zyo6ZSu5YC85a+5OicgKyBhcmc0ICsgJz0nICsgYXJnNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZzQgIT11bmRlZmluZWQmJiBhcmc1ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hlY2tEYXRhID0gcGxheWVyX2RhdGFbYXJnMV1bYXJnMl1bYXJnM107XG4gICAgICAgICAgICBpZiAoIWNoZWNrRGF0YSkge1xuICAgICAgICAgICAgICAgIG9iamVjdFtTdHJpbmcoYXJnMyldID0gYXJnNDtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHBsYXllcl9kYXRhW2FyZzFdW2FyZzJdLCBvYmplY3QpO1xuICAgICAgICAgICAgICAgIGJhc2VEYXRhID0gSlNPTi5zdHJpbmdpZnkocGxheWVyX2RhdGEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmt7vliqDlrZfmrrU6JyArIGFyZzMgKyAnPScgKyBhcmc0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+a3u+WKoOWksei0pSzlt7LlrZjlnKjplK7lgLzlr7k6JyArIGFyZzMgKyAnPScgKyBhcmc0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJnMyE9dW5kZWZpbmVkICYmIGFyZzQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGVja0RhdGEgPSBwbGF5ZXJfZGF0YVthcmcxXVthcmcyXTtcbiAgICAgICAgICAgIGlmICghY2hlY2tEYXRhKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0W1N0cmluZyhhcmcyKV0gPSBhcmczO1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocGxheWVyX2RhdGFbYXJnMV0sIG9iamVjdCk7XG4gICAgICAgICAgICAgICAgYmFzZURhdGEgPSBKU09OLnN0cmluZ2lmeShwbGF5ZXJfZGF0YSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+a3u+WKoOWtl+autTonICsgYXJnMiArICc9JyArIGFyZzMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5re75Yqg5aSx6LSlLOW3suWtmOWcqOmUruWAvOWvuTonICsgYXJnMiArICc9JyArIGFyZzMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhcmcyIT11bmRlZmluZWQgJiYgYXJnMyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoZWNrRGF0YSA9IHBsYXllcl9kYXRhW2FyZzFdO1xuICAgICAgICAgICAgaWYgKCFjaGVja0RhdGEpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbU3RyaW5nKGFyZzEpXSA9IGFyZzI7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwbGF5ZXJfZGF0YSwgb2JqZWN0KTtcbiAgICAgICAgICAgICAgICBiYXNlRGF0YSA9IEpTT04uc3RyaW5naWZ5KHBsYXllcl9kYXRhKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5re75Yqg5a2X5q61OicgKyBhcmcxICsgJz0nICsgYXJnMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmt7vliqDlpLHotKUs5bey5a2Y5Zyo6ZSu5YC85a+5OicgKyBhcmcxICsgJz0nICsgYXJnMik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICAvLyBjYXNlIGNjLnN5cy5CWVRFREFOQ0VfR0FNRTpcbiAgICAgICAgICAgIC8vICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgIC8vICAgICB0dC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgIC8vICAgICAgICAga2V5OiBzdG9yYWdlS2V5LFxuICAgICAgICAgICAgLy8gICAgICAgICBkYXRhOiBiYXNlRGF0YSxcbiAgICAgICAgICAgIC8vICAgICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ+Wtl+autea3u+WKoOaIkOWKnyEnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICAgICAgZmFpbChyZXM6IGFueSkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ+Wtl+autea3u+WKoOWksei0pSEnKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5a2X5q615re75Yqg5oiQ5YqfIScpO1xuICAgICAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCBiYXNlRGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0U3RvcmFnZSgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IEZ1bmN0aW9uLCByZWplY3Q6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWni+WKoOi9veeOqeWutuaVsOaNrlwiLGNoYW5uZWwgPT0gY2Muc3lzLldFQ0hBVF9HQU1FKVxuICAgICAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBjYy5zeXMuV0VDSEFUX0dBTUU6XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgd3guZ2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHN0b3JhZ2VLZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlczogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiJDlip/liqDovb3njqnlrrbmlbDmja5+fn5+fn5+fn5+fn5+flwiLHN0b3JhZ2VLZXksY2hhbm5lbCxyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyX2RhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0RhdGEocGxheWVyX2RhdGEsIHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacquiDveaIkOWKn+WKoOi9veeOqeWutuaVsOaNrn5+fn5+fn5+fn5+fn5+XCIsc3RvcmFnZUtleSxjaGFubmVsLHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkUGxheWVyRGF0YShyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgY2Muc3lzLkJZVEVEQU5DRV9HQU1FOlxuICAgICAgICAgICAgICAgIC8vICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgLy8gICAgIHR0LmdldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAga2V5OiBzdG9yYWdlS2V5LFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHBsYXllcl9kYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2hlY2tEYXRhKHBsYXllcl9kYXRhLCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBmYWlsKHJlczogYW55KSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbG9hZFBsYXllckRhdGEocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvLyBjYXNlIGNjLnN5cy5RUV9QTEFZOlxuICAgICAgICAgICAgICAgIC8vICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgLy8gICAgIHFxLmdldFN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAga2V5OiBzdG9yYWdlS2V5LFxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHBsYXllcl9kYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgY2hlY2tEYXRhKHBsYXllcl9kYXRhLCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBmYWlsKHJlczogYW55KSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgbG9hZFBsYXllckRhdGEocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/ku47mnKzlnLDor7vlj5bmlbDmja5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiYXNlRGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5bCGc3RyaW5n6L2s5o2i5oiQanNvblxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyX2RhdGEgPSBKU09OLnBhcnNlKGJhc2VEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrRGF0YShwbGF5ZXJfZGF0YSwgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yX3RlbXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yX3RlbXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tEYXRhKGRhdGE6IE9iamVjdCwgY2I6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBjYignPOWKoOi9vee8k+WtmOeOqeWutuaVsOaNrj4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWRQbGF5ZXJEYXRhKGNiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBsb2FkUGxheWVyRGF0YShjYjogRnVuY3Rpb24pIHtcbiAgICAgICAgbG9hZChwYXRoX3BsYXllcmJhc2UpLnRoZW4oYmFzZSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXJfZGF0YSA9IGJhc2U7XG4gICAgICAgICAgICBjYignPOWKoOi9vee8k+WtmOeOqeWutuaVsOaNrj4nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZSgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6IEZ1bmN0aW9uLCByZWplY3Q6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgICBsb2FkKHBhdGhfZ2FtZWJhc2UpLnRoZW4oYmFzZSA9PiB7XG4gICAgICAgICAgICAgICAgZ2FtZWJhc2VfZGF0YSA9IGJhc2U7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgn5Yqg6L295ri45oiP5pWw5o2uJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFN0b3JhZ2UoKSB7XG4gICAgICAgIHZhciBiYXNlRGF0YSA9IEpTT04uc3RyaW5naWZ5KHBsYXllcl9kYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2coXCLlvIDlp4vkv53lrZjnjqnlrrbmlbDmja5cIixjaGFubmVsID09IGNjLnN5cy5XRUNIQVRfR0FNRSlcbiAgICAgICAgc3dpdGNoIChjaGFubmVsKSB7XG4gICAgICAgICAgICBjYXNlIGNjLnN5cy5XRUNIQVRfR0FNRTpcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgICAgIGtleTogc3RvcmFnZUtleSwgZGF0YTogYmFzZURhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGNhc2UgY2Muc3lzLkJZVEVEQU5DRV9HQU1FOlxuICAgICAgICAgICAgLy8gICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIC8vICAgICB0dC5zZXRTdG9yYWdlKHtcbiAgICAgICAgICAgIC8vICAgICAgICAga2V5OiBzdG9yYWdlS2V5LCBkYXRhOiBiYXNlRGF0YVxuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gY2FzZSBjYy5zeXMuUVFfUExBWTpcbiAgICAgICAgICAgIC8vICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAvLyAgICAgcXEuc2V0U3RvcmFnZSh7XG4gICAgICAgICAgICAvLyAgICAgICAgIGtleTogc3RvcmFnZUtleSwgZGF0YTogYmFzZURhdGFcbiAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIGJhc2VEYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBkZWxldGVDYWNoZUZ1bmMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgY2Muc3lzLldFQ0hBVF9HQU1FOlxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHd4LmNsZWFyU3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlczogYW55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwocmVzOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgY2Muc3lzLkJZVEVEQU5DRV9HQU1FOlxuICAgICAgICAgICAgICAgIC8vICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgLy8gICAgIHR0LmNsZWFyU3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBzdWNjZXNzKHJlczogYW55KSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGZhaWwocmVzOiBhbnkpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIC8vIGNhc2UgY2Muc3lzLlFRX1BMQVk6XG4gICAgICAgICAgICAgICAgLy8gICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIC8vICAgICBxcS5jbGVhclN0b3JhZ2Uoe1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBmYWlsKHJlczogYW55KSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc3RvcmFnZUtleSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsb2FkKHBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogRnVuY3Rpb24sIHJlamVjdDogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKHBhdGgsIGNjLkpzb25Bc3NldCwgKGVyciwgb2JqZWN0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYOWKoOi9vToke3BhdGh95aSx6LSlIWApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUob2JqZWN0Lmpzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59Il19