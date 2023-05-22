import { MENUS, Order } from "../helpers/types"


export class Player {

dclData:any
auth:string = ""

phone:string = ""

//address

address:string = ""
street:string = ""
city:string = ""
state:string = ""
zip:string = ""

isSlicer:boolean = false
isAmerican:boolean = false
hasDiscounts:boolean = true
finishedInput:boolean = false
checkedStores:boolean = false
canDeliver:boolean = true
ordered:boolean = false
tracking:boolean = false
droneStarted:boolean = false
storeId:number = 0

currentMenu = MENUS.CATEGORIES

order:Order
store:any

virtualFee:number = 5
paymentAddress:string = ""
paymentType:string = ""

balances:any = {
    mana:0,
    mana2:0,
    pepe:0
}

uuid=""

colyseusSessionId:string = ""

constructor(dclData:any, slicer:boolean){
    this.isSlicer = slicer
    this.dclData = dclData

    this.order = {
        sauce: "",
        toppings:[],
        pizzaType:"",
        description:"",
        foodPrice:0,
        deliveryFee:0,
        taxFee:0,
        subtotal:0,
        manaPrice:0,
        totalMana:0,
        submitted:false
    }
}
    
}