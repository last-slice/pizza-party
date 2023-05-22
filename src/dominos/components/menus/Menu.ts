import { DominosManager } from "../manager"

export class Menu extends Entity{

    headerText:Entity
    subHeading:Entity
    prev:Entity
    prevText:Entity
    next:Entity
    nextText:Entity
    image:Entity

    options:Entity[] = [new Entity(), new Entity(), new Entity(), new Entity(), new Entity(), new Entity()]
    optionPos:Vector3[] = [new Vector3(-.2,.2,-.0001),new Vector3(.2,.2,-.0001),new Vector3(-.2,0,-.0001),new Vector3(.2,0,-.0001),new Vector3(-.2,-.2,-.0001),new Vector3(.2,-.2,-.0001)]
    optionsText:Entity[] = [new Entity(), new Entity(), new Entity(), new Entity(), new Entity(), new Entity()]

    startPosition = new Vector3(13,1,3.5)
    defaultScale = new Vector3(2,2,2)
    itemScale = new Vector3(.35,.15,1)
    itemTextScale = new Vector3(1.75,3,1)

    constructor(manager:DominosManager){
        super()
        engine.addEntity(this)
        this.addComponent(new Transform({
            position:new Vector3(-1,1.5,.6),
            rotation: Quaternion.Euler(0,120,0),
            scale:new Vector3(1,1.3,1)
        }))
        this.setParent(manager.kiosk.parent)
         this.hideMenu()
        this.addComponent(new PlaneShape())
        this.addComponent(new Material())
        this.getComponent(Material).albedoColor = Color4.Red()

        this.headerText = new Entity()
        this.headerText.addComponent(new TextShape("Menu"))
        this.headerText.getComponent(TextShape).fontSize = 2
        this.headerText.getComponent(TextShape).color = Color3.White()
        this.headerText.addComponent(new Transform({
            position: new Vector3(0,.4,-.01),
            scale: new Vector3(.8,.8,.8)
        }))
        this.headerText.setParent(this)

        this.subHeading = new Entity()
        this.subHeading.addComponent(new TextShape("Sub Heading"))
        this.subHeading.addComponent(new Transform({
            rotation:Quaternion.Euler(180,180,180),
            position: new Vector3(0,.2,-.01),
            scale: new Vector3(.8,.8,.8)
        }))
        this.subHeading.getComponent(TextShape).fontSize = 1
        this.subHeading.setParent(this)

        this.prev = new Entity()
        this.prev.addComponent(new PlaneShape())
        this.prev.addComponent(new Material())
        this.prev.getComponent(Material).albedoColor = Color4.Blue()
        this.prev.addComponent(new Transform({
            position: new Vector3(-.2,-.35,-.01),
            scale: new Vector3(.3,.1,.3)
        }))
        this.prev.setParent(this)

        this.prevText = new Entity()
        this.prevText.addComponent(new TextShape("Prev"))
        this.prevText.getComponent(TextShape).fontSize = 1
        this.prevText.getComponent(TextShape).color = Color3.White()
        this.prevText.addComponent(new Transform({
            position: new Vector3(0,0,-.0001),
            scale: new Vector3(3,9,3)
        }))
        this.prevText.setParent(this.prev)

        this.next = new Entity()
        this.next.addComponent(new PlaneShape())
        this.next.addComponent(new Material())
        this.next.getComponent(Material).albedoColor = Color4.Blue()
        this.next.addComponent(new Transform({
            position: new Vector3(.2,-.35,-.01),
            scale: new Vector3(.3,.1,.3)
        }))
        this.next.setParent(this)

        this.nextText = new Entity()
        this.nextText.addComponent(new TextShape("Next"))
        this.nextText.getComponent(TextShape).fontSize = 1
        this.nextText.getComponent(TextShape).color = Color3.White()
        this.nextText.addComponent(new Transform({
            position: new Vector3(0,0,-.0001),
            scale: new Vector3(3,9,3)
        }))
        this.nextText.setParent(this.next)

        this.image = new Entity()
        this.image.addComponent(new PlaneShape())
        this.image.addComponent(new Material())
        this.image.setParent(this)

        for(var i = 0; i < this.options.length; i++){
            this.options[i] = new Entity()
            this.options[i].addComponent(new PlaneShape())
            this.options[i].addComponent(new Material())
            this.options[i].getComponent(Material).albedoColor = Color4.Blue()
            this.options[i].addComponent(new Transform({
                position: this.optionPos[i],
                scale: this.itemScale
            }))
            this.options[i].getComponent(PlaneShape).visible = false
            this.options[i].setParent(this)

            this.optionsText[i].addComponent(new TextShape(""))
            this.optionsText[i].addComponent(new Transform({
                rotation:Quaternion.Euler(180,180,180),
                position: new Vector3(0,0,-.01),
                scale: this.itemTextScale
            }))
            this.optionsText[i].getComponent(TextShape).fontSize = 1
            this.optionsText[i].setParent(this.options[i])
        }



    }

    hideMenu(){
        this.getComponent(Transform).scale.setAll(0)
    }
    
    showMenu(){
        this.getComponent(Transform).scale = new Vector3(1,1.3,1)
    }
}

