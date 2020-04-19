import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MENU } from 'src/app/config/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title: string = ""
  menus = []
  language = ""

  constructor(
    public authService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public translate: TranslateService,
  ) {
    this.subscribeNavigationEnd()
    this.initLanguage()
  }

  ngOnInit() {
    // this.subscribeNavigationEnd()
  }

  subscribeNavigationEnd() {
    this.router.events.subscribe(
      (route) => {
        if (route instanceof NavigationEnd) {
          console.log('event', route.urlAfterRedirects)
          let menu = this.menus.find(menu => {
            return (menu.url == route.urlAfterRedirects)
          })
          console.log('menu', menu)
          this.title = (menu) ? menu.title : "";
        }
      }
    )
  }

  togleMenu(i, span) {
    console.log('togleMenu', i, span);

    this.menus[i].span = !span;
  }

  logout() {
    this.authService.logout();
  }

  initLanguage() {
    this.translate.addLangs(['en', 'th']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      this.initMenu(browserLang)
      this.language = localStorage.getItem('locale')
      this.translate.use(browserLang.match(/en|th/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'th');
      this.initMenu('th')
      this.language = 'th'
      this.translate.setDefaultLang('th');
    }
  }

  changeLang(language: string) {
    console.log('changeLang', language);
    this.initMenu(language)
    this.language = language
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }

  initMenu(language: string){
    this.menus = MENU[language];
  }

}
