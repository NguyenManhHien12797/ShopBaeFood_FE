import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../service/account/account.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MerchantService} from "../../service/merchant/merchant.service";
import {Account} from "../../model/account";
import {Merchant} from "../../model/merchant";
import {finalize} from "rxjs";
import {Router} from "@angular/router";
import {AccountToken} from "../../model/accountToken";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private accountService: AccountService,
              private storage: AngularFireStorage,
              private merchantService: MerchantService,
              private router: Router) {
    this.getAccountToId();
    this.getAccountToken();
  }

  ngOnInit(): void {


  }

  ngDoCheck(): void {
  }

  account:Account;
  imgSrc: any;
  selectedImage: any;
  merchant: Merchant;

  getAccountToId(){
    let account_id = JSON.parse(localStorage.getItem("data")!).id;
    this.merchant = JSON.parse(localStorage.getItem("data")!).merchant;
    this.accountService.getAccountToId(account_id).subscribe(data =>{
      this.account = data;
      console.log("day la acc")
      console.log(data)
      console.log("day la acc")
      this.imgSrc= this.account.merchant.avatar;
    });
  }

  disabeled: boolean = true;

  showFormUpdate(){
    this.disabeled= false;
  }
  show: string = "none";
  showimg(){
    this.show = "";
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0];
      //upload file lên firebase
      if (this.selectedImage != null) {
        const filePath = `${this.selectedImage.name.split('.').splice(0, -1).join('.')}_${new Date().getTime()}`
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.account.merchant.avatar = url;
            })
          })
        ).subscribe();
      }
    } else {
      this.imgSrc = this.merchant.avatar;
      this.selectedImage = null;
    }
  }

  updateMerchantInfo(){
    this.account.enabled = true;
    this.accountService.updateAccountMerchant(this.account.id, this.account).subscribe(() =>{
      console.log("update thanh cong");
      console.log(this.account);
      this.getAccountToId();
      this.disabeled = true;
    });
    this.merchantService.updateMerchant(this.merchant.id, this.account.merchant).subscribe(() =>{
      console.log("update thanh cong lan 2");
    })
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/home'])
  }

  url: string = this.router.url;
  acc: AccountToken;
  data: any;
  message: string;

  getAccountToken(){
    this.data = localStorage.getItem("data")!;
    return JSON.parse(this.data);

  }

}
