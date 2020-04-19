import { Component, OnInit, Input } from '@angular/core';
import { ValidationMessageService } from './validation-message.service'
import { AbstractControl } from '@angular/forms';
@Component({
    selector: 'validation-message',
    templateUrl: './validation-message.component.html',
    // styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {

    @Input('control') control: AbstractControl;
    @Input('submit') submit: boolean;
    @Input('cssClass') cssClass: string = 'mes_error';
    @Input('checkDay') checkDay: boolean;
    @Input('requiredSelect') requiredSelect: boolean;
    @Input('inputName') inputName: string = "";

    constructor(private validationMessageService: ValidationMessageService) { }

    get errorMessage(): string {


        if (this.control) {
            if (this.control.invalid && (this.control.touched || this.control.dirty || this.submit)) {

                for (let errorPropertyName in this.control.errors) {
                    return this.generateErrorMessage(errorPropertyName, this.control.errors[errorPropertyName]);
                }


            }
        }

        return null;
    }

    private generateErrorMessage(errorType: string, errorPayload: any): string {

        if (errorType == 'min' && this.checkDay == true) {
          errorType = 'min_day';
        } else if (errorType == 'max' && this.checkDay == true) {
          errorType = 'max_day'
        }

        if (errorType == 'required' && this.requiredSelect) {
            errorType = 'requiredSelect';
        }

        // let errorMessageActual = ValidationMessageConfig[errorType];
        let errorMessageActual = this.validationMessageService.getErrorMsg(errorType)+" "+this.inputName;
        
        switch (errorType) {
            case 'min':
                return this._stringFormat(errorMessageActual, errorPayload.min);
            case 'max':
                return this._stringFormat(errorMessageActual, errorPayload.max);
            case 'min_day':
                return this._stringFormat(errorMessageActual, errorPayload.min);
            case 'max_day':
                return this._stringFormat(errorMessageActual, errorPayload.max);
            case 'minlength':
                return this._stringFormat(errorMessageActual, errorPayload.requiredLength);
            case 'maxlength':
                return this._stringFormat(errorMessageActual, errorPayload.requiredLength);
            default:
                if (errorMessageActual) {
                    return errorMessageActual;
                }

                return `Undefined Error Message for ${errorType}`;

        }
    }

    private _stringFormat(text: string, params: any): string {
        if (params) {
            if (!Array.isArray(params)) {
                params = [params];
            }

            params.forEach((value: any, index: number) => {
                text = text.replace(new RegExp('\\{' + index + '\\}', 'g'), this.numberWithCommas(value));
            });

        }

        return text;
    }

    private numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}
