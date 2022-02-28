import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InicioComponent} from '@inicio/inicio/inicio.component';
import {InicioRoutingModule} from '@inicio/inicio-routing.module';
import {CarruselComponent} from '@inicio/carrusel/carrusel.component';
import {InformacionComponent} from '@inicio/informacion/informacion.component';


@NgModule({
  declarations: [
    InicioComponent,
    CarruselComponent,
    InformacionComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule {
}
