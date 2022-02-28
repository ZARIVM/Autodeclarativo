import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CoreRoutingModule} from '@core/core-routing.module';
import {TemplateComponent} from '@core/components/template/template.component';
import {HeaderComponent} from '@core/components/header/header.component';
import {FooterComponent} from '@core/components/footer/footer.component';
import {MainComponent} from '@core/components/main/main.component';
import {NavbarComponent} from '@core/components/navbar/navbar.component';
import {BreadcrumbComponent} from '@core/components/breadcrumb/breadcrumb.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    TemplateComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    NavbarComponent,
    BreadcrumbComponent
  ],
  exports: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    SharedModule
  ]
})
export class CoreModule {
}
