import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";

@Component({
  selector: 'app-merchant-list-active',
  templateUrl: './merchant-list-active.component.html',
  styleUrls: ['./merchant-list-active.component.css']
})
export class MerchantListActiveComponent implements OnInit {

  constructor(private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.getAllMerchant();
  }

  merchants: Merchant[]= [];


  getAllMerchant(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant.filter(value => value.status === 'active');
    })
  }

}
