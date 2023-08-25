
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/framework/on/mEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cb57f2/+g9OQbh9Ml1nBxYQ', 'mEvent');
// framework/on/mEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mEvent = /** @class */ (function () {
    // 初始化传参处理
    function mEvent(name, callback, target) {
        this.name = name;
        this.callback = callback;
        this.target = target;
    }
    return mEvent;
}());
exports.default = mEvent;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWV3b3JrXFxvblxcbUV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUE7SUFVSSxVQUFVO0lBQ1YsZ0JBQVksSUFBYSxFQUFFLFFBQW1CLEVBQUUsTUFBWTtRQUN4RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBQ0wsYUFBQztBQUFELENBaEJBLEFBZ0JDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgbUV2ZW50IHtcbiAgICAvKiog5LqL5Lu25ZCN56ewICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKiDkuovku7blm57osIMgKi9cbiAgICBjYWxsYmFjazogRnVuY3Rpb247XG4gICAgLyoqIOebkeWQrOWvueixoSAqL1xuICAgIHRhcmdldDogYW55O1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbUV2ZW50IGltcGxlbWVudHMgbUV2ZW50IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqIOS6i+S7tuWbnuiwgyAqL1xuICAgIG9uQmFjazogRnVuY3Rpb247XG4gICAgLyoqIOebkeWQrOWvueixoSAqL1xuICAgIHRhcmdldDogYW55O1xuXG4gICAgLy8g5Ye95pWw6YeN6L29XG4gICAgY29uc3RydWN0b3IoKTtcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpO1xuICAgIC8vIOWIneWni+WMluS8oOWPguWkhOeQhlxuICAgIGNvbnN0cnVjdG9yKG5hbWU/OiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24sIHRhcmdldD86IGFueSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cbn1cbiJdfQ==