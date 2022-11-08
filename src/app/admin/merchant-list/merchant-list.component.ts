import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {

  constructor(private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.getAllMerchant();
  }

  merchant: Merchant[] = [];

  getAllMerchant(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchant= merchant;
      console.log(merchant)
    })
  }
}
