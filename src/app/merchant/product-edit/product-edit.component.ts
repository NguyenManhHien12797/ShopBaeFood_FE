import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product/product.service";
import {MerchantService} from "../../service/merchant/merchant.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import swal from "sweetalert";
import {finalize} from "rxjs";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  id: number
  editForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]),
    newPrice: new FormControl("", [Validators.required]),
    oldPrice: new FormControl("", [Validators.required]),
    image: new FormControl(""),
    shortDescription: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]),
    merchant: new FormControl(""),
    deleteFlag: new FormControl("")
  })
  imgSrc: any = '../../../assets/img/favicon.png';
  selectedImage: any = null;

  constructor(private productService: ProductService,
              private merchantSevice: MerchantService,
              private router: Router,
              private storage: AngularFireStorage,
              private activatedRoute: ActivatedRoute) {
    // @ts-ignore
    let id = JSON.parse(localStorage.getItem("user")).id;
    console.log(id)
    this.merchantSevice.findMerchantById(id).subscribe(merchant => {

      this.editForm.patchValue({merchant: merchant})
      // console.log(merchant)
    });
    this.editForm.patchValue({deleteFlag: true})
    // console.log("alo"+this.merchant);
      this.activatedRoute.paramMap.subscribe( (paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getProduct(this.id);
    })
  }

  // merchant: Merchant;

  ngOnInit(): void {


  }

  get name() {
    return this.editForm.get("name")
  }

  get newPrice() {
    return this.editForm.get("newPrice")
  }

  get numberOrder() {
    return this.editForm.get("numberOrder")
  }

  get shortDescription() {
    return this.editForm.get("shortDescription")
  }

  get oldPrice() {
    return this.editForm.get("oldPrice")
  }

  edit() {
    const form = this.editForm.value;
    console.log(form)
    swal("Sửa thành công", "good", "success")
    this.productService.updateProduct(this.product.id,form)
      .subscribe(() => {
        this.router.navigate(['/merchant/product-list'])
      });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0];
      //upload file lên firebase
      if (this.selectedImage != null) {
        console.log("ten file " + this.selectedImage.name)
        const filePath = `${this.selectedImage.name.split('.').splice(0, -1).join('.')}_${new Date().getTime()}`
        console.log("filePath " + filePath)
        const fileRef = this.storage.ref(filePath);
        console.log(fileRef)
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              console.log("url" + url)
              this.editForm.patchValue({image: url})
            })
          })
        ).subscribe();
      }

      //
    } else {
      this.imgSrc = '../../../assets/img_1.png'
      this.selectedImage = null;
    }
  }

  private getProduct(id: number) {
    this.productService.getProduct(id).subscribe(product=>{
      this.product=product;
      this.imgSrc=product.image;
    })
  }
}
