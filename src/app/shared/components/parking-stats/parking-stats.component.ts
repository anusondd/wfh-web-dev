import { Component, OnInit, OnDestroy, TemplateRef, Input, ViewChild } from '@angular/core';
import { StreamDataService } from 'src/app/shared/services/stream-data.service';
import { ParkingRow } from 'src/app/shared/interface/parkingRow';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ModalDirective } from 'ngx-bootstrap';
import { ParkingBox } from '../../interface/parkingBox';
import { SettingService } from 'src/app/modules/setting/service/setting.service';
@Component({
  selector: 'app-parking-stats',
  templateUrl: './parking-stats.component.html',
  styleUrls: ['./parking-stats.component.scss']
})
export class ParkingStatsComponent implements OnInit, OnDestroy {

  @Input() optionCtrl?:boolean = false

  chanel: string = 'parking';
  parkingDataList: ParkingRow[] = [];
  indexRow: number;
  indexBox: number;
  box: ParkingBox;

  public loading: boolean = false;
  public loadingTemplate: TemplateRef<any>;
  public config = { 
    animationType: ngxLoadingAnimationTypes.circle, 
    primaryColour: '#ffffff', 
    secondaryColour: '#ccc', 
    tertiaryColour: '#ffffff', 
    backdropBorderRadius: '3px', 
  };

  @ViewChild('reserveModal', { static: false }) reserveModal: ModalDirective;
  reserveMassage: string;
  @ViewChild('unReserveModal', { static: false }) unReserveModal: ModalDirective;
  unReserveMassage: string;
  @ViewChild('infoModal', { static: false }) infoModal: ModalDirective;
  infoMassage: string;

  constructor(
    private streamDataService: StreamDataService,
    private settingService: SettingService,
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
    this.loading = true
    console.log("getStream")
    this.streamDataService.getData(this.chanel).subscribe(
      (data: any) => {
        console.log("getData", data)
        this.parkingDataList = (data) ? data : []
        this.loading = false
      },
      (err) => {
        console.log("getData", err);
        this.loading = false
      }
    )
  }

  sendData() {
    this.streamDataService.sendData(this.chanel, null);
  }

  selectBox(box:ParkingBox){
    console.log('selectBox',box);
    if(this.optionCtrl){
      this.box = box
      if(this.box.status == "empty"){
        this.reserveMassage = "Do you want to reserve "+this.box.name
        this.reserveModal.show()
      }else if(this.box.status == "reserve"){
        this.unReserveMassage = "Do you want to cancel a reservation "+this.box.name
        this.unReserveModal.show()
      }else{
        this.infoMassage = "This area is temporarily not reserved."
        this.infoModal.show()
      }
    }
  }

  reserve() {
    let box:any = {
      ...this.box,
      status:'reserve'
    }
    delete box.__v
    console.log('reserve',box);
    this.settingService.updateParkingBox(box).subscribe(
      (data: any) => {
        console.log("updateParkingBox", data)
        this.reserveModal.hide()
        this.getStream()
      },
      (err) => {
        console.log("updateParkingBox", err)
      }
    )
  }
  
  unReserve() {
    let box:any = {
      ...this.box,
      status:'empty'
    }
    delete box.__v
    console.log('unReserve',box);
    this.settingService.updateParkingBox(box).subscribe(
      (data: any) => {
        console.log("updateParkingBox", data)
        this.unReserveModal.hide()
        this.getStream()
      },
      (err) => {
        console.log("updateParkingBox", err)
      }
    )
  }

}
