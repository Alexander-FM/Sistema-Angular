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
import {GenericResponse} from '../../../../shared/models/generic-response';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService} from 'primeng-lts/api';

@Component({
  selector: 'app-categorias-main',
  templateUrl: './categorias-main.component.html',
  styleUrls: ['./categorias-main.component.css']
})
export class CategoriasMainComponent extends AbstractComponent implements OnInit {

  @ViewChild('categoriasTable') categoriasTable: CategoriasTableComponent;
  page: Page<Categoria> = {} as Page<Categoria>;
  registroSeleccionado: Categoria;
  isLoading = true;
  filtro: CategoriaFilter;
  selectedColumnsCategoria: any[];
  colsCategorias: any[];
  displayNuevo = false;
  displayMsj = false;
  estadoModal: string;
  textoTituloNuevoEditar: string;
  textoBotonNuevoEditar: string;
  view = false;
  nuevaCategoriaForm: FormGroup = this.fb.group({
    id: ['', ''],
    nombre: ['', Validators.required],
    vigencia: ['', '']
  });
  registroCategoria: Categoria;

  constructor(
    protected translateService: TranslateService,
    protected categoriaService: CategoriaService,
    protected fb: FormBuilder,
    protected confirmationService: ConfirmationService
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
    const existeListaAyudaPublica = localStorage.getItem('LISTA_CATEGORIAS');
    if (existeListaAyudaPublica) {
      const data = JSON.parse(localStorage.getItem('LISTA_CATEGORIAS'));
      if (data) {
        this.colsCategorias = data;
      } else {
        this.colsCategorias = this.categoriaService.cargarColumnasCategoria();
      }
    } else {
      this.colsCategorias = this.categoriaService.cargarColumnasCategoria();
    }
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
      .pipe(takeUntil(this.destroy$)).subscribe((categoria: Page<Categoria>) => {
      this.page = categoria;
      this.isLoading = false;
    });
  }

  cambioTextoModal(tipo: string) {
    this.estadoModal = tipo;
    if (tipo === 'N') {
      this.textoTituloNuevoEditar = this.translateService.instant('CATEGORIAS.DETAIL.TITULO_CREATE');
      this.textoBotonNuevoEditar = this.translateService.instant('CATEGORIAS.DETAIL.CREAR_CATEGORIA');
    } else {
      this.textoTituloNuevoEditar = this.translateService.instant('CATEGORIAS.DETAIL.TITULO_UPDATE');
      this.textoBotonNuevoEditar = this.translateService.instant('CATEGORIAS.DETAIL.EDITAR_CATEGORIA');
    }
  }

  nuevoRegistro() {
    this.displayNuevo = true;
    this.cambioTextoModal('N');
    this.nuevaCategoriaForm.reset();
  }

  editarRegistro() {
    this.displayNuevo = true;
    this.cambioTextoModal('E');
    this.categoriaService.getCategoriaById(this.registroSeleccionado.id).pipe(takeUntil(this.destroy$))
      .subscribe((categoria: Categoria) => {
        this.registroCategoria = categoria;
        this.gestionarDtoToReactiveForm();
      });
  }

  private gestionarDtoToReactiveForm() {
    this.nuevaCategoriaForm.patchValue(this.registroCategoria);
  }

  private gestionarReactiveFormToDto() {
    this.registroCategoria = new Categoria(this.nuevaCategoriaForm.value);
  }

  createUpdateRegistro() {
    this.gestionarReactiveFormToDto();
    this.displayNuevo = false;
    if (this.estadoModal === 'N') {
      this.categoriaService.create(this.registroCategoria).pipe(takeUntil(this.destroy$)).subscribe((e) => {
        this.registroCategoria.id = e;
        this.actualizarRegistrosTabla();
        this.registroCategoria = new Categoria();
      });
    } else {
      this.categoriaService.update(this.registroCategoria).pipe(takeUntil(this.destroy$)).subscribe((e) => {
        this.registroCategoria.id = e;
        this.actualizarRegistrosTabla();
        this.registroCategoria = new Categoria();
      });
    }
  }

  actualizarRegistrosTabla() {
    this.categoriasTable.table.clearState();
    this.categoriasTable.table.reset();
  }

  confirmarActivarRegistro() {

  }

  confirmarDesactivarRegistro() {

  }

  confirmarEliminarRegistro() {
    this.confirmationService.confirm({
      message: this.translateService.instant('CATEGORIAS.DETAIL.ALERTA_ELIMINAR'),
      header: this.translateService.instant('CATEGORIAS.DETAIL.ELIMINAR_CATEGORIA'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriaService.delete(this.registroSeleccionado.id).pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.categoriasTable.table.reset();
            this.registroSeleccionado = null;
          });
      },
      reject: () => { }
    });
  }

  verRegistro() {

  }

  filtrar() {
    this.categoriasTable.onLazyLoad.emit(this.categoriasTable.pageable);
  }

  resetFiltros() {
    this.filtro = new CategoriaFilter();
    this.actualizarRegistrosTabla();
  }
}
