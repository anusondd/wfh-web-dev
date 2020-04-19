import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';

// export function matchingPasswords(passwordKey: string, confirmPasswordKey: string, validators : ValidatorFn[]) {
export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {
        [key: string]: any
    } => {
        console.log(group);
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];

        if (password.value !== confirmPassword.value) {
            group.controls[confirmPasswordKey].setErrors({ mismatchedPasswords: "mismatchedPasswords" });
            return {
                mismatchedPasswords: true
            };
        } else {
            group.controls[confirmPasswordKey].setErrors(null);
            // group.controls[confirmPasswordKey].setValidators(validators);
            group.controls[confirmPasswordKey].updateValueAndValidity(
                {
                    onlySelf: true,
                    emitEvent: true
                }
            );
            return null;
        }
    }
}