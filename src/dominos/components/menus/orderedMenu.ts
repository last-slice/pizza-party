import { MENUS } from 'src/dominos/helpers/types'
import { DominosManager } from '../manager'
import {Menu} from './Menu'

export class OrderedMenu extends Menu{

    manager:DominosManager
    menuOptions:any[] = []

    constructor(menus:any[], manager:DominosManager){
        super(manager)
        engine.addEntity(this)
        this.menuOptions = menus
        this.manager = manager

        this.headerText.getComponent(TextShape).value = ""
        this.subHeading.getComponent(TextShape).value = "Order\nSuccess!"
        this.subHeading.getComponent(Transform).position.y = .1

        this.image.getComponent(PlaneShape).visible = false

        this.prev.getComponent(PlaneShape).visible = false
        this.next.getComponent(PlaneShape).visible = false
        this.prevText.getComponent(TextShape).visible = false
        this.nextText.getComponent(TextShape).visible = false

    }
    show(){
        this.showMenu()
        this.manager.player.currentMenu = MENUS.ORDERED
    }

    advanceMenu(){
        this.hideMenu()
        this.manager.menus.toppings.show()
    }

    updateMenu(text:string){
        this.subHeading.getComponent(TextShape).value = text
    }
}