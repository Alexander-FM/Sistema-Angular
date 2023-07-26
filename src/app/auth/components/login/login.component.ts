import {Component, OnInit} from '@angular/core';
import {AbstractComponent} from '../../../components/shared/abstract.component';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/usuario';
import {AuthService} from '../../services/auth.service';
import {GenericResponse} from '../../../shared/models/generic-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AbstractComponent implements OnInit {
  display = true;
  isLogged = false;
  user: User;
  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    protected translateService: TranslateService,
    protected fb: FormBuilder,
    protected authService: AuthService,
    private router: Router
  ) {
    super(translateService);
  }

  private gestionarReactiveFormToDto() {
    this.user = new User(this.userForm.value);
  }

  ngOnInit(): void {
    /**
     * @description obtiene el estado de autenticación del usuario y luego asignarle a la variable isLogged.
     * con esto se mostrará o no el pop-up de login.
     */
    this.isLogged = this.authService.getIsAuthenticated();
    if (this.isLogged) {
      this.user = new User(this.authService.getUserData());
    }
  }

  validar() {
    this.gestionarReactiveFormToDto();
    this.authService.login(this.user).subscribe((response: GenericResponse<User>) => {
      if (response.rpta === 1 && response.body) {
        this.user = response.body;
        this.display = false;
        this.isLogged = true;
        this.authService.setIsAuthenticated(true, this.user); // Establece el estado de autenticación a true
        this.router.navigate(['/inicio'])
          .then(r => console.log('Navegación exitosa'))
          .catch(error => console.log('Error en la navegación: ' + error));
      } else {
        alert('El usuario no existe');
        this.authService.setIsAuthenticated(false, null);
      }
    }, (error) => {
      console.error('Error al enviar la petición:', error);
    });
  }

  cerrar() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    this.router.navigate(['/auth'])
      .then(r => console.log('La navegación fue exitosa y se cerró la session'))
      .catch(error => console.log('Error en la navegación: ' + error));
    this.authService.setIsAuthenticated(false, null);
    this.isLogged = false;
    this.display = true;
    this.userForm.reset();
  }
}