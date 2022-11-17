import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/product";
import {ChartService} from "../../service/chart/chart.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private productService: ProductService,
              private chartService: ChartService) {
    this.color = "red";
    this.type= "bar"
    console.log(this.nameProducts)
    console.log(this.numberOrder)
    this.productService.getAllProductByMerchant(JSON.parse(localStorage.getItem("data")!).merchant.id).subscribe((product) => {
      console.log(product)
      product.forEach(item => {
        this.nameProducts.push(item.name);
        this.numberOrder.push(Number(item.numberOrder))
      })
      var myChart = this.chartService.chart(this.nameProducts, this.numberOrder, "Số bán ra",this.type, this.color, "black")

    })
  }

  nameProducts: string[] = [];
  numberOrder: number[] = [];
  color: any;
  type:any;

  ngOnInit() {

  }

setType(){
    this.type="bar"
  this.setColor(this.color)
}
  setColor(element: any) {
 this.nameProducts=[]
    this.numberOrder=[]
    this.color = element
    console.log(this.color)
    console.log(this.nameProducts)
    console.log(this.numberOrder)
    this.productService.getAllProductByMerchant(JSON.parse(localStorage.getItem("data")!).merchant.id).subscribe((product) => {
      console.log(product)
      product.forEach(item => {
        this.nameProducts.push(item.name);
        this.numberOrder.push(Number(item.numberOrder))
      })
      var myChart = this.chartService.chart(this.nameProducts, this.numberOrder, "Số bán ra",this.type, this.color, "black")

    })
  }

  convert() {
    this.type="radar"
    this.setColor(this.color)
  }
}
