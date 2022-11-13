import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../service/account/account.service";

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  mail: string;
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  forgotpass() {
      this.accountService.forgotpass(this.mail).subscribe(data=>{
        console.log(data);
      })
  }
}
