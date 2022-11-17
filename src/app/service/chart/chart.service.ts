import { Injectable } from '@angular/core';
import {Chart} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }
  chart(labels:any,data1:any,label1:string,type:string,bgColor:any,bdColor:any,label2:any,data2:any): Chart{
    return  new Chart("myChart", {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: label1,
          data: data1,
          backgroundColor:bgColor,
          borderColor: bdColor,
          borderWidth: 3
        },
          {
            label: label2,
            data: data2,
            backgroundColor:"rgba(89,21,234,0.55)",
            borderColor: "#3700ff",
            borderWidth: 1
          }
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
  }
}
