import { e_syyx_sdk_publish_type, init_config, syyx_const } from "../configs/syyx_sdk_config";

export class syyx_sdk_utils {

    static log(...data: any[]) {
        console.log("syyx_sdk: ", JSON.stringify(data));
    }
    static error(...data: any[]) {
        if (init_config._debug) console.error("syyx_sdk: ", JSON.stringify(data));
    }

    /**
     * 从两个数中随机一个中间值
     */
    static get_random_number(list) {
        return list[0] + Math.floor(Math.random() * (list[1] - list[0]))
    }

    /**
     * 应用默认的缩放比
     */
    static set_default_scale(view: any) {
        let ratio = this.get_screen_ratio();
        ratio *= view.node.scaleX;
        view.node.setScale(ratio, ratio)
        console.log("igc-----screen ratio is ", ratio)
    }

    /**
    * 获取当前游戏屏幕舞台与基于1920*1080设计舞台的比例
    */
    static get_screen_ratio() {
        if (window["cc"]) {
            if (cc.view.getVisibleSize().width > cc.view.getVisibleSize().height) {
                return cc.view.getVisibleSize().height / 1080
            }
            else if (cc.view.getVisibleSize().width <= cc.view.getVisibleSize().height) {
                return cc.view.getVisibleSize().width / 1080
            }
        }
        return 1;
    }

    static get_largest_zorder() {
        return 32767;
    }

    /**
    * 获取视图计算缩放比之后的的实际宽高
    */
    static get_size(view): any {
        if (window["Laya"]) {
            return { width: view.width * view.scaleX, height: view.height * view.scaleY }
        }
        return {}
    }

    static get_stage() {
        if (window["Laya"]) {
            window["Laya"].stage
        } else {
            return window["cc"].director.getScene()
        }
    }

    /**
    * 解析配置表csv
    * @param data csv配置表原数据
    */
    static parse_csv(data, key) {
        if (syyx_const.syyx_sdk_publish === e_syyx_sdk_publish_type.in) {
            return data
        } else {
            return igc.igc_resources_utils.parse_csv(data, key);
        }
    }

    static load_resource(file_path, load_back, self = undefined, error_back?) {
        if (window["Laya"]) {
            window["Laya"].loader.load(file_path, window["Laya"].Handler.create(self, data => {
                if (data) {
                    load_back && load_back(data)
                } else {
                    console.error("igc-----load_resource fail", file_path)
                }
            }))
        } else {
            window["cc"].loader.loadRes(file_path, function (err, data) {
                let cur_data = data
                if (file_path.indexOf("json") != -1) {
                    cur_data = data.json
                }

                if (err) {
                    error_back && error_back()
                } else {
                    if (data) {
                        load_back && load_back(cur_data)
                    } else {
                        console.error("igc-----load_resource fail", file_path)
                        error_back && error_back()
                    }
                }
            });
        }
    }

    static load_resource_texture(path, sprite) {
        if (window["cc"]) {
            cc.loader.loadRes(path, cc.SpriteFrame, function (err, spriteFrame) {
                if (err == null && cc.isValid(sprite) && cc.isValid(sprite.node)) {
                    sprite.spriteFrame = spriteFrame;
                }
                else {
                    console.error(path + " is not find", err)
                }
            });
        }
    }

    /**
     * 加载图片
     * @param icon 图片目标节点
     * @param icon_url 图片地址
     * @param call_back 回调  用于处理图片加载失败 或者  报错等特殊情况
     */
    static set_texture_url(icon, icon_url, call_back?) {
        // if (syyx_const.syyx_sdk_channel === igc.e_channel_type.web) {
        //     return
        // }
        if (window["cc"]) {
            let url = icon_url
            // if (this.is_texture_url(icon_url)) {
            //     url = icon_url
            // } else {
            //     url = icon_url + ".jpg"
            // }

            let texture_type = 'jpg'

            if (icon_url.indexOf(".png") != -1) {
                texture_type = 'png'
            }
            try {
                //cocos2.4.0版本
                if (window["cc"]["assetManager"] && window["cc"]["assetManager"].loadRemote) {
                    window["cc"]["assetManager"].loadRemote(url, function (err, data) {
                        if (err) {
                            console.error("sdk-----load texture fail1111", err)
                            // call_back && call_back()
                        } else if (window["cc"].isValid(icon) && data) {
                            let frames = new window["cc"].SpriteFrame(data)
                            icon.spriteFrame = frames
                        }
                    })
                } else {
                    //cocos2.4.0版本以下
                    window["cc"].loader.load({ url: url, type: texture_type }, function (err, data) {
                        if (err) {
                            console.error("igc-----load texture fail", err)
                            call_back && call_back()
                        } else if (window["cc"].isValid(icon) && data) {
                            let frames = new window["cc"].SpriteFrame(data)
                            icon.spriteFrame = frames
                        }
                    });
                }

            } catch (error) {
                call_back && call_back()
            }
        }
    }

    static format_remote_texture_url(url) {
        if (url) {
            let jpg_index = url.indexOf(".jpg")
            let png_index = url.indexOf(".png")
            if (jpg_index != -1) {
                return url.substring(0, jpg_index + 4)
            } else if (png_index != -1) {
                return url.substring(0, png_index + 4)
            } else {
                return url
            }
        }
        return url
    }

