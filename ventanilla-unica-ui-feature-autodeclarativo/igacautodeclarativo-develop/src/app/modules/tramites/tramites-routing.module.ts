import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TramitesComponent} from '@tramites/tramites/tramites.component';


const routes: Routes = [
  {
    path: '',
    component: TramitesComponent,
    data: {show: false, breadcrumblink: false}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramitesRoutingModule {
}
