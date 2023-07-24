import {Util} from '../../../shared/utils/utils';
import {Empleado} from './empleado';

export interface User {
  id?: number;
  username: string;
  password: string;
  empleado: Empleado;
  // tslint:disable-next-line:no-misused-new
  new(parameters?: any): User;
}
export class User {
  constructor(parameters?: any) {
    Util.createInstanceWithParameters(this, parameters);
  }

  convertUser() {
    return {
      id: this.id ? this.id : null,
      username: this.username ? this.username : null,
      password: this.password ? this.password : null,
      empleado: this.empleado ? this.empleado : null
    };
  }
}
