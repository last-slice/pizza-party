import * as ui from '@dcl/ui-scene-utils'

export class UIManager {
    
    status:UIText

    constructor(){

        this.status = new UIText(ui.canvas)
        this.status.hAlign = "center"
        this.status.vAlign = "top"
        this.status.hTextAlign = "center"
        this.status.fontSize = 20
        this.status.value = "VALIDATING...PLEASE WAIT"
    }

    showMessage(message:string, duration:number){
        ui.displayAnnouncement(message, duration)
    }
}