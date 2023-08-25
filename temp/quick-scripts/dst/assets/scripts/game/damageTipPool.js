
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/game/damageTipPool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e86e1AR5HlPdqrmQHBKyG3/', 'damageTipPool');
// scripts/game/damageTipPool.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var damageTipPool = /** @class */ (function (_super) {
    __extends(damageTipPool, _super);
    function damageTipPool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labelPre = null;
        _this.effectPre = null;
        _this.damgeLabelPool = new cc.NodePool("damageLabel");
        _this.damageEffectPool = new cc.NodePool("damageEffect");
        return _this;
    }
    damageTipPool_1 = damageTipPool;
    Object.defineProperty(damageTipPool, "instance", {
        get: function () {
            if (damageTipPool_1._instance == null) {
                damageTipPool_1._instance = new damageTipPool_1;
            }
            return damageTipPool_1._instance;
        },
        enumerable: false,
        configurable: true
    });
    damageTipPool.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, i, effect, label;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (damageTipPool_1.instance.damgeLabelPool.size() > 0)
                            return [2 /*return*/];
                        _a = damageTipPool_1.instance;
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/damageLabel")];
                    case 1:
                        _a.labelPre = _c.sent();
                        _b = damageTipPool_1.instance;
                        return [4 /*yield*/, caijiTools_1.caijiTools.loadPrefab("prefabs/damgeEffect")];
                    case 2:
                        _b.effectPre = _c.sent();
                        for (i = 0; i < 15; i++) {
                            effect = cc.instantiate(damageTipPool_1.instance.effectPre);
                            label = cc.instantiate(damageTipPool_1.instance.labelPre);
                            damageTipPool_1.instance.damageEffectPool.put(effect);
                            damageTipPool_1.instance.damgeLabelPool.put(label);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    damageTipPool.prototype.getDamageLabel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lable;
            return __generator(this, function (_a) {
                lable = damageTipPool_1.instance.damgeLabelPool.get();
                if (!lable) {
                    lable = cc.instantiate(damageTipPool_1.instance.labelPre);
                }
                return [2 /*return*/, lable];
            });
        });
    };
    damageTipPool.prototype.recoveryDmgLabel = function (node) {
        damageTipPool_1.instance.damgeLabelPool.put(node);
    };
    damageTipPool.prototype.getDamageEffect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var effect;
            return __generator(this, function (_a) {
                effect = damageTipPool_1.instance.damageEffectPool.get();
                if (!effect) {
                    effect = cc.instantiate(damageTipPool_1.instance.effectPre);
                }
                return [2 /*return*/, effect];
            });
        });
    };
    damageTipPool.prototype.recoveryDmgEffect = function (node) {
        damageTipPool_1.instance.damageEffectPool.put(node);
    };
    var damageTipPool_1;
    damageTipPool._instance = null;
    damageTipPool = damageTipPool_1 = __decorate([
        ccclass
    ], damageTipPool);
    return damageTipPool;
}(cc.Component));
exports.default = damageTipPool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcZ2FtZVxcZGFtYWdlVGlwUG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw0Q0FBMkM7QUFFckMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUE2Q0M7UUEzQ0csY0FBUSxHQUFXLElBQUksQ0FBQztRQUN4QixlQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ3pCLG9CQUFjLEdBQWEsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELHNCQUFnQixHQUFhLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7SUF3Q2pFLENBQUM7c0JBN0NvQixhQUFhO0lBUTlCLHNCQUFrQix5QkFBUTthQUExQjtZQUNJLElBQUcsZUFBYSxDQUFDLFNBQVMsSUFBRSxJQUFJLEVBQUM7Z0JBQzdCLGVBQWEsQ0FBQyxTQUFTLEdBQUMsSUFBSSxlQUFhLENBQUM7YUFDN0M7WUFDRCxPQUFPLGVBQWEsQ0FBQyxTQUFTLENBQUM7UUFDbkMsQ0FBQzs7O09BQUE7SUFDSyw0QkFBSSxHQUFWOzs7Ozs7d0JBQ0ksSUFBRyxlQUFhLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBQyxDQUFDOzRCQUFFLHNCQUFPO3dCQUMxRCxLQUFBLGVBQWEsQ0FBQyxRQUFRLENBQUE7d0JBQVUscUJBQU0sdUJBQVUsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBQTs7d0JBQWxGLEdBQXVCLFFBQVEsR0FBQyxTQUFrRCxDQUFDO3dCQUNuRixLQUFBLGVBQWEsQ0FBQyxRQUFRLENBQUE7d0JBQVcscUJBQU0sdUJBQVUsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsRUFBQTs7d0JBQW5GLEdBQXVCLFNBQVMsR0FBQyxTQUFrRCxDQUFDO3dCQUNwRixLQUFRLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUUsRUFBQzs0QkFDYixNQUFNLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxlQUFhLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUN4RCxLQUFLLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxlQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUMxRCxlQUFhLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDcEQsZUFBYSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUNwRDs7Ozs7S0FDSjtJQUNLLHNDQUFjLEdBQXBCOzs7O2dCQUNRLEtBQUssR0FBRyxlQUFhLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDeEQsSUFBRyxDQUFDLEtBQUssRUFBQztvQkFDTixLQUFLLEdBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxlQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN6RDtnQkFDRCxzQkFBTyxLQUFLLEVBQUM7OztLQUNoQjtJQUNELHdDQUFnQixHQUFoQixVQUFpQixJQUFZO1FBQ3pCLGVBQWEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0ssdUNBQWUsR0FBckI7Ozs7Z0JBQ1EsTUFBTSxHQUFHLGVBQWEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzNELElBQUcsQ0FBQyxNQUFNLEVBQUM7b0JBQ1AsTUFBTSxHQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsZUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDM0Q7Z0JBQ0Qsc0JBQU8sTUFBTSxFQUFDOzs7S0FDakI7SUFDRCx5Q0FBaUIsR0FBakIsVUFBa0IsSUFBWTtRQUMxQixlQUFhLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDOztJQXJDYyx1QkFBUyxHQUFlLElBQUksQ0FBQztJQVAzQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNkNqQztJQUFELG9CQUFDO0NBN0NELEFBNkNDLENBN0MwQyxFQUFFLENBQUMsU0FBUyxHQTZDdEQ7a0JBN0NvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IGNhaWppVG9vbHMgfSBmcm9tIFwiLi4vY2FpamlUb29sc1wiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRhbWFnZVRpcFBvb2wgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgbGFiZWxQcmU6Y2MuUHJlZmFiPW51bGw7XG4gICAgZWZmZWN0UHJlOmNjLlByZWZhYj1udWxsO1xuICAgIGRhbWdlTGFiZWxQb29sOmNjLk5vZGVQb29sPW5ldyBjYy5Ob2RlUG9vbChcImRhbWFnZUxhYmVsXCIpO1xuICAgIGRhbWFnZUVmZmVjdFBvb2w6Y2MuTm9kZVBvb2w9bmV3IGNjLk5vZGVQb29sKFwiZGFtYWdlRWZmZWN0XCIpO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOmRhbWFnZVRpcFBvb2w9bnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIGdldCBpbnN0YW5jZSgpe1xuICAgICAgICBpZihkYW1hZ2VUaXBQb29sLl9pbnN0YW5jZT09bnVsbCl7XG4gICAgICAgICAgICBkYW1hZ2VUaXBQb29sLl9pbnN0YW5jZT1uZXcgZGFtYWdlVGlwUG9vbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGFtYWdlVGlwUG9vbC5faW5zdGFuY2U7XG4gICAgfVxuICAgIGFzeW5jIGluaXQoKXtcbiAgICAgICAgaWYoZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5kYW1nZUxhYmVsUG9vbC5zaXplKCk+MCkgcmV0dXJuO1xuICAgICAgICBkYW1hZ2VUaXBQb29sLmluc3RhbmNlLmxhYmVsUHJlPWF3YWl0IGNhaWppVG9vbHMubG9hZFByZWZhYihcInByZWZhYnMvZGFtYWdlTGFiZWxcIik7XG4gICAgICAgIGRhbWFnZVRpcFBvb2wuaW5zdGFuY2UuZWZmZWN0UHJlPWF3YWl0IGNhaWppVG9vbHMubG9hZFByZWZhYihcInByZWZhYnMvZGFtZ2VFZmZlY3RcIik7XG4gICAgICAgIGZvcihsZXQgaT0wO2k8MTU7aSsrKXtcbiAgICAgICAgICAgIGxldCBlZmZlY3Q9Y2MuaW5zdGFudGlhdGUoZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5lZmZlY3RQcmUpO1xuICAgICAgICAgICAgbGV0IGxhYmVsPWNjLmluc3RhbnRpYXRlKGRhbWFnZVRpcFBvb2wuaW5zdGFuY2UubGFiZWxQcmUpO1xuICAgICAgICAgICAgZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5kYW1hZ2VFZmZlY3RQb29sLnB1dChlZmZlY3QpO1xuICAgICAgICAgICAgZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5kYW1nZUxhYmVsUG9vbC5wdXQobGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGdldERhbWFnZUxhYmVsKCl7XG4gICAgICAgIGxldCBsYWJsZSA9IGRhbWFnZVRpcFBvb2wuaW5zdGFuY2UuZGFtZ2VMYWJlbFBvb2wuZ2V0KCk7XG4gICAgICAgIGlmKCFsYWJsZSl7XG4gICAgICAgICAgICBsYWJsZT1jYy5pbnN0YW50aWF0ZShkYW1hZ2VUaXBQb29sLmluc3RhbmNlLmxhYmVsUHJlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFibGU7XG4gICAgfVxuICAgIHJlY292ZXJ5RG1nTGFiZWwobm9kZTpjYy5Ob2RlKXtcbiAgICAgICAgZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5kYW1nZUxhYmVsUG9vbC5wdXQobm9kZSk7XG4gICAgfVxuICAgIGFzeW5jIGdldERhbWFnZUVmZmVjdCgpe1xuICAgICAgICBsZXQgZWZmZWN0ID0gZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5kYW1hZ2VFZmZlY3RQb29sLmdldCgpO1xuICAgICAgICBpZighZWZmZWN0KXtcbiAgICAgICAgICAgIGVmZmVjdD1jYy5pbnN0YW50aWF0ZShkYW1hZ2VUaXBQb29sLmluc3RhbmNlLmVmZmVjdFByZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVmZmVjdDtcbiAgICB9XG4gICAgcmVjb3ZlcnlEbWdFZmZlY3Qobm9kZTpjYy5Ob2RlKXtcbiAgICAgICAgZGFtYWdlVGlwUG9vbC5pbnN0YW5jZS5kYW1hZ2VFZmZlY3RQb29sLnB1dChub2RlKTtcbiAgICB9XG59XG4iXX0=