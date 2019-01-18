import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadRoutingModule } from './entidad-routing.module';
import { EntidadComponent } from './entidad.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioDinamicoModule } from 'src/app/formulario-dinamico/formulario-dinamico.module';

@NgModule({
  declarations: [EntidadComponent],
  imports: [
    CommonModule,
    EntidadRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbModalModule,
    FormularioDinamicoModule,
  ]
})
export class EntidadModule { }
