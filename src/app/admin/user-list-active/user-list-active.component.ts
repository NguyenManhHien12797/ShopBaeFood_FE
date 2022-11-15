import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {AccountService} from "../../service/account/account.service";
import {MailService} from "../../service/mail/mail.service";
import {Merchant} from "../../model/merchant";
import swal from "sweetalert";
import {UserService} from "../../service/user/user.service";
import {AppUser} from "../../model/appUser";

@Component({
  selector: 'app-user-list-active',
  templateUrl: './user-list-active.component.html',
  styleUrls: ['./user-list-active.component.css']
})
export class UserListActiveComponent implements OnInit {
  constructor(private userService: UserService,
              private accountService: AccountService,
              private mailService: MailService) { }

  ngOnInit(): void {
    this.getAllMerchant();
  }

  users: AppUser[]= [];


  getAllMerchant(){
    this.userService.getAllUser().subscribe(user =>{
      this.users = user.filter(value => value.status === 'active'&& value.name!=='admin');
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
              this.getAllMerchant();

            })


          });
        } else {
          swal("Vâng, bạn đã hủy việc khóa");
        }
      });


  }
}
