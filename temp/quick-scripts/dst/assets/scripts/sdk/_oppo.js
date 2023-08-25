
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/sdk/_oppo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5f56fwWgFJHeJLqFUCoLqCS', '_oppo');
// scripts/sdk/_oppo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ch_oppo = void 0;
var export_sdk_1 = require("../../syyx_sdk/export_sdk");
var TAG = '_oppo.ts';
var _oppo = /** @class */ (function () {
    function _oppo() {
        this.bannerId = "";
        this.videoId = "";
        this.bannerAd = null;
        this.videoAd = null;
        this.OnVideoCallBackListener = null;
        this.bannerAd_showNum = 20;
        this.sdkInitEnd = false;
        this.initTime = 0;
        console.log(TAG, 'init platform channel: oppo_play');
    }
    _oppo.getInstance = function () {
        if (this.Instance == null) {
            this.Instance = new _oppo();
            this.Instance.initTime = new Date().getTime();
        }
        return this.Instance;
    };
    _oppo.prototype.initAdParams = function (param) {
        if (this.sdkInitEnd) {
            return;
        }
        this.sdkInitEnd = true;
        this.bannerId = param.bannerId;
        this.videoId = param.videoId;
        this.initVideoAd();
        this.initBannerAd();
        ///> 新平台版本号'1051'（minPlatformVersion> ='1051'）已经不再需要进行广告初始化qg.initAdService(object);
    };
    _oppo.prototype.initBannerAd = function () {
        var self = this;
        //@ts-ignore
        var bannerAd = qg.createBannerAd({
            posId: this.bannerId
        });
        this.bannerAd = bannerAd;
        this.bannerAd.onHide(function () {
            self.bannerAd_showNum -= 1;
            console.log(TAG, "banner 广告隐藏!");
        });
        this.bannerAd.onShow(function () {
            console.log(TAG, "banner 广告显示!");
        });
        this.bannerAd.onError(function (err) {
            switch (err['errCode']) {
                case 1001:
                    console.warn(TAG, '1.传参是否有误!');
                    console.warn(TAG, '2.是否使用了不支持的方法操作!');
                    console.warn(TAG, '3.不要重复拉取广告，我们制定限制!');
                    console.warn(TAG, '4.广告资源位是否没有申请!');
                    break;
                case 1002:
                    console.warn(TAG, '广告必须在19/14之后的Android版本上显示，一般是包名错误导致的!');
                    break;
                case 1003:
                    console.warn(TAG, '无广告返回!');
                    break;
                case 1004:
                    console.warn(TAG, '1.OPPO开放平台查看广告是否异常，异常则重新申请!');
                    console.warn(TAG, '1.检查手机设置的时间是否晚于现在实际的时间，若是，请设置与北京时间相同!');
                    console.warn(TAG, '1.在包名正确情况下，概率性偏移20003报错属于正常现象，报错与广告填充率/短时间交替拉取广告有关，请上架后前往OPPO广告联盟后台，查看广告数据是否正常（填充率是否正常）；继续拉取广告，是会拉取不到广告，因为我们对拉取频次作了限制!');
                    break;
            }
        });
    };
    _oppo.prototype.bannerAd_show = function () {
        if (this.bannerAd_showNum <= 0 || new Date().getTime() - this.initTime < 60000) {
            return;
        }
        this.bannerAd.show();
    };
    _oppo.prototype.bannerAd_hide = function () {
        if (this.bannerAd) {
            this.bannerAd.hide();
            this.bannerAd.destroy();
            this.initBannerAd();
        }
    };
    _oppo.prototype.initVideoAd = function () {
        var self = this;
        //@ts-ignore
        this.videoAd = qg.createRewardedVideoAd({
            posId: self.videoId
        });
        this.videoAd.onLoad(function () {
            self.videoAd.show();
        });
        this.videoAd.onError(function (err) {
            switch (err['errCode']) {
                case 1001:
                    console.warn(TAG, '1.传参是否有误!');
                    console.warn(TAG, '2.是否使用了不支持的方法操作!');
                    console.warn(TAG, '3.不要重复拉取广告，我们制定限制!');
                    console.warn(TAG, '4.广告资源位是否没有申请!');
                    break;
                case 1002:
                    console.warn(TAG, '广告必须在19/14之后的Android版本上显示，一般是包名错误导致的!');
                    break;
                case 1003:
                    console.warn(TAG, '无广告返回!');
                    break;
                case 1004:
                    console.warn(TAG, '1.OPPO开放平台查看广告是否异常，异常则重新申请!');
                    console.warn(TAG, '1.检查手机设置的时间是否晚于现在实际的时间，若是，请设置与北京时间相同!');
                    console.warn(TAG, '1.在包名正确情况下，概率性偏移20003报错属于正常现象，报错与广告填充率/短时间交替拉取广告有关，请上架后前往OPPO广告联盟后台，查看广告数据是否正常（填充率是否正常）；继续拉取广告，是会拉取不到广告，因为我们对拉取频次作了限制!');
                    break;
            }
            //@ts-ignore
            qg.showToast({
                title: '暂时没有视频广告了，请稍后再试！',
                icon: 'none',
                duration: 2000
            });
        });
        this.videoAd.onClose(function (res) {
            if (res.isEnded) {
                self.OnVideoCallBackListener(true);
            }
            else {
                self.OnVideoCallBackListener(false);
            }
        });
    };
    _oppo.prototype.videoAd_show = function (OnVideoCall) {
        // this.OnVideoCallBackListener = OnVideoCall;
        // this.videoAd.load();
        export_sdk_1.Export.show_video(function () {
            cc.log('看完视频，需要在此写上放发奖励代码');
            OnVideoCall && OnVideoCall(true);
        }, function () {
            OnVideoCall && OnVideoCall(false);
        });
    };
    _oppo.prototype._oppoPush = function (packgeName) {
        if (packgeName === void 0) { packgeName = ''; }
        // @ts-ignore
        qg.navigateToMiniGame({ pkgName: packgeName });
    };
    _oppo.prototype.shakeDevice = function () {
        // @ts-ignore
        qg.vibrateShort({});
    };
    return _oppo;
}());
exports.ch_oppo = _oppo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2RrXFxfb3Bwby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUQ7QUFFbkQsSUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDO0FBQ3ZCO0lBVUk7UUFSUSxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsYUFBUSxHQUFRLElBQUksQ0FBQztRQUNyQixZQUFPLEdBQVEsSUFBSSxDQUFDO1FBQ3BCLDRCQUF1QixHQUFhLElBQUksQ0FBQztRQUN6QyxxQkFBZ0IsR0FBVyxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLGtDQUFrQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNhLGlCQUFXLEdBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNqRDtRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBQ0QsNEJBQVksR0FBWixVQUFhLEtBQVk7UUFDckIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZ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QUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNILElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2QztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELDRCQUFZLEdBQVosVUFBYSxXQUFxQjtRQUM5Qiw4Q0FBOEM7UUFDOUMsdUJBQXVCO1FBRXZCLG1CQUFNLENBQUMsVUFBVSxDQUFDO1lBQ2QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzVCLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUFDO1lBQ0UsV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFDRCx5QkFBUyxHQUFULFVBQVUsVUFBdUI7UUFBdkIsMkJBQUEsRUFBQSxlQUF1QjtRQUM3QixhQUFhO1FBQ2IsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNELDJCQUFXLEdBQVg7UUFDSSxhQUFhO1FBQ2IsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0wsWUFBQztBQUFELENBaEpBLEFBZ0pDLElBQUE7QUFDWSxRQUFBLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHBvcnQgfSBmcm9tIFwiLi4vLi4vc3l5eF9zZGsvZXhwb3J0X3Nka1wiO1xuaW1wb3J0IHsgcGFyYW0gfSBmcm9tIFwiLi90eXBlXCI7XG5jb25zdCBUQUcgPSAnX29wcG8udHMnO1xuY2xhc3MgX29wcG8ge1xuICAgIHByaXZhdGUgc3RhdGljIEluc3RhbmNlOiBfb3BwbztcbiAgICBwcml2YXRlIGJhbm5lcklkOiBzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgdmlkZW9JZDogc3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIGJhbm5lckFkOiBhbnkgPSBudWxsO1xuICAgIHByaXZhdGUgdmlkZW9BZDogYW55ID0gbnVsbDtcbiAgICBwcml2YXRlIE9uVmlkZW9DYWxsQmFja0xpc3RlbmVyOiBGdW5jdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBiYW5uZXJBZF9zaG93TnVtOiBudW1iZXIgPSAyMDtcbiAgICBwcml2YXRlIHNka0luaXRFbmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGluaXRUaW1lOiBudW1iZXIgPSAwO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhUQUcsICdpbml0IHBsYXRmb3JtIGNoYW5uZWw6IG9wcG9fcGxheScpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IF9vcHBvIHtcbiAgICAgICAgaWYgKHRoaXMuSW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5JbnN0YW5jZSA9IG5ldyBfb3BwbygpO1xuICAgICAgICAgICAgdGhpcy5JbnN0YW5jZS5pbml0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLkluc3RhbmNlO1xuICAgIH1cbiAgICBpbml0QWRQYXJhbXMocGFyYW06IHBhcmFtKSB7XG4gICAgICAgIGlmICh0aGlzLnNka0luaXRFbmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNka0luaXRFbmQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJhbm5lcklkID0gcGFyYW0uYmFubmVySWQ7XG4gICAgICAgIHRoaXMudmlkZW9JZCA9IHBhcmFtLnZpZGVvSWQ7XG4gICAgICAgIHRoaXMuaW5pdFZpZGVvQWQoKTtcbiAgICAgICAgdGhpcy5pbml0QmFubmVyQWQoKTtcbiAgICAgICAgLy8vPiDmlrDlubPlj7DniYjmnKzlj7cnMTA1MSfvvIhtaW5QbGF0Zm9ybVZlcnNpb24+ID0nMTA1MSfvvInlt7Lnu4/kuI3lho3pnIDopoHov5vooYzlub/lkYrliJ3lp4vljJZxZy5pbml0QWRTZXJ2aWNlKG9iamVjdCk7XG4gICAgfVxuICAgIGluaXRCYW5uZXJBZCgpIHtcbiAgICAgICAgbGV0IHNlbGY6IF9vcHBvID0gdGhpcztcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHZhciBiYW5uZXJBZCA9IHFnLmNyZWF0ZUJhbm5lckFkKHtcbiAgICAgICAgICAgIHBvc0lkOiB0aGlzLmJhbm5lcklkXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmJhbm5lckFkID0gYmFubmVyQWQ7XG4gICAgICAgIHRoaXMuYmFubmVyQWQub25IaWRlKCgpID0+IHtcbiAgICAgICAgICAgIHNlbGYuYmFubmVyQWRfc2hvd051bSAtPSAxO1xuICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCBcImJhbm5lciDlub/lkYrpmpDol48hXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5iYW5uZXJBZC5vblNob3coKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coVEFHLCBcImJhbm5lciDlub/lkYrmmL7npLohXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5iYW5uZXJBZC5vbkVycm9yKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlcnJbJ2VyckNvZGUnXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwMTpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJzEu5Lyg5Y+C5piv5ZCm5pyJ6K+vIScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAnMi7mmK/lkKbkvb/nlKjkuobkuI3mlK/mjIHnmoTmlrnms5Xmk43kvZwhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICczLuS4jeimgemHjeWkjeaLieWPluW5v+WRiu+8jOaIkeS7rOWItuWumumZkOWItiEnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJzQu5bm/5ZGK6LWE5rqQ5L2N5piv5ZCm5rKh5pyJ55Sz6K+3IScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICflub/lkYrlv4XpobvlnKgxOS8xNOS5i+WQjueahEFuZHJvaWTniYjmnKzkuIrmmL7npLrvvIzkuIDoiKzmmK/ljIXlkI3plJnor6/lr7zoh7TnmoQhJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwMzpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJ+aXoOW5v+WRiui/lOWbniEnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDA0OlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAnMS5PUFBP5byA5pS+5bmz5Y+w5p+l55yL5bm/5ZGK5piv5ZCm5byC5bi477yM5byC5bi45YiZ6YeN5paw55Sz6K+3IScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAnMS7mo4Dmn6XmiYvmnLrorr7nva7nmoTml7bpl7TmmK/lkKbmmZrkuo7njrDlnKjlrp7pmYXnmoTml7bpl7TvvIzoi6XmmK/vvIzor7forr7nva7kuI7ljJfkuqzml7bpl7Tnm7jlkIwhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICcxLuWcqOWMheWQjeato+ehruaDheWGteS4i++8jOamgueOh+aAp+WBj+enuzIwMDAz5oql6ZSZ5bGe5LqO5q2j5bi4546w6LGh77yM5oql6ZSZ5LiO5bm/5ZGK5aGr5YWF546HL+efreaXtumXtOS6pOabv+aLieWPluW5v+WRiuacieWFs++8jOivt+S4iuaetuWQjuWJjeW+gE9QUE/lub/lkYrogZTnm5/lkI7lj7DvvIzmn6XnnIvlub/lkYrmlbDmja7mmK/lkKbmraPluLjvvIjloavlhYXnjofmmK/lkKbmraPluLjvvInvvJvnu6fnu63mi4nlj5blub/lkYrvvIzmmK/kvJrmi4nlj5bkuI3liLDlub/lkYrvvIzlm6DkuLrmiJHku6zlr7nmi4nlj5bpopHmrKHkvZzkuobpmZDliLYhJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYmFubmVyQWRfc2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMuYmFubmVyQWRfc2hvd051bSA8PSAwIHx8IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5pbml0VGltZSA8IDYwMDAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5iYW5uZXJBZC5zaG93KCk7XG4gICAgfVxuICAgIGJhbm5lckFkX2hpZGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmJhbm5lckFkKSB7XG4gICAgICAgICAgICB0aGlzLmJhbm5lckFkLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuYmFubmVyQWQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0QmFubmVyQWQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0VmlkZW9BZCgpIHtcbiAgICAgICAgbGV0IHNlbGY6IF9vcHBvID0gdGhpcztcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHRoaXMudmlkZW9BZCA9IHFnLmNyZWF0ZVJld2FyZGVkVmlkZW9BZCh7XG4gICAgICAgICAgICBwb3NJZDogc2VsZi52aWRlb0lkXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZGVvQWQub25Mb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudmlkZW9BZC5zaG93KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZpZGVvQWQub25FcnJvcihmdW5jdGlvbiAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyWydlcnJDb2RlJ10pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDE6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICcxLuS8oOWPguaYr+WQpuacieivryEnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJzIu5piv5ZCm5L2/55So5LqG5LiN5pSv5oyB55qE5pa55rOV5pON5L2cIScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAnMy7kuI3opoHph43lpI3mi4nlj5blub/lkYrvvIzmiJHku6zliLblrprpmZDliLYhJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICc0LuW5v+WRiui1hOa6kOS9jeaYr+WQpuayoeacieeUs+ivtyEnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxMDAyOlxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAn5bm/5ZGK5b+F6aG75ZyoMTkvMTTkuYvlkI7nmoRBbmRyb2lk54mI5pys5LiK5pi+56S677yM5LiA6Iis5piv5YyF5ZCN6ZSZ6K+v5a+86Ie055qEIScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDEwMDM6XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihUQUcsICfml6Dlub/lkYrov5Tlm54hJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTAwNDpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJzEuT1BQT+W8gOaUvuW5s+WPsOafpeeci+W5v+WRiuaYr+WQpuW8guW4uO+8jOW8guW4uOWImemHjeaWsOeUs+ivtyEnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFRBRywgJzEu5qOA5p+l5omL5py66K6+572u55qE5pe26Ze05piv5ZCm5pma5LqO546w5Zyo5a6e6ZmF55qE5pe26Ze077yM6Iul5piv77yM6K+36K6+572u5LiO5YyX5Lqs5pe26Ze055u45ZCMIScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVEFHLCAnMS7lnKjljIXlkI3mraPnoa7mg4XlhrXkuIvvvIzmpoLnjofmgKflgY/np7syMDAwM+aKpemUmeWxnuS6juato+W4uOeOsOixoe+8jOaKpemUmeS4juW5v+WRiuWhq+WFheeOhy/nn63ml7bpl7TkuqTmm7/mi4nlj5blub/lkYrmnInlhbPvvIzor7fkuIrmnrblkI7liY3lvoBPUFBP5bm/5ZGK6IGU55uf5ZCO5Y+w77yM5p+l55yL5bm/5ZGK5pWw5o2u5piv5ZCm5q2j5bi477yI5aGr5YWF546H5piv5ZCm5q2j5bi477yJ77yb57un57ut5ouJ5Y+W5bm/5ZGK77yM5piv5Lya5ouJ5Y+W5LiN5Yiw5bm/5ZGK77yM5Zug5Li65oiR5Lus5a+55ouJ5Y+W6aKR5qyh5L2c5LqG6ZmQ5Yi2IScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgcWcuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aaguaXtuayoeacieinhumikeW5v+WRiuS6hu+8jOivt+eojeWQjuWGjeivle+8gScsXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmlkZW9BZC5vbkNsb3NlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5pc0VuZGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5PblZpZGVvQ2FsbEJhY2tMaXN0ZW5lcih0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZi5PblZpZGVvQ2FsbEJhY2tMaXN0ZW5lcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2aWRlb0FkX3Nob3coT25WaWRlb0NhbGw6IEZ1bmN0aW9uKSB7XG4gICAgICAgIC8vIHRoaXMuT25WaWRlb0NhbGxCYWNrTGlzdGVuZXIgPSBPblZpZGVvQ2FsbDtcbiAgICAgICAgLy8gdGhpcy52aWRlb0FkLmxvYWQoKTtcblxuICAgICAgICBFeHBvcnQuc2hvd192aWRlbygoKSA9PiB7IFxuICAgICAgICAgICAgY2MubG9nKCfnnIvlrozop4bpopHvvIzpnIDopoHlnKjmraTlhpnkuIrmlL7lj5HlpZblirHku6PnoIEnKTtcbiAgICAgICAgICAgIE9uVmlkZW9DYWxsICYmIE9uVmlkZW9DYWxsKHRydWUpO1xuICAgICAgICB9LCgpPT57XG4gICAgICAgICAgICBPblZpZGVvQ2FsbCAmJiBPblZpZGVvQ2FsbChmYWxzZSk7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cbiAgICBfb3Bwb1B1c2gocGFja2dlTmFtZTogc3RyaW5nID0gJycpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBxZy5uYXZpZ2F0ZVRvTWluaUdhbWUoeyBwa2dOYW1lOiBwYWNrZ2VOYW1lIH0pO1xuICAgIH1cbiAgICBzaGFrZURldmljZSgpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBxZy52aWJyYXRlU2hvcnQoe30pO1xuICAgIH1cbn1cbmV4cG9ydCBjb25zdCBjaF9vcHBvID0gX29wcG87Il19