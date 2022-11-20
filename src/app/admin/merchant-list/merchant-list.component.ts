import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {Router} from "@angular/router";
import swal from "sweetalert";
import {AccountService} from "../../service/account/account.service";
import {MailService} from "../../service/mail/mail.service";

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {

  constructor(private merchantService: MerchantService,
              private accountService: AccountService,
              private router: Router,
              private mailService: MailService) {}

  ngOnInit(): void {
    this.getAllMerchant();
    this.router.navigate(["/admin/merchant-list/pending"])
  }
  ngDoCheck(): void {
    this.url = this.router.url;
  }

  url: string = this.router.url;
  merchants: Merchant[] = [];

  getAllMerchant(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant.filter(value => value.status === 'active');
      console.log(merchant)
    })
  }
  blockMerchant(id: number, merchant:Merchant){

    swal({
      title: "Bạn có chắc muốn khóa",
      text: "Merchant:"+merchant.name,
      icon: "warning",
      // @ts-ignore
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Vâng, bạn đã khóa thành công", {
            icon: "success",
          });
          const mer= merchant;
          mer.status = 'block';

          this.merchantService.updateMerchant(id,mer).subscribe(() =>{
            this.accountService.getAccountToMerchant(id).subscribe(data =>{
              console.log(data);
              let mail= data.email;
              this.mailService.acceptRegistration(mail, merchant.name).subscribe(() =>{
                swal("Đã gửi mail thông báo cho người bán!")
              },error => {
                swal("Gửi mail bị lỗi, nhưng người dùng đã bị khóa");
              })
              swal("Đã khóa người dùng"+ merchant.name+ " thành công")
              this.getAllMerchant();

            })


          });
        } else {
          swal("Vâng, bạn đã hủy việc khóa");
        }
      });


  }
}
