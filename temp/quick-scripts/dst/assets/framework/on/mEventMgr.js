
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/on/mEventMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxvblxcbUV2ZW50TWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUE4QjtBQUM5QixJQUFNLEdBQUcsR0FBRyxjQUFjLENBQUM7QUFDM0I7SUFVSSxXQUFXO0lBQ1g7UUFIQSxhQUFhO1FBQ0wsZUFBVSxHQUErQixJQUFJLENBQUM7UUFHbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztJQUN2RCxDQUFDO0lBWE0scUJBQVcsR0FBbEI7UUFDSSxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQzdCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztTQUN6QztRQUNELE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBT0Q7Ozs7OztPQU1HO0lBQ0ksc0JBQUUsR0FBVCxVQUFVLFNBQWlCLEVBQUUsUUFBa0IsRUFBRSxNQUFXO1FBQ3hELFdBQVc7UUFDWCxJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO1NBQy9CO2FBQU07WUFDSCxnQkFBZ0I7WUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtvQkFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7b0JBQy9CLE9BQU87aUJBQ1Y7YUFDSjtTQUNKO1FBQ0QsY0FBYztRQUNkLElBQU0sSUFBSSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSx1QkFBRyxHQUFWLFVBQVcsU0FBaUIsRUFBRSxRQUFrQixFQUFFLE1BQVc7UUFDekQsSUFBSSxLQUFLLEdBQWtCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMzQixPQUFPO1NBQ1Y7YUFBTTtZQUNILEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO29CQUM1RCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsQ0FBQztpQkFDN0M7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSx3QkFBSSxHQUFYLFVBQVksU0FBaUI7UUFBRSxjQUFZO2FBQVosVUFBWSxFQUFaLHFCQUFZLEVBQVosSUFBWTtZQUFaLDZCQUFZOztRQUN2QyxJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLHNEQUFZLFNBQVcsQ0FBQyxDQUFDO1lBQzFDLE9BQU87U0FDVjthQUFNO1lBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUNwQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNoRDthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBbkZjLG1CQUFTLEdBQWMsSUFBSSxDQUFDO0lBb0YvQyxnQkFBQztDQXJGRCxBQXFGQyxJQUFBO0FBQ0QsZ0JBQWdCO0FBQ0gsUUFBQSxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1FdmVudCBmcm9tIFwiLi9tRXZlbnRcIjtcbmNvbnN0IFRBRyA9ICdtRXZlbnRNZ3IudHMnO1xuY2xhc3MgbUV2ZW50TWdyIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfSW5zdGFuY2U6IG1FdmVudE1nciA9IG51bGw7XG4gICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICBpZiAobUV2ZW50TWdyLl9JbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBtRXZlbnRNZ3IuX0luc3RhbmNlID0gbmV3IG1FdmVudE1ncigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtRXZlbnRNZ3IuX0luc3RhbmNlO1xuICAgIH1cbiAgICAvKiog5LqL5Lu2SXRlbSAqL1xuICAgIHByaXZhdGUgX2V2ZW50TGlzdDogTWFwPHN0cmluZywgQXJyYXk8bUV2ZW50Pj4gPSBudWxsO1xuICAgIC8qKiDmnoTpgKDlh73mlbAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRMaXN0ID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PG1FdmVudD4+KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiHquWumuS5ieS4gOS4quS6i+S7tuebkeWQrFxuICAgICAqIEBwYXJhbSBldmVudE5hbWUg5LqL5Lu25ZCN56ewXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIOS6i+S7tuWbnuiwg1xuICAgICAqIEBwYXJhbSB0YXJnZXQg55uR5ZCs5a+56LGhXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgcHVibGljIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldDogYW55KSB7XG4gICAgICAgIC8vIOiOt+WPluS6i+S7tuebkeWQrOmbhuWQiFxuICAgICAgICBsZXQgYXJyYXk6IEFycmF5PG1FdmVudD4gPSB0aGlzLl9ldmVudExpc3QuZ2V0KGV2ZW50TmFtZSk7XG4gICAgICAgIGlmICghYXJyYXkpIHtcbiAgICAgICAgICAgIGFycmF5ID0gbmV3IEFycmF5PG1FdmVudD4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOajgOafpemYn+WIl+S4reaYr+WQpuWtmOWcqOebuOWQjOebkeWQrFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgZWxlbWVudC50YXJnZXQgPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsICflt7LlrZjlnKjnm7jlkIznmoTnm5HlkKzkuovku7YnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDmt7vliqDkuIDkuKrkuovku7bliLDmtL7pgIHpmJ/liJdcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBtRXZlbnQoKTtcbiAgICAgICAgZGF0YS5uYW1lID0gZXZlbnROYW1lO1xuICAgICAgICBkYXRhLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIGRhdGEudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBhcnJheS5wdXNoKGRhdGEpO1xuICAgICAgICB0aGlzLl9ldmVudExpc3Quc2V0KGV2ZW50TmFtZSwgYXJyYXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlj5bmtojkuIDkuKrkuovku7bnmoTnm5HlkKxcbiAgICAgKiBAcGFyYW0gZXZlbnROYW1lIOS6i+S7tuWQjeensFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDkuovku7blm57osINcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOebkeWQrOWvueixoVxuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBwdWJsaWMgb2ZmKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldDogYW55KSB7XG4gICAgICAgIGxldCBhcnJheTogQXJyYXk8bUV2ZW50PiA9IHRoaXMuX2V2ZW50TGlzdC5nZXQoZXZlbnROYW1lKTtcbiAgICAgICAgaWYgKCFhcnJheSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCAn5LqL5Lu26Zif5YiX5Li656m6Jyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaV07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGVsZW1lbnQudGFyZ2V0ID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVsZWFzZSBldmVudDonICsgZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog5rS+6YCB5oyH5a6a5LqL5Lu2XG4gICAgICogQHBhcmFtIGV2ZW50TmFtZSDkuovku7blkI3np7BcbiAgICAgKiBAcGFyYW0gYXJncyDkuovku7bmtL7pgIHml7bkvKDpgJLnmoTlj4LmlbBcbiAgICAgKi9cbiAgICBwdWJsaWMgZW1pdChldmVudE5hbWU6IHN0cmluZywgLi4uYXJnczogYW55KSB7XG4gICAgICAgIGxldCBhcnJheTogQXJyYXk8bUV2ZW50PiA9IHRoaXMuX2V2ZW50TGlzdC5nZXQoZXZlbnROYW1lKTtcbiAgICAgICAgaWYgKCFhcnJheSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCBg5rKh5pyJ55u45YWz55uR5ZCs5LqL5Lu2OiR7ZXZlbnROYW1lfWApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2ldO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNhbGxiYWNrICYmIGVsZW1lbnQudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2FsbGJhY2suYXBwbHkoZWxlbWVudC50YXJnZXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKiDovpPlh7rkuIDkuKrkuovku7bnrqHnkIblmaggKi9cbmV4cG9ydCBjb25zdCBtRU1nciA9IG1FdmVudE1nci5nZXRJbnN0YW5jZSgpO1xuIl19