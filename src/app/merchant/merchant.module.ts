import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';
import {MerchantRoutingModule} from "./merchant-routing.module";
import {RouterModule} from "@angular/router";
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';



@NgModule({
  declarations: [
    ProductListComponent,
    MerchantPageComponent,
    MerchantDetailComponent
  ],
  exports:[
    ProductListComponent,
    MerchantPageComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    RouterModule
  ]
})
export class MerchantModule { }
