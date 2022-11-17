import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-merchant-order-list',
  templateUrl: './merchant-order-list.component.html',
  styleUrls: ['./merchant-order-list.component.css']
})
export class MerchantOrderListComponent implements OnInit {

  constructor(private router: Router) { }

  url: string = this.router.url;

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.url = this.router.url;
  }

}
