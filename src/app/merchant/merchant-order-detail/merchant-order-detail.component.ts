import { Component, OnInit } from '@angular/core';
import {OrderDetail} from "../../model/order-detail";
import {OrderService} from "../../service/order/order.service";
import {OrderDetailService} from "../../service/order-detail/order-detail.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Order} from "../../model/order";

@Component({
  selector: 'app-merchant-order-detail',
  templateUrl: './merchant-order-detail.component.html',
  styleUrls: ['./merchant-order-detail.component.css']
})
export class MerchantOrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      console.log("helo orderdetail")
      this.getOrderDetail(this.id);
    })

  }
  id: number
  orderDetails: OrderDetail[] = [];

  getOrderDetail(id: number){
    console.log("id "+id)
    this.orderDetailService.getOrderDetailByOrder(id).subscribe(orderDetail =>{
      this.orderDetails = orderDetail;
      console.log(this.orderDetails);
    })
  }

  receiveOrderStatus(order: Order){
    order.status = "Người bán nhận order";
    console.log("order")
    console.log(order)
    console.log("order")
    this.orderService.updateOrderStatus(order, this.id).subscribe(data =>{
      console.log("update ")
      console.log(data)
      console.log("update ")
    })
  }
  refuseOrderStatus(order: Order){
    order.status = "Người bán từ chối order";
    console.log("order")
    console.log(order)
    console.log("order")
    this.orderService.updateOrderStatus(order, this.id).subscribe(data =>{
      console.log("update ")
      console.log(data)
      console.log("update ")
    })
  }
}
