import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalculateDateService {

  constructor() { }

  getDate(date: Date, option: string):CalcuDate {
    let start;
    let end;

    switch (option) {

      // week current
      case "week":
        start = moment(date).startOf('week').toDate();
        end = moment(date).endOf('week').toDate();
        return { start: start, end: end };

      // month current
      case "month":
        start = moment(date).startOf('month').toDate();
        end = moment(date).endOf('month').toDate();
        return { start: start, end: end };

      // year current
      case "year":
        start = moment(date).startOf('year').toDate();
        end = moment(date).endOf('year').toDate();
        return { start: start, end: end };

      // ย้อนหลัง 1 สัปดาห์ หรือ 7 วัน นับจากวันที่ปัจจุบัน
      case "1 week":
        start = moment(date).add(-7, 'day').toDate();
        end = date;
        return { start: start, end: end };

      // ย้อนหลัง 1 เดือน หรือ 30 วัน นับจากวันที่ปัจจุบัน
      case "1 month":
        start = moment(date).add(-30, 'day').toDate();
        end = date;
        return { start: start, end: end };

      // ย้อนหลัง 3 เดือน หรือ 90 วัน นับจากวันที่ปัจจุบัน
      case "3 month":
        start = moment(date).add(-90, 'day').toDate();
        end = date;
        return { start: start, end: end };

      // ย้อนหลัง 6 เดือน หรือ 180 วัน นับจากวันที่ปัจจุบัน
      case "6 month":
        start = moment(date).add(-180, 'day').toDate();
        end = date;
        return { start: start, end: end };

      // ย้อนหลัง 1 ปี หรือ 365 วัน นับจากวันที่ปัจจุบัน
      case "1 year":
        start = moment(date).add(-365, 'day').toDate();
        end = date;
        return { start: start, end: end };

      default:
        return { start: date, end: date };
    }
  }

  getAllDateOfWeek(startDate:Date):Date[]{
    let listDate = [];
    for (let index = 0; index < 7; index++) {
      let date = moment(startDate).add(index,'day').toDate()
      listDate.push(date);      
    }

    return listDate;
  }

  getWeekOfYear(year){
    let startDate = '01/01/'+year;
    let weekAmt = moment(startDate,'DD/MM/YYYY').weeksInYear();
    let weekList = [];
    
    for (let index = 0; index < weekAmt; index++) {
      let date = moment().week(index+1).toDate();
      let start = this.getDate(date,'week').start;
      let end = this.getDate(date,'week').end;
      weekList[index] = { start: start.getTime(), end: end.getTime() };    
    }
    return weekList;
  }
  
  getWeekOfMount(dateNow:Date):CalcuDate[]{
    
    // let startDate = '01/01/'+year;
    let stoptWeek = moment(dateNow).get('week')
    let startWeek = moment(dateNow).add('week',-8).get('week')
    let weekList = [];
    
    for (let index = startWeek; index < stoptWeek; index++) {
      let date = moment().week(index+1).toDate();
      let start = this.getDate(date,'week').start;
      let end = this.getDate(date,'week').end;
      weekList[index] = { start: start, end: end };    
    }
    return weekList;
  }



}

export interface CalcuDate {
  start:Date;
  end:Date;
}
