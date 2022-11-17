import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccountToken} from "../../model/accountToken";
import {Role} from "../../model/role";
import {Product} from "../../model/product";
import {CartService} from "../../service/cart/cart.service";
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {Cart} from "../../model/cart";
import {Category} from "../../model/category";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router,
               private cartService: CartService,
               private merchantService: MerchantService) {

  }

  acc: AccountToken;
  data: any;
  message: string;
  messagecart: string;
  role: Role;
  products: Product[] = [];
  carts: Cart[] =[];
  merchants: Merchant[]=[];
  i: number = 9;
  categories: Category[] = [];
  nameSearch: string;

  ngOnInit(): void {
    this.getMerchant();
    this.getCartByUserId();
  }

  ngDoCheck(): void {
    // console.log(this.merchants)
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

  url: string = this.router.url;

  getAccountToken(){
    this.data = localStorage.getItem("data")!;
    return JSON.parse(this.data);

  }



  getCartByUserId(){
    let data = JSON.parse(localStorage.getItem("data")!);
    if(data.user !== null){
      this.cartService.getCartByUserId(data.user.id).subscribe(data =>{
        if(data.length == 0){
          this.messagecart = "khong co du lieu";
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

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/home'])
  }

  private getMerchant() {
    this.merchantService.getAllMerchant().subscribe((merchant)=>{
      this.merchants=merchant
    })
  }


  hidden(i: any): Boolean {
    return i>=this.i
  }
  plus(){
    this.i+=9;
  }

  searchMerchantByName() {
    console.log(this.nameSearch)
    this.merchantService.searchMerchant(this.nameSearch).subscribe(merchant => {
      this.merchants = merchant;
    })
  }
}
