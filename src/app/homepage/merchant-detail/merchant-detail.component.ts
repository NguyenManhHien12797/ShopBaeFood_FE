import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {Product} from "../../model/product";
import {ProductService} from "../../service/product/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css']
})
export class MerchantDetailComponent implements OnInit {
  id: number;
  merchant: Merchant;
  products: Product[]=[];
  nameSearch: string;
  // @ts-ignore
  // idMerchant:any=this.merchant.id
  constructor(private activatedRoute: ActivatedRoute,
              private merchantService: MerchantService,
              private productService: ProductService) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getMerchant(this.id);
      console.log("idParam:"+this.id)
      this.getProductByMerchant(this.id)
    })

  }

  private getMerchant(id: any) {
    this.merchantService.findMerchantById(id).subscribe(merchant=>{
      this.merchant=merchant;
      console.table(merchant);
    })
  }
  private getProductByMerchant(id: any){
    this.productService.getAllProductByMerchant(id).subscribe(products=>{
      this.products= products;
    })
  }
  search() {
    this.productService.searchProduct(this.id, this.nameSearch).subscribe(product => {
      this.products = product;
    })
  }
}
