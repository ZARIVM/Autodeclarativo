import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InicioComponent} from '@inicio/inicio/inicio.component';


const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    data: {show: false, breadcrumblink: true}
  },
  {
    path: '',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule {
}
