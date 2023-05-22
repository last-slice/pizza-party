//
// IMPORTANT :
// - include `noLib: false` to your tsconfig.json file, under "compilerOptions"
//
///<reference lib="es2015.symbol" />
///<reference lib="es2015.symbol.wellknown" />
///<reference lib="es2015.collection" />
///<reference lib="es2015.iterable" />

import { Client, Room } from "colyseus.js"

import * as crypto from '@dcl/crypto-scene-utils'
import * as l2 from '@dcl/l2-scene-utils'
import * as ethConnect from 'eth-connect'

import * as ui from '@dcl/ui-scene-utils'
import config from "../helpers/config";
import { MENUS } from '../helpers/types';
import { Kiosk } from "./kiosk";
import { Menus } from './menus';
import { Player } from "./player";
import { Prompts } from "./prompts";
import { UIManager } from "./uiManager";
import { createComponents } from '../helpers/blockchain/index';
import { TrackingUI } from './trackingUI';
import { getCurrentRealm, isPreviewMode } from '@decentraland/EnvironmentAPI';

export class DominosManager {

    player:Player
    ui:UIManager
    prompts:Prompts
    menus:Menus
    trackingUI:TrackingUI
    kiosk:Kiosk

    socket:any

    colyseusClient:Client
    colyseusRoom:Room


    constructor(player:Player, ui:UIManager){
        this.player = player
        this.ui = ui
        this.prompts = new Prompts(this)

        this.kiosk = new Kiosk(this)
        this.menus = new Menus(this)
        this.trackingUI = new TrackingUI(this)

        this.colyseusClient = new Client(config.DEBUG ? config.endpoints.angzaarWSStest : config.endpoints.angzaarWSSProd)

    }
    

    getOrderStatus(){
      return this.player.ordered  
    }



    async init(){
        try{
            await this.getAuthtoken()
        }
        catch(e){
            log('get auth error ->', e)

            if(e == "Not Active"){
                this.ui.showMessage("Scene not active", 5)
            }
            else{
            }
        }

    }

    addPrompts(prompts:Prompts){
        this.prompts = prompts
    }

    async getAuthtoken(){
        // const response = await signedFetch((config.DEBUG ? config.endpoints.baseLocal : "") + config.endpoints.authorize + this.player.dclData.userId)
        // let json

        // if (response.text) {
        //   json = await JSON.parse(response.text)
        //   log(json)
        // }
        // if (json && json.valid) {
        //     log('we get a token', json.auth)
        //     this.player.auth = json.auth
        //     this.player.isAmerican = json.isAmerican

        //     if(!json.isActive){
        //         log('json is not active')
        //         this.ui.status.value = ""
        //         this.ui.showMessage("Kiosk Not Active", 7)
        //     }

        //     await this.getPlayerDiscounts()

        //     await this.connectWSS()
        // }
        // else{
        //   log('invalid request =>', json.msg)
        //   this.ui.status.value = "" + json.msg
        //   throw new Error("Get Auth token Error -> " + json.msg)
        // }

        //await this.connectWSS()
        await this.connectColyesusRooms()
    }

    async connectColyesusRooms(reconnect?:boolean){
      log('connecting to colyseus')
      let options:any = {}
      const realm = await getCurrentRealm()
      const isPreview = await isPreviewMode()

      options.auth = this.player.auth

      if (isPreview) {
          options.realm = 'LocalPreview'
        } else {
          options.realm = realm?.displayName
        }

      //options.realm = realm ? realm.displayName + `-` + realm.room : null
      options.userData = this.player.dclData
      // options.slicer = this.player.isSlicer

      try{
      this.colyseusRoom = await this.colyseusClient.joinOrCreate<any>('dominos_room', options)
      this.player.colyseusSessionId = this.colyseusRoom.sessionId
  
      log('colyseus player session is ', this.player.colyseusSessionId)
  
          if(reconnect){
              log('trying to reconnect to server')
          }
          else{
          }

          this.addListeners()

  
          }
          catch(e:any){
              log('auth error', e)
              if(e.code == 4215){
                  log('we have an auth error, need to get a new key')
                  //this.reAuth()
              }
          }
  }

    // async connectWSS(){
    //   this.socket = new WebSocket((config.DEBUG ? config.endpoints.ws : config.endpoints.wss) + "/?auth=" + this.player.auth + "&user=" + this.player.dclData.userId)

    //   let self = this

