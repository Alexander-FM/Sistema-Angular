import {AbstractService} from '../../../shared/services/abstract.service';
import {Injectable} from '@angular/core';
import {HttpClientPaginationService} from '../../../core/http-client-pagination.service';
import {TranslateService} from '@ngx-translate/core';
import {Pageable} from '../../../shared/models/pageable';
import {CategoriaFilter} from '../models/categoria-filter';
import {Observable} from 'rxjs';
import {Page} from '../../../shared/models/page';
import {Categoria} from '../../../shared/models/categoria';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {AppConstants} from '../../../../shared/utils/app.constants';
import {GenericResponse} from '../../../shared/models/generic-response';
@Injectable()
export class CategoriaService extends AbstractService {
  private endpoint: string = environment.apiUrl + AppConstants.CATEGORIA_MAIN;

  constructor(private http: HttpClientPaginationService,
              private translateService: TranslateService) {
    super();
  }
  public cargarColumnasCategoria(): any[] {
    let res: any[];
    res = [
      {id: 'nombre', field: 'nombre', header: this.translateService.instant('CATEGORIAS.TABLA.CATEGORIA')},
      {id: 'vigenciaString', field: 'vigenciaString', header: this.translateService.instant('CATEGORIAS.TABLA.VIGENCIA')}
    ];
    return res;
  }

  filtrar(page: Pageable, filtroCategoria: CategoriaFilter): Observable<Page<Categoria>> {
    filtroCategoria = filtroCategoria.convertAyudaPublicaFilter() as unknown as CategoriaFilter;
    return this.http.postPaginated<Categoria, CategoriaFilter>(this.endpoint + '/filtrar', page, filtroCategoria)
      .pipe(map((response: Page<Categoria>) => this.gestionarPage<Categoria>(response, Categoria)));
  }

  getCategoriaById(id: number): Observable<Categoria> {
    return this.http.get(`${this.endpoint}/getById/${id}`).pipe(
      map(response => new Categoria(response))
    );
  }

  create(categoria: Categoria): Observable<any> {
    categoria = categoria.convertCategoria() as unknown as Categoria;
    return this.http.post(this.endpoint, categoria);
  }

  update(categoria: Categoria): Observable<any> {
    categoria = categoria.convertCategoria() as unknown as Categoria;
    return this.http.put(`${this.endpoint}/${categoria.id}`, categoria);
  }

  delete(categoriaId: number): Observable<any> {
    return this.http.delete(`${this.endpoint}/deleteCategoria/${categoriaId}`);
  }

  activar(categoriaId: number): Observable<any> {
    return this.http.get(`${this.endpoint}/activar/${categoriaId}`);
  }

  desactivar(categoriaId: number): Observable<any> {
    return this.http.get(`${this.endpoint}/desactivar/${categoriaId}`);
  }

}
