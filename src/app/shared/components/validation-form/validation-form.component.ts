import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { ValidationMessageService } from '../validation-message/validation-message.service';

@Component({
  selector: 'validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.scss']
})
export class ValidationFormComponent {

  @Input('sub-class') class: string = "";
  @Input('group') formGroup: FormGroup;
  @Input('formSubmitAttempt') formSubmitAttempt: Boolean;
  
  constructor(
    private validationMessageService: ValidationMessageService,
    ) { }

  hasError() {
    // console.log('ValidationField',this.formGroup);
    
    if (!this.formGroup || this.formSubmitAttempt) {
      this.getFormValidationErrors(); 
      return false; 
    }
    
  }

  getFormValidationErrors() {
    let listError = []
    Object.keys(this.formGroup.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.formGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          listError.push({fild:key,keyError:keyError})
          // console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
        // console.log('Key control: ',listError);
      }else{
        
      }
      
    });
    // this._notificationService.warn(listError[0].fild,listError[0].keyError);
    this.notiMassageError(listError[0].keyError);
    this.getFieldError(listError[0].fild);
    
  }

  notiMassageError(errorType: string) {
    let errorMessageActual = this.validationMessageService.getErrorMsg(errorType);
    if (errorMessageActual) {
      // this.notification("", errorMessageActual);
      console.log("notiMassageError",errorMessageActual);
      // this.notify.onError("กรุณาตรวจสอบข้อมูลที่กรอก",errorMessageActual);
      
    }else{
      console.log("notiMassageError",`Undefined Error Message for ${errorType}`);
      // this.notification("", `Undefined Error Message for ${errorType}`);
    }
  }

  getFieldError(fieldName){
    const controlErrors: ValidationErrors = this.formGroup.get(fieldName).errors;
    console.log("getFieldError",controlErrors);
  }

}
