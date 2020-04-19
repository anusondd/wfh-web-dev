import { Injectable } from '@angular/core';
import { ValidationMessageConfig } from 'src/app/config/validation-message';
import { ValidationMessageConfigEN } from 'src/app/config/validation-message-en';

@Injectable()
export class ValidationMessageService {

  constructor() {}

   getErrorMsg(errorType: string): string {
        let lang = localStorage.getItem('locale');
        var validationMessage;
        validationMessage = (lang=='th')? ValidationMessageConfig:ValidationMessageConfigEN;
        // console.log("---------------------->errorType:", errorType);
        return validationMessage[errorType];

    }
}
