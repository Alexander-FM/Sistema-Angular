import { NgModule } from '@angular/core';
import {DialogModule} from 'primeng-lts/dialog';
import {SharedModule} from '../../shared/shared.module';
import {CategoriasMainComponent} from './components/categorias-main/categorias-main.component';
import {CategoriasRoutingModule} from './categorias-routing.module';

@NgModule({
  declarations: [
    CategoriasMainComponent
  ],
  providers: [

  ],
  imports: [
    CategoriasRoutingModule,
    SharedModule,
    DialogModule
  ]
})
export class CategoriasModule { }
