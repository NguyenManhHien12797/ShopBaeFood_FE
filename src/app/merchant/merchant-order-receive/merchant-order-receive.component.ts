import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import {IOrder} from "../../model/iorder";

@Component({
  selector: 'app-merchant-order-receive',
  templateUrl: './merchant-order-receive.component.html',
  styleUrls: ['./merchant-order-receive.component.css']
})
export class MerchantOrderReceiveComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrder();
  }
  orders: IOrder[] = [];
  getOrder(){
    this.orderService.getOrder().subscribe(data =>{
      console.log(data);
      this.orders = data.filter(value => value.status === 'receive')
      console.log(this.orders)
    })
  }
}
