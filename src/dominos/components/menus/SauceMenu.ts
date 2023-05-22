import { MENUS } from 'src/dominos/helpers/types'
import { DominosManager } from '../manager'
import {Menu} from './Menu'

export class SauceMenu extends Menu{

    manager:DominosManager
    menuOptions:any[] = []

    constructor(menus:any[], manager:DominosManager){
        super(manager)
        this.manager = manager
        engine.addEntity(this)
        this.menuOptions = menus

        for(var i = 0; i < this.menuOptions.length; i++){
            this.menuOptions[i].selected = false
        }

        this.headerText.getComponent(TextShape).value = "Sauce"
        this.subHeading.getComponent(TextShape).value = ""

        this.image.getComponent(PlaneShape).visible = false

        this.prev.getComponent(PlaneShape).visible = false
        this.next.getComponent(PlaneShape).visible = false
        this.prevText.getComponent(TextShape).visible = false
        this.nextText.getComponent(TextShape).visible = false

        
        this.options[0].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(1)
            this.advanceMenu()
        }))
        this.options[1].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(2)
            this.advanceMenu()
        }))
        this.options[2].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(3)
            this.advanceMenu()
        }))
        this.options[3].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(4)
            this.advanceMenu()
        }))
        this.options[4].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(5)
            this.advanceMenu()
        }))   
        this.options[5].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(6)
            this.advanceMenu()
        }))   

    }
    show(){
        this.showMenu()
        this.manager.player.currentMenu = MENUS.SAUCES
        for(var i =0; i < this.options.length; i++){
            this.options[i].getComponent(Material).albedoColor = Color4.Blue()
        }

        for(var i = 0; i < ( this.menuOptions.length > 6 ? 6: this.menuOptions.length); i++){
            this.options[i].getComponent(PlaneShape).visible = true
            var split = this.menuOptions[i].name.split("_")
            this.optionsText[i].getComponent(TextShape).value = split[0]+"\n"+ (split.length > 1 ? split[1] : "")
            this.menuOptions[i].selected ? this.options[i].getComponent(Material).albedoColor = Color4.Green() : this.options[i].getComponent(Material).albedoColor = Color4.Blue()
        }
    }

    advanceMenu(){
        this.hideMenu()
        this.manager.menus.toppings.show()
    }

    optionClick(option:number){
        this.manager.player.order.sauce = this.menuOptions[option-1]
        log(this.manager.player.order.sauce)
        for(var i =0; i < this.menuOptions.length; i++){
            this.options[i].getComponent(Material).albedoColor = Color4.Blue()
            this.menuOptions[i].selected = false
        }
        this.menuOptions[option-1].selected = !this.menuOptions[option-1].selected
    }
}