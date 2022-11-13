import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartUserComponent } from './cart-user/cart-user.component';
import { OderComponent } from './oder/oder.component';
import {CartRoutingModule} from "./cart-routing.module";



@NgModule({
  declarations: [
    CartUserComponent,
    OderComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
