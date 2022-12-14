import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminpageComponent} from "./adminpage/adminpage.component";
import {MerchantListComponent} from "./merchant-list/merchant-list.component";
import {MerchantListPendingComponent} from "./merchant-list-pending/merchant-list-pending.component";
import {MerchantListActiveComponent} from "./merchant-list-active/merchant-list-active.component";
import {MerchantListBlockComponent} from "./merchant-list-block/merchant-list-block.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserListActiveComponent} from "./user-list-active/user-list-active.component";
import {UserListBlockComponent} from "./user-list-block/user-list-block.component";


const routes: Routes = [{
  path: "admin",
  component: AdminpageComponent,
  children:[{
    path: "merchant-list",
    component: MerchantListComponent,
    children: [{
      path: "pending",
      component: MerchantListPendingComponent,
    },
      {
        path: "active",
        component: MerchantListActiveComponent,
      },
      {
        path: "block",
        component: MerchantListBlockComponent,
      }
    ]
  },{
    path: "user-list",
    component: UserListComponent,
    children: [
      {
        path: "active",
        component: UserListActiveComponent,
      },
      {
        path: "block",
        component: UserListBlockComponent,
      }
    ]
  }]
}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
