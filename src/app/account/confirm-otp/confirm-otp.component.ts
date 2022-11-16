import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../service/account/account.service";
import swal from "sweetalert";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.css']
})
export class ConfirmOtpComponent implements OnInit {

  constructor(private accountService: AccountService,
              private router: Router) {
    let time = setInterval(() => {
      if(this.i!==0){
        this.i--
      }else {
        this.disable=false;
      }
    }, 1000)

  }
disable=true;
  i: any = 20;
  otp: any;
  pass: any;
  name: any = localStorage.getItem("name")

  ngOnInit(): void {

  }

  confirmpass() {
    console.log(this.name);
    this.accountService.confirmPass(this.name, this.otp, this.pass).subscribe(value => {
      if (value == true) {
        swal("Bạn đã đổi mật khẩu thành công", "", "success")
        localStorage.removeItem("name");
        this.router.navigate(["/login"])
      } else {
        swal("Bạn đã nhập sai OTP");
      }
    }, error => {
      swal("Bạn đã nhập sai OTP hoặc OTP đã hết hạn", "", "error");
    })
  }

  setTime() {
    this.i = 20;
  }
  sotp(){
    this.setTime();
    this.accountService.forgotpass(this.name).subscribe(data=>{
      if(data==true){
        swal("Đã gửi otp, mời bạn xác thực otp và đổi mật khẩu","","success")
      }
    })
  }
}
