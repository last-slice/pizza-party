import * as ui from '@dcl/ui-scene-utils'
import { MENUS } from '../helpers/types'
import { DominosManager } from './manager'
//import * as f from './functions'
//import * as crypto from '@dcl/crypto-scene-utils'
// import { socket } from './socket'
// import { player, Scene } from './data'
// import { startTracking } from './tracking'



export class Prompts {

  manager:DominosManager

  alreadyorderedprompt:ui.CustomPrompt
  checkStoresPrompt:ui.CustomPrompt
  americanPrompt:ui.CustomPrompt
  notslicer:ui.CustomPrompt
  addressPrompt:ui.CustomPrompt
  citystateprompt:ui.CustomPrompt
  stateprompt:ui.CustomPrompt
  zipprompt:ui.CustomPrompt
  errorprompt:ui.CustomPrompt
  phoneprompt:ui.CustomPrompt
  notWeb3:ui.CustomPrompt
  paymentType:ui.CustomPrompt

  constructor(manager:DominosManager){
    this.manager = manager

    this.paymentType = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.paymentType.addText("Choose a Payment Type", 0, 100)
    this.paymentType.addText("Price: ", 100,20, Color4.Red())
    this.paymentType.addText("Price: ", 100,-30, Color4.Red())
    this.paymentType.addText("Price: ", 100,-80, Color4.Red())

    this.paymentType.addText("Price: ", 100,0, Color4.Black())
    this.paymentType.addText("Price: ", 100,-50, Color4.Black())
    this.paymentType.addText("Price: ", 100,-100, Color4.Black())

    this.paymentType.addButton(
      'PEPE',
      -150,
      0,
      () => {
        this.paymentType.hide()
        this.manager.player.paymentType = "pepe"
        this.manager.menus.summary.updateTotal(this.manager.player.order.pepePrice.toLocaleString(), "PEPE")
        //addressPrompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )

    this.paymentType.addButton(
      'L1 MANA',
      -150,
      -50,
      () => {
        this.paymentType.hide()
        this.manager.player.paymentType = "1mana"
        this.manager.menus.summary.updateTotal(this.manager.player.order.manaPrice, "L1 MANA")
        //addressPrompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )

    this.paymentType.addButton(
      'L2 MANA',
      -150,
      -100,
      () => {
        this.paymentType.hide()
        this.manager.player.paymentType = "2mana"
        this.manager.menus.summary.updateTotal(this.manager.player.order.manaPrice, "L2 MANA")
        //addressPrompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )


    this.alreadyorderedprompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.alreadyorderedprompt.addText("You've already placed an order\nwith the kiosk.", 0, 0, undefined, 25)

    this.checkStoresPrompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.checkStoresPrompt.addText("Check for delivery locations nearby\nbefore you can place a bid", 0, 100)
    this.checkStoresPrompt.addButton(
      'Ok',
      0,
      0,
      () => {
        this.checkStoresPrompt.hide()
        //addressPrompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )



    this.americanPrompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,undefined,undefined, true)
    this.americanPrompt.addText("Limited to the United States \n(for now)", 0, 100)
    this.americanPrompt.addButton(
      'Ok',
      0,
      0,
      () => {
        this.americanPrompt.hide()
      },
      ui.ButtonStyles.ROUNDBLACK
    )


    this.notslicer = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.notslicer.addText("Not a Last Slice NFT Holder", 0, 100)
    this.notslicer.addButton(
      'Try Again',
      0,
      0,
      () => {
        this.notslicer.hide()
        //addressPrompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.notslicer.addButton(
      'Close',
      0,
      0,
      () => {
        this.notslicer.hide()
        this.notslicer.elements[2].hide()
        this.notslicer.elements[1].show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.notslicer.elements[2].hide()

    this.notWeb3 = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.notWeb3.addText("No web3 wallet enabled", 0, 100)
    this.notWeb3.addButton(
      'Try Again',
      0,
      0,
      () => {
        this.notslicer.hide()
        //addressPrompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.notWeb3.addButton(
      'Close',
      0,
      0,
      () => {
        this.notWeb3.hide()
        this.notWeb3.elements[2].hide()
        this.notWeb3.elements[1].show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.notWeb3.elements[2].hide()


    this.addressPrompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.addressPrompt.addText("Please verify delivery is available\nfor your address before ordering", 0, 100)
    this.addressPrompt.addText("(eg. 123 USA Lane)", 0, 50)
    let address = this.addressPrompt.addTextBox(0,0,"street address",()=>{
      this.manager.player.street = address.currentText
    })
    this.addressPrompt.addButton(
      'Go Back',
      -100,
      -100,
      () => {
        this.addressPrompt.hide()
        //phoneprompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.addressPrompt.addButton(
      'Next',
      100,
      -100,
      () => {
        this.addressPrompt.hide()
        this.citystateprompt.show()
      },
      ui.ButtonStyles.RED
    ) 


    this.citystateprompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.citystateprompt.addText("Please enter your city", 0, 100)
    this.citystateprompt.addText("(eg. New York)", 0, 50)
    let citystate = this.citystateprompt.addTextBox(0,0,"city",()=>{
      this.manager.player.city = citystate.currentText
    })
    this.citystateprompt.addButton(
      'Go Back',
      -100,
      -100,
      () => {
        this.citystateprompt.hide()
        this. addressPrompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.citystateprompt.addButton(
      'Next',
      100,
      -100,
      () => {
        this.citystateprompt.hide()
        this.stateprompt.show()
      },
      ui.ButtonStyles.RED
    ) 



    this.stateprompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.stateprompt.addText("Please enter your state", 0, 100)
    this.stateprompt.addText("(eg. NY)", 0, 50)
    let statep = this.stateprompt.addTextBox(0,0,"state",()=>{
      this.manager.player.state = statep.currentText
    })
    this.stateprompt.addButton(
      'Go Back',
      -100,
      -100,
      () => {
        this.stateprompt.hide()
        this.citystateprompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.stateprompt.addButton(
      'Next',
      100,
      -100,
      () => {
        this.stateprompt.hide()
        this.zipprompt.show()
      },
      ui.ButtonStyles.RED
    ) 

    this.zipprompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.zipprompt.addText("Please enter your zip", 0, 100)
    this.zipprompt.addText("(eg. 12345)", 0, 50)
    let zipp = this.zipprompt.addTextBox(0,0,"zip",()=>{
      this.manager.player.zip = zipp.currentText
    })
    this.zipprompt.addButton(
      'Go Back',
      -100,
      -100,
      () => {
        this.zipprompt.hide()
        this.stateprompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.zipprompt.addButton(
      'Next',
      100,
      -100,
      async () => {
        if(this.manager.player.zip != "" || "zip"){
          this.manager.player.finishedInput = true
          this.zipprompt.hide()
  
          this.manager.buildAddress()
        }
      },
      ui.ButtonStyles.RED
    ) 

    this.errorprompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.errorprompt.addText("Error", 0, 100)
    this.errorprompt.addButton(
      'Try Again',
      0,
      0,
      () => {
        this.errorprompt.hide()
        this.addressPrompt.show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.errorprompt.addButton(
      'Close',
      0,
      0,
      () => {
        this.errorprompt.hide()
        this.errorprompt.elements[2].hide()
        this.errorprompt.elements[1].show()
      },
      ui.ButtonStyles.ROUNDBLACK
    )
    this.errorprompt.elements[2].hide()

    this.phoneprompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
    this.phoneprompt.addText("Enter your phone number for order tracking (optional)", 0, 100)
    this.phoneprompt.addText("(eg. 1112223333)", 0, 50)
    let phonpe = this.phoneprompt.addTextBox(0,0,"phone number",()=>{
      this.manager.player.phone = phonpe.currentText
    })
    this.phoneprompt.addButton(
      'Skip',
      -100,
      -100,
      () => {
        //lnameprompt.show()
        this.phoneprompt.hide()
        try{
          //await crypto.mana.send(scene.paymentAddress, order.totalMana, true).then(()=>{
            // f.confirmOrder()
          //})
          this.manager.confirmOrder(false)
        }
        catch(e){
            log('canceled')
            this.manager.player.currentMenu = MENUS.SUMMARY
            this.manager.menus.transaction.updateMenu("")
            this.manager.menus.transaction.hideMenu()
            this.manager.menus.summary.show()
            //f.showCurrentMenu()
        }
      },
      ui.ButtonStyles.ROUNDBLACK
    )

    this.phoneprompt.addButton(
    'Save',
    100,
    -100,
    async () => {
      if(this.manager.isValidPhone()){
        this.phoneprompt.hide()
      //addressPrompt.show()

        //this.manager.socket.send(JSON.stringify({command: "phone", address: this.manager.player.address.toLowerCase(), phone: this.manager.player.phone}))
        try{
          //await crypto.mana.send(scene.paymentAddress, order.totalMana, true).then(()=>{
              this.manager.confirmOrder(true)
          //})
      }
      catch(e){
          log('canceled')
          this.manager.player.currentMenu = MENUS.SUMMARY
          this.manager.menus.transaction.updateMenu("")
          this.manager.menus.transaction.hideMenu()
          this.manager.menus.showCurrentMenu()
      }
    
      }
      else{
        let pp = this.phoneprompt.elements[2] as ui.CustomPromptTextBox
        pp.fillInBox.value = "please enter valid number"

        let p1 = (this.phoneprompt.elements[0] as ui.CustomPromptText)
        p1.text.value = "Please enter valid number"
      }
    },
    ui.ButtonStyles.RED
  ) 
  }

  showCantDeliver(data?:string){
    this.errorprompt.show()
    let t = (this.errorprompt.elements[0] as ui.CustomPromptText)
    t.text.value = data
      this.errorprompt.elements[2].show()
  }

  hideAllPrompts(){
    this.alreadyorderedprompt.hide()
    this.checkStoresPrompt.hide()
    this.americanPrompt.hide()
    this.notslicer.hide()
    this.addressPrompt.hide()
    this.citystateprompt.hide()
    this.zipprompt.hide()
    this.errorprompt.hide()
    this.phoneprompt.hide()
  }
    
}




/*
this. fnameprompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
fnameprompt.addText("Please enter your first name", 0, 100)
fnameprompt.addText("(eg. Bob)", 0, 50)
let firstNamea = fnameprompt.addTextBox(0,0,"first name",()=>{
  player.first = firstNamea.currentText
})
fnameprompt.addButton(
  'Cancel',
  -100,
  -100,
  () => {
    fnameprompt.hide()
  },
  ui.ButtonStyles.ROUNDBLACK
)
fnameprompt.addButton(
  'Next',
  100,
  -100,
  () => {
    fnameprompt.hide()
    lnameprompt.show()
  },
  ui.ButtonStyles.RED
) 

this. lnameprompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT,500,300, true)
lnameprompt.addText("Please enter your last name", 0, 100)
lnameprompt.addText("(eg. Smith)", 0, 50)
let lastnama = lnameprompt.addTextBox(0,0,"last name",()=>{
  player.last = lastnama.currentText
})
lnameprompt.addButton(
  'Go Back',
  -100,
  -100,
  () => {
    fnameprompt.show()
    lnameprompt.hide()
  },
  ui.ButtonStyles.ROUNDBLACK
)
lnameprompt.addButton(
  'Next',
  100,
  -100,
  () => {
    lnameprompt.hide()
    phoneprompt.show()
  },
  ui.ButtonStyles.RED
) 
*/


















