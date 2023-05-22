export default {

    DEBUG: false,

    paymentAddress: "",

    models:{
        pizzaDisplay:new GLTFShape('src/dominos/models/pizza.glb'),
        ground:new GLTFShape('src/dominos/models/ground.glb'),
        kiosk:new GLTFShape('src/dominos/models/store.glb'),
    },

    endpoints:{ 
        baseLocal: "http://localhost:9321/dcl/dominos/",

        ws:"ws://localhost:9322/",
        wss:"",

        angzaarWSStest: "ws://localhost:2569/",
        angzaarWSSProd: "wss://lkdcl.co/dcl/dominos", //"wss://yt8vtj.colyseus.dev", //"wss://lkdcl.co/angzaar/wss",

 

        validate: "validate/",
        authorize: "authorize/",
        discounts: "discountlist/",
        getStores: "getnearbystores/"
    },


    TOPPINGS: [
        {name:"HAM",code : "H"},
        {name:"PEPPERONI",code : "P"},
        {name:"BEEF",code : "B"},
        {name:"SALAMI",code : "Sa"},
        {name:"ITALIAN_SAUSAGE",code : "S"},
        {name:"CHICKEN",code : "Du"},
        {name:"BACON",code : "K"},
        {name:"PHILLY_STEAK",code : "Pm"},
        {name:"ANCHOVIES",code : "A"},
        {name:"HOT_BUFFALO_SAUCE",code : "Ht"},
        {name:"GARLIC",code : "F"},
        {name:"JALAPENO_PEPPERS",code : "J"},
        {name:"ONIONS",code : "O"},
        {name:"BANANA_PEPPERS",code : "Z"},
        {name:"DICED_TOMATOES",code : "Td"},
        {name:"BLACK_OLIVES",code : "R"},
        {name:"MUSHROOMS",code : "M"},
        {name:"PINEAPPLE",code : "N"},
        {name:"SHREDDED_PROVOLONE",code : "Cp"},
        {name:"CHEDDAR_CHEESE",code : "E"},
        {name:"GREEN_PEPPERS",code : "G"},
        {name:"SPINACH",code : "Si"},
        {name:"ROASTED_RED_PEPPERS",code : "Rr"},
        {name:"FETA_CHEESE",code : "Fe"},
        {name:"SHREDDED_PARMESAN_ASIAGO",code : "Cs"},
        {name:"AMERICAN_CHEESE",code : "Ac"}
    ],

    SAUCES: [
        {name: "ROBUST_TOMATO", code:"X"}, 
        {name:"HEARTY_MARINARA", code:"Xm"},
        {name: "HONEY_BBQ", code:"Bq"},
        {name:"GARLIC_PARMESAN", code:"Xw"},
        {name:"ALFREDO", code:"Xf"}
    ],


    CATEGORIES:[
        {name:"Pizza", image:"src/dominos/images/cheese.png"}
    ]




}