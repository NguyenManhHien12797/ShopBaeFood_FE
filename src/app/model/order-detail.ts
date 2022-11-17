import {Product} from "./product";
import {Order} from "./order";

export class OrderDetail {
  "id": number;
  "product": Product;
  "order": Order;
  "quantity":number;


  constructor(product: Product, order: Order, quantity: number) {
    this.product = product;
    this.order = order;
    this.quantity = quantity;
  }
}
