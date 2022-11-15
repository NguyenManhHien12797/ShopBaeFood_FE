import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart/cart.service";
import {Product} from "../../model/product";
import {Router} from "@angular/router";
import {Cart} from "../../model/cart";
import {AccountToken} from "../../model/accountToken";

@Component({
  selector: 'app-cart-user',
  templateUrl: './cart-user.component.html',
  styleUrls: ['./cart-user.component.css']
})
export class CartUserComponent implements OnInit {

  constructor(private cartService: CartService,
              private router: Router) { }

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



  getCartByUserId(){
    let data = JSON.parse(localStorage.getItem("data")!);
    if(data != null){
      this.cartService.getCartByUserId(data.user.id).subscribe(data =>{
        if(data.length == 0){
          this.messagecart = "khong co du lieu";
          console.log(this.messagecart)
        } else {
          this.carts = data;
          console.log(this.carts)
          for (let i =0; i<this.carts.length; i++){
            this.carts[i].price= this.carts[i].product.oldPrice;
            this.carts[i].totalPrice= this.carts[i].price*this.carts[i].quantity;
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

}
