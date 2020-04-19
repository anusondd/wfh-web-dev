import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService } from '../../../service/setting.service';
import { Provice } from 'src/app/shared/interface/provice';

@Component({
  selector: 'app-parking-setting',
  templateUrl: './parking-setting.component.html',
  styleUrls: ['./parking-setting.component.scss']
})
export class ParkingSettingComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempt: Boolean;
  infoMessage:string = null
  proviceList:Provice[] = []

  constructor(
    public fb: FormBuilder,
    public settingService: SettingService,
  ) {
    this.buildForm()
   }

  ngOnInit() {
    this.getData()
    this.getProvice()
  }

  buildForm(){
    this.form = this.fb.group({
      _id:['', Validators.compose([Validators.required])],
      code:['', Validators.compose([Validators.required])],
      status:['', Validators.compose([])],
      name:['', Validators.compose([Validators.required])],
      proviceCode:['', Validators.compose([Validators.required])],
      empty: ['', Validators.compose([])],
      parking: ['', Validators.compose([])],
      reserve: ['', Validators.compose([])],
      disconnect: ['', Validators.compose([])]
    })
  }

  getData() {
    this.settingService.getParkingStats().subscribe(
      (res) => {
        console.log('getParkingStats', res);
        this.form.patchValue(res)
      },
      (error) => {
        console.log('getParkingStats', error);
      }
    )
  }

  getProvice(){
    this.settingService.getProvice().subscribe(
      (res) => {
        console.log('getProvice', res);
        this.proviceList = res
      },
      (error) => {
        console.log('getProvice', error);
      }
    )
  }

  save() {
    this.infoMessage = null
    console.log('save', this.form.value);
    this.settingService.updateParkingStats(this.form.getRawValue()).subscribe(
      (res) => {
        console.log('updateParkingStats', res);
        // this.infoMessage = "บันทึกสำเร็จ"
        this.getData()
      },
      (error) => {
        console.log('updateParkingStats', error);
      }
    )

  }

}
