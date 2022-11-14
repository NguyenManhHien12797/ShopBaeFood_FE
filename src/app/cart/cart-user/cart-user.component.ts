import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart/cart.service";
import {Product} from "../../model/product";
import {Router} from "@angular/router";
import {Cart} from "../../model/cart";

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
  }

  message:string;
  products: Product[] = [];
  carts: Cart[] =[];



  getCartByUserId(){
    let id = JSON.parse(localStorage.getItem("data")!).user.id;
    this.cartService.getCartByUserId(id).subscribe(data =>{
      if(data.length == 0){
       this.message = "khong co du lieu";
      } else {
        this.carts = data;
        for (let i =0; i<this.carts.length; i++){
          this.carts[i].price= this.carts[i].product.oldPrice;
        this.carts[i].totalPrice= this.carts[i].price*this.carts[i].quantity;
          console.log(this.carts[i].totalPrice)
          console.log(this.carts[i].price)
          console.log(this.carts[i].quantity)
        }

      }
    },error => {
      this.message = "khong co du lieu";
    })
  }

  getTotal(num:number, price:number){
    return num*price;
  }

  deleteProductCart(id: number){
    this.cartService.deleteProductCart(id).subscribe(()=>{
      console.log("delete");
      this.getCartByUserId();
    })
  }

}
