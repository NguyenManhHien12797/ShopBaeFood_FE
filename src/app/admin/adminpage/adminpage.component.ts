import { Component, OnInit } from '@angular/core';
import {AccountToken} from "../../model/accountToken";
import {Role} from "../../model/role";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  acc: AccountToken;
  data: any;
  message: string;
  role: Role;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }


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

  getAccountToken(){
    this.data = localStorage.getItem("data")!;
    return JSON.parse(this.data);

  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/home'])
  }

}
