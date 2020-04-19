import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { StreamDataService } from 'src/app/shared/services/stream-data.service';
import { ParkStats } from 'src/app/shared/interface/parking-stats.model';
import { environment } from 'src/environments/environment';
import * as moment from "moment";
import { ParkingStatsService } from '../../services/parking-stats.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-sensor-stats',
  templateUrl: './sensor-stats.component.html',
  styleUrls: ['./sensor-stats.component.scss']
})
export class SensorStatsComponent implements OnInit, OnDestroy {

  empty: number = 0 ;
  parked: number = 0 ;
  reserved: number = 0 ;
  offline: number = 0 ;

  chanel:string = 'parkingStats';

  parkStats:ParkStats = {
    code:environment.CODE,
    name:environment.NAME,
    disconnect:0,
    empty:0,
    parking:0,
    reserve:0,
    timeUpdateData:new Date().toISOString()
  }

  @ViewChild('switchModal', { static: false }) switchModal: ModalDirective;
  switchMassage: string;

  constructor(
    private streamDataService:StreamDataService,
    private parkingStatsService:ParkingStatsService,
  ) { 
    this.joinStream()
  }

  ngOnInit() {
    this.getStream()
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.streamDataService.disconnect()
  }

  joinStream() {
    this.streamDataService.connect();
  }

  closeStream() {
    this.streamDataService.disconnect();
  }

  getStream() {
    console.log("getStream")
    this.streamDataService.getData(this.chanel).subscribe(
      (data: any) => {
        console.log("getData", data)
        this.parkStats = (data)?data:this.parkStats
      },
      (err) => {
        console.log("getData", err);
      }
    )
  }

  sendData() {
    this.streamDataService.sendData(this.chanel,null);
  }

  convertDate(val){
    return moment(val,'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss').toString()
  }

  switchPark(parkStats:ParkStats){
    console.log('switchPark',parkStats);
    this.switchMassage = `Do you want to ${parkStats.status?"Close":"Open"} Park`;
    this.switchModal.show()
  }

  updatePark(){
    let parkStats:any = {
      ...this.parkStats,
      status:!this.parkStats.status
    }
    delete parkStats.timeUpdateData
    delete parkStats.__v
    this.parkingStatsService.update(parkStats).subscribe(
      (data: any) => {
        console.log("updatePark", data)
        this.switchModal.hide()
        this.getStream()
      },
      (err) => {
        console.log("updatePark", err)
      }
    )
  }

}
