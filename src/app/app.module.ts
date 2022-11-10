import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HomepageModule} from "./homepage/homepage.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AdminModule} from "./admin/admin.module";
import {AppRoutingModule} from "./app-routing.module";
import {AccountModule} from "./account/account.module";
import {MerchantModule} from "./merchant/merchant.module";
import {Auth_interceptor} from "./service/auth_interceptor";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomepageModule,
    HttpClientModule,
    AdminModule,
    MerchantModule,
    AppRoutingModule,
    AccountModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: Auth_interceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
