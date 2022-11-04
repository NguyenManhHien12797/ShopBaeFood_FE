import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminpageComponent} from "./admin/adminpage/adminpage.component";

const routes: Routes= [{
  path: "",
  loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
},
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
