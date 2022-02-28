import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from '@app/app.component';
import {CoreModule} from '@core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '@app/app-routing.module';
import {SharedModule} from '@shared/shared.module';
import {initializer} from '@shared/utilities/keycloak/initializer';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {StorageService} from '@shared/services/storage/storage.service';
import { ModalDireccionesComponent } from './modules/autodeclarativo/modal-direcciones/modal-direcciones.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    KeycloakAngularModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializer,
    //   multi: true,
    //   deps: [
    //     KeycloakService,
    //     StorageService
    //   ]
    // }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
