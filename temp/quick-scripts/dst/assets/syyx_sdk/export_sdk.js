
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/syyx_sdk/export_sdk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '75e8aIgoh1OSp7kQoP30AQL', 'export_sdk');
// syyx_sdk/export_sdk.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Export = void 0;
var syyx_sdk_api_1 = require("../syyx_sdk/syyx_sdk_api");
var Export = /** @class */ (function () {
    function Export() {
    }
    /**
     * 预加载原生广告每显示一次就要加载一次，
     * 包括原生banner、原生结算（YSBN/YSJS）"10304001"/"10302001"
     */
    Export.preload_YSAD = function (adid) {
        console.log('preload_YSAD----------------');
        var native_banner_open_switch = syyx_sdk_api_1.syyx_sdk_api.get_business_data_by_key("native_banner_open_switch");
        if (native_banner_open_switch) {
            //进行操作 data[0] == 1 时开启 ，data[0] == 0时关闭
            if (native_banner_open_switch[0] == 1) { // 开启
                syyx_sdk_api_1.syyx_sdk_api.preload_native_inner_interstitial(adid, function onLoad(param, res) {
                    console.log("igc-----show show_native on_load-----------------111:" + JSON.stringify(res));
                }, function onShow() {
                    console.log("igc-----show show_native onShow");
                }, function onClose(param, res) {
                }, function onError(param, err) {
                    console.log("预加载原生广告失败:" + JSON.stringify(err));
                });
            }
            else {
                console.log('preload_YSAD----------------no open');
            }
        }
    };
    Export.show_video = function (success_func, fail_func) {
        var video_open_switch = syyx_sdk_api_1.syyx_sdk_api.get_business_data_by_key("video_open_switch");
        if (video_open_switch && video_open_switch[0] == 1) {
            //进行操作 1 时开启 ，data[0] == 0时关闭
            syyx_sdk_api_1.syyx_sdk_api.show_video("10200001", function onLoad(param, res) {
                console.log("igc-----show show_video on_load");
            }, function onShow() {
                console.log("igc-----show show_video onShow");
            }, function onClose(param, res) {
                console.log("igc-----show show_video onClose:" + JSON.stringify(res));
                if (res.isEnded) {
                    console.log("igc---视频已看完发放奖励--需要发奖励");
                    success_func && success_func();
                }
                else {
                    console.log("igc---视频未看完");
                    syyx_sdk_api_1.syyx_sdk_api.create_toast('视频未看完');
                    fail_func && fail_func();
                }
            }, function onError(param, err) {
                console.log("igc-----show show_video onError:" + JSON.stringify(err));
            }, true);
        }
        else {
            console.log("igc---video --------no open");
        }
    };
    Export.show_native_YSAD = function (adid, parentNode, callback) {
        var native_switch_ysjs = syyx_sdk_api_1.syyx_sdk_api.get_business_data_by_key("native_inner_interstitial_switch");
        if (native_switch_ysjs && native_switch_ysjs[0] == 1) {
            var native_data = syyx_sdk_api_1.syyx_sdk_api.get_local_native_data(adid);
            if (native_data) {
                console.log("igc-----加载到原生数据  可以展示------");
                //结算原生点击回调
                var click_back = function () {
                    //打点---点击结算原生
                };
                //结算原生显示回调
                var show_back = function () {
                    console.log("igc----- 结算原生已显示------");
                    callback && callback();
                };
                //结算原生隐藏回调
                var hide_back = function () {
                    console.log("igc----- 结算原生隐藏");
                };
                syyx_sdk_api_1.syyx_sdk_api.show_native_inner_interstitial(adid, //adv广告id
                cc.find(parentNode), //结算原生父节点
                click_back, show_back, hide_back);
            }
            else {
                console.log("igc-----未加载到原生数据 不展示结算原生-------");
            }
        }
    };
    /**
    * 点击了原生广告
    */
    Export.click_native_YSAD = function (type) {
        if (type == "YSBN") {
            syyx_sdk_api_1.syyx_sdk_api.click_native_banner();
        }
        else {
            syyx_sdk_api_1.syyx_sdk_api.click_native_inner_interstitial();
        }
    };
    /**
     * 结算页面隐藏或者销毁前，要调用一下
     * 结算界面销毁原生广告
     */
    Export.hide_naive_YSAD = function (preload) {
        syyx_sdk_api_1.syyx_sdk_api.hide_native_inner_interstitial();
        syyx_sdk_api_1.syyx_sdk_api.hide_native_banner();
        if (preload == 'YSBN') {
            this.preload_YSAD("10304001");
        }
        else {
            this.preload_YSAD("10302001");
        }
    };
    return Export;
}());
exports.Export = Export;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3l5eF9zZGtcXGV4cG9ydF9zZGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQXdEO0FBRXhEO0lBQUE7SUFxSEEsQ0FBQztJQW5IRzs7O09BR0c7SUFDSyxtQkFBWSxHQUFuQixVQUFvQixJQUFJO1FBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM1QyxJQUFJLHlCQUF5QixHQUFHLDJCQUFZLENBQUMsd0JBQXdCLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtRQUNsRyxJQUFHLHlCQUF5QixFQUFDO1lBQ3pCLHdDQUF3QztZQUN4QyxJQUFHLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUs7Z0JBQ3pDLDJCQUFZLENBQUMsaUNBQWlDLENBQUMsSUFBSSxFQUNuRCxTQUFTLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRztvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7Z0JBQzlGLENBQUMsRUFDRCxTQUFTLE1BQU07b0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO2dCQUNsRCxDQUFDLEVBQ0QsU0FBUyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQzNCLENBQUMsRUFDRCxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRztvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUNuRCxDQUFDLENBQUMsQ0FBQTthQUNMO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQzthQUN0RDtTQUNKO0lBQ0wsQ0FBQztJQUVNLGlCQUFVLEdBQWpCLFVBQWtCLFlBQXVCLEVBQUUsU0FB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QzthQUFNO1lBQ0gsMkJBQVksQ0FBQywrQkFBK0IsRUFBRSxDQUFBO1NBQ2pEO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHNCQUFlLEdBQXRCLFVBQXVCLE9BQU87UUFDMUIsMkJBQVksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1FBQzlDLDJCQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNsQyxJQUFHLE9BQU8sSUFBSSxNQUFNLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUNoQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQTtTQUNoQztJQUNMLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FySEEsQUFxSEMsSUFBQTtBQXJIWSx3QkFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN5eXhfc2RrX2FwaSB9IGZyb20gXCIuLi9zeXl4X3Nkay9zeXl4X3Nka19hcGlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFeHBvcnQge1xyXG5cclxuICAgIC8qKiBcclxuICAgICAqIOmihOWKoOi9veWOn+eUn+W5v+WRiuavj+aYvuekuuS4gOasoeWwseimgeWKoOi9veS4gOasoe+8jFxyXG4gICAgICog5YyF5ous5Y6f55SfYmFubmVy44CB5Y6f55Sf57uT566X77yIWVNCTi9ZU0pT77yJXCIxMDMwNDAwMVwiL1wiMTAzMDIwMDFcIlxyXG4gICAgICovXHJcbiAgICAgc3RhdGljIHByZWxvYWRfWVNBRChhZGlkKSB7IFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwcmVsb2FkX1lTQUQtLS0tLS0tLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgbGV0IG5hdGl2ZV9iYW5uZXJfb3Blbl9zd2l0Y2ggPSBzeXl4X3Nka19hcGkuZ2V0X2J1c2luZXNzX2RhdGFfYnlfa2V5KFwibmF0aXZlX2Jhbm5lcl9vcGVuX3N3aXRjaFwiKSBcclxuICAgICAgICBpZihuYXRpdmVfYmFubmVyX29wZW5fc3dpdGNoKXsgXHJcbiAgICAgICAgICAgIC8v6L+b6KGM5pON5L2cIGRhdGFbMF0gPT0gMSDml7blvIDlkK8g77yMZGF0YVswXSA9PSAw5pe25YWz6ZetXHJcbiAgICAgICAgICAgIGlmKG5hdGl2ZV9iYW5uZXJfb3Blbl9zd2l0Y2hbMF0gPT0gMSkgeyAvLyDlvIDlkK9cclxuICAgICAgICAgICAgICAgIHN5eXhfc2RrX2FwaS5wcmVsb2FkX25hdGl2ZV9pbm5lcl9pbnRlcnN0aXRpYWwoYWRpZCxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG9uTG9hZChwYXJhbSwgcmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLXNob3cgc2hvd19uYXRpdmUgb25fbG9hZC0tLS0tLS0tLS0tLS0tLS0tMTExOlwiICsgSlNPTi5zdHJpbmdpZnkocmVzKSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvblNob3coKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLXNob3cgc2hvd19uYXRpdmUgb25TaG93XCIpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25DbG9zZShwYXJhbSwgcmVzKSB7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25FcnJvcihwYXJhbSwgZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLpooTliqDovb3ljp/nlJ/lub/lkYrlpLHotKU6XCIgKyBKU09OLnN0cmluZ2lmeShlcnIpKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVsb2FkX1lTQUQtLS0tLS0tLS0tLS0tLS0tbm8gb3BlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzaG93X3ZpZGVvKHN1Y2Nlc3NfZnVuYz86IEZ1bmN0aW9uLCBmYWlsX2Z1bmM/OiBGdW5jdGlvbikge1xyXG4gICAgICAgIGxldCB2aWRlb19vcGVuX3N3aXRjaCA9IHN5eXhfc2RrX2FwaS5nZXRfYnVzaW5lc3NfZGF0YV9ieV9rZXkoXCJ2aWRlb19vcGVuX3N3aXRjaFwiKSBcclxuICAgICAgICBpZih2aWRlb19vcGVuX3N3aXRjaCAmJiB2aWRlb19vcGVuX3N3aXRjaFswXSA9PSAxKXsgXHJcbiAgICAgICAgICAgIC8v6L+b6KGM5pON5L2cIDEg5pe25byA5ZCvIO+8jGRhdGFbMF0gPT0gMOaXtuWFs+mXrVxyXG4gICAgICAgICAgICBzeXl4X3Nka19hcGkuc2hvd192aWRlbyhcIjEwMjAwMDAxXCIsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTG9hZChwYXJhbSwgcmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tc2hvdyBzaG93X3ZpZGVvIG9uX2xvYWRcIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25TaG93KCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLXNob3cgc2hvd192aWRlbyBvblNob3dcIilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gb25DbG9zZShwYXJhbSwgcmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tc2hvdyBzaG93X3ZpZGVvIG9uQ2xvc2U6XCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5pc0VuZGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS3op4bpopHlt7LnnIvlrozlj5HmlL7lpZblirEtLemcgOimgeWPkeWlluWKsVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NfZnVuYyAmJiBzdWNjZXNzX2Z1bmMoKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLeinhumikeacqueci+WujFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHN5eXhfc2RrX2FwaS5jcmVhdGVfdG9hc3QoJ+inhumikeacqueci+WujCcpXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbF9mdW5jICYmIGZhaWxfZnVuYygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IocGFyYW0sIGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS0tLXNob3cgc2hvd192aWRlbyBvbkVycm9yOlwiICsgSlNPTi5zdHJpbmdpZnkoZXJyKSlcclxuICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpZ2MtLS12aWRlbyAtLS0tLS0tLW5vIG9wZW5cIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNob3dfbmF0aXZlX1lTQUQoYWRpZCwgcGFyZW50Tm9kZSwgY2FsbGJhY2s/OkZ1bmN0aW9uKSB7IC8vIFwiMTAzMDIwMDFcIiA9IFlTSlMgICBcIjEwMzA0MDAxXCIgPSBZU0JOXHJcbiAgICAgICAgbGV0IG5hdGl2ZV9zd2l0Y2hfeXNqcyA9IHN5eXhfc2RrX2FwaS5nZXRfYnVzaW5lc3NfZGF0YV9ieV9rZXkoXCJuYXRpdmVfaW5uZXJfaW50ZXJzdGl0aWFsX3N3aXRjaFwiKSBcclxuICAgICAgICBpZihuYXRpdmVfc3dpdGNoX3lzanMgJiYgbmF0aXZlX3N3aXRjaF95c2pzWzBdID09IDEpe1xyXG4gICAgICAgICAgICBsZXQgbmF0aXZlX2RhdGEgPSBzeXl4X3Nka19hcGkuZ2V0X2xvY2FsX25hdGl2ZV9kYXRhKGFkaWQpO1xyXG4gICAgICAgICAgICBpZiAobmF0aXZlX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS3liqDovb3liLDljp/nlJ/mlbDmja4gIOWPr+S7peWxleekui0tLS0tLVwiKVxyXG4gICAgICAgICAgICAgICAgLy/nu5Pnrpfljp/nlJ/ngrnlh7vlm57osINcclxuICAgICAgICAgICAgICAgIGxldCBjbGlja19iYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5omT54K5LS0t54K55Ye757uT566X5Y6f55SfXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+e7k+eul+WOn+eUn+aYvuekuuWbnuiwg1xyXG4gICAgICAgICAgICAgICAgbGV0IHNob3dfYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0tIOe7k+eul+WOn+eUn+W3suaYvuekui0tLS0tLVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v57uT566X5Y6f55Sf6ZqQ6JeP5Zue6LCDXHJcbiAgICAgICAgICAgICAgICBsZXQgaGlkZV9iYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaWdjLS0tLS0g57uT566X5Y6f55Sf6ZqQ6JePXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3l5eF9zZGtfYXBpLnNob3dfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbChcclxuICAgICAgICAgICAgICAgICAgICBhZGlkLCAvL2FkduW5v+WRimlkXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmluZChwYXJlbnROb2RlKSwgLy/nu5Pnrpfljp/nlJ/niLboioLngrlcclxuICAgICAgICAgICAgICAgICAgICBjbGlja19iYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dfYmFjayxcclxuICAgICAgICAgICAgICAgICAgICBoaWRlX2JhY2ssXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlnYy0tLS0t5pyq5Yqg6L295Yiw5Y6f55Sf5pWw5o2uIOS4jeWxleekuue7k+eul+WOn+eUny0tLS0tLS1cIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog54K55Ye75LqG5Y6f55Sf5bm/5ZGKXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGNsaWNrX25hdGl2ZV9ZU0FEKHR5cGUpIHtcclxuICAgICAgICBpZih0eXBlID09IFwiWVNCTlwiKSB7XHJcbiAgICAgICAgICAgIHN5eXhfc2RrX2FwaS5jbGlja19uYXRpdmVfYmFubmVyKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzeXl4X3Nka19hcGkuY2xpY2tfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT566X6aG16Z2i6ZqQ6JeP5oiW6ICF6ZSA5q+B5YmN77yM6KaB6LCD55So5LiA5LiLXHJcbiAgICAgKiDnu5PnrpfnlYzpnaLplIDmr4Hljp/nlJ/lub/lkYpcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGhpZGVfbmFpdmVfWVNBRChwcmVsb2FkKSB7XHJcbiAgICAgICAgc3l5eF9zZGtfYXBpLmhpZGVfbmF0aXZlX2lubmVyX2ludGVyc3RpdGlhbCgpO1xyXG4gICAgICAgIHN5eXhfc2RrX2FwaS5oaWRlX25hdGl2ZV9iYW5uZXIoKTtcclxuICAgICAgICBpZihwcmVsb2FkID09ICdZU0JOJykge1xyXG4gICAgICAgICAgICB0aGlzLnByZWxvYWRfWVNBRChcIjEwMzA0MDAxXCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcmVsb2FkX1lTQUQoXCIxMDMwMjAwMVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==