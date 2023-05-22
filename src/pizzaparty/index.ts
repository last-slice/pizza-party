import { neat } from "dcl-neat"
import resources from "./resources"
import { hud } from "@dcl/builder-hud"
import { KeepRotatingComponent, ScaleTransformComponent } from "@dcl/ecs-scene-utils"
import { addFlying } from "./Flying"
import * as vs from 'dcl-video-system'

export function createParty(){

    addFloor()
    addNeat()
    addObjects()
    addFlying()
    addWinBox()

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


function addWinBox(){
    let transmaterial = new Material
transmaterial.albedoColor = new Color4(0.5, 0, 0, 0)
const winBox = new Entity()
winBox.addComponent(new BoxShape())
const transform1 = new Transform({
  position: new Vector3(35.70,35,-20.96),
  scale: new Vector3(1, 1, 1),
  rotation: Quaternion.Euler(0, 210, 0)
})
winBox.addComponent(transform1)
winBox.addComponent(
  new OnPointerDown(() => {
    // getInfoandSend();
    // clickableImage.visible = true;

  },
  {
    hoverText: 'Grab Za',
    distance: 4
  }
  )
)

engine.addEntity(winBox)
}
function addNeat(){
    neat.init(
        false,  //remove the standard triangle GLB
        false,  //admin mode; allow creator to view neat locally
        false,  //hide avatars when close proximity
        true,  //auto rotation
        3,      //click distance
        {position: new Vector3(2,1,2)}, //transform arguments
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