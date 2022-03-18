import { MatDialogModule } from '@angular/material/dialog';
import { AutodeclarativoService } from './services/autodeclarativo.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutodeclarativoComponent } from '@autodeclarativo/autodeclarativo/autodeclarativo.component';
import { AutodeclarativoRoutingModule } from '@autodeclarativo/autodeclarativo-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AutodeclarativolistComponent } from './autodeclarativolist/autodeclarativolist.component';
import { AutodeclarativowizardComponent } from './autodeclarativowizard/autodeclarativowizard.component';
import { AutodeclarativolegComponent } from './autodeclarativoleg/autodeclarativoleg.component';
import { DeclyautComponent } from './declyaut/declyaut.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutodeclarativopredioComponent } from './autodeclarativopredio/autodeclarativopredio.component';
import { FiltrobusquedapredioComponent } from './filtrobusquedapredio/filtrobusquedapredio.component';
import { ModalDireccionesComponent } from './modal-direcciones/modal-direcciones.component';
import { InfofiyecoComponent } from './infofiyeco/infofiyeco.component';
import { ModalEditinfoyecoComponent } from './modal-editinfoyeco/modal-editinfoyeco.component';
import { AutodeclarativoInfoContacComponent } from './autodeclarativo-info-contac/autodeclarativo-info-contac.component';
import { AutodeclarativoUsoConsComponent } from './autodeclarativo-uso-cons/autodeclarativo-uso-cons.component';
import { ModalUsoConstruccionComponent } from './modal-uso-construccion/modal-uso-construccion.component';
import { ModalEditarInfoContacComponent } from './modal-editar-info-contac/modal-editar-info-contac.component';
import { AdjuntarDocumentacionComponent } from './adjuntar-documentacion/adjuntar-documentacion.component';
import { UbicacionGeograficaComponent } from './ubicacion-geografica/ubicacion-geografica.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
@NgModule({
  declarations: [
    AutodeclarativoComponent,
    AutodeclarativolistComponent,
    AutodeclarativowizardComponent,
    AutodeclarativolegComponent,
    DeclyautComponent,
    AutodeclarativopredioComponent,
    FiltrobusquedapredioComponent,
    ModalDireccionesComponent,
    InfofiyecoComponent,
    ModalEditinfoyecoComponent,
    AutodeclarativoInfoContacComponent,
    AutodeclarativoUsoConsComponent,
    ModalUsoConstruccionComponent,
    ModalEditarInfoContacComponent,
    AdjuntarDocumentacionComponent,
    UbicacionGeograficaComponent,
    UploadFileComponent],
  imports: [
    CommonModule,
    AutodeclarativoRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [AutodeclarativoService],
})
export class AutodeclarativoModule { }
