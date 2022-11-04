import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminpageComponent} from "./admin/adminpage/adminpage.component";

const routes: Routes= [{
  path: "home",
  loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
},
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
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
