import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AdminModule} from "../admin/admin.module";
import {HomepageRoutingModule} from "./homepage-routing.module";
import { AllMerchantListComponent } from './all-merchant-list/all-merchant-list.component';
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';



@NgModule({
  declarations: [
    HomeComponent,
    AllMerchantListComponent,
    MerchantDetailComponent
  ],
  exports: [
    HomeComponent,
    AllMerchantListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule {
}
