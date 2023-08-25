
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Msg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '41c29stRcNAHIP7/d1825in', 'Msg');
// scripts/Msg.ts

"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Msg = /** @class */ (function (_super) {
    __extends(Msg, _super);
    function Msg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Msg_1 = Msg;
    Msg.tweeNode = function (node) {
        cc.tween(node)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
    };
    Msg.Show = function (msg) {
        {
            if (Msg_1.isShow) {
                return;
            }
            Msg_1.isShow = true;
            Msg_1.okbtn_callback = null;
            cc.loader.loadRes(this.tipsPanelPrefab, cc.Prefab, function (error, resource) {
                Msg_1.isShow = false;
                if (error) {
                    cc.error(error);
                    return;
                }
                if (resource) {
                    var node_1 = cc.instantiate(resource);
                    if (node_1) {
                        cc.find("Canvas").addChild(node_1);
                        node_1.active = true;
                        node_1.position = cc.Vec3.ZERO;
                        var label = cc.find("Label", node_1).getComponent(cc.Label);
                        label.string = msg;
                        node_1.scale = 0;
                        Msg_1.tweeNode(node_1);
                        label.scheduleOnce(function () {
                            node_1.destroy();
                        }, 1.5);
                    }
                }
            });
        }
    };
    var Msg_1;
    Msg.tipsPanelPrefab = "prefabs/ui/TipsPanel";
    Msg.isShow = false;
    Msg.okbtn_callback = null;
    Msg = Msg_1 = __decorate([
        ccclass
    ], Msg);
    return Msg;
}(cc.Component));
exports.default = Msg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcTXNnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWlDLHVCQUFZO0lBQTdDOztJQStDQSxDQUFDO1lBL0NvQixHQUFHO0lBR04sWUFBUSxHQUF0QixVQUF1QixJQUFhO1FBQ2hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ1QsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQzthQUM1QyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBS2EsUUFBSSxHQUFsQixVQUFtQixHQUFVO1FBQzdCO1lBQ1EsSUFBSSxLQUFHLENBQUMsTUFBTSxFQUFDO2dCQUNYLE9BQU07YUFDVDtZQUNELEtBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1lBQ2pCLEtBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFBO1lBQ3pCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQVcsRUFBRSxRQUFrQjtnQkFDL0UsS0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7Z0JBRWxCLElBQUksS0FBSyxFQUFFO29CQUNQLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQ2YsT0FBTTtpQkFDVDtnQkFDRCxJQUFJLFFBQVEsRUFBRTtvQkFDVixJQUFJLE1BQUksR0FBWSxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLE1BQUksRUFBRTt3QkFDTixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFJLENBQUMsQ0FBQzt3QkFDakMsTUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ25CLE1BQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBRTdCLElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3BFLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO3dCQUVuQixNQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDZixLQUFHLENBQUMsUUFBUSxDQUFDLE1BQUksQ0FBQyxDQUFDO3dCQUVuQixLQUFLLENBQUMsWUFBWSxDQUFDOzRCQUNmLE1BQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3FCQUNYO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7O0lBN0NjLG1CQUFlLEdBQVcsc0JBQXNCLENBQUM7SUFRekQsVUFBTSxHQUFXLEtBQUssQ0FBQTtJQUN0QixrQkFBYyxHQUFhLElBQUksQ0FBQTtJQVZyQixHQUFHO1FBRHZCLE9BQU87T0FDYSxHQUFHLENBK0N2QjtJQUFELFVBQUM7Q0EvQ0QsQUErQ0MsQ0EvQ2dDLEVBQUUsQ0FBQyxTQUFTLEdBK0M1QztrQkEvQ29CLEdBQUciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1zZyBleHRlbmRzIGNjLkNvbXBvbmVudHtcbiAgICBwcml2YXRlIHN0YXRpYyB0aXBzUGFuZWxQcmVmYWI6IHN0cmluZyA9IFwicHJlZmFicy91aS9UaXBzUGFuZWxcIjtcblxuICAgIHB1YmxpYyBzdGF0aWMgdHdlZU5vZGUobm9kZTogY2MuTm9kZSkge1xuICAgICAgICBjYy50d2Vlbihub2RlKVxuICAgICAgICAgICAgLnRvKDAuMywgeyBzY2FsZTogMSB9LCB7IGVhc2luZzogXCJiYWNrT3V0XCIgfSlcbiAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1Nob3c6Ym9vbGVhbiA9IGZhbHNlXG4gICAgc3RhdGljIG9rYnRuX2NhbGxiYWNrOkZ1bmN0aW9uICA9IG51bGxcbiAgICAgICAgICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgU2hvdyhtc2c6c3RyaW5nKSB7XG4gICAge1xuICAgICAgICAgICAgaWYgKE1zZy5pc1Nob3cpe1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTXNnLmlzU2hvdyA9IHRydWVcbiAgICAgICAgICAgIE1zZy5va2J0bl9jYWxsYmFjayA9IG51bGxcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHRoaXMudGlwc1BhbmVsUHJlZmFiLCBjYy5QcmVmYWIsIChlcnJvcjpFcnJvciwgcmVzb3VyY2U6Y2MuUHJlZmFiKSA9PiB7XG4gICAgICAgICAgICAgICAgTXNnLmlzU2hvdyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocmVzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZmluZChcIkNhbnZhc1wiKS5hZGRDaGlsZChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy5WZWMzLlpFUk87XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsYWJlbDogY2MuTGFiZWwgPSBjYy5maW5kKFwiTGFiZWxcIiwgbm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IG1zZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zY2FsZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBNc2cudHdlZU5vZGUobm9kZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxLjUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=