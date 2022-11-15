import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountToken} from "../../model/accountToken";
import {AccountService} from "../../service/account/account.service";
import {Account} from "../../model/account";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Merchant} from "../../model/merchant";
import {MerchantService} from "../../service/merchant/merchant.service";

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.css']
})
export class MerchantInfoComponent implements OnInit {

  constructor(private accountService: AccountService,
              private storage: AngularFireStorage,
              private merchantService: MerchantService) {
    this.getAccountToId();
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
  adisabeled: boolean = false;

  showFormUpdate(){
    this.disabeled= false;
  }
  show: string = "none";
  showimg(){
    this.show = "";
  }

  showPreview(event: any) {
    this.adisabeled=!this.adisabeled
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
              this.adisabeled=!this.adisabeled;
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

  getAccount(){
    return this.account;
  }


  @Output() newAccountEvent = new EventEmitter<any>();
  addNewAccount(){
    this.newAccountEvent.emit(this.account);
  }

}
