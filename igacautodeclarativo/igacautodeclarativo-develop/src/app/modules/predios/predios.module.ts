import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrediosRoutingModule} from '@predios/predios-routing.module';
import {PrediosComponent} from '@predios/predios/predios.component';
import {SharedModule} from '@shared/shared.module';
import {DetalleComponent} from '@predios/detalle/detalle.component';
import {TramiteComponent} from '@predios/tramite/tramite.component';
import {MaterialModule} from '@core/material/material.module';


@NgModule({
  declarations: [
    PrediosComponent,
    DetalleComponent,
    TramiteComponent
  ],
  imports: [
    CommonModule,
    PrediosRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class PrediosModule {
}
