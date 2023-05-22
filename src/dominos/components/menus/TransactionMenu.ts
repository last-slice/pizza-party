import { MENUS } from 'src/dominos/helpers/types'
import { DominosManager } from '../manager'
import {Menu} from './Menu'
export class TransactionMenu extends Menu{

    manager:DominosManager
    menuOptions:any[] = []
    toppings:Entity
    

    constructor(menus:any[], manager:DominosManager){
        super(manager)
        this.manager = manager
        engine.addEntity(this)
        this.menuOptions = menus

        this.headerText.getComponent(TextShape).value = ""
        this.subHeading.getComponent(TextShape).value = "Validating Order..."

        this.image.getComponent(PlaneShape).visible = false

        this.toppings = new Entity()
        this.toppings.addComponent(new TextShape(""))
        this.toppings.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(0,-.1,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.toppings.getComponent(TextShape).fontSize = .5
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.toppings.setParent(this)
        this.toppings.addComponent(new OnPointerDown(()=>{
            log('clicked text')
        }))

        this.prev.getComponent(PlaneShape).visible = false
        this.next.getComponent(PlaneShape).visible = false
        this.prevText.getComponent(TextShape).visible = false
        this.nextText.getComponent(TextShape).visible = false

        this.prev.addComponentOrReplace(new OnPointerDown((e)=>{
            this.hideMenu()
            this.manager.menus.toppings.show()
        }))

        this.next.addComponentOrReplace(new OnPointerDown((e)=>{
            this.hideMenu()
            this.manager.menus.toppings.show()
        }))

    }
    show(prep?:boolean){
        this.showMenu()
        this.manager.player.currentMenu = MENUS.TRANSACTION

        if(prep){
            log('need to fetch order from server')
            this.manager.prepOrderSummary()
        }

        //this.hideMenu()
    }

    advanceMenu(){
        this.hideMenu()
        this.manager.menus.toppings.show()
    }

    updateMenu(text:string){
        this.subHeading.getComponent(TextShape).value = text
    }

    updateTX(tx:string){
        this.toppings.getComponent(TextShape).value = "Hash\n" + tx
    }
}