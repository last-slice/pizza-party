import * as utils from '@dcl/ecs-scene-utils'
import * as crypto from '@dcl/crypto-scene-utils'
import { getUserData } from '@decentraland/Identity'
import { Player } from './components/player'
import { DominosManager } from './components/manager'
import { ValidationSystem } from './systems/ValidationSystem'
import { UIManager } from './components/uiManager'
import { createParty } from 'src/pizzaparty/index'

export let manager:DominosManager

async function init(){

  let userData = await getUserData()
  log(userData)

  let hasToken = await crypto.nft.checkTokens('0xf23e1aa97de9ca4fb76d2fa3fafcf4414b2afed0')
  log('is a slicer', hasToken)

  let player = new Player(userData, hasToken)

  let ui = new UIManager()

  manager = new DominosManager(player, ui)
  manager.init()

  //new ValidationSystem(player, manager)


}
init()