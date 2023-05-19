import { neat } from "dcl-neat"
import resources from "./resources"
import { hud } from "@dcl/builder-hud"
import { KeepRotatingComponent } from "@dcl/ecs-scene-utils"


export function createParty(){

    addFloor()
    addNeat()
    addObjects()

}

function addFloor(){

    let lsgrounds:any = [
        new Vector3(8,0,8),
        new Vector3(24,0,8),
        new Vector3(8,0,24),
        new Vector3(24,0,24),
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
                        }
                    })
                }
                break;
        }

        engine.addEntity(entity)
        hud.attachToEntity(entity)
    })
}