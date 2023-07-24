import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {AppConstants} from '../../../shared/utils/app.constants';
import {HttpClientPaginationService} from '../../core/http-client-pagination.service';
import {AbstractService} from '../../shared/services/abstract.service';

@Injectable()
export class AuthService extends AbstractService {
  private endpoint: string = environment.apiUrl + AppConstants.CATEGORIA_MAIN;
  private endpointDA: string = environment.apiUrl + AppConstants.DOCUMENTO_ALMACENADO;

  constructor(private http: HttpClientPaginationService,
              private translateService: TranslateService) {
    super();
  }


}
