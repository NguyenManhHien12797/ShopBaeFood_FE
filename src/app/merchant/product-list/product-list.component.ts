import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/product";
import {MerchantService} from "../../service/merchant/merchant.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  id: number

  constructor(private merchantService: MerchantService,
              private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    // this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
    //   // @ts-ignore
    //   this.id = +paramMap.get('id');
    //   this.getAllProduct(this.id);
    // })
    this.getAllProduct(merchantService.getIdUser());
  }

  ngOnInit(): void {
  }

  products: Product[] = [];

  getAllProduct(id: number) {
    this.productService.getAllProductByMerchant(id).subscribe(products => {
      this.products = products
      console.log(this.products);
    })
  }

  deleteProduct(idArr: number,id: number) {
    const pro = this.findProductById(id);
    swal({
      title: "Delete product",
      text: `Name: ${pro.name}
Description: ${pro.shortDecription}`,
      icon: "warning",
      // @ts-ignore
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Done, you deleted it", {
            icon: "success",
          });
          this.productService.deleteProduct(id).subscribe(
            next => {
                  this.products.splice(idArr, 1);
            },
            error => {
              alert("error")
            }
          );
        } else {
          swal("you choose not to delete");
        }
      });
  }

  private findProductById(id: number): any {
    return this.productService.getProduct(id);
  }

}
