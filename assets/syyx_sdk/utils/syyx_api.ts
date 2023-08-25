import { syyx_const } from "../configs/syyx_sdk_config";

export class syyx_api_request {

    static apiPost(type, url, reqData, callback) {

        if(type == 'da_dot') {
          reqData.game = syyx_const.guobao_init_game
          reqData.version = syyx_const.version
          var ts = new Date().getTime();
          reqData.ts = ts;
          let sign = window['md5'](ts.toString().substr(9, 4) + syyx_const.guobao_init_game.substr(0, 2) + syyx_const.version.substr(0, 1) + syyx_const.md5_key);
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
    }

}
