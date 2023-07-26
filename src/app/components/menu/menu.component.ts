import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../shared/abstract.component';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AbstractComponent implements OnInit {
  langs: string[] = environment.langs;
  isLogged = false;


  constructor(private translate: TranslateService, private authService: AuthService) {
    super(translate);
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    /**
     * @description Detecta cambios en el estado de autenticación y asigna el valor a la variable isLogged para
     * determinar si se debe mostrar el menú o no
     */
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLogged = isAuthenticated;
    });
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }
}
