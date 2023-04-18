import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatIconModule
} from '@angular/material';
import { MenuComponent } from './components/menu/menu.component';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
