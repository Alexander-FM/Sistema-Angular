import {ModuleWithProviders, NgModule} from '@angular/core';
import {AppComponent} from '../app.component';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    };
  }
}
