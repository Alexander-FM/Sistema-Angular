import {Component} from '@angular/core';
import {AbstractComponent} from '../../../components/shared/abstract.component';
import {environment} from '../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractComponent {
  display = true;
  isLogged: boolean = environment.login.enable;
  user: User;
  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password : ['', Validators.required]
  });

  constructor(
    protected translateService: TranslateService, protected fb: FormBuilder,
  ) {
    super(translateService);
  }

  validar() {

  }

  cerrar() {

  }

  cerrarPopUp() {
    // environment.login.enable = false;
  }
}
