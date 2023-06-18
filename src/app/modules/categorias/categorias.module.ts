import { NgModule } from '@angular/core';
import {DialogModule} from 'primeng-lts/dialog';
import {SharedModule} from '../../shared/shared.module';
import {CategoriasMainComponent} from './components/categorias-main/categorias-main.component';
import {CategoriasRoutingModule} from './categorias-routing.module';
import {CategoriaService} from './services/categoria.service';
import { CategoriasTableComponent } from './components/categorias-table/categorias-table.component';

@NgModule({
  declarations: [
    CategoriasMainComponent,
    CategoriasTableComponent
  ],
  providers: [
    CategoriaService
  ],
  imports: [
    CategoriasRoutingModule,
    SharedModule,
    DialogModule
  ]
})
export class CategoriasModule { }
