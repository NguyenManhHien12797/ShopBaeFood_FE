import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-all-product-list',
  templateUrl: './all-product-list.component.html',
  styleUrls: ['./all-product-list.component.css']
})
export class AllProductListComponent implements OnInit {

  constructor( private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  products: Product[] = [];

  getAllProduct(){
    this.productService.getAllProduct().subscribe(product =>{
      this.products = product;
      console.log(product)
    })
  }

}
