import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiciosComponent} from '@servicios/servicios/servicios.component';


const routes: Routes = [
  {
    path: '',
    component: ServiciosComponent,
    data: {show: false, breadcrumblink: false}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule {
}
