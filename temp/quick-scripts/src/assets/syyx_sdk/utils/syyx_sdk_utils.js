"use strict";
cc._RF.push(module, 'abeaaOecZpIHIRvM5TgixKt', 'syyx_sdk_utils');
// syyx_sdk/utils/syyx_sdk_utils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syyx_sdk_utils = void 0;
var syyx_sdk_config_1 = require("../configs/syyx_sdk_config");
var syyx_sdk_utils = /** @class */ (function () {
    function syyx_sdk_utils() {
    }
    syyx_sdk_utils.log = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        console.log("syyx_sdk: ", JSON.stringify(data));
    };
    syyx_sdk_utils.error = function () {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        if (syyx_sdk_config_1.init_config._debug)
            console.error("syyx_sdk: ", JSON.stringify(data));
    };
    /**
     * 从两个数中随机一个中间值
     */
    syyx_sdk_utils.get_random_number = function (list) {
        return list[0] + Math.floor(Math.random() * (list[1] - list[0]));
    };
    /**
     * 应用默认的缩放比
     */
    syyx_sdk_utils.set_default_scale = function (view) {
        var ratio = this.get_screen_ratio();
        ratio *= view.node.scaleX;
        view.node.setScale(ratio, ratio);
        console.log("igc-----screen ratio is ", ratio);
    };
    /**
    * 获取当前游戏屏幕舞台与基于1920*1080设计舞台的比例
    */
    syyx_sdk_utils.get_screen_ratio = function () {
        if (window["cc"]) {
            if (cc.view.getVisibleSize().width > cc.view.getVisibleSize().height) {
                return cc.view.getVisibleSize().height / 1080;
            }
            else if (cc.view.getVisibleSize().width <= cc.view.getVisibleSize().height) {
                return cc.view.getVisibleSize().width / 1080;
            }
        }
        return 1;
    };
    syyx_sdk_utils.get_largest_zorder = function () {
        return 32767;
    };
    /**
    * 获取视图计算缩放比之后的的实际宽高
    */
    syyx_sdk_utils.get_size = function (view) {
        if (window["Laya"]) {
            return { width: view.width * view.scaleX, height: view.height * view.scaleY };
        }
        return {};
    };
    syyx_sdk_utils.get_stage = function () {
        if (window["Laya"]) {
            window["Laya"].stage;
        }
        else {
            return window["cc"].director.getScene();
        }
    };
    /**
    * 解析配置表csv
    * @param data csv配置表原数据
    */
    syyx_sdk_utils.parse_csv = function (data, key) {
        if (syyx_sdk_config_1.syyx_const.syyx_sdk_publish === syyx_sdk_config_1.e_syyx_sdk_publish_type.in) {
            return data;
        }
        else {
            return igc.igc_resources_utils.parse_csv(data, key);
        }
    };
    syyx_sdk_utils.load_resource = function (file_path, load_back, self, error_back) {
        if (self === void 0) { self = undefined; }
        if (window["Laya"]) {
            window["Laya"].loader.load(file_path, window["Laya"].Handler.create(self, function (data) {
                if (data) {
                    load_back && load_back(data);
                }
                else {
                    console.error("igc-----load_resource fail", file_path);
                }
            }));
        }
        else {
            window["cc"].loader.loadRes(file_path, function (err, data) {
                var cur_data = data;
                if (file_path.indexOf("json") != -1) {
                    cur_data = data.json;
                }
                if (err) {
                    error_back && error_back();
                }
                else {
                    if (data) {
                        load_back && load_back(cur_data);
                    }
                    else {
                        console.error("igc-----load_resource fail", file_path);
                        error_back && error_back();
                    }
                }
            });
        }
    };
    syyx_sdk_utils.load_resource_texture = function (path, sprite) {
        if (window["cc"]) {
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if (err == null && cc.isValid(sprite) && cc.isValid(sprite.node)) {
                    sprite.spriteFrame = spriteFrame;
                }
                else {
                    console.error(path + " is not find", err);
                }
            });
        }
    };
    /**
     * 加载图片
     * @param icon 图片目标节点
     * @param icon_url 图片地址
     * @param call_back 回调  用于处理图片加载失败 或者  报错等特殊情况
     */
    syyx_sdk_utils.set_texture_url = function (icon, icon_url, call_back) {
        // if (syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
        //     return
        // }
        if (window["cc"]) {
            var url = icon_url;
            // if (this.is_texture_url(icon_url)) {
            //     url = icon_url
            // } else {
            //     url = icon_url + ".jpg"
            // }
            var texture_type = 'jpg';
            if (icon_url.indexOf(".png") != -1) {
                texture_type = 'png';
            }
            try {
                //cocos2.4.0版本
                if (window["cc"]["assetManager"] && window["cc"]["assetManager"].loadRemote) {
                    window["cc"]["assetManager"].loadRemote(url, function (err, data) {
                        if (err) {
                            console.error("sdk-----load texture fail1111", err);
                            // call_back && call_back()
                        }
                        else if (window["cc"].isValid(icon) && data) {
                            var frames = new window["cc"].SpriteFrame(data);
                            icon.spriteFrame = frames;
                        }
                    });
                }
                else {
                    //cocos2.4.0版本以下
                    window["cc"].loader.load({ url: url, type: texture_type }, function (err, data) {
                        if (err) {
                            console.error("igc-----load texture fail", err);
                            call_back && call_back();
                        }
                        else if (window["cc"].isValid(icon) && data) {
                            var frames = new window["cc"].SpriteFrame(data);
                            icon.spriteFrame = frames;
                        }
                    });
                }
            }
            catch (error) {
                call_back && call_back();
            }
        }
    };
    syyx_sdk_utils.format_remote_texture_url = function (url) {
        if (url) {
            var jpg_index = url.indexOf(".jpg");
            var png_index = url.indexOf(".png");
            if (jpg_index != -1) {
                return url.substring(0, jpg_index + 4);
            }
            else if (png_index != -1) {
                return url.substring(0, png_index + 4);
            }
            else {
                return url;
            }
        }
        return url;
    };
    syyx_sdk_utils.is_texture_url = function (icon_url) {
        if (icon_url.indexOf(".bmp") != -1 ||
            icon_url.indexOf(".jpg") != -1 ||
            icon_url.indexOf(".jpeg") != -1 ||
            icon_url.indexOf(".flic") != -1 ||
            icon_url.indexOf(".emf") != -1 ||
            icon_url.indexOf(".ico") != -1 ||
            icon_url.indexOf(".png") != -1 ||
            icon_url.indexOf(".tif") != -1 ||
            icon_url.indexOf(".gif") != -1 ||
            icon_url.indexOf(".pcx") != -1 ||
            icon_url.indexOf(".tga") != -1 ||
            icon_url.indexOf(".exif") != -1 ||
            icon_url.indexOf(".fpx") != -1 ||
            icon_url.indexOf(".svg") != -1 ||
            icon_url.indexOf(".psd") != -1 ||
            icon_url.indexOf(".cdr") != -1 ||
            icon_url.indexOf(".pcd") != -1 ||
            icon_url.indexOf(".dxf") != -1 ||
            icon_url.indexOf(".ufo") != -1 ||
            icon_url.indexOf(".eps") != -1 ||
            icon_url.indexOf(".ai") != -1 ||
            icon_url.indexOf(".raw") != -1 ||
            icon_url.indexOf(".WMF") != -1 ||
            icon_url.indexOf(".webp") != -1 ||
            icon_url.indexOf(".avif") != -1) {
            return true;
        }
        return false;
    };
    /**
     * 数据对比替换，data2比data1项多
     * @param data1
     * @param data2
     */
    syyx_sdk_utils.replace_data = function (data1, data2) {
        if (!data1 && !data2) {
            console.log("the object is wrong");
            return;
        }
        for (var idx in data2) {
            data2[idx] && (data1[idx] = data2[idx]);
        }
        console.log(data2);
    };
    syyx_sdk_utils.set_item = function (key, value) {
        var str = JSON.stringify(value);
        localStorage.setItem(key, str);
    };
    syyx_sdk_utils.get_item = function (key) {
        var item = localStorage.getItem(key);
        if (item != "") {
            return JSON.parse(item);
        }
        return null;
    };
    /**
     * 从数组中随机选择一个元素
     * @param arr
     * @param delete_this
     */
    syyx_sdk_utils.random_get = function (arr, delete_this) {
        if (delete_this === void 0) { delete_this = false; }
        var len = arr.length;
        if (len == 0) {
            console.error("try to get a member from an empty array");
            throw new Error();
        }
        else {
            var rand = Math.floor(Math.random() * len);
            var item = arr[rand];
            delete_this && arr.splice(rand, 1);
            return item;
        }
    };
    syyx_sdk_utils.check_is_same_day = function (left_time, right_tiem) {
        var left_date = new Date(left_time);
        var right_date = new Date(right_tiem);
        if (left_date.getDay() != right_date.getDay() || left_date.getMonth() != right_date.getMonth() || left_date.getFullYear() != right_date.getFullYear()) {
            return false;
        }
        return true;
    };
    syyx_sdk_utils.get_date_timestamp = function () {
        return (new Date()).getTime();
    };
    /**
    * 获取金币、钻石等显示结果
    * @param num
    */
    syyx_sdk_utils.changeToMb = function (Gold, fix_num) {
        if (fix_num === void 0) { fix_num = 1; }
        if (Gold < 10000) {
            return Gold + "";
        }
        var myGold = parseInt(Gold);
        var goldStr = "";
        if (myGold < 1000) {
            goldStr = Math.floor(myGold) + "";
        }
        else if (myGold < 1000000) {
            goldStr = (myGold / 1000).toFixed(fix_num) + "k";
        }
        else if (myGold < 1000000000) {
            goldStr = (myGold / 1000000).toFixed(fix_num) + "m";
        }
        else if (myGold < 1000000000000) {
            goldStr = (myGold / 1000000000).toFixed(fix_num) + "b";
        }
        else {
            goldStr = (myGold / 1000000000000).toFixed(fix_num) + "t";
        }
        return goldStr;
    };
    syyx_sdk_utils.formatTime = function (time) {
        if (time <= 0) {
            return "00:00:00";
        }
        var h = Math.floor(time / 3600);
        var m = Math.floor(time / 60 % 60);
        var s = Math.floor(time % 60);
        var hStr = h + "";
        var mStr = m + "";
        var sStr = s + "";
        if (h < 10) {
            hStr = "0" + h;
        }
        if (m < 10) {
            mStr = "0" + m;
        }
        if (s < 10) {
            sStr = "0" + s;
        }
        return hStr + ":" + mStr + ":" + sStr;
    };
    syyx_sdk_utils.formatTime_mmss = function (time) {
        if (time <= 0) {
            return "00:00";
        }
        var m = Math.floor(time / 60 % 60);
        var s = Math.floor(time % 60);
        var mStr = m + "";
        var sStr = s + "";
        if (m < 10) {
            mStr = "0" + m;
        }
        if (s < 10) {
            sStr = "0" + s;
        }
        return mStr + ":" + sStr;
    };
    //置灰图片
    syyx_sdk_utils.set_grey = function (node, state) {
        var s = node.getComponentsInChildren(cc.Sprite);
        for (var i = 0; i < s.length; i++) {
            s[i].setState(state);
        }
    };
    syyx_sdk_utils.get_random_int = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    // 洗牌函数，换位置，随机播放
    syyx_sdk_utils.shuffle = function (arr) {
        var _arr = arr.slice();
        for (var i = 0; i < _arr.length; i++) {
            var j = this.get_random_int(0, i);
            var t = _arr[i];
            _arr[i] = _arr[j];
            _arr[j] = t;
        }
        return _arr;
    };
    /**
    *  预加载原生图片
    */
    syyx_sdk_utils.preload_native_texture = function (url) {
        var self = this;
        if (window["Laya"]) {
            window["Laya"].loader.load(url, window["Laya"].Handler.create(self, function (data) {
                if (data) {
                    console.log('igc----- preload native_texture success---->', url);
                }
            }));
        }
        else {
            var texture_type = 'jpg';
            if (url.indexOf(".png") != -1) {
                texture_type = 'png';
            }
            //cocos2.4.0版本
            if (window["cc"]["assetManager"] && window["cc"]["assetManager"].loadRemote) {
                window["cc"]["assetManager"].loadRemote(url, function (err, data) {
                    if (data) {
                        console.log('igc----- preload native_texture success---->', url);
                    }
                });
            }
            else {
                //cocos2.4.0版本以下
                window["cc"].loader.load({ url: url, type: texture_type }, function (err, data) {
                    if (data) {
                        console.log('igc----- preload native_texture success---->', url);
                    }
                });
            }
        }
    };
    return syyx_sdk_utils;
}());
exports.syyx_sdk_utils = syyx_sdk_utils;

cc._RF.pop();