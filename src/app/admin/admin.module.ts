import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MerchantListComponent} from "./merchant-list/merchant-list.component";
import { MerchantCreateComponent } from './merchant-create/merchant-create.component';
import { MerchantUpdateComponent } from './merchant-update/merchant-update.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../homepage/home/home.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { MerchantListPendingComponent } from './merchant-list-pending/merchant-list-pending.component';
import { MerchantListActiveComponent } from './merchant-list-active/merchant-list-active.component';
import { MerchantListBlockComponent } from './merchant-list-block/merchant-list-block.component';



@NgModule({
  declarations: [
    MerchantCreateComponent,
    MerchantListComponent,
    MerchantUpdateComponent,
    AdminpageComponent,
    MerchantListPendingComponent,
    MerchantListActiveComponent,
    MerchantListBlockComponent
  ],
  exports: [
    MerchantListComponent,
    AdminpageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule
  ]
})
export class AdminModule { }
