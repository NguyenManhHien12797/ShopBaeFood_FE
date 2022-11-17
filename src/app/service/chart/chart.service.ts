import { Injectable } from '@angular/core';
import {Chart} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }
  chart(labels:any,data:any,label:string,type:string,bgColor:any,bdColor:any): Chart{
    return  new Chart("myChart", {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: data,
          backgroundColor:bgColor,
          borderColor: bdColor,
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
  }
}
