import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { CalculateDateService } from 'src/app/shared/services/calculate-date.service';
import { ReportService } from 'src/app/shared/services/report.service';
import * as moment from 'moment';

@Component({
  selector: 'app-liner-chart',
  templateUrl: './liner-chart.component.html',
  styleUrls: ['./liner-chart.component.scss']
})
export class LinerChartComponent implements OnInit {

  // === Line Chart ===
  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Line Parking',borderColor: 'black',backgroundColor: '#a3a5b493', },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Line Parking',borderColor: 'black',backgroundColor: '#a3a5b493', },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Line Parking',borderColor: 'black',backgroundColor: '#a3a5b493', },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Line Parking',borderColor: 'black',backgroundColor: '#a3a5b493', },
  ];

  lineChartLabels: Label[] = ['week 1', 'week 2', 'week 3', 'week 4', 'week 5', 'week 6', 'week 7', 'week 8'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#a3a5b493',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  
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
    let date = this.calculateDateService.getWeekOfMount(new Date)
    // console.log('getWeekOfMount',date);  
    let dateList = []

    date.forEach((val,i) => {
      dateList.push({
        startDate:moment(val.start).set('hour',0).set('minute',0).format('DD-MM-YYYY HH:mm').toString(),
        stopDate:moment(val.end).set('hour',23).set('minute',59).format('DD-MM-YYYY HH:mm').toString()
      })
    })

    let j = 0
    date.forEach((val,i) => {
      this.lineChartLabels[j] = 'week '+i
      j++
    })

    this.reportService.getCountTransaction(dateList,'parking').subscribe(
      (res)=>{
        // console.log('getWeekOfMount',res);       
        let data = res.map(val=>{return val.count})
        this.lineChartData[0] = { data: data, label: 'Parking' ,borderColor: '#038bda',backgroundColor: '#a3a5b493',}
      }
    )
    this.reportService.getCountTransaction(dateList,'empty').subscribe(
      (res)=>{
        // console.log('getWeekOfMount',res);       
        let data = res.map(val=>{return val.count})
        this.lineChartData[1] = { data: data, label: 'Empty' ,borderColor: '#14b414',backgroundColor: '#a3a5b493',}
      }
    )
    this.reportService.getCountTransaction(dateList,'reserve').subscribe(
      (res)=>{
        // console.log('getWeekOfMount',res);       
        let data = res.map(val=>{return val.count})
        this.lineChartData[2] = { data: data, label: 'Reserved' ,borderColor: 'grey',backgroundColor: '#a3a5b493',}
      }
    )
    this.reportService.getCountTransaction(dateList,'disconnect').subscribe(
      (res)=>{
        // console.log('getWeekOfMount',res);       
        let data = res.map(val=>{return val.count})
        this.lineChartData[3] = { data: data, label: 'Offline' ,borderColor: '#db2323',backgroundColor: '#a3a5b493',}
      }
    )
  }

}
