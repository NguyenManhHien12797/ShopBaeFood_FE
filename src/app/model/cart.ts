import {Product} from "./product";
import {AppUser} from "./appUser";

export interface Cart {
  id: number;
  quantity:number;
  price:number;
  totalPrice:number;
  product: Product;
  user: AppUser;

}
