import { Component, OnInit, ViewChild } from "@angular/core";
import { ParkingRow } from "src/app/shared/interface/parkingRow";
import { ModalDirective } from 'ngx-bootstrap';
import { ParkingBox } from 'src/app/shared/interface/parkingBox';

@Component({
  selector: "app-management",
  templateUrl: "./management.component.html",
  styleUrls: ["./management.component.scss"]
})
export class ManagementComponent implements OnInit {
  empty: number = 0;
  parked: number = 0;
  reserved: number = 0;
  offline: number = 0;

  parkingDataList: ParkingRow;

  indexRow: number;
  indexBox: number;
  box: ParkingBox;

  @ViewChild('reserveModal', { static: false }) reserveModal: ModalDirective;
  reserveMassage: string;
  @ViewChild('unReserveModal', { static: false }) unReserveModal: ModalDirective;
  unReserveMassage: string;
  @ViewChild('infoModal', { static: false }) infoModal: ModalDirective;
  infoMassage: string;

  constructor() { }

  ngOnInit() {

  }

  calculat() {
    let parkingData: any = Object.freeze(this.parkingDataList);

    for (let index = 0; index < parkingData.length; index++) {
      this.empty += parkingData[index].empty;
      this.parked += parkingData[index].parking;
      this.reserved += parkingData[index].reserve;
      this.offline += parkingData[index].disconnect;
    }
  }

  selectBox(j,i,box:ParkingBox){
    console.log('selectBox',box);
    this.indexRow = i
    this.indexBox = j
    this.box = box
    if(this.box.status == "empty"){
      this.reserveMassage = "Do you want to reserve "+this.box.name
      this.reserveModal.show()
    }else if(this.box.status == "reserved"){
      this.unReserveMassage = "Do you want to cancel a reservation "+this.box.name
      this.unReserveModal.show()
    }else{
      this.infoMassage = "This area is temporarily not reserved."
      this.infoModal.show()
    }
  }

  reserve(j,i) {
    // console.log('selectBox',box);
    this.parkingDataList[i].parkingBox[j].status = "reserved"
    this.calculat()
    this.reserveModal.hide()
  }
  
  unReserve(j,i) {
    // console.log('selectBox',box);
    this.parkingDataList[i].parkingBox[j].status = "empty"
    this.calculat()
    this.unReserveModal.hide()
  }

}
