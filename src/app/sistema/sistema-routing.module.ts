import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SistemaComponent } from './sistema.component';

const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
        { path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule' },
        { path: 'catalogo', loadChildren: './catalogo/catalogo.module#CatalogoModule' },
        { path: 'expresion', loadChildren: './expresion/expresion.module#ExpresionModule' },
        { path: 'entidad', loadChildren: './entidad/entidad.module#EntidadModule' },
        { path: 'version', loadChildren: './version/version.module#VersionModule' },
        { path: 'depuracion', loadChildren: './depuracion/depuracion.module#DepuracionModule' },

    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
