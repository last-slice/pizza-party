import { DominosManager } from '../manager'
import {Menu} from './Menu'

export class PizzaMenu extends Menu{

    menuOptions:any[] = []
    constructor(menus:any[], manager:DominosManager){
        super(manager)
        engine.addEntity(this)
        this.menuOptions = menus
        this.headerText.getComponent(TextShape).value = "Choose Pizza"
        this.subHeading.getComponent(TextShape).value = this.menuOptions[0].name

        this.image.addComponent(new Transform({
            rotation:Quaternion.Euler(0,0,180),
            scale: new Vector3(.6,.4,.4),
            position: new Vector3(0,-.05,-.01)
        }))
        this.image.getComponent(Material).albedoTexture = this.menuOptions[0].image

        this.prev.getComponent(PlaneShape).visible = false
        this.next.getComponent(PlaneShape).visible = false

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

    }
}