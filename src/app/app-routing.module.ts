import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: './modules/inicio/inicio.module#InicioModule',
  },
  {
    path: 'categorias',
    loadChildren: './modules/categorias/categorias.module#CategoriasModule',
  },
  {
    path: '', redirectTo: 'auth', pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
