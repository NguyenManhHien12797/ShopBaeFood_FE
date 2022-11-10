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
  nameSearch: string;

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
      console.log("products", this.products + "id" + id);
    })
  }

  deleteProduct(idArr: number, id: number) {
    swal({
      title: "Xóa sản phẩm",
      text: `Tên: ${this.products[idArr].name}
      Số lượng bán: ${this.products[idArr].numberOrder}
Mô tả: ${this.products[idArr].shortDescription}`,
      icon: "warning",
      // @ts-ignore
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Xong, bạn đã xóa", {
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
          swal("Bạn đã chọn không xóa");
        }
      });
  }

  //
  // private findProductById(id: number): any {
  //   return this.productService.getProduct(id);
  // }

  search() {
    console.log(this.nameSearch);
    console.log(this.merchantService.getIdUser())
    this.productService.searchProduct(this.merchantService.getIdUser(), this.nameSearch).subscribe(product => {
      this.products = product;
    })
  }
}
