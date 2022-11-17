import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AccountRoutingModule} from "./account-routing.module";
import { RegisterMerchantComponent } from './register-merchant/register-merchant.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ConfirmOtpComponent } from './confirm-otp/confirm-otp.component';



@NgModule({
  declarations: [LoginComponent,RegisterComponent, RegisterMerchantComponent, ForgotpassComponent, ConfirmOtpComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        FormsModule
    ]
})
export class AccountModule { }
