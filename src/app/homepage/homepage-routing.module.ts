import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AdminModule} from "../admin/admin.module";
import {AllMerchantListComponent} from "./all-merchant-list/all-merchant-list.component";
import {MerchantDetailComponent} from "./merchant-detail/merchant-detail.component";

const routes: Routes = [{
  path: "", redirectTo: "/home", pathMatch: "full"
},
  {
    path:"home",
    component: HomeComponent,
    children: [{
      path:"list-merchant",
      component: AllMerchantListComponent,
      children: [{
        path:"merchant-detail/:id",
        component: MerchantDetailComponent
      }]
    }]
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
