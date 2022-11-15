import {Product} from "./product";
import {AppUser} from "./appUser";

export class CartDTO {
  private quantity:number;
  private price:number;
  private totalPrice:number;
  private user_id: number;
  private product_id: number;


  constructor(quantity: number, price: number, totalPrice: number, user_id: number, product_id: number) {
    this.quantity = quantity;
    this.price = price;
    this.totalPrice = totalPrice;
    this.user_id = user_id;
    this.product_id = product_id;
  }



}
