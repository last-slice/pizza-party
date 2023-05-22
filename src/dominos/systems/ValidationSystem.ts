import { signedFetch } from "@decentraland/SignedFetch"
import { Player } from "../components/player"
import { DominosManager } from "../components/manager"
import config from "../helpers/config"


export class ValidationSystem {

    player:Player
    manager:DominosManager

    base:number = 5
    timer:number = 5
    invalidCounter:number = 0
  
    constructor(player:Player, manager:DominosManager){
        this.player = player
        this.manager = manager
        engine.addSystem(this)
    }

    async update(dt: number) {
        if (this.timer > 0) {
          this.timer -= dt
        } else {
          this.timer = this.base
                try {
                  //if(this.player.dclData.hasConnectedWeb3){
                    if(this.invalidCounter < 10){
                    const response = await signedFetch((config.DEBUG ? config.endpoints.baseLocal : "") + config.endpoints.validate)
                    let json

                    if (response.text) {
                      json = await JSON.parse(response.text)
                      log(json)
                    }
                    if (json && json.valid) {
                      log("we have valid request", json)
                      engine.removeSystem(this)
                      this.manager.init()
                    }
                    else{
                      log('invalid request =>', json.reason)
                      this.invalidCounter++
                    }
                  }
                  else{
                    engine.removeSystem(this)
                  }
                // }
                // else{
                //   engine.removeSystem(this)
                //   this.manager.ui.showMessage("Cant Validate Position", 4)
                // }
                } catch (error) {
                  log(error)
                }
        }
      }
    }