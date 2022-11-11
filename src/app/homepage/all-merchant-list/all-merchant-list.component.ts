import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {Router} from "@angular/router";


@Component({
  selector: 'app-all-product-list',
  templateUrl: './all-merchant-list.component.html',
  styleUrls: ['./all-merchant-list.component.css']
})
export class AllMerchantListComponent implements OnInit {

  constructor( private merchantService: MerchantService,
               private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  ngDoCheck(): void {
    this.url = this.router.url;
    console.log(this.url)
  }

  url: string = this.router.url;
  merchants: Merchant[] = [];

  getAllProduct(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant;
      console.log(merchant)
    })
  }

}
