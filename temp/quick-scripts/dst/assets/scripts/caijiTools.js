
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/caijiTools.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3b539O4uiZOPq4nkPn4HvON', 'caijiTools');
// scripts/caijiTools.ts

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
exports.caijiTools = void 0;
var audioNameMgr_1 = require("./audioNameMgr");
var dontDestroy_1 = require("./dontDestroy");
var audioManager_1 = require("./main/audioManager");
var data_1 = require("./sdk/data");
(function () {
    var Super = function () { };
    Super.prototype = cc.Button.prototype;
    //实例化原型
    Super.prototype._onTouchBegan = function (event) {
        if (this.interactable && this.enabledInHierarchy) {
            var target = event.target;
            if (target.getComponent(cc.Button).clickEvents[0].customEventData != "offsound") {
                audioManager_1.default.playAudio(audioNameMgr_1.audioName.button, false, 0.6);
            }
            if (this._pressed) {
                cc.Component.EventHandler.emitEvents(this.clickEvents, event);
                this.node.emit("click", this);
            }
            this._pressed = true;
            this._updateState();
            event.stopPropagation();
        }
    };
})();
var caijiTools;
(function (caijiTools) {
    /**
     * 加载音频资源
     * @param path resource下路径
    */
    function loadAudioClip(path) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadResources(path, cc.AudioClip)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    }
    caijiTools.loadAudioClip = loadAudioClip;
    /**
     * 加载分包中音频
     * @param bundleName 分包名
     * @param path 分包下路径
     * @returns
     */
    function loadAudioClipBundle(bundleName, path) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadBundleRes(bundleName, path, cc.AudioClip)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    }
    caijiTools.loadAudioClipBundle = loadAudioClipBundle;
    function loadSkeleton(path) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadResources(path, sp.SkeletonData)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    }
    caijiTools.loadSkeleton = loadSkeleton;
    /**
     * 加载图片资源
     * @param path resource下路径
     */
    function loadSpriteFrame(path) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadResources(path, cc.SpriteFrame)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    }
    caijiTools.loadSpriteFrame = loadSpriteFrame;
    /**
     * 加载分包中图片
     * @param bundleName 分包名
     * @param path 分包下路径
     * @returns
     */
    function loadSpriteFrameBundle(bundleName, path) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadBundleRes(bundleName, path, cc.SpriteFrame)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    }
    caijiTools.loadSpriteFrameBundle = loadSpriteFrameBundle;
    /**
     * 加载texture2d资源
     * @param path 远程链接
     */
    function loadUrlTxture(path) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadUrlResources(path, cc.Texture2D)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    }
    caijiTools.loadUrlTxture = loadUrlTxture;
    /**
     * 加载预制体资源
     * @param path resource下路径
    */
    function loadPrefab(path) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadResources(path, cc.Prefab)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    }
    caijiTools.loadPrefab = loadPrefab;
    function loadResources(path, type) {
        return new Promise(function (resolve, reject) {
            cc.resources.load(path, type, function (err, res) {
                if (err) {
                    console.log("加载资源失败！" + path);
                    resolve(null);
                    return;
                }
                resolve(res);
            });
        });
    }
    caijiTools.loadResources = loadResources;
    /**
     * 加载分包资源
     * @param bundleName 分包名
     * @param path 分包下路径
     * @param type 文件类型
     * @returns
     */
    function loadBundleRes(bundleName, path, type) {
        return new Promise(function (resolve, reject) {
            var bundle = cc.assetManager.getBundle(bundleName);
            if (!bundle) {
                cc.log("loadBundleRes first:", bundleName);
                cc.assetManager.loadBundle(bundleName, function (err, b) {
                    if (!err) {
                        bundle = b;
                        bundle.load(path, type, function (err, res) {
                            if (err) {
                                cc.log("loadBundleRes first:", bundleName, path, " fail:", err);
                            }
                            resolve(res);
                        });
                    }
                    else {
                        cc.log("loadBundleRes first:", bundleName, " fail:", err);
                    }
                });
            }
            else {
                bundle.load(path, type, function (err, res) {
                    if (err) {
                        cc.log("loadBundleRes:", bundleName, path, " fail:", err);
                    }
                    resolve(res);
                });
            }
        });
    }
    caijiTools.loadBundleRes = loadBundleRes;
    /**
     * 加载分包
     * @param bundleName 分包名
     */
    function loadBundlePackage(bundleName, callBack) {
        cc.assetManager.loadBundle(bundleName, function (err, bundle) {
            if (err) {
                console.log(err);
            }
            else {
                callBack(bundleName);
            }
        });
    }
    caijiTools.loadBundlePackage = loadBundlePackage;
    function loadUrlResources(path, type) {
        return new Promise(function (resolve, reject) {
            cc.assetManager.loadRemote(path, type, function (err, res) {
                if (err) {
                    console.log("加载url资源失败！" + path);
                    return;
                }
                resolve(res);
            });
        });
    }
    caijiTools.loadUrlResources = loadUrlResources;
    function addCoin(addNum, coinLabel, coinNode) {
        if (coinLabel === void 0) { coinLabel = null; }
        if (coinNode === void 0) { coinNode = null; }
        var nowCoin = Number(data_1.data.getCache("Base", "coin"));
        var obj = { a: nowCoin };
        nowCoin += addNum;
        data_1.data.updateCache("Base", "coin", nowCoin);
        caijiTools.showGetCoinTip(addNum);
        if (coinLabel != null) {
            coinLabel.unscheduleAllCallbacks();
            //@ts-ignore
            cc.tween(obj)
                .to(1, { a: nowCoin }, {
                progress: function (start, end, current, t) {
                    //start:起始值 end:终点值 current:当前值 t:总时占比0~1 
                    //返回值为最终赋值
                    var now = cc.misc.lerp(start, end, t);
                    coinLabel.string = now.toFixed(0);
                    return now;
                },
                easing: "cubicOut"
            })
                .start();
        }
        if (coinNode == null)
            return;
        cc.resources.load("prefab/addLable", cc.Prefab, function (err, Prefab) {
            if (err != null) {
                cc.log(err);
                return;
            }
            var addLable = cc.instantiate(Prefab);
            addLable.setParent(coinNode);
            addLable.setPosition(cc.v2(coinNode.width / 2, -coinNode.height / 2));
            addLable.getComponent(cc.Label).string = addNum > 0 ? ("+" + addNum) : addNum.toString();
            addLable.active = true;
            cc.tween(addLable)
                .to(0.1, { scale: 0.8 })
                .by(0.5, { position: cc.v3(0, 70), opacity: -255 })
                .call(function () {
                addLable.destroy();
            })
                .start();
        });
    }
    caijiTools.addCoin = addCoin;
    function showGetCoinTip(addNum) {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadPrefab("prefabs/ui/getCoinTip")];
                    case 1:
                        prefab = _a.sent();
                        if (!prefab)
                            return [2 /*return*/];
                        node = caijiTools.createNode(prefab, cc.find("Canvas"));
                        node.getComponent("getCoinTip").addNum = addNum;
                        node.setPosition(0, cc.winSize.height / 2 * 0.2);
                        node.active = true;
                        return [2 /*return*/];
                }
            });
        });
    }
    caijiTools.showGetCoinTip = showGetCoinTip;
    function showGetPowerTip(addNum) {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadPrefab("prefabs/ui/getPowerTip")];
                    case 1:
                        prefab = _a.sent();
                        if (!prefab)
                            return [2 /*return*/];
                        node = caijiTools.createNode(prefab, cc.find("Canvas"));
                        node.getComponent("getPowerTip").addNum = addNum;
                        node.setPosition(0, cc.winSize.height / 2 * 0.2);
                        node.active = true;
                        return [2 /*return*/];
                }
            });
        });
    }
    caijiTools.showGetPowerTip = showGetPowerTip;
    function addPower(addNum, powerLabel) {
        if (powerLabel === void 0) { powerLabel = null; }
        var nowPower = Number(data_1.data.getCache("Base", "power"));
        var obj = { a: nowPower };
        nowPower += addNum;
        data_1.data.updateCache("Base", "power", nowPower);
        dontDestroy_1.default.instance.checkPowerIsFull();
        caijiTools.showGetPowerTip(addNum);
        if (powerLabel != null) {
            powerLabel.unscheduleAllCallbacks();
            //@ts-ignore
            cc.tween(obj)
                .to(0.5, { a: nowPower }, {
                progress: function (start, end, current, t) {
                    //start:起始值 end:终点值 current:当前值 t:总时占比0~1 
                    //返回值为最终赋值
                    var now = cc.misc.lerp(start, end, t);
                    powerLabel.string = now.toFixed(0);
                    return now;
                },
                easing: "cubicOut"
            })
                .start();
        }
    }
    caijiTools.addPower = addPower;
    function isCoinEnough(number) {
        return Number(data_1.data.getCache("Base", "coin")) >= number;
    }
    caijiTools.isCoinEnough = isCoinEnough;
    function isPowerEnough(number) {
        return Number(data_1.data.getCache("Base", "power")) >= number;
    }
    caijiTools.isPowerEnough = isPowerEnough;
    /**
     * 展示解锁皮肤弹窗
     * @param skinIndex 下标从0开始
     * @param uiName 获得皮肤弹窗ui名
     */
    function showUnlockSkin(skinIndex, uiName) {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, ndoe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data_1.data.updateCache("Base", "inUsingSkin", skinIndex);
                        data_1.data.updateCache("skins", skinIndex.toString(), 1);
                        return [4 /*yield*/, caijiTools.loadPrefab("prefabs/ui/" + uiName)];
                    case 1:
                        prefab = _a.sent();
                        ndoe = caijiTools.createNode(prefab, cc.find("Canvas"), true);
                        ndoe.getComponent(uiName).skinIndex = skinIndex;
                        return [2 /*return*/];
                }
            });
        });
    }
    caijiTools.showUnlockSkin = showUnlockSkin;
    /**
    * 弹窗
    * @param uiName 弹窗ui名
    */
    function showPopup(uiName, parent, isShow, zIndexMax) {
        if (isShow === void 0) { isShow = true; }
        if (zIndexMax === void 0) { zIndexMax = false; }
        return __awaiter(this, void 0, void 0, function () {
            var prefab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools.loadPrefab("prefabs/ui/" + uiName)];
                    case 1:
                        prefab = _a.sent();
                        if (prefab)
                            return [2 /*return*/, caijiTools.createNode(prefab, parent, isShow, zIndexMax)];
                        return [2 /*return*/];
                }
            });
        });
    }
    caijiTools.showPopup = showPopup;
    function createNode(prefab, parent, isShow, zIndexMax) {
        if (isShow === void 0) { isShow = true; }
        if (zIndexMax === void 0) { zIndexMax = false; }
        var newNode = cc.instantiate(prefab);
        newNode.setParent(parent);
        newNode.setPosition(0, 0);
        if (zIndexMax) {
            newNode.zIndex = cc.macro.MAX_ZINDEX;
        }
        newNode.active = isShow;
        return newNode;
    }
    caijiTools.createNode = createNode;
    function updatePowerTimer(powerLabel, powerTimerLabel, maxPower) {
        var nowPower = data_1.data.getCache("Base", "power");
        powerLabel.string = nowPower;
        if (dontDestroy_1.default.instance.isTimer && powerTimerLabel.node.active == false) {
            powerTimerLabel.node.active = true;
        }
        else if (dontDestroy_1.default.instance.isTimer == false && powerTimerLabel.node.active == true) {
            powerTimerLabel.node.active = false;
        }
        if (Number(nowPower) >= maxPower)
            return;
        if (dontDestroy_1.default.instance.sec >= 10) {
            powerTimerLabel.string = "0" + dontDestroy_1.default.instance.min + ":" + dontDestroy_1.default.instance.sec;
        }
        else {
            powerTimerLabel.string = "0" + dontDestroy_1.default.instance.min + ":" + "0" + dontDestroy_1.default.instance.sec;
        }
    }
    caijiTools.updatePowerTimer = updatePowerTimer;
    /**
     * 抖动相机
     * @param cameraNode 相机节点
     * @param repeat 重复次数
     * @param offsetX x偏移量
     * @param offsetY y偏移量
     */
    function screenShake(cameraNode, repeat, offsetX, offsetY) {
        if (repeat === void 0) { repeat = 6; }
        if (offsetX === void 0) { offsetX = 5; }
        if (offsetY === void 0) { offsetY = 10; }
        var times = 0;
        var nowX = offsetX;
        var nowY = offsetY;
        var tween = function (ox, oy) {
            times++;
            cc.tween(cameraNode)
                .by(0.03, { y: oy })
                .by(0.03, { y: -oy })
                .call(function () {
                if (times < repeat) {
                    nowX = nowX - offsetX / repeat;
                    nowY = nowY - offsetY / repeat;
                    tween(nowX, nowY);
                }
            })
                .start();
        };
        tween(nowX, nowY);
    }
    caijiTools.screenShake = screenShake;
    /**
     * 改变build相机的y轴坐标使其建筑一直保持在最底部
     * @param camera 目标相机
     */
    function changeBulidCamera_posY(camera) {
        var Y = (1 / camera.zoomRatio - 1) * cc.winSize.height / 2;
        camera.node.y = Y;
    }
    caijiTools.changeBulidCamera_posY = changeBulidCamera_posY;
    /**
     * 获取两向量的夹角
     * @param vec1 向量1
     * @param vec2 向量2
     */
    function getAngleBetweenTwoVec(vec1, vec2) {
        return vec1.normalize().signAngle(vec2.normalize()) * 180 / Math.PI;
    }
    caijiTools.getAngleBetweenTwoVec = getAngleBetweenTwoVec;
    /**
     * 获取方向角度（以y轴正方向为基准顺时针旋转180°为正，逆时针180°为负）
     * @param x
     * @param y
     */
    function getAngleDependY(x, y) {
        var rad = Math.atan2(x, y); // 反正切函数，得到弧度
        var angle = 180 * rad / Math.PI; // 将弧度rad转换为角度
        return angle;
    }
    caijiTools.getAngleDependY = getAngleDependY;
    //cc.misc.degreesToRadians(deg) // 角度转弧度
    //cc.misc.radiansToDegrees(rad)  // 弧度转角度
    /**
     * 获取角度方向向量
     * @param angle 角度
     */
    function getDirection(angle) {
        var x = Math.sin(-angle * Math.PI / 180);
        var y = Math.cos(-angle * Math.PI / 180);
        return cc.v2(x, y);
    }
    caijiTools.getDirection = getDirection;
    /**
     * 获取贝塞尔曲线轨迹点
     * @param startPos 起点
     * @param controlPos 控制点
     * @param endPos 终点
     * @param posCount  取点数量
     */
    function getBezierPositions(startPos, controlPos, endPos, posCount) {
        var result = new Array();
        for (var i = 0; i < posCount; i++) {
            result[i] = cc.v2();
        }
        for (var i_1 = 0; i_1 < posCount; i_1++) {
            var t = i_1 / posCount;
            result[i_1].x = 1 * Math.pow(1 - t, 2) * Math.pow(t, 0) * startPos.x
                + 2 * Math.pow(1 - t, 1) * Math.pow(t, 1) * controlPos.x
                + 1 * Math.pow(1 - t, 0) * Math.pow(t, 2) * endPos.x;
            result[i_1].y = 1 * Math.pow(1 - t, 2) * Math.pow(t, 0) * startPos.y
                + 2 * Math.pow(1 - t, 1) * Math.pow(t, 1) * controlPos.y
                + 1 * Math.pow(1 - t, 0) * Math.pow(t, 2) * endPos.y;
        }
        return result;
    }
    caijiTools.getBezierPositions = getBezierPositions;
    /**
    * 截屏
    * @param camera 渲染摄像机
    * @param showTexture 渲染到目标节点（带sprite组件）
     */
    function cutPicture(camera, showTexture, size) {
        if (size === void 0) { size = null; }
        var w = size != null ? size.width : cc.winSize.width;
        var h = size != null ? size.height : cc.winSize.height;
        var rendTexture = new cc.RenderTexture();
        //@ts-ignore
        var gl = cc.game._renderContext;
        //@ts-ignore
        rendTexture.initWithSize(w, h, gl.STENCIL_INDEX8);
        //camera.cullingMask = 0xffffffff;
        camera.targetTexture = rendTexture;
        //@ts-ignore
        camera.render();
        // 指定需要读取的区域的像素
        var pixels = new Uint8Array(w * h * 4);
        var data = rendTexture.readPixels(pixels);
        var _width = rendTexture.width;
        var _height = rendTexture.height;
        var picData = caijiTools.filpYImage(data, _width, _height);
        var texture2d = new cc.Texture2D();
        //@ts-ignore
        texture2d.initWithData(picData, cc.Texture2D.RGBA8888, _width, _height);
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture2d);
        showTexture.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        showTexture.setContentSize(cc.size(w, h));
        camera.targetTexture = null;
        /*         console.log("size==="+showTexture.getContentSize());
                console.log("pos==="+showTexture.position.toString()); */
    }
    caijiTools.cutPicture = cutPicture;
    /**
     * 截取指定高度的图
     * @param camera 渲染相机
     * @param showTexture 渲染至目标节点
     * @param startY y轴开始坐标（屏幕坐标）
     * @param cutHeight 截取高度
     */
    function cutPicture_height(camera, showTexture, startY, cutHeight) {
        var w = cc.winSize.width;
        var h = cc.winSize.height;
        var rendTexture = new cc.RenderTexture();
        //@ts-ignore
        var gl = cc.game._renderContext;
        //@ts-ignore
        rendTexture.initWithSize(w, h, gl.STENCIL_INDEX8);
        //camera.cullingMask = 0xffffffff;
        camera.targetTexture = rendTexture;
        //@ts-ignore
        camera.render();
        // 指定需要读取的区域的像素
        var pixels = new Uint8Array(w * h * 4);
        var x = 0;
        var y = startY; //（x,y）为开始截取的屏幕坐标点
        var Pixels_y = cutHeight; //截取高度
        var data = rendTexture.readPixels(pixels, x, y, w, Pixels_y); //readPixels();
        var _width = rendTexture.width;
        var picData = this.filpYImage(data, _width, Pixels_y);
        var texture2d = new cc.Texture2D();
        //@ts-ignore
        texture2d.initWithData(picData, cc.Texture2D.RGBA8888, _width, Pixels_y);
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture2d);
        showTexture.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        showTexture.setContentSize(cc.size(w, Pixels_y));
    }
    caijiTools.cutPicture_height = cutPicture_height;
    function filpYImage(data, width, height) {
        // create the data array
        var picData = new Uint8Array(width * height * 4);
        var rowBytes = width * 4;
        for (var row = 0; row < height; row++) {
            var srow = height - 1 - row;
            var start = srow * width * 4;
            var reStart = row * width * 4;
            // save the piexls data
            for (var i = 0; i < rowBytes; i++) {
                picData[reStart + i] = data[start + i];
            }
        }
        return picData;
    }
    caijiTools.filpYImage = filpYImage;
    /**
     * 将相机渲染到节点
     * @param sprite 目标精灵组件
     * @param camera 渲染相机
     */
    function setCameraTexture(sprite, camera) {
        var texture = new cc.RenderTexture();
        texture.initWithSize(sprite.node.width, sprite.node.height);
        var spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        camera.targetTexture = texture;
        sprite.spriteFrame = spriteFrame;
    }
    caijiTools.setCameraTexture = setCameraTexture;
    function playSkeletonAnimation(skeleton, animationName, timeScale, isLoop) {
        if (isLoop === void 0) { isLoop = false; }
        if (animationName == skeleton.animation) {
            return;
        }
        skeleton.setAnimation(0, animationName, isLoop);
        skeleton.timeScale = timeScale;
    }
    caijiTools.playSkeletonAnimation = playSkeletonAnimation;
    /**
     * graphics画线
     * @param wordlPos 世界坐标点集
     * @param graphics graphics组件
     */
    function drawGraphics(wordlPos, graphics) {
        for (var i = 0; i < wordlPos.length; i++) {
            var nodePos = graphics.node.convertToNodeSpaceAR(wordlPos[i]);
            if (i == 0) {
                graphics.moveTo(nodePos.x, nodePos.y);
            }
            else {
                graphics.lineTo(nodePos.x, nodePos.y);
            }
            graphics.stroke();
        }
    }
    caijiTools.drawGraphics = drawGraphics;
    /**
     * 依次加载指定的游戏子包(子节跳动)
     * @param name 子包别名集合
    */
    function loadSubPackge(name) {
        var loadFunc = function (name) {
            return new Promise(function (resolve, reject) {
                //@ts-ignore
                tt.loadSubpackage({
                    name: name,
                    success: function (res) {
                        cc.assetManager.loadBundle(name, function (err, bundle) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            resolve(name + "加载完成");
                        });
                    },
                    fail: function (res) {
                        reject(res);
                    }
                });
            });
        };
        var promises = [];
        name.forEach(function (root) {
            promises.push(loadFunc(root));
        });
        return Promise.all(promises);
    }
    caijiTools.loadSubPackge = loadSubPackge;
    /**
    * 动态绑定Button点击事件
    * @param node         脚本所在节点
    * @param script_name  脚本文件名
    * @param method       指向脚本文件中的方法
    * @param btnNode      button组件所在节点
    * @param data         传递的参数
    */
    function BindButtonClickListener(node, script_name, method, btnNode, data) {
        if (data === void 0) { data = ""; }
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = node;
        clickEventHandler.component = script_name;
        clickEventHandler.handler = method;
        if (data != "") {
            clickEventHandler.customEventData = data;
        }
        var button = btnNode.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    }
    caijiTools.BindButtonClickListener = BindButtonClickListener;
    function openPhysicsSystem(isShowDebugPhy, isShowDebugCollider) {
        if (isShowDebugPhy === void 0) { isShowDebugPhy = 1; }
        if (isShowDebugCollider === void 0) { isShowDebugCollider = false; }
        var physicsManager = cc.director.getPhysicsManager();
        var colliderManager = cc.director.getCollisionManager();
        physicsManager.enabled = true;
        colliderManager.enabled = true;
        colliderManager.enabledDebugDraw = isShowDebugCollider == false ? false : true;
        physicsManager.debugDrawFlags = isShowDebugPhy == 1 ? 1 : 0;
    }
    caijiTools.openPhysicsSystem = openPhysicsSystem;
    /**
     * 随机整数
     * @param min 最小值
     * @param max 最大值
     * @returns
     */
    function random_int(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    caijiTools.random_int = random_int;
})(caijiTools = exports.caijiTools || (exports.caijiTools = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcY2FpamlUb29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMkM7QUFDM0MsNkNBQXdDO0FBQ3hDLG9EQUErQztBQUMvQyxtQ0FBa0M7QUFDbEMsQ0FBQztJQUNHLElBQUksS0FBSyxHQUFHLGNBQVcsQ0FBQyxDQUFDO0lBQ3pCLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDdEMsT0FBTztJQUNQLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLFVBQVUsS0FBSztRQUMzQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzlDLElBQUksTUFBTSxHQUFTLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDaEMsSUFBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxJQUFFLFVBQVUsRUFBQztnQkFDekUsc0JBQVksQ0FBQyxTQUFTLENBQUMsd0JBQVMsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3REO1lBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDakM7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNC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LFFBb2lCMUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdWRpb05hbWUgfSBmcm9tIFwiLi9hdWRpb05hbWVNZ3JcIjtcbmltcG9ydCBkb250RGVzdHJveSBmcm9tIFwiLi9kb250RGVzdHJveVwiO1xuaW1wb3J0IGF1ZGlvTWFuYWdlciBmcm9tIFwiLi9tYWluL2F1ZGlvTWFuYWdlclwiO1xuaW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuL3Nkay9kYXRhXCI7XG4oZnVuY3Rpb24oKXtcbiAgICB2YXIgU3VwZXIgPSBmdW5jdGlvbigpe307XG4gICAgU3VwZXIucHJvdG90eXBlID0gY2MuQnV0dG9uLnByb3RvdHlwZTtcbiAgICAvL+WunuS+i+WMluWOn+Wei1xuICAgIFN1cGVyLnByb3RvdHlwZS5fb25Ub3VjaEJlZ2FuID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmludGVyYWN0YWJsZSAmJiB0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgbGV0IHRhcmdldDpjYy5Ob2RlPWV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgIGlmKHRhcmdldC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5jbGlja0V2ZW50c1swXS5jdXN0b21FdmVudERhdGEhPVwib2Zmc291bmRcIil7XG4gICAgICAgICAgICAgICAgYXVkaW9NYW5hZ2VyLnBsYXlBdWRpbyhhdWRpb05hbWUuYnV0dG9uLGZhbHNlLDAuNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fcHJlc3NlZCkge1xuICAgICAgICAgICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyh0aGlzLmNsaWNrRXZlbnRzLCBldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmVtaXQoXCJjbGlja1wiLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3ByZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlU3RhdGUoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5leHBvcnQgbmFtZXNwYWNlIGNhaWppVG9vbHMge1xuICAgIC8qKlxuICAgICAqIOWKoOi9vemfs+mikei1hOa6kFxuICAgICAqIEBwYXJhbSBwYXRoIHJlc291cmNl5LiL6Lev5b6EXG4gICAgKi9cbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEF1ZGlvQ2xpcChwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGNhaWppVG9vbHMubG9hZFJlc291cmNlczxjYy5BdWRpb0NsaXA+KHBhdGgsIGNjLkF1ZGlvQ2xpcCk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWKoOi9veWIhuWMheS4remfs+mikVxuICAgICAqIEBwYXJhbSBidW5kbGVOYW1lIOWIhuWMheWQjVxuICAgICAqIEBwYXJhbSBwYXRoIOWIhuWMheS4i+i3r+W+hFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkQXVkaW9DbGlwQnVuZGxlKGJ1bmRsZU5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBjYWlqaVRvb2xzLmxvYWRCdW5kbGVSZXM8Y2MuQXVkaW9DbGlwPihidW5kbGVOYW1lLCBwYXRoLCBjYy5BdWRpb0NsaXApO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNrZWxldG9uKHBhdGg6IHN0cmluZykge1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgY2FpamlUb29scy5sb2FkUmVzb3VyY2VzPHNwLlNrZWxldG9uRGF0YT4ocGF0aCwgc3AuU2tlbGV0b25EYXRhKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yqg6L295Zu+54mH6LWE5rqQXG4gICAgICogQHBhcmFtIHBhdGggcmVzb3VyY2XkuIvot6/lvoRcbiAgICAgKi9cbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFNwcml0ZUZyYW1lKHBhdGg6IHN0cmluZykge1xuICAgICAgICBsZXQgcmVzID0gYXdhaXQgY2FpamlUb29scy5sb2FkUmVzb3VyY2VzPGNjLlNwcml0ZUZyYW1lPihwYXRoLCBjYy5TcHJpdGVGcmFtZSk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWKoOi9veWIhuWMheS4reWbvueJh1xuICAgICAqIEBwYXJhbSBidW5kbGVOYW1lIOWIhuWMheWQjVxuICAgICAqIEBwYXJhbSBwYXRoIOWIhuWMheS4i+i3r+W+hFxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkU3ByaXRlRnJhbWVCdW5kbGUoYnVuZGxlTmFtZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGNhaWppVG9vbHMubG9hZEJ1bmRsZVJlczxjYy5TcHJpdGVGcmFtZT4oYnVuZGxlTmFtZSwgcGF0aCwgY2MuU3ByaXRlRnJhbWUpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliqDovb10ZXh0dXJlMmTotYTmupBcbiAgICAgKiBAcGFyYW0gcGF0aCDov5znqIvpk77mjqVcbiAgICAgKi9cbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFVybFR4dHVyZShwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGNhaWppVG9vbHMubG9hZFVybFJlc291cmNlczxjYy5UZXh0dXJlMkQ+KHBhdGgsIGNjLlRleHR1cmUyRCk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWKoOi9vemihOWItuS9k+i1hOa6kFxuICAgICAqIEBwYXJhbSBwYXRoIHJlc291cmNl5LiL6Lev5b6EXG4gICAgKi9cbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFByZWZhYihwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGNhaWppVG9vbHMubG9hZFJlc291cmNlczxjYy5QcmVmYWI+KHBhdGgsIGNjLlByZWZhYik7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkUmVzb3VyY2VzPFQ+KHBhdGg6IHN0cmluZywgdHlwZSk6IFByb21pc2U8VD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQocGF0aCwgdHlwZSwgZnVuY3Rpb24gKGVyciwgcmVzOiB0eXBlb2YgdHlwZSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDovb3otYTmupDlpLHotKXvvIFcIiArIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDliqDovb3liIbljIXotYTmupBcbiAgICAgKiBAcGFyYW0gYnVuZGxlTmFtZSDliIbljIXlkI1cbiAgICAgKiBAcGFyYW0gcGF0aCDliIbljIXkuIvot6/lvoRcbiAgICAgKiBAcGFyYW0gdHlwZSDmlofku7bnsbvlnotcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gbG9hZEJ1bmRsZVJlczxUPihidW5kbGVOYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgdHlwZSk6IFByb21pc2U8VD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGJ1bmRsZSA9IGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGUoYnVuZGxlTmFtZSk7XG4gICAgICAgICAgICBpZiAoIWJ1bmRsZSkge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcImxvYWRCdW5kbGVSZXMgZmlyc3Q6XCIsYnVuZGxlTmFtZSlcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZShidW5kbGVOYW1lLCAoZXJyLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidW5kbGUgPSBiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlLmxvYWQocGF0aCwgdHlwZSwgKGVyciwgcmVzOiB0eXBlb2YgdHlwZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJsb2FkQnVuZGxlUmVzIGZpcnN0OlwiLGJ1bmRsZU5hbWUscGF0aCxcIiBmYWlsOlwiLGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nKFwibG9hZEJ1bmRsZVJlcyBmaXJzdDpcIixidW5kbGVOYW1lLFwiIGZhaWw6XCIsZXJyKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1bmRsZS5sb2FkKHBhdGgsIHR5cGUsIChlcnIsIHJlczogdHlwZW9mIHR5cGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5sb2coXCJsb2FkQnVuZGxlUmVzOlwiLGJ1bmRsZU5hbWUscGF0aCxcIiBmYWlsOlwiLGVycilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWKoOi9veWIhuWMhVxuICAgICAqIEBwYXJhbSBidW5kbGVOYW1lIOWIhuWMheWQjVxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkQnVuZGxlUGFja2FnZShidW5kbGVOYW1lOnN0cmluZyxjYWxsQmFjazpGdW5jdGlvbil7XG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQnVuZGxlKGJ1bmRsZU5hbWUsIChlcnIsIGJ1bmRsZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBjYWxsQmFjayhidW5kbGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2FkVXJsUmVzb3VyY2VzPFQ+KHBhdGg6IHN0cmluZywgdHlwZSk6IFByb21pc2U8VD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUocGF0aCwgdHlwZSwgZnVuY3Rpb24gKGVyciwgcmVzOiB0eXBlb2YgdHlwZSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLliqDovb11cmzotYTmupDlpLHotKXvvIFcIiArIHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gYWRkQ29pbihhZGROdW06IG51bWJlciwgY29pbkxhYmVsOiBjYy5MYWJlbCA9IG51bGwsIGNvaW5Ob2RlOiBjYy5Ob2RlID0gbnVsbCkge1xuICAgICAgICBsZXQgbm93Q29pbiA9IE51bWJlcihkYXRhLmdldENhY2hlKFwiQmFzZVwiLCBcImNvaW5cIikpO1xuICAgICAgICBsZXQgb2JqID0geyBhOiBub3dDb2luIH07XG4gICAgICAgIG5vd0NvaW4gKz0gYWRkTnVtO1xuICAgICAgICBkYXRhLnVwZGF0ZUNhY2hlKFwiQmFzZVwiLCBcImNvaW5cIiwgbm93Q29pbik7XG4gICAgICAgIGNhaWppVG9vbHMuc2hvd0dldENvaW5UaXAoYWRkTnVtKTtcbiAgICAgICAgaWYgKGNvaW5MYWJlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb2luTGFiZWwudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBjYy50d2VlbihvYmopXG4gICAgICAgICAgICAgICAgLnRvKDEsIHsgYTogbm93Q29pbiB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIGN1cnJlbnQ6IGFueSwgdDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0Oui1t+Wni+WAvCBlbmQ657uI54K55YC8IGN1cnJlbnQ65b2T5YmN5YC8IHQ65oC75pe25Y2g5q+UMH4xIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy/ov5Tlm57lgLzkuLrmnIDnu4jotYvlgLxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub3cgPSBjYy5taXNjLmxlcnAoc3RhcnQsIGVuZCwgdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luTGFiZWwuc3RyaW5nID0gbm93LnRvRml4ZWQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm93O1xuICAgICAgICAgICAgICAgICAgICB9LCBlYXNpbmc6IFwiY3ViaWNPdXRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvaW5Ob2RlID09IG51bGwpIHJldHVybjtcbiAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoXCJwcmVmYWIvYWRkTGFibGVcIiwgY2MuUHJlZmFiLCBmdW5jdGlvbiAoZXJyLCBQcmVmYWI6IGNjLlByZWZhYikge1xuICAgICAgICAgICAgaWYgKGVyciAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBjYy5sb2coZXJyKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGFkZExhYmxlID0gY2MuaW5zdGFudGlhdGUoUHJlZmFiKTtcbiAgICAgICAgICAgIGFkZExhYmxlLnNldFBhcmVudChjb2luTm9kZSk7XG4gICAgICAgICAgICBhZGRMYWJsZS5zZXRQb3NpdGlvbihjYy52Mihjb2luTm9kZS53aWR0aCAvIDIsIC1jb2luTm9kZS5oZWlnaHQgLyAyKSk7XG4gICAgICAgICAgICBhZGRMYWJsZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGFkZE51bSA+IDAgPyAoXCIrXCIgKyBhZGROdW0pIDogYWRkTnVtLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBhZGRMYWJsZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgY2MudHdlZW4oYWRkTGFibGUpXG4gICAgICAgICAgICAgICAgLnRvKDAuMSwgeyBzY2FsZTogMC44IH0pXG4gICAgICAgICAgICAgICAgLmJ5KDAuNSwgeyBwb3NpdGlvbjogY2MudjMoMCwgNzApLCBvcGFjaXR5OiAtMjU1IH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhZGRMYWJsZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaG93R2V0Q29pblRpcChhZGROdW06IG51bWJlcikge1xuICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy91aS9nZXRDb2luVGlwXCIpO1xuICAgICAgICBpZiAoIXByZWZhYikgcmV0dXJuO1xuICAgICAgICBsZXQgbm9kZSA9IGNhaWppVG9vbHMuY3JlYXRlTm9kZShwcmVmYWIsIGNjLmZpbmQoXCJDYW52YXNcIikpO1xuICAgICAgICBub2RlLmdldENvbXBvbmVudChcImdldENvaW5UaXBcIikuYWRkTnVtID0gYWRkTnVtO1xuICAgICAgICBub2RlLnNldFBvc2l0aW9uKDAsIGNjLndpblNpemUuaGVpZ2h0IC8gMiAqIDAuMik7XG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNob3dHZXRQb3dlclRpcChhZGROdW06IG51bWJlcikge1xuICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy91aS9nZXRQb3dlclRpcFwiKTtcbiAgICAgICAgaWYgKCFwcmVmYWIpIHJldHVybjtcbiAgICAgICAgbGV0IG5vZGUgPSBjYWlqaVRvb2xzLmNyZWF0ZU5vZGUocHJlZmFiLCBjYy5maW5kKFwiQ2FudmFzXCIpKTtcbiAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJnZXRQb3dlclRpcFwiKS5hZGROdW0gPSBhZGROdW07XG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oMCwgY2Mud2luU2l6ZS5oZWlnaHQgLyAyICogMC4yKTtcbiAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gYWRkUG93ZXIoYWRkTnVtOiBudW1iZXIsIHBvd2VyTGFiZWw6IGNjLkxhYmVsID0gbnVsbCkge1xuICAgICAgICBsZXQgbm93UG93ZXIgPSBOdW1iZXIoZGF0YS5nZXRDYWNoZShcIkJhc2VcIiwgXCJwb3dlclwiKSk7XG4gICAgICAgIGxldCBvYmogPSB7IGE6IG5vd1Bvd2VyIH07XG4gICAgICAgIG5vd1Bvd2VyICs9IGFkZE51bTtcbiAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcIkJhc2VcIiwgXCJwb3dlclwiLCBub3dQb3dlcik7XG4gICAgICAgIGRvbnREZXN0cm95Lmluc3RhbmNlLmNoZWNrUG93ZXJJc0Z1bGwoKTtcbiAgICAgICAgY2FpamlUb29scy5zaG93R2V0UG93ZXJUaXAoYWRkTnVtKTtcbiAgICAgICAgaWYgKHBvd2VyTGFiZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgcG93ZXJMYWJlbC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgIGNjLnR3ZWVuKG9iailcbiAgICAgICAgICAgICAgICAudG8oMC41LCB7IGE6IG5vd1Bvd2VyIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IChzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgY3VycmVudDogYW55LCB0OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc3RhcnQ66LW35aeL5YC8IGVuZDrnu4jngrnlgLwgY3VycmVudDrlvZPliY3lgLwgdDrmgLvml7bljaDmr5QwfjEgXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+i/lOWbnuWAvOS4uuacgOe7iOi1i+WAvFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vdyA9IGNjLm1pc2MubGVycChzdGFydCwgZW5kLCB0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvd2VyTGFiZWwuc3RyaW5nID0gbm93LnRvRml4ZWQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm93O1xuICAgICAgICAgICAgICAgICAgICB9LCBlYXNpbmc6IFwiY3ViaWNPdXRcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzQ29pbkVub3VnaChudW1iZXI6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJCYXNlXCIsIFwiY29pblwiKSkgPj0gbnVtYmVyO1xuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gaXNQb3dlckVub3VnaChudW1iZXI6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gTnVtYmVyKGRhdGEuZ2V0Q2FjaGUoXCJCYXNlXCIsIFwicG93ZXJcIikpID49IG51bWJlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bGV56S66Kej6ZSB55qu6IKk5by556qXIFxuICAgICAqIEBwYXJhbSBza2luSW5kZXgg5LiL5qCH5LuOMOW8gOWni1xuICAgICAqIEBwYXJhbSB1aU5hbWUg6I635b6X55qu6IKk5by556qXdWnlkI1cbiAgICAgKi9cbiAgICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gc2hvd1VubG9ja1NraW4oc2tpbkluZGV4OiBudW1iZXIsIHVpTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGRhdGEudXBkYXRlQ2FjaGUoXCJCYXNlXCIsIFwiaW5Vc2luZ1NraW5cIiwgc2tpbkluZGV4KTtcbiAgICAgICAgZGF0YS51cGRhdGVDYWNoZShcInNraW5zXCIsIHNraW5JbmRleC50b1N0cmluZygpLCAxKTtcbiAgICAgICAgbGV0IHByZWZhYiA9IGF3YWl0IGNhaWppVG9vbHMubG9hZFByZWZhYihcInByZWZhYnMvdWkvXCIgKyB1aU5hbWUpO1xuICAgICAgICBsZXQgbmRvZSA9IGNhaWppVG9vbHMuY3JlYXRlTm9kZShwcmVmYWIsIGNjLmZpbmQoXCJDYW52YXNcIiksIHRydWUpO1xuICAgICAgICBuZG9lLmdldENvbXBvbmVudCh1aU5hbWUpLnNraW5JbmRleCA9IHNraW5JbmRleDtcbiAgICB9XG4gICAgLyoqXG4gICAgKiDlvLnnqpdcbiAgICAqIEBwYXJhbSB1aU5hbWUg5by556qXdWnlkI1cbiAgICAqL1xuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaG93UG9wdXAodWlOYW1lOiBzdHJpbmcsIHBhcmVudDogY2MuTm9kZSxpc1Nob3c9dHJ1ZSx6SW5kZXhNYXg6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy91aS9cIiArIHVpTmFtZSk7XG4gICAgICAgIGlmKHByZWZhYilcbiAgICAgICAgcmV0dXJuIGNhaWppVG9vbHMuY3JlYXRlTm9kZShwcmVmYWIsIHBhcmVudCwgaXNTaG93LHpJbmRleE1heCk7XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2RlKHByZWZhYjogY2MuUHJlZmFiLCBwYXJlbnQ6IGNjLk5vZGUsaXNTaG93OmJvb2xlYW49dHJ1ZSx6SW5kZXhNYXg6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBsZXQgbmV3Tm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgIG5ld05vZGUuc2V0UGFyZW50KHBhcmVudCk7XG4gICAgICAgIG5ld05vZGUuc2V0UG9zaXRpb24oMCwgMCk7XG4gICAgICAgIGlmICh6SW5kZXhNYXgpIHtcbiAgICAgICAgICAgIG5ld05vZGUuekluZGV4ID0gY2MubWFjcm8uTUFYX1pJTkRFWDtcbiAgICAgICAgfVxuICAgICAgICBuZXdOb2RlLmFjdGl2ZSA9IGlzU2hvdztcbiAgICAgICAgcmV0dXJuIG5ld05vZGU7XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQb3dlclRpbWVyKHBvd2VyTGFiZWw6IGNjLkxhYmVsLCBwb3dlclRpbWVyTGFiZWw6IGNjLkxhYmVsLG1heFBvd2VyOm51bWJlcikge1xuICAgICAgICBsZXQgbm93UG93ZXIgPSBkYXRhLmdldENhY2hlPHN0cmluZz4oXCJCYXNlXCIsIFwicG93ZXJcIik7XG4gICAgICAgIHBvd2VyTGFiZWwuc3RyaW5nID0gbm93UG93ZXI7XG4gICAgICAgIGlmIChkb250RGVzdHJveS5pbnN0YW5jZS5pc1RpbWVyICYmIHBvd2VyVGltZXJMYWJlbC5ub2RlLmFjdGl2ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgcG93ZXJUaW1lckxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChkb250RGVzdHJveS5pbnN0YW5jZS5pc1RpbWVyID09IGZhbHNlICYmIHBvd2VyVGltZXJMYWJlbC5ub2RlLmFjdGl2ZSA9PSB0cnVlKSB7XG4gICAgICAgICAgICBwb3dlclRpbWVyTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZihOdW1iZXIobm93UG93ZXIpPj1tYXhQb3dlcikgcmV0dXJuO1xuICAgICAgICBpZiAoZG9udERlc3Ryb3kuaW5zdGFuY2Uuc2VjID49IDEwKSB7XG4gICAgICAgICAgICBwb3dlclRpbWVyTGFiZWwuc3RyaW5nID0gXCIwXCIgKyBkb250RGVzdHJveS5pbnN0YW5jZS5taW4gKyBcIjpcIiArIGRvbnREZXN0cm95Lmluc3RhbmNlLnNlYztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvd2VyVGltZXJMYWJlbC5zdHJpbmcgPSBcIjBcIiArIGRvbnREZXN0cm95Lmluc3RhbmNlLm1pbiArIFwiOlwiICsgXCIwXCIgKyBkb250RGVzdHJveS5pbnN0YW5jZS5zZWMgO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaKluWKqOebuOaculxuICAgICAqIEBwYXJhbSBjYW1lcmFOb2RlIOebuOacuuiKgueCuVxuICAgICAqIEBwYXJhbSByZXBlYXQg6YeN5aSN5qyh5pWwXG4gICAgICogQHBhcmFtIG9mZnNldFggeOWBj+enu+mHj1xuICAgICAqIEBwYXJhbSBvZmZzZXRZIHnlgY/np7vph49cbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gc2NyZWVuU2hha2UoY2FtZXJhTm9kZTogY2MuTm9kZSwgcmVwZWF0OiBudW1iZXIgPSA2LCBvZmZzZXRYOiBudW1iZXIgPSA1LCBvZmZzZXRZOiBudW1iZXIgPSAxMCkge1xuICAgICAgICBsZXQgdGltZXM9MDtcbiAgICAgICAgbGV0IG5vd1g9b2Zmc2V0WDtcbiAgICAgICAgbGV0IG5vd1k9b2Zmc2V0WTtcbiAgICAgICAgbGV0IHR3ZWVuPShveCxveSk9PntcbiAgICAgICAgICAgIHRpbWVzKys7XG4gICAgICAgICAgICBjYy50d2VlbihjYW1lcmFOb2RlKVxuICAgICAgICAgICAgLmJ5KDAuMDMsIHsgeTpveSB9KVxuICAgICAgICAgICAgLmJ5KDAuMDMsIHsgeTotb3kgfSlcbiAgICAgICAgICAgIC5jYWxsKCgpPT57XG4gICAgICAgICAgICAgICAgaWYodGltZXM8cmVwZWF0KXtcbiAgICAgICAgICAgICAgICAgICAgbm93WD1ub3dYLW9mZnNldFgvcmVwZWF0O1xuICAgICAgICAgICAgICAgICAgICBub3dZPW5vd1ktb2Zmc2V0WS9yZXBlYXQ7XG4gICAgICAgICAgICAgICAgICAgIHR3ZWVuKG5vd1gsbm93WSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdGFydCgpXG4gICAgICAgIH1cbiAgICAgICAgdHdlZW4obm93WCxub3dZKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5pS55Y+YYnVpbGTnm7jmnLrnmoR56L205Z2Q5qCH5L2/5YW25bu6562R5LiA55u05L+d5oyB5Zyo5pyA5bqV6YOoXG4gICAgICogQHBhcmFtIGNhbWVyYSDnm67moIfnm7jmnLpcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY2hhbmdlQnVsaWRDYW1lcmFfcG9zWShjYW1lcmE6IGNjLkNhbWVyYSkge1xuICAgICAgICBsZXQgWSA9ICgxIC8gY2FtZXJhLnpvb21SYXRpbyAtIDEpICogY2Mud2luU2l6ZS5oZWlnaHQgLyAyO1xuICAgICAgICBjYW1lcmEubm9kZS55ID0gWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bkuKTlkJHph4/nmoTlpLnop5JcbiAgICAgKiBAcGFyYW0gdmVjMSDlkJHph48xXG4gICAgICogQHBhcmFtIHZlYzIg5ZCR6YePMlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZUJldHdlZW5Ud29WZWModmVjMTogY2MuVmVjMiwgdmVjMjogY2MuVmVjMikge1xuICAgICAgICByZXR1cm4gdmVjMS5ub3JtYWxpemUoKS5zaWduQW5nbGUodmVjMi5ub3JtYWxpemUoKSkgKiAxODAgLyBNYXRoLlBJO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5bmlrnlkJHop5LluqbvvIjku6V56L205q2j5pa55ZCR5Li65Z+65YeG6aG65pe26ZKI5peL6L2sMTgwwrDkuLrmraPvvIzpgIbml7bpkogxODDCsOS4uui0n++8iVxuICAgICAqIEBwYXJhbSB4IFxuICAgICAqIEBwYXJhbSB5IFxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZURlcGVuZFkoeCwgeSkge1xuICAgICAgICBsZXQgcmFkID0gTWF0aC5hdGFuMih4LCB5KTsgLy8g5Y+N5q2j5YiH5Ye95pWw77yM5b6X5Yiw5byn5bqmXG4gICAgICAgIGxldCBhbmdsZSA9IDE4MCAqIHJhZCAvIE1hdGguUEk7ICAgIC8vIOWwhuW8p+W6pnJhZOi9rOaNouS4uuinkuW6plxuICAgICAgICByZXR1cm4gYW5nbGU7XG4gICAgfVxuICAgIC8vY2MubWlzYy5kZWdyZWVzVG9SYWRpYW5zKGRlZykgLy8g6KeS5bqm6L2s5byn5bqmXG4gICAgLy9jYy5taXNjLnJhZGlhbnNUb0RlZ3JlZXMocmFkKSAgLy8g5byn5bqm6L2s6KeS5bqmXG4gICAgLyoqXG4gICAgICog6I635Y+W6KeS5bqm5pa55ZCR5ZCR6YePXG4gICAgICogQHBhcmFtIGFuZ2xlIOinkuW6plxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXREaXJlY3Rpb24oYW5nbGUpIHtcbiAgICAgICAgbGV0IHggPSBNYXRoLnNpbigtYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgbGV0IHkgPSBNYXRoLmNvcygtYW5nbGUgKiBNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgcmV0dXJuIGNjLnYyKHgsIHkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5botJ3loZ7lsJTmm7Lnur/ovajov7nngrlcbiAgICAgKiBAcGFyYW0gc3RhcnRQb3Mg6LW354K5XG4gICAgICogQHBhcmFtIGNvbnRyb2xQb3Mg5o6n5Yi254K5XG4gICAgICogQHBhcmFtIGVuZFBvcyDnu4jngrlcbiAgICAgKiBAcGFyYW0gcG9zQ291bnQgIOWPlueCueaVsOmHj1xuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRCZXppZXJQb3NpdGlvbnMoc3RhcnRQb3MsIGNvbnRyb2xQb3MsIGVuZFBvcywgcG9zQ291bnQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IGNjLnYyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgdCA9IGkgLyBwb3NDb3VudDtcbiAgICAgICAgICAgIHJlc3VsdFtpXS54ID0gMSAqIE1hdGgucG93KDEgLSB0LCAyKSAqIE1hdGgucG93KHQsIDApICogc3RhcnRQb3MueFxuICAgICAgICAgICAgICAgICsgMiAqIE1hdGgucG93KDEgLSB0LCAxKSAqIE1hdGgucG93KHQsIDEpICogY29udHJvbFBvcy54XG4gICAgICAgICAgICAgICAgKyAxICogTWF0aC5wb3coMSAtIHQsIDApICogTWF0aC5wb3codCwgMikgKiBlbmRQb3MueDtcbiAgICAgICAgICAgIHJlc3VsdFtpXS55ID0gMSAqIE1hdGgucG93KDEgLSB0LCAyKSAqIE1hdGgucG93KHQsIDApICogc3RhcnRQb3MueVxuICAgICAgICAgICAgICAgICsgMiAqIE1hdGgucG93KDEgLSB0LCAxKSAqIE1hdGgucG93KHQsIDEpICogY29udHJvbFBvcy55XG4gICAgICAgICAgICAgICAgKyAxICogTWF0aC5wb3coMSAtIHQsIDApICogTWF0aC5wb3codCwgMikgKiBlbmRQb3MueTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAqIOaIquWxj1xuICAgICogQHBhcmFtIGNhbWVyYSDmuLLmn5PmkYTlg4/mnLpcbiAgICAqIEBwYXJhbSBzaG93VGV4dHVyZSDmuLLmn5PliLDnm67moIfoioLngrnvvIjluKZzcHJpdGXnu4Tku7bvvIlcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3V0UGljdHVyZShjYW1lcmE6IGNjLkNhbWVyYSwgc2hvd1RleHR1cmU6IGNjLk5vZGUsIHNpemU6IGNjLlNpemUgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHc6IG51bWJlciA9IHNpemUgIT0gbnVsbCA/IHNpemUud2lkdGggOiBjYy53aW5TaXplLndpZHRoO1xuICAgICAgICBjb25zdCBoOiBudW1iZXIgPSBzaXplICE9IG51bGwgPyBzaXplLmhlaWdodCA6IGNjLndpblNpemUuaGVpZ2h0O1xuXG4gICAgICAgIGxldCByZW5kVGV4dHVyZTogY2MuUmVuZGVyVGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBsZXQgZ2wgPSBjYy5nYW1lLl9yZW5kZXJDb250ZXh0O1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgcmVuZFRleHR1cmUuaW5pdFdpdGhTaXplKHcsIGgsIGdsLlNURU5DSUxfSU5ERVg4KTtcblxuICAgICAgICAvL2NhbWVyYS5jdWxsaW5nTWFzayA9IDB4ZmZmZmZmZmY7XG4gICAgICAgIGNhbWVyYS50YXJnZXRUZXh0dXJlID0gcmVuZFRleHR1cmU7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBjYW1lcmEucmVuZGVyKCk7XG5cbiAgICAgICAgLy8g5oyH5a6a6ZyA6KaB6K+75Y+W55qE5Yy65Z+f55qE5YOP57SgXG4gICAgICAgIGxldCBwaXhlbHMgPSBuZXcgVWludDhBcnJheSh3ICogaCAqIDQpO1xuICAgICAgICBsZXQgZGF0YSA9IHJlbmRUZXh0dXJlLnJlYWRQaXhlbHMocGl4ZWxzKTtcbiAgICAgICAgbGV0IF93aWR0aCA9IHJlbmRUZXh0dXJlLndpZHRoO1xuICAgICAgICBsZXQgX2hlaWdodCA9IHJlbmRUZXh0dXJlLmhlaWdodDtcbiAgICAgICAgbGV0IHBpY0RhdGEgPSBjYWlqaVRvb2xzLmZpbHBZSW1hZ2UoZGF0YSwgX3dpZHRoLCBfaGVpZ2h0KTtcblxuICAgICAgICBsZXQgdGV4dHVyZTJkOiBjYy5UZXh0dXJlMkQgPSBuZXcgY2MuVGV4dHVyZTJEKCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0ZXh0dXJlMmQuaW5pdFdpdGhEYXRhKHBpY0RhdGEsIGNjLlRleHR1cmUyRC5SR0JBODg4OCwgX3dpZHRoLCBfaGVpZ2h0KTtcblxuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoKTtcbiAgICAgICAgc3ByaXRlRnJhbWUuc2V0VGV4dHVyZSh0ZXh0dXJlMmQpO1xuXG4gICAgICAgIHNob3dUZXh0dXJlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICAgICAgIHNob3dUZXh0dXJlLnNldENvbnRlbnRTaXplKGNjLnNpemUodywgaCkpO1xuICAgICAgICBjYW1lcmEudGFyZ2V0VGV4dHVyZSA9IG51bGw7XG4gICAgICAgIC8qICAgICAgICAgY29uc29sZS5sb2coXCJzaXplPT09XCIrc2hvd1RleHR1cmUuZ2V0Q29udGVudFNpemUoKSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwb3M9PT1cIitzaG93VGV4dHVyZS5wb3NpdGlvbi50b1N0cmluZygpKTsgKi9cbiAgICB9XG4gICAgLyoqXG4gICAgICog5oiq5Y+W5oyH5a6a6auY5bqm55qE5Zu+XG4gICAgICogQHBhcmFtIGNhbWVyYSDmuLLmn5Pnm7jmnLpcbiAgICAgKiBAcGFyYW0gc2hvd1RleHR1cmUg5riy5p+T6Iez55uu5qCH6IqC54K5XG4gICAgICogQHBhcmFtIHN0YXJ0WSB56L205byA5aeL5Z2Q5qCH77yI5bGP5bmV5Z2Q5qCH77yJXG4gICAgICogQHBhcmFtIGN1dEhlaWdodCDmiKrlj5bpq5jluqZcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gY3V0UGljdHVyZV9oZWlnaHQoY2FtZXJhOiBjYy5DYW1lcmEsIHNob3dUZXh0dXJlOiBjYy5Ob2RlLCBzdGFydFk6IG51bWJlciwgY3V0SGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgdzogbnVtYmVyID0gY2Mud2luU2l6ZS53aWR0aDtcbiAgICAgICAgY29uc3QgaDogbnVtYmVyID0gY2Mud2luU2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgbGV0IHJlbmRUZXh0dXJlOiBjYy5SZW5kZXJUZXh0dXJlID0gbmV3IGNjLlJlbmRlclRleHR1cmUoKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIGxldCBnbCA9IGNjLmdhbWUuX3JlbmRlckNvbnRleHQ7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICByZW5kVGV4dHVyZS5pbml0V2l0aFNpemUodywgaCwgZ2wuU1RFTkNJTF9JTkRFWDgpO1xuXG4gICAgICAgIC8vY2FtZXJhLmN1bGxpbmdNYXNrID0gMHhmZmZmZmZmZjtcbiAgICAgICAgY2FtZXJhLnRhcmdldFRleHR1cmUgPSByZW5kVGV4dHVyZTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIGNhbWVyYS5yZW5kZXIoKTtcblxuICAgICAgICAvLyDmjIflrprpnIDopoHor7vlj5bnmoTljLrln5/nmoTlg4/ntKBcbiAgICAgICAgbGV0IHBpeGVscyA9IG5ldyBVaW50OEFycmF5KHcgKiBoICogNCk7XG4gICAgICAgIGxldCB4ID0gMDtcbiAgICAgICAgbGV0IHkgPSBzdGFydFk7ICAgICAgIC8v77yIeCx577yJ5Li65byA5aeL5oiq5Y+W55qE5bGP5bmV5Z2Q5qCH54K5XG4gICAgICAgIGxldCBQaXhlbHNfeSA9IGN1dEhlaWdodDsgIC8v5oiq5Y+W6auY5bqmXG4gICAgICAgIGxldCBkYXRhID0gcmVuZFRleHR1cmUucmVhZFBpeGVscyhwaXhlbHMsIHgsIHksIHcsIFBpeGVsc195KTsvL3JlYWRQaXhlbHMoKTtcbiAgICAgICAgbGV0IF93aWR0aCA9IHJlbmRUZXh0dXJlLndpZHRoO1xuICAgICAgICBsZXQgcGljRGF0YSA9IHRoaXMuZmlscFlJbWFnZShkYXRhLCBfd2lkdGgsIFBpeGVsc195KTtcblxuICAgICAgICBsZXQgdGV4dHVyZTJkOiBjYy5UZXh0dXJlMkQgPSBuZXcgY2MuVGV4dHVyZTJEKCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0ZXh0dXJlMmQuaW5pdFdpdGhEYXRhKHBpY0RhdGEsIGNjLlRleHR1cmUyRC5SR0JBODg4OCwgX3dpZHRoLCBQaXhlbHNfeSk7XG5cbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKCk7XG4gICAgICAgIHNwcml0ZUZyYW1lLnNldFRleHR1cmUodGV4dHVyZTJkKTtcblxuICAgICAgICBzaG93VGV4dHVyZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgICAgICBzaG93VGV4dHVyZS5zZXRDb250ZW50U2l6ZShjYy5zaXplKHcsIFBpeGVsc195KSk7XG4gICAgfVxuICAgIGV4cG9ydCBmdW5jdGlvbiBmaWxwWUltYWdlKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBkYXRhIGFycmF5XG4gICAgICAgIGxldCBwaWNEYXRhID0gbmV3IFVpbnQ4QXJyYXkod2lkdGggKiBoZWlnaHQgKiA0KTtcbiAgICAgICAgbGV0IHJvd0J5dGVzID0gd2lkdGggKiA0O1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBoZWlnaHQ7IHJvdysrKSB7XG4gICAgICAgICAgICBsZXQgc3JvdyA9IGhlaWdodCAtIDEgLSByb3c7XG4gICAgICAgICAgICBsZXQgc3RhcnQgPSBzcm93ICogd2lkdGggKiA0O1xuICAgICAgICAgICAgbGV0IHJlU3RhcnQgPSByb3cgKiB3aWR0aCAqIDQ7XG4gICAgICAgICAgICAvLyBzYXZlIHRoZSBwaWV4bHMgZGF0YVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dCeXRlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGljRGF0YVtyZVN0YXJ0ICsgaV0gPSBkYXRhW3N0YXJ0ICsgaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpY0RhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhuebuOacuua4suafk+WIsOiKgueCuVxuICAgICAqIEBwYXJhbSBzcHJpdGUg55uu5qCH57K+54G157uE5Lu2XG4gICAgICogQHBhcmFtIGNhbWVyYSDmuLLmn5Pnm7jmnLpcbiAgICAgKi9cbiAgICAgZXhwb3J0IGZ1bmN0aW9uIHNldENhbWVyYVRleHR1cmUoc3ByaXRlOiBjYy5TcHJpdGUsIGNhbWVyYTogY2MuQ2FtZXJhKSB7XG4gICAgICAgIGxldCB0ZXh0dXJlID0gbmV3IGNjLlJlbmRlclRleHR1cmUoKTtcbiAgICAgICAgdGV4dHVyZS5pbml0V2l0aFNpemUoc3ByaXRlLm5vZGUud2lkdGgsIHNwcml0ZS5ub2RlLmhlaWdodCk7XG4gICAgICAgIGxldCBzcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSgpO1xuICAgICAgICBzcHJpdGVGcmFtZS5zZXRUZXh0dXJlKHRleHR1cmUpO1xuICAgICAgICBjYW1lcmEudGFyZ2V0VGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgIH1cbiAgICBleHBvcnQgZnVuY3Rpb24gcGxheVNrZWxldG9uQW5pbWF0aW9uKHNrZWxldG9uOiBzcC5Ta2VsZXRvbiwgYW5pbWF0aW9uTmFtZTogc3RyaW5nLCB0aW1lU2NhbGUsIGlzTG9vcDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25OYW1lID09IHNrZWxldG9uLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNrZWxldG9uLnNldEFuaW1hdGlvbigwLCBhbmltYXRpb25OYW1lLCBpc0xvb3ApO1xuICAgICAgICBza2VsZXRvbi50aW1lU2NhbGUgPSB0aW1lU2NhbGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGdyYXBoaWNz55S757q/XG4gICAgICogQHBhcmFtIHdvcmRsUG9zIOS4lueVjOWdkOagh+eCuembhlxuICAgICAqIEBwYXJhbSBncmFwaGljcyBncmFwaGljc+e7hOS7tlxuICAgICAqL1xuICAgIGV4cG9ydCBmdW5jdGlvbiBkcmF3R3JhcGhpY3Mod29yZGxQb3M6IGNjLlZlYzJbXSwgZ3JhcGhpY3M6IGNjLkdyYXBoaWNzKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29yZGxQb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlUG9zID0gZ3JhcGhpY3Mubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JkbFBvc1tpXSk7XG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubW92ZVRvKG5vZGVQb3MueCwgbm9kZVBvcy55KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ3JhcGhpY3MubGluZVRvKG5vZGVQb3MueCwgbm9kZVBvcy55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdyYXBoaWNzLnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOS+neasoeWKoOi9veaMh+WumueahOa4uOaIj+WtkOWMhSjlrZDoioLot7PliqgpXG4gICAgICogQHBhcmFtIG5hbWUg5a2Q5YyF5Yir5ZCN6ZuG5ZCIXG4gICAgKi9cbiAgICAgZXhwb3J0IGZ1bmN0aW9uIGxvYWRTdWJQYWNrZ2UobmFtZTogc3RyaW5nW10pIHtcbiAgICAgICAgbGV0IGxvYWRGdW5jOiBGdW5jdGlvbiA9IGZ1bmN0aW9uIChuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgdHQubG9hZFN1YnBhY2thZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLCAvLyBuYW1lIOWPr+S7peWhqyBuYW1lIOaIluiAhSByb290XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkQnVuZGxlKG5hbWUsIChlcnIsIGJ1bmRsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuYW1lICsgXCLliqDovb3lrozmiJBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByb21pc2VzOiBQcm9taXNlPHN0cmluZz5bXSA9IFtdO1xuICAgICAgICBuYW1lLmZvckVhY2gocm9vdCA9PiB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKGxvYWRGdW5jKHJvb3QpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICog5Yqo5oCB57uR5a6aQnV0dG9u54K55Ye75LqL5Lu2XG4gICAgKiBAcGFyYW0gbm9kZSAgICAgICAgIOiEmuacrOaJgOWcqOiKgueCuVxuICAgICogQHBhcmFtIHNjcmlwdF9uYW1lICDohJrmnKzmlofku7blkI1cbiAgICAqIEBwYXJhbSBtZXRob2QgICAgICAg5oyH5ZCR6ISa5pys5paH5Lu25Lit55qE5pa55rOVIFxuICAgICogQHBhcmFtIGJ0bk5vZGUgICAgICBidXR0b27nu4Tku7bmiYDlnKjoioLngrlcbiAgICAqIEBwYXJhbSBkYXRhICAgICAgICAg5Lyg6YCS55qE5Y+C5pWwIFxuICAgICovXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEJpbmRCdXR0b25DbGlja0xpc3RlbmVyKG5vZGU6IGNjLk5vZGUsIHNjcmlwdF9uYW1lOiBzdHJpbmcsIG1ldGhvZDogc3RyaW5nLCBidG5Ob2RlOiBjYy5Ob2RlLCBkYXRhOiBzdHJpbmcgPSBcIlwiKTogdm9pZCB7XG4gICAgICAgIHZhciBjbGlja0V2ZW50SGFuZGxlcjogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLnRhcmdldCA9IG5vZGU7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IHNjcmlwdF9uYW1lO1xuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5oYW5kbGVyID0gbWV0aG9kO1xuICAgICAgICBpZiAoZGF0YSAhPSBcIlwiKSB7XG4gICAgICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5jdXN0b21FdmVudERhdGEgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIHZhciBidXR0b246IGNjLkJ1dHRvbiA9IGJ0bk5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIGJ1dHRvbi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gICAgZXhwb3J0IGZ1bmN0aW9uIG9wZW5QaHlzaWNzU3lzdGVtKGlzU2hvd0RlYnVnUGh5Ok51bWJlcj0xLGlzU2hvd0RlYnVnQ29sbGlkZXI6Ym9vbGVhbj1mYWxzZSl7XG4gICAgICAgIGxldCBwaHlzaWNzTWFuYWdlcj1jYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xuICAgICAgICBsZXQgY29sbGlkZXJNYW5hZ2VyPWNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKTtcbiAgICAgICAgcGh5c2ljc01hbmFnZXIuZW5hYmxlZD10cnVlO1xuICAgICAgICBjb2xsaWRlck1hbmFnZXIuZW5hYmxlZD10cnVlO1xuICAgICAgICBjb2xsaWRlck1hbmFnZXIuZW5hYmxlZERlYnVnRHJhdz1pc1Nob3dEZWJ1Z0NvbGxpZGVyPT1mYWxzZT9mYWxzZTp0cnVlO1xuICAgICAgICBwaHlzaWNzTWFuYWdlci5kZWJ1Z0RyYXdGbGFncz1pc1Nob3dEZWJ1Z1BoeT09MT8xOjA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmaj+acuuaVtOaVsFxuICAgICAqIEBwYXJhbSBtaW4g5pyA5bCP5YC8XG4gICAgICogQHBhcmFtIG1heCDmnIDlpKflgLxcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBleHBvcnQgZnVuY3Rpb24gcmFuZG9tX2ludChtaW4sIG1heCk6IG51bWJlciB7ICBcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gICAgfVxufVxuIl19