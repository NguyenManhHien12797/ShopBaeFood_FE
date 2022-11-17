import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotpassComponent} from "./forgotpass/forgotpass.component";
import {RegisterMerchantComponent} from "./register-merchant/register-merchant.component";
import {ConfirmOtpComponent} from "./confirm-otp/confirm-otp.component";


let routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "register/merchant",
    component: RegisterMerchantComponent
  },
  {
    path: "forgotpass",
    component: ForgotpassComponent
  },
  {
    path: "confirm-otp",
    component: ConfirmOtpComponent
  },

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AccountRoutingModule { }
