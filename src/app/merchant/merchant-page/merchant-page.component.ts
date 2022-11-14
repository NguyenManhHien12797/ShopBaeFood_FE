import { Component, OnInit } from '@angular/core';
import {AccountToken} from "../../model/accountToken";
import {Role} from "../../model/role";
import {Router} from "@angular/router";
import {Account} from "../../model/account";
import {AccountService} from "../../service/account/account.service";

@Component({
  selector: 'app-merchant-page',
  templateUrl: './merchant-page.component.html',
  styleUrls: ['./merchant-page.component.css']
})
export class MerchantPageComponent implements OnInit {

  acc: AccountToken;
  data: any;
  message: string;
  role: Role;

  constructor( private router: Router,
               private accountService: AccountService) {
    this.getAccountToId();
  }

  ngOnInit(): void {

  }


  ngDoCheck(): void {
    this.url = this.router.url;
    console.log(this.url)
    // if(this.getAccountToken() ==null){
    //   this.message = "chua dang nhap";
    // }else {
    //   if(this.getAccountToken().roles.includes("ROLE_USER")){
    //     this.acc = this.getAccountToken().user;
    //     this.message= "user";
    //   }
    //   if(this.getAccountToken().roles.includes("ROLE_MERCHANT")){
    //     // this.acc = this.data;
    //     // console.log(this.acc)
    //     // console.log(this.data)
    //     this.message= "merchant";
    //   }
    //   if(this.getAccountToken().roles.includes("ROLE_ADMIN")){
    //     this.acc = this.getAccountToken().user;
    //     this.message= "admin";
    //   }
    //
    //
    // }
    // console.log(this.message);
  }

  url: string = this.router.url;
  // acount:Account;
  imgSrc: any;
  avatar: string;
  name: string;

  getAccountToken(){
    this.data = localStorage.getItem("data")!;
    // console.log(JSON.parse(this.data).merchant);
    return JSON.parse(this.data);
  }

  getAccountToId(){
    let account_id = JSON.parse(localStorage.getItem("data")!).id;
    this.accountService.getAccountToId(account_id).subscribe(data =>{
      this.data = data.merchant;

    });
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/home'])
  }


  addNewAccount(a: any){
    this.data = a.merchant;
    console.log("đây là a: ")
    console.log(a.merchant)
  }

}
