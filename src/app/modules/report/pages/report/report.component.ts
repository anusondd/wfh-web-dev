import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ReportService } from "src/app/shared/services/report.service";
import { Transaction } from "src/app/shared/interface/transaction";
import * as moment from 'moment';
import { FormReport } from 'src/app/shared/interface/form-report';
import { ParkingReport } from 'src/app/shared/interface/parking-report.model';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

export interface PeriodicElement {
  no: number;
  id: number;
  position: string;
  timeStart: string;
  timeOut: string;
}

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {

  form: FormGroup;
  model: FormReport;
  // transactionData: Transaction;
  transactionData: ParkingReport[];
  dataSensor: any;
  resultsLength: number = 0;
  formSubmitAttempt: Boolean;
  total:number = 0;

  displayedColumns: string[] = ["no", "id", "position", "timeStart", "timeOut","timeDis","total",];

  // displayedColumns: string[] = ["no", "ไอดี Sensor", "ทีชื่อ่จอด", "เวลาเข้า (ล่าสุด)", "เวลาออก (ล่าสุด)","เวลาขาดการเชื่อตม่อ (ล่าสุด)","จำนวนเข้าใช้งาน"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public loading: boolean = false;
  public loadingTemplate: TemplateRef<any>;
  public config = { 
    animationType: ngxLoadingAnimationTypes.circle, 
    primaryColour: '#ffffff', 
    secondaryColour: '#ccc', 
    tertiaryColour: '#ffffff', 
    backdropBorderRadius: '3px', 
  };
  
  constructor(
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
    public reportService: ReportService
  ) {
    this.formBuild();
  }
  ngOnInit() {
    this.searchTransaction()
  }
  formBuild() {
    this.form = this.fb.group({
      startDate: [new Date(), Validators.compose([Validators.required])],
      stopDate: [new Date(), Validators.compose([Validators.required])],
      status: ["empty", Validators.compose([Validators.required])],
      pageSize: [10, Validators.compose([Validators.required])],
      pageIndex: [1, Validators.compose([Validators.required])]
    });
  }

  prepareSearchData(): any {
    const formModel = this.form.value;
    let startDate = moment(formModel.startDate).set('hour',0).set('minute',0).format('DD-MM-YYYY HH:mm').toString()
    let stopDate = moment(formModel.stopDate).set('hour',23).set('minute',59).format('DD-MM-YYYY HH:mm').toString()

    const searchData: any = {
      startDate: startDate,
      stopDate: stopDate,
      // status: formModel.status,
      // pageSize: formModel.pageSize,
      // pageIndex: formModel.pageIndex,
    };
    return searchData;
  }
  searchTransaction() {
    this.model = this.prepareSearchData();
    if (this.form.valid) {
      this.formSubmitAttempt = false
      this.reportService.getReport(this.model).subscribe(
        (result: any) => {
          console.log("searchTransaction : ", result);
          this.transactionData = result.boxList;
          this.total = result.total;
          this.dataSensor = new MatTableDataSource(this.transactionData);
          // this.dataSensor.sort = this.sort;
          // this.resultsLength = this.transactionData.docResultTotal;
          // console.log("this.resultsLength : ", this.resultsLength);
        },
        error => {
          console.log("searchTransaction : ", error);
        }
      );
    }else {
      this.formSubmitAttempt = true
    }
  }

  nextPage(page) {
    let pageIndex = page.pageIndex+1;
    if (pageIndex > 0) {
      this.form.get("pageIndex").setValue(pageIndex);
      this.searchTransaction();
    }
  }
  downloadFile() {
    this.loading = true
    this.reportService.downloadReport(this.model).subscribe(
      (result:any) => {
        this.reportService.openFlie(result)
        this.loading = false
      },
      (error) => {
        console.log("downloadFile : ",error);
        this.loading = false
      }
    )
  }

  convertDate(val){
    return moment(val).add('year',543).format('DD/MM/YYYY HH:mm').toString()
  }

  convertDate2(val){
    return moment(val,'DD-MM-YYYY HH:mm').add('year',543).format('DD/MM/YYYY HH:mm').toString()
  }
}
