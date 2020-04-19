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
    
    let email = localStorage.getItem('email')
    let name = localStorage.getItem('name')
    if (name != null && email != null) {
      this.router.navigate(['/wfh'], {})
    } else {
      localStorage.removeItem("email")
      localStorage.removeItem("name")
    }
    // a-z A-Z 0-9 + @scg.com
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      // username: this.fb.control('', [Validators.required, Validators.minLength(4),Validators.pattern('[A-za-z0-9]*')]),
      password: this.fb.control('', [Validators.required, Validators.minLength(4)])
    });
  }

  login() {
    if (this.form.valid) {
      console.log("this.form.value : ", this.form.value);
      this.formSubmitAttempt = false;

      this.authService.login(this.form.value)
        .then((res) => {
          console.log('login', res)
          if (res.data.name == "Error") {
            this.message = res.data.message;
            localStorage.removeItem("email")
            localStorage.removeItem("name")
          } else {
            this.router.navigate(['/wfh'], {})
            localStorage.setItem("email", res.data.mail)
            localStorage.setItem("name", res.data.name)
          }
        }).catch((error) => {
          console.log('login', error)
        })

    } else {
      this.formSubmitAttempt = true;
    }
    // this.router.navigate(['/main'],{})
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
