import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepuracionComponent } from './depuracion.component';
import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  {path: '', component: DepuracionComponent},
  {path: 'nuevo', component: NuevoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepuracionRoutingModule { }
