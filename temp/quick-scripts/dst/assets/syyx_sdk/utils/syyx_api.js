
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/utils/syyx_api.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXHV0aWxzXFxzeXl4X2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4REFBd0Q7QUFFeEQ7SUFBQTtJQWdEQSxDQUFDO0lBOUNVLHdCQUFPLEdBQWQsVUFBZSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRO1FBRXZDLElBQUcsSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUNuQixPQUFPLENBQUMsSUFBSSxHQUFHLDRCQUFVLENBQUMsZ0JBQWdCLENBQUE7WUFDMUMsT0FBTyxDQUFDLE9BQU8sR0FBRyw0QkFBVSxDQUFDLE9BQU8sQ0FBQTtZQUNwQyxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyw0QkFBVSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsNEJBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyw0QkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZKLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25DO1FBRUQsVUFBVTtRQUNWLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFO1lBQ3RCLElBQUksS0FBSyxHQUFHLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEgsS0FBSyxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUNyQztRQUNELFFBQVE7UUFDUixJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRztZQUNyQixJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFO2dCQUNyQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO29CQUN2QyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDO29CQUVoQyxJQUFJLFFBQVEsRUFBRTt3QkFDVixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN4QyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQzFCO3lCQUNJO3dCQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDbEI7aUJBQ0o7cUJBQ0k7b0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNsQjthQUNKO1FBQ0wsQ0FBQyxDQUFDO1FBQ0YsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLEdBQUc7WUFDeEMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQztRQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixHQUFHLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLG1DQUFtQyxDQUFDLENBQUM7UUFDMUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtJQUNqRCxDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQWhEQSxBQWdEQyxJQUFBO0FBaERZLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN5eXhfY29uc3QgfSBmcm9tIFwiLi4vY29uZmlncy9zeXl4X3Nka19jb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBzeXl4X2FwaV9yZXF1ZXN0IHtcclxuXHJcbiAgICBzdGF0aWMgYXBpUG9zdCh0eXBlLCB1cmwsIHJlcURhdGEsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgICAgIGlmKHR5cGUgPT0gJ2RhX2RvdCcpIHtcclxuICAgICAgICAgIHJlcURhdGEuZ2FtZSA9IHN5eXhfY29uc3QuZ3VvYmFvX2luaXRfZ2FtZVxyXG4gICAgICAgICAgcmVxRGF0YS52ZXJzaW9uID0gc3l5eF9jb25zdC52ZXJzaW9uXHJcbiAgICAgICAgICB2YXIgdHMgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgIHJlcURhdGEudHMgPSB0cztcclxuICAgICAgICAgIGxldCBzaWduID0gd2luZG93WydtZDUnXSh0cy50b1N0cmluZygpLnN1YnN0cig5LCA0KSArIHN5eXhfY29uc3QuZ3VvYmFvX2luaXRfZ2FtZS5zdWJzdHIoMCwgMikgKyBzeXl4X2NvbnN0LnZlcnNpb24uc3Vic3RyKDAsIDEpICsgc3l5eF9jb25zdC5tZDVfa2V5KTtcclxuICAgICAgICAgIHJlcURhdGEuc2lnbiA9IHNpZ24udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vMS7mi7zmjqXor7fmsYLlj4LmlbBcclxuICAgICAgICB2YXIgcGFyYW0gPSBcIlwiO1xyXG4gICAgICAgIGZvciAodmFyIGl0ZW0gaW4gcmVxRGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0eXBlb2YgcmVxRGF0YVtpdGVtXSA9PT0gJ29iamVjdCcgJiYgcmVxRGF0YVtpdGVtXSAhPT0gbnVsbCA/IEpTT04uc3RyaW5naWZ5KHJlcURhdGFbaXRlbV0pIDogcmVxRGF0YVtpdGVtXTtcclxuICAgICAgICAgICAgcGFyYW0gKz0gaXRlbSArIFwiPVwiICsgdmFsdWUgKyBcIiZcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8yLuWPkei1t+ivt+axglxyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2VKc29uID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlSnNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9uYWJvcnQgPSB4aHIub25lcnJvciA9IHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpO1xyXG4gICAgICAgIHhoci5zZW5kKHBhcmFtKTsgLy9yZXFEYXRh5Li65a2X56ym5Liy5b2i5byP77yaIFwia2V5PXZhbHVlXCJcclxuICAgIH1cclxuXHJcbn1cclxuIl19