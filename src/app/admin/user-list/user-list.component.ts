import { Component, OnInit } from '@angular/core';
import {AccountToken} from "../../model/accountToken";
import {Role} from "../../model/role";
import {Router} from "@angular/router";
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {UserService} from "../../service/user/user.service";
import {AppUser} from "../../model/appUser";
import swal from "sweetalert";
import {AccountService} from "../../service/account/account.service";
import {MailService} from "../../service/mail/mail.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService,
              private accountService: AccountService,
              private mailService: MailService,
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
  blockUser(id: number|undefined, user:AppUser){

    swal({
      title: "Bạn có chắc muốn khóa",
      text: "User:"+user.name,
      icon: "warning",
      // @ts-ignore
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Vâng, bạn đã khóa thành công", {
            icon: "success",
          });
          const mer= user;
          mer.status = 'block';

          this.userService.updateUser(id,mer).subscribe(() =>{
            this.accountService.getAccountToUser(id).subscribe(data =>{
              console.log(data);
              let mail= data.email;
              // @ts-ignore
              this.mailService.acceptRegistration(mail, user.name).subscribe(() =>{
                swal("Đã gửi mail thông báo cho người dùng!")
              },error => {
                swal("Gửi mail bị lỗi, nhưng người dùng đã bị khóa");
              })
              swal("Đã khóa người dùng"+ user.name+ " thành công")
              this.getAllUser();

            })


          });
        } else {
          swal("Vâng, bạn đã hủy việc khóa");
        }
      });


  }
}
