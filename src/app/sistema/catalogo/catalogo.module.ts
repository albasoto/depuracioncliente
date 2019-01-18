import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { FormsModule } from '@angular/forms';
import { NgbPagination, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioDinamicoModule } from 'src/app/formulario-dinamico/formulario-dinamico.module';

@NgModule({
  declarations: [CatalogoComponent],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbModalModule,
    FormularioDinamicoModule,

  ]
})
export class CatalogoModule { }
