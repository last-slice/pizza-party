import { MENUS } from 'src/dominos/helpers/types'
import { DominosManager } from '../manager'
import {Menu} from './Menu'

export class ToppingsMenu extends Menu{

    manager:DominosManager
    menuOptions:any[] = []
    pages:number 
    currentPage = 0
    constructor(menus:any[], manager:DominosManager){
        super(manager)
        this.manager = manager
        engine.addEntity(this)
        this.menuOptions = menus

        var counter = 0
        for(var i = 0; i < this.menuOptions.length; i++){
            this.menuOptions[i].selected = false
            var arr = this.menuOptions[i].name.split("_")
            var name = arr[0].substr(0,1).toUpperCase() + arr[0].substr(1).toLowerCase() + "\n" + (arr.length > 1 ? arr[1].substr(0,1).toUpperCase() + arr[1].substr(1).toLowerCase() : "") + (arr.length > 2 ? "\n" + arr[2].substr(0,1).toUpperCase() + arr[2].substr(1).toLowerCase() : "")
            this.menuOptions[i].name = name
            this.menuOptions[i].index = counter
            counter++
        }

        this.pages = Math.floor(this.menuOptions.length/6)
        this.pages += (this.menuOptions.length%6 > 0 ? 1: 0)
        log(this.pages)
        this.headerText.getComponent(TextShape).value = "Toppings"
        this.subHeading.getComponent(TextShape).value = ""

        this.image.getComponent(PlaneShape).visible = false

        this.prevText.getComponent(TextShape).value = "Sauces"

        this.next.addComponentOrReplace(new OnPointerDown((e)=>{
            if(this.currentPage < this.pages-1){
                this.currentPage++
                this.prevText.getComponent(TextShape).value = "Prev"
                this.showToppings()   
                if(this.currentPage == 4){
                    this.nextText.getComponent(TextShape).value = "Review"
                }
            }
            else{
                this.manager.player.order.toppings = []
                for(var i = 0; i < this.menuOptions.length; i++){
                    this.menuOptions[i].selected ? this.manager.player.order.toppings.push(this.menuOptions[i]) : null
                }
                this.hideMenu()
                this.manager.menus.review.show()
            }

        }))

        this.prev.addComponentOrReplace(new OnPointerDown((e)=>{
            if(this.currentPage >0){
                this.currentPage--
                this.nextText.getComponent(TextShape).value = "Next"
                this.showToppings()
                if(this.currentPage == 0){
                    this.prevText.getComponent(TextShape).value = "Sauces"
                }
            }
            else{
                this.hideMenu()
                this.manager.menus.sauces.show()
            }

        }))
        
        this.options[0].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(1)
        }))
        this.options[1].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(2)
        }))
        this.options[2].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(3)
        }))
        this.options[3].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(4)
        }))
        this.options[4].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(5)
        }))   
        this.options[5].addComponentOrReplace(new OnPointerDown((e)=>{
            this.optionClick(6)
        }))



    }
    show(){
        this.showMenu()
        this.manager.player.currentMenu =  MENUS.TOPPINGS
        this.showToppings()
    }

    showToppings(){
        log('current page ' + this.currentPage)
        log('total pages ' + this.pages)
        for(var i =0; i < this.options.length; i++){
            this.options[i].getComponent(Material).albedoColor = Color4.Blue()
            this.optionsText[i].getComponent(TextShape).value = ""
            this.options[i].getComponent(PlaneShape).visible = false
        }
        log(this.currentPage)
        var currentToppings:any[] = []
        for(var i = (this.currentPage * 6); i < (this.currentPage * 6 + 6); i++){
            if(this.menuOptions[i]){
                currentToppings.push(this.menuOptions[i])
            }
         }
        for(var i =0; i < currentToppings.length; i++){
            this.options[i].getComponent(PlaneShape).visible = true
            this.optionsText[i].getComponent(TextShape).value = ""
            this.optionsText[i].getComponent(TextShape).value = currentToppings[i].name
            currentToppings[i].selected ? this.options[i].getComponent(Material).albedoColor = Color4.Green() : this.options[i].getComponent(Material).albedoColor = Color4.Blue()
        }
    }

    optionClick(option:number){
        log(option + " option")
        this.menuOptions[(this.currentPage * 6 ) + option-1].selected = !this.menuOptions[(this.currentPage * 6 ) + option-1].selected
        this.menuOptions[(this.currentPage * 6 ) + option-1].selected ? this.options[option-1].getComponent(Material).albedoColor = Color4.Green() : this.options[option-1].getComponent(Material).albedoColor = Color4.Blue()
        log(this.menuOptions)
    }
}