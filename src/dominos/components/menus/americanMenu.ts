import { MENUS } from 'src/dominos/helpers/types'
import { DominosManager } from '../manager'
import {Menu} from './Menu'

export class AmericanMenu extends Menu{

    menuOptions:any[] = []
    manager:DominosManager

    constructor(menus:any[], manager:DominosManager){
        super(manager)
        engine.addEntity(this)
        this.menuOptions = menus
        this.manager = manager

        this.headerText.getComponent(TextShape).value = "U.S. Only"
        this.subHeading.getComponent(TextShape).value = "(for now)"
        this.subHeading.getComponent(Transform).position.y = .1

        this.image.getComponent(PlaneShape).visible = false

        this.prev.getComponent(PlaneShape).visible = false
        this.next.getComponent(PlaneShape).visible = false
        this.prevText.getComponent(TextShape).visible = false
        this.nextText.getComponent(TextShape).visible = false

        this.options[0].getComponent(PlaneShape).visible = true
    }
    show(){
        this.showMenu()
        this.manager.player.currentMenu = MENUS.AMERICAN
    }
}