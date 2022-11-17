import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../service/account/account.service";
import {Router} from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    // password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.pattern("^([A-Z]{1})([a-z]{4,})([0-9]{1,})")])

  })
  message : string = "";
  nameD: any;
  passD: any;
  disable: boolean=true;
data:any;

  constructor(private accountService: AccountService,
              private router: Router) {}

  ngOnInit(): void {
    this.data = localStorage.getItem("data");
    console.log("data "+this.data!==null);
    if(this.data!==null){
      this.router.navigate(["/home"])
    }
  }
  ngDoCheck():void{
    console.log(this.nameD)
    console.log(this.passD)
    this.check();
  }
  get username() {
    return this.loginForm.get("userName")
  }

  get password() {
    return this.loginForm.get("password")
  }
  login() {
    const form = this.loginForm.value;
    this.accountService.login(form).subscribe(data => {
      if (data == null || data.message =="Sai roi") {
        this.message = data.message;
        swal(data.message)
        window.localStorage.clear();
      } else if ( data.message =="Tài khoản của bạn đang bị khóa") {
          this.message = data.message;
        swal(data.message)
          window.localStorage.clear();
        }else if(data.message=="Admin đã từ chối đăng ký merchant"){
        this.message = data.message;
        swal(data.message)
        window.localStorage.clear();
      }else if(data.message=="Admin chưa phê duyệt đăng ký merchant"){
        this.message = data.message;
        swal(data.message)
        window.localStorage.clear();
      }
        else {
        localStorage.setItem("data",JSON.stringify(data))
        localStorage.setItem("token",JSON.stringify(data.token))
        swal("Đăng nhập thành công","","success");
        setTimeout(()=>{for (let i = 0; i <data.roles.length ; i++) {
          if(data.roles[i]=='ROLE_ADMIN'){
            this.router.navigate(['/admin']);
            break;
          }else if(data.roles[i]=='ROLE_MERCHANT'){
            this.router.navigate(['/merchant'])
            break;
          }else {
            this.router.navigate(['/home'])
          }
        }},1500)

      }
    },error => {
      this.message ="Nguoi dung khong ton tai";
      window.localStorage.clear();
      }
      )

  }

  check() {
    if((this.nameD==null||this.nameD=="")||(this.passD==null||this.passD=="")){
      this.disable=true;
    }else {
        this.disable=false;
    }
    console.log(this.disable)
  }
}
