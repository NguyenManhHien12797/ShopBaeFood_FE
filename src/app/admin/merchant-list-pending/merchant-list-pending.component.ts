import { Component, OnInit } from '@angular/core';
import {MerchantService} from "../../service/merchant/merchant.service";
import {Merchant} from "../../model/merchant";
import {MailService} from "../../service/mail/mail.service";
import swal from "sweetalert";
import {AccountService} from "../../service/account/account.service";
@Component({
  selector: 'app-merchant-list-pending',
  templateUrl: './merchant-list-pending.component.html',
  styleUrls: ['./merchant-list-pending.component.css']
})
export class MerchantListPendingComponent implements OnInit {

  constructor(private merchantService: MerchantService,
              private mailService: MailService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllMerchant();
  }

  merchants: Merchant[]= [];


  getAllMerchant(){
    this.merchantService.getAllMerchant().subscribe(merchant =>{
      this.merchants = merchant.filter(value => value.status === 'pending');
    })
  }

  acceptMerchant(id: number, merchant:Merchant){
    swal({
      title: "Bạn có chắc muốn xác nhận",
      text: "Merchant:"+merchant.name,
      icon: "warning",
      //@ts-ignore
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Vâng, bạn đã xác nhận thành công", {
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
                swal("Gửi mail bị lỗi, nhưng người dùng đã được chấp nhận");
              })
              swal("Chấp nhận cho người dùng "+ merchant.name+ " đăng ký thành người bán")
              this.getAllMerchant();

            })


          });

        } else {
          swal("Vâng, bạn đã hủy chọn");
        }
      });


  }

  refuseMerchant(id: number, merchant:Merchant){
    swal({
      title: "Bạn có chắc muốn không muốn phê duyệt",
      text: "Merchant:"+merchant.name,
      icon: "warning",
      //@ts-ignore
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Vâng, bạn đã hủy phê duyệt người bán", {
            icon: "success",
          });
          const mer= merchant;
          mer.status = 'refuse';
          this.merchantService.updateMerchant(id,mer).subscribe(() =>{
            this.accountService.getAccountToMerchant(id).subscribe(data =>{
              let mail= data.email;
              this.mailService.refuseToRegister(mail).subscribe(() =>{
                swal("Đã gửi mail thông báo cho người bán!")
              },error => {
                swal("Gửi mail bị lỗi");
              })
              swal("Từ chối cho người dùng "+ merchant.name+ " đăng ký thành người bán")
              this.getAllMerchant();

            })

          });
        } else {
          swal("Vâng, bạn đã hủy chọn");
        }
      });


  }

}
