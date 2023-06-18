import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoriaFilter} from '../../models/categoria-filter';
import {TranslateService} from '@ngx-translate/core';
import {AbstractComponent} from '../../../../components/shared/abstract.component';
import {Categoria} from '../../../../shared/models/categoria';
import {CategoriasTableComponent} from '../categorias-table/categorias-table.component';
import {Page} from '../../../../shared/models/page';
import {CategoriaService} from '../../services/categoria.service';
import {Pageable} from '../../../../shared/models/pageable';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-categorias-main',
  templateUrl: './categorias-main.component.html',
  styleUrls: ['./categorias-main.component.css']
})
export class CategoriasMainComponent extends AbstractComponent implements OnInit {

  @ViewChild('categoriasTableComponent') categoriasTableComponent: CategoriasTableComponent;
  page: Page<Categoria> = {} as Page<Categoria>;
  registroSeleccionado: Categoria;
  isLoading = true;
  filtro: CategoriaFilter;
  selectedColumnsCategoria: any[];
  colsCategorias: any[];

  constructor(
    protected translateService: TranslateService,
    protected categoriaService: CategoriaService
  ) {
    super(translateService);
  }

  ngOnInit() {
    this.cargarColumnasCategoria();
    this.initFiltros();
  }

  initFiltros() {
    this.filtro = new CategoriaFilter();
  }

  cargarColumnasCategoria() {
    this.selectedColumnsCategoria = this.categoriaService.cargarColumnasCategoria();
  }

  seleccionarRegistro(categoria: Categoria) {
    this.registroSeleccionado = categoria;
  }
  columnaSeleccionada(columns: any) {
    this.colsCategorias = this.categoriaService.cargarColumnasCategoria();
    this.colsCategorias = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < columns.value.length; i++) {
      this.colsCategorias.push(columns.value[i]);
    }
    localStorage.setItem('LISTA_CATEGORIAS', JSON.stringify(this.colsCategorias));
  }
  cargarRegistrosTabla(pageable?: Pageable) {
    this.isLoading = true;
    this.categoriaService.filtrar(pageable, this.filtro)
      .pipe(takeUntil(this.destroy$)).subscribe((ayudaPublica: Page<Categoria>) => {
      this.page = ayudaPublica;
      // tslint:disable-next-line:no-shadowed-variable
      /*this.page.content.forEach(Categoria => {
        Categoria.vigencia = Boolean(this.getActivaInactiva(Categoria.vigencia));

      });*/
      this.isLoading = false;
    });
  }

  private getActivaInactiva(opcionSN: boolean): string {
    if (opcionSN === true) {
      return this.translateService.instant('COMUN.ESTADO.ACTIVA');
    }
    if (opcionSN === false) {
      return this.translateService.instant('COMUN.ESTADO.INACTIVA');
    }
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
