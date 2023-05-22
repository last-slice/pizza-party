import * as utils from '@dcl/ecs-scene-utils'
import { movePlayerTo } from "@decentraland/RestrictedActions"
import * as ui from '@dcl/ui-scene-utils'
import { InvisibleBox } from './InvisibleBox'
import { UserData, getUserData } from '@decentraland/Identity'

let localUser:UserData

let messageBus = new MessageBus()

const input = Input.instance

let imageAtlas = "images/rocket.png"
let imageTexture = new Texture(imageAtlas)
let pizzatext = new Texture("images/pizza.png")
let pepptext = new Texture("images/pepp.png")
let icon = new UIImage(ui.canvas,imageTexture)
let pizza = new UIImage(ui.canvas, pizzatext)
let pepp = new UIImage(ui.canvas, pepptext)
let infoText = new UIText(ui.canvas)

let pizzashape = new GLTFShape("models/pizza2.glb")
let peppshape = new GLTFShape("models/pepp.glb")
let shiptype = ""
let ship = new Entity()
engine.addEntity(ship)

let flyMode = false
let started = false
let shiftDown = false
let fDown = false
let shortcutActivated = false
let invisibleBox

let time = 0

let forwardVector: Vector3 = Vector3.Forward().rotate(Camera.instance.rotation) // Camera's forward vector
let camera = Camera.instance

export let hudDisplay = new UIText(ui.canvas)
hudDisplay.value = "Hold W for forward\nMouse look to go up/down\nDO NOT JUMP"
hudDisplay.vAlign = "top"
hudDisplay.hTextAlign = "center"
hudDisplay.fontSize = 15
hudDisplay.visible = false


@Component("lerpData")
export class LerpData {
  origin: Vector3 = Vector3.Zero()
  target: Vector3 = Vector3.Zero()
  fraction: number = 0
}

export async function addFlying(){
  localUser = await getUserData()
  ship.addComponentOrReplace(new Transform({position: new Vector3(0,0,0),  scale: new Vector3(3,3,3)}))
  engine.addEntity(ship)
  engine.addSystem(new PingSystem())


  let shoe = new Entity()
    shoe.addComponent(new Transform({position: new Vector3(35.8,36,-20)}))
    shoe.addComponent(new utils.TriggerComponent(new utils.TriggerSphereShape(4,Vector3.Zero()),{
      enableDebug: false,
      onCameraEnter:()=>{
        engine.removeEntity(shoe)
        icon.visible = true
        ui.displayAnnouncement("FLYING ENABLED!\nClick the rocket icon to begin.",10)
      }
    }))
  engine.addEntity(shoe)

  pizza.sourceLeft = 0
  pizza.sourceTop = 0
  pizza.sourceWidth = 48
  pizza.sourceHeight = 48
  pizza.hAlign = 'right'
  pizza.vAlign = 'top'
  pizza.positionX = -15
  pizza.positionY = -40
  pizza.width=48
  pizza.height=48
  pizza.visible = false
  pizza.onClick = new OnPointerDown(() => {
    if(flyMode){
      ship.addComponentOrReplace(pizzashape)
      shiptype = "pizza"
      messageBus.emit("change-ship", {userId:localUser.userId, type:"pizza"})
    }
  })

  pepp.sourceLeft = 0
  pepp.sourceTop = 0
  pepp.sourceWidth = 48
  pepp.sourceHeight = 48
  pepp.hAlign = 'right'
  pepp.vAlign = 'top'
  pepp.positionX = -15
  pepp.positionY = -80
  pepp.width=48
  pepp.height=48
  pepp.visible = false
  pepp.onClick = new OnPointerDown(() => {
    if(flyMode){
      ship.addComponentOrReplace(peppshape)
      shiptype = "pepp"
      messageBus.emit("change-ship", {userId:localUser.userId, type:"pepp"})
    }
  })

  icon.sourceLeft = 0
  icon.sourceTop = 0
  icon.sourceWidth = 64
  icon.sourceHeight = 64
  icon.hAlign = 'right'
  icon.vAlign = 'top'
  icon.positionX = -15
  icon.positionY = 0
  icon.width=40
  icon.height=40
  icon.visible =false
  icon.isPointerBlocker = true
  icon.onClick = new OnPointerDown(() => {
    if(started){
      log("need to end session")
      infoText.visible = false
     // messageBus.emit("restart", {user:user.displayName})
     disableFlying()
     started = false
    }
    else{
      // infoText.visible = true
      // ui.displayAnnouncement("Fly in your spaceship!\nClick rocket again to end.")
      // started = true
      // var pos = Camera.instance.position
      // var rot = Camera.instance.rotation
      // movePlayerTo({x: pos.x, y: pos.y+3, z:pos.z})

      // ship = Math.floor(Math.random() * 3)
      // localUFO = new UFO(new Transform({
      //   position: new Vector3(pos.x, .5, pos.z),
      //   rotation: rot,
      //   scale: new Vector3(1.5,1.5,1.5)
      // }), ship)
     //messageBus.emit("load", {user: user.displayName, pos: pos, rot: rot})

     enableFlying()
    }
  })

  infoText.hAlign = 'center'
  infoText.vAlign = 'bottom'
  infoText.positionX = -85
  infoText.positionY = 0
  infoText.width=400
  infoText.height=64
  infoText.font = new Font(Fonts.SanFrancisco_Heavy)
  infoText.fontSize = 15
  infoText.value = "Controls:     F = up     E = down     CLICK = forward     MOUSE = direction"
  infoText.visible = false
}

