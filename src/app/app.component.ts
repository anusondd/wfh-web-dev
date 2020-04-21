import { Component, OnInit } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private actions: Actions,
    private router: Router,
    private title: Title,
    public translate: TranslateService,
    private angularFireAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute) {

    this.initLanguage()

    this.angularFireAuth.authState
      .subscribe(user => {
        // console.log(user);
        if (user) {
          this.router.navigate(['wfh']);
        } else {
          this.router.navigate(['login']);
        }

      })

  }

  ngOnInit() {

  }

  initLanguage() {
    this.translate.addLangs(['en', 'th']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      this.translate.use(browserLang.match(/en|th/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'th');
      this.translate.setDefaultLang('th');
    }
  }

  changeLang(language: string) {
    console.log('changeLang', language);

    localStorage.setItem('locale', language);
    this.translate.use(language);
  }

}
