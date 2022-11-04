import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
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
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
