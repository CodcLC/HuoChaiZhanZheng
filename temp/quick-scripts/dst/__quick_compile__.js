
(function () {
var scripts = [{"deps":{"./assets/scripts/audioNameMgr":20,"./assets/scripts/test":43,"./assets/scripts/Msg":44,"./assets/scripts/uiBase":41,"./assets/scripts/game/FX_E10":22,"./assets/scripts/game/portal":68,"./assets/scripts/game/reviveFx":64,"./assets/scripts/game/skillPool":73,"./assets/scripts/game/ui/testLabel":88,"./assets/scripts/sdk/_qq":95,"./assets/scripts/sdk/_vivo":96,"./assets/syyx_sdk/configs/syyx_sdk_enum":14,"./assets/scripts/sdk/type":97,"./assets/syyx_sdk/model/model":35,"./assets/framework/on/mEvent":19,"./assets/framework/script/ui-base":37,"./assets/scripts/game/animationState":1,"./assets/scripts/sdk/Constant":15,"./assets/syyx_sdk/configs/syyx_sdk_config":113,"./assets/syyx_sdk/3rd/tpfsdk/3rd/md5":120,"./assets/syyx_sdk/3rd/tpfsdk/communication/httputils":121,"./assets/syyx_sdk/3rd/tpfsdk/sdk/tpfclientsdk":122,"./assets/syyx_sdk/3rd/tpfsdk/sdk/tpfstat":118,"./assets/syyx_sdk/3rd/tpfsdk/sdk/tpfconfig":123,"./assets/scripts/sdk/_wechat":4,"./assets/scripts/sdk/_bytedance":30,"./assets/scripts/initLoading":42,"./assets/syyx_sdk/export_sdk":103,"./assets/scripts/UIPrivacy":101,"./assets/scripts/dontDestroy":109,"./assets/scripts/game/E39Laser":48,"./assets/scripts/game/FX_revive":47,"./assets/scripts/game/arrow":70,"./assets/scripts/game/cameraControl":49,"./assets/scripts/game/damageLabel":51,"./assets/scripts/game/damageEffect":46,"./assets/scripts/game/damageTipPool":61,"./assets/scripts/game/dropBloodBottle":57,"./assets/scripts/game/coinDrop":45,"./assets/scripts/game/enemyDieEffect":50,"./assets/scripts/game/enemyBase":66,"./assets/scripts/game/enemyHitCollider":55,"./assets/scripts/game/playerColliderAttack1":62,"./assets/scripts/game/playerCollider":90,"./assets/scripts/game/firePillarCollider":56,"./assets/scripts/game/levelInit":58,"./assets/scripts/game/playerColliderAttack2":60,"./assets/scripts/game/playerColliderAttack3":63,"./assets/scripts/game/playerPandant":65,"./assets/scripts/game/playerColliderJumpHit":67,"./assets/scripts/game/FX_flagThunder":52,"./assets/scripts/game/rock":69,"./assets/scripts/game/playerSpawn":59,"./assets/scripts/game/shuriken":71,"./assets/scripts/game/spawnEnemy":78,"./assets/scripts/game/swordItem2":75,"./assets/scripts/game/ladyBugFx":54,"./assets/scripts/game/swordItem":72,"./assets/scripts/game/swordRain":77,"./assets/scripts/game/thunderBall_burst":80,"./assets/scripts/game/swordSmoke":76,"./assets/scripts/game/thunder_chase":111,"./assets/scripts/game/thunder_burstParent":79,"./assets/scripts/game/thunder_jolt":85,"./assets/scripts/main/choseLevelPanel":91,"./assets/scripts/main/upgradePanel":93,"./assets/scripts/sdk/_oppo":92,"./assets/framework/on/mEventMgr":102,"./assets/syyx_sdk/utils/syyx_api":100,"./assets/scripts/game/E1controller":108,"./assets/scripts/game/swordRainCollider":112,"./assets/scripts/game/E18controller":105,"./assets/syyx_sdk/controller/syyx_cc_ui_manager":99,"./assets/scripts/game/E2controller":110,"./assets/scripts/game/enemySpawn":9,"./assets/scripts/game/ui/buffPopup":82,"./assets/scripts/game/ui/losePanel":81,"./assets/scripts/game/GameManager":8,"./assets/scripts/game/ui/pausePanel":84,"./assets/scripts/game/ui/playerHp":83,"./assets/scripts/game/ui/playerControlEvent":87,"./assets/scripts/game/ui/winPanel":86,"./assets/scripts/main/audioManager":3,"./assets/scripts/main/levelItem":10,"./assets/scripts/game/ui/Joystick":89,"./assets/scripts/main/mainMenu":11,"./assets/scripts/main/UiSign":13,"./assets/syyx_sdk/controller/ad/ad_block":34,"./assets/syyx_sdk/controller/ctr_test/syyx_ctr_manager":36,"./assets/syyx_sdk/utils/syyx_sdk_utils":6,"./assets/framework/script/ui-manager":116,"./assets/syyx_sdk/syyx_ui/ad/syyx_ui_native_icon":38,"./assets/syyx_sdk/syyx_ui/ctr_test/syyx_ui_ctr_item":107,"./assets/syyx_sdk/syyx_ui/ad/syyx_ui_inner_interstitial":104,"./assets/scripts/caijiTools":39,"./assets/scripts/sdk/ad":26,"./assets/syyx_sdk/syyx_ui/ad/syyx_ui_toast":106,"./assets/scripts/game/E20controller":17,"./assets/scripts/game/E29controller":18,"./assets/scripts/game/Events":21,"./assets/scripts/game/bigSquidController":23,"./assets/scripts/game/enemyAnimation":24,"./assets/scripts/game/ladyBug":25,"./assets/scripts/game/miniBossFlag":27,"./assets/scripts/game/shaderController":28,"./assets/scripts/game/spiderlingController":29,"./assets/scripts/game/ui/bossHp":2,"./assets/scripts/game/ui/uiManager":12,"./assets/syyx_sdk/syyx_sdk_api":94,"./assets/syyx_sdk/controller/ad/ad_native_icon":114,"./assets/scripts/sdk/data":31,"./assets/syyx_sdk/controller/ad/ad_native_inner_interstitial":115,"./assets/syyx_sdk/controller/ad/ad_banner":5,"./assets/syyx_sdk/syyx_ui/ad/syyx_ui_interstitial":117,"./assets/syyx_sdk/syyx_ui/ctr_test/syyx_ui_ctr":7,"./assets/scripts/game/E39controller":40,"./assets/scripts/game/miniBossController":53,"./assets/scripts/game/E10controller":74,"./assets/syyx_sdk/controller/ad/ad_native_interstitial":32,"./assets/syyx_sdk/controller/ad/ad_oppo_banner":33,"./assets/syyx_sdk/syyx_ui/ad/syyx_ui_banner":16,"./assets/syyx_sdk/controller/ad/syyx_adv_manager":98,"./assets/scripts/game/playerController":119,"./assets/syyx_sdk/controller/syyx_manager":124},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/animationState.js"},{"deps":{"../../caijiTools":39,"../../sdk/data":31,"../enemyBase":66},"path":"preview-scripts/assets/scripts/game/ui/bossHp.js"},{"deps":{"../audioNameMgr":20,"../sdk/data":31,"../caijiTools":39},"path":"preview-scripts/assets/scripts/main/audioManager.js"},{"deps":{},"path":"preview-scripts/assets/scripts/sdk/_wechat.js"},{"deps":{"./../../configs/syyx_sdk_enum":14,"../syyx_manager":124,"../../utils/syyx_sdk_utils":6,"./ad_oppo_banner":33,"../../configs/syyx_sdk_config":113,"./syyx_adv_manager":98},"path":"preview-scripts/assets/syyx_sdk/controller/ad/ad_banner.js"},{"deps":{"../configs/syyx_sdk_config":113},"path":"preview-scripts/assets/syyx_sdk/utils/syyx_sdk_utils.js"},{"deps":{"../../utils/syyx_sdk_utils":6,"../../controller/ctr_test/syyx_ctr_manager":36,"./syyx_ui_ctr_item":107,"../../syyx_sdk_api":94},"path":"preview-scripts/assets/syyx_sdk/syyx_ui/ctr_test/syyx_ui_ctr.js"},{"deps":{"../main/audioManager":3,"../caijiTools":39,"../sdk/ad":26,"./damageTipPool":61,"../sdk/data":31,"./ui/uiManager":12,"./Events":21,"./coinDrop":45},"path":"preview-scripts/assets/scripts/game/GameManager.js"},{"deps":{"../caijiTools":39,"../sdk/data":31,"./spawnEnemy":78,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/enemySpawn.js"},{"deps":{"../sdk/data":31,"../caijiTools":39,"./mainMenu":11},"path":"preview-scripts/assets/scripts/main/levelItem.js"},{"deps":{"../../syyx_sdk/syyx_sdk_api":94,"../UIPrivacy":101,"../../syyx_sdk/export_sdk":103,"../caijiTools":39,"../audioNameMgr":20,"../Msg":44,"../sdk/ad":26,"../sdk/data":31,"../uiBase":41,"./audioManager":3,"./UiSign":13},"path":"preview-scripts/assets/scripts/main/mainMenu.js"},{"deps":{"../../uiBase":41,"../../caijiTools":39,"../GameManager":8,"./playerHp":83,"./bossHp":2},"path":"preview-scripts/assets/scripts/game/ui/uiManager.js"},{"deps":{"../../syyx_sdk/export_sdk":103,"../Msg":44,"../sdk/data":31,"../sdk/ad":26},"path":"preview-scripts/assets/scripts/main/UiSign.js"},{"deps":{},"path":"preview-scripts/assets/syyx_sdk/configs/syyx_sdk_enum.js"},{"deps":{},"path":"preview-scripts/assets/scripts/sdk/Constant.js"},{"deps":{"../../configs/syyx_sdk_enum":14,"../../controller/ad/syyx_adv_manager":98,"../../controller/syyx_manager":124,"../../configs/syyx_sdk_config":113,"../../syyx_sdk_api":94,"../../utils/syyx_sdk_utils":6,"../../controller/ad/ad_banner":5},"path":"preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_banner.js"},{"deps":{"../audioNameMgr":20,"../caijiTools":39,"./animationState":1,"./enemyAnimation":24,"../main/audioManager":3,"./enemyBase":66,"./enemyHitCollider":55,"./firePillarCollider":56,"./Events":21,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/E20controller.js"},{"deps":{"../main/audioManager":3,"../audioNameMgr":20,"./animationState":1,"./enemyAnimation":24,"./enemyBase":66,"./Events":21,"./enemyHitCollider":55,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/E29controller.js"},{"deps":{},"path":"preview-scripts/assets/framework/on/mEvent.js"},{"deps":{},"path":"preview-scripts/assets/scripts/audioNameMgr.js"},{"deps":{"./arrow":70,"../sdk/data":31,"./cameraControl":49,"./damageLabel":51,"../caijiTools":39,"./GameManager":8,"./damageTipPool":61,"./spawnEnemy":78,"./enemyBase":66},"path":"preview-scripts/assets/scripts/game/Events.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/FX_E10.js"},{"deps":{"../caijiTools":39,"../audioNameMgr":20,"./animationState":1,"./enemyAnimation":24,"../main/audioManager":3,"./enemyBase":66,"./enemyHitCollider":55,"./Events":21,"./GameManager":8,"./ladyBugFx":54},"path":"preview-scripts/assets/scripts/game/bigSquidController.js"},{"deps":{"./animationState":1},"path":"preview-scripts/assets/scripts/game/enemyAnimation.js"},{"deps":{"../caijiTools":39,"./animationState":1,"../audioNameMgr":20,"./enemyAnimation":24,"./Events":21,"../main/audioManager":3,"./enemyBase":66,"./GameManager":8,"./ladyBugFx":54},"path":"preview-scripts/assets/scripts/game/ladyBug.js"},{"deps":{"./_bytedance":30,"./_qq":95,"./_wechat":4,"./_vivo":96,"./_oppo":92},"path":"preview-scripts/assets/scripts/sdk/ad.js"},{"deps":{"../audioNameMgr":20,"./enemyAnimation":24,"./animationState":1,"../main/audioManager":3,"../caijiTools":39,"./enemyHitCollider":55,"./enemyBase":66,"./Events":21,"./FX_flagThunder":52,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/miniBossFlag.js"},{"deps":{"./animationState":1,"../caijiTools":39,"./enemyHitCollider":55,"./Events":21,"./enemyAnimation":24,"./enemyBase":66,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/shaderController.js"},{"deps":{"../caijiTools":39,"../audioNameMgr":20,"./animationState":1,"./enemyBase":66,"../main/audioManager":3,"./enemyAnimation":24,"./enemyHitCollider":55,"./Events":21,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/spiderlingController.js"},{"deps":{},"path":"preview-scripts/assets/scripts/sdk/_bytedance.js"},{"deps":{"./Constant":15},"path":"preview-scripts/assets/scripts/sdk/data.js"},{"deps":{"../../configs/syyx_sdk_enum":14,"../../model/model":35,"../../utils/syyx_sdk_utils":6,"../../configs/syyx_sdk_config":113,"./ad_banner":5,"../../syyx_sdk_api":94,"../syyx_manager":124,"./syyx_adv_manager":98},"path":"preview-scripts/assets/syyx_sdk/controller/ad/ad_native_interstitial.js"},{"deps":{"../../configs/syyx_sdk_config":113,"../../configs/syyx_sdk_enum":14,"../../model/model":35,"../../utils/syyx_sdk_utils":6,"../syyx_manager":124,"./ad_banner":5,"./syyx_adv_manager":98},"path":"preview-scripts/assets/syyx_sdk/controller/ad/ad_oppo_banner.js"},{"deps":{"../syyx_manager":124,"../../configs/syyx_sdk_config":113,"./syyx_adv_manager":98,"../../utils/syyx_sdk_utils":6},"path":"preview-scripts/assets/syyx_sdk/controller/ad/ad_block.js"},{"deps":{},"path":"preview-scripts/assets/syyx_sdk/model/model.js"},{"deps":{"../../model/model":35,"../syyx_manager":124,"../../configs/syyx_sdk_config":113},"path":"preview-scripts/assets/syyx_sdk/controller/ctr_test/syyx_ctr_manager.js"},{"deps":{},"path":"preview-scripts/assets/framework/script/ui-base.js"},{"deps":{"../../controller/syyx_manager":124,"./../../configs/syyx_sdk_enum":14,"../../syyx_sdk_api":94,"../../configs/syyx_sdk_config":113,"../../controller/ad/syyx_adv_manager":98,"../../utils/syyx_sdk_utils":6},"path":"preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_native_icon.js"},{"deps":{"./sdk/data":31,"./main/audioManager":3,"./dontDestroy":109,"./audioNameMgr":20},"path":"preview-scripts/assets/scripts/caijiTools.js"},{"deps":{"../main/audioManager":3,"../audioNameMgr":20,"./E39Laser":48,"./enemyHitCollider":55,"./animationState":1,"./enemyAnimation":24,"./enemyBase":66,"../caijiTools":39,"./Events":21,"./ui/bossHp":2,"./GameManager":8,"./ui/uiManager":12},"path":"preview-scripts/assets/scripts/game/E39controller.js"},{"deps":{},"path":"preview-scripts/assets/scripts/uiBase.js"},{"deps":{"../syyx_sdk/export_sdk":103,"./caijiTools":39,"./sdk/data":31,"./sdk/ad":26,"../syyx_sdk/syyx_sdk_api":94},"path":"preview-scripts/assets/scripts/initLoading.js"},{"deps":{},"path":"preview-scripts/assets/scripts/test.js"},{"deps":{},"path":"preview-scripts/assets/scripts/Msg.js"},{"deps":{"../caijiTools":39,"./GameManager":8,"../sdk/data":31},"path":"preview-scripts/assets/scripts/game/coinDrop.js"},{"deps":{"./damageTipPool":61,"../caijiTools":39},"path":"preview-scripts/assets/scripts/game/damageEffect.js"},{"deps":{"../caijiTools":39},"path":"preview-scripts/assets/scripts/game/FX_revive.js"},{"deps":{"./E39controller":40,"./enemyHitCollider":55},"path":"preview-scripts/assets/scripts/game/E39Laser.js"},{"deps":{"./GameManager":8},"path":"preview-scripts/assets/scripts/game/cameraControl.js"},{"deps":{"../caijiTools":39},"path":"preview-scripts/assets/scripts/game/enemyDieEffect.js"},{"deps":{"./damageTipPool":61},"path":"preview-scripts/assets/scripts/game/damageLabel.js"},{"deps":{"./enemyHitCollider":55},"path":"preview-scripts/assets/scripts/game/FX_flagThunder.js"},{"deps":{"../audioNameMgr":20,"../caijiTools":39,"./enemyAnimation":24,"./E39Laser":48,"../main/audioManager":3,"./enemyBase":66,"./animationState":1,"./thunder_chase":111,"./GameManager":8,"./enemyHitCollider":55,"./thunder_jolt":85,"./Events":21,"./ui/bossHp":2,"./ui/uiManager":12},"path":"preview-scripts/assets/scripts/game/miniBossController.js"},{"deps":{"../caijiTools":39,"./playerController":119,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/ladyBugFx.js"},{"deps":{"./ui/bossHp":2,"./animationState":1,"./playerController":119},"path":"preview-scripts/assets/scripts/game/enemyHitCollider.js"},{"deps":{"../main/audioManager":3,"./enemyHitCollider":55,"../audioNameMgr":20},"path":"preview-scripts/assets/scripts/game/firePillarCollider.js"},{"deps":{"./ui/playerHp":83,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/dropBloodBottle.js"},{"deps":{"./cameraControl":49},"path":"preview-scripts/assets/scripts/game/levelInit.js"},{"deps":{"../caijiTools":39,"./GameManager":8,"./playerController":119},"path":"preview-scripts/assets/scripts/game/playerSpawn.js"},{"deps":{"../audioNameMgr":20,"./animationState":1,"../main/audioManager":3},"path":"preview-scripts/assets/scripts/game/playerColliderAttack2.js"},{"deps":{"../caijiTools":39},"path":"preview-scripts/assets/scripts/game/damageTipPool.js"},{"deps":{"../audioNameMgr":20,"./animationState":1,"../main/audioManager":3},"path":"preview-scripts/assets/scripts/game/playerColliderAttack1.js"},{"deps":{"../audioNameMgr":20,"./animationState":1,"./ui/playerHp":83,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/playerColliderAttack3.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/reviveFx.js"},{"deps":{"./playerController":119},"path":"preview-scripts/assets/scripts/game/playerPandant.js"},{"deps":{"../main/audioManager":3,"../sdk/data":31,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/enemyBase.js"},{"deps":{"../audioNameMgr":20,"./animationState":1,"./GameManager":8,"./ui/playerHp":83},"path":"preview-scripts/assets/scripts/game/playerColliderJumpHit.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/portal.js"},{"deps":{"./skillPool":73,"../caijiTools":39},"path":"preview-scripts/assets/scripts/game/rock.js"},{"deps":{"./playerController":119,"../caijiTools":39},"path":"preview-scripts/assets/scripts/game/arrow.js"},{"deps":{"../audioNameMgr":20,"./animationState":1,"./GameManager":8,"./ui/playerHp":83},"path":"preview-scripts/assets/scripts/game/shuriken.js"},{"deps":{"../caijiTools":39,"./rock":69,"./swordSmoke":76,"./skillPool":73},"path":"preview-scripts/assets/scripts/game/swordItem.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/skillPool.js"},{"deps":{"../audioNameMgr":20,"../caijiTools":39,"./animationState":1,"./enemyAnimation":24,"./enemyBase":66,"../main/audioManager":3,"./enemyHitCollider":55,"./GameManager":8,"./Events":21,"./ui/bossHp":2,"./ui/uiManager":12},"path":"preview-scripts/assets/scripts/game/E10controller.js"},{"deps":{"../caijiTools":39,"./skillPool":73},"path":"preview-scripts/assets/scripts/game/swordItem2.js"},{"deps":{"../caijiTools":39,"./skillPool":73},"path":"preview-scripts/assets/scripts/game/swordSmoke.js"},{"deps":{"../caijiTools":39,"./swordItem":72,"./rock":69,"./skillPool":73,"./swordItem2":75,"./swordSmoke":76},"path":"preview-scripts/assets/scripts/game/swordRain.js"},{"deps":{"../audioNameMgr":20,"../main/audioManager":3,"./Events":21},"path":"preview-scripts/assets/scripts/game/spawnEnemy.js"},{"deps":{"./skillPool":73,"../main/audioManager":3,"../audioNameMgr":20},"path":"preview-scripts/assets/scripts/game/thunder_burstParent.js"},{"deps":{"../sdk/data":31,"./enemyBase":66,"./enemyHitCollider":55,"./skillPool":73,"./ui/bossHp":2},"path":"preview-scripts/assets/scripts/game/thunderBall_burst.js"},{"deps":{"../../../syyx_sdk/export_sdk":103,"../../sdk/ad":26,"../../uiBase":41,"../GameManager":8},"path":"preview-scripts/assets/scripts/game/ui/losePanel.js"},{"deps":{"../../../syyx_sdk/export_sdk":103,"../../sdk/ad":26,"../../uiBase":41,"./uiManager":12},"path":"preview-scripts/assets/scripts/game/ui/buffPopup.js"},{"deps":{"../../sdk/data":31,"../Events":21,"./uiManager":12,"../GameManager":8},"path":"preview-scripts/assets/scripts/game/ui/playerHp.js"},{"deps":{"../../uiBase":41},"path":"preview-scripts/assets/scripts/game/ui/pausePanel.js"},{"deps":{"../audioNameMgr":20,"../main/audioManager":3,"./GameManager":8,"./enemyHitCollider":55,"./cameraControl":49},"path":"preview-scripts/assets/scripts/game/thunder_jolt.js"},{"deps":{"../../sdk/ad":26,"../../sdk/data":31,"../../uiBase":41,"../../../syyx_sdk/export_sdk":103},"path":"preview-scripts/assets/scripts/game/ui/winPanel.js"},{"deps":{"../GameManager":8},"path":"preview-scripts/assets/scripts/game/ui/playerControlEvent.js"},{"deps":{},"path":"preview-scripts/assets/scripts/game/ui/testLabel.js"},{"deps":{"../GameManager":8},"path":"preview-scripts/assets/scripts/game/ui/Joystick.js"},{"deps":{"./playerController":119},"path":"preview-scripts/assets/scripts/game/playerCollider.js"},{"deps":{"../uiBase":41},"path":"preview-scripts/assets/scripts/main/choseLevelPanel.js"},{"deps":{"../../syyx_sdk/export_sdk":103},"path":"preview-scripts/assets/scripts/sdk/_oppo.js"},{"deps":{"../sdk/ad":26,"../uiBase":41,"../sdk/data":31},"path":"preview-scripts/assets/scripts/main/upgradePanel.js"},{"deps":{"./configs/syyx_sdk_config":113,"./controller/ad/syyx_adv_manager":98,"./controller/syyx_manager":124,"./model/model":35,"./controller/ad/ad_native_interstitial":32},"path":"preview-scripts/assets/syyx_sdk/syyx_sdk_api.js"},{"deps":{},"path":"preview-scripts/assets/scripts/sdk/_qq.js"},{"deps":{},"path":"preview-scripts/assets/scripts/sdk/_vivo.js"},{"deps":{},"path":"preview-scripts/assets/scripts/sdk/type.js"},{"deps":{"../../configs/syyx_sdk_enum":14,"./ad_oppo_banner":33,"./ad_banner":5,"../syyx_manager":124,"../../utils/syyx_sdk_utils":6,"./ad_native_interstitial":32,"./ad_block":34,"../../configs/syyx_sdk_config":113,"./ad_native_inner_interstitial":115,"./ad_native_icon":114},"path":"preview-scripts/assets/syyx_sdk/controller/ad/syyx_adv_manager.js"},{"deps":{"../model/model":35,"../configs/syyx_sdk_enum":14,"./syyx_manager":124,"../utils/syyx_sdk_utils":6,"../syyx_ui/ad/syyx_ui_banner":16,"../syyx_ui/ad/syyx_ui_native_icon":38,"../syyx_ui/ad/syyx_ui_interstitial":117,"../syyx_ui/ad/syyx_ui_toast":106,"../syyx_ui/ad/syyx_ui_inner_interstitial":104,"../syyx_ui/ctr_test/syyx_ui_ctr":7},"path":"preview-scripts/assets/syyx_sdk/controller/syyx_cc_ui_manager.js"},{"deps":{"../configs/syyx_sdk_config":113},"path":"preview-scripts/assets/syyx_sdk/utils/syyx_api.js"},{"deps":{"./sdk/data":31},"path":"preview-scripts/assets/scripts/UIPrivacy.js"},{"deps":{"./mEvent":19},"path":"preview-scripts/assets/framework/on/mEventMgr.js"},{"deps":{"../syyx_sdk/syyx_sdk_api":94},"path":"preview-scripts/assets/syyx_sdk/export_sdk.js"},{"deps":{"../../configs/syyx_sdk_config":113,"../../configs/syyx_sdk_enum":14,"../../controller/ad/ad_native_inner_interstitial":115,"../../utils/syyx_sdk_utils":6,"../../controller/ad/syyx_adv_manager":98,"../../controller/syyx_manager":124,"../../syyx_sdk_api":94},"path":"preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_inner_interstitial.js"},{"deps":{"../audioNameMgr":20,"../main/audioManager":3,"./enemyBase":66,"./Events":21,"./animationState":1,"./enemyAnimation":24,"./GameManager":8,"./enemyHitCollider":55},"path":"preview-scripts/assets/scripts/game/E18controller.js"},{"deps":{"../../utils/syyx_sdk_utils":6},"path":"preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_toast.js"},{"deps":{"../../utils/syyx_sdk_utils":6,"../../configs/syyx_sdk_config":113,"../../controller/syyx_manager":124,"../../controller/ctr_test/syyx_ctr_manager":36,"../../utils/syyx_api":100},"path":"preview-scripts/assets/syyx_sdk/syyx_ui/ctr_test/syyx_ui_ctr_item.js"},{"deps":{"../audioNameMgr":20,"../caijiTools":39,"./animationState":1,"./enemyBase":66,"./enemyAnimation":24,"../main/audioManager":3,"./Events":21,"./enemyHitCollider":55,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/E1controller.js"},{"deps":{"./caijiTools":39,"./sdk/data":31},"path":"preview-scripts/assets/scripts/dontDestroy.js"},{"deps":{"./animationState":1,"./enemyAnimation":24,"./enemyBase":66,"../audioNameMgr":20,"./Events":21,"../main/audioManager":3,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/E2controller.js"},{"deps":{"./enemyHitCollider":55,"./GameManager":8},"path":"preview-scripts/assets/scripts/game/thunder_chase.js"},{"deps":{"../sdk/data":31,"./animationState":1,"./ui/playerHp":83},"path":"preview-scripts/assets/scripts/game/swordRainCollider.js"},{"deps":{},"path":"preview-scripts/assets/syyx_sdk/configs/syyx_sdk_config.js"},{"deps":{"../syyx_manager":124,"../../configs/syyx_sdk_enum":14,"../../utils/syyx_sdk_utils":6,"../../model/model":35,"../../configs/syyx_sdk_config":113,"./syyx_adv_manager":98,"./ad_banner":5},"path":"preview-scripts/assets/syyx_sdk/controller/ad/ad_native_icon.js"},{"deps":{"../../configs/syyx_sdk_config":113,"../../configs/syyx_sdk_enum":14,"../syyx_manager":124,"../../model/model":35,"../../utils/syyx_sdk_utils":6,"./syyx_adv_manager":98},"path":"preview-scripts/assets/syyx_sdk/controller/ad/ad_native_inner_interstitial.js"},{"deps":{"./ui-base":37},"path":"preview-scripts/assets/framework/script/ui-manager.js"},{"deps":{"../../controller/syyx_manager":124,"../../configs/syyx_sdk_enum":14,"../../controller/ad/ad_native_interstitial":32,"../../configs/syyx_sdk_config":113,"../../syyx_sdk_api":94,"../../controller/ad/syyx_adv_manager":98,"../../utils/syyx_sdk_utils":6},"path":"preview-scripts/assets/syyx_sdk/syyx_ui/ad/syyx_ui_interstitial.js"},{"deps":{},"path":"preview-scripts/assets/syyx_sdk/3rd/tpfsdk/sdk/tpfstat.js"},{"deps":{"../audioNameMgr":20,"../caijiTools":39,"../main/audioManager":3,"./Events":21,"./animationState":1,"./GameManager":8,"./playerCollider":90,"./playerColliderAttack1":62,"./playerPandant":65,"./playerColliderAttack2":60,"../sdk/data":31,"./swordRain":77,"./ui/playerControlEvent":87,"./ui/Joystick":89,"./ui/playerHp":83,"./ui/uiManager":12},"path":"preview-scripts/assets/scripts/game/playerController.js"},{"deps":{},"path":"preview-scripts/assets/syyx_sdk/3rd/tpfsdk/3rd/md5.js"},{"deps":{},"path":"preview-scripts/assets/syyx_sdk/3rd/tpfsdk/communication/httputils.js"},{"deps":{},"path":"preview-scripts/assets/syyx_sdk/3rd/tpfsdk/sdk/tpfclientsdk.js"},{"deps":{},"path":"preview-scripts/assets/syyx_sdk/3rd/tpfsdk/sdk/tpfconfig.js"},{"deps":{"../configs/syyx_sdk_config":113,"../model/model":35,"../configs/syyx_sdk_enum":14,"./ad/ad_banner":5,"./ad/syyx_adv_manager":98,"./ctr_test/syyx_ctr_manager":36,"../utils/syyx_sdk_utils":6,"./syyx_cc_ui_manager":99,"../utils/syyx_api":100},"path":"preview-scripts/assets/syyx_sdk/controller/syyx_manager.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    