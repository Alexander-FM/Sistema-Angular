import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfirmationService} from 'primeng-lts/api';
import {LOCALE_ID, ModuleWithProviders, NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?random=' + Math.random());
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    // !environment.mock ? [] : HttpClientInMemoryWebApiModule.forRoot(DataMockService, { passThruUnknownUrl: true }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    TranslateModule
  ]
})
// tag::coreForRoot[]
// tag::coreModule[]
export class CoreModule {
  // end::coreModule[]
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        ConfirmationService
      ]
    };
  }
}
// end::coreForRoot[]
