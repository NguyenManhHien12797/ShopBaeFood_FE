import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AdminModule} from "../admin/admin.module";
import {HomepageRoutingModule} from "./homepage-routing.module";
import { AllProductListComponent } from './all-product-list/all-product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';



@NgModule({
  declarations: [
    HomeComponent,
    AllProductListComponent,
    ProductDetailComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule {
}
