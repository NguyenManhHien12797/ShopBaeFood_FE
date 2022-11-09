import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/compat/storage";
import {FilebaseService} from "../../service/filebase/filebase.service";
import swal from "sweetalert";
import {ProductService} from "../../service/product/product.service";
import {finalize} from "rxjs";
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
    image: new FormControl("" ),
    shortDescription: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]),
    merchant_id: new FormControl("")
  })
  imgSrc: any = '../../../assets/img/favicon.png';
  selectedImage: any = null;

  constructor(private productService: ProductService,
              private router: Router,
              private storage: AngularFireStorage,
              private filebaseService: FilebaseService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.createForm.patchValue({merchant_id:JSON.parse(localStorage.getItem("user")).id})
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
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload=(e:any)=>this.imgSrc=e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage= event.target.files[0];
      //upload file lên firebase
      if(this.selectedImage!=null){
        console.log("ten file "+this.selectedImage.name)
        const filePath= `${this.selectedImage.name.split('.').splice(0,-1).join('.')}_${new Date().getTime()}`
        console.log("filePath "+filePath)
        const fileRef= this.storage.ref(filePath);
        console.log(fileRef)
        this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe(url=>{
              console.log("url"+url)
              this.createForm.patchValue({image:url})
            })
          })
        ).subscribe();
      }

      //
    }else {
      this.imgSrc='../../../assets/img_1.png'
      this.selectedImage=null;
    }
  }
}