    static is_texture_url(icon_url) {
        if (
            icon_url.indexOf(".bmp") != -1 ||
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
            icon_url.indexOf(".avif") != -1
        ) {
            return true
        }
        return false
    }

    /**
     * 数据对比替换，data2比data1项多
     * @param data1
     * @param data2
     */
    static replace_data(data1: Object, data2: Object) {
        if (!data1 && !data2) {
            console.log("the object is wrong")
            return
        }

        for (let idx in data2) {
            data2[idx] && (data1[idx] = data2[idx])
        }
        console.log(data2)
    }

    static set_item(key, value) {
        let str = JSON.stringify(value)
        localStorage.setItem(key, str);
    }

    static get_item(key) {
        let item = localStorage.getItem(key);
        if (item != "") {
            return JSON.parse(item)
        }
        return null
    }
    /**
     * 从数组中随机选择一个元素
     * @param arr 
     * @param delete_this 
     */
    static random_get(arr: any[], delete_this = false) {
        let len = arr.length;
        if (len == 0) {
            console.error("try to get a member from an empty array");
            throw new Error();
        } else {
            let rand = Math.floor(Math.random() * len);
            let item = arr[rand];
            delete_this && arr.splice(rand, 1);
            return item;
        }
    }
    static check_is_same_day(left_time, right_tiem) {
        let left_date = new Date(left_time)
        let right_date = new Date(right_tiem)
        if (left_date.getDay() != right_date.getDay() || left_date.getMonth() != right_date.getMonth() || left_date.getFullYear() != right_date.getFullYear()) {
            return false
        }
        return true
    }

    static get_date_timestamp() {
        return (new Date()).getTime()
    }

    /**
    * 获取金币、钻石等显示结果
    * @param num 
    */
    static changeToMb(Gold, fix_num = 1) {
        if (Gold < 10000) {
            return Gold + ""
        }
        let myGold = parseInt(Gold)
        let goldStr = ""
        if (myGold < 1000) {
            goldStr = Math.floor(myGold) + ""
        } else if (myGold < 1000000) {
            goldStr = (myGold / 1000).toFixed(fix_num) + "k"
        }
        else if (myGold < 1000000000) {
            goldStr = (myGold / 1000000).toFixed(fix_num) + "m"
        }
        else if (myGold < 1000000000000) {
            goldStr = (myGold / 1000000000).toFixed(fix_num) + "b"
        }
        else {
            goldStr = (myGold / 1000000000000).toFixed(fix_num) + "t"
        }
        return goldStr
    }

    static formatTime(time) {
        if (time <= 0) {
            return "00:00:00"
        }
        var h = Math.floor(time / 3600)
        var m = Math.floor(time / 60 % 60)
        var s = Math.floor(time % 60)
        var hStr = h + ""
        var mStr = m + ""
        var sStr = s + ""
        if (h < 10) {
            hStr = "0" + h
        }
        if (m < 10) {
            mStr = "0" + m
        }
        if (s < 10) {
            sStr = "0" + s
        }
        return hStr + ":" + mStr + ":" + sStr
    }

    static formatTime_mmss(time) {
        if (time <= 0) {
            return "00:00"
        }
        var m = Math.floor(time / 60 % 60)
        var s = Math.floor(time % 60)
        var mStr = m + ""
        var sStr = s + ""

        if (m < 10) {
            mStr = "0" + m
        }
        if (s < 10) {
            sStr = "0" + s
        }
        return mStr + ":" + sStr
    }

    //置灰图片
    static set_grey(node: cc.Node, state) {
        var s = node.getComponentsInChildren(cc.Sprite);
        for (var i = 0; i < s.length; i++) {
            s[i].setState(state);
        }
    }

    static get_random_int(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // 洗牌函数，换位置，随机播放
    static shuffle(arr) {
        let _arr = arr.slice()
        for (let i = 0; i < _arr.length; i++) {
            let j = this.get_random_int(0, i)
            let t = _arr[i]
            _arr[i] = _arr[j]
            _arr[j] = t
        }
        return _arr
    }

    /**
    *  预加载原生图片
    */
    static preload_native_texture(url) {
        let self = this
        if (window["Laya"]) {
            window["Laya"].loader.load(url, window["Laya"].Handler.create(self, data => {
                if (data) {
                    console.log('igc----- preload native_texture success---->', url)
                }
            }))
        } else {
            let texture_type = 'jpg'
            if (url.indexOf(".png") != -1) {
                texture_type = 'png'
            }
            //cocos2.4.0版本
            if (window["cc"]["assetManager"] && window["cc"]["assetManager"].loadRemote) {
                window["cc"]["assetManager"].loadRemote(url, function (err, data) {
                    if (data) {
                        console.log('igc----- preload native_texture success---->', url)
                    }
                })
            } else {
                //cocos2.4.0版本以下
                window["cc"].loader.load({ url: url, type: texture_type }, function (err, data) {
                    if (data) {
                        console.log('igc----- preload native_texture success---->', url)
                    }
                });
            }

        }
    }

}
