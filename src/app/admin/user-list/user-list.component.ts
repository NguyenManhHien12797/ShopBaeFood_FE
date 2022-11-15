import { Component, OnInit } from '@angular/core';
import {AccountToken} from "../../model/accountToken";
import {Role} from "../../model/role";
import {Router} from "@angular/router";
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {UserService} from "../../service/user/user.service";
import {AppUser} from "../../model/appUser";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAllUser();
  }
  ngDoCheck(): void {
    this.url = this.router.url;
  }

  url: string = this.router.url;
  users: AppUser[] = [];

  getAllUser(){
    this.userService.getAllUser().subscribe(user =>{
      this.users = user.filter(value => value.status === 'active'&& value.name!=='admin');
      // console.log(merchant)
    })
  }
}
