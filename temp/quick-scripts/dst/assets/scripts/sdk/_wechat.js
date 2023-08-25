
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/sdk/_wechat.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4f52a3polJI36cAFEkf9tS5', '_wechat');
// scripts/sdk/_wechat.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ch_wechat = void 0;
var TAG = '_wechat.ts';
var _wechat = /** @class */ (function () {
    function _wechat() {
        this.videoAd = null;
        this.bannerAd = null;
        this.videoId = "";
        this.bannerId = "";
        this.insertId = "";
        this.sdkInitEnd = false;
        this.onVideoAdCallBack = null;
        this.insertAdTime = 0;
        console.log(TAG, 'init platform channel: _wechat');
    }
    _wechat.getInstance = function () {
        if (this.Instance == null) {
            this.Instance = new _wechat();
        }
        return this.Instance;
    };
    _wechat.prototype.initAdParams = function (param) {
        if (this.sdkInitEnd) {
            return;
        }
        this.sdkInitEnd = true;
        this.insertId = param.insertId;
        this.bannerId = param.bannerId;
        this.videoId = param.videoId;
    };
    _wechat.prototype.initBannerAd = function () {
        var _this = this;
        // @ts-ignore
        var _a = wx.getSystemInfoSync(), windowWidth = _a.windowWidth, windowHeight = _a.windowHeight;
        var targetBannerAdWidth = 120;
        // 创建一个居于屏幕底部正中的广告
        // @ts-ignore
        this.bannerAd = wx.createBannerAd({
            adUnitId: this.bannerId,
            adIntervals: 120,
            style: {
                width: targetBannerAdWidth,
                top: windowHeight - (targetBannerAdWidth / 16 * 9),
            }
        });
        this.bannerAd.onError(function (err) {
            switch (err['errCode']) {
                case 1000:
                    console.warn(TAG, '后端错误调用失败');
                    break;
                case 1001:
                    console.warn(TAG, '参数错误');
                    break;
                case 1002:
                    console.warn(TAG, '广告单元无效');
                    break;
                case 1003:
                    console.warn(TAG, '内部错误');
                    break;
                case 1004:
                    console.warn(TAG, '无合适的广告, 尝试重新加载');
                    break;
                case 1005:
                    console.warn(TAG, '广告正在被审核，无法展现广告');
                    break;
                case 1007:
                    console.warn(TAG, '广告能力被禁用');
                    break;
                case 1008:
                    console.warn(TAG, '广告单元已关闭');
                    break;
                default:
                    break;
            }
        });
        // 也可以手动修改属性以调整广告尺寸
        this.bannerAd.style.left = (windowWidth - targetBannerAdWidth) / 2;
        // 尺寸调整时会触发回调
        // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
        this.bannerAd.onResize(function (size) {
            console.log(TAG, size.width, size.height);
            if (size.width == 0 || size.height == 0) {
                return;
            }
            // 如果一开始设置的 banner 宽度超过了系统限制，可以在此处加以调整
            if (targetBannerAdWidth != size.width) {
                targetBannerAdWidth = size.width;
                _this.bannerAd.style.top = windowHeight - (size.height);
                _this.bannerAd.style.left = (windowWidth - size.width) / 2;
            }
        });
        //广告组件成功拉取广告素材时会触发load事件的监听器
        this.bannerAd.onLoad(function () {
            console.log(TAG, "banner广告拉取完成!");
        });
    };
    _wechat.prototype.bannerAd_show = function () {
        if (this.bannerAd) {
            this.bannerAd.show();
        }
    };
    _wechat.prototype.bannerAd_hide = function () {
        if (this.bannerAd) {
            this.bannerAd.hide();
            this.initBannerAd();
        }
    };
    _wechat.prototype.initVideoAd = function () {
        var _this = this;
        //@ts-ignore
        if (wx.createRewardedVideoAd) {
            return;
        }
        //@ts-ignore
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: this.videoId,
            multiton: false
        });
        this.videoAd.onClose(function (res) {
            if (res && res.isEnded) {
                _this.onVideoAdCallBack(true);
            }
            else {
                _this.onVideoAdCallBack(false);
            }
        });
        this.videoAd.onError(function (err) {
            switch (err.errCode) {
                case 1000:
                    console.warn(TAG, "\u540E\u7AEF\u63A5\u53E3\u8C03\u7528\u5931\u8D25");
                    break;
                case 1001:
                    console.warn(TAG, "\u53C2\u6570\u9519\u8BEF");
                    break;
                case 1002:
                    console.warn(TAG, "\u5E7F\u544A\u5355\u5143\u65E0\u6548");
                    break;
                case 1003:
                    console.warn(TAG, "\u5185\u90E8\u9519\u8BEF");
                    break;
                case 1004:
                    console.warn(TAG, "\u65E0\u5408\u9002\u7684\u5E7F\u544A");
                    break;
                case 1005:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u5BA1\u6838\u4E2D");
                    break;
                case 1006:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u88AB\u9A73\u56DE");
                    break;
                case 1007:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u88AB\u5C01\u7981");
                    break;
                case 1008:
                    console.warn(TAG, "\u5E7F\u544A\u5355\u5143\u5DF2\u5173\u95ED");
                    break;
            }
        });
        this.videoAd.onLoad(function (res) {
            _this.videoAd.show();
        });
        this.videoAd.load();
    };
    _wechat.prototype.videoAd_show = function (onVideoCall) {
        this.onVideoAdCallBack = onVideoCall;
        this.videoAd != null ? this.videoAd.load() : this.initVideoAd();
    };
    _wechat.prototype.insterAd_show = function () {
        var time = new Date().getTime();
        if (time - this.insertAdTime < 30000) {
            console.log(TAG, '广告冷却中...');
            return;
        }
        this.insertAdTime = time;
        //@ts-ignore
        var interstitialAd = tt.createInterstitialAd({
            adUnitId: this.insertId
        });
        interstitialAd.onError(function (err) {
            switch (err.errCode) {
                case 1000:
                    console.warn(TAG, "\u540E\u7AEF\u63A5\u53E3\u8C03\u7528\u5931\u8D25");
                    break;
                case 1001:
                    console.warn(TAG, "\u53C2\u6570\u9519\u8BEF");
                    break;
                case 1002:
                    console.warn(TAG, "\u5E7F\u544A\u5355\u5143\u65E0\u6548");
                    break;
                case 1003:
                    console.warn(TAG, "\u5185\u90E8\u9519\u8BEF");
                    break;
                case 1004:
                    console.warn(TAG, "\u65E0\u5408\u9002\u7684\u5E7F\u544A");
                    break;
                case 1005:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u5BA1\u6838\u4E2D");
                    break;
                case 1006:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u88AB\u9A73\u56DE");
                    break;
                case 1007:
                    console.warn(TAG, "\u5E7F\u544A\u7EC4\u4EF6\u88AB\u5C01\u7981");
                    break;
                case 1008:
                    console.warn(TAG, "\u5E7F\u544A\u5355\u5143\u5DF2\u5173\u95ED");
                    break;
            }
        });
        interstitialAd.onClose(function () {
            interstitialAd.destroy();
        });
        interstitialAd.load().then(function () {
            interstitialAd.show();
        });
    };
    _wechat.Instance = null;
    return _wechat;
}());
exports.ch_wechat = _wechat;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2RrXFxfd2VjaGF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQztBQUN2QjtJQVVJO1FBUlEsWUFBTyxHQUFRLElBQUksQ0FBQztRQUNwQixhQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsc0JBQWlCLEdBQWEsSUFBSSxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGdDQUFnQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNhLG1CQUFXLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7U0FDakM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNELDhCQUFZLEdBQVosVUFBYSxLQUFZO1FBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUNqQyxDQUFDO0lBQ0QsOEJBQVksR0FBWjtRQUFBLGlCQWdFQztRQS9ERyxhQUFhO1FBQ1AsSUFBQSxLQUFnQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUs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QyxJQUFJLENBQUMsR0FBRyxFQUFFLDRDQUFTLENBQUMsQ0FBQztvQkFDN0IsTUFBTTtnQkFDVixLQUFLLElBQUk7b0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsNENBQVMsQ0FBQyxDQUFDO29CQUM3QixNQUFNO2dCQUNWLEtBQUssSUFBSTtvQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSw0Q0FBUyxDQUFDLENBQUM7b0JBQzdCLE1BQU07Z0JBQ1YsS0FBSyxJQUFJO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLDRDQUFTLENBQUMsQ0FBQztvQkFDN0IsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxjQUFjLENBQUMsT0FBTyxDQUFDO1lBQ25CLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUNILGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDdkIsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWhOYyxnQkFBUSxHQUFZLElBQUksQ0FBQztJQWlONUMsY0FBQztDQWxORCxBQWtOQyxJQUFBO0FBQ1ksUUFBQSxTQUFTLEdBQUcsT0FBTyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyYW0gfSBmcm9tIFwiLi90eXBlXCI7XG5cbnZhciBUQUcgPSAnX3dlY2hhdC50cyc7XG5jbGFzcyBfd2VjaGF0IHtcbiAgICBwcml2YXRlIHN0YXRpYyBJbnN0YW5jZTogX3dlY2hhdCA9IG51bGw7XG4gICAgcHJpdmF0ZSB2aWRlb0FkOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgYmFubmVyQWQ6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSB2aWRlb0lkOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgYmFubmVySWQ6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBpbnNlcnRJZDogc3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIHNka0luaXRFbmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIG9uVmlkZW9BZENhbGxCYWNrOiBGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBpbnNlcnRBZFRpbWUgPSAwO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhUQUcsICdpbml0IHBsYXRmb3JtIGNoYW5uZWw6IF93ZWNoYXQnKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBfd2VjaGF0IHtcbiAgICAgICAgaWYgKHRoaXMuSW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5JbnN0YW5jZSA9IG5ldyBfd2VjaGF0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuSW5zdGFuY2U7XG4gICAgfVxuICAgIGluaXRBZFBhcmFtcyhwYXJhbTogcGFyYW0pIHtcbiAgICAgICAgaWYgKHRoaXMuc2RrSW5pdEVuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2RrSW5pdEVuZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5zZXJ0SWQgPSBwYXJhbS5pbnNlcnRJZDtcbiAgICAgICAgdGhpcy5iYW5uZXJJZCA9IHBhcmFtLmJhbm5lcklkO1xuICAgICAgICB0aGlzLnZpZGVvSWQgPSBwYXJhbS52aWRlb0lkO1xuICAgIH1cbiAgICBpbml0QmFubmVyQWQoKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgeyB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0IH0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgICB2YXIgdGFyZ2V0QmFubmVyQWRXaWR0aCA9IDEyMDtcbiAgICAgICAgLy8g5Yib5bu65LiA5Liq5bGF5LqO5bGP5bmV5bqV6YOo5q2j5Lit55qE5bm/5ZGKXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5iYW5uZXJBZCA9IHd4LmNyZWF0ZUJhbm5lckFkKHtcbiAgICAgICAgICAgIGFkVW5pdElkOiB0aGlzLmJhbm5lcklkLFxuICAgICAgICAgICAgYWRJbnRlcnZhbHM6IDEyMCxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHRhcmdldEJhbm5lckFkV2lkdGgsXG4gICAgICAgICAgICAgICAgdG9wOiB3aW5kb3dIZWlnaHQgLSAodGFyZ2V0QmFubmVyQWRXaWR0aCAvIDE2ICogOSksIC8vIOagueaNruezu+e7n+e6puWumuWwuuWvuOiuoeeul+WHuuW5v+WRiumrmOW6plxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkVycm9yKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlcnJbJ2VyckNvZGUnXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwMDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+WQjuerr+mUmeivr+iwg+eUqOWksei0pScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDE6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICflj4LmlbDplJnor68nKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDAyOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5bm/5ZGK5Y2V5YWD5peg5pWIJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwMzpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+WGhemDqOmUmeivrycpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDQ6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICfml6DlkIjpgILnmoTlub/lkYosIOWwneivlemHjeaWsOWKoOi9vScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDU6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICflub/lkYrmraPlnKjooqvlrqHmoLjvvIzml6Dms5XlsZXnjrDlub/lkYonKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDA3OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5bm/5ZGK6IO95Yqb6KKr56aB55SoJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwODpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+W5v+WRiuWNleWFg+W3suWFs+mXrScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOS5n+WPr+S7peaJi+WKqOS/ruaUueWxnuaAp+S7peiwg+aVtOW5v+WRiuWwuuWvuFxuICAgICAgICB0aGlzLmJhbm5lckFkLnN0eWxlLmxlZnQgPSAod2luZG93V2lkdGggLSB0YXJnZXRCYW5uZXJBZFdpZHRoKSAvIDI7XG4gICAgICAgIC8vIOWwuuWvuOiwg+aVtOaXtuS8muinpuWPkeWbnuiwg1xuICAgICAgICAvLyDms6jmhI/vvJrlpoLmnpzlnKjlm57osIPph4zlho3mrKHosIPmlbTlsLrlr7jvvIzopoHnoa7kv53kuI3opoHop6blj5Hmrbvlvqrnjq/vvIHvvIHvvIFcbiAgICAgICAgdGhpcy5iYW5uZXJBZC5vblJlc2l6ZSgoc2l6ZTogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIGlmIChzaXplLndpZHRoID09IDAgfHwgc2l6ZS5oZWlnaHQgPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOWmguaenOS4gOW8gOWni+iuvue9rueahCBiYW5uZXIg5a695bqm6LaF6L+H5LqG57O757uf6ZmQ5Yi277yM5Y+v5Lul5Zyo5q2k5aSE5Yqg5Lul6LCD5pW0XG4gICAgICAgICAgICBpZiAodGFyZ2V0QmFubmVyQWRXaWR0aCAhPSBzaXplLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0QmFubmVyQWRXaWR0aCA9IHNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5zdHlsZS50b3AgPSB3aW5kb3dIZWlnaHQgLSAoc2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc3R5bGUubGVmdCA9ICh3aW5kb3dXaWR0aCAtIHNpemUud2lkdGgpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8v5bm/5ZGK57uE5Lu25oiQ5Yqf5ouJ5Y+W5bm/5ZGK57Sg5p2Q5pe25Lya6Kem5Y+RbG9hZOS6i+S7tueahOebkeWQrOWZqFxuICAgICAgICB0aGlzLmJhbm5lckFkLm9uTG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsIFwiYmFubmVy5bm/5ZGK5ouJ5Y+W5a6M5oiQIVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGJhbm5lckFkX3Nob3coKSB7XG4gICAgICAgIGlmICh0aGlzLmJhbm5lckFkKSB7XG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBiYW5uZXJBZF9oaWRlKCkge1xuICAgICAgICBpZiAodGhpcy5iYW5uZXJBZCkge1xuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRCYW5uZXJBZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaXRWaWRlb0FkKCkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgaWYgKHd4LmNyZWF0ZVJld2FyZGVkVmlkZW9BZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnZpZGVvQWQgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMudmlkZW9JZCxcbiAgICAgICAgICAgIG11bHRpdG9uOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWRlb0FkLm9uQ2xvc2UoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblZpZGVvQWRDYWxsQmFjayh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vblZpZGVvQWRDYWxsQmFjayhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZGVvQWQub25FcnJvcigoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyLmVyckNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDA6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGDlkI7nq6/mjqXlj6PosIPnlKjlpLHotKVgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDAxOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBg5Y+C5pWw6ZSZ6K+vYCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwMjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgYOW5v+WRiuWNleWFg+aXoOaViGApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDM6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGDlhoXpg6jplJnor69gKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDA0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBg5peg5ZCI6YCC55qE5bm/5ZGKYCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwNTpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgYOW5v+WRiue7hOS7tuWuoeaguOS4rWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDY6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGDlub/lkYrnu4Tku7booqvpqbPlm55gKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDA3OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBg5bm/5ZGK57uE5Lu26KKr5bCB56aBYCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwODpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgYOW5v+WRiuWNleWFg+W3suWFs+mXrWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlkZW9BZC5vbkxvYWQoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvQWQuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWRlb0FkLmxvYWQoKTtcbiAgICB9XG4gICAgdmlkZW9BZF9zaG93KG9uVmlkZW9DYWxsOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLm9uVmlkZW9BZENhbGxCYWNrID0gb25WaWRlb0NhbGw7XG4gICAgICAgIHRoaXMudmlkZW9BZCAhPSBudWxsID8gdGhpcy52aWRlb0FkLmxvYWQoKSA6IHRoaXMuaW5pdFZpZGVvQWQoKTtcbiAgICB9XG4gICAgaW5zdGVyQWRfc2hvdygpIHtcbiAgICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKHRpbWUgLSB0aGlzLmluc2VydEFkVGltZSA8IDMwMDAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsICflub/lkYrlhrfljbTkuK0uLi4nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluc2VydEFkVGltZSA9IHRpbWU7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBsZXQgaW50ZXJzdGl0aWFsQWQgPSB0dC5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5pbnNlcnRJZFxuICAgICAgICB9KTtcbiAgICAgICAgaW50ZXJzdGl0aWFsQWQub25FcnJvcigoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyLmVyckNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDA6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGDlkI7nq6/mjqXlj6PosIPnlKjlpLHotKVgKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDAxOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBg5Y+C5pWw6ZSZ6K+vYCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwMjpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgYOW5v+WRiuWNleWFg+aXoOaViGApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDM6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGDlhoXpg6jplJnor69gKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDA0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBg5peg5ZCI6YCC55qE5bm/5ZGKYCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwNTpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgYOW5v+WRiue7hOS7tuWuoeaguOS4rWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDY6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGDlub/lkYrnu4Tku7booqvpqbPlm55gKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDA3OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBg5bm/5ZGK57uE5Lu26KKr5bCB56aBYCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwODpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgYOW5v+WRiuWNleWFg+W3suWFs+mXrWApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGludGVyc3RpdGlhbEFkLm9uQ2xvc2UoKCkgPT4ge1xuICAgICAgICAgICAgaW50ZXJzdGl0aWFsQWQuZGVzdHJveSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW50ZXJzdGl0aWFsQWQubG9hZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaW50ZXJzdGl0aWFsQWQuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgY2hfd2VjaGF0ID0gX3dlY2hhdDsiXX0=