"use strict";
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