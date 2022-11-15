import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import swal from "sweetalert";
import {AccountService} from "../../service/account/account.service";
import {MailService} from "../../service/mail/mail.service";

@Component({
  selector: 'app-merchant-list-active',
  templateUrl: './merchant-list-active.component.html',
  styleUrls: ['./merchant-list-active.component.css']
})
export class MerchantListActiveComponent implements OnInit {

  constructor(private merchantService: MerchantService,
              private accountService: AccountService,
              private mailService: MailService) { }

  ngOnInit(): void {
    this.getAllMerchant();
  }

  merchants: Merchant[]= [];


  getAllMerchant(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant.filter(value => value.status === 'active');
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
