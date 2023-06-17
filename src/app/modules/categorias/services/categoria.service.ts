import {AbstractService} from '../../../shared/services/abstract.service';
import {Injectable} from '@angular/core';
import {HttpClientPaginationService} from '../../../core/http-client-pagination.service';
import {TranslateService} from '@ngx-translate/core';
@Injectable()
export class CategoriaService extends AbstractService {

  constructor(private http: HttpClientPaginationService,
              private translateService: TranslateService) {
    super();
  }
  public cargarColumnasCategoria(): any[] {
    let res: any[];
    res = [
      {id: 'nombre', field: 'nombre', header: this.translateService.instant('CATEGORIA.TABLA.NOMBRE')},
      {id: 'vigencia', field: 'vigencia', header: this.translateService.instant('CATEGORIA.TABLA.VIGENCIA')}
    ];
    return res;
  }
}
