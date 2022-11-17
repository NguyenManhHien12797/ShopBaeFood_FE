import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import {IOrder} from "../../model/iorder";

@Component({
  selector: 'app-merchant-order-send',
  templateUrl: './merchant-order-send.component.html',
  styleUrls: ['./merchant-order-send.component.css']
})
export class MerchantOrderSendComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrder();
  }
  orders: IOrder[] = [];
  getOrder(){
    this.orderService.getOrder().subscribe(data =>{
      console.log(data);
      this.orders = data.filter(value => value.status === 'send')
      console.log(this.orders)
    })
  }

}
