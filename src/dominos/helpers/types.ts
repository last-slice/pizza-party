



export type Order = {
    sauce:any
    toppings:any[]
    pizzaType:string
    description:string
    foodPrice:number
    deliveryFee:number
    taxFee:number
    subtotal:number
    manaPrice:number
    totalMana:number
    pepePrice?:number
    roniPrice?:number
    submitted:boolean
    id?:number
}

export enum MENUS {
    AMERICAN = "AMERICAN",
    SAUCES = "SAUCES",
    CATEGORIES = "CATEGORIES",
    TOPPINGS = "TOPPINGS",
    REVIEW = "REVIEW",
    TRANSACTION = "TRANSACTION",
    PENDING = "PENDING",
    SUMMARY = "SUMMARY",
    START = "START",
    ORDERED = "ORDERED"
}