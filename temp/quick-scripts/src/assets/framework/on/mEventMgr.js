"use strict";
cc._RF.push(module, 'bc5a2yLCYdAIr02rKaNGft3', 'mEventMgr');
// framework/on/mEventMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mEMgr = void 0;
var mEvent_1 = require("./mEvent");
var TAG = 'mEventMgr.ts';
var mEventMgr = /** @class */ (function () {
    /** 构造函数 */
    function mEventMgr() {
        /** 事件Item */
        this._eventList = null;
        this._eventList = new Map();
    }
    mEventMgr.getInstance = function () {
        if (mEventMgr._Instance == null) {
            mEventMgr._Instance = new mEventMgr();
        }
        return mEventMgr._Instance;
    };
    /**
     * 自定义一个事件监听
     * @param eventName 事件名称
     * @param callback 事件回调
     * @param target 监听对象
     * @returns
     */
    mEventMgr.prototype.on = function (eventName, callback, target) {
        // 获取事件监听集合
        var array = this._eventList.get(eventName);
        if (!array) {
            array = new Array();
        }
        else {
            // 检查队列中是否存在相同监听
            for (var i = 0; i < array.length; i++) {
                var element = array[i];
                if (element.callback === callback && element.target === target) {
                    console.log(TAG, '已存在相同的监听事件');
                    return;
                }
            }
        }
        // 添加一个事件到派送队列
        var data = new mEvent_1.default();
        data.name = eventName;
        data.callback = callback;
        data.target = target;
        array.push(data);
        this._eventList.set(eventName, array);
    };
    /**
     * 取消一个事件的监听
     * @param eventName 事件名称
     * @param callback 事件回调
     * @param target 监听对象
     * @returns void
     */
    mEventMgr.prototype.off = function (eventName, callback, target) {
        var array = this._eventList.get(eventName);
        if (!array) {
            console.log(TAG, '事件队列为空');
            return;
        }
        else {
            for (var i = array.length - 1; i >= 0; i--) {
                var element = array[i];
                if (element.callback === callback && element.target === target) {
                    array.splice(i, 1);
                    console.log('release event:' + eventName);
                }
            }
        }
    };
    /**
     * 派送指定事件
     * @param eventName 事件名称
     * @param args 事件派送时传递的参数
     */
    mEventMgr.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var array = this._eventList.get(eventName);
        if (!array) {
            console.log(TAG, "\u6CA1\u6709\u76F8\u5173\u76D1\u542C\u4E8B\u4EF6:" + eventName);
            return;
        }
        else {
            for (var i = array.length - 1; i >= 0; i--) {
                var element = array[i];
                if (element.callback && element.target) {
                    element.callback.apply(element.target, args);
                }
            }
        }
    };
    mEventMgr._Instance = null;
    return mEventMgr;
}());
/** 输出一个事件管理器 */
exports.mEMgr = mEventMgr.getInstance();

cc._RF.pop();