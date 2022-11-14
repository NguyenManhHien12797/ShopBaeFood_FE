import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CartUserComponent} from "./cart-user/cart-user.component";
import {OderComponent} from "./oder/oder.component";


const routes: Routes = [{
  path:"cart",
  component:CartUserComponent,

  children:[{
    path:"oder",
    component:OderComponent
  }]
}]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CartRoutingModule { }
