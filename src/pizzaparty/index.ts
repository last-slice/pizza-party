import { neat } from "dcl-neat"
import resources from "./resources"
import { hud } from "@dcl/builder-hud"
import { KeepRotatingComponent, ScaleTransformComponent } from "@dcl/ecs-scene-utils"
import { addFlying } from "./Flying"
import * as vs from 'dcl-video-system'
import { manager } from "src/dominos/init"
import * as ui from '@dcl/ui-scene-utils'
import * as EXTRAS from 'dcl-scene-extras'
import * as utils from '@dcl/ecs-scene-utils'
import { movePlayerTo } from "@decentraland/RestrictedActions"

export function createParty(){

    addFloor()
    addNeat()
    addObjects()
    addFlying()

    // let test = new Entity()
    // test.addComponent(new Transform({position: new Vector3(3,1,3)}))
    // test.addComponent(new BoxShape())
    // test.addComponent(new OnPointerDown(()=>{
    //     movePlayerTo({x:38, y:50, z:-18})
    // }))
    // engine.addEntity(test)

    let box = new Entity("box")
    box.addComponent(new BoxShape())
    box.addComponent(new TextShape("CLAIM MASK"))
    box.getComponent(TextShape).fontSize = 3
    box.getComponent(TextShape).vTextAlign = "bottom"
    box.getComponent(TextShape).color = Color3.White()
    box.getComponent(TextShape).outlineWidth = .2
    box.getComponent(TextShape).outlineColor = Color3.Red()
    box.getComponent(TextShape).font = new Font(Fonts.SansSerif_Bold)
    box.addComponent(new Transform({position: new Vector3(37.6,35,-24), rotation:Quaternion.Euler(0,180,0)}))
    engine.addEntity(box)
    box.addComponent(hud.transparentMat)
    box.addComponent(new OnPointerDown(()=>{
        log('sending message')
        if(manager.colyseusRoom){
            log('sending coleysus')
            manager.colyseusRoom.send('claim-parkour', {pos:Camera.instance.position})
            maex.triggerEmote('clap')
        }
        else{
            ui.displayAnnouncement("Not connected to server.\nPlease refresh and try again.")
        }
    },{hoverText:'Claim'}))

    let mask = new Entity()
    mask.addComponent(new GLTFShape("models/mask.glb"))
    mask.addComponent(new Transform({position: new Vector3(37.6,34,-24)}))
    mask.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,45,0)))
    engine.addEntity(mask)

    let shoes = new Entity("shoes")
    shoes.addComponent(new BoxShape())
    shoes.addComponent(new TextShape("CLAIM SHOES"))
    shoes.addComponent(hud.transparentMat)
    shoes.getComponent(TextShape).fontSize = 3
    shoes.getComponent(TextShape).vTextAlign = "bottom"
    shoes.getComponent(TextShape).color = Color3.White()
    shoes.getComponent(TextShape).outlineWidth = .2
    shoes.getComponent(TextShape).outlineColor = Color3.Red()
    shoes.addComponent(new Transform({position: new Vector3(31,35,-21), rotation:Quaternion.Euler(0,220,0)}))
    engine.addEntity(shoes)
    shoes.addComponent(new OnPointerDown(()=>{
        log('sending message')
        if(manager.colyseusRoom){
            manager.colyseusRoom.send('claim-shoes', {pos:Camera.instance.position})
            shex.triggerEmote('clap')
        }
        else{
            ui.displayAnnouncement("Not connected to server.\nPlease refresh and try again.")
        }
    },{hoverText:'Claim'}))

    let shoe = new Entity()
    shoe.addComponent(new GLTFShape("models/shoes.glb"))
    shoe.addComponent(new Transform({position: new Vector3(31,35.5,-21)}))
    shoe.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,-45,0)))
    engine.addEntity(shoe)


    let maex = EXTRAS.createExtra(
        {position: new Vector3(36.37,34.1,-24.32), rotation:Quaternion.Euler(0,0,0)}, 
        EXTRAS.EXTRA_BODY_TYPE.MALE, 
        "Pizza Mask",
        ["urn:decentraland:matic:collections-v2:0xe7cdc8ba8f437954a60bacaccefc0766a5e27af9:0", "urn:decentraland:matic:collections-v2:0xe7cdc8ba8f437954a60bacaccefc0766a5e27af9:2", "urn:decentraland:matic:collections-v2:0x27569b3e23229d63efa262e852b3b09085b5e48a:0"],
    )

   let shex = EXTRAS.createExtra(
        {position: new Vector3(32.15,34.1,-21.93), rotation:Quaternion.Euler(0,45,0)}, 
        EXTRAS.EXTRA_BODY_TYPE.MALE, 
        "Pizza Shoes",
        ["urn:decentraland:matic:collections-v2:0xe7cdc8ba8f437954a60bacaccefc0766a5e27af9:0", "urn:decentraland:matic:collections-v2:0xe7cdc8ba8f437954a60bacaccefc0766a5e27af9:2", "urn:decentraland:matic:collections-v2:0xe7cdc8ba8f437954a60bacaccefc0766a5e27af9:1"],
    )

    let ex = EXTRAS.createExtra(
        {position: new Vector3(34.5,34.1,-22.2), rotation:Quaternion.Euler(0,45,0)}, 
        EXTRAS.EXTRA_BODY_TYPE.MALE, 
        "Last Slice",
        ["urn:decentraland:matic:collections-v2:0xf87a8372437c40ef9176c1b224cbe9307a617a25:0", "urn:decentraland:matic:collections-v2:0xf87a8372437c40ef9176c1b224cbe9307a617a25:1", "urn:decentraland:matic:collections-v2:0xf87a8372437c40ef9176c1b224cbe9307a617a25:2"],
        [{urn:"urn:decentraland:matic:collections-v2:0x781dc89de1e5a38d21423e6b5dc0893435d206e9:1"}]
        )

        let delay = new Entity()
        engine.addEntity(delay)
        delay.addComponent(new utils.Delay(1000 * 25,()=>{
            engine.removeEntity(delay)
            ex.triggerEmote("urn:decentraland:matic:collections-v2:0x781dc89de1e5a38d21423e6b5dc0893435d206e9:1")
        }))

    let videoSystem = new vs.VideoSystem({
        emission: 1.2,
        type: vs.VideoSystemTypes.LIVE,
        offType: vs.VideoSystemTypes.NONE,
        liveLink: "https://tangisamazing.dclstream.com/live/obs/playlist.m3u8",
     })

     videoSystem.start(1)   
    
     let ent = new Entity()
    ent.addComponent(new PlaneShape())
    ent.addComponent(videoSystem.material)
    ent.addComponent(new Transform({position: new Vector3(8,0,8), rotation:Quaternion.Euler(0,0,90), scale: new Vector3(0,0,0)}))
    engine.addEntity(ent)


}

