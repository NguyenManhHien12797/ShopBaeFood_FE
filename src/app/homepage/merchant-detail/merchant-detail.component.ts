import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {Product} from "../../model/product";
import {ProductService} from "../../service/product/product.service";
import {CartService} from "../../service/cart/cart.service";
import {Cart} from "../../model/cart";

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
  cart: Cart;
  // @ts-ignore
  // idMerchant:any=this.merchant.id
  constructor(private activatedRoute: ActivatedRoute,
              private merchantService: MerchantService,
              private productService: ProductService,
              private cartService: CartService) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getMerchant(this.id);
      this.getProductByMerchant(this.id)
    })

  }

  private getMerchant(id: any) {
    this.merchantService.findMerchantById(id).subscribe(merchant=>{
      this.merchant=merchant;
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

  addToCart(product: Product){

    console.log("add to cart"+ product.id);
    if(this.findCartByProuct(product.id)){
      this.cart = this.findCartByProuct(product.id);
      this.cartService.upDateToCart(product.id, this.cart).subscribe(data =>{
        console.log("up to cart")
      }, error => {
        console.log("loi up to cart")
      })
    }
    this.cart = this.findCartByProuct(product.id);
    console.log("cart")
    console.log(this.cart)
    this.cartService.addToCart(this.cart).subscribe(data =>{
      console.log("add to cart")
    }, error => {
      console.log("loi add to cart")
    });
  }

  // @ts-ignore
  findCartByProuct(id: number): Cart{
    console.log(id)
    this.cartService.findCartByProuct(id).subscribe(data => {
      console.log(data);
      return data;
    }, error => {
      console.log("Tim cart loi")
     return null;
    })
  }

}
