import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { BannerGallery } from 'src/app/Interfaces/BannerGallery';

export function safePassword(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const length = value.length>=6;

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && length;

        return !passwordValid ? { safePassword: true }: null;
    }
};

export function isSameInConfirmPassword(): ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
        const parent = control.parent;
        const confirmPassword = control.value;

        if (!confirmPassword) {
            return null;
        }

        if (parent && parent.get('password')) {
            let passwordControl = parent.get('password');
            return (passwordControl?.value != confirmPassword) ? { passwordIsNotSame: true } : null;
        }
        
        return null;
    }
}

export function tiengVietKhongDau(): ValidatorFn{
    return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        
        let re = /[^a-z0-9]/
        
        return re.test(value) ? { containsSpecialCharacter: true } : null;
    }
}

export function productHightLight(){
    return (formGroup: FormGroup)=>{
        const highlightControl: AbstractControl = formGroup.controls['highlight'];
        const albumBannerControl: AbstractControl = formGroup.controls['albumBanner'];
    
        const highlightValue: boolean = highlightControl.value;
        const albumBannerValue: BannerGallery = albumBannerControl.value;
        if (!highlightValue) {
            albumBannerControl.setErrors(null);
        }else{
            if(albumBannerValue){
                albumBannerControl.setErrors(null);
            }else{
                albumBannerControl.setErrors({required: true});
            }
        }
    }
}