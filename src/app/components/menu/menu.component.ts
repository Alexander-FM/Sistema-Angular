import { Component } from '@angular/core';
import {AbstractComponent} from '../shared/abstract.component';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AbstractComponent {
  langs: string[] = environment.langs;
  isLogged = !environment.login.enable;

  constructor(private translate: TranslateService) { super(translate);     this.translate.setDefaultLang('es');
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }
}
