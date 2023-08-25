
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/sdk/_qq.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0d1ddHwb0pAhrbL0w6o11mM', '_qq');
// scripts/sdk/_qq.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ch_qq = void 0;
var TAG = '_qq.ts';
var _qq = /** @class */ (function () {
    function _qq() {
        this.videoAd = null;
        this.bannerAd = null;
        this.insertAd = null;
        this.appBoxAd = null;
        this.videoAdId = "";
        this.insertAdId = "";
        this.bannerAdId = "";
        this.appBoxAdId = "";
        this.OnVideoCallBackListener = null;
        this.sdkInitEnd = false;
        console.log(TAG, 'init platform channel: _qq_play');
    }
    _qq.getInstance = function () {
        if (this.Instance == null) {
            this.Instance = new _qq();
        }
        return this.Instance;
    };
    _qq.prototype.initAdParams = function (param) {
        if (this.sdkInitEnd) {
            return;
        }
        this.sdkInitEnd = true;
        this.insertAdId = param.insertId;
        this.bannerAdId = param.bannerId;
        this.videoAdId = param.videoId;
        this.appBoxAdId = param.appBoxId;
        this.initBannerAd();
    };
    _qq.prototype.buttonShare = function (OnShareCall, Protexture, desTxt) {
        // @ts-ignore
        _qq.shareAppMessage({
            title: desTxt,
            imageUrl: Protexture,
            query: "key1=val1",
            success: function (res) {
                OnShareCall(true);
            },
            fail: function (e) {
                OnShareCall(false);
            }
        });
    };
    _qq.prototype.initVideoAd = function () {
        var _this = this;
        //@ts-ignore
        this.videoAd = _qq.createRewardedVideoAd({
            adUnitId: this.videoAdId
        });
        this.videoAd.onError(function (res) {
            console.warn(TAG, '激励视频错误:', JSON.stringify(res));
        });
        this.videoAd.onLoad(function (res) {
            _this.videoAd.show();
        });
        this.videoAd.load();
        this.videoAd.onClose(function (res) {
            if (res && res.isEnded) {
                _this.OnVideoCallBackListener(true);
            }
            else {
                _this.OnVideoCallBackListener(false);
            }
        });
    };
    _qq.prototype.initBannerAd = function () {
        var _this = this;
        var info = null;
        //@ts-ignore
        _qq.getSystemInfo({
            success: function (res) {
                info = res;
                console.log(TAG, res.windowWidth);
                console.log(TAG, res.windowHeight);
            }
        });
        var targetBannerAdWidth = 150;
        //@ts-ignore
        this.bannerAd = _qq.createBannerAd({
            adUnitId: this.bannerAdId,
            style: {
                left: 0,
                top: info.windowHeight - targetBannerAdWidth,
                width: targetBannerAdWidth,
                height: 200
            }
        });
        this.bannerAd.onResize(function (size) {
            console.log("onResize", size.width, size.height);
            // 如果一开始设置的 banner 宽度超过了系统限制，可以在此处加以调整
            _this.bannerAd.style.left = (info.windowWidth - size.width) / 2;
            _this.bannerAd.style.top = info.windowHeight - size.height;
            //这行是为了在QQ小游戏中能正确显示位置.如果是微信则不需要这句
            _this.bannerAd.style.left = (info.windowWidth - size.width) / 2;
            _this.bannerAd.style.top = info.windowHeight - size.height;
        });
        this.bannerAd.onError(function (e) {
            console.warn(TAG, 'bannerAd onError!', e);
        });
        this.bannerAd.onLoad(function (res) {
            console.warn(TAG, 'bannerAd onLoad!', res);
        });
    };
    _qq.prototype.insertAd_show = function () {
        var _this = this;
        if (this.insertAd != null) {
            this.insertAd.destroy();
        }
        //@ts-ignore
        this.insertAd = _qq.createInterstitialAd({
            adUnitId: this.insertAdId
        });
        this.insertAd.load().then(function (res) {
            _this.insertAd.show();
        });
        this.insertAd.onError(function (err) {
            console.warn(TAG, "\u63D2\u5C4F\u5E7F\u544A\u9519\u8BEF:" + JSON.stringify(err));
        });
    };
    _qq.prototype.creatAppBoxAd = function () {
        //@ts-ignore
        this.appBoxAd = _qq.createAppBox({
            adUnitId: this.appBoxAdId
        });
    };
    _qq.prototype.appBoxAdShow = function () {
        var _this = this;
        this.creatAppBoxAd();
        this.appBoxAd.load().then(function () {
            _this.appBoxAd.show();
        });
    };
    _qq.prototype.appBoxDestroy = function () {
        this.appBoxAd.destroy();
        this.appBoxAd = null;
    };
    _qq.prototype.videoAd_show = function (OnVideoCall) {
        this.OnVideoCallBackListener = OnVideoCall;
        this.videoAd != null ? this.videoAd.load() : this.initVideoAd();
    };
    _qq.prototype.bannerAd_hide = function () {
        this.bannerAd.hide();
        this.bannerAd.destroy();
        this.initBannerAd();
    };
    _qq.prototype.bannerAd_show = function () {
        this.bannerAd.show().then(function () {
            console.log(TAG, 'banner广告显示成功!');
        }).catch(function (err) {
            console.warn(TAG, "banner\u5E7F\u544A\u7EC4\u4EF6\u51FA\u73B0\u95EE\u9898:" + err);
        });
    };
    _qq.prototype.shakeDevice = function () {
        // @ts-ignore
        _qq.vibrateShort();
    };
    return _qq;
}());
exports.ch_qq = _qq;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2RrXFxfcXEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDO0FBQ3JCO0lBWUk7UUFWUSxZQUFPLEdBQVEsSUFBSSxDQUFDO1FBQ3BCLGFBQVEsR0FBUSxJQUFJLENBQUM7UUFDckIsYUFBUSxHQUFRLElBQUksQ0FBQztRQUNyQixhQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsZUFBVSxHQUFXLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsNEJBQXVCLEdBQWEsSUFBSSxDQUFDO1FBQ3pDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ00sZUFBVyxHQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDRCwwQkFBWSxHQUFaLFVBQWEsS0FBWTtRQUNyQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsUUFBUSxD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LENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELDJCQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxHQUFRO1lBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsNERBQWtCLEdBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELHlCQUFXLEdBQVg7UUFDSSxhQUFhO1FBQ2IsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxVQUFDO0FBQUQsQ0ExSkEsQUEwSkMsSUFBQTtBQUNZLFFBQUEsS0FBSyxHQUFHLEdBQUcsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBhcmFtIH0gZnJvbSBcIi4vdHlwZVwiO1xuXG5jb25zdCBUQUcgPSAnX3FxLnRzJztcbmNsYXNzIF9xcSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgSW5zdGFuY2U6IF9xcTtcbiAgICBwcml2YXRlIHZpZGVvQWQ6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBiYW5uZXJBZDogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIGluc2VydEFkOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgYXBwQm94QWQ6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSB2aWRlb0FkSWQ6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBpbnNlcnRBZElkOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgYmFubmVyQWRJZDogc3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIGFwcEJveEFkSWQ6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBPblZpZGVvQ2FsbEJhY2tMaXN0ZW5lcjogRnVuY3Rpb24gPSBudWxsO1xuICAgIHByaXZhdGUgc2RrSW5pdEVuZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFRBRywgJ2luaXQgcGxhdGZvcm0gY2hhbm5lbDogX3FxX3BsYXknKTtcbiAgICB9XG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IF9xcSB7XG4gICAgICAgIGlmICh0aGlzLkluc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuSW5zdGFuY2UgPSBuZXcgX3FxKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuSW5zdGFuY2U7XG4gICAgfVxuICAgIGluaXRBZFBhcmFtcyhwYXJhbTogcGFyYW0pIHtcbiAgICAgICAgaWYgKHRoaXMuc2RrSW5pdEVuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2RrSW5pdEVuZCA9IHRydWU7XG4gICAgICAgIHRoaXMuaW5zZXJ0QWRJZCA9IHBhcmFtLmluc2VydElkO1xuICAgICAgICB0aGlzLmJhbm5lckFkSWQgPSBwYXJhbS5iYW5uZXJJZDtcbiAgICAgICAgdGhpcy52aWRlb0FkSWQgPSBwYXJhbS52aWRlb0lkO1xuICAgICAgICB0aGlzLmFwcEJveEFkSWQgPSBwYXJhbS5hcHBCb3hJZDtcbiAgICAgICAgdGhpcy5pbml0QmFubmVyQWQoKTtcbiAgICB9XG4gICAgYnV0dG9uU2hhcmUoT25TaGFyZUNhbGw6IEZ1bmN0aW9uLCBQcm90ZXh0dXJlOiBzdHJpbmcgfCBudWxsLCBkZXNUeHQ6IHN0cmluZyB8IG51bGwpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBfcXEuc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgIHRpdGxlOiBkZXNUeHQsICAgICAgICAvLy8+IFwi5ZCI5oiQ5bCP5ri45oiP5pCt6YWN57uP5YW45YOP57Sg6aOO5qC877yM546p6L2s5YO15bC45aSn6aOO5pq077yBXCJcbiAgICAgICAgICAgIGltYWdlVXJsOiBQcm90ZXh0dXJlLCAvLy8+IFwicmVzL3Jhdy1hc3NldHMvYTAvYTAxMDAwMzItOTMzYy00MDU3LWE1YzQtZDhkMmJkOWY4ZDBkLnBuZ1wiXG4gICAgICAgICAgICBxdWVyeTogXCJrZXkxPXZhbDFcIixcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBPblNoYXJlQ2FsbCh0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsKGU6IGFueSkge1xuICAgICAgICAgICAgICAgIE9uU2hhcmVDYWxsKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGluaXRWaWRlb0FkKCkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdGhpcy52aWRlb0FkID0gX3FxLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogdGhpcy52aWRlb0FkSWRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlkZW9BZC5vbkVycm9yKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+a/gOWKseinhumikemUmeivrzonLCBKU09OLnN0cmluZ2lmeShyZXMpKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnZpZGVvQWQub25Mb2FkKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWRlb0FkLnNob3coKTtcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy52aWRlb0FkLmxvYWQoKTtcbiAgICAgICAgdGhpcy52aWRlb0FkLm9uQ2xvc2UoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5PblZpZGVvQ2FsbEJhY2tMaXN0ZW5lcih0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5PblZpZGVvQ2FsbEJhY2tMaXN0ZW5lcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpbml0QmFubmVyQWQoKSB7XG4gICAgICAgIGxldCBpbmZvOiBhbnkgPSBudWxsO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgX3FxLmdldFN5c3RlbUluZm8oe1xuICAgICAgICAgICAgc3VjY2VzcyhyZXM6IGFueSkge1xuICAgICAgICAgICAgICAgIGluZm8gPSByZXM7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCByZXMud2luZG93V2lkdGgpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCByZXMud2luZG93SGVpZ2h0KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBsZXQgdGFyZ2V0QmFubmVyQWRXaWR0aCA9IDE1MDtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHRoaXMuYmFubmVyQWQgPSBfcXEuY3JlYXRlQmFubmVyQWQoe1xuICAgICAgICAgICAgYWRVbml0SWQ6IHRoaXMuYmFubmVyQWRJZCxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgICAgICB0b3A6IGluZm8ud2luZG93SGVpZ2h0IC0gdGFyZ2V0QmFubmVyQWRXaWR0aCxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGFyZ2V0QmFubmVyQWRXaWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmJhbm5lckFkLm9uUmVzaXplKChzaXplOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib25SZXNpemVcIiwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgLy8g5aaC5p6c5LiA5byA5aeL6K6+572u55qEIGJhbm5lciDlrr3luqbotoXov4fkuobns7vnu5/pmZDliLbvvIzlj6/ku6XlnKjmraTlpITliqDku6XosIPmlbRcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc3R5bGUubGVmdCA9IChpbmZvLndpbmRvd1dpZHRoIC0gc2l6ZS53aWR0aCkgLyAyO1xuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5zdHlsZS50b3AgPSBpbmZvLndpbmRvd0hlaWdodCAtIHNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgLy/ov5nooYzmmK/kuLrkuoblnKhRUeWwj+a4uOaIj+S4reiDveato+ehruaYvuekuuS9jee9ri7lpoLmnpzmmK/lvq7kv6HliJnkuI3pnIDopoHov5nlj6VcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc3R5bGUubGVmdCA9IChpbmZvLndpbmRvd1dpZHRoIC0gc2l6ZS53aWR0aCkgLyAyO1xuICAgICAgICAgICAgdGhpcy5iYW5uZXJBZC5zdHlsZS50b3AgPSBpbmZvLndpbmRvd0hlaWdodCAtIHNpemUuaGVpZ2h0O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkVycm9yKChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICdiYW5uZXJBZCBvbkVycm9yIScsIGUpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuYmFubmVyQWQub25Mb2FkKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ2Jhbm5lckFkIG9uTG9hZCEnLCByZXMpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpbnNlcnRBZF9zaG93KCkge1xuICAgICAgICBpZiAodGhpcy5pbnNlcnRBZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydEFkLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5pbnNlcnRBZCA9IF9xcS5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5pbnNlcnRBZElkXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmluc2VydEFkLmxvYWQoKS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRBZC5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmluc2VydEFkLm9uRXJyb3IoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCBg5o+S5bGP5bm/5ZGK6ZSZ6K+vOiR7SlNPTi5zdHJpbmdpZnkoZXJyKX1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNyZWF0QXBwQm94QWQoKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmFwcEJveEFkID0gX3FxLmNyZWF0ZUFwcEJveCh7XG4gICAgICAgICAgICBhZFVuaXRJZDogdGhpcy5hcHBCb3hBZElkXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhcHBCb3hBZFNob3coKSB7XG4gICAgICAgIHRoaXMuY3JlYXRBcHBCb3hBZCgpO1xuICAgICAgICB0aGlzLmFwcEJveEFkLmxvYWQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwQm94QWQuc2hvdygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXBwQm94RGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5hcHBCb3hBZC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuYXBwQm94QWQgPSBudWxsO1xuICAgIH1cbiAgICB2aWRlb0FkX3Nob3coT25WaWRlb0NhbGw6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuT25WaWRlb0NhbGxCYWNrTGlzdGVuZXIgPSBPblZpZGVvQ2FsbDtcbiAgICAgICAgdGhpcy52aWRlb0FkICE9IG51bGwgPyB0aGlzLnZpZGVvQWQubG9hZCgpIDogdGhpcy5pbml0VmlkZW9BZCgpO1xuICAgIH1cbiAgICBiYW5uZXJBZF9oaWRlKCkge1xuICAgICAgICB0aGlzLmJhbm5lckFkLmhpZGUoKTtcbiAgICAgICAgdGhpcy5iYW5uZXJBZC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuaW5pdEJhbm5lckFkKCk7XG4gICAgfVxuICAgIGJhbm5lckFkX3Nob3coKSB7XG4gICAgICAgIHRoaXMuYmFubmVyQWQuc2hvdygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCAnYmFubmVy5bm/5ZGK5pi+56S65oiQ5YqfIScpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGBiYW5uZXLlub/lkYrnu4Tku7blh7rnjrDpl67popg6JHtlcnJ9YCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzaGFrZURldmljZSgpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBfcXEudmlicmF0ZVNob3J0KCk7XG4gICAgfVxufVxuZXhwb3J0IGNvbnN0IGNoX3FxID0gX3FxOyJdfQ==