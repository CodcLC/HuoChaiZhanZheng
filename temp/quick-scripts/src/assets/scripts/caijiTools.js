"use strict";
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