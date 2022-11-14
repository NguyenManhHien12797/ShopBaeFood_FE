import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {Router} from "@angular/router";
import {AccountToken} from "../../model/accountToken";
import {Role} from "../../model/role";


@Component({
  selector: 'app-all-product-list',
  templateUrl: './all-merchant-list.component.html',
  styleUrls: ['./all-merchant-list.component.css']
})
export class AllMerchantListComponent implements OnInit {

  constructor( private merchantService: MerchantService,
               private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct();
    console.log("all")
    console.log( this.getAllProduct())
  }

  acc: AccountToken;
  data: any;
  message: string;
  role: Role;


  ngDoCheck(): void {
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
  merchants: Merchant[] = [];

  getAccountToken(){
    this.data = localStorage.getItem("data")!;
    return JSON.parse(this.data);

  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/home'])
  }


  getAllProduct(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant;
      console.log(merchant)
    })
  }

}
