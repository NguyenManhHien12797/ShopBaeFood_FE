import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart/cart.service";
import {Product} from "../../model/product";
import {Router} from "@angular/router";
import {Cart} from "../../model/cart";
import {AccountToken} from "../../model/accountToken";
import {Order} from "../../model/order";
import {OrderService} from "../../service/order/order.service";
import {OrderDetailService} from "../../service/order-detail/order-detail.service";
import {OrderDetail} from "../../model/order-detail";
import {IOrder} from "../../model/iorder";
import {UserService} from "../../service/user/user.service";
import {AppUser} from "../../model/appUser";

@Component({
  selector: 'app-cart-user',
  templateUrl: './cart-user.component.html',
  styleUrls: ['./cart-user.component.css']
})
export class CartUserComponent implements OnInit {
  data: any;
  messagecart: string;
  acc: AccountToken;
  message:string;
  products: Product[] = [];
  carts: Cart[] =[];
  totalPrice: number = 0;
  orders: IOrder[] = [];
  note: any;
  address: string;
  status: string;
  constructor(private cartService: CartService,
              private router: Router,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getCartByUserId();
    this.getOrderByUser();
  }


  ngDoCheck(): void {
    this.url = this.router.url;
    if(this.getAccountToken() ==null){
      this.message = "chua dang nhap";
      // this.router.navigate(['/login'])
    }else {
      if(this.getAccountToken().roles.includes("ROLE_USER")){
        this.acc = this.getAccountToken().user;
        this.message= "user";
      }
      if(this.getAccountToken().roles.includes("ROLE_MERCHANT")){
        this.acc = this.getAccountToken().merchant;
        this.message= "merchant";
      }
      if(this.getAccountToken().roles.includes("ROLE_ADMIN")){
        this.acc = this.getAccountToken().user;
        this.message= "admin";
      }

    }
  }

  getCartByUserId(){
    let data = JSON.parse(localStorage.getItem("data")!);
    if(data != null){
      this.cartService.getCartByUserId(data.user.id).subscribe(data =>{
        if(data.length == 0){
          this.messagecart = "khong co du lieu";
          this.totalPrice = 0;
          console.log("Tong tien: "+ this.totalPrice)
        } else {
          this.carts = data;
          for (let i =0; i<this.carts.length; i++){
            this.carts[i].price= this.carts[i].product.newPrice;
            this.carts[i].totalPrice= this.carts[i].price*this.carts[i].quantity;
            this.totalPrice = this.totalPrice + this.carts[i].totalPrice;
          }

        }
      },error => {
        this.messagecart = "khong co du lieu";
      })
    }

  }



  deleteProductCart(id: number){
    this.cartService.deleteProductCart(id).subscribe(()=>{
      this.getCartByUserId();
    })
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/home'])
  }

  url: string = this.router.url;

  getAccountToken(){
    this.data = localStorage.getItem("data")!;
    return JSON.parse(this.data);
  }

  checkout(){
    this.getCartByUserId();
    let merchant_id = this.carts[0].product.merchant.id;
    let user = this.getAccountToken().user;
    if(this.address !==null){
      user.address= this.address;
    }
    this.updateAddressUser(user);
    let order = new Order(user,this.note,'Đang chờ duyệt', merchant_id, this.totalPrice);
    this.orderService.checkout(order).subscribe(data =>{
      let order = data;
      for(let i = 0; i< this.carts.length; i++){
        let product = this.carts[i].product;
        let quantity = this.carts[i].quantity;
        let orderDetail = new OrderDetail(product,order,quantity);
        this.orderDetailService.addOrderDetail(orderDetail).subscribe(data =>{
        })
      }

      this.cartService.deleteAllCartByUser(user.id).subscribe(() =>{
        this.getCartByUserId();
      });
      this.getOrderByUser();
    });
  }

  updateAddressUser(user: AppUser){
    this.userService.updateUser(user.id, user).subscribe(()=>{
      console.log("update thanh cong")
    })
  }

  id: number
  orderDetails: OrderDetail[] = [];
  getOrderByUser(){
    let data = this.getAccountToken();
    if(data !== null){
      let user_id = data.user.id;
      this.orderService.getOrderByUser(user_id).subscribe(data =>{
        this.orders = data;
        console.log(this.orders)
        for(let i=0; i<this.orders.length; i++){
          this.status = this.orders[i].status;
          this.orderDetailService.getOrderDetailByOrder(this.orders[i].id).subscribe(orderDetail =>{
            this.orderDetails = orderDetail;
          })
        }
      });

    }
  }

  receiveOrderStatus(order: Order, order_id: number){
    order.status = "Người dùng đã nhận hàng";
    this.orderService.updateOrderStatus(order, order_id).subscribe(data =>{
    })
  }

  refuseOrderStatus(order: Order, order_id: number){
    order.status = "Người dùng không nhận hàng";
    this.orderService.updateOrderStatus(order, order_id).subscribe(data =>{
    })
  }

  deleteOrder(id:number){
    this.orderService.deleteOrder(id).subscribe(()=>{
      this.getOrderByUser();
    })
  }

}
