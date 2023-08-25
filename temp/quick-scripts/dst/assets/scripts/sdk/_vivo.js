
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/sdk/_vivo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5d57fhYn05IhJPkcocEaSWw', '_vivo');
// scripts/sdk/_vivo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ch_vivo = void 0;
var TAG = '_vivo.ts';
var _vivo = /** @class */ (function () {
    function _vivo() {
        this.videoId = "";
        this.bannerId = "";
        this.insertId = "";
        this.nativeId = "";
        this.videoAd = null;
        this.bannerAd = null;
        this.OnVideoCallBackListener = null;
        this.sdkInitEnd = false;
        this.showAdLastTime = 0;
        console.log(TAG, 'init platform channel: vivo_play');
    }
    _vivo.getInstance = function () {
        if (this.Instance == null) {
            this.Instance = new _vivo();
        }
        return this.Instance;
    };
    _vivo.prototype.initAdParams = function (param) {
        if (this.sdkInitEnd) {
            return;
        }
        this.sdkInitEnd = true;
        this.insertId = param.insertId;
        this.bannerId = param.bannerId;
        this.videoId = param.videoId;
        this.nativeId = param.nativeId;
        this.initBannderAd();
    };
    _vivo.prototype.initBannderAd = function () {
        //@ts-ignore
        var bannerAd = qg.createBannerAd({
            posId: this.bannerId,
            style: {}
        });
        this.bannerAd = bannerAd;
        this.bannerAd.onError(function (err) {
            console.warn(TAG, "banner\u5E7F\u544A\u52A0\u8F7D\u5931\u8D25:" + JSON.stringify(err));
        });
    };
    _vivo.prototype.bannerAd_show = function () {
        if (this.bannerAd) {
            this.bannerAd.show();
        }
    };
    _vivo.prototype.bannerAd_hide = function () {
        if (this.bannerAd) {
            this.bannerAd.hide();
            this.bannerAd.destroy();
            this.initBannderAd();
        }
    };
    _vivo.prototype.initVideoAd = function () {
        var _this = this;
        //@ts-ignore
        this.videoAd = qg.createRewardedVideoAd({
            posId: this.videoId
        });
        this.videoAd.onLoad(function () {
            cc.audioEngine.pauseAll();
            _this.videoAd.show();
            _this.showAdLastTime = new Date().getTime();
        });
        this.videoAd.onClose(function (res) {
            cc.audioEngine.resumeAll();
            if (res && res.isEnded) {
                _this.OnVideoCallBackListener(true);
            }
            else {
                _this.OnVideoCallBackListener(false);
            }
        });
        this.videoAd.onError(function (err) {
            console.warn(TAG, "\u89C6\u9891\u5E7F\u544A\u9519\u8BEF:" + JSON.stringify(err));
        });
        this.videoAd.load();
    };
    _vivo.prototype.videoAd_show = function (OnVideoCall) {
        var now = new Date().getTime();
        if (now - this.showAdLastTime < 60000) {
            //@ts-ignore
            qg.showToast({
                message: '每分钟只能看一次视频'
            });
            return;
        }
        this.OnVideoCallBackListener = OnVideoCall;
        this.videoAd != null ? this.videoAd.load() : this.initVideoAd();
    };
    _vivo.prototype.insertAd_show = function () {
        // @ts-ignore
        var interstitialAd = qg.createInterstitialAd({
            posId: this.insertId
        });
        interstitialAd.onError(function (err) {
            console.warn(TAG, "\u63D2\u5C4F\u5E7F\u544A\u9519\u8BEF:" + JSON.stringify(err));
        });
        interstitialAd.show();
    };
    _vivo.prototype.shakeDevice = function () {
        // @ts-ignore
        qg.vibrateShort();
    };
    _vivo.prototype.nativeAdShow = function (cb) {
        // @ts-ignore
        var nativeAd = qg.createNativeAd({
            posId: this.nativeId,
        });
        nativeAd.onLoad(function (res) {
            console.log(TAG, "\u539F\u751F\u5E7F\u544A\u52A0\u8F7D\u5B8C\u6210-onload\u89E6\u53D1:" + JSON.stringify(res));
            var nativeCurrentAd = null;
            if (res && res.adList) {
                nativeCurrentAd = res.adList.pop();
                ///> 上报曝光
                nativeAd.reportAdShow({ adId: nativeCurrentAd["adId"] });
                ///> 上报点击
                var tempClick = function () {
                    console.log(TAG, '_vivo 原生点击');
                    nativeAd.reportAdClick({ adId: nativeCurrentAd["adId"] });
                };
                //展示广告
                if (nativeCurrentAd["icon"] != null && nativeCurrentAd["imgUrlList"][0] != null) {
                    cb(nativeCurrentAd["icon"], nativeCurrentAd["imgUrlList"][0], tempClick);
                }
            }
        });
        nativeAd.onError(function (err) {
            switch (err.errCode) {
                case -3:
                    console.log(TAG, "\u539F\u751F\u5E7F\u544A\u52A0\u8F7D\u5931\u8D25---\u8C03\u7528\u592A\u9891\u7E41:" + JSON.stringify(err));
                    break;
                default:
                    console.log(TAG, "\u539F\u751F\u5E7F\u544A\u52A0\u8F7D\u5F02\u5E38:" + JSON.stringify(err));
                    break;
            }
        });
        nativeAd.load().then(function () {
            console.log(TAG, "VIVO\u539F\u751F\u52A0\u8F7D\u6210\u529F");
        }).catch(function (err) {
            console.warn(TAG, "VIVO\u539F\u751F\u52A0\u8F7D\u5931\u8D25:" + JSON.stringify(err));
        });
    };
    return _vivo;
}());
exports.ch_vivo = _vivo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2RrXFxfdml2by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNLEdBQUcsR0FBRyxVQUFVLENBQUM7QUFDdkI7SUFXSTtRQVRRLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsWUFBTyxHQUFRLElBQUksQ0FBQztRQUNwQixhQUFRLEdBQVEsSUFBSSxDQUFDO1FBQ3JCLDRCQUF1QixHQUFhLElBQUksQ0FBQztRQUN6QyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBRS9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGtDQUFrQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNhLGlCQUFXLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7U0FDL0I7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNELDRCQUFZLEdBQVosVUFBYSxLQUFZO1FBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFB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LEFBOElDLElBQUE7QUFDWSxRQUFBLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuYXRpdmUsIHBhcmFtIH0gZnJvbSBcIi4vdHlwZVwiO1xuY29uc3QgVEFHID0gJ192aXZvLnRzJztcbmNsYXNzIF92aXZvIHtcbiAgICBwcml2YXRlIHN0YXRpYyBJbnN0YW5jZTogX3Zpdm87XG4gICAgcHJpdmF0ZSB2aWRlb0lkOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgYmFubmVySWQ6IHN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBpbnNlcnRJZDogc3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIG5hdGl2ZUlkOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgdmlkZW9BZDogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIGJhbm5lckFkOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgT25WaWRlb0NhbGxCYWNrTGlzdGVuZXI6IEZ1bmN0aW9uID0gbnVsbDtcbiAgICBwcml2YXRlIHNka0luaXRFbmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIHNob3dBZExhc3RUaW1lOiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhUQUcsICdpbml0IHBsYXRmb3JtIGNoYW5uZWw6IHZpdm9fcGxheScpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IF92aXZvIHtcbiAgICAgICAgaWYgKHRoaXMuSW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5JbnN0YW5jZSA9IG5ldyBfdml2bygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLkluc3RhbmNlO1xuICAgIH1cbiAgICBpbml0QWRQYXJhbXMocGFyYW06IHBhcmFtKSB7XG4gICAgICAgIGlmICh0aGlzLnNka0luaXRFbmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNka0luaXRFbmQgPSB0cnVlO1xuICAgICAgICB0aGlzLmluc2VydElkID0gcGFyYW0uaW5zZXJ0SWQ7XG4gICAgICAgIHRoaXMuYmFubmVySWQgPSBwYXJhbS5iYW5uZXJJZDtcbiAgICAgICAgdGhpcy52aWRlb0lkID0gcGFyYW0udmlkZW9JZDtcbiAgICAgICAgdGhpcy5uYXRpdmVJZCA9IHBhcmFtLm5hdGl2ZUlkO1xuICAgICAgICB0aGlzLmluaXRCYW5uZGVyQWQoKTtcbiAgICB9XG4gICAgaW5pdEJhbm5kZXJBZCgpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIGxldCBiYW5uZXJBZCA9IHFnLmNyZWF0ZUJhbm5lckFkKHtcbiAgICAgICAgICAgIHBvc0lkOiB0aGlzLmJhbm5lcklkLFxuICAgICAgICAgICAgc3R5bGU6IHt9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJhbm5lckFkID0gYmFubmVyQWQ7XG4gICAgICAgIHRoaXMuYmFubmVyQWQub25FcnJvcigoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGBiYW5uZXLlub/lkYrliqDovb3lpLHotKU6JHtKU09OLnN0cmluZ2lmeShlcnIpfWApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYmFubmVyQWRfc2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFubmVyQWQpIHtcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJhbm5lckFkX2hpZGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmJhbm5lckFkKSB7XG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0QmFubmRlckFkKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdFZpZGVvQWQoKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnZpZGVvQWQgPSBxZy5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgcG9zSWQ6IHRoaXMudmlkZW9JZFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWRlb0FkLm9uTG9hZCgoKSA9PiB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbCgpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0FkLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0FkTGFzdFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlkZW9BZC5vbkNsb3NlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucmVzdW1lQWxsKCk7XG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5pc0VuZGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5PblZpZGVvQ2FsbEJhY2tMaXN0ZW5lcih0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5PblZpZGVvQ2FsbEJhY2tMaXN0ZW5lcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZGVvQWQub25FcnJvcigoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGDop4bpopHlub/lkYrplJnor686JHtKU09OLnN0cmluZ2lmeShlcnIpfWApO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52aWRlb0FkLmxvYWQoKTtcbiAgICB9XG4gICAgdmlkZW9BZF9zaG93KE9uVmlkZW9DYWxsOiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgbm93OiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKG5vdyAtIHRoaXMuc2hvd0FkTGFzdFRpbWUgPCA2MDAwMCkge1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBxZy5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICfmr4/liIbpkp/lj6rog73nnIvkuIDmrKHop4bpopEnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLk9uVmlkZW9DYWxsQmFja0xpc3RlbmVyID0gT25WaWRlb0NhbGw7XG4gICAgICAgIHRoaXMudmlkZW9BZCAhPSBudWxsID8gdGhpcy52aWRlb0FkLmxvYWQoKSA6IHRoaXMuaW5pdFZpZGVvQWQoKTtcbiAgICB9XG4gICAgaW5zZXJ0QWRfc2hvdygpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB2YXIgaW50ZXJzdGl0aWFsQWQgPSBxZy5jcmVhdGVJbnRlcnN0aXRpYWxBZCh7XG4gICAgICAgICAgICBwb3NJZDogdGhpcy5pbnNlcnRJZFxuICAgICAgICB9KTtcbiAgICAgICAgaW50ZXJzdGl0aWFsQWQub25FcnJvcigoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsIGDmj5LlsY/lub/lkYrplJnor686JHtKU09OLnN0cmluZ2lmeShlcnIpfWApO1xuICAgICAgICB9KTtcbiAgICAgICAgaW50ZXJzdGl0aWFsQWQuc2hvdygpO1xuICAgIH1cbiAgICBzaGFrZURldmljZSgpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBxZy52aWJyYXRlU2hvcnQoKTtcbiAgICB9XG4gICAgbmF0aXZlQWRTaG93KGNiOiBuYXRpdmUpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBsZXQgbmF0aXZlQWQgPSBxZy5jcmVhdGVOYXRpdmVBZCh7XG4gICAgICAgICAgICBwb3NJZDogdGhpcy5uYXRpdmVJZCxcbiAgICAgICAgfSk7XG4gICAgICAgIG5hdGl2ZUFkLm9uTG9hZCgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFRBRywgYOWOn+eUn+W5v+WRiuWKoOi9veWujOaIkC1vbmxvYWTop6blj5E6JHtKU09OLnN0cmluZ2lmeShyZXMpfWApO1xuICAgICAgICAgICAgbGV0IG5hdGl2ZUN1cnJlbnRBZDogYW55ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmFkTGlzdCkge1xuICAgICAgICAgICAgICAgIG5hdGl2ZUN1cnJlbnRBZCA9IHJlcy5hZExpc3QucG9wKCk7XG4gICAgICAgICAgICAgICAgLy8vPiDkuIrmiqXmm53lhYlcbiAgICAgICAgICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZFNob3coeyBhZElkOiBuYXRpdmVDdXJyZW50QWRbXCJhZElkXCJdIH0pO1xuICAgICAgICAgICAgICAgIC8vLz4g5LiK5oql54K55Ye7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBDbGljazogRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFRBRywgJ192aXZvIOWOn+eUn+eCueWHuycpO1xuICAgICAgICAgICAgICAgICAgICBuYXRpdmVBZC5yZXBvcnRBZENsaWNrKHsgYWRJZDogbmF0aXZlQ3VycmVudEFkW1wiYWRJZFwiXSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/lsZXnpLrlub/lkYpcbiAgICAgICAgICAgICAgICBpZiAobmF0aXZlQ3VycmVudEFkW1wiaWNvblwiXSAhPSBudWxsICYmIG5hdGl2ZUN1cnJlbnRBZFtcImltZ1VybExpc3RcIl1bMF0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjYihuYXRpdmVDdXJyZW50QWRbXCJpY29uXCJdLCBuYXRpdmVDdXJyZW50QWRbXCJpbWdVcmxMaXN0XCJdWzBdLCB0ZW1wQ2xpY2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG5hdGl2ZUFkLm9uRXJyb3IoKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGVyci5lcnJDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAtMzpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCBg5Y6f55Sf5bm/5ZGK5Yqg6L295aSx6LSlLS0t6LCD55So5aSq6aKR57mBOiR7SlNPTi5zdHJpbmdpZnkoZXJyKX1gKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCBg5Y6f55Sf5bm/5ZGK5Yqg6L295byC5bi4OiR7SlNPTi5zdHJpbmdpZnkoZXJyKX1gKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBuYXRpdmVBZC5sb2FkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhUQUcsIGBWSVZP5Y6f55Sf5Yqg6L295oiQ5YqfYCk7XG4gICAgICAgIH0pLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgYFZJVk/ljp/nlJ/liqDovb3lpLHotKU6JHtKU09OLnN0cmluZ2lmeShlcnIpfWApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgY29uc3QgY2hfdml2byA9IF92aXZvO1xuIl19