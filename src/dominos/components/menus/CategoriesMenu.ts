import { MENUS } from 'src/dominos/helpers/types'
import { DominosManager } from '../manager'
import {Menu} from './Menu'

export class CategoriesMenu extends Menu{

    manager:DominosManager

    menuOptions:any[] = []
    currentCategory:string
    constructor(menus:any[], manager:DominosManager){
        super(manager)
        engine.addEntity(this)
        this.menuOptions = menus
        this.manager = manager

        this.headerText.getComponent(TextShape).value = "Menu"
        this.subHeading.getComponent(TextShape).value = this.menuOptions[0].name
        this.currentCategory = this.menuOptions[0].name

        this.image.addComponent(new Transform({
            rotation:Quaternion.Euler(0,0,180),
            scale: new Vector3(.6,.4,.4),
            position: new Vector3(0,-.05,-.01)
        }))
        this.image.getComponent(Material).albedoTexture = new Texture(this.menuOptions[0].image)
        this.image.addComponentOrReplace(new OnPointerDown((e)=>{
            log("clicked image")
                switch(this.currentCategory){
                    case "Pizza":
                        this.hideMenu()
                        this.manager.menus.sauces.show()
                        break;
                }
        }))

        this.prev.getComponent(PlaneShape).visible = false
        this.next.getComponent(PlaneShape).visible = false
        this.prevText.getComponent(TextShape).visible = false
        this.nextText.getComponent(TextShape).visible = false

        if(this.menuOptions.length > 1){
            this.prev.getComponent(PlaneShape).visible = true
            this.next.getComponent(PlaneShape).visible = true

            this.prev.addComponentOrReplace(new OnPointerDown((e)=>{
                log("previous category")
            }))
    
            this.next.addComponentOrReplace(new OnPointerDown((e)=>{
                log("next category")
            }))
        }
        this.hideMenu()
    }

    show(){
        this.showMenu()
        this.manager.player.currentMenu = MENUS.CATEGORIES
    }
}