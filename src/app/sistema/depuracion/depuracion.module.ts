import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepuracionRoutingModule } from './depuracion-routing.module';
import { DepuracionComponent } from './depuracion.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { FormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DepuracionComponent, NuevoComponent],
  imports: [
    CommonModule,
    DepuracionRoutingModule,
    FormsModule,
    NgbTabsetModule
  ]
})
export class DepuracionModule { }
