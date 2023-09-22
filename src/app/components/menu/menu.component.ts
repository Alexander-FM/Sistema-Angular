import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../shared/abstract.component';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AbstractComponent implements OnInit {
  langs: string[] = environment.langs;

  constructor(private translate: TranslateService) {
    super(translate);
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {

  }

  setLang(lang: string) {
    this.translate.use(lang);
  }

}
