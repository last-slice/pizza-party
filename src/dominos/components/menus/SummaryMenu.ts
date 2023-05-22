import { MENUS } from 'src/dominos/helpers/types'
import { DominosManager } from '../manager'
import {Menu} from './Menu'

export class SummaryMenu extends Menu{

    manager:DominosManager
    menuOptions:any[] = []
    foodFee:Entity
    deliveryFee:Entity
    taxFee: Entity
    virtualFee:Entity
    discounts: Entity
    toppings:Entity
    subtotal:Entity
    total:Entity
    dollarTotal:Entity

    choice:any = "payment"

    constructor(menus:any[], manager:DominosManager){
        super(manager)
        this.manager = manager
        engine.addEntity(this)
        this.menuOptions = menus

        this.headerText.getComponent(TextShape).value = "Summary"
        this.subHeading.getComponent(TextShape).value = ""
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
            position: new Vector3(0,.15,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.toppings.getComponent(TextShape).fontSize = 1
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.toppings.setParent(this)

        this.foodFee = new Entity()
        this.foodFee.addComponent(new TextShape("Food: "))
        this.foodFee.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(-.05,0,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.foodFee.getComponent(TextShape).fontSize = 1
        this.foodFee.getComponent(TextShape).hTextAlign = "right"
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.foodFee.setParent(this)

        this.deliveryFee = new Entity()
        this.deliveryFee.addComponent(new TextShape("Delivery: "))
        this.deliveryFee.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(-.05,-.05,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.deliveryFee.getComponent(TextShape).hTextAlign = "right"
        this.deliveryFee.getComponent(TextShape).fontSize = 1
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.deliveryFee.setParent(this)

        this.taxFee = new Entity()
        this.taxFee.addComponent(new TextShape("Tax: "))
        this.taxFee.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(-.05,-.1,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.taxFee.getComponent(TextShape).hTextAlign = "right"
        this.taxFee.getComponent(TextShape).fontSize = 1
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.taxFee.setParent(this)

        this.subtotal = new Entity()
        this.subtotal.addComponent(new TextShape("Subtotal: "))
        this.subtotal.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(-.05,-.15,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.subtotal.getComponent(TextShape).hTextAlign = "right"
        this.subtotal.getComponent(TextShape).fontSize = 1
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.subtotal.setParent(this)

        this.dollarTotal = new Entity()
        this.dollarTotal.addComponent(new TextShape("Total: "))
        this.dollarTotal.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(.3,-.15,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.dollarTotal.getComponent(TextShape).hTextAlign = "right"
        this.dollarTotal.getComponent(TextShape).fontSize = 1
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.dollarTotal.setParent(this)

        this.virtualFee = new Entity()
        this.virtualFee.addComponent(new TextShape("Virtual: $" + this.manager.player.virtualFee))
        this.virtualFee.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(.3,0,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.virtualFee.getComponent(TextShape).hTextAlign = "right"
        this.virtualFee.getComponent(TextShape).fontSize = 1
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.virtualFee.setParent(this)

        this.discounts = new Entity()
        this.discounts.addComponent(new TextShape(""))
        this.discounts.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(.3,-.05,-.01),
            scale: new Vector3(.5,.5,.5)
        }))
        this.discounts.getComponent(TextShape).hTextAlign = "right"
        this.discounts.getComponent(TextShape).fontSize = 1
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.discounts.setParent(this)

        this.total = new Entity()
        this.total.addComponent(new TextShape(""))
        this.total.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(-.35,-.25,-.01),
            scale: new Vector3(.4,.4,.4)
        }))
        this.total.getComponent(TextShape).hTextAlign = "left"
        this.total.getComponent(TextShape).fontSize = 1
        //this.toppings.getComponent(TextShape).textWrapping = true
        this.total.setParent(this)

        this.image.getComponent(PlaneShape).visible = false

        this.prev.getComponent(PlaneShape).visible = true
        this.next.getComponent(PlaneShape).visible = true
        this.prevText.getComponent(TextShape).visible = true
        this.nextText.getComponent(TextShape).visible = true
        this.prevText.getComponent(TextShape).value = "Cancel"
        this.nextText.getComponent(TextShape).value = "Payment"

        this.prev.addComponentOrReplace(new OnPointerDown((e)=>{
            this.hideMenu()
            this.manager.clearOrder()
            this.manager.player.currentMenu = MENUS.CATEGORIES
            this.choice = 'payment'
            this.nextText.getComponent(TextShape).value = "Payment"
        }))

        this.next.addComponentOrReplace(new OnPointerDown(async(e)=>{
            //this.hideMenu()

            //this.manager.manaCheck()
            this.choice == "payment" ? 
            this.manager.priceChoice()
            : this.manager.balanceCheck()
        }))

    }
    show(){
        this.showMenu()
        this.manager.player.currentMenu = MENUS.SUMMARY
    }

    advanceMenu(){
        this.hideMenu()
        this.manager.menus.toppings.show()
    }

    updateMenu(){
        this.foodFee.getComponent(TextShape).value = "Food: $" + this.manager.player.order.foodPrice   
        this.deliveryFee.getComponent(TextShape).value = "Delivery: $" + this.manager.player.order.deliveryFee   
        this.taxFee.getComponent(TextShape).value = "Tax: $" + this.manager.player.order.taxFee   
        this.subtotal.getComponent(TextShape).value = "Subtotal: $" + this.manager.player.order.subtotal   
        this.virtualFee.getComponent(TextShape).value = "Virtual: $" + this.manager.player.virtualFee   
        this.dollarTotal.getComponent(TextShape).value = "Total: $" + (this.manager.player.order.subtotal + this.manager.player.virtualFee)
    }

    updateTotal(total:any, type:any){
        this.total.getComponent(TextShape).value = "Total: " + total + " " + type
        this.nextText.getComponent(TextShape).value = "Confirm"
        this.choice = 'confirm'
    }
}