    //   this.socket.onopen = (ev:any) => {
    //       log('connected to websocket', ev.id)
    //       log('player is', this.player.dclData)
    //       this.socket.send(JSON.stringify({ action: "join", auth:this.player.auth, name: this.player.dclData.userId }));
    //   }
  
    //   this.socket.onclose = (ev:any) => {
    //       log('disconnected to websocket')
    //   }
      
    //   this.socket.onmessage = function (event:any) {
    //       if (event.data === '__ping__') {
    //         log('ping ponging')
    //           self.socket.send(JSON.stringify({keepAlive: self.player.dclData.userId}));
    //       }
    //       else{
    //           const parsed = JSON.parse(event.data)
    //           log(parsed)
  
    //           switch(parsed.command){
    //             case 'error':
    //               log('we have a wss error', parsed.message)
    //               ui.displayAnnouncement(parsed.message)
    //               break;
    //               case 'init':
    //                 log('received init command')
    //                 self.ui.status.value = ""
    //                 if(parsed.isActive){  
    //                   log('id is', parsed.id)
    //                   self.player.uuid = parsed.id
    //                   self.player.virtualFee = parsed.fee
    //                   self.player.paymentAddress = parsed.paymentAddress

    //                   log('payment address is', self.player.paymentAddress)
    //                   self.kiosk.buildKiosk()
    //                 }
    //                 else{
    //                   self.ui.status.value = "Kiosk is offline"
    //                 }
    //                 break;

    //               case 'announcement':
    //                 ui.displayAnnouncement(parsed.message, parsed.time)
    //                   break;

    //               case 'stores':
    //               if(parsed.valid) {
    //                 self.player.checkedStores = true

    //               if(parsed.stores.length > 0){
    //                 log(parsed.stores)

    //                 self.player.canDeliver = true
    //                 //menu.addStores(json.stores)
              
    //                 self.player.store = parsed.stores[0]
    //                 self.menus.categories.show()                
    //               }
    //               else{
    //                 log('no stores open')
    //                 self.player.canDeliver = false
    //                 self.prompts.showCantDeliver("No open stores within 25 miles of your address")
    //               }
    //               }
    //               else{
    //                 log('invalid request =>')
    //                 throw new Error("Get Nearby Stores Error -> ")
    //               }
  
    //                 break;

    //               case 'pricedorder':
    //                 log('received order pricing')
    //                 if(parsed.valid){
    //                   log(parsed.order)
    //                   self.updateOrderDetails(parsed.order)
    //                 }
    //                 else{
    //                   log('we have a price error')
    //                 }
    //                 break;

    //               case 'togglestatus':
    //                 log('toggling kiosk status')
    //                 if(parsed.status){
    //                   self.ui.status.value = ""
    //                   !self.kiosk.parent.isAddedToEngine() ? self.kiosk.buildKiosk() : null
    //                 }
    //                 else{
    //                   self.ui.status.value = "Kiosk is offline"
    //                   self.kiosk.parent.isAddedToEngine() ? engine.removeEntity(self.kiosk.parent) : null
    //                 }
    //                 break;

    //               case 'orderplaced':
    //                 log('order placed message received')
    //                 if(parsed.status){
    //                   ui.displayAnnouncement("order success!")
    //                   self.menus.hideAll()
    //                   self.menus.orderd.show()
    //                 }
    //                 else{
    //                   log('there was an order error', parsed.error)
    //                 }
    //                 //this.menus.transaction.updateMenu("Order Placed!")
    //                 break;

    //               case 'tracking':
    //                 log('tracking info for ' + parsed.id, parsed.status)
    //                 if(parsed.user )
    //                   self.trackingUI.showTracking(parsed.id, parsed.status, parsed.driver)
    //                 break
    //           }
    //       }
    //   }
    // }

    async priceChoice(){
      let val = this.prompts.paymentType.elements[1] as ui.CustomPromptText
      val.text.value = "Cost: " + this.player.order.pepePrice.toLocaleString() + " PEPE"

      let bal = this.prompts.paymentType.elements[4] as ui.CustomPromptText
      bal.text.value = "Balance: " + (this.player.balances.pepe / Math.pow(10,18)).toLocaleString() + " PEPE"

      let val2 = this.prompts.paymentType.elements[2] as ui.CustomPromptText
      val2.text.value = "Cost: " + this.player.order.manaPrice + " MANA"

      let bal2 = this.prompts.paymentType.elements[5] as ui.CustomPromptText
      bal2.text.value = "Balance: " +  parseInt(new ethConnect.BigNumber(ethConnect.fromWei(this.player.balances.mana, "ether")).toFormat(4)) + " MANA"

      let val3 = this.prompts.paymentType.elements[3] as ui.CustomPromptText
      val3.text.value = "Cost: " + this.player.order.manaPrice + " MANA"

      let bal3 = this.prompts.paymentType.elements[6] as ui.CustomPromptText
      bal3.text.value = "Balance: " +  parseInt(new ethConnect.BigNumber(ethConnect.fromWei(this.player.balances.mana2, "ether")).toFormat(4)) + " MANA"

      this.prompts.paymentType.show()
    }

