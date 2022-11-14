import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart/cart.service";

@Component({
  selector: 'app-cart-user',
  templateUrl: './cart-user.component.html',
  styleUrls: ['./cart-user.component.css']
})
export class CartUserComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartByUserId();
  }

  message:string;

  getCartByUserId(){
    let id = JSON.parse(localStorage.getItem("data")!).user.id;
    console.log("vao cart")
    console.log(id)
    console.log(JSON.parse(localStorage.getItem("data")!).user)
    this.cartService.getCartByUserId(id).subscribe(data =>{
      if(data.message == "Khong co du lieu"){
       this.message = "Khong co du lieu";
      } else {
        console.log(data);
      }
    },error => {
      console.log("Khong co san pham")
      this.message = "Khong loi roi";
    })
  }

}
