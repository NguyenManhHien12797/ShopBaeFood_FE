import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {Product} from "../../model/product";
import {ProductService} from "../../service/product/product.service";
import {CartService} from "../../service/cart/cart.service";
import {Cart} from "../../model/cart";
import {AppUser} from "../../model/appUser";
import {CartDTO} from "../../model/cartDTO";
import swal from "sweetalert";

@Component({
  selector: 'app-product-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.css']
})
export class MerchantDetailComponent implements OnInit {
  id: number;
  merchant: Merchant;
  products: Product[] = [];
  nameSearch: string;
  cart: Cart;
  cartDTO: CartDTO;
  user: AppUser;
  listCart: Cart[];
  // @ts-ignore
  // idMerchant:any=this.merchant.id
  private i: number=5;
  constructor(private activatedRoute: ActivatedRoute,
              private merchantService: MerchantService,
              private productService: ProductService,
              private cartService: CartService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getMerchant(this.id);
      this.getProductByMerchant(this.id);
      // this.findCartByUserID();
    })

  }

  @Output() newCartEvent = new EventEmitter<any>();
  addNewCart(){
    this.newCartEvent.emit()
  }

  private getMerchant(id: any) {
    this.merchantService.findMerchantById(id).subscribe(merchant => {
      this.merchant = merchant;
    })
  }

  private getProductByMerchant(id: any) {
    this.productService.getAllProductByMerchant(id).subscribe(products => {
      this.products = products;
    })
  }

  search() {
    this.productService.searchProduct(this.id, this.nameSearch).subscribe(product => {
      this.products = product;
    })
  }


  addToCart(product: Product) {
    console.log(product)

    let price = product.newPrice;
    let data = JSON.parse(localStorage.getItem("data")!);
    if(data == null){
      swal("Vui lòng đăng nhập để đặt hàng!")
      this.router.navigate(['/login']);
    }
    let user_id =data.user.id;

    let quantity = 1;
    let totalPrice = (product.newPrice * quantity);
    let cart = new CartDTO(quantity,price, totalPrice,user_id, product.id);
    this.cartDTO = cart;

    this.cartService.addToCart(cart).subscribe(data =>{
      swal("Đã thêm "+product.name+" vào giỏ hàng")
      if(data.message === 'Co cart roi'){
        console.log("Da co cart roi")
        this.cartService.upDateToCart(product.id, user_id).subscribe(data =>{
          swal("Đã thêm "+product.name+" vào giỏ hàng")
        }, error => {
          console.log("loi up to cart")
        })
      }

    }, error => {
      console.log("loi add to cart")
    });

  }

  // @ts-ignore
  // findCartByProuct(id: number): Cart {
  //   console.log(id)
  //   this.cartService.findCartByProuct(id).subscribe(data => {
  //     console.log(data);
  //     return data;
  //   }, error => {
  //     console.log("Tim cart loi")
  //     return null;
  //   })
  // }
  hidden(i: any): Boolean {
    return i>=this.i
  }
  plus(){
    this.i+=5;
  }
}
