import {Util} from '../../../shared/utils/utils';

export interface Rol {
  id?: number;
  nombre: string;
  // tslint:disable-next-line:no-misused-new
  new(parameters?: any): Rol;
}
export class Rol {
  constructor(parameters?: any) {
    Util.createInstanceWithParameters(this, parameters);
  }

  convertRol() {
    return {
      id: this.id ? this.id : null,
      nombre: this.nombre ? this.nombre : null
    };
  }
}
