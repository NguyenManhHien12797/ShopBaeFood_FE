import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";


@Component({
  selector: 'app-all-product-list',
  templateUrl: './all-merchant-list.component.html',
  styleUrls: ['./all-merchant-list.component.css']
})
export class AllMerchantListComponent implements OnInit {

  constructor( private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  merchants: Merchant[] = [];

  getAllProduct(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant;
      console.log(merchant)
    })
  }

}