    async getBalances(){
      executeTask(async () => {
          this.player.balances.pepe = await crypto.currency.balance('0x6982508145454ce325ddbe47a25d4ec3d2311933', this.player.dclData.userId)

          this.player.balances.mana = await crypto.mana.myBalance()

          const { mana } = await createComponents();
          this.player.balances.mana2 = await mana.balance();
      })
    }

    balanceCheck(){
      let acceptable = false
     //let acceptable = true
      switch(this.player.paymentType){
        case 'pepe':
          log('pepe balance check', +this.player.order.pepePrice, (this.player.balances.pepe / Math.pow(10,18)))
          acceptable =  (this.player.balances.pepe / Math.pow(10,18)) >= this.player.order.pepePrice
          break;

        case '1mana':
          acceptable =  parseInt(new ethConnect.BigNumber(ethConnect.fromWei(this.player.balances.mana, "ether")).toFormat(0)) >= this.player.order.manaPrice
          break;

        case '2mana':
          acceptable = parseInt(new ethConnect.BigNumber(ethConnect.fromWei(this.player.balances.mana2, "ether")).toFormat(0)) >= this.player.order.manaPrice
          break;
      }
      if (!acceptable){
        new ui.OkPrompt("Sorry, you do not have enough currency", undefined, undefined, true);
        return;
      }
      else{
        this.prompts.phoneprompt.show()
      }
    }

    async confirmOrder(tracking:boolean){
      log('do we have tracking', tracking)
      this.menus.summary.hideMenu()
      this.menus.transaction.updateMenu("Confirm Paying \n" + this.player.order.totalMana + " MANA")
      this.menus.transaction.show()

      let layer:number =0


      let tx:any



      //for testing hard cod the tx
      //let tx:any = "0xcdd01645b241e3548b524fdbf2749ea98c5e2fbf8ccf309155330e26b7e8b19e"

      try{
        switch(this.player.paymentType){
          case 'pepe':
            layer = 1
            tx = await crypto.currency.send('0x6982508145454ce325ddbe47a25d4ec3d2311933', this.player.paymentAddress, this.player.order.pepePrice * Math.pow(10,18), true)
            break;

          case '1mana':
            layer = 2
            tx = await crypto.mana.send(this.player.paymentAddress, this.player.order.manaPrice, true)
            break;

          case '2mana':
            layer = 2
            const {mana} = await l2.createComponents()
            tx = await mana.transfer("" + this.player.paymentAddress, new ethConnect.BigNumber(ethConnect.toWei(this.player.order.manaPrice, 'ether')))
              break;
          }
          this.processOrder(tx, tracking, layer)
        }
          catch(e){
            log('confirm error is => ', e)
            this.menus.transaction.hideMenu()
            this.menus.summary.show()
        }
    }

    processOrder(tx:any, tracking:boolean, layer:number){
      this.menus.transaction.updateMenu("Processing Payment...")
      log('tx is ', tx)
      log('phone is', this.player.phone)
      //this.socket.send(JSON.stringify({action: 'process', tx:tx, tracking: tracking ? true : false, phone: tracking ? this.player.phone: null}))
      this.colyseusRoom.send('process', {tx:tx, tracking: tracking ? true : false, phone: tracking ? this.player.phone : null, layer:layer})  
    
    }

    async updateOrderDetails(order:any){
      let spots = await this.fetchManaSpotPrice(order.amountsBreakdown.customer)
      this.player.order.foodPrice = order.amountsBreakdown.foodAndBeverage
      this.player.order.deliveryFee = order.amountsBreakdown.deliveryFee
      this.player.order.taxFee = order.amountsBreakdown.tax
      this.player.order.subtotal = order.amountsBreakdown.customer
      this.player.order.manaPrice = Math.ceil(this.player.order.subtotal / spots.dcl)
      this.player.order.pepePrice = this.player.order.subtotal / spots.pepe
      this.player.order.totalMana = this.player.order.manaPrice + Math.ceil(this.player.virtualFee / spots.dcl)

      log('order info is', this.player.order)
      

      this.menus.transaction.hideMenu()
      
      this.player.currentMenu = MENUS.SUMMARY
      this.menus.summary.updateMenu() 
      this.menus.showCurrentMenu()
      //order.orderDescription = order.pizzaType == "C" ? "1 Large Hand Tossed Cheese Pizza" : "1 Large Hand Tossed Pepperoni Pizza"
      //menu.menu = "Summary"
      //menu.show("Summary", {player:player, order:order})

      await this.getBalances()
    }