function addFloor(){

    let lsgrounds:any = [
        new Vector3(8,0,8),
        new Vector3(24,0,8),
        new Vector3(40,0,8),
        new Vector3(56,0,8),
        new Vector3(40,0,24),
        new Vector3(24,0,-8),
        new Vector3(24,0,-24),
        new Vector3(40,0,-8),
        new Vector3(40,0,-24),
        
        ]
    
        for(var i = 0; i < lsgrounds.length; i++){
            var g =  new Entity("lsground1")
            g.addComponentOrReplace(resources.models.floor)
            g.addComponentOrReplace(new Transform({
                position: lsgrounds[i]
            }))
            // g.setParent(baseParent)
            engine.addEntity(g)
        }
}

function addNeat(){
    neat.init(
        false,  //remove the standard triangle GLB
        false,  //admin mode; allow creator to view neat locally
        true,  //hide avatars when close proximity
        true,  //auto rotation
        3,      //click distance
        {position: new Vector3(35,1,-5.8)}, //transform arguments
        undefined,//optional token id specific to this  neat location
        ) 
}

function addObjects(){
    resources.objects.forEach((object,i)=>{
        let entity = new Entity("entity-" + (i+1))
        entity.addComponent(resources.models[object.model])
        entity.addComponent(new Transform(object.transform))
        let startSize = new Vector3 (6,6,6)

        switch(object.type){
            case 'decor':
                if(object.components && object.components.length > 0){
                    object.components.forEach((c)=>{
                        switch(c.t){
                            case 'rotating':
                                switch(c.a){
                                    case 'x':
                                        entity.addComponent(new KeepRotatingComponent(Quaternion.Euler(c.v,0,0)))
                                        break;
                                    case 'y':
                                        entity.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,c.v,0)))
                                        break;
                                    case 'z':
                                        entity.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,0,c.v)))
                                        break;
                                }
                                break;
                                case 'scaling':
                                    switch(c.a){
                                        case 'x':
                                            entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (c.v,6,6),1, () => {
                                                entity.addComponentOrReplace(new ScaleTransformComponent(new Vector3 (c.v,6,6),startSize,1))
                                            }))
                                            break;
                                        case 'y':
                                            entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (6,c.v,6),1, () => {
                                                entity.addComponentOrReplace(new ScaleTransformComponent(new Vector3 (6,c.v,6),startSize,1))
                                            }))
                                            break;
                                        case 'z':
                                            entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (6,6,c.v),1, () => {
                                                entity.addComponentOrReplace(new ScaleTransformComponent(new Vector3 (6,6,c.v),startSize,1))
                                            }))
                                            break;
                                    }
                                    break;
                                    case 'moving':
                                        switch(c.a){
                                            case 'x':
                                                // entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (c.v,6,6),1))
                                                break;
                                            case 'y':
                                                // entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (1,c.v,1),1))
                                                break;
                                            case 'z':
                                                // entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (1,1,c.v),1))
                                                break;
                                        }
                                        break;
                                        
                        }
                    })
                }
                break;
                case 'platform':
                    if(object.components && object.components.length > 0){
                        object.components.forEach((c)=>{
                            switch(c.t){
                                case 'rotating':
                                    switch(c.a){
                                        case 'x':
                                            entity.addComponent(new KeepRotatingComponent(Quaternion.Euler(c.v,0,0)))
                                            break;
                                        case 'y':
                                            entity.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,c.v,0)))
                                            break;
                                        case 'z':
                                            entity.addComponent(new KeepRotatingComponent(Quaternion.Euler(0,0,c.v)))
                                            break;
                                    }
                                    break;
                                    case 'scaling':
                                        switch(c.a){
                                            case 'x':
                                                entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (c.v,1,1),1))
                                                break;
                                            case 'y':
                                                entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (1,c.v,1),1))
                                                break;
                                            case 'z':
                                                entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (1,1,c.v),1))
                                                break;
                                        }
                                        break;
                                        case 'moving':
                                            switch(c.a){
                                                case 'x':
                                                    entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (c.v,1,1),1))
                                                    break;
                                                case 'y':
                                                    entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (1,c.v,1),1))
                                                    break;
                                                case 'z':
                                                    entity.addComponent(new ScaleTransformComponent(startSize, new Vector3 (1,1,c.v),1))
                                                    break;
                                            }
                                            break;
                                            
                            }
                        })
                    }
                    break;
        }

        engine.addEntity(entity)
        hud.attachToEntity(entity)
    })
}