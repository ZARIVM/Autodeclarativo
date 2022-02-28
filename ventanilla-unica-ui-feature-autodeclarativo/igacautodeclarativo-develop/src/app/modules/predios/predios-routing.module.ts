import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrediosComponent} from '@predios/predios/predios.component';
import {DetalleComponent} from '@predios/detalle/detalle.component';
import {TramiteComponent} from '@predios/tramite/tramite.component';


const routes: Routes = [
  {
    path: '',
    component: PrediosComponent,
    data: {breadcrumblink: false, show: false}
  },
  {
    path: ':id/detalle',
    component: DetalleComponent,
    data: {breadcrumblink: false, breadcrumb: 'Detalle', show: true}
  },
  {
    path: ':id/tramite',
    component: TramiteComponent,
    data: {breadcrumblink: false, breadcrumb: 'Crear trámite', show: true}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrediosRoutingModule {
}
