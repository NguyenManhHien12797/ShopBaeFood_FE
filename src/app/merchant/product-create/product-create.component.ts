import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/compat/storage";
import swal from "sweetalert";
import {ProductService} from "../../service/product/product.service";
import {finalize, Observable} from "rxjs";
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  createForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]),
    newPrice: new FormControl("", [Validators.required]),
    oldPrice: new FormControl("", [Validators.required]),
    image: new FormControl("https://firebasestorage.googleapis.com/v0/b/shopbae-f1ccb.appspot.com/o/_1668098290964?alt=media&token=007d3fa2-b386-4ce4-993d-e8ebb48ab05d"),
    shortDescription: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]),
    merchant: new FormControl(""),
    deleteFlag: new FormControl("")
  })
  imgSrc: any = '../../../assets/img/favicon.png';
  selectedImage: any = null;

  constructor(private productService: ProductService,
              private merchantSevice: MerchantService,
              private router: Router,
              private storage: AngularFireStorage) {
    // @ts-ignore
    let id = JSON.parse(localStorage.getItem("data")).merchant.id;
    console.log("merchantId"+id)
    this.merchantSevice.findMerchantById(id).subscribe(merchant => {

      this.createForm.patchValue({merchant: merchant})
      // console.log(merchant)
    });
    this.createForm.patchValue({deleteFlag: true})
    // console.log("alo"+this.merchant);
  }

  // merchant: Merchant;

  ngOnInit(): void {


  }

  get name() {
    return this.createForm.get("name")
  }

  get newPrice() {
    return this.createForm.get("newPrice")
  }

  get numberOrder() {
    return this.createForm.get("numberOrder")
  }

  get shortDescription() {
    return this.createForm.get("shortDescription")
  }

  get oldPrice() {
    return this.createForm.get("oldPrice")
  }

  create() {
    const form = this.createForm.value;
    console.log(form)
    swal("Thêm thành công", "good", "success")
    this.productService.createProduct(form)
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
              this.createForm.patchValue({image: url})
              console.log(this.createForm)
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
}