    async getPlayerDiscounts(){

      this.player.hasDiscounts = true

        // if(this.player.dclData.hasConnectedWeb3){

        //     try{
        //         let discountRes = await fetch((config.DEBUG ? config.endpoints.baseLocal : "") + config.endpoints.discounts )
        //         let discountJson = await discountRes.json()

        //         let discountList = discountJson.data

        //         // discountList.forEach(async (address:string) => {
        //         //     if(await crypto.nft.checkTokens(address)){
        //         //         this.player.hasDiscounts = true
        //         //         return
        //         //     }
        //         // });
        //     }
        //     catch(e){
        //         log('try catch error for getting discounts')
        //     }
        // }
    }

    async buildAddress(){
      this.player.address = this.player.street + ", " + this.player.city + ", " + this.player.state + ", " + this.player.zip

        if(await this.verifyAddress()){
            await this.fetchAvailableStores()
        }
        else{
          this.prompts.errorprompt.show()
          let ee = (this.prompts.errorprompt.elements[0] as ui.CustomPromptText)
          ee.text.value = "Address Error"
        }
    }

    async verifyAddress(){
        var verified = false
        
        var params = {
            street:this.player.street.trim(),
            city:this.player.city.trim(),
            state:this.player.state.trim(),
            zip:this.player.zip.trim()
        }
        let url = (config.DEBUG ? config.endpoints.angzaarWSStest : config.endpoints.angzaarWSSProd) + '/verifyaddress'
        log(url)
            let response = await fetch(url,
                {headers: { "Content-Type": "application/json" },
                  method: "POST",
                  body:JSON.stringify(params)})
        let json = await response.json()
        log(json)
        if(json.result == "success"){
          if(json.isVerified){
            verified = true
          }
        }
        
        return verified
    }

    async fetchAvailableStores(){ 
      //this.socket.send(JSON.stringify({action:'getstores', id:this.player.uuid, name: this.player.dclData.userId, address: this.player.address }))
      this.colyseusRoom.send('getstores', {id:this.player.dclData.userId, address:this.player.address})
    }

    async fetchManaSpotPrice(subtotal:any) {
        let url = 'https://api.coingecko.com/api/v3/simple/price?ids=decentraland,pepe&vs_currencies=usd'
            let response = await fetch(url,
                {headers: { "Content-Type": "application/json" },
                  method: "GET"})
        let json = await response.json()
        log(json)
        log('spot price is ' + json.decentraland.usd)
        return {dcl: json.decentraland.usd, pepe:json.pepe.usd}
    }

    isValidPhone(){
        log(this.player.phone)
        return !isNaN(parseInt(this.player.phone))
  }


  checkUserInput(){
    log("user input")
    if(this.player.finishedInput){
      if(!this.player.canDeliver){
        log('there arent stores')
      }
      this.menus.showCurrentMenu()
  }
  else{
   log("i dont kno what prompt to show here")
  }
  }


  clearOrder(){
    this.player.order.sauce = null
    this.player.order.toppings = []
    this.player.order.pizzaType = ""
    this.player.order.description = ""
    this.player.order.foodPrice = 0
    this.player.order.deliveryFee = 0
    this.player.order.taxFee = 0
    this.player.order.subtotal = 0
    this.player.order.manaPrice = 0
    this.player.order.totalMana= 0
}

async prepOrderSummary(){

  log('prepping order summary')
  //this.socket.send(JSON.stringify({action: 'priceorder', storeId:this.player.store.StoreID, order:this.player.order, address:this.player.address, name: this.player.dclData.userId}))
  this.colyseusRoom.send('priceorder', {storeId:this.player.store.StoreID, order:this.player.order, id:this.player.dclData.userId})
}
  
