import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";

@Component({
  selector: 'app-merchant-list-pending',
  templateUrl: './merchant-list-pending.component.html',
  styleUrls: ['./merchant-list-pending.component.css']
})
export class MerchantListPendingComponent implements OnInit {

  constructor(private merchantService: MerchantService) { }

  ngOnInit(): void {
    this.getAllMerchant();
  }

  merchants: Merchant[]= [];


  getAllMerchant(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant.filter(value => value.status === 'pending');
    })
  }

  acceptMerchant(id: number, merchant:Merchant){
    const mer= merchant;
    mer.status = 'active';
    this.merchantService.updateMerchant(id,mer).subscribe(() =>{
      alert("Chấp nhận cho người dùng "+ merchant.name+ " đăng ký thành người bán")
      this.getAllMerchant();
    });

  }

  refuseMerchant(id: number, merchant:Merchant){
    const mer= merchant;
    mer.status = 'refuse';
    this.merchantService.updateMerchant(id,mer).subscribe(() =>{
      alert("Từ chối cho người dùng "+ merchant.name+ " đăng ký thành người bán")
      this.getAllMerchant();
    });

  }

}
