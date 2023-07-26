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
  private readonly AUTH_KEY = 'isAuthenticated';
  private readonly USER_DATA_KEY  = 'userData';

  constructor(private http: HttpClientPaginationService) {
    super();
  }

  login(user: User): Observable<GenericResponse<User>> {
    user = user.convertUser() as unknown as User;
    return this.http.post<GenericResponse<User>>(`${this.endpoint}/login`, user);
  }

  setIsAuthenticated(isAuthenticated: boolean, userData: any): void {
    localStorage.setItem(this.AUTH_KEY, isAuthenticated ? 'true' : 'false');
    if (userData) {
      localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(this.USER_DATA_KEY);
    }
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  getIsAuthenticated(): boolean {
    const isAuthenticatedStr = localStorage.getItem(this.AUTH_KEY);
    return isAuthenticatedStr === 'true';
  }

  getUserData(): any {
    const userDataStr = localStorage.getItem(this.USER_DATA_KEY);
    return userDataStr ? JSON.parse(userDataStr) : null;
  }

}
