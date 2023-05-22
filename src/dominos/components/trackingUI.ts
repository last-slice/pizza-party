import * as utils from '@dcl/ecs-scene-utils'
import * as ui from '@dcl/ui-scene-utils'
import { DominosManager } from "./manager";


let imageAtlas = "images/tracker.png"
let imageTexture = new Texture(imageAtlas)
var droneShape = new GLTFShape('models/drone.glb')

export var statusText = new UIText(ui.canvas)
export var patent = new UIText(ui.canvas)
export var prep = new UIImage(ui.canvas, imageTexture)
export var bake = new UIImage(ui.canvas, imageTexture)
export var quality = new UIImage(ui.canvas, imageTexture)
export var delivery = new UIImage(ui.canvas, imageTexture)
export var preptext = new UIText(ui.canvas)
export var baketext = new UIText(ui.canvas)
export var qualitytext = new UIText(ui.canvas)
export var deliverytext = new UIText(ui.canvas)

export class TrackingUI {

    manager:DominosManager
    droneFlying = false
    createdUI = false

    constructor(manager:DominosManager){
        this.manager = manager
        this.createUI()
    }

    createUI(){
        this.createdUI = true

        statusText.value = ""
        statusText.vAlign = "bottom"
        statusText.hAlign = "center"
        statusText.fontSize = 25
        statusText.width = 120
        statusText.height = 30
        statusText.positionX = -100
        statusText.color = Color4.Yellow()
        statusText.visible = false

        patent.value = "U.S. PATENT #10,262,281"
        patent.vAlign = "bottom"
        patent.hAlign = "bottom"
        patent.fontSize = 10
        patent.positionX = -175
        patent.positionY = -20
        patent.height = 30
        patent.color = Color4.White()
        patent.visible = false

        prep.sourceLeft = 0
        prep.sourceTop = 0
        prep.sourceWidth = 789
        prep.sourceHeight = 72
        prep.width = 789
        prep.height = 72
        prep.hAlign = "center"
        prep.vAlign = "bottom"
        prep.visible = false

        bake.sourceLeft = 0
        bake.sourceTop = 82
        bake.sourceWidth = 789
        bake.sourceHeight = 72
        bake.width = 789
        bake.height = 72
        bake.hAlign = "center"
        bake.vAlign = "bottom"
        bake.visible = false

        quality.sourceLeft = 0
        quality.sourceTop = 159
        quality.sourceWidth = 789
        quality.sourceHeight = 72
        quality.width = 789
        quality.height = 72
        quality.hAlign = "center"
        quality.vAlign = "bottom"
        quality.visible = false

        delivery.sourceLeft = 0
        delivery.sourceTop = 235
        delivery.sourceWidth = 789
        delivery.sourceHeight = 72
        delivery.width = 789
        delivery.height = 72
        delivery.hAlign = "center"
        delivery.vAlign = "bottom"
        delivery.visible = false

        preptext.value = "PREP"
        preptext.vAlign = "bottom"
        preptext.hAlign = "bottom"
        preptext.fontSize = 20
        preptext.positionX = -175
        preptext.positionY = 20
        preptext.height = 30
        preptext.color = Color4.White()
        preptext.visible = false

        baketext.value = "BAKE"
        baketext.vAlign = "bottom"
        baketext.hAlign = "bottom"
        baketext.fontSize = 20
        baketext.positionX = -30
        baketext.positionY = 20
        baketext.height = 30
        baketext.color = Color4.White()
        baketext.visible = false

        qualitytext.value = "QUALITY"
        qualitytext.vAlign = "bottom"
        qualitytext.hAlign = "bottom"
        qualitytext.fontSize = 20
        qualitytext.positionX = 110
        qualitytext.positionY = 20
        qualitytext.height = 30
        qualitytext.color = Color4.White()
        qualitytext.visible = false

        deliverytext.value = "DELIVERY"
        deliverytext.vAlign = "bottom"
        deliverytext.hAlign = "bottom"
        deliverytext.fontSize = 20
        deliverytext.positionX = 290
        deliverytext.positionY = 20
        deliverytext.height = 30
        deliverytext.color = Color4.White()
        deliverytext.visible = false
    }

