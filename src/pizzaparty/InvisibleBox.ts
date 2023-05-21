import { hud } from '@dcl/builder-hud'
import * as utils from '@dcl/ecs-scene-utils'
export class InvisibleBox extends Entity{

    constructor(){
        super()
        this.addComponent(new Transform({position: new Vector3(0,0,0)}))

        this.addComponent(new utils.TriggerComponent(new utils.TriggerBoxShape(new Vector3(1,5,1), Vector3.Zero()),{
          enableDebug: false,
          onCameraExit:()=> {
          },
        }))

        let floor = new Entity()
        floor.addComponent(new PlaneShape())
        floor.addComponent(hud.transparentMat)
        floor.addComponent(new Transform({position: new Vector3(0,0,0), rotation: Quaternion.Euler(90,0,0)}))
        floor.setParent(this)

        let wall1 = new Entity()
        wall1.addComponent(new PlaneShape())
        wall1.addComponent(hud.transparentMat)
        wall1.addComponent(new Transform({position: new Vector3(0,.4,.5), scale: new Vector3(2,.7,1), rotation: Quaternion.Euler(0,0,0)}))
        wall1.setParent(this)

        let wall2 = new Entity()
        wall2.addComponent(new PlaneShape())
        wall2.addComponent(hud.transparentMat)
        wall2.addComponent(new Transform({position: new Vector3(.5,.4,0), scale: new Vector3(2,.7,1), rotation: Quaternion.Euler(0,90,0)}))
        wall2.setParent(this)

        let wall3 = new Entity()
        wall3.addComponent(new PlaneShape())
        wall3.addComponent(hud.transparentMat)
        wall3.addComponent(new Transform({position: new Vector3(-.5,.4,0), scale: new Vector3(2,.7,1), rotation: Quaternion.Euler(0,90,0)}))
        wall3.setParent(this)

        let wall4 = new Entity()
        wall4.addComponent(new PlaneShape())
        wall4.addComponent(hud.transparentMat)
        wall4.addComponent(new Transform({position: new Vector3(0,.4,-.5), scale: new Vector3(2,.7,1), rotation: Quaternion.Euler(0,0,0)}))
        wall4.setParent(this)
      }
}