import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  /*{
    path: 'inicio',
    loadChildren: './modules/inicio/inicio.module#InicioModule',
  },*/
  {
    path: '', redirectTo: 'inicio', pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
