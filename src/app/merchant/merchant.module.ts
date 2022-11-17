import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';
import {MerchantRoutingModule} from "./merchant-routing.module";
import {RouterModule} from "@angular/router";
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MerchantInfoComponent } from './merchant-info/merchant-info.component';
import { MerchantOrderListComponent } from './merchant-order-list/merchant-order-list.component';
import { MerchantTransportComponent } from './merchant-transport/merchant-transport.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MerchantOrderPendingComponent } from './merchant-order-pending/merchant-order-pending.component';
import { MerchantOrderReceiveComponent } from './merchant-order-receive/merchant-order-receive.component';
import { MerchantOrderSendComponent } from './merchant-order-send/merchant-order-send.component';



@NgModule({
  declarations: [
    ProductListComponent,
    MerchantPageComponent,
    ProductEditComponent,
    ProductCreateComponent,
    MerchantInfoComponent,
    MerchantOrderListComponent,
    MerchantTransportComponent,
    DashboardComponent,
    MerchantOrderPendingComponent,
    MerchantOrderReceiveComponent,
    MerchantOrderSendComponent
  ],
    exports: [
        ProductListComponent,
        MerchantPageComponent,
    ],
    imports: [
        CommonModule,
        MerchantRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class MerchantModule { }
