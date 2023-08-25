
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/utils/syyx_sdk_utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHV0aWxzXFxzeXl4X3Nka191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBOEY7QUFFOUY7SUFBQTtJQXFaQSxDQUFDO0lBblpVLGtCQUFHLEdBQVY7UUFBVyxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNNLG9CQUFLLEdBQVo7UUFBYSxjQUFjO2FBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztZQUFkLHlCQUFjOztRQUN2QixJQUFJLDZCQUFXLENBQUMsTUFBTTtZQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7O09BRUc7SUFDSSxnQ0FBaUIsR0FBeEIsVUFBeUIsSUFBSTtRQUN6QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3BFLENBQUM7SUFFRDs7T0FFRztJQUNJLGdDQUFpQixHQUF4QixVQUF5QixJQUFTO1FBQzlCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3BDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FB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QUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNqQztZQUNFLE9BQU8sSUFBSSxDQUFBO1NBQ2Q7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDJCQUFZLEdBQW5CLFVBQW9CLEtBQWEsRUFBRSxLQUFhO1FBQzVDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBQ2xDLE9BQU07U0FDVDtRQUVELEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ25CLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUMxQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdEIsQ0FBQztJQUVNLHVCQUFRLEdBQWYsVUFBZ0IsR0FBRyxFQUFFLEtBQUs7UUFDdEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMvQixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU0sdUJBQVEsR0FBZixVQUFnQixHQUFHO1FBQ2YsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxJQUFJLElBQUksSUFBSSxFQUFFLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFDRDs7OztPQUlHO0lBQ0kseUJBQVUsR0FBakIsVUFBa0IsR0FBVSxFQUFFLFdBQW1CO1FBQW5CLDRCQUFBLEVBQUEsbUJBQW1CO1FBQzdDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDckIsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUNyQjthQUFNO1lBQ0gsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLFdBQVcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUNNLGdDQUFpQixHQUF4QixVQUF5QixTQUFTLEVBQUUsVUFBVTtRQUMxQyxJQUFJLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNuQyxJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNyQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ25KLE9BQU8sS0FBSyxDQUFBO1NBQ2Y7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFTSxpQ0FBa0IsR0FBekI7UUFDSSxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2pDLENBQUM7SUFFRDs7O01BR0U7SUFDSyx5QkFBVSxHQUFqQixVQUFrQixJQUFJLEVBQUUsT0FBVztRQUFYLHdCQUFBLEVBQUEsV0FBVztRQUMvQixJQUFJLElBQUksR0FBRyxLQUFLLEVBQUU7WUFDZCxPQUFPLElBQUksR0FBRyxFQUFFLENBQUE7U0FDbkI7UUFDRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0IsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksRUFBRTtZQUNmLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtTQUNwQzthQUFNLElBQUksTUFBTSxHQUFHLE9BQU8sRUFBRTtZQUN6QixPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQTtTQUNuRDthQUNJLElBQUksTUFBTSxHQUFHLFVBQVUsRUFBRTtZQUMxQixPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQTtTQUN0RDthQUNJLElBQUksTUFBTSxHQUFHLGFBQWEsRUFBRTtZQUM3QixPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQTtTQUN6RDthQUNJO1lBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUE7U0FDNUQ7UUFDRCxPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDO0lBRU0seUJBQVUsR0FBakIsVUFBa0IsSUFBSTtRQUNsQixJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDWCxPQUFPLFVBQVUsQ0FBQTtTQUNwQjtRQUNELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUM3QixJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ2pCLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDakIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNqQixJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDUixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQTtTQUNqQjtRQUNELElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNSLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1NBQ2pCO1FBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7U0FDakI7UUFDRCxPQUFPLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUE7SUFDekMsQ0FBQztJQUVNLDhCQUFlLEdBQXRCLFVBQXVCLElBQUk7UUFDdkIsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ1gsT0FBTyxPQUFPLENBQUE7U0FDakI7UUFDRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDbEMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDN0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUNqQixJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBRWpCLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNSLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1NBQ2pCO1FBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1IsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7U0FDakI7UUFDRCxPQUFPLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFBO0lBQzVCLENBQUM7SUFFRCxNQUFNO0lBQ0MsdUJBQVEsR0FBZixVQUFnQixJQUFhLEVBQUUsS0FBSztRQUNoQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRU0sNkJBQWMsR0FBckIsVUFBc0IsR0FBRyxFQUFFLEdBQUc7UUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELGdCQUFnQjtJQUNULHNCQUFPLEdBQWQsVUFBZSxHQUFHO1FBQ2QsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ2pDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0lBRUQ7O01BRUU7SUFDSyxxQ0FBc0IsR0FBN0IsVUFBOEIsR0FBRztRQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZixJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQUEsSUFBSTtnQkFDcEUsSUFBSSxJQUFJLEVBQUU7b0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLENBQUMsQ0FBQTtpQkFDbkU7WUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ047YUFBTTtZQUNILElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQTtZQUN4QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0JBQzNCLFlBQVksR0FBRyxLQUFLLENBQUE7YUFDdkI7WUFDRCxjQUFjO1lBQ2QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsRUFBRTtnQkFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBSTtvQkFDNUQsSUFBSSxJQUFJLEVBQUU7d0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLENBQUMsQ0FBQTtxQkFDbkU7Z0JBQ0wsQ0FBQyxDQUFDLENBQUE7YUFDTDtpQkFBTTtnQkFDSCxnQkFBZ0I7Z0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBSTtvQkFDMUUsSUFBSSxJQUFJLEVBQUU7d0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxHQUFHLENBQUMsQ0FBQTtxQkFDbkU7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUVKO0lBQ0wsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0FyWkEsQUFxWkMsSUFBQTtBQXJaWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVfc3l5eF9zZGtfcHVibGlzaF90eXBlLCBpbml0X2NvbmZpZywgc3l5eF9jb25zdCB9IGZyb20gXCIuLi9jb25maWdzL3N5eXhfc2RrX2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIHN5eXhfc2RrX3V0aWxzIHtcclxuXHJcbiAgICBzdGF0aWMgbG9nKC4uLmRhdGE6IGFueVtdKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzeXl4X3NkazogXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBlcnJvciguLi5kYXRhOiBhbnlbXSkge1xyXG4gICAgICAgIGlmIChpbml0X2NvbmZpZy5fZGVidWcpIGNvbnNvbGUuZXJyb3IoXCJzeXl4X3NkazogXCIsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7juS4pOS4quaVsOS4remaj+acuuS4gOS4quS4remXtOWAvFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X3JhbmRvbV9udW1iZXIobGlzdCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0WzBdICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGxpc3RbMV0gLSBsaXN0WzBdKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW6lOeUqOm7mOiupOeahOe8qeaUvuavlFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0X2RlZmF1bHRfc2NhbGUodmlldzogYW55KSB7XHJcbiAgICAgICAgbGV0IHJhdGlvID0gdGhpcy5nZXRfc2NyZWVuX3JhdGlvKCk7XHJcbiAgICAgICAgcmF0aW8gKj0gdmlldy5ub2RlLnNjYWxlWDtcclxuICAgICAgICB2aWV3Lm5vZGUuc2V0U2NhbGUocmF0aW8sIHJhdGlvKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS1zY3JlZW4gcmF0aW8gaXMgXCIsIHJhdGlvKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDojrflj5blvZPliY3muLjmiI/lsY/luZXoiJ7lj7DkuI7ln7rkuo4xOTIwKjEwODDorr7orqHoiJ7lj7DnmoTmr5TkvotcclxuICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X3NjcmVlbl9yYXRpbygpIHtcclxuICAgICAgICBpZiAod2luZG93W1wiY2NcIl0pIHtcclxuICAgICAgICAgICAgaWYgKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCA+IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gMTA4MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCA8PSBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoIC8gMTA4MFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRfbGFyZ2VzdF96b3JkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDMyNzY3O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDojrflj5bop4blm77orqHnrpfnvKnmlL7mr5TkuYvlkI7nmoTnmoTlrp7pmYXlrr3pq5hcclxuICAgICovXHJcbiAgICBzdGF0aWMgZ2V0X3NpemUodmlldyk6IGFueSB7XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIkxheWFcIl0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHZpZXcud2lkdGggKiB2aWV3LnNjYWxlWCwgaGVpZ2h0OiB2aWV3LmhlaWdodCAqIHZpZXcuc2NhbGVZIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHt9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldF9zdGFnZSgpIHtcclxuICAgICAgICBpZiAod2luZG93W1wiTGF5YVwiXSkge1xyXG4gICAgICAgICAgICB3aW5kb3dbXCJMYXlhXCJdLnN0YWdlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1tcImNjXCJdLmRpcmVjdG9yLmdldFNjZW5lKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOino+aekOmFjee9ruihqGNzdlxyXG4gICAgKiBAcGFyYW0gZGF0YSBjc3bphY3nva7ooajljp/mlbDmja5cclxuICAgICovXHJcbiAgICBzdGF0aWMgcGFyc2VfY3N2KGRhdGEsIGtleSkge1xyXG4gICAgICAgIGlmIChzeXl4X2NvbnN0LnN5eXhfc2RrX3B1Ymxpc2ggPT09IGVfc3l5eF9zZGtfcHVibGlzaF90eXBlLmluKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlnYy5pZ2NfcmVzb3VyY2VzX3V0aWxzLnBhcnNlX2NzdihkYXRhLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbG9hZF9yZXNvdXJjZShmaWxlX3BhdGgsIGxvYWRfYmFjaywgc2VsZiA9IHVuZGVmaW5lZCwgZXJyb3JfYmFjaz8pIHtcclxuICAgICAgICBpZiAod2luZG93W1wiTGF5YVwiXSkge1xyXG4gICAgICAgICAgICB3aW5kb3dbXCJMYXlhXCJdLmxvYWRlci5sb2FkKGZpbGVfcGF0aCwgd2luZG93W1wiTGF5YVwiXS5IYW5kbGVyLmNyZWF0ZShzZWxmLCBkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZF9iYWNrICYmIGxvYWRfYmFjayhkYXRhKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiaWdjLS0tLS1sb2FkX3Jlc291cmNlIGZhaWxcIiwgZmlsZV9wYXRoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3dbXCJjY1wiXS5sb2FkZXIubG9hZFJlcyhmaWxlX3BhdGgsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJfZGF0YSA9IGRhdGFcclxuICAgICAgICAgICAgICAgIGlmIChmaWxlX3BhdGguaW5kZXhPZihcImpzb25cIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJfZGF0YSA9IGRhdGEuanNvblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcl9iYWNrICYmIGVycm9yX2JhY2soKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkX2JhY2sgJiYgbG9hZF9iYWNrKGN1cl9kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJpZ2MtLS0tLWxvYWRfcmVzb3VyY2UgZmFpbFwiLCBmaWxlX3BhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yX2JhY2sgJiYgZXJyb3JfYmFjaygpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvYWRfcmVzb3VyY2VfdGV4dHVyZShwYXRoLCBzcHJpdGUpIHtcclxuICAgICAgICBpZiAod2luZG93W1wiY2NcIl0pIHtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMocGF0aCwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyID09IG51bGwgJiYgY2MuaXNWYWxpZChzcHJpdGUpICYmIGNjLmlzVmFsaWQoc3ByaXRlLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHBhdGggKyBcIiBpcyBub3QgZmluZFwiLCBlcnIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWbvueJh1xyXG4gICAgICogQHBhcmFtIGljb24g5Zu+54mH55uu5qCH6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gaWNvbl91cmwg5Zu+54mH5Zyw5Z2AXHJcbiAgICAgKiBAcGFyYW0gY2FsbF9iYWNrIOWbnuiwgyAg55So5LqO5aSE55CG5Zu+54mH5Yqg6L295aSx6LSlIOaIluiAhSAg5oql6ZSZ562J54m55q6K5oOF5Ya1XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXRfdGV4dHVyZV91cmwoaWNvbiwgaWNvbl91cmwsIGNhbGxfYmFjaz8pIHtcclxuICAgICAgICAvLyBpZiAoc3l5eF9jb25zdC5zeXl4X3Nka19jaGFubmVsID09PSBpZ2MuZV9jaGFubmVsX3R5cGUud2ViKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZiAod2luZG93W1wiY2NcIl0pIHtcclxuICAgICAgICAgICAgbGV0IHVybCA9IGljb25fdXJsXHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmlzX3RleHR1cmVfdXJsKGljb25fdXJsKSkge1xyXG4gICAgICAgICAgICAvLyAgICAgdXJsID0gaWNvbl91cmxcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHVybCA9IGljb25fdXJsICsgXCIuanBnXCJcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRleHR1cmVfdHlwZSA9ICdqcGcnXHJcblxyXG4gICAgICAgICAgICBpZiAoaWNvbl91cmwuaW5kZXhPZihcIi5wbmdcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRleHR1cmVfdHlwZSA9ICdwbmcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIC8vY29jb3MyLjQuMOeJiOacrFxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvd1tcImNjXCJdW1wiYXNzZXRNYW5hZ2VyXCJdICYmIHdpbmRvd1tcImNjXCJdW1wiYXNzZXRNYW5hZ2VyXCJdLmxvYWRSZW1vdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dbXCJjY1wiXVtcImFzc2V0TWFuYWdlclwiXS5sb2FkUmVtb3RlKHVybCwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2RrLS0tLS1sb2FkIHRleHR1cmUgZmFpbDExMTFcIiwgZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbF9iYWNrICYmIGNhbGxfYmFjaygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93W1wiY2NcIl0uaXNWYWxpZChpY29uKSAmJiBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJhbWVzID0gbmV3IHdpbmRvd1tcImNjXCJdLlNwcml0ZUZyYW1lKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uLnNwcml0ZUZyYW1lID0gZnJhbWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvY29zMi40LjDniYjmnKzku6XkuItcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dbXCJjY1wiXS5sb2FkZXIubG9hZCh7IHVybDogdXJsLCB0eXBlOiB0ZXh0dXJlX3R5cGUgfSwgZnVuY3Rpb24gKGVyciwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiaWdjLS0tLS1sb2FkIHRleHR1cmUgZmFpbFwiLCBlcnIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsX2JhY2sgJiYgY2FsbF9iYWNrKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3dbXCJjY1wiXS5pc1ZhbGlkKGljb24pICYmIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcmFtZXMgPSBuZXcgd2luZG93W1wiY2NcIl0uU3ByaXRlRnJhbWUoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb24uc3ByaXRlRnJhbWUgPSBmcmFtZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxfYmFjayAmJiBjYWxsX2JhY2soKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmb3JtYXRfcmVtb3RlX3RleHR1cmVfdXJsKHVybCkge1xyXG4gICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgbGV0IGpwZ19pbmRleCA9IHVybC5pbmRleE9mKFwiLmpwZ1wiKVxyXG4gICAgICAgICAgICBsZXQgcG5nX2luZGV4ID0gdXJsLmluZGV4T2YoXCIucG5nXCIpXHJcbiAgICAgICAgICAgIGlmIChqcGdfaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1cmwuc3Vic3RyaW5nKDAsIGpwZ19pbmRleCArIDQpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocG5nX2luZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsLnN1YnN0cmluZygwLCBwbmdfaW5kZXggKyA0KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmxcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNfdGV4dHVyZV91cmwoaWNvbl91cmwpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuYm1wXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuanBnXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuanBlZ1wiKSAhPSAtMSB8fFxyXG4gICAgICAgICAgICBpY29uX3VybC5pbmRleE9mKFwiLmZsaWNcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi5lbWZcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi5pY29cIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi5wbmdcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi50aWZcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi5naWZcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi5wY3hcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi50Z2FcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi5leGlmXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuZnB4XCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuc3ZnXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIucHNkXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuY2RyXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIucGNkXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuZHhmXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIudWZvXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuZXBzXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuYWlcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi5yYXdcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi5XTUZcIikgIT0gLTEgfHxcclxuICAgICAgICAgICAgaWNvbl91cmwuaW5kZXhPZihcIi53ZWJwXCIpICE9IC0xIHx8XHJcbiAgICAgICAgICAgIGljb25fdXJsLmluZGV4T2YoXCIuYXZpZlwiKSAhPSAtMVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOaNruWvueavlOabv+aNou+8jGRhdGEy5q+UZGF0YTHpobnlpJpcclxuICAgICAqIEBwYXJhbSBkYXRhMVxyXG4gICAgICogQHBhcmFtIGRhdGEyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByZXBsYWNlX2RhdGEoZGF0YTE6IE9iamVjdCwgZGF0YTI6IE9iamVjdCkge1xyXG4gICAgICAgIGlmICghZGF0YTEgJiYgIWRhdGEyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhlIG9iamVjdCBpcyB3cm9uZ1wiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGlkeCBpbiBkYXRhMikge1xyXG4gICAgICAgICAgICBkYXRhMltpZHhdICYmIChkYXRhMVtpZHhdID0gZGF0YTJbaWR4XSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YTIpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldF9pdGVtKGtleSwgdmFsdWUpIHtcclxuICAgICAgICBsZXQgc3RyID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRfaXRlbShrZXkpIHtcclxuICAgICAgICBsZXQgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgaWYgKGl0ZW0gIT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShpdGVtKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDku47mlbDnu4TkuK3pmo/mnLrpgInmi6nkuIDkuKrlhYPntKBcclxuICAgICAqIEBwYXJhbSBhcnIgXHJcbiAgICAgKiBAcGFyYW0gZGVsZXRlX3RoaXMgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyByYW5kb21fZ2V0KGFycjogYW55W10sIGRlbGV0ZV90aGlzID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgbGVuID0gYXJyLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuID09IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInRyeSB0byBnZXQgYSBtZW1iZXIgZnJvbSBhbiBlbXB0eSBhcnJheVwiKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZW4pO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGFycltyYW5kXTtcclxuICAgICAgICAgICAgZGVsZXRlX3RoaXMgJiYgYXJyLnNwbGljZShyYW5kLCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGNoZWNrX2lzX3NhbWVfZGF5KGxlZnRfdGltZSwgcmlnaHRfdGllbSkge1xyXG4gICAgICAgIGxldCBsZWZ0X2RhdGUgPSBuZXcgRGF0ZShsZWZ0X3RpbWUpXHJcbiAgICAgICAgbGV0IHJpZ2h0X2RhdGUgPSBuZXcgRGF0ZShyaWdodF90aWVtKVxyXG4gICAgICAgIGlmIChsZWZ0X2RhdGUuZ2V0RGF5KCkgIT0gcmlnaHRfZGF0ZS5nZXREYXkoKSB8fCBsZWZ0X2RhdGUuZ2V0TW9udGgoKSAhPSByaWdodF9kYXRlLmdldE1vbnRoKCkgfHwgbGVmdF9kYXRlLmdldEZ1bGxZZWFyKCkgIT0gcmlnaHRfZGF0ZS5nZXRGdWxsWWVhcigpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRfZGF0ZV90aW1lc3RhbXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W6YeR5biB44CB6ZK755+z562J5pi+56S657uT5p6cXHJcbiAgICAqIEBwYXJhbSBudW0gXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGNoYW5nZVRvTWIoR29sZCwgZml4X251bSA9IDEpIHtcclxuICAgICAgICBpZiAoR29sZCA8IDEwMDAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBHb2xkICsgXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXlHb2xkID0gcGFyc2VJbnQoR29sZClcclxuICAgICAgICBsZXQgZ29sZFN0ciA9IFwiXCJcclxuICAgICAgICBpZiAobXlHb2xkIDwgMTAwMCkge1xyXG4gICAgICAgICAgICBnb2xkU3RyID0gTWF0aC5mbG9vcihteUdvbGQpICsgXCJcIlxyXG4gICAgICAgIH0gZWxzZSBpZiAobXlHb2xkIDwgMTAwMDAwMCkge1xyXG4gICAgICAgICAgICBnb2xkU3RyID0gKG15R29sZCAvIDEwMDApLnRvRml4ZWQoZml4X251bSkgKyBcImtcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChteUdvbGQgPCAxMDAwMDAwMDAwKSB7XHJcbiAgICAgICAgICAgIGdvbGRTdHIgPSAobXlHb2xkIC8gMTAwMDAwMCkudG9GaXhlZChmaXhfbnVtKSArIFwibVwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG15R29sZCA8IDEwMDAwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgZ29sZFN0ciA9IChteUdvbGQgLyAxMDAwMDAwMDAwKS50b0ZpeGVkKGZpeF9udW0pICsgXCJiXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdvbGRTdHIgPSAobXlHb2xkIC8gMTAwMDAwMDAwMDAwMCkudG9GaXhlZChmaXhfbnVtKSArIFwidFwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnb2xkU3RyXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZvcm1hdFRpbWUodGltZSkge1xyXG4gICAgICAgIGlmICh0aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiMDA6MDA6MDBcIlxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaCA9IE1hdGguZmxvb3IodGltZSAvIDM2MDApXHJcbiAgICAgICAgdmFyIG0gPSBNYXRoLmZsb29yKHRpbWUgLyA2MCAlIDYwKVxyXG4gICAgICAgIHZhciBzID0gTWF0aC5mbG9vcih0aW1lICUgNjApXHJcbiAgICAgICAgdmFyIGhTdHIgPSBoICsgXCJcIlxyXG4gICAgICAgIHZhciBtU3RyID0gbSArIFwiXCJcclxuICAgICAgICB2YXIgc1N0ciA9IHMgKyBcIlwiXHJcbiAgICAgICAgaWYgKGggPCAxMCkge1xyXG4gICAgICAgICAgICBoU3RyID0gXCIwXCIgKyBoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtIDwgMTApIHtcclxuICAgICAgICAgICAgbVN0ciA9IFwiMFwiICsgbVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocyA8IDEwKSB7XHJcbiAgICAgICAgICAgIHNTdHIgPSBcIjBcIiArIHNcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhTdHIgKyBcIjpcIiArIG1TdHIgKyBcIjpcIiArIHNTdHJcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZm9ybWF0VGltZV9tbXNzKHRpbWUpIHtcclxuICAgICAgICBpZiAodGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIjAwOjAwXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG0gPSBNYXRoLmZsb29yKHRpbWUgLyA2MCAlIDYwKVxyXG4gICAgICAgIHZhciBzID0gTWF0aC5mbG9vcih0aW1lICUgNjApXHJcbiAgICAgICAgdmFyIG1TdHIgPSBtICsgXCJcIlxyXG4gICAgICAgIHZhciBzU3RyID0gcyArIFwiXCJcclxuXHJcbiAgICAgICAgaWYgKG0gPCAxMCkge1xyXG4gICAgICAgICAgICBtU3RyID0gXCIwXCIgKyBtXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzIDwgMTApIHtcclxuICAgICAgICAgICAgc1N0ciA9IFwiMFwiICsgc1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbVN0ciArIFwiOlwiICsgc1N0clxyXG4gICAgfVxyXG5cclxuICAgIC8v572u54Gw5Zu+54mHXHJcbiAgICBzdGF0aWMgc2V0X2dyZXkobm9kZTogY2MuTm9kZSwgc3RhdGUpIHtcclxuICAgICAgICB2YXIgcyA9IG5vZGUuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuU3ByaXRlKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc1tpXS5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXRfcmFuZG9tX2ludChtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5rSX54mM5Ye95pWw77yM5o2i5L2N572u77yM6ZqP5py65pKt5pS+XHJcbiAgICBzdGF0aWMgc2h1ZmZsZShhcnIpIHtcclxuICAgICAgICBsZXQgX2FyciA9IGFyci5zbGljZSgpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBqID0gdGhpcy5nZXRfcmFuZG9tX2ludCgwLCBpKVxyXG4gICAgICAgICAgICBsZXQgdCA9IF9hcnJbaV1cclxuICAgICAgICAgICAgX2FycltpXSA9IF9hcnJbal1cclxuICAgICAgICAgICAgX2FycltqXSA9IHRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9hcnJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogIOmihOWKoOi9veWOn+eUn+WbvueJh1xyXG4gICAgKi9cclxuICAgIHN0YXRpYyBwcmVsb2FkX25hdGl2ZV90ZXh0dXJlKHVybCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGlmICh3aW5kb3dbXCJMYXlhXCJdKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd1tcIkxheWFcIl0ubG9hZGVyLmxvYWQodXJsLCB3aW5kb3dbXCJMYXlhXCJdLkhhbmRsZXIuY3JlYXRlKHNlbGYsIGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaWdjLS0tLS0gcHJlbG9hZCBuYXRpdmVfdGV4dHVyZSBzdWNjZXNzLS0tLT4nLCB1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlX3R5cGUgPSAnanBnJ1xyXG4gICAgICAgICAgICBpZiAodXJsLmluZGV4T2YoXCIucG5nXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlX3R5cGUgPSAncG5nJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY29jb3MyLjQuMOeJiOacrFxyXG4gICAgICAgICAgICBpZiAod2luZG93W1wiY2NcIl1bXCJhc3NldE1hbmFnZXJcIl0gJiYgd2luZG93W1wiY2NcIl1bXCJhc3NldE1hbmFnZXJcIl0ubG9hZFJlbW90ZSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93W1wiY2NcIl1bXCJhc3NldE1hbmFnZXJcIl0ubG9hZFJlbW90ZSh1cmwsIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaWdjLS0tLS0gcHJlbG9hZCBuYXRpdmVfdGV4dHVyZSBzdWNjZXNzLS0tLT4nLCB1cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vY29jb3MyLjQuMOeJiOacrOS7peS4i1xyXG4gICAgICAgICAgICAgICAgd2luZG93W1wiY2NcIl0ubG9hZGVyLmxvYWQoeyB1cmw6IHVybCwgdHlwZTogdGV4dHVyZV90eXBlIH0sIGZ1bmN0aW9uIChlcnIsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaWdjLS0tLS0gcHJlbG9hZCBuYXRpdmVfdGV4dHVyZSBzdWNjZXNzLS0tLT4nLCB1cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=