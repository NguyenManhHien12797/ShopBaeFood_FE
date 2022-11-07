import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HomepageModule} from "./homepage/homepage.module";
import {HttpClientModule} from "@angular/common/http";
import {AdminModule} from "./admin/admin.module";
import {RouterLink, RouterModule, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {AccountModule} from "./account/account.module";
import { EditMarchantComponent } from './service/edit-marchant/edit-marchant.component';
import { InforMarchantComponent } from './service/infor-marchant/infor-marchant.component';
import { EditMerchantComponent } from './service/edit-merchant/edit-merchant.component';
import { InforMerchantComponent } from './service/infor-merchant/infor-merchant.component';

@NgModule({
  declarations: [
    AppComponent,
    EditMarchantComponent,
    InforMarchantComponent,
    EditMerchantComponent,
    InforMerchantComponent
  ],
  imports: [
    BrowserModule,
    HomepageModule,
    HttpClientModule,
    AdminModule,
    AppRoutingModule,
    AccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
