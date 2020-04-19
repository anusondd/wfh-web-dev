import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'validation-field-group',
  templateUrl: './validation-field-group.component.html',
  // styleUrls: ['./validation-field-group.component.scss']
})
export class ValidationFieldGroupComponent {


  @Input('sub-class') class: string = "";
  @Input('group') formGroup: FormGroup;
  @Input('controlName') formControlName: string;
  @Input('formSubmitAttempt') formSubmitAttempt: Boolean;
  @Input('requiredSelect') requiredSelect: Boolean;
  @Input('nonValidationMessage') nonValidationMessage: Boolean;
  @Input('inputName') inputName: string = "";


  constructor() { 
  }

  hasError() {
    // console.log('ValidationField',this.formGroup);
    
    if (!this.formGroup || !this.formControlName || !this.formGroup.controls[this.formControlName]) { return false; }
    return this.formGroup.controls[this.formControlName].invalid && (this.formGroup.controls[this.formControlName].dirty || this.formGroup.controls[this.formControlName].touched || this.formSubmitAttempt );
  }



}
