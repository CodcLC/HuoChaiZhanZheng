"use strict";
cc._RF.push(module, '3fc16rAqjNEub4MPr/nriNb', 'syyx_api');
// syyx_sdk/utils/syyx_api.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syyx_api_request = void 0;
var syyx_sdk_config_1 = require("../configs/syyx_sdk_config");
var syyx_api_request = /** @class */ (function () {
    function syyx_api_request() {
    }
    syyx_api_request.apiPost = function (type, url, reqData, callback) {
        if (type == 'da_dot') {
            reqData.game = syyx_sdk_config_1.syyx_const.guobao_init_game;
            reqData.version = syyx_sdk_config_1.syyx_const.version;
            var ts = new Date().getTime();
            reqData.ts = ts;
            var sign = window['md5'](ts.toString().substr(9, 4) + syyx_sdk_config_1.syyx_const.guobao_init_game.substr(0, 2) + syyx_sdk_config_1.syyx_const.version.substr(0, 1) + syyx_sdk_config_1.syyx_const.md5_key);
            reqData.sign = sign.toLowerCase();
        }
        //1.拼接请求参数
        var param = "";
        for (var item in reqData) {
            var value = typeof reqData[item] === 'object' && reqData[item] !== null ? JSON.stringify(reqData[item]) : reqData[item];
            param += item + "=" + value + "&";
        }
        //2.发起请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    }
                    else {
                        callback(null);
                    }
                }
                else {
                    callback(null);
                }
            }
        };
        xhr.onabort = xhr.onerror = xhr.ontimeout = function () {
            callback(null);
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(param); //reqData为字符串形式： "key=value"
    };
    return syyx_api_request;
}());
exports.syyx_api_request = syyx_api_request;

cc._RF.pop();