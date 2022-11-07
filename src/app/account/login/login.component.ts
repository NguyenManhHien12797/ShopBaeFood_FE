import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../service/account/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.pattern("^([A-Z]{1})([a-z]{4,})([0-9]{1,})")])
  })
  message : string = "";

  constructor(private accountService: AccountService,
              private router: Router) {}

  ngOnInit(): void {
  }

  get username() {
    return this.loginForm.get("username")
  }

  get password() {
    return this.loginForm.get("password")
  }
  login() {
    const form = this.loginForm.value;
    this.accountService.login(form).subscribe(data => {
      if (data == null) {
        this.message = "Nguoi dung khong ton tai hoac sai mat khau"
      } else {
        localStorage.setItem("user",JSON.stringify(data))
        localStorage.setItem("token",JSON.stringify(data.token))
        this.router.navigate(['/home'])
      }
    })
  }
}
