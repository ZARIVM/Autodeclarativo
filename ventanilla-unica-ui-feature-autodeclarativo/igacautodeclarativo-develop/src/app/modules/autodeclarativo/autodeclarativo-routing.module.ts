import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AutodeclarativoComponent} from '@autodeclarativo/autodeclarativo/autodeclarativo.component';


const routes: Routes = [
  {
    path: '',
    component: AutodeclarativoComponent,
    data: {show: false, breadcrumblink: false}
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutodeclarativoRoutingModule {
}
