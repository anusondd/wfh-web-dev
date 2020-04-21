import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  stateForm: string = 'login';
  form: FormGroup;
  formSubmitAttempt: boolean;
  message = null;

  language = ""
  languageList = [{ id: 'th', name: 'Thai', img: "../../assets/images/th.png" }, { id: 'en', name: 'English', img: "../../assets/images/en.png" }]


  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    public translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.initLanguage()
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    });
  }

  switchForm(val) {
    this.stateForm = val;
    switch (val) {
      case 'login':
        this.form.controls['username'].setValidators([Validators.required, Validators.email])
        this.form.controls['username'].updateValueAndValidity()
        this.form.controls['password'].setValidators([Validators.required, Validators.minLength(4)])
        this.form.controls['password'].updateValueAndValidity()
        break;
      case 'register':
        this.form.controls['username'].setValidators([Validators.required, Validators.email])
        this.form.controls['username'].updateValueAndValidity()
        this.form.controls['password'].setValidators([Validators.required, Validators.minLength(4)])
        this.form.controls['password'].updateValueAndValidity()
        break;
      case 'forgetpassword':
        this.form.controls['username'].setValidators([Validators.required, Validators.email])
        this.form.controls['username'].updateValueAndValidity()
        this.form.controls['password'].clearValidators()
        this.form.controls['password'].updateValueAndValidity()
        break;

      default:
        break;
    }
  }

  submit() {
    if (this.form.valid) {
      console.log("this.form.value : ", this.form.value);
      this.formSubmitAttempt = false;
      if (this.stateForm == 'login')
        this.authService.signIn(this.form.value.username, this.form.value.password)
          .then(result => {
            console.log(result);
            this.router.navigate(['wfh']);
          })
          .catch(e => {
            console.log('message', e.message);
            this.message = e.message
          })

      if (this.stateForm == 'register')
        this.authService.signUp(this.form.value.username, this.form.value.password)
          .then(result => {
            console.log(result);
            this.router.navigate(['wfh']);
          })
          .catch(e => {
            console.log(e.message);
            this.message = e.message
          })

      if (this.stateForm == 'forgetpassword')
        this.authService.resetPassword(this.form.value.username)
          .then(result => {
            console.log(result);
          })
          .catch(e => {
            console.log(e.message);
            this.message = e.message
          })

    } else {
      this.formSubmitAttempt = true;
    }
  }

  initLanguage() {
    this.translate.addLangs(['en', 'th']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      this.language = localStorage.getItem('locale')
      this.translate.use(browserLang.match(/en|th/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'th');
      this.language = 'th'
      this.translate.setDefaultLang('th');
    }
  }

  changeLang(language: string) {
    console.log('changeLang', language);
    this.language = language
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }

}
