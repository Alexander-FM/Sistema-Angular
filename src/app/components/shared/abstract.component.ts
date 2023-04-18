import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {takeUntil} from 'rxjs/operators';

@Injectable()
export abstract class AbstractComponent implements OnDestroy {

  protected destroy$: Subject<boolean> = new Subject<boolean>();

  /* Variables para acceso directo a Roles desde plantillas HTML */
  /*public ADMINISTRADOR: string = Roles.ADMINISTRADOR;
  public INFORMATICO: string = Roles.INFORMATICO;
  public GESTOR: string = Roles.GESTOR;
  public COLABORADOR: string = Roles.COLABORADOR;
  public CONSULTA: string = Roles.CONSULTA;*/

  /**
   * Creates an instance of abstract component.
   * @param translateService Servicio de traducción
   */
  constructor(protected translateService: TranslateService) {
    this.subscribeToLanguageChanges();
  }

  /**
   * This method can be overridden if a component needs to do something when the language is changed
   */
  protected onLanguageChanged(langChangeEvent?: LangChangeEvent): void { }

  /**
   * Cuando el componente es destruido, este método desuscribe de todas sus suscripciones.
   * Para que funcione correctamente, todas estas suscripciones deben estar con "takeUntil".
   */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * Subscribes to language changes.
   * When the language is changed, it executes the empty method onLanguageChanged from this class
   * or the onLanguageChanged method from the component which extends this class
   */
  private subscribeToLanguageChanges(): void {
    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((langChangeEvent: LangChangeEvent) => {
      this.onLanguageChanged(langChangeEvent);
    });
  }
  protected guardarEstadoFiltros(filtro: any): void {
    localStorage.setItem('form-data', JSON.stringify(filtro));
  }

  protected recuperarEstadoFiltros(): any {

    const json = JSON.parse(localStorage.getItem('form-data'));

    if (json) {
      for (const key of Object.keys(json)) {
        if (typeof json[key] === 'string' && json[key].endsWith('000Z')) {
          json[key] = new Date(json[key]);
        }
      }
    }

    return json;
  }

  protected guardarEstadoFiltrosByPantalla(pantalla: any, filtro: any): void {
    localStorage.setItem('form-data-' + pantalla, JSON.stringify(filtro));
  }

  protected recuperarEstadoFiltrosByPantalla(pantalla: any): any {
    const json = JSON.parse(localStorage.getItem('form-data-' + pantalla));
    if (json) {
      for (const key of Object.keys(json)) {
        if (typeof json[key] === 'string' && json[key].endsWith('000Z')) {
          json[key] = new Date(json[key]);
        }
      }
    }
    return json;
  }
}
