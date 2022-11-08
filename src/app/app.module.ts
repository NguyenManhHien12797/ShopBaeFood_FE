import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HomepageModule} from "./homepage/homepage.module";
import {HttpClientModule} from "@angular/common/http";
import {AdminModule} from "./admin/admin.module";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {AccountModule} from "./account/account.module";
import {MerchantModule} from "./merchant/merchant.module";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
