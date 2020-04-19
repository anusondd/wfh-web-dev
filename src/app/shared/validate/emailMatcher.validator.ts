import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';


export function notMatchingEmails(mainKey: string, secondKey: string) {
    return (group: FormGroup): {
        [key: string]: any
    } => {
        // console.log(group);
        let main = group.get(mainKey);
        let second = group.get(secondKey);
        console.log(main.value,second);

        if (main.value === second.value) {
            group.controls[secondKey].setErrors({ mismatchedEmail: "mismatchedEmail" });
            return {
                mismatchedEmail: true
            };
        } else {
            group.get(secondKey).setErrors(null);
            // group.get(secondKey).setValidators(validators);
            group.get(secondKey).updateValueAndValidity(
                {
                    onlySelf: true,
                    emitEvent: true
                }
            );
            return null;
        }
    }
}