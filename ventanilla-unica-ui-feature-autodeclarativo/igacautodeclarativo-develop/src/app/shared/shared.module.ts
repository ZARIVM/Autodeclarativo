import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedRoutingModule} from '@app/shared/shared-routing.module';
import {EncabezadoSeccionComponent} from '@shared/components/encabezado-seccion/encabezado-seccion.component';
import {LoadingSpinnerComponent} from '@shared/components/loading-spinner/loading-spinner.component';
import {FileUploaderComponent} from './components/file-uploader/file-uploader.component';
import {MaterialModule} from '@core/material/material.module';
import {JbpmStatusPipe} from '@shared/pipes/tramites/jbpm-status.pipe';
import { GeoviewerComponent } from './components/geoviewer/geoviewer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    EncabezadoSeccionComponent,
    LoadingSpinnerComponent,
    FileUploaderComponent,
    JbpmStatusPipe,
    GeoviewerComponent
  ],
  exports: [
    EncabezadoSeccionComponent,
    LoadingSpinnerComponent,
    FileUploaderComponent,
    JbpmStatusPipe,
    GeoviewerComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule,
    CommonModule,
    NgbModule
  ]
})
export class SharedModule {
}
