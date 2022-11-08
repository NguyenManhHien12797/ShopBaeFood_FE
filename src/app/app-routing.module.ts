import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes= [
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
{
  path: "home",
  loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
},
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: "merchant",
    loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantModule)
  },
  {
    path: "",
    loadChildren: ()=> import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: "**",
    redirectTo:"home"
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
