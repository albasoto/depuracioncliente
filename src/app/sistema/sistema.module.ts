import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaComponent } from './sistema.component';
import { HeaderComponent } from './componentes/header/header.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SistemaComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    NgbDropdownModule
  ]
})
export class SistemaModule { }
