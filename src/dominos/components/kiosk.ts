import * as utils from '@dcl/ecs-scene-utils'
import config from "../helpers/config";
import { MENUS } from '../helpers/types';
import { DominosManager } from "./manager";

export class Kiosk {
    
    manager:DominosManager
    parent:Entity

    constructor(manager:DominosManager){
        this.manager = manager
        this.parent = new Entity()
        this.parent = new Entity("kiosk Parent")
        this.parent.addComponent(new Transform({position:new Vector3(33,0,-3), rotation:Quaternion.Euler(0,-90,0)}))
        engine.addEntity(this.parent)

    }

    buildKiosk(){


    let pizza = new Entity()
    pizza.addComponent(config.models.pizzaDisplay)
    pizza.addComponent(new Transform({
    position: new Vector3(0,0,0)
    }))
    pizza.setParent(this.parent)
    pizza.addComponent(new utils.KeepRotatingComponent(Quaternion.Euler(0, 45, 0)))

    // const ground = new Entity()
    // ground.addComponent(config.models.ground)
    // ground.addComponent(new Transform({
    // position: new Vector3(8,0,8)
    // }))
    // engine.addEntity(ground)

    let kiosk = new Entity('kiosk')
    kiosk.addComponent(config.models.kiosk)
    kiosk.addComponent(new Transform({
    position: new Vector3(0,0,0)
    }))

    kiosk.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(1.5,4,1.5),new Vector3(-.9,1,-1.6)),
    {
        onCameraEnter: ()=>{
            if(this.manager.player.dclData.hasConnectedWeb3){//} && this.manager.player.isSlicer){
                if(this.manager.player.isAmerican){
                    if(!this.manager.getOrderStatus()){
                        if(this.manager.player.canDeliver){
                            if(this.manager.player.hasDiscounts){
                                if(this.manager.player.address == ""){
                                    log('need to show address')
                                    this.manager.prompts.addressPrompt.show()
                                    return
                                }
                                if(this.manager.player.currentMenu != MENUS.ORDERED){
                                    log('need to show current menu')
                                    this.manager.menus.showCurrentMenu()
                                }
                
                            }
                            else{
                                this.manager.prompts.notslicer.show()
                            }
                        }
                        else{
                            this.manager.prompts.showCantDeliver("No open stores within 25 miles of your address")
                        }
                    }
                else{
                    this.manager.prompts.showCantDeliver("You already have a pending order...")
                }
                }
                else{
                    this.manager.prompts.americanPrompt.show()
                }
                
        }
        else{
            this.manager.prompts.notWeb3.show()
        }

        },

        onCameraExit:()=>{
            this.manager.prompts.hideAllPrompts()
        },
        enableDebug:false
    }))

    kiosk.setParent(this.parent)

    // await getPlayerInfo()
    // f.isAmerican()
    //await createSocket()
    }
}