function disableFlying(){
  toggleFlyMode()

  input.unsubscribe("BUTTON_DOWN", ActionButton.FORWARD,()=>{})
  input.unsubscribe("BUTTON_UP", ActionButton.FORWARD,()=>{})
  input.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY,()=>{})
  input.unsubscribe("BUTTON_UP", ActionButton.SECONDARY,()=>{})
  input.unsubscribe("BUTTON_DOWN", ActionButton.WALK,()=>{})
  input.unsubscribe("BUTTON_UP", ActionButton.WALK,()=>{})
  hideDisplay()

  if(ship){
    ship.removeComponent(GLTFShape)
  }
}

function enableFlying(){


  if(!invisibleBox){
    invisibleBox = new InvisibleBox()
  }
  engine.addEntity(ship)

    showDisplay()

    toggleFlyMode()
  
  
  input.subscribe("BUTTON_DOWN", ActionButton.FORWARD, true, (e) => {
    if(!started && flyMode){
      started = true
      engine.addSystem(lerps)
    }
  })
  
  input.subscribe("BUTTON_UP", ActionButton.FORWARD, true, (e) => {
    engine.removeSystem(lerps)
    started = false
    invisibleBox.getComponent(LerpData).fraction = 0
  })
  
  let lerps = new LerpMove()
  invisibleBox.addComponentOrReplace(new LerpData())
}

export class LerpMove implements ISystem { 
  update(dt: number) {
    //log('lerping')
    forwardVector = Vector3.Forward().rotate(Camera.instance.rotation)
    let temp = camera.position.add( forwardVector.normalize().scale(5))
    if(temp.y < .5){
      temp.y = .6
    }
  
    invisibleBox.getComponent(LerpData).origin = invisibleBox.getComponent(Transform).position
    invisibleBox.getComponent(LerpData).target = temp

    if(ship && ship.isAddedToEngine()){
      ship.getComponent(Transform).rotation = Quaternion.Euler(0, Camera.instance.rotation.eulerAngles.y, 0)
    }

    let transform = invisibleBox.getComponent(Transform)
    let lerp = invisibleBox.getComponent(LerpData)
    if (lerp.fraction < 1 && transform.position.y > .5) {
      transform.position = Vector3.Lerp(lerp.origin, lerp.target, lerp.fraction)
      lerp.fraction += dt / 100
    }
    else{
      lerp.fraction = 0
    }
  }
}

export function toggleFlyMode(){
  flyMode = !flyMode
  log('fly mode ', flyMode)
  if(flyMode){
    time = Math.floor(Date.now()/1000)
    showDisplay()
    movePlayerTo({x: camera.position.x, y:camera.position.y + 1, z:camera.position.z})
    engine.addEntity(invisibleBox)
    invisibleBox.getComponent(Transform).position = new Vector3(camera.position.x, camera.position.y-1, camera.position.z)
    engine.addEntity(ship)
    ship.setParent(invisibleBox)
  }
  else{
    time = 0
    engine.removeEntity(invisibleBox)
    shiptype = ""
    hideDisplay()
  }
}

export function showDisplay(){
  hudDisplay.visible = true
  pizza.visible = true
  pepp.visible = true

  utils.setTimeout(1000* 15, ()=>{
    hudDisplay.visible = false
  })
  }

export function hideDisplay(){
  hudDisplay.visible = false
  pizza.visible = false
  pepp.visible = false
  }

  export class PingSystem {
  
    length = 0.1
    timer = 0
    flying = false
    prior:Vector3

    update(dt:number){
      if(this.timer > 0){
        this.timer -= dt
      }else{
        if(flyMode){
          this.flying = true
         // if(this.prior && Vector3.Distance(ship.getComponent(Transform).position, this.prior) > .5){
            messageBus.emit('flying', {userId:localUser.userId, type:shiptype, pos: invisibleBox.getComponent(Transform).position, rot:ship.getComponent(Transform).rotation})
           // this.prior = ship.getComponent(Transform).position
         // }
        }else{
          if(this.flying){
            this.flying = false
            messageBus.emit('stop', {userId:localUser.userId})
          }
        }
        this.timer = this.length
      }
    }
  }



let users:any[] = []
messageBus.on("flying", (info)=>{
  log('flying info', info)

  if(info.userId != localUser.userId){
    log('non local user flying')
    let player = users.filter((user)=> user.userId === info.userId)[0]
    if(player){
      let ship = player.ship
      ship.getComponent(Transform).position = info.pos
      ship.getComponent(Transform).rotation = info.rot
    }
    else{
      let ship = new Entity()
      if(info.type == "pizza"){
        ship.addComponentOrReplace(pizzashape)
      }
      else if(info.type == "pepp"){
        ship.addComponentOrReplace(pizzashape)
      }
      else{

      }

      ship.addComponent(new Transform({position:info.pos, rotation:info.rot, scale: new Vector3(3,3,3)}))
      engine.addEntity(ship)

      log('adding user to array', {userId:info.userId, ship:ship})
      users.push({userId:info.userId, ship:ship})
      log(users[0].userId)
    }
  } 
})

messageBus.on("change-ship", (info)=>{
  let player = users.filter((user)=> user.userId === info.userId)[0]
  if(player){
    log('changing player ship to', info.type)
    if(info.type == "pizza"){
      player.ship.addComponentOrReplace(pizzashape)
    } 
    else if(info.type == "pepp"){
      player.ship.addComponentOrReplace(peppshape)
    }
    else{}
  }
})

messageBus.on("stop", (info)=>{
  log('stop flying', info, localUser)
  if(info.userId != localUser.userId){
    let player = users.filter((user)=> user.userId === info.userId)[0]
    log('stopped player is', player)
    if(player){
      log('needing to tremove other player ship')
      player.ship.removeComponent(GLTFShape)
      engine.removeEntity(player.ship)
    }
    users.forEach((user, i)=>{
      if(user.userId === info.userId){
        users.splice(i,1)
      }
    })
  }
})