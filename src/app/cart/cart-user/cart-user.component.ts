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

@Component({
  selector: 'app-cart-user',
  templateUrl: './cart-user.component.html',
  styleUrls: ['./cart-user.component.css']
})
export class CartUserComponent implements OnInit {

  constructor(private cartService: CartService,
              private router: Router,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService) { }

  ngOnInit(): void {
    this.getCartByUserId();
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
  data: any;
  messagecart: string;
  acc: AccountToken;
  message:string;
  products: Product[] = [];
  carts: Cart[] =[];
  totalPrice: number = 0;



  getCartByUserId(){
    let data = JSON.parse(localStorage.getItem("data")!);
    if(data != null){
      this.cartService.getCartByUserId(data.user.id).subscribe(data =>{
        if(data.length == 0){
          this.messagecart = "khong co du lieu";
          console.log(this.messagecart)
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

  decress(quantity: number){
    quantity = quantity-1;
  }


  deleteProductCart(id: number){
    this.cartService.deleteProductCart(id).subscribe(()=>{
      console.log("delete");
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
    console.log("Cart")
    console.log("merchant_id"+this.carts[0].product.merchant.id);
    console.log("totalprice" + this.totalPrice)
    let merchant_id = this.carts[0].product.merchant.id;
    let user = this.getAccountToken().user;
    console.log(user);
    let order = new Order(user,'','pending', merchant_id, this.totalPrice);
    this.orderService.checkout(order).subscribe(data =>{
      console.log("Ok")
      console.log(data)
      let order = data;
      for(let i = 0; i< this.carts.length; i++){
        let product = this.carts[i].product;
        let quantity = this.carts[i].quantity;
        let orderDetail = new OrderDetail(product,order,quantity);
        this.orderDetailService.addOrderDetail(orderDetail).subscribe(data =>{
          console.log("add orderdetail");
        })
      }

      this.cartService.deleteAllCartByUser(user.id).subscribe(() =>{
        this.getCartByUserId();
      });
    });
  }

}
