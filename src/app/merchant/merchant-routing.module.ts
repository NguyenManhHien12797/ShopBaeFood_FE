import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminpageComponent} from "../admin/adminpage/adminpage.component";
import {MerchantListComponent} from "../admin/merchant-list/merchant-list.component";
import {MerchantListPendingComponent} from "../admin/merchant-list-pending/merchant-list-pending.component";
import {MerchantListActiveComponent} from "../admin/merchant-list-active/merchant-list-active.component";
import {MerchantListBlockComponent} from "../admin/merchant-list-block/merchant-list-block.component";
import {MerchantPageComponent} from "./merchant-page/merchant-page.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";

const routes: Routes = [{
  path: "merchant",
  component: MerchantPageComponent,
  children:[{
    path:"product-list",
    component:ProductListComponent
  },
    {
      path:"edit/:id",
      component:ProductEditComponent
    }
  ],
}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MerchantRoutingModule { }
