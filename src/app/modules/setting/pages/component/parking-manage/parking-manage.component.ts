import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { SettingService } from "../../../service/setting.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap";
import { ParkingRow } from "src/app/shared/interface/parkingRow";
import { ParkingBox } from "src/app/shared/interface/parkingBox";
import { environment } from "src/environments/environment";
import { Parking } from 'src/app/shared/interface/parking';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { Sensor } from 'src/app/shared/interface/sensor.model';

@Component({
  selector: "app-parking-manage",
  templateUrl: "./parking-manage.component.html",
  styleUrls: ["./parking-manage.component.scss"]
})
export class ParkingManageComponent implements OnInit {
  form: FormGroup;
  parkingRowName: string = environment.CODE_NAME;
  parkingRow: ParkingRow[] = [];

  row: ParkingRow = {} as any;
  box: ParkingBox = {} as any;

  indexRow: number;
  indexBox: number;

  formParking: FormGroup;
  formSubmitAttempt: Boolean;

  // parkingID: string = "5de54f4c57e96a21ecccfb67";
  parking: Parking = {} as any;
  senseorList:Sensor[] = [];

  @ViewChild("removeRowM", { static: false }) removeRowM: ModalDirective;
  removeRowMassage: string;
  @ViewChild("removeBoxM", { static: false }) removeBoxM: ModalDirective;
  removeBoxMassage: string;

  public loading: boolean = false;
  public loadingTemplate: TemplateRef<any>;
  public config = { 
    animationType: ngxLoadingAnimationTypes.circle, 
    primaryColour: '#ffffff', 
    secondaryColour: '#ccc', 
    tertiaryColour: '#ffffff', 
    backdropBorderRadius: '3px', 
  };

  constructor(public settingService: SettingService, public fb: FormBuilder) {}

  ngOnInit() {
    this.initialData();
    this.getSensor();
  }
  async initialData() {
    this.loading = true
    // this.parkingRow = [];
    this.parking = await this.settingService.getSettingSensor().toPromise()
    console.log("parking ........ ",this.parking);
    
    this.settingService.getParkingRow(this.parking.parkingID).subscribe(
      result => {
        console.log("getParking", result);
        this.parkingRow = result;
        this.loading = false
      },
      error => {
        this.loading = false
        console.log("getParking", error);
      }
    );
  }

  getSensor(){
    this.settingService.getSensor().subscribe(
      result => {
        console.log("getSensor", result);
        this.senseorList = (result)?result:[];
      },
      error => {
        console.log("getSensor", error);
      }
    )
  }

  addRow() {
    let row: ParkingRow = {
      empty: 0,
      parking: 0,
      reserve: 0,
      disconnect: 0,
      parkingID: this.parking.parkingID,
      name: `${this.parkingRowName}-${this.parkingRow.length + 1}`,
      _v: 0,
      parkingBox: [],
    };
    this.parkingRow.push(row);
    console.log("row", this.parkingRow);
    const lastParkingRow:any = this.parkingRow[this.parkingRow.length-1];
    const parkingRow:{} = {parkingID:lastParkingRow.parkingID, name:lastParkingRow.name};
    this.saveParkingRow(parkingRow);
  }
  saveParkingRow(parkingRow){
    this.settingService.addParkingRow(parkingRow).subscribe(
      (result:any) => {
        console.log("saveParkingRow : "+result.title);
        this.initialData();
      },
      (error) => {
        console.log('saveParkingRow : ', error);
      }
    )
  }
  removeRow(i) {
    const parkingRowID:{} = {_id:this.parkingRow[i]._id};
    console.log("parkingRowID : ",parkingRowID);
    this.settingService.delteParkingRow(parkingRowID).subscribe(
      (result:any) => {
        console.log("deleteParkingRow : ",result.title);
        this.initialData();
      },
      (error) => {
        console.log("deleteParkingRow : ", error);
      }
    )
    this.removeRowM.hide();
  }

  selectRow(i, row: ParkingRow) {
    this.indexRow = i;
    this.row = row;
    this.removeRowMassage = "Do you want to remove " + row.name;
    this.removeRowM.show();
  }

  addBox(index, row: ParkingRow) {
    let box: ParkingBox = {
      name: `${row.name}-${this.parkingRow[index].parkingBox.length + 1}`,
      rowID: row._id,
      sensorID: null,
      status: "empty"
    };
    this.parkingRow[index].parkingBox.push(box);
    console.log("row", this.parkingRow);
  }

  removeBox(j, i) {
    const parkingBoxID:string = this.box._id;
    console.log("parkingBoxID : ",parkingBoxID);
    this.settingService.deleteParkingBox(parkingBoxID).subscribe(
      (result:any) => {
        console.log("deleteParkingBox ",result.title);
        this.initialData();
      },
      (error) => {
        console.log("deleteParkingBox ",error);
      }
    )
    this.removeBoxM.hide();
  }

  selectBox(j, i, box: ParkingBox) {
    this.indexRow = j;
    this.indexBox = i;
    this.box = box;
    this.removeBoxMassage = "Do you want to remove " + box.name;
    this.removeBoxM.show();
  }

  emitBox(val) {
    console.log("emitBox", val);
    this.selectBox(val.j, val.i, val.box);
  }

  submitBox(val) {
    console.log("submitBox", val);
    this.parkingRow[val.i].parkingBox[val.j] = val.box;
    this.initialData();
    // if(val.box._id){
    // }else{
    //   this.parkingRow[val.i].parkingBox.push(val.box)
    // }
  }
}
