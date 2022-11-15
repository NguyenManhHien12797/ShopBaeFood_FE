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
  url: string = this.router.url;
  imgSrc: any;
  avatar: string;
  name: string;

  constructor( private router: Router,
               private accountService: AccountService) {
    this.getAccountToId();
  }

  ngOnInit(): void {

  }


  ngDoCheck(): void {
  }


  getAccountToken(){
    this.data = localStorage.getItem("data")!;
    return JSON.parse(this.data);
  }

  getAccountToId(){
    if(this.getAccountToken() !==null){
      let account_id =this.getAccountToken().id;
      this.accountService.getAccountToId(account_id).subscribe(data =>{
        this.data = data.merchant;
      });
    }else {
      this.router.navigate(['/home'])
    }

  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/home'])
  }


  addNewAccount(a: any){
    this.data = a.merchant;
  }

}
