import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import {Order} from "../../model/order";
import {IOrder} from "../../model/iorder";

@Component({
  selector: 'app-merchant-order-pending',
  templateUrl: './merchant-order-pending.component.html',
  styleUrls: ['./merchant-order-pending.component.css']
})
export class MerchantOrderPendingComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrder();
  }
  orders: IOrder[] = [];
  getOrder(){
    this.orderService.getOrder().subscribe(data =>{
      console.log(data);
      this.orders = data.filter(value => value.status === 'pending')
      console.log(this.orders)
    })
  }
}
