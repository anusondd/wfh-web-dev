import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parking-row',
  templateUrl: './parking-row.component.html',
  styleUrls: ['./parking-row.component.scss']
})
export class ParkingRowComponent implements OnInit {

  formRow: FormGroup;
  formSubmitAttempt:Boolean;

  constructor(
    public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.formRowbuild();
  }

  formRowbuild(){
    this.formRow = this.fb.group({
      _id: ['',Validators.compose([Validators.required])],
      parkingID: ['',Validators.compose([Validators.required])],
      name: ['',Validators.compose([Validators.required])],
    })
  }

  onSubmit(){
    
  }

}
