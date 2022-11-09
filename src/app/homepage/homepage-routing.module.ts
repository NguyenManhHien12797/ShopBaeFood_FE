import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AdminModule} from "../admin/admin.module";
import {AllProductListComponent} from "./all-product-list/all-product-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

const routes: Routes = [{
  path: "", redirectTo: "/home", pathMatch: "full"
},
  {
    path:"home",
    component: HomeComponent,
    children: [{
      path:"danh-sach-tat-ca-san-pham",
      component: AllProductListComponent
    },
      {
        path:"danh-sach-tat-ca-san-pham/chi-tiet-san-pham",
        component: ProductDetailComponent
      }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class HomepageRoutingModule { }
