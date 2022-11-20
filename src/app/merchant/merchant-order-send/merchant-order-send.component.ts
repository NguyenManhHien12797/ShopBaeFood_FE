import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import {IOrder} from "../../model/iorder";
import {Router} from "@angular/router";

@Component({
  selector: 'app-merchant-order-send',
  templateUrl: './merchant-order-send.component.html',
  styleUrls: ['./merchant-order-send.component.css']
})
export class MerchantOrderSendComponent implements OnInit {

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.getOrder();
  }
  orders: IOrder[] = [];
  getOrder(){
    this.orderService.getOrder().subscribe(data =>{
      let merchant_id = this.getMerchantId();
      console.log("Merchant_id "+ merchant_id)
      console.log(data);
      this.orders = data.filter(value => value.status === 'Người dùng đã nhận hàng' && value.merchant_id ==merchant_id)
      console.log(this.orders)
    })
  }
  getMerchantId(){
    let data = JSON.parse(localStorage.getItem("data")!);
    if(data !== null){
      return data.merchant.id;
    }else {
      this.router.navigate(['/home']);
    }
  }

}
