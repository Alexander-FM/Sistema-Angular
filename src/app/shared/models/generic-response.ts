/**
 * Representa el formato de respuesta del backend.
 *
 * @author Alexander Tutoriales
 */
import {Page} from './page';

export declare class GenericResponse<T> {
  type: string;
  rpta: number;
  message: string;
  body: Page<T>;
}
