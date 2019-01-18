import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpresionRoutingModule } from './expresion-routing.module';
import { ExpresionComponent } from './expresion.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioDinamicoModule } from 'src/app/formulario-dinamico/formulario-dinamico.module';

@NgModule({
  declarations: [ExpresionComponent],
  imports: [
    CommonModule,
    ExpresionRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbModalModule,
    FormularioDinamicoModule,
  ]
})
export class ExpresionModule { }
