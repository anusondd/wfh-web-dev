import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    public http: HttpClient,
  ) { }

  getTransaction(startDate: string, stopDate: string, status: '') {
    let params = {
      startDate: startDate,
      stopDate: stopDate,
      status: status
    }

    return this.http.get(`${environment.HOST_API}/report/transaction`, {params:params}).pipe(map((res: any) => res.data))
  }

  getCountTransaction(dateList:any[], status:string='') {
    let params = {
      dateList: dateList,
      status: status
    }

    return this.http.post(`${environment.HOST_API}/report/transaction-count`, params).pipe(map((res: any) => res.data))
  }

  getReport(params) {
    console.log("params : ",params);
    // let params = {
    //   startDate: startDate,
    //   stopDate: stopDate,
    //   status: status,
    //   pageSize: pageSize,
    //   pageIndex: pageIndex
    // }

    return this.http.post(`${environment.HOST_API}/report/transaction`, params).pipe(map((res: any) => res.data))
  }

  downloadReport(params) {
    // let params = {
    //   startDate: startDate,
    //   stopDate: stopDate,
    //   status: status,
    // }
    delete params.pageSize;
    delete params.pageIndex;
    return this.http.post(`${environment.HOST_API}/report/transaction-temp`, params).pipe(map((res: any) => res.data))
  }

  openFlie(params) {
    window.open(`${environment.HOST_API}/file/download-file?id=`+params)
  }
  
}
