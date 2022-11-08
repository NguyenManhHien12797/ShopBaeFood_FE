import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MerchantListComponent} from "./merchant-list/merchant-list.component";
import { MerchantCreateComponent } from './merchant-create/merchant-create.component';
import { MerchantUpdateComponent } from './merchant-update/merchant-update.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../homepage/home/home.component";
import {AdminRoutingModule} from "./admin-routing.module";



@NgModule({
  declarations: [
    MerchantCreateComponent,
    MerchantListComponent,
    MerchantUpdateComponent,
    AdminpageComponent
  ],
  exports: [
    MerchantListComponent,
    AdminpageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
