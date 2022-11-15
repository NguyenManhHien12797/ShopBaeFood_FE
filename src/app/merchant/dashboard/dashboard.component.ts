import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit()
  {
    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['sunday', 'monday', 'tuesday', 'webnesday', 'Thursday', 'friday', 'saturday'],
        datasets: [{
          label: 'Data1',
          data: [12, 19, 3, 5, 2, 3,0],
          backgroundColor:"#151617",
          borderColor: "#0196FD",
          borderWidth: 1
        },
          {
            label: 'Dat21',
            data: [19, 12, 5, 10, 1, 6,15],
            backgroundColor:"#d51c1c",
            borderColor: "#FFAF00",
            borderWidth: 1
          }]
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
