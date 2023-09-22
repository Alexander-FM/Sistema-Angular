import {Util} from '../../../shared/utils/utils';
import {Rol} from './rol';

export interface Empleado {
  id?: number;
  nombre: string;
  apellidos: string;
  vigencia: boolean;
  vigenciaString: string;
  rol: Rol;
  // tslint:disable-next-line:no-misused-new
  new(parameters?: any): Empleado;
}
export class Empleado {
  constructor(parameters?: any) {
    Util.createInstanceWithParameters(this, parameters);
  }

  convertEmpleado() {
    return {
      id: this.id ? this.id : null,
      nombres: this.nombre ? this.nombre : null,
      apellidos: this.apellidos ? this.apellidos : null,
      vigencia: this.vigencia ? this.vigencia : null,
      vigenciaString: this.vigenciaString ? this.vigenciaString : null,
      rol: this.rol ? this.rol : null
    };
  }
}
