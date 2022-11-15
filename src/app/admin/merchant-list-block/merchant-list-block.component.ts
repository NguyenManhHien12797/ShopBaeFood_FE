import { Component, OnInit } from '@angular/core';
import {Merchant} from "../../model/merchant";
import {MerchantService} from "../../service/merchant/merchant.service";
import {AccountService} from "../../service/account/account.service";
import {MailService} from "../../service/mail/mail.service";
import swal from "sweetalert";

@Component({
  selector: 'app-merchant-list-block',
  templateUrl: './merchant-list-block.component.html',
  styleUrls: ['./merchant-list-block.component.css']
})
export class MerchantListBlockComponent implements OnInit {

  constructor(private merchantService: MerchantService,
              private accountService: AccountService,
              private mailService: MailService) { }

  ngOnInit(): void {
    this.getAllMerchant()
  }
  merchants: Merchant[]= [];


  getAllMerchant(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant.filter(value => value.status === 'block');
    })
  }

  activeMerchant(id: number, merchant: Merchant) {
    swal({
      title: "Bạn có muốn mở khóa",
      text: "Merchant:"+merchant.name,
      icon: "warning",
      //@ts-ignore
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Vâng, bạn đã mở khóa ", {
            icon: "success",
          });
          const mer= merchant;
          mer.status = 'active';

          this.merchantService.updateMerchant(id,mer).subscribe(() =>{
            this.accountService.getAccountToMerchant(id).subscribe(data =>{
              console.log(data);
              let mail= data.email;
              this.mailService.acceptRegistration(mail, merchant.name).subscribe(() =>{
                swal("Đã gửi mail thông báo cho người bán!")
              },error => {
                swal("Gửi mail bị lỗi, nhưng người dùng đã được mở khóa");
              })
              swal("Đã mở khóa người dùng"+ merchant.name+ " thành công")
              this.getAllMerchant();

            })


          });
        } else {
          swal("Vâng, bạn đã hủy chọn");
        }
      });


  }
}
