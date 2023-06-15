import {Util} from '../../../../shared/utils/utils';

export interface CategoriaFilter {
  nombreCategoria: string;
  verInactivos: string;
  // tslint:disable-next-line:no-misused-new
  new (parameters?: any): CategoriaFilter;
}
export class CategoriaFilter {
  constructor(parameters?: any) {
    if (parameters) {
      Util.createInstanceWithParameters(this, parameters);
    }
  }

  convertAyudaPublicaFilter() {
    return {
      nombreCategoria: this.nombreCategoria ? this.nombreCategoria : null,
      verInactivos: this.verInactivos ? this.verInactivos : null
    };
  }
}
