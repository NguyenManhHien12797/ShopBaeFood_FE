import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MerchantListComponent} from "./merchant-list/merchant-list.component";
import { AdminpageComponent } from './adminpage/adminpage.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../homepage/home/home.component";
import {AdminRoutingModule} from "./admin-routing.module";
import { MerchantListPendingComponent } from './merchant-list-pending/merchant-list-pending.component';
import { MerchantListActiveComponent } from './merchant-list-active/merchant-list-active.component';
import { MerchantListBlockComponent } from './merchant-list-block/merchant-list-block.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListActiveComponent } from './user-list-active/user-list-active.component';
import { UserListBlockComponent } from './user-list-block/user-list-block.component';



@NgModule({
  declarations: [
    MerchantListComponent,
    AdminpageComponent,
    MerchantListPendingComponent,
    MerchantListActiveComponent,
    MerchantListBlockComponent,
    UserListComponent,
    UserListActiveComponent,
    UserListBlockComponent
  ],
  exports: [
    MerchantListComponent,
    AdminpageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
