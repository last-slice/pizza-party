import { MENUS } from 'src/dominos/helpers/types'
import { DominosManager } from '../manager'
import {Menu} from './Menu'

export class StartMenu extends Menu{

    manager:DominosManager
    menuOptions:any[] = []


    constructor(menus:any[], manager:DominosManager){
        super(manager)
        this.manager = manager
        engine.addEntity(this)
        this.menuOptions = menus

        this.headerText.getComponent(TextShape).value = "Welcome!"
        this.subHeading.getComponent(TextShape).value = this.manager.player.order.sauce ? this.manager.player.order.sauce.name : ""
        this.subHeading.getComponent(Transform).position.y = .1

        this.image.getComponent(PlaneShape).visible = false

        this.prev.getComponent(PlaneShape).visible = false
        this.next.getComponent(PlaneShape).visible = false
        this.prevText.getComponent(TextShape).visible = false
        this.nextText.getComponent(TextShape).visible = false

        this.options[0].getComponent(PlaneShape).visible = true
        this.options[0].getComponent(Transform).position.x = 0
        this.options[0].getComponent(Transform).position.y = 0
        this.optionsText[0].getComponent(TextShape).value = "Order"

        this.options[0].addComponent(new OnPointerDown(()=>{
            this.manager.checkUserInput()
        }))


    }
    show(){
        this.showMenu()
        this.manager.player.currentMenu = MENUS.START
    }
}