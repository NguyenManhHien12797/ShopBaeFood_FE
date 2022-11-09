import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {

  constructor(private merchantService: MerchantService,
              private router: Router) {}

  ngOnInit(): void {
    this.getAllMerchant();
  }
  ngDoCheck(): void {
    this.url = this.router.url;
  }

  url: string = this.router.url;
  merchants: Merchant[] = [];

  getAllMerchant(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant.filter(value => value.status === 'active');
      console.log(merchant)
    })
  }
}
