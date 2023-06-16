import { Component, OnInit } from '@angular/core';
import {CategoriaFilter} from '../../models/categoria-filter';
import {TranslateService} from '@ngx-translate/core';
import {AbstractComponent} from '../../../../components/shared/abstract.component';
import {Categoria} from '../../../../shared/models/categoria';

@Component({
  selector: 'app-categorias-main',
  templateUrl: './categorias-main.component.html',
  styleUrls: ['./categorias-main.component.css']
})
export class CategoriasMainComponent extends AbstractComponent implements OnInit {

  registroSeleccionado: Categoria;
  filtro: CategoriaFilter;
  isLoading = true;

  constructor(
    protected translateService: TranslateService
  ) {
    super(translateService);
  }

  ngOnInit() {
    this.initFiltros();
  }

  initFiltros() {
    this.filtro = new CategoriaFilter();
  }

  nuevoRegistro() {

  }

  editarRegistro() {

  }

  confirmarActivarRegistro() {

  }

  confirmarDesactivarRegistro() {

  }

  confirmarEliminarRegistro() {

  }

  verRegistro() {

  }

  filtrar() {

  }

  resetFiltros() {

  }
}
