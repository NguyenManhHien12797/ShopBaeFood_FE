import { Component, OnInit } from '@angular/core';
import {OrderDetail} from "../../model/order-detail";
import {OrderService} from "../../service/order/order.service";
import {OrderDetailService} from "../../service/order-detail/order-detail.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Order} from "../../model/order";
import swal from "sweetalert";
@Component({
  selector: 'app-merchant-order-detail',
  templateUrl: './merchant-order-detail.component.html',
  styleUrls: ['./merchant-order-detail.component.css']
})
export class MerchantOrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getOrderDetail(this.id);
    })

  }

  ngDoCheck(): void {
    this.url = this.router.url;
  }

  url: string = this.router.url;
  id: number
  orderDetails: OrderDetail[] = [];
  status: string;

  getOrderDetail(id: number){
    this.orderDetailService.getOrderDetailByOrder(id).subscribe(orderDetail =>{
      this.orderDetails = orderDetail;
      this.status = orderDetail[0].order.status;
      console.log(this.status)
    })
  }

  receiveOrderStatus(order: Order){
    order.status = "Người bán nhận order";
    this.orderService.updateOrderStatus(order, this.id).subscribe(data =>{
      swal("Đã nhậm đơn hàng");
    })
  }
  refuseOrderStatus(order: Order){
    order.status = "Người bán từ chối order";
    this.orderService.updateOrderStatus(order, this.id).subscribe(data =>{
      swal("Đã từ chối đơn hàng");
    })
  }
}
