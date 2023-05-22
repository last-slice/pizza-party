
import { MENUS } from 'src/dominos/helpers/types'
import { DominosManager } from '../manager'
import {Menu} from './Menu'

export class ReviewMenu extends Menu{

    manager:DominosManager
    menuOptions:any[] = []
    toppings:Entity

    constructor(menus:any[], manager:DominosManager){
        super(manager)
        engine.addEntity(this)
        this.manager = manager
        this.menuOptions = menus

        this.headerText.getComponent(TextShape).value = "Review"
        this.subHeading.getComponent(TextShape).value = this.manager.player.order.sauce ? this.manager.player.order.sauce.name : ""
        this.subHeading.getComponent(Transform).position.y = .1

        var pizza = new Entity()
        pizza.addComponent(new TextShape('Pizza\n14" Large Hand Tossed'))
        pizza.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(0,.25,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        pizza.getComponent(TextShape).fontSize = 1
        pizza.setParent(this)

        this.toppings = new Entity()
        this.toppings.addComponent(new TextShape("Toppings"))
        this.toppings.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(0,-.1,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.toppings.getComponent(TextShape).fontSize = 1
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.toppings.setParent(this)

        this.image.getComponent(PlaneShape).visible = false

        this.prev.getComponent(PlaneShape).visible = true
        this.next.getComponent(PlaneShape).visible = true
        this.prevText.getComponent(TextShape).visible = true
        this.nextText.getComponent(TextShape).visible = true
        this.nextText.getComponent(TextShape).value = "Price"

        this.prev.addComponentOrReplace(new OnPointerDown((e)=>{
            this.hideMenu()
            this.manager.menus.toppings.show()
        }))

        this.next.addComponentOrReplace(new OnPointerDown((e)=>{
            this.hideMenu()
            this.manager.menus.transaction.show(true)
        }))

    }
    show(){
        this.showMenu()
        this.manager.player.currentMenu = MENUS.REVIEW
        var arr = this.manager.player.order.sauce.name.split("_")
        this.subHeading.getComponent(Transform).scale.setAll(.5)
        this.subHeading.getComponent(TextShape).value = "SAUCE\n" + arr[0].substr(0,1).toUpperCase() + arr[0].substr(1).toLowerCase() + (arr.length > 1 ? " " +arr[1].substr(0,1).toUpperCase() + arr[1].substr(1).toLowerCase() : "")
        var toppings = ""

        for(var i = 0; i < this.manager.player.order.toppings.length; i++){
            var arr = this.manager.player.order.toppings[i].name.split("_")
            if(arr.length> 1){
                log("greater than 1")
                this,this.manager.player.order.toppings[i].name = arr[0].substr(0,1).toUpperCase().trim() + arr[0].substr(1).toLowerCase().trim() + (arr.length > 1 ? arr[1].substr(0,1).toUpperCase().trim() + arr[1].substr(1).toLowerCase().trim() : "".trim()) + (arr.length > 2 ? " " + arr[2].substr(0,1).toUpperCase().trim() + arr[2].substr(1).toLowerCase().trim() : "".trim())
            }
            toppings += this.manager.player.order.toppings[i].name.trim() + (i == this.manager.player.order.toppings.length -1 ? "".trim() : ", ")
        }
        
        if(this.manager.player.order.toppings.length == 0){
            toppings = "Cheese"
        }

        if(this.manager.player.order.toppings.length > 6){
            this.toppings.getComponent(Transform).scale.setAll(.25)
        }
        this.toppings.getComponent(TextShape).value = "Toppings\n"+toppings
    }

    advanceMenu(){
        this.hideMenu()
        this.manager.menus.toppings.show()
    }
}