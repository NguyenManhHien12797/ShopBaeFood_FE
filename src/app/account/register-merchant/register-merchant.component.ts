import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../service/account/account.service";
import swal from "sweetalert";
@Component({
  selector: 'app-register-merchant',
  templateUrl: './register-merchant.component.html',
  styleUrls: ['./register-merchant.component.css']
})
export class RegisterMerchantComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]),
    password: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required,Validators.minLength(3), Validators.pattern("^[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*$")]),
    name: new FormControl("",[Validators.required]),
    phone: new FormControl("", [Validators.required, Validators.minLength(9), Validators.pattern("^[a-zA-Z]+$")]),
    address: new FormControl("",[Validators.required]),
  })
  message:string;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  get userName() {
    return this.registerForm.get("userName")
  }
  get password() {
    return this.registerForm.get("password")
  } get email() {
    return this.registerForm.get("email")
  } get name() {
    return this.registerForm.get("name")
  } get phone() {
    return this.registerForm.get("phone")
  } get address() {
    return this.registerForm.get("address")
  }

  register() {
    this.accountService.registerMerchant(this.registerForm.value).subscribe((data)=>{
      console.log(data)
      if(!data==null){
        this.message="Đăng ký thành công"
      }
      swal("Đăng ký thành công! Vui lòng đợi Admin xác nhận")
    }, error => {
      swal("Lỗi rồi")
    })
  }
}
