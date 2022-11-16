import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/product";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private productService: ProductService) {

  }
nameProducts: string[]=["hao","hihi","hi","sal","hd","hihi","hi","sal","hd","hao","hihi","hi","sal","hd","hihi","hi","sal","hd"];
  numberOrder: number[]=[0,9,8,7,6,7,10,3,7,0,9,8,7,6,7,10,3,7];
  nameProduct: string[]=[];
  nuberOrder: number[]=[];
  ngOnInit()
  {
    console.log(this.nameProducts)
    console.log(this.numberOrder)
    this.productService.getAllProductByMerchant(JSON.parse(localStorage.getItem("data")!).merchant.id).subscribe((product)=>{
    console.log(product)
    product.forEach(item=>{
      this.nameProduct.push(item.name);
      this.nuberOrder.push(Number(item.numberOrder))
      console.log(this.nameProduct)
      console.log(this.nuberOrder)
    })
      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: this.nameProduct,
          datasets: [{
            label: 'Data1',
            data: this.nuberOrder,
            backgroundColor:"#e10c0c",
            borderColor: "#fd0172",
            borderWidth: 3
          },
            // {
            //   label: 'Dat21',
            //   data: [19, 12, 5, 10, 1, 6,15],
            //   backgroundColor:"#d51c1c",
            //   borderColor: "#FFAF00",
            //   borderWidth: 1
            // }
          ]
        },
        options: {
          scales: {
            // y: {
            //   beginAtZero: true
            // }
          }
        }
      });

  })


  }

}
