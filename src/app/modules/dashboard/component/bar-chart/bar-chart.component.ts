import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { CalculateDateService } from 'src/app/shared/services/calculate-date.service';
import { ReportService } from 'src/app/shared/services/report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  // === Bar Chart ===
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [95, 105, 120, 110, 140, 130, 100], label: 'Bar Chart', },
    { data: [95, 105, 120, 110, 140, 130, 100], label: 'Bar Chart', },
    { data: [95, 105, 120, 110, 140, 130, 100], label: 'Bar Chart', },
    { data: [95, 105, 120, 110, 140, 130, 100], label: 'Bar Chart', },
  ];

  barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#0b9ad3',
    },
  ];
  
  constructor(
    public calculateDateService:CalculateDateService,
    public reportService:ReportService,
  ) { 
    this.getTransaction()
  }

  ngOnInit() {
    // this.getTransaction()
  }

  getTransaction(){
    let date = this.calculateDateService.getAllDateOfWeek(new Date)
    let dateList = date.map(val=>{
      return {
        startDate:moment(val).set('hour',0).set('minute',0).format('DD-MM-YYYY HH:mm').toString(),
        stopDate:moment(val).set('hour',23).set('minute',59).format('DD-MM-YYYY HH:mm').toString()
      }
    }) 
    
    this.reportService.getCountTransaction(dateList,'parking').subscribe(
      (res)=>{
        // console.log('getWeekOfMount',res);       
        let data = res.map(val=>{return val.count})
        this.barChartData[0] = { data: data, label: 'Parking' ,borderColor: '#038bda',backgroundColor: '#038bda',}
      }
    )
    this.reportService.getCountTransaction(dateList,'empty').subscribe(
      (res)=>{
        // console.log('getWeekOfMount',res);       
        let data = res.map(val=>{return val.count})
        this.barChartData[1] = { data: data, label: 'Empty' ,borderColor: '#14b414',backgroundColor: '#14b414',}
      }
    )
    this.reportService.getCountTransaction(dateList,'reserve').subscribe(
      (res)=>{
        // console.log('getWeekOfMount',res);       
        let data = res.map(val=>{return val.count})
        this.barChartData[2] = { data: data, label: 'Reserved' ,borderColor: 'grey',backgroundColor: 'grey',}
      }
    )
    this.reportService.getCountTransaction(dateList,'disconnect').subscribe(
      (res)=>{
        // console.log('getWeekOfMount',res);       
        let data = res.map(val=>{return val.count})
        this.barChartData[3] = { data: data, label: 'Offline' ,borderColor: '#db2323',backgroundColor: '#db2323',}
      }
    )

  }

}
