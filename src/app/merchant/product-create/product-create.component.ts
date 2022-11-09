import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../service/account/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  createForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z]+$")]),
    newPrice: new FormControl("", [Validators.required]),
    oldPrice: new FormControl("", [Validators.required]),
    numberOrder: new FormControl("", [Validators.required]),
    shortDescription: new FormControl("", [Validators.required,Validators.minLength(3),Validators.pattern("^[a-zA-Z]+$")]),
  })
  message : string = "";

  constructor(private accountService: AccountService,
              private router: Router) {}

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
    const form= this.createForm.value;
console.log(form)
  }
}
