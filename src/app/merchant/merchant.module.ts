import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';
import {MerchantRoutingModule} from "./merchant-routing.module";
import {RouterModule} from "@angular/router";
import { MerchantDetailComponent } from './merchant-detail/merchant-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ProductListComponent,
    MerchantPageComponent,
    MerchantDetailComponent,
    ProductEditComponent,
    ProductCreateComponent
  ],
  exports:[
    ProductListComponent,
    MerchantPageComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class MerchantModule { }
