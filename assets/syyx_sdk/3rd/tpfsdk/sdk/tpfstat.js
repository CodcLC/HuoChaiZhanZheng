"use strict";var tpfstat=function(t){function r(t,e,n,s,p){return"appId="+t+"&random="+n+"&timestamp="+s+"&sign="+md5("appId="+t+"&json="+p+"&random="+n+"&timestamp="+s+"&appKey="+e).toUpperCase()}this.appId=t.appId,this.appKey=t.appKey,this.version=t.version,this.sversion=t.sversion,this.channelId=t.channelId,this.eventUrl=t.eventUrl,this.batchEventUrl=t.batchEventUrl,this.debug=t.debug,tpfstat.prototype.GAME_EVENT_API_VERSION="2.2",tpfstat.prototype.GAME_EVENT_CLIENT_SOURCE="client",tpfstat.prototype.EventType={APP_START:"app_start",USER_REGISTER:"register",USER_LOGIN:"login",HEART_BEAT:"heart",COIN_PAY:"coin_pay",COIN_TRADE:"coin_trade",COIN_BROKEN:"coin_broken",ITEM_TRADE:"item_trade",GAME_QUEST:"game_quest",GAME_LEVEL:"game_level",AD:"ad",USER_CUSTOM:"user_event"},tpfstat.prototype.GenderType={UNKNOWN:0,MALE:1,FEMALE:2},tpfstat.prototype.LoginType={USER_LOGIN:0,USER_LOGOUT:1,USER_SUB_ACCOUNT_LOGIN:2,USER_SUB_ACCOUNT_LOGOUT:3},tpfstat.prototype.AccountType={USER_ACCOUNT:0,SUB_USER_ACCOUNT:1},tpfstat.prototype.QuestStatus={START:"A",WIN:"S",FAIL:"F"},tpfstat.prototype.FreeType={NOT_FREE:0,SYSTEM_FREE:1},tpfstat.prototype.setUrl=function(t){},tpfstat.prototype.onEvent=function(t,e,n){},tpfstat.prototype.sendAppStart=function(t,e){this._sendGameEvent(this.EventType.APP_START,t,e)},tpfstat.prototype.sendUserRegister=function(t,e){this._sendGameEvent(this.EventType.USER_REGISTER,t,e)},tpfstat.prototype.sendUserLogin=function(t,e){this._sendGameEvent(this.EventType.USER_LOGIN,t,e)},tpfstat.prototype.sendHeartBeat=function(t,e){this._sendGameEvent(this.EventType.HEART_BEAT,t,e)},tpfstat.prototype.sendCoinPay=function(t,e){this._sendGameEvent(this.EventType.COIN_PAY,t,e)},tpfstat.prototype.sendCoinTrade=function(t,e){this._sendGameEvent(this.EventType.COIN_TRADE,t,e)},tpfstat.prototype.sendCoinBroken=function(t,e){this._sendGameEvent(this.EventType.COIN_BROKEN,t,e)},tpfstat.prototype.sendItemTrade=function(t,e){this._sendGameEvent(this.EventType.ITEM_TRADE,t,e)},tpfstat.prototype.sendGameQuest=function(t,e){this._sendGameEvent(this.EventType.GAME_QUEST,t,e)},tpfstat.prototype.sendGameLevel=function(t,e){this._sendGameEvent(this.EventType.GAME_LEVEL,t,e)},tpfstat.prototype.sendAd=function(t,e){this._sendGameEvent(this.EventType.AD,t,e)},tpfstat.prototype.sendUserCustom=function(t,e){this._sendGameEvent(this.EventType.USER_CUSTOM,t,e)},tpfstat.prototype._post=function(t,e,n){this.debug||HttpUtils.http_request("POST",t,e,n,!1,function(t,e){200==t?console.log("Stat: post request success, respBody=",e):console.warn("Stat: post return httpCode="+t+", respBody="+e)})},tpfstat.prototype._sendGameEvent=function(t,e,n){var s,p,o=(s=0,p=4294967295,s=Math.ceil(s),p=Math.floor(p),Math.floor(Math.random()*(p-s))+s),i={appId:this.appId,version:this.version,sversion:this.sversion,source:this.GAME_EVENT_CLIENT_SOURCE,ettime:n,channelId:this.channelId,event:t,context:e},a=JSON.stringify(i),E={"Content-Type":"application/json; charset=utf-8",Authorization:r(this.appId,this.appKey,o+"",n,a)};this._post(this.eventUrl,E,a)}};window.tpfstat=tpfstat;