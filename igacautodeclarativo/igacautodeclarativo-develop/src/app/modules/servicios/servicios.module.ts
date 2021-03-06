import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiciosComponent} from '@servicios/servicios/servicios.component';
import {ServiciosRoutingModule} from '@servicios/servicios-routing.module';


@NgModule({
  declarations: [
    ServiciosComponent
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule
  ]
})
export class ServiciosModule { }
