import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VersionRoutingModule } from './version-routing.module';
import { VersionComponent } from './version.component';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioDinamicoModule } from 'src/app/formulario-dinamico/formulario-dinamico.module';

@NgModule({
  declarations: [VersionComponent],
  imports: [
    CommonModule,
    VersionRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbModalModule,
    FormularioDinamicoModule,
  ]
})
export class VersionModule { }
