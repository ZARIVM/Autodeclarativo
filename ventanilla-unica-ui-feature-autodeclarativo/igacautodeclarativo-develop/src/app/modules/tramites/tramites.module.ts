import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TramitesRoutingModule} from '@tramites/tramites-routing.module';
import {TramitesComponent} from '@tramites/tramites/tramites.component';
import {ListComponent} from '@tramites/list/list.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    TramitesComponent,
    ListComponent
  ],
    imports: [
        CommonModule,
        TramitesRoutingModule,
        SharedModule
    ]
})
export class TramitesModule {
}
