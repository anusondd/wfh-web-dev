import { Component, OnInit, Input, EventEmitter, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParkingBox } from 'src/app/shared/interface/parkingBox';
import { SettingService } from '../../../service/setting.service';
import { Sensor } from 'src/app/shared/interface/sensor.model';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-parking-box',
  templateUrl: './parking-box.component.html',
  styleUrls: ['./parking-box.component.scss']
})
export class ParkingBoxComponent implements OnInit {
  @Input() box: ParkingBox
  @Input() senseorList:Sensor[] = [];
  @Input() i: number
  @Input() j: number
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();

  statusForm: boolean = false;
  formBox: FormGroup;
  formSubmitAttempt: Boolean;

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
    public fb: FormBuilder,
    public settingService: SettingService
  ) {

  }

  ngOnInit() {
    this.formRowbuild();
    // console.log("this.box._id..........."+this.box._id);
    if (this.box._id) {
      this.statusForm = true
    } else {
      this.statusForm = false
      this.formBox.patchValue(this.box);
    }
  }

  formRowbuild() {
    this.formBox = this.fb.group({
      _id: ['', Validators.compose([])],
      rowID: ['', Validators.compose([])],
      name: ['', Validators.compose([Validators.required])],
      sensorID: ['', Validators.compose([Validators.required])],
      status: ['empty', Validators.compose([Validators.required])],
    })

    if (this.box._id) {
      this.formBox.patchValue(this.box);
    }
  }

  selectBox(j, i, box: ParkingBox) {
    this.j = j
    this.i = i
    this.box = box
    this.select.emit({ j: this.j, i: this.i, box: this.box })
  }

  onEdit(statusForm) {
    this.formBox.patchValue(this.box);
    console.log("value",this.formBox.value);
    this.statusForm = !statusForm
  }

  onSubmit(statusForm) {
    console.log(this.formBox.value);
    
    if (this.formBox.valid) {
      this.loading = true
      this.formSubmitAttempt = false
      console.log("sss "+this.box._id);
      let box = {
        ...this.formBox.value,
        _id:"1"
      }
      if(this.box._id === undefined){
        this.settingService.addParkingBox(this.formBox.value).subscribe(
          (result:any) => {
            console.log("addParkingBox : "+result.title);
            this.submit.emit({  j: this.j, i: this.i, box: (this.box._id)?this.formBox.value:box})
            this.loading = false
          },
          (error) => {
            console.log("addParkingBox : "+error);
            this.loading = false
          }
        )
      } else{
        console.log("formBox : ",this.formBox.value);
        this.settingService.updateParkingBox(this.formBox.value).subscribe(
          (result:any) => {
            console.log("updateParkingBox : "+result.title);
            this.submit.emit({  j: this.j, i: this.i, box: (this.box._id)?this.formBox.value:box})
            this.loading = false
          },
          (error) => {
            console.log("updateParkingBox : "+error)
            this.loading = false
          }
        )
      }
    } else {
      this.formSubmitAttempt = true
    }
  }

  closeForm(statusForm){
    this.statusForm = !statusForm
  }

}
