import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import {Order} from "../../model/order";
import {IOrder} from "../../model/iorder";
import {OrderDetailService} from "../../service/order-detail/order-detail.service";
import {OrderDetail} from "../../model/order-detail";
import {Router} from "@angular/router";

@Component({
  selector: 'app-merchant-order-pending',
  templateUrl: './merchant-order-pending.component.html',
  styleUrls: ['./merchant-order-pending.component.css']
})
export class MerchantOrderPendingComponent implements OnInit {

  constructor(private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private router: Router) { }

  ngOnInit(): void {
    this.getOrder();
  }
  orders: IOrder[] = [];
  orderDetail: OrderDetail;
  getOrder(){
    this.orderService.getOrder().subscribe(data =>{
      let merchant_id = this.getMerchantId();
      console.log("Merchant_id "+ merchant_id)
      console.log(data);
      this.orders = data.filter(value => value.status === 'Đang chờ duyệt' && value.merchant_id ==merchant_id)
      console.log(this.orders)
    })
  }

  getOrderDetail(id: number){
    this.orderDetailService.getOrderDetailByOrder(id).subscribe(orderDetail =>{
      this.orderDetail = orderDetail;
      console.log(this.orderDetail);
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
