import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../service/account/account.service";
import {Router} from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  mail: string;
  disable:boolean= true;
  message="";
  constructor(private accountService:AccountService,
              private router: Router) { }

  ngOnInit(): void {this.disable=true;
  }
ngDoCheck():void{
    if(this.mail==''||this.mail==null){
      this.disable=true;
    }else {
      this.disable=false;
    }
}
  forgotpass() {
    console.log(this.mail);
    swal("Đợi xíu otp đang được gửi đi")
      this.accountService.forgotpass(this.mail).subscribe(data=>{
        if(data==true){
          swal("Đã gửi otp, mời bạn xác thực otp và đổi mật khẩu","","success")
          localStorage.setItem("name",this.mail);
          this.router.navigate(["/confirm-otp"])
        }else{
          this.message="tài khoản bạn nhập không đúng"
        }
      },error => {
        swal("tài khoản bạn nhập không đúng hoặc người dùng không tồn tại","","error")
      })
  }
}