    showTracking(local:boolean, status:any, driver:any){

        if(local){

        log('status is ' + status)
        preptext.visible = true
        baketext.visible = true
        qualitytext.visible = true
        deliverytext.visible = true
        patent.visible = true
      
        if(status == "Makeline"){
          prep.visible = true
          bake.visible = false
          quality.visible = false
          delivery.visible = false
          preptext.fontSize = 25
          baketext.fontSize = 20
          qualitytext.fontSize = 20
          deliverytext.fontSize = 20
        }
        if(status == "Oven"){
          log('need to show overn stuff')
          prep.visible = false
          bake.visible = true
          quality.visible = false
          delivery.visible = false
          preptext.fontSize = 20
          baketext.fontSize = 25
          qualitytext.fontSize = 20
          deliverytext.fontSize = 20
        }
        if(status == "Routing Station"){
          prep.visible = false
          bake.visible = false
          quality.visible = true
          delivery.visible = false
          preptext.fontSize = 20
          baketext.fontSize = 20
          qualitytext.fontSize = 25
          deliverytext.fontSize = 20
        }
    }
        if(status == "Out the Door" ||status == "Complete"){
          deliverytext.fontSize = 25
          if(!this.droneFlying){
            this.droneFlying = true
            this.startDrone(driver)

            if(local){
                this.hideUI()
                this.manager.ui.status.value = "" + driver + " is delivering your pizza!"
                utils.setTimeout(1000 * 1000, ()=>{
                  this.manager.ui.status.value = ""
                })
            }
          }
        }
      }

      hideUI(){
        prep.visible = false
        bake.visible = false
        quality.visible = false
        delivery.visible = false
        preptext.fontSize = 20
        baketext.fontSize = 20
        qualitytext.fontSize = 20

        preptext.visible = false
        baketext.visible = false
        qualitytext.visible = false
        deliverytext.visible = false
        patent.visible = false 
      }

      startDrone(driver:any){
        var order = {
          driver: driver
        }
      
      let paths:any = []
      let path:any = []
      path[0] = new Vector3(33, 1, -3)
      path[1] = new Vector3(34.5, 1, 0)
      path[2] = new Vector3(34.5, 8, 0)
      path[3] = new Vector3(0, 12, 16)
      paths.push(path)
      
      let path2:any = []
      path2[0] = new Vector3(33, 1, -3)
      path2[1] = new Vector3(34.5, 1, 0)
      path2[2] = new Vector3(34.5, 8, 0)
      path2[3] = new Vector3(0, 12, -32)
      paths.push(path2)
      
      let path3:any = []
      path3[0] = new Vector3(33, 1, -3)
      path3[1] = new Vector3(34.5, 1, 0)
      path3[2] = new Vector3(34.45, 8, 0)
      path3[3] = new Vector3(64, 12, 16)
      paths.push(path3)

      let path4:any = []
      path4[0] = new Vector3(33, 1, -3)
      path4[1] = new Vector3(34.5, 1, 0)
      path4[2] = new Vector3(34.45, 8, 0)
      path4[3] = new Vector3(48, 12, -32)
      paths.push(path4)
      
      const box = new Entity()
      const dronename = new Entity()
      dronename.addComponent(new TextShape(order.driver))
      dronename.setParent(box)
      dronename.addComponent(new Transform({
        position: new Vector3(0,1,0)
      }))
      dronename.addComponent(new Billboard(false, true, false))
      dronename.getComponent(TextShape).fontSize = 4
      box.addComponent(droneShape)
      box.addComponent(new Transform({
        position:new Vector3(13, 1, 3)
      }))
      box.addComponent(new utils.FollowPathComponent(paths[Math.floor(Math.random() * Math.floor(paths.length-1))], 10,()=>{
        engine.removeEntity(box)
        this.droneFlying = false
      }))
      engine.addEntity(box)
      }
}