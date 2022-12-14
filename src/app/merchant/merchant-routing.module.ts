import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminpageComponent} from "../admin/adminpage/adminpage.component";
import {MerchantListComponent} from "../admin/merchant-list/merchant-list.component";
import {MerchantListPendingComponent} from "../admin/merchant-list-pending/merchant-list-pending.component";
import {MerchantListActiveComponent} from "../admin/merchant-list-active/merchant-list-active.component";
import {MerchantListBlockComponent} from "../admin/merchant-list-block/merchant-list-block.component";
import {MerchantPageComponent} from "./merchant-page/merchant-page.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductCreateComponent} from "./product-create/product-create.component";
import {MerchantInfoComponent} from "./merchant-info/merchant-info.component";
import {MerchantOrderListComponent} from "./merchant-order-list/merchant-order-list.component";
import {MerchantTransportComponent} from "./merchant-transport/merchant-transport.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MerchantOrderPendingComponent} from "./merchant-order-pending/merchant-order-pending.component";
import {MerchantOrderReceiveComponent} from "./merchant-order-receive/merchant-order-receive.component";
import {MerchantOrderSendComponent} from "./merchant-order-send/merchant-order-send.component";
import {MerchantOrderDetailComponent} from "./merchant-order-detail/merchant-order-detail.component";

const routes: Routes = [{
  path: "merchant",
  component: MerchantPageComponent,
  children: [
    {
      path: "merchant-dashboard",
      component: DashboardComponent
    },
    {
      path: "merchant-transport",
      component: MerchantTransportComponent
    },
    {
      path: "merchant-order",
      component: MerchantOrderListComponent,
      children: [{
        path: "pending",
        component: MerchantOrderPendingComponent
      },
        {
          path: "receive",
          component: MerchantOrderReceiveComponent
        },
        {
          path: "send",
          component: MerchantOrderSendComponent
        }
      ]
    },
    {
      path: "detail/:id",
      component: MerchantOrderDetailComponent
    },
    {
      path: "product-list",
      component: ProductListComponent
    }
    ,
    {
      path: "product-edit/:id",
      component: ProductEditComponent
    },
    {
      path: "product-create",
      component: ProductCreateComponent
    },
    {
      path: "merchant-info",
      component: MerchantInfoComponent,
    }
  ],
},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MerchantRoutingModule {
}
