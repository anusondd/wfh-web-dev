import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService } from '../../../service/setting.service';

@Component({
  selector: 'app-control-sensor',
  templateUrl: './control-sensor.component.html',
  styleUrls: ['./control-sensor.component.scss']
})
export class ControlSensorComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempt: Boolean;

  disableSubmit:boolean = false;

  infoMessage:string = null

  constructor(
    public fb: FormBuilder,
    public settingService: SettingService,
  ) {
    this.buildForm()
  }

  ngOnInit() {
    this.getData()
  }

  buildForm() {
    this.form = this.fb.group({
      _id: ['', Validators.compose([Validators.required])],
      urlSensor: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      timeRound: [40, Validators.compose([])],
      switchTask: [false, Validators.compose([])],
      parkingID: ['', Validators.compose([Validators.required])],
    })
  }


  getData() {
    this.settingService.getSettingSensor().subscribe(
      (res) => {
        console.log('getSetting', res);
        this.form.patchValue(res)
      },
      (error) => {
        console.log('getSetting', error);
      }
    )
  }

  connect() {
    console.log('connect', this.form.value);
    if (this.form.valid) {
      this.formSubmitAttempt = false

      this.settingService.connectSettingSensor(this.form.value).subscribe(
        (res:any) => {
          console.log('connectSettingSensor', res);
          this.disableSubmit = (res.data)?true:false
          if(this.disableSubmit){
            this.form.disable()
            this.infoMessage = 'การเชื่อมต่อเซ็นเซอร์ถูกต้อง'
          }else{
            this.form.enable()
            this.infoMessage = 'การเชื่อมต่อเซ็นเซอร์ไม่ถูกต้อง'
          }
        },
        (error) => {
          console.log('connectSettingSensor', error);
          this.disableSubmit = false
          this.infoMessage = null
        }
      )

    } else {
      this.formSubmitAttempt = true
    }

  }

  save() {
    this.infoMessage = null
    console.log('save', this.form.value);
    this.settingService.updateSettingSensor(this.form.getRawValue()).subscribe(
      (res) => {
        console.log('updateSettingSensor', res);
        this.getData()
        this.disableSubmit = false
        this.form.enable()
      },
      (error) => {
        console.log('updateSettingSensor', error);
      }
    )

  }

}
