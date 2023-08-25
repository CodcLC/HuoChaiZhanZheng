// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { caijiTools } from "../caijiTools";
import { data } from "../sdk/data";
import { bundleName } from "../uiBase";
import mainMenu from "./mainMenu";


const {ccclass, property} = cc._decorator;

@ccclass
export default class levelItem extends cc.Component {

    @property(cc.Sprite)
    starSpr:cc.Sprite=null;
    @property(cc.Sprite)
    levelSpr:cc.Sprite=null;
	
	@property(cc.Label)
    levellab:cc.Label=null;
	
    level:number=0;
    // onLoad () {}

    start () {
        this.init();
    }
    init(){
        this.level=Number(this.node.name);
        let isUnlock=data.getCache("levelUnlock")[this.level-1];
        this.node.getComponent(cc.Button).interactable= isUnlock;
        this.node.getChildByName("lock").active=!isUnlock;
        this.updateLevel();
        this.updateStar();
    }
    async updateLevel(){
        // let spr=await caijiTools.loadSpriteFrameBundle(bundleName.mainUi,"choseLevel/level"+this.node.name);
        let spr=await caijiTools.loadSpriteFrame("choseLevel/level"+this.node.name);
        this.levelSpr.getComponent(cc.Sprite).spriteFrame=spr;
		this.levellab.string = this.toChinesNum(this.level)
    }
	
	
	toChinesNum(num) {
      let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      let unit = ['', '十', '百', '千', '万']
      num = parseInt(num)
      let getWan = (temp) => {
        let strArr = temp.toString().split('').reverse()
        let newNum = ''
        let newArr = []
        strArr.forEach((item, index) => {
          newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
        })
        let numArr = []
        newArr.forEach((m, n) => {
          if (m !== '零') numArr.push(n)
        })
        if (newArr.length > 1) {
          newArr.forEach((m, n) => {
            if (newArr[newArr.length - 1] === '零') {
              if (n <= numArr[numArr.length - 1]) {
                newNum += m
              }
            } else {
              newNum += m
            }
          })
        } else {
          newNum = newArr[0]
        }
 
        return newNum
      }
      let overWan = Math.floor(num / 10000)
      let noWan = num % 10000
      // if (noWan.toString().length < 4) {
      //   noWan = '0' + noWan
      // }
      return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
	}

	
	
    async updateStar(){
        let diff=data.getCache("levelStar")[this.level];
        // let spr=await caijiTools.loadSpriteFrameBundle(bundleName.mainUi,"choseLevel/star"+diff);
        let spr=await caijiTools.loadSpriteFrame("choseLevel/star"+diff);
        
        this.starSpr.getComponent(cc.Sprite).spriteFrame=spr;
    }
    chose(event:cc.Event){
        data.updateCache("Base","choseLevel",this.node.name);
        mainMenu.ins.maskAction_go();
    }
}
