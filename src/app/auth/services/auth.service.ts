import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AppConstants} from '../../../shared/utils/app.constants';
import {HttpClientPaginationService} from '../../core/http-client-pagination.service';
import {AbstractService} from '../../shared/services/abstract.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/usuario';
import {GenericResponse} from '../../shared/models/generic-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService {
  private endpoint: string = environment.apiUrl + AppConstants.LOGIN_MAIN;
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  constructor(private http: HttpClientPaginationService) {
    super();
  }

  login(user: User): Observable<GenericResponse<User>> {
    user = user.convertUser() as unknown as User;
    return this.http.post<GenericResponse<User>>(`${this.endpoint}/login`, user);
  }
  setIsAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

}
