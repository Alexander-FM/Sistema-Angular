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
import {ConfirmationService, Message} from 'primeng-lts/api';
import {DocumentoAlmacenado} from '../../../../shared/models/documento-almacenado';
import {FileUpload} from 'primeng-lts/fileupload';

@Component({
  selector: 'app-categorias-main',
  templateUrl: './categorias-main.component.html',
  styleUrls: ['./categorias-main.component.css']
})
export class CategoriasMainComponent extends AbstractComponent implements OnInit {

  @ViewChild('categoriasTable') categoriasTable: CategoriasTableComponent;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  page: Page<Categoria> = {} as Page<Categoria>;
  registroSeleccionado: Categoria;
  isLoading = true;
  filtro: CategoriaFilter;
  selectedColumnsCategoria: any[];
  colsCategorias: any[];
  displayNuevo = false;
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
  selectedFile: File;
  formData = new FormData();
  imagenUrl: string;
  disabledComponent = false;
  errores: Message[];

  constructor(
    protected translateService: TranslateService,
    protected categoriaService: CategoriaService,
    protected fb: FormBuilder,
    protected confirmationService: ConfirmationService) {
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
    } else if (tipo === 'E') {
      this.textoTituloNuevoEditar = this.translateService.instant('CATEGORIAS.DETAIL.TITULO_UPDATE');
      this.textoBotonNuevoEditar = this.translateService.instant('CATEGORIAS.DETAIL.EDITAR_CATEGORIA');
    } else {
      this.textoTituloNuevoEditar = this.translateService.instant('CATEGORIAS.DETAIL.TITULO_VER');
    }
  }

  nuevoRegistro() {
    this.displayNuevo = true;
    this.cambioTextoModal('N');
    this.nuevaCategoriaForm.reset();
    this.nuevaCategoriaForm.get('vigencia').setValue(true);
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

  verRegistro() {
    this.displayNuevo = true;
    this.view = true;
    this.cambioTextoModal('V');
    this.categoriaService.getCategoriaById(this.registroSeleccionado.id).pipe(takeUntil(this.destroy$))
      .subscribe((categoria: Categoria) => {
        this.registroCategoria = categoria;
        this.gestionarDtoToReactiveForm();
      });
  }

  private gestionarDtoToReactiveForm() {
    this.nuevaCategoriaForm.patchValue(this.registroCategoria);
    if (this.view) {
      this.nuevaCategoriaForm.disable();
      this.disabledComponent = true;
    } else {
      this.nuevaCategoriaForm.enable();
      this.disabledComponent = false;
    }
    this.imagenUrl = this.getImagenUrl(this.registroCategoria.foto.completeFileName);
  }

  private getImagenUrl(fileName: string): string {
    const baseUrl = 'http://localhost:9090/api/documento-almacenado/download/';
    return baseUrl + fileName;
  }


  private gestionarReactiveFormToDto() {
    this.registroCategoria = new Categoria(this.nuevaCategoriaForm.value);
  }

  private guardarDatosImagen(): boolean {
    let rellenado = false;
    if (this.selectedFile) {
      rellenado = true;
      this.formData.append('nombre', this.selectedFile.name); // Especifica el valor del nombre
      this.formData.append('file', this.selectedFile, this.selectedFile.name); // Agrega el archivo seleccionado al FormData
    }
    return rellenado;
  }

  createUpdateRegistro() {
    this.gestionarReactiveFormToDto();
    if (this.estadoModal === 'N') {
      const rellenado = this.guardarDatosImagen();
      if (rellenado) {
        this.categoriaService.guardarImagen(this.formData).subscribe((response: GenericResponse<DocumentoAlmacenado>) => {
            this.registroCategoria.foto = response.body;
            this.categoriaService.create(this.registroCategoria).pipe(takeUntil(this.destroy$)).subscribe((e) => {
              this.registroCategoria.id = e;
              this.actualizarRegistrosTabla();
              this.registroCategoria = new Categoria();
              this.cleanFilesFromForm();
              this.displayNuevo = false;
            });
          },
          (error) => {
            console.error('Error al enviar la imagen:', error);
          }
        );
      } else {
        this.errores = [({
          severity: 'error',
          summary: this.translateService.instant('CATEGORIAS.MENSAJE_SISTEMA'),
          detail: this.translateService.instant('CATEGORIAS.ERRORES.IMAGEN_NO_RELLENADA')
        })];
        return true;
      }
    } else {
      const rellenado = this.guardarDatosImagen();
      if (rellenado) {
        this.categoriaService.actualizarImagen(this.registroSeleccionado.foto.id, this.formData)
          .subscribe((response: GenericResponse<DocumentoAlmacenado>) => {
              this.registroCategoria.foto = response.body;
              this.categoriaService.update(this.registroCategoria).pipe(takeUntil(this.destroy$)).subscribe((e) => {
                this.registroCategoria.id = e;
                this.actualizarRegistrosTabla();
                this.registroCategoria = new Categoria();
                this.cleanFilesFromForm();
                this.displayNuevo = false;
              });
            },
            (error) => {
              console.error('Error al enviar la imagen:', error);
            }
          );
      } else {
        this.registroCategoria.foto = this.registroSeleccionado.foto;
        this.categoriaService.update(this.registroCategoria).pipe(takeUntil(this.destroy$)).subscribe((e) => {
          this.registroCategoria.id = e;
          this.actualizarRegistrosTabla();
          this.registroCategoria = new Categoria();
          this.cleanFilesFromForm();
          this.displayNuevo = false;
        });
      }
    }
  }

  actualizarRegistrosTabla() {
    this.categoriasTable.table.clearState();
    this.categoriasTable.table.reset();
    this.registroSeleccionado = null;
  }

  confirmarActivarRegistro() {
    this.confirmationService.confirm({
      message: this.translateService.instant('CATEGORIAS.DETAIL.ALERTA_ACTIVAR'),
      header: this.translateService.instant('CATEGORIAS.DETAIL.ACTIVAR_CATEGORIA'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriaService.activar(this.registroSeleccionado.id).pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.actualizarRegistrosTabla();
            this.registroSeleccionado = null;
          });
      },
      reject: () => {
      }
    });
  }

  confirmarDesactivarRegistro() {
    this.confirmationService.confirm({
      message: this.translateService.instant('CATEGORIAS.DETAIL.DESACTIVAR_CATEGORIA'),
      header: this.translateService.instant('CATEGORIAS.DETAIL.ALERTA_DESACTIVAR'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriaService.desactivar(this.registroSeleccionado.id).pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.actualizarRegistrosTabla();
            this.registroSeleccionado = null;
          });
      },
      reject: () => {
      }
    });
  }

  confirmarEliminarRegistro() {
    this.confirmationService.confirm({
      message: this.translateService.instant('CATEGORIAS.DETAIL.ALERTA_ELIMINAR'),
      header: this.translateService.instant('CATEGORIAS.DETAIL.ELIMINAR_CATEGORIA'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriaService.delete(this.registroSeleccionado.id).pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.categoriaService.deleteImage(this.registroSeleccionado.foto.id).pipe(takeUntil(this.destroy$))
              .subscribe((response: GenericResponse<any>) => {
                if (response.rpta === 1) {
                  this.categoriasTable.table.reset();
                  this.registroSeleccionado = null;
                }
              });
          });
      },
      reject: () => {
        console.log('Ocurrió un error durante la eliminación');
      }
    });
  }

  filtrar() {
    this.categoriasTable.onLazyLoad.emit(this.categoriasTable.pageable);
  }

  resetFiltros() {
    this.filtro = new CategoriaFilter();
    this.actualizarRegistrosTabla();
  }

  cerrarPopUp() {
    this.displayNuevo = false;
    this.view = false;
    this.nuevaCategoriaForm.reset();
    this.imagenUrl = null;
    this.disabledComponent = false;
    this.cleanFilesFromForm();
    this.errores = [];
  }

  cleanFilesFromForm() {
    this.selectedFile = null;
    this.fileUpload.clear();
  }

  onFileSelect(event: any) {
    console.log('Archivo seleccionado:', event);
    this.selectedFile = event.files[0];
    console.log('Archivo seleccionado:', this.selectedFile);
    this.imagenUrl = null;
  }
}
