import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ModalContainerComponent } from './modules/autodeclarativo/autodeclarativopredio/modal-container.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'login',
    loadChildren: () => import('@session/session.module').then(m => m.SessionModule),
  },  
  {
    path: 'servicios',
    loadChildren: () => import('@servicios/servicios.module').then(m => m.ServiciosModule),
    data: {breadcrumblink: true, breadcrumb: 'Trámites y Servicios', show: true}
  },
  {
    path: 'predios',
    loadChildren: () => import('@predios/predios.module').then(m => m.PrediosModule),
    data: {breadcrumblink: true, breadcrumb: 'Mis Predios', show: true}
  },
  {
    path: 'tramites',
    loadChildren: () => import('@tramites/tramites.module').then(m => m.TramitesModule),
    data: {breadcrumblink: true, breadcrumb: 'Mis Trámites', show: true}
  },
  {
    path: 'autodeclarativo',
    loadChildren: () => import('@autodeclarativo/autodeclarativo.module').then(m => m.AutodeclarativoModule),
    data: {breadcrumblink: false, breadcrumb: 'Método autodeclarativo', show: true}
  },
  { path: 'autodeclarativo/:id', component: ModalContainerComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
