import {Component} from '@angular/core';
import {AbstractComponent} from '../../../components/shared/abstract.component';
import {environment} from '../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/usuario';
import {Categoria} from '../../../shared/models/categoria';
import {AuthService} from '../../services/auth.service';
import {GenericResponse} from '../../../shared/models/generic-response';
import {DocumentoAlmacenado} from '../../../shared/models/documento-almacenado';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractComponent {
  display = true;
  isLogged = false;
  user: User;
  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    protected translateService: TranslateService, protected fb: FormBuilder, protected authService: AuthService
  ) {
    super(translateService);
  }

  private gestionarReactiveFormToDto() {
    this.user = new User(this.userForm.value);
  }

  validar() {
    this.gestionarReactiveFormToDto();
    this.authService.login(this.user).subscribe((response: GenericResponse<User>) => {
      if (response.rpta === 1 && response.body) {
        this.user = response.body;
        this.isLogged = true;
        this.authService.setIsAuthenticated(true); // Establece el estado de autenticación a true
        this.display = false;
      } else {
        alert('El usuario no existe');
      }
    }, (error) => {
      console.error('Error al enviar la petición:', error);
    });
  }

  cerrar() {
    this.authService.setIsAuthenticated(false);
    this.isLogged = false;
    this.display = true;
  }
}
