
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/playerSpawn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9045fAEbe1Ht5kZtSuD9rSn', 'playerSpawn');
// scripts/game/playerSpawn.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var caijiTools_1 = require("../caijiTools");
var GameManager_1 = require("./GameManager");
var playerController_1 = require("./playerController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var playerSpawn = /** @class */ (function (_super) {
    __extends(playerSpawn, _super);
    function playerSpawn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    playerSpawn.prototype.onLoad = function () {
        GameManager_1.default.instance.playerSpawnM = this;
    };
    playerSpawn.prototype.start = function () {
    };
    playerSpawn.prototype.spawnPlayer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pre, player;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/player")];
                    case 1:
                        pre = _a.sent();
                        player = cc.instantiate(pre);
                        player.setParent(this.node.parent);
                        player.setPosition(this.node.position);
                        player.setSiblingIndex(this.node.getSiblingIndex());
                        GameManager_1.default.instance.player = player;
                        GameManager_1.default.instance.playerController = player.getComponent(playerController_1.default);
                        player.active = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    playerSpawn = __decorate([
        ccclass
    ], playerSpawn);
    return playerSpawn;
}(cc.Component));
exports.default = playerSpawn;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxccGxheWVyU3Bhd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsNENBQTJDO0FBQzNDLDZDQUF3QztBQUN4Qyx1REFBa0Q7QUFFNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFBckQ7O0lBaUJBLENBQUM7SUFmRyw0QkFBTSxHQUFOO1FBQ0kscUJBQVcsQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBQ0QsMkJBQUssR0FBTDtJQUNBLENBQUM7SUFDSyxpQ0FBVyxHQUFqQjs7Ozs7NEJBQ1kscUJBQU0sdUJBQVUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBQTs7d0JBQWpELEdBQUcsR0FBQyxTQUE2Qzt3QkFDakQsTUFBTSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbkMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN2QyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQzt3QkFDcEQscUJBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzt3QkFDckMscUJBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDO3dCQUM1RSxNQUFNLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQzs7Ozs7S0FDdEI7SUFoQmdCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FpQi9CO0lBQUQsa0JBQUM7Q0FqQkQsQUFpQkMsQ0FqQndDLEVBQUUsQ0FBQyxTQUFTLEdBaUJwRDtrQkFqQm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IHsgY2FpamlUb29scyB9IGZyb20gXCIuLi9jYWlqaVRvb2xzXCI7XG5pbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSBcIi4vR2FtZU1hbmFnZXJcIjtcbmltcG9ydCBwbGF5ZXJDb250cm9sbGVyIGZyb20gXCIuL3BsYXllckNvbnRyb2xsZXJcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwbGF5ZXJTcGF3biBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBvbkxvYWQoKXtcbiAgICAgICAgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyU3Bhd25NPXRoaXM7XG4gICAgfVxuICAgIHN0YXJ0KCl7XG4gICAgfVxuICAgIGFzeW5jIHNwYXduUGxheWVyKCl7XG4gICAgICAgIGxldCBwcmU9YXdhaXQgY2FpamlUb29scy5sb2FkUHJlZmFiKFwicHJlZmFicy9wbGF5ZXJcIik7XG4gICAgICAgIGxldCBwbGF5ZXI9Y2MuaW5zdGFudGlhdGUocHJlKTtcbiAgICAgICAgcGxheWVyLnNldFBhcmVudCh0aGlzLm5vZGUucGFyZW50KTtcbiAgICAgICAgcGxheWVyLnNldFBvc2l0aW9uKHRoaXMubm9kZS5wb3NpdGlvbik7XG4gICAgICAgIHBsYXllci5zZXRTaWJsaW5nSW5kZXgodGhpcy5ub2RlLmdldFNpYmxpbmdJbmRleCgpKTtcbiAgICAgICAgR2FtZU1hbmFnZXIuaW5zdGFuY2UucGxheWVyID0gcGxheWVyO1xuICAgICAgICBHYW1lTWFuYWdlci5pbnN0YW5jZS5wbGF5ZXJDb250cm9sbGVyPXBsYXllci5nZXRDb21wb25lbnQocGxheWVyQ29udHJvbGxlcik7XG4gICAgICAgIHBsYXllci5hY3RpdmU9dHJ1ZTtcbiAgICB9XG59XG4iXX0=