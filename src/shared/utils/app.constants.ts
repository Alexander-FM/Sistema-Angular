/**
 * Constantes globales de la aplicación.
 *
 * @author everis
 */
export class AppConstants {
  public static readonly CATEGORIA_MAIN: string = 'categoria';
  public static readonly DOCUMENTO_ALMACENADO: string = 'documento-almacenado';
  public static readonly LOGIN_MAIN: string = 'user';

  private constructor() { }
}

export class Roles {
  public static readonly ADMINISTRADOR = 'ROLE_ADMIN';
  public static readonly GESTOR = 'ROLE_GESTOR';
  public static readonly INFORMATICO = 'ROLE_INFOR';
  public static readonly COLABORADOR = 'ROLE_COLABORADOR';
  public static readonly CONSULTA = 'ROLE_CONSULTA';

  private constructor() { }
}
