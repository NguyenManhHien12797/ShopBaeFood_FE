import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccountToken} from "../../model/accountToken";
import {Role} from "../../model/role";
import {Product} from "../../model/product";
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router: Router,
               private merchantService: MerchantService) { }

  acc: AccountToken;
  data: any;
  message: string;
  role: Role;
  merchants: Merchant[]=[];
  i:number=9;

  ngOnInit(): void {
    this.getMerchant()

  }

  ngDoCheck(): void {
    console.log(this.merchants)
    this.url = this.router.url;
    console.log(this.url)
    if(this.getAccountToken() ==null){
      this.message = "chua dang nhap";
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
    console.log(this.message);
  }

  url: string = this.router.url;

  getAccountToken(){
    this.data = localStorage.getItem("data")!;
    return JSON.parse(this.data);

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
}
