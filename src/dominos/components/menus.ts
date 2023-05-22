import config from "../helpers/config";
import { MENUS } from "../helpers/types";
import { DominosManager } from "./manager";
import { AmericanMenu } from "./menus/americanMenu";
import { CategoriesMenu } from "./menus/CategoriesMenu";
import { OrderedMenu } from "./menus/orderedMenu";
import { ReviewMenu } from "./menus/ReviewMenu";
import { SauceMenu } from "./menus/SauceMenu";
import { StartMenu } from "./menus/StartMenu";
import { SummaryMenu } from "./menus/SummaryMenu";
import { ToppingsMenu } from "./menus/ToppingsMenu";
import { TransactionMenu } from "./menus/TransactionMenu";


export class Menus {

    manager:DominosManager

    sauces:SauceMenu
    categories:CategoriesMenu
    toppings:ToppingsMenu
    review:ReviewMenu
    transaction:TransactionMenu
    summary:SummaryMenu
    start:StartMenu
    orderd:OrderedMenu
    american:AmericanMenu


    constructor(manager:DominosManager){
        this.manager = manager

        this.sauces = new SauceMenu(config.SAUCES, this.manager)
        this.categories = new CategoriesMenu(config.CATEGORIES, this.manager)
        this.toppings = new ToppingsMenu(config.TOPPINGS, this.manager)
        this.review = new ReviewMenu([], this.manager)
        this.transaction = new TransactionMenu([], this.manager)
        this.summary = new SummaryMenu([], this.manager)
        this.start = new StartMenu([], this.manager)
        this.orderd = new OrderedMenu([], this.manager)
        this.american = new AmericanMenu([], this.manager)

    }

    hideAll(){
      this.sauces.hideMenu()
      this.categories.hideMenu()
      this.toppings.hideMenu()
      this.review.hideMenu()
      this.transaction.hideMenu()
      this.summary.hideMenu()
      this.start.hideMenu()
      this.orderd.hideMenu()
      this.american.hideMenu()
    }

    showCurrentMenu(){
        switch(this.manager.player.currentMenu){
          case MENUS.AMERICAN:
              this.manager.menus.american.show()
            break;
          case MENUS.CATEGORIES:
              this.manager.menus.categories.show()
            break;
          case MENUS.SAUCES:
              this.manager.menus.sauces.show()
            break;
      
          case MENUS.TOPPINGS:
              this.manager.menus.toppings.show()
            break;
      
          case MENUS.REVIEW:
              this.manager.menus.review.show()
            break;
      
          case MENUS.TRANSACTION:
          case MENUS.PENDING:
              this.manager.menus.review.show()
            break;
      
          case MENUS.SUMMARY:
              this.manager.menus.summary.show()
            break;
      
          case MENUS.ORDERED:
              this.manager.menus.orderd.show()
            break;
      
          case MENUS.START:
              this.manager.menus.start.show()
            break;
        }
      }
    
}