  addListeners(){

    let self = this

    this.colyseusRoom.onMessage("parkour", (info)=>{
      log('received parkour message')
      switch(info.action){
        case 'success':
          log('successfully claimed parkour item')
          ui.displayAnnouncement("Your wearable reward is on the way!")
          break;

        case 'error':
          ui.displayAnnouncement(info.message)
          break;
      }
    })

    this.colyseusRoom.onMessage("tracking", (info)=>{
      log('tracking info for ' + info.id, info.status)
       self.trackingUI.showTracking(info.user == this.player.dclData.userId ? true : false, info.status, info.driver) 
   })

    this.colyseusRoom.onError((code:number, message?:string)=>{
      log('col error')
      this.player.canDeliver = false
    })

    this.colyseusRoom.onLeave((code:number, message?:string)=>{
      log('player left room')
      this.player.canDeliver = false
    })

    this.colyseusRoom.onMessage("ERROR", (info)=>{
      log('colyseus error', info.type)
         this.ui.status.value = ""
        //  this.menus.transaction.updateMenu("Sender Order to Domino's Servers...")
   })

    this.colyseusRoom.onMessage("processingpayment", (info)=>{
      log('proccesing payment')
         this.ui.status.value = "Proccesing blockchain payment..."
         //this.menus.transaction.updateMenu("Sender Order to Domino's Servers...")
   })

   this.colyseusRoom.onMessage("processingserverorder", (info)=>{
    log('proccesing processingserverorder')
       this.ui.status.value = "Sender Order to Domino's Servers..."
       this.menus.transaction.updateMenu("Sender Order to\nDomino's Servers...")
   })

    this.colyseusRoom.onMessage("togglestatus", (info)=>{
       log('toggling kiosk status')
        if(info.status){
          this.ui.status.value = ""
          !this.kiosk.parent.isAddedToEngine() ? this.kiosk.buildKiosk() : null
        }
        else{
          this.ui.status.value = "Kiosk is offline"
          this.kiosk.parent.isAddedToEngine() ? engine.removeEntity(this.kiosk.parent) : null
        }
    })

    this.colyseusRoom.onMessage("orderplaced", (info)=>{
      log('order placed message received', info)
      if(info.status){
        ui.displayAnnouncement("order success!")
        this.menus.hideAll()
        this.menus.orderd.show()
        this.player.order.id = info.id
      }
      else{
        log('there was an order error', info.error)
      }
      //this.menus.transaction.updateMenu("Order Placed!")
    })

    this.colyseusRoom.onMessage("pricedorder", (info)=>{
      log('received order pricing')
      log(info.order)
      this.updateOrderDetails(info.order)
    })

    this.colyseusRoom.onMessage("stores", (info)=>{
      log('received store info', info)
      if(info.valid) {
        this.player.checkedStores = true

      if(info.stores.length > 0){
        log(info.stores)

        this.player.canDeliver = true
        //menu.addStores(json.stores)
  
        this.player.store = info.stores[0]
        this.menus.categories.show()                
      }
      else{
        log('no stores open')
        this.player.canDeliver = false
        this.prompts.showCantDeliver("No open stores within 25 miles of your address")
      }
      }
      else{
        log('invalid request =>')
        throw new Error("Get Nearby Stores Error -> ")
      }
    })

    this.colyseusRoom.onMessage("init", (info) => {
      log("receved init", info);
    
      this.ui.status.value = ""
        if(info.isActive){  
          log('id is', info.id)
          this.player.uuid = info.id
          this.player.virtualFee = info.fee
          this.player.paymentAddress = info.paymentAddress
          this.player.isAmerican = info.isAmerican

          log('payment address is', this.player.paymentAddress)
          this.kiosk.buildKiosk()

          if(info.order && info.order.length > 0){
            this.player.ordered = true
            let order = info.order.filter((or)=> or.status == "ORDERED")[0]
            if(order){
              if(order.tracking){
                this.trackingUI.showTracking(true,order.delivery,order.driver)
              }
            }
          }
        }
        else{
          this.ui.status.value = "Kiosk is offline"
        }
    });

    this.colyseusRoom.state.players.onAdd = (player, key) => {
      log('new player info is ', player)
      if(player.address == this.player.dclData.userId){
        player.listen("ordering", (currentValue, previousValue) => {
          log(`player orders is now ${currentValue}`);
          log(`previous value was: ${previousValue}`);
          self.player.ordered = (currentValue == "true" ? true : false)
          log('player ordered is now', this.player.ordered)
        });
      }
  }

    this.colyseusRoom.state.listen("orders", (currentValue, previousValue) => {
      log(`orders is now ${currentValue}`);
      log(`previous value was: ${previousValue}`);
    });
  }



}